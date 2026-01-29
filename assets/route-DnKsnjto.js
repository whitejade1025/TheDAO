import { r as J, j as P, w as Yf } from "./chunk-JMJ3UQ3L-LOVFmzVH.js";
import {
  S as Xf,
  l as Ka,
  q as Kt,
  t as lo,
  r as di,
  d as uo,
  u as co,
  v as Ga,
  w as Kf,
  x as Hi,
  g as Gf,
  y as Hf,
  z as Ha,
  n as cu,
  A as qf,
  B as Qf,
} from "./QueryClientProvider-B1FlnhcJ.js";
var Zf = class extends Xf {
  constructor(n, e) {
    super(),
      (this.options = e),
      (this.#r = n),
      (this.#i = null),
      (this.#n = Ka()),
      this.bindMethods(),
      this.setOptions(e);
  }
  #r;
  #e = void 0;
  #p = void 0;
  #t = void 0;
  #o;
  #c;
  #n;
  #i;
  #m;
  #f;
  #h;
  #a;
  #l;
  #s;
  #d = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#e.addObserver(this),
      qa(this.#e, this.options) ? this.#u() : this.updateResult(),
      this.#x());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return fo(this.#e, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return fo(this.#e, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    (this.listeners = new Set()),
      this.#v(),
      this.#b(),
      this.#e.removeObserver(this);
  }
  setOptions(n) {
    const e = this.options,
      t = this.#e;
    if (
      ((this.options = this.#r.defaultQueryOptions(n)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof Kt(this.options.enabled, this.#e) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    this.#T(),
      this.#e.setOptions(this.options),
      e._defaulted &&
        !lo(this.options, e) &&
        this.#r
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#e,
            observer: this,
          });
    const r = this.hasListeners();
    r && Qa(this.#e, t, this.options, e) && this.#u(),
      this.updateResult(),
      r &&
        (this.#e !== t ||
          Kt(this.options.enabled, this.#e) !== Kt(e.enabled, this.#e) ||
          di(this.options.staleTime, this.#e) !== di(e.staleTime, this.#e)) &&
        this.#g();
    const i = this.#_();
    r &&
      (this.#e !== t ||
        Kt(this.options.enabled, this.#e) !== Kt(e.enabled, this.#e) ||
        i !== this.#s) &&
      this.#y(i);
  }
  getOptimisticResult(n) {
    const e = this.#r.getQueryCache().build(this.#r, n),
      t = this.createResult(e, n);
    return (
      eh(this, t) &&
        ((this.#t = t), (this.#c = this.options), (this.#o = this.#e.state)),
      t
    );
  }
  getCurrentResult() {
    return this.#t;
  }
  trackResult(n, e) {
    return new Proxy(n, {
      get: (t, r) => (
        this.trackProp(r),
        e?.(r),
        r === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#n.status === "pending" &&
            this.#n.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            )),
        Reflect.get(t, r)
      ),
    });
  }
  trackProp(n) {
    this.#d.add(n);
  }
  getCurrentQuery() {
    return this.#e;
  }
  refetch({ ...n } = {}) {
    return this.fetch({ ...n });
  }
  fetchOptimistic(n) {
    const e = this.#r.defaultQueryOptions(n),
      t = this.#r.getQueryCache().build(this.#r, e);
    return t.fetch().then(() => this.createResult(t, e));
  }
  fetch(n) {
    return this.#u({ ...n, cancelRefetch: n.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#t)
    );
  }
  #u(n) {
    this.#T();
    let e = this.#e.fetch(this.options, n);
    return n?.throwOnError || (e = e.catch(uo)), e;
  }
  #g() {
    this.#v();
    const n = di(this.options.staleTime, this.#e);
    if (co || this.#t.isStale || !Ga(n)) return;
    const t = Kf(this.#t.dataUpdatedAt, n) + 1;
    this.#a = Hi.setTimeout(() => {
      this.#t.isStale || this.updateResult();
    }, t);
  }
  #_() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#e)
        : this.options.refetchInterval) ?? !1
    );
  }
  #y(n) {
    this.#b(),
      (this.#s = n),
      !(
        co ||
        Kt(this.options.enabled, this.#e) === !1 ||
        !Ga(this.#s) ||
        this.#s === 0
      ) &&
        (this.#l = Hi.setInterval(() => {
          (this.options.refetchIntervalInBackground || Gf.isFocused()) &&
            this.#u();
        }, this.#s));
  }
  #x() {
    this.#g(), this.#y(this.#_());
  }
  #v() {
    this.#a && (Hi.clearTimeout(this.#a), (this.#a = void 0));
  }
  #b() {
    this.#l && (Hi.clearInterval(this.#l), (this.#l = void 0));
  }
  createResult(n, e) {
    const t = this.#e,
      r = this.options,
      i = this.#t,
      s = this.#o,
      o = this.#c,
      l = n !== t ? n.state : this.#p,
      { state: u } = n;
    let c = { ...u },
      f = !1,
      d;
    if (e._optimisticResults) {
      const C = this.hasListeners(),
        S = !C && qa(n, e),
        A = C && Qa(n, t, e, r);
      (S || A) && (c = { ...c, ...Hf(u.data, n.options) }),
        e._optimisticResults === "isRestoring" && (c.fetchStatus = "idle");
    }
    let { error: h, errorUpdatedAt: m, status: p } = c;
    d = c.data;
    let g = !1;
    if (e.placeholderData !== void 0 && d === void 0 && p === "pending") {
      let C;
      i?.isPlaceholderData && e.placeholderData === o?.placeholderData
        ? ((C = i.data), (g = !0))
        : (C =
            typeof e.placeholderData == "function"
              ? e.placeholderData(this.#h?.state.data, this.#h)
              : e.placeholderData),
        C !== void 0 && ((p = "success"), (d = Ha(i?.data, C, e)), (f = !0));
    }
    if (e.select && d !== void 0 && !g)
      if (i && d === s?.data && e.select === this.#m) d = this.#f;
      else
        try {
          (this.#m = e.select),
            (d = e.select(d)),
            (d = Ha(i?.data, d, e)),
            (this.#f = d),
            (this.#i = null);
        } catch (C) {
          this.#i = C;
        }
    this.#i && ((h = this.#i), (d = this.#f), (m = Date.now()), (p = "error"));
    const x = c.fetchStatus === "fetching",
      T = p === "pending",
      w = p === "error",
      v = T && x,
      y = d !== void 0,
      b = {
        status: p,
        fetchStatus: c.fetchStatus,
        isPending: T,
        isSuccess: p === "success",
        isError: w,
        isInitialLoading: v,
        isLoading: v,
        data: d,
        dataUpdatedAt: c.dataUpdatedAt,
        error: h,
        errorUpdatedAt: m,
        failureCount: c.fetchFailureCount,
        failureReason: c.fetchFailureReason,
        errorUpdateCount: c.errorUpdateCount,
        isFetched: c.dataUpdateCount > 0 || c.errorUpdateCount > 0,
        isFetchedAfterMount:
          c.dataUpdateCount > l.dataUpdateCount ||
          c.errorUpdateCount > l.errorUpdateCount,
        isFetching: x,
        isRefetching: x && !T,
        isLoadingError: w && !y,
        isPaused: c.fetchStatus === "paused",
        isPlaceholderData: f,
        isRefetchError: w && y,
        isStale: Jo(n, e),
        refetch: this.refetch,
        promise: this.#n,
        isEnabled: Kt(e.enabled, n) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const C = (D) => {
          b.status === "error"
            ? D.reject(b.error)
            : b.data !== void 0 && D.resolve(b.data);
        },
        S = () => {
          const D = (this.#n = b.promise = Ka());
          C(D);
        },
        A = this.#n;
      switch (A.status) {
        case "pending":
          n.queryHash === t.queryHash && C(A);
          break;
        case "fulfilled":
          (b.status === "error" || b.data !== A.value) && S();
          break;
        case "rejected":
          (b.status !== "error" || b.error !== A.reason) && S();
          break;
      }
    }
    return b;
  }
  updateResult() {
    const n = this.#t,
      e = this.createResult(this.#e, this.options);
    if (
      ((this.#o = this.#e.state),
      (this.#c = this.options),
      this.#o.data !== void 0 && (this.#h = this.#e),
      lo(e, n))
    )
      return;
    this.#t = e;
    const t = () => {
      if (!n) return !0;
      const { notifyOnChangeProps: r } = this.options,
        i = typeof r == "function" ? r() : r;
      if (i === "all" || (!i && !this.#d.size)) return !0;
      const s = new Set(i ?? this.#d);
      return (
        this.options.throwOnError && s.add("error"),
        Object.keys(this.#t).some((o) => {
          const a = o;
          return this.#t[a] !== n[a] && s.has(a);
        })
      );
    };
    this.#w({ listeners: t() });
  }
  #T() {
    const n = this.#r.getQueryCache().build(this.#r, this.options);
    if (n === this.#e) return;
    const e = this.#e;
    (this.#e = n),
      (this.#p = n.state),
      this.hasListeners() && (e?.removeObserver(this), n.addObserver(this));
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#x();
  }
  #w(n) {
    cu.batch(() => {
      n.listeners &&
        this.listeners.forEach((e) => {
          e(this.#t);
        }),
        this.#r
          .getQueryCache()
          .notify({ query: this.#e, type: "observerResultsUpdated" });
    });
  }
};
function Jf(n, e) {
  return (
    Kt(e.enabled, n) !== !1 &&
    n.state.data === void 0 &&
    !(n.state.status === "error" && e.retryOnMount === !1)
  );
}
function qa(n, e) {
  return Jf(n, e) || (n.state.data !== void 0 && fo(n, e, e.refetchOnMount));
}
function fo(n, e, t) {
  if (Kt(e.enabled, n) !== !1 && di(e.staleTime, n) !== "static") {
    const r = typeof t == "function" ? t(n) : t;
    return r === "always" || (r !== !1 && Jo(n, e));
  }
  return !1;
}
function Qa(n, e, t, r) {
  return (
    (n !== e || Kt(r.enabled, n) === !1) &&
    (!t.suspense || n.state.status !== "error") &&
    Jo(n, t)
  );
}
function Jo(n, e) {
  return Kt(e.enabled, n) !== !1 && n.isStaleByTime(di(e.staleTime, n));
}
function eh(n, e) {
  return !lo(n.getCurrentResult(), e);
}
var fu = J.createContext(!1),
  th = () => J.useContext(fu);
fu.Provider;
function rh() {
  let n = !1;
  return {
    clearReset: () => {
      n = !1;
    },
    reset: () => {
      n = !0;
    },
    isReset: () => n,
  };
}
var nh = J.createContext(rh()),
  ih = () => J.useContext(nh),
  sh = (n, e) => {
    (n.suspense || n.throwOnError || n.experimental_prefetchInRender) &&
      (e.isReset() || (n.retryOnMount = !1));
  },
  oh = (n) => {
    J.useEffect(() => {
      n.clearReset();
    }, [n]);
  },
  ah = ({
    result: n,
    errorResetBoundary: e,
    throwOnError: t,
    query: r,
    suspense: i,
  }) =>
    n.isError &&
    !e.isReset() &&
    !n.isFetching &&
    r &&
    ((i && n.data === void 0) || qf(t, [n.error, r])),
  lh = (n) => {
    if (n.suspense) {
      const t = (i) => (i === "static" ? i : Math.max(i ?? 1e3, 1e3)),
        r = n.staleTime;
      (n.staleTime = typeof r == "function" ? (...i) => t(r(...i)) : t(r)),
        typeof n.gcTime == "number" && (n.gcTime = Math.max(n.gcTime, 1e3));
    }
  },
  uh = (n, e) => n.isLoading && n.isFetching && !e,
  ch = (n, e) => n?.suspense && e.isPending,
  Za = (n, e, t) =>
    e.fetchOptimistic(n).catch(() => {
      t.clearReset();
    });
function fh(n, e, t) {
  const r = th(),
    i = ih(),
    s = Qf(),
    o = s.defaultQueryOptions(n);
  s.getDefaultOptions().queries?._experimental_beforeQuery?.(o),
    (o._optimisticResults = r ? "isRestoring" : "optimistic"),
    lh(o),
    sh(o, i),
    oh(i);
  const a = !s.getQueryCache().get(o.queryHash),
    [l] = J.useState(() => new e(s, o)),
    u = l.getOptimisticResult(o),
    c = !r && n.subscribed !== !1;
  if (
    (J.useSyncExternalStore(
      J.useCallback(
        (f) => {
          const d = c ? l.subscribe(cu.batchCalls(f)) : uo;
          return l.updateResult(), d;
        },
        [l, c]
      ),
      () => l.getCurrentResult(),
      () => l.getCurrentResult()
    ),
    J.useEffect(() => {
      l.setOptions(o);
    }, [o, l]),
    ch(o, u))
  )
    throw Za(o, l, i);
  if (
    ah({
      result: u,
      errorResetBoundary: i,
      throwOnError: o.throwOnError,
      query: s.getQueryCache().get(o.queryHash),
      suspense: o.suspense,
    })
  )
    throw u.error;
  return (
    s.getDefaultOptions().queries?._experimental_afterQuery?.(o, u),
    o.experimental_prefetchInRender &&
      !co &&
      uh(u, r) &&
      (a ? Za(o, l, i) : s.getQueryCache().get(o.queryHash)?.promise)
        ?.catch(uo)
        .finally(() => {
          l.updateResult();
        }),
    o.notifyOnChangeProps ? u : l.trackResult(u)
  );
}
function hu(n, e) {
  return fh(n, Zf);
}
const hh = "/dao-logo.svg";
function fr(n) {
  if (n === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return n;
}
function du(n, e) {
  (n.prototype = Object.create(e.prototype)),
    (n.prototype.constructor = n),
    (n.__proto__ = e);
}
var Ot = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: { lineHeight: "" },
  },
  Bn = { duration: 0.5, overwrite: !1, delay: 0 },
  ea,
  Ke,
  he,
  Nt = 1e8,
  le = 1 / Nt,
  ho = Math.PI * 2,
  dh = ho / 4,
  ph = 0,
  pu = Math.sqrt,
  mh = Math.cos,
  gh = Math.sin,
  $e = function (e) {
    return typeof e == "string";
  },
  we = function (e) {
    return typeof e == "function";
  },
  gr = function (e) {
    return typeof e == "number";
  },
  ta = function (e) {
    return typeof e > "u";
  },
  sr = function (e) {
    return typeof e == "object";
  },
  pt = function (e) {
    return e !== !1;
  },
  ra = function () {
    return typeof window < "u";
  },
  qi = function (e) {
    return we(e) || $e(e);
  },
  mu =
    (typeof ArrayBuffer == "function" && ArrayBuffer.isView) || function () {},
  tt = Array.isArray,
  _h = /random\([^)]+\)/g,
  yh = /,\s*/g,
  Ja = /(?:-?\.?\d|\.)+/gi,
  gu = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  kn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  $s = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  _u = /[+-]=-?[.\d]+/,
  xh = /[^,'"\[\]\s]+/gi,
  vh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  _e,
  Zt,
  po,
  na,
  Et = {},
  ws = {},
  yu,
  xu = function (e) {
    return (ws = Ln(e, Et)) && yt;
  },
  ia = function (e, t) {
    return console.warn(
      "Invalid property",
      e,
      "set to",
      t,
      "Missing plugin? gsap.registerPlugin()"
    );
  },
  Oi = function (e, t) {
    return !t && console.warn(e);
  },
  vu = function (e, t) {
    return (e && (Et[e] = t) && ws && (ws[e] = t)) || Et;
  },
  Ei = function () {
    return 0;
  },
  bh = { suppressEvents: !0, isStart: !0, kill: !1 },
  hs = { suppressEvents: !0, kill: !1 },
  Th = { suppressEvents: !0 },
  sa = {},
  Vr = [],
  mo = {},
  bu,
  St = {},
  Us = {},
  el = 30,
  ds = [],
  oa = "",
  aa = function (e) {
    var t = e[0],
      r,
      i;
    if ((sr(t) || we(t) || (e = [e]), !(r = (t._gsap || {}).harness))) {
      for (i = ds.length; i-- && !ds[i].targetTest(t); );
      r = ds[i];
    }
    for (i = e.length; i--; )
      (e[i] && (e[i]._gsap || (e[i]._gsap = new Yu(e[i], r)))) ||
        e.splice(i, 1);
    return e;
  },
  sn = function (e) {
    return e._gsap || aa(Bt(e))[0]._gsap;
  },
  Tu = function (e, t, r) {
    return (r = e[t]) && we(r)
      ? e[t]()
      : (ta(r) && e.getAttribute && e.getAttribute(t)) || r;
  },
  mt = function (e, t) {
    return (e = e.split(",")).forEach(t) || e;
  },
  Pe = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  ge = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0;
  },
  En = function (e, t) {
    var r = t.charAt(0),
      i = parseFloat(t.substr(2));
    return (
      (e = parseFloat(e)),
      r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i
    );
  },
  wh = function (e, t) {
    for (var r = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < r; );
    return i < r;
  },
  Ss = function () {
    var e = Vr.length,
      t = Vr.slice(0),
      r,
      i;
    for (mo = {}, Vr.length = 0, r = 0; r < e; r++)
      (i = t[r]),
        i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
  },
  la = function (e) {
    return !!(e._initted || e._startAt || e.add);
  },
  wu = function (e, t, r, i) {
    Vr.length && !Ke && Ss(),
      e.render(t, r, !!(Ke && t < 0 && la(e))),
      Vr.length && !Ke && Ss();
  },
  Su = function (e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + "").match(xh).length < 2
      ? t
      : $e(e)
      ? e.trim()
      : e;
  },
  Cu = function (e) {
    return e;
  },
  Rt = function (e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e;
  },
  Sh = function (e) {
    return function (t, r) {
      for (var i in r)
        i in t || (i === "duration" && e) || i === "ease" || (t[i] = r[i]);
    };
  },
  Ln = function (e, t) {
    for (var r in t) e[r] = t[r];
    return e;
  },
  tl = function n(e, t) {
    for (var r in t)
      r !== "__proto__" &&
        r !== "constructor" &&
        r !== "prototype" &&
        (e[r] = sr(t[r]) ? n(e[r] || (e[r] = {}), t[r]) : t[r]);
    return e;
  },
  Cs = function (e, t) {
    var r = {},
      i;
    for (i in e) i in t || (r[i] = e[i]);
    return r;
  },
  pi = function (e) {
    var t = e.parent || _e,
      r = e.keyframes ? Sh(tt(e.keyframes)) : Rt;
    if (pt(e.inherit))
      for (; t; ) r(e, t.vars.defaults), (t = t.parent || t._dp);
    return e;
  },
  Ch = function (e, t) {
    for (var r = e.length, i = r === t.length; i && r-- && e[r] === t[r]; );
    return r < 0;
  },
  Mu = function (e, t, r, i, s) {
    var o = e[i],
      a;
    if (s) for (a = t[s]; o && o[s] > a; ) o = o._prev;
    return (
      o ? ((t._next = o._next), (o._next = t)) : ((t._next = e[r]), (e[r] = t)),
      t._next ? (t._next._prev = t) : (e[i] = t),
      (t._prev = o),
      (t.parent = t._dp = e),
      t
    );
  },
  Ns = function (e, t, r, i) {
    r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
    var s = t._prev,
      o = t._next;
    s ? (s._next = o) : e[r] === t && (e[r] = o),
      o ? (o._prev = s) : e[i] === t && (e[i] = s),
      (t._next = t._prev = t.parent = null);
  },
  Br = function (e, t) {
    e.parent &&
      (!t || e.parent.autoRemoveChildren) &&
      e.parent.remove &&
      e.parent.remove(e),
      (e._act = 0);
  },
  on = function (e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
      for (var r = e; r; ) (r._dirty = 1), (r = r.parent);
    return e;
  },
  Mh = function (e) {
    for (var t = e.parent; t && t.parent; )
      (t._dirty = 1), t.totalDuration(), (t = t.parent);
    return e;
  },
  go = function (e, t, r, i) {
    return (
      e._startAt &&
      (Ke
        ? e._startAt.revert(hs)
        : (e.vars.immediateRender && !e.vars.autoRevert) ||
          e._startAt.render(t, !0, i))
    );
  },
  kh = function n(e) {
    return !e || (e._ts && n(e.parent));
  },
  rl = function (e) {
    return e._repeat ? zn(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
  },
  zn = function (e, t) {
    var r = Math.floor((e = ge(e / t)));
    return e && r === e ? r - 1 : r;
  },
  Ms = function (e, t) {
    return (
      (e - t._start) * t._ts +
      (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    );
  },
  Bs = function (e) {
    return (e._end = ge(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || le) || 0)
    ));
  },
  Ls = function (e, t) {
    var r = e._dp;
    return (
      r &&
        r.smoothChildTiming &&
        e._ts &&
        ((e._start = ge(
          r._time -
            (e._ts > 0
              ? t / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
        )),
        Bs(e),
        r._dirty || on(r, e)),
      e
    );
  },
  ku = function (e, t) {
    var r;
    if (
      ((t._time ||
        (!t._dur && t._initted) ||
        (t._start < e._time && (t._dur || !t.add))) &&
        ((r = Ms(e.rawTime(), t)),
        (!t._dur || Ui(0, t.totalDuration(), r) - t._tTime > le) &&
          t.render(r, !0)),
      on(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (r = e; r._dp; )
          r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
      e._zTime = -le;
    }
  },
  er = function (e, t, r, i) {
    return (
      t.parent && Br(t),
      (t._start = ge(
        (gr(r) ? r : r || e !== _e ? Ft(e, r, t) : e._time) + t._delay
      )),
      (t._end = ge(
        t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
      )),
      Mu(e, t, "_first", "_last", e._sort ? "_start" : 0),
      _o(t) || (e._recent = t),
      i || ku(e, t),
      e._ts < 0 && Ls(e, e._tTime),
      e
    );
  },
  Au = function (e, t) {
    return (
      (Et.ScrollTrigger || ia("scrollTrigger", t)) &&
      Et.ScrollTrigger.create(t, e)
    );
  },
  Pu = function (e, t, r, i, s) {
    if ((ca(e, t, s), !e._initted)) return 1;
    if (
      !r &&
      e._pt &&
      !Ke &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      bu !== Mt.frame
    )
      return Vr.push(e), (e._lazy = [s, i]), 1;
  },
  Ah = function n(e) {
    var t = e.parent;
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || n(t));
  },
  _o = function (e) {
    var t = e.data;
    return t === "isFromStart" || t === "isStart";
  },
  Ph = function (e, t, r, i) {
    var s = e.ratio,
      o =
        t < 0 ||
        (!t &&
          ((!e._start && Ah(e) && !(!e._initted && _o(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !_o(e))))
          ? 0
          : 1,
      a = e._rDelay,
      l = 0,
      u,
      c,
      f;
    if (
      (a &&
        e._repeat &&
        ((l = Ui(0, e._tDur, t)),
        (c = zn(l, a)),
        e._yoyo && c & 1 && (o = 1 - o),
        c !== zn(e._tTime, a) &&
          ((s = 1 - o), e.vars.repeatRefresh && e._initted && e.invalidate())),
      o !== s || Ke || i || e._zTime === le || (!t && e._zTime))
    ) {
      if (!e._initted && Pu(e, t, i, r, l)) return;
      for (
        f = e._zTime,
          e._zTime = t || (r ? le : 0),
          r || (r = t && !f),
          e.ratio = o,
          e._from && (o = 1 - o),
          e._time = 0,
          e._tTime = l,
          u = e._pt;
        u;

      )
        u.r(o, u.d), (u = u._next);
      t < 0 && go(e, t, r, !0),
        e._onUpdate && !r && At(e, "onUpdate"),
        l && e._repeat && !r && e.parent && At(e, "onRepeat"),
        (t >= e._tDur || t < 0) &&
          e.ratio === o &&
          (o && Br(e, 1),
          !r &&
            !Ke &&
            (At(e, o ? "onComplete" : "onReverseComplete", !0),
            e._prom && e._prom()));
    } else e._zTime || (e._zTime = t);
  },
  Oh = function (e, t, r) {
    var i;
    if (r > t)
      for (i = e._first; i && i._start <= r; ) {
        if (i.data === "isPause" && i._start > t) return i;
        i = i._next;
      }
    else
      for (i = e._last; i && i._start >= r; ) {
        if (i.data === "isPause" && i._start < t) return i;
        i = i._prev;
      }
  },
  jn = function (e, t, r, i) {
    var s = e._repeat,
      o = ge(t) || 0,
      a = e._tTime / e._tDur;
    return (
      a && !i && (e._time *= o / e._dur),
      (e._dur = o),
      (e._tDur = s ? (s < 0 ? 1e10 : ge(o * (s + 1) + e._rDelay * s)) : o),
      a > 0 && !i && Ls(e, (e._tTime = e._tDur * a)),
      e.parent && Bs(e),
      r || on(e.parent, e),
      e
    );
  },
  nl = function (e) {
    return e instanceof ut ? on(e) : jn(e, e._dur);
  },
  Eh = { _start: 0, endTime: Ei, totalDuration: Ei },
  Ft = function n(e, t, r) {
    var i = e.labels,
      s = e._recent || Eh,
      o = e.duration() >= Nt ? s.endTime(!1) : e._dur,
      a,
      l,
      u;
    return $e(t) && (isNaN(t) || t in i)
      ? ((l = t.charAt(0)),
        (u = t.substr(-1) === "%"),
        (a = t.indexOf("=")),
        l === "<" || l === ">"
          ? (a >= 0 && (t = t.replace(/=/, "")),
            (l === "<" ? s._start : s.endTime(s._repeat >= 0)) +
              (parseFloat(t.substr(1)) || 0) *
                (u ? (a < 0 ? s : r).totalDuration() / 100 : 1))
          : a < 0
          ? (t in i || (i[t] = o), i[t])
          : ((l = parseFloat(t.charAt(a - 1) + t.substr(a + 1))),
            u && r && (l = (l / 100) * (tt(r) ? r[0] : r).totalDuration()),
            a > 1 ? n(e, t.substr(0, a - 1), r) + l : o + l))
      : t == null
      ? o
      : +t;
  },
  mi = function (e, t, r) {
    var i = gr(t[1]),
      s = (i ? 2 : 1) + (e < 2 ? 0 : 1),
      o = t[s],
      a,
      l;
    if ((i && (o.duration = t[1]), (o.parent = r), e)) {
      for (a = o, l = r; l && !("immediateRender" in a); )
        (a = l.vars.defaults || {}), (l = pt(l.vars.inherit) && l.parent);
      (o.immediateRender = pt(a.immediateRender)),
        e < 2 ? (o.runBackwards = 1) : (o.startAt = t[s - 1]);
    }
    return new Fe(t[0], o, t[s + 1]);
  },
  Ur = function (e, t) {
    return e || e === 0 ? t(e) : t;
  },
  Ui = function (e, t, r) {
    return r < e ? e : r > t ? t : r;
  },
  Je = function (e, t) {
    return !$e(e) || !(t = vh.exec(e)) ? "" : t[1];
  },
  Rh = function (e, t, r) {
    return Ur(r, function (i) {
      return Ui(e, t, i);
    });
  },
  yo = [].slice,
  Ou = function (e, t) {
    return (
      e &&
      sr(e) &&
      "length" in e &&
      ((!t && !e.length) || (e.length - 1 in e && sr(e[0]))) &&
      !e.nodeType &&
      e !== Zt
    );
  },
  Dh = function (e, t, r) {
    return (
      r === void 0 && (r = []),
      e.forEach(function (i) {
        var s;
        return ($e(i) && !t) || Ou(i, 1)
          ? (s = r).push.apply(s, Bt(i))
          : r.push(i);
      }) || r
    );
  },
  Bt = function (e, t, r) {
    return he && !t && he.selector
      ? he.selector(e)
      : $e(e) && !r && (po || !$n())
      ? yo.call((t || na).querySelectorAll(e), 0)
      : tt(e)
      ? Dh(e, r)
      : Ou(e)
      ? yo.call(e, 0)
      : e
      ? [e]
      : [];
  },
  xo = function (e) {
    return (
      (e = Bt(e)[0] || Oi("Invalid scope") || {}),
      function (t) {
        var r = e.current || e.nativeElement || e;
        return Bt(
          t,
          r.querySelectorAll
            ? r
            : r === e
            ? Oi("Invalid scope") || na.createElement("div")
            : e
        );
      }
    );
  },
  Eu = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  Ru = function (e) {
    if (we(e)) return e;
    var t = sr(e) ? e : { each: e },
      r = an(t.ease),
      i = t.from || 0,
      s = parseFloat(t.base) || 0,
      o = {},
      a = i > 0 && i < 1,
      l = isNaN(i) || a,
      u = t.axis,
      c = i,
      f = i;
    return (
      $e(i)
        ? (c = f = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
        : !a && l && ((c = i[0]), (f = i[1])),
      function (d, h, m) {
        var p = (m || t).length,
          g = o[p],
          x,
          T,
          w,
          v,
          y,
          M,
          b,
          C,
          S;
        if (!g) {
          if (((S = t.grid === "auto" ? 0 : (t.grid || [1, Nt])[1]), !S)) {
            for (
              b = -Nt;
              b < (b = m[S++].getBoundingClientRect().left) && S < p;

            );
            S < p && S--;
          }
          for (
            g = o[p] = [],
              x = l ? Math.min(S, p) * c - 0.5 : i % S,
              T = S === Nt ? 0 : l ? (p * f) / S - 0.5 : (i / S) | 0,
              b = 0,
              C = Nt,
              M = 0;
            M < p;
            M++
          )
            (w = (M % S) - x),
              (v = T - ((M / S) | 0)),
              (g[M] = y = u ? Math.abs(u === "y" ? v : w) : pu(w * w + v * v)),
              y > b && (b = y),
              y < C && (C = y);
          i === "random" && Eu(g),
            (g.max = b - C),
            (g.min = C),
            (g.v = p =
              (parseFloat(t.amount) ||
                parseFloat(t.each) *
                  (S > p
                    ? p - 1
                    : u
                    ? u === "y"
                      ? p / S
                      : S
                    : Math.max(S, p / S)) ||
                0) * (i === "edges" ? -1 : 1)),
            (g.b = p < 0 ? s - p : s),
            (g.u = Je(t.amount || t.each) || 0),
            (r = r && p < 0 ? $u(r) : r);
        }
        return (
          (p = (g[d] - g.min) / g.max || 0),
          ge(g.b + (r ? r(p) : p) * g.v) + g.u
        );
      }
    );
  },
  vo = function (e) {
    var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function (r) {
      var i = ge(Math.round(parseFloat(r) / e) * e * t);
      return (i - (i % 1)) / t + (gr(r) ? 0 : Je(r));
    };
  },
  Du = function (e, t) {
    var r = tt(e),
      i,
      s;
    return (
      !r &&
        sr(e) &&
        ((i = r = e.radius || Nt),
        e.values
          ? ((e = Bt(e.values)), (s = !gr(e[0])) && (i *= i))
          : (e = vo(e.increment))),
      Ur(
        t,
        r
          ? we(e)
            ? function (o) {
                return (s = e(o)), Math.abs(s - o) <= i ? s : o;
              }
            : function (o) {
                for (
                  var a = parseFloat(s ? o.x : o),
                    l = parseFloat(s ? o.y : 0),
                    u = Nt,
                    c = 0,
                    f = e.length,
                    d,
                    h;
                  f--;

                )
                  s
                    ? ((d = e[f].x - a), (h = e[f].y - l), (d = d * d + h * h))
                    : (d = Math.abs(e[f] - a)),
                    d < u && ((u = d), (c = f));
                return (
                  (c = !i || u <= i ? e[c] : o),
                  s || c === o || gr(o) ? c : c + Je(o)
                );
              }
          : vo(e)
      )
    );
  },
  Fu = function (e, t, r, i) {
    return Ur(tt(e) ? !t : r === !0 ? !!(r = 0) : !i, function () {
      return tt(e)
        ? e[~~(Math.random() * e.length)]
        : (r = r || 1e-5) &&
            (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
            Math.floor(
              Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) *
                r *
                i
            ) / i;
    });
  },
  Fh = function () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return function (i) {
      return t.reduce(function (s, o) {
        return o(s);
      }, i);
    };
  },
  Vh = function (e, t) {
    return function (r) {
      return e(parseFloat(r)) + (t || Je(r));
    };
  },
  Ih = function (e, t, r) {
    return Iu(e, t, 0, 1, r);
  },
  Vu = function (e, t, r) {
    return Ur(r, function (i) {
      return e[~~t(i)];
    });
  },
  Nh = function n(e, t, r) {
    var i = t - e;
    return tt(e)
      ? Vu(e, n(0, e.length), t)
      : Ur(r, function (s) {
          return ((i + ((s - e) % i)) % i) + e;
        });
  },
  Bh = function n(e, t, r) {
    var i = t - e,
      s = i * 2;
    return tt(e)
      ? Vu(e, n(0, e.length - 1), t)
      : Ur(r, function (o) {
          return (o = (s + ((o - e) % s)) % s || 0), e + (o > i ? s - o : o);
        });
  },
  Ri = function (e) {
    return e.replace(_h, function (t) {
      var r = t.indexOf("[") + 1,
        i = t.substring(r || 7, r ? t.indexOf("]") : t.length - 1).split(yh);
      return Fu(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5);
    });
  },
  Iu = function (e, t, r, i, s) {
    var o = t - e,
      a = i - r;
    return Ur(s, function (l) {
      return r + (((l - e) / o) * a || 0);
    });
  },
  Lh = function n(e, t, r, i) {
    var s = isNaN(e + t)
      ? 0
      : function (h) {
          return (1 - h) * e + h * t;
        };
    if (!s) {
      var o = $e(e),
        a = {},
        l,
        u,
        c,
        f,
        d;
      if ((r === !0 && (i = 1) && (r = null), o))
        (e = { p: e }), (t = { p: t });
      else if (tt(e) && !tt(t)) {
        for (c = [], f = e.length, d = f - 2, u = 1; u < f; u++)
          c.push(n(e[u - 1], e[u]));
        f--,
          (s = function (m) {
            m *= f;
            var p = Math.min(d, ~~m);
            return c[p](m - p);
          }),
          (r = t);
      } else i || (e = Ln(tt(e) ? [] : {}, e));
      if (!c) {
        for (l in t) ua.call(a, e, l, "get", t[l]);
        s = function (m) {
          return da(m, a) || (o ? e.p : e);
        };
      }
    }
    return Ur(r, s);
  },
  il = function (e, t, r) {
    var i = e.labels,
      s = Nt,
      o,
      a,
      l;
    for (o in i)
      (a = i[o] - t),
        a < 0 == !!r && a && s > (a = Math.abs(a)) && ((l = o), (s = a));
    return l;
  },
  At = function (e, t, r) {
    var i = e.vars,
      s = i[t],
      o = he,
      a = e._ctx,
      l,
      u,
      c;
    if (s)
      return (
        (l = i[t + "Params"]),
        (u = i.callbackScope || e),
        r && Vr.length && Ss(),
        a && (he = a),
        (c = l ? s.apply(u, l) : s.call(u)),
        (he = o),
        c
      );
  },
  si = function (e) {
    return (
      Br(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!Ke),
      e.progress() < 1 && At(e, "onInterrupt"),
      e
    );
  },
  An,
  Nu = [],
  Bu = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), ra() || e.headless)) {
        var t = e.name,
          r = we(e),
          i =
            t && !r && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          s = {
            init: Ei,
            render: da,
            add: ua,
            kill: td,
            modifier: ed,
            rawVars: 0,
          },
          o = {
            targetTest: 0,
            get: 0,
            getSetter: ha,
            aliases: {},
            register: 0,
          };
        if (($n(), e !== i)) {
          if (St[t]) return;
          Rt(i, Rt(Cs(e, s), o)),
            Ln(i.prototype, Ln(s, Cs(e, o))),
            (St[(i.prop = t)] = i),
            e.targetTest && (ds.push(i), (sa[t] = 1)),
            (t =
              (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) +
              "Plugin");
        }
        vu(t, i), e.register && e.register(yt, i, gt);
      } else Nu.push(e);
  },
  ae = 255,
  oi = {
    aqua: [0, ae, ae],
    lime: [0, ae, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, ae],
    navy: [0, 0, 128],
    white: [ae, ae, ae],
    olive: [128, 128, 0],
    yellow: [ae, ae, 0],
    orange: [ae, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [ae, 0, 0],
    pink: [ae, 192, 203],
    cyan: [0, ae, ae],
    transparent: [ae, ae, ae, 0],
  },
  Ws = function (e, t, r) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? t + (r - t) * e * 6
        : e < 0.5
        ? r
        : e * 3 < 2
        ? t + (r - t) * (2 / 3 - e) * 6
        : t) *
        ae +
        0.5) |
        0
    );
  },
  Lu = function (e, t, r) {
    var i = e ? (gr(e) ? [e >> 16, (e >> 8) & ae, e & ae] : 0) : oi.black,
      s,
      o,
      a,
      l,
      u,
      c,
      f,
      d,
      h,
      m;
    if (!i) {
      if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), oi[e]))
        i = oi[e];
      else if (e.charAt(0) === "#") {
        if (
          (e.length < 6 &&
            ((s = e.charAt(1)),
            (o = e.charAt(2)),
            (a = e.charAt(3)),
            (e =
              "#" +
              s +
              s +
              o +
              o +
              a +
              a +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ""))),
          e.length === 9)
        )
          return (
            (i = parseInt(e.substr(1, 6), 16)),
            [i >> 16, (i >> 8) & ae, i & ae, parseInt(e.substr(7), 16) / 255]
          );
        (e = parseInt(e.substr(1), 16)), (i = [e >> 16, (e >> 8) & ae, e & ae]);
      } else if (e.substr(0, 3) === "hsl") {
        if (((i = m = e.match(Ja)), !t))
          (l = (+i[0] % 360) / 360),
            (u = +i[1] / 100),
            (c = +i[2] / 100),
            (o = c <= 0.5 ? c * (u + 1) : c + u - c * u),
            (s = c * 2 - o),
            i.length > 3 && (i[3] *= 1),
            (i[0] = Ws(l + 1 / 3, s, o)),
            (i[1] = Ws(l, s, o)),
            (i[2] = Ws(l - 1 / 3, s, o));
        else if (~e.indexOf("="))
          return (i = e.match(gu)), r && i.length < 4 && (i[3] = 1), i;
      } else i = e.match(Ja) || oi.transparent;
      i = i.map(Number);
    }
    return (
      t &&
        !m &&
        ((s = i[0] / ae),
        (o = i[1] / ae),
        (a = i[2] / ae),
        (f = Math.max(s, o, a)),
        (d = Math.min(s, o, a)),
        (c = (f + d) / 2),
        f === d
          ? (l = u = 0)
          : ((h = f - d),
            (u = c > 0.5 ? h / (2 - f - d) : h / (f + d)),
            (l =
              f === s
                ? (o - a) / h + (o < a ? 6 : 0)
                : f === o
                ? (a - s) / h + 2
                : (s - o) / h + 4),
            (l *= 60)),
        (i[0] = ~~(l + 0.5)),
        (i[1] = ~~(u * 100 + 0.5)),
        (i[2] = ~~(c * 100 + 0.5))),
      r && i.length < 4 && (i[3] = 1),
      i
    );
  },
  zu = function (e) {
    var t = [],
      r = [],
      i = -1;
    return (
      e.split(Ir).forEach(function (s) {
        var o = s.match(kn) || [];
        t.push.apply(t, o), r.push((i += o.length + 1));
      }),
      (t.c = r),
      t
    );
  },
  sl = function (e, t, r) {
    var i = "",
      s = (e + i).match(Ir),
      o = t ? "hsla(" : "rgba(",
      a = 0,
      l,
      u,
      c,
      f;
    if (!s) return e;
    if (
      ((s = s.map(function (d) {
        return (
          (d = Lu(d, t, 1)) &&
          o +
            (t ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) +
            ")"
        );
      })),
      r && ((c = zu(e)), (l = r.c), l.join(i) !== c.c.join(i)))
    )
      for (u = e.replace(Ir, "1").split(kn), f = u.length - 1; a < f; a++)
        i +=
          u[a] +
          (~l.indexOf(a)
            ? s.shift() || o + "0,0,0,0)"
            : (c.length ? c : s.length ? s : r).shift());
    if (!u)
      for (u = e.split(Ir), f = u.length - 1; a < f; a++) i += u[a] + s[a];
    return i + u[f];
  },
  Ir = (function () {
    var n =
        "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      e;
    for (e in oi) n += "|" + e + "\\b";
    return new RegExp(n + ")", "gi");
  })(),
  zh = /hsl[a]?\(/,
  ju = function (e) {
    var t = e.join(" "),
      r;
    if (((Ir.lastIndex = 0), Ir.test(t)))
      return (
        (r = zh.test(t)),
        (e[1] = sl(e[1], r)),
        (e[0] = sl(e[0], r, zu(e[1]))),
        !0
      );
  },
  Di,
  Mt = (function () {
    var n = Date.now,
      e = 500,
      t = 33,
      r = n(),
      i = r,
      s = 1e3 / 240,
      o = s,
      a = [],
      l,
      u,
      c,
      f,
      d,
      h,
      m = function p(g) {
        var x = n() - i,
          T = g === !0,
          w,
          v,
          y,
          M;
        if (
          ((x > e || x < 0) && (r += x - t),
          (i += x),
          (y = i - r),
          (w = y - o),
          (w > 0 || T) &&
            ((M = ++f.frame),
            (d = y - f.time * 1e3),
            (f.time = y = y / 1e3),
            (o += w + (w >= s ? 4 : s - w)),
            (v = 1)),
          T || (l = u(p)),
          v)
        )
          for (h = 0; h < a.length; h++) a[h](y, d, M, g);
      };
    return (
      (f = {
        time: 0,
        frame: 0,
        tick: function () {
          m(!0);
        },
        deltaRatio: function (g) {
          return d / (1e3 / (g || 60));
        },
        wake: function () {
          yu &&
            (!po &&
              ra() &&
              ((Zt = po = window),
              (na = Zt.document || {}),
              (Et.gsap = yt),
              (Zt.gsapVersions || (Zt.gsapVersions = [])).push(yt.version),
              xu(ws || Zt.GreenSockGlobals || (!Zt.gsap && Zt) || {}),
              Nu.forEach(Bu)),
            (c = typeof requestAnimationFrame < "u" && requestAnimationFrame),
            l && f.sleep(),
            (u =
              c ||
              function (g) {
                return setTimeout(g, (o - f.time * 1e3 + 1) | 0);
              }),
            (Di = 1),
            m(2));
        },
        sleep: function () {
          (c ? cancelAnimationFrame : clearTimeout)(l), (Di = 0), (u = Ei);
        },
        lagSmoothing: function (g, x) {
          (e = g || 1 / 0), (t = Math.min(x || 33, e));
        },
        fps: function (g) {
          (s = 1e3 / (g || 240)), (o = f.time * 1e3 + s);
        },
        add: function (g, x, T) {
          var w = x
            ? function (v, y, M, b) {
                g(v, y, M, b), f.remove(w);
              }
            : g;
          return f.remove(g), a[T ? "unshift" : "push"](w), $n(), w;
        },
        remove: function (g, x) {
          ~(x = a.indexOf(g)) && a.splice(x, 1) && h >= x && h--;
        },
        _listeners: a,
      }),
      f
    );
  })(),
  $n = function () {
    return !Di && Mt.wake();
  },
  ee = {},
  jh = /^[\d.\-M][\d.\-,\s]/,
  $h = /["']/g,
  Uh = function (e) {
    for (
      var t = {},
        r = e.substr(1, e.length - 3).split(":"),
        i = r[0],
        s = 1,
        o = r.length,
        a,
        l,
        u;
      s < o;
      s++
    )
      (l = r[s]),
        (a = s !== o - 1 ? l.lastIndexOf(",") : l.length),
        (u = l.substr(0, a)),
        (t[i] = isNaN(u) ? u.replace($h, "").trim() : +u),
        (i = l.substr(a + 1).trim());
    return t;
  },
  Wh = function (e) {
    var t = e.indexOf("(") + 1,
      r = e.indexOf(")"),
      i = e.indexOf("(", t);
    return e.substring(t, ~i && i < r ? e.indexOf(")", r + 1) : r);
  },
  Yh = function (e) {
    var t = (e + "").split("("),
      r = ee[t[0]];
    return r && t.length > 1 && r.config
      ? r.config.apply(
          null,
          ~e.indexOf("{") ? [Uh(t[1])] : Wh(e).split(",").map(Su)
        )
      : ee._CE && jh.test(e)
      ? ee._CE("", e)
      : r;
  },
  $u = function (e) {
    return function (t) {
      return 1 - e(1 - t);
    };
  },
  Uu = function n(e, t) {
    for (var r = e._first, i; r; )
      r instanceof ut
        ? n(r, t)
        : r.vars.yoyoEase &&
          (!r._yoyo || !r._repeat) &&
          r._yoyo !== t &&
          (r.timeline
            ? n(r.timeline, t)
            : ((i = r._ease),
              (r._ease = r._yEase),
              (r._yEase = i),
              (r._yoyo = t))),
        (r = r._next);
  },
  an = function (e, t) {
    return (e && (we(e) ? e : ee[e] || Yh(e))) || t;
  },
  yn = function (e, t, r, i) {
    r === void 0 &&
      (r = function (l) {
        return 1 - t(1 - l);
      }),
      i === void 0 &&
        (i = function (l) {
          return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
        });
    var s = { easeIn: t, easeOut: r, easeInOut: i },
      o;
    return (
      mt(e, function (a) {
        (ee[a] = Et[a] = s), (ee[(o = a.toLowerCase())] = r);
        for (var l in s)
          ee[
            o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")
          ] = ee[a + "." + l] = s[l];
      }),
      s
    );
  },
  Wu = function (e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
    };
  },
  Ys = function n(e, t, r) {
    var i = t >= 1 ? t : 1,
      s = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      o = (s / ho) * (Math.asin(1 / i) || 0),
      a = function (c) {
        return c === 1 ? 1 : i * Math.pow(2, -10 * c) * gh((c - o) * s) + 1;
      },
      l =
        e === "out"
          ? a
          : e === "in"
          ? function (u) {
              return 1 - a(1 - u);
            }
          : Wu(a);
    return (
      (s = ho / s),
      (l.config = function (u, c) {
        return n(e, u, c);
      }),
      l
    );
  },
  Xs = function n(e, t) {
    t === void 0 && (t = 1.70158);
    var r = function (o) {
        return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
      },
      i =
        e === "out"
          ? r
          : e === "in"
          ? function (s) {
              return 1 - r(1 - s);
            }
          : Wu(r);
    return (
      (i.config = function (s) {
        return n(e, s);
      }),
      i
    );
  };
mt("Linear,Quad,Cubic,Quart,Quint,Strong", function (n, e) {
  var t = e < 5 ? e + 1 : e;
  yn(
    n + ",Power" + (t - 1),
    e
      ? function (r) {
          return Math.pow(r, t);
        }
      : function (r) {
          return r;
        },
    function (r) {
      return 1 - Math.pow(1 - r, t);
    },
    function (r) {
      return r < 0.5
        ? Math.pow(r * 2, t) / 2
        : 1 - Math.pow((1 - r) * 2, t) / 2;
    }
  );
});
ee.Linear.easeNone = ee.none = ee.Linear.easeIn;
yn("Elastic", Ys("in"), Ys("out"), Ys());
(function (n, e) {
  var t = 1 / e,
    r = 2 * t,
    i = 2.5 * t,
    s = function (a) {
      return a < t
        ? n * a * a
        : a < r
        ? n * Math.pow(a - 1.5 / e, 2) + 0.75
        : a < i
        ? n * (a -= 2.25 / e) * a + 0.9375
        : n * Math.pow(a - 2.625 / e, 2) + 0.984375;
    };
  yn(
    "Bounce",
    function (o) {
      return 1 - s(1 - o);
    },
    s
  );
})(7.5625, 2.75);
yn("Expo", function (n) {
  return Math.pow(2, 10 * (n - 1)) * n + n * n * n * n * n * n * (1 - n);
});
yn("Circ", function (n) {
  return -(pu(1 - n * n) - 1);
});
yn("Sine", function (n) {
  return n === 1 ? 1 : -mh(n * dh) + 1;
});
yn("Back", Xs("in"), Xs("out"), Xs());
ee.SteppedEase =
  ee.steps =
  Et.SteppedEase =
    {
      config: function (e, t) {
        e === void 0 && (e = 1);
        var r = 1 / e,
          i = e + (t ? 0 : 1),
          s = t ? 1 : 0,
          o = 1 - le;
        return function (a) {
          return (((i * Ui(0, o, a)) | 0) + s) * r;
        };
      },
    };
Bn.ease = ee["quad.out"];
mt(
  "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
  function (n) {
    return (oa += n + "," + n + "Params,");
  }
);
var Yu = function (e, t) {
    (this.id = ph++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = t),
      (this.get = t ? t.get : Tu),
      (this.set = t ? t.getSetter : ha);
  },
  Fi = (function () {
    function n(t) {
      (this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        jn(this, +t.duration, 1, 1),
        (this.data = t.data),
        he && ((this._ctx = he), he.data.push(this)),
        Di || Mt.wake();
    }
    var e = n.prototype;
    return (
      (e.delay = function (r) {
        return r || r === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + r - this._delay),
            (this._delay = r),
            this)
          : this._delay;
      }),
      (e.duration = function (r) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r
            )
          : this.totalDuration() && this._dur;
      }),
      (e.totalDuration = function (r) {
        return arguments.length
          ? ((this._dirty = 0),
            jn(
              this,
              this._repeat < 0
                ? r
                : (r - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (e.totalTime = function (r, i) {
        if (($n(), !arguments.length)) return this._tTime;
        var s = this._dp;
        if (s && s.smoothChildTiming && this._ts) {
          for (Ls(this, r), !s._dp || s.parent || ku(s, this); s && s.parent; )
            s.parent._time !==
              s._start +
                (s._ts >= 0
                  ? s._tTime / s._ts
                  : (s.totalDuration() - s._tTime) / -s._ts) &&
              s.totalTime(s._tTime, !0),
              (s = s.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && r < this._tDur) ||
              (this._ts < 0 && r > 0) ||
              (!this._tDur && !r)) &&
            er(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== r ||
            (!this._dur && !i) ||
            (this._initted && Math.abs(this._zTime) === le) ||
            (!this._initted && this._dur && r) ||
            (!r && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = r), wu(this, r, i)),
          this
        );
      }),
      (e.time = function (r, i) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), r + rl(this)) %
                (this._dur + this._rDelay) || (r ? this._dur : 0),
              i
            )
          : this._time;
      }),
      (e.totalProgress = function (r, i) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * r, i)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.rawTime() >= 0 && this._initted
          ? 1
          : 0;
      }),
      (e.progress = function (r, i) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) +
                rl(this),
              i
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.rawTime() > 0
          ? 1
          : 0;
      }),
      (e.iteration = function (r, i) {
        var s = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (r - 1) * s, i)
          : this._repeat
          ? zn(this._tTime, s) + 1
          : 1;
      }),
      (e.timeScale = function (r, i) {
        if (!arguments.length) return this._rts === -le ? 0 : this._rts;
        if (this._rts === r) return this;
        var s =
          this.parent && this._ts ? Ms(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +r || 0),
          (this._ts = this._ps || r === -le ? 0 : this._rts),
          this.totalTime(
            Ui(-Math.abs(this._delay), this.totalDuration(), s),
            i !== !1
          ),
          Bs(this),
          Mh(this)
        );
      }),
      (e.paused = function (r) {
        return arguments.length
          ? (this._ps !== r &&
              ((this._ps = r),
              r
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : ($n(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== le &&
                      (this._tTime -= le)
                  ))),
            this)
          : this._ps;
      }),
      (e.startTime = function (r) {
        if (arguments.length) {
          this._start = ge(r);
          var i = this.parent || this._dp;
          return (
            i &&
              (i._sort || !this.parent) &&
              er(i, this, this._start - this._delay),
            this
          );
        }
        return this._start;
      }),
      (e.endTime = function (r) {
        return (
          this._start +
          (pt(r) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (e.rawTime = function (r) {
        var i = this.parent || this._dp;
        return i
          ? r &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? Ms(i.rawTime(r), this)
            : this._tTime
          : this._tTime;
      }),
      (e.revert = function (r) {
        r === void 0 && (r = Th);
        var i = Ke;
        return (
          (Ke = r),
          la(this) &&
            (this.timeline && this.timeline.revert(r),
            this.totalTime(-0.01, r.suppressEvents)),
          this.data !== "nested" && r.kill !== !1 && this.kill(),
          (Ke = i),
          this
        );
      }),
      (e.globalTime = function (r) {
        for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
          (s = i._start + s / (Math.abs(i._ts) || 1)), (i = i._dp);
        return !this.parent && this._sat ? this._sat.globalTime(r) : s;
      }),
      (e.repeat = function (r) {
        return arguments.length
          ? ((this._repeat = r === 1 / 0 ? -2 : r), nl(this))
          : this._repeat === -2
          ? 1 / 0
          : this._repeat;
      }),
      (e.repeatDelay = function (r) {
        if (arguments.length) {
          var i = this._time;
          return (this._rDelay = r), nl(this), i ? this.time(i) : this;
        }
        return this._rDelay;
      }),
      (e.yoyo = function (r) {
        return arguments.length ? ((this._yoyo = r), this) : this._yoyo;
      }),
      (e.seek = function (r, i) {
        return this.totalTime(Ft(this, r), pt(i));
      }),
      (e.restart = function (r, i) {
        return (
          this.play().totalTime(r ? -this._delay : 0, pt(i)),
          this._dur || (this._zTime = -le),
          this
        );
      }),
      (e.play = function (r, i) {
        return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
      }),
      (e.reverse = function (r, i) {
        return (
          r != null && this.seek(r || this.totalDuration(), i),
          this.reversed(!0).paused(!1)
        );
      }),
      (e.pause = function (r, i) {
        return r != null && this.seek(r, i), this.paused(!0);
      }),
      (e.resume = function () {
        return this.paused(!1);
      }),
      (e.reversed = function (r) {
        return arguments.length
          ? (!!r !== this.reversed() &&
              this.timeScale(-this._rts || (r ? -le : 0)),
            this)
          : this._rts < 0;
      }),
      (e.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -le), this;
      }),
      (e.isActive = function () {
        var r = this.parent || this._dp,
          i = this._start,
          s;
        return !!(
          !r ||
          (this._ts &&
            this._initted &&
            r.isActive() &&
            (s = r.rawTime(!0)) >= i &&
            s < this.endTime(!0) - le)
        );
      }),
      (e.eventCallback = function (r, i, s) {
        var o = this.vars;
        return arguments.length > 1
          ? (i
              ? ((o[r] = i),
                s && (o[r + "Params"] = s),
                r === "onUpdate" && (this._onUpdate = i))
              : delete o[r],
            this)
          : o[r];
      }),
      (e.then = function (r) {
        var i = this,
          s = i._prom;
        return new Promise(function (o) {
          var a = we(r) ? r : Cu,
            l = function () {
              var c = i.then;
              (i.then = null),
                s && s(),
                we(a) && (a = a(i)) && (a.then || a === i) && (i.then = c),
                o(a),
                (i.then = c);
            };
          (i._initted && i.totalProgress() === 1 && i._ts >= 0) ||
          (!i._tTime && i._ts < 0)
            ? l()
            : (i._prom = l);
        });
      }),
      (e.kill = function () {
        si(this);
      }),
      n
    );
  })();
Rt(Fi.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -le,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var ut = (function (n) {
  du(e, n);
  function e(r, i) {
    var s;
    return (
      r === void 0 && (r = {}),
      (s = n.call(this, r) || this),
      (s.labels = {}),
      (s.smoothChildTiming = !!r.smoothChildTiming),
      (s.autoRemoveChildren = !!r.autoRemoveChildren),
      (s._sort = pt(r.sortChildren)),
      _e && er(r.parent || _e, fr(s), i),
      r.reversed && s.reverse(),
      r.paused && s.paused(!0),
      r.scrollTrigger && Au(fr(s), r.scrollTrigger),
      s
    );
  }
  var t = e.prototype;
  return (
    (t.to = function (i, s, o) {
      return mi(0, arguments, this), this;
    }),
    (t.from = function (i, s, o) {
      return mi(1, arguments, this), this;
    }),
    (t.fromTo = function (i, s, o, a) {
      return mi(2, arguments, this), this;
    }),
    (t.set = function (i, s, o) {
      return (
        (s.duration = 0),
        (s.parent = this),
        pi(s).repeatDelay || (s.repeat = 0),
        (s.immediateRender = !!s.immediateRender),
        new Fe(i, s, Ft(this, o), 1),
        this
      );
    }),
    (t.call = function (i, s, o) {
      return er(this, Fe.delayedCall(0, i, s), o);
    }),
    (t.staggerTo = function (i, s, o, a, l, u, c) {
      return (
        (o.duration = s),
        (o.stagger = o.stagger || a),
        (o.onComplete = u),
        (o.onCompleteParams = c),
        (o.parent = this),
        new Fe(i, o, Ft(this, l)),
        this
      );
    }),
    (t.staggerFrom = function (i, s, o, a, l, u, c) {
      return (
        (o.runBackwards = 1),
        (pi(o).immediateRender = pt(o.immediateRender)),
        this.staggerTo(i, s, o, a, l, u, c)
      );
    }),
    (t.staggerFromTo = function (i, s, o, a, l, u, c, f) {
      return (
        (a.startAt = o),
        (pi(a).immediateRender = pt(a.immediateRender)),
        this.staggerTo(i, s, a, l, u, c, f)
      );
    }),
    (t.render = function (i, s, o) {
      var a = this._time,
        l = this._dirty ? this.totalDuration() : this._tDur,
        u = this._dur,
        c = i <= 0 ? 0 : ge(i),
        f = this._zTime < 0 != i < 0 && (this._initted || !u),
        d,
        h,
        m,
        p,
        g,
        x,
        T,
        w,
        v,
        y,
        M,
        b;
      if (
        (this !== _e && c > l && i >= 0 && (c = l), c !== this._tTime || o || f)
      ) {
        if (
          (a !== this._time &&
            u &&
            ((c += this._time - a), (i += this._time - a)),
          (d = c),
          (v = this._start),
          (w = this._ts),
          (x = !w),
          f && (u || (a = this._zTime), (i || !s) && (this._zTime = i)),
          this._repeat)
        ) {
          if (
            ((M = this._yoyo),
            (g = u + this._rDelay),
            this._repeat < -1 && i < 0)
          )
            return this.totalTime(g * 100 + i, s, o);
          if (
            ((d = ge(c % g)),
            c === l
              ? ((p = this._repeat), (d = u))
              : ((y = ge(c / g)),
                (p = ~~y),
                p && p === y && ((d = u), p--),
                d > u && (d = u)),
            (y = zn(this._tTime, g)),
            !a &&
              this._tTime &&
              y !== p &&
              this._tTime - y * g - this._dur <= 0 &&
              (y = p),
            M && p & 1 && ((d = u - d), (b = 1)),
            p !== y && !this._lock)
          ) {
            var C = M && y & 1,
              S = C === (M && p & 1);
            if (
              (p < y && (C = !C),
              (a = C ? 0 : c % u ? u : c),
              (this._lock = 1),
              (this.render(a || (b ? 0 : ge(p * g)), s, !u)._lock = 0),
              (this._tTime = c),
              !s && this.parent && At(this, "onRepeat"),
              this.vars.repeatRefresh &&
                !b &&
                ((this.invalidate()._lock = 1), (y = p)),
              (a && a !== this._time) ||
                x !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this;
            if (
              ((u = this._dur),
              (l = this._tDur),
              S &&
                ((this._lock = 2),
                (a = C ? u : -1e-4),
                this.render(a, !0),
                this.vars.repeatRefresh && !b && this.invalidate()),
              (this._lock = 0),
              !this._ts && !x)
            )
              return this;
            Uu(this, b);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((T = Oh(this, ge(a), ge(d))), T && (c -= d - (d = T._start))),
          (this._tTime = c),
          (this._time = d),
          (this._act = !w),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = i),
            (a = 0)),
          !a && c && u && !s && !y && (At(this, "onStart"), this._tTime !== c))
        )
          return this;
        if (d >= a && i >= 0)
          for (h = this._first; h; ) {
            if (
              ((m = h._next), (h._act || d >= h._start) && h._ts && T !== h)
            ) {
              if (h.parent !== this) return this.render(i, s, o);
              if (
                (h.render(
                  h._ts > 0
                    ? (d - h._start) * h._ts
                    : (h._dirty ? h.totalDuration() : h._tDur) +
                        (d - h._start) * h._ts,
                  s,
                  o
                ),
                d !== this._time || (!this._ts && !x))
              ) {
                (T = 0), m && (c += this._zTime = -le);
                break;
              }
            }
            h = m;
          }
        else {
          h = this._last;
          for (var A = i < 0 ? i : d; h; ) {
            if (((m = h._prev), (h._act || A <= h._end) && h._ts && T !== h)) {
              if (h.parent !== this) return this.render(i, s, o);
              if (
                (h.render(
                  h._ts > 0
                    ? (A - h._start) * h._ts
                    : (h._dirty ? h.totalDuration() : h._tDur) +
                        (A - h._start) * h._ts,
                  s,
                  o || (Ke && la(h))
                ),
                d !== this._time || (!this._ts && !x))
              ) {
                (T = 0), m && (c += this._zTime = A ? -le : le);
                break;
              }
            }
            h = m;
          }
        }
        if (
          T &&
          !s &&
          (this.pause(),
          (T.render(d >= a ? 0 : -le)._zTime = d >= a ? 1 : -1),
          this._ts)
        )
          return (this._start = v), Bs(this), this.render(i, s, o);
        this._onUpdate && !s && At(this, "onUpdate", !0),
          ((c === l && this._tTime >= this.totalDuration()) || (!c && a)) &&
            (v === this._start || Math.abs(w) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((i || !u) &&
                ((c === l && this._ts > 0) || (!c && this._ts < 0)) &&
                Br(this, 1),
              !s &&
                !(i < 0 && !a) &&
                (c || a || !l) &&
                (At(
                  this,
                  c === l && i >= 0 ? "onComplete" : "onReverseComplete",
                  !0
                ),
                this._prom &&
                  !(c < l && this.timeScale() > 0) &&
                  this._prom())));
      }
      return this;
    }),
    (t.add = function (i, s) {
      var o = this;
      if ((gr(s) || (s = Ft(this, s, i)), !(i instanceof Fi))) {
        if (tt(i))
          return (
            i.forEach(function (a) {
              return o.add(a, s);
            }),
            this
          );
        if ($e(i)) return this.addLabel(i, s);
        if (we(i)) i = Fe.delayedCall(0, i);
        else return this;
      }
      return this !== i ? er(this, i, s) : this;
    }),
    (t.getChildren = function (i, s, o, a) {
      i === void 0 && (i = !0),
        s === void 0 && (s = !0),
        o === void 0 && (o = !0),
        a === void 0 && (a = -Nt);
      for (var l = [], u = this._first; u; )
        u._start >= a &&
          (u instanceof Fe
            ? s && l.push(u)
            : (o && l.push(u), i && l.push.apply(l, u.getChildren(!0, s, o)))),
          (u = u._next);
      return l;
    }),
    (t.getById = function (i) {
      for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
        if (s[o].vars.id === i) return s[o];
    }),
    (t.remove = function (i) {
      return $e(i)
        ? this.removeLabel(i)
        : we(i)
        ? this.killTweensOf(i)
        : (i.parent === this && Ns(this, i),
          i === this._recent && (this._recent = this._last),
          on(this));
    }),
    (t.totalTime = function (i, s) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = ge(
              Mt.time -
                (this._ts > 0
                  ? i / this._ts
                  : (this.totalDuration() - i) / -this._ts)
            )),
          n.prototype.totalTime.call(this, i, s),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (t.addLabel = function (i, s) {
      return (this.labels[i] = Ft(this, s)), this;
    }),
    (t.removeLabel = function (i) {
      return delete this.labels[i], this;
    }),
    (t.addPause = function (i, s, o) {
      var a = Fe.delayedCall(0, s || Ei, o);
      return (
        (a.data = "isPause"), (this._hasPause = 1), er(this, a, Ft(this, i))
      );
    }),
    (t.removePause = function (i) {
      var s = this._first;
      for (i = Ft(this, i); s; )
        s._start === i && s.data === "isPause" && Br(s), (s = s._next);
    }),
    (t.killTweensOf = function (i, s, o) {
      for (var a = this.getTweensOf(i, o), l = a.length; l--; )
        Pr !== a[l] && a[l].kill(i, s);
      return this;
    }),
    (t.getTweensOf = function (i, s) {
      for (var o = [], a = Bt(i), l = this._first, u = gr(s), c; l; )
        l instanceof Fe
          ? wh(l._targets, a) &&
            (u
              ? (!Pr || (l._initted && l._ts)) &&
                l.globalTime(0) <= s &&
                l.globalTime(l.totalDuration()) > s
              : !s || l.isActive()) &&
            o.push(l)
          : (c = l.getTweensOf(a, s)).length && o.push.apply(o, c),
          (l = l._next);
      return o;
    }),
    (t.tweenTo = function (i, s) {
      s = s || {};
      var o = this,
        a = Ft(o, i),
        l = s,
        u = l.startAt,
        c = l.onStart,
        f = l.onStartParams,
        d = l.immediateRender,
        h,
        m = Fe.to(
          o,
          Rt(
            {
              ease: s.ease || "none",
              lazy: !1,
              immediateRender: !1,
              time: a,
              overwrite: "auto",
              duration:
                s.duration ||
                Math.abs(
                  (a - (u && "time" in u ? u.time : o._time)) / o.timeScale()
                ) ||
                le,
              onStart: function () {
                if ((o.pause(), !h)) {
                  var g =
                    s.duration ||
                    Math.abs(
                      (a - (u && "time" in u ? u.time : o._time)) /
                        o.timeScale()
                    );
                  m._dur !== g && jn(m, g, 0, 1).render(m._time, !0, !0),
                    (h = 1);
                }
                c && c.apply(m, f || []);
              },
            },
            s
          )
        );
      return d ? m.render(0) : m;
    }),
    (t.tweenFromTo = function (i, s, o) {
      return this.tweenTo(s, Rt({ startAt: { time: Ft(this, i) } }, o));
    }),
    (t.recent = function () {
      return this._recent;
    }),
    (t.nextLabel = function (i) {
      return i === void 0 && (i = this._time), il(this, Ft(this, i));
    }),
    (t.previousLabel = function (i) {
      return i === void 0 && (i = this._time), il(this, Ft(this, i), 1);
    }),
    (t.currentLabel = function (i) {
      return arguments.length
        ? this.seek(i, !0)
        : this.previousLabel(this._time + le);
    }),
    (t.shiftChildren = function (i, s, o) {
      o === void 0 && (o = 0);
      var a = this._first,
        l = this.labels,
        u;
      for (i = ge(i); a; )
        a._start >= o && ((a._start += i), (a._end += i)), (a = a._next);
      if (s) for (u in l) l[u] >= o && (l[u] += i);
      return on(this);
    }),
    (t.invalidate = function (i) {
      var s = this._first;
      for (this._lock = 0; s; ) s.invalidate(i), (s = s._next);
      return n.prototype.invalidate.call(this, i);
    }),
    (t.clear = function (i) {
      i === void 0 && (i = !0);
      for (var s = this._first, o; s; ) (o = s._next), this.remove(s), (s = o);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        i && (this.labels = {}),
        on(this)
      );
    }),
    (t.totalDuration = function (i) {
      var s = 0,
        o = this,
        a = o._last,
        l = Nt,
        u,
        c,
        f;
      if (arguments.length)
        return o.timeScale(
          (o._repeat < 0 ? o.duration() : o.totalDuration()) /
            (o.reversed() ? -i : i)
        );
      if (o._dirty) {
        for (f = o.parent; a; )
          (u = a._prev),
            a._dirty && a.totalDuration(),
            (c = a._start),
            c > l && o._sort && a._ts && !o._lock
              ? ((o._lock = 1), (er(o, a, c - a._delay, 1)._lock = 0))
              : (l = c),
            c < 0 &&
              a._ts &&
              ((s -= c),
              ((!f && !o._dp) || (f && f.smoothChildTiming)) &&
                ((o._start += ge(c / o._ts)), (o._time -= c), (o._tTime -= c)),
              o.shiftChildren(-c, !1, -1 / 0),
              (l = 0)),
            a._end > s && a._ts && (s = a._end),
            (a = u);
        jn(o, o === _e && o._time > s ? o._time : s, 1, 1), (o._dirty = 0);
      }
      return o._tDur;
    }),
    (e.updateRoot = function (i) {
      if ((_e._ts && (wu(_e, Ms(i, _e)), (bu = Mt.frame)), Mt.frame >= el)) {
        el += Ot.autoSleep || 120;
        var s = _e._first;
        if ((!s || !s._ts) && Ot.autoSleep && Mt._listeners.length < 2) {
          for (; s && !s._ts; ) s = s._next;
          s || Mt.sleep();
        }
      }
    }),
    e
  );
})(Fi);
Rt(ut.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var Xh = function (e, t, r, i, s, o, a) {
    var l = new gt(this._pt, e, t, 0, 1, Qu, null, s),
      u = 0,
      c = 0,
      f,
      d,
      h,
      m,
      p,
      g,
      x,
      T;
    for (
      l.b = r,
        l.e = i,
        r += "",
        i += "",
        (x = ~i.indexOf("random(")) && (i = Ri(i)),
        o && ((T = [r, i]), o(T, e, t), (r = T[0]), (i = T[1])),
        d = r.match($s) || [];
      (f = $s.exec(i));

    )
      (m = f[0]),
        (p = i.substring(u, f.index)),
        h ? (h = (h + 1) % 5) : p.substr(-5) === "rgba(" && (h = 1),
        m !== d[c++] &&
          ((g = parseFloat(d[c - 1]) || 0),
          (l._pt = {
            _next: l._pt,
            p: p || c === 1 ? p : ",",
            s: g,
            c: m.charAt(1) === "=" ? En(g, m) - g : parseFloat(m) - g,
            m: h && h < 4 ? Math.round : 0,
          }),
          (u = $s.lastIndex));
    return (
      (l.c = u < i.length ? i.substring(u, i.length) : ""),
      (l.fp = a),
      (_u.test(i) || x) && (l.e = 0),
      (this._pt = l),
      l
    );
  },
  ua = function (e, t, r, i, s, o, a, l, u, c) {
    we(i) && (i = i(s || 0, e, o));
    var f = e[t],
      d =
        r !== "get"
          ? r
          : we(f)
          ? u
            ? e[
                t.indexOf("set") || !we(e["get" + t.substr(3)])
                  ? t
                  : "get" + t.substr(3)
              ](u)
            : e[t]()
          : f,
      h = we(f) ? (u ? Qh : Hu) : fa,
      m;
    if (
      ($e(i) &&
        (~i.indexOf("random(") && (i = Ri(i)),
        i.charAt(1) === "=" &&
          ((m = En(d, i) + (Je(d) || 0)), (m || m === 0) && (i = m))),
      !c || d !== i || bo)
    )
      return !isNaN(d * i) && i !== ""
        ? ((m = new gt(
            this._pt,
            e,
            t,
            +d || 0,
            i - (d || 0),
            typeof f == "boolean" ? Jh : qu,
            0,
            h
          )),
          u && (m.fp = u),
          a && m.modifier(a, this, e),
          (this._pt = m))
        : (!f && !(t in e) && ia(t, i),
          Xh.call(this, e, t, d, i, h, l || Ot.stringFilter, u));
  },
  Kh = function (e, t, r, i, s) {
    if (
      (we(e) && (e = gi(e, s, t, r, i)),
      !sr(e) || (e.style && e.nodeType) || tt(e) || mu(e))
    )
      return $e(e) ? gi(e, s, t, r, i) : e;
    var o = {},
      a;
    for (a in e) o[a] = gi(e[a], s, t, r, i);
    return o;
  },
  Xu = function (e, t, r, i, s, o) {
    var a, l, u, c;
    if (
      St[e] &&
      (a = new St[e]()).init(
        s,
        a.rawVars ? t[e] : Kh(t[e], i, s, o, r),
        r,
        i,
        o
      ) !== !1 &&
      ((r._pt = l = new gt(r._pt, s, e, 0, 1, a.render, a, 0, a.priority)),
      r !== An)
    )
      for (u = r._ptLookup[r._targets.indexOf(s)], c = a._props.length; c--; )
        u[a._props[c]] = l;
    return a;
  },
  Pr,
  bo,
  ca = function n(e, t, r) {
    var i = e.vars,
      s = i.ease,
      o = i.startAt,
      a = i.immediateRender,
      l = i.lazy,
      u = i.onUpdate,
      c = i.runBackwards,
      f = i.yoyoEase,
      d = i.keyframes,
      h = i.autoRevert,
      m = e._dur,
      p = e._startAt,
      g = e._targets,
      x = e.parent,
      T = x && x.data === "nested" ? x.vars.targets : g,
      w = e._overwrite === "auto" && !ea,
      v = e.timeline,
      y,
      M,
      b,
      C,
      S,
      A,
      D,
      O,
      B,
      U,
      L,
      Y,
      F;
    if (
      (v && (!d || !s) && (s = "none"),
      (e._ease = an(s, Bn.ease)),
      (e._yEase = f ? $u(an(f === !0 ? s : f, Bn.ease)) : 0),
      f &&
        e._yoyo &&
        !e._repeat &&
        ((f = e._yEase), (e._yEase = e._ease), (e._ease = f)),
      (e._from = !v && !!i.runBackwards),
      !v || (d && !i.stagger))
    ) {
      if (
        ((O = g[0] ? sn(g[0]).harness : 0),
        (Y = O && i[O.prop]),
        (y = Cs(i, sa)),
        p &&
          (p._zTime < 0 && p.progress(1),
          t < 0 && c && a && !h ? p.render(-1, !0) : p.revert(c && m ? hs : bh),
          (p._lazy = 0)),
        o)
      ) {
        if (
          (Br(
            (e._startAt = Fe.set(
              g,
              Rt(
                {
                  data: "isStart",
                  overwrite: !1,
                  parent: x,
                  immediateRender: !0,
                  lazy: !p && pt(l),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    u &&
                    function () {
                      return At(e, "onUpdate");
                    },
                  stagger: 0,
                },
                o
              )
            ))
          ),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          t < 0 && (Ke || (!a && !h)) && e._startAt.revert(hs),
          a && m && t <= 0 && r <= 0)
        ) {
          t && (e._zTime = t);
          return;
        }
      } else if (c && m && !p) {
        if (
          (t && (a = !1),
          (b = Rt(
            {
              overwrite: !1,
              data: "isFromStart",
              lazy: a && !p && pt(l),
              immediateRender: a,
              stagger: 0,
              parent: x,
            },
            y
          )),
          Y && (b[O.prop] = Y),
          Br((e._startAt = Fe.set(g, b))),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          t < 0 && (Ke ? e._startAt.revert(hs) : e._startAt.render(-1, !0)),
          (e._zTime = t),
          !a)
        )
          n(e._startAt, le, le);
        else if (!t) return;
      }
      for (
        e._pt = e._ptCache = 0, l = (m && pt(l)) || (l && !m), M = 0;
        M < g.length;
        M++
      ) {
        if (
          ((S = g[M]),
          (D = S._gsap || aa(g)[M]._gsap),
          (e._ptLookup[M] = U = {}),
          mo[D.id] && Vr.length && Ss(),
          (L = T === g ? M : T.indexOf(S)),
          O &&
            (B = new O()).init(S, Y || y, e, L, T) !== !1 &&
            ((e._pt = C =
              new gt(e._pt, S, B.name, 0, 1, B.render, B, 0, B.priority)),
            B._props.forEach(function (z) {
              U[z] = C;
            }),
            B.priority && (A = 1)),
          !O || Y)
        )
          for (b in y)
            St[b] && (B = Xu(b, y, e, L, S, T))
              ? B.priority && (A = 1)
              : (U[b] = C =
                  ua.call(e, S, b, "get", y[b], L, T, 0, i.stringFilter));
        e._op && e._op[M] && e.kill(S, e._op[M]),
          w &&
            e._pt &&
            ((Pr = e),
            _e.killTweensOf(S, U, e.globalTime(t)),
            (F = !e.parent),
            (Pr = 0)),
          e._pt && l && (mo[D.id] = 1);
      }
      A && Zu(e), e._onInit && e._onInit(e);
    }
    (e._onUpdate = u),
      (e._initted = (!e._op || e._pt) && !F),
      d && t <= 0 && v.render(Nt, !0, !0);
  },
  Gh = function (e, t, r, i, s, o, a, l) {
    var u = ((e._pt && e._ptCache) || (e._ptCache = {}))[t],
      c,
      f,
      d,
      h;
    if (!u)
      for (
        u = e._ptCache[t] = [], d = e._ptLookup, h = e._targets.length;
        h--;

      ) {
        if (((c = d[h][t]), c && c.d && c.d._pt))
          for (c = c.d._pt; c && c.p !== t && c.fp !== t; ) c = c._next;
        if (!c)
          return (
            (bo = 1),
            (e.vars[t] = "+=0"),
            ca(e, a),
            (bo = 0),
            l ? Oi(t + " not eligible for reset") : 1
          );
        u.push(c);
      }
    for (h = u.length; h--; )
      (f = u[h]),
        (c = f._pt || f),
        (c.s = (i || i === 0) && !s ? i : c.s + (i || 0) + o * c.c),
        (c.c = r - c.s),
        f.e && (f.e = Pe(r) + Je(f.e)),
        f.b && (f.b = c.s + Je(f.b));
  },
  Hh = function (e, t) {
    var r = e[0] ? sn(e[0]).harness : 0,
      i = r && r.aliases,
      s,
      o,
      a,
      l;
    if (!i) return t;
    s = Ln({}, t);
    for (o in i)
      if (o in s) for (l = i[o].split(","), a = l.length; a--; ) s[l[a]] = s[o];
    return s;
  },
  qh = function (e, t, r, i) {
    var s = t.ease || i || "power1.inOut",
      o,
      a;
    if (tt(t))
      (a = r[e] || (r[e] = [])),
        t.forEach(function (l, u) {
          return a.push({ t: (u / (t.length - 1)) * 100, v: l, e: s });
        });
    else
      for (o in t)
        (a = r[o] || (r[o] = [])),
          o === "ease" || a.push({ t: parseFloat(e), v: t[o], e: s });
  },
  gi = function (e, t, r, i, s) {
    return we(e)
      ? e.call(t, r, i, s)
      : $e(e) && ~e.indexOf("random(")
      ? Ri(e)
      : e;
  },
  Ku = oa + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
  Gu = {};
mt(Ku + ",id,stagger,delay,duration,paused,scrollTrigger", function (n) {
  return (Gu[n] = 1);
});
var Fe = (function (n) {
  du(e, n);
  function e(r, i, s, o) {
    var a;
    typeof i == "number" && ((s.duration = i), (i = s), (s = null)),
      (a = n.call(this, o ? i : pi(i)) || this);
    var l = a.vars,
      u = l.duration,
      c = l.delay,
      f = l.immediateRender,
      d = l.stagger,
      h = l.overwrite,
      m = l.keyframes,
      p = l.defaults,
      g = l.scrollTrigger,
      x = l.yoyoEase,
      T = i.parent || _e,
      w = (tt(r) || mu(r) ? gr(r[0]) : "length" in i) ? [r] : Bt(r),
      v,
      y,
      M,
      b,
      C,
      S,
      A,
      D;
    if (
      ((a._targets = w.length
        ? aa(w)
        : Oi(
            "GSAP target " + r + " not found. https://gsap.com",
            !Ot.nullTargetWarn
          ) || []),
      (a._ptLookup = []),
      (a._overwrite = h),
      m || d || qi(u) || qi(c))
    ) {
      if (
        ((i = a.vars),
        (v = a.timeline =
          new ut({
            data: "nested",
            defaults: p || {},
            targets: T && T.data === "nested" ? T.vars.targets : w,
          })),
        v.kill(),
        (v.parent = v._dp = fr(a)),
        (v._start = 0),
        d || qi(u) || qi(c))
      ) {
        if (((b = w.length), (A = d && Ru(d)), sr(d)))
          for (C in d) ~Ku.indexOf(C) && (D || (D = {}), (D[C] = d[C]));
        for (y = 0; y < b; y++)
          (M = Cs(i, Gu)),
            (M.stagger = 0),
            x && (M.yoyoEase = x),
            D && Ln(M, D),
            (S = w[y]),
            (M.duration = +gi(u, fr(a), y, S, w)),
            (M.delay = (+gi(c, fr(a), y, S, w) || 0) - a._delay),
            !d &&
              b === 1 &&
              M.delay &&
              ((a._delay = c = M.delay), (a._start += c), (M.delay = 0)),
            v.to(S, M, A ? A(y, S, w) : 0),
            (v._ease = ee.none);
        v.duration() ? (u = c = 0) : (a.timeline = 0);
      } else if (m) {
        pi(Rt(v.vars.defaults, { ease: "none" })),
          (v._ease = an(m.ease || i.ease || "none"));
        var O = 0,
          B,
          U,
          L;
        if (tt(m))
          m.forEach(function (Y) {
            return v.to(w, Y, ">");
          }),
            v.duration();
        else {
          M = {};
          for (C in m)
            C === "ease" || C === "easeEach" || qh(C, m[C], M, m.easeEach);
          for (C in M)
            for (
              B = M[C].sort(function (Y, F) {
                return Y.t - F.t;
              }),
                O = 0,
                y = 0;
              y < B.length;
              y++
            )
              (U = B[y]),
                (L = {
                  ease: U.e,
                  duration: ((U.t - (y ? B[y - 1].t : 0)) / 100) * u,
                }),
                (L[C] = U.v),
                v.to(w, L, O),
                (O += L.duration);
          v.duration() < u && v.to({}, { duration: u - v.duration() });
        }
      }
      u || a.duration((u = v.duration()));
    } else a.timeline = 0;
    return (
      h === !0 && !ea && ((Pr = fr(a)), _e.killTweensOf(w), (Pr = 0)),
      er(T, fr(a), s),
      i.reversed && a.reverse(),
      i.paused && a.paused(!0),
      (f ||
        (!u &&
          !m &&
          a._start === ge(T._time) &&
          pt(f) &&
          kh(fr(a)) &&
          T.data !== "nested")) &&
        ((a._tTime = -le), a.render(Math.max(0, -c) || 0)),
      g && Au(fr(a), g),
      a
    );
  }
  var t = e.prototype;
  return (
    (t.render = function (i, s, o) {
      var a = this._time,
        l = this._tDur,
        u = this._dur,
        c = i < 0,
        f = i > l - le && !c ? l : i < le ? 0 : i,
        d,
        h,
        m,
        p,
        g,
        x,
        T,
        w,
        v;
      if (!u) Ph(this, i, s, o);
      else if (
        f !== this._tTime ||
        !i ||
        o ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 !== c) ||
        this._lazy
      ) {
        if (((d = f), (w = this.timeline), this._repeat)) {
          if (((p = u + this._rDelay), this._repeat < -1 && c))
            return this.totalTime(p * 100 + i, s, o);
          if (
            ((d = ge(f % p)),
            f === l
              ? ((m = this._repeat), (d = u))
              : ((g = ge(f / p)),
                (m = ~~g),
                m && m === g ? ((d = u), m--) : d > u && (d = u)),
            (x = this._yoyo && m & 1),
            x && ((v = this._yEase), (d = u - d)),
            (g = zn(this._tTime, p)),
            d === a && !o && this._initted && m === g)
          )
            return (this._tTime = f), this;
          m !== g &&
            (w && this._yEase && Uu(w, x),
            this.vars.repeatRefresh &&
              !x &&
              !this._lock &&
              d !== p &&
              this._initted &&
              ((this._lock = o = 1),
              (this.render(ge(p * m), !0).invalidate()._lock = 0)));
        }
        if (!this._initted) {
          if (Pu(this, c ? i : d, o, s, f)) return (this._tTime = 0), this;
          if (a !== this._time && !(o && this.vars.repeatRefresh && m !== g))
            return this;
          if (u !== this._dur) return this.render(i, s, o);
        }
        if (
          ((this._tTime = f),
          (this._time = d),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = T = (v || this._ease)(d / u)),
          this._from && (this.ratio = T = 1 - T),
          !a && f && !s && !g && (At(this, "onStart"), this._tTime !== f))
        )
          return this;
        for (h = this._pt; h; ) h.r(T, h.d), (h = h._next);
        (w && w.render(i < 0 ? i : w._dur * w._ease(d / this._dur), s, o)) ||
          (this._startAt && (this._zTime = i)),
          this._onUpdate &&
            !s &&
            (c && go(this, i, s, o), At(this, "onUpdate")),
          this._repeat &&
            m !== g &&
            this.vars.onRepeat &&
            !s &&
            this.parent &&
            At(this, "onRepeat"),
          (f === this._tDur || !f) &&
            this._tTime === f &&
            (c && !this._onUpdate && go(this, i, !0, !0),
            (i || !u) &&
              ((f === this._tDur && this._ts > 0) || (!f && this._ts < 0)) &&
              Br(this, 1),
            !s &&
              !(c && !a) &&
              (f || a || x) &&
              (At(this, f === l ? "onComplete" : "onReverseComplete", !0),
              this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
      }
      return this;
    }),
    (t.targets = function () {
      return this._targets;
    }),
    (t.invalidate = function (i) {
      return (
        (!i || !this.vars.runBackwards) && (this._startAt = 0),
        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(i),
        n.prototype.invalidate.call(this, i)
      );
    }),
    (t.resetTo = function (i, s, o, a, l) {
      Di || Mt.wake(), this._ts || this.play();
      var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        c;
      return (
        this._initted || ca(this, u),
        (c = this._ease(u / this._dur)),
        Gh(this, i, s, o, a, c, u, l)
          ? this.resetTo(i, s, o, a, 1)
          : (Ls(this, 0),
            this.parent ||
              Mu(
                this._dp,
                this,
                "_first",
                "_last",
                this._dp._sort ? "_start" : 0
              ),
            this.render(0))
      );
    }),
    (t.kill = function (i, s) {
      if ((s === void 0 && (s = "all"), !i && (!s || s === "all")))
        return (
          (this._lazy = this._pt = 0),
          this.parent
            ? si(this)
            : this.scrollTrigger && this.scrollTrigger.kill(!!Ke),
          this
        );
      if (this.timeline) {
        var o = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(i, s, Pr && Pr.vars.overwrite !== !0)
            ._first || si(this),
          this.parent &&
            o !== this.timeline.totalDuration() &&
            jn(this, (this._dur * this.timeline._tDur) / o, 0, 1),
          this
        );
      }
      var a = this._targets,
        l = i ? Bt(i) : a,
        u = this._ptLookup,
        c = this._pt,
        f,
        d,
        h,
        m,
        p,
        g,
        x;
      if ((!s || s === "all") && Ch(a, l))
        return s === "all" && (this._pt = 0), si(this);
      for (
        f = this._op = this._op || [],
          s !== "all" &&
            ($e(s) &&
              ((p = {}),
              mt(s, function (T) {
                return (p[T] = 1);
              }),
              (s = p)),
            (s = Hh(a, s))),
          x = a.length;
        x--;

      )
        if (~l.indexOf(a[x])) {
          (d = u[x]),
            s === "all"
              ? ((f[x] = s), (m = d), (h = {}))
              : ((h = f[x] = f[x] || {}), (m = s));
          for (p in m)
            (g = d && d[p]),
              g &&
                ((!("kill" in g.d) || g.d.kill(p) === !0) && Ns(this, g, "_pt"),
                delete d[p]),
              h !== "all" && (h[p] = 1);
        }
      return this._initted && !this._pt && c && si(this), this;
    }),
    (e.to = function (i, s) {
      return new e(i, s, arguments[2]);
    }),
    (e.from = function (i, s) {
      return mi(1, arguments);
    }),
    (e.delayedCall = function (i, s, o, a) {
      return new e(s, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: i,
        onComplete: s,
        onReverseComplete: s,
        onCompleteParams: o,
        onReverseCompleteParams: o,
        callbackScope: a,
      });
    }),
    (e.fromTo = function (i, s, o) {
      return mi(2, arguments);
    }),
    (e.set = function (i, s) {
      return (s.duration = 0), s.repeatDelay || (s.repeat = 0), new e(i, s);
    }),
    (e.killTweensOf = function (i, s, o) {
      return _e.killTweensOf(i, s, o);
    }),
    e
  );
})(Fi);
Rt(Fe.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
mt("staggerTo,staggerFrom,staggerFromTo", function (n) {
  Fe[n] = function () {
    var e = new ut(),
      t = yo.call(arguments, 0);
    return t.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), e[n].apply(e, t);
  };
});
var fa = function (e, t, r) {
    return (e[t] = r);
  },
  Hu = function (e, t, r) {
    return e[t](r);
  },
  Qh = function (e, t, r, i) {
    return e[t](i.fp, r);
  },
  Zh = function (e, t, r) {
    return e.setAttribute(t, r);
  },
  ha = function (e, t) {
    return we(e[t]) ? Hu : ta(e[t]) && e.setAttribute ? Zh : fa;
  },
  qu = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
  },
  Jh = function (e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t);
  },
  Qu = function (e, t) {
    var r = t._pt,
      i = "";
    if (!e && t.b) i = t.b;
    else if (e === 1 && t.e) i = t.e;
    else {
      for (; r; )
        (i =
          r.p +
          (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) +
          i),
          (r = r._next);
      i += t.c;
    }
    t.set(t.t, t.p, i, t);
  },
  da = function (e, t) {
    for (var r = t._pt; r; ) r.r(e, r.d), (r = r._next);
  },
  ed = function (e, t, r, i) {
    for (var s = this._pt, o; s; )
      (o = s._next), s.p === i && s.modifier(e, t, r), (s = o);
  },
  td = function (e) {
    for (var t = this._pt, r, i; t; )
      (i = t._next),
        (t.p === e && !t.op) || t.op === e
          ? Ns(this, t, "_pt")
          : t.dep || (r = 1),
        (t = i);
    return !r;
  },
  rd = function (e, t, r, i) {
    i.mSet(e, t, i.m.call(i.tween, r, i.mt), i);
  },
  Zu = function (e) {
    for (var t = e._pt, r, i, s, o; t; ) {
      for (r = t._next, i = s; i && i.pr > t.pr; ) i = i._next;
      (t._prev = i ? i._prev : o) ? (t._prev._next = t) : (s = t),
        (t._next = i) ? (i._prev = t) : (o = t),
        (t = r);
    }
    e._pt = s;
  },
  gt = (function () {
    function n(t, r, i, s, o, a, l, u, c) {
      (this.t = r),
        (this.s = s),
        (this.c = o),
        (this.p = i),
        (this.r = a || qu),
        (this.d = l || this),
        (this.set = u || fa),
        (this.pr = c || 0),
        (this._next = t),
        t && (t._prev = this);
    }
    var e = n.prototype;
    return (
      (e.modifier = function (r, i, s) {
        (this.mSet = this.mSet || this.set),
          (this.set = rd),
          (this.m = r),
          (this.mt = s),
          (this.tween = i);
      }),
      n
    );
  })();
mt(
  oa +
    "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
  function (n) {
    return (sa[n] = 1);
  }
);
Et.TweenMax = Et.TweenLite = Fe;
Et.TimelineLite = Et.TimelineMax = ut;
_e = new ut({
  sortChildren: !1,
  defaults: Bn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0,
});
Ot.stringFilter = ju;
var ln = [],
  ps = {},
  nd = [],
  ol = 0,
  id = 0,
  Ks = function (e) {
    return (ps[e] || nd).map(function (t) {
      return t();
    });
  },
  To = function () {
    var e = Date.now(),
      t = [];
    e - ol > 2 &&
      (Ks("matchMediaInit"),
      ln.forEach(function (r) {
        var i = r.queries,
          s = r.conditions,
          o,
          a,
          l,
          u;
        for (a in i)
          (o = Zt.matchMedia(i[a]).matches),
            o && (l = 1),
            o !== s[a] && ((s[a] = o), (u = 1));
        u && (r.revert(), l && t.push(r));
      }),
      Ks("matchMediaRevert"),
      t.forEach(function (r) {
        return r.onMatch(r, function (i) {
          return r.add(null, i);
        });
      }),
      (ol = e),
      Ks("matchMedia"));
  },
  Ju = (function () {
    function n(t, r) {
      (this.selector = r && xo(r)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = id++),
        t && this.add(t);
    }
    var e = n.prototype;
    return (
      (e.add = function (r, i, s) {
        we(r) && ((s = i), (i = r), (r = we));
        var o = this,
          a = function () {
            var u = he,
              c = o.selector,
              f;
            return (
              u && u !== o && u.data.push(o),
              s && (o.selector = xo(s)),
              (he = o),
              (f = i.apply(o, arguments)),
              we(f) && o._r.push(f),
              (he = u),
              (o.selector = c),
              (o.isReverted = !1),
              f
            );
          };
        return (
          (o.last = a),
          r === we
            ? a(o, function (l) {
                return o.add(null, l);
              })
            : r
            ? (o[r] = a)
            : a
        );
      }),
      (e.ignore = function (r) {
        var i = he;
        (he = null), r(this), (he = i);
      }),
      (e.getTweens = function () {
        var r = [];
        return (
          this.data.forEach(function (i) {
            return i instanceof n
              ? r.push.apply(r, i.getTweens())
              : i instanceof Fe &&
                  !(i.parent && i.parent.data === "nested") &&
                  r.push(i);
          }),
          r
        );
      }),
      (e.clear = function () {
        this._r.length = this.data.length = 0;
      }),
      (e.kill = function (r, i) {
        var s = this;
        if (
          (r
            ? (function () {
                for (var a = s.getTweens(), l = s.data.length, u; l--; )
                  (u = s.data[l]),
                    u.data === "isFlip" &&
                      (u.revert(),
                      u.getChildren(!0, !0, !1).forEach(function (c) {
                        return a.splice(a.indexOf(c), 1);
                      }));
                for (
                  a
                    .map(function (c) {
                      return {
                        g:
                          c._dur ||
                          c._delay ||
                          (c._sat && !c._sat.vars.immediateRender)
                            ? c.globalTime(0)
                            : -1 / 0,
                        t: c,
                      };
                    })
                    .sort(function (c, f) {
                      return f.g - c.g || -1 / 0;
                    })
                    .forEach(function (c) {
                      return c.t.revert(r);
                    }),
                    l = s.data.length;
                  l--;

                )
                  (u = s.data[l]),
                    u instanceof ut
                      ? u.data !== "nested" &&
                        (u.scrollTrigger && u.scrollTrigger.revert(), u.kill())
                      : !(u instanceof Fe) && u.revert && u.revert(r);
                s._r.forEach(function (c) {
                  return c(r, s);
                }),
                  (s.isReverted = !0);
              })()
            : this.data.forEach(function (a) {
                return a.kill && a.kill();
              }),
          this.clear(),
          i)
        )
          for (var o = ln.length; o--; )
            ln[o].id === this.id && ln.splice(o, 1);
      }),
      (e.revert = function (r) {
        this.kill(r || {});
      }),
      n
    );
  })(),
  sd = (function () {
    function n(t) {
      (this.contexts = []), (this.scope = t), he && he.data.push(this);
    }
    var e = n.prototype;
    return (
      (e.add = function (r, i, s) {
        sr(r) || (r = { matches: r });
        var o = new Ju(0, s || this.scope),
          a = (o.conditions = {}),
          l,
          u,
          c;
        he && !o.selector && (o.selector = he.selector),
          this.contexts.push(o),
          (i = o.add("onMatch", i)),
          (o.queries = r);
        for (u in r)
          u === "all"
            ? (c = 1)
            : ((l = Zt.matchMedia(r[u])),
              l &&
                (ln.indexOf(o) < 0 && ln.push(o),
                (a[u] = l.matches) && (c = 1),
                l.addListener
                  ? l.addListener(To)
                  : l.addEventListener("change", To)));
        return (
          c &&
            i(o, function (f) {
              return o.add(null, f);
            }),
          this
        );
      }),
      (e.revert = function (r) {
        this.kill(r || {});
      }),
      (e.kill = function (r) {
        this.contexts.forEach(function (i) {
          return i.kill(r, !0);
        });
      }),
      n
    );
  })(),
  ks = {
    registerPlugin: function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      t.forEach(function (i) {
        return Bu(i);
      });
    },
    timeline: function (e) {
      return new ut(e);
    },
    getTweensOf: function (e, t) {
      return _e.getTweensOf(e, t);
    },
    getProperty: function (e, t, r, i) {
      $e(e) && (e = Bt(e)[0]);
      var s = sn(e || {}).get,
        o = r ? Cu : Su;
      return (
        r === "native" && (r = ""),
        e &&
          (t
            ? o(((St[t] && St[t].get) || s)(e, t, r, i))
            : function (a, l, u) {
                return o(((St[a] && St[a].get) || s)(e, a, l, u));
              })
      );
    },
    quickSetter: function (e, t, r) {
      if (((e = Bt(e)), e.length > 1)) {
        var i = e.map(function (c) {
            return yt.quickSetter(c, t, r);
          }),
          s = i.length;
        return function (c) {
          for (var f = s; f--; ) i[f](c);
        };
      }
      e = e[0] || {};
      var o = St[t],
        a = sn(e),
        l = (a.harness && (a.harness.aliases || {})[t]) || t,
        u = o
          ? function (c) {
              var f = new o();
              (An._pt = 0),
                f.init(e, r ? c + r : c, An, 0, [e]),
                f.render(1, f),
                An._pt && da(1, An);
            }
          : a.set(e, l);
      return o
        ? u
        : function (c) {
            return u(e, l, r ? c + r : c, a, 1);
          };
    },
    quickTo: function (e, t, r) {
      var i,
        s = yt.to(
          e,
          Rt(
            ((i = {}), (i[t] = "+=0.1"), (i.paused = !0), (i.stagger = 0), i),
            r || {}
          )
        ),
        o = function (l, u, c) {
          return s.resetTo(t, l, u, c);
        };
      return (o.tween = s), o;
    },
    isTweening: function (e) {
      return _e.getTweensOf(e, !0).length > 0;
    },
    defaults: function (e) {
      return e && e.ease && (e.ease = an(e.ease, Bn.ease)), tl(Bn, e || {});
    },
    config: function (e) {
      return tl(Ot, e || {});
    },
    registerEffect: function (e) {
      var t = e.name,
        r = e.effect,
        i = e.plugins,
        s = e.defaults,
        o = e.extendTimeline;
      (i || "").split(",").forEach(function (a) {
        return (
          a && !St[a] && !Et[a] && Oi(t + " effect requires " + a + " plugin.")
        );
      }),
        (Us[t] = function (a, l, u) {
          return r(Bt(a), Rt(l || {}, s), u);
        }),
        o &&
          (ut.prototype[t] = function (a, l, u) {
            return this.add(Us[t](a, sr(l) ? l : (u = l) && {}, this), u);
          });
    },
    registerEase: function (e, t) {
      ee[e] = an(t);
    },
    parseEase: function (e, t) {
      return arguments.length ? an(e, t) : ee;
    },
    getById: function (e) {
      return _e.getById(e);
    },
    exportRoot: function (e, t) {
      e === void 0 && (e = {});
      var r = new ut(e),
        i,
        s;
      for (
        r.smoothChildTiming = pt(e.smoothChildTiming),
          _e.remove(r),
          r._dp = 0,
          r._time = r._tTime = _e._time,
          i = _e._first;
        i;

      )
        (s = i._next),
          (t ||
            !(
              !i._dur &&
              i instanceof Fe &&
              i.vars.onComplete === i._targets[0]
            )) &&
            er(r, i, i._start - i._delay),
          (i = s);
      return er(_e, r, 0), r;
    },
    context: function (e, t) {
      return e ? new Ju(e, t) : he;
    },
    matchMedia: function (e) {
      return new sd(e);
    },
    matchMediaRefresh: function () {
      return (
        ln.forEach(function (e) {
          var t = e.conditions,
            r,
            i;
          for (i in t) t[i] && ((t[i] = !1), (r = 1));
          r && e.revert();
        }) || To()
      );
    },
    addEventListener: function (e, t) {
      var r = ps[e] || (ps[e] = []);
      ~r.indexOf(t) || r.push(t);
    },
    removeEventListener: function (e, t) {
      var r = ps[e],
        i = r && r.indexOf(t);
      i >= 0 && r.splice(i, 1);
    },
    utils: {
      wrap: Nh,
      wrapYoyo: Bh,
      distribute: Ru,
      random: Fu,
      snap: Du,
      normalize: Ih,
      getUnit: Je,
      clamp: Rh,
      splitColor: Lu,
      toArray: Bt,
      selector: xo,
      mapRange: Iu,
      pipe: Fh,
      unitize: Vh,
      interpolate: Lh,
      shuffle: Eu,
    },
    install: xu,
    effects: Us,
    ticker: Mt,
    updateRoot: ut.updateRoot,
    plugins: St,
    globalTimeline: _e,
    core: {
      PropTween: gt,
      globals: vu,
      Tween: Fe,
      Timeline: ut,
      Animation: Fi,
      getCache: sn,
      _removeLinkedListItem: Ns,
      reverting: function () {
        return Ke;
      },
      context: function (e) {
        return e && he && (he.data.push(e), (e._ctx = he)), he;
      },
      suppressOverwrites: function (e) {
        return (ea = e);
      },
    },
  };
mt("to,from,fromTo,delayedCall,set,killTweensOf", function (n) {
  return (ks[n] = Fe[n]);
});
Mt.add(ut.updateRoot);
An = ks.to({}, { duration: 0 });
var od = function (e, t) {
    for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
      r = r._next;
    return r;
  },
  ad = function (e, t) {
    var r = e._targets,
      i,
      s,
      o;
    for (i in t)
      for (s = r.length; s--; )
        (o = e._ptLookup[s][i]),
          o &&
            (o = o.d) &&
            (o._pt && (o = od(o, i)),
            o && o.modifier && o.modifier(t[i], e, r[s], i));
  },
  Gs = function (e, t) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function (i, s, o) {
        o._onInit = function (a) {
          var l, u;
          if (
            ($e(s) &&
              ((l = {}),
              mt(s, function (c) {
                return (l[c] = 1);
              }),
              (s = l)),
            t)
          ) {
            l = {};
            for (u in s) l[u] = t(s[u]);
            s = l;
          }
          ad(a, s);
        };
      },
    };
  },
  yt =
    ks.registerPlugin(
      {
        name: "attr",
        init: function (e, t, r, i, s) {
          var o, a, l;
          this.tween = r;
          for (o in t)
            (l = e.getAttribute(o) || ""),
              (a = this.add(
                e,
                "setAttribute",
                (l || 0) + "",
                t[o],
                i,
                s,
                0,
                0,
                o
              )),
              (a.op = o),
              (a.b = l),
              this._props.push(o);
        },
        render: function (e, t) {
          for (var r = t._pt; r; )
            Ke ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), (r = r._next);
        },
      },
      {
        name: "endArray",
        headless: 1,
        init: function (e, t) {
          for (var r = t.length; r--; )
            this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
        },
      },
      Gs("roundProps", vo),
      Gs("modifiers"),
      Gs("snap", Du)
    ) || ks;
Fe.version = ut.version = yt.version = "3.14.2";
yu = 1;
ra() && $n();
ee.Power0;
ee.Power1;
ee.Power2;
ee.Power3;
ee.Power4;
ee.Linear;
ee.Quad;
ee.Cubic;
ee.Quart;
ee.Quint;
ee.Strong;
ee.Elastic;
ee.Back;
ee.SteppedEase;
ee.Bounce;
ee.Sine;
ee.Expo;
ee.Circ;
var al,
  Or,
  Rn,
  pa,
  en,
  ll,
  ma,
  ld = function () {
    return typeof window < "u";
  },
  _r = {},
  Qr = 180 / Math.PI,
  Dn = Math.PI / 180,
  Tn = Math.atan2,
  ul = 1e8,
  ga = /([A-Z])/g,
  ud = /(left|right|width|margin|padding|x)/i,
  cd = /[\s,\(]\S/,
  tr = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity",
  },
  wo = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
  },
  fd = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
      t
    );
  },
  hd = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  dd = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  pd = function (e, t) {
    var r = t.s + t.c * e;
    t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
  },
  ec = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t);
  },
  tc = function (e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
  },
  md = function (e, t, r) {
    return (e.style[t] = r);
  },
  gd = function (e, t, r) {
    return e.style.setProperty(t, r);
  },
  _d = function (e, t, r) {
    return (e._gsap[t] = r);
  },
  yd = function (e, t, r) {
    return (e._gsap.scaleX = e._gsap.scaleY = r);
  },
  xd = function (e, t, r, i, s) {
    var o = e._gsap;
    (o.scaleX = o.scaleY = r), o.renderTransform(s, o);
  },
  vd = function (e, t, r, i, s) {
    var o = e._gsap;
    (o[t] = r), o.renderTransform(s, o);
  },
  ye = "transform",
  _t = ye + "Origin",
  bd = function n(e, t) {
    var r = this,
      i = this.target,
      s = i.style,
      o = i._gsap;
    if (e in _r && s) {
      if (((this.tfm = this.tfm || {}), e !== "transform"))
        (e = tr[e] || e),
          ~e.indexOf(",")
            ? e.split(",").forEach(function (a) {
                return (r.tfm[a] = hr(i, a));
              })
            : (this.tfm[e] = o.x ? o[e] : hr(i, e)),
          e === _t && (this.tfm.zOrigin = o.zOrigin);
      else
        return tr.transform.split(",").forEach(function (a) {
          return n.call(r, a, t);
        });
      if (this.props.indexOf(ye) >= 0) return;
      o.svg &&
        ((this.svgo = i.getAttribute("data-svg-origin")),
        this.props.push(_t, t, "")),
        (e = ye);
    }
    (s || t) && this.props.push(e, t, s[e]);
  },
  rc = function (e) {
    e.translate &&
      (e.removeProperty("translate"),
      e.removeProperty("scale"),
      e.removeProperty("rotate"));
  },
  Td = function () {
    var e = this.props,
      t = this.target,
      r = t.style,
      i = t._gsap,
      s,
      o;
    for (s = 0; s < e.length; s += 3)
      e[s + 1]
        ? e[s + 1] === 2
          ? t[e[s]](e[s + 2])
          : (t[e[s]] = e[s + 2])
        : e[s + 2]
        ? (r[e[s]] = e[s + 2])
        : r.removeProperty(
            e[s].substr(0, 2) === "--"
              ? e[s]
              : e[s].replace(ga, "-$1").toLowerCase()
          );
    if (this.tfm) {
      for (o in this.tfm) i[o] = this.tfm[o];
      i.svg &&
        (i.renderTransform(),
        t.setAttribute("data-svg-origin", this.svgo || "")),
        (s = ma()),
        (!s || !s.isStart) &&
          !r[ye] &&
          (rc(r),
          i.zOrigin &&
            r[_t] &&
            ((r[_t] += " " + i.zOrigin + "px"),
            (i.zOrigin = 0),
            i.renderTransform()),
          (i.uncache = 1));
    }
  },
  nc = function (e, t) {
    var r = { target: e, props: [], revert: Td, save: bd };
    return (
      e._gsap || yt.core.getCache(e),
      t &&
        e.style &&
        e.nodeType &&
        t.split(",").forEach(function (i) {
          return r.save(i);
        }),
      r
    );
  },
  ic,
  So = function (e, t) {
    var r = Or.createElementNS
      ? Or.createElementNS(
          (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          e
        )
      : Or.createElement(e);
    return r && r.style ? r : Or.createElement(e);
  },
  Pt = function n(e, t, r) {
    var i = getComputedStyle(e);
    return (
      i[t] ||
      i.getPropertyValue(t.replace(ga, "-$1").toLowerCase()) ||
      i.getPropertyValue(t) ||
      (!r && n(e, Un(t) || t, 1)) ||
      ""
    );
  },
  cl = "O,Moz,ms,Ms,Webkit".split(","),
  Un = function (e, t, r) {
    var i = t || en,
      s = i.style,
      o = 5;
    if (e in s && !r) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      o-- && !(cl[o] + e in s);

    );
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? cl[o] : "") + e;
  },
  Co = function () {
    ld() &&
      window.document &&
      ((al = window),
      (Or = al.document),
      (Rn = Or.documentElement),
      (en = So("div") || { style: {} }),
      So("div"),
      (ye = Un(ye)),
      (_t = ye + "Origin"),
      (en.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (ic = !!Un("perspective")),
      (ma = yt.core.reverting),
      (pa = 1));
  },
  fl = function (e) {
    var t = e.ownerSVGElement,
      r = So(
        "svg",
        (t && t.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"
      ),
      i = e.cloneNode(!0),
      s;
    (i.style.display = "block"), r.appendChild(i), Rn.appendChild(r);
    try {
      s = i.getBBox();
    } catch {}
    return r.removeChild(i), Rn.removeChild(r), s;
  },
  hl = function (e, t) {
    for (var r = t.length; r--; )
      if (e.hasAttribute(t[r])) return e.getAttribute(t[r]);
  },
  sc = function (e) {
    var t, r;
    try {
      t = e.getBBox();
    } catch {
      (t = fl(e)), (r = 1);
    }
    return (
      (t && (t.width || t.height)) || r || (t = fl(e)),
      t && !t.width && !t.x && !t.y
        ? {
            x: +hl(e, ["x", "cx", "x1"]) || 0,
            y: +hl(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
        : t
    );
  },
  oc = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && sc(e));
  },
  Lr = function (e, t) {
    if (t) {
      var r = e.style,
        i;
      t in _r && t !== _t && (t = ye),
        r.removeProperty
          ? ((i = t.substr(0, 2)),
            (i === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t),
            r.removeProperty(
              i === "--" ? t : t.replace(ga, "-$1").toLowerCase()
            ))
          : r.removeAttribute(t);
    }
  },
  Er = function (e, t, r, i, s, o) {
    var a = new gt(e._pt, t, r, 0, 1, o ? tc : ec);
    return (e._pt = a), (a.b = i), (a.e = s), e._props.push(r), a;
  },
  dl = { deg: 1, rad: 1, turn: 1 },
  wd = { grid: 1, flex: 1 },
  zr = function n(e, t, r, i) {
    var s = parseFloat(r) || 0,
      o = (r + "").trim().substr((s + "").length) || "px",
      a = en.style,
      l = ud.test(t),
      u = e.tagName.toLowerCase() === "svg",
      c = (u ? "client" : "offset") + (l ? "Width" : "Height"),
      f = 100,
      d = i === "px",
      h = i === "%",
      m,
      p,
      g,
      x;
    if (i === o || !s || dl[i] || dl[o]) return s;
    if (
      (o !== "px" && !d && (s = n(e, t, r, "px")),
      (x = e.getCTM && oc(e)),
      (h || o === "%") && (_r[t] || ~t.indexOf("adius")))
    )
      return (
        (m = x ? e.getBBox()[l ? "width" : "height"] : e[c]),
        Pe(h ? (s / m) * f : (s / 100) * m)
      );
    if (
      ((a[l ? "width" : "height"] = f + (d ? o : i)),
      (p =
        (i !== "rem" && ~t.indexOf("adius")) ||
        (i === "em" && e.appendChild && !u)
          ? e
          : e.parentNode),
      x && (p = (e.ownerSVGElement || {}).parentNode),
      (!p || p === Or || !p.appendChild) && (p = Or.body),
      (g = p._gsap),
      g && h && g.width && l && g.time === Mt.time && !g.uncache)
    )
      return Pe((s / g.width) * f);
    if (h && (t === "height" || t === "width")) {
      var T = e.style[t];
      (e.style[t] = f + i), (m = e[c]), T ? (e.style[t] = T) : Lr(e, t);
    } else
      (h || o === "%") &&
        !wd[Pt(p, "display")] &&
        (a.position = Pt(e, "position")),
        p === e && (a.position = "static"),
        p.appendChild(en),
        (m = en[c]),
        p.removeChild(en),
        (a.position = "absolute");
    return (
      l && h && ((g = sn(p)), (g.time = Mt.time), (g.width = p[c])),
      Pe(d ? (m * s) / f : m && s ? (f / m) * s : 0)
    );
  },
  hr = function (e, t, r, i) {
    var s;
    return (
      pa || Co(),
      t in tr &&
        t !== "transform" &&
        ((t = tr[t]), ~t.indexOf(",") && (t = t.split(",")[0])),
      _r[t] && t !== "transform"
        ? ((s = Ii(e, i)),
          (s =
            t !== "transformOrigin"
              ? s[t]
              : s.svg
              ? s.origin
              : Ps(Pt(e, _t)) + " " + s.zOrigin + "px"))
        : ((s = e.style[t]),
          (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) &&
            (s =
              (As[t] && As[t](e, t, r)) ||
              Pt(e, t) ||
              Tu(e, t) ||
              (t === "opacity" ? 1 : 0))),
      r && !~(s + "").trim().indexOf(" ") ? zr(e, t, s, r) + r : s
    );
  },
  Sd = function (e, t, r, i) {
    if (!r || r === "none") {
      var s = Un(t, e, 1),
        o = s && Pt(e, s, 1);
      o && o !== r
        ? ((t = s), (r = o))
        : t === "borderColor" && (r = Pt(e, "borderTopColor"));
    }
    var a = new gt(this._pt, e.style, t, 0, 1, Qu),
      l = 0,
      u = 0,
      c,
      f,
      d,
      h,
      m,
      p,
      g,
      x,
      T,
      w,
      v,
      y;
    if (
      ((a.b = r),
      (a.e = i),
      (r += ""),
      (i += ""),
      i.substring(0, 6) === "var(--" &&
        (i = Pt(e, i.substring(4, i.indexOf(")")))),
      i === "auto" &&
        ((p = e.style[t]),
        (e.style[t] = i),
        (i = Pt(e, t) || i),
        p ? (e.style[t] = p) : Lr(e, t)),
      (c = [r, i]),
      ju(c),
      (r = c[0]),
      (i = c[1]),
      (d = r.match(kn) || []),
      (y = i.match(kn) || []),
      y.length)
    ) {
      for (; (f = kn.exec(i)); )
        (g = f[0]),
          (T = i.substring(l, f.index)),
          m
            ? (m = (m + 1) % 5)
            : (T.substr(-5) === "rgba(" || T.substr(-5) === "hsla(") && (m = 1),
          g !== (p = d[u++] || "") &&
            ((h = parseFloat(p) || 0),
            (v = p.substr((h + "").length)),
            g.charAt(1) === "=" && (g = En(h, g) + v),
            (x = parseFloat(g)),
            (w = g.substr((x + "").length)),
            (l = kn.lastIndex - w.length),
            w ||
              ((w = w || Ot.units[t] || v),
              l === i.length && ((i += w), (a.e += w))),
            v !== w && (h = zr(e, t, p, w) || 0),
            (a._pt = {
              _next: a._pt,
              p: T || u === 1 ? T : ",",
              s: h,
              c: x - h,
              m: (m && m < 4) || t === "zIndex" ? Math.round : 0,
            }));
      a.c = l < i.length ? i.substring(l, i.length) : "";
    } else a.r = t === "display" && i === "none" ? tc : ec;
    return _u.test(i) && (a.e = 0), (this._pt = a), a;
  },
  pl = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
  Cd = function (e) {
    var t = e.split(" "),
      r = t[0],
      i = t[1] || "50%";
    return (
      (r === "top" || r === "bottom" || i === "left" || i === "right") &&
        ((e = r), (r = i), (i = e)),
      (t[0] = pl[r] || r),
      (t[1] = pl[i] || i),
      t.join(" ")
    );
  },
  Md = function (e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
      var r = t.t,
        i = r.style,
        s = t.u,
        o = r._gsap,
        a,
        l,
        u;
      if (s === "all" || s === !0) (i.cssText = ""), (l = 1);
      else
        for (s = s.split(","), u = s.length; --u > -1; )
          (a = s[u]),
            _r[a] && ((l = 1), (a = a === "transformOrigin" ? _t : ye)),
            Lr(r, a);
      l &&
        (Lr(r, ye),
        o &&
          (o.svg && r.removeAttribute("transform"),
          (i.scale = i.rotate = i.translate = "none"),
          Ii(r, 1),
          (o.uncache = 1),
          rc(i)));
    }
  },
  As = {
    clearProps: function (e, t, r, i, s) {
      if (s.data !== "isFromStart") {
        var o = (e._pt = new gt(e._pt, t, r, 0, 0, Md));
        return (o.u = i), (o.pr = -10), (o.tween = s), e._props.push(r), 1;
      }
    },
  },
  Vi = [1, 0, 0, 1, 0, 0],
  ac = {},
  lc = function (e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
  },
  ml = function (e) {
    var t = Pt(e, ye);
    return lc(t) ? Vi : t.substr(7).match(gu).map(Pe);
  },
  _a = function (e, t) {
    var r = e._gsap || sn(e),
      i = e.style,
      s = ml(e),
      o,
      a,
      l,
      u;
    return r.svg && e.getAttribute("transform")
      ? ((l = e.transform.baseVal.consolidate().matrix),
        (s = [l.a, l.b, l.c, l.d, l.e, l.f]),
        s.join(",") === "1,0,0,1,0,0" ? Vi : s)
      : (s === Vi &&
          !e.offsetParent &&
          e !== Rn &&
          !r.svg &&
          ((l = i.display),
          (i.display = "block"),
          (o = e.parentNode),
          (!o || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
            ((u = 1), (a = e.nextElementSibling), Rn.appendChild(e)),
          (s = ml(e)),
          l ? (i.display = l) : Lr(e, "display"),
          u &&
            (a
              ? o.insertBefore(e, a)
              : o
              ? o.appendChild(e)
              : Rn.removeChild(e))),
        t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
  },
  Mo = function (e, t, r, i, s, o) {
    var a = e._gsap,
      l = s || _a(e, !0),
      u = a.xOrigin || 0,
      c = a.yOrigin || 0,
      f = a.xOffset || 0,
      d = a.yOffset || 0,
      h = l[0],
      m = l[1],
      p = l[2],
      g = l[3],
      x = l[4],
      T = l[5],
      w = t.split(" "),
      v = parseFloat(w[0]) || 0,
      y = parseFloat(w[1]) || 0,
      M,
      b,
      C,
      S;
    r
      ? l !== Vi &&
        (b = h * g - m * p) &&
        ((C = v * (g / b) + y * (-p / b) + (p * T - g * x) / b),
        (S = v * (-m / b) + y * (h / b) - (h * T - m * x) / b),
        (v = C),
        (y = S))
      : ((M = sc(e)),
        (v = M.x + (~w[0].indexOf("%") ? (v / 100) * M.width : v)),
        (y = M.y + (~(w[1] || w[0]).indexOf("%") ? (y / 100) * M.height : y))),
      i || (i !== !1 && a.smooth)
        ? ((x = v - u),
          (T = y - c),
          (a.xOffset = f + (x * h + T * p) - x),
          (a.yOffset = d + (x * m + T * g) - T))
        : (a.xOffset = a.yOffset = 0),
      (a.xOrigin = v),
      (a.yOrigin = y),
      (a.smooth = !!i),
      (a.origin = t),
      (a.originIsAbsolute = !!r),
      (e.style[_t] = "0px 0px"),
      o &&
        (Er(o, a, "xOrigin", u, v),
        Er(o, a, "yOrigin", c, y),
        Er(o, a, "xOffset", f, a.xOffset),
        Er(o, a, "yOffset", d, a.yOffset)),
      e.setAttribute("data-svg-origin", v + " " + y);
  },
  Ii = function (e, t) {
    var r = e._gsap || new Yu(e);
    if ("x" in r && !t && !r.uncache) return r;
    var i = e.style,
      s = r.scaleX < 0,
      o = "px",
      a = "deg",
      l = getComputedStyle(e),
      u = Pt(e, _t) || "0",
      c,
      f,
      d,
      h,
      m,
      p,
      g,
      x,
      T,
      w,
      v,
      y,
      M,
      b,
      C,
      S,
      A,
      D,
      O,
      B,
      U,
      L,
      Y,
      F,
      z,
      ie,
      _,
      Q,
      de,
      Ue,
      te,
      pe;
    return (
      (c = f = d = p = g = x = T = w = v = 0),
      (h = m = 1),
      (r.svg = !!(e.getCTM && oc(e))),
      l.translate &&
        ((l.translate !== "none" ||
          l.scale !== "none" ||
          l.rotate !== "none") &&
          (i[ye] =
            (l.translate !== "none"
              ? "translate3d(" +
                (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                ") "
              : "") +
            (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") +
            (l.scale !== "none"
              ? "scale(" + l.scale.split(" ").join(",") + ") "
              : "") +
            (l[ye] !== "none" ? l[ye] : "")),
        (i.scale = i.rotate = i.translate = "none")),
      (b = _a(e, r.svg)),
      r.svg &&
        (r.uncache
          ? ((z = e.getBBox()),
            (u = r.xOrigin - z.x + "px " + (r.yOrigin - z.y) + "px"),
            (F = ""))
          : (F = !t && e.getAttribute("data-svg-origin")),
        Mo(e, F || u, !!F || r.originIsAbsolute, r.smooth !== !1, b)),
      (y = r.xOrigin || 0),
      (M = r.yOrigin || 0),
      b !== Vi &&
        ((D = b[0]),
        (O = b[1]),
        (B = b[2]),
        (U = b[3]),
        (c = L = b[4]),
        (f = Y = b[5]),
        b.length === 6
          ? ((h = Math.sqrt(D * D + O * O)),
            (m = Math.sqrt(U * U + B * B)),
            (p = D || O ? Tn(O, D) * Qr : 0),
            (T = B || U ? Tn(B, U) * Qr + p : 0),
            T && (m *= Math.abs(Math.cos(T * Dn))),
            r.svg && ((c -= y - (y * D + M * B)), (f -= M - (y * O + M * U))))
          : ((pe = b[6]),
            (Ue = b[7]),
            (_ = b[8]),
            (Q = b[9]),
            (de = b[10]),
            (te = b[11]),
            (c = b[12]),
            (f = b[13]),
            (d = b[14]),
            (C = Tn(pe, de)),
            (g = C * Qr),
            C &&
              ((S = Math.cos(-C)),
              (A = Math.sin(-C)),
              (F = L * S + _ * A),
              (z = Y * S + Q * A),
              (ie = pe * S + de * A),
              (_ = L * -A + _ * S),
              (Q = Y * -A + Q * S),
              (de = pe * -A + de * S),
              (te = Ue * -A + te * S),
              (L = F),
              (Y = z),
              (pe = ie)),
            (C = Tn(-B, de)),
            (x = C * Qr),
            C &&
              ((S = Math.cos(-C)),
              (A = Math.sin(-C)),
              (F = D * S - _ * A),
              (z = O * S - Q * A),
              (ie = B * S - de * A),
              (te = U * A + te * S),
              (D = F),
              (O = z),
              (B = ie)),
            (C = Tn(O, D)),
            (p = C * Qr),
            C &&
              ((S = Math.cos(C)),
              (A = Math.sin(C)),
              (F = D * S + O * A),
              (z = L * S + Y * A),
              (O = O * S - D * A),
              (Y = Y * S - L * A),
              (D = F),
              (L = z)),
            g &&
              Math.abs(g) + Math.abs(p) > 359.9 &&
              ((g = p = 0), (x = 180 - x)),
            (h = Pe(Math.sqrt(D * D + O * O + B * B))),
            (m = Pe(Math.sqrt(Y * Y + pe * pe))),
            (C = Tn(L, Y)),
            (T = Math.abs(C) > 2e-4 ? C * Qr : 0),
            (v = te ? 1 / (te < 0 ? -te : te) : 0)),
        r.svg &&
          ((F = e.getAttribute("transform")),
          (r.forceCSS = e.setAttribute("transform", "") || !lc(Pt(e, ye))),
          F && e.setAttribute("transform", F))),
      Math.abs(T) > 90 &&
        Math.abs(T) < 270 &&
        (s
          ? ((h *= -1), (T += p <= 0 ? 180 : -180), (p += p <= 0 ? 180 : -180))
          : ((m *= -1), (T += T <= 0 ? 180 : -180))),
      (t = t || r.uncache),
      (r.x =
        c -
        ((r.xPercent =
          c &&
          ((!t && r.xPercent) ||
            (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0)))
          ? (e.offsetWidth * r.xPercent) / 100
          : 0) +
        o),
      (r.y =
        f -
        ((r.yPercent =
          f &&
          ((!t && r.yPercent) ||
            (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0)))
          ? (e.offsetHeight * r.yPercent) / 100
          : 0) +
        o),
      (r.z = d + o),
      (r.scaleX = Pe(h)),
      (r.scaleY = Pe(m)),
      (r.rotation = Pe(p) + a),
      (r.rotationX = Pe(g) + a),
      (r.rotationY = Pe(x) + a),
      (r.skewX = T + a),
      (r.skewY = w + a),
      (r.transformPerspective = v + o),
      (r.zOrigin = parseFloat(u.split(" ")[2]) || (!t && r.zOrigin) || 0) &&
        (i[_t] = Ps(u)),
      (r.xOffset = r.yOffset = 0),
      (r.force3D = Ot.force3D),
      (r.renderTransform = r.svg ? Ad : ic ? uc : kd),
      (r.uncache = 0),
      r
    );
  },
  Ps = function (e) {
    return (e = e.split(" "))[0] + " " + e[1];
  },
  Hs = function (e, t, r) {
    var i = Je(t);
    return Pe(parseFloat(t) + parseFloat(zr(e, "x", r + "px", i))) + i;
  },
  kd = function (e, t) {
    (t.z = "0px"),
      (t.rotationY = t.rotationX = "0deg"),
      (t.force3D = 0),
      uc(e, t);
  },
  Hr = "0deg",
  ti = "0px",
  qr = ") ",
  uc = function (e, t) {
    var r = t || this,
      i = r.xPercent,
      s = r.yPercent,
      o = r.x,
      a = r.y,
      l = r.z,
      u = r.rotation,
      c = r.rotationY,
      f = r.rotationX,
      d = r.skewX,
      h = r.skewY,
      m = r.scaleX,
      p = r.scaleY,
      g = r.transformPerspective,
      x = r.force3D,
      T = r.target,
      w = r.zOrigin,
      v = "",
      y = (x === "auto" && e && e !== 1) || x === !0;
    if (w && (f !== Hr || c !== Hr)) {
      var M = parseFloat(c) * Dn,
        b = Math.sin(M),
        C = Math.cos(M),
        S;
      (M = parseFloat(f) * Dn),
        (S = Math.cos(M)),
        (o = Hs(T, o, b * S * -w)),
        (a = Hs(T, a, -Math.sin(M) * -w)),
        (l = Hs(T, l, C * S * -w + w));
    }
    g !== ti && (v += "perspective(" + g + qr),
      (i || s) && (v += "translate(" + i + "%, " + s + "%) "),
      (y || o !== ti || a !== ti || l !== ti) &&
        (v +=
          l !== ti || y
            ? "translate3d(" + o + ", " + a + ", " + l + ") "
            : "translate(" + o + ", " + a + qr),
      u !== Hr && (v += "rotate(" + u + qr),
      c !== Hr && (v += "rotateY(" + c + qr),
      f !== Hr && (v += "rotateX(" + f + qr),
      (d !== Hr || h !== Hr) && (v += "skew(" + d + ", " + h + qr),
      (m !== 1 || p !== 1) && (v += "scale(" + m + ", " + p + qr),
      (T.style[ye] = v || "translate(0, 0)");
  },
  Ad = function (e, t) {
    var r = t || this,
      i = r.xPercent,
      s = r.yPercent,
      o = r.x,
      a = r.y,
      l = r.rotation,
      u = r.skewX,
      c = r.skewY,
      f = r.scaleX,
      d = r.scaleY,
      h = r.target,
      m = r.xOrigin,
      p = r.yOrigin,
      g = r.xOffset,
      x = r.yOffset,
      T = r.forceCSS,
      w = parseFloat(o),
      v = parseFloat(a),
      y,
      M,
      b,
      C,
      S;
    (l = parseFloat(l)),
      (u = parseFloat(u)),
      (c = parseFloat(c)),
      c && ((c = parseFloat(c)), (u += c), (l += c)),
      l || u
        ? ((l *= Dn),
          (u *= Dn),
          (y = Math.cos(l) * f),
          (M = Math.sin(l) * f),
          (b = Math.sin(l - u) * -d),
          (C = Math.cos(l - u) * d),
          u &&
            ((c *= Dn),
            (S = Math.tan(u - c)),
            (S = Math.sqrt(1 + S * S)),
            (b *= S),
            (C *= S),
            c &&
              ((S = Math.tan(c)),
              (S = Math.sqrt(1 + S * S)),
              (y *= S),
              (M *= S))),
          (y = Pe(y)),
          (M = Pe(M)),
          (b = Pe(b)),
          (C = Pe(C)))
        : ((y = f), (C = d), (M = b = 0)),
      ((w && !~(o + "").indexOf("px")) || (v && !~(a + "").indexOf("px"))) &&
        ((w = zr(h, "x", o, "px")), (v = zr(h, "y", a, "px"))),
      (m || p || g || x) &&
        ((w = Pe(w + m - (m * y + p * b) + g)),
        (v = Pe(v + p - (m * M + p * C) + x))),
      (i || s) &&
        ((S = h.getBBox()),
        (w = Pe(w + (i / 100) * S.width)),
        (v = Pe(v + (s / 100) * S.height))),
      (S =
        "matrix(" + y + "," + M + "," + b + "," + C + "," + w + "," + v + ")"),
      h.setAttribute("transform", S),
      T && (h.style[ye] = S);
  },
  Pd = function (e, t, r, i, s) {
    var o = 360,
      a = $e(s),
      l = parseFloat(s) * (a && ~s.indexOf("rad") ? Qr : 1),
      u = l - i,
      c = i + u + "deg",
      f,
      d;
    return (
      a &&
        ((f = s.split("_")[1]),
        f === "short" && ((u %= o), u !== u % (o / 2) && (u += u < 0 ? o : -o)),
        f === "cw" && u < 0
          ? (u = ((u + o * ul) % o) - ~~(u / o) * o)
          : f === "ccw" && u > 0 && (u = ((u - o * ul) % o) - ~~(u / o) * o)),
      (e._pt = d = new gt(e._pt, t, r, i, u, fd)),
      (d.e = c),
      (d.u = "deg"),
      e._props.push(r),
      d
    );
  },
  gl = function (e, t) {
    for (var r in t) e[r] = t[r];
    return e;
  },
  Od = function (e, t, r) {
    var i = gl({}, r._gsap),
      s = "perspective,force3D,transformOrigin,svgOrigin",
      o = r.style,
      a,
      l,
      u,
      c,
      f,
      d,
      h,
      m;
    i.svg
      ? ((u = r.getAttribute("transform")),
        r.setAttribute("transform", ""),
        (o[ye] = t),
        (a = Ii(r, 1)),
        Lr(r, ye),
        r.setAttribute("transform", u))
      : ((u = getComputedStyle(r)[ye]),
        (o[ye] = t),
        (a = Ii(r, 1)),
        (o[ye] = u));
    for (l in _r)
      (u = i[l]),
        (c = a[l]),
        u !== c &&
          s.indexOf(l) < 0 &&
          ((h = Je(u)),
          (m = Je(c)),
          (f = h !== m ? zr(r, l, u, m) : parseFloat(u)),
          (d = parseFloat(c)),
          (e._pt = new gt(e._pt, a, l, f, d - f, wo)),
          (e._pt.u = m || 0),
          e._props.push(l));
    gl(a, i);
  };
mt("padding,margin,Width,Radius", function (n, e) {
  var t = "Top",
    r = "Right",
    i = "Bottom",
    s = "Left",
    o = (e < 3 ? [t, r, i, s] : [t + s, t + r, i + r, i + s]).map(function (a) {
      return e < 2 ? n + a : "border" + a + n;
    });
  As[e > 1 ? "border" + n : n] = function (a, l, u, c, f) {
    var d, h;
    if (arguments.length < 4)
      return (
        (d = o.map(function (m) {
          return hr(a, m, u);
        })),
        (h = d.join(" ")),
        h.split(d[0]).length === 5 ? d[0] : h
      );
    (d = (c + "").split(" ")),
      (h = {}),
      o.forEach(function (m, p) {
        return (h[m] = d[p] = d[p] || d[((p - 1) / 2) | 0]);
      }),
      a.init(l, h, f);
  };
});
var cc = {
  name: "css",
  register: Co,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, t, r, i, s) {
    var o = this._props,
      a = e.style,
      l = r.vars.startAt,
      u,
      c,
      f,
      d,
      h,
      m,
      p,
      g,
      x,
      T,
      w,
      v,
      y,
      M,
      b,
      C,
      S;
    pa || Co(),
      (this.styles = this.styles || nc(e)),
      (C = this.styles.props),
      (this.tween = r);
    for (p in t)
      if (p !== "autoRound" && ((c = t[p]), !(St[p] && Xu(p, t, r, i, e, s)))) {
        if (
          ((h = typeof c),
          (m = As[p]),
          h === "function" && ((c = c.call(r, i, e, s)), (h = typeof c)),
          h === "string" && ~c.indexOf("random(") && (c = Ri(c)),
          m)
        )
          m(this, e, p, c, r) && (b = 1);
        else if (p.substr(0, 2) === "--")
          (u = (getComputedStyle(e).getPropertyValue(p) + "").trim()),
            (c += ""),
            (Ir.lastIndex = 0),
            Ir.test(u) ||
              ((g = Je(u)),
              (x = Je(c)),
              x ? g !== x && (u = zr(e, p, u, x) + x) : g && (c += g)),
            this.add(a, "setProperty", u, c, i, s, 0, 0, p),
            o.push(p),
            C.push(p, 0, a[p]);
        else if (h !== "undefined") {
          if (
            (l && p in l
              ? ((u = typeof l[p] == "function" ? l[p].call(r, i, e, s) : l[p]),
                $e(u) && ~u.indexOf("random(") && (u = Ri(u)),
                Je(u + "") ||
                  u === "auto" ||
                  (u += Ot.units[p] || Je(hr(e, p)) || ""),
                (u + "").charAt(1) === "=" && (u = hr(e, p)))
              : (u = hr(e, p)),
            (d = parseFloat(u)),
            (T = h === "string" && c.charAt(1) === "=" && c.substr(0, 2)),
            T && (c = c.substr(2)),
            (f = parseFloat(c)),
            p in tr &&
              (p === "autoAlpha" &&
                (d === 1 && hr(e, "visibility") === "hidden" && f && (d = 0),
                C.push("visibility", 0, a.visibility),
                Er(
                  this,
                  a,
                  "visibility",
                  d ? "inherit" : "hidden",
                  f ? "inherit" : "hidden",
                  !f
                )),
              p !== "scale" &&
                p !== "transform" &&
                ((p = tr[p]), ~p.indexOf(",") && (p = p.split(",")[0]))),
            (w = p in _r),
            w)
          ) {
            if (
              (this.styles.save(p),
              (S = c),
              h === "string" && c.substring(0, 6) === "var(--")
            ) {
              if (
                ((c = Pt(e, c.substring(4, c.indexOf(")")))),
                c.substring(0, 5) === "calc(")
              ) {
                var A = e.style.perspective;
                (e.style.perspective = c),
                  (c = Pt(e, "perspective")),
                  A ? (e.style.perspective = A) : Lr(e, "perspective");
              }
              f = parseFloat(c);
            }
            if (
              (v ||
                ((y = e._gsap),
                (y.renderTransform && !t.parseTransform) ||
                  Ii(e, t.parseTransform),
                (M = t.smoothOrigin !== !1 && y.smooth),
                (v = this._pt =
                  new gt(this._pt, a, ye, 0, 1, y.renderTransform, y, 0, -1)),
                (v.dep = 1)),
              p === "scale")
            )
              (this._pt = new gt(
                this._pt,
                y,
                "scaleY",
                y.scaleY,
                (T ? En(y.scaleY, T + f) : f) - y.scaleY || 0,
                wo
              )),
                (this._pt.u = 0),
                o.push("scaleY", p),
                (p += "X");
            else if (p === "transformOrigin") {
              C.push(_t, 0, a[_t]),
                (c = Cd(c)),
                y.svg
                  ? Mo(e, c, 0, M, 0, this)
                  : ((x = parseFloat(c.split(" ")[2]) || 0),
                    x !== y.zOrigin && Er(this, y, "zOrigin", y.zOrigin, x),
                    Er(this, a, p, Ps(u), Ps(c)));
              continue;
            } else if (p === "svgOrigin") {
              Mo(e, c, 1, M, 0, this);
              continue;
            } else if (p in ac) {
              Pd(this, y, p, d, T ? En(d, T + c) : c);
              continue;
            } else if (p === "smoothOrigin") {
              Er(this, y, "smooth", y.smooth, c);
              continue;
            } else if (p === "force3D") {
              y[p] = c;
              continue;
            } else if (p === "transform") {
              Od(this, c, e);
              continue;
            }
          } else p in a || (p = Un(p) || p);
          if (w || ((f || f === 0) && (d || d === 0) && !cd.test(c) && p in a))
            (g = (u + "").substr((d + "").length)),
              f || (f = 0),
              (x = Je(c) || (p in Ot.units ? Ot.units[p] : g)),
              g !== x && (d = zr(e, p, u, x)),
              (this._pt = new gt(
                this._pt,
                w ? y : a,
                p,
                d,
                (T ? En(d, T + f) : f) - d,
                !w && (x === "px" || p === "zIndex") && t.autoRound !== !1
                  ? pd
                  : wo
              )),
              (this._pt.u = x || 0),
              w && S !== c
                ? ((this._pt.b = u), (this._pt.e = S), (this._pt.r = dd))
                : g !== x && x !== "%" && ((this._pt.b = u), (this._pt.r = hd));
          else if (p in a) Sd.call(this, e, p, u, T ? T + c : c);
          else if (p in e) this.add(e, p, u || e[p], T ? T + c : c, i, s);
          else if (p !== "parseTransform") {
            ia(p, c);
            continue;
          }
          w ||
            (p in a
              ? C.push(p, 0, a[p])
              : typeof e[p] == "function"
              ? C.push(p, 2, e[p]())
              : C.push(p, 1, u || e[p])),
            o.push(p);
        }
      }
    b && Zu(this);
  },
  render: function (e, t) {
    if (t.tween._time || !ma())
      for (var r = t._pt; r; ) r.r(e, r.d), (r = r._next);
    else t.styles.revert();
  },
  get: hr,
  aliases: tr,
  getSetter: function (e, t, r) {
    var i = tr[t];
    return (
      i && i.indexOf(",") < 0 && (t = i),
      t in _r && t !== _t && (e._gsap.x || hr(e, "x"))
        ? r && ll === r
          ? t === "scale"
            ? yd
            : _d
          : (ll = r || {}) && (t === "scale" ? xd : vd)
        : e.style && !ta(e.style[t])
        ? md
        : ~t.indexOf("-")
        ? gd
        : ha(e, t)
    );
  },
  core: { _removeProperty: Lr, _getMatrix: _a },
};
yt.utils.checkPrefix = Un;
yt.core.getStyleSaver = nc;
(function (n, e, t, r) {
  var i = mt(n + "," + e + "," + t, function (s) {
    _r[s] = 1;
  });
  mt(e, function (s) {
    (Ot.units[s] = "deg"), (ac[s] = 1);
  }),
    (tr[i[13]] = n + "," + e),
    mt(r, function (s) {
      var o = s.split(":");
      tr[o[1]] = i[o[0]];
    });
})(
  "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
  "rotation,rotationX,rotationY,skewX,skewY",
  "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
  "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
);
mt(
  "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
  function (n) {
    Ot.units[n] = "px";
  }
);
yt.registerPlugin(cc);
var Rr = yt.registerPlugin(cc) || yt;
Rr.core.Tween;
const Ed = ({
  text: n,
  as: e = "div",
  typingSpeed: t = 50,
  initialDelay: r = 0,
  pauseDuration: i = 2e3,
  deletingSpeed: s = 30,
  loop: o = !0,
  className: a = "",
  showCursor: l = !0,
  hideCursorWhileTyping: u = !1,
  cursorCharacter: c = "|",
  cursorClassName: f = "",
  cursorBlinkDuration: d = 0.5,
  textColors: h = [],
  variableSpeed: m,
  onSentenceComplete: p,
  startOnVisible: g = !1,
  reverseMode: x = !1,
  ...T
}) => {
  const [w, v] = J.useState(""),
    [y, M] = J.useState(0),
    [b, C] = J.useState(!1),
    [S, A] = J.useState(0),
    [D, O] = J.useState(!g),
    B = J.useRef(null),
    U = J.useRef(null),
    L = J.useMemo(() => (Array.isArray(n) ? n : [n]), [n]),
    Y = J.useCallback(() => {
      if (!m) return t;
      const { min: _, max: Q } = m;
      return Math.random() * (Q - _) + _;
    }, [m, t]),
    F = () => {
      if (h.length !== 0) return h[S % h.length];
    };
  J.useEffect(() => {
    if (!g || !U.current) return;
    const _ = new IntersectionObserver(
      (Q) => {
        Q.forEach((de) => {
          de.isIntersecting && O(!0);
        });
      },
      { threshold: 0.1 }
    );
    return _.observe(U.current), () => _.disconnect();
  }, [g]),
    J.useEffect(() => {
      l &&
        B.current &&
        (Rr.set(B.current, { opacity: 1 }),
        Rr.to(B.current, {
          opacity: 0,
          duration: d,
          repeat: -1,
          yoyo: !0,
          ease: "power2.inOut",
        }));
    }, [l, d]),
    J.useEffect(() => {
      if (!D) return;
      let _;
      const Q = L[S],
        de = x ? Q.split("").reverse().join("") : Q,
        Ue = () => {
          if (b)
            if (w === "") {
              if ((C(!1), S === L.length - 1 && !o)) return;
              p && p(L[S], S),
                A((te) => (te + 1) % L.length),
                M(0),
                (_ = setTimeout(() => {}, i));
            } else
              _ = setTimeout(() => {
                v((te) => te.slice(0, -1));
              }, s);
          else if (y < de.length)
            _ = setTimeout(
              () => {
                v((te) => te + de[y]), M((te) => te + 1);
              },
              m ? Y() : t
            );
          else if (L.length >= 1) {
            if (!o && S === L.length - 1) return;
            _ = setTimeout(() => {
              C(!0);
            }, i);
          }
        };
      return (
        y === 0 && !b && w === "" ? (_ = setTimeout(Ue, r)) : Ue(),
        () => clearTimeout(_)
      );
    }, [y, w, b, t, s, i, L, S, o, r, D, x, m, Y, p]);
  const z = u && (y < L[S].length || b),
    ie = F();
  return P.jsxs(e, {
    ref: U,
    className: `inline-block whitespace-pre-wrap tracking-tight ${a}`,
    ...T,
    children: [
      P.jsx("span", {
        className: "inline",
        style: { color: ie || "inherit" },
        children: w,
      }),
      l &&
        P.jsx("span", {
          ref: B,
          className: `ml-1 inline-block opacity-100 ${z ? "hidden" : ""} ${f}`,
          children: c,
        }),
    ],
  });
};
function Rd() {
  const n = "var(--color-dao-red)",
    e = "var(--color-dao-green)";
  return P.jsx("section", {
    className:
      "min-h-dvh w-full flex flex-col items-center justify-center relative bg-linear-to-br from-dao-blue to-dao-blue-dark py-8",
    children: P.jsxs("main", {
      className:
        "relative z-10 flex flex-col items-center justify-center px-4 text-center gap-6 sm:gap-8 md:gap-12 max-w-10xl mx-auto w-full",
      children: [
        P.jsx("div", {
          children: P.jsx("img", {
            src: hh,
            alt: "The DAO Logo",
            className:
              "size-[240px] md:size-60 [@media(max-height:500px)]:size-[140px] drop-shadow-logo",
          }),
        }),
        P.jsxs("h1", {
          className:
            "text-3xl md:text-4.5xl lg:text-6xl font-normal text-white tracking-tight leading-none font-inter",
          children: [
            "THE DAO IS",
            P.jsx("br", { className: "sm:hidden" }),
            P.jsx("span", { className: "hidden sm:inline", children: " " }),
            P.jsx("span", {
              className: "inline-block mr-1 opacity-0 sm:hidden",
              "aria-hidden": "true",
              children: "|",
            }),
            P.jsx(Ed, {
              text: ["BACK.", "EVOLUTIONARY.", "SECURITY.", "REWARDING."],
              as: "span",
              typingSpeed: 190,
              deletingSpeed: 50,
              pauseDuration: 1500,
              showCursor: !0,
              cursorCharacter: "|",
              loop: !0,
              textColors: [n, e, n, e],
            }),
          ],
        }),
        P.jsx("a", {
          href: "https://giveth.typeform.com/to/XB4mTMou",
          target: "_blank",
          rel: "noopener noreferrer",
          className:
            "bg-dao-red hover:bg-dao-red-hover text-white font-medium text-sm px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 h-10 inline-flex items-center justify-center",
          children: "Get Involved",
        }),
      ],
    }),
  });
}
const Dd = { gwei: 9, wei: 18 };
function Fd(n, e) {
  let t = n.toString();
  const r = t.startsWith("-");
  r && (t = t.slice(1)), (t = t.padStart(e, "0"));
  let [i, s] = [t.slice(0, t.length - e), t.slice(t.length - e)];
  return (
    (s = s.replace(/(0+)$/, "")),
    `${r ? "-" : ""}${i || "0"}${s ? `.${s}` : ""}`
  );
}
function _l(n, e = "wei") {
  return Fd(n, Dd[e]);
}
const Vd = 1n;
function qs(n) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
function Id(n) {
  const e = {
      ogCuratorsMultisig: BigInt(n.balances.ogCuratorsMultisig),
      operationalMultisig: BigInt(n.balances.operationalMultisig),
      stakingMultisig: BigInt(n.balances.stakingMultisig),
      oldMultisig: BigInt(n.balances.oldMultisig),
      extraBalance: BigInt(n.balances.extraBalance),
    },
    t = {
      ogCuratorsMultisig: BigInt(n.daoTokenBalances.ogCuratorsMultisig),
      operationalMultisig: BigInt(n.daoTokenBalances.operationalMultisig),
      stakingMultisig: BigInt(n.daoTokenBalances.stakingMultisig),
      oldMultisig: BigInt(n.daoTokenBalances.oldMultisig),
      extraBalance: BigInt(n.daoTokenBalances.extraBalance),
    },
    r =
      e.ogCuratorsMultisig +
      e.operationalMultisig +
      e.stakingMultisig +
      e.oldMultisig +
      e.extraBalance,
    i =
      t.ogCuratorsMultisig +
      t.operationalMultisig +
      t.stakingMultisig +
      t.oldMultisig +
      t.extraBalance,
    s = i * Vd,
    o = r + s,
    a = parseFloat(_l(o)),
    l = parseFloat(_l(r)),
    u = Number(i / 10n ** 16n);
  return {
    totalBalanceWei: o.toString(),
    totalBalanceEth: a,
    formattedBalance: qs(a),
    formattedEthOnly: qs(l),
    formattedDaoTokens: qs(u),
    balances: n.balances,
    daoTokenBalances: { ...n.daoTokenBalances, total: i.toString() },
  };
}
async function Nd() {
  const n = await fetch("/api/treasury");
  if (!n.ok) throw new Error("Failed to fetch treasury balance");
  const e = await n.json();
  return Id(e);
}
function Bd() {
  const {
    data: n,
    isLoading: e,
    isError: t,
  } = hu({
    queryKey: ["treasuryBalance"],
    queryFn: Nd,
    staleTime: 6e4,
    refetchInterval: 6e4,
  });
  return {
    totalBalanceWei: n?.totalBalanceWei,
    totalBalanceEth: n?.totalBalanceEth,
    formattedBalance: n?.formattedBalance,
    formattedEthOnly: n?.formattedEthOnly,
    formattedDaoTokens: n?.formattedDaoTokens,
    balances: n?.balances,
    daoTokenBalances: n?.daoTokenBalances,
    isLoading: e,
    isError: t,
  };
}
async function Ld() {
  const n = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  if (!n.ok) throw new Error("Failed to fetch ETH price");
  return (await n.json()).ethereum.usd;
}
function zd() {
  const {
    data: n,
    isLoading: e,
    isError: t,
  } = hu({
    queryKey: ["ethPrice"],
    queryFn: Ld,
    staleTime: 6e4,
    refetchInterval: 6e4,
  });
  return { price: n, isLoading: e, isError: t };
}
function jd(n) {
  const e = J.useRef(null);
  return e.current === null && (e.current = n()), e.current;
}
const $d = typeof window < "u";
function Ud(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function fc(n, e) {
  const t = n.indexOf(e);
  t > -1 && n.splice(t, 1);
}
const pn = (n, e, t) => (t > e ? e : t < n ? n : t);
let ya = () => {};
const yr = {},
  hc = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function Wd(n) {
  return typeof n == "object" && n !== null;
}
const dc = (n) => /^0[^.\s]+$/u.test(n);
function xa(n) {
  let e;
  return () => (e === void 0 && (e = n()), e);
}
const Xn = (n) => n,
  Yd = (n, e) => (t) => e(n(t)),
  va = (...n) => n.reduce(Yd),
  ba = (n, e, t) => {
    const r = e - n;
    return r === 0 ? 1 : (t - n) / r;
  };
class pc {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ud(this.subscriptions, e), () => fc(this.subscriptions, e);
  }
  notify(e, t, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](e, t, r);
      else
        for (let s = 0; s < i; s++) {
          const o = this.subscriptions[s];
          o && o(e, t, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const nr = (n) => n * 1e3,
  Gt = (n) => n / 1e3;
function mc(n, e) {
  return e ? n * (1e3 / e) : 0;
}
const Xd = (n, e, t) => {
    const r = e - n;
    return ((((t - n) % r) + r) % r) + n;
  },
  gc = (n, e, t) =>
    (((1 - 3 * t + 3 * e) * n + (3 * t - 6 * e)) * n + 3 * e) * n,
  Kd = 1e-7,
  Gd = 12;
function Hd(n, e, t, r, i) {
  let s,
    o,
    a = 0;
  do (o = e + (t - e) / 2), (s = gc(o, r, i) - n), s > 0 ? (t = o) : (e = o);
  while (Math.abs(s) > Kd && ++a < Gd);
  return o;
}
function Wi(n, e, t, r) {
  if (n === e && t === r) return Xn;
  const i = (s) => Hd(s, 0, 1, n, t);
  return (s) => (s === 0 || s === 1 ? s : gc(i(s), e, r));
}
const _c = (n) => (e) => e <= 0.5 ? n(2 * e) / 2 : (2 - n(2 * (1 - e))) / 2,
  yc = (n) => (e) => 1 - n(1 - e),
  xc = Wi(0.33, 1.53, 0.69, 0.99),
  Ta = yc(xc),
  vc = _c(Ta),
  bc = (n) =>
    (n *= 2) < 1 ? 0.5 * Ta(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))),
  wa = (n) => 1 - Math.sin(Math.acos(n)),
  qd = yc(wa),
  Tc = _c(wa),
  Qd = Wi(0.42, 0, 1, 1),
  Zd = Wi(0, 0, 0.58, 1),
  wc = Wi(0.42, 0, 0.58, 1),
  Sc = (n) => Array.isArray(n) && typeof n[0] != "number";
function Cc(n, e) {
  return Sc(n) ? n[Xd(0, n.length, e)] : n;
}
const Mc = (n) => Array.isArray(n) && typeof n[0] == "number",
  Jd = {
    linear: Xn,
    easeIn: Qd,
    easeInOut: wc,
    easeOut: Zd,
    circIn: wa,
    circInOut: Tc,
    circOut: qd,
    backIn: Ta,
    backInOut: vc,
    backOut: xc,
    anticipate: bc,
  },
  ep = (n) => typeof n == "string",
  yl = (n) => {
    if (Mc(n)) {
      ya(n.length === 4);
      const [e, t, r, i] = n;
      return Wi(e, t, r, i);
    } else if (ep(n)) return Jd[n];
    return n;
  },
  Qi = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function tp(n, e) {
  let t = new Set(),
    r = new Set(),
    i = !1,
    s = !1;
  const o = new WeakSet();
  let a = { delta: 0, timestamp: 0, isProcessing: !1 };
  function l(c) {
    o.has(c) && (u.schedule(c), n()), c(a);
  }
  const u = {
    schedule: (c, f = !1, d = !1) => {
      const m = d && i ? t : r;
      return f && o.add(c), m.has(c) || m.add(c), c;
    },
    cancel: (c) => {
      r.delete(c), o.delete(c);
    },
    process: (c) => {
      if (((a = c), i)) {
        s = !0;
        return;
      }
      (i = !0),
        ([t, r] = [r, t]),
        t.forEach(l),
        t.clear(),
        (i = !1),
        s && ((s = !1), u.process(c));
    },
  };
  return u;
}
const rp = 40;
function kc(n, e) {
  let t = !1,
    r = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    s = () => (t = !0),
    o = Qi.reduce((w, v) => ((w[v] = tp(s)), w), {}),
    {
      setup: a,
      read: l,
      resolveKeyframes: u,
      preUpdate: c,
      update: f,
      preRender: d,
      render: h,
      postRender: m,
    } = o,
    p = () => {
      const w = yr.useManualTiming ? i.timestamp : performance.now();
      (t = !1),
        yr.useManualTiming ||
          (i.delta = r ? 1e3 / 60 : Math.max(Math.min(w - i.timestamp, rp), 1)),
        (i.timestamp = w),
        (i.isProcessing = !0),
        a.process(i),
        l.process(i),
        u.process(i),
        c.process(i),
        f.process(i),
        d.process(i),
        h.process(i),
        m.process(i),
        (i.isProcessing = !1),
        t && e && ((r = !1), n(p));
    },
    g = () => {
      (t = !0), (r = !0), i.isProcessing || n(p);
    };
  return {
    schedule: Qi.reduce((w, v) => {
      const y = o[v];
      return (w[v] = (M, b = !1, C = !1) => (t || g(), y.schedule(M, b, C))), w;
    }, {}),
    cancel: (w) => {
      for (let v = 0; v < Qi.length; v++) o[Qi[v]].cancel(w);
    },
    state: i,
    steps: o,
  };
}
const {
  schedule: xr,
  cancel: ko,
  state: Os,
} = kc(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Xn, !0);
let ms;
function np() {
  ms = void 0;
}
const Lt = {
    now: () => (
      ms === void 0 &&
        Lt.set(
          Os.isProcessing || yr.useManualTiming
            ? Os.timestamp
            : performance.now()
        ),
      ms
    ),
    set: (n) => {
      (ms = n), queueMicrotask(np);
    },
  },
  Ac = (n) => (e) => typeof e == "string" && e.startsWith(n),
  Pc = Ac("--"),
  ip = Ac("var(--"),
  Sa = (n) => (ip(n) ? sp.test(n.split("/*")[0].trim()) : !1),
  sp =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Kn = {
    test: (n) => typeof n == "number",
    parse: parseFloat,
    transform: (n) => n,
  },
  Ni = { ...Kn, transform: (n) => pn(0, 1, n) },
  Zi = { ...Kn, default: 1 },
  _i = (n) => Math.round(n * 1e5) / 1e5,
  Ca = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function op(n) {
  return n == null;
}
const ap =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Ma = (n, e) => (t) =>
    !!(
      (typeof t == "string" && ap.test(t) && t.startsWith(n)) ||
      (e && !op(t) && Object.prototype.hasOwnProperty.call(t, e))
    ),
  Oc = (n, e, t) => (r) => {
    if (typeof r != "string") return r;
    const [i, s, o, a] = r.match(Ca);
    return {
      [n]: parseFloat(i),
      [e]: parseFloat(s),
      [t]: parseFloat(o),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  lp = (n) => pn(0, 255, n),
  Qs = { ...Kn, transform: (n) => Math.round(lp(n)) },
  tn = {
    test: Ma("rgb", "red"),
    parse: Oc("red", "green", "blue"),
    transform: ({ red: n, green: e, blue: t, alpha: r = 1 }) =>
      "rgba(" +
      Qs.transform(n) +
      ", " +
      Qs.transform(e) +
      ", " +
      Qs.transform(t) +
      ", " +
      _i(Ni.transform(r)) +
      ")",
  };
function up(n) {
  let e = "",
    t = "",
    r = "",
    i = "";
  return (
    n.length > 5
      ? ((e = n.substring(1, 3)),
        (t = n.substring(3, 5)),
        (r = n.substring(5, 7)),
        (i = n.substring(7, 9)))
      : ((e = n.substring(1, 2)),
        (t = n.substring(2, 3)),
        (r = n.substring(3, 4)),
        (i = n.substring(4, 5)),
        (e += e),
        (t += t),
        (r += r),
        (i += i)),
    {
      red: parseInt(e, 16),
      green: parseInt(t, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const Ao = { test: Ma("#"), parse: up, transform: tn.transform },
  Yi = (n) => ({
    test: (e) =>
      typeof e == "string" && e.endsWith(n) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${n}`,
  }),
  Mr = Yi("deg"),
  Fn = Yi("%"),
  N = Yi("px"),
  cp = Yi("vh"),
  fp = Yi("vw"),
  xl = {
    ...Fn,
    parse: (n) => Fn.parse(n) / 100,
    transform: (n) => Fn.transform(n * 100),
  },
  Pn = {
    test: Ma("hsl", "hue"),
    parse: Oc("hue", "saturation", "lightness"),
    transform: ({ hue: n, saturation: e, lightness: t, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(n) +
      ", " +
      Fn.transform(_i(e)) +
      ", " +
      Fn.transform(_i(t)) +
      ", " +
      _i(Ni.transform(r)) +
      ")",
  },
  De = {
    test: (n) => tn.test(n) || Ao.test(n) || Pn.test(n),
    parse: (n) =>
      tn.test(n) ? tn.parse(n) : Pn.test(n) ? Pn.parse(n) : Ao.parse(n),
    transform: (n) =>
      typeof n == "string"
        ? n
        : n.hasOwnProperty("red")
        ? tn.transform(n)
        : Pn.transform(n),
    getAnimatableNone: (n) => {
      const e = De.parse(n);
      return (e.alpha = 0), De.transform(e);
    },
  },
  hp =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function dp(n) {
  return (
    isNaN(n) &&
    typeof n == "string" &&
    (n.match(Ca)?.length || 0) + (n.match(hp)?.length || 0) > 0
  );
}
const Ec = "number",
  Rc = "color",
  pp = "var",
  mp = "var(",
  vl = "${}",
  gp =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Bi(n) {
  const e = n.toString(),
    t = [],
    r = { color: [], number: [], var: [] },
    i = [];
  let s = 0;
  const a = e
    .replace(
      gp,
      (l) => (
        De.test(l)
          ? (r.color.push(s), i.push(Rc), t.push(De.parse(l)))
          : l.startsWith(mp)
          ? (r.var.push(s), i.push(pp), t.push(l))
          : (r.number.push(s), i.push(Ec), t.push(parseFloat(l))),
        ++s,
        vl
      )
    )
    .split(vl);
  return { values: t, split: a, indexes: r, types: i };
}
function Dc(n) {
  return Bi(n).values;
}
function Fc(n) {
  const { split: e, types: t } = Bi(n),
    r = e.length;
  return (i) => {
    let s = "";
    for (let o = 0; o < r; o++)
      if (((s += e[o]), i[o] !== void 0)) {
        const a = t[o];
        a === Ec
          ? (s += _i(i[o]))
          : a === Rc
          ? (s += De.transform(i[o]))
          : (s += i[o]);
      }
    return s;
  };
}
const _p = (n) =>
  typeof n == "number" ? 0 : De.test(n) ? De.getAnimatableNone(n) : n;
function yp(n) {
  const e = Dc(n);
  return Fc(n)(e.map(_p));
}
const jr = {
  test: dp,
  parse: Dc,
  createTransformer: Fc,
  getAnimatableNone: yp,
};
function Zs(n, e, t) {
  return (
    t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6
      ? n + (e - n) * 6 * t
      : t < 1 / 2
      ? e
      : t < 2 / 3
      ? n + (e - n) * (2 / 3 - t) * 6
      : n
  );
}
function xp({ hue: n, saturation: e, lightness: t, alpha: r }) {
  (n /= 360), (e /= 100), (t /= 100);
  let i = 0,
    s = 0,
    o = 0;
  if (!e) i = s = o = t;
  else {
    const a = t < 0.5 ? t * (1 + e) : t + e - t * e,
      l = 2 * t - a;
    (i = Zs(l, a, n + 1 / 3)), (s = Zs(l, a, n)), (o = Zs(l, a, n - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: r,
  };
}
function Es(n, e) {
  return (t) => (t > 0 ? e : n);
}
const Gn = (n, e, t) => n + (e - n) * t,
  Js = (n, e, t) => {
    const r = n * n,
      i = t * (e * e - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  vp = [Ao, tn, Pn],
  bp = (n) => vp.find((e) => e.test(n));
function bl(n) {
  const e = bp(n);
  if (!e) return !1;
  let t = e.parse(n);
  return e === Pn && (t = xp(t)), t;
}
const Tl = (n, e) => {
    const t = bl(n),
      r = bl(e);
    if (!t || !r) return Es(n, e);
    const i = { ...t };
    return (s) => (
      (i.red = Js(t.red, r.red, s)),
      (i.green = Js(t.green, r.green, s)),
      (i.blue = Js(t.blue, r.blue, s)),
      (i.alpha = Gn(t.alpha, r.alpha, s)),
      tn.transform(i)
    );
  },
  Po = new Set(["none", "hidden"]);
function Tp(n, e) {
  return Po.has(n) ? (t) => (t <= 0 ? n : e) : (t) => (t >= 1 ? e : n);
}
function wp(n, e) {
  return (t) => Gn(n, e, t);
}
function ka(n) {
  return typeof n == "number"
    ? wp
    : typeof n == "string"
    ? Sa(n)
      ? Es
      : De.test(n)
      ? Tl
      : Mp
    : Array.isArray(n)
    ? Vc
    : typeof n == "object"
    ? De.test(n)
      ? Tl
      : Sp
    : Es;
}
function Vc(n, e) {
  const t = [...n],
    r = t.length,
    i = n.map((s, o) => ka(s)(s, e[o]));
  return (s) => {
    for (let o = 0; o < r; o++) t[o] = i[o](s);
    return t;
  };
}
function Sp(n, e) {
  const t = { ...n, ...e },
    r = {};
  for (const i in t)
    n[i] !== void 0 && e[i] !== void 0 && (r[i] = ka(n[i])(n[i], e[i]));
  return (i) => {
    for (const s in r) t[s] = r[s](i);
    return t;
  };
}
function Cp(n, e) {
  const t = [],
    r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const s = e.types[i],
      o = n.indexes[s][r[s]],
      a = n.values[o] ?? 0;
    (t[i] = a), r[s]++;
  }
  return t;
}
const Mp = (n, e) => {
  const t = jr.createTransformer(e),
    r = Bi(n),
    i = Bi(e);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (Po.has(n) && !i.values.length) || (Po.has(e) && !r.values.length)
      ? Tp(n, e)
      : va(Vc(Cp(r, i), i.values), t)
    : Es(n, e);
};
function Ic(n, e, t) {
  return typeof n == "number" && typeof e == "number" && typeof t == "number"
    ? Gn(n, e, t)
    : ka(n)(n, e);
}
const kp = (n) => {
    const e = ({ timestamp: t }) => n(t);
    return {
      start: (t = !0) => xr.update(e, t),
      stop: () => ko(e),
      now: () => (Os.isProcessing ? Os.timestamp : Lt.now()),
    };
  },
  Nc = (n, e, t = 10) => {
    let r = "";
    const i = Math.max(Math.round(e / t), 2);
    for (let s = 0; s < i; s++)
      r += Math.round(n(s / (i - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${r.substring(0, r.length - 2)})`;
  },
  Rs = 2e4;
function Aa(n) {
  let e = 0;
  const t = 50;
  let r = n.next(e);
  for (; !r.done && e < Rs; ) (e += t), (r = n.next(e));
  return e >= Rs ? 1 / 0 : e;
}
function Bc(n, e = 100, t) {
  const r = t({ ...n, keyframes: [0, e] }),
    i = Math.min(Aa(r), Rs);
  return {
    type: "keyframes",
    ease: (s) => r.next(i * s).value / e,
    duration: Gt(i),
  };
}
const Ap = 5;
function Lc(n, e, t) {
  const r = Math.max(e - Ap, 0);
  return mc(t - n(r), e - r);
}
const Te = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  eo = 0.001;
function Pp({
  duration: n = Te.duration,
  bounce: e = Te.bounce,
  velocity: t = Te.velocity,
  mass: r = Te.mass,
}) {
  let i,
    s,
    o = 1 - e;
  (o = pn(Te.minDamping, Te.maxDamping, o)),
    (n = pn(Te.minDuration, Te.maxDuration, Gt(n))),
    o < 1
      ? ((i = (u) => {
          const c = u * o,
            f = c * n,
            d = c - t,
            h = Oo(u, o),
            m = Math.exp(-f);
          return eo - (d / h) * m;
        }),
        (s = (u) => {
          const f = u * o * n,
            d = f * t + t,
            h = Math.pow(o, 2) * Math.pow(u, 2) * n,
            m = Math.exp(-f),
            p = Oo(Math.pow(u, 2), o);
          return ((-i(u) + eo > 0 ? -1 : 1) * ((d - h) * m)) / p;
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * n),
            f = (u - t) * n + 1;
          return -eo + c * f;
        }),
        (s = (u) => {
          const c = Math.exp(-u * n),
            f = (t - u) * (n * n);
          return c * f;
        }));
  const a = 5 / n,
    l = Ep(i, s, a);
  if (((n = nr(n)), isNaN(l)))
    return { stiffness: Te.stiffness, damping: Te.damping, duration: n };
  {
    const u = Math.pow(l, 2) * r;
    return { stiffness: u, damping: o * 2 * Math.sqrt(r * u), duration: n };
  }
}
const Op = 12;
function Ep(n, e, t) {
  let r = t;
  for (let i = 1; i < Op; i++) r = r - n(r) / e(r);
  return r;
}
function Oo(n, e) {
  return n * Math.sqrt(1 - e * e);
}
const Rp = ["duration", "bounce"],
  Dp = ["stiffness", "damping", "mass"];
function wl(n, e) {
  return e.some((t) => n[t] !== void 0);
}
function Fp(n) {
  let e = {
    velocity: Te.velocity,
    stiffness: Te.stiffness,
    damping: Te.damping,
    mass: Te.mass,
    isResolvedFromDuration: !1,
    ...n,
  };
  if (!wl(n, Dp) && wl(n, Rp))
    if (n.visualDuration) {
      const t = n.visualDuration,
        r = (2 * Math.PI) / (t * 1.2),
        i = r * r,
        s = 2 * pn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(i);
      e = { ...e, mass: Te.mass, stiffness: i, damping: s };
    } else {
      const t = Pp(n);
      (e = { ...e, ...t, mass: Te.mass }), (e.isResolvedFromDuration = !0);
    }
  return e;
}
function Li(n = Te.visualDuration, e = Te.bounce) {
  const t =
    typeof n != "object"
      ? { visualDuration: n, keyframes: [0, 1], bounce: e }
      : n;
  let { restSpeed: r, restDelta: i } = t;
  const s = t.keyframes[0],
    o = t.keyframes[t.keyframes.length - 1],
    a = { done: !1, value: s },
    {
      stiffness: l,
      damping: u,
      mass: c,
      duration: f,
      velocity: d,
      isResolvedFromDuration: h,
    } = Fp({ ...t, velocity: -Gt(t.velocity || 0) }),
    m = d || 0,
    p = u / (2 * Math.sqrt(l * c)),
    g = o - s,
    x = Gt(Math.sqrt(l / c)),
    T = Math.abs(g) < 5;
  r || (r = T ? Te.restSpeed.granular : Te.restSpeed.default),
    i || (i = T ? Te.restDelta.granular : Te.restDelta.default);
  let w;
  if (p < 1) {
    const y = Oo(x, p);
    w = (M) => {
      const b = Math.exp(-p * x * M);
      return (
        o - b * (((m + p * x * g) / y) * Math.sin(y * M) + g * Math.cos(y * M))
      );
    };
  } else if (p === 1) w = (y) => o - Math.exp(-x * y) * (g + (m + x * g) * y);
  else {
    const y = x * Math.sqrt(p * p - 1);
    w = (M) => {
      const b = Math.exp(-p * x * M),
        C = Math.min(y * M, 300);
      return (
        o - (b * ((m + p * x * g) * Math.sinh(C) + y * g * Math.cosh(C))) / y
      );
    };
  }
  const v = {
    calculatedDuration: (h && f) || null,
    next: (y) => {
      const M = w(y);
      if (h) a.done = y >= f;
      else {
        let b = y === 0 ? m : 0;
        p < 1 && (b = y === 0 ? nr(m) : Lc(w, y, M));
        const C = Math.abs(b) <= r,
          S = Math.abs(o - M) <= i;
        a.done = C && S;
      }
      return (a.value = a.done ? o : M), a;
    },
    toString: () => {
      const y = Math.min(Aa(v), Rs),
        M = Nc((b) => v.next(y * b).value, y, 30);
      return y + "ms " + M;
    },
    toTransition: () => {},
  };
  return v;
}
Li.applyToOptions = (n) => {
  const e = Bc(n, 100, Li);
  return (
    (n.ease = e.ease), (n.duration = nr(e.duration)), (n.type = "keyframes"), n
  );
};
function Eo({
  keyframes: n,
  velocity: e = 0,
  power: t = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: s = 500,
  modifyTarget: o,
  min: a,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const f = n[0],
    d = { done: !1, value: f },
    h = (C) => (a !== void 0 && C < a) || (l !== void 0 && C > l),
    m = (C) =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - C) < Math.abs(l - C)
        ? a
        : l;
  let p = t * e;
  const g = f + p,
    x = o === void 0 ? g : o(g);
  x !== g && (p = x - f);
  const T = (C) => -p * Math.exp(-C / r),
    w = (C) => x + T(C),
    v = (C) => {
      const S = T(C),
        A = w(C);
      (d.done = Math.abs(S) <= u), (d.value = d.done ? x : A);
    };
  let y, M;
  const b = (C) => {
    h(d.value) &&
      ((y = C),
      (M = Li({
        keyframes: [d.value, m(d.value)],
        velocity: Lc(w, C, d.value),
        damping: i,
        stiffness: s,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    b(0),
    {
      calculatedDuration: null,
      next: (C) => {
        let S = !1;
        return (
          !M && y === void 0 && ((S = !0), v(C), b(C)),
          y !== void 0 && C >= y ? M.next(C - y) : (!S && v(C), d)
        );
      },
    }
  );
}
function Vp(n, e, t) {
  const r = [],
    i = t || yr.mix || Ic,
    s = n.length - 1;
  for (let o = 0; o < s; o++) {
    let a = i(n[o], n[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || Xn : e;
      a = va(l, a);
    }
    r.push(a);
  }
  return r;
}
function Ip(n, e, { clamp: t = !0, ease: r, mixer: i } = {}) {
  const s = n.length;
  if ((ya(s === e.length), s === 1)) return () => e[0];
  if (s === 2 && e[0] === e[1]) return () => e[1];
  const o = n[0] === n[1];
  n[0] > n[s - 1] && ((n = [...n].reverse()), (e = [...e].reverse()));
  const a = Vp(e, r, i),
    l = a.length,
    u = (c) => {
      if (o && c < n[0]) return e[0];
      let f = 0;
      if (l > 1) for (; f < n.length - 2 && !(c < n[f + 1]); f++);
      const d = ba(n[f], n[f + 1], c);
      return a[f](d);
    };
  return t ? (c) => u(pn(n[0], n[s - 1], c)) : u;
}
function zc(n, e) {
  const t = n[n.length - 1];
  for (let r = 1; r <= e; r++) {
    const i = ba(0, e, r);
    n.push(Gn(t, 1, i));
  }
}
function jc(n) {
  const e = [0];
  return zc(e, n.length - 1), e;
}
function Np(n, e) {
  return n.map((t) => t * e);
}
function Bp(n, e) {
  return n.map(() => e || wc).splice(0, n.length - 1);
}
function yi({
  duration: n = 300,
  keyframes: e,
  times: t,
  ease: r = "easeInOut",
}) {
  const i = Sc(r) ? r.map(yl) : yl(r),
    s = { done: !1, value: e[0] },
    o = Np(t && t.length === e.length ? t : jc(e), n),
    a = Ip(o, e, { ease: Array.isArray(i) ? i : Bp(e, i) });
  return {
    calculatedDuration: n,
    next: (l) => ((s.value = a(l)), (s.done = l >= n), s),
  };
}
const Lp = (n) => n !== null;
function Pa(n, { repeat: e, repeatType: t = "loop" }, r, i = 1) {
  const s = n.filter(Lp),
    a = i < 0 || (e && t !== "loop" && e % 2 === 1) ? 0 : s.length - 1;
  return !a || r === void 0 ? s[a] : r;
}
const zp = { decay: Eo, inertia: Eo, tween: yi, keyframes: yi, spring: Li };
function $c(n) {
  typeof n.type == "string" && (n.type = zp[n.type]);
}
class Oa {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(e, t) {
    return this.finished.then(e, t);
  }
}
const jp = (n) => n / 100;
class Ea extends Oa {
  constructor(e) {
    super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: t } = this.options;
        t && t.updatedAt !== Lt.now() && this.tick(Lt.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), this.options.onStop?.());
      }),
      (this.options = e),
      this.initAnimation(),
      this.play(),
      e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    $c(e);
    const {
      type: t = yi,
      repeat: r = 0,
      repeatDelay: i = 0,
      repeatType: s,
      velocity: o = 0,
    } = e;
    let { keyframes: a } = e;
    const l = t || yi;
    l !== yi &&
      typeof a[0] != "number" &&
      ((this.mixKeyframes = va(jp, Ic(a[0], a[1]))), (a = [0, 100]));
    const u = l({ ...e, keyframes: a });
    s === "mirror" &&
      (this.mirroredGenerator = l({
        ...e,
        keyframes: [...a].reverse(),
        velocity: -o,
      })),
      u.calculatedDuration === null && (u.calculatedDuration = Aa(u));
    const { calculatedDuration: c } = u;
    (this.calculatedDuration = c),
      (this.resolvedDuration = c + i),
      (this.totalDuration = this.resolvedDuration * (r + 1) - i),
      (this.generator = u);
  }
  updateTime(e) {
    const t = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = t);
  }
  tick(e, t = !1) {
    const {
      generator: r,
      totalDuration: i,
      mixKeyframes: s,
      mirroredGenerator: o,
      resolvedDuration: a,
      calculatedDuration: l,
    } = this;
    if (this.startTime === null) return r.next(0);
    const {
      delay: u = 0,
      keyframes: c,
      repeat: f,
      repeatType: d,
      repeatDelay: h,
      type: m,
      onUpdate: p,
      finalKeyframe: g,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, e))
      : this.speed < 0 &&
        (this.startTime = Math.min(e - i / this.speed, this.startTime)),
      t ? (this.currentTime = e) : this.updateTime(e);
    const x = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
      T = this.playbackSpeed >= 0 ? x < 0 : x > i;
    (this.currentTime = Math.max(x, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = i);
    let w = this.currentTime,
      v = r;
    if (f) {
      const C = Math.min(this.currentTime, i) / a;
      let S = Math.floor(C),
        A = C % 1;
      !A && C >= 1 && (A = 1),
        A === 1 && S--,
        (S = Math.min(S, f + 1)),
        S % 2 &&
          (d === "reverse"
            ? ((A = 1 - A), h && (A -= h / a))
            : d === "mirror" && (v = o)),
        (w = pn(0, 1, A) * a);
    }
    const y = T ? { done: !1, value: c[0] } : v.next(w);
    s && (y.value = s(y.value));
    let { done: M } = y;
    !T &&
      l !== null &&
      (M =
        this.playbackSpeed >= 0
          ? this.currentTime >= i
          : this.currentTime <= 0);
    const b =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && M));
    return (
      b && m !== Eo && (y.value = Pa(c, this.options, g, this.speed)),
      p && p(y.value),
      b && this.finish(),
      y
    );
  }
  then(e, t) {
    return this.finished.then(e, t);
  }
  get duration() {
    return Gt(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + Gt(e);
  }
  get time() {
    return Gt(this.currentTime);
  }
  set time(e) {
    (e = nr(e)),
      (this.currentTime = e),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = e)
        : this.driver &&
          (this.startTime = this.driver.now() - e / this.playbackSpeed),
      this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(Lt.now());
    const t = this.playbackSpeed !== e;
    (this.playbackSpeed = e), t && (this.time = Gt(this.currentTime));
  }
  play() {
    if (this.isStopped) return;
    const { driver: e = kp, startTime: t } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))),
      this.options.onPlay?.();
    const r = this.driver.now();
    this.state === "finished"
      ? (this.updateFinished(), (this.startTime = r))
      : this.holdTime !== null
      ? (this.startTime = r - this.holdTime)
      : this.startTime || (this.startTime = t ?? r),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    (this.state = "paused"),
      this.updateTime(Lt.now()),
      (this.holdTime = this.currentTime);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      this.options.onComplete?.();
  }
  cancel() {
    (this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      this.options.onCancel?.();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null);
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(e) {
    return (this.startTime = 0), this.tick(e, !0);
  }
  attachTimeline(e) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      this.driver?.stop(),
      e.observe(this)
    );
  }
}
function $p(n) {
  for (let e = 1; e < n.length; e++) n[e] ?? (n[e] = n[e - 1]);
}
const rn = (n) => (n * 180) / Math.PI,
  Ro = (n) => {
    const e = rn(Math.atan2(n[1], n[0]));
    return Do(e);
  },
  Up = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
    rotate: Ro,
    rotateZ: Ro,
    skewX: (n) => rn(Math.atan(n[1])),
    skewY: (n) => rn(Math.atan(n[2])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2,
  },
  Do = (n) => ((n = n % 360), n < 0 && (n += 360), n),
  Sl = Ro,
  Cl = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]),
  Ml = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]),
  Wp = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: Cl,
    scaleY: Ml,
    scale: (n) => (Cl(n) + Ml(n)) / 2,
    rotateX: (n) => Do(rn(Math.atan2(n[6], n[5]))),
    rotateY: (n) => Do(rn(Math.atan2(-n[2], n[0]))),
    rotateZ: Sl,
    rotate: Sl,
    skewX: (n) => rn(Math.atan(n[4])),
    skewY: (n) => rn(Math.atan(n[1])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2,
  };
function Fo(n) {
  return n.includes("scale") ? 1 : 0;
}
function Vo(n, e) {
  if (!n || n === "none") return Fo(e);
  const t = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, i;
  if (t) (r = Wp), (i = t);
  else {
    const a = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    (r = Up), (i = a);
  }
  if (!i) return Fo(e);
  const s = r[e],
    o = i[1].split(",").map(Xp);
  return typeof s == "function" ? s(o) : o[s];
}
const Yp = (n, e) => {
  const { transform: t = "none" } = getComputedStyle(n);
  return Vo(t, e);
};
function Xp(n) {
  return parseFloat(n.trim());
}
const Hn = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  qn = new Set(Hn),
  kl = (n) => n === Kn || n === N,
  Kp = new Set(["x", "y", "z"]),
  Gp = Hn.filter((n) => !Kp.has(n));
function Hp(n) {
  const e = [];
  return (
    Gp.forEach((t) => {
      const r = n.getValue(t);
      r !== void 0 &&
        (e.push([t, r.get()]), r.set(t.startsWith("scale") ? 1 : 0));
    }),
    e
  );
}
const un = {
  width: ({ x: n }, { paddingLeft: e = "0", paddingRight: t = "0" }) =>
    n.max - n.min - parseFloat(e) - parseFloat(t),
  height: ({ y: n }, { paddingTop: e = "0", paddingBottom: t = "0" }) =>
    n.max - n.min - parseFloat(e) - parseFloat(t),
  top: (n, { top: e }) => parseFloat(e),
  left: (n, { left: e }) => parseFloat(e),
  bottom: ({ y: n }, { top: e }) => parseFloat(e) + (n.max - n.min),
  right: ({ x: n }, { left: e }) => parseFloat(e) + (n.max - n.min),
  x: (n, { transform: e }) => Vo(e, "x"),
  y: (n, { transform: e }) => Vo(e, "y"),
};
un.translateX = un.x;
un.translateY = un.y;
const cn = new Set();
let Io = !1,
  No = !1,
  Bo = !1;
function Uc() {
  if (No) {
    const n = Array.from(cn).filter((r) => r.needsMeasurement),
      e = new Set(n.map((r) => r.element)),
      t = new Map();
    e.forEach((r) => {
      const i = Hp(r);
      i.length && (t.set(r, i), r.render());
    }),
      n.forEach((r) => r.measureInitialState()),
      e.forEach((r) => {
        r.render();
        const i = t.get(r);
        i &&
          i.forEach(([s, o]) => {
            r.getValue(s)?.set(o);
          });
      }),
      n.forEach((r) => r.measureEndState()),
      n.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (No = !1), (Io = !1), cn.forEach((n) => n.complete(Bo)), cn.clear();
}
function Wc() {
  cn.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (No = !0);
  });
}
function qp() {
  (Bo = !0), Wc(), Uc(), (Bo = !1);
}
class Ra {
  constructor(e, t, r, i, s, o = !1) {
    (this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...e]),
      (this.onComplete = t),
      (this.name = r),
      (this.motionValue = i),
      (this.element = s),
      (this.isAsync = o);
  }
  scheduleResolve() {
    (this.state = "scheduled"),
      this.isAsync
        ? (cn.add(this),
          Io || ((Io = !0), xr.read(Wc), xr.resolveKeyframes(Uc)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: e,
      name: t,
      element: r,
      motionValue: i,
    } = this;
    if (e[0] === null) {
      const s = i?.get(),
        o = e[e.length - 1];
      if (s !== void 0) e[0] = s;
      else if (r && t) {
        const a = r.readValue(t, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), i && s === void 0 && i.set(e[0]);
    }
    $p(e);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(e = !1) {
    (this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e),
      cn.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (cn.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Qp = (n) => n.startsWith("--");
function Zp(n, e, t) {
  Qp(e) ? n.style.setProperty(e, t) : (n.style[e] = t);
}
const Jp = xa(() => window.ScrollTimeline !== void 0),
  em = {};
function tm(n, e) {
  const t = xa(n);
  return () => em[e] ?? t();
}
const Yc = tm(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  ai = ([n, e, t, r]) => `cubic-bezier(${n}, ${e}, ${t}, ${r})`,
  Al = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: ai([0, 0.65, 0.55, 1]),
    circOut: ai([0.55, 0, 1, 0.45]),
    backIn: ai([0.31, 0.01, 0.66, -0.59]),
    backOut: ai([0.33, 1.53, 0.69, 0.99]),
  };
function Xc(n, e) {
  if (n)
    return typeof n == "function"
      ? Yc()
        ? Nc(n, e)
        : "ease-out"
      : Mc(n)
      ? ai(n)
      : Array.isArray(n)
      ? n.map((t) => Xc(t, e) || Al.easeOut)
      : Al[n];
}
function rm(
  n,
  e,
  t,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: s = 0,
    repeatType: o = "loop",
    ease: a = "easeOut",
    times: l,
  } = {},
  u = void 0
) {
  const c = { [e]: t };
  l && (c.offset = l);
  const f = Xc(a, i);
  Array.isArray(f) && (c.easing = f);
  const d = {
    delay: r,
    duration: i,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: s + 1,
    direction: o === "reverse" ? "alternate" : "normal",
  };
  return u && (d.pseudoElement = u), n.animate(c, d);
}
function Da(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function nm({ type: n, ...e }) {
  return Da(n) && Yc()
    ? n.applyToOptions(e)
    : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class im extends Oa {
  constructor(e) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !e))
      return;
    const {
      element: t,
      name: r,
      keyframes: i,
      pseudoElement: s,
      allowFlatten: o = !1,
      finalKeyframe: a,
      onComplete: l,
    } = e;
    (this.isPseudoElement = !!s),
      (this.allowFlatten = o),
      (this.options = e),
      ya(typeof e.type != "string");
    const u = nm(e);
    (this.animation = rm(t, r, i, u, s)),
      u.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !s)) {
          const c = Pa(i, this.options, a, this.speed);
          this.updateMotionValue ? this.updateMotionValue(c) : Zp(t, r, c),
            this.animation.cancel();
        }
        l?.(), this.notifyFinished();
      });
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" ||
      e === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return Gt(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + Gt(e);
  }
  get time() {
    return Gt(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    (this.finishedTime = null), (this.animation.currentTime = nr(e));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), (this.animation.playbackRate = e);
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(e) {
    this.animation.startTime = e;
  }
  attachTimeline({ timeline: e, observe: t }) {
    return (
      this.allowFlatten &&
        this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      e && Jp() ? ((this.animation.timeline = e), Xn) : t(this)
    );
  }
}
const Kc = { anticipate: bc, backInOut: vc, circInOut: Tc };
function sm(n) {
  return n in Kc;
}
function om(n) {
  typeof n.ease == "string" && sm(n.ease) && (n.ease = Kc[n.ease]);
}
const Pl = 10;
class am extends im {
  constructor(e) {
    om(e),
      $c(e),
      super(e),
      e.startTime && (this.startTime = e.startTime),
      (this.options = e);
  }
  updateMotionValue(e) {
    const {
      motionValue: t,
      onUpdate: r,
      onComplete: i,
      element: s,
      ...o
    } = this.options;
    if (!t) return;
    if (e !== void 0) {
      t.set(e);
      return;
    }
    const a = new Ea({ ...o, autoplay: !1 }),
      l = nr(this.finishedTime ?? this.time);
    t.setWithVelocity(a.sample(l - Pl).value, a.sample(l).value, Pl), a.stop();
  }
}
const Ol = (n, e) =>
  e === "zIndex"
    ? !1
    : !!(
        typeof n == "number" ||
        Array.isArray(n) ||
        (typeof n == "string" &&
          (jr.test(n) || n === "0") &&
          !n.startsWith("url("))
      );
function lm(n) {
  const e = n[0];
  if (n.length === 1) return !0;
  for (let t = 0; t < n.length; t++) if (n[t] !== e) return !0;
}
function um(n, e, t, r) {
  const i = n[0];
  if (i === null) return !1;
  if (e === "display" || e === "visibility") return !0;
  const s = n[n.length - 1],
    o = Ol(i, e),
    a = Ol(s, e);
  return !o || !a ? !1 : lm(n) || ((t === "spring" || Da(t)) && r);
}
function Lo(n) {
  (n.duration = 0), (n.type = "keyframes");
}
const cm = new Set(["opacity", "clipPath", "filter", "transform"]),
  fm = xa(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function hm(n) {
  const {
    motionValue: e,
    name: t,
    repeatDelay: r,
    repeatType: i,
    damping: s,
    type: o,
  } = n;
  if (!(e?.owner?.current instanceof HTMLElement)) return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return (
    fm() &&
    t &&
    cm.has(t) &&
    (t !== "transform" || !u) &&
    !l &&
    !r &&
    i !== "mirror" &&
    s !== 0 &&
    o !== "inertia"
  );
}
const dm = 40;
class pm extends Oa {
  constructor({
    autoplay: e = !0,
    delay: t = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: s = 0,
    repeatType: o = "loop",
    keyframes: a,
    name: l,
    motionValue: u,
    element: c,
    ...f
  }) {
    super(),
      (this.stop = () => {
        this._animation && (this._animation.stop(), this.stopTimeline?.()),
          this.keyframeResolver?.cancel();
      }),
      (this.createdAt = Lt.now());
    const d = {
        autoplay: e,
        delay: t,
        type: r,
        repeat: i,
        repeatDelay: s,
        repeatType: o,
        name: l,
        motionValue: u,
        element: c,
        ...f,
      },
      h = c?.KeyframeResolver || Ra;
    (this.keyframeResolver = new h(
      a,
      (m, p, g) => this.onKeyframesResolved(m, p, d, !g),
      l,
      u,
      c
    )),
      this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, t, r, i) {
    this.keyframeResolver = void 0;
    const {
      name: s,
      type: o,
      velocity: a,
      delay: l,
      isHandoff: u,
      onUpdate: c,
    } = r;
    (this.resolvedAt = Lt.now()),
      um(e, s, o, a) ||
        ((yr.instantAnimations || !l) && c?.(Pa(e, r, t)),
        (e[0] = e[e.length - 1]),
        Lo(r),
        (r.repeat = 0));
    const d = {
        startTime: i
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > dm
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: t,
        ...r,
        keyframes: e,
      },
      h =
        !u && hm(d)
          ? new am({ ...d, element: d.motionValue.owner.current })
          : new Ea(d);
    h.finished.then(() => this.notifyFinished()).catch(Xn),
      this.pendingTimeline &&
        ((this.stopTimeline = h.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = h);
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, t) {
    return this.finished.finally(e).then(() => {});
  }
  get animation() {
    return (
      this._animation || (this.keyframeResolver?.resume(), qp()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(e))
        : (this.pendingTimeline = e),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
class mm {
  constructor(e) {
    (this.stop = () => this.runAll("stop")),
      (this.animations = e.filter(Boolean));
  }
  get finished() {
    return Promise.all(this.animations.map((e) => e.finished));
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, t) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][e] = t;
  }
  attachTimeline(e) {
    const t = this.animations.map((r) => r.attachTimeline(e));
    return () => {
      t.forEach((r, i) => {
        r && r(), this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return El(this.animations, "duration");
  }
  get iterationDuration() {
    return El(this.animations, "iterationDuration");
  }
  runAll(e) {
    this.animations.forEach((t) => t[e]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function El(n, e) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r][e];
    i !== null && i > t && (t = i);
  }
  return t;
}
class gm extends mm {
  then(e, t) {
    return this.finished.finally(e).then(() => {});
  }
}
const _m = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function ym(n) {
  const e = _m.exec(n);
  if (!e) return [,];
  const [, t, r, i] = e;
  return [`--${t ?? r}`, i];
}
function Gc(n, e, t = 1) {
  const [r, i] = ym(n);
  if (!r) return;
  const s = window.getComputedStyle(e).getPropertyValue(r);
  if (s) {
    const o = s.trim();
    return hc(o) ? parseFloat(o) : o;
  }
  return Sa(i) ? Gc(i, e, t + 1) : i;
}
function Hc(n, e) {
  return n?.[e] ?? n?.default ?? n;
}
const qc = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...Hn,
  ]),
  xm = { test: (n) => n === "auto", parse: (n) => n },
  Qc = (n) => (e) => e.test(n),
  Zc = [Kn, N, Fn, Mr, fp, cp, xm],
  Rl = (n) => Zc.find(Qc(n));
function vm(n) {
  return typeof n == "number"
    ? n === 0
    : n !== null
    ? n === "none" || n === "0" || dc(n)
    : !0;
}
const bm = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Tm(n) {
  const [e, t] = n.slice(0, -1).split("(");
  if (e === "drop-shadow") return n;
  const [r] = t.match(Ca) || [];
  if (!r) return n;
  const i = t.replace(r, "");
  let s = bm.has(e) ? 1 : 0;
  return r !== t && (s *= 100), e + "(" + s + i + ")";
}
const wm = /\b([a-z-]*)\(.*?\)/gu,
  zo = {
    ...jr,
    getAnimatableNone: (n) => {
      const e = n.match(wm);
      return e ? e.map(Tm).join(" ") : n;
    },
  },
  Dl = { ...Kn, transform: Math.round },
  Sm = {
    rotate: Mr,
    rotateX: Mr,
    rotateY: Mr,
    rotateZ: Mr,
    scale: Zi,
    scaleX: Zi,
    scaleY: Zi,
    scaleZ: Zi,
    skew: Mr,
    skewX: Mr,
    skewY: Mr,
    distance: N,
    translateX: N,
    translateY: N,
    translateZ: N,
    x: N,
    y: N,
    z: N,
    perspective: N,
    transformPerspective: N,
    opacity: Ni,
    originX: xl,
    originY: xl,
    originZ: N,
  },
  Fa = {
    borderWidth: N,
    borderTopWidth: N,
    borderRightWidth: N,
    borderBottomWidth: N,
    borderLeftWidth: N,
    borderRadius: N,
    radius: N,
    borderTopLeftRadius: N,
    borderTopRightRadius: N,
    borderBottomRightRadius: N,
    borderBottomLeftRadius: N,
    width: N,
    maxWidth: N,
    height: N,
    maxHeight: N,
    top: N,
    right: N,
    bottom: N,
    left: N,
    padding: N,
    paddingTop: N,
    paddingRight: N,
    paddingBottom: N,
    paddingLeft: N,
    margin: N,
    marginTop: N,
    marginRight: N,
    marginBottom: N,
    marginLeft: N,
    backgroundPositionX: N,
    backgroundPositionY: N,
    ...Sm,
    zIndex: Dl,
    fillOpacity: Ni,
    strokeOpacity: Ni,
    numOctaves: Dl,
  },
  Cm = {
    ...Fa,
    color: De,
    backgroundColor: De,
    outlineColor: De,
    fill: De,
    stroke: De,
    borderColor: De,
    borderTopColor: De,
    borderRightColor: De,
    borderBottomColor: De,
    borderLeftColor: De,
    filter: zo,
    WebkitFilter: zo,
  },
  Jc = (n) => Cm[n];
function ef(n, e) {
  let t = Jc(n);
  return (
    t !== zo && (t = jr), t.getAnimatableNone ? t.getAnimatableNone(e) : void 0
  );
}
const Mm = new Set(["auto", "none", "0"]);
function km(n, e, t) {
  let r = 0,
    i;
  for (; r < n.length && !i; ) {
    const s = n[r];
    typeof s == "string" && !Mm.has(s) && Bi(s).values.length && (i = n[r]),
      r++;
  }
  if (i && t) for (const s of e) n[s] = ef(t, i);
}
class Am extends Ra {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: t, name: r } = this;
    if (!t || !t.current) return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && ((u = u.trim()), Sa(u))) {
        const c = Gc(u, t.current);
        c !== void 0 && (e[l] = c),
          l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if ((this.resolveNoneKeyframes(), !qc.has(r) || e.length !== 2)) return;
    const [i, s] = e,
      o = Rl(i),
      a = Rl(s);
    if (o !== a)
      if (kl(o) && kl(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else un[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: t } = this,
      r = [];
    for (let i = 0; i < e.length; i++) (e[i] === null || vm(e[i])) && r.push(i);
    r.length && km(e, r, t);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: t, name: r } = this;
    if (!e || !e.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = un[r](
        e.measureViewportBox(),
        window.getComputedStyle(e.current)
      )),
      (t[0] = this.measuredOrigin);
    const i = t[t.length - 1];
    i !== void 0 && e.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    const { element: e, name: t, unresolvedKeyframes: r } = this;
    if (!e || !e.current) return;
    const i = e.getValue(t);
    i && i.jump(this.measuredOrigin, !1);
    const s = r.length - 1,
      o = r[s];
    (r[s] = un[t](e.measureViewportBox(), window.getComputedStyle(e.current))),
      o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([a, l]) => {
          e.getValue(a).set(l);
        }),
      this.resolveNoneKeyframes();
  }
}
function tf(n, e, t) {
  if (n instanceof EventTarget) return [n];
  if (typeof n == "string") {
    let r = document;
    const i = t?.[n] ?? r.querySelectorAll(n);
    return i ? Array.from(i) : [];
  }
  return Array.from(n);
}
const rf = (n, e) => (e && typeof n == "number" ? e.transform(n) : n),
  Fl = 30,
  Pm = (n) => !isNaN(parseFloat(n));
class Om {
  constructor(e, t = {}) {
    (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r) => {
        const i = Lt.now();
        if (
          (this.updatedAt !== i && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            (this.events.change?.notify(this.current), this.dependents))
        )
          for (const s of this.dependents) s.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(e),
      (this.owner = t.owner);
  }
  setCurrent(e) {
    (this.current = e),
      (this.updatedAt = Lt.now()),
      this.canTrackVelocity === null &&
        e !== void 0 &&
        (this.canTrackVelocity = Pm(this.current));
  }
  setPrevFrameValue(e = this.current) {
    (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(e) {
    return this.on("change", e);
  }
  on(e, t) {
    this.events[e] || (this.events[e] = new pc());
    const r = this.events[e].add(t);
    return e === "change"
      ? () => {
          r(),
            xr.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, t) {
    (this.passiveEffect = e), (this.stopPassiveEffect = t);
  }
  set(e) {
    this.passiveEffect
      ? this.passiveEffect(e, this.updateAndNotify)
      : this.updateAndNotify(e);
  }
  setWithVelocity(e, t, r) {
    this.set(t),
      (this.prev = void 0),
      (this.prevFrameValue = e),
      (this.prevUpdatedAt = this.updatedAt - r);
  }
  jump(e, t = !0) {
    this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      t && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = Lt.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      e - this.updatedAt > Fl
    )
      return 0;
    const t = Math.min(this.updatedAt - this.prevUpdatedAt, Fl);
    return mc(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
  }
  start(e) {
    return (
      this.stop(),
      new Promise((t) => {
        (this.hasAnimated = !0),
          (this.animation = e(t)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Wn(n, e) {
  return new Om(n, e);
}
const { schedule: Em } = kc(queueMicrotask, !1);
function nf(n) {
  return Wd(n) && "ownerSVGElement" in n;
}
function Rm(n) {
  return nf(n) && n.tagName === "svg";
}
const ft = (n) => !!(n && n.getVelocity),
  Dm = [...Zc, De, jr],
  Fm = (n) => Dm.find(Qc(n)),
  Vm = J.createContext({
    transformPagePoint: (n) => n,
    isStatic: !1,
    reducedMotion: "never",
  }),
  Vl = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  jo = {};
for (const n in Vl) jo[n] = { isEnabled: (e) => Vl[n].some((t) => !!e[t]) };
function Im(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Nm(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Bm = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Lm = ["initial", ...Bm];
function sf(n) {
  return Im(n.animate) || Lm.some((e) => Nm(n[e]));
}
function zm(n) {
  return !!(sf(n) || n.variants);
}
function Il(n, e) {
  return e.max === e.min ? 0 : (n / (e.max - e.min)) * 100;
}
const ri = {
    correct: (n, e) => {
      if (!e.target) return n;
      if (typeof n == "string")
        if (N.test(n)) n = parseFloat(n);
        else return n;
      const t = Il(n, e.target.x),
        r = Il(n, e.target.y);
      return `${t}% ${r}%`;
    },
  },
  jm = {
    correct: (n, { treeScale: e, projectionDelta: t }) => {
      const r = n,
        i = jr.parse(n);
      if (i.length > 5) return r;
      const s = jr.createTransformer(n),
        o = typeof i[0] != "number" ? 1 : 0,
        a = t.x.scale * e.x,
        l = t.y.scale * e.y;
      (i[0 + o] /= a), (i[1 + o] /= l);
      const u = Gn(a, l, 0.5);
      return (
        typeof i[2 + o] == "number" && (i[2 + o] /= u),
        typeof i[3 + o] == "number" && (i[3 + o] /= u),
        s(i)
      );
    },
  },
  $m = {
    borderRadius: {
      ...ri,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: ri,
    borderTopRightRadius: ri,
    borderBottomLeftRadius: ri,
    borderBottomRightRadius: ri,
    boxShadow: jm,
  };
function Um(n, { layout: e, layoutId: t }) {
  return (
    qn.has(n) ||
    n.startsWith("origin") ||
    ((e || t !== void 0) && (!!$m[n] || n === "opacity"))
  );
}
const Wm = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  Ym = Hn.length;
function Xm(n, e, t) {
  let r = "",
    i = !0;
  for (let s = 0; s < Ym; s++) {
    const o = Hn[s],
      a = n[o];
    if (a === void 0) continue;
    let l = !0;
    if (
      (typeof a == "number"
        ? (l = a === (o.startsWith("scale") ? 1 : 0))
        : (l = parseFloat(a) === 0),
      !l || t)
    ) {
      const u = rf(a, Fa[o]);
      if (!l) {
        i = !1;
        const c = Wm[o] || o;
        r += `${c}(${u}) `;
      }
      t && (e[o] = u);
    }
  }
  return (r = r.trim()), t ? (r = t(e, i ? "" : r)) : i && (r = "none"), r;
}
function of(n, e, t) {
  const { style: r, vars: i, transformOrigin: s } = n;
  let o = !1,
    a = !1;
  for (const l in e) {
    const u = e[l];
    if (qn.has(l)) {
      o = !0;
      continue;
    } else if (Pc(l)) {
      i[l] = u;
      continue;
    } else {
      const c = rf(u, Fa[l]);
      l.startsWith("origin") ? ((a = !0), (s[l] = c)) : (r[l] = c);
    }
  }
  if (
    (e.transform ||
      (o || t
        ? (r.transform = Xm(e, n.transform, t))
        : r.transform && (r.transform = "none")),
    a)
  ) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = s;
    r.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Km = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  Gm = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Hm(n, e, t = 1, r = 0, i = !0) {
  n.pathLength = 1;
  const s = i ? Km : Gm;
  n[s.offset] = N.transform(-r);
  const o = N.transform(e),
    a = N.transform(t);
  n[s.array] = `${o} ${a}`;
}
function qm(
  n,
  {
    attrX: e,
    attrY: t,
    attrScale: r,
    pathLength: i,
    pathSpacing: s = 1,
    pathOffset: o = 0,
    ...a
  },
  l,
  u,
  c
) {
  if ((of(n, a, u), l)) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  (n.attrs = n.style), (n.style = {});
  const { attrs: f, style: d } = n;
  f.transform && ((d.transform = f.transform), delete f.transform),
    (d.transform || f.transformOrigin) &&
      ((d.transformOrigin = f.transformOrigin ?? "50% 50%"),
      delete f.transformOrigin),
    d.transform &&
      ((d.transformBox = c?.transformBox ?? "fill-box"), delete f.transformBox),
    e !== void 0 && (f.x = e),
    t !== void 0 && (f.y = t),
    r !== void 0 && (f.scale = r),
    i !== void 0 && Hm(f, i, s, o, !1);
}
const Qm = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Nl(n) {
  const e = [{}, {}];
  return (
    n?.values.forEach((t, r) => {
      (e[0][r] = t.get()), (e[1][r] = t.getVelocity());
    }),
    e
  );
}
function af(n, e, t, r) {
  if (typeof e == "function") {
    const [i, s] = Nl(r);
    e = e(t !== void 0 ? t : n.custom, i, s);
  }
  if (
    (typeof e == "string" && (e = n.variants && n.variants[e]),
    typeof e == "function")
  ) {
    const [i, s] = Nl(r);
    e = e(t !== void 0 ? t : n.custom, i, s);
  }
  return e;
}
function lf(n, e, t) {
  const { style: r } = n,
    i = {};
  for (const s in r)
    (ft(r[s]) ||
      (e.style && ft(e.style[s])) ||
      Um(s, n) ||
      t?.getValue(s)?.liveStyle !== void 0) &&
      (i[s] = r[s]);
  return i;
}
function Zm(n, e, t) {
  const r = lf(n, e, t);
  for (const i in n)
    if (ft(n[i]) || ft(e[i])) {
      const s =
        Hn.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      r[s] = n[i];
    }
  return r;
}
const Va = (n) => n.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Jm = "framerAppearId",
  eg = "data-" + Va(Jm);
function tg({ top: n, left: e, right: t, bottom: r }) {
  return { x: { min: e, max: t }, y: { min: n, max: r } };
}
function rg(n, e) {
  if (!e) return n;
  const t = e({ x: n.left, y: n.top }),
    r = e({ x: n.right, y: n.bottom });
  return { top: t.y, left: t.x, bottom: r.y, right: r.x };
}
function ng(n, e) {
  return tg(rg(n.getBoundingClientRect(), e));
}
const Bl = () => ({ min: 0, max: 0 }),
  Ia = () => ({ x: Bl(), y: Bl() }),
  $o = { current: null },
  uf = { current: !1 };
function ig() {
  if (((uf.current = !0), !!$d))
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"),
        e = () => ($o.current = n.matches);
      n.addEventListener("change", e), e();
    } else $o.current = !1;
}
const zi = new WeakMap();
function sg(n, e, t) {
  for (const r in e) {
    const i = e[r],
      s = t[r];
    if (ft(i)) n.addValue(r, i);
    else if (ft(s)) n.addValue(r, Wn(i, { owner: n }));
    else if (s !== i)
      if (n.hasValue(r)) {
        const o = n.getValue(r);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = n.getStaticValue(r);
        n.addValue(r, Wn(o !== void 0 ? o : i, { owner: n }));
      }
  }
  for (const r in t) e[r] === void 0 && n.removeValue(r);
  return e;
}
const Ll = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class cf {
  scrapeMotionValuesFromProps(e, t, r) {
    return {};
  }
  constructor(
    {
      parent: e,
      props: t,
      presenceContext: r,
      reducedMotionConfig: i,
      blockInitialAnimation: s,
      visualState: o,
    },
    a = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Ra),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const d = Lt.now();
        this.renderScheduledAt < d &&
          ((this.renderScheduledAt = d), xr.render(this.render, !1, !0));
      });
    const { latestValues: l, renderState: u } = o;
    (this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = t.initial ? { ...l } : {}),
      (this.renderState = u),
      (this.parent = e),
      (this.props = t),
      (this.presenceContext = r),
      (this.depth = e ? e.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!s),
      (this.isControllingVariants = sf(t)),
      (this.isVariantNode = zm(t)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(e && e.current));
    const { willChange: c, ...f } = this.scrapeMotionValuesFromProps(
      t,
      {},
      this
    );
    for (const d in f) {
      const h = f[d];
      l[d] !== void 0 && ft(h) && h.set(l[d]);
    }
  }
  mount(e) {
    (this.current = e),
      zi.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((t, r) => this.bindToMotionValue(r, t)),
      uf.current || ig(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : $o.current),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(),
      ko(this.notifyUpdate),
      ko(this.render),
      this.valueSubscriptions.forEach((e) => e()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent?.removeChild(this);
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const t = this.features[e];
      t && (t.unmount(), (t.isMounted = !1));
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e),
      this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, t) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const r = qn.has(e);
    r && this.onBindTransform && this.onBindTransform();
    const i = t.on("change", (o) => {
      (this.latestValues[e] = o),
        this.props.onUpdate && xr.preRender(this.notifyUpdate),
        r && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender();
    });
    let s;
    window.MotionCheckAppearSync &&
      (s = window.MotionCheckAppearSync(this, e, t)),
      this.valueSubscriptions.set(e, () => {
        i(), s && s(), t.owner && t.stop();
      });
  }
  sortNodePosition(e) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== e.type
      ? 0
      : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in jo) {
      const t = jo[e];
      if (!t) continue;
      const { isEnabled: r, Feature: i } = t;
      if (
        (!this.features[e] &&
          i &&
          r(this.props) &&
          (this.features[e] = new i(this)),
        this.features[e])
      ) {
        const s = this.features[e];
        s.isMounted ? s.update() : (s.mount(), (s.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : Ia();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, t) {
    this.latestValues[e] = t;
  }
  update(e, t) {
    (e.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = t);
    for (let r = 0; r < Ll.length; r++) {
      const i = Ll[r];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const s = "on" + i,
        o = e[s];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    (this.prevMotionValues = sg(
      this,
      this.scrapeMotionValuesFromProps(e, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  addVariantChild(e) {
    const t = this.getClosestVariantNode();
    if (t)
      return (
        t.variantChildren && t.variantChildren.add(e),
        () => t.variantChildren.delete(e)
      );
  }
  addValue(e, t) {
    const r = this.values.get(e);
    t !== r &&
      (r && this.removeValue(e),
      this.bindToMotionValue(e, t),
      this.values.set(e, t),
      (this.latestValues[e] = t.get()));
  }
  removeValue(e) {
    this.values.delete(e);
    const t = this.valueSubscriptions.get(e);
    t && (t(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState);
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, t) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let r = this.values.get(e);
    return (
      r === void 0 &&
        t !== void 0 &&
        ((r = Wn(t === null ? void 0 : t, { owner: this })),
        this.addValue(e, r)),
      r
    );
  }
  readValue(e, t) {
    let r =
      this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : this.getBaseTargetFromProps(this.props, e) ??
          this.readValueFromInstance(this.current, e, this.options);
    return (
      r != null &&
        (typeof r == "string" && (hc(r) || dc(r))
          ? (r = parseFloat(r))
          : !Fm(r) && jr.test(t) && (r = ef(e, t)),
        this.setBaseTarget(e, ft(r) ? r.get() : r)),
      ft(r) ? r.get() : r
    );
  }
  setBaseTarget(e, t) {
    this.baseTarget[e] = t;
  }
  getBaseTarget(e) {
    const { initial: t } = this.props;
    let r;
    if (typeof t == "string" || typeof t == "object") {
      const s = af(this.props, t, this.presenceContext?.custom);
      s && (r = s[e]);
    }
    if (t && r !== void 0) return r;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !ft(i)
      ? i
      : this.initialValues[e] !== void 0 && r === void 0
      ? void 0
      : this.baseTarget[e];
  }
  on(e, t) {
    return this.events[e] || (this.events[e] = new pc()), this.events[e].add(t);
  }
  notify(e, ...t) {
    this.events[e] && this.events[e].notify(...t);
  }
  scheduleRenderMicrotask() {
    Em.render(this.render);
  }
}
class ff extends cf {
  constructor() {
    super(...arguments), (this.KeyframeResolver = Am);
  }
  sortInstanceNodePosition(e, t) {
    return e.compareDocumentPosition(t) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, t) {
    return e.style ? e.style[t] : void 0;
  }
  removeValueFromRenderState(e, { vars: t, style: r }) {
    delete t[e], delete r[e];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    ft(e) &&
      (this.childSubscription = e.on("change", (t) => {
        this.current && (this.current.textContent = `${t}`);
      }));
  }
}
function hf(n, { style: e, vars: t }, r, i) {
  const s = n.style;
  let o;
  for (o in e) s[o] = e[o];
  i?.applyProjectionStyles(s, r);
  for (o in t) s.setProperty(o, t[o]);
}
function og(n) {
  return window.getComputedStyle(n);
}
class ag extends ff {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = hf);
  }
  readValueFromInstance(e, t) {
    if (qn.has(t)) return this.projection?.isProjecting ? Fo(t) : Yp(e, t);
    {
      const r = og(e),
        i = (Pc(t) ? r.getPropertyValue(t) : r[t]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: t }) {
    return ng(e, t);
  }
  build(e, t, r) {
    of(e, t, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, t, r) {
    return lf(e, t, r);
  }
}
const df = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function lg(n, e, t, r) {
  hf(n, e, void 0, r);
  for (const i in e.attrs) n.setAttribute(df.has(i) ? i : Va(i), e.attrs[i]);
}
class ug extends ff {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Ia);
  }
  getBaseTargetFromProps(e, t) {
    return e[t];
  }
  readValueFromInstance(e, t) {
    if (qn.has(t)) {
      const r = Jc(t);
      return (r && r.default) || 0;
    }
    return (t = df.has(t) ? t : Va(t)), e.getAttribute(t);
  }
  scrapeMotionValuesFromProps(e, t, r) {
    return Zm(e, t, r);
  }
  build(e, t, r) {
    qm(e, t, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(e, t, r, i) {
    lg(e, t, r, i);
  }
  mount(e) {
    (this.isSVGTag = Qm(e.tagName)), super.mount(e);
  }
}
function cg(n, e, t) {
  const r = n.getProps();
  return af(r, e, r.custom, n);
}
const fg = (n) => Array.isArray(n);
function hg(n, e, t) {
  n.hasValue(e) ? n.getValue(e).set(t) : n.addValue(e, Wn(t));
}
function dg(n) {
  return fg(n) ? n[n.length - 1] || 0 : n;
}
function pg(n, e) {
  const t = cg(n, e);
  let { transitionEnd: r = {}, transition: i = {}, ...s } = t || {};
  s = { ...s, ...r };
  for (const o in s) {
    const a = dg(s[o]);
    hg(n, o, a);
  }
}
function mg(n) {
  return !!(ft(n) && n.add);
}
function gg(n, e) {
  const t = n.getValue("willChange");
  if (mg(t)) return t.add(e);
  if (!t && yr.WillChange) {
    const r = new yr.WillChange("auto");
    n.addValue("willChange", r), r.add(e);
  }
}
function _g(n) {
  return n.props[eg];
}
const yg = (n) => n !== null;
function xg(n, { repeat: e, repeatType: t = "loop" }, r) {
  const i = n.filter(yg),
    s = e && t !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return i[s];
}
const vg = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  bg = (n) => ({
    type: "spring",
    stiffness: 550,
    damping: n === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Tg = { type: "keyframes", duration: 0.8 },
  wg = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  Sg = (n, { keyframes: e }) =>
    e.length > 2
      ? Tg
      : qn.has(n)
      ? n.startsWith("scale")
        ? bg(e[1])
        : vg
      : wg;
function Cg({
  when: n,
  delay: e,
  delayChildren: t,
  staggerChildren: r,
  staggerDirection: i,
  repeat: s,
  repeatType: o,
  repeatDelay: a,
  from: l,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
const pf =
  (n, e, t, r = {}, i, s) =>
  (o) => {
    const a = Hc(r, n) || {},
      l = a.delay || r.delay || 0;
    let { elapsed: u = 0 } = r;
    u = u - nr(l);
    const c = {
      keyframes: Array.isArray(t) ? t : [null, t],
      ease: "easeOut",
      velocity: e.getVelocity(),
      ...a,
      delay: -u,
      onUpdate: (d) => {
        e.set(d), a.onUpdate && a.onUpdate(d);
      },
      onComplete: () => {
        o(), a.onComplete && a.onComplete();
      },
      name: n,
      motionValue: e,
      element: s ? void 0 : i,
    };
    Cg(a) || Object.assign(c, Sg(n, c)),
      c.duration && (c.duration = nr(c.duration)),
      c.repeatDelay && (c.repeatDelay = nr(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from);
    let f = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        (Lo(c), c.delay === 0 && (f = !0)),
      (yr.instantAnimations || yr.skipAnimations) &&
        ((f = !0), Lo(c), (c.delay = 0)),
      (c.allowFlatten = !a.type && !a.ease),
      f && !s && e.get() !== void 0)
    ) {
      const d = xg(c.keyframes, a);
      if (d !== void 0) {
        xr.update(() => {
          c.onUpdate(d), c.onComplete();
        });
        return;
      }
    }
    return a.isSync ? new Ea(c) : new pm(c);
  };
function Mg({ protectedKeys: n, needsAnimating: e }, t) {
  const r = n.hasOwnProperty(t) && e[t] !== !0;
  return (e[t] = !1), r;
}
function kg(n, e, { delay: t = 0, transitionOverride: r, type: i } = {}) {
  let { transition: s = n.getDefaultTransition(), transitionEnd: o, ...a } = e;
  r && (s = r);
  const l = [],
    u = i && n.animationState && n.animationState.getState()[i];
  for (const c in a) {
    const f = n.getValue(c, n.latestValues[c] ?? null),
      d = a[c];
    if (d === void 0 || (u && Mg(u, c))) continue;
    const h = { delay: t, ...Hc(s || {}, c) },
      m = f.get();
    if (
      m !== void 0 &&
      !f.isAnimating &&
      !Array.isArray(d) &&
      d === m &&
      !h.velocity
    )
      continue;
    let p = !1;
    if (window.MotionHandoffAnimation) {
      const x = _g(n);
      if (x) {
        const T = window.MotionHandoffAnimation(x, c, xr);
        T !== null && ((h.startTime = T), (p = !0));
      }
    }
    gg(n, c),
      f.start(
        pf(c, f, d, n.shouldReduceMotion && qc.has(c) ? { type: !1 } : h, n, p)
      );
    const g = f.animation;
    g && l.push(g);
  }
  return (
    o &&
      Promise.all(l).then(() => {
        xr.update(() => {
          o && pg(n, o);
        });
      }),
    l
  );
}
function Ag(n, e, t) {
  const r = ft(n) ? n : Wn(n);
  return r.start(pf("", r, e, t)), r.animation;
}
function Pg(n) {
  const e = jd(() => Wn(n)),
    { isStatic: t } = J.useContext(Vm);
  if (t) {
    const [, r] = J.useState(n);
    J.useEffect(() => e.on("change", r), []);
  }
  return e;
}
function Na(n) {
  return typeof n == "object" && !Array.isArray(n);
}
function mf(n, e, t, r) {
  return typeof n == "string" && Na(e)
    ? tf(n, t, r)
    : n instanceof NodeList
    ? Array.from(n)
    : Array.isArray(n)
    ? n
    : [n];
}
function Og(n, e, t) {
  return n * (e + 1);
}
function zl(n, e, t, r) {
  return typeof e == "number"
    ? e
    : e.startsWith("-") || e.startsWith("+")
    ? Math.max(0, n + parseFloat(e))
    : e === "<"
    ? t
    : e.startsWith("<")
    ? Math.max(0, t + parseFloat(e.slice(1)))
    : r.get(e) ?? n;
}
function Eg(n, e, t) {
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    i.at > e && i.at < t && (fc(n, i), r--);
  }
}
function Rg(n, e, t, r, i, s) {
  Eg(n, i, s);
  for (let o = 0; o < e.length; o++)
    n.push({ value: e[o], at: Gn(i, s, r[o]), easing: Cc(t, o) });
}
function Dg(n, e) {
  for (let t = 0; t < n.length; t++) n[t] = n[t] / (e + 1);
}
function Fg(n, e) {
  return n.at === e.at
    ? n.value === null
      ? 1
      : e.value === null
      ? -1
      : 0
    : n.at - e.at;
}
const Vg = "easeInOut";
function Ig(n, { defaultTransition: e = {}, ...t } = {}, r, i) {
  const s = e.duration || 0.3,
    o = new Map(),
    a = new Map(),
    l = {},
    u = new Map();
  let c = 0,
    f = 0,
    d = 0;
  for (let h = 0; h < n.length; h++) {
    const m = n[h];
    if (typeof m == "string") {
      u.set(m, f);
      continue;
    } else if (!Array.isArray(m)) {
      u.set(m.name, zl(f, m.at, c, u));
      continue;
    }
    let [p, g, x = {}] = m;
    x.at !== void 0 && (f = zl(f, x.at, c, u));
    let T = 0;
    const w = (v, y, M, b = 0, C = 0) => {
      const S = Ng(v),
        {
          delay: A = 0,
          times: D = jc(S),
          type: O = "keyframes",
          repeat: B,
          repeatType: U,
          repeatDelay: L = 0,
          ...Y
        } = y;
      let { ease: F = e.ease || "easeOut", duration: z } = y;
      const ie = typeof A == "function" ? A(b, C) : A,
        _ = S.length,
        Q = Da(O) ? O : i?.[O || "keyframes"];
      if (_ <= 2 && Q) {
        let pe = 100;
        if (_ === 2 && zg(S)) {
          const Ce = S[1] - S[0];
          pe = Math.abs(Ce);
        }
        const Se = { ...Y };
        z !== void 0 && (Se.duration = nr(z));
        const ce = Bc(Se, pe, Q);
        (F = ce.ease), (z = ce.duration);
      }
      z ?? (z = s);
      const de = f + ie;
      D.length === 1 && D[0] === 0 && (D[1] = 1);
      const Ue = D.length - S.length;
      if ((Ue > 0 && zc(D, Ue), S.length === 1 && S.unshift(null), B)) {
        z = Og(z, B);
        const pe = [...S],
          Se = [...D];
        F = Array.isArray(F) ? [...F] : [F];
        const ce = [...F];
        for (let Ce = 0; Ce < B; Ce++) {
          S.push(...pe);
          for (let xe = 0; xe < pe.length; xe++)
            D.push(Se[xe] + (Ce + 1)),
              F.push(xe === 0 ? "linear" : Cc(ce, xe - 1));
        }
        Dg(D, B);
      }
      const te = de + z;
      Rg(M, S, F, D, de, te), (T = Math.max(ie + z, T)), (d = Math.max(te, d));
    };
    if (ft(p)) {
      const v = jl(p, a);
      w(g, x, $l("default", v));
    } else {
      const v = mf(p, g, r, l),
        y = v.length;
      for (let M = 0; M < y; M++) {
        (g = g), (x = x);
        const b = v[M],
          C = jl(b, a);
        for (const S in g) w(g[S], Bg(x, S), $l(S, C), M, y);
      }
    }
    (c = f), (f += T);
  }
  return (
    a.forEach((h, m) => {
      for (const p in h) {
        const g = h[p];
        g.sort(Fg);
        const x = [],
          T = [],
          w = [];
        for (let y = 0; y < g.length; y++) {
          const { at: M, value: b, easing: C } = g[y];
          x.push(b), T.push(ba(0, d, M)), w.push(C || "easeOut");
        }
        T[0] !== 0 && (T.unshift(0), x.unshift(x[0]), w.unshift(Vg)),
          T[T.length - 1] !== 1 && (T.push(1), x.push(null)),
          o.has(m) || o.set(m, { keyframes: {}, transition: {} });
        const v = o.get(m);
        (v.keyframes[p] = x),
          (v.transition[p] = { ...e, duration: d, ease: w, times: T, ...t });
      }
    }),
    o
  );
}
function jl(n, e) {
  return !e.has(n) && e.set(n, {}), e.get(n);
}
function $l(n, e) {
  return e[n] || (e[n] = []), e[n];
}
function Ng(n) {
  return Array.isArray(n) ? n : [n];
}
function Bg(n, e) {
  return n && n[e] ? { ...n, ...n[e] } : { ...n };
}
const Lg = (n) => typeof n == "number",
  zg = (n) => n.every(Lg);
function jg(n, e) {
  return n in e;
}
class $g extends cf {
  constructor() {
    super(...arguments), (this.type = "object");
  }
  readValueFromInstance(e, t) {
    if (jg(t, e)) {
      const r = e[t];
      if (typeof r == "string" || typeof r == "number") return r;
    }
  }
  getBaseTargetFromProps() {}
  removeValueFromRenderState(e, t) {
    delete t.output[e];
  }
  measureInstanceViewportBox() {
    return Ia();
  }
  build(e, t) {
    Object.assign(e.output, t);
  }
  renderInstance(e, { output: t }) {
    Object.assign(e, t);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function Ug(n) {
  const e = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: {
          transform: {},
          transformOrigin: {},
          style: {},
          vars: {},
          attrs: {},
        },
        latestValues: {},
      },
    },
    t = nf(n) && !Rm(n) ? new ug(e) : new ag(e);
  t.mount(n), zi.set(n, t);
}
function Wg(n) {
  const e = {
      presenceContext: null,
      props: {},
      visualState: { renderState: { output: {} }, latestValues: {} },
    },
    t = new $g(e);
  t.mount(n), zi.set(n, t);
}
function Yg(n, e) {
  return ft(n) || typeof n == "number" || (typeof n == "string" && !Na(e));
}
function gf(n, e, t, r) {
  const i = [];
  if (Yg(n, e)) i.push(Ag(n, (Na(e) && e.default) || e, t && (t.default || t)));
  else {
    const s = mf(n, e, r),
      o = s.length;
    for (let a = 0; a < o; a++) {
      const l = s[a],
        u = l instanceof Element ? Ug : Wg;
      zi.has(l) || u(l);
      const c = zi.get(l),
        f = { ...t };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)),
        i.push(...kg(c, { ...e, transition: f }, {}));
    }
  }
  return i;
}
function Xg(n, e, t) {
  const r = [];
  return (
    Ig(n, e, t, { spring: Li }).forEach(
      ({ keyframes: s, transition: o }, a) => {
        r.push(...gf(a, s, o));
      }
    ),
    r
  );
}
function Kg(n) {
  return Array.isArray(n) && n.some(Array.isArray);
}
function Gg(n) {
  function e(t, r, i) {
    let s = [],
      o;
    if (Kg(t)) s = Xg(t, r, n);
    else {
      const { onComplete: l, ...u } = i || {};
      typeof l == "function" && (o = l), (s = gf(t, r, u, n));
    }
    const a = new gm(s);
    return o && a.finished.then(o), a;
  }
  return e;
}
const Hg = Gg(),
  qg = { some: 0, all: 1 };
function Qg(n, e, { root: t, margin: r, amount: i = "some" } = {}) {
  const s = tf(n),
    o = new WeakMap(),
    a = (u) => {
      u.forEach((c) => {
        const f = o.get(c.target);
        if (c.isIntersecting !== !!f)
          if (c.isIntersecting) {
            const d = e(c.target, c);
            typeof d == "function" ? o.set(c.target, d) : l.unobserve(c.target);
          } else typeof f == "function" && (f(c), o.delete(c.target));
      });
    },
    l = new IntersectionObserver(a, {
      root: t,
      rootMargin: r,
      threshold: typeof i == "number" ? i : qg[i],
    });
  return s.forEach((u) => l.observe(u)), () => l.disconnect();
}
function Zg(
  n,
  { root: e, margin: t, amount: r, once: i = !1, initial: s = !1 } = {}
) {
  const [o, a] = J.useState(s);
  return (
    J.useEffect(() => {
      if (!n.current || (i && o)) return;
      const l = () => (a(!0), i ? void 0 : () => a(!1)),
        u = { root: (e && e.current) || void 0, margin: t, amount: r };
      return Qg(n.current, l, u);
    }, [e, n, t, i, r]),
    o
  );
}
function Ul({
  to: n,
  from: e = 0,
  direction: t = "up",
  delay: r = 0,
  duration: i = 1,
  className: s = "",
  startWhen: o = !0,
  separator: a = "",
  onStart: l,
  onEnd: u,
}) {
  const c = J.useRef(null),
    f = Pg(t === "down" ? n : e),
    d = Zg(c, { once: !0, margin: "0px" }),
    h = (g) => {
      const x = g.toString();
      if (x.includes(".")) {
        const T = x.split(".")[1];
        if (parseInt(T) !== 0) return T.length;
      }
      return 0;
    },
    m = Math.max(h(e), h(n)),
    p = J.useCallback(
      (g) => {
        const x = m > 0,
          T = {
            useGrouping: !!a,
            minimumFractionDigits: x ? m : 0,
            maximumFractionDigits: x ? m : 0,
          },
          w = Intl.NumberFormat("en-US", T).format(g);
        return a ? w.replace(/,/g, a) : w;
      },
      [m, a]
    );
  return (
    J.useEffect(() => {
      c.current && (c.current.textContent = p(t === "down" ? n : e));
    }, [e, n, t, p]),
    J.useEffect(() => {
      if (d && o) {
        typeof l == "function" && l();
        const g = setTimeout(() => {
          Hg(f, t === "down" ? e : n, {
            duration: i,
            ease: "easeOut",
            onComplete: () => {
              typeof u == "function" && u();
            },
          });
        }, r * 1e3);
        return () => {
          clearTimeout(g);
        };
      }
    }, [d, o, f, t, e, n, r, l, u, i]),
    J.useEffect(() => {
      const g = f.on("change", (x) => {
        c.current && (c.current.textContent = p(x));
      });
      return () => g();
    }, [f, p]),
    P.jsx("span", { className: s, ref: c })
  );
}
function Jg() {
  const {
      formattedBalance: n,
      formattedEthOnly: e,
      formattedDaoTokens: t,
      totalBalanceEth: r,
      isLoading: i,
      isError: s,
    } = Bd(),
    { price: o, isLoading: a, isError: l } = zd(),
    u = o && r ? r * o : null;
  return P.jsx("section", {
    className: "w-full px-4 pt-16",
    children: P.jsx("div", {
      className: "max-w-10xl mx-auto mt-[calc(-100px)] relative z-10",
      children: P.jsxs("div", {
        className:
          "relative bg-dao-blue-light rounded-card px-8 py-[76px] md:px-16 md:py-[115px] overflow-hidden shadow-md",
        children: [
          P.jsx("div", {
            className:
              "absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none",
          }),
          P.jsxs("div", {
            className:
              "relative z-10 flex flex-col items-center gap-4 md:gap-8",
            children: [
              P.jsxs("div", {
                className:
                  "flex flex-row items-center justify-center gap-4 md:gap-8",
                children: [
                  P.jsx("img", {
                    src: "/eth-logo.svg",
                    alt: "ETH",
                    className: "w-[38px] h-15 md:w-[76px] md:h-[121px]",
                  }),
                  P.jsx("span", {
                    className:
                      "text-4xl md:text-8xl font-semibold tracking-tight leading-tight",
                    title: i || s ? void 0 : `${e} ETH + ${t} DAO`,
                    children: i
                      ? P.jsx("span", {
                          className: "text-white",
                          children: "...",
                        })
                      : s
                      ? P.jsx("span", {
                          className: "text-white",
                          children: "Error",
                        })
                      : P.jsxs(P.Fragment, {
                          children: [
                            P.jsx("span", {
                              className:
                                "text-dao-green tabular-nums inline-block min-w-[3ch]",
                              children: n,
                            }),
                            P.jsx("span", {
                              className: "text-white",
                              children: " ETH",
                            }),
                          ],
                        }),
                  }),
                ],
              }),
              P.jsx("p", {
                className:
                  "text-2xl md:text-7xl font-normal leading-normal text-center",
                children:
                  a || i
                    ? P.jsx("span", {
                        className: "text-white",
                        children: "...",
                      })
                    : l || s
                    ? P.jsx("span", {
                        className: "text-white",
                        children: "Error",
                      })
                    : u
                    ? u >= 1e9
                      ? P.jsxs(P.Fragment, {
                          children: [
                            P.jsxs("span", {
                              className: "text-dao-green",
                              children: [
                                "$",
                                P.jsx(Ul, {
                                  from: 0.1,
                                  to: Number((u / 1e9).toFixed(2)),
                                  duration: 1,
                                  className:
                                    "tabular-nums inline-block min-w-[3ch]",
                                }),
                              ],
                            }),
                            P.jsx("span", {
                              className: "text-white",
                              children: " Billion",
                            }),
                          ],
                        })
                      : P.jsxs(P.Fragment, {
                          children: [
                            P.jsxs("span", {
                              className: "text-dao-green",
                              children: [
                                "$",
                                P.jsx(Ul, {
                                  from: 100,
                                  to: Number((u / 1e6).toFixed(2)),
                                  duration: 1,
                                  className:
                                    "tabular-nums inline-block min-w-[3ch]",
                                }),
                              ],
                            }),
                            P.jsx("span", {
                              className: "text-white",
                              children: " Million",
                            }),
                          ],
                        })
                    : P.jsx("span", {
                        className: "text-white",
                        children: "...",
                      }),
              }),
              P.jsx("p", {
                className:
                  "text-white text-2xl font-normal leading-none text-center",
                children: "For Ethereum Security.",
              }),
              P.jsx("a", {
                href: "https://paragraph.com/@thedao.fund/thedao-security-fund-activating-75000-eth-for-ethereum-security",
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "mt-4 bg-dao-red hover:bg-dao-red-hover text-white font-medium text-sm px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 h-12 inline-flex items-center",
                children: "Learn More",
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
const e_ = [
    {
      image: "/vitalik-buterin.webp",
      name: "Vitalik Buterin",
      organization: "Ethereum Foundation",
    },
    {
      image: "/taylor-monahan.webp",
      name: "Taylor Monahan",
      organization: "Metamask",
    },
    {
      image: "/jordi-baylina.webp",
      name: "Jordi Baylina",
      organization: "ZisK",
    },
    {
      image: "/pcaversaccio.webp",
      name: "pcaversaccio",
      organization: "SEAL 911",
    },
  ],
  t_ = [
    {
      image: "/alex-van-de-sande.webp",
      name: "Alex Van de Sande",
      organization: "ENS",
    },
    { image: "/griff-green.webp", name: "Griff Green", organization: "Giveth" },
    { image: "/pol-lanski.webp", name: "Pol Lanski", organization: "Dappnode" },
  ];
function r_() {
  return P.jsx("section", {
    className: "w-full px-4 py-16 md:py-24 relative",
    children: P.jsxs("div", {
      className:
        "max-w-10xl mx-auto flex flex-col items-center gap-16 relative z-10",
      children: [
        P.jsx("h2", {
          className:
            "text-white text-3xl md:text-6xl font-light text-center leading-tight",
          children: "TheDAO Curators",
        }),
        P.jsxs("div", {
          className: "flex flex-col items-center gap-16 w-full",
          children: [
            P.jsx("div", {
              className:
                "flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 w-full",
              children: e_.map((n, e) => P.jsx(Wl, { ...n }, e)),
            }),
            P.jsx("div", {
              className:
                "flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 w-full",
              children: t_.map((n, e) => P.jsx(Wl, { ...n }, e)),
            }),
          ],
        }),
      ],
    }),
  });
}
function Wl({ image: n, name: e, organization: t }) {
  return P.jsxs("div", {
    className: "flex flex-col items-center gap-4 w-[180px] lg:w-[245px] group",
    children: [
      P.jsxs("div", {
        className: "relative overflow-hidden rounded-full aspect-square w-full",
        children: [
          P.jsx("img", {
            className:
              "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
            alt: e,
            src: n,
          }),
          P.jsx("div", {
            className:
              "absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          }),
        ],
      }),
      P.jsxs("div", {
        className: "flex flex-col items-center gap-2 w-full text-center",
        children: [
          P.jsx("h3", {
            className:
              "text-white text-lg lg:text-2xl font-bold leading-snug whitespace-nowrap",
            children: e,
          }),
          P.jsx("p", {
            className:
              "text-white text-lg lg:text-2xl font-normal leading-none whitespace-nowrap",
            children: t,
          }),
        ],
      }),
    ],
  });
}
function n_(n, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(n, r.key, r);
  }
}
function i_(n, e, t) {
  return e && n_(n.prototype, e), n;
}
var Xe,
  gs,
  kt,
  Dr,
  Fr,
  Vn,
  _f,
  Zr,
  xi,
  yf,
  pr,
  Xt,
  xf,
  vf = function () {
    return (
      Xe ||
      (typeof window < "u" && (Xe = window.gsap) && Xe.registerPlugin && Xe)
    );
  },
  bf = 1,
  On = [],
  G = [],
  ir = [],
  vi = Date.now,
  Uo = function (e, t) {
    return t;
  },
  s_ = function () {
    var e = xi.core,
      t = e.bridge || {},
      r = e._scrollers,
      i = e._proxies;
    r.push.apply(r, G),
      i.push.apply(i, ir),
      (G = r),
      (ir = i),
      (Uo = function (o, a) {
        return t[o](a);
      });
  },
  Nr = function (e, t) {
    return ~ir.indexOf(e) && ir[ir.indexOf(e) + 1][t];
  },
  bi = function (e) {
    return !!~yf.indexOf(e);
  },
  st = function (e, t, r, i, s) {
    return e.addEventListener(t, r, { passive: i !== !1, capture: !!s });
  },
  it = function (e, t, r, i) {
    return e.removeEventListener(t, r, !!i);
  },
  Ji = "scrollLeft",
  es = "scrollTop",
  Wo = function () {
    return (pr && pr.isPressed) || G.cache++;
  },
  Ds = function (e, t) {
    var r = function i(s) {
      if (s || s === 0) {
        bf && (kt.history.scrollRestoration = "manual");
        var o = pr && pr.isPressed;
        (s = i.v = Math.round(s) || (pr && pr.iOS ? 1 : 0)),
          e(s),
          (i.cacheID = G.cache),
          o && Uo("ss", s);
      } else
        (t || G.cache !== i.cacheID || Uo("ref")) &&
          ((i.cacheID = G.cache), (i.v = e()));
      return i.v + i.offset;
    };
    return (r.offset = 0), e && r;
  },
  ct = {
    s: Ji,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: Ds(function (n) {
      return arguments.length
        ? kt.scrollTo(n, Ne.sc())
        : kt.pageXOffset || Dr[Ji] || Fr[Ji] || Vn[Ji] || 0;
    }),
  },
  Ne = {
    s: es,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: ct,
    sc: Ds(function (n) {
      return arguments.length
        ? kt.scrollTo(ct.sc(), n)
        : kt.pageYOffset || Dr[es] || Fr[es] || Vn[es] || 0;
    }),
  },
  dt = function (e, t) {
    return (
      ((t && t._ctx && t._ctx.selector) || Xe.utils.toArray)(e)[0] ||
      (typeof e == "string" && Xe.config().nullTargetWarn !== !1
        ? console.warn("Element not found:", e)
        : null)
    );
  },
  o_ = function (e, t) {
    for (var r = t.length; r--; ) if (t[r] === e || t[r].contains(e)) return !0;
    return !1;
  },
  $r = function (e, t) {
    var r = t.s,
      i = t.sc;
    bi(e) && (e = Dr.scrollingElement || Fr);
    var s = G.indexOf(e),
      o = i === Ne.sc ? 1 : 2;
    !~s && (s = G.push(e) - 1), G[s + o] || st(e, "scroll", Wo);
    var a = G[s + o],
      l =
        a ||
        (G[s + o] =
          Ds(Nr(e, r), !0) ||
          (bi(e)
            ? i
            : Ds(function (u) {
                return arguments.length ? (e[r] = u) : e[r];
              })));
    return (
      (l.target = e),
      a || (l.smooth = Xe.getProperty(e, "scrollBehavior") === "smooth"),
      l
    );
  },
  Yo = function (e, t, r) {
    var i = e,
      s = e,
      o = vi(),
      a = o,
      l = t || 50,
      u = Math.max(500, l * 3),
      c = function (m, p) {
        var g = vi();
        p || g - o > l
          ? ((s = i), (i = m), (a = o), (o = g))
          : r
          ? (i += m)
          : (i = s + ((m - s) / (g - a)) * (o - a));
      },
      f = function () {
        (s = i = r ? 0 : i), (a = o = 0);
      },
      d = function (m) {
        var p = a,
          g = s,
          x = vi();
        return (
          (m || m === 0) && m !== i && c(m),
          o === a || x - a > u
            ? 0
            : ((i + (r ? g : -g)) / ((r ? x : o) - p)) * 1e3
        );
      };
    return { update: c, reset: f, getVelocity: d };
  },
  ni = function (e, t) {
    return (
      t && !e._gsapAllow && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    );
  },
  Yl = function (e) {
    var t = Math.max.apply(Math, e),
      r = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(r) ? t : r;
  },
  Tf = function () {
    (xi = Xe.core.globals().ScrollTrigger), xi && xi.core && s_();
  },
  wf = function (e) {
    return (
      (Xe = e || vf()),
      !gs &&
        Xe &&
        typeof document < "u" &&
        document.body &&
        ((kt = window),
        (Dr = document),
        (Fr = Dr.documentElement),
        (Vn = Dr.body),
        (yf = [kt, Dr, Fr, Vn]),
        Xe.utils.clamp,
        (xf = Xe.core.context || function () {}),
        (Zr = "onpointerenter" in Vn ? "pointer" : "mouse"),
        (_f = Oe.isTouch =
          kt.matchMedia &&
          kt.matchMedia("(hover: none), (pointer: coarse)").matches
            ? 1
            : "ontouchstart" in kt ||
              navigator.maxTouchPoints > 0 ||
              navigator.msMaxTouchPoints > 0
            ? 2
            : 0),
        (Xt = Oe.eventTypes =
          (
            "ontouchstart" in Fr
              ? "touchstart,touchmove,touchcancel,touchend"
              : "onpointerdown" in Fr
              ? "pointerdown,pointermove,pointercancel,pointerup"
              : "mousedown,mousemove,mouseup,mouseup"
          ).split(",")),
        setTimeout(function () {
          return (bf = 0);
        }, 500),
        Tf(),
        (gs = 1)),
      gs
    );
  };
ct.op = Ne;
G.cache = 0;
var Oe = (function () {
  function n(t) {
    this.init(t);
  }
  var e = n.prototype;
  return (
    (e.init = function (r) {
      gs || wf(Xe) || console.warn("Please gsap.registerPlugin(Observer)"),
        xi || Tf();
      var i = r.tolerance,
        s = r.dragMinimum,
        o = r.type,
        a = r.target,
        l = r.lineHeight,
        u = r.debounce,
        c = r.preventDefault,
        f = r.onStop,
        d = r.onStopDelay,
        h = r.ignore,
        m = r.wheelSpeed,
        p = r.event,
        g = r.onDragStart,
        x = r.onDragEnd,
        T = r.onDrag,
        w = r.onPress,
        v = r.onRelease,
        y = r.onRight,
        M = r.onLeft,
        b = r.onUp,
        C = r.onDown,
        S = r.onChangeX,
        A = r.onChangeY,
        D = r.onChange,
        O = r.onToggleX,
        B = r.onToggleY,
        U = r.onHover,
        L = r.onHoverEnd,
        Y = r.onMove,
        F = r.ignoreCheck,
        z = r.isNormalizer,
        ie = r.onGestureStart,
        _ = r.onGestureEnd,
        Q = r.onWheel,
        de = r.onEnable,
        Ue = r.onDisable,
        te = r.onClick,
        pe = r.scrollSpeed,
        Se = r.capture,
        ce = r.allowClicks,
        Ce = r.lockAxis,
        xe = r.onLockAxis;
      (this.target = a = dt(a) || Fr),
        (this.vars = r),
        h && (h = Xe.utils.toArray(h)),
        (i = i || 1e-9),
        (s = s || 0),
        (m = m || 1),
        (pe = pe || 1),
        (o = o || "wheel,touch,pointer"),
        (u = u !== !1),
        l || (l = parseFloat(kt.getComputedStyle(Vn).lineHeight) || 22);
      var vr,
        rt,
        nt,
        re,
        Me,
        ht,
        xt,
        k = this,
        vt = 0,
        or = 0,
        br = r.passive || (!c && r.passive !== !1),
        ve = $r(a, ct),
        ar = $r(a, Ne),
        Tr = ve(),
        Wr = ar(),
        Be =
          ~o.indexOf("touch") &&
          !~o.indexOf("pointer") &&
          Xt[0] === "pointerdown",
        wr = bi(a),
        ke = a.ownerDocument || Dr,
        jt = [0, 0, 0],
        Dt = [0, 0, 0],
        lr = 0,
        Qn = function () {
          return (lr = vi());
        },
        Ee = function (I, ne) {
          return (
            ((k.event = I) && h && o_(I.target, h)) ||
            (ne && Be && I.pointerType !== "touch") ||
            (F && F(I, ne))
          );
        },
        Xi = function () {
          k._vx.reset(), k._vy.reset(), rt.pause(), f && f(k);
        },
        ur = function () {
          var I = (k.deltaX = Yl(jt)),
            ne = (k.deltaY = Yl(Dt)),
            E = Math.abs(I) >= i,
            j = Math.abs(ne) >= i;
          D && (E || j) && D(k, I, ne, jt, Dt),
            E &&
              (y && k.deltaX > 0 && y(k),
              M && k.deltaX < 0 && M(k),
              S && S(k),
              O && k.deltaX < 0 != vt < 0 && O(k),
              (vt = k.deltaX),
              (jt[0] = jt[1] = jt[2] = 0)),
            j &&
              (C && k.deltaY > 0 && C(k),
              b && k.deltaY < 0 && b(k),
              A && A(k),
              B && k.deltaY < 0 != or < 0 && B(k),
              (or = k.deltaY),
              (Dt[0] = Dt[1] = Dt[2] = 0)),
            (re || nt) &&
              (Y && Y(k),
              nt && (g && nt === 1 && g(k), T && T(k), (nt = 0)),
              (re = !1)),
            ht && !(ht = !1) && xe && xe(k),
            Me && (Q(k), (Me = !1)),
            (vr = 0);
        },
        xn = function (I, ne, E) {
          (jt[E] += I),
            (Dt[E] += ne),
            k._vx.update(I),
            k._vy.update(ne),
            u ? vr || (vr = requestAnimationFrame(ur)) : ur();
        },
        vn = function (I, ne) {
          Ce &&
            !xt &&
            ((k.axis = xt = Math.abs(I) > Math.abs(ne) ? "x" : "y"), (ht = !0)),
            xt !== "y" && ((jt[2] += I), k._vx.update(I, !0)),
            xt !== "x" && ((Dt[2] += ne), k._vy.update(ne, !0)),
            u ? vr || (vr = requestAnimationFrame(ur)) : ur();
        },
        Sr = function (I) {
          if (!Ee(I, 1)) {
            I = ni(I, c);
            var ne = I.clientX,
              E = I.clientY,
              j = ne - k.x,
              V = E - k.y,
              $ = k.isDragging;
            (k.x = ne),
              (k.y = E),
              ($ ||
                ((j || V) &&
                  (Math.abs(k.startX - ne) >= s ||
                    Math.abs(k.startY - E) >= s))) &&
                (nt || (nt = $ ? 2 : 1), $ || (k.isDragging = !0), vn(j, V));
          }
        },
        Yr = (k.onPress = function (W) {
          Ee(W, 1) ||
            (W && W.button) ||
            ((k.axis = xt = null),
            rt.pause(),
            (k.isPressed = !0),
            (W = ni(W)),
            (vt = or = 0),
            (k.startX = k.x = W.clientX),
            (k.startY = k.y = W.clientY),
            k._vx.reset(),
            k._vy.reset(),
            st(z ? a : ke, Xt[1], Sr, br, !0),
            (k.deltaX = k.deltaY = 0),
            w && w(k));
        }),
        q = (k.onRelease = function (W) {
          if (!Ee(W, 1)) {
            it(z ? a : ke, Xt[1], Sr, !0);
            var I = !isNaN(k.y - k.startY),
              ne = k.isDragging,
              E =
                ne &&
                (Math.abs(k.x - k.startX) > 3 || Math.abs(k.y - k.startY) > 3),
              j = ni(W);
            !E &&
              I &&
              (k._vx.reset(),
              k._vy.reset(),
              c &&
                ce &&
                Xe.delayedCall(0.08, function () {
                  if (vi() - lr > 300 && !W.defaultPrevented) {
                    if (W.target.click) W.target.click();
                    else if (ke.createEvent) {
                      var V = ke.createEvent("MouseEvents");
                      V.initMouseEvent(
                        "click",
                        !0,
                        !0,
                        kt,
                        1,
                        j.screenX,
                        j.screenY,
                        j.clientX,
                        j.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null
                      ),
                        W.target.dispatchEvent(V);
                    }
                  }
                })),
              (k.isDragging = k.isGesturing = k.isPressed = !1),
              f && ne && !z && rt.restart(!0),
              nt && ur(),
              x && ne && x(k),
              v && v(k, E);
          }
        }),
        Xr = function (I) {
          return (
            I.touches &&
            I.touches.length > 1 &&
            (k.isGesturing = !0) &&
            ie(I, k.isDragging)
          );
        },
        $t = function () {
          return (k.isGesturing = !1) || _(k);
        },
        Ut = function (I) {
          if (!Ee(I)) {
            var ne = ve(),
              E = ar();
            xn((ne - Tr) * pe, (E - Wr) * pe, 1),
              (Tr = ne),
              (Wr = E),
              f && rt.restart(!0);
          }
        },
        Wt = function (I) {
          if (!Ee(I)) {
            (I = ni(I, c)), Q && (Me = !0);
            var ne =
              (I.deltaMode === 1 ? l : I.deltaMode === 2 ? kt.innerHeight : 1) *
              m;
            xn(I.deltaX * ne, I.deltaY * ne, 0), f && !z && rt.restart(!0);
          }
        },
        Kr = function (I) {
          if (!Ee(I)) {
            var ne = I.clientX,
              E = I.clientY,
              j = ne - k.x,
              V = E - k.y;
            (k.x = ne),
              (k.y = E),
              (re = !0),
              f && rt.restart(!0),
              (j || V) && vn(j, V);
          }
        },
        bn = function (I) {
          (k.event = I), U(k);
        },
        cr = function (I) {
          (k.event = I), L(k);
        },
        Zn = function (I) {
          return Ee(I) || (ni(I, c) && te(k));
        };
      (rt = k._dc = Xe.delayedCall(d || 0.25, Xi).pause()),
        (k.deltaX = k.deltaY = 0),
        (k._vx = Yo(0, 50, !0)),
        (k._vy = Yo(0, 50, !0)),
        (k.scrollX = ve),
        (k.scrollY = ar),
        (k.isDragging = k.isGesturing = k.isPressed = !1),
        xf(this),
        (k.enable = function (W) {
          return (
            k.isEnabled ||
              (st(wr ? ke : a, "scroll", Wo),
              o.indexOf("scroll") >= 0 && st(wr ? ke : a, "scroll", Ut, br, Se),
              o.indexOf("wheel") >= 0 && st(a, "wheel", Wt, br, Se),
              ((o.indexOf("touch") >= 0 && _f) || o.indexOf("pointer") >= 0) &&
                (st(a, Xt[0], Yr, br, Se),
                st(ke, Xt[2], q),
                st(ke, Xt[3], q),
                ce && st(a, "click", Qn, !0, !0),
                te && st(a, "click", Zn),
                ie && st(ke, "gesturestart", Xr),
                _ && st(ke, "gestureend", $t),
                U && st(a, Zr + "enter", bn),
                L && st(a, Zr + "leave", cr),
                Y && st(a, Zr + "move", Kr)),
              (k.isEnabled = !0),
              (k.isDragging = k.isGesturing = k.isPressed = re = nt = !1),
              k._vx.reset(),
              k._vy.reset(),
              (Tr = ve()),
              (Wr = ar()),
              W && W.type && Yr(W),
              de && de(k)),
            k
          );
        }),
        (k.disable = function () {
          k.isEnabled &&
            (On.filter(function (W) {
              return W !== k && bi(W.target);
            }).length || it(wr ? ke : a, "scroll", Wo),
            k.isPressed &&
              (k._vx.reset(), k._vy.reset(), it(z ? a : ke, Xt[1], Sr, !0)),
            it(wr ? ke : a, "scroll", Ut, Se),
            it(a, "wheel", Wt, Se),
            it(a, Xt[0], Yr, Se),
            it(ke, Xt[2], q),
            it(ke, Xt[3], q),
            it(a, "click", Qn, !0),
            it(a, "click", Zn),
            it(ke, "gesturestart", Xr),
            it(ke, "gestureend", $t),
            it(a, Zr + "enter", bn),
            it(a, Zr + "leave", cr),
            it(a, Zr + "move", Kr),
            (k.isEnabled = k.isPressed = k.isDragging = !1),
            Ue && Ue(k));
        }),
        (k.kill = k.revert =
          function () {
            k.disable();
            var W = On.indexOf(k);
            W >= 0 && On.splice(W, 1), pr === k && (pr = 0);
          }),
        On.push(k),
        z && bi(a) && (pr = k),
        k.enable(p);
    }),
    i_(n, [
      {
        key: "velocityX",
        get: function () {
          return this._vx.getVelocity();
        },
      },
      {
        key: "velocityY",
        get: function () {
          return this._vy.getVelocity();
        },
      },
    ]),
    n
  );
})();
Oe.version = "3.14.2";
Oe.create = function (n) {
  return new Oe(n);
};
Oe.register = wf;
Oe.getAll = function () {
  return On.slice();
};
Oe.getById = function (n) {
  return On.filter(function (e) {
    return e.vars.id === n;
  })[0];
};
vf() && Xe.registerPlugin(Oe);
var R,
  Cn,
  K,
  ue,
  Ct,
  se,
  Ba,
  Fs,
  ji,
  Ti,
  li,
  ts,
  Qe,
  zs,
  Xo,
  at,
  Xl,
  Kl,
  Mn,
  Sf,
  to,
  Cf,
  ot,
  Ko,
  Mf,
  kf,
  kr,
  Go,
  La,
  In,
  za,
  wi,
  Ho,
  ro,
  rs = 1,
  Ze = Date.now,
  no = Ze(),
  zt = 0,
  ui = 0,
  Gl = function (e, t, r) {
    var i = wt(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
    return (r["_" + t + "Clamp"] = i), i ? e.substr(6, e.length - 7) : e;
  },
  Hl = function (e, t) {
    return t && (!wt(e) || e.substr(0, 6) !== "clamp(")
      ? "clamp(" + e + ")"
      : e;
  },
  a_ = function n() {
    return ui && requestAnimationFrame(n);
  },
  ql = function () {
    return (zs = 1);
  },
  Ql = function () {
    return (zs = 0);
  },
  Jt = function (e) {
    return e;
  },
  ci = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Af = function () {
    return typeof window < "u";
  },
  Pf = function () {
    return R || (Af() && (R = window.gsap) && R.registerPlugin && R);
  },
  mn = function (e) {
    return !!~Ba.indexOf(e);
  },
  Of = function (e) {
    return (
      (e === "Height" ? za : K["inner" + e]) ||
      Ct["client" + e] ||
      se["client" + e]
    );
  },
  Ef = function (e) {
    return (
      Nr(e, "getBoundingClientRect") ||
      (mn(e)
        ? function () {
            return (bs.width = K.innerWidth), (bs.height = za), bs;
          }
        : function () {
            return dr(e);
          })
    );
  },
  l_ = function (e, t, r) {
    var i = r.d,
      s = r.d2,
      o = r.a;
    return (o = Nr(e, "getBoundingClientRect"))
      ? function () {
          return o()[i];
        }
      : function () {
          return (t ? Of(s) : e["client" + s]) || 0;
        };
  },
  u_ = function (e, t) {
    return !t || ~ir.indexOf(e)
      ? Ef(e)
      : function () {
          return bs;
        };
  },
  rr = function (e, t) {
    var r = t.s,
      i = t.d2,
      s = t.d,
      o = t.a;
    return Math.max(
      0,
      (r = "scroll" + i) && (o = Nr(e, r))
        ? o() - Ef(e)()[s]
        : mn(e)
        ? (Ct[r] || se[r]) - Of(i)
        : e[r] - e["offset" + i]
    );
  },
  ns = function (e, t) {
    for (var r = 0; r < Mn.length; r += 3)
      (!t || ~t.indexOf(Mn[r + 1])) && e(Mn[r], Mn[r + 1], Mn[r + 2]);
  },
  wt = function (e) {
    return typeof e == "string";
  },
  et = function (e) {
    return typeof e == "function";
  },
  fi = function (e) {
    return typeof e == "number";
  },
  Jr = function (e) {
    return typeof e == "object";
  },
  ii = function (e, t, r) {
    return e && e.progress(t ? 0 : 1) && r && e.pause();
  },
  io = function (e, t) {
    if (e.enabled) {
      var r = e._ctx
        ? e._ctx.add(function () {
            return t(e);
          })
        : t(e);
      r && r.totalTime && (e.callbackAnimation = r);
    }
  },
  wn = Math.abs,
  Rf = "left",
  Df = "top",
  ja = "right",
  $a = "bottom",
  fn = "width",
  hn = "height",
  Si = "Right",
  Ci = "Left",
  Mi = "Top",
  ki = "Bottom",
  Re = "padding",
  Vt = "margin",
  Yn = "Width",
  Ua = "Height",
  Ie = "px",
  It = function (e) {
    return K.getComputedStyle(e);
  },
  c_ = function (e) {
    var t = It(e).position;
    e.style.position = t === "absolute" || t === "fixed" ? t : "relative";
  },
  Zl = function (e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e;
  },
  dr = function (e, t) {
    var r =
        t &&
        It(e)[Xo] !== "matrix(1, 0, 0, 1, 0, 0)" &&
        R.to(e, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
        }).progress(1),
      i = e.getBoundingClientRect();
    return r && r.progress(0).kill(), i;
  },
  Vs = function (e, t) {
    var r = t.d2;
    return e["offset" + r] || e["client" + r] || 0;
  },
  Ff = function (e) {
    var t = [],
      r = e.labels,
      i = e.duration(),
      s;
    for (s in r) t.push(r[s] / i);
    return t;
  },
  f_ = function (e) {
    return function (t) {
      return R.utils.snap(Ff(e), t);
    };
  },
  Wa = function (e) {
    var t = R.utils.snap(e),
      r =
        Array.isArray(e) &&
        e.slice(0).sort(function (i, s) {
          return i - s;
        });
    return r
      ? function (i, s, o) {
          o === void 0 && (o = 0.001);
          var a;
          if (!s) return t(i);
          if (s > 0) {
            for (i -= o, a = 0; a < r.length; a++) if (r[a] >= i) return r[a];
            return r[a - 1];
          } else for (a = r.length, i += o; a--; ) if (r[a] <= i) return r[a];
          return r[0];
        }
      : function (i, s, o) {
          o === void 0 && (o = 0.001);
          var a = t(i);
          return !s || Math.abs(a - i) < o || a - i < 0 == s < 0
            ? a
            : t(s < 0 ? i - e : i + e);
        };
  },
  h_ = function (e) {
    return function (t, r) {
      return Wa(Ff(e))(t, r.direction);
    };
  },
  is = function (e, t, r, i) {
    return r.split(",").forEach(function (s) {
      return e(t, s, i);
    });
  },
  je = function (e, t, r, i, s) {
    return e.addEventListener(t, r, { passive: !i, capture: !!s });
  },
  ze = function (e, t, r, i) {
    return e.removeEventListener(t, r, !!i);
  },
  ss = function (e, t, r) {
    (r = r && r.wheelHandler), r && (e(t, "wheel", r), e(t, "touchmove", r));
  },
  Jl = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal",
  },
  os = { toggleActions: "play", anticipatePin: 0 },
  Is = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
  _s = function (e, t) {
    if (wt(e)) {
      var r = e.indexOf("="),
        i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
      ~r && (e.indexOf("%") > r && (i *= t / 100), (e = e.substr(0, r - 1))),
        (e =
          i +
          (e in Is
            ? Is[e] * t
            : ~e.indexOf("%")
            ? (parseFloat(e) * t) / 100
            : parseFloat(e) || 0));
    }
    return e;
  },
  as = function (e, t, r, i, s, o, a, l) {
    var u = s.startColor,
      c = s.endColor,
      f = s.fontSize,
      d = s.indent,
      h = s.fontWeight,
      m = ue.createElement("div"),
      p = mn(r) || Nr(r, "pinType") === "fixed",
      g = e.indexOf("scroller") !== -1,
      x = p ? se : r,
      T = e.indexOf("start") !== -1,
      w = T ? u : c,
      v =
        "border-color:" +
        w +
        ";font-size:" +
        f +
        ";color:" +
        w +
        ";font-weight:" +
        h +
        ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return (
      (v += "position:" + ((g || l) && p ? "fixed;" : "absolute;")),
      (g || l || !p) &&
        (v += (i === Ne ? ja : $a) + ":" + (o + parseFloat(d)) + "px;"),
      a &&
        (v +=
          "box-sizing:border-box;text-align:left;width:" +
          a.offsetWidth +
          "px;"),
      (m._isStart = T),
      m.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
      (m.style.cssText = v),
      (m.innerText = t || t === 0 ? e + "-" + t : e),
      x.children[0] ? x.insertBefore(m, x.children[0]) : x.appendChild(m),
      (m._offset = m["offset" + i.op.d2]),
      ys(m, 0, i, T),
      m
    );
  },
  ys = function (e, t, r, i) {
    var s = { display: "block" },
      o = r[i ? "os2" : "p2"],
      a = r[i ? "p2" : "os2"];
    (e._isFlipped = i),
      (s[r.a + "Percent"] = i ? -100 : 0),
      (s[r.a] = i ? "1px" : 0),
      (s["border" + o + Yn] = 1),
      (s["border" + a + Yn] = 0),
      (s[r.p] = t + "px"),
      R.set(e, s);
  },
  X = [],
  qo = {},
  $i,
  eu = function () {
    return Ze() - zt > 34 && ($i || ($i = requestAnimationFrame(mr)));
  },
  Sn = function () {
    (!ot || !ot.isPressed || ot.startX > se.clientWidth) &&
      (G.cache++,
      ot ? $i || ($i = requestAnimationFrame(mr)) : mr(),
      zt || _n("scrollStart"),
      (zt = Ze()));
  },
  so = function () {
    (kf = K.innerWidth), (Mf = K.innerHeight);
  },
  hi = function (e) {
    G.cache++,
      (e === !0 ||
        (!Qe &&
          !Cf &&
          !ue.fullscreenElement &&
          !ue.webkitFullscreenElement &&
          (!Ko ||
            kf !== K.innerWidth ||
            Math.abs(K.innerHeight - Mf) > K.innerHeight * 0.25))) &&
        Fs.restart(!0);
  },
  gn = {},
  d_ = [],
  Vf = function n() {
    return ze(H, "scrollEnd", n) || nn(!0);
  },
  _n = function (e) {
    return (
      (gn[e] &&
        gn[e].map(function (t) {
          return t();
        })) ||
      d_
    );
  },
  Tt = [],
  If = function (e) {
    for (var t = 0; t < Tt.length; t += 5)
      (!e || (Tt[t + 4] && Tt[t + 4].query === e)) &&
        ((Tt[t].style.cssText = Tt[t + 1]),
        Tt[t].getBBox && Tt[t].setAttribute("transform", Tt[t + 2] || ""),
        (Tt[t + 3].uncache = 1));
  },
  Nf = function () {
    return G.forEach(function (e) {
      return et(e) && ++e.cacheID && (e.rec = e());
    });
  },
  Ya = function (e, t) {
    var r;
    for (at = 0; at < X.length; at++)
      (r = X[at]),
        r && (!t || r._ctx === t) && (e ? r.kill(1) : r.revert(!0, !0));
    (wi = !0), t && If(t), t || _n("revert");
  },
  Bf = function (e, t) {
    G.cache++,
      (t || !lt) &&
        G.forEach(function (r) {
          return et(r) && r.cacheID++ && (r.rec = 0);
        }),
      wt(e) && (K.history.scrollRestoration = La = e);
  },
  lt,
  dn = 0,
  tu,
  p_ = function () {
    if (tu !== dn) {
      var e = (tu = dn);
      requestAnimationFrame(function () {
        return e === dn && nn(!0);
      });
    }
  },
  Lf = function () {
    se.appendChild(In),
      (za = (!ot && In.offsetHeight) || K.innerHeight),
      se.removeChild(In);
  },
  ru = function (e) {
    return ji(
      ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end"
    ).forEach(function (t) {
      return (t.style.display = e ? "none" : "block");
    });
  },
  nn = function (e, t) {
    if (
      ((Ct = ue.documentElement),
      (se = ue.body),
      (Ba = [K, ue, Ct, se]),
      zt && !e && !wi)
    ) {
      je(H, "scrollEnd", Vf);
      return;
    }
    Lf(), (lt = H.isRefreshing = !0), wi || Nf();
    var r = _n("refreshInit");
    Sf && H.sort(),
      t || Ya(),
      G.forEach(function (i) {
        et(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
      }),
      X.slice(0).forEach(function (i) {
        return i.refresh();
      }),
      (wi = !1),
      X.forEach(function (i) {
        if (i._subPinOffset && i.pin) {
          var s = i.vars.horizontal ? "offsetWidth" : "offsetHeight",
            o = i.pin[s];
          i.revert(!0, 1), i.adjustPinSpacing(i.pin[s] - o), i.refresh();
        }
      }),
      (Ho = 1),
      ru(!0),
      X.forEach(function (i) {
        var s = rr(i.scroller, i._dir),
          o = i.vars.end === "max" || (i._endClamp && i.end > s),
          a = i._startClamp && i.start >= s;
        (o || a) &&
          i.setPositions(
            a ? s - 1 : i.start,
            o ? Math.max(a ? s : i.start + 1, s) : i.end,
            !0
          );
      }),
      ru(!1),
      (Ho = 0),
      r.forEach(function (i) {
        return i && i.render && i.render(-1);
      }),
      G.forEach(function (i) {
        et(i) &&
          (i.smooth &&
            requestAnimationFrame(function () {
              return (i.target.style.scrollBehavior = "smooth");
            }),
          i.rec && i(i.rec));
      }),
      Bf(La, 1),
      Fs.pause(),
      dn++,
      (lt = 2),
      mr(2),
      X.forEach(function (i) {
        return et(i.vars.onRefresh) && i.vars.onRefresh(i);
      }),
      (lt = H.isRefreshing = !1),
      _n("refresh");
  },
  Qo = 0,
  xs = 1,
  Ai,
  mr = function (e) {
    if (e === 2 || (!lt && !wi)) {
      (H.isUpdating = !0), Ai && Ai.update(0);
      var t = X.length,
        r = Ze(),
        i = r - no >= 50,
        s = t && X[0].scroll();
      if (
        ((xs = Qo > s ? -1 : 1),
        lt || (Qo = s),
        i &&
          (zt && !zs && r - zt > 200 && ((zt = 0), _n("scrollEnd")),
          (li = no),
          (no = r)),
        xs < 0)
      ) {
        for (at = t; at-- > 0; ) X[at] && X[at].update(0, i);
        xs = 1;
      } else for (at = 0; at < t; at++) X[at] && X[at].update(0, i);
      H.isUpdating = !1;
    }
    $i = 0;
  },
  Zo = [
    Rf,
    Df,
    $a,
    ja,
    Vt + ki,
    Vt + Si,
    Vt + Mi,
    Vt + Ci,
    "display",
    "flexShrink",
    "float",
    "zIndex",
    "gridColumnStart",
    "gridColumnEnd",
    "gridRowStart",
    "gridRowEnd",
    "gridArea",
    "justifySelf",
    "alignSelf",
    "placeSelf",
    "order",
  ],
  vs = Zo.concat([
    fn,
    hn,
    "boxSizing",
    "max" + Yn,
    "max" + Ua,
    "position",
    Vt,
    Re,
    Re + Mi,
    Re + Si,
    Re + ki,
    Re + Ci,
  ]),
  m_ = function (e, t, r) {
    Nn(r);
    var i = e._gsap;
    if (i.spacerIsNative) Nn(i.spacerState);
    else if (e._gsap.swappedIn) {
      var s = t.parentNode;
      s && (s.insertBefore(e, t), s.removeChild(t));
    }
    e._gsap.swappedIn = !1;
  },
  oo = function (e, t, r, i) {
    if (!e._gsap.swappedIn) {
      for (var s = Zo.length, o = t.style, a = e.style, l; s--; )
        (l = Zo[s]), (o[l] = r[l]);
      (o.position = r.position === "absolute" ? "absolute" : "relative"),
        r.display === "inline" && (o.display = "inline-block"),
        (a[$a] = a[ja] = "auto"),
        (o.flexBasis = r.flexBasis || "auto"),
        (o.overflow = "visible"),
        (o.boxSizing = "border-box"),
        (o[fn] = Vs(e, ct) + Ie),
        (o[hn] = Vs(e, Ne) + Ie),
        (o[Re] = a[Vt] = a[Df] = a[Rf] = "0"),
        Nn(i),
        (a[fn] = a["max" + Yn] = r[fn]),
        (a[hn] = a["max" + Ua] = r[hn]),
        (a[Re] = r[Re]),
        e.parentNode !== t &&
          (e.parentNode.insertBefore(t, e), t.appendChild(e)),
        (e._gsap.swappedIn = !0);
    }
  },
  g_ = /([A-Z])/g,
  Nn = function (e) {
    if (e) {
      var t = e.t.style,
        r = e.length,
        i = 0,
        s,
        o;
      for ((e.t._gsap || R.core.getCache(e.t)).uncache = 1; i < r; i += 2)
        (o = e[i + 1]),
          (s = e[i]),
          o
            ? (t[s] = o)
            : t[s] && t.removeProperty(s.replace(g_, "-$1").toLowerCase());
    }
  },
  ls = function (e) {
    for (var t = vs.length, r = e.style, i = [], s = 0; s < t; s++)
      i.push(vs[s], r[vs[s]]);
    return (i.t = e), i;
  },
  __ = function (e, t, r) {
    for (var i = [], s = e.length, o = r ? 8 : 0, a; o < s; o += 2)
      (a = e[o]), i.push(a, a in t ? t[a] : e[o + 1]);
    return (i.t = e.t), i;
  },
  bs = { left: 0, top: 0 },
  nu = function (e, t, r, i, s, o, a, l, u, c, f, d, h, m) {
    et(e) && (e = e(l)),
      wt(e) &&
        e.substr(0, 3) === "max" &&
        (e = d + (e.charAt(4) === "=" ? _s("0" + e.substr(3), r) : 0));
    var p = h ? h.time() : 0,
      g,
      x,
      T;
    if ((h && h.seek(0), isNaN(e) || (e = +e), fi(e)))
      h &&
        (e = R.utils.mapRange(
          h.scrollTrigger.start,
          h.scrollTrigger.end,
          0,
          d,
          e
        )),
        a && ys(a, r, i, !0);
    else {
      et(t) && (t = t(l));
      var w = (e || "0").split(" "),
        v,
        y,
        M,
        b;
      (T = dt(t, l) || se),
        (v = dr(T) || {}),
        (!v || (!v.left && !v.top)) &&
          It(T).display === "none" &&
          ((b = T.style.display),
          (T.style.display = "block"),
          (v = dr(T)),
          b ? (T.style.display = b) : T.style.removeProperty("display")),
        (y = _s(w[0], v[i.d])),
        (M = _s(w[1] || "0", r)),
        (e = v[i.p] - u[i.p] - c + y + s - M),
        a && ys(a, M, i, r - M < 20 || (a._isStart && M > 20)),
        (r -= r - M);
    }
    if ((m && ((l[m] = e || -0.001), e < 0 && (e = 0)), o)) {
      var C = e + r,
        S = o._isStart;
      (g = "scroll" + i.d2),
        ys(
          o,
          C,
          i,
          (S && C > 20) ||
            (!S && (f ? Math.max(se[g], Ct[g]) : o.parentNode[g]) <= C + 1)
        ),
        f &&
          ((u = dr(a)),
          f && (o.style[i.op.p] = u[i.op.p] - i.op.m - o._offset + Ie));
    }
    return (
      h &&
        T &&
        ((g = dr(T)),
        h.seek(d),
        (x = dr(T)),
        (h._caScrollDist = g[i.p] - x[i.p]),
        (e = (e / h._caScrollDist) * d)),
      h && h.seek(p),
      h ? e : Math.round(e)
    );
  },
  y_ = /(webkit|moz|length|cssText|inset)/i,
  iu = function (e, t, r, i) {
    if (e.parentNode !== t) {
      var s = e.style,
        o,
        a;
      if (t === se) {
        (e._stOrig = s.cssText), (a = It(e));
        for (o in a)
          !+o &&
            !y_.test(o) &&
            a[o] &&
            typeof s[o] == "string" &&
            o !== "0" &&
            (s[o] = a[o]);
        (s.top = r), (s.left = i);
      } else s.cssText = e._stOrig;
      (R.core.getCache(e).uncache = 1), t.appendChild(e);
    }
  },
  zf = function (e, t, r) {
    var i = t,
      s = i;
    return function (o) {
      var a = Math.round(e());
      return (
        a !== i &&
          a !== s &&
          Math.abs(a - i) > 3 &&
          Math.abs(a - s) > 3 &&
          ((o = a), r && r()),
        (s = i),
        (i = Math.round(o)),
        i
      );
    };
  },
  us = function (e, t, r) {
    var i = {};
    (i[t.p] = "+=" + r), R.set(e, i);
  },
  su = function (e, t) {
    var r = $r(e, t),
      i = "_scroll" + t.p2,
      s = function o(a, l, u, c, f) {
        var d = o.tween,
          h = l.onComplete,
          m = {};
        u = u || r();
        var p = zf(r, u, function () {
          d.kill(), (o.tween = 0);
        });
        return (
          (f = (c && f) || 0),
          (c = c || a - u),
          d && d.kill(),
          (l[i] = a),
          (l.inherit = !1),
          (l.modifiers = m),
          (m[i] = function () {
            return p(u + c * d.ratio + f * d.ratio * d.ratio);
          }),
          (l.onUpdate = function () {
            G.cache++, o.tween && mr();
          }),
          (l.onComplete = function () {
            (o.tween = 0), h && h.call(d);
          }),
          (d = o.tween = R.to(e, l)),
          d
        );
      };
    return (
      (e[i] = r),
      (r.wheelHandler = function () {
        return s.tween && s.tween.kill() && (s.tween = 0);
      }),
      je(e, "wheel", r.wheelHandler),
      H.isTouch && je(e, "touchmove", r.wheelHandler),
      s
    );
  },
  H = (function () {
    function n(t, r) {
      Cn ||
        n.register(R) ||
        console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        Go(this),
        this.init(t, r);
    }
    var e = n.prototype;
    return (
      (e.init = function (r, i) {
        if (
          ((this.progress = this.start = 0),
          this.vars && this.kill(!0, !0),
          !ui)
        ) {
          this.update = this.refresh = this.kill = Jt;
          return;
        }
        r = Zl(wt(r) || fi(r) || r.nodeType ? { trigger: r } : r, os);
        var s = r,
          o = s.onUpdate,
          a = s.toggleClass,
          l = s.id,
          u = s.onToggle,
          c = s.onRefresh,
          f = s.scrub,
          d = s.trigger,
          h = s.pin,
          m = s.pinSpacing,
          p = s.invalidateOnRefresh,
          g = s.anticipatePin,
          x = s.onScrubComplete,
          T = s.onSnapComplete,
          w = s.once,
          v = s.snap,
          y = s.pinReparent,
          M = s.pinSpacer,
          b = s.containerAnimation,
          C = s.fastScrollEnd,
          S = s.preventOverlaps,
          A =
            r.horizontal || (r.containerAnimation && r.horizontal !== !1)
              ? ct
              : Ne,
          D = !f && f !== 0,
          O = dt(r.scroller || K),
          B = R.core.getCache(O),
          U = mn(O),
          L =
            ("pinType" in r
              ? r.pinType
              : Nr(O, "pinType") || (U && "fixed")) === "fixed",
          Y = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack],
          F = D && r.toggleActions.split(" "),
          z = "markers" in r ? r.markers : os.markers,
          ie = U ? 0 : parseFloat(It(O)["border" + A.p2 + Yn]) || 0,
          _ = this,
          Q =
            r.onRefreshInit &&
            function () {
              return r.onRefreshInit(_);
            },
          de = l_(O, U, A),
          Ue = u_(O, U),
          te = 0,
          pe = 0,
          Se = 0,
          ce = $r(O, A),
          Ce,
          xe,
          vr,
          rt,
          nt,
          re,
          Me,
          ht,
          xt,
          k,
          vt,
          or,
          br,
          ve,
          ar,
          Tr,
          Wr,
          Be,
          wr,
          ke,
          jt,
          Dt,
          lr,
          Qn,
          Ee,
          Xi,
          ur,
          xn,
          vn,
          Sr,
          Yr,
          q,
          Xr,
          $t,
          Ut,
          Wt,
          Kr,
          bn,
          cr;
        if (
          ((_._startClamp = _._endClamp = !1),
          (_._dir = A),
          (g *= 45),
          (_.scroller = O),
          (_.scroll = b ? b.time.bind(b) : ce),
          (rt = ce()),
          (_.vars = r),
          (i = i || r.animation),
          "refreshPriority" in r &&
            ((Sf = 1), r.refreshPriority === -9999 && (Ai = _)),
          (B.tweenScroll = B.tweenScroll || {
            top: su(O, Ne),
            left: su(O, ct),
          }),
          (_.tweenTo = Ce = B.tweenScroll[A.p]),
          (_.scrubDuration = function (E) {
            (Xr = fi(E) && E),
              Xr
                ? q
                  ? q.duration(E)
                  : (q = R.to(i, {
                      ease: "expo",
                      totalProgress: "+=0",
                      inherit: !1,
                      duration: Xr,
                      paused: !0,
                      onComplete: function () {
                        return x && x(_);
                      },
                    }))
                : (q && q.progress(1).kill(), (q = 0));
          }),
          i &&
            ((i.vars.lazy = !1),
            (i._initted && !_.isReverted) ||
              (i.vars.immediateRender !== !1 &&
                r.immediateRender !== !1 &&
                i.duration() &&
                i.render(0, !0, !0)),
            (_.animation = i.pause()),
            (i.scrollTrigger = _),
            _.scrubDuration(f),
            (Sr = 0),
            l || (l = i.vars.id)),
          v &&
            ((!Jr(v) || v.push) && (v = { snapTo: v }),
            "scrollBehavior" in se.style &&
              R.set(U ? [se, Ct] : O, { scrollBehavior: "auto" }),
            G.forEach(function (E) {
              return (
                et(E) &&
                E.target === (U ? ue.scrollingElement || Ct : O) &&
                (E.smooth = !1)
              );
            }),
            (vr = et(v.snapTo)
              ? v.snapTo
              : v.snapTo === "labels"
              ? f_(i)
              : v.snapTo === "labelsDirectional"
              ? h_(i)
              : v.directional !== !1
              ? function (E, j) {
                  return Wa(v.snapTo)(E, Ze() - pe < 500 ? 0 : j.direction);
                }
              : R.utils.snap(v.snapTo)),
            ($t = v.duration || { min: 0.1, max: 2 }),
            ($t = Jr($t) ? Ti($t.min, $t.max) : Ti($t, $t)),
            (Ut = R.delayedCall(v.delay || Xr / 2 || 0.1, function () {
              var E = ce(),
                j = Ze() - pe < 500,
                V = Ce.tween;
              if (
                (j || Math.abs(_.getVelocity()) < 10) &&
                !V &&
                !zs &&
                te !== E
              ) {
                var $ = (E - re) / ve,
                  Le = i && !D ? i.totalProgress() : $,
                  Z = j ? 0 : ((Le - Yr) / (Ze() - li)) * 1e3 || 0,
                  Ae = R.utils.clamp(-$, 1 - $, (wn(Z / 2) * Z) / 0.185),
                  Ge = $ + (v.inertia === !1 ? 0 : Ae),
                  be,
                  fe,
                  oe = v,
                  Yt = oe.onStart,
                  me = oe.onInterrupt,
                  bt = oe.onComplete;
                if (
                  ((be = vr(Ge, _)),
                  fi(be) || (be = Ge),
                  (fe = Math.max(0, Math.round(re + be * ve))),
                  E <= Me && E >= re && fe !== E)
                ) {
                  if (V && !V._initted && V.data <= wn(fe - E)) return;
                  v.inertia === !1 && (Ae = be - $),
                    Ce(
                      fe,
                      {
                        duration: $t(
                          wn(
                            (Math.max(wn(Ge - Le), wn(be - Le)) * 0.185) /
                              Z /
                              0.05 || 0
                          )
                        ),
                        ease: v.ease || "power3",
                        data: wn(fe - E),
                        onInterrupt: function () {
                          return Ut.restart(!0) && me && me(_);
                        },
                        onComplete: function () {
                          _.update(),
                            (te = ce()),
                            i &&
                              !D &&
                              (q
                                ? q.resetTo(
                                    "totalProgress",
                                    be,
                                    i._tTime / i._tDur
                                  )
                                : i.progress(be)),
                            (Sr = Yr =
                              i && !D ? i.totalProgress() : _.progress),
                            T && T(_),
                            bt && bt(_);
                        },
                      },
                      E,
                      Ae * ve,
                      fe - E - Ae * ve
                    ),
                    Yt && Yt(_, Ce.tween);
                }
              } else _.isActive && te !== E && Ut.restart(!0);
            }).pause())),
          l && (qo[l] = _),
          (d = _.trigger = dt(d || (h !== !0 && h))),
          (cr = d && d._gsap && d._gsap.stRevert),
          cr && (cr = cr(_)),
          (h = h === !0 ? d : dt(h)),
          wt(a) && (a = { targets: d, className: a }),
          h &&
            (m === !1 ||
              m === Vt ||
              (m =
                !m &&
                h.parentNode &&
                h.parentNode.style &&
                It(h.parentNode).display === "flex"
                  ? !1
                  : Re),
            (_.pin = h),
            (xe = R.core.getCache(h)),
            xe.spacer
              ? (ar = xe.pinState)
              : (M &&
                  ((M = dt(M)),
                  M && !M.nodeType && (M = M.current || M.nativeElement),
                  (xe.spacerIsNative = !!M),
                  M && (xe.spacerState = ls(M))),
                (xe.spacer = Be = M || ue.createElement("div")),
                Be.classList.add("pin-spacer"),
                l && Be.classList.add("pin-spacer-" + l),
                (xe.pinState = ar = ls(h))),
            r.force3D !== !1 && R.set(h, { force3D: !0 }),
            (_.spacer = Be = xe.spacer),
            (vn = It(h)),
            (Qn = vn[m + A.os2]),
            (ke = R.getProperty(h)),
            (jt = R.quickSetter(h, A.a, Ie)),
            oo(h, Be, vn),
            (Wr = ls(h))),
          z)
        ) {
          (or = Jr(z) ? Zl(z, Jl) : Jl),
            (k = as("scroller-start", l, O, A, or, 0)),
            (vt = as("scroller-end", l, O, A, or, 0, k)),
            (wr = k["offset" + A.op.d2]);
          var Zn = dt(Nr(O, "content") || O);
          (ht = this.markerStart = as("start", l, Zn, A, or, wr, 0, b)),
            (xt = this.markerEnd = as("end", l, Zn, A, or, wr, 0, b)),
            b && (bn = R.quickSetter([ht, xt], A.a, Ie)),
            !L &&
              !(ir.length && Nr(O, "fixedMarkers") === !0) &&
              (c_(U ? se : O),
              R.set([k, vt], { force3D: !0 }),
              (Xi = R.quickSetter(k, A.a, Ie)),
              (xn = R.quickSetter(vt, A.a, Ie)));
        }
        if (b) {
          var W = b.vars.onUpdate,
            I = b.vars.onUpdateParams;
          b.eventCallback("onUpdate", function () {
            _.update(0, 0, 1), W && W.apply(b, I || []);
          });
        }
        if (
          ((_.previous = function () {
            return X[X.indexOf(_) - 1];
          }),
          (_.next = function () {
            return X[X.indexOf(_) + 1];
          }),
          (_.revert = function (E, j) {
            if (!j) return _.kill(!0);
            var V = E !== !1 || !_.enabled,
              $ = Qe;
            V !== _.isReverted &&
              (V &&
                ((Wt = Math.max(ce(), _.scroll.rec || 0)),
                (Se = _.progress),
                (Kr = i && i.progress())),
              ht &&
                [ht, xt, k, vt].forEach(function (Le) {
                  return (Le.style.display = V ? "none" : "block");
                }),
              V && ((Qe = _), _.update(V)),
              h &&
                (!y || !_.isActive) &&
                (V ? m_(h, Be, ar) : oo(h, Be, It(h), Ee)),
              V || _.update(V),
              (Qe = $),
              (_.isReverted = V));
          }),
          (_.refresh = function (E, j, V, $) {
            if (!((Qe || !_.enabled) && !j)) {
              if (h && E && zt) {
                je(n, "scrollEnd", Vf);
                return;
              }
              !lt && Q && Q(_),
                (Qe = _),
                Ce.tween && !V && (Ce.tween.kill(), (Ce.tween = 0)),
                q && q.pause(),
                p &&
                  i &&
                  (i.revert({ kill: !1 }).invalidate(),
                  i.getChildren
                    ? i.getChildren(!0, !0, !1).forEach(function (Cr) {
                        return Cr.vars.immediateRender && Cr.render(0, !0, !0);
                      })
                    : i.vars.immediateRender && i.render(0, !0, !0)),
                _.isReverted || _.revert(!0, !0),
                (_._subPinOffset = !1);
              var Le = de(),
                Z = Ue(),
                Ae = b ? b.duration() : rr(O, A),
                Ge = ve <= 0.01 || !ve,
                be = 0,
                fe = $ || 0,
                oe = Jr(V) ? V.end : r.end,
                Yt = r.endTrigger || d,
                me = Jr(V)
                  ? V.start
                  : r.start || (r.start === 0 || !d ? 0 : h ? "0 0" : "0 100%"),
                bt = (_.pinnedContainer =
                  r.pinnedContainer && dt(r.pinnedContainer, _)),
                Ht = (d && Math.max(0, X.indexOf(_))) || 0,
                We = Ht,
                Ye,
                He,
                Gr,
                Ki,
                qe,
                Ve,
                qt,
                js,
                Xa,
                Jn,
                Qt,
                ei,
                Gi;
              for (
                z &&
                Jr(V) &&
                ((ei = R.getProperty(k, A.p)), (Gi = R.getProperty(vt, A.p)));
                We-- > 0;

              )
                (Ve = X[We]),
                  Ve.end || Ve.refresh(0, 1) || (Qe = _),
                  (qt = Ve.pin),
                  qt &&
                    (qt === d || qt === h || qt === bt) &&
                    !Ve.isReverted &&
                    (Jn || (Jn = []), Jn.unshift(Ve), Ve.revert(!0, !0)),
                  Ve !== X[We] && (Ht--, We--);
              for (
                et(me) && (me = me(_)),
                  me = Gl(me, "start", _),
                  re =
                    nu(
                      me,
                      d,
                      Le,
                      A,
                      ce(),
                      ht,
                      k,
                      _,
                      Z,
                      ie,
                      L,
                      Ae,
                      b,
                      _._startClamp && "_startClamp"
                    ) || (h ? -0.001 : 0),
                  et(oe) && (oe = oe(_)),
                  wt(oe) &&
                    !oe.indexOf("+=") &&
                    (~oe.indexOf(" ")
                      ? (oe = (wt(me) ? me.split(" ")[0] : "") + oe)
                      : ((be = _s(oe.substr(2), Le)),
                        (oe = wt(me)
                          ? me
                          : (b
                              ? R.utils.mapRange(
                                  0,
                                  b.duration(),
                                  b.scrollTrigger.start,
                                  b.scrollTrigger.end,
                                  re
                                )
                              : re) + be),
                        (Yt = d))),
                  oe = Gl(oe, "end", _),
                  Me =
                    Math.max(
                      re,
                      nu(
                        oe || (Yt ? "100% 0" : Ae),
                        Yt,
                        Le,
                        A,
                        ce() + be,
                        xt,
                        vt,
                        _,
                        Z,
                        ie,
                        L,
                        Ae,
                        b,
                        _._endClamp && "_endClamp"
                      )
                    ) || -0.001,
                  be = 0,
                  We = Ht;
                We--;

              )
                (Ve = X[We] || {}),
                  (qt = Ve.pin),
                  qt &&
                    Ve.start - Ve._pinPush <= re &&
                    !b &&
                    Ve.end > 0 &&
                    ((Ye =
                      Ve.end -
                      (_._startClamp ? Math.max(0, Ve.start) : Ve.start)),
                    ((qt === d && Ve.start - Ve._pinPush < re) || qt === bt) &&
                      isNaN(me) &&
                      (be += Ye * (1 - Ve.progress)),
                    qt === h && (fe += Ye));
              if (
                ((re += be),
                (Me += be),
                _._startClamp && (_._startClamp += be),
                _._endClamp &&
                  !lt &&
                  ((_._endClamp = Me || -0.001), (Me = Math.min(Me, rr(O, A)))),
                (ve = Me - re || ((re -= 0.01) && 0.001)),
                Ge && (Se = R.utils.clamp(0, 1, R.utils.normalize(re, Me, Wt))),
                (_._pinPush = fe),
                ht &&
                  be &&
                  ((Ye = {}),
                  (Ye[A.a] = "+=" + be),
                  bt && (Ye[A.p] = "-=" + ce()),
                  R.set([ht, xt], Ye)),
                h && !(Ho && _.end >= rr(O, A)))
              )
                (Ye = It(h)),
                  (Ki = A === Ne),
                  (Gr = ce()),
                  (Dt = parseFloat(ke(A.a)) + fe),
                  !Ae &&
                    Me > 1 &&
                    ((Qt = (U ? ue.scrollingElement || Ct : O).style),
                    (Qt = {
                      style: Qt,
                      value: Qt["overflow" + A.a.toUpperCase()],
                    }),
                    U &&
                      It(se)["overflow" + A.a.toUpperCase()] !== "scroll" &&
                      (Qt.style["overflow" + A.a.toUpperCase()] = "scroll")),
                  oo(h, Be, Ye),
                  (Wr = ls(h)),
                  (He = dr(h, !0)),
                  (js = L && $r(O, Ki ? ct : Ne)()),
                  m
                    ? ((Ee = [m + A.os2, ve + fe + Ie]),
                      (Ee.t = Be),
                      (We = m === Re ? Vs(h, A) + ve + fe : 0),
                      We &&
                        (Ee.push(A.d, We + Ie),
                        Be.style.flexBasis !== "auto" &&
                          (Be.style.flexBasis = We + Ie)),
                      Nn(Ee),
                      bt &&
                        X.forEach(function (Cr) {
                          Cr.pin === bt &&
                            Cr.vars.pinSpacing !== !1 &&
                            (Cr._subPinOffset = !0);
                        }),
                      L && ce(Wt))
                    : ((We = Vs(h, A)),
                      We &&
                        Be.style.flexBasis !== "auto" &&
                        (Be.style.flexBasis = We + Ie)),
                  L &&
                    ((qe = {
                      top: He.top + (Ki ? Gr - re : js) + Ie,
                      left: He.left + (Ki ? js : Gr - re) + Ie,
                      boxSizing: "border-box",
                      position: "fixed",
                    }),
                    (qe[fn] = qe["max" + Yn] = Math.ceil(He.width) + Ie),
                    (qe[hn] = qe["max" + Ua] = Math.ceil(He.height) + Ie),
                    (qe[Vt] =
                      qe[Vt + Mi] =
                      qe[Vt + Si] =
                      qe[Vt + ki] =
                      qe[Vt + Ci] =
                        "0"),
                    (qe[Re] = Ye[Re]),
                    (qe[Re + Mi] = Ye[Re + Mi]),
                    (qe[Re + Si] = Ye[Re + Si]),
                    (qe[Re + ki] = Ye[Re + ki]),
                    (qe[Re + Ci] = Ye[Re + Ci]),
                    (Tr = __(ar, qe, y)),
                    lt && ce(0)),
                  i
                    ? ((Xa = i._initted),
                      to(1),
                      i.render(i.duration(), !0, !0),
                      (lr = ke(A.a) - Dt + ve + fe),
                      (ur = Math.abs(ve - lr) > 1),
                      L && ur && Tr.splice(Tr.length - 2, 2),
                      i.render(0, !0, !0),
                      Xa || i.invalidate(!0),
                      i.parent || i.totalTime(i.totalTime()),
                      to(0))
                    : (lr = ve),
                  Qt &&
                    (Qt.value
                      ? (Qt.style["overflow" + A.a.toUpperCase()] = Qt.value)
                      : Qt.style.removeProperty("overflow-" + A.a));
              else if (d && ce() && !b)
                for (He = d.parentNode; He && He !== se; )
                  He._pinOffset &&
                    ((re -= He._pinOffset), (Me -= He._pinOffset)),
                    (He = He.parentNode);
              Jn &&
                Jn.forEach(function (Cr) {
                  return Cr.revert(!1, !0);
                }),
                (_.start = re),
                (_.end = Me),
                (rt = nt = lt ? Wt : ce()),
                !b && !lt && (rt < Wt && ce(Wt), (_.scroll.rec = 0)),
                _.revert(!1, !0),
                (pe = Ze()),
                Ut && ((te = -1), Ut.restart(!0)),
                (Qe = 0),
                i &&
                  D &&
                  (i._initted || Kr) &&
                  i.progress() !== Kr &&
                  i.progress(Kr || 0, !0).render(i.time(), !0, !0),
                (Ge || Se !== _.progress || b || p || (i && !i._initted)) &&
                  (i &&
                    !D &&
                    (i._initted || Se || i.vars.immediateRender !== !1) &&
                    i.totalProgress(
                      b && re < -0.001 && !Se
                        ? R.utils.normalize(re, Me, 0)
                        : Se,
                      !0
                    ),
                  (_.progress = Ge || (rt - re) / ve === Se ? 0 : Se)),
                h && m && (Be._pinOffset = Math.round(_.progress * lr)),
                q && q.invalidate(),
                isNaN(ei) ||
                  ((ei -= R.getProperty(k, A.p)),
                  (Gi -= R.getProperty(vt, A.p)),
                  us(k, A, ei),
                  us(ht, A, ei - ($ || 0)),
                  us(vt, A, Gi),
                  us(xt, A, Gi - ($ || 0))),
                Ge && !lt && _.update(),
                c && !lt && !br && ((br = !0), c(_), (br = !1));
            }
          }),
          (_.getVelocity = function () {
            return ((ce() - nt) / (Ze() - li)) * 1e3 || 0;
          }),
          (_.endAnimation = function () {
            ii(_.callbackAnimation),
              i &&
                (q
                  ? q.progress(1)
                  : i.paused()
                  ? D || ii(i, _.direction < 0, 1)
                  : ii(i, i.reversed()));
          }),
          (_.labelToScroll = function (E) {
            return (
              (i &&
                i.labels &&
                (re || _.refresh() || re) +
                  (i.labels[E] / i.duration()) * ve) ||
              0
            );
          }),
          (_.getTrailing = function (E) {
            var j = X.indexOf(_),
              V = _.direction > 0 ? X.slice(0, j).reverse() : X.slice(j + 1);
            return (
              wt(E)
                ? V.filter(function ($) {
                    return $.vars.preventOverlaps === E;
                  })
                : V
            ).filter(function ($) {
              return _.direction > 0 ? $.end <= re : $.start >= Me;
            });
          }),
          (_.update = function (E, j, V) {
            if (!(b && !V && !E)) {
              var $ = lt === !0 ? Wt : _.scroll(),
                Le = E ? 0 : ($ - re) / ve,
                Z = Le < 0 ? 0 : Le > 1 ? 1 : Le || 0,
                Ae = _.progress,
                Ge,
                be,
                fe,
                oe,
                Yt,
                me,
                bt,
                Ht;
              if (
                (j &&
                  ((nt = rt),
                  (rt = b ? ce() : $),
                  v && ((Yr = Sr), (Sr = i && !D ? i.totalProgress() : Z))),
                g &&
                  h &&
                  !Qe &&
                  !rs &&
                  zt &&
                  (!Z && re < $ + (($ - nt) / (Ze() - li)) * g
                    ? (Z = 1e-4)
                    : Z === 1 &&
                      Me > $ + (($ - nt) / (Ze() - li)) * g &&
                      (Z = 0.9999)),
                Z !== Ae && _.enabled)
              ) {
                if (
                  ((Ge = _.isActive = !!Z && Z < 1),
                  (be = !!Ae && Ae < 1),
                  (me = Ge !== be),
                  (Yt = me || !!Z != !!Ae),
                  (_.direction = Z > Ae ? 1 : -1),
                  (_.progress = Z),
                  Yt &&
                    !Qe &&
                    ((fe = Z && !Ae ? 0 : Z === 1 ? 1 : Ae === 1 ? 2 : 3),
                    D &&
                      ((oe =
                        (!me && F[fe + 1] !== "none" && F[fe + 1]) || F[fe]),
                      (Ht =
                        i &&
                        (oe === "complete" || oe === "reset" || oe in i)))),
                  S &&
                    (me || Ht) &&
                    (Ht || f || !i) &&
                    (et(S)
                      ? S(_)
                      : _.getTrailing(S).forEach(function (Gr) {
                          return Gr.endAnimation();
                        })),
                  D ||
                    (q && !Qe && !rs
                      ? (q._dp._time - q._start !== q._time &&
                          q.render(q._dp._time - q._start),
                        q.resetTo
                          ? q.resetTo("totalProgress", Z, i._tTime / i._tDur)
                          : ((q.vars.totalProgress = Z),
                            q.invalidate().restart()))
                      : i && i.totalProgress(Z, !!(Qe && (pe || E)))),
                  h)
                ) {
                  if ((E && m && (Be.style[m + A.os2] = Qn), !L))
                    jt(ci(Dt + lr * Z));
                  else if (Yt) {
                    if (
                      ((bt = !E && Z > Ae && Me + 1 > $ && $ + 1 >= rr(O, A)),
                      y)
                    )
                      if (!E && (Ge || bt)) {
                        var We = dr(h, !0),
                          Ye = $ - re;
                        iu(
                          h,
                          se,
                          We.top + (A === Ne ? Ye : 0) + Ie,
                          We.left + (A === Ne ? 0 : Ye) + Ie
                        );
                      } else iu(h, Be);
                    Nn(Ge || bt ? Tr : Wr),
                      (ur && Z < 1 && Ge) || jt(Dt + (Z === 1 && !bt ? lr : 0));
                  }
                }
                v && !Ce.tween && !Qe && !rs && Ut.restart(!0),
                  a &&
                    (me || (w && Z && (Z < 1 || !ro))) &&
                    ji(a.targets).forEach(function (Gr) {
                      return Gr.classList[Ge || w ? "add" : "remove"](
                        a.className
                      );
                    }),
                  o && !D && !E && o(_),
                  Yt && !Qe
                    ? (D &&
                        (Ht &&
                          (oe === "complete"
                            ? i.pause().totalProgress(1)
                            : oe === "reset"
                            ? i.restart(!0).pause()
                            : oe === "restart"
                            ? i.restart(!0)
                            : i[oe]()),
                        o && o(_)),
                      (me || !ro) &&
                        (u && me && io(_, u),
                        Y[fe] && io(_, Y[fe]),
                        w && (Z === 1 ? _.kill(!1, 1) : (Y[fe] = 0)),
                        me || ((fe = Z === 1 ? 1 : 3), Y[fe] && io(_, Y[fe]))),
                      C &&
                        !Ge &&
                        Math.abs(_.getVelocity()) > (fi(C) ? C : 2500) &&
                        (ii(_.callbackAnimation),
                        q
                          ? q.progress(1)
                          : ii(i, oe === "reverse" ? 1 : !Z, 1)))
                    : D && o && !Qe && o(_);
              }
              if (xn) {
                var He = b ? ($ / b.duration()) * (b._caScrollDist || 0) : $;
                Xi(He + (k._isFlipped ? 1 : 0)), xn(He);
              }
              bn && bn((-$ / b.duration()) * (b._caScrollDist || 0));
            }
          }),
          (_.enable = function (E, j) {
            _.enabled ||
              ((_.enabled = !0),
              je(O, "resize", hi),
              U || je(O, "scroll", Sn),
              Q && je(n, "refreshInit", Q),
              E !== !1 && ((_.progress = Se = 0), (rt = nt = te = ce())),
              j !== !1 && _.refresh());
          }),
          (_.getTween = function (E) {
            return E && Ce ? Ce.tween : q;
          }),
          (_.setPositions = function (E, j, V, $) {
            if (b) {
              var Le = b.scrollTrigger,
                Z = b.duration(),
                Ae = Le.end - Le.start;
              (E = Le.start + (Ae * E) / Z), (j = Le.start + (Ae * j) / Z);
            }
            _.refresh(
              !1,
              !1,
              {
                start: Hl(E, V && !!_._startClamp),
                end: Hl(j, V && !!_._endClamp),
              },
              $
            ),
              _.update();
          }),
          (_.adjustPinSpacing = function (E) {
            if (Ee && E) {
              var j = Ee.indexOf(A.d) + 1;
              (Ee[j] = parseFloat(Ee[j]) + E + Ie),
                (Ee[1] = parseFloat(Ee[1]) + E + Ie),
                Nn(Ee);
            }
          }),
          (_.disable = function (E, j) {
            if (
              (E !== !1 && _.revert(!0, !0),
              _.enabled &&
                ((_.enabled = _.isActive = !1),
                j || (q && q.pause()),
                (Wt = 0),
                xe && (xe.uncache = 1),
                Q && ze(n, "refreshInit", Q),
                Ut &&
                  (Ut.pause(), Ce.tween && Ce.tween.kill() && (Ce.tween = 0)),
                !U))
            ) {
              for (var V = X.length; V--; )
                if (X[V].scroller === O && X[V] !== _) return;
              ze(O, "resize", hi), U || ze(O, "scroll", Sn);
            }
          }),
          (_.kill = function (E, j) {
            _.disable(E, j), q && !j && q.kill(), l && delete qo[l];
            var V = X.indexOf(_);
            V >= 0 && X.splice(V, 1),
              V === at && xs > 0 && at--,
              (V = 0),
              X.forEach(function ($) {
                return $.scroller === _.scroller && (V = 1);
              }),
              V || lt || (_.scroll.rec = 0),
              i &&
                ((i.scrollTrigger = null),
                E && i.revert({ kill: !1 }),
                j || i.kill()),
              ht &&
                [ht, xt, k, vt].forEach(function ($) {
                  return $.parentNode && $.parentNode.removeChild($);
                }),
              Ai === _ && (Ai = 0),
              h &&
                (xe && (xe.uncache = 1),
                (V = 0),
                X.forEach(function ($) {
                  return $.pin === h && V++;
                }),
                V || (xe.spacer = 0)),
              r.onKill && r.onKill(_);
          }),
          X.push(_),
          _.enable(!1, !1),
          cr && cr(_),
          i && i.add && !ve)
        ) {
          var ne = _.update;
          (_.update = function () {
            (_.update = ne), G.cache++, re || Me || _.refresh();
          }),
            R.delayedCall(0.01, _.update),
            (ve = 0.01),
            (re = Me = 0);
        } else _.refresh();
        h && p_();
      }),
      (n.register = function (r) {
        return (
          Cn ||
            ((R = r || Pf()), Af() && window.document && n.enable(), (Cn = ui)),
          Cn
        );
      }),
      (n.defaults = function (r) {
        if (r) for (var i in r) os[i] = r[i];
        return os;
      }),
      (n.disable = function (r, i) {
        (ui = 0),
          X.forEach(function (o) {
            return o[i ? "kill" : "disable"](r);
          }),
          ze(K, "wheel", Sn),
          ze(ue, "scroll", Sn),
          clearInterval(ts),
          ze(ue, "touchcancel", Jt),
          ze(se, "touchstart", Jt),
          is(ze, ue, "pointerdown,touchstart,mousedown", ql),
          is(ze, ue, "pointerup,touchend,mouseup", Ql),
          Fs.kill(),
          ns(ze);
        for (var s = 0; s < G.length; s += 3)
          ss(ze, G[s], G[s + 1]), ss(ze, G[s], G[s + 2]);
      }),
      (n.enable = function () {
        if (
          ((K = window),
          (ue = document),
          (Ct = ue.documentElement),
          (se = ue.body),
          R &&
            ((ji = R.utils.toArray),
            (Ti = R.utils.clamp),
            (Go = R.core.context || Jt),
            (to = R.core.suppressOverwrites || Jt),
            (La = K.history.scrollRestoration || "auto"),
            (Qo = K.pageYOffset || 0),
            R.core.globals("ScrollTrigger", n),
            se))
        ) {
          (ui = 1),
            (In = document.createElement("div")),
            (In.style.height = "100vh"),
            (In.style.position = "absolute"),
            Lf(),
            a_(),
            Oe.register(R),
            (n.isTouch = Oe.isTouch),
            (kr =
              Oe.isTouch &&
              /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
            (Ko = Oe.isTouch === 1),
            je(K, "wheel", Sn),
            (Ba = [K, ue, Ct, se]),
            R.matchMedia
              ? ((n.matchMedia = function (u) {
                  var c = R.matchMedia(),
                    f;
                  for (f in u) c.add(f, u[f]);
                  return c;
                }),
                R.addEventListener("matchMediaInit", function () {
                  Nf(), Ya();
                }),
                R.addEventListener("matchMediaRevert", function () {
                  return If();
                }),
                R.addEventListener("matchMedia", function () {
                  nn(0, 1), _n("matchMedia");
                }),
                R.matchMedia().add("(orientation: portrait)", function () {
                  return so(), so;
                }))
              : console.warn("Requires GSAP 3.11.0 or later"),
            so(),
            je(ue, "scroll", Sn);
          var r = se.hasAttribute("style"),
            i = se.style,
            s = i.borderTopStyle,
            o = R.core.Animation.prototype,
            a,
            l;
          for (
            o.revert ||
              Object.defineProperty(o, "revert", {
                value: function () {
                  return this.time(-0.01, !0);
                },
              }),
              i.borderTopStyle = "solid",
              a = dr(se),
              Ne.m = Math.round(a.top + Ne.sc()) || 0,
              ct.m = Math.round(a.left + ct.sc()) || 0,
              s ? (i.borderTopStyle = s) : i.removeProperty("border-top-style"),
              r || (se.setAttribute("style", ""), se.removeAttribute("style")),
              ts = setInterval(eu, 250),
              R.delayedCall(0.5, function () {
                return (rs = 0);
              }),
              je(ue, "touchcancel", Jt),
              je(se, "touchstart", Jt),
              is(je, ue, "pointerdown,touchstart,mousedown", ql),
              is(je, ue, "pointerup,touchend,mouseup", Ql),
              Xo = R.utils.checkPrefix("transform"),
              vs.push(Xo),
              Cn = Ze(),
              Fs = R.delayedCall(0.2, nn).pause(),
              Mn = [
                ue,
                "visibilitychange",
                function () {
                  var u = K.innerWidth,
                    c = K.innerHeight;
                  ue.hidden
                    ? ((Xl = u), (Kl = c))
                    : (Xl !== u || Kl !== c) && hi();
                },
                ue,
                "DOMContentLoaded",
                nn,
                K,
                "load",
                nn,
                K,
                "resize",
                hi,
              ],
              ns(je),
              X.forEach(function (u) {
                return u.enable(0, 1);
              }),
              l = 0;
            l < G.length;
            l += 3
          )
            ss(ze, G[l], G[l + 1]), ss(ze, G[l], G[l + 2]);
        }
      }),
      (n.config = function (r) {
        "limitCallbacks" in r && (ro = !!r.limitCallbacks);
        var i = r.syncInterval;
        (i && clearInterval(ts)) || ((ts = i) && setInterval(eu, i)),
          "ignoreMobileResize" in r &&
            (Ko = n.isTouch === 1 && r.ignoreMobileResize),
          "autoRefreshEvents" in r &&
            (ns(ze) || ns(je, r.autoRefreshEvents || "none"),
            (Cf = (r.autoRefreshEvents + "").indexOf("resize") === -1));
      }),
      (n.scrollerProxy = function (r, i) {
        var s = dt(r),
          o = G.indexOf(s),
          a = mn(s);
        ~o && G.splice(o, a ? 6 : 2),
          i && (a ? ir.unshift(K, i, se, i, Ct, i) : ir.unshift(s, i));
      }),
      (n.clearMatchMedia = function (r) {
        X.forEach(function (i) {
          return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0);
        });
      }),
      (n.isInViewport = function (r, i, s) {
        var o = (wt(r) ? dt(r) : r).getBoundingClientRect(),
          a = o[s ? fn : hn] * i || 0;
        return s
          ? o.right - a > 0 && o.left + a < K.innerWidth
          : o.bottom - a > 0 && o.top + a < K.innerHeight;
      }),
      (n.positionInViewport = function (r, i, s) {
        wt(r) && (r = dt(r));
        var o = r.getBoundingClientRect(),
          a = o[s ? fn : hn],
          l =
            i == null
              ? a / 2
              : i in Is
              ? Is[i] * a
              : ~i.indexOf("%")
              ? (parseFloat(i) * a) / 100
              : parseFloat(i) || 0;
        return s ? (o.left + l) / K.innerWidth : (o.top + l) / K.innerHeight;
      }),
      (n.killAll = function (r) {
        if (
          (X.slice(0).forEach(function (s) {
            return s.vars.id !== "ScrollSmoother" && s.kill();
          }),
          r !== !0)
        ) {
          var i = gn.killAll || [];
          (gn = {}),
            i.forEach(function (s) {
              return s();
            });
        }
      }),
      n
    );
  })();
H.version = "3.14.2";
H.saveStyles = function (n) {
  return n
    ? ji(n).forEach(function (e) {
        if (e && e.style) {
          var t = Tt.indexOf(e);
          t >= 0 && Tt.splice(t, 5),
            Tt.push(
              e,
              e.style.cssText,
              e.getBBox && e.getAttribute("transform"),
              R.core.getCache(e),
              Go()
            );
        }
      })
    : Tt;
};
H.revert = function (n, e) {
  return Ya(!n, e);
};
H.create = function (n, e) {
  return new H(n, e);
};
H.refresh = function (n) {
  return n ? hi(!0) : (Cn || H.register()) && nn(!0);
};
H.update = function (n) {
  return ++G.cache && mr(n === !0 ? 2 : 0);
};
H.clearScrollMemory = Bf;
H.maxScroll = function (n, e) {
  return rr(n, e ? ct : Ne);
};
H.getScrollFunc = function (n, e) {
  return $r(dt(n), e ? ct : Ne);
};
H.getById = function (n) {
  return qo[n];
};
H.getAll = function () {
  return X.filter(function (n) {
    return n.vars.id !== "ScrollSmoother";
  });
};
H.isScrolling = function () {
  return !!zt;
};
H.snapDirectional = Wa;
H.addEventListener = function (n, e) {
  var t = gn[n] || (gn[n] = []);
  ~t.indexOf(e) || t.push(e);
};
H.removeEventListener = function (n, e) {
  var t = gn[n],
    r = t && t.indexOf(e);
  r >= 0 && t.splice(r, 1);
};
H.batch = function (n, e) {
  var t = [],
    r = {},
    i = e.interval || 0.016,
    s = e.batchMax || 1e9,
    o = function (u, c) {
      var f = [],
        d = [],
        h = R.delayedCall(i, function () {
          c(f, d), (f = []), (d = []);
        }).pause();
      return function (m) {
        f.length || h.restart(!0),
          f.push(m.trigger),
          d.push(m),
          s <= f.length && h.progress(1);
      };
    },
    a;
  for (a in e)
    r[a] =
      a.substr(0, 2) === "on" && et(e[a]) && a !== "onRefreshInit"
        ? o(a, e[a])
        : e[a];
  return (
    et(s) &&
      ((s = s()),
      je(H, "refresh", function () {
        return (s = e.batchMax());
      })),
    ji(n).forEach(function (l) {
      var u = {};
      for (a in r) u[a] = r[a];
      (u.trigger = l), t.push(H.create(u));
    }),
    t
  );
};
var ou = function (e, t, r, i) {
    return (
      t > i ? e(i) : t < 0 && e(0),
      r > i ? (i - t) / (r - t) : r < 0 ? t / (t - r) : 1
    );
  },
  ao = function n(e, t) {
    t === !0
      ? e.style.removeProperty("touch-action")
      : (e.style.touchAction =
          t === !0
            ? "auto"
            : t
            ? "pan-" + t + (Oe.isTouch ? " pinch-zoom" : "")
            : "none"),
      e === Ct && n(se, t);
  },
  cs = { auto: 1, scroll: 1 },
  x_ = function (e) {
    var t = e.event,
      r = e.target,
      i = e.axis,
      s = (t.changedTouches ? t.changedTouches[0] : t).target,
      o = s._gsap || R.core.getCache(s),
      a = Ze(),
      l;
    if (!o._isScrollT || a - o._isScrollT > 2e3) {
      for (
        ;
        s &&
        s !== se &&
        ((s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth) ||
          !(cs[(l = It(s)).overflowY] || cs[l.overflowX]));

      )
        s = s.parentNode;
      (o._isScroll =
        s &&
        s !== r &&
        !mn(s) &&
        (cs[(l = It(s)).overflowY] || cs[l.overflowX])),
        (o._isScrollT = a);
    }
    (o._isScroll || i === "x") && (t.stopPropagation(), (t._gsapAllow = !0));
  },
  jf = function (e, t, r, i) {
    return Oe.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: t,
      onWheel: (i = i && x_),
      onPress: i,
      onDrag: i,
      onScroll: i,
      onEnable: function () {
        return r && je(ue, Oe.eventTypes[0], lu, !1, !0);
      },
      onDisable: function () {
        return ze(ue, Oe.eventTypes[0], lu, !0);
      },
    });
  },
  v_ = /(input|label|select|textarea)/i,
  au,
  lu = function (e) {
    var t = v_.test(e.target.tagName);
    (t || au) && ((e._gsapAllow = !0), (au = t));
  },
  b_ = function (e) {
    Jr(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      e.type || (e.type = "wheel,touch"),
      (e.debounce = !!e.debounce),
      (e.id = e.id || "normalizer");
    var t = e,
      r = t.normalizeScrollX,
      i = t.momentum,
      s = t.allowNestedScroll,
      o = t.onRelease,
      a,
      l,
      u = dt(e.target) || Ct,
      c = R.core.globals().ScrollSmoother,
      f = c && c.get(),
      d =
        kr &&
        ((e.content && dt(e.content)) ||
          (f && e.content !== !1 && !f.smooth() && f.content())),
      h = $r(u, Ne),
      m = $r(u, ct),
      p = 1,
      g =
        (Oe.isTouch && K.visualViewport
          ? K.visualViewport.scale * K.visualViewport.width
          : K.outerWidth) / K.innerWidth,
      x = 0,
      T = et(i)
        ? function () {
            return i(a);
          }
        : function () {
            return i || 2.8;
          },
      w,
      v,
      y = jf(u, e.type, !0, s),
      M = function () {
        return (v = !1);
      },
      b = Jt,
      C = Jt,
      S = function () {
        (l = rr(u, Ne)),
          (C = Ti(kr ? 1 : 0, l)),
          r && (b = Ti(0, rr(u, ct))),
          (w = dn);
      },
      A = function () {
        (d._gsap.y = ci(parseFloat(d._gsap.y) + h.offset) + "px"),
          (d.style.transform =
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
            parseFloat(d._gsap.y) +
            ", 0, 1)"),
          (h.offset = h.cacheID = 0);
      },
      D = function () {
        if (v) {
          requestAnimationFrame(M);
          var z = ci(a.deltaY / 2),
            ie = C(h.v - z);
          if (d && ie !== h.v + h.offset) {
            h.offset = ie - h.v;
            var _ = ci((parseFloat(d && d._gsap.y) || 0) - h.offset);
            (d.style.transform =
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
              _ +
              ", 0, 1)"),
              (d._gsap.y = _ + "px"),
              (h.cacheID = G.cache),
              mr();
          }
          return !0;
        }
        h.offset && A(), (v = !0);
      },
      O,
      B,
      U,
      L,
      Y = function () {
        S(),
          O.isActive() &&
            O.vars.scrollY > l &&
            (h() > l ? O.progress(1) && h(l) : O.resetTo("scrollY", l));
      };
    return (
      d && R.set(d, { y: "+=0" }),
      (e.ignoreCheck = function (F) {
        return (
          (kr && F.type === "touchmove" && D()) ||
          (p > 1.05 && F.type !== "touchstart") ||
          a.isGesturing ||
          (F.touches && F.touches.length > 1)
        );
      }),
      (e.onPress = function () {
        v = !1;
        var F = p;
        (p = ci(((K.visualViewport && K.visualViewport.scale) || 1) / g)),
          O.pause(),
          F !== p && ao(u, p > 1.01 ? !0 : r ? !1 : "x"),
          (B = m()),
          (U = h()),
          S(),
          (w = dn);
      }),
      (e.onRelease = e.onGestureStart =
        function (F, z) {
          if ((h.offset && A(), !z)) L.restart(!0);
          else {
            G.cache++;
            var ie = T(),
              _,
              Q;
            r &&
              ((_ = m()),
              (Q = _ + (ie * 0.05 * -F.velocityX) / 0.227),
              (ie *= ou(m, _, Q, rr(u, ct))),
              (O.vars.scrollX = b(Q))),
              (_ = h()),
              (Q = _ + (ie * 0.05 * -F.velocityY) / 0.227),
              (ie *= ou(h, _, Q, rr(u, Ne))),
              (O.vars.scrollY = C(Q)),
              O.invalidate().duration(ie).play(0.01),
              ((kr && O.vars.scrollY >= l) || _ >= l - 1) &&
                R.to({}, { onUpdate: Y, duration: ie });
          }
          o && o(F);
        }),
      (e.onWheel = function () {
        O._ts && O.pause(), Ze() - x > 1e3 && ((w = 0), (x = Ze()));
      }),
      (e.onChange = function (F, z, ie, _, Q) {
        if (
          (dn !== w && S(),
          z && r && m(b(_[2] === z ? B + (F.startX - F.x) : m() + z - _[1])),
          ie)
        ) {
          h.offset && A();
          var de = Q[2] === ie,
            Ue = de ? U + F.startY - F.y : h() + ie - Q[1],
            te = C(Ue);
          de && Ue !== te && (U += te - Ue), h(te);
        }
        (ie || z) && mr();
      }),
      (e.onEnable = function () {
        ao(u, r ? !1 : "x"),
          H.addEventListener("refresh", Y),
          je(K, "resize", Y),
          h.smooth &&
            ((h.target.style.scrollBehavior = "auto"),
            (h.smooth = m.smooth = !1)),
          y.enable();
      }),
      (e.onDisable = function () {
        ao(u, !0),
          ze(K, "resize", Y),
          H.removeEventListener("refresh", Y),
          y.kill();
      }),
      (e.lockAxis = e.lockAxis !== !1),
      (a = new Oe(e)),
      (a.iOS = kr),
      kr && !h() && h(1),
      kr && R.ticker.add(Jt),
      (L = a._dc),
      (O = R.to(a, {
        ease: "power4",
        paused: !0,
        inherit: !1,
        scrollX: r ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: zf(h, h(), function () {
            return O.pause();
          }),
        },
        onUpdate: mr,
        onComplete: L.vars.onComplete,
      })),
      a
    );
  };
H.sort = function (n) {
  if (et(n)) return X.sort(n);
  var e = K.pageYOffset || 0;
  return (
    H.getAll().forEach(function (t) {
      return (t._sortY = t.trigger
        ? e + t.trigger.getBoundingClientRect().top
        : t.start + K.innerHeight);
    }),
    X.sort(
      n ||
        function (t, r) {
          return (
            (t.vars.refreshPriority || 0) * -1e6 +
            (t.vars.containerAnimation ? 1e6 : t._sortY) -
            ((r.vars.containerAnimation ? 1e6 : r._sortY) +
              (r.vars.refreshPriority || 0) * -1e6)
          );
        }
    )
  );
};
H.observe = function (n) {
  return new Oe(n);
};
H.normalizeScroll = function (n) {
  if (typeof n > "u") return ot;
  if (n === !0 && ot) return ot.enable();
  if (n === !1) {
    ot && ot.kill(), (ot = n);
    return;
  }
  var e = n instanceof Oe ? n : b_(n);
  return ot && ot.target === e.target && ot.kill(), mn(e.target) && (ot = e), e;
};
H.core = {
  _getVelocityProp: Yo,
  _inputObserver: jf,
  _scrollers: G,
  _proxies: ir,
  bridge: {
    ss: function () {
      zt || _n("scrollStart"), (zt = Ze());
    },
    ref: function () {
      return Qe;
    },
  },
};
Pf() && R.registerPlugin(H);
Rr.registerPlugin(H);
const fs = ({
  children: n,
  container: e,
  blur: t = !1,
  duration: r = 1e3,
  ease: i = "power2.out",
  delay: s = 0,
  threshold: o = 0.1,
  initialOpacity: a = 0,
  disappearAfter: l = 0,
  disappearDuration: u = 0.5,
  disappearEase: c = "power2.in",
  onComplete: f,
  onDisappearanceComplete: d,
  className: h = "",
  ...m
}) => {
  const p = J.useRef(null);
  return (
    J.useEffect(() => {
      const g = p.current;
      if (!g) return;
      let x = e || document.getElementById("snap-main-container") || null;
      typeof x == "string" && (x = document.querySelector(x));
      const T = (1 - o) * 100,
        w = (M) => (M > 10 ? M / 1e3 : M);
      Rr.set(g, {
        autoAlpha: a,
        filter: t ? "blur(10px)" : "blur(0px)",
        willChange: "opacity, filter, transform",
      });
      const v = Rr.timeline({
        paused: !0,
        delay: w(s),
        onComplete: () => {
          f && f(),
            l > 0 &&
              Rr.to(g, {
                autoAlpha: a,
                filter: t ? "blur(10px)" : "blur(0px)",
                delay: w(l),
                duration: w(u),
                ease: c,
                onComplete: () => d?.(),
              });
        },
      });
      v.to(g, { autoAlpha: 1, filter: "blur(0px)", duration: w(r), ease: i });
      const y = H.create({
        trigger: g,
        scroller: x || window,
        start: `top ${T}%`,
        once: !0,
        onEnter: () => v.play(),
      });
      return () => {
        y.kill(), v.kill(), Rr.killTweensOf(g);
      };
    }, []),
    P.jsx("div", { ref: p, className: h, ...m, children: n })
  );
};
function T_() {
  return P.jsx("section", {
    className: "w-full bg-dao-blue-dark",
    children: P.jsx("div", {
      className:
        "max-w-10xl mx-auto px-8 md:px-24 lg:px-44 pt-26 pb-42 flex flex-col items-center",
      children: P.jsxs("div", {
        className: "flex flex-col gap-12 w-full max-w-[980px]",
        children: [
          P.jsxs("div", {
            className: "flex flex-col gap-7 max-w-[969px]",
            children: [
              P.jsx("h2", {
                className:
                  "text-dao-green text-4xl md:text-5xl lg:text-[60px] font-light leading-[1.15]",
                children: "TheDAO's story continues…",
              }),
              P.jsxs("div", {
                className:
                  "text-white text-xl md:text-2xl lg:text-4xl font-light leading-[1.11] space-y-6 sm:w-[410px] md:w-[490px] lg:w-[740px]",
                children: [
                  P.jsx(fs, {
                    blur: !0,
                    duration: 400,
                    children: P.jsxs("p", {
                      children: [
                        "In 2016, funds recovered from TheDAO hack",
                        " ",
                        "were made claimable by TheDAO Curators",
                        " ",
                        "with the intention that any unclaimed assets ",
                        " ",
                        "would be used to support Ethereum security.",
                      ],
                    }),
                  }),
                  P.jsx(fs, {
                    blur: !0,
                    duration: 400,
                    delay: 200,
                    children: P.jsxs("p", {
                      children: [
                        "A decade later, the unclaimed ETH",
                        " ",
                        "has sat idle and significantly appreciated.",
                      ],
                    }),
                  }),
                  P.jsx(fs, {
                    blur: !0,
                    duration: 400,
                    delay: 400,
                    children: P.jsxs("p", {
                      children: [
                        "TheDAO Security Fund enables the community",
                        " ",
                        "to reallocate these funds toward the projects",
                        " ",
                        "and people that strengthen Ethereum security.",
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
          P.jsx(fs, {
            blur: !0,
            duration: 400,
            delay: 600,
            children: P.jsx("a", {
              href: "https://paragraph.com/@thedao.fund/thedao-security-fund-activating-75000-eth-for-ethereum-security",
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "bg-dao-red hover:bg-dao-red-hover text-white font-medium text-sm px-6 py-2 h-12 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 w-fit inline-flex items-center",
              children: "Learn More",
            }),
          }),
        ],
      }),
    }),
  });
}
const Ar = "TheDAO Security Fund",
  Pi = "https://thedao.fund",
  $f = "TheDAO is Back",
  Uf =
    "TheDAO is back and is allocating over 75,000 ETH to strengthen Ethereum security. BULLISH.",
  uu = "@thedaofund",
  w_ =
    "https://bafkreidbputlxcvuz4jjpumktkrwcqz7pyhb4v6v5ptdwqzt6zsy57fera.ipfs.dweb.link/",
  Wf = "TheDAO Security Fund",
  S_ = "TheDAO LLC",
  C_ =
    "https://bafkreiacgbicma7luc7srgc5kpl4j2adfwirzse7sulwvoul5wijusbchy.ipfs.dweb.link/",
  M_ = "2025",
  Ts = {
    twitter: "https://x.com/thedaofund",
    paragraph: "https://paragraph.xyz/@thedao.fund",
    farcaster: "https://warpcast.com/thedaofund",
  };
function k_() {
  return P.jsx("footer", {
    className: "w-full py-8 md:py-12 border-t border-white/5",
    children: P.jsxs("div", {
      className:
        "max-w-[1618px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6",
      children: [
        P.jsx("p", {
          className: "text-white text-base font-normal leading-normal",
          children: "© 2025 TheDAO LLC. All rights reserved.",
        }),
        P.jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            P.jsx("a", {
              href: Ts.paragraph,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:opacity-80 transition-opacity",
              title: "Paragraph",
              children: P.jsx("img", {
                src: "/paragraph-icon.svg",
                alt: "Paragraph",
                className: "w-10 h-10 shadow-sm",
              }),
            }),
            P.jsx("a", {
              href: Ts.twitter,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:opacity-80 transition-opacity",
              title: "X (Twitter)",
              children: P.jsx("img", {
                src: "/x-icon.svg",
                alt: "X (Twitter)",
                className: "w-10 h-10 shadow-sm",
              }),
            }),
            P.jsx("a", {
              href: Ts.farcaster,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:opacity-80 transition-opacity",
              title: "Farcaster",
              children: P.jsx("img", {
                src: "/farcaster-icon.svg",
                alt: "Farcaster",
                className: "w-10 h-10 shadow-sm",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
function A_(n = {}) {
  const {
      title: e = `${Ar} | ${$f}`,
      description: t = Uf,
      image: r = w_,
      url: i = Pi,
      type: s = "website",
      noIndex: o = !1,
    } = n,
    a = e.startsWith(`${Ar} |`) || e.endsWith(`| ${Ar}`) ? e : `${e} | ${Ar}`,
    l = r.startsWith("http") ? r : `${Pi}${r}`,
    u = i.startsWith("http") ? i : `${Pi}${i}`,
    c = [
      {
        tagName: "link",
        rel: "icon",
        type: "image/svg+xml",
        href: "/dao-logo.svg",
      },
      { tagName: "link", rel: "canonical", href: u },
      { name: "description", content: t },
      { property: "og:type", content: s },
      { property: "og:site_name", content: Ar },
      { property: "og:title", content: a },
      { property: "og:description", content: t },
      { property: "og:image", content: l },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${Ar} - ${t}` },
      { property: "og:url", content: u },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: uu },
      { name: "twitter:creator", content: uu },
      { name: "twitter:title", content: a },
      { name: "twitter:description", content: t },
      { name: "twitter:image", content: l },
      { name: "twitter:image:alt", content: `${Ar} - ${t}` },
      { name: "theme-color", content: "#28567A" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
    ];
  return (
    o && c.push({ name: "robots", content: "noindex, nofollow" }),
    [{ title: a }, ...c]
  );
}
function P_() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: Wf,
    legalName: S_,
    url: Pi,
    logo: C_,
    foundingDate: M_,
    sameAs: Object.values(Ts),
    description: Uf,
  };
}
function O_() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: Ar,
    url: Pi,
    description: $f,
    publisher: { "@type": "Organization", name: Wf },
  };
}
function E_() {
  return [P_(), O_()];
}
function R_(n) {
  return (Array.isArray(n) ? n : [n]).map((t) => ({ "script:ld+json": t }));
}
function V_() {
  const n = A_(),
    e = E_(),
    t = R_(e);
  return [...n, ...t];
}
function I_() {
  return [
    {
      rel: "preload",
      href: "/dao-logo.svg",
      as: "image",
      type: "image/svg+xml",
    },
  ];
}
const N_ = Yf(function () {
  return P.jsxs("div", {
    className: "min-h-screen w-full bg-dao-blue relative overflow-x-hidden",
    children: [
      P.jsx(Rd, {}),
      P.jsxs("div", {
        className: "relative",
        children: [
          P.jsx("div", {
            className:
              "absolute inset-0 pointer-events-none bg-[url('/curators-background.svg')] bg-bottom bg-no-repeat bg-size-[auto_100%]",
          }),
          P.jsx(Jg, {}),
          P.jsx(r_, {}),
        ],
      }),
      P.jsx(T_, {}),
      P.jsx(k_, {}),
    ],
  });
});
export { N_ as default, I_ as links, V_ as meta };
