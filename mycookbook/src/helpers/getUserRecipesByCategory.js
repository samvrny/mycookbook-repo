import { get } from 'aws-amplify/api'

/**
 * This function gets recipes based on a users ID and a 
 * category ID
 */
export const getUserRecipesByCategory = async (userID, categoryID) => {
    
    //Set the request parameters
    const request = get({
        apiName: 'mycookbookrecipe',
        path: `/recipe/category/${userID}/${categoryID}`
    })

    //Make the request and get the response
    const response = await request.response
    const data = await response.body.json();
    
    //Return the response
    return data;
}