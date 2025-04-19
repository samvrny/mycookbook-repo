/**
 * GPT generated code for wrapping the protected routes...
 */

import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

export default function RequireAuthWrapper({ children }) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  if (authStatus === "configuring") {
    // While Amplify is figuring out auth status, render nothing or a loader
    return <p>Loading authentication...</p>;
  }

  return (authStatus === "authenticated" ? children : <Navigate to="/login" replace />);
}