/**
 * Add a new ingredient to the ingredients list
 * in the create and update recipe components
 */
export const addIngredientInput = (event) => {
    event.preventDefault();

    const ingredientList = document.getElementById("ingredients");

    const newInput = document.createElement("input");
    newInput.setAttribute("name", "ingredient");

    ingredientList.appendChild(newInput);
}

/**
 * Add a new instruction to the instructions list
 * in the create and update recipe components
 */
export const addInstructionInput = (event) => {
    event.preventDefault();

    const instructionList = document.getElementById("instructions");

    const newInput = document.createElement("input");
    newInput.setAttribute("name", "instruction");

    instructionList.appendChild(newInput);
}