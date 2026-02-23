const shortUrlForm = document.getElementById("shortUrlForm");
const longUrlForm = document.getElementById("longUrlForm");

const backendUrl = "";


function showResult(containerId, text) {
    const container = document.getElementById(containerId);

    let existingH3 = container.querySelector("h3");

    if (existingH3) {
        existingH3.innerText = text;
    } else {
        const result = document.createElement("h3");
        result.innerText = text;
        container.appendChild(result);
    }

    container.classList.remove("d-none");
}


function handleFormSubmit(form, inputName, resultContainerId, callback) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const value = e.target.elements[inputName].value;

        const result = callback(value);

        showResult(resultContainerId, result);
    });
}

handleFormSubmit(shortUrlForm, "longUrl", "shortUrlResult", createShortUrl);
handleFormSubmit(longUrlForm, "shortUrl", "longUrlResult", getLongUrl);



function createShortUrl(longUrl) {
    return "short.ly/abc123";
}

function getLongUrl(shortUrl) {
    return "https://example.com/very/long/url";
}