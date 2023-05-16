import "./css/dashboard.css";
import Sidebar from "./Sidebar";
import PerformanceBoard from "./PerformanceBoard";
import { getInternPerformanceData } from "../../services";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PeformanceData } from "../../types/types";

function InternDashboard() {
  const user = useSelector((state: any) => state.currentUserReducer);
  const [performancedata, setData] = useState<Record<
    string,
    PeformanceData
  > | null>(null);
  const [showAuthError, setAuthError] = useState<boolean>(false);
  const [noInternFound, setNoInternFound] = useState<boolean>(false);

  const [githubUrl, setGithubUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getInternPerformanceData(user.accessToken);
        if (response.status === -1) {
          setAuthError(true);
        } else if (response.status === 0) {
          setNoInternFound(true);
        } else {
          setLinkedInUrl(response.data.linkedIn);
          setGithubUrl(response.data.github);
          setData(response.data.performanceData);
          setNoInternFound(false);
          setAuthError(false);
        }
      } catch (e) {
        console.log("error", e);
      }
    };

    if (!user) {
      setNoInternFound(false);
    }

    user && loadData();
  }, [user]);

  if (showAuthError) {
    return <>Access token expired, please login to get a new one!"</>;
  }

  return (
    <div className="dashboard">
      {user && performancedata ? (
        <div className="dashboardGlass p-4 sm:p-8">
          <Sidebar
            name={user.displayName}
            github={githubUrl || "https://www.github.com"}
            linkedin={linkedInUrl || "https:www.linkedin.com"}
          />
          <div className="rightSide">
            <PerformanceBoard data={performancedata} />
          </div>
        </div>
      ) : (
        <>
          {noInternFound ? (
            <div className="text-3xl p-20">
              No Internship details found for {user && user.email}
            </div>
          ) : (
            <div className="text-3xl p-20">
              Please login to view the dashboard
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InternDashboard;
