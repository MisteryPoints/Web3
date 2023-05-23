import React, { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';

const Transactions = () => {
  const { connectedAccount } = useContext(TransactionContext);

  return <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
    <div className='flex flex-col md:p-12 py-12 px-4'>
      {connectedAccount ? (
        <h3 className='text-white text-center text-3xl my-2'>Latest Transactions</h3>
      ): <h3 className='text-white text-center text-3xl my-2'>Connect your Account to see the Latest Transactions</h3>}
      {/* Latest Transactions */}
      {/* Connect Your Account to See Your Latest Transactions */}
    </div>
  </div>;
};

export default Transactions;
