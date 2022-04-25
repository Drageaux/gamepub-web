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
  status: SubmissionStatusEnum;
}

export enum SubmissionStatusEnum {
  OPEN = 'OPEN',
  APPROVED = 'APPROVED',
  CHANGE_REQUESTED = 'CHANGE_REQUESTED',
  MERGED = 'MERGED',
  CLOSED = 'CLOSED',
}

export enum SubmissionStatusRenderEnum {
  OPEN = 'Open',
  APPROVED = 'Approved',
  CHANGE_REQUESTED = 'Change Requested',
  MERGED = 'Merged',
  CLOSED = 'Closed',
}
