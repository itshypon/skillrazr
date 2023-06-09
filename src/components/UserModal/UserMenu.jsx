import { setCurrentUser } from "../../actions/actions";
import "./UserMenu.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const UserMenu = ({ closeModal, logout }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const logoutHandler = () => {
      dispatch({ type: "LOGOUT" });
      dispatch(setCurrentUser(null));
    };
    logout(logoutHandler);
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <NavLink
          to={"/account"}
          className="cursor-pointer block logout-btn pb-1"
        >
          My Account
        </NavLink>
        <NavLink to={"/dashboard"} className="block pb-1">
          My Dashboard
        </NavLink>

        <p className="cursor-pointer logout-btn" onClick={handleLogout}>
          Log Out
        </p>
      </div>
    </div>
  );
};

export default UserMenu;
