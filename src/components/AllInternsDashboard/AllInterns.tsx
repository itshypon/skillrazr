import React, { useEffect, useState } from "react";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllInterns } from "../../services";
import { setAllInterns } from "../../actions/actions";
import { CircularProgress } from "@mui/material";

interface Intern {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  // Add other properties if applicable
}

const AllInterns = () => {
  const [searchList, setSearchList] = useState<Intern[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const allInterns = useSelector((state: any) => state.allInternsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredList = allInterns?.filter((intern: any) =>
      intern.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchList(filteredList);
  }, [searchQuery, allInterns]);

  useEffect(() => {
    const getInterns = async () => {
      try {
        const result = await getAllInterns();
        dispatch(setAllInterns(result.data));
      } catch (error) {
        console.log(error.message);
      }
    };
    getInterns();
  }, [dispatch]);

  const renderList = () => {
    const list = searchList?.length === 0 ? allInterns : searchList;
    return list?.map((intern: any) => (
      <div
        key={intern?.email}
        className="bg-white grid place-items-center h-[230px] w-[200px] rounded-md shadow-xl hover:scale-y-105 hover:scale-x-105 transition-all duration-150"
        onClick={() => navigate(`/allinterns/${intern.email}`)}
      >
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
          className="rounded-full w-28 h-28"
        />
        <h2 className="text-md font-semibold">{intern?.name}</h2>
        <div className="flex space-x-8">
          <a href={intern.linkedin}>
            <LinkedIn />
          </a>
          <a href={intern.github}>
            <GitHub />
          </a>
        </div>
      </div>
    ));
  };

  return (
    <div className="all-interns-container">
      <div className="flex justify-center">
        <input
          type="text"
          className="shadow-2xl rounded-full w-[90%] py-4 px-6 outline-none"
          placeholder="Search..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      {allInterns?.length > 0 ? (
        <div className="grid lg:grid-cols-6 place-items-center mt-10 gap-6 lg:gap-0 mx-4">
          {renderList()}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mt-10">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AllInterns;
