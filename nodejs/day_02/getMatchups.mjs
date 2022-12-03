import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function getMatchups() {
    const data = fs.readFileSync(resolve(__dirname, "./data.txt"), {
      encoding: "utf-8",
    });

    return data.split("\n");
}