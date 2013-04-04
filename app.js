// Douglas C's Object.create()
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}
// Parasitic Combination Inheritance
function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}

// Quiz application in JS OOP

function User (theName, theEmail) {
	this.name = theName;
	this.email = theEmail;
	this.quizScores = [];
	this.currentScore = 0;
}

User.prototype = {
	constructor: User,
	saveScore: function (theScoreToAdd) {
		this.quizScores.push(theScoreToAdd);
	},
	showNameAndScores: function () {
		var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
		return this.name + " Scores: " + scores;
	},
	changeEmail: function (newEmail) {
		this.email = newEmail;
		return "New Email Saved: " + this.email;
	}
};

function Question (theQuestion, theChoices, theCorrectAnswer) {
	this.question = theQuestion;
	this.choices = theChoices;
	this.correctAnswer = theCorrectAnswer;
	this.userAnswer = "";

	var newDate = new Date(),
	QUIZ_CREATED_DATE = newDate.toLocaleDateString();
	
	this.getQuizDate = function () {
		return QUIZ_CREATED_DATE;
	};

	console.log("Quiz Created On: " + this.getQuizDate());
}

Question.prototype.getCorrectAnswer = function () {
	return this.correctAnswer;
};
Question.prototype.getUserAnswer = function () {
	return this.userAnswer;
};
Question.prototype.displayQuestion = function () {
	var questionToDisplay = "<div class='question'>" + this.question + "</div><ul>";
	choiceCounter = 0;
	this.choices.forEach(function (eachChoice) {
		questionToDisplay += '<li><input type="radio" name="choice" value="' + choiceCounter + '">' + eachChoice + '</li>';
		choiceCounter++;
	});
	questionToDisplay += "</ul>";
	console.log(questionToDisplay);
};

function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer) {
	Question.call(this, theQuestion, theChoices, theCorrectAnswer);
};

inheritPrototype(MultipleChoiceQuestion, Question);

function DragDropQuestion(theQuestion, theChoices, theCorrectAnswer) {
	Question.call(this, theQuestion, theChoices, theCorrectAnswer);
}

inheritPrototype(DragDropQuestion, Question);

DragDropQuestion.prototype.displayQuestion = function () {
	console.log(this.question);
}

var allQuestions = [
new MultipleChoiceQuestion("Who is the President of the U.S.?", ["Obama", "Brown", "Martin", "Clinton"], 0),
new MultipleChoiceQuestion("What is the Capital of California?", ["Texas", "Sacramento", "Los Angeles", "San Francisco"], 1),
new DragDropQuestion("Drag the capitol of the United States to the map: ", ["Washington, DC", "London", "Rio de Janeiro", "Kabul"], 0)
];

allQuestions.forEach(function(eachQuestion) {
	eachQuestion.displayQuestion();
});

firstUser = new User("Reshad", "reshad@example.com");
firstUser.changeEmail("reshadn@example.com");
firstUser.saveScore(10);
firstUser.saveScore(20);
firstUser.saveScore(30);
firstUser.showNameAndScores();

secondUser = new User("Noorzay", "noorzay@mailinator.com");
secondUser.saveScore(13);
secondUser.showNameAndScores();
