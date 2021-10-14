import { Package } from './package';
import { Asset } from './asset';

export interface Project {
  // assets?: Asset[];
  // packages?: Package[];
  _id: string;
  creator: string;
  name: string;
  ghOwner?: string;
  ghRepo?: string;
}
