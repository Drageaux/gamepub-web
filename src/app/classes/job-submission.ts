import { Job } from './job';

export interface JobSubmission {
  _id?: string;
  submissionNumber?: number;
  user?: string;
  job: string | Job;
  githubRepo: string;
  body?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
