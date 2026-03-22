/* ===========================
   HBD Kayla Madyna — script.js
   =========================== */

// ─── Particles ───────────────────────────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#c9a84c', '#e8a0b0', '#fff8e7', '#b5405a', '#f0d080'];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const dur = Math.random() * 12 + 8;
    const delay = Math.random() * 15;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    container.appendChild(p);
  }
})();

// ─── Falling Petals ──────────────────────────────────────────────────────────
(function createPetals() {
  const container = document.getElementById('petals-container');
  const symbols = ['🌸', '🌺', '🌷', '🌹', '✿', '❀'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    const left = Math.random() * 100;
    const dur = Math.random() * 10 + 8;
    const delay = Math.random() * 15;
    const size = Math.random() * 0.8 + 0.8;

    petal.textContent = sym;
    petal.style.cssText = `
      left: ${left}%;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(petal);
  }
})();

// ─── Open Letter ─────────────────────────────────────────────────────────────
const openBtn = document.getElementById('open-letter');
const introScreen = document.getElementById('intro-screen');
const letterSection = document.getElementById('letter-section');

openBtn.addEventListener('click', () => {
  // Seal pop animation
  openBtn.style.transform = 'scale(1.2)';
  openBtn.style.transition = 'transform 0.15s ease';

  setTimeout(() => {
    openBtn.style.transform = 'scale(0)';
  }, 150);

  setTimeout(() => {
    introScreen.classList.add('fade-out');
  }, 500);

  setTimeout(() => {
    introScreen.style.display = 'none';
    letterSection.classList.remove('hidden');
    letterSection.style.opacity = '0';
    letterSection.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        letterSection.style.opacity = '1';
      });
    });
  }, 1500);
});

// ─── Blow Candles ────────────────────────────────────────────────────────────
const blowBtn = document.getElementById('blow-btn');
const candles = document.querySelectorAll('.candle');
const wishText = document.getElementById('wish-text');
const fireworksContainer = document.getElementById('fireworks');

blowBtn.addEventListener('click', () => {
  blowBtn.disabled = true;
  blowBtn.textContent = '💨 Meniup...';

  // Blow candles one by one with delay
  candles.forEach((candle, i) => {
    setTimeout(() => {
      candle.classList.add('blown');
      candle.textContent = '🕯️';

      // When last candle is blown
      if (i === candles.length - 1) {
        setTimeout(() => {
          wishText.classList.remove('hidden');
          launchFireworks();
          blowBtn.textContent = '🎉 Selamat Ulang Tahun!';
        }, 400);
      }
    }, i * 300);
  });
});

// ─── Fireworks ───────────────────────────────────────────────────────────────
function launchFireworks() {
  const bursts = 8;
  for (let b = 0; b < bursts; b++) {
    setTimeout(() => launchBurst(), b * 300);
  }
  // Extra bursts after a moment
  setTimeout(() => {
    for (let b = 0; b < 5; b++) {
      setTimeout(() => launchBurst(), b * 250);
    }
  }, 2800);
}

function launchBurst() {
  const colors = ['#c9a84c', '#f0d080', '#e8a0b0', '#fff', '#b5405a', '#ff8fa3'];
  const x = Math.random() * 90 + 5;  // % from left
  const y = Math.random() * 60 + 5;  // % from top
  const particleCount = 16;

  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'fw-burst';
    const angle = (360 / particleCount) * i;
    const dist = Math.random() * 80 + 60;
    const rad = (angle * Math.PI) / 180;
    const tx = Math.cos(rad) * dist;
    const ty = Math.sin(rad) * dist;
    const color = colors[Math.floor(Math.random() * colors.length)];

    dot.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      background: ${color};
      box-shadow: 0 0 6px ${color};
      --tx: ${tx}px;
      --ty: ${ty}px;
      width: ${Math.random() * 5 + 4}px;
      height: ${Math.random() * 5 + 4}px;
      animation-duration: ${Math.random() * 0.4 + 0.7}s;
    `;

    fireworksContainer.appendChild(dot);

    // Cleanup
    setTimeout(() => dot.remove(), 1200);
  }
}

// ─── Letter Scroll reveal ────────────────────────────────────────────────────
// Subtle glow on letter paper on scroll
window.addEventListener('scroll', () => {
  const paper = document.querySelector('.letter-paper');
  if (!paper) return;
  const rect = paper.getBoundingClientRect();
  const visible = rect.top < window.innerHeight && rect.bottom > 0;
  if (visible) {
    paper.style.boxShadow = `
      0 2px 0 #c9a84c,
      0 -2px 0 #c9a84c,
      8px 0 0 #c9a84c,
      -8px 0 0 #c9a84c,
      0 30px 100px rgba(181,64,90,0.25),
      inset 0 0 60px rgba(201,168,76,0.07)
    `;
  }
});
