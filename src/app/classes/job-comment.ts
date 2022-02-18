import { Job } from './job';
import { Project } from './project';
import { User } from './user';

export interface JobComment {
  _id?: string;
  user?: string | User;
  project: string | Project;
  job: string | Job;
  body: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
