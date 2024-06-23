import { useState } from 'react';
import { useAI } from './useAI';

interface Message {
  msg: string;
  role: 'user' | 'robot';
}

const useChatBot = (): [Message[], (string) => void] => {
  const [enabled, ai] = useAI()
  const [messages, setMessages] = useState<Message[]>([]);

  const ask = (question: string, article: string | null = null) => {
    if (!enabled) return
    console.log('🤖 Asking AI:', question, article)

    setMessages((prevMessages) => [...prevMessages, { msg: question, role: 'user' }]);

    const prompt = article && question === '/summary' ? `<TEXTOFARTICLE>${article.trim()}</TEXTOFARTICLE>\n简短总结以上内容。` : question

    ai.prompt(prompt).then((response) => {
      setMessages((prevMessages) => [...prevMessages, { msg: response, role: 'robot' }]);
    })
  }

  return [messages, ask];
};

export default useChatBot;
