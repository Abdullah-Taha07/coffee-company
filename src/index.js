// ===== main.js =====

// استيراد ملفات التنسيق والمكتبات
import './assets/sass/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

// استيراد كود المنتجات
import './assets/js/product.js';

document.addEventListener('DOMContentLoaded', () => {

  // ===== Navbar =====
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  let hideTimeout;

  // تفعيل الرابط النشط عند التمرير
  const activateNavLink = () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  };

  // تغيير خلفية الهيدر عند التمرير
  const toggleNavbarOnScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
  };

  window.addEventListener('scroll', () => {
    activateNavLink();
    toggleNavbarOnScroll();
  });

  // إخفاء Navbar تلقائيًا عند التحويم أو الضغط خارجها
  if (navbarCollapse && navbarToggler) {
    navbarCollapse.addEventListener('mouseenter', () => hideTimeout && clearTimeout(hideTimeout));
    navbarCollapse.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        if (navbarCollapse.classList.contains('show')) navbarToggler.click();
      }, 100);
    });

    document.addEventListener('click', (event) => {
      if (navbarCollapse.classList.contains('show') &&
          !event.target.closest('.navbar-collapse') &&
          !event.target.closest('.navbar-toggler')) {
        navbarToggler.click();
      }
    });
  }

  // ===== التحقق من النماذج =====
  function setupFormValidation(formSelector, fields) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    function validateField(field, validator) {
      const isValid = validator(field.value.trim());
      field.classList.toggle('is-valid', isValid);
      field.classList.toggle('is-invalid', !isValid);
      return isValid;
    }

    fields.forEach(({ selector, validator }) => {
      const field = form.querySelector(selector);
      if (!field) return;
      const validate = () => validateField(field, validator);
      field.addEventListener('input', validate);
      field.addEventListener('blur', validate);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const allValid = fields.every(({ selector, validator }) => {
        const field = form.querySelector(selector);
        return validateField(field, validator);
      });
      if (allValid) {
        alert('✅ تم إرسال الرسالة بنجاح!');
        form.reset();
        form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
      }
    });
  }

  // نموذج التواصل
  setupFormValidation('#contact form', [
    { selector: 'input[type="text"]', validator: val => val.length >= 2 },
    { selector: 'input[type="email"]', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { selector: 'textarea', validator: val => val.length >= 10 }
  ]);

  // نموذج النشرة البريدية
  setupFormValidation('footer form', [
    { selector: 'input[type="email"]', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) }
  ]);

});
