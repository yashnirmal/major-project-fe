import { useContext, useEffect, useState } from "react";
import Web3Context from "../context/web3-context";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};
export default function InvestmentDetails() {
  const { account, contract } = useContext(Web3Context);
  const [investments, setInvestments] = useState([]);

  async function getInvestorsInvestments() {
    try {
      const res = await contract?.methods
        ?.getInvestorsInvestments()
        .call({ from: account });
      console.log(res);
      setInvestments(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getInvestorsInvestments();
  }, [contract]);

  return (
    <div
      className="divide-y divide-gray-200 lg:col-span-9"
      action="#"
      method="POST"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Your Investments
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your investment information will be displayed here.
          </p>

          <div>
            {investments.length === 0 && (
              <p className="text-center font-semibold text-base mt-6">
                No haven't made any investments yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
