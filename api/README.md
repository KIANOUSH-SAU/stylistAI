# AI Text Generation API Setup

This document explains how to set up and troubleshoot the AI text generation feature in StylistAI.

## Current Implementation

The app uses Google's Gemini API for generating AI-powered style tips with a fallback to HuggingFace's free Inference API.

## Gemini API Setup

### 1. Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 2. Configure the API Key

Open `api/textGeneratorAPI.js` and replace the placeholder:

```javascript
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
```

**Security Note**: For production apps, use environment variables instead of hardcoding API keys.

### 3. Verify API Key

To check if your API key is valid:

1. Visit: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY`
2. You should see a list of available models or an authentication error if the key is invalid

## Common Issues and Solutions

### Issue 1: "API key not valid" Error

**Cause**: The API key is invalid, expired, or not enabled for the Gemini API.

**Solution**:
1. Verify your API key in Google AI Studio
2. Make sure the Generative Language API is enabled in your Google Cloud project
3. Check if there are any usage restrictions or quotas

### Issue 2: Network Errors

**Cause**: Network connectivity issues or CORS problems in web environments.

**Solution**:
1. Check your internet connection
2. For web: Use a backend proxy to avoid CORS issues
3. Check console logs for detailed error messages

### Issue 3: Rate Limiting

**Cause**: Too many requests to the API.

**Solution**:
1. Implement request throttling
2. Cache responses when possible
3. Use the HuggingFace fallback for development

## Fallback System

If Gemini API fails, the app automatically falls back to HuggingFace's Mistral-7B model, which:
- Requires no API key
- Has rate limits but is free
- May have slower response times
- May experience model loading delays

## HuggingFace Alternative

If you prefer to use HuggingFace as primary:

1. Get a free API key from [HuggingFace](https://huggingface.co/settings/tokens)
2. Update the code to use the key:

```javascript
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const response = await fetch(HF_API_URL, {
    headers: {
        'Authorization': 'Bearer YOUR_HF_TOKEN',
        'Content-Type': 'application/json',
    },
    // ... rest of the request
});
```

## Other Free AI APIs

If both Gemini and HuggingFace don't work, consider these alternatives:

### 1. OpenAI (Free Trial)
- Website: https://platform.openai.com/
- Free trial credits available
- Requires credit card after trial

### 2. Cohere
- Website: https://cohere.com/
- Free tier available
- Good for text generation

### 3. Anthropic Claude (Limited Free)
- Website: https://www.anthropic.com/
- Some free usage available
- High quality responses

## Debugging

Enable detailed logging by checking the console in your development environment:

```bash
npx expo start
```

Look for these log messages:
- `"Attempting to use Gemini API..."`
- `"Gemini API Response:"` - Shows the full API response
- `"Gemini failed, trying HuggingFace fallback..."`
- `"CurrentLookScreen: Received text:"` - Shows the final text displayed

## Testing the API

You can test the API directly using curl:

```bash
# Test Gemini API
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Say hello"
      }]
    }]
  }'

# Test HuggingFace API
curl -X POST "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2" \
  -H 'Content-Type: application/json' \
  -d '{"inputs": "Say hello", "parameters": {"max_new_tokens": 20}}'
```

## Best Practices

1. **Never commit API keys to version control**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Implement proper error handling**
   - Show user-friendly error messages
   - Log errors for debugging

3. **Cache responses when possible**
   - Reduces API calls
   - Improves performance

4. **Set reasonable timeouts**
   - Prevent hanging requests
   - Provide feedback to users

## Support

If you continue to have issues:
1. Check the console logs for detailed error messages
2. Verify your API key is active and has quota remaining
3. Try the HuggingFace fallback by temporarily disabling Gemini
4. Open an issue on GitHub with error logs
