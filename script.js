// Main Application Script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize application
    initApp();
    
    // DOM Elements
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const executeBtn = document.getElementById('execute-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const toolBtns = document.querySelectorAll('.tool-btn');
    const modal = document.getElementById('tool-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Application State
    let commandHistory = [];
    let historyIndex = -1;
    let currentPath = '~';
    let systemStats = {
        cpu: 0,
        memory: 0,
        battery: 100
    };
    
    // Initialize Application
    function initApp() {
        // Detect device type
        detectDevice();
        
        // Initialize system stats
        updateSystemStats();
        setInterval(updateSystemStats, 5000);
        
        // Load command history from localStorage
        loadHistory();
        
        // Set initial theme
        const savedTheme = localStorage.getItem('webterm-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Add event listeners
        setupEventListeners();
        
        // Show welcome notification
        showNotification('WebTerm berhasil dimuat! Ketik "help" untuk mulai.', 'success');
    }
    
    // Device Detection
    function detectDevice() {
        const deviceType = document.getElementById('device-type');
        const osInfo = document.getElementById('os-info');
        
        const userAgent = navigator.userAgent.toLowerCase();
        let device = 'Desktop';
        let os = 'Unknown';
        
        // Detect device
        if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
            device = 'Mobile';
        } else if (/tablet/.test(userAgent)) {
            device = 'Tablet';
        }
        
        // Detect OS
        if (/windows/.test(userAgent)) {
            os = 'Windows';
        } else if (/mac os/.test(userAgent)) {
            os = 'macOS';
        } else if (/linux/.test(userAgent)) {
            os = 'Linux';
        } else if (/android/.test(userAgent)) {
            os = 'Android';
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            os = 'iOS';
        }
        
        deviceType.textContent = device;
        osInfo.textContent = os;
    }
    
    // System Stats Update
    function updateSystemStats() {
        // Simulate CPU usage (0-100%)
        systemStats.cpu = Math.floor(Math.random() * 30) + 5;
        
        // Get memory usage
        if (performance.memory) {
            const usedMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(performance.memory.totalJSHeapSize / 1048576);
            systemStats.memory = usedMB;
            document.getElementById('memory-usage').textContent = `${usedMB}/${totalMB}MB`;
        } else {
            systemStats.memory = Math.floor(Math.random() * 500) + 100;
            document.getElementById('memory-usage').textContent = `${systemStats.memory}MB`;
        }
        
        // Get battery status if available
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                systemStats.battery = Math.round(battery.level * 100);
                document.getElementById('battery').textContent = `${systemStats.battery}%`;
            });
        }
        
        document.getElementById('cpu-usage').textContent = `${systemStats.cpu}%`;
    }
    
    // Event Listeners Setup
    function setupEventListeners() {
        // Command input
        commandInput.addEventListener('keydown', handleCommandInput);
        commandInput.addEventListener('input', handleInputSuggestions);
        executeBtn.addEventListener('click', executeCommand);
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Fullscreen toggle
        fullscreenToggle.addEventListener('click', toggleFullscreen);
        
        // Sidebar toggle
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            const icon = sidebarToggle.querySelector('i');
            icon.classList.toggle('fa-chevron-left');
            icon.classList.toggle('fa-chevron-right');
        });
        
        // Quick command buttons
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.getAttribute('data-cmd');
                commandInput.value = cmd;
                executeCommand();
            });
        });
        
        // Tool buttons
        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.getAttribute('data-tool');
                openTool(tool);
            });
        });
        
        // Modal close
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Close notifications when clicking close button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('notification-close')) {
                e.target.closest('.notification').remove();
            }
        });
        
        // Terminal window controls
        document.querySelector('.control-btn.minimize').addEventListener('click', () => {
            showNotification('Terminal diminimize (simulasi)', 'info');
        });
        
        document.querySelector('.control-btn.maximize').addEventListener('click', () => {
            toggleFullscreen();
        });
        
        document.querySelector('.control-btn.close').addEventListener('click', () => {
            if (confirm('Tutup terminal? Anda akan kehilangan session.')) {
                showNotification('Terminal ditutup (simulasi)', 'warning');
            }
        });
    }
    
    // Command Input Handler
    function handleCommandInput(e) {
        // Arrow up for history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                }
                commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
            }
        }
        
        // Arrow down for history
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
            } else {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
        
        // Tab for autocomplete
        else if (e.key === 'Tab') {
            e.preventDefault();
            autocompleteCommand();
        }
        
        // Enter to execute
        else if (e.key === 'Enter') {
            executeCommand();
        }
    }
    
    // Input Suggestions
    function handleInputSuggestions() {
        const input = commandInput.value.trim().toLowerCase();
        const suggestions = document.getElementById('suggestions');
        
        if (input.length === 0) {
            suggestions.style.display = 'none';
            return;
        }
        
        // Get matching commands
        const matchingCommands = Object.keys(commands).filter(cmd => 
            cmd.toLowerCase().startsWith(input)
        ).slice(0, 5);
        
        if (matchingCommands.length > 0) {
            suggestions.innerHTML = matchingCommands.map(cmd => 
                `<div class="suggestion-item" data-cmd="${cmd}">${cmd}</div>`
            ).join('');
            
            suggestions.style.display = 'block';
            
            // Add click event to suggestions
            suggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    commandInput.value = item.getAttribute('data-cmd');
                    suggestions.style.display = 'none';
                    commandInput.focus();
                });
            });
        } else {
            suggestions.style.display = 'none';
        }
    }
    
    // Autocomplete Command
    function autocompleteCommand() {
        const input = commandInput.value.trim().toLowerCase();
        
        if (input.length === 0) return;
        
        // Find matching command
        const matchingCommand = Object.keys(commands).find(cmd => 
            cmd.toLowerCase().startsWith(input)
        );
        
        if (matchingCommand) {
            commandInput.value = matchingCommand;
        }
    }
    
    // Execute Command
    function executeCommand() {
        const input = commandInput.value.trim();
        
        if (!input) return;
        
        // Add to history
        commandHistory.push(input);
        historyIndex = -1;
        saveHistory();
        
        // Display command
        displayCommand(input);
        
        // Process command
        processCommand(input);
        
        // Clear input
        commandInput.value = '';
        
        // Hide suggestions
        document.getElementById('suggestions').style.display = 'none';
        
        // Scroll to bottom
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // Display Command in Output
    function displayCommand(cmd) {
        const historyDiv = output.querySelector('.command-history');
        const commandEntry = document.createElement('div');
        commandEntry.className = 'command-entry';
        
        commandEntry.innerHTML = `
            <div class="command-line">
                <span class="prompt">
                    <span class="user">user</span>
                    <span class="at">@</span>
                    <span class="host">webterm</span>
                    <span class="path">:${currentPath}$</span>
                </span>
                ${cmd}
            </div>
            <div class="command-output" id="output-${Date.now()}"></div>
        `;
        
        historyDiv.appendChild(commandEntry);
        return commandEntry.querySelector('.command-output');
    }
    
    // Process Command
    function processCommand(input) {
        const args = input.split(' ');
        const cmd = args[0].toLowerCase();
        const params = args.slice(1);
        
        const outputElement = document.querySelector(`#output-${Date.now() - 1}`);
        
        // Check if command exists
        if (commands[cmd]) {
            try {
                const result = commands[cmd](params, outputElement);
                if (typeof result === 'string') {
                    outputElement.textContent = result;
                    outputElement.className = 'command-output success';
                } else if (result && result.content) {
                    outputElement.innerHTML = result.content;
                    outputElement.className = `command-output ${result.type || 'success'}`;
                }
            } catch (error) {
                outputElement.textContent = `Error: ${error.message}`;
                outputElement.className = 'command-output error';
            }
        } else {
            outputElement.innerHTML = `
                <span class="text-error">Command not found: ${cmd}</span><br>
                <span class="text-info">Type "help" to see available commands</span>
            `;
            outputElement.className = 'command-output error';
        }
    }
    
    // Theme Toggle
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('webterm-theme', newTheme);
        updateThemeIcon(newTheme);
        
        showNotification(`Tema diubah ke ${newTheme} mode`, 'info');
    }
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Fullscreen Toggle
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                showNotification(`Error enabling fullscreen: ${err.message}`, 'error');
            });
            fullscreenToggle.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenToggle.innerHTML = '<i class="fas fa-expand"></i>';
            }
        }
    }
    
    // Open Tool
    function openTool(toolName) {
        if (tools[toolName]) {
            const tool = tools[toolName];
            document.getElementById('modal-title').textContent = tool.name;
            document.getElementById('modal-body').innerHTML = tool.content;
            modal.classList.add('active');
        } else {
            showNotification(`Tool ${toolName} tidak tersedia`, 'error');
        }
    }
    
    // Show Notification
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const id = `notification-${Date.now()}`;
        
        const notification = document.createElement('div');
        notification.id = id;
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            const notif = document.getElementById(id);
            if (notif) {
                notif.style.opacity = '0';
                notif.style.transform = 'translateX(100%)';
                setTimeout(() => notif.remove(), 300);
            }
        }, 5000);
    }
    
    // Load History from localStorage
    function loadHistory() {
        const saved = localStorage.getItem('webterm-history');
        if (saved) {
            commandHistory = JSON.parse(saved);
        }
    }
    
    // Save History to localStorage
    function saveHistory() {
        // Keep only last 100 commands
        if (commandHistory.length > 100) {
            commandHistory = commandHistory.slice(-100);
        }
        localStorage.setItem('webterm-history', JSON.stringify(commandHistory));
    }
    
    // Make functions available globally
    window.showNotification = showNotification;
    window.openTool = openTool;
});
