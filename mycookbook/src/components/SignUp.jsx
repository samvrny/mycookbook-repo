import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

/**
 * This function contains the sign up and log in modal
 * provided by the Cognito service
 */
export default function SignUp() {

    /**
     * The below functionality routes a user back to the home page
     * once they are signed up or logged in.
     */
    const navigate = useNavigate();
    const { route } = useAuthenticator((context) => [context.route]);
    
    useEffect(() => {
        if (route === 'authenticated') {
            navigate('/');
        }
    }, [route, navigate]);

    /**
     * Main content of the page. The Authenticator component is a 
     * native component provided by AWS Cognito.
     */
    return (
        <main className="mainContentContainer">
            <Authenticator></Authenticator>
        </main>
    )
}