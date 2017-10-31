// variable declaration
var correct;
var wrong;
var questionAnswer = {
	q1: ['Which color is the color of the sky?','blue','green','red','purple']
}
var currentQuestion;
var answer;


$(document).ready(function () {

// select question from QA obj
// randomize answer options to buttons
	// select button, set value attr equal to answer
function displayQuestion () {
	currentQuestion = questionAnswer.q1[0];
	answer = questionAnswer.q1[1];
	$('.option1 span').text(answer);
	$('.option2 span').text(questionAnswer.q1[2]);
	$('.option3 span').text(questionAnswer.q1[3]);
	$('.option4 span').text(questionAnswer.q1[4]);
}

$('.test').on('click', displayQuestion);

// scoring conditions

});