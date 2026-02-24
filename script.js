// ========== LOGIN SYSTEM ==========
// Check if user is already logged in
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');
    const lastPage = localStorage.getItem('lastPage') || 'home'; // AMBIL PAGE TERAKHIR
    
    if (isLoggedIn === 'true') {
        showApp(userType, userEmail);
        // SET PAGE TERAKHIR SELEPAS SHOWAPP
        setTimeout(() => {
            setActivePage(lastPage);
        }, 100);
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
}

function showApp(userType, userEmail) {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    
    // Display user info
    const userDisplay = document.getElementById('userDisplay');
    const userBadge = document.getElementById('userBadge');
    
    if (userType === 'admin') {
        userDisplay.innerHTML = `<strong>Admin</strong> (${userEmail})`;
        userBadge.innerHTML = '<i class="fas fa-shield-alt"></i> Admin';
        
        // Update sidebar untuk admin (special)
        updateSidebarForAdmin();
        
        // Update bottom nav untuk admin
        updateBottomNavForAdmin();
    } else {
        userDisplay.innerHTML = `<strong>User</strong> (${userEmail})`;
        userBadge.innerHTML = '<i class="fas fa-hospital-user"></i> User';
        
        // Staf MOH sama macam user biasa - guna sidebar user
        updateSidebarForUser();
        
        // Bottom nav sama macam user
        updateBottomNavForUser();
    }
    
    // JANGAN start dengan home page kat sini
    // setActivePage('home');  // BARIS NI DAH DIPADAM
}

function updateSidebarForAdmin() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    sidebarMenu.innerHTML = `
        <div class="sidebar-item" data-page="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </div>
        <div class="sidebar-item" data-page="aduan">
            <i class="fas fa-pen-alt"></i>
            <span>Aduan</span>
        </div>
        <div class="sidebar-item" data-page="status">
            <i class="fas fa-check-circle"></i>
            <span>Status</span>
        </div>
        <div class="sidebar-item" data-page="direktori">
            <i class="fas fa-address-book"></i>
            <span>Direktori</span>
        </div>
    `;
    
    // Refresh event listeners
    refreshSidebarListeners();
}

function updateSidebarForUser() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    sidebarMenu.innerHTML = `
        <div class="sidebar-item" data-page="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </div>
        <div class="sidebar-item" data-page="aduan">
            <i class="fas fa-pen-alt"></i>
            <span>Aduan</span>
        </div>
        <div class="sidebar-item" data-page="direktori">
            <i class="fas fa-address-book"></i>
            <span>Direktori</span>
        </div>
    `;
    
    // Refresh event listeners
    refreshSidebarListeners();
}

function updateBottomNavForAdmin() {
    const bottomNav = document.querySelector('.bottom-nav');
    bottomNav.innerHTML = `
        <button class="nav-item" data-page="aduan">
            <i class="fas fa-pen-alt"></i>
            <span>Aduan</span>
        </button>
        <button class="nav-item" data-page="status">
            <i class="fas fa-check-circle"></i>
            <span>Status</span>
        </button>
    `;
    
    // Refresh event listeners
    refreshNavListeners();
}

function updateBottomNavForUser() {
    const bottomNav = document.querySelector('.bottom-nav');
    bottomNav.innerHTML = `
        <button class="nav-item" data-page="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </button>
        <button class="nav-item" data-page="aduan">
            <i class="fas fa-pen-alt"></i>
            <span>Aduan</span>
        </button>
    `;
    
    // Refresh event listeners
    refreshNavListeners();
}

function refreshSidebarListeners() {
    const newSidebarItems = document.querySelectorAll('.sidebar-item');
    newSidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            setActivePage(page);
        });
    });
}

function refreshNavListeners() {
    const newNavItems = document.querySelectorAll('.nav-item');
    newNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            setActivePage(page);
        });
    });
}

// TIDAK GUNA - TAB SWITCHING TELAH DIPADAM KERANA HANYA MOH LOGIN
// Handle tab switching - TIDAK DIGUNAKAN LAGI
/*
document.getElementById('emailTab').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('mohTab').classList.remove('active');
    document.getElementById('emailLogin').classList.add('active');
    document.getElementById('mohLogin').classList.remove('active');
});

document.getElementById('mohTab').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('emailTab').classList.remove('active');
    document.getElementById('mohLogin').classList.add('active');
    document.getElementById('emailLogin').classList.remove('active');
});
*/

