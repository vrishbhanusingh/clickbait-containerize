'use client'
import React from 'react'
import GenratedTitlePaper from '~/components/titleGenPaper'
import { useParams } from 'next/navigation';
import { db } from '~/server/db';
import { papers, chats, messages as _messages, generatedTitles } from '~/server/db/schema';
import { GeneratedTitleComponent, TitleabstractComponent } from '~/components/TitleabstractComponent';
import ShowGenTitle from '~/components/ui/showGenTitle';
type Props = {}

const titleGen  = (props: Props) => {
  const params = useParams();
  const { userId, projectId } = params;


    return (
    <div className='w-full flex justify-center items-center'>  
      <TitleabstractComponent paperId = {projectId} />
    </div>
  )
}

export default titleGen 