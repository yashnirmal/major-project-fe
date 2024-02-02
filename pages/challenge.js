"use client";
import ChallengeDetails from "../components/challengeDetails";
import ChallengeModal from "../components/challengeModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

const challenges = [
    {
      creater: 'Alice Johnson',
      officerInCharge: 'OfficerA',
      description: 'Implement decentralized energy solutions',
      proof: 'Blockchain-based energy transactions',
      complaintAddress: '0x1aBcDeF123456...', // Replace with an actual blockchain address
      yesVotes: 30,
      noVotes: 10,
      deadline: 1672531200000, // UNIX timestamp for the deadline (e.g., 01/01/2024)
      status: 'Pending',
      comments: 'Seeking partnerships with renewable energy providers.',
    },
    {
      creater: 'Bob Smith',
      officerInCharge: 'OfficerB',
      description: 'Tokenize community assets',
      proof: 'Smart contracts for asset ownership',
      complaintAddress: '0x2bCdEfG789012...', // Replace with an actual blockchain address
      yesVotes: 25,
      noVotes: 5,
      deadline: 1675209600000, // UNIX timestamp for the deadline (e.g., 02/01/2024)
      status: 'Approved',
      comments: 'Planning token sale to fund community projects.',
    },
    {
      creater: 'Charlie Brown',
      officerInCharge: 'OfficerC',
      description: 'Decentralized waste management system',
      proof: 'Blockchain traceability for waste disposal',
      complaintAddress: '0x3cDfGhI234567...', // Replace with an actual blockchain address
      yesVotes: 35,
      noVotes: 8,
      deadline: 1677888000000, // UNIX timestamp for the deadline (e.g., 03/01/2024)
      status: 'In Progress',
      comments: 'Testing IoT devices for waste bin monitoring.',
    },
    {
      creater: 'Diana Evans',
      officerInCharge: 'OfficerD',
      description: 'Blockchain-based voting system',
      proof: 'Transparent and secure voting on the blockchain',
      complaintAddress: '0x4dEfGhI567890...', // Replace with an actual blockchain address
      yesVotes: 40,
      noVotes: 12,
      deadline: 1680566400000, // UNIX timestamp for the deadline (e.g., 04/01/2024)
      status: 'Completed',
      comments: 'Analyzing voting data for future improvements.',
    },
    {
      creater: 'Eva White',
      officerInCharge: 'OfficerE',
      description: 'Decentralized identity verification',
      proof: 'Blockchain-based identity management',
      complaintAddress: '0x5eFgHiJ678901...', // Replace with an actual blockchain address
      yesVotes: 18,
      noVotes: 6,
      deadline: 1683244800000, // UNIX timestamp for the deadline (e.g., 05/01/2024)
      status: 'Pending',
      comments: 'Exploring partnerships with identity providers.',
    },
  ];
export default function Challenge() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentChallengeDetails,setCurrentChallengeDetails] = useState(challenges[0]);
  return (
    <div className="bg-white py-12 px-4">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Challenges
        </h2>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share
          </button>
          <Link href="/create-challenge">
            <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <PlusIcon className="h-4 w-4 mr-1 " aria-hidden="true"/>
                Create
            </button>
        </Link>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {challenges.map((challenge) => (
          <li key={challenge.creater}>
            <ChallengeDetails setOpen={setIsModalOpen} setChallenge={setCurrentChallengeDetails} challenge={currentChallengeDetails}/>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ChallengeModal open={isModalOpen} setOpen={setIsModalOpen} challenge={currentChallengeDetails} />
      )}
      <nav className="border-t border-gray-200 px-4 mt-2 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowLeftCircleIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        <a
          href="#"
          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          1
        </a>
        <a
          href="#"
          className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          aria-current="page"
        >
          2
        </a>
        <a
          href="#"
          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          3
        </a>
        <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
          ...
        </span>
        <a
          href="#"
          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          8
        </a>
        <a
          href="#"
          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          9
        </a>
        <a
          href="#"
          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          10
        </a>
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowRightCircleIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
    </nav>
    </div>
  );
}
