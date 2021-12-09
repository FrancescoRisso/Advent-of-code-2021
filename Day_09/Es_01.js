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

sol = 0;

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

		if (cnt == 4) sol += el + 1;
	});
});

console.log(sol)
