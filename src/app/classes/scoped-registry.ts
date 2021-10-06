export type RegistryScope = string;
export interface ScopedRegistry {
  name: string;
  url: string;
  scopes: RegistryScope[];
}
