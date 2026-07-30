document.addEventListener("DOMContentLoaded", () => {
	initBouncingDVDLogo();

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

function initBouncingDVDLogo() {
	if (document.getElementById("bouncing-dvd-container")) return;

	const container = document.createElement("div");
	container.id = "bouncing-dvd-container";

	const logo = document.createElement("div");
	logo.className = "bouncing-dvd-logo";

	// SVG styled as DVD Video logo with "SLOP"
	logo.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="160" height="80">
			<g fill="currentColor">
				<text x="120" y="66" font-family="'Impact', 'Arial Black', 'Trebuchet MS', sans-serif" font-weight="900" font-style="italic" font-size="66" text-anchor="middle" letter-spacing="0">SLOP</text>
				<path d="M 12 76 C 55 102, 185 102, 228 76 C 185 91, 55 91, 12 76 Z" />
				<text x="120" y="106" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="18" text-anchor="middle" letter-spacing="7">SLOP</text>
			</g>
		</svg>
	`;

	container.appendChild(logo);
	document.body.appendChild(container);

	const colors = [
		"#ff0055",
		"#00e5ff",
		"#ffbe00",
		"#a100ff",
		"#00ff66",
		"#ff3300",
		"#ff00cc",
		"#00ffff",
		"#ff6600",
		"#33ff00"
	];

	let colorIndex = Math.floor(Math.random() * colors.length);
	logo.style.color = colors[colorIndex];

	const logoWidth = 160;
	const logoHeight = 80;

	let x = Math.random() * Math.max(10, window.innerWidth - logoWidth);
	let y = Math.random() * Math.max(10, window.innerHeight - logoHeight);

	let speedX = Math.random() < 0.5 ? 2 : -2;
	let speedY = Math.random() < 0.5 ? 2 : -2;

	let lastTime = performance.now();

	function changeColor() {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * colors.length);
		} while (newIndex === colorIndex);
		colorIndex = newIndex;
		logo.style.color = colors[colorIndex];
	}

	function update(now) {
		const dt = Math.min((now - lastTime) / 1000, 0.1);
		lastTime = now;

		const maxX = Math.max(0, window.innerWidth - logoWidth);
		const maxY = Math.max(0, window.innerHeight - logoHeight);

		const moveX = speedX * (dt * 60);
		const moveY = speedY * (dt * 60);

		x += moveX;
		y += moveY;

		let bounced = false;

		if (x <= 0) {
			x = 0;
			speedX = Math.abs(speedX);
			bounced = true;
		} else if (x >= maxX) {
			x = maxX;
			speedX = -Math.abs(speedX);
			bounced = true;
		}

		if (y <= 0) {
			y = 0;
			speedY = Math.abs(speedY);
			bounced = true;
		} else if (y >= maxY) {
			y = maxY;
			speedY = -Math.abs(speedY);
			bounced = true;
		}

		if (bounced) {
			changeColor();
		}

		logo.style.transform = `translate3d(${x}px, ${y}px, 0)`;

		requestAnimationFrame(update);
	}

	window.addEventListener("resize", () => {
		const maxX = Math.max(0, window.innerWidth - logoWidth);
		const maxY = Math.max(0, window.innerHeight - logoHeight);
		if (x > maxX) x = maxX;
		if (y > maxY) y = maxY;
	});

	requestAnimationFrame(update);
}