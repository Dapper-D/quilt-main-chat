import React from "react";
import UAuth from "@uauth/js";

//INTERNAL IMPORT
import Style from "./discover.module.css";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import images from "../../../img";
import { connectTez } from "../../../Context/tezos";
import { uauth, unstop } from "../../../Context/unstoppable";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

import { useUserData } from "../../../Context/useUserData";
const ConnectWallet = () => {
  const login = useUserData((state) => state.login);
  const setNetwork = useUserData((state) => state.setNetwork);
  const [showConnectionOptions, setShowConnectionOptions] =
    React.useState(false);

  const { connectWallet } = React.useContext(NFTMarketplaceContext);
  // const login = useUserData((state) => state.login);
  // const setNetwork = useUserData((state) => state.setNetwork);
  // const setAvatar = useUserData((state) => state.setAvatar);

  //connect tezos
  const connectTezos = async () => {
    const address = await connectTez();
    login(address);
    setNetwork("tezos");
  };

  return (
    <section className={Style.container}>
      <div className={Style.discoverContainer}>
        <p className={Style.heading}>Connect, Create and Trade</p>
        <p className={Style.headingText}>
          Start enjoying the features of <strong>quilt</strong>
          <br />
          by connecting your wallet and <br />
          connecting with some of your favorite creators on{" "}
          <strong>quilt.</strong>{" "}
        </p>
        {!showConnectionOptions && (
          <Button
            btnName={"Connect Wallet"}
            classStyle={{ marginTop: "30px" }}
            handleClick={() => {
              setShowConnectionOptions(true);
            }}
          />
        )}

        {showConnectionOptions && (
          <div className={Style.connectWallet_box_provider}>
            <div
              className={Style.connectWallet_box_provider_item}
              onClick={() => connectWallet()}
            >
              <Image
                src={images.metamask}
                alt="metamask"
                width={100}
                height={100}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>Metamask</p>
            </div>

            <div
              className={Style.connectWallet_box_provider_item}
              onClick={() => connectTezos()}
            >
              <Image
                src={images.tezos}
                alt="tezos"
                width={100}
                height={100}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>Tezos</p>
            </div>

            <div
              className={Style.connectWallet_box_provider_item}
              onClick={() => unstop()}
            >
              <Image
                src={images.unstoppable}
                alt="unstoppable"
                width={100}
                height={100}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>Unstoppable</p>
              <p> Domain</p>
            </div>

            <div className={Style.connectWallet_box_provider_item}>
              <Image
                src={images.solana}
                alt="solana"
                width={100}
                height={100}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>Solana</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConnectWallet;
