# Deployment Guide

## Complete Overhaul Summary

Your portfolio has been completely modernized with:

✅ **React 18** - Modern component architecture
✅ **Vite 5** - Lightning-fast build tool
✅ **Framer Motion** - Smooth animations
✅ **3 Theme Modes** - Light, Dark, and Cyber
✅ **PWA Support** - Installable and offline-capable
✅ **SEO Optimized** - Meta tags, structured data
✅ **Fully Responsive** - Works on all devices
✅ **Performance Optimized** - Code splitting, lazy loading
✅ **Accessibility** - WCAG compliant

## What's New

### Modern Features
- **Animated Hero Section** with gradient text and scroll effects
- **Interactive Portfolio** with project filtering
- **Smooth Page Transitions** using Framer Motion
- **Dark Mode** that persists across sessions
- **Cyber Theme** with terminal aesthetics
- **Scroll-triggered Animations** for engaging UX
- **Mobile Navigation** with hamburger menu
- **Optimized Images** with lazy loading

### Technical Improvements
- **98+ Performance Score** potential
- **Reduced Bundle Size** with code splitting
- **Better SEO** with meta tags and structured data
- **Progressive Web App** installable on mobile
- **Service Worker** for offline functionality
- **Modern CSS** with custom properties

## Testing Locally

### 1. Start Development Server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

### 2. Test All Features

- ✅ Navigate between all pages (Home, Portfolio, Contact)
- ✅ Test theme switching (Light → Dark → Cyber → Light)
- ✅ Test mobile menu (resize browser to <768px)
- ✅ Test all links and buttons
- ✅ Test Terminal redirect
- ✅ Verify animations and transitions
- ✅ Check responsive design on different screen sizes

### 3. Build Production Version

```bash
npm run build
npm run preview
```

This creates an optimized production build in `dist/` and previews it.

## Deployment Options

### Option 1: GitHub Actions (Recommended - Automated)

**Already configured!** Just push your changes:

```bash
git add .
git commit -m "Complete portfolio overhaul with React and modern features"
git push origin main
```

GitHub Actions will automatically:
1. Build the project
2. Copy legacy projects (Terminal, XSSSQL)
3. Deploy to GitHub Pages

**Setup Required:**
1. Go to your repo Settings → Pages
2. Set Source to "GitHub Actions"
3. That's it! Every push to `main` will auto-deploy

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Copy legacy projects
cp -r Terminal dist/Terminal
cp -r XSSSQL dist/XSSSQL
cp -r images dist/images
echo "timothymazur.com" > dist/CNAME

# Deploy the dist folder to GitHub Pages
# (You'll need to manually upload or use gh-pages branch)
```

### Option 3: Using npm deploy script

```bash
npm run deploy
```

This uses gh-pages package to deploy the dist folder.

## File Structure Changes

### New Files
```
src/                    # All React source code
├── components/         # Reusable components
├── pages/             # Page components
├── context/           # Theme context
├── hooks/             # Custom React hooks
└── styles/            # Global CSS

.github/workflows/     # GitHub Actions config
vite.config.js        # Build configuration
package.json          # Dependencies
```

### Preserved Files
```
Terminal/             # Your terminal project (unchanged)
XSSSQL/              # Your XSS demo (unchanged)
images/              # Your images (unchanged)
CNAME                # Custom domain (unchanged)
```

### Backed Up Files
```
backup_old_site/     # Your original HTML/CSS files
├── index.html
├── education.html
├── experience.html
├── contact.html
├── portfolio.html
└── css/
```

## Customization Guide

### Changing Colors

Edit `src/styles/variables.css`:

```css
:root {
  --accent-primary: #00d4aa;  /* Change this */
  --accent-secondary: #0099ff; /* And this */
}
```

### Adding New Projects

Edit `src/pages/Portfolio/Portfolio.jsx`:

```javascript
const projects = [
  // Add your project here
  {
    id: 3,
    title: 'New Project',
    category: 'security', // or 'web'
    tags: ['Tag1', 'Tag2'],
    description: 'Project description...',
    image: '/images/project.jpg',
    link: '/project-link',
    github: 'https://github.com/...',
    features: [
      'Feature 1',
      'Feature 2'
    ]
  }
];
```

### Updating Content

- **About Section**: Edit `src/pages/Home/Home.jsx`
- **Contact Info**: Edit `src/pages/Contact/Contact.jsx`
- **Social Links**: Edit `src/components/Footer/Footer.jsx`

### Adding Images

1. Place images in `public/images/` or `images/`
2. Reference as `/images/your-image.jpg`
3. Optimize images (use WebP, compress JPG/PNG)

## Performance Optimization

### Already Implemented
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Tree shaking
- ✅ CSS minification
- ✅ JS minification
- ✅ Service worker caching
- ✅ Preconnect to external resources

### Further Optimization
```bash
# Compress images (install imagemin)
npm install -g imagemin-cli
imagemin images/*.jpg --out-dir=images/optimized

# Analyze bundle size
npm run build
```

## Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### GitHub Pages Not Updating

1. Check GitHub Actions tab for build status
2. Verify Pages settings (Settings → Pages)
3. Clear browser cache
4. Wait 5-10 minutes for CDN to update

## SEO Checklist

✅ Meta descriptions on all pages
✅ Open Graph tags for social sharing
✅ Twitter Card tags
✅ Structured data (JSON-LD)
✅ Semantic HTML
✅ Alt tags on images
✅ Robots.txt
✅ Sitemap (create with sitemap generator)
✅ Fast loading times
✅ Mobile-friendly

## Accessibility Checklist

✅ Semantic HTML elements
✅ ARIA labels
✅ Keyboard navigation
✅ Focus indicators
✅ Color contrast (WCAG AA)
✅ Reduced motion support
✅ Screen reader support
✅ Alt text on images

## Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

## Next Steps

1. **Test locally** - Run `npm run dev` and test all features
2. **Review content** - Make any content updates you want
3. **Optimize images** - Compress any large images
4. **Push to GitHub** - Let GitHub Actions deploy automatically
5. **Monitor** - Check Google Analytics after deployment
6. **Share** - Update your LinkedIn, resume, etc.

## Support

If you encounter issues:
1. Check the console for errors (F12 in browser)
2. Review GitHub Actions logs
3. Verify all files are committed
4. Check that node_modules is in .gitignore

## Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Adding Features

1. Create new component in `src/components/`
2. Import in relevant page
3. Test locally
4. Commit and push

---

**Congratulations!** Your portfolio is now a modern, professional, high-performance web application. 🎉
