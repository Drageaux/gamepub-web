import { PackageName, VersionName } from './package';

export type VersionOfPackageMapping = Record<PackageName, VersionName>; // "com.unity."

export interface UnityManifest {
  dependencies: VersionOfPackageMapping;
  scopedRegistries?: Registry[];
}

export interface Registry {
  name: string;
  url: string;
  scopes: string[];
}
