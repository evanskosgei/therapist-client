/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Calendar, Plus } from 'lucide-react';
import { Error } from '../../components/toasts';
import EndPoints from '../../Api/endPoints';

const Session = () => {
    const [activeTab, setActiveTab] = useState('Completed');
    const tabs = ['Active', 'Completed', 'Cancelled'];
    const [activeSessions, setActiveSessions] = useState([]);
    const fetch_active_sessions = async () => {
        try {
            const { data } = await EndPoints.booking.fetch_active_session_bookings()
            if (data.status === 200) {
                setActiveSessions(data.sessions)
            }
        } catch (error) {
            Error(error?.response?.data?.error || error?.message || error?.response?.data?.message || "An Error Occurred!")
        }
    }
    useEffect(() => {
        fetch_active_sessions()
    }, [])


    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#72BF78] to-[#5da863] p-6">
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
                        <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">Your Sessions</h1>
                        <Link to="/home/book-session" target='_blank' className='flex items-center py-2 px-4 bg-white text-[#72BF78] rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-md'>
                            <Plus className="w-4 h-4 mr-2" />
                            <span>Book Session</span>
                        </Link>
                    </div>
                    <nav className="flex space-x-1 bg-white/20 p-1 rounded-lg">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                                    ${activeTab === tab
                                        ? 'bg-white text-[#72BF78] shadow-md'
                                        : 'text-white hover:bg-white/30'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                {activeSessions.map((session, index) => (
                    <div key={session.id || index} className="p-6">
                        <SessionCard
                            title={session.Session_topic || "Default Title"}
                            description={session.Session_description || "Default Description"}
                            date={new Date(session.session_date).toDateString("en-US")}
                            starttime={new Date(`1970-01-01T${session.session_start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
                            endtime={new Date(`1970-01-01T${session.session_end_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            link_to={`/session/${session.session_code}`}
                        />
                    </div>
                ))}

            </main>
        </div>
    );
};

const SessionCard = ({ title, description, starttime, endtime, date, link_to }) => (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex space-x-4 text-sm text-gray-500 mb-2 sm:mb-0">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-[#72BF78]" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#72BF78]" />
                        <span>{starttime}</span> - <span>{endtime}</span>
                    </div>
                </div>
                <a href={link_to} target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#72BF78] rounded-lg hover:bg-[#5da863] transition-colors duration-300 shadow-md hover:shadow-lg">
                    Join
                    <ChevronRight className="w-4 h-4 ml-1" />
                </a>
            </div>
        </div>
    </div>
);


export default Session;