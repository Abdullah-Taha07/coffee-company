import '../sass/main.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('review-form');
  const reviewsList = document.getElementById('reviews-list');

  // --- ✅ استعادة التقييمات المحفوظة
  const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
  savedReviews.forEach(addReviewToDOM);

  if (form && reviewsList) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const review = document.getElementById('review').value.trim();
      const rating = document.getElementById('rating').value;

      // --- ✅ التحقق من الحقول الفارغة
      if (!name || !review || !rating) {
        alert('يرجى تعبئة جميع الحقول قبل الإرسال.');
        return;
      }

      const newReview = {
        name,
        review,
        rating,
        date: new Date().toLocaleString(),
        avatar: getRandomAvatar()
      };

      // --- ✅ إضافة إلى Local Storage
      savedReviews.unshift(newReview);
      localStorage.setItem('reviews', JSON.stringify(savedReviews));

      // --- ✅ عرض التقييم في الصفحة
      addReviewToDOM(newReview);
      form.reset();
    });
  }

  // --- ✅ توليد صورة رمزية عشوائية
  function getRandomAvatar() {
    const id = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/50?img=${id}`;
  }

  // --- ✅ عرض التقييم في الصفحة مع تأثير
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
    reviewsList.prepend(reviewEl);

    // تأثير الظهور السلس
    setTimeout(() => reviewEl.classList.add('show'), 10);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('تم إرسال رسالتك بنجاح ✅');
      contactForm.reset();
    });
  }
});
