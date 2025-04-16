import mockData from '../mockRecipeData/mockRecipes.json';
import { useState, useEffect } from 'react';

//FOR THE ROUTING
import { useParams } from 'react-router-dom';

//FOR GRABBING THE USER ID
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Recipe() {

    //Get the user
    const { user } = useAuthenticator((context) => [context.user]);

    //For the routing (recipeID passed from the routing)
    const { recipeIdToDisplay } = useParams();
    console.log(recipeIdToDisplay);

    //State must be used to prevent weird non rendering behavior in React
    const [recipe, setRecipe] = useState(null);

    // const getRecipe = async () => {

    //     //Fetch the recipes. THIS WILL EVENTUALLY BE A FETCH.
    //     let recipes = mockData.recipes;

    //     let recipe = recipes.find(recipe => recipe.recipeID === recipeIdToDisplay);
    //     console.log(recipe);

    //     return recipe;
    // }

    useEffect(() => {
        //Make sure there is a user.
        if (!user) return;

        const fetchRecipe = async () => {
            const userID = JSON.stringify(user.userId); //THIS IS THE CODE TO GRAB THE USER ID
            console.log('UserID:', userID);
            console.log('Recipe ID:', recipeIdToDisplay);
    
          // For now just pull from mock JSON
          const recipes = mockData.recipes;
          let recipe = recipes.find(recipe => recipe.recipeID === recipeIdToDisplay);
    
        //   console.log('Found recipe:', recipe);
          setRecipe(recipe);
        };
    
        fetchRecipe();
    }, [user, recipeIdToDisplay]);

    // 👇 Prevent rendering until recipe is loaded
    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    return (
        <main id="singleRecipePage">
            
            <h2>{recipe.name}</h2>


            {recipe.description ? 
                <>
                    <h3>Description</h3>
                    <p>{recipe.description}</p> 
                </>
            : null}

            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map(ingredient => {
                    return <li>{ingredient}</li>
                })}
            </ul>

            <h3>Instructions</h3>
            <ul>
                {recipe.instructions.map(instruction => {
                    return <li>{instruction}</li>
                })}
            </ul>

            <div id="recipeButtons">
                
            </div>
        </main>
    )

}