import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { knowledgeBase } from './knowledge'
import { KnowledgeProvider } from './knowledge/KnowledgeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KnowledgeProvider base={knowledgeBase}>
      <App />
    </KnowledgeProvider>
  </StrictMode>,
)
