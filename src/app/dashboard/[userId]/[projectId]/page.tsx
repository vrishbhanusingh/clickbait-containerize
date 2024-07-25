import React from 'react'


type Props = {
  params: {
      userId:string;
      projectId:string
  }
}
const page = ({ params: { userId, projectId } }: Props) => {
  return (
    <div className='flex items-center justify-center min-h-screen'><h2>Your paper is cooking.... Please wait a few seconds and choose your service.</h2>
      {/* {projectId} */}
    </div>
    
  )
}

export default page