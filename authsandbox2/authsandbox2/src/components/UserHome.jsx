import mockData from '../mockRecipeData/mockRecipes.json'

import { useState, useEffect } from 'react';

//YOU HAVE TO IMPORT LINK
import { Link } from 'react-router-dom';

export default function UserHome() {

    //Get categories
    let categories = mockData.categories;

    //Get recipes
    let recipes = mockData.recipes;

    const [currentCategory, setCurrentCategory] = useState("Welcome");

    const filteredRecipes = recipes.filter(recipe => recipe.category === currentCategory);

    /**
     * This is to toggle the categories navigation open and closed
     * for small screens/mobile devices
     */
    useEffect(() => {
        const toggle = document.querySelector(".dropdownToggle");
        const nav = document.querySelector(".categoryList");
    
        const handleClick = () => {
            nav.classList.toggle("open");

            console.log("Working");
        };
    
        

        toggle.addEventListener("click", handleClick);
        return () => toggle.removeEventListener("click", handleClick);
    }, []);

    return (
        <main id="userHome">
            <aside className="categoryNavigation">
                <div className="dropdownToggle">Categories ⌄</div>

                <ul className="categoryList">
                    {/* This is the way to map through things to create elements!! */}
                    {categories.map((category) => (
                        <li className="categoryButton" onClick={() => {setCurrentCategory(category)}}>{category}</li>
                    ))}

                    {/* Leave this here always */}
                    <li className="categoryButton" onClick={() => {setCurrentCategory("Misc")}}>Misc</li>
                    <li className="categoryButtonGreen">Add Category +</li>
                </ul>
            </aside>

            <section id="userHomeMainSection">
                <Link className="createRecipeButton" to="/create-recipe">Create New Recipe +</Link>

                <h1>{currentCategory}</h1>

                {/* <p>No recipes found for this category. Choose another category or create a new recipe!</p> */}

                {
                    //Triple EQUALS SIGN!!! REMEMBER TO DO IT!! Or else.... things will NOT work

                    currentCategory === "Welcome" ? <p>Welcome. Please choose a category to view your recipes!</p> :
                    filteredRecipes.length === 0 ? <p>No recipes found for this category. Choose another category or create a new recipe!</p> :
                    filteredRecipes.map((recipe) => (
                            <article className="recipeCard">
                                <h3>{recipe.name}</h3>
                                <p>{recipe.description}</p>

                                <Link to={`/recipe/${recipe.recipeID}`}>View Recipe</Link>
                            </article>
                        ))
                }

                {/* <article>
                    Here is where a recipe will go
                </article> */}
            </section>
        </main>
    )

}