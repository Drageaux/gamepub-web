import { Project } from './project';

export interface Job {
  _id: string;
  project: string | Project;
  title: string;
  body: string;
  imgUrl: string;
}
