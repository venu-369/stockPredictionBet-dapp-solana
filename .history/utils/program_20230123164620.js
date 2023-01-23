import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import { MINIMUM_REMAINING_TIME_UNTIL_EXPIRY, PROGRAM_ID } from "./constants";

//create a dfunction that gets the solana program we created
export const getprogram = (connection, wallet) => {
  const IDL = require("./idl.json");
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};

const getprogramAccountPk = async (seeds) => {
  return (await PublicKey.findProgramAddress(seeds, PROGRAM_ID))[0];
};
