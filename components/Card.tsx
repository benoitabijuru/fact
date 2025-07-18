"use client"
import Link from 'next/link';
import React from 'react';
import { IProject } from '@/lib/database/models/project.model';
import { motion } from 'framer-motion';

type CardProps = {
  project: IProject;
  index?: number;
}

const Card = ({ project, index = 0 }: CardProps) => {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className=""
      >
        <div className="flex flex-col md:flex-row gap-1 md:gap-2 bg-white overflow-hidden duration-300 justify-between">
          <div className="flex flex-col justify-center w-full md:w-2/5">
            <h3 className="text-xl md:text-xl font-bold text-black mb-4 group-hover:text-gray-600 transition-colors">
              {project.project_name}
            </h3>
            <div className="space-y-2 mb-4">
                Location
              <p className="text-gray-600 text-sm md:text-base">
                 {project.location}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                {project.year}
              </p>
            </div>
            <div className="space-y-2 mb-4">
                Category
              <p className="text-gray-600 text-sm md:text-base">
                {project.category.name}
              </p>
              Client
              <p className="text-gray-600 text-sm md:text-base">
                {project.client_name}
              </p>
              Status
              <p className="text-gray-600 text-sm md:text-base">
                
                <span className={` text-sm md:text-base capitalize${
                  project.status === 'completed' 
                    ? ' text-green-800' 
                    : project.status === 'progress' 
                    ? ' text-blue-800' 
                    : ' text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden w-full md:w-1/2 lg:w-2/5">
            <motion.img
              src={project.cover_image}
              alt={project.project_name}
              className="w-full h-64 md:h-80 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;