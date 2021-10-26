alert("Player 1's Turn") // as soon as the page is loaded it tells the players its the first players turn

document.getElementById("guess").disabled = true; //disables guess and pass buttons
document.getElementById("pass").disabled = true;

let gameClock = document.getElementById("timer"); //assigning variables to elements on the page
let quesTimer = document.getElementById("question-timer")
let quesCount = 5 + 1 //assigning clock timers and values they will start at
let gameCount = 300 + 1

countdown() //initiate countdown function on page load, which is the timer for the 1st round

function questionTimer() { //function for the question timer
    setTimeout(quesCounter, 1000) 

    function quesCounter() { //function for question timer countdown which includes formatting like a digital watch
        quesCount = quesCount - 1
        let min = Math.floor(quesCount / 60);
        let sec = (quesCount % 60)
        let left = `${min}`
        let right = `${sec}`
        let leftstring = left.padStart(2, '0')
        let rightstring = right.padStart(2, '0')

        quesTimer.textContent = leftstring + ':' + rightstring;

        if (quesCount <= 0) { // when quesCount gets to 0 changes clock numbers to text and disables guess and pass buttons
            quesCount = "Time's up, next player!"
            quesTimer.textContent = quesCount
            document.getElementById("guess").disabled = true;
            document.getElementById("pass").disabled = true;
        } else {
            setTimeout(quesCounter, 1000);
        }
    }
}

function countdown() { //function for the round timer
    setTimeout(gameCounter, 1000);

    function gameCounter() { //function for the game timer countdown which includes formatting like a digital watch
        gameCount = gameCount - 1;
        let min = Math.floor(gameCount / 60);
        let sec = (gameCount % 60)
        let left = `${min}`
        let right = `${sec}`
        let leftstring = left.padStart(2, '0')
        let rightstring = right.padStart(2, '0')

        gameClock.textContent = leftstring + ':' + rightstring;

        if (gameCount <= 0) { // when gameCount gets to 0 changes clock numbers to text telling you to go onto the next round
            gameCount = "Onto Double Jeopardy"
            gameClock.textContent = gameCount
        } else {
            setTimeout(gameCounter, 1000);
        }
    }
}

document.querySelectorAll("li").forEach(element => { //assigns the event listener 'click' to every element that has an "li" tag
    element.addEventListener('click', () => {
        element.style.fontSize = "100%"; //changes the fontsize upon click to 100% meaning that things will shrink to fit the container they are in
        element.style.textAlign ="center"; //centers the text content in the container it is in
        document.getElementById("guess").disabled = false; // enables the guess/pass button
        document.getElementById("pass").disabled = false;
        questionTimer() //initiates the question timer
        fetch("JEOPARDY_QUESTIONS1.json") //retrieves json file and creates object
        .then((result) => {
            return result.json()
        })
        .then((jsonObj) => {
            element.textContent = jsonObj[0].question //trying to figure out how to change the text of the element to be a question from the json file that will replicable for all 5 questions for each category
        })
    })
})

