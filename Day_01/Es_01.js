count = 0;

list = document
	.querySelector("pre")
	.innerText.split("\n")
	.map((s) => {
		return parseInt(s);
	});

list.forEach((n, i) => {
	if (i !== 0 && list[i] > list[i - 1]) count++;
});

console.log(count);
