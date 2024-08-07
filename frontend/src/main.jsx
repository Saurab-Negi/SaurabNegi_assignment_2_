import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CardProvider } from './components/Context/CardContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CardProvider>
    <App />
  </CardProvider>,
)
