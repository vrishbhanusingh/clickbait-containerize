// 'use client';
// import React from 'react';
// import FileUpload from '~/components/fileUpload';
// import Link from 'next/link';
// import { Button } from '~/components/ui/button';
// import { Upload, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import FileUploadPaper from '~/components/fileUploadProject';
// import { fetchPapersByUser } from '~/app/actions/fetchPapersByUser';

// type Props = {
//   params: {
//     userId: string
//   }
// };


// const page = ({ params: { userId } }: Props) => {
//   // const papers = [
//   //   { id: 1, pdfName: 'Attention Is All You Need', abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.' },
//   //   { id: 2, pdfName: 'Paper 2', abstract: 'Abstract for Paper 2' },
//   //   { id: 3, pdfName: 'Paper 3', abstract: 'Abstract for Paper 3' },
//   // ];
//   const [selectedPaper, setSelectedPaper] = useState(null);
//   const [papers, setPapers] = useState([]);
//   // const [selectedPaper, setSelectedPaper] = useState<number | null>(null);


//   // // useEffect(() => {
//   // //   const fetchPapers = async () => {
//   // //     try {
//   // //       const fetchedPapers = await fetchPapersByUser(userId);
//   // //       console.log(fetchedPapers);
//   // //       setPapers(fetchedPapers);
//   // //     } catch (error) {
//   // //       console.error('Error fetching papers:', error);
//   // //     }
//   // //   };

//   // //   fetchPapers();
//   // // }, [userId]);
//   // // console.log(papers)
//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen'>
//       <div className='border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mb-8'>
//         <h2 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
//           <Upload />
//           <span>Upload a new paper</span>
//         </h2>
//         <FileUploadPaper userId={userId} />
//       </div>
//       <div className='w-full'>
//         <h2 className='text-lg font-semibold mb-4'>Your Papers</h2>
//         <div className='rounded-lg p-4 mb-4' style={{ maxHeight: '300px' }}>
//           {papers.map((paper) => (
//             <div key={paper.id} className='border border-gray-300 shadow-lg rounded-lg p-4 mb-4  '>
//               <div className='flex justify-between items-center mb-2 overflow-y-auto'>
//                 <div className='font-medium'>{paper.title}</div>
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
//       </div>
//     </div>
//   );
// };

// export default page;

// 'use client';
// import React, { useState } from 'react';
// import { Button } from '~/components/ui/button';
// import AdsInput from '~/components/adsInput';
// import { getScieRagMatches } from '~/app/actions/getSciRagMatches';

// type Props = {
//   params: {
//     userId: string
//   }
// };

// const Page = ({ params: { userId } }: Props) => {
//   const [query, setQuery] = useState('');
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//   };

