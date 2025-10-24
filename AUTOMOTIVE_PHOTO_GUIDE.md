# Automotive Photography Gallery - SUPER SIMPLE!

## 🎉 No Renaming Needed!

**Just copy your photos into folders and run one command!**

---

## 📸 How It Works (3 Steps)

### 1. Copy Photos to Folders

From your photography drives (`E:\Photography\`, `V:\Photography\2025\`):

```
Copy photos (any filenames!) to:
timothymaz.github.io\public\images\automotive\

Available folders:
├── my_944/              ← Your Summer Yellow 944
├── moab/                ← Moab road trip
├── vermont/             ← Vermont trip
├── 944_tent/            ← 944 Tent events
├── tough_mudder_2024/   ← Tough Mudder 2024
├── tough_mudder_2025/   ← Tough Mudder 2025
├── light_painting/      ← Light painting
├── blue_gt3rs/          ← Blue GT3 RS shoot
├── gridlife/            ← GRIDLIFE events
├── 944fest/             ← 944Fest
├── cars_coffee/         ← Cars & Coffee
└── pca_events/          ← PCA events
```

**Keep original filenames!** (`IMG_1234.jpg`, `DSC_5678.JPG`, whatever!)

### 2. Run the Magic Command

```bash
npm run photos
```

That's it! The script automatically:
- Scans all folders
- Finds all images (.jpg, .jpeg, .png, .webp, .gif)
- Generates the photo gallery code
- Creates categories automatically

### 3. Refresh Browser

Open: `http://localhost:3002/automotive`

Your photos are live! 🚀

---

## 🎯 Example Workflow

**Adding Moab photos:**

```bash
# 1. Copy your photos
Copy E:\Photography\2025\Moab\*.jpg
  to timothymaz.github.io\public\images\automotive\moab\

# 2. Run the command
npm run photos

# 3. Refresh browser
```

**Output:**
```
📸 moab: Found 15 images
✅ Total photos found: 56
🎉 Done! Refresh your browser to see the photos.
```

---

## 📊 Current Photos

**You already have 41 photos loaded!**

- Vermont: 16 photos ✅
- 944 Tent: 25 photos ✅

Just refresh http://localhost:3002/automotive to see them!

---

## ⚙️ Add New Event/Location

Want a new folder? Easy!

### 1. Create folder
```bash
mkdir public/images/automotive/watkins_glen
```

### 2. Add to config
Edit: `scripts/generatePhotos.js`

Add to `folderConfig` object:
```javascript
'watkins_glen': {
  category: 'road_trips',  // or: events, creative, etc.
  label: 'Watkins Glen',
  defaultEvent: 'Watkins Glen Trip',
  defaultLocation: 'New York'
},
```

### 3. Add photos & run
```bash
# Copy photos to folder
npm run photos
```

Done!

---

## 🎨 Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

**Mixed formats OK!** The script finds them all.

---

## 💡 Tips

### Photo Optimization (NEW! 🚀)
- **Run optimization:** `npm run optimize`
- **What it does:**
  - Creates 600px thumbnails for fast grid loading
  - Creates 1920px optimized full-size images for lightbox
  - Compresses to 85% quality JPEG
  - Reduces file sizes by 60-90%!
- **One-time setup** - only processes new images
- Any original filename works!

### Organization
- Group by event/location (one folder per event)
- Photos sort alphabetically by filename
- Mix of formats is fine

### Batch Operations
- Copy entire folders at once
- No need to rename anything
- Run `npm run photos` after adding photos

---

## 🔧 What The Script Does

```
📂 Scans: public/images/automotive/
📸 Finds: All image files in configured folders
📝 Creates: src/pages/Automotive/automotiveData.js
🎯 Result: Gallery auto-updates with all photos
```

**Generated file includes:**
- Photo paths (thumbnail & full-size)
- Captions (based on folder + filename)
- Categories (auto-grouped)
- Metadata (event, location, date)

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| Add photos to gallery | `npm run photos` |
| Optimize images (FASTER LOADING!) | `npm run optimize` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |

**Page URL:** http://localhost:3002/automotive

---

## 🎉 That's It!

**No manual JSON editing**
**No renaming files**
**No complex configuration**

**Just:**
1. Copy photos to folders
2. `npm run photos`
3. Refresh browser

Your gallery updates automatically! 📸🚗
