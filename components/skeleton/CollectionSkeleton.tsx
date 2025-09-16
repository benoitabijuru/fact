"use client";

import React from "react";

const CollectionSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
    
      {/* Project Grid Skeleton */}
      <ul className="grid grid-cols-1 gap-8 mx-50">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="">
       
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 bg-white overflow-hidden duration-300 space-x-6">
        {/* Left column (text placeholders) */}
        <div className="flex flex-col justify-center w-full md:w-2/5">
          {/* Title */}
          <div className="h-6 w-3/4 bg-gray-300  mb-4 animate-pulse" />

          {/* Location + Year */}
          <div className="mb-4 space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mt-2" />
          </div>

          {/* Category + Client + Status */}
          <div className="mb-4 space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-28 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>

        {/* Right column (image placeholder) */}
        <div className="relative overflow-hidden w-full md:w-1/2 lg:w-2/5 bg-gray-300 animate-pulse " style={{ minHeight: "200px" }} />
      </div>
    
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default CollectionSkeleton;
