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
    'CompTIA PenTest+ ce Certification',
    'CompTIA CySA+ ce Certification',
    'CompTIA Security Analytics Professional (CSAP)',
    'CompTIA Security+ (SY0-601)',
    'CompTIA Network+ (N10-008)',
    'CompTIA A+ ce Certification',
    'CompTIA IT Operations Specialist (CIOS)',
    'CompTIA Secure Infrastructure Specialist (CSIS)',
    'ITIL® Foundation Certificate in IT Service Management',
    'Linux Essentials Certification',
    'ConnectWise Manage Engineer/Technician'
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
                from Western Governors University (2023).
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
              <p>
                Bachelor's degree in Cybersecurity & Information Assurance from Western Governors University
                (2023), with multiple CompTIA certifications including PenTest+, CySA+, Security+, Network+,
                and A+.
              </p>
              <h3>Beyond Cybersecurity</h3>
              <p>
                When I'm not securing networks, you'll find me working on my 1987 Summer Yellow Porsche 944
                project car. I'm deeply involved in the automotive community as a volunteer photographer and
                videographer for Porsche Club of America and monthly Cars & Coffee events. I capture automotive
                content at events like GRIDLIFE and 944Fest, and spend weekends camping, hiking, or driving
                scenic backroads.
              </p>
              <h3>Hobbies & Interests</h3>
              <ul className="hobbies-list">
                <li>Automotive Photography & Videography</li>
                <li>1987 Porsche 944 Project Car - Summer Yellow</li>
                <li>Cars & Coffee Monthly Volunteer</li>
                <li>Porsche Club of America - Volunteer Photographer/Videographer</li>
                <li>Automotive Events (GRIDLIFE, 944Fest)</li>
                <li>Camping & Hiking</li>
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
                <span className="timeline-date">January 2024 – Present · 1 yr 10 mos</span>
                <h3>Director of Cybersecurity</h3>
                <h4>KPInterface</h4>
                <p>
                  Led development and implementation of cybersecurity strategies for 100+ clients across
                  3,500 endpoints, improving protection consistency and security posture. Conducted malware
                  analysis and vulnerability assessments using CrowdStrike and Huntress, decreasing response
                  time and incident recurrence. Deployed and maintained advanced security tools (EDR, Microsoft
                  Security Suite, Zero Trust Network Access) to proactively mitigate endpoint threats. Partnered
                  with delivery and compliance teams to develop Microsoft 365 hardening templates, standardizing
                  configurations and significantly reducing client incidents. Acted as a key influencer in security
                  product procurement, evaluating and recommending tools through hands-on vendor demos and
                  technical reviews.
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
                <span className="timeline-date">January 2023 – January 2024 · 1 yr 1 mo</span>
                <h3>Cyber Security Analyst</h3>
                <h4>KPInterface</h4>
                <p>
                  Responded to malware alerts and conducted threat triage using CrowdStrike and Huntress to
                  resolve endpoint infections. Remediated security incidents across 3000+ endpoints by following
                  SOPs and using endpoint detection tools to contain infections. Assisted with firewall firmware
                  updates and basic ESXi VM maintenance. Used tools like ConnectWise and Liongard to log
                  incidents, monitor client systems, and support issue resolution. Patched OS and application
                  vulnerabilities using vendor advisories and internal checklists. Worked closely with service
                  desk and project teams to support incident handling and security tool deployment tasks.
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
                <span className="timeline-date">November 2022 – January 2023 · 3 mos</span>
                <h3>Technology Associate</h3>
                <h4>KPInterface</h4>
                <p>
                  Provided tier 1 technical support and assistance using ConnectWise suite. Supported security
                  awareness initiatives and helped clients with email security and basic cybersecurity practices.
                  Gained foundational experience in MSP operations and client service delivery.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: experienceInView ? 1 : 0, x: experienceInView ? 0 : -50 }}
              transition={{ delay: 0.8 }}
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
