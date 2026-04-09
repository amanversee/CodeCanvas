const { GoogleGenerativeAI } = require('@google/generative-ai');

// ─────────────────────────────────────────────────────────────────────────────
// Configuration – loaded entirely from environment variables (never hardcoded)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Collect all Gemini API keys from .env.
 * Supports GEMINI_API_KEY_1 … GEMINI_API_KEY_N pattern.
 * Falls back to the legacy GEMINI_API_KEY variable if present.
 */
const buildKeyPool = () => {
    const keys = [];

    // Numbered keys (priority order)
    for (let i = 1; i <= 10; i++) {
        const key = process.env[`GEMINI_API_KEY_${i}`];
        if (key && key.trim()) keys.push(key.trim());
    }

    // Legacy single-key fallback
    const legacyKey = process.env.GEMINI_API_KEY;
    if (legacyKey && legacyKey.trim() && !keys.includes(legacyKey.trim())) {
        keys.push(legacyKey.trim());
    }

    return keys;
};

// Models to try in order of preference (newest / most capable first)
const MODELS_TO_TRY = [
    'gemini-flash-latest',
    'gemini-2.0-flash',
    'gemini-pro-latest',
    'gemini-2.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a masked version of an API key safe to print in logs.
 * e.g.  "AIzaSyDGMUh..." → "AIzaSyDG…qk8"
 */
const maskKey = (key) => {
    if (!key || key.length < 12) return '***';
    return `${key.substring(0, 8)}…${key.slice(-3)}`;
};

/**
 * Determines whether an error is considered "fatal" for a given key
 * (i.e. the key itself is invalid / revoked) vs. a transient error
 * (rate-limit, network timeout) where retrying the same key later might help.
 * In either case we still fall through to the next key for maximum resilience.
 */
const classifyError = (err) => {
    const msg = (err.message || '').toLowerCase();
    const status = err.status || err.statusCode || (err.response && err.response.status);

    if (status === 401 || status === 403 || msg.includes('api key') || msg.includes('invalid key')) {
        return 'INVALID_KEY';
    }
    if (status === 429 || msg.includes('quota') || msg.includes('rate limit') || msg.includes('resource exhausted')) {
        return 'QUOTA_EXCEEDED';
    }
    if (msg.includes('timeout') || msg.includes('network') || msg.includes('econnrefused')) {
        return 'NETWORK_ERROR';
    }
    return 'UNKNOWN_ERROR';
};

// ─────────────────────────────────────────────────────────────────────────────
// Core AI helper: tries every key × every model until one succeeds
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string} prompt  The full prompt to send to Gemini
 * @returns {Promise<string>} The generated text
 * @throws {Error} with code ALL_KEYS_FAILED if every key/model combination fails
 */
const getAIResponse = async (prompt) => {
    const keyPool = buildKeyPool();

    if (keyPool.length === 0) {
        console.error('[GeminiAI] ❌ No API keys configured in environment variables.');
        const err = new Error('No Gemini API keys configured.');
        err.code = 'ALL_KEYS_FAILED';
        throw err;
    }

    let lastError = null;
    const attemptLog = []; // collect per-attempt results for debugging

    for (let ki = 0; ki < keyPool.length; ki++) {
        const key = keyPool[ki];
        const maskedKey = maskKey(key);

        console.log(`[GeminiAI] 🔑 Trying key ${ki + 1}/${keyPool.length}: ${maskedKey}`);

        const genAI = new GoogleGenerativeAI(key);

        for (const modelName of MODELS_TO_TRY) {
            try {
                const model = genAI.getGenerativeModel({ 
                    model: modelName,
                    safetySettings: [
                        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.95,
                        topK: 64,
                        maxOutputTokens: 2048,
                    }
                });
                const result = await model.generateContent(prompt);
                const text = result.response.text();

                console.log(`[GeminiAI] ✅ Success with key ${ki + 1} (${maskedKey}) using model "${modelName}"`);
                return text; // ← success path
            } catch (err) {
                const errType = classifyError(err);
                lastError = err;

                const attempt = {
                    keyIndex: ki + 1,
                    maskedKey,
                    model: modelName,
                    errorType: errType,
                    message: err.message,
                };
                attemptLog.push(attempt);

                console.warn(
                    `[GeminiAI] ⚠️  Attempt failed — key ${ki + 1} (${maskedKey}), model "${modelName}": [${errType}] ${err.message}`
                );

                // If the key is clearly invalid, skip remaining models for this key
                if (errType === 'INVALID_KEY') {
                    console.warn(`[GeminiAI] 🚫 Key ${ki + 1} (${maskedKey}) is invalid/revoked – skipping remaining models for this key.`);
                    break;
                }
            }
        }
    }

    // All keys & models exhausted
    console.error('[GeminiAI] ❌ All API key / model combinations failed.');
    console.error('[GeminiAI] Attempt log:', JSON.stringify(attemptLog, null, 2));

    const allFailedError = new Error('All Gemini API keys failed. Please check your API configuration.');
    allFailedError.code = 'ALL_KEYS_FAILED';
    allFailedError.attemptLog = attemptLog;
    allFailedError.cause = lastError;
    throw allFailedError;
};

// ─────────────────────────────────────────────────────────────────────────────
// Prompt builders
// ─────────────────────────────────────────────────────────────────────────────

const buildPrompt = (text, type) => {
    const base = 'You are a professional resume writer and career coach.\n\n';

    switch (type) {
        case 'summary':
            return base + `Act as an expert resume writer. Improve the following professional summary to make it more impactful, concise, and ATS-friendly. Keep it strictly between 80-100 words in length. Output ONLY the improved text directly without any conversational filler or introductions. Original text: "${text}"`;

        case 'experience':
            return base + `Act as an expert resume writer. Improve the following work experience description. Convert it into strong, action-oriented bullet points that highlight achievements and metrics. Output ONLY the bullet points without any conversational filler or introductions. Original text: "${text}"`;

        case 'projects':
            return base + `Act as an expert resume writer. Improve the following project description. Convert it into strong, action-oriented bullet points that highlight achievements and metrics. Provide a maximum of 5 bullet points, and ensure the total length is between 80-100 words. Output ONLY the bullet points directly without any conversational filler or introductions. Original text: "${text}"`;

        case 'skills':
            return base + `Act as an expert ATS optimizer. Format to comma-separated keywords and suggest 3-5 highly relevant professional skills based on these skills: "${text}"`;

        default:
            return base + `Act as an expert resume writer. Improve the following resume text to make it more professional and impactful. Original text: "${text}"`;
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @desc    Optimize resume section content using Gemini AI
 * @route   POST /api/ai/optimize
 * @access  Private
 */
exports.optimizeContent = async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide text to optimize.',
            });
        }

        const prompt = buildPrompt(text.trim(), type);
        const rawResult = await getAIResponse(prompt);
        const optimizedText = rawResult.trim();

        return res.status(200).json({ success: true, optimizedText });

    } catch (err) {
        // Distinguish "all keys failed" from other server errors
        if (err.code === 'ALL_KEYS_FAILED') {
            console.error('[Route /ai/optimize] All Gemini API keys exhausted.');
            return res.status(503).json({
                success: false,
                allKeysFailed: true,
                message: 'Gemini API key is not working properly. Please check your API configuration.',
            });
        }

        console.error('[Route /ai/optimize] Unexpected error:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An unexpected server error occurred. Please try again later.',
            error: err.message,
        });
    }
};
