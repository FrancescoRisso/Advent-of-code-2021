count = 0;

list = document
	.querySelector("pre")
	.innerText.split("\n")
	.map((s) => {
		return parseInt(s);
	});

sums = list.map((n, i) => {
	if (i < list.length - 3) return list[i] + list[i + 1] + list[i + 2];
	else return 0;
});

sums.forEach((n, i) => {
	if (i !== 0 && sums[i] > sums[i - 1]) count++;
});

console.log(count);
