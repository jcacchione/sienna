"use client";

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function HeroHeader() {
  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* Background image with gradient overlay */}
      <Image 
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
        alt="New apartment living"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-90 z-10"></div>
      
      {/* Diagonal design element */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400/30 rotate-12 rounded-lg z-20"></div>
      <div className="absolute top-0 left-0 w-full h-full z-20">
        <div className="absolute top-4 right-4">
          <Sparkles className="h-6 w-6 text-yellow-200 opacity-80" />
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-white p-4">
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight">
            YOUR NEXT <span className="text-teal-200">CHAPTER</span>
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-200 to-teal-200"></div>
        </div>
        
        <p className="text-center text-white mt-4 font-medium">
          Your companion for living on your own
        </p>
      </div>
    </div>
  );
}
