import { get } from 'aws-amplify/api'

/**
 * This function gets recipes based on a users ID and a 
 * category ID
 */
export const getUserRecipesByCategory = async (userID, categoryID) => {
    
    const request = get({
        apiName: 'mycookbookrecipe',
        path: `/recipe/category/${userID}/${categoryID}`
    })

    const response = await request.response
    const data = await response.body.json();
    
    return data;
}