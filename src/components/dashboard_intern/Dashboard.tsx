import "./css/dashboard.css";
import Sidebar from "./Sidebar";
import MainDashboard from "./MainDashboard";
import { getInternPerformanceData } from "../../services";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Dashboard() {
  var user = useSelector((state: any) => state.currentUserReducer);

  const [data, setData] = useState<any>([]);
  const [showAuthError, setAuthError] = useState<boolean>(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getInternPerformanceData(user.accessToken);
        console.log("resp", response);
        if (response.status === -1) {
          setAuthError(true);
        }
        setLinkedInUrl(response.data.linkedIn);
        setGithubUrl(response.data.github);
        setData(response.data.performanceData);
      } catch (e) {
        console.log("error", e);
      }
    };

    user && loadData();
  }, [user]);

  console.log("interns", data);

  if (showAuthError) {
    return <>Access token expired, please login to get a new one!"</>;
  }

  return (
    <div className="dashboard">
      {user && data.length ? (
        <div className="dashboardGlass p-4 sm:p-8">
          <Sidebar
            name={user.displayName}
            github={githubUrl || "https://www.github.com"}
            linkedin={linkedInUrl || "https:www.linkedin.com"}
          />
          <div className="rightSide">
            <MainDashboard data={data} />
          </div>
        </div>
      ) : (
        <div className="text-3xl p-20">Please Login to view dashboard</div>
      )}
    </div>
  );
}

export default Dashboard;
