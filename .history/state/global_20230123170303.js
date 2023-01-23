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
};
