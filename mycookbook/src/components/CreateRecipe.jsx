// import mockData from '../mockRecipeData/mockRecipes.json'

//Import Authentication 
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

//Import Helper functions
import { addIngredientInput, addInstructionInput } from '../helpers/addFormFields';
import { getUsersCategories } from '../helpers/getUsersCategories';
import { addRecipe } from '../helpers/addRecipe';

//Import modals
import NoCategoriesDetectedModal from './modals/noCategoriesDetectedModal';

export default function CreateRecipe() {

    //Get the user ID for use in creating recipes
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    /**
     * ==========================
     * Get the users categories
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
     * Handle the form submission 
     */
    const handleSubmission = async (event) => {
        event.preventDefault();

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

        //Logging the inputs for now
        // console.log("User ID: " + userID);
        // console.log("Category Name " + categoryName);
        // console.log("Category ID " + categoryID);
        // console.log(name);
        // console.log(description);
        // console.log(ingredientsToSave);
        // console.log(instructionsToSave);

        let newRecipe = await addRecipe(
            userID,
            categoryName,
            categoryID,
            name,
            description,
            ingredientsToSave,
            instructionsToSave
        )

        console.log("NEW RECIPE ADDED");
        console.log(newRecipe);

        console.log(newRecipe.recipeID);
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
     * Content display
     * ==================
     */

    // const [isOpen, setIsOpen] = useState(false);

    /**
     * If there are no categories, set the initial state of the page to loading
     */
    if (!categories) {
        return <main className="mainContentContainer">Loading...</main>; // Show loading state until data is fetched
    }

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

            <form onSubmit={handleSubmission} id="createRecipeForm">
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
                <input type="text" id="nameSelection" required/>

                {/* Enter Description */}
                <label htmlFor="descriptionSelection">Enter A Description</label>
                <textarea name="" id="descriptionSelection"></textarea>

                {/* Enter Ingredients */}
                <label htmlFor="ingredients">Add Ingredients</label>
                <div id="ingredients">
                    <input type="text" name="ingredient" required/>
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
                    <button onClick={resetFormFields} className="defaultButton buttonGreen updateCreateRecipeButton">Start Over</button>
                    <input type="submit" value="Create New Recipe" className="defaultButton buttonGreen updateCreateRecipeButton"/>
                </div>
            </form>
        </main>
    )

}