// SPDX-License-Identifier: MIT
export type StoredResource =
  | { kind: 'container'; etag: string; triples?: string[] }
  | { kind: 'rdf'; etag: string; triples: string[] }
  | { kind: 'file'; etag: string; contentType: string; bytes: Uint8Array };
export interface ResourceStore {
  get(url: string): Promise<StoredResource | undefined>;
  set(url: string, resource: StoredResource): Promise<void>;
  delete(url: string): Promise<void>;
  urls(): Promise<string[]>;
  clear(): Promise<void>;
  exclusive<T>(work: () => Promise<T>): Promise<T>;
}
