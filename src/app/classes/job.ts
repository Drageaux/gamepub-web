import { JobComment } from './job-comment';
import { Project } from './project';

export interface Job {
  _id?: string;
  jobNumber?: number;
  project?: string | Project;
  title: string;
  body?: string;
  imageUrl?: string;
  comments?: JobComment[];
}
