import { ArrowRightIcon, CheckIcon, InformationCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Web3Context from "../context/web3-context";
import { useCallback, useContext, useEffect, useState } from "react";

export default function AllocatedChallenge() {
  const { contract, account } = useContext(Web3Context);
  const [challenges, setChallenges] = useState([]);
  const [comment, setComment] = useState("");

  function handleDate() {
    var dateObject = new Date();
    var seconds = dateObject.getTime()/1000;
    return seconds;
  }
  const getAllocatedChallenges = async () => {
    const tx = await contract?.methods
        .getAllocatedComplaint(parseInt(handleDate()))
        .send({from : account});
    console.log(tx);

    const challenges = await contract?.methods
        .getComplaintsForOfficer()
        .call({ from: account });
        setChallenges(challenges);
    console.log(challenges);
  };

  const handleDecison = async (isGuilty) => {
    const tx = await contract?.methods
        .handleOfficerDecison(challenges[0].complaintId, challenges[0].farmId, comment, isGuilty)
        .send({ from : account });
    console.log(tx);
  }

  useEffect(() => {
    getAllocatedChallenges();
  }, []);

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
                Allocated Challenges
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Challenges allocated to you will be shown below.
              </p>
            </div>
          </div>
        
      {challenges.length > 0 ? (
      <>
          <div className="my-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Farm Id 
                    </label>
                    <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={challenges[0].farmId} disabled
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Raised by
                    </label>
                    <input
                    type="text"
                    name="url"
                    id="url"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={challenges[0].creater} disabled
                    />
                </div>
                <div className="col-span-12">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Description
                    </label>
                    <input
                    type="text"
                    name="url"
                    id="url"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={challenges[0].description} disabled
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Yes Votes
                    </label>
                    <input
                    type="text"
                    name="url"
                    id="url"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={challenges[0].yesVotes} disabled
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    No Votes
                    </label>
                    <input
                    type="text"
                    name="url"
                    id="url"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    defaultValue={challenges[0].noVotes} disabled
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Comment
                    </label>
                    <input
                    type="text"
                    name="url"
                    id="url"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="please mention your reason"
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                </div>

                <div className="flex flex-row justify-between gap-3">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={()=>{handleDecison(true)}}>
                    <CheckIcon className="-ml-1 mr-2 h-5 w-5" /> Guilty
                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={()=>{handleDecison(false)}}>
                    <XMarkIcon className="h-5 w-5 mr-1 " aria-hidden="true" /> Not Guilty
                </button>
            </div>
            </div>
      </>
        ) : (
          <div className="flex items-center justify-center min-h-52">
            <p className="text-center font-semibold">No challenges allocated yet!</p>
          </div>
        )}
        
        </div>
      </div>
    </form>
  );
}
