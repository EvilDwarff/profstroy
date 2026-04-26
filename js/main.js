const headerToggle = document.querySelector('.header__toggle');
const headerNav = document.querySelector('.header__nav');

if (headerToggle && headerNav) {
  headerToggle.addEventListener('click', () => {
    headerNav.classList.toggle('header__nav--active');
    headerToggle.classList.toggle('active'); // ВОТ ЭТОГО НЕ ХВАТАЛО
  });
}

// Закрытие меню при клике на ссылку
const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(link => {
  link.addEventListener('click', () => {
    headerNav.classList.remove('header__nav--active');
    headerToggle.classList.remove('active'); // синхронизация
  });
});


// Initialize Swiper for Projects
if (document.querySelector('.projects__swiper')) {
  const projectsSwiper = new Swiper('.projects__swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.projects__nav--next',
      prevEl: '.projects__nav--prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    
    alert(`Спасибо, ${name}! Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
    contactForm.reset();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add active class to current page link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const allLinks = document.querySelectorAll('.header__link, .footer__link');
allLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPage) {
    link.classList.add('header__link--active');
  }
});



// === АНИМАЦИЯ ПРИ СКРОЛЛЕ ===

// Функция для наблюдения за элементами
const observeElements = (selector, options = {}) => {
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Добавляем класс с небольшой задержкой для каскада
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, options.delay || 0);
        
        // Перестаём наблюдать после анимации
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Срабатывает, когда 15% элемента видно
    rootMargin: '0px 0px -50px 0px' // Срабатывает чуть до появления
  });
  
  elements.forEach(el => observer.observe(el));
};

// Анимация при скролле (появление карточек)
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.15, // Срабатывает, когда 15% элемента видно
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Запускаем анимацию только один раз
      }
    });
  }, observerOptions);

  // Наблюдаем за всеми карточками
  document.querySelectorAll('.advantage-card').forEach(card => {
    observer.observe(card);
  });
});