
import Collection from "@/components/Collection";
import { getAllProjects } from "@/lib/actions/project.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {

  const { query, category } = await searchParams;
  
  const searchText = (query as string) || '';
  const categoryText = (category as string) || '';

  const projects = await getAllProjects({
    query: searchText,
    category: categoryText,
  });

  

  return (
    <div className="min-h-screen bg-white">
      <Collection
        data={projects || []}
        emptyTitle="Projects not found"
        emptyStateSubtext="Come back later"
      />
    </div>
  );
}