//   const handleFetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const matches = await getScieRagMatches(query);
//       setData(matches);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleExpand = (id: string) => {
//     setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
//       <div className='border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mb-8 bg-white'>
//         <h2 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
//           <span>Search NASA/ADS</span>
//         </h2>
//         <AdsInput userId={userId} />
//       </div>
//       <div className='w-full max-w-md mb-8'>
//         <input
//           type='text'
//           value={query}
//           onChange={handleInputChange}
//           className='border border-gray-300 rounded-lg p-2 w-full mb-4'
//           placeholder='Enter your search query'
//         />
//         <Button onClick={handleFetchData} className='bg-teal-800 text-white px-4 py-2 rounded hover:bg-green-700 w-full'>
//           Search
//         </Button>
//       </div>
//       <div className='w-full'>
//         <h2 className='text-lg font-semibold mb-4'>Similarity Search Results</h2>
//         {loading && <div className="text-center text-gray-500">Loading...</div>}
//         {error && <div className="text-center text-red-500">Error: {error}</div>}
//         {data && (
//           <div className="grid grid-cols-1 gap-4">
//             {data.map((item, index) => (
//               <div key={index} className='border border-gray-300 shadow-lg rounded-lg p-6 bg-white'>
//                 <h3 className='text-xl font-semibold mb-2'>{item.metadata.title}</h3>
//                 <p className='text-gray-700 mb-2'>
//                   {expanded[item.id] ? item.metadata.abstract : `${item.metadata.abstract.substring(0, 200)}...`}
//                   <button
//                     onClick={() => toggleExpand(item.id)}
//                     className='text-teal-600 hover:text-teal-800 ml-2'
//                   >
//                     {expanded[item.id] ? 'Show less' : 'Show more'}
//                   </button>
//                 </p>
//                 <p className='text-gray-500 mb-2'>Citation Count: {item.metadata.citation_count}</p>
//                 <p className='text-gray-500 mb-2'>Read Count: {item.metadata.read_count}</p>
//                 <p className='text-gray-500 mb-2'>Keywords: {item.metadata.keyword.replace(/[\[\]']+/g, '')}</p>
//                 <a href={item.metadata.PDF_link_url} target="_blank" rel="noopener noreferrer" className='text-teal-600 hover:text-teal-800'>
//                   Read More
//                 </a>
//                 <span className='text-teal-600 hover:text-teal-800 ml-4 cursor-pointer' onClick={() => window.open(item.metadata.PDF_link_url, '_blank')}>
//                   Link
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

'use client';
import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import AdsInput from '~/components/adsInput';
import { getScieRagMatches } from '~/app/actions/getSciRagMatches';

type Props = {
  params: {
    userId: string
  }
};

const Page = ({ params: { userId } }: Props) => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const matches = await getScieRagMatches(query);
      setData(matches);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mb-8 bg-white'>
        <h2 className='text-lg font-semibold mb-4 flex items-center space-x-2'>
          <span>Search NASA/ADS</span>
        </h2>
        <AdsInput userId={userId} />
      </div>
      <div className='w-full max-w-md mb-8'>
        <input
          type='text'
          value={query}
          onChange={handleInputChange}
          className='border border-gray-300 rounded-lg p-2 w-full mb-4'
          placeholder='Enter your search query'
        />
        <Button onClick={handleFetchData} className='bg-teal-800 text-white px-4 py-2 rounded hover:bg-green-700 w-full'>
          Search
        </Button>
      </div>
      <div className='w-full'>
        <h2 className='text-lg font-semibold mb-4'>Search Results</h2>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {data && (
          <div className="grid grid-cols-1 gap-4">
            {data.map((item, index) => (
              <div key={index} className='border border-gray-300 shadow-lg rounded-lg p-6 bg-white'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center'>
                    <h3 className='text-xl font-semibold mr-2'>{item.metadata.title}</h3>
                    {item.metadata.citation_count > 50 && (
                      <span className='bg-red-500 text-white px-2 py-1 text-xs rounded mr-2'>
                        Highly cited
                      </span>
                    )}
                    {item.metadata.read_count > 30 && (
                      <span className='bg-blue-500 text-white px-2 py-1 text-xs rounded'>
                        Highly read
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => window.open(item.metadata.PDF_link_url, '_blank')}
                    className='bg-teal-800 text-white px-3 py-1 text-xs rounded hover:bg-teal-800'
                  >
                    Open Paper
                  </button>
                </div>
                <p className='text-gray-700 mb-2'>
                  {expanded[item.id] ? item.metadata.abstract : `${item.metadata.abstract.substring(0, 200)}...`}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className='text-teal-600 hover:text-teal-800 ml-2'
                  >
                    {expanded[item.id] ? 'Show less' : 'Show more'}
                  </button>
                </p>
                <p className='text-gray-500 mb-2'>Citation Count: {item.metadata.citation_count}</p>
                <p className='text-gray-500 mb-2'>Read Count: {item.metadata.read_count}</p>
                <p className='text-gray-500 mb-2'>Keywords: {item.metadata.keyword.replace(/[\[\]']+/g, '')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
