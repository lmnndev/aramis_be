export type Schedule = {
  day: string;
  startTime: string;
  endTime: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
};

export type ClassDetails = {
  name: string;
  capacity: number;
  status: string;
  subject?: { name?: string };
  department?: { name?: string };
};

export type OpenAIResponse = {
  output?: {
    content?: {
      text?: string;
    }[];
  }[];
};