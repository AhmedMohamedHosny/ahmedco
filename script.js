/**
 * ==========================================================================
 * براند أحمدكو للأزياء والملابس (Ahmedco Fashion Store)
 * الملف الأساسي: script.js
 * ==========================================================================
 */

'use strict';

// 1. إعدادات مشروع فايربيز الخاص بمتجر أحمدكو (ahmedco-brand) من الكونسول
const firebaseConfig = {
  apiKey: "AIzaSyCbZhiHbPf97rFULB2mg_o4L74e9oateto",
  authDomain: "ahmedco-brand.firebaseapp.com",
  projectId: "ahmedco-brand",
  storageBucket: "ahmedco-brand.firebasestorage.app",
  messagingSenderId: "116297730401",
  appId: "1:116297730401:web:d73eed3234c8da8c821d20",
  measurementId: "G-EYFCWNCHF3"
};

// تهيئة الفايربيز
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. المخزون الافتراضي المبدئي (ملابس عصرية كاجوال وأوفر سايز)
let ahmedcoInventory = [
  {
    id: '1',
    title: 'هودي أوفر سايز ميلتون ثقيل - بطانة صوف قطن 100% (أسود ملكي)',
    brand: 'Ahmedco Originals',
    category: 'hoodies',
    price: 649.00,
    oldPrice: 850.00,
    discount: '201.00',
    rating: 5,
    ratingCount: 38,
    specs: 'الخامة: ميلتون قطن 100% معالج ضد الانكماش | القصة: Oversized Fit مريحة | المقاسات المتوفرة: M, L, XL, 2XL.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 25,
    inStock: true
  },
  {
    id: '2',
    title: 'بنطلون كارجو ستريت ستايل مع جيوب متعددة وقفل حبل (رمادي فاحم)',
    brand: 'Streetwear Urban',
    category: 'pants',
    price: 499.00,
    oldPrice: 650.00,
    discount: '151.00',
    rating: 5,
    ratingCount: 24,
    specs: 'الخامة: جبردين قطني كوري مرن ومقاوم للتمزق | الستايل: كارجو كاجوال واسع | المقاسات: 30 إلى 38.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 18,
    inStock: true
  },
  {
    id: '3',
    title: 'تيشرت بيسك أوفر سايز قطن مصري سوبر كومب (أبيض ثلجي)',
    brand: 'Basics Only',
    category: 'tshirts',
    price: 299.00,
    oldPrice: 420.00,
    discount: '121.00',
    rating: 5,
    ratingCount: 52,
    specs: 'الخامة: قطن مصري 100% سنجل جيرسي عالي النعومة | القصة: Relaxed Boxy Cut | خياطة مزدوجة متينة.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 40,
    inStock: true
  },
  {
    id: '4',
    title: 'جاكيت بومبر ووتر بروف عازل للمطر والرياح مبطن فايبر (زيتي)',
    brand: 'Winter Collection',
    category: 'jackets',
    price: 899.00,
    oldPrice: 1250.00,
    discount: '351.00',
    rating: 5,
    ratingCount: 15,
    specs: 'الخامة: نسيج ووتر بروف تركي أصلي مع حشوة فايبر تدفئة ممتازة | سوستة معدنية مخفية وجيوب داخلية.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=600&q=80'
    ],
    stock: 12,
    inStock: true
  }
];

// حفظ الكاش المحلي لفتح الصفحة بسرعة فورية (0 ثانية)
localStorage.setItem('ahmedco_store_inventory', JSON.stringify(ahmedcoInventory));

const state = {
  products: [...ahmedcoInventory],
  cart: JSON.parse(localStorage.getItem('ahmedco_cart')) || [],
  selectedCategory: 'all',
  searchQuery: '',
  maxPrice: 3000,
  currentSort: 'featured',
  quantities: {},
  viewMode: 'grid',
  currentPage: 1
};

