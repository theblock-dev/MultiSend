const { expectRevert } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const MultiSend = artifacts.require('MultiSend.sol');

contract('MultiSend', (accounts)=>{
    let contractInstance = undefined;
    let address = undefined;
    
    beforeEach(async()=>{
        // MultiSend.deployed()
        // .then((instance)=>{
        //     contractInstance = instance;
        //     address=contractInstance;            
        // })
        // .catch(e=>{
        //     console.log(e);
        // })
        contractInstance = await MultiSend.deployed();
    })

    it('should receive ether using the receive function', async()=>{
        await web3.eth.sendTransaction({
            from:accounts[0],
            to:contractInstance.address,
            value:web3.utils.toWei('1','ether')
        });

        const balance = await web3.eth.getBalance(contractInstance.address);
        assert(balance === web3.utils.toWei('1','ether'));
    })

    it('should correctly send to multi parties', async()=>{
        const addresses = [accounts[1],accounts[2],accounts[3]];
        await contractInstance.send(
            addresses,
            web3.utils.toWei('1000','wei'),
            {from:accounts[0]}
        );

        const bal1 = await web3.eth.getBalance(accounts[2]);        
        console.log(bal1);
        assert(bal1 === web3.utils.toWei('100000000000000001000','wei'));
    })

    it('shoudl throw error if msg.sender is not the owner', async()=>{
        const addresses = [accounts[1],accounts[2],accounts[3]];
        await expectRevert(
            contractInstance.send(addresses,web3.utils.toWei('1000','wei'),{from:accounts[5]}),
            'only owner can send'
        );
    })

    
})