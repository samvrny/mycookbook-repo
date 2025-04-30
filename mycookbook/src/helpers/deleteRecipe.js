import { del } from 'aws-amplify/api'

/**
 * This function calls to delete a recipe based on a userID and a 
 * recipeID
 */
export const deleteRecipe = async (userID, recipeID) => {
    
    const request = del({
        apiName: 'mycookbookrecipe',
        path: `/recipe/${userID}/${recipeID}`
    })

    const response = await request.response
    const data = await response.body.json();
    
    return data;
}