/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { Star, Clock, MessageSquare, AlertTriangle, XCircle, AlertOctagon } from 'lucide-react';

const Check_out_session = () => {
    const { id } = useParams()
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
        <div className="bg-gray-50 min-h-full p-4 sm:p-8">
            {/* <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden"> */}
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

                    </div>

                    <div className="text-xs sm:text-sm text-gray-600 bg-gray-100 p-3 sm:p-4 rounded-lg">
                        <strong>ACTIVITY:</strong> {user.activitySummary}
                    </div>
                </div>
            </main>
            {/* </div> */}
        </div>
    )
};

export default Check_out_session