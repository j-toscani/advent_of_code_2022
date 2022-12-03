import fs from "fs";
import checkCompartments from "./checkCompartments.mjs";
import checkGroupRucksacks from "./checkGroupRucksacks.mjs";

const data = fs.readFileSync("./data.txt", {encoding: "utf-8"});
const rucksacks = data.split("\n");

const sum = checkCompartments(rucksacks);
const badgeSum = checkGroupRucksacks(rucksacks)

console.log(`The priority score of all compartments is: ${sum}`);
console.log(`The priority score of all rucksacks is: ${badgeSum}`);