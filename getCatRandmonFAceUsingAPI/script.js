
// API URL to fetch a random cat fact
let url = "https://catfact.ninja/fact";

// Function to fetch a random cat fact using Axios
async function getFact() {

    try {

        // Send GET request to the API
        const res = await axios.get(url);

        // Return only the cat fact
        return res.data.fact;

    } catch (err) {

        // Return a message if the API request fails
        return "No fact found";
    }
}

// Select the button element
let btn = document.querySelector("button");

// Run this function whenever the button is clicked
btn.addEventListener("click", async () => {

    let p = document.querySelector("#res");

    // Show loading message while fetching data
    p.innerText = "🐱 Fetching a new cat fact...";

    // Fetch the cat fact
    let fact = await getFact();

    // Display the fetched fact
    p.innerText = fact;
});

