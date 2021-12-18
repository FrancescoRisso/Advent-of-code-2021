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

let minDangerToEnd = dangerLevel.map((row) => {
	return row.map((el) => 0);
});

let maxRec = dangerLevel.length * dangerLevel[0].length;

let minDangerPath = (rec) => {
	for (let i = 0; i < maxRec; i++) {
		let choice = frontier
			.sort((a, b) => {
				return a.dist - b.dist;
			})
			.shift();

		//console.log(choice);

		if (choice.row == 0 && choice.col == 0) return choice.dist;

		minDangerToEnd[choice.row][choice.col] = choice.dist;

		if (choice.row !== 0 && minDangerToEnd[choice.row - 1][choice.col] === 0) {
			let above = {
				row: choice.row - 1,
				col: choice.col,
				dist: choice.dist + dangerLevel[choice.row - 1][choice.col]
			};
			if (frontier.filter((x) => x.row === above.row && x.col === above.col).length === 0) frontier.push(above);
		}

		if (choice.col !== 0 && minDangerToEnd[choice.row][choice.col - 1] === 0) {
			let left = {
				row: choice.row,
				col: choice.col - 1,
				dist: choice.dist + dangerLevel[choice.row][choice.col - 1]
			};
			if (frontier.filter((x) => x.row === left.row && x.col === left.col).length === 0) frontier.push(left);
		}

		if (choice.row !== dangerLevel.length - 1 && minDangerToEnd[choice.row + 1][choice.col] === 0) {
			let below = {
				row: choice.row + 1,
				col: choice.col,
				dist: choice.dist + dangerLevel[choice.row + 1][choice.col]
			};
			if (frontier.filter((x) => x.row === below.row && x.col === below.col).length === 0) frontier.push(below);
		}

		if (choice.col !== dangerLevel[choice.row].length - 1 && minDangerToEnd[choice.row][choice.col - 1] === 0) {
			let right = {
				row: choice.row,
				col: choice.col - 1,
				dist: choice.dist + dangerLevel[choice.row][choice.col + 1]
			};
			if (frontier.filter((x) => x.row === right.row && x.col === right.col).length === 0) frontier.push(right);
		}
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
