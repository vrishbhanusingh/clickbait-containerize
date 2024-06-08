import React from 'react'
import FileUpload from '~/components/fileUpload'


type Props = {
  params: {
      userId:string
  }
}
const page = ({ params: { userId } }: Props) => {
  return (
    <div className='flex flex-col items-center text-center'>
    <div className='flex-row'><FileUpload/></div>
    </div>
  )
}

export default page