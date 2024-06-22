

// import SideNav from "~/components/ui/sideNav";

// import { fetchPapersByUser } from "~/app/actions/fetchPapersByUser";
// import {auth} from "@clerk/nextjs/server"
// import Header from "~/app/header";


// export default function Layout({ children }: { children: React.ReactNode }) {

//   return (

//     <div className="w-full" >
//       <Header />
//       <SideNav  />
//       <div className="h-[120px] w-full"></div>

//       <div className="ml-52 p-4">
//         {children}
//       </div>
//     </div>

//   );
// }

import SideNav from "~/components/ui/sideNav";
import Header from "~/app/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SideNav />
        <div className="flex-1 flex flex-col overflow-hidden ml-16">
          <div className="h-[120px] w-full"></div> {/* Spacer */}
          <div className="flex-1 p-4 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

