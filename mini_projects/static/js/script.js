// Determine if the given year is leap year
function isLeap(year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false;
    if (year % 4 == 0) return true;
    else return false;
}

// Challenge 1: Your Age in Days
function ageInDays() {
    reset();
    const chart = { 1: 31, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
    console.log(chart[1]);
    let ageInDayss = 0;
    var birthYear = prompt('What year were you born?');
    var birthMonth = prompt('What month were you born?');
    var birthDate = prompt('What date were your born?');
    let curYear = new Date().getFullYear();
    let curMonth = new Date().getMonth();
    let curDate = new Date().getDate();
    let leapYear = isLeap(birthYear);
    for (var i = 0; birthMonth <= 12; i++) {
        if (i == 0) {
            if (birthMonth == 2) {
                ageInDayss += learYear ? 29 - birthDate : 28 - birthDate;
            } else {
                ageInDayss += chart[birthMonth] - birthDate;
            }
        } else {
            if (birthMonth == 2) {
                ageInDayss += leapYear ? 29 : 28;
            } else {
                ageInDayss += chart[birthMonth];
            }
        }
        birthMonth++;
    }
    birthYear++;
    while (birthYear < curYear) {
        ageInDayss += isLeap(birthYear) ? 366 : 365;
        birthYear++;
    }
    for (var i = 1; i < curMonth; i++) {
        if (i == 2) {
            ageInDayss += isLeap(curYear) ? 29 : 28;
        } else {
            ageInDays += chart[i];
        }
    }
    ageInDayss += curDate;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').style.display = "flex";
    document.getElementById('flex-box-result').appendChild(h1);
    /*if (ageInDayss <= 0) {
        alert('Please enter a valid year!');
    }*/
    //console.log(ageInDayss)
}

function reset() {
    // reset is to remove the text generated by the ageInDays() function
    try {
        document.getElementById('ageInDays').remove();
        document.getElementById('flex-box-result').style.display = "none";
    } catch (err) {
        console.log(err.message);
        return;
    }
    console.log('Text is successfully removed!');
}

// Challenge 2
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.alt = "cat gif";
    div.style.display = "flex";
    div.appendChild(image);
}

function resetCat() {
    var div = document.getElementById('flex-cat-gen');
    var counter = div.childNodes.length;
    let i = 0;
    while (i < counter) {
        div.removeChild(div.childNodes[0]);
        i++;
    }
    div.style.display = "none";
    console.log('Cats are successfully removed!');
}

// Challenge 3

function rpsGame(choice) { //choice is the image you clicked on
    let userChoice = choice.id;
    var botChoice = botChoose();
    console.log('User chooses ', userChoice);
    console.log('Conputer chooses ', botChoice);
    // result shows whether user wins or not
    result = decideWinner(userChoice, botChoice); // 2 won, 1 tie, 0, lose
    console.log(result)
    message = finalMessage(result); // return a object [message, color]
    console.log(message);
    rpsShow(userChoice, botChoice, message); // update the front end
}

function botChoose() {
    let choice = Math.floor(Math.random() * 3);
    let choices = ["rock", "paper", "scissors"];
    return choices[choice];
}

function decideWinner(userChoice, botChoice) {
    // for user: 2 means win, 1 means tie, 0 means lose
    const charts = {
        "rock": { "scissors": 2, "rock": 1, "paper": 0 },
        "paper": { "rock": 2, "paper": 1, "scissors": 0 },
        "scissors": { "paper": 2, "scissors": 1, "rock": 0 }
    }
    return charts[userChoice][botChoice];
}

function finalMessage(result) {
    if (result === 2) {
        return ['You won!', 'Green'];
    } else if (result === 1) {
        return ['You tied!', 'Yellow'];
    } else if (result == 0) {
        return ['You lost!', 'Red'];
    }
    // if result is invalid
    return ['Error!!!', 'Red']
}

