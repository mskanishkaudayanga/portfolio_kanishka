// Import necessary components
import React from 'react';
import Hero from './Hero';
import { FloatingNav } from './ui/floating-navbar';
import { navItems } from '../data';
import Projects from './Projects';
import Technology from './technology';
import Contact from './contact';
// import blackCoder from ''
// import whitecoder from '/coding-white.png'
import mobileAppWhite from '/mobile-development (1).png'
import mobileAppBlack from '/mobile-development.png'
import { title } from 'process';
import { IconExchange } from '@tabler/icons-react';
import aceternity from '/fontEnd/aceternity_ui_gnplu8.png'
import react from '/fontEnd/reactjs_j0rfco.svg'
import nextjs from '/fontEnd/nextjs_wma0tl.svg'
import tailwindcss from '/fontEnd/tailwind_snl2f3.svg'
import shadcn from '/fontEnd/shadcn_dz9mcl.svg'
import css from '/fontEnd/css_ktacoo.svg'
import html from '/fontEnd/html_rhj2fd.svg'
import antdesign from '/fontEnd/antdesign_ux9k4i.svg'
export default function Layout() {
  const FrontEnd = [
    {
      id: 1,
      name: "React",
      designation: "",
      image: react
    },
    {
      id: 2,
      name: "Next js",
      designation: "",
      image:
        nextjs},
    {
      id: 3,
      name: "Tailwind CSS",
      designation: "",
      image:
        tailwindcss},
    {
      id: 4,
      name: "Shadcn UI",
      designation: "",
      image:
        shadcn},
    {
      id: 5,
      name: "Aceternity UI",
      designation: "",
      image:
        aceternity},
    {
      id: 6,
      name: "CSS",
      designation: "",
      image:
        css},
    {
      id: 7,
      name: "HTML",
      designation: "",
      image:
        html}, 
     {
      id: 8,
      name: "Ant design",
      designation: "",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
  ];
  
  return (
    <>
      <Hero/> 
    
      <div className='w-full flex justify-center items-center my-5 md:my-10'>
       <h2   data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="text-3xl font-bold">projects</h2>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="flex flex-wrap justify-center gap-10 items-center">
         <Projects
              name={'kanishka'}
              description={'udayanaga'}
              imageUrl={'https://cloud.appwrite.io/v1/storage/buckets/66dadef90030b0f3f7f8/files/66dae0c4003523dee2d9/view?project=66d0c46c0035541cabaf&project=66d0c46c0035541cabaf&mode=admin'}
              git={'https://cloud.appwrite.io/v1/storage/buckets/66dadef90030b0f3f7f8/files/66dae0c4003523dee2d9/view?project=66d0c46c0035541cabaf&project=66d0c46c0035541cabaf&mode=admin'}
              links={[
                {
                  title: "Changelog",
                  icon:"https://cloud.appwrite.io/v1/storage/buckets/66dadef90030b0f3f7f8/files/66dae0c4003523dee2d9/view?project=66d0c46c0035541cabaf&project=66d0c46c0035541cabaf&mode=admin",
                  href: "#",
                },
                {
                  title: "Changelog",
                  icon:"https://cloud.appwrite.io/v1/storage/buckets/66dadef90030b0f3f7f8/files/66dae0c4003523dee2d9/view?project=66d0c46c0035541cabaf&project=66d0c46c0035541cabaf&mode=admin",
                  href: "#",
                },
                {
                  title: "Changelog",
                  icon:"https://cloud.appwrite.io/v1/storage/buckets/66dadef90030b0f3f7f8/files/66dae0c4003523dee2d9/view?project=66d0c46c0035541cabaf&project=66d0c46c0035541cabaf&mode=admin",
                  href: "#",
                }
              ]}
            />

         
      </div>
      <div className='w-full flex flex-col justify-center items-center my-10 md:my-[8.5rem]'>
       <h2   data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="text-3xl font-bold mb-10">Technology</h2>
          <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="flex flex-wrap justify-center gap-5  items-center">
        
      {/* <Technology/> */}
      <Technology people={FrontEnd} technologyName="Front_End Developments" />
      <Technology people={FrontEnd} technologyName="Back_End Developments" />
      <Technology people={FrontEnd} technologyName="Databases" />

    
      </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center my-10 md:my-[8.5rem]">
        <h2
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="text-3xl font-bold mb-10"
        >
          Services
        </h2>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="flex flex-wrap justify-center gap-10 items-center w-full"
        >
          <Contact darklogo='/coding.png' whitelogo='/coding-white.png' name='Web Developer' />
          {/* <Contact darklogo={mobileAppWhite} whitelogo={mobileAppBlack} name='App Developer' />
          <Contact darklogo={''} whitelogo={whitecoder} name='Web Designer' /> */}
        </div>
      </div>



     
    
    </>
  );
}
