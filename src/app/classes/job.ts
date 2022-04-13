import { JobComment } from './job-comment';
import { Project } from './project';

export interface Job {
  _id?: string;
  project?: string | Project;
  jobNumber?: number;
  title: string;
  body?: string;
  imageUrl?: string;
  comments?: JobComment[];
  subscribers?: string[];
  closed?: boolean;

  submissionsCount?: number;
}

export interface JobWithSubscriptionStatus extends Job {
  subscription?: {
    notified?: boolean;
    accepted?: boolean;
  };
}
