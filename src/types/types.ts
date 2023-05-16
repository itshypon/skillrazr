interface PeformanceData {
  scores: {
    code_reviews: number;
    development: number;
    learning: number;
    testing: number;
  };
  absentDays: [];
  notes: [];
}

export type { PeformanceData };
