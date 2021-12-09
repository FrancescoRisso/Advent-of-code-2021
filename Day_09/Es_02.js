clear();
heights = document.querySelector("pre").innerText;
heights = heights
	.substring(0, heights.length - 1)
	.split("\n")
	.map((x) => {
		return x.split("").map((y) => {
			return parseInt(y);
		});
	});

sol = [];

setCode = {};
addN = (x, y, n) => {
	if (!setCode[x]) setCode[x] = {};
	setCode[x][y] = n;
};

add = (x, y) => {
	if (!setCode[x]) setCode[x] = {};
	setCode[x][y] = true;
};

has = (x, y) => {
	return !!(setCode[x] && setCode[x][y]);
};

basinDimension = (row, col, dim, depth) => {
	//console.log(`basinDimension(${row}, ${col}, ${dim}, ${depth})`);
	if (row != -1 && col != -1 && row != heights.length && col != heights[row].length && heights[row][col] != 9) {
		dim++;
		add(row, col);

		if (col != 0 && !has(row, col - 1)) dim = basinDimension(row, col - 1, dim, depth + 1);
		if (col != heights[row].length - 1 && !has(row, col + 1)) dim = basinDimension(row, col + 1, dim, depth + 1);
		if (row != heights.length - 1 && !has(row + 1, col)) dim = basinDimension(row + 1, col, dim, depth + 1);
		if (row != 0 && !has(row - 1, col)) dim = basinDimension(row - 1, col, dim, depth + 1);
	}

	return dim;
};

// TO VISUALIZE THE MAP OF NON-NINES

/*p = document.createElement("pre");
p.style.wordWrap = "break-word";
p.style.whiteSpace = "pre-wrap";
p.innerText = "";
s = "";
heights.forEach((row) => {
	row.forEach((el) => {
		if (el == 9) s = `${s} `;
		else s = `${s}${String.fromCharCode(9608)}`;
	});
	s = `${s}\n`;
});
p.innerText = s;
document.querySelector("pre").insertAdjacentElement("afterend", p);*/

sol = [];

heights.forEach((rowList, row) => {
	rowList.forEach((el, col) => {
		cnt = 0;

		if (row == 0) cnt++;
		else if (heights[row - 1][col] > el) cnt++;

		if (col == 0) cnt++;
		else if (rowList[col - 1] > el) cnt++;

		if (row == heights.length - 1) cnt++;
		else if (heights[row + 1][col] > el) cnt++;

		if (col == rowList.length - 1) cnt++;
		else if (rowList[col + 1] > el) cnt++;

		if (cnt == 4) {
			sol.push(basinDimension(row, col, 0, 0));
			//console.log(sol);
		}
	});
});

sorted = sol.sort((a, b) => {
	return b - a;
});

console.log(sorted[0] * sorted[1] * sorted[2]);
