const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const optimizedText = result.response.text().trim();

        res.status(200).json({ success: true, optimizedText });
    } catch (err) {
        console.error('AI Optimization Error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to optimize content. Check API key or limit.', error: err.message });
    }
};
