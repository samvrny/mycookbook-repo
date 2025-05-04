import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { deleteRecipe } from "../../helpers/deleteRecipe";

/**
 * This modal manages the deletion of a recipe. It prompts a user
 * to be sure they want to delete a recipe before calling to 
 * delete it.
 */
export default function DeleteRecipeModal({ setIsOpen, recipeID, recipeName, userID }) {

    //Get the navigate module from react router dom to navigate back home
    const navigate = useNavigate();

    //Conditional messages to display in the modal
    const initialMessage = `<strong>WARNING:</strong> You are about to delete your ${recipeName} recipe. <strong><em>This action can NOT be undone.</em></strong> Once you delete this recipe, it will be erased forever and you will not be able to to access it again. Click delete if you are sure. Otherwise, click Go Back to head back to safety.`;
    const modalSpinner = `<div class="spinner"></div>`;

    //Set the initial state of the modal message
    const [modalMessage, setModalMessage] = useState(initialMessage);

    /**
     * This function calls to delete the recipe once the user 
     * clicks the delete button
     */
    const handleDelete = async () => {

        try {

            setModalMessage(modalSpinner);

            const response = await deleteRecipe(userID, recipeID);

            /**
             * Send the user back to their home page once the 
             * recipe has been deleted
             */
            if (response) {
                navigate("/");
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
                <h2>Delete {recipeName}</h2>

                {/* 
                    The modal message is set with this dangerous method.
                    This is safe due to the HTML being injected being hard
                    coded by the developer. DO NOT allow user input HTML
                    to be set by this method.
                */}
                <p dangerouslySetInnerHTML={{ __html: modalMessage }}></p>

                <div className="deleteModalButtons">
                    <button className="defaultButton buttonRed modalButton" onClick={handleDelete}>Delete</button>
                    <button className="defaultButton buttonGreen modalButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}