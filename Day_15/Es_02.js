clear();
let dangerLevel = document.querySelector("pre").innerText;
dangerLevel = dangerLevel
	.substring(0, dangerLevel.length - 1)
	.split("\n")
	.map((x) => {
		return x.split("").map((y) => {
			return parseInt(y);
		});
	});

dangerLevel = dangerLevel.map((row) => {
	let rowList = [[...row]];
	for (i = 0; i < 4; i++) {
		rowList.push(rowList[i].map((val) => 1 + (val % 9)));
	}
	return rowList.flat();
});

let rowList = [dangerLevel];
for (i = 0; i < 4; i++) {
	rowList.push(rowList[i].map((row) => row.map((val) => 1 + (val % 9))));
}
dangerLevel = rowList.flat();

let minDangerToEnd = dangerLevel.map((row) => {
	return row.map((el) => 0);
});

let maxRec = dangerLevel.length * dangerLevel[0].length;
console.log(maxRec);

let minDangerPath = (rec) => {
	for (let i = 0; i < maxRec; i++) {
		//console.log([...frontier]);
		let choice = frontier
			.sort((a, b) => {
				return a.dist - b.dist;
			})
			.shift();

		if (choice.row == 0 && choice.col == 0) return choice.dist;

		minDangerToEnd[choice.row][choice.col] = choice.dist;

		//console.log(choice);
		//console.log([...minDangerToEnd.map((x) => [...x])]);

		let adjacents = [];

		if (choice.row !== 0 && minDangerToEnd[choice.row - 1][choice.col] === 0) {
			// above
			adjacents.push({
				row: choice.row - 1,
				col: choice.col,
				dist: choice.dist + dangerLevel[choice.row - 1][choice.col]
			});
		}

		if (choice.col !== 0 && minDangerToEnd[choice.row][choice.col - 1] === 0) {
			// left
			adjacents.push({
				row: choice.row,
				col: choice.col - 1,
				dist: choice.dist + dangerLevel[choice.row][choice.col - 1]
			});
		}

		if (choice.row !== dangerLevel.length - 1 && minDangerToEnd[choice.row + 1][choice.col] === 0) {
			// below
			adjacents.push({
				row: choice.row + 1,
				col: choice.col,
				dist: choice.dist + dangerLevel[choice.row + 1][choice.col]
			});
		}

		if (choice.col !== dangerLevel[choice.row].length - 1 && minDangerToEnd[choice.row][choice.col + 1] === 0) {
			// Right
			adjacents.push({
				row: choice.row,
				col: choice.col + 1,
				dist: choice.dist + dangerLevel[choice.row][choice.col + 1]
			});
		}

		//console.log(...adjacents);

		adjacents.forEach((adjacent) => {
			let frontierFilter = frontier.filter((x) => x.row === adjacent.row && x.col === adjacent.col);
			if (frontierFilter.length === 0) frontier.push(adjacent);
			else if (frontierFilter[0].dist > adjacent.dist + dangerLevel[adjacent.row][adjacent.col]) {
				frontier.splice(frontier.indexOf(frontierFilter[0]), 1);
				frontier.push(adjacent);
			}
		});
	}
};
let bottomRight = { row: dangerLevel.length - 1, col: dangerLevel[dangerLevel.length - 1].length - 1 };

let frontier = [];
if (bottomRight.row != 0)
	frontier.push({
		row: bottomRight.row - 1,
		col: bottomRight.col,
		dist: dangerLevel[bottomRight.row][bottomRight.col] + dangerLevel[bottomRight.row - 1][bottomRight.col]
	});
if (bottomRight.col != 0)
	frontier.push({
		row: bottomRight.row,
		col: bottomRight.col - 1,
		dist: dangerLevel[bottomRight.row][bottomRight.col] + dangerLevel[bottomRight.row][bottomRight.col - 1]
	});

minDangerToEnd[bottomRight.row][bottomRight.col] = dangerLevel[bottomRight.row][bottomRight.col];

console.log(minDangerPath(0) - dangerLevel[0][0]);
//console.log(minDangerPath(0));
