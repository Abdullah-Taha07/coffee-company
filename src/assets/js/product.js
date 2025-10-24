// product.js
// استيراد ملفات Sass
// ===== استيراد ملفات التنسيق والمكتبات =====
import '../sass/main.scss'; // ملف التنسيق الرئيسي
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // أيقونات Bootstrap
import 'bootstrap'; // Bootstrap JS

// --------------------
// إضافة المنتج إلى السلة
// --------------------
const addToCartBtn = document.querySelector('.add-to-cart-btn');

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const productTitle = document.querySelector('.product-title').textContent;
    alert(`تم إضافة "${productTitle}" إلى السلة!`);
    // هنا يمكن إضافة الكود لتخزين المنتج في localStorage أو إرسال البيانات للسيرفر
  });
}

// --------------------
// التقييمات
// --------------------
const reviews = [
  { user: 'أحمد', rating: 5, comment: 'رائع جدًا!' },
  { user: 'سارة', rating: 4, comment: 'جيد وطعمه ممتاز.' },
  { user: 'محمد', rating: 3, comment: 'مقبول لكن السكر كثير.' },
];

const reviewList = document.querySelector('.review-list');

if (reviewList) {
  reviews.forEach(review => {
    const div = document.createElement('div');
    div.className = 'review mb-3 p-3 border rounded';
    div.innerHTML = `
      <strong>${review.user}</strong> - ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
      <p>${review.comment}</p>
    `;
    reviewList.appendChild(div);
  });
}

// --------------------
// منتجات مشابهة
// --------------------
const similarProducts = [
  { title: 'لاتيه', img: '../assets/images/product1/4.jpg' },
  { title: 'موكا', img: '../assets/images/product1/5.jpg' },
  { title: 'اسبريسو', img: '../assets/images/product1/6.jpg' },
];

const similarContainer = document.querySelector('.similar-products');

if (similarContainer) {
  similarProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'col-12 col-md-4 mb-4';
    div.innerHTML = `
      <div class="card h-100">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.title}</h5>
          <button class="btn btn-sm btn-coffee">عرض المنتج</button>
        </div>
      </div>
    `;
    similarContainer.appendChild(div);
  });
}

// --------------------
// إضافات مستقبلية: Carousel أو غيره
// --------------------
// يمكنك إضافة أي تفاعلات إضافية مثل تغيير الصور، التكبير، أو التصفية
