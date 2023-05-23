import { getMonthName } from "./uiHelper";

describe("uiHelper", () => {
  describe("getMonthName", () => {
    it("should return the correct month name for a valid month index", () => {
      expect(getMonthName(0)).toBe("Jan");
      expect(getMonthName(1)).toBe("Feb");
      expect(getMonthName(2)).toBe("Mar");
      expect(getMonthName(3)).toBe("Apr");
      expect(getMonthName(4)).toBe("May");
      expect(getMonthName(5)).toBe("Jun");
      expect(getMonthName(6)).toBe("Jul");
      expect(getMonthName(7)).toBe("Aug");
      expect(getMonthName(8)).toBe("Sep");
      expect(getMonthName(9)).toBe("Oct");
      expect(getMonthName(10)).toBe("Nov");
      expect(getMonthName(11)).toBe("Dec");
    });

    it("should return undefined for an invalid month index", () => {
      expect(getMonthName(-1)).toBe(undefined);
      expect(getMonthName(12)).toBe(undefined);
    });
  });
});
