"use strict";

/*
  Name: Ethan Moore 
  Date: 09.25.2024
  CSC 372-01

  This file defines all scripting for index.html.
*/

//Nav button functionality
document.getElementById("homeBttn").addEventListener("click", () => {window.location.href = "index.html"});
document.getElementById("mealPlanBttn").addEventListener("click", () => {window.location.href = "meal-plan.html"});

//get section references
let asideSections = document.querySelectorAll("aside > section");
let articleSections = document.querySelectorAll("article > section");

initializeDishImg();

initializeLocationSections();


/**
 * Properly extends and shows the selected location. 
 * @param {Event} event 
 */
function extendSection(event) {
    let targetId = new String(event.currentTarget.id);
    let idNum = Number.parseInt(targetId.slice(1));

    let targetArticleSec = articleSections.item(idNum);
    if (targetArticleSec.classList.contains("extend")) {
        targetArticleSec.classList.remove("extend");
    } else {
        document.querySelectorAll(".extend").forEach((el) => {el.classList.remove("extend")});
        targetArticleSec.classList.add("extend");
    }
}

/**
 * Initializes Dish Image functionality in index.html.
 */
function initializeDishImg() {
    document.querySelectorAll(".dish-img-gallery > img").forEach(
        (img) => {
            img.addEventListener("click", (event) => {
                document.querySelectorAll(".dish-desc-display").forEach((el) => {el.classList.remove("dish-desc-display")});
                document.querySelectorAll("img.selected").forEach((el) => {el.classList.remove("selected")});
                let targetId = event.currentTarget.id;
                document.getElementById(targetId + "Desc").classList.add("dish-desc-display");
                document.getElementById(targetId).classList.add("selected");
            });
        }
    );
}


/**
 * Initializes functionality for location sections.
 */
function initializeLocationSections() {
    for (let i = 0; i < asideSections.length; i++) {
        let section = asideSections[i];
    
        section.addEventListener("click", (event) => {
            extendSection(event);
        });
        section.setAttribute("id", "s" + i);
    };
}