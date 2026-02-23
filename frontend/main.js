const shortUrlform = document.getElementById("shortUrlForm")
const longUrlform = document.getElementById("longUrlForm")

const backendUrl = "";

function getShortFormSubmit() {
    shortUrlform.addEventListener("submit", e => {
        e.preventDefault();

        const longUrl = document.getElementById("longUrl").value;
        const shortUrl = createShortUrl(longUrl);

        const shortUrlResult = document.getElementById("shortUrlResult");

        let existingH3 = shortUrlResult.querySelector("h3");

        if (existingH3) {
            existingH3.innerText = shortUrl;
        } else {
            const result = document.createElement("h3");
            result.innerText = shortUrl;
            shortUrlResult.appendChild(result);
        }

        shortUrlResult.classList.remove("d-none");
    });
}

async function createShortUrl(longUrl) {
    
}