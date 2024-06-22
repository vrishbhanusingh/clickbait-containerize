// 'use client'
// import React from 'react'
// import GenratedTitlePaper from '~/components/titleGenPaper'
// import { useParams } from 'next/navigation';
// import { db } from '~/server/db';
// import { papers, chats, messages as _messages, generatedTitles } from '~/server/db/schema';
// import { GeneratedTitleComponent, TitleabstractComponent } from '~/components/TitleabstractComponent';
// import ShowGenTitle from '~/components/ui/showGenTitle';
// type Props = {}

// const titleGen  = (props: Props) => {
//   const params = useParams();
//   const { userId, projectId } = params;


//     return (
//     <div>  
//       <TitleabstractComponent paperId = {projectId} />

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
import TitleabstractComponent from '~/components/TitleabstractComponent';

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

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-center text-xl font-bold mb-8'>Generate titles with wider context using access to the internet, NASA/ADS and your paper content</h1>
      <div className="mb-8">
        <TitleabstractComponent paperId={projectId} />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">More Generations by ClickbaitPlus</h2>
        <div className="space-y-4 max-h-screen overflow-y-auto">
          {(showAll ? papers : papers.slice(0, 3)).map((paper) => (
            <div key={paper.id} className="border border-gray-300 shadow-lg rounded-lg p-2">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-lg truncate w-3/4">{paper.title}</div>
                <div className="flex space-x-3">
                  <Button className="bg-customTeal hover:bg-teal-800 p-1">
                    <Link href={`/dashboard/${userId}/${paper.id}`} className="text-white no-underline">
                      Open
                    </Link>
                  </Button>
                  <Button
                    className="bg-customTeal hover:bg-teal-800 p-1"
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
                className="bg-customTeal hover:bg-teal-800 p-1 mt-4"
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