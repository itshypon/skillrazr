import {
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  eachDayOfInterval,
  isSameMonth,
  endOfWeek,
  isWeekend,
  isFuture,
} from "date-fns";
import "./css/Calendar.css";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import NoteIcon from "@mui/icons-material/Note";
import WarningIcon from "@mui/icons-material/Warning";

type DateType = {
  date: Date;
  absentDays?: Array<number>;
  notes?: Array<Record<string, string>>;
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: 16,
    border: "1px solid #dadde9",
  },
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      border: "1px solid #dadde9",
    },
    color: "#f5f5f9",
  },
}));

const Calender = ({ date, absentDays, notes = [] }: DateType) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const weeksInMonth = eachWeekOfInterval(
    {
      start: monthStart,
      end: monthEnd,
    },
    { weekStartsOn: 1 }
  );

  const monthIndex = date.getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[monthIndex];
  const year = date.getFullYear();

  return (
    <div className="mt-10 calendar">
      <span className="text-2xl">
        {month} - {year}
      </span>
      <table className="text-2xl">
        <thead>
          <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          {weeksInMonth.map((week, index) => {
            const daysInWeek = eachDayOfInterval({
              start: week,
              end: endOfWeek(week, { weekStartsOn: 1 }),
            });
            return (
              <tr key={index}>
                {daysInWeek.map((day, ind) => {
                  const currentMonth = isSameMonth(day, monthStart);
                  const isFutureDate = isFuture(day);

                  const dayIndex = new Date(day).getDate();

                  const classNames = ["day"];
                  if (!currentMonth) {
                    classNames.push("inactive");
                  }
                  if (isWeekend(day)) {
                    classNames.push("weekend");
                  }

                  if (isFutureDate) {
                    classNames.push("future");
                  }

                  if (absentDays?.indexOf(dayIndex) !== -1) {
                    classNames.push("absent");
                  }

                  if (!currentMonth) {
                    return <td key={ind} />;
                  }

                  const notesFound = notes.find(
                    (note) => note.date === `${dayIndex}`
                  );

                  return (
                    <td
                      key={ind}
                      className="w-[50px] h-[50px] text-2xl font-bold"
                    >
                      {notesFound ? (
                        <HtmlTooltip
                          title={notesFound.message}
                          arrow
                          enterTouchDelay={0}
                          data-testid={`note-${dayIndex}-${notesFound.type}`}
                        >
                          <div
                            className={`${classNames.join(" ")} cursor-pointer`}
                          >
                            {format(day, "d")}
                            {notesFound.type === "info" ? (
                              <NoteIcon className="!text-base" />
                            ) : (
                              <WarningIcon
                                className="!text-base"
                                htmlColor="red"
                              />
                            )}
                          </div>
                        </HtmlTooltip>
                      ) : (
                        <div className={classNames.join(" ")}>
                          {format(day, "d")}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calender;
