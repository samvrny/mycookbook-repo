import './styles/style.css' //IMPORT THE NEW STYLESHEET

//Import the needed things from React Router DOM
import { Routes, Route } from 'react-router-dom'

//Import the cognito stuff

//Import Components (for tesing. BrowserRouter will eventually route to pages... I think)
import Header from './components/Header'
// import UserHome from './components/UserHome'
import CreateRecipe from './components/CreateRecipe'
import Recipe from './components/Recipe'
import UpdateRecipe from './components/UpdateRecipe'
// import WelcomePage from './components/WelcomePage'
import ConditionalHome from './components/ConditionalHome'
import SignLog from './components/SignLog'


function App() {

  return (
    <>
      <Header />
        <Routes>
              {/* <Route path="/" element={<UserHome />} /> */}
              {/* <Route path="/" element={<WelcomePage />} /> */}

              <Route path="/" element={<ConditionalHome />} />

              {/* <Route path="/user-home" element={<UserHome />} /> */}
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/recipe/:recipeIdToDisplay" element={<Recipe />} />
              <Route path="/update-recipe" element={<UpdateRecipe />} />

              {/* TEMP ROUTE FOR THE LOGIN */}
              <Route path="/sign-log" element={<SignLog />} />
        </Routes>
    </>
  )
}

export default App;
