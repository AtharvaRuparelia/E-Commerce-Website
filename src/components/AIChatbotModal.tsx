import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, X, Flame, ShieldCheck } from 'lucide-react';

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste! 🙏 I am your Bhavna AI Yantra Advisor. How can I assist you with sacred copper Yantra placement, ritual guidelines, copper maintenance, or order delivery status today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickQuestions = [
    'Where should I place the Shree Yantra in my home?',
    'How do I clean and maintain pure copper Yantras?',
    'What makes pure copper Yantras unique?',
    'How do I track my order delivery status?'
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate intelligent AI response based on knowledge base
    setTimeout(() => {
      let reply =
        'Thank you for asking! For optimal spiritual energy, ensure sacred copper Yantras are placed on a clean altar in the East or North direction. Feel free to ask more about specific Yantra geometry or care tips.';

      const lower = userText.toLowerCase();
      if (lower.includes('shree yantra') || lower.includes('place') || lower.includes('direction')) {
        reply =
          '✨ Sacred Placement Guidelines: The Shree Yantra should ideally be placed on a clean wooden altar facing EAST or NORTH-EAST. Ensure morning sunlight reaches the Yantra if possible. Keep it elevated at eye level or above, never on the floor.';
      } else if (lower.includes('clean') || lower.includes('maintain') || lower.includes('wash')) {
        reply =
          '🧼 Copper Maintenance Tips: Clean pure copper Yantras gently using pitambari powder, lemon juice, or tamarind paste mixed with water. Wipe dry immediately with a soft cotton cloth to prevent tarnish. Avoid harsh synthetic chemical detergents or abrasive scrubbers.';
      } else if (lower.includes('copper') || lower.includes('quality') || lower.includes('craft')) {
        reply =
          '🪔 Pure Heavy Copper Quality: All our Yantras feature 99.9% pure heavy gauge copper base plates with 0.8mm deep acid etching. They come with a protective lacquer coating that prevents tarnishing over time, ensuring long-lasting mirror-bright resonance.';
      } else if (lower.includes('track') || lower.includes('order') || lower.includes('delivery')) {
        reply =
          '📦 Delivery & Order Tracking: Click on "My Orders" in the top menu bar to view your live progress timeline (Placed ➔ Packed ➔ Dispatched ➔ Delivered) and download your official PDF invoice!';
      } else if (lower.includes('kuber') || lower.includes('money') || lower.includes('finance')) {
        reply =
          '💰 Kuber Yantra Guidelines: Lord Kuber Yantra attracts financial abundance and wealth stability. Place it inside your office desk drawer, cash locker, or shop counter facing North.';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-600/40 text-stone-100 rounded-3xl max-w-lg w-full h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-stone-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-stone-950 flex items-center justify-center font-bold shadow">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-amber-200 text-sm flex items-center gap-1.5">
                <span>Bhavna AI Yantra Advisor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[10px] text-stone-400">
                Trained on Sacred Geometry, Rituals & Delivery FAQs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white bg-stone-800 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-stone-950 shrink-0 ${
                  msg.sender === 'user' ? 'bg-amber-400' : 'bg-amber-600'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl space-y-1 shadow ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span
                  className={`text-[9px] block text-right font-mono ${
                    msg.sender === 'user' ? 'text-stone-900/70' : 'text-stone-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-stone-950/80 border-t border-stone-800 flex gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-600/30 px-3 py-1 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Yantra placement, copper cleaning..."
            className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl shadow transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
