
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("open-envelope");
  const introScreen = document.getElementById("intro-screen");
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const birthdaySite = document.getElementById("birthday-site");

  const musicButton = document.getElementById("music-button");
  const music = document.getElementById("birthday-music");

  // OPEN THE ENVELOPE
  openButton.addEventListener("click", () => {
    envelopeWrapper.classList.add("open");

    setTimeout(() => {
      introScreen.style.opacity = "0";
      introScreen.style.transition = "opacity 0.8s ease";

      setTimeout(() => {
        introScreen.classList.add("hidden");
        birthdaySite.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });

        createPetals();
        revealElements();
      }, 800);
    }, 700);
  });

  // MUSIC PLAYER
  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicButton.textContent = "❚❚ Pause Music";
      } catch (error) {
        musicButton.textContent = "Music unavailable";
        console.error("Music playback failed:", error);
      }
    } else {
      music.pause();
      musicButton.textContent = "▶ Play Music";
    }
  });

  music.addEventListener("ended", () => {
    musicButton.textContent = "▶ Play Music";
  });

  // FALLING PETALS
  function createPetals() {
    const symbols = ["✿", "❀", "♡", "❁"];

    for (let i = 0; i < 24; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal");
      petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      petal.style.left = Math.random() * 100 + "vw";
      petal.style.fontSize = Math.random() * 14 + 12 + "px";
      petal.style.animationDuration = Math.random() * 8 + 6 + "s";
      petal.style.animationDelay = Math.random() * 8 + "s";

      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 15000);
    }
  }

  // SCROLL REVEAL
  function revealElements() {
    const elements = document.querySelectorAll(
      ".section-heading, .gallery-item, .music-card, .letter-paper, .closing-section"
    );

    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(25px)";
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));
  }
});
