import Web3Context from "../../context/web3-context";
import { useContext, useEffect, useState } from "react";

export default function AllocatedChallenge() {
  const { contract, account } = useContext(Web3Context);
  const [challenges, setChallenges] = useState([]);

  async function getAllocatedChallenges() {
    try {
      const challenges = await contract?.methods
        .getPendingComplaints()
        .call({ from: account });

      console.log(challenges[0]);

      setChallenges(challenges);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChallenegeApproval(id, isApproved) {
    try {
      const tx = await contract?.methods
        .handleComplaint(id, isApproved)
        .send({ from: account });

      console.log(tx);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllocatedChallenges();
  }, [contract]);

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
                Challenges
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                These challenges require approval
              </p>
            </div>

            <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Refresh
            </button>
          </div>

          {challenges.length > 0 ? (
            <>
              {challenges.map((challenge, index) => (
                <>
                  {challenge.deadline != 0 && (
                    <div
                      key={index}
                      className="flex justify-between items-start border rounded-xl p-4 bg-gray-50"
                    >
                      <div className="space-y-2">
                        <p className="text-base font-medium">
                          Challenge Id : {challenge.complaintId}
                        </p>
                        <p className="text-base font-medium">
                          Farm Id : {challenge.farmId}
                        </p>
                        <p className="text-base font-medium">
                          Campaign Id : {challenge.campaignId}
                        </p>
                        <p className="text-base font-medium">
                          Reason : {challenge.description}
                        </p>
                        <p className="text-base font-medium">
                          Deadline : {challenge.deadline}
                        </p>
                        <p className="text-base font-medium">
                          Proof :
                          {challenge.proofs.map((doc, index) => (
                            <p>doc</p>
                          ))}
                        </p>
                        <p className="text-base font-medium">
                          Yes votes : {challenge.yesVotes}
                        </p>
                        <p className="text-base font-medium">
                          No votes : {challenge.noVotes}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="border px-4 py-2 rounded-xl bg-gray-100"
                          onClick={() =>
                            handleChallenegeApproval(
                              challenge.complaintId,
                              true
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="border px-4 py-2 rounded-xl bg-gray-100"
                          onClick={() =>
                            handleChallenegeApproval(
                              challenge.complaintId,
                              false
                            )
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center min-h-52">
              <p className="text-center font-semibold">
                No challenges allocated yet!
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
