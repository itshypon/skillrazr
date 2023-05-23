import { setCurrentUser } from "../../actions/actions";
import "./UserModal.css";
import { useDispatch } from "react-redux";

const UserModal = ({ closeModal, logout }) => {
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
        <p className="cursor-pointer logout-btn" onClick={handleLogout}>
          Log Out
        </p>
      </div>
    </div>
  );
};

export default UserModal;
