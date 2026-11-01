// ============================================================================
// ENHANCED CLOUDFLARE WORKER WITH CLICK TRACKING - CUSTOM THEME
// ============================================================================
// Features: Auto-copy, Copy buttons, Page titles, Click analytics, and more!
// ============================================================================

// ---------------------------------------------------------------------------
// SVG Icon library (Lucide-inspired, inline)
// ---------------------------------------------------------------------------
const icons = {
  link: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  barChart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  logOut: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  smartphone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  chrome: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  code: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  mousePointer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  share: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  tag: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  qrCode: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>',
  list: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  filter: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
};

// How many individual hits to keep in the rolling per-link click log (newest
// first). This is separate from the aggregate `stats:` counters, which are
// unbounded running totals. No IP address is ever captured or stored.
const CLICK_LOG_LIMIT = 50;

// The canonical domain for shortened links, regardless of which domain
// /clean, /admin, or /api/shorten were actually accessed through.
// chmp.me keeps serving the separate homepage/subdomain directory.
const CANONICAL_DOMAIN = 'https://chom.pm';

// Site favicon assets, embedded as base64 and served directly by the worker
// (no external host dependency). Shared across every page.
const FAVICON_ICO_B64 = "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xf/Bw8X/zM/R//L2+f/f4uX/5ejr//D09//T1tn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vr/8vb5/8PFx/+ztbf/s7W2/8XHyv/y9vn/zM/R/+zw8//f4uX/srW2/7O1t//Bw8X/8vb5/9jb3v/g5Ob/7vL1/8rNz//y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/s8Pn/pp33/6Sc9v+knPb/pJz2/8O/+P/w9Pn/v7v3/+vu+f+lnfb/o5z2/6Sb9v+jm/b/ubP3//L2+f++uff/8fT5/6ig9v+km/b/o5v2/6Sc9v+km/b/pZ32/+vu+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5/+ns+f+Pgvb/jYD2/42A9f+NgPX/s633/+7y+f+wqff/6Or5/46B9f+Mf/X/jH/1/4x/9f+mnvb/8vb5/62l9v/v8/n/koX2/4x/9f+Mf/X/jID2/4yA9f+OgvX/5+n5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/t8fT/wcPF/8DDxf/AwsT/wMPF/8HDxf/Aw8T/1NfZ/+vw8v/X2tz/8vb5/8/T1f/Aw8X/v8PE/7/CxP/Aw8X/297h/+zx8//V2Nv/8vb5//L2+f/y9vn/8vb6//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+vv8v+5u73/uLq8/7i6vP+4urz/uLu8/7i7vP/N0dP/6e3w/9HU1v/y9vn/x8rM/7a5uv+2ubr/trm6/7a5uv/V2dv/6+/y/8/S1P/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/5Ojr/+Ll6P/i5ej/4eXo/+Hl6P/h5ef/4uXo/+Ll6P/i5ej/4uXo/+Hl6P/i5ej/4uXo/+Hl6P/i5ej/4uXo/+Ll6P/i5ej/4uXo/+To6v/y9vn/8vb5//L2+v/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5/5eZmv9zdHT/eHl5/3h4ef94eHn/d3h5/3h5ef94eXn/eHh5/3h5ev94eHn/d3d4/3d3eP94eXn/d3h5/3h5ef94eXn/eHl5/3l5ef95eXr/c3R0/5WXl//x9fj/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/d4OP/dXV1/+ru8f/y9vn/8vb5//L2+v/y9vn/8vb6//L2+v/y9vn/8vb5/9zc+P+bkPX/6Or5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/r7/L/d3h4/9zf4v/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5/9nd3/9+fn7/8vb5//L2+v/y9vr/8vb5//L2+f/y9vr/8vb5//L2+f/r7vn/OyHx/6Oa9v9dSPP/sar3//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f+BgYL/2dzf//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5//L2+f/y9vn/2d3f/35/f//y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/r7fn/g3T0/9vc+P+/u/f/gHH0/+7y+f+Mf/X/eWj0/+3w+f/y9vn/8vb5//L2+f/y9vn/8vb5/4GBgv/Z3N//8vb6//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/Z3N//fn5///L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/3Rj8//CwPj/gHH0/9rb+P9yYfP/8vb5//L2+f+8uPf/ZFDz/+fp+f/y9vn/8vb5//L2+f/y9vr/gICB/9nc3//y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/9nc3/9+fn//8vb5//L2+v/y9vn/8vb5/+3x+f/o6/n/vbj3/35w9P+6tff/6u35/2VS8v/y9vn/7vL5/+7y+f/Lyvj/ZFDz/+3w+f/y9vn/8vb5//L2+f+AgIH/2dzf//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/2dzf/35+f//y9vn/8vb5//L2+f/o6vn/bFvz/2BL9P/y9vn/8vb5//L2+f/Avff/blzz//L2+f+/vPf/vbj3//L2+f++uvf/fGv0//L2+f/y9vn/8vb6/4CAgf/Z3N//8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/a3d//fn5///L2+f/y9vn/8vb5/+zw+f+Kffb/gXH1/8bE9//Ny/f/8vb5/0428v/m6Pn/8vb5//L2+f/y9vn/8vb5//L2+f+DdfT/w7/3//L2+f/y9vr/gICB/9nc3//y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5/9nc3/99fn//8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/5ef5/+bo+f/c3fj/Z1Tz//L2+f/y9vn/5+n5//L2+f/y9vn/8vb5/+Xn+f9rWPT/8vb5//L2+f+AgIH/2dzf//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+f/y9vn/2dzf/35+f//y9vr/8vb5/4h69f+glvX/jID1/6Sb9//DwPf/TTbx/3Ff9P/a2fn/8vb5//L2+f+Cc/T/8PT5//L2+f/T0vj/8vb5/2lW8//t8fn/8vb6/4CAgf/Z3N//8vb5//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+v/Z3d//fn5///L3+v/y9vn/YU70/7Kr9v+/u/f/oZj2/42A9P/j5Pn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8fX5/6if9v/y9vn/e2zz/9zd+f/y9vn/gICA/9nc3v/y9vn/8vb5//L2+v/y9vr/8vf6//L2+f/y9vn/8vb5/9nc3/9+fn//8vb5//L2+v9vXPP/4uP5//L2+v/y9vr/8vb5/7Ks9v/Pzfj/8vb5//L2+f/y9vr/8vb6/5KG9f/y9vn/8vb5//L2+f9kUfP/7vL5//L2+f+AgIH/2dze//L2+f/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/2dzf/35+f//y9vr/8vb6/8O/9/9+bvT/8vb5//L2+v/y9vr/6+75//D0+f/X1/j/fGv0//H1+f/y9vn/6ev5//L2+f/y9vn/ycf3/3lo8//y9vr/8vb6/4CAgf/Z3N7/8vb5//L2+f/y9vn/8vf6//L2+f/y9vn/8vb5//L2+f/Z3N//fn+A//L3+v/y9vn/8vb5/5CD9f+JfPX/7fD5//L2+f/y9vn/x8T3/1xG8v+UiPX/d2b0/+nr+f/y9vn/8vb5/8jF+P9bRvL/5Ob6//L2+v/y9vr/gICA/9nc3v/y9vn/8vb5//L2+f/y9/r/8vb5//L2+f/y9vn/8vb5/9nc3/9+fn//8vb5//L2+v/y9vn/8vb5/7Su9v9kUfP/ZFHz/2BM8/9/cPP/5Ob5//L2+f+9uPf/Y0/z/2FO8v9fS/P/e2v0/+Tl+f/y9vn/8vb5//L3+v+AgID/2dze//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/3eHj/3Z2dv/t8fT/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/7vL1/3h4eP/c3+L/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/l5iZ/3p6e/+FhYb/hIWG/4SFhf+Fhob/hYWG/4WFhv+EhYb/hYWG/4SFhv+DhIX/hYWG/4WGhv+EhYX/hIWF/4SFhf+Fhob/hYaG/4WFhv97fHz/lZaX//H1+P/y9vn/8vb6//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/3uHk/9nd3//Z3d//2d3f/9nd3//Z3d//2d3f/9nd3//Z3N//2dzf/9nc3//Z3N//2dzf/9nc3//Z3N//2dzf/9nd3//Z3d//2dzf/93h5P/y9vn/8vb6//L2+v/y9vr/8vb6//L2+v/y9vn/8vb6//L2+f/y9vn/8vb6//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+v/y9vn/8vb6//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+v/y9vr/8vf6//L2+v/y9vr/8vf6//L2+v/y9vn/8vb6//P3+v/y9vr/8vb6//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+v/y9/r/8vb6//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+f/y9vr/8vb6//L2+v/y9vn/8vb6//L2+v/y9vn/8vb6//L2+v/y9/r/8/f6//L2+v/y9vn/8vf6//L2+v/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb6//L2+v/y9vr/8vb6//L2+v/y9vr/8vb6//L2+f/y9vn/8vb6//L3+v/y9/r/8vf6//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L3+v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAADAAAABgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPL2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vf6//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L3+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+v/y9vr/8vf6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vf5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5/+js7//i5ej/4eXo/+Hl6P/h5ej/6u7w//L2+f/w9Pf/5Ojr//D09//y9vn/6u7x/+Hl6P/i5ej/4eXo/+Pm6f/t8fT/8vb5//D09//n6+7/8fX3//L2+f/p7fD/6+/y//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb6//L2+v/y9vr/8vb6//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5/7Gztf+CgoP/goKC/4KCg/+BgYL/ubu9//L2+f/k5+r/lZaY/+Lm6f/y9vn/ur2+/4GCgv+BgoP/gYKD/4qLjP/T1tn/8vb5/+Pm6f+mqKn/6Ovu//D09/+3urz/wcTG//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb5/+bp7P/d4OP/3eDj/93g4//d4OL/5+vt//L2+f/v8/b/4OTn/+/z9v/y9vn/5+vu/93g4v/d4OP/3eDj/97i5P/s8PP/8vb5/+/z9v/j5+r/8PT3//L2+f/n6+3/6ezv//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//H1+f/k5fn/2Nj4/9jY+P/Y2Pj/2Nj4/9jY+P/Y2Pj/6ev5//L2+f/l5/n/5ef5//H1+f/j5fj/2Nj4/9jY+P/Y2Pj/2Nf4/9jX+P/Y2Pj/4+X4//L2+f/r7vn/3t74//L2+f/m6Pn/2Nj4/9jX+P/Y2Pj/2Nf4/9jY+P/Y2Pj/2Nj4/9jY+P/j5Pn/8fX5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+3w+f+Ogfb/QCbz/z8l8v8/JfL/PiXy/z4l8v9AJ/L/r6j3//D0+f+bkPb/m5H2/+zw+f+KfvX/PiTx/z0k8f8+JPL/PiTy/z0j8f8+JPH/jH/1//L2+f/Cv/f/Z1Pz//D0+f+dk/b/QSjy/z4k8v89JfH/PSTx/z4l8v8+JPL/PiTy/z8m8v+JfPX/7O/5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vr/8vb5//L2+f/y9vn/8vb6//H1+f/f4Pj/0c/4/9HP+f/Rz/j/0c/4/9HP+P/Rz/j/5ef5//L2+v/h4/j/4eP4//H1+f/f3/j/0M74/9DP+P/Rz/j/0M/4/9DP+P/Qzvj/3t/4//L2+f/p6/n/2Nf4//L2+f/i4/j/0c/4/9DP+P/Rz/j/0M/4/9HP+f/Rz/n/0M/4/9HP+P/e3/n/8fX5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//H1+P/o7O//4eXo/+Hl5//h5ef/4eXn/+Hl5//h5ej/4uXo/+Hl5//i5ej/7PDz//H1+P/o6+7/7fH0//L2+f/v8/b/4+fp/+Dl5//h5ef/4OXn/+Dl5//h5ef/4eXn/+Xp7P/y9vn/7/P2/+To6v/w9Pf/8vb5//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+7y9f+xtLX/h4iI/4eHiP+Gh4f/hoaH/4aHh/+Gh4j/h4iI/4eIiP+HiIn/yMvN/+3x9P+usbP/09bY//L2+f/b3+H/kJGS/4SFhv+EhYX/hIWF/4SFhf+EhYb/hIWG/56gof/w9Pf/3eHj/5eYmv/m6u3/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//H1+P/m6u3/3+Ll/9/i5f/f4uT/3uLk/97i5P/e4uT/3+Lk/9/i5f/f4uX/6u7x//H1+P/m6ez/7PDz//L2+f/u8vX/4OPm/97h5P/d4eT/3eHk/97h5P/d4eT/3uHk/+Lm6f/y9vn/7vL1/+Hl6P/w9Pf/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+7y9f/t8PP/7fDz/+zw8//t8PP/7PDz/+zw8//s8PP/7PDz/+3w8//t8PP/7fDz/+3w8//t8PP/7PDz/+zw8//s8PP/7fDz/+zw8//t8PP/7PDz/+3w8//t8PP/7fDz/+3w8//t8PP/7fDz/+3w8//t8PP/7vL1//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/t8fX/xcjK/6WmqP+goqP/oaKj/6Cio/+goqP/oKGj/6Cho/+goaP/oKKj/6Cio/+goqP/oKKj/6Cio/+goqP/oKGj/5+ho/+foaP/oKGj/6Cio/+goqP/oKKj/6Cio/+goqP/oKKj/6Cio/+goqP/oaKj/6Gio/+hoqP/paan/8PGyP/t8fT/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/Cxcf/eHl5/3Jycv99fn//fn5//35/f/9+fn//fn9//35/f/9+fn//fn9//35/f/9+f3//fn5//35/gP9+f4D/fX5//31+f/99fX7/fX5//35/f/9+f3//fX5//35/f/9+f3//fX9//35+f/9+f3//fn9//35/gP9+f3//cnJy/3h4eP/AwsT/8fX4//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5/+zw8/+en6D/c3Nz/9zf4f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/5uj4/9LQ+P/i4/j/8fX5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/3+Pl/3V2dv+cnZ//6+/y//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5/+rt8P+XmZn/hoaH//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5//L2+f/Pzff/bFrz/1Q+8v9lUvP/qqL2/+3w+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/4uMjP+YmZr/6u3w//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8P+XmZn/iIiJ//L2+f/y9vr/8vb6//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+/y+f+HefT/NRrx/8bD9/+yrPb/TTTy/2dT9P/Z2Pj/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/4yNjv+YmZr/6u3x//L2+v/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8P+XmZr/iImK//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//H1+f/X1/j/ta73/+Xn+f/n6fn/fm/0/1Y/8v/q7fn/6Or5/3hm9P9UPPL/wb33/+/z+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/4yNjv+YmZr/6e3w//L2+v/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8P+YmZn/iImK//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/9ra+P9yYfP/cV/1/3Vk9P/o7Pn/5un5/zsh7//Qz/j/8vb5/+zv+f+ooPb/Ujvy/5mO9f/p7Pn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/4yNjf+YmZr/6u3w//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8P+XmJn/iIiJ//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/3lp8/+Ie/T/3+L5/0Qr8f/q7fn/ta/3/0Am8P/h4vn/8vb5//L2+f/w8/n/0dD4/1I88v+Mf/X/7O/5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb6/4uMjP+XmZr/6e3w//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8P+XmJn/iImJ//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//H1+f/t8Pn/8fX5/7ex9/9ZRPP/Uz7y/21c8//y9vn/3d34/0cu8P/AvPf/8vb5//L2+f/w8/n/8fb5/9rb+P9ZQ/L/oJb2/+/z+f/y9vn/8vb5//L2+f/y9vn/8vb5/4uMjf+YmZr/6u3w//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmJn/iImJ//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/8vJ9/+CdPX/oZf2//L2+f/t8fn/1dX4/+Hi+f/y9vn/8fb5/11J8v+wqff/8vb5/+Tm+f+ckvX/4+X4//L2+f/Jxvf/UDny/6Wc9v/x9fn/8vb5//L2+f/y9vn/8vb5/4yMjf+YmZr/6u3w//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5/+rt8f+XmJn/iImJ//L2+v/y9vn/8vb5//L2+f/y9vn/1tb4/0428f+JfPX/YUz0//L2+f/y9vn/8vb5//L2+f/c3fj/h3vz/0cv8v/Z2fj/8vb5/+fp+f+uqPf/5uj5//L2+f/x9fn/x8T3/0Uq8f/Dv/f/8vb5//L2+f/y9vn/8vb6/4yMjf+XmZr/6e3w//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+YmZn/iIiJ//L3+v/y9vn/8vb5//L2+f/y9vn/4+X4/2dU9P9NNfP/jID2/+zv+f/R0Pj/7fD5//L2+f+Xi/X/QSfx/9HP+P/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/5qQ9f9zYvT/6Ov5//L2+f/y9vr/8vb5/4uMjf+XmJr/6e3w//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+YmZn/iIiK//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5/+zv+f+6tPf/2Nf4/+Dh+P+QhPT/4+X4//L2+f+pofb/ZVHz//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+Dh+P9kUPP/w7/3//L2+f/y9vn/8vb6/4uMjf+XmJr/6e3w//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmJn/iImJ//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//H0+f/o6/n/7vL5/+Xo+P9rWfT/lov1//L2+v/y9vn/8fb5/+Xo+f/k5/n/8vb5//L2+f/y9vn/8vb5//H0+f+WivX/emr1//L2+f/y9vn/8vb5/4uMjf+XmJr/6e3w//L2+f/y9vn/8vb6//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8P+XmJn/iImJ//L2+v/y9vn/8vb5/8TC9/+bkPb/2dn4/9DP+P+ro/f/3Nz4/+bp+P+UiPT/QCfy/0Mq8v9xX/P/5Ob5//L2+f/y9vn/8vb5/3hm8/+Th/X/8fX5//L2+f/r7fn/6+35//L2+f/EwPf/RSzx//D0+v/y9vr/8vb6/4uMjf+XmJn/6e3w//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmJn/iImK//L3+v/y9vr/8vb5/3lp9P9NNfL/ZlPy/2VR8/9gS/T/Yk3z/2tZ8v9iTfP/sav2/8rH9//q7fn/8vb5//L2+f/y9vn/8vb5/9vc+P/e3/j/8vb5//L2+f+ro/b/pJv2//L2+f/e3/j/PSPv/9fX+f/y9vr/8vb6/4uMjf+XmJn/6e3w//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+v/y9vn/8vb5//L2+f/y9vn/8vb6/+rt8f+XmZn/iImK//L2+v/y9vr/8vb5/21a9P+akPb/2tr4/93d+P/i5Pn/z874/8PA9//e3vj/8PT5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/y9vn/8vb5//L2+f/e3/j/3t/5//L2+f/j5fj/QCXw/8/N+P/y9vn/8vb5/4uLjP+XmJn/6e3w//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmJn/iImJ//L3+f/y9vn/8vb6/4yA9f+Je/T/8PP5//L2+v/y9vn/8vf6//L2+f/y9vn/sKn2/9HQ+P/y9vn/8vb5//L2+f/y9vn/8vb6//L2+v/U1Pj/ubT2//L2+f/y9vn/8vb5//L2+f/OzPj/PiTx/+jq+f/y9vn/8vb6/4uMjf+XmJn/6e3w//L2+f/y9vn/8vb6//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmJr/iImK//L2+f/y9vn/8vb5/8fE9/9gTPP/39/4//L2+v/y9vr/8vb6//L2+f/y9vn/lIn1/7669//y9vn/8fX5/8nF+P/t8Pn/8vb5//L2+v/Gw/j/nZP2//L2+f/y9vn/8vb5//D0+f+ckfX/aVbz//L2+f/y9vn/8vb5/4uMjf+XmJn/6e3w//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmJn/iImK//L3+v/y9vr/8vb6/+jr+f9zYfP/joD1//L2+f/y9vr/8vb6//L2+v/y9vn/7vL5//H1+f/y9vn/qKD2/z8k8f+wqff/8vb5//L2+f/w9Pn/7/P5//L2+f/y9vn/8vb5/97e+P9YQvL/v7v3//L2+v/y9vn/8vb6/4uMjf+XmJn/6e7w//L2+f/y9vn/8vb5//L2+f/y9vn/8vf6//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5/+rt8f+XmJr/iYmK//L3+v/y9vr/8vb5//L2+v/Ny/f/STHy/5mO9v/l6Pn/8fX5//L2+f/y9vn/8vf6/+rt+f+tpfb/Qyjw/4R29P9TPPH/wr73/+3w+f/y9vn/8vb5//L2+f/w9Pn/3d75/2lW8/9+b/T/6u36//L2+v/y9vr/8vf6/4uMjP+XmJn/6e3w//L3+f/y9vn/8vb5//L2+f/y9vr/8vf6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5/+rt8f+XmZn/iYmK//L2+v/y9vr/8vb5//L2+f/y9vn/ycb3/2lW9P9sWvP/oZj2/7659/+/uvf/p573/3Vk8/9gTPP/trD3/+3w+f+nn/b/VT7y/4Bw9P+wqfb/xsL3/7u29v+UiPX/V0Hz/35u9P/e3/n/8vb6//L2+v/y9vr/8vf6/4uMjP+XmJn/6e3w//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L3+v/y9vn/8vb5/+rt8P+XmJn/iYmJ//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5/+Tm+P+xq/b/bVv0/0w08f9JMfL/YUzz/56U9f/d3fj/8PT5//L2+f/v8vn/2Nf4/42B9f9WP/L/PCLv/0gw8v90Y/T/wb73/+rt+f/y9vn/8vf5//L2+f/y9vr/8vb6/4uMjP+XmJn/6e3w//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5/+ru8f+Ympv/goKD/+/z9v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+v/y9vn/8PT3/4aGh/+YmZr/6u7x//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5/+/z9v+tr7H/cXFx/66vsf/Fx8n/xsnL/8bJy//GyMv/xsjK/8bJy//Gycv/xsnL/8bJy//Gycv/xsnL/8bIyv/GyMr/xsjK/8XIyv/GyMv/xsnL/8bJy//Gycv/xsnK/8bIyv/GyMr/xsjL/8bJy//Gycv/xsnL/8bJy//FyMr/sLK0/3Jycv+qrK3/7vL1//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/i5ej/kJGS/3Fxcf91dnb/dnZ3/3Z3eP92dnf/dXZ3/3Z3d/93d3j/dnd3/3Z2d/92d3f/dnd3/3Z2d/93d3f/dXZ3/3V1dv92dnf/d3d3/3Z3d/92d3f/dnZ3/3Z2d/92dnf/dnZ3/3Z3d/92d3j/dnd4/3d3d/92d3f/cXJx/46PkP/g5Ob/8vb5//L2+f/y9vn/8vb6//L2+f/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8fX4/9bZ3P/JzM7/yMzO/8jMzv/IzM7/yMzO/8jMzv/IzM7/yMzO/8jMzv/IzM3/yMzO/8jLzf/IzM7/yMvO/8jLzf/Iy83/yMvO/8jLzv/Iy83/yMvN/8jLzf/Iy83/yMvN/8jMzv/IzM7/yMzO/8jLzv/Iy83/1Nfa//H1+P/y9vn/8vb6//L2+v/y9vr/8vb5//L3+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+v/y9vr/8vb5//L2+f/y9vr/8vb5//L2+f/y9vr/8vb6//L2+v/y9vr/8vb6//L2+f/y9vn/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+v/y9vr/8vb6//L2+v/y9vr/8vf5//L2+f/y9vn/8vb6//L2+f/y9vn/8vb5//L2+v/y9vn/8vb5//L2+v/y9vr/8vb6//L3+v/y9vn/8vb5//L2+f/y9vr/8vb5//L2+v/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vr/8vb5//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vn/8vb6//L2+v/y9vr/8vb6//L3+v/y9vr/8vb5//L2+v/y9vr/8vf6//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//L2+f/y9vr/8vb6//L2+f/y9vr/8vb6//L2+v/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vr/8vf6//L2+v/y9vr/8vb5//L2+v/y9vr/8vb6//L2+f/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb5//L2+v/y9vn/8vb5//L2+v/y9vr/8vb6//L2+f/y9vr/8vb6//L2+f/y9vr/8/f6//L2+v/y9/r/8vb6//L2+f/y9vr/8vf6//L2+v/y9vn/8vb5//L2+f/y9vr/8vf6//L2+f/y9vr/8vb5//L2+f/y9/r/8vb5//L2+v/y9vr/8vb6//L2+v/y9vr/8vb6//L2+f/y9vr/8vb6//L2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+v/y9/r/8vf6//L2+v/y9vr/8vb6//L2+f/y9vr/8vb6//L2+f/y9vn/8vb6//L2+v/y9vr/8vf6//P3+v/y9/r/8vb6//L2+f/y9vr/8vb5//L2+v/y9vn/8vb5//L2+f/y9vr/8/b6//L3+v/y9vn/8vb6//L2+f/y9vn/8vb6//L2+v/y9vr/8vb5//L2+f/y9vr/8vb6//L2+v/y9vr/8vb6//L2+v/y9vr/8vb5//L2+v/y9vn/8vb6//L2+v/y9/r/8vf6//L3+v/y9vr/8vb5//P2+v/y9vr/8vb5//L2+f/y9vn/8vb5//L2+f/y9vr/8vb6/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
const FAVICON_16_B64 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAACFElEQVQ4EW1STWtTURA9975HIm1ajUZsIhitpSZga6oUCqLiSqoLV7px51/wP4lrP0DcCBEXrWhaRQSJaD9IGyoiMa225t1xZvLu47Vx4L37MWfOnHvvMXs7HYIBQPzFIVPZSofupXB+HWqd/oDt7jYcuXTdwNwYg5Fcrt+A60KPqL96DUkGYcBbB1t5lEHU63ETwrUrlxWVEHS7XdyavwG3tglXXwCyWdDOb5jDI8CfPSCKYCdPw85N4dnzF8oowhMC38PVFxHeuw3a+gFYC/rZYVQIUy4hevQU9tL55H5E5wABbWyh9/Ax6G8PwUUGT02Cvq6DVlrgw4N2WU0qbGquDxE+uA9zcgzB9Tm4dx9VujlVVAXo/AIOZdMlgwr4hkDt78BoDvbqLKInL2FrFdCXVdjZ6X3FstinQLOBRXD3Jqi5Alrf0I6u8Qnm+FGYiXJM0HeJXGJCIE/jnNMLknRwZ75vLlYTsBIzXdFiwVDsFcGZXXEix2a7jUZjmQkMyIg54y5MzPYQqPy4mFCrXUBx7ISuEwJJf1tdQ6vFsnkxPDSEUqmoKj43mwquVs7pOp8/EtOlFNDCEvSshTzMTFV9QHx2jA6zeWYA9oNbfK/kplbVPWmqCmQi55DxzduGWnr8TBmZTAZLyx8wcXYcQSAWBwqFYzr6X3IE2fBEPnlwTOf9PHkFAett8ijJ/4VXKTmP/Qd6a8f0tNMiSQAAAABJRU5ErkJggg==";
const FAVICON_32_B64 = "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";
const APPLE_TOUCH_ICON_B64 = "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";
const ANDROID_192_B64 = "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";
const ANDROID_512_B64 = "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";
const FAVICON_ROUTES = {
  '/favicon.ico': { data: FAVICON_ICO_B64, type: 'image/x-icon' },
  '/favicon-16x16.png': { data: FAVICON_16_B64, type: 'image/png' },
  '/favicon-32x32.png': { data: FAVICON_32_B64, type: 'image/png' },
  '/apple-touch-icon.png': { data: APPLE_TOUCH_ICON_B64, type: 'image/png' },
  '/android-chrome-192x192.png': { data: ANDROID_192_B64, type: 'image/png' },
  '/android-chrome-512x512.png': { data: ANDROID_512_B64, type: 'image/png' },
};

