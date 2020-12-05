const fs = require('fs');
const papa = require('papaparse');
const file = fs.readFileSync('games.csv', 'utf8');

var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the home page route
app.get('/', function(req, res) {
    asb(res);
});

app.listen(port, function() {
});


function asb(res) {
    var data = papa.parse(file, {
        complete: function(results) {
            let games = results.data;
            let chosenGames = '';
            for (var i = 0; i < 5; i++) {
                let game = games.splice(getRandomInt(games.length - 1), 1)[0];
                let thegame = game[0];
                let objective = game[Math.floor(Math.random() * Math.floor(game.length - 1)) + 1];
                chosenGames = chosenGames + "<p>GAME: " + thegame + " - " + objective + "</p><br>";
            }
            res.send(chosenGames);
        }
    });
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};
