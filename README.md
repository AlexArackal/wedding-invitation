# 💍 Premium Wedding Invitation Website

A beautiful, fully responsive, and interactive digital wedding invitation website for Alida Francis Kalapurakal & Alex Sherly Arackal.

## 🌟 Features

### 🎆 Interactive Elements
- **Tap to Open Animation** - Engaging hero section with tap-to-open envelope effect
- **Fireworks Effect** - Celebratory fireworks when opening the invitation
- **Scratch to Reveal** - Interactive scratch card to reveal the wedding date
- **Butterfly Pop Animation** - Butterflies appear when date is revealed
- **Smooth Scrolling** - Premium scroll animations throughout the page
- **Scroll Indicator** - Elegant scroll-down indicator

### 💎 Design Features
- **Mobile-First Responsive Design** - Perfect on all devices (iPhone, Android, tablets, desktop)
- **Premium Golden Theme** - Elegant golden gradient effects and premium typography
- **Smooth Animations** - All animations are optimized and smooth
- **Fast Loading** - Optimized for performance
- **Emotional Typography** - Beautiful serif and sans-serif font combinations

### 📅 Wedding Information Sections
- **Countdown Timer** - Days, hours, minutes, seconds until the wedding
- **Couple Names Section** - Beautiful display of couple names with emotional message
- **Ceremony Details** - Wedding ceremony date, time, venue, and location
- **Reception Details** - Reception date, time, venue, and location
- **Map Integration** - Google Maps links for both venues

### 💌 Guest Interactions
- **RSVP Counter** - Separate counters for wedding ceremony and reception
- **WhatsApp Integration** - Send RSVPs directly via WhatsApp
- **Blessings Section** - Guests can share their blessings and wishes
- **Auto-Scrolling Blessings Display** - Automatically scrolls through received blessings
- **Background Music** - Soft background music (optional, disabled by default)

### 🔐 Admin Panel
- **Overview Dashboard** - Stats for RSVPs and blessings received
- **RSVP Management** - Manually update and manage RSVP counts
- **Blessings Management** - View and delete blessings
- **Settings Page** - Update wedding details and configuration
- **Secure Access** - Access via Ctrl+Shift+A keyboard shortcut

## 📝 How to Customize

### 1. Update Couple Information
Edit `config.js` and update:
```javascript
const CONFIG = {
    couple: {
        brideName: "Your Bride Name",
        groomName: "Your Groom Name",
        surname: "Your Surname",
        fullNames: "Both Names"
    },
    // ... rest of config
};
```

### 2. Update Wedding Details
```javascript
ceremony: {
    date: "Your Date",
    time: "Your Time",
    venue: "Venue Name",
    location: "Location Address",
    mapLink: "Google Maps Link",
    dateObj: new Date(YYYY, MM-1, DD, HH, MM, 0) // For countdown
}
```

### 3. Add Your Photos
Replace placeholder images:
```javascript
images: {
    bride: "path/to/bride-photo.jpg",
    groom: "path/to/groom-photo.jpg"
}
```

### 4. Set WhatsApp Number
```javascript
whatsapp: {
    phoneNumber: "919999999999", // Your WhatsApp number without + sign
    prefix: "Hello! I'm confirming my RSVP for"
}
```

### 5. Add Background Music
Place your music file at `assets/music.mp3` or update the path in `index.html`:
```html
<audio id="backgroundMusic" loop>
    <source src="path/to/your-music.mp3" type="audio/mpeg">
</audio>
```

## 🚀 Deployment

### GitHub Pages (Free)
1. Push code to GitHub
2. Go to repository Settings
3. Scroll to "GitHub Pages"
4. Select `main` branch
5. Your site is live at `https://yourusername.github.io/wedding-invitation`

### Netlify (Free)
1. Connect GitHub repository
2. Deploy automatically

### Vercel (Free)
1. Import GitHub repository
2. One-click deployment

### Custom Domain
1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Point DNS to your hosting
3. Your custom wedding site is ready!

## 📱 File Structure

```
wedding-invitation/
├── index.html           # Main invitation page
├── admin.html          # Admin dashboard
├── styles.css          # Main page styles
├── admin-styles.css    # Admin page styles
├── config.js           # All editable configuration
├── script.js           # Main page functionality
├── admin.js            # Admin panel functionality
├── assets/
│   └── music.mp3       # Background music (optional)
└── README.md           # This file
```

## 🔧 Features Details

### Scratch Card
- Fully interactive scratch-to-reveal effect
- Works on both desktop (mouse) and mobile (touch)
- Triggers butterflies when 50% scratched

### RSVP System
- Local storage-based (no server needed)
- Counter buttons for easy input
- WhatsApp integration for automatic notifications
- Separate tracking for ceremony and reception

### Blessings
- Guests write blessings up to 200 characters
- Auto-sends via WhatsApp to the couple
- Auto-scrolls on the home page
- Admin can view and delete blessings

### Admin Panel
- Access: Press `Ctrl+Shift+A` on the main page
- Dashboard with stats
- Manual RSVP management
- Blessings management (view/delete)
- Settings page for easy configuration updates

## 🎨 Customization Tips

### Change Colors
Edit the colors in `config.js`:
```javascript
colors: {
    primary: "#d4af37",      // Golden
    accent: "#e74c3c",       // Accent color
    secondary: "#3498db",    // Secondary color
    text: "#2c3e50",         // Text color
    light: "#fef5e7"         // Light background
}
```

### Add/Remove Sections
- Each section has a distinct HTML container
- Remove entire `<section>` tags to remove sections
- Modify CSS accordingly

### Custom Message
Edit emotional message in `config.js`:
```javascript
message: `"Your custom message here"`
```

## 🐛 Troubleshooting

### Countdown Not Showing
- Check `dateObj` in `config.js` is correctly formatted
- Ensure date is in future

### WhatsApp Not Opening
- Verify phone number format (country code + number, no + sign)
- Check if WhatsApp is installed on the device

### Images Not Showing
- Verify image paths are correct
- Use full URLs for external images
- Check image file permissions

### Music Not Playing
- Check file path is correct
- Ensure file format is .mp3
- Check autoPlay is enabled in config if desired

## 📞 Support

For issues or customizations:
1. Check the troubleshooting section
2. Review `config.js` for all available options
3. Inspect browser console (F12) for errors

## 📄 License

Free to use and modify for personal wedding websites.

## 💝 Credits

Created with ❤️ for Alida & Alex

---

**Share your special day with the world! 💍✨**
