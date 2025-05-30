import { useState } from 'react';
import Profile from './Profile';
import Fees from './Fees';
import Attendance from './Attendence';
import Course from './Course';
import Events from './Events';
import Welcome from './Welcome';

// Mock Profile component for demonstration


// Placeholder components for other sections






export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState('');

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'fees', label: 'Fees', icon: '💰' },
    { id: 'attendance', label: 'Attendance', icon: '📊' },
    { id: 'course', label: 'Course', icon: '📚' },
    { id: 'events', label: 'Events', icon: '📅' }
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'profile':
        return <Profile/>;
      case 'fees':
        return <Fees />;
      case 'attendance':
        return <Attendance />;
      case 'course':
        return <Course />;
      case 'events':
        return <Events />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-blue-100 text-sm mt-1">Manage your academic journey</p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <aside className="w-64 bg-black text-white-700 shadow-lg border-r border-gray-200">
          <nav className="p-4">
            <h2 className="text-sm font-semibold text-white-500 uppercase tracking-wide mb-4">
              Navigation
            </h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedMenu(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      selectedMenu === item.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Breadcrumb */}
            {selectedMenu && (
              <div className="mb-6">
                <nav className="text-sm text-gray-500">
                  <span>Dashboard</span>
                  <span className="mx-2">›</span>
                  <span className="text-gray-800 font-medium">
                    {menuItems.find(item => item.id === selectedMenu)?.label}
                  </span>
                </nav>
              </div>
            )}
            
            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}