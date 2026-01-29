import {
  j as a,
  w as I,
  a as N,
  b as B,
  M as G,
  L,
  S as _,
  c as U,
  O as A,
  i as W,
} from "./chunk-JMJ3UQ3L-LOVFmzVH.js";
import {
  e as z,
  a as J,
  b as V,
  R as X,
  c as Y,
  n as o,
  S as D,
  m as Q,
  d as c,
  h as E,
  Q as Z,
  f as x,
  g as $,
  o as M,
  r as C,
  i as tt,
  j as F,
  p as S,
  s as et,
  k as st,
} from "./QueryClientProvider-B1FlnhcJ.js";
function j(t) {
  return {
    onFetch: (e, s) => {
      const i = e.options,
        r = e.fetchOptions?.meta?.fetchMore?.direction,
        n = e.state.data?.pages || [],
        h = e.state.data?.pageParams || [];
      let d = { pages: [], pageParams: [] },
        p = 0;
      const g = async () => {
        let m = !1;
        const k = (u) => {
            Object.defineProperty(u, "signal", {
              enumerable: !0,
              get: () => (
                e.signal.aborted
                  ? (m = !0)
                  : e.signal.addEventListener("abort", () => {
                      m = !0;
                    }),
                e.signal
              ),
            });
          },
          T = z(e.options, e.fetchOptions),
          v = async (u, l, f) => {
            if (m) return Promise.reject();
            if (l == null && u.pages.length) return Promise.resolve(u);
            const H = (() => {
                const O = {
                  client: e.client,
                  queryKey: e.queryKey,
                  pageParam: l,
                  direction: f ? "backward" : "forward",
                  meta: e.options.meta,
                };
                return k(O), O;
              })(),
              K = await T(H),
              { maxPages: b } = e.options,
              w = f ? J : V;
            return {
              pages: w(u.pages, K, b),
              pageParams: w(u.pageParams, l, b),
            };
          };
        if (r && n.length) {
          const u = r === "backward",
            l = u ? it : q,
            f = { pages: n, pageParams: h },
            P = l(i, f);
          d = await v(f, P, u);
        } else {
          const u = t ?? n.length;
          do {
            const l = p === 0 ? h[0] ?? i.initialPageParam : q(i, d);
            if (p > 0 && l == null) break;
            (d = await v(d, l)), p++;
          } while (p < u);
        }
        return d;
      };
      e.options.persister
        ? (e.fetchFn = () =>
            e.options.persister?.(
              g,
              {
                client: e.client,
                queryKey: e.queryKey,
                meta: e.options.meta,
                signal: e.signal,
              },
              s
            ))
        : (e.fetchFn = g);
    },
  };
}
function q(t, { pages: e, pageParams: s }) {
  const i = e.length - 1;
  return e.length > 0 ? t.getNextPageParam(e[i], e, s[i], s) : void 0;
}
function it(t, { pages: e, pageParams: s }) {
  return e.length > 0 ? t.getPreviousPageParam?.(e[0], e, s[0], s) : void 0;
}
var nt = class extends X {
  #t;
  #e;
  #s;
  #n;
  constructor(t) {
    super(),
      (this.#t = t.client),
      (this.mutationId = t.mutationId),
      (this.#s = t.mutationCache),
      (this.#e = []),
      (this.state = t.state || rt()),
      this.setOptions(t.options),
      this.scheduleGc();
  }
  setOptions(t) {
    (this.options = t), this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(t) {
    this.#e.includes(t) ||
      (this.#e.push(t),
      this.clearGcTimeout(),
      this.#s.notify({ type: "observerAdded", mutation: this, observer: t }));
  }
  removeObserver(t) {
    (this.#e = this.#e.filter((e) => e !== t)),
      this.scheduleGc(),
      this.#s.notify({ type: "observerRemoved", mutation: this, observer: t });
  }
  optionalRemove() {
    this.#e.length ||
      (this.state.status === "pending"
        ? this.scheduleGc()
        : this.#s.remove(this));
  }
  continue() {
    return this.#n?.continue() ?? this.execute(this.state.variables);
  }
  async execute(t) {
    const e = () => {
        this.#i({ type: "continue" });
      },
      s = {
        client: this.#t,
        meta: this.options.meta,
        mutationKey: this.options.mutationKey,
      };
    this.#n = Y({
      fn: () =>
        this.options.mutationFn
          ? this.options.mutationFn(t, s)
          : Promise.reject(new Error("No mutationFn found")),
      onFail: (n, h) => {
        this.#i({ type: "failed", failureCount: n, error: h });
      },
      onPause: () => {
        this.#i({ type: "pause" });
      },
      onContinue: e,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#s.canRun(this),
    });
    const i = this.state.status === "pending",
      r = !this.#n.canStart();
    try {
      if (i) e();
      else {
        this.#i({ type: "pending", variables: t, isPaused: r }),
          await this.#s.config.onMutate?.(t, this, s);
        const h = await this.options.onMutate?.(t, s);
        h !== this.state.context &&
          this.#i({ type: "pending", context: h, variables: t, isPaused: r });
      }
      const n = await this.#n.start();
      return (
        await this.#s.config.onSuccess?.(n, t, this.state.context, this, s),
        await this.options.onSuccess?.(n, t, this.state.context, s),
        await this.#s.config.onSettled?.(
          n,
          null,
          this.state.variables,
          this.state.context,
          this,
          s
        ),
        await this.options.onSettled?.(n, null, t, this.state.context, s),
        this.#i({ type: "success", data: n }),
        n
      );
    } catch (n) {
      try {
        throw (
          (await this.#s.config.onError?.(n, t, this.state.context, this, s),
          await this.options.onError?.(n, t, this.state.context, s),
          await this.#s.config.onSettled?.(
            void 0,
            n,
            this.state.variables,
            this.state.context,
            this,
            s
          ),
          await this.options.onSettled?.(void 0, n, t, this.state.context, s),
          n)
        );
      } finally {
        this.#i({ type: "error", error: n });
      }
    } finally {
      this.#s.runNext(this);
    }
  }
  #i(t) {
    const e = (s) => {
      switch (t.type) {
        case "failed":
          return { ...s, failureCount: t.failureCount, failureReason: t.error };
        case "pause":
          return { ...s, isPaused: !0 };
        case "continue":
          return { ...s, isPaused: !1 };
        case "pending":
          return {
            ...s,
            context: t.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: t.isPaused,
            status: "pending",
            variables: t.variables,
            submittedAt: Date.now(),
          };
        case "success":
          return {
            ...s,
            data: t.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...s,
            data: void 0,
            error: t.error,
            failureCount: s.failureCount + 1,
            failureReason: t.error,
            isPaused: !1,
            status: "error",
          };
      }
    };
    (this.state = e(this.state)),
      o.batch(() => {
        this.#e.forEach((s) => {
          s.onMutationUpdate(t);
        }),
          this.#s.notify({ mutation: this, type: "updated", action: t });
      });
  }
};
function rt() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var at = class extends D {
  constructor(t = {}) {
    super(),
      (this.config = t),
      (this.#t = new Set()),
      (this.#e = new Map()),
      (this.#s = 0);
  }
  #t;
  #e;
  #s;
  build(t, e, s) {
    const i = new nt({
      client: t,
      mutationCache: this,
      mutationId: ++this.#s,
      options: t.defaultMutationOptions(e),
      state: s,
    });
    return this.add(i), i;
  }
  add(t) {
    this.#t.add(t);
    const e = y(t);
    if (typeof e == "string") {
      const s = this.#e.get(e);
      s ? s.push(t) : this.#e.set(e, [t]);
    }
    this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    if (this.#t.delete(t)) {
      const e = y(t);
      if (typeof e == "string") {
        const s = this.#e.get(e);
        if (s)
          if (s.length > 1) {
            const i = s.indexOf(t);
            i !== -1 && s.splice(i, 1);
          } else s[0] === t && this.#e.delete(e);
      }
    }
    this.notify({ type: "removed", mutation: t });
  }
  canRun(t) {
    const e = y(t);
    if (typeof e == "string") {
      const i = this.#e.get(e)?.find((r) => r.state.status === "pending");
      return !i || i === t;
    } else return !0;
  }
  runNext(t) {
    const e = y(t);
    return typeof e == "string"
      ? this.#e
          .get(e)
          ?.find((i) => i !== t && i.state.isPaused)
          ?.continue() ?? Promise.resolve()
      : Promise.resolve();
  }
  clear() {
    o.batch(() => {
      this.#t.forEach((t) => {
        this.notify({ type: "removed", mutation: t });
      }),
        this.#t.clear(),
        this.#e.clear();
    });
  }
  getAll() {
    return Array.from(this.#t);
  }
  find(t) {
    const e = { exact: !0, ...t };
    return this.getAll().find((s) => Q(e, s));
  }
  findAll(t = {}) {
    return this.getAll().filter((e) => Q(t, e));
  }
  notify(t) {
    o.batch(() => {
      this.listeners.forEach((e) => {
        e(t);
      });
    });
  }
  resumePausedMutations() {
    const t = this.getAll().filter((e) => e.state.isPaused);
    return o.batch(() => Promise.all(t.map((e) => e.continue().catch(c))));
  }
};
function y(t) {
  return t.options.scope?.id;
}
var ot = class extends D {
    constructor(t = {}) {
      super(), (this.config = t), (this.#t = new Map());
    }
    #t;
    build(t, e, s) {
      const i = e.queryKey,
        r = e.queryHash ?? E(i, e);
      let n = this.get(r);
      return (
        n ||
          ((n = new Z({
            client: t,
            queryKey: i,
            queryHash: r,
            options: t.defaultQueryOptions(e),
            state: s,
            defaultOptions: t.getQueryDefaults(i),
          })),
          this.add(n)),
        n
      );
    }
    add(t) {
      this.#t.has(t.queryHash) ||
        (this.#t.set(t.queryHash, t), this.notify({ type: "added", query: t }));
    }
    remove(t) {
      const e = this.#t.get(t.queryHash);
      e &&
        (t.destroy(),
        e === t && this.#t.delete(t.queryHash),
        this.notify({ type: "removed", query: t }));
    }
    clear() {
      o.batch(() => {
        this.getAll().forEach((t) => {
          this.remove(t);
        });
      });
    }
    get(t) {
      return this.#t.get(t);
    }
    getAll() {
      return [...this.#t.values()];
    }
    find(t) {
      const e = { exact: !0, ...t };
      return this.getAll().find((s) => x(e, s));
    }
    findAll(t = {}) {
      const e = this.getAll();
      return Object.keys(t).length > 0 ? e.filter((s) => x(t, s)) : e;
    }
    notify(t) {
      o.batch(() => {
        this.listeners.forEach((e) => {
          e(t);
        });
      });
    }
    onFocus() {
      o.batch(() => {
        this.getAll().forEach((t) => {
          t.onFocus();
        });
      });
    }
    onOnline() {
      o.batch(() => {
        this.getAll().forEach((t) => {
          t.onOnline();
        });
      });
    }
  },
  ut = class {
    #t;
    #e;
    #s;
    #n;
    #i;
    #r;
    #a;
    #o;
    constructor(t = {}) {
      (this.#t = t.queryCache || new ot()),
        (this.#e = t.mutationCache || new at()),
        (this.#s = t.defaultOptions || {}),
        (this.#n = new Map()),
        (this.#i = new Map()),
        (this.#r = 0);
    }
    mount() {
      this.#r++,
        this.#r === 1 &&
          ((this.#a = $.subscribe(async (t) => {
            t && (await this.resumePausedMutations(), this.#t.onFocus());
          })),
          (this.#o = M.subscribe(async (t) => {
            t && (await this.resumePausedMutations(), this.#t.onOnline());
          })));
    }
    unmount() {
      this.#r--,
        this.#r === 0 &&
          (this.#a?.(), (this.#a = void 0), this.#o?.(), (this.#o = void 0));
    }
    isFetching(t) {
      return this.#t.findAll({ ...t, fetchStatus: "fetching" }).length;
    }
    isMutating(t) {
      return this.#e.findAll({ ...t, status: "pending" }).length;
    }
    getQueryData(t) {
      const e = this.defaultQueryOptions({ queryKey: t });
      return this.#t.get(e.queryHash)?.state.data;
    }
    ensureQueryData(t) {
      const e = this.defaultQueryOptions(t),
        s = this.#t.build(this, e),
        i = s.state.data;
      return i === void 0
        ? this.fetchQuery(t)
        : (t.revalidateIfStale &&
            s.isStaleByTime(C(e.staleTime, s)) &&
            this.prefetchQuery(e),
          Promise.resolve(i));
    }
    getQueriesData(t) {
      return this.#t.findAll(t).map(({ queryKey: e, state: s }) => {
        const i = s.data;
        return [e, i];
      });
    }
    setQueryData(t, e, s) {
      const i = this.defaultQueryOptions({ queryKey: t }),
        n = this.#t.get(i.queryHash)?.state.data,
        h = tt(e, n);
      if (h !== void 0)
        return this.#t.build(this, i).setData(h, { ...s, manual: !0 });
    }
    setQueriesData(t, e, s) {
      return o.batch(() =>
        this.#t
          .findAll(t)
          .map(({ queryKey: i }) => [i, this.setQueryData(i, e, s)])
      );
    }
    getQueryState(t) {
      const e = this.defaultQueryOptions({ queryKey: t });
      return this.#t.get(e.queryHash)?.state;
    }
    removeQueries(t) {
      const e = this.#t;
      o.batch(() => {
        e.findAll(t).forEach((s) => {
          e.remove(s);
        });
      });
    }
    resetQueries(t, e) {
      const s = this.#t;
      return o.batch(
        () => (
          s.findAll(t).forEach((i) => {
            i.reset();
          }),
          this.refetchQueries({ type: "active", ...t }, e)
        )
      );
    }
    cancelQueries(t, e = {}) {
      const s = { revert: !0, ...e },
        i = o.batch(() => this.#t.findAll(t).map((r) => r.cancel(s)));
      return Promise.all(i).then(c).catch(c);
    }
    invalidateQueries(t, e = {}) {
      return o.batch(
        () => (
          this.#t.findAll(t).forEach((s) => {
            s.invalidate();
          }),
          t?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...t, type: t?.refetchType ?? t?.type ?? "active" },
                e
              )
        )
      );
    }
    refetchQueries(t, e = {}) {
      const s = { ...e, cancelRefetch: e.cancelRefetch ?? !0 },
        i = o.batch(() =>
          this.#t
            .findAll(t)
            .filter((r) => !r.isDisabled() && !r.isStatic())
            .map((r) => {
              let n = r.fetch(void 0, s);
              return (
                s.throwOnError || (n = n.catch(c)),
                r.state.fetchStatus === "paused" ? Promise.resolve() : n
              );
            })
        );
      return Promise.all(i).then(c);
    }
    fetchQuery(t) {
      const e = this.defaultQueryOptions(t);
      e.retry === void 0 && (e.retry = !1);
      const s = this.#t.build(this, e);
      return s.isStaleByTime(C(e.staleTime, s))
        ? s.fetch(e)
        : Promise.resolve(s.state.data);
    }
    prefetchQuery(t) {
      return this.fetchQuery(t).then(c).catch(c);
    }
    fetchInfiniteQuery(t) {
      return (t.behavior = j(t.pages)), this.fetchQuery(t);
    }
    prefetchInfiniteQuery(t) {
      return this.fetchInfiniteQuery(t).then(c).catch(c);
    }
    ensureInfiniteQueryData(t) {
      return (t.behavior = j(t.pages)), this.ensureQueryData(t);
    }
    resumePausedMutations() {
      return M.isOnline() ? this.#e.resumePausedMutations() : Promise.resolve();
    }
    getQueryCache() {
      return this.#t;
    }
    getMutationCache() {
      return this.#e;
    }
    getDefaultOptions() {
      return this.#s;
    }
    setDefaultOptions(t) {
      this.#s = t;
    }
    setQueryDefaults(t, e) {
      this.#n.set(F(t), { queryKey: t, defaultOptions: e });
    }
    getQueryDefaults(t) {
      const e = [...this.#n.values()],
        s = {};
      return (
        e.forEach((i) => {
          S(t, i.queryKey) && Object.assign(s, i.defaultOptions);
        }),
        s
      );
    }
    setMutationDefaults(t, e) {
      this.#i.set(F(t), { mutationKey: t, defaultOptions: e });
    }
    getMutationDefaults(t) {
      const e = [...this.#i.values()],
        s = {};
      return (
        e.forEach((i) => {
          S(t, i.mutationKey) && Object.assign(s, i.defaultOptions);
        }),
        s
      );
    }
    defaultQueryOptions(t) {
      if (t._defaulted) return t;
      const e = {
        ...this.#s.queries,
        ...this.getQueryDefaults(t.queryKey),
        ...t,
        _defaulted: !0,
      };
      return (
        e.queryHash || (e.queryHash = E(e.queryKey, e)),
        e.refetchOnReconnect === void 0 &&
          (e.refetchOnReconnect = e.networkMode !== "always"),
        e.throwOnError === void 0 && (e.throwOnError = !!e.suspense),
        !e.networkMode && e.persister && (e.networkMode = "offlineFirst"),
        e.queryFn === et && (e.enabled = !1),
        e
      );
    }
    defaultMutationOptions(t) {
      return t?._defaulted
        ? t
        : {
            ...this.#s.mutations,
            ...(t?.mutationKey && this.getMutationDefaults(t.mutationKey)),
            ...t,
            _defaulted: !0,
          };
    }
    clear() {
      this.#t.clear(), this.#e.clear();
    }
  };
const ht = new ut();
function R({ children: t }) {
  return a.jsx(st, { client: ht, children: t });
}
const dt = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];
function ft({ children: t }) {
  return a.jsxs("html", {
    lang: "en",
    children: [
      a.jsxs("head", {
        children: [
          a.jsx("meta", { charSet: "utf-8" }),
          a.jsx("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          }),
          a.jsx(G, {}),
          a.jsx(L, {}),
        ],
      }),
      a.jsxs("body", {
        className: "bg-dao-blue",
        children: [t, a.jsx(_, {}), a.jsx(U, {})],
      }),
    ],
  });
}
const pt = I(function () {
    return a.jsx(R, { children: a.jsx(A, {}) });
  }),
  yt = N(function () {
    return a.jsx(R, { children: a.jsx(A, {}) });
  }),
  mt = B(function ({ error: e }) {
    let s = "Oops!",
      i = "An unexpected error occurred.",
      r;
    return (
      W(e) &&
        ((s = e.status === 404 ? "404" : "Error"),
        (i =
          e.status === 404
            ? "The requested page could not be found."
            : e.statusText || i)),
      a.jsxs("main", {
        className:
          "min-h-screen flex flex-col items-center justify-center bg-dao-blue text-white p-4",
        children: [
          a.jsx("h1", { className: "text-6xl font-bold mb-4", children: s }),
          a.jsx("p", { className: "text-xl mb-8", children: i }),
          r,
        ],
      })
    );
  });
export {
  mt as ErrorBoundary,
  yt as HydrateFallback,
  ft as Layout,
  pt as default,
  dt as links,
};
