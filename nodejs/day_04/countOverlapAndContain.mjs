export default function countOverlapAndContain(sections) {
    const store = {
        containment: 0,
        overlap: 0,
    }

    for (const section of sections) {
        const sorted = getSortedSections(section)
        store.containment += Number(checkContainment(sorted));
        store.overlap += Number(checkOverlap(sorted))
    }

    return store
}

function getSortedSections(section) {
  const splits = splitPairs(section.split(","));
  return sortPairs(splits);
}

function checkOverlap(sorted) {
    const [bigger, smaller] = sorted;
    return bigger[0] <= smaller[1] && bigger[1] >= smaller[0] 
}

function checkContainment(sorted) {
    return sorted[0][0] <= sorted[1][0] && sorted[0][1] >= sorted[1][1]
}

function splitPairs(pairs = ["ba"]) {
  return pairs.map((pair) => pair.split("-").map((string) => parseInt(string)));
}

function sortPairs(pairs = [[1, 2]]) {
  const [first, second] = pairs;
  const lengthFirst = first[1] - first[0];
  const lengthSecond = second[1] - second[0];

  return lengthFirst > lengthSecond ? [first, second] : [second, first];
}
