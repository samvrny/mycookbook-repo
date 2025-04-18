import mockCategories from "../mockRecipeData/mockRecipes.json"

export default function Categories() {

    const categories = mockCategories.categories;

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Hello, Category");
    }

    return (
        <main id="categoriesMainElement">
            <form onSubmit={handleSubmit}>
                <label htmlFor="categoryInput">Add New Category</label>
                <input type="text" id="categoryInput"/>
                <input type="submit" value="Add Category"/>
            </form>

            <section>
                <h2>Your Categories</h2>

                {categories.map(category => {
                    return <p>{category}</p>
                })}
            </section>
        </main>
    )

}