// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// Imports for Auth with cognito....

import { Amplify } from 'aws-amplify';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App({ signOut }) {
  return (
    <div>
      <header>
        This is an application
      </header>

      <h1>Thankyou for doing verification</h1>

      <section>Holy Moly</section>
      
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

//Alright well.... the authenticator works. Ish... (:) SO now... lol this is 
//going to be a little bit more complicated than I thought it was going to be,
//and require some serious time and devotion.
export default withAuthenticator(App);
