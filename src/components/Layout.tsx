import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout(props: any) {
  return (
    <div className="App flex flex-center flex-col items-center h-screen">
      <Navbar {...props} />
      <Outlet {...props} />
      <Footer {...props} />
    </div>
  );
}

export default Layout;
