"use client"
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { FileUploader } from "@/components/FileUpload";
import { useUploadThing } from '@/lib/uploadthing';
import { createProject } from '@/lib/actions/project.actions';
import { IProject } from '@/lib/database/models/project.model';
import Dropdown from './Dropdown';

// Define diagram type enum for consistency
const DIAGRAM_TYPES = ['floor_plan', 'elevation', 'section', 'detail', 'site_plan', 'concept', 'other'] as const;
type DiagramType = typeof DIAGRAM_TYPES[number];

// Zod validation schema
const projectPhotoSchema = z.object({
  url: z.string().min(1, 'Photo URL is required'),
  description: z.string().min(1, 'Photo description is required'),
  alt_text: z.string().optional(),
  order: z.number().min(0).optional()
});

const projectDiagramSchema = z.object({
  url: z.string().min(1, 'Diagram URL is required'),
  description: z.string().min(1, 'Diagram description is required'),
  diagram_type: z.enum(DIAGRAM_TYPES).optional(),
  alt_text: z.string().optional(),
  order: z.number().min(0).optional()
});

const projectFormSchema = z.object({
  projectName: z.string().min(1, 'Project name is required').max(200, 'Project name cannot exceed 200 characters'),
  coverImage: z.string().min(1, 'Cover image is required'),
  projectDescription: z.string().min(1, 'Project description is required').max(2000, 'Description cannot exceed 2000 characters'),
  location: z.string().min(1, 'Location is required').max(200, 'Location cannot exceed 200 characters'),
  year: z.number().min(1900, 'Year must be after 1900').max(new Date().getFullYear() + 10, 'Year cannot be more than 10 years in the future'),
  categoryId: z.string().min(1, 'Category is required'),
  status: z.enum(['idea', 'progress', 'completed']),
  projectSize: z.string().max(100, 'Project size cannot exceed 100 characters').optional(),
  clientName: z.string().max(200, 'Client name cannot exceed 200 characters').optional(),
  projectPhotos: z.array(projectPhotoSchema).max(50, 'Cannot have more than 50 photos').optional(),
  projectDiagrams: z.array(projectDiagramSchema).max(30, 'Cannot have more than 30 diagrams').optional()
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

type ProjectFormProps = {
  type: "Create" | "Update"
  project?: IProject,
  projectId?: string
}

const diagramTypes = [
  { value: 'floor_plan', label: 'Floor Plan' },
  { value: 'elevation', label: 'Elevation' },
  { value: 'section', label: 'Section' },
  { value: 'detail', label: 'Detail' },
  { value: 'site_plan', label: 'Site Plan' },
  { value: 'concept', label: 'Concept' },
  { value: 'other', label: 'Other' }
];

// Helper function to extract category ID from category field
const getCategoryId = (category: string | { _id: string; name: string; } | undefined): string => {
  if (!category) return '';
  if (typeof category === 'string') return category;
  return category._id || '';
};

// Helper function to safely convert diagram_type to the expected enum
const normalizeProjectDiagrams = (diagrams: any[] | undefined) => {
  if (!diagrams) return [];
  
  return diagrams.map(diagram => ({
    ...diagram,
    // Ensure diagram_type is one of the valid enum values or undefined
    diagram_type: DIAGRAM_TYPES.includes(diagram.diagram_type as DiagramType) 
      ? diagram.diagram_type as DiagramType
      : 'other' as DiagramType
  }));
};

const CreateProjectForm = ({ type, project }: ProjectFormProps) => {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File upload states
  const [coverImageFiles, setCoverImageFiles] = useState<File[]>([]);
  const [photoFiles, setPhotoFiles] = useState<{ [key: number]: File[] }>({});
  const [diagramFiles, setDiagramFiles] = useState<{ [key: number]: File[] }>({});

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: project?.project_name || '',
      coverImage: project?.cover_image || '',
      projectDescription: project?.project_description || '',
      location: project?.location || '',
      year: project?.year || new Date().getFullYear(),
      categoryId: getCategoryId(project?.category),
      status: project?.status || 'idea',
      projectSize: project?.project_size || '',
      clientName: project?.client_name || '',
      projectPhotos: project?.project_photos || [],
      projectDiagrams: normalizeProjectDiagrams(project?.project_diagrams),
    },
    mode: 'onChange' // This will validate on change to show errors immediately
  });

  const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({
    control: form.control,
    name: 'projectPhotos'
  });

  const { fields: diagramFields, append: appendDiagram, remove: removeDiagram } = useFieldArray({
    control: form.control,
    name: 'projectDiagrams'
  });

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];
    
    try {
      console.log('Starting upload for files:', files);
      const uploadedImages = await startUpload(files);
      console.log('Upload result:', uploadedImages);
      
      if (!uploadedImages) {
        console.error('Upload failed: no images returned');
        throw new Error('Upload failed: no images returned');
      }
      
      return uploadedImages.map(img => img.url);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const onSubmit = async (values: ProjectFormData) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form values:', values);
    console.log('Form errors:', form.formState.errors);
    console.log('Form is valid:', form.formState.isValid);
    
    // Reset states
    setSubmitStatus('idle');
    setSubmitError('');
    setIsSubmitting(true);

    try {
      // Validate form manually
      const isValid = await form.trigger();
      console.log('Manual validation result:', isValid);
      
      if (!isValid) {
        console.log('Form validation failed');
        setSubmitError('Please fix the validation errors before submitting.');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      console.log('Starting image uploads...');
      
      // Upload cover image
      let uploadedCoverImageUrl = values.coverImage;
      if (coverImageFiles.length > 0) {
        console.log('Uploading cover image...');
        try {
          const coverUrls = await uploadImages(coverImageFiles);
          if (coverUrls.length > 0) {
            uploadedCoverImageUrl = coverUrls[0];
            console.log('Cover image uploaded successfully:', uploadedCoverImageUrl);
          }
        } catch (error) {
          console.error('Cover image upload failed:', error);
          throw new Error('Failed to upload cover image');
        }
      }

      // Upload project photos
      console.log('Uploading project photos...');
      const updatedPhotos = await Promise.all(
        values.projectPhotos?.map(async (photo, index) => {
          const files = photoFiles[index] || [];
          if (files.length > 0) {
            console.log(`Uploading photo ${index + 1}...`);
            try {
              const urls = await uploadImages(files);
              return { ...photo, url: urls[0] || photo.url };
            } catch (error) {
              console.error(`Photo ${index + 1} upload failed:`, error);
              throw new Error(`Failed to upload photo ${index + 1}`);
            }
          }
          return photo;
        }) || []
      );

      // Upload project diagrams
      console.log('Uploading project diagrams...');
      const updatedDiagrams = await Promise.all(
        values.projectDiagrams?.map(async (diagram, index) => {
          const files = diagramFiles[index] || [];
          if (files.length > 0) {
            console.log(`Uploading diagram ${index + 1}...`);
            try {
              const urls = await uploadImages(files);
              return { ...diagram, url: urls[0] || diagram.url };
            } catch (error) {
              console.error(`Diagram ${index + 1} upload failed:`, error);
              throw new Error(`Failed to upload diagram ${index + 1}`);
            }
          }
          return diagram;
        }) || []
      );

      const projectData = {
        ...values,
        coverImage: uploadedCoverImageUrl,
        projectPhotos: updatedPhotos,
        projectDiagrams: updatedDiagrams
      };

      console.log('Final project data:', projectData);
      
      if (type === 'Create') {
        console.log('Creating new project...');
        try {
          const newProject = await createProject(projectData);
          console.log('Create project result:', newProject);

          if (newProject) {
            console.log('New project created successfully:', newProject);
            setSubmitStatus('success');
            
            // Small delay to show success message
            setTimeout(() => {
              router.push(`/projects/${newProject.slug}`);
            }, 1000);
          } else {
            console.error('Create project returned null/undefined');
            setSubmitError('Failed to create project. Please try again.');
            setSubmitStatus('error');
          }
        } catch (error) {
          console.error('Error creating project:', error);
          setSubmitError(error instanceof Error ? error.message : 'Failed to create project');
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      console.log('=== FORM SUBMISSION ENDED ===');
    }
  };

  const handlePhotoFileChange = (files: File[], index: number) => {
    console.log(`Photo files changed for index ${index}:`, files);
    setPhotoFiles(prev => ({ ...prev, [index]: files }));
  };

  const handleDiagramFileChange = (files: File[], index: number) => {
    console.log(`Diagram files changed for index ${index}:`, files);
    setDiagramFiles(prev => ({ ...prev, [index]: files }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log('Form submit event triggered');
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{type} Project</CardTitle>
          <CardDescription>
            Fill in the details below to {type} an architectural project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitStatus === 'success' && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Project {type.toLowerCase()}d successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {submitError || `Failed to ${type.toLowerCase()} project. Please try again.`}
              </AlertDescription>
            </Alert>
          )}

          {/* Debug Information (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800 text-sm">
                <strong>Debug Info:</strong> Form valid: {form.formState.isValid ? 'Yes' : 'No'}, 
                Errors: {Object.keys(form.formState.errors).length}, 
                Submitting: {isSubmitting ? 'Yes' : 'No'}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project location" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter project year"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === '' ? undefined : parseInt(value));
                            }}
                            className="input-field"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <FormControl>
                          <Dropdown onChangeHandler={field.onChange} value={field.value}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="input-field">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="idea">Idea</SelectItem>
                            <SelectItem value="progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500 sqm" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          {...field}
                          className="textarea rounded-2xl h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image *</FormLabel>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setCoverImageFiles}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Photos Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Project Photos</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendPhoto({ url: '', description: '', alt_text: '', order: photoFields.length })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                </div>

                {photoFields.map((field, index) => (
                  <Card key={field.id} className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="text-sm">Photo {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`projectPhotos.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Photo Upload</FormLabel>
                            <FormControl>
                              <FileUploader
                                onFieldChange={field.onChange}
                                imageUrl={field.value}
                                setFiles={(files) => handlePhotoFileChange(files, index)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`projectPhotos.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter photo description"
                                  {...field}
                                  className="textarea rounded-2xl"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`projectPhotos.${index}.alt_text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alt Text</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter alt text" {...field} className="input-field" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                {photoFields.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No photos added yet</p>
                    <p className="text-sm">Click &quot;Add Photo&quot; to get started</p>
                  </div>
                )}
              </div>

              {/* Project Diagrams Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Project Diagrams</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendDiagram({ url: '', description: '', diagram_type: 'other', alt_text: '', order: diagramFields.length })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Diagram
                  </Button>
                </div>

                {diagramFields.map((field, index) => (
                  <Card key={field.id} className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="text-sm">Diagram {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDiagram(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`projectDiagrams.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diagram Upload</FormLabel>
                            <FormControl>
                              <FileUploader
                                onFieldChange={field.onChange}
                                imageUrl={field.value}
                                setFiles={(files) => handleDiagramFileChange(files, index)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`projectDiagrams.${index}.diagram_type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Diagram Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="input-field">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {diagramTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`projectDiagrams.${index}.alt_text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alt Text</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter alt text" {...field} className="input-field" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`projectDiagrams.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter diagram description"
                                {...field}
                                className="textarea rounded-2xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}

                {diagramFields.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No diagrams added yet</p>
                    <p className="text-sm">Click &quot;Add Diagram&quot; to get started</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-8 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="button col-span-2"
                  size="lg"
                  onClick={() => console.log('Submit button clicked')}
                >
                  {isSubmitting ? `${type}ing Project...` : `${type} Project`}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProjectForm;