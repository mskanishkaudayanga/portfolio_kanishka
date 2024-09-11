
"use client";
import React from 'react'
import { DirectionAwareHover } from './ui/direction-aware-hover';
import { FloatingDock } from "./ui/floating-dock";
import { Modal, ModalTrigger } from './ui/animated-modal';
import Head from 'next/head';

import { database } from '../appwrite/config'; // Don't import 'client' if you don't need it



interface ProjectsProps {
  name: string;
  description: string;
  imageUrl: string;
  git: string;
  links: {
    title: string;
    icon: string
    href: string;
  }[];
}
export default function Projects({
  name,
  description,
  imageUrl,
  git,
  links,
}: ProjectsProps) {


  

  // const links = [
  //   {
  //     title: "Home",
  //     icon: (
       
       
  //       <IconBrandNextjs className="h-full w-full text-neutral-900 dark:text-neutral-300" />
          
  //     ),
  //     href: "#",
  //   },
 
  //   {
  //     title: "Products",
  //     icon: (
  //       <IconBrandNextjs className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //     ),
  //     href: "#",
  //   },
  //   {
  //     title: "Components",
  //     icon: (
  //       <IconNewSection className="h-full w-full text-black dark:text-neutral-300" />
  //     ),
  //     href: "#",
  //   },
    
  //   {
  //     title: "Changelog",
  //     icon: (
  //       <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //     ),
  //     href: "#",
  //   },
 
  //   {
  //     title: "Twitter",
  //     icon: (
  //       <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //     ),
  //     href: "#",
  //   },
  //   {
  //     title: "GitHub",
  //     icon: (
  //       <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //     ),
  //     href: "#",
  //   },
  // ];

  return (
    <><Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css" />
    </Head>
    <div data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className=" w-[300px] md:w-[450px]  h-auto bg-zinc-900 rounded-xl border border-gray-500">
        <div className="w-full h-auto bg-zinc-900 flex flex-col justify-center rounded-xl  items-center p-2 sm:p-4">
         
          <div className="w-full h-auto flex flex-col justify-center items-center mt-2 sm:mt-5">
            <DirectionAwareHover imageUrl={imageUrl} className='p-0'>
              <p className="font-bold text-sm sm:text-base md:text-lg"></p>
              <p className="font-normal text-xs sm:text-sm"></p>
            </DirectionAwareHover>
          </div>
          <div className="flex flex-col w-[90%] mt-6 ">
            <p className=" w-full h-auto  mb-2 row-span-1 text-white text-left pt-1 text-base sm:text-base md:text-xl font-bold">
              {name}
            </p>
            <p className=" w-full row-span-1 text-zinc-400 text-left text-xs sm:text-xs md:text-xs ">
             {description}
            </p>
          </div>
          <div className='w-[90%] md:mt-4 mt-2 h-auto md:col-span-2 col-span-1 grid grid-cols-1 md:grid-cols-2 items-center'>
            <div className='flex justify-start'>
         
              <FloatingDock
                mobileClassName="w-full"
                desktopClassName='w-full'
                items={links} />
            </div>
            <div className='flex justify-start md:justify-end '>
              <Modal>
                <ModalTrigger className="relative w-auto h-auto text-white flex justify-center group/modal-btn">
                  <span className="bg-none group-hover/modal-btn:translate-x-40 text-center transition duration-500 text-sm">
                   <a href={'#'}>Git Hub Link ⮕</a> 
                  </span>
                  <div className="bg-none -translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)" width="1.5em" height="1em">
                      <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                    </svg>
                  </div>
                </ModalTrigger>
              </Modal>
            </div>
          </div>


        </div>
      </div></>
  
  );
}
