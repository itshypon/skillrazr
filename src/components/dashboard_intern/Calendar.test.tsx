import Calender from "./Calendar";
import { render, screen } from "@testing-library/react";

describe("Calender", () => {
  it("should render a calendar with the correct month and year", () => {
    const date = new Date(2023, 3);
    render(<Calender date={date} />);
    expect(screen.getByText("Apr - 2023")).toBeTruthy();
  });

  it("should render days of the week", () => {
    render(<Calender date={new Date()} />);
    expect(screen.getByText("Mon")).toBeTruthy();
    expect(screen.getByText("Tue")).toBeTruthy();
    expect(screen.getByText("Wed")).toBeTruthy();
    expect(screen.getByText("Thu")).toBeTruthy();
    expect(screen.getByText("Fri")).toBeTruthy();
    expect(screen.getByText("Sat")).toBeTruthy();
    expect(screen.getByText("Sun")).toBeTruthy();
  });

  it("should render days of the month", () => {
    const date = new Date();
    render(<Calender date={date} />);
    for (let i = 1; i <= date.getDate(); i++) {
      expect(screen.getAllByText(i)).toBeTruthy();
    }
  });

  it("should render notes for days with notes", () => {
    const date = new Date();
    const notes = {
      2: {
        type: "info",
        message: "Hello you are doing good, keep it up",
      },
      3: {
        type: "info",
        message:
          "Hello a note for you, need some improvment in your presentation",
      },
    };
    render(<Calender date={date} notes={notes} />);
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByTestId("note-2")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByTestId("note-3")).toBeTruthy();
  });

  it("should not render notes for days without notes", () => {
    const date = new Date();
    const notes = {};
    render(<Calender date={date} notes={notes} />);
    for (let i = 1; i <= date.getDate(); i++) {
      expect(screen.getByText(i)).toBeTruthy();
      expect(screen.queryByTestId(`note-${i}`)).toBeFalsy();
    }
  });
});
