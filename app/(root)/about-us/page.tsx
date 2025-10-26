
import AboutUsPage from '@/components/AboutUs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "About Fact Ltd, a leading Rwandan-based architecture firm",
  description: "A leading Rwandan-based architecture firm crafting innovative spaces that blend modern design with cultural heritage.",
};
const page = () => {
  
  return (
    <>
        <AboutUsPage/>
    </>
  )
}

export default page