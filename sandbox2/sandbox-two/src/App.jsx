import './App.css'
import { get } from 'aws-amplify/api'

//THESE IMPORTS AND THE CONFIG ARE ABSOLUTELY NECESSARY!!!!!! ... Or not. Mother fucker.
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

    // const requestRecipes = get({
    //   apiName: 'recipeAPI2',
    //   path: '/recipeTwo',
    //   options: {
    //     queryParams: {
    //       userID,
    //       recipeID
    //     }
    //     // headers: { Authorization: token }
    //   }
    // })

    const requestRecipes = get({
      apiName: 'sandboxtwoAPI',
      path: '/item'
    })

    const response = await requestRecipes.response
    const data = await response.body.json()

    console.log("THIS THING IS ON")
    console.log(data)
    console.log("\n END GET REQUEST")
  }

  return (
    <>
    <div className='App'>
      <header>
        Welcome to the Sandbox 2 Environment
      </header>

      <h1>MyCookbook Sandbox</h1>

      <form id="cryptoInputs" onSubmit={preventReload}>

        {/* Add button to the UI to give user the option to call the API */}
        <input type="submit" defaultValue="Get Recipe" />
      </form>
    </div>
    </>
  )
}

export default App