// TIDAK GUNA - EMAIL LOGIN TELAH DIPADAM
// Email login (untuk user biasa) - TIDAK DIGUNAKAN LAGI
/*
document.getElementById('emailLoginBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!email) {
        alert('Sila masukkan email');
        return;
    }
    
    if (!password) {
        alert('Sila masukkan kata laluan');
        return;
    }
    
    // Check if email contains @moh.gov.my (sepatutnya dalam MOH tab, tapi untuk safety)
    if (email.includes('@moh.gov.my')) {
        alert('Sila gunakan tab MOH untuk email Kementerian Kesihatan');
        return;
    }
    
    // For demo, any email works with any password
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'user');
    localStorage.setItem('userEmail', email);
    
    showApp('user', email);
    setActivePage('home'); // FIRST TIME LOGIN, HOME
});
*/

// MOH login (guna email dengan domain @moh.gov.my) - SATU-SATUNYA CARA LOGIN
document.getElementById('mohLoginBtn').addEventListener('click', function() {
    const email = document.getElementById('mohEmail').value.trim();
    const password = document.getElementById('mohPassword').value;
    
    if (!email) {
        alert('Sila masukkan email MOH');
        return;
    }
    
    if (!password) {
        alert('Sila masukkan kata laluan');
        return;
    }
    
    // Validate MOH email domain
    if (!email.includes('@moh.gov.my')) {
        alert('Email MOH mesti berakhir dengan @moh.gov.my');
        return;
    }
    
    // Check password to determine user type
    let userType = '';
    
    if (password === 'admin123') {
        userType = 'admin';
    } else if (password === 'user123') {
        userType = 'user';
    } else {
        alert('Kata Laluan tidak tepat!');
        return;
    }
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    localStorage.setItem('userEmail', email);
    
    showApp(userType, email);
    setActivePage('home'); // FIRST TIME LOGIN, HOME
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('lastPage'); // PADAM LAST PAGE
    showLogin();
    
    // Clear input fields
    document.getElementById('mohEmail').value = '';
    document.getElementById('mohPassword').value = '';
});

// Function untuk load data dari localStorage
function loadData() {
    const savedData = localStorage.getItem('aduanData');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        // Data default kalau takde dalam localStorage
        return [
            {
                id: 1,
                tarikh: '2026-02-15',
                masa: '14:30',
                nama: 'Ahmad Faiz',
                jenis: 'Kerosakan',
                lokasi: 'Blok A, Tingkat 3',
                gambar: null,
                catatan: 'Lampu koridor rosak',
                selesai: false
            },
            {
                id: 2,
                tarikh: '2026-02-16',
                masa: '09:15',
                nama: 'Siti Aminah',
                jenis: 'Kebersihan',
                lokasi: 'Kantin',
                gambar: null,
                catatan: 'Longkang tersumbat',
                selesai: false
            }
        ];
    }
}

// Function untuk save data ke localStorage
function saveData() {
    localStorage.setItem('aduanData', JSON.stringify(aduanList));
}

// Function untuk delete aduan
function deleteAduan(id) {
    if (confirm('Adakah anda pasti mahu memadam aduan ini?')) {
        aduanList = aduanList.filter(a => a.id !== id);
        saveData();
        
        // Refresh current page
        const currentPage = document.querySelector('.sidebar-item.active').dataset.page;
        renderPage(currentPage);
    }
}

// Data dummy - load dari localStorage
let aduanList = loadData();

// ========== STAFF DIREKTORI (READ-ONLY UNTUK SEMUA) ==========
// Function untuk load staff dari localStorage (DENGAN FORCE UPDATE)
function loadStaff() {
    const savedStaff = localStorage.getItem('staffData');
    
    // Data default yang baru (guna relative path)
    const defaultStaff = [
        { 
            id: 1,
            nama: 'Encik Wan Mohd Faris bin Wan Razali', 
            jawatan: 'Pembantu Keselamatan', 
            telefon: '013-950 5396', 
            gambar: "C:/Users/Asus/Desktop/e-aduanHB/photos/faris3.png"  // Guna relative path
        },
       
    ];
    
    // FORCE UPDATE: Simpan data baru setiap kali load
    // Hapuskan data lama dan ganti dengan yang baru
    localStorage.setItem('staffData', JSON.stringify(defaultStaff));
    return defaultStaff;
}

