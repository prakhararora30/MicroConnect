/**
 * Dynamic Constellation Canvas & Interactive Auth Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Canvas Setup
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  
  // Mouse tracker
  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  // Particle Class
  class Particle {
    constructor(side) {
      this.side = side; // 'left' or 'right'
      this.reset();
    }

    reset() {
      // Cluster particles primarily on left and right edges like reference image
      if (this.side === 'left') {
        this.x = Math.random() * (width * 0.35);
      } else {
        this.x = width - (Math.random() * (width * 0.35));
      }
      
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;

      // Warm gradient palette for nodes
      const colors = ['#ff5e36', '#ffa034', '#ffd24c', '#ff8442'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      
      this.baseRadius = Math.random() * 2.5 + 1.5;
      this.radius = this.baseRadius;
      
      // Some nodes are glowing key hubs
      this.isHub = Math.random() > 0.75;
      if (this.isHub) {
        this.baseRadius += 1.5;
        this.radius = this.baseRadius;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off screen boundaries for their respective side
      if (this.side === 'left') {
        if (this.x < 0 || this.x > width * 0.4) this.vx *= -1;
      } else {
        if (this.x < width * 0.6 || this.x > width) this.vx *= -1;
      }

      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Proximity Interaction
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
          this.radius = this.baseRadius + force * 2.5;
        } else {
          this.radius = this.baseRadius;
        }
      } else {
        this.radius = this.baseRadius;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      // Outer glow for hub nodes
      if (this.isHub) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.15;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }
  }

  function initParticles() {
    particles = [];
    const countPerSide = Math.min(Math.floor((width * height) / 20000), 45);

    // Left cluster
    for (let i = 0; i < countPerSide; i++) {
      particles.push(new Particle('left'));
    }

    // Right cluster
    for (let i = 0; i < countPerSide; i++) {
      particles.push(new Particle('right'));
    }
  }

  function drawConnections() {
    const maxDist = 160;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        // Only connect particles on the same side
        if (particles[i].side !== particles[j].side) continue;

        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 140, 50, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();

  // Auth Modal Handlers
  const authModal = document.getElementById('auth-modal');
  const getStartedBtn = document.getElementById('get-started-btn');
  const loginLink = document.getElementById('login-link');
  const modalClose = document.getElementById('modal-close');
  const signupView = document.getElementById('signup-view');
  const loginView = document.getElementById('login-view');
  const switchToLogin = document.getElementById('switch-to-login');
  const switchToSignup = document.getElementById('switch-to-signup');

  function openModal(view) {
    if (view === 'signup') {
      signupView.classList.remove('hidden');
      loginView.classList.add('hidden');
    } else {
      loginView.classList.remove('hidden');
      signupView.classList.add('hidden');
    }
    authModal.classList.remove('hidden');
    authModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    authModal.classList.add('hidden');
    authModal.setAttribute('aria-hidden', 'true');
  }

  getStartedBtn.addEventListener('click', () => openModal('signup'));
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('login');
  });
  modalClose.addEventListener('click', closeModal);

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeModal();
  });

  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('login');
  });

  switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('signup');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !authModal.classList.contains('hidden')) {
      closeModal();
    }
  });
});
