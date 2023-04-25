import MainSection from "./MainSection";
import Features from "./Features";
import Courses from "./Courses";
import Quizes from "./Quizes";
import Testimonials from "./Testimonials";
import Internship from "./Internship";
import Faqs from "./Faqs";





const HomePage = () => {
  return (
    <div className="App container">
      <MainSection />
      <Features />
      <Testimonials />
      <Courses />
      <Quizes />
      <Internship />
      <Faqs />
    </div>
  );
};

export default HomePage;
