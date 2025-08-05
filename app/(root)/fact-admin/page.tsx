"use client"
import CreateProjectForm from '@/components/ProjectForm'
import React from 'react'

const page = () => {
  return (
    <div>
        <h2>Add new project design</h2>
        <CreateProjectForm type="Create" />
    </div>
  )
}

export default page