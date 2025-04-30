import { put } from 'aws-amplify/api'

/**
 * This function creates a new recipe
 */
export const updateRecipe = async (
        userID,
        recipeID,
        category,
        categoryID,
        name,
        description,
        ingredients,
        instructions ) => {

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
    const request = put({
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