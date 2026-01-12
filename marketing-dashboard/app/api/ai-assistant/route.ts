import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { queryData } from '@/lib/aiDataService';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, dateRange, conversationHistory } = await request.json();

    if (!message || !dateRange) {
      return NextResponse.json(
        { error: 'Message and date range are required' },
        { status: 400 }
      );
    }

    console.log(`[AI Assistant] Processing query: "${message}" for ${dateRange}`);

    // Step 1: Query relevant data from database
    const dataResult = await queryData(message, dateRange);
    
    console.log(`[AI Assistant] Data query result: ${dataResult.summary}`);

    // Step 2: Build context for OpenAI
    const systemPrompt = `You are a helpful marketing analytics assistant for XMetrics Dashboard. 
You have access to real marketing data across multiple platforms including:
- Google Analytics (traffic, sessions, users, engagement)
- Google Search Console (impressions, clicks, CTR, position)
- SEMrush (keywords, site health, SEO rankings)
- LinkedIn Ads (spend, clicks, conversions, impressions)
- Google Ads (cost, clicks, conversions)
- HubSpot (deals, contacts, pipeline)
- Social Media (Oktopost - LinkedIn, Instagram, Facebook, Twitter)

Current date range: ${dateRange}

When answering:
1. Be concise and data-driven
2. Highlight key insights and trends
3. Use specific numbers from the data
4. Provide actionable recommendations when appropriate
5. If data shows concerning trends, mention them
6. Use emojis sparingly for better readability

Data retrieved for this query:
${dataResult.summary}

Full data context:
${JSON.stringify(dataResult.data.slice(0, 10), null, 2)}`;

    // Build conversation history for context
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add recent conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: message,
    });

    // Step 3: Get AI response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content || 'I apologize, but I could not generate a response.';

    console.log(`[AI Assistant] AI Response generated successfully`);

    // Step 4: Return response with optional chart data
    return NextResponse.json({
      message: aiResponse,
      chartData: dataResult.chartData,
      chartType: dataResult.chartType,
      dataSource: dataResult.data.length > 0 ? 'database' : 'none',
    });

  } catch (error: any) {
    console.error('[AI Assistant] Error:', error);
    
    // Handle specific OpenAI errors
    if (error?.error?.type === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured or invalid' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to process AI request',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
