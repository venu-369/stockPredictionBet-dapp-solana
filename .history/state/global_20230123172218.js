import { createContext, useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import {
  getProgram,
  getMasterAccountPk,
  getBetAccountPk,
} from "../utils/program";

import toast from "react-hot-toast";

export const GlobalContext = createContext({
  isConnected: null,
  wallet: null,
  hasUserAccount: null,
  allBets: null,
  fetchBets: null,
});

export const GlobalState = ({ children }) => {
  const [program, setProgram] = useState();
  const [isConnected, setIsConnected] = useState();
  const [masterAccount, setMasterAccount] = useState();
  const [allBets, setAllBets] = useState();
  const [userBets, setUserBets] = useState();

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  //set program
  useEffect(() => {
    if (connection) {
      setProgram(getProgram(connection, wallet ?? {}));
    } else {
      setProgram(null);
    }
  }, [connection, wallet]);

  //check for the wallet connection
  useEffect(() => {
    setIsConnected(!!wallet?.publicKey);
  }, [wallet]);

  const fetchMasterAccount = useCallback(async () => {
    if (!program) return;

    try {
      const masterAccountPk = await getMasterAccountPk();
      const masterAccount = await program.account.master.fetch(masterAccountPk);
      setMasterAccount(masterAccount);
    } catch (e) {
      console.log("couldnt fetch master account", e.message);
      setMasterAccount(null);
    }
  });

  //check for master ccount
  useEffect(() => {
    if (!masterAccount && program) {
      fetchMasterAccount();
    }
  }, [masterAccount, program]);

  const fetchBets = useCallback(async () => {
    if (!program) return;
    const allBetsResult = await program.account.bet.all();
    const allBets = allBetsResult.map((bet) => bet.account);
    setAllBets(allBets);

    //if you want you can use .filter to get just the users bets
  }, [program]);

  useEffect(() => {
    //fetch all bets if all bets doesnt exist
    if (!allBets) {
      fetchBets();
    }
  }, [allbets, fetchBets]);

  return (
    <GlobalContext.Provider
      value={{
        masterAccount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};