const SHA256 = require('crypto-js/sha256')

class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock(){
    return new Block(0, "01/01/2015", "This is the genesis block", "0")
  }

  getLatestBlock(){
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i=1; i<this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }

    return true
  }
}

let nugCoin = new Blockchain();
nugCoin.addBlock(new Block(1, "02/02/2016", { amount: 1000000}));
nugCoin.addBlock(new Block(2, "02/04/2016", { amount: 5000000}));
nugCoin.addBlock(new Block(3, "02/06/2016", { amount: 7000000}));

console.log('Is blockchain valid? ' + nugCoin.isChainValid());

nugCoin.chain[1].data = { amount: 5000 };
nugCoin.chain[1].hash = nugCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + nugCoin.isChainValid());


// console.log(JSON.stringify(nugCoin, null, 4));
