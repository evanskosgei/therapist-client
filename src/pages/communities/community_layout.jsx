/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Search, Send, ChevronLeft, Info } from 'lucide-react';

const CommunityLayout = () => {
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-gray-100 h-screen p-8">
            <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-full">
                <div className="flex flex-col h-full">
                    <div className="bg-[#72BF78] text-white px-5 py-5 flex justify-between items-center">
                        <div className="font-bold text-2xl">Communities</div>
                        <div className="h-10 w-10 bg-white text-[#72BF78] rounded-full font-semibold flex items-center justify-center">
                            RA
                        </div>
                    </div>
                    <div className="flex flex-grow">
                        {(!selectedCommunity || !isMobile) && (
                            <div className={`w-full md:w-2/5 border-r border-gray-300 flex flex-col ${selectedCommunity && isMobile ? 'hidden' : ''}`}>
                                <div className="p-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#72BF78] focus:border-transparent"
                                        />
                                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                    </div>
                                </div>
                                <div className="overflow-y-auto flex-1">
                                    {['Mental Health', 'Marriage', 'MERN Stack'].map((name) => (
                                        <CommunityItem
                                            key={name}
                                            name={name}
                                            lastMessage={`Last message in ${name}`}
                                            active={selectedCommunity === name}
                                            onClick={() => setSelectedCommunity(name)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {(selectedCommunity || !isMobile) && (
                            <div className={`w-full md:w-3/5 flex flex-col ${!selectedCommunity && isMobile ? 'hidden' : ''}`}>
                                <div className="bg-white border-b border-gray-300 p-4 flex items-center">
                                    {isMobile && (
                                        <button onClick={() => setSelectedCommunity(null)} className="mr-4">
                                            <ChevronLeft size={24} />
                                        </button>
                                    )}
                                    <div className="flex-1 font-semibold">{selectedCommunity || 'Select a community'}</div>
                                    <button>
                                        <Info size={24} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <Message sender="You" content="Welcome to the group everyone!" type="sent" />
                                    <Message sender="John" content="Thanks for having us!" type="received" />
                                    <Message sender="Emma" content="Excited to be here!" type="received" />
                                    <Message sender="You" content="Let's get started with our first topic." type="sent" />
                                </div>
                                <div className="p-4 border-t border-gray-300">
                                    <div className="relative">
                                        <input
                                            className="w-full bg-gray-100 py-2 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#72BF78] focus:border-transparent"
                                            type="text"
                                            placeholder="Message..."
                                        />
                                        <button className="absolute right-2 top-2 text-[#72BF78] hover:text-[#5da863] transition-colors duration-300">
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

const CommunityItem = ({ name, lastMessage, active, onClick }) => (
    <div
        className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-300 ${active ? 'bg-gray-100' : ''}`}
        onClick={onClick}
    >
        <div className="w-12 h-12 bg-[#72BF78] shrink-0 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            {name.charAt(0)}
        </div>
        <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        </div>
    </div>
);

const Message = ({ sender, content, type }) => (
    <div className={`flex ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
        <div className={`py-2 px-3 rounded-2xl max-w-[70%] ${type === 'sent' ? 'bg-[#72BF78] text-white' : 'bg-gray-200 text-gray-800'}`}>
            {content}
        </div>
    </div>
);

export default CommunityLayout;