// ---------------------------------------------------------------------------
// QR code generation: shared library + modal, embedded into both the admin
// and clean-page templates below. URL QR codes reuse the existing shortener
// (so scans are tracked); Email/vCard QR codes are encoded entirely
// client-side and never touch the server.
// ---------------------------------------------------------------------------
const QR_LIB_JS = "// ---------------------------------------------------------------------------\n// QR code encoder (vendored, MIT License, Copyright (c) 2009 Kazuhiko Arase)\n// https://github.com/kazuhikoarase/qrcode-generator - generates QR modules\n// entirely client-side; no data ever leaves the browser to produce a QR code.\n// ---------------------------------------------------------------------------\n//---------------------------------------------------------------------\n//\n// QR Code Generator for JavaScript\n//\n// Copyright (c) 2009 Kazuhiko Arase\n//\n// URL: http://www.d-project.com/\n//\n// Licensed under the MIT license:\n//  http://www.opensource.org/licenses/mit-license.php\n//\n// The word 'QR Code' is registered trademark of\n// DENSO WAVE INCORPORATED\n//  http://www.denso-wave.com/qrcode/faqpatent-e.html\n//\n//---------------------------------------------------------------------\n\nvar qrcode = function() {\n\n  //---------------------------------------------------------------------\n  // qrcode\n  //---------------------------------------------------------------------\n\n  /**\n   * qrcode\n   * @param typeNumber 1 to 40\n   * @param errorCorrectionLevel 'L','M','Q','H'\n   */\n  var qrcode = function(typeNumber, errorCorrectionLevel) {\n\n    var PAD0 = 0xEC;\n    var PAD1 = 0x11;\n\n    var _typeNumber = typeNumber;\n    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];\n    var _modules = null;\n    var _moduleCount = 0;\n    var _dataCache = null;\n    var _dataList = [];\n\n    var _this = {};\n\n    var makeImpl = function(test, maskPattern) {\n\n      _moduleCount = _typeNumber * 4 + 17;\n      _modules = function(moduleCount) {\n        var modules = new Array(moduleCount);\n        for (var row = 0; row < moduleCount; row += 1) {\n          modules[row] = new Array(moduleCount);\n          for (var col = 0; col < moduleCount; col += 1) {\n            modules[row][col] = null;\n          }\n        }\n        return modules;\n      }(_moduleCount);\n\n      setupPositionProbePattern(0, 0);\n      setupPositionProbePattern(_moduleCount - 7, 0);\n      setupPositionProbePattern(0, _moduleCount - 7);\n      setupPositionAdjustPattern();\n      setupTimingPattern();\n      setupTypeInfo(test, maskPattern);\n\n      if (_typeNumber >= 7) {\n        setupTypeNumber(test);\n      }\n\n      if (_dataCache == null) {\n        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);\n      }\n\n      mapData(_dataCache, maskPattern);\n    };\n\n    var setupPositionProbePattern = function(row, col) {\n\n      for (var r = -1; r <= 7; r += 1) {\n\n        if (row + r <= -1 || _moduleCount <= row + r) continue;\n\n        for (var c = -1; c <= 7; c += 1) {\n\n          if (col + c <= -1 || _moduleCount <= col + c) continue;\n\n          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )\n              || (0 <= c && c <= 6 && (r == 0 || r == 6) )\n              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {\n            _modules[row + r][col + c] = true;\n          } else {\n            _modules[row + r][col + c] = false;\n          }\n        }\n      }\n    };\n\n    var getBestMaskPattern = function() {\n\n      var minLostPoint = 0;\n      var pattern = 0;\n\n      for (var i = 0; i < 8; i += 1) {\n\n        makeImpl(true, i);\n\n        var lostPoint = QRUtil.getLostPoint(_this);\n\n        if (i == 0 || minLostPoint > lostPoint) {\n          minLostPoint = lostPoint;\n          pattern = i;\n        }\n      }\n\n      return pattern;\n    };\n\n    var setupTimingPattern = function() {\n\n      for (var r = 8; r < _moduleCount - 8; r += 1) {\n        if (_modules[r][6] != null) {\n          continue;\n        }\n        _modules[r][6] = (r % 2 == 0);\n      }\n\n      for (var c = 8; c < _moduleCount - 8; c += 1) {\n        if (_modules[6][c] != null) {\n          continue;\n        }\n        _modules[6][c] = (c % 2 == 0);\n      }\n    };\n\n    var setupPositionAdjustPattern = function() {\n\n      var pos = QRUtil.getPatternPosition(_typeNumber);\n\n      for (var i = 0; i < pos.length; i += 1) {\n\n        for (var j = 0; j < pos.length; j += 1) {\n\n          var row = pos[i];\n          var col = pos[j];\n\n          if (_modules[row][col] != null) {\n            continue;\n          }\n\n          for (var r = -2; r <= 2; r += 1) {\n\n            for (var c = -2; c <= 2; c += 1) {\n\n              if (r == -2 || r == 2 || c == -2 || c == 2\n                  || (r == 0 && c == 0) ) {\n                _modules[row + r][col + c] = true;\n              } else {\n                _modules[row + r][col + c] = false;\n              }\n            }\n          }\n        }\n      }\n    };\n\n    var setupTypeNumber = function(test) {\n\n      var bits = QRUtil.getBCHTypeNumber(_typeNumber);\n\n      for (var i = 0; i < 18; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;\n      }\n\n      for (var i = 0; i < 18; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;\n      }\n    };\n\n    var setupTypeInfo = function(test, maskPattern) {\n\n      var data = (_errorCorrectionLevel << 3) | maskPattern;\n      var bits = QRUtil.getBCHTypeInfo(data);\n\n      // vertical\n      for (var i = 0; i < 15; i += 1) {\n\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n\n        if (i < 6) {\n          _modules[i][8] = mod;\n        } else if (i < 8) {\n          _modules[i + 1][8] = mod;\n        } else {\n          _modules[_moduleCount - 15 + i][8] = mod;\n        }\n      }\n\n      // horizontal\n      for (var i = 0; i < 15; i += 1) {\n\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n\n        if (i < 8) {\n          _modules[8][_moduleCount - i - 1] = mod;\n        } else if (i < 9) {\n          _modules[8][15 - i - 1 + 1] = mod;\n        } else {\n          _modules[8][15 - i - 1] = mod;\n        }\n      }\n\n      // fixed module\n      _modules[_moduleCount - 8][8] = (!test);\n    };\n\n    var mapData = function(data, maskPattern) {\n\n      var inc = -1;\n      var row = _moduleCount - 1;\n      var bitIndex = 7;\n      var byteIndex = 0;\n      var maskFunc = QRUtil.getMaskFunction(maskPattern);\n\n      for (var col = _moduleCount - 1; col > 0; col -= 2) {\n\n        if (col == 6) col -= 1;\n\n        while (true) {\n\n          for (var c = 0; c < 2; c += 1) {\n\n            if (_modules[row][col - c] == null) {\n\n              var dark = false;\n\n              if (byteIndex < data.length) {\n                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);\n              }\n\n              var mask = maskFunc(row, col - c);\n\n              if (mask) {\n                dark = !dark;\n              }\n\n              _modules[row][col - c] = dark;\n              bitIndex -= 1;\n\n              if (bitIndex == -1) {\n                byteIndex += 1;\n                bitIndex = 7;\n              }\n            }\n          }\n\n          row += inc;\n\n          if (row < 0 || _moduleCount <= row) {\n            row -= inc;\n            inc = -inc;\n            break;\n          }\n        }\n      }\n    };\n\n    var createBytes = function(buffer, rsBlocks) {\n\n      var offset = 0;\n\n      var maxDcCount = 0;\n      var maxEcCount = 0;\n\n      var dcdata = new Array(rsBlocks.length);\n      var ecdata = new Array(rsBlocks.length);\n\n      for (var r = 0; r < rsBlocks.length; r += 1) {\n\n        var dcCount = rsBlocks[r].dataCount;\n        var ecCount = rsBlocks[r].totalCount - dcCount;\n\n        maxDcCount = Math.max(maxDcCount, dcCount);\n        maxEcCount = Math.max(maxEcCount, ecCount);\n\n        dcdata[r] = new Array(dcCount);\n\n        for (var i = 0; i < dcdata[r].length; i += 1) {\n          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];\n        }\n        offset += dcCount;\n\n        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);\n        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);\n\n        var modPoly = rawPoly.mod(rsPoly);\n        ecdata[r] = new Array(rsPoly.getLength() - 1);\n        for (var i = 0; i < ecdata[r].length; i += 1) {\n          var modIndex = i + modPoly.getLength() - ecdata[r].length;\n          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;\n        }\n      }\n\n      var totalCodeCount = 0;\n      for (var i = 0; i < rsBlocks.length; i += 1) {\n        totalCodeCount += rsBlocks[i].totalCount;\n      }\n\n      var data = new Array(totalCodeCount);\n      var index = 0;\n\n      for (var i = 0; i < maxDcCount; i += 1) {\n        for (var r = 0; r < rsBlocks.length; r += 1) {\n          if (i < dcdata[r].length) {\n            data[index] = dcdata[r][i];\n            index += 1;\n          }\n        }\n      }\n\n      for (var i = 0; i < maxEcCount; i += 1) {\n        for (var r = 0; r < rsBlocks.length; r += 1) {\n          if (i < ecdata[r].length) {\n            data[index] = ecdata[r][i];\n            index += 1;\n          }\n        }\n      }\n\n      return data;\n    };\n\n    var createData = function(typeNumber, errorCorrectionLevel, dataList) {\n\n      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);\n\n      var buffer = qrBitBuffer();\n\n      for (var i = 0; i < dataList.length; i += 1) {\n        var data = dataList[i];\n        buffer.put(data.getMode(), 4);\n        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );\n        data.write(buffer);\n      }\n\n      // calc num max data.\n      var totalDataCount = 0;\n      for (var i = 0; i < rsBlocks.length; i += 1) {\n        totalDataCount += rsBlocks[i].dataCount;\n      }\n\n      if (buffer.getLengthInBits() > totalDataCount * 8) {\n        throw 'code length overflow. ('\n          + buffer.getLengthInBits()\n          + '>'\n          + totalDataCount * 8\n          + ')';\n      }\n\n      // end code\n      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {\n        buffer.put(0, 4);\n      }\n\n      // padding\n      while (buffer.getLengthInBits() % 8 != 0) {\n        buffer.putBit(false);\n      }\n\n      // padding\n      while (true) {\n\n        if (buffer.getLengthInBits() >= totalDataCount * 8) {\n          break;\n        }\n        buffer.put(PAD0, 8);\n\n        if (buffer.getLengthInBits() >= totalDataCount * 8) {\n          break;\n        }\n        buffer.put(PAD1, 8);\n      }\n\n      return createBytes(buffer, rsBlocks);\n    };\n\n    _this.addData = function(data, mode) {\n\n      mode = mode || 'Byte';\n\n      var newData = null;\n\n      switch(mode) {\n      case 'Numeric' :\n        newData = qrNumber(data);\n        break;\n      case 'Alphanumeric' :\n        newData = qrAlphaNum(data);\n        break;\n      case 'Byte' :\n        newData = qr8BitByte(data);\n        break;\n      case 'Kanji' :\n        newData = qrKanji(data);\n        break;\n      default :\n        throw 'mode:' + mode;\n      }\n\n      _dataList.push(newData);\n      _dataCache = null;\n    };\n\n    _this.isDark = function(row, col) {\n      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {\n        throw row + ',' + col;\n      }\n      return _modules[row][col];\n    };\n\n    _this.getModuleCount = function() {\n      return _moduleCount;\n    };\n\n    _this.make = function() {\n      if (_typeNumber < 1) {\n        var typeNumber = 1;\n\n        for (; typeNumber < 40; typeNumber++) {\n          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);\n          var buffer = qrBitBuffer();\n\n          for (var i = 0; i < _dataList.length; i++) {\n            var data = _dataList[i];\n            buffer.put(data.getMode(), 4);\n            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );\n            data.write(buffer);\n          }\n\n          var totalDataCount = 0;\n          for (var i = 0; i < rsBlocks.length; i++) {\n            totalDataCount += rsBlocks[i].dataCount;\n          }\n\n          if (buffer.getLengthInBits() <= totalDataCount * 8) {\n            break;\n          }\n        }\n\n        _typeNumber = typeNumber;\n      }\n\n      makeImpl(false, getBestMaskPattern() );\n    };\n\n    _this.createTableTag = function(cellSize, margin) {\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      var qrHtml = '';\n\n      qrHtml += '<table style=\"';\n      qrHtml += ' border-width: 0px; border-style: none;';\n      qrHtml += ' border-collapse: collapse;';\n      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';\n      qrHtml += '\">';\n      qrHtml += '<tbody>';\n\n      for (var r = 0; r < _this.getModuleCount(); r += 1) {\n\n        qrHtml += '<tr>';\n\n        for (var c = 0; c < _this.getModuleCount(); c += 1) {\n          qrHtml += '<td style=\"';\n          qrHtml += ' border-width: 0px; border-style: none;';\n          qrHtml += ' border-collapse: collapse;';\n          qrHtml += ' padding: 0px; margin: 0px;';\n          qrHtml += ' width: ' + cellSize + 'px;';\n          qrHtml += ' height: ' + cellSize + 'px;';\n          qrHtml += ' background-color: ';\n          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';\n          qrHtml += ';';\n          qrHtml += '\"/>';\n        }\n\n        qrHtml += '</tr>';\n      }\n\n      qrHtml += '</tbody>';\n      qrHtml += '</table>';\n\n      return qrHtml;\n    };\n\n    _this.createSvgTag = function(cellSize, margin, alt, title) {\n\n      var opts = {};\n      if (typeof arguments[0] == 'object') {\n        // Called by options.\n        opts = arguments[0];\n        // overwrite cellSize and margin.\n        cellSize = opts.cellSize;\n        margin = opts.margin;\n        alt = opts.alt;\n        title = opts.title;\n      }\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      // Compose alt property surrogate\n      alt = (typeof alt === 'string') ? {text: alt} : alt || {};\n      alt.text = alt.text || null;\n      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;\n\n      // Compose title property surrogate\n      title = (typeof title === 'string') ? {text: title} : title || {};\n      title.text = title.text || null;\n      title.id = (title.text) ? title.id || 'qrcode-title' : null;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var c, mc, r, mr, qrSvg='', rect;\n\n      rect = 'l' + cellSize + ',0 0,' + cellSize +\n        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';\n\n      qrSvg += '<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"';\n      qrSvg += !opts.scalable ? ' width=\"' + size + 'px\" height=\"' + size + 'px\"' : '';\n      qrSvg += ' viewBox=\"0 0 ' + size + ' ' + size + '\" ';\n      qrSvg += ' preserveAspectRatio=\"xMinYMin meet\"';\n      qrSvg += (title.text || alt.text) ? ' role=\"img\" aria-labelledby=\"' +\n          escapeXml([title.id, alt.id].join(' ').trim() ) + '\"' : '';\n      qrSvg += '>';\n      qrSvg += (title.text) ? '<title id=\"' + escapeXml(title.id) + '\">' +\n          escapeXml(title.text) + '</title>' : '';\n      qrSvg += (alt.text) ? '<description id=\"' + escapeXml(alt.id) + '\">' +\n          escapeXml(alt.text) + '</description>' : '';\n      qrSvg += '<rect width=\"100%\" height=\"100%\" fill=\"white\" cx=\"0\" cy=\"0\"/>';\n      qrSvg += '<path d=\"';\n\n      for (r = 0; r < _this.getModuleCount(); r += 1) {\n        mr = r * cellSize + margin;\n        for (c = 0; c < _this.getModuleCount(); c += 1) {\n          if (_this.isDark(r, c) ) {\n            mc = c*cellSize+margin;\n            qrSvg += 'M' + mc + ',' + mr + rect;\n          }\n        }\n      }\n\n      qrSvg += '\" stroke=\"transparent\" fill=\"black\"/>';\n      qrSvg += '</svg>';\n\n      return qrSvg;\n    };\n\n    _this.createDataURL = function(cellSize, margin) {\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n\n      return createDataURL(size, size, function(x, y) {\n        if (min <= x && x < max && min <= y && y < max) {\n          var c = Math.floor( (x - min) / cellSize);\n          var r = Math.floor( (y - min) / cellSize);\n          return _this.isDark(r, c)? 0 : 1;\n        } else {\n          return 1;\n        }\n      } );\n    };\n\n    _this.createImgTag = function(cellSize, margin, alt) {\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n\n      var img = '';\n      img += '<img';\n      img += '\\u0020src=\"';\n      img += _this.createDataURL(cellSize, margin);\n      img += '\"';\n      img += '\\u0020width=\"';\n      img += size;\n      img += '\"';\n      img += '\\u0020height=\"';\n      img += size;\n      img += '\"';\n      if (alt) {\n        img += '\\u0020alt=\"';\n        img += escapeXml(alt);\n        img += '\"';\n      }\n      img += '/>';\n\n      return img;\n    };\n\n    var escapeXml = function(s) {\n      var escaped = '';\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charAt(i);\n        switch(c) {\n        case '<': escaped += '&lt;'; break;\n        case '>': escaped += '&gt;'; break;\n        case '&': escaped += '&amp;'; break;\n        case '\"': escaped += '&quot;'; break;\n        default : escaped += c; break;\n        }\n      }\n      return escaped;\n    };\n\n    var _createHalfASCII = function(margin) {\n      var cellSize = 1;\n      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n\n      var y, x, r1, r2, p;\n\n      var blocks = {\n        '\u2588\u2588': '\u2588',\n        '\u2588 ': '\u2580',\n        ' \u2588': '\u2584',\n        '  ': ' '\n      };\n\n      var blocksLastLineNoMargin = {\n        '\u2588\u2588': '\u2580',\n        '\u2588 ': '\u2580',\n        ' \u2588': ' ',\n        '  ': ' '\n      };\n\n      var ascii = '';\n      for (y = 0; y < size; y += 2) {\n        r1 = Math.floor((y - min) / cellSize);\n        r2 = Math.floor((y + 1 - min) / cellSize);\n        for (x = 0; x < size; x += 1) {\n          p = '\u2588';\n\n          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {\n            p = ' ';\n          }\n\n          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {\n            p += ' ';\n          }\n          else {\n            p += '\u2588';\n          }\n\n          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.\n          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];\n        }\n\n        ascii += '\\n';\n      }\n\n      if (size % 2 && margin > 0) {\n        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('\u2580');\n      }\n\n      return ascii.substring(0, ascii.length-1);\n    };\n\n    _this.createASCII = function(cellSize, margin) {\n      cellSize = cellSize || 1;\n\n      if (cellSize < 2) {\n        return _createHalfASCII(margin);\n      }\n\n      cellSize -= 1;\n      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n\n      var y, x, r, p;\n\n      var white = Array(cellSize+1).join('\u2588\u2588');\n      var black = Array(cellSize+1).join('  ');\n\n      var ascii = '';\n      var line = '';\n      for (y = 0; y < size; y += 1) {\n        r = Math.floor( (y - min) / cellSize);\n        line = '';\n        for (x = 0; x < size; x += 1) {\n          p = 1;\n\n          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {\n            p = 0;\n          }\n\n          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.\n          line += p ? white : black;\n        }\n\n        for (r = 0; r < cellSize; r += 1) {\n          ascii += line + '\\n';\n        }\n      }\n\n      return ascii.substring(0, ascii.length-1);\n    };\n\n    _this.renderTo2dContext = function(context, cellSize) {\n      cellSize = cellSize || 2;\n      var length = _this.getModuleCount();\n      for (var row = 0; row < length; row++) {\n        for (var col = 0; col < length; col++) {\n          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';\n          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);\n        }\n      }\n    }\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrcode.stringToBytes\n  //---------------------------------------------------------------------\n\n  qrcode.stringToBytesFuncs = {\n    'default' : function(s) {\n      var bytes = [];\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charCodeAt(i);\n        bytes.push(c & 0xff);\n      }\n      return bytes;\n    }\n  };\n\n  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];\n\n  //---------------------------------------------------------------------\n  // qrcode.createStringToBytes\n  //---------------------------------------------------------------------\n\n  /**\n   * @param unicodeData base64 string of byte array.\n   * [16bit Unicode],[16bit Bytes], ...\n   * @param numChars\n   */\n  qrcode.createStringToBytes = function(unicodeData, numChars) {\n\n    // create conversion map.\n\n    var unicodeMap = function() {\n\n      var bin = base64DecodeInputStream(unicodeData);\n      var read = function() {\n        var b = bin.read();\n        if (b == -1) throw 'eof';\n        return b;\n      };\n\n      var count = 0;\n      var unicodeMap = {};\n      while (true) {\n        var b0 = bin.read();\n        if (b0 == -1) break;\n        var b1 = read();\n        var b2 = read();\n        var b3 = read();\n        var k = String.fromCharCode( (b0 << 8) | b1);\n        var v = (b2 << 8) | b3;\n        unicodeMap[k] = v;\n        count += 1;\n      }\n      if (count != numChars) {\n        throw count + ' != ' + numChars;\n      }\n\n      return unicodeMap;\n    }();\n\n    var unknownChar = '?'.charCodeAt(0);\n\n    return function(s) {\n      var bytes = [];\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charCodeAt(i);\n        if (c < 128) {\n          bytes.push(c);\n        } else {\n          var b = unicodeMap[s.charAt(i)];\n          if (typeof b == 'number') {\n            if ( (b & 0xff) == b) {\n              // 1byte\n              bytes.push(b);\n            } else {\n              // 2bytes\n              bytes.push(b >>> 8);\n              bytes.push(b & 0xff);\n            }\n          } else {\n            bytes.push(unknownChar);\n          }\n        }\n      }\n      return bytes;\n    };\n  };\n\n  //---------------------------------------------------------------------\n  // QRMode\n  //---------------------------------------------------------------------\n\n  var QRMode = {\n    MODE_NUMBER :    1 << 0,\n    MODE_ALPHA_NUM : 1 << 1,\n    MODE_8BIT_BYTE : 1 << 2,\n    MODE_KANJI :     1 << 3\n  };\n\n  //---------------------------------------------------------------------\n  // QRErrorCorrectionLevel\n  //---------------------------------------------------------------------\n\n  var QRErrorCorrectionLevel = {\n    L : 1,\n    M : 0,\n    Q : 3,\n    H : 2\n  };\n\n  //---------------------------------------------------------------------\n  // QRMaskPattern\n  //---------------------------------------------------------------------\n\n  var QRMaskPattern = {\n    PATTERN000 : 0,\n    PATTERN001 : 1,\n    PATTERN010 : 2,\n    PATTERN011 : 3,\n    PATTERN100 : 4,\n    PATTERN101 : 5,\n    PATTERN110 : 6,\n    PATTERN111 : 7\n  };\n\n  //---------------------------------------------------------------------\n  // QRUtil\n  //---------------------------------------------------------------------\n\n  var QRUtil = function() {\n\n    var PATTERN_POSITION_TABLE = [\n      [],\n      [6, 18],\n      [6, 22],\n      [6, 26],\n      [6, 30],\n      [6, 34],\n      [6, 22, 38],\n      [6, 24, 42],\n      [6, 26, 46],\n      [6, 28, 50],\n      [6, 30, 54],\n      [6, 32, 58],\n      [6, 34, 62],\n      [6, 26, 46, 66],\n      [6, 26, 48, 70],\n      [6, 26, 50, 74],\n      [6, 30, 54, 78],\n      [6, 30, 56, 82],\n      [6, 30, 58, 86],\n      [6, 34, 62, 90],\n      [6, 28, 50, 72, 94],\n      [6, 26, 50, 74, 98],\n      [6, 30, 54, 78, 102],\n      [6, 28, 54, 80, 106],\n      [6, 32, 58, 84, 110],\n      [6, 30, 58, 86, 114],\n      [6, 34, 62, 90, 118],\n      [6, 26, 50, 74, 98, 122],\n      [6, 30, 54, 78, 102, 126],\n      [6, 26, 52, 78, 104, 130],\n      [6, 30, 56, 82, 108, 134],\n      [6, 34, 60, 86, 112, 138],\n      [6, 30, 58, 86, 114, 142],\n      [6, 34, 62, 90, 118, 146],\n      [6, 30, 54, 78, 102, 126, 150],\n      [6, 24, 50, 76, 102, 128, 154],\n      [6, 28, 54, 80, 106, 132, 158],\n      [6, 32, 58, 84, 110, 136, 162],\n      [6, 26, 54, 82, 110, 138, 166],\n      [6, 30, 58, 86, 114, 142, 170]\n    ];\n    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);\n    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);\n    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);\n\n    var _this = {};\n\n    var getBCHDigit = function(data) {\n      var digit = 0;\n      while (data != 0) {\n        digit += 1;\n        data >>>= 1;\n      }\n      return digit;\n    };\n\n    _this.getBCHTypeInfo = function(data) {\n      var d = data << 10;\n      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {\n        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );\n      }\n      return ( (data << 10) | d) ^ G15_MASK;\n    };\n\n    _this.getBCHTypeNumber = function(data) {\n      var d = data << 12;\n      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {\n        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );\n      }\n      return (data << 12) | d;\n    };\n\n    _this.getPatternPosition = function(typeNumber) {\n      return PATTERN_POSITION_TABLE[typeNumber - 1];\n    };\n\n    _this.getMaskFunction = function(maskPattern) {\n\n      switch (maskPattern) {\n\n      case QRMaskPattern.PATTERN000 :\n        return function(i, j) { return (i + j) % 2 == 0; };\n      case QRMaskPattern.PATTERN001 :\n        return function(i, j) { return i % 2 == 0; };\n      case QRMaskPattern.PATTERN010 :\n        return function(i, j) { return j % 3 == 0; };\n      case QRMaskPattern.PATTERN011 :\n        return function(i, j) { return (i + j) % 3 == 0; };\n      case QRMaskPattern.PATTERN100 :\n        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };\n      case QRMaskPattern.PATTERN101 :\n        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };\n      case QRMaskPattern.PATTERN110 :\n        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };\n      case QRMaskPattern.PATTERN111 :\n        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };\n\n      default :\n        throw 'bad maskPattern:' + maskPattern;\n      }\n    };\n\n    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {\n      var a = qrPolynomial([1], 0);\n      for (var i = 0; i < errorCorrectLength; i += 1) {\n        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );\n      }\n      return a;\n    };\n\n    _this.getLengthInBits = function(mode, type) {\n\n      if (1 <= type && type < 10) {\n\n        // 1 - 9\n\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 10;\n        case QRMode.MODE_ALPHA_NUM : return 9;\n        case QRMode.MODE_8BIT_BYTE : return 8;\n        case QRMode.MODE_KANJI     : return 8;\n        default :\n          throw 'mode:' + mode;\n        }\n\n      } else if (type < 27) {\n\n        // 10 - 26\n\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 12;\n        case QRMode.MODE_ALPHA_NUM : return 11;\n        case QRMode.MODE_8BIT_BYTE : return 16;\n        case QRMode.MODE_KANJI     : return 10;\n        default :\n          throw 'mode:' + mode;\n        }\n\n      } else if (type < 41) {\n\n        // 27 - 40\n\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 14;\n        case QRMode.MODE_ALPHA_NUM : return 13;\n        case QRMode.MODE_8BIT_BYTE : return 16;\n        case QRMode.MODE_KANJI     : return 12;\n        default :\n          throw 'mode:' + mode;\n        }\n\n      } else {\n        throw 'type:' + type;\n      }\n    };\n\n    _this.getLostPoint = function(qrcode) {\n\n      var moduleCount = qrcode.getModuleCount();\n\n      var lostPoint = 0;\n\n      // LEVEL1\n\n      for (var row = 0; row < moduleCount; row += 1) {\n        for (var col = 0; col < moduleCount; col += 1) {\n\n          var sameCount = 0;\n          var dark = qrcode.isDark(row, col);\n\n          for (var r = -1; r <= 1; r += 1) {\n\n            if (row + r < 0 || moduleCount <= row + r) {\n              continue;\n            }\n\n            for (var c = -1; c <= 1; c += 1) {\n\n              if (col + c < 0 || moduleCount <= col + c) {\n                continue;\n              }\n\n              if (r == 0 && c == 0) {\n                continue;\n              }\n\n              if (dark == qrcode.isDark(row + r, col + c) ) {\n                sameCount += 1;\n              }\n            }\n          }\n\n          if (sameCount > 5) {\n            lostPoint += (3 + sameCount - 5);\n          }\n        }\n      };\n\n      // LEVEL2\n\n      for (var row = 0; row < moduleCount - 1; row += 1) {\n        for (var col = 0; col < moduleCount - 1; col += 1) {\n          var count = 0;\n          if (qrcode.isDark(row, col) ) count += 1;\n          if (qrcode.isDark(row + 1, col) ) count += 1;\n          if (qrcode.isDark(row, col + 1) ) count += 1;\n          if (qrcode.isDark(row + 1, col + 1) ) count += 1;\n          if (count == 0 || count == 4) {\n            lostPoint += 3;\n          }\n        }\n      }\n\n      // LEVEL3\n\n      for (var row = 0; row < moduleCount; row += 1) {\n        for (var col = 0; col < moduleCount - 6; col += 1) {\n          if (qrcode.isDark(row, col)\n              && !qrcode.isDark(row, col + 1)\n              &&  qrcode.isDark(row, col + 2)\n              &&  qrcode.isDark(row, col + 3)\n              &&  qrcode.isDark(row, col + 4)\n              && !qrcode.isDark(row, col + 5)\n              &&  qrcode.isDark(row, col + 6) ) {\n            lostPoint += 40;\n          }\n        }\n      }\n\n      for (var col = 0; col < moduleCount; col += 1) {\n        for (var row = 0; row < moduleCount - 6; row += 1) {\n          if (qrcode.isDark(row, col)\n              && !qrcode.isDark(row + 1, col)\n              &&  qrcode.isDark(row + 2, col)\n              &&  qrcode.isDark(row + 3, col)\n              &&  qrcode.isDark(row + 4, col)\n              && !qrcode.isDark(row + 5, col)\n              &&  qrcode.isDark(row + 6, col) ) {\n            lostPoint += 40;\n          }\n        }\n      }\n\n      // LEVEL4\n\n      var darkCount = 0;\n\n      for (var col = 0; col < moduleCount; col += 1) {\n        for (var row = 0; row < moduleCount; row += 1) {\n          if (qrcode.isDark(row, col) ) {\n            darkCount += 1;\n          }\n        }\n      }\n\n      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;\n      lostPoint += ratio * 10;\n\n      return lostPoint;\n    };\n\n    return _this;\n  }();\n\n  //---------------------------------------------------------------------\n  // QRMath\n  //---------------------------------------------------------------------\n\n  var QRMath = function() {\n\n    var EXP_TABLE = new Array(256);\n    var LOG_TABLE = new Array(256);\n\n    // initialize tables\n    for (var i = 0; i < 8; i += 1) {\n      EXP_TABLE[i] = 1 << i;\n    }\n    for (var i = 8; i < 256; i += 1) {\n      EXP_TABLE[i] = EXP_TABLE[i - 4]\n        ^ EXP_TABLE[i - 5]\n        ^ EXP_TABLE[i - 6]\n        ^ EXP_TABLE[i - 8];\n    }\n    for (var i = 0; i < 255; i += 1) {\n      LOG_TABLE[EXP_TABLE[i] ] = i;\n    }\n\n    var _this = {};\n\n    _this.glog = function(n) {\n\n      if (n < 1) {\n        throw 'glog(' + n + ')';\n      }\n\n      return LOG_TABLE[n];\n    };\n\n    _this.gexp = function(n) {\n\n      while (n < 0) {\n        n += 255;\n      }\n\n      while (n >= 256) {\n        n -= 255;\n      }\n\n      return EXP_TABLE[n];\n    };\n\n    return _this;\n  }();\n\n  //---------------------------------------------------------------------\n  // qrPolynomial\n  //---------------------------------------------------------------------\n\n  function qrPolynomial(num, shift) {\n\n    if (typeof num.length == 'undefined') {\n      throw num.length + '/' + shift;\n    }\n\n    var _num = function() {\n      var offset = 0;\n      while (offset < num.length && num[offset] == 0) {\n        offset += 1;\n      }\n      var _num = new Array(num.length - offset + shift);\n      for (var i = 0; i < num.length - offset; i += 1) {\n        _num[i] = num[i + offset];\n      }\n      return _num;\n    }();\n\n    var _this = {};\n\n    _this.getAt = function(index) {\n      return _num[index];\n    };\n\n    _this.getLength = function() {\n      return _num.length;\n    };\n\n    _this.multiply = function(e) {\n\n      var num = new Array(_this.getLength() + e.getLength() - 1);\n\n      for (var i = 0; i < _this.getLength(); i += 1) {\n        for (var j = 0; j < e.getLength(); j += 1) {\n          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );\n        }\n      }\n\n      return qrPolynomial(num, 0);\n    };\n\n    _this.mod = function(e) {\n\n      if (_this.getLength() - e.getLength() < 0) {\n        return _this;\n      }\n\n      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );\n\n      var num = new Array(_this.getLength() );\n      for (var i = 0; i < _this.getLength(); i += 1) {\n        num[i] = _this.getAt(i);\n      }\n\n      for (var i = 0; i < e.getLength(); i += 1) {\n        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);\n      }\n\n      // recursive call\n      return qrPolynomial(num, 0).mod(e);\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // QRRSBlock\n  //---------------------------------------------------------------------\n\n  var QRRSBlock = function() {\n\n    var RS_BLOCK_TABLE = [\n\n      // L\n      // M\n      // Q\n      // H\n\n      // 1\n      [1, 26, 19],\n      [1, 26, 16],\n      [1, 26, 13],\n      [1, 26, 9],\n\n      // 2\n      [1, 44, 34],\n      [1, 44, 28],\n      [1, 44, 22],\n      [1, 44, 16],\n\n      // 3\n      [1, 70, 55],\n      [1, 70, 44],\n      [2, 35, 17],\n      [2, 35, 13],\n\n      // 4\n      [1, 100, 80],\n      [2, 50, 32],\n      [2, 50, 24],\n      [4, 25, 9],\n\n      // 5\n      [1, 134, 108],\n      [2, 67, 43],\n      [2, 33, 15, 2, 34, 16],\n      [2, 33, 11, 2, 34, 12],\n\n      // 6\n      [2, 86, 68],\n      [4, 43, 27],\n      [4, 43, 19],\n      [4, 43, 15],\n\n      // 7\n      [2, 98, 78],\n      [4, 49, 31],\n      [2, 32, 14, 4, 33, 15],\n      [4, 39, 13, 1, 40, 14],\n\n      // 8\n      [2, 121, 97],\n      [2, 60, 38, 2, 61, 39],\n      [4, 40, 18, 2, 41, 19],\n      [4, 40, 14, 2, 41, 15],\n\n      // 9\n      [2, 146, 116],\n      [3, 58, 36, 2, 59, 37],\n      [4, 36, 16, 4, 37, 17],\n      [4, 36, 12, 4, 37, 13],\n\n      // 10\n      [2, 86, 68, 2, 87, 69],\n      [4, 69, 43, 1, 70, 44],\n      [6, 43, 19, 2, 44, 20],\n      [6, 43, 15, 2, 44, 16],\n\n      // 11\n      [4, 101, 81],\n      [1, 80, 50, 4, 81, 51],\n      [4, 50, 22, 4, 51, 23],\n      [3, 36, 12, 8, 37, 13],\n\n      // 12\n      [2, 116, 92, 2, 117, 93],\n      [6, 58, 36, 2, 59, 37],\n      [4, 46, 20, 6, 47, 21],\n      [7, 42, 14, 4, 43, 15],\n\n      // 13\n      [4, 133, 107],\n      [8, 59, 37, 1, 60, 38],\n      [8, 44, 20, 4, 45, 21],\n      [12, 33, 11, 4, 34, 12],\n\n      // 14\n      [3, 145, 115, 1, 146, 116],\n      [4, 64, 40, 5, 65, 41],\n      [11, 36, 16, 5, 37, 17],\n      [11, 36, 12, 5, 37, 13],\n\n      // 15\n      [5, 109, 87, 1, 110, 88],\n      [5, 65, 41, 5, 66, 42],\n      [5, 54, 24, 7, 55, 25],\n      [11, 36, 12, 7, 37, 13],\n\n      // 16\n      [5, 122, 98, 1, 123, 99],\n      [7, 73, 45, 3, 74, 46],\n      [15, 43, 19, 2, 44, 20],\n      [3, 45, 15, 13, 46, 16],\n\n      // 17\n      [1, 135, 107, 5, 136, 108],\n      [10, 74, 46, 1, 75, 47],\n      [1, 50, 22, 15, 51, 23],\n      [2, 42, 14, 17, 43, 15],\n\n      // 18\n      [5, 150, 120, 1, 151, 121],\n      [9, 69, 43, 4, 70, 44],\n      [17, 50, 22, 1, 51, 23],\n      [2, 42, 14, 19, 43, 15],\n\n      // 19\n      [3, 141, 113, 4, 142, 114],\n      [3, 70, 44, 11, 71, 45],\n      [17, 47, 21, 4, 48, 22],\n      [9, 39, 13, 16, 40, 14],\n\n      // 20\n      [3, 135, 107, 5, 136, 108],\n      [3, 67, 41, 13, 68, 42],\n      [15, 54, 24, 5, 55, 25],\n      [15, 43, 15, 10, 44, 16],\n\n      // 21\n      [4, 144, 116, 4, 145, 117],\n      [17, 68, 42],\n      [17, 50, 22, 6, 51, 23],\n      [19, 46, 16, 6, 47, 17],\n\n      // 22\n      [2, 139, 111, 7, 140, 112],\n      [17, 74, 46],\n      [7, 54, 24, 16, 55, 25],\n      [34, 37, 13],\n\n      // 23\n      [4, 151, 121, 5, 152, 122],\n      [4, 75, 47, 14, 76, 48],\n      [11, 54, 24, 14, 55, 25],\n      [16, 45, 15, 14, 46, 16],\n\n      // 24\n      [6, 147, 117, 4, 148, 118],\n      [6, 73, 45, 14, 74, 46],\n      [11, 54, 24, 16, 55, 25],\n      [30, 46, 16, 2, 47, 17],\n\n      // 25\n      [8, 132, 106, 4, 133, 107],\n      [8, 75, 47, 13, 76, 48],\n      [7, 54, 24, 22, 55, 25],\n      [22, 45, 15, 13, 46, 16],\n\n      // 26\n      [10, 142, 114, 2, 143, 115],\n      [19, 74, 46, 4, 75, 47],\n      [28, 50, 22, 6, 51, 23],\n      [33, 46, 16, 4, 47, 17],\n\n      // 27\n      [8, 152, 122, 4, 153, 123],\n      [22, 73, 45, 3, 74, 46],\n      [8, 53, 23, 26, 54, 24],\n      [12, 45, 15, 28, 46, 16],\n\n      // 28\n      [3, 147, 117, 10, 148, 118],\n      [3, 73, 45, 23, 74, 46],\n      [4, 54, 24, 31, 55, 25],\n      [11, 45, 15, 31, 46, 16],\n\n      // 29\n      [7, 146, 116, 7, 147, 117],\n      [21, 73, 45, 7, 74, 46],\n      [1, 53, 23, 37, 54, 24],\n      [19, 45, 15, 26, 46, 16],\n\n      // 30\n      [5, 145, 115, 10, 146, 116],\n      [19, 75, 47, 10, 76, 48],\n      [15, 54, 24, 25, 55, 25],\n      [23, 45, 15, 25, 46, 16],\n\n      // 31\n      [13, 145, 115, 3, 146, 116],\n      [2, 74, 46, 29, 75, 47],\n      [42, 54, 24, 1, 55, 25],\n      [23, 45, 15, 28, 46, 16],\n\n      // 32\n      [17, 145, 115],\n      [10, 74, 46, 23, 75, 47],\n      [10, 54, 24, 35, 55, 25],\n      [19, 45, 15, 35, 46, 16],\n\n      // 33\n      [17, 145, 115, 1, 146, 116],\n      [14, 74, 46, 21, 75, 47],\n      [29, 54, 24, 19, 55, 25],\n      [11, 45, 15, 46, 46, 16],\n\n      // 34\n      [13, 145, 115, 6, 146, 116],\n      [14, 74, 46, 23, 75, 47],\n      [44, 54, 24, 7, 55, 25],\n      [59, 46, 16, 1, 47, 17],\n\n      // 35\n      [12, 151, 121, 7, 152, 122],\n      [12, 75, 47, 26, 76, 48],\n      [39, 54, 24, 14, 55, 25],\n      [22, 45, 15, 41, 46, 16],\n\n      // 36\n      [6, 151, 121, 14, 152, 122],\n      [6, 75, 47, 34, 76, 48],\n      [46, 54, 24, 10, 55, 25],\n      [2, 45, 15, 64, 46, 16],\n\n      // 37\n      [17, 152, 122, 4, 153, 123],\n      [29, 74, 46, 14, 75, 47],\n      [49, 54, 24, 10, 55, 25],\n      [24, 45, 15, 46, 46, 16],\n\n      // 38\n      [4, 152, 122, 18, 153, 123],\n      [13, 74, 46, 32, 75, 47],\n      [48, 54, 24, 14, 55, 25],\n      [42, 45, 15, 32, 46, 16],\n\n      // 39\n      [20, 147, 117, 4, 148, 118],\n      [40, 75, 47, 7, 76, 48],\n      [43, 54, 24, 22, 55, 25],\n      [10, 45, 15, 67, 46, 16],\n\n      // 40\n      [19, 148, 118, 6, 149, 119],\n      [18, 75, 47, 31, 76, 48],\n      [34, 54, 24, 34, 55, 25],\n      [20, 45, 15, 61, 46, 16]\n    ];\n\n    var qrRSBlock = function(totalCount, dataCount) {\n      var _this = {};\n      _this.totalCount = totalCount;\n      _this.dataCount = dataCount;\n      return _this;\n    };\n\n    var _this = {};\n\n    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {\n\n      switch(errorCorrectionLevel) {\n      case QRErrorCorrectionLevel.L :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];\n      case QRErrorCorrectionLevel.M :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];\n      case QRErrorCorrectionLevel.Q :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];\n      case QRErrorCorrectionLevel.H :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];\n      default :\n        return undefined;\n      }\n    };\n\n    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {\n\n      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);\n\n      if (typeof rsBlock == 'undefined') {\n        throw 'bad rs block @ typeNumber:' + typeNumber +\n            '/errorCorrectionLevel:' + errorCorrectionLevel;\n      }\n\n      var length = rsBlock.length / 3;\n\n      var list = [];\n\n      for (var i = 0; i < length; i += 1) {\n\n        var count = rsBlock[i * 3 + 0];\n        var totalCount = rsBlock[i * 3 + 1];\n        var dataCount = rsBlock[i * 3 + 2];\n\n        for (var j = 0; j < count; j += 1) {\n          list.push(qrRSBlock(totalCount, dataCount) );\n        }\n      }\n\n      return list;\n    };\n\n    return _this;\n  }();\n\n  //---------------------------------------------------------------------\n  // qrBitBuffer\n  //---------------------------------------------------------------------\n\n  var qrBitBuffer = function() {\n\n    var _buffer = [];\n    var _length = 0;\n\n    var _this = {};\n\n    _this.getBuffer = function() {\n      return _buffer;\n    };\n\n    _this.getAt = function(index) {\n      var bufIndex = Math.floor(index / 8);\n      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;\n    };\n\n    _this.put = function(num, length) {\n      for (var i = 0; i < length; i += 1) {\n        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);\n      }\n    };\n\n    _this.getLengthInBits = function() {\n      return _length;\n    };\n\n    _this.putBit = function(bit) {\n\n      var bufIndex = Math.floor(_length / 8);\n      if (_buffer.length <= bufIndex) {\n        _buffer.push(0);\n      }\n\n      if (bit) {\n        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );\n      }\n\n      _length += 1;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrNumber\n  //---------------------------------------------------------------------\n\n  var qrNumber = function(data) {\n\n    var _mode = QRMode.MODE_NUMBER;\n    var _data = data;\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return _data.length;\n    };\n\n    _this.write = function(buffer) {\n\n      var data = _data;\n\n      var i = 0;\n\n      while (i + 2 < data.length) {\n        buffer.put(strToNum(data.substring(i, i + 3) ), 10);\n        i += 3;\n      }\n\n      if (i < data.length) {\n        if (data.length - i == 1) {\n          buffer.put(strToNum(data.substring(i, i + 1) ), 4);\n        } else if (data.length - i == 2) {\n          buffer.put(strToNum(data.substring(i, i + 2) ), 7);\n        }\n      }\n    };\n\n    var strToNum = function(s) {\n      var num = 0;\n      for (var i = 0; i < s.length; i += 1) {\n        num = num * 10 + chatToNum(s.charAt(i) );\n      }\n      return num;\n    };\n\n    var chatToNum = function(c) {\n      if ('0' <= c && c <= '9') {\n        return c.charCodeAt(0) - '0'.charCodeAt(0);\n      }\n      throw 'illegal char :' + c;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrAlphaNum\n  //---------------------------------------------------------------------\n\n  var qrAlphaNum = function(data) {\n\n    var _mode = QRMode.MODE_ALPHA_NUM;\n    var _data = data;\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return _data.length;\n    };\n\n    _this.write = function(buffer) {\n\n      var s = _data;\n\n      var i = 0;\n\n      while (i + 1 < s.length) {\n        buffer.put(\n          getCode(s.charAt(i) ) * 45 +\n          getCode(s.charAt(i + 1) ), 11);\n        i += 2;\n      }\n\n      if (i < s.length) {\n        buffer.put(getCode(s.charAt(i) ), 6);\n      }\n    };\n\n    var getCode = function(c) {\n\n      if ('0' <= c && c <= '9') {\n        return c.charCodeAt(0) - '0'.charCodeAt(0);\n      } else if ('A' <= c && c <= 'Z') {\n        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;\n      } else {\n        switch (c) {\n        case ' ' : return 36;\n        case '$' : return 37;\n        case '%' : return 38;\n        case '*' : return 39;\n        case '+' : return 40;\n        case '-' : return 41;\n        case '.' : return 42;\n        case '/' : return 43;\n        case ':' : return 44;\n        default :\n          throw 'illegal char :' + c;\n        }\n      }\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qr8BitByte\n  //---------------------------------------------------------------------\n\n  var qr8BitByte = function(data) {\n\n    var _mode = QRMode.MODE_8BIT_BYTE;\n    var _data = data;\n    var _bytes = qrcode.stringToBytes(data);\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return _bytes.length;\n    };\n\n    _this.write = function(buffer) {\n      for (var i = 0; i < _bytes.length; i += 1) {\n        buffer.put(_bytes[i], 8);\n      }\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrKanji\n  //---------------------------------------------------------------------\n\n  var qrKanji = function(data) {\n\n    var _mode = QRMode.MODE_KANJI;\n    var _data = data;\n\n    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];\n    if (!stringToBytes) {\n      throw 'sjis not supported.';\n    }\n    !function(c, code) {\n      // self test for sjis support.\n      var test = stringToBytes(c);\n      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {\n        throw 'sjis not supported.';\n      }\n    }('\\u53cb', 0x9746);\n\n    var _bytes = stringToBytes(data);\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return ~~(_bytes.length / 2);\n    };\n\n    _this.write = function(buffer) {\n\n      var data = _bytes;\n\n      var i = 0;\n\n      while (i + 1 < data.length) {\n\n        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);\n\n        if (0x8140 <= c && c <= 0x9FFC) {\n          c -= 0x8140;\n        } else if (0xE040 <= c && c <= 0xEBBF) {\n          c -= 0xC140;\n        } else {\n          throw 'illegal char at ' + (i + 1) + '/' + c;\n        }\n\n        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);\n\n        buffer.put(c, 13);\n\n        i += 2;\n      }\n\n      if (i < data.length) {\n        throw 'illegal char at ' + (i + 1);\n      }\n    };\n\n    return _this;\n  };\n\n  //=====================================================================\n  // GIF Support etc.\n  //\n\n  //---------------------------------------------------------------------\n  // byteArrayOutputStream\n  //---------------------------------------------------------------------\n\n  var byteArrayOutputStream = function() {\n\n    var _bytes = [];\n\n    var _this = {};\n\n    _this.writeByte = function(b) {\n      _bytes.push(b & 0xff);\n    };\n\n    _this.writeShort = function(i) {\n      _this.writeByte(i);\n      _this.writeByte(i >>> 8);\n    };\n\n    _this.writeBytes = function(b, off, len) {\n      off = off || 0;\n      len = len || b.length;\n      for (var i = 0; i < len; i += 1) {\n        _this.writeByte(b[i + off]);\n      }\n    };\n\n    _this.writeString = function(s) {\n      for (var i = 0; i < s.length; i += 1) {\n        _this.writeByte(s.charCodeAt(i) );\n      }\n    };\n\n    _this.toByteArray = function() {\n      return _bytes;\n    };\n\n    _this.toString = function() {\n      var s = '';\n      s += '[';\n      for (var i = 0; i < _bytes.length; i += 1) {\n        if (i > 0) {\n          s += ',';\n        }\n        s += _bytes[i];\n      }\n      s += ']';\n      return s;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // base64EncodeOutputStream\n  //---------------------------------------------------------------------\n\n  var base64EncodeOutputStream = function() {\n\n    var _buffer = 0;\n    var _buflen = 0;\n    var _length = 0;\n    var _base64 = '';\n\n    var _this = {};\n\n    var writeEncoded = function(b) {\n      _base64 += String.fromCharCode(encode(b & 0x3f) );\n    };\n\n    var encode = function(n) {\n      if (n < 0) {\n        // error.\n      } else if (n < 26) {\n        return 0x41 + n;\n      } else if (n < 52) {\n        return 0x61 + (n - 26);\n      } else if (n < 62) {\n        return 0x30 + (n - 52);\n      } else if (n == 62) {\n        return 0x2b;\n      } else if (n == 63) {\n        return 0x2f;\n      }\n      throw 'n:' + n;\n    };\n\n    _this.writeByte = function(n) {\n\n      _buffer = (_buffer << 8) | (n & 0xff);\n      _buflen += 8;\n      _length += 1;\n\n      while (_buflen >= 6) {\n        writeEncoded(_buffer >>> (_buflen - 6) );\n        _buflen -= 6;\n      }\n    };\n\n    _this.flush = function() {\n\n      if (_buflen > 0) {\n        writeEncoded(_buffer << (6 - _buflen) );\n        _buffer = 0;\n        _buflen = 0;\n      }\n\n      if (_length % 3 != 0) {\n        // padding\n        var padlen = 3 - _length % 3;\n        for (var i = 0; i < padlen; i += 1) {\n          _base64 += '=';\n        }\n      }\n    };\n\n    _this.toString = function() {\n      return _base64;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // base64DecodeInputStream\n  //---------------------------------------------------------------------\n\n  var base64DecodeInputStream = function(str) {\n\n    var _str = str;\n    var _pos = 0;\n    var _buffer = 0;\n    var _buflen = 0;\n\n    var _this = {};\n\n    _this.read = function() {\n\n      while (_buflen < 8) {\n\n        if (_pos >= _str.length) {\n          if (_buflen == 0) {\n            return -1;\n          }\n          throw 'unexpected end of file./' + _buflen;\n        }\n\n        var c = _str.charAt(_pos);\n        _pos += 1;\n\n        if (c == '=') {\n          _buflen = 0;\n          return -1;\n        } else if (c.match(/^\\s$/) ) {\n          // ignore if whitespace.\n          continue;\n        }\n\n        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );\n        _buflen += 6;\n      }\n\n      var n = (_buffer >>> (_buflen - 8) ) & 0xff;\n      _buflen -= 8;\n      return n;\n    };\n\n    var decode = function(c) {\n      if (0x41 <= c && c <= 0x5a) {\n        return c - 0x41;\n      } else if (0x61 <= c && c <= 0x7a) {\n        return c - 0x61 + 26;\n      } else if (0x30 <= c && c <= 0x39) {\n        return c - 0x30 + 52;\n      } else if (c == 0x2b) {\n        return 62;\n      } else if (c == 0x2f) {\n        return 63;\n      } else {\n        throw 'c:' + c;\n      }\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // gifImage (B/W)\n  //---------------------------------------------------------------------\n\n  var gifImage = function(width, height) {\n\n    var _width = width;\n    var _height = height;\n    var _data = new Array(width * height);\n\n    var _this = {};\n\n    _this.setPixel = function(x, y, pixel) {\n      _data[y * _width + x] = pixel;\n    };\n\n    _this.write = function(out) {\n\n      //---------------------------------\n      // GIF Signature\n\n      out.writeString('GIF87a');\n\n      //---------------------------------\n      // Screen Descriptor\n\n      out.writeShort(_width);\n      out.writeShort(_height);\n\n      out.writeByte(0x80); // 2bit\n      out.writeByte(0);\n      out.writeByte(0);\n\n      //---------------------------------\n      // Global Color Map\n\n      // black\n      out.writeByte(0x00);\n      out.writeByte(0x00);\n      out.writeByte(0x00);\n\n      // white\n      out.writeByte(0xff);\n      out.writeByte(0xff);\n      out.writeByte(0xff);\n\n      //---------------------------------\n      // Image Descriptor\n\n      out.writeString(',');\n      out.writeShort(0);\n      out.writeShort(0);\n      out.writeShort(_width);\n      out.writeShort(_height);\n      out.writeByte(0);\n\n      //---------------------------------\n      // Local Color Map\n\n      //---------------------------------\n      // Raster Data\n\n      var lzwMinCodeSize = 2;\n      var raster = getLZWRaster(lzwMinCodeSize);\n\n      out.writeByte(lzwMinCodeSize);\n\n      var offset = 0;\n\n      while (raster.length - offset > 255) {\n        out.writeByte(255);\n        out.writeBytes(raster, offset, 255);\n        offset += 255;\n      }\n\n      out.writeByte(raster.length - offset);\n      out.writeBytes(raster, offset, raster.length - offset);\n      out.writeByte(0x00);\n\n      //---------------------------------\n      // GIF Terminator\n      out.writeString(';');\n    };\n\n    var bitOutputStream = function(out) {\n\n      var _out = out;\n      var _bitLength = 0;\n      var _bitBuffer = 0;\n\n      var _this = {};\n\n      _this.write = function(data, length) {\n\n        if ( (data >>> length) != 0) {\n          throw 'length over';\n        }\n\n        while (_bitLength + length >= 8) {\n          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );\n          length -= (8 - _bitLength);\n          data >>>= (8 - _bitLength);\n          _bitBuffer = 0;\n          _bitLength = 0;\n        }\n\n        _bitBuffer = (data << _bitLength) | _bitBuffer;\n        _bitLength = _bitLength + length;\n      };\n\n      _this.flush = function() {\n        if (_bitLength > 0) {\n          _out.writeByte(_bitBuffer);\n        }\n      };\n\n      return _this;\n    };\n\n    var getLZWRaster = function(lzwMinCodeSize) {\n\n      var clearCode = 1 << lzwMinCodeSize;\n      var endCode = (1 << lzwMinCodeSize) + 1;\n      var bitLength = lzwMinCodeSize + 1;\n\n      // Setup LZWTable\n      var table = lzwTable();\n\n      for (var i = 0; i < clearCode; i += 1) {\n        table.add(String.fromCharCode(i) );\n      }\n      table.add(String.fromCharCode(clearCode) );\n      table.add(String.fromCharCode(endCode) );\n\n      var byteOut = byteArrayOutputStream();\n      var bitOut = bitOutputStream(byteOut);\n\n      // clear code\n      bitOut.write(clearCode, bitLength);\n\n      var dataIndex = 0;\n\n      var s = String.fromCharCode(_data[dataIndex]);\n      dataIndex += 1;\n\n      while (dataIndex < _data.length) {\n\n        var c = String.fromCharCode(_data[dataIndex]);\n        dataIndex += 1;\n\n        if (table.contains(s + c) ) {\n\n          s = s + c;\n\n        } else {\n\n          bitOut.write(table.indexOf(s), bitLength);\n\n          if (table.size() < 0xfff) {\n\n            if (table.size() == (1 << bitLength) ) {\n              bitLength += 1;\n            }\n\n            table.add(s + c);\n          }\n\n          s = c;\n        }\n      }\n\n      bitOut.write(table.indexOf(s), bitLength);\n\n      // end code\n      bitOut.write(endCode, bitLength);\n\n      bitOut.flush();\n\n      return byteOut.toByteArray();\n    };\n\n    var lzwTable = function() {\n\n      var _map = {};\n      var _size = 0;\n\n      var _this = {};\n\n      _this.add = function(key) {\n        if (_this.contains(key) ) {\n          throw 'dup key:' + key;\n        }\n        _map[key] = _size;\n        _size += 1;\n      };\n\n      _this.size = function() {\n        return _size;\n      };\n\n      _this.indexOf = function(key) {\n        return _map[key];\n      };\n\n      _this.contains = function(key) {\n        return typeof _map[key] != 'undefined';\n      };\n\n      return _this;\n    };\n\n    return _this;\n  };\n\n  var createDataURL = function(width, height, getPixel) {\n    var gif = gifImage(width, height);\n    for (var y = 0; y < height; y += 1) {\n      for (var x = 0; x < width; x += 1) {\n        gif.setPixel(x, y, getPixel(x, y) );\n      }\n    }\n\n    var b = byteArrayOutputStream();\n    gif.write(b);\n\n    var base64 = base64EncodeOutputStream();\n    var bytes = b.toByteArray();\n    for (var i = 0; i < bytes.length; i += 1) {\n      base64.writeByte(bytes[i]);\n    }\n    base64.flush();\n\n    return 'data:image/gif;base64,' + base64;\n  };\n\n  //---------------------------------------------------------------------\n  // returns qrcode function.\n\n  return qrcode;\n}();\n\n// multibyte support\n!function() {\n\n  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {\n    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array\n    function toUTF8Array(str) {\n      var utf8 = [];\n      for (var i=0; i < str.length; i++) {\n        var charcode = str.charCodeAt(i);\n        if (charcode < 0x80) utf8.push(charcode);\n        else if (charcode < 0x800) {\n          utf8.push(0xc0 | (charcode >> 6),\n              0x80 | (charcode & 0x3f));\n        }\n        else if (charcode < 0xd800 || charcode >= 0xe000) {\n          utf8.push(0xe0 | (charcode >> 12),\n              0x80 | ((charcode>>6) & 0x3f),\n              0x80 | (charcode & 0x3f));\n        }\n        // surrogate pair\n        else {\n          i++;\n          // UTF-16 encodes 0x10000-0x10FFFF by\n          // subtracting 0x10000 and splitting the\n          // 20 bits of 0x0-0xFFFFF into two halves\n          charcode = 0x10000 + (((charcode & 0x3ff)<<10)\n            | (str.charCodeAt(i) & 0x3ff));\n          utf8.push(0xf0 | (charcode >>18),\n              0x80 | ((charcode>>12) & 0x3f),\n              0x80 | ((charcode>>6) & 0x3f),\n              0x80 | (charcode & 0x3f));\n        }\n      }\n      return utf8;\n    }\n    return toUTF8Array(s);\n  };\n\n}();\n\n(function (factory) {\n  if (typeof define === 'function' && define.amd) {\n      define([], factory);\n  } else if (typeof exports === 'object') {\n      module.exports = factory();\n  }\n}(function () {\n    return qrcode;\n}));\n//---------------------------------------------------------------------\n//\n// QR Code Generator for JavaScript UTF8 Support (optional)\n//\n// Copyright (c) 2011 Kazuhiko Arase\n//\n// URL: http://www.d-project.com/\n//\n// Licensed under the MIT license:\n//  http://www.opensource.org/licenses/mit-license.php\n//\n// The word 'QR Code' is registered trademark of\n// DENSO WAVE INCORPORATED\n//  http://www.denso-wave.com/qrcode/faqpatent-e.html\n//\n//---------------------------------------------------------------------\n\n!function(qrcode) {\n\n  //---------------------------------------------------------------------\n  // overwrite qrcode.stringToBytes\n  //---------------------------------------------------------------------\n\n  qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];\n\n}(qrcode);\n\n\n// ---------------------------------------------------------------------------\n// Draws QR modules for 'text' onto a <canvas>, entirely client-side.\n// ---------------------------------------------------------------------------\nfunction qrDrawToCanvas(canvas, text) {\n  var qr = qrcode(0, 'M');\n  qr.addData(text);\n  qr.make();\n  var count = qr.getModuleCount();\n  var quiet = 4;\n  var cell = Math.max(4, Math.floor(280 / (count + quiet * 2)));\n  var size = cell * (count + quiet * 2);\n  canvas.width = size;\n  canvas.height = size;\n  var ctx = canvas.getContext('2d');\n  ctx.imageSmoothingEnabled = false;\n  ctx.fillStyle = '#ffffff';\n  ctx.fillRect(0, 0, size, size);\n  ctx.fillStyle = '#000000';\n  for (var row = 0; row < count; row++) {\n    for (var col = 0; col < count; col++) {\n      if (qr.isDark(row, col)) {\n        ctx.fillRect((col + quiet) * cell, (row + quiet) * cell, cell, cell);\n      }\n    }\n  }\n}\n";

