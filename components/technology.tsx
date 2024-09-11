import { cn } from '../utils/cn'
import React from 'react'
import { AnimatedTooltip } from './ui/animated-tooltip';

export interface Person {
  $id: number;
Name_project:string;
  enum: string;
  link: string;
}

interface TechnologyProps {
  people: Person[];
  technologyName: string;

}

export default function Technology({ people,technologyName }: TechnologyProps) {
  const className = ''; 
  console.log("peopletach",people)
  return (
    <>
      <div 
        data-aos="fade-up"
        data-aos-anchor-placement="center-center"
        className='w-[300px] md:w-[500px] h-auto flex flex-col justify-center items-center  rounded-xl px-4 py-4'
      >
        <h4  
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="text-xl font-bold mb-2"
        >
   {technologyName}
        </h4>
        <div className="flex flex-wrap items-center justify-center mt-2 w-full">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </>
  );
}
