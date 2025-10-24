import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiTerminal, FiShield, FiFilter } from 'react-icons/fi';
import './Portfolio.css';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Interactive Terminal',
      category: 'web',
      tags: ['JavaScript', 'Canvas API', 'Terminal'],
      description: 'A web-based terminal emulator with Matrix rain effect, command history, and Easter eggs. Features custom commands, password protection, and cyberpunk aesthetics.',
      image: '/images/terminal_project_thumbnail.jpg',
      link: '/terminal',
      github: 'https://github.com/timothymaz/timothymaz.github.io',
      features: [
        '15+ custom commands',
        'Matrix digital rain animation',
        'Command history navigation',
        'Password-protected secrets'
      ]
    },
    {
      id: 5,
      title: '67 Clicker - Incremental Game',
      category: 'web',
      tags: ['React', 'Three.js', 'Game Dev'],
      description: 'A Cookie Clicker-style incremental game built with React and Three.js. Features persistent save system, golden multipliers, click upgrades, and smooth animations with particle effects.',
      image: '/images/placeholder-project.jpg',
      link: '/67',
      github: 'https://github.com/timothymaz/timothymaz.github.io',
      features: [
        'LocalStorage save system',
        'Golden 67s with 50x multipliers',
        '10 building types with exponential costs',
        'Offline earnings calculation'
      ]
    },
    {
      id: 2,
      title: 'XSS/SQL Injection Demonstrator',
      category: 'security',
      tags: ['Security', 'XSS', 'Education'],
      description: 'Educational tool demonstrating Cross-Site Scripting and SQL injection vulnerabilities. Helps developers understand common security flaws and prevention techniques.',
      image: '/images/xss_sql_project_thumbnail.jpg',
      link: '/security-demo',
      github: 'https://github.com/timothymaz/timothymaz.github.io',
      features: [
        'Live XSS demonstration',
        'Interactive examples',
        'Educational purpose',
        'Security awareness'
      ]
    },
    {
      id: 3,
      title: 'User-Friendly Port Scanner',
      category: 'security',
      tags: ['Python', 'Tkinter', 'Network Security'],
      description: 'Powerful port scanner using Python and Tkinter for network administrators and security professionals. Features multi-threaded scanning, hostname resolution, and real-time updates.',
      image: '/images/port_scanner_thumbnail.jpg',
      github: 'https://github.com/timothymaz/Port-Scanner',
      features: [
        'Multi-threaded scanning',
        'Hostname resolution',
        'Real-time progress bar',
        'Intuitive GUI interface'
      ]
    },
    {
      id: 4,
      title: 'Windows Startup Manager',
      category: 'web',
      tags: ['Python', 'Tkinter', 'Windows'],
      description: 'Convenient startup manager for Windows systems with an intuitive interface. Enables users to manage programs that run at startup, optimizing system performance.',
      image: '/images/startup_manager_thumbnail.jpg',
      github: 'https://github.com/timothymaz/Startup-Manager',
      features: [
        'Windows Registry integration',
        'Search & filter programs',
        'Enable/disable startup items',
        'User-friendly interface'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: <FiFilter /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
    { id: 'web', label: 'Web Development', icon: <FiTerminal /> }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="portfolio-page">
      {/* Header */}
      <section className="portfolio-header">
        <div className="container">
          <h1 className="page-title">
            My <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="page-description">
            Explore my cybersecurity projects, web applications, and technical demonstrations.
            Each project showcases different aspects of security, development, and problem-solving.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-tab ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                <span className="filter-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="project-card"
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.link?.startsWith('/') ? (
                        <Link to={project.link} className="project-link" aria-label="View project">
                          <FiExternalLink />
                        </Link>
                      ) : project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="View project"
                        >
                          <FiExternalLink />
                        </a>
                      ) : null}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View source code"
                      >
                        <FiGithub />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-features">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Want to collaborate?</h2>
            <p>I'm always interested in new projects and opportunities.</p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
