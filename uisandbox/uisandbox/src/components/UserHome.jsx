import mockData from '../mockRecipeData/mockRecipes.json'


export default function UserHome() {

    let categories = mockData.categories;

    console.log(categories);

    return (
        <main id="userHome">
            <aside>
                <div className="categoryButton">Breakfast</div>
                <div className="categoryButton">Lunch</div>
                <div className="categoryButton">Dinner</div>
                <div className="categoryButtonGreen">Add Category +</div>
            </aside>

            <section id="userHomeMainSection">
                <a className="categoryButtonGreen createRecipeButton" href="">Create New Recipe </a>

                <h1>Category Name</h1>

                <p>No recipes found for this category. Choose another category or create a new recipe!</p>

                <article>
                    Here is where a recipe will go
                </article>
            </section>
        </main>
    )

}