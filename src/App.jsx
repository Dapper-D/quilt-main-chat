import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./App.css";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            marginRight: "1rem",
          }}
        >
          <span>
            <div
              style={{
                color: "var(--font_color_focused)",
                fontSize: "15px",
                lineHeight: "1rem",
              }}
            >
              0x4c99...923bd
            </div>
            <p
              style={{
                textAlign: "left",
                color: "var(--font-color-unfocused)",
                fontSize: "13px",
              }}
            >
              Etherium
            </p>
          </span>
          <KeyboardArrowRight
            style={{
              color: "var(--font_color_focused)",
            }}
          />
        </Button>
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
            src={"../logo.svg"}
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