const QR_MODAL_CSS = "\n    .qr-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 1000; align-items: center; justify-content: center; padding: 16px; }\n    .qr-modal-overlay.active { display: flex; }\n    .qr-modal { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; width: 100%; max-width: 380px; max-height: 92vh; overflow-y: auto; padding: 18px; box-sizing: border-box; }\n    .qr-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }\n    .qr-modal-header h3 { margin: 0; font-size: 16px; color: var(--color-text); }\n    .qr-modal button { -webkit-appearance: none; appearance: none; }\n    .qr-modal-close { width: auto; flex-shrink: 0; background: none; border: none; cursor: pointer; color: var(--color-text-muted); padding: 4px; display: flex; }\n    .qr-modal-close:hover { color: var(--color-text); }\n    .qr-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--color-border); margin-bottom: 14px; }\n    .qr-tab { flex: 1; background: none; border: none; border-radius: 6px 6px 0 0; border-bottom: 2px solid transparent; padding: 8px 4px; font-size: 13px; font-weight: 500; color: var(--color-text-muted); cursor: pointer; }\n    .qr-tab:hover { color: var(--color-text); }\n    .qr-tab.active { color: var(--color-text); background: var(--color-border); border-bottom-color: var(--color-accent); font-weight: 700; }\n    .qr-panel { display: none; }\n    .qr-panel.active { display: block; }\n    .qr-hint { font-size: 12px; color: var(--color-text-muted); line-height: 1.5; margin: 0 0 12px; }\n    .qr-modal .form-group { margin-bottom: 10px; }\n    .qr-modal .form-group label { display: block; font-size: 12px; font-weight: 500; color: var(--color-text-muted); margin-bottom: 4px; }\n    .qr-modal .form-group input, .qr-modal .form-group textarea {\n      width: 100%; box-sizing: border-box; padding: 8px 10px; font-size: 14px;\n      border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-text); font-family: inherit;\n    }\n    .qr-modal .form-group textarea { resize: vertical; }\n    .qr-modal .form-group input:focus, .qr-modal .form-group textarea:focus { outline: none; border-color: var(--color-accent); }\n    .qr-generate-btn { width: 100%; padding: 10px; font-size: 14px; font-weight: 600; color: #fff; background: var(--color-accent); border: none; border-radius: 6px; cursor: pointer; margin-top: 4px; }\n    .qr-generate-btn:hover { background: var(--color-accent-hover); }\n    .qr-generate-btn:disabled { opacity: 0.6; cursor: default; }\n    .qr-error { font-size: 12px; color: #dc2626; margin-top: 8px; }\n    @media (prefers-color-scheme: dark) { .qr-error { color: #f87171; } }\n    .qr-existing-url { font-size: 13px; font-weight: 500; color: var(--color-accent); word-break: break-all; padding: 8px 10px; background: var(--color-border); border-radius: 6px; margin-bottom: 10px; }\n    .qr-link-btn { width: auto; flex-shrink: 0; background: none; border: none; color: var(--color-text-muted); font-size: 12px; text-decoration: underline; cursor: pointer; padding: 0; }\n    .qr-link-btn:hover { color: var(--color-accent); }\n    .qr-created-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 13px; }\n    .qr-created-row span { flex: 1; min-width: 0; word-break: break-all; color: var(--color-accent); font-weight: 500; }\n    .qr-result { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border); text-align: center; }\n    .qr-result canvas { max-width: 100%; height: auto; border: 1px solid var(--color-border); border-radius: 6px; }\n    .qr-result-actions { display: flex; gap: 8px; margin-top: 10px; }\n    .qr-result-actions button { flex: 1; padding: 8px; font-size: 13px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-text); cursor: pointer; }\n    .qr-result-actions button:hover { border-color: var(--color-accent); color: var(--color-accent); }\n    .qr-trigger-btn { display: inline-flex; align-items: center; gap: 6px; }\n";

