// variable declaration
var correct = 0 ;
var wrong = 0;
var userAnswer;

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

	// upon starting the game, pick a random question from question-answer list
	// run this function after the timer runs out for the correct-answer reveal
	function displayQuestion () {
		var picked = questionAnswer[getRandomNum(0, questionAnswer.length)];
		var selectedQuestion = picked.question;
		var correctAnswer = picked.correct;
		var asked = picked.asked;
		
		// if question wasn't asked already,
		if (!asked) {
			// change asked to true;
			picked.asked = true;
			
		}
		else {
			displayQuestion();
		}
	}
	

});