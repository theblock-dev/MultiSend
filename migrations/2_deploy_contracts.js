const MultiSend = artifacts.require('MultiSend.sol');

module.exports = async function(deployer){
    await deployer.deploy(MultiSend);
}