var bg;
var carbonPerPage = 1.76;	// Average carbon per page view

chrome.tabs.getSelected(null, function (tab) {
	bg = chrome.extension.getBackgroundPage();
	renderPage();
});

function formatCarbonWeight(value) {
	var suffix = "g";
	if (value >= 1000000000) {
		value = value / 1000000000;
		suffix = "mmt";
	} else if (value >= 1000000) {
		value = value / 1000000;
		suffix = "mt";
	} else if (value >= 1000) {
		value = value / 1000;
		suffix = "kg";
	}
	value = value % 1 == 0 ? value : value.toFixed(1)
	return value + suffix;
}

function renderPage(url) {
	var energyScore = document.getElementById('energy-score');
	var waterScore = document.getElementById('water-score');
	var wasteScore = document.getElementById('waste-score');
	var transportScore = document.getElementById('transport-score');

	var energyCircle = document.getElementById('energy-circle');
	var waterCircle = document.getElementById('water-circle');
	var wasteCircle = document.getElementById('waste-circle');
	var transportCircle = document.getElementById('transport-circle');

	// Example scores, replace with actual logic to calculate scores
	var energy = (carbonPerPage * 0.8).toFixed(2);
	var water = (carbonPerPage * 0.9).toFixed(2);
	var waste = (carbonPerPage * 0.7).toFixed(2);
	var transport = (carbonPerPage * 0.6).toFixed(2);

	energyScore.innerHTML = energy;
	waterScore.innerHTML = water;
	wasteScore.innerHTML = waste;
	transportScore.innerHTML = transport;

	animateCircle(energyCircle, energy);
	animateCircle(waterCircle, water);
	animateCircle(wasteCircle, waste);
	animateCircle(transportCircle, transport);
}

function animateCircle(circle, score) {
	var percentage = Math.min(score / 10, 1) * 100; // Assuming max score is 10
	setTimeout(() => {
		circle.style.background = `conic-gradient(#4caf50 ${percentage}%, #ddd ${percentage}%)`;
	}, 100); // Delay to trigger animation
}
