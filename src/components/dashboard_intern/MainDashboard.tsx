import Cards from "./Cards";
import Calendar from "./Calender";

function MainDashboard({
  data,
}: {
  data: [
    {
      code_review: number;
      development: number;
      learning: number;
      testing: number;
      absentDays: [];
      notes: [];
    }
  ];
}) {
  const monthIndex = 0;

  const cardsData = [
    { title: "Code Review", value: data[monthIndex].code_review },
    {
      title: "Development",
      value: data[monthIndex].development,
    },
    { title: "Learning", value: data[monthIndex].learning },
    { title: "Testing", value: data[monthIndex].testing },
  ];
  return (
    <div className="flex items-center sm:items-start flex-col">
      <h1 className="text-2xl">Monthly Performance Dashboard</h1>
      <Cards data={cardsData} />
      <div className="flex flex-col sm:flex-row item-center mt-4 sm:mt-10 mb-6">
        {[new Date(2023, 3)].map((date: Date) => (
          <Calendar
            date={date}
            absentDays={data[monthIndex].absentDays}
            notes={data[monthIndex].notes}
          />
        ))}
      </div>
    </div>
  );
}

export default MainDashboard;
