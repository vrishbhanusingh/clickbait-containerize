'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {ThumbsUp} from 'lucide-react'
import{ Button } from './ui/button';
type Props = { chatid: number };

const GenratedTitlePaper = ({ paperId }: Props) => {
    const { data: title, isLoading, error } = useQuery({
      queryKey: ['getTitleGen', paperId],
      queryFn: async () => {
        try {
          const response = await axios.post(`/api/get-title-gen-paper`, { paperId });
          return response.data;
        } catch (err) {
          console.error('Error fetching generated title:', err);
          throw err;
        }
      },
      onSuccess: (data) => {
        console.log('Generated title received:', data);
      },
      onError: (err) => {
        console.error('Error fetching generated title:', err);
      }
    });
    let response = title?.text;
    response = response?.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim();
    console.log(response);
    return  (
      <div className="bg-yellow-600 text-white font-bold p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl mb-2">Generated Title:</h2>
            <h2 className='text-black text-2xl'>{response}</h2>
            <Button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2"/>
            </Button>
        </div>

      );
}



export default GenratedTitlePaper;