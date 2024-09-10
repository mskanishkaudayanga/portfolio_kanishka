'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

type ContactProps = {
  darklogo: string;
  whitelogo: string;
  name: string;
};

export default function Contact({ darklogo, whitelogo, name }: ContactProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div
        className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-xl bg-zinc-50 hover:bg-black border transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-center items-center w-full">
          <Image width={100} height={100}
            src={isHovered ? whitelogo : darklogo}
            alt="logo"
            className="w-[100px] h-auto"
          />
        </div>
        <div className="flex justify-center items-center w-full ">
          <h3 className={`text-lg font-semibold ${isHovered ? 'text-white' : 'text-black'}`}>
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
}
