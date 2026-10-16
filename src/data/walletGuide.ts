export interface WalletGuideStep {
  app: 'MetaMask' | 'Trust Wallet';
  steps: {
    title: string;
    details: string;
    iconNote?: string;
  }[];
}

export const WALLET_IMPORT_GUIDES: WalletGuideStep[] = [
  {
    app: 'MetaMask',
    steps: [
      {
        title: '1. Switch to Deployed Testnet',
        details: 'Open MetaMask and ensure the active network at top-left matches your deployment target: "Sepolia" or "Base Sepolia". Custom tokens are network-specific.',
      },
      {
        title: '2. Navigate to "Import Tokens"',
        details: 'In your main MetaMask portfolio view, select the "Tokens" tab and scroll to the bottom. Click the link that says "Import tokens".',
      },
      {
        title: '3. Select "Custom Token" & Paste Address',
        details: 'Select the "Custom token" tab. In the "Token contract address" field, paste your copied contract address (0x...).',
      },
      {
        title: '4. Automatic Metadata Autofill',
        details: 'Wait 1-2 seconds. MetaMask will automatically query the contract on-chain and autofill "Token symbol" (e.g. ATLAS) and "Token decimal" (18). If it does not autofill, verify your network matches the deployment chain.',
      },
      {
        title: '5. Confirm & Behold 5 Trillion Balance',
        details: 'Click "Next" / "Add custom token". MetaMask will present a confirmation screen showing your 5,000,000,000,000 balance. Click "Import tokens". Your wallet home will now proudly display your 5T token balance!',
      }
    ]
  },
  {
    app: 'Trust Wallet',
    steps: [
      {
        title: '1. Open Token Management',
        details: 'Open Trust Wallet (mobile app or browser extension). On the home assets screen, tap the filter/slider icon in the upper-right corner or scroll down to "Manage crypto".',
      },
      {
        title: '2. Tap the Add Custom Token Button (+)',
        details: 'Tap the "+" icon in the top header to enter the custom token addition interface.',
      },
      {
        title: '3. Select Target Network',
        details: 'Tap the Network selector. For Ethereum Sepolia, select "Ethereum" (or Sepolia if testnets are toggled). For Base Sepolia, select "Base".',
      },
      {
        title: '4. Paste Address & Query Details',
        details: 'Paste your deployed contract address into the "Address" field. Trust Wallet will pull the Name, Symbol, and 18 Decimals from the blockchain node.',
      },
      {
        title: '5. Save and Track Assets',
        details: 'Tap "Save" or "Import". Your 5 Trillion tokens will now appear in your active asset list with the total balance visible.',
      }
    ]
  }
];
