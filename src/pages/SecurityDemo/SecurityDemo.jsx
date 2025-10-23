import './SecurityDemo.css';

const SecurityDemo = () => {
  return (
    <div className="security-demo-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="page-title">Security Vulnerability Demonstrator</h1>
          <p className="page-subtitle">
            Educational tool showcasing XSS and SQL injection attacks - Learn how they work and how to prevent them
          </p>
        </div>

        <div className="coming-soon">
          <h2>🚧 Under Construction</h2>
          <p>
            The full Security Vulnerability Demonstrator with interactive XSS and SQL injection demos
            is currently being built as a React component.
          </p>
          <p>
            In the meantime, you can check out the original demo:
          </p>
          <a
            href="/XSSSQL/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View Original XSS Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecurityDemo;
