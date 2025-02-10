import { useState, useRef, useEffect } from 'react';

const CustomTimePicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const timePickerRef = useRef(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Calculate position on mount and window resize
    useEffect(() => {
        const calculatePosition = () => {
            if (!inputRef.current || !dropdownRef.current) return;

            const inputRect = inputRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - inputRect.bottom;
            const spaceAbove = inputRect.top;

            // If there's not enough space below and more space above, show dropdown above
            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }
        };

        window.addEventListener('resize', calculatePosition);
        if (isOpen) {
            calculatePosition();
        }

        return () => window.removeEventListener('resize', calculatePosition);
    }, [isOpen]);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Generate hours and minutes arrays
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
        <div className="space-y-2 relative" ref={timePickerRef}>
                       
            <input
                ref={inputRef}
                type="text"
                readOnly
                value={`${selectedHour}:${selectedMinute}`}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78] cursor-pointer"
            />

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`absolute ${
                        dropdownPosition === 'top' 
                            ? 'bottom-[calc(100%+0.5rem)]' 
                            : 'top-[calc(100%+0.5rem)]'
                    } left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-full`}
                    style={{
                        animation: `${dropdownPosition === 'top' ? 'slideDown' : 'slideUp'} 0.2s ease-out`
                    }}
                >
                    <div className="flex p-2">
                        {/* Hours Column */}
                        <div className="w-1/2 h-48 overflow-y-auto scrollbar-thin">
                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    onClick={() => setSelectedHour(hour)}
                                    className={`p-2 text-center cursor-pointer hover:bg-gray-100 rounded transition-colors ${
                                        selectedHour === hour ? 'bg-[#72BF78] text-white' : ''
                                    }`}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>

                        {/* Separator */}
                        <div className="mx-2 text-2xl flex items-center text-gray-400">:</div>

                        {/* Minutes Column */}
                        <div className="w-1/2 h-48 overflow-y-auto scrollbar-thin">
                            {minutes.map((minute) => (
                                <div
                                    key={minute}
                                    onClick={() => setSelectedMinute(minute)}
                                    className={`p-2 text-center cursor-pointer hover:bg-gray-100 rounded transition-colors ${
                                        selectedMinute === minute ? 'bg-[#72BF78] text-white' : ''
                                    }`}
                                >
                                    {minute}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomTimePicker;