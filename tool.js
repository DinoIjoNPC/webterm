// Tools and Utilities for WebTerm

const tools = {
    ping: {
        name: 'Ping Test Tool',
        content: `
            <div class="tool-container">
                <h4>🌐 Ping Test</h4>
                <p>Test network connectivity to a host.</p>
                
                <div class="tool-form">
                    <div class="form-group">
                        <label for="ping-host">Host:</label>
                        <input type="text" id="ping-host" placeholder="example.com or IP address" value="google.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="ping-count">Count:</label>
                        <select id="ping-count">
                            <option value="4">4 packets</option>
                            <option value="8">8 packets</option>
                            <option value="10">10 packets</option>
                        </select>
                    </div>
                    
                    <button id="ping-start" class="btn-tool">
                        <i class="fas fa-play"></i> Start Ping Test
                    </button>
                </div>
                
                <div class="tool-result">
                    <h5>Results:</h5>
                    <pre id="ping-result">Click "Start Ping Test" to begin...</pre>
                </div>
                
                <div class="tool-info">
                    <p class="text-info">ℹ️ This tool simulates ping commands. No actual network requests are made.</p>
                </div>
            </div>
            
            <script>
                document.getElementById('ping-start').addEventListener('click', function() {
                    const host = document.getElementById('ping-host').value || 'google.com';
                    const count = parseInt(document.getElementById('ping-count').value) || 4;
                    
                    let result = \`PING \${host} (142.250.185.78) 56(84) bytes of data.\\n\\n\`;
                    
                    let times = [];
                    for (let i = 1; i <= count; i++) {
                        const time = (Math.random() * 50 + 10).toFixed(1);
                        times.push(parseFloat(time));
                        result += \`64 bytes from \${host} (142.250.185.78): icmp_seq=\${i} ttl=57 time=\${time} ms\\n\`;
                    }
                    
                    const avg = (times.reduce((a, b) => a + b) / times.length).toFixed(1);
                    const min = Math.min(...times).toFixed(1);
                    const max = Math.max(...times).toFixed(1);
                    
                    result += \`\\n--- \${host} ping statistics ---\\n\`;
                    result += \`\${count} packets transmitted, \${count} received, 0% packet loss, time \${count * 1000}ms\\n\`;
                    result += \`rtt min/avg/max/mdev = \${min}/\${avg}/\${max}/2.582 ms\`;
                    
                    document.getElementById('ping-result').textContent = result;
                    window.showNotification(\`Ping test completed for \${host}\`, 'success');
                });
                
                // Auto-focus input
                setTimeout(() => {
                    document.getElementById('ping-host').focus();
                }, 100);
            </script>
        `
    },
    
    ipinfo: {
        name: 'IP Information',
        content: `
            <div class="tool-container">
                <h4>🌍 IP Information Lookup</h4>
                <p>Get information about an IP address.</p>
                
                <div class="tool-form">
                    <div class="form-group">
                        <label for="ip-address">IP Address:</label>
                        <input type="text" id="ip-address" placeholder="Enter IP address" value="8.8.8.8">
                    </div>
                    
                    <button id="ip-lookup" class="btn-tool">
                        <i class="fas fa-search"></i> Lookup IP
                    </button>
                </div>
                
                <div class="tool-result">
                    <h5>IP Information:</h5>
                    <div id="ip-result">
                        <p>Enter an IP address and click "Lookup IP"</p>
                    </div>
                </div>
                
                <div class="tool-info">
                    <p class="text-info">ℹ️ This is simulated data for demonstration purposes.</p>
                </div>
            </div>
            
            <script>
                document.getElementById('ip-lookup').addEventListener('click', function() {
                    const ip = document.getElementById('ip-address').value || '8.8.8.8';
                    
                    // IP data simulation
                    const ipData = {
                        '8.8.8.8': {
                            isp: 'Google LLC',
                            country: 'United States',
                            city: 'Mountain View',
                            region: 'California',
                            timezone: 'America/Los_Angeles',
                            coordinates: '37.4056, -122.0775',
                            asn: 'AS15169',
                            organization: 'Google'
                        },
                        '1.1.1.1': {
                            isp: 'Cloudflare',
                            country: 'United States',
                            city: 'Los Angeles',
                            region: 'California',
                            timezone: 'America/Los_Angeles',
                            coordinates: '34.0522, -118.2437',
                            asn: 'AS13335',
                            organization: 'Cloudflare'
                        },
                        '203.0.113.45': {
                            isp: 'Simulated Network',
                            country: 'Indonesia',
                            city: 'Jakarta',
                            region: 'DKI Jakarta',
                            timezone: 'Asia/Jakarta',
                            coordinates: '-6.2088, 106.8456',
                            asn: 'AS12345',
                            organization: 'Simulated ISP'
                        }
                    };
                    
                    const data = ipData[ip] || {
                        isp: 'Unknown ISP',
                        country: 'Unknown',
                        city: 'Unknown',
                        region: 'Unknown',
                        timezone: 'UTC',
                        coordinates: '0, 0',
                        asn: 'AS00000',
                        organization: 'Unknown'
                    };
                    
                    const resultHTML = \`
                        <div class="code-block">
                            <strong>IP Address:</strong> \${ip}
                            <strong>ISP:</strong> \${data.isp}
                            <strong>Location:</strong> \${data.city}, \${data.region}, \${data.country}
                            <strong>Timezone:</strong> \${data.timezone}
                            <strong>Coordinates:</strong> \${data.coordinates}
                            <strong>ASN:</strong> \${data.asn}
                            <strong>Organization:</strong> \${data.organization}
                            <strong>Type:</strong> IPv4
                        </div>
                    \`;
                    
                    document.getElementById('ip-result').innerHTML = resultHTML;
                    window.showNotification(\`IP lookup completed for \${ip}\`, 'success');
                });
                
                // Auto-focus input
                setTimeout(() => {
                    document.getElementById('ip-address').focus();
                }, 100);
            </script>
        `
    },
    
    speedtest: {
        name: 'Internet Speed Test',
        content: `
            <div class="tool-container">
                <h4>📊 Internet Speed Test</h4>
                <p>Test your download and upload speed.</p>
                
                <div class="speed-test">
                    <div class="speed-test-result">
                        <div class="speed-item">
                            <h5>Download Speed</h5>
                            <div class="speed-value" id="download-speed">0 Mbps</div>
                            <div class="speed-bar">
                                <div class="speed-fill" id="download-bar" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <div class="speed-item">
                            <h5>Upload Speed</h5>
                            <div class="speed-value" id="upload-speed">0 Mbps</div>
                            <div class="speed-bar">
                                <div class="speed-fill" id="upload-bar" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <div class="speed-item">
                            <h5>Ping</h5>
                            <div class="speed-value" id="ping-speed">-- ms</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <button id="start-speedtest" class="btn-tool" style="padding: 12px 30px; font-size: 1.1rem;">
                            <i class="fas fa-bolt"></i> Start Speed Test
                        </button>
                    </div>
                    
                    <div id="speedtest-progress" style="display: none;">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div id="progress-text" style="text-align: center; margin-top: 10px; color: var(--text-secondary);"></div>
                    </div>
                    
                    <div id="speedtest-result" style="display: none;">
                        <div class="code-block" id="final-result"></div>
                    </div>
                </div>
                
                <div class="tool-info">
                    <p class="text-info">ℹ️ This is a simulated speed test. Results are randomly generated for demonstration.</p>
                </div>
            </div>
            
            <script>
                document.getElementById('start-speedtest').addEventListener('click', function() {
                    const btn = this;
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
                    
                    const progress = document.getElementById('speedtest-progress');
                    const progressFill = document.getElementById('progress-fill');
                    const progressText = document.getElementById('progress-text');
                    const resultDiv = document.getElementById('speedtest-result');
                    
                    progress.style.display = 'block';
                    resultDiv.style.display = 'none';
                    
                    // Reset values
                    document.getElementById('download-speed').textContent = '0 Mbps';
                    document.getElementById('upload-speed').textContent = '0 Mbps';
                    document.getElementById('ping-speed').textContent = '-- ms';
                    document.getElementById('download-bar').style.width = '0%';
                    document.getElementById('upload-bar').style.width = '0%';
                    
                    let progressValue = 0;
                    let download = 0;
                    let upload = 0;
                    let ping = Math.floor(Math.random() * 50) + 10;
                    
                    const testInterval = setInterval(() => {
                        progressValue += 5;
                        progressFill.style.width = progressValue + '%';
                        
                        if (progressValue <= 30) {
                            // Ping test phase
                            progressText.textContent = 'Testing ping...';
                            if (progressValue === 30) {
                                document.getElementById('ping-speed').textContent = ping + ' ms';
                            }
                        } else if (progressValue <= 70) {
                            // Download test phase
                            progressText.textContent = 'Testing download speed...';
                            download += Math.random() * 15 + 5;
                            if (download > 100) download = 100;
                            document.getElementById('download-speed').textContent = download.toFixed(1) + ' Mbps';
                            document.getElementById('download-bar').style.width = download + '%';
                        } else {
                            // Upload test phase
                            progressText.textContent = 'Testing upload speed...';
                            upload += Math.random() * 8 + 2;
                            if (upload > 50) upload = 50;
                            document.getElementById('upload-speed').textContent = upload.toFixed(1) + ' Mbps';
                            document.getElementById('upload-bar').style.width = (upload * 2) + '%';
                        }
                        
                        if (progressValue >= 100) {
                            clearInterval(testInterval);
                            progress.style.display = 'none';
                            resultDiv.style.display = 'block';
                            
                            const finalResult = \`
                                Speed Test Results:
                                ────────────────────
                                Download: \${download.toFixed(1)} Mbps
                                Upload:   \${upload.toFixed(1)} Mbps
                                Ping:     \${ping} ms
                                Jitter:   \${(Math.random() * 5 + 1).toFixed(1)} ms
                                ────────────────────
                                Connection: Excellent
                                Recommended for: 4K streaming, gaming
                            \`;
                            
                            document.getElementById('final-result').textContent = finalResult;
                            
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fas fa-redo"></i> Test Again';
                            
                            window.showNotification(\`Speed test completed: \${download.toFixed(1)} Mbps down, \${upload.toFixed(1)} Mbps up\`, 'success');
                        }
                    }, 200);
                });
                
                <style>
                    .progress-bar {
                        height: 10px;
                        background: var(--border-color);
                        border-radius: 5px;
                        overflow: hidden;
                        margin: 20px 0;
                    }
                    
                    .progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, var(--accent-color), var(--success-color));
                        width: 0%;
                        transition: width 0.3s ease;
                        border-radius: 5px;
                    }
                    
                    .speed-test-result {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin: 20px 0;
                    }
                    
                    .speed-item {
                        background: rgba(255,255,255,0.05);
                        padding: 15px;
                        border-radius: 8px;
                        text-align: center;
                    }
                    
                    .speed-value {
                        font-size: 1.8rem;
                        font-weight: bold;
                        margin: 10px 0;
                        color: var(--accent-color);
                    }
                    
                    .speed-bar {
                        height: 10px;
                        background: var(--border-color);
                        border-radius: 5px;
                        overflow: hidden;
                        margin-top: 10px;
                    }
                    
                    .speed-fill {
                        height: 100%;
                        background: linear-gradient(90deg, var(--accent-color), var(--success-color));
                        width: 0%;
                        transition: width 0.3s ease;
                    }
                    
                    #upload-bar {
                        background: linear-gradient(90deg, var(--accent-secondary), #0044aa);
                    }
                </style>
            </script>
        `
    },
    
    portscan: {
        name: 'Port Scanner',
        content: `
            <div class="tool-container">
                <h4>🔍 Port Scanner</h4>
                <p>Scan for open ports on a host.</p>
                
                <div class="tool-form">
                    <div class="form-group">
                        <label for="scan-host">Host:</label>
                        <input type="text" id="scan-host" placeholder="hostname or IP" value="scanme.nmap.org">
                    </div>
                    
                    <div class="form-group">
                        <label for="scan-ports">Port Range:</label>
                        <select id="scan-ports">
                            <option value="common">Common Ports (20 ports)</option>
                            <option value="web">Web Ports (80, 443, 8080, 8443)</option>
                            <option value="all">All Ports 1-100 (slow)</option>
                        </select>
                    </div>
                    
                    <button id="start-scan" class="btn-tool">
                        <i class="fas fa-search"></i> Start Scan
                    </button>
                </div>
                
                <div class="tool-result">
                    <h5>Scan Results:</h5>
                    <div id="scan-result">
                        <p>Click "Start Scan" to begin port scanning</p>
                    </div>
                </div>
                
                <div class="tool-info">
                    <p class="text-warning">⚠️ Warning: This is a simulation. No actual network scanning is performed.</p>
                </div>
            </div>
            
            <script>
                document.getElementById('start-scan').addEventListener('click', function() {
                    const host = document.getElementById('scan-host').value || 'scanme.nmap.org';
                    const portRange = document.getElementById('scan-ports').value;
                    
                    const btn = this;
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
                    
                    // Common ports
                    const commonPorts = [
                        {port: 21, service: 'FTP'},
                        {port: 22, service: 'SSH'},
                        {port: 23, service: 'Telnet'},
                        {port: 25, service: 'SMTP'},
                        {port: 53, service: 'DNS'},
                        {port: 80, service: 'HTTP'},
                        {port: 110, service: 'POP3'},
                        {port: 143, service: 'IMAP'},
                        {port: 443, service: 'HTTPS'},
                        {port: 465, service: 'SMTPS'},
                        {port: 587, service: 'SMTP'},
                        {port: 993, service: 'IMAPS'},
                        {port: 995, service: 'POP3S'},
                        {port: 3306, service: 'MySQL'},
                        {port: 3389, service: 'RDP'},
                        {port: 5432, service: 'PostgreSQL'},
                        {port: 8080, service: 'HTTP-Alt'},
                        {port: 8443, service: 'HTTPS-Alt'},
                        {port: 27017, service: 'MongoDB'},
                        {port: 6379, service: 'Redis'}
                    ];
                    
                    // Web ports
                    const webPorts = [
                        {port: 80, service: 'HTTP'},
                        {port: 443, service: 'HTTPS'},
                        {port: 8080, service: 'HTTP-Alt'},
                        {port: 8443, service: 'HTTPS-Alt'}
                    ];
                    
                    // All ports 1-100
                    const allPorts = Array.from({length: 100}, (_, i) => ({
                        port: i + 1,
                        service: 'Unknown'
                    }));
                    
                    let portsToScan = commonPorts;
                    if (portRange === 'web') portsToScan = webPorts;
                    if (portRange === 'all') portsToScan = allPorts;
                    
                    let openPorts = [];
                    let filteredPorts = [];
                    let closedPorts = [];
                    
                    // Simulate scanning with delay
                    let currentIndex = 0;
                    const scanInterval = setInterval(() => {
                        if (currentIndex >= portsToScan.length) {
                            clearInterval(scanInterval);
                            
                            // Display results
                            let resultHTML = \`
                                <div class="code-block">
                                    <strong>Port scan results for \${host}:</strong>
                                    
                                    <div style="margin: 10px 0;">
                                        <span class="text-success">Open: \${openPorts.length} ports</span> | 
                                        <span class="text-warning">Filtered: \${filteredPorts.length} ports</span> | 
                                        <span class="text-muted">Closed: \${closedPorts.length} ports</span>
                                    </div>
                                    
                                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                                        <thead>
                                            <tr>
                                                <th style="text-align: left; border-bottom: 1px solid var(--border-color); padding: 5px;">PORT</th>
                                                <th style="text-align: left; border-bottom: 1px solid var(--border-color); padding: 5px;">STATE</th>
                                                <th style="text-align: left; border-bottom: 1px solid var(--border-color); padding: 5px;">SERVICE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                            \`;
                            
                            // Add open ports first
                            openPorts.forEach(p => {
                                resultHTML += \`
                                    <tr>
                                        <td style="padding: 5px;">\${p.port}</td>
                                        <td style="padding: 5px;"><span class="text-success">open</span></td>
                                        <td style="padding: 5px;">\${p.service}</td>
                                    </tr>
                                \`;
                            });
                            
                            // Add filtered ports
                            filteredPorts.forEach(p => {
                                resultHTML += \`
                                    <tr>
                                        <td style="padding: 5px;">\${p.port}</td>
                                        <td style="padding: 5px;"><span class="text-warning">filtered</span></td>
                                        <td style="padding: 5px;">\${p.service}</td>
                                    </tr>
                                \`;
                            });
                            
                            resultHTML += \`
                                        </tbody>
                                    </table>
                                    
                                    <div style="margin-top: 15px; font-size: 0.9em; color: var(--text-muted);">
                                        Scan completed in \${portsToScan.length * 0.1}s
                                    </div>
                                </div>
                            \`;
                            
                            document.getElementById('scan-result').innerHTML = resultHTML;
                            
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fas fa-search"></i> Start Scan';
                            
                            window.showNotification(\`Port scan completed: found \${openPorts.length} open ports\`, 'success');
                            return;
                        }
                        
                        const port = portsToScan[currentIndex];
                        const status = Math.random();
                        
                        if (status < 0.1) { // 10% chance open
                            openPorts.push(port);
                        } else if (status < 0.2) { // 10% chance filtered
                            filteredPorts.push(port);
                        } else { // 80% chance closed
                            closedPorts.push(port);
                        }
                        
                        currentIndex++;
                        
                        // Update progress
                        const progress = Math.round((currentIndex / portsToScan.length) * 100);
                        btn.innerHTML = \`<i class="fas fa-spinner fa-spin"></i> Scanning... \${progress}%\`;
                        
                    }, 100); // 100ms per port
                });
            </script>
        `
    },
    
    qrcode: {
        name: 'QR Code Generator',
        content: `
            <div class="tool-container">
                <h4>📱 QR Code Generator</h4>
                <p>Generate QR codes from text or URLs.</p>
                
                <div class="tool-form">
                    <div class="form-group">
                        <label for="qr-content">Content:</label>
                        <textarea id="qr-content" rows="4" placeholder="Enter text or URL here...">https://github.com</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="qr-size">Size:</label>
                        <select id="qr-size">
                            <option value="150">150x150</option>
                            <option value="250" selected>250x250</option>
                            <option value="350">350x350</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="qr-color">Color:</label>
                        <select id="qr-color">
                            <option value="000000">Black</option>
                            <option value="0088ff">Blue</option>
                            <option value="00ff00">Green</option>
                            <option value="ff0000">Red</option>
                        </select>
                    </div>
                    
                    <button id="qr-generate" class="btn-tool">
                        <i class="fas fa-qrcode"></i> Generate QR Code
                    </button>
                </div>
                
                <div class="tool-result">
                    <h5>Generated QR Code:</h5>
                    <div id="qr-result" style="text-align: center; padding: 20px;">
                        <p>QR code will appear here after generation.</p>
                    </div>
                </div>
                
                <div class="tool-info">
                    <p class="text-info">ℹ️ QR codes are generated using QRServer API.</p>
                </div>
            </div>
            
            <script>
                document.getElementById('qr-generate').addEventListener('click', function() {
                    const content = document.getElementById('qr-content').value;
                    const size = document.getElementById('qr-size').value;
                    const color = document.getElementById('qr-color').value;
                    
                    if (!content.trim()) {
                        window.showNotification('Please enter content for QR code', 'error');
                        return;
                    }
                    
                    // Using QRServer API
                    const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=\${size}x\${size}&color=\${color}&data=\${encodeURIComponent(content)}\`;
                    
                    const qrHTML = \`
                        <div style="background: white; padding: 15px; border-radius: 8px; display: inline-block;">
                            <img src="\${qrUrl}" alt="QR Code" style="max-width: 100%;">
                            <p style="margin-top: 10px; word-break: break-all; font-size: 0.8em; color: var(--text-muted);">
                                \${content.substring(0, 50)}\${content.length > 50 ? '...' : ''}
                            </p>
                        </div>
                        <div style="margin-top: 15px;">
                            <button id="download-qr" class="btn-tool" style="margin-right: 10px;">
                                <i class="fas fa-download"></i> Download QR
                            </button>
                            <button id="copy-qr" class="btn-tool">
                                <i class="fas fa-copy"></i> Copy URL
                            </button>
                        </div>
                    \`;
                    
                    document.getElementById('qr-result').innerHTML = qrHTML;
                    
                    // Add download functionality
                    document.getElementById('download-qr').addEventListener('click', function() {
                        const link = document.createElement('a');
                        link.href = qrUrl;
                        link.download = 'qrcode.png';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.showNotification('QR code downloaded!', 'success');
                    });
                    
                    // Add copy functionality
                    document.getElementById('copy-qr').addEventListener('click', function() {
                        navigator.clipboard.writeText(content).then(() => {
                            window.showNotification('Content copied to clipboard!', 'success');
                        });
                    });
                    
                    window.showNotification('QR code generated successfully!', 'success');
                });
            </script>
        `
    },
    
    base64: {
        name: 'Base64 Encoder/Decoder',
        content: `
            <div class="tool-container">
                <h4>🔐 Base64 Encoder/Decoder</h4>
                <p>Encode text to Base64 or decode Base64 to text.</p>
                
                <div class="tool-form">
                    <div class="form-group">
                        <label for="base64-operation">Operation:</label>
                        <select id="base64-operation">
                            <option value="encode">Encode to Base64</option>
                            <option value="decode">Decode from Base64</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="base64-input">Input Text:</label>
                        <textarea id="base64-input" rows="5" placeholder="Enter text to encode/decode...">Hello WebTerm!</textarea>
                    </div>
                    
                    <button id="base64-process" class="btn-tool">
                        <i class="fas fa-cogs"></i> Process
                    </button>
                    
                    <button id="base64-swap" class="btn-tool" style="background: var(--accent-secondary); margin-left: 10px;">
                        <i class="fas fa-exchange-alt"></i> Swap
                    </button>
                    
                    <button id="base64-copy" class="btn-tool" style="background: var(--accent-warning); margin-left: 10px;">
                        <i class="fas fa-copy"></i> Copy Result
                    </button>
                </div>
                
                <div class="tool-result">
                    <h5>Result:</h5>
                    <div id="base64-result">
                        <textarea id="base64-output" rows="5" readonly placeholder="Result will appear here..." style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px; font-family: 'Courier New', monospace;"></textarea>
                    </div>
                </div>
            </div>
            
            <script>
                document.getElementById('base64-process').addEventListener('click', function() {
                    const operation = document.getElementById('base64-operation').value;
                    const input = document.getElementById('base64-input').value;
                    const output = document.getElementById('base64-output');
                    
                    if (!input.trim()) {
                        window.showNotification('Please enter text to process', 'warning');
                        return;
                    }
                    
                    try {
                        if (operation === 'encode') {
                            const encoded = btoa(input);
                            output.value = encoded;
                            window.showNotification('Text encoded to Base64', 'success');
                        } else {
                            const decoded = atob(input);
                            output.value = decoded;
                            window.showNotification('Base64 decoded to text', 'success');
                        }
                    } catch (error) {
                        output.value = 'Error: ' + error.message;
                        window.showNotification('Processing error: ' + error.message, 'error');
                    }
                });
                
                document.getElementById('base64-swap').addEventListener('click', function() {
                    const operation = document.getElementById('base64-operation');
                    const input = document.getElementById('base64-input');
                    const output = document.getElementById('base64-output');
                    
                    // Swap operation
                    operation.value = operation.value === 'encode' ? 'decode' : 'encode';
                    
                    // Swap input and output if output has value
                    if (output.value.trim()) {
                        const temp = input.value;
                        input.value = output.value;
                        output.value = temp;
                        window.showNotification('Swapped input/output and operation', 'info');
                    }
                });
                
                document.getElementById('base64-copy').addEventListener('click', function() {
                    const output = document.getElementById('base64-output');
                    if (output.value.trim()) {
                        navigator.clipboard.writeText(output.value).then(() => {
                            window.showNotification('Result copied to clipboard!', 'success');
                        });
                    } else {
                        window.showNotification('No result to copy', 'warning');
                    }
                });
            </script>
        `
    },
    
    calculator: {
        name: 'Scientific Calculator',
        content: `
            <div class="tool-container">
                <h4>🧮 Scientific Calculator</h4>
                <p>A fully functional scientific calculator.</p>
                
                <div class="calculator">
                    <div class="calculator-display">
                        <input type="text" id="calc-display" readonly value="0" style="width: 100%; padding: 15px; font-size: 1.5rem; text-align: right; background: rgba(0,0,0,0.5); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px; margin-bottom: 10px;">
                    </div>
                    
                    <div class="calculator-buttons" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;">
                        <!-- Row 1 -->
                        <button class="calc-btn" data-action="clear" style="grid-column: span 2;">C</button>
                        <button class="calc-btn" data-action="backspace">⌫</button>
                        <button class="calc-btn" data-action="percentage">%</button>
                        <button class="calc-btn" data-action="divide">/</button>
                        
                        <!-- Row 2 -->
                        <button class="calc-btn" data-value="7">7</button>
                        <button class="calc-btn" data-value="8">8</button>
                        <button class="calc-btn" data-value="9">9</button>
                        <button class="calc-btn" data-action="multiply">×</button>
                        <button class="calc-btn sci" data-action="sin">sin</button>
                        
                        <!-- Row 3 -->
                        <button class="calc-btn" data-value="4">4</button>
                        <button class="calc-btn" data-value="5">5</button>
                        <button class="calc-btn" data-value="6">6</button>
                        <button class="calc-btn" data-action="subtract">-</button>
                        <button class="calc-btn sci" data-action="cos">cos</button>
                        
                        <!-- Row 4 -->
                        <button class="calc-btn" data-value="1">1</button>
                        <button class="calc-btn" data-value="2">2</button>
                        <button class="calc-btn" data-value="3">3</button>
                        <button class="calc-btn" data-action="add">+</button>
                        <button class="calc-btn sci" data-action="tan">tan</button>
                        
                        <!-- Row 5 -->
                        <button class="calc-btn" data-value="0" style="grid-column: span 2;">0</button>
                        <button class="calc-btn" data-action="decimal">.</button>
                        <button class="calc-btn equals" data-action="equals" style="grid-column: span 2;">=</button>
                        
                        <!-- Scientific functions -->
                        <button class="calc-btn sci" data-action="sqrt">√</button>
                        <button class="calc-btn sci" data-action="power">x²</button>
                        <button class="calc-btn sci" data-action="log">log</button>
                        <button class="calc-btn sci" data-action="ln">ln</button>
                        <button class="calc-btn sci" data-action="pi">π</button>
                    </div>
                </div>
                
                <div class="tool-info" style="margin-top: 20px;">
                    <p class="text-info">ℹ️ Supports basic arithmetic and scientific functions.</p>
                </div>
            </div>
            
            <script>
                class Calculator {
                    constructor() {
                        this.display = document.getElementById('calc-display');
                        this.currentInput = '0';
                        this.previousInput = '';
                        this.operation = null;
                        this.resetScreen = false;
                        
                        this.init();
                    }
                    
                    init() {
                        document.querySelectorAll('.calc-btn').forEach(button => {
                            button.addEventListener('click', () => {
                                const action = button.getAttribute('data-action');
                                const value = button.getAttribute('data-value');
                                
                                if (value !== null) {
                                    this.inputNumber(value);
                                } else if (action !== null) {
                                    this.handleAction(action);
                                }
                            });
                        });
                    }
                    
                    inputNumber(num) {
                        if (this.currentInput === '0' || this.resetScreen) {
                            this.currentInput = num;
                            this.resetScreen = false;
                        } else {
                            this.currentInput += num;
                        }
                        this.updateDisplay();
                    }
                    
                    handleAction(action) {
                        switch (action) {
                            case 'clear':
                                this.clear();
                                break;
                            case 'backspace':
                                this.backspace();
                                break;
                            case 'percentage':
                                this.percentage();
                                break;
                            case 'decimal':
                                this.inputDecimal();
                                break;
                            case 'add':
                            case 'subtract':
                            case 'multiply':
                            case 'divide':
                                this.setOperation(action);
                                break;
                            case 'equals':
                                this.calculate();
                                break;
                            case 'sin':
                                this.scientific('sin');
                                break;
                            case 'cos':
                                this.scientific('cos');
                                break;
                            case 'tan':
                                this.scientific('tan');
                                break;
                            case 'sqrt':
                                this.scientific('sqrt');
                                break;
                            case 'power':
                                this.scientific('power');
                                break;
                            case 'log':
                                this.scientific('log');
                                break;
                            case 'ln':
                                this.scientific('ln');
                                break;
                            case 'pi':
                                this.inputPi();
                                break;
                        }
                    }
                    
                    clear() {
                        this.currentInput = '0';
                        this.previousInput = '';
                        this.operation = null;
                        this.updateDisplay();
                    }
                    
                    backspace() {
                        if (this.currentInput.length > 1) {
                            this.currentInput = this.currentInput.slice(0, -1);
                        } else {
                            this.currentInput = '0';
                        }
                        this.updateDisplay();
                    }
                    
                    percentage() {
                        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
                        this.updateDisplay();
                    }
                    
                    inputDecimal() {
                        if (this.resetScreen) {
                            this.currentInput = '0.';
                            this.resetScreen = false;
                        } else if (!this.currentInput.includes('.')) {
                            this.currentInput += '.';
                        }
                        this.updateDisplay();
                    }
                    
                    inputPi() {
                        if (this.resetScreen) {
                            this.currentInput = Math.PI.toString();
                            this.resetScreen = false;
                        } else {
                            this.currentInput = Math.PI.toString();
                        }
                        this.updateDisplay();
                    }
                    
                    setOperation(op) {
                        if (this.operation !== null) {
                            this.calculate();
                        }
                        this.operation = op;
                        this.previousInput = this.currentInput;
                        this.resetScreen = true;
                    }
                    
                    calculate() {
                        if (this.operation === null || this.resetScreen) {
                            return;
                        }
                        
                        let result;
                        const prev = parseFloat(this.previousInput);
                        const current = parseFloat(this.currentInput);
                        
                        if (isNaN(prev) || isNaN(current)) return;
                        
                        switch (this.operation) {
                            case 'add':
                                result = prev + current;
                                break;
                            case 'subtract':
                                result = prev - current;
                                break;
                            case 'multiply':
                                result = prev * current;
                                break;
                            case 'divide':
                                result = prev / current;
                                break;
                            default:
                                return;
                        }
                        
                        this.currentInput = result.toString();
                        this.operation = null;
                        this.previousInput = '';
                        this.resetScreen = true;
                        this.updateDisplay();
                    }
                    
                    scientific(func) {
                        const value = parseFloat(this.currentInput);
                        let result;
                        
                        switch (func) {
                            case 'sin':
                                result = Math.sin(value * Math.PI / 180);
                                break;
                            case 'cos':
                                result = Math.cos(value * Math.PI / 180);
                                break;
                            case 'tan':
                                result = Math.tan(value * Math.PI / 180);
                                break;
                            case 'sqrt':
                                result = Math.sqrt(value);
                                break;
                            case 'power':
                                result = Math.pow(value, 2);
                                break;
                            case 'log':
                                result = Math.log10(value);
                                break;
                            case 'ln':
                                result = Math.log(value);
                                break;
                        }
                        
                        this.currentInput = result.toString();
                        this.updateDisplay();
                    }
                    
                    updateDisplay() {
                        this.display.value = this.currentInput;
                    }
                }
                
                // Initialize calculator when modal opens
                document.addEventListener('DOMContentLoaded', function() {
                    new Calculator();
                });
                
                <style>
                    .calc-btn {
                        padding: 15px;
                        border: none;
                        border-radius: 4px;
                        background: rgba(255,255,255,0.1);
                        color: var(--text-primary);
                        font-size: 1.1rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    
                    .calc-btn:hover {
                        background: rgba(255,255,255,0.2);
                    }
                    
                    .calc-btn.equals {
                        background: var(--accent-color);
                        color: black;
                        font-weight: bold;
                    }
                    
                    .calc-btn.equals:hover {
                        background: var(--success-color);
                    }
                    
                    .calc-btn.sci {
                        background: rgba(0,136,255,0.2);
                        font-size: 0.9rem;
                    }
                    
                    .calc-btn.sci:hover {
                        background: rgba(0,136,255,0.3);
                    }
                </style>
            </script>
        `
    }
};

