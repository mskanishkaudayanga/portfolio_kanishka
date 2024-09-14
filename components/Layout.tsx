// Import necessary components
import React, { useEffect, useState } from 'react';
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
import { getProjectData } from '../appwrite/project.actions';
import { getTechnologyData } from '../appwrite/technology.actions';
import { getcv } from '../appwrite/cv.actions';

interface GroupedTechnologies {
  frontEnd: any[];
  backEnd: any[];
  database: any[];
  programming: any[];
  tool: any[];
  other: any[];
}

interface ProjectProps {
  $id: string;
  name: string;
  description: string;
  image: string;
  git: string;
  stacks: stacks[];
}

interface stacks {
  link: string;
  Name_project: string;
  enum: string;
}
interface cv{
  CV:string;
  link:string;
}
    

export default function Layout() {
  
    const [groupedTechnologies, setGroupedTechnologies] = useState<GroupedTechnologies>({
        frontEnd: [],
        backEnd: [],
        database: [],
        programming: [],
        tool: [],
        other: [],
    });
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [tech, setTech] = useState<any[]>([]);

  useEffect(() => {
    const fletchData = async () => {
      const projectsDetails = await getProjectData();
      console.log(" console data",projectsDetails);
      const mappedProjects = projectsDetails.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name,
        description: doc.description,
        image: doc.image,
        git: doc.git,
        stacks: doc.stacks
      }));
      setProjects(mappedProjects);
    }
      const flechTechnology = async () => {
      const technologies = await getTechnologyData();
  const groupedTechnologies = technologies.documents.reduce(
              (acc: { [key: string]: any }, item) => {
                const category = item.enum;
                if (!acc[category]) {
                  acc[category] = [];
                }
                acc[category].push(item);
                return acc;
              },
              {}
            );
            setGroupedTechnologies({
                frontEnd: groupedTechnologies.front || [],
                backEnd: groupedTechnologies.back || [],
                database: groupedTechnologies.database || [],
                programming: groupedTechnologies.programing || [],
                tool: groupedTechnologies.tool || [],
                other: groupedTechnologies.others || [],
            });
    }
 
    fletchData();
    flechTechnology();
  }, []);

  return (
    <>
   < div id='section1' className='w-ful'>
     <Hero/> 
   </div>
    
      <div id='section2' className='w-full flex justify-center items-center my-5 md:my-10'>
       <h2   data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="text-3xl font-bold">projects</h2>
      </div>
      <div
        
        className="flex flex-wrap justify-center gap-10 items-top">
    {projects.map((project, index) => (
  <Projects
    key={index}
    name={project.name}
    description={project.description}
    imageUrl={project.image}
    git={project.git}
    links={project.stacks.map((stack) => ({
      title: stack.Name_project,
      icon: stack.link,
      href: "#",
    }))}
  />
))}
        

         
      </div>
      <div  className='w-full flex flex-col justify-center items-center my-10 md:my-[8.5rem]'>
       <h2   data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="text-3xl font-bold mb-10">Technology</h2>
          <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="flex flex-col justify-center gap-5  items-top">
        
      {/* <Technology/> */}
      <Technology people={groupedTechnologies.frontEnd} technologyName="Front_End Developments" />
      <Technology people={groupedTechnologies.backEnd} technologyName="Back_End Developments" />
      <Technology people={groupedTechnologies.database} technologyName="Databases" />
      <Technology people={groupedTechnologies.programming} technologyName="Programming Language" />
      <Technology people={groupedTechnologies.tool} technologyName="Tools" />


    
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
          <Contact darklogo='/mobile-development (1).png' whitelogo='/mobile-development.png' name='App Developer' />
          {/* <Contact darklogo={''} whitelogo={whitecoder} name='Web Designer' /> */}
        </div>
      </div>



     
    
    </>
  );
}
