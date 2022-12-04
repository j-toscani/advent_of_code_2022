import fs from "fs";
import countOverlapAndContain from "./countOverlapAndContain.mjs";

const data = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const sections = data.split("\n");

const result = countOverlapAndContain(sections);

console.log(
  `${result.containment} sections are fully contained in its pair and ${result.overlap} sections overlap eachother`
);
