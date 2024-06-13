// import TopNav from '~/components/ui/dashTopNav';
// import InternalNavBar from '~/components/ui/internalNav';


// import Sidebar from '~/components/ui/sidebar/SideBar';
// import { TopBar } from '~/components/ui/topBar';
// import SideNav from "~/components/ui/sideNav";
// export default function Layout({ children }: { children: React.ReactNode }) {
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <div className="flex flex-grow">
      <SideNav  />
      <div className="flex-grow ml-64 p-4">
        {children}
      </div>
    </div>

  );
}