import mockCategories from "../mockRecipeData/mockRecipes.json"
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";

import DeleteCategoryModal from "./DeleteCategoryModal";

export default function Categories() {

    const categories = mockCategories.categories;
    const { user } = useAuthenticator(context => [context.user]);
    const userID = JSON.stringify(user.userId);

    //Set the initial state of the delete modal
    const [isOpen, setIsOpen] = useState(false);

    const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    
    const deleteCategory = (event) => {
        const recipeId = event.target.id;
        const category = document.querySelector(`[name="${recipeId}"]`).textContent;

        setCategoryToDeleteId(recipeId);
        setCategoryToDelete(category);

        console.log(categoryToDeleteId);
        console.log(categoryToDelete);
        console.log(userID);

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