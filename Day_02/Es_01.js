x = 0;
y = 0;

commands = document
	.querySelector("pre")
	.innerText.split("\n")
	.map((l) => {
		l = l.split(" ");
		return { direction: l[0], val: parseInt(l[1]) };
	});

commands.forEach((com) => {
	if (com.direction === "forward") x += com.val;
	else {
		if (com.direction === "up") y -= com.val;
		else {
			if (com.direction === "down") y += com.val;
		}
	}
});

console.log(x * y);
