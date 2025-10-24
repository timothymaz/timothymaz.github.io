#!/usr/bin/env node

/**
 * Auto-generate automotive photo data from folder contents
 *
 * Usage: npm run photos
 *
 * This script scans all folders in public/images/automotive/
 * and automatically creates the automotiveData.js file with all photos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder configuration - edit this to add new events
const folderConfig = {
  'my_944': {
    category: 'porsche944',
    label: 'My Porsche 944',
    defaultEvent: 'Personal Photography',
    defaultLocation: 'Pennsylvania'
  },
  'moab': {
    category: 'road_trips',
    label: 'Moab',
    defaultEvent: 'Road Trip',
    defaultLocation: 'Moab, Utah'
  },
  'vermont': {
    category: 'road_trips',
    label: 'Vermont',
    defaultEvent: 'Road Trip',
    defaultLocation: 'Vermont'
  },
  'Colarado': {
    category: 'road_trips',
    label: 'Colorado',
    defaultEvent: 'Road Trip',
    defaultLocation: 'Colorado'
  },
  '944_tent': {
    category: 'events',
    label: '944 Tent',
    defaultEvent: '944 Tent Event',
    defaultLocation: 'Various'
  },
  'tough_mudder_2024': {
    category: 'other',
    label: 'Tough Mudder 2024',
    defaultEvent: 'Tough Mudder',
    defaultLocation: 'Pennsylvania'
  },
  'tough_mudder_2025': {
    category: 'other',
    label: 'Tough Mudder 2025',
    defaultEvent: 'Tough Mudder',
    defaultLocation: 'Pennsylvania'
  },
  'light_painting': {
    category: 'creative',
    label: 'Light Painting',
    defaultEvent: 'Light Painting Photography',
    defaultLocation: 'Studio'
  },
  'blue_gt3rs': {
    category: 'client_cars',
    label: 'Blue GT3 RS',
    defaultEvent: 'Car Photography',
    defaultLocation: 'Pennsylvania'
  },
  '992c4s': {
    category: 'client_cars',
    label: '992 C4S',
    defaultEvent: 'Car Photography',
    defaultLocation: 'Pennsylvania'
  },
  'gridlife': {
    category: 'gridlife',
    label: 'GRIDLIFE',
    defaultEvent: 'GRIDLIFE Motorsports',
    defaultLocation: 'Various Tracks'
  },
  '944fest': {
    category: '944fest',
    label: '944Fest',
    defaultEvent: '944Fest',
    defaultLocation: 'VIR'
  },
  'cars_coffee': {
    category: 'cars_coffee',
    label: 'Cars & Coffee',
    defaultEvent: 'Cars & Coffee',
    defaultLocation: 'Local Meet'
  },
  'Cars & Cigars 5-15-22': {
    category: 'events',
    label: 'Cars & Cigars',
    defaultEvent: 'Cars & Cigars Event',
    defaultLocation: 'Pennsylvania'
  },
  'pca_events': {
    category: 'pca',
    label: 'PCA Events',
    defaultEvent: 'Porsche Club of America',
    defaultLocation: 'Pennsylvania'
  },
  'Max Attack': {
    category: 'events',
    label: 'Max Attack',
    defaultEvent: 'Max Attack Event',
    defaultLocation: 'Pennsylvania'
  },
  'Max attack install gary ott': {
    category: 'client_cars',
    label: 'Max Attack Install - Gary Ott',
    defaultEvent: 'Installation Photography',
    defaultLocation: 'Pennsylvania'
  },
  'NJ Mclaren RaceTrack': {
    category: 'events',
    label: 'NJ McLaren Track Day',
    defaultEvent: 'Track Day',
    defaultLocation: 'New Jersey'
  },
  'Turn 14': {
    category: 'events',
    label: 'Turn 14',
    defaultEvent: 'Track Event',
    defaultLocation: 'Various'
  },
  'Setup': {
    category: 'other',
    label: 'Setup & Installation',
    defaultEvent: 'Setup Photography',
    defaultLocation: 'Various'
  },
  'graduation': {
    category: 'other',
    label: 'Graduation',
    defaultEvent: 'Graduation Photography',
    defaultLocation: 'Pennsylvania'
  },
  'Ambler Cnc': {
    category: 'other',
    label: 'Ambler CNC',
    defaultEvent: 'Commercial Photography',
    defaultLocation: 'Ambler, PA'
  },
  'LULU Schriners': {
    category: 'other',
    label: 'LULU Shriners',
    defaultEvent: 'Event Photography',
    defaultLocation: 'Pennsylvania'
  },
  'Eagles': {
    category: 'other',
    label: 'Eagles',
    defaultEvent: 'Sports Photography',
    defaultLocation: 'Philadelphia, PA'
  }
};

const automotiveDir = path.join(__dirname, '../public/images/automotive');
const outputFile = path.join(__dirname, '../src/pages/Automotive/automotiveData.js');

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

console.log('🔍 Scanning automotive folders for photos...\n');

let photoId = 1;
const allPhotos = [];
const categoryStats = {};

// Scan each configured folder
Object.keys(folderConfig).forEach(folderName => {
  const folderPath = path.join(automotiveDir, folderName);
  const config = folderConfig[folderName];

  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder not found: ${folderName} (skipping)`);
    return;
  }

  // Read all files in folder
  const files = fs.readdirSync(folderPath);

  // Filter for image files only
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  }).sort(); // Sort alphabetically

  if (imageFiles.length === 0) {
    console.log(`📂 ${folderName}: No images found`);
    return;
  }

  console.log(`📸 ${folderName}: Found ${imageFiles.length} images`);

  // Create photo entries
  imageFiles.forEach(filename => {
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);

    allPhotos.push({
      id: photoId++,
      thumbnail: `/images/automotive/${folderName}/${filename}`,
      fullSize: `/images/automotive/${folderName}/${filename}`,
      caption: `${config.label} - ${nameWithoutExt}`,
      category: config.category,
      event: config.defaultEvent,
      location: config.defaultLocation,
      date: new Date().toISOString().split('T')[0],
      folder: folderName,
      filename: filename
    });
  });

  // Track category stats
  if (!categoryStats[config.category]) {
    categoryStats[config.category] = 0;
  }
  categoryStats[config.category] += imageFiles.length;
});

console.log(`\n✅ Total photos found: ${allPhotos.length}\n`);

// Generate categories dynamically
const categories = [
  { id: 'all', label: 'All Photos', count: allPhotos.length }
];

const categoryLabels = {
  'porsche944': 'My Porsche 944',
  'road_trips': 'Road Trips',
  'events': 'Events',
  'gridlife': 'GRIDLIFE',
  '944fest': '944Fest',
  'cars_coffee': 'Cars & Coffee',
  'pca': 'PCA Events',
  'creative': 'Creative Photography',
  'client_cars': 'Client Cars',
  'other': 'Other'
};

Object.keys(categoryStats).forEach(catId => {
  categories.push({
    id: catId,
    label: categoryLabels[catId] || catId,
    count: categoryStats[catId]
  });
});

// Generate the automotiveData.js file
const fileContent = `// Automotive photography data - AUTO-GENERATED
// DO NOT EDIT THIS FILE MANUALLY!
// Run: npm run photos to regenerate

// Generated on: ${new Date().toLocaleString()}
// Total photos: ${allPhotos.length}

export const automotivePhotos = ${JSON.stringify(allPhotos, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};

export const carStats = [
  { label: 'Year', value: '1987' },
  { label: 'Model', value: 'Porsche 944' },
  { label: 'Color', value: 'Summer Yellow' },
  { label: 'Engine', value: '2.5L I4' },
  { label: 'Power', value: '147 HP' },
  { label: 'Status', value: 'Ongoing Restoration' }
];

export const communityInvolvement = [
  {
    id: 1,
    organization: 'Porsche Club of America',
    role: 'Volunteer Photographer/Videographer',
    description: 'Capturing track days, social events, and member stories for the local PCA chapter. Providing professional photography and video content for club communications and social media.',
    icon: '📸',
    website: 'https://www.pca.org/'
  },
  {
    id: 2,
    organization: 'Cars & Coffee',
    role: 'Monthly Volunteer & Content Creator',
    description: 'Organizing and documenting monthly automotive meetups. Creating photo and video content to promote the local car community and share the passion for automobiles.',
    icon: '☕',
    website: null
  },
  {
    id: 3,
    organization: 'GRIDLIFE',
    role: 'Event Photographer',
    description: 'Documenting track action, drift competitions, and time attack events. Capturing the intensity and excitement of grassroots motorsports across the Midwest and Southeast.',
    icon: '🏁',
    website: 'https://gridlife.com/'
  },
  {
    id: 4,
    organization: '944Fest',
    role: 'Official Photographer/Videographer',
    description: 'Annual 944-specific event photography covering track sessions, tech sessions, and the largest gathering of Porsche 944 enthusiasts in North America.',
    icon: '🏎️',
    website: 'https://944fest.com/'
  }
];

// Folder configuration (for reference)
export const folderConfig = ${JSON.stringify(folderConfig, null, 2)};
`;

// Write the file
fs.writeFileSync(outputFile, fileContent, 'utf8');

console.log(`📝 Generated: ${outputFile}`);
console.log(`\n🎉 Done! Refresh your browser to see the photos.\n`);

// Print category breakdown
console.log('📊 Category Breakdown:');
categories.forEach(cat => {
  console.log(`   ${cat.label}: ${cat.count} photos`);
});
console.log('');
