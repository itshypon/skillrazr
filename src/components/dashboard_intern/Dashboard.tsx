import "./css/dashboard.css";
import Sidebar from "./Sidebar";
import MainDashboard from "./MainDashboard";
import RightSide from "./RightSide";
import { useSelector } from "react-redux";
import Info from "./Info";

function Dashboard(props: any) {
  var user = useSelector((state: any) => state.currentUserReducer);
  console.log(user, "currentUser");

  return (
    <div className="dashboard">
      {user?.uid ? (
        <div className="dashboardGlass">
          <Sidebar
            name="Himanshu"
            github="https://www.github.com"
            linkedin="https:www.linkedin.com"
          />
          <div className="rightSide">
          <Info />
          <MainDashboard />
          </div>
        </div>
      ) : (
        <div>Please login to continue!</div>
      )}
    </div>
  );
}

export default Dashboard;
