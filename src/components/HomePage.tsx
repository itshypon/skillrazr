import Navbar from "./Navbar";
import MainSection from "./MainSection";
import Features from "./Features";
import Courses from "./Courses";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="App">
      <MainSection />
      <Features />
      <Courses />
    </div>
  );
};

export default HomePage;
