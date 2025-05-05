import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { Plus, Clock, Bell, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Trackers() {
  // Sample trackers data
  const sampleTrackers = [
    {
      id: '1',
      title: 'Water Plants',
      description: 'Keep your plants healthy and hydrated',
      frequency: 'Every 3 days',
      nextDue: '2025-05-07',
      hasReminder: true,
      color: 'amber-600'
    },
    {
      id: '2',
      title: 'Clean Bathroom',
      description: 'Maintain a clean and hygienic bathroom',
      frequency: 'Weekly',
      nextDue: '2025-05-11',
      hasReminder: true,
      color: 'orange-500'
    },
    {
      id: '3',
      title: 'Change Bedsheets',
      description: 'Fresh sheets for better sleep quality',
      frequency: 'Every 2 weeks',
      nextDue: '2025-05-18',
      hasReminder: false,
      color: 'teal-500'
    }
  ];

  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    // Get day of week (e.g., "Mon", "Tue")
    const weekday = date.toLocaleDateString('en-IE', { weekday: 'short' });
    
    // Get month (e.g., "May")
    const month = date.toLocaleDateString('en-IE', { month: 'short' });
    
    // Get day number
    const day = date.getDate().toString();
    
    // Current month
    const currentMonth = new Date().getMonth();
    const dateMonth = date.getMonth();
    
    // If date is in current month, show weekday + day
    if (currentMonth === dateMonth) {
      return `${weekday} ${day}`;
    } else {
      // If date is in different month, show day + month
      return `${day} ${month}`;
    }
  };

  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="My Trackers" />
      
      <div className="flex-1 px-4 pt-4 pb-6">
        {/* Add new tracker button */}
        <div className="flex justify-end mb-6">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <Plus size={18} />
            New Tracker
          </button>
        </div>
        
        {/* Trackers grid */}
        <div className="grid grid-cols-1 gap-4">
          {sampleTrackers.map((tracker) => (
            <Link key={tracker.id} href={`/trackers/${tracker.id}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:translate-y-[-1px] transition-all overflow-hidden cursor-pointer">
                <div className="flex items-stretch">
                  {/* Left color bar */}
                  <div className={`w-2 bg-${tracker.color}`}></div>
                  
                  {/* Content */}
                  <div className="p-4 flex-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-medium text-lg">{tracker.title}</h2>
                        {tracker.hasReminder && (
                          <Bell size={16} className={`text-${tracker.color}`} />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{tracker.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={14} />
                        <span>{tracker.frequency}</span>
                      </div>
                      
                      <div className={`flex items-center gap-1 text-${tracker.color} text-sm font-medium bg-${tracker.color}/10 px-3 py-1 rounded-md`}>
                        <Calendar size={14} />
                        <span>{formatDate(tracker.nextDue)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right icon */}
                  <div className="flex items-center pr-4">
                    <div className={`bg-${tracker.color} h-8 w-8 rounded-md flex items-center justify-center`}>
                      <ChevronRight className="text-white h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Navbar />
    </main>
  );
}
