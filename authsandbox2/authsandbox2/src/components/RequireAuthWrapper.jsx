import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

/**
 * This component is a wrapper for all the protected routes. It makes sure 
 * a user is authenticated before rendering a component that is protected
 * by a route. If a user isn't authenticated, the user is sent to the home page
 */
export default function RequireAuthWrapper({ children }) {
    const { authStatus } = useAuthenticator(context => [context.authStatus]);

    if (authStatus === "configuring") {
        return <p>Please Wait...</p>;
    }

    return (authStatus === "authenticated" ? children : <Navigate to="/login" replace />);
}