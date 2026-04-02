document.addEventListener("DOMContentLoaded", () => {
	const el = document.getElementById("time");
	el.innerHTML = new Date().toLocaleString();

	setInterval(() => {
		el.innerHTML = new Date().toLocaleString();
	}, 1000);

	// Audio Player logic
	const audio = document.getElementById("main-audio");
	const playPauseBtn = document.getElementById("play-pause");
	const progressBar = document.getElementById("progress-bar");

	if (audio && playPauseBtn && progressBar) {
		const togglePlay = async () => {
			if (audio.paused) {
				try {
					await audio.play();
					playPauseBtn.textContent = "⏸";
				} catch (err) {
					console.error("Playback failed:", err);
				}
			} else {
				audio.pause();
				playPauseBtn.textContent = "▶";
			}
		};

		playPauseBtn.addEventListener("click", togglePlay);

		audio.addEventListener("timeupdate", () => {
			const percent = (audio.currentTime / audio.duration) * 100;
			progressBar.style.width = percent + "%";
		});

		// Minimal hack for autoplay: start playback on first user interaction
		const autoPlayOnce = async () => {
			if (audio.paused) {
				try {
					await audio.play();
					playPauseBtn.textContent = "⏸";
					// Cleanup listeners once playback starts
					document.removeEventListener("click", autoPlayOnce);
					document.removeEventListener("touchstart", autoPlayOnce);
					document.removeEventListener("keydown", autoPlayOnce);
				} catch (e) {
					// Fallback: stay paused if interaction fails or is blocked
					console.log("Autoplay failed, waiting for direct interaction");
				}
			}
		};

		// Try standard autoplay (may fail)
		audio.play().then(() => {
			playPauseBtn.textContent = "⏸";
		}).catch(() => {
			// If blocked, wait for any interaction
			document.addEventListener("click", autoPlayOnce, { once: true });
			document.addEventListener("touchstart", autoPlayOnce, { once: true });
			document.addEventListener("keydown", autoPlayOnce, { once: true });
		});
	}
});

function copyText(text, message = "") {
	navigator.clipboard.writeText(text);
	alert(message + " copied to clipboard 👍");
}