clear();

lines = document.querySelector("pre").innerText;
lines = lines.substring(0, lines.length - 1).split("\n");

let scores = { "(": 1, "[": 2, "{": 3, "<": 4 };
let corresponding = { "(": ")", "[": "]", "{": "}", "<": ">", ")": "(", "]": "[", "}": "{", ">": "<" };

let isWrong = (line) => {
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
				if (seq.pop() != corresponding[char]) return true;
				break;
		}
	}
	return false;
};

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
				seq.pop();
				break;
		}
	}

	score = 0;
	seq.reverse().forEach((char) => {
		score *= 5;
		score += scores[char];
	});

	return score;
};

let finalScores = [];

lines.forEach((line) => {
	if (isWrong(line) == 0) finalScores.push(getScore(line));
});

finalScores = finalScores.sort((a, b) => a-b);

console.log(finalScores[(finalScores.length - 1) / 2]);
