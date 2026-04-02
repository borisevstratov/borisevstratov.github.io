document.addEventListener("DOMContentLoaded", () => {
	// Audio Player logic
	const audio = document.getElementById("main-audio");
	const playPauseBtn = document.getElementById("play-pause");
	const progressBar = document.getElementById("progress-bar");

	if (audio && playPauseBtn && progressBar) {
		const playIcon = document.getElementById("play-icon");
		const pauseIcon = document.getElementById("pause-icon");

		const updateIcons = () => {
			if (audio.paused) {
				playIcon.style.display = "block";
				pauseIcon.style.display = "none";
			} else {
				playIcon.style.display = "none";
				pauseIcon.style.display = "block";
			}
		};

		const togglePlay = async () => {
			if (audio.paused) {
				try {
					await audio.play();
					updateIcons();
				} catch (err) {
					console.error("Playback failed:", err);
				}
			} else {
				audio.pause();
				updateIcons();
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
					updateIcons();
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
			updateIcons();
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