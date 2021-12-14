clear();

let input = document.querySelector("pre").innerText;
input = input.substring(0, input.length - 1).split("\n\n");

let polymer = input[0].split("");

let rules = Object.fromEntries(
	input[1].split("\n").map((r) => {
		return [r.split(" -> ")[0], r.split(" -> ")[1]];
	})
);

let couplesCounter = Object.fromEntries(Object.keys(rules).map((r) => [r, 0]));

for (let i = 0; i < polymer.length - 1; i++) {
	couplesCounter[`${polymer[i]}${polymer[i + 1]}`]++;
}

for (let step = 1; step <= 40; step++) {
	//console.log(couplesCounter);
	let couplesCounterCopy = Object.fromEntries(Object.keys(rules).map((r) => [r, 0]));
	Object.entries(rules).forEach((rule) => {
		couplesCounterCopy[`${rule[0][0]}${rule[1]}`] += couplesCounter[rule[0]];
		couplesCounterCopy[`${rule[1]}${rule[0][1]}`] += couplesCounter[rule[0]];
	});

	couplesCounter = couplesCounterCopy;
}

let letters = Object.fromEntries(Array.from(new Set(Object.values(rules))).map((l) => [l, 0]));

Object.entries(couplesCounter).forEach(([couple, count]) => {
	letters[couple[0]] += count;
	letters[couple[1]] += count;
});

let max = Math.ceil(Math.max(...Object.values(letters)) / 2);
let min = Math.ceil(Math.min(...Object.values(letters)) / 2);

console.log(max - min);
