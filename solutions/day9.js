module.exports = {

    getFirstStar: (i) => {

        [playerTotal, marbleTotal] = getPlayersMarbles(i);
        let players = getScores(playerTotal, marbleTotal);
        return Math.max(...players);

    },


    getSecondStar: (i) => {
        [playerTotal, marbleTotal] = getPlayersMarbles(i);
        let players = getScores(playerTotal, marbleTotal * 100);
        return Math.max(...players);
    }
};


function getScores() {
    let players = new Array(playerTotal);
    players.fill(0);
    let marbleCircle = [0];

    let currentPlayer = 0;
    let currentMarbleIdx = 0;
    let marbleNumber = 1;

    while (marbleNumber <= marbleTotal) {
        if (marbleNumber % 23 === 0) {
            players[currentPlayer] = players[currentPlayer] + marbleNumber;
            currentMarbleIdx = currentMarbleIdx - 7 < 0 ? currentMarbleIdx - 7 + marbleCircle.length : currentMarbleIdx - 7;
            players[currentPlayer] = players[currentPlayer] + marbleCircle[currentMarbleIdx];
            marbleCircle.splice(currentMarbleIdx, 1);

        }
        else {
            currentMarbleIdx = currentMarbleIdx + 2 > marbleCircle.length ? currentMarbleIdx + 2 - marbleCircle.length : currentMarbleIdx + 2
            marbleCircle.splice(currentMarbleIdx, 0, marbleNumber);
        }

        marbleNumber++;
        currentPlayer++;
        if (currentPlayer >= playerTotal) {
            currentPlayer = 0;
        }
    }
    return players;
}


function getPlayersMarbles(i) {

    const regex = /(\d*)\splayers; last marble is worth\s(\d*)/s;
    const playersMarbles = regex.exec(i);

    return [parseFloat(playersMarbles[1]), parseFloat(playersMarbles[2])];
}
