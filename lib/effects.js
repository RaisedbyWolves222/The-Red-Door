const Effects = {
  popSound: null,

  toggleMenu() {
    const menu = document.getElementById("effectsMenu");
    menu.classList.toggle("hidden");
  },

  showBalloons() {
    // Preload sound
    if (!this.popSound) {
      this.popSound = new Audio("res/sounds/pop.mp3");
    }

    // Starter confetti bursts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, i * 500);
    }

    // Spawn balloons
    for (let i = 0; i < 10; i++) {
      this.spawnBalloon();
    }

    // Spawn bubbles
    for (let i = 0; i < 5; i++) {
      this.spawnBubble();
    }
  },

  spawnBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Random horizontal start position
    balloon.style.left = Math.random() * 90 + "vw";
    balloon.style.backgroundColor = this.randomColor();

    // Random size (20px–60px wide)
    const size = 20 + Math.random() * 40;
    balloon.style.width = size + "px";
    balloon.style.height = size * 1.5 + "px";

    document.body.appendChild(balloon);

    // Float duration + random wiggle speed
    const duration = 8000 + Math.random() * 4000;
    const wiggleSpeed = (2 + Math.random() * 3).toFixed(2);

    balloon.style.animation = `floatUp ${duration}ms linear forwards, wiggle ${wiggleSpeed}s ease-in-out infinite`;

    // Pop on click
    balloon.addEventListener("click", (e) => {
      this.popBalloon(balloon, e);
    });

    // Auto-remove when done
    setTimeout(() => {
      if (document.body.contains(balloon)) balloon.remove();
    }, duration);
  },

  popBalloon(balloon, e) {
    const rect = balloon.getBoundingClientRect();
    const x = rect.left / window.innerWidth;
    const y = rect.top / window.innerHeight;

    // Play pop sound
    if (this.popSound) {
      const sound = this.popSound.cloneNode();
      sound.play();
    }

    // Confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x, y }
    });

    balloon.remove();
  },

  spawnBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Random horizontal start position
    bubble.style.left = Math.random() * 90 + "vw";

    // Random size (40px–80px diameter)
    const size = 40 + Math.random() * 40;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    // Stick figure people
    const stickFigures = ["o/|\\o", "o/\\o", "O-|", "o|o"];
    bubble.innerText = stickFigures[Math.floor(Math.random() * stickFigures.length)];

    document.body.appendChild(bubble);

    // Float duration + random wiggle
    const duration = 10000 + Math.random() * 5000;
    const wiggleSpeed = (2 + Math.random() * 3).toFixed(2);

    bubble.style.animation = `floatUp ${duration}ms linear forwards, wiggle ${wiggleSpeed}s ease-in-out infinite`;

    // Pop bubble
    bubble.addEventListener("click", (e) => {
      this.popBubble(bubble, e);
    });

    // Remove after done
    setTimeout(() => {
      if (document.body.contains(bubble)) bubble.remove();
    }, duration);
  },

  popBubble(bubble, e) {
    const rect = bubble.getBoundingClientRect();
    const x = rect.left / window.innerWidth;
    const y = rect.top / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x, y },
      colors: ["#ff69b4", "#ffffff"]
    });

    bubble.remove();
  },

  randomColor() {
    const colors = ["#ff4d6d", "#ffb347", "#47d147", "#66b3ff", "#b366ff", "#ffd633"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};

// Attach button listener
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("effectsButton");
  if (btn) btn.addEventListener("click", Effects.toggleMenu);
});
