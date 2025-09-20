let currentPage = 0;
const pages = document.getElementById("pages");
const music = document.getElementById("bgMusic");
const flipSound = document.getElementById("flipSound");
const btn = document.getElementById("musicControl");
let flowersStarted = false;

// Tombol Start Celebration
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.querySelector(".container").style.display = "block";
  btn.style.display = "block";

  music.play().catch(() => {});
  flipSound.load();

  if (!flowersStarted) {
    flowersStarted = true;
    setInterval(createFlower, 800);
  }
});

function playFlipSound() {
  flipSound.currentTime = 0;
  flipSound.play().catch(() => {});
}

function nextPage() {
  currentPage++;
  if (currentPage > 3) currentPage = 3;
  pages.style.transform = `translateX(-${currentPage * 100}%)`;
  playFlipSound();
}

function backToStart() {
  currentPage = 0;
  pages.style.transform = `translateX(0)`;
  playFlipSound();
}

function toggleMusic() {
  if (music.paused) {
    music.play().catch(() => {});
    btn.textContent = "🔊 Music";
  } else {
    music.pause();
    btn.textContent = "🔈 Mute";
  }
}

function createFlower() {
  const flower = document.createElement("div");
  flower.classList.add("flower");
  flower.textContent = "🌸";
  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.animationDuration = 5 + Math.random() * 5 + "s";
  document.body.appendChild(flower);

  setTimeout(() => flower.remove(), 10000);
}
function nextPage() {
  currentPage++;
  if (currentPage > 3) currentPage = 3;
  console.log("Next Page:", currentPage); // 👈 debug
  console.log("Pages element:", pages); // 👈 debug
  pages.style.transform = `translateX(-${currentPage * 100}%)`;
  playFlipSound();
}

function prevPage() {
  currentPage--;
  if (currentPage < 0) currentPage = 0;
  pages.style.transform = `translateX(-${currentPage * 100}%)`;
  playFlipSound();
}
