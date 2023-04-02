import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ethers } from "ethers";
// import "./App.css";
// import Image from "next/image";
// import images from "../../public/img";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import {
  AccountCircle,
  AutoAwesome,
  AutoAwesomeMotion,
  ChatBubbleOutline,
  Check,
  Close,
  Explore,
  GroupAdd,
  KeyboardArrowRight,
  Public,
} from "@mui/icons-material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import Profile from "./AccountPage/Form/Profile";

import { connectTez } from "../../component/Context/tezos";
import { useUserData } from "../../component/Context/useUserData";

// import { NFTMarketplaceContext } from "../../component/Context/NFTMarketplaceContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const address = useUserData((state) => state.address);
  const network = useUserData((state) => state.network);
  const login = useUserData((state) => state.login);
  const setNetwork = useUserData((state) => state.setNetwork);
  // for etherium
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // for connect walletconnect
  const [anchorE2, setAnchorE2] = React.useState(null);
  const opened = Boolean(anchorE2);
  const handleClock = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorE2(null);
  };
  //polygon
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

  // combine polygon and close function
  const handlePolygon = () => {
    handleClosed();
    connectWallet();
  };

  //connect tezos
  const connectTezos = async () => {
    const address = await connectTez();
    login(address);
    setNetwork("tezos");
  };

  // combine tezos and close function
  const handleTezos = () => {
    handleClosed();
    connectTezos();
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <div
        style={{
          height: "4rem",
          // backgroundColor: "red",
          width: "84vw",
          display: "flex",
          alignContent: "center",
          justifyContent: "right",
          borderBottom: "1px solid rgb(59,59,64)",
        }}
      >
        <div
          style={{
            // width: "40%",
            // backgroundColor: "blue",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              color: "var(--font-color-unfocused)",
              "&:hover": {
                color: "var(--font_color_focused)",
              },
              borderRadius: "10px",
              border: "1px solid rgb(4,227,106)",
              padding: "0 1rem",
            }}
            id="button"
            aria-controls={opened ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={opened ? "true" : undefined}
            onClick={handleClock}
          >
            Connect Wallet
          </Button>

          <Menu
            style={{
              marginTop: "1rem",
              // borderRadius: "40px",
            }}
            id="menu"
            anchorEl={anchorE2}
            open={opened}
            onClose={handleClosed}
            MenuListProps={{
              "aria-labelledby": "button",
            }}
          >
            <MenuList
              dense
              className="
              color-change-3x"
              sx={{
                width: "28rem",
                height: "30rem",
                marginTop: -1,
                marginBottom: -1,
                padding: "1rem 0",
                paddingTop: 0,
                color: "var(--font_color_focused)",
                // borderRadius: "40px",
              }}
            >
              <MenuItem>
                <ListItemText
                  // inset
                  sx={{
                    textAlign: "center",
                    "&:hover": { cursor: "default" },
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    // paddingRight: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingBottom: ".7rem",
                        // color: "var(--font_color_focused)",
                      }}
                    >
                      Connect to a Wallet
                    </span>
                    {/* <br /> */}
                    <span style={{ fontSize: "12px" }}>
                      By connecting to a wallet, i agree to Quilts Terms of Use,
                      <br />
                      Cookies Policy, use of 3rd party services and Privacy
                      Policy.
                    </span>
                  </div>
                </ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  marginLeft: "2rem",
                  marginBottom: "1rem",
                  paddingLeft: "1rem",
                  paddingBottom: "1rem",
                  borderLeft: "2px solid #5cb282",
                  borderBottom: "2px dashed #5cb282",
                }}
                onClick={() => handlePolygon()}
              >
                <img
                  src="/img/metamask.png"
                  alt="metamask"
                  style={{ width: "60px" }}
                />
                <ListItemText inset>
                  <p style={{ fontSize: "16px" }}>Metamask</p>
                </ListItemText>
              </MenuItem>

              <MenuItem
                sx={{
                  marginLeft: "2rem",
                  marginBottom: "1rem",
                  paddingLeft: "1rem",
                  paddingBottom: "1rem",
                  borderLeft: "2px solid #5cb282",
                  borderBottom: "2px dashed #5cb282",
                }}
                onClick={() => handleTezos()}
              >
                <img
                  src={"/img/tezos.png"}
                  alt="tezos"
                  style={{ width: "60px" }}
                />
                <ListItemText inset>
                  <p style={{ fontSize: "16px" }}>tezos</p>
                </ListItemText>
              </MenuItem>

              <MenuItem
                sx={{
                  marginLeft: "2rem",
                  marginBottom: "1rem",
                  paddingLeft: "1rem",
                  paddingBottom: "1rem",
                  borderLeft: "2px solid #5cb282",
                  borderBottom: "2px dashed #5cb282",
                }}
              >
                <img
                  src={"/img/unstoppable.png"}
                  alt="unstoppable"
                  style={{ width: "60px" }}
                />
                <ListItemText inset>
                  <p style={{ fontSize: "16px" }}>unstoppable</p>
                </ListItemText>
              </MenuItem>

              <MenuItem
                sx={{
                  marginLeft: "2rem",
                  paddingLeft: "1rem",
                  paddingBottom: "1rem",
                  borderLeft: "2px solid #5cb282",
                  // borderBottom: "2px dashed #5cb282",
                }}
              >
                <img
                  src={"/img/solana.png"}
                  alt="solana"
                  style={{ width: "60px" }}
                />
                <ListItemText inset>
                  <p style={{ fontSize: "16px" }}>solana</p>
                </ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: "1rem",
              width: "30%",
              // backgroundColor: "red ",
            }}
          >
            <span
              style={{
                width: "90%",
              }}
            >
              <div
                style={{
                  color: "var(--font_color_focused)",
                  fontSize: "10px",
                  lineHeight: "1rem",
                  // width: "30%",
                  overflowX: "clip",
                }}
              >
                {address}
              </div>
              <p
                style={{
                  textAlign: "left",
                  color: "var(--font-color-unfocused)",
                  fontSize: "13px",
                }}
              >
                {network}
              </p>
            </span>
            <KeyboardArrowRight
              style={{
                color: "var(--font_color_focused)",
              }}
            />
          </Button>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            // margin: "auto",
            padding: 0,
          }}
        >
          <MenuList
            dense
            sx={{
              marginTop: -2,
              marginBottom: -1,
              paddingTop: 3,
              backgroundColor: "var(--menu-background)",
              width: "18rem",
              textAlign: "left",

              color: "var(--font-color-unfocused)",
              paddingLeft: "1rem",
            }}
          >
            <div
              style={{
                // textAlign: "right",

                display: "flex",
                // flexDirection: "row",

                color: "var(--font_color_focused)",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "14px" }}>User Info</span>
              <span onClick={handleClose}>
                <Close
                  sx={{
                    "&:hover": { color: "red", cursor: "pointer" },
                    fontSize: "15px",
                  }}
                />
              </span>
            </div>
            <MenuItem>
              <ListItemText inset>Single</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset>1.15</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset>Double</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              Custom: 1.2
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>profile</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText>Add space after paragraph</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>Custom spacing...</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {value === index && (
        <Box sx={{ p: 3, mt: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  // experimental code

  const [activeTab, setActiveTab] = useState(0);
  const combinedValue = value !== undefined ? value : activeTab;

  const handleTabClick = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChange = (event, newActiveTab) => {
    handleTabClick(event, newActiveTab);
    handleChange(event, newActiveTab);
  };
  // end of experiment

  return (
    <Box
      sx={{
        flexGrow: 1,
        // bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        indicatorColor="secondary"
        value={combinedValue}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
        className="font-color-unfocused"
        sx={{ borderRight: 1, borderColor: "rgb(59,59,64)", width: "16%" }}
      >
        <span
          style={{
            margin: "auto",
            marginTop: "2rem",
            marginBottom: "2rem",
            // width: "10rem",
            // height: "5rem",
            // backgroundColor: "red",
          }}
        >
          <img
            src={"/img/quilt-logo.svg"}
            alt="Quilt"
            style={{
              width: "5rem",
              height: "2rem",
              objectFit: "fill",
            }}
          />
        </span>
        <Tab
          style={{ color: combinedValue === 1 ? "red" : "inherit" }}
          label={
            <span
              style={{
                color: "var(--font-color-unfocused)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 60,
                marginBottom: "1rem",
              }}
            >
              <ChatBubbleOutline />
              Chat
            </span>
          }
          {...a11yProps(1)}
        />
        <Tab
          style={{ color: combinedValue === 2 ? "red" : "inherit" }}
          label={
            <span
              style={{
                color: "var(--font-color-unfocused)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
                marginBottom: "1rem",
              }}
            >
              <Explore />
              Community
            </span>
          }
          {...a11yProps(2)}
        />
        <Tab
          style={{ color: combinedValue === 3 ? "red" : "inherit" }}
          label={
            <span
              style={{
                color: "var(--font-color-unfocused)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 40,
                marginBottom: "1rem",
              }}
            >
              <GroupAdd />
              Friends
            </span>
          }
          {...a11yProps(3)}
        />
        <Tab
          style={{ color: combinedValue === 4 ? "red" : "inherit" }}
          label={
            <span
              style={{
                color: "var(--font-color-unfocused)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                marginBottom: "1rem",
              }}
            >
              <Public />
              world chat
            </span>
          }
          {...a11yProps(4)}
        />
        <Tab
          style={{ color: combinedValue === 5 ? "red" : "inherit" }}
          label={
            <span
              style={{
                color: "var(--font-color-unfocused)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 40,
                marginBottom: "2rem",
              }}
            >
              <AccountCircle />
              profile
            </span>
          }
          {...a11yProps(5)}
        />
        <Divider
          sx={{
            width: "12vw",
            marginLeft: "30px",
            borderBottom: 1,
            borderColor: "rgb(59,59,64)",
            // width: "15%",
          }}
        />
        {/* <Tab
          style={{
            marginTop: "2rem",
            color: "white",
          }}
          className="font-color-unfocused"
          label={ */}
        <span
          style={{
            // backgroundColor: "rgb(0,228,103) ",
            width: "50%",
            color: "var(--font-color-unfocused)",
            // margin: "auto",
            marginTop: "2rem",
            marginLeft: "2rem",
            alignItems: "center",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <Button
            style={{
              display: "flex",
              gap: "1rem",
              color: "var(--font_color_focused)",
            }}
          >
            <AutoAwesome /> toggle theme
          </Button>
        </span>
        {/* }{...a11yProps(5)}
        /> */}

        <Tab
          // disabled
          style={{
            color: "white",
            // color: combinedValue === 5 ? "red" : "inherit",
          }}
          className="font-color-unfocused"
          label="prop"
          {...a11yProps(5)}
        />
      </Tabs>

      <TabPanel value={value} index={1}>
        Item On
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={5}>
        {/* <Profile /> */}
        profile
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
