import React from "react";
import styled from "@emotion/styled";
import { Grid, Link as MLink } from "@mui/material";
import { Link } from "react-router-dom";
import ModalDialog from "./Modal";
import PrivacyPolicy from "./Privacy";
import TermsOfService from "./Terms";
import ReturnsPolicy from "./ReturnsPolicy";

import logo from "../assets/images/SkillRazr.svg";

const BG = styled("div")`
  background: #161c2d;
  padding: 70px 100px;
  @media (max-width: 500px) {
    padding: 30px 40px;
    overflow-x: auto;
  }
  @media (min-width: 1535px) {
    padding: 80px 240px;
  }
`;
const Rights = styled("span")`
  margin-top: 5px;
  color: #d9dbe1;
  // @media (max-width: 500px) {
  //     display: flex;
  //     justify-content: center;
  // }
`;

const Title = styled("p")`
  line-height: 30px;
  color: #76b3ff;
`;

const Sub = styled("span")`
  line-height: 26px;
  color: #eeeff4;
`;

const TopGrid = styled(Grid)`
  @media (max-width: 500px) {
    // min-width: 600px;
  }
`;

const RazrFinance = styled(Grid)`
  margin-top: 30px;
  // @media (max-width: 500px) {
  //     display: flex;
  //     justify-content: center;
  // }
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;
const isPrivacyOpen = window.location.href.indexOf("privacy") !== -1;
const isTermsOpen = window.location.href.indexOf("terms") !== -1;
const isReturnsOpen = window.location.href.indexOf("returns") !== -1;

export default function Footer() {
  const [showTermsDialog, setShowTermsDialog] = React.useState(isTermsOpen);
  const [showPrivacyDialog, setShowPrivacyDialog] =
    React.useState(isPrivacyOpen);

  const [showReturnsDialog, setShowReturnsDialog] =
    React.useState(isReturnsOpen);

  const handleDialogClose = () => {
    setShowPrivacyDialog(false);
  };
  const handleTermsDialogClose = () => {
    setShowTermsDialog(false);
  };

  const handleReturnsDialogClose = () => {
    setShowReturnsDialog(false);
  };

  return (
    <>
      <BG className="w-full">
        <TopGrid
          className="flex-column sm:flex-row"
          container
          justifyContent={"space-between"}
        >
          <Grid
            md={3}
            sm={3}
            xs={12}
            container
            direction={"column"}
            className="mb-10 sm:mb-0 items-center"
          >
            <RazrFinance>
              <img src={logo} alt="" style={{ width: "220px" }} />
            </RazrFinance>

            <Rights>
              © 2022 Genlent Technologies
              <br /> All rights reserved
            </Rights>
          </Grid>
          <Grid spacing={2} md={2} sm={2} xs={4} container direction={"column"}>
            <Grid item>
              <Title>Company</Title>
            </Grid>
            <Grid item>
              <NavLink to="/about">
                <Sub>About</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/about">
                <Sub>Team</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/about">
                <Sub>Contact</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/blogs">
                <Sub>Blogs</Sub>
              </NavLink>
            </Grid>
          </Grid>
          <Grid spacing={2} md={2} sm={2} xs={4} container direction={"column"}>
            <Grid item>
              <Title>Legal</Title>
            </Grid>

            <Grid item>
              <NavLink
                to="#terms"
                onClick={() => {
                  setShowTermsDialog(true);
                }}
              >
                <Sub>Terms of service</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="#privacy"
                onClick={() => {
                  setShowPrivacyDialog(true);
                }}
              >
                <Sub>Privacy Policy</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="#returns"
                onClick={() => {
                  setShowReturnsDialog(true);
                }}
              >
                <Sub>Return Policy</Sub>
              </NavLink>
            </Grid>
          </Grid>
          <Grid spacing={2} md={2} sm={2} xs={4} container direction={"column"}>
            <Grid item>
              <Title>Social</Title>
            </Grid>
            <Grid item>
              <MLink
                href="https://www.linkedin.com/company/genlent-technologies/"
                target="_blank"
              >
                <Sub>LinkedIn</Sub>
              </MLink>
            </Grid>
            <Grid item>
              <MLink href="https://genlent.medium.com/" target="_blank">
                <Sub>Medium</Sub>
              </MLink>
            </Grid>
            <Grid item>
              <MLink
                href=" https://www.quora.com/profile/Tukuna-Patro"
                target="_blank"
              >
                <Sub>Quora</Sub>
              </MLink>
            </Grid>
          </Grid>
        </TopGrid>
      </BG>
      <ModalDialog
        showModal={showTermsDialog}
        setShowDialog={setShowTermsDialog}
        cancelHandler={handleTermsDialogClose}
        title="Terms of Service"
        content={
          <div>
            <TermsOfService />
          </div>
        }
      />
      <ModalDialog
        showModal={showPrivacyDialog}
        cancelHandler={handleDialogClose}
        setShowDialog={setShowPrivacyDialog}
        title="Privacy Policy"
        content={
          <div>
            <PrivacyPolicy />
          </div>
        }
      />
      <ModalDialog
        showModal={showReturnsDialog}
        cancelHandler={handleReturnsDialogClose}
        setShowDialog={setShowReturnsDialog}
        title="Return Policy"
        content={
          <div>
            <ReturnsPolicy />
          </div>
        }
      />
    </>
  );
}
