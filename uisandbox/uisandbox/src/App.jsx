import './styles/style.css' //IMPORT THE NEW STYLESHEET

//Import the needed things from React Router DOM
import { Routes, Route } from 'react-router-dom'


//Import Components (for tesing. BrowserRouter will eventually route to pages... I think)
import Header from './components/Header'
import UserHome from './components/UserHome'
import CreateRecipe from './components/CreateRecipe'
import Recipe from './components/Recipe'
import UpdateRecipe from './components/UpdateRecipe'


function App() {

  return (
    <>
      <Header />

      {/* {location.pathname === "/user-home" && <UserHome />} */}

      <Routes>
            <Route path="/" element={<UserHome />} />
            {/* <Route path="/user-home" element={<UserHome />} /> */}
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/update-recipe" element={<UpdateRecipe />} />
      </Routes>

    </>
  )
}

export default App
