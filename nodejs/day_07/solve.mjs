import fs from "fs";

class Directory {
  constructor(parent, name, children = new Map()) {
    this.parent = parent;
    this.name = name;
    this.children = children;
  }

  to(path) {
    switch (path) {
      case "/":
        return fileTree.root;
      case "..":
        return this.parent;
      default:
        return this.children.get(path);
    }
  }

  getScore(onScoreCalculated) {
    let score = 0;

    this.children.forEach((value, key) => {
      if (value instanceof Directory) {
        score += value.getScore(onScoreCalculated);
      } else {
        score += value.score;
      }
    });

    onScoreCalculated(this, score);
    return score;
  }
}

class File {
  constructor(parent, name, score) {
    this.parent = parent;
    this.score = parseInt(score);
    this.name = name;
  }
}

const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = data.split("\n");

let currentDir = new Directory(null, "root", new Map());
const fileTree = {
  root: currentDir,
};

lines.forEach(parseLine);
const usedSpace = fileTree.root.getScore(() => {});
const minimumFolderSize = getMinumumFolderSize(usedSpace);

console.log("The sum of all folders with maxsize 100000, is: ", getSumOfFolders(100000))
console.log("The optimal folder to delete has a size of : ", getOptimalFolderToDelete())

function getSumOfFolders(threshhold) {
  let combinedScore = 0;

  fileTree.root.getScore((_dir, score) => {
    if (score <= threshhold) {
      combinedScore += score;
    }
  });

  return combinedScore;
}

function getOptimalFolderToDelete() {
  let smallest = usedSpace;

  fileTree.root.getScore((_dir, score) => {
    if (score > smallest) {
      return;
    }

    if (score < smallest && score >= minimumFolderSize) {
      smallest = score;
    }
  });

  return smallest;
}

function getMinumumFolderSize(usedSpace) {
  const totalDiskSpace = 70000000;
  const requiredSpace = 30000000;

  const availableSpace = totalDiskSpace - usedSpace;
  return requiredSpace - availableSpace;
}

function parseLine(line) {
  if (line[0] === "$") {
    parseCommand(line);
  } else {
    parseDirContent(currentDir, line);
  }
}

function parseCommand(line) {
  const [command, input] = line.split(" ").slice(1);
  switch (command) {
    case "ls":
      break;
    case "cd":
      currentDir = currentDir.to(input) ? currentDir.to(input) : fileTree.root;
      break;

    default:
      throw Error("Unknown command!");
  }
}

function parseDirContent(currentDir = new Directory(), line) {
  const parts = line.split(" ");
  const isDir = parts[0] === "dir";

  const name = parts[1];

  currentDir.children.set(
    name,
    isDir
      ? new Directory(currentDir, name, new Map())
      : new File(currentDir, name, parts[0])
  );
}
