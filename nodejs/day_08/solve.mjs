import fs from "fs";

const data = fs.readFileSync("./data.txt", { encoding: "utf-8"});
const rows = data.split("\n");

// remove empty array at end
const elements = rows.map(row => row.split("").map((el) => parseInt(el)));
const visibilityMap = elements.map(row => row.map(() => false));
const viewScoreMap = elements.map(row => row.map(() => 0));

elements.forEach((row, y) => row.forEach((_element, x) => checkDirections(elements, x, y)))
elements.forEach((row, y) => row.forEach((_element, x) => checkViewingDistance(x, y)))

console.log(`There are ${countVisibleTrees()} trees visible from the outside.`);
console.log(`There are ${Math.max(...viewScoreMap.flat())} trees visible from the outside.`);

function countVisibleTrees() {
    return visibilityMap.flat().reduce((acc, curr) => acc + Number(curr), 0)
}

function checkViewingDistance(x,y) {
    const row = elements[y];
    const column = getColumn(x);
    const tree = elements[y][x];

    const distances = {top : 0, right : 0, bottom : 0, left: 0};

    for (let index = y - 1; index >= 0; index-- ) {
        distances.top++
        if (column[index] >= tree) {
            break;
        }
    }
    for (let index = x + 1; index < row.length; index++ ) {
        distances.right++
        if (row[index] >= tree) {
            break;
        }
    }
    for (let index = y + 1; index < column.length; index++ ) {
        distances.bottom++
        if (column[index] >= tree) {
            break;
        }
    }
    for (let index = x - 1; index >= 0; index-- ) {
        distances.left++
        if (row[index] >= tree) {
            break;
        }
    }
    const {top, left, right, bottom} = distances;
    viewScoreMap[y][x] = top * right * left * bottom;
}

function checkDirections(elements, x, y) {
    let isVisible = false;
    const treeHeight = elements[y][x];

    // visible from left
    const fromLeft = elements[y].slice(0, x);
    isVisible = checkDirection(fromLeft, treeHeight);
    
    if (!isVisible) {
    // visible from right
    const fromRight = elements[y].slice(x + 1);
    isVisible = checkDirection(fromRight, treeHeight, true);
    }
    
    const column = getColumn(x);
    
    if(!isVisible) {
    // visible from bottom 
    const fromBottom = column.slice(y + 1);
    isVisible = checkDirection(fromBottom, treeHeight, true);
    }

    if(!isVisible) {
    // visible from top
    const fromTop = column.slice(0, y);
    isVisible = checkDirection(fromTop, treeHeight);
    }

    visibilityMap[y][x] = isVisible;
}

function getColumn(x) {
    return elements.map(row => row[x]);
}

function checkDirection(trees, tree) {
    return trees.every(el => el < tree)
}
