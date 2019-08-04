const {Blockchain, Transaction} = require('./blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('fbfea9027f990ecde1a8af21541a8a196177f5ea1c0f2784d6db040e14a866ed');
const myWalletAddress = myKey.getPublic('hex');

let nugCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
nugCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
nugCoin.minePendingTranscations(myWalletAddress);

console.log('\n Balance of Nug is', nugCoin.getBalanceOfAddress(myWalletAddress))
