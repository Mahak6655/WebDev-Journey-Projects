// Select the button element from the page
let btn = document.querySelector('button');

// Add a click event listener to the button
btn.addEventListener("click", function () {

    // Select the heading element
    let h3 = document.querySelector('h3');

    // Display the generated RGB color value in the heading
    h3.innerText = getRandomColor();

    // Change the heading text color
    h3.style.color = getRandomColor();

    // Select the color preview box
    let div = document.querySelector('div');

    // Change the background color of the box
    div.style.background = getRandomColor();
});

// Function to generate a random RGB color
function getRandomColor() {

    // Generate random value for Red (0–254)
    let red = Math.floor(Math.random() * 255);

    // Generate random value for Green (0–254)
    let green = Math.floor(Math.random() * 255);

    // Generate random value for Blue (0–254)
    let blue = Math.floor(Math.random() * 255);

    // Return RGB color as a string
    return `rgb(${red}, ${green}, ${blue})`;
}



 