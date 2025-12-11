/**
 * Simple test script to verify the text generation API
 * Run with: node api/test-api.js
 */

// Mock fetch if running in Node.js
if (typeof fetch === 'undefined') {
    global.fetch = require('node-fetch');
}

const GEMINI_API_KEY = "AIzaSyD8btTnK6gDmGo7RwLEGE3rUZ4f1BqQrcA";
const PROMPT = "Say hello";

async function testGeminiAPI() {
    console.log("Testing Gemini API...\n");
    
    const models = ['gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-pro'];
    
    for (const model of models) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
            console.log(`Testing model: ${model}`);
            console.log(`URL: ${url}\n`);
            
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
            console.log(`Response status: ${response.status}`);
            console.log(`Response:`, JSON.stringify(data, null, 2));
            
            if (data.error) {
                console.log(`❌ Error: ${data.error.message || JSON.stringify(data.error)}\n`);
            } else if (data.candidates && data.candidates.length > 0) {
                console.log(`✅ Success! Generated text: ${data.candidates[0].content.parts[0].text}\n`);
            } else {
                console.log(`❌ Unexpected response format\n`);
            }
            
            console.log("---\n");
        } catch (error) {
            console.log(`❌ Error testing ${model}:`, error.message, "\n");
            console.log("---\n");
        }
    }
}

async function testHuggingFaceAPI() {
    console.log("Testing HuggingFace API...\n");
    
    try {
        const url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
        console.log(`URL: ${url}\n`);
        
        const response = await fetch(url, {
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
        console.log(`Response status: ${response.status}`);
        console.log(`Response:`, JSON.stringify(data, null, 2));
        
        if (data.error) {
            console.log(`❌ Error: ${data.error}\n`);
        } else if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            console.log(`✅ Success! Generated text: ${data[0].generated_text}\n`);
        } else {
            console.log(`ℹ️ Response format:`, typeof data, "\n");
        }
        
        console.log("---\n");
    } catch (error) {
        console.log(`❌ Error testing HuggingFace:`, error.message, "\n");
        console.log("---\n");
    }
}

async function runTests() {
    console.log("=".repeat(60));
    console.log("AI Text Generation API Tests");
    console.log("=".repeat(60));
    console.log("\n");
    
    await testGeminiAPI();
    await testHuggingFaceAPI();
    
    console.log("=".repeat(60));
    console.log("Tests complete!");
    console.log("=".repeat(60));
}

runTests().catch(console.error);
