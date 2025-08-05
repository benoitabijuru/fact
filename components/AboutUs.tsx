"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
            We are passionate architects dedicated to creating spaces that inspire, function beautifully, and stand the test of time.
          </motion.p>
          
          <motion.div 
            className="relative max-w-5xl mx-auto"
            variants={scaleIn}
           
          >
            <Image 
              src="https://massdesigngroup.org/sites/default/files/styles/hero/public/2021-03/1804_N41_medium.jpg?itok=t2x8Ivhd" 
              alt="Modern architectural design"
              width={1200}
              height={500}
              className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-2xl transition-all duration-700 hover:shadow-3xl"
            />
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
              To transform spaces into extraordinary experiences through innovative design, sustainable practices, and meticulous attention to detail. We believe architecture should not only shelter but also inspire and elevate the human spirit.
            </motion.p>
            <motion.p 
              className="text-gray-700 leading-relaxed mb-8"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            >
              Every project we undertake is an opportunity to create something meaningful, functional, and timeless that enhances the lives of those who inhabit our spaces.
            </motion.p>
            
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
              To be recognized as leaders in architectural excellence, pioneering sustainable design solutions that harmonize with their environment while pushing the boundaries of creativity and innovation.
            </motion.p>
            <motion.p 
              className="text-gray-700 leading-relaxed"
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
            >
              We envision a future where every structure we design contributes positively to communities, environments, and the broader architectural landscape.
            </motion.p>
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
                src="https://massdesigngroup.org/sites/default/files/styles/flow_small/public/2024-07/1813_N601_indd.jpg?itok=lKmW2B3p" 
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
            Founded in 2010, Architectural Studio emerged from a shared vision among three passionate architects who believed that exceptional design could transform not just buildings, but entire communities. What started as a small practice has grown into a renowned architectural firm with over 200 completed projects across residential, commercial, and institutional sectors.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed mb-8"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Our journey began with a simple residential project that challenged conventional design thinking. This early success taught us that true architectural excellence comes from understanding our clients&apos; deepest needs and translating them into spaces that exceed expectations.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Today, we continue to uphold the same principles that guided our founding: integrity in design, sustainability in practice, and innovation in every solution we create.
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
                src="https://massdesigngroup.org/sites/default/files/styles/flow_small/public/2024-07/1813_N601_indd.jpg?itok=lKmW2B3p" 
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
            Our experienced leadership team brings together decades of architectural expertise, innovative thinking, and a shared commitment to design excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Chen", role: "Principal Architect & Founder", desc: "With over 20 years of experience, Sarah leads our design vision and ensures every project reflects our commitment to excellence." },
            { name: "Michael Rodriguez", role: "Design Director", desc: "Michael brings innovative design thinking and technical expertise to every project, ensuring form and function work in perfect harmony." },
            { name: "Emily Thompson", role: "Sustainability Director", desc: "Emily champions our environmental initiatives, ensuring every project contributes to a more sustainable future." }
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
            { number: "15+", label: "Design Awards" },
            { number: "200+", label: "Projects Completed" },
            { number: "50+", label: "Team Members" },
            { number: "12", label: "Years of Excellence" }
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
          <motion.button 
            className="bg-black text-white px-8 py-4 text-lg font-light hover:bg-gray-800 transition-all duration-500 shadow-lg hover:shadow-xl"
           
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;