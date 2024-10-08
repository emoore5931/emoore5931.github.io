/*
  Name: Ethan Moore
  Date: 10.08.2024
  CSC 372-01

  Scripting for index.html, defines the functions behind the rock, paper, scissors game.
*/

"use strict";
const COM_CHOICE_TIME = 3;
const CHOICES = ["rock", "paper", "scissors"];

var choiceRefs = document.getElementById("choiceContainer").children;
var comChoiceRef = document.getElementById("comChoice");
var resultsTextRef = document.getElementById("resultsText");
var selected = undefined;
var comSelectionChanger;
var selectChoiceLock = false;

for (let i = 0; i < choiceRefs.length; i++) {
    choiceRefs.item(i).addEventListener("click", selectChoice);
}

/**
 * 
 * @param {Event} e 
 */
function selectChoice(e) {
    if (!selectChoiceLock) {
        selectChoiceLock = true;

        if (selected != undefined) {
            selected.classList.remove("selected");
        }
        selected = e.currentTarget;
        selected.classList.add("selected");
        shuffleChoices();
    }
}

/**
 * Defines the outcome of the game based on the players choice and the computers choice.
 */
function gameOutcome() {
    let comChoice = comChoiceRef.getAttribute("choice");
    let playerChoice = selected.getAttribute("id");

    if (playerChoice == "rock") {
        switch (comChoice) {
            case "rock":
                handleOutcome("draw");
                break;
            case "paper":
                handleOutcome("lose");
                break;
            case "scissors":
                handleOutcome("win");
                break;
        }
    } else if (playerChoice == "paper") {
        switch (comChoice) {
            case "rock":
                handleOutcome("win");
                break;
            case "paper":
                handleOutcome("draw");
                break;
            case "scissors":
                handleOutcome("lose");
                break;
        }
    } else if (playerChoice == "scissors") {
        switch (comChoice) {
            case "rock":
                handleOutcome("lose");
                break;
            case "paper":
                handleOutcome("win");
                break;
            case "scissors":
                handleOutcome("draw");
                break;
        }
    }
}

/**
 * Helper method for {@link gameOutcome}
 * @param {string} gameOutcome 
 */
function handleOutcome(gameOutcome) {
    switch (gameOutcome) {
        case "win": 
            resultsTextRef.textContent = "Congratulations, you have won! Select an option to play again";
            break;
        case "lose":
            resultsTextRef.textContent = "The computer wins, select an option to play again";
            break;
        default: 
            resultsTextRef.textContent = "The game is a draw, select an option to play again";
    }
}

function shuffleChoices() {
    comSelectionChanger = setInterval(changeComSelection, 500);
    setTimeout(clearInterval, COM_CHOICE_TIME * 1000, comSelectionChanger);
    setTimeout(() => {selectChoiceLock = false; gameOutcome()}, COM_CHOICE_TIME * 1000);
    resultsTextRef.textContent = "The computer is choosing..."
}

function changeComSelection() {
    let newCoiceNum = Math.floor(Math.random() * 3);
    comChoiceRef.setAttribute("choice", CHOICES[newCoiceNum]);
    comChoiceRef.setAttribute("src", choiceRefs.item(newCoiceNum).getAttribute("src"));
}