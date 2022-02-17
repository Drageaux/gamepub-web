import { Project } from './project';

export interface JobComment {
  _id?: string;
  text: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