const QR_MODAL_HTML = `
  <div class="qr-modal-overlay" id="qrModalOverlay">
    <div class="qr-modal">
      <div class="qr-modal-header">
        <h3>Generate QR Code</h3>
        <button class="qr-modal-close" id="qrModalCloseBtn" type="button" title="Close">${icons.x}</button>
      </div>
      <div class="qr-tabs">
        <button class="qr-tab active" id="qrTabBtnUrl" type="button" data-qrtab="url">Link</button>
        <button class="qr-tab" id="qrTabBtnEmail" type="button" data-qrtab="email">Email</button>
        <button class="qr-tab" id="qrTabBtnVcard" type="button" data-qrtab="vcard">Contact</button>
      </div>

      <div class="qr-panel active" id="qrPanelUrl">
        <div id="qrUrlExistingWrap" style="display:none">
          <p class="qr-hint">This QR encodes your existing short link. Scans are tracked automatically &mdash; clicks, referrer and country &mdash; just like any other visit to it.</p>
          <div class="qr-existing-url" id="qrExistingUrlText"></div>
          <button class="qr-link-btn" id="qrUseNewUrlBtn" type="button">Use a different URL instead</button>
        </div>
        <div id="qrUrlFormWrap">
          <p class="qr-hint">Creates a short link and encodes it. Scans are tracked &mdash; clicks, referrer and country &mdash; like any other short URL.</p>
          <div class="form-group">
            <label for="qrDestUrl">Destination URL</label>
            <input type="text" id="qrDestUrl" placeholder="https://example.com/page" spellcheck="false">
          </div>
          <div class="form-group">
            <label for="qrDestSlug">Custom slug (optional)</label>
            <input type="text" id="qrDestSlug" placeholder="Leave blank for random code" spellcheck="false">
          </div>
          <button type="button" class="qr-generate-btn" id="qrUrlGenerateBtn">Generate trackable QR</button>
          <div class="qr-error" id="qrUrlError" style="display:none"></div>
          <div class="qr-created-row" id="qrCreatedRow" style="display:none">
            <span id="qrCreatedUrlText"></span>
            <button class="qr-link-btn" id="qrCreatedCopyBtn" type="button">Copy</button>
          </div>
        </div>
      </div>

      <div class="qr-panel" id="qrPanelEmail">
        <p class="qr-hint">Not tracked &mdash; the phone opens its mail app directly and never touches this server.</p>
        <div class="form-group">
          <label for="qrEmailTo">To</label>
          <input type="email" id="qrEmailTo" placeholder="name@example.com" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrEmailSubject">Subject (optional)</label>
          <input type="text" id="qrEmailSubject" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrEmailBody">Body (optional)</label>
          <textarea id="qrEmailBody" rows="3" spellcheck="false"></textarea>
        </div>
        <button type="button" class="qr-generate-btn" id="qrEmailGenerateBtn">Generate QR</button>
        <div class="qr-error" id="qrEmailError" style="display:none"></div>
      </div>

      <div class="qr-panel" id="qrPanelVcard">
        <p class="qr-hint">Not tracked &mdash; the contact card is embedded directly in the QR code.</p>
        <div class="form-group">
          <label for="qrVcName">Full name</label>
          <input type="text" id="qrVcName" placeholder="Jane Doe" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcPhone">Phone (optional)</label>
          <input type="text" id="qrVcPhone" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcEmail">Email (optional)</label>
          <input type="email" id="qrVcEmail" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcOrg">Organization (optional)</label>
          <input type="text" id="qrVcOrg" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcWebsite">Website (optional)</label>
          <input type="text" id="qrVcWebsite" placeholder="https://example.com" spellcheck="false">
        </div>
        <button type="button" class="qr-generate-btn" id="qrVcardGenerateBtn">Generate QR</button>
        <div class="qr-error" id="qrVcardError" style="display:none"></div>
      </div>

      <div class="qr-result" id="qrResultWrap" style="display:none">
        <canvas id="qrCanvas" width="280" height="280"></canvas>
        <div class="qr-result-actions">
          <button type="button" id="qrDownloadBtn">Download PNG</button>
          <button type="button" id="qrCopyDataBtn">Copy raw data</button>
        </div>
      </div>
    </div>
  </div>
`;

const QR_MODAL_JS = "\n// ---------------------------------------------------------------------------\n// QR Code modal: URL (trackable, reuses the shortener), Email & vCard\n// (untracked, encoded directly - nothing is sent to the server for those).\n// Requires a page-specific 'qrCreateShortLink(destUrl, customCode)' async\n// function to be defined for the \"Link\" tab's create-new flow.\n// ---------------------------------------------------------------------------\nvar qrRawData = '';\n\nfunction openQrModal(mode, prefill) {\n  var overlay = document.getElementById('qrModalOverlay');\n  overlay.classList.add('active');\n  document.getElementById('qrResultWrap').style.display = 'none';\n  document.getElementById('qrUrlError').style.display = 'none';\n  document.getElementById('qrEmailError').style.display = 'none';\n  document.getElementById('qrVcardError').style.display = 'none';\n  document.getElementById('qrCreatedRow').style.display = 'none';\n\n  if (prefill && prefill.shortUrl) {\n    document.getElementById('qrExistingUrlText').textContent = prefill.shortUrl;\n    document.getElementById('qrUrlExistingWrap').style.display = '';\n    document.getElementById('qrUrlFormWrap').style.display = 'none';\n    qrRenderResult(prefill.shortUrl);\n  } else {\n    document.getElementById('qrUrlExistingWrap').style.display = 'none';\n    document.getElementById('qrUrlFormWrap').style.display = '';\n    document.getElementById('qrDestUrl').value = '';\n    document.getElementById('qrDestSlug').value = '';\n  }\n\n  var defaultMode = (typeof qrCreateShortLink === 'function') ? 'url' : 'email';\n  qrSwitchTab(mode || defaultMode);\n}\n\nfunction closeQrModal() {\n  document.getElementById('qrModalOverlay').classList.remove('active');\n}\n\nfunction qrSwitchTab(mode) {\n  var tabs = { url: 'qrTabBtnUrl', email: 'qrTabBtnEmail', vcard: 'qrTabBtnVcard' };\n  var panels = { url: 'qrPanelUrl', email: 'qrPanelEmail', vcard: 'qrPanelVcard' };\n  Object.keys(tabs).forEach(function(key) {\n    document.getElementById(tabs[key]).classList.toggle('active', key === mode);\n    document.getElementById(panels[key]).classList.toggle('active', key === mode);\n  });\n}\n\nfunction qrRenderResult(text) {\n  qrRawData = text;\n  var canvas = document.getElementById('qrCanvas');\n  qrDrawToCanvas(canvas, text);\n  document.getElementById('qrResultWrap').style.display = '';\n}\n\nfunction qrVcardEscape(s) {\n  return String(s || '').replace(/\\\\/g, '\\\\\\\\').replace(/,/g, '\\\\,').replace(/;/g, '\\\\;').replace(/\\n/g, '\\\\n');\n}\n\nfunction qrBuildMailto(to, subject, body) {\n  var params = [];\n  if (subject) params.push('subject=' + encodeURIComponent(subject));\n  if (body) params.push('body=' + encodeURIComponent(body));\n  return 'mailto:' + to.trim() + (params.length ? '?' + params.join('&') : '');\n}\n\nfunction qrBuildVcard(fields) {\n  var lines = ['BEGIN:VCARD', 'VERSION:3.0'];\n  lines.push('N:;' + qrVcardEscape(fields.name) + ';;;');\n  lines.push('FN:' + qrVcardEscape(fields.name));\n  if (fields.org) lines.push('ORG:' + qrVcardEscape(fields.org));\n  if (fields.phone) lines.push('TEL;TYPE=CELL:' + qrVcardEscape(fields.phone));\n  if (fields.email) lines.push('EMAIL:' + qrVcardEscape(fields.email));\n  if (fields.website) lines.push('URL:' + qrVcardEscape(fields.website));\n  lines.push('END:VCARD');\n  return lines.join('\\r\\n');\n}\n\nfunction qrWireModal() {\n  if (typeof qrCreateShortLink !== 'function') {\n    document.getElementById('qrTabBtnUrl').style.display = 'none';\n  }\n  document.getElementById('qrModalCloseBtn').addEventListener('click', closeQrModal);\n  document.getElementById('qrModalOverlay').addEventListener('click', function(e) {\n    if (e.target === document.getElementById('qrModalOverlay')) closeQrModal();\n  });\n  document.addEventListener('keydown', function(e) {\n    if (e.key === 'Escape' && document.getElementById('qrModalOverlay').classList.contains('active')) closeQrModal();\n  });\n\n  ['qrTabBtnUrl', 'qrTabBtnEmail', 'qrTabBtnVcard'].forEach(function(id) {\n    document.getElementById(id).addEventListener('click', function() {\n      qrSwitchTab(this.getAttribute('data-qrtab'));\n    });\n  });\n\n  document.getElementById('qrUseNewUrlBtn').addEventListener('click', function() {\n    document.getElementById('qrUrlExistingWrap').style.display = 'none';\n    document.getElementById('qrUrlFormWrap').style.display = '';\n    document.getElementById('qrResultWrap').style.display = 'none';\n  });\n\n  document.getElementById('qrUrlGenerateBtn').addEventListener('click', async function() {\n    var btn = this;\n    var destUrl = document.getElementById('qrDestUrl').value.trim();\n    var slug = document.getElementById('qrDestSlug').value.trim();\n    var errEl = document.getElementById('qrUrlError');\n    errEl.style.display = 'none';\n    if (!destUrl) { errEl.textContent = 'Enter a URL to shorten.'; errEl.style.display = ''; return; }\n    btn.disabled = true;\n    btn.textContent = 'Generating\u2026';\n    try {\n      var shortUrl = await qrCreateShortLink(destUrl, slug);\n      document.getElementById('qrCreatedUrlText').textContent = shortUrl;\n      document.getElementById('qrCreatedRow').style.display = '';\n      qrRenderResult(shortUrl);\n    } catch (err) {\n      errEl.textContent = err.message || 'Failed to create short URL.';\n      errEl.style.display = '';\n    } finally {\n      btn.disabled = false;\n      btn.textContent = 'Generate trackable QR';\n    }\n  });\n\n  document.getElementById('qrCreatedCopyBtn').addEventListener('click', function() {\n    var url = document.getElementById('qrCreatedUrlText').textContent;\n    if (!url) return;\n    navigator.clipboard.writeText(url).then(function() {\n      document.getElementById('qrCreatedCopyBtn').textContent = 'Copied';\n      setTimeout(function() { document.getElementById('qrCreatedCopyBtn').textContent = 'Copy'; }, 2000);\n    });\n  });\n\n  document.getElementById('qrEmailGenerateBtn').addEventListener('click', function() {\n    var to = document.getElementById('qrEmailTo').value.trim();\n    var errEl = document.getElementById('qrEmailError');\n    errEl.style.display = 'none';\n    if (!to) { errEl.textContent = 'Enter a recipient email address.'; errEl.style.display = ''; return; }\n    var subject = document.getElementById('qrEmailSubject').value.trim();\n    var body = document.getElementById('qrEmailBody').value.trim();\n    qrRenderResult(qrBuildMailto(to, subject, body));\n  });\n\n  document.getElementById('qrVcardGenerateBtn').addEventListener('click', function() {\n    var name = document.getElementById('qrVcName').value.trim();\n    var errEl = document.getElementById('qrVcardError');\n    errEl.style.display = 'none';\n    if (!name) { errEl.textContent = 'Enter a full name.'; errEl.style.display = ''; return; }\n    qrRenderResult(qrBuildVcard({\n      name: name,\n      phone: document.getElementById('qrVcPhone').value.trim(),\n      email: document.getElementById('qrVcEmail').value.trim(),\n      org: document.getElementById('qrVcOrg').value.trim(),\n      website: document.getElementById('qrVcWebsite').value.trim()\n    }));\n  });\n\n  document.getElementById('qrDownloadBtn').addEventListener('click', function() {\n    var canvas = document.getElementById('qrCanvas');\n    var link = document.createElement('a');\n    link.download = 'qr-code.png';\n    link.href = canvas.toDataURL('image/png');\n    link.click();\n  });\n\n  document.getElementById('qrCopyDataBtn').addEventListener('click', function() {\n    if (!qrRawData) return;\n    navigator.clipboard.writeText(qrRawData).then(function() {\n      var btn = document.getElementById('qrCopyDataBtn');\n      btn.textContent = 'Copied';\n      setTimeout(function() { btn.textContent = 'Copy raw data'; }, 2000);\n    });\n  });\n}\n\nfunction openQrModalForUrl(fullUrl) {\n  openQrModal('url', { shortUrl: fullUrl });\n}\n\nqrWireModal();\n";

// ---------------------------------------------------------------------------
// Guide page HTML
// ---------------------------------------------------------------------------
const guideHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup Guide - URL Shortener</title>
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta name="theme-color" content="#e73b42">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #fdfdfd;
            --color-text: #353535;
            --color-accent: #e73b42;
            --color-accent-hover: #d12d34;
            --color-surface: #f5f5f5;
            --color-border: #e0e0e0;
            --color-text-muted: #7d7d7d;
            --font-primary: 'Inter', sans-serif;
            --font-mono: 'Source Code Pro', monospace;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg: #231f1f;
                --color-text: #d9d4d4;
                --color-accent: #ff6b7a;
                --color-accent-hover: #ff8590;
                --color-surface: #2b2626;
                --color-border: #3b3636;
                --color-text-muted: #b9b4b4;
            }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-primary), -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            line-height: 1.7;
            padding: 24px;
        }
        .container { max-width: 780px; margin: 0 auto; }
        .back-link {
            display: inline-flex; align-items: center; gap: 6px;
            color: var(--color-accent); text-decoration: none; font-weight: 500; font-size: 14px;
            margin-bottom: 24px;
        }
        .back-link:hover { color: var(--color-accent-hover); }
        .back-link svg { flex-shrink: 0; }
        h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
        h1 svg { color: var(--color-accent); flex-shrink: 0; }
        .subtitle { color: var(--color-text-muted); margin-bottom: 32px; }
        .guide-section {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 10px;
            padding: 24px;
            margin-bottom: 20px;
        }
        .guide-section h2 {
            font-size: 18px; font-weight: 600; margin-bottom: 16px;
            display: flex; align-items: center; gap: 8px;
        }
        .guide-section h2 svg { color: var(--color-accent); flex-shrink: 0; }
        .guide-section h3 { font-size: 15px; font-weight: 600; margin: 16px 0 8px; }
        .guide-section p, .guide-section li { font-size: 14px; line-height: 1.7; }
        .guide-section ul, .guide-section ol { padding-left: 20px; margin: 8px 0; }
        .guide-section li { margin-bottom: 6px; }
        pre {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            border-radius: 6px;
            padding: 14px;
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: 13px;
            line-height: 1.5;
            margin: 10px 0;
        }
        code {
            font-family: var(--font-mono);
            font-size: 13px;
            background: var(--color-bg);
            padding: 2px 5px;
            border-radius: 3px;
            border: 1px solid var(--color-border);
        }
        pre code { background: none; border: none; padding: 0; }
        .step-number {
            display: inline-flex; align-items: center; justify-content: center;
            width: 22px; height: 22px; border-radius: 50%;
            background: var(--color-accent); color: white;
            font-size: 12px; font-weight: 600; flex-shrink: 0;
        }
        .step { display: flex; gap: 10px; margin-bottom: 12px; align-items: flex-start; }
        .step p { margin: 0; }
        .note {
            background: var(--color-bg);
            border-left: 3px solid var(--color-accent);
            padding: 10px 14px;
            font-size: 13px;
            border-radius: 0 6px 6px 0;
            margin: 12px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="/admin" class="back-link">${icons.arrowLeft} Back to Admin</a>
        <h1>${icons.book} Setup Guide</h1>
        <p class="subtitle">How to shorten URLs from anywhere &mdash; your phone, browser, or code.</p>

        <div class="guide-section">
            <h2>${icons.smartphone} iOS / iPadOS Share Sheet</h2>
            <p>Add a <strong>Shorten URL</strong> action to the iOS Share Sheet using Apple Shortcuts.</p>

            <h3>Build the Shortcut</h3>
            <div class="step"><span class="step-number">1</span><p>Open the <strong>Shortcuts</strong> app and tap <strong>+</strong>. Name it <strong>Shorten URL</strong>.</p></div>
            <div class="step"><span class="step-number">2</span><p>Add <strong>Receive What's Shared</strong>. Set accepted types to <em>URLs</em> and <em>Safari Web Pages</em>.</p></div>
            <div class="step"><span class="step-number">3</span><p>Add <strong>Get Contents of URL</strong>. Set URL to <code>https://chom.pm/api/shorten</code>, Method to <code>POST</code>, Request Body to <code>JSON</code>. Add key <code>url</code> with value <em>Shortcut Input</em>. Add headers: <code>Content-Type</code> = <code>application/json</code> and <code>X-API-Key</code> = your API key.</p></div>
            <div class="step"><span class="step-number">4</span><p>Add <strong>Get Dictionary Value</strong>. Key: <code>shortUrl</code>, Dictionary: <em>Contents of URL</em>.</p></div>
            <div class="step"><span class="step-number">5</span><p>Add <strong>Copy to Clipboard</strong> with input set to <em>Dictionary Value</em>.</p></div>
            <div class="step"><span class="step-number">6</span><p>(Optional) Add <strong>Show Notification</strong> &mdash; Title: <em>URL Shortened</em>, Body: <em>Dictionary Value</em>.</p></div>

            <h3>Enable Share Sheet</h3>
            <p>Open the shortcut details and enable <strong>Show in Share Sheet</strong>. Under Share Sheet types keep <em>URLs</em> and <em>Safari Web Pages</em>.</p>

            <h3>Usage</h3>
            <p>Tap Share on any page &rarr; choose <strong>Shorten URL</strong> &rarr; the short link is copied to your clipboard.</p>

            <div class="note"><strong>Tip:</strong> To allow custom short codes, add an <strong>Ask for Input</strong> action before step 3 and pass the result as the <code>shortCode</code> JSON key.</div>

            <div class="note"><strong>Titles:</strong> To set a title, add <strong>Get Name of Shortcut Input</strong> before step 3 to get the page title. Pass it as the <code>title</code> JSON key alongside <code>url</code>. You can also add an <strong>Ask for Input</strong> to let yourself edit the title before saving.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.chrome} Chrome Extension</h2>
            <p>Install the bundled extension for one-click shortening, context menus, and keyboard shortcuts.</p>

            <h3>Install</h3>
            <div class="step"><span class="step-number">1</span><p>Open <code>chrome://extensions</code> in Chrome.</p></div>
            <div class="step"><span class="step-number">2</span><p>Enable <strong>Developer mode</strong> (toggle in top-right).</p></div>
            <div class="step"><span class="step-number">3</span><p>Click <strong>Load unpacked</strong> and select the <code>chrome-extension/</code> folder from this repo.</p></div>
            <div class="step"><span class="step-number">4</span><p>Pin the extension in the toolbar. Click it, open <strong>Settings</strong>, paste your API key, and save.</p></div>

            <h3>Usage</h3>
            <ul>
                <li><strong>Click the toolbar icon</strong> &mdash; shortens the current page, copies to clipboard.</li>
                <li><strong>Right-click a page</strong> &rarr; <em>Shorten this URL</em>.</li>
                <li><strong>Right-click any link</strong> &rarr; shortens that link directly.</li>
                <li><strong>Keyboard shortcut:</strong> <code>Ctrl+Shift+S</code> (Windows/Linux) or <code>Cmd+Shift+S</code> (macOS).</li>
            </ul>
            <div class="note"><strong>Titles:</strong> The extension automatically sends the page title. You can edit it in the popup before shortening, or later from the admin panel.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.bookmark} Browser Bookmarklet</h2>
            <p>A universal one-click solution that works in any browser &mdash; no install required.</p>

            <h3>Setup</h3>
            <div class="step"><span class="step-number">1</span><p>Copy the code below and <strong>replace <code>YOUR-API-KEY</code></strong> with your actual key.</p></div>
            <pre><code>javascript:(function(){const url=window.location.href;const title=document.title;const apiKey='YOUR-API-KEY';const domain='https://chom.pm';fetch(domain+'/api/shorten',{method:'POST',headers:{'X-API-Key':apiKey,'Content-Type':'application/json'},body:JSON.stringify({url:url,title:title})}).then(r=>r.json()).then(d=>{if(d.success){navigator.clipboard.writeText(d.shortUrl);alert('Short URL copied!\\n'+d.shortUrl);}else{alert('Error: '+d.error);}}).catch(e=>alert('Network error: '+e.message));})();</code></pre>
            <div class="step"><span class="step-number">2</span><p>Create a new bookmark in your browser. Set the <strong>Name</strong> to <em>Shorten URL</em> and paste the code as the <strong>URL</strong>.</p></div>

            <h3>Usage</h3>
            <p>Navigate to any page and click the bookmark. The short URL is created and copied to your clipboard.</p>

            <div class="note"><strong>Custom codes &amp; titles:</strong> The bookmarklet automatically captures the page title. For a version that also prompts for a custom short code, add <code>const code=prompt('Custom code (blank for random):');</code> and include <code>shortCode:code</code> in the JSON body. You can edit titles later from the admin panel.</div>

            <div class="note"><strong>Security:</strong> Your API key is visible in the bookmark. This is fine for personal use on your own devices &mdash; don't share the bookmark itself.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.code} API</h2>
            <p>Shorten URLs programmatically from any language or tool.</p>

            <h3>Endpoint</h3>
            <pre><code>POST https://chom.pm/api/shorten</code></pre>

            <h3>Headers</h3>
            <pre><code>Content-Type: application/json
X-API-Key: YOUR-API-KEY</code></pre>

            <h3>Request body</h3>
            <pre><code>{
  "url": "https://example.com/long/url",
  "title": "Optional page title",
  "shortCode": "optional-custom-code"
}</code></pre>

            <h3>Response</h3>
            <pre><code>{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "title": "Optional page title",
  "shortUrl": "https://chom.pm/abc123"
}</code></pre>

            <h3>cURL example</h3>
            <pre><code>curl -X POST https://chom.pm/api/shorten \\
  -H "X-API-Key: YOUR-API-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'</code></pre>

            <h3>JavaScript example</h3>
            <pre><code>const res = await fetch('https://chom.pm/api/shorten', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR-API-KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://example.com' }),
});
const data = await res.json();
console.log(data.shortUrl);</code></pre>

            <h3>Python example</h3>
            <pre><code>import requests

resp = requests.post(
    'https://chom.pm/api/shorten',
    headers={
        'X-API-Key': 'YOUR-API-KEY',
        'Content-Type': 'application/json',
    },
    json={'url': 'https://example.com'},
)
print(resp.json()['shortUrl'])</code></pre>

            <h3>Shell alias</h3>
            <pre><code># Add to ~/.bashrc or ~/.zshrc
shorten() {
  curl -s -X POST https://chom.pm/api/shorten \\
    -H "X-API-Key: YOUR-API-KEY" \\
    -H "Content-Type: application/json" \\
    -d "{\\\"url\\\":\\\"$1\\\"}" | jq -r '.shortUrl'
}
# Usage:  shorten "https://example.com"</code></pre>

            <div class="note"><strong>Parameters:</strong> <code>url</code> (required) must start with <code>http://</code> or <code>https://</code>. <code>title</code> (optional) a label for the URL, up to 200 characters. <code>shortCode</code> (optional) must be 3-20 characters: letters, numbers, underscore, or hyphen.</div>
        </div>
    </div>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Image Metadata Remover page HTML (/images) - fully client-side, no tracking
