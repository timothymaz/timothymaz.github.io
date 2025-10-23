import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiInstagram, FiMapPin } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import './Contact.css';

const Contact = () => {
  const [headerRef, headerInView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  const contactMethods = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: 'timothymazur125@gmail.com',
      link: 'mailto:timothymazur125@gmail.com',
      description: 'Send me an email anytime'
    },
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
        ref={headerRef}
        className="contact-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 30 }}
        transition={{ duration: 0.8 }}
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
      <section ref={cardsRef} className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: cardsInView ? 1 : 0,
                  y: cardsInView ? 0 : 30
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
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
              </motion.div>
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
