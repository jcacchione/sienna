"use client";

import Link from 'next/link';
import { Home, ListChecks, Clock, Utensils, Receipt } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="dock dock-bottom bg-base-100 shadow-lg fixed bottom-0 left-0 right-0 z-50">
      <Link href="/" className="dock-item">
        <div className={isActive('/') ? 'dock-active flex flex-col items-center' : 'flex flex-col items-center'}>
          <div className="dock-icon">
            <Home size={20} />
          </div>
          <span className="dock-label">Home</span>
        </div>
      </Link>
      
      <Link href="/lists" className="dock-item">
        <div className={isActive('/lists') ? 'dock-active flex flex-col items-center' : 'flex flex-col items-center'}>
          <div className="dock-icon">
            <ListChecks size={20} />
          </div>
          <span className="dock-label">Lists</span>
        </div>
      </Link>
      
      <Link href="/trackers" className="dock-item">
        <div className={isActive('/trackers') ? 'dock-active flex flex-col items-center' : 'flex flex-col items-center'}>
          <div className="dock-icon">
            <Clock size={20} />
          </div>
          <span className="dock-label">Trackers</span>
        </div>
      </Link>
      
      <Link href="/recipes" className="dock-item">
        <div className={isActive('/recipes') ? 'dock-active flex flex-col items-center' : 'flex flex-col items-center'}>
          <div className="dock-icon">
            <Utensils size={20} />
          </div>
          <span className="dock-label">Recipes</span>
        </div>
      </Link>
      
      <Link href="/bills" className="dock-item">
        <div className={isActive('/bills') ? 'dock-active flex flex-col items-center' : 'flex flex-col items-center'}>
          <div className="dock-icon">
            <Receipt size={20} />
          </div>
          <span className="dock-label">Bills</span>
        </div>
      </Link>
    </div>
  );
}
