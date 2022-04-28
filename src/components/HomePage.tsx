import MainSection from "./MainSection";
import Features from "./Features";
import Courses from "./Courses";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <div className="App container">
      <MainSection />
      <Features />
      <Testimonials />
      <Courses />
    </div>
  );
};

export default HomePage;
