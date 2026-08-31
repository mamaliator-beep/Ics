/**
 * iCarbonSteel - Core JavaScript System
 * Vanilla JS logic for interactive calculators, filters, mobile menus, and quotes.
 */

// Toast notification helper
function showToast(message, icon = 'check_circle') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[#10b981]">${icon}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mobile Menu Setup
document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.mobile-menu-btn, button:has(.material-symbols-outlined:contains("menu")), nav button.md\\:hidden');
  
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let mobileDrawer = document.getElementById('mobile-drawer');
      if (!mobileDrawer) {
        mobileDrawer = document.createElement('div');
        mobileDrawer.id = 'mobile-drawer';
        mobileDrawer.className = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end transition-opacity duration-300';
        mobileDrawer.innerHTML = `
          <div class="bg-surface w-full max-h-[85vh] rounded-t-3xl p-6 overflow-y-auto flex flex-col gap-4 text-right shadow-2xl border-t border-white/40">
            <div class="flex justify-between items-center pb-4 border-b border-outline-variant/30">
              <div class="flex items-center gap-2">
                <span class="text-title-md font-bold text-primary">آی‌کربن‌استیل</span>
              </div>
              <button id="close-drawer" class="p-2 text-on-surface-variant hover:text-primary">
                <span class="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            <nav class="flex flex-col gap-2 font-title-md">
              <a href="index.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>خانه</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="products.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>محصولات</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="calculator.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>محاسبه وزن مقاطع</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="shipping.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>هزینه حمل بار</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="rebar.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>قیمت روز میلگرد</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="beams.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>قیمت تیرآهن و هاش</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="angles.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>قیمت نبشی و ناودانی</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="about.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>درباره ما</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a href="contact.html" class="p-3 hover:bg-primary/10 rounded-xl text-on-surface hover:text-primary transition-colors flex items-center justify-between">
                <span>تماس با ما و پشتیبانی</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
            </nav>
            <div class="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
              <a href="tel:02144267740" class="btn-primary py-3 rounded-xl flex items-center justify-center gap-2 text-center">
                <span class="material-symbols-outlined text-sm">call</span>
                <span>تماس: ۰۲۱-۴۴۲۶۷۷۴۰</span>
              </a>
              <button class="bg-[#0088cc] text-white py-3 rounded-xl flex items-center justify-center gap-2" onclick="window.open('https://t.me/iCarbonSteelBot', '_blank')">
                <span class="material-symbols-outlined text-sm">send</span>
                <span>خرید از طریق ربات تلگرام</span>
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(mobileDrawer);
        document.getElementById('close-drawer').addEventListener('click', () => {
          mobileDrawer.classList.add('hidden');
        });
        mobileDrawer.addEventListener('click', (e) => {
          if (e.target === mobileDrawer) {
            mobileDrawer.classList.add('hidden');
          }
        });
      } else {
        mobileDrawer.classList.remove('hidden');
      }
    });
  });

  // Global button handlers for inquiry and purchase
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.innerText || '';
    if (text.includes('خرید') || text.includes('استعلام') || text.includes('ثبت سفارش') || text.includes('پیش‌فاکتور')) {
      btn.addEventListener('click', (e) => {
        if (!btn.getAttribute('onclick') && btn.type !== 'submit') {
          e.preventDefault();
          showToast(`درخواست شما ثبت شد. کارشناسان فروش با شما تماس خواهند گرفت.`, 'shopping_bag');
        }
      });
    }
  });
});
