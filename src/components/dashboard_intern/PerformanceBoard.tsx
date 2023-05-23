import Cards from "./Cards";
import Calendar from "./Calender";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { PeformanceData } from "../../types/types";

function MainDashboard({ data }: { data: Record<string, PeformanceData> }) {
  const monthAndYears = Object.keys(data);
  const monthNames = monthAndYears.map((i) => i.split("_")[0]);
  const year = monthAndYears[0].split("_")[1];

  const getDate = (monthYearStr: string) => {
    const month = monthYearStr.split("_")[0];
    const monthMap: Record<string, number> = {
      "Jan": 0,
      "Feb": 1,
      "Mar": 2,
      "Apr": 3,
      "May": 4,
      "Jun": 5,
      "Jul": 6,
      "Aug": 7,
      "Sep": 8,
      "Oct": 9,
      "Nov": 10,
      "Dec": 11,
    };

    const year = monthYearStr.split("_")[1];
    return new Date(+year, monthMap[month]);
  };

  const [selectedMonth, setMonth] = useState(monthNames[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const scores = data[`${selectedMonth}_${year}`].scores || {};
  const cardsData = [
    {
      title: "Development",
      value: scores.development,
    },
    {
      title: "Code Review",
      value: scores.code_reviews,
    },
    {
      title: "Learning",
      value: scores.learning,
    },
    {
      title: "Testing",
      value: scores.testing,
    },
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
          {monthNames.map((month) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Cards data={cardsData} />
      <div className="flex flex-col sm:flex-row item-center mt-4 sm:mt-10 mb-6">
        <Calendar
          date={getDate(`${selectedMonth}_${year}`)}
          absentDays={data[`${selectedMonth}_${year}`].absentDays}
          notes={data[`${selectedMonth}_${year}`].notes}
        />
      </div>
    </div>
  );
}

export default MainDashboard;
