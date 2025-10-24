// ===== استيراد ملفات التنسيق والمكتبات =====
import './assets/sass/main.scss'; // ملف التنسيق الرئيسي
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // أيقونات Bootstrap
import 'bootstrap'; // Bootstrap JS

import './assets/js/product.js'; // كود المنتجات

document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar =====
  const header = document.querySelector('header'); // الهيدر
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // روابط التنقل
  const sections = document.querySelectorAll('section[id]'); // كل الأقسام
  const navbarCollapse = document.querySelector('.navbar-collapse'); // قائمة الهامبرغر
  const navbarToggler = document.querySelector('.navbar-toggler'); // زر الهامبرغر
  let hideTimeout;

  // ===== تفعيل الرابط النشط عند التمرير =====
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

  // ===== تغيير خلفية الهيدر عند التمرير =====
  const toggleNavbarOnScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
  };

  window.addEventListener('scroll', () => {
    activateNavLink();
    toggleNavbarOnScroll();
  });

  // ===== إخفاء Navbar تلقائيًا عند التحويم أو الضغط خارجها =====
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

  // ===== دوال التحقق من النماذج =====
  function setupFormValidation(formSelector, fields) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    function validateField(field, validator) {
      const isValid = validator(field.value.trim());
      field.classList.toggle('is-valid', isValid);
      field.classList.toggle('is-invalid', !isValid);
      return isValid;
    }

    fields.forEach(({selector, validator}) => {
      const field = form.querySelector(selector);
      if (!field) return;
      const validate = () => validateField(field, validator);
      field.addEventListener('input', validate);
      field.addEventListener('blur', validate);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const allValid = fields.every(({selector, validator}) => {
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

  // ===== نموذج التواصل =====
  setupFormValidation('#contact form', [
    { selector: 'input[type="text"]', validator: val => val.length >= 2 },
    { selector: 'input[type="email"]', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
    { selector: 'textarea', validator: val => val.length >= 10 }
  ]);

  // ===== نموذج النشرة البريدية =====
  setupFormValidation('footer form', [
    { selector: 'input[type="email"]', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) }
  ]);

  // ===== زر إضافة المنتج للسلة =====
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      alert('تم إضافة المنتج إلى السلة!');
    });
  }

  // ===== عرض التقييمات =====
  const reviewList = document.querySelector('.review-list');
  if (reviewList) {
    const reviews = [
      { user: 'أحمد', text: 'قهوة رائعة وطعم ممتاز!' },
      { user: 'ليلى', text: 'رغوة الكابتشينو مذهلة.' }
    ];

    reviews.forEach(({user, text}) => {
      const div = document.createElement('div');
      div.className = 'review-item mb-3 p-2 border rounded';
      div.innerHTML = `<strong>${user}</strong>: ${text}`;
      reviewList.appendChild(div);
    });
  }

  // ===== المنتجات المشابهة =====
  const similarProductsContainer = document.querySelector('.similar-products');
  if (similarProductsContainer) {
    const similarProducts = [
      { name: 'قهوة عادية', img: './assets/images/cof.jpg' },
      { name: 'قهوة تركية', img: './assets/images/tur.jpg' }
    ];

    similarProducts.forEach(({name, img}) => {
      const div = document.createElement('div');
      div.className = 'col-6 col-md-3';
      div.innerHTML = `
        <div class="card">
          <img src="${img}" class="card-img-top" alt="${name}">
          <div class="card-body text-center">
            <h5 class="card-title">${name}</h5>
          </div>
        </div>
      `;
      // ===== التحقق من وجود الصورة، وضع Placeholder إذا مفقودة =====
      const imgEl = div.querySelector('img');
      imgEl.onerror = () => {
        console.warn(`⚠️ الصورة "${img}" غير موجودة. سيتم استخدام صورة افتراضية.`);
        imgEl.src = './assets/images/placeholder.jpg';
      };
      similarProductsContainer.appendChild(div);
    });
  }
});
