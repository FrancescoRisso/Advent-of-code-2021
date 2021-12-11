clear();

let matrix = document.querySelector("pre").innerText;
matrix = matrix.substring(0, matrix.length - 1).split("\n");

matrix = matrix.map((line) => {
	return Array.from(line).map((char) => {
		return parseInt(char);
	});
});

let incrementAndFlash = (row, col, increment) => {
	//console.log(`incrementAndFlash(${row}, ${col}, ${increment})`);

	if (increment) {
		if (matrix[row][col] != 10) {
			matrix[row][col]++;
			incremented = true;
			//console.log(`Incrementing (${row}, ${col}) to value ${matrix[row][col]} (start)`);
		}
	}
	if (matrix[row][col] == 10) {
		//console.log(`(${row}, ${col}) flashed (value ${matrix[row][col]})`);
		flashCount++;
		matrix[row][col] = 0;

		if (row - 1 >= 0 && col - 1 >= 0 && matrix[row - 1][col - 1] != 0) incrementAndFlash(row - 1, col - 1, true);
		if (row - 1 >= 0 && matrix[row - 1][col] != 0) incrementAndFlash(row - 1, col, true);
		if (row - 1 >= 0 && col + 1 < matrix[row - 1].length && matrix[row - 1][col + 1] != 0)
			incrementAndFlash(row - 1, col + 1, true);

		if (col - 1 >= 0 && matrix[row][col - 1] != 0) incrementAndFlash(row, col - 1, true);
		if (col + 1 < matrix[row].length && matrix[row][col + 1] != 0) incrementAndFlash(row, col + 1, true);

		if (row + 1 < matrix.length && col - 1 >= 0 && matrix[row + 1][col - 1] != 0)
			incrementAndFlash(row + 1, col - 1, true);
		if (row + 1 < matrix.length && matrix[row + 1][col] != 0) incrementAndFlash(row + 1, col, true);
		if (row + 1 < matrix.length && col + 1 < matrix[row + 1].length && matrix[row + 1][col + 1] != 0)
			incrementAndFlash(row + 1, col + 1, true);
	}
};

let iterations = 0;

while (true) {
	/*console.log(
		matrix.map((r) => {
			return [...r];
		})
		);*/
	let tmp = matrix.flat().filter((x) => {
		return x == matrix[0][0];
	});
	if (tmp.length == matrix.length * matrix[0].length) break;
	matrix.forEach((r, row) => {
		r.forEach((_, col) => {
			matrix[row][col]++;
		});
	});
	matrix.forEach((row, rowIndex) => {
		row.forEach((el, colIndex) => {
			incrementAndFlash(rowIndex, colIndex, false);
		});
	});
	iterations++;
	if (iterations > 259) break;
}

console.log(iterations);
