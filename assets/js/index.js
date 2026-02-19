// Navbar
let lastY = scrollY;
const navbar = document.getElementById('navbar');

addEventListener('scroll', () => {
  navbar.style.top = ((currentY = scrollY) < lastY && navbar.getBoundingClientRect().top < 90) ? '0'  : '-90px';
  
  document.querySelectorAll('.txtNavbar, #navbar').forEach(el => el.classList.toggle('scrolled', currentY > 90));

  lastY = currentY;
});

// Ícone de tema e idioma
document.addEventListener('DOMContentLoaded', () => {
  navbar.append(createLanguageToggle(), createThemeToggle());
  
  // Configura tema
  const themeToggle = document.querySelector('.toggleTheme');
  const [sunIcon, moonIcon] = themeToggle.querySelectorAll('.themeIcon');
  
  Object.assign(moonIcon.style, {
    opacity: '0',
    transform: 'scale(.5) rotate(-15deg)'
  });
  
  const updateTheme = () => {
    const isDark = document.body.classList.contains('dark');
    themeToggle.style.color = isDark ? '#FFF' : '#0A0A0A';
    
    Object.assign(sunIcon.style, {
      opacity: isDark ? '0' : '1',
      transform: isDark ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(-46deg)'
    });
    
    Object.assign(moonIcon.style, {
      opacity: isDark ? '1' : '0',
      transform: isDark ? 'scale(1) rotate(-15deg)' : 'scale(0) rotate(-180deg)'
    });
  };

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    updateTheme();
  });

  // Configura idioma
  const langToggle = document.querySelector('.languageToggle');
  const menu = langToggle.querySelector('.languageMenu');
  
  langToggle.addEventListener('click', el => el.stopPropagation() || menu.classList.toggle('open'));
  document.addEventListener('click', () => menu.classList.remove('open'));
  
  menu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => loadLanguage(btn.dataset.lang));
  });

  loadLanguage(localStorage.getItem('lang') || 'pt-BR');
  updateTheme();
  addEventListener('scroll', updateTheme);
});

function createLanguageToggle() {
  const container = document.createElement('div');
  container.className = 'languageToggle';
  container.innerHTML = `<i class="fas fa-globe"></i>
    <div class="languageMenu">
      <button data-lang="pt-BR">🇧🇷 Português</button>
      <button data-lang="en-US">🇺🇸 English</button>
    </div>`;
  return container;
}

function createThemeToggle() {
  const toggle = document.createElement('div');
  toggle.className = 'toggleTheme';
  toggle.innerHTML = `<i class="fas fa-sun themeIcon sun"></i> <i class="fas fa-moon themeIcon moon"></i>`;
  return toggle;
}

// Configura internacionalização
async function loadLanguage(lang) {
  const res = await fetch(`assets/lang/${lang}.json`);
  const data = await res.json();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) el.innerText = data[key];
  });
  localStorage.setItem('lang', lang);
}