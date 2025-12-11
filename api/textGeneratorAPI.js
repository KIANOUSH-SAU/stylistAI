const GEMINI_API_KEY = "AIzaSyD8btTnK6gDmGo7RwLEGE3rUZ4f1BqQrcA"; // TODO: Replace with your actual Gemini API Key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Fallback to Hugging Face free API (no key required for some models)
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const PROMPT = "Give me one short, trendy tip about men's hairstyles. Keep it under 15 words and make it sound modern.";

/**
 * Try to get text from Gemini API
 */
const getTextFromGemini = async () => {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: PROMPT
                    }]
                }]
            })
        });

        const data = await response.json();

        // Log response for debugging
        console.log("Gemini API Response:", JSON.stringify(data, null, 2));

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            throw new Error(`Gemini API Error: ${data.error.message || JSON.stringify(data.error)}`);
        }

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error("No candidates in Gemini response");
        }
    } catch (error) {
        console.error("Error with Gemini API:", error);
        throw error;
    }
};

/**
 * Try to get text from Hugging Face API as fallback
 */
const getTextFromHuggingFace = async () => {
    try {
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: PROMPT,
                parameters: {
                    max_new_tokens: 30,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });

        const data = await response.json();
        console.log("HuggingFace API Response:", JSON.stringify(data, null, 2));

        if (data.error) {
            throw new Error(`HuggingFace API Error: ${data.error}`);
        }

        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            return data[0].generated_text.trim();
        }

        throw new Error("Unexpected response from HuggingFace");
    } catch (error) {
        console.error("Error with HuggingFace API:", error);
        throw error;
    }
};

/**
 * Main function to get AI-generated text with fallback
 */
const getText = async () => {
    try {
        // Try Gemini first
        console.log("Attempting to use Gemini API...");
        const geminiText = await getTextFromGemini();
        return geminiText;
    } catch (geminiError) {
        console.log("Gemini failed, trying HuggingFace fallback...");
        try {
            // If Gemini fails, try HuggingFace
            const hfText = await getTextFromHuggingFace();
            return hfText;
        } catch (hfError) {
            console.error("Both APIs failed:", { geminiError, hfError });
            // Return a default message if both fail
            return "Stay stylish! Update your look with confidence.";
        }
    }
};

export default getText;