import { Package } from './package';
import { Asset } from './asset';

export interface Project {
  // assets?: Asset[];
  // packages?: Package[];
  _id?: string;
  creator: string;
  name: string;
  displayName?: string;
  imageUrl?: string;
  tags?: string[];
  githubRepo?: string;
  description?: string;
  private?: boolean;

  jobsCount?: number;
}
