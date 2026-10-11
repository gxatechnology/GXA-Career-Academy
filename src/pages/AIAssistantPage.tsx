import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, User, RefreshCw, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Hello! I am your GXA AI Study Assistant. I'm trained on all GXA courses, technical curricula, and eBooks including Digital Marketing Mastery, Prompt Engineering, and Career Roadmaps. How can I help your learning today?",
      timestamp: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedPrompts = [
    'Explain few-shot vs chain-of-thought prompting with practical examples',
    'What are the 3 key phases for breaking into Tech Product Management in India?',
    'Summarize the core ROI framework from Digital Marketing Mastery eBook',
    'Help me debug my system instruction prompt for a customer support agent',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Response Simulation with educational context
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('prompt') || lower.includes('chain-of-thought')) {
        reply = `### Prompting Paradigms Breakdown:

1. **Few-Shot Prompting**:
   - Provides explicit input-output examples before the target query.
   - Example:
     \`\`\`
     Input: "Great service!" -> Sentiment: Positive
     Input: "Slow delivery" -> Sentiment: Negative
     Input: "Packed nicely but late" -> Sentiment:
     \`\`\`

2. **Chain-of-Thought (CoT)**:
   - Encourages the LLM to output intermediate reasoning steps before arriving at the conclusion.
   - Key Trigger: *"Let's think step by step"* or specifying explicit reasoning milestones.

**Recommendation for GXA Students:** Combine both into *Few-Shot CoT* when building deterministic production workflows.`;
      } else if (lower.includes('product management') || lower.includes('career')) {
        reply = `### 3 Phases to Break into Product Management in India:

1. **Foundational Domain Depth (Months 1–2)**:
   - Learn product metrics (DAU, CAC, LTV, Retention cohort analysis).
   - Read *"THE WHY — Career Guidance"* Chapter 4 on Skill Stacking.

2. **Proof of Work & Teardowns (Months 3–4)**:
   - Build 3 public product teardowns (e.g. Swiggy Instamart checkout dropoff, Zerodha order flow).
   - Document PRDs using standard Figma + Notion templates.

3. **Strategic Networking & APM Cohorts (Months 5–6)**:
   - Leverage GXA alumni network on LinkedIn. Apply to target B2B SaaS and high-growth consumer startups.`;
      } else if (lower.includes('marketing') || lower.includes('roi')) {
        reply = `### Core ROI Framework (From *Digital Marketing Mastery*):

- **Blended ROAS Target:** Aim for minimum 3.5x for D2C and high-margin services in Indian tier-1/tier-2 markets.
- **Micro-Conversion Tracking:** Never optimize solely for final purchase; track early engagement signals (Video Watch > 50%, Add to Cart, Lead Form Step 1).
- **Creative Velocity:** Rotate ad hooks every 7–10 days to combat ad fatigue and rising Meta CPMs.`;
      } else {
        reply = `Great inquiry! In the GXA curriculum, this concept connects directly to **practical application and systemic thinking**.

Key points to remember:
1. Establish verifiable goals before executing.
2. Track feedback loops continuously to iterate.
3. Reference our student community resource guides in your dashboard for downloadable templates.

Would you like a tailored quiz question on this topic to test your retention?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-primary-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                GXA Study Assistant
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
                  Online
                </span>
              </h1>
              <p className="text-xs text-white/50">Personalized AI tutor trained on all GXA academic materials</p>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages([
                {
                  id: '1',
                  sender: 'assistant',
                  text: 'Chat history reset. How can I assist your study session?',
                  timestamp: 'Just now',
                },
              ]);
            }}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Chat
          </button>
        </div>

        {/* Suggestion Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-white/40 flex items-center gap-1 shrink-0 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Prompts:
          </span>
          {predefinedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white whitespace-nowrap transition-colors"
            >
              {p.slice(0, 36)}...
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-[#101F45]/70 border border-white/10 rounded-3xl p-6 min-h-[500px] flex flex-col justify-between shadow-2xl backdrop-blur-md">
          {/* Messages list */}
          <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 mt-1 shadow">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none shadow-md'
                      : 'bg-[#000825]/80 border border-white/10 text-white/90 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <span className="block text-[10px] text-white/40 text-right mt-2">{msg.timestamp}</span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-white/80" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-cyan-400">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#000825]/80 border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-100" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-200" />
                  <span className="text-white/60 ml-2">GXA Assistant is synthesizing response...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="pt-4 border-t border-white/10 mt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3 bg-[#000825] border border-white/15 rounded-2xl p-2 focus-within:border-cyan-400 transition-colors"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about courses, career roadmaps, or prompt engineering..."
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:opacity-90 disabled:opacity-40 rounded-xl font-bold text-xs flex items-center gap-1.5 text-white transition-opacity shadow-md"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
