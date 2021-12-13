clear();

let input = document.querySelector("pre").innerText;
input = input.substring(0, input.length - 1).split("\n\n");

let dots = input[0].split("\n").map((p) => {
	return p.split(",");
});

let folds = input[1].split("\n").map((f) => {
	return { direction: f.split(" ")[2].split("=")[0], point: f.split(" ")[2].split("=")[1] };
});

let dimX = Math.max(...dots.map((x) => x[0])) + 1 + 1; //This last +1 magically fixes everything
let dimY = Math.max(...dots.map((x) => x[1])) + 1 + 2; //This last +2 magically fixes everything

let grid = [...Array(dimY).keys()].map(() => {
	return Array(dimX).fill(".");
});

dots.forEach((dot) => {
	grid[dot[1]][dot[0]] = "#";
});

folds.forEach((fold) => {
	console.log(`${grid.length} x ${grid[0].length}`);
	if (fold.direction === "x") {
		grid = grid.map((row) => {
			return row.slice(0, fold.point).map((el, index) => {
				if (el === "#" || (row.length - index - 1 != fold.point && row[row.length - index - 1] === "#"))
					return "#";
				return ".";
			});
		});
	} else {
		grid = grid.slice(0, fold.point).map((row, rowIndex) => {
			return row.map((el, colIndex) => {
				if (
					el === "#" ||
					(grid.length - rowIndex - 1 != fold.point && grid[grid.length - rowIndex - 1][colIndex] === "#")
				)
					return "#";
				return ".";
			});
		});
	}
});

console.log(
	grid
		.map((r) =>
			r
				.map((c) => {
					if (c === ".") return " ";
					return String.fromCharCode(9608);
				})
				.join("")
		)
		.join("\n")
);
