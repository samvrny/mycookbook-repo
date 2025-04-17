export default function Delete({ setIsOpen, recipeID, recipeName }) {

    console.log(recipeID);
    console.log(recipeName);

    return (
        <section id="deleteModal" className="darkBG">
            <div className="deleteModalContent">
                <h2>Delete This Recipe</h2>

                <p>This is some content to throw inside of here</p>

                <p>{recipeID}</p>
                <p>{recipeName}</p>
                

                <div className="recipeButtons">
                    <button className="recipeUpdateButton" onClick={() => setIsOpen(false)}>Go Back</button>
                    <button className="recipeDeleteButton">Delete</button>
                </div>
            </div>
        </section>
    )

}