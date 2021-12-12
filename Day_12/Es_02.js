clear();

let input = document.querySelector("pre").innerText;
input = input.substring(0, input.length - 1).split("\n");

let edges = {};
input.forEach((edge) => {
	edge = edge.split("-");

	if (!Object.keys(edges).includes(edge[0])) edges[edge[0]] = new Set();
	edges[edge[0]].add(edge[1]);

	if (!Object.keys(edges).includes(edge[1])) edges[edge[1]] = new Set();
	edges[edge[1]].add(edge[0]);
});

let pathsCount = 0;
let exploredPaths = new Set();

let explorePath = (visited, start, smallCaveVisitedTwice) => {
	if (start === "end") {
		let sorted = [...visited].sort((a, b) => a.localeCompare(b));
		if (!exploredPaths.has(sorted)) pathsCount++;
		exploredPaths.add(sorted);
		return;
	}

	if (start.toLowerCase() === start && visited.includes(start)) {
		if (smallCaveVisitedTwice || start == "start") return;
		else smallCaveVisitedTwice = true;
	}

	edges[start].forEach((vertice) => {
		visited.push(start);
		explorePath(visited, vertice, smallCaveVisitedTwice);
		visited.pop();
	});
};

explorePath([], "start", false);

console.log(pathsCount);
