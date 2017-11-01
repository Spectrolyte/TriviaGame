// variable declaration
var correct = 0 ;
var wrong = 0;
var userAnswer;
var correctAnswer;

// array of question-answer objects with question, possible answers, and the correct answer
var questionAnswer = [

	{question: 'Which character was Muggle-born?',
	answers: ['Harry Potter','Hermoine Granger','Ron Weasley','Luna Lovegood'],
	correct: 'Hermoine Granger',
	asked: false
	image: /*insert url here*/},
	
	{question: 'What is the real name of Voldemort?',
	answers: ['Albus Dumbledore','Morte Donovan','Salazar Serpient','Tom Riddle'],
	correct: 'Tom Riddle',
	asked: false
	image: /*insert url here*/},

	{question: 'What was the name of the three-headed dog at guarded the Philosopher\'s Stone?',
	answers: ['Fluffy','Benjamin','Cerberus','Olly'],
	correct: 'Fluffy',
	asked: false
	image: /*insert url here*/},

	{question: 'Which Hogwarts house has the sigil of a serpent?',
	answers: ['Ravenclaw','Hufflepuff','Slytherin','Gryffindor'],
	correct: 'Slytherin',
	asked: false
	image: /*insert url here*/},

	{question: 'What kind of Patronus protected Harry Potter against the dementors?',
	answers: ['Eagle','Doe','Lion','Dragon'],
	correct: 'Doe',
	asked: false
	image: /*insert url here*/}
];

$(document).ready(function () {
	// click events
		// click start game button to initiate game
		$('.start').click(displayQuestionAnswers);
		// capture user-answer upon clicking a button
		$('.options').click(checkAnswer);

	function hide (section) {
		$(section).hide();
	}

	function show (section) {
		$(section).show();
	}

	// hide question, timer, and answer buttons upon page load
	// show question, timer, and answer buttons after start button is clicked. hide start button
	// after answering a question or timer runs out,
		// hide question, timer, and answer buttons
		// display if user got it right or wrong, the correct answer, the button the user clicked, and an image

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

	// display the correct answer
	function displayCorrectAnswer () {
		// fade out buttons that are not the user's answer
		for (var i=0; i < 4; i++) {
			if ($('.option' + i).attr('value') !== userAnswer) {
				hide($('.option' + i));
			}
		}
		// fade out time remaining
		hide($('.time'));
		// fade out question
		// display picture or gif along with the correct answer
	}

	// check user-answer against the correct answer
	function checkAnswer () {
		userAnswer = $(this).attr('value');

		if (userAnswer === correctAnswer) {
			correct++;
			$('.right-wrong').text('right');
			// display 'right' and correct answer page
			// display next question
		}
		else {
			wrong++;
			$('.right-wrong').text('wrong');
			// display 'wrong' and correct answer page
			// display next question
		}
	}
	














});