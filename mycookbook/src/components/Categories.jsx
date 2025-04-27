//import mockCategories from "../mockRecipeData/mockRecipes.json"
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";

import { getUsersCategories } from '../helpers/getUsersCategories';

import DeleteCategoryModal from "./DeleteCategoryModal";

export default function Categories() {

    // const categories = mockCategories.categories;
    // const { user } = useAuthenticator(context => [context.user]);
    // const userID = JSON.stringify(user.userId);

    /**
     * ==========================
     * Get the users categories
     * ==========================
     */

    //Get the user ID
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    const [categories, setCategories] = useState([]);

    //Call to set the categories once the users ID is fetched
    useEffect(() => {
        if (!userID) return;

        const fetchCategories = async () => {
            try {
                const data = await getUsersCategories(userID);

                setCategories(data.Items);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [userID]);

    /**
     * =================================
     * Delete a category functionality
     * =================================
     */

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
        const category = categories.find(category => category.categoryID === id);

        // console.log(category)
        // console.log(id)
        // console.log(category.category)

        setCategoryToDeleteId(category.categoryID);
        setCategoryToDelete(category.category);

        setIsOpen(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Hello, Category");
    }

    /**
     * ==================
     * Content display
     * ==================
     */

    /**
     * If there are no categories, set the initial state of the page to loading
     */
    if (!categories) {
        return <main className="mainContentContainer">Loading...</main>; // Show loading state until data is fetched
    }

    /**
     * Main content of the page
     */
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
                                        {category.category} 
                                        <i id={category.categoryID} className="bi bi-trash-fill" onClick={deleteCategory}></i>
                                    </li>
                        })}
                    </ul>
                </section>
            </div>

            {isOpen && <DeleteCategoryModal setIsOpen={ setIsOpen } categoryID={categoryToDeleteId} categoryName={categoryToDelete} userID={userID} />}
        </main>
    )

}