

export default function DeleteCategoryModal({ setIsOpen, categoryName, categoryID, userID }) {

    console.log("TO DELETE RECIPE ID: " + categoryID);
    console.log("TO DELETE USER ID:" + userID);
    console.log("CATEGORY NAME: " + categoryName);

    return (
        <section id="deleteModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Delete {categoryName}</h2>

                <p><strong>WARNING:</strong> You are about to delete your category {categoryName}. <strong><em>This action can NOT be undone.</em></strong> Once you delete this category, it will be erased forever and you will not be able to to access it again. All your recipes saved to this category will be moved to the Misc category. Click delete if you are sure. Otherwise, click Go Back to head back to safety.</p>

                {/* <p>{recipeID}</p>                 */}

                <div className="deleteModalButtons">
                    <button className="defaultButton buttonRed modalButton">Delete</button>
                    <button className="defaultButton buttonGreen modalButton" onClick={() => setIsOpen(false)}>Go Back</button>
                </div>
            </div>
        </section>
    )

}