import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiCloud, FiLock, FiTerminal, FiAward, FiBookOpen, FiUsers, FiMonitor, FiTool } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './Home.css';

const ParticleBackground = lazy(() => import('./ParticleBackground'));

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
  }
};

function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        // Keep cursor blinking after done
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span>
      {displayed}
      <span className="typewriter-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
}

function TiltCard({ children, className }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(10px)`,
      transition: 'transform 0.1s ease-out'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
  }, []);

  return (
    <div
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

const Home = () => {
  const { theme } = useTheme();

  const skills = [
    { name: 'Technical Sales & Enablement', icon: <FiShield />, description: 'Translating security capabilities into business value for MSP partners' },
    { name: 'Cybersecurity & IT Operations', icon: <FiLock />, description: 'Securing 100+ clients and 3,500 endpoints with advanced tools' },
    { name: 'MSP Sales Enablement', icon: <FiCloud />, description: 'Driving vendor partnerships and product adoption strategies' },
    { name: 'Vendor Selection & Procurement', icon: <FiTerminal />, description: 'Evaluating 70+ security tools through hands-on demos and reviews' },
    { name: 'Security Product Demos', icon: <FiShield />, description: 'Leading compelling technical demonstrations for stakeholders' },
    { name: 'Endpoint Security (EDR/XDR)', icon: <FiLock />, description: 'Deploying CrowdStrike, Huntress, and Microsoft Security Suite' }
  ];

  const certifications = [
    'CompTIA Network Security Professional (CNSP)',
    'CompTIA Network Vulnerability Assessment Professional (CNVP)',
    'CompTIA PenTest+ ce Certification',
    'CompTIA CySA+ ce Certification',
    'CompTIA Security Analytics Professional (CSAP)',
    'CompTIA Security+ (SY0-601)',
    'CompTIA Network+ (N10-008)',
    'CompTIA A+ ce Certification',
    'CompTIA IT Operations Specialist (CIOS)',
    'CompTIA Secure Infrastructure Specialist (CSIS)',
    'ITIL Foundation Certificate in IT Service Management',
    'Linux Essentials Certification',
    'ConnectWise Manage Engineer/Technician'
  ];

  const timelineItems = [
    {
      date: 'January 2024 – Present',
      title: 'Director of Cybersecurity',
      company: 'KPInterface',
      description: 'Led development and implementation of cybersecurity strategies for 100+ clients across 3,500 endpoints, improving protection consistency and security posture. Conducted malware analysis and vulnerability assessments using CrowdStrike and Huntress, decreasing response time and incident recurrence. Deployed and maintained advanced security tools (EDR, Microsoft Security Suite, Zero Trust Network Access) to proactively mitigate endpoint threats.'
    },
    {
      date: 'January 2023 – January 2024',
      title: 'Cyber Security Analyst',
      company: 'KPInterface',
      description: 'Responded to malware alerts and conducted threat triage using CrowdStrike and Huntress to resolve endpoint infections. Remediated security incidents across 3000+ endpoints by following SOPs and using endpoint detection tools to contain infections.'
    },
    {
      date: 'November 2022 – January 2023',
      title: 'Technology Associate',
      company: 'KPInterface',
      description: 'Provided tier 1 technical support and assistance using ConnectWise suite. Supported security awareness initiatives and helped clients with email security and basic cybersecurity practices.'
    },
    {
      date: 'September 2020 – June 2021',
      title: 'Tech Office Intern',
      company: 'Wissahickon School District',
      description: 'Provided frontline support for troubleshooting hardware, software, and network connectivity issues. Maintained technology inventory systems and assisted with staff onboarding.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section mesh-background">
        <Suspense fallback={null}>
          <ParticleBackground theme={theme} />
        </Suspense>
        <div className="container">
          <motion.div
            className="hero-content"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="hero-text">
              <motion.span className="hero-greeting" variants={heroItem}>
                Hi, I'm
              </motion.span>
              <motion.h1 className="hero-title" variants={heroItem}>
                Timothy <span className="text-gradient">Mazur</span>
              </motion.h1>
              <motion.h2 className="hero-subtitle" variants={heroItem}>
                <TypewriterText text="Director of Cybersecurity" />
              </motion.h2>
              <motion.p className="hero-description" variants={heroItem}>
                I Help Businesses Secure Their Valuable Data | Results-driven cybersecurity professional
                with 3+ years in the MSP industry, overseeing security operations for 100+ clients and
                3,500 endpoints. CompTIA-certified with a B.S. in Cybersecurity & Information Assurance
                from Western Governors University (2023).
              </motion.p>
              <motion.div className="hero-buttons" variants={heroItem}>
                <Link to="/portfolio" className="btn btn-primary">
                  View My Work
                  <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            <motion.div className="hero-image" variants={heroItem}>
              <div className="image-wrapper">
                <img src="/images/tim.jpg" alt="Timothy Mazur" />
                <div className="image-border-ring"></div>
                <div className="image-glow"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section className="about-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <div className="about-bento">
            <motion.div
              className="bento-card bento-bio glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <p>
                Results-driven cybersecurity professional with 3+ years in the MSP industry, currently
                serving as Director of Cybersecurity overseeing security operations for 100+ clients and
                3,500 endpoints. Trusted technical advisor and procurement influencer, having evaluated
                70+ security tools through hands-on vendor demos and technical reviews.
              </p>
              <p>
                Known for translating technical capabilities into business value and aligning cybersecurity
                solutions with MSP needs. At KPInterface, I've led development and implementation of
                cybersecurity strategies, conducted malware analysis using CrowdStrike and Huntress, and
                deployed advanced security tools (EDR, Microsoft Security Suite, Zero Trust Network Access)
                to proactively mitigate endpoint threats.
              </p>
            </motion.div>

            <motion.div
              className="bento-card bento-education glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bento-icon"><FiBookOpen /></div>
              <h3>Education</h3>
              <p className="bento-highlight">B.S. Cybersecurity & Information Assurance</p>
              <p className="bento-sub">Western Governors University, 2023</p>
            </motion.div>

            <motion.div
              className="bento-card bento-stats glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="stats-grid">
                <div className="stat-item">
                  <FiUsers className="stat-icon" />
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Clients</span>
                </div>
                <div className="stat-item">
                  <FiMonitor className="stat-icon" />
                  <span className="stat-number">3,500</span>
                  <span className="stat-label">Endpoints</span>
                </div>
                <div className="stat-item">
                  <FiTool className="stat-icon" />
                  <span className="stat-number">70+</span>
                  <span className="stat-label">Tools Evaluated</span>
                </div>
                <div className="stat-item">
                  <FiAward className="stat-icon" />
                  <span className="stat-number">13</span>
                  <span className="stat-label">Certifications</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bento-card bento-beyond glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3>Beyond Cybersecurity</h3>
              <p>
                When I'm not securing networks, you'll find me working on my 1987 Summer Yellow Porsche 944
                project car. I'm deeply involved in the automotive community as a volunteer photographer and
                videographer for Porsche Club of America and monthly Cars & Coffee events.
              </p>
              <div className="hobby-tags">
                <span className="hobby-tag">Automotive Photography</span>
                <span className="hobby-tag">Porsche 944</span>
                <span className="hobby-tag">Cars & Coffee</span>
                <span className="hobby-tag">GRIDLIFE</span>
                <span className="hobby-tag">Camping & Hiking</span>
                <span className="hobby-tag">CTF Challenges</span>
                <span className="hobby-tag">Kali Linux</span>
              </div>
            </motion.div>

            <motion.div
              className="bento-card bento-certs glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <h3>Certifications</h3>
              <ul className="certifications-list">
                {certifications.map((cert) => (
                  <li key={cert}>
                    <span className="cert-check">&#x2713;</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Competencies
          </motion.h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.08 * index, duration: 0.5 }}
              >
                <TiltCard className="skill-card glass-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.name}</h3>
                  <p className="skill-description">{skill.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.title + item.date}
                className={`timeline-item ${index % 2 === 1 ? 'timeline-right' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="timeline-marker">
                  <span className="timeline-pulse"></span>
                </div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
