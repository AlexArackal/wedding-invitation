// ===== EDITABLE CONFIGURATION ===== //
// Edit all your wedding details here

const CONFIG = {
    // ===== COUPLE DETAILS =====
    couple: {
        brideName: "Alida Francis",
        groomName: "Alex Sherly",
        surname: "Arackal",
        fullNames: "Alida & Alex"
    },

    // ===== WEDDING CEREMONY =====
    ceremony: {
        date: "10 August 2026",
        dateShort: "10 AUG 2026",
        time: "10:30 AM",
        venue: "St. Joseph's Church Koovappally",
        location: "GRGH+H85, Koovappally, Kerala 686518",
        mapLink: "https://maps.google.com/?q=GRGH+H85,+Koovappally,+Kerala+686518",
        dateObj: new Date(2026, 7, 10, 10, 30, 0) // Month is 0-indexed (7 = August)
    },

    // ===== WEDDING RECEPTION =====
    reception: {
        date: "14 August 2026",
        dateShort: "14 AUG 2026",
        time: "7:00 PM",
        venue: "Hotel Shubham Prestige",
        location: "G826+QM Ramachandrapuram, Telangana",
        mapLink: "https://maps.google.com/?q=G826+QM,+Ramachandrapuram,+Telangana",
        dateObj: new Date(2026, 7, 14, 19, 0, 0) // Month is 0-indexed (7 = August)
    },

    // ===== EMOTIONAL MESSAGE =====
    message: `"Together, we invite you to be part of our love story.<br>
        Your presence is our greatest blessing.<br>
        Let us celebrate this beautiful beginning together."`,

    // ===== IMAGES (REPLACE WITH YOUR OWN) =====
    images: {
        bride: "https://via.placeholder.com/300x600/f0f0f0/999?text=Bride",
        groom: "https://via.placeholder.com/300x600/f0f0f0/999?text=Groom"
    },

    // ===== BACKGROUND MUSIC =====
    music: {
        src: "assets/music.mp3",
        autoPlay: false,
        volume: 0.5
    },

    // ===== WHATSAPP INTEGRATION =====
    whatsapp: {
        phoneNumber: "919999999999", // Replace with your WhatsApp number (country code + number, no + sign)
        prefix: "Hello! I'm confirming my RSVP for"
    },

    // ===== COLORS & THEME =====
    colors: {
        primary: "#d4af37", // Golden
        accent: "#e74c3c", // Red
        secondary: "#3498db", // Blue
        text: "#2c3e50", // Dark
        light: "#fef5e7" // Light cream
    },

    // ===== ANIMATIONS =====
    animations: {
        enableFireworks: true,
        enableButterflies: true,
        enableScratching: true,
        autoPlayMusic: false
    }
};

// Export for use in scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}