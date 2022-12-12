import fs from "fs";

class Cylce {
  constructor(value = 1) {
    this.pre = value;
    this.during = value;
    this.post = value;
  }
}

const lines = fs.readFileSync("data.txt", { encoding: "utf-8" }).split("\n");
let lastValue = 1;
const cycles = [];
lines.forEach(parseLine);
const drawMatrix = Array.from(new Array(6), () => []);

cycles.forEach((cycle, index) => {
  const column = index % 40;
  const row = Math.floor(index / 40);
  drawMatrix[row][column] = [column - 1, column, column + 1].includes(
    cycle.during
  )
    ? "#"
    : ".";
});

console.log(
  "What is the sum of these six signal strengths?",
  sumImportantCycles()
);
console.log("What eight capital letters appear on your CRT?");
console.log(drawMatrix.map((row) => row.join("")));

function parseLine(line = "") {
  const cycle = new Cylce(lastValue);
  cycles.push(cycle);
  if (line === "noop") {
    return;
  } else {
    const [_, value] = line.split(" ");
    const newCycle = new Cylce(lastValue);
    lastValue = lastValue + parseInt(value);
    newCycle.post = lastValue;
    cycles.push(newCycle);
  }
}

function sumImportantCycles() {
  const readings = [];

  for (let index = 19; index < cycles.length; index += 40) {
    readings.push(getSignalStrength(index));
  }

  return readings.reduce((acc, curr) => acc + curr, 0);
}

function getSignalStrength(index) {
  return cycles[index].during * (index + 1);
}
