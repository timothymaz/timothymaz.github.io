// XSS Attack Examples and Educational Content
export const XSS_EXAMPLES = {
  basicScript: {
    name: "Basic Script Injection",
    payload: "<script>alert('XSS Attack!')</script>",
    description: "The most common XSS attack. Injects JavaScript that executes when the page loads.",
    severity: "critical",
    impact: "Can steal cookies, session tokens, or redirect users to malicious sites."
  },
  imageTag: {
    name: "Image Tag with Error Handler",
    payload: "<img src=x onerror=\"alert('XSS')\">",
    description: "Uses an image tag with an invalid source. When the image fails to load, the error handler executes malicious code.",
    severity: "high",
    impact: "Bypasses some input filters that only block <script> tags."
  },
  svgOnload: {
    name: "SVG Onload Event",
    payload: "<svg onload=\"alert('XSS')\">",
    description: "SVG elements support event handlers. The onload event fires when the SVG is rendered.",
    severity: "high",
    impact: "Another way to bypass <script> tag filters."
  },
  iframeJavascript: {
    name: "Iframe with Javascript Protocol",
    payload: "<iframe src=\"javascript:alert('XSS')\">",
    description: "Uses the javascript: protocol in an iframe source to execute code.",
    severity: "high",
    impact: "Can execute arbitrary JavaScript in the context of the page."
  },
  bodyOnload: {
    name: "Body Tag with Onload",
    payload: "<body onload=\"alert('XSS')\">",
    description: "If you can inject a <body> tag, the onload event executes when the page loads.",
    severity: "medium",
    impact: "Requires the ability to inject HTML elements, not just attributes."
  },
  linkStylesheet: {
    name: "Link Tag Import",
    payload: "<link rel=\"stylesheet\" href=\"javascript:alert('XSS')\">",
    description: "Attempts to load a stylesheet using the javascript: protocol.",
    severity: "medium",
    impact: "May be blocked by modern browsers but still worth testing."
  }
};

// SQL Injection Attack Examples
export const SQL_EXAMPLES = {
  authBypass: {
    name: "Authentication Bypass",
    username: "admin' OR '1'='1",
    password: "anything",
    description: "Makes the SQL query always return true, bypassing authentication.",
    query: "SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='anything'",
    explanation: "The OR '1'='1' condition is always true, so the query returns all users.",
    severity: "critical",
    impact: "Attacker can log in as any user without knowing the password."
  },
  commentBypass: {
    name: "Comment-Based Bypass",
    username: "admin'--",
    password: "",
    description: "Uses SQL comments (--) to ignore the rest of the query.",
    query: "SELECT * FROM users WHERE username='admin'--' AND password=''",
    explanation: "Everything after -- is treated as a comment and ignored.",
    severity: "critical",
    impact: "Attacker can log in as admin without a password."
  },
  unionSelect: {
    name: "UNION SELECT Attack",
    username: "' UNION SELECT username, password FROM admin_users--",
    password: "",
    description: "Uses UNION to combine results from another table.",
    query: "SELECT * FROM users WHERE username='' UNION SELECT username, password FROM admin_users--' AND password=''",
    explanation: "UNION allows retrieving data from other tables in the database.",
    severity: "critical",
    impact: "Attacker can access sensitive data from other tables."
  },
  dropTable: {
    name: "DROP TABLE Attack",
    username: "'; DROP TABLE users; --",
    password: "",
    description: "Attempts to delete the entire users table.",
    query: "SELECT * FROM users WHERE username=''; DROP TABLE users; --' AND password=''",
    explanation: "The semicolon ends the SELECT query and starts a new DROP TABLE query.",
    severity: "critical",
    impact: "Can destroy entire database tables and cause data loss."
  },
  timeBasedBlind: {
    name: "Time-Based Blind Injection",
    username: "admin' AND SLEEP(5)--",
    password: "",
    description: "Uses database functions to cause delays, helping attackers enumerate data.",
    query: "SELECT * FROM users WHERE username='admin' AND SLEEP(5)--' AND password=''",
    explanation: "If the query takes 5 seconds, the attacker knows the username exists.",
    severity: "high",
    impact: "Can be used to extract data character by character."
  },
  booleanBlind: {
    name: "Boolean-Based Blind Injection",
    username: "admin' AND 1=1--",
    password: "",
    description: "Uses true/false conditions to extract information about the database.",
    query: "SELECT * FROM users WHERE username='admin' AND 1=1--' AND password=''",
    explanation: "Attacker tests different conditions to infer database structure and content.",
    severity: "high",
    impact: "Can enumerate entire database structure and extract sensitive data."
  }
};

