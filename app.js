// ============================================================
// SPECTRUM // APPLICATION CORE & DOPAMINE ENGINE (COMPLETE)
// ============================================================

(function () {
  'use strict';

  // Persistent State
  const state = {
    theme: localStorage.getItem('spectrum_theme') || 'dark',
    muted: localStorage.getItem('spectrum_muted') === 'true',
    cart: JSON.parse(localStorage.getItem('spectrum_cart') || '[]'),
    xp: parseInt(localStorage.getItem('spectrum_xp') || '450', 10),
    bestScore: parseInt(localStorage.getItem('spectrum_rex_best') || '0', 10),
  };

  // ------------------------------------------------------------
  // 1. WEB AUDIO SYNTHESIZER (Pure Algorithmic SFX)
  // ------------------------------------------------------------
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playPop(freq = 520) {
    if (state.muted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {
      console.log('Audio muted', e);
    }
  }

  function playJumpSound() {
    if (state.muted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } catch (e) {
      console.log('Audio muted', e);
    }
  }

  function playDopamineChime() {
    if (state.muted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = audioCtx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch (e) {
      console.log('Audio muted', e);
    }
  }

  function playCheckoutFanfare() {
    if (state.muted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const chord = [440, 554.37, 659.25, 880, 1108.73];
      chord.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = audioCtx.currentTime + i * 0.04;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.25);
      });
    } catch (e) {
      console.log('Audio muted', e);
    }
  }

  // Audio Toggle Button Handlers
  const audioToggleBtn = document.getElementById('audio-toggle');
  const soundOnIcon = document.getElementById('sound-on-icon');
  const soundOffIcon = document.getElementById('sound-off-icon');

  function updateAudioUI() {
    if (state.muted) {
      soundOnIcon.style.display = 'none';
      soundOffIcon.style.display = 'inline-block';
      audioToggleBtn.title = 'Sound is Muted (Click to Unmute)';
    } else {
      soundOnIcon.style.display = 'inline-block';
      soundOffIcon.style.display = 'none';
      audioToggleBtn.title = 'Sound is ON (Click to Mute)';
    }
    localStorage.setItem('spectrum_muted', state.muted);
  }

  updateAudioUI();

  audioToggleBtn.addEventListener('click', () => {
    state.muted = !state.muted;
    updateAudioUI();
    if (!state.muted) {
      playPop(650);
    }
  });

  // ------------------------------------------------------------
  // 2. CANVAS CONFETTI ENGINE (Quad-Color Explosions)
  // ------------------------------------------------------------
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const QUAD_COLORS = ['#8AB4F8', '#F28B82', '#FDD663', '#81C995', '#4285F4', '#EA4335', '#FBBC05', '#34A853'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = QUAD_COLORS[Math.floor(Math.random() * QUAD_COLORS.length)];
      this.size = Math.random() * 8 + 4;
      this.speedX = (Math.random() - 0.5) * 16;
      this.speedY = (Math.random() - 0.8) * 18;
      this.gravity = 0.45;
      this.opacity = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 10;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.opacity -= this.decay;
      this.rotation += this.rotSpeed;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function explodeConfetti(originX, originY, count = 45) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(originX, originY));
    }
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.opacity <= 0 || p.y > canvas.height) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderConfetti);
  }
  requestAnimationFrame(renderConfetti);

  // ------------------------------------------------------------
  // 3. THEME TOGGLE ENGINE
  // ------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    state.theme = themeName;
    localStorage.setItem('spectrum_theme', themeName);
  }

  applyTheme(state.theme);

  themeToggleBtn.addEventListener('click', (e) => {
    playPop(700);
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    explodeConfetti(e.clientX, e.clientY, 20);
  });

  // ------------------------------------------------------------
  // 4. DOPAMINE LEVEL & METER PROGRESS
  // ------------------------------------------------------------
  const meterFill = document.getElementById('meter-fill');
  const levelBadge = document.getElementById('dopamine-level-badge');
  const xpText = document.getElementById('dopamine-xp-text');

  function updateDopamineUI() {
    const level = Math.floor(state.xp / 1000) + 1;
    const currentLevelXP = state.xp % 1000;
    const percentage = Math.min(100, Math.max(6, (currentLevelXP / 1000) * 100));

    levelBadge.textContent = `LVL ${level}`;
    meterFill.style.width = `${percentage}%`;
    xpText.textContent = `${currentLevelXP} / 1000 XP`;

    localStorage.setItem('spectrum_xp', state.xp);
  }

  function addXP(amount, originEl) {
    state.xp += amount;
    updateDopamineUI();

    if (originEl) {
      const rect = originEl.getBoundingClientRect();
      const floater = document.createElement('div');
      floater.textContent = `+${amount} XP ⚡`;
      floater.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top}px;
        color: var(--accent-yellow);
        font-weight: 800;
        font-size: 1rem;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease;
        text-shadow: 0 0 10px rgba(253, 214, 99, 0.6);
      `;
      document.body.appendChild(floater);

      requestAnimationFrame(() => {
        floater.style.transform = 'translate(-50%, -90px) scale(1.35)';
        floater.style.opacity = '0';
      });

      setTimeout(() => floater.remove(), 900);
    }
  }

  updateDopamineUI();

  // ------------------------------------------------------------
  // 5. CART ENGINE & INTERACTIONS
  // ------------------------------------------------------------
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartCounter = document.getElementById('cart-counter');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartDrawerCount = document.getElementById('cart-drawer-count');
  const cartXpSum = document.getElementById('cart-xp-sum');
  const checkoutBtn = document.getElementById('checkout-btn');

  function toggleCart(open) {
    if (open) {
      cartBackdrop.classList.add('open');
      cartDrawer.classList.add('open');
      playPop(600);
    } else {
      cartBackdrop.classList.remove('open');
      cartDrawer.classList.remove('open');
      playPop(400);
    }
  }

  cartToggleBtn.addEventListener('click', () => toggleCart(true));
  closeCartBtn.addEventListener('click', () => toggleCart(false));
  cartBackdrop.addEventListener('click', () => toggleCart(false));

  function updateCartUI() {
    const totalCount = state.cart.length;
    cartCounter.textContent = totalCount;
    cartDrawerCount.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

    cartCounter.classList.add('bounce');
    setTimeout(() => cartCounter.classList.remove('bounce'), 300);

    if (totalCount === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-rex">🦖</div>
          <p class="empty-title">Your cart is currently starved of dopamine.</p>
          <p class="empty-sub">Hit "+ Add to Cart" on any gadget to trigger instant neuro-satisfaction.</p>
          <button class="btn btn-secondary" id="empty-play-rex-btn" style="margin-top: 16px;">
            <span>Play Rex Runner 🌵</span>
          </button>
        </div>
      `;
      cartXpSum.textContent = '+0 XP ⚡';
      
      const emptyRexBtn = document.getElementById('empty-play-rex-btn');
      if (emptyRexBtn) {
        emptyRexBtn.addEventListener('click', () => {
          toggleCart(false);
          openRexGame();
        });
      }
      return;
    }

    let totalXP = 0;
    cartItemsContainer.innerHTML = state.cart
      .map((item, idx) => {
        totalXP += item.xp;
        return `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <h4>${item.icon || '⚡'} ${item.title}</h4>
              <span>+${item.xp} XP Bonus</span>
            </div>
            <button class="cart-item-remove" data-index="${idx}" title="Remove item">✕</button>
          </div>
        `;
      })
      .join('');

    cartXpSum.textContent = `+${totalXP} XP ⚡`;
    localStorage.setItem('spectrum_cart', JSON.stringify(state.cart));

    document.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        state.cart.splice(index, 1);
        playPop(350);
        updateCartUI();
      });
    });
  }

  function addToCart(id, title, xp, color, icon, originEl) {
    state.cart.push({ id, title, xp, color, icon });
    updateCartUI();
    addXP(xp, originEl);
    playDopamineChime();

    if (originEl) {
      const rect = originEl.getBoundingClientRect();
      explodeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    }
  }

  // Attach Add to Cart triggers
  document.querySelectorAll('.btn-add-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const xp = parseInt(btn.getAttribute('data-xp'), 10);
      const color = btn.getAttribute('data-color');
      const icon = btn.getAttribute('data-icon') || '⚡';
      addToCart(id, title, xp, color, icon, btn);
    });
  });

  // "I'm Feeling Lucky" Random Generator
  const feelingLuckyBtn = document.getElementById('feeling-lucky-btn');
  const allAddBtns = Array.from(document.querySelectorAll('.btn-add-cart'));

  feelingLuckyBtn.addEventListener('click', () => {
    if (allAddBtns.length === 0) return;
    const randomBtn = allAddBtns[Math.floor(Math.random() * allAddBtns.length)];
    const rect = feelingLuckyBtn.getBoundingClientRect();
    explodeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);

    const id = randomBtn.getAttribute('data-id');
    const title = randomBtn.getAttribute('data-title');
    const xp = parseInt(randomBtn.getAttribute('data-xp'), 10);
    const color = randomBtn.getAttribute('data-color');
    const icon = randomBtn.getAttribute('data-icon') || '⚡';

    addToCart(id, title, xp, color, icon, feelingLuckyBtn);
  });

  // Category Filter Pills
  document.querySelectorAll('.filter-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      playPop(450);

      const filter = pill.getAttribute('data-filter');
      document.querySelectorAll('.bento-card').forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------
  // 6. QUANTUM DOPAMINE CERTIFICATE MODAL
  // ------------------------------------------------------------
  const certModal = document.getElementById('certificate-modal');
  const closeCertBtn = document.getElementById('close-cert-btn');
  const certItemsCloud = document.getElementById('cert-items-cloud');
  const certXpGained = document.getElementById('cert-xp-gained');
  const certSerialId = document.getElementById('cert-serial-id');
  const certTimestampStr = document.getElementById('cert-timestamp-str');
  const printCertBtn = document.getElementById('print-cert-btn');

  function generateSerial() {
    const chars = '0123456789ABCDEF';
    let code = 'SPEC-DOP-';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  function openCertificateModal(purchasedItems, totalXP) {
    certSerialId.textContent = generateSerial();
    const now = new Date();
    certTimestampStr.textContent = `TIMESTAMP: ${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`;
    
    certXpGained.textContent = `+${totalXP * 2} XP ⚡`;

    if (purchasedItems.length > 0) {
      certItemsCloud.innerHTML = purchasedItems
        .map((item) => `
          <div class="cert-item-chip" data-color="${item.color}">
            <span>${item.icon || '⚡'}</span>
            <span>${item.title}</span>
          </div>
        `)
        .join('');
    } else {
      certItemsCloud.innerHTML = `
        <div class="cert-item-chip" data-color="blue">
          <span>⚡</span>
          <span>Quantum Spectrum Core Bundle (8 Inventions)</span>
        </div>
      `;
    }

    certModal.classList.add('active');
    playCheckoutFanfare();

    explodeConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  }

  closeCertBtn.addEventListener('click', () => certModal.classList.remove('active'));
  printCertBtn.addEventListener('click', () => {
    playPop(800);
    window.print();
  });

  checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
      playPop(300);
      alert('Your cart is empty! Add some high-tech dopamine first!');
      return;
    }

    const purchasedCopy = [...state.cart];
    const bonusXP = state.cart.reduce((sum, item) => sum + item.xp, 0);
    addXP(bonusXP * 2, checkoutBtn);

    state.cart = [];
    updateCartUI();
    toggleCart(false);

    openCertificateModal(purchasedCopy, bonusXP);
  });

  // ------------------------------------------------------------
  // 7. REX RUNNER 2D CANVAS MINI-GAME
  // ------------------------------------------------------------
  const rexModal = document.getElementById('rex-game-modal');
  const closeGameBtn = document.getElementById('close-game-btn');
  const rexCanvas = document.getElementById('rex-canvas');
  const rexCtx = rexCanvas.getContext('2d');
  const gameScoreVal = document.getElementById('game-score-val');
  const gameBestVal = document.getElementById('game-best-val');
  const gameJumpBtn = document.getElementById('game-jump-btn');

  let gameRunning = false;
  let gameScore = 0;
  let animationId = null;

  const rex = {
    x: 40,
    y: 140,
    width: 24,
    height: 28,
    velocityY: 0,
    gravity: 0.75,
    isJumping: false,
    groundY: 140,
  };

  let cacti = [];
  let cactusSpeed = 4.5;
  let nextCactusTimer = 0;

  function openRexGame() {
    rexModal.classList.add('active');
    gameScore = 0;
    cacti = [];
    cactusSpeed = 4.5;
    rex.y = rex.groundY;
    rex.velocityY = 0;
    rex.isJumping = false;
    gameBestVal.textContent = state.bestScore;
    gameRunning = true;
    playPop(800);
    gameLoop();
  }

  function closeRexGame() {
    rexModal.classList.remove('active');
    gameRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
  }

  function jumpRex() {
    if (!gameRunning) {
      openRexGame();
      return;
    }
    if (!rex.isJumping) {
      rex.velocityY = -13;
      rex.isJumping = true;
      playJumpSound();
    }
  }

  function gameLoop() {
    if (!gameRunning) return;

    rexCtx.clearRect(0, 0, rexCanvas.width, rexCanvas.height);

    // Ground Line
    rexCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    rexCtx.lineWidth = 2;
    rexCtx.beginPath();
    rexCtx.moveTo(0, 168);
    rexCtx.lineTo(rexCanvas.width, 168);
    rexCtx.stroke();

    // Rex Physics
    rex.velocityY += rex.gravity;
    rex.y += rex.velocityY;
    if (rex.y >= rex.groundY) {
      rex.y = rex.groundY;
      rex.velocityY = 0;
      rex.isJumping = false;
    }

    // Draw 8-bit Rex
    rexCtx.fillStyle = '#81C995'; // Green
    rexCtx.font = '28px sans-serif';
    rexCtx.fillText('🦖', rex.x, rex.y + 24);

    // Spawn Cacti
    nextCactusTimer++;
    if (nextCactusTimer > 85 + Math.random() * 50) {
      cacti.push({
        x: rexCanvas.width,
        y: 142,
        width: 18,
        height: 26,
      });
      nextCactusTimer = 0;
      cactusSpeed += 0.05;
    }

    // Update & Draw Cacti
    for (let i = cacti.length - 1; i >= 0; i--) {
      const c = cacti[i];
      c.x -= cactusSpeed;

      rexCtx.fillStyle = '#F28B82'; // Coral Red Cactus
      rexCtx.font = '24px sans-serif';
      rexCtx.fillText('🌵', c.x, c.y + 22);

      // Collision detection
      if (
        rex.x + 20 > c.x &&
        rex.x < c.x + 16 &&
        rex.y + 22 > c.y
      ) {
        playPop(200);
        gameRunning = false;

        if (gameScore > state.bestScore) {
          state.bestScore = gameScore;
          localStorage.setItem('spectrum_rex_best', state.bestScore);
          gameBestVal.textContent = state.bestScore;
        }

        const xpAwarded = Math.floor(gameScore * 2);
        addXP(xpAwarded, rexCanvas);

        rexCtx.fillStyle = '#FFFFFF';
        rexCtx.font = 'bold 16px Space Grotesk, sans-serif';
        rexCtx.textAlign = 'center';
        rexCtx.fillText(`GAME OVER! +${xpAwarded} XP GAINED`, rexCanvas.width / 2, 70);
        rexCtx.fillText('CLICK JUMP OR SPACE TO RESTART', rexCanvas.width / 2, 95);
        rexCtx.textAlign = 'left';
        return;
      }

      if (c.x < -30) {
        cacti.splice(i, 1);
        gameScore += 10;
        gameScoreVal.textContent = gameScore;
      }
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  // Rex triggers
  document.getElementById('rex-quick-jump-btn').addEventListener('click', openRexGame);
  document.getElementById('mascot-rex').addEventListener('click', openRexGame);
  closeGameBtn.addEventListener('click', closeRexGame);
  gameJumpBtn.addEventListener('click', jumpRex);
  rexCanvas.addEventListener('click', jumpRex);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && rexModal.classList.contains('active')) {
      e.preventDefault();
      jumpRex();
    }
  });

  // Mascot Bugdroid feedback
  document.getElementById('mascot-bugdroid').addEventListener('click', (e) => {
    playPop(620);
    const phrases = ['Compiling cleanly! ✨', 'Zero bugs detected! 💚', 'Refactor approved! 🚀', 'Nodding at your idea! 🤖'];
    const p = phrases[Math.floor(Math.random() * phrases.length)];
    document.getElementById('bugdroid-speech').textContent = p;
    explodeConfetti(e.clientX, e.clientY, 15);
  });

  updateCartUI();
})();
