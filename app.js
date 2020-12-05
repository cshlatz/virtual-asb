const fs = require('fs');
const papa = require('papaparse');

const file = fs.createReadStream('games.csv');

var data = papa.parse(file, {
    complete: function(results) {
        let games = results.data;
        let chosenGames = [];
        for (var i = 0; i < 5; i++) {
            let chosenGame = games.splice(getRandomInt(games.length - 1), 1);
            chosenGame.splice(Math.floor(Math.random() * 3) + 1, 1);
            chosenGame.splice(Math.floor(Math.random() * 2) + 1, 1);
            chosenGames.push(chosenGame);
        }
        console.log(chosenGames);
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
