import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const rawInstructions = data.split("\n");
const instructions = rawInstructions.map(parseInstruction);
const positions = new Set();

instructions.forEach(createLogMove());
console.log(positions.size);

function createLogMove() {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  return (instruction) => {
    const { direction, steps } = instruction;
    const counterDirection = direction === "x" ? "y" : "x";

    for (let step of steps) {
      head[direction] += step;

      const distance = {
        x: Math.abs(tail.x - head.x),
        y: Math.abs(tail.y - head.y),
      };

      if (distance[counterDirection] === 1 && distance[direction] > 1) {
        tail[counterDirection] = head[counterDirection];
      }

      if (distance[direction] > 1) {
        tail[direction] += step;
      }

      positions.add(`${tail.x} ${tail.y}`)
    }

 };
}

function parseInstruction(instruction) {
  const [rawDirection, stepsString] = instruction.split(" ");
  const steps = parseInt(stepsString);

  switch (rawDirection) {
    case "U":
      return { direction: "y", steps: new Array(steps).fill(-1) };
    case "R":
      return { direction: "x", steps: new Array(steps).fill(1) };
    case "D":
      return { direction: "y", steps: new Array(steps).fill(1) };
    case "L":
      return { direction: "x", steps: new Array(steps).fill(-1) };
    default:
      console.error("Unknown Instructions: ", instruction);
      return { direction: "x", steps: [] };
  }
}