// Add remaining tools (simplified versions)
tools.hash = {
    name: 'Hash Generator',
    content: `<div class="tool-container">
        <h4>🔑 Hash Generator</h4>
        <p>Generate MD5, SHA1, SHA256 hashes.</p>
        <p class="text-info">Tool implementation similar to Base64 tool.</p>
        <p>Use command: <code>hash &lt;algorithm&gt; &lt;text&gt;</code></p>
    </div>`
};

tools.json = {
    name: 'JSON Formatter',
    content: `<div class="tool-container">
        <h4>📄 JSON Formatter</h4>
        <p>Format and validate JSON data.</p>
        <p class="text-info">Tool implementation similar to Base64 tool.</p>
        <p>Use command: <code>json format &#123;"key":"value"&#125;</code></p>
    </div>`
};

tools.notes = {
    name: 'Notes',
    content: `<div class="tool-container">
        <h4>📝 Notes</h4>
        <p>Simple note-taking tool.</p>
        <textarea id="notes-area" rows="10" placeholder="Type your notes here..." style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px; font-family: 'Courier New', monospace;"></textarea>
        <div style="margin-top: 15px;">
            <button id="save-notes" class="btn-tool"><i class="fas fa-save"></i> Save Notes</button>
            <button id="clear-notes" class="btn-tool" style="background: var(--accent-warning); margin-left: 10px;"><i class="fas fa-broom"></i> Clear</button>
        </div>
        <script>
            // Load saved notes
            const savedNotes = localStorage.getItem('webterm-notes');
            if (savedNotes) {
                document.getElementById('notes-area').value = savedNotes;
            }
            
            document.getElementById('save-notes').addEventListener('click', function() {
                const notes = document.getElementById('notes-area').value;
                                      localStorage.setItem('webterm-notes', notes);
                window.showNotification('Notes saved!', 'success');
            });
            
            document.getElementById('clear-notes').addEventListener('click', function() {
                if (confirm('Clear all notes?')) {
                    document.getElementById('notes-area').value = '';
                    localStorage.removeItem('webterm-notes');
                    window.showNotification('Notes cleared', 'info');
                }
            });
        </script>
    </div>`
};

