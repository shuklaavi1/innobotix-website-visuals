// Netlify Function: Proxy to Perplexity Pro Chat Completions (no key exposed to client)
// POST /api/perplexity-chat { messages: [{ role: 'user'|'assistant'|'system', content: string }], model?, temperature?, max_tokens? }

const PERPLEXITY_URL = 'https://api.perplexity.ai/chat/completions';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing PERPLEXITY_API_KEY' }) };
  }

  try {
    const { messages, model, temperature, max_tokens } = JSON.parse(event.body || '{}');

    const systemPrompt = {
      role: 'system',
      content: "You are Innobot, India's next-gen AI agent for robotics. Generate step-by-step project roadmaps, BOM lists with part numbers, pin mappings, wiring tables, Arduino/Python/C++ code blocks, and PCB/circuit guidance. Be concise, accurate, and use Markdown with headings, bullet lists, tables, and fenced code blocks. Prefer metric units."
    };

    const finalMessages = Array.isArray(messages) && messages.length
      ? [systemPrompt, ...messages]
      : [systemPrompt, { role: 'user', content: 'Create a sample robotics roadmap.' }];

    const body = {
      model: model || 'llama-3.1-sonar-large-128k-online',
      messages: finalMessages,
      temperature: typeof temperature === 'number' ? temperature : 0.4,
      max_tokens: typeof max_tokens === 'number' ? max_tokens : 1200,
      stream: false // You can toggle to true and upgrade client to stream
    };

    const resp = await fetch(PERPLEXITY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: resp.status, body: JSON.stringify({ error: 'Perplexity API error', details: text }) };
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || '';

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error', details: String(err?.message || err) }) };
  }
};