import { get } from 'aws-amplify/api'

export const getUsersCategories = async (userID) => {
    
    console.log(userID);

    const request = get({
        apiName: 'mycookbookcategory',
        path: `/category/${userID}`
    })

    const response = await request.response
    const data = await response.body.json();
    
    return data;
}