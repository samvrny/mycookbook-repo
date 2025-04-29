import { del } from 'aws-amplify/api'

/**
 * This function gets a single recipe based on a user ID
 * and a recipe ID
 */
export const deleteCategory = async (userID, categoryID) => {
    
    const request = del({
        apiName: 'mycookbookcategory',
        path: `/category/${userID}/${categoryID}`
    })

    const response = await request.response
    const data = await response.body.json();
    
    return data;
}