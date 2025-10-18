Innobotix (Lovable-inspired Robotics AI Platform)

Quick start
- npm install
- npm run dev

Pages
- / : Homepage with Lovable-style hero and CTA "Start Your Project"
- /innobot : Chatbot (left input, right chat area, animations, markdown-friendly)
- /starter-kits : Product grid and CTAs
- /custom-builds : Idea submission form + CTA to talk to an expert
- /about : Company page
- /privacy, /terms : Legal pages

Environment
- Netlify functions in /api
- Required env vars (Netlify):
  - PERPLEXITY_API_KEY: your Perplexity Pro API key
  - GMAIL_USER, GMAIL_APP_PASSWORD: for /api/send-email (optional)

Perplexity integration
- Client calls POST /api/perplexity-chat with { messages: [{ role, content }] }
- Server proxies to Perplexity chat/completions with a robotics-focused system prompt

Branding
- Primary: black/gray backgrounds
- Accents: blue/cyan
- Fonts: Inter for clarity; large headings

Accessibility
- Keyboard-navigable controls, focus styles, reduced-motion support

Deployment (Netlify)
- netlify.toml configured for functions and dev server
