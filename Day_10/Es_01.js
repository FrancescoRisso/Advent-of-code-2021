clear();

let lines = document.querySelector("pre").innerText;
lines = lines.substring(0, lines.length - 1).split("\n");

let scores = { "(": 3, "[": 57, "{": 1197, "<": 25137 };
let corresponding = { "(": ")", "[": "]", "{": "}", "<": ">", ")": "(", "]": "[", "}": "{", ">": "<" };

let getScore = (line) => {
	let seq = [];
	for (let i = 0; i < line.length; i++) {
		let char = line[i];
		switch (char) {
			case "(":
			case "[":
			case "{":
			case "<":
				seq.push(char);
				break;
			case ")":
			case "]":
			case "}":
			case ">":
				if (seq.pop() != corresponding[char]) return scores[corresponding[char]];
				break;
		}
	}
	return 0;
};

console.log(
	lines.reduce((prev, line) => {
		return prev + getScore(line);
	}, 0)
);
