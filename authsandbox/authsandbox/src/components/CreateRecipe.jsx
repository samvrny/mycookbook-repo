import mockData from '../mockRecipeData/mockRecipes.json'

export default function CreateRecipe() {

    //Get categories. Will eventually need to be a fetch.
    let categories = mockData.categories;

    /**
     * Handle the form submission 
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
        console.log(ingredientsToSave); // IT WORKS BY JOVE!!
        console.log(instructionsToSave);
    }

    /**
     * Add a new ingredient to the ingredients list
     */
    const addIngredientInput = (event) => {
        event.preventDefault();

        const ingredientList = document.getElementById("ingredients");

        const newInput = document.createElement("input");
        newInput.setAttribute("name", "ingredient");

        ingredientList.appendChild(newInput);
    }

    /**
     * Add a new instruction to the instructions list
     */
    const addInstructionInput = (event) => {
        event.preventDefault();

        const instructionList = document.getElementById("instructions");

        const newInput = document.createElement("input");
        newInput.setAttribute("name", "instruction");

        instructionList.appendChild(newInput);
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
     * The UI display
     */
    return (
        <main id="createRecipe">

            <form onSubmit={handleSubmission} id="createRecipeForm">
                <h2>Create New Recipe</h2>

                {/* Choose Category */}
                <label htmlFor="categorySelection">Choose a Category</label>
                <select id="categorySelection" required>
                    <option value="Misc" defaultValue={"Misc"}>Misc</option>
                    {
                        categories.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))
                    }
                </select>

                {/* Choose Name */}
                <label htmlFor="titleSelection">Give Your Recipe a Title</label>
                <input type="text" id="titleSelection" required/>

                {/* Enter Description */}
                <label htmlFor="descriptionSelection">Enter A Description</label>
                <textarea name="" id="descriptionSelection"></textarea>

                {/* Enter Ingredients */}
                <label htmlFor="ingredients">Add Ingredients</label>
                <div id="ingredients">
                    <input type="text" name="ingredient" required/>
                </div>
                <button onClick={addIngredientInput} className="addListButton">Add Another Ingredient +</button>

                {/* Enter Instructions */}
                <label htmlFor="">Add Instructions</label>
                <div id="instructions">
                    <input type="text" name="instruction"/>
                </div>
                <button onClick={addInstructionInput} className="addListButton">Add Another Instruction +</button>

                {/* Submit */}

                <div id="formButtons">
                    <button onClick={resetFormFields} className="submitButtons">Start Over</button>
                    <input type="submit" value="Create New Recipe" className="submitButtons"/>
                </div>
            </form>
        </main>
    )

}