tools.converter = {
    name: 'Unit Converter',
    content: `<div class="tool-container">
        <h4>📏 Unit Converter</h4>
        <p>Convert between different units.</p>
        <div class="tool-form">
            <div class="form-group">
                <label for="converter-value">Value:</label>
                <input type="number" id="converter-value" value="1" step="any">
            </div>
            <div class="form-group">
                <label for="converter-from">From:</label>
                <select id="converter-from">
                    <option value="meter">Meter</option>
                    <option value="kilometer">Kilometer</option>
                    <option value="centimeter">Centimeter</option>
                    <option value="inch">Inch</option>
                    <option value="foot">Foot</option>
                </select>
            </div>
            <div class="form-group">
                <label for="converter-to">To:</label>
                <select id="converter-to">
                    <option value="meter">Meter</option>
                    <option value="kilometer" selected>Kilometer</option>
                    <option value="centimeter">Centimeter</option>
                    <option value="inch">Inch</option>
                    <option value="foot">Foot</option>
                </select>
            </div>
            <button id="convert-btn" class="btn-tool"><i class="fas fa-exchange-alt"></i> Convert</button>
        </div>
        <div class="tool-result">
            <h5>Result:</h5>
            <div id="converter-result" class="code-block">Click Convert to see result</div>
        </div>
        <script>
            const conversions = {
                meter: {meter: 1, kilometer: 0.001, centimeter: 100, inch: 39.3701, foot: 3.28084},
                kilometer: {meter: 1000, kilometer: 1, centimeter: 100000, inch: 39370.1, foot: 3280.84},
                centimeter: {meter: 0.01, kilometer: 0.00001, centimeter: 1, inch: 0.393701, foot: 0.0328084},
                inch: {meter: 0.0254, kilometer: 0.0000254, centimeter: 2.54, inch: 1, foot: 0.0833333},
                foot: {meter: 0.3048, kilometer: 0.0003048, centimeter: 30.48, inch: 12, foot: 1}
            };
            
            document.getElementById('convert-btn').addEventListener('click', function() {
                const value = parseFloat(document.getElementById('converter-value').value) || 0;
                const from = document.getElementById('converter-from').value;
                const to = document.getElementById('converter-to').value;
                
                if (from === to) {
                    document.getElementById('converter-result').textContent = \`\${value} \${from} = \${value} \${to}\`;
                    return;
                }
                
                const result = value * conversions[from][to];
                document.getElementById('converter-result').textContent = 
                    \`\${value} \${from} = \${result.toFixed(6)} \${to}\`;
                window.showNotification('Conversion completed', 'success');
            });
            
            // Auto-convert on change
            ['converter-value', 'converter-from', 'converter-to'].forEach(id => {
                document.getElementById(id).addEventListener('change', function() {
                    document.getElementById('convert-btn').click();
                });
            });
            
            // Initial conversion
            setTimeout(() => {
                document.getElementById('convert-btn').click();
            }, 100);
        </script>
    </div>`
};

