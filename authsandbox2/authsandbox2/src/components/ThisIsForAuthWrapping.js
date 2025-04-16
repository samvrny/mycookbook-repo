/**
 * GPT generated code for wrapping the protected routes...
 */

import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { user } = useAuthenticator((context) => [context.user]);

  return user ? children : <Navigate to="/login" replace />;
}

//Route example: 
{/* <Route path="/dashboard" element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  } /> */}