import { InformationCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Web3Context from "../context/web3-context";
import { useCallback, useContext, useEffect, useState } from "react";

export default function AccountDetails() {
  const { contract, account } = useContext(Web3Context);
  const [farmDetails, setFarmDetails] = useState({});
  const [statDetails, setStats] = useState({});
  const [campaignDetails, setCampaignDetails] = useState([]);

  const getFarms = useCallback(async () => {
    const farms = await contract?.methods
      .getUserFarmDetails()
      .call({ from: account });
    setFarmDetails(farms);

    const campaign = await contract?.methods
      .getCampaignForFarm(farms.farmId)
      .call({ from: account });
    setCampaignDetails(campaign);
    
    const statDetails = await contract?.methods
      .getStats(farms.farmId)
      .call({ from: account });
    setStats(statDetails);
    console.log(campaign[0]);
  });

  useEffect(() => {
    getFarms();
  }, []);

  const stats = [
    { name: 'Number of Campaigns', stat: statDetails[0] },
    { name: 'Total Amount Raised', stat: statDetails[1] },
    { name: 'Number of Investors', stat: statDetails[2] },
    { name: 'Challenges',stat: statDetails[3]}
    ]
    const people = [
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        // More people...
      ]
  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      action="#"
      method="POST"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <div className="mt-6 flex justify-between items-center border-b border-gray-200">
            <div>
              <h2 className="text-xl leading-6 font-medium text-gray-900">
                Your Farm
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                The farms that you created are shown below
              </p>
            </div>

            {farmDetails?.location? (
            <div className="flex flex-row justify-between gap-3">
                <Link
                href={"/create-campaign?farmId=" + farmDetails.farmId}
              >
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" /> Create Campaign
                </button>
              </Link>
            </div>
            ) : (
                <Link href="/create-farm">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-4 w-4 mr-1 " aria-hidden="true" />
                    Create Farm
                </button>
                </Link>
            )}
          </div>
        
        {farmDetails?.location ? (
        <>
            <dl className="mt-5 mb-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                        {stats.map((item) => (
                        <div
                            key={item.name}
                            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                        >
                            <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {item.stat}
                            </dd>
                        </div>
                        ))}
            </dl>
            <div className="my-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Location
                    </label>
                    <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={farmDetails?.location} disabled
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Description
                    </label>
                    <input
                    type="text"
                    name="url"
                    id="url"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={farmDetails?.description} disabled
                    />
                </div>

            </div>
            <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Campaign Id
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount raised
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Target Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {campaignDetails.map((campaign) => (
                            <tr key={campaign.campaignId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {campaign.campaignId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.currentAmount} ETH</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.targetAmount} ETH</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {campaign.status == 0 && 
                                <span class="flex items-center text-sm font-medium text-gray-900me-3">
                                    <span class="flex w-3.5 h-3.5 bg-blue-900 border-4 border-blue-200 rounded-full me-1.5 flex-shrink-0">
                                    </span>
                                    Pending
                                </span>}
                                {campaign.status == 1 && 
                                <span class="flex items-center text-sm font-medium text-gray-900  me-3">
                                    <span class="flex w-3.5 h-3.5 bg-green-900 border-4 border-green-200 rounded-full me-1.5 flex-shrink-0">
                                    </span>
                                    Accepted
                                </span>}
                                {campaign.status == 2 && 
                                <span class="flex items-center text-sm font-medium text-gray-900 me-3">
                                    <span class="flex w-3.5 h-3.5 bg-red-900 border-4 border--200 rounded-full me-1.5 flex-shrink-0">
                                    </span>
                                    Rejected
                                </span>}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                Edit
                                </a>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                  </table>
        </>
          ) : (
            <div className="flex items-center justify-center min-h-52">
              <p className="text-center font-semibold">No farms created yet!</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
