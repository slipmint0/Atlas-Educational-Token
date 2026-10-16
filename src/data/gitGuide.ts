export interface GitStep {
  title: string;
  command: string;
  explanation: string;
  outputPreview?: string;
}

export const GIT_WORKFLOW_STEPS: GitStep[] = [
  {
    title: "1. Create & Navigate into Project Directory",
    command: "mkdir educational-erc20-token && cd educational-erc20-token",
    explanation: "Creates an isolated workspace folder on your machine and sets it as the active working directory."
  },
  {
    title: "2. Initialize Local Git Repository",
    command: "git init -b main",
    explanation: "Initializes a fresh Git version control repository with 'main' as the primary branch.",
    outputPreview: "Initialized empty Git repository in /Users/dev/educational-erc20-token/.git/"
  },
  {
    title: "3. Create Standard Web3 .gitignore File",
    command: `cat << 'EOF' > .gitignore
# Environment & Secret Keys (CRITICAL: Never commit private keys)
.env
.env.local
.secret
secrets.json

# Dependencies & Build artifacts
node_modules/
artifacts/
cache/
out/
broadcast/
typechain/
typechain-types/

# Operating System Files
.DS_Store
Thumbs.db
EOF`,
    explanation: "Prevents accidental leakage of private keys, .env secrets, and bulky compilation cache files to public repositories."
  },
  {
    title: "4. Create Contracts Directory & Save Solidity File",
    command: `mkdir -p contracts
# Save your EducationalToken.sol into contracts/EducationalToken.sol
# You can use the 'Download .sol' button above or create it directly:
cat << 'EOF' > contracts/EducationalToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EducationalToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Educational Token", "EDU") Ownable(msg.sender) {
        _mint(msg.sender, 5_000_000_000_000 * 10 ** decimals());
    }
}
EOF`,
    explanation: "Structures the contract inside the standard contracts/ directory matching Hardhat and Foundry workspace conventions."
  },
  {
    title: "5. Stage & Commit Contract Code",
    command: `git add .
git commit -m "feat: initial commit of Educational ERC-20 token with 5T supply"`,
    explanation: "Stages all project files and records a permanent, signed version control commit in your local git history.",
    outputPreview: `[main (root-commit) 4b9f2e1] feat: initial commit of Educational ERC-20 token with 5T supply
 2 files changed, 24 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 contracts/EducationalToken.sol`
  },
  {
    title: "6A. Push via GitHub CLI (Recommended & Fastest)",
    command: `gh repo create educational-erc20-token --public --source=. --remote=origin --push`,
    explanation: "Creates the remote repository on your GitHub account in 1 step, sets the upstream origin remote, and pushes the main branch immediately."
  },
  {
    title: "6B. Push via Standard Git & GitHub Web",
    command: `# 1. Go to https://github.com/new and create repository 'educational-erc20-token'
# 2. Run the following replacing <YOUR_GITHUB_USERNAME>:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/educational-erc20-token.git
git branch -M main
git push -u origin main`,
    explanation: "Standard HTTPS/SSH remote linkage for pushing local commits to a newly created GitHub repository."
  }
];
