// ===== PRODUCTS DATA =====
const products = [
  {
    id: 1,
    name: 'Spotify Premium',
    desc: 'Dengarkan musik tanpa iklan, offline mode, dan kualitas audio ultra. Langganan 1 bulan.',
    price: 25000,
    originalPrice: 54990,
    category: 'streaming',
    icon: 'music',
    color: '#1DB954',
    popular: false,
    features: ['Tanpa iklan', 'Offline mode', 'Kualitas Ultra']
  },
  {
    id: 2,
    name: 'YouTube Premium',
    desc: 'Nonton tanpa iklan, background play, dan akses YouTube Music. Langganan 1 bulan.',
    price: 35000,
    originalPrice: 69999,
    category: 'streaming',
    icon: 'play',
    color: '#FF0000',
    popular: true,
    features: ['Tanpa iklan', 'Background play', 'YouTube Music']
  },
  {
    id: 3,
    name: 'Netflix Premium',
    desc: 'Streaming film & series terlengkap, kualitas 4K + HDR. Akun shared 1 slot.',
    price: 45000,
    originalPrice: 186000,
    category: 'streaming',
    icon: 'tv',
    color: '#E50914',
    popular: true,
    features: ['Kualitas 4K', 'HDR Support', '1 Slot Private']
  },
  {
    id: 4,
    name: 'Canva Pro',
    desc: 'Akses semua template premium, element, dan fitur AI. Langganan 1 bulan.',
    price: 30000,
    originalPrice: 89000,
    category: 'productivity',
    icon: 'palette',
    color: '#7B2FF7',
    popular: false,
    features: ['Template premium', 'AI tools', 'Brand kit']
  },
  {
    id: 5,
    name: 'ChatGPT Plus',
    desc: 'Akses GPT-4, prioritas akses, dan fitur terbaru. Langganan 1 bulan.',
    price: 55000,
    originalPrice: 150000,
    category: 'productivity',
    icon: 'bot',
    color: '#10A37F',
    popular: true,
    features: ['GPT-4 access', 'Plugin support', 'Prioritas akses']
  },
  {
    id: 6,
    name: 'iCloud+ 50GB',
    desc: 'Extra storage 50GB, Private Relay, dan Hide My Email. Langganan 1 bulan.',
    price: 15000,
    originalPrice: 29000,
    category: 'productivity',
    icon: 'cloud',
    color: '#007AFF',
    popular: false,
    features: ['50GB storage', 'Private Relay', 'Hide My Email']
  },
  {
    id: 7,
    name: 'Paket Streamer',
    desc: 'Bundel Spotify Premium + YouTube Premium + Netflix. Hemat hingga 40%.',
    price: 85000,
    originalPrice: 105000,
    category: 'bundle',
    icon: 'crown',
    color: '#FFB800',
    popular: true,
    features: ['3 App sekaligus', 'Hemat 40%', 'Garansi penuh']
  },
  {
    id: 8,
    name: 'Paket Produktivitas',
    desc: 'Bundel Canva Pro + ChatGPT Plus + iCloud+. Cocok untuk pekerja kreatif.',
    price: 85000,
    originalPrice: 100000,
    category: 'bundle',
    icon: 'rocket',
    color: '#FF6B35',
    popular: false,
    features: ['3 App sekaligus', 'Hemat 15%', 'Cocok kreatif']
  },
  {
    id: 9,
    name: 'Paket All-in-One',
    desc: 'Semua 6 app premium dalam satu bundel. Penawaran terbaik kami.',
    price: 165000,
    originalPrice: 205000,
    category: 'bundle',
    icon: 'sparkles',
    color: '#00E5A0',
    popular: true,
    features: ['6 App premium', 'Hemat terbesar', 'Prioritas support']
  }
];

// ===== STATE =====
let selectedProduct = null;
let selectedPaymentMethod = null;
let paymentTimer = null;
let timeLeft = 900; // 15 minutes

// ===== FORMAT HELPERS =====
function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

