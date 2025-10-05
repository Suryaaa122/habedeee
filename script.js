let currentPage = 0;
const pages = document.getElementById("pages");
const music = document.getElementById("bgMusic");
const flipSound = document.getElementById("flipSound");
const btn = document.getElementById("musicControl");
let flowersStarted = false;
let flowerInterval;

// Tunggu sampai DOM selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // Start Celebration
  document
    .getElementById("startBtn")
    .addEventListener("click", startCelebration);

  // Enter key pada input usia
  document
    .getElementById("ageInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        startCelebration();
      }
    });

  // Set volume musik
  if (music) {
    music.volume = 0.3; // Set volume to 30%
  }
  if (flipSound) {
    flipSound.volume = 0.5; // Set volume to 50%
  }
});

function startCelebration() {
  console.log("Start celebration clicked!");

  // Validasi usia
  const ageInput = document.getElementById("ageInput");
  const ageError = document.getElementById("ageError");
  const correctAge = 22;

  if (!ageInput.value) {
    showError(ageError, "Isi dulu usianya dong! 😊");
    return;
  }

  const inputAge = parseInt(ageInput.value);

  if (inputAge > correctAge) {
    showError(ageError, "ketuaan ga siee ? 😆");
    ageInput.value = "";
    ageInput.focus();
    return;
  }

  if (inputAge !== correctAge) {
    showError(ageError, "Boong bangettt 😂😂");
    ageInput.value = "";
    ageInput.focus();
    return;
  }

  // Clear error jika validasi berhasil
  ageError.textContent = "";
  ageError.style.display = "none";

  const startScreen = document.getElementById("startScreen");
  const container = document.querySelector(".container");

  if (startScreen && container) {
    // Sembunyikan start screen
    startScreen.style.display = "none";

    // Tampilkan container
    container.style.display = "block";

    // Tampilkan tombol musik
    if (btn) {
      btn.style.display = "inline-block";
    }

    // Reset ke halaman pertama
    if (pages) {
      pages.style.transform = "translateX(0%)";
      currentPage = 0;
    }

    // Mulai musik
    if (music) {
      music.play().catch((error) => {
        console.log("Musik tidak bisa diputar:", error);
      });
    }

    // Preload flip sound
    if (flipSound) {
      flipSound.load();
    }

    // Mulai efek bunga
    if (!flowersStarted) {
      flowersStarted = true;
      startFlowerAnimation();
    }

    console.log("Celebration started successfully!");
  } else {
    console.error("Start screen atau container tidak ditemukan!");
  }
}

function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";

  // Hapus class animasi jika ada, lalu tambahkan lagi untuk memicu animasi
  errorElement.classList.remove("shake");
  setTimeout(() => {
    errorElement.classList.add("shake");
  }, 10);
}

// Navigasi halaman
function playFlipSound() {
  if (flipSound) {
    flipSound.currentTime = 0;
    flipSound.play().catch((error) => {
      console.log("Flip sound tidak bisa diputar:", error);
    });
  }
}

function nextPage() {
  console.log("Next page clicked, current page:", currentPage);

  if (currentPage < 3) {
    currentPage++;
    updatePageTransform();
    playFlipSound();
    console.log("Moved to page:", currentPage);
  }
}

function prevPage() {
  console.log("Previous page clicked, current page:", currentPage);

  if (currentPage > 0) {
    currentPage--;
    updatePageTransform();
    playFlipSound();
    console.log("Moved to page:", currentPage);
  }
}

function updatePageTransform() {
  if (pages) {
    const translateX = -(currentPage * 25); // 25% karena ada 4 halaman (100% / 4 = 25%)
    pages.style.transform = `translateX(${translateX}%)`;
    console.log("Transform applied:", `translateX(${translateX}%)`);
  }
}

