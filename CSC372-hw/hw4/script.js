"use strict";
const COM_CHOICE_TIME = 4;
const CHOICES = ["rock", "paper", "scissors"];

var choiceRefs = document.getElementById("choiceContainer").children;
var comChoiceRef = document.getElementById("comChoice");
var resultsTextRef = document.getElementById("resultsText");
var selected = undefined;
var comSelectionChanger;

for (let i = 0; i < choiceRefs.length; i++) {
    choiceRefs.item(i).addEventListener("click", selectChoice);
}

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

/**
 * 
 * @param {Event} e 
 */
function selectChoice(e) {
    if (selected != undefined) {
        selected.classList.remove("selected");
    }
    selected = e.currentTarget;
    selected.classList.add("selected");
    shuffleChoices();
    gameOutcome();
}

function shuffleChoices() {
    comSelectionChanger = setInterval(changeComSelection, 100);
    setTimeout(clearInterval, COM_CHOICE_TIME * 1000, comSelectionChanger);
    setTimeout(gameOutcome, COM_CHOICE_TIME * 1000);
    resultsTextRef.textContent = "The computer is choosing..."
}

function changeComSelection() {
    let newCoiceNum = Math.floor(Math.random() * 3);
    comChoiceRef.setAttribute("choice", CHOICES[newCoiceNum]);
    comChoiceRef.setAttribute("src", choiceRefs.item(newCoiceNum).getAttribute("src"));
}