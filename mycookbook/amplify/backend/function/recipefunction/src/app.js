/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_MYCOOKBOOK40F9429F_USERPOOLID
	ENV
	REGION
	STORAGE_MYCOOKBOOKDB_ARN
	STORAGE_MYCOOKBOOKDB_NAME
	STORAGE_MYCOOKBOOKDB_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

//Import AWS SDK
const AWS = require('aws-sdk')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

//Import DynamoDB access
const region = process.env.REGION;
const ddb_table_name = process.env.STORAGE_MYCOOKBOOKDB_NAME;
const docsClient = new AWS.DynamoDB.DocumentClient({region})

/**********************
 *     Get recipes *
 **********************/

// app.get('/recipe/single-recipe', async function(req, res) {
//   // res.json({success: 'get call succeed!', url: req.url});

//   const { userID, recipeID } = req.queryParams;

//   const params = {
//     TableName: ddb_table_name,
//     KeyConditionExpression: "userID = :userIDVal and recipeID = :recipeIDVal",
//     ExpressionAttributeValues: {
//       ":userIDVal": userID,
//       ":recipeIDVal": recipeID
//     }
//   };

//   // let params = {TableName: ddb_table_name}

//   try {
//     console.log('GETTING DATA FOR SINGLE RECIPE!');
//     const data = await docsClient.query(params).promise();
    
//     if (data.Items && data.Items.length > 0) {
//       console.log('RECIPE FOUND!');
//       res.json(data.Items[0]);  // Assuming the first item is the one we're looking for
//     } else {
//       res.status(404).json({ message: 'Recipe not found' });
//     }
//   } catch (error) {
//     console.log('ERROR:', error);
//     res.status(500).json({ error: error.message });
//   }

//   // try {
//   //   console.log('GETTING DATA!!!')
//   //   const data = await docsClient.scan(params).promise()
//   //   console.log('GOT DATA!!! HELL TO THE YES!!!')
//   //   res.json(data);
//   // } catch (error) {
//   //   console.log('UHOH, ERROR!!!', error)
//   //   res.json({'error, apple!': error})
//   // }

// });

/**
 * Get a single recipe by its userID and its recipeID
 */
app.get('/recipe/single/:userID/:recipeID', async function(req, res) {
  const { userID, recipeID } = req.params;  // Extracting from the URL parameters

  // Define DynamoDB parameters for querying
  const params = {
    TableName: ddb_table_name,
    KeyConditionExpression: "userID = :userIDVal and recipeID = :recipeIDVal",
    ExpressionAttributeValues: {
      ":userIDVal": userID,
      ":recipeIDVal": recipeID
    }
  };

  try {
    // console.log('GETTING DATA FOR SINGLE RECIPE!');
    const data = await docsClient.query(params).promise();
    
    if (data.Items && data.Items.length > 0) {
      console.log('RECIPE FOUND!');
      res.json(data.Items[0]);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
  }

});

/**
 * Get a users recipes for a specified category
 */
app.get('/recipe/category/:userID/:categoryID', async function(req, res) {

  //Extract the ID's from the URL
  const { userID, categoryID } = req.params;

  // Define DynamoDB parameters for querying
  const params = {
    TableName: ddb_table_name,
    KeyConditionExpression: "userID = :userIDVal",
    FilterExpression: "categoryID = :categoryIDVal",
    ExpressionAttributeValues: {
      ":userIDVal": userID,
      ":categoryIDVal": categoryID
    }
  };

  try {
    //Get the data for all users recipes in a certain category
    const data = await docsClient.query(params).promise();
    
    //If there is data, send it back...
    if (data.Items && data.Items.length > 0) {
      res.json(data);
    } else { //... else, send a message saying no recipes were found
      res.status(404).json({ message: 'No recipes found' });
    }
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
  }

});

/****************************
* Create a new recipe routes*
****************************/

app.post('/recipe', async function(req, res) {

  const { 
      userID, 
      recipeID, 
      category, 
      categoryID, 
      name, 
      description,
      ingredients,
      instructions 
    } = req.body;

  let params = {
    TableName: ddb_table_name,
    Item: {
      userID: userID,
      recipeID: recipeID,
      category: category,
      categoryID: categoryID,
      name: name, 
      description: description,
      ingredients: ingredients,
      instructions: instructions
    }
  };

  try {
    await docsClient.put(params).promise();
    res.status(201).json(params.Item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// app.post('/recipe/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example put method *
****************************/

app.put('/recipe', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/recipe/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/recipe', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/recipe/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
