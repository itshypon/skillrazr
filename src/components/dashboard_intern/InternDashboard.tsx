import "./css/dashboard.css";
import Sidebar from "./Sidebar";
import PerformanceBoard from "./PerformanceBoard";
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

  const response = useSelector((state: any) => state.performanceDataReducer);
  // console.log(response);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (response?.status === -1) {
          setAuthError(true);
        } else if (response?.status === 0) {
          setNoInternFound(true);
        } else {
          setLinkedInUrl(response?.data.linkedin);
          setGithubUrl(response?.data.github);
          setData(response?.data.performanceData);
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
  }, [user, response]);

  if (showAuthError) {
    return (
      <div className="w-full grid place-content-center text-center grow">
        <p className="text-3xl font-bold p-4 hover:text-[#ff1694] transistion duration-1000">
          &lt;&gt; Access token expired, please login to get a new one!
          &lt;/&gt;
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard mt-[116px] sm:mt-10 w-screen p-2 sm:p-4 grow">
      {user && performancedata ? (
        <div className="dashboardGlass p-4 sm:p-8 mt-4 sm:mt-4">
          <Sidebar
            name={user.displayName}
            github={githubUrl || "https://www.github.com"}
            linkedin={linkedInUrl || "https:www.linkedin.com"}
            email={user.email}
          />
          <div className="rightSide ml-0 sm:ml-4">
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
            <div className="text-3xl p-4 sm:p-20 wrap text-center">
              Please login to view your dashboard
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InternDashboard;
