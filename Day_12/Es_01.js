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

let explorePath = (visited, start) => {
	if (start === "end") {
		pathsCount++;
		return;
	}

	if (start.toLowerCase() === start && visited.includes(start)) return;

	edges[start].forEach((vertice) => {
		visited.push(start);
		explorePath(visited, vertice);
		visited.pop();
	});
};

explorePath([], "start");

console.log(pathsCount);
