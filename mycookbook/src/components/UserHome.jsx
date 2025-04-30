import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import { getUsersCategories } from '../helpers/getUsersCategories';
import { getUserRecipesByCategory } from '../helpers/getUserRecipesByCategory';

//Import loading modal
import GenericLoadingModal from "./modals/GenericLoadingModal"

export default function UserHome() {

    /**
     * ==========================
     * Get the users categories
     * ==========================
     */

    //Get the user ID
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    const [categories, setCategories] = useState(null);

    //Call to set the categories once the users ID is fetched
    useEffect(() => {
        if (!userID) return;

        const fetchCategories = async () => {
            try {
                const data = await getUsersCategories(userID);

                setCategories(data.Items);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [userID]);

    /**
     * =======================================================
     * Get the recipes associated with the selected category
     * =======================================================
     */

    //Set the inital category state to be nothign
    const [categoryID, setCategoryID] = useState(null);

    /**
     * This function runs when a user clicks a category from their
     * category menu. It sets the current category name to be displayed,
     * and also sets the categoryID to update the list of recipes to display.
     */
    const changeCategory = (category, categoryID) => {
        setCurrentCategory(category);
        setCategoryID(categoryID);
    }

    //Set the initial category to just be the welcome state in the UI
    const [currentCategory, setCurrentCategory] = useState("Welcome");

    //Set up state for the recipes
    const [recipes, setRecipes] = useState([]);

    //Call to set the recipes once the users ID is fetched
    useEffect(() => {
        if (!userID) return;

        const fetchRecipes = async () => {
            try {
                const data = await getUserRecipesByCategory(userID, categoryID);

                setRecipes(data.Items);

            } catch (error) {
                console.log(error);
            }
        }

        fetchRecipes()
    }, [userID, categoryID]);

    /**
     * ===================================================
     * Toggle the categories navigation open and closed
     * for small screens/mobile devices
     * ===================================================
     */
    const navRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {

        if (!categories) return;

        console.log("Running")

        const handleClick = () => {
            navRef.current?.classList.toggle("open");
            modalRef.current?.classList.toggle("open");

            console.log("Click")
        };

        const toggleDropdown = document.querySelector(".dropdownToggle");
        toggleDropdown?.addEventListener("click", handleClick);
        return () => toggleDropdown?.removeEventListener("click", handleClick);
    }, [categories]);

    /**
     * ==================
     * Content display
     * ==================
     */

    /**
     * If there are no categories, set the initial state of the page to loading
     */
    if (!categories) {
        return <main className="mainContentContainer"><GenericLoadingModal /></main>;
    }

    /**
     * Main content of the page
     */
    return (
        <main className="mainContentContainer userHome">

            <aside className="categoryNavigation">
                <div className="dropdownToggle">Categories ⌄</div>

                <ul className="categoryList" ref={navRef}>
                    {categories.map((category, index) => (
                        <li className="defaultButton userHomeCategoryButton" key={index} onClick={() => changeCategory(category.category, category.categoryID)}>{category.category}</li>
                    ))}
                    <li className="defaultButton userHomeCategoryButton buttonGreen"><Link to="/manage-categories">Manage Categories</Link></li>
                </ul>
            </aside>

            <div className="navigationBackground" ref={modalRef}></div>

            <section id="userHomeMainContent">
                <Link className="defaultButton buttonGreen createRecipeHomeButton" to="/create-recipe">Create New Recipe +</Link>

                <h2>{currentCategory}</h2>

                {/* Set the welcome or header message that the user sees */}
                {
                    currentCategory === "Welcome" ? ( 
                        categories === null || categories.length === 0 ?
                        <p>Welcome to MyCookbook! It looks like you haven't created any categories. In order to create a recipe in MyCookbook, you must have a category created to assign the recipe to. Click the Manage Categories button in the categories navigation, or choose Categories in the main navigation at the top of the site to create a category and start creating recipes</p> :
                        <p>Welcome. Please choose a category to view your recipes!</p>
                    ) :
                    recipes.length === 0 ? <p>No recipes found for this category. Choose another category or create a new recipe!</p> :
                    recipes.map((recipe, index) => (
                            <article className="recipeCard" key={index}>
                                <h3>{recipe.name}</h3>
                                <p>{recipe.description}</p>

                                <Link className="defaultButton buttonBlue recipeCardButton" to={`/recipe/${recipe.recipeID}`}>View Recipe</Link>
                            </article>
                        ))
                }
            </section>
        </main>
    )

}