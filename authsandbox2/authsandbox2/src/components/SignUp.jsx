import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

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



    return (
        <main>
            <Authenticator></Authenticator>
        </main>
    )

}