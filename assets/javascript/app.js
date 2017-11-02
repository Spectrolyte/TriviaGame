// variable declaration
var correct = 0 ;
var wrong = 0;
var userAnswer;
var correctAnswer;
var questionsAsked = 0;

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

	{question: 'What was the name of the three-headed dog at guarded the Philosopher\'s Stone?',
	answers: ['Fluffy','Benjamin','Cerberus','Olly'],
	correct: 'Fluffy',
	asked: false,
	image: 'assets/images/fluffy.gif',
	text: 'Cute name, scary dog.'},

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

	// upon starting the game or selecting an answer before time is up, pick a random question from question-answer list
	// run this function after the timer runs out for the correct-answer reveal
	// prevent running this function when there are no questions left
	function displayQuestionAnswers () {
		gameStarted = true;
		displayCorrectAnswer = false;

		var picked = questionAnswer[getRandomNum(0, questionAnswer.length)];
		var selectedQuestion = picked.question;
		var answerChoices = picked.answers;
		correctAnswer = picked.correct;
		var asked = picked.asked;
		// attach image to image div to reveal later
		$('.img-gif').html('<img src="' + picked.image + '" >')
		$('.description').text(picked.text);

		show($('#time'));
		show($('.question'));
		show($('.options'));
		hide($('.start'));
		hide($('.img-gif'));
		hide($('.answer'));
		hide($('.user-choice'));
		hide($('.description'));
		
		// if question wasn't asked already,
		if (questionsAsked === questionAnswer.length) {
			//display stats
			console.log('done');
		}
		else if (!asked) {
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
		}
		else {
			displayQuestionAnswers();
		}
	}

	/*// display the correct answer
	function displayCorrectAnswer () {
		// fade out buttons that are not the user's answer
		for (var i=0; i < 4; i++) {
			if ($('.option' + i).attr('value') !== userAnswer) {
				hide($('.option' + i));
			}
		}
		// fade out time remaining
		hide($('#time'));
		// fade out question
		hide($('.question'));
		// display picture or gif along with the correct answer
		show($('.img-gif'));
		show($('.answer'));
		show($('.user-choice'));

	}
*/
	// check user-answer against the correct answer
	function checkAnswer () {
		userAnswer = $(this).attr('value');

		if (userAnswer === correctAnswer) {
			correct++;
			// display 'right' and correct answer page
			$('.right-wrong').text('right');
			// display next question
		}
		else {
			wrong++;
			// display 'wrong' and correct answer page
			$('.right-wrong').text('wrong');
			// display next question
		}

		for (var i=0; i < 4; i++) {
			if ($('.option' + i).attr('value') !== userAnswer) {
				hide($('.option' + i));
			}
		}
		// fade out time remaining
		hide($('#time'));
		// fade out question
		hide($('.question'));
		// display picture or gif along with the correct answer
		show($('.description'));
		show($('.img-gif'));
		show($('.answer'));
		show($('.user-choice'));
		show($('.description'));
	}
	
	// click events
	// click start game button to initiate game
	$('.start').click(displayQuestionAnswers);

	
	// capture user-answer upon clicking a button
	$('.options').click(checkAnswer);

	// hide question, timer, and answer buttons upon page load
	hide($('#time'));
	hide($('.question'));
	hide($('.options'));
	hide($('.answer'));
	hide($('.user-choice'));

	// show question, timer, and answer buttons after start button is clicked. hide start button
		// this is done in displayQuestionAnswers function

	// after answering a question or timer runs out,
		// hide question, timer, and answer buttons
		// display if user got it right or wrong, the correct answer, the button the user clicked, and an image

	// user has 20 seconds to answer the question
	// show user correct answer for 5 seconds

	/*if (gameStarted && !displayingCorrectAnswer ) {
		setTimeout(displayQuestionAnswers, 1000 * 20);
	}
	else if (gameStarted && displayingCorrectAnswer) {
		setTimeout(displayCorrectAnswer, 1000 * 5);
	}*/











});