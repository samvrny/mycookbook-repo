import mockData from '../mockRecipeData/mockRecipes.json'

export const fetchSingleRecipe = async (userID, recipeID) => {
    console.log('UserID:', userID);
    console.log('Recipe ID:', recipeID);

    // For now just pull from mock JSON
    const recipes = mockData.recipes;
    let recipe = recipes.find(recipe => recipe.recipeID === recipeID);

    //Once the recipe is retrieved, set it into state.
    return recipe;
};