"use client";

import Link from "next/link";
import React from "react";
import { IProject } from "@/lib/database/models/project.model";
import { motion } from "framer-motion";

type CardProps = {
  project: IProject;
  index?: number;
};

const Card = ({ project, index = 0 }: CardProps) => {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row gap-1 md:gap-2 bg-white overflow-hidden duration-300 space-x-6">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center w-full md:w-2/5">
          <Link href={`/projects/${project.slug}`}>
            {/* Project Name (always visible) */}
            <h3 className="text-lg md:text-xl font-bold text-black mb-2 group-hover:text-gray-600 transition-colors">
              {project.project_name}
            </h3>
          </Link>

          {/* Details - hidden on small devices */}
          <div className="hidden md:block">
            <div className="space-y-2 mb-4">
              <p className="font-bold">Location</p>
              <p className="text-gray-600 text-sm md:text-base">
                {project.location}
              </p>
              <p className="text-black font-bold pt-2 text-sm md:text-base">
                {project.year}
              </p>
            </div>

            <div className="mb-4 space-y-2">
              <p className="font-bold">Category</p>
              <p className="text-gray-600 text-sm md:text-base">
                {project.category.name}
              </p>
              <p className="font-bold">Client</p>
              <p className="text-gray-600 text-sm md:text-base">
                {project.client_name}
              </p>
              <p className="font-bold">Status</p>
              <p className="text-gray-600 text-sm md:text-base capitalize">
                {project.status}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative overflow-hidden w-full md:w-1/2 lg:w-2/5 bg-black">
          <Link href={`/projects/${project.slug}`}>
            <motion.img
              src={project.cover_image}
              alt={project.project_name}
              className="w-full h-64 md:h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
