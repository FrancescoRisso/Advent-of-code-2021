digits = document
	.querySelector("pre")
	.innerText.split("\n")
	.map((l) => {
		return l.split("").map((v) => {
			return parseInt(v);
		});
	});

var zeros = digits[0].map(() => {
	return 0;
});
var ones = digits[0].map(() => {
	return 0;
});
var gamma = digits[0].map(() => {
	return 0;
});
var epsilon = digits[0].map(() => {
	return 0;
});

digits.forEach((d) => {
	for (let i = 0; i < d.length; i++) {
		if (d[i] == 0) zeros[i]++;
		else ones[i]++;
	}
});

for (let i = 0; i < gamma.length; i++) {
	if (zeros[i] > ones[i]) {
		gamma[i] = 0;
		epsilon[i] = 1;
	} else {
		gamma[i] = 1;
		epsilon[i] = 0;
	}
}

gamma = parseInt(gamma.join(""), 2);
epsilon = parseInt(epsilon.join(""), 2);

console.log(gamma * epsilon);
