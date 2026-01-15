// Command Definitions for WebTerm

const commands = {
    // Basic Commands
    help: (params, outputElement) => {
        return {
            content: `
            <div class="help-section">
                <h3>📋 <span class="text-info">Available Commands</span></h3>
                
                <div class="command-category">
                    <h4>📁 <span class="text-success">File & Directory</span></h4>
                    <div class="command-list">
                        <div><code>ls</code> - List directory contents</div>
                        <div><code>pwd</code> - Print working directory</div>
                        <div><code>mkdir &lt;name&gt;</code> - Create directory</div>
                        <div><code>touch &lt;file&gt;</code> - Create file</div>
                        <div><code>cat &lt;file&gt;</code> - Display file content</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4>🌐 <span class="text-success">Network</span></h4>
                    <div class="command-list">
                        <div><code>ping &lt;host&gt;</code> - Ping a host</div>
                        <div><code>ipinfo</code> - Show IP information</div>
                        <div><code>weather &lt;city&gt;</code> - Get weather info</div>
                        <div><code>whois &lt;domain&gt;</code> - Domain information</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4>🔧 <span class="text-success">System & Tools</span></h4>
                    <div class="command-list">
                        <div><code>clear</code> - Clear terminal</div>
                        <div><code>date</code> - Show current date/time</div>
                        <div><code>stats</code> - System statistics</div>
                        <div><code>tools</code> - Open tools panel</div>
                        <div><code>calc &lt;expression&gt;</code> - Calculator</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4>🎮 <span class="text-success">Games & Fun</span></h4>
                    <div class="command-list">
                        <div><code>snake</code> - Play Snake game</div>
                        <div><code>2048</code> - Play 2048 game</div>
                        <div><code>quote</code> - Random quote</div>
                        <div><code>joke</code> - Tell a joke</div>
                    </div>
                </div>
                
                <div class="command-category">
                    <h4>⚙️ <span class="text-success">Settings</span></h4>
                    <div class="command-list">
                        <div><code>theme &lt;dark|light&gt;</code> - Change theme</div>
                        <div><code>history</code> - Show command history</div>
                        <div><code>about</code> - About WebTerm</div>
                    </div>
                </div>
                
                <div class="help-footer">
                    <p>💡 <em>Type command name to execute. Use Tab for auto-completion.</em></p>
                    <p>🚀 <em>Quick commands available in footer.</em></p>
                </div>
            </div>
            `,
            type: 'info'
        };
    },
    
    clear: (params, outputElement) => {
        const history = document.querySelector('.command-history');
        history.innerHTML = '';
        return 'Terminal cleared.';
    },
    
    date: (params) => {
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
    
    // File System Commands (Simulated)
    ls: (params) => {
        const files = [
            { name: 'home/', type: 'directory', size: '4.0K' },
            { name: 'documents/', type: 'directory', size: '8.0K' },
            { name: 'downloads/', type: 'directory', size: '12K' },
            { name: 'README.md', type: 'file', size: '1.2K' },
            { name: 'config.json', type: 'file', size: '2.4K' },
            { name: 'script.js', type: 'file', size: '8.7K' },
            { name: 'package.json', type: 'file', size: '1.8K' }
        ];
        
        let output = 'total 28K\n';
        files.forEach(file => {
            const type = file.type === 'directory' ? 'd' : '-';
            const color = file.type === 'directory' ? 'text-info' : 'text-success';
            output += `${type}rwxr-xr-x 1 user user ${file.size.padStart(6)} ${new Date().toLocaleDateString()} <span class="${color}">${file.name}</span>\n`;
        });
        
        return {
            content: output,
            type: 'success'
        };
    },
    
    pwd: () => {
        return `/home/user/${currentPath}`;
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
        
        const fileContents = {
            'README.md': `# WebTerm\n\nA web-based terminal inspired by Termux.\n\n## Features\n- Multi-device support\n- Built-in tools\n- Command history\n- Theme support\n\n## Usage\nType 'help' to see available commands.`,
            'config.json': `{\n  "version": "1.0.0",\n  "theme": "dark",\n  "auto-save": true,\n  "notifications": true\n}`,
            'script.js': `// WebTerm Main Script\n// This is a simulated file for demonstration.\n\nconsole.log('WebTerm loaded successfully!');\n\nfunction executeCommand(cmd) {\n  // Command execution logic here\n  return 'Command executed: ' + cmd;\n}`
        };
        
        const filename = params[0];
        return fileContents[filename] || `File '${filename}' not found.`;
    },
    
    // Network Commands
    ping: (params) => {
        if (params.length === 0) {
            return 'Usage: ping <host>';
        }
        
        const host = params[0];
        const times = [15, 18, 22, 19];
        const avg = times.reduce((a, b) => a + b) / times.length;
        
        return {
            content: `
            PING ${host} (93.184.216.34) 56(84) bytes of data.
            64 bytes from ${host} (93.184.216.34): icmp_seq=1 ttl=57 time=${times[0]} ms
            64 bytes from ${host} (93.184.216.34): icmp_seq=2 ttl=57 time=${times[1]} ms
            64 bytes from ${host} (93.184.216.34): icmp_seq=3 ttl=57 time=${times[2]} ms
            64 bytes from ${host} (93.184.216.34): icmp_seq=4 ttl=57 time=${times[3]} ms
            
            --- ${host} ping statistics ---
            4 packets transmitted, 4 received, 0% packet loss, time 3004ms
            rtt min/avg/max/mdev = 15.000/${avg.toFixed(3)}/22.000/2.582 ms
            `,
            type: 'success'
        };
    },
    
    ipinfo: () => {
        return {
            content: `
            <div class="ip-info">
                <h4>🌐 IP Information</h4>
                <div><strong>Public IP:</strong> 203.0.113.45 (Simulated)</div>
                <div><strong>Location:</strong> Jakarta, Indonesia</div>
                <div><strong>ISP:</strong> Simulated Network Provider</div>
                <div><strong>Timezone:</strong> Asia/Jakarta (GMT+7)</div>
                <div><strong>User Agent:</strong> ${navigator.userAgent.substring(0, 50)}...</div>
                <br>
                <div class="text-info">Note: This is simulated data for demonstration.</div>
            </div>
            `,
            type: 'info'
        };
    },
    
    weather: (params) => {
        const city = params[0] || 'Jakarta';
        const weatherData = {
            Jakarta: { temp: 32, condition: 'Partly Cloudy', humidity: 78 },
            'New York': { temp: 18, condition: 'Sunny', humidity: 65 },
            Tokyo: { temp: 22, condition: 'Clear', humidity: 72 },
            London: { temp: 15, condition: 'Rainy', humidity: 85 }
        };
        
        const data = weatherData[city] || { temp: 25, condition: 'Clear', humidity: 70 };
        
        return `🌤️ Weather in ${city}: ${data.temp}°C, ${data.condition}, Humidity: ${data.humidity}%`;
    },
    
    whois: (params) => {
        if (params.length === 0) {
            return 'Usage: whois <domain>';
        }
        
        const domain = params[0];
        return {
            content: `
            Domain Name: ${domain}
            Registrar: Example Registrar, Inc.
            Creation Date: 2022-01-15T00:00:00Z
            Updated Date: 2023-05-20T00:00:00Z
            Expiration Date: 2024-01-15T00:00:00Z
            Name Servers: ns1.example.com, ns2.example.com
            Status: clientTransferProhibited
            <br>
            <span class="text-warning">Note: This is simulated whois data for demonstration.</span>
            `,
            type: 'info'
        };
    },
    
    // System Commands
    stats: () => {
        const now = new Date();
        const uptime = Math.floor(Math.random() * 86400) + 3600; // 1-24 hours in seconds
        
        const formatUptime = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}h ${minutes}m`;
        };
        
        return {
            content: `
            <div class="system-stats-display">
                <h4>📊 System Statistics</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <strong>CPU Usage:</strong> <span class="text-info">${Math.floor(Math.random() * 30) + 5}%</span>
                    </div>
                    <div class="stat-item">
                        <strong>Memory:</strong> <span class="text-info">${Math.floor(Math.random() * 500) + 100}MB</span>
                    </div>
                    <div class="stat-item">
                        <strong>Uptime:</strong> <span class="text-success">${formatUptime(uptime)}</span>
                    </div>
                    <div class="stat-item">
                        <strong>Processes:</strong> <span class="text-warning">${Math.floor(Math.random() * 100) + 50}</span>
                    </div>
                </div>
                <div class="stats-time">Last updated: ${now.toLocaleTimeString()}</div>
            </div>
            `,
            type: 'info'
        };
    },
    
    tools: () => {
        window.openTool('ping');
        return 'Opening tools panel...';
    },
    
    calc: (params) => {
        if (params.length === 0) {
            return 'Usage: calc <expression>';
        }
        
        try {
            // Safety: Only allow basic math operations
            const expression = params.join(' ');
            const safeExpression = expression.replace(/[^0-9+\-*/().% ]/g, '');
            
            // Use Function constructor for safe evaluation
            const result = Function(`"use strict"; return (${safeExpression})`)();
            
            return `${expression} = <span class="text-success">${result}</span>`;
        } catch (error) {
            return `Error: Invalid expression - ${error.message}`;
        }
    },
    
    // Games & Fun
    snake: () => {
        window.openTool('snake');
        return 'Opening Snake game...';
    },
    
    2048: () => {
        window.openTool('2048');
        return 'Opening 2048 game...';
    },
    
    quote: () => {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Innovation distinguishes between a leader and a follower. - Steve Jobs",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "The way to get started is to quit talking and begin doing. - Walt Disney",
            "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
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
            "I would tell you a joke about UDP, but you might not get it."
        ];
        
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return `😄 ${randomJoke}`;
    },
    
    // Settings
    theme: (params) => {
        if (params.length === 0) {
            return 'Usage: theme <dark|light>';
        }
        
        const theme = params[0].toLowerCase();
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('webterm-theme', theme);
            
            // Update theme icon
            const themeToggle = document.getElementById('theme-toggle');
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            
            return `Theme changed to ${theme} mode.`;
        } else {
            return 'Invalid theme. Use "dark" or "light".';
        }
    },
    
    history: () => {
        const history = JSON.parse(localStorage.getItem('webterm-history') || '[]');
        
        if (history.length === 0) {
            return 'No command history found.';
        }
        
        let output = 'Command History:\n';
        history.slice(-20).forEach((cmd, index) => {
            output += `${history.length - 20 + index + 1}: ${cmd}\n`;
        });
        
        return output;
    },
    
    about: () => {
        return {
            content: `
            <div class="about-info">
                <h3>🤖 WebTerm v1.0</h3>
                <p>A web-based terminal inspired by Termux, designed to work on all devices and systems.</p>
                
                <div class="about-features">
                    <h4>✨ Features:</h4>
                    <ul>
                        <li>Multi-device support (Desktop, Mobile, Tablet)</li>
                        <li>Built-in tools and utilities</li>
                        <li>Command history and auto-completion</li>
                        <li>Theme support (Dark/Light mode)</li>
                        <li>Simulated file system</li>
                        <li>Network tools (ping, whois, etc.)</li>
                        <li>Games and entertainment</li>
                    </ul>
                </div>
                
                <div class="about-tech">
                    <h4>🛠️ Technologies:</h4>
                    <p>HTML5, CSS3, JavaScript (Vanilla)</p>
                    <p>Font Awesome for icons</p>
                </div>
                
                <div class="about-note">
                    <p class="text-warning">⚠️ Note: This is a web-based simulation. Commands run in your browser only.</p>
                </div>
            </div>
            `,
            type: 'info'
        };
    },
    
    start: () => {
        return {
            content: `
            <div class="start-message">
                <h3>🚀 WebTerm Ready!</h3>
                <p>Terminal web siap digunakan dengan berbagai fitur:</p>
                
                <div class="start-actions">
                    <div class="action-item">
                        <strong>1. Coba perintah:</strong>
                        <div><code>ls</code> - Lihat daftar file</div>
                        <div><code>date</code> - Lihat tanggal & waktu</div>
                        <div><code>weather Jakarta</code> - Info cuaca</div>
                    </div>
                    
                    <div class="action-item">
                        <strong>2. Gunakan tools:</strong>
                        <div>Klik tombol di sidebar untuk tools</div>
                        <div>QR Generator, Calculator, dll.</div>
                    </div>
                    
                    <div class="action-item">
                        <strong>3. Eksplorasi:</strong>
                        <div>Gunakan <code>help</code> untuk semua perintah</div>
                        <div>Coba games dengan <code>snake</code> atau <code>2048</code></div>
                    </div>
                </div>
                
                <div class="start-tip">
                    <p>💡 <em>Gunakan tombol panah atas/bawah untuk navigasi history command.</em></p>
                </div>
            </div>
            `,
            type: 'success'
        };
    },
    
    // Easter eggs
    neofetch: () => {
        return {
            content: `
            <pre class="ascii-art-small">
             _      _    ___ _            
            | |    | |  / __| |_ ___ _ __ 
            | |____| |_| (__|  _/ _ \\ '_ \\
            |______|____\\___|\\__\\___/ .__/
                                   |_|   
            </pre>
            OS: WebTerm 1.0
            Host: Web Browser
            Kernel: JavaScript Runtime
            Uptime: 0 days, 0 hours, 0 minutes
            Shell: webterm 1.0
            Terminal: ${navigator.userAgent.substring(0, 30)}...
            CPU: Virtual CPU
            Memory: ${performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB' : 'Unknown'}
            `,
            type: 'success'
        };
    },
    
    sudo: () => {
        return {
            content: '<span class="text-error">Permission denied: User is not in the sudoers file. This incident will be reported.</span>',
            type: 'error'
        };
    }
};

// Export commands
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { commands };
          }
