const GEMINI_API_KEY = "AIzaSyD8btTnK6gDmGo7RwLEGE3rUZ4f1BqQrcA"; // TODO: Replace with your actual Gemini API Key

// Try different Gemini model versions in case one is restricted
const GEMINI_MODELS = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-pro'
];

// Fallback to Hugging Face free API (no key required for some models)
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const PROMPT = "Give me one short, trendy tip about men's hairstyles. Keep it under 15 words and make it sound modern.";

// Static fallback tips in case all APIs fail
const FALLBACK_TIPS = [
    "Textured crops with a fade are trending this season.",
    "Try a modern quiff with natural texture for versatility.",
    "Messy fringe styles are making a strong comeback.",
    "Keep sides tight, top loose for contemporary style.",
    "Natural waves with light product define modern looks."
];

/**
 * Try to get text from Gemini API with multiple model fallbacks
 */
const getTextFromGemini = async () => {
    for (const model of GEMINI_MODELS) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
            console.log(`Trying Gemini model: ${model}`);
            
            const response = await fetch(url, {
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
            console.log(`Gemini ${model} Response:`, JSON.stringify(data, null, 2));

            if (data.error) {
                console.error(`Gemini ${model} API Error:`, data.error);
                // Try next model
                continue;
            }

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                const text = data.candidates[0].content.parts[0].text.trim();
                console.log(`Success with Gemini ${model}`);
                return text;
            }
        } catch (error) {
            console.error(`Error with Gemini model ${model}:`, error);
            // Try next model
            continue;
        }
    }
    
    // If we get here, all Gemini models failed
    throw new Error("All Gemini models failed");
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
 * Get a random fallback tip
 */
const getRandomFallbackTip = () => {
    return FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
};

/**
 * Main function to get AI-generated text with multiple fallbacks
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
            console.error("All AI APIs failed:", { geminiError, hfError });
            // Return a random static tip if all APIs fail
            console.log("Using fallback static tips");
            return getRandomFallbackTip();
        }
    }
};

export default getText;