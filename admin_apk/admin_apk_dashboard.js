// --- DATABASE SIMULATION & KEYS ---
const DB_PRODUCTS_KEY = 'gerbangPanganProducts';
const DB_BANNERS_KEY = 'appBanners';
const DB_CUSTOMERS_KEY = 'gerbangPanganCustomers';
const DB_ORDERS_KEY = 'transactionHistory';
const DB_NOTIFICATIONS_KEY = 'appNotifications';
const DB_CATEGORIES_KEY = 'gerbangPanganCategories';
const DB_VOUCHERS_KEY = 'gerbangPanganVouchers';
const DB_FARMER_OFFERS_KEY = 'gerbangPanganFarmerOffers';
const DB_STOCK_NEEDS_KEY = 'gerbangPanganStockNeeds';
const DB_REQUESTS_KEY = 'gerbangPanganProductRequests'; // Kunci baru
const DB_SCHEDULES_KEY = 'gerbangPanganSchedules';
const DB_LAND_AREAS_KEY = 'gerbangPanganLandAreas';
const DB_LOANS_KEY = 'gerbangPanganLoans';
const DB_PURCHASES_KEY = 'gerbangPanganPurchases'; // Kunci baru untuk riwayat pembelian
const DB_PERUMDA_ORDERS_KEY = 'perumdaOrders'; // Menambahkan key untuk pesanan Perumda
const DB_PAYMENT_METHODS_KEY = 'gerbangPanganPaymentMethods';
const DB_EXTERNAL_USERS_KEY = 'pemdaExternalUsers'; // Kunci baru untuk sinkronisasi

// --- FUNGSI BARU UNTUK GRAFIK DASBOR ---

const INITIAL_PRODUCTS = [];
const INITIAL_CUSTOMERS = [
    // Data pengguna awal telah dihapus
];
const INITIAL_ORDERS = [
    // Data pesanan awal telah dihapus
];
const INITIAL_CATEGORIES = ['Pertanian', 'Perkebunan', 'Perikanan', 'Peternakan'];
const INITIAL_VOUCHERS = [
    { id: 'v1', code: 'PANENRAYA20K', type: 'fixed', value: 20000 },
    { id: 'v2', code: 'DISKON10', type: 'percentage', value: 10 }
];
const INITIAL_PAYMENT_METHODS = [
    { id: 'cash', name: 'Bayar di Kantor Koperasi', enabled: true, details: { info: 'Silakan lakukan pembayaran langsung di kantor koperasi kami.' } },
    { id: 'transfer', name: 'Transfer Bank', enabled: true, details: { bank: 'Bank Mandiri', account: '123-456-7890', name: 'Koperasi Ampibabo' } },
    { id: 'qris', name: 'QRIS', enabled: false, details: { info: 'Pindai kode QR untuk membayar.', imageUrl: 'https://placehold.co/200x200?text=QRIS' } }
];

const INITIAL_FARMER_OFFERS = [
    { id: 'fo1', farmerName: 'Kelompok Tani Maju', productName: 'Bawang Merah', quantity: 500, unit: 'Kg', price: 25000, harvestDate: '2025-10-15', status: 'Tersedia' },
    { id: 'fo2', farmerName: 'Kelompok Nelayan Pesisir', productName: 'Ikan Tuna', quantity: 200, unit: 'Kg', price: 28000, harvestDate: '2025-10-12', status: 'Tersedia' },
    { id: 'fo3', farmerName: 'Peternakan Unggas Sejahtera', productName: 'Telur Ayam Kampung', quantity: 1000, unit: 'Butir', price: 2500, harvestDate: '2025-10-10', status: 'Terjual' },
];
const INITIAL_STOCK_NEEDS = [
    { id: 'sn1', productName: 'Jagung Pipil Kering', quantity: 5, unit: 'Ton', priceRange: 'Rp 4.000 - Rp 4.500', postDate: '2025-10-01', status: 'Aktif' },
    { id: 'sn2', productName: 'Kelapa Tua', quantity: 2000, unit: 'Butir', priceRange: 'Rp 3.000 - Rp 3.500', postDate: '2025-09-28', status: 'Terpenuhi' },
];
const INITIAL_SCHEDULES = [
    { id: 'sch1', title: 'Tanam Padi - Kel. Tani Maju', start: '2025-10-05', end: '2025-10-10', type: 'tanam', backgroundColor: '#3b82f6' },
    { id: 'sch2', title: 'Panen Jagung - Budi Santoso', start: '2025-10-12', type: 'panen', backgroundColor: '#10b981' },
    { id: 'sch3', title: 'Tanam Cabai - Rina Amelia', start: '2025-10-20', type: 'tanam', backgroundColor: '#3b82f6' },
    { id: 'sch4', title: 'Panen Padi - Kel. Tani Maju', start: '2026-01-15', end: '2026-01-25', type: 'panen', backgroundColor: '#10b981' },
];
const INITIAL_LAND_AREAS = [
    { id: 'la1', farmerName: 'Budi Santoso', landLocation: 'Desa Sukamaju, Blok A', area: 2.5, unit: 'Hektar', commodity: 'Padi', status: 'Aktif' },
    { id: 'la2', farmerName: 'Rina Amelia', landLocation: 'Desa Mulyasari', area: 1, unit: 'Hektar', commodity: 'Cabai dan Tomat', status: 'Aktif' },
    { id: 'la3', farmerName: 'Kelompok Tani Maju', landLocation: 'Hamparan Sawah Irigasi', area: 15, unit: 'Hektar', commodity: 'Padi', status: 'Aktif' },
];
const INITIAL_LOANS = [
    {
        id: 'LN-1', customerId: 1, customerName: 'Budi Santoso', amount: 5000000, interestRate: 1.5, term: 12, installment: 458333, status: 'Aktif', date: '2025-07-01',
        paymentHistory: [
            { date: '2025-08-01', amount: 458333 }, { date: '2025-09-01', amount: 458333 }, { date: '2025-10-01', amount: 458333 }
        ]
    },
    {
        id: 'LN-2', customerId: 2, customerName: 'Rina Amelia', amount: 10000000, interestRate: 1.2, term: 24, installment: 466667, status: 'Lunas', date: '2023-09-15',
        paymentHistory: Array(24).fill(0).map((_, i) => ({ date: new Date(2023, 9 + i, 15).toISOString().split('T')[0], amount: 466667 }))
    },
    { id: 'LN-3', customerId: 3, customerName: 'Citra Lestari', amount: 2000000, interestRate: 2, term: 6, installment: 366667, status: 'Diajukan', date: '2025-09-20', paymentHistory: [] },
];

// Data simulasi untuk pesanan dari Perumda
const INITIAL_PERUMDA_ORDERS = [
    { id: 'PRD-001', customer: 'Perumda Pangan Jaya', date: '2025-09-28T10:00:00Z', total: 12500000, status: 'Menunggu Verifikasi', items: [{ name: 'Beras IR-64 Premium', quantity: 1, unit: 'Ton', price: 12500000 }] },
    { id: 'PRD-002', customer: 'Perumda Agro Niaga', date: '2025-09-25T14:30:00Z', total: 7500000, status: 'Diproses', items: [{ name: 'Kentang Dieng Super', quantity: 500, unit: 'Kg', price: 15000 }] }
];

// Data Admin Eksternal (dipindahkan dari admin_besar_pemda.html)
const INITIAL_EXTERNAL_USERS = [
    // Data admin eksternal awal telah dihapus
];

// Data dummy untuk riwayat pembelian
const INITIAL_PURCHASES = [
    { id: 'PUR-1', date: '2025-09-01', supplier: 'Kelompok Tani Maju', productName: 'Gabah Kering Panen', quantity: 5, unit: 'Ton', price: 5200, total: 26000000, koperasiAsal: "Koperasi Ampibabo" },
    { id: 'PUR-2', date: '2025-09-05', supplier: 'Budi Santoso (Petani)', productName: 'Cabai Rawit Merah', quantity: 100, unit: 'Kg', price: 55000, total: 5500000, koperasiAsal: "Koperasi Ampibabo" },
    { id: 'PUR-3', date: '2025-09-10', supplier: 'BUMDes Mulyasari', productName: 'Kelapa Tua', quantity: 2000, unit: 'Butir', price: 3000, total: 6000000, koperasiAsal: "Koperasi Ampibabo" },
];

// --- UTILITY & HELPER FUNCTIONS ---
const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

// Generic DB functions
const getFromDB = (key) => JSON.parse(localStorage.getItem(key)) || [];
const saveToDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;

    const alertId = 'alert-' + Date.now();
    const isError = type === 'error';

    const bgColor = isError ? 'bg-rose-500' : 'bg-emerald-500';
    const iconSvg = isError
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`;

    const alertEl = document.createElement('div');
    alertEl.id = alertId;
    alertEl.className = `flex items-center p-4 mb-4 text-white ${bgColor} rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    alertEl.innerHTML = `
        <div class="flex-shrink-0">${iconSvg}</div>
        <div class="ml-3 text-sm font-medium">${message}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 p-1.5 hover:bg-white/30 inline-flex h-8 w-8" onclick="document.getElementById('${alertId}').remove()">
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    `;

    alertContainer.appendChild(alertEl);

    // Animate in
    requestAnimationFrame(() => alertEl.classList.remove('translate-x-full'));

    // Auto-remove after 5 seconds
    setTimeout(() => alertEl.remove(), 5000);
}

function initializeDatabase() {
    if (!localStorage.getItem(DB_PRODUCTS_KEY)) saveToDB(DB_PRODUCTS_KEY, INITIAL_PRODUCTS);
    if (!localStorage.getItem(DB_CUSTOMERS_KEY)) saveToDB(DB_CUSTOMERS_KEY, INITIAL_CUSTOMERS);
    if (!localStorage.getItem(DB_ORDERS_KEY)) saveToDB(DB_ORDERS_KEY, INITIAL_ORDERS);
    if (!localStorage.getItem(DB_CATEGORIES_KEY)) saveToDB(DB_CATEGORIES_KEY, INITIAL_CATEGORIES);
    if (!localStorage.getItem(DB_VOUCHERS_KEY)) saveToDB(DB_VOUCHERS_KEY, INITIAL_VOUCHERS);
    if (!localStorage.getItem(DB_BANNERS_KEY)) saveToDB(DB_BANNERS_KEY, []);
    if (!localStorage.getItem(DB_NOTIFICATIONS_KEY)) saveToDB(DB_NOTIFICATIONS_KEY, []);
    if (!localStorage.getItem(DB_FARMER_OFFERS_KEY)) saveToDB(DB_FARMER_OFFERS_KEY, INITIAL_FARMER_OFFERS);
    if (!localStorage.getItem(DB_STOCK_NEEDS_KEY)) saveToDB(DB_STOCK_NEEDS_KEY, INITIAL_STOCK_NEEDS);
    if (!localStorage.getItem(DB_SCHEDULES_KEY)) saveToDB(DB_SCHEDULES_KEY, INITIAL_SCHEDULES);
    if (!localStorage.getItem(DB_LAND_AREAS_KEY)) saveToDB(DB_LAND_AREAS_KEY, INITIAL_LAND_AREAS);
    if (!localStorage.getItem(DB_LOANS_KEY)) saveToDB(DB_LOANS_KEY, INITIAL_LOANS);
    if (!localStorage.getItem(DB_PURCHASES_KEY)) saveToDB(DB_PURCHASES_KEY, INITIAL_PURCHASES); // Inisialisasi data pembelian
    if (!localStorage.getItem(DB_PERUMDA_ORDERS_KEY)) saveToDB(DB_PERUMDA_ORDERS_KEY, INITIAL_PERUMDA_ORDERS); // Inisialisasi data Perumda
    if (!localStorage.getItem(DB_PAYMENT_METHODS_KEY)) saveToDB(DB_PAYMENT_METHODS_KEY, INITIAL_PAYMENT_METHODS);
    if (!localStorage.getItem(DB_EXTERNAL_USERS_KEY)) saveToDB(DB_EXTERNAL_USERS_KEY, INITIAL_EXTERNAL_USERS); // Inisialisasi data admin eksternal
    if (!localStorage.getItem(DB_REQUESTS_KEY)) saveToDB(DB_REQUESTS_KEY, []); // Inisialisasi data permintaan
}

