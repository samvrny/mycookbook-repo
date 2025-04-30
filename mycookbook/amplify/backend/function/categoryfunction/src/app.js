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
	STORAGE_MYCOOKBOOKCATDB_ARN
	STORAGE_MYCOOKBOOKCATDB_NAME
	STORAGE_MYCOOKBOOKCATDB_STREAMARN
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
const ddb_table_name = process.env.STORAGE_MYCOOKBOOKCATDB_NAME;
const docsClient = new AWS.DynamoDB.DocumentClient({region})

/**********************
    * GET Routes *
 **********************/

/**
 * Get all categories by userID - get all of a users categories.
 */
app.get('/category/:userID', async function(req, res) { 
  const userID = req.params.userID;

  let params = {
    TableName: ddb_table_name,
    KeyConditionExpression: "#userID = :userIDVal",
    ExpressionAttributeNames: {
      "#userID": "userID"
    },
    ExpressionAttributeValues: {
      ":userIDVal": userID
    }
  };

  try {
    // console.log('QUERYING DATA for userID:', userID);
    const data = await docsClient.query(params).promise();
    // console.log('GOT DATA!!! HELL TO THE YES!!!');
    res.json(data);
  } catch (error) {
    // console.error('UHOH, ERROR!!!', error);
    res.status(500).json({ 'error': error.message });
  }
});

/****************************
      * POST Routes *
****************************/

app.post('/category', async function(req, res) {

  const { userID, categoryID, category } = req.body;

  let params = {
    TableName: ddb_table_name,
    Item: {
      userID: userID,
      categoryID: categoryID,
      category: category
    }
  };

  try {
    await docsClient.put(params).promise();
    // res.status(201).json({ message: 'Category added successfully' });
    res.status(201).json(params.Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/****************************
       * PUT Routes *
****************************/

app.put('/category', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/category/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
    * DELETE Routes *
****************************/

app.delete('/category/:userID/:categoryID', async function(req, res) {

  const { userID, categoryID } = req.params;

  const params = {
    TableName: ddb_table_name,
    Key: {
      userID: userID,
      categoryID: categoryID
    }
  };

  try {
    await docsClient.delete(params).promise();
    res.json({ success: true, message: 'Category deleted successfully', deletedKey: params.Key });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
