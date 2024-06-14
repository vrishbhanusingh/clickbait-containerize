// import TopNav from '~/components/ui/dashTopNav';
// import InternalNavBar from '~/components/ui/internalNav';


// import Sidebar from '~/components/ui/sidebar/SideBar';
// import { TopBar } from '~/components/ui/topBar';
// import SideNav from "~/components/ui/sideNav";
// export default function Layout({ children }: { children: Reauplct.ReactNode }) {
//   return (
//     <div className="flex">
//     <SideNav  />
//     {/* <div><InternalNavBar/></div> */}
//     <div className="flex  justify-center ">
//     {children}
//   </div>
// </div>

//       // <div className='flex-grow'>{children}</div>

//   );
// }

import SideNav from "~/components/ui/sideNav";

import { fetchPapersByUser } from "~/app/actions/fetchPapersByUser";
import {auth} from "@clerk/nextjs/server"


export default function Layout({ children }: { children: React.ReactNode }) {

  return (

    <div className="w-full" >
      <SideNav  />
      <div className="h-[120px] w-full"></div>

      <div className="ml-52 p-4">
        {children}
      </div>
    </div>

  );
}