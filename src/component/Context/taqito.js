import { Tzip12Module, tzip12 } from "@taquito/tzip12";
import { tzip16 } from "@taquito/tzip16";
import { TezosToolkit, compose } from "@taquito/taquito";

//INTERNAL  IMPORT
import { tezos } from "./tezos";

const contractAddress = "KT1XaGPSzM1z6e3q8GZuT4EkXpfqDx2Aodab";
const tokenId = 9;

export const getTeznft = () => {
  tezos.addExtension(new Tzip12Module());
  tezos.contract
    .at(contractAddress, compose(tzip12, tzip16))
    .then((contract) => {
      console.log(`Fetching the token metadata for the token ID ${tokenId}...`);
      return contract.tzip12().getTokenMetadata(tokenId);
    })
    .then((tokenMetadata) => {
      console.log(tokenMetadata);
    })
    .catch((error) => console.log(error));
};
const url =
  "https://api.ghostnet.tzkt.io/v1/tokens?contract=KT1XaGPSzM1z6e3q8GZuT4EkXpfqDx2Aodab";

export const getNft = (url) => {
  const nfts = fetch(url)
    .then((r) => r.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
  return nfts;
};

export const formatIPFSURL = (url) => {
  return "https://ipfs.io/ipfs/" + url.slice(7);
};
