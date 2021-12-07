clear();
positions = document.querySelector("pre").innerText;
positions = positions
	.substring(0, positions.length - 1)
	.split(",")
	.map((x) => {
		return parseInt(x);
	})
	.sort();

dists = new Set();

max = Math.max(...positions);
for (dst = Math.min(...positions); dst < max; dst++) {
	cnt = 0;
	for (i = 0; i < positions.length; i++) {
		cnt += Math.abs(dst - positions[i]);
	}
	dists.add(cnt);
	console.log(cnt);
}
console.log(Math.min(...dists.values()));
