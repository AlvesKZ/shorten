const shortUrlForm = document.getElementById("shortUrlForm");
const longUrlForm = document.getElementById("longUrlForm");

const backendUrl = "http://localhost:3000"; 

function showResult(containerId, text) {
  const container = document.getElementById(containerId);

  let existingH3 = container.querySelector("h3");

  if (!existingH3) {
    existingH3 = document.createElement("h3");
    container.appendChild(existingH3);
  }

  existingH3.innerText = text;
  container.classList.remove("d-none");
}

function handleFormSubmit(form, inputName, resultContainerId, callback) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const value = e.target.elements[inputName].value.trim();

    if (!value) return;

    const result = await callback(value);

    showResult(resultContainerId, result);

    form.reset(); 
  });
}

handleFormSubmit(shortUrlForm, "longUrl", "shortUrlResult", createShortUrl);
handleFormSubmit(longUrlForm, "shortUrl", "longUrlResult", getLongUrl);

async function createShortUrl(longUrl) {
  try {
    const response = await fetch(`${backendUrl}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl }),
    });

    if (!response.ok) throw new Error("Failed to shorten URL");

    const data = await response.json();

    return data.url ?? "Invalid response";
  } catch (error) {
    console.error(error);
    return "Error creating short URL";
  }
}

async function getLongUrl(shortUrl) {
  const shortUrlCode = shortUrl.includes("/")
    ? shortUrl.match(/\/([^\/]+)$/)?.[1]
    : shortUrl;

  if (!shortUrlCode) return "Invalid short URL";

  try {
    const response = await fetch(`${backendUrl}/${shortUrlCode}`);

    if (!response.ok) throw new Error("Failed to fetch long URL");

    const data = await response.json();

    return data.url ?? "URL not found";
  } catch (error) {
    console.error(error);
    return "Error fetching original URL";
  }
}