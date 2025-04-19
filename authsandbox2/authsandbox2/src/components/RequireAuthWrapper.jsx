/**
 * GPT generated code for wrapping the protected routes...
 */

import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

export default function RequireAuthWrapper({ children }) {
//   const { authStatus } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return (authStatus === "authenticated" ? children : <Navigate to="/login" replace />);
}

//Route example: 
{/* <Route path="/dashboard" element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  } /> */}