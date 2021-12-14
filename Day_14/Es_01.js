clear();

let input = document.querySelector("pre").innerText;
input = input.substring(0, input.length - 1).split("\n\n");

let polymer = input[0].split("");

let rules = Object.fromEntries(
	input[1].split("\n").map((r) => {
		return [r.split(" -> ")[0], r.split(" -> ")[1]];
	})
);

for (let step = 1; step <= 10; step++) {
	for (let i = 1; i < polymer.length; i += 2) {
		//console.log(`${i}: ${polymer[i - 1]}${polymer[i]} => ${rules[`${polymer[i - 1]}${polymer[i]}`]}`);
		polymer.splice(i, 0, rules[`${polymer[i - 1]}${polymer[i]}`]);
		//console.log(`${i + 2} ${polymer.length} ${i + 2 < polymer.length}`);
	}
	//console.log(polymer.join(""));
	//console.log(polymer);
}

let letters = new Set(polymer);

let minOccurrences = polymer.filter((x) => x == polymer[0]).length;
let maxOccurrences = minOccurrences;

letters.forEach((l) => {
	let tmp = polymer.filter((x) => x == l).length;
	if (tmp > maxOccurrences) maxOccurrences = tmp;
	if (tmp < minOccurrences) minOccurrences = tmp;
});

console.log(maxOccurrences - minOccurrences);
