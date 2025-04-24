import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';

export default function SignIn() {

    return (
        <main>
            <Authenticator 
                initialState="signIn"
            ></Authenticator>
        </main>
    )

}