import fs from "fs";

const [matrixString, rawInstructionString] = fs.readFileSync("./data.txt", { encoding: "utf-8" }).split("\n\n");
const matrix = matrixString.split("\n").map(string => string.split(""));

const rawInstructions = rawInstructionString.split("\n");
const instructions = rawInstructions.map(parseInstruction);

const ropeOne = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];
const ropeTwo = [
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
];
const positions = new Set();

instructions.forEach(applyInstructionTaskOne(ropeTwo));

function applyInstructionTaskOne(rope) {
  return (instruction) => {
    const { x, y } = instruction;

    if (x === 0 && y === 0) {
      console.error("Wrong input. Doing nothing");
      return;
    }
    const direction = x ? "x" : "y";
    const stepValue = instruction[direction] > 0 ? 1 : -1;
    const steps = new Array(Math.abs(instruction[direction])).fill(stepValue);

    let head = rope[0];
    
    for (let step of steps) {
      head[direction] += step;
      let tmpHead = head;

      for (let index = 1; index < rope.length; index++) {
        const tail = rope[index];
        moveTail(tail, tmpHead);

        tmpHead = tail;
      }

      positions.add(`${rope.at(-1).x}, ${rope.at(-1).y}`)
    }

    console.log(rope);
  };
}

function moveTail(tail, head, step) {
  const distance = {
    x: tail.x - head.x,
    y: tail.y - head.y,
  };

  if (Math.abs(distance.x) < 1 && Math.abs(distance.y) < 1) {
    return;
  }

  if (Math.abs(distance.x) > 1) {
    if (Math.abs(distance.y) === 1) {
      tail.y = head.y;
    }
    tail.x += step;
  }

  if (Math.abs(distance.y) > 1) {
    if (Math.abs(distance.x) === 1) {
      tail.x = head.x;
    }
    tail.y += step;
  }
}

function parseInstruction(instruction) {
  const [rawDirection, stepsString] = instruction.split(" ");
  const steps = parseInt(stepsString);
  let vector = { x: 0, y: 0 };

  switch (rawDirection) {
    case "U":
      vector = { y: steps * -1, x: 0 };
      break;
    case "R":
      vector = { x: steps, y: 0 };
      break;
    case "D":
      vector = { y: steps, x: 0 };
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
