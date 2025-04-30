import { del } from 'aws-amplify/api'

/**
 * This function deletes a category based on the userID and 
 * a categoryID
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