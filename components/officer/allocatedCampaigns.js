import { useContext, useEffect, useState } from "react";
import Web3Context from "../../context/web3-context";

export default function AllocatedCampaigns() {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const { contract, account } = useContext(Web3Context);

  async function getCampaignDetails() {
    try {
      const campaigns = await contract?.methods
        .getPendingCampaigns()
        .call({ from: account });

      console.log(campaigns);
      setAllCampaigns(campaigns);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCampaignApproval(campaignId, isApproved) {
    try {
      const tx = await contract?.methods
        .handlePendingCampaign(campaignId, isApproved)
        .send({ from: account });

      console.log(tx);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCampaignDetails();
  }, [contract]);

  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      action="#"
      method="POST"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div className="space-y-4">
          <div className="mt-6 flex justify-between items-center border-b border-gray-200">
            <div>
              <h2 className="text-xl leading-6 font-medium text-gray-900">
                Campaigns
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                These campaigns require approval
              </p>
            </div>
          </div>

          {allCampaigns.map((campaign, index) => (
            <>
              {campaign.description !== "" && (
                <div
                  key={index}
                  className="flex justify-between items-start border rounded-xl p-4 bg-gray-50"
                >
                  <div className="space-y-2">
                    <p className="text-base font-medium">
                      Campaign Id : {campaign.campaignId}
                    </p>
                    <p className="text-base font-medium">
                      Farm Id : {campaign.farmId}
                    </p>
                    <p className="text-base font-medium">
                      Crop Type : {campaign.cropType}
                    </p>
                    <p className="text-base font-medium">
                      Description : {campaign.description}
                    </p>
                    <p className="text-base font-medium">
                      Deadline : {campaign.deadline}
                    </p>
                    <p className="text-base font-medium">
                      Receiver : {campaign.receiver}
                    </p>
                    <p className="text-base font-medium">
                      Target Amount : {campaign.targetAmount}
                    </p>
                    <p className="text-base font-medium">
                      Security Amount : {campaign.securityAmount}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="border px-4 py-2 rounded-xl bg-gray-100"
                      onClick={() =>
                        handleCampaignApproval(campaign.campaignId, true)
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="border px-4 py-2 rounded-xl bg-gray-100"
                      onClick={() =>
                        handleCampaignApproval(campaign.campaignId, false)
                      }
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </form>
  );
}
