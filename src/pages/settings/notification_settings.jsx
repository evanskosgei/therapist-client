/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Bell, Mail, MessageSquare } from 'lucide-react';

const Notification_settings = () => {
    const [notifications, setNotifications] = useState({
        newQuestions: { email: true, sms: false },
        studentMessages: { email: true, sms: false },
        paymentUpdates: { email: true, sms: false },
    });

    const notificationTypes = [
        {
            id: 'newQuestions',
            title: 'New Questions',
            description: 'Get notified when new questions in your subjects are posted.',
            icon: Bell,
        },
        {
            id: 'studentMessages',
            title: 'Student Messages',
            description: 'Receive alerts when students send you direct messages.',
            icon: MessageSquare,
        },
        {
            id: 'paymentUpdates',
            title: 'Payment Updates',
            description: 'Stay informed about your earnings and payment processing.',
            icon: Mail,
        },
    ];

    const handleToggle = (typeId, method) => {
        setNotifications(prev => ({
            ...prev,
            [typeId]: {
                ...prev[typeId],
                [method]: !prev[typeId][method]
            }
        }));
    };
    return (
        <div className="bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            <form className="space-y-6">
                {notificationTypes.map((type) => (
                    <div key={type.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start mb-4">
                            <div className="flex-shrink-0 mr-4">
                                <type.icon className="w-6 h-6 text-[#72BF78]" />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-700">{type.title}</h2>
                                <p className="text-gray-600">{type.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                            <label htmlFor={`email-${type.id}`} className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id={`email-${type.id}`}
                                        className="sr-only"
                                        checked={notifications[type.id].email}
                                        onChange={() => handleToggle(type.id, 'email')}
                                    />
                                    <div className={`block w-14 h-8 rounded-full ${notifications[type.id].email ? 'bg-[#72BF78]' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${notifications[type.id].email ? 'transform translate-x-6' : ''}`}></div>
                                </div>
                                <div className="ml-3 text-gray-700 font-medium">Email</div>
                            </label>
                            <label htmlFor={`sms-${type.id}`} className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        id={`sms-${type.id}`}
                                        className="sr-only"
                                        checked={notifications[type.id].sms}
                                        onChange={() => handleToggle(type.id, 'sms')}
                                    />
                                    <div className={`block w-14 h-8 rounded-full ${notifications[type.id].sms ? 'bg-[#72BF78]' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${notifications[type.id].sms ? 'transform translate-x-6' : ''}`}></div>
                                </div>
                                <div className="ml-3 text-gray-700 font-medium">SMS</div>
                            </label>
                        </div>
                    </div>
                ))}

                <div className="flex justify-end">
                    <button type="submit" className="py-2 px-6 bg-[#72BF78] text-white rounded-lg hover:bg-[#5fa866] transition duration-300">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
};
export default Notification_settings;