tools.password = {
    name: 'Password Generator',
    content: `<div class="tool-container">
        <h4>🔒 Password Generator</h4>
        <p>Generate secure passwords.</p>
        <div class="tool-form">
            <div class="form-group">
                <label for="password-length">Length: <span id="length-value">12</span></label>
                <input type="range" id="password-length" min="8" max="32" value="12">
            </div>
            <div class="form-group">
                <label><input type="checkbox" id="include-uppercase" checked> Uppercase (A-Z)</label><br>
                <label><input type="checkbox" id="include-lowercase" checked> Lowercase (a-z)</label><br>
                <label><input type="checkbox" id="include-numbers" checked> Numbers (0-9)</label><br>
                <label><input type="checkbox" id="include-symbols"> Symbols (!@#$%)</label>
            </div>
            <button id="generate-password" class="btn-tool"><i class="fas fa-key"></i> Generate Password</button>
            <button id="copy-password" class="btn-tool" style="background: var(--accent-secondary); margin-left: 10px;"><i class="fas fa-copy"></i> Copy</button>
        </div>
        <div class="tool-result">
            <h5>Generated Password:</h5>
            <div id="password-result" class="code-block" style="font-size: 1.2rem; letter-spacing: 2px; text-align: center; padding: 15px;">Click Generate</div>
        </div>
        <script>
            document.getElementById('password-length').addEventListener('input', function() {
                document.getElementById('length-value').textContent = this.value;
            });
            
            function generatePassword() {
                const length = parseInt(document.getElementById('password-length').value);
                const includeUppercase = document.getElementById('include-uppercase').checked;
                const includeLowercase = document.getElementById('include-lowercase').checked;
                const includeNumbers = document.getElementById('include-numbers').checked;
                const includeSymbols = document.getElementById('include-symbols').checked;
                
                const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const lowercase = 'abcdefghijklmnopqrstuvwxyz';
                const numbers = '0123456789';
                const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                
                let chars = '';
                if (includeUppercase) chars += uppercase;
                if (includeLowercase) chars += lowercase;
                if (includeNumbers) chars += numbers;
                if (includeSymbols) chars += symbols;
                
                if (chars === '') {
                    window.showNotification('Select at least one character type', 'error');
                    return 'Select character types';
                }
                
                let password = '';
                for (let i = 0; i < length; i++) {
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                
                return password;
            }
            
            document.getElementById('generate-password').addEventListener('click', function() {
                const password = generatePassword();
                document.getElementById('password-result').textContent = password;
                window.showNotification('Password generated', 'success');
            });
            
            document.getElementById('copy-password').addEventListener('click', function() {
                const password = document.getElementById('password-result').textContent;
                if (password && password !== 'Click Generate') {
                    navigator.clipboard.writeText(password).then(() => {
                        window.showNotification('Password copied to clipboard!', 'success');
                    });
                }
            });
            
            // Generate initial password
            setTimeout(() => {
                document.getElementById('generate-password').click();
            }, 100);
        </script>
    </div>`
};

