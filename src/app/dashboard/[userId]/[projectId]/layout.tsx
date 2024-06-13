"use client";
import TopNav from '~/components/ui/dashTopNav';
import InternalNavBar from '~/components/ui/internalNav';
import SideNav from '~/components/ui/sideNav';
import { useParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const { userId, projectId } = params;
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full flex justify-center'>
        {userId && projectId && (
          <InternalNavBar projectId={projectId} userId={userId} />
        )}
      </div>
      <div className='flex-grow z-auto'>{children}</div>
    </div>
  );
}