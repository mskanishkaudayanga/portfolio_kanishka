"use client";
import React, { use, useEffect, useState } from 'react';
import { FloatingNav } from './ui/floating-navbar';

import { Modal, ModalTrigger } from './ui/animated-modal';
import 'remixicon/fonts/remixicon.css';
import { FlipWords } from './ui/flip-words';

import { TextGenerateEffect } from './ui/text-generate-effect';
import { CardContainer, CardItem } from './ui/3d-card';
import Image from "next/image"
// import blackImage from '../../public/about-black.png'
// import ColorImage from '../../public/about-color.png'
import { HoverEffect } from './ui/card-hover-effect';
import { getcv } from '../appwrite/cv.actions';
interface cv{
  CV:string;
  link:string;
}
export default function Hero() {
  const navItems = [
    { name: "Home", link: "/", icon: <svg width="1.3rem" height="1.3rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"></path></svg> },
    { name: "Projects", link: "/about", icon:<svg width="1.3rem" height="1.3rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM16.4645 15.5355L20 12L16.4645 8.46447L15.0503 9.87868L17.1716 12L15.0503 14.1213L16.4645 15.5355ZM6.82843 12L8.94975 9.87868L7.53553 8.46447L4 12L7.53553 15.5355L8.94975 14.1213L6.82843 12ZM11.2443 17L14.884 7H12.7557L9.11597 17H11.2443Z"></path></svg>},
    { name: "Contact", link: "/about", icon:  <svg width="1.3rem" height="1.3rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM20 17H24V19H20V17ZM17 12H24V14H17V12ZM19 7H24V9H19V7Z"></path></svg>}
  ];
      const [cv, setCv] = useState<any[]>([]);
    const[cvlink,setCvlink] = useState<string>('');
  useEffect(() => {
    const flechCv = async () => {
      const cvData = await getcv();
      const mappedCv = cvData.documents.map((doc: any) => ({
        CV: doc.CV,
        link: doc.link
      }));
      setCv(mappedCv);
        if (mappedCv.length > 0) {
        setCvlink(mappedCv[0].link); // Set the first CV link
      }
    }
    flechCv();
    
  }, []);

 const handleOpenPDF = () => {
    // Open PDF in a new tab
    window.open(cvlink, '_blank');
  };
  console.log ("cvlink",cvlink)
  const [isHovered, setIsHovered] = useState(false);
  const words = ["Front-End Developer", "Back-End Developer", "Problem Solver", "Web Designer"];
const aboutme = "I am an IT undergraduate at the University of Moratuwa with a GPA of 3.4 and a last semester GPA of 3.82. I specialize in front-end and back-end web development, with skills in Java, JavaScript, TypeScript, React.js, Next.js, and Node.js. I excel in problem-solving, web application development, and database management. As a team player with strong time management skills, I am eager to learn and take on new challenges. I'm also expanding my knowledge in cloud computing and networking. "
const EduData = [
  {
    title: "University of moratuwa",
    description:
      "I am an undergraduate at the University of Moratuwa, pursuing a BSc (Hons) in Information Technology. I am in my third year and have already completed coursework that includes Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems (DBMS), and many more.",
    link: "GPA 3.4",
    subtitle:"undergraduate BScHons Information Technology"
  },
  {
    title: "Mahinda Collage Galle",
    description:
      "In 2020, I completed the GCE Advanced Level in the Physical Science stream with a Z-score of 1.92. I achieved three 'A's in Combined Mathematics,Physics and Chemistry.",
    link: "Z-score 1.92",
        subtitle:"GCE A/L in Physical Science Stream"
  },]
return (
    <>
      <FloatingNav navItems={navItems} />
      <div className='w-full h-[100vh] flex flex-col'  data-aos="fade-up"
            data-aos-anchor-placement="center-bottom">
        <div className='w-full md:h-[100px]  h-[60px] flex flex-row items-center border-b'>
          <div className='w-[5%]'></div>
          <div className='w-[70%] md:w-[40%] flex items-center justify-start'>
            <div className='flex items-center w-10'>
             
              <Image src='/logonew.png' alt="icon" width={50} height={50}/>
            </div>
            <div className='flex items-center ml-2 md:ml-3 '>
              <p className='text-base md:text-xl font-bold'>Kanishka Udayanga</p>
            </div>
          </div>
          <div className='w-[28%] md:w-[55%] flex flex-row justify-end iems-center '>
           <div className='w-full flex flex-row justify-end items-center gap-5 md:flex md:opacity-1 hidden pr-4'>
              <a href="https://ui.shadcn.com/"> 
                <i className="ri-linkedin-box-fill text-2xl"></i>
              </a> 
              <a href="https://ui.shadcn.com/"> 
                <i className="ri-github-fill text-2xl"></i>
              </a>
              <a href="https://ui.shadcn.com/"> 
                <i className="ri-mail-send-fill text-2xl"></i>
              </a>
            </div>

          </div>
        </div>
        <div className='w-full h-[100vh] flex flex-col md:flex-row justify-center items-center'  >
          <div className='w-full md:w-[50%]  h-[100%] flex flex-col pl-6 md:pl-10 lg:pl:15 items-start justify-center order-2 md:order-1'>
            <div className='w-full flex flex-row justify-start items-center'>
             <span  className='text-bold text-xl md:text-3xl font-semibold text-zinc-50 font-Montserrat'> Hi I'm</span>   <br/>  
              <div className='w-[40%] h-[4px] rounded-md bg-zinc-50 ml-4'></div>
            </div>
            <span className='text-bold text-3xl md:text-7xl font-extrabold text-zinc-300 font-Montserrat mt-2 '>  <FlipWords words={words} /></span>
            <p className='text-gray-400 text-sm pt-2 '>IT undergraduate at the University of Moratuwa, skilled in front-end and back-end development. </p>
            <div className='mt-3 w-auto h-auto'  onClick={handleOpenPDF}>
            <Modal>
            <ModalTrigger className="bg-white dark:bg-black text-black dark:text-white flex justify-center group/modal-btn pt-2 pb-2 pl-4 pr-4">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
               Resume <i className="ri-download-line ml-1"></i>
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
              <i className="ri-download-line "></i>
              </div>
            </ModalTrigger>
           </Modal>
          </div>
          </div>
       
          <div className='w-full md:w-[50%]  h-[100%] order-1 md:order-2'></div>
        </div>
      </div>
      <div  data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
             className='w-full h-auto flex flex-col justify-center items-center mb-2'>
        <div className='w-full h-100px flex items-center justify-center'>
          <TextGenerateEffect words='About Me' className='text-bold text-2xl md:text-4xl font-semibold text-white font-Montserrat '/> 
        </div>
        <div className='w-full h-[100vh] flex flex-col md:flex-row items-center justify-center mt-10'>
          <div className='md:w-[50%] w-full h-full bg-black relative'>
          <CardContainer className="w-[80%] h-full">
          <CardItem translateZ="100" className="w-full mt-4" hoverImageSrc='/about-color.png'>
            <Image
              src='/about-black.png' // Use the `src` prop for the image component
              width={1000} // Use numeric values for width and height
              height={600}
              className="h-auto w-full object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardContainer>
          </div>
          <div  data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
             className='md:w-[50%] w-full h-full px-4 md:px-10 flex flex-col items-center'>
            <TextGenerateEffect words={aboutme} className='text-zinc-400 md:text-base  text-sm font-light'/>
          </div>
        </div>

      </div>
      <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="mt-5  flex flex-col items-center justify-center"
          >
            <h2  
             data-aos="fade-up"
             data-aos-anchor-placement="center-bottom"
             className="text-3xl font-bold">Educations</h2>
            <div className="flex lg:w-[100%] flex-wrap justify-center items-center">
              <HoverEffect items={EduData} />
            </div>
          </div>

          {/* Technolohies section */}
          <div className='w-full '></div>
    </>
  );
}