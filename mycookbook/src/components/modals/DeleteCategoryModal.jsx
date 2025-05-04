import { useState } from "react";
import { deleteCategory } from "../../helpers/deleteCategory";
import { getUserRecipesByCategory } from "../../helpers/getUserRecipesByCategory"

/**
 * This modal manages the deletion of a category. It ensures a category
 * has no recipes left before deletion, and that a user is sure that they
 * want to delete a category
 */
export default function DeleteCategoryModal({ setIsOpen, setCategories, categoryName, categoryID, userID }) {

    //Conditional messages to display in the Modal
    const initialMessage = `<strong>WARNING:</strong> You are about to delete your category ${categoryName}. <strong><em>This action can NOT be undone.</em></strong> Once you delete this category, it will be erased forever and you will not be able to to access it again. Click delete if you are sure. Otherwise, click Go Back to head back to safety.`
    const errorRecipesMessage = `Your category ${categoryName} cannot be deleted because it still has recipes associated with it. You must either update the recipes in this category to be in another category, or delete them before you can delete this category.`
    const modalSpinner = `<div class="spinner"></div>`;

    //Set the inital state of the modal message
    const [modalMessage, setModalMessage] = useState(initialMessage);

    /**
     * This function runs when a user confirms they want to delete
     * a category. It checks to ensure there are no more recipes 
     * associated with the category before calling to delete it. If 
     * there are still recipes, the user is displayed an error.
     */
    const handleDelete = async () => {

        setModalMessage(modalSpinner);

        //Check to see if there are still recipes associated with the category
        try {

            const response = await getUserRecipesByCategory(userID, categoryID);

            //If there are no recipes in the category....
            if (response.Items.length === 0) {
                deleteForReal(); //.... call to delete the category
            } else if (response.Items.length > 0) {
                setModalMessage(errorRecipesMessage); //.... else, give the user an error
            }

        } catch (error) {
            console.log(error);
        } 

    }

    /**
     * This function calls to delete the category once it has been confirmed
     * there are no more recipes associated with it.
     */
    const deleteForReal = async () => {

        try {

            const response = await deleteCategory(userID, categoryID);

            /**
             * Remove the category from the list of categories in the UI and 
             * close the modal
             */
            if (response) {
                setCategories(currentCategories => currentCategories.filter(category => category.categoryID !== categoryID));
                setIsOpen(false);
            }

        } catch (error) {
            console.log(error);
        } 

    }

    /**
     * Modal content display
     */
    return (
        <section id="deleteModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Delete {categoryName}</h2>

                {/* 
                    The modal message is set with this dangerous method.
                    This is safe due to the HTML being injected being hard
                    coded by the developer. DO NOT allow user input HTML
                    to be set by this method.
                */}
                <p dangerouslySetInnerHTML={{ __html: modalMessage }}></p>

                <div className="deleteModalButtons">
                    <button className="defaultButton buttonRed modalButton" onClick={() => {handleDelete()}}>Delete</button>
                    <button className="defaultButton buttonGreen modalButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}