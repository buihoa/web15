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

    var file = JSON.parse(fs.readFileSync('./questions.json'));
    var jsonLength = file.length;
    var randomNum = Math.floor((Math.random() * jsonLength));
    var content = file[randomNum].questionContent;
    fs.writeFileSync('randomQues.txt', content, (err) => {
            if (err) console.log(err)
                else console.log("Write ranContent success")
    });


app.use(express.static('public'));

app.listen(5000, (err) => {
    if(err) console.log(err);
    else console.log('Server is listening at port 5000');
})