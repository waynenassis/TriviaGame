
$(document).ready(function () {
    

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 20;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "Which NFL team has the most Superbowls ?",
        answer: ["Steelers", "Packers", " Saints", "Ravens"],
        correct: "0",
        image: ("assets/images/steelers.jpg")
    }, {
        question: "Who is the most decorated Olympian of all time ?",
        answer: ["Usain Bolt", "Micheal Phelps", "Carl Lewis", "Lance Armstrong"],
        correct: "1",
        image: ("assets/images/phelps.jpg")
        
    }, {
        question: "Who was the only college football player to win the Heisman Trophy twice ?",
        answer: ["Peyton Manning", "Barry Sanders", "Archie Griffen", "Doug Flutie"],
        correct: "2",
        image: ("assets//images/archie.jpg")
    }, {
        question: "The Ashes is the most important trophy in what sport ?",
        answer: ["Basketball", "Hockey", "Baseball", "Cricket"],
        correct: "3",
        image: ("assets/images/cricket.jpg")
    }, {
        question: "How Many Horses have won the triple Crown ? ",
        answer: ["10", "5", "13", "20"],
        correct: "2",
        image: ("assets/images/triplecrown.jpg")
    }, {
        question: "How is soccer player Edson Arantes do Nascimento better known?",
        answer: ["Messi", "Ronaldo", "Pele", "Maradona"],
        correct: "2",
        image: ("assets//images/pele.jpg")
    }, 
    {
        question: "Who is the NHL all time leader in points ?",
        answer: ["Gordie Howe", "Jaromir Jagr", "Mario Lemieux ", "Wayne Gretzky"],
        correct: "3",
        image: ("assets//images/gretzky.jpg")
    }];

    // ------------- FUNCTION DECLARATIONS ----------------------------


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset.
        timeRemaining = 20;
        intervalID = setInterval(timer, 1100);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + "..... The Correct Answer Is: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER I: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("Your Correct!").css({
            
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU MISSED THIS ONE!").css({
            
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("You Forgot to Answer").css({
            
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="350" height="300" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 4000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 5000);
            }, 4000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});