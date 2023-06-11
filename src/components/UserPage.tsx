import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UserPage = () => {
  var user = useSelector((state: any) => state.currentUserReducer);

  return (
    <div className="flex flex-col mt-40 sm:mt-20 p-8 sm:p-20 w-full grow">
      <div className="text-2xl pb-2">My Details</div>
      <img src={user?.photoURL} alt="avatar" className="w-[60px]" />
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>

      <div className="text-3xl border-bottom pt-10 pb-4">Learning</div>
      <NavLink
        to="/addCourse"
        onClick={() => {
          window.scrollTo(0, 100);
        }}
      >
        <span className="decoration-solid underline">Add Course</span>
      </NavLink>

      <NavLink
        to="/editCourse"
        onClick={() => {
          window.scrollTo(0, 100);
        }}
      >
        <span className="decoration-solid underline">Edit Course</span>
      </NavLink>
    </div>
  );
};

export default UserPage;
