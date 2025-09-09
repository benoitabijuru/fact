
import CategoryFilter from "@/components/CategoryFilter";
import Collection from "@/components/Collection";
import { getAllCategories } from "@/lib/actions/category.actions";
import {  getCachedAllProjects } from "@/lib/actions/project.actions";
import { SearchParamProps } from "@/types";
import { Suspense } from "react";



export default async function Home({ searchParams }: SearchParamProps) {

  const { query, category, page } = await searchParams;
  
  const searchText = (query as string) || '';
  const categoryText = (category as string) || '';
  const currentPage = parseInt((page as string) || '1', 10);

// Validate page number
  const validatedPage = Math.max(1, currentPage);
  // Parallel fetch 
  const [projects] = await Promise.all([
    getCachedAllProjects({
      query:searchText,
      category:categoryText,
      page:validatedPage,
      limit:12
    }),
    getAllCategories()
  ]);

  

  

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-end w-full pr-52  pt-5 z-10">
  <CategoryFilter />
</div>
     
      <Suspense fallback={<ProjectsLoading/>}>
      <Collection
        data={projects?.projects || []}
        emptyTitle="Projects not found"
        emptyStateSubtext="Come back later"
        totalPages={projects?.totalPages}
        currentPage={projects?.currentPage}
        hasNext={projects?.hasNext}
        hasPrev={projects?.hasPrev}
        totalCount={projects?.totalCount}

      />
    </Suspense>
    </div>
  );
}

// Loading component that matches your design
function ProjectsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="">
        <ul className="grid grid-cols-1 gap-8 mx-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-64 w-full"></div>
                <div className="p-6">
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2 mb-3"></div>
                  <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}