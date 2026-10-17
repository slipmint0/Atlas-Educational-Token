// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BTLTC is ERC20, Ownable {
    error ZeroAmount();

    constructor(string memory name_, string memory symbol_, uint256 initialSupply_) 
        ERC20(name_, symbol_) 
        Ownable(msg.sender)
    {
        if (initialSupply_ == 0) revert ZeroAmount();
        _mint(msg.sender, initialSupply_);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        if (amount == 0) revert ZeroAmount();
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        if (amount == 0) revert ZeroAmount();
        _burn(msg.sender, amount);
    }
}
