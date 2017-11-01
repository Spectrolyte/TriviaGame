// variable declaration
var correct = 0 ;
var wrong = 0;
var userAnswer;
var correctAnswer;

// array of question-answer objects with question, possible answers, and the correct answer
var questionAnswer = [

	{question: 'What is the color of the sky?',
	answers: ['blue','green','red','purple'],
	correct: 'blue',
	asked: false},
	
	{question: 'What kind of bonds does water have?',
	answers: ['covalent','hydrogen','ionic','oxygen'],
	correct: 'hydrogen',
	asked: false},

	{question: 'Which is NOT a primary color?',
	answers: ['blue','yellow','purple','red'],
	correct: 'purple',
	asked: false},

	{question: 'Which Hogwarts house did Harry Potter belong to?',
	answers: ['ravenclaw','hufflepuff','slytherin','gryffindor'],
	correct: 'gryffindor',
	asked: false},

	{question: 'Which GoT house has the sigil of a Lion?',
	answers: ['Stark','Lannister','Baratheon','Targeryeon'],
	correct: 'Lannister',
	asked: false}
];

$(document).ready(function () {
	// generate random number between min and max, inclusive
	function getRandomNum (min, max) {
		return Math.floor(Math.random() * max) - min;
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
		
		// if question wasn't asked already,
		if (!asked) {
			// change asked to true;
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
		}
		else {
			displayQuestionAnswers();
		}
	}

	// click start game button to initiate game
	$('.start').click(displayQuestionAnswers);

	// capture user-answer upon clicking a button
	$('.options').click(checkAnswer);

	// check user-answer against the correct answer
	function checkAnswer () {
		userAnswer = $(this).attr('value');
		if (userAnswer === correctAnswer) {
			correct++;
			console.log('right');
			// display 'right' and correct answer page
			// display next question
		}
		else {
			wrong++;
			console.log('wrong');
			// display 'wrong' and correct answer page
			// display next question
		}
	}
	














});