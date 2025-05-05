import { v4 as uuid } from "uuid";
import { post } from 'aws-amplify/api'

/**
 * This function creates a new category
 */
export const addCategory = async (userID, category) => {

    //Use uuid to set the categoryID
    let categoryID = uuid();

    //Set the request body
    const requestBody = {
        userID: userID,
        categoryID: categoryID,
        category: category
    };

    //Set the request parameters
    const request = post({
        apiName: 'mycookbookcategory',
        path: '/category',
        options: {
            body: requestBody
        }
    });

    //Make the request and get the response
    const response = await request.response;
    const data = await response.body.json();

    //Return the response
    return data;
}
