//Import react-router-dom imports for routing
import { Routes, Route, Navigate } from 'react-router-dom'

//Import Components
import Header from './components/Header'
import Footer from './components/Footer'
import CreateRecipe from './components/CreateRecipe'
import Recipe from './components/Recipe'
import UpdateRecipe from './components/UpdateRecipe'
import ConditionalHome from './components/ConditionalHome'
import SignUp from './components/SignUp'
import Categories from './components/Categories'

//Authorization wrapper
import RequireAuthWrapper from './components/RequireAuthWrapper'

function App() {

  return (
    <>
      <Header />
      
      <Routes>

            <Route path="/" element={<ConditionalHome />} />

            <Route 
              path="/create-recipe" 
              element={
              <RequireAuthWrapper>
                <CreateRecipe />
              </RequireAuthWrapper>} 
            />
            <Route 
              path="/recipe/:recipeID" 
              element={
              <RequireAuthWrapper>
                <Recipe />
              </RequireAuthWrapper>} 
            />
            <Route 
              path="/update-recipe/:recipeID" 
              element={
                <RequireAuthWrapper>
                  <UpdateRecipe />
                </RequireAuthWrapper>
              } 
            />
            <Route 
              path="/manage-categories"
              element={
                <RequireAuthWrapper>
                  <Categories />
                </RequireAuthWrapper>
              }
            />

            <Route path="/sign-up" element={<SignUp />} />

            {/* This catches all undefined routes and redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
