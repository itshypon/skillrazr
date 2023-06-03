import MainSection from "./MainSection";
import Features from "./Features";
import Courses from "./Courses";
import Quizes from "./Quizes";
import Testimonials from "./Testimonials";
import Faqs from "./Faqs";
import Flashcards from "./FlashCards";

const HomePage = () => {
  return (
    <div className="App container">
      <MainSection />
      <Features />
      <Testimonials />
      <Courses />
      <Quizes />
      <Flashcards />
      <Faqs />
    </div>
  );
};

export default HomePage;
