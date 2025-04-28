import { get } from 'aws-amplify/api'

/**
 * This function gets a single recipe based on a user ID
 * and a recipe ID
 */
export const getSingleRecipe = async (userID, recipeID) => {
    
    const request = get({
        apiName: 'mycookbookrecipe',
        path: `/recipe/single/${userID}/${recipeID}`
    })

    const response = await request.response
    const data = await response.body.json();
    
    return data;
}