"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {

  const pathname = usePathname();


  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard"
    },
    {
      name: "Personal Accounts",
      path: "/dashboard/personal"
    },
    {
      name: "Company Accounts",
      path: "/dashboard/company"
    },
    {
      name: "Credit Card",
      path: "/dashboard/credit"
    },
    {
      name: "Upload Excel",
      path: "/dashboard/upload"
    },
    {
      name: "Settings",
      path: "/dashboard/settings"
    }
  ];



  return (

    <aside className="w-64 min-h-screen bg-slate-100 text-black p-5">


      <h1 className="text-2xl font-bold mb-8">
        DBBL Dashboard
      </h1>



      <nav className="space-y-3">


        {
          menuItems.map((item) => (


            <Link
              key={item.path}
              href={item.path}
              className={`
                block px-4 py-3 rounded-lg
                transition
                ${pathname === item.path
                  ?
                  "bg-orange-100"
                  :
                  "hover:bg-orange-300"
                }
              `}
            >

              {item.name}


            </Link>


          ))
        }


      </nav>


    </aside>

  );

}