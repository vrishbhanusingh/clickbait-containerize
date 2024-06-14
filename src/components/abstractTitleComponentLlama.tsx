
'use client';
import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';
import { getTitle } from '~/app/actions/getTitleDB';
import { generateTitleUpdate } from '~/app/actions/getTitleUpdateDB';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { generateTitleUpdateLlama } from '~/app/actions/getTitleUpdatellama';

type Props = { paperId: number };

const fetchTitle = async (paperId: number) => {
    const response = await getTitle(paperId);
    return response;
};

const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

export const TitleabstractComponentLlama = ({ paperId }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFullAbstract, setShowFullAbstract] = useState(false);
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({
        queryKey: ['title', paperId],
        queryFn: () => fetchTitle(paperId),
    });

    const updateMutation = useMutation({
        mutationFn: () => generateTitleUpdateLlama(paperId),
        onSuccess: () => {
            queryClient.invalidateQueries(['title', paperId]);
        },
    });

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) {
        console.log(error);
        return <div className="text-center text-red-500">Error loading title</div>;
    }

    const title = data?.titleLlama;
    const response = title?.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim();
    const abstract = data?.abstract;

    // Manually parse linksUsed and remove unnecessary quotes
    // let linksUsed = [];
    // try {
    //     const rawLinksUsed = data?.linksUsed;
    //     if (rawLinksUsed) {
    //         linksUsed = rawLinksUsed.replace(/^\{/, '').replace(/\}$/, '').split('","').map(link => link.replace(/^"|"$/g, ''));
    //     }
    // } catch (e) {
    //     console.error('Failed to parse linksUsed:', e);
    // }

    // // Manually parse pageNames and remove unnecessary quotes
    // let pageNames = [];
    // try {
    //     const rawPageNames = data?.pageNames;
    //     if (rawPageNames) {
    //         pageNames = rawPageNames.replace(/^\{/, '').replace(/\}$/, '').split('","').map(name => name.replace(/^"|"$/g, ''));
    //     }
    // } catch (e) {
    //     console.error('Failed to parse pageNames:', e);
    // }

    // Create a unique references array
    // const uniqueReferences = Array.from(new Set(pageNames.map((name, index) => ({ name, link: linksUsed[index] }))))
    //     .filter(({ name, link }, index, self) =>
    //         index === self.findIndex((ref) => ref.name === name && ref.link === link)
    //     );

    // const visibleReferences = isExpanded ? uniqueReferences : uniqueReferences.slice(0, 3);

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{response ? response : 'No title available'}</h1>
            
            <div>
                <h2 className="text-xl font-semibold text-gray-500">Abstract</h2>
                <p className="text-gray-700 mt-2">
                    {abstract && (abstract.length > 200 && !showFullAbstract) ? `${abstract.slice(0, 200)}...` : abstract}
                    {abstract && abstract.length > 200 && (
                        <button
                            onClick={() => setShowFullAbstract(!showFullAbstract)}
                            className="text-teal-600 hover:text-teal-800 ml-2"
                        >
                            {showFullAbstract ? 'Show less' : 'Show more'}
                        </button>
                    )}
                </p>
            </div>

            {/* <div>
                <h2 className="text-2xl font-semibold text-gray-500">References</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {visibleReferences.length > 0 ? (
                        visibleReferences.map((reference, index) => (
                            <a
                                key={index}
                                href={reference.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-teal-600 text-white px-3 py-1 rounded-full hover:bg-teal-700 text-sm truncate max-w-xs"
                            >
                                {reference.name}
                            </a>
                        ))
                    ) : (
                        <p className="text-gray-500">No references available</p>
                    )}
                </div>
                {uniqueReferences.length > 3 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center text-teal-600 hover:text-blue-800 mt-2"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="mr-1" size={16} /> Show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="mr-1" size={16} /> Show more
                            </>
                        )}
                    </button>
                )}
            </div> */}
            <div className='flex justify-center items-center'>
            <Button onClick={() => updateMutation.mutate()} className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center">
                {updateMutation.isPending && <Spinner />}
                {!updateMutation.isPending && 'Regenerate'}
            </Button>
            </div>
            {updateMutation.isError && <div className="text-center text-red-500 mt-2">Error updating title: {updateMutation.error.message}</div>}
            {updateMutation.isSuccess && <div className="text-center text-green-500 mt-2">Update successful!</div>}
        </div>
    );
};

export default TitleabstractComponentLlama;
