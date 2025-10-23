import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiInstagram, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tim--mazur/',
      icon: <FiLinkedin />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/timothymaz',
      icon: <FiGithub />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tim.mazur',
      icon: <FiInstagram />
    },
    {
      name: 'Email',
      url: 'mailto:timothymazur125@gmail.com',
      icon: <FiMail />
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Timothy Mazur</h3>
            <p className="footer-description">
              Cybersecurity professional protecting organizations from digital threats
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Timothy Mazur. Built with{' '}
            <motion.span
              className="heart"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart />
            </motion.span>{' '}
            and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
