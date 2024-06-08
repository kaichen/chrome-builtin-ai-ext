import { useState } from "react"
import { useAI } from "~lib/useAI"

import "~style.css"

function DisabledComponent() {
  return <p className="text-sm text-slate-700">Not available on your chrome.</p>
}

function TellMeAJoke({ session }) {
  if (!session) {
    return null
  }
  const [joke, setJoke] = useState(null);

  const tellMeAJoke = async () => {
    console.log(session)
    const resp = await session.prompt('tell me a joke');
    setJoke(resp);
  }

  return (
    <div>
      <button onClick={tellMeAJoke} className="plasmo-rounded-2xl plasmo-bg-blue-300 plasmo-px-3 plasmo-py-2">Tell me a joke</button>
      {joke && <p>{joke}</p>}
    </div>
  )
}

function IndexPopup() {
  const [enabled, ai] = useAI()

  return (
    <div className="plasmo-px-3 plasmo-py-5 plasmo-w-48">
      <h2 className="plasmo-text-lg plasmo-text-slate-900 plasmo-font-bold">
        Welcome to{" "}
        <a href="https://developer.chrome.com/docs/ai/built-in" target="_blank">
          Chrome Built-in AI
        </a>
      </h2>
      {enabled ? <TellMeAJoke session={ai} /> : <DisabledComponent />}
    </div>
  )
}

export default IndexPopup
