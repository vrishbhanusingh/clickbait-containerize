

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
//   // const papers = [
//   //   { id: 1, pdfName: 'Attention Is All You Need', abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.' },
//   //   { id: 2, pdfName: 'Paper 2', abstract: 'Abstract for Paper 2' },
//   //   { id: 3, pdfName: 'Paper 3', abstract: 'Abstract for Paper 3' },
//   // ];
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
    <div className='flex flex-col items-center justify-center min-h-screen'>
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

  );
};

export default page;

