import { Document, model, models, Schema } from "mongoose";

// Interface for project photos
export interface IProjectPhoto {
  url: string;
  description: string;
  alt_text?: string;
  order?: number;
}

// Interface for project diagrams
export interface IProjectDiagram {
  url: string;
  description: string;
  diagram_type?: string; // e.g., 'floor_plan', 'elevation', 'section', 'detail'
  alt_text?: string;
  order?: number;
}

// Main project interface
export interface IProject extends Document {
  _id: string;
  project_name: string;
  cover_image: string;
  project_description: string;
  location: string;
  year: number;
  category: { _id: string; name: string };
  status: 'idea' | 'progress' | 'completed';
  project_size?: string;
  client_name?: string;
  project_photos: IProjectPhoto[];
  project_diagrams: IProjectDiagram[];
  slug?: string; // For URL-friendly project names
  created_at: Date;
  updated_at: Date;
}

// Type for create project parameters
export interface CreateProjectParams {
  projectName: string;
  coverImage: string;
  projectDescription: string;
  location: string;
  year: number;
  categoryId: string;
  status: 'idea' | 'progress' | 'completed';
  projectSize?: string;
  clientName?: string;
  projectPhotos?: IProjectPhoto[];
  projectDiagrams?: IProjectDiagram[];
}

// Schema for project photos
const ProjectPhotoSchema = new Schema({
  url: { type: String, required: true },
  description: { type: String, required: true },
  alt_text: { type: String },
  order: { type: Number, default: 0 }
}, { _id: false });

// Schema for project diagrams
const ProjectDiagramSchema = new Schema({
  url: { type: String, required: true },
  description: { type: String, required: true },
  diagram_type: { 
    type: String, 
    enum: ['floor_plan', 'elevation', 'section', 'detail', 'site_plan', 'concept', 'other'],
    default: 'other'
  },
  alt_text: { type: String },
  order: { type: Number, default: 0 }
}, { _id: false });

// Main project schema
const ProjectSchema = new Schema({
  project_name: { 
    type: String, 
    required: [true, 'Project name is required'],
    unique: true,
    trim: true,
    maxlength: [200, 'Project name cannot exceed 200 characters'] // Fixed: was max_length
  },
  
  cover_image: { 
    type: String, 
    required: [true, 'Cover image is required'],
    trim: true
  },
  
  project_description: { 
    type: String, 
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [2000, 'Project description cannot exceed 2000 characters'] // Fixed: was max_length
  },
  
  location: { 
    type: String, 
    required: [true, 'Project location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters'] // Fixed: was max_length
  },
  
  year: { 
    type: Number, 
    required: [true, 'Project year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 10, 'Year cannot be more than 10 years in the future']
  },
  
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: [true, 'Project category is required']
  },
  
  status: { 
    type: String, 
    required: [true, 'Project status is required'],
    enum: {
      values: ['idea', 'progress', 'completed'],
      message: 'Status must be either idea, progress, or completed'
    }
  },
  
  project_size: { 
    type: String,
    trim: true,
    maxlength: [100, 'Project size cannot exceed 100 characters']
  },
  
  client_name: { 
    type: String,
    trim: true,
    maxlength: [200, 'Client name cannot exceed 200 characters'] // Fixed: was max_length
  },
  
  project_photos: {
    type: [ProjectPhotoSchema],
    default: [],
    validate: {
      validator: function(photos: IProjectPhoto[]) {
        return photos.length <= 50; // Limit to 50 photos
      },
      message: 'Cannot have more than 50 project photos'
    }
  },
  
  project_diagrams: {
    type: [ProjectDiagramSchema],
    default: [],
    validate: {
      validator: function(diagrams: IProjectDiagram[]) {
        return diagrams.length <= 30; // Limit to 30 diagrams
      },
      message: 'Cannot have more than 30 project diagrams'
    }
  },
  
  slug: { 
    type: String, 
    unique: true,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save middleware to generate slug
ProjectSchema.pre('save', function(next) {
  if (this.isModified('project_name') || this.isNew) {
    this.slug = this.project_name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Virtual for formatted year
ProjectSchema.virtual('formatted_year').get(function() {
  return this.year.toString();
});

// Index for better query performance
ProjectSchema.index({ status: 1, year: -1 });
ProjectSchema.index({ category: 1, status: 1 });

// Static method to find projects by status
ProjectSchema.statics.findByStatus = function(status: string) {
  return this.find({ status }).populate('category');
};

// Instance method to get photo count
ProjectSchema.methods.getPhotoCount = function() {
  return this.project_photos.length;
};

// Instance method to get diagram count
ProjectSchema.methods.getDiagramCount = function() {
  return this.project_diagrams.length;
};

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;