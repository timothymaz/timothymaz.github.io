import { useState } from 'react';
import { SQL_EXAMPLES, MOCK_DATABASE } from './vulnerabilities';
import {
  buildVulnerableQuery,
  buildSafeQuery,
  simulateQuery,
  simulateParameterizedQuery,
  highlightSQL,
  copyToClipboard
} from './utils';

const SQLDemo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVulnerable, setIsVulnerable] = useState(true);
  const [queryResult, setQueryResult] = useState(null);
  const [selectedExample, setSelectedExample] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleLogin = () => {
    if (isVulnerable) {
      const query = buildVulnerableQuery(username, password);
      const result = simulateQuery(query, true);
      setQueryResult({ query, result, type: 'vulnerable' });
    } else {
      const { query, params } = buildSafeQuery(username, password);
      const result = simulateParameterizedQuery(username, password);
      setQueryResult({ query, params, result, type: 'safe' });
    }
  };

  const handleTryExample = (example) => {
    setUsername(example.username);
    setPassword(example.password);
    setSelectedExample(example);
    setIsVulnerable(true);

    // Auto-execute after a brief delay
    setTimeout(() => {
      const query = buildVulnerableQuery(example.username, example.password);
      const result = simulateQuery(query, true);
      setQueryResult({ query, result, type: 'vulnerable' });
    }, 100);
  };

  const handleCopy = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setQueryResult(null);
    setSelectedExample(null);
  };

  return (
    <div className="sql-demo">
      <div className="demo-header">
        <h2>💉 SQL Injection Demonstration</h2>
        <p className="demo-description">
          SQL Injection allows attackers to manipulate database queries by injecting malicious SQL code.
          This demo shows how SQL injection works using a simulated database.
        </p>
      </div>

      <div className="warning-banner">
        <span className="warning-icon">⚠️</span>
        <div className="warning-content">
          <strong>Simulated Environment Only</strong>
          <p>
            This demo uses a mock database. No real database is accessed.
            All queries are simulated for educational purposes.
          </p>
        </div>
      </div>

      {/* Mock Database Display */}
      <div className="demo-container">
        <h3>📊 Mock Database</h3>
        <p>This is our simulated database with sample users:</p>

        <div className="database-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATABASE.users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{'•'.repeat(user.password.length)}</td>
                  <td>{user.email}</td>
                  <td><span className="role-badge">{user.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-box">
          <strong>💡 Valid Credentials (for testing):</strong>
          <ul>
            <li><code>admin</code> / <code>admin123</code></li>
            <li><code>user</code> / <code>pass123</code></li>
            <li><code>guest</code> / <code>guest</code></li>
          </ul>
        </div>
      </div>

      {/* Interactive Login Form */}
      <div className="demo-container">
        <h3>🔐 Simulated Login Form</h3>

        <div className="login-demo">
          <div className="login-controls">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="demo-input"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="demo-input"
              />
            </div>

            <div className="button-group">
              <button onClick={handleLogin} className="login-button">
                Login
              </button>
              <button onClick={handleReset} className="reset-button">
                Reset
              </button>
              <button
                onClick={() => setIsVulnerable(!isVulnerable)}
                className={`toggle-button ${isVulnerable ? 'vulnerable' : 'safe'}`}
              >
                {isVulnerable ? '🔓 Vulnerable' : '🔒 Parameterized'}
              </button>
            </div>
          </div>

          {/* Query Visualization */}
          {queryResult && (
            <div className="query-visualization">
              <div className="query-box">
                <h4>Generated SQL Query:</h4>
                {queryResult.type === 'vulnerable' ? (
                  <div className="vulnerable-query">
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: highlightSQL(queryResult.query)
                      }}
                    />
                    {queryResult.result.isAttack && (
                      <div className="attack-warning">
                        🚨 <strong>Attack Detected:</strong> {queryResult.result.attackType}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="safe-query">
                    <pre>{queryResult.query}</pre>
                    <div className="params-display">
                      <strong>Parameters:</strong> [{queryResult.params.map(p => `"${p}"`).join(', ')}]
                    </div>
                    <div className="safe-indicator">
                      ✅ Query uses parameterization - injection attempts are safely ignored
                    </div>
                  </div>
                )}
              </div>

              {/* Query Results */}
              <div className="results-box">
                <h4>Query Results:</h4>
                <div className={`result-message ${queryResult.result.success ? 'success' : 'error'}`}>
                  {queryResult.result.message}
                </div>

                {queryResult.result.rows && queryResult.result.rows.length > 0 && (
                  <div className="results-table">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.result.rows.map((row, index) => (
                          <tr key={index} className={queryResult.result.isAttack ? 'leaked-data' : ''}>
                            <td>{row.id}</td>
                            <td>{row.username}</td>
                            <td>{row.email}</td>
                            <td><span className="role-badge">{row.role}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {queryResult.result.isAttack && (
                      <div className="data-leak-warning">
                        ⚠️ Sensitive data exposed due to SQL injection!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Example SQL Injection Attacks */}
      <div className="demo-container">
        <h3>Common SQL Injection Patterns</h3>
        <p>Click any example to test it in the login form above:</p>

        <div className="examples-grid">
          {Object.values(SQL_EXAMPLES).map((example, index) => (
            <div
              key={index}
              className={`example-card ${selectedExample === example ? 'selected' : ''}`}
            >
              <div className="example-header">
                <h4>{example.name}</h4>
                <span
                  className="severity-badge"
                  style={{
                    backgroundColor:
                      example.severity === 'critical' ? '#e03131' :
                      example.severity === 'high' ? '#fd7e14' : '#fab005'
                  }}
                >
                  {example.severity}
                </span>
              </div>

              <div className="sql-inputs">
                <div className="input-display">
                  <strong>Username:</strong>
                  <code>{example.username}</code>
                  <button
                    onClick={() => handleCopy(example.username)}
                    className="copy-button"
                    title="Copy username"
                  >
                    {copySuccess ? '✓' : '📋'}
                  </button>
                </div>
                {example.password && (
                  <div className="input-display">
                    <strong>Password:</strong>
                    <code>{example.password}</code>
                  </div>
                )}
              </div>

              <div className="resulting-query">
                <strong>Resulting Query:</strong>
                <pre className="query-preview">{example.query}</pre>
              </div>

              <p className="example-description">{example.description}</p>

              <div className="example-explanation">
                <strong>Why it works:</strong> {example.explanation}
              </div>

              <div className="example-impact">
                <strong>Impact:</strong> {example.impact}
              </div>

              <button
                onClick={() => handleTryExample(example)}
                className="try-button"
              >
                Try This Attack
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How SQL Injection Works */}
      <div className="demo-container">
        <h3>💡 How SQL Injection Works</h3>
        <div className="explanation-section">
          <div className="explanation-box">
            <h4>1. Vulnerable Query Construction</h4>
            <p>Application builds SQL query using string concatenation:</p>
            <code className="code-block">
              {`const query = \`SELECT * FROM users
WHERE username='\${username}'
AND password='\${password}'\`;`}
            </code>
          </div>

          <div className="explanation-box">
            <h4>2. Malicious Input</h4>
            <p>Attacker enters SQL code instead of normal input:</p>
            <code className="code-block">
              Username: admin' OR '1'='1<br />
              Password: anything
            </code>
          </div>

          <div className="explanation-box">
            <h4>3. Query Manipulation</h4>
            <p>The malicious input changes the query logic:</p>
            <code className="code-block">
              {`SELECT * FROM users
WHERE username='admin' OR '1'='1'
AND password='anything'`}
            </code>
            <p className="highlight-text">
              Since '1'='1' is always true, authentication is bypassed!
            </p>
          </div>

          <div className="explanation-box">
            <h4>4. Unauthorized Access</h4>
            <p>
              The query returns all users, granting the attacker access to the system
              or exposing sensitive data.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison: Vulnerable vs Safe */}
      <div className="demo-container comparison-section">
        <h3>🔍 Vulnerable vs. Safe Code</h3>
        <div className="code-comparison">
          <div className="code-box vulnerable-code">
            <h4>❌ Vulnerable Code</h4>
            <pre>{`// String concatenation - NEVER DO THIS
const query = \`SELECT * FROM users
  WHERE username='\${username}'
  AND password='\${password}'\`;

db.query(query);

// Problem: User input directly in query
// Allows SQL injection attacks`}</pre>
          </div>

          <div className="code-box safe-code">
            <h4>✅ Safe Code (Parameterized)</h4>
            <pre>{`// Parameterized query - ALWAYS DO THIS
const query = \`SELECT * FROM users
  WHERE username=?
  AND password=?\`;

db.query(query, [username, password]);

// Safe: Parameters are properly escaped
// SQL injection attempts are neutralized`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLDemo;
