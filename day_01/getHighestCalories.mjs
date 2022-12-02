import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(resolve(__dirname, "./data.txt"), {
  encoding: "utf-8",
});

const elves = data.split("\n\n");
const sums = elves.map(getSum).sort(sortDescending);

const topThree = sums.slice(0,3);
const highest = sums[0];

console.log("How many total Calories is that Elf carrying?")
console.log("Answer: ", highest, "\n");

console.log("How many Calories are those Elves carrying in total?");
console.log("Answer: ", topThree);

function sortDescending(a,b){
    return b - a
}

function getSum(snacks) {
  const snackArray = snacks.split("\n");
  return snackArray.reduce((acc, curr) => acc + parseInt(curr), 0);
}
