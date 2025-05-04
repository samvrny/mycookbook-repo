/**
 * This modal is used by many components to display a
 * generic loading spinner:
 * 
 * UserHome.jsx
 * Categories.jsx
 * CreateRecipe.jsx
 * Recipe.jsx
 * UpdateRecipe.jsx
 * 
 */
export default function GenericLoadingModal() {

    return (
        <section id="genericModal" className="modalBackgroundLight">
            <div className="deleteModalContent">
                <h2>Loading...</h2>

                <div className="spinner"></div>
            </div>
        </section>
    )

}