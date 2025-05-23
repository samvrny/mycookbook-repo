import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteRecipeModal from './DeleteRecipeModal';

import { useParams } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import { fetchSingleRecipe } from '../helpers/fetchSingleRecipe';

export default function Recipe() {

    //Get the user
    const { user } = useAuthenticator(context => [context.user]);
    const { recipeIdToDisplay } = useParams();

    //Set the state of the recipe to be rendered
    const [recipe, setRecipe] = useState(null);

    //Set the initial state of the delete modal
    const [isOpen, setIsOpen] = useState(false);

    /**
     * This useEffect calls to fetch the recipe, and then sets the
     * recipe to be rendered into state.
     */
    useEffect(() => {

        const getRecipe = async () => {
            const userID = JSON.stringify(user.userId);
            let recipe = await fetchSingleRecipe(userID, recipeIdToDisplay);

            setRecipe(recipe);
        }
    
        getRecipe();

    }, [user, recipeIdToDisplay]);

    //Prevent rendering until recipe is loaded
    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    //Main display UI
    return (
        <main className="mainContentContainer singleRecipePage">
            
            <h2>{recipe.name}</h2>

            {recipe.description ? 
                <>
                    <h3>Description</h3>
                    <p>{recipe.description}</p> 
                </>
            : null}

            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => {
                    return <li key={index}>{ingredient}</li>
                })}
            </ul>

            <h3>Instructions</h3>
            <ul>
                {recipe.instructions.map((instruction, index) => {
                    return <li key={index}>{instruction}</li>
                })}
            </ul>

            <div className="recipeButtonsContainer">
                <Link to={`/update-recipe/${recipe.recipeID}`} className="defaultButton buttonGreen singleRecipeButton">Update Recipe</Link>
                <button className="defaultButton buttonRed singleRecipeButton" onClick={() => setIsOpen(true)}>Delete Recipe</button>
            </div>

            {isOpen && <DeleteRecipeModal setIsOpen={ setIsOpen } recipeID={recipe.recipeID} recipeName={recipe.name} />}
        </main>
    )

}