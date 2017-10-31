// variable declaration
var correct;
var wrong;
var questionAnswer = {
	'What is the color of the sky?': ['blue','green','red','purple'],
	'What kind of bonds does water have?':['covalent','hydrogen','ionic','oxygen'],
	'Which is NOT a primary color?':['blue','yellow','green','red'],
	'Which Hogwarts house did Harry Potter belong to?':['ravenclaw','hufflepuff','slytherin','gryffindor'],
	'Which GoT house has the sigil of a Lion?':['Stark','Lannister','Baratheon','Targeryeon']
}
var currentQuestion;
var answer;
var asked = [];

$(document).ready(function () {

function generateRandomNum (min, max) {
	return Math.floor(Math.random() * max ) - min;
}

// select question from QA obj
function displayQuestion () {
	// select question only if it hasn't already been selected, then push to array of asked questions
	// randomize which question is displayed
	for (var key in questionAnswer) {
		if (!asked.includes(key)) {
			asked.push(key);
			$('#current-question').text(key);
			for (var i=0; i < questionAnswer[key].length; i++) {
				$('.option' + [i] + ' span').text(questionAnswer[key][i]);
			}
			return;
		}
	}

	// randomize answer options to buttons
		// select button, set value attr equal to answer
}

$('.test').on('click', displayQuestion);

// scoring conditions

});