function rpsShow(userChoice, botChoice, message) {
    // 0 index of message shows the message that needs to be
    // displayed, and index 1 shows the color of the message
    let displayMessage = message[0];
    let displayColor = message[1];
    const charts = {
        "rock": document.getElementById('rock').src,
        "paper": document.getElementById('paper').src,
        "scissors": document.getElementById('scissors').src
    }
    // remove all thress images and inserts new images
    let divs = document.getElementById('flex-box-rps-div');
    let totalLength = divs.childNodes.length;
    for (var i = 0; i < totalLength; i++) {
        divs.removeChild(divs.childNodes[0]);
    }

    let parentDiv = document.getElementById('flex-box-rps-div');
    parentDiv.classList.remove('image-rps');

    let humanDiv = document.createElement('div');
    let image1 = document.createElement('img');
    image1.src = charts[userChoice];
    image1.height = 150;
    image1.width = 150;
    console.log(image1);
    humanDiv.appendChild(image1);
    parentDiv.appendChild(humanDiv);

    let messageDiv = document.createElement('div');
    let messageWrite = document.createElement('h1');
    messageWrite.appendChild(document.createTextNode(displayMessage));
    messageWrite.style.color = displayColor;
    messageWrite.style.padding = "30px";
    messageWrite.style.fontSize = "60px";
    messageDiv.appendChild(messageWrite);
    parentDiv.appendChild(messageDiv);

    let botDiv = document.createElement('div');
    let image2 = document.createElement('img');
    image2.src = charts[botChoice];
    image2.height = 150;
    image2.width = 150;
    console.log(image2);
    botDiv.appendChild(image2);
    parentDiv.appendChild(botDiv);

    let resetBtn = document.createElement('button');
    let curDiv = document.getElementById('reset-div');
    resetBtn.id = "reset-btn";
    resetBtn.className = "btn btn-success"
    resetBtn.setAttribute("onclick", "rpsReset()");
    resetBtn.textContent = "Play Again";
    curDiv.appendChild(resetBtn);
    curDiv.style.display = "flex";
}

function addGameImage(idName, div) {
    let image = document.createElement('img');
    let className = 'image-rps';
    let srcName = '../static/images/' + idName + '.png';
    let height = 150;
    let width = 150;
    image.className = className;
    image.id = idName;
    image.src = srcName;
    image.height = height;
    image.width = width;
    image.alt = idName + '-image';
    image.setAttribute("onclick", "rpsGame(this)");
    div.appendChild(image);
}

function rpsReset() {
    let choices = ["rock", "paper", "scissors"];
    let resetDiv = document.getElementById('reset-div');
    resetDiv.removeChild(document.getElementById('reset-btn'));
    resetDiv.style.display = "none";
    let gameDiv = document.getElementById('flex-box-rps-div');
    let totalChild = gameDiv.childNodes.length;
    for (var i = 0; i < totalChild; i++) {
        gameDiv.removeChild(gameDiv.childNodes[0]);
    }
    for (var i = 0; i < choices.length; i++) {
        addGameImage(choices[i], gameDiv);
    }
}

// Challenge 4: Change the Color of All Buttons

let allButtons = document.getElementsByTagName('button');
const origButtonColors = []
for (let i = 0; i < allButtons.length; i++) {
    origButtonColors.push(allButtons[i].className);
}

function buttonColorChange(option) {
    let targetColor = "btn btn-black";
    // to get the selected value of <select> use .value method
    switch (option.value) {
        case "blue":
            targetColor = "btn btn-primary";
            break;
        case "red":
            targetColor = "btn btn-danger";
            break;
        case "yellow":
            targetColor = "btn btn-warning";
            break;
        case "green":
            targetColor = "btn btn-success";
            break;
        case "random":
            buttonColorRandom();
            option.value = "choose";
            return;
        case "reset":
            buttonColorReset();
            option.value = "choose";
            return;
    }
    buttonColorSet(targetColor);
    option.value = "choose";
}

function buttonColorSet(targetColor) {
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i].className != targetColor) {
            allButtons[i].className = targetColor;
        }
    }
}

function buttonColorRandom() {
    let totalChoices = ["btn btn-primary", "btn btn-danger",
        "btn btn-warning", "btn btn-success"];
    for (let i = 0; i < allButtons.length; i++) {
        let randChoice = totalChoices[Math.floor(Math.random() * 4)];
        if (allButtons[i].className != randChoice) {
            allButtons[i].className = randChoice;
        }
    }
}

function buttonColorReset() {
    console.log('reset is called');
    console.log(origButtonColors);
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].className = origButtonColors[i];
    }
}

// Challenge 5: Blackjack

let blackjackGame = {
    // scoreSpan is the id used to retrieve the span value (i.e. the score)
    // div is the class name used to retrieve the div it belongs to
    // both have # since we are using querySelector here
    'user': { 'scoreSpan': '#user-blackjack-score', 'div': '#user-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isHit': false,
    'isStand': false,
    'turnsOver': false // indicate whether a new game should be started
}

// the paths here are relative to the index.html file

const userStatus = blackjackGame['user'];
const dealerStatus = blackjackGame['dealer'];

const hitSound = new Audio('../static/sounds/swish.m4a');
const winSound = new Audio('../static/sounds/cash.mp3');
const lossSound = new Audio('../static/sounds/aww.mp3');

function init() {
    document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);
    document.querySelector('#blackjack-stand-btn').addEventListener('click', blackjackStand);
    document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);
}

