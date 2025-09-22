"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import VideoCard from './VideoCard';

const AboutUsPage = () => {
  // Enhanced smooth animations with longer durations and smoother easing
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1.4, ease: "easeOut" }
  };

  const slideInLeft = {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1.3, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  // Fixed floating animation with proper ease string format
 
  // Enhanced hover animations
 
  return (
    <div className="min-h-screen bg-white text-black font-light">
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-thin mb-8 tracking-wide"
            variants={fadeInUp}
          >
            About <span className="font-light italic">Fact Ltd</span> Studio
          </motion.h1>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto mb-8"
            variants={scaleIn}
            animate={{ 
              ...scaleIn.animate, 
              scaleX: [0, 1],
              transition: { duration: 1.8, ease: "easeOut" }
            }}
          />
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12"
            variants={fadeInUp}
          >
           We are passionate architects, urban planners, landscapers, engineers, designers, historians, psychologists, sociologists, materials specialists, project managers, community engagement specialists, cultural consultants and scientists—united in shaping spaces that inspire, elevate the human experience, and stand the test of time. With beauty, purpose, and innovation at our core, we create environments that nurture well-being, honor culture, advance technology, and embrace sustainability. Every project we undertake enriches the built environment and uplifts the communities it serves.
          </motion.p>
          
          <motion.div 
            className="relative max-w-5xl mx-auto"
            variants={scaleIn}
           
          >
           <VideoCard/>
            <div className="absolute inset-0 bg-opacity-10 rounded-lg transition-all duration-500"></div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideInLeft}>
            <motion.h2 
              className="text-3xl md:text-4xl font-thin mb-6"
              whileInView={{ opacity: [0, 1], x: [-20, 0] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-gray-700 leading-relaxed mb-6"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
            >
             We build with a belief in humanity. Construction is more than shelter—it is justice, dignity, healing, and human advancement. We celebrate sustainability, blending nature, technology, and creativity. Every space we create turns imagination into reality, shaping a future where people live, grow, and thrive together.
            </motion.p>
            {/* <motion.p 
              className="text-gray-700 leading-relaxed mb-8"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            >
              Every project we undertake is an opportunity to create something meaningful, functional, and timeless that enhances the lives of those who inhabit our spaces.
            </motion.p> */}
            
            <motion.h2 
              className="text-3xl md:text-4xl font-thin mb-6"
              whileInView={{ opacity: [0, 1], x: [-20, 0] }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            >
              Our Vision
            </motion.h2>
            <motion.p 
              className="text-gray-700 leading-relaxed mb-6"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
            >
              Shaping a future where architecture heals, inspires, and sustains life.
            </motion.p>
            {/* <motion.p 
              className="text-gray-700 leading-relaxed"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
            >
              We envision a future where every structure we design contributes positively to communities, environments, and the broader architectural landscape.
            </motion.p> */}
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={slideInRight}
          >
            <motion.div
              className="relative w-full h-96 md:h-[500px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image 
                src="https://media.licdn.com/dms/image/v2/D4E22AQERk-ypngMUvg/feedshare-shrink_800/feedshare-shrink_800/0/1731516513593?e=1758758400&v=beta&t=-jEKra3oHl5S3OvvnyyP0X2HnJDiMNpPY3hr0_3rwDg" 
                alt="Architectural interior design"
                fill
                className="object-cover rounded-lg shadow-xl transition-all duration-700 hover:shadow-2xl"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg transition-all duration-500"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-thin mb-8">Our Story</h2>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto mb-8"
            variants={scaleIn}
            animate={{ 
              scaleX: [0, 1],
              transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
        >
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed mb-8"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
           In 2022, Architectural Studio was born from one simple belief: design can change the world. Not just buildings, but communities. One architect. One engineer. One vision.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed mb-8"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
           Our first project was a small home, but it dared to break the rules. It showed us that architecture isn’t just about space it’s about understanding people, their dreams, their lives, and turning that understanding into experiences that inspire.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Today, with over 15 projects across residential, commercial, and institutional spaces, we still follow that same vision. Integrity in design. Sustainability in practice. Innovation in every solution. We don’t just create buildings—we craft spaces that shape lives and communities for generations to come.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Core Values */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-thin mb-8">Core Values</h2>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto"
            variants={scaleIn}
            animate={{ 
              scaleX: [0, 1],
              transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="text-center p-8 border border-gray-200 hover:border-black transition-all duration-500 hover:shadow-lg"
            variants={fadeInUp}
           
          >
            <h3 className="text-xl font-medium mb-4">Innovation</h3>
            <p className="text-gray-700 leading-relaxed">
              We embrace cutting-edge technologies and design methodologies to create forward-thinking architectural solutions.
            </p>
          </motion.div>

          <motion.div 
            className="text-center p-8 border border-gray-200 hover:border-black transition-all duration-500 hover:shadow-lg"
            variants={fadeInUp}
           
          >
            <h3 className="text-xl font-medium mb-4">Sustainability</h3>
            <p className="text-gray-700 leading-relaxed">
              Environmental responsibility is at the heart of our design philosophy, creating buildings that minimize ecological impact.
            </p>
          </motion.div>

          <motion.div 
            className="text-center p-8 border border-gray-200 hover:border-black transition-all duration-500 hover:shadow-lg"
            variants={fadeInUp}
           
          >
            <h3 className="text-xl font-medium mb-4">Excellence</h3>
            <p className="text-gray-700 leading-relaxed">
              We maintain the highest standards in every aspect of our work, from initial concept to final construction.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Approach */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative order-2 md:order-1"
            variants={slideInLeft}
          >
            <motion.div
              className="relative w-full h-96 md:h-[500px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image 
                src="https://media.licdn.com/dms/image/v2/D4E22AQGNlj8tGffHcg/feedshare-shrink_800/feedshare-shrink_800/0/1731516569893?e=1758758400&v=beta&t=vQhsT90UCWSmo2DNp6WD8oxx3kgjVNP-xHSOBvdpysc" 
                alt="Architectural workspace and design process"
                fill
                className="object-cover rounded-lg shadow-xl transition-all duration-700 hover:shadow-2xl"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent rounded-lg transition-all duration-500"></div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            variants={slideInRight}
          >
            <h2 className="text-4xl md:text-5xl font-thin mb-8">Our Approach</h2>
            <motion.p 
              className="text-gray-700 leading-relaxed mb-6"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              We believe that great architecture begins with great listening. Our process starts with understanding your vision, needs, and aspirations. We then combine this insight with our expertise in design, technology, and construction to create spaces that truly reflect who you are.
            </motion.p>
            <motion.p 
              className="text-gray-700 leading-relaxed mb-8"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Our collaborative approach ensures that every stakeholder is heard and every detail is considered. From the initial sketch to the final walkthrough, we work closely with our clients to ensure their vision becomes reality.
            </motion.p>
            
            <div className="space-y-6">
              {[
                { title: "Discovery", desc: "Understanding your unique requirements and vision.", delay: 0.3 },
                { title: "Design", desc: "Creating innovative solutions that exceed expectations.", delay: 0.4 },
                { title: "Development", desc: "Refining designs through collaboration and iteration.", delay: 0.5 },
                { title: "Delivery", desc: "Bringing your vision to life with precision and care.", delay: 0.6 }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="border-l-2 border-black pl-6 transition-all duration-500 hover:border-l-4"
                  whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                  transition={{ duration: 1.0, delay: item.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Leadership */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-thin mb-8">Leadership Team</h2>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto mb-8"
            variants={scaleIn}
            animate={{ 
              scaleX: [0, 1],
              transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our experienced leadership team brings together architectural and engineering expertise, innovative thinking, and a shared commitment to design and build excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: " Jean De Dieu Manishimwe", role: "Principal Architect & Co-Founder", desc: "With over 5 years of experience, Manishimwe leads our design vision and ensures every project reflects our commitment to excellence." },
            { name: " Jean claude Nsanimana", role: "Design Director", desc: "Nsanimana brings innovative design thinking and technical expertise to every project, ensuring form and function work in perfect harmony." },
            { name: "Engr Honore", role: "Principal Engineer & Co-Founder", desc: "Honore's technical acumen and leadership champions our environmental initiatives, ensuring every project contributes to a more sustainable future." }
          ].map((member, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={fadeInUp}
            
            >
              <motion.div 
                className="w-48 h-48 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-500 hover:bg-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-6xl text-gray-400">👤</span>
              </motion.div>
              <h3 className="text-xl font-medium mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Awards & Recognition */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-thin mb-8">Recognition</h2>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto"
            variants={scaleIn}
            animate={{ 
              scaleX: [0, 1],
              transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            // { number: "15+", label: "Design Awards" },
            { number: "15+", label: "Projects Completed" },
            { number: "5+", label: "Team Members" },
            { number: "3", label: "Years of Excellence" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 transition-all duration-500 hover:bg-gray-50 rounded-lg"
              variants={fadeInUp}
            
            >
              <motion.div 
                className="text-4xl font-thin text-gray-800 mb-2"
                whileInView={{ 
                  scale: [0.8, 1.1, 1],
                  opacity: [0, 1]
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-thin mb-8">Ready to Create Something Extraordinary?</h2>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto mb-8"
            variants={scaleIn}
            animate={{ 
              scaleX: [0, 1],
              transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
            Let&apos;s discuss your vision and explore how we can transform your space into something truly remarkable.
          </p>
          <Link
          href="/contact-us"
          >
          <motion.button 
            className="bg-black text-white px-8 py-4 text-lg font-light hover:bg-gray-800 transition-all duration-500 shadow-lg hover:shadow-xl"
           
            whileTap={{ scale: 0.98 }}
          >
            Contact us to discuss Your Project
          </motion.button>
          </Link>
          
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;