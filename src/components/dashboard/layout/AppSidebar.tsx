"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import {
  ChevronDownIcon
} from "@/icons";
import { NavItem } from "./types";
import { 
  LuCalendar, 
  LuCircleHelp, 
  LuDollarSign, 
  LuHandshake, 
  LuLayers, 
  LuLayoutGrid, 
  LuNotepadText, 
  LuSettings, 
  LuTags, 
  LuWallet 
} from "react-icons/lu";
import { APP_NAME } from "@/lib/constants";
import { useSubscriptionStore } from "@/stores/subscription/subscription";
import WalkthroughLink from "./WalkthroughLink";


const navItems: NavItem[] = [
  {
    icon: <LuLayoutGrid size={20} />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <LuHandshake size={20} />,
    name: "Deals",
    path: "/dashboard/deals"
  },
  {
    icon: <LuCalendar size={20} />,
    name: "Calendar",
    path: "/dashboard/calendar"
  },
  {
    icon: <LuNotepadText size={20} />,
    name: "Invoices",
    path: "/dashboard/invoices"
  },
  {
    icon: <LuDollarSign size={20} />,
    name: "Earnings",
    path: "/dashboard/earnings"
  },
  {
    icon: <LuWallet size={20} />,
    name: "Payments",
    path: "/dashboard/payments"
  },
  {
    icon: <LuTags size={20} />,
    name: "Brands",
    path: "/dashboard/brands"
  },
  {
    icon: <LuLayers size={20} />,
    name: "Templates",
    path: "/dashboard/templates"
  },
];

const bottomNavItems: NavItem[] = [
  {
    icon: <LuSettings size={20} />,
    name: "Settings",
    path: "/dashboard/settings",
  },
  {
    icon: <LuCircleHelp size={20} />,
    name: "Help",
    path: "/dashboard/settings/support",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const plan = useSubscriptionStore((state) => state.plan);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={` ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-brand-500"
                    : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/brand/kora-icon-with-text-transparent.png"
                alt={`${APP_NAME} Logo`}
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/brand/kora-icon-with-text.png"
                alt={`${APP_NAME} Logo`}
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/brand/kora-icon-transparent.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6 flex flex-col flex-1">
          <div className="flex flex-col gap-4 flex-1">
            <div>
              {renderMenuItems(navItems, "main")}
            </div>
            
            <div className="mt-auto flex flex-col">
              {/* Sidebar Upgrade Card */}
              {(isExpanded || isHovered || isMobileOpen) && plan === "FREE" && (
                <div className="mx-2 mb-6 p-4 rounded-2xl bg-linear-to-br from-brand-500/10 to-brand-500/5 dark:from-brand-500/15 dark:to-brand-500/5 border border-brand-200/50 dark:border-brand-500/20 text-center space-y-3 relative overflow-hidden transition-all duration-300">
                  <div className="absolute -right-8 -top-8 w-16 h-16 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Unlock Pro Features
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Get unlimited invoicing, auto WhatsApp reminders, and advanced analytics.
                  </p>
                  <Link
                    href="/dashboard/settings/subscription"
                    className="block w-full py-2 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/25 transition-all text-center"
                  >
                    Upgrade Now
                  </Link>
                </div>
              )}

              {/* Creator Walkthrough Video Link */}
              <WalkthroughLink
                isExpanded={isExpanded}
                isHovered={isHovered}
                isMobileOpen={isMobileOpen}
              />


              <div className="pt-6 pb-6 border-t border-gray-200 dark:border-gray-800">
                {renderMenuItems(bottomNavItems, "others")}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;