tools.process = {
    name: 'Process Monitor',
    content: `<div class="tool-container">
        <h4>📊 Process Monitor</h4>
        <p>Monitor system processes (simulated).</p>
        <div id="process-list" class="code-block">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="text-align: left; padding: 5px; border-bottom: 1px solid var(--border-color);">PID</th>
                        <th style="text-align: left; padding: 5px; border-bottom: 1px solid var(--border-color);">NAME</th>
                        <th style="text-align: left; padding: 5px; border-bottom: 1px solid var(--border-color);">CPU%</th>
                        <th style="text-align: left; padding: 5px; border-bottom: 1px solid var(--border-color);">MEM%</th>
                        <th style="text-align: left; padding: 5px; border-bottom: 1px solid var(--border-color);">STATUS</th>
                    </tr>
                </thead>
                <tbody id="process-table">
                    <!-- Processes will be added here -->
                </tbody>
            </table>
        </div>
        <div style="margin-top: 15px;">
            <button id="refresh-processes" class="btn-tool"><i class="fas fa-redo"></i> Refresh</button>
            <span id="process-count" style="margin-left: 15px; color: var(--text-secondary);"></span>
        </div>
        <script>
            const processNames = [
                'systemd', 'bash', 'node', 'nginx', 'mysql', 'php-fpm', 'redis', 
                'chrome', 'vscode', 'docker', 'postgres', 'mongod', 'ssh', 'cron'
            ];
            
            function generateProcesses() {
                const count = Math.floor(Math.random() * 20) + 10;
                const table = document.getElementById('process-table');
                table.innerHTML = '';
                
                let totalCpu = 0;
                let totalMem = 0;
                
                for (let i = 0; i < count; i++) {
                    const pid = Math.floor(Math.random() * 9000) + 1000;
                    const name = processNames[Math.floor(Math.random() * processNames.length)];
                    const cpu = (Math.random() * 10).toFixed(1);
                    const mem = (Math.random() * 5).toFixed(1);
                    const status = Math.random() > 0.1 ? 'Running' : 'Sleeping';
                    
                    totalCpu += parseFloat(cpu);
                    totalMem += parseFloat(mem);
                    
                    const row = document.createElement('tr');
                    row.innerHTML = \`
                        <td style="padding: 5px;">\${pid}</td>
                        <td style="padding: 5px;">\${name}</td>
                        <td style="padding: 5px;">\${cpu}%</td>
                        <td style="padding: 5px;">\${mem}%</td>
                        <td style="padding: 5px;"><span class="\${status === 'Running' ? 'text-success' : 'text-warning'}">\${status}</span></td>
                    \`;
                    table.appendChild(row);
                }
                
                document.getElementById('process-count').textContent = 
                    \`\${count} processes | Total CPU: \${totalCpu.toFixed(1)}% | Total MEM: \${totalMem.toFixed(1)}%\`;
            }
            
            document.getElementById('refresh-processes').addEventListener('click', function() {
                generateProcesses();
                window.showNotification('Process list refreshed', 'info');
            });
            
            // Initial generation
            generateProcesses();
            
            // Auto-refresh every 10 seconds
            setInterval(() => {
                if (!document.getElementById('tool-modal').classList.contains('active')) return;
                generateProcesses();
            }, 10000);
        </script>
    </div>`
};

