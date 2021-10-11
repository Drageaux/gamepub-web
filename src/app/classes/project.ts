import { Package } from './package';
import { Asset } from './asset';

export interface Project {
  // assets?: Asset[];
  // packages?: Package[];
  uid: string;
  ownerName?: string;
  repoName?: string;
}
