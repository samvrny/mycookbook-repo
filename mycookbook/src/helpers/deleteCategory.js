import { del } from 'aws-amplify/api'

/**
 * This function deletes a category based on the userID and 
 * a categoryID
 */
export const deleteCategory = async (userID, categoryID) => {
    
    //Set the request parameters
    const request = del({
        apiName: 'mycookbookcategory',
        path: `/category/${userID}/${categoryID}`
    })

    //Make the request and ret the response
    const response = await request.response
    const data = await response.body.json();
    
    //Return the response
    return data;
}