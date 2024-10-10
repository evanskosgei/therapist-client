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
        <div className="p-8 bg-gray-100 h-full overflow-y-hidden">
            <main className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center mb-8">
                        <div className="w-20 h-20 bg-[#72BF78] rounded-full shrink-0 flex items-center justify-center text-white text-2xl font-bold mr-6">
                            {user.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-1">{user.username}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
                        <Stat icon={Clock} label="Completed Sessions" value={`${user.successRate}`} />
                        <Stat icon={MessageSquare} label="Up-comming Sessions" value={`${user.replyRate}`} />
                        <Stat icon={Clock} label="Completed Sessions" value={`${user.statusUpdateRate}`} />
                        <Stat icon={AlertOctagon} label="Cancelled Sessions" value={user.inProgressCount} />
                    </div>

                    <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded-lg">
                        <strong>ACTIVITY:</strong> {user.activitySummary}
                    </div>
                </div>

            </main>
            <div className="max-w-6xl mx-auto">
                <div className="bg-white py-2 px-3 rounded-lg shadow-md">
                    <div className="flex-1 mt-4 p-8">
                        <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
                        <div className="relative px-4 overflow-y-auto">
                            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                            {activity.map((act, index) => (
                                <div key={index} className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-[#72BF78] rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">{act.description}</p>
                                        <p className="flex gap-2 text-xs text-gray-500">
                                            {/* <Clock className='h-3 w-3 text-gray-400 mr-1'/> */}
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
    <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            <Icon className="w-5 h-5 mr-2 text-[#72BF78]" />
            <div className="font-semibold text-lg">{value}</div>
        </div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

export default Dashboard