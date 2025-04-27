import mockData from '../mockRecipeData/mockRecipes.json'

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import { getUsersCategories } from '../helpers/getUsersCategories';

export default function UserHome() {

    /**
     * ==========================
     * Get the users categories
     * ==========================
     */

    //Get the user ID
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    const [categories, setCategories] = useState([]);

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

    //Set the initial category to just be the welcome state
    const [currentCategory, setCurrentCategory] = useState("Welcome");

    //Get the recipes
    let recipes = mockData.recipes;

    const filteredRecipes = recipes.filter(recipe => recipe.category === currentCategory);

    /**
     * ===================================================
     * Toggle the categories navigation open and closed
     * for small screens/mobile devices
     * ===================================================
     */
    const navRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClick = () => {
            navRef.current?.classList.toggle("open");
            modalRef.current?.classList.toggle("open");
        };

        const toggleDropdown = document.querySelector(".dropdownToggle");
        toggleDropdown?.addEventListener("click", handleClick);
        return () => toggleDropdown?.removeEventListener("click", handleClick);
    }, []);

    /**
     * ==================
     * Content display
     * ==================
     */

    /**
     * If there are no categories, set the initial state of the page to loading
     */
    if (!categories) {
        return <main className="mainContentContainer">Loading...</main>; // Show loading state until data is fetched
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
                        <li className="defaultButton userHomeCategoryButton" key={index} onClick={() => setCurrentCategory(category.category)}>{category.category}</li>
                    ))}
                    {/* <li className="defaultButton userHomeCategoryButton" onClick={() => setCurrentCategory("Misc")}>Misc</li> */}
                    <li className="defaultButton userHomeCategoryButton buttonGreen"><Link to="/manage-categories">Manage Categories</Link></li>
                </ul>
            </aside>

            <div className="navigationBackground" ref={modalRef}></div>

            <section id="userHomeMainContent">
                <Link className="defaultButton buttonGreen createRecipeHomeButton" to="/create-recipe">Create New Recipe +</Link>

                <h2>{currentCategory}</h2>

                {
                    currentCategory === "Welcome" ? <p>Welcome. Please choose a category to view your recipes!</p> :
                    filteredRecipes.length === 0 ? <p>No recipes found for this category. Choose another category or create a new recipe!</p> :
                    filteredRecipes.map((recipe, index) => (
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