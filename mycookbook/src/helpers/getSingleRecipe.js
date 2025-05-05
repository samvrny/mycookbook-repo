import { get } from 'aws-amplify/api'

/**
 * This function gets a single recipe based on a user ID
 * and a recipe ID
 */
export const getSingleRecipe = async (userID, recipeID) => {
    
    //Set the request parameters
    const request = get({
        apiName: 'mycookbookrecipe',
        path: `/recipe/single/${userID}/${recipeID}`
    })

    //Make the request and get the response
    const response = await request.response
    const data = await response.body.json();
    
    //Return the response
    return data;
}