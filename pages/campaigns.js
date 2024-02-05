"use client";
import CampaignDetails from "../components/campaignDetails";
import CampaignModal from "../components/campaignModal";
import InvestModal from "../components/investModal";
import { useContext, useEffect, useState } from "react";
import Web3Context from "../context/web3-context";

export default function Campaigns() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [currentCampaignDetails, setCurrentCampaignDetails] = useState();
  const [allCampaigns, setAllCampaigns] = useState([]);
  const { contract, account } = useContext(Web3Context);

  async function getCampaignDetails() {
    try {
      const farms = await contract?.methods
        .getAllCampaign()
        .call({ from: account });
      
      setAllCampaigns(farms.slice(1));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCampaignDetails();
  }, [contract]);

  console.log(allCampaigns);

  return (
    <div className="bg-white py-12 px-4">
      <div className="pb-2 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="pl-1 text-lg leading-6 font-medium text-gray-900">
          All Campaigns
        </h2>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      >
        {allCampaigns?.map((campaign) => (
          <CampaignDetails
            open={isModalOpen}
            setOpen={setIsModalOpen}
            setCampaign={setCurrentCampaignDetails}
            campaign={campaign}
          />
        ))}
      </ul>
      {isModalOpen == "farm" && (
        <CampaignModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          campaign={currentCampaignDetails}
        />
      )}
      {isModalOpen == "invest" && (
        <InvestModal open={isModalOpen} setOpen={setIsModalOpen} campaign={currentCampaignDetails} />
      )}
    </div>
  );
}
