import './App.css'
import { get } from 'aws-amplify/api'

//THESE IMPORTS AND THE CONFIG ARE ABSOLUTELY NECESSARY!!!!!! ... Or not. Mother fucker.
//It seems like this has something to do with the problem. This needs to be here. It does
//not, however, solve the annoying "authorization" problem. There is no auth with this 
//project yet!!!
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

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

    try {
      const restOperation = get({ 
        apiName: 'sandboxtwoAPI',
        path: '/recipes' 
      });
      const response = await restOperation.response;
      console.log('GET call succeeded: ', response);
    } catch (e) {
      console.log(e);
    }
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
