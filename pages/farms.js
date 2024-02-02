"use client";
import FarmDetails from "../components/farmDetails";
import FarmerModal from "../components/farmerModal";
import InvestModal from "../components/investModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useContext, useState } from "react";
import Web3Context from "../context/web3-context";

const people = [
  {
    name: "Jane Cooper",
  },
  {
    name: "Reetesh Deshmukh",
  },
  {
    name: "Arijit Singh",
  },
  {
    name: "Jane Cooper",
  },
  {
    name: "Reetesh Deshmukh",
  },
  {
    name: "Arijit Singh",
  },
  // More people...
];
const farms = [
  {
    farmAddress: "123 Main Street",
    cropType: "Wheat",
    creater: "ReeteshDeshmukh",
    location: "City A",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    securityAmount: 10000,
    fundRaised: 5000,
    documents: ["document1.pdf", "document2.pdf"],
    Requests: [1, 2, 3],
    contributors: ["John Doe", "Jane Doe"],
    investments: new Map([
      ["Investor1", 2000],
      ["Investor2", 3000],
    ]),
  },
  {
    farmAddress: "456 Oak Avenue",
    cropType: "Corn",
    creater: "ReeteshDeshmukh",
    location: "City B",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    securityAmount: 15000,
    fundRaised: 8000,
    documents: ["document3.pdf", "document4.pdf"],
    Requests: [4, 5],
    contributors: ["Alice Smith", "Bob Johnson"],
    investments: new Map([
      ["Investor3", 5000],
      ["Investor4", 3000],
    ]),
  },
  {
    farmAddress: "789 Pine Lane",
    cropType: "Rice",
    creater: "MSDhoni",
    location: "City C",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    securityAmount: 12000,
    fundRaised: 6000,
    documents: ["document5.pdf", "document6.pdf"],
    Requests: [6, 7, 8],
    contributors: ["Charlie Brown", "Diana Evans"],
    investments: new Map([
      ["Investor5", 4000],
      ["Investor6", 2000],
    ]),
  },
  {
    farmAddress: "101 Maple Street",
    cropType: "Barley",
    creater: "ViratKohli",
    location: "City D",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    securityAmount: 18000,
    fundRaised: 10000,
    documents: ["document7.pdf", "document8.pdf"],
    Requests: [9, 10],
    contributors: ["Eva White", "Frank Johnson"],
    investments: new Map([
      ["Investor7", 7000],
      ["Investor8", 3000],
    ]),
  },
  {
    farmAddress: "202 Pine Lane",
    cropType: "Soybean",
    creater: "AlexCook",
    location: "City E",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    securityAmount: 14000,
    fundRaised: 7500,
    documents: ["document9.pdf", "document10.pdf"],
    Requests: [11, 12],
    contributors: ["Grace Taylor", "Harry Brown"],
    investments: new Map([
      ["Investor9", 4000],
      ["Investor10", 3500],
    ]),
  },
  // Add more sample farms as needed
];
export default function Farms() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [currentFarmDetails, setCurrentFarmDetails] = useState(farms[0]);
  const [allFarms, setAllFarms] = useState([]);
  const { contract } = useContext(Web3Context);

  // console.log(contract.methods)

  // async function getAllFarms(){
  //   const farms = await contract.methods.getAllFarms().call();
  // }

  return (
    <div className="bg-white py-12 px-4">
      <div className="pb-2 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="pl-1 text-lg leading-6 font-medium text-gray-900">
          Registered Farms
        </h2>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {farms.map((farm) => (
          <FarmDetails
            setOpen={setIsModalOpen}
            setFarm={setCurrentFarmDetails}
            farm={farm}
          />
        ))}
      </ul>
      {isModalOpen == "farm" && (
        <FarmerModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          farm={currentFarmDetails}
        />
      )}
      {isModalOpen == "invest" && (
        <InvestModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </div>
  );
}
