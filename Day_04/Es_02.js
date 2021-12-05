clear();
boards = document.querySelector("pre").innerText;
boards = boards.substring(0, boards.length - 1).split("\n\n");
drawn = boards
	.shift()
	.split(",")
	.map((x) => {
		return parseInt(x);
	});

boards = boards.map((board) => {
	return board.split("\n").map((row) => {
		if (row.charAt(0) == " ") row = row.substring(1);
		return row
			.replaceAll("  ", " ")
			.split(" ")
			.map((n) => {
				return parseInt(n);
			});
	});
});

drawnCnt = 0;

checkRow = (b, row) => {
	return b[row].filter((x) => x == 0).length == 5;
};

checkCol = (b, col) => {
	for (let i = 0; i < 5; i++) if (b[i][col] != 0) return false;
	return true;
};

let winner = null;
let n;

extraction = () => {
	for (bn = 0; bn < boards.length; bn++) {
		b = boards[bn];
		for (index = 0; index < b.length; index++) {
			row = b[index];
			col = row.indexOf(n);
			if (col != -1) {
				row[col] = 0;
				if (checkRow(b, index) || checkCol(b, col)) {
					if (boards.length != 1) {
						boards.splice(bn, 1);
						bn--;
					}
					else {
						winner = b;
						return true;
					}
				}
			}
		}
	}
	return false;
};

do {
	n = drawn.shift();
	console.log(n);
} while (!extraction() && drawn.length != 0);

val = winner.map((row) => row.reduce((prev, current) => prev + current)).reduce((prev, current) => prev + current);
console.log(n * val);
