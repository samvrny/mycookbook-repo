import { del } from 'aws-amplify/api'

/**
 * This function calls to delete a recipe based on a userID and a 
 * recipeID
 */
export const deleteRecipe = async (userID, recipeID) => {
    
    //Set the request parameters
    const request = del({
        apiName: 'mycookbookrecipe',
        path: `/recipe/${userID}/${recipeID}`
    })

    //Make the request and get the response
    const response = await request.response
    const data = await response.body.json();
    
    //Return the response
    return data;
}