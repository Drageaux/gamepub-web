import { User } from './user';
import { Package } from './package';
import { Asset } from './asset';

export interface Project {
  // assets?: Asset[];
  // packages?: Package[];
  _id: string;
  creatorId: string; // User._id
  name: string;
  imageUrl?: string;
  tags?: string[];
  githubProject?: string;
}
