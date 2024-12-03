/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Calendar, Plus, Ban, LoaderCircle } from 'lucide-react';
import { Error } from '../../components/toasts';
import EndPoints from '../../Api/endPoints';

const Session = () => {
    const [activeTab, setActiveTab] = useState('Active');
    const tabs = ['Active', 'Completed', 'Cancelled'];
    const [loading, setLoading] = useState(false);

    const [activeSessions, setActiveSessions] = useState([]);
    const [completedSessions, setCompletedSessions] = useState([]);
    const [cancelledSessions, setCancelledSessions] = useState([]);

    const fetch_active_sessions = async () => {
        try {
            setLoading(true)
            const { data } = await EndPoints.booking.fetch_active_session_bookings()
            if (data.status === 200) {
                setActiveSessions(data.sessions)
            }
        } catch (error) {
            Error(error?.response?.data?.error || error?.message || error?.response?.data?.message || "An Error Occurred!")
        } finally {
            setLoading(false)
        }
    }
    const fetch_completed_sessions = async () => {
        try {
            setLoading(true)
            const { data } = await EndPoints.booking.fetch_completed_session_bookings()
            if (data.status === 200) {
                setCompletedSessions(data.sessions)
            }
        } catch (error) {
            Error(error?.response?.data?.error || error?.message || error?.response?.data?.message || "An Error Occurred!")
        } finally {
            setLoading(false)
        }
    }
    const fetch_cancelled_sessions = async () => {
        try {
            setLoading(true)
            const { data } = await EndPoints.booking.fetch_cancelled_session_bookings()
            if (data.status === 200) {
                setCancelledSessions(data.sessions)
            }
        } catch (error) {
            Error(error?.response?.data?.error || error?.message || error?.response?.data?.message || "An Error Occurred!")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetch_active_sessions()
        fetch_completed_sessions()
        fetch_cancelled_sessions()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <LoaderCircle className="animate-spin h-10 w-10" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#72BF78] to-[#5da863] p-6">
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
                        <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">Your Sessions</h1>
                        <Link to="/home/book-session" className='flex items-center py-2 px-4 bg-white text-[#72BF78] rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-md'>
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
                {activeTab === 'Active' && (
                    <>
                        {activeSessions.length > 0 ? (
                            activeSessions.map((session, index) => (
                                <div key={session.id || index} className="p-6">
                                    <SessionCard
                                        title={session.Session_topic || "Default Title"}
                                        description={session.Session_description || "Default Description"}
                                        date={session.session_date}
                                        starttime={new Date(`1970-01-01T${session.session_start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        endtime={new Date(`1970-01-01T${session.session_end_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        link_to={`/home/session/${session.session_code}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <NoSessionsMessage type="Active" />
                        )}
                    </>
                )}
                {activeTab === 'Completed' && (
                    <>
                        {completedSessions.length > 0 ? (
                            completedSessions.map((session, index) => (
                                <div key={session.id || index} className="p-6">
                                    <SessionCard
                                        title={session.Session_topic || "Default Title"}
                                        description={session.Session_description || "Default Description"}
                                        date={session.session_date}
                                        starttime={new Date(`1970-01-01T${session.session_start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        endtime={new Date(`1970-01-01T${session.session_end_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        link_to={`/home/session/${session.session_code}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <NoSessionsMessage type="Completed" />
                        )}
                    </>
                )}
                {activeTab === 'Cancelled' && (
                    <>
                        {cancelledSessions.length > 0 ? (
                            cancelledSessions.map((session, index) => (
                                <div key={session.id || index} className="p-6">
                                    <SessionCard
                                        title={session.Session_topic || "Default Title"}
                                        description={session.Session_description || "Default Description"}
                                        date={session.session_date}
                                        starttime={new Date(`1970-01-01T${session.session_start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        endtime={new Date(`1970-01-01T${session.session_end_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        link_to={`/home/session/${session.session_code}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <NoSessionsMessage type="Cancelled" />
                        )}
                    </>
                )}


            </main>
        </div>
    );
};

const NoSessionsMessage = ({ type }) => (
    <div className="flex justify-center items-center p-2">
        <div className="text-center w-full">
            <Ban className="h-20 w-20 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No {type} Sessions
            </h2>
            <p className="text-gray-500">
                You have no {type.toLowerCase()} sessions at the moment.
            </p>
        </div>
    </div>
);

const SessionCard = ({ title, description, starttime, endtime, date, link_to }) => (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex space-x-4 text-sm text-gray-500 mb-2 sm:mb-0">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-[#72BF78]" />
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#72BF78]" />
                        <span>{starttime}</span> to <span>{endtime}</span>
                    </div>
                </div>
                <Link to={link_to} target='_blank' className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#72BF78] rounded-lg hover:bg-[#5da863] transition-colors duration-300 shadow-md hover:shadow-lg">
                    Join
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    </div>
);


export default Session;