'use client';
import React from 'react';
import FileUpload from '~/components/fileUpload';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Upload, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import FileUploadPaper from '~/components/fileUploadProject';
import { fetchPapersByUser } from '~/app/actions/fetchPapersByUser';

type Props = {
  params: {
    userId: string
  }
};


const page = ({ params: { userId } }: Props) => {

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [papers, setPapers] = useState([]);
  // const [selectedPaper, setSelectedPaper] = useState<number | null>(null);


  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const fetchedPapers = await fetchPapersByUser(userId);
        console.log(fetchedPapers);
        setPapers(fetchedPapers);
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    fetchPapers();
  }, [userId]);
  console.log(papers)
  return (
    <div>
      <div className='w-full h-[120px]'></div>
      <div className='flex gap-6'>
      <div className='border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mb-8'>
        <h2 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
          <Upload />
          <span>Upload a new paper</span>
        </h2>
        <FileUploadPaper userId={userId} />
      </div>
      <div className='w-full'>
        <h2 className='text-lg font-semibold mb-4'>Your Papers</h2>
        <div className='rounded-lg p-4 mb-4'>
          {papers.map((paper) => (
            <div key={paper.id} className='border border-gray-300 shadow-lg rounded-lg p-4 mb-4  '>
              <div className='flex justify-between items-center mb-2 overflow-y-auto'>
                <div className='font-medium'>{paper.title}</div>
                <div className='flex space-x-3 '>
                  <Button className='bg-teal-800'>
                    <Link href={`/dashboard/${userId}/${paper.id}`} className='text-white no-underline'>Open</Link>
                  </Button>
                  <Button className='bg-teal-800' onClick={() => setSelectedPaper(paper.id === selectedPaper ? null : paper.id)}>
                    {selectedPaper === paper.id ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </div>
              <div className={`transition-all duration-300 overflow-hidden ${selectedPaper === paper.id ? 'max-h-40' : 'max-h-0'}`}>
                <div className='text-gray-700'>{paper.abstract}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default page;
