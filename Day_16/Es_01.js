clear();
let hex = document.querySelector("pre").innerText;

hexToBin = {
	0: "0000",
	1: "0001",
	2: "0010",
	3: "0011",
	4: "0100",
	5: "0101",
	6: "0110",
	7: "0111",
	8: "1000",
	9: "1001",
	A: "1010",
	B: "1011",
	C: "1100",
	D: "1101",
	E: "1110",
	F: "1111"
};

let bin = Array.from(hex)
	.map((c) => hexToBin[c])
	.join("")
	.split("");

let packets = [];

// readNumber is the number of packets to read, or -1 if "read until the end"
let decodePacket = (binArray, insertHere, readNumber) => {
	if (readNumber == 0) return;

	let packet = {};

	// Read version
	packet.version = parseInt(binArray.splice(0, 3).join(""), 2);

	// Read packet id
	packet.id = parseInt(binArray.splice(0, 3).join(""), 2);
	if (packet.id === 4) {
		// If id = 4, read the number
		let number = "";

		// Read all the values marked as A, B... in the example
		while (binArray.shift() !== "0") number = `${number}${binArray.splice(0, 4).join("")}`;

		// Read the last value (like C in the example)
		number = `${number}${binArray.splice(0, 4).join("")}`;

		// Eval the number as number
		packet.value = parseInt(number, 2);
	} else {
		// Id is not 4
		if (binArray.shift() === "0") {
			// next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet
			let len = parseInt(binArray.splice(0, 15).join(""), 2);
			let value = [];
			decodePacket(binArray.splice(0, len), value);
			packet.value = value;
		} else {
			// next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
			let number = parseInt(binArray.splice(0, 11).join(""), 2);
			let value = [];
			decodePacket(binArray, value, number);
			packet.value = value;
		}
	}

	insertHere.push(packet);
	if (binArray.filter((x) => x !== "0").length !== 0) decodePacket(binArray, insertHere, readNumber - 1);
};

let sumVersions = (list) => {
	let sum = 0;
	list.forEach((packet) => {
		if (Array.isArray(packet.value)) sum += sumVersions(packet.value);
		sum += packet.version;
	});
	return sum;
};

decodePacket(bin, packets, -1);

console.log(sumVersions(packets));
