// 'use client';
// import React from 'react';
// import { useQuery , useQueryClient} from '@tanstack/react-query';
// import axios from 'axios';
// import { ThumbsUp } from 'lucide-react';
// import { Button } from './ui/button';
// import { getTitle } from '~/app/actions/getTitleDB';
// import { useMutation } from '@tanstack/react-query';
// type Props = { paperId: number };
// import { generateTitleUpdate } from '~/app/actions/getTitleUpdateDB';

// const fetchTitle = async (paperId: number) => {
//     const response = await getTitle(paperId);
//     return response;
// };



// export const TitleabstractComponent = ({ paperId }: Props) => {
//     const queryClient = useQueryClient();
//     const { data, error, isLoading } = useQuery({
//         queryKey: ['title', paperId],
//         queryFn: () => {
//             const response =fetchTitle(paperId);
//             return response},
//     });
//     const updateMutation = useMutation({
//         mutationFn: () => generateTitleUpdate(paperId),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['title', paperId]);
//         },
//     });
    
    
    
//     if (isLoading) return <div>Loading...</div>;
//     if (error) {
//         console.log(error)
//         return <div>Error loading title</div>};



//     const title = data?.title;
//     const response = title?.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim();
//     // const linksUsed = data?.linksUsed;
//     // const pageNames = data?.pageNames;
    
//     let linksUsed = [];
//     try {
//         const rawLinksUsed = data?.linksUsed;
//         if (rawLinksUsed) {
//             linksUsed = rawLinksUsed.split(',').map(link => link.trim().replace(/^{|}$/g, ''));
//         }
//     } catch (e) {
//         console.error('Failed to parse linksUsed:', e);
//     }
    
//     let pageNames = [];
//     try {
//         const rawPageNames = data?.pageNames;
//         console.log(rawPageNames)
//         if (rawPageNames) {
//             pageNames = rawPageNames.split(',').map(link => link.trim().replace(/^{|}$/g, ''));
//         }
//     } catch (e) {
//         console.error('Failed to parse pageNames :', e);
//     }

//     return (
// <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
//             <h1 className="text-2xl font-bold">{response ? response : 'No title available'}</h1>
//             <div>
//                 {linksUsed.length > 0 ? (
//                     <ul className="list-disc list-inside">
//                         {linksUsed.map((link, index) => (
//                             <li key={index}>
//                                 <a href={`//${link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//                                     {link}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     'No links available'
//                 )}
//             </div>
//             <div className="flex flex-wrap space-x-2 space-y-2">
//                 {pageNames ? (
//                     pageNames.map((pageName, index) => (
//                         <a
//                             key={index}
//                             href={`//${linksUsed[index]}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                             {pageName}
//                         </a>
//                     ))
//                 ) : (
//                     'No page names available'
//                 )}
//             </div>
//             <Button onClick={() => updateMutation.mutate()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Update</Button>
//             {updateMutation.isLoading && <div className="text-center text-yellow-500">Updating...</div>}
//             {updateMutation.isError && <div className="text-center text-red-500">Error updating title: {updateMutation.error.message}</div>}
//             {updateMutation.isSuccess && <div className="text-center text-green-500">Update successful!</div>}
//         </div>
        
        
//     );
// };

// 'use client';
// import React from 'react';
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
// import { Button } from './ui/button';
// import { getTitle } from '~/app/actions/getTitleDB';
// import { generateTitleUpdate } from '~/app/actions/getTitleUpdateDB';

// type Props = { paperId: number };

// const fetchTitle = async (paperId: number) => {
//     const response = await getTitle(paperId);
//     return response;
// };

// export const TitleabstractComponent = ({ paperId }: Props) => {
//     const queryClient = useQueryClient();
//     const { data, error, isLoading } = useQuery({
//         queryKey: ['title', paperId],
//         queryFn: () => fetchTitle(paperId),
//     });

//     const updateMutation = useMutation({
//         mutationFn: () => generateTitleUpdate(paperId),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['title', paperId]);
//         },
//     });

//     if (isLoading) return <div className="text-center">Loading...</div>;
//     if (error) {
//         console.log(error);
//         return <div className="text-center text-red-500">Error loading title</div>;
//     }

//     const title = data?.title;
//     const response = title?.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim();

//     // Manually parse linksUsed and remove unnecessary quotes
//     let linksUsed = [];
//     try {
//         const rawLinksUsed = data?.linksUsed;
//         if (rawLinksUsed) {
//             linksUsed = rawLinksUsed.replace(/^\{/, '').replace(/\}$/, '').split('","').map(link => link.replace(/^"|"$/g, ''));
//         }
//     } catch (e) {
//         console.error('Failed to parse linksUsed:', e);
//     }

