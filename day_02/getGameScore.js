const data = require("./data");

const matchUps = {
  A: _createMatchup("Y", "Z"),
  B: _createMatchup("Z", "X"),
  C: _createMatchup("X", "Y"),
};

const matchUps2 = {
  A: createMatchup("B", "C", "A"),
  B: createMatchup("C", "A", "B"),
  C: createMatchup("A", "B", "C"),
};

const store = {
  sum: 0,
};

data.forEach((matchup) => {
  const gameScores = {
    X: 0,
    Y: 3,
    Z: 6,
  };

  const wantedResult = {
    X: -1,
    Y: 0,
    Z: 1,
  };

  const [oponent, me] = matchup.split(" ");
  const result = matchUps2[oponent](wantedResult[me]);

  store.sum += getSymbolScore(result) + gameScores[me];
});

console.log(store.sum);

function createMatchup(win, loose, last) {
  return (me) => {
    switch (me) {
      case 1:
        return win;
      case -1:
        return loose;
      default:
        return last;
    }
  };
}

function _createMatchup(wins, looses) {
  return (me) => {
    switch (me) {
      case wins:
        return 1;
      case looses:
        return -1;
      default:
        return 0;
    }
  };
}

function getScore(symbol, result) {
  const symbolScore = getSymbolScore(symbol);
  const resultScore = getResultScore(result);

  return symbolScore + resultScore;
}

function getResultScore(result) {
  switch (result) {
    case -1:
      return 0;
    case 1:
      return 6;
    default:
      return 3;
  }
}

function getSymbolScore(symbol) {
  switch (symbol) {
    case "A": // Rock
      return 1;
    case "B": // Paper
      return 2;
    case "C": // Scissors
      return 3;
    default:
      console.error("Unknown Symbol!", symbol);
      return 0;
  }
}
