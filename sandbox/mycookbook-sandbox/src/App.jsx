// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { get } from 'aws-amplify/api' //THIS WAS ADDED FOR THE GET

// Imports for Auth with cognito....
// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

function App() {

  function preventReload(event) {
    event.preventDefault();

    console.log("\nEVENT TRIGGERED\n")

    fetchRecipes();
  }

  async function fetchRecipes() {

    // let userID = 1
    // let recipeID = 1

    // const session = await Auth.currentSession();
    // const token = session.getIdToken().getJwtToken();

    const requestRecipes = get({
      apiName: 'recipeAPI2',
      path: '/recipeTwo',
      // options: {
      //   queryParams: {
      //     userID,
      //     recipeID
      //   }
      //   // headers: { Authorization: token }
      // }
    })

    // const requestRecipes = get({
    //   apiName: 'recipeAPI2',
    //   path: '/item'
    // })

    const response = await requestRecipes.response
    const data = await response.body.json()

    console.log("THIS THING IS ON")
    console.log(data)
    console.log("\n END GET REQUEST")
  }

  return (
    <div className='App'>
      <header>
        This is an application
      </header>

      <h1>MyCookbook Sandbox</h1>

      <form id="cryptoInputs" onSubmit={preventReload}>

        {/* Add button to the UI to give user the option to call the API */}
        <input type="submit" defaultValue="Get Recipe" />
      </form>
    </div>
  );
}

//Alright well.... the authenticator works. Ish... (:) SO now... lol this is 
//going to be a little bit more complicated than I thought it was going to be,
//and require some serious time and devotion.
export default App;