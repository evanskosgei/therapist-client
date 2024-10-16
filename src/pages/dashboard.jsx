/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Star, Clock, MessageSquare, AlertTriangle, XCircle, AlertOctagon } from 'lucide-react';
import { activity } from '../utils/activity';

const Dashboard = () => {
    const [currentDiv, setCurrentDiv] = useState('home')
    const user = {
        username: 'staroneso123',
        avatar: '/path/to/avatar.jpg',
        reviewCount: 3010,
        location: "UK",
        successRate: 90,
        replyRate: 89,
        statusUpdateRate: 91,
        inProgressCount: 0,
        warningCount: 0,
        suspensionCount: 0,
        overdueCount: 6,
        activitySummary: '9 Sessions in last 14 days'
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen overflow-y-auto">
            <main className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#72BF78] rounded-full shrink-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-0 sm:mr-6">
                            {user.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{user.username}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <Stat icon={Clock} label="Completed Sessions" value={`${user.successRate}`} />
                        <Stat icon={MessageSquare} label="Up-coming Sessions" value={`${user.replyRate}`} />
                        <Stat icon={Clock} label="Completed Sessions" value={`${user.statusUpdateRate}`} />
                        <Stat icon={AlertOctagon} label="Cancelled Sessions" value={user.inProgressCount} />
                    </div>

                    <div className="text-xs sm:text-sm text-gray-600 bg-gray-100 p-3 sm:p-4 rounded-lg">
                        <strong>ACTIVITY:</strong> {user.activitySummary}
                    </div>
                </div>
            </main>
            <div className="max-w-6xl mx-auto">
                <div className="bg-white py-2 px-3 rounded-lg shadow-md">
                    <div className="flex-1 mt-4 p-4 sm:p-6 md:p-8">
                        <h4 className="text-lg sm:text-xl text-gray-900 font-bold mb-4">Activity log</h4>
                        <div className="relative px-2 sm:px-4 overflow-y-auto max-h-96 sm:max-h-[32rem]">
                            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                            {activity.map((act, index) => (
                                <div key={index} className="flex items-center w-full my-4 sm:my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#72BF78] rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-xs sm:text-sm">{act.description}</p>
                                        <p className="flex gap-1 sm:gap-2 text-xs text-gray-500 mt-1">
                                            <span>{new Date(act.timestamp).toLocaleDateString()}</span>
                                            <span>{new Date(act.timestamp).toLocaleTimeString()}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Stat = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
        <div className="flex items-center mb-1 sm:mb-2">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#72BF78]" />
            <div className="font-semibold text-base sm:text-lg">{value}</div>
        </div>
        <div className="text-xs sm:text-sm text-gray-600">{label}</div>
    </div>
);

export default Dashboard;