let currentPage = 0;
const pages = document.getElementById("pages");
const music = document.getElementById("bgMusic");
const flipSound = document.getElementById("flipSound");
const btn = document.getElementById("musicControl");
let flowersStarted = false;
let flowerInterval;

// 🔹 Tunggu sampai DOM siap
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  document.getElementById("startBtn")?.addEventListener("click", startCelebration);

  document.getElementById("ageInput")?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") startCelebration();
  });

  if (music) music.volume = 0.3;
  if (flipSound) flipSound.volume = 0.5;
});

function startCelebration() {
  const ageInput = document.getElementById("ageInput");
  const ageError = document.getElementById("ageError");
  const correctAge = 22;

  if (!ageInput.value) return showError(ageError, "Isi dulu usianya dong! 😊");

  const inputAge = parseInt(ageInput.value);
  if (inputAge > correctAge)
    return showError(ageError, "ketuaan ga siee ? 😆", ageInput);
  if (inputAge !== correctAge)
    return showError(ageError, "Boong bangettt 😂😂", ageInput);

  // ✅ validasi ok
  ageError.textContent = "";
  ageError.style.display = "none";

  document.getElementById("startScreen").style.display = "none";
  document.querySelector(".container").style.display = "block";
  btn.style.display = "inline-block";
  pages.style.transform = "translateX(0%)";
  currentPage = 0;

  music?.play().catch((e) => console.log("Musik gagal diputar:", e));
  flipSound?.load();

  if (!flowersStarted) {
    flowersStarted = true;
    startFlowerAnimation();
  }
}

function showError(errorElement, message, input) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
  if (input) {
    input.value = "";
    input.focus();
  }
  errorElement.classList.remove("shake");
  setTimeout(() => errorElement.classList.add("shake"), 10);
}

// 🔸 Navigasi halaman
function nextPage() {
  if (currentPage < 3) {
    currentPage++;
    updatePageTransform();
    playFlipSound();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updatePageTransform();
    playFlipSound();
  }
}

function updatePageTransform() {
  const translateX = -(currentPage * 25);
  pages.style.transform = `translateX(${translateX}%)`;
}

function playFlipSound() {
  flipSound.currentTime = 0;
  flipSound.play().catch(() => {});
}

// 🔸 Kontrol musik
function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play();
    btn.textContent = "🔊 Music";
  } else {
    music.pause();
    btn.textContent = "🔇 Muted";
  }
}

// 🔸 Efek bunga jatuh
function startFlowerAnimation() {
  flowerInterval = setInterval(createFlower, 800);
}

function createFlower() {
  const flowers = ["🌸", "🌺", "🌻", "🌷", "🌹", "💐", "🌼"];
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  flower.style.left = Math.random() * window.innerWidth + "px";
  const duration = 3 + Math.random() * 4;
  flower.style.animationDuration = duration + "s";
  flower.style.fontSize = 20 + Math.random() * 15 + "px";
  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), duration * 1000 + 1000);
}

// 🌸 Tampilan akhir bunga besar
function showBigFlower() {
  console.log("Menampilkan bunga besar...");

  const container = document.querySelector(".container");
  if (container) container.style.display = "none";

  const finalScreen = document.getElementById("finalScreen");
  if (!finalScreen) return;
  finalScreen.style.display = "flex";

  // ✅ paksa render ulang
  void finalScreen.offsetWidth;

  const bigFlower = finalScreen.querySelector(".big-flower");
  if (bigFlower) {
    // Reset animasi agar bisa berjalan di HP
    bigFlower.style.animation = "none";
    void bigFlower.offsetWidth;
    bigFlower.style.animation = "bloom 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
  }

  // ✨ Tambahkan efek bintang setelah bunga muncul
  setTimeout(() => {
    createTwinklingStars();
  }, 1000);

  if (music) music.volume = 0.25;
}

// 🌟 Efek bintang berkelip
function createTwinklingStars() {
  const finalScreen = document.getElementById("finalScreen");
  if (!finalScreen) return;

  setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const star = document.createElement("div");
      star.textContent = "✨";
      star.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${20 + Math.random() * 15}px;
        pointer-events: none;
        animation: twinkle ${1 + Math.random() * 2}s ease-in-out;
      `;
      finalScreen.appendChild(star);
      setTimeout(() => star.remove(), 3000);
    }
  }, 1000);
}
