import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiCloud, FiLock, FiTerminal } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import './Home.css';

const Home = () => {
  const [heroRef, heroInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [experienceRef, experienceInView] = useInView();

  const skills = [
    { name: 'Technical Sales & Enablement', icon: <FiShield /> },
    { name: 'Cybersecurity & IT Operations', icon: <FiLock /> },
    { name: 'MSP Sales Enablement', icon: <FiCloud /> },
    { name: 'Vendor Selection & Procurement', icon: <FiTerminal /> },
    { name: 'Security Product Demos', icon: <FiShield /> },
    { name: 'Endpoint Security (EDR/XDR)', icon: <FiLock /> }
  ];

  const certifications = [
    'CompTIA Network Security Professional (CNSP)',
    'CompTIA Network Vulnerability Assessment Professional (CNVP)',
    'CompTIA Security+ (SY0-601)',
    'CompTIA Network+ (N10-008)',
    'CompTIA A+',
    'ConnectWise Manage Engineer'
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: heroInView ? 0 : -50, opacity: heroInView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="hero-greeting">Hi, I'm</span>
              <h1 className="hero-title">
                Timothy <span className="text-gradient">Mazur</span>
              </h1>
              <h2 className="hero-subtitle">Director of Cybersecurity</h2>
              <p className="hero-description">
                I Help Businesses Secure Their Valuable Data | Results-driven cybersecurity professional
                with 3+ years in the MSP industry, overseeing security operations for 100+ clients and
                3,500 endpoints. CompTIA-certified with a B.S. in Cybersecurity & Information Assurance
                from Western Governors University.
              </p>
              <div className="hero-buttons">
                <Link to="/portfolio" className="btn btn-primary">
                  View My Work
                  <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hero-image"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="image-wrapper">
                <img src="/images/tim.jpg" alt="Timothy Mazur" />
                <div className="image-glow"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Results-driven cybersecurity professional with 3+ years in the MSP industry, most recently
                serving as Director of Cybersecurity overseeing security operations for 100+ clients and
                3,500 endpoints. Trusted technical advisor and procurement influencer, having evaluated
                70+ security tools and participated in many vendor demos.
              </p>
              <p>
                Known for translating technical capabilities into business value and aligning cybersecurity
                solutions with MSP needs. At KPInterface, I've led development and implementation of
                cybersecurity strategies, conducted malware analysis using CrowdStrike and Huntress, and
                deployed advanced security tools (EDR, Microsoft Security Suite, Zero Trust Network Access)
                to proactively mitigate endpoint threats.
              </p>
              <h3>Hobbies & Interests</h3>
              <ul className="hobbies-list">
                <li>Photography & Videography</li>
                <li>FPV Drone Racing</li>
                <li>Security Research & CTF Challenges</li>
                <li>Penetration Testing with Kali Linux</li>
              </ul>
            </div>

            <div className="certifications-card">
              <h3>Certifications</h3>
              <ul className="certifications-list">
                {certifications.map((cert, index) => (
                  <motion.li
                    key={cert}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: aboutInView ? 1 : 0, x: aboutInView ? 0 : -20 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <span className="cert-check">✓</span>
                    {cert}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        className="skills-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: skillsInView ? 1 : 0, y: skillsInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Core Competencies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: skillsInView ? 1 : 0,
                  scale: skillsInView ? 1 : 0.8
                }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        ref={experienceRef}
        className="experience-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: experienceInView ? 1 : 0, y: experienceInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: experienceInView ? 1 : 0, x: experienceInView ? 0 : -50 }}
              transition={{ delay: 0.2 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">January 2024 – Present</span>
                <h3>Director of Cybersecurity</h3>
                <h4>KPInterface</h4>
                <p>
                  Led development and implementation of cybersecurity strategies for 100+ clients across
                  3,500 endpoints. Conducted malware analysis using CrowdStrike and Huntress. Deployed
                  advanced security tools (EDR, Microsoft Security Suite, Zero Trust Network Access).
                  Acted as key influencer in security product procurement, evaluating 70+ tools through
                  hands-on vendor demos and technical reviews.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: experienceInView ? 1 : 0, x: experienceInView ? 0 : -50 }}
              transition={{ delay: 0.4 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">January 2023 – January 2024</span>
                <h3>Cyber Security Analyst</h3>
                <h4>KPInterface</h4>
                <p>
                  Responded to malware alerts and conducted threat triage using CrowdStrike and Huntress.
                  Remediated security incidents across 3000+ endpoints. Patched OS and application
                  vulnerabilities using vendor advisories. Worked closely with service desk and project
                  teams to support incident handling and security tool deployment.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: experienceInView ? 1 : 0, x: experienceInView ? 0 : -50 }}
              transition={{ delay: 0.6 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">September 2020 – June 2021</span>
                <h3>Tech Office Intern</h3>
                <h4>Wissahickon School District</h4>
                <p>
                  Provided frontline support for troubleshooting hardware, software, and network
                  connectivity issues. Maintained technology inventory systems and assisted with
                  staff onboarding. Gained early exposure to IT service management principles.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