const DOM = {
  productsContainer: document.getElementById('catalog-products-container'),
  productsCounterBadge: document.getElementById('products-counter-badge'),
  cartCounter: document.getElementById('cart-counter'),
  mobCartCounter: document.getElementById('mob-cart-counter'),
  btnViewGrid: document.getElementById('btn-view-grid'),
  btnViewList: document.getElementById('btn-view-list'),
  sortTrigger: document.getElementById('sort-dropdown-trigger'),
  sortMenu: document.getElementById('sort-options-menu'),
  selectedSortLabel: document.getElementById('selected-sort-label'),
  activeFiltersBar: document.getElementById('active-filters-bar'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  searchCategory: document.getElementById('search-category'),
  priceRange: document.getElementById('price-range'),
  maxPriceDisplay: document.getElementById('max-price-display'),
  darkModeCheckbox: document.getElementById('dark-mode-checkbox'),
  quickModalOverlay: document.getElementById('quick-modal-overlay'),
  quickModalContent: document.getElementById('quick-modal-content'),
  closeQuickModal: document.getElementById('close-quick-modal'),
  chatLink: document.getElementById('chat-link'),
  chatIcon: document.getElementById('chat-icon')
};

// رسم نجوم التقييم
function getStarsHTML(rating) {
  const rate = Math.round(Number(rating) || 5);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rate ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star" style="color:#cbd5e1;"></i>';
  }
  return stars;
}

