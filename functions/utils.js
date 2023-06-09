const getScore = (answerObj, submissionObj) => {
  const totalQuestions = Object.keys(answerObj).length;

  let correctAnswers = 0;
  Object.keys(answerObj).forEach((questionId) => {
    if (answerObj[questionId] === submissionObj[questionId]) {
      correctAnswers++;
    }
  });

  return (correctAnswers / totalQuestions) * 100;
};

const getMonthName = (index) => {
  return [
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
  ][index];
};

const daysInMonth = (year, monthIndex) =>
  new Date(year, monthIndex + 1, 0).getDate();
// (2023, 4) for Apr 2023 - 0 gets the last day of the previous month

const getFreeSlots = (
  scheduledEvents,
  currentMonth,
  dayIndex,
  organiserAvailability,
  dayOverrides
) => {
  const freeSlots = [];
  const currentMonthIndex = currentMonth.getMonth();

  const dayInWeek = new Date(
    currentMonth.getFullYear(),
    currentMonthIndex,
    dayIndex
  ).getDay(); // 0 for Sun and so on

  const dayAvailabity = organiserAvailability.find(
    (dayObj) => dayObj.day === dayInWeek
  );

  if (dayAvailabity) {
    const slots = dayAvailabity.slots;

    let totalSlotsInTheDay = [];
    const slotTimeInMinutes = 30; // assume 30 minutes slots TODO - should support 1hr, 2hr etc as well

    slots.forEach((slot) => {
      const from = slot.from;
      const to = slot.to;

      const [hour1, minute1] = to.split(":").map((i) => parseInt(i));
      const [hour2, minute2] = from.split(":").map((i) => parseInt(i));

      const possibleSlots =
        (hour1 * 60 + minute1 - (hour2 * 60 + minute2)) / slotTimeInMinutes;
      let startTimeInMinutes = hour2 * 60 + minute2;

      for (
        let i = 1;
        i <= possibleSlots;
        i++, startTimeInMinutes += slotTimeInMinutes
      ) {
        const hour = parseInt(startTimeInMinutes / 60);
        const minutes = startTimeInMinutes % 60;
        const _slot = [hour, minutes];
        totalSlotsInTheDay.push(_slot);
      }
    });

    const overideForDay = dayOverrides.find((override) => {
      return new Date(override.date).getDate() === dayIndex;
    });

    // if there are any overrides for a day, find and remove override (unavilable) slots
    if (overideForDay) {
      const slots = overideForDay.slots;
      const slotsToRemove = [];

      slots.forEach((slot) => {
        const from = slot.from;
        const to = slot.to;

        const [hour1, minute1] = to.split(":").map((i) => parseInt(i));
        const [hour2, minute2] = from.split(":").map((i) => parseInt(i));

        const possibleSlots =
          (hour1 * 60 + minute1 - (hour2 * 60 + minute2)) / slotTimeInMinutes;
        let startTimeInMinutes = hour2 * 60 + minute2;

        for (
          let i = 1;
          i <= possibleSlots;
          i++, startTimeInMinutes += slotTimeInMinutes
        ) {
          const hour = parseInt(startTimeInMinutes / 60);
          const minutes = startTimeInMinutes % 60;
          const _slot = [hour, minutes];
          slotsToRemove.push(_slot);
        }
      });

      totalSlotsInTheDay = totalSlotsInTheDay.filter((slot) => {
        return slotsToRemove.find(
          (slotR) => slotR[0] === slot[0] && slotR[1] === slot[1]
        )
          ? false
          : true;
      });
    }

    totalSlotsInTheDay.forEach((entry) => {
      const [hour, minute] = entry;
      const dateObj = new Date(
        Date.UTC(
          currentMonth.getFullYear(),
          currentMonthIndex,
          dayIndex,
          hour,
          minute
        )
      );

      const _event = scheduledEvents.find((event) => {
        var startTime = new Date(event.start.dateTime);
        var endTime = new Date(event.end.dateTime);

        return (
          dateObj.getDate() === startTime.getDate() &&
          (startTime.getTime() === dateObj.getTime() ||
            (startTime.getTime() > dateObj.getTime() &&
              endTime.getTime() <=
                dateObj.getTime() + slotTimeInMinutes * 60 * 1000) ||
            (startTime.getTime() < dateObj.getTime() &&
              endTime.getTime() > dateObj.getTime()))
        );
      });

      if (_event) {
        console.log("overlaop detected", dateObj);
      } else {
        freeSlots.push(dateObj.toISOString());
      }
    });
  }

  return freeSlots;
};

module.exports = {
  getScore,
  getMonthName,
  daysInMonth,
  getFreeSlots,
};
