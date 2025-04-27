import mockData from '../mockRecipeData/mockRecipes.json'

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import { getUsersCategories } from '../helpers/getUsersCategories';

export default function UserHome() {

    //Get categories
    const { user } = useAuthenticator(context => [context.user]);
    // const userID = JSON.stringify(user.userId);
    const userID = user.userId;

    // console.log(userID);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!userID) return;

        // console.log(userID)
        console.log("useEffect Running!")

        const fetchCategories = async () => {
            // console.log(userID)

            try {
                const data = await getUsersCategories(userID); // This is where your async call happens

                // console.log(data);

                setCategories(data.Items); // Save the fetched data into state
            } catch (error) {
                console.log(error); // Handle any errors
            }
        }

        fetchCategories()
    }, [userID]);

    console.log(categories);

    //Get recipes
    let recipes = mockData.recipes;

    const [currentCategory, setCurrentCategory] = useState("Welcome");

    const filteredRecipes = recipes.filter(recipe => recipe.category === currentCategory);

    /**
     * This is to toggle the categories navigation open and closed
     * for small screens/mobile devices
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

    if (!categories) {
        return <main className="mainContentContainer">Loading...</main>; // Show loading state until data is fetched
    }

    return (
        <main className="mainContentContainer userHome">

            <aside className="categoryNavigation">
                <div className="dropdownToggle">Categories ⌄</div>

                <ul className="categoryList" ref={navRef}>
                    {categories.map((category, index) => (
                        <li className="defaultButton userHomeCategoryButton" key={index} onClick={() => setCurrentCategory(category.category)}>{category.category}</li>
                    ))}
                    <li className="defaultButton userHomeCategoryButton" onClick={() => setCurrentCategory("Misc")}>Misc</li>
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