/**
 * This modal appears in the Categories.jsx component when a 
 * category is in the process of being created
 */
export default function CreateCategoryMessageModal() {

    return (
        <section id="createModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>Creating Category...</h2>

                <div className="spinner"></div>
            </div>
        </section>
    )

}