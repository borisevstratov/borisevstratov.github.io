document.addEventListener("DOMContentLoaded", () => {
	const el = document.getElementById("time");
	el.innerHTML = new Date().toLocaleString();

	setInterval(() => {
		el.innerHTML = new Date().toLocaleString();
	}, 1000);
});

function copyText(text, message = "") {
	navigator.clipboard.writeText(text);
	alert(message + " copied to clipboard 👍");
}

(() => {
	var s = document.createElement("script");
	s.src = "http://localhost:5173/tracker.js";
	s.setAttribute("data-website", "bevstratov.ru");
	s.async = true;
	document.head.appendChild(s);
})();
