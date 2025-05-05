import { useAuthenticator } from '@aws-amplify/ui-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

//Import helpers
import { addIngredientInput, addInstructionInput } from '../helpers/addFormFields';
import { getSingleRecipe } from '../helpers/getSingleRecipe';
import { getUsersCategories } from '../helpers/getUsersCategories';
import { updateRecipe } from '../helpers/updateRecipe'

//Import modals
import GenericLoadingModal from "./modals/GenericLoadingModal";
import UpdateRecipeMessageModal from "./modals/UpdateRecipeMessageModal";

/**
 * This component managed the updating of a recipe
 */
export default function UpdateRecipe() {

    //Get the user and userID from the authentication service
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    //Getthe recipe ID from the parameters passed in the URL
    const { recipeID } = useParams();

    /**
     * =======================================
     * Get the users categories for the form
     * =======================================
     */

    //State variable to hold the users categories
    const [categories, setCategories] = useState([]);

    //Call to set the categories
    useEffect(() => {

        //If there is no user/userID, stop the process
        if (!userID) return;

        //Call to fetch the categories
        const fetchCategories = async () => {
            try {
                const data = await getUsersCategories(userID);

                //Set the categories to the categories state variable
                setCategories(data.Items);

            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [userID]);

    /**
     * =========================
     *      Get the recipe
     * ========================
     */

    //State variable to hold the recipe to be updated
    const [recipe, setRecipe] = useState(null);

    //Fetch the recipe to be updated
    useEffect(() => {

        //Call to fetch the recipe
        const fetchRecipe = async () => {

            try {
                const data = await getSingleRecipe(userID, recipeID);
    
                //Set the state of the recipe state variable
                setRecipe(data);

            } catch (error) {
                console.log(error);
            }
        }
    
        fetchRecipe();

    }, [userID, recipeID]);

    //===================================================================

    /**
     * =========================
     *     Update the Recipe
     * =========================
     */

    //Set the inital state of the updating recipe loading spinner modal
    const [updateIsOpen, setUpdateIsOpen] = useState(false);

    //Get the navigate method to send the user back home when update is complete
    const navigate = useNavigate();

    /**
     * Handle the initial form submission. This function adds in the
     * Bootstrap validate form functionality to check the user inputs
     * before calling to create the recipe
     */
    const handleSubmission = (event) => {
        event.preventDefault();

        //Get the form element
        const form = document.getElementById("updateRecipeForm");

        //Add was-validated" class to trigger Bootstrap validation styles
        form.classList.add("was-validated");

        //Check if the form is valid
        if (!form.checkValidity()) {
            //If not valid, prevent submission and show error messages
            return;
        }

        //If the form is valid, call to update the recipe
        callToUpdateRecipe()
    }

    /**
     * This function gathers the form data and calls to update the recipe
     */
    const callToUpdateRecipe = async () => {

        //Grab the category
        let categoryInput = document.getElementById("categorySelection");
        let categoryName = categoryInput.value;
        let categoryID = categoryInput.options[categoryInput.selectedIndex].id;

        //Grab the name
        let name = document.getElementById("nameSelection").value;

        //Grab the description
        let description = document.getElementById("descriptionSelection").value;

        //Handle the ingredients
        let ingredientInputs = [...document.querySelectorAll("[name=\"ingredient\"]")];
        let ingredientRawText = ingredientInputs.map(ingredient => {
            return ingredient.value.trim(); //Trim whitespace off user entries
        })
        let ingredientsToSave = ingredientRawText.filter(ingredient => {
            return ingredient !== ""; //Remove blank user entries
        })

        //Handle the ingredients
        let instructionInputs = [...document.querySelectorAll("[name=\"instruction\"]")];
        let instructionRawText = instructionInputs.map(instruction => {
            return instruction.value.trim(); //Trim whitespace off user entries
        })
        let instructionsToSave = instructionRawText.filter(instruction => {
            return instruction !== ""; //Remove blank user entries
        })

        //Send to update the recipe
        try {

            //Open the update recipe modal
            setUpdateIsOpen(true);

            //Call to update the recipe
            let updatedRecipe = await updateRecipe(
                userID,
                recipeID,
                categoryName,
                categoryID,
                name,
                description,
                ingredientsToSave,
                instructionsToSave
            )

            //Once the recipe is updated, send the user back to the recipes display page
            navigate(`/recipe/${updatedRecipe.recipeID}`);

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * This method resets the form
     */
    const startOver = (event) => {
        event.preventDefault();

        /**
         * This just reloads the page... more complicated
         * logic could and should be inserted here at some point.
         */
        location.reload();
    }

    //Show the user a loading modal while the recipe is still being fetched
    if (!recipe) {
        return (
            <main className="mainContentContainer">
                <GenericLoadingModal />
            </main>
        )
    }

    /**
     * Main content display section
     */
    return (
        <main id="updateRecipe">

            <form onSubmit={handleSubmission} id="updateRecipeForm" className="needs-validation" noValidate>
                <Link to={`/recipe/${recipe.recipeID}`} className="backToRecipe defaultButton">&lt;-- Back To Recipe</Link>

                <h2>Update {recipe.name}</h2>

                {/* Choose Category */}
                <label htmlFor="categorySelection">Choose a Category</label>
                <select id="categorySelection" required>

                    {/* Set the first option to be the recipes current category */}
                    <option value={recipe.category} id={recipe.categoryID}>{recipe.category}</option>

                    {
                        categories
                            .filter(category => category.category !== recipe.category) //Filter the recipes current category out of the categories list
                            .map((category, index) => ( //Render the remaining categories in the list
                            <option value={category.category} key={index} id={category.categoryID}>{category.category}</option>
                        ))
                    }
                </select>

                {/* Choose Name */}
                <label htmlFor="nameSelection">Give Your Recipe a Name</label>
                <input type="text" id="nameSelection" required pattern="^(?!\s*$).+" defaultValue={recipe.name}/>
                <div className="invalid-feedback">
                    You must enter a name that isn't just blank space.
                </div>

                {/* Enter Description */}
                <label htmlFor="descriptionSelection">Enter A Description</label>
                <textarea name="" id="descriptionSelection" defaultValue={recipe.description}></textarea>

                {/* Enter Ingredients */}
                <label htmlFor="ingredients">Add Ingredients</label>
                <div id="ingredients">
                    {recipe.ingredients.map((ingredient, index) => {
                        if (index === 0) { //Make sure the user has to enter at least one ingredient
                            return (
                                <Fragment key={index}>
                                    <input type="text" name="ingredient" defaultValue={ingredient} required pattern="^(?!\s*$).+"/>
                                    <div className="invalid-feedback mb-3">
                                        You must enter at least 1 ingredient here
                                    </div>
                                </Fragment>
                            )
                        } else {
                            return (<input type="text" name="ingredient" defaultValue={ingredient} key={index} />);
                        }
                    })}
                </div>
                <button onClick={addIngredientInput} className="defaultButton buttonBlue">Add Another Ingredient +</button>

                {/* Enter Instructions */}
                <label htmlFor="">Add Instructions</label>
                <div id="instructions">
                    {recipe.instructions.map((instruction, index) => {
                        return <input type="text" name="instruction" defaultValue={instruction} key={index}/>
                    })}
                </div>
                <button onClick={addInstructionInput} className="defaultButton buttonBlue">Add Another Instruction +</button>

                {/* Submit */}
                <div id="updateCreateFormButtonContainer">
                    <input type="submit" value="Update Recipe" className="defaultButton buttonGreen updateCreateRecipeButton"/>
                    <button onClick={startOver} className="defaultButton buttonRed updateCreateRecipeButton">Start Over</button>

                </div>
            </form>

            {/* Update recipe modal */}
            {updateIsOpen && <UpdateRecipeMessageModal />}
        </main>
    )

}