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
  createdAt?: string;
  updatedAt?: string;

  submissionsCount?: number;
  acceptedSubmissionsCount?: number; // optionally returned by API
  commentsCount?: number; // optionally returned by API
  [key: string]: any;
}

export interface JobWithSubscriptionStatus extends Job {
  subscription?: {
    notified?: boolean;
    accepted?: boolean;
  };
}
