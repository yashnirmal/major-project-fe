import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Web3Context from "../context/web3-context";

export default function CreateFarm() {
  const [farmDetails, setFarmDetails] = useState({
    location: "",
    description: "",
    documents: [""],
  });
  const router = useRouter();
  const { contract, account } = useContext(Web3Context);

  async function registerFarm() {
    try {
      const tx = await contract?.methods
        .createFarm(
          farmDetails.location,
          farmDetails.description,
          farmDetails.documents
        )
        .send({
          from: account,
        });
        router.push("/profile");
      console.log(tx);
    } catch (err) {
      console.log("Error creating farm", err);
    }
  }

  return (
    <div className="bg-white px-10 py-10">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Farm Details
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
                  Location (exact location)
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={farmDetails.location}
                      onChange={(e) => {
                        setFarmDetails({
                          ...farmDetails,
                          location: e.target.value,
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
                    Description(like area, soil type etc.)
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      rows={3}
                      className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={farmDetails.description}
                      onChange={(e) => {
                        setFarmDetails({
                          ...farmDetails,
                          description: e.target.value,
                        });
                      }}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Give description of your farm like area, soil type etc.
                    </p>
                  </div>
                </div>


                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Documents
                  </label>
                  <div className="mt-1 space-y-6 sm:mt-0 sm:col-span-2">
                    {farmDetails.documents.map((document, index) => (
                      <div className="flex gap-4 items-center">
                        <input
                          type="text"
                          className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                          value={document}
                          onChange={(e) => {
                            const newDocuments = [...farmDetails.documents];
                            newDocuments[index] = e.target.value;
                            setFarmDetails({
                              ...farmDetails,
                              documents: newDocuments,
                            });
                          }}
                        />
                        {index === farmDetails.documents.length - 1 && (
                          <button
                            onClick={() => {
                              const newDocuments = [...farmDetails.documents];
                              newDocuments.push("");
                              setFarmDetails({
                                ...farmDetails,
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
                        {index !== farmDetails.documents.length - 1 && (
                          <button
                            onClick={() => {
                              const newDocuments = [...farmDetails.documents];
                              newDocuments.splice(index, 1);
                              setFarmDetails({
                                ...farmDetails,
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

                    {/* <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div> */}
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
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
            <button
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={registerFarm}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
