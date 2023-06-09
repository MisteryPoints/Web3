import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window; 

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    
    const [connectedAccount, setConnectedAccount] = useState();
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try { 
            if(!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map(transaction => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransactions(structuredTransactions);
        } catch (error) { 
            console.log(error);

            throw new Error("No Ethereum Object.")
        }
    }

    const checkIfWalletIsConnected = async () => {
        try { 
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' }); 

            if(accounts.length > 0){
                setConnectedAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No account found.")
            }
        } catch (error) { 
            console.log(error);

            throw new Error("No Ethereum Object.")
        }
    }; 


    const checkIfTransactionsExist = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' }); 
            
            if(accounts.length > 0){
                const transactionContract = getEthereumContract();
                const transactionCount = await transactionContract.getTransactionCount();
    
                window.localStorage.setItem("transactionCount", transactionCount);
            } else {
                console.log("No account found.")
            }
            
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object.") 
        }
    }

    const connectWallet = async () => {
        try { 
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object.")
        }
    }

    const sendTransaction = async () => {
        try { 
            if(!ethereum) return alert("Please install metamask");
            //get data from the form...
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex, // 0.00001 ETH
                }]
            });
            console.log(transactionContract)
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) { 
            console.log(error);

            throw new Error("No Ethereum Object.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[transactions, connectedAccount]);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction, isLoading, transactions }}>
            { children }
        </TransactionContext.Provider>
    );
};