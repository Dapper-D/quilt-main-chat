import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";

const PhraseBlock = () => {
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

  //   snackbar reset button
  const [open, setOpen] = React.useState(false);

  const handleClicked = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //   snackbar save button
  const [opened, setOpened] = React.useState(false);

  const handleClicking = () => {
    setOpened(true);
  };

  const handleClosing = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpened(false);
  };

  return (
    <div class="display" style={{ marginTop: "1.5rem" }}>
      Secret Phrase
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "1rem 0" }}>
          <Button class="phrase">Backup</Button>
          <Button
            class="phrase"
            handleClick={() => {
              sessionStorage.clear();
              alert("Token deleted!!!");
            }}
            onClick={handleClicked}
          >
            Reset
          </Button>
          {/* success message  */}

          {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Reset successful!
            </Alert>
          </Snackbar> */}

          {/* faliure message  */}

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Reset failed!
            </Alert>
          </Snackbar>
        </div>
        <div>
          <Button
            onClick={handleClicking}
            class="phrase"
            handleClick={() => onSubmit()}
          >
            Save
          </Button>

          {/* saving failed message  */}
          {/* <Snackbar
            open={opened}
            autoHideDuration={3000}
            onClose={handleClosing}
          >
            <Alert
              onClose={handleClosing}
              severity="error"
              sx={{ width: "100%" }}
            >
              Saving failed!
            </Alert>
          </Snackbar> */}

          {/* saving success message  */}
          <Snackbar
            open={opened}
            autoHideDuration={3000}
            onClose={handleClosing}
          >
            <Alert
              onClose={handleClosing}
              severity="success"
              sx={{ width: "100%" }}
            >
              Saved!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default PhraseBlock;
