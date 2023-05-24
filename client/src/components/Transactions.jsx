import React, { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';
import { shortenAddress } from '../utils/shortenAddress'

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => (
   <div className='bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl transition-all duration-150'>
      <div className='flex flex-col items-center w-full mt-3'>
        <div className='flex justify-between w-full mb-6 p-2'>
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target='_blank' rel='noopener noreferrer'>
            <p className='text-white text-base'>From: {shortenAddress(addressFrom)}</p>
          </a> 
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target='_blank' rel='noopener noreferrer'>
            <p className='text-white text-base'>To: {shortenAddress(addressTo)}</p>
          </a>
        </div>
          <p className='text-white text-base select-none'>Amount: {amount} ETH</p>
      </div>
   </div>
);

const Transactions = () => {
  const { connectedAccount } = useContext(TransactionContext);

  return <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
    <div className='flex flex-col md:p-12 py-12 px-4'>
      {connectedAccount ? (
        <h3 className='text-white text-center text-3xl my-2'>Latest Transactions</h3>
      ): <h3 className='text-white text-center text-3xl my-2'>Connect your Account to see the Latest Transactions</h3>}
      <div className='flex flex-wrap justify-center items-center mt-10 '>
        {dummyData.reverse().map(( transaction, i ) => (
          <TransactionCard key={i} {...transaction} /> 
        ) )}
      </div>
      {/* Connect Your Account to See Your Latest Transactions */}
    </div>
  </div>;
};

export default Transactions;
