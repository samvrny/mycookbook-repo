import mockData from '../mockRecipeData/mockRecipes.json';

export default function Recipe() {

    let recipes = mockData.recipes;
    let recipe = recipes.find(recipe => recipe.recipeID === "2");
    console.log(recipe);

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

            <div id="recipeButtons">
                
            </div>
        </main>
    )

}