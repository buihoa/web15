const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const QuestionModel = require('./models/questionModel');

mongoose.connect("mongodb://localhost/quyetde", (err) => {
	if(err) console.log(err)
	else console.log("DB connect success!");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

app.get('/ask', (req, res) => {
	res.sendFile(__dirname + '/public/ask.html');
});

app.get('/answer', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

app.post('/createquestion', (req, res) => {
	// const newQuestion = new QuestionModel({
	// 	questionContent: req.body.questionContent
	// });

	// newQuestion.save();

	// res.redirect('/answer');

	QuestionModel.create(
		{ questionContent: req.body.questionContent },
		(err, questionCreated) => {
			if(err) console.log(err)
			else res.redirect('/question/'+questionCreated._id);
		});
});

app.get('/randomquestion', (req, res) => {
	// findOne
	/* let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	if(questionList.length > 0) {
		let randomIndex = Math.floor(Math.random()*questionList.length);
		let questionRandom = questionList[randomIndex];
		question = questionRandom;
		res.send(questionRandom);
	} */
	var countCollection = QuestionModel.countDocuments({});
	let randomIndex = Math.floor(Math.random()* countCollection);

	QuestionModel.findOne().skip(randomIndex).exec(function (err, questionFound) {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not Found")
		else {
			console.log(questionFound);
			res.send(questionFound);
		}
	});
});

app.post('/answer', (req, res) => {
	//find...AndUpdate
	//find -> save
	const { questionid, answer } = req.body;

	//QuestionModel.findById(questionid)
	QuestionModel.findOne({ "_id": questionid }, (err, questionFound) => {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not Found")
		else {
			questionFound.yes += 1;//questionFound.no += 1;
			questionFound.save((err, questionUpdated) => {
				if(err) console.log(err)
				else {
					console.log("Questions updated");
					res.send({ success: 1 });
				}
			});
		}
	})

/* 	QuestionModel.findOneAndUpdate(
		{ "_id": questionid },
		{ $inc: { yes: 1 } },
		{ new: true },
		(err, questionUpdated) => {
			if(err) console.log(err)
			console.log("Successfully updated");
			questionUpdated.save();
	}); */

	// // const questionid = req.body.questionid;
	// // const answer = req.body.answer;
	// let questionList = JSON.parse(fs.readFileSync('./questions.json'));
	// questionList[questionid][answer] += 1;
	// fs.writeFileSync('./questions.json', JSON.stringify(questionList));
	// res.send({ success: 1 });
});

app.get('/question/:questionId', (req, res) => {
	res.sendFile(__dirname + "/public/detail.html");
});

app.get('/questiondetail/:questionId', (req, res) => {
	let questionId = req.params.questionId;
	QuestionModel.findOne({"_id": questionId}, (err, questionFound) => {
		if (err) console.log(err)
		else if(!questionFound) console.log("Not Found")
		else {
			console.log("Success!");
			console.log(query);
			res.send({ success: 1, question: questionFound});
		}
	});
});

/* let questionId = req.params.questionId;
	let questionList = JSON.parse(fs.readFileSync('./questions.json'));
	res.send({ success: 1, question: questionList[questionId] }); */

app.use(express.static('public'));

app.listen(4000, (err) => {
	if(err) console.log(err)
	else console.log('Server is listening at port 4000');
});