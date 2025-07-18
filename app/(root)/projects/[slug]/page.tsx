import ProjectDetailView from '@/components/ProjectDetailsView';
import { getProjectBySlug, getAllProjects } from '@/lib/actions/project.actions';
import { notFound } from 'next/navigation';

// Use Next.js built-in PageProps type
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProjectPage({ params }: PageProps) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  
  // Get the specific project
  const project = await getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  // Get all projects for navigation (optional)
  const allProjects = await getAllProjects({
    query: '',
    category: '',
  });

  return (
    <ProjectDetailView
      project={project} 
      allProjects={allProjects || []} 
    />
  );
}