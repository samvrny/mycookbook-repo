//Import Authentication 
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

//Import navigation
import { useNavigate } from 'react-router-dom';

//Import Helper functions
import { addIngredientInput, addInstructionInput } from '../helpers/addFormFields';
import { getUsersCategories } from '../helpers/getUsersCategories';
import { addRecipe } from '../helpers/addRecipe';

//Import modals
import NoCategoriesDetectedModal from './modals/noCategoriesDetectedModal';
import CreateRecipeMessageModal from './modals/CreateRecipeMessageModal';
import GenericLoadingModal from "./modals/GenericLoadingModal"

/**
 * This component manages the creation of new recipes 
 */
export default function CreateRecipe() {

    //Get the user ID for use in creating recipes
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    /**
     * Get the react-router-dom navigate functionality to 
     * allow navigation when the user creates a recipe
     */
    const navigate = useNavigate();

    /**
     * ==========================
     *  Get the users categories
     * ==========================
     */

    //State to hold the categories list for use in the create category form
    const [categories, setCategories] = useState(null);

    //Call to set the categories once the users ID is fetched
    useEffect(() => {
        
        //If there is no user, stop the process
        if (!userID) return;

        //Fetch the categories
        const fetchCategories = async () => {
            try {
                const data = await getUsersCategories(userID);

                //Set the state of the categories list
                setCategories(data.Items);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [userID]);

    /**
     * ==========================
     *       Create Recipe
     * ==========================
     */

    //State for the create recipe modal spinner
    const [createIsOpen, setCreateIsOpen] = useState(false);

    /**
     * Handle the initial form submission. This function adds in the
     * Bootstrap validate form functionality to check the user inputs
     * before calling to create the recipe
     */
    const handleSubmission = (event) => {
        event.preventDefault();

        //Get the form element
        const form = document.getElementById('createRecipeForm');

        //Add was-validated class to trigger Bootstrap validation styles
        form.classList.add('was-validated');

        //Check if the form is valid
        if (!form.checkValidity()) {
            //If not valid, prevent submission and show error messages
            return;
        }

        //If everything looks good, call to create the recipe
        callToCreateRecipe()
    }

    /**
     * This function gathers the form data and calls to create the new recipe
     */
    const callToCreateRecipe = async () => {

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
            return ingredient.value.trim(); //Trim whitespace off the user entries
        })
        let ingredientsToSave = ingredientRawText.filter(ingredient => {
            return ingredient !== ""; //Remove blank entries
        })

        //Handle the instructions
        let instructionInputs = [...document.querySelectorAll("[name=\"instruction\"]")];
        let instructionRawText = instructionInputs.map(instruction => {
            return instruction.value.trim(); //Trim whitespace off the user entries
        })
        let instructionsToSave = instructionRawText.filter(instruction => {
            return instruction !== ""; //Remove blank entries
        })

        //Send to create the recipe
        try {

            //Open the create recipe modal
            setCreateIsOpen(true);

            //Call to create the recipe
            let newRecipe = await addRecipe(
                userID,
                categoryName,
                categoryID,
                name,
                description,
                ingredientsToSave,
                instructionsToSave
            )

            //Once the recipe is created, send the user to it's display page
            navigate(`/recipe/${newRecipe.recipeID}`);

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * This function resets the form
     */
    const resetFormFields = (event) => {
        event.preventDefault();

        //Get the ingredients and instructions inputs
        const ingredientList = document.getElementById("ingredients");
        const instructionList = document.getElementById("instructions");

        let ingredientChildren = ingredientList.children;
        let instructionChildren = instructionList.children;

        //Remove all but one of the ingredient inputs
        while (ingredientChildren.length > 1) {
            ingredientList.removeChild(ingredientList.lastElementChild);
        }

        //Remove all but one of the instruction inputs
        while (instructionChildren.length > 1) {
            instructionList.removeChild(instructionList.lastElementChild);
        }

        //Reset the form
        document.getElementById("createRecipeForm").reset();
    }

    /**
     * ==================
     *   Content display
     * ==================
     */

    /**
     * Set the initial state of the page to be the loading modal while the 
     * categories are being fetched for the form
     */
    if (!categories) {
        return <main className="mainContentContainer"><GenericLoadingModal /></main>;
    }

    /**
     * If there are no categories (it's probably a new user, or a user has 
     * deleted them all), open a modal that shows them an error message and 
     * gives them a link to the categories management page
     */
    if (categories.length === 0) {
        return (
            <>
                <main className="mainContentContainer"></main>
                {<NoCategoriesDetectedModal />}
            </>
        )
    }

    /**
     * Main content of the page
     */
    return (
        <main id="createRecipe">

            <form onSubmit={handleSubmission} id="createRecipeForm" className="needs-validation" noValidate>
                <h2>Create New Recipe</h2>

                {/* Choose Category */}
                <label htmlFor="categorySelection">Choose a Category</label>
                <select id="categorySelection" required>
                    {
                        categories.map((category, index) => (
                            <option value={category.category} key={index} id={category.categoryID}>{category.category}</option>
                        ))
                    }
                </select>

                {/* Choose Name */}
                <label htmlFor="nameSelection">Give Your Recipe a Name</label>
                <input type="text" id="nameSelection" required pattern="^(?!\s*$).+"/>
                <div className="invalid-feedback">
                    You must enter a name that isn't just blank space.
                </div>

                {/* Enter Description */}
                <label htmlFor="descriptionSelection">Enter A Description</label>
                <textarea name="" id="descriptionSelection"></textarea>

                {/* Enter Ingredients */}
                <label htmlFor="ingredients">Add Ingredients</label>
                <div id="ingredients">
                    <input type="text" name="ingredient" required pattern="^(?!\s*$).+"/>
                    <div className="invalid-feedback mb-2">
                        You must enter at least 1 ingredient here
                    </div>
                </div>
                <button onClick={addIngredientInput} className="defaultButton buttonBlue">Add Another Ingredient +</button>

                {/* Enter Instructions */}
                <label htmlFor="">Add Instructions</label>
                <div id="instructions">
                    <input type="text" name="instruction"/>
                </div>
                <button onClick={addInstructionInput} className="defaultButton buttonBlue">Add Another Instruction +</button>

                {/* Submit */}
                <div id="updateCreateFormButtonContainer">
                    <input type="submit" value="Save Recipe" className="defaultButton buttonGreen updateCreateRecipeButton"/>
                    <button onClick={resetFormFields} className="defaultButton buttonRed updateCreateRecipeButton">Clear Form</button>
                </div>
            </form>

            {/* Create recipe modal */}
            {createIsOpen && <CreateRecipeMessageModal />}
            
        </main>
    )

}