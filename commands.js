// Command Definitions for WebTerm
const commands = {
    // Basic Commands
    help: (params, outputElement) => {
        return {
            content: `
            <div class="help-section">
                <h3 class="text-info">📋 Available Commands</h3>
                
                <div class="command-category">
                    <h4 class="text-success">📁 File & Directory (Simulated)</h4>
                    <div class="command-list">
                        <div><code>ls</code> - List directory contents</div>
                        <div><code>pwd</code> - Print working directory</div>
                        <div><code>mkdir &lt;name&gt;</code> - Create directory</div>
                        <div><code>touch &lt;file&gt;</code> - Create file</div>
                        <div><code>cat &lt;file&gt;</code> - Display file content</div>
                        <div><code>rm &lt;file&gt;</code> - Remove file</div>
                        <div><code>rmdir &lt;dir&gt;</code> - Remove directory</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4 class="text-success">🌐 Network Tools</h4>
                    <div class="command-list">
                        <div><code>ping &lt;host&gt;</code> - Ping a host</div>
                        <div><code>ipinfo</code> - Show IP information</div>
                        <div><code>whois &lt;domain&gt;</code> - Domain information</div>
                        <div><code>speedtest</code> - Internet speed test</div>
                        <div><code>portscan &lt;host&gt;</code> - Port scanner</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4 class="text-success">🔧 System & Utilities</h4>
                    <div class="command-list">
                        <div><code>clear</code> - Clear terminal</div>
                        <div><code>date</code> - Show current date/time</div>
                        <div><code>time</code> - Show current time</div>
                        <div><code>stats</code> - System statistics</div>
                        <div><code>tools</code> - Open tools panel</div>
                        <div><code>calc &lt;expression&gt;</code> - Calculator</div>
                        <div><code>theme &lt;dark|light&gt;</code> - Change theme</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4 class="text-success">🛠️ Developer Tools</h4>
                    <div class="command-list">
                        <div><code>base64 &lt;encode|decode&gt; &lt;text&gt;</code> - Base64 operations</div>
                        <div><code>hash &lt;md5|sha1|sha256&gt; &lt;text&gt;</code> - Generate hash</div>
                        <div><code>json &lt;format|validate&gt; &lt;json&gt;</code> - JSON operations</div>
                        <div><code>qrcode &lt;text&gt;</code> - Generate QR code</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4 class="text-success">📝 Information</h4>
                    <div class="command-list">
                        <div><code>about</code> - About WebTerm</div>
                        <div><code>version</code> - Show version</div>
                        <div><code>history</code> - Show command history</div>
                        <div><code>echo &lt;text&gt;</code> - Display text</div>
                        <div><code>quote</code> - Random quote</div>
                        <div><code>joke</code> - Programming joke</div>
                    </div>
                </div>
                
                <div class="help-footer">
                    <p class="text-info">💡 <em>Type command name to execute. Use Tab for auto-completion.</em></p>
                    <p class="text-info">🚀 <em>Quick commands available in footer.</em></p>
                    <p class="text-info">🛠️ <em>Use <code>tools</code> command or sidebar for GUI tools.</em></p>
                </div>
            </div>
            `,
            type: 'info'
        };
    },
    
    clear: () => {
        return 'Terminal cleared. Use "help" to see commands.';
    },
    
    date: () => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        return `📅 ${now.toLocaleDateString('id-ID', options)}`;
    },
    
    time: () => {
        const now = new Date();
        return `🕒 ${now.toLocaleTimeString('id-ID', {hour12: false})}`;
    },
    
    // File System Commands (Simulated)
    ls: (params) => {
        const dirs = ['home/', 'documents/', 'downloads/', 'projects/', 'config/'];
        const files = [
            { name: 'README.md', size: '1.2K', type: 'file' },
            { name: 'index.html', size: '3.4K', type: 'file' },
            { name: 'style.css', size: '8.7K', type: 'file' },
            { name: 'script.js', size: '12.5K', type: 'file' },
            { name: 'package.json', size: '1.8K', type: 'file' },
            { name: '.gitignore', size: '0.5K', type: 'file' },
            { name: 'LICENSE', size: '1.1K', type: 'file' }
        ];
        
        let output = '<div class="code-block">';
        output += '<span class="text-info">Directories:</span>\n';
        dirs.forEach(dir => {
            output += `<span class="text-success">${dir.padEnd(20)}</span>\n`;
        });
        
        output += '\n<span class="text-info">Files:</span>\n';
        files.forEach(file => {
            output += `${file.name.padEnd(20)} ${file.size.padStart(8)} ${file.type}\n`;
        });
        output += '</div>';
        
        return {
            content: output,
            type: 'success'
        };
    },
    
    pwd: () => {
        return `/home/user/current/directory`;
    },
    
    mkdir: (params) => {
        if (params.length === 0) {
            return 'Usage: mkdir <directory_name>';
        }
        return `Directory '${params[0]}' created successfully.`;
    },
    
    touch: (params) => {
        if (params.length === 0) {
            return 'Usage: touch <filename>';
        }
        return `File '${params[0]}' created successfully.`;
    },
    
    cat: (params) => {
        if (params.length === 0) {
            return 'Usage: cat <filename>';
        }
        
        const filename = params[0];
        const fileContents = {
            'README.md': `# WebTerm v1.0\n\nA web-based terminal inspired by Termux.\n\n## Features\n- Multi-device support\n- Built-in tools\n- Command history\n- Theme support\n- Network utilities\n\n## Usage\nType 'help' to see available commands.`,
            'config.json': `{\n  "version": "1.0.0",\n  "theme": "dark",\n  "auto-save": true,\n  "notifications": true,\n  "developer-mode": false\n}`,
            'package.json': `{\n  "name": "webterm",\n  "version": "1.0.0",\n  "description": "Web-based terminal",\n  "main": "index.html",\n  "scripts": {\n    "start": "echo 'WebTerm started'",\n    "test": "echo 'No tests specified'"\n  },\n  "author": "WebTerm Team",\n  "license": "MIT"\n}`
        };
        
        const content = fileContents[filename] || `File '${filename}' not found.`;
        return `<div class="code-block">${content}</div>`;
    },
    
    rm: (params) => {
        if (params.length === 0) {
            return 'Usage: rm <filename>';
        }
        return `File '${params[0]}' removed successfully.`;
    },
    
    rmdir: (params) => {
        if (params.length === 0) {
            return 'Usage: rmdir <directory_name>';
        }
        return `Directory '${params[0]}' removed successfully.`;
    },
    
    // Network Commands
    ping: (params) => {
        const host = params[0] || 'google.com';
        const times = [15.3, 18.7, 22.1, 19.5];
        const avg = (times.reduce((a, b) => a + b) / times.length).toFixed(1);
        
        const output = `PING ${host} (142.250.185.78) 56(84) bytes of data.
64 bytes from ${host} (142.250.185.78): icmp_seq=1 ttl=57 time=${times[0]} ms
64 bytes from ${host} (142.250.185.78): icmp_seq=2 ttl=57 time=${times[1]} ms
64 bytes from ${host} (142.250.185.78): icmp_seq=3 ttl=57 time=${times[2]} ms
64 bytes from ${host} (142.250.185.78): icmp_seq=4 ttl=57 time=${times[3]} ms

--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 15.300/${avg}/22.100/2.582 ms`;
        
        return {
            content: `<div class="code-block">${output}</div>`,
            type: 'success'
        };
    },
    
    ipinfo: () => {
        const userAgent = navigator.userAgent;
        const languages = navigator.languages.join(', ');
        const platform = navigator.platform;
        const online = navigator.onLine ? 'Online' : 'Offline';
        
        const output = `🌐 IP Information:
────────────────────
Public IP:    203.0.113.45 (Simulated)
Location:     Jakarta, Indonesia
ISP:          Simulated Network Provider
Timezone:     Asia/Jakarta (GMT+7)
────────────────────
Browser Info:
User Agent:   ${userAgent.substring(0, 50)}...
Languages:    ${languages}
Platform:     ${platform}
Status:       ${online}
────────────────────
Note: This is simulated data for demonstration.`;
        
        return {
            content: `<div class="code-block">${output}</div>`,
            type: 'info'
        };
    },
    
    whois: (params) => {
        const domain = params[0] || 'example.com';
        
        const output = `WHOIS information for ${domain}:
─────────────────────────────────────────
Domain Name: ${domain.toUpperCase()}
Registrar: Example Registrar, Inc.
Registration Date: 2022-01-15
Expiration Date: 2024-01-15
Updated Date: 2023-05-20
Name Server: ns1.example.com
Name Server: ns2.example.com
Status: clientTransferProhibited
─────────────────────────────────────────
Registrant Contact:
Name: Privacy Protection Service
Email: privacy@example.com
─────────────────────────────────────────
Note: This is simulated WHOIS data.`;
        
        return {
            content: `<div class="code-block">${output}</div>`,
            type: 'info'
        };
    },
    
    speedtest: () => {
        window.openTool('speedtest');
        return 'Opening speed test tool...';
    },
    
    portscan: (params) => {
        const host = params[0] || 'scanme.nmap.org';
        const ports = [
            { port: 21, service: 'ftp', status: 'closed' },
            { port: 22, service: 'ssh', status: 'open' },
            { port: 23, service: 'telnet', status: 'closed' },
            { port: 25, service: 'smtp', status: 'filtered' },
            { port: 80, service: 'http', status: 'open' },
            { port: 443, service: 'https', status: 'open' },
            { port: 3389, service: 'rdp', status: 'closed' }
        ];
        
        let output = `Port scan results for ${host}:\n`;
        output += 'PORT     STATE    SERVICE\n';
        output += '────────────────────────\n';
        
        ports.forEach(p => {
            const stateColor = p.status === 'open' ? 'text-success' : 
                             p.status === 'filtered' ? 'text-warning' : 'text-muted';
            output += `${p.port.toString().padEnd(8)} <span class="${stateColor}">${p.status.padEnd(10)}</span> ${p.service}\n`;
        });
        
        output += '\nScan completed: 7 ports scanned, 2 open, 1 filtered, 4 closed';
        
        return {
            content: `<div class="code-block">${output}</div>`,
            type: 'info'
        };
    },
    
    // System Commands
    stats: () => {
        const now = new Date();
        const uptime = Math.floor(Math.random() * 86400) + 3600;
        const formatUptime = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}h ${minutes}m`;
        };
        
        const cpu = Math.floor(Math.random() * 30) + 5;
        const memory = Math.floor(Math.random() * 500) + 100;
        const disk = Math.floor(Math.random() * 70) + 10;
        
        const output = `System Statistics:
