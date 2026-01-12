# AI Assistant Feature - Complete Guide

## 🤖 Overview

The AI Assistant is an intelligent chatbot that helps users query and analyze their marketing data across all platforms using natural language. It leverages OpenAI's GPT-4 to understand user queries and provide data-driven insights with visualizations.

## ✨ Features

1. **Natural Language Queries**: Ask questions in plain English
2. **Multi-Platform Data Access**: Queries across all data sources:
   - Google Analytics
   - Google Search Console
   - SEMrush (Keywords & Site Health)
   - LinkedIn Ads
   - Google Ads
   - HubSpot (Deals & Contacts)
   - Social Media (Oktopost - LinkedIn, Instagram, Facebook, Twitter)

3. **Intelligent Visualizations**: Automatically shows charts when relevant
4. **Date Range Aware**: Respects the current date filter selection
5. **Contextual Responses**: Maintains conversation context for follow-up questions
6. **Suggested Questions**: Provides helpful starting points

## 🏗️ Architecture

### Components

1. **Header Component** (`components/Header.tsx`)
   - Added "Talk to us" button with gradient styling
   - Positioned next to date range filter

2. **ClientLayout Component** (`components/ClientLayout.tsx`)
   - Manages AI Assistant modal state
   - Wraps the entire application

3. **AIAssistant Component** (`components/AIAssistant.tsx`)
   - Full-featured chat interface with:
     - Message history display
     - User/Assistant avatars
     - Chart rendering (Line & Bar charts)
     - Suggested questions
     - Real-time typing indicator
     - Timestamp for each message

4. **AI Data Service** (`lib/aiDataService.ts`)
   - Query functions for each data source
   - Intelligent query routing based on user intent
   - Data aggregation and formatting
   - Chart data preparation

5. **API Route** (`app/api/ai-assistant/route.ts`)
   - OpenAI GPT-4 integration
   - Context building with actual data
   - Conversation history management
   - Error handling

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install openai
```

### 2. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it will only be shown once)

### 3. Configure Environment Variables

Add to your `.env.local` file:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Important**: Never commit your `.env.local` file to version control!

### 4. Verify Setup

1. Start the development server: `npm run dev`
2. Click the "Talk to us" button in the header
3. Try a test query like "What are my top keywords in SEMrush?"

## 💡 Example Queries

### SEMrush
- "What are my top keywords in SEMrush?"
- "Show me the site health score"
- "What errors do I have on my website?"

### Google Analytics
- "Show me Google Analytics traffic for last month"
- "How many users visited my site?"
- "What's my engagement rate?"

### Search Console
- "What's my Google Search Console CTR?"
- "Show me search impressions"
- "What's my average position?"

### Paid Campaigns
- "How are my LinkedIn ads performing?"
- "What's my Google Ads spend?"
- "Show me conversion rates for paid campaigns"

### Social Media
- "How is our social media performing?"
- "Show me Instagram engagement"
- "What's our Facebook reach?"

### HubSpot
- "How many deals do we have?"
- "What's our top lead source?"
- "Show me HubSpot pipeline data"

## 🎨 UI/UX Features

### Modal Design
- Full-width modal with 85vh height
- Gradient header matching brand colors
- Smooth backdrop blur effect
- Responsive design for all screen sizes

### Chat Interface
- User messages: Blue-purple gradient (right-aligned)
- AI messages: White background (left-aligned)
- Avatar icons for both user and assistant
- Smooth scroll to latest message
- Loading indicator during processing

### Chart Integration
- Automatic chart rendering when data is visual
- Supports Line and Bar charts
- Responsive chart sizing
- Consistent styling with dashboard theme

## 🔒 Security Considerations

1. **API Key Protection**
   - OpenAI API key stored in environment variables
   - Never exposed to client-side code
   - All AI processing happens server-side

2. **Data Access**
   - Only queries data user already has access to
   - Respects date range filters
   - No data modification capabilities

3. **Rate Limiting** (Recommended for production)
   - Consider implementing rate limits on the API route
   - Monitor OpenAI usage and costs
   - Set up budget alerts in OpenAI dashboard

## 📊 Data Query Flow

```
User Query → AI Assistant Component
    ↓
API Route (/api/ai-assistant)
    ↓
1. Parse user intent
2. Query relevant data (aiDataService.ts)
3. Build context with real data
4. Send to OpenAI GPT-4
5. Get AI-generated response
    ↓
Return to client with:
- AI response text
- Chart data (if applicable)
- Chart type (line/bar)
```

## 🎯 Query Intent Detection

The system automatically detects user intent and routes to appropriate data sources:

- **Keywords mentioned** → SEMrush keywords
- **"site health", "errors"** → SEMrush site health
- **"analytics", "traffic", "sessions"** → Google Analytics
- **"search console", "impressions"** → Search Console
- **"linkedin ad"** → LinkedIn Ads
- **"google ad"** → Google Ads
- **"hubspot", "deals"** → HubSpot
- **"social", platform names** → Oktopost

## 🚀 Performance Optimization

1. **Conversation History Limiting**
   - Only last 5 messages sent to OpenAI
   - Reduces token usage and costs
   - Maintains relevant context

2. **Data Query Limits**
   - Top 10 results sent to AI for context
   - Full data available for chart rendering
   - Optimized for response time

3. **No Session Storage**
   - Chat resets on modal close
   - Reduces memory usage
   - Fresh start for each session

## 🐛 Troubleshooting

### "OpenAI API key is not configured"
**Solution**: Add `OPENAI_API_KEY` to your `.env.local` file

### "Failed to get response"
**Possible causes**:
1. Invalid API key
2. OpenAI API rate limit reached
3. Network connectivity issues
4. Insufficient OpenAI credits

**Solution**: Check API key, verify OpenAI account status

### Charts not displaying
**Possible causes**:
1. No data available for date range
2. Data format issues

**Solution**: Check database has data for selected date range

### Slow responses
**Possible causes**:
1. OpenAI API latency
2. Large conversation history
3. Complex data queries

**Solution**: Normal for first query; subsequent should be faster

## 💰 Cost Considerations

- **GPT-4 Pricing**: ~$0.03 per 1K prompt tokens, ~$0.06 per 1K completion tokens
- **Average Query Cost**: $0.01 - $0.05 per query
- **Estimated Monthly Cost** (100 queries/day): $30-150

**Recommendations**:
1. Set up billing alerts in OpenAI dashboard
2. Monitor usage in OpenAI usage dashboard
3. Consider GPT-3.5-turbo for cost reduction (change model in API route)
4. Implement caching for common queries (future enhancement)

## 🔮 Future Enhancements

1. **Session Persistence**
   - Save chat history to local storage
   - Resume conversations

2. **Advanced Visualizations**
   - Pie charts, area charts
   - Multi-metric comparisons
   - Trend analysis charts

3. **Export Capabilities**
   - Export chat as PDF
   - Download chart images
   - Copy responses to clipboard

4. **Voice Input**
   - Speech-to-text for queries
   - Hands-free interaction

5. **Proactive Insights**
   - AI-generated daily summaries
   - Anomaly detection alerts
   - Automated recommendations

## 📝 Notes

- The AI Assistant is designed for public demo use (no authentication)
- Chat history is not saved between sessions
- All data queries respect the current date range filter
- The assistant can only answer questions about available data in the database

## 🎉 Success Metrics

Track these metrics to measure AI Assistant adoption:
1. Number of queries per day
2. Average conversation length
3. Most common query types
4. User satisfaction (future: add feedback buttons)
5. Query response time
