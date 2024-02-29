import AccountDetails from "../components/accountDetails";
import ProfileDetails from "../components/profileDetails";
import InvestmentDetails from "../components/investmentDetails";
import {
  CogIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import Web3Context from "../context/web3-context";
import AllocatedChallenge from "../components/allocatedChallenge";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const [option, setOption] = useState("profile");
  const { user, officer } = useContext(Web3Context);
  console.log(officer);
  return (
    <div className="pt-6 bg-white text-gray-700">
      {/* <main className="relative -mt-32"> */}
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        {/* <h1 className="text-3xl font-bold text-gray-700">Settings</h1> */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                <a
                  onClick={() => {
                    setOption("profile");
                  }}
                  className={classNames(
                    option === "profile"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                      : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                  )}
                >
                  <UserCircleIcon
                    className={classNames(
                      option === "profile"
                        ? "text-indigo-500 group-hover:text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">Profile</span>
                </a>
                {officer?.name != "" && (
                    <a
                    onClick={() => {
                      setOption("challenges");
                    }}
                    className={classNames(
                      option === "challenges"
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                        : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                    )}
                  >
                    <CurrencyDollarIcon
                      className={classNames(
                        option === "challenges"
                          ? "text-indigo-500 group-hover:text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">Challenges</span>
                  </a>
                )}
                {user?.userType === "farmer" && (
                  <a
                    onClick={() => {
                      setOption("account");
                    }}
                    className={classNames(
                      option === "account"
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                        : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                    )}
                  >
                    <CogIcon
                      className={classNames(
                        option === "account"
                          ? "text-indigo-500 group-hover:text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">Farms</span>
                  </a>
                )}
                
                {user?.userType === "investor" && (
                  <a
                    onClick={() => {
                      setOption("investments");
                    }}
                    className={classNames(
                      option === "investments"
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                        : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                    )}
                  >
                    <CurrencyDollarIcon
                      className={classNames(
                        option === "investments"
                          ? "text-indigo-500 group-hover:text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">Investments</span>
                  </a>
                )}
              </nav>
            </aside>

            {option === "profile" && <ProfileDetails />}
            {option === "account" && <AccountDetails />}
            {option === "investments" && <InvestmentDetails />}
            {option === "challenges" && <AllocatedChallenge />}
          </div>
        </div>
      </div>
      {/* </main> */}
    </div>
  );
}