function renderPerumdaOrdersTable() {
    // Kunci ini harus sama dengan yang digunakan di Perumda_dashboard.html
    const perumdaOrders = getFromDB(DB_PERUMDA_ORDERS_KEY) || [];
    const tableBody = document.getElementById('perumda-orders-table').querySelector('tbody');
    tableBody.innerHTML = '';

    if (perumdaOrders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Belum ada pesanan dari Perumda.</td></tr>';
        return;
    }

    perumdaOrders.forEach(order => {
        const statusClasses = {
            'Menunggu Verifikasi': 'bg-orange-100 text-orange-800',
            'Diproses': 'bg-blue-100 text-blue-800',
            'Selesai': 'bg-emerald-100 text-emerald-800',
        };
        const statusClass = statusClasses[order.status] || 'bg-slate-100 text-slate-800';
        const row = `
            <tr data-id="${order.id}">
                <td data-label="ID Transaksi" class="p-3 font-mono text-sm">${order.id}</td>
                <td data-label="Pelanggan" class="p-3 font-medium">${order.customer}</td>
                <td data-label="Tanggal" class="p-3">${new Date(order.date).toLocaleDateString('id-ID')}</td>
                <td data-label="Total" class="p-3">${formatRupiah(order.total)}</td>
                <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${order.status}</span></td>
                <td data-label="Aksi" class="p-3 actions-cell">
                    <button onclick="openPerumdaOrderDetailModal('${order.id}')" class="text-blue-600 hover:text-blue-900">Lihat Detail</button>
                </td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menu-btn');
    const sidebarNav = document.getElementById('sidebar-nav');
    const headerTitle = document.getElementById('header-title');
    const pageContents = document.querySelectorAll('.page-content');

    // --- CORE FUNCTIONALITY & STATE ---
    let salesChart; // To hold the chart instance
    let itemToDelete = { element: null, type: null, id: null };

    // Admin Settings Modal
    document.getElementById('admin-settings-btn').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(document.getElementById('admin-settings-modal'));
        // Populate current admin name
        document.getElementById('current-admin-name').value = window.loggedInAdminName;
        // Close profile dropdown
        profileDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
    });

    document.getElementById('change-admin-name-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('new-admin-name').value.trim();
        if (newName) {
            // In a real app, you'd save this to the server.
            // Here, we'll update the session and local storage simulation.
            let admins = getFromDB('gerbangPanganAdmins'); // Assuming you have an admin DB
            const admin = admins.find(a => a.username === window.loggedInAdminName);
            if (admin) {
                admin.username = newName;
                saveToDB('gerbangPanganAdmins', admins);
            }

            sessionStorage.setItem('loggedInAdminName', newName);
            window.loggedInAdminName = newName;

            // Update UI
            document.getElementById('sidebar-admin-name').textContent = `oleh ${newName}`;
            updateAdminAvatar(newName);

            showAlert(`Nama admin berhasil diubah menjadi "${newName}".`);
            closeModal(document.getElementById('admin-settings-modal'));
        }
    });



    function showPage(targetPageId = 'page-dasbor') {
        // 1. Sembunyikan semua konten halaman
        pageContents.forEach(page => {
            page.classList.add('hidden');
        });

        // 2. Tampilkan hanya konten yang dituju
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }

        // 3. Atur status aktif pada link sidebar
        document.querySelectorAll('#sidebar-nav .sidebar-link').forEach(link => {
            link.classList.remove('sidebar-link-active');
        });
        const activeLink = document.querySelector(`#sidebar-nav .sidebar-link[data-target="${targetPageId}"]`);
        if (activeLink) {
            activeLink.classList.add('sidebar-link-active');
            // 4. Perbarui judul di header
            headerTitle.textContent = activeLink.textContent.trim();
        }

        // 5. Perbarui notifikasi badge di sidebar
        updateSidebarBadges();

        // 6. Tutup sidebar secara otomatis di tampilan mobile setelah link diklik
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }

        // 7. Panggil fungsi render yang sesuai untuk halaman yang baru ditampilkan
        const renderActions = {
            'page-dasbor': renderDashboardMetrics,
            'page-produk': renderProductsTable,
            'page-pelanggan': renderCustomersTable,
            'page-ulasan': renderReviewsTable,
            'page-permintaan': renderRequestsTable,
            'page-kategori': renderCategoriesTable,
            'page-pesanan': renderOrdersTable,
            'page-stok-gudang': renderStokGudangTable,
            'page-simpanan': () => { renderSavingsTable(); updateSavingsMemberDropdown(); },
            'page-info-penawaran': renderFarmerOffersTable,
            'page-kebutuhan-stok': renderStockNeedsTable,
            'page-jadwal-tanam': renderPlantingCalendar,
            'page-jadwal-panen': renderHarvestingCalendar,
            'page-luas-lahan': renderLandAreaTable,
            'page-perumda': renderPerumdaOrdersTable,
            'page-pinjaman': renderLoansTable,
            'page-pembelian': renderPurchasesTable,
            'page-laporan': () => createSalesChart('salesChartLaporan'),
        };

        renderActions[targetPageId]?.();
    }

    // --- EVENT LISTENERS ---

    // Sidebar Toggle (Mobile)
    menuBtn.addEventListener('click', () => sidebar.classList.toggle('-translate-x-full'));

    // Logout Button
    document.querySelectorAll('#logout-btn, #logout-btn-dropdown').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear(); // Membersihkan semua sesi terkait admin
        window.location.href = 'admin_apk_login.html';
    }));

    // --- DUMMY DATA GENERATION ---
    const DUMMY_PRODUCTS = [
        { id: 25, name: 'Selada Hidroponik', image: 'https://i.pinimg.com/736x/c1/71/27/c1712724393574a43f7b3c63431b25b5.jpg', stock: 500, unit: 'pack', threshold: 50, price: 15000, category: 'Pertanian', description: 'Selada segar dari kebun hidroponik, bebas pestisida.', lastUpdate: new Date().toISOString(), koperasiAsal: "Koperasi Ampibabo" },
        { id: 26, name: 'Ikan Tongkol Potong', image: 'https://i.pinimg.com/736x/43/2d/48/432d484383a3561622543b95358d352e.jpg', stock: 200, unit: 'Kg', threshold: 40, price: 35000, category: 'Perikanan', description: 'Ikan tongkol segar, sudah dipotong dan dibersihkan.', lastUpdate: new Date().toISOString(), koperasiAsal: "Koperasi Ampibabo" },
        { id: 27, name: 'Ubi Jalar Cilembu', image: 'https://i.pinimg.com/736x/8b/53/36/8b5336585353a215a24351533599a59a.jpg', stock: 1000, unit: 'Kg', threshold: 150, price: 18000, category: 'Pertanian', description: 'Ubi jalar manis khas Cilembu, cocok untuk dibakar.', lastUpdate: new Date().toISOString(), koperasiAsal: "Koperasi Ampibabo" },
        { id: 28, name: 'Kepiting Bakau Hidup', image: 'https://i.pinimg.com/736x/b9/3c/8c/b93c8c33e42583271c8a3d427341ab3e.jpg', stock: 80, unit: 'Kg', threshold: 10, price: 120000, category: 'Perikanan', description: 'Kepiting bakau segar, ukuran konsumsi.', lastUpdate: new Date().toISOString(), koperasiAsal: "Koperasi Ampibabo" },
        { id: 29, name: 'Pakcoy Organik', image: 'https://i.pinimg.com/736x/2d/3a/1c/2d3a1c818a0d18a5486a830d616855e5.jpg', stock: 600, unit: 'ikat', threshold: 100, price: 7000, category: 'Pertanian', description: 'Sayur pakcoy segar dari kebun organik.', lastUpdate: new Date().toISOString(), koperasiAsal: "Koperasi Ampibabo" }
    ];

    function generateDummyData() {
        let products = getFromDB(DB_PRODUCTS_KEY);
        const dummyProductIds = DUMMY_PRODUCTS.map(p => p.id);
        products = products.filter(p => !dummyProductIds.includes(p.id));

        products.push(...DUMMY_PRODUCTS);
        saveToDB(DB_PRODUCTS_KEY, products);
        showAlert('5 produk dummy untuk presentasi (Pertanian & Perikanan) berhasil ditambahkan.');
        showPage('page-produk');
    }

    document.getElementById('generate-dummy-data-btn').addEventListener('click', generateDummyData);

    // --- PERBAIKAN LOGIKA NAVIGASI SPA ---
    sidebarNav.addEventListener('click', (e) => { const link = e.target.closest('.sidebar-link'); if (link) { e.preventDefault(); window.location.hash = link.dataset.target; } });
    window.addEventListener('hashchange', () => showPage(window.location.hash.substring(1)));

    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('hidden');
        profileDropdown.classList.toggle('opacity-0');
        profileDropdown.classList.toggle('scale-95');
        notifDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
    });

    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
        notifDropdown.classList.toggle('opacity-0');
        notifDropdown.classList.toggle('scale-95');
        profileDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
    });

    window.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
        }
        if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
            notifDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
        }
    });

    // Product page listeners
    document.getElementById('product-search').addEventListener('input', renderProductsTable);
    document.getElementById('category-filter').addEventListener('change', renderProductsTable);

    // --- PERBAIKAN KRUSIAL (v2): Pindahkan event listener gambar ke sini ---
    // Ini memastikan listener siap sejak halaman dimuat, bukan saat tombol simpan ditekan.
    document.getElementById('product-image-upload')?.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Simpan data Base64 ke input tersembunyi
                document.getElementById('product-image-base64').value = e.target.result;
                // Tampilkan preview gambar
                document.getElementById('product-image-preview').innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-lg">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Order page listeners
    document.getElementById('order-search').addEventListener('input', renderOrdersTable);
    document.getElementById('status-filter').addEventListener('change', renderOrdersTable);

    // Customer page listeners
    document.getElementById('customer-search').addEventListener('input', renderCustomersTable);

    // Savings page listeners
    document.getElementById('savings-search').addEventListener('input', renderSavingsTable);

    // Stok Gudang page listeners
    document.getElementById('stok-search').addEventListener('input', renderStokGudangTable);
    document.getElementById('stok-status-filter').addEventListener('change', renderStokGudangTable);

    // Reviews page listeners
    document.getElementById('review-search').addEventListener('input', renderReviewsTable);
    document.getElementById('rating-filter').addEventListener('change', renderReviewsTable);

    // --- MODAL & FORM HANDLING ---

    function openModal(modal) {
        if (!modal) return;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('.modal-content').classList.remove('scale-95');
        }, 10);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.add('opacity-0');
        modal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    // Attach close listeners to all close buttons and cancel buttons
    document.querySelectorAll('.close-modal-btn, .cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-container');
            if (modal) closeModal(modal);
        });
    });

    // Close modal when clicking on the backdrop
    document.querySelectorAll('.modal-container').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Product Modal
    document.getElementById('add-product-btn').addEventListener('click', () => openProductModal());
    document.getElementById('save-product-btn').addEventListener('click', saveProduct);
    document.getElementById('products-table').addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-product-btn');
        const deleteBtn = e.target.closest('.delete-item-btn');
        if (editBtn) {
            const row = editBtn.closest('tr');
            const productId = parseInt(row.dataset.id);
            openProductModal(productId);
        }
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const productId = parseInt(row.dataset.id);
            const products = getFromDB(DB_PRODUCTS_KEY);
            const product = products.find(p => p.id === productId);
            itemToDelete = { type: 'product', id: productId, name: product.name };
            openDeleteModal(`Anda yakin ingin menghapus produk "${product.name}"?`);
        }
    });

    // Customer Modal
    document.getElementById('add-customer-btn').addEventListener('click', () => openCustomerModal());
    document.getElementById('save-customer-btn').addEventListener('click', saveCustomer);
    document.getElementById('customers-table').addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-customer-btn');
        const deleteBtn = e.target.closest('.delete-item-btn');
        if (editBtn) {
            const row = editBtn.closest('tr');
            const customerId = parseInt(row.dataset.id);
            openCustomerModal(customerId);
        }
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const customerId = parseInt(row.dataset.id);
            const customers = getFromDB(DB_CUSTOMERS_KEY);
            const customer = customers.find(c => c.id === customerId);
            itemToDelete = { type: 'customer', id: customerId, name: customer.name };
            openDeleteModal(`Anda yakin ingin menghapus anggota "${customer.name}"?`);
        }
    });

    // Category Modal
    document.getElementById('add-category-btn').addEventListener('click', () => openCategoryModal());
    document.getElementById('save-category-btn').addEventListener('click', saveCategory);
    // Event listener untuk tabel kategori dinonaktifkan karena tabelnya sudah dihapus.
    // document.getElementById('categories-table').addEventListener('click', (e) => { ... });

    // Order Detail Modal
    document.querySelector('main').addEventListener('click', (e) => {
        const detailBtn = e.target.closest('.view-order-btn');
        const perumdaDetailBtn = e.target.closest('#perumda-orders-table button');

        if (detailBtn) {
            const orderId = detailBtn.closest('tr').dataset.id;
            openOrderDetailModal(orderId, 'regular');
        } else if (perumdaDetailBtn && perumdaDetailBtn.textContent.includes('Lihat Detail')) {
            const orderId = perumdaDetailBtn.closest('tr').dataset.id;
            openOrderDetailModal(orderId, 'perumda');
        }
    });

    // Delete Confirmation
    document.getElementById('confirm-delete-btn').addEventListener('click', confirmDelete);

    // Notification Form
    document.getElementById('notification-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('notif-title').value;
        const detail = document.getElementById('notif-detail').value;
        const icon = document.getElementById('notif-icon').value;

        let notifications = getFromDB(DB_NOTIFICATIONS_KEY);
        const newNotif = {
            id: 'notif-' + Date.now(),
            title: title,
            detail: detail,
            icon: icon,
            date: new Date().toISOString(),
            read: false,
            type: 'broadcast'
        };
        notifications.push(newNotif);
        saveToDB(DB_NOTIFICATIONS_KEY, notifications);

        showAlert('Notifikasi berhasil dikirim ke semua pengguna.');
        document.getElementById('notification-form').reset();
    });

    // Savings Modal
    document.getElementById('add-savings-btn').addEventListener('click', () => {
        openModal(document.getElementById('savings-transaction-modal'));
    });
    document.getElementById('process-savings-btn').addEventListener('click', processSavingsTransaction);

    // Banner Upload
    document.getElementById('banner-upload').addEventListener('change', handleBannerUpload);
    document.getElementById('banner-table').addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-item-btn');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const bannerId = row.dataset.id;
            const banners = getFromDB(DB_BANNERS_KEY);
            const banner = banners.find(b => b.id == bannerId);
            itemToDelete = { type: 'banner', id: bannerId, name: banner.name };
            openDeleteModal(`Anda yakin ingin menghapus banner "${banner.name}"?`);
        }
    });

    // Voucher Modal
    document.getElementById('add-voucher-btn').addEventListener('click', () => {
        openModal(document.getElementById('add-voucher-modal'));
    });

    document.getElementById('save-voucher-btn').addEventListener('click', saveVoucher);
    document.getElementById('vouchers-table').addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-item-btn');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const voucherId = row.dataset.id;
            const vouchers = getFromDB(DB_VOUCHERS_KEY);
            const voucher = vouchers.find(v => v.id === voucherId);
            itemToDelete = { type: 'voucher', id: voucherId, name: voucher.code };
            openDeleteModal(`Anda yakin ingin menghapus voucher "${voucher.code}"?`);
        }
    });

    // Reply Modal
    document.getElementById('send-reply-btn').addEventListener('click', sendReply);

    function openReplyModal(requestId) {
        const requests = getFromDB(DB_REQUESTS_KEY);
        const request = requests.find(r => r.id == requestId);
        if (!request) return;

        document.getElementById('reply-request-id').value = requestId;
        document.getElementById('original-request-text').textContent = request.request;
        document.getElementById('reply-details').value = request.reply || ''; // Tampilkan balasan lama jika ada
        openModal(document.getElementById('reply-request-modal'));
    }

    function sendReply() {
        const requestId = document.getElementById('reply-request-id').value;
        const replyText = document.getElementById('reply-details').value;
        let requests = getFromDB(DB_REQUESTS_KEY);
        const index = requests.findIndex(r => r.id == requestId);
        if (index > -1) {
            requests[index].status = 'Dibalas';
            requests[index].reply = replyText;
            requests[index].replyDate = new Date().toISOString();
            saveToDB(DB_REQUESTS_KEY, requests);
            showAlert('Balasan berhasil dikirim.');
            renderRequestsTable();
            closeModal(document.getElementById('reply-request-modal'));
        }
    }

    function markRequestAsRead(requestId) {
        let requests = getFromDB(DB_REQUESTS_KEY);
        const index = requests.findIndex(r => r.id == requestId);
        if (index > -1) { requests[index].status = 'Dibaca'; saveToDB(DB_REQUESTS_KEY, requests); renderRequestsTable(); updateSidebarBadges(); }
    }

    function renderRequestsTable() {
        const allRequests = getFromDB(DB_REQUESTS_KEY);
        const requests = allRequests.filter(r => r.koperasiAsal === window.loggedInKoperasi);
        const tableBody = document.getElementById('requests-table').querySelector('tbody');
        tableBody.innerHTML = '';

        if (requests.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Belum ada pesan permintaan.</td></tr>';
            return;
        }

        requests.sort((a, b) => new Date(b.date) - new Date(a.date));

        requests.forEach(req => {
            const statusClasses = {
                'Baru': 'bg-sky-100 text-sky-800',
                'Dibaca': 'bg-slate-100 text-slate-800',
                'Dibalas': 'bg-emerald-100 text-emerald-800',
            };
            const statusClass = statusClasses[req.status] || 'bg-slate-100';
            const isNew = req.status === 'Baru';

            const row = `
                <tr data-id="${req.id}" class="${isNew ? 'font-bold' : ''}">
                    <td data-label="Tanggal" class="p-3">${new Date(req.date).toLocaleDateString('id-ID')}</td>
                    <td data-label="Pengguna" class="p-3">${req.userName}</td>
                    <td data-label="Isi Permintaan" class="p-3">${req.request}</td>
                    <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${req.status}</span></td>
                    <td data-label="Aksi" class="p-3 actions-cell space-x-2">
                        <button onclick="openReplyModal('${req.id}')" class="text-blue-600 hover:text-blue-900">Balas</button>
                        ${isNew ? `<button onclick="markRequestAsRead('${req.id}')" class="text-slate-500 hover:text-slate-800">Tandai Dibaca</button>` : ''}
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Loan Modal
    document.getElementById('add-loan-btn')?.addEventListener('click', () => openLoanModal());
    document.getElementById('save-loan-btn')?.addEventListener('click', saveLoan);
    document.getElementById('loans-table-body')?.addEventListener('click', handleLoanTableActions);

    // Purchase Modal
    document.getElementById('add-purchase-btn')?.addEventListener('click', () => openModal(document.getElementById('purchase-modal')));
    document.getElementById('save-purchase-btn')?.addEventListener('click', savePurchase);

    // Purchase page filters (Riwayat Pembelian)
    const purchaseFilters = ['purchase-search', 'purchase-start-date', 'purchase-end-date'];
    purchaseFilters.forEach(id => {
        document.getElementById(id)?.addEventListener('input', renderPurchasesTable);
    });

    // Stock Need Form
    document.getElementById('post-stock-need-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        let needs = getFromDB(DB_STOCK_NEEDS_KEY);
        const newNeed = {
            id: 'sn' + Date.now(),
            productName: document.getElementById('need-product-name').value,
            quantity: document.getElementById('need-quantity').value,
            unit: document.getElementById('need-unit').value,
            priceRange: document.getElementById('need-price-range').value,
            postDate: new Date().toISOString().split('T')[0],
            status: 'Aktif'
        };
        needs.unshift(newNeed);
        saveToDB(DB_STOCK_NEEDS_KEY, needs);
        showAlert('Kebutuhan stok berhasil diposting.');
        renderStockNeedsTable();
        e.target.reset();
    });
    document.getElementById('stock-needs-table-body')?.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-item-btn');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const needId = row.dataset.id;
            const needs = getFromDB(DB_STOCK_NEEDS_KEY);
            const need = needs.find(n => n.id === needId);
            itemToDelete = { type: 'stockNeed', id: needId, name: `kebutuhan ${need.productName}` };
            openDeleteModal(`Anda yakin ingin menghapus ${itemToDelete.name}?`);
        }
    });



    // --- RENDER FUNCTIONS (Many were missing) ---
    function renderCustomersTable() {
        const allCustomers = getFromDB(DB_CUSTOMERS_KEY);
        if (!document.getElementById('customers-table')) return;
        const tableBody = document.getElementById('customers-table').querySelector('tbody');
        tableBody.innerHTML = '';
        const searchTerm = document.getElementById('customer-search').value.toLowerCase();
        const customers = allCustomers.filter(c => c.koperasiAsal === window.loggedInKoperasi);

        const filteredCustomers = customers.filter(c =>
            c.name.toLowerCase().includes(searchTerm) || c.email.toLowerCase().includes(searchTerm)
        );

        if (filteredCustomers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Anggota tidak ditemukan.</td></tr>';
            return;
        }

        filteredCustomers.forEach(customer => {
            const statusClass = customer.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800';
            const row = `
                <tr data-id="${customer.id}">
                    <td data-label="Anggota" class="p-3 font-medium">${customer.name}</td>
                    <td data-label="Email" class="p-3">${customer.email}</td>
                    <td data-label="Bergabung" class="p-3">${new Date(customer.joinDate).toLocaleDateString('id-ID')}</td>
                    <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${customer.status}</span></td>
                    <td data-label="Aksi" class="p-3 actions-cell space-x-2">
                        <button class="edit-customer-btn p-2 bg-slate-100 rounded-md hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg></button>
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderOrdersTable() {
        const allOrders = getFromDB(DB_ORDERS_KEY);
        const allProducts = getFromDB(DB_PRODUCTS_KEY);
        if (!document.getElementById('orders-table')) return;
        const tableBody = document.getElementById('orders-table').querySelector('tbody');
        tableBody.innerHTML = '';
        const searchTerm = document.getElementById('order-search').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;

        const koperasiProducts = allProducts.filter(p => p.koperasiAsal === window.loggedInKoperasi).map(p => p.name);
        const orders = allOrders.filter(o => o.items.some(item => koperasiProducts.includes(item.name)));


        const filteredOrders = orders.filter(o => {
            const matchesSearch = o.id.toLowerCase().includes(searchTerm) || o.customerName.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter ? o.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredOrders.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Pesanan tidak ditemukan.</td></tr>';
            return;
        }

        filteredOrders.forEach(order => {
            const coopTotalPrice = order.items.reduce((sum, item) => {
                if (koperasiProducts.includes(item.name)) {
                    return sum + (item.price * item.quantity);
                }
                return sum;
            }, 0);

            const statusClasses = {
                'Menunggu Pembayaran': 'bg-yellow-100 text-yellow-800',
                'Menunggu Pembayaran Tunai': 'bg-orange-100 text-orange-800',
                'Diproses': 'bg-blue-100 text-blue-800', 'Menunggu Verifikasi': 'bg-orange-100 text-orange-800',
                'Dikirim': 'bg-cyan-100 text-cyan-800',
                'Selesai': 'bg-emerald-100 text-emerald-800',
                'Dibatalkan': 'bg-rose-100 text-rose-800',
                'Menunggu Verifikasi': 'bg-orange-100 text-orange-800',
            };
            const statusClass = statusClasses[order.status] || 'bg-slate-100 text-slate-800';
            const row = `
                <tr data-id="${order.id}">
                    <td data-label="ID Pesanan" class="p-3 font-mono text-sm">${order.id}</td>
                    <td data-label="Pelanggan" class="p-3">${order.customerName}</td>
                    <td data-label="Tanggal" class="p-3">${new Date(order.date).toLocaleDateString('id-ID')}</td>
                    <td data-label="Total" class="p-3">${formatRupiah(coopTotalPrice)}</td>
                    <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${order.status}</span></td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <button class="view-order-btn text-blue-600 hover:text-blue-900">Lihat Detail</button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderReviewsTable() {
        const allOrders = getFromDB(DB_ORDERS_KEY);
        const allProducts = getFromDB(DB_PRODUCTS_KEY);
        if (!document.getElementById('reviews-table')) return;
        const tableBody = document.getElementById('reviews-table').querySelector('tbody');
        tableBody.innerHTML = '';
        const searchTerm = document.getElementById('review-search').value.toLowerCase();
        const ratingFilter = parseInt(document.getElementById('rating-filter').value);

        const koperasiProducts = allProducts.filter(p => p.koperasiAsal === window.loggedInKoperasi).map(p => p.name);
        const orders = allOrders.filter(o => o.items.some(item => koperasiProducts.includes(item.name)));

        const filteredReviews = orders.filter(o => {
            const hasReview = o.rating > 0;
            // --- PERBAIKAN: Pencarian ulasan kini hanya mencakup produk dari koperasi yang relevan ---
            const matchesSearch = o.customerName.toLowerCase().includes(searchTerm) ||
                o.items.some(i => koperasiProducts.includes(i.name) && i.name.toLowerCase().includes(searchTerm));
            const matchesRating = !ratingFilter || o.rating === ratingFilter;
            return hasReview && matchesSearch && matchesRating;
        });

        if (filteredReviews.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Belum ada ulasan.</td></tr>';
            return;
        }
        filteredReviews.forEach(order => {
            const stars = '⭐'.repeat(order.rating) + '☆'.repeat(5 - order.rating); // Using ⭐ and ☆ for better compatibility
            const row = `
                <tr data-id="${order.id}">
                    <td data-label="Produk" class="p-3 font-medium">${order.items.filter(i => koperasiProducts.includes(i.name)).map(i => i.name).join(', ')}</td>
                    <td data-label="Pelanggan" class="p-3">${order.customerName}</td>
                    <td data-label="Rating" class="p-3 text-amber-500">${stars}</td>
                    <td data-label="Ulasan" class="p-3 italic text-slate-600">"${order.comment || '-'}"</td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100" title="Hapus Ulasan">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    document.getElementById('reviews-table')?.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-item-btn');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const orderId = row.dataset.id;
            const orders = getFromDB(DB_ORDERS_KEY);
            const order = orders.find(o => o.id === orderId);
            itemToDelete = { type: 'review', id: orderId, name: `ulasan untuk pesanan #${orderId}` };
            openDeleteModal(`Anda yakin ingin menghapus ${itemToDelete.name}? Ini akan mereset rating dan komentar pesanan.`);
        }
    });

    function renderCategoriesTable() {
        const categories = getFromDB(DB_CATEGORIES_KEY);
        const products = getFromDB(DB_PRODUCTS_KEY);
        if (!document.getElementById('categories-table')) return;
        const tableBody = document.getElementById('categories-table').querySelector('tbody');
        tableBody.innerHTML = '';
        if (categories.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" class="text-center p-4">Belum ada kategori.</td></tr>';
            return;
        }
        categories.forEach(cat => {
            const productCount = products.filter(p => p.category === cat).length;
            const row = `<tr>
                                     <td data-label="Nama Kategori" class="p-3 font-medium">${cat}</td>
                                     <td data-label="Jumlah Produk" class="p-3">${productCount} produk</td>
                                 </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderRequestsTable() {
        const requests = getFromDB(DB_REQUESTS_KEY);
        const tableBody = document.getElementById('requests-table')?.querySelector('tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        if (requests.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Tidak ada permintaan baru.</td></tr>';
            return;
        }

        requests.forEach(req => {
            const statusClasses = {
                'Baru': 'bg-sky-100 text-sky-800',
                'Dibaca': 'bg-slate-100 text-slate-800',
                'Dibalas': 'bg-emerald-100 text-emerald-800'
            };
            const statusClass = statusClasses[req.status] || 'bg-slate-100 text-slate-800';
            const row = `
                <tr data-id="${req.id}">
                    <td data-label="Tanggal" class="p-3">${new Date(req.date).toLocaleString('id-ID')}</td>
                    <td data-label="Pengguna" class="p-3 font-medium">${req.user}</td>
                    <td data-label="Isi Permintaan" class="p-3 text-slate-600">${req.request}</td>
                    <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${req.status}</span></td>
                    <td data-label="Aksi" class="p-3 actions-cell space-x-2">
                        <button data-id="${req.id}" class="reply-request-btn text-emerald-600 hover:text-emerald-900 text-sm font-semibold">Balas</button>
                        ${req.status === 'Baru' ? `<button data-id="${req.id}" class="mark-request-read-btn text-blue-600 hover:text-blue-900 text-sm">Tandai Dibaca</button>` : ''}
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        document.querySelectorAll('.mark-request-read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                markRequestAsRead(e.currentTarget.dataset.id);
            });
        });

        document.querySelectorAll('.reply-request-btn').forEach(btn => {
            btn.addEventListener('click', (e) => openReplyModal(e.currentTarget.dataset.id));
        });
    }

    function renderStokGudangTable() {
        const allProducts = getFromDB(DB_PRODUCTS_KEY);
        const tableBody = document.getElementById('stok-gudang-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';
        const searchTerm = document.getElementById('stok-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('stok-status-filter')?.value || '';

        const products = allProducts.filter(p => p.koperasiAsal === window.loggedInKoperasi);

        const getStatus = (p) => {
            if (p.stock <= 0) return 'Habis';
            if (p.stock < p.threshold) return 'Menipis';
            return 'Aman';
        };

        const filteredProducts = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || getStatus(p) === statusFilter;
            return matchesSearch && matchesStatus;
        }).sort((a, b) => a.stock - b.stock);

        if (filteredProducts.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Belum ada produk.</td></tr>';
            return;
        }
        filteredProducts.forEach(product => {
            const status = getStatus(product);
            const statusClasses = {
                'Habis': 'bg-rose-100 text-rose-800',
                'Menipis': 'bg-yellow-100 text-yellow-800',
                'Aman': 'bg-emerald-100 text-emerald-800'
            };
            const stockStatus = `<span class="${statusClasses[status]} text-xs font-medium px-2.5 py-0.5 rounded-full">${status}</span>`;
            const row = `
                <tr>
                    <td class="p-3 font-medium">${product.name}</td>
                    <td class="p-3">${product.category}</td>
                    <td class="p-3 text-right font-semibold">${product.stock} ${product.unit}</td>
                    <td class="p-3 text-center">${stockStatus}</td>
                    <td class="p-3 text-sm text-slate-500">${new Date(product.lastUpdate).toLocaleString('id-ID')}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderBannerTable() {
        const banners = getFromDB(DB_BANNERS_KEY);
        if (!document.getElementById('banner-table')) return;
        const tableBody = document.getElementById('banner-table').querySelector('tbody');
        tableBody.innerHTML = '';
        if (banners.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" class="text-center p-4">Belum ada banner.</td></tr>';
            return;
        }
        banners.forEach(banner => {
            const row = `
                <tr data-id="${banner.id}" data-type="banner" data-name="${banner.name}">
                    <td data-label="Preview" class="p-3"><img src="${banner.image}" alt="${banner.name}" class="w-32 h-auto rounded-md object-cover"></td>
                    <td data-label="Nama File" class="p-3">${banner.name}</td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100" title="Hapus Banner"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderVouchersTable() {
        const vouchers = getFromDB(DB_VOUCHERS_KEY);
        if (!document.getElementById('vouchers-table')) return;
        const tableBody = document.getElementById('vouchers-table').querySelector('tbody');
        tableBody.innerHTML = '';
        if (vouchers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center p-4">Belum ada voucher.</td></tr>';
            return;
        }
        vouchers.forEach(voucher => {
            const valueText = voucher.type === 'percentage' ? `${voucher.value}%` : formatRupiah(voucher.value);
            const row = `
                <tr data-id="${voucher.id}" data-type="voucher" data-name="${voucher.code}">
                    <td data-label="Kode" class="p-3 font-mono">${voucher.code}</td>
                    <td data-label="Jenis" class="p-3 capitalize">${voucher.type}</td>
                    <td data-label="Nilai" class="p-3">${valueText}</td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100" title="Hapus Voucher"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderFarmerOffersTable() {
        const allOffers = getFromDB(DB_FARMER_OFFERS_KEY);
        const tableBody = document.getElementById('farmer-offers-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';
        // Asumsi penawaran petani tidak terikat koperasi spesifik, jadi tampilkan semua
        const offers = allOffers;

        if (offers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Belum ada penawaran dari petani.</td></tr>';
            return;
        }
        offers.forEach(offer => {
            const statusClass = offer.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800';
            const row = `
                <tr data-id="${offer.id}">
                    <td data-label="Petani" class="p-3 font-medium">${offer.farmerName}</td>
                    <td data-label="Produk" class="p-3">${offer.productName}</td>
                    <td data-label="Jumlah" class="p-3">${offer.quantity} ${offer.unit}</td>
                    <td data-label="Harga" class="p-3">${formatRupiah(offer.price)} / ${offer.unit}</td>
                    <td data-label="Tgl Panen" class="p-3">${new Date(offer.harvestDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${offer.status}</span></td>
                    <td data-label="Aksi" class="p-3 actions-cell space-x-2">
                        <button class="text-blue-600 hover:text-blue-900 text-sm font-semibold">Terima</button>
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100" title="Hapus Penawaran">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderStockNeedsTable() {
        const allNeeds = getFromDB(DB_STOCK_NEEDS_KEY);
        const tableBody = document.getElementById('stock-needs-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';
        // Asumsi kebutuhan stok adalah untuk koperasi ini, bisa disesuaikan jika global
        const needs = allNeeds;

        if (needs.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Tidak ada kebutuhan stok yang aktif.</td></tr>';
            return;
        }
        needs.forEach(need => {
            const statusClass = need.status === 'Aktif' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800';
            const row = `
                <tr data-id="${need.id}">
                    <td data-label="Produk" class="p-3 font-medium">${need.productName}</td>
                    <td data-label="Jumlah" class="p-3 text-right">${need.quantity} ${need.unit}</td>
                    <td data-label="Rentang Harga" class="p-3">${need.priceRange}</td>
                    <td data-label="Tgl Posting" class="p-3">${new Date(need.postDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td data-label="Status" class="p-3"><span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${need.status}</span></td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100" title="Hapus Kebutuhan">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    let plantingCalendar, harvestingCalendar;
    function renderPlantingCalendar() {
        const calendarEl = document.getElementById('planting-calendar');
        if (!calendarEl || !window.FullCalendar) return;
        const schedules = getFromDB(DB_SCHEDULES_KEY).filter(s => s.type === 'tanam');
        if (plantingCalendar) {
            plantingCalendar.destroy();
        }
        plantingCalendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' },
            events: schedules,
            locale: 'id'
        });
        plantingCalendar.render();
    }

    function renderHarvestingCalendar() {
        const calendarEl = document.getElementById('harvesting-calendar');
        if (!calendarEl || !window.FullCalendar) return;
        const schedules = getFromDB(DB_SCHEDULES_KEY).filter(s => s.type === 'panen');
        if (harvestingCalendar) {
            harvestingCalendar.destroy();
        }
        harvestingCalendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' },
            events: schedules,
            locale: 'id'
        });
        harvestingCalendar.render();
    }

    function renderLandAreaTable() {
        const allLandAreas = getFromDB(DB_LAND_AREAS_KEY);
        const tableBody = document.getElementById('land-area-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';
        // Asumsi data lahan adalah global dan bisa dilihat semua admin koperasi
        const landAreas = allLandAreas;

        if (landAreas.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Belum ada data luas lahan dari petani.</td></tr>';
            return;
        }
        landAreas.forEach(land => {
            const statusClass = land.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800';
            const row = `
                <tr data-id="${land.id}">
                    <td data-label="Petani/Kelompok" class="p-3 font-medium">${land.farmerName}</td>
                    <td data-label="Lokasi" class="p-3">${land.landLocation}</td>
                    <td data-label="Luas" class="p-3 text-right">${land.area} ${land.unit}</td>
                    <td data-label="Komoditas Utama" class="p-3">${land.commodity}</td>
                    <td data-label="Status" class="p-3">
                        <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${land.status}</span>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderLoansTable() {
        const allLoans = getFromDB(DB_LOANS_KEY);
        const allCustomers = getFromDB(DB_CUSTOMERS_KEY);
        const tableBody = document.getElementById('loans-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';

        const koperasiCustomerIds = new Set(allCustomers.filter(c => c.koperasiAsal === window.loggedInKoperasi).map(c => c.id));
        const loans = allLoans.filter(l => koperasiCustomerIds.has(l.customerId));

        // Update summary cards
        document.getElementById('loan-total-amount').textContent = formatRupiah(loans.reduce((sum, l) => sum + l.amount, 0));
        document.getElementById('loan-active-count').textContent = loans.filter(l => l.status === 'Aktif').length;
        document.getElementById('loan-completed-count').textContent = loans.filter(l => l.status === 'Lunas').length;

        if (loans.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center p-4">Belum ada data pinjaman.</td></tr>';
            return;
        }

        loans.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(loan => {
            const paidInstallments = loan.paymentHistory.length;
            const remainingAmount = (loan.term - paidInstallments) * loan.installment;
            const progress = (paidInstallments / loan.term) * 100;
            const statusClasses = {
                'Aktif': 'bg-blue-100 text-blue-800',
                'Lunas': 'bg-emerald-100 text-emerald-800',
                'Diajukan': 'bg-yellow-100 text-yellow-800',
                'Ditolak': 'bg-rose-100 text-rose-800'
            };
            const statusClass = statusClasses[loan.status] || 'bg-slate-100 text-slate-800';

            const row = `
                <tr data-id="${loan.id}" class="cursor-pointer hover:bg-slate-50">
                    <td data-label="Anggota" class="p-3">
                        <p class="font-medium">${loan.customerName}</p>
                        <p class="text-xs text-slate-500 font-mono">${loan.id}</p>
                    </td>
                    <td data-label="Jumlah Pinjaman" class="p-3 text-right">${formatRupiah(loan.amount)}</td>
                    <td data-label="Angsuran" class="p-3 text-right">${formatRupiah(loan.installment)} /bln</td>
                    <td data-label="Sisa Tagihan" class="p-3 text-right font-semibold">${formatRupiah(remainingAmount)}</td>
                    <td data-label="Progres" class="p-3">
                        <div class="w-full bg-slate-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${progress}%"></div>
                        </div>
                        <p class="text-xs text-center mt-1">${paidInstallments}/${loan.term} bln</p>
                    </td>
                    <td data-label="Status" class="p-3 text-center">
                        <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}">${loan.status}</span>
                    </td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <div class="flex items-center justify-end space-x-2">
                            ${loan.status === 'Aktif' ? `<button class="pay-installment-btn p-2 bg-emerald-100 rounded-md hover:bg-emerald-200" title="Bayar Angsuran"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z" clip-rule="evenodd" /></svg></button>` : ''}
                            ${loan.status === 'Diajukan' ? `<button class="approve-loan-btn p-2 bg-blue-100 rounded-md hover:bg-blue-200" title="Setujui Pinjaman"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></button>` : ''}
                            <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100" title="Hapus"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function renderPurchasesTable() {
        const allPurchases = getFromDB(DB_PURCHASES_KEY);
        const tableBody = document.getElementById('purchases-table')?.querySelector('tbody');
        if (!tableBody) return;
        tableBody.innerHTML = '';

        const searchTerm = document.getElementById('purchase-search')?.value.toLowerCase() || '';
        const startDateVal = document.getElementById('purchase-start-date')?.value;
        const endDateVal = document.getElementById('purchase-end-date')?.value;

        const purchases = allPurchases.filter(p => p.koperasiAsal === window.loggedInKoperasi);

        const filteredPurchases = purchases.filter(p => {
            const matchSearch = searchTerm === '' ||
                p.supplier.toLowerCase().includes(searchTerm) ||
                p.productName.toLowerCase().includes(searchTerm);

            const purchaseDate = new Date(p.date.split('T')[0]); // Normalisasi tanggal untuk perbandingan
            const matchDate = (!startDateVal || purchaseDate >= new Date(startDateVal)) &&
                (!endDateVal || purchaseDate <= new Date(endDateVal));

            return matchSearch && matchDate;
        });

        if (filteredPurchases.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Belum ada riwayat pembelian.</td></tr>';
            return;
        }

        filteredPurchases.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(p => {
            const row = `
                <tr data-id="${p.id}">
                    <td data-label="Tanggal" class="p-3">${new Date(p.date).toLocaleDateString('id-ID')}</td>
                    <td data-label="Pemasok" class="p-3 font-medium">${p.supplier}</td>
                    <td data-label="Produk" class="p-3">${p.productName}</td>
                    <td data-label="Jumlah" class="p-3 text-right">${p.quantity.toLocaleString('id-ID')} ${p.unit}</td>
                    <td data-label="Harga Beli" class="p-3 text-right">${formatRupiah(p.price)}</td>
                    <td data-label="Total" class="p-3 text-right font-semibold">${formatRupiah(p.total)}</td>
                </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }
    function updateSavingsMemberDropdown() {
        const customers = getFromDB(DB_CUSTOMERS_KEY);
        const koperasiCustomers = customers.filter(c => c.koperasiAsal === window.loggedInKoperasi);
        const select = document.getElementById('savings-member-select');
        select.innerHTML = '<option value="">-- Pilih Anggota --</option>';
        koperasiCustomers.forEach(c => {
            select.insertAdjacentHTML('beforeend', `<option value="${c.id}">${c.name}</option>`);
        });
    }

    function renderSavingsTable() {
        const allCustomers = getFromDB(DB_CUSTOMERS_KEY);
        const customers = allCustomers.filter(c => c.koperasiAsal === window.loggedInKoperasi);
        if (!document.getElementById('savings-table')) return;
        const tableBody = document.getElementById('savings-table').querySelector('tbody');
        tableBody.innerHTML = '';
        if (customers.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Belum ada data anggota.</td></tr>';
            return;
        }
        customers.forEach(customer => {
            const totalSimpanan = (customer.savings?.pokok || 0) + (customer.savings?.wajib || 0) + (customer.savings?.sukarela || 0);
            const row = `
                <tr data-id="${customer.id}">
                    <td data-label="Anggota" class="p-3 font-medium">${customer.name}</td>
                    <td data-label="Simpanan Pokok" class="p-3 text-right">${formatRupiah(customer.savings?.pokok || 0)}</td>
                    <td data-label="Simpanan Wajib" class="p-3 text-right">${formatRupiah(customer.savings?.wajib || 0)}</td>
                    <td data-label="Simpanan Sukarela" class="p-3 text-right">${formatRupiah(customer.savings?.sukarela || 0)}</td>
                    <td data-label="Total Simpanan" class="p-3 text-right font-semibold">${formatRupiah(totalSimpanan)}</td>
                    <td data-label="Aksi" class="p-3 actions-cell">
                        <button class="text-blue-600 hover:text-blue-900">Detail</button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // --- FUNGSI BARU UNTUK GRAFIK DASBOR (DIPERBAIKI) ---
    function createSalesChart(canvasId, orders, purchases) {
        // --- PERBAIKAN: Jika data tidak diberikan, ambil dari DB ---
        if (!orders) {
            orders = getFromDB(DB_ORDERS_KEY);
        }
        if (!purchases) {
            purchases = getFromDB(DB_PURCHASES_KEY);
        }
        // --- AKHIR PERBAIKAN ---

        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return;

        if (window.salesChartInstance) window.salesChartInstance.destroy();

        const now = new Date();
        const labels = Array.from({ length: 4 }).map((_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - (3 - i), 1);
            return d.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
        });

        const salesData = labels.map((label, i) => {
            const month = now.getMonth() - (3 - i);
            const year = now.getFullYear();
            return orders
                .filter(o => new Date(o.date).getMonth() === month && new Date(o.date).getFullYear() === year && o.status === 'Selesai')
                .reduce((sum, o) => sum + o.totalPrice, 0);
        });

        const purchaseData = labels.map((label, i) => {
            const month = now.getMonth() - (3 - i);
            const year = now.getFullYear();
            return purchases
                .filter(p => new Date(p.date).getMonth() === month && new Date(p.date).getFullYear() === year)
                .reduce((sum, p) => sum + p.total, 0);
        });

        window.salesChartInstance = new Chart(ctx, {
            type: 'bar',
            data: { labels: labels, datasets: [{ label: 'Total Penjualan', data: salesData, backgroundColor: 'rgba(16, 185, 129, 0.6)', borderColor: 'rgba(16, 185, 129, 1)', borderWidth: 1 }, { label: 'Total Pembelian', data: purchaseData, backgroundColor: 'rgba(59, 130, 246, 0.6)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { callback: value => formatRupiah(value) } } } }
        });
    }

    function renderDashboardMetrics() {
        const allProducts = getFromDB(DB_PRODUCTS_KEY);
        const allOrders = getFromDB(DB_ORDERS_KEY); // Tetap ambil semua untuk disaring
        const allCustomers = getFromDB(DB_CUSTOMERS_KEY);
        const allPurchases = getFromDB(DB_PURCHASES_KEY);
        if (!document.getElementById('dashboard-total-revenue')) return;

        // --- PERBAIKAN: Saring semua data berdasarkan koperasi yang login ---
        const products = allProducts.filter(p => p.koperasiAsal === window.loggedInKoperasi); // Hanya produk koperasi ini
        const productNames = new Set(products.map(p => p.name));
        const orders = allOrders.filter(o => o.items.some(item => productNames.has(item.name)));
        const customerIdsInOrders = new Set(orders.map(o => o.customerId));
        const customers = allCustomers.filter(c => customerIdsInOrders.has(c.id)); // Hanya pelanggan yang pernah bertransaksi dengan koperasi ini
        const purchases = allPurchases.filter(p => p.koperasiAsal === window.loggedInKoperasi); // Hanya pembelian oleh koperasi ini

        // Total Revenue (FIXED)
        const totalRevenue = orders.reduce((sum, order) => {
            if (order.status !== 'Selesai') return sum;
            const revenueFromThisOrder = order.items.reduce((itemSum, item) => {
                if (productNames.has(item.name)) { // Only add price of items belonging to this coop
                    return itemSum + (item.price * item.quantity);
                }
                return itemSum;
            }, 0);
            return sum + revenueFromThisOrder;
        }, 0);
        document.getElementById('dashboard-total-revenue').textContent = formatRupiah(totalRevenue);

        // New Orders
        const newOrders = orders.filter(order => ['Menunggu Verifikasi', 'Menunggu Pembayaran', 'Menunggu Pembayaran Tunai'].includes(order.status)).length; // Logic is correct for a count
        document.getElementById('dashboard-new-orders').textContent = newOrders;

        // Total Products
        document.getElementById('dashboard-total-products').textContent = products.length;

        // Total Customers
        document.getElementById('dashboard-total-customers').textContent = customers.length;

        // === PENAMBAHAN LOGIKA UNTUK KARTU BARU ===

        // KPI: Total Stok Gudang (dalam Ton)
        const totalStockInTon = products.reduce((sum, p) => {
            const unit = p.unit.toLowerCase();
            if (unit === 'kg') return sum + (p.stock / 1000);
            if (unit === 'ton') return sum + p.stock;
            return sum; // Abaikan unit lain untuk total tonase
        }, 0);
        document.getElementById('kpi-total-stok').textContent = `${totalStockInTon.toFixed(2)} Ton`;

        // KPI: Terjual Hari Ini (FIXED)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const salesToday = orders
            .filter(o => new Date(o.date) >= today)
            .reduce((sum, order) => {
                const revenueFromThisOrder = order.items.reduce((itemSum, item) => {
                    if (productNames.has(item.name)) { // Only add price of items belonging to this coop
                        return itemSum + (item.price * item.quantity);
                    }
                    return itemSum;
                }, 0);
                return sum + revenueFromThisOrder;
            }, 0);
        document.getElementById('kpi-terjual-hari-ini').textContent = formatRupiah(salesToday);

        // KPI: Harga Rata-rata Beli
        const calculateAvgPrice = (sourceType) => {
            const relevantPurchases = purchases.filter(p => {
                const supplier = p.supplier.toLowerCase();
                if (sourceType === 'petani') return !supplier.includes('bumdes');
                if (sourceType === 'bumdes') return supplier.includes('bumdes');
                return false;
            });
            if (relevantPurchases.length === 0) return 0;
            const totalValue = relevantPurchases.reduce((sum, p) => sum + p.total, 0);
            const totalWeightKg = relevantPurchases.reduce((sum, p) => sum + (p.unit.toLowerCase() === 'ton' ? p.quantity * 1000 : p.quantity), 0);
            return totalWeightKg > 0 ? totalValue / totalWeightKg : 0;
        };
        document.getElementById('kpi-harga-petani').textContent = formatRupiah(calculateAvgPrice('petani'));
        document.getElementById('kpi-harga-bumdes').textContent = formatRupiah(calculateAvgPrice('bumdes'));

        // --- PERBAIKAN: Panggil fungsi grafik dengan data yang sudah disaring ---
        createSalesChart('salesChart', orders, purchases); // Panggil dengan data yang sudah difilter
        renderProductPieChart(products); // Panggil dengan data yang sudah difilter

        // Category Summary Cards
        const categoryGrid = document.getElementById('dashboard-category-summary-grid'); // Pastikan elemen ini ada
        categoryGrid.innerHTML = '';
        const categories = getFromDB(DB_CATEGORIES_KEY);
        if (categoryGrid && categories.length > 0) {
            categories.forEach(category => {
                const productsInCategory = products.filter(p => p.category === category);
                const productCount = productsInCategory.length;
                const totalStockValue = productsInCategory.reduce((sum, p) => sum + (p.stock * p.price), 0);
                const hasLowStock = productsInCategory.some(p => p.stock > 0 && p.stock < p.threshold);

                let statusIndicator = '';
                if (hasLowStock) {
                    statusIndicator = `
                        <div class="absolute top-2 right-2 p-1.5 bg-yellow-100 rounded-full" title="Beberapa stok menipis">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </div>`;
                }

                const cardHTML = `
                    <div class="border border-slate-200 bg-slate-50 rounded-lg p-4 relative transition hover:shadow-md hover:border-blue-300">
                        ${statusIndicator}
                        <h4 class="font-bold text-slate-800 text-lg truncate">${category}</h4>
                        <p class="text-sm text-slate-500">${productCount} Jenis Produk</p>
                        <div class="mt-4 pt-4 border-t">
                            <p class="text-xs text-slate-500">Total Nilai Stok</p>
                            <p class="text-xl font-semibold text-slate-700">${formatRupiah(totalStockValue)}</p>
                        </div>
                    </div>
                `;
                categoryGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

    }

    function renderProductPieChart(productsForChart) { // PERBAIKAN: Terima data sebagai argumen
        const ctx = document.getElementById('productPieChart')?.getContext('2d');
        if (!ctx) return;
        if (window.productPieChartInstance) window.productPieChartInstance.destroy();

        const categoryData = productsForChart.reduce((acc, p) => {
            const category = p.category || 'Lainnya';
            const stockValue = p.stock * p.price;
            acc[category] = (acc[category] || 0) + stockValue;
            return acc;
        }, {});

        const labels = Object.keys(categoryData);
        const dataValues = Object.values(categoryData);

        window.productPieChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Nilai Stok',
                    data: dataValues,
                    backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(139, 92, 246, 0.7)', 'rgba(20, 184, 166, 0.7)', 'rgba(217, 70, 239, 0.7)'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { padding: 15 } }, tooltip: { callbacks: { label: (context) => `${context.label}: ${formatRupiah(context.raw)}` } } } }
        });
    }

    function populateCategoryFilter() {
        const categories = getFromDB(DB_CATEGORIES_KEY);
        const categoryFilter = document.getElementById('category-filter');
        const productCategory = document.getElementById('product-category');

        categoryFilter.innerHTML = '<option value="">Semua Kategori</option>';
        productCategory.innerHTML = '';

        categories.forEach(cat => {
            categoryFilter.insertAdjacentHTML('beforeend', `<option value="${cat}">${cat}</option>`);
            productCategory.insertAdjacentHTML('beforeend', `<option value="${cat}">${cat}</option>`);
        });
    }

    function renderProductsTable() {
        const products = getFromDB(DB_PRODUCTS_KEY);
        if (!document.getElementById('products-table')) return;
        const tableBody = document.getElementById('products-table').querySelector('tbody');
        tableBody.innerHTML = '';

        const searchTerm = document.getElementById('product-search').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;

        // 1. Ambil semua produk milik koperasi yang sedang login
        const myKoperasiProducts = products.filter(p => p.koperasiAsal === window.loggedInKoperasi);

        // 2. Terapkan filter pencarian dan kategori pada produk milik koperasi
        const filteredProducts = myKoperasiProducts.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });

        // 3. Tentukan pesan yang akan ditampilkan jika tabel kosong
        if (filteredProducts.length === 0) {
            // Jika ada filter aktif tapi hasilnya 0, tampilkan pesan "tidak ditemukan"
            if (searchTerm || categoryFilter) {
                tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Produk tidak ditemukan untuk filter ini.</td></tr>';
            } else {
                // Jika tidak ada filter dan produk memang 0, tampilkan pesan untuk menambah produk
                tableBody.innerHTML = '<tr><td colspan="6" class="text-center p-4">Belum ada produk. Silakan klik "Tambah Produk" untuk memulai.</td></tr>';
            }
            return;
        }

        filteredProducts.forEach(product => {
            let stockStatus;
            if (product.stock <= 0) {
                stockStatus = '<span class="bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Habis</span>';
            } else if (product.stock < product.threshold) {
                stockStatus = '<span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Menipis</span>';
            } else {
                stockStatus = '<span class="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Aman</span>';
            }

            const row = `
                <tr data-id="${product.id}">
                    <td data-label="Produk" class="p-3">
                        <div class="flex items-center">
                            <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-md mr-3 object-cover">
                            <div>
                                <p class="font-medium">${product.name}</p>
                                <p class="text-sm text-slate-500">${(product.description || '').substring(0, 30)}...</p>
                            </div>
                        </div>
                    </td>
                    <td data-label="Kategori" class="p-3">${product.category}</td>
                    <td data-label="Harga" class="p-3">${formatRupiah(product.price)}</td>
                    <td data-label="Stok" class="p-3">${product.stock} ${product.unit}</td>
                    <td data-label="Status" class="p-3">${stockStatus}</td>
                    <td data-label="Aksi" class="p-3 actions-cell space-x-2">
                        <button class="edit-product-btn p-2 bg-slate-100 rounded-md hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg></button>
                        <button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    function createProductRow(product) {
        let stockStatus = '<span class="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Aman</span>';
        if (product.stock <= 0) stockStatus = '<span class="bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Habis</span>';
        else if (product.stock < product.threshold) stockStatus = '<span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Menipis</span>';
        return `<tr data-id="${product.id}"><td data-label="Produk" class="p-3"><div class="flex items-center"><img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-md mr-3 object-cover"><div><p class="font-medium">${product.name}</p><p class="text-sm text-slate-500">${(product.description || '').substring(0, 30)}...</p></div></div></td><td data-label="Kategori" class="p-3">${product.category}</td><td data-label="Harga" class="p-3">${formatRupiah(product.price)}</td><td data-label="Stok" class="p-3">${product.stock} ${product.unit}</td><td data-label="Status" class="p-3">${stockStatus}</td><td data-label="Aksi" class="p-3 actions-cell space-x-2"><button class="edit-product-btn p-2 bg-slate-100 rounded-md hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg></button><button class="delete-item-btn p-2 bg-slate-100 rounded-md hover:bg-rose-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button></td></tr>`;
    }

    function updateSidebarBadges() {
        // --- PERBAIKAN LOGIKA: Ambil dan saring data yang relevan di sini ---
        const allOrders = getFromDB(DB_ORDERS_KEY);
        const allProducts = getFromDB(DB_PRODUCTS_KEY);
        const koperasiProductNames = new Set(allProducts.filter(p => p.koperasiAsal === window.loggedInKoperasi).map(p => p.name));
        const koperasiOrders = allOrders.filter(o => o.items.some(item => koperasiProductNames.has(item.name)));
        // --- AKHIR PERBAIKAN ---

        // Badge untuk Pesanan Baru
        const newOrders = koperasiOrders.filter(o => ['Menunggu Verifikasi', 'Menunggu Pembayaran', 'Menunggu Pembayaran Tunai'].includes(o.status)).length;
        const badgePesanan = document.getElementById('badge-pesanan');
        if (newOrders > 0) {
            badgePesanan.textContent = newOrders;
            badgePesanan.classList.remove('hidden');
        } else {
            badgePesanan.classList.add('hidden');
        }

        // Badge untuk Ulasan (juga difilter berdasarkan pesanan koperasi ini)
        // Variabel koperasiOrders sekarang sudah didefinisikan dengan benar
        const pendingReviews = koperasiOrders.filter(o => o.status === 'Selesai' && o.rating === 0).length;
        const badgeUlasan = document.getElementById('badge-ulasan');
        if (pendingReviews > 0) {
            badgeUlasan.textContent = pendingReviews;
            badgeUlasan.classList.remove('hidden');
        } else {
            badgeUlasan.classList.add('hidden');
        }

        // Badge untuk Penawaran Petani
        const newOffers = getFromDB(DB_FARMER_OFFERS_KEY).filter(o => o.status === 'Tersedia').length;
        const badgePenawaran = document.getElementById('badge-penawaran');
        if (newOffers > 0) { badgePenawaran.textContent = newOffers; badgePenawaran.classList.remove('hidden'); } else { badgePenawaran.classList.add('hidden'); }

        // Badge untuk Pesan Permintaan (Baru)
        const newRequests = getFromDB(DB_REQUESTS_KEY).filter(r => r.status === 'Baru').length;
        const badgePermintaan = document.getElementById('badge-permintaan');
        if (newRequests > 0) {
            badgePermintaan.textContent = newRequests;
            badgePermintaan.classList.remove('hidden');
        } else {
            badgePermintaan.classList.add('hidden');
        }
    }

    // --- CRUD & MODAL FUNCTIONS ---

    function openProductModal(productId = null) {
        const modal = document.getElementById('product-modal');
        const form = document.getElementById('product-form');
        // PERBAIKAN (v2): Reset form dan semua yang terkait gambar secara eksplisit
        form.reset();
        document.getElementById('product-id').value = '';
        document.getElementById('product-image-preview').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    `;
        document.getElementById('product-image-base64').value = '';

        if (productId) {
            // Panggil populateCategoryFilter() untuk memastikan dropdown kategori sinkron
            populateCategoryFilter();

            const products = getFromDB(DB_PRODUCTS_KEY);
            const product = products.find(p => p.id === productId);
            if (product) {
                document.getElementById('product-modal-title').textContent = 'Edit Produk';
                document.getElementById('product-id').value = product.id;
                document.getElementById('product-name').value = product.name;
                if (product.image) {
                    document.getElementById('product-image-preview').innerHTML = `<img src="${product.image}" class="w-full h-full object-cover rounded-lg">`;
                    document.getElementById('product-image-base64').value = product.image;
                }
                document.getElementById('product-category').value = product.category;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-stock').value = product.stock;
                document.getElementById('product-unit').value = product.unit;
                document.getElementById('product-threshold').value = product.threshold;
                document.getElementById('product-description').value = product.description || '';
            }
        } else {
            // Panggil juga saat menambah produk baru
            populateCategoryFilter();
            document.getElementById('product-modal-title').textContent = 'Tambah Produk Baru';
        }
        openModal(modal);
    }

    function saveProduct() {
        // Loading state for save button
        let products = getFromDB(DB_PRODUCTS_KEY);
        const saveBtn = document.getElementById('save-product-btn');
        const productId = parseInt(document.getElementById('product-id').value);
        const productData = {
            name: document.getElementById('product-name').value,
            image: document.getElementById('product-image-base64').value || 'https://placehold.co/40x40/d1d5db/1f2937?text=N/A', // PERBAIKAN (v2): Logika pengambilan gambar sudah benar
            category: document.getElementById('product-category').value,
            price: parseInt(document.getElementById('product-price').value),
            stock: parseInt(document.getElementById('product-stock').value) || 0, // PERBAIKAN: Default ke 0 jika kosong
            unit: document.getElementById('product-unit').value,
            threshold: parseInt(document.getElementById('product-threshold').value),
            description: document.getElementById('product-description').value,
            lastUpdate: new Date().toISOString(), // Waktu data diperbarui
            koperasiAsal: window.loggedInKoperasi // Secara otomatis menetapkan produk ke koperasi yang sedang login
        };

        // Validasi sederhana
        if (!productData.name || !productData.price || !productData.stock) {
            showAlert('Nama, harga, dan stok produk tidak boleh kosong.', 'error');
            saveBtn.disabled = false; // Aktifkan kembali tombol jika gagal
            return;
        }

        if (productId) { // Edit
            const index = products.findIndex(p => p.id === productId);
            if (index > -1) {
                products[index] = { ...products[index], ...productData };
                showAlert('Produk berhasil diperbarui.');
            }
        } else { // Add new product
            productData.id = Date.now(); // Pastikan ID baru ditambahkan ke objek
            products.push(productData);
            showAlert('Produk baru berhasil ditambahkan.');
        }
        saveToDB(DB_PRODUCTS_KEY, products);
        renderProductsTable();
        // Langsung tutup modal tanpa jeda
        closeModal(document.getElementById('product-modal'));
    }

    function openCustomerModal(customerId = null) {
        const modal = document.getElementById('customer-modal');
        const form = document.getElementById('customer-form');
        form.reset();
        document.getElementById('customer-id').value = '';
        document.getElementById('customer-password-section').style.display = 'block';
        document.getElementById('customer-management-section').style.display = 'none';
        document.getElementById('customer-email').readOnly = false;

        if (customerId) {
            const customers = getFromDB(DB_CUSTOMERS_KEY);
            const customer = customers.find(c => c.id === customerId);
            if (customer) {
                document.getElementById('customer-modal-title').textContent = 'Edit Anggota';
                document.getElementById('customer-id').value = customer.id;
                document.getElementById('customer-name').value = customer.name;
                document.getElementById('customer-email').value = customer.email;
                document.getElementById('customer-email').readOnly = true;
                document.getElementById('customer-phone').value = customer.phone;
                document.getElementById('customer-role').value = customer.role || 'umum'; // Set role
                document.getElementById('customer-password-section').style.display = 'none';
                document.getElementById('customer-management-section').style.display = 'block';
            }
        } else {
            document.getElementById('customer-modal-title').textContent = 'Tambah Anggota Baru';
        }
        openModal(modal);
    }

    function saveCustomer() {
        let customers = getFromDB(DB_CUSTOMERS_KEY);
        const customerId = parseInt(document.getElementById('customer-id').value);
        const email = document.getElementById('customer-email').value;
        const role = document.getElementById('customer-role').value; // Get role

        if (customerId) { // Edit
            const index = customers.findIndex(c => c.id === customerId);
            if (index > -1) {
                customers[index].name = document.getElementById('customer-name').value;
                customers[index].phone = document.getElementById('customer-phone').value;
                customers[index].role = role; // Save role
                showAlert('Data anggota berhasil diperbarui.');
            }
        } else { // Add
            if (customers.some(c => c.email === email)) {
                showAlert('Email sudah terdaftar.', 'error');
                return;
            }
            const password = document.getElementById('customer-password').value;
            const confirmPassword = document.getElementById('customer-confirm-password').value;
            const passwordErrorMsg = document.getElementById('password-error-msg');
            passwordErrorMsg.classList.add('hidden');

            if (password.length < 6 || password !== confirmPassword) {
                passwordErrorMsg.textContent = password.length < 6 ? 'Password minimal 6 karakter.' : 'Konfirmasi password tidak cocok.';
                passwordErrorMsg.classList.remove('hidden');
                return;
            }
            const newCustomer = {
                id: Date.now(),
                name: document.getElementById('customer-name').value,
                email: email,
                phone: document.getElementById('customer-phone').value,
                role: role, // Save role
                joinDate: new Date().toISOString().split('T')[0],
                status: 'Aktif',
                savings: { pokok: 0, wajib: 0, sukarela: 0 },
                password: password,
                koperasiAsal: window.loggedInKoperasi
            };
            customers.push(newCustomer);
            showAlert('Anggota baru berhasil ditambahkan.');
        }
        saveToDB(DB_CUSTOMERS_KEY, customers);
        renderCustomersTable();
        closeModal(document.getElementById('customer-modal'));
    }
    function openCategoryModal(categoryName = null) {
        const modal = document.getElementById('category-modal');
        const form = modal.querySelector('form');
        form.reset();
        document.getElementById('original-category-name').value = '';

        if (categoryName) {
            // Logika edit dinonaktifkan karena kategori statis
            showAlert('Manajemen kategori dinonaktifkan.', 'error');
            return;
        }
        openModal(modal);
    }

    function saveCategory() {
        const saveBtn = document.getElementById('save-category-btn');
        saveBtn.disabled = true; // Nonaktifkan tombol saat proses dimulai

        const categoryName = document.getElementById('category-name-input').value.trim();
        if (!categoryName) {
            showAlert('Nama kategori tidak boleh kosong.', 'error');
            saveBtn.disabled = false; // Aktifkan kembali jika validasi gagal
            return;
        }
        let categories = getFromDB(DB_CATEGORIES_KEY);
        if (categories.map(c => c.toLowerCase()).includes(categoryName.toLowerCase())) {
            showAlert('Kategori dengan nama tersebut sudah ada.', 'error');
            saveBtn.disabled = false; // Aktifkan kembali jika validasi gagal
            return;
        }
        categories.push(categoryName);
        saveToDB(DB_CATEGORIES_KEY, categories);
        showAlert('Kategori baru berhasil ditambahkan.');
        renderCategoriesTable();
        populateCategoryFilter(); // Perbarui juga dropdown di tempat lain

        // Tombol tidak perlu diaktifkan lagi karena modal akan ditutup
        // Langsung tutup modal
        closeModal(document.getElementById('category-modal'));
    }

    function openDeleteModal(message) {
        document.getElementById('delete-confirm-text').textContent = message;
        openModal(document.getElementById('delete-confirm-modal'));
    }

    function confirmDelete() {
        if (!itemToDelete || !itemToDelete.type || !itemToDelete.id) return;

        if (itemToDelete.type === 'review') {
            let orders = getFromDB(DB_ORDERS_KEY);
            const index = orders.findIndex(o => o.id === itemToDelete.id);
            if (index > -1) {
                orders[index].rating = 0;
                orders[index].comment = '';
            }
            saveToDB(DB_ORDERS_KEY, orders);
        } else {
            const dbKeyMap = { 'product': DB_PRODUCTS_KEY, 'customer': DB_CUSTOMERS_KEY, 'category': DB_CATEGORIES_KEY, 'banner': DB_BANNERS_KEY, 'voucher': DB_VOUCHERS_KEY, 'stockNeed': DB_STOCK_NEEDS_KEY, 'farmerOffer': DB_FARMER_OFFERS_KEY, 'loan': DB_LOANS_KEY };
            const dbKey = dbKeyMap[itemToDelete.type];
            if (!dbKey) return;
            let data = getFromDB(dbKey);
            let filteredData = data.filter(item => (item.id || item) !== itemToDelete.id);
            saveToDB(dbKey, filteredData);
        }

        showAlert(`${itemToDelete.type.charAt(0).toUpperCase() + itemToDelete.type.slice(1)} "${itemToDelete.name}" berhasil dihapus.`);

        const renderFunction = {
            'product': renderProductsTable,
            'customer': renderCustomersTable,
            'category': () => { renderCategoriesTable(); populateCategoryFilter(); },
            'banner': renderBannerTable,
            'voucher': renderVouchersTable,
            'stockNeed': renderStockNeedsTable,
            'farmerOffer': renderFarmerOffersTable,
            'loan': renderLoansTable,
            'review': renderReviewsTable,
        }[itemToDelete.type];
        renderFunction?.();

        closeModal(document.getElementById('delete-confirm-modal'));
        itemToDelete = { element: null, type: null, id: null };
    }

    function openOrderDetailModal(orderId, orderType = 'regular') {
        let order;
        const isPerumda = orderType === 'perumda';

        if (isPerumda) {
            const perumdaOrders = getFromDB(DB_PERUMDA_ORDERS_KEY);
            order = perumdaOrders.find(o => o.id === orderId);
        } else {
            const regularOrders = getFromDB(DB_ORDERS_KEY);
            order = regularOrders.find(o => o.id === orderId);
        }

        if (!order) return;

        const modal = document.getElementById('order-detail-modal');
        const title = isPerumda ? `Detail Pesanan Perumda #${order.id}` : `Detail Pesanan #${order.id}`;
        const customerInfo = isPerumda
            ? `<p><strong>Nama Perusahaan:</strong> ${order.customer}</p>`
            : `<p><strong>Nama:</strong> ${order.customerName}</p><p><strong>Alamat:</strong> ${order.deliveryAddress}</p>`;
        const summaryInfo = `<p><strong>Tanggal:</strong> ${new Date(order.date).toLocaleString('id-ID')}</p>${!isPerumda ? `<p><strong>Metode Bayar:</strong> ${order.paymentMethod}</p>` : ''}<p><strong>Total:</strong> <span class="font-bold">${formatRupiah(isPerumda ? order.total : order.totalPrice)}</span></p>`;

        modal.querySelector('#order-detail-title').textContent = title;
        modal.querySelector('#order-detail-customer-info').innerHTML = customerInfo;
        modal.querySelector('#order-detail-summary-info').innerHTML = summaryInfo;

        const itemsTable = document.getElementById('order-detail-items-table');
        itemsTable.innerHTML = '';
        order.items.forEach(item => {
            const price = item.price || 0;
            const quantity = item.quantity || 0;
            itemsTable.innerHTML += `<tr><td class="p-3">${item.name}</td><td class="p-3 text-center">${quantity} ${item.unit}</td><td class="p-3 text-right">${formatRupiah(price)}</td><td class="p-3 text-right">${formatRupiah(price * quantity)}</td></tr>`;
        });

        const ratingDisplay = document.getElementById('rating-display');
        if (!isPerumda && order.rating > 0) {
            document.getElementById('rating-stars').textContent = '⭐'.repeat(order.rating) + '☆'.repeat(5 - order.rating);
            document.getElementById('rating-comment').textContent = order.comment || '-';
            ratingDisplay.classList.remove('hidden');
        } else {
            ratingDisplay.classList.add('hidden');
        }

        const statusSelect = document.getElementById('update-status');
        if (isPerumda) {
            statusSelect.innerHTML = `<option>Menunggu Verifikasi</option><option>Diproses</option><option>Selesai</option>`;
            // Sembunyikan tombol simpan biasa, karena alur Perumda mungkin berbeda
            document.getElementById('save-order-status-btn').classList.add('hidden');
        } else {
            statusSelect.innerHTML = `<option>Menunggu Pembayaran</option><option>Menunggu Verifikasi</option><option>Menunggu Pembayaran Tunai</option><option>Diproses</option><option>Dikirim</option><option>Selesai</option><option>Dibatalkan</option>`;
        }
        statusSelect.value = order.status;

        // --- LOGIKA BARU: Tampilkan tombol yang sesuai ---
        const saveButton = document.getElementById('save-order-status-btn');
        saveButton.classList.remove('hidden'); // Tampilkan tombol secara default
        if (order.status === 'Menunggu Verifikasi') {
            saveButton.textContent = 'Verifikasi Pembayaran';
            saveButton.onclick = () => verifyPayment(order.id); // PERBAIKAN: Bungkus dalam arrow function
        } else {
            saveButton.textContent = 'Simpan Perubahan';
            saveButton.onclick = () => saveOrderStatus(order.id, orderType); // PERBAIKAN: Bungkus dalam arrow function
        }

        openModal(modal);
    }

    function saveOrderStatus(orderId, orderType = 'regular') {
        const isPerumda = orderType === 'perumda';
        const dbKey = isPerumda ? DB_PERUMDA_ORDERS_KEY : DB_ORDERS_KEY;
        const renderFunc = isPerumda ? renderPerumdaOrdersTable : renderOrdersTable;

        let orders = getFromDB(dbKey);
        const index = orders.findIndex(o => o.id === orderId);

        if (index > -1) {
            orders[index].status = document.getElementById('update-status').value;
            saveToDB(dbKey, orders);
            showAlert(`Status pesanan ${isPerumda ? 'Perumda ' : ''}#${orderId} berhasil diperbarui.`);
            renderFunc();
            closeModal(document.getElementById('order-detail-modal'));
        }
    }

    function verifyPayment(orderId) {
        let orders = getFromDB(DB_ORDERS_KEY);
        const index = orders.findIndex(o => o.id === orderId);

        if (index > -1) {
            orders[index].status = 'Diproses'; // Ubah status menjadi "Diproses"
            saveToDB(DB_ORDERS_KEY, orders);
            showAlert(`Pembayaran untuk pesanan #${orderId} berhasil diverifikasi.`);
            renderOrdersTable();
            updateSidebarBadges();
            closeModal(document.getElementById('order-detail-modal'));
        }
    }

    function saveVoucher() {
        const code = document.getElementById('voucher-code-input').value.trim().toUpperCase();
        const type = document.getElementById('voucher-type').value;
        const value = parseInt(document.getElementById('voucher-value').value);

        if (!code || !value) {
            showAlert('Kode dan nilai voucher tidak boleh kosong.', 'error');
            return;
        }

        let vouchers = getFromDB(DB_VOUCHERS_KEY);
        const newVoucher = {
            id: 'v' + Date.now(),
            code: code,
            type: type,
            value: value
        };

        vouchers.push(newVoucher);
        saveToDB(DB_VOUCHERS_KEY, vouchers);
        showAlert('Voucher baru berhasil ditambahkan.');
        renderVouchersTable();
        closeModal(document.getElementById('add-voucher-modal'));
    }

    function handleBannerUpload(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        let banners = getFromDB(DB_BANNERS_KEY);

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newBanner = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    image: e.target.result
                };
                banners.push(newBanner);
                saveToDB(DB_BANNERS_KEY, banners);
                renderBannerTable();
            };
            reader.readAsDataURL(file);
        });
        showAlert(`${files.length} banner berhasil diunggah.`);
    }

    function processSavingsTransaction() {
        const memberId = parseInt(document.getElementById('savings-member-select').value);
        const action = document.querySelector('input[name="savings-action"]:checked').value;
        const type = document.getElementById('savings-type').value;
        const amount = parseInt(document.getElementById('savings-amount').value);

        if (!memberId || !amount || amount <= 0) {
            showAlert('Harap lengkapi semua data dengan benar.', 'error');
            return;
        }

        let customers = getFromDB(DB_CUSTOMERS_KEY);
        const customerIndex = customers.findIndex(c => c.id === memberId);

        if (customerIndex > -1) {
            const customer = customers[customerIndex];
            if (action === 'deposit') {
                customer.savings[type] += amount;
                showAlert(`Setoran ${formatRupiah(amount)} untuk ${customer.name} berhasil.`);
            } else { // withdraw
                if (customer.savings[type] >= amount) {
                    customer.savings[type] -= amount;
                    showAlert(`Penarikan ${formatRupiah(amount)} untuk ${customer.name} berhasil.`);
                } else {
                    showAlert(`Saldo simpanan ${type} tidak mencukupi.`, 'error');
                    return;
                }
            }
            saveToDB(DB_CUSTOMERS_KEY, customers);
            renderSavingsTable();
            closeModal(document.getElementById('savings-transaction-modal'));
        } else {
            showAlert('Anggota tidak ditemukan.', 'error');
        }
    }

    function openLoanModal(loanId = null) {
        const modal = document.getElementById('loan-modal');
        const form = document.getElementById('loan-form');
        form.reset();
        document.getElementById('loan-id').value = '';

        // Populate member dropdown
        const memberSelect = document.getElementById('loan-member-select');
        memberSelect.innerHTML = '<option value="">-- Pilih Anggota --</option>';
        getFromDB(DB_CUSTOMERS_KEY).forEach(c => {
            memberSelect.insertAdjacentHTML('beforeend', `<option value="${c.id}">${c.name}</option>`);
        });

        // For now, we only support adding new loans, not editing.
        document.getElementById('loan-modal-title').textContent = 'Pengajuan Pinjaman Baru';
        openModal(modal);
    }

    function saveLoan() {
        let loans = getFromDB(DB_LOANS_KEY);
        const customers = getFromDB(DB_CUSTOMERS_KEY);
        const customerId = parseInt(document.getElementById('loan-member-select').value);
        const customer = customers.find(c => c.id === customerId);

        const amount = parseInt(document.getElementById('loan-amount').value);
        const term = parseInt(document.getElementById('loan-term').value);
        const interestRate = parseFloat(document.getElementById('loan-interest').value);

        if (!customer || !amount || !term || !interestRate) {
            showAlert('Harap lengkapi semua data dengan benar.', 'error');
            return;
        }

        const totalInterest = amount * (interestRate / 100) * term;
        const totalPayment = amount + totalInterest;
        const installment = Math.ceil(totalPayment / term);

        const newLoan = {
            id: 'LN-' + Date.now(),
            customerId: customer.id,
            customerName: customer.name,
            amount: amount,
            interestRate: interestRate,
            term: term,
            installment: installment,
            status: 'Diajukan',
            date: new Date().toISOString().split('T')[0],
            paymentHistory: [] // FIX: Initialize paymentHistory array
        };

        loans.push(newLoan);
        saveToDB(DB_LOANS_KEY, loans);
        showAlert(`Pengajuan pinjaman untuk ${customer.name} berhasil dibuat.`);
        renderLoansTable();
        closeModal(document.getElementById('loan-modal'));
    }

    function handleLoanTableActions(e) {
        const approveBtn = e.target.closest('.approve-loan-btn');
        const payBtn = e.target.closest('.pay-installment-btn');
        const deleteBtn = e.target.closest('.delete-item-btn');
        const isActionClick = approveBtn || payBtn || deleteBtn;
        const row = e.target.closest('tr');
        if (!row) return;
        const loanId = row.dataset.id;
        let loans = getFromDB(DB_LOANS_KEY);
        const loanIndex = loans.findIndex(l => l.id === loanId);
        if (loanIndex === -1) return;

        if (approveBtn) {
            loans[loanIndex].status = 'Aktif';
            showAlert(`Pinjaman #${loanId} telah disetujui.`);
        } else if (payBtn) {
            loans[loanIndex].paymentHistory.push({
                date: new Date().toISOString().split('T')[0],
                amount: loans[loanIndex].installment
            });
            const paidCount = loans[loanIndex].paymentHistory.length;
            if (paidCount >= loans[loanIndex].term) {
                loans[loanIndex].status = 'Lunas';
                showAlert(`Pinjaman #${loanId} telah lunas.`);
            } else {
                showAlert(`Angsuran ke-${paidCount} untuk pinjaman #${loanId} berhasil dibayar.`);
            }
        } else if (deleteBtn) {
            const loan = loans[loanIndex];
            itemToDelete = { type: 'loan', id: loanId, name: `pinjaman ${loan.customerName}` };
            openDeleteModal(`Anda yakin ingin menghapus ${itemToDelete.name}?`);
            return; // Prevent saving DB immediately
        }
        // If it's not an action button click, open the detail modal
        else if (!isActionClick) {
            openLoanDetailModal(loanId);
            return; // Prevent re-rendering table unnecessarily
        }

        saveToDB(DB_LOANS_KEY, loans);
        renderLoansTable();
    }

    function openLoanDetailModal(loanId) {
        const loans = getFromDB(DB_LOANS_KEY);
        const loan = loans.find(l => l.id === loanId);
        if (!loan) return;

        document.getElementById('loan-detail-title').textContent = `Detail Pinjaman #${loan.id}`;
        const contentDiv = document.getElementById('loan-detail-content');

        const paidInstallments = loan.paymentHistory.length;
        const remainingAmount = (loan.term - paidInstallments) * loan.installment;

        let historyRows = '';
        if (loan.paymentHistory.length > 0) {
            loan.paymentHistory.forEach((p, index) => {
                historyRows += `<tr><td class="p-3">${index + 1}</td><td class="p-3">${new Date(p.date).toLocaleDateString('id-ID')}</td><td class="p-3 text-right">${formatRupiah(p.amount)}</td></tr>`;
            });
        } else {
            historyRows = '<tr><td colspan="3" class="p-3 text-center text-slate-500">Belum ada riwayat pembayaran.</td></tr>';
        }

        contentDiv.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><h4 class="font-semibold mb-2">Informasi Peminjam</h4><div class="text-sm space-y-1"><p><strong>Nama:</strong> ${loan.customerName}</p><p><strong>ID Anggota:</strong> ${loan.customerId}</p></div></div>
            <div><h4 class="font-semibold mb-2">Ringkasan Pinjaman</h4><div class="text-sm space-y-1"><p><strong>Tanggal Pengajuan:</strong> ${new Date(loan.date).toLocaleDateString('id-ID')}</p><p><strong>Jumlah Pokok:</strong> ${formatRupiah(loan.amount)}</p><p><strong>Tenor:</strong> ${loan.term} bulan</p><p><strong>Bunga:</strong> ${loan.interestRate}% / bulan</p></div></div>
        </div>
        <div><h4 class="font-semibold mb-2">Status Pembayaran</h4><div class="text-sm space-y-1"><p><strong>Angsuran per Bulan:</strong> ${formatRupiah(loan.installment)}</p><p><strong>Angsuran Terbayar:</strong> ${paidInstallments} dari ${loan.term}</p><p><strong>Sisa Tagihan:</strong> <span class="font-bold text-rose-600">${formatRupiah(remainingAmount)}</span></p></div></div>
        <div><h4 class="font-semibold mb-2">Riwayat Pembayaran Angsuran</h4>
            <div class="overflow-x-auto border rounded-lg max-h-60">
                <table class="w-full text-left text-sm"><thead class="bg-slate-50 sticky top-0"><tr><th class="p-3">Angsuran Ke-</th><th class="p-3">Tanggal Bayar</th><th class="p-3 text-right">Jumlah</th></tr></thead><tbody class="divide-y">${historyRows}</tbody></table>
            </div>
        </div>
    `;

        openModal(document.getElementById('loan-detail-modal'));
    }

    function savePurchase() {
        const saveBtn = document.getElementById('save-purchase-btn');
        saveBtn.disabled = true;
        saveBtn.querySelector('.btn-text').classList.add('hidden');
        saveBtn.querySelector('.btn-spinner').classList.remove('hidden');

        const newPurchase = {
            id: 'PUR-' + Date.now(),
            date: document.getElementById('purchase-date').value,
            supplier: document.getElementById('purchase-supplier').value,
            productName: document.getElementById('purchase-product-name').value,
            quantity: parseFloat(document.getElementById('purchase-quantity').value),
            unit: document.getElementById('purchase-unit').value,
            price: parseFloat(document.getElementById('purchase-price').value), // Harga beli per unit
            koperasiAsal: window.loggedInKoperasi // <-- PERBAIKAN: Ambil dari sesi login global
        };
        newPurchase.total = newPurchase.quantity * newPurchase.price;

        let purchases = getFromDB(DB_PURCHASES_KEY);
        purchases.push(newPurchase);
        saveToDB(DB_PURCHASES_KEY, purchases);

        showAlert('Data pembelian berhasil dicatat.');
        renderPurchasesTable();
        saveBtn.disabled = false;
        saveBtn.querySelector('.btn-text').classList.remove('hidden');
        saveBtn.querySelector('.btn-spinner').classList.add('hidden');
        closeModal(document.getElementById('purchase-modal'));
    }

    // --- INITIALIZATION ---
    initializeDatabase();
    populateCategoryFilter();

    // --- DYNAMIC UI UPDATE ---
    document.getElementById('sidebar-koperasi-name').textContent = window.loggedInKoperasi;
    document.getElementById('sidebar-admin-name').textContent = `oleh ${window.loggedInAdminName}`;
    const adminInitial = window.loggedInAdminName.charAt(0).toUpperCase();
    document.getElementById('profile-avatar').src = `https://placehold.co/40x40/E2E8F0/475569?text=${adminInitial}`;
    document.getElementById('profile-avatar').alt = loggedInAdminName;

    // Panggil update badge setelah inisialisasi dan tampilkan halaman awal
    showPage(window.location.hash.substring(1) || 'page-dasbor');
});
