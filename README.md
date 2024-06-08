# Explore Chrome Built-in AI

ref https://developer.chrome.com/docs/ai/built-in

## Dev Setup

First, run the development server:

```bash
pnpm dev # run dev environment
```

For further guidance, [visit plasmo Documentation](https://docs.plasmo.com/)

## Current API Schema

Keep exploring...

```
window.ai
- canCreateGenericSession(): boolean
- canCreateTextSession(): boolean
- createGenericSession(): AITextSession
- createTextSession(): AITextSession
- defaultGenericSessionOptions: {}
- defaultTextSessionOptions: {}

AITextSession {
  execute(text: string): ...
  executeStreaming(text: string): ...
  prompt(text: string): string
  promptStreaming(text: string): ...
  destroy(): void
}

```
