import { Package } from './package';
import { Asset } from './asset';

export interface Project {
  // assets?: Asset[];
  // packages?: Package[];
  ownerName?: string;
  repoName?: string;
}
