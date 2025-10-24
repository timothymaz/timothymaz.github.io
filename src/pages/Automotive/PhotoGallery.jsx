import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PhotoGallery.css';

const PhotoGallery = ({ photos, categories }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Filter photos by category
  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  // Open lightbox
  const openLightbox = (index) => {
    setSelectedImage(index);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    setImageLoaded(false);
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image
  const navigateNext = () => {
    if (selectedImage !== null && selectedImage < filteredPhotos.length - 1) {
      setSelectedImage(selectedImage + 1);
      setImageLoaded(false);
    }
  };

  // Navigate to previous image
  const navigatePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
      setImageLoaded(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigatePrevious();
        if (e.key === 'ArrowRight') navigateNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, filteredPhotos.length]);

  return (
    <div className="photo-gallery-container">
      {/* Category Filter */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
            <span className="count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <motion.div
        className="photo-grid"
        layout
      >
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="photo-item"
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <img
                src={photo.thumbnail}
                alt={photo.caption}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/1a1a2e/00ffff?text=Coming+Soon';
                }}
              />
              <div className="photo-overlay">
                <div className="photo-info">
                  <span className="photo-caption">{photo.caption}</span>
                  <span className="photo-event">{photo.event}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>

            {/* Image Counter */}
            <div className="lightbox-counter">
              {selectedImage + 1} / {filteredPhotos.length}
            </div>

            {/* Previous Button */}
            {selectedImage > 0 && (
              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePrevious();
                }}
              >
                ‹
              </button>
            )}

            {/* Image Container */}
            <motion.div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!imageLoaded && (
                <div className="lightbox-loading">
                  <div className="spinner"></div>
                </div>
              )}
              <img
                className="lightbox-image"
                src={filteredPhotos[selectedImage].fullSize}
                alt={filteredPhotos[selectedImage].caption}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x800/1a1a2e/00ffff?text=Photo+Coming+Soon';
                  setImageLoaded(true);
                }}
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />

              {/* Image Metadata */}
              {imageLoaded && (
                <motion.div
                  className="lightbox-metadata"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>{filteredPhotos[selectedImage].caption}</h3>
                  <div className="metadata-details">
                    <span><strong>Event:</strong> {filteredPhotos[selectedImage].event}</span>
                    <span><strong>Location:</strong> {filteredPhotos[selectedImage].location}</span>
                    <span><strong>Date:</strong> {new Date(filteredPhotos[selectedImage].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Next Button */}
            {selectedImage < filteredPhotos.length - 1 && (
              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateNext();
                }}
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
