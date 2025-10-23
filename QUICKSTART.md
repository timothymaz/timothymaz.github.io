# 🚀 Quick Start Guide

## Your Portfolio Just Got a MAJOR Upgrade!

Your site went from basic HTML/CSS to a modern React-powered web application with animations, dark mode, and professional features.

## See It In Action (2 Commands)

```bash
# 1. Start the dev server
npm run dev

# 2. Open http://localhost:3000
```

## Deploy to GitHub Pages (1 Command)

```bash
# Push to GitHub - automatic deployment configured!
git add .
git commit -m "Launch new portfolio"
git push origin main
```

Then go to: https://timothymazur.com (updates in ~2 minutes)

## What You Got

### 🎨 Visual Features
- **3 Themes**: Light, Dark, and Cyber (click sun/moon icon)
- **Smooth Animations**: Scroll-triggered effects throughout
- **Mobile Responsive**: Perfect on phone, tablet, desktop
- **Modern Design**: Professional gradient accents and shadows

### ⚡ Technical Features
- **React 18**: Modern component architecture
- **Framer Motion**: Buttery smooth animations
- **Progressive Web App**: Installable on mobile devices
- **Dark Mode**: Persists across sessions
- **Code Splitting**: Fast page loads
- **SEO Optimized**: Meta tags, structured data
- **Accessible**: WCAG compliant

### 📱 Pages
1. **Home** - Hero, About, Skills, Experience
2. **Portfolio** - Project showcase with filtering
3. **Contact** - All contact methods with links
4. **Terminal** - Your interactive terminal (preserved)

## Quick Customization

### Change Your Info

**Contact Details** → `src/pages/Contact/Contact.jsx`
```javascript
// Line ~12
{
  value: 'YOUR_EMAIL@gmail.com',
  link: 'mailto:YOUR_EMAIL@gmail.com',
}
```

**Social Links** → `src/components/Footer/Footer.jsx`
```javascript
// Line ~10
{
  url: 'YOUR_LINKEDIN_URL',
  icon: <FiLinkedin />
}
```

### Add a Project

**Portfolio** → `src/pages/Portfolio/Portfolio.jsx`
```javascript
// Line ~15
{
  id: 3,
  title: 'Your New Project',
  category: 'security',
  description: 'What it does...',
  image: '/images/project.jpg',
  link: '/project-url',
  features: ['Feature 1', 'Feature 2']
}
```

### Change Colors

**Theme** → `src/styles/variables.css`
```css
/* Line ~8 */
--accent-primary: #00d4aa;  /* Your brand color */
--accent-secondary: #0099ff; /* Secondary color */
```

## Testing Checklist

Before deploying, test these:

- [ ] Click through all navigation links
- [ ] Test theme switching (sun/moon icon)
- [ ] Open on mobile (or resize browser small)
- [ ] Check all portfolio project links work
- [ ] Verify contact links (email, LinkedIn, etc.)
- [ ] Test Terminal redirect
- [ ] Scroll through Home page (watch animations)

## Deployment Methods

### Method 1: GitHub Actions (Automatic - Recommended)
```bash
git push origin main
# Done! GitHub builds and deploys automatically
```

### Method 2: Manual
```bash
npm run build
# Upload dist/ folder to your host
```

## File Structure (Simplified)

```
timothymaz.github.io/
├── src/                 # React source code
│   ├── pages/          # Home, Portfolio, Contact
│   ├── components/     # Header, Footer, etc.
│   └── styles/         # CSS files
├── Terminal/           # Your terminal (untouched)
├── XSSSQL/            # Your XSS demo (untouched)
├── images/            # Your images (untouched)
└── backup_old_site/   # Your old site (backup)
```

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

## Troubleshooting

**"Port 3000 already in use"**
```bash
# Change port in vite.config.js or kill the process
```

**"Build failed"**
```bash
rm -rf node_modules
npm install
npm run build
```

**"Images not loading"**
- Images go in `public/images/` or `images/`
- Reference as `/images/your-image.jpg`

## Support

- **Full Guide**: See `DEPLOYMENT.md`
- **README**: See `README.md`
- **Issues**: Check browser console (F12)

## Next Steps

1. ✅ Test locally (`npm run dev`)
2. ✅ Update your content/images
3. ✅ Push to GitHub
4. ✅ Share your awesome new portfolio!

---

**Pro Tip**: The site remembers your theme choice (Light/Dark/Cyber) even after refresh!

**Cyber Theme**: Click the theme toggle 3 times for the Matrix-style hacker theme 🟢
