x = 0;
y = 0;
aim = 0;

commands = document
	.querySelector("pre")
	.innerText.split("\n")
	.map((l) => {
		l = l.split(" ");
		return { direction: l[0], val: parseInt(l[1]) };
	});

commands.forEach((com) => {
	if (com.direction === "forward") {
		x += com.val;
		y += aim * com.val;
	} else {
		if (com.direction === "up") aim -= com.val;
		else {
			if (com.direction === "down") aim += com.val;
		}
	}
});

console.log(x * y);
