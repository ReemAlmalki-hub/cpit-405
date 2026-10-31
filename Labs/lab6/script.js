// 1. DOM Elements

const likeButton = document.getElementById("like-button");
const dislikeButton = document.getElementById("dislike-button");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");

const commentInput = document.getElementById("comment-input");
const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");
const commentsSection = document.getElementById("comments-section");
const resetButton = document.getElementById("reset-button");

// 2. Initialize Variables
let likes = 0;
let dislikes = 0;
let comments = [];

// 3. Cookie Functions
function setCookie(name, value, days) {
    let date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    let expires = "expires=" + date.toUTCString();

    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}


function getCookie(name) {
    let cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        let [key, value] = cookie.trim().split("=");

        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


// 4. Load Data from Cookies
let savedVote = getCookie("vote");

if (savedVote === "like") {
    likes = 1;
} 
else if (savedVote === "dislike") {
    dislikes = 1;
}

let savedComments = getCookie("comments");

if (savedComments !== "") {
    comments = JSON.parse(savedComments);
}

// 5. Update UI
function updateUI() {

    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    commentsSection.innerHTML = "";

    comments.forEach(function(comment) {
        let p = document.createElement("p");
        p.textContent = comment;
        commentsSection.appendChild(p);
    });
}

updateUI();


// 6. Handle Like Button
likeButton.addEventListener("click", function() {

    let savedVote = getCookie("vote");

    if (savedVote === "") {
        likes++;
        setCookie("vote", "like", 7);
        updateUI();
    }

});


// 7. Handle Dislike Button
dislikeButton.addEventListener("click", function() {

    let savedVote = getCookie("vote");

    if (savedVote === "") {
        dislikes++;
        setCookie("vote", "dislike", 7);
        updateUI();
    }

});


// 8. Handle Comment Submission
submitButton.addEventListener("click", function() {

    let savedComment = getCookie("comments");
    let commentText = commentInput.value.trim();

    if (savedComment === "" && commentText !== "") {
        comments.push(commentText);
        setCookie("comments", JSON.stringify(comments), 7);
        commentInput.value = "";
        updateUI();
    }

});

// 9. Clear Comments
clearButton.addEventListener("click", function() {
    deleteCookie("comments");
    comments = [];
    commentInput.value = "";
    updateUI();
});

// 10. Reset Functionality
resetButton.addEventListener("click", function() {

    deleteCookie("vote");
    deleteCookie("comments");

    likes = 0;
    dislikes = 0;
    comments = [];
    commentInput.value = "";
    updateUI();

});