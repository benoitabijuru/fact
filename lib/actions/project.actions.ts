"use server"
import { CreateProjectParams } from "@/types";
import { connectToDatabase } from "../database";
import Project from "../database/models/project.model";
import { handleError } from "../utils";
 // Adjust import path as needed

export const createProject = async ({
  projectName,
  coverImage,
  projectDescription,
  location,
  year,
  categoryId,
  status,
  projectSize,
  clientName,
  projectPhotos = [],
  projectDiagrams = []
}: CreateProjectParams) => {
  try {
    await connectToDatabase();

    // Create the project with all the required and optional fields
    const newProject = await Project.create({
      project_name: projectName,
      cover_image: coverImage,
      project_description: projectDescription,
      location,
      year,
      category: categoryId,
      status,
      project_size: projectSize,
      client_name: clientName,
      project_photos: projectPhotos,
      project_diagrams: projectDiagrams
    });

    // Populate the category field to get the full category object
    await newProject.populate('category');

    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    handleError(error);
  }
};

// Optional: Additional helper actions you might need

export const getProjectBySlug = async (slug: string) => {
  try {
    await connectToDatabase();
    
    const project = await Project.findOne({ slug }).populate('category');
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    handleError(error);
  }
};

export const getAllProjects = async () => {
  try {
    await connectToDatabase();
    
    const projects = await Project.find()
      .populate('category')
      .sort({ created_at: -1 });
    
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    handleError(error);
  }
};


export const updateProject = async (projectId: string, updateData: Partial<CreateProjectParams>) => {
  try {
    await connectToDatabase();
    
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        ...(updateData.projectName && { project_name: updateData.projectName }),
        ...(updateData.coverImage && { cover_image: updateData.coverImage }),
        ...(updateData.projectDescription && { project_description: updateData.projectDescription }),
        ...(updateData.location && { location: updateData.location }),
        ...(updateData.year && { year: updateData.year }),
        ...(updateData.categoryId && { category: updateData.categoryId }),
        ...(updateData.status && { status: updateData.status }),
        ...(updateData.projectSize && { project_size: updateData.projectSize }),
        ...(updateData.clientName && { client_name: updateData.clientName }),
        ...(updateData.projectPhotos && { project_photos: updateData.projectPhotos }),
        ...(updateData.projectDiagrams && { project_diagrams: updateData.projectDiagrams })
      },
      { new: true, runValidators: true }
    ).populate('category');
    
    if (!updatedProject) {
      throw new Error('Project not found');
    }
    
    return JSON.parse(JSON.stringify(updatedProject));
  } catch (error) {
    handleError(error);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await connectToDatabase();
    
    const deletedProject = await Project.findByIdAndDelete(projectId);
    
    if (!deletedProject) {
      throw new Error('Project not found');
    }
    
    return JSON.parse(JSON.stringify(deletedProject));
  } catch (error) {
    handleError(error);
  }
};