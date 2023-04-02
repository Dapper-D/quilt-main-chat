import { ethers } from "ethers";
export const connectWallet = async () => {
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
      console.log("error");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const getBalance = await provider.getBalance(accounts[0]);
    const bal = ethers.utils.formatEther(getBalance);
    setAccountBalance(bal);
  } catch (error) {
    console.log(error);
  }
};
