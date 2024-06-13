

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";



export default function NavBar({projectId, userId}) {
  const navItems = [
    {
      path: `/dashboard/${userId}/`,
      name: "Home",
    },

    {
      path: `/dashboard/${userId}/${projectId}/clickbaitllama`,
      name: "ClickBait",
    },
    {
      path: `/dashboard/${userId}/${projectId}/title-gen-page`,
      name: "ClickBait+",
    },
    {
      path: `/dashboard/${userId}/${projectId}/pdf-chat`,
      name: "Research",
    },
    {
      path: `/dashboard/${userId}/${projectId}/search-ads-rag`,
      name: "SciRag",
    },

  ];
  let pathname = usePathname() || "/";

  // if (pathname.includes("/writing/")) {
  //   pathname = "/writing";
  // }



  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <div className="fixed top-20 z-50">
    <div className="border border-black-900/90 p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-teal-900/90 backdrop-blur-md shadow-2xl">
      
      <nav className="flex gap-2 relative justify-start w-full z-[100]  rounded-lg">
        {navItems.map((item, index) => {

          const isActive = item.path === pathname;
          
          return (
            
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                isActive ? "text-gray-100" : "text-zinc-200"
              }`}
              data-active={isActive}
              href={item.path}
              onMouseOver={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              <span>{item.name}</span>
              {item.path === hoveredPath && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full bg-stone-800/80 rounded-md -z-10"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%",
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.01,
                    stiffness: 500,
                    damping: 30,
                    duration: 0.25,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
    </div>
  );
}