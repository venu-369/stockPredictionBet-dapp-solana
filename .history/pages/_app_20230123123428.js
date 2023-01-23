import { useEffect, useMemo, useState } from "react";
import { RPC_ENDPOINT } from "../utils/constants";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