//     const pageNames = data?.pageNames ? data.pageNames.split(',') : [];

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
//             <h1 className="text-2xl font-bold">{response ? response : 'No title available'}</h1>
//             <div>
//                 {linksUsed.length > 0 ? (
//                     <ul className="list-disc list-inside">
//                         {linksUsed.map((link, index) => (
//                             <li key={index}>
//                                 <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//                                     {link}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     'No links available'
//                 )}
//             </div>
//             <div className="flex flex-wrap space-x-2 space-y-2">
//                 {pageNames.length > 0 ? (
//                     pageNames.map((pageName, index) => (
//                         <a
//                             key={index}
//                             href={linksUsed[index]}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                             {pageName}
//                         </a>
//                     ))
//                 ) : (
//                     'No page names available'
//                 )}
//             </div>
//             <Button onClick={() => updateMutation.mutate()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Update</Button>
//             {updateMutation.isLoading && <div className="text-center text-yellow-500">Updating...</div>}
//             {updateMutation.isError && <div className="text-center text-red-500">Error updating title: {updateMutation.error.message}</div>}
//             {updateMutation.isSuccess && <div className="text-center text-green-500">Update successful!</div>}
//         </div>
//     );
// };

// 'use client';
// import React, { useState } from 'react';
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
// import { Button } from './ui/button';
// import { getTitle } from '~/app/actions/getTitleDB';
// import { generateTitleUpdate } from '~/app/actions/getTitleUpdateDB';
// import { ChevronUp, ChevronDown } from 'lucide-react';
// import axios from "axios";
// type Props = { paperId: number };

// const fetchTitle = async (paperId: number) => {
//     const response = await getTitle(paperId);
//     return response;
// };

// const regenerateTitle = async (paperId: number) => {
//     console.log("Sending paperId:", paperId);
//     const response =  axios.post("/api/regenerateGptTitle", {
//       paperId,
//     });
//     return response.data;
// }

// const Spinner = () => (
//     <div className="flex justify-center items-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
// );

// export const TitleabstractComponent = ({ paperId }: Props) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [showFullAbstract, setShowFullAbstract] = useState(false);
//     const queryClient = useQueryClient();

    
    
    
//     const { data, error, isLoading } = useQuery({
//         queryKey: ['title', paperId],
//         queryFn: () => fetchTitle(paperId),
//     });

//     const updateMutation = useMutation({
//         mutationFn: () => regenerateTitle(paperId),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['title', paperId]);
//         },
//     });

//     if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
//     if (error) {
//         console.log(error);
//         return <div className="text-center text-red-500">Error loading title</div>;
//     }

//     const title = data?.title;
//     const response = title?.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim();
//     const abstract = data?.abstract;

//     // Manually parse linksUsed and remove unnecessary quotes
//     let linksUsed = [];
//     try {
//         const rawLinksUsed = data?.linksUsed;
//         if (rawLinksUsed) {
//             linksUsed = rawLinksUsed.replace(/^\{/, '').replace(/\}$/, '').split('","').map(link => link.replace(/^"|"$/g, ''));
//         }
//     } catch (e) {
//         console.error('Failed to parse linksUsed:', e);
//     }

//     // Manually parse pageNames and remove unnecessary quotes
//     let pageNames = [];
//     try {
//         const rawPageNames = data?.pageNames;
//         if (rawPageNames) {
//             pageNames = rawPageNames.replace(/^\{/, '').replace(/\}$/, '').split('","').map(name => name.replace(/^"|"$/g, ''));
//         }
//     } catch (e) {
//         console.error('Failed to parse pageNames:', e);
//     }

//     // Create a unique references array
//     const uniqueReferences = Array.from(new Set(pageNames.map((name, index) => ({ name, link: linksUsed[index] }))))
//         .filter(({ name, link }, index, self) =>
//             index === self.findIndex((ref) => ref.name === name && ref.link === link)
//         );

//     const visibleReferences = isExpanded ? uniqueReferences : uniqueReferences.slice(0, 3);

//     return (
//         <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">{response ? response : 'No title available'}</h1>
            
//             <div>
//                 <h2 className="text-xl font-semibold text-gray-500">Abstract</h2>
//                 <p className="text-gray-700 mt-2">
//                     {abstract && (abstract.length > 200 && !showFullAbstract) ? `${abstract.slice(0, 200)}...` : abstract}
//                     {abstract && abstract.length > 200 && (
//                         <button
//                             onClick={() => setShowFullAbstract(!showFullAbstract)}
//                             className="text-teal-600 hover:text-teal-800 ml-2"
//                         >
//                             {showFullAbstract ? 'Show less' : 'Show more'}
//                         </button>
//                     )}
//                 </p>
//             </div>

