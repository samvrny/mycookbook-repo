import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

//Import helpers
import { getSingleRecipe } from '../helpers/getSingleRecipe';

//Import modals
import DeleteRecipeModal from './modals/DeleteRecipeModal';
import GenericLoadingModal from './modals/GenericLoadingModal';

/**
 * This component is the main singular recipe display page
 */
export default function Recipe() {

    //Get the userID
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    //Get the recipeID from the URL parameters
    const { recipeID } = useParams();

    //State that will hold the recipe to be rendered on the page
    const [recipe, setRecipe] = useState(null);

    //State for the delete recipe modal
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Call to fetch the recipe, and then sets the
     * recipe to be rendered into state.
     */
    useEffect(() => {

        const fetchRecipe = async () => {

            //Get the recipe
            try {
                const data = await getSingleRecipe(userID, recipeID);
    
                //Set the recipe into state
                setRecipe(data);

            } catch (error) {
                console.log(error);
            }
        }
    
        fetchRecipe();

    }, [userID, recipeID]);

    //Show a generic loading modal until the recipe is loaded
    if (!recipe) {
        return <main className="mainContentContainer"><GenericLoadingModal /></main>;
    }

    /**
     * Main content of the page
     */
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

            {recipe.instructions.length > 0 ? (
                <>
                    <h3>Instructions</h3>
                    <ul>
                        { recipe.instructions.map((instruction, index) => {
                            return <li key={index}>{instruction}</li>
                        })}
                    </ul>
                </>
            ) : null
            }   

            <div className="recipeButtonsContainer">
                <Link to={`/update-recipe/${recipe.recipeID}`} className="defaultButton buttonGreen singleRecipeButton">Update Recipe</Link>
                <button className="defaultButton buttonRed singleRecipeButton" onClick={() => setIsOpen(true)}>Delete Recipe</button>
            </div>

            {/* Delete recipe modal */}
            {isOpen && <DeleteRecipeModal setIsOpen={ setIsOpen } recipeID={recipe.recipeID} recipeName={recipe.name} userID={userID}/>}
        </main>
    )

}