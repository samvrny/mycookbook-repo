/**
 * This modal appears in the CreateRecipe.jsx component when a 
 * recipe is in the process of being created
 */
export default function CreateRecipeMessageModal() {

    return (
        <section id="createModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Creating Recipe...</h2>

                <div className="spinner"></div>
            </div>
        </section>
    )

}