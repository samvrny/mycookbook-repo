import { useState } from "react";
import { deleteCategory } from "../../helpers/deleteCategory";
import { getUserRecipesByCategory } from "../../helpers/getUserRecipesByCategory"

export default function DeleteCategoryModal({ setIsOpen, categoryName, categoryID, userID }) {

    // console.log("TO DELETE RECIPE ID: " + categoryID);
    // console.log("TO DELETE USER ID:" + userID);
    // console.log("CATEGORY NAME: " + categoryName);

    const [modalMessage, setModalMessage] = useState(`<strong>WARNING:</strong> You are about to delete your category ${categoryName}. <strong><em>This action can NOT be undone.</em></strong> Once you delete this category, it will be erased forever and you will not be able to to access it again. Click delete if you are sure. Otherwise, click Go Back to head back to safety.`)

    const handleDelete = async () => {

        try {

            const response = await getUserRecipesByCategory(userID, categoryID);

            console.log(response);

            if (response.Items.length === 0) {
                deleteForReal();
            } else if (response.Items.length > 0) {
                setModalMessage(`Your category ${categoryName} cannot be deleted because it still has recipes associated with it. You must either update the recipes in this category to be in another category, or delete them before you can delete this category.`);
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