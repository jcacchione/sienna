"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { Calendar, Clock, Bell, CheckCircle, AlertCircle, Edit, Trash2, ArrowLeft, MoreVertical } from 'lucide-react';
import Link from 'next/link';

type Tracker = {
  id: string;
  title: string;
  description: string;
  frequency: string;
  nextDue: string;
  hasReminder: boolean;
  color: string;
  history?: {
    date: string;
    completed: boolean;
  }[];
};

export default function TrackerDetail() {
  const params = useParams();
  const id = params.id as string;
  
  // Sample trackers data - in a real app, this would be fetched from an API
  const trackers: Record<string, Tracker> = {
    '1': {
      id: '1',
      title: 'Water Plants',
      description: 'Keep your plants healthy and hydrated',
      frequency: 'Every 3 days',
      nextDue: '2025-05-07',
      hasReminder: true,
      color: 'amber-600',
      history: [
        { date: '2025-05-04', completed: true },
        { date: '2025-05-01', completed: true },
        { date: '2025-04-28', completed: true },
        { date: '2025-04-25', completed: false },
        { date: '2025-04-22', completed: true }
      ]
    },
    '2': {
      id: '2',
      title: 'Clean Bathroom',
      description: 'Maintain a clean and hygienic bathroom',
      frequency: 'Weekly',
      nextDue: '2025-05-11',
      hasReminder: true,
      color: 'orange-500',
      history: [
        { date: '2025-05-04', completed: true },
        { date: '2025-04-27', completed: true },
        { date: '2025-04-20', completed: false },
        { date: '2025-04-13', completed: true }
      ]
    },
    '3': {
      id: '3',
      title: 'Change Bedsheets',
      description: 'Fresh sheets for better sleep quality',
      frequency: 'Every 2 weeks',
      nextDue: '2025-05-18',
      hasReminder: false,
      color: 'teal-500',
      history: [
        { date: '2025-05-04', completed: true },
        { date: '2025-04-20', completed: true },
        { date: '2025-04-06', completed: false },
        { date: '2025-03-23', completed: true }
      ]
    }
  };
  
  const tracker = trackers[id];
  const [showOptions, setShowOptions] = useState(false);
  
  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short'
    };
    return new Date(dateString).toLocaleDateString('en-IE', options);
  };
  
  if (!tracker) {
    return (
      <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
        <Header title="Tracker Not Found" />
        <div className="flex-1 px-4 pt-4 pb-6 flex flex-col items-center justify-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tracker Not Found</h2>
          <p className="text-gray-500 mb-6 text-center">The tracker you're looking for doesn't exist or has been removed.</p>
          <Link href="/trackers" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
            Back to Trackers
          </Link>
        </div>
        <Navbar />
      </main>
    );
  }
  
  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="Tracker Details" />
      
      <div className="flex-1 px-4 pt-4 pb-6">
        {/* Tracker header */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6`}>
          <div className={`bg-${tracker.color} h-2 w-full`}></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{tracker.title}</h1>
                  {tracker.hasReminder && (
                    <Bell size={16} className={`text-${tracker.color}`} />
                  )}
                </div>
                <p className="text-gray-500 mt-1">{tracker.description}</p>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical size={20} className="text-gray-500" />
                </button>
                
                {showOptions && (
                  <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-10 w-36">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <Edit size={16} className="text-gray-500" />
                      <span>Edit</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{tracker.frequency}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>Next due: {formatDate(tracker.nextDue)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button className={`flex-1 bg-${tracker.color} hover:bg-opacity-90 text-white py-3 rounded-lg shadow-sm flex items-center justify-center gap-2`}>
            <CheckCircle size={18} />
            Mark as Complete
          </button>
          
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg shadow-sm flex items-center justify-center gap-2">
            <Calendar size={18} />
            Skip This Time
          </button>
        </div>
        
        {/* History section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium">History</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {tracker.history?.map((item, index) => (
              <div key={index} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {item.completed ? (
                    <div className={`h-8 w-8 rounded-full bg-${tracker.color} flex items-center justify-center`}>
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <AlertCircle size={16} className="text-gray-400" />
                    </div>
                  )}
                  <span className="font-medium">{formatDate(item.date)}</span>
                </div>
                <span className={item.completed ? 'text-green-500' : 'text-red-500'}>
                  {item.completed ? 'Completed' : 'Missed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Navbar />
    </main>
  );
}
