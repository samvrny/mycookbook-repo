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

    return (
        <main id="createRecipe">

            <form onSubmit={handleSubmission}>
                <h2>Create New Recipe</h2>

                {/* Choose Category */}
                <label htmlFor="categorySelection">Choose a Category</label>
                <select id="categorySelection">
                    <option value="Misc" defaultValue={"Misc"}>Misc</option>
                    {
                        categories.map(category => (
                            <option value={category}>{category}</option>
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
                <button onClick={addIngredientInput}>Add Another Ingredient</button>

                {/* Enter Instructions */}
                <label htmlFor="">Add Instructions</label>
                <input type="text" />
                <button>Add Another Instruction</button>

                {/* Submit */}
                <input type="submit" value="Create New Recipe"/>
            </form>
        </main>
    )

}