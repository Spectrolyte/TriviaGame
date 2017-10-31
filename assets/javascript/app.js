// variable declaration
var correct =0 ;
var wrong = 0;
var questionAnswer = {
	'What is the color of the sky?': ['blue','green','red','purple'],
	'What kind of bonds does water have?':['covalent','hydrogen','ionic','oxygen'],
	'Which is NOT a primary color?':['bloo','yellow','purple','red'],
	'Which Hogwarts house did Harry Potter belong to?':['ravenclaw','hufflepuff','slytherin','gryffindor'],
	'Which GoT house has the sigil of a Lion?':['Stark','Lannister','Baratheon','Targeryeon']
}
var currentQuestion;
var answerKey = ['blue','hydrogen','green','gryffindor','Lannister'];
var asked = [];
var userAnswer;

$(document).ready(function () {

// consider putting function in an object

function generateRandomNum (min, max) {
	return Math.floor(Math.random() * max ) - min;
}

// create a timer and display it on screen as time-remaining

// select question from QA obj
// run this function after x amount of seconds
function displayQuestion () {
	// select question only if it hasn't already been selected, then push to array of asked questions
	// randomize which question is displayed -- do this later
	for (var key in questionAnswer) {
		if (!asked.includes(key)) {
			asked.push(key);
			$('#current-question').text(key);
			// select button, set value attr equal to answer
			// display answer options
			// randomize answer options to buttons -- do this later
			for (var i=0; i < questionAnswer[key].length; i++) {
				$('.option' + [i] + ' span').attr('value',questionAnswer[key][i]).text(questionAnswer[key][i]);
			}
			return;
		}
	}	
}

// scoring conditions
// check user answer with answer bank
function checkAnswer () {
	// if selected correct answer, increment correct score by one
	if (answerKey.includes(userAnswer)) {
		correct++;
		alert('correct');
	} else {
		wrong++;
		alert('wrong');
	}
}

// run start function upon button click
function start () {
	setInterval(displayQuestion, 2000);
}

// upon button click, store selected answer into user answer and cross-check with answer key
$('.options span').on('click', function () {
	userAnswer = $(this).attr('value');
	checkAnswer();
	// display correct answer
	// dispaly next question
		// at the last correct answr reveal, display score and ask player to play again WITHOUT refreshing the page
})

$('.start').on('click', start);

});