import { Link } from "react-router-dom"

export default function NoCategoriesDetectedModal() {

    return (
        <section id="noCategoriesModal" className="modalBackground">
            <div className="deleteModalContent">
                <h2>No Categories</h2>

                <p>Hello! You don't have any categories yet - to create a new recipe, you must have a category to associate with it. Click the button below to create a category and get started saving your recipes!</p>

                <div className="deleteModalButtons">
                    {/* <button className="defaultButton buttonRed modalButton">Delete</button> */}
                    <Link to="/manage-categories" className="defaultButton buttonGreen modalButton noCategoryButton">Create Category</Link>
                </div>
            </div>
        </section>
    )
}