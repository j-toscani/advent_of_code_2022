const alphabetLow = "abcdefghijklmnopqrstuvwxyz";
const alphabetCapital = alphabetLow.toLocaleUpperCase();

const chars = `${alphabetLow}${alphabetCapital}`.split("");
const priorityMap = Object.fromEntries(chars.map((char, index) => [char, index+1]))

export default function getPriorityOf(char) {
    return priorityMap[char];
}
