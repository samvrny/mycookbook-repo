import { get } from 'aws-amplify/api'

/**
 * This function gets categories based on a users ID
 */
export const getUsersCategories = async (userID) => {
    
    //Set the request parameters
    const request = get({
        apiName: 'mycookbookcategory',
        path: `/category/${userID}`
    })

    //Make the request and get the response
    const response = await request.response
    const data = await response.body.json();
    
    //Return the response
    return data;
}