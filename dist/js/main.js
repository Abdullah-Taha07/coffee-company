"use strict";
(self["webpackChunkcoffee_company"] = self["webpackChunkcoffee_company"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/sass/main.scss */ "./src/assets/sass/main.scss");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-icons/font/bootstrap-icons.css */ "./node_modules/bootstrap-icons/font/bootstrap-icons.css");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _assets_js_product_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/js/product.js */ "./src/assets/js/product.js");
// ===== استيراد ملفات التنسيق والمكتبات =====
 // ملف التنسيق الرئيسي
 // Bootstrap CSS
 // أيقونات Bootstrap
 // Bootstrap JS

 // كود المنتجات

document.addEventListener('DOMContentLoaded', function () {
  // ===== Navbar =====
  var header = document.querySelector('header'); // الهيدر
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // روابط التنقل
  var sections = document.querySelectorAll('section[id]'); // كل الأقسام
  var navbarCollapse = document.querySelector('.navbar-collapse'); // قائمة الهامبرغر
  var navbarToggler = document.querySelector('.navbar-toggler'); // زر الهامبرغر
  var hideTimeout;

  // ===== تفعيل الرابط النشط عند التمرير =====
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

  // ===== تغيير خلفية الهيدر عند التمرير =====
  var toggleNavbarOnScroll = function toggleNavbarOnScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', function () {
    activateNavLink();
    toggleNavbarOnScroll();
  });

  // ===== إخفاء Navbar تلقائيًا عند التحويم أو الضغط خارجها =====
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

  // ===== دوال التحقق من النماذج =====
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

  // ===== نموذج التواصل =====
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

  // ===== نموذج النشرة البريدية =====
  setupFormValidation('footer form', [{
    selector: 'input[type="email"]',
    validator: function validator(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
  }]);

  // ===== زر إضافة المنتج للسلة =====
  var addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      alert('تم إضافة المنتج إلى السلة!');
    });
  }

  // ===== عرض التقييمات =====
  var reviewList = document.querySelector('.review-list');
  if (reviewList) {
    var reviews = [{
      user: 'أحمد',
      text: 'قهوة رائعة وطعم ممتاز!'
    }, {
      user: 'ليلى',
      text: 'رغوة الكابتشينو مذهلة.'
    }];
    reviews.forEach(function (_ref3) {
      var user = _ref3.user,
        text = _ref3.text;
      var div = document.createElement('div');
      div.className = 'review-item mb-3 p-2 border rounded';
      div.innerHTML = "<strong>".concat(user, "</strong>: ").concat(text);
      reviewList.appendChild(div);
    });
  }

  // ===== المنتجات المشابهة =====
  var similarProductsContainer = document.querySelector('.similar-products');
  if (similarProductsContainer) {
    var similarProducts = [{
      name: 'قهوة عادية',
      img: './assets/images/cof.jpg'
    }, {
      name: 'قهوة تركية',
      img: './assets/images/tur.jpg'
    }];
    similarProducts.forEach(function (_ref4) {
      var name = _ref4.name,
        img = _ref4.img;
      var div = document.createElement('div');
      div.className = 'col-6 col-md-3';
      div.innerHTML = "\n        <div class=\"card\">\n          <img src=\"".concat(img, "\" class=\"card-img-top\" alt=\"").concat(name, "\">\n          <div class=\"card-body text-center\">\n            <h5 class=\"card-title\">").concat(name, "</h5>\n          </div>\n        </div>\n      ");
      // ===== التحقق من وجود الصورة، وضع Placeholder إذا مفقودة =====
      var imgEl = div.querySelector('img');
      imgEl.onerror = function () {
        console.warn("\u26A0\uFE0F \u0627\u0644\u0635\u0648\u0631\u0629 \"".concat(img, "\" \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0635\u0648\u0631\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629."));
        imgEl.src = './assets/images/placeholder.jpg';
      };
      similarProductsContainer.appendChild(div);
    });
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_bootstrap_dist_js_bootstrap_esm_js-node_modules_bootstrap-icons_font_boo-ee2dce","data_image_svg_xml_3csvg_xmlns_27http_www_w3_org_2000_svg_27_viewBox_27-4_-4_8_8_27_3e_3ccirc-997e74"], () => (__webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map