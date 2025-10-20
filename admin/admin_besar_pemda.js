// --- SUPABASE CLIENT SETUP ---
const SUPABASE_URL = 'https://fgfmceegyjmlncstjqpm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZm1jZWVneWptbG5jc3RqcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MzAxNzQsImV4cCI6MjA3NjUwNjE3NH0.ok4DMG7uM2EaBtCDqoKAg1OfBKtqK7lthqINczWa698';
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Cek sesi login Supabase dan verifikasi peran
const checkAdminSession = async () => {
    const { data: { session }, error: sessionError } = await _supabase.auth.getSession();
    if (sessionError || !session) {
        window.location.replace('pemda_login.html');
        return;
    }

    const { data: profile, error: profileError } = await _supabase
        .from('profiles')
        .select('role, name')
        .eq('user_id', session.user.id)
        .single();

    if (profileError || !profile || (profile.role !== 'Admin Pemda' && profile.role !== 'Super Admin')) {
        await _supabase.auth.signOut();
        window.location.replace('pemda_login.html');
    } else {
        const headerAdminName = document.getElementById('header-admin-name');
        if (headerAdminName) headerAdminName.textContent = profile.name;
    }
};
checkAdminSession();

// --- DATA LOKASI (STATIS) ---
const locationData = {
    "PARIGI MOUTONG": {
        "Ampibabo": ["Ampibabo", "Ampibabo Timur", "Ampibabo Utara", "Buranga", "Lemo", "Lemo Tengah", "Lemo Utara", "Paranggi", "Tanampedagi", "Toga", "Tolai", "Tolai Barat", "Tolai Timur", "Tolai Utara"],
        // ... (data lokasi lainnya tetap sama)
    }
};

// --- MANAJEMEN PENGGUNA (SUPABASE) ---

async function renderUserTables() {
    const internalBody = document.getElementById('internal-user-table-body');
    const externalBody = document.getElementById('external-user-table-body');
    if (!internalBody || !externalBody) return;

    internalBody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-500">Memuat data...</td></tr>`;
    externalBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-500">Memuat data...</td></tr>`;

    const { data: profiles, error } = await _supabase.from('profiles').select('*');

    if (error) {
        console.error('Error fetching profiles:', error);
        internalBody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-red-500">Gagal memuat data pengguna.</td></tr>`;
        externalBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-red-500">Gagal memuat data pengguna.</td></tr>`;
        return;
    }

    const internalUsers = profiles.filter(p => ['Admin Pemda', 'Super Admin', 'User Monitoring'].includes(p.role));
    const externalUsers = profiles.filter(p => ['Admin Koperasi', 'Admin BUMDes', 'Admin Perumda'].includes(p.role));

    const createUserRow = (user, type) => {
        const sClass = user.status === 'Aktif' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100';
        const externalCells = type === 'external' ? `<td class="p-3">${user.entity || '-'}</td><td class="p-3">${user.desa || ''}, ${user.kecamatan || ''}</td>` : '';
        const isDeletable = user.role !== 'Super Admin';
        const deleteButton = isDeletable ? `<button class="text-red-500 hover:text-red-700 p-1 delete-user-btn">Hapus</button>` : '';
        
        return `<tr data-user-id="${user.user_id}" data-email="${user.email}" data-name="${user.name}" data-type="${type}">
                    <td class="p-3">
                        <p class="font-medium">${user.name || '-'}</p>
                        <p class="text-xs text-gray-500">${user.email || '-'}</p>
                    </td>
                    <td class="p-3">${user.role}</td>
                    ${externalCells}
                    <td class="p-3"><span class="px-2 py-1 text-xs font-semibold ${sClass} rounded-full">${user.status}</span></td>
                    <td class="p-3 flex items-center space-x-2">
                        <button class="text-blue-500 hover:text-blue-700 p-1 edit-user-btn" data-type="${type}">Edit</button>
                        ${deleteButton}
                    </td>
                </tr>`;
    };

    internalBody.innerHTML = internalUsers.map(u => createUserRow(u, 'internal')).join('') || `<tr><td colspan="4" class="p-4 text-center text-gray-500">Tidak ada pengguna internal.</td></tr>`;
    externalBody.innerHTML = externalUsers.map(u => createUserRow(u, 'external')).join('') || `<tr><td colspan="6" class="p-4 text-center text-gray-500">Tidak ada pengguna eksternal.</td></tr>`;
    
    updateSidebarMetrics(profiles);
}

async function handleCreateExternalUser(form) { /* ... (sudah ada) ... */ }

function setupAllModals() {
    // ... (logika tambah user)

    // --- LOGIKA EDIT & HAPUS PENGGUNA ---
    const internalTable = document.getElementById('internal-user-table-body');
    const externalTable = document.getElementById('external-user-table-body');
    const editModal = document.getElementById('edit-user-modal');
    const deleteModal = document.getElementById('delete-confirm-modal');
    const editForm = document.getElementById('edit-user-form');
    if (!internalTable || !externalTable || !editModal || !deleteModal || !editForm) return;

    let userIdToDelete = null;

    const handleEditClick = async (e) => { /* ... (sudah ada) ... */ };

    const handleDeleteClick = (e) => {
        if (!e.target.classList.contains('delete-user-btn')) return;
        const userRow = e.target.closest('tr');
        userIdToDelete = userRow.dataset.userId;
        const userName = userRow.dataset.name;
        document.getElementById('delete-confirm-text').textContent = `Apakah Anda yakin ingin menghapus pengguna "${userName}"? Tindakan ini tidak dapat dibatalkan.`;
        deleteModal.classList.remove('hidden');
    }; 

    internalTable.addEventListener('click', e => { handleEditClick(e); handleDeleteClick(e); });
    externalTable.addEventListener('click', e => { handleEditClick(e); handleDeleteClick(e); });

    editForm.addEventListener('submit', async (e) => { /* ... (sudah ada) ... */ });

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
        if (!userIdToDelete) return;

        const deleteButton = document.getElementById('confirm-delete-btn');
        deleteButton.disabled = true;
        deleteButton.textContent = 'Menghapus...';

        // Panggil Edge Function 'delete-user'
        const { error } = await _supabase.functions.invoke('delete-user', {
            body: { user_id: userIdToDelete },
        });

        if (error) {
            alert(`Gagal menghapus pengguna: ${error.message}`);
        } else {
            alert('Pengguna berhasil dihapus.');
            deleteModal.classList.add('hidden');
            renderUserTables(); // Muat ulang tabel
        }
        
        userIdToDelete = null;
        deleteButton.disabled = false;
        deleteButton.textContent = 'Ya, Hapus';
    });

    document.getElementById('close-edit-modal-btn').addEventListener('click', () => editModal.classList.add('hidden'));
    document.getElementById('cancel-edit-btn').addEventListener('click', () => editModal.classList.add('hidden'));
    document.getElementById('cancel-delete-btn').addEventListener('click', () => deleteModal.classList.add('hidden'));
}

// --- Sisa file ... ---
document.addEventListener('DOMContentLoaded', function () {
    // ... (event listener lainnya)
    setupAllModals();
});