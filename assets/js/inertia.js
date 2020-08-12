/*!
 * InertiaPlugin 3.2.3
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function (e) {
    "use strict";

    function m() {
        return n || "undefined" != typeof window && (n = window.gsap)
    }

    function p(t) {
        return s(t).id
    }

    function q(t) {
        return f[p("string" == typeof t ? g(t)[0] : t)]
    }

    function r(t) {
        var e, n = a;
        if (.05 <= t - i)
            for (i = t; n;)((e = n.g(n.t, n.p)) !== n.v1 || .2 < t - n.t1) && (n.v2 = n.v1, n.v1 = e, n.t2 = n.t1, n.t1 = t), n = n._next
    }

    function t() {
        (n = m()) && (g = n.utils.toArray, o = n.utils.getUnit, s = n.core.getCache, c = n.ticker, l = 1)
    }

    function u(t, e, n, i) {
        this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = d[n || o(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = c.time, i && ((this._next = i)._prev = this)
    }
    var n, l, g, o, a, c, i, s, f = {},
        d = {
            deg: 360,
            rad: 2 * Math.PI
        },
        h = function () {
            function VelocityTracker(e, n) {
                l || t(), this.target = g(e)[0], (f[p(this.target)] = this)._props = {}, n && this.add(n)
            }
            VelocityTracker.register = function register(e) {
                n = e, t()
            };
            var e = VelocityTracker.prototype;
            return e.get = function get(t, e) {
                var n, i, r = this._props[t];
                return r || console.warn("Not tracking " + t + " velocity."), n = parseFloat(e ? r.v1 : r.g(r.t, r.p)) - parseFloat(r.v2), (i = r.rCap) && (n %= i) !== n % (i / 2) && (n = n < 0 ? n + i : n - i),
                    function _round(t) {
                        return Math.round(1e4 * t) / 1e4
                    }(n / ((e ? r.t1 : c.time) - r.t2))
            }, e.getAll = function getAll() {
                var t, e = {},
                    n = this._props;
                for (t in n) e[t] = this.get(t);
                return e
            }, e.isTracking = function isTracking(t) {
                return t in this._props
            }, e.add = function add(t, e) {
                t in this._props || (a || (c.add(r), i = c.time), a = this._props[t] = new u(this.target, t, e, a))
            }, e.remove = function remove(t) {
                var e, n, i = this._props[t];
                i && (e = i._prev, n = i._next, e && (e._next = n), n ? n._prev = e : a === i && (c.remove(r), a = 0), delete this._props[t])
            }, e.kill = function kill(t) {
                for (var e in this._props) this.remove(e);
                t || delete f[p(this.target)]
            }, VelocityTracker.track = function track(e, n, i) {
                l || t();
                for (var r, o, a = [], c = g(e), s = n.split(","), u = (i || "").split(","), f = c.length; f--;) {
                    for (r = q(c[f]) || new VelocityTracker(c[f]), o = s.length; o--;) r.add(s[o], u[o] || u[0]);
                    a.push(r)
                }
                return a
            }, VelocityTracker.untrack = function untrack(t, e) {
                var n = (e || "").split(",");
                g(t).forEach(function (t) {
                    var e = q(t);
                    e && (n.length ? n.forEach(function (t) {
                        return e.remove(t)
                    }) : e.kill(1))
                })
            }, VelocityTracker.isTracking = function isTracking(t, e) {
                var n = q(t);
                return n && n.isTracking(e)
            }, VelocityTracker.getVelocity = function getVelocity(t, e) {
                var n = q(t);
                return n && n.isTracking(e) ? n.get(e) : console.warn("Not tracking velocity of " + e)
            }, VelocityTracker
        }();
    h.getByTarget = q, m() && n.registerPlugin(h);

    function I() {
        return v || "undefined" != typeof window && (v = window.gsap) && v.registerPlugin && v
    }

    function K(t) {
        return "number" == typeof t
    }

    function L(t) {
        return "object" == typeof t
    }

    function M(t) {
        return "function" == typeof t
    }

    function P() {
        return String.fromCharCode.apply(null, arguments)
    }

    function T(t) {
        return t
    }

    function X(t) {
        return Math.round(1e4 * t) / 1e4
    }

    function Y(t, e, n) {
        for (var i in e) i in t || i === n || (t[i] = e[i]);
        return t
    }

    function Z(t, e, n, i, r) {
        var o, a, c, s, u = e.length,
            f = 0,
            l = S;
        if (L(t)) {
            for (; u--;) {
                for (c in o = e[u], a = 0, t) a += (s = o[c] - t[c]) * s;
                a < l && (f = u, l = a)
            }
            if ((r || S) < S && r < Math.sqrt(l)) return t
        } else
            for (; u--;)(a = (o = e[u]) - t) < 0 && (a = -a), a < l && i <= o && o <= n && (f = u, l = a);
        return e[f]
    }

    function $(t, e, n, i, r, o) {
        if ("auto" === t.end) return t;
        var a, c, s = t.end;
        if (n = isNaN(n) ? S : n, i = isNaN(i) ? -S : i, L(e)) {
            if (a = e.calculated ? e : (M(s) ? s(e) : Z(e, s, n, i, o)) || e, !e.calculated) {
                for (c in a) e[c] = a[c];
                e.calculated = !0
            }
            a = a[r]
        } else a = M(s) ? s(e) : R(s) ? Z(e, s, n, i, o) : parseFloat(s);
        return n < a ? a = n : a < i && (a = i), {
            max: a,
            min: a,
            unitFactor: t.unitFactor
        }
    }

    function _(t, e, n) {
        return isNaN(t[e]) ? n : +t[e]
    }

    function aa(t, e) {
        return .05 * e * t / k
    }

    function ba(t, e, n) {
        return Math.abs((e - t) * k / n / .05)
    }

    function da(t, e, n, i) {
        if (e.linkedProps) {
            var r, o, a, c, s, u, f = e.linkedProps.split(","),
                l = {};
            for (r = 0; r < f.length; r++)(a = e[o = f[r]]) && (c = K(a.velocity) ? a.velocity : (s = s || C(t)) && s.isTracking(o) ? s.get(o) : 0, u = Math.abs(c / _(a, "resistance", i)), l[o] = parseFloat(n(t, o)) + aa(c, u));
            return l
        }
    }

    function fa() {
        (v = I()) && (y = v.parseEase, F = v.utils.toArray, N = v.utils.getUnit, O = v.core.getCache, A = v.utils.clamp, w = y("power3"), k = w(.05), b = v.core.PropTween, v.config({
            resistance: 100,
            unitFactors: {
                time: 1e3,
                totalTime: 1e3
            }
        }), V = v.config(), v.registerPlugin(h), x = 1)
    }
    var v, x, y, F, w, V, N, b, O, k, A, C = h.getByTarget,
        E = "InertiaPlugin",
        j = P(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        R = Array.isArray,
        S = 1e10,
        U = {
            resistance: 1,
            checkpoint: 1,
            preventOvershoot: 1,
            linkedProps: 1,
            radius: 1,
            duration: 1
        },
        D = {
            version: "3.2.3",
            name: "inertia",
            register: function register(t) {
                v = t, fa()
            },
            init: function init(t, e, n, i, r) {
                x || fa();
                var o = C(t);
                if ("auto" === e) {
                    if (!o) return void console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
                    e = o.getAll()
                }
                this.target = t, this.tween = n;
                var a, c, s, u, f, l, p, g, d, h = t._gsap,
                    v = h.get,
                    m = e.duration,
                    y = L(m),
                    P = e.preventOvershoot || y && 0 === m.overshoot,
                    w = _(e, "resistance", V.resistance),
                    k = K(m) ? m : function _calculateTweenDuration(t, e, n, i, r, o) {
                        if (void 0 === n && (n = 10), void 0 === i && (i = .2), void 0 === r && (r = 1), void 0 === o && (o = 0), function _isString(t) {
                                return "string" == typeof t
                            }(t) && (t = F(t)[0]), !t) return 0;
                        var a, c, s, u, f, l, p, g, d, h, v = 0,
                            m = S,
                            y = e.inertia || e,
                            P = O(t).get,
                            w = _(y, "resistance", V.resistance);
                        for (a in h = da(t, y, P, w), y) U[a] || (c = y[a], L(c) || ((g = g || C(t)) && g.isTracking(a) ? c = K(c) ? {
                            velocity: c
                        } : {
                            velocity: g.get(a)
                        } : (u = +c || 0, s = Math.abs(u / w))), L(c) && (u = K(c.velocity) ? c.velocity : (g = g || C(t)) && g.isTracking(a) ? g.get(a) : 0, s = A(i, n, Math.abs(u / _(c, "resistance", w))), l = (f = parseFloat(P(t, a)) || 0) + aa(u, s), "end" in c && (c = $(c, h && a in h ? h : l, c.max, c.min, a, y.radius), o && (y[a] = Y(c, y[a], "end"))), "max" in c && l > +c.max + 1e-10 ? (d = c.unitFactor || V.unitFactors[a] || 1, (p = f > c.max && c.min !== c.max || -15 < u * d && u * d < 45 ? i + .1 * (n - i) : ba(f, c.max, u)) + r < m && (m = p + r)) : "min" in c && l < c.min - 1e-10 && (d = c.unitFactor || V.unitFactors[a] || 1, (p = f < c.min && c.min !== c.max || -45 < u * d && u * d < 15 ? i + .1 * (n - i) : ba(f, c.min, u)) + r < m && (m = p + r)), v < p && (v = p)), v < s && (v = s));
                        return m < v && (v = m), n < v ? n : v < i ? i : v
                    }(t, e, y && m.max || 10, y && m.min || .2, y && "overshoot" in m ? +m.overshoot : P ? 0 : 1);
                for (a in d = da(t, e, v, w), e) U[a] || (c = e[a], M(c) && (c = c(i, t, r)), K(c) ? f = c : L(c) && !isNaN(c.velocity) ? f = +c.velocity : o && o.isTracking(a) ? f = o.get(a) : console.warn("ERROR: No velocity was defined for " + t + " property: " + a), l = aa(f, k), g = 0, s = v(t, a), u = N(s), s = parseFloat(s), L(c) && (p = s + l, "end" in c && (c = $(c, d && a in d ? d : p, c.max, c.min, a, e.radius)), "max" in c && +c.max < p ? P || c.preventOvershoot ? l = c.max - s : g = c.max - s - l : "min" in c && +c.min > p && (P || c.preventOvershoot ? l = c.min - s : g = c.min - s - l)), this._props.push(a), this._pt = new b(this._pt, t, a, s, 0, T, 0, h.set(t, a, this)), this._pt.u = u || 0, this._pt.c1 = l, this._pt.c2 = g);
                return n.duration(k)
            },
            render: function render(t, e) {
                var n = e._pt;
                for (t = w(e.tween._time / e.tween._dur); n;) n.set(n.t, n.p, X(n.s + n.c1 * t + n.c2 * t * t) + n.u, n.d, t), n = n._next
            }
        };
    "track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function (t) {
        return D[t] = h[t]
    }), I() && v.registerPlugin(D), e.InertiaPlugin = D, e.VelocityTracker = h, e.default = D;
    if (typeof (window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});
