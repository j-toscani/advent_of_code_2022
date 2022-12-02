const data = require("./data");

const store = {
    highest: 0,
    current: 0,
    all: [],
    getTopThreeSum: () => {
        const topThree = store.all.sort((a,b) => a-b).slice(-3)
        return topThree.reduce((acc, curr) => acc + curr, 0)
    }
}

for (const entry of data) {
    if (entry === '') {
        const newHighest = store.current > store.highest;
        store.highest = newHighest ? store.current : store.highest;
        store.all.push(store.current);
        store.current = 0;
        continue
    } else {
        const number = parseInt(entry);
        store.current += number;
    }
}

console.log(store.highest, store.getTopThreeSum());