tools.storage = {
    name: 'Storage Analyzer',
    content: `<div class="tool-container">
        <h4>💾 Storage Analyzer</h4>
        <p>Analyze storage usage (simulated).</p>
        <div id="storage-info" class="code-block">
            <!-- Storage info will be added here -->
        </div>
        <div style="margin-top: 15px;">
            <button id="analyze-storage" class="btn-tool"><i class="fas fa-chart-pie"></i> Analyze</button>
        </div>
        <script>
            function analyzeStorage() {
                const total = 500; // GB
                const used = Math.floor(Math.random() * 400) + 50;
                const free = total - used;
                const percent = (used / total * 100).toFixed(1);
                
                const files = [
                    {name: 'System Files', size: Math.floor(Math.random() * 100) + 50, color: '#ff5555'},
                    {name: 'Applications', size: Math.floor(Math.random() * 150) + 50, color: '#ffaa00'},
                    {name: 'Documents', size: Math.floor(Math.random() * 80) + 20, color: '#00ff00'},
                    {name: 'Media', size: Math.floor(Math.random() * 120) + 30, color: '#0088ff'},
                    {name: 'Other', size: used - 250, color: '#888888'}
                ];
                
                let html = \`
                    <strong>Storage Summary:</strong>
                    Total: \${total} GB
                    Used:  \${used} GB (\${percent}%)
                    Free:  \${free} GB
                    
                    <strong>Usage by Category:</strong>
                \`;
                
                files.forEach(file => {
                    const filePercent = (file.size / total * 100).toFixed(1);
                    html += \`
                    \${file.name.padEnd(15)} \${file.size} GB (\${filePercent}%)
                    \`;
                });
                
                html += \`
                    
                    <strong>Visualization:</strong>
                    <div style="height: 20px; background: #333; border-radius: 10px; margin: 10px 0; overflow: hidden;">
                \`;
                
                files.forEach(file => {
                    const width = (file.size / total * 100);
                    html += \`<div style="height: 100%; width: \${width}%; background: \${file.color}; display: inline-block;"></div>\`;
                });
                
                html += \`</div>\`;
                
                document.getElementById('storage-info').innerHTML = html;
            }
            
            document.getElementById('analyze-storage').addEventListener('click', function() {
                analyzeStorage();
                window.showNotification('Storage analysis completed', 'success');
            });
            
            // Initial analysis
            analyzeStorage();
        </script>
    </div>`
};

