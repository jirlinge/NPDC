export interface EVGDetails {
  budget: number;
  periods: string[];
  duration: string;
  destination: string;
  proximity: string;
  preferredActivities?: string;
  activitiesToAvoid?: string;
  style: string;
  consent: boolean;
}

export interface Feedback {
  id: number;
  userId: number;
  username: string;
  date: Date;
  evgDetails: EVGDetails;
}