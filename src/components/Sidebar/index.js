import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { MdChecklist } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const sidebarMenu = {
    home: { name: "Home", icon: <HiHome /> },
    taskList: { name: "Task List", icon: <MdChecklist /> },
    notification: { name: "Notification", icon: <BiBell /> },
  };

  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    setActiveMenu(currentPath || "home");
  }, [location]);

  return (
    <>
      <div className="top-header">
        <div className="wrap">
          <div className="logo">
            <a href="/">Logo</a>
          </div>

          <div className="top-nav">
            <ul className="m-0 list-unstyled">
              {Object.entries(sidebarMenu).map(([key, value]) => {
                return (
                  <li
                    key={key}
                    className={
                      activeMenu === key ? "menulink activemenu" : "menulink"
                    }
                    onClick={() => setActiveMenu(key)}
                  >
                    <Link className="text-white text-capitalize" to={"/" + key}>
                      <span className="menuicons mr-2"> {value.icon}</span>{" "}
                      {value.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
