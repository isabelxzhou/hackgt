var bg;
var carbonPerPage = 1.76;	// Average carbon per page view

document.addEventListener('DOMContentLoaded', function () {
	var categories = document.querySelectorAll('.category');
	
	// Add click listeners for the category dropdown functionality
	categories.forEach(function(category) {
		category.addEventListener('click', function() {
			var details = category.querySelector('.category-details');
			details.classList.toggle('active');
		});
	});

	// Call renderPage to populate scores after the page has loaded
	chrome.tabs.getSelected(null, function (tab) {
		bg = chrome.extension.getBackgroundPage();
		renderPage();
	});
});

function renderPage() {
	var environmentScore = document.getElementById('environment-score');
	var hrScore = document.getElementById('hr-score');
	var corporateScore = document.getElementById('corporate-score');
	var politicalScore = document.getElementById('political-score');

	var environmentCircle = document.getElementById('environment-circle');
	var hrCircle = document.getElementById('hr-circle');
	var corporateCircle = document.getElementById('corporate-circle');
	var politicalCircle = document.getElementById('political-circle');

	// Generate random scores between 1 and 10
	var environment = getRandomScore();
	var hr = getRandomScore();
	var corporate = getRandomScore();
	var political = getRandomScore();

	environmentScore.innerHTML = environment;
	hrScore.innerHTML = hr;
	corporateScore.innerHTML = corporate;
	politicalScore.innerHTML = political;

	animateCircle(environmentCircle, environment);
	animateCircle(hrCircle, hr);
	animateCircle(corporateCircle, corporate);
	animateCircle(politicalCircle, political);
}

function getRandomScore() {
	return (Math.random() * 9 + 1).toFixed(2); // Generates a number between 1 and 10
}

function animateCircle(circle, score) {
	var percentage = Math.min(score / 10, 1) * 100; // Assuming max score is 10
	setTimeout(() => {
		circle.style.background = `conic-gradient(#4caf50 ${percentage}%, #ddd ${percentage}%)`;
	}, 100); // Delay to trigger animation
}
