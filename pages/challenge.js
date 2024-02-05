"use client";
import ChallengeDetails from "../components/challengeDetails";
import ChallengeModal from "../components/challengeModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Web3Context from "../context/web3-context";

export default function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChallengeDetails, setCurrentChallengeDetails] = useState();
  const {contract, account} = useContext(Web3Context);
  
  async function fetchAllChallenges(){
    try{
      const res = await contract?.methods?.getAllComplaints().call({from:account});
      console.log(res)
    setChallenges(res);
    }
    catch(err){
      console.err(err);
    }
  }
  
  useEffect(()=>{
    fetchAllChallenges();
  },[contract])
  
  console.log(challenges)
  
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
              <PlusIcon className="h-4 w-4 mr-1 " aria-hidden="true" />
              Create
            </button>
          </Link>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {challenges?.map((challenge) => (
          <li key={challenge.creater}>
            <ChallengeDetails
              setOpen={setIsModalOpen}
              setChallenge={setCurrentChallengeDetails}
              challenge={challenge}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ChallengeModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          challenge={currentChallengeDetails}
        />
      )}
    </div>
  );
}
