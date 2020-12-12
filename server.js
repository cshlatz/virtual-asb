const fs = require('fs');
const papa = require('papaparse');
const file = fs.readFileSync('games.csv', 'utf8');
const path = require('path');

var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the home page route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));    
});

app.get('/generate', function(req, res) {
    asb(req, res);
});

app.listen(port, function() {
});


function asb(req, res) {
    var data = papa.parse(file, {
        complete: function(results) {
            let games = results.data;
            let chosenGames = '';
            let golfObjectiveFlag = false;
            let objectiveCount = parseInt(req.query.objectivecount);
            for (var i = 0; i < req.query.count; i++) {
                let game = games.splice(getRandomInt(games.length - 1), 1)[0];
                let thegame = game[0];
                let objective;
                if (req.query.type === "golf") {
                    if (!golfObjectiveFlag) {
                        objectiveCount--;
                        let rng = Math.floor(Math.random() * 2 + 2);
                        objective = game[rng];
                        if (objectiveCount === 0) {
                            golfObjectiveFlag = true;
                        }
                    } else {
                        objective = game[1];
                    }
                    if (i + 1 == req.query.count) {
                        thegame = '<b>' + thegame + '</b>';
                    }
                } else {
                    objective = "Get a high score";
                }
                chosenGames = chosenGames + "<tr scope='row'><td>" + thegame + "</td><td>" + objective + "</td></tr>";
            }
            let html = '<table class="table table-striped"><thead><tr><th scope="col">Game</th><th scope="col">Objective</th></tr></thead><tbody>' + chosenGames + '</tbody></table>';
            if (req.query.type === "golf") {
                html = html + '<br>Bold game indicates high score tiebreaker';
            }
            res.send(html);
        }
    });
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