function generateOrderId() {
  return '#NIEL' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);
}

// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  
  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card group p-6 rounded-2xl border border-surface-border bg-surface/50 backdrop-blur-sm relative" data-category="${p.category}" style="transition-delay: ${i * 0.08}s">
      ${p.popular ? '<div class="badge-popular absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold tracking-wider uppercase">Populer</div>' : ''}
      <div class="product-icon w-14 h-14 rounded-xl flex items-center justify-center mb-5" style="background: ${p.color}15;">
        <i data-lucide="${p.icon}" class="w-7 h-7" style="color: ${p.color}"></i>
      </div>
      <h3 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">${p.name}</h3>
      <p class="text-text-secondary text-sm leading-relaxed mb-4">${p.desc}</p>
      <div class="flex flex-wrap gap-1.5 mb-5">
        ${p.features.map(f => `<span class="px-2.5 py-1 rounded-md bg-dark text-[11px] text-text-muted font-medium">${f}</span>`).join('')}
      </div>
      <div class="flex items-end justify-between">
        <div>
          <div class="text-xs text-text-muted line-through mb-0.5">${formatRupiah(p.originalPrice)}</div>
          <div class="text-2xl font-bold text-primary">${formatRupiah(p.price)}</div>
        </div>
        <button onclick="openPaymentModal(${p.id})" class="px-5 py-2.5 bg-primary/10 text-primary text-sm font-semibold rounded-xl hover:bg-primary hover:text-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,229,160,0.2)]">
          Beli
        </button>
      </div>
    </div>
  `).join('');

  // Re-init icons
  lucide.createIcons();

  // Animate in
  requestAnimationFrame(() => {
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 80);
    });
  });
}

// ===== FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// ===== PAYMENT MODAL =====
function openPaymentModal(productId) {
  selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return;

  // Reset state
  selectedPaymentMethod = null;
  document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('selected'));
  const payBtn = document.getElementById('payNowBtn');
  payBtn.classList.remove('enabled');
  payBtn.disabled = true;

  // Fill order details
  document.getElementById('orderDetails').innerHTML = `
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: ${selectedProduct.color}15;">
        <i data-lucide="${selectedProduct.icon}" class="w-5 h-5" style="color: ${selectedProduct.color}"></i>
      </div>
      <div>
        <div class="text-sm font-semibold">${selectedProduct.name}</div>
        <div class="text-xs text-text-muted">Langganan 1 bulan</div>
      </div>
    </div>
    <div class="flex items-center justify-between pt-3 border-t border-surface-border">
      <span class="text-sm text-text-secondary">Total</span>
      <span class="text-lg font-bold text-primary">${formatRupiah(selectedProduct.price)}</span>
    </div>
  `;

  // Show modal
  const modal = document.getElementById('paymentModal');
  modal.classList.remove('hidden');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Show step 1
  showPaymentStep(1);
  
  lucide.createIcons();
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  const content = document.getElementById('paymentContent');
  const overlay = document.getElementById('paymentOverlay');
  
  content.style.transform = 'scale(0.95)';
  content.style.opacity = '0';
  overlay.style.opacity = '0';
  
  setTimeout(() => {
    modal.classList.remove('active');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    content.style.transform = '';
    content.style.opacity = '';
    overlay.style.opacity = '';
  }, 300);

  if (paymentTimer) {
    clearInterval(paymentTimer);
    paymentTimer = null;
  }
}

function showPaymentStep(step) {
  for (let i = 1; i <= 4; i++) {
    document.getElementById('payStep' + i).classList.toggle('hidden', i !== step);
  }
  lucide.createIcons();
}

function goToPaymentStep1() {
  showPaymentStep(1);
}

function goToPaymentStep2() {
  const email = document.getElementById('payEmail').value;
  if (!email || !email.includes('@')) {
    document.getElementById('payEmail').focus();
    document.getElementById('payEmail').style.borderColor = '#EF4444';
    setTimeout(() => { document.getElementById('payEmail').style.borderColor = ''; }, 2000);
    return;
  }
  showPaymentStep(2);
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.method === method);
  });
  
  const payBtn = document.getElementById('payNowBtn');
  payBtn.classList.add('enabled');
  payBtn.disabled = false;
  payBtn.innerHTML = '<i data-lucide="lock" class="w-4 h-4"></i> Bayar Sekarang';
  lucide.createIcons();
}

function processPayment() {
  if (!selectedPaymentMethod || !selectedProduct) return;

  showPaymentStep(3);
  
  const email = document.getElementById('payEmail').value;
  const phone = document.getElementById('payPhone').value;
  const orderId = generateOrderId();

  // Start payment timer
  timeLeft = 900;
  startPaymentTimer();

  let paymentHTML = '';

  if (selectedPaymentMethod === 'qris') {
    paymentHTML = `
      <div class="mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
          <span class="payment-timer" id="paymentTimerDisplay">15:00</span> menit tersisa
        </div>
        <h3 class="text-lg font-bold mb-2">Scan QR Code</h3>
        <p class="text-text-secondary text-sm mb-6">Buka e-wallet atau mobile banking kamu, lalu scan QR code di bawah ini.</p>
        <div class="qr-container mb-4">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- QR Code Pattern -->
            <rect width="200" height="200" fill="white"/>
            <!-- Top-left finder -->
            <rect x="10" y="10" width="50" height="50" fill="black"/>
            <rect x="15" y="15" width="40" height="40" fill="white"/>
            <rect x="20" y="20" width="30" height="30" fill="black"/>
            <!-- Top-right finder -->
            <rect x="140" y="10" width="50" height="50" fill="black"/>
            <rect x="145" y="15" width="40" height="40" fill="white"/>
            <rect x="150" y="20" width="30" height="30" fill="black"/>
            <!-- Bottom-left finder -->
            <rect x="10" y="140" width="50" height="50" fill="black"/>
            <rect x="15" y="145" width="40" height="40" fill="white"/>
            <rect x="20" y="150" width="30" height="30" fill="black"/>
            <!-- Data modules (simulated) -->
            <rect x="70" y="10" width="8" height="8" fill="black"/>
            <rect x="86" y="10" width="8" height="8" fill="black"/>
            <rect x="102" y="10" width="8" height="8" fill="black"/>
            <rect x="118" y="10" width="8" height="8" fill="black"/>
            <rect x="70" y="26" width="8" height="8" fill="black"/>
            <rect x="94" y="26" width="8" height="8" fill="black"/>
            <rect x="110" y="26" width="8" height="8" fill="black"/>
            <rect x="126" y="26" width="8" height="8" fill="black"/>
            <rect x="70" y="42" width="8" height="8" fill="black"/>
            <rect x="86" y="42" width="8" height="8" fill="black"/>
            <rect x="102" y="42" width="8" height="8" fill="black"/>
            <rect x="118" y="42" width="8" height="8" fill="black"/>
            <!-- Middle rows -->
            <rect x="10" y="70" width="8" height="8" fill="black"/>
            <rect x="26" y="70" width="8" height="8" fill="black"/>
            <rect x="42" y="70" width="8" height="8" fill="black"/>
            <rect x="58" y="70" width="8" height="8" fill="black"/>
            <rect x="70" y="70" width="8" height="8" fill="black"/>
            <rect x="86" y="70" width="8" height="8" fill="black"/>
            <rect x="102" y="70" width="8" height="8" fill="black"/>
            <rect x="118" y="70" width="8" height="8" fill="black"/>
            <rect x="134" y="70" width="8" height="8" fill="black"/>
            <rect x="150" y="70" width="8" height="8" fill="black"/>
            <rect x="166" y="70" width="8" height="8" fill="black"/>
            <rect x="182" y="70" width="8" height="8" fill="black"/>
            <rect x="10" y="86" width="8" height="8" fill="black"/>
            <rect x="34" y="86" width="8" height="8" fill="black"/>
            <rect x="50" y="86" width="8" height="8" fill="black"/>
            <rect x="78" y="86" width="8" height="8" fill="black"/>
            <rect x="94" y="86" width="8" height="8" fill="black"/>
            <rect x="110" y="86" width="8" height="8" fill="black"/>
            <rect x="134" y="86" width="8" height="8" fill="black"/>
            <rect x="158" y="86" width="8" height="8" fill="black"/>
            <rect x="174" y="86" width="8" height="8" fill="black"/>
            <rect x="10" y="102" width="8" height="8" fill="black"/>
            <rect x="26" y="102" width="8" height="8" fill="black"/>
            <rect x="42" y="102" width="8" height="8" fill="black"/>
            <rect x="70" y="102" width="8" height="8" fill="black"/>
            <rect x="86" y="102" width="8" height="8" fill="black"/>
            <rect x="102" y="102" width="8" height="8" fill="black"/>
            <rect x="126" y="102" width="8" height="8" fill="black"/>
            <rect x="150" y="102" width="8" height="8" fill="black"/>
            <rect x="182" y="102" width="8" height="8" fill="black"/>
            <rect x="10" y="118" width="8" height="8" fill="black"/>
            <rect x="34" y="118" width="8" height="8" fill="black"/>
            <rect x="58" y="118" width="8" height="8" fill="black"/>
            <rect x="78" y="118" width="8" height="8" fill="black"/>
            <rect x="94" y="118" width="8" height="8" fill="black"/>
            <rect x="110" y="118" width="8" height="8" fill="black"/>
            <rect x="134" y="118" width="8" height="8" fill="black"/>
            <rect x="158" y="118" width="8" height="8" fill="black"/>
            <rect x="174" y="118" width="8" height="8" fill="black"/>
            <!-- Bottom rows -->
            <rect x="70" y="140" width="8" height="8" fill="black"/>
            <rect x="86" y="140" width="8" height="8" fill="black"/>
            <rect x="110" y="140" width="8" height="8" fill="black"/>
            <rect x="126" y="140" width="8" height="8" fill="black"/>
            <rect x="150" y="140" width="8" height="8" fill="black"/>
            <rect x="174" y="140" width="8" height="8" fill="black"/>
            <rect x="70" y="156" width="8" height="8" fill="black"/>
            <rect x="94" y="156" width="8" height="8" fill="black"/>
            <rect x="118" y="156" width="8" height="8" fill="black"/>
            <rect x="142" y="156" width="8" height="8" fill="black"/>
            <rect x="166" y="156" width="8" height="8" fill="black"/>
            <rect x="182" y="156" width="8" height="8" fill="black"/>
            <rect x="70" y="172" width="8" height="8" fill="black"/>
            <rect x="86" y="172" width="8" height="8" fill="black"/>
            <rect x="102" y="172" width="8" height="8" fill="black"/>
            <rect x="126" y="172" width="8" height="8" fill="black"/>
            <rect x="150" y="172" width="8" height="8" fill="black"/>
            <rect x="166" y="172" width="8" height="8" fill="black"/>
            <rect x="182" y="172" width="8" height="8" fill="black"/>
            <rect x="78" y="182" width="8" height="8" fill="black"/>
            <rect x="94" y="182" width="8" height="8" fill="black"/>
            <rect x="118" y="182" width="8" height="8" fill="black"/>
            <rect x="134" y="182" width="8" height="8" fill="black"/>
            <rect x="158" y="182" width="8" height="8" fill="black"/>
            <rect x="174" y="182" width="8" height="8" fill="black"/>
            <!-- Alignment pattern -->
            <rect x="140" y="140" width="22" height="22" fill="black"/>
            <rect x="143" y="143" width="16" height="16" fill="white"/>
            <rect x="146" y="146" width="10" height="10" fill="black"/>
          </svg>
        </div>
        <p class="text-xs text-text-muted">QRIS powered by Bank Indonesia</p>
      </div>
      <div class="p-4 rounded-xl bg-dark border border-surface-border text-left mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-text-muted">Total Bayar</span>
          <span class="text-lg font-bold text-primary">${formatRupiah(selectedProduct.price)}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-text-muted">Order ID</span>
          <span class="text-xs font-mono text-text-secondary">${orderId}</span>
        </div>
      </div>
      <button onclick="simulatePaymentSuccess('${orderId}','${email}')" class="w-full py-3.5 bg-primary text-dark font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2">
        <i data-lucide="check-circle" class="w-4 h-4"></i>
        Saya Sudah Bayar
      </button>
    `;
  } else if (selectedPaymentMethod === 'va') {
    const vaNumber = '8800' + Math.floor(Math.random() * 9000000000 + 1000000000);
    paymentHTML = `
      <div class="mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
          <span class="payment-timer" id="paymentTimerDisplay">15:00</span> menit tersisa
        </div>
        <h3 class="text-lg font-bold mb-2">Transfer Virtual Account</h3>
        <p class="text-text-secondary text-sm mb-6">Transfer ke nomor Virtual Account di bawah ini menggunakan mobile banking atau ATM.</p>
        <div class="p-4 rounded-xl bg-dark border border-surface-border mb-4">
          <div class="text-xs text-text-muted mb-2">Nomor Virtual Account</div>
          <div class="flex items-center justify-between">
            <span class="text-xl font-mono font-bold tracking-wider">${vaNumber}</span>
            <button onclick="copyToClipboard('${vaNumber}', this)" class="copy-btn p-2 text-text-muted hover:text-primary transition-colors" title="Salin">
              <i data-lucide="copy" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        <div class="p-4 rounded-xl bg-dark border border-surface-border text-left space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-text-muted">Bank</span>
            <span class="text-xs font-medium">BCA / BRI / Mandiri / BNI</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-text-muted">Total Bayar</span>
            <span class="text-sm font-bold text-primary">${formatRupiah(selectedProduct.price)}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-text-muted">Order ID</span>
            <span class="text-xs font-mono text-text-secondary">${orderId}</span>
          </div>
        </div>
      </div>
      <button onclick="simulatePaymentSuccess('${orderId}','${email}')" class="w-full py-3.5 bg-primary text-dark font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2">
        <i data-lucide="check-circle" class="w-4 h-4"></i>
        Saya Sudah Transfer
      </button>
    `;
  } else if (selectedPaymentMethod === 'ewallet') {
    paymentHTML = `
      <div class="mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
          <span class="payment-timer" id="paymentTimerDisplay">15:00</span> menit tersisa
        </div>
        <h3 class="text-lg font-bold mb-2">Pembayaran E-Wallet</h3>
        <p class="text-text-secondary text-sm mb-6">Pilih e-wallet yang kamu gunakan untuk melanjutkan pembayaran.</p>
        <div class="space-y-3 mb-4">
          <button onclick="selectEwallet(this, 'gopay')" class="ewallet-btn w-full flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-dark hover:border-primary/50 transition-all">
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">GP</div>
            <span class="text-sm font-medium">GoPay</span>
          </button>
          <button onclick="selectEwallet(this, 'ovo')" class="ewallet-btn w-full flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-dark hover:border-primary/50 transition-all">
            <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-sm">OV</div>
            <span class="text-sm font-medium">OVO</span>
          </button>
          <button onclick="selectEwallet(this, 'dana')" class="ewallet-btn w-full flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-dark hover:border-primary/50 transition-all">
            <div class="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-sm">DN</div>
            <span class="text-sm font-medium">DANA</span>
          </button>
          <button onclick="selectEwallet(this, 'shopeepay')" class="ewallet-btn w-full flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-dark hover:border-primary/50 transition-all">
            <div class="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-sm">SP</div>
            <span class="text-sm font-medium">ShopeePay</span>
          </button>
        </div>
        <div class="p-4 rounded-xl bg-dark border border-surface-border text-left space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-text-muted">Total Bayar</span>
            <span class="text-sm font-bold text-primary">${formatRupiah(selectedProduct.price)}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-text-muted">Order ID</span>
            <span class="text-xs font-mono text-text-secondary">${orderId}</span>
          </div>
        </div>
      </div>
      <button id="ewalletPayBtn" onclick="simulatePaymentSuccess('${orderId}','${email}')" disabled class="w-full py-3.5 bg-primary/30 text-dark/50 font-semibold rounded-xl cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2">
        <i data-lucide="check-circle" class="w-4 h-4"></i>
        Saya Sudah Bayar
      </button>
    `;
  }

  document.getElementById('paymentInfo').innerHTML = paymentHTML;
  lucide.createIcons();
}

function selectEwallet(btn, wallet) {
  document.querySelectorAll('.ewallet-btn').forEach(b => {
    b.classList.remove('selected');
    b.style.borderColor = '';
    b.style.background = '';
  });
  btn.classList.add('selected');
  btn.style.borderColor = 'rgba(0, 229, 160, 0.5)';
  btn.style.background = 'rgba(0, 229, 160, 0.05)';
  
  const payBtn = document.getElementById('ewalletPayBtn');
  payBtn.disabled = false;
  payBtn.classList.remove('bg-primary/30', 'text-dark/50', 'cursor-not-allowed');
  payBtn.classList.add('bg-primary', 'text-dark');
  payBtn.style.cursor = 'pointer';
}

function startPaymentTimer() {
  if (paymentTimer) clearInterval(paymentTimer);
  
  paymentTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(paymentTimer);
      closePaymentModal();
      return;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const timerEl = document.getElementById('paymentTimerDisplay');
    if (timerEl) {
      timerEl.textContent = display;
      if (timeLeft < 300) timerEl.classList.add('timer-warning');
      if (timeLeft < 120) timerEl.classList.add('timer-danger');
    }
  }, 1000);
}

function simulatePaymentSuccess(orderId, email) {
  // Show success step
  document.getElementById('successOrderId').textContent = orderId;
  document.getElementById('successProduct').textContent = selectedProduct.name;
  document.getElementById('successEmail').textContent = email;
  document.getElementById('successTotal').textContent = formatRupiah(selectedProduct.price);
  
  if (paymentTimer) {
    clearInterval(paymentTimer);
    paymentTimer = null;
  }
  
  showPaymentStep(4);
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    showToast('Nomor VA berhasil disalin!');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  });
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== FAQ =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const content = btn.nextElementSibling;
  const isActive = item.classList.contains('active');
  
  // Close all
  document.querySelectorAll('.faq-item').forEach(faq => {
    faq.classList.remove('active');
    faq.querySelector('.faq-content').style.maxHeight = '0';
  });
  
  if (!isActive) {
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const successMsg = document.getElementById('contactSuccess');
  successMsg.classList.remove('hidden');
  showToast('Pesan berhasil dikirim!');
  this.reset();
  setTimeout(() => successMsg.classList.add('hidden'), 5000);
});

// ===== NAVBAR SCROLL =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = scrollY;
});

// ===== MOBILE MENU =====
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').style.transform = 'translateX(0)';
  document.body.style.overflow = 'hidden';
});

document.getElementById('mobileMenuClose').addEventListener('click', () => {
  document.getElementById('mobileMenu').style.transform = 'translateX(100%)';
  document.body.style.overflow = '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
  });
});

// ===== SCROLL REVEAL =====
function handleScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-right');
  const windowH = window.innerHeight;
  
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowH - 80) {
      el.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 60;
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    // Start when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.unobserve(counter);
      }
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// ===== CLOSE MODAL ON OVERLAY CLICK =====
document.getElementById('paymentOverlay').addEventListener('click', closePaymentModal);

// ===== CLOSE MODAL ON ESC =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePaymentModal();
    document.getElementById('mobileMenu').style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  animateCounters();
  lucide.createIcons();
});
