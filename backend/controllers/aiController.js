const { GoogleGenerativeAI } = require('@google/generative-ai');

// List of backup keys from the user
const BACKUP_KEYS = [
    process.env.GEMINI_API_KEY, // Primary from .env
    'AIzaSyAayQ4REleog7hlNKDb1_v_vBWU_XnF6MM',
    'AIzaSyCODMuhnCt6O_6I317kRvq-fJTl5Ury3Go',
    'AIzaSyCRi_wbicm57dnIx0CZyqDEjj7hqc82uqY',
    'AIzaSyBfimeglEe-5RBzFoZqLZ5FALqiWj3WsG0'
].filter(Boolean); // Remove null/undefined

// Models to try in order of preference
const MODELS_TO_TRY = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.0-pro"];

// Helper to get working AI response
const getAIResponse = async (prompt) => {
    let lastError = null;

    // Try each key
    for (const key of BACKUP_KEYS) {
        const genAI = new GoogleGenerativeAI(key);
        
        // Try each model
        for (const modelName of MODELS_TO_TRY) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                return result.response.text();
            } catch (err) {
                lastError = err;
                console.warn(`AI Attempt failed (Key: ${key.substring(0, 10)}..., Model: ${modelName}): ${err.message}`);
                // Continue to next model/key
            }
        }
    }
    throw lastError || new Error("All AI enrichment attempts failed");
};

// @desc    Optimize resume section content
// @route   POST /api/ai/optimize
// @access  Private
exports.optimizeContent = async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: 'Please provide text to optimize' });
        }

        let promptText = '';

        switch (type) {
            case 'summary':
                promptText = `Act as an expert resume writer. Improve the following professional summary to make it more impactful, concise, and ATS-friendly. Keep it strictly between 80-100 words in length. Output ONLY the improved text directly without any conversational filler or introductions. Original text: "${text}"`;
                break;
            case 'experience':
                promptText = `Act as an expert resume writer. Improve the following work experience description. Convert it into strong, action-oriented bullet points that highlight achievements and metrics. Output ONLY the bullet points without any conversational filler or introductions. Original text: "${text}"`;
                break;
            case 'projects':
                promptText = `Act as an expert resume writer. Improve the following project description. Convert it into strong, action-oriented bullet points that highlight achievements and metrics. Provide a maximum of 5 bullet points, and ensure the total length is between 80-100 words. Output ONLY the bullet points directly without any conversational filler or introductions. Original text: "${text}"`;
                break;
            case 'skills':
                promptText = `Act as an expert ATS optimizer. Format to comma-separated keywords and suggest 3-5 highly relevant professional skills based on these skills: "${text}"`;
                break;
            default:
                promptText = `Act as an expert resume writer. Improve the following resume text to make it more professional and impactful. Original text: "${text}"`;
        }

        const prompt = `You are a professional resume writer and career coach.\n\n${promptText}`;
        
        const optimizedTextRaw = await getAIResponse(prompt);
        const optimizedText = optimizedTextRaw.trim();

        res.status(200).json({ success: true, optimizedText });
    } catch (err) {
        console.error('AI Optimization Final Error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to optimize content. All API keys or limits exhausted.', error: err.message });
    }
};
