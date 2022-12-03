const matchupMap = {
  A: { matchups: ["C", "A", "B"], score: 1 },
  B: { matchups: ["A", "B", "C"], score: 2 },
  C: { matchups: ["B", "C", "A"], score: 3 },
};

export default function calculateStrategyTwo(matchups) {
    let score = 0;

    matchups.forEach(matchup => {
        const [oponent, resultSymbol] = matchup.split(" ");
        const result = getSupposedOutcome(resultSymbol);
        const supposedSymbol = getSupposedSymbol(oponent, result);

        score += matchupMap[supposedSymbol].score + (3 + 3 * result);
    })

    return score;
}

function getSupposedSymbol(symbol, result) {
    return matchupMap[symbol].matchups[1 + result];
}

function getSupposedOutcome(symbol) {
    switch (symbol) {
        case 'X':
            return -1
        case 'Y':
            return 0
        case 'Z':
            return 1
        default:
            throw Error("Unknown Symbol!")
    }
}