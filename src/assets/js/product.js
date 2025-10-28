// ===== product.js =====

// استيراد الملفات والمكتبات
import '../sass/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

// --------------------
// إضافة المنتج إلى السلة
// --------------------
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const productTitle = document.querySelector('.product-title')?.textContent || 'المنتج';
      alert(`تم إضافة "${productTitle}" إلى السلة!`);
    });
  }

  // --------------------
  // بيانات المنتجات العامة
  // --------------------
  const allProducts = [
    {
      id: 'cappuccino',
      title: 'كابتشينو',
      img: 'https://images.unsplash.com/photo-1534234757579-8ad69d218ad4?auto=format&fit=crop&w=870',
      link: 'cappuccino.html',
    },
    {
      id: 'coffee',
      title: 'قهوة عادية',
      img: 'https://images.unsplash.com/photo-1422207258071-70754198c4a2?auto=format&fit=crop&w=860',
      link: 'coffee.html',
    },
    {
      id: 'turkish',
      title: 'قهوة تركية',
      img: 'https://images.unsplash.com/photo-1604945516204-526aa4fd6425?auto=format&fit=crop&w=869',
      link: 'turkish.html',
    },
  ];

  // --------------------
  // المنتجات المشابهة
  // --------------------
  const productPage = document.querySelector('.product-page');
  const currentProductId = productPage?.dataset.product;
  const similarContainer = document.querySelector('.similar-products-container');

  if (similarContainer && currentProductId) {
    // ابحث عن المنتج الحالي
    const currentProduct = allProducts.find(p => p.id === currentProductId);

    // في حالة عدم وجوده، نعرض أول 3 منتجات بشكل افتراضي
    let similarProducts = allProducts.filter(p => p.id !== currentProductId);

    // نخلط القائمة عشوائيًا ثم نأخذ 3 فقط
    similarProducts = similarProducts.sort(() => 0.5 - Math.random()).slice(0, 3);

    // إنشاء عناصر المنتجات
    similarProducts.forEach(product => {
      const div = document.createElement('div');
      div.className = 'col-12 col-md-4 mb-4';
      div.innerHTML = `
        <div class="card h-100">
          <img src="${product.img}" class="card-img-top" alt="${product.title}">
          <div class="card-body text-center">
            <h5 class="card-title">${product.title}</h5>
            <a href="${product.link}" class="btn btn-sm btn-coffee">عرض المنتج</a>
          </div>
        </div>
      `;
      similarContainer.appendChild(div);
    });
  }

  // --------------------
  // التقييمات
  // --------------------
  const reviews = [
    { user: 'أحمد', rating: 5, comment: 'رائع جدًا!' },
    { user: 'سارة', rating: 4, comment: 'ممتاز وطعمه رائع.' },
    { user: 'محمد', rating: 3, comment: 'جيد لكن يحتاج سكر أقل.' },
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
});
