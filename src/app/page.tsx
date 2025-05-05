"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroHeader from '@/components/HeroHeader';
import FeatureCard from '@/components/FeatureCard';
import { TrendingUp, Award, Target } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [progressStats, setProgressStats] = useState({
    daysIndependent: 12,
    completedGoals: 3,
    activeGoals: 4,
    streakDays: 5
  });
  
  // Calculate days since app installation (simulated)
  useEffect(() => {
    const startDate = new Date('2025-04-23'); // Simulated start date
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setProgressStats(prev => ({
      ...prev,
      daysIndependent: diffDays
    }));
  }, []);
  return (
    <main className="flex flex-col min-h-screen pb-16">
      <HeroHeader />
      
      <div className="flex-1 px-4 -mt-6 relative z-30">
        {/* Progress Tracker */}
        <div className="bg-base-200 rounded-lg shadow-md border border-base-300 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 text-white">
            <h2 className="font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progress Tracker
            </h2>
          </div>
          
          <div className="grid grid-cols-2 divide-x divide-base-300 bg-base-100">
            <Link href="/trackers" className="p-4 flex flex-col items-center hover:bg-base-200 transition-colors">
              <div className="bg-orange-100 p-2 rounded-full mb-2">
                <Target className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-2xl font-bold">{progressStats.activeGoals}</span>
              <span className="text-sm text-base-content/70">Active Goals</span>
            </Link>
            
            <div className="p-4 flex flex-col items-center">
              <div className="bg-blue-100 p-2 rounded-full mb-2">
                <Award className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold">{progressStats.daysIndependent}</span>
              <span className="text-sm text-base-content/70">Days Independent</span>
            </div>
          </div>
          
          <div className="p-3 bg-base-300 border-t border-base-300">
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/70">Daily streak</span>
              <span className="text-sm font-medium">{progressStats.streakDays} days</span>
            </div>
            <div className="w-full bg-base-content/20 rounded-full h-2 mt-1">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(progressStats.streakDays / 7) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* Welcome message */}
        <div className="bg-base-100 rounded-lg p-5 shadow-md mb-6 border border-base-200">
          <h2 className="text-lg font-semibold mb-2">Welcome to Your Next Chapter</h2>
          <p className="text-sm text-base-content/80">
            This app is designed to help you navigate your new independence with confidence. 
            Explore the options below to get started on your journey.
          </p>
        </div>
        
        {/* Feature cards - without header */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <FeatureCard 
            title="Lists" 
            description="Build shopping lists with budget-friendly essentials for your new place. Compare prices and find recommended brands."
            imageSrc="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            linkHref="/lists"
            accentColor="bg-orange-500"
          />
          
          <FeatureCard 
            title="Bills" 
            description="Track your monthly expenses and never miss a payment. Manage rent, utilities, and other recurring bills in one place."
            imageSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            linkHref="/bills"
            accentColor="bg-blue-500"
          />
          
          <FeatureCard 
            title="Trackers" 
            description="Monitor your progress and build good habits with personalized reminders for your daily and weekly tasks."
            imageSrc="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            linkHref="/trackers"
            accentColor="bg-amber-600"
          />
          
          <FeatureCard 
            title="Recipes" 
            description="Cook affordable, quick meals with what you have. Simple recipes designed for beginners with minimal equipment."
            imageSrc="https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            linkHref="/recipes"
            accentColor="bg-teal-500"
          />
        </div>
      </div>
      
      <Navbar />
    </main>
  );
}
