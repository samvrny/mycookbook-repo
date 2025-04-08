import './styles/style.css' //IMPORT THE NEW STYLESHEET

//Import Components (for tesing. BrowserRouter will eventually route to pages... I think)
import Header from './components/Header'
import UserHome from './components/UserHome'
import CreateRecipe from './components/CreateRecipe'


function App() {

  return (
    <>
      <Header />

      {/* <hr />
      <hr />
      <p>MOCK USER HOME SCREEN BELOW</p>
      <hr />
      <hr /> */}

      <UserHome />

      <hr />
      <hr />
      <p>MOCK CREATE RECIPE BELOW</p>
      <hr />
      <hr />

      <CreateRecipe />
    </>
  )
}

export default App
