import Web3Context from "../../context/web3-context";
import { useContext, useEffect, useState } from "react";

export default function AllocatedFarms() {
  const { contract, account } = useContext(Web3Context);
  const [farms, setFarms] = useState([]);

  async function getAllocatedFarms() {
    try {
      const farms = await contract?.methods
        .getPendingFarms()
        .call({ from: account });

      console.log(farms[0]);

      setFarms(farms);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFarmApproval(farmId, isApproved) {
    try {
      const tx = await contract?.methods
        .handlePendingFarms(farmId, isApproved)
        .send({ from: account });

      console.log(tx);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllocatedFarms();
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
                Farms
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                These farms require approval
              </p>
            </div>
          </div>
          {farms.map((farm, index) => (
            <>
              {farm.description !== "" && (
                <div
                  key={index}
                  className="flex justify-between items-start border rounded-xl p-4 bg-gray-50"
                >
                  <div className="space-y-2">
                    <p className="text-base font-medium">
                      Farm Id : {farm.farmId}
                    </p>
                    <p className="text-base font-medium">
                      Location : {farm.location}
                    </p>
                    <p className="text-base font-medium">
                      Description : {farm.description}
                    </p>
                    <div className="w-fit flex gap-3">
                      <p className="text-base font-medium">
                        Farms Documents :{" "}
                      </p>
                      {farm.documents.map((doc, index) => (
                        <a key={index} href={doc}>
                          {doc}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="border px-4 py-2 rounded-xl bg-gray-100"
                      onClick={() => handleFarmApproval(farm.farmId, true)}
                    >
                      Accept
                    </button>
                    <button
                      className="border px-4 py-2 rounded-xl bg-gray-100"
                      onClick={() => handleFarmApproval(farm.farmId, false)}
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
