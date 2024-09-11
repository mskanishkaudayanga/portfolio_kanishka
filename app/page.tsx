'use client';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

import { useEffect, useState } from 'react';
import { database } from '../appwrite/config';
import Layout from '../components/Layout';
import { get } from 'http';
import { getProjectData } from '../appwrite/project.actions';

export default function Home() {

  useEffect(() => {
    AOS.init();

  }, []);
 


  return (
    <><Layout /></>
  );
  
}
