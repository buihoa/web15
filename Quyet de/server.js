const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded( { extended: true }));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/answer.html')
})

app.get('/ask', (req,res) => {
    res.sendFile(__dirname + '/public/ask.html')
})

app.get('/answer', (req,res) => {
    res.sendFile(__dirname + '/public/answer.html')
})

app.get('/resultPage', (req,res) => {
    res.sendFile(__dirname + '/public/result.html')
})


app.post('/createQuestions', (req, res) => {
    // req.body
    /* req.on('data', (data) => {
        console.log(data)
    }) */

    console.log(req.body);
    let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    console.log(questionList.length);

    const newQuestion = {
        id: questionList.length, 
        questionContent: req.body.questionContent,
        yes:0,
        no:0
    };

    questionList.push(newQuestion);
    fs.writeFileSync('./questions.json', JSON.stringify(questionList));

    res.redirect('/answer');
});

app.get('/randomQuestion', (req,res) => {
    let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    if(questionList.length > 0){
        let questionRandom = questionList[Math.floor(Math.random() * questionList.length)];
        console.log(questionRandom);
        res.send(questionRandom);
    }
    else res.send("");
});

let shareResult = [];

app.post('/yesNo', (req, res) => {
    const {questionid, answer} = req.body;
    //const tempID = req.body.questionid;

    let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    questionList[questionid][answer] += 1;

    shareResult.push(questionList[questionid]);
 
    fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.send({success: 1});
});


app.get('/result', (req, res) => {
    console.log(shareResult[0]);
    res.send(shareResult[0]);
});

app.use(express.static('public'));

app.listen(5000, (err) => {
    if(err) console.log(err);
    else console.log('Server is listening at port 5000');
})