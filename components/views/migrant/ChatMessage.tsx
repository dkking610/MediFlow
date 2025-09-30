import React from 'react';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-accent-pink/80 text-white rounded-br-lg'
            : 'bg-black/20 text-text-primary rounded-bl-lg border border-glow-border'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;