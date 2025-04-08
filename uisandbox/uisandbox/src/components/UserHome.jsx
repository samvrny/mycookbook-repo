import mockData from '../mockRecipeData/mockRecipes.json'

import { useState, useEffect } from 'react';


export default function UserHome() {

    //Get categories
    let categories = mockData.categories;

    //Get recipes
    let recipes = mockData.recipes;
    // let recipes = [];

    // console.log(categories);
    // console.log(recipes);

    const [currentCategory, setCurrentCategory] = useState("");
    console.log("Current Category on Render: " + currentCategory);

    return (
        <main id="userHome">
            <aside>
                <ul>
                    {/* This is the way to map through things to create elements!! */}
                    {categories.map((category) => (
                        <li className="categoryButton" onClick={() => {console.log("Clicked Category: " + category); setCurrentCategory(category)}}>{category}</li>
                    ))}
                    {/* <li className="categoryButton">Breakfast</li> */}
                    {/* <li className="categoryButton">Lunch</li> */}
                    {/* <li className="categoryButton">Dinner</li> */}
                    <li className="categoryButtonGreen">Add Category +</li>
                </ul>
            </aside>

            <section id="userHomeMainSection">
                <a className="createRecipeButton" href="">Create New Recipe +</a>

                <h1>Category Name</h1>

                <p>No recipes found for this category. Choose another category or create a new recipe!</p>

                {
                    //Triple EQUALS SIGN!!! REMEMBER TO DO IT!! Or else.... things will NOT work
                    !recipes.category === currentCategory ? <p>No recipes for this category. Create a new recipe or choose another category!</p> :
                    
                    recipes.filter(recipe => recipe.category === currentCategory)
                        .map((recipe) => (
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