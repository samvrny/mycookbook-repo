import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { deleteRecipe } from "../../helpers/deleteREcipe";


export default function DeleteRecipeModal({ setIsOpen, recipeID, recipeName, userID }) {

    //Get the navigate module from react router dom to navigate back home
    const navigate = useNavigate();

    //Messages to display in the modal
    const initialMessage = `<strong>WARNING:</strong> You are about to delete your ${recipeName} recipe. <strong><em>This action can NOT be undone.</em></strong> Once you delete this recipe, it will be erased forever and you will not be able to to access it again. Click delete if you are sure. Otherwise, click Go Back to head back to safety.`;
    const modalSpinner = `<div class="spinner"></div>`;

    //Set the initial state of the modal message
    const [modalMessage, setModalMessage] = useState(initialMessage);

    console.log("RECIPE ID " + recipeID);
    console.log(recipeName);
    console.log("USER ID " + userID);

    const handleDelete = async () => {

        console.log("Click")

        try {

            setModalMessage(modalSpinner);

            const response = await deleteRecipe(userID, recipeID);

            console.log("DELETE ACHIEVED")
            console.log(response);

            navigate("/");

        } catch (error) {
            console.log(error);
        } 

    }

    return (
        <section id="deleteModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Delete {recipeName}</h2>

                <p dangerouslySetInnerHTML={{ __html: modalMessage }}></p>

                <div className="deleteModalButtons">
                    <button className="defaultButton buttonRed modalButton" onClick={handleDelete}>Delete</button>
                    <button className="defaultButton buttonGreen modalButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}