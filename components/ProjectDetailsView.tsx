'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Image, FileText, ArrowLeft } from 'lucide-react';
import { IProject } from '@/lib/database/models/project.model';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProjectDetailViewProps {
  project: IProject;
  allProjects?: IProject[];
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, allProjects = [] }) => {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'overview' | 'photos' | 'diagrams'>('overview');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentContent = () => {
    if (currentView === 'photos') return project.project_photos || [];
    if (currentView === 'diagrams') return project.project_diagrams || [];
    return [];
  };

  const nextSlide = () => {
    const content = getCurrentContent();
    if (content.length === 0) return;
    
    setCurrentSlideIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= content.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    const content = getCurrentContent();
    if (content.length === 0) return;
    
    setCurrentSlideIndex((prevIndex) => {
      return prevIndex === 0 ? content.length - 1 : prevIndex - 1;
    });
  };

  const nextProject = () => {
    if (allProjects.length <= 1) return;
    
    const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
    const nextIndex = (currentIndex + 1) % allProjects.length;
    const nextProject = allProjects[nextIndex];
    
    router.push(`/projects/${nextProject.slug}`);
  };

  const prevProject = () => {
    if (allProjects.length <= 1) return;
    
    const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
    const prevIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1;
    const prevProject = allProjects[prevIndex];
    
    router.push(`/projects/${prevProject.slug}`);
  };

  const goBack = () => {
    router.back();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentView !== 'overview') {
      nextSlide();
    } else if (isRightSwipe && currentView !== 'overview') {
      prevSlide();
    }
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
    
    setIsAutoPlaying(true);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  const switchView = (newView: 'overview' | 'photos' | 'diagrams') => {
    setCurrentView(newView);
    setCurrentSlideIndex(0);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    // Auto-start autoplay when switching to diagrams
    if (newView === 'diagrams' && project.project_diagrams && project.project_diagrams.length > 1) {
      setTimeout(() => startAutoPlay(), 500);
    }
  };

  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          goBack();
          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            prevProject();
          } else if (currentView !== 'overview') {
            prevSlide();
          }
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            nextProject();
          } else if (currentView !== 'overview') {
            nextSlide();
          }
          break;
        case 'ArrowUp':
          switchView('photos');
          break;
        case 'ArrowDown':
          switchView('diagrams');
          break;
        case ' ':
          e.preventDefault();
          if (currentView === 'diagrams') {
            toggleAutoPlay();
          }
          break;
        case '1':
          switchView('overview');
          break;
        case '2':
          switchView('photos');
          break;
        case '3':
          switchView('diagrams');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, project, isAutoPlaying]);

  return (
    <div className="fixed inset-0 bg-black text-black z-50">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-60 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center sm:space-x-4">
            <button
              onClick={goBack}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            
            {allProjects.length > 1 && (
              <>
                <button
                  onClick={prevProject}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <h2 className="text-white text-xl font-light">
                  {project.project_name}
                </h2>
                
                <button
                  onClick={nextProject}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
            
            {allProjects.length <= 1 && (
              <h2 className="text-white text-base sm:text-xl font-light">
                {project.project_name}
              </h2>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/" className="p-2 bg-slate-900 hover:bg-white/30 rounded-full transition-all hover:text-black">
              <p className='text-white'>FACT</p>
            </Link>
            
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left Side - Image/Content Area (2/3) */}
        <div className="col-span-2 relative h-64 sm:h-96 md:h-full">
          <AnimatePresence mode="wait">
            {currentView === 'overview' && (
              <motion.div
                key="overview"
                className="w-full h-full flex items-center justify-center bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={project.cover_image}
                  alt={project.project_name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {currentView === 'photos' && (
              <motion.div
                key={`photos-${currentSlideIndex}`}
                className="w-full h-full flex items-center justify-center bg-black"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {project.project_photos && project.project_photos.length > 0 ? (
                  <img
                    src={project.project_photos[currentSlideIndex]?.url}
                    alt={project.project_photos[currentSlideIndex]?.alt_text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white text-center">
                    <p className="text-lg">No photos available</p>
                  </div>
                )}
              </motion.div>
            )}

            {currentView === 'diagrams' && (
              <motion.div
                key={`diagrams-${currentSlideIndex}`}
                className="w-full h-full flex items-center justify-center bg-black"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {project.project_diagrams && project.project_diagrams.length > 0 ? (
                  <img
                    src={project.project_diagrams[currentSlideIndex]?.url}
                    alt={project.project_diagrams[currentSlideIndex]?.alt_text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white text-center">
                    <p className="text-lg">No diagrams available</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side - Content Panel (1/3) */}
        <div className="col-span-1 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="text-black">
            <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">{project.project_name}</h3>
            
            {/* View Toggle Buttons */}
            <div className="flex flex-row  space-x-10 mb-6">
              <button
                onClick={() => switchView('overview')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-left transition-all ${
                  currentView === 'overview' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Overview</span>
              </button>
              
              <button
                onClick={() => switchView('photos')}
                className={`flex items-center space-x-2 sm:px-4 px-3 sm:py-3 py-2 rounded-lg text-left transition-all ${
                  currentView === 'photos' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Photos</span>
              </button>
              
               <button
                onClick={() => switchView('diagrams')}
                className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base transition-all ${
                  currentView === 'diagrams' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Diagrams</span>
              </button>
              
            </div>

            {/* Dynamic Content Based on Current View */}
            <div className="mb-8">
              {currentView === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-lg  mb-2">Project Description</p>
                    <p className="text-sm opacity-60 leading-relaxed">{project.project_description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-lg  mb-1">Location</p>
                      <p className="text-sm opacity-60">{project.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-lg  mb-1">Year</p>
                      <p className="text-sm opacity-60">{project.year}</p>
                    </div>
                    
                    <div>
                      <p className="text-lg">Category</p>
                      <p className="text-sm opacity-60">{project.category.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-lg  ">Client</p>
                      <p className="text-sm opacity-60">{project.client_name}</p>
                    </div>
                    
                    <div>
                      <p className="text-lg">Status</p>
                      <p className="text-sm  opacity-60 capitalize">{project.status}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'photos' && (
                <div className="space-y-4">
                  {project.project_photos && project.project_photos.length > 0 ? (
                    <div>
                      <p className="text-base leading-relaxed">
                        {project.project_photos[currentSlideIndex]?.description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base opacity-60">No photos available for this project.</p>
                  )}
                </div>
              )}

              {currentView === 'diagrams' && (
                <div className="space-y-4">
                  {project.project_diagrams && project.project_diagrams.length > 0 ? (
                    <div>
                      <p className="text-base leading-relaxed">
                        {project.project_diagrams[currentSlideIndex]?.description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base opacity-60">No diagrams available for this project.</p>
                  )}
                  
                  {/* Autoplay Control (only for diagrams) */}
                  {project.project_diagrams && project.project_diagrams.length > 1 && (
                    <div className="pt-4">
                      <button
                        onClick={toggleAutoPlay}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-all"
                      >
                        {isAutoPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>Pause Slideshow</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Play Slideshow</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls - Only show for photos/diagrams */}
          {(currentView === 'photos' || currentView === 'diagrams') && getCurrentContent().length > 0 && (
            <div className="text-black border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm opacity-80">
                  {currentSlideIndex + 1} / {getCurrentContent().length}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 text-black" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-1 justify-center">
                {getCurrentContent().map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlideIndex 
                        ? 'bg-black' 
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;