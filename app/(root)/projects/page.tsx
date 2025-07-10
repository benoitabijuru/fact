"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';

// Enhanced mock data with project_diagrams
const mockProjects = [{
    _id: '1',
    project_name: 'Sustainable Housing Complex',
    cover_image: 'https://massdesigngroup.org/sites/default/files/styles/flow_small/public/2024-07/1813_N601_indd.jpg?itok=lKmW2B3p',
    project_description: 'A revolutionary approach to sustainable living, integrating green technology with modern architectural design. This complex features solar panels, rainwater harvesting, and natural ventilation systems. The design emphasizes community living with shared spaces and private gardens.',
    location: 'Copenhagen, Denmark',
    year: 2023,
    category: { _id: '1', name: 'Residential' },
    status: 'completed',
    project_size: '15,000 sqm',
    client_name: 'Copenhagen City Council',
    project_photos: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/flow_small/public/2024-07/1813_N601_indd.jpg?itok=lKmW2B3p', description: 'Main facade view showing sustainable materials A revolutionary approach to sustainable living, integrating green technology with modern architectural design. This complex features solar panels, rainwater harvesting, and natural ventilation systems. The design emphasizes community living with shared spaces and private gardens', alt_text: 'Sustainable housing complex facade', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-03/1804_N41_medium.jpg?itok=t2x8Ivhd', description: 'Interior courtyard with community garden', alt_text: 'Community courtyard space', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/1804_N71_medium.jpg?itok=MRhVm8Gy', description: 'Rooftop garden with solar panels', alt_text: 'Rooftop sustainable features', order: 3 }
    ],
    project_diagrams: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-10/1948_N35_indd.jpg?itok=u-SOg1UZ', description: 'Ground floor plan showing community spaces', diagram_type: 'floor_plan', alt_text: 'Ground floor architectural plan', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2023-07/2076_N5_indd.jpg?itok=gXGqlK1S', description: 'Building elevation with sustainable features', diagram_type: 'elevation', alt_text: 'Building elevation drawing', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/2076_N25_indd.jpg?itok=en1B1vqu', description: 'Site plan showing landscape integration', diagram_type: 'site_plan', alt_text: 'Site plan drawing', order: 3 }
    ],
    slug: 'sustainable-housing-complex',
    created_at: new Date('2023-01-15'),
    updated_at: new Date('2023-12-20')
  },
  {
    _id: '2',
    project_name: 'Modern Art Museum',
    cover_image: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-03/1804_N41_medium.jpg?itok=t2x8Ivhd',
    project_description: 'An innovative cultural space that blends contemporary architecture with artistic expression. The museum features flexible gallery spaces, interactive exhibition areas, and state-of-the-art climate control systems to preserve artwork. The design creates a dialogue between interior and exterior spaces.',
    location: 'New York, USA',
    year: 2024,
    category: { _id: '2', name: 'Cultural' },
    status: 'progress',
    project_size: '8,500 sqm',
    client_name: 'Metropolitan Arts Foundation',
    project_photos: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-03/1804_N41_medium.jpg?itok=t2x8Ivhd', description: 'Exterior perspective showing angular design', alt_text: 'Museum exterior view', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/1804_N71_medium.jpg?itok=MRhVm8Gy', description: 'Main gallery interior with natural lighting', alt_text: 'Gallery interior space', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-10/1948_N35_indd.jpg?itok=u-SOg1UZ', description: 'Sculpture hall with dramatic ceiling', alt_text: 'Sculpture exhibition hall', order: 3 }
    ],
    project_diagrams: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2023-07/2076_N5_indd.jpg?itok=gXGqlK1S', description: 'Gallery floor plan with circulation routes', diagram_type: 'floor_plan', alt_text: 'Museum floor plan', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/2076_N25_indd.jpg?itok=en1B1vqu', description: 'Cross-section showing natural light integration', diagram_type: 'section', alt_text: 'Building section drawing', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2024-12/22073_N14_indd.jpg?itok=W_vPvbRx', description: 'Concept diagram of visitor flow', diagram_type: 'concept', alt_text: 'Visitor circulation concept', order: 3 }
    ],
    slug: 'modern-art-museum',
    created_at: new Date('2024-02-10'),
    updated_at: new Date('2024-06-15')
  },
  {
    _id: '3',
    project_name: 'Tech Campus Innovation Hub',
    cover_image: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/1804_N71_medium.jpg?itok=MRhVm8Gy',
    project_description: 'A cutting-edge technology campus designed to foster innovation and collaboration. Features open workspaces, research labs, and sustainable building technologies. The design incorporates biophilic elements and flexible spaces that can adapt to changing technological needs.',
    location: 'San Francisco, USA',
    year: 2023,
    category: { _id: '3', name: 'Commercial' },
    status: 'completed',
    project_size: '22,000 sqm',
    client_name: 'TechCorp Industries',
    project_photos: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/1804_N71_medium.jpg?itok=MRhVm8Gy', description: 'Campus overview showing integrated landscape', alt_text: 'Tech campus aerial view', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-10/1948_N35_indd.jpg?itok=u-SOg1UZ', description: 'Innovation lab with collaborative spaces', alt_text: 'Innovation laboratory interior', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2023-07/2076_N5_indd.jpg?itok=gXGqlK1S', description: 'Open collaboration space with natural light', alt_text: 'Collaboration workspace', order: 3 }
    ],
    project_diagrams: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/2076_N25_indd.jpg?itok=en1B1vqu', description: 'Master plan showing campus layout', diagram_type: 'site_plan', alt_text: 'Campus master plan', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2024-12/22073_N14_indd.jpg?itok=W_vPvbRx', description: 'Typical floor plan with flexible spaces', diagram_type: 'floor_plan', alt_text: 'Flexible floor plan layout', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/flow_small/public/2024-07/1813_N601_indd.jpg?itok=lKmW2B3p', description: 'Sustainable systems diagram', diagram_type: 'concept', alt_text: 'Sustainability concept diagram', order: 3 }
    ],
    slug: 'tech-campus-innovation-hub',
    created_at: new Date('2023-03-05'),
    updated_at: new Date('2023-11-30')
  },
  {
    _id: '4',
    project_name: 'Urban Vertical Farm',
    cover_image: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-10/1948_N35_indd.jpg?itok=u-SOg1UZ',
    project_description: 'Pioneering vertical farming architecture that combines food production with urban living. This innovative structure maximizes agricultural output in minimal space while creating a new typology of urban agriculture. The design integrates hydroponic systems, natural lighting, and community spaces.',
    location: 'Singapore',
    year: 2024,
    category: { _id: '4', name: 'Mixed Use' },
    status: 'idea',
    project_size: '5,200 sqm',
    client_name: 'Singapore Urban Development',
    project_photos: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-10/1948_N35_indd.jpg?itok=u-SOg1UZ', description: 'Concept visualization of vertical farm tower', alt_text: 'Vertical farm concept rendering', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2023-07/2076_N5_indd.jpg?itok=gXGqlK1S', description: 'Interior growing systems and walkways', alt_text: 'Growing systems interior', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/lightbox/public/primarycarousel/2076_N25_indd.jpg?itok=en1B1vqu', description: 'Community harvest area and market', alt_text: 'Community harvest space', order: 3 }
    ],
    project_diagrams: [
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2024-12/22073_N14_indd.jpg?itok=W_vPvbRx', description: 'Vertical section showing growing levels', diagram_type: 'section', alt_text: 'Vertical farm section', order: 1 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/flow_small/public/2024-07/1813_N601_indd.jpg?itok=lKmW2B3p', description: 'Growing floor plan with hydroponic systems', diagram_type: 'floor_plan', alt_text: 'Growing floor plan', order: 2 },
      { url: 'https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-03/1804_N41_medium.jpg?itok=t2x8Ivhd', description: 'Agricultural systems concept diagram', diagram_type: 'concept', alt_text: 'Agricultural systems concept', order: 3 }
    ],
    slug: 'urban-vertical-farm',
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-05-10')
  },];

const ProjectsComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState('photos'); // 'photos' or 'diagrams'
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayRef = useRef(null);

  const openProject = (project) => {
    setSelectedProject(project);
    setCurrentSlideIndex(0);
    setCurrentView('photos');
    setIsFullscreen(true);
    setIsAutoPlaying(false);
  };

  const closeProject = () => {
    setIsFullscreen(false);
    setIsAutoPlaying(false);
    clearInterval(autoPlayRef.current);
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentView('photos');
    }, 300);
  };

  const getCurrentContent = () => {
    if (!selectedProject) return [];
    return currentView === 'photos' ? selectedProject.project_photos : selectedProject.project_diagrams;
  };

  const nextSlide = () => {
    const content = getCurrentContent();
    if (content.length === 0) return;
    
    setCurrentSlideIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Loop back to start when reaching the end
      return nextIndex >= content.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    const content = getCurrentContent();
    if (content.length === 0) return;
    
    setCurrentSlideIndex((prevIndex) => {
      // Loop to end when going before start
      return prevIndex === 0 ? content.length - 1 : prevIndex - 1;
    });
  };

  const nextProject = () => {
    if (selectedProject) {
      const currentIndex = mockProjects.findIndex(p => p._id === selectedProject._id);
      const nextIndex = (currentIndex + 1) % mockProjects.length;
      setSelectedProject(mockProjects[nextIndex]);
      setCurrentSlideIndex(0);
      setCurrentView('photos');
      setIsAutoPlaying(false);
      clearInterval(autoPlayRef.current);
    }
  };

  const prevProject = () => {
    if (selectedProject) {
      const currentIndex = mockProjects.findIndex(p => p._id === selectedProject._id);
      const prevIndex = currentIndex === 0 ? mockProjects.length - 1 : currentIndex - 1;
      setSelectedProject(mockProjects[prevIndex]);
      setCurrentSlideIndex(0);
      setCurrentView('photos');
      setIsAutoPlaying(false);
      clearInterval(autoPlayRef.current);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play functionality
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 2000); // Change slide every 2 seconds
    
    setIsAutoPlaying(true);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  // Effect to handle view changes and auto-play
  useEffect(() => {
    // Clear any existing autoplay
    clearInterval(autoPlayRef.current);
    setIsAutoPlaying(false);
    
    // Auto-start autoplay when switching to diagrams
    if (currentView === 'diagrams' && getCurrentContent().length > 1) {
      startAutoPlay();
    }
  }, [currentView, selectedProject]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(autoPlayRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'Escape':
          closeProject();
          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            prevProject();
          } else {
            prevSlide();
          }
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            nextProject();
          } else {
            nextSlide();
          }
          break;
        case 'ArrowUp':
          setCurrentView('photos');
          setCurrentSlideIndex(0);
          break;
        case 'ArrowDown':
          setCurrentView('diagrams');
          setCurrentSlideIndex(0);
          break;
        case ' ':
          e.preventDefault();
          toggleAutoPlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentSlideIndex, selectedProject, isAutoPlaying]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-light tracking-wide">ARCHITECTURE STUDIO</h1>
        </div>
      </div>

      {/* Main Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 mx-50">
          {mockProjects.map((project, index) => (
            <motion.div
              key={project._id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openProject(project)}
            >
              {/* Main container with flexbox layout */}
              <div className="flex flex-col md:flex-row gap-1 md:gap-2 bg-white overflow-hidden duration-300">
                {/* Text section - right side */}
                <div className="flex flex-col justify-center w-2/5">
                  <h3 className="text-xl md:text-xl font-bold text-black mb-4 group-hover:text-gray-600 transition-colors">
                    {project.project_name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 text-sm md:text-base">{project.location}</p>
                    <p className="text-gray-600 text-sm md:text-base">{project.year}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 text-sm md:text-base">
                    
                    {project.category.name}</p>
                    <p className="text-gray-600 text-sm md:text-base">{project.client_name}</p>
                     <p className="text-gray-600 text-sm md:text-base">{project.status}</p>
                    
                  </div>
                </div>
                {/* Image section - left side */}
                <div className="relative overflow-hidden md:w-1/2 lg:w-2/5">
                  <motion.img
                    src={project.cover_image}
                    alt={project.project_name}
                    className="w-full h-64 md:h-80 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

{/* Fullscreen Project View */}
<AnimatePresence>
  {isFullscreen && selectedProject && (
    <motion.div
      className="fixed inset-0 bg-black text-black z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-60 text-black to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevProject}
              className="p-2 bg-black/20 hover:bg-white/30 rounded-full transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            
            <h2 className="text-black text-xl font-light">
              {selectedProject.project_name}
            </h2>
            
            <button
              onClick={nextProject}
              className="p-2 bg-black/20 hover:bg-black/30 rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={closeProject}
              className="p-2 bg-black/20 hover:bg-black/30 rounded-full transition-all"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Grid Layout */}
      <div className="w-full h-full  grid grid-cols-3 gap-0">
        {/* Left Side - Image (2/3) */}
        <div className="col-span-2 relative">
          <motion.div
            key={`${currentView}-${currentSlideIndex}`}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getCurrentContent().length > 0 ? (
              <img
                src={getCurrentContent()[currentSlideIndex]?.url}
                alt={getCurrentContent()[currentSlideIndex]?.description}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white text-center">
                <p className="text-lg">No {currentView} available</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Side - Content (1/3) */}
        <div className="col-span-1 bg-white p-8 flex flex-col justify-between">
          {/* Project Info */}
          <div className="text-black">
            <h3 className="text-2xl font-light mb-6">{selectedProject.project_name}</h3>
            
            {/* Photo/Diagram Toggle */}
            <div className="flex items-center space-x-2 mb-6">
              <button
                onClick={() => {
                  setCurrentView('photos');
                  setCurrentSlideIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  currentView === 'photos' 
                    ? 'bg-black text-white' 
                    : 'bg-black/20 text-black hover:bg-black/30'
                }`}
              >
                Photos
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('diagrams');
                  setCurrentSlideIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  currentView === 'diagrams' 
                    ? 'bg-black text-white' 
                    : 'bg-black/20 text-black hover:bg-black/30'
                }`}
              >
                Diagrams
              </button>
            </div>

            {/* Autoplay Control (only show for diagrams) */}
            {currentView === 'diagrams' && getCurrentContent().length > 1 && (
              <div className="mb-6">
                <button
                  onClick={toggleAutoPlay}
                  className="flex items-center space-x-2 px-4 py-2 bg-black/20 hover:bg-black/30 rounded-full text-sm transition-all"
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>
            )}
{/*             
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm opacity-60 mb-1">Location</p>
                <p className="text-lg">{selectedProject.location}</p>
              </div>
              
              <div>
                <p className="text-sm opacity-60 mb-1">Year</p>
                <p className="text-lg">{selectedProject.year}</p>
              </div>
              
              <div>
                <p className="text-sm opacity-60 mb-1">Category</p>
                <p className="text-lg">{selectedProject.category.name}</p>
              </div>
            </div> */}

            {/* Current Image Description */}
            <div className="mb-8">
              <p className="text-sm opacity-60 mb-2">Description</p>
              <p className="text-base leading-relaxed">
                {getCurrentContent()[currentSlideIndex]?.description || 'No description available'}
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="text-black">
            {/* Slide Counter */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm opacity-80">
                {currentSlideIndex + 1} / {getCurrentContent().length}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="p-2 bg-black/20 hover:bg-black/30 rounded-full transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-black" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="p-2 bg-black/20 hover:bg-black/30 rounded-full transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
            
            {/* Progress Dots */}
            <div className="flex space-x-1 justify-center">
              {getCurrentContent().map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlideIndex 
                      ? 'bg-black' 
                      : 'bg-black/40 hover:bg-black/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default ProjectsComponent;