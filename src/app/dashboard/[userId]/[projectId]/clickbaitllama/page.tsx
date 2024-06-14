// 'use client'
// import React from 'react'
// import GenratedTitlePaper from '~/components/titleGenPaper'
// import { useParams } from 'next/navigation';
// import { db } from '~/server/db';
// import { papers, chats, messages as _messages, generatedTitles3 } from '~/server/db/schema';
// import { GeneratedTitleComponent, TitleabstractComponent } from '~/components/TitleabstractComponent';
// import ShowGenTitle from '~/components/ui/showGenTitle';
// import { TitleabstractComponentLlama } from '~/components/abstractTitleComponentLlama';

// import FileUpload from '~/components/fileUpload';
// import Link from 'next/link';
// import { Button } from '~/components/ui/button';
// import { Upload, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { useState, useEffect } from 'react';

// import { fetchPapersByUser } from '~/app/actions/fetchPapersByUser';
// type Props = {}

// const titleGen  = (props: Props) => {
//   const params = useParams();
//   const { userId, projectId } = params;
//   const useLlama = true
//   const [selectedPaper, setSelectedPaper] = useState(null);
//   const [papers, setPapers] = useState([]);
//   // const [selectedPaper, setSelectedPaper] = useState<number | null>(null);


//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const fetchedPapers = await fetchPapersByUser(userId);
//         console.log(fetchedPapers);
//         setPapers(fetchedPapers);
//       } catch (error) {
//         console.error('Error fetching papers:', error);
//       }
//     };

//     fetchPapers();
//   }, [userId]);
//   console.log(papers)


//     return (
//     <div>  {projectId}
//       <TitleabstractComponentLlama paperId = {projectId} />
//       <div className='rounded-lg p-4 mb-4' style={{ maxHeight: '300px' }}>
//           {papers.map((paper) => (
//             <div key={paper.id} className='border border-gray-300 shadow-lg rounded-lg p-4 mb-4  '>
//               <div className='flex justify-between items-center mb-2 overflow-y-auto'>
//                 <div className='font-medium'>{paper.titleLlama}</div>
//                 <div className='flex space-x-3 '>
//                   <Button className='bg-teal-800'>
//                     <Link href={`/dashboard/${userId}/${paper.id}`} className='text-white no-underline'>Open</Link>
//                   </Button>
//                   <Button className='bg-teal-800' onClick={() => setSelectedPaper(paper.id === selectedPaper ? null : paper.id)}>
//                     {selectedPaper === paper.id ? <ChevronUp /> : <ChevronDown />}
//                   </Button>
//                 </div>
//               </div>
//               <div className={`transition-all duration-300 overflow-hidden ${selectedPaper === paper.id ? 'max-h-40' : 'max-h-0'}`}>
//                 <div className='text-gray-700'>{paper.abstract}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//     </div>
//   )
// }

// export default titleGen 

'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TitleabstractComponentLlama } from '~/components/abstractTitleComponentLlama';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { fetchPapersByUser } from '~/app/actions/fetchPapersByUser';

type Props = {};

const TitleGen = (props: Props) => {
  const params = useParams();
  const { userId, projectId } = params;
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [papers, setPapers] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  console.log(papers);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <TitleabstractComponentLlama paperId={projectId} />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">More Generations by Clickbait</h2>
        <div className="space-y-4 max-h-screen overflow-y-auto">
          {(showAll ? papers : papers.slice(0, 3)).map((paper) => (
            <div key={paper.id} className="border border-gray-300 shadow-lg rounded-lg p-2">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-lg truncate w-3/4">{paper.titleLlama}</div>
                <div className="flex space-x-3">
                  <Button className="bg-teal-800 hover:bg-teal-700 p-1">
                    <Link href={`/dashboard/${userId}/${paper.id}`} className="text-white no-underline">
                      Open
                    </Link>
                  </Button>
                  <Button
                    className="bg-teal-800 hover:bg-teal-700 p-1"
                    onClick={() => setSelectedPaper(paper.id === selectedPaper ? null : paper.id)}
                  >
                    {selectedPaper === paper.id ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${selectedPaper === paper.id ? 'max-h-40' : 'max-h-0'}`}
              >
                <div className="text-gray-700">{paper.abstract}</div>
              </div>
            </div>
          ))}
          {papers.length > 3 && (
            <div className="flex justify-center">
              <Button
                className="bg-teal-800 hover:bg-teal-700 p-1 mt-4"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleGen;
