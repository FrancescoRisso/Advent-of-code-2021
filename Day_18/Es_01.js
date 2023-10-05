clear();
let numbers = document.querySelector("pre").innerText;
numbers = numbers.substring(0, numbers.length - 1).split("\n");

let decode = (string) => {
	let char = "";
	let value = [];
	while (char !== "]") {
		char = string.shift();
		if (char === "[") value.push(decode(string));
		else {
			if (char !== "," && char !== "]") value.push(parseInt(char));
		}
	}
	return value;
};

numbers = numbers.map((n) => {
	let withoutFirstBracket = Array.from(n);
	withoutFirstBracket.shift();
	return decode(withoutFirstBracket);
});

let explode = (num, nestedAllowed, totNum) =>{
	if(Array.isArray(num)){
		if(nestedAllowed == 0)
	}
}

let reduce = (n) => {
	explode(n[1]);
	
};

let sum = (n1, n2) => {
	return reduce([n1, n2]);
};
