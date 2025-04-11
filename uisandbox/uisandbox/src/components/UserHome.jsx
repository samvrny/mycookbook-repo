import mockData from '../mockRecipeData/mockRecipes.json'

import { useState } from 'react';


export default function UserHome() {

    //Get categories
    let categories = mockData.categories;

    //Get recipes
    let recipes = mockData.recipes;
    // let recipes = [];

    // console.log(categories);
    // console.log(recipes);

    const [currentCategory, setCurrentCategory] = useState("Welcome");
    // console.log("Current Category on Render: " + currentCategory);

    const filteredRecipes = recipes.filter(recipe => recipe.category === currentCategory);

    return (
        <main id="userHome">
            <aside>
                <ul>
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
                <a className="createRecipeButton" href="">Create New Recipe +</a>

                <h1>{currentCategory}</h1>

                {/* <p>No recipes found for this category. Choose another category or create a new recipe!</p> */}

                {
                    //Triple EQUALS SIGN!!! REMEMBER TO DO IT!! Or else.... things will NOT work

                    currentCategory === "Welcome" ? <p>Welcome. Please choose a category to view your recipes!</p> :
                    filteredRecipes.length === 0 ? <p>No recipes found for this category. Choose another category or create a new recipe!</p> :
                    filteredRecipes.map((recipe) => (
                            <article>
                                <h3>{recipe.name}</h3>
                                <p>{recipe.description}</p>

                                <a href="" id={recipe.recipeID}>View Recipe</a>
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