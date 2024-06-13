"use client";
import React from "react";
import FileUpload from "~/components/fileUpload";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Upload, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import FileUploadPaper from "~/components/fileUploadProject";
import { fetchPapersByUser } from "~/app/actions/fetchPapersByUser";
import { Spinner } from "@react-pdf-viewer/core";

type Props = {
  params: {
    userId: string;
  };
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
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, [userId]);
  console.log(papers);
  return (
    <div>
      <div className="flex gap-6">
        <div className="mb-8 w-full max-w-md rounded-lg border border-gray-300 p-6 shadow-lg">
          <h2 className="mb-4 flex items-center space-x-2 text-lg font-semibold">
            <Upload />
            <span>Upload a new paper</span>
          </h2>
          <FileUploadPaper userId={userId} />
        </div>
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold">Your Papers</h2>
          <div className="mb-4 rounded-lg p-4">
            {papers.length === 0 ? (
              <div>Loading...</div>
            ) : (
              papers.map((paper) => (
                <div
                  key={paper.id}
                  className="mb-4 rounded-lg border border-gray-300 p-4 shadow-lg  "
                >
                  <div className="mb-2 flex items-center justify-between overflow-y-auto">
                    <div className="font-medium">{paper.title}</div>
                    <div className="flex space-x-3 ">
                      <Button className="bg-teal-800">
                        <Link
                          href={`/dashboard/${userId}/${paper.id}/pdf-chat`}
                          className="text-white no-underline"
                        >
                          Open
                        </Link>
                      </Button>
                      <Button
                        className="bg-teal-800"
                        onClick={() =>
                          setSelectedPaper(
                            paper.id === selectedPaper ? null : paper.id,
                          )
                        }
                      >
                        {selectedPaper === paper.id ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${selectedPaper === paper.id ? "max-h-40" : "max-h-0"}`}
                  >
                    <div className="text-gray-700">{paper.abstract}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
