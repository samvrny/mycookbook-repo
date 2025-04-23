import { Link, useNavigate } from "react-router-dom";

//Importing the auth stuff
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Header() {

    //Authentication programming
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    return(
        <header>
            <h1>
                <img src="../../public/logo400x400.png" alt="MyCookBook"/>
            </h1>

            <nav>
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
                                await signOut();
                                navigate("/");
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