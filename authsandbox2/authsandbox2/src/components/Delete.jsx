export default function Delete({ setIsOpen }) {

    return (
        <section id="deleteModal">
            <h2>Delete This Recipe</h2>
            <p>This is some content to throw inside of here</p>

            <button onClick={() => setIsOpen(false)}></button>
        </section>
    )

}