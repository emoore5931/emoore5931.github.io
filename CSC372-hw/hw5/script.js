"use strict";

/*
Name: Ethan Moore
Date: 10.22.2024
CSC 372-01

This file contains the scripting for index.html in homework 5, GitHub Gallery.
*/

const FETCH_REPO_URI = "https://api.github.com/users/$/repos";
const DEFAULT_USER = "emoore5931";
const CARD_TEMPLATE = document.querySelector("#githubCard");
const GAL_ID_REF = document.getElementById("galleryUserID");
const USER_ID_INPUT_REF = document.getElementById("userIDInput");

let requestUser = DEFAULT_USER;
GAL_ID_REF.textContent = requestUser;

getRepos(requestUser).then((repoArr) => {
    repoArr.forEach((repo) => {
        repoToCard(repo).then((card) => {
            displayCard(card, document.getElementById("container1"));
        });
    });
}, () => {console.error("Failed to get repos")});

document.getElementById("userIDSubmit").addEventListener("click", newGallery);

function newGallery() {
    const containerRef = document.getElementById("container1");
    const userID = USER_ID_INPUT_REF.value;

    //reset elements
    USER_ID_INPUT_REF.value = "";
    containerRef.innerHTML = "";

    if (userID.length > 0) {
        GAL_ID_REF.textContent = userID;

        getRepos(userID).then((repoArr) => {
            repoArr.forEach((repo) => {
                repoToCard(repo).then((card) => {
                    displayCard(card, containerRef);
                });
            });
        }, () => {console.error("Failed to get repos")});
    } else {
        GAL_ID_REF.textContent = "Enter a valid GitHub username to view owned repositories.";
    }
}

/**
 * Object that contains GitHub repo data to be displayed.
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
 * Builds a reactive card element to append to the specified container.
 * @param {GithubCard} githubCard github card object that contains all repo information
 * @param {HTMLElement} containerRef reference to the card container
 */
function displayCard(githubCard, containerRef) {
    let card = CARD_TEMPLATE.content.cloneNode(true);

    let repoNameRef = card.querySelector(".github-card-name");
    repoNameRef.textContent = githubCard.name;
    repoNameRef.addEventListener("click", () => {window.location.href = githubCard.repoLink});
    card.querySelector(".github-card-num-watchers").textContent = githubCard.numWatchers;
    card.querySelector(".github-card-num-commits").textContent = githubCard.numCommits;
    card.querySelector(".github-card-desc").textContent = githubCard.description;
    card.querySelector(".github-card-langs").textContent = githubCard.languages;
    card.querySelector(".github-card-update-date").textContent = githubCard.lastUpdated;
    card.querySelector(".github-card-create-date").textContent =  githubCard.creationDate;

    containerRef.appendChild(card);
}

/**
 * Fetches and returns objects containing GitHub repo data from a specified repo owner.
 * @param {string} ownerName repo owner GitHub username
 * @returns {Array} array of repo objects
 */
async function getRepos(ownerName) {
    const repoArr = [];

    await fetch(FETCH_REPO_URI.replace("$", ownerName), {
        method: "GET"
    })
    .then((response) => response.json()).then((data) => {
        data.forEach((repo) => {
            repoArr.push(repo);
        })
    });

    return repoArr;
}

/**
 * Function to convert a repo object to a card object.
 * @param {Object} repo repo object
 * @returns {GithubCard}
 */
async function repoToCard(repo) {
    let description;
    (repo.description == null || repo.description.length == 0) ? description = "No description" : description = repo.description;
    
    let language;
    (repo.language == null || repo.language.length == 0) ? language = "N/A" : language = repo.language;

    const createDate = new Date(repo.created_at).toLocaleString();
    const updateDate = new Date(repo.updated_at).toLocaleString();

    return new GithubCard(repo.name, description, repo.watchers_count, await getCommitCount(repo.commits_url), language, createDate, updateDate, repo.html_url);
}

/**
 * Helper method that fetches the commit count for {@link repoToCard}
 * @param {string} commitURL the URL pointing to GitHub API to pull commit data
 * @returns {*} the resulting number of commits
 */
function getCommitCount(commitURL) {
    return fetch(commitURL.replace("{/sha}", ""), {
        method: "GET"
    })
    .then((response) => {
        return response.json().then((commitArr) => {
            return commitArr.length;
        })
    });
}