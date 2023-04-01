import React, { useState, useEffect } from "react";
// TODO 2.a - Setup a Beacon Wallet instance
// import { useUserData } from "./useUserData";
import { MichelsonMap, OpKind, TezosToolkit } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";

import { useUserData } from "./useUserData";
import { getNft } from "./taqito";
import { loadState } from "../components/Loader/loading";
// Setup Tezos Toolkit

export const tezos = new TezosToolkit("https://ghostnet.smartpy.io");

// TODO 2.b - Complete connectWallet function
export const connectTez = async () => {
  // const login = useUserData((state) => state.login);
  if (typeof window !== "undefined") {
    const wallet = new (await import("@taquito/beacon-wallet")).BeaconWallet({
      name: "Quilt",
      // iconUrl: "https://tezostaquito.io/img/favicon.svg",
      preferredNetwork: "ghostnet",
    });
    await wallet.requestPermissions({ network: { type: "ghostnet" } });
    tezos.setWalletProvider(wallet);
    const activeAccount = await wallet.client.getActiveAccount();
    // console.log(activeAccount);

    return activeAccount.address;
  } else {
    console.log("err");
  }
};

// TODO 2.c - Complete getAccount function
// const getAccount = async () => {
//   const activeAccount = await wallet.client.getActiveAccount();
//   if (activeAccount) {
//     return activeAccount.address;
//   } else {
//     return "";
//   }
// };
const url =
  "https://api.ghostnet.tzkt.io/v1/contracts/KT1AaUpkUTEgrqPfUFSXmzR4MtHBX5HLiRju/storage/";

export const mintTez = async (user, uri, price, quantity, router, setLoad) => {
  const fa2Contract = await tezos.wallet.at(
    "KT1AaUpkUTEgrqPfUFSXmzR4MtHBX5HLiRju"
  );
  let metadata = {};

  getNft(uri).then((e) => {
    Object.entries(e).forEach((entry) => {
      const [key, value] = entry;
      value = value.toString();
      key = key.toString();
      metadata[key] = char2Bytes(value);
    });

    const token_info = MichelsonMap.fromLiteral(metadata);

    console.log("Waiting for wallet confirmation...");
    // const batch = tezos.wallet.batch(transactions);
    getNft(url).then((storage) => {
      const token_id = storage.all_tokens;
      token_id = Number(token_id);

      fa2Contract.methods
        .mint(user, quantity, token_info, token_id)
        .send()
        .then((op) => {
          console.log(`Waiting for ${op.opHash} to be confirmed...`);
          return op.confirmation(1).then(() => op.opHash);
        })
        .then((hash) => {
          console.log(`Operation injected: https://ghost.tzstats.com/${hash}`);
          setLoad(false);
          router.push("/searchPage");
        })
        .catch((error) => {
          console.log(`Error: ${JSON.stringify(error, null, 2)}`);
          setLoad(false);
          alert(error.message);
        });
    });
  });
};
