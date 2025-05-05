"use client";

import { useState } from 'react';
import { ChevronLeft, MenuIcon, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Header({ title }: { title: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.history.back()}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold tracking-wide">{title}</h1>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </div>

      {/* Hamburger Menu */}
      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 mr-4 bg-white rounded-lg shadow-lg overflow-hidden z-50 w-48 animate-fade-in">
          <Link href="/settings">
            <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors">
              <Settings size={18} className="mr-3 text-orange-500" />
              <span>Settings</span>
            </div>
          </Link>
          <div className="border-t border-gray-100"></div>
          <button className="w-full text-left">
            <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors">
              <LogOut size={18} className="mr-3 text-orange-500" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
