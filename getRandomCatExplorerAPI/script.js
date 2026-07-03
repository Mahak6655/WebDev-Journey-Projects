// =========================
// Random Cat Explorer
// =========================

// API that gives random cat image
const imageURL = "https://api.thecatapi.com/v1/images/search";

// API that gives random cat fact
const factURL = "https://catfact.ninja/fact";

// Select HTML elements
const btn = document.getElementById("btn");
const catImage = document.getElementById("catImage");
const fact = document.getElementById("fact");

// When button is clicked
btn.addEventListener("click", async function () {

    // Show loading text
    btn.innerText = "Loading...";

    try {

        // Fetch image and fact together
        const imageResponse = await axios.get(imageURL);
        const factResponse = await axios.get(factURL);

        // Update image
        catImage.src = imageResponse.data[0].url;

        // Update fact
        fact.innerText = factResponse.data.fact;

    }
    catch (error) {

        console.log(error);

        fact.innerText = "Something went wrong. Please try again.";

    }

    // Reset button
    btn.innerText = "Generate Cat";

});