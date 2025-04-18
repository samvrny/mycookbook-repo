import mockData from '../mockRecipeData/mockRecipes.json';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Delete from './Delete';

//FOR THE ROUTING
import { useParams } from 'react-router-dom';

//FOR GRABBING THE USER ID
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

export default function Recipe() {

    //Get the user
    const { user, authStatus } = useAuthenticator(context => [context.user, context.authStatus]);

    //Protect the route from unauthorized access
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
          navigate('/');
        }
    }, [authStatus, navigate]);

    // useEffect(() => {
    //     if (!user) {
    //       navigate("/");
    //     }
    // }, [user, navigate]);

    //For the routing (recipeID passed from the routing)
    const { recipeIdToDisplay } = useParams();
    console.log(recipeIdToDisplay);

    //Set the state of the recipe to be rendered
    const [recipe, setRecipe] = useState(null);

    //Set the initial state of the delete modal
    const [isOpen, setIsOpen] = useState(false);

    /**
     * This useEffect calls to fetch the recipe, and then sets the
     * recipe to be rendered into state.
     */
    useEffect(() => {
        //Make sure there is a user.
        if (!user) return;

        /**
         * Fetch the recipe
         */
        const fetchRecipe = async () => {
            const userID = JSON.stringify(user.userId); //THIS IS THE CODE TO GRAB THE USER ID
            console.log('UserID:', userID);
            console.log('Recipe ID:', recipeIdToDisplay);
    
            // For now just pull from mock JSON
            const recipes = mockData.recipes;
            let recipe = recipes.find(recipe => recipe.recipeID === recipeIdToDisplay);
    
        //   console.log('Found recipe:', recipe);

            //Once the recipe is retrieved, set it into state.
            setRecipe(recipe);
        };
    
        fetchRecipe();
    }, [user, recipeIdToDisplay]);

    //Prevent rendering until recipe is loaded
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

            <div className="recipeButtons">
                <Link to={`/update-recipe/${recipe.recipeID}`} className="recipeUpdateButton">Update Recipe</Link>
                <button className="recipeDeleteButton" onClick={() => setIsOpen(true)}>Delete Recipe</button>
            </div>

            {isOpen && <Delete setIsOpen={ setIsOpen } recipeID={recipe.recipeID} recipeName={recipe.name} />}
        </main>
    )

}