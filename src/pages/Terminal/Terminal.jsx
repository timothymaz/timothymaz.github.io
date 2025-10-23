import { useState, useEffect, useRef } from 'react';
import MatrixRain from './MatrixRain';
import './Terminal.css';

const Terminal = () => {
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [isMatrixVisible, setIsMatrixVisible] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const outputEndRef = useRef(null);

  const PASSWORD = 'NeoTrinity';

  // Command data
  const BANNER = [
    '<span class="index">',
    '',
    'TTTTTTTTTTTTTTTTTTTTTTT  iiii                               MMMMMMMM               MMMMMMMM                                                                         ',
    'T:::::::::::::::::::::T i::::i                              M:::::::M             M:::::::M                                                                         ',
    'T:::::::::::::::::::::T  iiii                               M::::::::M           M::::::::M                                                                         ',
    'T:::::TT:::::::TT:::::T                                     M:::::::::M         M:::::::::M                                                                         ',
    'TTTTTT  T:::::T  TTTTTTiiiiiii    mmmmmmm    mmmmmmm        M::::::::::M       M::::::::::M  aaaaaaaaaaaaa   zzzzzzzzzzzzzzzzzuuuuuu    uuuuuu  rrrrr   rrrrrrrrr   ',
    '        T:::::T        i:::::i  mm:::::::m  m:::::::mm      M:::::::::::M     M:::::::::::M  a::::::::::::a  z:::::::::::::::zu::::u    u::::u  r::::rrr:::::::::r  ',
    '        T:::::T         i::::i m::::::::::mm::::::::::m     M:::::::M::::M   M::::M:::::::M  aaaaaaaaa:::::a z::::::::::::::z u::::u    u::::u  r:::::::::::::::::r ',
    '        T:::::T         i::::i m::::::::::::::::::::::m     M::::::M M::::M M::::M M::::::M           a::::a zzzzzzzz::::::z  u::::u    u::::u  rr::::::rrrrr::::::r',
    '        T:::::T         i::::i m:::::mmm::::::mmm:::::m     M::::::M  M::::M::::M  M::::::M    aaaaaaa:::::a       z::::::z   u::::u    u::::u   r:::::r     r:::::r',
    '        T:::::T         i::::i m::::m   m::::m   m::::m     M::::::M   M:::::::M   M::::::M  aa::::::::::::a      z::::::z    u::::u    u::::u   r:::::r     rrrrrrr',
    '        T:::::T         i::::i m::::m   m::::m   m::::m     M::::::M    M:::::M    M::::::M a::::aaaa::::::a     z::::::z     u::::u    u::::u   r:::::r            ',
    '        T:::::T         i::::i m::::m   m::::m   m::::m     M::::::M     MMMMM     M::::::Ma::::a    a:::::a    z::::::z      u:::::uuuu:::::u   r:::::r            ',
    '      TT:::::::TT      i::::::im::::m   m::::m   m::::m     M::::::M               M::::::Ma::::a    a:::::a   z::::::zzzzzzzzu:::::::::::::::uu r:::::r            ',
    '      T:::::::::T      i::::::im::::m   m::::m   m::::m     M::::::M               M::::::Ma:::::aaaa::::::a  z::::::::::::::z u:::::::::::::::u r:::::r            ',
    '      T:::::::::T      i::::::im::::m   m::::m   m::::m     M::::::M               M::::::M a::::::::::aa:::az:::::::::::::::z  uu::::::::uu:::u r:::::r            ',
    '      TTTTTTTTTTT      iiiiiiiimmmmmm   mmmmmm   mmmmmm     MMMMMMMM               MMMMMMMM  aaaaaaaaaa  aaaazzzzzzzzzzzzzzzzz    uuuuuuuu  uuuu rrrrrrr            ',
    '',
    '',
    '<span class="color2">Welcome to my interactive web terminal v2.0</span>',
    '<span class="color2">For a list of available commands, type <span class="command">help</span></span>',
    '',
  ];

  const HELP = [
    '<br>',
    '<span class="command">help</span>           You\'re looking at it',
    '<span class="command">about</span>          Learn about Tim',
    '<span class="command">skills</span>         Technical expertise',
    '<span class="command">experience</span>     Work history',
    '<span class="command">education</span>      Academic background',
    '<span class="command">certs</span>          Certifications',
    '<span class="command">projects</span>       View my work',
    '<span class="command">social</span>         Find me online',
    '<span class="command">contact</span>        Get in touch',
    '<span class="command">resume</span>         Download my resume',
    '<span class="command">blog</span>           Read my articles',
    '<span class="command">matrix</span>         Enter the Matrix',
    '<span class="command">stopmatrix</span>     Exit the Matrix',
    '<span class="command">secret</span>         Find the hidden command',
    '<span class="command">history</span>        Command history',
    '<span class="command">clear</span>          Clear terminal',
    '<span class="command">banner</span>         Show welcome banner',
    '<span class="command">echo</span>           Echo your text',
    '<span class="command">date</span>           Show current date/time',
    '<span class="command">weather</span>        Check the weather (joke)',
    '<span class="command">coffee</span>         Make coffee (joke)',
    '<span class="command">hack</span>           Hacking simulation',
    '<span class="command">joke</span>           Tell a security joke',
    '<br>',
  ];

  const ABOUT = [
    '<br>',
    '<span class="cyan">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>',
    '<span class="cyan">▓</span>  <span class="white">TIMOTHY MAZUR - CYBERSECURITY DIRECTOR</span>  <span class="cyan">▓</span>',
    '<span class="cyan">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>',
    '<br>',
    'Hey! I\'m Tim, a cybersecurity professional with a passion for',
    'protecting people and organizations from digital threats.',
    '',
    '<span class="cyan">Current Role:</span> Director of Cybersecurity @ KPInterface',
    '<span class="cyan">Experience:</span> 3+ years securing 100+ clients, 3,500+ endpoints',
    '<span class="cyan">Expertise:</span> EDR/XDR, Malware Analysis, Incident Response, MSP Security',
    '',
    'I specialize in threat hunting, malware analysis with CrowdStrike and',
    'Huntress, and building security programs that actually work in the real world.',
    '',
    'When I\'m not hunting threats, you\'ll find me:',
    '  🚁 Flying FPV drones',
    '  📸 Taking photos',
    '  🏋️  At the gym',
    '  🎮 Playing CTF challenges',
    '',
    '<span class="cyan">Fun Fact:</span> I\'ve evaluated 70+ security tools and lived to tell the tale.',
    '<br>',
  ];

  const SKILLS = [
    '<br>',
    '<span class="cyan">═══════════════════════════════════════════════</span>',
    '<span class="cyan">           TECHNICAL SKILLSET</span>',
    '<span class="cyan">═══════════════════════════════════════════════</span>',
    '<br>',
    '<span class="white">Security Operations:</span>',
    '  ▸ Endpoint Detection & Response (EDR/XDR)',
    '  ▸ Malware Analysis & Reverse Engineering',
    '  ▸ Incident Response & Threat Hunting',
    '  ▸ Security Information & Event Management (SIEM)',
    '  ▸ Vulnerability Management',
    '',
    '<span class="white">Tools & Platforms:</span>',
    '  ▸ CrowdStrike Falcon',
    '  ▸ Huntress',
    '  ▸ Microsoft Security Suite (Defender, Sentinel)',
    '  ▸ Twingate (ZTNA)',
    '  ▸ Veeam Backup',
    '  ▸ Proofpoint Email Security',
    '',
    '<span class="white">MSP Operations:</span>',
    '  ▸ Multi-Tenant Security Management',
    '  ▸ Vendor Selection & Procurement',
    '  ▸ Security Product Demos & Evaluation',
    '  ▸ ConnectWise Manage',
    '',
    '<span class="white">Development:</span>',
    '  ▸ Python (Security Automation)',
    '  ▸ JavaScript/React',
    '  ▸ PowerShell Scripting',
    '  ▸ Bash/Linux Administration',
    '<br>',
  ];

  const EXPERIENCE = [
    '<br>',
    '<span class="cyan">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
    '<span class="white">Director of Cybersecurity</span> @ KPInterface',
    '<span class="gray">January 2024 – Present</span>',
    '<span class="cyan">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
    '',
    '• Led security operations for 100+ clients, 3,500+ endpoints',
    '• Conducted malware analysis using CrowdStrike Falcon & Huntress',
    '• Deployed EDR, Microsoft Security Suite, and ZTNA solutions',
    '• Evaluated 70+ security tools, influenced procurement decisions',
    '• Built incident response playbooks, reduced MTTC from 4hrs to 15min',
    '',
    '<span class="cyan">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
    '<span class="white">Cyber Security Analyst</span> @ KPInterface',
    '<span class="gray">January 2023 – January 2024</span>',
    '<span class="cyan">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
    '',
    '• Responded to malware alerts, conducted threat triage',
    '• Remediated security incidents across 3,000+ endpoints',
    '• Patched OS and application vulnerabilities',
    '• Collaborated with service desk and project teams',
    '',
    '<span class="cyan">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
    '<span class="white">Tech Office Intern</span> @ Wissahickon School District',
    '<span class="gray">September 2020 – June 2021</span>',
    '<span class="cyan">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
    '',
    '• Provided frontline IT support',
    '• Maintained technology inventory systems',
    '• Assisted with staff onboarding',
    '<br>',
  ];

  const EDUCATION = [
    '<br>',
    '<span class="cyan">🎓 EDUCATION</span>',
    '',
    '<span class="white">Bachelor of Science - Cybersecurity & Information Assurance</span>',
    'Western Governors University',
    '<span class="gray">Graduated: 2023</span>',
    '',
    'Focused on:',
    '  • Network Security & Defense',
    '  • Penetration Testing & Ethical Hacking',
    '  • Security Policy & Governance',
    '  • Incident Response & Forensics',
    '<br>',
  ];

  const CERTS = [
    '<br>',
    '<span class="cyan">📜 CERTIFICATIONS</span>',
    '',
    '<span class="white">CompTIA Certifications:</span>',
    '  ✓ Network Security Professional (CNSP)',
    '  ✓ Network Vulnerability Assessment Professional (CNVP)',
    '  ✓ Security+ (SY0-601)',
    '  ✓ Network+ (N10-008)',
    '  ✓ A+',
    '',
    '<span class="white">Vendor Certifications:</span>',
    '  ✓ ConnectWise Manage Engineer',
    '<br>',
  ];

  const PROJECTS = [
    '<br>',
    '<span class="cyan">💻 PROJECTS</span>',
    '',
    '<span class="white">1. Interactive Terminal</span>',
    '   The very thing you\'re using right now! React-based terminal emulator',
    '   with Matrix effects, command history, and Easter eggs.',
    '   → Type <span class="command">matrix</span> to see the Matrix effect',
    '',
    '<span class="white">2. Security Vulnerability Demonstrator</span>',
    '   Educational tool showing XSS and SQL injection attacks with',
    '   side-by-side vulnerable vs. secure code examples.',
    '   → Visit /security-demo to try it',
    '',
    '<span class="white">3. User-Friendly Port Scanner</span>',
    '   Python/Tkinter port scanner with multi-threading, hostname',
    '   resolution, and real-time progress updates.',
    '   → <a href="https://github.com/timothymaz/Port-Scanner" target="_blank">github.com/timothymaz/Port-Scanner</a>',
    '',
    '<span class="white">4. Windows Startup Manager</span>',
    '   Registry-based startup manager for Windows with search/filter',
    '   capabilities and user-friendly GUI.',
    '   → <a href="https://github.com/timothymaz/Startup-Manager" target="_blank">github.com/timothymaz/Startup-Manager</a>',
    '<br>',
  ];

  const SOCIAL = [
    '<br>',
    '<span class="cyan">🌐 FIND ME ONLINE</span>',
    '',
    'LinkedIn    → <a href="https://www.linkedin.com/in/timothy-mazur-b3bb4217a/" target="_blank">linkedin.com/in/timothy-mazur</a>',
    'GitHub      → <a href="https://github.com/timothymaz" target="_blank">github.com/timothymaz</a>',
    'Instagram   → <a href="https://www.instagram.com/tim.mazur" target="_blank">instagram.com/tim.mazur</a>',
    'Portfolio   → <a href="/" target="_blank">timothymazur.com</a>',
    '<br>',
  ];

  const SECRET = [
    '<br>',
    '<span class="command">sudo</span>           Only use if you\'re admin (hint: you\'re not 😏)',
    '<br>',
  ];

  const JOKES = [
    'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    'A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?" 🍺',
    'There are 10 types of people: those who understand binary and those who don\'t. 😄',
    'Why did the cybersecurity expert break up with their partner? Too many trust issues. 💔',
    'How many programmers does it take to change a light bulb? None, that\'s a hardware problem. 💡',
    'I would tell you a UDP joke, but you might not get it. 📡',
    'A byte walks into a bar looking miserable. Bartender asks "What\'s wrong?" Byte replies "Parity error." 🍻',
    'Why do hackers prefer coffee over tea? Because they don\'t want to be caught phishing! ☕',
  ];

  // Display functions
  const addOutput = (lines, className = 'color2', delay = 0) => {
    if (!Array.isArray(lines)) lines = [lines];

    lines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, { text: line, className, timestamp: Date.now() }]);
      }, index * delay);
    });
  };

  const displayBanner = () => {
    addOutput(BANNER, '', 50);
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Display command
    addOutput(`<span class="prompt">visitor@timothymazur.com:~$</span> ${trimmedCmd}`, 'no-animation');

    // Parse command and args
    const parts = trimmedCmd.toLowerCase().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    // Execute command
    switch (command) {
      case 'help':
        addOutput(HELP, 'color2', 50);
        break;

      case 'about':
      case 'whois':
      case 'whoami':
        addOutput(ABOUT, 'color2', 50);
        break;

      case 'skills':
        addOutput(SKILLS, 'color2', 50);
        break;

      case 'experience':
      case 'work':
        addOutput(EXPERIENCE, 'color2', 50);
        break;

      case 'education':
      case 'edu':
        addOutput(EDUCATION, 'color2', 50);
        break;

      case 'certs':
      case 'certifications':
        addOutput(CERTS, 'color2', 50);
        break;

      case 'projects':
        addOutput(PROJECTS, 'color2', 50);
        break;

      case 'social':
        addOutput(SOCIAL, 'color2', 50);
        break;

      case 'contact':
        addOutput([
          '<br>',
          '<span class="cyan">📧 CONTACT INFORMATION</span>',
          '',
          'Email       → <a href="mailto:Tim@timothymazur.com">Tim@timothymazur.com</a>',
          'LinkedIn    → <a href="https://www.linkedin.com/in/timothy-mazur-b3bb4217a/" target="_blank">Send me a message</a>',
          '',
          '<span class="gray">Opening email client...</span>',
          '<br>',
        ], 'color2', 50);
        setTimeout(() => {
          window.open('mailto:Tim@timothymazur.com');
        }, 1000);
        break;

      case 'resume':
      case 'cv':
        addOutput([
          '<br>',
          '<span class="cyan">📄 RESUME</span>',
          '',
          'My resume is available on LinkedIn:',
          '<a href="https://www.linkedin.com/in/timothy-mazur-b3bb4217a/" target="_blank">linkedin.com/in/timothy-mazur</a>',
          '',
          '<span class="gray">Opening LinkedIn profile...</span>',
          '<br>',
        ], 'color2', 50);
        setTimeout(() => {
          window.open('https://www.linkedin.com/in/timothy-mazur-b3bb4217a/', '_blank');
        }, 1000);
        break;

      case 'blog':
        addOutput([
          '<br>',
          '<span class="cyan">📝 BLOG</span>',
          '',
          'Read my cybersecurity articles and MSP insights:',
          '',
          '• Building an Effective Malware Analysis Workflow',
          '• The MSP Guide to Evaluating Security Tools',
          '• Deploying Zero Trust Network Access',
          '• 5 Endpoint Security Mistakes MSPs Make',
          '• Building an MSP Incident Response Playbook',
          '',
          '<span class="gray">Redirecting to blog...</span>',
          '<br>',
        ], 'color2', 50);
        setTimeout(() => {
          window.location.href = '/blog';
        }, 1500);
        break;

      case 'matrix':
        setIsMatrixVisible(true);
        addOutput([
          '<br>',
          '<span class="cyan">Entering the Matrix...</span>',
          'Follow the white rabbit. 🐇',
          '',
          '<span class="gray">Type <span class="command">stopmatrix</span> to exit.</span>',
          '<br>',
        ], 'color2', 50);
        break;

      case 'stopmatrix':
        setIsMatrixVisible(false);
        addOutput([
          '<br>',
          '<span class="cyan">Exiting the Matrix...</span>',
          'You wake up in your bed and believe whatever you want to believe.',
          '<br>',
        ], 'color2', 50);
        break;

      case 'secret':
        setIsPasswordMode(true);
        addOutput([
          '<br>',
          '<span class="cyan">🔐 PASSWORD PROTECTED</span>',
          '',
          'Enter the secret password to unlock hidden commands:',
          '<span class="gray">(Hint: Check the console... you little hacker 😏)</span>',
          '<br>',
        ], 'color2', 50);
        break;

      case 'sudo':
        addOutput([
          '<br>',
          '<span class="error">⚠️  ACCESS DENIED</span>',
          '',
          'Oh no, you\'re not admin...',
          'Redirecting to mandatory security training...',
          '<br>',
        ], 'error', 50);
        setTimeout(() => {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        }, 2000);
        break;

      case 'history':
        addOutput(['<br>', ...commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`), '<br>'], 'color2', 30);
        break;

      case 'clear':
      case 'cls':
        setOutput([]);
        break;

      case 'banner':
        displayBanner();
        break;

      case 'echo':
        addOutput(['<br>', args.join(' ') || '', '<br>'], 'color2');
        break;

      case 'date':
        addOutput(['<br>', new Date().toString(), '<br>'], 'color2');
        break;

      case 'weather':
        const weathers = [
          'Cloudy with a chance of malware ☁️',
          'Sunny with scattered phishing attempts ☀️',
          '80% chance of ransomware attacks 🌧️',
          'Foggy vision due to too much screen time 🌫️',
          'Perfect weather for indoor hacking 💻',
        ];
        addOutput(['<br>', weathers[Math.floor(Math.random() * weathers.length)], '<br>'], 'color2');
        break;

      case 'coffee':
        addOutput([
          '<br>',
          'Brewing coffee...',
          '███████░░░░░░░░ 40%',
          '████████████░░░ 80%',
          '███████████████ 100%',
          '',
          '☕ Coffee ready! (Just kidding, this is a terminal. Go make real coffee!)',
          '<br>',
        ], 'color2', 300);
        break;

      case 'hack':
        addOutput([
          '<br>',
          '<span class="cyan">Initiating hacking sequence...</span>',
          '',
          'Connecting to mainframe...',
          'Bypassing firewall...',
          'Exploiting vulnerability...',
          'Downloading files...',
          '',
          '<span class="error">ERROR: Nice try! This is just for show 😄</span>',
          '<br>',
        ], 'color2', 400);
        break;

      case 'joke':
        const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        addOutput(['<br>', randomJoke, '<br>'], 'color2');
        break;

      case 'ls':
      case 'dir':
        addOutput([
          '<br>',
          'about.txt     skills.txt    experience.txt',
          'projects.txt  social.txt    contact.txt',
          'secret.txt    matrix.exe    coffee.sh',
          '<br>',
        ], 'color2');
        break;

      case 'pwd':
        addOutput(['<br>', '/home/visitor/timothymazur.com', '<br>'], 'color2');
        break;

      case 'exit':
      case 'quit':
        addOutput([
          '<br>',
          '<span class="cyan">Thanks for visiting! 👋</span>',
          '',
          '<span class="gray">Redirecting to homepage...</span>',
          '<br>',
        ], 'color2', 50);
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        break;

      default:
        addOutput([
          '<br>',
          `<span class="error">Command not found: ${command}</span>`,
          `Type <span class="command">help</span> for a list of available commands.`,
          '<br>',
        ], 'error');
    }

    setCurrentCommand('');
  };

  const checkPassword = (input) => {
    if (input === PASSWORD) {
      setIsPasswordMode(false);
      addOutput([
        '<br>',
        '<span class="cyan">✓ ACCESS GRANTED</span>',
        '',
        ...SECRET,
      ], 'color2', 50);
    } else {
      setIsPasswordMode(false);
      addOutput([
        '<br>',
        '<span class="error">✗ Wrong password</span>',
        '',
        '<span class="gray">Hint: The password is a Matrix reference... 🤔</span>',
        '<br>',
      ], 'error', 50);
    }
    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isPasswordMode) {
        checkPassword(currentCommand);
      } else {
        executeCommand(currentCommand);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
    }
  };

  // Initial banner and console Easter egg
  useEffect(() => {
    displayBanner();
    console.log(
      '%cYou found the password! 😏',
      'color: #00d4aa; font-weight: bold; font-size: 24px;'
    );
    console.log(
      `%cPassword: '${PASSWORD}' - Type 'secret' then enter this password to unlock hidden commands!`,
      'color: #888; font-size: 14px;'
    );
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  // Focus input on click anywhere
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-page">
      <MatrixRain isVisible={isMatrixVisible} />

      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">visitor@timothymazur.com: ~</div>
        </div>

        <div className="terminal-body" ref={terminalRef}>
          <div className="terminal-output">
            {output.map((line, index) => (
              <div
                key={index}
                className={`terminal-line ${line.className}`}
                dangerouslySetInnerHTML={{ __html: line.text }}
              />
            ))}
            <div ref={outputEndRef} />
          </div>

          <div className="terminal-input-line">
            <span className="terminal-prompt">
              {isPasswordMode ? 'Password:' : 'visitor@timothymazur.com:~$'}
            </span>
            <span className="terminal-input-display">
              {isPasswordMode ? '•'.repeat(currentCommand.length) : currentCommand}
            </span>
            <span className={`terminal-cursor ${cursorVisible ? 'visible' : ''}`}>█</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            className="terminal-hidden-input"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
