import React from "react";
import { useUserData } from "../../component/Context/useUserData";
import { useState } from "react";
import Image from "next/image";
import Form from "./Form";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import {
  AccountCircle,
  Close,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import ModalForm from "./ModalForm";
import ModalForm2 from "./ModalForm2";
import PhraseBlock from "./PhraseBlock";

const NewProfile = () => {
  let [fileUrl, setFileUrl] = useState(null);
  let address = useUserData((state) => state.address);
  let avatar = useUserData((state) => state.avatar);
  let Username = useUserData((state) => state.username);

  let [username, setUsername] = useState(Username);
  let network = useUserData((state) => state.network);
  if (network == "polygon") {
    address = address.toLowerCase();
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   trying something new
  const style = {
    position: "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-60%, -50%)",
    width: "40rem",
    height: "30rem",
    bgcolor: "var(--menu-background)",
    border: "2px solid #000",
    boxShadow: 24,
    border: "none",
    borderRadius: "10px",
    color: "var(--font-color-unfocused)",
    p: 4,
  };

  //   end of something new code
  return (
    <div
      style={{
        color: "var(--font_color_focused)",
      }}
    >
      <div>
        <img
          src={avatar}
          alt="account upload"
          style={{
            display: "flex",
            width: 100,
            margin: "auto",
            borderRadius: "4.375rem",
          }}
        />
        <p style={{ textAlign: "center", margin: " 1rem 0" }}>{username}</p>
        {/* <Image src={avatar} alt="account upload" width={150} height={150} /> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0",
          marginBottom: "2rem",
          //   backgroundColor: "var(--button-color)",
        }}
      >
        <Button class="profile-btn" onClick={handleOpen}>
          <DriveFileRenameOutline />
          <span>Edit Profile</span>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ marginBottom: "2rem" }} onClick={handleClose}>
              <Close
                sx={{
                  position: "absolute",
                  //   top: ,
                  right: "5%",
                  transform: "translate(-5%, )",
                  "&:hover": { color: "red", cursor: "pointer" },
                  fontSize: "15px",
                }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  color: "var(--font-color-unfocused)",
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  width: "6vw",
                  marginBottom: "2rem",
                }}
              >
                <AccountCircle />
                profile
              </div>
              <div class="modal-box-2">
                <div>
                  <img
                    src={avatar}
                    alt="account upload"
                    style={{
                      display: "flex",
                      width: 100,
                      //   margin: "auto",
                      marginBottom: "1rem",
                      borderRadius: "4.375rem",
                    }}
                  />
                </div>
                <div>
                  <ModalForm />
                  <ModalForm2 />
                  <PhraseBlock />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <Divider
        style={{ borderBottom: "1px solid  var(--font-color-unfocused)" }}
      />
    </div>
  );
};

export default NewProfile;
