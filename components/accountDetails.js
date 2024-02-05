import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Web3Context from "../context/web3-context";
import { useCallback, useContext, useEffect, useState } from "react";

export default function AccountDetails() {
  const { contract, account } = useContext(Web3Context);
  const [farmDetails, setFarmDetails] = useState({});
  const [campaignDetails, setCampaignDetails] = useState({});

  const getFarms = useCallback(async () => {
    const farms = await contract?.methods
      .getUserFarmDetails()
      .call({ from: account });
    setFarmDetails(farms);

    const campaign = await contract?.methods
      .getCampaignForFarm(farms.farmId)
      .call({ from: account });
    setCampaignDetails(campaign[0]);
    console.log(campaign[0]);
  });

  useEffect(() => {
    getFarms();
  }, []);

  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      action="#"
      method="POST"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <div className="mt-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl leading-6 font-medium text-gray-900">
                Your Farms
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                The farms that you created are shown below
              </p>
            </div>

            <Link href="/create-farm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-4 w-4 mr-1 " aria-hidden="true" />
                Create Farm
              </button>
            </Link>
          </div>

          {farmDetails?.location ? (
            <div className="mt-6 flex flex-col justify-between border-[1.5px] p-3 rounded-xl bg-gray-50">
              <div className="flex gap-2 justify-between">
                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-semibold text-lg">Farm Id : </span>{" "}
                    {farmDetails?.farmId}
                  </p>
                  <p>
                    <span className="font-semibold text-lg">Location : </span>{" "}
                    {farmDetails?.location}
                  </p>
                  <p>
                    <span className="font-semibold text-lg">
                      Description :{" "}
                    </span>{" "}
                    {farmDetails?.description}
                  </p>
                </div>
                <div className="flex flex-col gap-6 items-end">
                  {!campaignDetails?.cropType && (
                    <Link
                      href={"/create-campaign?farmId=" + farmDetails.farmId}
                    >
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" /> Create
                        Campaign
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="mt-4 bg-white p-3 rounded-xl border">
                <p className="font-semibold">
                  Campaign ID : {campaignDetails?.campaignId}
                </p>
                <p className="font-semibold">
                  Farm ID : {campaignDetails?.farmId}
                </p>
                <p className="font-semibold">
                  Crop Type : {campaignDetails?.cropType}
                </p>
                <p className="font-semibold">
                  Description : {campaignDetails?.description}
                </p>
                <p className="font-semibold">
                  Current Amount : {campaignDetails?.currentAmount}
                </p>
                <p className="font-semibold">
                  Target Amount : {campaignDetails?.targetAmount}
                </p>
                <p className="font-semibold">
                  Security Amount : {campaignDetails?.securityAmount}
                </p>
                <p className="font-semibold">
                  Deadline : {campaignDetails?.deadline}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center font-semibold text-base mt-6">
              No farms created yet!
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
