import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const [state, procedures] = data.split("\n\n");

const lines = state.split("\n");
const lineNumbers = lines.pop();

const indices = getLineIndices(lineNumbers);
const stacks = getStacks(lines, indices);

const instructions = procedures.split("\n").map(parseProcedures);
instructions.forEach((instruction) =>
  handleInstructionBulk(instruction, stacks)
);

const topCrates = stacks.map((stack) => stack.pop()).join("");
console.log(`The crates on the top are: ${topCrates}`);

function handleInstructionSingle(
  instruction = { from: 1, to: 2, move: 3 },
  stacks = [[]]
) {
  const copy = { ...instruction };

  for (copy.move; copy.move > 0; copy.move--) {
    let element = stacks[copy.from - 1].pop();
    stacks[copy.to - 1].push(element);
  }

  return stacks;
}

function handleInstructionBulk(
  instruction = { from: 1, to: 2, move: 3 },
  stacks = [[]]
) {
  const copy = { ...instruction };

  let elements = stacks[copy.from - 1].splice(instruction.move * -1);

  for (const element of elements) {
    stacks[copy.to - 1].push(element);
  }

  return stacks;
}

function parseProcedures(instruction = "") {
  const number = new RegExp(/[0-9]+/g);
  const match = instruction.match(number).map((match) => parseInt(match));

  return {
    move: match[0],
    from: match[1],
    to: match[2],
  };
}

function getStacks(stackLines = [" [A] "], lineIndices = [3]) {
  const stacks = lineIndices.map((index) => {
    return stackLines
      .map((stack) => (stack[index] !== " " ? stack[index] : false))
      .filter((el) => el)
      .reverse();
  });

  return stacks;
}

function getLineIndices(line = " 1 ") {
  const indices = [];

  for (let index = 0; index < line.length; index++) {
    const char = lineNumbers[index];

    if (isNaN(parseInt(char))) {
      continue;
    }

    indices.push(index);
  }

  return indices;
}
