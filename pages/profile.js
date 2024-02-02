import AccountDetails from "../components/accountDetails";
import ProfileDetails from "../components/profileDetails";
import UpdatePassword from "../components/updatePassword";
import {
    CogIcon,
    CreditCardIcon,
    KeyIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

const subNavigation = [
  { name: "Profile", href: "profile", icon: UserCircleIcon},
  { name: "Farms", href: "account", icon: CogIcon}
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const [option,setOption] = useState("profile");
  return (
    <div className="pt-6 bg-white text-gray-700">
      {/* <main className="relative -mt-32"> */}
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        {/* <h1 className="text-3xl font-bold text-gray-700">Settings</h1> */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={()=>{setOption(item.href)}}
                    className={classNames(
                      item.href === option
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                        : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                    )}
                    aria-current={item.href === option ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.href === option
                          ? "text-indigo-500 group-hover:text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </nav>
            </aside>

            {option === "profile" && <ProfileDetails/>}
            {option === "account" && <AccountDetails/>}
            {option === "password" && <UpdatePassword/>}

          </div>
        </div>
      </div>
      {/* </main> */}
    </div>
  );
}
