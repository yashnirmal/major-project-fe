import { useEffect, useState } from "react";
import Web3Context from "./web3-context";
import Web3 from "web3";
import Main from "../../build/contracts/Main.json";

export default function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    async function init() {
      const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
      setWeb3(web3);

      const netwrokId = await web3.eth.net.getId();
      const deployedNetwork = Main.networks?.[netwrokId]; // Use optional chaining here

      const contract = new web3.eth.Contract(Main.abi, deployedNetwork.address);
      setContract(contract);

      const temp = await web3.eth.getAccounts();
      setAccount(temp[0]);
      
      
      const user = await contract?.methods.getUserDetails().call({from:temp[0]});
      setUser(user);
      
      const officer = await contract?.methods.getOfficerDetails().call({from:temp[0]});
      setOfficer(officer);
    }
    init();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, contract, account, user , officer}}>
      {children}
    </Web3Context.Provider>
  );
}
