'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
import { useDropzone } from '@uploadthing/react'
import Image from 'next/image'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']) 
  })

  return (
    <div
      {...getRootProps()}
      className="relative flex h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300 ease-in-out hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:shadow-lg group"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center rounded-xl overflow-hidden shadow-inner">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 p-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <Upload className="h-12 w-12 text-blue-600 transition-colors duration-300 group-hover:text-indigo-600" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
            Drag photo here
          </h3>
          
          <p className="mb-6 text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
            SVG, PNG, JPG
          </p>
          
          <Button 
            type="button" 
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}