# Automotive Photography - Folder-Based System

## 🚀 Quick Start - Super Easy!

**Just follow these 3 steps:**

1. **Copy your photos** from your photography drives to the folders below
2. **Rename them** to numbers: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. **Refresh the page** - they automatically appear!

No code editing needed! 🎉

---

## 📁 Available Folders

Copy your images into these folders:

```
public/images/automotive/
├── my_944/              ← Your Summer Yellow 944 photos (up to 20 images)
├── moab/                ← Moab road trip photos (up to 15 images)
├── vermont/             ← Vermont photos (up to 15 images)
├── 944_tent/            ← 944 Tent event photos (up to 10 images)
├── tough_mudder_2024/   ← Tough Mudder 2024 (up to 10 images)
├── tough_mudder_2025/   ← Tough Mudder 2025 (up to 10 images)
├── light_painting/      ← Light painting photography (up to 10 images)
├── blue_gt3rs/          ← Blue GT3 RS shoot (up to 15 images)
├── gridlife/            ← GRIDLIFE events (up to 20 images)
├── 944fest/             ← 944Fest events (up to 15 images)
├── cars_coffee/         ← Cars & Coffee meets (up to 15 images)
└── pca_events/          ← PCA events (up to 15 images)
```

---

## 🎯 How to Add Photos - Step by Step

### Example: Adding Moab Photos

1. **Navigate to your photography folder:**
   ```
   E:\Photography\2025\Moab\
   ```

2. **Pick your best photos** (up to 15)

3. **Rename them in order:**
   - Your best photo → `1.jpg`
   - Second best → `2.jpg`
   - Third → `3.jpg`
   - ... and so on

4. **Copy to the moab folder:**
   ```
   Copy files to:
   timothymaz.github.io\public\images\automotive\moab\
   ```

5. **Done!** Refresh http://localhost:3002/automotive

### For Other Events - Same Process!

**Vermont trip:**
- Copy to: `vermont/`
- Name as: `1.jpg`, `2.jpg`, etc.

**Your 944:**
- Copy to: `my_944/`
- Name as: `1.jpg`, `2.jpg`, etc.

**Blue GT3 RS shoot:**
- Copy to: `blue_gt3rs/`
- Name as: `1.jpg`, `2.jpg`, etc.

---

## 🎨 Image Guidelines

### File Naming
✅ **Correct:** `1.jpg`, `2.jpg`, `3.jpg`
❌ **Wrong:** `IMG_1234.jpg`, `moab_sunset.jpg`, `DSC001.jpg`

### File Format
- **Extension:** `.jpg` (lowercase)
- **Format:** JPEG only (for now)

### Image Size & Quality
- **Recommended:** 1600-2400px wide
- **File Size:** < 500KB per image (compress with TinyPNG.com)
- **Aspect Ratio:** 4:3 or 3:2 works best

### Quick Batch Rename (Windows)

1. Select all photos in folder
2. Right-click first image → Rename
3. Type `1.jpg` and press Enter
4. Windows auto-numbers: `1.jpg`, `2.jpg`, `3.jpg`...

---

## ⚙️ Advanced: Add New Event Folders

Want to add a new event/location? Easy!

### 1. Create the folder
```bash
cd public/images/automotive/
mkdir my_new_event
```

### 2. Update the configuration
Edit: `src/pages/Automotive/automotiveData.js`

Add to the `eventFolders` array:
```javascript
{
  folder: 'my_new_event',           // Must match folder name
  category: 'events',               // Which filter category?
  label: 'My New Event',            // Display name
  defaultEvent: 'Event Name',       // Event metadata
  defaultLocation: 'Location',      // Location metadata
  imageCount: 15                    // How many images (max)
}
```

### Available Categories:
- `porsche944` - My Porsche 944
- `road_trips` - Road Trips
- `events` - Events
- `gridlife` - GRIDLIFE
- `944fest` - 944Fest
- `cars_coffee` - Cars & Coffee
- `pca` - PCA Events
- `creative` - Creative Photography
- `client_cars` - Client Cars
- `other` - Other

### 3. Add your photos
Number them `1.jpg`, `2.jpg`, etc. in the new folder

### 4. Refresh!
The gallery auto-updates with your new category

---

## 📸 Your Photography Locations

Based on your setup, your photos are in:

### Main Photography Drives:
- `E:\Photography\2023\`
- `E:\Photography\`
- `V:\Photography\2025\`

### Workflow:
1. **Find your best shots** from these drives
2. **Export/compress** (< 500KB each)
3. **Batch rename** to numbers
4. **Copy to appropriate folder** in automotive/
5. **Refresh browser** - instant gallery update!

---

## 🎯 Tips for Best Results

### Photo Selection
- **Quality over quantity** - only your best shots
- **Tell a story** - variety of angles and moments
- **Mix it up** - wide shots, details, action, static

### Organization
- **Start with your favorites** (1.jpg should be your best)
- **Group similar themes** per folder
- **Keep it simple** - don't mix unrelated events

### Optimization
- **Use TinyPNG** - Compress images before uploading
- **Batch process** - Save time with Photoshop actions
- **Consistent editing** - Same style across event

---

## 🔧 Troubleshooting

### Photos not showing?
1. Check file names are `1.jpg`, `2.jpg` (lowercase .jpg)
2. Make sure photos are in correct folder
3. Hard refresh browser: `Ctrl+Shift+R`
4. Check browser console (F12) for 404 errors

### Want more than the max images?
Edit `automotiveData.js` and increase `imageCount` for that folder:
```javascript
{
  folder: 'moab',
  imageCount: 30  // Increased from 15
}
```

### Photos loading slowly?
- Compress images more (target 200-300KB)
- Resize to max 1920px wide
- Use WebP format (requires code change)

### Need different aspect ratios?
The gallery supports any ratio - just keep consistent within each event

---

## 📊 Current Setup Summary

**Total possible photos:** 180 images
- My 944: 20 photos
- Moab: 15 photos
- Vermont: 15 photos
- 944 Tent: 10 photos
- Tough Mudder 2024: 10 photos
- Tough Mudder 2025: 10 photos
- Light Painting: 10 photos
- Blue GT3 RS: 15 photos
- GRIDLIFE: 20 photos
- 944Fest: 15 photos
- Cars & Coffee: 15 photos
- PCA Events: 15 photos

**Categories:** 11 dynamic categories
**System:** Automatic folder scanning
**Format:** JPEG images
**Naming:** Sequential numbers (1.jpg, 2.jpg...)

---

## 🎉 That's It!

No complex database, no JSON editing, no manual image paths.

**Just drop photos in folders, number them, and go!**

Questions? Check the code comments in:
`src/pages/Automotive/automotiveData.js`
