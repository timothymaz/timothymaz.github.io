# Image Requirements for Portfolio Website

## Current Status
✅ All image paths have been updated to use `/images/` prefix (correct for Vercel deployment)
✅ `public/images/` directory has been created
❌ Actual image files need to be added to `public/images/`

## Image Files Needed

### 1. Homepage - Profile Photo
**File:** `public/images/tim.jpg`
- **Used in:** [Home.jsx:78](src/pages/Home/Home.jsx#L78)
- **Recommended size:** 800x800px (square)
- **Format:** JPG or PNG
- **Description:** Professional headshot or profile photo of Timothy Mazur

---

### 2. Portfolio Page - Project Thumbnails

#### Terminal Project
**File:** `public/images/terminal_project_thumbnail.jpg`
- **Used in:** [Portfolio.jsx:17](src/pages/Portfolio/Portfolio.jsx#L17)
- **Recommended size:** 600x360px (5:3 aspect ratio)
- **Format:** JPG
- **Description:** Screenshot of the Interactive Terminal project with Matrix rain effect

#### XSS/SQL Demonstrator
**File:** `public/images/xss_sql_project_thumbnail.jpg`
- **Used in:** [Portfolio.jsx:33](src/pages/Portfolio/Portfolio.jsx#L33)
- **Recommended size:** 600x360px (5:3 aspect ratio)
- **Format:** JPG
- **Description:** Screenshot of the XSS/SQL injection demonstration tool

#### Port Scanner
**File:** `public/images/port_scanner_thumbnail.jpg`
- **Used in:** [Portfolio.jsx:49](src/pages/Portfolio/Portfolio.jsx#L49)
- **Recommended size:** 600x360px (5:3 aspect ratio)
- **Format:** JPG
- **Description:** Screenshot of the Python port scanner GUI

#### Startup Manager
**File:** `public/images/startup_manager_thumbnail.jpg`
- **Used in:** [Portfolio.jsx:64](src/pages/Portfolio/Portfolio.jsx#L64)
- **Recommended size:** 600x360px (5:3 aspect ratio)
- **Format:** JPG
- **Description:** Screenshot of the Windows startup manager interface

---

### 3. Blog Page - Article Images

#### Blog Post 1: Malware Analysis
**Thumbnail:** `public/images/malware_analysis_thumbnail.jpg`
- **Used in:** [blogData.js:112](src/pages/Blog/blogData.js#L112)
- **Recommended size:** 400x250px
- **Format:** JPG

**Featured Image:** `public/images/malware_analysis_featured.jpg`
- **Used in:** [blogData.js:113](src/pages/Blog/blogData.js#L113)
- **Recommended size:** 1200x600px
- **Format:** JPG

#### Blog Post 2: Vendor Evaluation
**Thumbnail:** `public/images/vendor_evaluation_thumbnail.jpg`
- **Used in:** [blogData.js:276](src/pages/Blog/blogData.js#L276)
- **Recommended size:** 400x250px
- **Format:** JPG

**Featured Image:** `public/images/vendor_evaluation_featured.jpg`
- **Used in:** [blogData.js:277](src/pages/Blog/blogData.js#L277)
- **Recommended size:** 1200x600px
- **Format:** JPG

#### Blog Post 3: ZTNA Deployment
**Thumbnail:** `public/images/ztna_deployment_thumbnail.jpg`
- **Used in:** [blogData.js:462](src/pages/Blog/blogData.js#L462)
- **Recommended size:** 400x250px
- **Format:** JPG

**Featured Image:** `public/images/ztna_deployment_featured.jpg`
- **Used in:** [blogData.js:463](src/pages/Blog/blogData.js#L463)
- **Recommended size:** 1200x600px
- **Format:** JPG

#### Blog Post 4: Endpoint Security
**Thumbnail:** `public/images/endpoint_security_thumbnail.jpg`
- **Used in:** [blogData.js:693](src/pages/Blog/blogData.js#L693)
- **Recommended size:** 400x250px
- **Format:** JPG

**Featured Image:** `public/images/endpoint_security_featured.jpg`
- **Used in:** [blogData.js:694](src/pages/Blog/blogData.js#L694)
- **Recommended size:** 1200x600px
- **Format:** JPG

#### Blog Post 5: Incident Response
**Thumbnail:** `public/images/incident_response_thumbnail.jpg`
- **Used in:** [blogData.js:962](src/pages/Blog/blogData.js#L962)
- **Recommended size:** 400x250px
- **Format:** JPG

**Featured Image:** `public/images/incident_response_featured.jpg`
- **Used in:** [blogData.js:963](src/pages/Blog/blogData.js#L963)
- **Recommended size:** 1200x600px
- **Format:** JPG

---

## Complete File List (15 images total)

```
public/
  images/
    ├── tim.jpg                                    # Profile photo (PRIORITY)
    ├── terminal_project_thumbnail.jpg             # Portfolio project
    ├── xss_sql_project_thumbnail.jpg              # Portfolio project
    ├── port_scanner_thumbnail.jpg                 # Portfolio project
    ├── startup_manager_thumbnail.jpg              # Portfolio project
    ├── malware_analysis_thumbnail.jpg             # Blog post
    ├── malware_analysis_featured.jpg              # Blog post
    ├── vendor_evaluation_thumbnail.jpg            # Blog post
    ├── vendor_evaluation_featured.jpg             # Blog post
    ├── ztna_deployment_thumbnail.jpg              # Blog post
    ├── ztna_deployment_featured.jpg               # Blog post
    ├── endpoint_security_thumbnail.jpg            # Blog post
    ├── endpoint_security_featured.jpg             # Blog post
    ├── incident_response_thumbnail.jpg            # Blog post
    └── incident_response_featured.jpg             # Blog post
```

---

## How to Add Images

### Option 1: Use Your Own Photos/Screenshots
1. Take screenshots of your actual projects
2. Use a professional headshot for `tim.jpg`
3. Create or find cybersecurity-themed images for blog posts
4. Resize images to recommended dimensions
5. Save them to `public/images/` with the exact filenames listed above

### Option 2: Temporary Placeholders (for testing)
You can use free stock photos from:
- **Unsplash:** https://unsplash.com/ (search: "cybersecurity", "coding", "terminal")
- **Pexels:** https://www.pexels.com/
- **Pixabay:** https://pixabay.com/

### Option 3: Generate AI Images
Use AI image generators like:
- **DALL-E**
- **Midjourney**
- **Stable Diffusion**

Example prompts:
- "Professional cybersecurity analyst headshot"
- "Terminal window with matrix code effect"
- "Cybersecurity dashboard with graphs and alerts"

---

## Image Optimization Tips

Before adding images to the project:
1. **Compress images** to reduce file size (use TinyPNG or ImageOptim)
2. **Use appropriate formats:**
   - JPG for photos and complex images
   - PNG for graphics with transparency
   - WebP for best compression (if browser support is not a concern)
3. **Optimize dimensions** - don't upload 4K images if you only need 600px width
4. **Use descriptive filenames** (already done for you)

---

## Testing Images Locally

After adding images:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Then open http://localhost:4173 and verify:
- ✅ Profile photo displays on homepage
- ✅ Portfolio project thumbnails display
- ✅ Blog featured images display
- ✅ Blog thumbnail images display
- ✅ No broken image icons

---

## Deployment to Vercel

Once images are added and tested locally:

```bash
# Stage all changes
git add .

# Commit
git commit -m "Add images for portfolio and blog pages"

# Push to GitHub
git push origin main
```

Vercel will automatically detect the changes and redeploy.
The images will be available at `https://timothymazur.com/images/[filename]`

---

## Priority Order

1. **HIGH PRIORITY:** `tim.jpg` - Profile photo (homepage is currently showing broken image)
2. **MEDIUM PRIORITY:** Portfolio thumbnails (4 files)
3. **LOW PRIORITY:** Blog images (10 files) - Blog works without images, but they enhance UX

---

## Notes

- All image paths now use `/images/` prefix (correct for Vercel deployment)
- Images are served from the `public` folder, which Vite copies to the root of the dist folder
- The `vite.config.js` already includes `images/**/*` in the PWA assets configuration
- Images will be cached by the service worker for offline access
