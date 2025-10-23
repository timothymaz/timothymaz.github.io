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
      image: 'https://via.placeholder.com/600x360/0a0a0a/00d4aa?text=Terminal+Project',
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
      id: 2,
      title: 'XSS/SQL Injection Demonstrator',
      category: 'security',
      tags: ['Security', 'XSS', 'Education'],
      description: 'Educational tool demonstrating Cross-Site Scripting and SQL injection vulnerabilities. Helps developers understand common security flaws and prevention techniques.',
      image: 'https://via.placeholder.com/600x360/0a0a0a/ff0055?text=XSS+SQL+Demo',
      link: '/XSSSQL/index.html',
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
      image: 'https://via.placeholder.com/600x360/0a0a0a/0099ff?text=Port+Scanner',
      github: 'https://github.com/timothymaz',
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
      image: 'https://via.placeholder.com/600x360/0a0a0a/00ff41?text=Startup+Manager',
      github: 'https://github.com/timothymaz',
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
