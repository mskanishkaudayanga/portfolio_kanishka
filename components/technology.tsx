import { cn } from '../utils/cn'
import React from 'react'
import { AnimatedTooltip } from './ui/animated-tooltip';

interface Person {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface TechnologyProps {
  people: Person[];
  technologyName: string;

}

export default function Technology({ people,technologyName }: TechnologyProps) {
  const className = ''; 

  return (
    <>
      <div 
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className='w-[300px] md:w-[450px] h-auto flex flex-col justify-start items-start border rounded-xl px-10 py-10'
      >
        <h4  
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="text-xl font-bold"
        >
   {technologyName}
        </h4>
        <div className="flex flex-wrap items-center justify-start mt-3 w-full">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </>
  );
}
