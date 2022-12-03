import getPriorityOf from "./getPriorityOf.mjs";

export default function checkCompartments(compartments = ["ab"]) {
    const priorities = compartments.map(checkRucksacks)
    return priorities.reduce((acc, prev) => acc + prev, 0)
}

function checkRucksacks(rucksack = "ab") {
    const size = rucksack.length;
    const [firstCompartment, secondCompartment] = [rucksack.substring(0, size/2).split(""), rucksack.substring(size/2).split("")]

    const checked = {};

    for (const char of firstCompartment) {
        if (checked[char]) {
            continue;
        }

        if (secondCompartment.includes(char)) {
            return getPriorityOf(char);
        }

        checked[char] = true;
    }
}