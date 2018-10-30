const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const PlayerModel = require('./model/playerModel');
mongoose.connect("mongodb://localhost/miniHackathon", (err) => {
	if(err) console.log(err)
	else console.log("DB connect success!");
});

const app = express();
app.use(bodyparser.urlencoded( {extended : false}))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
})

app.post('/result', (req,res) => {
    PlayerModel.create(
        { player1 : {name: req.body.player1, score: [0]},
            player2 : {name: req.body.player2, score: [0]},
            player3 : {name: req.body.player3, score: [0]},
            player4 : {name: req.body.player4, score: [0]},
            countRound : 0
        }
    , (err, listCreated) => {
        if(err) console.log(err)
        else {
         res.redirect('/players/' + listCreated._id);
        }
    })
});


app.get('/players/:playersId', (req, res) => {
	res.sendFile(__dirname + "/public/result.html");
});

app.get('/playersDetail/:playersId', (req, res) => {
    let playersId= req.params.playersId;

    PlayerModel.findById(playersId, (err, playersFound) => {
		if(err) console.log(err)
		else if(!playersFound) console.log("Not found!")
		else {
            res.send({ success: 1, players : playersFound });
        }
	});
});

app.post('/newRound', (req,res) => {
    console.log("In NewRound " + req.body.numRound.pop());
    console.log(req.body);
    var idTeam = req.body.idTeam.pop();
    console.log(idTeam);
    var score1 = req.body.displayScore1;
    var score2 = req.body.displayScore2;
    var score3 = req.body.displayScore3;
    var score4 = req.body.displayScore4;
    PlayerModel.findById(idTeam, (err, queryFound) => {
        if(err) console.log(err)
        else if(!queryFound) console.log("Cannot find this query")
        else {
            console.log(queryFound);
            queryFound.player1.score.push(score1);
            queryFound.player2.score.push(score2);
            queryFound.player3.score.push(score3);
            queryFound.player4.score.push(score4);

            queryFound.countRound +=1;
            console.log(queryFound.countRound);

            queryFound.save((err, queryUpdated) => {
                if(err) console.log(err)
                else res.redirect('/players/' + idTeam);
            })
        }
    });
})

app.use(express.static('public'));

app.listen(8080, (err) => {
	if(err) console.log(err)
	else console.log('Server is listening at port 8080');
});

