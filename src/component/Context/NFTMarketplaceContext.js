import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTStorage } from "nft.storage";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const projectId = process.env.PROJECT_ID;
const projectSecretKey = process.env.PROJECT_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)};`;

//nft.storage
const endpoint = "https://api.nft.storage";
const token = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;

const subdomain = process.env.SUBDOMAIN;
// const address = useUserData((state) => state.address);

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//INTERNAL  IMPORT
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  transferFundsAddress,
  transferFundsABI,
} from "./constants";
import { useUserData } from "./useUserData";
import { loadState } from "../components/Loader/loading";
import { mintTez } from "./tezos";
import { formatIPFSURL } from "./taqito";
import Loading from "../components/NewDesignComp/Loading/Loading";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

export const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

//----TRANSFER FUNDS

const fetchTransferFundsContract = (signerOrProvider) =>
  new ethers.Contract(transferFundsAddress, transferFundsABI, signerOrProvider);

const connectToTransferFunds = async () => {
  try {
    // const web3Modal = new Wenb3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/22e93319c7504d95a136f7c2c31714b4"
    );
    const signer = provider.getSigner();
    const contract = fetchTransferFundsContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, socialize, collect, and sell Art ";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const router = useRouter();
  const login = useUserData((state) => state.login);
  const setNetwork = useUserData((state) => state.setNetwork);
  const network = useUserData((state) => state.network);
  const user = useUserData((state) => state.address);
  const [load, setLoad] = useState(false);
  const [nfts, setNfts] = useState([]);

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        return setOpenError(true), setError("Install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        login(accounts[0]);
        // console.log(accounts[0]);
      } else {
        setError("No Account Found");
        setOpenError(true);
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      setOpenError(true);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    // connectingWithSmartContract();
  }, []);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // setCurrentAccount(accounts[0]);
      login(accounts[0]);
      setNetwork("polygon");
      // window.location.reload();
      if (accounts.length) {
        // setCurrentAccount(accounts[0]);
        login(accounts[0]);
      } else {
        setError("No Account Found");
        setOpenError(true);
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    } catch (error) {
      setError("Error while connecting to wallet");
      setOpenError(true);
    }
  };

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  // Upload nft metadata to IPFS using nft.storage
  async function uploadMetadataToIPFS(metadata) {
    const storage = new NFTStorage({ endpoint, token });
    const nft_metadata = await storage.store(metadata);

    return nft_metadata.url;
  }

  //---CREATENFT FUNCTION
  const createNFT = async (
    name,
    price,
    image,
    description,
    router,
    decimals,
    tags,
    license,
    quantity
  ) => {
    // console.log({ name, price, description, image });
    if (!name || !description || !image)
      return setError("Data Is Missing"), setOpenError(true);
    else {
      try {
        //Upload Metadata to IPFS

        console.log("uploading metadata...");

        setLoad(true);

        const creator = user;
        const displayUri = image;
        const symbol = "QUILT";
        const metadata = {
          name,
          description,
          image,
          symbol,
          displayUri,
          creator,
          decimals,
          tags,
          license,
        };
        console.log(metadata);
        const url = await uploadMetadataToIPFS(metadata);

        const uri = formatIPFSURL(url);

        //Mint NFT
        if (network == "tezos") {
          mintTez(user, uri, price, quantity, router, setLoad);
        } else {
          if (await mintNft(url)) {
            router.push("/searchPage");
          }
        }
      } catch (error) {
        console.log(error);
        setError("Error while creating NFT");
        setOpenError(true);
        setLoad(false0);
      }
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingFee();

      const transaction = !isReselling
        ? await contract.mintAndListNft(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.listNft(NFTMarketplaceAddress, id, price, {
            value: listingPrice.toString(),
          });

      console.log({ transaction });

      const receipt = await transaction.wait();
      console.log({ receipt });
      setLoad(false);
      return true;
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      setLoad(false);
      alert(error);
    }
  };

  //-- MintNft FUNCTION
  const mintNft = async (url) => {
    try {
      console.log({ url });

      const contract = await connectingWithSmartContract();

      const transaction = await contract.mintNft(
        await contract.signer.getAddress(),
        url
      );

      console.log({ transaction });

      const receipt = await transaction.wait();
      console.log({ receipt });
      setLoad(false);
      return true;
    } catch (error) {
      setError("error while minting NFT");
      setOpenError(true);
      setLoad(false);
      alert(error);
    }
  };

  //--FETCHNFTS FUNCTION

  const fetchNFTs = async (type) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.maticvigil.com/v1/8240e5368feb46af698cc4a178ec7859e91c23d1"
      );
      const contract = fetchContract(provider);

      const data =
        type == "listedNfts"
          ? await contract.getListedNfts()
          : await contract.getNfts();

      // console.log({ data })

      const items = [];

      for (let i = 0; i < data.length; i++) {
        const {
          tokenId,
          tradeId,
          seller,
          owner,
          listed,
          price: unformattedPrice,
          nftContract: contractAddress,
        } = data[i];

        let tokenURI = await contract.tokenURI(tokenId);
        if (tokenURI.slice(0, 7) == "ipfs://") {
          tokenURI = formatIPFSURL(tokenURI);
        }
        try {
          let {
            data: { image, name, description },
          } = await axios.get(tokenURI);

          if (image.slice(0, 7) == "ipfs://") {
            image = formatIPFSURL(image);
          }
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );
          items.push({
            price,
            contractAddress,
            tokenId: tokenId.toNumber(),
            tradeId: tradeId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
            listed,
          });
        } catch (err) {
          console.log(err);
        }
      }

      // console.log({ items });
      return items;
    } catch (error) {
      setError("Error while fetching NFTS");
      setOpenError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs().then((res) => {
      setNfts(res);
    });
  }, []);

  //--FETCHINF AN NFT WITH ID
  async function fetchNFT(id) {
    try {
      const contract = await connectingWithSmartContract();

      const res = await contract.getNft(Number(id));

      const {
        tokenId,
        tradeId,
        seller,
        owner,
        listed,
        price: unformattedPrice,
        nftContract: contractAddress,
      } = res;

      let tokenURI = await contract.tokenURI(tokenId);

      if (tokenURI.slice(0, 7) == "ipfs://") {
        tokenURI = formatIPFSURL(tokenURI);
      }

      let {
        data: { image, name, description },
      } = await axios.get(tokenURI);

      if (image.slice(0, 7) == "ipfs://") {
        image = formatIPFSURL(image);
      }
      const price = ethers.utils.formatUnits(
        unformattedPrice.toString(),
        "ether"
      );

      return {
        price,
        contractAddress,
        tokenId: tokenId.toNumber(),
        tradeId: tradeId.toNumber(),
        seller,
        owner,
        listed,
        image,
        name,
        description,
        tokenURI,
      };
    } catch (error) {
      console.log(error);
      setError("Error while fetching NFT");
      setOpenError(true);
    }
  }

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const nfts =
        type == "fetchItemsListed"
          ? await contract.getUserListedNfts(await contract.signer.getAddress())
          : await contract.getUserNfts(await contract.signer.getAddress());

      const items = [];
      // console.log({ nfts });

      for (let nft of nfts) {
        const {
          tokenId,
          tradeId,
          seller,
          owner,
          listed,
          price: unformattedPrice,
          nftContract: contractAddress,
        } = nft;

        let tokenURI = await contract.tokenURI(tokenId);

        if (tokenURI.slice(0, 7) == "ipfs://") {
          tokenURI = formatIPFSURL(tokenURI);
        }

        try {
          let {
            data: { image, name, description },
          } = await axios.get(tokenURI);

          if (image.slice(0, 7) == "ipfs://") {
            image = formatIPFSURL(image);
          }
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          items.push({
            price,
            contractAddress,
            tokenId: tokenId.toNumber(),
            tradeId: tradeId.toNumber(),
            seller,
            owner,
            image,
            listed,
            name,
            description,
            tokenURI,
          });
        } catch (err) {
          console.log(err);
        }
      }
      // console.log({ items });
      return items;
    } catch (error) {
      console.log(error);
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.buyNft(
        nft.contractAddress,
        nft.tokenId,
        {
          value: price,
        }
      );

      await transaction.wait();
      router.push("/newDashboard");
    } catch (error) {
      console.log(error);
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  //------------------------------------------------------------------
  //---TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        console.log(address, ether, message);

        const unFormatedPrice = ethers.utils.parseEther(ether);
        // //FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormatedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormatedPrice,
          message
        );

        console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ALL TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        console.log(transactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        nfts,
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
      }}
    >
      {load ? <Loading /> : children}
      {/* {children} */}
      {/* {children} */}
    </NFTMarketplaceContext.Provider>
  );
};
