"use client";
import InternalNavBar from "~/components/ui/internalNav";
import SideNav from "~/components/ui/sideNav";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const { userId, projectId } = params;
  return (
    <div className="flex flex-col items-center">
      {userId && projectId && (
        <InternalNavBar projectId={projectId} userId={userId} />
      )}
      <div className="w-full">{children}</div>
    </div>
  );
}
