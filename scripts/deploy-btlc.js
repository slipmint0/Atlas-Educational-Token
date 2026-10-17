const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialSupply = ethers.parseUnits("10000000000", 18); // 10,000,000,000 tokens

  console.log("Deploying BTLTC with the account:", deployer.address);

  const BTLTC = await ethers.getContractFactory("BTLTC");
  const token = await BTLTC.deploy("BTLTC", "BTLTC", initialSupply);

  await token.waitForDeployment();

  console.log("BTLTC deployed to:", await token.getAddress());
  console.log("Initial supply minted:", ethers.formatUnits(initialSupply, 18), "BTLTC");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
