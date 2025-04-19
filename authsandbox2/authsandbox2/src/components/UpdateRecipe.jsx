import mockData from '../mockRecipeData/mockRecipes.json'

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Import helpers
import { addIngredientInput, addInstructionInput } from '../helpers/addFormFields';
import { fetchSingleRecipe } from '../helpers/fetchSingleRecipe';

export default function UpdateRecipe() {

    const { user } = useAuthenticator(context => [context.user]);
    const { recipeIdToUpdate } = useParams();

    const categories = mockData.categories;

    const [recipe, setRecipe] = useState(null);

    /**
     * This useEffect calls to fetch the recipe, and then sets the
     * recipe to be rendered into state.
     */
    useEffect(() => {

        const getRecipe = async () => {
            const userID = JSON.stringify(user.userId);
            let recipe = await fetchSingleRecipe(userID, recipeIdToUpdate);

            setRecipe(recipe);
        }
    
        getRecipe();

    }, [user, recipeIdToUpdate]);

    /**
     * Handle the form submission. This is identical to the Create Recipe...
     * so could probably be refactored into a helper function. Same with the
     * add ingredient button functionality AND the add instruction function
     * functionality. (maybe those two could be in a file together)
     */
    const handleSubmission = (event) => {
        event.preventDefault();

        //Grab the category
        let category = document.getElementById("categorySelection").value;

        //Grab the title
        let title = document.getElementById("titleSelection").value;

        //Grab the description
        let description = document.getElementById("descriptionSelection").value;

        //Handle the ingredients
        let ingredientInputs = [...document.querySelectorAll("[name=\"ingredient\"]")];
        let ingredientRawText = ingredientInputs.map(ingredient => {
            return ingredient.value.trim();
        })
        let ingredientsToSave = ingredientRawText.filter(ingredient => {
            return ingredient !== "";
        })

        //Handle the ingredients
        let instructionInputs = [...document.querySelectorAll("[name=\"instruction\"]")];
        let instructionRawText = instructionInputs.map(instruction => {
            return instruction.value.trim();
        })
        let instructionsToSave = instructionRawText.filter(instruction => {
            return instruction !== "";
        })

        console.log(category);
        console.log(title);
        console.log(description);
        console.log(ingredientsToSave);
        console.log(instructionsToSave);
    }

    /**
     * This method resets the form
     */
    const startOver = (event) => {
        event.preventDefault();

        //NOT as elegant as I'd like.... more complicated logic to follow.
        location.reload();
    }

    //Prevent rendering until recipe is loaded
    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    //Main UI display
    return (
        <main id="updateRecipe">

            <form onSubmit={handleSubmission} id="updateRecipeForm">
                <Link to={`/recipe/${recipe.recipeID}`}>Back To Recipe</Link>

                <h2>Update {recipe.name}</h2>

                {/* Choose Category */}
                <label htmlFor="categorySelection">Choose a Category</label>
                <select id="categorySelection" required>

                    <option value={recipe.category}>{recipe.category}</option>

                    {recipe.category !== "Misc" && (
                        <option value="Misc">Misc</option>
                    )}

                    {
                        categories
                            .filter(category => category !== recipe.category)
                            .map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))
                    }
                </select>

                {/* Choose Name */}
                <label htmlFor="titleSelection">Give Your Recipe a Title</label>
                <input type="text" id="titleSelection" required defaultValue={recipe.name}/>

                {/* Enter Description */}
                <label htmlFor="descriptionSelection">Enter A Description</label>
                <textarea name="" id="descriptionSelection" defaultValue={recipe.description}></textarea>

                {/* Enter Ingredients */}
                <label htmlFor="ingredients">Add Ingredients</label>
                <div id="ingredients">
                    {recipe.ingredients.map(ingredient => {
                        return <input type="text" name="ingredient" defaultValue={ingredient}/>
                    })}
                </div>
                <button onClick={addIngredientInput} className="addListButton">Add Another Ingredient +</button>

                {/* Enter Instructions */}
                <label htmlFor="">Add Instructions</label>
                <div id="instructions">
                    {recipe.instructions.map(instruction => {
                        return <input type="text" name="instruction" defaultValue={instruction}/>
                    })}
                </div>
                <button onClick={addInstructionInput} className="addListButton">Add Another Instruction +</button>

                {/* Submit */}

                <div id="formButtons">
                    <button onClick={startOver} className="submitButtons">Start Over</button>
                    <input type="submit" value="Update Recipe" className="submitButtons"/>
                </div>
            </form>
        </main>
    )

}