// ---------------------------------------------------------------------------
const imagesHtml = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>Image Metadata Remover</title>\n<link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon-16x16.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\">\n<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\">\n<style>\n  :root{--bg:#fafaf8;--fg:#1c1c1a;--mut:#6b6b66;--card:#fff;--line:#e3e3de;--acc:#2d5bff;--ok:#1a7f4b;--warn:#b4540a}\n  @media (prefers-color-scheme:dark){:root{--bg:#161614;--fg:#ececE8;--mut:#9a9a93;--card:#1f1f1c;--line:#34342f;--acc:#6f93ff;--ok:#4cc38a;--warn:#f0a35e}}\n  *{box-sizing:border-box}\n  body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,-apple-system,Segoe UI,sans-serif}\n  main{max-width:760px;margin:0 auto;padding:32px 20px 64px}\n  h1{font-size:26px;margin:0 0 4px}\n  .sub{color:var(--mut);margin:0 0 24px}\n  #drop{border:2px dashed var(--line);border-radius:14px;padding:40px 20px;text-align:center;background:var(--card);cursor:pointer;transition:.15s}\n  #drop.over,#drop:focus-visible{border-color:var(--acc);outline:none;background:color-mix(in srgb,var(--acc) 6%,var(--card))}\n  #drop strong{display:block;font-size:18px;margin-bottom:4px}\n  #drop span{color:var(--mut);font-size:14px}\n  .opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px 20px;margin:16px 0;font-size:14px;color:var(--mut)}\n  .opts label{display:flex;flex-direction:column;gap:4px}\n  .opts .inline{flex-direction:row;align-items:center;gap:8px}\n  select,input[type=range]{accent-color:var(--acc);width:100%}\n  select{background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:5px 8px;font:inherit}\n  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;margin-top:12px}\n  .top{display:flex;gap:14px}\n  .thumb{width:84px;height:84px;border-radius:8px;object-fit:cover;background:var(--line);flex:none}\n  .body{min-width:0;flex:1}\n  .name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .meta{font-size:13px;color:var(--mut);margin:2px 0 6px}\n  .chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}\n  .chip{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:1px 9px}\n  .chip.ai{border-color:var(--warn);color:var(--warn)}\n  .status{font-size:13px;margin-bottom:8px}\n  .status.ok{color:var(--ok)} .status.bad{color:var(--warn)}\n  button,a.btn{font:inherit;font-size:14px;background:var(--acc);color:#fff;border:0;border-radius:8px;padding:6px 14px;cursor:pointer;text-decoration:none;display:inline-block}\n  details{margin-top:10px;border-top:1px solid var(--line);padding-top:8px}\n  summary{cursor:pointer;font-size:14px;color:var(--acc)}\n  .cmp{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:10px}\n  @media (max-width:600px){.cmp{grid-template-columns:1fr}}\n  .col h4{margin:0 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut)}\n  .ent{font-size:13px;font-weight:600;margin-top:8px}\n  .ent.ai{color:var(--warn)}\n  .kv{display:flex;gap:8px;font-size:12.5px;line-height:1.4;padding:1px 0}\n  .kv .k{flex:none;width:110px;color:var(--mut)}\n  .kv .v{min-width:0;overflow-wrap:anywhere;font-family:ui-monospace,Menlo,monospace;font-size:12px}\n  .kv .v.sens{color:var(--warn)}\n  .empty{font-size:13px;color:var(--ok)}\n  footer{margin-top:32px;font-size:13px;color:var(--mut)}\n  footer li{margin-bottom:4px}\n</style>\n</head>\n<body>\n<main>\n  <h1>Image Metadata Remover</h1>\n  <p class=\"sub\">Strips EXIF, XMP/XML, IPTC, C2PA and AI prompt data, with optional resizing and compression. Files never leave your device.</p>\n\n  <div id=\"drop\" tabindex=\"0\" role=\"button\" aria-label=\"Choose images\">\n    <strong>Drop images here or click to choose</strong>\n    <span>JPEG, PNG, WebP (plus whatever your browser can open). You can also paste.</span>\n    <input id=\"file\" type=\"file\" accept=\"image/*\" multiple hidden>\n  </div>\n\n  <div class=\"opts\">\n    <label>Output format\n      <select id=\"fmt\">\n        <option value=\"same\">Same as input</option>\n        <option value=\"image/jpeg\">JPEG</option>\n        <option value=\"image/png\">PNG (lossless)</option>\n        <option value=\"image/webp\">WebP</option>\n      </select>\n    </label>\n    <label>Longest edge\n      <select id=\"maxdim\">\n        <option value=\"0\">Original size</option>\n        <option value=\"4096\">4096 px</option>\n        <option value=\"3000\">3000 px</option>\n        <option value=\"2048\">2048 px</option>\n        <option value=\"1600\">1600 px</option>\n        <option value=\"1280\">1280 px</option>\n        <option value=\"1024\">1024 px</option>\n        <option value=\"800\">800 px</option>\n      </select>\n    </label>\n    <label>Quality (JPEG / WebP)\n      <span class=\"inline\"><input id=\"q\" type=\"range\" min=\"0.3\" max=\"1\" step=\"0.01\" value=\"0.92\"> <span id=\"qv\">92%</span></span>\n    </label>\n    <label>Target file size\n      <select id=\"target\">\n        <option value=\"0\">None</option>\n        <option value=\"102400\">Under 100 KB</option>\n        <option value=\"256000\">Under 250 KB</option>\n        <option value=\"512000\">Under 500 KB</option>\n        <option value=\"1048576\">Under 1 MB</option>\n        <option value=\"2097152\">Under 2 MB</option>\n      </select>\n    </label>\n  </div>\n\n  <div id=\"list\"></div>\n\n  <footer>\n    <ul>\n      <li>How it works: each image is decoded and redrawn on a canvas, then re-encoded. Only pixels carry over, so nothing else can survive. Each result is scanned again to confirm. Changing a setting re-processes everything on screen.</li>\n      <li>Target size works for JPEG and WebP: it lowers quality first (down to 30%), then shrinks dimensions if needed. PNG is lossless, so use a smaller longest edge or switch format to reduce it. Images are never enlarged.</li>\n      <li>Original color profiles are dropped (the browser may add a standard sRGB one back), so colors can shift slightly. Animated GIFs become a single frame.</li>\n      <li>This removes metadata only. Invisible pixel-level watermarks embedded in the image itself are not metadata and will not be removed.</li>\n    </ul>\n  </footer>\n</main>\n\n<script>\nconst $ = s => document.querySelector(s);\nconst drop = $('#drop'), input = $('#file'), list = $('#list');\nconst items = [];\nlet downloads = null;\ntry { window.claude?.use('downloads').then(d => downloads = d).catch(() => {}); } catch (e) {}\n\ndrop.onclick = () => input.click();\ndrop.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } };\ninput.onchange = () => { handleFiles(input.files); input.value = ''; };\n['dragenter','dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('over'); }));\n['dragleave','drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('over'); }));\ndrop.addEventListener('drop', e => handleFiles(e.dataTransfer.files));\nwindow.addEventListener('paste', e => { const f = [...(e.clipboardData?.files || [])]; if (f.length) handleFiles(f); });\n\nlet timer;\nconst reprocessSoon = () => { clearTimeout(timer); timer = setTimeout(() => items.forEach(process), 350); };\n$('#q').oninput = e => { $('#qv').textContent = Math.round(e.target.value * 100) + '%'; reprocessSoon(); };\n['fmt','maxdim','target'].forEach(id => $('#' + id).onchange = reprocessSoon);\n\n/* ---------- helpers ---------- */\nconst fmtSize = n => n > 1e6 ? (n / 1e6).toFixed(2) + ' MB' : Math.max(1, Math.round(n / 1e3)) + ' KB';\nconst EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };\n// Generous bound so a pathological/crafted file can't hang the page, but every\n// truncation says exactly how much was cut - nothing is ever silently hidden.\nconst showText = (s, capLen) => {\n  capLen = capLen || 10000;\n  if (s.length <= capLen) return s;\n  return s.slice(0, capLen) + ' \u2026(truncated, ' + (s.length - capLen) + ' more characters not shown)';\n};\nfunction el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }\n\n/* ---------- EXIF parsing: every tag is shown, known or not ---------- */\nconst TAGS0 = {\n  0x0100:'ImageWidth', 0x0101:'ImageHeight', 0x0102:'BitsPerSample', 0x0103:'Compression',\n  0x0106:'PhotometricInterpretation', 0x010E:'ImageDescription', 0x010F:'Make', 0x0110:'Model',\n  0x0112:'Orientation', 0x0115:'SamplesPerPixel', 0x011A:'XResolution', 0x011B:'YResolution',\n  0x011C:'PlanarConfiguration', 0x0128:'ResolutionUnit', 0x0131:'Software', 0x0132:'DateTime',\n  0x013B:'Artist', 0x013E:'WhitePoint', 0x013F:'PrimaryChromaticities', 0x0211:'YCbCrCoefficients',\n  0x0213:'YCbCrPositioning', 0x0214:'ReferenceBlackWhite', 0x8298:'Copyright',\n};\nconst TAGSX = {\n  0x829A:'ExposureTime', 0x829D:'FNumber', 0x8822:'ExposureProgram', 0x8827:'ISOSpeedRatings',\n  0x8830:'SensitivityType', 0x9000:'ExifVersion', 0x9003:'DateTimeOriginal', 0x9004:'DateTimeDigitized',\n  0x9101:'ComponentsConfiguration', 0x9201:'ShutterSpeedValue', 0x9202:'ApertureValue',\n  0x9203:'BrightnessValue', 0x9204:'ExposureBiasValue', 0x9205:'MaxApertureValue',\n  0x9206:'SubjectDistance', 0x9207:'MeteringMode', 0x9208:'LightSource', 0x9209:'Flash',\n  0x920A:'FocalLength', 0x927C:'MakerNote', 0x9286:'UserComment', 0xA000:'FlashpixVersion',\n  0xA001:'ColorSpace', 0xA002:'PixelXDimension', 0xA003:'PixelYDimension',\n  0xA20E:'FocalPlaneXResolution', 0xA20F:'FocalPlaneYResolution', 0xA210:'FocalPlaneResolutionUnit',\n  0xA217:'SensingMethod', 0xA300:'FileSource', 0xA301:'SceneType', 0xA401:'CustomRendered',\n  0xA402:'ExposureMode', 0xA403:'WhiteBalance', 0xA404:'DigitalZoomRatio',\n  0xA405:'FocalLengthIn35mmFilm', 0xA406:'SceneCaptureType', 0xA407:'GainControl',\n  0xA408:'Contrast', 0xA409:'Saturation', 0xA40A:'Sharpness', 0xA420:'ImageUniqueID',\n  0xA430:'CameraOwnerName', 0xA431:'BodySerialNumber', 0xA432:'LensSpecification',\n  0xA433:'LensMake', 0xA434:'LensModel', 0xA435:'LensSerialNumber',\n};\nconst GPSTAGS = {\n  0x0000:'GPSVersionID', 0x0001:'GPSLatitudeRef', 0x0002:'GPSLatitude', 0x0003:'GPSLongitudeRef',\n  0x0004:'GPSLongitude', 0x0005:'GPSAltitudeRef', 0x0006:'GPSAltitude', 0x0007:'GPSTimeStamp',\n  0x0008:'GPSSatellites', 0x0009:'GPSStatus', 0x000A:'GPSMeasureMode', 0x000B:'GPSDOP',\n  0x000C:'GPSSpeedRef', 0x000D:'GPSSpeed', 0x000E:'GPSTrackRef', 0x000F:'GPSTrack',\n  0x0010:'GPSImgDirectionRef', 0x0011:'GPSImgDirection', 0x0012:'GPSMapDatum',\n  0x001B:'GPSProcessingMethod', 0x001C:'GPSAreaInformation', 0x001D:'GPSDateStamp',\n};\nconst SENS = new Set([\n  'Artist','CameraOwnerName','BodySerialNumber','LensSerialNumber','ImageUniqueID','Copyright',\n  'GPSLatitude','GPSLongitude','GPSAltitude','GPSTimeStamp','GPSDateStamp','GPSAreaInformation','GPSProcessingMethod',\n]);\n\nfunction parseExif(b, start) {\n  const rows = [];\n  try {\n    const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);\n    const le = b[start] === 0x49;\n    const u16 = o => dv.getUint16(o, le), u32 = o => dv.getUint32(o, le);\n    const SZ = { 1:1, 2:1, 3:2, 4:4, 5:8, 7:1, 9:4, 10:8 };\n    const val = (type, count, o) => {\n      if (type === 2) { let s = ''; for (let i = 0; i < count; i++) { const c = b[o + i]; if (!c) break; s += String.fromCharCode(c); } return showText(s.trim(), 2000); }\n      if (type === 7) {                                       // UNDEFINED: show as hex, never silently\n        const n = Math.min(count, 32);\n        const hex = Array.from({ length: n }, (_, i) => b[o + i].toString(16).padStart(2, '0')).join(' ');\n        if (!count) return '(empty)';\n        return hex + (count > n ? ' \u2026(+' + (count - n) + ' more bytes)' : '');\n      }\n      const out = [];\n      const n = Math.min(count, 64);\n      for (let i = 0; i < n; i++) {\n        if (type === 3) out.push(u16(o + i * 2));\n        else if (type === 4) out.push(u32(o + i * 4));\n        else if (type === 5) { const d = u32(o + i * 8 + 4); out.push(d ? u32(o + i * 8) / d : 0); }\n        else out.push(b[o + i]);\n      }\n      if (count > n) out.push('\u2026(+' + (count - n) + ' more)');\n      return out;\n    };\n    const ifd = (off, names, cb) => {\n      const base = start + off, n = u16(base);\n      for (let i = 0; i < n && i < 200; i++) {\n        const e = base + 2 + i * 12, tag = u16(e), type = u16(e + 2), count = u32(e + 4);\n        const size = (SZ[type] || 1) * count;\n        const vo = size > 4 ? start + u32(e + 8) : e + 8;\n        if (vo < 0 || vo + size > b.length) continue;\n        if (cb && cb(tag, type, count, vo)) continue;\n        let v = val(type, count, vo);\n        if (Array.isArray(v)) v = v.join(', ');\n        if (v === '' || v == null) continue;\n        const label = names[tag] || ('Tag 0x' + tag.toString(16).toUpperCase().padStart(4, '0'));\n        rows.push({ k: label, v: String(v), sens: SENS.has(names[tag]) });\n      }\n      return n < 200 ? u32(base + 2 + n * 12) : 0;             // offset of next IFD (thumbnail), or 0\n    };\n    let exifPtr = 0, gpsPtr = 0;\n    const nextIfd = ifd(u32(start + 4), TAGS0, (tag, type, count, vo) => {\n      if (tag === 0x8769) { exifPtr = u32(vo); return true; }\n      if (tag === 0x8825) { gpsPtr = u32(vo); return true; }\n    });\n    if (exifPtr) ifd(exifPtr, TAGSX);\n    if (gpsPtr) {\n      const g = {};\n      ifd(gpsPtr, GPSTAGS, (tag, type, count, vo) => { g[tag] = val(type, count, vo); return false; });\n      const dms = a => Array.isArray(a) && a.length >= 3 ? a[0] + a[1] / 60 + a[2] / 3600 : null;\n      const lat = dms(g[2]), lon = dms(g[4]);\n      if (lat != null && lon != null) {\n        rows.unshift({ k: 'GPS location (decimal)', v: lat.toFixed(5) + ' ' + (g[1] || '') + ', ' + lon.toFixed(5) + ' ' + (g[3] || ''), sens: true });\n      }\n    }\n    if (nextIfd) rows.push({ k: 'Embedded thumbnail', v: 'present - a second, smaller image is stored inside this file (its pixels are not extracted or shown here, but it is not removed by the EXIF strip alone, only by the full re-encode this tool does)' });\n  } catch (e) { rows.push({ k: 'EXIF', v: 'present but could not be fully parsed: ' + (e.message || e) }); }\n  return rows;\n}\n\n/* ---------- IPTC-IIM (inside a JPEG Photoshop/APP13 segment) ---------- */\nconst IPTC_DATASETS = {\n  5:'ObjectName', 7:'EditStatus', 8:'EditorialUpdate', 10:'Urgency', 12:'SubjectReference',\n  15:'Category', 20:'SupplementalCategory', 22:'FixtureIdentifier', 25:'Keywords',\n  26:'ContentLocationCode', 27:'ContentLocationName', 30:'ReleaseDate', 35:'ReleaseTime',\n  37:'ExpirationDate', 38:'ExpirationTime', 40:'SpecialInstructions', 42:'ActionAdvised',\n  45:'ReferenceService', 47:'ReferenceDate', 50:'ReferenceNumber', 55:'DateCreated',\n  60:'TimeCreated', 62:'DigitalCreationDate', 63:'DigitalCreationTime', 65:'OriginatingProgram',\n  70:'ProgramVersion', 75:'ObjectCycle', 80:'By-line', 85:'By-lineTitle', 90:'City',\n  92:'Sub-location', 95:'Province-State', 100:'Country-PrimaryLocationCode',\n  101:'Country-PrimaryLocationName', 103:'OriginalTransmissionReference', 105:'Headline',\n  110:'Credit', 115:'Source', 116:'CopyrightNotice', 118:'Contact', 120:'Caption-Abstract',\n  122:'Writer-Editor', 131:'ImageType', 135:'LanguageIdentifier',\n};\nconst IPTC_SENS = new Set(['By-line','City','Sub-location','Province-State','Country-PrimaryLocationName','Credit','Contact','CopyrightNotice']);\nfunction iptcRows(bytes) {\n  const rows = [];\n  let i = 0;\n  while (i + 5 <= bytes.length) {\n    if (bytes[i] !== 0x1C) { i++; continue; }\n    const record = bytes[i + 1], dataset = bytes[i + 2];\n    const lenByte1 = bytes[i + 3], lenByte2 = bytes[i + 4];\n    if (lenByte1 & 0x80) { rows.push({ k: 'IPTC', v: 'an extended-length field follows and was not decoded (rare, non-standard form)' }); break; }\n    const len = (lenByte1 << 8) | lenByte2;\n    const dataStart = i + 5;\n    if (dataStart + len > bytes.length) break;\n    if (record === 2) {\n      const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes.subarray(dataStart, dataStart + len)).trim();\n      const name = IPTC_DATASETS[dataset] || ('Record 2, dataset ' + dataset);\n      if (text) rows.push({ k: name, v: showText(text, 2000), sens: IPTC_SENS.has(name) });\n    } else if (record !== undefined) {\n      const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes.subarray(dataStart, dataStart + len)).trim();\n      if (text) rows.push({ k: 'Record ' + record + ', dataset ' + dataset, v: showText(text, 500) });\n    }\n    i = dataStart + len;\n  }\n  return rows;\n}\nfunction photoshopIptcRows(bytes) {\n  const rows = [];\n  let i = 0, found = false;\n  while (i + 4 <= bytes.length) {\n    if (bytes[i] === 0x38 && bytes[i + 1] === 0x42 && bytes[i + 2] === 0x49 && bytes[i + 3] === 0x4D) { // \"8BIM\"\n      const resId = (bytes[i + 4] << 8) | bytes[i + 5];\n      let p = i + 6;\n      const nameLen = bytes[p];\n      let nameTotal = 1 + nameLen;\n      if (nameTotal % 2 !== 0) nameTotal++;\n      p += nameTotal;\n      if (p + 4 > bytes.length) break;\n      const dataSize = ((bytes[p] << 24) | (bytes[p + 1] << 16) | (bytes[p + 2] << 8) | bytes[p + 3]) >>> 0;\n      p += 4;\n      if (p + dataSize > bytes.length) break;\n      if (resId === 0x0404) { found = true; rows.push(...iptcRows(bytes.subarray(p, p + dataSize))); }\n      let dataTotal = dataSize;\n      if (dataTotal % 2 !== 0) dataTotal++;\n      i = p + dataTotal;\n    } else i++;\n  }\n  if (!found) rows.push({ k: 'Photoshop resource block', v: fmtSize(bytes.length) + ' present, but no IPTC-NAA (8BIM 0x0404) record found inside it' });\n  return rows;\n}\n\n/* ---------- C2PA / JUMBF: signed, CBOR-encoded - fully decoding it is out of\n   scope, but nothing readable inside it is hidden or capped. ---------- */\nconst VENDORS = /(OpenAI|DALL[\u00b7\\-.]?E|Midjourney|Firefly|Adobe|Google|Gemini|Imagen|Leica|Sony|Nikon|Canon|Samsung|Truepic|Microsoft|Bing|Stability|Runway|ChatGPT|GPT-4o|Sora|Meta)/gi;\nfunction extractStrings(text, minLen) {\n  const out = [];\n  const re = new RegExp('[\\\\x20-\\\\x7e]{' + minLen + ',}', 'g');\n  let m;\n  while ((m = re.exec(text))) out.push(m[0].trim());\n  return out;\n}\nfunction c2paRows(bytes) {\n  const txt = new TextDecoder('latin1').decode(bytes);\n  const hits = [...new Set((txt.match(VENDORS) || []))];\n  const rows = [{ k: 'Manifest size', v: fmtSize(bytes.length) }];\n  if (hits.length) rows.push({ k: 'Vendor/tool mentions', v: hits.join(', ') });\n  const strings = [...new Set(extractStrings(txt, 5))];\n  const cap = 150;\n  if (strings.length) {\n    rows.push({ k: 'Readable strings found inside', v: strings.slice(0, cap).join(' | ') + (strings.length > cap ? ' \u2026(+' + (strings.length - cap) + ' more strings not shown)' : '') });\n  }\n  rows.push({ k: 'Note', v: 'C2PA manifests are signed CBOR/JUMBF binary data. This lists every readable text fragment found inside, but does not decode the structured manifest itself (actions, assertions, signature) - that would need a real C2PA parser.' });\n  return rows;\n}\n\n/* ---------- XMP: every field found, plus the full raw XML, never truncated\n   except by the generous showText() safety cap (with an explicit count). ---------- */\nfunction xmpRows(text) {\n  const rows = [];\n  const seen = new Set();\n  const attrRe = /([\\w-]+:[\\w-]+)\\s*=\\s*\"([^\"]*)\"/g;\n  let m;\n  while ((m = attrRe.exec(text))) {\n    const key = m[1], v = m[2];\n    if (!v || seen.has(key + '=' + v)) continue;\n    seen.add(key + '=' + v);\n    rows.push({ k: key, v: showText(v, 2000) });\n  }\n  const elRe = /<([\\w-]+:[\\w-]+)(?:\\s[^>]*)?>([^<]+)<\\/\\1>/g;\n  while ((m = elRe.exec(text))) {\n    const key = m[1], v = m[2].trim();\n    if (!v || seen.has(key + '=' + v)) continue;\n    seen.add(key + '=' + v);\n    rows.push({ k: key, v: showText(v, 2000) });\n  }\n  rows.push({ k: 'Raw XML (whitespace collapsed)', v: showText(text.replace(/\\s+/g, ' ').trim(), 10000) });\n  return rows;\n}\n\nconst AI_KEYS = new Set(['parameters','prompt','workflow','invokeai_metadata','sd-metadata','dream','negative_prompt','generation_data']);\n\n/* ---------- zlib inflate, for PNG zTXt / compressed iTXt chunks ---------- */\nasync function inflateZlib(bytes) {\n  try {\n    const ds = new DecompressionStream('deflate'); // Web Streams \"deflate\" = zlib (RFC1950), matching PNG's format\n    const stream = new Blob([bytes]).stream().pipeThrough(ds);\n    return new Uint8Array(await new Response(stream).arrayBuffer());\n  } catch (e) { return null; }\n}\n\n/* ---------- scanner: returns [{label, ai, rows}] ---------- */\nasync function scan(buf) {\n  const b = new Uint8Array(buf), dv = new DataView(buf), found = [];\n  const add = (label, rows = [], ai = false) => {\n    const ex = found.find(f => f.label === label);\n    if (ex) { ex.rows.push(...rows); ex.ai ||= ai; } else found.push({ label, rows, ai });\n  };\n  const ascii = (o, n) => { let s = ''; for (let i = o; i < o + n && i < b.length; i++) s += String.fromCharCode(b[i]); return s; };\n  const utf8 = (o, n) => new TextDecoder().decode(b.subarray(o, Math.min(o + n, b.length)));\n  const utf8Bytes = bytes => new TextDecoder().decode(bytes);\n\n  if (b[0] === 0xFF && b[1] === 0xD8) {                       // JPEG\n    let o = 2;\n    while (o + 4 <= b.length && b[o] === 0xFF) {\n      const m = b[o + 1];\n      if (m === 0xDA || m === 0xD9) break;\n      if (m === 0xFF) { o++; continue; }\n      if ((m >= 0xD0 && m <= 0xD7) || m === 0x01) { o += 2; continue; }\n      const len = dv.getUint16(o + 2), d = o + 4;\n      if (m === 0xE1) {\n        if (ascii(d, 6) === 'Exif\\0\\0') add('EXIF', parseExif(b, d + 6));\n        else if (ascii(d, 28).startsWith('http://ns.adobe.com/xap')) add('XMP (XML)', xmpRows(utf8(d + 29, len - 31)));\n      } else if (m === 0xEB) add('C2PA / JUMBF', c2paRows(b.subarray(d, o + 2 + len)), true);\n      else if (m === 0xED) add('IPTC / Photoshop', photoshopIptcRows(b.subarray(d, o + 2 + len)));\n      else if (m === 0xE2 && ascii(d, 11) === 'ICC_PROFILE') add('Color profile', [{ k: 'Size', v: fmtSize(len) }]);\n      else if (m === 0xFE) add('Comment', [{ k: 'Text', v: showText(utf8(d, len - 2), 5000) }]);\n      o += 2 + len;\n    }\n  } else if (ascii(1, 3) === 'PNG') {                          // PNG\n    let o = 8;\n    while (o + 8 <= b.length) {\n      const len = dv.getUint32(o), type = ascii(o + 4, 4), d = o + 8;\n      if (type === 'IEND') break;\n      if (type === 'eXIf') add('EXIF', parseExif(b, d));\n      else if (type === 'caBX') add('C2PA', c2paRows(b.subarray(d, d + len)), true);\n      else if (type === 'iCCP') add('Color profile', [{ k: 'Size', v: fmtSize(len) }]);\n      else if (type === 'tIME') add('Timestamp', [{ k: 'Modified', v: dv.getUint16(d) + '-' + b[d + 2] + '-' + b[d + 3] }]);\n      else if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') {\n        let z = d; while (z < d + len && b[z] !== 0) z++;\n        const kw = ascii(d, z - d);\n        let text = '';\n        if (type === 'tEXt') {\n          text = ascii(z + 1, len - (z - d) - 1);\n        } else if (type === 'zTXt') {\n          const compData = b.subarray(z + 2, d + len);\n          const inflated = await inflateZlib(compData);\n          text = inflated ? utf8Bytes(inflated) : '(zlib-compressed text, ' + fmtSize(compData.length) + ' - could not decompress)';\n        } else {                                                // iTXt\n          const compFlag = b[z + 1];\n          let p = z + 3;\n          while (p < d + len && b[p] !== 0) p++; p++;            // language tag\n          while (p < d + len && b[p] !== 0) p++; p++;             // translated keyword\n          if (compFlag === 0) {\n            text = utf8(p, d + len - p);\n          } else {\n            const compData = b.subarray(p, d + len);\n            const inflated = await inflateZlib(compData);\n            text = inflated ? utf8Bytes(inflated) : '(zlib-compressed text, ' + fmtSize(compData.length) + ' - could not decompress)';\n          }\n        }\n        if (kw.startsWith('XML:com.adobe.xmp')) add('XMP (XML)', xmpRows(text));\n        else add('Text: ' + kw, [{ k: 'Value', v: showText(text, 10000) }], AI_KEYS.has(kw.toLowerCase()));\n      }\n      o += 12 + len;\n    }\n  } else if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP') { // WebP\n    let o = 12;\n    while (o + 8 <= b.length) {\n      const t = ascii(o, 4), len = dv.getUint32(o + 4, true), d = o + 8;\n      if (t === 'EXIF') add('EXIF', parseExif(b, ascii(d, 6) === 'Exif\\0\\0' ? d + 6 : d));\n      else if (t === 'XMP ') add('XMP (XML)', xmpRows(utf8(d, len)));\n      else if (t === 'ICCP') add('Color profile', [{ k: 'Size', v: fmtSize(len) }]);\n      else if (t === 'C2PA') add('C2PA', c2paRows(b.subarray(d, d + len)), true);\n      o += 8 + len + (len & 1);\n    }\n  }\n  if (buf.byteLength < 60e6) {                                  // fallback for markers in odd places\n    const txt = new TextDecoder('latin1').decode(b);\n    if (/c2pa|contentcredentials/i.test(txt) && !found.some(f => /C2PA/.test(f.label))) add('C2PA / Content Credentials', [], true);\n    if (txt.includes('trainedAlgorithmicMedia')) add('AI source tag (IPTC)', [{ k: 'Type', v: 'trainedAlgorithmicMedia' }], true);\n  }\n  return found;\n}\n\n/* ---------- image pipeline ---------- */\nfunction scaled(src, w, h) {\n  // step down by halves for cleaner results\n  let cur = src, cw = src.width, ch = src.height;\n  while (cw / 2 > w) {\n    const nw = Math.floor(cw / 2), nh = Math.floor(ch / 2);\n    const t = document.createElement('canvas'); t.width = nw; t.height = nh;\n    const x = t.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, nw, nh);\n    cur = t; cw = nw; ch = nh;\n  }\n  const out = document.createElement('canvas'); out.width = w; out.height = h;\n  const x = out.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(cur, 0, 0, w, h);\n  return out;\n}\nconst enc = (c, type, q) => new Promise(r => c.toBlob(r, type, q));\nfunction flatten(c, type) {\n  if (type !== 'image/jpeg') return c;\n  const t = document.createElement('canvas'); t.width = c.width; t.height = c.height;\n  const x = t.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, t.width, t.height); x.drawImage(c, 0, 0);\n  return t;\n}\nasync function encodeTarget(c, type, qMax, target) {\n  let cur = c;\n  for (let pass = 0; pass < 6; pass++) {\n    let b = await enc(cur, type, qMax);\n    if (b.size <= target) return { blob: b, canvas: cur };\n    let lo = 0.3, hi = qMax;\n    let low = await enc(cur, type, lo);\n    if (low.size > target) { cur = scaled(cur, Math.max(16, Math.round(cur.width * 0.85)), Math.max(16, Math.round(cur.height * 0.85))); continue; }\n    let best = low;\n    for (let i = 0; i < 6; i++) {\n      const mid = (lo + hi) / 2, t = await enc(cur, type, mid);\n      if (t.size <= target) { best = t; lo = mid; } else hi = mid;\n    }\n    return { blob: best, canvas: cur };\n  }\n  return { blob: await enc(cur, type, 0.3), canvas: cur };\n}\n\n/* ---------- UI ---------- */\nfunction entriesView(entries, emptyText) {\n  const w = el('div');\n  if (!entries.length) { w.append(el('div', 'empty', emptyText)); return w; }\n  for (const e of entries) {\n    w.append(el('div', 'ent' + (e.ai ? ' ai' : ''), e.label));\n    for (const r of e.rows) {\n      const row = el('div', 'kv');\n      row.append(el('span', 'k', r.k), el('span', 'v' + (r.sens ? ' sens' : ''), r.v));\n      w.append(row);\n    }\n  }\n  return w;\n}\n\nfunction handleFiles(files) {\n  for (const file of files) {\n    if (!file.type.startsWith('image/')) continue;\n    const card = el('div', 'card');\n    const top = el('div', 'top');\n    const img = el('img', 'thumb'); img.alt = '';\n    const body = el('div', 'body');\n    const name = el('div', 'name', file.name);\n    const meta = el('div', 'meta', fmtSize(file.size) + ' \u00b7 working\u2026');\n    const chips = el('div', 'chips');\n    const status = el('div', 'status');\n    const a = el('a', 'btn', 'Download'); a.style.display = 'none';\n    body.append(name, meta, chips, status, a);\n    top.append(img, body);\n    const det = el('details');\n    det.append(el('summary', null, 'Before / after metadata'));\n    const cmp = el('div', 'cmp'); det.append(cmp);\n    card.append(top, det);\n    list.prepend(card);\n\n    const item = { file, img, meta, chips, status, a, cmp, gen: 0, blob: null, url: null, before: null, outName: '' };\n    a.onclick = async e => {\n      if (!downloads || !item.blob) return;\n      e.preventDefault();\n      try { await downloads.save({ filename: item.outName, data: item.blob }); }\n      catch (err) { if (err?.code !== 'declined') item.status.textContent = 'Save failed: ' + (err?.message || err?.code); }\n    };\n    items.push(item);\n    process(item);\n  }\n}\n\nasync function process(item) {\n  const { file, img, meta, chips, status, a, cmp } = item;\n  const gen = ++item.gen;\n  meta.textContent = fmtSize(file.size) + ' \u00b7 working\u2026';\n  try {\n    if (!item.before) item.before = await scan(await file.arrayBuffer());\n    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });\n    const ow = bmp.width, oh = bmp.height;\n    const maxd = +$('#maxdim').value, longest = Math.max(ow, oh);\n    const k = maxd && longest > maxd ? maxd / longest : 1;\n    const w = Math.max(1, Math.round(ow * k)), h = Math.max(1, Math.round(oh * k));\n\n    const base = document.createElement('canvas'); base.width = ow; base.height = oh;\n    base.getContext('2d').drawImage(bmp, 0, 0); bmp.close?.();\n    const want = $('#fmt').value === 'same' ? (EXT[file.type] ? file.type : 'image/png') : $('#fmt').value;\n    let c = flatten(k < 1 ? scaled(base, w, h) : base, want);\n\n    const q = parseFloat($('#q').value), target = +$('#target').value;\n    let blob, outCanvas = c;\n    if (target && want !== 'image/png') ({ blob, canvas: outCanvas } = await encodeTarget(c, want, q, target));\n    else blob = await enc(c, want, q);\n    if (!blob) throw new Error('Could not encode image');\n    const after = await scan(await blob.arrayBuffer());\n    if (gen !== item.gen) return;                                   // a newer run superseded this one\n\n    if (item.url) URL.revokeObjectURL(item.url);\n    item.blob = blob; item.url = URL.createObjectURL(blob);\n    item.outName = file.name.replace(/\\.[^.]+$/, '') + '-clean.' + (EXT[blob.type] || 'png');\n    img.src = item.url; a.href = item.url; a.download = item.outName; a.style.display = 'inline-block';\n\n    const pct = Math.round((1 - blob.size / file.size) * 100);\n    const dims = (outCanvas.width !== ow || outCanvas.height !== oh) ? ow + '\u00d7' + oh + ' \u2192 ' + outCanvas.width + '\u00d7' + outCanvas.height : ow + '\u00d7' + oh;\n    meta.textContent = fmtSize(file.size) + ' \u2192 ' + fmtSize(blob.size) + (pct > 0 ? ' (' + pct + '% smaller)' : pct < 0 ? ' (' + (-pct) + '% larger)' : '') + ' \u00b7 ' + dims;\n    if (target && want === 'image/png') meta.textContent += ' \u00b7 target size ignored for PNG';\n\n    chips.replaceChildren();\n    if (item.before.length) item.before.forEach(f => chips.append(el('span', 'chip' + (f.ai ? ' ai' : ''), f.label)));\n    else chips.append(el('span', 'chip', 'No metadata found'));\n\n    const leftover = after.filter(x => x.label !== 'Color profile');\n    if (leftover.length) { status.className = 'status bad'; status.textContent = 'Still found: ' + leftover.map(l => l.label).join(', '); }\n    else { status.className = 'status ok'; status.textContent = item.before.length ? '\u2713 Removed and verified clean' : '\u2713 Verified clean'; }\n\n    cmp.replaceChildren();\n    const c1 = el('div', 'col'), c2 = el('div', 'col');\n    c1.append(el('h4', null, 'Before'), entriesView(item.before, 'No metadata found'));\n    c2.append(el('h4', null, 'After'), entriesView(after, 'Nothing found. Only pixels remain.'));\n    cmp.append(c1, c2);\n  } catch (e) {\n    if (gen !== item.gen) return;\n    status.className = 'status bad';\n    status.textContent = 'Could not process this file: ' + (e.message || 'unsupported format');\n    meta.textContent = fmtSize(file.size);\n  }\n}\n</script>\n</body>\n</html>";

