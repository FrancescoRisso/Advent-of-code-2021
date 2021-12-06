clear();
input = document.querySelector("pre").innerText;
input = input
	.substring(0, input.length - 1)
	.split(",")
	.map((x) => {
		return parseInt(x);
	});

// ages[n] stores how many lanternfishes have age n
ages = new Array(9).fill(0);

input.forEach((n) => {
	ages[n]++;
});

for (day = 0; day < 256; day++) {
	ages.push(ages.shift());
	ages[6] += ages[8];
}

console.log(
	ages.reduce((prev, next) => {
		return prev + next;
	})
);
