import { PackageName, Source, VersionName } from './package';

export type VersionOfPackageMapping = Record<PackageName, VersionName>; // "com.unity.[pkg]": "1.0.0"
export type PackageToSourceMapping = Record<PackageName, Source>; // "com.unity.[pkg]": "https://github.com"

export interface UnityManifest {
  dependencies: VersionOfPackageMapping;
  scopedRegistries?: Registry[];
}

export interface Registry {
  name: string;
  url: string;
  scopes: string[];
}
