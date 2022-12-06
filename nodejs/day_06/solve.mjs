import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf-8" }).split("");

const findStartOfPacket = findStartOf(4)
const findStartOfMessage = findStartOf(14)

console.log("Packet starts at: ", findStartOfPacket(data));
console.log("Message starts at: ", findStartOfMessage(data));


function findStartOf(length = 4) {
  return (data) => {
    let start = length;
    for (start; start < (data.length - length); start++) {
      const slice = data.slice(start - length, start);

      if (new Set(slice).size === length) {
        break;
      }
    }
    return start;
  };
}
