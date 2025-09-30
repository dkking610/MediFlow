import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div className={`p-6 bg-glass-bg rounded-2xl shadow-lg backdrop-blur-lg border border-glow-border ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;