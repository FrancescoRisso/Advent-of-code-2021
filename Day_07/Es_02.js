clear();
positions = document.querySelector("pre").innerText;
positions = positions
	.substring(0, positions.length - 1)
	.split(",")
	.map((x) => {
		return parseInt(x);
	})
	.sort();

consumption = new Set();

max = Math.max(...positions);
for (dst = Math.min(...positions); dst < max; dst++) {
	cnt = 0;
	for (i = 0; i < positions.length; i++) {
		from = Math.min(dst, positions[i]);
		to = Math.max(dst, positions[i]);
		localCnt = 0;
		for (k = from; k < to; k++) {
			localCnt += k - from + 1;
		}
		cnt += localCnt;
	}
	consumption.add(cnt);
	console.log(`${dst} ${cnt}`);
}
console.log(Math.min(...consumption.values()));
