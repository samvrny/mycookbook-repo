/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * THIS FUNCTION IS FOR QUERYING RECIPES!!!!
 */


const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

//THIS BLOCK ADDED with GPT HELP
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'mcbsand-dev'; // <-- replace with your actual table name


// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle CORS preflight request
  }

  next()
});


// MOCKING OUT THE GET NOW!!!
app.get('/recipe', async function(req, res) {
  const userId = req.query.userID;
  const recipeId = req.query.recipeID;

  if (!userId || !recipeId) {
    return res.status(400).json({ error: 'Missing userId or recipeId in query string' });
  }

  /**
   * THESE CAN BE MODIFIED
   * Right now, this will select a specific recipe. It seems to be
   * that in order to mod a route, all that needs to happen is to
   * change the incoming parameters. This is where multiple routes
   * will come into place. Right now, this SHOULD select a single 
   * recipe from the database. We shall see....
   */
  const params = { 
    TableName: TABLE_NAME,
    Key: {
      userId,
      recipeId
    }
  };

  try {
    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(result.Item);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Could not fetch recipe' });
  }
});
/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
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
