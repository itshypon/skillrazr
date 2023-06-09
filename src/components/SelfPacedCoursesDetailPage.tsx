import { useParams } from "react-router-dom";
import ReadOnlyCourse from "./AddCourse/CourseReadOnly";

const SelfPacedCoursesDetailsPage = () => {
  const { id } = useParams();
  console.log("id", id);

  return (
    <div className="sm:mt-4">
      <ReadOnlyCourse />
    </div>
  );
};

export default SelfPacedCoursesDetailsPage;
