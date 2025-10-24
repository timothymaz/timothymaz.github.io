// Automotive photography data - Folder-based system
// Just add images to folders in /public/images/automotive/ and they'll automatically appear!

// Event/Location Configuration
// Add your own folders here - the system will look for images in /public/images/automotive/{folderName}/
export const eventFolders = [
  {
    folder: 'my_944',
    category: 'porsche944',
    label: 'My Porsche 944',
    defaultEvent: 'Personal Photography',
    defaultLocation: 'Pennsylvania',
    imageCount: 20 // How many images to look for (1.jpg, 2.jpg, etc.)
  },
  {
    folder: 'moab',
    category: 'road_trips',
    label: 'Moab Road Trip',
    defaultEvent: 'Road Trip',
    defaultLocation: 'Moab, Utah',
    imageCount: 15
  },
  {
    folder: 'vermont',
    category: 'road_trips',
    label: 'Vermont',
    defaultEvent: 'Road Trip',
    defaultLocation: 'Vermont',
    imageCount: 15
  },
  {
    folder: '944_tent',
    category: 'events',
    label: '944 Tent',
    defaultEvent: '944 Tent Event',
    defaultLocation: 'Various',
    imageCount: 10
  },
  {
    folder: 'tough_mudder_2024',
    category: 'other',
    label: 'Tough Mudder 2024',
    defaultEvent: 'Tough Mudder',
    defaultLocation: 'Pennsylvania',
    imageCount: 10
  },
  {
    folder: 'tough_mudder_2025',
    category: 'other',
    label: 'Tough Mudder 2025',
    defaultEvent: 'Tough Mudder',
    defaultLocation: 'Pennsylvania',
    imageCount: 10
  },
  {
    folder: 'light_painting',
    category: 'creative',
    label: 'Light Painting',
    defaultEvent: 'Light Painting Photography',
    defaultLocation: 'Studio',
    imageCount: 10
  },
  {
    folder: 'blue_gt3rs',
    category: 'client_cars',
    label: 'Blue GT3 RS',
    defaultEvent: 'Car Photography',
    defaultLocation: 'Pennsylvania',
    imageCount: 15
  },
  {
    folder: 'gridlife',
    category: 'gridlife',
    label: 'GRIDLIFE',
    defaultEvent: 'GRIDLIFE Motorsports',
    defaultLocation: 'Various Tracks',
    imageCount: 20
  },
  {
    folder: '944fest',
    category: '944fest',
    label: '944Fest',
    defaultEvent: '944Fest',
    defaultLocation: 'VIR',
    imageCount: 15
  },
  {
    folder: 'cars_coffee',
    category: 'cars_coffee',
    label: 'Cars & Coffee',
    defaultEvent: 'Cars & Coffee',
    defaultLocation: 'Local Meet',
    imageCount: 15
  },
  {
    folder: 'pca_events',
    category: 'pca',
    label: 'PCA Events',
    defaultEvent: 'Porsche Club of America',
    defaultLocation: 'Pennsylvania',
    imageCount: 15
  }
];

// Auto-generate photos from folders
// Just number your images: 1.jpg, 2.jpg, 3.jpg, etc. in each folder
export const generatePhotosFromFolders = () => {
  const photos = [];
  let photoId = 1;

  eventFolders.forEach(folder => {
    for (let i = 1; i <= folder.imageCount; i++) {
      photos.push({
        id: photoId++,
        thumbnail: `/images/automotive/${folder.folder}/${i}.jpg`,
        fullSize: `/images/automotive/${folder.folder}/${i}.jpg`,
        caption: `${folder.label} - Photo ${i}`,
        category: folder.category,
        event: folder.defaultEvent,
        location: folder.defaultLocation,
        date: new Date().toISOString().split('T')[0], // Today's date as placeholder
        folder: folder.folder
      });
    }
  });

  return photos;
};

// Export photos
export const automotivePhotos = generatePhotosFromFolders();

// Dynamic categories based on what folders you have
export const categories = [
  { id: 'all', label: 'All Photos', count: automotivePhotos.length },
  {
    id: 'porsche944',
    label: 'My Porsche 944',
    count: automotivePhotos.filter(p => p.category === 'porsche944').length
  },
  {
    id: 'road_trips',
    label: 'Road Trips',
    count: automotivePhotos.filter(p => p.category === 'road_trips').length
  },
  {
    id: 'events',
    label: 'Events',
    count: automotivePhotos.filter(p => p.category === 'events').length
  },
  {
    id: 'gridlife',
    label: 'GRIDLIFE',
    count: automotivePhotos.filter(p => p.category === 'gridlife').length
  },
  {
    id: '944fest',
    label: '944Fest',
    count: automotivePhotos.filter(p => p.category === '944fest').length
  },
  {
    id: 'cars_coffee',
    label: 'Cars & Coffee',
    count: automotivePhotos.filter(p => p.category === 'cars_coffee').length
  },
  {
    id: 'pca',
    label: 'PCA Events',
    count: automotivePhotos.filter(p => p.category === 'pca').length
  },
  {
    id: 'creative',
    label: 'Creative Photography',
    count: automotivePhotos.filter(p => p.category === 'creative').length
  },
  {
    id: 'client_cars',
    label: 'Client Cars',
    count: automotivePhotos.filter(p => p.category === 'client_cars').length
  },
  {
    id: 'other',
    label: 'Other',
    count: automotivePhotos.filter(p => p.category === 'other').length
  }
].filter(cat => cat.count > 0 || cat.id === 'all'); // Only show categories with photos

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
