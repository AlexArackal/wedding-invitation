// ===== IMPORT CONFIG =====
// CONFIG is already loaded via config.js in HTML

// ===== GLOBAL VARIABLES =====
let heroOpened = false;
let scratchRevealed = false;
let weddingCount = 0;
let receptionCount = 0;
const MAX_GUESTS = 99;

// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    loadBlessings();
    startCountdown();
    setupEventListeners();
    initializeMusic();
    setupAdminAccess();
});

// ===== INITIALIZE DOM WITH CONFIG =====
function initializeDOM() {
    // Update couple names
    document.getElementById('brideName').textContent = CONFIG.couple.brideName;
    document.getElementById('groomName').textContent = CONFIG.couple.groomName;
    document.getElementById('coupleSurname').textContent = CONFIG.couple.surname;
    document.getElementById('footerCoupleName').textContent = CONFIG.couple.fullNames;
    document.getElementById('emotionalMessage').innerHTML = CONFIG.message;
    document.getElementById('footerDate').textContent = `${new Date(CONFIG.ceremony.dateObj).getFullYear()}`;

    // Update images
    document.getElementById('brideImg').src = CONFIG.images.bride;
    document.getElementById('groomImg').src = CONFIG.images.groom;

    // Update ceremony details
    document.getElementById('ceremonyDate').textContent = CONFIG.ceremony.date;
    document.getElementById('ceremonyTime').textContent = CONFIG.ceremony.time;
    document.getElementById('ceremonyVenue').textContent = CONFIG.ceremony.venue;
    document.getElementById('ceremonyLocation').textContent = CONFIG.ceremony.location;
    document.getElementById('ceremonyMapBtn').href = CONFIG.ceremony.mapLink;
    document.getElementById('weddingDate').textContent = CONFIG.ceremony.dateShort;
    document.getElementById('weddingTime').textContent = CONFIG.ceremony.time;

    // Update reception details
    document.getElementById('receptionDate').textContent = CONFIG.reception.date;
    document.getElementById('receptionTime').textContent = CONFIG.reception.time;
    document.getElementById('receptionVenue').textContent = CONFIG.reception.venue;
    document.getElementById('receptionLocation').textContent = CONFIG.reception.location;
    document.getElementById('receptionMapBtn').href = CONFIG.reception.mapLink;
}

// ===== HERO TAP TO OPEN =====
function setupHeroTap() {
    const hero = document.getElementById('hero');
    const tapToOpen = document.querySelector('.tap-to-open');

    hero.addEventListener('click', () => {
        if (!heroOpened) {
            heroOpened = true;
            tapToOpen.style.animation = 'none';
            tapToOpen.style.opacity = '0';
            setTimeout(() => {
                tapToOpen.style.display = 'none';
            }, 500);

            // Trigger fireworks
            if (CONFIG.animations.enableFireworks) {
                triggerFireworks();
            }

            // Smooth scroll to couple section
            setTimeout(() => {
                document.querySelector('.couple-section').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    });
}

// ===== FIREWORKS EFFECT =====
function triggerFireworks() {
    const container = document.getElementById('fireworks');
    const colors = ['#d4af37', '#e74c3c', '#3498db', '#f39c12', '#e67e22'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFirework(container, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
}

function createFirework(container, color) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight / 2;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 1500);
    }
}

// ===== SCRATCH TO REVEAL =====
function setupScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const container = document.querySelector('.scratch-canvas-container');
    const ctx = canvas.getContext('2d');

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Draw scratch surface
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFA500';
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f39c12');
    gradient.addColorStop(1, '#e67e22');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', (e) => scratch(e, canvas, ctx));

    // Touch support
    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', (e) => scratch(e, canvas, ctx));

    function scratch(e, canvas, ctx) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.clearRect(x - 20, y - 20, 40, 40);

        // Check if enough is scratched
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let transparent = 0;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 128) transparent++;
        }

        if (transparent / (data.length / 4) > 0.5 && !scratchRevealed) {
            revealDate();
        }
    }
}

function revealDate() {
    scratchRevealed = true;
    const canvas = document.getElementById('scratchCanvas');
    canvas.style.display = 'none';

    // Trigger butterflies
    if (CONFIG.animations.enableButterflies) {
        triggerButterflies();
    }
}

