document.addEventListener("DOMContentLoaded", function () {
	const el = document.getElementById("time");
	el.innerHTML = new Date().toLocaleString();

	setInterval(function () {
		el.innerHTML = new Date().toLocaleString();
	}, 1000);
});
