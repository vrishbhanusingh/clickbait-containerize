import TopNav from '~/components/ui/dashTopNav';
import InternalNavBar from '~/components/ui/internalNav';

import SideNav from '~/components/ui/sideNav';
import Sidebar from '~/components/ui/sidebar/SideBar';
import { TopBar } from '~/components/ui/topBar';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <TopBar />
      <div className='flex flex-grow'>
      
      {/* <Sidebar mobileOrientation='start' /> */}
      {/* <div><InternalNavBar/></div> */}

      </div>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}