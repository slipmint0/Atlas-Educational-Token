import { TokenConfig } from '../types';

export function generateSolidityContract(config: TokenConfig): string {
  const imports: string[] = [
    'import "@openzeppelin/contracts/token/ERC20/ERC20.sol";'
  ];

  const inheritance: string[] = ['ERC20'];

  if (config.burnable) {
    imports.push('import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";');
    inheritance.push('ERC20Burnable');
  }

  if (config.pausable) {
    imports.push('import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";');
    inheritance.push('ERC20Pausable');
  }

  if (config.ownable) {
    imports.push('import "@openzeppelin/contracts/access/Ownable.sol";');
    inheritance.push('Ownable');
  }

  const constructorInheritance: string[] = [
    `ERC20("${config.name}", "${config.symbol}")`
  ];

  if (config.ownable) {
    constructorInheritance.push('Ownable(msg.sender)');
  }

  // Format the numerical literal with underscores for readability
  const formattedNumber = Number(config.initialSupply).toLocaleString('en-US').replace(/,/g, '_');

  return `// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

${imports.join('\n')}

/**
 * @title ${config.name} (${config.symbol})
 * @author Educational Web3 Guide
 * @notice Standard ERC-20 token implementation designed for testnet deployment
 *         on Ethereum Sepolia (Chain ID: 11155111) and Base Sepolia (Chain ID: 84532).
 * @dev Utilizing battle-tested OpenZeppelin v5.x contracts with strict overflow safety.
 *      Total initial supply minted directly to the contract deployer's wallet.
 */
contract ${config.symbol.replace(/[^a-zA-Z0-9]/g, '') || 'Educational'}Token is ${inheritance.join(', ')} {
    /**
     * @notice Emitted during deployment to record the initial supply allocation
     * @param deployer Address of the wallet that deployed and received initial supply
     * @param amount Total tokens in wei (accounting for 18 decimal places)
     */
    event InitialSupplyMinted(address indexed deployer, uint256 amount);

    /**
     * @notice Constructor sets token metadata and mints initial supply to deployer
     */
    constructor()
        ${constructorInheritance.join('\n        ')}
    {
        // Initial Supply Calculation:
        // ${config.initialSupply} tokens * 10^${config.decimals} (18 decimal standard precision)
        // Stored raw as 5 * 10^30 wei in uint256
        uint256 initialSupplyAmount = ${formattedNumber} * (10 ** decimals());

        _mint(msg.sender, initialSupplyAmount);
        emit InitialSupplyMinted(msg.sender, initialSupplyAmount);
    }
${config.pausable ? `
    /**
     * @notice Pauses all token transfers (Admin emergency mechanism)
     */
    function pause() public ${config.ownable ? 'onlyOwner ' : ''}{
        _pause();
    }

    /**
     * @notice Unpauses token transfers
     */
    function unpause() public ${config.ownable ? 'onlyOwner ' : ''}{
        _unpause();
    }

    // Hook required by OpenZeppelin v5 when combining ERC20 and ERC20Pausable
    function _update(address from, address to, uint256 value)
        internal
        virtual
        override(ERC20${config.pausable ? ', ERC20Pausable' : ''})
    {
        super._update(from, to, value);
    }
` : ''}}
`;
}
