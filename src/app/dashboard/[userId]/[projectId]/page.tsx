import React from 'react'


type Props = {
  params: {
      userId:string
  }
}
const page = ({ params: { userId } }: Props) => {
  return (
    <div>page</div>
  )
}

export default page