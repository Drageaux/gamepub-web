import { Package } from './package';
import { Asset } from './asset';

export interface Project {
  name: string;
  assets: Asset[];
  packages: Package[];
}
