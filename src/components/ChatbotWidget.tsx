'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [...prev, { role: 'bot', content: data.response }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Lo siento, hubo un error. Por favor intenta de nuevo.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .masfred-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: var(--font-inter, system-ui, sans-serif);
        }

        /* ── Botón flotante ── */
        .masfred-fab {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(100,48,24,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }
        .masfred-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(100,48,24,0.55);
        }
        .masfred-fab-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(200,150,62,0.4);
          animation: fabPulse 2.5s ease-in-out infinite;
        }
        @keyframes fabPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.15); opacity: 0; }
        }

        /* ── Ventana del chat ── */
        .masfred-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 380px;
          height: 560px;
          background: #FFF6D3;
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(61,26,10,0.3);
          border: 1px solid rgba(100,48,24,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: chatIn 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Header ── */
        .masfred-header {
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .masfred-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .masfred-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(200,150,62,0.15);
          border: 1.5px solid rgba(200,150,62,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .masfred-header h3 {
          font-family: var(--font-playfair, Georgia, serif);
          font-weight: 700;
          font-size: 16px;
          color: #FFF6D3;
          margin: 0 0 2px;
          line-height: 1;
        }
        .masfred-header p {
          font-size: 11px;
          color: rgba(255,246,211,0.55);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .masfred-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #AAC071;
          display: inline-block;
          box-shadow: 0 0 6px rgba(170,192,113,0.8);
        }
        .masfred-close {
          background: rgba(255,246,211,0.08);
          border: 1px solid rgba(255,246,211,0.12);
          color: rgba(255,246,211,0.7);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
        }
        .masfred-close:hover {
          background: rgba(200,150,62,0.2);
          color: #C8963E;
        }

        /* ── Mensajes ── */
        .masfred-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #FFF6D3;
          scroll-behavior: smooth;
        }
        .masfred-messages::-webkit-scrollbar { width: 4px; }
        .masfred-messages::-webkit-scrollbar-track { background: transparent; }
        .masfred-messages::-webkit-scrollbar-thumb { background: rgba(100,48,24,0.15); border-radius: 4px; }

        .masfred-welcome {
          text-align: center;
          background: #fff;
          border: 1px solid rgba(100,48,24,0.08);
          border-radius: 16px;
          padding: 20px 16px;
          margin: 8px 0;
          box-shadow: 0 2px 12px rgba(100,48,24,0.06);
        }
        .masfred-welcome-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .masfred-welcome h4 {
          font-family: var(--font-playfair, Georgia, serif);
          font-weight: 700;
          font-size: 15px;
          color: #643018;
          margin: 0 0 6px;
        }
        .masfred-welcome p {
          font-family: var(--font-lora, Georgia, serif);
          font-style: italic;
          font-size: 12px;
          color: rgba(61,26,10,0.55);
          margin: 0;
          line-height: 1.6;
        }

        /* Sugerencias rápidas */
        .masfred-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
          justify-content: center;
        }
        .masfred-suggestion-btn {
          background: #FFF6D3;
          border: 1px solid rgba(100,48,24,0.2);
          color: #643018;
          font-size: 11px;
          font-family: var(--font-inter, system-ui);
          padding: 5px 10px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .masfred-suggestion-btn:hover {
          background: #643018;
          color: #FFF6D3;
          border-color: #643018;
        }

        /* Burbujas */
        .masfred-bubble-row {
          display: flex;
        }
        .masfred-bubble-row.user { justify-content: flex-end; }
        .masfred-bubble-row.bot  { justify-content: flex-start; }

        .masfred-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 13px;
          line-height: 1.6;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .masfred-bubble.user {
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
          color: #FFF6D3;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 12px rgba(100,48,24,0.25);
        }
        .masfred-bubble.bot {
          background: #fff;
          color: #3D1A0A;
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(100,48,24,0.08);
          box-shadow: 0 2px 10px rgba(100,48,24,0.06);
          font-family: var(--font-inter, system-ui);
        }

        /* Typing indicator */
        .masfred-typing {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: #fff;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(100,48,24,0.08);
          width: fit-content;
          box-shadow: 0 2px 10px rgba(100,48,24,0.06);
        }
        .masfred-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(100,48,24,0.3);
          animation: typingDot 1.2s ease-in-out infinite;
        }
        .masfred-typing span:nth-child(2) { animation-delay: 0.2s; }
        .masfred-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }

        /* ── Input ── */
        .masfred-input-area {
          padding: 12px 14px;
          background: #fff;
          border-top: 1px solid rgba(100,48,24,0.08);
          display: flex;
          gap: 8px;
          align-items: flex-end;
          flex-shrink: 0;
        }
        .masfred-input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid rgba(100,48,24,0.2);
          border-radius: 12px;
          font-size: 13px;
          color: #3D1A0A;
          font-family: var(--font-inter, system-ui);
          background: #FFF6D3;
          outline: none;
          resize: none;
          max-height: 80px;
          line-height: 1.5;
          transition: border-color 0.2s ease;
        }
        .masfred-input::placeholder { color: rgba(61,26,10,0.35); }
        .masfred-input:focus { border-color: #C8963E; }
        .masfred-send {
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
          border: none;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.15s ease, opacity 0.2s ease;
          box-shadow: 0 4px 12px rgba(100,48,24,0.3);
        }
        .masfred-send:hover:not(:disabled) { transform: scale(1.06); }
        .masfred-send:disabled { opacity: 0.45; cursor: not-allowed; }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .masfred-window {
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            height: 100dvh;
            border-radius: 0;
            border: none;
          }
          .masfred-fab {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>

      <div className="masfred-chat-widget">

        {/* ── Botón flotante ── */}
        {!isOpen && (
          <button
            className="masfred-fab"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir asistente Coffee Masfred"
          >
            <div className="masfred-fab-pulse" />
            {/* SVG taza de café */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8963E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
          </button>
        )}

        {/* ── Ventana del chat ── */}
        {isOpen && (
          <div className="masfred-window" role="dialog" aria-label="Chat Coffee Masfred">

            {/* Header */}
            <div className="masfred-header">
              <div className="masfred-header-info">
                <div className="masfred-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8963E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                    <line x1="6" y1="1" x2="6" y2="4"/>
                    <line x1="10" y1="1" x2="10" y2="4"/>
                    <line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>
                </div>
                <div>
                  <h3>Asistente Masfred</h3>
                  <p>
                    <span className="masfred-online-dot" />
                    En línea · Huila, Colombia 🇨🇴
                  </p>
                </div>
              </div>
              <button
                className="masfred-close"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </div>

            {/* Mensajes */}
            <div className="masfred-messages">
              {messages.length === 0 && (
                <div className="masfred-welcome">
                  <div className="masfred-welcome-icon">☕</div>
                  <h4>¡Bienvenido a Coffee Masfred!</h4>
                  <p>
                    Soy tu asistente del Huila. Pregúntame sobre nuestros cafés,
                    orígenes, procesos o cómo hacer tu pedido.
                  </p>
                  <div className="masfred-suggestions">
                    {[
                      '¿Cuál café me recomiendas?',
                      '¿Cómo hago un pedido?',
                      '¿Qué es el proceso natural?',
                      '¿Cuál es la diferencia entre Guadalupe e Isnos?',
                    ].map((s) => (
                      <button
                        key={s}
                        className="masfred-suggestion-btn"
                        onClick={() => {
                          setInput(s);
                          setTimeout(() => {
                            setInput('');
                            const fakeEvent = { target: { value: s } } as React.ChangeEvent<HTMLTextAreaElement>;
                            setInput(s);
                          }, 0);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`masfred-bubble-row ${msg.role === 'user' ? 'user' : 'bot'}`}>
                  <div className={`masfred-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="masfred-bubble-row bot">
                  <div className="masfred-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="masfred-input-area">
              <textarea
                className="masfred-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe tu mensaje..."
                rows={1}
                aria-label="Mensaje"
              />
              <button
                className="masfred-send"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Enviar mensaje"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF6D3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
