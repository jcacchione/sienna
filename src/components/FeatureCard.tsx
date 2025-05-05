"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkHref: string;
  accentColor?: string;
}

export default function FeatureCard({
  title,
  description,
  imageSrc,
  linkHref,
  accentColor = 'bg-primary'
}: FeatureCardProps) {
  // No need to calculate text color as we're using white text
  
  return (
    <Link href={linkHref}>
      <div className="card bg-base-100 shadow-md overflow-hidden border border-base-200 hover:shadow-lg hover:translate-y-[-2px] transition-all cursor-pointer relative group">
        <div className="card-body p-0">
          <div className="flex items-stretch">
            {/* Left image section */}
            <div className="relative w-1/4 min-h-full overflow-hidden">
              <Image 
                src={imageSrc} 
                alt={title}
                fill
                style={{ objectFit: 'cover' }}
                className="h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${accentColor} opacity-40 group-hover:opacity-50 transition-opacity`}></div>
            </div>
            
            {/* Middle content section */}
            <div className="py-4 px-5 flex-1">
              <h2 className="font-medium text-lg mb-2">{title}</h2>
              <p className="text-sm text-base-content/70">{description}</p>
            </div>
            
            {/* Right button section - square ratio */}
            <div className="flex items-center justify-center p-3 aspect-square h-auto">
              <div className={`${accentColor} h-12 w-12 rounded-md flex items-center justify-center shadow-sm group-hover:shadow group-hover:scale-105 transition-all`}>
                <ChevronRight className="text-white h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
