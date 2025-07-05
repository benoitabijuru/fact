"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { startTransition, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "./ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
import { ICategory } from "@/lib/database/models/category.models"

type DropdownProps = {
  value?: string
  onChangeHandler?: (value: string) => void // Fixed: Added parameter type
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Added: Control dialog state
  const [isLoading, setIsLoading] = useState(false) // Added: Loading state
  const [error, setError] = useState<string | null>(null) // Added: Error state

  const handleAddCategory = async () => {
    // Added validation
    if (!newCategory.trim()) {
      setError('Category name cannot be empty')
      return
    }

    // Check if category already exists
    const existingCategory = categories.find(
      cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase()
    )
    if (existingCategory) {
      setError('Category already exists')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const category = await createCategory({
        categoryName: newCategory.trim()
      })
      
      // Added null check and proper state update
      if (category) {
        setCategories((prevState) => [...prevState, category])
        setNewCategory('') // Clear input
        setIsDialogOpen(false) // Close dialog
      }
    } catch (err) {
      console.error('Error creating category:', err)
      setError('Failed to create category. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true)
        const categoryList = await getAllCategories()
        
        if (categoryList) {
          setCategories(categoryList as ICategory[])
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories')
      } finally {
        setIsLoading(false)
      }
    }

    getCategories()
  }, [])

  // Added: Reset error when dialog closes
  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setError(null)
    setNewCategory('')
  }

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem 
            key={category._id} 
            value={category._id} 
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger 
            className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500"
            onClick={() => setIsDialogOpen(true)}
          >
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input 
                  type="text" 
                  placeholder="Category name" 
                  className="input-field mt-3" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      startTransition(() => handleAddCategory())
                    }
                  }}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                onClick={handleDialogClose}
                disabled={isLoading}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => startTransition(() => handleAddCategory())}
                disabled={isLoading || !newCategory.trim()}
              >
                {isLoading ? 'Adding...' : 'Add'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default Dropdown