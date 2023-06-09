import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function LayoutWithoutFooter(props: any) {
  return (
    <div className="App flex flex-center flex-col items-center h-[100vh]">
      <Navbar {...props} />
      <div className="grow w-full">
        <Outlet {...props} />
      </div>
    </div>
  );
}

export default LayoutWithoutFooter;
