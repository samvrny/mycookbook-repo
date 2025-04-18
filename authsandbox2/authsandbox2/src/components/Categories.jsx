import mockCategories from "../mockRecipeData/mockRecipes.json"
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Categories() {

    const categories = mockCategories.categories;

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Hello, Category");
    }
    
    const deleteCategory = (event) => {
        const categoryToDeleteId = event.target.id;

        const categoryToDelete = document.querySelector(
            `[name="${categoryToDeleteId}"]`
        ).textContent;

        console.log(categoryToDeleteId);
        console.log(categoryToDelete);
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

                {categories.map((category, index )=> {
                    return <p key={index} className="categoryText" name={index}>
                                {category} 
                                <i id={index} className="bi bi-trash-fill" onClick={deleteCategory}></i>
                            </p>
                })}
            </section>
        </main>
    )

}