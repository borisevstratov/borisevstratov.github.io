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