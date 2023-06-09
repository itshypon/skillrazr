const { getFreeSlots } = require("../utils");
const chai = require("chai");

var expect = chai.expect;

describe("getFreeSlots", () => {
  const scheduledEvents = [
    {
      start: {
        dateTime: "2023-06-08T10:00:00Z", // 3:30pm IST
      },
      end: {
        dateTime: "2023-06-08T11:00:00Z", // 4:30pm IST
      },
    },
  ];

  const currentMonth = new Date("2023-06-01");
  const dayIndex = 8;

  const organiserAvailability = [
    {
      day: 4, // Thursday
      slots: [
        {
          from: "09:00", // 2:30pm IST
          to: "12:00", // 5:30pm IST
        },
      ],
    },
    {
      day: 5, // Friday
      slots: [
        {
          from: "10:00", // 3:30pm IST
          to: "12:00", // 5:30pm IST
        },
      ],
    },
  ];

  const dayOverrides = [
    {
      date: "2023-06-08",
      slots: [
        {
          from: "10:00", // 3:30pm IST
          to: "11:00", // 4:30pm IST
        },
      ],
    },
  ];

  it("should return slots removing any date overrides", () => {
    const expectedFreeSlots = [
      "2023-06-08T09:00:00.000Z", // 2:30pm IST
      "2023-06-08T09:30:00.000Z", // 3:00pm IST
      "2023-06-08T11:00:00.000Z", // 4:30pm IST
      "2023-06-08T11:30:00.000Z", // 5:00pm IST
    ];

    const result = getFreeSlots(
      scheduledEvents,
      currentMonth,
      dayIndex,
      organiserAvailability,
      dayOverrides
    );

    expect(result).eql(expectedFreeSlots);
  });

  it("should return slots removing overlapping slots", () => {
    const scheduledEventsWithOverlap = [
      ...scheduledEvents,
      {
        start: {
          dateTime: "2023-06-08T09:30:00Z",
        },
        end: {
          dateTime: "2023-06-08T10:30:00Z",
        },
      },
    ];

    const expectedFreeSlots = [
      "2023-06-08T09:00:00.000Z",
      "2023-06-08T11:00:00.000Z",
      "2023-06-08T11:30:00.000Z",
    ];

    const result = getFreeSlots(
      scheduledEventsWithOverlap,
      currentMonth,
      dayIndex,
      organiserAvailability,
      dayOverrides
    );

    expect(result).eql(expectedFreeSlots);
  });

  it("should return empty slots when organiser is not available", () => {
    const result = getFreeSlots(
      scheduledEvents,
      currentMonth,
      7,
      organiserAvailability,
      dayOverrides
    );

    expect(result).eql([]);
  });

  it("should return empty slots when slots are not available because of dateoverides", () => {
    const result = getFreeSlots(
      scheduledEvents,
      currentMonth,
      8,
      organiserAvailability,
      [
        {
          date: "2023-06-08",
          slots: [
            {
              from: "9:00", // 3:30pm IST
              to: "12:00", // 4:30pm IST
            },
          ],
        },
      ]
    );

    expect(result).eql([]);
  });

  it("should return empty slots when all the available slots are booked/scheduled", () => {
    const scheduledEvents = [
      {
        start: {
          dateTime: "2023-06-08T10:00:00Z", // 3:30pm IST
        },
        end: {
          dateTime: "2023-06-08T11:00:00Z", // 4:30pm IST
        },
      },
    ];

    const result = getFreeSlots(
      scheduledEvents,
      currentMonth,
      8,
      [
        {
          day: 4, // Thursday
          slots: [
            {
              from: "10:00", // 2:30pm IST
              to: "11:00", // 5:30pm IST
            },
          ],
        },
      ],
      []
    );

    expect(result).eql([]);
  });
});
