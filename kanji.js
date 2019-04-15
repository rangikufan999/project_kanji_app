//Global variables needed at start of quiz
var quizIndex = 0;
var quizCurrentScore = 0;
var quizSize = 28;
var quiz = "";
var quizInd = 0;


//This function starts a new quiz, replaces the start quiz button with a restart quiz button, and fills up the first query and answers div.
function startQuiz(){
	//Reset Quiz
	quizInd = 0;
	quizCurrentScore = 0;
	updateScore();
	quiz = "";

	//reset rightOrWrong
	document.getElementById("rightOrWrong").innerHTML = " ";

	//Get query header
	var queryHeader = document.getElementById("kanjiQuery");

	quiz = createQuizQuestions();

	queryHeader.innerHTML = quiz[0].kanjiDef;

	var answers = createAnswers(quiz, quizInd);
	fillAnswers(answers);

}

function createQuizQuestions(){
	var returnArray = [];

	for(var i = 0; i< quizSize;i++){
		returnArray.push(kanjiLibrary[kanjiIndex[i]]);
	}

	shuffle(returnArray);
	return returnArray;
}

function fillAnswers(ans){
	var ans1 = document.getElementById("answer1");
	var ans2 = document.getElementById("answer2");
	var ans3 = document.getElementById("answer3");
	var ans4 = document.getElementById("answer4");
	var ans5 = document.getElementById("answer5");

	ans1.innerHTML = ans[0].kanji;
	ans2.innerHTML = ans[1].kanji;
	ans3.innerHTML = ans[2].kanji;
	ans4.innerHTML = ans[3].kanji;
	ans5.innerHTML = ans[4].kanji;
}

function checkAnswer(elem){
	if(elem.innerHTML == quiz[quizInd].kanji){
		document.getElementById("rightOrWrong").innerHTML = "CORRECT!";
		quizCurrentScore += 1;
		updateScore();
	}else if(elem.innerHTML != quiz[quizInd].kanji){
		document.getElementById("rightOrWrong").innerHTML = "WRONG!";
	}
}

function updateScore(){
	var scr = document.getElementById("currentScore");
	var scrMax = document.getElementById("maxScore");

	scr.innerHTML = quizCurrentScore;
	scrMax.innerHTML = quizSize;
}

function nextQuestion(elem){
	checkAnswer(elem);
	quizInd += 1;
	if(quizInd < quizSize){
		var answers = createAnswers(quiz, quizInd);
		var queryHeader = document.getElementById("kanjiQuery");
		fillAnswers(answers);
		queryHeader.innerHTML = quiz[quizInd].kanjiDef;
	}else if(quizInd >= quizSize){
		document.getElementById("rightOrWrong").innerHTML = "The quiz is finished. Click Start Quiz to retake the quiz.";
	}
}

//Utility
function createAnswers(quizArr, quizInd){
	ansArr = quizArr.slice();
	var popSize = quizSize - 5;


	ansArr.splice(quizInd, 1);
	shuffle(ansArr);

	for(var i = 0;i<popSize;i++){
		ansArr.pop();
	}

	ansArr.push(quizArr[quizInd]);
	shuffle(ansArr);

	console.log(ansArr);
	return ansArr;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

