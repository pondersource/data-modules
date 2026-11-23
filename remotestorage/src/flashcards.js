// SPDX-License-Identifier: MIT
/**
 * Solid Memo keeps registrations and document addresses in the format in which
 * it created them. A Solid connection can expose its native documents alongside
 * the earlier remoteStorage RDF adapter without copying either collection.
 */
export function flashcardsDomain(api) {
  const sources = () => {
    const candidates = [api, api.adapter].filter(Boolean);
    return candidates.filter((source, index) =>
      candidates.findIndex(other => other.webId === source.webId) === index);
  };
  return {
    /** Identities whose type indexes should be read; native documents first. */
    storageSources() {
      return sources().map(source => ({webId:source.webId,root:source.root,
        ...(source === api.adapter && source !== api ? {optional:true} : {})}));
    },
    /** Keep registration changes in the type index that owns this instance. */
    identityFor(url) {
      const resource = new URL(url);
      const source = sources().find(({root}) => resource.href.startsWith(new URL(root).href));
      return source?.webId;
    }
  };
}
