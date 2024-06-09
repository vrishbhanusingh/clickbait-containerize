import React from 'react'


type Props = {
  params: {
      userId:string;
      projectId:string
  }
}
const page = ({ params: { userId, projectId } }: Props) => {
  return (
    <div>page
      {/* {projectId} */}
    </div>
    
  )
}

export default page