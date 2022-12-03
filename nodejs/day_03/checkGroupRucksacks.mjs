import getPriorityOf from "./getPriorityOf.mjs";

export default function checkGroupRucksacks(rucksacks = ["ab"]) {
    let score = 0;

    for (let index = 0; index * 3 < rucksacks.length; index++) {
        const groupRucksacks = getNthGroup(rucksacks, index);
        score += checkGroup(groupRucksacks);
    }

    return score;
}

function checkGroup(rucksacks = [[]]) {
    const checked = {};

    for (const char of rucksacks[0]) {
        if (checked[char]) {
            continue
        }

        if (rucksacks[1].includes(char) && rucksacks[2].includes(char)) {
            return getPriorityOf(char);
        }

        checked[char] = true;
    }
}

function getNthGroup(rucksacks = [], groupNumber) {
    const start = groupNumber * 3;
    return rucksacks.slice(start, start + 3).map(rucksack => rucksack.split(""));
}