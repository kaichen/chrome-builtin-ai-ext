import { useState } from "react"
import { useAI } from "~lib/useAI"
import { useChromeVersion } from "~lib/useChromeVersion"

import "~style.css"

function DisabledComponent() {
  const [_, majorVersion] = useChromeVersion()

  return majorVersion >= 127 ? (
    <p className="plasmo-text-sm plasmo-text-slate-700">请在 chrome://flags 中启用内置 AI 功能</p>
  ) : (
    <p className="plasmo-text-sm plasmo-text-slate-700">请安装 Chrome 开发版或 Canary 版本以使用内置 AI 功能</p>
  );
}

function TellMeAJoke({ session }) {
  if (!session) {
    return null
  }
  const [joke, setJoke] = useState(null);

  const tellMeAJoke = async () => {
    const resp = await session.prompt('讲一个程序员笑话');
    setJoke(resp);
  }

  return (
    <div className="plasmo-mt-4">
      <button onClick={tellMeAJoke} className="plasmo-rounded-2xl plasmo-bg-blue-500 plasmo-text-slate-100 plasmo-px-5 plasmo-py-2">讲个笑话</button>
      {joke && <p className="plasmo-mt-2 plasmo-bg-gray-100 plasmo-px-3 plasmo-py-2">{joke}</p>}
    </div>
  )
}

function OpenSidePanelButton() {
  const open = () => {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }).then(([tab]) => {
      chrome.sidePanel.open({tabId: tab.id })
    })
  }
  return (
    <button
      onClick={open}
      className="plasmo-rounded-2xl plasmo-bg-blue-500 plasmo-text-slate-100 plasmo-px-5 plasmo-py-2"
    >
      Chat to Chrome AI
    </button>
  )
}

function IndexPopup() {
  const [enabled, ai] = useAI()

  return (
    <div className="plasmo-px-3 plasmo-py-5 plasmo-w-64">
      <h2 className="plasmo-text-lg plasmo-text-slate-900 plasmo-font-bold">
        Welcome to<br/>
        <a href="https://developer.chrome.com/docs/ai/built-in" target="_blank" className="plasmo-text-blue-700">
          Chrome Built-in AI
        </a>
      </h2>
      <hr className="plasmo-my-4 plasmo-border-gray-300" />
      <OpenSidePanelButton />
      {enabled ? <TellMeAJoke session={ai} /> : <DisabledComponent />}
    </div>
  )
}

export default IndexPopup
