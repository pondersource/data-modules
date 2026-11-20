// SPDX-License-Identifier: MIT
/** Use one registered OAuth callback per app, regardless of its current route. */
export function useOAuthHome(rs, browser = window) {
  for (const name of ['dropbox', 'googledrive']) {
    const backend = rs[name];
    if (!backend) continue;
    const connect = backend.connect.bind(backend);
    backend.connect = async (...args) => {
      const previous = browser.location.href;
      browser.history.replaceState(browser.history.state, '', browser.location.origin + '/');
      try {
        return await connect(...args);
      } catch (error) {
        browser.history.replaceState(browser.history.state, '', previous);
        throw error;
      }
    };
  }
}
