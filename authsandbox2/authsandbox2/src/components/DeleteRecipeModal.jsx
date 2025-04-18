export default function DeleteRecipeModal({ setIsOpen, recipeID, recipeName }) {

    console.log(recipeID);
    console.log(recipeName);

    return (
        <section id="deleteModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Delete {recipeName}</h2>

                <p><strong>WARNING:</strong> You are about to delete your {recipeName} recipe. <strong><em>This action can NOT be undone.</em></strong> Once you delete this recipe, it will be erased forever and you will not be able to to access it again. Click delete if you are sure. Otherwise, click Go Back to head back to safety.</p>

                {/* <p>{recipeID}</p>                 */}

                <div className="recipeButtons">
                    <button className="recipeDeleteButton">Delete</button>
                    <button className="recipeUpdateButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}