//             <div>
//                 <h2 className="text-2xl font-semibold text-gray-500">References</h2>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                     {visibleReferences.length > 0 ? (
//                         visibleReferences.map((reference, index) => (
//                             <a
//                                 key={index}
//                                 href={reference.link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="bg-teal-600 text-white px-3 py-1 rounded-full hover:bg-teal-700 text-sm truncate max-w-xs"
//                             >
//                                 {reference.name}
//                             </a>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No references available</p>
//                     )}
//                 </div>
//                 {uniqueReferences.length > 3 && (
//                     <button
//                         onClick={() => setIsExpanded(!isExpanded)}
//                         className="flex items-center text-teal-600 hover:text-blue-800 mt-2"
//                     >
//                         {isExpanded ? (
//                             <>
//                                 <ChevronUp className="mr-1" size={16} /> Show less
//                             </>
//                         ) : (
//                             <>
//                                 <ChevronDown className="mr-1" size={16} /> Show more
//                             </>
//                         )}
//                     </button>
//                 )}
//             </div>
//             <Button onClick={() => updateMutation.mutate()} className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center">
//                 {updateMutation.isLoading && <Spinner />}
//                 {!updateMutation.isLoading && 'Regenerate'}
//             </Button>
//             {updateMutation.isError && <div className="text-center text-red-500 mt-2">Error updating title: {updateMutation.error.message}</div>}
//             {updateMutation.isSuccess && <div className="text-center text-green-500 mt-2">Update successful!</div>}
//         </div>
//     );
// };

// export default TitleabstractComponent;

'use client';
import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';
import { getTitle } from '~/app/actions/getTitleDB';
import { ChevronUp, ChevronDown , LoaderCircle } from 'lucide-react';
import axios from "axios";
type Props = { paperId: number };

const fetchTitle = async (paperId: number) => {
    const response = await getTitle(paperId);
    return response;
};

const regenerateTitle = async (paperId: number) => {
    console.log("Sending paperId:", paperId);
    const response = await axios.post("/api/regenerateGptTitle", {
        paperId,
    });
    return response.data;
};

const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

export const TitleabstractComponent = ({ paperId }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFullAbstract, setShowFullAbstract] = useState(false);
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['title', paperId],
        queryFn: () => fetchTitle(paperId),
    });

    const updateMutation = useMutation({
        mutationFn: () => regenerateTitle(paperId),
        onSuccess: () => {
            queryClient.invalidateQueries(['title', paperId]);
        },
    });

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) {
        console.log(error);
        return <div className="text-center text-red-500">Error loading title</div>;
    }

    const title = data?.title;
    const response = title?.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim();
    const abstract = data?.abstract;

    // Manually parse linksUsed and remove unnecessary quotes
    let linksUsed = [];
    try {
        const rawLinksUsed = data?.linksUsed;
        if (rawLinksUsed) {
            linksUsed = rawLinksUsed.replace(/^\{/, '').replace(/\}$/, '').split('","').map(link => link.replace(/^"|"$/g, ''));
        }
    } catch (e) {
        console.error('Failed to parse linksUsed:', e);
    }

    // Manually parse pageNames and remove unnecessary quotes
    let pageNames = [];
    try {
        const rawPageNames = data?.pageNames;
        if (rawPageNames) {
            pageNames = rawPageNames.replace(/^\{/, '').replace(/\}$/, '').split('","').map(name => name.replace(/^"|"$/g, ''));
        }
    } catch (e) {
        console.error('Failed to parse pageNames:', e);
    }

    // Create a unique references array
    const uniqueReferences = Array.from(new Set(pageNames.map((name, index) => ({ name, link: linksUsed[index] }))))
        .filter(({ name, link }, index, self) =>
            index === self.findIndex((ref) => ref.name === name && ref.link === link)
        );

    const visibleReferences = isExpanded ? uniqueReferences : uniqueReferences.slice(0, 3);

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

            <div>
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
            </div>
            <div className='flex justify-center items-center'>
            <Button onClick={() => updateMutation.mutate()} className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center">
                {updateMutation.isPending && <LoaderCircle />}
                {!updateMutation.isPending && 'Regenerate'}
            </Button>
            </div>
            {updateMutation.isError && <div className="text-center text-red-500 mt-2">Error updating title: {updateMutation.error.message}</div>}
            {updateMutation.isSuccess && (
                <div className="text-center text-green-500 mt-2 flex flex-col items-center">

                    <p>Update successful... reload page</p>
                </div>
            )}
        </div>
    );
};

export default TitleabstractComponent;
