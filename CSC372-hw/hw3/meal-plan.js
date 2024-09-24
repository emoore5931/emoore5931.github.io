"use strict";

document.getElementById("homeBttn").addEventListener("click", () => {window.location.href = "index.html"});
document.getElementById("mealPlanBttn").addEventListener("click", () => {window.location.href = "meal-plan.html"});

let mealCount = new Map();
let totalCost = 0;

function addMeal(mealNum) {
    let mealValRef = document.getElementById("meal" + mealNum + "Val");
    let mealName = document.getElementById("meal" + mealNum + "Name");
    let mealValString = mealValRef.textContent.slice(1);
    let mealCost = Number.parseFloat(mealValString);

    addToMealPlan(mealNum, mealName, mealValRef.textContent);

    totalCost += mealCost;
    updateTotal();
}

function addToMealPlan(mealNum, mealName, mealVal) {
    if (mealCount.has(mealNum)) {
        mealCount.set(mealNum, mealCount.get(mealNum)++);
    } else {
        mealCount.set(mealNum, 1);
    }

    //Todo
}

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