import mockData from '../mockRecipeData/mockRecipes.json'


export default function UserHome() {

    let categories = mockData.categories;

    // console.log(categories);

    return (
        <main id="userHome">
            <aside>
                <ul>
                    {/* This is the way to map through things to create elements!! */}
                    {categories.map((category, index) => (
                        <li className="categoryButton" key={index}>{category}</li>
                    ))}
                    {/* <li className="categoryButton">Breakfast</li> */}
                    {/* <li className="categoryButton">Lunch</li> */}
                    {/* <li className="categoryButton">Dinner</li> */}
                    <li className="categoryButtonGreen">Add Category +</li>
                </ul>
            </aside>

            <section id="userHomeMainSection">
                <a className="createRecipeButton" href="">Create New Recipe +</a>

                <h1>Category Name</h1>

                <p>No recipes found for this category. Choose another category or create a new recipe!</p>

                <article>
                    Here is where a recipe will go
                </article>
            </section>
        </main>
    )

}