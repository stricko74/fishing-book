// The three values the whole site hangs off — the same three as lib/store.ts in
// the app. Edit here, re-upload this one file, and every page and every /go/
// link follows. Nothing else on the site needs touching on launch day.
window.FISHING_BOOK = {
  // App Store Connect → Fishing Book → App Information → Apple ID (digits).
  appStoreId: '6810498075',
  // true once the app is actually on the App Store. Until then the page says
  // "Coming soon" and every /go/ link lands on the page instead of the store.
  live: false,
  // The pt=… number from any campaign link App Store Connect generates
  // (Analytics → Acquisition → Campaigns — it appears once the live app has a
  // few downloads). Empty = plain store links, unattributed. Never guess it:
  // a wrong pt credits the downloads to someone else's account.
  providerToken: '',
};

// Where a /go/<slug>/ link sends someone, for the campaign `ct`.
window.fishingBookStoreLink = function (ct) {
  const c = window.FISHING_BOOK || {};
  if (!c.live || !/^\d{6,}$/.test(c.appStoreId || '')) return null;
  if (/^\d{4,}$/.test(c.providerToken || '')) {
    return 'https://apps.apple.com/app/apple-store/id' + c.appStoreId +
      '?pt=' + c.providerToken + '&ct=' + encodeURIComponent(String(ct).slice(0, 30)) + '&mt=8';
  }
  return 'https://apps.apple.com/au/app/fishing-book/id' + c.appStoreId;
};
