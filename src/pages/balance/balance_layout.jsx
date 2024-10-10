/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { DollarSign, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BalanceLayout = () => {
    const [currentDiv, setCurrentDiv] = useState('transactions');
    const accentColor = '#72BF78';

    return (
        <div className="h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Balance Summary */}
                    <div className="lg:col-span-1 p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Balance Summary</h2>
                        <BalanceItem title="Total Balance" amount={17.45} textColor={accentColor} />
                        <BalanceItem title="Pending Balance" amount={10.45} />
                        <BalanceItem title="Outstanding Fine" amount={7.00} textColor="text-red-500" />
                        <hr className="my-4 border-gray-200" />
                        <BalanceItem title="Available Balance" amount={7.00} textColor={accentColor} isLarge />
                    </div>

                    {/* Details and Withdraw */}
                    <div className="lg:col-span-2 flex flex-col justify-between">
                        <div className="space-y-4">
                            <InfoCard
                                title="Total Balance"
                                description="The amount of money currently in your account, earned by answering questions, selling documents, receiving tips or referring friends."
                                icon={<DollarSign className="text-green-600" />}
                                bgColor="bg-green-50"
                                textColor="text-green-700"
                            />
                            <InfoCard
                                title="Pending Balance"
                                description="Deposited money from active questions. Released to balance when the student reviews the answer, or 72 hours after the time limit expires if the student does not review."
                                icon={<AlertCircle className="text-blue-600" />}
                                bgColor="bg-blue-50"
                                textColor="text-blue-700"
                            />
                            <InfoCard
                                title="Outstanding Fine"
                                description="Fine(s) you have received. This sum will be deducted the next time you withdraw money from your balance."
                                icon={<AlertCircle className="text-red-600" />}
                                bgColor="bg-red-50"
                                textColor="text-red-700"
                            />
                            <InfoCard
                                title="Available Balance"
                                description="The amount you can withdraw right now."
                                icon={<DollarSign className="text-green-600" />}
                                bgColor="bg-green-50"
                                textColor="text-green-700"
                            />
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                className="flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out"
                                style={{ backgroundColor: accentColor }}
                            >
                                Withdraw <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex gap-6 border-b px-8 pb-4'>
                    <Link
                        className={`text-lg font-medium transition-colors duration-200 ${currentDiv === 'transactions'
                                ? `text-${accentColor} border-b-2`
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setCurrentDiv('transactions')}
                        to="#"
                    >
                        Transactions
                    </Link>
                    <Link
                        className={`text-lg font-medium transition-colors duration-200 ${currentDiv === 'refunds'
                                ? `text-${accentColor} border-b-2`
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setCurrentDiv('refunds')}
                        to="#"
                    >
                        Refunds
                    </Link>
                </div>
                <div className="p-8">
                    {currentDiv === 'transactions' && (
                        <div className="text-center text-gray-500 py-8">No current transactions</div>
                    )}
                    {currentDiv === 'refunds' && (
                        <div className="text-center text-gray-500 py-8">No current refunds</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const BalanceItem = ({ title, amount, textColor = "text-gray-700", isLarge = false }) => (
    <div className={`mb-4 ${isLarge ? 'mt-6' : ''}`}>
        <h3 className={`text-sm font-medium text-gray-500 ${isLarge ? 'text-base' : ''}`}>{title}</h3>
        <p className={`text-2xl font-bold ${textColor} ${isLarge ? 'text-3xl' : ''}`}>
            ${amount.toFixed(2)}
        </p>
    </div>
);

const InfoCard = ({ title, description, icon, bgColor, textColor }) => (
    <div className={`p-4 rounded-lg ${bgColor}`}>
        <div className="flex items-center mb-2">
            {icon}
            <h3 className={`ml-2 font-semibold ${textColor}`}>{title}</h3>
        </div>
        <p className={`text-sm ${textColor}`}>{description}</p>
    </div>
);

export default BalanceLayout;