import MainSection from "./MainSection";
import Features from "./Features";
import Courses from "./Courses";
import Quizes from "./Quizes";
import Testimonials from "./Testimonials";
import Internship from "./Internship";
import Faqs from "./Faqs";
import Roadmap from "./Roadmaps";
import Roadmaps from "./Roadmaps";



const HomePage = () => {
  return (
    <div className="App container">
      <MainSection />
      <Features />
      <Roadmaps />
      <Testimonials />
      <Courses />
      <Quizes />
      <Internship />
      <Faqs />
    </div>
  );
};

export default HomePage;