// Function untuk save staff ke localStorage
function saveStaff() {
    localStorage.setItem('staffData', JSON.stringify(staffDirektori));
}

// Data staff - load dari localStorage (guna function baru)
let staffDirektori = loadStaff();

// DOM elements
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
let sidebarItems = document.querySelectorAll('.sidebar-item');
let navItems = document.querySelectorAll('.nav-item');
const content = document.getElementById('content');
const pageTitle = document.getElementById('pageTitle');

// Toggle sidebar functions
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Handle navigation
function setActivePage(page) {
    // Save current page to localStorage
    localStorage.setItem('lastPage', page);  // <-- TAMBAH BARIS NI
    
    // Update sidebar
    sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        if(item.dataset.page === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update bottom nav
    navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if(item.dataset.page === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update page title
    if (page === 'home') pageTitle.textContent = 'Home';
    else if (page === 'aduan') pageTitle.textContent = 'Aduan';
    else if (page === 'status') pageTitle.textContent = 'Status';
    else if (page === 'direktori') pageTitle.textContent = 'Direktori';

    // Render content
    renderPage(page);

    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
}

// Render functions
function renderPage(page) {
    const userType = localStorage.getItem('userType');
    
    if (page === 'home') renderHome(userType);
    else if (page === 'aduan') renderAduan(userType);
    else if (page === 'status') renderStatus();
    else if (page === 'direktori') renderDirektori();
}

// ========== HOME PAGE ==========
function renderHome(userType) {
    let html = `
        <div class="home-container">
            <!-- HEADER CARD with background image -->
            <div class="home-header-card">
                <div class="header-background">
                    <img src="C:/Users/Asus/Desktop/e-aduanHB/photos/newlogohosp.png" alt="Hospital Banting">
                    <div class="header-overlay"></div>
                </div>
                
                <div class="header-content">
                    <div class="profile-section">
                        <div class="profile-image">
                            <img src="C:/Users/Asus/Desktop/e-aduanHB/photos/profile uk4.png" alt="Hospital Icon">
                        </div>
                    </div>
                </div>
            </div>
    `;
    
    // Untuk ADMIN: ada stats dan recent complaints
    if (userType === 'admin') {
        html += `
            <!-- STATS CARDS -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon blue">
                        <i class="fas fa-pen-alt"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-value">${aduanList.length}</span>
                        <span class="stat-label">Jumlah Aduan</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-value">${aduanList.filter(a => a.selesai).length}</span>
                        <span class="stat-label">Selesai</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon orange">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-value">${aduanList.filter(a => !a.selesai).length}</span>
                        <span class="stat-label">Dalam Proses</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon purple">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-details">
                        <span class="stat-value">${staffDirektori.length}</span>
                        <span class="stat-label">Staf Keselamatan</span>
                    </div>
                </div>
            </div>

            <!-- RECENT COMPLAINTS -->
            <div class="recent-section">
                <div class="section-header">
                    <h3>Aduan Terkini</h3>
                    <button class="view-all" onclick="setActivePage('aduan')">Lihat Semua <i class="fas fa-arrow-right"></i></button>
                </div>
                
                <div class="recent-list">
                    ${aduanList.slice(0, 3).map(a => `
                        <div class="recent-item">
                            <div class="recent-icon ${a.selesai ? 'completed' : 'pending'}">
                                <i class="fas ${a.selesai ? 'fa-check' : 'fa-clock'}"></i>
                            </div>
                            <div class="recent-details">
                                <h4>${a.jenis}</h4>
                                <p><i class="fas fa-user"></i> ${a.nama} • <i class="fas fa-map-marker-alt"></i> ${a.lokasi}</p>
                                <small><i class="fas fa-calendar"></i> ${a.tarikh} ${a.masa}</small>
                            </div>
                            <span class="recent-status ${a.selesai ? 'completed' : 'pending'}">
                                ${a.selesai ? 'Selesai' : 'Proses'}
                            </span>
                        </div>
                    `).join('')}
                    ${aduanList.length === 0 ? '<p style="text-align: center; color: #999; padding: 20px;">Tiada aduan buat masa ini</p>' : ''}
                </div>
            </div>
        `;
    } 
    // Untuk USER: ada quick actions je
    else {
        html += `
            <!-- QUICK ACTIONS -->
            <div class="quick-actions">
                <h3>Tindakan Pantas</h3>
                <div class="action-buttons">
                    <button class="action-btn" onclick="setActivePage('aduan')">
                        <i class="fas fa-plus-circle"></i>
                        <span>Buat Aduan</span>
                    </button>
                    <button class="action-btn" onclick="setActivePage('direktori')">
                        <i class="fas fa-address-book"></i>
                        <span>Hubungi Staf</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    html += `</div>`;
    content.innerHTML = html;
}

// ========== ADUAN PAGE ==========
function renderAduan(userType) {
    let html = '';
    
    // Kalau user ATAU staf MOH, ada form untuk buat aduan baru
    if (userType === 'user') {
        html += `
            <div class="card">
                <h2>📝 Buat Aduan Baru</h2>
                <form id="formAduan">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tarikh</label>
                            <input type="date" id="tarikh" required>
                        </div>
                        <div class="form-group">
                            <label>Masa</label>
                            <input type="time" id="masa" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Nama</label>
                        <input type="text" id="nama" placeholder="Nama penuh" required>
                    </div>

                    <div class="form-group">
                        <label>Jenis Aduan</label>
                        <input type="text" id="jenis" placeholder="Contoh: Kerosakan, Kebersihan, Keselamatan, dll" required>
                    </div>

                    <div class="form-group">
                        <label>Lokasi</label>
                        <input type="text" id="lokasi" placeholder="Contoh: Blok B, Tingkat 2" required>
                    </div>

                    <div class="form-group">
                        <label>Gambar Bukti</label>
                        <div class="image-upload-area" id="uploadArea">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Klik untuk upload gambar</p>
                            <small>JPG, PNG, GIF (Max 5MB)</small>
                            <input type="file" id="gambar" accept="image/*">
                        </div>
                        <div class="preview-container">
                            <img id="preview" class="image-preview" alt="Preview">
                            <button type="button" class="remove-image" id="removeImage">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Catatan</label>
                        <textarea id="catatan" rows="4" placeholder="Terangkan secara ringkas..."></textarea>
                    </div>

                    <button type="submit" class="btn-primary">
                        <i class="fas fa-paper-plane"></i> Hantar Aduan
                    </button>
                </form>
            </div>
        `;
    }
    
    // Senarai aduan untuk semua role
    html += `
        <div class="card">
            <h2>📋 Senarai Aduan</h2>
            <div class="aduan-list" id="senaraiAduan"></div>
        </div>
    `;

    content.innerHTML = html;

    // Image upload preview (untuk user MOH)
    if (userType === 'user') {
        const gambarInput = document.getElementById('gambar');
        const preview = document.getElementById('preview');
        const removeBtn = document.getElementById('removeImage');

        if (gambarInput) {
            gambarInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if(file) {
                    if(file.size > 5 * 1024 * 1024) {
                        alert('Gambar terlalu besar! Maksimum 5MB');
                        this.value = '';
                        return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.classList.add('show');
                        removeBtn.classList.add('show');
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                gambarInput.value = '';
                preview.src = '';
                preview.classList.remove('show');
                removeBtn.classList.remove('show');
            });
        }
    }

    function refreshSenarai() {
        const senaraiDiv = document.getElementById('senaraiAduan');
        if (!senaraiDiv) return;
        
        if (aduanList.length === 0) {
            senaraiDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Tiada aduan buat masa ini</p>';
            return;
        }

        senaraiDiv.innerHTML = aduanList.map(aduan => `
            <div class="aduan-item">
                <div class="aduan-header">
                    <span class="aduan-nama">${aduan.nama}</span>
                    <span class="aduan-tarikh">${aduan.tarikh} ${aduan.masa}</span>
                    ${userType === 'admin' ? `  <!-- ONLY ADMIN boleh delete -->
                        <button class="delete-btn" onclick="deleteAduan(${aduan.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
                <div class="aduan-detail">
                    <span>Jenis:</span>
                    <span>${aduan.jenis}</span>
                    <span>Lokasi:</span>
                    <span>${aduan.lokasi}</span>
                    <span>Catatan:</span>
                    <span>${aduan.catatan}</span>
                </div>
                ${aduan.gambar ? `<img src="${aduan.gambar}" alt="Bukti" class="aduan-gambar">` : ''}
            </div>
        `).join('');
    }

    refreshSenarai();

    // Handle form submission (untuk user MOH)
    if (userType === 'user') {
        const form = document.getElementById('formAduan');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const gambarFile = document.getElementById('gambar').files[0];
                
                if(gambarFile) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        saveAduan(event.target.result);
                    }
                    reader.readAsDataURL(gambarFile);
                } else {
                    saveAduan(null);
                }

                function saveAduan(gambarData) {
                    const newAduan = {
                        id: Date.now(),
                        tarikh: document.getElementById('tarikh').value,
                        masa: document.getElementById('masa').value,
                        nama: document.getElementById('nama').value,
                        jenis: document.getElementById('jenis').value,
                        lokasi: document.getElementById('lokasi').value,
                        gambar: gambarData,
                        catatan: document.getElementById('catatan').value,
                        selesai: false
                    };

                    aduanList.push(newAduan);
                    
                    // 💾 SAVE KE LOCALSTORAGE
                    saveData();
                    
                    refreshSenarai();
                    e.target.reset();
                    
                    const preview = document.getElementById('preview');
                    const removeBtn = document.getElementById('removeImage');
                    
                    if (preview) {
                        preview.src = '';
                        preview.classList.remove('show');
                    }
                    if (removeBtn) {
                        removeBtn.classList.remove('show');
                    }
                    
                    alert('✅ Aduan berjaya dihantar!');
                }
            });
        }
    }
}

