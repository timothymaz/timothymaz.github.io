import { useState } from 'react';
import { PREVENTION_TECHNIQUES, RESOURCES } from './vulnerabilities';
import { copyToClipboard } from './utils';

const PreventionGuide = () => {
  const [activeTab, setActiveTab] = useState('xss');
  const [copySuccess, setCopySuccess] = useState({});

  const handleCopy = async (text, id) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess({ ...copySuccess, [id]: true });
      setTimeout(() => {
        setCopySuccess({ ...copySuccess, [id]: false });
      }, 2000);
    }
  };

  const techniques = activeTab === 'xss' ? PREVENTION_TECHNIQUES.xss : PREVENTION_TECHNIQUES.sql;

  return (
    <div className="prevention-guide">
      <div className="demo-header">
        <h2>🛡️ Prevention Techniques</h2>
        <p className="demo-description">
          Learn how to protect your applications from XSS and SQL injection attacks
          with these proven security techniques and best practices.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="prevention-tabs">
        <button
          className={`tab-button ${activeTab === 'xss' ? 'active' : ''}`}
          onClick={() => setActiveTab('xss')}
        >
          🎯 XSS Prevention
        </button>
        <button
          className={`tab-button ${activeTab === 'sql' ? 'active' : ''}`}
          onClick={() => setActiveTab('sql')}
        >
          💉 SQL Injection Prevention
        </button>
      </div>

      {/* Prevention Techniques */}
      <div className="techniques-container">
        {techniques.map((technique, index) => (
          <div key={index} className="technique-card">
            <div className="technique-header">
              <h3>{technique.title}</h3>
              <span className="best-practice-badge">🔒 Best Practice</span>
            </div>

            <p className="technique-description">{technique.description}</p>

            {/* Vulnerable Code Example */}
            {technique.vulnerable && (
              <div className="code-section vulnerable-section">
                <div className="code-header">
                  <span className="code-label">❌ Vulnerable Code</span>
                  <button
                    onClick={() => handleCopy(technique.vulnerable, `vuln-${index}`)}
                    className="copy-code-button"
                  >
                    {copySuccess[`vuln-${index}`] ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre className="code-block">
                  <code>{technique.vulnerable}</code>
                </pre>
              </div>
            )}

            {/* Secure Code Example */}
            <div className="code-section secure-section">
              <div className="code-header">
                <span className="code-label">✅ Secure Code</span>
                <button
                  onClick={() => handleCopy(technique.secure, `secure-${index}`)}
                  className="copy-code-button"
                >
                  {copySuccess[`secure-${index}`] ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
              <pre className="code-block">
                <code>{technique.secure}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference Checklist */}
      <div className="demo-container">
        <h3>✅ Security Checklist</h3>
        {activeTab === 'xss' ? (
          <div className="checklist">
            <div className="checklist-section">
              <h4>Input Handling</h4>
              <ul>
                <li>
                  <input type="checkbox" disabled />
                  <label>Validate all user input on both client and server side</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Use whitelist validation when possible (allow known-good patterns)</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Sanitize input using trusted libraries (e.g., DOMPurify)</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Set maximum input lengths to prevent buffer overflows</label>
                </li>
              </ul>
            </div>

            <div className="checklist-section">
              <h4>Output Encoding</h4>
              <ul>
                <li>
                  <input type="checkbox" disabled />
                  <label>Always encode output before displaying user input</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Use framework-provided escaping (React auto-escapes)</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Never use dangerouslySetInnerHTML with user input</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Context-aware encoding (HTML, JavaScript, CSS, URL)</label>
                </li>
              </ul>
            </div>

            <div className="checklist-section">
              <h4>Security Headers</h4>
              <ul>
                <li>
                  <input type="checkbox" disabled />
                  <label>Implement Content Security Policy (CSP)</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Set HTTPOnly flag on session cookies</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Use X-XSS-Protection header</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Set X-Content-Type-Options: nosniff</label>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="checklist">
            <div className="checklist-section">
              <h4>Query Construction</h4>
              <ul>
                <li>
                  <input type="checkbox" disabled />
                  <label>Always use parameterized queries / prepared statements</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Never concatenate user input into SQL queries</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Use ORM libraries when possible</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Avoid dynamic SQL whenever possible</label>
                </li>
              </ul>
            </div>

            <div className="checklist-section">
              <h4>Input Validation</h4>
              <ul>
                <li>
                  <input type="checkbox" disabled />
                  <label>Validate data types (numbers should be numbers)</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Whitelist allowed values for sort/filter parameters</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Limit input length to expected maximum</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Reject input with SQL keywords if not expected</label>
                </li>
              </ul>
            </div>

            <div className="checklist-section">
              <h4>Database Security</h4>
              <ul>
                <li>
                  <input type="checkbox" disabled />
                  <label>Use least privilege principle for database accounts</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Don't expose database errors to users</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Keep database software updated and patched</label>
                </li>
                <li>
                  <input type="checkbox" disabled />
                  <label>Enable database query logging for monitoring</label>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Testing & Tools */}
      <div className="demo-container">
        <h3>🔧 Security Testing Tools</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <h4>🕷️ OWASP ZAP</h4>
            <p>Free security scanner for finding vulnerabilities in web applications</p>
            <a
              href="https://www.zaproxy.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              Visit Website →
            </a>
          </div>

          <div className="tool-card">
            <h4>🔍 Burp Suite</h4>
            <p>Professional web security testing toolkit</p>
            <a
              href="https://portswigger.net/burp"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              Visit Website →
            </a>
          </div>

          <div className="tool-card">
            <h4>🧪 SQLMap</h4>
            <p>Automated SQL injection testing tool</p>
            <a
              href="https://sqlmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              Visit Website →
            </a>
          </div>

          <div className="tool-card">
            <h4>🛡️ Content Security Policy</h4>
            <p>CSP Evaluator and policy generator</p>
            <a
              href="https://csp-evaluator.withgoogle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              Visit Website →
            </a>
          </div>

          <div className="tool-card">
            <h4>🧹 DOMPurify</h4>
            <p>Fast, tolerant XSS sanitizer for HTML, MathML and SVG</p>
            <a
              href="https://github.com/cure53/DOMPurify"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              Visit GitHub →
            </a>
          </div>

          <div className="tool-card">
            <h4>📊 npm audit</h4>
            <p>Check for known vulnerabilities in dependencies</p>
            <code className="tool-command">npm audit</code>
          </div>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="demo-container">
        <h3>📚 Learning Resources</h3>
        <div className="resources-list">
          {RESOURCES.map((resource, index) => (
            <div key={index} className="resource-card">
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Best Practices */}
      <div className="demo-container">
        <h3>💡 Additional Best Practices</h3>
        <div className="best-practices-grid">
          <div className="practice-card">
            <div className="practice-icon">🔄</div>
            <h4>Regular Security Audits</h4>
            <p>Conduct regular security assessments and penetration testing</p>
          </div>

          <div className="practice-card">
            <div className="practice-icon">📝</div>
            <h4>Security Training</h4>
            <p>Ensure all developers receive regular security training</p>
          </div>

          <div className="practice-card">
            <div className="practice-icon">🔐</div>
            <h4>Defense in Depth</h4>
            <p>Implement multiple layers of security controls</p>
          </div>

          <div className="practice-card">
            <div className="practice-icon">📊</div>
            <h4>Monitor & Log</h4>
            <p>Implement comprehensive logging and monitoring</p>
          </div>

          <div className="practice-card">
            <div className="practice-icon">⚡</div>
            <h4>Incident Response</h4>
            <p>Have a documented incident response plan</p>
          </div>

          <div className="practice-card">
            <div className="practice-icon">🔧</div>
            <h4>Keep Updated</h4>
            <p>Regularly update frameworks, libraries, and dependencies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventionGuide;
