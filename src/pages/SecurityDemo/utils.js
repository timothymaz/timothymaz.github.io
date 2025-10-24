import { MOCK_DATABASE } from './vulnerabilities';

/**
 * Escape HTML special characters to prevent XSS
 * This is for DEMONSTRATION purposes - React already escapes by default
 */
export const escapeHtml = (text) => {
  if (!text) return '';

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;'
  };

  return String(text).replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Build SQL query (simulated - for display purposes only)
 */
export const buildVulnerableQuery = (username, password) => {
  return `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
};

/**
 * Build parameterized query (safe version)
 */
export const buildSafeQuery = (username, password) => {
  return {
    query: 'SELECT * FROM users WHERE username=? AND password=?',
    params: [username, password]
  };
};

/**
 * Simulate SQL query execution (SAFE - no real database)
 * This analyzes the query string and returns simulated results
 */
export const simulateQuery = (query, isVulnerable = true) => {
  const results = {
    success: false,
    rows: [],
    message: '',
    isAttack: false,
    attackType: null
  };

  // Detect SQL injection patterns
  const injectionPatterns = [
    { pattern: /'\s*OR\s*'1'\s*=\s*'1/i, type: 'OR 1=1 Bypass' },
    { pattern: /'\s*OR\s*1\s*=\s*1/i, type: 'OR 1=1 Bypass' },
    { pattern: /--/, type: 'Comment-based Bypass' },
    { pattern: /UNION\s+SELECT/i, type: 'UNION SELECT Attack' },
    { pattern: /DROP\s+TABLE/i, type: 'DROP TABLE Attack' },
    { pattern: /SLEEP\s*\(/i, type: 'Time-based Blind Injection' },
    { pattern: /;\s*DROP/i, type: 'Stacked Query Attack' }
  ];

  // Check for injection attempts
  for (const { pattern, type } of injectionPatterns) {
    if (pattern.test(query)) {
      results.isAttack = true;
      results.attackType = type;
      break;
    }
  }

  if (isVulnerable && results.isAttack) {
    // Simulate different attack results
    if (results.attackType.includes('OR 1=1') || results.attackType.includes('Comment')) {
      results.success = true;
      results.rows = MOCK_DATABASE.users; // Returns all users
      results.message = '⚠️ Authentication bypassed! All users returned.';
    } else if (results.attackType.includes('UNION')) {
      results.success = true;
      results.rows = [...MOCK_DATABASE.users, ...MOCK_DATABASE.admin_users];
      results.message = '⚠️ UNION attack successful! Sensitive data exposed.';
    } else if (results.attackType.includes('DROP TABLE')) {
      results.success = false;
      results.message = '💥 DROP TABLE executed! Database destroyed. (Simulated - no actual damage)';
    } else if (results.attackType.includes('Time-based')) {
      results.success = true;
      results.message = '⏱️ Time-based attack detected. Query would delay 5 seconds.';
    } else {
      results.success = true;
      results.message = `⚠️ ${results.attackType} detected!`;
    }
  } else if (!isVulnerable && results.isAttack) {
    // Parameterized query blocks the attack
    results.success = false;
    results.rows = [];
    results.message = '✅ Attack blocked by parameterized query! No results returned.';
  } else {
    // Normal query without injection
    const usernameMatch = query.match(/username='([^']*)'/);
    const passwordMatch = query.match(/password='([^']*)'/);

    if (usernameMatch && passwordMatch) {
      const username = usernameMatch[1];
      const password = passwordMatch[1];

      const user = MOCK_DATABASE.users.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        results.success = true;
        results.rows = [user];
        results.message = '✅ Login successful!';
      } else {
        results.success = false;
        results.rows = [];
        results.message = '❌ Invalid credentials.';
      }
    }
  }

  return results;
};

/**
 * Simulate parameterized query execution (always safe)
 */
export const simulateParameterizedQuery = (username, password) => {
  const user = MOCK_DATABASE.users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    return {
      success: true,
      rows: [user],
      message: '✅ Login successful with parameterized query!',
      isAttack: false
    };
  } else {
    return {
      success: false,
      rows: [],
      message: '❌ Invalid credentials. SQL injection attempts were safely ignored.',
      isAttack: false
    };
  }
};

/**
 * Highlight SQL syntax (basic syntax highlighting)
 */
export const highlightSQL = (query) => {
  if (!query) return '';

  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'UPDATE', 'DELETE',
    'DROP', 'TABLE', 'UNION', 'ORDER', 'BY', 'GROUP', 'HAVING', 'JOIN',
    'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'AS', 'LIMIT', 'OFFSET'
  ];

  let highlighted = query;

  // Highlight SQL keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlighted = highlighted.replace(
      regex,
      `<span class="sql-keyword">${keyword.toUpperCase()}</span>`
    );
  });

  // Highlight strings
  highlighted = highlighted.replace(
    /'([^']*)'/g,
    '<span class="sql-string">\'$1\'</span>'
  );

  // Highlight numbers
  highlighted = highlighted.replace(
    /\b(\d+)\b/g,
    '<span class="sql-number">$1</span>'
  );

  // Highlight comments
  highlighted = highlighted.replace(
    /--.*/g,
    '<span class="sql-comment">$&</span>'
  );

  return highlighted;
};

/**
 * Detect if input contains potential XSS
 */
export const detectXSS = (input) => {
  if (!input) return { isXSS: false, type: null };

  const xssPatterns = [
    { pattern: /<script/i, type: 'Script Tag' },
    { pattern: /<img[^>]+onerror/i, type: 'Image Onerror' },
    { pattern: /<svg[^>]+onload/i, type: 'SVG Onload' },
    { pattern: /<iframe/i, type: 'Iframe Injection' },
    { pattern: /<body[^>]+onload/i, type: 'Body Onload' },
    { pattern: /javascript:/i, type: 'JavaScript Protocol' },
    { pattern: /<embed/i, type: 'Embed Tag' },
    { pattern: /<object/i, type: 'Object Tag' },
    { pattern: /on\w+\s*=/i, type: 'Event Handler' }
  ];

  for (const { pattern, type } of xssPatterns) {
    if (pattern.test(input)) {
      return { isXSS: true, type };
    }
  }

  return { isXSS: false, type: null };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Format code for display (add line numbers, etc.)
 */
export const formatCode = (code, language = 'javascript') => {
  if (!code) return '';

  const lines = code.trim().split('\n');
  return lines.map((line, index) => ({
    number: index + 1,
    content: line,
    language
  }));
};

/**
 * Get severity badge color
 */
export const getSeverityColor = (severity) => {
  const colors = {
    critical: '#e03131',
    high: '#fd7e14',
    medium: '#fab005',
    low: '#82c91e'
  };
  return colors[severity] || '#868e96';
};

/**
 * Sanitize HTML (for demonstration purposes)
 * Shows what sanitization looks like
 */
export const demonstrateSanitization = (input) => {
  // This is just for showing the difference
  // In production, use DOMPurify or similar
  const sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '');

  return {
    original: input,
    sanitized: sanitized,
    removed: input !== sanitized
  };
};
