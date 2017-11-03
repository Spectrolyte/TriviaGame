// variable declaration
var correct = 0 ;
var wrong = 0;
var missed = 0;
var userAnswer;
var correctAnswer;
var questionsAsked = 0;
var gameStarted = false;
var timeLeft = 10;

var timeoutQuestionAnswer;
var timeoutCheckAnswer;
var timeoutDecrement;

// array of question-answer objects with question, possible answers, and the correct answer
var questionAnswer = [

	{question: 'Which character was Muggle-born?',
	answers: ['Harry Potter','Hermoine Granger','Ron Weasley','Luna Lovegood'],
	correct: 'Hermoine Granger',
	asked: false,
	image: 'assets/images/hermoine.gif',
	text: 'Although Hermoine Granger was Muggle-born, she is one of the brightest witches in Hogwarts.'},
	
	{question: 'What is the real name of Voldemort?',
	answers: ['Albus Dumbledore','Morte Donovan','Salazar Serpient','Tom Riddle'],
	correct: 'Tom Riddle',
	asked: false,
	image: 'assets/images/voldemort.gif',
	text: 'Lord Voldemort\'s real name is Tom Riddle, also known as the Half-Blood Prince.'},

	{question: 'What was the name of the three-headed dog that guarded the Philosopher\'s Stone?',
	answers: ['Fluffy','Benjamin','Cerberus','Olly'],
	correct: 'Fluffy',
	asked: false,
	image: 'assets/images/fluffy.gif',
	text: 'Fluffy\'s a cute name, but this is a scary dog(s)??'},

	{question: 'Which Hogwarts house has the sigil of a serpent?',
	answers: ['Ravenclaw','Hufflepuff','Slytherin','Gryffindor'],
	correct: 'Slytherin',
	asked: false,
	image: 'assets/images/slytherin.gif',
	text: 'Slytherin\'s house sigil is of a serpent. Those snakes...'},

	{question: 'What kind of Patronus protected Harry Potter against the dementors?',
	answers: ['Eagle','Doe','Lion','Dragon'],
	correct: 'Doe',
	asked: false,
	image: 'assets/images/doe.gif',
	text: 'The patronus that protected Harry Potter was in the shape of a doe. Bright and powerful.'}
];

$(document).ready(function () {

	function hide (section) {
		$(section).hide();
	}

	function show (section) {
		$(section).show();
	}

	function getRandomNum (min, max) {
		return Math.floor(Math.random() * max) - min;
	}

	function decrement () {
		timeLeft--;
		$('#time-remaining').text(timeLeft);
	}

	// upon starting the game or selecting an answer before time is up, pick a random question from question-answer list
	// run this function after the timer runs out for the correct-answer reveal
	// prevent running this function when there are no questions left
	function displayQuestionAnswers () {

		var picked = questionAnswer[getRandomNum(0, questionAnswer.length)];
		var selectedQuestion = picked.question;
		var answerChoices = picked.answers;
		correctAnswer = picked.correct;
		var asked = picked.asked;

		// attach image to image div to reveal later
		$('.img-gif').html('<br><img src="' + picked.image + '" ><br>');
		$('.description').text(picked.text);

		show($('#time'));
		show($('.question'));
		show($('.options'));
		hide($('.start'));
		hide($('.welcome'))
		hide($('.img-gif'));
		hide($('.answer'));
		hide($('.user-choice'));
		hide($('.description'));
		
		// if question wasn't asked already,
		if (!asked) {
			// change asked to true;
			questionsAsked++;
			picked.asked = true;
			// show question
			$('#current-question').text(selectedQuestion);
			// show answers on buttons
				// create value attribute and assign answer values randomly
				// keep track of answers already assigned
			for (var i=0; i < 4; i++) {
				// if any of the buttons already have a value equal to an answer in the array, don't choose that answer
				var answer = answerChoices[i];
				$('.option' + i).attr('value', answer).text(answer);
			}
			// resets user answer to nothing just in case the user doesn't answer in time to trigger click event
			userAnswer = '';
		}
		else if (questionsAsked === questionAnswer.length) {
			//display stats, then return
			showStats();
			return;
		}
		else if (asked) {
			// resets user answer to nothing just in case the user doesn't answer in time to trigger click event
			userAnswer = '';
			displayQuestionAnswers();
		}
	}

	// display the correct answer
	function displayCorrectAnswer () {
		// hide answer buttons
		hide($('.options'));
		
		// fade out time remaining
		hide($('#time'));
		// fade out question
		hide($('.question'));
		// display picture or gif along with the correct answer
		show($('.img-gif'));
		show($('.answer'));
		show($('.description'));

	}

	// check user-answer against the correct answer
	function checkAnswer () {
		// stops timer on displaying the correct answer and shows the correct answer right away
		clearTimeout(timeoutCheckAnswer);
		clearTimeout(timeoutQuestionAnswer);
		clearInterval(timeoutDecrement);
		timeLeft = 15;
		displayCorrectAnswer();

		// captures user answer
		userAnswer = $(this).attr('value');

		if (!userAnswer) {
			missed++;
			$('.right-wrong').text('You didn\'t answer!');
			play();
		}

		else if (userAnswer === correctAnswer) {
			correct++;
			// display 'right' and correct answer page
			$('.right-wrong').text('You\'re right!');
			// display next question
			play();
		}
		else {
			wrong++;
			// display 'wrong' and correct answer page
			$('.right-wrong').text('You\'re wrong...');
			// display next question
			play();
		}
	}

	function play () {
		if (!gameStarted) {
			gameStarted = true;
			displayQuestionAnswers();
			// user has 10 seconds to answer the question
			timeoutCheckAnswer = setTimeout(checkAnswer, 1000 * 10);
			//decrement
			timeoutDecrement = setInterval(decrement, 1000);
		}
		else {
			// show correct answer for 5 seconds before displaying the next question
			timeoutQuestionAnswer = setTimeout(displayQuestionAnswers, 1000 * 5);
	
			// user has 10 seconds to answer the question
			timeoutCheckAnswer = setTimeout(checkAnswer, 1000 * 15);

			//decrement
			timeoutDecrement = setInterval(decrement, 1000);
			
		}
	}

	function showStats () {
		// kill timers
		clearTimeout(timeoutQuestionAnswer);
		clearTimeout(timeoutCheckAnswer);
		clearInterval(timeoutDecrement);
		$('#correct').text(correct);
		$('#wrong').text(wrong);
		$('#missed').text(missed);
		hide($('#time'));
		hide($('.question'));
		hide($('.options'));
		hide($('.answer'));
		hide($('.user-choice'));
		hide($('.stats'));
		show($('.stats'));
	}

	function restart () {
		// reset stats
		gameStarted = false;
		correct = 0;
		wrong = 0;
		missed = 0;
		questionsAsked = 0;
		timeLeft = 10;
		// change each question to unasked
		for (var i=0; i < questionAnswer.length; i++) {
			questionAnswer[i].asked = false;
		}
		// hide stats and show start button
		hide($('.stats'));
		show($('.start'));

	}

	// click events
	// click start game button to initiate game
	$('.start').click(play);
	// capture user-answer upon clicking a button
	$('.options').click(checkAnswer);
	// click play again button to restart the game
	$('.restart').click(restart);

	// hide question, timer, and answer buttons upon page load
	hide($('#time'));
	hide($('.question'));
	hide($('.options'));
	hide($('.answer'));
	hide($('.user-choice'));
	hide($('.stats'));











});