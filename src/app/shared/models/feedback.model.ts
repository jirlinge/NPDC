export interface EVGDetails {
  firstName: string;
  budget: number;
  period: string;
  duration: string;
  destination: string;
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