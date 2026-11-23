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
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-amber-300 text-stone-900 rounded-3xl max-w-lg w-full h-[600px] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-b border-amber-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-amber-950 text-base flex items-center gap-2">
                <span>Bhavna AI Yantra Advisor</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </h3>
              <p className="text-[11px] text-stone-600">
                Trained on Sacred Geometry, Rituals & Order FAQs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
            title="Close AI Advisor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Container with light clean background */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-amber-50/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  msg.sender === 'user' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-700" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl space-y-1 shadow-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-tr-none'
                    : 'bg-white border border-amber-200 text-stone-800 rounded-tl-none shadow-sm'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block text-right font-mono ${
                    msg.sender === 'user' ? 'text-amber-100' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips with light background */}
        <div className="px-4 py-2.5 bg-amber-50/70 border-t border-amber-200 flex gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-medium transition-colors shadow-sm cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form with light styling */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 bg-white border-t border-amber-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Yantra placement, copper cleaning..."
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl shadow transition-all active:scale-95 cursor-pointer"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
