import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Web3Context from "../context/web3-context";
import Web3 from "web3";

export default function CreateFarm() {
  const [campaign, setCampaign] = useState({
    cropType: "",
    deadline: "",
    targetAmount: "",
    description: "",
    securityAmount: "",
  });
  const router = useRouter();
  const farmId = router.query.farmId;
  const { contract, account } = useContext(Web3Context);

  async function createCampaign() {
    const securityAmountInWei = Web3.utils.toWei(
      campaign.securityAmount,
      "ether"
    );

    try {
      const tx = await contract?.methods
        .createCampaign(
          farmId,
          campaign.cropType,
          campaign.deadline,
          campaign.targetAmount,
          campaign.description
        )
        .send({
          from: account,
          value: securityAmountInWei,
        });
      console.log(tx);
      router.push("/profile");
    } catch (err) {
      console.log("Error creating campaign", err);
    }
  }

  return (
    <div className="bg-white px-10 py-10">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create Campaign
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Crop Type
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                      <input
                        type="text"
                        className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        value={campaign.cropType}
                        placeholder="wheat, potatos etc."
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            cropType: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Description(how you will use the funds)
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      rows={3}
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={campaign.description}
                      placeholder="Crop seeds - 0.0001 wie,
                      Organic stuff - 0.0002 wie,
                      Labour - 0.0003 wie
                      "
                      onChange={(e) => {
                        setCampaign({
                          ...campaign,
                          description: e.target.value,
                        });
                      }}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Give description of your farm like area, soil type etc.
                    </p>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Deadline
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="date"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={campaign.deadline}
                      onChange={(e) => {
                        setCampaign({
                          ...campaign,
                          deadline: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    placeholder="in Wie"
                  >
                    Target Amount
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="number"
                      placeholder="in ETH"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={campaign.targetAmount}
                      onChange={(e) => {
                        setCampaign({
                          ...campaign,
                          targetAmount: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Security Amount
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="number"
                      placeholder="in ETH"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={campaign.securityAmount}
                      onChange={(e) => {
                        setCampaign({
                          ...campaign,
                          securityAmount: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
            <button
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={createCampaign}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
