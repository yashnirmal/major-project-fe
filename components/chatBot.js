import { Dialog, Transition } from "@headlessui/react";
import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import Web3Context from "../context/web3-context";
import { Fragment } from "react";
import { useRouter } from "next/router";

export function ChatBot(props) {
    const { account, contract,web3 } = useContext(Web3Context);
    const [userInput,setUserInput] = useState('')
    const [chatHistory,setChatHistory] = useState([
        {role: 'assistant',content: "Is the farm located in a region certified for organic farming by a recognized body?"}
    ])
    const [isLoading,setIsLoading] = useState(false);
    const [userAnswers,setUserAnswers] = useState([]);
    const router = useRouter();
    const [questionNumber, setQuestionNumber] = useState(1);

    const handleUserInput = async () => {
        try {
            setIsLoading(true);
            setChatHistory((prevChat) => [
                ...prevChat,
                {role: 'user',content: userInput},
            ]);
            setUserAnswers([
                ...userAnswers,
                userInput === "yes"
            ]);
            if(questionNumber === 5) {
                handleUserAnswers();
                return ;
            }
            const tx = await contract.methods.getQuestion(questionNumber).call();
            setQuestionNumber(questionNumber+1);
            setChatHistory((prevChat) => [
                ...prevChat,
                {role: 'assistant',content: tx},
            ]);
            setUserInput('');
            setIsLoading(false);
        } catch (err) {
            console.log("Error registering user", err);
        }
    }

    const handleUserAnswers = () => {
        props.setOpen(false);
        // if((userAnswers[0] && ((!userAnswers[1]) || (!userAnswers[2]))) || 
        // (!userAnswers[0] && userAnswers[3] && !userAnswers[4]) 
        // // (userAnswers[5] && (!userAnswers[6] || !userAnswers[7])) || 
        // // (!userAnswers[5] && userAnswers[8]) || 
        // // (userAnswers[9] && (!userAnswers[10] || !userAnswers[11])) || 
        // // (!userAnswers[9] && userAnswers[12]) || 
        // // (userAnswers[13] && (!userAnswers[14] || !userAnswers[15])) ||
        // // (userAnswers[13] && userAnswers[16])
        // ) {
        //     alert("Sorry your challenge seems suscpicious");
        //     router.push("/challenge");
        // } else {
        //     console.log(userAnswers[0],userAnswers[1], userAnswers[2])
            props.createChallenge();
        // }
    }
    return (
        <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-100 p-2 "> 
                    <div className="w-full max-w-screen-md mg-whte p-4 rounded-lg shadow-md">
                        <div className="ml-4 ">
                            <div className="text-4sl font-bold text-blue-800 mb-2 ">
                                Chatbot Assistant
                            </div>
                        </div>
                        <div className="mb-4" style={{height:'400px',overflow: 'auto'}}>
                            {chatHistory.map((message,index) => (
                                <div 
                                    key={index} 
                                    className={`${ message.role ==='user' ? 'text-right': 'text-left'} mb-2`}>
                                        <div className={`rounded-full p-2 max-w-md mx-4 inline-block ${message.role ==='user'? 'bg-blue-300 text-blue-800' : 'bg-gray-300 text-gray-800'}`}>
                                            {message.role ==='user' ? 'H': 'A'}
                                        </div>
                                        <div className={`max-w-md mx-4 my-2 inline-block ${message.role ==='user' ? 'bg-blue-300 text-blue-800' : 'bg-gray-300 text-gray-800'} p-2 rounded-md`}>
                                            {message.content}
                                        </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Please answer in 'yes' or 'no'"
                                value={userInput}
                                onChange={(e) => {setUserInput(e.target.value)}}
                                className="flex-1 p-2 rounded-1-lg text-gray-800 focus:outline-none"
                            /> 
                            {isLoading ? (
                                <div className="bg-blue-500 text-white p-2 rounded-r-lg animate-pulse">
                                    Loading...
                                </div>
                            ): 
                                (
                                    <button onClick={handleUserInput} 
                                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"> 
                                        Answer
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    );
}