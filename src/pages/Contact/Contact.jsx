import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiInstagram, FiMapPin } from 'react-icons/fi';
import './Contact.css';

function MagneticCard({ children, className, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    setOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      className={className}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const Contact = () => {
  const contactMethods = [
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      value: 'Timothy Mazur',
      link: 'https://www.linkedin.com/in/tim--mazur/',
      description: 'Connect professionally'
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      value: '@timothymaz',
      link: 'https://github.com/timothymaz',
      description: 'Check out my code'
    },
    {
      icon: <FiInstagram />,
      title: 'Instagram',
      value: '@tim.mazur',
      link: 'https://www.instagram.com/tim.mazur',
      description: 'Follow my photography'
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      value: 'Greater Philadelphia',
      link: null,
      description: 'Based in the Greater Philadelphia Area'
    }
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <motion.section
        className="contact-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1 className="page-title">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="page-description">
            I'm always open to discussing new projects, opportunities, or collaborations.
            Feel free to reach out through any of the channels below.
          </p>
        </div>
      </motion.section>

      {/* Contact Cards */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {contactMethods.map((method, index) => (
              <MagneticCard
                key={method.title}
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {method.link ? (
                  <a
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-link"
                  >
                    <div className="contact-icon">{method.icon}</div>
                    <h3 className="contact-title">{method.title}</h3>
                    <p className="contact-value">{method.value}</p>
                    <p className="contact-description">{method.description}</p>
                  </a>
                ) : (
                  <div className="contact-link">
                    <div className="contact-icon">{method.icon}</div>
                    <h3 className="contact-title">{method.title}</h3>
                    <p className="contact-value">{method.value}</p>
                    <p className="contact-description">{method.description}</p>
                  </div>
                )}
              </MagneticCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Looking for my resume?</h2>
            <p>Download my latest resume or view my experience on LinkedIn.</p>
            <div className="cta-buttons">
              <a
                href="https://www.linkedin.com/in/tim--mazur/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FiLinkedin />
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
