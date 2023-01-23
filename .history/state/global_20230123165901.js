import { createContext, useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import {
  getProgram,
  getMasterAccountPk,
  getBetAccountPk,
} from "../utils/program";
