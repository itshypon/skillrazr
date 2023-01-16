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
      <BG className="w-full !p-[20px] !sm:p[80px] !py-12">
        <Grid
          className="flex-column sm:flex-row"
          container
          justifyContent={"center"}
        >
          <Grid
            item
            md={3}
            sm={3}
            xs={12}
            container
            direction={"column"}
            className="mb-10 sm:mb-0 items-center"
          >
            <Grid>
              <NavLink
                to="/"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <img src={logo} alt="" style={{ width: "220px" }} />
              </NavLink>
            </Grid>

            <Rights className="my-4">
              © {new Date().getFullYear()} Genlent Technologies
              <br /> All rights reserved
            </Rights>
          </Grid>
          <Grid
            item
            spacing={2}
            md={2}
            sm={2}
            xs={4}
            container
            direction={"column"}
          >
            <Grid item>
              <Title>Company</Title>
            </Grid>
            <Grid item>
              <NavLink
                to="/about"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Sub>About</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="/about#team"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Sub>Team</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="/about#contact"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Sub>Contact</Sub>
              </NavLink>
            </Grid>
          </Grid>
          <Grid
            item
            spacing={2}
            md={2}
            sm={2}
            xs={4}
            container
            direction={"column"}
          >
            <Grid item>
              <Title>Developer</Title>
            </Grid>

            <Grid item>
              <NavLink
                to="/editor"
                onClick={() => {
                  window.scrollTo(0, 100);
                }}
              >
                <Sub>JS Code Runner</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="/blogs"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Sub>Blogs</Sub>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="/games"
                onClick={() => {
                  window.scrollTo(0, 100);
                }}
              >
                <Sub>Games</Sub>
              </NavLink>
            </Grid>
          </Grid>
          <Grid
            item
            spacing={2}
            md={2}
            sm={2}
            xs={4}
            container
            direction={"column"}
          >
            <Grid item>
              <Title>Social</Title>
            </Grid>
            <Grid item>
              <MLink
                href="https://www.linkedin.com/company/skillrazr"
                target="_blank"
              >
                <Sub>LinkedIn</Sub>
              </MLink>
            </Grid>
            <Grid item>
              <MLink href="https://twitter.com/skillrazr" target="_blank">
                <Sub>Twitter</Sub>
              </MLink>
            </Grid>
            <Grid item>
              <MLink
                href="https://www.youtube.com/channel/UCBjS5cl2sMU-1ls8j6h15Nw"
                target="_blank"
              >
                <Sub>Youtube</Sub>
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
          <Grid
            item
            spacing={2}
            md={2}
            sm={2}
            xs={4}
            container
            direction={"column"}
          >
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
        </Grid>
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
