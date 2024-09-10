'use client';

import { useEffect, useState } from 'react';
import { database } from '../appwrite/config';
import Layout from '@/components/Layout';

// Define the type for Projects
interface ProjectProps {
  $id: string;
  name: string;
  subTitle: string;
  image: string;
  git: string;
  technologyLinks: TechnologyLinkProps[];
}

// Define the type for TechnologyLinks
interface TechnologyLinkProps {
  urlLogo: string;
  name: string;
  subName: string;
}

export default function Home() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      // Fetch projects data
      console.log('Fetching projects...');
      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_COLLECTION_PROJECT_ID as string
      );

      console.log('Response:', response);

      if (response && response.documents) {
        if (response.documents.length === 0) {
          console.error('No projects found.');
          setError('No projects found.');
        } else {
          // Fetch related technology links for each project
          const projectsData = await Promise.all(
            response.documents.map(async (doc: any) => {
              console.log(`Fetching tech links for project: ${doc.name}`);
          
              const techLinksResponse = await database.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID as string,
                process.env.NEXT_PUBLIC_COLLECTION_TECH_LINKD as string,
              );          
              return {
                $id: doc.$id,
                name: doc.name,
                subTitle: doc.subTitle,
                image: doc.image,
                git: doc.git,
                technologyLinks: techLinksResponse.documents.map((techLink: any) => ({
                  urlLogo: techLink.urlLogo,
                  name: techLink.name,
                  subName: techLink.subName,
                })),
              };
            })
          );
          

          setProjects(projectsData);
          setLoading(false);
        }
      } else {
        console.error('No documents found in the response.');
        setError('No documents found in the response.');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Error fetching documents.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <><div>
      {projects.length > 0 ? (
        projects.map((project) => (
          <p key={project.$id}>{project.name}</p>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div><Layout /></>
  );
  
}
