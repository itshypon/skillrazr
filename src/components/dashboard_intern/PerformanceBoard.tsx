import Cards from "./Cards";
import Calendar from "./Calender";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { getMonthName } from "../../uiHelper";

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
      date: number;
    }
  ];
}) {
  const monthNames = data.map((i) => getMonthName(new Date(i.date).getMonth()));
  const dates = data.map((i) => new Date(i.date));

  const [selectedMonth, setMonth] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(+event.target.value);
  };

  const cardsData = [
    { title: "Code Review", value: data[selectedMonth].code_review },
    {
      title: "Development",
      value: data[selectedMonth].development,
    },
    { title: "Learning", value: data[selectedMonth].learning },
    { title: "Testing", value: data[selectedMonth].testing },
  ];
  return (
    <div className="flex items-center sm:items-start flex-col">
      <h1 className="text-2xl">Monthly Performance Dashboard</h1>
      <FormControl sx={{ m: 1, minWidth: 80 }} className="!mx-0 !my-4">
        <InputLabel id="demo-simple-select-autowidth-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={`${selectedMonth}`}
          onChange={handleChange}
          autoWidth
          label="Month"
        >
          {monthNames.map((month, index) => (
            <MenuItem value={index}>{month}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Cards data={cardsData} />
      <div className="flex flex-col sm:flex-row item-center mt-4 sm:mt-10 mb-6">
        <Calendar
          date={dates[selectedMonth]}
          absentDays={data[selectedMonth].absentDays}
          notes={data[selectedMonth].notes}
        />
      </div>
    </div>
  );
}

export default MainDashboard;
