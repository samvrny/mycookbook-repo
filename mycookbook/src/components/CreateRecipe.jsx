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

export default function CreateRecipe() {

    //Get the user ID for use in creating recipes
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    //Allow navigation when the user creates a recipe
    const navigate = useNavigate();

    /**
     * ==========================
     *  Get the users categories
     * ==========================
     */

    const [categories, setCategories] = useState(null);

    //Call to set the categories once the users ID is fetched
    useEffect(() => {
        if (!userID) return;

        const fetchCategories = async () => {
            try {
                const data = await getUsersCategories(userID);

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

    //Set the inital state of the creating recipe loading spinner modal
    const [createIsOpen, setCreateIsOpen] = useState(false);

    /**
     * Handle the form submission 
     */
    const handleSubmission = (event) => {
        event.preventDefault();

        //Get the form element
        const form = document.getElementById('createRecipeForm');

        //Add 'was-validated' class to trigger Bootstrap validation styles
        form.classList.add('was-validated');

        // Check if the form is valid
        if (!form.checkValidity()) {
            //If not valid, prevent submission and show error messages
            return;
        }

        callToCreateRecipe()
    }

    /**
     * If user is valid, create the recipe
     */
    const callToCreateRecipe = async () => {

        //Grab the user ID
        const userID = user.userId;

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
            return ingredient.value.trim();
        })
        let ingredientsToSave = ingredientRawText.filter(ingredient => {
            return ingredient !== "";
        })

        //Handle the instructions
        let instructionInputs = [...document.querySelectorAll("[name=\"instruction\"]")];
        let instructionRawText = instructionInputs.map(instruction => {
            return instruction.value.trim();
        })
        let instructionsToSave = instructionRawText.filter(instruction => {
            return instruction !== "";
        })

        /**
         * Validate the user inputs. If anything is missing, display errors 
         * to the user. 
         */

        //Send to create the recipe
        try {
            setCreateIsOpen(true);

            let newRecipe = await addRecipe(
                userID,
                categoryName,
                categoryID,
                name,
                description,
                ingredientsToSave,
                instructionsToSave
            )

            navigate(`/recipe/${newRecipe.recipeID}`);

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Reset the form 
     */
    const resetFormFields = (event) => {
        event.preventDefault();

        const ingredientList = document.getElementById("ingredients");
        const instructionList = document.getElementById("instructions");

        let ingredientChildren = ingredientList.children;
        let instructionChildren = instructionList.children;

        while (ingredientChildren.length > 1) {
            ingredientList.removeChild(ingredientList.lastElementChild);
        }

        while (instructionChildren.length > 1) {
            instructionList.removeChild(instructionList.lastElementChild);
        }

        document.getElementById("createRecipeForm").reset();
    }

    /**
     * ==================
     *   Content display
     * ==================
     */

    /**
     * If there are no categories, set the initial state of the page to loading
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

            {createIsOpen && <CreateRecipeMessageModal />}
        </main>
    )

}