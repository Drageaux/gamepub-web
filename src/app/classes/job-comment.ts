import { Job } from './job';
import { Project } from './project';

export interface JobComment {
  _id?: string;
  user?: string;
  project: string | Project;
  job: string | Job;
  body: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
