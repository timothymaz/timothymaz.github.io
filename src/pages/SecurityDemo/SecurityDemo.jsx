import { useState } from 'react';
import { Link } from 'react-router-dom';
import XSSDemo from './XSSDemo';
import SQLDemo from './SQLDemo';
import PreventionGuide from './PreventionGuide';
import './SecurityDemo.css';

const SecurityDemo = () => {
  const [activeTab, setActiveTab] = useState('xss');

  const renderContent = () => {
    switch (activeTab) {
      case 'xss':
        return <XSSDemo />;
      case 'sql':
        return <SQLDemo />;
      case 'prevention':
        return <PreventionGuide />;
      case 'about':
        return <AboutSection />;
      default:
        return <XSSDemo />;
    }
  };

  return (
    <div className="security-demo-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="page-title">🔒 Security Vulnerability Demonstrator</h1>
          <p className="page-subtitle">
            Interactive educational tool for learning about web security vulnerabilities
          </p>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="main-warning-banner">
        <div className="warning-icon-large">⚠️</div>
        <div className="warning-text">
          <h2>FOR EDUCATIONAL PURPOSES ONLY</h2>
          <p>
            These demonstrations are designed to teach web security concepts in a safe, controlled environment.
            <strong> Never attempt these techniques on systems you don't own or have permission to test.</strong>
          </p>
          <p className="warning-legal">
            Unauthorized access to computer systems is illegal and can result in criminal prosecution.
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/portfolio">Portfolio</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Security Demo</span>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab ${activeTab === 'xss' ? 'active' : ''}`}
          onClick={() => setActiveTab('xss')}
        >
          <span className="tab-icon">🎯</span>
          <span className="tab-text">XSS Demo</span>
        </button>
        <button
          className={`tab ${activeTab === 'sql' ? 'active' : ''}`}
          onClick={() => setActiveTab('sql')}
        >
          <span className="tab-icon">💉</span>
          <span className="tab-text">SQL Injection</span>
        </button>
        <button
          className={`tab ${activeTab === 'prevention' ? 'active' : ''}`}
          onClick={() => setActiveTab('prevention')}
        >
          <span className="tab-icon">🛡️</span>
          <span className="tab-text">Prevention</span>
        </button>
        <button
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <span className="tab-icon">📚</span>
          <span className="tab-text">About</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="demo-footer">
        <div className="footer-content">
          <p>
            <strong>Disclaimer:</strong> This tool is for educational purposes only.
            The demonstrations use simulated environments with no real vulnerabilities or databases.
          </p>
          <div className="footer-links">
            <Link to="/portfolio" className="footer-link">← Back to Portfolio</Link>
            <a
              href="https://owasp.org/www-project-top-ten/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              OWASP Top 10 →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="demo-header">
        <h2>📚 About This Demonstrator</h2>
        <p className="demo-description">
          Understanding how security vulnerabilities work is essential for building secure applications.
        </p>
      </div>

      <div className="demo-container">
        <h3>🎓 Educational Purpose</h3>
        <p>
          This interactive demonstrator was created to help developers, security professionals,
          and students understand common web security vulnerabilities in a safe, controlled environment.
        </p>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🔍</div>
            <h4>Learn by Doing</h4>
            <p>Interactive examples show exactly how attacks work</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🛡️</div>
            <h4>Prevention Focused</h4>
            <p>Learn best practices to prevent vulnerabilities</p>
          </div>
          <div className="info-card">
            <div className="info-icon">✅</div>
            <h4>Safe Environment</h4>
            <p>All demonstrations use simulated, isolated environments</p>
          </div>
        </div>
      </div>

      <div className="demo-container">
        <h3>🎯 What You'll Learn</h3>
        <div className="learning-outcomes">
          <div className="outcome-section">
            <h4>Cross-Site Scripting (XSS)</h4>
            <ul>
              <li>How XSS attacks inject malicious scripts</li>
              <li>Different types of XSS (Reflected, Stored, DOM-based)</li>
              <li>Real-world impact and attack scenarios</li>
              <li>Input sanitization and output encoding</li>
              <li>Content Security Policy (CSP) implementation</li>
            </ul>
          </div>

          <div className="outcome-section">
            <h4>SQL Injection</h4>
            <ul>
              <li>How SQL injection manipulates database queries</li>
              <li>Authentication bypass techniques</li>
              <li>Data exfiltration and database destruction</li>
              <li>Parameterized queries and prepared statements</li>
              <li>ORM usage and secure coding practices</li>
            </ul>
          </div>

          <div className="outcome-section">
            <h4>Security Best Practices</h4>
            <ul>
              <li>Input validation and whitelisting</li>
              <li>Least privilege principle</li>
              <li>Defense in depth strategy</li>
              <li>Security testing tools and techniques</li>
              <li>Incident response and monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="demo-container">
        <h3>⚙️ Technical Implementation</h3>
        <p>
          This demonstrator is built with React and uses:
        </p>
        <ul className="tech-list">
          <li><strong>Simulated Environments:</strong> No real databases or vulnerable code</li>
          <li><strong>Safe Demonstrations:</strong> XSS payloads are displayed as text, not executed</li>
          <li><strong>Educational Focus:</strong> Every example includes explanations and prevention techniques</li>
          <li><strong>Interactive Learning:</strong> Try examples, see results, understand impact</li>
        </ul>
      </div>

      <div className="demo-container">
        <h3>📖 Recommended Learning Path</h3>
        <div className="learning-path">
          <div className="path-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Start with XSS Demo</h4>
              <p>Understand how script injection works and try different attack patterns</p>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Explore SQL Injection</h4>
              <p>See how database queries can be manipulated and data compromised</p>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Study Prevention Techniques</h4>
              <p>Learn and implement security best practices in your code</p>
            </div>
          </div>

          <div className="path-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Practice & Test</h4>
              <p>Use security testing tools to find and fix vulnerabilities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-container cta-section">
        <h3>🚀 Ready to Start?</h3>
        <p>
          Begin your journey to understanding web security vulnerabilities.
          Choose a demo from the tabs above to get started!
        </p>
        <div className="cta-buttons">
          <button onClick={() => window.scrollTo(0, 0)} className="cta-button primary">
            Start Learning
          </button>
          <a
            href="https://owasp.org/www-project-top-ten/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button secondary"
          >
            OWASP Top 10 →
          </a>
        </div>
      </div>

      <div className="demo-container legal-notice">
        <h3>⚖️ Legal Notice</h3>
        <p>
          This tool is intended for educational purposes only. Unauthorized access to computer systems,
          networks, or data is illegal under various laws including the Computer Fraud and Abuse Act (CFAA)
          in the United States and similar legislation in other countries.
        </p>
        <p>
          <strong>Always obtain written permission</strong> before conducting security testing on any system
          or application you do not own. Use this knowledge responsibly to build more secure applications
          and protect users.
        </p>
      </div>
    </div>
  );
};

export default SecurityDemo;
