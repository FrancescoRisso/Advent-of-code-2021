clear();
all = document.querySelector("pre").innerText;
all = all
	.substring(0, all.length - 1)
	.split("\n")
	.map((x) => {
		return x.split(" | ");
	});

input = all.map((s) => {
	return s[0].split(" ");
});

output = all.map((s) => {
	return s[1].split(" ");
});

val = output.reduce((prev, next) => {
	return (
		prev +
		next.reduce((p, n) => {
			return p + parseInt([2, 3, 4, 7].includes(n.length) ? 1 : 0);
		}, 0)
	);
}, 0);

console.log(val);
