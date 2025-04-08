import mockData from '../mockRecipeData/mockRecipes.json'

export default function CreateRecipe() {

    //Get categories
    let categories = mockData.categories;

    return (
        <main id="createRecipe">
            <h2>Create New Recipe</h2>

            {/* Choose Category */}
            <p>Choose a Category</p>
            <select>
                <option value="Misc" defaultValue={"Misc"}>Misc</option>
                {
                    categories.map(category => (
                        <option value={category}>{category}</option>
                    ))
                }
            </select>

            {/* Choose Name */}

            {/* Enter Description */}

            {/* Enter Ingredients */}

            {/* Enter Instructions */}

            {/* Submit */}
        </main>
    )

}