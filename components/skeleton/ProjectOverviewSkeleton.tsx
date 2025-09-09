'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, FileText, Image } from 'lucide-react';

const ProjectDetailViewSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black text-black z-50">
      {/* Header Skeleton */}
      <div className="absolute top-0 left-0 right-0 z-60 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/20 rounded-full animate-pulse">
              <ArrowLeft className="w-5 h-5 text-white opacity-50" />
            </div>
            <div className="p-2 bg-white/20 rounded-full animate-pulse">
              <ChevronLeft className="w-5 h-5 text-white opacity-50" />
            </div>
            <div className="h-6 w-40 bg-white/20 rounded animate-pulse" />
            <div className="p-2 bg-white/20 rounded-full animate-pulse">
              <ChevronRight className="w-5 h-5 text-white opacity-50" />
            </div>
          </div>

          <div className="p-2 bg-white/20 rounded-full animate-pulse w-12 h-12" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="w-full h-full grid grid-cols-3 gap-0">
        {/* Left Side Skeleton (Image area) */}
        <div className="col-span-2 relative flex items-center justify-center">
          <div className="w-full h-full bg-gray-800 animate-pulse" />
        </div>

        {/* Right Side Skeleton (Content panel) */}
        <div className="col-span-1 bg-white p-8 flex flex-col justify-between overflow-y-auto">
          <div className="text-black space-y-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />

            {/* Toggle Buttons */}
            <div className="flex flex-row space-x-10 mb-6">
              <div className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-200 animate-pulse">
                <FileText className="w-4 h-4 text-gray-400" />
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-200 animate-pulse">
                <Image className="w-4 h-4 text-gray-400" />
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-200 animate-pulse">
                <FileText className="w-4 h-4 text-gray-400" />
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>

            {/* Overview Placeholder */}
            <div className="space-y-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-16 w-full bg-gray-100 rounded animate-pulse" />

              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Controls Skeleton */}
          <div className="text-black border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-200 rounded-full animate-pulse w-8 h-8" />
                <div className="p-2 bg-gray-200 rounded-full animate-pulse w-8 h-8" />
              </div>
            </div>
            <div className="flex space-x-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailViewSkeleton;
