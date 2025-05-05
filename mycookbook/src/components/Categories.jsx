//Import bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";

//Import helper functions
import { getUsersCategories } from '../helpers/getUsersCategories';
import { addCategory } from '../helpers/addCategory';

//Import modals
import DeleteCategoryModal from "./modals/DeleteCategoryModal";
import CreateCategoryMessageModal from "./modals/CreateCategoryMessageModal";
import GenericLoadingModal from "./modals/GenericLoadingModal"

/**
 * This component is the central categories maintenance page 
 */
export default function Categories() {

    //Get the user ID for use in creating and deleting categories
    const { user } = useAuthenticator(context => [context.user]);
    const userID = user.userId;

    /**
     * ==========================
     * Get the users categories
     * ==========================
     */

    //State for the users categories
    const [categories, setCategories] = useState(null);

    //Call to set the categories once the users ID is fetched
    useEffect(() => {

        //If there is no useID yet, exit the useEffect
        if (!userID) return;

        //Fetch the users categories
        const fetchCategories = async () => {
            try {
                const data = await getUsersCategories(userID);

                /**
                 * Set the users categories state to the results.
                 */
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
     * These state blocks are used for the delete category modal
     * 
     * - isOpen: modal state for the delete category modal
     * - categoryToDeleteId: ID of the category to be deleted
     * - categoryToDelete: Name of the category to be deleted
     */
    const [isOpen, setIsOpen] = useState(false);
    const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    
    /**
     * Gather details for deleting a category, then open the 
     * delete category modal
     */
    const deleteCategory = (event) => {

        //Capture the ID of the delete button that's been clicked
        const id = event.target.id;

        //Use the ID to grab the other category data from the categories state
        const category = categories.find(category => category.categoryID === id);

        //Set the state variables for the delete modal
        setCategoryToDeleteId(category.categoryID);
        setCategoryToDelete(category.category);

        //Open the delete modal
        setIsOpen(true);
    }

    /**
     * ============================
     * Add category functionality
     * ============================
     */

    //State for the create category spinner modal
    const [createIsOpen, setCreateIsOpen] = useState(false);

    /**
     * Handle the button event click for creating a category
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Get the category input element
        const categoryInput = document.getElementById("categoryInput");

        //Trim whitespace off the user entry (the category inputs value)
        let categoryToAdd = categoryInput.value.trim();

        //Add the category
        try {

            //Open the create category modal
            setCreateIsOpen(true);

            //Call to add the category
            const response = await addCategory(userID, categoryToAdd);

            //Add the new category to the categories display list
            setCategories((currentCategories) => [...currentCategories, response]);
        } catch (error) {
            console.log(error);
        } finally {
            //Close the create category modal
            setCreateIsOpen(false);
        }

        //Reset the category form
        const newCategoryForm = document.getElementById("newCategoryForm");
        newCategoryForm.reset();
    }

    /**
     * ==================
     * Content display
     * ==================
     */

    /**
     * If there are no categories, show the generic loading modal while
     * the categories load
     */
    if (!categories) {
        return <main className="mainContentContainer"><GenericLoadingModal /></main>;
    }

    /**
     * Main content of the page
     */
    return (
        <main className="mainContentContainer">

            <div className="categoriesMainElement">

                <form onSubmit={handleSubmit} className="categoryForm" id="newCategoryForm">
                    <label htmlFor="categoryInput">Add New Category</label>
                    <input type="text" id="categoryInput" required/>
                    <input type="submit" value="Add Category +" className="defaultButton buttonGreen addCategoryButton"/>
                </form>

                <section className="categoryDisplay">
                    <h2>Your Categories</h2>

                    <ul>
                        {categories.map((category, index ) => {
                            return <li key={index} className="categoryText" name={index}>
                                        {category.category} 
                                        <i id={category.categoryID} className="bi bi-trash-fill" onClick={deleteCategory}></i>
                                    </li>
                        })}
                    </ul>
                </section>
            </div>

            {/* Delete category modal */}
            {isOpen && <DeleteCategoryModal 
                    setIsOpen={ setIsOpen } 
                    setCategories={setCategories} 
                    categoryID={categoryToDeleteId} 
                    categoryName={categoryToDelete} 
                    userID={userID} />}

            {/* Create categories modal */}
            {createIsOpen && <CreateCategoryMessageModal />}
        </main>
    )

}