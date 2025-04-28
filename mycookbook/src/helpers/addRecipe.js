import { v4 as uuid } from "uuid";
import { post } from 'aws-amplify/api'

/**
 * This function creates a new recipe
 */
export const addRecipe = async (
        userID,
        category,
        categoryID,
        name,
        description,
        ingredients,
        instructions ) => {

    //Use uuid to set the recipeID
    let recipeID = uuid();

    //Set the request body
    const requestBody = {
        userID: userID,
        recipeID: recipeID,
        category: category,
        categoryID: categoryID,
        name: name, 
        description: description,
        ingredients: ingredients,
        instructions: instructions
    };

    //Set the request parameters
    const request = post({
        apiName: 'mycookbookrecipe',
        path: '/recipe',
        options: {
            body: requestBody
        }
    });

    //Make the request and get the responst
    const response = await request.response;
    const data = await response.body.json();

    //Return the response
    return data;
}