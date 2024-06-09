'use client'
import React from 'react'
import GenratedTitlePaper from '~/components/titleGenPaper'
import { useParams } from 'next/navigation';
type Props = {}

const titleGen  = (props: Props) => {
const params = useParams();
  const { userId, projectId } = params;
  console.log(projectId)
    return (
    <div> titleGen 

        <GenratedTitlePaper paperId = {projectId} /> 
    </div>
  )
}

export default titleGen 