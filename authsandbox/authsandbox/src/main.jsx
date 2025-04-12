import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css' //IMPORT THE NEW STYLESHEET
import App from './App.jsx'

//Import auth
/**
 * NOTE: The Provider part is important below!!! It prevents the page
 * from just auto-directing to the login form. 
 */
import { Authenticator } from '@aws-amplify/ui-react'

//IMPORT THE BROWSERROUTER
/**
 * Note below: the App component (allegedly) needs to be wrapped in the 
 * BrowserRouter component
 */
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authenticator.Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Authenticator.Provider>
  </StrictMode>,
)
