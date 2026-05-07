// === Animación de entrada al hacer scroll ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .combo-card, .contact-card, .section-title, .section-sub')
  .forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

// === Estrellas fugaces aleatorias ===
function createShootingStar() {
  const star = document.createElement('div');
  star.style.cssText = `
    position: fixed;
    top: ${Math.random() * 50}%;
    left: ${Math.random() * 100}%;
    width: 2px; height: 2px;
    background: white;
    box-shadow: 0 0 10px white, 0 0 20px #00e5ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    animation: shoot 1.5s linear forwards;
  `;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1500);
}

const shootStyle = document.createElement('style');
shootStyle.textContent = `
  @keyframes shoot {
    0%   { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(-300px, 300px) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(shootStyle);

setInterval(createShootingStar, 3500);

// === Efecto de brillo en hover sobre cards (parallax suave del icono) ===
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-8px) scale(1.02) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === Smooth highlight del nav según sección visible ===
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('.menu-section');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderColor = '';
        link.style.background = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--neon-cyan)';
          link.style.borderColor = 'var(--neon-cyan)';
          link.style.background = 'rgba(0,229,255,0.1)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

console.log('%c🛸 AFTER · Sistema galáctico inicializado', 'color:#00e5ff; font-size:14px; font-weight:bold;');
