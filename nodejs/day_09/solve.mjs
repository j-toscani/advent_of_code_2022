import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const rawInstructions = data.split("\n");
const instructions = rawInstructions.map(parseInstruction);
const ropeOne = new Array(2).fill({ x: 0, y: 0 });
const ropeTwo = new Array(9).fill({ x: 0, y: 0 });
const positions = new Set();

instructions.forEach(applyInstructionTaskOne());

console.log(positions.size);

function applyInstructionTaskOne() {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  return (instruction) => {
    const { x, y } = instruction;

    if (x === 0 && y === 0) {
      console.error("Wrong input. Doing nothing");
      return;
    }

    const direction = x ? "x" : "y";
    const stepValue = instruction[direction] > 0 ? 1 : -1;
    const steps = new Array(Math.abs(instruction[direction])).fill(stepValue);

    for (let step of steps) {
      head[direction] += step;

      moveTail(tail, head);
      positions.add(`${tail.x} ${tail.y}`);
    }
  };
}

function moveTail(tail, head) {
  const distance = {
    x: tail.x - head.x,
    y: tail.y - head.y,
  };

  if (Math.abs(distance.x) <= 1 && Math.abs(distance.y) <= 1) {
    return;
  }

  if (Math.abs(distance.x) > 1) {
    if (Math.abs(distance.y) === 1) {
      tail.y = head.y;
    }
    tail.x += distance.x;
  }

  if (Math.abs(distance.y) > 1) {
    if (Math.abs(distance.x) === 1) {
      tail.x = head.x;
    }
    tail.y += distance.y;
  }
}

function parseInstruction(instruction) {
  const [rawDirection, stepsString] = instruction.split(" ");
  const steps = parseInt(stepsString);
  let vector = { x: 0, y: 0 };

  switch (rawDirection) {
    case "U":
      vector = { y: steps, x: 0 };
      break;
    case "R":
      vector = { x: steps, y: 0 };
      break;
    case "D":
      vector = { y: steps * -1, x: 0 };
      break;
    case "L":
      vector = { x: steps * -1, y: 0 };
      break;
    default:
      console.error("Unknown Instructions: ", instruction);
      break;
  }

  return vector;
}