function backToStart() {
  console.log("Back to start clicked");

  // Reset ke halaman pertama
  currentPage = 0;
  if (pages) {
    pages.style.transform = "translateX(0%)";
  }

  playFlipSound();

  // Kembali ke start screen
  const container = document.querySelector(".container");
  const startScreen = document.getElementById("startScreen");

  if (container && startScreen) {
    container.style.display = "none";
    startScreen.style.display = "flex";
  }

  // Hentikan musik
  if (music) {
    music.pause();
    music.currentTime = 0;
  }

  // Sembunyikan tombol musik
  if (btn) {
    btn.style.display = "none";
  }

  // Hentikan bunga (opsional)
  // stopFlowerAnimation();
}

// Kontrol musik
function toggleMusic() {
  if (!music) {
    console.log("Musik tidak ditemukan");
    return;
  }

  if (music.paused) {
    music.play().catch((error) => {
      console.log("Musik tidak bisa diputar:", error);
    });
    btn.textContent = "🔊 Music";
    console.log("Musik diputar");
  } else {
    music.pause();
    btn.textContent = "🔇 Muted";
    console.log("Musik dihentikan");
  }
}

// Animasi bunga
function startFlowerAnimation() {
  flowerInterval = setInterval(createFlower, 800);
  console.log("Flower animation started");
}

function stopFlowerAnimation() {
  if (flowerInterval) {
    clearInterval(flowerInterval);
    flowersStarted = false;
    console.log("Flower animation stopped");
  }
}

function createFlower() {
  const flowers = ["🌸", "🌺", "🌻", "🌷", "🌹", "💐", "🌼"];
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

  // Posisi horizontal acak
  flower.style.left = Math.random() * window.innerWidth + "px";

  // Durasi animasi acak
  const duration = 3 + Math.random() * 4; // 3-7 detik
  flower.style.animationDuration = duration + "s";

  // Ukuran acak
  const size = 20 + Math.random() * 15; // 20-35px
  flower.style.fontSize = size + "px";

  document.body.appendChild(flower);

  // Hapus elemen setelah animasi selesai
  setTimeout(() => {
    if (flower.parentNode) {
      flower.remove();
    }
  }, duration * 1000 + 1000); // Tambah 1 detik buffer
}

// Debug function - bisa dihapus nanti
function debugInfo() {
  console.log("=== DEBUG INFO ===");
  console.log("Current page:", currentPage);
  console.log("Pages element:", pages);
  console.log(
    "Container display:",
    document.querySelector(".container")?.style.display
  );
  console.log(
    "Start screen display:",
    document.getElementById("startScreen")?.style.display
  );
  console.log("Music element:", music);
  console.log("Music control button:", btn);
}

function showFinalScreen() {
  console.log("Menampilkan tampilan akhir...");

  // Sembunyikan halaman utama
  const container = document.querySelector(".container");
  if (container) container.style.display = "none";

  // Tampilkan layar akhir
  const finalScreen = document.getElementById("finalScreen");
  if (finalScreen) {
    finalScreen.style.display = "flex";
    createFinalFlowers();
  }

  // Putar musik pelan (opsional)
  if (music) {
    music.volume = 0.2;
  }
}

// Efek bunga mekar di tampilan akhir
function createFinalFlowers() {
  const area = document.querySelector(".final-flowers");
  if (!area) return;
  area.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const flower = document.createElement("div");
    flower.className = "bloom";
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.top = `${Math.random() * 100}%`;
    area.appendChild(flower);
  }
}
function showBigFlower() {
  console.log("Menampilkan bunga besar...");

  const container = document.querySelector(".container");
  if (container) container.style.display = "none";

  const finalScreen = document.getElementById("finalScreen");
  if (finalScreen) {
    finalScreen.style.display = "flex";

    // Mulai animasi partikel
    setTimeout(() => {
      createParticles();
    }, 1000);

    // Tambah bintang berkelip
    setTimeout(() => {
      createTwinklingStars();
    }, 1500);
  }

  // Lembutkan musik
  if (music) music.volume = 0.25;
}

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

      setTimeout(() => {
        if (star.parentNode) star.remove();
      }, 3000);
    }
  }, 1000);
}
