export interface RemixStep {
  number: string;
  title: string;
  subhead: string;
  instructions: string[];
  tips: string[];
  actionLabel?: string;
  actionUrl?: string;
}

export const REMIX_STEPS: RemixStep[] = [
  {
    number: "01",
    title: "Open Remix & Create Solidity File",
    subhead: "Initialize the contract inside Remix IDE workspace",
    instructions: [
      "Open https://remix.ethereum.org in your browser.",
      "In the left-hand File Explorer sidebar, click the 'contracts' folder.",
      "Click the 'New File' icon and name it EducationalToken.sol.",
      "Paste your generated contract code into the editor.",
      "Remix natively resolves OpenZeppelin npm imports (@openzeppelin/contracts/...) without requiring manual downloads."
    ],
    tips: [
      "If prompted about external imports, click 'Allow' so Remix can fetch OpenZeppelin contracts from npm."
    ],
    actionLabel: "Launch Remix IDE",
    actionUrl: "https://remix.ethereum.org"
  },
  {
    number: "02",
    title: "Configure Compiler & Compile",
    subhead: "Compile with Solidity 0.8.20+ with proper EVM target",
    instructions: [
      "Click the 'Solidity Compiler' icon (3rd tab on the far left icon bar).",
      "In the 'COMPILER' dropdown, select version 0.8.20, 0.8.24, or 0.8.26.",
      "Leave 'Language' as Solidity.",
      "Expand 'Advanced Configurations' to verify EVM Version is set to 'default' or 'cancun' (both Sepolia and Base Sepolia support push0 opcodes).",
      "Click the blue button 'Compile EducationalToken.sol' (or press Ctrl+S / Cmd+S).",
      "A green checkmark icon will appear next to the compiler tab indicating zero compilation errors."
    ],
    tips: [
      "Never ignore compiler warnings; ensure there are no red syntax or version mismatch errors before proceeding."
    ]
  },
  {
    number: "03",
    title: "Switch Environment to 'Injected Provider - MetaMask'",
    subhead: "Bridge Remix IDE to your live Web3 browser wallet",
    instructions: [
      "Click the 'Deploy & Run Transactions' icon (4th tab on the left icon bar, Ethereum logo).",
      "Open the 'ENVIRONMENT' dropdown at the top.",
      "Select 'Injected Provider - MetaMask'.",
      "MetaMask will automatically prompt you with a connection request modal.",
      "Select your educational wallet account and click 'Connect'.",
      "Verify that the 'Account' field now shows your address (0x...) and your testnet ETH balance."
    ],
    tips: [
      "Check the small network indicator right below the environment dropdown: it should state 'Sepolia (11155111)' or 'Base Sepolia (84532)'.",
      "If it says 'Custom (11155111)' or shows the wrong network, switch MetaMask to your desired testnet."
    ]
  },
  {
    number: "04",
    title: "Select Contract & Execute Deployment",
    subhead: "Send the deployment transaction and sign in MetaMask",
    instructions: [
      "In the 'CONTRACT' dropdown, ensure you select 'EducationalToken' (do NOT select 'ERC20' or 'Context').",
      "Because our constructor automatically mints to msg.sender, no constructor arguments are needed.",
      "Click the orange 'Deploy' button.",
      "MetaMask will pop up showing the estimated gas fee (in testnet ETH).",
      "Review the gas fee and click 'Confirm'.",
      "Wait 2 to 15 seconds for the block to be confirmed."
    ],
    tips: [
      "Base Sepolia typically confirms in under 2 seconds; Ethereum Sepolia takes ~12 seconds.",
      "If MetaMask complains of insufficient gas, claim testnet ETH from the faucets in Step 4."
    ]
  },
  {
    number: "05",
    title: "Copy Deployed Address & Test Contract Methods",
    subhead: "Extract the contract address for wallet tracking and verification",
    instructions: [
      "Once confirmed, the transaction appears in the bottom terminal with a green checkmark.",
      "Look at the bottom of the left sidebar under 'Deployed Contracts'.",
      "Expand 'EDUCATIONALTOKEN AT 0x...'.",
      "Click the small 'Copy Address' clipboard icon next to the contract name.",
      "You can also click read functions like 'name', 'symbol', 'decimals', and query 'balanceOf(your_wallet_address)' to see 5,000,000,000,000 * 10^18 tokens!"
    ],
    tips: [
      "Save this contract address immediately; you will need it to import into MetaMask and Trust Wallet."
    ]
  }
];
