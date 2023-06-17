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

export type Chapter = {
  id: number;
  title: string;
  description: string;
  content: string;
  isLocked?: boolean;
};

export type { PeformanceData };
