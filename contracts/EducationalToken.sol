// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Educational Token (EDU)
 * @author Educational Web3 Guide
 * @notice Standard ERC-20 token implementation designed for testnet deployment
 *         on Ethereum Sepolia (Chain ID: 11155111) and Base Sepolia (Chain ID: 84532).
 * @dev Utilizing battle-tested OpenZeppelin v5.x contracts with strict overflow safety.
 *      Total initial supply minted directly to the contract deployer's wallet.
 */
contract EducationalToken is ERC20, ERC20Burnable, Ownable {
    /**
     * @notice Emitted during deployment to record the initial supply allocation
     * @param deployer Address of the wallet that deployed and received initial supply
     * @param amount Total tokens in wei (accounting for 18 decimal places)
     */
    event InitialSupplyMinted(address indexed deployer, uint256 amount);
    event TaxRateUpdated(uint256 oldRate, uint256 newRate);
    event TaxRecipientUpdated(address oldRecipient, address newRecipient);

    /// @notice Basis-point tax rate on transfers (e.g. 250 = 2.5%). Max 1000 (10%).
    uint256 public taxRateBps;
    /// @notice Address that receives collected transfer tax.
    address public taxRecipient;

    /**
     * @notice Constructor sets token metadata and mints initial supply to deployer
     * @param _taxRateBps Tax rate in basis points (max 1000 = 10%)
     * @param _taxRecipient Address to receive collected transfer taxes
     */
    constructor(uint256 _taxRateBps, address _taxRecipient)
        ERC20("Educational Token", "EDU")
        Ownable(msg.sender)
    {
        require(_taxRateBps <= 1000, "Tax rate cannot exceed 10%");
        require(_taxRecipient != address(0), "Tax recipient cannot be zero address");
        taxRateBps = _taxRateBps;
        taxRecipient = _taxRecipient;

        // Initial Supply Calculation:
        // 5000000000000000 tokens * 10^18 (18 decimal standard precision)
        // Stored raw as 5 * 10^33 wei in uint256
        uint256 initialSupplyAmount = 5_000_000_000_000_000 * (10 ** decimals());

        _mint(msg.sender, initialSupplyAmount);
        emit InitialSupplyMinted(msg.sender, initialSupplyAmount);
    }

    /**
     * @notice Mints new tokens to a specified address. Only callable by the contract owner.
     * @param to Address that will receive the newly minted tokens
     * @param amount Number of tokens to mint (in wei, accounting for decimals)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Updates the transfer tax rate. Only callable by the contract owner.
     * @param _newRateBps New tax rate in basis points (max 1000 = 10%)
     */
    function setTaxRate(uint256 _newRateBps) external onlyOwner {
        require(_newRateBps <= 1000, "Tax rate cannot exceed 10%");
        emit TaxRateUpdated(taxRateBps, _newRateBps);
        taxRateBps = _newRateBps;
    }

    /**
     * @notice Updates the tax recipient address. Only callable by the contract owner.
     * @param _newRecipient New address to receive collected transfer taxes
     */
    function setTaxRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Tax recipient cannot be zero address");
        emit TaxRecipientUpdated(taxRecipient, _newRecipient);
        taxRecipient = _newRecipient;
    }

    /**
     * @dev Internal transfer override that applies a basis-point tax.
     *      The tax is deducted from the sender and sent to `taxRecipient`.
     *      Minting and burning are unaffected (they use _mint/_burn directly).
     */
    function _update(address from, address to, uint256 amount) internal override {
        if (from != address(0) && to != address(0) && taxRateBps > 0) {
            uint256 taxAmount = (amount * taxRateBps) / 10_000;
            if (taxAmount > 0) {
                super._update(from, taxRecipient, taxAmount);
                amount -= taxAmount;
            }
        }
        super._update(from, to, amount);
    }
}