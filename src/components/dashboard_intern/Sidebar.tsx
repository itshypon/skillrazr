import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import pic from "./avatar.gif";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IOSSwitch } from "../SwitchToggle";
import { getIntern, updateToggle } from "../../services";
import Alert from "@mui/material/Alert";
import { Snackbar, Modal, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

interface Intern {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  profilePublic: boolean;
  profilePublicUpdatedOn: string;
}

function Sidebar(props: any) {
  const [intern, setIntern] = useState<Intern>({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    profilePublic: false,
    profilePublicUpdatedOn: "",
  });
  const user = useSelector((state: any) => state.currentUserReducer);
  const [toggle, setToggle] = useState(intern.profilePublic);

  React.useEffect(() => {
    const _getIntern = async () => {
      try {
        if (props.email) {
          const result = await getIntern(props.email);
          if (result.status === 1) {
            setIntern(result.data);
          }
        }
      } catch (error) {
        // Handle the error
        console.log(error.message);
      }
    };
    _getIntern();
  }, [props.email, toggle]);

  React.useEffect(() => {
    setToggle(intern.profilePublic);
  }, [intern.profilePublic]);

  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleChange = async () => {
    // check time passed
    const time = new Date(intern.profilePublicUpdatedOn).getTime() + 86400000; // 24hr;

    if (new Date().getTime() > time || !intern.profilePublic) {
      setShowModal(true);
    } else {
      setShowAlert(true);
    }
  };

  const handleProceed = async () => {
    setShowModal(false);
    setToggle(!toggle);
    await updateToggle(user?.accessToken, !toggle);
  };

  return (
    <div className="Sidebar pt-4 sm:pt-16">
      <div className="profile flex flex-col items-center">
        <img src={pic} alt="" className="w-[120px]" />
        <span>
          <div className="sec-1">
            {/* <BadgeIcon /> */}
            {props.name}
          </div>
          <div className="sec-2">
            <Link to={props.github}>
              <GitHubIcon />
            </Link>
            <Link to={props.linkedin}>
              <LinkedInIcon className="icon" />
            </Link>
          </div>
        </span>
        {/* toggle */}
        <div className="mt-5">
          <p className="font-bold">Performance Data</p>
          <div className="flex space-x-3 mt-3 justify-center items-center">
            <p className="text-[13px]">Hide</p>
            <IOSSwitch checked={toggle} onChange={handleToggleChange} />
            <p className="text-[13px]">Show</p>
          </div>
        </div>
      </div>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity="error">Please Try Again Later</Alert>
        </Snackbar>
      )}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Toggling can only occur once per day. Are you sure?
          </Typography>
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="hover:bg-[lightgray] px-2 py-1 mr-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              className="bg-[#ff1694]/75 px-2 py-1 rounded"
            >
              Proceed
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Sidebar;
