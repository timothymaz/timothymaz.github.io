import { useEffect } from 'react';
import './Terminal.css';

const Terminal = () => {
  useEffect(() => {
    // Redirect to the actual terminal page
    window.location.href = '/Terminal/terminal.html';
  }, []);

  return (
    <div className="terminal-redirect">
      <div className="container">
        <div className="redirect-message">
          <h1>Redirecting to Terminal...</h1>
          <p>If you're not redirected automatically, <a href="/Terminal/terminal.html">click here</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
