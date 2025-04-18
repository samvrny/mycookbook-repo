import './styles/style.css' //IMPORT THE NEW STYLESHEET

//Import the needed things from React Router DOM
import { Routes, Route, Navigate } from 'react-router-dom'

//Import Components (for tesing. BrowserRouter will eventually route to pages... I think)
import Header from './components/Header'
import Footer from './components/Footer'
import CreateRecipe from './components/CreateRecipe'
import Recipe from './components/Recipe'
import UpdateRecipe from './components/UpdateRecipe'
import DeleteRecipe from './components/DeleteRecipe'
import ConditionalHome from './components/ConditionalHome'
import SignUp from './components/SignUp'
import Categories from './components/Categories'

function App() {

  return (
    <>
      <Header />
      
      <Routes>

            <Route path="/" element={<ConditionalHome />} />

            <Route 
              path="/create-recipe" 
              element={<CreateRecipe />} 
            />
            <Route 
              path="/recipe/:recipeIdToDisplay" 
              element={<Recipe />} 
            />
            <Route 
              path="/update-recipe/:recipeIdToUpdate" 
              element={<UpdateRecipe />} 
            />
            <Route 
              path="/delete-recipe/:recipeIdToDelete" 
              element={<DeleteRecipe />} 
            />
            <Route 
              path="/manage-categories"
              element={<Categories />}
            />

            <Route path="/sign-up" element={<SignUp />} />

            {/* 👇 This catches all undefined routes and redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
