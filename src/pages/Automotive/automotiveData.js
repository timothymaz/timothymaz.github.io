// Automotive photography data for Timothy Mazur's portfolio

export const automotivePhotos = [
  {
    id: 1,
    thumbnail: '/images/automotive/944_1_thumb.jpg',
    fullSize: '/images/automotive/944_1_full.jpg',
    caption: 'Summer Yellow 944 at Golden Hour',
    category: 'porsche944',
    event: 'Personal Photography',
    location: 'Pennsylvania Backroads',
    date: '2024-10-15'
  },
  {
    id: 2,
    thumbnail: '/images/automotive/944_2_thumb.jpg',
    fullSize: '/images/automotive/944_2_full.jpg',
    caption: '1987 Porsche 944 - Side Profile',
    category: 'porsche944',
    event: 'Personal Photography',
    location: 'Pennsylvania',
    date: '2024-09-20'
  },
  {
    id: 3,
    thumbnail: '/images/automotive/944_3_thumb.jpg',
    fullSize: '/images/automotive/944_3_full.jpg',
    caption: 'Engine Bay Detail',
    category: 'porsche944',
    event: 'Personal Photography',
    location: 'Home Garage',
    date: '2024-08-10'
  },
  {
    id: 4,
    thumbnail: '/images/automotive/gridlife_1_thumb.jpg',
    fullSize: '/images/automotive/gridlife_1_full.jpg',
    caption: 'GRIDLIFE Track Action',
    category: 'gridlife',
    event: 'GRIDLIFE Midwest',
    location: 'Road America',
    date: '2024-08-20'
  },
  {
    id: 5,
    thumbnail: '/images/automotive/gridlife_2_thumb.jpg',
    fullSize: '/images/automotive/gridlife_2_full.jpg',
    caption: 'Drift Competition - Tandem Run',
    category: 'gridlife',
    event: 'GRIDLIFE South',
    location: 'Road Atlanta',
    date: '2024-07-15'
  },
  {
    id: 6,
    thumbnail: '/images/automotive/gridlife_3_thumb.jpg',
    fullSize: '/images/automotive/gridlife_3_full.jpg',
    caption: 'Paddock Life',
    category: 'gridlife',
    event: 'GRIDLIFE',
    location: 'Gingerman Raceway',
    date: '2024-06-05'
  },
  {
    id: 7,
    thumbnail: '/images/automotive/944fest_1_thumb.jpg',
    fullSize: '/images/automotive/944fest_1_full.jpg',
    caption: '944Fest - Group Photo',
    category: '944fest',
    event: '944Fest 2024',
    location: 'Virginia International Raceway',
    date: '2024-05-18'
  },
  {
    id: 8,
    thumbnail: '/images/automotive/944fest_2_thumb.jpg',
    fullSize: '/images/automotive/944fest_2_full.jpg',
    caption: 'Track Day - 944 Turbo',
    category: '944fest',
    event: '944Fest 2024',
    location: 'VIR',
    date: '2024-05-19'
  },
  {
    id: 9,
    thumbnail: '/images/automotive/cars_coffee_1_thumb.jpg',
    fullSize: '/images/automotive/cars_coffee_1_full.jpg',
    caption: 'Monthly Cars & Coffee',
    category: 'cars_coffee',
    event: 'Cars & Coffee',
    location: 'Local Meet',
    date: '2024-09-07'
  },
  {
    id: 10,
    thumbnail: '/images/automotive/cars_coffee_2_thumb.jpg',
    fullSize: '/images/automotive/cars_coffee_2_full.jpg',
    caption: 'Classic Porsche Lineup',
    category: 'cars_coffee',
    event: 'Cars & Coffee',
    location: 'Local Meet',
    date: '2024-08-03'
  },
  {
    id: 11,
    thumbnail: '/images/automotive/pca_1_thumb.jpg',
    fullSize: '/images/automotive/pca_1_full.jpg',
    caption: 'PCA Track Day',
    category: 'other',
    event: 'Porsche Club of America',
    location: 'Pocono Raceway',
    date: '2024-07-22'
  },
  {
    id: 12,
    thumbnail: '/images/automotive/pca_2_thumb.jpg',
    fullSize: '/images/automotive/pca_2_full.jpg',
    caption: 'PCA Social Event',
    category: 'other',
    event: 'Porsche Club of America',
    location: 'Pennsylvania',
    date: '2024-06-14'
  }
];

export const categories = [
  { id: 'all', label: 'All Photos', count: automotivePhotos.length },
  { id: 'porsche944', label: 'My Porsche 944', count: automotivePhotos.filter(p => p.category === 'porsche944').length },
  { id: 'gridlife', label: 'GRIDLIFE', count: automotivePhotos.filter(p => p.category === 'gridlife').length },
  { id: '944fest', label: '944Fest', count: automotivePhotos.filter(p => p.category === '944fest').length },
  { id: 'cars_coffee', label: 'Cars & Coffee', count: automotivePhotos.filter(p => p.category === 'cars_coffee').length },
  { id: 'other', label: 'Other Events', count: automotivePhotos.filter(p => p.category === 'other').length }
];

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
