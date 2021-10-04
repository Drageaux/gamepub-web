import { PackageName, VersionName } from './package';

export type VersionOfPackage = Record<PackageName, VersionName>; // "com.unity."

export interface UnityManifest {
  dependencies: VersionOfPackage;
  scopedRegistries: Registry[];
}

export interface Registry {
  name: string;
  url: string;
  scopes: string[];
}
