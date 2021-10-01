import { PackageName, VersionName } from './package';

export interface Registry {
  name: string;
  url: string;
  scopes: string[];
}

export interface UnityManifest {
  dependencies: Map<PackageName, VersionName>; // "com.unity.""
  scopedRegistries: Registry[];
}
