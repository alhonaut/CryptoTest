import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../../utils/shortenAddress";



const TransactionCard = ({ addressTo, timestamp, message, keyword, amount }) => {
    const { account } = useContext(TransactionContext);
    return (
        <div className="bg-[#181918] m-4 flex flex-1 
                    2xl:min-w-[450px] 
                    2xl:max-w-[500px]
                    sm:min-w-[270px]
                    sm:max-w-[300px]
                    flex-col p-3 rounded-xl hover:shadow-2xl"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://goerli.etherscan.io/address/${account}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">
                            From: {shortenAddress(account)}
                        </p>
                        <p className="text-white text-base">
                            To: {shortenAddress(addressTo)}
                        </p>
                        <p className="text-white text-base">Amount: {amount} ETH</p>
                        {message && (
                            <>
                                <br />
                                <p className="text-white text-base">Message: {message}</p>
                            </>
                        )}
                    </a>
                </div>
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    )
}

const Transactions = () => {
    const { account, transactions } = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {!account ?
                    (<h3 className="text-white text-3xl text-center my-2">
                        Please Connect Wallet if you want to see Latest Transactions
                    </h3>)
                    :
                    (<h3 className="text-white text-3xl text-center my-2">
                        Latest Transactions
                    </h3>)
                }
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, index) => (
                        <TransactionCard key={index} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transactions