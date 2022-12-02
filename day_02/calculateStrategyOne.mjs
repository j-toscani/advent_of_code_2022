const matchMap = {
  A: createMathup("B", "C"),
  B: createMathup("C", "A"),
  C: createMathup("A", "B"),
};

export default function calculateStrategyOne(matchups) {
  let score = 0;

  matchups.forEach((matchup) => {
    const [they, me] = matchup.split(" ");
    const result = matchMap[they](me);

    score += getMatchScore(me, result);
  });
  
  return score;
}

function getMatchScore(symbol, result) {
  return getSymbolScore(symbol) + (3 + 3 * result);
}

function createMathup(wins, loses) {
  return (me) => {
    switch (me) {
      case wins:
        return 1;
      case loses:
        return -1;
      default:
        return 0;
    }
  };
}

function getSymbolScore(symbol) {
  switch (symbol) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
    default:
      throw Error("Unknown Symbol!");
  }
}
