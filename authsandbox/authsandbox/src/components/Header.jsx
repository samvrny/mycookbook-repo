import { Link, useNavigate } from "react-router-dom";

//Importing the auth stuff
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Header() {

    //Authentication programming
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    return(
        <header>
            <img src="../../public/logo400x400.png"/>

            <nav>
                {user ? (
                    <ul>
                        <li>
                            <Link to="/">View Recipes</Link>
                        </li>
                        <li>
                            <Link to="/create-recipe">Create Recipe</Link>
                        </li>
                        <li>
                            <Link to="/manage-categories">Categories</Link>
                        </li>
                        <li>
                            <button id="signOutButton" onClick={() => {
                                signOut();
                                navigate("/");
                            }}>Sign Out</button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/sign-up">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/sign-in">Sign In</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )

}