// ---------------------------------------------------------------------------
// URL Cleaner / Stripper page HTML
// ---------------------------------------------------------------------------
const urlCleanerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL Strip</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/clean/manifest.json">
  <meta name="theme-color" content="#e73b42">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="URL Strip">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-bg: #fdfdfd;
      --color-text: #353535;
      --color-accent: #e73b42;
      --color-accent-hover: #d12d34;
      --color-surface: #f5f5f5;
      --color-border: #e0e0e0;
      --color-text-muted: #7d7d7d;
      --color-text-light: #9d9d9d;
      --font-primary: 'Inter', sans-serif;
      --font-fallback: 'Source Sans 3', sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #231f1f;
        --color-text: #d9d4d4;
        --color-accent: #ff6b7a;
        --color-accent-hover: #ff8590;
        --color-surface: #2b2626;
        --color-border: #3b3636;
        --color-text-muted: #b9b4b4;
        --color-text-light: #948f8f;
      }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-primary), var(--font-fallback), -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      line-height: 1.7;
    }
    .container {
      background: var(--color-surface);
      border-radius: 12px;
      border: 1px solid var(--color-border);
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 680px;
      width: 100%;
      padding: 40px;
    }
    .page-header { margin-bottom: 28px; }
    .title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
    h1 { font-size: 26px; font-weight: 700; color: var(--color-text); line-height: 1.2; }
    h1 span { color: var(--color-accent); }
    .subtitle { font-size: 13px; color: var(--color-text-muted); margin-top: 6px; }
    .settings-toggle {
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      color: var(--color-text-muted);
      font-family: var(--font-primary), sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 6px 12px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
      white-space: nowrap;
      flex-shrink: 0;
      width: auto;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .settings-toggle:hover { border-color: var(--color-accent); color: var(--color-accent); transform: none; }
    .form-group { margin-bottom: 20px; }
    label {
      display: block;
      margin-bottom: 6px;
      color: var(--color-text);
      font-weight: 500;
      font-size: 14px;
    }
    textarea {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid var(--color-border);
      border-radius: 6px;
      font-size: 14px;
      font-family: var(--font-primary), var(--font-fallback), sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      transition: border-color 0.2s;
      outline: none;
      resize: vertical;
      min-height: 100px;
      line-height: 1.6;
    }
    textarea:focus { border-color: var(--color-accent); }
    textarea::placeholder { color: var(--color-text-light); }
    .paste-hint { font-size: 12px; color: var(--color-text-light); text-align: right; margin-top: 6px; margin-bottom: 16px; }
    button {
      width: 100%;
      padding: 12px;
      background: var(--color-accent);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      font-family: var(--font-primary), var(--font-fallback), sans-serif;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s, opacity 0.2s;
    }
    button:hover { background: var(--color-accent-hover); transform: translateY(-1px); }
    button:active { transform: translateY(0); }
    button:disabled { opacity: 0.4; cursor: default; transform: none; }
    .result-box {
      margin-top: 24px;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      overflow: hidden;
    }
    .result-header {
      padding: 10px 16px;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-muted);
    }
    .status-badge {
      font-size: 12px;
      font-weight: 600;
      color: #16a34a;
      background: #dcfce7;
      padding: 2px 8px;
      border-radius: 99px;
    }
    @media (prefers-color-scheme: dark) {
      .status-badge { color: #4ade80; background: rgba(74,222,128,0.12); }
    }
    .result-url {
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.7;
      word-break: break-all;
      color: var(--color-text);
      user-select: all;
      cursor: text;
      border-bottom: 1px solid var(--color-border);
    }
    .result-footer {
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .removed-tags { display: flex; flex-wrap: wrap; gap: 6px; flex: 1; min-width: 0; }
    .removed-tag {
      font-size: 11px;
      font-weight: 500;
      background: rgba(231,59,66,0.08);
      color: var(--color-accent);
      padding: 2px 7px;
      border-radius: 99px;
      border: 1px solid rgba(231,59,66,0.2);
    }
    @media (prefers-color-scheme: dark) {
      .removed-tag { background: rgba(255,107,122,0.1); border-color: rgba(255,107,122,0.25); }
    }
    .no-params-text { font-size: 13px; color: var(--color-text-light); }
    .action-btns { display: flex; gap: 8px; flex-shrink: 0; }
    .btn-sm {
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 500;
      width: auto;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .btn-copy { background: var(--color-accent); color: white; border: none; }
    .btn-copy:hover { background: var(--color-accent-hover); }
    .btn-copy.copied { background: #16a34a; transform: none; }
    .error-note { padding: 12px 16px; font-size: 13px; color: #dc2626; }
    @media (prefers-color-scheme: dark) { .error-note { color: #f87171; } }
    .btn-trace { background: var(--color-bg); color: var(--color-text-muted); border: 1px solid var(--color-border); }
    .btn-trace:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-bg); }
    .btn-trace.loading { opacity: 0.6; cursor: default; transform: none; }
    .peek-section { border-top: 1px solid var(--color-border); }
    .peek-chain { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
    .peek-hop { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; }
    .peek-hop-num { font-size: 11px; font-weight: 600; color: var(--color-text-muted); width: 20px; flex-shrink: 0; padding-top: 3px; }
    .peek-status { font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 99px; flex-shrink: 0; margin-top: 1px; }
    .peek-status-3xx { color: #92400e; background: #fef3c7; }
    .peek-status-2xx { color: #166534; background: #dcfce7; }
    .peek-status-err { color: #7f1d1d; background: #fef2f2; }
    @media (prefers-color-scheme: dark) {
      .peek-status-3xx { color: #fbbf24; background: rgba(251,191,36,0.12); }
      .peek-status-2xx { color: #4ade80; background: rgba(74,222,128,0.12); }
      .peek-status-err { color: #f87171; background: rgba(248,113,113,0.1); }
    }
    .peek-hop-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
    .peek-hop-url { word-break: break-all; color: var(--color-text); line-height: 1.5; }
    .peek-hop.is-final .peek-hop-url { font-weight: 600; color: var(--color-accent); }
    .peek-hop-actions { display: flex; gap: 6px; flex-wrap: wrap; }
    .peek-action-btn {
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      width: auto;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
    }
    .peek-action-btn.copy { background: var(--color-surface); color: var(--color-text-muted); border: 1px solid var(--color-border); }
    .peek-action-btn.copy:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-surface); transform: none; }
    .peek-action-btn.copy.copied { color: #16a34a; border-color: #16a34a; background: var(--color-surface); transform: none; }
    .peek-msg { padding: 12px 16px; font-size: 13px; color: var(--color-text-muted); }
    .peek-error { padding: 12px 16px; font-size: 13px; color: #dc2626; }
    @media (prefers-color-scheme: dark) { .peek-error { color: #f87171; } }
    .peek-cleaned-section {
      border-top: 1px solid var(--color-border);
      background: var(--color-surface);
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .peek-cleaned-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); }
    .peek-cleaned-url { font-size: 13px; word-break: break-all; color: var(--color-text); }
    .peek-cleaned-removed { display: flex; flex-wrap: wrap; gap: 5px; }
    .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .label-row label { margin-bottom: 0; }
    .clear-btn {
      width: auto;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      background: transparent;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
      border-radius: 5px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .clear-btn:hover { border-color: #dc2626; color: #dc2626; background: transparent; transform: none; }
    @media (prefers-color-scheme: dark) { .clear-btn:hover { border-color: #f87171; color: #f87171; } }
${QR_MODAL_CSS}
  </style>
</head>
<body>
  <div class="container">
    <div class="page-header">
      <div class="title-row">
        <h1>URL<span>.</span>STRIP</h1>
        <button class="settings-toggle" id="qrModalOpenBtn" type="button">${icons.qrCode} QR Code</button>
      </div>
      <p class="subtitle">Remove tracking parameters from a URL</p>
    </div>

    <div class="form-group">
      <div class="label-row">
        <label for="urlInput">URL to clean</label>
        <button class="clear-btn" id="clearBtn" style="display:none">Clear</button>
      </div>
      <textarea id="urlInput" placeholder="Paste a URL here&#8230;" spellcheck="false"></textarea>
      <div class="paste-hint">&#8984; / Ctrl + Enter to clean</div>
    </div>

    <button id="cleanBtn" disabled>Strip It</button>

    <div class="result-box" id="resultBox" style="display:none">
      <div class="result-header">
        <span>Cleaned URL</span>
        <span class="status-badge" id="resultStatus" style="display:none"></span>
      </div>
      <div class="error-note" id="resultError" style="display:none"></div>
      <div class="result-url" id="resultUrl" style="display:none"></div>
      <div class="result-footer" id="resultActions" style="display:none">
        <div class="removed-tags" id="removedList"></div>
        <div class="action-btns">
          <button class="btn-sm btn-copy" id="copyBtn">Copy</button>
          <button class="btn-sm btn-trace" id="traceBtn" style="display:none">Trace</button>
        </div>
      </div>
      <div class="peek-section" id="peekSection" style="display:none">
        <div id="peekContent"></div>
      </div>
    </div>
  </div>
${QR_MODAL_HTML}

  <script>
${QR_LIB_JS}
${QR_MODAL_JS}
    var TRACKING_PARAMS = new Set([
      "utm_source","utm_medium","utm_campaign","utm_term","utm_content",
      "utm_id","utm_source_platform","utm_campaign_id","utm_creative_format",
      "utm_marketing_tactic",
      "_kx","uid","campaign_id",
      "fbclid","fb_action_ids","fb_action_types","fb_source","fb_ref",
      "gclid","gclsrc","dclid","gbraid","wbraid",
      "msclkid",
      "twclid",
      "hsa_acc","hsa_cam","hsa_grp","hsa_ad","hsa_src","hsa_tgt",
      "hsa_kw","hsa_mt","hsa_net","hsa_ver","hsa_la",
      "mc_cid","mc_eid",
      "mkt_tok",
      "messageId",
      "ref","referrer","source","campaign","trk","trkinfo",
      "igshid","s_cid","ncid","cid","eid","mid",
      "clickid","click_id","track","tracking",
      "affiliate","aff_id","partner_id",
      "zanpid","origin","sxsrf"
    ]);

    function cleanUrl(raw) {
      var trimmed = raw.trim();
      if (!trimmed) return { cleaned: "", removed: [] };
      var url;
      try { url = new URL(trimmed); } catch(e) { return { cleaned: trimmed, removed: [], error: "Not a valid URL" }; }
      var removed = [];
      var toDelete = [];
      url.searchParams.forEach(function(v, key) {
        if (TRACKING_PARAMS.has(key.toLowerCase())) { toDelete.push(key); removed.push(key); }
      });
      toDelete.forEach(function(k) { url.searchParams.delete(k); });
      var cleaned = url.toString();
      if (url.searchParams.size === 0) cleaned = cleaned.replace(/[?]$/, "");
      return { cleaned: cleaned, removed: removed };
    }

    async function peekUrl(targetUrl) {
      var endpoint = "/api/peek?url=" + encodeURIComponent(targetUrl);
      var res = await fetch(endpoint, { method: "GET" });
      var data = await res.json();
      if (!data.success) throw new Error(data.error || "HTTP " + res.status);
      return data;
    }

    var result = null;
    var peekData = null;
    var peeking = false;
    var peekError = null;

    function g(id) { return document.getElementById(id); }
    function show(el) { el.style.display = ""; }
    function hide(el) { el.style.display = "none"; }

    function updateCleanBtn() {
      var hasInput = !!g("urlInput").value.trim();
      g("cleanBtn").disabled = !hasInput;
      if (hasInput) { show(g("clearBtn")); } else { hide(g("clearBtn")); }
    }

    function doClear() {
      g("urlInput").value = "";
      result = null;
      peekData = null; peekError = null; peeking = false;
      g("cleanBtn").disabled = true;
      hide(g("clearBtn"));
      renderResult();
    }

    function renderResult() {
      if (!result) { hide(g("resultBox")); return; }
      show(g("resultBox"));

      if (result.error) {
        g("resultError").textContent = result.error;
        show(g("resultError"));
        hide(g("resultUrl"));
        hide(g("resultActions"));
        hide(g("peekSection"));
        hide(g("resultStatus"));
        return;
      }

      hide(g("resultError"));
      g("resultUrl").textContent = result.cleaned;
      show(g("resultUrl"));
      show(g("resultActions"));

      var statusEl = g("resultStatus");
      if (result.removed.length === 0) {
        statusEl.textContent = "Already clean";
      } else {
        statusEl.textContent = result.removed.length + " param" + (result.removed.length !== 1 ? "s" : "") + " removed";
      }
      show(statusEl);

      var rl = g("removedList");
      if (result.removed.length > 0) {
        rl.innerHTML = result.removed.map(function(p) { return "<span class='removed-tag'>" + p + "</span>"; }).join("");
      } else {
        rl.innerHTML = "<span class='no-params-text'>No tracking params found</span>";
      }

      show(g("traceBtn"));
      renderPeek();
    }

    function statusClass(s) {
      if (!s || s === 0) return "peek-status-err";
      if (s >= 300 && s < 400) return "peek-status-3xx";
      if (s >= 200 && s < 300) return "peek-status-2xx";
      return "peek-status-err";
    }

    function renderPeek() {
      var section = g("peekSection");
      var content = g("peekContent");
      if (!peekData && !peeking && !peekError) { hide(section); return; }
      show(section);

      if (peeking) {
        content.innerHTML = "<div class='peek-msg'>Tracing redirects…</div>";
        return;
      }
      if (peekError) {
        content.innerHTML = "<div class='peek-error'>Trace failed: " + peekError + "</div>";
        return;
      }

      var chain = peekData.chain;
      if (!chain || chain.length === 0) {
        content.innerHTML = "<div class='peek-msg'>No redirect data returned.</div>";
        return;
      }
      if (chain.length === 1 && chain[0].status >= 200 && chain[0].status < 300) {
        content.innerHTML = "<div class='peek-msg'>No redirects — direct link (HTTP " + chain[0].status + ")</div>";
        return;
      }

      // Build DOM nodes so we can attach event listeners without inline handlers
      var chainDiv = document.createElement("div");
      chainDiv.className = "peek-chain";

      chain.forEach(function(hop, i) {
        var isFinal = (i === chain.length - 1);
        var sc = statusClass(hop.status);
        var label = hop.status ? String(hop.status) : (hop.note === "loop" ? "LOOP" : "ERR");

        var hopDiv = document.createElement("div");
        hopDiv.className = "peek-hop" + (isFinal ? " is-final" : "");

        var numEl = document.createElement("span");
        numEl.className = "peek-hop-num";
        numEl.textContent = String(i + 1);

        var statusEl = document.createElement("span");
        statusEl.className = "peek-status " + sc;
        statusEl.textContent = label;

        var mainDiv = document.createElement("div");
        mainDiv.className = "peek-hop-main";

        var urlEl = document.createElement("span");
        urlEl.className = "peek-hop-url";
        urlEl.textContent = hop.url;

        var actionsDiv = document.createElement("div");
        actionsDiv.className = "peek-hop-actions";

        var copyBtn = document.createElement("button");
        copyBtn.className = "peek-action-btn copy";
        copyBtn.textContent = "Copy";
        (function(btn, url) {
          btn.addEventListener("click", function() {
            navigator.clipboard.writeText(url).then(function() {
              btn.textContent = "✓ Copied";
              btn.classList.add("copied");
              setTimeout(function() { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
            });
          });
        })(copyBtn, hop.url);
        actionsDiv.appendChild(copyBtn);

        mainDiv.appendChild(urlEl);
        mainDiv.appendChild(actionsDiv);
        hopDiv.appendChild(numEl);
        hopDiv.appendChild(statusEl);
        hopDiv.appendChild(mainDiv);
        chainDiv.appendChild(hopDiv);
      });

      content.innerHTML = "";
      content.appendChild(chainDiv);

      // If the final URL still has tracking params, show the cleaned version
      var finalUrl = peekData.finalUrl;
      if (finalUrl) {
        var finalCleaned = cleanUrl(finalUrl);
        if (finalCleaned.removed.length > 0) {
          var cleanedSection = document.createElement("div");
          cleanedSection.className = "peek-cleaned-section";

          var cleanedLabel = document.createElement("div");
          cleanedLabel.className = "peek-cleaned-label";
          cleanedLabel.textContent = "Cleaned endpoint";
          cleanedSection.appendChild(cleanedLabel);

          var cleanedUrl = document.createElement("div");
          cleanedUrl.className = "peek-cleaned-url";
          cleanedUrl.textContent = finalCleaned.cleaned;
          cleanedSection.appendChild(cleanedUrl);

          var removedDiv = document.createElement("div");
          removedDiv.className = "peek-cleaned-removed";
          finalCleaned.removed.forEach(function(p) {
            var tag = document.createElement("span");
            tag.className = "removed-tag";
            tag.textContent = p;
            removedDiv.appendChild(tag);
          });
          cleanedSection.appendChild(removedDiv);

          var cleanedActions = document.createElement("div");
          cleanedActions.className = "peek-hop-actions";

          var copyCleanedBtn = document.createElement("button");
          copyCleanedBtn.className = "peek-action-btn copy";
          copyCleanedBtn.textContent = "Copy";
          (function(btn, url) {
            btn.addEventListener("click", function() {
              navigator.clipboard.writeText(url).then(function() {
                btn.textContent = "✓ Copied"; btn.classList.add("copied");
                setTimeout(function() { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
              });
            });
          })(copyCleanedBtn, finalCleaned.cleaned);
          cleanedActions.appendChild(copyCleanedBtn);

          cleanedSection.appendChild(cleanedActions);
          content.appendChild(cleanedSection);
        }
      }
    }

    function doClean() {
      var input = g("urlInput").value;
      if (!input.trim()) return;
      result = cleanUrl(input);
      peekData = null;
      peekError = null;
      peeking = false;
      g("copyBtn").textContent = "Copy";
      g("copyBtn").classList.remove("copied");
      renderResult();
    }

    g("urlInput").addEventListener("input", updateCleanBtn);
    g("urlInput").addEventListener("keydown", function(e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) doClean();
    });
    g("urlInput").addEventListener("paste", function(e) {
      var pasted = e.clipboardData.getData("text");
      if (pasted.trim()) {
        setTimeout(function() {
          g("urlInput").value = pasted.trim();
          updateCleanBtn();
          result = cleanUrl(pasted.trim());
          peekData = null;
          peekError = null;
          peeking = false;
          g("copyBtn").textContent = "Copy";
          g("copyBtn").classList.remove("copied");
          renderResult();
        }, 0);
      }
    });

    g("cleanBtn").addEventListener("click", doClean);
    g("clearBtn").addEventListener("click", doClear);

    g("copyBtn").addEventListener("click", function() {
      if (!result || !result.cleaned) return;
      navigator.clipboard.writeText(result.cleaned).then(function() {
        g("copyBtn").textContent = "✓ Copied";
        g("copyBtn").classList.add("copied");
        setTimeout(function() { g("copyBtn").textContent = "Copy"; g("copyBtn").classList.remove("copied"); }, 2000);
      });
    });

    g("qrModalOpenBtn").addEventListener("click", function() {
      openQrModal();
    });

    g("traceBtn").addEventListener("click", async function() {
      if (!result || !result.cleaned || peeking) return;
      peeking = true;
      peekData = null;
      peekError = null;
      g("traceBtn").classList.add("loading");
      g("traceBtn").disabled = true;
      renderPeek();
      try {
        peekData = await peekUrl(result.cleaned);
      } catch(err) {
        peekError = err.message;
      } finally {
        peeking = false;
        g("traceBtn").classList.remove("loading");
        g("traceBtn").disabled = false;
        renderPeek();
      }
    });
  </script>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Admin panel HTML
// ---------------------------------------------------------------------------
const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener - Admin</title>

    <!-- Favicons and Touch Icons -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta name="theme-color" content="#e73b42">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #fdfdfd;
            --color-text: #353535;
            --color-accent: #e73b42;
            --color-accent-hover: #d12d34;
            --color-sidebar-bg: #f5f5f5;
            --color-border: #e0e0e0;
            --color-text-muted: #7d7d7d;
            --color-text-light: #9d9d9d;
            --spacing-xs: 8px;
            --spacing-sm: 12px;
            --spacing-md: 20px;
            --spacing-lg: 30px;
            --spacing-xl: 40px;
            --font-primary: 'Inter', sans-serif;
            --font-fallback: 'Source Sans 3', sans-serif;
            --line-height-base: 1.7;
            --line-height-tight: 1.3;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg: #231f1f;
                --color-text: #d9d4d4;
                --color-accent: #ff6b7a;
                --color-accent-hover: #ff8590;
                --color-sidebar-bg: #2b2626;
                --color-border: #3b3636;
                --color-text-muted: #b9b4b4;
                --color-text-light: #948f8f;
            }
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: var(--font-primary), var(--font-fallback), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: var(--spacing-md);
            line-height: var(--line-height-base);
        }

        .container {
            background: var(--color-sidebar-bg);
            border-radius: 12px;
            border: 1px solid var(--color-border);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            max-width: 900px;
            width: 100%;
            padding: var(--spacing-xl);
        }

        h1 {
            color: var(--color-text);
            margin-bottom: var(--spacing-lg);
            text-align: center;
            font-weight: 700;
            line-height: var(--line-height-tight);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        h1 svg { color: var(--color-accent); }

        .auth-section, .admin-section { display: none; }
        .auth-section.active, .admin-section.active { display: block; }

        .form-group { margin-bottom: var(--spacing-md); }

        label {
            display: block;
            margin-bottom: var(--spacing-xs);
            color: var(--color-text);
            font-weight: 500;
        }

        input[type="password"], input[type="url"], input[type="text"] {
            width: 100%;
            padding: var(--spacing-sm);
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 16px;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            transition: border-color 0.3s;
        }

        input:focus {
            outline: none;
            border-color: var(--color-accent);
        }

        button {
            width: 100%;
            padding: var(--spacing-sm);
            background: var(--color-accent);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
        }

        button:hover {
            background: var(--color-accent-hover);
            transform: translateY(-1px);
        }

        button:active { transform: translateY(0); }

        .url-list { margin-top: var(--spacing-lg); }

        .url-item {
            background: var(--color-bg);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid var(--color-border);
            position: relative;
        }

        .url-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }

        .short-url-row {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .short-url {
            color: var(--color-accent);
            font-weight: 600;
            text-decoration: none;
            font-size: 15px;
        }

        .short-url:hover { color: var(--color-accent-hover); }

        .long-url {
            color: var(--color-text-muted);
            font-size: 13px;
            word-break: break-all;
            margin-top: 4px;
            line-height: 1.5;
        }

        .url-meta {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: var(--color-text-light);
            margin-top: 4px;
        }

        .url-meta svg { flex-shrink: 0; }

        .url-stats {
            background: var(--color-sidebar-bg);
            padding: 10px;
            border-radius: 6px;
            border: 1px solid var(--color-border);
            margin-top: 10px;
            font-size: 13px;
            color: var(--color-text);
        }

        .stat-row {
            display: flex;
            gap: 20px;
            margin-bottom: 5px;
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .log-toggle-btn {
            width: auto;
            background: none;
            color: var(--color-accent);
            border: none;
            padding: 6px 0 0;
            margin-top: 5px;
            font-size: 12px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
        }
        .log-toggle-btn:hover { background: none; color: var(--color-accent-hover); transform: none; }

        .click-log {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--color-border);
            max-height: 240px;
            overflow-y: auto;
        }
        .log-loading, .log-empty {
            font-size: 12px;
            color: var(--color-text-muted);
            padding: 4px 0;
        }
        .log-entry {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 8px;
            padding: 5px 0;
            font-size: 12px;
            border-bottom: 1px solid var(--color-border);
        }
        .log-entry:last-child { border-bottom: none; }
        .log-time {
            color: var(--color-text-muted);
            white-space: nowrap;
            flex-shrink: 0;
            min-width: 60px;
        }
        .log-country {
            color: var(--color-text);
            font-weight: 500;
            white-space: nowrap;
            flex-shrink: 0;
        }
        .log-city {
            color: var(--color-text-muted);
            white-space: nowrap;
            flex-shrink: 0;
        }
        .log-referrer {
            color: var(--color-text-light);
            word-break: break-all;
            flex: 1;
            min-width: 120px;
        }

        .stat-label {
            font-weight: 500;
            color: var(--color-text-muted);
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .icon-btn {
            padding: 5px 10px;
            width: auto;
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            height: 28px;
            box-sizing: border-box;
        }

        .copy-btn {
            background: var(--color-accent);
            flex-shrink: 0;
        }
        .copy-btn:hover { background: var(--color-accent-hover); }
        .copy-btn.copied { background: #28a745; }

        .edit-btn { background: var(--color-text-muted); }
        .edit-btn:hover { background: var(--color-text); }

        .delete-btn {
            background: var(--color-text-muted);
            position: absolute;
            bottom: 12px;
            right: 12px;
        }
        .delete-btn:hover { background: var(--color-text); }

        .message {
            padding: var(--spacing-sm);
            border-radius: 6px;
            margin-bottom: var(--spacing-md);
            display: none;
            border: 1px solid var(--color-border);
        }

        .message.success {
            background: #d4edda; color: #155724; border-color: #c3e6cb; display: block;
        }
        @media (prefers-color-scheme: dark) {
            .message.success { background: #1e4620; color: #9fe5a4; border-color: #2d5a2f; }
        }
        .message.error {
            background: #f8d7da; color: #721c24; border-color: #f5c6cb; display: block;
        }
        @media (prefers-color-scheme: dark) {
            .message.error { background: #4a1f22; color: #f5b7bc; border-color: #5a2f32; }
        }

        .stats {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: var(--spacing-md);
            text-align: center;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .stats-item { text-align: center; }

        .stats-number {
            font-size: 32px;
            font-weight: 700;
            color: var(--color-accent);
        }

        .stats-label {
            color: var(--color-text-muted);
            margin-top: 5px;
            font-size: 14px;
        }

        .bulk-bar {
            display: none;
            align-items: center;
            gap: 12px;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 10px 14px;
            border-radius: 8px;
            margin-bottom: 12px;
        }

        .bulk-bar.active { display: flex; }

        .bulk-bar span { font-size: 14px; font-weight: 500; flex: 1; }

        .bulk-bar button {
            width: auto;
            padding: 6px 14px;
            font-size: 13px;
        }

        .bulk-delete-btn { background: #dc3545; }
        .bulk-delete-btn:hover { background: #c82333; }

        .bulk-cancel-btn { background: var(--color-text-muted); }
        .bulk-cancel-btn:hover { background: var(--color-text); }

        .url-checkbox {
            width: 18px;
            height: 18px;
            accent-color: var(--color-accent);
            cursor: pointer;
            flex-shrink: 0;
            margin-right: 6px;
        }

        .url-item-row {
            display: flex;
            align-items: center;
        }

        .url-item-content { flex: 1; min-width: 0; padding-bottom: 20px; }

        .show-more-btn {
            width: 100%;
            background: var(--color-bg);
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            padding: 12px;
            font-size: 14px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .show-more-btn:hover {
            background: var(--color-sidebar-bg);
            transform: none;
        }

        .edit-inline {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .edit-inline input {
            width: 140px;
            padding: 3px 8px;
            font-size: 14px;
            font-weight: 600;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            background: var(--color-bg);
            color: var(--color-accent);
        }

        .edit-inline button {
            width: auto;
            padding: 4px 8px;
            font-size: 12px;
        }

        .save-edit-btn { background: #28a745; }
        .save-edit-btn:hover { background: #218838; }

        .cancel-edit-btn { background: var(--color-text-muted); }
        .cancel-edit-btn:hover { background: var(--color-text); }

        .footer-actions {
            display: flex;
            gap: 10px;
            margin-top: var(--spacing-md);
        }

        .footer-actions button { flex: 1; }

        .guide-btn {
            background: var(--color-bg);
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .guide-btn:hover {
            background: var(--color-sidebar-bg);
            transform: translateY(-1px);
        }

        .logout-btn {
            background: var(--color-text-muted);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .logout-btn:hover { background: var(--color-text); }

        .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .list-header h2 {
            color: var(--color-text);
            font-weight: 600;
        }

        .select-all-label {
            font-size: 13px;
            color: var(--color-text-muted);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            user-select: none;
        }

        h2 { color: var(--color-text); font-weight: 600; }

        .search-bar {
            position: relative;
            margin-bottom: 15px;
        }

        .search-bar input {
            width: 100%;
            padding: 10px 12px 10px 36px;
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 14px;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            transition: border-color 0.3s;
        }

        .search-bar input:focus {
            outline: none;
            border-color: var(--color-accent);
        }

        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-light);
            display: flex;
            pointer-events: none;
        }

        .url-title {
            font-weight: 500;
            font-size: 14px;
            color: var(--color-text);
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .url-title svg { color: var(--color-text-muted); flex-shrink: 0; }

        .url-title-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .no-title {
            color: var(--color-text-light);
            font-style: italic;
            font-weight: 400;
        }

        .title-edit-btn {
            background: none;
            border: none;
            color: var(--color-text-light);
            cursor: pointer;
            padding: 2px;
            width: auto;
            display: inline-flex;
            align-items: center;
        }

        .title-edit-btn:hover {
            color: var(--color-accent);
            background: none;
            transform: none;
        }

        .title-edit-inline {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
        }

        .title-edit-inline input {
            flex: 1;
            padding: 3px 8px;
            font-size: 14px;
            font-weight: 500;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            background: var(--color-bg);
            color: var(--color-text);
        }

        .title-edit-inline button {
            width: auto;
            padding: 4px 8px;
            font-size: 12px;
        }

        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs); }
        .label-row label { margin-bottom: 0; }
        .clean-url-btn {
            width: auto; padding: 4px 10px; font-size: 12px; font-weight: 500;
            background: var(--color-bg); color: var(--color-accent);
            border: 1px solid var(--color-border); border-radius: 6px;
            cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
        }
        .clean-url-btn:hover { background: var(--color-sidebar-bg); border-color: var(--color-accent); transform: none; }
        .removed-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .removed-tag {
            font-size: 11px; font-weight: 500;
            background: rgba(231,59,66,0.08); color: var(--color-accent);
            padding: 2px 7px; border-radius: 99px; border: 1px solid rgba(231,59,66,0.2);
        }
        @media (prefers-color-scheme: dark) {
            .removed-tag { background: rgba(255,107,122,0.1); border-color: rgba(255,107,122,0.25); }
        }
        .no-params-text { font-size: 11px; color: var(--color-text-light); }

        .search-match {
            background: rgba(231, 59, 66, 0.15);
            border-radius: 2px;
        }

        .tag-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
        .tag-chip {
            display: inline-flex; align-items: center; gap: 3px;
            padding: 2px 8px; font-size: 11px; font-weight: 500;
            border-radius: 12px;
            background: var(--color-sidebar-bg); color: var(--color-text-muted);
            border: 1px solid var(--color-border); cursor: pointer;
        }
        .tag-chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .tag-chip .tag-remove {
            cursor: pointer; font-size: 13px; line-height: 1;
            color: var(--color-text-light); margin-left: 2px;
        }
        .tag-chip .tag-remove:hover { color: var(--color-accent); }

        .tag-filter-bar {
            display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; align-items: center;
        }
        .tag-filter-chip {
            display: inline-flex; align-items: center; gap: 3px;
            padding: 3px 10px; font-size: 12px; font-weight: 500;
            border-radius: 14px; cursor: pointer; border: 1px solid var(--color-border);
            background: var(--color-bg); color: var(--color-text-muted); transition: all 0.15s;
        }
        .tag-filter-chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .tag-filter-chip.active { background: var(--color-accent); color: #fff; border-color: var(--color-accent); }
        .tag-filter-label { font-size: 12px; color: var(--color-text-light); margin-right: 4px; }

        .tag-input-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .tag-input-row input { flex: 1; min-width: 120px; }
        .tag-input-inline {
            display: flex; align-items: center; gap: 4px; margin-top: 4px;
        }
        .tag-input-inline input {
            flex: 1; padding: 3px 8px; font-size: 12px;
            border: 2px solid var(--color-accent); border-radius: 4px;
            background: var(--color-bg); color: var(--color-text);
        }
        .tag-input-inline button { width: auto; padding: 3px 8px; font-size: 11px; }

        .tools-bar {
            display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;
        }
        .tool-btn {
            padding: 6px 14px; font-size: 12px; font-weight: 500;
            background: var(--color-bg); color: var(--color-accent);
            border: 1px solid var(--color-border); border-radius: 6px;
            cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
            width: auto;
        }
        .tool-btn:hover { background: var(--color-sidebar-bg); transform: none; }

        .upload-area {
            display: none; margin-top: 10px; padding: 15px;
            border: 2px dashed var(--color-border); border-radius: 8px;
            background: var(--color-sidebar-bg); text-align: center;
        }
        .upload-area.visible { display: block; }
        .upload-area p { font-size: 13px; color: var(--color-text-muted); margin-bottom: 10px; }
        .upload-area input[type="file"] { display: none; }
        .upload-area label {
            display: inline-block; padding: 8px 20px; background: var(--color-accent);
            color: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
        }
        .upload-area label:hover { background: var(--color-accent-hover); }
        .upload-progress { margin-top: 10px; font-size: 13px; color: var(--color-text-muted); }
${QR_MODAL_CSS}
    </style>
</head>
<body>
    <div class="container">
        <h1>${icons.link} URL Shortener Admin</h1>

        <div id="authSection" class="auth-section active">
            <div id="authMessage" class="message"></div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter admin password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

        <div id="adminSection" class="admin-section">
            <div id="message" class="message"></div>

            <div class="stats">
                <div class="stats-grid">
                    <div class="stats-item">
                        <div class="stats-number" id="urlCount">0</div>
                        <div class="stats-label">Short URLs</div>
                    </div>
                    <div class="stats-item">
                        <div class="stats-number" id="totalClicks">0</div>
                        <div class="stats-label">Total Clicks</div>
                    </div>
                </div>
            </div>

            <form id="createForm">
                <div class="form-group">
                    <div class="label-row">
                        <label for="longUrl">Long URL</label>
                        <button type="button" class="clean-url-btn" id="cleanUrlBtn">${icons.filter} Clean</button>
                    </div>
                    <input type="url" id="longUrl" placeholder="https://example.com/very/long/url" required>
                    <div class="removed-tags" id="createRemovedParams" style="display:none"></div>
                </div>
                <div class="form-group">
                    <label for="title">Title (optional)</label>
                    <input type="text" id="title" placeholder="e.g. Team standup notes" maxlength="200">
                </div>
                <div class="form-group">
                    <label for="shortCode">Custom Short Code (optional)</label>
                    <input type="text" id="shortCode" placeholder="Leave blank for random code">
                </div>
                <div class="form-group">
                    <label for="tags">Tags (optional, comma-separated)</label>
                    <input type="text" id="tags" placeholder="e.g. marketing, social, blog">
                </div>
                <button type="submit">Create Short URL</button>
            </form>

            <div class="tools-bar">
                <button class="tool-btn" onclick="exportCsv()">${icons.share} Download CSV</button>
                <button class="tool-btn" onclick="toggleUpload()">${icons.link} Bulk Upload</button>
                <button class="tool-btn" onclick="openQrModal('url')">${icons.qrCode} QR Code</button>
            </div>
            <div id="uploadArea" class="upload-area">
                <p>Upload a CSV file with one URL per line, or columns: url, title, tags</p>
                <label for="csvFile">Choose CSV File</label>
                <input type="file" id="csvFile" accept=".csv,.txt" onchange="handleCsvUpload(this.files[0])">
                <div id="uploadProgress" class="upload-progress"></div>
            </div>

            <div class="url-list">
                <div class="search-bar">
                    <span class="search-icon">${icons.search}</span>
                    <input type="text" id="searchInput" placeholder="Search titles, URLs, tags..." oninput="applySearch()">
                </div>
                <div id="tagFilterBar" class="tag-filter-bar" style="display:none;"></div>
                <div class="list-header">
                    <h2>Your Short URLs</h2>
                    <label class="select-all-label"><input type="checkbox" id="selectAll" class="url-checkbox"> Select all</label>
                </div>
                <div id="bulkBar" class="bulk-bar">
                    <span id="selectedCount">0 selected</span>
                    <button class="bulk-delete-btn icon-btn" onclick="bulkDelete()">${icons.trash} Delete selected</button>
                    <button class="bulk-cancel-btn icon-btn" onclick="clearSelection()">${icons.x} Cancel</button>
                </div>
                <div id="urlsList"></div>
                <div id="showMoreWrap" style="display:none; margin-top:10px;">
                    <button class="show-more-btn" onclick="showMore()">${icons.chevronDown} <span id="showMoreLabel">Show more</span></button>
                </div>
            </div>

            <div class="footer-actions">
                <button class="guide-btn" onclick="window.location.href='/admin/guide'">${icons.book} Setup Guide</button>
                <button class="logout-btn" onclick="logout()">${icons.logOut} Logout</button>
            </div>
        </div>
    </div>
${QR_MODAL_HTML}

    <script>
${QR_LIB_JS}
${QR_MODAL_JS}
        let authToken = '';
        let allUrls = [];
        let filteredUrls = [];
        let searchQuery = '';
        let selectedTag = '';
        let displayLimit = 50;
        const PAGE_SIZE = 50;
        const selectedCodes = new Set();

        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            authToken = savedToken;
            document.getElementById('authSection').classList.remove('active');
            document.getElementById('adminSection').classList.add('active');
            loadUrls();
        }

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            try {
                const response = await fetch('/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                const data = await response.json();
                if (response.ok) {
                    authToken = data.token;
                    localStorage.setItem('adminToken', authToken);
                    showMessage('authMessage', 'Login successful!', 'success');
                    setTimeout(() => {
                        document.getElementById('authSection').classList.remove('active');
                        document.getElementById('adminSection').classList.add('active');
                        loadUrls();
                    }, 500);
                } else {
                    showMessage('authMessage', data.error || 'Login failed', 'error');
                }
            } catch (error) {
                showMessage('authMessage', 'Network error', 'error');
            }
        });

        const TRACKING_PARAMS = new Set([
            "utm_source","utm_medium","utm_campaign","utm_term","utm_content",
            "utm_id","utm_source_platform","utm_campaign_id","utm_creative_format",
            "utm_marketing_tactic",
            "_kx","uid","campaign_id",
            "fbclid","fb_action_ids","fb_action_types","fb_source","fb_ref",
            "gclid","gclsrc","dclid","gbraid","wbraid",
            "msclkid",
            "twclid",
            "hsa_acc","hsa_cam","hsa_grp","hsa_ad","hsa_src","hsa_tgt",
            "hsa_kw","hsa_mt","hsa_net","hsa_ver","hsa_la",
            "mc_cid","mc_eid",
            "mkt_tok",
            "messageId",
            "ref","referrer","source","campaign","trk","trkinfo",
            "igshid","s_cid","ncid","cid","eid","mid",
            "clickid","click_id","track","tracking",
            "affiliate","aff_id","partner_id",
            "zanpid","origin","sxsrf"
        ]);

        function cleanUrl(raw) {
            const trimmed = raw.trim();
            if (!trimmed) return { cleaned: "", removed: [] };
            let url;
            try { url = new URL(trimmed); } catch (e) { return { cleaned: trimmed, removed: [], error: "Not a valid URL" }; }
            const removed = [];
            const toDelete = [];
            url.searchParams.forEach((v, key) => {
                if (TRACKING_PARAMS.has(key.toLowerCase())) { toDelete.push(key); removed.push(key); }
            });
            toDelete.forEach(k => url.searchParams.delete(k));
            let cleaned = url.toString();
            if (url.searchParams.size === 0) cleaned = cleaned.replace(/[?]$/, "");
            return { cleaned, removed };
        }

        document.getElementById('cleanUrlBtn').addEventListener('click', () => {
            const input = document.getElementById('longUrl');
            const removedRow = document.getElementById('createRemovedParams');
            const result = cleanUrl(input.value);
            if (result.error) {
                removedRow.innerHTML = '<span class="no-params-text">' + result.error + '</span>';
                removedRow.style.display = '';
                return;
            }
            input.value = result.cleaned;
            if (result.removed.length > 0) {
                removedRow.innerHTML = result.removed.map(p => '<span class="removed-tag">' + p + '</span>').join('');
            } else {
                removedRow.innerHTML = '<span class="no-params-text">Already clean</span>';
            }
            removedRow.style.display = '';
        });

        document.getElementById('createForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const longUrl = document.getElementById('longUrl').value;
            const title = document.getElementById('title').value.trim() || undefined;
            const shortCode = document.getElementById('shortCode').value || undefined;
            const tagsRaw = document.getElementById('tags').value;
            const tags = tagsRaw ? [...new Set(tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean))] : [];
            try {
                const response = await fetch('/admin/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ url: longUrl, title, shortCode, tags })
                });
                const data = await response.json();
                if (response.ok) {
                    const fullUrl = '${CANONICAL_DOMAIN}' + '/' + data.shortCode;
                    try {
                        await navigator.clipboard.writeText(fullUrl);
                        showMessage('message', 'Short URL created and copied to clipboard: ' + fullUrl, 'success');
                    } catch (err) {
                        showMessage('message', 'Short URL created: ' + fullUrl, 'success');
                    }
                    document.getElementById('createForm').reset();
                    document.getElementById('createRemovedParams').style.display = 'none';
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired. Please login again.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to create URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        });

        document.getElementById('selectAll').addEventListener('change', function() {
            const visible = filteredUrls.slice(0, displayLimit);
            if (this.checked) {
                visible.forEach(u => selectedCodes.add(u.shortCode));
            } else {
                selectedCodes.clear();
            }
            renderList();
            updateBulkBar();
        });

        async function loadUrls() {
            try {
                const response = await fetch('/admin/list', { headers: { 'Authorization': authToken } });
                if (!response.ok) {
                    if (response.status === 401) { showMessage('message', 'Session expired. Please login again.', 'error'); logout(); return; }
                    throw new Error('Failed to load URLs');
                }
                const data = await response.json();

                const statsResults = await Promise.allSettled(
                    data.urls.map(item => fetchStats(item.shortCode))
                );
                const urlsWithData = data.urls.map((item, i) => ({
                    ...item,
                    stats: statsResults[i].status === 'fulfilled' ? statsResults[i].value : null,
                }));

                allUrls = urlsWithData;
                selectedCodes.clear();
                document.getElementById('selectAll').checked = false;

                document.getElementById('urlCount').textContent = allUrls.length;
                const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();

                document.getElementById('authSection').classList.remove('active');
                document.getElementById('adminSection').classList.add('active');

                applySearch();
            } catch (error) {
                showMessage('message', 'Failed to load URLs', 'error');
            }
        }

        async function fetchStats(shortCode) {
            try {
                const response = await fetch('/admin/stats/' + shortCode, { headers: { 'Authorization': authToken } });
                return await response.json();
            } catch (err) {
                return null;
            }
        }

        async function qrCreateShortLink(destUrl, customCode) {
            const response = await fetch('/admin/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                body: JSON.stringify({ url: destUrl, shortCode: customCode || undefined })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create short URL');
            loadUrls();
            return '${CANONICAL_DOMAIN}' + '/' + data.shortCode;
        }

        function applySearch() {
            searchQuery = (document.getElementById('searchInput') ? document.getElementById('searchInput').value : '').toLowerCase().trim();
            filteredUrls = allUrls;

            if (selectedTag) {
                filteredUrls = filteredUrls.filter(item =>
                    (item.tags || []).some(t => t.toLowerCase() === selectedTag.toLowerCase())
                );
            }

            if (searchQuery) {
                filteredUrls = filteredUrls.filter(item => {
                    const t = (item.title || '').toLowerCase();
                    const u = (item.url || '').toLowerCase();
                    const sc = (item.shortCode || '').toLowerCase();
                    const tags = (item.tags || []).join(' ').toLowerCase();
                    return t.includes(searchQuery) || u.includes(searchQuery) || sc.includes(searchQuery) || tags.includes(searchQuery);
                });
            }

            displayLimit = PAGE_SIZE;
            renderList();
            updateBulkBar();
            renderTagFilter();
        }

        function renderTagFilter() {
            const allTags = {};
            allUrls.forEach(item => {
                (item.tags || []).forEach(t => {
                    const key = t.toLowerCase();
                    if (!allTags[key]) allTags[key] = { name: t, count: 0 };
                    allTags[key].count++;
                });
            });
            const bar = document.getElementById('tagFilterBar');
            const sorted = Object.values(allTags).sort((a, b) => b.count - a.count);
            if (sorted.length === 0) { bar.style.display = 'none'; return; }
            bar.style.display = 'flex';
            bar.innerHTML = '<span class="tag-filter-label">${icons.tag} Filter:</span>' +
                '<span class="tag-filter-chip' + (!selectedTag ? ' active' : '') + '" onclick="filterByTag(\\'\\')">${icons.tag} All</span>' +
                sorted.map(t =>
                    '<span class="tag-filter-chip' + (selectedTag && selectedTag.toLowerCase() === t.name.toLowerCase() ? ' active' : '') +
                    '" onclick="filterByTag(\\'' + escapeAttr(t.name) + '\\')">' + escapeHtml(t.name) + ' (' + t.count + ')</span>'
                ).join('');
        }

        function filterByTag(tag) {
            selectedTag = tag;
            applySearch();
        }

        function renderList() {
            const urlsList = document.getElementById('urlsList');
            if (allUrls.length === 0) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs yet. Create your first short URL!</p>';
                document.getElementById('showMoreWrap').style.display = 'none';
                return;
            }

            if (filteredUrls.length === 0 && (searchQuery || selectedTag)) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs match your filter.</p>';
                document.getElementById('showMoreWrap').style.display = 'none';
                return;
            }

            const visible = filteredUrls.slice(0, displayLimit);

            urlsList.innerHTML = visible.map(item => {
                const checked = selectedCodes.has(item.shortCode) ? 'checked' : '';
                let statsHtml = '';
                if (item.stats && item.stats.clicks > 0) {
                    const lastClicked = item.stats.lastClicked ? formatTimeAgo(item.stats.lastClicked) : 'Never';
                    const topReferrer = item.stats.topReferrer || 'Direct';
                    const topCountry = item.stats.topCountry || 'Unknown';
                    const topCity = item.stats.topCity || 'Unknown';
                    statsHtml = '<div class="url-stats">' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.barChart} Clicks:</span> ' + item.stats.clicks + '</div>' +
                            '<div class="stat-item"><span class="stat-label">${icons.clock} Last:</span> ' + lastClicked + '</div>' +
                        '</div>' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.globe} Top Country:</span> ' + topCountry + '</div>' +
                            '<div class="stat-item"><span class="stat-label">${icons.mapPin} Top City:</span> ' + topCity + '</div>' +
                        '</div>' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.mapPin} Top Referrer:</span> ' + topReferrer + '</div>' +
                        '</div>' +
                        '<button class="log-toggle-btn" type="button" onclick="toggleClickLog(\\'' + item.shortCode + '\\', this)">${icons.list} <span>View recent hits</span></button>' +
                        '<div class="click-log" id="clicklog-' + item.shortCode + '" style="display:none"></div>' +
                    '</div>';
                }

                const createdHtml = item.createdAt
                    ? '<div class="url-meta">${icons.calendar} ' + formatDate(item.createdAt) + '</div>'
                    : '';

                const titleDisplay = item.title
                    ? '<span class="url-title-text">' + escapeHtml(item.title) + '</span>'
                    : '<span class="url-title-text no-title">No title</span>';

                const titleHtml = '<div class="url-title" id="title-' + item.shortCode + '">${icons.tag} ' + titleDisplay +
                    ' <button class="title-edit-btn" onclick="startTitleEdit(\\'' + item.shortCode + '\\', ' + (item.title ? '\\'' + escapeAttr(item.title) + '\\'' : 'null') + ')" title="Edit title">${icons.edit}</button>' +
                    '</div>';

                const itemTags = item.tags || [];
                const tagsHtml = '<div class="tag-chips" id="tags-' + item.shortCode + '">' +
                    itemTags.map(t => '<span class="tag-chip" onclick="filterByTag(\\'' + escapeAttr(t) + '\\')">' + escapeHtml(t) + '</span>').join('') +
                    ' <span class="tag-chip" onclick="startTagEdit(\\'' + item.shortCode + '\\')" title="Edit tags" style="border-style:dashed;">${icons.edit} tags</span>' +
                    '</div>';

                return '<div class="url-item"><div class="url-item-row">' +
                    '<input type="checkbox" class="url-checkbox" data-code="' + item.shortCode + '" ' + checked + ' onchange="toggleSelect(\\'' + item.shortCode + '\\', this.checked)">' +
                    '<div class="url-item-content">' +
                        '<div class="url-header">' +
                            '<div class="short-url-row" id="row-' + item.shortCode + '">' +
                                '<a href="/' + item.shortCode + '" class="short-url" target="_blank">/' + item.shortCode + '</a>' +
                                '<button class="edit-btn icon-btn" onclick="startEdit(\\'' + item.shortCode + '\\')" title="Edit short code">${icons.edit}</button>' +
                            '</div>' +
                            '<button class="copy-btn icon-btn" onclick="copyUrl(\\'' + item.shortCode + '\\', this)">${icons.copy} Copy</button>' +
                            '<button class="copy-btn icon-btn" onclick="openQrModalForUrl(\\'' + '${CANONICAL_DOMAIN}' + '/' + item.shortCode + '\\')" title="Generate QR code">${icons.qrCode} QR</button>' +
                        '</div>' +
                        titleHtml +
                        tagsHtml +
                        '<div class="long-url">' + escapeHtml(item.url) + '</div>' +
                        createdHtml +
                        statsHtml +
                        '<button class="delete-btn icon-btn" onclick="deleteUrl(\\'' + item.shortCode + '\\')">${icons.trash}</button>' +
                    '</div>' +
                '</div></div>';
            }).join('');

            const remaining = filteredUrls.length - displayLimit;
            const wrap = document.getElementById('showMoreWrap');
            if (remaining > 0) {
                wrap.style.display = 'block';
                document.getElementById('showMoreLabel').textContent = 'Show more (' + remaining + ' remaining)';
            } else {
                wrap.style.display = 'none';
            }
        }

        function showMore() {
            displayLimit += PAGE_SIZE;
            renderList();
        }

        function toggleSelect(code, checked) {
            if (checked) selectedCodes.add(code); else selectedCodes.delete(code);
            updateBulkBar();
        }

        function updateBulkBar() {
            const bar = document.getElementById('bulkBar');
            if (selectedCodes.size > 0) {
                bar.classList.add('active');
                document.getElementById('selectedCount').textContent = selectedCodes.size + ' selected';
            } else {
                bar.classList.remove('active');
            }
        }

        function clearSelection() {
            selectedCodes.clear();
            document.getElementById('selectAll').checked = false;
            renderList();
            updateBulkBar();
        }

        async function bulkDelete() {
            if (selectedCodes.size === 0) return;
            if (!confirm('Delete ' + selectedCodes.size + ' short URL(s)?')) return;
            try {
                const response = await fetch('/admin/bulk-delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ codes: Array.from(selectedCodes) })
                });
                if (response.ok) {
                    const data = await response.json();
                    allUrls = allUrls.filter(u => !selectedCodes.has(u.shortCode));
                    selectedCodes.clear();
                    document.getElementById('selectAll').checked = false;
                    document.getElementById('urlCount').textContent = allUrls.length;
                    const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                    document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
                    applySearch();
                    showMessage('message', data.deleted + ' URL(s) deleted', 'success');
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    showMessage('message', data.error || 'Bulk delete failed', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        }

        function startEdit(shortCode) {
            const row = document.getElementById('row-' + shortCode);
            row.innerHTML = '<div class="edit-inline">' +
                '<span style="color:var(--color-text-muted);font-size:14px">/</span>' +
                '<input type="text" id="editInput-' + shortCode + '" value="' + shortCode + '" maxlength="20">' +
                '<button class="save-edit-btn icon-btn" onclick="saveEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('editInput-' + shortCode);
            inp.focus();
            inp.select();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveEdit(oldCode) {
            const newCode = document.getElementById('editInput-' + oldCode).value.trim();
            if (!newCode || newCode === oldCode) { renderList(); return; }
            try {
                const response = await fetch('/admin/edit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ oldCode, newCode })
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage('message', 'Short code changed: /' + oldCode + ' → /' + newCode, 'success');
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Edit failed', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        function startTitleEdit(shortCode, currentTitle) {
            const el = document.getElementById('title-' + shortCode);
            const val = currentTitle || '';
            el.innerHTML = '<div class="title-edit-inline">' +
                '<input type="text" id="titleInput-' + shortCode + '" value="' + escapeAttr(val) + '" placeholder="Enter a title..." maxlength="200">' +
                '<button class="save-edit-btn icon-btn" onclick="saveTitleEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('titleInput-' + shortCode);
            inp.focus();
            inp.select();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveTitleEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveTitleEdit(shortCode) {
            const newTitle = document.getElementById('titleInput-' + shortCode).value.trim();
            try {
                const response = await fetch('/admin/update-title', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ shortCode, title: newTitle })
                });
                const data = await response.json();
                if (response.ok) {
                    const item = allUrls.find(u => u.shortCode === shortCode);
                    if (item) item.title = newTitle || null;
                    showMessage('message', newTitle ? 'Title updated' : 'Title removed', 'success');
                    applySearch();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to update title', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        function escapeAttr(str) {
            return str.replace(/&/g,'&amp;').replace(/'/g,'&#39;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        }

        function formatTimeAgo(timestamp) {
            const seconds = Math.floor((Date.now() - timestamp) / 1000);
            if (seconds < 60) return seconds + 's ago';
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return minutes + 'm ago';
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return hours + 'h ago';
            const days = Math.floor(hours / 24);
            return days + 'd ago';
        }

        function formatDate(ts) {
            const d = new Date(ts);
            const mon = d.toLocaleString('default', { month: 'short' });
            return mon + ' ' + d.getDate() + ', ' + d.getFullYear();
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        async function toggleClickLog(shortCode, btn) {
            const container = document.getElementById('clicklog-' + shortCode);
            if (!container) return;

            const nowOpen = container.style.display === 'none';
            container.style.display = nowOpen ? 'block' : 'none';
            btn.querySelector('span').textContent = nowOpen ? 'Hide recent hits' : 'View recent hits';
            if (!nowOpen || container.dataset.loaded === '1') return;

            container.innerHTML = '<div class="log-loading">Loading…</div>';
            try {
                const response = await fetch('/admin/clicklog/' + shortCode, { headers: { 'Authorization': authToken } });
                const data = await response.json();
                const log = data.log || [];
                if (log.length === 0) {
                    container.innerHTML = '<div class="log-empty">No recent hits recorded.</div>';
                } else {
                    const cappedNote = log.length >= ${CLICK_LOG_LIMIT}
                        ? '<div class="log-empty">Showing the ${CLICK_LOG_LIMIT} most recent hits.</div>'
                        : '';
                    container.innerHTML = cappedNote + log.map(entry => {
                        const when = formatTimeAgo(entry.timestamp);
                        const full = new Date(entry.timestamp).toLocaleString();
                        const referrer = entry.referrer === 'Direct' ? 'Direct' : escapeHtml(entry.referrer);
                        const location = entry.city ? entry.city + (entry.region ? ', ' + entry.region : '') : '';
                        return '<div class="log-entry">' +
                            '<span class="log-time" title="' + escapeAttr(full) + '">' + when + '</span>' +
                            '<span class="log-country">' + escapeHtml(entry.country || 'Unknown') + '</span>' +
                            (location ? '<span class="log-city">' + escapeHtml(location) + '</span>' : '') +
                            '<span class="log-referrer">' + referrer + '</span>' +
                        '</div>';
                    }).join('');
                }
                container.dataset.loaded = '1';
            } catch (err) {
                container.innerHTML = '<div class="log-empty">Failed to load recent hits.</div>';
            }
        }

        async function copyUrl(shortCode, button) {
            const fullUrl = '${CANONICAL_DOMAIN}' + '/' + shortCode;
            try {
                await navigator.clipboard.writeText(fullUrl);
                const orig = button.innerHTML;
                button.innerHTML = '${icons.check} Copied!';
                button.classList.add('copied');
                setTimeout(() => { button.innerHTML = orig; button.classList.remove('copied'); }, 2000);
            } catch (err) {
                showMessage('message', 'Failed to copy to clipboard', 'error');
            }
        }

        async function deleteUrl(shortCode) {
            if (!confirm('Delete short URL /' + shortCode + '?')) return;
            try {
                const response = await fetch('/admin/delete/' + shortCode, {
                    method: 'DELETE',
                    headers: { 'Authorization': authToken }
                });
                if (response.ok) {
                    allUrls = allUrls.filter(u => u.shortCode !== shortCode);
                    selectedCodes.delete(shortCode);
                    document.getElementById('urlCount').textContent = allUrls.length;
                    const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                    document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
                    applySearch();
                    showMessage('message', 'URL deleted successfully', 'success');
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    showMessage('message', data.error || 'Failed to delete URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        }

        function logout() {
            authToken = '';
            localStorage.removeItem('adminToken');
            document.getElementById('adminSection').classList.remove('active');
            document.getElementById('authSection').classList.add('active');
            document.getElementById('password').value = '';
        }

        function showMessage(elementId, text, type) {
            const messageEl = document.getElementById(elementId);
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            setTimeout(() => { messageEl.className = 'message'; }, 5000);
        }

        function startTagEdit(shortCode) {
            const el = document.getElementById('tags-' + shortCode);
            const item = allUrls.find(u => u.shortCode === shortCode);
            const currentTags = (item && item.tags) ? item.tags.join(', ') : '';
            el.innerHTML = '<div class="tag-input-inline">' +
                '<input type="text" id="tagInput-' + shortCode + '" value="' + escapeAttr(currentTags) + '" placeholder="tag1, tag2, ...">' +
                '<button class="save-edit-btn icon-btn" onclick="saveTagEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('tagInput-' + shortCode);
            inp.focus();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveTagEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveTagEdit(shortCode) {
            const raw = document.getElementById('tagInput-' + shortCode).value;
            const tags = raw ? [...new Set(raw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean))] : [];
            try {
                const response = await fetch('/admin/update-tags', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ shortCode, tags })
                });
                const data = await response.json();
                if (response.ok) {
                    const item = allUrls.find(u => u.shortCode === shortCode);
                    if (item) item.tags = tags;
                    showMessage('message', 'Tags updated', 'success');
                    applySearch();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to update tags', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        async function exportCsv() {
            try {
                const response = await fetch('/admin/export', {
                    headers: { 'Authorization': authToken }
                });
                if (!response.ok) {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', 'Export failed', 'error'); return;
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'urls-export.csv';
                document.body.appendChild(a); a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                showMessage('message', 'Export failed', 'error');
            }
        }

        function toggleUpload() {
            const area = document.getElementById('uploadArea');
            area.classList.toggle('visible');
            if (!area.classList.contains('visible')) {
                document.getElementById('uploadProgress').textContent = '';
                document.getElementById('csvFile').value = '';
            }
        }

        async function handleCsvUpload(file) {
            if (!file) return;
            const progress = document.getElementById('uploadProgress');
            progress.textContent = 'Reading file...';

            try {
                const text = await file.text();
                const lines = text.split(/\\r?\\n/).filter(l => l.trim());
                if (lines.length === 0) { progress.textContent = 'File is empty.'; return; }

                // Detect header row (starts with common column names, not a URL)
                const firstLine = lines[0].trim();
                const hasHeader = /^(url|shortcode|title|tags|link)\\b/i.test(firstLine) || (/^"?(url|shortcode|title|tags|link)/i.test(firstLine));
                const dataLines = hasHeader ? lines.slice(1) : lines;

                const urls = dataLines.map(line => {
                    const parts = parseCSVLine(line);
                    if (parts.length === 1) return { url: parts[0].trim() };
                    return {
                        url: parts[0].trim(),
                        title: parts[1] ? parts[1].trim() : null,
                        tags: parts[2] ? parts[2].split(';').map(t => t.trim()).filter(Boolean) : [],
                    };
                }).filter(u => u.url);

                if (urls.length === 0) { progress.textContent = 'No valid URLs found.'; return; }

                progress.textContent = 'Uploading ' + urls.length + ' URL(s)...';

                const response = await fetch('/admin/bulk-create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ urls })
                });

                if (response.ok) {
                    const data = await response.json();
                    const created = data.results.filter(r => r.shortCode).length;
                    const failed = data.results.filter(r => r.error).length;
                    progress.textContent = created + ' URL(s) created' + (failed ? ', ' + failed + ' failed' : '') + '.';
                    document.getElementById('csvFile').value = '';
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    progress.textContent = data.error || 'Upload failed.';
                }
            } catch (error) {
                progress.textContent = 'Error reading file.';
            }
        }

        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (inQuotes) {
                    if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
                    else if (ch === '"') { inQuotes = false; }
                    else { current += ch; }
                } else {
                    if (ch === '"') { inQuotes = true; }
                    else if (ch === ',') { result.push(current); current = ''; }
                    else { current += ch; }
                }
            }
            result.push(current);
            return result;
        }
    </script>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------
function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

function checkPassword(password, correctPassword) {
  return password === correctPassword;
}

function verifyApiKey(apiKey, correctApiKey) {
  return apiKey && correctApiKey && apiKey === correctApiKey;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    },
  });
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

// ---------------------------------------------------------------------------
// KV helpers – stores JSON {url, title, createdAt} with backward compat for plain strings
// ---------------------------------------------------------------------------
function parseUrlValue(raw) {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj.url === 'string') return obj;
  } catch (_) {
    // legacy plain-string value
  }
  return { url: raw, title: null, tags: [], createdAt: null };
}

function serializeUrlValue(url, title, tags) {
  return JSON.stringify({ url, title: title || null, tags: tags || [], createdAt: Date.now() });
}

function sanitizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const cleaned = [...new Set(tags.map(t => t.trim().toLowerCase()).filter(Boolean))];
  if (cleaned.length > 10) return null;
  if (cleaned.some(t => t.length > 50)) return null;
  return cleaned;
}

// ---------------------------------------------------------------------------
// Click Tracking Functions
// ---------------------------------------------------------------------------
async function trackClick(env, shortCode, request) {
  try {
    const statsKey = 'stats:' + shortCode;
    const existingStats = await env.URLS.get(statsKey);

    let stats = existingStats ? JSON.parse(existingStats) : {
      clicks: 0,
      referrers: {},
      countries: {},
      cities: {}
    };
    if (!stats.cities) stats.cities = {}; // back-compat with stats saved before city tracking

    stats.clicks = (stats.clicks || 0) + 1;
    stats.lastClicked = Date.now();

    const referrer = request.headers.get('Referer') || 'Direct';
    const referrerDomain = referrer === 'Direct' ? 'Direct' : new URL(referrer).hostname;
    stats.referrers[referrerDomain] = (stats.referrers[referrerDomain] || 0) + 1;

    // request.cf carries Cloudflare's edge geolocation for this request -
    // country, region (state/province) and city, all available on every
    // plan. No IP address is read or stored anywhere here.
    const cf = request.cf || {};
    const country = cf.country || request.headers.get('CF-IPCountry') || 'Unknown';
    const region = cf.region || '';
    const city = cf.city || '';
    stats.countries[country] = (stats.countries[country] || 0) + 1;

    const cityLabel = city ? (city + (region ? ', ' + region : '')) : 'Unknown';
    stats.cities[cityLabel] = (stats.cities[cityLabel] || 0) + 1;

    await env.URLS.put(statsKey, JSON.stringify(stats));

    const logKey = 'clicklog:' + shortCode;
    const existingLog = await env.URLS.get(logKey);
    const log = existingLog ? JSON.parse(existingLog) : [];
    log.unshift({ timestamp: stats.lastClicked, referrer, country, region, city });
    if (log.length > CLICK_LOG_LIMIT) log.length = CLICK_LOG_LIMIT;
    await env.URLS.put(logKey, JSON.stringify(log));
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

async function getClickLog(env, shortCode) {
  try {
    const logKey = 'clicklog:' + shortCode;
    const data = await env.URLS.get(logKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting click log:', error);
    return [];
  }
}

async function getStats(env, shortCode) {
  try {
    const statsKey = 'stats:' + shortCode;
    const statsData = await env.URLS.get(statsKey);

    if (!statsData) {
      return { clicks: 0, lastClicked: null, topReferrer: null, topCountry: null, topCity: null, referrers: {}, countries: {}, cities: {} };
    }

    const stats = JSON.parse(statsData);

    const topReferrer = Object.keys(stats.referrers || {})
      .sort((a, b) => stats.referrers[b] - stats.referrers[a])[0] || null;

    const topCountry = Object.keys(stats.countries || {})
      .sort((a, b) => stats.countries[b] - stats.countries[a])[0] || null;

    const topCity = Object.keys(stats.cities || {})
      .sort((a, b) => stats.cities[b] - stats.cities[a])[0] || null;

    return {
      clicks: stats.clicks || 0,
      lastClicked: stats.lastClicked || null,
      topReferrer,
      topCountry,
      topCity,
      referrers: stats.referrers || {},
      countries: stats.countries || {},
      cities: stats.cities || {}
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return { clicks: 0, lastClicked: null, topReferrer: null, topCountry: null, topCity: null, referrers: {}, countries: {}, cities: {} };
  }
}

// ---------------------------------------------------------------------------
// Admin Handlers
// ---------------------------------------------------------------------------
async function handleAdmin(request, env, path) {
  if (path === '/admin' || path === '/admin/') {
    return htmlResponse(adminHtml);
  }

  if (path === '/admin/guide' || path === '/admin/guide/') {
    return htmlResponse(guideHtml);
  }

  if (path === '/admin/login' && request.method === 'POST') {
    return handleLogin(request, env);
  }

  const authToken = request.headers.get('Authorization');
  if (!verifyAuth(authToken, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  if (path === '/admin/create' && request.method === 'POST') {
    return handleCreate(request, env);
  }

  if (path === '/admin/export' && request.method === 'GET') {
    return handleExport(env);
  }

  if (path === '/admin/list' && request.method === 'GET') {
    return handleList(env);
  }

  if (path.startsWith('/admin/stats/')) {
    const shortCode = path.split('/admin/stats/')[1];
    return handleGetStats(env, shortCode);
  }

  if (path.startsWith('/admin/clicklog/')) {
    const shortCode = path.split('/admin/clicklog/')[1];
    return handleGetClickLog(env, shortCode);
  }

  if (path.startsWith('/admin/delete/') && request.method === 'DELETE') {
    const shortCode = path.split('/admin/delete/')[1];
    return handleDelete(env, shortCode);
  }

  if (path === '/admin/bulk-delete' && request.method === 'POST') {
    return handleBulkDelete(request, env);
  }

  if (path === '/admin/edit' && request.method === 'POST') {
    return handleEditShortCode(request, env);
  }

  if (path === '/admin/update-title' && request.method === 'POST') {
    return handleUpdateTitle(request, env);
  }

  if (path === '/admin/update-tags' && request.method === 'POST') {
    return handleUpdateTags(request, env);
  }

  if (path === '/admin/bulk-create' && request.method === 'POST') {
    return handleBulkCreate(request, env);
  }

  if (path === '/admin/api-key' && request.method === 'GET') {
    return jsonResponse({ apiKey: env.API_KEY || '' });
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleLogin(request, env) {
  try {
    const { password } = await request.json();

    if (!password) {
      return jsonResponse({ error: 'Password required' }, 400);
    }

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';

    if (checkPassword(password, correctPassword)) {
      const token = btoa(password + ':' + Date.now());
      return jsonResponse({ success: true, token });
    }

    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

function verifyAuth(token, env) {
  if (!token) return false;

  try {
    const decoded = atob(token);
    const lastColon = decoded.lastIndexOf(':');
    if (lastColon === -1) return false;
    const password = decoded.substring(0, lastColon);
    const timestamp = decoded.substring(lastColon + 1);

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';
    if (!checkPassword(password, correctPassword)) {
      return false;
    }

    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (tokenAge > maxAge) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function handleGetStats(env, shortCode) {
  const stats = await getStats(env, shortCode);
  return jsonResponse(stats);
}

async function handleGetClickLog(env, shortCode) {
  const log = await getClickLog(env, shortCode);
  return jsonResponse({ log });
}

async function handleCreate(request, env) {
  try {
    const { url, title, shortCode, tags } = await request.json();

    if (!url) {
      return jsonResponse({ error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ error: 'Invalid URL format. URL must start with http:// or https://' }, 400);
    }

    const cleanTags = sanitizeTags(tags);
    if (cleanTags === null) {
      return jsonResponse({ error: 'Too many tags (max 10) or tag too long (max 50 chars)' }, 400);
    }

    let code = shortCode;
    if (code) {
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ error: 'Short code already exists' }, 409);
      }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({
          error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
        }, 400);
      }
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    await env.URLS.put(code, serializeUrlValue(url, title, cleanTags));

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      title: title || null,
      tags: cleanTags,
      shortUrl: CANONICAL_DOMAIN + '/' + code,
    });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleList(env) {
  try {
    const list = await env.URLS.list();
    const urls = await Promise.all(
      list.keys
        .filter(key => !key.name.startsWith('stats:') && !key.name.startsWith('clicklog:'))
        .map(async (key) => {
          const raw = await env.URLS.get(key.name);
          const parsed = parseUrlValue(raw);
          return {
            shortCode: key.name,
            url: parsed.url,
            title: parsed.title || null,
            tags: parsed.tags || [],
            createdAt: parsed.createdAt,
          };
        })
    );

    // Sort newest first (entries without createdAt go to the end)
    urls.sort((a, b) => {
      if (a.createdAt && b.createdAt) return b.createdAt - a.createdAt;
      if (a.createdAt) return -1;
      if (b.createdAt) return 1;
      return 0;
    });

    return jsonResponse({ urls });
  } catch (error) {
    return jsonResponse({ error: 'Failed to list URLs' }, 500);
  }
}

async function handleDelete(env, shortCode) {
  if (!shortCode) {
    return jsonResponse({ error: 'Short code required' }, 400);
  }

  const raw = await env.URLS.get(shortCode);
  if (!raw) {
    return jsonResponse({ error: 'Short URL not found' }, 404);
  }

  await env.URLS.delete(shortCode);
  await env.URLS.delete('stats:' + shortCode);
  await env.URLS.delete('clicklog:' + shortCode);
  return jsonResponse({ success: true });
}

async function handleBulkDelete(request, env) {
  try {
    const { codes } = await request.json();
    if (!Array.isArray(codes) || codes.length === 0) {
      return jsonResponse({ error: 'No codes provided' }, 400);
    }

    let deleted = 0;
    await Promise.all(codes.map(async (code) => {
      const raw = await env.URLS.get(code);
      if (raw) {
        await env.URLS.delete(code);
        await env.URLS.delete('stats:' + code);
        await env.URLS.delete('clicklog:' + code);
        deleted++;
      }
    }));

    return jsonResponse({ success: true, deleted });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleEditShortCode(request, env) {
  try {
    const { oldCode, newCode } = await request.json();

    if (!oldCode || !newCode) {
      return jsonResponse({ error: 'Both oldCode and newCode are required' }, 400);
    }

    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(newCode)) {
      return jsonResponse({
        error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
      }, 400);
    }

    const raw = await env.URLS.get(oldCode);
    if (!raw) {
      return jsonResponse({ error: 'Original short code not found' }, 404);
    }

    const existingNew = await env.URLS.get(newCode);
    if (existingNew) {
      return jsonResponse({ error: 'New short code already exists' }, 409);
    }

    // Copy URL data to new key
    await env.URLS.put(newCode, raw);

    // Copy stats if they exist
    const statsKey = 'stats:' + oldCode;
    const statsData = await env.URLS.get(statsKey);
    if (statsData) {
      await env.URLS.put('stats:' + newCode, statsData);
      await env.URLS.delete(statsKey);
    }

    // Copy click log if it exists
    const logKey = 'clicklog:' + oldCode;
    const logData = await env.URLS.get(logKey);
    if (logData) {
      await env.URLS.put('clicklog:' + newCode, logData);
      await env.URLS.delete(logKey);
    }

    // Delete old key
    await env.URLS.delete(oldCode);

    return jsonResponse({ success: true, oldCode, newCode });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleUpdateTitle(request, env) {
  try {
    const { shortCode, title } = await request.json();

    if (!shortCode) {
      return jsonResponse({ error: 'shortCode is required' }, 400);
    }

    const raw = await env.URLS.get(shortCode);
    if (!raw) {
      return jsonResponse({ error: 'Short code not found' }, 404);
    }

    const parsed = parseUrlValue(raw);
    parsed.title = title || null;
    if (!parsed.createdAt) parsed.createdAt = Date.now();

    await env.URLS.put(shortCode, JSON.stringify(parsed));

    return jsonResponse({ success: true, shortCode, title: parsed.title });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleUpdateTags(request, env) {
  try {
    const { shortCode, tags } = await request.json();

    if (!shortCode) {
      return jsonResponse({ error: 'shortCode is required' }, 400);
    }

    const raw = await env.URLS.get(shortCode);
    if (!raw) {
      return jsonResponse({ error: 'Short code not found' }, 404);
    }

    const parsed = parseUrlValue(raw);
    const cleanTags = sanitizeTags(tags);
    if (cleanTags === null) {
      return jsonResponse({ error: 'Too many tags (max 10) or tag too long (max 50 chars)' }, 400);
    }
    parsed.tags = cleanTags;
    if (!parsed.createdAt) parsed.createdAt = Date.now();

    await env.URLS.put(shortCode, JSON.stringify(parsed));

    return jsonResponse({ success: true, shortCode, tags: parsed.tags });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleExport(env) {
  try {
    const list = await env.URLS.list();
    const urls = await Promise.all(
      list.keys
        .filter(key => !key.name.startsWith('stats:') && !key.name.startsWith('clicklog:'))
        .map(async (key) => {
          const raw = await env.URLS.get(key.name);
          const parsed = parseUrlValue(raw);
          return {
            shortCode: key.name,
            url: parsed.url,
            title: parsed.title || '',
            tags: (parsed.tags || []).join(';'),
            createdAt: parsed.createdAt ? new Date(parsed.createdAt).toISOString() : '',
          };
        })
    );

    const header = 'shortCode,url,title,tags,createdAt';
    const rows = urls.map(u => {
      const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
      return [esc(u.shortCode), esc(u.url), esc(u.title), esc(u.tags), esc(u.createdAt)].join(',');
    });
    const csv = header + '\n' + rows.join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="urls-export.csv"',
      },
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to export URLs' }, 500);
  }
}

async function handleBulkCreate(request, env) {
  try {
    const { urls } = await request.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return jsonResponse({ error: 'urls array is required' }, 400);
    }

    if (urls.length > 500) {
      return jsonResponse({ error: 'Maximum 500 URLs per batch' }, 400);
    }

    const results = [];
    for (const entry of urls) {
      const longUrl = typeof entry === 'string' ? entry : entry.url;
      const title = typeof entry === 'object' ? (entry.title || null) : null;
      const rawTags = typeof entry === 'object' && Array.isArray(entry.tags) ? entry.tags : [];
      const cleanTags = sanitizeTags(rawTags);

      if (!longUrl || !isValidUrl(longUrl)) {
        results.push({ url: longUrl || '', error: 'Invalid URL' });
        continue;
      }

      if (cleanTags === null) {
        results.push({ url: longUrl, error: 'Too many tags or tag too long' });
        continue;
      }

      let code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }

      if (await env.URLS.get(code)) {
        results.push({ url: longUrl, error: 'Failed to generate unique short code' });
        continue;
      }

      await env.URLS.put(code, serializeUrlValue(longUrl, title, cleanTags));
      results.push({ shortCode: code, url: longUrl, title, tags: cleanTags });
    }

    return jsonResponse({ success: true, results });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

// ---------------------------------------------------------------------------
// API Handlers
// ---------------------------------------------------------------------------
async function handleApi(request, env, path) {
  if (path === '/api/shorten' && request.method === 'POST') {
    return handleApiShorten(request, env);
  }

  if (path === '/api/peek' && request.method === 'GET') {
    return handleApiPeek(request);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleApiShorten(request, env) {
  try {
    const apiKey = request.headers.get('X-API-Key');
    const correctApiKey = env.API_KEY;

    if (!verifyApiKey(apiKey, correctApiKey)) {
      return jsonResponse({
        success: false,
        error: 'Invalid API key'
      }, 401);
    }

    const { url, title, shortCode } = await request.json();

    if (!url) {
      return jsonResponse({ success: false, error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ success: false, error: 'Invalid URL format. URL must start with http:// or https://' }, 400);
    }

    let code = shortCode;
    if (code) {
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ success: false, error: 'Short code already exists' }, 409);
      }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({
          success: false,
          error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
        }, 400);
      }
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    await env.URLS.put(code, serializeUrlValue(url, title));

    const shortUrl = CANONICAL_DOMAIN + '/' + code;

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      title: title || null,
      shortUrl,
    });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Invalid request', message: error.message }, 400);
  }
}

// ---------------------------------------------------------------------------
// API: GET /api/peek?url= — follow redirect chain server-side
// ---------------------------------------------------------------------------
async function handleApiPeek(request) {
  try {
    const requestUrl = new URL(request.url);
    const targetUrl = requestUrl.searchParams.get('url');
    if (!targetUrl) {
      return jsonResponse({ success: false, error: 'url parameter is required' }, 400);
    }

    let decodedUrl;
    try { decodedUrl = decodeURIComponent(targetUrl); } catch(_) { decodedUrl = targetUrl; }

    if (!isValidUrl(decodedUrl)) {
      return jsonResponse({ success: false, error: 'Invalid URL. Must start with http:// or https://' }, 400);
    }

    const MAX_HOPS = 10;
    const chain = [];
    const seen = new Set();
    let currentUrl = decodedUrl;
    const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

    for (let hop = 0; hop < MAX_HOPS; hop++) {
      if (seen.has(currentUrl)) {
        chain.push({ url: currentUrl, status: 0, note: 'loop' });
        break;
      }
      seen.add(currentUrl);

      let response;
      try {
        response = await fetch(currentUrl, {
          method: 'GET',
          redirect: 'manual',
          headers: {
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
        });
      } catch (fetchErr) {
        chain.push({ url: currentUrl, status: 0, note: 'fetch_error' });
        return jsonResponse({ success: false, error: 'Network error: ' + fetchErr.message, chain });
      }

      const status = response.status;
      if (response.body) { try { await response.body.cancel(); } catch(_) {} }
      chain.push({ url: currentUrl, status });

      if (status >= 300 && status < 400) {
        const location = response.headers.get('Location');
        if (!location) break;
        let nextUrl;
        try { nextUrl = new URL(location, currentUrl).toString(); } catch(_) { break; }
        const proto = new URL(nextUrl).protocol;
        if (proto !== 'http:' && proto !== 'https:') {
          chain.push({ url: nextUrl, status: 0, note: 'non_http' });
          break;
        }
        currentUrl = nextUrl;
      } else {
        break;
      }
    }

    const last = chain[chain.length - 1];
    if (last && last.status >= 300 && last.status < 400) {
      return jsonResponse({ success: false, error: 'Too many redirects (limit: ' + MAX_HOPS + ')', chain });
    }
    return jsonResponse({ success: true, finalUrl: last ? last.url : decodedUrl, chain });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Internal error: ' + error.message }, 500);
  }
}

// ---------------------------------------------------------------------------
// Redirect Handler with Click Tracking
// ---------------------------------------------------------------------------
async function handleRedirect(env, shortCode, request) {
  const raw = await env.URLS.get(shortCode);

  if (!raw) {
    const html = '<!DOCTYPE html><html><head><title>Not Found</title><style>body{font-family:Inter,sans-serif;max-width:600px;margin:100px auto;text-align:center;color:#353535;}h1{color:#e73b42;}</style></head><body><h1>404 - Short URL Not Found</h1><p>The short URL "/' + shortCode + '" does not exist.</p><p><a href="/" style="color:#e73b42;">Go to home</a></p></body></html>';
    return htmlResponse(html, 404);
  }

  const parsed = parseUrlValue(raw);
  await trackClick(env, shortCode, request);
  return Response.redirect(parsed.url, 302);
}

// ---------------------------------------------------------------------------
// Main Worker
// ---------------------------------------------------------------------------
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        },
      });
    }

    // /clean and /admin always live on chom.pm now; chmp.me keeps serving the
    // homepage/subdomain directory as before. 307 preserves method + body for
    // any direct API calls still pointed at the old domain.
    if (url.hostname === 'chmp.me' && (path === '/clean' || path === '/admin' || path.startsWith('/admin/'))) {
      return Response.redirect(CANONICAL_DOMAIN + path + url.search, 307);
    }

    if (FAVICON_ROUTES[path]) {
      const { data, type } = FAVICON_ROUTES[path];
      const bytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
      return new Response(bytes, {
        headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=86400' },
      });
    }

    if (path.startsWith('/admin')) {
      return handleAdmin(request, env, path);
    }

    if (path.startsWith('/api')) {
      return handleApi(request, env, path);
    }

    if (path === '/clean/manifest.json') {
      const manifest = {
        name: 'URL Strip',
        short_name: 'URL Strip',
        description: 'Clean tracking parameters from URLs',
        start_url: '/clean',
        display: 'standalone',
        background_color: '#fdfdfd',
        theme_color: '#e73b42',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      };
      return new Response(JSON.stringify(manifest, null, 2), {
        headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (path === '/manifest.json') {
      const manifest = {
        name: 'chmp.me URL Shortener',
        short_name: 'chmp.me',
        description: 'Fast, simple URL shortener at chmp.me',
        start_url: '/index',
        display: 'standalone',
        background_color: '#fdfdfd',
        theme_color: '#e73b42',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      };
      return new Response(JSON.stringify(manifest, null, 2), {
        headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (path === '/' || path === '/index') {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>chmp.me</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#e73b42">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="chmp.me">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    :root {
      --color-bg: #fdfdfd;
      --color-text: #353535;
      --color-accent: #e73b42;
      --color-accent-hover: #d12d34;
      --color-card-bg: #f5f5f5;
      --color-border: #e0e0e0;
      --color-text-muted: #7d7d7d;
      --color-text-light: #9d9d9d;
      --accent-dim: rgba(231,59,66,0.07);
      --radius: 8px;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #231f1f;
        --color-text: #d9d4d4;
        --color-accent: #ff6b7a;
        --color-accent-hover: #ff8590;
        --color-card-bg: #2b2626;
        --color-border: #3b3636;
        --color-text-muted: #b9b4b4;
        --color-text-light: #948f8f;
        --accent-dim: rgba(255,107,122,0.08);
      }
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 17px;
      -webkit-font-smoothing: antialiased;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      padding: 48px 20px 80px;
      line-height: 1.7;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .header {
      text-align: center;
      margin-bottom: 48px;
    }

    .hero {
      max-width: 540px;
      width: 100%;
      display: block;
      margin: 0 auto;
    }

    .container {
      max-width: 520px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 0.65em;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 12px;
      padding-left: 2px;
    }

    .section-heading {
      margin-bottom: 16px;
      padding-left: 2px;
    }

    .section-heading-title {
      font-size: 0.65em;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 6px;
    }

    .section-heading-sub {
      font-size: 0.85em;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .lab-divider {
      height: 1px;
      background: var(--color-border);
      margin: 26px 0 18px;
    }

    .top-section {
      margin-bottom: 10px;
    }

    .top-section > .accordion,
    .top-section > .card {
      margin-bottom: 8px;
    }

    .top-section > :last-child {
      margin-bottom: 0;
    }

    .card {
      display: flex;
      align-items: center;
      gap: 12px;
      background-color: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: 13px 16px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    @media (prefers-color-scheme: dark) {
      .card:hover {
        box-shadow: 0 4px 12px rgba(255,107,122,0.2);
      }
    }

    .card-body {
      flex: 1;
      min-width: 0;
    }

    .card-name {
      font-size: 0.95em;
      font-weight: 500;
      margin-bottom: 2px;
      color: var(--color-text);
    }

    .card-sub {
      font-size: 0.8em;
      color: var(--color-text-light);
      line-height: 1.45;
    }

    .section-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .accordion {
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      background-color: var(--color-card-bg);
      overflow: hidden;
    }

    .accordion-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 13px 16px;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      line-height: 1.7;
      transition: background-color 0.2s;
    }

    .accordion-trigger:hover,
    .accordion.open .accordion-trigger {
      background-color: var(--accent-dim);
    }

    .accordion-trigger-body {
      flex: 1;
      min-width: 0;
    }

    .accordion-title {
      font-size: 0.95em;
      font-weight: 500;
      margin-bottom: 2px;
      color: var(--color-text);
    }

    .accordion-quip {
      font-size: 0.8em;
      color: var(--color-text-muted);
      font-style: italic;
    }

    .accordion-chevron {
      font-size: 0.65rem;
      color: var(--color-text-light);
      transition: transform 0.25s ease, color 0.15s ease;
      line-height: 1;
      flex-shrink: 0;
    }

    .accordion.open .accordion-chevron {
      transform: rotate(180deg);
      color: var(--color-accent);
    }

    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease;
    }

    .accordion.open .accordion-content {
      max-height: 1200px;
    }

    .accordion-inner {
      padding: 4px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .inner-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 9px 12px;
      border-radius: 6px;
      border: 1px solid var(--color-border);
      transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }

    .inner-card:hover {
      background-color: var(--accent-dim);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    @media (prefers-color-scheme: dark) {
      .inner-card:hover {
        box-shadow: 0 2px 8px rgba(255,107,122,0.15);
      }
    }

    .inner-card-body {
      flex: 1;
      min-width: 0;
    }

    .inner-card-name {
      font-size: 0.82em;
      font-weight: 500;
      margin-bottom: 1px;
      color: var(--color-text);
    }

    .inner-card-sub {
      font-size: 0.68em;
      color: var(--color-text-light);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nested-accordion {
      border-radius: 6px;
      border: 1px solid var(--color-border);
      overflow: hidden;
    }

    .nested-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      color: inherit;
      transition: background-color 0.2s;
    }

    .nested-trigger:hover,
    .nested-accordion.open .nested-trigger {
      background-color: var(--accent-dim);
    }

    .nested-trigger-label {
      font-size: 0.65em;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--color-text-muted);
    }

    .nested-chevron {
      font-size: 0.55rem;
      color: var(--color-text-light);
      transition: transform 0.2s ease, color 0.15s ease;
      flex-shrink: 0;
    }

    .nested-accordion.open .nested-chevron {
      transform: rotate(180deg);
      color: var(--color-accent);
    }

    .nested-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .nested-accordion.open .nested-content {
      max-height: 600px;
    }

    .nested-inner {
      padding: 3px 6px 6px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    footer {
      text-align: center;
      margin-top: 56px;
    }

    footer a {
      font-size: 0.8em;
      color: var(--color-text-light);
      letter-spacing: 0.04em;
      transition: color 0.2s;
    }

    footer a:hover {
      color: var(--color-accent);
    }
  </style>
</head>

<body>

  <header class="header">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/chompchomp/chompme%20index%20dark.jpg">
      <img class="hero" src="https://ik.imagekit.io/chompchomp/chompme%20index%20light.jpg">
    </picture>
  </header>

  <div class="container">

    <div class="top-section">
      <div class="section-label">Chomp Chomp</div>

      <div class="accordion" id="acc-chomp">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-chomp')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Chom.ps</div>
            <div class="accordion-quip">Recipes, stories, and such.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/index.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Home</div>
                <div class="inner-card-sub">chom.ps</div>
              </div>
            </a>
            <a href="https://chom.ps/about.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">About</div>
                <div class="inner-card-sub">Who · What · Why</div>
              </div>
            </a>
            <a href="https://chom.ps/stories.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Stories</div>
                <div class="inner-card-sub">Writing · Essays · Notes</div>
              </div>
            </a>
            <a href="https://chom.ps/recipes.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Recipes</div>
                <div class="inner-card-sub">Recipes · Baking · Cooking</div>
              </div>
            </a>
            <a href="https://chom.ps/lexicon.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Lexicon</div>
                <div class="inner-card-sub">Terms · Definitions · Fragments</div>
              </div>
            </a>
            <a href="https://chom.ps/reading-list.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Reading List</div>
                <div class="inner-card-sub">Books · Essays · References</div>
              </div>
            </a>
            <a href="https://chom.ps/playlists.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Playlists</div>
                <div class="inner-card-sub">Listening · Mood · Sound</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <a href="https://chom.ps/store" class="card">
        <div class="card-body">
          <div class="card-name">Chomp Chomp</div>
          <div class="card-sub">Small batches · Made to order · In small ovens</div>
        </div>
      </a>
    </div>

    <div class="lab-divider"></div>

    <div class="section-heading">
      <div class="section-heading-title">Kitchen Counter</div>
      <div class="section-heading-sub">Bakeware, utensils, and other useful things.</div>
    </div>

    <div class="section-group">

      <div class="accordion" id="acc-everyday">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-everyday')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Measuring Spoons</div>
            <div class="accordion-quip">Small tools, used often.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/tools/index.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Spoon Set</div>
                <div class="inner-card-sub">All the tools</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/color.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Color</div>
                <div class="inner-card-sub">Palettes · Conversions · Contrast</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/convert.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Convert</div>
                <div class="inner-card-sub">Length · Volume · Weight</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/currency.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Currency</div>
                <div class="inner-card-sub">Exchange Rates · ECB</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/random.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Randomness</div>
                <div class="inner-card-sub">Numbers · Dice · Strings</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/text.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Text</div>
                <div class="inner-card-sub">Transform · Sort · Clean</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/time.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Time</div>
                <div class="inner-card-sub">Timestamps · Timezones</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/weather.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Weather</div>
                <div class="inner-card-sub">Temperature · Comfort</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="accordion" id="acc-dev">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-dev')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Spatulas</div>
            <div class="accordion-quip">Stirring, folding, and mixing.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/tools/encode.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Encode</div>
                <div class="inner-card-sub">URI · Base64 · Hash</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/ip.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Whois</div>
                <div class="inner-card-sub">IP · Owner · Location</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/subnet.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Subnet</div>
                <div class="inner-card-sub">CIDR · Network Range</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/json" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">JSON</div>
                <div class="inner-card-sub">Format · Validate · Explore</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="accordion" id="acc-ipsum">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-ipsum')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Mixing Bowls</div>
            <div class="accordion-quip">Words for when you need words.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/tools/ipsum.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Latin &amp; Whatnot</div>
                <div class="inner-card-sub">All the Ipsums · But not Lorem ipsum dolor sit amet</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/baking.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Baking Ipsum</div>
                <div class="inner-card-sub">Southern sayings · Baking wisdom</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/dad-jokes.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Dad Jokes Ipsum</div>
                <div class="inner-card-sub">Normal · Random · Ionesco</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/dante.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Inferno Ipsum</div>
                <div class="inner-card-sub">Dante · Divine Comedy</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/epic.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Epic Ipsum</div>
                <div class="inner-card-sub">Homer · Hesiod</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/nautical.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Nautical Ipsum</div>
                <div class="inner-card-sub">Moby-Dick · Maritime lore</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/philosophy.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Philosophy Ipsum</div>
                <div class="inner-card-sub">&#381;i&#382;ek · Marx · Hegel</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/shakespeare.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Shakespeare Love &amp; Hate</div>
                <div class="inner-card-sub">Declarations · Insults · Collision</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="accordion" id="acc-apps">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-apps')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Spice Rack</div>
            <div class="accordion-quip">Things that do things.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://dl.chmp.me/login" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Chompy DL</div>
                <div class="inner-card-sub">Save the Media (Render)</div>
              </div>
            </a>
            <a href="https://clip.chmp.me/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Clipper</div>
                <div class="inner-card-sub">Save the news</div>
              </div>
            </a>
            <a href="https://cooling.chmp.me/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Cooling</div>
                <div class="inner-card-sub">Not in the oven</div>
              </div>
            </a>
            <a href="https://library.chompchomp.cc/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Library</div>
                <div class="inner-card-sub">Chomp OPAC</div>
              </div>
            </a>
            <a href="https://recipes.chompchomp.cc/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Recipe Box</div>
                <div class="inner-card-sub">IYKYK</div>
              </div>
            </a>
            <a href="https://fly.io/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Send</div>
                <div class="inner-card-sub">The Newsletter Experience (fly.io)</div>
              </div>
            </a>
            <a href="https://summit.chmp.me" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Summit</div>
                <div class="inner-card-sub">It Happens</div>
              </div>
            </a>
            <a href="https://chom.pm/admin" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">URL Shortener</div>
                <div class="inner-card-sub">Share the chmp</div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>

    <div class="lab-divider"></div>

    <div class="section-label">Postscript</div>

    <a href="https://ps.chom.ps" class="card">
      <div class="card-body">
        <div class="card-name">.ps</div>
        <div class="card-sub">Cookies, etc. &hellip; and so on.</div>
      </div>
    </a>

  </div>

  <footer>
    <a href="https://chom.ps">Chomp Chomp chom.ps</a>
  </footer>

  <script>
    function toggleAccordion(id) {
      document.getElementById(id).classList.toggle('open');
    }
    function toggleNested(id) {
      document.getElementById(id).classList.toggle('open');
    }
  </script>

</body>
</html>`;
      return htmlResponse(html);
    }

    if (path === '/clean') {
      return htmlResponse(urlCleanerHtml);
    }

    if (path === '/images') {
      return htmlResponse(imagesHtml);
    }

    const shortCode = path.substring(1);
    if (shortCode) {
      return handleRedirect(env, shortCode, request);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};
