import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PhotoGallery from './PhotoGallery';
import { automotivePhotos, categories, carStats, communityInvolvement } from './automotiveData';
import './Automotive.css';

const Automotive = () => {
  return (
    <motion.div
      className="automotive-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="automotive-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1>Beyond Cybersecurity</h1>
            <h2>Where Code Meets Horsepower</h2>
            <p>
              When I'm not securing networks, you'll find me behind the lens capturing
              automotive passion at events like GRIDLIFE and 944Fest, or working on my
              1987 Summer Yellow Porsche 944.
            </p>
          </motion.div>
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </motion.div>
        </div>
      </section>

      {/* Porsche 944 Section */}
      <section className="porsche-section section-padding">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">My Project: 1987 Porsche 944</h2>
            <p className="section-subtitle">
              The Summer Yellow 944 isn't just a car—it's a passion project. From weekend
              wrenching sessions to scenic backroad drives, this car represents the perfect
              balance of analog driving feel and mechanical simplicity.
            </p>
          </motion.div>

          {/* Car Stats */}
          <div className="car-stats">
            {carStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Porsche Description */}
          <motion.div
            className="porsche-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3>Current Status</h3>
            <ul className="status-list">
              <li>
                <span className="bullet">🔧</span>
                Ongoing restoration and maintenance
              </li>
              <li>
                <span className="bullet">☕</span>
                Regular Cars & Coffee participant
              </li>
              <li>
                <span className="bullet">👥</span>
                Active in the 944 community
              </li>
              <li>
                <span className="bullet">🚗</span>
                Weekend driver and photo subject
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section section-padding">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Photography Gallery</h2>
            <p className="section-subtitle">
              A collection of automotive moments from track days, car meets, and weekend drives
            </p>
          </motion.div>

          <PhotoGallery photos={automotivePhotos} categories={categories} />
        </div>
      </section>

      {/* Community Involvement Section */}
      <section className="community-section section-padding">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Community & Events</h2>
            <p className="section-subtitle">
              Giving back to the automotive community through photography and videography
            </p>
          </motion.div>

          <div className="community-grid">
            {communityInvolvement.map((item, index) => (
              <motion.div
                key={item.id}
                className="community-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="community-icon">{item.icon}</div>
                <h3>{item.organization}</h3>
                <div className="community-role">{item.role}</div>
                <p>{item.description}</p>
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="community-link"
                  >
                    Learn More →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Approach Section */}
      <section className="approach-section section-padding">
        <div className="container">
          <div className="approach-content">
            <motion.div
              className="approach-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Capturing Automotive Passion</h2>
              <p>
                Beyond technical specs and lap times, automotive photography is about
                capturing the emotion, craftsmanship, and community that makes car
                culture special. Whether it's the golden hour glow on a freshly detailed
                panel or the intensity of a track day, every shot tells a story.
              </p>
              <p>
                My approach combines technical precision with creative storytelling.
                From static car portraits to dynamic track action, I aim to capture
                what makes each car and moment unique.
              </p>
              <div className="approach-highlights">
                <div className="highlight-item">
                  <strong>Event Coverage</strong>
                  <span>Track days, car shows, and community meets</span>
                </div>
                <div className="highlight-item">
                  <strong>Automotive Portraits</strong>
                  <span>Professional car photography and detail shots</span>
                </div>
                <div className="highlight-item">
                  <strong>Action Photography</strong>
                  <span>Capturing the thrill of motorsports</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="approach-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/automotive/944_profile.jpg"
                alt="Automotive Photography"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/1a1a2e/00ffff?text=Photography+Showcase';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section section-padding">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Let's Connect</h2>
            <p>
              Whether you want to talk cybersecurity, cars, or photography—I'd love
              to hear from you.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                View Tech Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Automotive;
