import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@aws-amplify/ui-react/styles.css' //IMPORT STYLESHEET FOR COGNITO
import './styles/style.css'
// import './styles/style.css'
// import './styles/media-queries.css'
import App from './App.jsx'

//Import auth
/**
 * NOTE: The Provider part is important below!!! It prevents the page
 * from just auto-directing to the login form. 
 */
import { Authenticator } from '@aws-amplify/ui-react'

/**
 * Import the Amplify configuration needed for the application
 * to run properly
 */
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

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