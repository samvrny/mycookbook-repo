export default function DeleteRecipeModal({ setIsOpen, recipeID, recipeName }) {

    console.log(recipeID);
    console.log(recipeName);

    return (
        <section id="createModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Delete {recipeName}</h2>

                <p>Please wait. We are creating your recipe...</p>

                <div className="deleteModalButtons">
                    <button className="defaultButton buttonRed modalButton">Delete</button>
                    <button className="defaultButton buttonGreen modalButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}