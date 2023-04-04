import React from "react";
import { useUserData } from "../../component/Context/useUserData";
import { useState } from "react";
import Image from "next/image";
import Form from "./Form";

const Profile = () => {
  let [fileUrl, setFileUrl] = useState(null);
  let address = useUserData((state) => state.address);
  let avatar = useUserData((state) => state.avatar);
  let network = useUserData((state) => state.network);
  if (network == "polygon") {
    address = address.toLowerCase();
  }
  return (
    <div
      style={{
        color: "var(--font_color_focused)",
        // marginLeft: "4rem",
        margin: "auto",
        width: "100%",
        height: "80vh",
        overflowY: "scroll",
        scrollbarColor: "red",
        // backgroundColor: "red",
      }}
    >
      <div>
        <h1
          style={{ fontSize: "4rem", lineHeight: "1.5", textAlign: "center" }}
        >
          Profile settings
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.3rem",
            // width: "80%",
            lineHeight: "1.2",
            paddingBottom: ".5rem",
            margin: "2rem 12rem ",
          }}
        >
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>

      <div>
        <img
          src={avatar}
          alt="account upload"
          style={{
            display: "flex",
            width: 150,
            margin: "auto",
            borderRadius: "4.375rem",
          }}
        />
        <p style={{ textAlign: "center", margin: " 1rem 0" }}>Change</p>
        {/* <Image src={avatar} alt="account upload" width={150} height={150} /> */}
      </div>
      <div
        style={{
          //   backgroundColor: "red",
          // textAlign: "center",
          fontSize: "1.3rem",
          // width: "80%",
          lineHeight: "1.2",
          paddingBottom: ".5rem",
          margin: "3rem 10rem ",
        }}
      >
        <Form />
      </div>
    </div>
  );
};

export default Profile;
