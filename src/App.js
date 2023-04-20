import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);
  const [block, setBlock] = useState({});
  const [transactionReceipt, setTransactionReceipt] = useState({});

  useEffect(() => {
    async function getBlockNumber() {
      // console.log()
      const newBlockNumber = await alchemy.core.getBlockNumber();
      // console.log("blockNumber: ", blockNumber);
      const newBlock = await alchemy.core.getBlock(newBlockNumber);
      // setBlock(newBlock);
      // const transactions = await alchemy.core.getBlockWithTransactions(blockNumber);
      setTransactions(newBlock.transactions);
      // console.log("block: ", block.transactions);
      // const transactionReceipt = await alchemy.core.getTransactionReceipt(block.transactions[0]);
      // settra
      // console.log("Transaction: ", transactionReceipt);
      setBlockNumber(newBlockNumber);
    }

    getBlockNumber();
  }, []);

  const handleTransactionClick = async (transaction) => {
      const transactionReceipt = await alchemy.core.getTransactionReceipt(transaction);
      console.log(transactionReceipt);
      alert(`
      To: ${transactionReceipt.to}
      From: ${transactionReceipt.from}
      Block Number: ${transactionReceipt.blockNumber}
      `);
  }

  const getTransactions = () => {
    console.log(transactions);
    return transactions.map(transaction => {
      return <div onClick={() => handleTransactionClick(transaction)}>
        {transaction}
      </div>
    });
  }

  return <div className="App">
    Block Number: {blockNumber}
    <div>
      {getTransactions()}
    </div>
  </div>;
}

export default App;
