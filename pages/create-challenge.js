import { useContext, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Web3Context from "../context/web3-context";
import { ChatBot } from "../components/chatBot";
import Web3 from 'web3'

export default function CreateFarm() {
  const [challengeDetails, setChallengeDetails] = useState({
    farmId: "",
    reason: "",
    documents: [""],
    deadline: "",
    stackAmount: "",
  });
  const { contract, account } = useContext(Web3Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDate(date) {
    var dateObject = new Date(date);
    var seconds = dateObject.getTime()/1000;
    return seconds;
  }
  async function createChallenge() {
    try {
      const securityAmountInWei = Web3.utils.toWei(
        challengeDetails.stackAmount,
        "ether"
      );
      const tx = await contract?.methods
        .createComplaint(parseInt(challengeDetails.farmId), challengeDetails.reason, challengeDetails.documents, handleDate(challengeDetails.deadline))
        .send({ from: account, value: securityAmountInWei });
      console.log(tx);
      window.location.href = "/challenge";
    } catch (err) {
      console.log("Error creating challenge", err);
    }
  }

  return (
    <div className="bg-white px-10 py-10">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Challenge Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Farm Id
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={challengeDetails.farmId}
                      onChange={(e) => {
                        setChallengeDetails({
                          ...challengeDetails,
                          farmId: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Reason
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={challengeDetails.reason}
                      onChange={(e) => {
                        setChallengeDetails({
                          ...challengeDetails,
                          reason: e.target.value,
                        });
                      }}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about yourself.
                    </p>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Stack Amount
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="number"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={challengeDetails.stackAmount}
                      onChange={(e) => {
                        setChallengeDetails({
                          ...challengeDetails,
                          stackAmount: e.target.value,
                        });
                      }}
                    />
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
                      value={challengeDetails.deadline}
                      onChange={(e) => {
                        setChallengeDetails({
                          ...challengeDetails,
                          deadline: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Documents
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2 space-y-4">
                    {challengeDetails.documents.map((document, index) => (
                      <div className="flex gap-4 items-center">
                        <input
                          type="text"
                          className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                          value={document}
                          onChange={(e) => {
                            const newDocuments = [
                              ...challengeDetails.documents,
                            ];
                            newDocuments[index] = e.target.value;
                            setChallengeDetails({
                              ...challengeDetails,
                              documents: newDocuments,
                            });
                          }}
                        />
                        {index === challengeDetails.documents.length - 1 && (
                          <button
                            onClick={() => {
                              const newDocuments = [
                                ...challengeDetails.documents,
                              ];
                              newDocuments.push("");
                              setChallengeDetails({
                                ...challengeDetails,
                                documents: newDocuments,
                              });
                            }}
                            className="rounded-full border-[1.5px] border-gray-500 px-2 py-1.5 hover:bg-gray-100"
                          >
                            <PlusIcon
                              className="w-4 h-5 text-gray-500"
                              strokeWidth={3}
                            />
                          </button>
                        )}
                        {index !== challengeDetails.documents.length - 1 && (
                          <button
                            onClick={() => {
                              const newDocuments = [
                                ...challengeDetails.documents,
                              ];
                              newDocuments.splice(index, 1);
                              setChallengeDetails({
                                ...challengeDetails,
                                documents: newDocuments,
                              });
                            }}
                            className="rounded-full border-[1.5px] border-gray-500 px-2 py-1.5 hover:bg-gray-100"
                          >
                            <MinusIcon
                              className="w-4 h-5 text-gray-500"
                              strokeWidth={3}
                            />
                          </button>
                        )}
                      </div>
                    ))}
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
            >
              Cancel
            </button>
            <button
              onClick={()=> {setIsModalOpen(true)}}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Raise
            </button>
          </div>
        </div>
        {isModalOpen && (
            <ChatBot open={isModalOpen} setOpen={setIsModalOpen} createChallenge={createChallenge}/>
        )}
      </div>
    </div>
  );
}
