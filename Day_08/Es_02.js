clear();

let difference = (setA, setB) => {
	const diff = new Set(setA);

	for (const elem of setB) {
		diff.delete(elem);
	}

	return diff;
};

let intersection = (setA, setB) => {
	let _intersection = new Set();
	for (let elem of setB.values()) {
		if (setA.has(elem)) {
			_intersection.add(elem);
		}
	}
	return _intersection;
};

let calcPossibilities = (localLinks) => {
	let final = []; // The array that will contain the list of possibilities

	// All the links with more than 1 possibility, sorted by number of possibilities they have
	let multiple = Object.entries(localLinks)
		.filter((x) => x[1].size != 1)
		.sort((a, b) => b.length - a.length);

	let p = []; // For the first element with more possibilities, saves all its possibilities
	// for example, p = [ {a:b}, {a:c} ] if 'a' can be either 'b' or 'c'

	// If multiple is not empty
	if (multiple.length != 0) {
		// Compute p
		p = Array.from(multiple[0][1]).map((l) => {
			return { [multiple[0][0]]: l };
		});

		// For each possibility l of p
		for (let pI = 0; pI < p.length; pI++) {
			l = p[pI];

			// Create a copy of localLinks
			let localLinksCp = Object.fromEntries(
				Object.entries(localLinks).map((l) => {
					return [[l[0]], new Set(l[1])];
				})
			);

			// Choose the value value(l) for the link key(l)
			localLinksCp[Array.from(Object.keys(l))[0]] = new Set(Array.from(Object.values(l))[0]);

			// Remove value(l) from any other link
			Array.from(difference(new Set("abcdefg"), new Set(Object.keys(l)[0]))).forEach((letter) => {
				localLinksCp[letter].delete(Object.values(l)[0]);
			});

			// Compute the possibilities with the new subset
			tmp = calcPossibilities(localLinksCp);

			// Insert them in the final array
			// Need to spread because it will be an array of (arrays of (arrays of...)) objects, that would be put into another array, while I want all objects in the same array
			final.push(...tmp);
		}
		return final;
	}
	// If multiple is empty, return the "dictionary" (in a list)
	// The list is used because of the ...tmp just above
	else
		return [
			Object.fromEntries(
				Object.entries(localLinks).map((x) => {
					return [x[0], Array.from(x[1])[0]];
				})
			)
		];
};

all = document.querySelector("pre").innerText;
all = all
	.substring(0, all.length - 1)
	.split("\n")
	.map((x) => {
		return x.split(" | ");
	});

input = all.map((s) => {
	return s[0].split(" ");
});

output = all.map((s) => {
	return s[1].split(" ");
});

lenToNumber = {
	2: 1,
	3: 7,
	4: 4,
	5: [2, 3, 5],
	6: [0, 6, 9],
	7: 8
};

segments = [
	new Set("abcefg"),
	new Set("cf"),
	new Set("acdeg"),
	new Set("acdfg"),
	new Set("bcdf"),
	new Set("abdfg"),
	new Set("abdefg"),
	new Set("acf"),
	new Set("abcdefg"),
	new Set("abcdfg")
];

segmentsToNumber = {
	abcefg: 0,
	cf: 1,
	acdeg: 2,
	acdfg: 3,
	bcdf: 4,
	abdfg: 5,
	abdefg: 6,
	acf: 7,
	abcdefg: 8,
	abcdfg: 9
};

values = input.map((inp, index) => {
	// segment x in input can represent the real segments links[x]
	links = {
		a: new Set("abcdefg"),
		b: new Set("abcdefg"),
		c: new Set("abcdefg"),
		d: new Set("abcdefg"),
		e: new Set("abcdefg"),
		f: new Set("abcdefg"),
		g: new Set("abcdefg")
	};

	// Insert the useful values (1s, 4s, 7s and 8s) first
	inp = [
		...inp
			.filter((x) => [2, 3, 4, 7].includes(x.length))
			.sort((a, b) => {
				return a.length - b.length;
			}),
		...inp.filter((x) => ![2, 3, 4, 7].includes(x.length))
	];

	// Remove everything logic can remove (by using 1s, 4s and 7s)
	inp.forEach((str) => {
		if ([2, 3, 4].includes(str.length)) {
			Array.from(str).forEach((c) => {
				links[c] = intersection(links[c], segments[lenToNumber[str.length]]);
			});
			Array.from(difference(new Set("abcdefg"), new Set(str))).forEach((charWhereToRemove) => {
				Array.from(segments[lenToNumber[str.length]]).forEach((charToRemove) => {
					links[charWhereToRemove].delete(charToRemove);
				});
			});
		}
	});

	// Get all the possible combinations for the lins
	possibilities = calcPossibilities(links);

	out = 0;

	// For each possibility, until you find the correct one
	for (choice = 0; choice < possibilities.length; choice++) {
		out = 0;

		// Try every number in the output string
		for (outputNumber = 0; outputNumber < 4; outputNumber++) {
			// If this combination does not make sense use the next combination
			if (
				segmentsToNumber[
					Array.from(output[index][outputNumber])
						.map((c) => {
							return possibilities[choice][c];
						})
						.sort((x, y) => {
							return x > y ? 1 : x < y ? -1 : 0;
						})
						.join("")
				] === undefined
			)
				break;

			// If this combination makes sense, compute the number
			out =
				out * 10 +
				segmentsToNumber[
					Array.from(output[index][outputNumber])
						.map((c) => {
							return possibilities[choice][c];
						})
						.sort((x, y) => {
							return x > y ? 1 : x < y ? -1 : 0;
						})
						.join("")
				];
		}

		// If combination made sense for all numbers, return the computed value
		if (outputNumber === 4) return out;
	}

	return out;
});

console.log(values.reduce((prev, next) => prev + next));
