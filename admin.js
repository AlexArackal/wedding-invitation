// ===== ADMIN PANEL SCRIPT =====

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});

// ===== INITIALIZE ADMIN =====
function initializeAdmin() {
    loadStats();
    loadRSVPData();
    loadBlessings();
    setupTabNavigation();
    setupEventListeners();
    loadConfigData();
}

// ===== TAB NAVIGATION =====
function setupTabNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.getAttribute('data-tab');

            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked item and corresponding tab
            item.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// ===== LOAD STATS =====
function loadStats() {
    const weddingRsvp = parseInt(localStorage.getItem('weddingRsvp')) || 0;
    const receptionRsvp = parseInt(localStorage.getItem('receptionRsvp')) || 0;
    const blessings = JSON.parse(localStorage.getItem('blessings')) || [];

    document.getElementById('weddingRsvpTotal').textContent = weddingRsvp;
    document.getElementById('receptionRsvpTotal').textContent = receptionRsvp;
    document.getElementById('totalBlessings').textContent = blessings.length;
}

// ===== LOAD RSVP DATA =====
function loadRSVPData() {
    const weddingRsvp = parseInt(localStorage.getItem('weddingRsvp')) || 0;
    const receptionRsvp = parseInt(localStorage.getItem('receptionRsvp')) || 0;

    document.getElementById('weddingRsvpInput').value = weddingRsvp;
    document.getElementById('weddingRsvpDisplay').textContent = weddingRsvp;
    document.getElementById('receptionRsvpInput').value = receptionRsvp;
    document.getElementById('receptionRsvpDisplay').textContent = receptionRsvp;
}

// ===== LOAD BLESSINGS =====
function loadBlessings() {
    const blessings = JSON.parse(localStorage.getItem('blessings')) || [];
    const list = document.getElementById('adminBlessingsList');
    list.innerHTML = '';

    if (blessings.length === 0) {
        list.innerHTML = '<div class="empty-state">No blessings yet. Invite your guests! 💚</div>';
        return;
    }

    blessings.forEach((blessing, index) => {
        const item = document.createElement('div');
        item.className = 'blessing-item';
        item.innerHTML = `
            <span class="blessing-text">"${blessing.text}"</span>
            <span class="blessing-time">${blessing.timestamp}</span>
            <button class="blessing-delete-btn" onclick="deleteBlessing(${index})">Delete</button>
        `;
        list.appendChild(item);
    });
}

// ===== DELETE BLESSING =====
function deleteBlessing(index) {
    if (confirm('Are you sure you want to delete this blessing?')) {
        let blessings = JSON.parse(localStorage.getItem('blessings')) || [];
        blessings.splice(index, 1);
        localStorage.setItem('blessings', JSON.stringify(blessings));
        loadBlessings();
        loadStats();
    }
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Wedding RSVP
    document.getElementById('updateWeddingRsvpBtn').addEventListener('click', () => {
        const value = parseInt(document.getElementById('weddingRsvpInput').value) || 0;
        localStorage.setItem('weddingRsvp', value);
        document.getElementById('weddingRsvpDisplay').textContent = value;
        loadStats();
        alert('Wedding RSVP updated!');
    });

    document.getElementById('resetWeddingRsvpBtn').addEventListener('click', () => {
        if (confirm('Reset wedding RSVP to 0?')) {
            localStorage.setItem('weddingRsvp', 0);
            document.getElementById('weddingRsvpInput').value = 0;
            document.getElementById('weddingRsvpDisplay').textContent = 0;
            loadStats();
        }
    });

    // Reception RSVP
    document.getElementById('updateReceptionRsvpBtn').addEventListener('click', () => {
        const value = parseInt(document.getElementById('receptionRsvpInput').value) || 0;
        localStorage.setItem('receptionRsvp', value);
        document.getElementById('receptionRsvpDisplay').textContent = value;
        loadStats();
        alert('Reception RSVP updated!');
    });

    document.getElementById('resetReceptionRsvpBtn').addEventListener('click', () => {
        if (confirm('Reset reception RSVP to 0?')) {
            localStorage.setItem('receptionRsvp', 0);
            document.getElementById('receptionRsvpInput').value = 0;
            document.getElementById('receptionRsvpDisplay').textContent = 0;
            loadStats();
        }
    });
}

// ===== LOAD CONFIG DATA =====
function loadConfigData() {
    document.getElementById('brideName').value = CONFIG.couple.brideName || '';
    document.getElementById('groomName').value = CONFIG.couple.groomName || '';
    document.getElementById('coupleSurname').value = CONFIG.couple.surname || '';
    document.getElementById('ceremonyVenue').value = CONFIG.ceremony.venue || '';
    document.getElementById('whatsappNumber').value = CONFIG.whatsapp.phoneNumber || '';

    // Set date and time from config
    const ceremonyDate = CONFIG.ceremony.dateObj;
    const dateStr = ceremonyDate.toISOString().split('T')[0];
    document.getElementById('ceremonyDate').value = dateStr;

    const hours = ceremonyDate.getHours().toString().padStart(2, '0');
    const minutes = ceremonyDate.getMinutes().toString().padStart(2, '0');
    document.getElementById('ceremonyTime').value = `${hours}:${minutes}`;

    // Setup save button
    document.getElementById('saveConfigBtn').addEventListener('click', saveConfig);
}

// ===== SAVE CONFIG =====
function saveConfig() {
    alert('Configuration save requires updating config.js file manually. Please edit the config.js file in the repository to update the following:\n\n' +
        'Bride Name: ' + document.getElementById('brideName').value + '\n' +
        'Groom Name: ' + document.getElementById('groomName').value + '\n' +
        'Surname: ' + document.getElementById('coupleSurname').value + '\n' +
        'Wedding Venue: ' + document.getElementById('ceremonyVenue').value + '\n' +
        'WhatsApp Number: ' + document.getElementById('whatsappNumber').value);
}
