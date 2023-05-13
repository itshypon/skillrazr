import "./css/MainDashboard.css";
import Cards from "./Cards";
import Calendar from "./Calendar";
import { getAllInterns } from "../../services";
import { useEffect, useState } from "react";

function MainDashboard() {
  const [interns, setInterns] = useState<any>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getAllInterns();
        setInterns(response.data);
      } catch (e) {}
    };

    loadData();
  }, []);

  console.log("interns", interns);
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <div className="flex flex-col sm:flex-row item-center mb-6">
        {[new Date(2023, 3), new Date(2023, 4)].map((date: Date) => (
          <Calendar
            date={date}
            absentDays={[3, 4, 5]}
            notes={{
              "4": {
                type: "info",
                message: "Hello you are doing good, keep it up",
              },
              "5": {
                type: "info",
                message:
                  "Hello a note for you, need some improvment in your presentation",
              },
              "6": {
                type: "alert",
                message:
                  "Nothing much to say \n you need to appear the classes more often",
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MainDashboard;
