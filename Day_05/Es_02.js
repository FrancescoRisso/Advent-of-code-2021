clear();
instructions = document.querySelector("pre").innerText;
instructions = instructions
	.substring(0, instructions.length - 1)
	.split("\n")
	.map((ins) => {
		ins = ins.split(" -> ").map((x) => {
			return x.split(",");
		});
		return {
			from: { x: parseInt(ins[0][0]), y: parseInt(ins[0][1]) },
			to: { x: parseInt(ins[1][0]), y: parseInt(ins[1][1]) }
		};
	});

tmp = new Set();
instructions.forEach((ins) => {
	tmp.add(ins.from.x);
	tmp.add(ins.to.x);
});
maxX = Math.max(...Array.from(tmp));

tmp = new Set();
instructions.forEach((ins) => {
	tmp.add(ins.from.y);
	tmp.add(ins.to.y);
});
maxY = Math.max(...Array.from(tmp));

grid = new Array(maxX + 1).fill(0);
grid.forEach((line, index) => {
	grid[index] = new Array(maxY + 1).fill(0);
});

instructions.forEach((ins) => {
	if (ins.from.x === ins.to.x)
		for (i = Math.min(ins.from.y, ins.to.y); i <= Math.max(ins.from.y, ins.to.y); i++) grid[ins.from.x][i]++;
	else if (ins.from.y === ins.to.y)
		for (i = Math.min(ins.from.x, ins.to.x); i <= Math.max(ins.from.x, ins.to.x); i++) grid[i][ins.from.y]++;
	else {
		max = Math.max(ins.from.x, ins.to.x);
		if ((ins.from.x - ins.to.x) * (ins.from.y - ins.to.y) > 0)
			for (r = Math.min(ins.from.x, ins.to.x), c = Math.min(ins.from.y, ins.to.y); r <= max; r++, c++)
				grid[r][c]++;
		else
			for (r = Math.min(ins.from.x, ins.to.x), c = Math.max(ins.from.y, ins.to.y); r <= max; r++, c--)
				grid[r][c]++;
	}
});

results = [];
grid.forEach((line) => {
	results = results.concat(line);
});

console.log(results.filter((x) => x >= 2).length);
