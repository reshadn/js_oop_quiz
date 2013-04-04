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

// a User
firstUser = new User("Reshad", "reshad@example.com");
firstUser.changeEmail("reshadn@example.com");
firstUser.saveScore(10);
firstUser.saveScore(20);
firstUser.saveScore(30);
console.log(firstUser.showNameAndScores());

secondUser = new User("Noorzay", "noorzay@mailinator.com");
secondUser.saveScore(13);
console.log(secondUser.showNameAndScores());