tools.network = {
    name: 'Network Monitor',
    content: `<div class="tool-container">
        <h4>📡 Network Monitor</h4>
        <p>Monitor network connections (simulated).</p>
        <div id="network-info" class="code-block">
            <!-- Network info will be added here -->
        </div>
        <div style="margin-top: 15px;">
            <button id="monitor-network" class="btn-tool"><i class="fas fa-wifi"></i> Start Monitoring</button>
            <span id="monitor-status" style="margin-left: 15px; color: var(--text-secondary);">Stopped</span>
        </div>
        <script>
            let monitorInterval = null;
            
            function updateNetworkInfo() {
                const connections = [
                    {local: '192.168.1.100:54321', remote: '142.250.185.78:443', state: 'ESTABLISHED', process: 'chrome'},
                    {local: '192.168.1.100:54322', remote: '151.101.1.69:443', state: 'ESTABLISHED', process: 'node'},
                    {local: '192.168.1.100:54323', remote: '104.16.249.249:443', state: 'TIME_WAIT', process: 'curl'},
                    {local: '192.168.1.100:54324', remote: '8.8.8.8:53', state: 'ESTABLISHED', process: 'systemd'},
                    {local: '192.168.1.100:54325', remote: '192.168.1.1:80', state: 'CLOSE_WAIT', process: 'nginx'}
                ];
                
                let html = \`<strong>Active Network Connections:</strong>
Local Address         Foreign Address       State       Process
───────────────────────────────────────────────────────────────
\`;
                
                connections.forEach(conn => {
                    html += \`
\${conn.local.padEnd(20)} \${conn.remote.padEnd(20)} \${conn.state.padEnd(12)} \${conn.process}
\`;
                });
                
                html += \`
                
<strong>Network Statistics:</strong>
Packets In:   \${Math.floor(Math.random() * 1000) + 500}/s
Packets Out:  \${Math.floor(Math.random() * 800) + 400}/s
Bytes In:     \${(Math.random() * 10 + 1).toFixed(1)} MB/s
Bytes Out:    \${(Math.random() * 5 + 0.5).toFixed(1)} MB/s
Errors:       \${Math.floor(Math.random() * 5)}
                \`;
                
                document.getElementById('network-info').innerHTML = html;
            }
            
            document.getElementById('monitor-network').addEventListener('click', function() {
                const btn = this;
                
                if (monitorInterval) {
                    clearInterval(monitorInterval);
                    monitorInterval = null;
                    btn.innerHTML = '<i class="fas fa-wifi"></i> Start Monitoring';
                    document.getElementById('monitor-status').textContent = 'Stopped';
                    document.getElementById('monitor-status').className = 'text-muted';
                    window.showNotification('Network monitoring stopped', 'info');
                } else {
                    updateNetworkInfo();
                    monitorInterval = setInterval(updateNetworkInfo, 2000);
                    btn.innerHTML = '<i class="fas fa-stop"></i> Stop Monitoring';
                    document.getElementById('monitor-status').textContent = 'Active';
                    document.getElementById('monitor-status').className = 'text-success';
                    window.showNotification('Network monitoring started', 'success');
                }
            });
            
            // Initial update
            updateNetworkInfo();
        </script>
    </div>`
};

// Export tools
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { tools };
}
       
