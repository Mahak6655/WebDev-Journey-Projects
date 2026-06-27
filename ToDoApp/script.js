
// Select input field
let input = document.querySelector('input');

// Select unordered list
let ul = document.querySelector('ul');

// Select Add Task button
let btn = document.querySelector("button");

// Add new task when button is clicked
btn.addEventListener("click", function () {

    // Create a new list item
    let listItem = document.createElement("li");

    // Set task text from input field
    listItem.innerText = input.value;

    // Create delete button for the task
    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";

    // Add delete class for styling
    delBtn.classList.add("delete");

    // Add delete button inside the list item
    listItem.appendChild(delBtn);

    // Add list item to the task list
    ul.appendChild(listItem);

    // Print task in console
    console.log(input.value);

    // Clear input field after adding task
    input.value = "";
});

// Event Delegation
// Handles delete functionality for both existing
// and newly created delete buttons
ul.addEventListener("click", function (event) {

    // Check if clicked element is a button
    if (event.target.nodeName == "BUTTON") {

        // Get the parent list item
        let litem = event.target.parentElement;

        // Remove the task
        litem.remove();
    }
});
