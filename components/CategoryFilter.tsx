"use client"

import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.models";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GetProjectsByCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const getCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoryList = await getAllCategories();
        
        if (isMounted) {
          if (Array.isArray(categoryList)) {
            setCategories(categoryList);
          } else {
            setError("Invalid category data received");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load categories");
          console.error("Error fetching categories:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if(category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
    setShowCategories(false); // Hide categories after selection
  }

  const handleProjectClick = () => {
    setShowCategories(!showCategories);
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        
         <button 
          disabled 
          className="select-field opacity-50 cursor-not-allowed"
        >
          Projects
        </button>
        
       
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <button 
          disabled 
          className="select-field opacity-50 cursor-not-allowed"
        >
          Error loading categories
        </button>
      </div>
    );
  }

  const currentCategory = searchParams.get('category') || 'All';

  return (
    <div className="flex flex-col">
      {/* Main Project Button */}
      <Link href="/">
        <button
        onClick={handleProjectClick}
        className="select-field cursor-pointer hover:bg-gray-50 transition-colors"
      >
        Projects
      </button>

      </Link>
    
      {/* Categories Display */}
      
            {showCategories && (
        <div className="flex flex-row space-x-4bg-white ">
          {/* Individual Categories */}
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => onSelectCategory(category.name)}
              className={`select-item p-regular-14 text-left hover:bg-gray-100 transition-colors flex flex-row ${
                currentCategory === category.name ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      
  
    </div>
  )
}

export default GetProjectsByCategory