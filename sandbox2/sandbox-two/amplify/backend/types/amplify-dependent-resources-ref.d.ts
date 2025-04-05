export type AmplifyDependentResourcesAttributes = {
  "api": {
    "sandboxtwoAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "sandboxtwofunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "sandboxtwo": {
      "Arn": "string",
      "Name": "string",
      "PartitionKeyName": "string",
      "PartitionKeyType": "string",
      "Region": "string",
      "SortKeyName": "string",
      "SortKeyType": "string",
      "StreamArn": "string"
    }
  }
}