const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Model = mongoose.model;

const PlayerSchema = new Schema({ 
        player1: {name: {type: String, required:true}, score: {type: [Number]}},
        player2 : {name: {type: String, required:true}, score: {type: [Number]}},
        player3: {name: {type: String, required:true}, score: {type: [Number]}},
		player4: {name: {type: String, required:true}, score: {type: [Number]}},
		countRound: {type: Number}
});

module.exports = mongoose.model("Player", PlayerSchema);