import React from "react";
import { useUserData } from "../../component/Context/useUserData";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_BYADDRESS } from "../../component/graphql/queries";
import {
  AccountBalanceWallet,
  ContentCopy,
  Facebook,
  Instagram,
  Language,
  Mail,
  Twitter,
} from "@mui/icons-material";
import { Button } from "@mui/material";

const Form = () => {
  let address = useUserData((state) => state.address);
  let avatar = useUserData((state) => state.avatar);
  let network = useUserData((state) => state.network);
  let Username = useUserData((state) => state.username);
  let setUsername = useUserData((state) => state.setUsername);
  let Email = useUserData((state) => state.email);
  let setEmail = useUserData((state) => state.setEmail);
  let Bio = useUserData((state) => state.bio);
  let setBio = useUserData((state) => state.setBio);
  let Webpage = useUserData((state) => state.webpage);
  let setWebpage = useUserData((state) => state.setWebpage);
  let [username, setusername] = useState(Username);
  let [email, setemail] = useState(Email);
  let [description, setdescription] = useState(Bio);
  let [website, setwebsite] = useState(Webpage);

  if (network == "polygon") {
    address = address.toLowerCase();
  }

  //   const { loading, error, data } = useQuery(GET_PROFILE_BYADDRESS, {
  //     variables: { address: address },
  //     pollInterval: 1000,
  //   });

  const onSubmit = async () => {
    updateEmail({ variables: { address: address, email: email } });
    updateUsername({ variables: { address: address, username: username } });
    const ProfileUpdateDto = {
      bio: description,
      profilePicture: avatar,
      coverPicture: "Str",
      externalLink: website,
    };
    updateProfile({
      variables: {
        address: address,
        body: ProfileUpdateDto,
      },
    });
  };
  const copy = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            placeholder={username}
            onChange={(e) => setusername(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid var(--border-color)",
              //   color: " var(--font_color_focused)",
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "transparent",
              marginTop: "0.5rem",
              color: " var(--border-color)",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <label htmlFor="email">Email</label>
          <div
            style={{
              width: "104%",
              border: "1px solid var(--border-color)",
              borderRadius: "1rem",
              alignItems: "center",
              display: "flex",
              gap: "1rem",
              marginTop: "0.3rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                backgroundColor: "var(--border-color)",
                padding: "0.8rem 1rem",
                color: "black",
                display: "grid",
                // cursor: "pointer",
                // width: "100%",
                // backgroundColor: " var(--border-color)",
              }}
            >
              <Mail />
            </div>
            <input
              style={{
                width: "100%",
                border: "none",
                //   color: " var(--font_color_focused)",
                padding: "1rem",
                borderRadius: "1rem",
                backgroundColor: "transparent",
                // marginTop: "0.5rem",
                color: " var(--border-color)",
                outline: "none",
              }}
              type="text"
              onChange={(e) => setemail(e.target.value)}
              placeholder={email}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <label
            style={{
              fontSize: "1.3rem",
            }}
            htmlFor="description"
          >
            Description
          </label>
          <div
            style={{
              width: "104%",
              borderRadius: "1rem",
              border: "1px solid var(--border-color)",
            }}
          >
            <textarea
              style={{
                width: "97%",
                backgroundColor: "transparent",
                outline: "none",
                borderRadius: "1rem",
                padding: "1rem",
                color: "var(--border-color)",
                border: "1px solid var(--transparent )",
              }}
              name=""
              id=""
              cols="30"
              rows="6"
              onChange={(e) => setdescription(e.target.value)}
              placeholder={description}
            ></textarea>
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <label htmlFor="website">Website</label>
          <div
            style={{
              width: "104%",
              border: "1px solid var(--border-color )",
              borderRadius: "1rem",
              alignItems: "center",
              display: "flex",
              gap: "1rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                backgroundColor: "var(--border-color )",
                padding: "1rem 1rem",
                color: "black",
                display: "grid",
                outline: "none",
              }}
            >
              <Language />
            </div>
            <input
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "var(--border-color)",
                padding: "1rem",
                border: "none",
                outline: "none",
              }}
              type="text"
              onChange={(e) => setwebsite(e.target.value)}
              placeholder={website}
            />
          </div>
        </div>

        <div
          style={{
            width: "104%",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {/* facebook */}
          <div>
            <label
              style={{
                display: "block",
                width: "104%",
                fontWeight: "700",
                fontSize: "1.3rem",
              }}
              htmlFor="facebook"
            >
              Facebook
            </label>
            <div
              style={{
                width: "100%",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                alignItems: " center",
                display: "flex",
                gap: "1rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  //   fontSize: "2rem",
                  backgroundColor: "var(--border-color ) ",
                  padding: "0.5rem 1rem",
                  color: "black",
                  //   display: "grid",
                }}
              >
                <Facebook sx={{ fontSize: "2rem" }} />
              </div>
              <input
                style={{
                  padding: "1rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--border-color )",
                  outline: "none",
                }}
                type="text"
                placeholder="facebook"
              />
            </div>
          </div>
          {/* twitter */}
          <div>
            <label
              style={{
                display: "block",
                width: "104%",
                fontWeight: "700",
                fontSize: "1.3rem",
              }}
              htmlFor="twitter"
            >
              Twitter
            </label>
            <div
              style={{
                width: "100%",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                alignItems: " center",
                display: "flex",
                gap: "1rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  //   fontSize: "2rem",
                  backgroundColor: "var(--border-color ) ",
                  padding: "0.5rem 1rem",
                  color: "black",
                  //   display: "grid",
                }}
              >
                <Twitter sx={{ fontSize: "2rem" }} />
              </div>
              <input
                style={{
                  padding: "1rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--border-color )",
                  outline: "none",
                }}
                type="text"
                placeholder="twitter"
              />
            </div>
          </div>
          {/* instagram */}
          <div>
            <label
              style={{
                display: "block",
                width: "104%",
                fontWeight: "700",
                fontSize: "1.3rem",
              }}
              htmlFor="instagram"
            >
              Instagram
            </label>
            <div
              style={{
                width: "100%",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                alignItems: " center",
                display: "flex",
                gap: "1rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  //   fontSize: "2rem",
                  backgroundColor: "var(--border-color ) ",
                  padding: "0.5rem 1rem",
                  color: "black",
                  //   display: "grid",
                }}
              >
                <Instagram sx={{ fontSize: "2rem" }} />
              </div>
              <input
                style={{
                  padding: "1rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--border-color )",
                  outline: "none",
                }}
                type="text"
                placeholder="instagram"
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "700",
              fontSize: "1.3rem",
            }}
            htmlFor="wallet"
          >
            Wallet Address
          </label>
          <div
            style={{
              width: "104%",
              border: "1px solid var(--border-color)",
              borderRadius: "1rem",
              alignItems: " center",
              display: "flex",
              gap: "1rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                //   fontSize: "2rem",
                backgroundColor: "var(--border-color ) ",
                padding: "0.5rem 1rem",
                color: "black",
                //   display: "grid",
              }}
            >
              <AccountBalanceWallet sx={{ fontSize: "2rem" }} />
            </div>
            <input
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--border-color )",
                outline: "none",
              }}
              type="text"
              placeholder={address}
            />
            <div
              style={{
                //   fontSize: "2rem",
                backgroundColor: "var(--border-color ) ",
                padding: "0.5rem 1rem",
                color: "black",
                //   display: "grid",
                cursor: "pointer",
              }}
            >
              <ContentCopy sx={{ fontSize: "2rem" }} onClick={() => copy()} />
            </div>
          </div>
        </div>
        <div
          style={{
            margin: "4rem 0%",
            translate: "20%",
            width: "80%",
            // backgroundColor: "red",
            display: "flex",
          }}
        >
          <Button className="button" handleClick={() => onSubmit()}>
            Update profile
          </Button>
          <Button
            className="button"
            handleClick={() => {
              sessionStorage.clear();
              alert("Token deleted!!!");
            }}
          >
            Reset token
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
