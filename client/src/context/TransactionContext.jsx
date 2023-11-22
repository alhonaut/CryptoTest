import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { address, abi } from "../../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(address, abi, signer);
    console.log(transactionContract)

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransaction = async () => {
        try {
            if (!ethereum) {
                return alert("Please install MetaMask!");
            }

            const transactionContract = getContract();
            console.log(transactionContract, '!!!')
            const availableTransaction = await transactionContract.getAllTransactions();
            console.log(availableTransaction, "sdsds");

            const structuredTransactions = availableTransaction.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransactions(structuredTransactions);
        } catch (error) {
            console.error(error);

            throw new error("No Ethereum Wallet!");
        }
    }

    const IsWalletConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please install MetaMask!");
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setAccount(accounts[0]);

                getAllTransaction();
            } else {
                console.log("No accounts found.")
            }

            console.log(accounts);
        } catch (error) {
            console.error(error);

            throw new error("No Ethereum Wallet!");
        }

    }

    const IsTransactionExist = async () => {
        try {
            const transactionContract = getContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.error(error);

            throw new error("No Ethereum Wallet!");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please install MetaMask!");
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        } catch (error) {
            console.error(error);

            throw new error("No Ethereum Wallet!");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert("Please install MetaMask!");
            }

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: account,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setLoading(true);
            console.log(`Loading - ${transactionHash}`);
            await transactionHash.wait();
            setLoading(false);
            console.log(`Succes - ${transactionHash.address}`);

            const transactionCount = await transactionContract.getTransactionCount();
            console.log(transactionCount)
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.error(error);

            throw new error("No Ethereum Wallet!");
        }
    }

    useEffect(() => {
        IsWalletConnected();
        IsTransactionExist();
    }, [transactionCount]);


    return (
        <TransactionContext.Provider value={{
            transactionCount,
            connectWallet,
            transactions,
            account,
            isLoading,
            sendTransaction,
            handleChange,
            formData,
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

