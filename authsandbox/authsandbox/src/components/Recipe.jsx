import mockData from '../mockRecipeData/mockRecipes.json';

//FOR THE ROUTING
import { useParams } from 'react-router-dom';

export default function Recipe() {

    //For the routing
    const { recipeIdToDisplay } = useParams();
    console.log(recipeIdToDisplay);

    let recipes = mockData.recipes;
    let recipe = recipes.find(recipe => recipe.recipeID === recipeIdToDisplay);
    console.log(recipe);

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