// ===== BUTTERFLIES EFFECT =====
function triggerButterflies() {
    const container = document.getElementById('butterfliesContainer');
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.textContent = '🦋';
            butterfly.style.left = Math.random() * 100 + '%';
            butterfly.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(butterfly);

            setTimeout(() => butterfly.remove(), 5000);
        }, i * 200);
    }
}

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const target = CONFIG.ceremony.dateObj.getTime();
        const distance = target - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countdownDays').textContent = days.toString().padStart(2, '0');
            document.getElementById('countdownHours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdownMinutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdownSeconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdownDays').textContent = '00';
            document.getElementById('countdownHours').textContent = '00';
            document.getElementById('countdownMinutes').textContent = '00';
            document.getElementById('countdownSeconds').textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== RSVP COUNTER =====
function setupRSVPCounters() {
    // Wedding ceremony counter
    document.getElementById('weddingPlus').addEventListener('click', () => {
        if (weddingCount < MAX_GUESTS) {
            weddingCount++;
            updateWeddingDisplay();
        }
    });

    document.getElementById('weddingMinus').addEventListener('click', () => {
        if (weddingCount > 0) {
            weddingCount--;
            updateWeddingDisplay();
        }
    });

    // Reception counter
    document.getElementById('receptionPlus').addEventListener('click', () => {
        if (receptionCount < MAX_GUESTS) {
            receptionCount++;
            updateReceptionDisplay();
        }
    });

    document.getElementById('receptionMinus').addEventListener('click', () => {
        if (receptionCount > 0) {
            receptionCount--;
            updateReceptionDisplay();
        }
    });

    // WhatsApp buttons
    document.getElementById('weddingWhatsappBtn').addEventListener('click', () => {
        sendWhatsApp('wedding');
    });

    document.getElementById('receptionWhatsappBtn').addEventListener('click', () => {
        sendWhatsApp('reception');
    });

    // Blessing button
    document.getElementById('blessBtn').addEventListener('click', sendBlessing);
}

function updateWeddingDisplay() {
    document.getElementById('weddingCount').value = weddingCount;
    document.getElementById('weddingGuestsText').textContent = weddingCount + ' ' + (weddingCount === 1 ? 'guest' : 'guests');
}

function updateReceptionDisplay() {
    document.getElementById('receptionCount').value = receptionCount;
    document.getElementById('receptionGuestsText').textContent = receptionCount + ' ' + (receptionCount === 1 ? 'guest' : 'guests');
}

// ===== WHATSAPP INTEGRATION =====
function sendWhatsApp(type) {
    const count = type === 'wedding' ? weddingCount : receptionCount;
    const eventName = type === 'wedding' ? 'Wedding Ceremony' : 'Reception';
    const message = `${CONFIG.whatsapp.prefix} ${eventName}: ${count} ${count === 1 ? 'guest' : 'guests'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${CONFIG.whatsapp.phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
}

function sendBlessing() {
    const blessingText = document.getElementById('blessingText').value.trim();
    if (!blessingText) {
        alert('Please write your blessing before sending!');
        return;
    }

    // Save to localStorage
    let blessings = JSON.parse(localStorage.getItem('blessings')) || [];
    blessings.push({
        text: blessingText,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('blessings', JSON.stringify(blessings));

    // Send via WhatsApp
    const message = `✨ Blessing: ${blessingText}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${CONFIG.whatsapp.phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');

    // Clear input
    document.getElementById('blessingText').value = '';
    alert('Blessing sent! Thank you for your wishes.');

    // Reload blessings
    loadBlessings();
}

// ===== LOAD BLESSINGS =====
function loadBlessings() {
    const blessings = JSON.parse(localStorage.getItem('blessings')) || [];
    const blessingsList = document.getElementById('blessingsList');
    blessingsList.innerHTML = '';

    if (blessings.length === 0) {
        blessingsList.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 40px; font-size: 0.95rem;">No blessings yet. Be the first to share your wishes! 💚</p>';
        return;
    }

    blessings.forEach((blessing, index) => {
        const item = document.createElement('div');
        item.className = 'blessing-item';
        item.textContent = blessing.text;
        blessingsList.appendChild(item);
    });
}

// ===== MUSIC CONTROL =====
function initializeMusic() {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = CONFIG.music.volume;
    if (CONFIG.animations.autoPlayMusic) {
        audio.play().catch(() => console.log('Autoplay blocked by browser'));
    }
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    setupHeroTap();
    setupScratchCard();
    setupRSVPCounters();
}

// ===== ADMIN ACCESS (Ctrl+Shift+A) =====
function setupAdminAccess() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            window.location.href = 'admin.html';
        }
    });
}

// ===== SCROLL ANIMATIONS =====
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
});
