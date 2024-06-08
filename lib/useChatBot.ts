import { useState } from 'react';
import { useAI } from './useAI';

interface Message {
  msg: string;
  role: 'user' | 'robot';
}

const useChatBot = (): [Message[], (string) => void] => {
  const [enabled, ai] = useAI()
  const [messages, setMessages] = useState<Message[]>([]);

  const ask = (question: string) => {
    if (!enabled) return
    setMessages((prevMessages) => [...prevMessages, { msg: question, role: 'user' }]);
    ai.prompt(question).then((response) => {
      setMessages((prevMessages) => [...prevMessages, { msg: response, role: 'robot' }]);
    })
  }

  return [ messages, ask ];
};

export default useChatBot;
