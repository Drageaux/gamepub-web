import { PackageName, VersionName } from './package';

export interface UnityManifest {
  dependencies: Record<PackageName, VersionName>; // "com.unity."
  scopedRegistries: Registry[];
}

export interface Registry {
  name: string;
  url: string;
  scopes: string[];
}
