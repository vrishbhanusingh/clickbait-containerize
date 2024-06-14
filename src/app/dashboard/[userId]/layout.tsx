
import SideNav from "~/components/ui/sideNav";

import { fetchPapersByUser } from "~/app/actions/fetchPapersByUser";
import {auth} from "@clerk/nextjs/server"


export default function Layout({ children }: { children: React.ReactNode }) {

  return (

    <div className="flex">
      <SideNav  />
      <div className="ml-64 p-4">
        {children}
      </div>
    </div>

  );
}