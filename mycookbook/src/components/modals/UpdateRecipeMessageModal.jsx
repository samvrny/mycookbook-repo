/**
 * This modal appears in the UpdateRecipe.jsx component when a 
 * recipe is in the process of being updated
 */
export default function UpdateRecipeMessageModal() {

    return (
        <section id="updateModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Updating Recipe...</h2>

                <div className="spinner"></div>
            </div>
        </section>
    )

}