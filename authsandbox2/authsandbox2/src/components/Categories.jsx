import mockCategories from "../mockRecipeData/mockRecipes.json"
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";

import DeleteCategoryModal from "./DeleteCategoryModal";

export default function Categories() {

    const categories = mockCategories.categories;
    const { user } = useAuthenticator(context => [context.user]);
    const userID = JSON.stringify(user.userId);

    /**
     * These state blocks are used for deleting a category
     */
    const [isOpen, setIsOpen] = useState(false);
    const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    
    /**
     * Gather details for deleting a category, then open the 
     * delete category modal
     */
    const deleteCategory = (event) => {
        const id = event.target.id;
        const category = document.querySelector(`[name="${id}"]`).textContent;

        setCategoryToDeleteId(id);
        setCategoryToDelete(category);

        setIsOpen(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Hello, Category");
    }

    return (
        <main className="mainContentContainer">

            <div className="categoriesMainElement">
                <form onSubmit={handleSubmit} className="categoryForm">
                    <label htmlFor="categoryInput">Add New Category</label>
                    <input type="text" id="categoryInput"/>
                    <input type="submit" value="Add Category +" className="defaultButton buttonGreen addCategoryButton"/>
                </form>

                <section className="categoryDisplay">
                    <h2>Your Categories</h2>

                    <ul>
                        {categories.map((category, index )=> {
                            return <li key={index} className="categoryText" name={index}>
                                        {category} 
                                        <i id={index} className="bi bi-trash-fill" onClick={deleteCategory}></i>
                                    </li>
                        })}
                    </ul>
                </section>
            </div>

            {isOpen && <DeleteCategoryModal setIsOpen={ setIsOpen } categoryID={categoryToDeleteId} categoryName={categoryToDelete} userID={userID} />}
        </main>
    )

}