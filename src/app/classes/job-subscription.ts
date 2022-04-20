import { Job } from './job';

export interface JobSubscription {
  _id?: string;
  user?: string;
  job: string | Job;
  accepted: boolean;
  notified: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
