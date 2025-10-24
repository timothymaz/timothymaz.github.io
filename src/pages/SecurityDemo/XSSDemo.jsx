import { useState } from 'react';
import { XSS_EXAMPLES } from './vulnerabilities';
import { escapeHtml, detectXSS, copyToClipboard } from './utils';

const XSSDemo = () => {
  const [userInput, setUserInput] = useState('');
  const [showVulnerable, setShowVulnerable] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleTryExample = (example) => {
    setUserInput(example.payload);
    setSelectedExample(example);
  };

  const handleCopy = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const xssDetection = detectXSS(userInput);

  return (
    <div className="xss-demo">
      <div className="demo-header">
        <h2>🎯 XSS (Cross-Site Scripting) Demonstration</h2>
        <p className="demo-description">
          Cross-Site Scripting (XSS) attacks inject malicious scripts into web pages.
          This interactive demo shows how XSS works and how to prevent it.
        </p>
      </div>

      <div className="warning-banner">
        <span className="warning-icon">⚠️</span>
        <div className="warning-content">
          <strong>Educational Demonstration Only</strong>
          <p>
            These examples show how XSS vulnerabilities work, but no actual attacks are executed.
            All malicious code is displayed as text or safely escaped.
          </p>
        </div>
      </div>

      {/* Interactive Input Section */}
      <div className="demo-container">
        <h3>Try It Yourself</h3>
        <p>Enter text or try one of the example XSS payloads below:</p>

        <div className="input-group">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter text or try an XSS payload..."
            className="demo-input"
          />
          <button
            onClick={() => setShowVulnerable(!showVulnerable)}
            className={`toggle-button ${showVulnerable ? 'vulnerable' : 'safe'}`}
          >
            {showVulnerable ? '🔓 Vulnerable Mode' : '🔒 Safe Mode'}
          </button>
        </div>

        {xssDetection.isXSS && (
          <div className="xss-detection">
            <span className="detection-icon">🚨</span>
            <span>
              Potential XSS detected: <strong>{xssDetection.type}</strong>
            </span>
          </div>
        )}

        {/* Output Comparison */}
        <div className="output-comparison">
          {/* Vulnerable Output */}
          <div className="output-box vulnerable-demo">
            <div className="output-header">
              <span className="output-title">❌ Vulnerable Output</span>
              <span className="output-label">Uses .innerHTML (DANGEROUS)</span>
            </div>
            <div className="output-content">
              {showVulnerable ? (
                <div className="vulnerable-warning">
                  <p><strong>⚠️ Demonstration Only</strong></p>
                  <p>In a real vulnerable application, this would execute:</p>
                  <code className="attack-code">{userInput || 'No input'}</code>
                  <p className="impact-note">
                    {xssDetection.isXSS
                      ? `This ${xssDetection.type} attack would execute malicious JavaScript!`
                      : 'Enter an XSS payload to see what would happen.'
                    }
                  </p>
                </div>
              ) : (
                <div className="mode-disabled">
                  <p>🔒 Vulnerable mode is disabled</p>
                  <p>Click "Vulnerable Mode" button to see what would happen</p>
                </div>
              )}
            </div>
            <div className="code-example">
              <code>element.innerHTML = userInput; // ❌ NEVER DO THIS</code>
            </div>
          </div>

          {/* Safe Output */}
          <div className="output-box safe-demo">
            <div className="output-header">
              <span className="output-title">✅ Safe Output</span>
              <span className="output-label">Properly Escaped</span>
            </div>
            <div className="output-content safe-content">
              {userInput ? (
                <>
                  <div className="escaped-output">
                    {userInput}
                  </div>
                  <div className="escaped-html">
                    <strong>HTML Escaped Version:</strong>
                    <code>{escapeHtml(userInput)}</code>
                  </div>
                </>
              ) : (
                <p className="placeholder">Enter text to see safe output...</p>
              )}
            </div>
            <div className="code-example">
              <code>element.textContent = userInput; // ✅ SAFE</code>
            </div>
          </div>
        </div>
      </div>

      {/* Example XSS Payloads */}
      <div className="demo-container">
        <h3>Common XSS Attack Patterns</h3>
        <p>Click any example to test it in the demo above:</p>

        <div className="examples-grid">
          {Object.values(XSS_EXAMPLES).map((example, index) => (
            <div
              key={index}
              className={`example-card ${selectedExample === example ? 'selected' : ''}`}
            >
              <div className="example-header">
                <h4>{example.name}</h4>
                <span
                  className="severity-badge"
                  style={{ backgroundColor: example.severity === 'critical' ? '#e03131' : '#fd7e14' }}
                >
                  {example.severity}
                </span>
              </div>

              <div className="example-payload">
                <code>{example.payload}</code>
                <button
                  onClick={() => handleCopy(example.payload)}
                  className="copy-button"
                  title="Copy payload"
                >
                  {copySuccess ? '✓' : '📋'}
                </button>
              </div>

              <p className="example-description">{example.description}</p>

              <div className="example-impact">
                <strong>Impact:</strong> {example.impact}
              </div>

              <button
                onClick={() => handleTryExample(example)}
                className="try-button"
              >
                Try This Example
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How XSS Works */}
      <div className="demo-container">
        <h3>💡 How XSS Attacks Work</h3>
        <div className="explanation-section">
          <div className="explanation-box">
            <h4>1. Attacker Injects Malicious Script</h4>
            <p>
              An attacker enters malicious JavaScript into a form field, URL parameter,
              or any other user input that gets displayed on the page.
            </p>
            <code className="inline-code">&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
          </div>

          <div className="explanation-box">
            <h4>2. Application Stores or Reflects Input</h4>
            <p>
              The application either stores the input in a database (Stored XSS) or
              immediately reflects it back to the page (Reflected XSS) without proper escaping.
            </p>
          </div>

          <div className="explanation-box">
            <h4>3. Victim Views the Page</h4>
            <p>
              When a victim loads the page, the malicious script executes in their browser
              with full access to cookies, session tokens, and DOM manipulation.
            </p>
          </div>

          <div className="explanation-box">
            <h4>4. Attacker Gains Control</h4>
            <p>
              The script can steal credentials, redirect users, modify page content,
              or perform actions on behalf of the victim.
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Impact */}
      <div className="demo-container impact-section">
        <h3>🎯 Real-World Impact</h3>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-icon">🍪</div>
            <h4>Session Hijacking</h4>
            <p>Steal session cookies to impersonate users</p>
            <code className="attack-example">
              document.cookie
            </code>
          </div>

          <div className="impact-card">
            <div className="impact-icon">🔑</div>
            <h4>Credential Theft</h4>
            <p>Create fake login forms to steal passwords</p>
            <code className="attack-example">
              Fake form → Send to attacker
            </code>
          </div>

          <div className="impact-card">
            <div className="impact-icon">🎣</div>
            <h4>Phishing</h4>
            <p>Modify page content to trick users</p>
            <code className="attack-example">
              Redirect to malicious site
            </code>
          </div>

          <div className="impact-card">
            <div className="impact-icon">🦠</div>
            <h4>Malware Distribution</h4>
            <p>Force downloads of malicious software</p>
            <code className="attack-example">
              Auto-download payload
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XSSDemo;