// رسم كروت الملابس والكتالوج
function renderCatalog(items) {
  if (!DOM.productsContainer) return;

  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

  if (state.currentPage > totalPages) state.currentPage = 1;

  const startIndex = (state.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItemsPage = items.slice(startIndex, endIndex);

  if (currentItemsPage.length === 0) {
    DOM.productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface, #fff); border-radius: 12px; border: 1px dashed #cbd5e1;">
        <i class="fa-solid fa-shirt" style="font-size: 3rem; color: #64748b; margin-bottom: 12px;"></i>
        <h3 style="font-weight: 800; color: #1e293b;">لا توجد قطع ملابس مطابقة للفلتر المحدد</h3>
        <p style="color: #64748b; font-size: 0.9rem;">جرب تغيير المقاس أو اللون أو إلغاء بعض خيارات التصفية.</p>
      </div>
    `;
    if (DOM.productsCounterBadge) DOM.productsCounterBadge.textContent = '0 قطع ملابس';
    const pag = document.getElementById('pagination-container');
    if (pag) pag.innerHTML = '';
    return;
  }

  if (DOM.productsCounterBadge) {
    DOM.productsCounterBadge.textContent = `${items.length} من ${ahmedcoInventory.length} قطع متوفرة`;
  }

  DOM.productsContainer.innerHTML = currentItemsPage.map(product => {
    const qty = state.quantities[product.id] || 1;
    const isAvailable = product.inStock === true || (Number(product.stock) > 0);

    return `
      <article class="dream-product-card fashion-card" data-id="${product.id}">
        <div class="card-top-horizontal-split">
          <div class="card-details-pane">
            <span class="brand-label-text">${product.brand || 'أحمدكو'}</span>
            <h3 class="product-item-title">
              <a href="product.html?id=${product.id}">${product.title}</a>
            </h3>
            
            <div class="card-stars-row">
              ${getStarsHTML(product.rating)}
              <span>(${product.ratingCount || 0} تقييم)</span>
            </div>

            <div class="price-block-dream" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
              <span class="price-val-red">${Number(product.price).toFixed(2)} ج.م</span>
              ${product.oldPrice ? `<span class="price-struck-gray">${Number(product.oldPrice).toFixed(2)} ج.م</span>` : ''}
            </div>

            <p class="specs-summary-text">${product.specs || ''}</p>

            <div class="stock-dot-indicator">
              <span class="blue-dot" style="${!isAvailable ? 'background-color:#ef4444;' : 'background-color:#22c55e;'}"></span>
              <span style="${!isAvailable ? 'color:#ef4444;' : 'color:#15803d;'}">${isAvailable ? 'متاح للتسليم الفوري والقياس' : 'نفذ المقاس مؤقتاً'}</span>
            </div>
          </div>

          <div class="card-image-pane">
            ${product.discount ? `<span class="discount-ribbon-tag">وفر ${product.discount} ج.م</span>` : ''}
            
            <button class="quick-hover-eye" onclick="openQuickModal('${product.id}')" title="معاينة تفاصيل القطعة">
              <i class="fa-solid fa-eye"></i>
            </button>

            <div class="media-square-box" onclick="window.location.href='product.html?id=${product.id}'" style="cursor:pointer;">
              <img id="prod-img-${product.id}" src="${(product.images && product.images.filter(Boolean)[0]) || product.image || 'logo.png'}" alt="${product.title}" loading="lazy">
            </div>

            ${(() => {
              const imgCount = (product.images && product.images.filter(Boolean).length) || 1;
              if (imgCount <= 1) return '';
              let dashes = '';
              for (let i = 0; i < imgCount; i++) dashes += `<span class="${i === 0 ? 'active' : ''}"></span>`;
              return `<div class="image-dash-indicators" id="dashes-${product.id}">${dashes}</div>`;
            })()}
          </div>
        </div>

        <div class="card-bottom-actions-full">
          <button class="btn-quick-view-olive" onclick="openQuickModal('${product.id}')">معاينة سريعة</button>          
          <button class="btn-choose-option-green" onclick="addToCartDirect('${product.id}')" ${!isAvailable ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
            <i class="fa-solid fa-shirt"></i> ${isAvailable ? 'اختر المقاس واللون' : 'غير متوفر حالياً'}            
          </button>
          <div class="item-mini-stepper">
            <button class="mini-step-btn" onclick="modifyCardQty('${product.id}', 1)">+</button>
            <span class="mini-step-val" id="stepper-val-${product.id}">${qty}</span>
            <button class="mini-step-btn" onclick="modifyCardQty('${product.id}', -1)">-</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  renderPaginationControls(totalPages);
  stopAllCardSliders();
  startCardSliders(currentItemsPage);
}

// أزرار الترقيم
function renderPaginationControls(totalPages) {
  const container = document.getElementById('pagination-container');
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `
    <button class="page-arrow" ${state.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${state.currentPage - 1})">
      <i class="fa-solid fa-chevron-right"></i> السابق
    </button>
  `;
  for (let i = 1; i <= totalPages; i++) {
    html += `<span class="page-num ${i === state.currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</span>`;
  }
  html += `
    <button class="page-arrow" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${state.currentPage + 1})">
      التالي <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;
  container.innerHTML = html;
}

window.changePage = function(targetPage) {
  state.currentPage = targetPage;
  executeFiltering();
  window.scrollTo({ top: 350, behavior: 'smooth' });
};

// ==========================================================================
// محرك فلاتر ملابس أحمدكو المخصصة
// ==========================================================================
const activeFilters = {
  brand: [], size: [], type: [], material: [], color: []
};

// تحديث أرقام المنتجات المتوفرة جانب كل خيار
function updateFilterCounts() {
  document.querySelectorAll('.count-tag').forEach(tag => {
    const val = tag.getAttribute('data-val').toUpperCase();
    const count = ahmedcoInventory.filter(item => {
      const fullText = ((item.title || '') + ' ' + (item.specs || '') + ' ' + (item.brand || '')).toUpperCase();
      return fullText.includes(val);
    }).length;
    tag.textContent = `(${count})`;
  });
}

// الاستماع للـ Checkboxes
document.querySelectorAll('.filter-checkbox').forEach(chk => {
  chk.addEventListener('change', () => {
    state.currentPage = 1;
    const type = chk.getAttribute('data-type');
    const val = chk.value;

    if (chk.checked) {
      if (!activeFilters[type].includes(val)) activeFilters[type].push(val);
    } else {
      activeFilters[type] = activeFilters[type].filter(v => v !== val);
    }

    const countEl = document.getElementById(`count-${type}`);
    if (countEl) countEl.textContent = `تم تحديد ${activeFilters[type].length} عناصر`;
    executeFiltering();
  });
});

window.resetFilterGroup = function(type) {
  state.currentPage = 1;
  if (type === 'price') {
    const priceEl = document.getElementById('price-range');
    if (priceEl) priceEl.value = 3000;
    state.maxPrice = 3000;
    const disp = document.getElementById('max-price-display');
    if (disp) disp.textContent = 'حتى: 3,000 ج.م';
  } else {
    activeFilters[type] = [];
    document.querySelectorAll(`.filter-checkbox[data-type="${type}"]`).forEach(c => c.checked = false);
    const countEl = document.getElementById(`count-${type}`);
    if (countEl) countEl.textContent = 'تم تحديد 0 عناصر';
  }
  executeFiltering();
};

// تطبيق الفلترة الشاملة
function executeFiltering() {
  let result = [...ahmedcoInventory];

  // 1. المتوفر بالمخزون
  if (document.getElementById('stock-filter')?.checked) {
    result = result.filter(item => item.inStock === true || (Number(item.stock) > 0));
  }

  // 2. السعر
  result = result.filter(item => Number(item.price) <= state.maxPrice);

  // 3. البحث
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    result = result.filter(item =>
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.brand && item.brand.toLowerCase().includes(q)) ||
      (item.specs && item.specs.toLowerCase().includes(q))
    );
  }

  // 4. القسم المختار
  if (state.selectedCategory !== 'all') {
    result = result.filter(item => item.category === state.selectedCategory);
  }

  // 5. الفلاتر المخصصة (مقاسات، خامات، ألوان، براند)
  for (const [key, selectedVals] of Object.entries(activeFilters)) {
    if (selectedVals.length > 0) {
      result = result.filter(item => {
        const itemText = ((item.title || '') + ' ' + (item.specs || '') + ' ' + (item.brand || '')).toUpperCase();
        return selectedVals.some(val => {
          if (key === 'brand') return item.brand && item.brand.toUpperCase().includes(val.toUpperCase());
          return itemText.includes(val.toUpperCase());
        });
      });
    }
  }

  // 6. الترتيب
  if (state.currentSort === 'price-asc') {
    result.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (state.currentSort === 'price-desc') {
    result.sort((a, b) => Number(b.price) - Number(a.price));
  }

  updateFilterCounts();
  renderCatalog(result);
}

// تشغيل الأكورديون في السايدبار
document.querySelectorAll('.filter-card-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('open');
  });
});

document.getElementById('filter-toggle-btn')?.addEventListener('click', () => {
  document.querySelector('.dream-main-layout')?.classList.toggle('sidebar-active');
});

document.getElementById('stock-filter')?.addEventListener('change', () => {
  state.currentPage = 1;
  executeFiltering();
});

DOM.priceRange?.addEventListener('input', (e) => {
  state.maxPrice = parseFloat(e.target.value);
  if (DOM.maxPriceDisplay) DOM.maxPriceDisplay.textContent = `حتى: ${state.maxPrice.toLocaleString('ar-EG')} ج.م`;
  state.currentPage = 1;
  executeFiltering();
});

DOM.searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  state.searchQuery = DOM.searchInput.value;
  state.selectedCategory = DOM.searchCategory.value;
  state.currentPage = 1;
  executeFiltering();
});

DOM.searchInput?.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  state.currentPage = 1;
  executeFiltering();
});

// طرق العرض
DOM.btnViewGrid?.addEventListener('click', () => {
  DOM.btnViewGrid.classList.add('active');
  DOM.btnViewList.classList.remove('active');
  document.body.classList.remove('view-list-active');
  document.body.classList.add('view-grid-active');
  state.viewMode = 'grid';
});

DOM.btnViewList?.addEventListener('click', () => {
  DOM.btnViewList.classList.add('active');
  DOM.btnViewGrid.classList.remove('active');
  document.body.classList.remove('view-grid-active');
  document.body.classList.add('view-list-active');
  state.viewMode = 'list';
});

// قائمة الترتيب
DOM.sortTrigger?.addEventListener('click', (e) => {
  e.stopPropagation();
  DOM.sortMenu.classList.toggle('open');
});

document.addEventListener('click', () => DOM.sortMenu?.classList.remove('open'));

DOM.sortMenu?.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    DOM.sortMenu.querySelectorAll('li').forEach(l => l.classList.remove('active'));
    item.classList.add('active');
    DOM.selectedSortLabel.textContent = item.textContent;
    state.currentSort = item.getAttribute('data-sort');
    executeFiltering();
  });
});

window.modifyCardQty = function(id, delta) {
  let current = state.quantities[id] || 1;
  current += delta;
  if (current < 1) current = 1;
  state.quantities[id] = current;
  const el = document.getElementById(`stepper-val-${id}`);
  if (el) el.textContent = current;
};

window.addToCartDirect = function(productId) {
  window.location.href = `product.html?id=${productId}`;
};

function syncCartBadge() {
  const total = state.cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  if (DOM.cartCounter) DOM.cartCounter.textContent = total;
  if (DOM.mobCartCounter) DOM.mobCartCounter.textContent = total;
}

// نافذة النظرة السريعة لاختيار المقاس
window.openQuickModal = function(id) {
  const product = ahmedcoInventory.find(p => String(p.id) === String(id));
  if (!product || !DOM.quickModalOverlay) return;

  DOM.quickModalContent.innerHTML = `
    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
      <div style="width: 190px; height: 230px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid #e2e8f0;">
        <img src="${(product.images && product.images[0]) || product.image || 'logo.png'}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="flex: 1; min-width: 240px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #0284c7;">${product.brand || 'أحمدكو'}</span>
        <h3 style="font-size: 1.15rem; font-weight: 800; margin: 4px 0 8px; color:#0f172a;">${product.title}</h3>
        <div style="font-size: 1.35rem; font-weight: 900; color: #dc2626; margin-bottom: 8px;">
          ${Number(product.price).toFixed(2)} ج.م
          ${product.oldPrice ? `<small style="font-size: 0.85rem; color: #94a3b8; text-decoration: line-through; margin-right: 8px;">${Number(product.oldPrice).toFixed(2)} ج.م</small>` : ''}
        </div>
        <p style="font-size: 0.85rem; color: #475569; line-height: 1.6; margin-bottom: 16px;">${product.specs || ''}</p>
        <button class="btn-dream-choose" style="padding: 12px 24px; background:#0f172a; color:#fff; border-radius:8px; font-weight:800; border:none; cursor:pointer;" onclick="window.location.href='product.html?id=${product.id}'">
          اختيار المقاس وإتمام الطلب
        </button>
      </div>
    </div>
  `;
  DOM.quickModalOverlay.classList.add('active');
};

DOM.closeQuickModal?.addEventListener('click', () => DOM.quickModalOverlay.classList.remove('active'));

// دارك مود
const darkCheckbox = document.getElementById('dark-mode-checkbox');
if (localStorage.getItem('ahmedco_dark_mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkCheckbox) darkCheckbox.checked = true;
}
darkCheckbox?.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('ahmedco_dark_mode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('ahmedco_dark_mode', 'disabled');
  }
});

// تناوب زر الشات (واتساب وماسنجر)
let isWhatsApp = true;
setInterval(() => {
  isWhatsApp = !isWhatsApp;
  if (!DOM.chatIcon || !DOM.chatLink) return;
  DOM.chatIcon.classList.add('rotate-anim');
  setTimeout(() => {
    if (isWhatsApp) {
      DOM.chatLink.className = 'chat-circle-link whatsapp-mode';
      DOM.chatLink.href = 'https://wa.me/201101579399';
      DOM.chatIcon.className = 'fa-brands fa-whatsapp chat-icon';
    } else {
      DOM.chatLink.className = 'chat-circle-link messenger-mode';
      DOM.chatLink.href = 'https://m.me/ahmedcostore';
      DOM.chatIcon.className = 'fa-brands fa-facebook-messenger chat-icon';
    }
    DOM.chatIcon.classList.remove('rotate-anim');
  }, 250);
}, 5000);

// ==========================================================================
// جلب المنتجات الحية من فايربيز أحمدكو (ahmedco-brand)
// ==========================================================================
function fetchProductsFromFirebase() {
  if (ahmedcoInventory && ahmedcoInventory.length > 0) {
    state.products = [...ahmedcoInventory];
    executeFiltering();
  }

  db.collection('products').onSnapshot((snapshot) => {
    if (!snapshot.empty) {
      ahmedcoInventory = [];
      snapshot.forEach(doc => {
        ahmedcoInventory.push({ id: doc.id, ...doc.data() });
      });

      localStorage.setItem('ahmedco_store_inventory', JSON.stringify(ahmedcoInventory));
      state.products = [...ahmedcoInventory];
      executeFiltering();
    }
  }, (error) => {
    console.warn("عرض الملابس من النسخة المحلية:", error.message);
  });
}

// سلايدر صور الكروت المصغرة
let cardSliderIntervals = {};
function stopAllCardSliders() {
  Object.values(cardSliderIntervals).forEach(id => clearInterval(id));
  cardSliderIntervals = {};
}

function startCardSliders(items) {
  items.forEach(product => {
    const imgs = (product.images && product.images.filter(Boolean)) || (product.image ? [product.image] : []);
    if (imgs.length <= 1) return;

    let idx = 0;
    cardSliderIntervals[product.id] = setInterval(() => {
      idx = (idx + 1) % imgs.length;
      const imgEl = document.getElementById(`prod-img-${product.id}`);
      const dashesBox = document.getElementById(`dashes-${product.id}`);
      if (imgEl) imgEl.src = imgs[idx];
      if (dashesBox) {
        dashesBox.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    }, 2500);
  });
}

// ==========================================================================
// الدخول السري للوحة تحكم المدير (Ctrl+Shift+A أو ضغط 3 ثوانٍ على اللوجو)
// ==========================================================================
function requestAdminAccess() {
  window.location.href = "admin.html";
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
    e.preventDefault();
    requestAdminAccess();
  }
});

let pressTimer = null;
let isLongPressTriggered = false;
document.querySelectorAll('.main-store-logo, .dream-brand').forEach(el => {
  const startPress = () => {
    isLongPressTriggered = false;
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      isLongPressTriggered = true;
      if (navigator.vibrate) navigator.vibrate(120);
      window.location.href = "admin.html";
    }, 3000);
  };
  const cancelPress = () => clearTimeout(pressTimer);

  el.addEventListener('click', (e) => {
    if (isLongPressTriggered) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  el.addEventListener('touchstart', startPress, { passive: true });
  el.addEventListener('touchend', cancelPress);
  el.addEventListener('touchcancel', cancelPress);
  el.addEventListener('mousedown', startPress);
  el.addEventListener('mouseup', cancelPress);
  el.addEventListener('mouseleave', cancelPress);
});

// نصوص شريط الأخبار الترويجي
(function initFadingTicker() {
  const tickerEl = document.getElementById('fade-ticker-text');
  if (!tickerEl) return;

  const messages = [
    '🔥 كولكشن جديد من أحمدكو: خامات قطن 100% وموديلات أوفر سايز راقية',
    '🚚 حق المعاينة وقياس الملابس أمام المندوب متاح بالكامل قبل الدفع',
    '⚡ شحن سريع لجميع محافظات مصر وتغليف فاخر يليق بطلبك',
    '💵 الدفع عند الاستلام كاش بكل ثقة وأمان'
  ];

  let currentIndex = 0;
  tickerEl.textContent = messages[0];

  setInterval(() => {
    tickerEl.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      tickerEl.textContent = messages[currentIndex];
      tickerEl.classList.remove('fade-out');
    }, 400);
  }, 3500);
})();

// حماية المحتوى والصور من السرقة والنسخ
document.addEventListener('contextmenu', e => e.preventDefault(), false);
document.querySelectorAll('img').forEach(img => img.addEventListener('contextmenu', e => e.preventDefault(), false));
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'u' || e.key === 'p' || e.key === 's')) {
    e.preventDefault();
    return false;
  }
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
}, false);
document.addEventListener('copy', e => e.preventDefault(), false);

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
  fetchProductsFromFirebase();
  syncCartBadge();
});
