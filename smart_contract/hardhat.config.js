// https://eth-mainnet.g.alchemy.com/v2/OG-9gpbPjfVsMnW8yBKk947pvIu7nkGi

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/0rMTaQnCm9JSEU2P2_8_njVCzZUE7i68",
      accounts: [
        "2d1ae4d6fd0b93a17b0180acd57c83f5efc0e6dec896b8e8a171a9935af3607f",
      ],
    },
  },
};
