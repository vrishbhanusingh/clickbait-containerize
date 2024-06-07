'use client';

import { useMutation } from '@tanstack/react-query';
import { Inbox,Loader2  } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '~/lib/s3';
import { toast } from "react-hot-toast";
import axios from 'axios';
import {useRouter} from 'next/navigation';
import { useState } from "react";
const FileUpload = () => {
  const router = useRouter()
  const [uploading, setUploading] = React.useState(false);
  const [abstractText, setAbstractText] = useState("");
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [fileKey, setFileKey] = useState("");
  const [fileName, setFileName] = useState("");


  const { mutate, isPending } = useMutation({
        mutationFn: async ({
          file_key,
          file_name,
          abstract,
        }: {
          file_key: string;
          file_name: string;
          abstract: string;
        }) => {
          try {
            const response = await axios.post("/api/create-chat", {
              file_key,
              file_name,
              abstract,
            });
            return response.data;
          } catch (error) {
            console.error("Error making API request", error);
            throw error;
          }
        },
      });

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onDrop: async (acceptedFiles) => {
            console.log('Accepted files:', acceptedFiles);
            const file = acceptedFiles[0];
            if (file.size > 10 * 1024 * 1024) {
                alert('Please upload a smaller file');
                return;
            }

            try {
                setUploading(true);
                const data = await uploadToS3(file);
                setAcceptedFile(file);
                setFileKey(data.file_key);
                setFileName(data.file_name);
                console.log('S3 upload data:', data);
                if (!data?.file_key || !data.file_name) {
                    toast.error("Something went wrong");
                    return;
                }

                // mutate(data, {
                //     onSuccess: ({chat_id}) => {
                //         toast.success("Chat created!");
                //         console.log(`chat id is: ${chat_id}`);
                //         // router.push(`/chat/${chat_id}`);

                //     },
                //     onError: (err) => {
                //         toast.error("Error creating chat");
                //         console.error('Mutation error', err);
                //     }
                // });
            } catch (error) {
                console.error('Error during file upload', error);
                toast.error("Error uploading file");
            } finally {
              setUploading(false);
            }
        }
    });

    const handleAbstractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAbstractText(event.target.value);
    };
    const handleSubmit = async () => {
      // event.preventDefault();
      if (!fileKey || !fileName) {
        toast.error("File not uploaded yet");
        return;
      }
      mutate({
        file_key: fileKey,
        file_name: fileName,
        abstract: abstractText,
      }, {
        onSuccess: ({ chat_id }) => {
          toast.success("Chat created!");
          console.log(`chat id is: ${chat_id}`);
          router.push(`/chat/${chat_id}`);
        },
        onError: (err) => {
          toast.error("Error creating chat");
          console.error('Mutation error', err);
        }
      });
    };
    

    return (
<div className='p-4 bg-white rounded-xl w-96'> {/* Increase padding for overall size */}
    <div {...getRootProps({
        className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-12 flex justify-center items-center flex-col' // Increase py for internal spacing
    })}>
        <input {...getInputProps()} />
        
        {uploading || isPending ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
            Spilling Tea to clickbait...
          </p>
          </>
        ):
        <>
        <Inbox className="w-16 h-16 text-blue-500" /> {/* Increase width and height for the icon */}
        <p className="mt-4 text-base text-slate-400">Drop PDF Here</p> {/* Adjust margin and text size */}
    </>
        }

    </div>

      <div className="my-4">
          <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">Abstract:</label>
          <textarea
            id="abstract"
            value={abstractText}
            onChange={handleAbstractChange}
            rows={4}
            className="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
      </div>
      <div className="flex justify-center">
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          
          >
            Submit
          </button>
      </div>

</div>
    );
};

export default FileUpload;
