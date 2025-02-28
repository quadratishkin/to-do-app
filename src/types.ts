export enum Status {
  WORKING = "WORKING",
  ANALYZING = "ANALYZING",
  NOT_STARTED = "NOT_STARTED",
}

export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum Action {
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

export interface TodoI {
  id: number;
  name: string;
  description: string;
  status: Status;
  priority: Priority;
}
