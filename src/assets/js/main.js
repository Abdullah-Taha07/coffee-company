// استيراد ملفات التنسيق الأساسية
import '../sass/main.scss'; // ملف Sass الرئيسي
import 'bootstrap'; // مكتبة Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css'; // ملف CSS الجاهز من Bootstrap
import $ from 'jquery'; // مكتبة jQuery (لو بتحتاجها)

// تشغيل الكود بعد تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {

  // ====================================================
  // ✅ 1. نموذج تقييمات المنتجات
  // ====================================================

  const reviewForm = document.getElementById('review-form'); // النموذج الخاص بالتقييم
  const reviewsList = document.getElementById('reviews-list'); // القائمة اللي هتظهر فيها التقييمات

  const savedReviews = JSON.parse(localStorage.getItem('reviews')) || []; // جلب التقييمات المحفوظة في LocalStorage

  savedReviews.forEach(addReviewToDOM); // عرض التقييمات المحفوظة عند فتح الصفحة

  if (reviewForm && reviewsList) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // جلب القيم من الحقول
      const name = document.getElementById('name').value.trim();
      const review = document.getElementById('review').value.trim();
      const rating = document.getElementById('rating').value;

      // التحقق إن كل الحقول متعبيه
      if (!name || !review || !rating) {
        alert('يرجى تعبئة جميع الحقول قبل الإرسال.');
        return;
      }

      // إنشاء تقييم جديد
      const newReview = {
        name,
        review,
        rating,
        date: new Date().toLocaleString(), // التاريخ والوقت الحالي
        avatar: getRandomAvatar() // صورة رمزية عشوائية
      };

      savedReviews.unshift(newReview); // إضافة التقييم الجديد في أول القائمة
      localStorage.setItem('reviews', JSON.stringify(savedReviews)); // حفظ القائمة في LocalStorage

      addReviewToDOM(newReview); // عرض التقييم الجديد
      reviewForm.reset(); // إعادة ضبط النموذج

      // إظهار رسالة نجاح داخل النموذج
      showMessage(reviewForm, 'تم إرسال تقييمك بنجاح ✅', 'success');
    });
  }

  // دالة للحصول على صورة رمزية عشوائية
  function getRandomAvatar() {
    const id = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/50?img=${id}`;
  }

  // دالة لإضافة التقييم في واجهة المستخدم
  function addReviewToDOM({ name, review, rating, date, avatar }) {
    const reviewEl = document.createElement('div');
    reviewEl.className = 'border rounded p-3 mb-2 d-flex gap-3 align-items-start review fade-in';
    reviewEl.innerHTML = `
      <img src="${avatar}" alt="avatar" class="rounded-circle" width="50" height="50">
      <div>
        <strong>${name}</strong> - 
        <span>${'⭐'.repeat(rating)}</span>
        <p class="mb-1">${review}</p>
        <small class="text-muted">${date}</small>
      </div>
    `;
    reviewsList.prepend(reviewEl); // عرض التقييم في الأعلى
    setTimeout(() => reviewEl.classList.add('show'), 10); // تأثير بسيط للظهور
  }

  // ====================================================
  // ✅ 2. نموذج "اتصل بنا" بسيط (بدون تحقق)
  // ====================================================

  const simpleContactForm = document.getElementById('contact-form');
  if (simpleContactForm) {
    simpleContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      simpleContactForm.reset(); // إعادة تعيين الحقول
      showMessage(simpleContactForm, 'تم إرسال رسالتك بنجاح ✅', 'success');
    });
  }

  // ====================================================
  // ✅ 3. نموذج "اتصل بنا" مع تحقق بسيط من البريد
  // ====================================================

  const validatedContactForm = document.getElementById('contactForm');
  if (validatedContactForm) {
    validatedContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = validatedContactForm.elements['name'].value.trim();
      const email = validatedContactForm.elements['email'].value.trim();
      const message = validatedContactForm.querySelector('textarea').value.trim();

      // التحقق من القيم
      if (!name || !email || !message) {
        showMessage(validatedContactForm, 'يرجى تعبئة جميع الحقول.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage(validatedContactForm, 'يرجى إدخال بريد إلكتروني صالح.', 'error');
        return;
      }

      // لو البيانات صحيحة
      showMessage(validatedContactForm, 'تم إرسال رسالتك بنجاح ✅', 'success');
      setTimeout(() => validatedContactForm.reset(), 2000);
    });
  }

  // ====================================================
  // ✅ 4. نموذج "اتصل بنا" بتحقق مخصص + رسائل خطأ أسفل الحقول
  // ====================================================

  const advancedContactForm = document.getElementById('contact-info');
  if (advancedContactForm) {
    const nameInput = advancedContactForm.querySelector('#name');
    const emailInput = advancedContactForm.querySelector('#email');
    const messageInput = advancedContactForm.querySelector('#message');

    advancedContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // مسح رسائل الخطأ السابقة
      advancedContactForm.querySelectorAll('.error-msg').forEach(el => el.remove());
      advancedContactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      let valid = true;

      // تحقق من الاسم
      if (nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'الاسم يجب أن يكون 2 أحرف على الأقل');
        valid = false;
      }

      // تحقق من البريد
      if (!validateEmail(emailInput.value.trim())) {
        showFieldError(emailInput, 'البريد الإلكتروني غير صالح');
        valid = false;
      }

      // تحقق من الرسالة
      if (messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'الرسالة يجب أن تكون 10 أحرف على الأقل');
        valid = false;
      }

      // عرض رسالة نجاح لو البيانات سليمة
      if (valid) {
        showMessage(advancedContactForm, 'تم إرسال رسالتك بنجاح ✅', 'success');
        advancedContactForm.reset();
      }
    });
  }

  // ====================================================
  // ✅ 5. إغلاق قائمة التنقل (navbar) بعد الضغط على رابط في الجوال
  // ====================================================

  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
        bsCollapse.hide(); // إغلاق القائمة بعد الضغط
      }
    });
  });

  // ====================================================
  // ✅ 6. دوال مساعدة مشتركة
  // ====================================================

  // دالة للتحقق من البريد الإلكتروني بصيغة بسيطة
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // دالة لعرض رسالة داخل أي نموذج (نجاح أو خطأ)
  function showMessage(formElement, text, type = 'success') {
    const existingMsg = formElement.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    const msg = document.createElement('div');
    msg.className = `form-message alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`;
    msg.innerText = text;
    formElement.appendChild(msg);

    setTimeout(() => msg.remove(), 4000); // إخفاء الرسالة بعد 4 ثواني
  }

  // دالة لإظهار رسالة خطأ تحت حقل معين
  function showFieldError(input, message) {
    input.classList.add('is-invalid');
    const error = document.createElement('div');
    error.className = 'error-msg text-danger mt-1';
    error.innerText = message;
    input.parentNode.appendChild(error);
  }

});
