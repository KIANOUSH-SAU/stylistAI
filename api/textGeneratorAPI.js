const API_KEY = "AIzaSyD8btTnK6gDmGo7RwLEGE3rUZ4f1BqQrcA"; // TODO: Replace with your actual Gemini API Key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const getText = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Give me one short, trendy tip about men's hairstyles. Keep it under 15 words and make it sound modern."
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return "Error: Check API Key";
        }

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            return "Stay stylish!";
        }
    } catch (error) {
        console.error("Error generating text:", error);
        return "Could not fetch style tip.";
    }
}

export default getText;