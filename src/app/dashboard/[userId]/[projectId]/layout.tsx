import TopNav from '~/components/ui/dashTopNav';
import InternalNavBar from '~/components/ui/internalNav';

import SideNav from '~/components/ui/sideNav';
import Sidebar from '~/components/ui/sidebar/SideBar';
import { TopBar } from '~/components/ui/topBar';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <div className=''>
      {/* <TopBar />
      <Sidebar mobileOrientation='start' /> */}
      <div><InternalNavBar/></div>

      </div>
      <div>{children}</div>
    </div>
  );
}