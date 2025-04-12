import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css' //IMPORT THE NEW STYLESHEET
import App from './App.jsx'

//IMPORT THE BROWSERROUTER
/**
 * Note below: the App component (allegedly) needs to be wrapped in the 
 * BrowserRouter component
 */
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
