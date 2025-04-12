import { Link } from "react-router-dom";


export default function Header() {

    return(
        <header>
            <img src="../../public/logo400x400.png"/>

            <nav>
                {/* This is probably where the browserrouter components will live... */}
                {/* For style demos sake... */}
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
                        <Link to="/sign-out">Sign Out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )

}