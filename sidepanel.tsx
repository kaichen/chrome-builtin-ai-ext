import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { FaRobot } from "react-icons/fa6"

import { useAI } from "~lib/useAI"
import useChatBot from "~lib/useChatBot"

import "~style.css"

function UserMessage({ message }) {
  return (
    <div className="plasmo-flex plasmo-items-start plasmo-mb-4 plasmo-justify-end">
      <div className="plasmo-bg-blue-500 plasmo-text-white plasmo-rounded-lg plasmo-p-4">
        <p className="plasmo-text-sm">{message}</p>
      </div>
      <FaUser className="plasmo-size-8 plasmo-ml-2 plasmo-mt-2" />
    </div>
  )
}
function RobotMessage({ message }) {
  return (
    <div className="plasmo-flex plasmo-items-start plasmo-mb-4">
      <FaRobot className="plasmo-size-8 plasmo-mr-2 plasmo-mt-2" />
      <div className="plasmo-bg-gray-200 plasmo-rounded-lg plasmo-p-4">
        <p className="plasmo-text-sm">{message}</p>
      </div>
    </div>
  )
}

function IndexSidePanel() {
  const [enabled, _] = useAI()
  const [messages, ask] = useChatBot()
  const [inputValue, setInputValue] = useState('');
  const [article, setArticle] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSendMessage = () => {
    console.log('⌨️ Asking AI\'s input:', inputValue, article)
    ask(inputValue, article?.textContent);
    setInputValue('');
  }

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log('📚 Storage change:', key, oldValue, newValue)
        if (key === "readableContent" && newValue) setArticle(newValue);
      }
    });
  }, []);

  return (
    <div className="plasmo-px-4 plasmo-py-8 plasmo-h-screen plasmo-flex plasmo-flex-col">
      <h1 className="plasmo-text-3xl plasmo-font-bold plasmo-mb-4">
        Chat to Chrome AI
      </h1>
      <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-lg plasmo-px-3 plasmo-py-5 plasmo-mb-4 plasmo-flex-grow">
        <div className="plasmo-mb-4 plasmo-overflow-y-auto">
          <RobotMessage message="你好，我是 Chrome 内置本地 AI" />
          {messages.map((msg, idx) => (
            msg.role === "user" ? (
              <UserMessage key={idx} message={msg.msg} />
            ) : (
              <RobotMessage key={idx} message={msg.msg} />
            )
          ))}
        </div>
      </div>
        <div className="plasmo-flex">
          <input
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            disabled={!enabled}
            className="plasmo-flex-grow plasmo-border plasmo-border-gray-300 plasmo-rounded-l-lg plasmo-rounded-r-none plasmo-px-4 plasmo-py-2 plasmo-focus:plasmo-outline-none plasmo-focus:plasmo-ring-2 plasmo-focus:plasmo-ring-blue-500"
            placeholder="输入消息..."
          />
          <button
            onClick={handleSendMessage}
            className="plasmo-bg-blue-500 plasmo-hover:plasmo-bg-blue-600 plasmo-text-white plasmo-font-bold plasmo-rounded-r-lg plasmo-rounded-l-none plasmo-px-4 plasmo-py-2"
          >
            发送
          </button>
        </div>
    </div>
  )
}

export default IndexSidePanel
