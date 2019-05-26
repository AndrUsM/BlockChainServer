const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'concert apology lava better core click fringe address lava fossil swift april',
    'https://rinkeby.infura.io/v3/5404196193824bca8e8d2873892126bc'
)

const web3 = new Web3(provider);

const deploy = async (string) => {
    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: '0x' + bytecode,
            arguments: [string] || ['My String']
        })
        .send({ 
            from: accounts[0],
            gas: '1000000' 
        });
    console.log('Contract deployed to:', deployedContract.options.address);

    const Contract = await deployedContract.methods.getInstructor().call({
        from: accounts[0]
    })

    provider.engine.stop();
    return [accounts[0], deployedContract.options.address, Contract];
}
module.exports = deploy;
