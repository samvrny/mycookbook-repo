import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

/**
 * This component is a wrapper for all the protected routes. It makes sure 
 * a user is authenticated before rendering a component that is protected
 * If a user isn't authenticated, the user is sent to the home page
 */
export default function RequireAuthWrapper({ children }) {

    //Get the authentication status variable
    const { authStatus } = useAuthenticator(context => [context.authStatus]);

    if (authStatus === "configuring") {
        return <p>Please Wait, Authenticating User...</p>;
    }

    /**
     * Render the correct routes if/once the user is authenticated.
     * If a user is not authenticated, navigate the user to the login page
     */
    return (authStatus === "authenticated" ? children : <Navigate to="/sign-up" replace />);
}