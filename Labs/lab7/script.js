
// DOM Elements
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

const xhrButton = document.getElementById("xhrButton");
const promiseButton = document.getElementById("promiseButton");
const asyncButton = document.getElementById("asyncButton");

// Unsplash API
const ACCESS_KEY = "zve-qF4DXlfvMySxPmvVMxKXpEASACb60b6VK3xM2PA";

const API_URL = "https://api.unsplash.com/search/photos?query=";


// First Method: XMLHttpRequest 
function searchUsingXHR() {

    const keyword = searchInput.value;

    if (!keyword) {return;}

    results.innerHTML = "";
    const xhr = new XMLHttpRequest();
    const url = API_URL + keyword;

    xhr.onreadystatechange = function() {

        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayImages(data.results);
        } else {
            console.log("Error:", xhr.status);
        }
    };
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization","Client-ID " + ACCESS_KEY);
    xhr.send();
}

// Second Method: Fetch API using Promises
function searchUsingPromises() {
    const keyword = searchInput.value;

    if (!keyword) {return;}

    results.innerHTML = "";
    const url = API_URL + keyword;

    fetch(url, {
        headers: {"Authorization": "Client-ID " + ACCESS_KEY}
    })

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        displayImages(data.results);
    })

    .catch(function(error) {
        console.log("Error:", error);
    });
}


//  Third Method: Fetch API using Async/Await
async function searchUsingAsync() {

    const keyword = searchInput.value;
    if (!keyword) {return;}
    results.innerHTML = "";
    const url = API_URL + keyword;

    try {
        const response = await fetch(url, {
            headers: {"Authorization": "Client-ID " + ACCESS_KEY}
        });
        const data = await response.json();
        displayImages(data.results);

    } catch (error) {
        console.log("Error:", error);
    }
}


// Display Images
function displayImages(photos) {

    results.innerHTML = "";

    photos.forEach(function(photo) {
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        const img = document.createElement("img");
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;

        img.addEventListener("mouseover", function() {
            img.style.transform = "scale(1.05)";
        });

        img.addEventListener("mouseout", function() {
            img.style.transform = "scale(1)";
        });

        imageContainer.appendChild(img);
        results.appendChild(imageContainer);
    });
}

// Keyboard Event
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchUsingAsync();
    }
});


asyncButton.addEventListener("click", searchUsingAsync);
xhrButton.addEventListener("click", searchUsingXHR);
promiseButton.addEventListener("click", searchUsingPromises);
