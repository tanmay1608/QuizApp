import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Router from './router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <Router/>
)
