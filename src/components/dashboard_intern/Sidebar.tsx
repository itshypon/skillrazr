import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import pic from "./avatar.gif";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Sidebar(props: any) {
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
      </div>
    </div>
  );
}

export default Sidebar;