function pick() {
    return blackjackGame['cards'][Math.floor(Math.random() * 13)];
}

function showCard(pickedCard, activePlayerStatus) {
    // prevent cards poping up when score exceeds 21
    if (activePlayerStatus['score'] < 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `../static/images/${pickedCard}.png`;
        document.querySelector(activePlayerStatus['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        if (userStatus['score'] == 21) {
            return;
        }
        let pickedCard = pick();
        showCard(pickedCard, userStatus);
        updateScore(pickedCard, userStatus);
        showScore(userStatus);
        console.log(userStatus['score']);
        blackjackGame['isHit'] = true;
    }
}

function blackjackDeal() {
    // reset both scores to zero, and remove all cards
    // simply use images under flew-blackjack-row-1 division since 
    // only card images exist, no other images in this division
    // need to be more specific if there are other images in this 
    // division since we only want card images removed
    if (blackjackGame['turnsOver'] === true) {
        let images = document.querySelector('.flex-blackjack-row-1').querySelectorAll('img');
        for (let i = 0; i < images.length; i++) {
            images[i].remove();
        }
        userStatus['score'] = 0;
        document.querySelector(userStatus['scoreSpan']).textContent = userStatus['score'];
        document.querySelector(userStatus['scoreSpan']).style.removeProperty('color');
        dealerStatus['score'] = 0;
        document.querySelector(dealerStatus['scoreSpan']).textContent = dealerStatus['score'];
        document.querySelector(dealerStatus['scoreSpan']).style.removeProperty('color');

        document.querySelector('#blackjack-result').textContent = 'Let\'s play!';
        document.querySelector('#blackjack-result').style.color = "antiquewhite";

        blackjackGame['isHit'] = false;
        blackjackGame['isStand'] = false;
        blackjackGame['turnsOver'] = false;
        //console.log(blackjackGame['turnsOver']);
    }
}

// need a function auto the bot's move and put in 
// blackjackStand
function updateScore(card, activePlayerStatus) {
    let ace1 = 1;
    let ace2 = 11;
    if (card != 'A') {
        activePlayerStatus['score'] += blackjackGame['cardsMap'][card];
    } else {
        if (activePlayerStatus['score'] + ace2 > 21) {
            activePlayerStatus['score'] += ace1;
        } else {
            activePlayerStatus['score'] += ace2;
        }
    }
}

function showScore(activePlayerStatus) {
    // showScore only functions as showing current score
    // decide whether or not the user win will be determined in other functions
    if (activePlayerStatus['score'] > 21) {
        document.querySelector(activePlayerStatus['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayerStatus['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayerStatus['scoreSpan']).textContent = activePlayerStatus['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// dealer logic here
async function blackjackStand() {
    // showCard(dealerStatus) should be here
    // make sure dealer is working. use while loop to test it
    // need further logic
    if (blackjackGame['isStand'] === false && blackjackGame['isHit'] === true) {
        blackjackGame['isStand'] = true;
        while (dealerStatus['score'] <= 15) {
            let pickedCard = pick();
            showCard(pickedCard, dealerStatus);
            updateScore(pickedCard, dealerStatus)
            showScore(dealerStatus);
            await sleep(1000);
        }
        blackjackGame['turnsOver'] = true;
        showFinalResult();
    }
}

// decide winner
function computeWinner() {
    let winner;
    let userScore = userStatus['score'];
    let dealerScore = dealerStatus['score'];
    if (userScore <= 21) {
        if (dealerScore > 21 || dealerScore < userScore) {
            winner = userStatus;
            blackjackGame['wins']++;
            console.log('user won!');
        } else if (dealerScore > userScore) {
            winner = dealerStatus;
            blackjackGame['losses']++;
            console.log('dealer won!');
        } else {
            winner = null;
            blackjackGame['draws']++;
            console.log('draw!');
        }
    } else {
        if (dealerScore <= 21) {
            winner = dealerStatus;
            blackjackGame['losses']++;
            console.log('dealer won!');
        } else {
            winner = null;
            blackjackGame['draws']++;
            console.log('draw!');
        }
    }
    return winner;
}

function showFinalResult() {
    let winner = computeWinner();
    let message, color;
    if (winner != null) {
        if (winner['div'] === '#user-box') {
            message = 'You won!';
            color = 'green';
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            winSound.play();
        } else {
            message = 'You lost!';
            color = 'red';
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            lossSound.play();
        }
    } else {
        message = 'Draw!';
        color = 'Orange';
        document.querySelector('#draws').textContent = blackjackGame['draws'];
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = color;
}

