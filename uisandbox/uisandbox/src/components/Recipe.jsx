import mockData from '../mockRecipeData/mockRecipes.json';

export default function Recipe() {

    let recipes = mockData.recipes;
    let recipeToDisplay = recipes.find(recipe => recipe.recipeID === "2");
    console.log(recipeToDisplay);

    return (
        <main>
            Helllooo
        </main>
    )

}