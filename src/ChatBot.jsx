import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const mockResponses = {
  vlan: "A Virtual Local Area Network (VLAN) is any broadcast domain that is partitioned and isolated in a computer network at the data link layer (OSI layer 2). In Packet Tracer, you configure this on switches using the 'vlan [id]' command.",
  ospf: "Open Shortest Path First (OSPF) is a routing protocol for Internet Protocol (IP) networks. It uses a link state routing (LSR) algorithm. A basic config involves defining the router ospf process and mapping network areas: 'network [ip] [wildcard] area [id]'.",
  bgp: "Border Gateway Protocol (BGP) is the routing protocol of the internet. It's used to route traffic between different Autonomous Systems (AS). eBGP handles external routing, and iBGP handles internal.",
  subnet: "Subnetting allows you to create multiple logical networks from a single Class network. The formula for usable hosts is 2^h - 2, where 'h' is the number of remaining host bits after borrowing for the subnet.",
  default: "I am your NetVault Technical Assistant. I specialize in addressing networking fundamentals like VLANs, OSPF, BGP, Subnetting, and basic firewall rules. Ask me a networking question!"
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Terminal Online. How can I assist your networking configuration today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Simulate AI delay and response
    setTimeout(() => {
      let response = mockResponses.default;
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('vlan')) response = mockResponses.vlan;
      else if (lower.includes('ospf')) response = mockResponses.ospf;
      else if (lower.includes('bgp')) response = mockResponses.bgp;
      else if (lower.includes('subnet') || lower.includes('ip')) response = mockResponses.subnet;

      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 800);
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="glow-btn success"
            style={{ width: '60px', height: '60px', borderRadius: '50%', padding: 0, justifyContent: 'center', boxShadow: '0 0 20px var(--accent-green-glow)' }}
          >
            <MessageSquare size={28} />
          </button>
        )}

        {isOpen && (
          <div className="card" style={{ width: '350px', height: '500px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.8)', borderColor: 'var(--accent-green)' }}>
            
            {/* Header */}
            <div style={{ padding: '1rem', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)' }}>
                <Bot size={20} />
                <span style={{ fontWeight: 'bold' }}>NetVault AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Message Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-panel)' }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', gap: '0.5rem' }}>
                  <div style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: msg.sender === 'user' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 255, 0, 0.1)', color: msg.sender === 'user' ? 'var(--accent-cyan)' : 'var(--accent-green)' }}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div style={{ maxWidth: '75%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-dark)', border: '1px solid', borderColor: msg.sender === 'user' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 255, 0, 0.3)', fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-dark)' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about networking..." 
                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px 0 0 4px', borderRight: 'none' }}
              />
              <button type="submit" className="glow-btn success" style={{ borderRadius: '0 4px 4px 0', borderLeft: 'none', padding: '0 1rem' }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
