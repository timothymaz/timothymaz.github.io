# Automotive Photography Gallery - Quick Start Guide

## 🎯 Super Simple Photo Upload System

**No coding required!** Just follow these steps:

---

## Step 1: Find Your Photos

Your photography is stored in:
- `E:\Photography\2023\`
- `E:\Photography\`
- `V:\Photography\2025\`

Pick your best shots from these drives.

---

## Step 2: Prepare Your Photos

### For each event/location:

1. **Select your best 10-20 photos**
2. **Export them** (recommended: 1920px wide, < 500KB each)
3. **Batch rename** them to: `1.jpg`, `2.jpg`, `3.jpg`, etc.

### Windows Quick Rename:
1. Select all photos
2. Right-click first image → Rename
3. Type `1.jpg` and hit Enter
4. Windows auto-numbers them!

---

## Step 3: Copy to Folders

Copy your numbered photos to the appropriate folder in:
```
timothymaz.github.io\public\images\automotive\
```

### Available Folders:

| Folder Name | Use For | Max Photos |
|------------|---------|------------|
| `my_944/` | Your Summer Yellow Porsche 944 | 20 |
| `moab/` | Moab road trip | 15 |
| `vermont/` | Vermont trip | 15 |
| `944_tent/` | 944 Tent events | 10 |
| `tough_mudder_2024/` | Tough Mudder 2024 | 10 |
| `tough_mudder_2025/` | Tough Mudder 2025 | 10 |
| `light_painting/` | Light painting photography | 10 |
| `blue_gt3rs/` | Blue GT3 RS shoot | 15 |
| `gridlife/` | GRIDLIFE events | 20 |
| `944fest/` | 944Fest | 15 |
| `cars_coffee/` | Cars & Coffee | 15 |
| `pca_events/` | PCA events | 15 |

---

## Step 4: Refresh & Enjoy!

1. Open http://localhost:3002/automotive
2. Hard refresh: `Ctrl+Shift+R`
3. Your photos appear automatically!

---

## 📋 Example Workflow

### Adding Moab Photos:

```
1. Go to: E:\Photography\2025\Moab\
2. Pick your 15 best shots
3. Export as JPG (1920px wide, < 500KB)
4. Rename to: 1.jpg, 2.jpg, 3.jpg, ... 15.jpg
5. Copy all to: timothymaz.github.io\public\images\automotive\moab\
6. Refresh browser
7. Done! ✅
```

---

## 🎨 Photo Tips

### Image Quality
- **Size:** 1600-2400px wide
- **File Size:** < 500KB (use TinyPNG.com)
- **Format:** JPEG (.jpg lowercase)
- **Aspect:** 4:3 or 3:2 works best

### Selection
- **Your best work first** (1.jpg = your favorite)
- **Variety:** Mix wide shots, details, action
- **Consistent editing** within each event
- **Quality over quantity**

---

## ⚙️ Add New Event/Location

### Quick Method:

1. **Create folder:**
   ```
   cd public\images\automotive\
   mkdir my_new_event
   ```

2. **Edit config:**
   Open: `src\pages\Automotive\automotiveData.js`

   Add to `eventFolders` array:
   ```javascript
   {
     folder: 'my_new_event',
     category: 'events',  // or 'road_trips', 'creative', etc.
     label: 'My New Event',
     defaultEvent: 'Event Name',
     defaultLocation: 'Location',
     imageCount: 15
   }
   ```

3. **Add photos & refresh!**

---

## 📊 Current Capacity

**Total:** Up to 180 photos across all folders
- Categories auto-update based on photos added
- Empty categories don't appear in filters
- Add more by increasing `imageCount` in config

---

## 🔧 Troubleshooting

### Photos not showing?
- ✅ Check filenames: `1.jpg` not `IMG_1234.jpg`
- ✅ Lowercase .jpg extension
- ✅ Photos in correct folder
- ✅ Hard refresh: `Ctrl+Shift+R`

### Want more photos per event?
Edit `automotiveData.js` and increase `imageCount`

### Photos too large?
Use https://tinypng.com/ to compress

---

## 🎉 That's It!

**No database. No JSON editing. No complex paths.**

**Just: Photos → Folders → Number them → Refresh!**

For detailed info, see: `public/images/automotive/README.md`
