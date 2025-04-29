import { useState } from "react";
import { deleteCategory } from "../../helpers/deleteCategory";
import { getUserRecipesByCategory } from "../../helpers/getUserRecipesByCategory"

export default function DeleteCategoryModal({ setIsOpen, setCategories, categoryName, categoryID, userID }) {


    //Messages to display in the Modal
    const initialMessage = `<strong>WARNING:</strong> You are about to delete your category ${categoryName}. <strong><em>This action can NOT be undone.</em></strong> Once you delete this category, it will be erased forever and you will not be able to to access it again. Click delete if you are sure. Otherwise, click Go Back to head back to safety.`
    const errorRecipesMessage = `Your category ${categoryName} cannot be deleted because it still has recipes associated with it. You must either update the recipes in this category to be in another category, or delete them before you can delete this category.`

    const modalSpinner = `<div class="spinner"></div>`;

    //Set the inital state of the modal message
    const [modalMessage, setModalMessage] = useState(initialMessage);

    const handleDelete = async () => {

        setModalMessage(modalSpinner);

        try {

            const response = await getUserRecipesByCategory(userID, categoryID);

            console.log(response);

            if (response.Items.length === 0) {
                deleteForReal();
            } else if (response.Items.length > 0) {
                setModalMessage(errorRecipesMessage);
            }

            console.log("RECIPE FOUND")
            console.log(response);
        } catch (error) {
            console.log(error);
        } 

    }

    const deleteForReal = async () => {

        try {

            const response = await deleteCategory(userID, categoryID);

            console.log("DELETE ACHIEVED")
            console.log(response);

            if (response) {
                setCategories(currentCategories => currentCategories.filter(category => category.categoryID !== categoryID));
                setIsOpen(false);
            }

        } catch (error) {
            console.log(error);
        } 

    }

    return (
        <section id="deleteModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Delete {categoryName}</h2>

                <p dangerouslySetInnerHTML={{ __html: modalMessage }}></p>

                {/* <p>{recipeID}</p>                 */}

                <div className="deleteModalButtons">
                    <button className="defaultButton buttonRed modalButton" onClick={() => {handleDelete()}}>Delete</button>
                    <button className="defaultButton buttonGreen modalButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}