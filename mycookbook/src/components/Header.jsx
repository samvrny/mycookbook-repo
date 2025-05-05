import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

/**
 * This is the header component. It contains the sure navigation
 */
export default function Header() {

    //Get the user and the sign out functionality from cognito
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    //Set the ability to use the navigate functionality of react-router-dom
    const navigate = useNavigate();

    return(
        <header>

            {/* The site logo */}
            <h1>
                <img src="../../logo400x400.png" alt="MyCookBook"/>
            </h1>

            {/* Navigation component */}
            <nav>

                {/* 
                    Conditionally set navigation. If a user is logged in, display 
                    to them the protected user pages. Otherwise, display them a 
                    link to log in or sign up
                */}
                {user ? (
                    <ul>
                        <li>
                            <Link to="/" className="defaultButton navButton">View Recipes</Link>
                        </li>
                        <li>
                            <Link to="/create-recipe" className="defaultButton navButton">Create Recipe</Link>
                        </li>
                        <li>
                            <Link to="/manage-categories" className="defaultButton navButton">Categories</Link>
                        </li>
                        <li>
                            <Link id="signOutButton" className="defaultButton navButton" onClick={async () => {          
                                await signOut(); //Signout 
                                navigate("/"); //Navigate the user home once they are signed out
                            }}>Sign Out</Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/sign-up" className="defaultButton navButton">Sign Up / Log In</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )

}