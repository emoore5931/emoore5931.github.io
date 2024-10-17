"use strict";
const FETCH_REPO_URI = "https://api.github.com/users/$/repos";
const DEFAULT_USER = "emoore5931";
const CARD_TEMPLATE = document.querySelector("#githubCard");
const GAL_ID_REF = document.getElementById("galleryUserID");

let requestUser = DEFAULT_USER;
GAL_ID_REF.textContent = requestUser;

//Test run
let sampleCard = new GithubCard(
    "Example Card",
    "This is a sample description for a sample card.",
    9999,
    9999,
    "Javascript, HTML, CSS",
    "01/01/01",
    "01/01/01",
    "https://www.google.com"
);

for (let i=0; i <= 10; i++)
    displayCard(sampleCard, document.getElementById("container1"));

/**
 * 
 * @param {string} name 
 * @param {string} desc 
 * @param {number} numWatchers 
 * @param {number} numCommits 
 * @param {string} langs 
 * @param {string} createDate 
 * @param {string} updateDate 
 * @param {string} repoLink 
 */
function GithubCard(name, desc, numWatchers, numCommits, langs, createDate, updateDate, repoLink) {
    this.name = name;
    this.description = desc;
    this.numWatchers = numWatchers;
    this.numCommits = numCommits;
    this.languages = langs;
    this.creationDate = createDate;
    this.lastUpdated = updateDate;
    this.repoLink = repoLink;
}

/**
 * 
 * @param {GithubCard} githubCard 
 * @param {HTMLElement} containerRef
 */
function displayCard(githubCard, containerRef) {
    let card = CARD_TEMPLATE.content.cloneNode(true);

    let repoNameRef = card.querySelector(".github-card-name");
    repoNameRef.textContent = githubCard.name;
    repoNameRef.addEventListener("click", () => {window.location.href = githubCard.repoLink});
    card.querySelector(".github-card-num-watchers").textContent = githubCard.numWatchers;
    card.querySelector(".github-card-num-commits").textContent = githubCard.numWatchers;
    card.querySelector(".github-card-desc").textContent = githubCard.description;
    card.querySelector(".github-card-langs").textContent = githubCard.languages;
    card.querySelector(".github-card-update-date").textContent = githubCard.lastUpdated;
    card.querySelector(".github-card-create-date").textContent =  githubCard.creationDate;

    containerRef.appendChild(card);
}