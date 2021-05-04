const readline = require("readline");
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Question Bank
var questionBank = [
    {
        question: " Which type of JavaScript language is ___ \n 1: Object-Oriented \n 2: Object-Based \n 3: Assembly-language \n 4:High-level",
        correctAnswer: 2
    },
    {
        question: " When interpreter encounters an empty statements, what it will do: \n 1: Shows a warning\n 2: Prompts to complete the statement \n 3: Throws an error \n 4: Ignores the statements",
        correctAnswer: 4
    },
    {
        question: "Which one of the following is the correct way for calling the JavaScript code? \n 1: Preprocessor \n 2: Triggering Event\n 3: RMI \n 4: Function/Method",
        correctAnswer: 4
    },
    {
        question: "Which of the following type of a variable is volatile? \n 1: Mutable variable \n 2: Dynamic variable\n 3: Volatile variable\n 4: Immutable variable",
        correctAnswer: 1
    },
    {
        question: "Which of the following option is used as hexadecimal literal beginning? \n 1: 00 \n 2: 0x\n 3: 0X\n 4: Both 0x and 0X",
        correctAnswer: 4
    },
    {
        question: " In the JavaScript, which one of the following is not considered as an error: \n 1: Syntax error \n 2: Missing of semicolons\n 3: Division by zero\n 4: Missing of Bracket",
        correctAnswer: 3
    },
    {
        question: "In JavaScript, what will be used for calling the function definition expression: \n 1: Function prototype \n 2: Function literal\n 3: Function calling \n 4: Function declaration",
        correctAnswer: 2
    },
    {
        question: "Which one of the following is an ternary operator: \n 1: ? \n 2: :\n 3: - \n 4: +",
        correctAnswer: 1
    },
    {
        question: "Which one of the following operator returns false if both values are equal? \n 1: !\n 2: !==\n 3: != \n 4: All of the above",
        correctAnswer: 3
    },
    {
        question: "Which one of the following is not a keyword: \n 1: if \n 2: with\n 3: debugger \n 4: use strict",
        correctAnswer: 4
    }
];


// //Timer 
async function timer() {
    console.log("\n \n <----------------------------------- LET'S START THE QUIZ------------------------------------>");
    console.log("\n There are 10 questions in this quiz . \n Press 1, 2, 3 or 4 to chose the option of the question \n Press 5 to get the current time left of your quiz .");
    const inputMsg = "\n How much totalTime will it take you to attempt this quiz (in minutes) : "
    const timeout = await getInput(inputMsg);

    let totalTime = timeout * 60;
    let minutes ,seconds,hours;

    setInterval(updateTimer, 1000);
    function updateTimer() {
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;
        hours = Math.floor(totalTime/3600);
        // console.log(minutes +" : "+seconds);
        totalTime--;
        if (minutes == 0 && seconds == 0 && hours==0) {
            console.log("\n <-------------- SORRY TIME UP -------------->");
            result();
            process.exit();
        }
    }


    // generating non repeating random numbers

    let uniqueRandArr = [];
    let randNum;
    for (let i = 0; i < questionBank.length; i++) {
        function randomNumber() {
            randNum = Math.floor(Math.random() * questionBank.length);
            if (uniqueRandArr.includes(randNum)) {
                randomNumber();
            }
            else {
                uniqueRandArr.push(randNum);
            }
        }
        randomNumber();
    }
    // console.log(uniqueRandArr)

    function getInput(ipt) {
        return new Promise(resolve => {

            read.question(ipt, (input) => {
                resolve(+input);
            });
        });
    }

    // printig questions and taking input form the user
    let rightAns = 0;
    let wrongAns = 0;
   // console.log(uniqueRandArr);
    async function startQuiz() {
        for (let i = 0; i < questionBank.length; i++) {
            let j = uniqueRandArr[i];
            let inputMsg = "Please enter your choise : "
            console.log("\nQuestion " + (i + 1) + ": " + questionBank[j].question)
            var userInput = await getInput(inputMsg);
            if (userInput == 5) {
                console.log("Time Left (hh/mm/ss) "+hours+" : "+minutes + " : " + seconds);
                userInput = await getInput(inputMsg);
            }
            if (userInput == questionBank[j].correctAnswer) {
                console.log("Right answer ")
                rightAns++;
            }
            else {
                console.log("Sorry wrong answer");
                wrongAns++;
            }


        }
        result();
        process.exit();
    }
    // Quiz Result
    function result() {
        console.log("\n<-------------  RESULTS -------------->");
        console.log("Total no. of questions in the quiz " + questionBank.length);
        console.log("Total no. of questions you attempted :" + (rightAns + wrongAns));
        console.log("Total no. of right answers :" + rightAns);
        console.log("Total no. of wrong answers :" + wrongAns);
        console.log("Your %age is :" + (rightAns / questionBank.length * 100).toFixed(2));
        console.log("\n <-------------- THANK YOU -------------->");
    }

    startQuiz();

}
timer();
