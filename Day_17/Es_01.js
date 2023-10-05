clear();
let target = document
	.querySelector("pre")
	.innerText.split(": ")[1]
	.split(", ")
	.map((x) => {
		return x
			.slice(2)
			.split("..")
			.map((y) => {
				return parseInt(y);
			});
	});

target = { fromX: target[0][0], toX: target[0][1], fromY: target[1][0], toY: target[1][1] };
//target = { fromX: 20, toX: 30, fromY: -10, toY: -5 };

let speedOk1D = (v, target1D) => {
	let step = 0;
	for (let pos = 0; pos <= target1D.to; pos += v) {
		step++;
		if (pos >= target1D.from && pos <= target1D.to) return true;
		if (v == 0) return false;
		if (v > 0) v -= 1;
		else v += 1;
	}
	return false;
};

let maxH = (vx, target) => {
	let maxY = 0;
	let vxCopy = vx;
	let startVy;

	for (startVy = target.fromY; -startVy - 1 >= target.fromY; startVy++) {
		let x = 0;
		let y = 0;
		let vy = startVy;
		let thisMaxY = 0;
		let valid = false;
		vx = vxCopy;

		for (let step = 0; true; step++) {
			x += vx;
			if (vx > 0) vx--;
			else if (vx < 0) vx++;

			y += vy;
			vy--;

			console.log(`(${x}, ${y})`);

			thisMaxY = Math.max(thisMaxY, y);

			if (x > target.toX || y < target.fromY) {
				console.log(`(${x}, ${y}) overshoot: startVy = ${startVy} (${step + 1} steps)`);
				break;
			}

			if (x >= target.fromX && x <= target.toX && y <= target.toY && y >= target.fromY) {
				console.log(`(${x}, ${y}) target: startVy = ${startVy}, thisMaxY = ${thisMaxY} (${step + 1} steps)`);
				valid = true;
				break;
			}
		}

		if (valid) maxY = Math.max(maxY, thisMaxY);
	}
	console.log(`QUIT: ${startVy}`);
	return maxY;
};

let v;

for (v = 1; !speedOk1D(v, { from: target.fromX, to: target.fromX }); v++) {}

let minVx = v - 1;
let maxVx = target.toX;

let maxHeight = 0;
for (let vx = minVx; vx <= maxVx; vx++) {
	console.log(vx);
	let tmp = maxH(vx, target);
	console.log(`vx = ${vx}, maxH => ${tmp}`);
	maxHeight = Math.max(maxHeight, tmp);
}

console.log(maxHeight);
