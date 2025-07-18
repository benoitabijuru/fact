"use server"
import { CreateProjectParams, GetAllProjectsParams } from "@/types";
import { connectToDatabase } from "../database";
import Project from "../database/models/project.model";
import { handleError } from "../utils";
import Category from "../database/models/category.models";
 // Adjust import path as needed



const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

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
    console.log('=== SERVER ACTION: createProject called ===');
    console.log('Received data:', {
      projectName,
      coverImage,
      projectDescription,
      location,
      year,
      categoryId,
      status,
      projectSize,
      clientName,
      projectPhotos,
      projectDiagrams
    });

    await connectToDatabase();
    console.log('Database connected successfully');

    // Validate required fields
    if (!projectName) throw new Error('Project name is required');
    if (!coverImage) throw new Error('Cover image is required');
    if (!projectDescription) throw new Error('Project description is required');
    if (!location) throw new Error('Location is required');
    if (!year) throw new Error('Year is required');
    if (!categoryId) throw new Error('Category is required');
    if (!status) throw new Error('Status is required');

    console.log('Creating project with data:', {
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

    console.log('Project created successfully:', newProject);

    // Populate the category field to get the full category object
    await newProject.populate('category');
    console.log('Project populated with category:', newProject);

    const result = JSON.parse(JSON.stringify(newProject));
    console.log('Final result:', result);
    
    return result;
  } catch (error) {
    console.error('=== SERVER ACTION ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Re-throw the error so it can be caught by the client
    throw error;
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


export const getAllProjects = async ({ query, category }: GetAllProjectsParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }
    
    const projects = await Project.find(conditions)
      .populate('category')
      .sort({ created_at: 'desc' });
    
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