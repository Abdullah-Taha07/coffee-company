"use strict";
(self["webpackChunkcoffee_company"] = self["webpackChunkcoffee_company"] || []).push([[792],{

/***/ 26:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _assets_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(927);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(600);
/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(423);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(336);
/* harmony import */ var _assets_js_product_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(863);
// ===== main.js =====

// استيراد ملفات التنسيق والمكتبات





// استيراد كود المنتجات

document.addEventListener('DOMContentLoaded', function () {
  // ===== Navbar =====
  var header = document.querySelector('header');
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var sections = document.querySelectorAll('section[id]');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var navbarToggler = document.querySelector('.navbar-toggler');
  var hideTimeout;

  // تفعيل الرابط النشط عند التمرير
  var activateNavLink = function activateNavLink() {
    var currentSection = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === "#".concat(currentSection));
    });
  };

  // تغيير خلفية الهيدر عند التمرير
  var toggleNavbarOnScroll = function toggleNavbarOnScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', function () {
    activateNavLink();
    toggleNavbarOnScroll();
  });

  // إخفاء Navbar تلقائيًا عند التحويم أو الضغط خارجها
  if (navbarCollapse && navbarToggler) {
    navbarCollapse.addEventListener('mouseenter', function () {
      return hideTimeout && clearTimeout(hideTimeout);
    });
    navbarCollapse.addEventListener('mouseleave', function () {
      hideTimeout = setTimeout(function () {
        if (navbarCollapse.classList.contains('show')) navbarToggler.click();
      }, 100);
    });
    document.addEventListener('click', function (event) {
      if (navbarCollapse.classList.contains('show') && !event.target.closest('.navbar-collapse') && !event.target.closest('.navbar-toggler')) {
        navbarToggler.click();
      }
    });
  }

  // ===== التحقق من النماذج =====
  function setupFormValidation(formSelector, fields) {
    var form = document.querySelector(formSelector);
    if (!form) return;
    function validateField(field, validator) {
      var isValid = validator(field.value.trim());
      field.classList.toggle('is-valid', isValid);
      field.classList.toggle('is-invalid', !isValid);
      return isValid;
    }
    fields.forEach(function (_ref) {
      var selector = _ref.selector,
        validator = _ref.validator;
      var field = form.querySelector(selector);
      if (!field) return;
      var validate = function validate() {
        return validateField(field, validator);
      };
      field.addEventListener('input', validate);
      field.addEventListener('blur', validate);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = fields.every(function (_ref2) {
        var selector = _ref2.selector,
          validator = _ref2.validator;
        var field = form.querySelector(selector);
        return validateField(field, validator);
      });
      if (allValid) {
        alert('✅ تم إرسال الرسالة بنجاح!');
        form.reset();
        form.querySelectorAll('.is-valid').forEach(function (el) {
          return el.classList.remove('is-valid');
        });
      }
    });
  }

  // نموذج التواصل
  setupFormValidation('#contact form', [{
    selector: 'input[type="text"]',
    validator: function validator(val) {
      return val.length >= 2;
    }
  }, {
    selector: 'input[type="email"]',
    validator: function validator(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
  }, {
    selector: 'textarea',
    validator: function validator(val) {
      return val.length >= 10;
    }
  }]);

  // نموذج النشرة البريدية
  setupFormValidation('footer form', [{
    selector: 'input[type="email"]',
    validator: function validator(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
  }]);
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [599,891], () => (__webpack_exec__(26)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map