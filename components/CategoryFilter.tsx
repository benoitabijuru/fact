"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.models";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  }

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Loading..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (error) {
    return (
      <Select disabled>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Error loading categories" />
        </SelectTrigger>
      </Select>
    );
  }

  const currentCategory = searchParams.get('category') || 'All';

  return (
    <Select onValueChange={onSelectCategory} value={currentCategory}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {categories.map((category) => (
          <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter