import { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, Timer, Calendar } from "lucide-react";

export default function PunchInOut() {
    const [punchIn, setPunchIn] = useState(null);
    const [punchOut, setPunchOut] = useState(null);
    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isActive, setIsActive] = useState(false);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePunchIn = () => {
        const now = new Date();
        setPunchIn(now);
        setPunchOut(null);
        setDuration(null);
        setIsActive(true);
    };

    const handlePunchOut = () => {
        const logoutTime = new Date();
        setPunchOut(logoutTime);
        setIsActive(false);

        if (punchIn) {
            const diff = logoutTime - punchIn;
            const totalSeconds = Math.floor(diff / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
    };

    const formatTime = (date) => {
        return date ? date.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        }) : '';
    };

    const formatDate = (date) => {
        return date ? date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) : '';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Time Tracker</h1>
                    <p className="text-gray-600">Track your work hours with precision</p>
                </div>

                {/* Current Time Display */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
                    <div className="flex items-center justify-center space-x-4">
                        <Clock className="w-8 h-8 text-indigo-600" />
                        <div className="text-center">
                            <div className="text-3xl font-mono font-bold text-gray-800">
                                {formatTime(currentTime)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                {formatDate(currentTime)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Punch Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/30">
                    {/* Status Indicator */}
                    <div className="flex items-center justify-center mb-6">
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                            isActive 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span>{isActive ? 'Currently Working' : 'Not Working'}</span>
                        </div>
                    </div>

                    {/* Punch Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <button
                            onClick={handlePunchIn}
                            disabled={isActive}
                            className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                                isActive
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                            }`}
                        >
                            <LogIn className="w-6 h-6" />
                            <span>Punch In</span>
                        </button>

                        <button
                            onClick={handlePunchOut}
                            disabled={!isActive}
                            className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                                !isActive
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl'
                            }`}
                        >
                            <LogOut className="w-6 h-6" />
                            <span>Punch Out</span>
                        </button>
                    </div>

                    {/* Time Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Punch In Time */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <LogIn className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800">Punch In</h3>
                            </div>
                            {punchIn ? (
                                <div>
                                    <div className="text-2xl font-bold text-green-700 mb-1">
                                        {formatTime(punchIn)}
                                    </div>
                                    <div className="text-sm text-green-600">
                                        {formatDate(punchIn)}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">Not punched in yet</div>
                            )}
                        </div>

                        {/* Punch Out Time */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <LogOut className="w-5 h-5 text-red-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800">Punch Out</h3>
                            </div>
                            {punchOut ? (
                                <div>
                                    <div className="text-2xl font-bold text-red-700 mb-1">
                                        {formatTime(punchOut)}
                                    </div>
                                    <div className="text-sm text-red-600">
                                        {formatDate(punchOut)}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">Not punched out yet</div>
                            )}
                        </div>

                        {/* Duration */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Timer className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800">Duration</h3>
                            </div>
                            {duration ? (
                                <div>
                                    <div className="text-2xl font-bold text-blue-700 mb-1 font-mono">
                                        {duration}
                                    </div>
                                    <div className="text-sm text-blue-600">
                                        Hours:Minutes:Seconds
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">
                                    {isActive ? 'Working...' : 'No duration yet'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Card */}
                {(punchIn || punchOut || duration) && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/30">
                        <div className="flex items-center space-x-3 mb-4">
                            <Calendar className="w-6 h-6 text-purple-600" />
                            <h3 className="text-lg font-semibold text-gray-800">Today's Summary</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-sm text-gray-600">Started</div>
                                <div className="font-semibold text-gray-800">
                                    {punchIn ? formatTime(punchIn) : '--:--'}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Ended</div>
                                <div className="font-semibold text-gray-800">
                                    {punchOut ? formatTime(punchOut) : '--:--'}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Total Time</div>
                                <div className="font-semibold text-gray-800 font-mono">
                                    {duration || '--:--:--'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}