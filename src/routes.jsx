import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Leads, Conversations } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { HelpCircle, LineChartIcon, Settings } from "lucide-react";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <LineChartIcon {...icon} />,
        name: "Leads",
        path: "/leads",
        element: <Leads />,
      },
      {
        icon: <ChatBubbleBottomCenterIcon {...icon} />,
        name: "Conversations",
        path: "/conversations",
        element: <Conversations />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Account",
        path: "/account",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
