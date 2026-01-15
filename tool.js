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
                        <input type="number" id="ping-count" min="1" max="10" value="4">
                    </div>
                    
                    <button id="ping-start" class="btn-tool">Start Ping Test</button>
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
                    
                    let result = \`PING \${host} (93.184.216.34) 56(84) bytes of data.\\n\`;
                    
                    for (let i = 1; i <= count; i++) {
                        const time = Math.floor(Math.random() * 50) + 10;
                        result += \`64 bytes from \${host} (93.184.216.34): icmp_seq=\${i} ttl=57 time=\${time} ms\\n\`;
                    }
                    
                    const times = Array.from({length: count}, () => Math.floor(Math.random() * 50) + 10);
                    const avg = times.reduce((a, b) => a + b) / times.length;
                    const min = Math.min(...times);
                    const max = Math.max(...times);
                    
                    result += \`\\n--- \${host} ping statistics ---\\n\`;
                    result += \`\${count} packets transmitted, \${count} received, 0% packet loss, time \${count * 1000}ms\\n\`;
                    result += \`rtt min/avg/max/mdev = \${min.toFixed(3)}/\${avg.toFixed(3)}/\${max.toFixed(3)}/5.000 ms\`;
                    
                    document.getElementById('ping-result').textContent = result;
                    window.showNotification(\`Ping test completed for \${host}\`, 'success');
                });
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
                    
                    <button id="ip-lookup" class="btn-tool">Lookup IP</button>
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
                    
                    // Simulated IP data
                    const ipData = {
                        '8.8.8.8': {
                            isp: 'Google LLC',
                            country: 'United States',
                            city: 'Mountain View',
                            timezone: 'America/Los_Angeles',
                            coordinates: '37.4056, -122.0775'
                        },
                        '1.1.1.1': {
                            isp: 'Cloudflare',
                            country: 'United States',
                            city: 'Los Angeles',
                            timezone: 'America/Los_Angeles',
                            coordinates: '34.0522, -118.2437'
                        },
                        '203.0.113.45': {
                            isp: 'Simulated Network',
                            country: 'Indonesia',
                            city: 'Jakarta',
                            timezone: 'Asia/Jakarta',
                            coordinates: '-6.2088, 106.8456'
                        }
                    };
                    
                    const data = ipData[ip] || {
                        isp: 'Unknown ISP',
                        country: 'Unknown',
                        city: 'Unknown',
                        timezone: 'UTC',
                        coordinates: '0, 0'
                    };
                    
                    const resultHTML = \`
                        <div class="ip-details">
                            <p><strong>IP Address:</strong> \${ip}</p>
                            <p><strong>ISP:</strong> \${data.isp}</p>
                            <p><strong>Location:</strong> \${data.city}, \${data.country}</p>
                            <p><strong>Timezone:</strong> \${data.timezone}</p>
                            <p><strong>Coordinates:</strong> \${data.coordinates}</p>
                            <p><strong>Type:</strong> IPv4</p>
                        </div>
                    \`;
                    
                    document.getElementById('ip-result').innerHTML = resultHTML;
                    window.showNotification(\`IP lookup completed for \${ip}\`, 'success');
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
                            <option value="128">128x128</option>
                            <option value="256" selected>256x256</option>
                            <option value="512">512x512</option>
                        </select>
                    </div>
                    
                    <button id="qr-generate" class="btn-tool">Generate QR Code</button>
                    <button id="qr-download" class="btn-tool btn-secondary" disabled>Download QR</button>
                </div>
                
                <div class="tool-result">
                    <h5>Generated QR Code:</h5>
                    <div id="qr-result" class="qr-container">
                        <p>QR code will appear here after generation.</p>
                    </div>
                </div>
                
                <div class="tool-info">
                    <p class="text-info">ℹ️ QR codes are generated using an external service (QRServer API).</p>
                </div>
            </div>
            
            <script>
                document.getElementById('qr-generate').addEventListener('click', function() {
                    const content = document.getElementById('qr-content').value;
                    const size = document.getElementById('qr-size').value;
                    
                    if (!content.trim()) {
                        window.showNotification('Please enter content for QR code', 'error');
                        return;
                    }
                    
                    // Using QRServer API
                    const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=\${size}x\${size}&data=\${encodeURIComponent(content)}\`;
                    
                    const qrHTML = \`
                        <div class="qr-code">
                            <img src="\${qrUrl}" alt="QR Code" style="max-width: 100%; border: 1px solid #ccc;">
                            <p class="qr-text"><small>\${content.substring(0, 50)}\${content.length > 50 ? '...' : ''}</small></p>
                        </div>
                    \`;
                    
                    document.getElementById('qr-result').innerHTML = qrHTML;
                    document.getElementById('qr-download').disabled = false;
                    
                    window.showNotification('QR code generated successfully!', 'success');
                });
                
                document.getElementById('qr-download').addEventListener('click', function() {
                    const img = document.querySelector('#qr-result img');
                    if (img) {
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = 'qrcode.png';
                        link.click();
                        window.showNotification('QR code downloaded!', 'success');
                    }
                });
            </script>
            
            <style>
                .qr-container {
                    text-align: center;
                    padding: 20px;
                    background: white;
                    border-radius: 8px;
                    margin-top: 15px;
                }
                
                .qr-text {
                    margin-top: 10px;
                    word-break: break-all;
                }
                
                .btn-secondary {
                    background: #666;
                    margin-left: 10px;
                }
                
                .btn-secondary:hover {
                    background: #555;
                }
            </style>
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
                        <input type="text" id="calc-display" readonly value="0">
                    </div>
                    
                    <div class="calculator-buttons">
                        <div class="calc-row">
                            <button class="calc-btn func" data-action="clear">C</button>
                            <button class="calc-btn func" data-action="backspace">⌫</button>
                            <button class="calc-btn func" data-action="percentage">%</button>
                            <button class="calc-btn op" data-action="divide">/</button>
                        </div>
                        
                        <div class="calc-row">
                            <button class="calc-btn num" data-value="7">7</button>
                            <button class="calc-btn num" data-value="8">8</button>
                            <button class="calc-btn num" data-value="9">9</button>
                            <button class="calc-btn op" data-action="multiply">×</button>
                        </div>
                        
                        <div class="calc-row">
                            <button class="calc-btn num" data-value="4">4</button>
                            <button class="calc-btn num" data-value="5">5</button>
                            <button class="calc-btn num" data-value="6">6</button>
                            <button class="calc-btn op" data-action="subtract">-</button>
                        </div>
                        
                        <div class="calc-row">
                            <button class="calc-btn num" data-value="1">1</button>
                            <button class="calc-btn num" data-value="2">2</button>
                            <button class="calc-btn num" data-value="3">3</button>
                            <button class="calc-btn op" data-action="add">+</button>
                        </div>
                        
                        <div class="calc-row">
                            <button class="calc-btn num" data-value="0">0</button>
                            <button class="calc-btn" data-action="decimal">.</button>
                            <button class="calc-btn equals" data-action="equals">=</button>
                        </div>
                        
                        <div class="calc-row scientific">
                            <button class="calc-btn sci" data-action="sin">sin</button>
                            <button class="calc-btn sci" data-action="cos">cos</button>
                            <button class="calc-btn sci" data-action="tan">tan</button>
                            <button class="calc-btn sci" data-action="sqrt">√</button>
                            <button class="calc-btn sci" data-action="power">x²</button>
                        </div>
                    </div>
                </div>
                
                <div class="tool-info">
                    <p class="text-info">ℹ️ Use for basic and scientific calculations.</p>
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

                        
