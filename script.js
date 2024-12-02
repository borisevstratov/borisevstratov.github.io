document.addEventListener("DOMContentLoaded", function () {
	const el = document.getElementById("time");
	el.innerHTML = new Date().toLocaleString();

	setInterval(function () {
		el.innerHTML = new Date().toLocaleString();
	}, 1000);
});

function copyText(text, message = "") {
	navigator.clipboard.writeText(text);
	alert(message + " copied to clipboard 👍");
}

(function (m, e, t, r, i, k, a) {
	m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
	m[i].l = 1 * new Date();
	for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
	k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
})
	(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(99108327, "init", {
	clickmap: true,
	trackLinks: true,
	accurateTrackBounce: true
});
