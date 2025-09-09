import ProjectDetailView from '@/components/ProjectDetailsView';
import { getProjectBySlug } from '@/lib/actions/project.actions';
import { SearchParamProps } from '@/types';
import { notFound } from 'next/navigation';



export default async function ProjectPage({ params }: SearchParamProps) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  
  // Get the specific project
  const project = await getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }



  return (
    <ProjectDetailView
      project={project} 
      
    />
  );
}