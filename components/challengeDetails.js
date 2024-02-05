import { CalendarIcon } from "@heroicons/react/24/outline"
import { EyeIcon } from "@heroicons/react/24/solid"

export default function ChallengeDetails(props) {
    return (
        <a onClick={()=>{props.setOpen(true); props.setChallenge(props.challenge)}} className="block hover:bg-gray-50 hover:cursor-pointer">
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="font-medium text-indigo-600 truncate">{props.challenge?.creater}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p>
                          Deadline: {props.challenge?.deadline}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="ml-5 flex-shrink-0">
                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </a>
    )
}