// src/pages/AuthPage.jsx
// import { useEffect } from 'react';
// import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
// import { useLocation } from 'react-router-dom';

// export default function AuthPage() {
//   const location = useLocation();
//   const { toSignIn, toSignUp } = useAuthenticator();

//   useEffect(() => {
//     if (location.pathname === '/sign-up') {
//       toSignUp();
//     } else if (location.pathname === '/sign-in') {
//       toSignIn();
//     }
//   }, [location.pathname, toSignIn, toSignUp]);

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto' }}>
//       <Authenticator />
//     </div>
//   );
// }

// import { Authenticator } from '@aws-amplify/ui-react';
// import { useLocation } from 'react-router-dom';

// export default function AuthPage() {
//   const location = useLocation();

//   const initialState = location.pathname === '/sign-up' ? 'signUp' : 'signIn';

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto' }}>
//       <Authenticator initialState={initialState} />
//     </div>
//   );
// }

// src/pages/AuthPage.jsx
// import { Authenticator } from '@aws-amplify/ui-react';
// import { useLocation } from 'react-router-dom';

// export default function AuthPage() {
//   const location = useLocation();

//   // Generate a key based on the pathname to force a re-render
//   const initialState = location.pathname === '/sign-up' ? 'signUp' : 'signIn';
  
//   return (
//     <div style={{ maxWidth: 400, margin: 'auto' }}>
//       <Authenticator key={location.pathname} initialState={initialState} />
//     </div>
//   );
// }

// src/pages/AuthPage.jsx
import { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';

export default function AuthPage() {
  const location = useLocation();
  const [authState, setAuthState] = useState('');

  // Update the auth state when the route changes
  useEffect(() => {

    if (location.pathname === '/sign-up') {
      setAuthState('signUp');
    } else {
      setAuthState('signIn');
    }
  }, [location.pathname]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      {/* Pass authState as a dynamic prop */}
      <Authenticator initialState={authState} />
    </div>
  );
}