// Prevention Techniques
export const PREVENTION_TECHNIQUES = {
  xss: [
    {
      title: "Input Sanitization",
      description: "Remove or encode potentially dangerous characters from user input before processing.",
      vulnerable: `// Vulnerable Code
const userInput = req.body.comment;
db.save(userInput); // Saves raw input`,
      secure: `// Secure Code
import DOMPurify from 'dompurify';
const userInput = req.body.comment;
const clean = DOMPurify.sanitize(userInput);
db.save(clean);`,
      language: "javascript"
    },
    {
      title: "Output Encoding",
      description: "Always encode data when displaying it in HTML to prevent script execution.",
      vulnerable: `// Vulnerable Code (React)
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Vulnerable Code (Vanilla JS)
element.innerHTML = userInput;`,
      secure: `// Secure Code (React)
<div>{userInput}</div> // React auto-escapes

// Secure Code (Vanilla JS)
element.textContent = userInput;

// OR manually escape
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}`,
      language: "javascript"
    },
    {
      title: "Content Security Policy (CSP)",
      description: "Use HTTP headers to restrict where scripts can be loaded from.",
      vulnerable: `<!-- No CSP - scripts can run from anywhere -->
<html>
  <head>
    <!-- Any injected script will execute -->
  </head>
</html>`,
      secure: `<!-- Set CSP Header -->
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;`,
      language: "http"
    },
    {
      title: "HTTPOnly Cookies",
      description: "Prevent JavaScript from accessing sensitive cookies.",
      vulnerable: `// Vulnerable - Cookie accessible to JavaScript
res.cookie('sessionId', sessionId, {
  secure: true
});`,
      secure: `// Secure - Cookie not accessible to JavaScript
res.cookie('sessionId', sessionId, {
  httpOnly: true,  // Prevents XSS cookie theft
  secure: true,    // Only sent over HTTPS
  sameSite: 'strict' // Prevents CSRF
});`,
      language: "javascript"
    },
    {
      title: "Input Validation",
      description: "Validate and whitelist expected input formats.",
      vulnerable: `// Accepts any input
const email = req.body.email;
sendEmail(email);`,
      secure: `// Validates email format
const email = req.body.email;
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).send('Invalid email');
}
sendEmail(email);`,
      language: "javascript"
    }
  ],
  sql: [
    {
      title: "Parameterized Queries / Prepared Statements",
      description: "The most effective defense. Never concatenate user input into SQL queries.",
      vulnerable: `// Vulnerable - SQL Injection possible
const query = \`SELECT * FROM users
  WHERE username='\${username}'
  AND password='\${password}'\`;
db.query(query);`,
      secure: `// Secure - Using parameterized query
const query = 'SELECT * FROM users WHERE username=? AND password=?';
db.query(query, [username, password]);

// OR with named parameters
const query = 'SELECT * FROM users WHERE username=:user AND password=:pass';
db.query(query, { user: username, pass: password });`,
      language: "javascript"
    },
    {
      title: "ORM Libraries",
      description: "Use Object-Relational Mapping libraries that handle parameterization automatically.",
      vulnerable: `// Vulnerable - Raw query with string concatenation
const user = await db.raw(
  \`SELECT * FROM users WHERE id = \${userId}\`
);`,
      secure: `// Secure - Using Sequelize ORM
const user = await User.findOne({
  where: { id: userId }
});

// Secure - Using Prisma
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// Secure - Using TypeORM
const user = await userRepository.findOne({
  where: { id: userId }
});`,
      language: "javascript"
    },
    {
      title: "Input Validation & Whitelisting",
      description: "Validate input types and whitelist allowed characters.",
      vulnerable: `// Vulnerable - No validation
const sortBy = req.query.sortBy;
const query = \`SELECT * FROM products ORDER BY \${sortBy}\`;`,
      secure: `// Secure - Whitelist allowed values
const sortBy = req.query.sortBy;
const allowedColumns = ['name', 'price', 'date'];

if (!allowedColumns.includes(sortBy)) {
  return res.status(400).send('Invalid sort column');
}

// Safe to use because it's whitelisted
const query = \`SELECT * FROM products ORDER BY \${sortBy}\`;`,
      language: "javascript"
    },
    {
      title: "Least Privilege Principle",
      description: "Database users should only have permissions they absolutely need.",
      vulnerable: `// Vulnerable - App uses root/admin database user
const connection = mysql.createConnection({
  user: 'root',
  password: 'admin123',
  database: 'myapp'
});`,
      secure: `// Secure - App uses limited permission user
const connection = mysql.createConnection({
  user: 'app_user',      // Limited user
  password: process.env.DB_PASS,
  database: 'myapp'
});

// In database, grant only necessary permissions:
// GRANT SELECT, INSERT, UPDATE ON myapp.* TO 'app_user'@'localhost';
// DO NOT GRANT: DROP, CREATE, ALTER, DELETE (if not needed)`,
      language: "javascript"
    },
    {
      title: "Stored Procedures",
      description: "Use stored procedures with proper parameterization.",
      vulnerable: `// Vulnerable - Dynamic SQL in stored procedure
CREATE PROCEDURE GetUser(@username VARCHAR(50))
AS
BEGIN
  DECLARE @sql NVARCHAR(MAX)
  SET @sql = 'SELECT * FROM users WHERE username = ''' + @username + ''''
  EXEC(@sql)
END`,
      secure: `// Secure - Parameterized stored procedure
CREATE PROCEDURE GetUser(@username VARCHAR(50))
AS
BEGIN
  SELECT * FROM users WHERE username = @username
END

// Called from application:
db.execute('CALL GetUser(?)', [username]);`,
      language: "sql"
    },
    {
      title: "Error Handling",
      description: "Don't expose database error messages to users.",
      vulnerable: `// Vulnerable - Shows full SQL error
try {
  const result = await db.query(query);
} catch (error) {
  res.status(500).send(error.message);
  // Exposes: "SQL syntax error at line 1..."
}`,
      secure: `// Secure - Generic error message to user, log details
try {
  const result = await db.query(query);
} catch (error) {
  logger.error('Database error:', error); // Log for debugging
  res.status(500).send('An error occurred'); // Generic message
}`,
      language: "javascript"
    }
  ]
};

