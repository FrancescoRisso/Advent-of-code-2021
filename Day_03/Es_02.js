mcb = (array, i) => {
	let zeros = (ones = 0);
	array.forEach((d) => {
		if (d[i] == 0) zeros++;
		else ones++;
	});
	return zeros > ones ? 0 : 1;
};

digits = document
	.querySelector("pre")
	.innerText.split("\n")
	.map((l) => {
		return l.split("").map((v) => {
			return parseInt(v);
		});
	})
	.filter((x) => x.length != 0);

var mostCommonBit;
var i;

var oxygen = [...digits];
var co2 = [...digits];

for (i = 0; i < digits[0].length; i++) {
	if (oxygen.length > 1) {
		mostCommonBit = mcb(oxygen, i);
		oxygen = oxygen.filter((x) => x[i] === mostCommonBit);
	}
	if (co2.length > 1) {
		mostCommonBit = mcb(co2, i);
		co2 = co2.filter((x) => x[i] !== mostCommonBit);
	}
}

let oxygenInt = parseInt(oxygen[0].join(""), 2);
let co2Int = parseInt(co2[0].join(""), 2);

console.log(co2Int * oxygenInt);