// ========== STATUS PAGE ==========
function renderStatus() {
    const userType = localStorage.getItem('userType');
    
    const html = `
        <div class="card">
            <h2>✅ Status Penyelesaian Aduan</h2>
            <div class="status-container" id="statusContainer"></div>
        </div>
    `;

    content.innerHTML = html;

    function refreshStatus() {
        const container = document.getElementById('statusContainer');
        if (!container) return;
        
        if (aduanList.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Tiada aduan buat masa ini</p>';
            return;
        }

        container.innerHTML = aduanList.map(a => `
            <div class="status-item" data-id="${a.id}">
                <input type="checkbox" class="status-checkbox" ${a.selesai ? 'checked' : ''}>
                <div class="status-info">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4>${a.jenis} - ${a.lokasi}</h4>
                            <p><i class="fas fa-user"></i> ${a.nama}</p>
                            <p><i class="fas fa-calendar"></i> ${a.tarikh} ${a.masa}</p>
                            <p><i class="fas fa-comment"></i> ${a.catatan}</p>
                            <span class="status-badge ${a.selesai ? 'selesai' : 'belum'}">
                                ${a.selesai ? '✓ Selesai' : '⏳ Belum Selesai'}
                            </span>
                        </div>
                        ${userType === 'admin' ? `  <!-- ONLY ADMIN boleh delete -->
                            <button class="delete-btn" onclick="deleteAduan(${a.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Add checkbox listeners (admin je boleh update status)
        document.querySelectorAll('.status-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                const statusItem = this.closest('.status-item');
                const id = parseInt(statusItem.dataset.id);
                const aduan = aduanList.find(a => a.id === id);
                if (aduan) {
                    aduan.selesai = this.checked;
                    
                    // 💾 SAVE KE LOCALSTORAGE
                    saveData();
                    
                    refreshStatus();
                }
            });
        });
    }

    refreshStatus();
}

// ========== DIREKTORI PAGE (READ-ONLY UNTUK SEMUA) ==========
function renderDirektori() {
    let html = `
        <div class="card">
            <h2>📞 Direktori Staf Unit Keselamatan</h2>
            
            <div class="direktori-grid" id="direktoriGrid">
                ${staffDirektori.map(staf => `
                    <div class="staf-card">
                        <img src="${staf.gambar}" alt="${staf.nama}">
                        <h3>${staf.nama}</h3>
                        <p>${staf.jawatan}</p>
                        <p class="phone"><i class="fas fa-phone-alt"></i> ${staf.telefon}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    content.innerHTML = html;
}

// Check login status when page loads
checkLogin();