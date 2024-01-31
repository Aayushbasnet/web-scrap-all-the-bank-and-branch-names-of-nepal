const text = "This text contains Branch Locations in different places.";

const containsBranchLocations = /Branch Locations/i.test(text);

if (containsBranchLocations) {
	console.log("Text contains Branch Locations.");
} else {
	console.log("Text does not contain Branch Locations.");
}
