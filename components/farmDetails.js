import { CurrencyRupeeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function FarmDetails(props) {
    return (
        <div className="bg-gray-100 px-4 py-5 rounded mx-1 my-2">
            <div className="-ml-5 -mt-4 pb-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {props.farm.cropType}
                    </h3>
                    <p className="text-sm text-gray-500 break-all">
                      <a href="#" >@{props.farm.creater}</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0 flex">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={()=>{props.setOpen("farm"); props.setFarm(props.farm)}}
                  >
                  <InformationCircleIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    />
                  <span>Details</span>
                </button>
                <button
                  type="button"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={()=>{props.setOpen("invest"); props.setFarm(props.farm)}}
                >
                  <CurrencyRupeeIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Invest</span>
                </button>
              </div>    
            </div>
            <div className="divide-y divide-gray-100"> 
                    <div className="flex bg-gray-100 pt-1 pb-1 border-b border-gray-300 justify-between items-center flex-wrap sm:flex-nowrap min-w-0 gap-x-4">
                        <p className="text-sm leading-6 font-medium text-gray-700">
                        Farm Address
                        </p>
                        <p className="text-sm leading-6 font-medium text-gray-500"> 
                        {props.farm.farmAddress} 
                        </p>
                    </div>
                    <div className="flex bg-gray-100 pt-1 pb-1 justify-between items-center flex-wrap sm:flex-nowrap min-w-0 gap-x-4">
                        <p className="text-sm leading-6 font-medium text-gray-700">
                        Fund Raised
                        </p>
                        <p className="text-sm leading-6 font-medium text-gray-700"> 
                        ₹{props.farm.fundRaised}
                        </p>
                    </div>
            </div>
          </div>
    )
}