import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { invoke } from '@tauri-apps/api'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response))