
'use client';

import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadToS3 } from '~/lib/s3';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { generateTitle } from '~/app/actions/getTitleUploadDB';
import { generatTitleGPT } from '~/app/actions/generateTitleGpt';
import { generateTitleLlama } from '~/app/actions/generateTitleLlama';

const AdsInput = ({ userId }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [abstractText, setAbstractText] = useState("");
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [fileKey, setFileKey] = useState("");
  const [fileName, setFileName] = useState("");



  

  const handleAbstractChange = (event) => {
    setAbstractText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!fileKey || !fileName) {
      toast.error("File not uploaded yet");
      return;
    }
    setSubmitting(true);
    mutate({
      file_key: fileKey,
      file_name: fileName,
      abstract: abstractText,
    }, {
      onSuccess: ({ paper_id }) => {
        toast.success("Paper created!");
        const {message} = axios.post("/api/createTitlesBoth", {paperId: paper_id});
        console.log(message)
        // const titleGpt = generatTitleGPT(paper_id);


        // const { text, link } = generateTitle(paper_id);


        router.push(`/dashboard/${userId}/${paper_id}`);
      },
      onError: (err) => {
        toast.error("Error creating paper");
        console.error('Mutation error', err);
      },
      onSettled: () => {
        setSubmitting(false);
      }
    });
  };

  return (
    <div className='p-4 bg-white rounded-xl w-96'>


      <div className="my-4">
        <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">Abstract:</label>
        <textarea
          id="abstract"
          value={abstractText}
          onChange={handleAbstractChange}
          rows={4}
          className="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 p-2"
          style={{ cursor: 'text' }}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={submitting || !abstractText}
        >
          {submitting ? (
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdsInput;


