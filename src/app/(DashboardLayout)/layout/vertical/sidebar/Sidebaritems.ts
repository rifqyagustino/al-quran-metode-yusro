export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[]; 
  url?: any;
  isPro?: boolean
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    isPro: true,
    heading: "DASHBOARD",
    children: [
      {
        name: "Dashboard",
        icon: "lucide:layout-dashboard",
        id: uniqueId(),
        url: "/",
        isPro: false
      },
      {
        name: "Modul",
        icon: "solar:book-linear",
        id: uniqueId(),
        url: "/modul",
        isPro: false
      },
      {
        name: "latihan",
        icon: "tabler:bulb",
        id: uniqueId(),
        url: "/latihan",
        isPro: false
      },
      {
        name: "Profil",
        icon: "iconamoon:profile-circle-light",
        id: uniqueId(),
        url: "/profil",
        isPro: false
      }
    ],
  },
];

export default SidebarContent;