// Educational Resources
export const RESOURCES = [
  {
    title: "OWASP Top 10",
    url: "https://owasp.org/www-project-top-ten/",
    description: "The most critical web application security risks"
  },
  {
    title: "OWASP XSS Prevention Cheat Sheet",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
    description: "Comprehensive guide to preventing XSS attacks"
  },
  {
    title: "OWASP SQL Injection Prevention Cheat Sheet",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
    description: "Best practices for preventing SQL injection"
  },
  {
    title: "PortSwigger Web Security Academy",
    url: "https://portswigger.net/web-security",
    description: "Free online training for web security testing"
  },
  {
    title: "HackTheBox",
    url: "https://www.hackthebox.com/",
    description: "Practice penetration testing in a legal, safe environment"
  },
  {
    title: "Content Security Policy (CSP) Guide",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
    description: "Mozilla's comprehensive CSP documentation"
  }
];

// Mock Database for SQL Demo
export const MOCK_DATABASE = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'user', password: 'pass123', email: 'user@example.com', role: 'user' },
    { id: 3, username: 'guest', password: 'guest', email: 'guest@example.com', role: 'guest' }
  ],
  admin_users: [
    { id: 1, username: 'superadmin', password: 'super_secret', email: 'super@example.com', privileges: 'all' }
  ]
};