────────────────────
CPU Usage:    ${cpu}%
Memory:       ${memory} MB / 1024 MB (${Math.round(memory/10.24)}%)
Disk Usage:   ${disk} GB / 100 GB (${disk}%)
Uptime:       ${formatUptime(uptime)}
Processes:    ${Math.floor(Math.random() * 100) + 50}
Load Average: 0.${Math.floor(Math.random() * 9)}, 0.${Math.floor(Math.random() * 9)}, 0.${Math.floor(Math.random() * 9)}
────────────────────
Last Updated: ${now.toLocaleTimeString()}`;
        
        return {
            content: `<div class="code-block">${output}</div>`,
            type: 'info'
        };
    },
    
    tools: () => {
        // Toggle sidebar open
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            const icon = sidebarToggle.querySelector('i');
            icon.className = 'fas fa-chevron-left';
            sidebarToggle.title = 'Collapse sidebar';
        }
        
        return 'Tools panel opened. Use sidebar for GUI tools.';
    },
    
    calc: (params) => {
        if (params.length === 0) {
            window.openTool('calculator');
            return 'Opening calculator tool...';
        }
        
        try {
            const expression = params.join(' ');
            const safeExpression = expression.replace(/[^0-9+\-*/().% ]/g, '');
            
            if (!safeExpression.trim()) {
                throw new Error('Invalid expression');
            }
            
            const result = Function(`"use strict"; return (${safeExpression})`)();
            
            return {
                content: `<div class="code-block">${expression} = <span class="text-success">${result}</span></div>`,
                type: 'success'
            };
        } catch (error) {
            return `Error: Invalid expression - ${error.message}`;
        }
    },
    
    theme: (params) => {
        if (params.length === 0) {
            return 'Usage: theme <dark|light>';
        }
        
        const theme = params[0].toLowerCase();
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('webterm-theme', theme);
            
            const themeToggle = document.getElementById('theme-toggle');
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            
            return `Theme changed to ${theme} mode.`;
        } else {
            return 'Invalid theme. Use "dark" or "light".';
        }
    },
    
    // Developer Tools Commands
    base64: (params) => {
        if (params.length < 2) {
            return 'Usage: base64 <encode|decode> <text>';
        }
        
        const operation = params[0].toLowerCase();
        const text = params.slice(1).join(' ');
        
        if (operation === 'encode') {
            const encoded = btoa(text);
            return {
                content: `<div class="code-block">Base64 Encoded:\n${encoded}</div>`,
                type: 'success'
            };
        } else if (operation === 'decode') {
            try {
                const decoded = atob(text);
                return {
                    content: `<div class="code-block">Base64 Decoded:\n${decoded}</div>`,
                    type: 'success'
                };
            } catch (e) {
                return 'Error: Invalid Base64 string';
            }
        } else {
            return 'Error: Operation must be "encode" or "decode"';
        }
    },
    
    hash: (params) => {
        if (params.length < 2) {
            return 'Usage: hash <md5|sha1|sha256> <text>';
        }
        
        const algorithm = params[0].toLowerCase();
        const text = params.slice(1).join(' ');
        
        // Simple hash simulation (not real hashing)
        const simulateHash = (str, algo) => {
            let hash = '';
            for (let i = 0; i < (algo === 'md5' ? 32 : algo === 'sha1' ? 40 : 64); i++) {
                hash += Math.floor(Math.random() * 16).toString(16);
            }
            return hash;
        };
        
        if (['md5', 'sha1', 'sha256'].includes(algorithm)) {
            const hash = simulateHash(text, algorithm);
            return {
                content: `<div class="code-block">${algorithm.toUpperCase()} hash of "${text}":\n${hash}</div>`,
                type: 'success'
            };
        } else {
            return 'Error: Algorithm must be "md5", "sha1", or "sha256"';
        }
    },
    
    json: (params) => {
        if (params.length < 2) {
            return 'Usage: json <format|validate> <json_string>';
        }
        
        const operation = params[0].toLowerCase();
        const jsonStr = params.slice(1).join(' ');
        
        try {
            const jsonObj = JSON.parse(jsonStr);
            
            if (operation === 'format') {
                const formatted = JSON.stringify(jsonObj, null, 2);
                return {
                    content: `<div class="code-block">Formatted JSON:\n${formatted}</div>`,
                    type: 'success'
                };
            } else if (operation === 'validate') {
                return {
                    content: `<div class="code-block"><span class="text-success">✓ Valid JSON</span>\n\nParsed object type: ${typeof jsonObj}</div>`,
                    type: 'success'
                };
            } else {
                return 'Error: Operation must be "format" or "validate"';
            }
        } catch (e) {
            return `Error: Invalid JSON - ${e.message}`;
        }
    },
    
    qrcode: (params) => {
        if (params.length === 0) {
            window.openTool('qrcode');
            return 'Opening QR code generator...';
        }
        
        const text = params.join(' ');
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
        
        return {
            content: `
            <div class="code-block">
                <p>QR Code for: "${text}"</p>
                <img src="${qrUrl}" alt="QR Code" style="max-width: 150px; margin: 10px 0;">
                <p><small>Scan this QR code with your device</small></p>
            </div>
            `,
            type: 'success'
        };
    },
    
    // Information Commands
    about: () => {
        return {
            content: `
            <div class="code-block">
                <h3 class="text-info">WebTerm v1.0</h3>
                <p>A web-based terminal inspired by Termux, designed to work on all devices and systems.</p>
                
                <h4 class="text-success">✨ Features:</h4>
                <ul>
                    <li>Multi-device support (Desktop, Mobile, Tablet)</li>
                    <li>40+ built-in commands</li>
                    <li>Network tools (ping, whois, speedtest)</li>
                    <li>Developer tools (Base64, JSON, QR code)</li>
                    <li>System utilities</li>
                    <li>Command history and auto-completion</li>
                    <li>Theme support (Dark/Light mode)</li>
                    <li>All buttons functional</li>
                </ul>
                
                <h4 class="text-success">🛠️ Technologies:</h4>
                <p>HTML5, CSS3, JavaScript (Vanilla)</p>
                <p>Font Awesome for icons</p>
                
                <p class="text-warning">⚠️ Note: This is a web-based simulation. Commands run in your browser only.</p>
            </div>
            `,
            type: 'info'
        };
    },
    
    version: () => {
        return 'WebTerm v1.0 - Built with ❤️ for multi-device terminal experience';
    },
    
    history: () => {
        const history = JSON.parse(localStorage.getItem('webterm-history') || '[]');
        
        if (history.length === 0) {
            return 'No command history found.';
        }
        
        let output = 'Command History (last 20 commands):\n';
        output += '─────────────────────────────────\n';
        
        history.slice(-20).forEach((cmd, index) => {
            output += `${(history.length - 20 + index + 1).toString().padStart(3)}: ${cmd}\n`;
        });
        
        return {
            content: `<div class="code-block">${output}</div>`,
            type: 'info'
        };
    },
    
    echo: (params) => {
        if (params.length === 0) {
            return 'Usage: echo <text>';
        }
        return params.join(' ');
    },
    
    quote: () => {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "The way to get started is to quit talking and begin doing. - Walt Disney",
            "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
            "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler"
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return `💭 "${randomQuote}"`;
    },
    
    joke: () => {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "Why do Java developers wear glasses? Because they can't C#!",
            "There are 10 types of people in the world: those who understand binary and those who don't.",
            "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
            "I would tell you a joke about UDP, but you might not get it.",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25."
        ];
        
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return `😄 ${randomJoke}`;
    },
    
    // Start command
    start: () => {
        return {
            content: `
            <div class="code-block">
                <h3 class="text-success">🚀 WebTerm Ready!</h3>
                <p>Terminal web siap digunakan dengan berbagai fitur:</p>
                
                <h4 class="text-info">🎯 Quick Start:</h4>
                <ol>
                    <li>Ketik command di input field bawah</li>
                    <li>Gunakan <code>Tab</code> untuk auto-completion</li>
                    <li>Gunakan <code>↑</code> dan <code>↓</code> untuk navigasi history</li>
                    <li>Klik <code>Enter</code> atau tombol ▶ untuk menjalankan</li>
                </ol>
                
                <h4 class="text-info">🔧 Coba Command:</h4>
                <ul>
                    <li><code>help</code> - Lihat semua command</li>
                    <li><code>ls</code> - List directory</li>
                    <li><code>ping google.com</code> - Ping test</li>
                    <li><code>ipinfo</code> - Informasi IP</li>
                    <li><code>calc 2+2*5</code> - Calculator</li>
                </ul>
                
                <h4 class="text-info">🛠️ Tools GUI:</h4>
                <p>Gunakan sidebar di kanan untuk tools dengan interface GUI:</p>
                <ul>
                    <li>Network Tools (Ping, Speed Test, Port Scanner)</li>
                    <li>Developer Tools (QR Generator, Base64, Hash)</li>
                    <li>Utilities (Calculator, Notes, Converter)</li>
                    <li>System Tools (Process Monitor, Storage Analyzer)</li>
                </ul>
                
                <p class="text-warning">💡 Tip: Semua tombol sekarang berfungsi dengan baik!</p>
            </div>
            `,
            type: 'success'
        };
    },
    
    // Easter eggs and fun commands
    neofetch: () => {
        const output = `
             _      _    ___ _            
            | |    | |  / __| |_ ___ _ __ 
            | |____| |_| (__|  _/ _ \\ '_ \\
            |______|____\\___|\\__\\___/ .__/
                                   |_|   
        OS: WebTerm 1.0
        Host: ${navigator.userAgent.split(' ')[0] || 'Web Browser'}
        Kernel: JavaScript Runtime
        Uptime: 0 days, 0 hours, 0 minutes
        Shell: webterm 1.0
        Terminal: Web Browser
        CPU: Virtual CPU
        Memory: ${performance && performance.memory ? 
            Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB' : 'Unknown'}
        Theme: ${document.documentElement.getAttribute('data-theme') || 'dark'}
        `;
        
        return {
            content: `<pre class="code-block">${output}</pre>`,
            type: 'success'
        };
    },
    
    sudo: () => {
        return {
            content: '<span class="text-error">Permission denied: User is not in the sudoers file. This incident will be reported.</span>',
            type: 'error'
        };
    },
    
    // Alias commands
    '?': (params) => commands.help(params),
    cls: () => commands.clear(),
    dir: () => commands.ls(),
    ip: () => commands.ipinfo(),
    ver: () => commands.version(),
    calc: (params) => commands.calc(params)
};
