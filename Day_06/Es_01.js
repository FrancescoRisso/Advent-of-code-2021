clear();
ages = document.querySelector("pre").innerText;
ages = ages
	.substring(0, ages.length - 1)
	.split(",")
	.map((x) => {
		return parseInt(x);
	});

for (day = 0; day < 80; day++) {
	for (fish = ages.length - 1; fish >= 0; fish--) {
		if (ages[fish] === 0) {
			ages[fish] = 6;
			ages.push(8);
		} else ages[fish]--;
	}
}

console.log(ages.length);
