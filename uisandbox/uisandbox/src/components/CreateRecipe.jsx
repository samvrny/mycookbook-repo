import mockData from '../mockRecipeData/mockRecipes.json'

export default function CreateRecipe() {

    //Get categories. Will eventually need to be a fetch.
    let categories = mockData.categories;

    /**
     * Handle the form submission 
     */
    const handleSubmission = (event) => {
        event.preventDefault();

        console.log("Create Recipe On");
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
     * Reset
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

    return (
        <main id="createRecipe">

            <form onSubmit={handleSubmission} id="createRecipeForm">
                <h2>Create New Recipe</h2>

                {/* Choose Category */}
                <label htmlFor="categorySelection">Choose a Category</label>
                <select id="categorySelection">
                    <option value="Misc" defaultValue={"Misc"}>Misc</option>
                    {
                        categories.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))
                    }
                </select>

                {/* Choose Name */}
                <label htmlFor="titleSelection">Give Your Recipe a Title</label>
                <input type="text" id="titleSelection"/>

                {/* Enter Description */}
                <label htmlFor="descriptionSelection">Enter A Description</label>
                <textarea name="" id="descriptionSelection"></textarea>

                {/* Enter Ingredients */}
                <label htmlFor="ingredients">Add Ingredients</label>
                <div id="ingredients">
                    <input type="text" name="ingredient" />
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