import getMatchups from "./getMatchups.mjs";
import calculateStrategyOne from "./calculateStrategyOne.mjs";
import calculateStrategyTwo from "./calculateStrategyTwo.mjs";

const matchups = getMatchups();
const scoreOne = calculateStrategyOne(matchups);
const scoreTwo = calculateStrategyTwo(matchups);

console.log(`Total score with strategy one: ${scoreOne}`);
console.log(`Total score with strategy two: ${scoreTwo}`);