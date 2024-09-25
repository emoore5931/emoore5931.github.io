"use strict";

/*
  Name: Ethan Moore 
  Date: 09.25.2024
  CSC 372-01

  This file defines all scripting for meal-plan.html.
*/

//Nav button functionality
document.getElementById("homeBttn").addEventListener("click", () => {window.location.href = "index.html"});
document.getElementById("mealPlanBttn").addEventListener("click", () => {window.location.href = "meal-plan.html"});

initializeButtons();

//meal variables
let mealCount = new Map();
let totalCost = 0;
let mealsContainerRef = document.getElementById("meals");

/**
 * Adds meal to meal plan.
 * @param {Event} event
 */
function addMeal(event) {
    let mealNum = event.currentTarget.id.slice(3);
    let mealValRef = document.getElementById("meal" + mealNum + "Val");
    let mealNameRef = document.getElementById("meal" + mealNum + "Name");
    let mealValString = mealValRef.textContent.slice(1);
    let mealCost = Number.parseFloat(mealValString);

    addToMealPlan(mealNum, mealNameRef.textContent, mealValRef.textContent);

    totalCost += mealCost;
    updateTotal();
}

/**
 * Helper method for {@link addMeal}.
 * @param {number} mealNum 
 * @param {string} mealName 
 * @param {string} mealVal 
 */
function addToMealPlan(mealNum, mealName, mealVal) {
    if (mealCount.has(mealNum)) {
        mealCount.set(mealNum, mealCount.get(mealNum) + 1);
    } else {
        mealCount.set(mealNum, 1);
    }

    buildMealElement(mealNum, mealName, mealVal);
}

/**
 * Helper method for {@link addToMealPlan} that formats and displays the meal element in
 * the meal plan.
 * @param {number} mealNum 
 * @param {string} mealName 
 * @param {string} mealVal 
 */
function buildMealElement(mealNum, mealName, mealVal) {
    if (mealCount.get(mealNum) > 1) {
        document.getElementById("planMealCount" + mealNum).textContent = mealCount.get(mealNum);    
    } else {
        let mealContainerRef = document.createElement("div");
        mealContainerRef.id = "planMeal" + mealNum;

        let planMealInfoRef = document.createElement("p");
        planMealInfoRef.textContent = `${mealName}: ${mealVal} * `;

        let planMealCountRef = document.createElement("span");
        planMealCountRef.id = "planMealCount" + mealNum;
        planMealCountRef.textContent = mealCount.get(mealNum);

        planMealInfoRef.appendChild(planMealCountRef);
        mealContainerRef.appendChild(planMealInfoRef);
        mealsContainerRef.appendChild(mealContainerRef);
    }
    
}

/**
 * Helper method for {@link addMeal} that updates the total in the meal plan.
 */
function updateTotal() {
    let newCostString = "0.00";
    let totalCostRef = document.getElementById("totalAmount");

    if (totalCost % 1 > 0) {
        let dollars = Math.floor(totalCost);
        let cents = Math.ceil((totalCost % 1) * 100) / 100; 

        newCostString = "$" + dollars.toString() + "." + cents.toString();
    } else {
        newCostString = "$" + totalCost.toString() + ".00"
    }

    totalCostRef.textContent = newCostString;
}

/**
 * Initializes add button functionality
 */
function initializeButtons() {
    let bttns = document.querySelectorAll(".featured-dish > button");
    bttns.forEach((bttn) => {
        bttn.addEventListener("click", addMeal);
    });
}