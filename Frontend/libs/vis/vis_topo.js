/**
 * vis.js
 * https://github.com/almende/vis
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 4.7.0
 * @date    2015-07-27
 *
 * @license
 * Copyright (C) 2011-2014 Almende B.V, http://almende.com
 *
 * Vis.js is dual licensed under both
 *
 * * The Apache 2.0 License
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * and
 *
 * * The MIT License
 *   http://opensource.org/licenses/MIT
 *
 * Vis.js may be distributed under either license.
 */
"use strict";
!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? exports.vis = e() : t.vis = e();
}(this, function () {
    return function (t) {
        function e(o) {
            if (i[o])return i[o].exports;
            var n = i[o] = {exports: {}, id: o, loaded: !1};
            return t[o].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
        }

        var i = {};
        return e.m = t, e.c = i, e.p = "", e(0)
    }([
        function (t, e, i) {
            e.util = i(7), e.DOMutil = i(13), e.DataSet = i(14), e.DataView = i(16), e.Queue = i(15), e.Graph3d = i(17), e.graph3d = {
                Camera: i(21),
                Filter: i(22),
                Point2d: i(18),
                Point3d: i(20),
                Slider: i(23),
                StepNumber: i(24)
            }, e.Timeline = i(25), e.Graph2d = i(49), e.timeline = {
                DateUtil: i(29),
                DataStep: i(52),
                Range: i(26),
                stack: i(33),
                TimeStep: i(35),
                components: {
                    items: {
                        Item: i(2),
                        BackgroundItem: i(38),
                        BoxItem: i(37),
                        PointItem: i(1),
                        RangeItem: i(34)
                    },
                    Component: i(28),
                    CurrentTime: i(44),
                    CustomTime: i(42),
                    DataAxis: i(51),
                    GraphGroup: i(53),
                    Group: i(32),
                    BackgroundGroup: i(36),
                    ItemSet: i(31),
                    Legend: i(57),
                    LineGraph: i(50),
                    TimeAxis: i(39)
                }
            }, e.Network = i(59), e.network = {
                Images: i(114),
                dotparser: i(112),
                gephiParser: i(113),
                allOptions: i(110)
            }, e.network.convertDot = function (t) {
                return e.network.dotparser.DOTToGraph(t)
            }, e.network.convertGephi = function (t, i) {
                return e.network.gephiParser.parseGephi(t, i)
            }, e.Graph = function () {
                throw new Error("Graph is renamed to Network. Please create a graph as new vis.Network(...)")
            }, e.moment = i(8), e.hammer = i(3), e.Hammer = i(3), e.keycharm = i(41)
        },
        function (t, e, i) {
            function o(t, e, i) {
                if (this.props = {
                        dot: {top: 0, width: 0, height: 0},
                        content: {height: 0, marginLeft: 0}
                    }, t && void 0 == t.start)throw new Error('Property "start" missing in item ' + t);
                n.call(this, t, e, i)
            }

            var n = i(2);
            o.prototype = new n(null, null, null), o.prototype.isVisible = function (t) {
                var e = (t.end - t.start) / 4;
                return this.data.start > t.start - e && this.data.start < t.end + e
            }, o.prototype.redraw = function () {
                var t = this.dom;
                if (t || (this.dom = {}, t = this.dom, t.point = document.createElement("div"), t.content = document.createElement("div"), t.content.className = "vis-item-content", t.point.appendChild(t.content), t.dot = document.createElement("div"), t.point.appendChild(t.dot), t.point["timeline-item"] = this, this.dirty = !0), !this.parent)throw new Error("Cannot redraw item: no parent attached");
                if (!t.point.parentNode) {
                    var e = this.parent.dom.foreground;
                    if (!e)throw new Error("Cannot redraw item: parent has no foreground container element");
                    e.appendChild(t.point)
                }
                if (this.displayed = !0, this.dirty) {
                    this._updateContents(this.dom.content), this._updateTitle(this.dom.point), this._updateDataAttributes(this.dom.point), this._updateStyle(this.dom.point);
                    var i = (this.options.editable.updateTime || this.options.editable.updateGroup || this.editable === !0) && this.editable !== !1, o = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "") + (i ? " vis-editable" : " vis-readonly");
                    t.point.className = "vis-item vis-point" + o, t.dot.className = "vis-item vis-dot" + o, this.props.dot.width = t.dot.offsetWidth, this.props.dot.height = t.dot.offsetHeight, this.props.content.height = t.content.offsetHeight, t.content.style.marginLeft = 2 * this.props.dot.width + "px", t.dot.style.top = (this.height - this.props.dot.height) / 2 + "px", t.dot.style.left = this.props.dot.width / 2 + "px", this.width = t.point.offsetWidth, this.height = t.point.offsetHeight, this.dirty = !1
                }
                this._repaintDeleteButton(t.point)
            }, o.prototype.show = function () {
                this.displayed || this.redraw()
            }, o.prototype.hide = function () {
                this.displayed && (this.dom.point.parentNode && this.dom.point.parentNode.removeChild(this.dom.point), this.displayed = !1)
            }, o.prototype.repositionX = function () {
                var t = this.conversion.toScreen(this.data.start);
                this.left = t - this.props.dot.width, this.dom.point.style.left = this.left + "px"
            }, o.prototype.repositionY = function () {
                var t = this.options.orientation.item, e = this.dom.point;
                "top" == t ? e.style.top = this.top + "px" : e.style.top = this.parent.height - this.top - this.height + "px"
            }, o.prototype.getWidthLeft = function () {
                return this.props.dot.width
            }, o.prototype.getWidthRight = function () {
                return this.width - this.props.dot.width
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                this.id = null, this.parent = null, this.data = t, this.dom = null, this.conversion = e || {}, this.options = i || {}, this.selected = !1, this.displayed = !1, this.dirty = !0, this.top = null, this.left = null, this.width = null, this.height = null, this.editable = null, this.data && this.data.hasOwnProperty("editable") && "boolean" == typeof this.data.editable && (this.editable = t.editable)
            }

            var n = i(3), s = i(7);
            o.prototype.stack = !0, o.prototype.select = function () {
                this.selected = !0, this.dirty = !0, this.displayed && this.redraw()
            }, o.prototype.unselect = function () {
                this.selected = !1, this.dirty = !0, this.displayed && this.redraw()
            }, o.prototype.setData = function (t) {
                var e = void 0 != t.group && this.data.group != t.group;
                e && this.parent.itemSet._moveToGroup(this, t.group), t.hasOwnProperty("editable") && "boolean" == typeof t.editable && (this.editable = t.editable), this.data = t, this.dirty = !0, this.displayed && this.redraw()
            }, o.prototype.setParent = function (t) {
                this.displayed ? (this.hide(), this.parent = t, this.parent && this.show()) : this.parent = t
            }, o.prototype.isVisible = function (t) {
                return !1
            }, o.prototype.show = function () {
                return !1
            }, o.prototype.hide = function () {
                return !1
            }, o.prototype.redraw = function () {
            }, o.prototype.repositionX = function () {
            }, o.prototype.repositionY = function () {
            }, o.prototype._repaintDeleteButton = function (t) {
                var e = (this.options.editable.remove || this.data.editable === !0) && this.data.editable !== !1;
                if (this.selected && e && !this.dom.deleteButton) {
                    var i = this, o = document.createElement("div");
                    o.className = "vis-delete", o.title = "Delete this item", new n(o).on("tap", function (t) {
                        t.stopPropagation(), i.parent.removeFromDataSet(i)
                    }), t.appendChild(o), this.dom.deleteButton = o
                } else!this.selected && this.dom.deleteButton && (this.dom.deleteButton.parentNode && this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton), this.dom.deleteButton = null)
            }, o.prototype._updateContents = function (t) {
                var e;
                if (this.options.template) {
                    var i = this.parent.itemSet.itemsData.get(this.id);
                    e = this.options.template(i)
                } else e = this.data.content;
                var o = this._contentToString(this.content) !== this._contentToString(e);
                if (o) {
                    if (e instanceof Element) t.innerHTML = "", t.appendChild(e); else if (void 0 != e) t.innerHTML = e; else if ("background" != this.data.type || void 0 !== this.data.content)throw new Error('Property "content" missing in item ' + this.id);
                    this.content = e
                }
            }, o.prototype._updateTitle = function (t) {
                null != this.data.title ? t.title = this.data.title || "" : t.removeAttribute("vis-title")
            }, o.prototype._updateDataAttributes = function (t) {
                if (this.options.dataAttributes && this.options.dataAttributes.length > 0) {
                    var e = [];
                    if (Array.isArray(this.options.dataAttributes)) e = this.options.dataAttributes; else {
                        if ("all" != this.options.dataAttributes)return;
                        e = Object.keys(this.data)
                    }
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i], n = this.data[o];
                        null != n ? t.setAttribute("data-" + o, n) : t.removeAttribute("data-" + o)
                    }
                }
            }, o.prototype._updateStyle = function (t) {
                this.style && (s.removeCssText(t, this.style), this.style = null), this.data.style && (s.addCssText(t, this.data.style), this.style = this.data.style)
            }, o.prototype._contentToString = function (t) {
                return "string" == typeof t ? t : t && "outerHTML" in t ? t.outerHTML : t
            }, o.prototype.getWidthLeft = function () {
                return 0
            }, o.prototype.getWidthRight = function () {
                return 0
            }, t.exports = o
        },
        function (t, e, i) {
            if ("undefined" != typeof window) {
                var o = i(4), n = window.Hammer || i(5);
                t.exports = o(n, {preventDefault: "mouse"})
            } else t.exports = function () {
                throw Error("hammer.js is only available in a browser, not in node.js.")
            }
        },
        function (t, e, i) {
            var o, n, s;
            !function (i) {
                n = [], o = i, s = "function" == typeof o ? o.apply(e, n) : o, !(void 0 !== s && (t.exports = s))
            }(function () {
                var t = null;
                return function e(i, o) {
                    function n(t) {
                        return t.match(/[^ ]+/g)
                    }

                    function s(e) {
                        if ("hammer.input" !== e.type) {
                            if (e.srcEvent._handled || (e.srcEvent._handled = {}), e.srcEvent._handled[e.type])return;
                            e.srcEvent._handled[e.type] = !0
                        }
                        var i = !1;
                        e.stopPropagation = function () {
                            i = !0
                        }, e.firstTarget = t;
                        for (var o = t; o && !i;) {
                            var n = o.hammer && o.hammer._handlers[e.type];
                            if (n)for (var s = 0; s < n.length && !i; s++)n[s](e);
                            o = o.parentNode
                        }
                    }

                    var r = o || {preventDefault: !1};
                    if (i.Manager) {
                        var a = i, h = function (t, i) {
                            var o = Object.create(r);
                            return i && a.extend(o, i), e(new a(t, o), o)
                        };
                        return a.extend(h, a), h.Manager = function (t, i) {
                            var o = Object.create(r);
                            return i && a.extend(o, i), e(new a.Manager(t, o), o)
                        }, h
                    }
                    var d = Object.create(i), l = i.element;
                    return l.hammer = d, i.on("hammer.input", function (e) {
                        (r.preventDefault === !0 || r.preventDefault === e.pointerType) && e.preventDefault(), e.isFirst && (t = e.target)
                    }), d._handlers = {}, d.on = function (t, e) {
                        return n(t).forEach(function (t) {
                            var o = d._handlers[t];
                            o || (d._handlers[t] = o = [], i.on(t, s)), o.push(e)
                        }), d
                    }, d.off = function (t, e) {
                        return n(t).forEach(function (t) {
                            var o = d._handlers[t];
                            o && (o = e ? o.filter(function (t) {
                                    return t !== e
                                }) : [], o.length > 0 ? d._handlers[t] = o : (i.off(t, s), delete d._handlers[t]))
                        }), d
                    }, d.emit = function (e, o) {
                        t = o.target, i.emit(e, o)
                    }, d.destroy = function () {
                        delete i.element.hammer, d._handlers = {}, i.destroy()
                    }, d
                }
            })
        },
        function (t, e, i) {
            var o;
            !function (n, s, r, a) {
                function h(t, e, i) {
                    return setTimeout(f(t, i), e)
                }

                function d(t, e, i) {
                    return Array.isArray(t) ? (l(t, i[e], i), !0) : !1
                }

                function l(t, e, i) {
                    var o;
                    if (t)if (t.forEach) t.forEach(e, i); else if (t.length !== a)for (o = 0; o < t.length;)e.call(i, t[o], o, t), o++; else for (o in t)t.hasOwnProperty(o) && e.call(i, t[o], o, t)
                }

                function u(t, e, i) {
                    for (var o = Object.keys(e), n = 0; n < o.length;)(!i || i && t[o[n]] === a) && (t[o[n]] = e[o[n]]), n++;
                    return t
                }

                function c(t, e) {
                    return u(t, e, !0)
                }

                function p(t, e, i) {
                    var o, n = e.prototype;
                    o = t.prototype = Object.create(n), o.constructor = t, o._super = n, i && u(o, i)
                }

                function f(t, e) {
                    return function () {
                        return t.apply(e, arguments)
                    }
                }

                function m(t, e) {
                    return typeof t == ft ? t.apply(e ? e[0] || a : a, e) : t
                }

                function v(t, e) {
                    return t === a ? e : t
                }

                function g(t, e, i) {
                    l(_(e), function (e) {
                        t.addEventListener(e, i, !1)
                    })
                }

                function y(t, e, i) {
                    l(_(e), function (e) {
                        t.removeEventListener(e, i, !1)
                    })
                }

                function b(t, e) {
                    for (; t;) {
                        if (t == e)return !0;
                        t = t.parentNode
                    }
                    return !1
                }

                function w(t, e) {
                    return t.indexOf(e) > -1
                }

                function _(t) {
                    return t.trim().split(/\s+/g)
                }

                function x(t, e, i) {
                    if (t.indexOf && !i)return t.indexOf(e);
                    for (var o = 0; o < t.length;) {
                        if (i && t[o][i] == e || !i && t[o] === e)return o;
                        o++
                    }
                    return -1
                }

                function k(t) {
                    return Array.prototype.slice.call(t, 0)
                }

                function O(t, e, i) {
                    for (var o = [], n = [], s = 0; s < t.length;) {
                        var r = e ? t[s][e] : t[s];
                        x(n, r) < 0 && o.push(t[s]), n[s] = r, s++
                    }
                    return i && (o = e ? o.sort(function (t, i) {
                            return t[e] > i[e]
                        }) : o.sort()), o
                }

                function M(t, e) {
                    for (var i, o, n = e[0].toUpperCase() + e.slice(1), s = 0; s < ct.length;) {
                        if (i = ct[s], o = i ? i + n : e, o in t)return o;
                        s++
                    }
                    return a
                }

                function D() {
                    return yt++
                }

                function C(t) {
                    var e = t.ownerDocument;
                    return e.defaultView || e.parentWindow
                }

                function T(t, e) {
                    var i = this;
                    this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
                        m(t.options.enable, [t]) && i.handler(e)
                    }, this.init()
                }

                function S(t) {
                    var e, i = t.options.inputClass;
                    return new (e = i ? i : _t ? Y : xt ? V : wt ? X : W)(t, E)
                }

                function E(t, e, i) {
                    var o = i.pointers.length, n = i.changedPointers.length, s = e & Tt && o - n === 0, r = e & (Et | Pt) && o - n === 0;
                    i.isFirst = !!s, i.isFinal = !!r, s && (t.session = {}), i.eventType = e, P(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
                }

                function P(t, e) {
                    var i = t.session, o = e.pointers, n = o.length;
                    i.firstInput || (i.firstInput = N(e)), n > 1 && !i.firstMultiple ? i.firstMultiple = N(e) : 1 === n && (i.firstMultiple = !1);
                    var s = i.firstInput, r = i.firstMultiple, a = r ? r.center : s.center, h = e.center = A(o);
                    e.timeStamp = gt(), e.deltaTime = e.timeStamp - s.timeStamp, e.angle = F(a, h), e.distance = R(a, h), I(i, e), e.offsetDirection = B(e.deltaX, e.deltaY), e.scale = r ? H(r.pointers, o) : 1, e.rotation = r ? j(r.pointers, o) : 0, z(i, e);
                    var d = t.element;
                    b(e.srcEvent.target, d) && (d = e.srcEvent.target), e.target = d
                }

                function I(t, e) {
                    var i = e.center, o = t.offsetDelta || {}, n = t.prevDelta || {}, s = t.prevInput || {};
                    (e.eventType === Tt || s.eventType === Et) && (n = t.prevDelta = {
                        x: s.deltaX || 0,
                        y: s.deltaY || 0
                    }, o = t.offsetDelta = {x: i.x, y: i.y}), e.deltaX = n.x + (i.x - o.x), e.deltaY = n.y + (i.y - o.y)
                }

                function z(t, e) {
                    var i, o, n, s, r = t.lastInterval || e, h = e.timeStamp - r.timeStamp;
                    if (e.eventType != Pt && (h > Ct || r.velocity === a)) {
                        var d = r.deltaX - e.deltaX, l = r.deltaY - e.deltaY, u = L(h, d, l);
                        o = u.x, n = u.y, i = vt(u.x) > vt(u.y) ? u.x : u.y, s = B(d, l), t.lastInterval = e
                    } else i = r.velocity, o = r.velocityX, n = r.velocityY, s = r.direction;
                    e.velocity = i, e.velocityX = o, e.velocityY = n, e.direction = s
                }

                function N(t) {
                    for (var e = [], i = 0; i < t.pointers.length;)e[i] = {
                        clientX: mt(t.pointers[i].clientX),
                        clientY: mt(t.pointers[i].clientY)
                    }, i++;
                    return {timeStamp: gt(), pointers: e, center: A(e), deltaX: t.deltaX, deltaY: t.deltaY}
                }

                function A(t) {
                    var e = t.length;
                    if (1 === e)return {x: mt(t[0].clientX), y: mt(t[0].clientY)};
                    for (var i = 0, o = 0, n = 0; e > n;)i += t[n].clientX, o += t[n].clientY, n++;
                    return {x: mt(i / e), y: mt(o / e)}
                }

                function L(t, e, i) {
                    return {x: e / t || 0, y: i / t || 0}
                }

                function B(t, e) {
                    return t === e ? It : vt(t) >= vt(e) ? t > 0 ? zt : Nt : e > 0 ? At : Lt
                }

                function R(t, e, i) {
                    i || (i = jt);
                    var o = e[i[0]] - t[i[0]], n = e[i[1]] - t[i[1]];
                    return Math.sqrt(o * o + n * n)
                }

                function F(t, e, i) {
                    i || (i = jt);
                    var o = e[i[0]] - t[i[0]], n = e[i[1]] - t[i[1]];
                    return 180 * Math.atan2(n, o) / Math.PI
                }

                function j(t, e) {
                    return F(e[1], e[0], Ht) - F(t[1], t[0], Ht)
                }

                function H(t, e) {
                    return R(e[0], e[1], Ht) / R(t[0], t[1], Ht)
                }

                function W() {
                    this.evEl = Yt, this.evWin = Gt, this.allow = !0, this.pressed = !1, T.apply(this, arguments)
                }

                function Y() {
                    this.evEl = qt, this.evWin = Xt, T.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
                }

                function G() {
                    this.evTarget = Kt, this.evWin = Jt, this.started = !1, T.apply(this, arguments)
                }

                function U(t, e) {
                    var i = k(t.touches), o = k(t.changedTouches);
                    return e & (Et | Pt) && (i = O(i.concat(o), "identifier", !0)), [i, o]
                }

                function V() {
                    this.evTarget = $t, this.targetIds = {}, T.apply(this, arguments)
                }

                function q(t, e) {
                    var i = k(t.touches), o = this.targetIds;
                    if (e & (Tt | St) && 1 === i.length)return o[i[0].identifier] = !0, [i, i];
                    var n, s, r = k(t.changedTouches), a = [], h = this.target;
                    if (s = i.filter(function (t) {
                            return b(t.target, h)
                        }), e === Tt)for (n = 0; n < s.length;)o[s[n].identifier] = !0, n++;
                    for (n = 0; n < r.length;)o[r[n].identifier] && a.push(r[n]), e & (Et | Pt) && delete o[r[n].identifier], n++;
                    return a.length ? [O(s.concat(a), "identifier", !0), a] : void 0
                }

                function X() {
                    T.apply(this, arguments);
                    var t = f(this.handler, this);
                    this.touch = new V(this.manager, t), this.mouse = new W(this.manager, t)
                }

                function Z(t, e) {
                    this.manager = t, this.set(e)
                }

                function K(t) {
                    if (w(t, se))return se;
                    var e = w(t, re), i = w(t, ae);
                    return e && i ? re + " " + ae : e || i ? e ? re : ae : w(t, ne) ? ne : oe
                }

                function J(t) {
                    this.id = D(), this.manager = null, this.options = c(t || {}, this.defaults), this.options.enable = v(this.options.enable, !0), this.state = he, this.simultaneous = {}, this.requireFail = []
                }

                function Q(t) {
                    return t & pe ? "cancel" : t & ue ? "end" : t & le ? "move" : t & de ? "start" : ""
                }

                function $(t) {
                    return t == Lt ? "down" : t == At ? "up" : t == zt ? "left" : t == Nt ? "right" : ""
                }

                function tt(t, e) {
                    var i = e.manager;
                    return i ? i.get(t) : t
                }

                function et() {
                    J.apply(this, arguments)
                }

                function it() {
                    et.apply(this, arguments), this.pX = null, this.pY = null
                }

                function ot() {
                    et.apply(this, arguments)
                }

                function nt() {
                    J.apply(this, arguments), this._timer = null, this._input = null
                }

                function st() {
                    et.apply(this, arguments)
                }

                function rt() {
                    et.apply(this, arguments)
                }

                function at() {
                    J.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
                }

                function ht(t, e) {
                    return e = e || {}, e.recognizers = v(e.recognizers, ht.defaults.preset), new dt(t, e)
                }

                function dt(t, e) {
                    e = e || {}, this.options = c(e, ht.defaults), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = t, this.input = S(this), this.touchAction = new Z(this, this.options.touchAction), lt(this, !0), l(e.recognizers, function (t) {
                        var e = this.add(new t[0](t[1]));
                        t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
                    }, this)
                }

                function lt(t, e) {
                    var i = t.element;
                    l(t.options.cssProps, function (t, o) {
                        i.style[M(i.style, o)] = e ? t : ""
                    })
                }

                function ut(t, e) {
                    var i = s.createEvent("Event");
                    i.initEvent(t, !0, !0), i.gesture = e, e.target.dispatchEvent(i)
                }

                var ct = ["", "webkit", "moz", "MS", "ms", "o"], pt = s.createElement("div"), ft = "function", mt = Math.round, vt = Math.abs, gt = Date.now, yt = 1, bt = /mobile|tablet|ip(ad|hone|od)|android/i, wt = "ontouchstart" in n, _t = M(n, "PointerEvent") !== a, xt = wt && bt.test(navigator.userAgent), kt = "touch", Ot = "pen", Mt = "mouse", Dt = "kinect", Ct = 25, Tt = 1, St = 2, Et = 4, Pt = 8, It = 1, zt = 2, Nt = 4, At = 8, Lt = 16, Bt = zt | Nt, Rt = At | Lt, Ft = Bt | Rt, jt = ["x", "y"], Ht = ["clientX", "clientY"];
                T.prototype = {
                    handler: function () {
                    }, init: function () {
                        this.evEl && g(this.element, this.evEl, this.domHandler), this.evTarget && g(this.target, this.evTarget, this.domHandler), this.evWin && g(C(this.element), this.evWin, this.domHandler)
                    }, destroy: function () {
                        this.evEl && y(this.element, this.evEl, this.domHandler), this.evTarget && y(this.target, this.evTarget, this.domHandler), this.evWin && y(C(this.element), this.evWin, this.domHandler)
                    }
                };
                var Wt = {mousedown: Tt, mousemove: St, mouseup: Et}, Yt = "mousedown", Gt = "mousemove mouseup";
                p(W, T, {
                    handler: function (t) {
                        var e = Wt[t.type];
                        e & Tt && 0 === t.button && (this.pressed = !0), e & St && 1 !== t.which && (e = Et), this.pressed && this.allow && (e & Et && (this.pressed = !1), this.callback(this.manager, e, {
                            pointers: [t],
                            changedPointers: [t],
                            pointerType: Mt,
                            srcEvent: t
                        }))
                    }
                });
                var Ut = {
                    pointerdown: Tt,
                    pointermove: St,
                    pointerup: Et,
                    pointercancel: Pt,
                    pointerout: Pt
                }, Vt = {2: kt, 3: Ot, 4: Mt, 5: Dt}, qt = "pointerdown", Xt = "pointermove pointerup pointercancel";
                n.MSPointerEvent && (qt = "MSPointerDown", Xt = "MSPointerMove MSPointerUp MSPointerCancel"), p(Y, T, {
                    handler: function (t) {
                        var e = this.store, i = !1, o = t.type.toLowerCase().replace("ms", ""), n = Ut[o], s = Vt[t.pointerType] || t.pointerType, r = s == kt, a = x(e, t.pointerId, "pointerId");
                        n & Tt && (0 === t.button || r) ? 0 > a && (e.push(t), a = e.length - 1) : n & (Et | Pt) && (i = !0), 0 > a || (e[a] = t, this.callback(this.manager, n, {
                            pointers: e,
                            changedPointers: [t],
                            pointerType: s,
                            srcEvent: t
                        }), i && e.splice(a, 1))
                    }
                });
                var Zt = {
                    touchstart: Tt,
                    touchmove: St,
                    touchend: Et,
                    touchcancel: Pt
                }, Kt = "touchstart", Jt = "touchstart touchmove touchend touchcancel";
                p(G, T, {
                    handler: function (t) {
                        var e = Zt[t.type];
                        if (e === Tt && (this.started = !0), this.started) {
                            var i = U.call(this, t, e);
                            e & (Et | Pt) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
                                pointers: i[0],
                                changedPointers: i[1],
                                pointerType: kt,
                                srcEvent: t
                            })
                        }
                    }
                });
                var Qt = {
                    touchstart: Tt,
                    touchmove: St,
                    touchend: Et,
                    touchcancel: Pt
                }, $t = "touchstart touchmove touchend touchcancel";
                p(V, T, {
                    handler: function (t) {
                        var e = Qt[t.type], i = q.call(this, t, e);
                        i && this.callback(this.manager, e, {
                            pointers: i[0],
                            changedPointers: i[1],
                            pointerType: kt,
                            srcEvent: t
                        })
                    }
                }), p(X, T, {
                    handler: function (t, e, i) {
                        var o = i.pointerType == kt, n = i.pointerType == Mt;
                        if (o) this.mouse.allow = !1; else if (n && !this.mouse.allow)return;
                        e & (Et | Pt) && (this.mouse.allow = !0), this.callback(t, e, i)
                    }, destroy: function () {
                        this.touch.destroy(), this.mouse.destroy()
                    }
                });
                var te = M(pt.style, "touchAction"), ee = te !== a, ie = "compute", oe = "auto", ne = "manipulation", se = "none", re = "pan-x", ae = "pan-y";
                Z.prototype = {
                    set: function (t) {
                        t == ie && (t = this.compute()), ee && (this.manager.element.style[te] = t), this.actions = t.toLowerCase().trim()
                    }, update: function () {
                        this.set(this.manager.options.touchAction)
                    }, compute: function () {
                        var t = [];
                        return l(this.manager.recognizers, function (e) {
                            m(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                        }), K(t.join(" "))
                    }, preventDefaults: function (t) {
                        if (!ee) {
                            var e = t.srcEvent, i = t.offsetDirection;
                            if (this.manager.session.prevented)return void e.preventDefault();
                            var o = this.actions, n = w(o, se), s = w(o, ae), r = w(o, re);
                            return n || s && i & Bt || r && i & Rt ? this.preventSrc(e) : void 0
                        }
                    }, preventSrc: function (t) {
                        this.manager.session.prevented = !0, t.preventDefault()
                    }
                };
                var he = 1, de = 2, le = 4, ue = 8, ce = ue, pe = 16, fe = 32;
                J.prototype = {
                    defaults: {}, set: function (t) {
                        return u(this.options, t), this.manager && this.manager.touchAction.update(), this
                    }, recognizeWith: function (t) {
                        if (d(t, "recognizeWith", this))return this;
                        var e = this.simultaneous;
                        return t = tt(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
                    }, dropRecognizeWith: function (t) {
                        return d(t, "dropRecognizeWith", this) ? this : (t = tt(t, this), delete this.simultaneous[t.id], this)
                    }, requireFailure: function (t) {
                        if (d(t, "requireFailure", this))return this;
                        var e = this.requireFail;
                        return t = tt(t, this), -1 === x(e, t) && (e.push(t), t.requireFailure(this)), this
                    }, dropRequireFailure: function (t) {
                        if (d(t, "dropRequireFailure", this))return this;
                        t = tt(t, this);
                        var e = x(this.requireFail, t);
                        return e > -1 && this.requireFail.splice(e, 1), this
                    }, hasRequireFailures: function () {
                        return this.requireFail.length > 0
                    }, canRecognizeWith: function (t) {
                        return !!this.simultaneous[t.id]
                    }, emit: function (t) {
                        function e(e) {
                            i.manager.emit(i.options.event + (e ? Q(o) : ""), t)
                        }

                        var i = this, o = this.state;
                        ue > o && e(!0), e(), o >= ue && e(!0)
                    }, tryEmit: function (t) {
                        return this.canEmit() ? this.emit(t) : void(this.state = fe)
                    }, canEmit: function () {
                        for (var t = 0; t < this.requireFail.length;) {
                            if (!(this.requireFail[t].state & (fe | he)))return !1;
                            t++
                        }
                        return !0
                    }, recognize: function (t) {
                        var e = u({}, t);
                        return m(this.options.enable, [this, e]) ? (this.state & (ce | pe | fe) && (this.state = he), this.state = this.process(e), void(this.state & (de | le | ue | pe) && this.tryEmit(e))) : (this.reset(), void(this.state = fe))
                    }, process: function (t) {
                    }, getTouchAction: function () {
                    }, reset: function () {
                    }
                }, p(et, J, {
                    defaults: {pointers: 1}, attrTest: function (t) {
                        var e = this.options.pointers;
                        return 0 === e || t.pointers.length === e
                    }, process: function (t) {
                        var e = this.state, i = t.eventType, o = e & (de | le), n = this.attrTest(t);
                        return o && (i & Pt || !n) ? e | pe : o || n ? i & Et ? e | ue : e & de ? e | le : de : fe
                    }
                }), p(it, et, {
                    defaults: {event: "pan", threshold: 10, pointers: 1, direction: Ft}, getTouchAction: function () {
                        var t = this.options.direction, e = [];
                        return t & Bt && e.push(ae), t & Rt && e.push(re), e
                    }, directionTest: function (t) {
                        var e = this.options, i = !0, o = t.distance, n = t.direction, s = t.deltaX, r = t.deltaY;
                        return n & e.direction || (e.direction & Bt ? (n = 0 === s ? It : 0 > s ? zt : Nt, i = s != this.pX, o = Math.abs(t.deltaX)) : (n = 0 === r ? It : 0 > r ? At : Lt, i = r != this.pY, o = Math.abs(t.deltaY))), t.direction = n, i && o > e.threshold && n & e.direction
                    }, attrTest: function (t) {
                        return et.prototype.attrTest.call(this, t) && (this.state & de || !(this.state & de) && this.directionTest(t))
                    }, emit: function (t) {
                        this.pX = t.deltaX, this.pY = t.deltaY;
                        var e = $(t.direction);
                        e && this.manager.emit(this.options.event + e, t), this._super.emit.call(this, t)
                    }
                }), p(ot, et, {
                    defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function () {
                        return [se]
                    }, attrTest: function (t) {
                        return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & de)
                    }, emit: function (t) {
                        if (this._super.emit.call(this, t), 1 !== t.scale) {
                            var e = t.scale < 1 ? "in" : "out";
                            this.manager.emit(this.options.event + e, t)
                        }
                    }
                }), p(nt, J, {
                    defaults: {event: "press", pointers: 1, time: 500, threshold: 5}, getTouchAction: function () {
                        return [oe]
                    }, process: function (t) {
                        var e = this.options, i = t.pointers.length === e.pointers, o = t.distance < e.threshold, n = t.deltaTime > e.time;
                        if (this._input = t, !o || !i || t.eventType & (Et | Pt) && !n) this.reset(); else if (t.eventType & Tt) this.reset(), this._timer = h(function () {
                            this.state = ce, this.tryEmit()
                        }, e.time, this); else if (t.eventType & Et)return ce;
                        return fe
                    }, reset: function () {
                        clearTimeout(this._timer)
                    }, emit: function (t) {
                        this.state === ce && (t && t.eventType & Et ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = gt(), this.manager.emit(this.options.event, this._input)))
                    }
                }), p(st, et, {
                    defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function () {
                        return [se]
                    }, attrTest: function (t) {
                        return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & de)
                    }
                }), p(rt, et, {
                    defaults: {event: "swipe", threshold: 10, velocity: .65, direction: Bt | Rt, pointers: 1},
                    getTouchAction: function () {
                        return it.prototype.getTouchAction.call(this)
                    },
                    attrTest: function (t) {
                        var e, i = this.options.direction;
                        return i & (Bt | Rt) ? e = t.velocity : i & Bt ? e = t.velocityX : i & Rt && (e = t.velocityY), this._super.attrTest.call(this, t) && i & t.direction && t.distance > this.options.threshold && vt(e) > this.options.velocity && t.eventType & Et
                    },
                    emit: function (t) {
                        var e = $(t.direction);
                        e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
                    }
                }), p(at, J, {
                    defaults: {
                        event: "tap",
                        pointers: 1,
                        taps: 1,
                        interval: 300,
                        time: 250,
                        threshold: 2,
                        posThreshold: 10
                    }, getTouchAction: function () {
                        return [ne]
                    }, process: function (t) {
                        var e = this.options, i = t.pointers.length === e.pointers, o = t.distance < e.threshold, n = t.deltaTime < e.time;
                        if (this.reset(), t.eventType & Tt && 0 === this.count)return this.failTimeout();
                        if (o && n && i) {
                            if (t.eventType != Et)return this.failTimeout();
                            var s = this.pTime ? t.timeStamp - this.pTime < e.interval : !0, r = !this.pCenter || R(this.pCenter, t.center) < e.posThreshold;
                            this.pTime = t.timeStamp, this.pCenter = t.center, r && s ? this.count += 1 : this.count = 1, this._input = t;
                            var a = this.count % e.taps;
                            if (0 === a)return this.hasRequireFailures() ? (this._timer = h(function () {
                                    this.state = ce, this.tryEmit()
                                }, e.interval, this), de) : ce
                        }
                        return fe
                    }, failTimeout: function () {
                        return this._timer = h(function () {
                            this.state = fe
                        }, this.options.interval, this), fe
                    }, reset: function () {
                        clearTimeout(this._timer)
                    }, emit: function () {
                        this.state == ce && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                    }
                }), ht.VERSION = "2.0.4", ht.defaults = {
                    domEvents: !1,
                    touchAction: ie,
                    enable: !0,
                    inputTarget: null,
                    inputClass: null,
                    preset: [
                        [st, {enable: !1}],
                        [ot, {enable: !1}, ["rotate"]],
                        [rt, {direction: Bt}],
                        [it, {direction: Bt}, ["swipe"]],
                        [at],
                        [at, {event: "doubletap", taps: 2}, ["tap"]],
                        [nt]
                    ],
                    cssProps: {
                        userSelect: "none",
                        touchSelect: "none",
                        touchCallout: "none",
                        contentZooming: "none",
                        userDrag: "none",
                        tapHighlightColor: "rgba(0,0,0,0)"
                    }
                };
                var me = 1, ve = 2;
                dt.prototype = {
                    set: function (t) {
                        return u(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
                    }, stop: function (t) {
                        this.session.stopped = t ? ve : me
                    }, recognize: function (t) {
                        var e = this.session;
                        if (!e.stopped) {
                            this.touchAction.preventDefaults(t);
                            var i, o = this.recognizers, n = e.curRecognizer;
                            (!n || n && n.state & ce) && (n = e.curRecognizer = null);
                            for (var s = 0; s < o.length;)i = o[s], e.stopped === ve || n && i != n && !i.canRecognizeWith(n) ? i.reset() : i.recognize(t), !n && i.state & (de | le | ue) && (n = e.curRecognizer = i), s++
                        }
                    }, get: function (t) {
                        if (t instanceof J)return t;
                        for (var e = this.recognizers, i = 0; i < e.length; i++)if (e[i].options.event == t)return e[i];
                        return null
                    }, add: function (t) {
                        if (d(t, "add", this))return this;
                        var e = this.get(t.options.event);
                        return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
                    }, remove: function (t) {
                        if (d(t, "remove", this))return this;
                        var e = this.recognizers;
                        return t = this.get(t), e.splice(x(e, t), 1), this.touchAction.update(), this
                    }, on: function (t, e) {
                        var i = this.handlers;
                        return l(_(t), function (t) {
                            i[t] = i[t] || [], i[t].push(e)
                        }), this
                    }, off: function (t, e) {
                        var i = this.handlers;
                        return l(_(t), function (t) {
                            e ? i[t].splice(x(i[t], e), 1) : delete i[t]
                        }), this
                    }, emit: function (t, e) {
                        this.options.domEvents && ut(t, e);
                        var i = this.handlers[t] && this.handlers[t].slice();
                        if (i && i.length) {
                            e.type = t, e.preventDefault = function () {
                                e.srcEvent.preventDefault()
                            };
                            for (var o = 0; o < i.length;)i[o](e), o++
                        }
                    }, destroy: function () {
                        this.element && lt(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                    }
                }, u(ht, {
                    INPUT_START: Tt,
                    INPUT_MOVE: St,
                    INPUT_END: Et,
                    INPUT_CANCEL: Pt,
                    STATE_POSSIBLE: he,
                    STATE_BEGAN: de,
                    STATE_CHANGED: le,
                    STATE_ENDED: ue,
                    STATE_RECOGNIZED: ce,
                    STATE_CANCELLED: pe,
                    STATE_FAILED: fe,
                    DIRECTION_NONE: It,
                    DIRECTION_LEFT: zt,
                    DIRECTION_RIGHT: Nt,
                    DIRECTION_UP: At,
                    DIRECTION_DOWN: Lt,
                    DIRECTION_HORIZONTAL: Bt,
                    DIRECTION_VERTICAL: Rt,
                    DIRECTION_ALL: Ft,
                    Manager: dt,
                    Input: T,
                    TouchAction: Z,
                    TouchInput: V,
                    MouseInput: W,
                    PointerEventInput: Y,
                    TouchMouseInput: X,
                    SingleTouchInput: G,
                    Recognizer: J,
                    AttrRecognizer: et,
                    Tap: at,
                    Pan: it,
                    Swipe: rt,
                    Pinch: ot,
                    Rotate: st,
                    Press: nt,
                    on: g,
                    off: y,
                    each: l,
                    merge: c,
                    extend: u,
                    inherit: p,
                    bindFn: f,
                    prefixed: M
                }), "function" == ft && i(6) ? (o = function () {
                        return ht
                    }.call(e, i, e, t), !(o !== a && (t.exports = o))) : "undefined" != typeof t && t.exports ? t.exports = ht : n[r] = ht
            }(window, document, "Hammer")
        },
        function (t, e) {
            (function (e) {
                t.exports = e
            }).call(e, {})
        },
        function (t, e, i) {
            var o = i(8), n = i(12);
            e.isNumber = function (t) {
                return t instanceof Number || "number" == typeof t
            }, e.recursiveDOMDelete = function (t) {
                if (t)for (; t.hasChildNodes() === !0;)e.recursiveDOMDelete(t.firstChild), t.removeChild(t.firstChild)
            }, e.giveRange = function (t, e, i, o) {
                if (e == t)return .5;
                var n = 1 / (e - t);
                return Math.max(0, (o - t) * n)
            }, e.isString = function (t) {
                return t instanceof String || "string" == typeof t
            }, e.isDate = function (t) {
                if (t instanceof Date)return !0;
                if (e.isString(t)) {
                    var i = s.exec(t);
                    if (i)return !0;
                    if (!isNaN(Date.parse(t)))return !0
                }
                return !1
            }, e.randomUUID = function () {
                return n.v4()
            }, e.assignAllKeys = function (t, e) {
                for (var i in t)t.hasOwnProperty(i) && "object" != typeof t[i] && (t[i] = e)
            }, e.fillIfDefined = function (t, i) {
                var o = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2];
                for (var n in t)void 0 !== i[n] && ("object" != typeof i[n] ? void 0 !== i[n] && null !== i[n] || void 0 === t[n] || o !== !0 ? t[n] = i[n] : delete t[n] : "object" == typeof t[n] && e.fillIfDefined(t[n], i[n], o))
            }, e.protoExtend = function (t, e) {
                for (var i = 1; i < arguments.length; i++) {
                    var o = arguments[i];
                    for (var n in o)t[n] = o[n]
                }
                return t
            }, e.extend = function (t, e) {
                for (var i = 1; i < arguments.length; i++) {
                    var o = arguments[i];
                    for (var n in o)o.hasOwnProperty(n) && (t[n] = o[n])
                }
                return t
            }, e.selectiveExtend = function (t, e, i) {
                if (!Array.isArray(t))throw new Error("Array with property names expected as first argument");
                for (var o = 2; o < arguments.length; o++)for (var n = arguments[o], s = 0; s < t.length; s++) {
                    var r = t[s];
                    n.hasOwnProperty(r) && (e[r] = n[r])
                }
                return e
            }, e.selectiveDeepExtend = function (t, i, o) {
                var n = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
                if (Array.isArray(o))throw new TypeError("Arrays are not supported by deepExtend");
                for (var s = 2; s < arguments.length; s++)for (var r = arguments[s], a = 0; a < t.length; a++) {
                    var h = t[a];
                    if (r.hasOwnProperty(h))if (o[h] && o[h].constructor === Object) void 0 === i[h] && (i[h] = {}), i[h].constructor === Object ? e.deepExtend(i[h], o[h], !1, n) : null === o[h] && void 0 !== i[h] && n === !0 ? delete i[h] : i[h] = o[h]; else {
                        if (Array.isArray(o[h]))throw new TypeError("Arrays are not supported by deepExtend");
                        i[h] = o[h]
                    }
                }
                return i
            }, e.selectiveNotDeepExtend = function (t, i, o) {
                var n = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
                if (Array.isArray(o))throw new TypeError("Arrays are not supported by deepExtend");
                for (var s in o)if (o.hasOwnProperty(s) && -1 == t.indexOf(s))if (o[s] && o[s].constructor === Object) void 0 === i[s] && (i[s] = {}), i[s].constructor === Object ? e.deepExtend(i[s], o[s]) : null === o[s] && void 0 !== i[s] && n === !0 ? delete i[s] : i[s] = o[s]; else if (Array.isArray(o[s])) {
                    i[s] = [];
                    for (var r = 0; r < o[s].length; r++)i[s].push(o[s][r])
                } else i[s] = o[s];
                return i
            }, e.deepExtend = function (t, i, o, n) {
                for (var s in i)if (i.hasOwnProperty(s) || o === !0)if (i[s] && i[s].constructor === Object) void 0 === t[s] && (t[s] = {}), t[s].constructor === Object ? e.deepExtend(t[s], i[s], o) : null === i[s] && void 0 !== t[s] && n === !0 ? delete t[s] : t[s] = i[s]; else if (Array.isArray(i[s])) {
                    t[s] = [];
                    for (var r = 0; r < i[s].length; r++)t[s].push(i[s][r])
                } else t[s] = i[s];
                return t
            }, e.equalArray = function (t, e) {
                if (t.length != e.length)return !1;
                for (var i = 0, o = t.length; o > i; i++)if (t[i] != e[i])return !1;
                return !0
            }, e.convert = function (t, i) {
                var n;
                if (void 0 === t)return void 0;
                if (null === t)return null;
                if (!i)return t;
                if ("string" != typeof i && !(i instanceof String))throw new Error("Type must be a string");
                switch (i) {
                    case"boolean":
                    case"Boolean":
                        return Boolean(t);
                    case"number":
                    case"Number":
                        return Number(t.valueOf());
                    case"string":
                    case"String":
                        return String(t);
                    case"Date":
                        if (e.isNumber(t))return new Date(t);
                        if (t instanceof Date)return new Date(t.valueOf());
                        if (o.isMoment(t))return new Date(t.valueOf());
                        if (e.isString(t))return n = s.exec(t), n ? new Date(Number(n[1])) : o(t).toDate();
                        throw new Error("Cannot convert object of type " + e.getType(t) + " to type Date");
                    case"Moment":
                        if (e.isNumber(t))return o(t);
                        if (t instanceof Date)return o(t.valueOf());
                        if (o.isMoment(t))return o(t);
                        if (e.isString(t))return n = s.exec(t), o(n ? Number(n[1]) : t);
                        throw new Error("Cannot convert object of type " + e.getType(t) + " to type Date");
                    case"ISODate":
                        if (e.isNumber(t))return new Date(t);
                        if (t instanceof Date)return t.toISOString();
                        if (o.isMoment(t))return t.toDate().toISOString();
                        if (e.isString(t))return n = s.exec(t), n ? new Date(Number(n[1])).toISOString() : new Date(t).toISOString();
                        throw new Error("Cannot convert object of type " + e.getType(t) + " to type ISODate");
                    case"ASPDate":
                        if (e.isNumber(t))return "/Date(" + t + ")/";
                        if (t instanceof Date)return "/Date(" + t.valueOf() + ")/";
                        if (e.isString(t)) {
                            n = s.exec(t);
                            var r;
                            return r = n ? new Date(Number(n[1])).valueOf() : new Date(t).valueOf(), "/Date(" + r + ")/"
                        }
                        throw new Error("Cannot convert object of type " + e.getType(t) + " to type ASPDate");
                    default:
                        throw new Error('Unknown type "' + i + '"')
                }
            };
            var s = /^\/?Date\((\-?\d+)/i;
            e.getType = function (t) {
                var e = typeof t;
                return "object" == e ? null === t ? "null" : t instanceof Boolean ? "Boolean" : t instanceof Number ? "Number" : t instanceof String ? "String" : Array.isArray(t) ? "Array" : t instanceof Date ? "Date" : "Object" : "number" == e ? "Number" : "boolean" == e ? "Boolean" : "string" == e ? "String" : void 0 === e ? "undefined" : e;
            }, e.copyAndExtendArray = function (t, e) {
                for (var i = [], o = 0; o < t.length; o++)i.push(t[o]);
                return i.push(e), i
            }, e.copyArray = function (t) {
                for (var e = [], i = 0; i < t.length; i++)e.push(t[i]);
                return e
            }, e.getAbsoluteLeft = function (t) {
                return t.getBoundingClientRect().left
            }, e.getAbsoluteTop = function (t) {
                return t.getBoundingClientRect().top
            }, e.addClassName = function (t, e) {
                var i = t.className.split(" ");
                -1 == i.indexOf(e) && (i.push(e), t.className = i.join(" "))
            }, e.removeClassName = function (t, e) {
                var i = t.className.split(" "), o = i.indexOf(e);
                -1 != o && (i.splice(o, 1), t.className = i.join(" "))
            }, e.forEach = function (t, e) {
                var i, o;
                if (Array.isArray(t))for (i = 0, o = t.length; o > i; i++)e(t[i], i, t); else for (i in t)t.hasOwnProperty(i) && e(t[i], i, t)
            }, e.toArray = function (t) {
                var e = [];
                for (var i in t)t.hasOwnProperty(i) && e.push(t[i]);
                return e
            }, e.updateProperty = function (t, e, i) {
                return t[e] !== i ? (t[e] = i, !0) : !1
            }, e.addEventListener = function (t, e, i, o) {
                t.addEventListener ? (void 0 === o && (o = !1), "mousewheel" === e && navigator.userAgent.indexOf("Firefox") >= 0 && (e = "DOMMouseScroll"), t.addEventListener(e, i, o)) : t.attachEvent("on" + e, i)
            }, e.removeEventListener = function (t, e, i, o) {
                t.removeEventListener ? (void 0 === o && (o = !1), "mousewheel" === e && navigator.userAgent.indexOf("Firefox") >= 0 && (e = "DOMMouseScroll"), t.removeEventListener(e, i, o)) : t.detachEvent("on" + e, i)
            }, e.preventDefault = function (t) {
                t || (t = window.event), t.preventDefault ? t.preventDefault() : t.returnValue = !1
            }, e.getTarget = function (t) {
                t || (t = window.event);
                var e;
                return t.target ? e = t.target : t.srcElement && (e = t.srcElement), void 0 != e.nodeType && 3 == e.nodeType && (e = e.parentNode), e
            }, e.hasParent = function (t, e) {
                for (var i = t; i;) {
                    if (i === e)return !0;
                    i = i.parentNode
                }
                return !1
            }, e.option = {}, e.option.asBoolean = function (t, e) {
                return "function" == typeof t && (t = t()), null != t ? 0 != t : e || null
            }, e.option.asNumber = function (t, e) {
                return "function" == typeof t && (t = t()), null != t ? Number(t) || e || null : e || null
            }, e.option.asString = function (t, e) {
                return "function" == typeof t && (t = t()), null != t ? String(t) : e || null
            }, e.option.asSize = function (t, i) {
                return "function" == typeof t && (t = t()), e.isString(t) ? t : e.isNumber(t) ? t + "px" : i || null
            }, e.option.asElement = function (t, e) {
                return "function" == typeof t && (t = t()), t || e || null
            }, e.hexToRGB = function (t) {
                var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                t = t.replace(e, function (t, e, i, o) {
                    return e + e + i + i + o + o
                });
                var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                return i ? {r: parseInt(i[1], 16), g: parseInt(i[2], 16), b: parseInt(i[3], 16)} : null
            }, e.overrideOpacity = function (t, i) {
                if (-1 != t.indexOf("rgba"))return t;
                if (-1 != t.indexOf("rgb")) {
                    var o = t.substr(t.indexOf("(") + 1).replace(")", "").split(",");
                    return "rgba(" + o[0] + "," + o[1] + "," + o[2] + "," + i + ")"
                }
                var o = e.hexToRGB(t);
                return null == o ? t : "rgba(" + o.r + "," + o.g + "," + o.b + "," + i + ")"
            }, e.RGBToHex = function (t, e, i) {
                return "#" + ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
            }, e.parseColor = function (t) {
                var i;
                if (e.isString(t) === !0) {
                    if (e.isValidRGB(t) === !0) {
                        var o = t.substr(4).substr(0, t.length - 5).split(",").map(function (t) {
                            return parseInt(t)
                        });
                        t = e.RGBToHex(o[0], o[1], o[2])
                    }
                    if (e.isValidHex(t) === !0) {
                        var n = e.hexToHSV(t), s = {h: n.h, s: .8 * n.s, v: Math.min(1, 1.02 * n.v)}, r = {
                            h: n.h,
                            s: Math.min(1, 1.25 * n.s),
                            v: .8 * n.v
                        }, a = e.HSVToHex(r.h, r.s, r.v), h = e.HSVToHex(s.h, s.s, s.v);
                        i = {
                            background: t,
                            border: a,
                            highlight: {background: h, border: a},
                            hover: {background: h, border: a}
                        }
                    } else i = {
                        background: t,
                        border: t,
                        highlight: {background: t, border: t},
                        hover: {background: t, border: t}
                    }
                } else i = {}, i.background = t.background || void 0, i.border = t.border || void 0, e.isString(t.highlight) ? i.highlight = {
                        border: t.highlight,
                        background: t.highlight
                    } : (i.highlight = {}, i.highlight.background = t.highlight && t.highlight.background || void 0, i.highlight.border = t.highlight && t.highlight.border || void 0), e.isString(t.hover) ? i.hover = {
                        border: t.hover,
                        background: t.hover
                    } : (i.hover = {}, i.hover.background = t.hover && t.hover.background || void 0, i.hover.border = t.hover && t.hover.border || void 0);
                return i
            }, e.RGBToHSV = function (t, e, i) {
                t /= 255, e /= 255, i /= 255;
                var o = Math.min(t, Math.min(e, i)), n = Math.max(t, Math.max(e, i));
                if (o == n)return {h: 0, s: 0, v: o};
                var s = t == o ? e - i : i == o ? t - e : i - t, r = t == o ? 3 : i == o ? 1 : 5, a = 60 * (r - s / (n - o)) / 360, h = (n - o) / n, d = n;
                return {h: a, s: h, v: d}
            };
            var r = {
                split: function (t) {
                    var e = {};
                    return t.split(";").forEach(function (t) {
                        if ("" != t.trim()) {
                            var i = t.split(":"), o = i[0].trim(), n = i[1].trim();
                            e[o] = n
                        }
                    }), e
                }, join: function (t) {
                    return Object.keys(t).map(function (e) {
                        return e + ": " + t[e]
                    }).join("; ")
                }
            };
            e.addCssText = function (t, i) {
                var o = r.split(t.style.cssText), n = r.split(i), s = e.extend(o, n);
                t.style.cssText = r.join(s)
            }, e.removeCssText = function (t, e) {
                var i = r.split(t.style.cssText), o = r.split(e);
                for (var n in o)o.hasOwnProperty(n) && delete i[n];
                t.style.cssText = r.join(i)
            }, e.HSVToRGB = function (t, e, i) {
                var o, n, s, r = Math.floor(6 * t), a = 6 * t - r, h = i * (1 - e), d = i * (1 - a * e), l = i * (1 - (1 - a) * e);
                switch (r % 6) {
                    case 0:
                        o = i, n = l, s = h;
                        break;
                    case 1:
                        o = d, n = i, s = h;
                        break;
                    case 2:
                        o = h, n = i, s = l;
                        break;
                    case 3:
                        o = h, n = d, s = i;
                        break;
                    case 4:
                        o = l, n = h, s = i;
                        break;
                    case 5:
                        o = i, n = h, s = d
                }
                return {r: Math.floor(255 * o), g: Math.floor(255 * n), b: Math.floor(255 * s)}
            }, e.HSVToHex = function (t, i, o) {
                var n = e.HSVToRGB(t, i, o);
                return e.RGBToHex(n.r, n.g, n.b)
            }, e.hexToHSV = function (t) {
                var i = e.hexToRGB(t);
                return e.RGBToHSV(i.r, i.g, i.b)
            }, e.isValidHex = function (t) {
                var e = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
                return e
            }, e.isValidRGB = function (t) {
                t = t.replace(" ", "");
                var e = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(t);
                return e
            }, e.isValidRGBA = function (t) {
                t = t.replace(" ", "");
                var e = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(.{1,3})\)/i.test(t);
                return e
            }, e.selectiveBridgeObject = function (t, i) {
                if ("object" == typeof i) {
                    for (var o = Object.create(i), n = 0; n < t.length; n++)i.hasOwnProperty(t[n]) && "object" == typeof i[t[n]] && (o[t[n]] = e.bridgeObject(i[t[n]]));
                    return o
                }
                return null
            }, e.bridgeObject = function (t) {
                if ("object" == typeof t) {
                    var i = Object.create(t);
                    for (var o in t)t.hasOwnProperty(o) && "object" == typeof t[o] && (i[o] = e.bridgeObject(t[o]));
                    return i
                }
                return null
            }, e.mergeOptions = function (t, e, i) {
                arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3];
                if (null === e[i]) t[i] = void 0, delete t[i]; else if (void 0 !== e[i])if ("boolean" == typeof e[i]) t[i].enabled = e[i]; else {
                    void 0 === e[i].enabled && (t[i].enabled = !0);
                    for (var o in e[i])e[i].hasOwnProperty(o) && (t[i][o] = e[i][o])
                }
            }, e.binarySearchCustom = function (t, e, i, o) {
                for (var n = 1e4, s = 0, r = 0, a = t.length - 1; a >= r && n > s;) {
                    var h = Math.floor((r + a) / 2), d = t[h], l = void 0 === o ? d[i] : d[i][o], u = e(l);
                    if (0 == u)return h;
                    -1 == u ? r = h + 1 : a = h - 1, s++
                }
                return -1
            }, e.binarySearchValue = function (t, e, i, o) {
                for (var n, s, r, a, h = 1e4, d = 0, l = 0, u = t.length - 1; u >= l && h > d;) {
                    if (a = Math.floor(.5 * (u + l)), n = t[Math.max(0, a - 1)][i], s = t[a][i], r = t[Math.min(t.length - 1, a + 1)][i], s == e)return a;
                    if (e > n && s > e)return "before" == o ? Math.max(0, a - 1) : a;
                    if (e > s && r > e)return "before" == o ? a : Math.min(t.length - 1, a + 1);
                    e > s ? l = a + 1 : u = a - 1, d++
                }
                return -1
            }, e.easingFunctions = {
                linear: function (t) {
                    return t
                }, easeInQuad: function (t) {
                    return t * t
                }, easeOutQuad: function (t) {
                    return t * (2 - t)
                }, easeInOutQuad: function (t) {
                    return .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t
                }, easeInCubic: function (t) {
                    return t * t * t
                }, easeOutCubic: function (t) {
                    return --t * t * t + 1
                }, easeInOutCubic: function (t) {
                    return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                }, easeInQuart: function (t) {
                    return t * t * t * t
                }, easeOutQuart: function (t) {
                    return 1 - --t * t * t * t
                }, easeInOutQuart: function (t) {
                    return .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
                }, easeInQuint: function (t) {
                    return t * t * t * t * t
                }, easeOutQuint: function (t) {
                    return 1 + --t * t * t * t * t
                }, easeInOutQuint: function (t) {
                    return .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
                }
            }
        },
        function (t, e, i) {
            t.exports = "undefined" != typeof window && window.moment || i(9)
        },
        function (t, e, i) {
            (function (t) {
                !function (e, i) {
                    t.exports = i()
                }(this, function () {
                    function e() {
                        return Ni.apply(null, arguments)
                    }

                    function i(t) {
                        Ni = t
                    }

                    function o(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    }

                    function n(t) {
                        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
                    }

                    function s(t, e) {
                        var i, o = [];
                        for (i = 0; i < t.length; ++i)o.push(e(t[i], i));
                        return o
                    }

                    function r(t, e) {
                        return Object.prototype.hasOwnProperty.call(t, e)
                    }

                    function a(t, e) {
                        for (var i in e)r(e, i) && (t[i] = e[i]);
                        return r(e, "toString") && (t.toString = e.toString), r(e, "valueOf") && (t.valueOf = e.valueOf), t
                    }

                    function h(t, e, i, o) {
                        return St(t, e, i, o, !0).utc()
                    }

                    function d() {
                        return {
                            empty: !1,
                            unusedTokens: [],
                            unusedInput: [],
                            overflow: -2,
                            charsLeftOver: 0,
                            nullInput: !1,
                            invalidMonth: null,
                            invalidFormat: !1,
                            userInvalidated: !1,
                            iso: !1
                        }
                    }

                    function l(t) {
                        return null == t._pf && (t._pf = d()), t._pf
                    }

                    function u(t) {
                        if (null == t._isValid) {
                            var e = l(t);
                            t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated), t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour)
                        }
                        return t._isValid
                    }

                    function c(t) {
                        var e = h(NaN);
                        return null != t ? a(l(e), t) : l(e).userInvalidated = !0, e
                    }

                    function p(t, e) {
                        var i, o, n;
                        if ("undefined" != typeof e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), "undefined" != typeof e._i && (t._i = e._i), "undefined" != typeof e._f && (t._f = e._f), "undefined" != typeof e._l && (t._l = e._l), "undefined" != typeof e._strict && (t._strict = e._strict), "undefined" != typeof e._tzm && (t._tzm = e._tzm), "undefined" != typeof e._isUTC && (t._isUTC = e._isUTC), "undefined" != typeof e._offset && (t._offset = e._offset), "undefined" != typeof e._pf && (t._pf = l(e)), "undefined" != typeof e._locale && (t._locale = e._locale), Li.length > 0)for (i in Li)o = Li[i], n = e[o], "undefined" != typeof n && (t[o] = n);
                        return t
                    }

                    function f(t) {
                        p(this, t), this._d = new Date(t._d.getTime()), Bi === !1 && (Bi = !0, e.updateOffset(this), Bi = !1)
                    }

                    function m(t) {
                        return t instanceof f || null != t && null != t._isAMomentObject
                    }

                    function v(t) {
                        return 0 > t ? Math.ceil(t) : Math.floor(t)
                    }

                    function g(t) {
                        var e = +t, i = 0;
                        return 0 !== e && isFinite(e) && (i = v(e)), i
                    }

                    function y(t, e, i) {
                        var o, n = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), r = 0;
                        for (o = 0; n > o; o++)(i && t[o] !== e[o] || !i && g(t[o]) !== g(e[o])) && r++;
                        return r + s
                    }

                    function b() {
                    }

                    function w(t) {
                        return t ? t.toLowerCase().replace("_", "-") : t
                    }

                    function _(t) {
                        for (var e, i, o, n, s = 0; s < t.length;) {
                            for (n = w(t[s]).split("-"), e = n.length, i = w(t[s + 1]), i = i ? i.split("-") : null; e > 0;) {
                                if (o = x(n.slice(0, e).join("-")))return o;
                                if (i && i.length >= e && y(n, i, !0) >= e - 1)break;
                                e--
                            }
                            s++
                        }
                        return null
                    }

                    function x(e) {
                        var i = null;
                        if (!Ri[e] && "undefined" != typeof t && t && t.exports)try {
                            i = Ai._abbr, !function () {
                                var t = new Error('Cannot find module "./locale"');
                                throw t.code = "MODULE_NOT_FOUND", t
                            }(), k(i)
                        } catch (o) {
                        }
                        return Ri[e]
                    }

                    function k(t, e) {
                        var i;
                        return t && (i = "undefined" == typeof e ? M(t) : O(t, e), i && (Ai = i)), Ai._abbr
                    }

                    function O(t, e) {
                        return null !== e ? (e.abbr = t, Ri[t] = Ri[t] || new b, Ri[t].set(e), k(t), Ri[t]) : (delete Ri[t], null)
                    }

                    function M(t) {
                        var e;
                        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)return Ai;
                        if (!o(t)) {
                            if (e = x(t))return e;
                            t = [t]
                        }
                        return _(t)
                    }

                    function D(t, e) {
                        var i = t.toLowerCase();
                        Fi[i] = Fi[i + "s"] = Fi[e] = t
                    }

                    function C(t) {
                        return "string" == typeof t ? Fi[t] || Fi[t.toLowerCase()] : void 0
                    }

                    function T(t) {
                        var e, i, o = {};
                        for (i in t)r(t, i) && (e = C(i), e && (o[e] = t[i]));
                        return o
                    }

                    function S(t, i) {
                        return function (o) {
                            return null != o ? (P(this, t, o), e.updateOffset(this, i), this) : E(this, t)
                        }
                    }

                    function E(t, e) {
                        return t._d["get" + (t._isUTC ? "UTC" : "") + e]()
                    }

                    function P(t, e, i) {
                        return t._d["set" + (t._isUTC ? "UTC" : "") + e](i)
                    }

                    function I(t, e) {
                        var i;
                        if ("object" == typeof t)for (i in t)this.set(i, t[i]); else if (t = C(t), "function" == typeof this[t])return this[t](e);
                        return this
                    }

                    function z(t, e, i) {
                        var o = "" + Math.abs(t), n = e - o.length, s = t >= 0;
                        return (s ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, n)).toString().substr(1) + o
                    }

                    function N(t, e, i, o) {
                        var n = o;
                        "string" == typeof o && (n = function () {
                            return this[o]()
                        }), t && (Yi[t] = n), e && (Yi[e[0]] = function () {
                            return z(n.apply(this, arguments), e[1], e[2])
                        }), i && (Yi[i] = function () {
                            return this.localeData().ordinal(n.apply(this, arguments), t)
                        })
                    }

                    function A(t) {
                        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
                    }

                    function L(t) {
                        var e, i, o = t.match(ji);
                        for (e = 0, i = o.length; i > e; e++)Yi[o[e]] ? o[e] = Yi[o[e]] : o[e] = A(o[e]);
                        return function (n) {
                            var s = "";
                            for (e = 0; i > e; e++)s += o[e] instanceof Function ? o[e].call(n, t) : o[e];
                            return s
                        }
                    }

                    function B(t, e) {
                        return t.isValid() ? (e = R(e, t.localeData()), Wi[e] = Wi[e] || L(e), Wi[e](t)) : t.localeData().invalidDate()
                    }

                    function R(t, e) {
                        function i(t) {
                            return e.longDateFormat(t) || t
                        }

                        var o = 5;
                        for (Hi.lastIndex = 0; o >= 0 && Hi.test(t);)t = t.replace(Hi, i), Hi.lastIndex = 0, o -= 1;
                        return t
                    }

                    function F(t) {
                        return "function" == typeof t && "[object Function]" === Object.prototype.toString.call(t)
                    }

                    function j(t, e, i) {
                        no[t] = F(e) ? e : function (t) {
                                return t && i ? i : e
                            }
                    }

                    function H(t, e) {
                        return r(no, t) ? no[t](e._strict, e._locale) : new RegExp(W(t))
                    }

                    function W(t) {
                        return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, i, o, n) {
                            return e || i || o || n
                        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                    }

                    function Y(t, e) {
                        var i, o = e;
                        for ("string" == typeof t && (t = [t]), "number" == typeof e && (o = function (t, i) {
                            i[e] = g(t)
                        }), i = 0; i < t.length; i++)so[t[i]] = o
                    }

                    function G(t, e) {
                        Y(t, function (t, i, o, n) {
                            o._w = o._w || {}, e(t, o._w, o, n)
                        })
                    }

                    function U(t, e, i) {
                        null != e && r(so, t) && so[t](e, i._a, i, t)
                    }

                    function V(t, e) {
                        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
                    }

                    function q(t) {
                        return this._months[t.month()]
                    }

                    function X(t) {
                        return this._monthsShort[t.month()]
                    }

                    function Z(t, e, i) {
                        var o, n, s;
                        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), o = 0; 12 > o; o++) {
                            if (n = h([2e3, o]), i && !this._longMonthsParse[o] && (this._longMonthsParse[o] = new RegExp("^" + this.months(n, "").replace(".", "") + "$", "i"), this._shortMonthsParse[o] = new RegExp("^" + this.monthsShort(n, "").replace(".", "") + "$", "i")), i || this._monthsParse[o] || (s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[o] = new RegExp(s.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[o].test(t))return o;
                            if (i && "MMM" === e && this._shortMonthsParse[o].test(t))return o;
                            if (!i && this._monthsParse[o].test(t))return o
                        }
                    }

                    function K(t, e) {
                        var i;
                        return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (i = Math.min(t.date(), V(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t)
                    }

                    function J(t) {
                        return null != t ? (K(this, t), e.updateOffset(this, !0), this) : E(this, "Month")
                    }

                    function Q() {
                        return V(this.year(), this.month())
                    }

                    function $(t) {
                        var e, i = t._a;
                        return i && -2 === l(t).overflow && (e = i[ao] < 0 || i[ao] > 11 ? ao : i[ho] < 1 || i[ho] > V(i[ro], i[ao]) ? ho : i[lo] < 0 || i[lo] > 24 || 24 === i[lo] && (0 !== i[uo] || 0 !== i[co] || 0 !== i[po]) ? lo : i[uo] < 0 || i[uo] > 59 ? uo : i[co] < 0 || i[co] > 59 ? co : i[po] < 0 || i[po] > 999 ? po : -1, l(t)._overflowDayOfYear && (ro > e || e > ho) && (e = ho), l(t).overflow = e), t
                    }

                    function tt(t) {
                        e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
                    }

                    function et(t, e) {
                        var i = !0;
                        return a(function () {
                            return i && (tt(t + "\n" + (new Error).stack), i = !1), e.apply(this, arguments)
                        }, e)
                    }

                    function it(t, e) {
                        vo[t] || (tt(e), vo[t] = !0)
                    }

                    function ot(t) {
                        var e, i, o = t._i, n = go.exec(o);
                        if (n) {
                            for (l(t).iso = !0, e = 0, i = yo.length; i > e; e++)if (yo[e][1].exec(o)) {
                                t._f = yo[e][0];
                                break
                            }
                            for (e = 0, i = bo.length; i > e; e++)if (bo[e][1].exec(o)) {
                                t._f += (n[6] || " ") + bo[e][0];
                                break
                            }
                            o.match(eo) && (t._f += "Z"), xt(t)
                        } else t._isValid = !1
                    }

                    function nt(t) {
                        var i = wo.exec(t._i);
                        return null !== i ? void(t._d = new Date(+i[1])) : (ot(t), void(t._isValid === !1 && (delete t._isValid, e.createFromInputFallback(t))))
                    }

                    function st(t, e, i, o, n, s, r) {
                        var a = new Date(t, e, i, o, n, s, r);
                        return 1970 > t && a.setFullYear(t), a
                    }

                    function rt(t) {
                        var e = new Date(Date.UTC.apply(null, arguments));
                        return 1970 > t && e.setUTCFullYear(t), e
                    }

                    function at(t) {
                        return ht(t) ? 366 : 365
                    }

                    function ht(t) {
                        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
                    }

                    function dt() {
                        return ht(this.year())
                    }

                    function lt(t, e, i) {
                        var o, n = i - e, s = i - t.day();
                        return s > n && (s -= 7), n - 7 > s && (s += 7), o = Et(t).add(s, "d"), {
                            week: Math.ceil(o.dayOfYear() / 7),
                            year: o.year()
                        }
                    }

                    function ut(t) {
                        return lt(t, this._week.dow, this._week.doy).week
                    }

                    function ct() {
                        return this._week.dow
                    }

                    function pt() {
                        return this._week.doy
                    }

                    function ft(t) {
                        var e = this.localeData().week(this);
                        return null == t ? e : this.add(7 * (t - e), "d")
                    }

                    function mt(t) {
                        var e = lt(this, 1, 4).week;
                        return null == t ? e : this.add(7 * (t - e), "d")
                    }

                    function vt(t, e, i, o, n) {
                        var s, r = 6 + n - o, a = rt(t, 0, 1 + r), h = a.getUTCDay();
                        return n > h && (h += 7), i = null != i ? 1 * i : n, s = 1 + r + 7 * (e - 1) - h + i, {
                            year: s > 0 ? t : t - 1,
                            dayOfYear: s > 0 ? s : at(t - 1) + s
                        }
                    }

                    function gt(t) {
                        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                        return null == t ? e : this.add(t - e, "d")
                    }

                    function yt(t, e, i) {
                        return null != t ? t : null != e ? e : i
                    }

                    function bt(t) {
                        var e = new Date;
                        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
                    }

                    function wt(t) {
                        var e, i, o, n, s = [];
                        if (!t._d) {
                            for (o = bt(t), t._w && null == t._a[ho] && null == t._a[ao] && _t(t), t._dayOfYear && (n = yt(t._a[ro], o[ro]), t._dayOfYear > at(n) && (l(t)._overflowDayOfYear = !0), i = rt(n, 0, t._dayOfYear), t._a[ao] = i.getUTCMonth(), t._a[ho] = i.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e)t._a[e] = s[e] = o[e];
                            for (; 7 > e; e++)t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                            24 === t._a[lo] && 0 === t._a[uo] && 0 === t._a[co] && 0 === t._a[po] && (t._nextDay = !0, t._a[lo] = 0), t._d = (t._useUTC ? rt : st).apply(null, s), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[lo] = 24)
                        }
                    }

                    function _t(t) {
                        var e, i, o, n, s, r, a;
                        e = t._w, null != e.GG || null != e.W || null != e.E ? (s = 1, r = 4, i = yt(e.GG, t._a[ro], lt(Et(), 1, 4).year), o = yt(e.W, 1), n = yt(e.E, 1)) : (s = t._locale._week.dow, r = t._locale._week.doy, i = yt(e.gg, t._a[ro], lt(Et(), s, r).year), o = yt(e.w, 1), null != e.d ? (n = e.d, s > n && ++o) : n = null != e.e ? e.e + s : s), a = vt(i, o, n, r, s), t._a[ro] = a.year, t._dayOfYear = a.dayOfYear
                    }

                    function xt(t) {
                        if (t._f === e.ISO_8601)return void ot(t);
                        t._a = [], l(t).empty = !0;
                        var i, o, n, s, r, a = "" + t._i, h = a.length, d = 0;
                        for (n = R(t._f, t._locale).match(ji) || [], i = 0; i < n.length; i++)s = n[i], o = (a.match(H(s, t)) || [])[0], o && (r = a.substr(0, a.indexOf(o)), r.length > 0 && l(t).unusedInput.push(r), a = a.slice(a.indexOf(o) + o.length), d += o.length), Yi[s] ? (o ? l(t).empty = !1 : l(t).unusedTokens.push(s), U(s, o, t)) : t._strict && !o && l(t).unusedTokens.push(s);
                        l(t).charsLeftOver = h - d, a.length > 0 && l(t).unusedInput.push(a), l(t).bigHour === !0 && t._a[lo] <= 12 && t._a[lo] > 0 && (l(t).bigHour = void 0), t._a[lo] = kt(t._locale, t._a[lo], t._meridiem), wt(t), $(t)
                    }

                    function kt(t, e, i) {
                        var o;
                        return null == i ? e : null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? (o = t.isPM(i), o && 12 > e && (e += 12), o || 12 !== e || (e = 0), e) : e
                    }

                    function Ot(t) {
                        var e, i, o, n, s;
                        if (0 === t._f.length)return l(t).invalidFormat = !0, void(t._d = new Date(NaN));
                        for (n = 0; n < t._f.length; n++)s = 0, e = p({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[n], xt(e), u(e) && (s += l(e).charsLeftOver, s += 10 * l(e).unusedTokens.length, l(e).score = s, (null == o || o > s) && (o = s, i = e));
                        a(t, i || e)
                    }

                    function Mt(t) {
                        if (!t._d) {
                            var e = T(t._i);
                            t._a = [e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], wt(t)
                        }
                    }

                    function Dt(t) {
                        var e = new f($(Ct(t)));
                        return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
                    }

                    function Ct(t) {
                        var e = t._i, i = t._f;
                        return t._locale = t._locale || M(t._l), null === e || void 0 === i && "" === e ? c({nullInput: !0}) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), m(e) ? new f($(e)) : (o(i) ? Ot(t) : i ? xt(t) : n(e) ? t._d = e : Tt(t), t))
                    }

                    function Tt(t) {
                        var i = t._i;
                        void 0 === i ? t._d = new Date : n(i) ? t._d = new Date(+i) : "string" == typeof i ? nt(t) : o(i) ? (t._a = s(i.slice(0), function (t) {
                                            return parseInt(t, 10)
                                        }), wt(t)) : "object" == typeof i ? Mt(t) : "number" == typeof i ? t._d = new Date(i) : e.createFromInputFallback(t)
                    }

                    function St(t, e, i, o, n) {
                        var s = {};
                        return "boolean" == typeof i && (o = i, i = void 0), s._isAMomentObject = !0, s._useUTC = s._isUTC = n, s._l = i, s._i = t, s._f = e, s._strict = o, Dt(s)
                    }

                    function Et(t, e, i, o) {
                        return St(t, e, i, o, !1)
                    }

                    function Pt(t, e) {
                        var i, n;
                        if (1 === e.length && o(e[0]) && (e = e[0]), !e.length)return Et();
                        for (i = e[0], n = 1; n < e.length; ++n)(!e[n].isValid() || e[n][t](i)) && (i = e[n]);
                        return i
                    }

                    function It() {
                        var t = [].slice.call(arguments, 0);
                        return Pt("isBefore", t)
                    }

                    function zt() {
                        var t = [].slice.call(arguments, 0);
                        return Pt("isAfter", t)
                    }

                    function Nt(t) {
                        var e = T(t), i = e.year || 0, o = e.quarter || 0, n = e.month || 0, s = e.week || 0, r = e.day || 0, a = e.hour || 0, h = e.minute || 0, d = e.second || 0, l = e.millisecond || 0;
                        this._milliseconds = +l + 1e3 * d + 6e4 * h + 36e5 * a, this._days = +r + 7 * s, this._months = +n + 3 * o + 12 * i, this._data = {}, this._locale = M(), this._bubble()
                    }

                    function At(t) {
                        return t instanceof Nt
                    }

                    function Lt(t, e) {
                        N(t, 0, 0, function () {
                            var t = this.utcOffset(), i = "+";
                            return 0 > t && (t = -t, i = "-"), i + z(~~(t / 60), 2) + e + z(~~t % 60, 2)
                        })
                    }

                    function Bt(t) {
                        var e = (t || "").match(eo) || [], i = e[e.length - 1] || [], o = (i + "").match(Mo) || ["-", 0, 0], n = +(60 * o[1]) + g(o[2]);
                        return "+" === o[0] ? n : -n
                    }

                    function Rt(t, i) {
                        var o, s;
                        return i._isUTC ? (o = i.clone(), s = (m(t) || n(t) ? +t : +Et(t)) - +o, o._d.setTime(+o._d + s), e.updateOffset(o, !1), o) : Et(t).local()
                    }

                    function Ft(t) {
                        return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
                    }

                    function jt(t, i) {
                        var o, n = this._offset || 0;
                        return null != t ? ("string" == typeof t && (t = Bt(t)), Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && i && (o = Ft(this)), this._offset = t, this._isUTC = !0, null != o && this.add(o, "m"), n !== t && (!i || this._changeInProgress ? ie(this, Jt(t - n, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, e.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? n : Ft(this)
                    }

                    function Ht(t, e) {
                        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
                    }

                    function Wt(t) {
                        return this.utcOffset(0, t)
                    }

                    function Yt(t) {
                        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Ft(this), "m")), this
                    }

                    function Gt() {
                        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Bt(this._i)), this
                    }

                    function Ut(t) {
                        return t = t ? Et(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0
                    }

                    function Vt() {
                        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                    }

                    function qt() {
                        if ("undefined" != typeof this._isDSTShifted)return this._isDSTShifted;
                        var t = {};
                        if (p(t, this), t = Ct(t), t._a) {
                            var e = t._isUTC ? h(t._a) : Et(t._a);
                            this._isDSTShifted = this.isValid() && y(t._a, e.toArray()) > 0
                        } else this._isDSTShifted = !1;
                        return this._isDSTShifted
                    }

                    function Xt() {
                        return !this._isUTC
                    }

                    function Zt() {
                        return this._isUTC
                    }

                    function Kt() {
                        return this._isUTC && 0 === this._offset
                    }

                    function Jt(t, e) {
                        var i, o, n, s = t, a = null;
                        return At(t) ? s = {
                                ms: t._milliseconds,
                                d: t._days,
                                M: t._months
                            } : "number" == typeof t ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (a = Do.exec(t)) ? (i = "-" === a[1] ? -1 : 1, s = {
                                        y: 0,
                                        d: g(a[ho]) * i,
                                        h: g(a[lo]) * i,
                                        m: g(a[uo]) * i,
                                        s: g(a[co]) * i,
                                        ms: g(a[po]) * i
                                    }) : (a = Co.exec(t)) ? (i = "-" === a[1] ? -1 : 1, s = {
                                            y: Qt(a[2], i),
                                            M: Qt(a[3], i),
                                            d: Qt(a[4], i),
                                            h: Qt(a[5], i),
                                            m: Qt(a[6], i),
                                            s: Qt(a[7], i),
                                            w: Qt(a[8], i)
                                        }) : null == s ? s = {} : "object" == typeof s && ("from" in s || "to" in s) && (n = te(Et(s.from), Et(s.to)), s = {}, s.ms = n.milliseconds, s.M = n.months), o = new Nt(s), At(t) && r(t, "_locale") && (o._locale = t._locale), o
                    }

                    function Qt(t, e) {
                        var i = t && parseFloat(t.replace(",", "."));
                        return (isNaN(i) ? 0 : i) * e
                    }

                    function $t(t, e) {
                        var i = {milliseconds: 0, months: 0};
                        return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i
                    }

                    function te(t, e) {
                        var i;
                        return e = Rt(e, t), t.isBefore(e) ? i = $t(t, e) : (i = $t(e, t), i.milliseconds = -i.milliseconds, i.months = -i.months), i
                    }

                    function ee(t, e) {
                        return function (i, o) {
                            var n, s;
                            return null === o || isNaN(+o) || (it(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), s = i, i = o, o = s), i = "string" == typeof i ? +i : i, n = Jt(i, o), ie(this, n, t), this
                        }
                    }

                    function ie(t, i, o, n) {
                        var s = i._milliseconds, r = i._days, a = i._months;
                        n = null == n ? !0 : n, s && t._d.setTime(+t._d + s * o), r && P(t, "Date", E(t, "Date") + r * o), a && K(t, E(t, "Month") + a * o), n && e.updateOffset(t, r || a)
                    }

                    function oe(t, e) {
                        var i = t || Et(), o = Rt(i, this).startOf("day"), n = this.diff(o, "days", !0), s = -6 > n ? "sameElse" : -1 > n ? "lastWeek" : 0 > n ? "lastDay" : 1 > n ? "sameDay" : 2 > n ? "nextDay" : 7 > n ? "nextWeek" : "sameElse";
                        return this.format(e && e[s] || this.localeData().calendar(s, this, Et(i)))
                    }

                    function ne() {
                        return new f(this)
                    }

                    function se(t, e) {
                        var i;
                        return e = C("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = m(t) ? t : Et(t), +this > +t) : (i = m(t) ? +t : +Et(t), i < +this.clone().startOf(e))
                    }

                    function re(t, e) {
                        var i;
                        return e = C("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = m(t) ? t : Et(t), +t > +this) : (i = m(t) ? +t : +Et(t), +this.clone().endOf(e) < i)
                    }

                    function ae(t, e, i) {
                        return this.isAfter(t, i) && this.isBefore(e, i)
                    }

                    function he(t, e) {
                        var i;
                        return e = C(e || "millisecond"), "millisecond" === e ? (t = m(t) ? t : Et(t), +this === +t) : (i = +Et(t), +this.clone().startOf(e) <= i && i <= +this.clone().endOf(e))
                    }

                    function de(t, e, i) {
                        var o, n, s = Rt(t, this), r = 6e4 * (s.utcOffset() - this.utcOffset());
                        return e = C(e), "year" === e || "month" === e || "quarter" === e ? (n = le(this, s), "quarter" === e ? n /= 3 : "year" === e && (n /= 12)) : (o = this - s, n = "second" === e ? o / 1e3 : "minute" === e ? o / 6e4 : "hour" === e ? o / 36e5 : "day" === e ? (o - r) / 864e5 : "week" === e ? (o - r) / 6048e5 : o), i ? n : v(n)
                    }

                    function le(t, e) {
                        var i, o, n = 12 * (e.year() - t.year()) + (e.month() - t.month()), s = t.clone().add(n, "months");
                        return 0 > e - s ? (i = t.clone().add(n - 1, "months"), o = (e - s) / (s - i)) : (i = t.clone().add(n + 1, "months"), o = (e - s) / (i - s)), -(n + o)
                    }

                    function ue() {
                        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                    }

                    function ce() {
                        var t = this.clone().utc();
                        return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : B(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : B(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                    }

                    function pe(t) {
                        var i = B(this, t || e.defaultFormat);
                        return this.localeData().postformat(i)
                    }

                    function fe(t, e) {
                        return this.isValid() ? Jt({
                                to: this,
                                from: t
                            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                    }

                    function me(t) {
                        return this.from(Et(), t)
                    }

                    function ve(t, e) {
                        return this.isValid() ? Jt({
                                from: this,
                                to: t
                            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                    }

                    function ge(t) {
                        return this.to(Et(), t)
                    }

                    function ye(t) {
                        var e;
                        return void 0 === t ? this._locale._abbr : (e = M(t), null != e && (this._locale = e), this)
                    }

                    function be() {
                        return this._locale
                    }

                    function we(t) {
                        switch (t = C(t)) {
                            case"year":
                                this.month(0);
                            case"quarter":
                            case"month":
                                this.date(1);
                            case"week":
                            case"isoWeek":
                            case"day":
                                this.hours(0);
                            case"hour":
                                this.minutes(0);
                            case"minute":
                                this.seconds(0);
                            case"second":
                                this.milliseconds(0)
                        }
                        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
                    }

                    function _e(t) {
                        return t = C(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
                    }

                    function xe() {
                        return +this._d - 6e4 * (this._offset || 0)
                    }

                    function ke() {
                        return Math.floor(+this / 1e3)
                    }

                    function Oe() {
                        return this._offset ? new Date(+this) : this._d
                    }

                    function Me() {
                        var t = this;
                        return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
                    }

                    function De() {
                        var t = this;
                        return {
                            years: t.year(),
                            months: t.month(),
                            date: t.date(),
                            hours: t.hours(),
                            minutes: t.minutes(),
                            seconds: t.seconds(),
                            milliseconds: t.milliseconds()
                        }
                    }

                    function Ce() {
                        return u(this)
                    }

                    function Te() {
                        return a({}, l(this))
                    }

                    function Se() {
                        return l(this).overflow
                    }

                    function Ee(t, e) {
                        N(0, [t, t.length], 0, e)
                    }

                    function Pe(t, e, i) {
                        return lt(Et([t, 11, 31 + e - i]), e, i).week
                    }

                    function Ie(t) {
                        var e = lt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                        return null == t ? e : this.add(t - e, "y")
                    }

                    function ze(t) {
                        var e = lt(this, 1, 4).year;
                        return null == t ? e : this.add(t - e, "y")
                    }

                    function Ne() {
                        return Pe(this.year(), 1, 4)
                    }

                    function Ae() {
                        var t = this.localeData()._week;
                        return Pe(this.year(), t.dow, t.doy)
                    }

                    function Le(t) {
                        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
                    }

                    function Be(t, e) {
                        return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10)
                    }

                    function Re(t) {
                        return this._weekdays[t.day()]
                    }

                    function Fe(t) {
                        return this._weekdaysShort[t.day()]
                    }

                    function je(t) {
                        return this._weekdaysMin[t.day()]
                    }

                    function He(t) {
                        var e, i, o;
                        for (this._weekdaysParse = this._weekdaysParse || [], e = 0; 7 > e; e++)if (this._weekdaysParse[e] || (i = Et([2e3, 1]).day(e), o = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[e] = new RegExp(o.replace(".", ""), "i")), this._weekdaysParse[e].test(t))return e
                    }

                    function We(t) {
                        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                        return null != t ? (t = Be(t, this.localeData()), this.add(t - e, "d")) : e
                    }

                    function Ye(t) {
                        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                        return null == t ? e : this.add(t - e, "d")
                    }

                    function Ge(t) {
                        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
                    }

                    function Ue(t, e) {
                        N(t, 0, 0, function () {
                            return this.localeData().meridiem(this.hours(), this.minutes(), e)
                        })
                    }

                    function Ve(t, e) {
                        return e._meridiemParse
                    }

                    function qe(t) {
                        return "p" === (t + "").toLowerCase().charAt(0)
                    }

                    function Xe(t, e, i) {
                        return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
                    }

                    function Ze(t, e) {
                        e[po] = g(1e3 * ("0." + t))
                    }

                    function Ke() {
                        return this._isUTC ? "UTC" : ""
                    }

                    function Je() {
                        return this._isUTC ? "Coordinated Universal Time" : ""
                    }

                    function Qe(t) {
                        return Et(1e3 * t)
                    }

                    function $e() {
                        return Et.apply(null, arguments).parseZone()
                    }

                    function ti(t, e, i) {
                        var o = this._calendar[t];
                        return "function" == typeof o ? o.call(e, i) : o
                    }

                    function ei(t) {
                        var e = this._longDateFormat[t], i = this._longDateFormat[t.toUpperCase()];
                        return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function (t) {
                                return t.slice(1)
                            }), this._longDateFormat[t])
                    }

                    function ii() {
                        return this._invalidDate
                    }

                    function oi(t) {
                        return this._ordinal.replace("%d", t)
                    }

                    function ni(t) {
                        return t
                    }

                    function si(t, e, i, o) {
                        var n = this._relativeTime[i];
                        return "function" == typeof n ? n(t, e, i, o) : n.replace(/%d/i, t)
                    }

                    function ri(t, e) {
                        var i = this._relativeTime[t > 0 ? "future" : "past"];
                        return "function" == typeof i ? i(e) : i.replace(/%s/i, e)
                    }

                    function ai(t) {
                        var e, i;
                        for (i in t)e = t[i], "function" == typeof e ? this[i] = e : this["_" + i] = e;
                        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
                    }

                    function hi(t, e, i, o) {
                        var n = M(), s = h().set(o, e);
                        return n[i](s, t)
                    }

                    function di(t, e, i, o, n) {
                        if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e)return hi(t, e, i, n);
                        var s, r = [];
                        for (s = 0; o > s; s++)r[s] = hi(t, s, i, n);
                        return r
                    }

                    function li(t, e) {
                        return di(t, e, "months", 12, "month")
                    }

                    function ui(t, e) {
                        return di(t, e, "monthsShort", 12, "month")
                    }

                    function ci(t, e) {
                        return di(t, e, "weekdays", 7, "day")
                    }

                    function pi(t, e) {
                        return di(t, e, "weekdaysShort", 7, "day")
                    }

                    function fi(t, e) {
                        return di(t, e, "weekdaysMin", 7, "day")
                    }

                    function mi() {
                        var t = this._data;
                        return this._milliseconds = Ko(this._milliseconds), this._days = Ko(this._days), this._months = Ko(this._months), t.milliseconds = Ko(t.milliseconds), t.seconds = Ko(t.seconds), t.minutes = Ko(t.minutes), t.hours = Ko(t.hours), t.months = Ko(t.months), t.years = Ko(t.years), this
                    }

                    function vi(t, e, i, o) {
                        var n = Jt(e, i);
                        return t._milliseconds += o * n._milliseconds, t._days += o * n._days, t._months += o * n._months, t._bubble()
                    }

                    function gi(t, e) {
                        return vi(this, t, e, 1)
                    }

                    function yi(t, e) {
                        return vi(this, t, e, -1)
                    }

                    function bi(t) {
                        return 0 > t ? Math.floor(t) : Math.ceil(t)
                    }

                    function wi() {
                        var t, e, i, o, n, s = this._milliseconds, r = this._days, a = this._months, h = this._data;
                        return s >= 0 && r >= 0 && a >= 0 || 0 >= s && 0 >= r && 0 >= a || (s += 864e5 * bi(xi(a) + r), r = 0, a = 0), h.milliseconds = s % 1e3, t = v(s / 1e3), h.seconds = t % 60, e = v(t / 60), h.minutes = e % 60, i = v(e / 60), h.hours = i % 24, r += v(i / 24), n = v(_i(r)), a += n, r -= bi(xi(n)), o = v(a / 12), a %= 12, h.days = r, h.months = a, h.years = o, this
                    }

                    function _i(t) {
                        return 4800 * t / 146097
                    }

                    function xi(t) {
                        return 146097 * t / 4800
                    }

                    function ki(t) {
                        var e, i, o = this._milliseconds;
                        if (t = C(t), "month" === t || "year" === t)return e = this._days + o / 864e5, i = this._months + _i(e), "month" === t ? i : i / 12;
                        switch (e = this._days + Math.round(xi(this._months)), t) {
                            case"week":
                                return e / 7 + o / 6048e5;
                            case"day":
                                return e + o / 864e5;
                            case"hour":
                                return 24 * e + o / 36e5;
                            case"minute":
                                return 1440 * e + o / 6e4;
                            case"second":
                                return 86400 * e + o / 1e3;
                            case"millisecond":
                                return Math.floor(864e5 * e) + o;
                            default:
                                throw new Error("Unknown unit " + t)
                        }
                    }

                    function Oi() {
                        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12)
                    }

                    function Mi(t) {
                        return function () {
                            return this.as(t)
                        }
                    }

                    function Di(t) {
                        return t = C(t), this[t + "s"]()
                    }

                    function Ci(t) {
                        return function () {
                            return this._data[t]
                        }
                    }

                    function Ti() {
                        return v(this.days() / 7)
                    }

                    function Si(t, e, i, o, n) {
                        return n.relativeTime(e || 1, !!i, t, o)
                    }

                    function Ei(t, e, i) {
                        var o = Jt(t).abs(), n = pn(o.as("s")), s = pn(o.as("m")), r = pn(o.as("h")), a = pn(o.as("d")), h = pn(o.as("M")), d = pn(o.as("y")), l = n < fn.s && ["s", n] || 1 === s && ["m"] || s < fn.m && ["mm", s] || 1 === r && ["h"] || r < fn.h && ["hh", r] || 1 === a && ["d"] || a < fn.d && ["dd", a] || 1 === h && ["M"] || h < fn.M && ["MM", h] || 1 === d && ["y"] || ["yy", d];
                        return l[2] = e, l[3] = +t > 0, l[4] = i, Si.apply(null, l)
                    }

                    function Pi(t, e) {
                        return void 0 === fn[t] ? !1 : void 0 === e ? fn[t] : (fn[t] = e, !0)
                    }

                    function Ii(t) {
                        var e = this.localeData(), i = Ei(this, !t, e);
                        return t && (i = e.pastFuture(+this, i)), e.postformat(i)
                    }

                    function zi() {
                        var t, e, i, o = mn(this._milliseconds) / 1e3, n = mn(this._days), s = mn(this._months);
                        t = v(o / 60), e = v(t / 60), o %= 60, t %= 60, i = v(s / 12), s %= 12;
                        var r = i, a = s, h = n, d = e, l = t, u = o, c = this.asSeconds();
                        return c ? (0 > c ? "-" : "") + "P" + (r ? r + "Y" : "") + (a ? a + "M" : "") + (h ? h + "D" : "") + (d || l || u ? "T" : "") + (d ? d + "H" : "") + (l ? l + "M" : "") + (u ? u + "S" : "") : "P0D"
                    }

                    var Ni, Ai, Li = e.momentProperties = [], Bi = !1, Ri = {}, Fi = {}, ji = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Hi = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Wi = {}, Yi = {}, Gi = /\d/, Ui = /\d\d/, Vi = /\d{3}/, qi = /\d{4}/, Xi = /[+-]?\d{6}/, Zi = /\d\d?/, Ki = /\d{1,3}/, Ji = /\d{1,4}/, Qi = /[+-]?\d{1,6}/, $i = /\d+/, to = /[+-]?\d+/, eo = /Z|[+-]\d\d:?\d\d/gi, io = /[+-]?\d+(\.\d{1,3})?/, oo = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, no = {}, so = {}, ro = 0, ao = 1, ho = 2, lo = 3, uo = 4, co = 5, po = 6;
                    N("M", ["MM", 2], "Mo", function () {
                        return this.month() + 1
                    }), N("MMM", 0, 0, function (t) {
                        return this.localeData().monthsShort(this, t)
                    }), N("MMMM", 0, 0, function (t) {
                        return this.localeData().months(this, t)
                    }), D("month", "M"), j("M", Zi), j("MM", Zi, Ui), j("MMM", oo), j("MMMM", oo), Y(["M", "MM"], function (t, e) {
                        e[ao] = g(t) - 1
                    }), Y(["MMM", "MMMM"], function (t, e, i, o) {
                        var n = i._locale.monthsParse(t, o, i._strict);
                        null != n ? e[ao] = n : l(i).invalidMonth = t
                    });
                    var fo = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), mo = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), vo = {};
                    e.suppressDeprecationWarnings = !1;
                    var go = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, yo = [
                        ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                        ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                        ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                        ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                        ["YYYY-DDD", /\d{4}-\d{3}/]
                    ], bo = [
                        ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                        ["HH:mm", /(T| )\d\d:\d\d/],
                        ["HH", /(T| )\d\d/]
                    ], wo = /^\/?Date\((\-?\d+)/i;
                    e.createFromInputFallback = et("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (t) {
                        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
                    }), N(0, ["YY", 2], 0, function () {
                        return this.year() % 100
                    }), N(0, ["YYYY", 4], 0, "year"), N(0, ["YYYYY", 5], 0, "year"), N(0, ["YYYYYY", 6, !0], 0, "year"), D("year", "y"), j("Y", to), j("YY", Zi, Ui), j("YYYY", Ji, qi), j("YYYYY", Qi, Xi), j("YYYYYY", Qi, Xi), Y(["YYYYY", "YYYYYY"], ro), Y("YYYY", function (t, i) {
                        i[ro] = 2 === t.length ? e.parseTwoDigitYear(t) : g(t)
                    }), Y("YY", function (t, i) {
                        i[ro] = e.parseTwoDigitYear(t)
                    }), e.parseTwoDigitYear = function (t) {
                        return g(t) + (g(t) > 68 ? 1900 : 2e3)
                    };
                    var _o = S("FullYear", !1);
                    N("w", ["ww", 2], "wo", "week"), N("W", ["WW", 2], "Wo", "isoWeek"), D("week", "w"), D("isoWeek", "W"), j("w", Zi), j("ww", Zi, Ui), j("W", Zi), j("WW", Zi, Ui), G(["w", "ww", "W", "WW"], function (t, e, i, o) {
                        e[o.substr(0, 1)] = g(t)
                    });
                    var xo = {dow: 0, doy: 6};
                    N("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), D("dayOfYear", "DDD"), j("DDD", Ki), j("DDDD", Vi), Y(["DDD", "DDDD"], function (t, e, i) {
                        i._dayOfYear = g(t)
                    }), e.ISO_8601 = function () {
                    };
                    var ko = et("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
                        var t = Et.apply(null, arguments);
                        return this > t ? this : t
                    }), Oo = et("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
                        var t = Et.apply(null, arguments);
                        return t > this ? this : t
                    });
                    Lt("Z", ":"), Lt("ZZ", ""), j("Z", eo), j("ZZ", eo), Y(["Z", "ZZ"], function (t, e, i) {
                        i._useUTC = !0, i._tzm = Bt(t)
                    });
                    var Mo = /([\+\-]|\d\d)/gi;
                    e.updateOffset = function () {
                    };
                    var Do = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Co = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
                    Jt.fn = Nt.prototype;
                    var To = ee(1, "add"), So = ee(-1, "subtract");
                    e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
                    var Eo = et("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
                        return void 0 === t ? this.localeData() : this.locale(t)
                    });
                    N(0, ["gg", 2], 0, function () {
                        return this.weekYear() % 100
                    }), N(0, ["GG", 2], 0, function () {
                        return this.isoWeekYear() % 100
                    }), Ee("gggg", "weekYear"), Ee("ggggg", "weekYear"), Ee("GGGG", "isoWeekYear"), Ee("GGGGG", "isoWeekYear"), D("weekYear", "gg"), D("isoWeekYear", "GG"), j("G", to), j("g", to), j("GG", Zi, Ui), j("gg", Zi, Ui), j("GGGG", Ji, qi), j("gggg", Ji, qi), j("GGGGG", Qi, Xi), j("ggggg", Qi, Xi), G(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, o) {
                        e[o.substr(0, 2)] = g(t)
                    }), G(["gg", "GG"], function (t, i, o, n) {
                        i[n] = e.parseTwoDigitYear(t)
                    }), N("Q", 0, 0, "quarter"), D("quarter", "Q"), j("Q", Gi), Y("Q", function (t, e) {
                        e[ao] = 3 * (g(t) - 1)
                    }), N("D", ["DD", 2], "Do", "date"), D("date", "D"), j("D", Zi), j("DD", Zi, Ui), j("Do", function (t, e) {
                        return t ? e._ordinalParse : e._ordinalParseLenient
                    }), Y(["D", "DD"], ho), Y("Do", function (t, e) {
                        e[ho] = g(t.match(Zi)[0], 10)
                    });
                    var Po = S("Date", !0);
                    N("d", 0, "do", "day"), N("dd", 0, 0, function (t) {
                        return this.localeData().weekdaysMin(this, t)
                    }), N("ddd", 0, 0, function (t) {
                        return this.localeData().weekdaysShort(this, t)
                    }), N("dddd", 0, 0, function (t) {
                        return this.localeData().weekdays(this, t)
                    }), N("e", 0, 0, "weekday"), N("E", 0, 0, "isoWeekday"), D("day", "d"), D("weekday", "e"), D("isoWeekday", "E"), j("d", Zi), j("e", Zi), j("E", Zi), j("dd", oo), j("ddd", oo), j("dddd", oo), G(["dd", "ddd", "dddd"], function (t, e, i) {
                        var o = i._locale.weekdaysParse(t);
                        null != o ? e.d = o : l(i).invalidWeekday = t
                    }), G(["d", "e", "E"], function (t, e, i, o) {
                        e[o] = g(t)
                    });
                    var Io = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), zo = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), No = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
                    N("H", ["HH", 2], 0, "hour"), N("h", ["hh", 2], 0, function () {
                        return this.hours() % 12 || 12
                    }), Ue("a", !0), Ue("A", !1), D("hour", "h"), j("a", Ve), j("A", Ve), j("H", Zi), j("h", Zi), j("HH", Zi, Ui), j("hh", Zi, Ui), Y(["H", "HH"], lo), Y(["a", "A"], function (t, e, i) {
                        i._isPm = i._locale.isPM(t), i._meridiem = t
                    }), Y(["h", "hh"], function (t, e, i) {
                        e[lo] = g(t), l(i).bigHour = !0
                    });
                    var Ao = /[ap]\.?m?\.?/i, Lo = S("Hours", !0);
                    N("m", ["mm", 2], 0, "minute"), D("minute", "m"), j("m", Zi), j("mm", Zi, Ui), Y(["m", "mm"], uo);
                    var Bo = S("Minutes", !1);
                    N("s", ["ss", 2], 0, "second"), D("second", "s"), j("s", Zi), j("ss", Zi, Ui), Y(["s", "ss"], co);
                    var Ro = S("Seconds", !1);
                    N("S", 0, 0, function () {
                        return ~~(this.millisecond() / 100)
                    }), N(0, ["SS", 2], 0, function () {
                        return ~~(this.millisecond() / 10)
                    }), N(0, ["SSS", 3], 0, "millisecond"), N(0, ["SSSS", 4], 0, function () {
                        return 10 * this.millisecond()
                    }), N(0, ["SSSSS", 5], 0, function () {
                        return 100 * this.millisecond()
                    }), N(0, ["SSSSSS", 6], 0, function () {
                        return 1e3 * this.millisecond()
                    }), N(0, ["SSSSSSS", 7], 0, function () {
                        return 1e4 * this.millisecond()
                    }), N(0, ["SSSSSSSS", 8], 0, function () {
                        return 1e5 * this.millisecond()
                    }), N(0, ["SSSSSSSSS", 9], 0, function () {
                        return 1e6 * this.millisecond()
                    }), D("millisecond", "ms"), j("S", Ki, Gi), j("SS", Ki, Ui), j("SSS", Ki, Vi);
                    var Fo;
                    for (Fo = "SSSS"; Fo.length <= 9; Fo += "S")j(Fo, $i);
                    for (Fo = "S"; Fo.length <= 9; Fo += "S")Y(Fo, Ze);
                    var jo = S("Milliseconds", !1);
                    N("z", 0, 0, "zoneAbbr"), N("zz", 0, 0, "zoneName");
                    var Ho = f.prototype;
                    Ho.add = To, Ho.calendar = oe, Ho.clone = ne, Ho.diff = de, Ho.endOf = _e, Ho.format = pe, Ho.from = fe, Ho.fromNow = me, Ho.to = ve, Ho.toNow = ge, Ho.get = I, Ho.invalidAt = Se, Ho.isAfter = se, Ho.isBefore = re, Ho.isBetween = ae, Ho.isSame = he, Ho.isValid = Ce, Ho.lang = Eo, Ho.locale = ye, Ho.localeData = be, Ho.max = Oo, Ho.min = ko, Ho.parsingFlags = Te, Ho.set = I, Ho.startOf = we, Ho.subtract = So, Ho.toArray = Me, Ho.toObject = De, Ho.toDate = Oe, Ho.toISOString = ce, Ho.toJSON = ce, Ho.toString = ue, Ho.unix = ke, Ho.valueOf = xe, Ho.year = _o, Ho.isLeapYear = dt, Ho.weekYear = Ie, Ho.isoWeekYear = ze, Ho.quarter = Ho.quarters = Le, Ho.month = J, Ho.daysInMonth = Q, Ho.week = Ho.weeks = ft, Ho.isoWeek = Ho.isoWeeks = mt, Ho.weeksInYear = Ae, Ho.isoWeeksInYear = Ne, Ho.date = Po, Ho.day = Ho.days = We, Ho.weekday = Ye, Ho.isoWeekday = Ge, Ho.dayOfYear = gt, Ho.hour = Ho.hours = Lo, Ho.minute = Ho.minutes = Bo, Ho.second = Ho.seconds = Ro, Ho.millisecond = Ho.milliseconds = jo, Ho.utcOffset = jt, Ho.utc = Wt, Ho.local = Yt, Ho.parseZone = Gt, Ho.hasAlignedHourOffset = Ut, Ho.isDST = Vt, Ho.isDSTShifted = qt, Ho.isLocal = Xt, Ho.isUtcOffset = Zt, Ho.isUtc = Kt, Ho.isUTC = Kt, Ho.zoneAbbr = Ke, Ho.zoneName = Je, Ho.dates = et("dates accessor is deprecated. Use date instead.", Po), Ho.months = et("months accessor is deprecated. Use month instead", J), Ho.years = et("years accessor is deprecated. Use year instead", _o), Ho.zone = et("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ht);
                    var Wo = Ho, Yo = {
                        sameDay: "[Today at] LT",
                        nextDay: "[Tomorrow at] LT",
                        nextWeek: "dddd [at] LT",
                        lastDay: "[Yesterday at] LT",
                        lastWeek: "[Last] dddd [at] LT",
                        sameElse: "L"
                    }, Go = {
                        LTS: "h:mm:ss A",
                        LT: "h:mm A",
                        L: "MM/DD/YYYY",
                        LL: "MMMM D, YYYY",
                        LLL: "MMMM D, YYYY h:mm A",
                        LLLL: "dddd, MMMM D, YYYY h:mm A"
                    }, Uo = "Invalid date", Vo = "%d", qo = /\d{1,2}/, Xo = {
                        future: "in %s",
                        past: "%s ago",
                        s: "a few seconds",
                        m: "a minute",
                        mm: "%d minutes",
                        h: "an hour",
                        hh: "%d hours",
                        d: "a day",
                        dd: "%d days",
                        M: "a month",
                        MM: "%d months",
                        y: "a year",
                        yy: "%d years"
                    }, Zo = b.prototype;
                    Zo._calendar = Yo, Zo.calendar = ti, Zo._longDateFormat = Go, Zo.longDateFormat = ei, Zo._invalidDate = Uo, Zo.invalidDate = ii, Zo._ordinal = Vo, Zo.ordinal = oi, Zo._ordinalParse = qo, Zo.preparse = ni, Zo.postformat = ni, Zo._relativeTime = Xo, Zo.relativeTime = si, Zo.pastFuture = ri, Zo.set = ai, Zo.months = q, Zo._months = fo, Zo.monthsShort = X, Zo._monthsShort = mo, Zo.monthsParse = Z, Zo.week = ut, Zo._week = xo, Zo.firstDayOfYear = pt, Zo.firstDayOfWeek = ct, Zo.weekdays = Re, Zo._weekdays = Io, Zo.weekdaysMin = je, Zo._weekdaysMin = No, Zo.weekdaysShort = Fe, Zo._weekdaysShort = zo, Zo.weekdaysParse = He, Zo.isPM = qe, Zo._meridiemParse = Ao, Zo.meridiem = Xe, k("en", {
                        ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (t) {
                            var e = t % 10, i = 1 === g(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                            return t + i
                        }
                    }), e.lang = et("moment.lang is deprecated. Use moment.locale instead.", k), e.langData = et("moment.langData is deprecated. Use moment.localeData instead.", M);
                    var Ko = Math.abs, Jo = Mi("ms"), Qo = Mi("s"), $o = Mi("m"), tn = Mi("h"), en = Mi("d"), on = Mi("w"), nn = Mi("M"), sn = Mi("y"), rn = Ci("milliseconds"), an = Ci("seconds"), hn = Ci("minutes"), dn = Ci("hours"), ln = Ci("days"), un = Ci("months"), cn = Ci("years"), pn = Math.round, fn = {
                        s: 45,
                        m: 45,
                        h: 22,
                        d: 26,
                        M: 11
                    }, mn = Math.abs, vn = Nt.prototype;
                    vn.abs = mi, vn.add = gi, vn.subtract = yi, vn.as = ki, vn.asMilliseconds = Jo, vn.asSeconds = Qo, vn.asMinutes = $o, vn.asHours = tn, vn.asDays = en, vn.asWeeks = on, vn.asMonths = nn, vn.asYears = sn, vn.valueOf = Oi, vn._bubble = wi, vn.get = Di, vn.milliseconds = rn, vn.seconds = an, vn.minutes = hn, vn.hours = dn, vn.days = ln, vn.weeks = Ti, vn.months = un, vn.years = cn, vn.humanize = Ii, vn.toISOString = zi, vn.toString = zi, vn.toJSON = zi, vn.locale = ye, vn.localeData = be, vn.toIsoString = et("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", zi), vn.lang = Eo, N("X", 0, 0, "unix"), N("x", 0, 0, "valueOf"), j("x", to), j("X", io), Y("X", function (t, e, i) {
                        i._d = new Date(1e3 * parseFloat(t, 10))
                    }), Y("x", function (t, e, i) {
                        i._d = new Date(g(t))
                    }), e.version = "2.10.5", i(Et), e.fn = Wo, e.min = It, e.max = zt, e.utc = h, e.unix = Qe, e.months = li, e.isDate = n, e.locale = k, e.invalid = c, e.duration = Jt, e.isMoment = m, e.weekdays = ci, e.parseZone = $e, e.localeData = M, e.isDuration = At, e.monthsShort = ui, e.weekdaysMin = fi, e.defineLocale = O, e.weekdaysShort = pi, e.normalizeUnits = C, e.relativeTimeThreshold = Pi;
                    var gn = e;
                    return gn
                })
            }).call(e, i(10)(t))
        },
        function (t, e) {
            t.exports = function (t) {
                return t.webpackPolyfill || (t.deprecate = function () {
                }, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
            }
        },
        function (t, e) {
            function i(t) {
                throw new Error("Cannot find module '" + t + "'.")
            }

            i.keys = function () {
                return []
            }, i.resolve = i, t.exports = i, i.id = 11
        },
        function (t, e) {
            (function (e) {
                function i(t, e, i) {
                    var o = e && i || 0, n = 0;
                    for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function (t) {
                        16 > n && (e[o + n++] = u[t])
                    }); 16 > n;)e[o + n++] = 0;
                    return e
                }

                function o(t, e) {
                    var i = e || 0, o = l;
                    return o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + "-" + o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]] + o[t[i++]]
                }

                function n(t, e, i) {
                    var n = e && i || 0, s = e || [];
                    t = t || {};
                    var r = void 0 !== t.clockseq ? t.clockseq : m, a = void 0 !== t.msecs ? t.msecs : (new Date).getTime(), h = void 0 !== t.nsecs ? t.nsecs : g + 1, d = a - v + (h - g) / 1e4;
                    if (0 > d && void 0 === t.clockseq && (r = r + 1 & 16383), (0 > d || a > v) && void 0 === t.nsecs && (h = 0), h >= 1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                    v = a, g = h, m = r, a += 122192928e5;
                    var l = (1e4 * (268435455 & a) + h) % 4294967296;
                    s[n++] = l >>> 24 & 255, s[n++] = l >>> 16 & 255, s[n++] = l >>> 8 & 255, s[n++] = 255 & l;
                    var u = a / 4294967296 * 1e4 & 268435455;
                    s[n++] = u >>> 8 & 255, s[n++] = 255 & u, s[n++] = u >>> 24 & 15 | 16, s[n++] = u >>> 16 & 255, s[n++] = r >>> 8 | 128, s[n++] = 255 & r;
                    for (var c = t.node || f, p = 0; 6 > p; p++)s[n + p] = c[p];
                    return e ? e : o(s)
                }

                function s(t, e, i) {
                    var n = e && i || 0;
                    "string" == typeof t && (e = "binary" == t ? new Array(16) : null, t = null), t = t || {};
                    var s = t.random || (t.rng || r)();
                    if (s[6] = 15 & s[6] | 64, s[8] = 63 & s[8] | 128, e)for (var a = 0; 16 > a; a++)e[n + a] = s[a];
                    return e || o(s)
                }

                var r, a = "undefined" != typeof window ? window : "undefined" != typeof e ? e : null;
                if (a && a.crypto && crypto.getRandomValues) {
                    var h = new Uint8Array(16);
                    r = function () {
                        return crypto.getRandomValues(h), h
                    }
                }
                if (!r) {
                    var d = new Array(16);
                    r = function () {
                        for (var t, e = 0; 16 > e; e++)0 === (3 & e) && (t = 4294967296 * Math.random()), d[e] = t >>> ((3 & e) << 3) & 255;
                        return d
                    }
                }
                for (var l = [], u = {}, c = 0; 256 > c; c++)l[c] = (c + 256).toString(16).substr(1), u[l[c]] = c;
                var p = r(), f = [1 | p[0], p[1], p[2], p[3], p[4], p[5]], m = 16383 & (p[6] << 8 | p[7]), v = 0, g = 0, y = s;
                y.v1 = n, y.v4 = s, y.parse = i, y.unparse = o, t.exports = y
            }).call(e, function () {
                return this
            }())
        },
        function (t, e) {
            e.prepareElements = function (t) {
                for (var e in t)t.hasOwnProperty(e) && (t[e].redundant = t[e].used, t[e].used = [])
            }, e.cleanupElements = function (t) {
                for (var e in t)if (t.hasOwnProperty(e) && t[e].redundant) {
                    for (var i = 0; i < t[e].redundant.length; i++)t[e].redundant[i].parentNode.removeChild(t[e].redundant[i]);
                    t[e].redundant = []
                }
            }, e.getSVGElement = function (t, e, i) {
                var o;
                return e.hasOwnProperty(t) ? e[t].redundant.length > 0 ? (o = e[t].redundant[0], e[t].redundant.shift()) : (o = document.createElementNS("http://www.w3.org/2000/svg", t), i.appendChild(o)) : (o = document.createElementNS("http://www.w3.org/2000/svg", t), e[t] = {
                        used: [],
                        redundant: []
                    }, i.appendChild(o)), e[t].used.push(o), o
            }, e.getDOMElement = function (t, e, i, o) {
                var n;
                return e.hasOwnProperty(t) ? e[t].redundant.length > 0 ? (n = e[t].redundant[0], e[t].redundant.shift()) : (n = document.createElement(t), void 0 !== o ? i.insertBefore(n, o) : i.appendChild(n)) : (n = document.createElement(t), e[t] = {
                        used: [],
                        redundant: []
                    }, void 0 !== o ? i.insertBefore(n, o) : i.appendChild(n)), e[t].used.push(n), n
            }, e.drawPoint = function (t, i, o, n, s, r) {
                var a;
                if ("circle" == o.style ? (a = e.getSVGElement("circle", n, s), a.setAttributeNS(null, "cx", t), a.setAttributeNS(null, "cy", i), a.setAttributeNS(null, "r", .5 * o.size)) : (a = e.getSVGElement("rect", n, s), a.setAttributeNS(null, "x", t - .5 * o.size), a.setAttributeNS(null, "y", i - .5 * o.size), a.setAttributeNS(null, "width", o.size), a.setAttributeNS(null, "height", o.size)), void 0 !== o.style && a.setAttributeNS(null, "style", o.style), a.setAttributeNS(null, "class", o.className + " vis-point"), r) {
                    var h = e.getSVGElement("text", n, s);
                    r.xOffset && (t += r.xOffset), r.yOffset && (i += r.yOffset), r.content && (h.textContent = r.content), r.className && h.setAttributeNS(null, "class", r.className + " vis-label"), h.setAttributeNS(null, "x", t), h.setAttributeNS(null, "y", i)
                }
                return a
            }, e.drawBar = function (t, i, o, n, s, r, a, h) {
                if (0 != n) {
                    0 > n && (n *= -1, i -= n);
                    var d = e.getSVGElement("rect", r, a);
                    d.setAttributeNS(null, "x", t - .5 * o), d.setAttributeNS(null, "y", i), d.setAttributeNS(null, "width", o), d.setAttributeNS(null, "height", n), d.setAttributeNS(null, "class", s), h && d.setAttributeNS(null, "style", h)
                }
            }
        },
        function (t, e, i) {
            function o(t, e) {
                if (t && !Array.isArray(t) && (e = t, t = null), this._options = e || {}, this._data = {}, this.length = 0, this._fieldId = this._options.fieldId || "id", this._type = {}, this._options.type)for (var i in this._options.type)if (this._options.type.hasOwnProperty(i)) {
                    var o = this._options.type[i];
                    "Date" == o || "ISODate" == o || "ASPDate" == o ? this._type[i] = "Date" : this._type[i] = o
                }
                if (this._options.convert)throw new Error('Option "convert" is deprecated. Use "type" instead.');
                this._subscribers = {}, t && this.add(t), this.setOptions(e)
            }

            var n = i(7), s = i(15);
            o.prototype.setOptions = function (t) {
                t && void 0 !== t.queue && (t.queue === !1 ? this._queue && (this._queue.destroy(), delete this._queue) : (this._queue || (this._queue = s.extend(this, {replace: ["add", "update", "remove"]})), "object" == typeof t.queue && this._queue.setOptions(t.queue)))
            }, o.prototype.on = function (t, e) {
                var i = this._subscribers[t];
                i || (i = [], this._subscribers[t] = i), i.push({callback: e})
            }, o.prototype.subscribe = function () {
                throw new Error("DataSet.subscribe is deprecated. Use DataSet.on instead.")
            }, o.prototype.off = function (t, e) {
                var i = this._subscribers[t];
                i && (this._subscribers[t] = i.filter(function (t) {
                    return t.callback != e
                }))
            }, o.prototype.unsubscribe = function () {
                throw new Error("DataSet.unsubscribe is deprecated. Use DataSet.off instead.")
            }, o.prototype._trigger = function (t, e, i) {
                if ("*" == t)throw new Error("Cannot trigger event *");
                var o = [];
                t in this._subscribers && (o = o.concat(this._subscribers[t])), "*" in this._subscribers && (o = o.concat(this._subscribers["*"]));
                for (var n = 0; n < o.length; n++) {
                    var s = o[n];
                    s.callback && s.callback(t, e, i || null)
                }
            }, o.prototype.add = function (t, e) {
                var i, o = [], n = this;
                if (Array.isArray(t))for (var s = 0, r = t.length; r > s; s++)i = n._addItem(t[s]), o.push(i); else {
                    if (!(t instanceof Object))throw new Error("Unknown dataType");
                    i = n._addItem(t), o.push(i)
                }
                return o.length && this._trigger("add", {items: o}, e), o
            }, o.prototype.update = function (t, e) {
                var i = [], o = [], n = [], s = this, r = s._fieldId, a = function (t) {
                    var e = t[r];
                    s._data[e] ? (e = s._updateItem(t), o.push(e), n.push(t)) : (e = s._addItem(t), i.push(e))
                };
                if (Array.isArray(t))for (var h = 0, d = t.length; d > h; h++)a(t[h]); else {
                    if (!(t instanceof Object))throw new Error("Unknown dataType");
                    a(t)
                }
                return i.length && this._trigger("add", {items: i}, e), o.length && this._trigger("update", {
                    items: o,
                    data: n
                }, e), i.concat(o)
            }, o.prototype.get = function (t) {
                var e, i, o, s = this, r = n.getType(arguments[0]);
                "String" == r || "Number" == r ? (e = arguments[0], o = arguments[1]) : "Array" == r ? (i = arguments[0], o = arguments[1]) : o = arguments[0];
                var a;
                if (o && o.returnType) {
                    var h = ["Array", "Object"];
                    a = -1 == h.indexOf(o.returnType) ? "Array" : o.returnType
                } else a = "Array";
                var d, l, u, c, p = o && o.type || this._options.type, f = o && o.filter, m = [];
                if (void 0 != e) d = s._getItem(e, p), f && !f(d) && (d = null); else if (void 0 != i)for (u = 0, c = i.length; c > u; u++)d = s._getItem(i[u], p), (!f || f(d)) && m.push(d); else for (l in this._data)this._data.hasOwnProperty(l) && (d = s._getItem(l, p), (!f || f(d)) && m.push(d));
                if (o && o.order && void 0 == e && this._sort(m, o.order), o && o.fields) {
                    var v = o.fields;
                    if (void 0 != e) d = this._filterFields(d, v); else for (u = 0, c = m.length; c > u; u++)m[u] = this._filterFields(m[u], v)
                }
                if ("Object" == a) {
                    var g = {};
                    for (u = 0; u < m.length; u++)g[m[u].id] = m[u];
                    return g
                }
                return void 0 != e ? d : m
            }, o.prototype.getIds = function (t) {
                var e, i, o, n, s, r = this._data, a = t && t.filter, h = t && t.order, d = t && t.type || this._options.type, l = [];
                if (a)if (h) {
                    s = [];
                    for (o in r)r.hasOwnProperty(o) && (n = this._getItem(o, d), a(n) && s.push(n));
                    for (this._sort(s, h), e = 0, i = s.length; i > e; e++)l[e] = s[e][this._fieldId]
                } else for (o in r)r.hasOwnProperty(o) && (n = this._getItem(o, d), a(n) && l.push(n[this._fieldId])); else if (h) {
                    s = [];
                    for (o in r)r.hasOwnProperty(o) && s.push(r[o]);
                    for (this._sort(s, h), e = 0, i = s.length; i > e; e++)l[e] = s[e][this._fieldId]
                } else for (o in r)r.hasOwnProperty(o) && (n = r[o], l.push(n[this._fieldId]));
                return l
            }, o.prototype.getDataSet = function () {
                return this
            }, o.prototype.forEach = function (t, e) {
                var i, o, n = e && e.filter, s = e && e.type || this._options.type, r = this._data;
                if (e && e.order)for (var a = this.get(e), h = 0, d = a.length; d > h; h++)i = a[h], o = i[this._fieldId], t(i, o); else for (o in r)r.hasOwnProperty(o) && (i = this._getItem(o, s), (!n || n(i)) && t(i, o))
            }, o.prototype.map = function (t, e) {
                var i, o = e && e.filter, n = e && e.type || this._options.type, s = [], r = this._data;
                for (var a in r)r.hasOwnProperty(a) && (i = this._getItem(a, n), (!o || o(i)) && s.push(t(i, a)));
                return e && e.order && this._sort(s, e.order), s
            }, o.prototype._filterFields = function (t, e) {
                if (!t)return t;
                var i = {};
                if (Array.isArray(e))for (var o in t)t.hasOwnProperty(o) && -1 != e.indexOf(o) && (i[o] = t[o]); else for (var o in t)t.hasOwnProperty(o) && e.hasOwnProperty(o) && (i[e[o]] = t[o]);
                return i
            }, o.prototype._sort = function (t, e) {
                if (n.isString(e)) {
                    var i = e;
                    t.sort(function (t, e) {
                        var o = t[i], n = e[i];
                        return o > n ? 1 : n > o ? -1 : 0
                    })
                } else {
                    if ("function" != typeof e)throw new TypeError("Order must be a function or a string");
                    t.sort(e)
                }
            }, o.prototype.remove = function (t, e) {
                var i, o, n, s = [];
                if (Array.isArray(t))for (i = 0, o = t.length; o > i; i++)n = this._remove(t[i]), null != n && s.push(n); else n = this._remove(t), null != n && s.push(n);
                return s.length && this._trigger("remove", {items: s}, e), s
            }, o.prototype._remove = function (t) {
                if (n.isNumber(t) || n.isString(t)) {
                    if (this._data[t])return delete this._data[t], this.length--, t
                } else if (t instanceof Object) {
                    var e = t[this._fieldId];
                    if (e && this._data[e])return delete this._data[e], this.length--, e
                }
                return null
            }, o.prototype.clear = function (t) {
                var e = Object.keys(this._data);
                return this._data = {}, this.length = 0, this._trigger("remove", {items: e}, t), e
            }, o.prototype.max = function (t) {
                var e = this._data, i = null, o = null;
                for (var n in e)if (e.hasOwnProperty(n)) {
                    var s = e[n], r = s[t];
                    null != r && (!i || r > o) && (i = s, o = r)
                }
                return i
            }, o.prototype.min = function (t) {
                var e = this._data, i = null, o = null;
                for (var n in e)if (e.hasOwnProperty(n)) {
                    var s = e[n], r = s[t];
                    null != r && (!i || o > r) && (i = s, o = r)
                }
                return i
            }, o.prototype.distinct = function (t) {
                var e, i = this._data, o = [], s = this._options.type && this._options.type[t] || null, r = 0;
                for (var a in i)if (i.hasOwnProperty(a)) {
                    var h = i[a], d = h[t], l = !1;
                    for (e = 0; r > e; e++)if (o[e] == d) {
                        l = !0;
                        break
                    }
                    l || void 0 === d || (o[r] = d, r++)
                }
                if (s)for (e = 0; e < o.length; e++)o[e] = n.convert(o[e], s);
                return o
            }, o.prototype._addItem = function (t) {
                var e = t[this._fieldId];
                if (void 0 != e) {
                    if (this._data[e])throw new Error("Cannot add item: item with id " + e + " already exists")
                } else e = n.randomUUID(), t[this._fieldId] = e;
                var i = {};
                for (var o in t)if (t.hasOwnProperty(o)) {
                    var s = this._type[o];
                    i[o] = n.convert(t[o], s)
                }
                return this._data[e] = i, this.length++, e
            }, o.prototype._getItem = function (t, e) {
                var i, o, s = this._data[t];
                if (!s)return null;
                var r = {};
                if (e)for (i in s)s.hasOwnProperty(i) && (o = s[i], r[i] = n.convert(o, e[i])); else for (i in s)s.hasOwnProperty(i) && (o = s[i], r[i] = o);
                return r
            }, o.prototype._updateItem = function (t) {
                var e = t[this._fieldId];
                if (void 0 == e)throw new Error("Cannot update item: item has no id (item: " + JSON.stringify(t) + ")");
                var i = this._data[e];
                if (!i)throw new Error("Cannot update item: no item with id " + e + " found");
                for (var o in t)if (t.hasOwnProperty(o)) {
                    var s = this._type[o];
                    i[o] = n.convert(t[o], s)
                }
                return e
            }, t.exports = o
        },
        function (t, e) {
            function i(t) {
                this.delay = null, this.max = 1 / 0, this._queue = [], this._timeout = null, this._extended = null, this.setOptions(t)
            }

            i.prototype.setOptions = function (t) {
                t && "undefined" != typeof t.delay && (this.delay = t.delay), t && "undefined" != typeof t.max && (this.max = t.max), this._flushIfNeeded()
            }, i.extend = function (t, e) {
                var o = new i(e);
                if (void 0 !== t.flush)throw new Error("Target object already has a property flush");
                t.flush = function () {
                    o.flush()
                };
                var n = [
                    {name: "flush", original: void 0}
                ];
                if (e && e.replace)for (var s = 0; s < e.replace.length; s++) {
                    var r = e.replace[s];
                    n.push({name: r, original: t[r]}), o.replace(t, r)
                }
                return o._extended = {object: t, methods: n}, o
            }, i.prototype.destroy = function () {
                if (this.flush(), this._extended) {
                    for (var t = this._extended.object, e = this._extended.methods, i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.original ? t[o.name] = o.original : delete t[o.name]
                    }
                    this._extended = null
                }
            }, i.prototype.replace = function (t, e) {
                var i = this, o = t[e];
                if (!o)throw new Error("Method " + e + " undefined");
                t[e] = function () {
                    for (var t = [], e = 0; e < arguments.length; e++)t[e] = arguments[e];
                    i.queue({args: t, fn: o, context: this})
                }
            }, i.prototype.queue = function (t) {
                "function" == typeof t ? this._queue.push({fn: t}) : this._queue.push(t), this._flushIfNeeded()
            }, i.prototype._flushIfNeeded = function () {
                if (this._queue.length > this.max && this.flush(), clearTimeout(this._timeout), this.queue.length > 0 && "number" == typeof this.delay) {
                    var t = this;
                    this._timeout = setTimeout(function () {
                        t.flush()
                    }, this.delay)
                }
            }, i.prototype.flush = function () {
                for (; this._queue.length > 0;) {
                    var t = this._queue.shift();
                    t.fn.apply(t.context || t.fn, t.args || [])
                }
            }, t.exports = i
        },
        function (t, e, i) {
            function o(t, e) {
                this._data = null, this._ids = {}, this.length = 0, this._options = e || {}, this._fieldId = "id", this._subscribers = {};
                var i = this;
                this.listener = function () {
                    i._onEvent.apply(i, arguments)
                }, this.setData(t)
            }

            var n = i(7), s = i(14);
            o.prototype.setData = function (t) {
                var e, i, o;
                if (this._data) {
                    this._data.off && this._data.off("*", this.listener), e = [];
                    for (var n in this._ids)this._ids.hasOwnProperty(n) && e.push(n);
                    this._ids = {}, this.length = 0, this._trigger("remove", {items: e})
                }
                if (this._data = t, this._data) {
                    for (this._fieldId = this._options.fieldId || this._data && this._data.options && this._data.options.fieldId || "id", e = this._data.getIds({filter: this._options && this._options.filter}), i = 0, o = e.length; o > i; i++)n = e[i], this._ids[n] = !0;
                    this.length = e.length, this._trigger("add", {items: e}), this._data.on && this._data.on("*", this.listener)
                }
            }, o.prototype.refresh = function () {
                for (var t, e = this._data.getIds({filter: this._options && this._options.filter}), i = {}, o = [], n = [], s = 0; s < e.length; s++)t = e[s], i[t] = !0, this._ids[t] || (o.push(t), this._ids[t] = !0, this.length++);
                for (t in this._ids)this._ids.hasOwnProperty(t) && (i[t] || (n.push(t), delete this._ids[t], this.length--));
                o.length && this._trigger("add", {items: o}), n.length && this._trigger("remove", {items: n})
            }, o.prototype.get = function (t) {
                var e, i, o, s = this, r = n.getType(arguments[0]);
                "String" == r || "Number" == r || "Array" == r ? (e = arguments[0], i = arguments[1], o = arguments[2]) : (i = arguments[0], o = arguments[1]);
                var a = n.extend({}, this._options, i);
                this._options.filter && i && i.filter && (a.filter = function (t) {
                    return s._options.filter(t) && i.filter(t)
                });
                var h = [];
                return void 0 != e && h.push(e), h.push(a), h.push(o), this._data && this._data.get.apply(this._data, h)
            }, o.prototype.getIds = function (t) {
                var e;
                if (this._data) {
                    var i, o = this._options.filter;
                    i = t && t.filter ? o ? function (e) {
                                return o(e) && t.filter(e)
                            } : t.filter : o, e = this._data.getIds({filter: i, order: t && t.order})
                } else e = [];
                return e
            }, o.prototype.getDataSet = function () {
                for (var t = this; t instanceof o;)t = t._data;
                return t || null
            }, o.prototype._onEvent = function (t, e, i) {
                var o, n, s, r, a = e && e.items, h = this._data, d = [], l = [], u = [], c = [];
                if (a && h) {
                    switch (t) {
                        case"add":
                            for (o = 0, n = a.length; n > o; o++)s = a[o], r = this.get(s), r && (this._ids[s] = !0, l.push(s));
                            break;
                        case"update":
                            for (o = 0, n = a.length; n > o; o++)s = a[o], r = this.get(s), r ? this._ids[s] ? (u.push(s), d.push(e.data[o])) : (this._ids[s] = !0, l.push(s)) : this._ids[s] && (delete this._ids[s], c.push(s));
                            break;
                        case"remove":
                            for (o = 0, n = a.length; n > o; o++)s = a[o], this._ids[s] && (delete this._ids[s], c.push(s))
                    }
                    this.length += l.length - c.length, l.length && this._trigger("add", {items: l}, i), u.length && this._trigger("update", {
                        items: u,
                        data: d
                    }, i), c.length && this._trigger("remove", {items: c}, i)
                }
            }, o.prototype.on = s.prototype.on, o.prototype.off = s.prototype.off, o.prototype._trigger = s.prototype._trigger, o.prototype.subscribe = o.prototype.on, o.prototype.unsubscribe = o.prototype.off, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                if (!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");
                this.containerElement = t, this.width = "400px", this.height = "400px", this.margin = 10, this.defaultXCenter = "55%", this.defaultYCenter = "50%", this.xLabel = "x", this.yLabel = "y", this.zLabel = "z";
                var n = function (t) {
                    return t
                };
                this.xValueLabel = n, this.yValueLabel = n, this.zValueLabel = n, this.filterLabel = "time", this.legendLabel = "value", this.style = o.STYLE.DOT, this.showPerspective = !0, this.showGrid = !0, this.keepAspectRatio = !0, this.showShadow = !1, this.showGrayBottom = !1, this.showTooltip = !1, this.verticalRatio = .5, this.animationInterval = 1e3, this.animationPreload = !1, this.camera = new c, this.camera.setArmRotation(1, .5), this.camera.setArmLength(1.7), this.eye = new l(0, 0, -1), this.dataTable = null, this.dataPoints = null, this.colX = void 0, this.colY = void 0, this.colZ = void 0, this.colValue = void 0, this.colFilter = void 0, this.xMin = 0, this.xStep = void 0, this.xMax = 1, this.yMin = 0, this.yStep = void 0, this.yMax = 1, this.zMin = 0, this.zStep = void 0, this.zMax = 1, this.valueMin = 0, this.valueMax = 1, this.xBarWidth = 1, this.yBarWidth = 1, this.axisColor = "#4D4D4D", this.gridColor = "#D3D3D3", this.dataColor = {
                    fill: "#7DC1FF",
                    stroke: "#3267D2",
                    strokeWidth: 1
                }, this.create(), this.setOptions(i), e && this.setData(e)
            }

            function n(t) {
                return "clientX" in t ? t.clientX : t.targetTouches[0] && t.targetTouches[0].clientX || 0
            }

            function s(t) {
                return "clientY" in t ? t.clientY : t.targetTouches[0] && t.targetTouches[0].clientY || 0
            }

            var r = i(19), a = i(14), h = i(16), d = i(7), l = i(20), u = i(18), c = i(21), p = i(22), f = i(23), m = i(24);
            r(o.prototype), o.prototype._setScale = function () {
                this.scale = new l(1 / (this.xMax - this.xMin), 1 / (this.yMax - this.yMin), 1 / (this.zMax - this.zMin)), this.keepAspectRatio && (this.scale.x < this.scale.y ? this.scale.y = this.scale.x : this.scale.x = this.scale.y), this.scale.z *= this.verticalRatio, this.scale.value = 1 / (this.valueMax - this.valueMin);
                var t = (this.xMax + this.xMin) / 2 * this.scale.x, e = (this.yMax + this.yMin) / 2 * this.scale.y, i = (this.zMax + this.zMin) / 2 * this.scale.z;
                this.camera.setArmLocation(t, e, i)
            }, o.prototype._convert3Dto2D = function (t) {
                var e = this._convertPointToTranslation(t);
                return this._convertTranslationToScreen(e)
            }, o.prototype._convertPointToTranslation = function (t) {
                var e = t.x * this.scale.x, i = t.y * this.scale.y, o = t.z * this.scale.z, n = this.camera.getCameraLocation().x, s = this.camera.getCameraLocation().y, r = this.camera.getCameraLocation().z, a = Math.sin(this.camera.getCameraRotation().x), h = Math.cos(this.camera.getCameraRotation().x), d = Math.sin(this.camera.getCameraRotation().y), u = Math.cos(this.camera.getCameraRotation().y), c = Math.sin(this.camera.getCameraRotation().z), p = Math.cos(this.camera.getCameraRotation().z), f = u * (c * (i - s) + p * (e - n)) - d * (o - r), m = a * (u * (o - r) + d * (c * (i - s) + p * (e - n))) + h * (p * (i - s) - c * (e - n)), v = h * (u * (o - r) + d * (c * (i - s) + p * (e - n))) - a * (p * (i - s) - c * (e - n));
                return new l(f, m, v)
            }, o.prototype._convertTranslationToScreen = function (t) {
                var e, i, o = this.eye.x, n = this.eye.y, s = this.eye.z, r = t.x, a = t.y, h = t.z;
                return this.showPerspective ? (e = (r - o) * (s / h), i = (a - n) * (s / h)) : (e = r * -(s / this.camera.getArmLength()), i = a * -(s / this.camera.getArmLength())), new u(this.xcenter + e * this.frame.canvas.clientWidth, this.ycenter - i * this.frame.canvas.clientWidth)
            }, o.prototype._setBackgroundColor = function (t) {
                var e = "white", i = "gray", o = 1;
                if ("string" == typeof t) e = t, i = "none", o = 0; else if ("object" == typeof t) void 0 !== t.fill && (e = t.fill), void 0 !== t.stroke && (i = t.stroke), void 0 !== t.strokeWidth && (o = t.strokeWidth); else if (void 0 !== t)throw"Unsupported type of backgroundColor";
                this.frame.style.backgroundColor = e, this.frame.style.borderColor = i, this.frame.style.borderWidth = o + "px", this.frame.style.borderStyle = "solid"
            }, o.STYLE = {
                BAR: 0,
                BARCOLOR: 1,
                BARSIZE: 2,
                DOT: 3,
                DOTLINE: 4,
                DOTCOLOR: 5,
                DOTSIZE: 6,
                GRID: 7,
                LINE: 8,
                SURFACE: 9
            }, o.prototype._getStyleNumber = function (t) {
                switch (t) {
                    case"dot":
                        return o.STYLE.DOT;
                    case"dot-line":
                        return o.STYLE.DOTLINE;
                    case"dot-color":
                        return o.STYLE.DOTCOLOR;
                    case"dot-size":
                        return o.STYLE.DOTSIZE;
                    case"line":
                        return o.STYLE.LINE;
                    case"grid":
                        return o.STYLE.GRID;
                    case"surface":
                        return o.STYLE.SURFACE;
                    case"bar":
                        return o.STYLE.BAR;
                    case"bar-color":
                        return o.STYLE.BARCOLOR;
                    case"bar-size":
                        return o.STYLE.BARSIZE
                }
                return -1
            }, o.prototype._determineColumnIndexes = function (t, e) {
                if (this.style === o.STYLE.DOT || this.style === o.STYLE.DOTLINE || this.style === o.STYLE.LINE || this.style === o.STYLE.GRID || this.style === o.STYLE.SURFACE || this.style === o.STYLE.BAR) this.colX = 0, this.colY = 1, this.colZ = 2, this.colValue = void 0, t.getNumberOfColumns() > 3 && (this.colFilter = 3); else {
                    if (this.style !== o.STYLE.DOTCOLOR && this.style !== o.STYLE.DOTSIZE && this.style !== o.STYLE.BARCOLOR && this.style !== o.STYLE.BARSIZE)throw'Unknown style "' + this.style + '"';
                    this.colX = 0, this.colY = 1, this.colZ = 2, this.colValue = 3, t.getNumberOfColumns() > 4 && (this.colFilter = 4)
                }
            }, o.prototype.getNumberOfRows = function (t) {
                return t.length
            }, o.prototype.getNumberOfColumns = function (t) {
                var e = 0;
                for (var i in t[0])t[0].hasOwnProperty(i) && e++;
                return e
            }, o.prototype.getDistinctValues = function (t, e) {
                for (var i = [], o = 0; o < t.length; o++)-1 == i.indexOf(t[o][e]) && i.push(t[o][e]);
                return i
            }, o.prototype.getColumnRange = function (t, e) {
                for (var i = {
                    min: t[0][e],
                    max: t[0][e]
                }, o = 0; o < t.length; o++)i.min > t[o][e] && (i.min = t[o][e]), i.max < t[o][e] && (i.max = t[o][e]);
                return i
            }, o.prototype._dataInitialize = function (t, e) {
                var i = this;
                if (this.dataSet && this.dataSet.off("*", this._onChange), void 0 !== t) {
                    Array.isArray(t) && (t = new a(t));
                    var n;
                    if (!(t instanceof a || t instanceof h))throw new Error("Array, DataSet, or DataView expected");
                    if (n = t.get(), 0 != n.length) {
                        this.dataSet = t, this.dataTable = n, this._onChange = function () {
                            i.setData(i.dataSet)
                        }, this.dataSet.on("*", this._onChange), this.colX = "x", this.colY = "y", this.colZ = "z", this.colValue = "style", this.colFilter = "filter", n[0].hasOwnProperty("filter") && void 0 === this.dataFilter && (this.dataFilter = new p(t, this.colFilter, this), this.dataFilter.setOnLoadCallback(function () {
                            i.redraw()
                        }));
                        var s = this.style == o.STYLE.BAR || this.style == o.STYLE.BARCOLOR || this.style == o.STYLE.BARSIZE;
                        if (s) {
                            if (void 0 !== this.defaultXBarWidth) this.xBarWidth = this.defaultXBarWidth; else {
                                var r = this.getDistinctValues(n, this.colX);
                                this.xBarWidth = r[1] - r[0] || 1
                            }
                            if (void 0 !== this.defaultYBarWidth) this.yBarWidth = this.defaultYBarWidth; else {
                                var d = this.getDistinctValues(n, this.colY);
                                this.yBarWidth = d[1] - d[0] || 1
                            }
                        }
                        var l = this.getColumnRange(n, this.colX);
                        s && (l.min -= this.xBarWidth / 2, l.max += this.xBarWidth / 2), this.xMin = void 0 !== this.defaultXMin ? this.defaultXMin : l.min, this.xMax = void 0 !== this.defaultXMax ? this.defaultXMax : l.max, this.xMax <= this.xMin && (this.xMax = this.xMin + 1), this.xStep = void 0 !== this.defaultXStep ? this.defaultXStep : (this.xMax - this.xMin) / 5;
                        var u = this.getColumnRange(n, this.colY);
                        s && (u.min -= this.yBarWidth / 2, u.max += this.yBarWidth / 2), this.yMin = void 0 !== this.defaultYMin ? this.defaultYMin : u.min, this.yMax = void 0 !== this.defaultYMax ? this.defaultYMax : u.max, this.yMax <= this.yMin && (this.yMax = this.yMin + 1), this.yStep = void 0 !== this.defaultYStep ? this.defaultYStep : (this.yMax - this.yMin) / 5;
                        var c = this.getColumnRange(n, this.colZ);
                        if (this.zMin = void 0 !== this.defaultZMin ? this.defaultZMin : c.min, this.zMax = void 0 !== this.defaultZMax ? this.defaultZMax : c.max, this.zMax <= this.zMin && (this.zMax = this.zMin + 1), this.zStep = void 0 !== this.defaultZStep ? this.defaultZStep : (this.zMax - this.zMin) / 5, void 0 !== this.colValue) {
                            var f = this.getColumnRange(n, this.colValue);
                            this.valueMin = void 0 !== this.defaultValueMin ? this.defaultValueMin : f.min, this.valueMax = void 0 !== this.defaultValueMax ? this.defaultValueMax : f.max, this.valueMax <= this.valueMin && (this.valueMax = this.valueMin + 1)
                        }
                        this._setScale()
                    }
                }
            }, o.prototype._getDataPoints = function (t) {
                var e, i, n, s, r, a, h = [];
                if (this.style === o.STYLE.GRID || this.style === o.STYLE.SURFACE) {
                    var d = [], u = [];
                    for (n = 0; n < this.getNumberOfRows(t); n++)e = t[n][this.colX] || 0, i = t[n][this.colY] || 0, -1 === d.indexOf(e) && d.push(e), -1 === u.indexOf(i) && u.push(i);
                    var c = function (t, e) {
                        return t - e
                    };
                    d.sort(c), u.sort(c);
                    var p = [];
                    for (n = 0; n < t.length; n++) {
                        e = t[n][this.colX] || 0, i = t[n][this.colY] || 0, s = t[n][this.colZ] || 0;
                        var f = d.indexOf(e), m = u.indexOf(i);
                        void 0 === p[f] && (p[f] = []);
                        var v = new l;
                        v.x = e, v.y = i, v.z = s, r = {}, r.point = v, r.trans = void 0, r.screen = void 0, r.bottom = new l(e, i, this.zMin), p[f][m] = r, h.push(r)
                    }
                    for (e = 0; e < p.length; e++)for (i = 0; i < p[e].length; i++)p[e][i] && (p[e][i].pointRight = e < p.length - 1 ? p[e + 1][i] : void 0, p[e][i].pointTop = i < p[e].length - 1 ? p[e][i + 1] : void 0, p[e][i].pointCross = e < p.length - 1 && i < p[e].length - 1 ? p[e + 1][i + 1] : void 0)
                } else for (n = 0; n < t.length; n++)a = new l, a.x = t[n][this.colX] || 0, a.y = t[n][this.colY] || 0, a.z = t[n][this.colZ] || 0, void 0 !== this.colValue && (a.value = t[n][this.colValue] || 0), r = {}, r.point = a, r.bottom = new l(a.x, a.y, this.zMin), r.trans = void 0, r.screen = void 0, h.push(r);
                return h
            }, o.prototype.create = function () {
                for (; this.containerElement.hasChildNodes();)this.containerElement.removeChild(this.containerElement.firstChild);
                this.frame = document.createElement("div"), this.frame.style.position = "relative", this.frame.style.overflow = "hidden", this.frame.canvas = document.createElement("canvas"), this.frame.canvas.style.position = "relative", this.frame.appendChild(this.frame.canvas);
                var t = document.createElement("DIV");
                t.style.color = "red", t.style.fontWeight = "bold", t.style.padding = "10px", t.innerHTML = "Error: your browser does not support HTML canvas", this.frame.canvas.appendChild(t), this.frame.filter = document.createElement("div"), this.frame.filter.style.position = "absolute", this.frame.filter.style.bottom = "0px", this.frame.filter.style.left = "0px", this.frame.filter.style.width = "100%", this.frame.appendChild(this.frame.filter);
                var e = this, i = function (t) {
                    e._onMouseDown(t)
                }, o = function (t) {
                    e._onTouchStart(t)
                }, n = function (t) {
                    e._onWheel(t)
                }, s = function (t) {
                    e._onTooltip(t)
                };
                d.addEventListener(this.frame.canvas, "keydown", onkeydown), d.addEventListener(this.frame.canvas, "mousedown", i), d.addEventListener(this.frame.canvas, "touchstart", o), d.addEventListener(this.frame.canvas, "mousewheel", n), d.addEventListener(this.frame.canvas, "mousemove", s), this.containerElement.appendChild(this.frame)
            }, o.prototype.setSize = function (t, e) {
                this.frame.style.width = t, this.frame.style.height = e, this._resizeCanvas()
            }, o.prototype._resizeCanvas = function () {
                this.frame.canvas.style.width = "100%", this.frame.canvas.style.height = "100%", this.frame.canvas.width = this.frame.canvas.clientWidth, this.frame.canvas.height = this.frame.canvas.clientHeight, this.frame.filter.style.width = this.frame.canvas.clientWidth - 20 + "px"
            }, o.prototype.animationStart = function () {
                if (!this.frame.filter || !this.frame.filter.slider)throw"No animation available";
                this.frame.filter.slider.play()
            }, o.prototype.animationStop = function () {
                this.frame.filter && this.frame.filter.slider && this.frame.filter.slider.stop()
            }, o.prototype._resizeCenter = function () {
                "%" === this.defaultXCenter.charAt(this.defaultXCenter.length - 1) ? this.xcenter = parseFloat(this.defaultXCenter) / 100 * this.frame.canvas.clientWidth : this.xcenter = parseFloat(this.defaultXCenter), "%" === this.defaultYCenter.charAt(this.defaultYCenter.length - 1) ? this.ycenter = parseFloat(this.defaultYCenter) / 100 * (this.frame.canvas.clientHeight - this.frame.filter.clientHeight) : this.ycenter = parseFloat(this.defaultYCenter)
            }, o.prototype.setCameraPosition = function (t) {
                void 0 !== t && (void 0 !== t.horizontal && void 0 !== t.vertical && this.camera.setArmRotation(t.horizontal, t.vertical), void 0 !== t.distance && this.camera.setArmLength(t.distance), this.redraw())
            }, o.prototype.getCameraPosition = function () {
                var t = this.camera.getArmRotation();
                return t.distance = this.camera.getArmLength(), t
            }, o.prototype._readData = function (t) {
                this._dataInitialize(t, this.style), this.dataFilter ? this.dataPoints = this.dataFilter._getDataPoints() : this.dataPoints = this._getDataPoints(this.dataTable), this._redrawFilter()
            }, o.prototype.setData = function (t) {
                this._readData(t), this.redraw(), this.animationAutoStart && this.dataFilter && this.animationStart()
            }, o.prototype.setOptions = function (t) {
                var e = void 0;
                if (this.animationStop(), void 0 !== t) {
                    if (void 0 !== t.width && (this.width = t.width), void 0 !== t.height && (this.height = t.height), void 0 !== t.xCenter && (this.defaultXCenter = t.xCenter), void 0 !== t.yCenter && (this.defaultYCenter = t.yCenter), void 0 !== t.filterLabel && (this.filterLabel = t.filterLabel), void 0 !== t.legendLabel && (this.legendLabel = t.legendLabel), void 0 !== t.xLabel && (this.xLabel = t.xLabel), void 0 !== t.yLabel && (this.yLabel = t.yLabel), void 0 !== t.zLabel && (this.zLabel = t.zLabel), void 0 !== t.xValueLabel && (this.xValueLabel = t.xValueLabel), void 0 !== t.yValueLabel && (this.yValueLabel = t.yValueLabel), void 0 !== t.zValueLabel && (this.zValueLabel = t.zValueLabel), void 0 !== t.style) {
                        var i = this._getStyleNumber(t.style);
                        -1 !== i && (this.style = i)
                    }
                    void 0 !== t.showGrid && (this.showGrid = t.showGrid), void 0 !== t.showPerspective && (this.showPerspective = t.showPerspective), void 0 !== t.showShadow && (this.showShadow = t.showShadow), void 0 !== t.tooltip && (this.showTooltip = t.tooltip), void 0 !== t.showAnimationControls && (this.showAnimationControls = t.showAnimationControls), void 0 !== t.keepAspectRatio && (this.keepAspectRatio = t.keepAspectRatio), void 0 !== t.verticalRatio && (this.verticalRatio = t.verticalRatio), void 0 !== t.animationInterval && (this.animationInterval = t.animationInterval), void 0 !== t.animationPreload && (this.animationPreload = t.animationPreload), void 0 !== t.animationAutoStart && (this.animationAutoStart = t.animationAutoStart), void 0 !== t.xBarWidth && (this.defaultXBarWidth = t.xBarWidth), void 0 !== t.yBarWidth && (this.defaultYBarWidth = t.yBarWidth), void 0 !== t.xMin && (this.defaultXMin = t.xMin), void 0 !== t.xStep && (this.defaultXStep = t.xStep), void 0 !== t.xMax && (this.defaultXMax = t.xMax), void 0 !== t.yMin && (this.defaultYMin = t.yMin), void 0 !== t.yStep && (this.defaultYStep = t.yStep), void 0 !== t.yMax && (this.defaultYMax = t.yMax), void 0 !== t.zMin && (this.defaultZMin = t.zMin), void 0 !== t.zStep && (this.defaultZStep = t.zStep), void 0 !== t.zMax && (this.defaultZMax = t.zMax), void 0 !== t.valueMin && (this.defaultValueMin = t.valueMin), void 0 !== t.valueMax && (this.defaultValueMax = t.valueMax), void 0 !== t.backgroundColor && this._setBackgroundColor(t.backgroundColor), void 0 !== t.cameraPosition && (e = t.cameraPosition), void 0 !== e && (this.camera.setArmRotation(e.horizontal, e.vertical), this.camera.setArmLength(e.distance)), void 0 !== t.axisColor && (this.axisColor = t.axisColor), void 0 !== t.gridColor && (this.gridColor = t.gridColor), t.dataColor && ("string" == typeof t.dataColor ? (this.dataColor.fill = t.dataColor, this.dataColor.stroke = t.dataColor) : (t.dataColor.fill && (this.dataColor.fill = t.dataColor.fill), t.dataColor.stroke && (this.dataColor.stroke = t.dataColor.stroke), void 0 !== t.dataColor.strokeWidth && (this.dataColor.strokeWidth = t.dataColor.strokeWidth)))
                }
                this.setSize(this.width, this.height), this.dataTable && this.setData(this.dataTable), this.animationAutoStart && this.dataFilter && this.animationStart()
            }, o.prototype.redraw = function () {
                if (void 0 === this.dataPoints)throw"Error: graph data not initialized";
                this._resizeCanvas(), this._resizeCenter(), this._redrawSlider(), this._redrawClear(), this._redrawAxis(), this.style === o.STYLE.GRID || this.style === o.STYLE.SURFACE ? this._redrawDataGrid() : this.style === o.STYLE.LINE ? this._redrawDataLine() : this.style === o.STYLE.BAR || this.style === o.STYLE.BARCOLOR || this.style === o.STYLE.BARSIZE ? this._redrawDataBar() : this._redrawDataDot(), this._redrawInfo(), this._redrawLegend()
            }, o.prototype._redrawClear = function () {
                var t = this.frame.canvas, e = t.getContext("2d");
                e.clearRect(0, 0, t.width, t.height)
            }, o.prototype._redrawLegend = function () {
                var t;
                if (this.style === o.STYLE.DOTCOLOR || this.style === o.STYLE.DOTSIZE) {
                    var e, i, n = .02 * this.frame.clientWidth;
                    this.style === o.STYLE.DOTSIZE ? (e = n / 2, i = n / 2 + 2 * n) : (e = 20, i = 20);
                    var s = Math.max(.25 * this.frame.clientHeight, 100), r = this.margin, a = this.frame.clientWidth - this.margin, h = a - i, d = r + s
                }
                var l = this.frame.canvas, u = l.getContext("2d");
                if (u.lineWidth = 1, u.font = "14px arial", this.style === o.STYLE.DOTCOLOR) {
                    var c = 0, p = s;
                    for (t = c; p > t; t++) {
                        var f = (t - c) / (p - c), v = 240 * f, g = this._hsv2rgb(v, 1, 1);
                        u.strokeStyle = g, u.beginPath(), u.moveTo(h, r + t), u.lineTo(a, r + t), u.stroke()
                    }
                    u.strokeStyle = this.axisColor, u.strokeRect(h, r, i, s)
                }
                if (this.style === o.STYLE.DOTSIZE && (u.strokeStyle = this.axisColor, u.fillStyle = this.dataColor.fill, u.beginPath(), u.moveTo(h, r), u.lineTo(a, r), u.lineTo(a - i + e, d), u.lineTo(h, d), u.closePath(), u.fill(), u.stroke()), this.style === o.STYLE.DOTCOLOR || this.style === o.STYLE.DOTSIZE) {
                    var y = 5, b = new m(this.valueMin, this.valueMax, (this.valueMax - this.valueMin) / 5, !0);
                    for (b.start(), b.getCurrent() < this.valueMin && b.next(); !b.end();)t = d - (b.getCurrent() - this.valueMin) / (this.valueMax - this.valueMin) * s, u.beginPath(), u.moveTo(h - y, t), u.lineTo(h, t), u.stroke(), u.textAlign = "right", u.textBaseline = "middle", u.fillStyle = this.axisColor, u.fillText(b.getCurrent(), h - 2 * y, t), b.next();
                    u.textAlign = "right", u.textBaseline = "top";
                    var w = this.legendLabel;
                    u.fillText(w, a, d + this.margin)
                }
            }, o.prototype._redrawFilter = function () {
                if (this.frame.filter.innerHTML = "", this.dataFilter) {
                    var t = {visible: this.showAnimationControls}, e = new f(this.frame.filter, t);
                    this.frame.filter.slider = e, this.frame.filter.style.padding = "10px", e.setValues(this.dataFilter.values), e.setPlayInterval(this.animationInterval);
                    var i = this, o = function () {
                        var t = e.getIndex();
                        i.dataFilter.selectValue(t), i.dataPoints = i.dataFilter._getDataPoints(), i.redraw()
                    };
                    e.setOnChangeCallback(o)
                } else this.frame.filter.slider = void 0
            }, o.prototype._redrawSlider = function () {
                void 0 !== this.frame.filter.slider && this.frame.filter.slider.redraw()
            }, o.prototype._redrawInfo = function () {
                if (this.dataFilter) {
                    var t = this.frame.canvas, e = t.getContext("2d");
                    e.font = "14px arial", e.lineStyle = "gray", e.fillStyle = "gray", e.textAlign = "left", e.textBaseline = "top";
                    var i = this.margin, o = this.margin;
                    e.fillText(this.dataFilter.getLabel() + ": " + this.dataFilter.getSelectedValue(), i, o)
                }
            }, o.prototype._redrawAxis = function () {
                var t, e, i, o, n, s, r, a, h, d, u, c, p, f = this.frame.canvas, v = f.getContext("2d");
                v.font = 24 / this.camera.getArmLength() + "px arial";
                var g = .025 / this.scale.x, y = .025 / this.scale.y, b = 5 / this.camera.getArmLength(), w = this.camera.getArmRotation().horizontal;
                for (v.lineWidth = 1, o = void 0 === this.defaultXStep, i = new m(this.xMin, this.xMax, this.xStep, o), i.start(), i.getCurrent() < this.xMin && i.next(); !i.end();) {
                    var _ = i.getCurrent();
                    this.showGrid ? (t = this._convert3Dto2D(new l(_, this.yMin, this.zMin)), e = this._convert3Dto2D(new l(_, this.yMax, this.zMin)), v.strokeStyle = this.gridColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke()) : (t = this._convert3Dto2D(new l(_, this.yMin, this.zMin)), e = this._convert3Dto2D(new l(_, this.yMin + g, this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke(), t = this._convert3Dto2D(new l(_, this.yMax, this.zMin)), e = this._convert3Dto2D(new l(_, this.yMax - g, this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke()), r = Math.cos(w) > 0 ? this.yMin : this.yMax, n = this._convert3Dto2D(new l(_, r, this.zMin)), Math.cos(2 * w) > 0 ? (v.textAlign = "center", v.textBaseline = "top", n.y += b) : Math.sin(2 * w) < 0 ? (v.textAlign = "right", v.textBaseline = "middle") : (v.textAlign = "left", v.textBaseline = "middle"), v.fillStyle = this.axisColor, v.fillText("  " + this.xValueLabel(i.getCurrent()) + "  ", n.x, n.y), i.next()
                }
                for (v.lineWidth = 1, o = void 0 === this.defaultYStep, i = new m(this.yMin, this.yMax, this.yStep, o), i.start(), i.getCurrent() < this.yMin && i.next(); !i.end();)this.showGrid ? (t = this._convert3Dto2D(new l(this.xMin, i.getCurrent(), this.zMin)), e = this._convert3Dto2D(new l(this.xMax, i.getCurrent(), this.zMin)), v.strokeStyle = this.gridColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke()) : (t = this._convert3Dto2D(new l(this.xMin, i.getCurrent(), this.zMin)), e = this._convert3Dto2D(new l(this.xMin + y, i.getCurrent(), this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke(), t = this._convert3Dto2D(new l(this.xMax, i.getCurrent(), this.zMin)), e = this._convert3Dto2D(new l(this.xMax - y, i.getCurrent(), this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke()), s = Math.sin(w) > 0 ? this.xMin : this.xMax, n = this._convert3Dto2D(new l(s, i.getCurrent(), this.zMin)), Math.cos(2 * w) < 0 ? (v.textAlign = "center", v.textBaseline = "top", n.y += b) : Math.sin(2 * w) > 0 ? (v.textAlign = "right", v.textBaseline = "middle") : (v.textAlign = "left", v.textBaseline = "middle"), v.fillStyle = this.axisColor, v.fillText("  " + this.yValueLabel(i.getCurrent()) + "  ", n.x, n.y), i.next();
                for (v.lineWidth = 1, o = void 0 === this.defaultZStep, i = new m(this.zMin, this.zMax, this.zStep, o), i.start(), i.getCurrent() < this.zMin && i.next(), s = Math.cos(w) > 0 ? this.xMin : this.xMax, r = Math.sin(w) < 0 ? this.yMin : this.yMax; !i.end();)t = this._convert3Dto2D(new l(s, r, i.getCurrent())), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(t.x - b, t.y), v.stroke(), v.textAlign = "right", v.textBaseline = "middle", v.fillStyle = this.axisColor, v.fillText(this.zValueLabel(i.getCurrent()) + " ", t.x - 5, t.y), i.next();
                v.lineWidth = 1, t = this._convert3Dto2D(new l(s, r, this.zMin)), e = this._convert3Dto2D(new l(s, r, this.zMax)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke(), v.lineWidth = 1, c = this._convert3Dto2D(new l(this.xMin, this.yMin, this.zMin)), p = this._convert3Dto2D(new l(this.xMax, this.yMin, this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(c.x, c.y), v.lineTo(p.x, p.y), v.stroke(), c = this._convert3Dto2D(new l(this.xMin, this.yMax, this.zMin)), p = this._convert3Dto2D(new l(this.xMax, this.yMax, this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(c.x, c.y), v.lineTo(p.x, p.y), v.stroke(), v.lineWidth = 1, t = this._convert3Dto2D(new l(this.xMin, this.yMin, this.zMin)), e = this._convert3Dto2D(new l(this.xMin, this.yMax, this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke(), t = this._convert3Dto2D(new l(this.xMax, this.yMin, this.zMin)), e = this._convert3Dto2D(new l(this.xMax, this.yMax, this.zMin)), v.strokeStyle = this.axisColor, v.beginPath(), v.moveTo(t.x, t.y), v.lineTo(e.x, e.y), v.stroke();
                var x = this.xLabel;
                x.length > 0 && (u = .1 / this.scale.y, s = (this.xMin + this.xMax) / 2, r = Math.cos(w) > 0 ? this.yMin - u : this.yMax + u, n = this._convert3Dto2D(new l(s, r, this.zMin)), Math.cos(2 * w) > 0 ? (v.textAlign = "center", v.textBaseline = "top") : Math.sin(2 * w) < 0 ? (v.textAlign = "right", v.textBaseline = "middle") : (v.textAlign = "left", v.textBaseline = "middle"), v.fillStyle = this.axisColor, v.fillText(x, n.x, n.y));
                var k = this.yLabel;
                k.length > 0 && (d = .1 / this.scale.x, s = Math.sin(w) > 0 ? this.xMin - d : this.xMax + d, r = (this.yMin + this.yMax) / 2, n = this._convert3Dto2D(new l(s, r, this.zMin)), Math.cos(2 * w) < 0 ? (v.textAlign = "center", v.textBaseline = "top") : Math.sin(2 * w) > 0 ? (v.textAlign = "right", v.textBaseline = "middle") : (v.textAlign = "left", v.textBaseline = "middle"), v.fillStyle = this.axisColor, v.fillText(k, n.x, n.y));
                var O = this.zLabel;
                O.length > 0 && (h = 30, s = Math.cos(w) > 0 ? this.xMin : this.xMax, r = Math.sin(w) < 0 ? this.yMin : this.yMax, a = (this.zMin + this.zMax) / 2, n = this._convert3Dto2D(new l(s, r, a)), v.textAlign = "right", v.textBaseline = "middle", v.fillStyle = this.axisColor, v.fillText(O, n.x - h, n.y))
            }, o.prototype._hsv2rgb = function (t, e, i) {
                var o, n, s, r, a, h;
                switch (r = i * e, a = Math.floor(t / 60), h = r * (1 - Math.abs(t / 60 % 2 - 1)), a) {
                    case 0:
                        o = r, n = h, s = 0;
                        break;
                    case 1:
                        o = h, n = r, s = 0;
                        break;
                    case 2:
                        o = 0, n = r, s = h;
                        break;
                    case 3:
                        o = 0, n = h, s = r;
                        break;
                    case 4:
                        o = h, n = 0, s = r;
                        break;
                    case 5:
                        o = r, n = 0, s = h;
                        break;
                    default:
                        o = 0, n = 0, s = 0
                }
                return "RGB(" + parseInt(255 * o) + "," + parseInt(255 * n) + "," + parseInt(255 * s) + ")"
            }, o.prototype._redrawDataGrid = function () {
                var t, e, i, n, s, r, a, h, d, u, c, p, f = this.frame.canvas, m = f.getContext("2d");
                if (m.lineJoin = "round", m.lineCap = "round", !(void 0 === this.dataPoints || this.dataPoints.length <= 0)) {
                    for (s = 0; s < this.dataPoints.length; s++) {
                        var v = this._convertPointToTranslation(this.dataPoints[s].point), g = this._convertTranslationToScreen(v);
                        this.dataPoints[s].trans = v, this.dataPoints[s].screen = g;
                        var y = this._convertPointToTranslation(this.dataPoints[s].bottom);
                        this.dataPoints[s].dist = this.showPerspective ? y.length() : -y.z
                    }
                    var b = function (t, e) {
                        return e.dist - t.dist
                    };
                    if (this.dataPoints.sort(b), this.style === o.STYLE.SURFACE) {
                        for (s = 0; s < this.dataPoints.length; s++)if (t = this.dataPoints[s], e = this.dataPoints[s].pointRight, i = this.dataPoints[s].pointTop, n = this.dataPoints[s].pointCross, void 0 !== t && void 0 !== e && void 0 !== i && void 0 !== n) {
                            if (this.showGrayBottom || this.showShadow) {
                                var w = l.subtract(n.trans, t.trans), _ = l.subtract(i.trans, e.trans), x = l.crossProduct(w, _), k = x.length();
                                r = x.z > 0
                            } else r = !0;
                            r ? (p = (t.point.z + e.point.z + i.point.z + n.point.z) / 4, d = 240 * (1 - (p - this.zMin) * this.scale.z / this.verticalRatio), u = 1, this.showShadow ? (c = Math.min(1 + x.x / k / 2, 1), a = this._hsv2rgb(d, u, c), h = a) : (c = 1, a = this._hsv2rgb(d, u, c), h = this.axisColor)) : (a = "gray", h = this.axisColor), m.lineWidth = this._getStrokeWidth(t), m.fillStyle = a, m.strokeStyle = h, m.beginPath(), m.moveTo(t.screen.x, t.screen.y), m.lineTo(e.screen.x, e.screen.y), m.lineTo(n.screen.x, n.screen.y), m.lineTo(i.screen.x, i.screen.y), m.closePath(), m.fill(), m.stroke()
                        }
                    } else for (s = 0; s < this.dataPoints.length; s++)t = this.dataPoints[s], e = this.dataPoints[s].pointRight, i = this.dataPoints[s].pointTop, void 0 !== t && void 0 !== e && (p = (t.point.z + e.point.z) / 2, d = 240 * (1 - (p - this.zMin) * this.scale.z / this.verticalRatio), m.lineWidth = 2 * this._getStrokeWidth(t), m.strokeStyle = this._hsv2rgb(d, 1, 1), m.beginPath(), m.moveTo(t.screen.x, t.screen.y), m.lineTo(e.screen.x, e.screen.y), m.stroke()), void 0 !== t && void 0 !== i && (p = (t.point.z + i.point.z) / 2, d = 240 * (1 - (p - this.zMin) * this.scale.z / this.verticalRatio), m.lineWidth = 2 * this._getStrokeWidth(t), m.strokeStyle = this._hsv2rgb(d, 1, 1), m.beginPath(), m.moveTo(t.screen.x, t.screen.y), m.lineTo(i.screen.x, i.screen.y), m.stroke())
                }
            }, o.prototype._getStrokeWidth = function (t) {
                return void 0 !== t ? this.showPerspective ? 1 / -t.trans.z * this.dataColor.strokeWidth : -(this.eye.z / this.camera.getArmLength()) * this.dataColor.strokeWidth : this.dataColor.strokeWidth
            }, o.prototype._redrawDataDot = function () {
                var t, e = this.frame.canvas, i = e.getContext("2d");
                if (!(void 0 === this.dataPoints || this.dataPoints.length <= 0)) {
                    for (t = 0; t < this.dataPoints.length; t++) {
                        var n = this._convertPointToTranslation(this.dataPoints[t].point), s = this._convertTranslationToScreen(n);
                        this.dataPoints[t].trans = n, this.dataPoints[t].screen = s;
                        var r = this._convertPointToTranslation(this.dataPoints[t].bottom);
                        this.dataPoints[t].dist = this.showPerspective ? r.length() : -r.z
                    }
                    var a = function (t, e) {
                        return e.dist - t.dist
                    };
                    this.dataPoints.sort(a);
                    var h = .02 * this.frame.clientWidth;
                    for (t = 0; t < this.dataPoints.length; t++) {
                        var d = this.dataPoints[t];
                        if (this.style === o.STYLE.DOTLINE) {
                            var l = this._convert3Dto2D(d.bottom);
                            i.lineWidth = 1, i.strokeStyle = this.gridColor, i.beginPath(), i.moveTo(l.x, l.y), i.lineTo(d.screen.x, d.screen.y), i.stroke()
                        }
                        var u;
                        u = this.style === o.STYLE.DOTSIZE ? h / 2 + 2 * h * (d.point.value - this.valueMin) / (this.valueMax - this.valueMin) : h;
                        var c;
                        c = this.showPerspective ? u / -d.trans.z : u * -(this.eye.z / this.camera.getArmLength()), 0 > c && (c = 0);
                        var p, f, m;
                        this.style === o.STYLE.DOTCOLOR ? (p = 240 * (1 - (d.point.value - this.valueMin) * this.scale.value), f = this._hsv2rgb(p, 1, 1), m = this._hsv2rgb(p, 1, .8)) : this.style === o.STYLE.DOTSIZE ? (f = this.dataColor.fill, m = this.dataColor.stroke) : (p = 240 * (1 - (d.point.z - this.zMin) * this.scale.z / this.verticalRatio), f = this._hsv2rgb(p, 1, 1), m = this._hsv2rgb(p, 1, .8)), i.lineWidth = this._getStrokeWidth(d), i.strokeStyle = m, i.fillStyle = f, i.beginPath(), i.arc(d.screen.x, d.screen.y, c, 0, 2 * Math.PI, !0), i.fill(), i.stroke()
                    }
                }
            }, o.prototype._redrawDataBar = function () {
                var t, e, i, n, s = this.frame.canvas, r = s.getContext("2d");
                if (!(void 0 === this.dataPoints || this.dataPoints.length <= 0)) {
                    for (t = 0; t < this.dataPoints.length; t++) {
                        var a = this._convertPointToTranslation(this.dataPoints[t].point), h = this._convertTranslationToScreen(a);
                        this.dataPoints[t].trans = a, this.dataPoints[t].screen = h;
                        var d = this._convertPointToTranslation(this.dataPoints[t].bottom);
                        this.dataPoints[t].dist = this.showPerspective ? d.length() : -d.z
                    }
                    var u = function (t, e) {
                        return e.dist - t.dist
                    };
                    this.dataPoints.sort(u), r.lineJoin = "round", r.lineCap = "round";
                    var c = this.xBarWidth / 2, p = this.yBarWidth / 2;
                    for (t = 0; t < this.dataPoints.length; t++) {
                        var f, m, v, g = this.dataPoints[t];
                        this.style === o.STYLE.BARCOLOR ? (f = 240 * (1 - (g.point.value - this.valueMin) * this.scale.value), m = this._hsv2rgb(f, 1, 1), v = this._hsv2rgb(f, 1, .8)) : this.style === o.STYLE.BARSIZE ? (m = this.dataColor.fill, v = this.dataColor.stroke) : (f = 240 * (1 - (g.point.z - this.zMin) * this.scale.z / this.verticalRatio), m = this._hsv2rgb(f, 1, 1), v = this._hsv2rgb(f, 1, .8)), this.style === o.STYLE.BARSIZE && (c = this.xBarWidth / 2 * ((g.point.value - this.valueMin) / (this.valueMax - this.valueMin) * .8 + .2), p = this.yBarWidth / 2 * ((g.point.value - this.valueMin) / (this.valueMax - this.valueMin) * .8 + .2));
                        var y = this, b = g.point, w = [
                            {point: new l(b.x - c, b.y - p, b.z)},
                            {point: new l(b.x + c, b.y - p, b.z)},
                            {point: new l(b.x + c, b.y + p, b.z)},
                            {point: new l(b.x - c, b.y + p, b.z)}
                        ], _ = [
                            {point: new l(b.x - c, b.y - p, this.zMin)},
                            {point: new l(b.x + c, b.y - p, this.zMin)},
                            {point: new l(b.x + c, b.y + p, this.zMin)},
                            {point: new l(b.x - c, b.y + p, this.zMin)}
                        ];
                        w.forEach(function (t) {
                            t.screen = y._convert3Dto2D(t.point)
                        }), _.forEach(function (t) {
                            t.screen = y._convert3Dto2D(t.point)
                        });
                        var x = [
                            {corners: w, center: l.avg(_[0].point, _[2].point)},
                            {corners: [w[0], w[1], _[1], _[0]], center: l.avg(_[1].point, _[0].point)},
                            {corners: [w[1], w[2], _[2], _[1]], center: l.avg(_[2].point, _[1].point)},
                            {corners: [w[2], w[3], _[3], _[2]], center: l.avg(_[3].point, _[2].point)},
                            {corners: [w[3], w[0], _[0], _[3]], center: l.avg(_[0].point, _[3].point)}
                        ];
                        for (g.surfaces = x, e = 0; e < x.length; e++) {
                            i = x[e];
                            var k = this._convertPointToTranslation(i.center);
                            i.dist = this.showPerspective ? k.length() : -k.z
                        }
                        for (x.sort(function (t, e) {
                            var i = e.dist - t.dist;
                            return i ? i : t.corners === w ? 1 : e.corners === w ? -1 : 0
                        }), r.lineWidth = this._getStrokeWidth(g), r.strokeStyle = v, r.fillStyle = m, e = 2; e < x.length; e++)i = x[e], n = i.corners, r.beginPath(), r.moveTo(n[3].screen.x, n[3].screen.y), r.lineTo(n[0].screen.x, n[0].screen.y), r.lineTo(n[1].screen.x, n[1].screen.y), r.lineTo(n[2].screen.x, n[2].screen.y), r.lineTo(n[3].screen.x, n[3].screen.y), r.fill(), r.stroke()
                    }
                }
            }, o.prototype._redrawDataLine = function () {
                var t, e, i = this.frame.canvas, o = i.getContext("2d");
                if (!(void 0 === this.dataPoints || this.dataPoints.length <= 0)) {
                    for (e = 0; e < this.dataPoints.length; e++) {
                        var n = this._convertPointToTranslation(this.dataPoints[e].point), s = this._convertTranslationToScreen(n);
                        this.dataPoints[e].trans = n, this.dataPoints[e].screen = s
                    }
                    if (this.dataPoints.length > 0) {
                        for (t = this.dataPoints[0], o.lineWidth = this._getStrokeWidth(t), o.lineJoin = "round", o.lineCap = "round", o.strokeStyle = this.dataColor.stroke, o.beginPath(), o.moveTo(t.screen.x, t.screen.y), e = 1; e < this.dataPoints.length; e++)t = this.dataPoints[e], o.lineTo(t.screen.x, t.screen.y);
                        o.stroke()
                    }
                }
            }, o.prototype._onMouseDown = function (t) {
                if (t = t || window.event, this.leftButtonDown && this._onMouseUp(t), this.leftButtonDown = t.which ? 1 === t.which : 1 === t.button, this.leftButtonDown || this.touchDown) {
                    this.startMouseX = n(t), this.startMouseY = s(t), this.startStart = new Date(this.start), this.startEnd = new Date(this.end), this.startArmRotation = this.camera.getArmRotation(), this.frame.style.cursor = "move";
                    var e = this;
                    this.onmousemove = function (t) {
                        e._onMouseMove(t)
                    }, this.onmouseup = function (t) {
                        e._onMouseUp(t)
                    }, d.addEventListener(document, "mousemove", e.onmousemove), d.addEventListener(document, "mouseup", e.onmouseup), d.preventDefault(t)
                }
            }, o.prototype._onMouseMove = function (t) {
                t = t || window.event;
                var e = parseFloat(n(t)) - this.startMouseX, i = parseFloat(s(t)) - this.startMouseY, o = this.startArmRotation.horizontal + e / 200, r = this.startArmRotation.vertical + i / 200, a = 4, h = Math.sin(a / 360 * 2 * Math.PI);
                Math.abs(Math.sin(o)) < h && (o = Math.round(o / Math.PI) * Math.PI - .001), Math.abs(Math.cos(o)) < h && (o = (Math.round(o / Math.PI - .5) + .5) * Math.PI - .001), Math.abs(Math.sin(r)) < h && (r = Math.round(r / Math.PI) * Math.PI), Math.abs(Math.cos(r)) < h && (r = (Math.round(r / Math.PI - .5) + .5) * Math.PI), this.camera.setArmRotation(o, r), this.redraw();
                var l = this.getCameraPosition();
                this.emit("cameraPositionChange", l), d.preventDefault(t)
            }, o.prototype._onMouseUp = function (t) {
                this.frame.style.cursor = "auto", this.leftButtonDown = !1, d.removeEventListener(document, "mousemove", this.onmousemove), d.removeEventListener(document, "mouseup", this.onmouseup), d.preventDefault(t)
            }, o.prototype._onTooltip = function (t) {
                var e = 300, i = this.frame.getBoundingClientRect(), o = n(t) - i.left, r = s(t) - i.top;
                if (this.showTooltip) {
                    if (this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.leftButtonDown)return void this._hideTooltip();
                    if (this.tooltip && this.tooltip.dataPoint) {
                        var a = this._dataPointFromXY(o, r);
                        a !== this.tooltip.dataPoint && (a ? this._showTooltip(a) : this._hideTooltip())
                    } else {
                        var h = this;
                        this.tooltipTimeout = setTimeout(function () {
                            h.tooltipTimeout = null;
                            var t = h._dataPointFromXY(o, r);
                            t && h._showTooltip(t)
                        }, e)
                    }
                }
            }, o.prototype._onTouchStart = function (t) {
                this.touchDown = !0;
                var e = this;
                this.ontouchmove = function (t) {
                    e._onTouchMove(t)
                }, this.ontouchend = function (t) {
                    e._onTouchEnd(t)
                }, d.addEventListener(document, "touchmove", e.ontouchmove), d.addEventListener(document, "touchend", e.ontouchend), this._onMouseDown(t)
            }, o.prototype._onTouchMove = function (t) {
                this._onMouseMove(t)
            }, o.prototype._onTouchEnd = function (t) {
                this.touchDown = !1, d.removeEventListener(document, "touchmove", this.ontouchmove), d.removeEventListener(document, "touchend", this.ontouchend), this._onMouseUp(t)
            }, o.prototype._onWheel = function (t) {
                t || (t = window.event);
                var e = 0;
                if (t.wheelDelta ? e = t.wheelDelta / 120 : t.detail && (e = -t.detail / 3), e) {
                    var i = this.camera.getArmLength(), o = i * (1 - e / 10);
                    this.camera.setArmLength(o), this.redraw(), this._hideTooltip()
                }
                var n = this.getCameraPosition();
                this.emit("cameraPositionChange", n), d.preventDefault(t)
            }, o.prototype._insideTriangle = function (t, e) {
                function i(t) {
                    return t > 0 ? 1 : 0 > t ? -1 : 0
                }

                var o = e[0], n = e[1], s = e[2], r = i((n.x - o.x) * (t.y - o.y) - (n.y - o.y) * (t.x - o.x)), a = i((s.x - n.x) * (t.y - n.y) - (s.y - n.y) * (t.x - n.x)), h = i((o.x - s.x) * (t.y - s.y) - (o.y - s.y) * (t.x - s.x));
                return !(0 != r && 0 != a && r != a || 0 != a && 0 != h && a != h || 0 != r && 0 != h && r != h)
            }, o.prototype._dataPointFromXY = function (t, e) {
                var i, n = 100, s = null, r = null, a = null, h = new u(t, e);
                if (this.style === o.STYLE.BAR || this.style === o.STYLE.BARCOLOR || this.style === o.STYLE.BARSIZE)for (i = this.dataPoints.length - 1; i >= 0; i--) {
                    s = this.dataPoints[i];
                    var d = s.surfaces;
                    if (d)for (var l = d.length - 1; l >= 0; l--) {
                        var c = d[l], p = c.corners, f = [p[0].screen, p[1].screen, p[2].screen], m = [p[2].screen, p[3].screen, p[0].screen];
                        if (this._insideTriangle(h, f) || this._insideTriangle(h, m))return s
                    }
                } else for (i = 0; i < this.dataPoints.length; i++) {
                    s = this.dataPoints[i];
                    var v = s.screen;
                    if (v) {
                        var g = Math.abs(t - v.x), y = Math.abs(e - v.y), b = Math.sqrt(g * g + y * y);
                        (null === a || a > b) && n > b && (a = b, r = s)
                    }
                }
                return r
            }, o.prototype._showTooltip = function (t) {
                var e, i, o;
                this.tooltip ? (e = this.tooltip.dom.content, i = this.tooltip.dom.line, o = this.tooltip.dom.dot) : (e = document.createElement("div"), e.style.position = "absolute", e.style.padding = "10px", e.style.border = "1px solid #4d4d4d", e.style.color = "#1a1a1a", e.style.background = "rgba(255,255,255,0.7)", e.style.borderRadius = "2px", e.style.boxShadow = "5px 5px 10px rgba(128,128,128,0.5)", i = document.createElement("div"), i.style.position = "absolute", i.style.height = "40px", i.style.width = "0", i.style.borderLeft = "1px solid #4d4d4d", o = document.createElement("div"), o.style.position = "absolute", o.style.height = "0", o.style.width = "0", o.style.border = "5px solid #4d4d4d", o.style.borderRadius = "5px", this.tooltip = {
                        dataPoint: null,
                        dom: {content: e, line: i, dot: o}
                    }), this._hideTooltip(), this.tooltip.dataPoint = t, "function" == typeof this.showTooltip ? e.innerHTML = this.showTooltip(t.point) : e.innerHTML = "<table><tr><td>x:</td><td>" + t.point.x + "</td></tr><tr><td>y:</td><td>" + t.point.y + "</td></tr><tr><td>z:</td><td>" + t.point.z + "</td></tr></table>", e.style.left = "0", e.style.top = "0", this.frame.appendChild(e), this.frame.appendChild(i), this.frame.appendChild(o);
                var n = e.offsetWidth, s = e.offsetHeight, r = i.offsetHeight, a = o.offsetWidth, h = o.offsetHeight, d = t.screen.x - n / 2;
                d = Math.min(Math.max(d, 10), this.frame.clientWidth - 10 - n), i.style.left = t.screen.x + "px", i.style.top = t.screen.y - r + "px", e.style.left = d + "px", e.style.top = t.screen.y - r - s + "px", o.style.left = t.screen.x - a / 2 + "px", o.style.top = t.screen.y - h / 2 + "px"
            }, o.prototype._hideTooltip = function () {
                if (this.tooltip) {
                    this.tooltip.dataPoint = null;
                    for (var t in this.tooltip.dom)if (this.tooltip.dom.hasOwnProperty(t)) {
                        var e = this.tooltip.dom[t];
                        e && e.parentNode && e.parentNode.removeChild(e)
                    }
                }
            }, t.exports = o
        },
        function (t, e) {
            function i(t, e) {
                this.x = void 0 !== t ? t : 0, this.y = void 0 !== e ? e : 0
            }

            t.exports = i
        },
        function (t, e) {
            function i(t) {
                return t ? o(t) : void 0
            }

            function o(t) {
                for (var e in i.prototype)t[e] = i.prototype[e];
                return t
            }

            t.exports = i, i.prototype.on = i.prototype.addEventListener = function (t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
            }, i.prototype.once = function (t, e) {
                function i() {
                    o.off(t, i), e.apply(this, arguments)
                }

                var o = this;
                return this._callbacks = this._callbacks || {}, i.fn = e, this.on(t, i), this
            }, i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function (t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length)return this._callbacks = {}, this;
                var i = this._callbacks[t];
                if (!i)return this;
                if (1 == arguments.length)return delete this._callbacks[t], this;
                for (var o, n = 0; n < i.length; n++)if (o = i[n], o === e || o.fn === e) {
                    i.splice(n, 1);
                    break
                }
                return this
            }, i.prototype.emit = function (t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1), i = this._callbacks[t];
                if (i) {
                    i = i.slice(0);
                    for (var o = 0, n = i.length; n > o; ++o)i[o].apply(this, e)
                }
                return this
            }, i.prototype.listeners = function (t) {
                return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
            }, i.prototype.hasListeners = function (t) {
                return !!this.listeners(t).length
            }
        },
        function (t, e) {
            function i(t, e, i) {
                this.x = void 0 !== t ? t : 0, this.y = void 0 !== e ? e : 0, this.z = void 0 !== i ? i : 0
            }

            i.subtract = function (t, e) {
                var o = new i;
                return o.x = t.x - e.x, o.y = t.y - e.y, o.z = t.z - e.z, o
            }, i.add = function (t, e) {
                var o = new i;
                return o.x = t.x + e.x, o.y = t.y + e.y, o.z = t.z + e.z, o
            }, i.avg = function (t, e) {
                return new i((t.x + e.x) / 2, (t.y + e.y) / 2, (t.z + e.z) / 2)
            }, i.crossProduct = function (t, e) {
                var o = new i;
                return o.x = t.y * e.z - t.z * e.y, o.y = t.z * e.x - t.x * e.z, o.z = t.x * e.y - t.y * e.x, o
            }, i.prototype.length = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            }, t.exports = i
        },
        function (t, e, i) {
            function o() {
                this.armLocation = new n, this.armRotation = {}, this.armRotation.horizontal = 0, this.armRotation.vertical = 0, this.armLength = 1.7, this.cameraLocation = new n, this.cameraRotation = new n(.5 * Math.PI, 0, 0), this.calculateCameraOrientation()
            }

            var n = i(20);
            o.prototype.setArmLocation = function (t, e, i) {
                this.armLocation.x = t, this.armLocation.y = e, this.armLocation.z = i, this.calculateCameraOrientation()
            }, o.prototype.setArmRotation = function (t, e) {
                void 0 !== t && (this.armRotation.horizontal = t), void 0 !== e && (this.armRotation.vertical = e, this.armRotation.vertical < 0 && (this.armRotation.vertical = 0), this.armRotation.vertical > .5 * Math.PI && (this.armRotation.vertical = .5 * Math.PI)), (void 0 !== t || void 0 !== e) && this.calculateCameraOrientation()
            }, o.prototype.getArmRotation = function () {
                var t = {};
                return t.horizontal = this.armRotation.horizontal, t.vertical = this.armRotation.vertical, t
            }, o.prototype.setArmLength = function (t) {
                void 0 !== t && (this.armLength = t, this.armLength < .71 && (this.armLength = .71), this.armLength > 5 && (this.armLength = 5), this.calculateCameraOrientation())
            }, o.prototype.getArmLength = function () {
                return this.armLength
            }, o.prototype.getCameraLocation = function () {
                return this.cameraLocation
            }, o.prototype.getCameraRotation = function () {
                return this.cameraRotation
            }, o.prototype.calculateCameraOrientation = function () {
                this.cameraLocation.x = this.armLocation.x - this.armLength * Math.sin(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical), this.cameraLocation.y = this.armLocation.y - this.armLength * Math.cos(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical), this.cameraLocation.z = this.armLocation.z + this.armLength * Math.sin(this.armRotation.vertical), this.cameraRotation.x = Math.PI / 2 - this.armRotation.vertical, this.cameraRotation.y = 0, this.cameraRotation.z = -this.armRotation.horizontal
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                this.data = t, this.column = e, this.graph = i, this.index = void 0, this.value = void 0, this.values = i.getDistinctValues(t.get(), this.column), this.values.sort(function (t, e) {
                    return t > e ? 1 : e > t ? -1 : 0
                }), this.values.length > 0 && this.selectValue(0), this.dataPoints = [], this.loaded = !1, this.onLoadCallback = void 0, i.animationPreload ? (this.loaded = !1, this.loadInBackground()) : this.loaded = !0
            }

            var n = i(16);
            o.prototype.isLoaded = function () {
                return this.loaded
            }, o.prototype.getLoadedProgress = function () {
                for (var t = this.values.length, e = 0; this.dataPoints[e];)e++;
                return Math.round(e / t * 100)
            }, o.prototype.getLabel = function () {
                return this.graph.filterLabel
            }, o.prototype.getColumn = function () {
                return this.column
            }, o.prototype.getSelectedValue = function () {
                return void 0 === this.index ? void 0 : this.values[this.index]
            }, o.prototype.getValues = function () {
                return this.values
            }, o.prototype.getValue = function (t) {
                if (t >= this.values.length)throw"Error: index out of range";
                return this.values[t]
            }, o.prototype._getDataPoints = function (t) {
                if (void 0 === t && (t = this.index), void 0 === t)return [];
                var e;
                if (this.dataPoints[t]) e = this.dataPoints[t]; else {
                    var i = {};
                    i.column = this.column, i.value = this.values[t];
                    var o = new n(this.data, {
                        filter: function (t) {
                            return t[i.column] == i.value
                        }
                    }).get();
                    e = this.graph._getDataPoints(o), this.dataPoints[t] = e
                }
                return e
            }, o.prototype.setOnLoadCallback = function (t) {
                this.onLoadCallback = t
            }, o.prototype.selectValue = function (t) {
                if (t >= this.values.length)throw"Error: index out of range";
                this.index = t, this.value = this.values[t]
            }, o.prototype.loadInBackground = function (t) {
                void 0 === t && (t = 0);
                var e = this.graph.frame;
                if (t < this.values.length) {
                    this._getDataPoints(t);
                    void 0 === e.progress && (e.progress = document.createElement("DIV"), e.progress.style.position = "absolute", e.progress.style.color = "gray", e.appendChild(e.progress));
                    var i = this.getLoadedProgress();
                    e.progress.innerHTML = "Loading animation... " + i + "%", e.progress.style.bottom = "60px", e.progress.style.left = "10px";
                    var o = this;
                    setTimeout(function () {
                        o.loadInBackground(t + 1)
                    }, 10), this.loaded = !1
                } else this.loaded = !0, void 0 !== e.progress && (e.removeChild(e.progress), e.progress = void 0), this.onLoadCallback && this.onLoadCallback()
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                if (void 0 === t)throw"Error: No container element defined";
                if (this.container = t, this.visible = e && void 0 != e.visible ? e.visible : !0, this.visible) {
                    this.frame = document.createElement("DIV"), this.frame.style.width = "100%", this.frame.style.position = "relative", this.container.appendChild(this.frame), this.frame.prev = document.createElement("INPUT"), this.frame.prev.type = "BUTTON", this.frame.prev.value = "Prev", this.frame.appendChild(this.frame.prev), this.frame.play = document.createElement("INPUT"), this.frame.play.type = "BUTTON", this.frame.play.value = "Play", this.frame.appendChild(this.frame.play), this.frame.next = document.createElement("INPUT"), this.frame.next.type = "BUTTON", this.frame.next.value = "Next", this.frame.appendChild(this.frame.next), this.frame.bar = document.createElement("INPUT"), this.frame.bar.type = "BUTTON", this.frame.bar.style.position = "absolute", this.frame.bar.style.border = "1px solid red", this.frame.bar.style.width = "100px", this.frame.bar.style.height = "6px", this.frame.bar.style.borderRadius = "2px", this.frame.bar.style.MozBorderRadius = "2px", this.frame.bar.style.border = "1px solid #7F7F7F", this.frame.bar.style.backgroundColor = "#E5E5E5", this.frame.appendChild(this.frame.bar), this.frame.slide = document.createElement("INPUT"), this.frame.slide.type = "BUTTON", this.frame.slide.style.margin = "0px", this.frame.slide.value = " ", this.frame.slide.style.position = "relative", this.frame.slide.style.left = "-100px", this.frame.appendChild(this.frame.slide);
                    var i = this;
                    this.frame.slide.onmousedown = function (t) {
                        i._onMouseDown(t)
                    }, this.frame.prev.onclick = function (t) {
                        i.prev(t)
                    }, this.frame.play.onclick = function (t) {
                        i.togglePlay(t)
                    }, this.frame.next.onclick = function (t) {
                        i.next(t)
                    }
                }
                this.onChangeCallback = void 0, this.values = [], this.index = void 0, this.playTimeout = void 0, this.playInterval = 1e3, this.playLoop = !0
            }

            var n = i(7);
            o.prototype.prev = function () {
                var t = this.getIndex();
                t > 0 && (t--, this.setIndex(t))
            }, o.prototype.next = function () {
                var t = this.getIndex();
                t < this.values.length - 1 && (t++, this.setIndex(t))
            }, o.prototype.playNext = function () {
                var t = new Date, e = this.getIndex();
                e < this.values.length - 1 ? (e++, this.setIndex(e)) : this.playLoop && (e = 0, this.setIndex(e));
                var i = new Date, o = i - t, n = Math.max(this.playInterval - o, 0), s = this;
                this.playTimeout = setTimeout(function () {
                    s.playNext()
                }, n)
            }, o.prototype.togglePlay = function () {
                void 0 === this.playTimeout ? this.play() : this.stop()
            }, o.prototype.play = function () {
                this.playTimeout || (this.playNext(), this.frame && (this.frame.play.value = "Stop"))
            }, o.prototype.stop = function () {
                clearInterval(this.playTimeout), this.playTimeout = void 0, this.frame && (this.frame.play.value = "Play")
            }, o.prototype.setOnChangeCallback = function (t) {
                this.onChangeCallback = t
            }, o.prototype.setPlayInterval = function (t) {
                this.playInterval = t
            }, o.prototype.getPlayInterval = function (t) {
                return this.playInterval
            }, o.prototype.setPlayLoop = function (t) {
                this.playLoop = t
            }, o.prototype.onChange = function () {
                void 0 !== this.onChangeCallback && this.onChangeCallback()
            }, o.prototype.redraw = function () {
                if (this.frame) {
                    this.frame.bar.style.top = this.frame.clientHeight / 2 - this.frame.bar.offsetHeight / 2 + "px", this.frame.bar.style.width = this.frame.clientWidth - this.frame.prev.clientWidth - this.frame.play.clientWidth - this.frame.next.clientWidth - 30 + "px";
                    var t = this.indexToLeft(this.index);
                    this.frame.slide.style.left = t + "px"
                }
            }, o.prototype.setValues = function (t) {
                this.values = t, this.values.length > 0 ? this.setIndex(0) : this.index = void 0
            }, o.prototype.setIndex = function (t) {
                if (!(t < this.values.length))throw"Error: index out of range";
                this.index = t, this.redraw(), this.onChange()
            }, o.prototype.getIndex = function () {
                return this.index
            }, o.prototype.get = function () {
                return this.values[this.index]
            }, o.prototype._onMouseDown = function (t) {
                var e = t.which ? 1 === t.which : 1 === t.button;
                if (e) {
                    this.startClientX = t.clientX, this.startSlideX = parseFloat(this.frame.slide.style.left), this.frame.style.cursor = "move";
                    var i = this;
                    this.onmousemove = function (t) {
                        i._onMouseMove(t)
                    }, this.onmouseup = function (t) {
                        i._onMouseUp(t)
                    }, n.addEventListener(document, "mousemove", this.onmousemove), n.addEventListener(document, "mouseup", this.onmouseup), n.preventDefault(t)
                }
            }, o.prototype.leftToIndex = function (t) {
                var e = parseFloat(this.frame.bar.style.width) - this.frame.slide.clientWidth - 10, i = t - 3, o = Math.round(i / e * (this.values.length - 1));
                return 0 > o && (o = 0), o > this.values.length - 1 && (o = this.values.length - 1), o
            }, o.prototype.indexToLeft = function (t) {
                var e = parseFloat(this.frame.bar.style.width) - this.frame.slide.clientWidth - 10, i = t / (this.values.length - 1) * e, o = i + 3;
                return o
            }, o.prototype._onMouseMove = function (t) {
                var e = t.clientX - this.startClientX, i = this.startSlideX + e, o = this.leftToIndex(i);
                this.setIndex(o), n.preventDefault()
            }, o.prototype._onMouseUp = function (t) {
                this.frame.style.cursor = "auto", n.removeEventListener(document, "mousemove", this.onmousemove), n.removeEventListener(document, "mouseup", this.onmouseup), n.preventDefault()
            }, t.exports = o
        },
        function (t, e) {
            function i(t, e, i, o) {
                this._start = 0, this._end = 0, this._step = 1, this.prettyStep = !0, this.precision = 5, this._current = 0, this.setRange(t, e, i, o)
            }

            i.prototype.setRange = function (t, e, i, o) {
                this._start = t ? t : 0, this._end = e ? e : 0, this.setStep(i, o)
            }, i.prototype.setStep = function (t, e) {
                void 0 === t || 0 >= t || (void 0 !== e && (this.prettyStep = e), this.prettyStep === !0 ? this._step = i.calculatePrettyStep(t) : this._step = t)
            }, i.calculatePrettyStep = function (t) {
                var e = function (t) {
                    return Math.log(t) / Math.LN10
                }, i = Math.pow(10, Math.round(e(t))), o = 2 * Math.pow(10, Math.round(e(t / 2))), n = 5 * Math.pow(10, Math.round(e(t / 5))), s = i;
                return Math.abs(o - t) <= Math.abs(s - t) && (s = o), Math.abs(n - t) <= Math.abs(s - t) && (s = n), 0 >= s && (s = 1), s
            }, i.prototype.getCurrent = function () {
                return parseFloat(this._current.toPrecision(this.precision))
            }, i.prototype.getStep = function () {
                return this._step
            }, i.prototype.start = function () {
                this._current = this._start - this._start % this._step
            }, i.prototype.next = function () {
                this._current += this._step
            }, i.prototype.end = function () {
                return this._current > this._end
            }, t.exports = i
        },
        function (t, e, i) {
            function o(t, e, i, d) {
                if (!(this instanceof o))throw new SyntaxError("Constructor must be called with the new operator");
                if (!(Array.isArray(i) || i instanceof r || i instanceof a) && i instanceof Object) {
                    var c = d;
                    d = i, i = c
                }
                var f = this;
                this.defaultOptions = {
                    start: null,
                    end: null,
                    autoResize: !0,
                    orientation: {axis: "bottom", item: "bottom"},
                    moment: n,
                    width: null,
                    height: null,
                    maxHeight: null,
                    minHeight: null
                }, this.options = s.deepExtend({}, this.defaultOptions), this._create(t), this.components = [], this.body = {
                    dom: this.dom,
                    domProps: this.props,
                    emitter: {on: this.on.bind(this), off: this.off.bind(this), emit: this.emit.bind(this)},
                    hiddenDates: [],
                    util: {
                        getScale: function () {
                            return f.timeAxis.step.scale
                        },
                        getStep: function () {
                            return f.timeAxis.step.step
                        },
                        toScreen: f._toScreen.bind(f),
                        toGlobalScreen: f._toGlobalScreen.bind(f),
                        toTime: f._toTime.bind(f),
                        toGlobalTime: f._toGlobalTime.bind(f)
                    }
                }, this.range = new h(this.body), this.components.push(this.range), this.body.range = this.range, this.timeAxis = new l(this.body), this.timeAxis2 = null, this.components.push(this.timeAxis), this.currentTime = new u(this.body), this.components.push(this.currentTime), this.itemSet = new p(this.body), this.components.push(this.itemSet), this.itemsData = null, this.groupsData = null, this.on("tap", function (t) {
                    f.emit("click", f.getEventProperties(t))
                }), this.on("doubletap", function (t) {
                    f.emit("doubleClick", f.getEventProperties(t))
                }), this.dom.root.oncontextmenu = function (t) {
                    f.emit("contextmenu", f.getEventProperties(t))
                }, d && this.setOptions(d), i && this.setGroups(i), e ? this.setItems(e) : this._redraw()
            }

            var n = (i(19), i(3), i(8)), s = i(7), r = i(14), a = i(16), h = i(26), d = i(30), l = i(39), u = i(44), c = i(42), p = i(31), f = i(45), m = i(47)["default"], v = i(47).printStyle, g = i(48).allOptions, y = i(48).configureOptions;
            o.prototype = new d, o.prototype._createConfigurator = function () {
                return new f(this, this.dom.container, y)
            }, o.prototype.redraw = function () {
                this.itemSet && this.itemSet.markDirty({refreshItems: !0}), this._redraw()
            }, o.prototype.setOptions = function (t) {
                var e = m.validate(t, g);
                if (e === !0 && console.log("%cErrors have been found in the supplied options object.", v), d.prototype.setOptions.call(this, t), "type" in t && t.type !== this.options.type) {
                    this.options.type = t.type;
                    var i = this.itemsData;
                    if (i) {
                        var o = this.getSelection();
                        this.setItems(null), this.setItems(i), this.setSelection(o)
                    }
                }
            }, o.prototype.setItems = function (t) {
                var e, i = null == this.itemsData;
                if (e = t ? t instanceof r || t instanceof a ? t : new r(t, {
                                type: {
                                    start: "Date",
                                    end: "Date"
                                }
                            }) : null, this.itemsData = e, this.itemSet && this.itemSet.setItems(e), i)if (void 0 != this.options.start || void 0 != this.options.end) {
                    if (void 0 == this.options.start || void 0 == this.options.end)var o = this.getItemRange();
                    var n = void 0 != this.options.start ? this.options.start : o.min, s = void 0 != this.options.end ? this.options.end : o.max;
                    this.setWindow(n, s, {animation: !1})
                } else this.fit({animation: !1})
            }, o.prototype.setGroups = function (t) {
                var e;
                e = t ? t instanceof r || t instanceof a ? t : new r(t) : null, this.groupsData = e, this.itemSet.setGroups(e)
            }, o.prototype.setData = function (t) {
                t && t.groups && this.setGroups(t.groups), t && t.items && this.setItems(t.items)
            }, o.prototype.setSelection = function (t, e) {
                this.itemSet && this.itemSet.setSelection(t), e && e.focus && this.focus(t, e)
            }, o.prototype.getSelection = function () {
                return this.itemSet && this.itemSet.getSelection() || []
            }, o.prototype.focus = function (t, e) {
                if (this.itemsData && void 0 != t) {
                    var i = Array.isArray(t) ? t : [t], o = this.itemsData.getDataSet().get(i, {
                        type: {
                            start: "Date",
                            end: "Date"
                        }
                    }), n = null, s = null;
                    if (o.forEach(function (t) {
                            var e = t.start.valueOf(), i = "end" in t ? t.end.valueOf() : t.start.valueOf();
                            (null === n || n > e) && (n = e), (null === s || i > s) && (s = i)
                        }), null !== n && null !== s) {
                        var r = (n + s) / 2, a = Math.max(this.range.end - this.range.start, 1.1 * (s - n)), h = e && void 0 !== e.animation ? e.animation : !0;
                        this.range.setRange(r - a / 2, r + a / 2, h)
                    }
                }
            }, o.prototype.fit = function (t) {
                var e = t && void 0 !== t.animation ? t.animation : !0, i = this.getItemRange();
                this.range.setRange(i.min, i.max, e)
            }, o.prototype.getItemRange = function () {
                var t = this, e = this.getDataRange(), i = e.min, o = e.max, n = null, r = null;
                if (null != i && null != o) {
                    var a, h, d, l, u;
                    !function () {
                        var e = function (t) {
                            return s.convert(t.data.start, "Date").valueOf()
                        }, c = function (t) {
                            var e = void 0 != t.data.end ? t.data.end : t.data.start;
                            return s.convert(e, "Date").valueOf()
                        };
                        a = o - i, 0 >= a && (a = 10), h = a / t.props.center.width, s.forEach(t.itemSet.items, function (t) {
                            t.show();
                            var s = e(t), a = c(t), d = new Date(s - (t.getWidthLeft() + 10) * h), l = new Date(a + (t.getWidthRight() + 10) * h);
                            i > d && (i = d, n = t), l > o && (o = l, r = t)
                        }.bind(t)), n && r && (d = n.getWidthLeft() + 10, l = r.getWidthRight() + 10, u = t.props.center.width - d - l, u > 0 && (i = e(n) - d * a / u, o = c(r) + l * a / u))
                    }()
                }
                return {min: null != i ? new Date(i) : null, max: null != o ? new Date(o) : null}
            }, o.prototype.getDataRange = function () {
                var t = null, e = null, i = this.itemsData && this.itemsData.getDataSet();
                return i && i.forEach(function (i) {
                    var o = s.convert(i.start, "Date").valueOf(), n = s.convert(void 0 != i.end ? i.end : i.start, "Date").valueOf();
                    (null === t || t > o) && (t = o), (null === e || n > e) && (e = o)
                }), {min: null != t ? new Date(t) : null, max: null != e ? new Date(e) : null}
            }, o.prototype.getEventProperties = function (t) {
                var e = t.center ? t.center.x : t.clientX, i = t.center ? t.center.y : t.clientY, o = e - s.getAbsoluteLeft(this.dom.centerContainer), n = i - s.getAbsoluteTop(this.dom.centerContainer), r = this.itemSet.itemFromTarget(t), a = this.itemSet.groupFromTarget(t), h = c.customTimeFromTarget(t), d = this.itemSet.options.snap || null, l = this.body.util.getScale(), u = this.body.util.getStep(), p = this._toTime(o), f = d ? d(p, l, u) : p, m = s.getTarget(t), v = null;
                return null != r ? v = "item" : null != h ? v = "custom-time" : s.hasParent(m, this.timeAxis.dom.foreground) ? v = "axis" : this.timeAxis2 && s.hasParent(m, this.timeAxis2.dom.foreground) ? v = "axis" : s.hasParent(m, this.itemSet.dom.labelSet) ? v = "group-label" : s.hasParent(m, this.currentTime.bar) ? v = "current-time" : s.hasParent(m, this.dom.center) && (v = "background"), {
                    event: t,
                    item: r ? r.id : null,
                    group: a ? a.groupId : null,
                    what: v,
                    pageX: t.srcEvent ? t.srcEvent.pageX : t.pageX,
                    pageY: t.srcEvent ? t.srcEvent.pageY : t.pageY,
                    x: o,
                    y: n,
                    time: p,
                    snappedTime: f
                }
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                var i = a().hours(0).minutes(0).seconds(0).milliseconds(0);
                this.start = i.clone().add(-3, "days").valueOf(), this.end = i.clone().add(4, "days").valueOf(), this.body = t, this.deltaDifference = 0, this.scaleOffset = 0, this.startToFront = !1, this.endToFront = !0, this.defaultOptions = {
                    start: null,
                    end: null,
                    moment: a,
                    direction: "horizontal",
                    moveable: !0,
                    zoomable: !0,
                    min: null,
                    max: null,
                    zoomMin: 10,
                    zoomMax: 31536e10
                }, this.options = r.extend({}, this.defaultOptions), this.props = {touch: {}}, this.animationTimer = null, this.body.emitter.on("panstart", this._onDragStart.bind(this)), this.body.emitter.on("panmove", this._onDrag.bind(this)), this.body.emitter.on("panend", this._onDragEnd.bind(this)), this.body.emitter.on("mousewheel", this._onMouseWheel.bind(this)), this.body.emitter.on("touch", this._onTouch.bind(this)), this.body.emitter.on("pinch", this._onPinch.bind(this)), this.setOptions(e)
            }

            function n(t) {
                if ("horizontal" != t && "vertical" != t)throw new TypeError('Unknown direction "' + t + '". Choose "horizontal" or "vertical".')
            }

            function s(t, e) {
                return {x: t.x - r.getAbsoluteLeft(e), y: t.y - r.getAbsoluteTop(e)}
            }

            var r = i(7), a = (i(27), i(8)), h = i(28), d = i(29);
            o.prototype = new h, o.prototype.setOptions = function (t) {
                if (t) {
                    var e = ["direction", "min", "max", "zoomMin", "zoomMax", "moveable", "zoomable", "moment", "activate", "hiddenDates", "zoomKey"];
                    r.selectiveExtend(e, this.options, t), ("start" in t || "end" in t) && this.setRange(t.start, t.end)
                }
            }, o.prototype.setRange = function (t, e, i, o) {
                o !== !0 && (o = !1);
                var n = void 0 != t ? r.convert(t, "Date").valueOf() : null, s = void 0 != e ? r.convert(e, "Date").valueOf() : null;
                if (this._cancelAnimation(), i) {
                    var a = this, h = this.start, l = this.end, u = "object" == typeof i && "duration" in i ? i.duration : 500, c = "object" == typeof i && "easingFunction" in i ? i.easingFunction : "easeInOutQuad", p = r.easingFunctions[c];
                    if (!p)throw new Error("Unknown easing function " + JSON.stringify(c) + ". Choose from: " + Object.keys(r.easingFunctions).join(", "));
                    var f = (new Date).valueOf(), m = !1, v = function b() {
                        if (!a.props.touch.dragging) {
                            var t = (new Date).valueOf(), e = t - f, i = p(e / u), r = e > u, c = r || null === n ? n : h + (n - h) * i, v = r || null === s ? s : l + (s - l) * i;
                            g = a._applyRange(c, v), d.updateHiddenDates(a.options.moment, a.body, a.options.hiddenDates), m = m || g, g && a.body.emitter.emit("rangechange", {
                                start: new Date(a.start),
                                end: new Date(a.end),
                                byUser: o
                            }), r ? m && a.body.emitter.emit("rangechanged", {
                                    start: new Date(a.start),
                                    end: new Date(a.end),
                                    byUser: o
                                }) : a.animationTimer = setTimeout(b, 20)
                        }
                    };
                    return v()
                }
                var g = this._applyRange(n, s);
                if (d.updateHiddenDates(this.options.moment, this.body, this.options.hiddenDates), g) {
                    var y = {start: new Date(this.start), end: new Date(this.end), byUser: o};
                    this.body.emitter.emit("rangechange", y), this.body.emitter.emit("rangechanged", y)
                }
            }, o.prototype._cancelAnimation = function () {
                this.animationTimer && (clearTimeout(this.animationTimer), this.animationTimer = null)
            }, o.prototype._applyRange = function (t, e) {
                var i, o = null != t ? r.convert(t, "Date").valueOf() : this.start, n = null != e ? r.convert(e, "Date").valueOf() : this.end, s = null != this.options.max ? r.convert(this.options.max, "Date").valueOf() : null, a = null != this.options.min ? r.convert(this.options.min, "Date").valueOf() : null;
                if (isNaN(o) || null === o)throw new Error('Invalid start "' + t + '"');
                if (isNaN(n) || null === n)throw new Error('Invalid end "' + e + '"');
                if (o > n && (n = o), null !== a && a > o && (i = a - o, o += i, n += i, null != s && n > s && (n = s)), null !== s && n > s && (i = n - s, o -= i, n -= i, null != a && a > o && (o = a)), null !== this.options.zoomMin) {
                    var h = parseFloat(this.options.zoomMin);
                    0 > h && (h = 0), h > n - o && (this.end - this.start === h && o > this.start && n < this.end ? (o = this.start, n = this.end) : (i = h - (n - o), o -= i / 2, n += i / 2))
                }
                if (null !== this.options.zoomMax) {
                    var d = parseFloat(this.options.zoomMax);
                    0 > d && (d = 0), n - o > d && (this.end - this.start === d && o < this.start && n > this.end ? (o = this.start, n = this.end) : (i = n - o - d, o += i / 2, n -= i / 2))
                }
                var l = this.start != o || this.end != n;
                return o >= this.start && o <= this.end || n >= this.start && n <= this.end || this.start >= o && this.start <= n || this.end >= o && this.end <= n || this.body.emitter.emit("checkRangedItems"), this.start = o, this.end = n, l
            }, o.prototype.getRange = function () {
                return {start: this.start, end: this.end}
            }, o.prototype.conversion = function (t, e) {
                return o.conversion(this.start, this.end, t, e)
            }, o.conversion = function (t, e, i, o) {
                return void 0 === o && (o = 0), 0 != i && e - t != 0 ? {offset: t, scale: i / (e - t - o)} : {
                        offset: 0,
                        scale: 1
                    }
            }, o.prototype._onDragStart = function (t) {
                this.deltaDifference = 0, this.previousDelta = 0, this.options.moveable && this._isInsideRange(t) && this.props.touch.allowDragging && (this.props.touch.start = this.start, this.props.touch.end = this.end, this.props.touch.dragging = !0, this.body.dom.root && (this.body.dom.root.style.cursor = "move"))
            }, o.prototype._onDrag = function (t) {
                if (this.props.touch.dragging && this.options.moveable && this.props.touch.allowDragging) {
                    var e = this.options.direction;
                    n(e);
                    var i = "horizontal" == e ? t.deltaX : t.deltaY;
                    i -= this.deltaDifference;
                    var o = this.props.touch.end - this.props.touch.start, s = d.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
                    o -= s;
                    var r = "horizontal" == e ? this.body.domProps.center.width : this.body.domProps.center.height, a = -i / r * o, h = this.props.touch.start + a, l = this.props.touch.end + a, u = d.snapAwayFromHidden(this.body.hiddenDates, h, this.previousDelta - i, !0), c = d.snapAwayFromHidden(this.body.hiddenDates, l, this.previousDelta - i, !0);
                    if (u != h || c != l)return this.deltaDifference += i, this.props.touch.start = u, this.props.touch.end = c, void this._onDrag(t);
                    this.previousDelta = i, this._applyRange(h, l), this.body.emitter.emit("rangechange", {
                        start: new Date(this.start),
                        end: new Date(this.end),
                        byUser: !0
                    })
                }
            }, o.prototype._onDragEnd = function (t) {
                this.props.touch.dragging && this.options.moveable && this.props.touch.allowDragging && (this.props.touch.dragging = !1, this.body.dom.root && (this.body.dom.root.style.cursor = "auto"), this.body.emitter.emit("rangechanged", {
                    start: new Date(this.start),
                    end: new Date(this.end),
                    byUser: !0
                }))
            }, o.prototype._onMouseWheel = function (t) {
                if (this.options.zoomable && this.options.moveable && this._isInsideRange(t) && (!this.options.zoomKey || t[this.options.zoomKey])) {
                    var e = 0;
                    if (t.wheelDelta ? e = t.wheelDelta / 120 : t.detail && (e = -t.detail / 3), e) {
                        var i;
                        i = 0 > e ? 1 - e / 5 : 1 / (1 + e / 5);
                        var o = s({x: t.clientX, y: t.clientY}, this.body.dom.center), n = this._pointerToDate(o);
                        this.zoom(i, n, e)
                    }
                    t.preventDefault()
                }
            }, o.prototype._onTouch = function (t) {
                this.props.touch.start = this.start, this.props.touch.end = this.end, this.props.touch.allowDragging = !0, this.props.touch.center = null, this.scaleOffset = 0, this.deltaDifference = 0
            }, o.prototype._onPinch = function (t) {
                if (this.options.zoomable && this.options.moveable) {
                    this.props.touch.allowDragging = !1, this.props.touch.center || (this.props.touch.center = s(t.center, this.body.dom.center));
                    var e = 1 / (t.scale + this.scaleOffset), i = this._pointerToDate(this.props.touch.center), o = d.getHiddenDurationBetween(this.options.moment, this.body.hiddenDates, this.start, this.end), n = d.getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this, i), r = o - n, a = i - n + (this.props.touch.start - (i - n)) * e, h = i + r + (this.props.touch.end - (i + r)) * e;
                    this.startToFront = 0 >= 1 - e, this.endToFront = 0 >= e - 1;
                    var l = d.snapAwayFromHidden(this.body.hiddenDates, a, 1 - e, !0), u = d.snapAwayFromHidden(this.body.hiddenDates, h, e - 1, !0);
                    (l != a || u != h) && (this.props.touch.start = l, this.props.touch.end = u, this.scaleOffset = 1 - t.scale, a = l, h = u), this.setRange(a, h, !1, !0), this.startToFront = !1, this.endToFront = !0
                }
            }, o.prototype._isInsideRange = function (t) {
                var e = t.center ? t.center.x : t.clientX, i = e - r.getAbsoluteLeft(this.body.dom.centerContainer), o = this.body.util.toTime(i);
                return o >= this.start && o <= this.end
            }, o.prototype._pointerToDate = function (t) {
                var e, i = this.options.direction;
                if (n(i), "horizontal" == i)return this.body.util.toTime(t.x).valueOf();
                var o = this.body.domProps.center.height;
                return e = this.conversion(o), t.y / e.scale + e.offset
            }, o.prototype.zoom = function (t, e, i) {
                null == e && (e = (this.start + this.end) / 2);
                var o = d.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end), n = d.getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this, e), s = o - n, r = e - n + (this.start - (e - n)) * t, a = e + s + (this.end - (e + s)) * t;
                this.startToFront = i > 0 ? !1 : !0, this.endToFront = -i > 0 ? !1 : !0;
                var h = d.snapAwayFromHidden(this.body.hiddenDates, r, i, !0), l = d.snapAwayFromHidden(this.body.hiddenDates, a, -i, !0);
                (h != r || l != a) && (r = h, a = l), this.setRange(r, a, !1, !0), this.startToFront = !1, this.endToFront = !0
            }, o.prototype.move = function (t) {
                var e = this.end - this.start, i = this.start + e * t, o = this.end + e * t;
                this.start = i, this.end = o
            }, o.prototype.moveTo = function (t) {
                var e = (this.start + this.end) / 2, i = e - t, o = this.start - i, n = this.end - i;
                this.setRange(o, n)
            }, t.exports = o
        },
        function (t, e, i) {
            i(3);
            e.onTouch = function (t, e) {
                e.inputHandler = function (t) {
                    t.isFirst && !o && (e(t), o = !0, setTimeout(function () {
                        o = !1
                    }, 0))
                }, t.on("hammer.input", e.inputHandler)
            };
            var o = !1;
            e.onRelease = function (t, e) {
                return e.inputHandler = function (t) {
                    t.isFinal && !n && (e(t), n = !0, setTimeout(function () {
                        n = !1
                    }, 0))
                }, t.on("hammer.input", e.inputHandler)
            };
            var n = !1;
            e.offTouch = function (t, e) {
                t.off("hammer.input", e.inputHandler)
            }, e.offRelease = e.offTouch
        },
        function (t, e) {
            function i(t, e) {
                this.options = null, this.props = null
            }

            i.prototype.setOptions = function (t) {
                t && util.extend(this.options, t)
            }, i.prototype.redraw = function () {
                return !1
            }, i.prototype.destroy = function () {
            }, i.prototype._isResized = function () {
                var t = this.props._previousWidth !== this.props.width || this.props._previousHeight !== this.props.height;
                return this.props._previousWidth = this.props.width, this.props._previousHeight = this.props.height, t
            }, t.exports = i
        },
        function (t, e) {
            e.convertHiddenOptions = function (t, e, i) {
                if (e.hiddenDates = [], i && 1 == Array.isArray(i)) {
                    for (var o = 0; o < i.length; o++)if (void 0 === i[o].repeat) {
                        var n = {};
                        n.start = t(i[o].start).toDate().valueOf(), n.end = t(i[o].end).toDate().valueOf(), e.hiddenDates.push(n)
                    }
                    e.hiddenDates.sort(function (t, e) {
                        return t.start - e.start
                    })
                }
            }, e.updateHiddenDates = function (t, i, o) {
                if (o && void 0 !== i.domProps.centerContainer.width) {
                    e.convertHiddenOptions(t, i, o);
                    for (var n = t(i.range.start), s = t(i.range.end), r = i.range.end - i.range.start, a = r / i.domProps.centerContainer.width, h = 0; h < o.length; h++)if (void 0 !== o[h].repeat) {
                        var d = t(o[h].start), l = t(o[h].end);
                        if ("Invalid Date" == d._d)throw new Error("Supplied start date is not valid: " + o[h].start);
                        if ("Invalid Date" == l._d)throw new Error("Supplied end date is not valid: " + o[h].end);
                        var u = l - d;
                        if (u >= 4 * a) {
                            var c = 0, p = s.clone();
                            switch (o[h].repeat) {
                                case"daily":
                                    d.day() != l.day() && (c = 1), d.dayOfYear(n.dayOfYear()), d.year(n.year()), d.subtract(7, "days"), l.dayOfYear(n.dayOfYear()), l.year(n.year()), l.subtract(7 - c, "days"), p.add(1, "weeks");
                                    break;
                                case"weekly":
                                    var f = l.diff(d, "days"), m = d.day();
                                    d.date(n.date()), d.month(n.month()), d.year(n.year()), l = d.clone(), d.day(m), l.day(m), l.add(f, "days"), d.subtract(1, "weeks"), l.subtract(1, "weeks"), p.add(1, "weeks");
                                    break;
                                case"monthly":
                                    d.month() != l.month() && (c = 1), d.month(n.month()), d.year(n.year()), d.subtract(1, "months"), l.month(n.month()), l.year(n.year()), l.subtract(1, "months"), l.add(c, "months"), p.add(1, "months");
                                    break;
                                case"yearly":
                                    d.year() != l.year() && (c = 1), d.year(n.year()), d.subtract(1, "years"), l.year(n.year()), l.subtract(1, "years"), l.add(c, "years"), p.add(1, "years");
                                    break;
                                default:
                                    return void console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", o[h].repeat)
                            }
                            for (; p > d;)switch (i.hiddenDates.push({
                                start: d.valueOf(),
                                end: l.valueOf()
                            }), o[h].repeat) {
                                case"daily":
                                    d.add(1, "days"), l.add(1, "days");
                                    break;
                                case"weekly":
                                    d.add(1, "weeks"), l.add(1, "weeks");
                                    break;
                                case"monthly":
                                    d.add(1, "months"), l.add(1, "months");
                                    break;
                                case"yearly":
                                    d.add(1, "y"), l.add(1, "y");
                                    break;
                                default:
                                    return void console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", o[h].repeat)
                            }
                            i.hiddenDates.push({start: d.valueOf(), end: l.valueOf()})
                        }
                    }
                    e.removeDuplicates(i);
                    var v = e.isHidden(i.range.start, i.hiddenDates), g = e.isHidden(i.range.end, i.hiddenDates), y = i.range.start, b = i.range.end;
                    1 == v.hidden && (y = 1 == i.range.startToFront ? v.startDate - 1 : v.endDate + 1), 1 == g.hidden && (b = 1 == i.range.endToFront ? g.startDate - 1 : g.endDate + 1), (1 == v.hidden || 1 == g.hidden) && i.range._applyRange(y, b)
                }
            }, e.removeDuplicates = function (t) {
                for (var e = t.hiddenDates, i = [], o = 0; o < e.length; o++)for (var n = 0; n < e.length; n++)o != n && 1 != e[n].remove && 1 != e[o].remove && (e[n].start >= e[o].start && e[n].end <= e[o].end ? e[n].remove = !0 : e[n].start >= e[o].start && e[n].start <= e[o].end ? (e[o].end = e[n].end, e[n].remove = !0) : e[n].end >= e[o].start && e[n].end <= e[o].end && (e[o].start = e[n].start, e[n].remove = !0));
                for (var o = 0; o < e.length; o++)e[o].remove !== !0 && i.push(e[o]);
                t.hiddenDates = i, t.hiddenDates.sort(function (t, e) {
                    return t.start - e.start
                })
            }, e.printDates = function (t) {
                for (var e = 0; e < t.length; e++)console.log(e, new Date(t[e].start), new Date(t[e].end), t[e].start, t[e].end, t[e].remove)
            }, e.stepOverHiddenDates = function (t, e, i) {
                for (var o = !1, n = e.current.valueOf(), s = 0; s < e.hiddenDates.length; s++) {
                    var r = e.hiddenDates[s].start, a = e.hiddenDates[s].end;
                    if (n >= r && a > n) {
                        o = !0;
                        break
                    }
                }
                if (1 == o && n < e._end.valueOf() && n != i) {
                    var h = t(i), d = t(a);
                    h.year() != d.year() ? e.switchedYear = !0 : h.month() != d.month() ? e.switchedMonth = !0 : h.dayOfYear() != d.dayOfYear() && (e.switchedDay = !0), e.current = d
                }
            }, e.toScreen = function (t, i, o) {
                if (0 == t.body.hiddenDates.length) {
                    var n = t.range.conversion(o);
                    return (i.valueOf() - n.offset) * n.scale
                }
                var s = e.isHidden(i, t.body.hiddenDates);
                1 == s.hidden && (i = s.startDate);
                var r = e.getHiddenDurationBetween(t.body.hiddenDates, t.range.start, t.range.end);
                i = e.correctTimeForHidden(t.options.moment, t.body.hiddenDates, t.range, i);
                var n = t.range.conversion(o, r);
                return (i.valueOf() - n.offset) * n.scale
            }, e.toTime = function (t, i, o) {
                if (0 == t.body.hiddenDates.length) {
                    var n = t.range.conversion(o);
                    return new Date(i / n.scale + n.offset)
                }
                var s = e.getHiddenDurationBetween(t.body.hiddenDates, t.range.start, t.range.end), r = t.range.end - t.range.start - s, a = r * i / o, h = e.getAccumulatedHiddenDuration(t.body.hiddenDates, t.range, a), d = new Date(h + a + t.range.start);
                return d
            }, e.getHiddenDurationBetween = function (t, e, i) {
                for (var o = 0, n = 0; n < t.length; n++) {
                    var s = t[n].start, r = t[n].end;
                    s >= e && i > r && (o += r - s)
                }
                return o
            }, e.correctTimeForHidden = function (t, i, o, n) {
                return n = t(n).toDate().valueOf(), n -= e.getHiddenDurationBefore(t, i, o, n)
            }, e.getHiddenDurationBefore = function (t, e, i, o) {
                var n = 0;
                o = t(o).toDate().valueOf();
                for (var s = 0; s < e.length; s++) {
                    var r = e[s].start, a = e[s].end;
                    r >= i.start && a < i.end && o >= a && (n += a - r)
                }
                return n
            }, e.getAccumulatedHiddenDuration = function (t, e, i) {
                for (var o = 0, n = 0, s = e.start, r = 0; r < t.length; r++) {
                    var a = t[r].start, h = t[r].end;
                    if (a >= e.start && h < e.end) {
                        if (n += a - s, s = h, n >= i)break;
                        o += h - a
                    }
                }
                return o
            }, e.snapAwayFromHidden = function (t, i, o, n) {
                var s = e.isHidden(i, t);
                return 1 == s.hidden ? 0 > o ? 1 == n ? s.startDate - (s.endDate - i) - 1 : s.startDate - 1 : 1 == n ? s.endDate + (i - s.startDate) + 1 : s.endDate + 1 : i
            }, e.isHidden = function (t, e) {
                for (var i = 0; i < e.length; i++) {
                    var o = e[i].start, n = e[i].end;
                    if (t >= o && n > t)return {hidden: !0, startDate: o, endDate: n}
                }
                return {hidden: !1, startDate: o, endDate: n}
            }
        },
        function (t, e, i) {
            function o() {
            }

            var n = i(19), s = i(3), r = i(27), a = i(7), h = (i(14), i(16), i(26), i(31), i(39)), d = i(40), l = i(29), u = i(42);
            n(o.prototype), o.prototype._create = function (t) {
                function e(t) {
                    i.isActive() && i.emit("mousewheel", t)
                }

                this.dom = {}, this.dom.container = t, this.dom.root = document.createElement("div"), this.dom.background = document.createElement("div"), this.dom.backgroundVertical = document.createElement("div"), this.dom.backgroundHorizontal = document.createElement("div"), this.dom.centerContainer = document.createElement("div"), this.dom.leftContainer = document.createElement("div"), this.dom.rightContainer = document.createElement("div"), this.dom.center = document.createElement("div"), this.dom.left = document.createElement("div"), this.dom.right = document.createElement("div"), this.dom.top = document.createElement("div"), this.dom.bottom = document.createElement("div"), this.dom.shadowTop = document.createElement("div"), this.dom.shadowBottom = document.createElement("div"), this.dom.shadowTopLeft = document.createElement("div"), this.dom.shadowBottomLeft = document.createElement("div"), this.dom.shadowTopRight = document.createElement("div"), this.dom.shadowBottomRight = document.createElement("div"), this.dom.root.className = "vis-timeline", this.dom.background.className = "vis-panel vis-background", this.dom.backgroundVertical.className = "vis-panel vis-background vis-vertical", this.dom.backgroundHorizontal.className = "vis-panel vis-background vis-horizontal", this.dom.centerContainer.className = "vis-panel vis-center", this.dom.leftContainer.className = "vis-panel vis-left", this.dom.rightContainer.className = "vis-panel vis-right", this.dom.top.className = "vis-panel vis-top", this.dom.bottom.className = "vis-panel vis-bottom", this.dom.left.className = "vis-content", this.dom.center.className = "vis-content", this.dom.right.className = "vis-content", this.dom.shadowTop.className = "vis-shadow vis-top", this.dom.shadowBottom.className = "vis-shadow vis-bottom", this.dom.shadowTopLeft.className = "vis-shadow vis-top", this.dom.shadowBottomLeft.className = "vis-shadow vis-bottom", this.dom.shadowTopRight.className = "vis-shadow vis-top", this.dom.shadowBottomRight.className = "vis-shadow vis-bottom", this.dom.root.appendChild(this.dom.background), this.dom.root.appendChild(this.dom.backgroundVertical), this.dom.root.appendChild(this.dom.backgroundHorizontal), this.dom.root.appendChild(this.dom.centerContainer), this.dom.root.appendChild(this.dom.leftContainer), this.dom.root.appendChild(this.dom.rightContainer), this.dom.root.appendChild(this.dom.top), this.dom.root.appendChild(this.dom.bottom), this.dom.centerContainer.appendChild(this.dom.center), this.dom.leftContainer.appendChild(this.dom.left), this.dom.rightContainer.appendChild(this.dom.right), this.dom.centerContainer.appendChild(this.dom.shadowTop), this.dom.centerContainer.appendChild(this.dom.shadowBottom), this.dom.leftContainer.appendChild(this.dom.shadowTopLeft), this.dom.leftContainer.appendChild(this.dom.shadowBottomLeft), this.dom.rightContainer.appendChild(this.dom.shadowTopRight), this.dom.rightContainer.appendChild(this.dom.shadowBottomRight),
                    this.on("rangechange", this.redraw.bind(this)), this.on("touch", this._onTouch.bind(this)), this.on("pan", this._onDrag.bind(this));
                var i = this;
                this.on("change", function (t) {
                    t && 1 == t.queue ? i._redrawTimer || (i._redrawTimer = setTimeout(function () {
                            i._redrawTimer = null, i._redraw()
                        }, 0)) : i._redraw()
                }), this.hammer = new s(this.dom.root), this.hammer.get("pinch").set({enable: !0}), this.hammer.get("pan").set({
                    threshold: 5,
                    direction: 30
                }), this.listeners = {};
                var o = ["tap", "doubletap", "press", "pinch", "pan", "panstart", "panmove", "panend"];
                if (o.forEach(function (t) {
                        var e = function (e) {
                            i.isActive() && i.emit(t, e)
                        };
                        i.hammer.on(t, e), i.listeners[t] = e
                    }), r.onTouch(this.hammer, function (t) {
                        i.emit("touch", t)
                    }.bind(this)), r.onRelease(this.hammer, function (t) {
                        i.emit("release", t)
                    }.bind(this)), this.dom.root.addEventListener("mousewheel", e), this.dom.root.addEventListener("DOMMouseScroll", e), this.props = {
                        root: {},
                        background: {},
                        centerContainer: {},
                        leftContainer: {},
                        rightContainer: {},
                        center: {},
                        left: {},
                        right: {},
                        top: {},
                        bottom: {},
                        border: {},
                        scrollTop: 0,
                        scrollTopMin: 0
                    }, this.customTimes = [], this.touch = {}, this.redrawCount = 0, !t)throw new Error("No container provided");
                t.appendChild(this.dom.root)
            }, o.prototype.setOptions = function (t) {
                if (t) {
                    var e = ["width", "height", "minHeight", "maxHeight", "autoResize", "start", "end", "clickToUse", "dataAttributes", "hiddenDates", "locale", "locales", "moment"];
                    if (a.selectiveExtend(e, this.options, t), "orientation" in t && ("string" == typeof t.orientation ? this.options.orientation = {
                                item: t.orientation,
                                axis: t.orientation
                            } : "object" == typeof t.orientation && ("item" in t.orientation && (this.options.orientation.item = t.orientation.item), "axis" in t.orientation && (this.options.orientation.axis = t.orientation.axis))), "both" === this.options.orientation.axis) {
                        if (!this.timeAxis2) {
                            var i = this.timeAxis2 = new h(this.body);
                            i.setOptions = function (t) {
                                var e = t ? a.extend({}, t) : {};
                                e.orientation = "top", h.prototype.setOptions.call(i, e)
                            }, this.components.push(i)
                        }
                    } else if (this.timeAxis2) {
                        var o = this.components.indexOf(this.timeAxis2);
                        -1 !== o && this.components.splice(o, 1), this.timeAxis2.destroy(), this.timeAxis2 = null
                    }
                    if ("function" == typeof t.drawPoints && (t.drawPoints = {onRender: t.drawPoints}), "hiddenDates" in this.options && l.convertHiddenOptions(this.options.moment, this.body, this.options.hiddenDates), "clickToUse" in t && (t.clickToUse ? this.activator || (this.activator = new d(this.dom.root)) : this.activator && (this.activator.destroy(), delete this.activator)), "showCustomTime" in t)throw new Error("Option `showCustomTime` is deprecated. Create a custom time bar via timeline.addCustomTime(time [, id])");
                    this._initAutoResize()
                }
                if (this.components.forEach(function (e) {
                        return e.setOptions(t)
                    }), "configure" in t) {
                    this.configurator || (this.configurator = this._createConfigurator()), this.configurator.setOptions(t.configure);
                    var n = a.deepExtend({}, this.options);
                    this.components.forEach(function (t) {
                        a.deepExtend(n, t.options)
                    }), this.configurator.setModuleOptions({global: n})
                }
                this._redraw()
            }, o.prototype.isActive = function () {
                return !this.activator || this.activator.active
            }, o.prototype.destroy = function () {
                this.setItems(null), this.setGroups(null), this.off(), this._stopAutoResize(), this.dom.root.parentNode && this.dom.root.parentNode.removeChild(this.dom.root), this.dom = null, this.activator && (this.activator.destroy(), delete this.activator);
                for (var t in this.listeners)this.listeners.hasOwnProperty(t) && delete this.listeners[t];
                this.listeners = null, this.hammer = null, this.components.forEach(function (t) {
                    return t.destroy()
                }), this.body = null
            }, o.prototype.setCustomTime = function (t, e) {
                var i = this.customTimes.filter(function (t) {
                    return e === t.options.id
                });
                if (0 === i.length)throw new Error("No custom time bar found with id " + JSON.stringify(e));
                i.length > 0 && i[0].setCustomTime(t)
            }, o.prototype.getCustomTime = function (t) {
                var e = this.customTimes.filter(function (e) {
                    return e.options.id === t
                });
                if (0 === e.length)throw new Error("No custom time bar found with id " + JSON.stringify(t));
                return e[0].getCustomTime()
            }, o.prototype.getEventProperties = function (t) {
                return {event: t}
            }, o.prototype.addCustomTime = function (t, e) {
                var i = void 0 !== t ? a.convert(t, "Date").valueOf() : new Date, o = this.customTimes.some(function (t) {
                    return t.options.id === e
                });
                if (o)throw new Error("A custom time with id " + JSON.stringify(e) + " already exists");
                var n = new u(this.body, a.extend({}, this.options, {time: i, id: e}));
                return this.customTimes.push(n), this.components.push(n), this.redraw(), e
            }, o.prototype.removeCustomTime = function (t) {
                var e = this.customTimes.filter(function (e) {
                    return e.options.id === t
                });
                if (0 === e.length)throw new Error("No custom time bar found with id " + JSON.stringify(t));
                e.forEach(function (t) {
                    this.customTimes.splice(this.customTimes.indexOf(t), 1), this.components.splice(this.components.indexOf(t), 1), t.destroy()
                }.bind(this))
            }, o.prototype.getVisibleItems = function () {
                return this.itemSet && this.itemSet.getVisibleItems() || []
            }, o.prototype.fit = function (t) {
                var e = this.getDataRange();
                if (null !== e.min || null !== e.max) {
                    var i = e.max - e.min, o = new Date(e.min.valueOf() - .01 * i), n = new Date(e.max.valueOf() + .01 * i), s = t && void 0 !== t.animation ? t.animation : !0;
                    this.range.setRange(o, n, s)
                }
            }, o.prototype.getDataRange = function () {
                throw new Error("Cannot invoke abstract method getDataRange")
            }, o.prototype.setWindow = function (t, e, i) {
                var o;
                if (1 == arguments.length) {
                    var n = arguments[0];
                    o = void 0 !== n.animation ? n.animation : !0, this.range.setRange(n.start, n.end, o)
                } else o = i && void 0 !== i.animation ? i.animation : !0, this.range.setRange(t, e, o)
            }, o.prototype.moveTo = function (t, e) {
                var i = this.range.end - this.range.start, o = a.convert(t, "Date").valueOf(), n = o - i / 2, s = o + i / 2, r = e && void 0 !== e.animation ? e.animation : !0;
                this.range.setRange(n, s, r)
            }, o.prototype.getWindow = function () {
                var t = this.range.getRange();
                return {start: new Date(t.start), end: new Date(t.end)}
            }, o.prototype.redraw = function () {
                this._redraw()
            }, o.prototype._redraw = function () {
                var t = !1, e = this.options, i = this.props, o = this.dom;
                if (o) {
                    l.updateHiddenDates(this.options.moment, this.body, this.options.hiddenDates), "top" == e.orientation ? (a.addClassName(o.root, "vis-top"), a.removeClassName(o.root, "vis-bottom")) : (a.removeClassName(o.root, "vis-top"), a.addClassName(o.root, "vis-bottom")), o.root.style.maxHeight = a.option.asSize(e.maxHeight, ""), o.root.style.minHeight = a.option.asSize(e.minHeight, ""), o.root.style.width = a.option.asSize(e.width, ""), i.border.left = (o.centerContainer.offsetWidth - o.centerContainer.clientWidth) / 2, i.border.right = i.border.left, i.border.top = (o.centerContainer.offsetHeight - o.centerContainer.clientHeight) / 2, i.border.bottom = i.border.top;
                    var n = o.root.offsetHeight - o.root.clientHeight, s = o.root.offsetWidth - o.root.clientWidth;
                    0 === o.centerContainer.clientHeight && (i.border.left = i.border.top, i.border.right = i.border.left), 0 === o.root.clientHeight && (s = n), i.center.height = o.center.offsetHeight, i.left.height = o.left.offsetHeight, i.right.height = o.right.offsetHeight, i.top.height = o.top.clientHeight || -i.border.top, i.bottom.height = o.bottom.clientHeight || -i.border.bottom;
                    var r = Math.max(i.left.height, i.center.height, i.right.height), h = i.top.height + r + i.bottom.height + n + i.border.top + i.border.bottom;
                    o.root.style.height = a.option.asSize(e.height, h + "px"), i.root.height = o.root.offsetHeight, i.background.height = i.root.height - n;
                    var d = i.root.height - i.top.height - i.bottom.height - n;
                    i.centerContainer.height = d, i.leftContainer.height = d, i.rightContainer.height = i.leftContainer.height, i.root.width = o.root.offsetWidth, i.background.width = i.root.width - s, i.left.width = o.leftContainer.clientWidth || -i.border.left, i.leftContainer.width = i.left.width, i.right.width = o.rightContainer.clientWidth || -i.border.right, i.rightContainer.width = i.right.width;
                    var u = i.root.width - i.left.width - i.right.width - s;
                    i.center.width = u, i.centerContainer.width = u, i.top.width = u, i.bottom.width = u, o.background.style.height = i.background.height + "px", o.backgroundVertical.style.height = i.background.height + "px", o.backgroundHorizontal.style.height = i.centerContainer.height + "px", o.centerContainer.style.height = i.centerContainer.height + "px", o.leftContainer.style.height = i.leftContainer.height + "px", o.rightContainer.style.height = i.rightContainer.height + "px", o.background.style.width = i.background.width + "px", o.backgroundVertical.style.width = i.centerContainer.width + "px", o.backgroundHorizontal.style.width = i.background.width + "px", o.centerContainer.style.width = i.center.width + "px", o.top.style.width = i.top.width + "px", o.bottom.style.width = i.bottom.width + "px", o.background.style.left = "0", o.background.style.top = "0", o.backgroundVertical.style.left = i.left.width + i.border.left + "px", o.backgroundVertical.style.top = "0", o.backgroundHorizontal.style.left = "0", o.backgroundHorizontal.style.top = i.top.height + "px", o.centerContainer.style.left = i.left.width + "px", o.centerContainer.style.top = i.top.height + "px", o.leftContainer.style.left = "0", o.leftContainer.style.top = i.top.height + "px", o.rightContainer.style.left = i.left.width + i.center.width + "px", o.rightContainer.style.top = i.top.height + "px", o.top.style.left = i.left.width + "px", o.top.style.top = "0", o.bottom.style.left = i.left.width + "px", o.bottom.style.top = i.top.height + i.centerContainer.height + "px", this._updateScrollTop();
                    var c = this.props.scrollTop;
                    "top" != e.orientation.item && (c += Math.max(this.props.centerContainer.height - this.props.center.height - this.props.border.top - this.props.border.bottom, 0)), o.center.style.left = "0", o.center.style.top = c + "px", o.left.style.left = "0", o.left.style.top = c + "px", o.right.style.left = "0", o.right.style.top = c + "px";
                    var p = 0 == this.props.scrollTop ? "hidden" : "", f = this.props.scrollTop == this.props.scrollTopMin ? "hidden" : "";
                    if (o.shadowTop.style.visibility = p, o.shadowBottom.style.visibility = f, o.shadowTopLeft.style.visibility = p, o.shadowBottomLeft.style.visibility = f, o.shadowTopRight.style.visibility = p, o.shadowBottomRight.style.visibility = f, this.components.forEach(function (e) {
                            t = e.redraw() || t
                        }), t) {
                        var m = 3;
                        this.redrawCount < m ? (this.redrawCount++, this._redraw()) : console.log("WARNING: infinite loop in redraw?"), this.redrawCount = 0
                    }
                }
            }, o.prototype.repaint = function () {
                throw new Error("Function repaint is deprecated. Use redraw instead.")
            }, o.prototype.setCurrentTime = function (t) {
                if (!this.currentTime)throw new Error("Option showCurrentTime must be true");
                this.currentTime.setCurrentTime(t)
            }, o.prototype.getCurrentTime = function () {
                if (!this.currentTime)throw new Error("Option showCurrentTime must be true");
                return this.currentTime.getCurrentTime()
            }, o.prototype._toTime = function (t) {
                return l.toTime(this, t, this.props.center.width)
            }, o.prototype._toGlobalTime = function (t) {
                return l.toTime(this, t, this.props.root.width)
            }, o.prototype._toScreen = function (t) {
                return l.toScreen(this, t, this.props.center.width)
            }, o.prototype._toGlobalScreen = function (t) {
                return l.toScreen(this, t, this.props.root.width)
            }, o.prototype._initAutoResize = function () {
                1 == this.options.autoResize ? this._startAutoResize() : this._stopAutoResize()
            }, o.prototype._startAutoResize = function () {
                var t = this;
                this._stopAutoResize(), this._onResize = function () {
                    return 1 != t.options.autoResize ? void t._stopAutoResize() : void(t.dom.root && (t.dom.root.offsetWidth != t.props.lastWidth || t.dom.root.offsetHeight != t.props.lastHeight) && (t.props.lastWidth = t.dom.root.offsetWidth, t.props.lastHeight = t.dom.root.offsetHeight, t.emit("change")))
                }, a.addEventListener(window, "resize", this._onResize), this.watchTimer = setInterval(this._onResize, 1e3)
            }, o.prototype._stopAutoResize = function () {
                this.watchTimer && (clearInterval(this.watchTimer), this.watchTimer = void 0), a.removeEventListener(window, "resize", this._onResize), this._onResize = null
            }, o.prototype._onTouch = function (t) {
                this.touch.allowDragging = !0, this.touch.initialScrollTop = this.props.scrollTop
            }, o.prototype._onPinch = function (t) {
                this.touch.allowDragging = !1
            }, o.prototype._onDrag = function (t) {
                if (this.touch.allowDragging) {
                    var e = t.deltaY, i = this._getScrollTop(), o = this._setScrollTop(this.touch.initialScrollTop + e);
                    o != i && (this._redraw(), this.emit("verticalDrag"))
                }
            }, o.prototype._setScrollTop = function (t) {
                return this.props.scrollTop = t, this._updateScrollTop(), this.props.scrollTop
            }, o.prototype._updateScrollTop = function () {
                var t = Math.min(this.props.centerContainer.height - this.props.center.height, 0);
                return t != this.props.scrollTopMin && ("top" != this.options.orientation.item && (this.props.scrollTop += t - this.props.scrollTopMin), this.props.scrollTopMin = t), this.props.scrollTop > 0 && (this.props.scrollTop = 0), this.props.scrollTop < t && (this.props.scrollTop = t), this.props.scrollTop
            }, o.prototype._getScrollTop = function () {
                return this.props.scrollTop
            }, o.prototype._createConfigurator = function () {
                throw new Error("Cannot invoke abstract method _createConfigurator")
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                this.body = t, this.defaultOptions = {
                    type: null,
                    orientation: {item: "bottom"},
                    align: "auto",
                    stack: !0,
                    groupOrder: null,
                    selectable: !0,
                    multiselect: !1,
                    editable: {updateTime: !1, updateGroup: !1, add: !1, remove: !1},
                    snap: h.snap,
                    onAdd: function (t, e) {
                        e(t)
                    },
                    onUpdate: function (t, e) {
                        e(t)
                    },
                    onMove: function (t, e) {
                        e(t)
                    },
                    onRemove: function (t, e) {
                        e(t)
                    },
                    onMoving: function (t, e) {
                        e(t)
                    },
                    margin: {item: {horizontal: 10, vertical: 10}, axis: 20}
                }, this.options = s.extend({}, this.defaultOptions), this.itemOptions = {
                    type: {
                        start: "Date",
                        end: "Date"
                    }
                }, this.conversion = {
                    toScreen: t.util.toScreen,
                    toTime: t.util.toTime
                }, this.dom = {}, this.props = {}, this.hammer = null;
                var i = this;
                this.itemsData = null, this.groupsData = null, this.itemListeners = {
                    add: function (t, e, o) {
                        i._onAdd(e.items)
                    }, update: function (t, e, o) {
                        i._onUpdate(e.items)
                    }, remove: function (t, e, o) {
                        i._onRemove(e.items)
                    }
                }, this.groupListeners = {
                    add: function (t, e, o) {
                        i._onAddGroups(e.items)
                    }, update: function (t, e, o) {
                        i._onUpdateGroups(e.items)
                    }, remove: function (t, e, o) {
                        i._onRemoveGroups(e.items)
                    }
                }, this.items = {}, this.groups = {}, this.groupIds = [], this.selection = [], this.stackDirty = !0, this.touchParams = {}, this._create(), this.setOptions(e)
            }

            var n = i(3), s = i(7), r = i(14), a = i(16), h = i(35), d = i(28), l = i(32), u = i(36), c = i(37), p = i(1), f = i(34), m = i(38), v = "__ungrouped__", g = "__background__";
            o.prototype = new d, o.types = {
                background: m,
                box: c,
                range: f,
                point: p
            }, o.prototype._create = function () {
                var t = document.createElement("div");
                t.className = "vis-itemset", t["timeline-itemset"] = this, this.dom.frame = t;
                var e = document.createElement("div");
                e.className = "vis-background", t.appendChild(e), this.dom.background = e;
                var i = document.createElement("div");
                i.className = "vis-foreground", t.appendChild(i), this.dom.foreground = i;
                var o = document.createElement("div");
                o.className = "vis-axis", this.dom.axis = o;
                var s = document.createElement("div");
                s.className = "vis-labelset", this.dom.labelSet = s, this._updateUngrouped();
                var r = new u(g, null, this);
                r.show(), this.groups[g] = r, this.hammer = new n(this.body.dom.centerContainer), this.hammer.on("hammer.input", function (t) {
                    t.isFirst && this._onTouch(t)
                }.bind(this)), this.hammer.on("panstart", this._onDragStart.bind(this)), this.hammer.on("panmove", this._onDrag.bind(this)), this.hammer.on("panend", this._onDragEnd.bind(this)), this.hammer.get("pan").set({
                    threshold: 5,
                    direction: 30
                }), this.hammer.on("tap", this._onSelectItem.bind(this)), this.hammer.on("press", this._onMultiSelectItem.bind(this)), this.hammer.on("doubletap", this._onAddItem.bind(this)), this.show()
            }, o.prototype.setOptions = function (t) {
                if (t) {
                    var e = ["type", "align", "order", "stack", "selectable", "multiselect", "groupOrder", "dataAttributes", "template", "groupTemplate", "hide", "snap"];
                    s.selectiveExtend(e, this.options, t), "orientation" in t && ("string" == typeof t.orientation ? this.options.orientation.item = "top" === t.orientation ? "top" : "bottom" : "object" == typeof t.orientation && "item" in t.orientation && (this.options.orientation.item = t.orientation.item)), "margin" in t && ("number" == typeof t.margin ? (this.options.margin.axis = t.margin, this.options.margin.item.horizontal = t.margin, this.options.margin.item.vertical = t.margin) : "object" == typeof t.margin && (s.selectiveExtend(["axis"], this.options.margin, t.margin), "item" in t.margin && ("number" == typeof t.margin.item ? (this.options.margin.item.horizontal = t.margin.item, this.options.margin.item.vertical = t.margin.item) : "object" == typeof t.margin.item && s.selectiveExtend(["horizontal", "vertical"], this.options.margin.item, t.margin.item)))), "editable" in t && ("boolean" == typeof t.editable ? (this.options.editable.updateTime = t.editable, this.options.editable.updateGroup = t.editable, this.options.editable.add = t.editable, this.options.editable.remove = t.editable) : "object" == typeof t.editable && s.selectiveExtend(["updateTime", "updateGroup", "add", "remove"], this.options.editable, t.editable));
                    var i = function (e) {
                        var i = t[e];
                        if (i) {
                            if (!(i instanceof Function))throw new Error("option " + e + " must be a function " + e + "(item, callback)");
                            this.options[e] = i
                        }
                    }.bind(this);
                    ["onAdd", "onUpdate", "onRemove", "onMove", "onMoving"].forEach(i), this.markDirty()
                }
            }, o.prototype.markDirty = function (t) {
                this.groupIds = [], this.stackDirty = !0, t && t.refreshItems && s.forEach(this.items, function (t) {
                    t.dirty = !0, t.displayed && t.redraw()
                })
            }, o.prototype.destroy = function () {
                this.hide(), this.setItems(null), this.setGroups(null), this.hammer = null, this.body = null, this.conversion = null
            }, o.prototype.hide = function () {
                this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame), this.dom.axis.parentNode && this.dom.axis.parentNode.removeChild(this.dom.axis), this.dom.labelSet.parentNode && this.dom.labelSet.parentNode.removeChild(this.dom.labelSet)
            }, o.prototype.show = function () {
                this.dom.frame.parentNode || this.body.dom.center.appendChild(this.dom.frame), this.dom.axis.parentNode || this.body.dom.backgroundVertical.appendChild(this.dom.axis), this.dom.labelSet.parentNode || this.body.dom.left.appendChild(this.dom.labelSet)
            }, o.prototype.setSelection = function (t) {
                var e, i, o, n;
                for (void 0 == t && (t = []), Array.isArray(t) || (t = [t]), e = 0, i = this.selection.length; i > e; e++)o = this.selection[e], n = this.items[o], n && n.unselect();
                for (this.selection = [], e = 0, i = t.length; i > e; e++)o = t[e], n = this.items[o], n && (this.selection.push(o), n.select())
            }, o.prototype.getSelection = function () {
                return this.selection.concat([])
            }, o.prototype.getVisibleItems = function () {
                var t = this.body.range.getRange(), e = this.body.util.toScreen(t.start), i = this.body.util.toScreen(t.end), o = [];
                for (var n in this.groups)if (this.groups.hasOwnProperty(n))for (var s = this.groups[n], r = s.visibleItems, a = 0; a < r.length; a++) {
                    var h = r[a];
                    h.left < i && h.left + h.width > e && o.push(h.id)
                }
                return o
            }, o.prototype._deselect = function (t) {
                for (var e = this.selection, i = 0, o = e.length; o > i; i++)if (e[i] == t) {
                    e.splice(i, 1);
                    break
                }
            }, o.prototype.redraw = function () {
                var t = this.options.margin, e = this.body.range, i = s.option.asSize, o = this.options, n = o.orientation.item, r = !1, a = this.dom.frame;
                this.props.top = this.body.domProps.top.height + this.body.domProps.border.top, this.props.left = this.body.domProps.left.width + this.body.domProps.border.left, a.className = "vis-itemset", r = this._orderGroups() || r;
                var h = e.end - e.start, d = h != this.lastVisibleInterval || this.props.width != this.props.lastWidth;
                d && (this.stackDirty = !0), this.lastVisibleInterval = h, this.props.lastWidth = this.props.width;
                var l = this.stackDirty, u = this._firstGroup(), c = {item: t.item, axis: t.axis}, p = {
                    item: t.item,
                    axis: t.item.vertical / 2
                }, f = 0, m = t.axis + t.item.vertical;
                return this.groups[g].redraw(e, p, l), s.forEach(this.groups, function (t) {
                    var i = t == u ? c : p, o = t.redraw(e, i, l);
                    r = o || r, f += t.height
                }), f = Math.max(f, m), this.stackDirty = !1, a.style.height = i(f), this.props.width = a.offsetWidth, this.props.height = f, this.dom.axis.style.top = i("top" == n ? this.body.domProps.top.height + this.body.domProps.border.top : this.body.domProps.top.height + this.body.domProps.centerContainer.height), this.dom.axis.style.left = "0", r = this._isResized() || r
            }, o.prototype._firstGroup = function () {
                var t = "top" == this.options.orientation.item ? 0 : this.groupIds.length - 1, e = this.groupIds[t], i = this.groups[e] || this.groups[v];
                return i || null
            }, o.prototype._updateUngrouped = function () {
                var t, e, i = this.groups[v];
                this.groups[g];
                if (this.groupsData) {
                    if (i) {
                        i.hide(), delete this.groups[v];
                        for (e in this.items)if (this.items.hasOwnProperty(e)) {
                            t = this.items[e], t.parent && t.parent.remove(t);
                            var o = this._getGroupId(t.data), n = this.groups[o];
                            n && n.add(t) || t.hide()
                        }
                    }
                } else if (!i) {
                    var s = null, r = null;
                    i = new l(s, r, this), this.groups[v] = i;
                    for (e in this.items)this.items.hasOwnProperty(e) && (t = this.items[e], i.add(t));
                    i.show()
                }
            }, o.prototype.getLabelSet = function () {
                return this.dom.labelSet
            }, o.prototype.setItems = function (t) {
                var e, i = this, o = this.itemsData;
                if (t) {
                    if (!(t instanceof r || t instanceof a))throw new TypeError("Data must be an instance of DataSet or DataView");
                    this.itemsData = t
                } else this.itemsData = null;
                if (o && (s.forEach(this.itemListeners, function (t, e) {
                        o.off(e, t)
                    }), e = o.getIds(), this._onRemove(e)), this.itemsData) {
                    var n = this.id;
                    s.forEach(this.itemListeners, function (t, e) {
                        i.itemsData.on(e, t, n)
                    }), e = this.itemsData.getIds(), this._onAdd(e), this._updateUngrouped()
                }
            }, o.prototype.getItems = function () {
                return this.itemsData
            }, o.prototype.setGroups = function (t) {
                var e, i = this;
                if (this.groupsData && (s.forEach(this.groupListeners, function (t, e) {
                        i.groupsData.off(e, t)
                    }), e = this.groupsData.getIds(), this.groupsData = null, this._onRemoveGroups(e)), t) {
                    if (!(t instanceof r || t instanceof a))throw new TypeError("Data must be an instance of DataSet or DataView");
                    this.groupsData = t
                } else this.groupsData = null;
                if (this.groupsData) {
                    var o = this.id;
                    s.forEach(this.groupListeners, function (t, e) {
                        i.groupsData.on(e, t, o)
                    }), e = this.groupsData.getIds(), this._onAddGroups(e)
                }
                this._updateUngrouped(), this._order(), this.body.emitter.emit("change", {queue: !0})
            }, o.prototype.getGroups = function () {
                return this.groupsData
            }, o.prototype.removeItem = function (t) {
                var e = this.itemsData.get(t), i = this.itemsData.getDataSet();
                e && this.options.onRemove(e, function (e) {
                    e && i.remove(t)
                })
            }, o.prototype._getType = function (t) {
                return t.type || this.options.type || (t.end ? "range" : "box")
            }, o.prototype._getGroupId = function (t) {
                var e = this._getType(t);
                return "background" == e && void 0 == t.group ? g : this.groupsData ? t.group : v
            }, o.prototype._onUpdate = function (t) {
                var e = this;
                t.forEach(function (t) {
                    var i, n = e.itemsData.get(t, e.itemOptions), s = e.items[t], r = e._getType(n), a = o.types[r];
                    if (s && (a && s instanceof a ? e._updateItem(s, n) : (i = s.selected, e._removeItem(s), s = null)), !s) {
                        if (!a)throw"rangeoverflow" == r ? new TypeError('Item type "rangeoverflow" is deprecated. Use css styling instead: .vis-item.vis-range .vis-item-content {overflow: visible;}') : new TypeError('Unknown item type "' + r + '"');
                        s = new a(n, e.conversion, e.options), s.id = t, e._addItem(s), i && (this.selection.push(t), s.select())
                    }
                }.bind(this)), this._order(), this.stackDirty = !0, this.body.emitter.emit("change", {queue: !0})
            }, o.prototype._onAdd = o.prototype._onUpdate, o.prototype._onRemove = function (t) {
                var e = 0, i = this;
                t.forEach(function (t) {
                    var o = i.items[t];
                    o && (e++, i._removeItem(o))
                }), e && (this._order(), this.stackDirty = !0, this.body.emitter.emit("change", {queue: !0}))
            }, o.prototype._order = function () {
                s.forEach(this.groups, function (t) {
                    t.order()
                })
            }, o.prototype._onUpdateGroups = function (t) {
                this._onAddGroups(t)
            }, o.prototype._onAddGroups = function (t) {
                var e = this;
                t.forEach(function (t) {
                    var i = e.groupsData.get(t), o = e.groups[t];
                    if (o) o.setData(i); else {
                        if (t == v || t == g)throw new Error("Illegal group id. " + t + " is a reserved id.");
                        var n = Object.create(e.options);
                        s.extend(n, {height: null}), o = new l(t, i, e), e.groups[t] = o;
                        for (var r in e.items)if (e.items.hasOwnProperty(r)) {
                            var a = e.items[r];
                            a.data.group == t && o.add(a)
                        }
                        o.order(), o.show()
                    }
                }), this.body.emitter.emit("change", {queue: !0})
            }, o.prototype._onRemoveGroups = function (t) {
                var e = this.groups;
                t.forEach(function (t) {
                    var i = e[t];
                    i && (i.hide(), delete e[t])
                }), this.markDirty(), this.body.emitter.emit("change", {queue: !0})
            }, o.prototype._orderGroups = function () {
                if (this.groupsData) {
                    var t = this.groupsData.getIds({order: this.options.groupOrder}), e = !s.equalArray(t, this.groupIds);
                    if (e) {
                        var i = this.groups;
                        t.forEach(function (t) {
                            i[t].hide()
                        }), t.forEach(function (t) {
                            i[t].show()
                        }), this.groupIds = t
                    }
                    return e
                }
                return !1
            }, o.prototype._addItem = function (t) {
                this.items[t.id] = t;
                var e = this._getGroupId(t.data), i = this.groups[e];
                i && i.add(t)
            }, o.prototype._updateItem = function (t, e) {
                var i = t.data.group, o = t.data.subgroup;
                if (t.setData(e), i != t.data.group || o != t.data.subgroup) {
                    var n = this.groups[i];
                    n && n.remove(t);
                    var s = this._getGroupId(t.data), r = this.groups[s];
                    r && r.add(t)
                }
            }, o.prototype._removeItem = function (t) {
                t.hide(), delete this.items[t.id];
                var e = this.selection.indexOf(t.id);
                -1 != e && this.selection.splice(e, 1), t.parent && t.parent.remove(t)
            }, o.prototype._constructByEndArray = function (t) {
                for (var e = [], i = 0; i < t.length; i++)t[i] instanceof f && e.push(t[i]);
                return e
            }, o.prototype._onTouch = function (t) {
                this.touchParams.item = this.itemFromTarget(t), this.touchParams.dragLeftItem = t.target.dragLeftItem || !1, this.touchParams.dragRightItem = t.target.dragRightItem || !1, this.touchParams.itemProps = null
            }, o.prototype._getGroupIndex = function (t) {
                for (var e = 0; e < this.groupIds.length; e++)if (t == this.groupIds[e])return e
            }, o.prototype._onDragStart = function (t) {
                var e, i = this.touchParams.item || null, o = this;
                if (i && i.selected) {
                    if (!this.options.editable.updateTime && !this.options.editable.updateGroup && !i.editable)return;
                    if (i.editable === !1)return;
                    var n = this.touchParams.dragLeftItem, r = this.touchParams.dragRightItem;
                    if (n) e = {
                        item: n,
                        initialX: t.center.x,
                        dragLeft: !0,
                        data: s.extend({}, i.data)
                    }, this.touchParams.itemProps = [e]; else if (r) e = {
                        item: r,
                        initialX: t.center.x,
                        dragRight: !0,
                        data: s.extend({}, i.data)
                    }, this.touchParams.itemProps = [e]; else {
                        this.touchParams.selectedItem = i;
                        var a = this._getGroupIndex(i.data.group);
                        this.touchParams.itemProps = this.getSelection().map(function (e) {
                            var i = o.items[e], n = o._getGroupIndex(i.data.group), r = {
                                item: i,
                                initialX: t.center.x,
                                groupOffset: a - n,
                                data: s.extend({}, i.data)
                            };
                            return r
                        })
                    }
                    t.stopPropagation()
                } else this.options.editable.add && (t.srcEvent.ctrlKey || t.srcEvent.metaKey) && this._onDragStartAddItem(t)
            }, o.prototype._onDragStartAddItem = function (t) {
                var e = this.options.snap || null, i = s.getAbsoluteLeft(this.dom.frame), o = t.center.x - i - 10, n = this.body.util.toTime(o), r = this.body.util.getScale(), a = this.body.util.getStep(), h = e ? e(n, r, a) : h, d = h, l = {
                    type: "range",
                    start: h,
                    end: d,
                    content: "new item"
                }, u = s.randomUUID();
                l[this.itemsData._fieldId] = u;
                var c = this.groupFromTarget(t);
                c && (l.group = c.groupId);
                var p = new f(l, this.conversion, this.options);
                p.id = u, p.data = l, this._addItem(p);
                var m = {item: p, dragRight: !0, initialX: t.center.x, data: s.extend({}, l)};
                this.touchParams.itemProps = [m], t.stopPropagation()
            }, o.prototype._onDrag = function (t) {
                if (this.touchParams.itemProps) {
                    t.stopPropagation();
                    var e = this, i = this.options.snap || null, o = this.body.dom.root.offsetLeft + this.body.domProps.left.width, n = this.body.util.getScale(), r = this.body.util.getStep(), a = this.touchParams.selectedItem, h = e.options.editable.updateGroup, d = null;
                    if (h && a && void 0 != a.data.group) {
                        var l = e.groupFromTarget(t);
                        l && (d = this._getGroupIndex(l.groupId))
                    }
                    this.touchParams.itemProps.forEach(function (a) {
                        var h = e.body.util.toTime(t.center.x - o), l = e.body.util.toTime(a.initialX - o), u = h - l, c = s.extend({}, a.item.data);
                        if (a.item.editable !== !1) {
                            var p = e.options.editable.updateTime || a.item.editable === !0;
                            if (p)if (a.dragLeft) {
                                if (void 0 != c.start) {
                                    var f = s.convert(a.data.start, "Date"), m = new Date(f.valueOf() + u);
                                    c.start = i ? i(m, n, r) : m
                                }
                            } else if (a.dragRight) {
                                if (void 0 != c.end) {
                                    var v = s.convert(a.data.end, "Date"), g = new Date(v.valueOf() + u);
                                    c.end = i ? i(g, n, r) : g
                                }
                            } else if (void 0 != c.start) {
                                var f = s.convert(a.data.start, "Date").valueOf(), m = new Date(f + u);
                                if (void 0 != c.end) {
                                    var v = s.convert(a.data.end, "Date"), y = v.valueOf() - f.valueOf();
                                    c.start = i ? i(m, n, r) : m, c.end = new Date(c.start.valueOf() + y)
                                } else c.start = i ? i(m, n, r) : m
                            }
                            var b = e.options.editable.updateGroup || a.item.editable === !0;
                            if (b && !a.dragLeft && !a.dragRight && null != d && void 0 != c.group) {
                                var w = d - a.groupOffset;
                                w = Math.max(0, w), w = Math.min(e.groupIds.length - 1, w), c.group = e.groupIds[w]
                            }
                            e.options.onMoving(c, function (t) {
                                t && a.item.setData(t)
                            })
                        }
                    }), this.stackDirty = !0, this.body.emitter.emit("change")
                }
            }, o.prototype._moveToGroup = function (t, e) {
                var i = this.groups[e];
                if (i && i.groupId != t.data.group) {
                    var o = t.parent;
                    o.remove(t), o.order(), i.add(t), i.order(), t.data.group = i.groupId
                }
            }, o.prototype._onDragEnd = function (t) {
                if (this.touchParams.itemProps) {
                    t.stopPropagation();
                    var e = this, i = this.itemsData.getDataSet(), o = this.touchParams.itemProps;
                    this.touchParams.itemProps = null, o.forEach(function (t) {
                        var o = t.item.id, n = null != e.itemsData.get(o, e.itemOptions);
                        if (n) {
                            var r = s.extend({}, t.item.data);
                            e.options.onMove(r, function (n) {
                                n ? (n[i._fieldId] = o, i.update(n)) : (t.item.setData(t.data), e.stackDirty = !0, e.body.emitter.emit("change"))
                            })
                        } else e.options.onAdd(t.item.data, function (i) {
                            e._removeItem(t.item), i && e.itemsData.getDataSet().add(i), e.stackDirty = !0, e.body.emitter.emit("change")
                        })
                    })
                }
            }, o.prototype._onSelectItem = function (t) {
                if (this.options.selectable) {
                    var e = t.srcEvent && (t.srcEvent.ctrlKey || t.srcEvent.metaKey), i = t.srcEvent && t.srcEvent.shiftKey;
                    if (e || i)return void this._onMultiSelectItem(t);
                    var o = this.getSelection(), n = this.itemFromTarget(t), s = n ? [n.id] : [];
                    this.setSelection(s);
                    var r = this.getSelection();
                    (r.length > 0 || o.length > 0) && this.body.emitter.emit("select", {items: r, event: t})
                }
            }, o.prototype._onAddItem = function (t) {
                if (this.options.selectable && this.options.editable.add) {
                    var e = this, i = this.options.snap || null, o = this.itemFromTarget(t);
                    if (t.stopPropagation(), o) {
                        var n = e.itemsData.get(o.id);
                        this.options.onUpdate(n, function (t) {
                            t && e.itemsData.getDataSet().update(t)
                        })
                    } else {
                        var r = s.getAbsoluteLeft(this.dom.frame), a = t.center.x - r, h = this.body.util.toTime(a), d = this.body.util.getScale(), l = this.body.util.getStep(), u = {
                            start: i ? i(h, d, l) : h,
                            content: "new item"
                        };
                        if ("range" === this.options.type) {
                            var c = this.body.util.toTime(a + this.props.width / 5);
                            u.end = i ? i(c, d, l) : c
                        }
                        u[this.itemsData._fieldId] = s.randomUUID();
                        var p = this.groupFromTarget(t);
                        p && (u.group = p.groupId), this.options.onAdd(u, function (t) {
                            t && e.itemsData.getDataSet().add(t)
                        })
                    }
                }
            }, o.prototype._onMultiSelectItem = function (t) {
                if (this.options.selectable) {
                    var e = this.itemFromTarget(t);
                    if (e) {
                        var i = this.options.multiselect ? this.getSelection() : [], n = t.srcEvent && t.srcEvent.shiftKey || !1;
                        if (n && this.options.multiselect) {
                            i.push(e.id);
                            var s = o._getItemRange(this.itemsData.get(i, this.itemOptions));
                            i = [];
                            for (var r in this.items)if (this.items.hasOwnProperty(r)) {
                                var a = this.items[r], h = a.data.start, d = void 0 !== a.data.end ? a.data.end : h;
                                h >= s.min && d <= s.max && !(a instanceof m) && i.push(a.id)
                            }
                        } else {
                            var l = i.indexOf(e.id);
                            -1 == l ? i.push(e.id) : i.splice(l, 1)
                        }
                        this.setSelection(i), this.body.emitter.emit("select", {items: this.getSelection(), event: t})
                    }
                }
            }, o._getItemRange = function (t) {
                var e = null, i = null;
                return t.forEach(function (t) {
                    (null == i || t.start < i) && (i = t.start), void 0 != t.end ? (null == e || t.end > e) && (e = t.end) : (null == e || t.start > e) && (e = t.start)
                }), {min: i, max: e}
            }, o.prototype.itemFromTarget = function (t) {
                for (var e = t.target; e;) {
                    if (e.hasOwnProperty("timeline-item"))return e["timeline-item"];
                    e = e.parentNode
                }
                return null
            }, o.prototype.groupFromTarget = function (t) {
                for (var e = t.center ? t.center.y : t.clientY, i = 0; i < this.groupIds.length; i++) {
                    var o = this.groupIds[i], n = this.groups[o], r = n.dom.foreground, a = s.getAbsoluteTop(r);
                    if (e > a && e < a + r.offsetHeight)return n;
                    if ("top" === this.options.orientation.item) {
                        if (i === this.groupIds.length - 1 && e > a)return n
                    } else if (0 === i && e < a + r.offset)return n
                }
                return null
            }, o.itemSetFromTarget = function (t) {
                for (var e = t.target; e;) {
                    if (e.hasOwnProperty("timeline-itemset"))return e["timeline-itemset"];
                    e = e.parentNode
                }
                return null
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                this.groupId = t, this.subgroups = {}, this.subgroupIndex = 0, this.subgroupOrderer = e && e.subgroupOrder, this.itemSet = i, this.dom = {}, this.props = {
                    label: {
                        width: 0,
                        height: 0
                    }
                }, this.className = null, this.items = {}, this.visibleItems = [], this.orderedItems = {
                    byStart: [],
                    byEnd: []
                }, this.checkRangedItems = !1;
                var o = this;
                this.itemSet.body.emitter.on("checkRangedItems", function () {
                    o.checkRangedItems = !0
                }), this._create(), this.setData(e)
            }

            var n = i(7), s = i(33);
            i(34);
            o.prototype._create = function () {
                var t = document.createElement("div");
                t.className = "vis-label", this.dom.label = t;
                var e = document.createElement("div");
                e.className = "vis-inner", t.appendChild(e), this.dom.inner = e;
                var i = document.createElement("div");
                i.className = "vis-group", i["timeline-group"] = this, this.dom.foreground = i, this.dom.background = document.createElement("div"), this.dom.background.className = "vis-group", this.dom.axis = document.createElement("div"), this.dom.axis.className = "vis-group", this.dom.marker = document.createElement("div"), this.dom.marker.style.visibility = "hidden", this.dom.marker.innerHTML = "?", this.dom.background.appendChild(this.dom.marker)
            }, o.prototype.setData = function (t) {
                var e;
                if (e = this.itemSet.options && this.itemSet.options.groupTemplate ? this.itemSet.options.groupTemplate(t) : t && t.content, e instanceof Element) {
                    for (this.dom.inner.appendChild(e); this.dom.inner.firstChild;)this.dom.inner.removeChild(this.dom.inner.firstChild);
                    this.dom.inner.appendChild(e)
                } else void 0 !== e && null !== e ? this.dom.inner.innerHTML = e : this.dom.inner.innerHTML = this.groupId || "";
                this.dom.label.title = t && t.title || "", this.dom.inner.firstChild ? n.removeClassName(this.dom.inner, "vis-hidden") : n.addClassName(this.dom.inner, "vis-hidden");
                var i = t && t.className || null;
                i != this.className && (this.className && (n.removeClassName(this.dom.label, this.className), n.removeClassName(this.dom.foreground, this.className), n.removeClassName(this.dom.background, this.className), n.removeClassName(this.dom.axis, this.className)), n.addClassName(this.dom.label, i), n.addClassName(this.dom.foreground, i), n.addClassName(this.dom.background, i), n.addClassName(this.dom.axis, i), this.className = i), this.style && (n.removeCssText(this.dom.label, this.style), this.style = null), t && t.style && (n.addCssText(this.dom.label, t.style), this.style = t.style)
            }, o.prototype.getLabelWidth = function () {
                return this.props.label.width
            }, o.prototype.redraw = function (t, e, i) {
                var o = !1, r = this.dom.marker.clientHeight;
                if (r != this.lastMarkerHeight && (this.lastMarkerHeight = r, n.forEach(this.items, function (t) {
                        t.dirty = !0, t.displayed && t.redraw()
                    }), i = !0), "function" == typeof this.itemSet.options.order) {
                    if (i) {
                        var a = this, h = !1;
                        n.forEach(this.items, function (t) {
                            t.displayed || (t.redraw(), a.visibleItems.push(t)), t.repositionX(h)
                        });
                        var d = this.orderedItems.byStart.slice().sort(function (t, e) {
                            return a.itemSet.options.order(t.data, e.data)
                        });
                        s.stack(d, e, !0)
                    }
                    this.visibleItems = this._updateVisibleItems(this.orderedItems, this.visibleItems, t)
                } else this.visibleItems = this._updateVisibleItems(this.orderedItems, this.visibleItems, t), this.itemSet.options.stack ? s.stack(this.visibleItems, e, i) : s.nostack(this.visibleItems, e, this.subgroups);
                var l = this._calculateHeight(e), u = this.dom.foreground;
                this.top = u.offsetTop, this.left = u.offsetLeft, this.width = u.offsetWidth, o = n.updateProperty(this, "height", l) || o, o = n.updateProperty(this.props.label, "width", this.dom.inner.clientWidth) || o, o = n.updateProperty(this.props.label, "height", this.dom.inner.clientHeight) || o, this.dom.background.style.height = l + "px", this.dom.foreground.style.height = l + "px", this.dom.label.style.height = l + "px";
                for (var c = 0, p = this.visibleItems.length; p > c; c++) {
                    var f = this.visibleItems[c];
                    f.repositionY(e)
                }
                return o
            }, o.prototype._calculateHeight = function (t) {
                var e, i = this.visibleItems;
                this.resetSubgroups();
                var o = this;
                if (i.length > 0) {
                    var s = i[0].top, r = i[0].top + i[0].height;
                    if (n.forEach(i, function (t) {
                            s = Math.min(s, t.top), r = Math.max(r, t.top + t.height), void 0 !== t.data.subgroup && (o.subgroups[t.data.subgroup].height = Math.max(o.subgroups[t.data.subgroup].height, t.height), o.subgroups[t.data.subgroup].visible = !0)
                        }), s > t.axis) {
                        var a = s - t.axis;
                        r -= a, n.forEach(i, function (t) {
                            t.top -= a
                        })
                    }
                    e = r + t.item.vertical / 2
                } else e = 0;
                return e = Math.max(e, this.props.label.height)
            }, o.prototype.show = function () {
                this.dom.label.parentNode || this.itemSet.dom.labelSet.appendChild(this.dom.label), this.dom.foreground.parentNode || this.itemSet.dom.foreground.appendChild(this.dom.foreground), this.dom.background.parentNode || this.itemSet.dom.background.appendChild(this.dom.background), this.dom.axis.parentNode || this.itemSet.dom.axis.appendChild(this.dom.axis)
            }, o.prototype.hide = function () {
                var t = this.dom.label;
                t.parentNode && t.parentNode.removeChild(t);
                var e = this.dom.foreground;
                e.parentNode && e.parentNode.removeChild(e);
                var i = this.dom.background;
                i.parentNode && i.parentNode.removeChild(i);
                var o = this.dom.axis;
                o.parentNode && o.parentNode.removeChild(o)
            }, o.prototype.add = function (t) {
                if (this.items[t.id] = t, t.setParent(this), void 0 !== t.data.subgroup && (void 0 === this.subgroups[t.data.subgroup] && (this.subgroups[t.data.subgroup] = {
                        height: 0,
                        visible: !1,
                        index: this.subgroupIndex,
                        items: []
                    }, this.subgroupIndex++), this.subgroups[t.data.subgroup].items.push(t)), this.orderSubgroups(), -1 == this.visibleItems.indexOf(t)) {
                    var e = this.itemSet.body.range;
                    this._checkIfVisible(t, this.visibleItems, e)
                }
            }, o.prototype.orderSubgroups = function () {
                if (void 0 !== this.subgroupOrderer) {
                    var t = [];
                    if ("string" == typeof this.subgroupOrderer) {
                        for (var e in this.subgroups)t.push({
                            subgroup: e,
                            sortField: this.subgroups[e].items[0].data[this.subgroupOrderer]
                        });
                        t.sort(function (t, e) {
                            return t.sortField - e.sortField
                        })
                    } else if ("function" == typeof this.subgroupOrderer) {
                        for (var e in this.subgroups)t.push(this.subgroups[e].items[0].data);
                        t.sort(this.subgroupOrderer)
                    }
                    if (t.length > 0)for (var i = 0; i < t.length; i++)this.subgroups[t[i].subgroup].index = i
                }
            }, o.prototype.resetSubgroups = function () {
                for (var t in this.subgroups)this.subgroups.hasOwnProperty(t) && (this.subgroups[t].visible = !1)
            }, o.prototype.remove = function (t) {
                delete this.items[t.id], t.setParent(null);
                var e = this.visibleItems.indexOf(t);
                if (-1 != e && this.visibleItems.splice(e, 1), void 0 !== t.data.subgroup) {
                    var i = this.subgroups[t.data.subgroup];
                    if (i) {
                        var o = i.items.indexOf(t);
                        i.items.splice(o, 1), i.items.length || (delete this.subgroups[t.data.subgroup], this.subgroupIndex--), this.orderSubgroups()
                    }
                }
            }, o.prototype.removeFromDataSet = function (t) {
                this.itemSet.removeItem(t.id)
            }, o.prototype.order = function () {
                for (var t = n.toArray(this.items), e = [], i = [], o = 0; o < t.length; o++)void 0 !== t[o].data.end && i.push(t[o]), e.push(t[o]);
                this.orderedItems = {
                    byStart: e,
                    byEnd: i
                }, s.orderByStart(this.orderedItems.byStart), s.orderByEnd(this.orderedItems.byEnd)
            }, o.prototype._updateVisibleItems = function (t, e, i) {
                var o, s, r = [], a = {}, h = (i.end - i.start) / 4, d = i.start - h, l = i.end + h, u = function (t) {
                    return d > t ? -1 : l >= t ? 0 : 1
                };
                if (e.length > 0)for (s = 0; s < e.length; s++)this._checkIfVisibleWithReference(e[s], r, a, i);
                var c = n.binarySearchCustom(t.byStart, u, "data", "start");
                if (this._traceVisible(c, t.byStart, r, a, function (t) {
                        return t.data.start < d || t.data.start > l
                    }), 1 == this.checkRangedItems)for (this.checkRangedItems = !1, s = 0; s < t.byEnd.length; s++)this._checkIfVisibleWithReference(t.byEnd[s], r, a, i); else {
                    var p = n.binarySearchCustom(t.byEnd, u, "data", "end");
                    this._traceVisible(p, t.byEnd, r, a, function (t) {
                        return t.data.end < d || t.data.end > l
                    })
                }
                for (s = 0; s < r.length; s++)o = r[s], o.displayed || o.show(), o.repositionX();
                return r
            }, o.prototype._traceVisible = function (t, e, i, o, n) {
                var s, r;
                if (-1 != t) {
                    for (r = t; r >= 0 && (s = e[r], !n(s)); r--)void 0 === o[s.id] && (o[s.id] = !0, i.push(s));
                    for (r = t + 1; r < e.length && (s = e[r], !n(s)); r++)void 0 === o[s.id] && (o[s.id] = !0, i.push(s))
                }
            }, o.prototype._checkIfVisible = function (t, e, i) {
                t.isVisible(i) ? (t.displayed || t.show(), t.repositionX(), e.push(t)) : t.displayed && t.hide()
            }, o.prototype._checkIfVisibleWithReference = function (t, e, i, o) {
                t.isVisible(o) ? void 0 === i[t.id] && (i[t.id] = !0, e.push(t)) : t.displayed && t.hide()
            }, t.exports = o
        },
        function (t, e) {
            var i = .001;
            e.orderByStart = function (t) {
                t.sort(function (t, e) {
                    return t.data.start - e.data.start
                })
            }, e.orderByEnd = function (t) {
                t.sort(function (t, e) {
                    var i = "end" in t.data ? t.data.end : t.data.start, o = "end" in e.data ? e.data.end : e.data.start;
                    return i - o
                })
            }, e.stack = function (t, i, o) {
                var n, s;
                if (o)for (n = 0, s = t.length; s > n; n++)t[n].top = null;
                for (n = 0, s = t.length; s > n; n++) {
                    var r = t[n];
                    if (r.stack && null === r.top) {
                        r.top = i.axis;
                        do {
                            for (var a = null, h = 0, d = t.length; d > h; h++) {
                                var l = t[h];
                                if (null !== l.top && l !== r && l.stack && e.collision(r, l, i.item)) {
                                    a = l;
                                    break
                                }
                            }
                            null != a && (r.top = a.top + a.height + i.item.vertical)
                        } while (a)
                    }
                }
            }, e.nostack = function (t, e, i) {
                var o, n, s;
                for (o = 0, n = t.length; n > o; o++)if (void 0 !== t[o].data.subgroup) {
                    s = e.axis;
                    for (var r in i)i.hasOwnProperty(r) && 1 == i[r].visible && i[r].index < i[t[o].data.subgroup].index && (s += i[r].height + e.item.vertical);
                    t[o].top = s
                } else t[o].top = e.axis
            }, e.collision = function (t, e, o) {
                return t.left - o.horizontal + i < e.left + e.width && t.left + t.width + o.horizontal - i > e.left && t.top - o.vertical + i < e.top + e.height && t.top + t.height + o.vertical - i > e.top
            }
        },
        function (t, e, i) {
            function o(t, e, i) {
                if (this.props = {content: {width: 0}}, this.overflow = !1, t) {
                    if (void 0 == t.start)throw new Error('Property "start" missing in item ' + t.id);
                    if (void 0 == t.end)throw new Error('Property "end" missing in item ' + t.id)
                }
                n.call(this, t, e, i)
            }

            var n = (i(3), i(2));
            o.prototype = new n(null, null, null), o.prototype.baseClassName = "vis-item vis-range", o.prototype.isVisible = function (t) {
                return this.data.start < t.end && this.data.end > t.start
            }, o.prototype.redraw = function () {
                var t = this.dom;
                if (t || (this.dom = {}, t = this.dom, t.box = document.createElement("div"), t.frame = document.createElement("div"), t.frame.className = "vis-item-overflow", t.box.appendChild(t.frame), t.content = document.createElement("div"), t.content.className = "vis-item-content", t.frame.appendChild(t.content), t.box["timeline-item"] = this, this.dirty = !0), !this.parent)throw new Error("Cannot redraw item: no parent attached");
                if (!t.box.parentNode) {
                    var e = this.parent.dom.foreground;
                    if (!e)throw new Error("Cannot redraw item: parent has no foreground container element");
                    e.appendChild(t.box)
                }
                if (this.displayed = !0, this.dirty) {
                    this._updateContents(this.dom.content), this._updateTitle(this.dom.box), this._updateDataAttributes(this.dom.box), this._updateStyle(this.dom.box);
                    var i = (this.options.editable.updateTime || this.options.editable.updateGroup || this.editable === !0) && this.editable !== !1, o = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "") + (i ? " vis-editable" : " vis-readonly");
                    t.box.className = this.baseClassName + o, this.overflow = "hidden" !== window.getComputedStyle(t.frame).overflow, this.dom.content.style.maxWidth = "none", this.props.content.width = this.dom.content.offsetWidth, this.height = this.dom.box.offsetHeight, this.dom.content.style.maxWidth = "", this.dirty = !1
                }
                this._repaintDeleteButton(t.box), this._repaintDragLeft(), this._repaintDragRight()
            }, o.prototype.show = function () {
                this.displayed || this.redraw()
            }, o.prototype.hide = function () {
                if (this.displayed) {
                    var t = this.dom.box;
                    t.parentNode && t.parentNode.removeChild(t), this.displayed = !1
                }
            }, o.prototype.repositionX = function (t) {
                var e, i, o = this.parent.width, n = this.conversion.toScreen(this.data.start), s = this.conversion.toScreen(this.data.end);
                (void 0 === t || t === !0) && (-o > n && (n = -o), s > 2 * o && (s = 2 * o));
                var r = Math.max(s - n, 1);
                switch (this.overflow ? (this.left = n, this.width = r + this.props.content.width, i = this.props.content.width) : (this.left = n, this.width = r, i = Math.min(s - n, this.props.content.width)), this.dom.box.style.left = this.left + "px", this.dom.box.style.width = r + "px", this.options.align) {
                    case"left":
                        this.dom.content.style.left = "0";
                        break;
                    case"right":
                        this.dom.content.style.left = Math.max(r - i, 0) + "px";
                        break;
                    case"center":
                        this.dom.content.style.left = Math.max((r - i) / 2, 0) + "px";
                        break;
                    default:
                        e = this.overflow ? s > 0 ? Math.max(-n, 0) : -i : 0 > n ? -n : 0, this.dom.content.style.left = e + "px"
                }
            }, o.prototype.repositionY = function () {
                var t = this.options.orientation.item, e = this.dom.box;
                "top" == t ? e.style.top = this.top + "px" : e.style.top = this.parent.height - this.top - this.height + "px"
            }, o.prototype._repaintDragLeft = function () {
                if (this.selected && this.options.editable.updateTime && !this.dom.dragLeft) {
                    var t = document.createElement("div");
                    t.className = "vis-drag-left", t.dragLeftItem = this, this.dom.box.appendChild(t), this.dom.dragLeft = t
                } else!this.selected && this.dom.dragLeft && (this.dom.dragLeft.parentNode && this.dom.dragLeft.parentNode.removeChild(this.dom.dragLeft), this.dom.dragLeft = null)
            }, o.prototype._repaintDragRight = function () {
                if (this.selected && this.options.editable.updateTime && !this.dom.dragRight) {
                    var t = document.createElement("div");
                    t.className = "vis-drag-right", t.dragRightItem = this, this.dom.box.appendChild(t), this.dom.dragRight = t
                } else!this.selected && this.dom.dragRight && (this.dom.dragRight.parentNode && this.dom.dragRight.parentNode.removeChild(this.dom.dragRight), this.dom.dragRight = null)
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i, s) {
                this.moment = n, this.current = this.moment(), this._start = this.moment(), this._end = this.moment(), this.autoScale = !0, this.scale = "day", this.step = 1, this.setRange(t, e, i), this.switchedDay = !1, this.switchedMonth = !1, this.switchedYear = !1, this.hiddenDates = s, void 0 === s && (this.hiddenDates = []), this.format = o.FORMAT
            }

            var n = i(8), s = i(29), r = i(7);
            o.FORMAT = {
                minorLabels: {
                    millisecond: "SSS",
                    second: "s",
                    minute: "HH:mm",
                    hour: "HH:mm",
                    weekday: "ddd D",
                    day: "D",
                    month: "MMM",
                    year: "YYYY"
                },
                majorLabels: {
                    millisecond: "HH:mm:ss",
                    second: "D MMMM HH:mm",
                    minute: "ddd D MMMM",
                    hour: "ddd D MMMM",
                    weekday: "MMMM YYYY",
                    day: "MMMM YYYY",
                    month: "YYYY",
                    year: ""
                }
            }, o.prototype.setMoment = function (t) {
                this.moment = t, this.current = this.moment(this.current), this._start = this.moment(this._start), this._end = this.moment(this._end)
            }, o.prototype.setFormat = function (t) {
                var e = r.deepExtend({}, o.FORMAT);
                this.format = r.deepExtend(e, t)
            }, o.prototype.setRange = function (t, e, i) {
                if (!(t instanceof Date && e instanceof Date))throw"No legal start or end date in method setRange";
                this._start = void 0 != t ? this.moment(t.valueOf()) : new Date, this._end = void 0 != e ? this.moment(e.valueOf()) : new Date, this.autoScale && this.setMinimumStep(i)
            }, o.prototype.start = function () {
                this.current = this._start.clone(), this.roundToMinor()
            }, o.prototype.roundToMinor = function () {
                switch (this.scale) {
                    case"year":
                        this.current.year(this.step * Math.floor(this.current.year() / this.step)), this.current.month(0);
                    case"month":
                        this.current.date(1);
                    case"day":
                    case"weekday":
                        this.current.hours(0);
                    case"hour":
                        this.current.minutes(0);
                    case"minute":
                        this.current.seconds(0);
                    case"second":
                        this.current.milliseconds(0)
                }
                if (1 != this.step)switch (this.scale) {
                    case"millisecond":
                        this.current.subtract(this.current.milliseconds() % this.step, "milliseconds");
                        break;
                    case"second":
                        this.current.subtract(this.current.seconds() % this.step, "seconds");
                        break;
                    case"minute":
                        this.current.subtract(this.current.minutes() % this.step, "minutes");
                        break;
                    case"hour":
                        this.current.subtract(this.current.hours() % this.step, "hours");
                        break;
                    case"weekday":
                    case"day":
                        this.current.subtract((this.current.date() - 1) % this.step, "day");
                        break;
                    case"month":
                        this.current.subtract(this.current.month() % this.step, "month");
                        break;
                    case"year":
                        this.current.subtract(this.current.year() % this.step, "year")
                }
            }, o.prototype.hasNext = function () {
                return this.current.valueOf() <= this._end.valueOf()
            }, o.prototype.next = function () {
                var t = this.current.valueOf();
                if (this.current.month() < 6)switch (this.scale) {
                    case"millisecond":
                        this.current.add(this.step, "millisecond");
                        break;
                    case"second":
                        this.current.add(this.step, "second");
                        break;
                    case"minute":
                        this.current.add(this.step, "minute");
                        break;
                    case"hour":
                        this.current.add(this.step, "hour"), this.current.subtract(this.current.hours() % this.step, "hour");
                        break;
                    case"weekday":
                    case"day":
                        this.current.add(this.step, "day");
                        break;
                    case"month":
                        this.current.add(this.step, "month");
                        break;
                    case"year":
                        this.current.add(this.step, "year")
                } else switch (this.scale) {
                    case"millisecond":
                        this.current.add(this.step, "millisecond");
                        break;
                    case"second":
                        this.current.add(this.step, "second");
                        break;
                    case"minute":
                        this.current.add(this.step, "minute");
                        break;
                    case"hour":
                        this.current.add(this.step, "hour");
                        break;
                    case"weekday":
                    case"day":
                        this.current.add(this.step, "day");
                        break;
                    case"month":
                        this.current.add(this.step, "month");
                        break;
                    case"year":
                        this.current.add(this.step, "year")
                }
                if (1 != this.step)switch (this.scale) {
                    case"millisecond":
                        this.current.milliseconds() < this.step && this.current.milliseconds(0);
                        break;
                    case"second":
                        this.current.seconds() < this.step && this.current.seconds(0);
                        break;
                    case"minute":
                        this.current.minutes() < this.step && this.current.minutes(0);
                        break;
                    case"hour":
                        this.current.hours() < this.step && this.current.hours(0);
                        break;
                    case"weekday":
                    case"day":
                        this.current.date() < this.step + 1 && this.current.date(1);
                        break;
                    case"month":
                        this.current.month() < this.step && this.current.month(0);
                        break;
                    case"year":
                }
                this.current.valueOf() == t && (this.current = this._end.clone()), s.stepOverHiddenDates(this.moment, this, t)
            }, o.prototype.getCurrent = function () {
                return this.current
            }, o.prototype.setScale = function (t) {
                t && "string" == typeof t.scale && (this.scale = t.scale, this.step = t.step > 0 ? t.step : 1, this.autoScale = !1)
            }, o.prototype.setAutoScale = function (t) {
                this.autoScale = t
            }, o.prototype.setMinimumStep = function (t) {
                if (void 0 != t) {
                    var e = 31104e6, i = 2592e6, o = 864e5, n = 36e5, s = 6e4, r = 1e3, a = 1;
                    1e3 * e > t && (this.scale = "year", this.step = 1e3), 500 * e > t && (this.scale = "year", this.step = 500), 100 * e > t && (this.scale = "year", this.step = 100), 50 * e > t && (this.scale = "year", this.step = 50), 10 * e > t && (this.scale = "year", this.step = 10), 5 * e > t && (this.scale = "year", this.step = 5), e > t && (this.scale = "year", this.step = 1), 3 * i > t && (this.scale = "month", this.step = 3), i > t && (this.scale = "month", this.step = 1), 5 * o > t && (this.scale = "day", this.step = 5), 2 * o > t && (this.scale = "day", this.step = 2), o > t && (this.scale = "day", this.step = 1), o / 2 > t && (this.scale = "weekday", this.step = 1), 4 * n > t && (this.scale = "hour", this.step = 4), n > t && (this.scale = "hour", this.step = 1), 15 * s > t && (this.scale = "minute", this.step = 15), 10 * s > t && (this.scale = "minute", this.step = 10), 5 * s > t && (this.scale = "minute", this.step = 5), s > t && (this.scale = "minute", this.step = 1), 15 * r > t && (this.scale = "second", this.step = 15), 10 * r > t && (this.scale = "second", this.step = 10), 5 * r > t && (this.scale = "second", this.step = 5), r > t && (this.scale = "second", this.step = 1), 200 * a > t && (this.scale = "millisecond", this.step = 200), 100 * a > t && (this.scale = "millisecond", this.step = 100), 50 * a > t && (this.scale = "millisecond", this.step = 50), 10 * a > t && (this.scale = "millisecond", this.step = 10), 5 * a > t && (this.scale = "millisecond", this.step = 5), a > t && (this.scale = "millisecond", this.step = 1)
                }
            }, o.snap = function (t, e, i) {
                var o = n(t);
                if ("year" == e) {
                    var s = o.year() + Math.round(o.month() / 12);
                    o.year(Math.round(s / i) * i), o.month(0), o.date(0), o.hours(0), o.minutes(0), o.seconds(0), o.mlliseconds(0)
                } else if ("month" == e) o.date() > 15 ? (o.date(1), o.add(1, "month")) : o.date(1), o.hours(0), o.minutes(0), o.seconds(0), o.milliseconds(0); else if ("day" == e) {
                    switch (i) {
                        case 5:
                        case 2:
                            o.hours(24 * Math.round(o.hours() / 24));
                            break;
                        default:
                            o.hours(12 * Math.round(o.hours() / 12))
                    }
                    o.minutes(0), o.seconds(0), o.milliseconds(0)
                } else if ("weekday" == e) {
                    switch (i) {
                        case 5:
                        case 2:
                            o.hours(12 * Math.round(o.hours() / 12));
                            break;
                        default:
                            o.hours(6 * Math.round(o.hours() / 6))
                    }
                    o.minutes(0), o.seconds(0), o.milliseconds(0)
                } else if ("hour" == e) {
                    switch (i) {
                        case 4:
                            o.minutes(60 * Math.round(o.minutes() / 60));
                            break;
                        default:
                            o.minutes(30 * Math.round(o.minutes() / 30))
                    }
                    o.seconds(0), o.milliseconds(0)
                } else if ("minute" == e) {
                    switch (i) {
                        case 15:
                        case 10:
                            o.minutes(5 * Math.round(o.minutes() / 5)), o.seconds(0);
                            break;
                        case 5:
                            o.seconds(60 * Math.round(o.seconds() / 60));
                            break;
                        default:
                            o.seconds(30 * Math.round(o.seconds() / 30))
                    }
                    o.milliseconds(0)
                } else if ("second" == e)switch (i) {
                    case 15:
                    case 10:
                        o.seconds(5 * Math.round(o.seconds() / 5)), o.milliseconds(0);
                        break;
                    case 5:
                        o.milliseconds(1e3 * Math.round(o.milliseconds() / 1e3));
                        break;
                    default:
                        o.milliseconds(500 * Math.round(o.milliseconds() / 500))
                } else if ("millisecond" == e) {
                    var r = i > 5 ? i / 2 : 1;
                    o.milliseconds(Math.round(o.milliseconds() / r) * r)
                }
                return o
            }, o.prototype.isMajor = function () {
                if (1 == this.switchedYear)switch (this.switchedYear = !1, this.scale) {
                    case"year":
                    case"month":
                    case"weekday":
                    case"day":
                    case"hour":
                    case"minute":
                    case"second":
                    case"millisecond":
                        return !0;
                    default:
                        return !1
                } else if (1 == this.switchedMonth)switch (this.switchedMonth = !1, this.scale) {
                    case"weekday":
                    case"day":
                    case"hour":
                    case"minute":
                    case"second":
                    case"millisecond":
                        return !0;
                    default:
                        return !1
                } else if (1 == this.switchedDay)switch (this.switchedDay = !1, this.scale) {
                    case"millisecond":
                    case"second":
                    case"minute":
                    case"hour":
                        return !0;
                    default:
                        return !1
                }
                var t = this.moment(this.current);
                switch (this.scale) {
                    case"millisecond":
                        return 0 == t.milliseconds();
                    case"second":
                        return 0 == t.seconds();
                    case"minute":
                        return 0 == t.hours() && 0 == t.minutes();
                    case"hour":
                        return 0 == t.hours();
                    case"weekday":
                    case"day":
                        return 1 == t.date();
                    case"month":
                        return 0 == t.month();
                    case"year":
                        return !1;
                    default:
                        return !1
                }
            }, o.prototype.getLabelMinor = function (t) {
                void 0 == t && (t = this.current);
                var e = this.format.minorLabels[this.scale];
                return e && e.length > 0 ? this.moment(t).format(e) : ""
            }, o.prototype.getLabelMajor = function (t) {
                void 0 == t && (t = this.current);
                var e = this.format.majorLabels[this.scale];
                return e && e.length > 0 ? this.moment(t).format(e) : ""
            }, o.prototype.getClassName = function () {
                function t(t) {
                    return t / h % 2 == 0 ? " vis-even" : " vis-odd"
                }

                function e(t) {
                    return t.isSame(new Date, "day") ? " vis-today" : t.isSame(s().add(1, "day"), "day") ? " vis-tomorrow" : t.isSame(s().add(-1, "day"), "day") ? " vis-yesterday" : ""
                }

                function i(t) {
                    return t.isSame(new Date, "week") ? " vis-current-week" : ""
                }

                function o(t) {
                    return t.isSame(new Date, "month") ? " vis-current-month" : ""
                }

                function n(t) {
                    return t.isSame(new Date, "year") ? " vis-current-year" : ""
                }

                var s = this.moment, r = this.moment(this.current), a = r.locale ? r.locale("en") : r.lang("en"), h = this.step;
                switch (this.scale) {
                    case"millisecond":
                        return t(a.milliseconds()).trim();
                    case"second":
                        return t(a.seconds()).trim();
                    case"minute":
                        return t(a.minutes()).trim();
                    case"hour":
                        var d = a.hours();
                        return 4 == this.step && (d = d + "-h" + (d + 4)), "vis-h" + d + e(a) + t(a.hours());
                    case"weekday":
                        return "vis-" + a.format("dddd").toLowerCase() + e(a) + i(a) + t(a.date());
                    case"day":
                        var l = a.date(), u = a.format("MMMM").toLowerCase();
                        return "vis-day" + l + " vis-" + u + o(a) + t(l - 1);
                    case"month":
                        return "vis-" + a.format("MMMM").toLowerCase() + o(a) + t(a.month());
                    case"year":
                        var c = a.year();
                        return "vis-year" + c + n(a) + t(c);
                    default:
                        return ""
                }
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                n.call(this, t, e, i), this.width = 0, this.height = 0, this.top = 0, this.left = 0
            }

            var n = (i(7), i(32));
            o.prototype = Object.create(n.prototype), o.prototype.redraw = function (t, e, i) {
                var o = !1;
                this.visibleItems = this._updateVisibleItems(this.orderedItems, this.visibleItems, t), this.width = this.dom.background.offsetWidth, this.dom.background.style.height = "0";
                for (var n = 0, s = this.visibleItems.length; s > n; n++) {
                    var r = this.visibleItems[n];
                    r.repositionY(e)
                }
                return o
            }, o.prototype.show = function () {
                this.dom.background.parentNode || this.itemSet.dom.background.appendChild(this.dom.background)
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                if (this.props = {
                        dot: {width: 0, height: 0},
                        line: {width: 0, height: 0}
                    }, t && void 0 == t.start)throw new Error('Property "start" missing in item ' + t);
                n.call(this, t, e, i)
            }

            var n = i(2);
            i(7);
            o.prototype = new n(null, null, null), o.prototype.isVisible = function (t) {
                var e = (t.end - t.start) / 4;
                return this.data.start > t.start - e && this.data.start < t.end + e
            }, o.prototype.redraw = function () {
                var t = this.dom;
                if (t || (this.dom = {}, t = this.dom, t.box = document.createElement("DIV"), t.content = document.createElement("DIV"), t.content.className = "vis-item-content", t.box.appendChild(t.content), t.line = document.createElement("DIV"), t.line.className = "vis-line", t.dot = document.createElement("DIV"), t.dot.className = "vis-dot", t.box["timeline-item"] = this, this.dirty = !0), !this.parent)throw new Error("Cannot redraw item: no parent attached");
                if (!t.box.parentNode) {
                    var e = this.parent.dom.foreground;
                    if (!e)throw new Error("Cannot redraw item: parent has no foreground container element");
                    e.appendChild(t.box)
                }
                if (!t.line.parentNode) {
                    var i = this.parent.dom.background;
                    if (!i)throw new Error("Cannot redraw item: parent has no background container element");
                    i.appendChild(t.line)
                }
                if (!t.dot.parentNode) {
                    var o = this.parent.dom.axis;
                    if (!i)throw new Error("Cannot redraw item: parent has no axis container element");
                    o.appendChild(t.dot)
                }
                if (this.displayed = !0, this.dirty) {
                    this._updateContents(this.dom.content), this._updateTitle(this.dom.box), this._updateDataAttributes(this.dom.box), this._updateStyle(this.dom.box);
                    var n = (this.options.editable.updateTime || this.options.editable.updateGroup || this.editable === !0) && this.editable !== !1, s = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "") + (n ? " vis-editable" : " vis-readonly");
                    t.box.className = "vis-item vis-box" + s, t.line.className = "vis-item vis-line" + s, t.dot.className = "vis-item vis-dot" + s, this.props.dot.height = t.dot.offsetHeight, this.props.dot.width = t.dot.offsetWidth, this.props.line.width = t.line.offsetWidth, this.width = t.box.offsetWidth, this.height = t.box.offsetHeight, this.dirty = !1
                }
                this._repaintDeleteButton(t.box)
            }, o.prototype.show = function () {
                this.displayed || this.redraw()
            }, o.prototype.hide = function () {
                if (this.displayed) {
                    var t = this.dom;
                    t.box.parentNode && t.box.parentNode.removeChild(t.box), t.line.parentNode && t.line.parentNode.removeChild(t.line), t.dot.parentNode && t.dot.parentNode.removeChild(t.dot), this.displayed = !1
                }
            }, o.prototype.repositionX = function () {
                var t = this.conversion.toScreen(this.data.start), e = this.options.align;
                "right" == e ? this.left = t - this.width : "left" == e ? this.left = t : this.left = t - this.width / 2, this.dom.box.style.left = this.left + "px", this.dom.line.style.left = t - this.props.line.width / 2 + "px", this.dom.dot.style.left = t - this.props.dot.width / 2 + "px"
            }, o.prototype.repositionY = function () {
                var t = this.options.orientation.item, e = this.dom.box, i = this.dom.line, o = this.dom.dot;
                if ("top" == t) e.style.top = (this.top || 0) + "px", i.style.top = "0", i.style.height = this.parent.top + this.top + 1 + "px", i.style.bottom = ""; else {
                    var n = this.parent.itemSet.props.height, s = n - this.parent.top - this.parent.height + this.top;
                    e.style.top = (this.parent.height - this.top - this.height || 0) + "px", i.style.top = n - s + "px", i.style.bottom = "0"
                }
                o.style.top = -this.props.dot.height / 2 + "px"
            }, o.prototype.getWidthLeft = function () {
                return this.width / 2
            }, o.prototype.getWidthRight = function () {
                return this.width / 2
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i) {
                if (this.props = {content: {width: 0}}, this.overflow = !1, t) {
                    if (void 0 == t.start)throw new Error('Property "start" missing in item ' + t.id);
                    if (void 0 == t.end)throw new Error('Property "end" missing in item ' + t.id)
                }
                n.call(this, t, e, i)
            }

            var n = (i(3), i(2)), s = i(36), r = i(34);
            o.prototype = new n(null, null, null), o.prototype.baseClassName = "vis-item vis-background", o.prototype.stack = !1, o.prototype.isVisible = function (t) {
                return this.data.start < t.end && this.data.end > t.start
            }, o.prototype.redraw = function () {
                var t = this.dom;
                if (t || (this.dom = {}, t = this.dom, t.box = document.createElement("div"), t.frame = document.createElement("div"), t.frame.className = "vis-item-overflow", t.box.appendChild(t.frame), t.content = document.createElement("div"), t.content.className = "vis-item-content", t.frame.appendChild(t.content), this.dirty = !0), !this.parent)throw new Error("Cannot redraw item: no parent attached");
                if (!t.box.parentNode) {
                    var e = this.parent.dom.background;
                    if (!e)throw new Error("Cannot redraw item: parent has no background container element");
                    e.appendChild(t.box)
                }
                if (this.displayed = !0, this.dirty) {
                    this._updateContents(this.dom.content), this._updateTitle(this.dom.content), this._updateDataAttributes(this.dom.content), this._updateStyle(this.dom.box);
                    var i = (this.data.className ? " " + this.data.className : "") + (this.selected ? " vis-selected" : "");
                    t.box.className = this.baseClassName + i, this.overflow = "hidden" !== window.getComputedStyle(t.content).overflow, this.props.content.width = this.dom.content.offsetWidth, this.height = 0, this.dirty = !1
                }
            }, o.prototype.show = r.prototype.show, o.prototype.hide = r.prototype.hide, o.prototype.repositionX = r.prototype.repositionX, o.prototype.repositionY = function (t) {
                var e = "top" === this.options.orientation.item;
                this.dom.content.style.top = e ? "" : "0", this.dom.content.style.bottom = e ? "0" : "";
                var i;
                if (void 0 !== this.data.subgroup) {
                    var o = this.data.subgroup, n = this.parent.subgroups, r = n[o].index;
                    if (1 == e) {
                        i = this.parent.subgroups[o].height + t.item.vertical, i += 0 == r ? t.axis - .5 * t.item.vertical : 0;
                        var a = this.parent.top;
                        for (var h in n)n.hasOwnProperty(h) && 1 == n[h].visible && n[h].index < r && (a += n[h].height + t.item.vertical);
                        a += 0 != r ? t.axis - .5 * t.item.vertical : 0, this.dom.box.style.top = a + "px", this.dom.box.style.bottom = ""
                    } else {
                        var a = this.parent.top, d = 0;
                        for (var h in n)if (n.hasOwnProperty(h) && 1 == n[h].visible) {
                            var l = n[h].height + t.item.vertical;
                            d += l, n[h].index > r && (a += l)
                        }
                        i = this.parent.subgroups[o].height + t.item.vertical, this.dom.box.style.top = this.parent.height - d + a + "px", this.dom.box.style.bottom = ""
                    }
                } else this.parent instanceof s ? (i = Math.max(this.parent.height, this.parent.itemSet.body.domProps.center.height, this.parent.itemSet.body.domProps.centerContainer.height), this.dom.box.style.top = e ? "0" : "", this.dom.box.style.bottom = e ? "" : "0") : (i = this.parent.height, this.dom.box.style.top = this.parent.top + "px", this.dom.box.style.bottom = "");
                this.dom.box.style.height = i + "px"
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                this.dom = {
                    foreground: null,
                    lines: [],
                    majorTexts: [],
                    minorTexts: [],
                    redundant: {lines: [], majorTexts: [], minorTexts: []}
                }, this.props = {
                    range: {start: 0, end: 0, minimumStep: 0},
                    lineTop: 0
                }, this.defaultOptions = {
                    orientation: {axis: "bottom"},
                    showMinorLabels: !0,
                    showMajorLabels: !0,
                    format: r.FORMAT,
                    moment: h,
                    timeAxis: null
                }, this.options = n.extend({}, this.defaultOptions), this.body = t, this._create(), this.setOptions(e)
            }

            var n = i(7), s = i(28), r = i(35), a = i(29), h = i(8);
            o.prototype = new s, o.prototype.setOptions = function (t) {
                t && (n.selectiveExtend(["showMinorLabels", "showMajorLabels", "hiddenDates", "timeAxis", "moment"], this.options, t), n.selectiveDeepExtend(["format"], this.options, t), "orientation" in t && ("string" == typeof t.orientation ? this.options.orientation.axis = t.orientation : "object" == typeof t.orientation && "axis" in t.orientation && (this.options.orientation.axis = t.orientation.axis)), "locale" in t && ("function" == typeof h.locale ? h.locale(t.locale) : h.lang(t.locale)))
            }, o.prototype._create = function () {
                this.dom.foreground = document.createElement("div"), this.dom.background = document.createElement("div"), this.dom.foreground.className = "vis-time-axis vis-foreground", this.dom.background.className = "vis-time-axis vis-background"
            }, o.prototype.destroy = function () {
                this.dom.foreground.parentNode && this.dom.foreground.parentNode.removeChild(this.dom.foreground), this.dom.background.parentNode && this.dom.background.parentNode.removeChild(this.dom.background), this.body = null
            }, o.prototype.redraw = function () {
                var t = this.props, e = this.dom.foreground, i = this.dom.background, o = "top" == this.options.orientation.axis ? this.body.dom.top : this.body.dom.bottom, n = e.parentNode !== o;
                this._calculateCharSize();
                var s = this.options.showMinorLabels && "none" !== this.options.orientation.axis, r = this.options.showMajorLabels && "none" !== this.options.orientation.axis;
                t.minorLabelHeight = s ? t.minorCharHeight : 0, t.majorLabelHeight = r ? t.majorCharHeight : 0, t.height = t.minorLabelHeight + t.majorLabelHeight, t.width = e.offsetWidth, t.minorLineHeight = this.body.domProps.root.height - t.majorLabelHeight - ("top" == this.options.orientation.axis ? this.body.domProps.bottom.height : this.body.domProps.top.height), t.minorLineWidth = 1, t.majorLineHeight = t.minorLineHeight + t.majorLabelHeight, t.majorLineWidth = 1;
                var a = e.nextSibling, h = i.nextSibling;
                return e.parentNode && e.parentNode.removeChild(e), i.parentNode && i.parentNode.removeChild(i), e.style.height = this.props.height + "px", this._repaintLabels(), a ? o.insertBefore(e, a) : o.appendChild(e), h ? this.body.dom.backgroundVertical.insertBefore(i, h) : this.body.dom.backgroundVertical.appendChild(i), this._isResized() || n
            }, o.prototype._repaintLabels = function () {
                var t = this.options.orientation.axis, e = n.convert(this.body.range.start, "Number"), i = n.convert(this.body.range.end, "Number"), o = this.body.util.toTime(7 * (this.props.minorCharWidth || 10)).valueOf(), s = o - a.getHiddenDurationBefore(this.options.moment, this.body.hiddenDates, this.body.range, o);
                s -= this.body.util.toTime(0).valueOf();
                var h = new r(new Date(e), new Date(i), s, this.body.hiddenDates);
                h.setMoment(this.options.moment), this.options.format && h.setFormat(this.options.format), this.options.timeAxis && h.setScale(this.options.timeAxis), this.step = h;
                var d = this.dom;
                d.redundant.lines = d.lines, d.redundant.majorTexts = d.majorTexts, d.redundant.minorTexts = d.minorTexts, d.lines = [], d.majorTexts = [], d.minorTexts = [];
                var l, u, c, p, f, m, v, g, y, b = void 0, w = 0;
                for (h.start(), u = h.getCurrent(), p = this.body.util.toScreen(u); h.hasNext() && 1e3 > w;) {
                    w++, f = h.isMajor(), y = h.getClassName(), g = h.getLabelMinor(), l = u, c = p, h.next(), u = h.getCurrent(), p = this.body.util.toScreen(u), m = p - c;
                    var _ = (g.length + 1) * this.props.minorCharWidth < m;
                    this.options.showMinorLabels && _ && this._repaintMinorText(c, g, t, y), f && this.options.showMajorLabels ? (c > 0 && (void 0 == b && (b = c), this._repaintMajorText(c, h.getLabelMajor(), t, y)), v = this._repaintMajorLine(c, m, t, y)) : _ ? v = this._repaintMinorLine(c, m, t, y) : v && (v.style.width = parseInt(v.style.width) + m + "px")
                }
                if (this.options.showMajorLabels) {
                    var x = this.body.util.toTime(0), k = h.getLabelMajor(x), O = k.length * (this.props.majorCharWidth || 10) + 10;
                    (void 0 == b || b > O) && this._repaintMajorText(0, k, t, y)
                }
                n.forEach(this.dom.redundant, function (t) {
                    for (; t.length;) {
                        var e = t.pop();
                        e && e.parentNode && e.parentNode.removeChild(e)
                    }
                })
            }, o.prototype._repaintMinorText = function (t, e, i, o) {
                var n = this.dom.redundant.minorTexts.shift();
                if (!n) {
                    var s = document.createTextNode("");
                    n = document.createElement("div"), n.appendChild(s), this.dom.foreground.appendChild(n)
                }
                return this.dom.minorTexts.push(n), n.childNodes[0].nodeValue = e, n.style.top = "top" == i ? this.props.majorLabelHeight + "px" : "0", n.style.left = t + "px", n.className = "vis-text vis-minor " + o, n
            }, o.prototype._repaintMajorText = function (t, e, i, o) {
                var n = this.dom.redundant.majorTexts.shift();
                if (!n) {
                    var s = document.createTextNode(e);
                    n = document.createElement("div"), n.appendChild(s), this.dom.foreground.appendChild(n);
                }
                return this.dom.majorTexts.push(n), n.childNodes[0].nodeValue = e, n.className = "vis-text vis-major " + o, n.style.top = "top" == i ? "0" : this.props.minorLabelHeight + "px", n.style.left = t + "px", n
            }, o.prototype._repaintMinorLine = function (t, e, i, o) {
                var n = this.dom.redundant.lines.shift();
                n || (n = document.createElement("div"), this.dom.background.appendChild(n)), this.dom.lines.push(n);
                var s = this.props;
                return "top" == i ? n.style.top = s.majorLabelHeight + "px" : n.style.top = this.body.domProps.top.height + "px", n.style.height = s.minorLineHeight + "px", n.style.left = t - s.minorLineWidth / 2 + "px", n.style.width = e + "px", n.className = "vis-grid vis-vertical vis-minor " + o, n
            }, o.prototype._repaintMajorLine = function (t, e, i, o) {
                var n = this.dom.redundant.lines.shift();
                n || (n = document.createElement("div"), this.dom.background.appendChild(n)), this.dom.lines.push(n);
                var s = this.props;
                return "top" == i ? n.style.top = "0" : n.style.top = this.body.domProps.top.height + "px", n.style.left = t - s.majorLineWidth / 2 + "px", n.style.height = s.majorLineHeight + "px", n.style.width = e + "px", n.className = "vis-grid vis-vertical vis-major " + o, n
            }, o.prototype._calculateCharSize = function () {
                this.dom.measureCharMinor || (this.dom.measureCharMinor = document.createElement("DIV"), this.dom.measureCharMinor.className = "vis-text vis-minor vis-measure", this.dom.measureCharMinor.style.position = "absolute", this.dom.measureCharMinor.appendChild(document.createTextNode("0")), this.dom.foreground.appendChild(this.dom.measureCharMinor)), this.props.minorCharHeight = this.dom.measureCharMinor.clientHeight, this.props.minorCharWidth = this.dom.measureCharMinor.clientWidth, this.dom.measureCharMajor || (this.dom.measureCharMajor = document.createElement("DIV"), this.dom.measureCharMajor.className = "vis-text vis-major vis-measure", this.dom.measureCharMajor.style.position = "absolute", this.dom.measureCharMajor.appendChild(document.createTextNode("0")), this.dom.foreground.appendChild(this.dom.measureCharMajor)), this.props.majorCharHeight = this.dom.measureCharMajor.clientHeight, this.props.majorCharWidth = this.dom.measureCharMajor.clientWidth
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t) {
                this.active = !1, this.dom = {container: t}, this.dom.overlay = document.createElement("div"), this.dom.overlay.className = "vis-overlay", this.dom.container.appendChild(this.dom.overlay), this.hammer = a(this.dom.overlay), this.hammer.on("tap", this._onTapOverlay.bind(this));
                var e = this, i = ["tap", "doubletap", "press", "pinch", "pan", "panstart", "panmove", "panend"];
                i.forEach(function (t) {
                    e.hammer.on(t, function (t) {
                        t.stopPropagation()
                    })
                }), document && document.body && (this.onClick = function (i) {
                    n(i.target, t) || e.deactivate()
                }, document.body.addEventListener("click", this.onClick)), void 0 !== this.keycharm && this.keycharm.destroy(), this.keycharm = s(), this.escListener = this.deactivate.bind(this)
            }

            function n(t, e) {
                for (; t;) {
                    if (t === e)return !0;
                    t = t.parentNode
                }
                return !1
            }

            var s = i(41), r = i(19), a = i(3), h = i(7);
            r(o.prototype), o.current = null, o.prototype.destroy = function () {
                this.deactivate(), this.dom.overlay.parentNode.removeChild(this.dom.overlay), this.onClick && document.body.removeEventListener("click", this.onClick), this.hammer.destroy(), this.hammer = null
            }, o.prototype.activate = function () {
                o.current && o.current.deactivate(), o.current = this, this.active = !0, this.dom.overlay.style.display = "none", h.addClassName(this.dom.container, "vis-active"), this.emit("change"), this.emit("activate"), this.keycharm.bind("esc", this.escListener)
            }, o.prototype.deactivate = function () {
                this.active = !1, this.dom.overlay.style.display = "", h.removeClassName(this.dom.container, "vis-active"), this.keycharm.unbind("esc", this.escListener), this.emit("change"), this.emit("deactivate")
            }, o.prototype._onTapOverlay = function (t) {
                this.activate(), t.stopPropagation()
            }, t.exports = o
        },
        function (t, e, i) {
            var o, n, s;
            !function (i, r) {
                n = [], o = r, s = "function" == typeof o ? o.apply(e, n) : o, !(void 0 !== s && (t.exports = s))
            }(this, function () {
                function t(t) {
                    var e, i = t && t.preventDefault || !1, o = t && t.container || window, n = {}, s = {
                        keydown: {},
                        keyup: {}
                    }, r = {};
                    for (e = 97; 122 >= e; e++)r[String.fromCharCode(e)] = {code: 65 + (e - 97), shift: !1};
                    for (e = 65; 90 >= e; e++)r[String.fromCharCode(e)] = {code: e, shift: !0};
                    for (e = 0; 9 >= e; e++)r["" + e] = {code: 48 + e, shift: !1};
                    for (e = 1; 12 >= e; e++)r["F" + e] = {code: 111 + e, shift: !1};
                    for (e = 0; 9 >= e; e++)r["num" + e] = {code: 96 + e, shift: !1};
                    r["num*"] = {code: 106, shift: !1}, r["num+"] = {code: 107, shift: !1}, r["num-"] = {
                        code: 109,
                        shift: !1
                    }, r["num/"] = {code: 111, shift: !1}, r["num."] = {code: 110, shift: !1}, r.left = {
                        code: 37,
                        shift: !1
                    }, r.up = {code: 38, shift: !1}, r.right = {code: 39, shift: !1}, r.down = {
                        code: 40,
                        shift: !1
                    }, r.space = {code: 32, shift: !1}, r.enter = {code: 13, shift: !1}, r.shift = {
                        code: 16,
                        shift: void 0
                    }, r.esc = {code: 27, shift: !1}, r.backspace = {code: 8, shift: !1}, r.tab = {
                        code: 9,
                        shift: !1
                    }, r.ctrl = {code: 17, shift: !1}, r.alt = {code: 18, shift: !1}, r["delete"] = {
                        code: 46,
                        shift: !1
                    }, r.pageup = {code: 33, shift: !1}, r.pagedown = {code: 34, shift: !1}, r["="] = {
                        code: 187,
                        shift: !1
                    }, r["-"] = {code: 189, shift: !1}, r["]"] = {code: 221, shift: !1}, r["["] = {
                        code: 219,
                        shift: !1
                    };
                    var a = function (t) {
                        d(t, "keydown")
                    }, h = function (t) {
                        d(t, "keyup")
                    }, d = function (t, e) {
                        if (void 0 !== s[e][t.keyCode]) {
                            for (var o = s[e][t.keyCode], n = 0; n < o.length; n++)void 0 === o[n].shift ? o[n].fn(t) : 1 == o[n].shift && 1 == t.shiftKey ? o[n].fn(t) : 0 == o[n].shift && 0 == t.shiftKey && o[n].fn(t);
                            1 == i && t.preventDefault()
                        }
                    };
                    return n.bind = function (t, e, i) {
                        if (void 0 === i && (i = "keydown"), void 0 === r[t])throw new Error("unsupported key: " + t);
                        void 0 === s[i][r[t].code] && (s[i][r[t].code] = []), s[i][r[t].code].push({
                            fn: e,
                            shift: r[t].shift
                        })
                    }, n.bindAll = function (t, e) {
                        void 0 === e && (e = "keydown");
                        for (var i in r)r.hasOwnProperty(i) && n.bind(i, t, e)
                    }, n.getKey = function (t) {
                        for (var e in r)if (r.hasOwnProperty(e)) {
                            if (1 == t.shiftKey && 1 == r[e].shift && t.keyCode == r[e].code)return e;
                            if (0 == t.shiftKey && 0 == r[e].shift && t.keyCode == r[e].code)return e;
                            if (t.keyCode == r[e].code && "shift" == e)return e
                        }
                        return "unknown key, currently not supported"
                    }, n.unbind = function (t, e, i) {
                        if (void 0 === i && (i = "keydown"), void 0 === r[t])throw new Error("unsupported key: " + t);
                        if (void 0 !== e) {
                            var o = [], n = s[i][r[t].code];
                            if (void 0 !== n)for (var a = 0; a < n.length; a++)(n[a].fn != e || n[a].shift != r[t].shift) && o.push(s[i][r[t].code][a]);
                            s[i][r[t].code] = o
                        } else s[i][r[t].code] = []
                    }, n.reset = function () {
                        s = {keydown: {}, keyup: {}}
                    }, n.destroy = function () {
                        s = {
                            keydown: {},
                            keyup: {}
                        }, o.removeEventListener("keydown", a, !0), o.removeEventListener("keyup", h, !0)
                    }, o.addEventListener("keydown", a, !0), o.addEventListener("keyup", h, !0), n
                }

                return t
            })
        },
        function (t, e, i) {
            function o(t, e) {
                this.body = t, this.defaultOptions = {
                    moment: a,
                    locales: h,
                    locale: "en",
                    id: void 0
                }, this.options = s.extend({}, this.defaultOptions), e && e.time ? this.customTime = e.time : this.customTime = new Date, this.eventParams = {}, this.setOptions(e), this._create()
            }

            var n = i(3), s = i(7), r = i(28), a = i(8), h = i(43);
            o.prototype = new r, o.prototype.setOptions = function (t) {
                t && s.selectiveExtend(["moment", "locale", "locales", "id"], this.options, t)
            }, o.prototype._create = function () {
                var t = document.createElement("div");
                t["custom-time"] = this, t.className = "vis-custom-time " + (this.options.id || ""), t.style.position = "absolute", t.style.top = "0px", t.style.height = "100%", this.bar = t;
                var e = document.createElement("div");
                e.style.position = "relative", e.style.top = "0px", e.style.left = "-10px", e.style.height = "100%", e.style.width = "20px", t.appendChild(e), this.hammer = new n(e), this.hammer.on("panstart", this._onDragStart.bind(this)), this.hammer.on("panmove", this._onDrag.bind(this)), this.hammer.on("panend", this._onDragEnd.bind(this)), this.hammer.get("pan").set({
                    threshold: 5,
                    direction: 30
                })
            }, o.prototype.destroy = function () {
                this.hide(), this.hammer.destroy(), this.hammer = null, this.body = null
            }, o.prototype.redraw = function () {
                var t = this.body.dom.backgroundVertical;
                this.bar.parentNode != t && (this.bar.parentNode && this.bar.parentNode.removeChild(this.bar), t.appendChild(this.bar));
                var e = this.body.util.toScreen(this.customTime), i = this.options.locales[this.options.locale];
                i || (this.warned || (console.log("WARNING: options.locales['" + this.options.locale + "'] not found. See http://visjs.org/docs/timeline.html#Localization"), this.warned = !0), i = this.options.locales.en);
                var o = i.time + ": " + this.options.moment(this.customTime).format("dddd, MMMM Do YYYY, H:mm:ss");
                return o = o.charAt(0).toUpperCase() + o.substring(1), this.bar.style.left = e + "px", this.bar.title = o, !1
            }, o.prototype.hide = function () {
                this.bar.parentNode && this.bar.parentNode.removeChild(this.bar)
            }, o.prototype.setCustomTime = function (t) {
                this.customTime = s.convert(t, "Date"), this.redraw()
            }, o.prototype.getCustomTime = function () {
                return new Date(this.customTime.valueOf())
            }, o.prototype._onDragStart = function (t) {
                this.eventParams.dragging = !0, this.eventParams.customTime = this.customTime, t.stopPropagation()
            }, o.prototype._onDrag = function (t) {
                if (this.eventParams.dragging) {
                    var e = this.body.util.toScreen(this.eventParams.customTime) + t.deltaX, i = this.body.util.toTime(e);
                    this.setCustomTime(i), this.body.emitter.emit("timechange", {
                        id: this.options.id,
                        time: new Date(this.customTime.valueOf())
                    }), t.stopPropagation()
                }
            }, o.prototype._onDragEnd = function (t) {
                this.eventParams.dragging && (this.body.emitter.emit("timechanged", {
                    id: this.options.id,
                    time: new Date(this.customTime.valueOf())
                }), t.stopPropagation())
            }, o.customTimeFromTarget = function (t) {
                for (var e = t.target; e;) {
                    if (e.hasOwnProperty("custom-time"))return e["custom-time"];
                    e = e.parentNode
                }
                return null
            }, t.exports = o
        },
        function (t, e) {
            e.en = {current: "current", time: "time"}, e.en_EN = e.en, e.en_US = e.en, e.nl = {
                current: "huidige",
                time: "tijd"
            }, e.nl_NL = e.nl, e.nl_BE = e.nl
        },
        function (t, e, i) {
            function o(t, e) {
                this.body = t, this.defaultOptions = {
                    showCurrentTime: !0,
                    moment: r,
                    locales: a,
                    locale: "en"
                }, this.options = n.extend({}, this.defaultOptions), this.offset = 0, this._create(), this.setOptions(e)
            }

            var n = i(7), s = i(28), r = i(8), a = i(43);
            o.prototype = new s, o.prototype._create = function () {
                var t = document.createElement("div");
                t.className = "vis-current-time", t.style.position = "absolute", t.style.top = "0px", t.style.height = "100%", this.bar = t
            }, o.prototype.destroy = function () {
                this.options.showCurrentTime = !1, this.redraw(), this.body = null
            }, o.prototype.setOptions = function (t) {
                t && n.selectiveExtend(["showCurrentTime", "moment", "locale", "locales"], this.options, t)
            }, o.prototype.redraw = function () {
                if (this.options.showCurrentTime) {
                    var t = this.body.dom.backgroundVertical;
                    this.bar.parentNode != t && (this.bar.parentNode && this.bar.parentNode.removeChild(this.bar), t.appendChild(this.bar), this.start());
                    var e = this.options.moment((new Date).valueOf() + this.offset), i = this.body.util.toScreen(e), o = this.options.locales[this.options.locale];
                    o || (this.warned || (console.log("WARNING: options.locales['" + this.options.locale + "'] not found. See http://visjs.org/docs/timeline.html#Localization"), this.warned = !0), o = this.options.locales.en);
                    var n = o.current + " " + o.time + ": " + e.format("dddd, MMMM Do YYYY, H:mm:ss");
                    n = n.charAt(0).toUpperCase() + n.substring(1), this.bar.style.left = i + "px", this.bar.title = n
                } else this.bar.parentNode && this.bar.parentNode.removeChild(this.bar), this.stop();
                return !1
            }, o.prototype.start = function () {
                function t() {
                    e.stop();
                    var i = e.body.range.conversion(e.body.domProps.center.width).scale, o = 1 / i / 10;
                    30 > o && (o = 30), o > 1e3 && (o = 1e3), e.redraw(), e.currentTimeTimer = setTimeout(t, o)
                }

                var e = this;
                t()
            }, o.prototype.stop = function () {
                void 0 !== this.currentTimeTimer && (clearTimeout(this.currentTimeTimer), delete this.currentTimeTimer)
            }, o.prototype.setCurrentTime = function (t) {
                var e = n.convert(t, "Date").valueOf(), i = (new Date).valueOf();
                this.offset = e - i, this.redraw()
            }, o.prototype.getCurrentTime = function () {
                return new Date((new Date).valueOf() + this.offset)
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(46), a = o(r), h = i(7), d = function () {
                function t(e, i, o) {
                    var s = arguments.length <= 3 || void 0 === arguments[3] ? 1 : arguments[3];
                    n(this, t), this.parent = e, this.changedOptions = [], this.container = i, this.allowCreation = !1, this.options = {}, this.defaultOptions = {
                        enabled: !1,
                        filter: !0,
                        container: void 0,
                        showButton: !0
                    }, h.extend(this.options, this.defaultOptions), this.configureOptions = o, this.moduleOptions = {}, this.domElements = [], this.colorPicker = new a["default"](s), this.wrapper = void 0
                }

                return s(t, [
                    {
                        key: "setOptions", value: function (t) {
                        if (void 0 !== t) {
                            var e = !0;
                            "string" == typeof t ? this.options.filter = t : t instanceof Array ? this.options.filter = t.join() : "object" == typeof t ? (void 0 !== t.container && (this.options.container = t.container), void 0 !== t.filter && (this.options.filter = t.filter), void 0 !== t.showButton && (this.options.showButton = t.showButton), void 0 !== t.enabled && (e = t.enabled)) : "boolean" == typeof t ? (this.options.filter = !0, e = t) : "function" == typeof t && (this.options.filter = t, e = !0), this.options.filter === !1 && (e = !1), this.options.enabled = e
                        }
                        this._clean()
                    }
                    },
                    {
                        key: "setModuleOptions", value: function (t) {
                        this.moduleOptions = t, this.options.enabled === !0 && (this._clean(), void 0 !== this.options.container && (this.container = this.options.container), this._create())
                    }
                    },
                    {
                        key: "_create", value: function () {
                        var t = this;
                        this._clean(), this.changedOptions = [];
                        var e = this.options.filter, i = 0, o = !1;
                        for (var n in this.configureOptions)this.configureOptions.hasOwnProperty(n) && (this.allowCreation = !1, o = !1, "function" == typeof e ? (o = e(n, []), o = o || this._handleObject(this.configureOptions[n], [n], !0)) : (e === !0 || -1 !== e.indexOf(n)) && (o = !0), o !== !1 && (this.allowCreation = !0, i > 0 && this._makeItem([]), this._makeHeader(n), this._handleObject(this.configureOptions[n], [n])), i++);
                        this.options.showButton === !0 && !function () {
                            var e = document.createElement("div");
                            e.className = "vis-network-configuration button", e.innerHTML = "generate options", e.onclick = function () {
                                t._printOptions()
                            }, e.onmouseover = function () {
                                e.className = "vis-network-configuration button hover"
                            }, e.onmouseout = function () {
                                e.className = "vis-network-configuration button"
                            }, t.optionsContainer = document.createElement("div"), t.optionsContainer.className = "vis-network-configuration vis-option-container", t.domElements.push(t.optionsContainer), t.domElements.push(e)
                        }(), this._push(), this.colorPicker.insertTo(this.container)
                    }
                    },
                    {
                        key: "_push", value: function () {
                        this.wrapper = document.createElement("div"), this.wrapper.className = "vis-network-configuration-wrapper", this.container.appendChild(this.wrapper);
                        for (var t = 0; t < this.domElements.length; t++)this.wrapper.appendChild(this.domElements[t])
                    }
                    },
                    {
                        key: "_clean", value: function () {
                        for (var t = 0; t < this.domElements.length; t++)this.wrapper.removeChild(this.domElements[t]);
                        void 0 !== this.wrapper && (this.container.removeChild(this.wrapper), this.wrapper = void 0), this.domElements = []
                    }
                    },
                    {
                        key: "_getValue", value: function (t) {
                        for (var e = this.moduleOptions, i = 0; i < t.length; i++) {
                            if (void 0 === e[t[i]]) {
                                e = void 0;
                                break
                            }
                            e = e[t[i]]
                        }
                        return e
                    }
                    },
                    {
                        key: "_makeItem", value: function (t) {
                        var e = arguments, i = this;
                        if (this.allowCreation === !0) {
                            var o, n, s;
                            !function () {
                                var r = document.createElement("div");
                                for (r.className = "vis-network-configuration item s" + t.length, o = e.length, n = Array(o > 1 ? o - 1 : 0), s = 1; o > s; s++)n[s - 1] = e[s];
                                n.forEach(function (t) {
                                    r.appendChild(t)
                                }), i.domElements.push(r)
                            }()
                        }
                    }
                    },
                    {
                        key: "_makeHeader", value: function (t) {
                        var e = document.createElement("div");
                        e.className = "vis-network-configuration header", e.innerHTML = t, this._makeItem([], e)
                    }
                    },
                    {
                        key: "_makeLabel", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], o = document.createElement("div");
                        return o.className = "vis-network-configuration label s" + e.length, i === !0 ? o.innerHTML = "<i><b>" + t + ":</b></i>" : o.innerHTML = t + ":", o
                    }
                    },
                    {
                        key: "_makeDropdown", value: function (t, e, i) {
                        var o = document.createElement("select");
                        o.className = "vis-network-configuration select";
                        var n = 0;
                        void 0 !== e && -1 !== t.indexOf(e) && (n = t.indexOf(e));
                        for (var s = 0; s < t.length; s++) {
                            var r = document.createElement("option");
                            r.value = t[s], s === n && (r.selected = "selected"), r.innerHTML = t[s], o.appendChild(r)
                        }
                        var a = this;
                        o.onchange = function () {
                            a._update(this.value, i)
                        };
                        var h = this._makeLabel(i[i.length - 1], i);
                        this._makeItem(i, h, o)
                    }
                    },
                    {
                        key: "_makeRange", value: function (t, e, i) {
                        var o = t[0], n = t[1], s = t[2], r = t[3], a = document.createElement("input");
                        a.className = "vis-network-configuration range";
                        try {
                            a.type = "range", a.min = n, a.max = s
                        } catch (h) {
                        }
                        a.step = r, void 0 !== e ? (0 > e && n > 2 * e ? a.min = 2 * e : n > .1 * e && (a.min = e / 10), 2 * e > s && 1 !== s && (a.max = 2 * e), a.value = e) : a.value = o;
                        var d = document.createElement("input");
                        d.className = "vis-network-configuration rangeinput", d.value = a.value;
                        var l = this;
                        a.onchange = function () {
                            d.value = this.value, l._update(Number(this.value), i)
                        }, a.oninput = function () {
                            d.value = this.value
                        };
                        var u = this._makeLabel(i[i.length - 1], i);
                        this._makeItem(i, u, a, d)
                    }
                    },
                    {
                        key: "_makeCheckbox", value: function (t, e, i) {
                        var o = document.createElement("input");
                        o.type = "checkbox", o.className = "vis-network-configuration checkbox", o.checked = t, void 0 !== e && (o.checked = e, e !== t && ("object" == typeof t ? e !== t.enabled && this.changedOptions.push({
                                path: i,
                                value: e
                            }) : this.changedOptions.push({path: i, value: e})));
                        var n = this;
                        o.onchange = function () {
                            n._update(this.checked, i)
                        };
                        var s = this._makeLabel(i[i.length - 1], i);
                        this._makeItem(i, s, o)
                    }
                    },
                    {
                        key: "_makeTextInput", value: function (t, e, i) {
                        var o = document.createElement("input");
                        o.type = "text", o.className = "vis-network-configuration text", o.value = e, e !== t && this.changedOptions.push({
                            path: i,
                            value: e
                        });
                        var n = this;
                        o.onchange = function () {
                            n._update(this.value, i)
                        };
                        var s = this._makeLabel(i[i.length - 1], i);
                        this._makeItem(i, s, o)
                    }
                    },
                    {
                        key: "_makeColorField", value: function (t, e, i) {
                        var o = this, n = t[1], s = document.createElement("div");
                        e = void 0 === e ? n : e, "none" !== e ? (s.className = "vis-network-configuration colorBlock", s.style.backgroundColor = e) : s.className = "vis-network-configuration colorBlock none", e = void 0 === e ? n : e, s.onclick = function () {
                            o._showColorPicker(e, s, i)
                        };
                        var r = this._makeLabel(i[i.length - 1], i);
                        this._makeItem(i, r, s)
                    }
                    },
                    {
                        key: "_showColorPicker", value: function (t, e, i) {
                        var o = this, n = e.getBoundingClientRect(), s = document.body.getBoundingClientRect(), r = n.left + n.width + 5, a = n.top - s.top + .5 * n.height;
                        this.colorPicker.show(r, a), this.colorPicker.setColor(t), this.colorPicker.setCallback(function (t) {
                            var n = "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a + ")";
                            e.style.backgroundColor = n, o._update(n, i)
                        })
                    }
                    },
                    {
                        key: "_handleObject", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1], i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], o = !1, n = this.options.filter, s = !1;
                        for (var r in t)if (t.hasOwnProperty(r)) {
                            o = !0;
                            var a = t[r], d = h.copyAndExtendArray(e, r);
                            if ("function" == typeof n && (o = n(r, e), o === !1 && !(a instanceof Array) && "string" != typeof a && "boolean" != typeof a && a instanceof Object && (this.allowCreation = !1, o = this._handleObject(a, d, !0), this.allowCreation = i === !1)), o !== !1) {
                                s = !0;
                                var l = this._getValue(d);
                                if (a instanceof Array) this._handleArray(a, l, d); else if ("string" == typeof a) this._makeTextInput(a, l, d); else if ("boolean" == typeof a) this._makeCheckbox(a, l, d); else if (a instanceof Object) {
                                    var u = !0;
                                    if (-1 !== e.indexOf("physics") && this.moduleOptions.physics.solver !== r && (u = !1), u === !0)if (void 0 !== a.enabled) {
                                        var c = h.copyAndExtendArray(d, "enabled"), p = this._getValue(c);
                                        if (p === !0) {
                                            var f = this._makeLabel(r, d, !0);
                                            this._makeItem(d, f), s = this._handleObject(a, d) || s
                                        } else this._makeCheckbox(a, p, d)
                                    } else {
                                        var f = this._makeLabel(r, d, !0);
                                        this._makeItem(d, f), s = this._handleObject(a, d) || s
                                    }
                                } else console.error("dont know how to handle", a, r, d)
                            }
                        }
                        return s
                    }
                    },
                    {
                        key: "_handleArray", value: function (t, e, i) {
                        "string" == typeof t[0] && "color" === t[0] ? (this._makeColorField(t, e, i), t[1] !== e && this.changedOptions.push({
                                path: i,
                                value: e
                            })) : "string" == typeof t[0] ? (this._makeDropdown(t, e, i), t[0] !== e && this.changedOptions.push({
                                    path: i,
                                    value: e
                                })) : "number" == typeof t[0] && (this._makeRange(t, e, i), t[0] !== e && this.changedOptions.push({
                                    path: i,
                                    value: Number(e)
                                }))
                    }
                    },
                    {
                        key: "_update", value: function (t, e) {
                        var i = this._constructOptions(t, e);
                        this.parent.body && this.parent.body.emitter && this.parent.body.emitter.emit && this.parent.body.emitter.emit("configChange", i), this.parent.setOptions(i)
                    }
                    },
                    {
                        key: "_constructOptions", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], o = i;
                        t = "true" === t ? !0 : t, t = "false" === t ? !1 : t;
                        for (var n = 0; n < e.length; n++)"global" !== e[n] && (void 0 === o[e[n]] && (o[e[n]] = {}), n !== e.length - 1 ? o = o[e[n]] : o[e[n]] = t);
                        return i
                    }
                    },
                    {
                        key: "_printOptions", value: function () {
                        var t = this.getOptions();
                        this.optionsContainer.innerHTML = "<pre>var options = " + JSON.stringify(t, null, 2) + "</pre>"
                    }
                    },
                    {
                        key: "getOptions", value: function () {
                        for (var t = {}, e = 0; e < this.changedOptions.length; e++)this._constructOptions(this.changedOptions[e].value, this.changedOptions[e].path, t);
                        return t
                    }
                    }
                ]), t
            }();
            e["default"] = d, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(3), r = i(27), a = i(7), h = function () {
                function t() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                    o(this, t), this.pixelRatio = e, this.generated = !1, this.centerCoordinates = {
                        x: 144.5,
                        y: 144.5
                    }, this.r = 289 * .49, this.color = {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1
                    }, this.hueCircle = void 0, this.initialColor = {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1
                    }, this.previousColor = void 0, this.applied = !1, this.updateCallback = function () {
                    }, this._create()
                }

                return n(t, [
                    {
                        key: "insertTo", value: function (t) {
                        void 0 !== this.hammer && (this.hammer.destroy(), this.hammer = void 0), this.container = t, this.container.appendChild(this.frame), this._bindHammer(), this._setSize()
                    }
                    },
                    {
                        key: "setCallback", value: function (t) {
                        if ("function" != typeof t)throw new Error("Function attempted to set as colorPicker callback is not a function.");
                        this.updateCallback = t
                    }
                    },
                    {
                        key: "_isColorString", value: function (t) {
                        var e = {
                            black: "#000000",
                            navy: "#000080",
                            darkblue: "#00008B",
                            mediumblue: "#0000CD",
                            blue: "#0000FF",
                            darkgreen: "#006400",
                            green: "#008000",
                            teal: "#008080",
                            darkcyan: "#008B8B",
                            deepskyblue: "#00BFFF",
                            darkturquoise: "#00CED1",
                            mediumspringgreen: "#00FA9A",
                            lime: "#00FF00",
                            springgreen: "#00FF7F",
                            aqua: "#00FFFF",
                            cyan: "#00FFFF",
                            midnightblue: "#191970",
                            dodgerblue: "#1E90FF",
                            lightseagreen: "#20B2AA",
                            forestgreen: "#228B22",
                            seagreen: "#2E8B57",
                            darkslategray: "#2F4F4F",
                            limegreen: "#32CD32",
                            mediumseagreen: "#3CB371",
                            turquoise: "#40E0D0",
                            royalblue: "#4169E1",
                            steelblue: "#4682B4",
                            darkslateblue: "#483D8B",
                            mediumturquoise: "#48D1CC",
                            indigo: "#4B0082",
                            darkolivegreen: "#556B2F",
                            cadetblue: "#5F9EA0",
                            cornflowerblue: "#6495ED",
                            mediumaquamarine: "#66CDAA",
                            dimgray: "#696969",
                            slateblue: "#6A5ACD",
                            olivedrab: "#6B8E23",
                            slategray: "#708090",
                            lightslategray: "#778899",
                            mediumslateblue: "#7B68EE",
                            lawngreen: "#7CFC00",
                            chartreuse: "#7FFF00",
                            aquamarine: "#7FFFD4",
                            maroon: "#800000",
                            purple: "#800080",
                            olive: "#808000",
                            gray: "#808080",
                            skyblue: "#87CEEB",
                            lightskyblue: "#87CEFA",
                            blueviolet: "#8A2BE2",
                            darkred: "#8B0000",
                            darkmagenta: "#8B008B",
                            saddlebrown: "#8B4513",
                            darkseagreen: "#8FBC8F",
                            lightgreen: "#90EE90",
                            mediumpurple: "#9370D8",
                            darkviolet: "#9400D3",
                            palegreen: "#98FB98",
                            darkorchid: "#9932CC",
                            yellowgreen: "#9ACD32",
                            sienna: "#A0522D",
                            brown: "#A52A2A",
                            darkgray: "#A9A9A9",
                            lightblue: "#ADD8E6",
                            greenyellow: "#ADFF2F",
                            paleturquoise: "#AFEEEE",
                            lightsteelblue: "#B0C4DE",
                            powderblue: "#B0E0E6",
                            firebrick: "#B22222",
                            darkgoldenrod: "#B8860B",
                            mediumorchid: "#BA55D3",
                            rosybrown: "#BC8F8F",
                            darkkhaki: "#BDB76B",
                            silver: "#C0C0C0",
                            mediumvioletred: "#C71585",
                            indianred: "#CD5C5C",
                            peru: "#CD853F",
                            chocolate: "#D2691E",
                            tan: "#D2B48C",
                            lightgrey: "#D3D3D3",
                            palevioletred: "#D87093",
                            thistle: "#D8BFD8",
                            orchid: "#DA70D6",
                            goldenrod: "#DAA520",
                            crimson: "#DC143C",
                            gainsboro: "#DCDCDC",
                            plum: "#DDA0DD",
                            burlywood: "#DEB887",
                            lightcyan: "#E0FFFF",
                            lavender: "#E6E6FA",
                            darksalmon: "#E9967A",
                            violet: "#EE82EE",
                            palegoldenrod: "#EEE8AA",
                            lightcoral: "#F08080",
                            khaki: "#F0E68C",
                            aliceblue: "#F0F8FF",
                            honeydew: "#F0FFF0",
                            azure: "#F0FFFF",
                            sandybrown: "#F4A460",
                            wheat: "#F5DEB3",
                            beige: "#F5F5DC",
                            whitesmoke: "#F5F5F5",
                            mintcream: "#F5FFFA",
                            ghostwhite: "#F8F8FF",
                            salmon: "#FA8072",
                            antiquewhite: "#FAEBD7",
                            linen: "#FAF0E6",
                            lightgoldenrodyellow: "#FAFAD2",
                            oldlace: "#FDF5E6",
                            red: "#FF0000",
                            fuchsia: "#FF00FF",
                            magenta: "#FF00FF",
                            deeppink: "#FF1493",
                            orangered: "#FF4500",
                            tomato: "#FF6347",
                            hotpink: "#FF69B4",
                            coral: "#FF7F50",
                            darkorange: "#FF8C00",
                            lightsalmon: "#FFA07A",
                            orange: "#FFA500",
                            lightpink: "#FFB6C1",
                            pink: "#FFC0CB",
                            gold: "#FFD700",
                            peachpuff: "#FFDAB9",
                            navajowhite: "#FFDEAD",
                            moccasin: "#FFE4B5",
                            bisque: "#FFE4C4",
                            mistyrose: "#FFE4E1",
                            blanchedalmond: "#FFEBCD",
                            papayawhip: "#FFEFD5",
                            lavenderblush: "#FFF0F5",
                            seashell: "#FFF5EE",
                            cornsilk: "#FFF8DC",
                            lemonchiffon: "#FFFACD",
                            floralwhite: "#FFFAF0",
                            snow: "#FFFAFA",
                            yellow: "#FFFF00",
                            lightyellow: "#FFFFE0",
                            ivory: "#FFFFF0",
                            white: "#FFFFFF"
                        };
                        return "string" == typeof t ? e[t] : void 0
                    }
                    },
                    {
                        key: "setColor", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                        if ("none" !== t) {
                            var i = void 0, o = this._isColorString(t);
                            if (void 0 !== o && (t = o), a.isString(t) === !0) {
                                if (a.isValidRGB(t) === !0) {
                                    var n = t.substr(4).substr(0, t.length - 5).split(",");
                                    i = {r: n[0], g: n[1], b: n[2], a: 1}
                                } else if (a.isValidRGBA(t) === !0) {
                                    var n = t.substr(5).substr(0, t.length - 6).split(",");
                                    i = {r: n[0], g: n[1], b: n[2], a: n[3]}
                                } else if (a.isValidHex(t) === !0) {
                                    var s = a.hexToRGB(t);
                                    i = {r: s.r, g: s.g, b: s.b, a: 1}
                                }
                            } else if (t instanceof Object && void 0 !== t.r && void 0 !== t.g && void 0 !== t.b) {
                                var r = void 0 !== t.a ? t.a : "1.0";
                                i = {r: t.r, g: t.g, b: t.b, a: r}
                            }
                            if (void 0 === i)throw new Error("Unknown color passed to the colorPicker. Supported are strings: rgb, hex, rgba. Object: rgb ({r:r,g:g,b:b,[a:a]}). Supplied: " + JSON.stringify(t));
                            this._setColor(i, e)
                        }
                    }
                    },
                    {
                        key: "show", value: function (t, e) {
                        this.applied = !1, this.frame.style.display = "block", this.frame.style.top = e + "px", this.frame.style.left = t + "px", this._generateHueCircle()
                    }
                    },
                    {
                        key: "_hide", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
                        t === !0 && (this.previousColor = a.extend({}, this.color)), this.applied === !0 && this.updateCallback(this.initialColor), this.frame.style.display = "none"
                    }
                    },
                    {
                        key: "_save", value: function () {
                        this.updateCallback(this.color), this.applied = !1, this._hide()
                    }
                    },
                    {
                        key: "_apply", value: function () {
                        this.applied = !0, this.updateCallback(this.color), this._updatePicker(this.color)
                    }
                    },
                    {
                        key: "_loadLast", value: function () {
                        void 0 !== this.previousColor ? this.setColor(this.previousColor, !1) : alert("There is no last color to load...")
                    }
                    },
                    {
                        key: "_setColor", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                        e === !0 && (this.initialColor = a.extend({}, t)), this.color = t;
                        var i = a.RGBToHSV(t.r, t.g, t.b), o = 2 * Math.PI, n = this.r * i.s, s = this.centerCoordinates.x + n * Math.sin(o * i.h), r = this.centerCoordinates.y + n * Math.cos(o * i.h);
                        this.colorPickerSelector.style.left = s - .5 * this.colorPickerSelector.clientWidth + "px", this.colorPickerSelector.style.top = r - .5 * this.colorPickerSelector.clientHeight + "px", this._updatePicker(t)
                    }
                    },
                    {
                        key: "_setOpacity", value: function (t) {
                        this.color.a = t / 100, this._updatePicker(this.color)
                    }
                    },
                    {
                        key: "_setBrightness", value: function (t) {
                        var e = a.RGBToHSV(this.color.r, this.color.g, this.color.b);
                        e.v = t / 100;
                        var i = a.HSVToRGB(e.h, e.s, e.v);
                        i.a = this.color.a, this.color = i, this._updatePicker()
                    }
                    },
                    {
                        key: "_updatePicker", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? this.color : arguments[0], e = a.RGBToHSV(t.r, t.g, t.b), i = this.colorPickerCanvas.getContext("2d");
                        void 0 === this.pixelRation && (this.pixelRatio = (window.devicePixelRatio || 1) / (i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1)), i.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
                        var o = this.colorPickerCanvas.clientWidth, n = this.colorPickerCanvas.clientHeight;
                        i.clearRect(0, 0, o, n), i.putImageData(this.hueCircle, 0, 0), i.fillStyle = "rgba(0,0,0," + (1 - e.v) + ")", i.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r), i.fill(), this.brightnessRange.value = 100 * e.v, this.opacityRange.value = 100 * t.a, this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")", this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")"
                    }
                    },
                    {
                        key: "_setSize", value: function () {
                        this.colorPickerCanvas.style.width = "100%", this.colorPickerCanvas.style.height = "100%", this.colorPickerCanvas.width = 289 * this.pixelRatio, this.colorPickerCanvas.height = 289 * this.pixelRatio
                    }
                    },
                    {
                        key: "_create", value: function () {
                        if (this.frame = document.createElement("div"), this.frame.className = "vis-color-picker", this.colorPickerDiv = document.createElement("div"), this.colorPickerSelector = document.createElement("div"), this.colorPickerSelector.className = "vis-selector", this.colorPickerDiv.appendChild(this.colorPickerSelector), this.colorPickerCanvas = document.createElement("canvas"), this.colorPickerDiv.appendChild(this.colorPickerCanvas), this.colorPickerCanvas.getContext) {
                            var t = this.colorPickerCanvas.getContext("2d");
                            this.pixelRatio = (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1), this.colorPickerCanvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0)
                        } else {
                            var e = document.createElement("DIV");
                            e.style.color = "red", e.style.fontWeight = "bold", e.style.padding = "10px", e.innerHTML = "Error: your browser does not support HTML canvas", this.colorPickerCanvas.appendChild(e)
                        }
                        this.colorPickerDiv.className = "vis-color", this.opacityDiv = document.createElement("div"), this.opacityDiv.className = "vis-opacity", this.brightnessDiv = document.createElement("div"), this.brightnessDiv.className = "vis-brightness", this.arrowDiv = document.createElement("div"), this.arrowDiv.className = "vis-arrow", this.opacityRange = document.createElement("input");
                        try {
                            this.opacityRange.type = "range", this.opacityRange.min = "0", this.opacityRange.max = "100"
                        } catch (i) {
                        }
                        this.opacityRange.value = "100", this.opacityRange.className = "vis-range", this.brightnessRange = document.createElement("input");
                        try {
                            this.brightnessRange.type = "range", this.brightnessRange.min = "0", this.brightnessRange.max = "100"
                        } catch (i) {
                        }
                        this.brightnessRange.value = "100", this.brightnessRange.className = "vis-range", this.opacityDiv.appendChild(this.opacityRange), this.brightnessDiv.appendChild(this.brightnessRange);
                        var o = this;
                        this.opacityRange.onchange = function () {
                            o._setOpacity(this.value)
                        }, this.opacityRange.oninput = function () {
                            o._setOpacity(this.value)
                        }, this.brightnessRange.onchange = function () {
                            o._setBrightness(this.value)
                        }, this.brightnessRange.oninput = function () {
                            o._setBrightness(this.value)
                        }, this.brightnessLabel = document.createElement("div"), this.brightnessLabel.className = "vis-label vis-brightness", this.brightnessLabel.innerHTML = "brightness:", this.opacityLabel = document.createElement("div"), this.opacityLabel.className = "vis-label vis-opacity", this.opacityLabel.innerHTML = "opacity:", this.newColorDiv = document.createElement("div"), this.newColorDiv.className = "vis-new-color", this.newColorDiv.innerHTML = "new", this.initialColorDiv = document.createElement("div"), this.initialColorDiv.className = "vis-initial-color", this.initialColorDiv.innerHTML = "initial", this.cancelButton = document.createElement("div"), this.cancelButton.className = "vis-button vis-cancel", this.cancelButton.innerHTML = "cancel", this.cancelButton.onclick = this._hide.bind(this, !1), this.applyButton = document.createElement("div"), this.applyButton.className = "vis-button vis-apply", this.applyButton.innerHTML = "apply", this.applyButton.onclick = this._apply.bind(this), this.saveButton = document.createElement("div"), this.saveButton.className = "vis-button vis-save", this.saveButton.innerHTML = "save", this.saveButton.onclick = this._save.bind(this), this.loadButton = document.createElement("div"), this.loadButton.className = "vis-button vis-load", this.loadButton.innerHTML = "load last", this.loadButton.onclick = this._loadLast.bind(this), this.frame.appendChild(this.colorPickerDiv), this.frame.appendChild(this.arrowDiv), this.frame.appendChild(this.brightnessLabel), this.frame.appendChild(this.brightnessDiv), this.frame.appendChild(this.opacityLabel), this.frame.appendChild(this.opacityDiv), this.frame.appendChild(this.newColorDiv), this.frame.appendChild(this.initialColorDiv), this.frame.appendChild(this.cancelButton), this.frame.appendChild(this.applyButton), this.frame.appendChild(this.saveButton), this.frame.appendChild(this.loadButton)
                    }
                    },
                    {
                        key: "_bindHammer", value: function () {
                        var t = this;
                        this.drag = {},
                            this.pinch = {}, this.hammer = new s(this.colorPickerCanvas), this.hammer.get("pinch").set({enable: !0}), r.onTouch(this.hammer, function (e) {
                            t._moveSelector(e)
                        }), this.hammer.on("tap", function (e) {
                            t._moveSelector(e)
                        }), this.hammer.on("panstart", function (e) {
                            t._moveSelector(e)
                        }), this.hammer.on("panmove", function (e) {
                            t._moveSelector(e)
                        }), this.hammer.on("panend", function (e) {
                            t._moveSelector(e)
                        })
                    }
                    },
                    {
                        key: "_generateHueCircle", value: function () {
                        if (this.generated === !1) {
                            var t = this.colorPickerCanvas.getContext("2d");
                            void 0 === this.pixelRation && (this.pixelRatio = (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)), t.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
                            var e = this.colorPickerCanvas.clientWidth, i = this.colorPickerCanvas.clientHeight;
                            t.clearRect(0, 0, e, i);
                            var o = void 0, n = void 0, s = void 0, r = void 0;
                            this.centerCoordinates = {x: .5 * e, y: .5 * i}, this.r = .49 * e;
                            var h = 2 * Math.PI / 360, d = 1 / 360, l = 1 / this.r, u = void 0;
                            for (s = 0; 360 > s; s++)for (r = 0; r < this.r; r++)o = this.centerCoordinates.x + r * Math.sin(h * s), n = this.centerCoordinates.y + r * Math.cos(h * s), u = a.HSVToRGB(s * d, r * l, 1), t.fillStyle = "rgb(" + u.r + "," + u.g + "," + u.b + ")", t.fillRect(o - .5, n - .5, 2, 2);
                            t.strokeStyle = "rgba(0,0,0,1)", t.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r), t.stroke(), this.hueCircle = t.getImageData(0, 0, e, i)
                        }
                        this.generated = !0
                    }
                    },
                    {
                        key: "_moveSelector", value: function (t) {
                        var e = this.colorPickerDiv.getBoundingClientRect(), i = t.center.x - e.left, o = t.center.y - e.top, n = .5 * this.colorPickerDiv.clientHeight, s = .5 * this.colorPickerDiv.clientWidth, r = i - s, h = o - n, d = Math.atan2(r, h), l = .98 * Math.min(Math.sqrt(r * r + h * h), s), u = Math.cos(d) * l + n, c = Math.sin(d) * l + s;
                        this.colorPickerSelector.style.top = u - .5 * this.colorPickerSelector.clientHeight + "px", this.colorPickerSelector.style.left = c - .5 * this.colorPickerSelector.clientWidth + "px";
                        var p = d / (2 * Math.PI);
                        p = 0 > p ? p + 1 : p;
                        var f = l / this.r, m = a.RGBToHSV(this.color.r, this.color.g, this.color.b);
                        m.h = p, m.s = f;
                        var v = a.HSVToRGB(m.h, m.s, m.v);
                        v.a = this.color.a, this.color = v, this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")", this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")"
                    }
                    }
                ]), t
            }();
            e["default"] = h, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(7), r = !1, a = void 0, h = "background: #FFeeee; color: #dd0000", d = function () {
                function t() {
                    o(this, t)
                }

                return n(t, null, [
                    {
                        key: "validate", value: function (e, i, o) {
                        r = !1, a = i;
                        var n = i;
                        return void 0 !== o && (n = i[o]), t.parse(e, n, []), r
                    }
                    },
                    {
                        key: "parse", value: function (e, i, o) {
                        for (var n in e)e.hasOwnProperty(n) && t.check(n, e, i, o)
                    }
                    },
                    {
                        key: "check", value: function (e, i, o, n) {
                        void 0 === o[e] && void 0 === o.__any__ ? t.getSuggestion(e, o, n) : void 0 === o[e] && void 0 !== o.__any__ ? "object" === t.getType(i[e]) && void 0 !== o.__any__.__type__ ? t.checkFields(e, i, o, "__any__", o.__any__.__type__, n) : t.checkFields(e, i, o, "__any__", o.__any__, n) : void 0 !== o[e].__type__ ? t.checkFields(e, i, o, e, o[e].__type__, n) : t.checkFields(e, i, o, e, o[e], n)
                    }
                    },
                    {
                        key: "checkFields", value: function (e, i, o, n, a, d) {
                        var l = t.getType(i[e]), u = a[l];
                        void 0 !== u ? "array" === t.getType(u) && -1 === u.indexOf(i[e]) ? (console.log('%cInvalid option detected in "' + e + '". Allowed values are:' + t.print(u) + ' not "' + i[e] + '". ' + t.printLocation(d, e), h), r = !0) : "object" === l && "__any__" !== n && (d = s.copyAndExtendArray(d, e), t.parse(i[e], o[n], d)) : void 0 === a.any && (console.log('%cInvalid type received for "' + e + '". Expected: ' + t.print(Object.keys(a)) + ". Received [" + l + '] "' + i[e] + '"' + t.printLocation(d, e), h), r = !0)
                    }
                    },
                    {
                        key: "getType", value: function (t) {
                        var e = typeof t;
                        return "object" === e ? null === t ? "null" : t instanceof Boolean ? "boolean" : t instanceof Number ? "number" : t instanceof String ? "string" : Array.isArray(t) ? "array" : t instanceof Date ? "date" : void 0 !== t.nodeType ? "dom" : t._isAMomentObject === !0 ? "moment" : "object" : "number" === e ? "number" : "boolean" === e ? "boolean" : "string" === e ? "string" : void 0 === e ? "undefined" : e
                    }
                    },
                    {
                        key: "getSuggestion", value: function (e, i, o) {
                        var n = t.findInOptions(e, i, o, !1), s = t.findInOptions(e, a, [], !0), d = 8, l = 4;
                        void 0 !== n.indexMatch ? console.log('%cUnknown option detected: "' + e + '" in ' + t.printLocation(n.path, e, "") + 'Perhaps it was incomplete? Did you mean: "' + n.indexMatch + '"?\n\n', h) : s.distance <= l && n.distance > s.distance ? console.log('%cUnknown option detected: "' + e + '" in ' + t.printLocation(n.path, e, "") + "Perhaps it was misplaced? Matching option found at: " + t.printLocation(s.path, s.closestMatch, ""), h) : n.distance <= d ? console.log('%cUnknown option detected: "' + e + '". Did you mean "' + n.closestMatch + '"?' + t.printLocation(n.path, e), h) : console.log('%cUnknown option detected: "' + e + '". Did you mean one of these: ' + t.print(Object.keys(i)) + t.printLocation(o, e), h), r = !0
                    }
                    },
                    {
                        key: "findInOptions", value: function (e, i, o) {
                        var n = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3], r = 1e9, a = "", h = [], d = e.toLowerCase(), l = void 0;
                        for (var u in i) {
                            var c = void 0;
                            if (void 0 !== i[u].__type__ && n === !0) {
                                var p = t.findInOptions(e, i[u], s.copyAndExtendArray(o, u));
                                r > p.distance && (a = p.closestMatch, h = p.path, r = p.distance, l = p.indexMatch)
                            } else-1 !== u.toLowerCase().indexOf(d) && (l = u), c = t.levenshteinDistance(e, u), r > c && (a = u, h = s.copyArray(o), r = c)
                        }
                        return {closestMatch: a, path: h, distance: r, indexMatch: l}
                    }
                    },
                    {
                        key: "printLocation", value: function (t, e) {
                        for (var i = arguments.length <= 2 || void 0 === arguments[2] ? "Problem value found at: \n" : arguments[2], o = "\n\n" + i + "options = {\n", n = 0; n < t.length; n++) {
                            for (var s = 0; n + 1 > s; s++)o += "  ";
                            o += t[n] + ": {\n"
                        }
                        for (var s = 0; s < t.length + 1; s++)o += "  ";
                        o += e + "\n";
                        for (var n = 0; n < t.length + 1; n++) {
                            for (var s = 0; s < t.length - n; s++)o += "  ";
                            o += "}\n"
                        }
                        return o + "\n\n"
                    }
                    },
                    {
                        key: "print", value: function (t) {
                        return JSON.stringify(t).replace(/(\")|(\[)|(\])|(,"__type__")/g, "").replace(/(\,)/g, ", ")
                    }
                    },
                    {
                        key: "levenshteinDistance", value: function (t, e) {
                        if (0 === t.length)return e.length;
                        if (0 === e.length)return t.length;
                        var i, o = [];
                        for (i = 0; i <= e.length; i++)o[i] = [i];
                        var n;
                        for (n = 0; n <= t.length; n++)o[0][n] = n;
                        for (i = 1; i <= e.length; i++)for (n = 1; n <= t.length; n++)e.charAt(i - 1) == t.charAt(n - 1) ? o[i][n] = o[i - 1][n - 1] : o[i][n] = Math.min(o[i - 1][n - 1] + 1, Math.min(o[i][n - 1] + 1, o[i - 1][n] + 1));
                        return o[e.length][t.length]
                    }
                    }
                ]), t
            }();
            e["default"] = d, e.printStyle = h
        },
        function (t, e) {
            Object.defineProperty(e, "__esModule", {value: !0});
            var i = "string", o = "boolean", n = "number", s = "array", r = "date", a = "object", h = "dom", d = "moment", l = "any", u = {
                configure: {
                    enabled: {"boolean": o},
                    filter: {"boolean": o, "function": "function"},
                    container: {dom: h},
                    __type__: {object: a, "boolean": o, "function": "function"}
                },
                align: {string: i},
                autoResize: {"boolean": o},
                clickToUse: {"boolean": o},
                dataAttributes: {string: i, array: s},
                editable: {
                    add: {"boolean": o, undefined: "undefined"},
                    remove: {"boolean": o, undefined: "undefined"},
                    updateGroup: {"boolean": o, undefined: "undefined"},
                    updateTime: {"boolean": o, undefined: "undefined"},
                    __type__: {"boolean": o, object: a}
                },
                end: {number: n, date: r, string: i, moment: d},
                format: {
                    minorLabels: {
                        millisecond: {string: i, undefined: "undefined"},
                        second: {string: i, undefined: "undefined"},
                        minute: {string: i, undefined: "undefined"},
                        hour: {string: i, undefined: "undefined"},
                        weekday: {string: i, undefined: "undefined"},
                        day: {string: i, undefined: "undefined"},
                        month: {string: i, undefined: "undefined"},
                        year: {string: i, undefined: "undefined"},
                        __type__: {object: a}
                    },
                    majorLabels: {
                        millisecond: {string: i, undefined: "undefined"},
                        second: {string: i, undefined: "undefined"},
                        minute: {string: i, undefined: "undefined"},
                        hour: {string: i, undefined: "undefined"},
                        weekday: {string: i, undefined: "undefined"},
                        day: {string: i, undefined: "undefined"},
                        month: {string: i, undefined: "undefined"},
                        year: {string: i, undefined: "undefined"},
                        __type__: {object: a}
                    },
                    __type__: {object: a}
                },
                moment: {"function": "function"},
                groupOrder: {string: i, "function": "function"},
                height: {string: i, number: n},
                hiddenDates: {object: a, array: s},
                locale: {string: i},
                locales: {__any__: {any: l}, __type__: {object: a}},
                margin: {
                    axis: {number: n},
                    item: {
                        horizontal: {number: n, undefined: "undefined"},
                        vertical: {number: n, undefined: "undefined"},
                        __type__: {object: a, number: n}
                    },
                    __type__: {object: a, number: n}
                },
                max: {date: r, number: n, string: i, moment: d},
                maxHeight: {number: n, string: i},
                min: {date: r, number: n, string: i, moment: d},
                minHeight: {number: n, string: i},
                moveable: {"boolean": o},
                multiselect: {"boolean": o},
                onAdd: {"function": "function"},
                onUpdate: {"function": "function"},
                onMove: {"function": "function"},
                onMoving: {"function": "function"},
                onRemove: {"function": "function"},
                order: {"function": "function"},
                orientation: {
                    axis: {string: i, undefined: "undefined"},
                    item: {string: i, undefined: "undefined"},
                    __type__: {string: i, object: a}
                },
                selectable: {"boolean": o},
                showCurrentTime: {"boolean": o},
                showMajorLabels: {"boolean": o},
                showMinorLabels: {"boolean": o},
                stack: {"boolean": o},
                snap: {"function": "function", "null": "null"},
                start: {date: r, number: n, string: i, moment: d},
                template: {"function": "function"},
                groupTemplate: {"function": "function"},
                timeAxis: {
                    scale: {string: i, undefined: "undefined"},
                    step: {number: n, undefined: "undefined"},
                    __type__: {object: a}
                },
                type: {string: i},
                width: {string: i, number: n},
                zoomable: {"boolean": o},
                zoomKey: {string: ["ctrlKey", "altKey", "metaKey", ""]},
                zoomMax: {number: n},
                zoomMin: {number: n},
                __type__: {object: a}
            }, c = {
                global: {
                    align: ["center", "left", "right"],
                    autoResize: !0,
                    clickToUse: !1,
                    editable: {add: !1, remove: !1, updateGroup: !1, updateTime: !1},
                    end: "",
                    format: {
                        minorLabels: {
                            millisecond: "SSS",
                            second: "s",
                            minute: "HH:mm",
                            hour: "HH:mm",
                            weekday: "ddd D",
                            day: "D",
                            month: "MMM",
                            year: "YYYY"
                        },
                        majorLabels: {
                            millisecond: "HH:mm:ss",
                            second: "D MMMM HH:mm",
                            minute: "ddd D MMMM",
                            hour: "ddd D MMMM",
                            weekday: "MMMM YYYY",
                            day: "MMMM YYYY",
                            month: "YYYY",
                            year: ""
                        }
                    },
                    height: "",
                    locale: "",
                    margin: {axis: [20, 0, 100, 1], item: {horizontal: [10, 0, 100, 1], vertical: [10, 0, 100, 1]}},
                    max: "",
                    maxHeight: "",
                    min: "",
                    minHeight: "",
                    moveable: !1,
                    multiselect: !1,
                    orientation: {axis: ["both", "bottom", "top"], item: ["bottom", "top"]},
                    selectable: !0,
                    showCurrentTime: !1,
                    showMajorLabels: !0,
                    showMinorLabels: !0,
                    stack: !0,
                    start: "",
                    type: ["box", "point", "range", "background"],
                    width: "100%",
                    zoomable: !0,
                    zoomKey: ["ctrlKey", "altKey", "metaKey", ""],
                    zoomMax: [31536e10, 10, 31536e10, 1],
                    zoomMin: [10, 10, 31536e10, 1]
                }
            };
            e.allOptions = u, e.configureOptions = c
        },
        function (t, e, i) {
            function o(t, e, i, o) {
                if (!(Array.isArray(i) || i instanceof r) && i instanceof Object) {
                    var a = o;
                    o = i, i = a
                }
                var d = this;
                this.defaultOptions = {
                    start: null,
                    end: null,
                    autoResize: !0,
                    orientation: {axis: "bottom", item: "bottom"},
                    moment: n,
                    width: null,
                    height: null,
                    maxHeight: null,
                    minHeight: null
                }, this.options = s.deepExtend({}, this.defaultOptions), this._create(t), this.components = [], this.body = {
                    dom: this.dom,
                    domProps: this.props,
                    emitter: {on: this.on.bind(this), off: this.off.bind(this), emit: this.emit.bind(this)},
                    hiddenDates: [],
                    util: {
                        toScreen: d._toScreen.bind(d),
                        toGlobalScreen: d._toGlobalScreen.bind(d),
                        toTime: d._toTime.bind(d),
                        toGlobalTime: d._toGlobalTime.bind(d)
                    }
                }, this.range = new h(this.body), this.components.push(this.range), this.body.range = this.range, this.timeAxis = new l(this.body), this.components.push(this.timeAxis), this.currentTime = new u(this.body), this.components.push(this.currentTime), this.linegraph = new p(this.body), this.components.push(this.linegraph), this.itemsData = null, this.groupsData = null, this.on("tap", function (t) {
                    d.emit("click", d.getEventProperties(t))
                }), this.on("doubletap", function (t) {
                    d.emit("doubleClick", d.getEventProperties(t))
                }), this.dom.root.oncontextmenu = function (t) {
                    d.emit("contextmenu", d.getEventProperties(t))
                }, o && this.setOptions(o), i && this.setGroups(i), e ? this.setItems(e) : this._redraw()
            }

            var n = (i(19), i(3), i(8)), s = i(7), r = i(14), a = i(16), h = i(26), d = i(30), l = i(39), u = i(44), c = i(42), p = i(50), f = i(45), m = i(47)["default"], v = i(47).printStyle, g = i(58).allOptions, y = i(58).configureOptions;
            o.prototype = new d, o.prototype.setOptions = function (t) {
                var e = m.validate(t, g);
                e === !0 && console.log("%cErrors have been found in the supplied options object.", v), d.prototype.setOptions.call(this, t)
            }, o.prototype.setItems = function (t) {
                var e, i = null == this.itemsData;
                if (e = t ? t instanceof r || t instanceof a ? t : new r(t, {
                                type: {
                                    start: "Date",
                                    end: "Date"
                                }
                            }) : null, this.itemsData = e, this.linegraph && this.linegraph.setItems(e), i)if (void 0 != this.options.start || void 0 != this.options.end) {
                    var o = void 0 != this.options.start ? this.options.start : null, n = void 0 != this.options.end ? this.options.end : null;
                    this.setWindow(o, n, {animation: !1})
                } else this.fit({animation: !1})
            }, o.prototype.setGroups = function (t) {
                var e;
                e = t ? t instanceof r || t instanceof a ? t : new r(t) : null, this.groupsData = e, this.linegraph.setGroups(e)
            }, o.prototype.getLegend = function (t, e, i) {
                return void 0 === e && (e = 15), void 0 === i && (i = 15), void 0 !== this.linegraph.groups[t] ? this.linegraph.groups[t].getLegend(e, i) : "cannot find group:" + t
            }, o.prototype.isGroupVisible = function (t) {
                return void 0 !== this.linegraph.groups[t] ? this.linegraph.groups[t].visible && (void 0 === this.linegraph.options.groups.visibility[t] || 1 == this.linegraph.options.groups.visibility[t]) : !1
            }, o.prototype.getDataRange = function () {
                var t = null, e = null;
                for (var i in this.linegraph.groups)if (this.linegraph.groups.hasOwnProperty(i) && 1 == this.linegraph.groups[i].visible)for (var o = 0; o < this.linegraph.groups[i].itemsData.length; o++) {
                    var n = this.linegraph.groups[i].itemsData[o], r = s.convert(n.x, "Date").valueOf();
                    t = null == t ? r : t > r ? r : t, e = null == e ? r : r > e ? r : e
                }
                return {min: null != t ? new Date(t) : null, max: null != e ? new Date(e) : null}
            }, o.prototype.getEventProperties = function (t) {
                var e = t.center ? t.center.x : t.clientX, i = t.center ? t.center.y : t.clientY, o = e - s.getAbsoluteLeft(this.dom.centerContainer), n = i - s.getAbsoluteTop(this.dom.centerContainer), r = this._toTime(o), a = c.customTimeFromTarget(t), h = s.getTarget(t), d = null;
                s.hasParent(h, this.timeAxis.dom.foreground) ? d = "axis" : this.timeAxis2 && s.hasParent(h, this.timeAxis2.dom.foreground) ? d = "axis" : s.hasParent(h, this.linegraph.yAxisLeft.dom.frame) ? d = "data-axis" : s.hasParent(h, this.linegraph.yAxisRight.dom.frame) ? d = "data-axis" : s.hasParent(h, this.linegraph.legendLeft.dom.frame) ? d = "legend" : s.hasParent(h, this.linegraph.legendRight.dom.frame) ? d = "legend" : null != a ? d = "custom-time" : s.hasParent(h, this.currentTime.bar) ? d = "current-time" : s.hasParent(h, this.dom.center) && (d = "background");
                var l = [], u = this.linegraph.yAxisLeft, p = this.linegraph.yAxisRight;
                return u.hidden || l.push(u.screenToValue(n)), p.hidden || l.push(p.screenToValue(n)), {
                    event: t,
                    what: d,
                    pageX: t.srcEvent ? t.srcEvent.pageX : t.pageX,
                    pageY: t.srcEvent ? t.srcEvent.pageY : t.pageY,
                    x: o,
                    y: n,
                    time: r,
                    value: l
                }
            }, o.prototype._createConfigurator = function () {
                return new f(this, this.dom.container, y)
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                this.id = n.randomUUID(), this.body = t, this.defaultOptions = {
                    yAxisOrientation: "left",
                    defaultGroup: "default",
                    sort: !0,
                    sampling: !0,
                    stack: !1,
                    graphHeight: "400px",
                    shaded: {enabled: !1, orientation: "bottom"},
                    style: "line",
                    barChart: {width: 50, sideBySide: !1, align: "center"},
                    interpolation: {enabled: !0, parametrization: "centripetal", alpha: .5},
                    drawPoints: {enabled: !0, size: 6, style: "square"},
                    dataAxis: {
                        showMinorLabels: !0,
                        showMajorLabels: !0,
                        icons: !1,
                        width: "40px",
                        visible: !0,
                        alignZeros: !0,
                        left: {
                            range: {min: void 0, max: void 0}, format: function (t) {
                                return t
                            }, title: {text: void 0, style: void 0}
                        },
                        right: {
                            range: {min: void 0, max: void 0}, format: function (t) {
                                return t
                            }, title: {text: void 0, style: void 0}
                        }
                    },
                    legend: {
                        enabled: !1,
                        icons: !0,
                        left: {visible: !0, position: "top-left"},
                        right: {visible: !0, position: "top-right"}
                    },
                    groups: {visibility: {}}
                }, this.options = n.extend({}, this.defaultOptions), this.dom = {}, this.props = {}, this.hammer = null, this.groups = {}, this.abortedGraphUpdate = !1, this.updateSVGheight = !1, this.updateSVGheightOnResize = !1;
                var i = this;
                this.itemsData = null, this.groupsData = null, this.itemListeners = {
                    add: function (t, e, o) {
                        i._onAdd(e.items)
                    }, update: function (t, e, o) {
                        i._onUpdate(e.items)
                    }, remove: function (t, e, o) {
                        i._onRemove(e.items)
                    }
                }, this.groupListeners = {
                    add: function (t, e, o) {
                        i._onAddGroups(e.items)
                    }, update: function (t, e, o) {
                        i._onUpdateGroups(e.items)
                    }, remove: function (t, e, o) {
                        i._onRemoveGroups(e.items)
                    }
                }, this.items = {}, this.selection = [], this.lastStart = this.body.range.start, this.touchParams = {}, this.svgElements = {}, this.setOptions(e), this.groupsUsingDefaultStyles = [0], this.COUNTER = 0, this.body.emitter.on("rangechanged", function () {
                    i.lastStart = i.body.range.start, i.svg.style.left = n.option.asSize(-i.props.width), i.redraw.call(i, !0)
                }), this._create(), this.framework = {
                    svg: this.svg,
                    svgElements: this.svgElements,
                    options: this.options,
                    groups: this.groups
                }, this.body.emitter.emit("change")
            }

            var n = i(7), s = i(13), r = i(14), a = i(16), h = i(28), d = i(51), l = i(53), u = i(57), c = i(56), p = (i(54), "__ungrouped__");
            o.prototype = new h, o.prototype._create = function () {
                var t = document.createElement("div");
                t.className = "vis-line-graph", this.dom.frame = t, this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "relative", this.svg.style.height = ("" + this.options.graphHeight).replace("px", "") + "px", this.svg.style.display = "block", t.appendChild(this.svg), this.options.dataAxis.orientation = "left", this.yAxisLeft = new d(this.body, this.options.dataAxis, this.svg, this.options.groups), this.options.dataAxis.orientation = "right", this.yAxisRight = new d(this.body, this.options.dataAxis, this.svg, this.options.groups), delete this.options.dataAxis.orientation, this.legendLeft = new u(this.body, this.options.legend, "left", this.options.groups), this.legendRight = new u(this.body, this.options.legend, "right", this.options.groups), this.show()
            }, o.prototype.setOptions = function (t) {
                if (t) {
                    var e = ["sampling", "defaultGroup", "stack", "height", "graphHeight", "yAxisOrientation", "style", "barChart", "dataAxis", "sort", "groups"];
                    void 0 === t.graphHeight && void 0 !== t.height && void 0 !== this.body.domProps.centerContainer.height ? (this.updateSVGheight = !0, this.updateSVGheightOnResize = !0) : void 0 !== this.body.domProps.centerContainer.height && void 0 !== t.graphHeight && parseInt((t.graphHeight + "").replace("px", "")) < this.body.domProps.centerContainer.height && (this.updateSVGheight = !0), n.selectiveDeepExtend(e, this.options, t), n.mergeOptions(this.options, t, "interpolation"), n.mergeOptions(this.options, t, "drawPoints"), n.mergeOptions(this.options, t, "shaded"), n.mergeOptions(this.options, t, "legend"), t.interpolation && "object" == typeof t.interpolation && t.interpolation.parametrization && ("uniform" == t.interpolation.parametrization ? this.options.interpolation.alpha = 0 : "chordal" == t.interpolation.parametrization ? this.options.interpolation.alpha = 1 : (this.options.interpolation.parametrization = "centripetal", this.options.interpolation.alpha = .5)), this.yAxisLeft && void 0 !== t.dataAxis && (this.yAxisLeft.setOptions(this.options.dataAxis), this.yAxisRight.setOptions(this.options.dataAxis)), this.legendLeft && void 0 !== t.legend && (this.legendLeft.setOptions(this.options.legend), this.legendRight.setOptions(this.options.legend)), this.groups.hasOwnProperty(p) && this.groups[p].setOptions(t)
                }
                this.dom.frame && this.redraw(!0)
            }, o.prototype.hide = function () {
                this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame)
            }, o.prototype.show = function () {
                this.dom.frame.parentNode || this.body.dom.center.appendChild(this.dom.frame)
            }, o.prototype.setItems = function (t) {
                var e, i = this, o = this.itemsData;
                if (t) {
                    if (!(t instanceof r || t instanceof a))throw new TypeError("Data must be an instance of DataSet or DataView");
                    this.itemsData = t
                } else this.itemsData = null;
                if (o && (n.forEach(this.itemListeners, function (t, e) {
                        o.off(e, t)
                    }), e = o.getIds(), this._onRemove(e)), this.itemsData) {
                    var s = this.id;
                    n.forEach(this.itemListeners, function (t, e) {
                        i.itemsData.on(e, t, s)
                    }), e = this.itemsData.getIds(), this._onAdd(e)
                }
                this._updateUngrouped(), this.redraw(!0)
            }, o.prototype.setGroups = function (t) {
                var e, i = this;
                if (this.groupsData && (n.forEach(this.groupListeners, function (t, e) {
                        i.groupsData.off(e, t)
                    }), e = this.groupsData.getIds(), this.groupsData = null, this._onRemoveGroups(e)), t) {
                    if (!(t instanceof r || t instanceof a))throw new TypeError("Data must be an instance of DataSet or DataView");
                    this.groupsData = t
                } else this.groupsData = null;
                if (this.groupsData) {
                    var o = this.id;
                    n.forEach(this.groupListeners, function (t, e) {
                        i.groupsData.on(e, t, o)
                    }), e = this.groupsData.getIds(), this._onAddGroups(e)
                }
                this._onUpdate()
            }, o.prototype._onUpdate = function (t) {
                this._updateUngrouped(), this._updateAllGroupData(), this.redraw(!0)
            }, o.prototype._onAdd = function (t) {
                this._onUpdate(t)
            }, o.prototype._onRemove = function (t) {
                this._onUpdate(t)
            }, o.prototype._onUpdateGroups = function (t) {
                for (var e = 0; e < t.length; e++) {
                    var i = this.groupsData.get(t[e]);
                    this._updateGroup(i, t[e])
                }
                this.redraw(!0)
            }, o.prototype._onAddGroups = function (t) {
                this._onUpdateGroups(t)
            }, o.prototype._onRemoveGroups = function (t) {
                for (var e = 0; e < t.length; e++)this.groups.hasOwnProperty(t[e]) && ("right" == this.groups[t[e]].options.yAxisOrientation ? (this.yAxisRight.removeGroup(t[e]), this.legendRight.removeGroup(t[e]), this.legendRight.redraw()) : (this.yAxisLeft.removeGroup(t[e]), this.legendLeft.removeGroup(t[e]), this.legendLeft.redraw()), delete this.groups[t[e]]);
                this._updateUngrouped(), this.redraw(!0)
            }, o.prototype._updateGroup = function (t, e) {
                this.groups.hasOwnProperty(e) ? (this.groups[e].update(t), "right" == this.groups[e].options.yAxisOrientation ? (this.yAxisRight.updateGroup(e, this.groups[e]), this.legendRight.updateGroup(e, this.groups[e])) : (this.yAxisLeft.updateGroup(e, this.groups[e]), this.legendLeft.updateGroup(e, this.groups[e]))) : (this.groups[e] = new l(t, e, this.options, this.groupsUsingDefaultStyles), "right" == this.groups[e].options.yAxisOrientation ? (this.yAxisRight.addGroup(e, this.groups[e]), this.legendRight.addGroup(e, this.groups[e])) : (this.yAxisLeft.addGroup(e, this.groups[e]), this.legendLeft.addGroup(e, this.groups[e]))), this.legendLeft.redraw(), this.legendRight.redraw()
            }, o.prototype._updateAllGroupData = function () {
                if (null != this.itemsData) {
                    var t, e = {};
                    for (t in this.groups)this.groups.hasOwnProperty(t) && (e[t] = []);
                    for (var i in this.itemsData._data)if (this.itemsData._data.hasOwnProperty(i)) {
                        var o = this.itemsData._data[i];
                        if (void 0 === e[o.group])throw new Error("Cannot find referenced group " + o.group + ". Possible reason: items added before groups? Groups need to be added before items, as items refer to groups.");
                        o.x = n.convert(o.x, "Date"), e[o.group].push(o)
                    }
                    for (t in this.groups)this.groups.hasOwnProperty(t) && this.groups[t].setItems(e[t])
                }
            }, o.prototype._updateUngrouped = function () {
                if (this.itemsData && null != this.itemsData) {
                    var t = 0;
                    for (var e in this.itemsData._data)if (this.itemsData._data.hasOwnProperty(e)) {
                        var i = this.itemsData._data[e];
                        void 0 != i && (i.hasOwnProperty("group") ? void 0 === i.group && (i.group = p) : i.group = p, t = i.group == p ? t + 1 : t)
                    }
                    if (0 == t) delete this.groups[p], this.legendLeft.removeGroup(p), this.legendRight.removeGroup(p), this.yAxisLeft.removeGroup(p), this.yAxisRight.removeGroup(p); else {
                        var o = {id: p, content: this.options.defaultGroup};
                        this._updateGroup(o, p)
                    }
                } else delete this.groups[p], this.legendLeft.removeGroup(p), this.legendRight.removeGroup(p), this.yAxisLeft.removeGroup(p), this.yAxisRight.removeGroup(p);
                this.legendLeft.redraw(), this.legendRight.redraw()
            }, o.prototype.redraw = function (t) {
                var e = !1;
                this.props.width = this.dom.frame.offsetWidth, this.props.height = this.body.domProps.centerContainer.height - this.body.domProps.border.top - this.body.domProps.border.bottom, void 0 === this.lastWidth && this.props.width && (t = !0), e = this._isResized() || e;
                var i = this.body.range.end - this.body.range.start, o = i != this.lastVisibleInterval;
                if (this.lastVisibleInterval = i, 1 == e && (this.svg.style.width = n.option.asSize(3 * this.props.width), this.svg.style.left = n.option.asSize(-this.props.width), (-1 != (this.options.height + "").indexOf("%") || 1 == this.updateSVGheightOnResize) && (this.updateSVGheight = !0)), 1 == this.updateSVGheight ? (this.options.graphHeight != this.props.height + "px" && (this.options.graphHeight = this.props.height + "px", this.svg.style.height = this.props.height + "px"), this.updateSVGheight = !1) : this.svg.style.height = ("" + this.options.graphHeight).replace("px", "") + "px", 1 == e || 1 == o || 1 == this.abortedGraphUpdate || 1 == t) e = this._updateGraph() || e; else if (0 != this.lastStart) {
                    var s = this.body.range.start - this.lastStart, r = this.body.range.end - this.body.range.start;
                    if (0 != this.props.width) {
                        var a = this.props.width / r, h = s * a;
                        this.svg.style.left = -this.props.width - h + "px"
                    }
                }
                return this.legendLeft.redraw(), this.legendRight.redraw(), e
            }, o.prototype._updateGraph = function () {
                if (s.prepareElements(this.svgElements), 0 != this.props.width && null != this.itemsData) {
                    var t, e, i = {}, o = {}, n = {}, r = !1, a = [];
                    for (var h in this.groups)this.groups.hasOwnProperty(h) && (t = this.groups[h], 1 != t.visible || void 0 !== this.options.groups.visibility[h] && 1 != this.options.groups.visibility[h] || a.push(h));
                    if (a.length > 0) {
                        var d = this.body.util.toGlobalTime(-this.body.domProps.root.width), l = this.body.util.toGlobalTime(2 * this.body.domProps.root.width), u = {};
                        for (this._getRelevantData(a, u, d, l), this._applySampling(a, u), e = 0; e < a.length; e++)i[a[e]] = this._convertXcoordinates(u[a[e]]);
                        this._getYRanges(a, i, n), r = this._updateYAxis(a, n);
                        var p = 5;
                        if (1 == r && this.COUNTER < p)return s.cleanupElements(this.svgElements), this.abortedGraphUpdate = !0, this.COUNTER++, this.body.emitter.emit("change"), !0;
                        for (this.COUNTER > p && console.log("WARNING: there may be an infinite loop in the _updateGraph emitter cycle."), this.COUNTER = 0, this.abortedGraphUpdate = !1, e = 0; e < a.length; e++)t = this.groups[a[e]], o[a[e]] = this._convertYcoordinates(u[a[e]], t);
                        for (e = 0; e < a.length; e++)t = this.groups[a[e]], "bar" != t.options.style && t.draw(o[a[e]], t, this.framework);
                        c.draw(a, o, this.framework)
                    }
                }
                return s.cleanupElements(this.svgElements), !1
            }, o.prototype._getRelevantData = function (t, e, i, o) {
                var s, r, a, h;
                if (t.length > 0)for (r = 0; r < t.length; r++) {
                    s = this.groups[t[r]], e[t[r]] = [];
                    var d = e[t[r]];
                    if (1 == s.options.sort) {
                        var l = Math.max(0, n.binarySearchValue(s.itemsData, i, "x", "before"));
                        for (a = l; a < s.itemsData.length; a++)if (h = s.itemsData[a], void 0 !== h) {
                            if (h.x > o) {
                                d.push(h);
                                break
                            }
                            d.push(h)
                        }
                    } else for (a = 0; a < s.itemsData.length; a++)h = s.itemsData[a], void 0 !== h && h.x > i && h.x < o && d.push(h)
                }
            }, o.prototype._applySampling = function (t, e) {
                var i;
                if (t.length > 0)for (var o = 0; o < t.length; o++)if (i = this.groups[t[o]], 1 == i.options.sampling) {
                    var n = e[t[o]];
                    if (n.length > 0) {
                        var s = 1, r = n.length, a = this.body.util.toGlobalScreen(n[n.length - 1].x) - this.body.util.toGlobalScreen(n[0].x), h = r / a;
                        s = Math.min(Math.ceil(.2 * r), Math.max(1, Math.round(h)));
                        for (var d = [], l = 0; r > l; l += s)d.push(n[l]);
                        e[t[o]] = d
                    }
                }
            }, o.prototype._getYRanges = function (t, e, i) {
                var o, n, s, r, a = [], h = [];
                if (t.length > 0) {
                    for (s = 0; s < t.length; s++)o = e[t[s]], r = this.groups[t[s]].options, o.length > 0 && (n = this.groups[t[s]], r.stack === !0 && "bar" === r.style ? "left" === r.yAxisOrientation ? a = a.concat(n.getData(o)) : h = h.concat(n.getData(o)) : i[t[s]] = n.getYRange(o, t[s]));
                    c.getStackedYRange(a, i, t, "__barStackLeft", "left"), c.getStackedYRange(h, i, t, "__barStackRight", "right")
                }
            }, o.prototype._updateYAxis = function (t, e) {
                var i, o, n = !1, s = !1, r = !1, a = 1e9, h = 1e9, d = -1e9, l = -1e9;
                if (t.length > 0) {
                    for (var u = 0; u < t.length; u++) {
                        var c = this.groups[t[u]];
                        c && "right" != c.options.yAxisOrientation ? (s = !0, a = 1e9, d = -1e9) : c && c.options.yAxisOrientation && (r = !0, h = 1e9, l = -1e9)
                    }
                    for (var u = 0; u < t.length; u++)e.hasOwnProperty(t[u]) && e[t[u]].ignore !== !0 && (i = e[t[u]].min, o = e[t[u]].max, "right" != e[t[u]].yAxisOrientation ? (s = !0, a = a > i ? i : a, d = o > d ? o : d) : (r = !0, h = h > i ? i : h, l = o > l ? o : l));
                    1 == s && this.yAxisLeft.setRange(a, d), 1 == r && this.yAxisRight.setRange(h, l)
                }
                n = this._toggleAxisVisiblity(s, this.yAxisLeft) || n, n = this._toggleAxisVisiblity(r, this.yAxisRight) || n, 1 == r && 1 == s ? (this.yAxisLeft.drawIcons = !0, this.yAxisRight.drawIcons = !0) : (this.yAxisLeft.drawIcons = !1, this.yAxisRight.drawIcons = !1), this.yAxisRight.master = !s, 0 == this.yAxisRight.master ? (1 == r ? this.yAxisLeft.lineOffset = this.yAxisRight.width : this.yAxisLeft.lineOffset = 0, n = this.yAxisLeft.redraw() || n, this.yAxisRight.stepPixels = this.yAxisLeft.stepPixels, this.yAxisRight.zeroCrossing = this.yAxisLeft.zeroCrossing, this.yAxisRight.amountOfSteps = this.yAxisLeft.amountOfSteps, n = this.yAxisRight.redraw() || n) : n = this.yAxisRight.redraw() || n;
                for (var p = ["__barStackLeft", "__barStackRight", "__lineStackLeft", "__lineStackRight"], u = 0; u < p.length; u++)-1 != t.indexOf(p[u]) && t.splice(t.indexOf(p[u]), 1);
                return n
            }, o.prototype._toggleAxisVisiblity = function (t, e) {
                var i = !1;
                return 0 == t ? e.dom.frame.parentNode && 0 == e.hidden && (e.hide(), i = !0) : e.dom.frame.parentNode || 1 != e.hidden || (e.show(), i = !0), i
            }, o.prototype._convertXcoordinates = function (t) {
                for (var e, i, o = [], n = this.body.util.toScreen, s = 0; s < t.length; s++)e = n(t[s].x) + this.props.width, i = t[s].y, o.push({
                    x: e,
                    y: i
                });
                return o
            }, o.prototype._convertYcoordinates = function (t, e) {
                var i, o, n = [], s = this.body.util.toScreen, r = this.yAxisLeft, a = Number(this.svg.style.height.replace("px", ""));
                "right" == e.options.yAxisOrientation && (r = this.yAxisRight);
                for (var h = 0; h < t.length; h++) {
                    var d = t[h].label ? t[h].label : null;
                    i = s(t[h].x) + this.props.width, o = Math.round(r.convertValue(t[h].y)), n.push({
                        x: i,
                        y: o,
                        label: d
                    })
                }
                return e.setZeroPosition(Math.min(a, r.convertValue(0))), n
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i, o) {
                this.id = n.randomUUID(), this.body = t, this.defaultOptions = {
                    orientation: "left",
                    showMinorLabels: !0,
                    showMajorLabels: !0,
                    icons: !0,
                    majorLinesOffset: 7,
                    minorLinesOffset: 4,
                    labelOffsetX: 10,
                    labelOffsetY: 2,
                    iconWidth: 20,
                    width: "40px",
                    visible: !0,
                    alignZeros: !0,
                    left: {
                        range: {min: void 0, max: void 0}, format: function (t) {
                            return t
                        }, title: {text: void 0, style: void 0}
                    },
                    right: {
                        range: {min: void 0, max: void 0}, format: function (t) {
                            return t
                        }, title: {text: void 0, style: void 0}
                    }
                }, this.linegraphOptions = o, this.linegraphSVG = i, this.props = {}, this.DOMelements = {
                    lines: {},
                    labels: {},
                    title: {}
                }, this.dom = {}, this.range = {
                    start: 0,
                    end: 0
                }, this.options = n.extend({}, this.defaultOptions), this.conversionFactor = 1, this.setOptions(e), this.width = Number(("" + this.options.width).replace("px", "")), this.minWidth = this.width, this.height = this.linegraphSVG.offsetHeight, this.hidden = !1, this.stepPixels = 25, this.zeroCrossing = -1, this.amountOfSteps = -1, this.lineOffset = 0, this.master = !0, this.svgElements = {}, this.iconsRemoved = !1, this.groups = {}, this.amountOfGroups = 0, this._create();
                var s = this;
                this.body.emitter.on("verticalDrag", function () {
                    s.dom.lineContainer.style.top = s.body.domProps.scrollTop + "px"
                })
            }

            var n = i(7), s = i(13), r = i(28), a = i(52);
            o.prototype = new r, o.prototype.addGroup = function (t, e) {
                this.groups.hasOwnProperty(t) || (this.groups[t] = e), this.amountOfGroups += 1
            }, o.prototype.updateGroup = function (t, e) {
                this.groups[t] = e
            }, o.prototype.removeGroup = function (t) {
                this.groups.hasOwnProperty(t) && (delete this.groups[t], this.amountOfGroups -= 1)
            }, o.prototype.setOptions = function (t) {
                if (t) {
                    var e = !1;
                    this.options.orientation != t.orientation && void 0 !== t.orientation && (e = !0);
                    var i = ["orientation", "showMinorLabels", "showMajorLabels", "icons", "majorLinesOffset", "minorLinesOffset", "labelOffsetX", "labelOffsetY", "iconWidth", "width", "visible", "left", "right", "alignZeros"];
                    n.selectiveExtend(i, this.options, t), this.minWidth = Number(("" + this.options.width).replace("px", "")), e === !0 && this.dom.frame && (this.hide(), this.show())
                }
            }, o.prototype._create = function () {
                this.dom.frame = document.createElement("div"), this.dom.frame.style.width = this.options.width, this.dom.frame.style.height = this.height, this.dom.lineContainer = document.createElement("div"), this.dom.lineContainer.style.width = "100%", this.dom.lineContainer.style.height = this.height, this.dom.lineContainer.style.position = "relative", this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "absolute", this.svg.style.top = "0px", this.svg.style.height = "100%", this.svg.style.width = "100%", this.svg.style.display = "block", this.dom.frame.appendChild(this.svg)
            }, o.prototype._redrawGroupIcons = function () {
                s.prepareElements(this.svgElements);
                var t, e = this.options.iconWidth, i = 15, o = 4, n = o + .5 * i;
                t = "left" === this.options.orientation ? o : this.width - e - o;
                var r = Object.keys(this.groups);
                r.sort(function (t, e) {
                    return e > t ? -1 : 1
                });
                for (var a = 0; a < r.length; a++) {
                    var h = r[a];
                    this.groups[h].visible !== !0 || void 0 !== this.linegraphOptions.visibility[h] && this.linegraphOptions.visibility[h] !== !0 || (this.groups[h].drawIcon(t, n, this.svgElements, this.svg, e, i), n += i + o)
                }
                s.cleanupElements(this.svgElements), this.iconsRemoved = !1
            }, o.prototype._cleanupIcons = function () {
                this.iconsRemoved === !1 && (s.prepareElements(this.svgElements), s.cleanupElements(this.svgElements), this.iconsRemoved = !0)
            }, o.prototype.show = function () {
                this.hidden = !1, this.dom.frame.parentNode || ("left" === this.options.orientation ? this.body.dom.left.appendChild(this.dom.frame) : this.body.dom.right.appendChild(this.dom.frame)),
                this.dom.lineContainer.parentNode || this.body.dom.backgroundHorizontal.appendChild(this.dom.lineContainer)
            }, o.prototype.hide = function () {
                this.hidden = !0, this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame), this.dom.lineContainer.parentNode && this.dom.lineContainer.parentNode.removeChild(this.dom.lineContainer)
            }, o.prototype.setRange = function (t, e) {
                this.master === !1 && this.options.alignZeros === !0 && -1 != this.zeroCrossing && t > 0 && (t = 0), this.range.start = t, this.range.end = e
            }, o.prototype.redraw = function () {
                var t = !1, e = 0;
                this.dom.lineContainer.style.top = this.body.domProps.scrollTop + "px";
                for (var i in this.groups)this.groups.hasOwnProperty(i) && (this.groups[i].visible !== !0 || void 0 !== this.linegraphOptions.visibility[i] && this.linegraphOptions.visibility[i] !== !0 || e++);
                if (0 === this.amountOfGroups || 0 === e) this.hide(); else {
                    this.show(), this.height = Number(this.linegraphSVG.style.height.replace("px", "")), this.dom.lineContainer.style.height = this.height + "px", this.width = this.options.visible === !0 ? Number(("" + this.options.width).replace("px", "")) : 0;
                    var o = this.props, n = this.dom.frame;
                    n.className = "vis-data-axis", this._calculateCharSize();
                    var s = this.options.orientation, r = this.options.showMinorLabels, a = this.options.showMajorLabels;
                    o.minorLabelHeight = r ? o.minorCharHeight : 0, o.majorLabelHeight = a ? o.majorCharHeight : 0, o.minorLineWidth = this.body.dom.backgroundHorizontal.offsetWidth - this.lineOffset - this.width + 2 * this.options.minorLinesOffset, o.minorLineHeight = 1, o.majorLineWidth = this.body.dom.backgroundHorizontal.offsetWidth - this.lineOffset - this.width + 2 * this.options.majorLinesOffset, o.majorLineHeight = 1, "left" === s ? (n.style.top = "0", n.style.left = "0", n.style.bottom = "", n.style.width = this.width + "px", n.style.height = this.height + "px", this.props.width = this.body.domProps.left.width, this.props.height = this.body.domProps.left.height) : (n.style.top = "", n.style.bottom = "0", n.style.left = "0", n.style.width = this.width + "px", n.style.height = this.height + "px", this.props.width = this.body.domProps.right.width, this.props.height = this.body.domProps.right.height), t = this._redrawLabels(), t = this._isResized() || t, this.options.icons === !0 ? this._redrawGroupIcons() : this._cleanupIcons(), this._redrawTitle(s)
                }
                return t
            }, o.prototype._redrawLabels = function () {
                var t = !1;
                s.prepareElements(this.DOMelements.lines), s.prepareElements(this.DOMelements.labels);
                var e, i = this.options.orientation;
                if (this.master === !1) {
                    var o, n, r, h;
                    -1 !== this.zeroCrossing && this.options.alignZeros === !0 ? this.range.end > 0 ? (o = this.range.end / this.zeroCrossing, n = this.range.end - this.amountOfSteps * o, r = this.range.end) : (o = -1 * this.range.start / (this.amountOfSteps - this.zeroCrossing), n = this.range.start, r = this.range.start + o * this.amountOfSteps) : (n = this.range.start, r = this.range.end), h = this.stepPixels
                } else h = this.props.majorCharHeight, n = this.range.start, r = this.range.end;
                if (this.step = e = new a(n, r, h, this.dom.frame.offsetHeight, this.options[this.options.orientation].range, this.options[this.options.orientation].format, this.master === !1 && this.options.alignZeros), this.master === !0) this.stepPixels = this.dom.frame.offsetHeight / e.marginRange * e.step, this.amountOfSteps = Math.ceil(this.dom.frame.offsetHeight / this.stepPixels); else if (this.options.alignZeros === !0 && -1 !== this.zeroCrossing) {
                    var d = (e.current - this.zeroCrossing * e.step) / e.step;
                    this.step.shift(d)
                }
                this.valueAtBottom = e.marginEnd, this.maxLabelSize = 0;
                for (var l = 0, u = 0, c = !1; u < this.amountOfSteps;)l = Math.round(u * this.stepPixels), c = e.isMajor(), u > 0 && u !== this.amountOfSteps && ((this.options.showMinorLabels && c === !1 || this.master === !1 && this.options.showMinorLabels === !0) && this._redrawLabel(l - 2, e.getCurrent(), i, "vis-y-axis vis-minor", this.props.minorCharHeight), c && this.options.showMajorLabels && this.master === !0 || this.options.showMinorLabels === !1 && this.master === !1 && c === !0 ? (l >= 0 && this._redrawLabel(l - 2, e.getCurrent(), i, "vis-y-axis vis-major", this.props.majorCharHeight), this._redrawLine(l, i, "vis-grid vis-horizontal vis-major", this.options.majorLinesOffset, this.props.majorLineWidth)) : this._redrawLine(l, i, "vis-grid vis-horizontal vis-minor", this.options.minorLinesOffset, this.props.minorLineWidth)), this.master === !0 && 0 === e.current && (this.zeroCrossing = u), e.next(), u += 1;
                this.master === !0 && 0 === e.current && (this.zeroCrossing = u), this.conversionFactor = this.stepPixels / e.step;
                var p = 0;
                void 0 !== this.options[i].title && void 0 !== this.options[i].title.text && (p = this.props.titleCharHeight);
                var f = this.options.icons === !0 ? Math.max(this.options.iconWidth, p) + this.options.labelOffsetX + 15 : p + this.options.labelOffsetX + 15;
                return this.maxLabelSize > this.width - f && this.options.visible === !0 ? (this.width = this.maxLabelSize + f, this.options.width = this.width + "px", s.cleanupElements(this.DOMelements.lines), s.cleanupElements(this.DOMelements.labels), this.redraw(), t = !0) : this.maxLabelSize < this.width - f && this.options.visible === !0 && this.width > this.minWidth ? (this.width = Math.max(this.minWidth, this.maxLabelSize + f), this.options.width = this.width + "px", s.cleanupElements(this.DOMelements.lines), s.cleanupElements(this.DOMelements.labels), this.redraw(), t = !0) : (s.cleanupElements(this.DOMelements.lines), s.cleanupElements(this.DOMelements.labels), t = !1), t
            }, o.prototype.convertValue = function (t) {
                var e = this.valueAtBottom - t, i = e * this.conversionFactor;
                return i
            }, o.prototype.screenToValue = function (t) {
                return this.valueAtBottom - t / this.conversionFactor
            }, o.prototype._redrawLabel = function (t, e, i, o, n) {
                var r = s.getDOMElement("div", this.DOMelements.labels, this.dom.frame);
                r.className = o, r.innerHTML = e, "left" === i ? (r.style.left = "-" + this.options.labelOffsetX + "px", r.style.textAlign = "right") : (r.style.right = "-" + this.options.labelOffsetX + "px", r.style.textAlign = "left"), r.style.top = t - .5 * n + this.options.labelOffsetY + "px", e += "";
                var a = Math.max(this.props.majorCharWidth, this.props.minorCharWidth);
                this.maxLabelSize < e.length * a && (this.maxLabelSize = e.length * a)
            }, o.prototype._redrawLine = function (t, e, i, o, n) {
                if (this.master === !0) {
                    var r = s.getDOMElement("div", this.DOMelements.lines, this.dom.lineContainer);
                    r.className = i, r.innerHTML = "", "left" === e ? r.style.left = this.width - o + "px" : r.style.right = this.width - o + "px", r.style.width = n + "px", r.style.top = t + "px"
                }
            }, o.prototype._redrawTitle = function (t) {
                if (s.prepareElements(this.DOMelements.title), void 0 !== this.options[t].title && void 0 !== this.options[t].title.text) {
                    var e = s.getDOMElement("div", this.DOMelements.title, this.dom.frame);
                    e.className = "vis-y-axis vis-title vis-" + t, e.innerHTML = this.options[t].title.text, void 0 !== this.options[t].title.style && n.addCssText(e, this.options[t].title.style), "left" === t ? e.style.left = this.props.titleCharHeight + "px" : e.style.right = this.props.titleCharHeight + "px", e.style.width = this.height + "px"
                }
                s.cleanupElements(this.DOMelements.title)
            }, o.prototype._calculateCharSize = function () {
                if (!("minorCharHeight" in this.props)) {
                    var t = document.createTextNode("0"), e = document.createElement("div");
                    e.className = "vis-y-axis vis-minor vis-measure", e.appendChild(t), this.dom.frame.appendChild(e), this.props.minorCharHeight = e.clientHeight, this.props.minorCharWidth = e.clientWidth, this.dom.frame.removeChild(e)
                }
                if (!("majorCharHeight" in this.props)) {
                    var i = document.createTextNode("0"), o = document.createElement("div");
                    o.className = "vis-y-axis vis-major vis-measure", o.appendChild(i), this.dom.frame.appendChild(o), this.props.majorCharHeight = o.clientHeight, this.props.majorCharWidth = o.clientWidth, this.dom.frame.removeChild(o)
                }
                if (!("titleCharHeight" in this.props)) {
                    var n = document.createTextNode("0"), s = document.createElement("div");
                    s.className = "vis-y-axis vis-title vis-measure", s.appendChild(n), this.dom.frame.appendChild(s), this.props.titleCharHeight = s.clientHeight, this.props.titleCharWidth = s.clientWidth, this.dom.frame.removeChild(s)
                }
            }, t.exports = o
        },
        function (t, e) {
            function i(t, e, i, o, n, s, r) {
                this.current = 0, this.autoScale = !0, this.stepIndex = 0, this.step = 1, this.scale = 1, this.formattingFunction = s, this.marginStart, this.marginEnd, this.deadSpace = 0, this.majorSteps = [1, 2, 5, 10], this.minorSteps = [.25, .5, 1, 2], this.alignZeros = r, this.setRange(t, e, i, o, n)
            }

            i.prototype.setRange = function (t, e, i, o, n) {
                this._start = void 0 === n.min ? t : n.min, this._end = void 0 === n.max ? e : n.max, this._start === this._end && (this._start = void 0 === n.min ? this._start - .75 : this._start, this._end = void 0 === n.max ? this._end + 1 : this._end), this.autoScale === !0 && this.setMinimumStep(i, o), this.setFirst(n)
            }, i.prototype.setMinimumStep = function (t, e) {
                var i = this._end - this._start, o = 1.2 * i, n = t * (o / e), s = Math.round(Math.log(o) / Math.LN10), r = -1, a = Math.pow(10, s), h = 0;
                0 > s && (h = s);
                for (var d = !1, l = h; Math.abs(l) <= Math.abs(s); l++) {
                    a = Math.pow(10, l);
                    for (var u = 0; u < this.minorSteps.length; u++) {
                        var c = a * this.minorSteps[u];
                        if (c >= n) {
                            d = !0, r = u;
                            break
                        }
                    }
                    if (d === !0)break
                }
                this.stepIndex = r, this.scale = a, this.step = a * this.minorSteps[r]
            }, i.prototype.setFirst = function (t) {
                void 0 === t && (t = {});
                var e = void 0 === t.min ? this._start - 2 * this.scale * this.minorSteps[this.stepIndex] : t.min, i = void 0 === t.max ? this._end + this.scale * this.minorSteps[this.stepIndex] : t.max;
                this.marginEnd = void 0 === t.max ? this.roundToMinor(i) : t.max, this.marginStart = void 0 === t.min ? this.roundToMinor(e) : t.min, this.alignZeros === !0 && (this.marginEnd - this.marginStart) % this.step != 0 && (this.marginEnd += this.marginEnd % this.step), this.deadSpace = this.roundToMinor(i) - i + this.roundToMinor(e) - e, this.marginRange = this.marginEnd - this.marginStart, this.current = this.marginEnd
            }, i.prototype.roundToMinor = function (t) {
                var e = t - t % (this.scale * this.minorSteps[this.stepIndex]);
                return t % (this.scale * this.minorSteps[this.stepIndex]) > .5 * (this.scale * this.minorSteps[this.stepIndex]) ? e + this.scale * this.minorSteps[this.stepIndex] : e
            }, i.prototype.hasNext = function () {
                return this.current >= this.marginStart
            }, i.prototype.next = function () {
                var t = this.current;
                this.current -= this.step, this.current === t && (this.current = this._end)
            }, i.prototype.previous = function () {
                this.current += this.step, this.marginEnd += this.step, this.marginRange = this.marginEnd - this.marginStart
            }, i.prototype.getCurrent = function () {
                var t = Math.abs(this.current) < this.step / 2 ? 0 : this.current, e = t.toPrecision(5);
                return "function" == typeof this.formattingFunction && (e = this.formattingFunction(t)), "number" == typeof e ? "" + e : "string" == typeof e ? e : t.toPrecision(5)
            }, i.prototype.isMajor = function () {
                return this.current % (this.scale * this.majorSteps[this.stepIndex]) === 0
            }, i.prototype.shift = function (t) {
                if (0 > t)for (var e = 0; -t > e; e++)this.previous(); else if (t > 0)for (var e = 0; t > e; e++)this.next()
            }, t.exports = i
        },
        function (t, e, i) {
            function o(t, e, i, o) {
                this.id = e;
                var s = ["sampling", "style", "sort", "yAxisOrientation", "barChart", "drawPoints", "shaded", "interpolation"];
                this.options = n.selectiveBridgeObject(s, i), this.usingDefaultStyle = void 0 === t.className, this.groupsUsingDefaultStyles = o, this.zeroPosition = 0, this.update(t), 1 == this.usingDefaultStyle && (this.groupsUsingDefaultStyles[0] += 1), this.itemsData = [], this.visible = void 0 === t.visible ? !0 : t.visible
            }

            var n = i(7), s = i(13), r = i(54), a = i(56), h = i(55);
            o.prototype.setItems = function (t) {
                if (null != t) {
                    this.itemsData = t, 1 == this.options.sort && this.itemsData.sort(function (t, e) {
                        return t.x - e.x
                    });
                    for (var e = 0; e < this.itemsData.length; e++)this.itemsData[e].y = Number(this.itemsData[e].y)
                } else this.itemsData = []
            }, o.prototype.setZeroPosition = function (t) {
                this.zeroPosition = t
            }, o.prototype.setOptions = function (t) {
                if (void 0 !== t) {
                    var e = ["sampling", "style", "sort", "yAxisOrientation", "barChart"];
                    n.selectiveDeepExtend(e, this.options, t), "function" == typeof t.drawPoints && (t.drawPoints = {onRender: t.drawPoints}), n.mergeOptions(this.options, t, "interpolation"), n.mergeOptions(this.options, t, "drawPoints"), n.mergeOptions(this.options, t, "shaded"), t.interpolation && "object" == typeof t.interpolation && t.interpolation.parametrization && ("uniform" == t.interpolation.parametrization ? this.options.interpolation.alpha = 0 : "chordal" == t.interpolation.parametrization ? this.options.interpolation.alpha = 1 : (this.options.interpolation.parametrization = "centripetal", this.options.interpolation.alpha = .5))
                }
                "line" == this.options.style ? this.type = new r(this.id, this.options) : "bar" == this.options.style ? this.type = new a(this.id, this.options) : "points" == this.options.style && (this.type = new h(this.id, this.options))
            }, o.prototype.update = function (t) {
                this.group = t, this.content = t.content || "graph", this.className = t.className || this.className || "vis-graph-group" + this.groupsUsingDefaultStyles[0] % 10, this.visible = void 0 === t.visible ? !0 : t.visible, this.style = t.style, this.setOptions(t.options)
            }, o.prototype.drawIcon = function (t, e, i, o, n, r) {
                var a, h, d = .5 * r, l = s.getSVGElement("rect", i, o);
                if (l.setAttributeNS(null, "x", t), l.setAttributeNS(null, "y", e - d), l.setAttributeNS(null, "width", n), l.setAttributeNS(null, "height", 2 * d), l.setAttributeNS(null, "class", "vis-outline"), "line" == this.options.style) {
                    if (a = s.getSVGElement("path", i, o), a.setAttributeNS(null, "class", this.className), void 0 !== this.style && a.setAttributeNS(null, "style", this.style), a.setAttributeNS(null, "d", "M" + t + "," + e + " L" + (t + n) + "," + e), 1 == this.options.shaded.enabled && (h = s.getSVGElement("path", i, o), "top" == this.options.shaded.orientation ? h.setAttributeNS(null, "d", "M" + t + ", " + (e - d) + "L" + t + "," + e + " L" + (t + n) + "," + e + " L" + (t + n) + "," + (e - d)) : h.setAttributeNS(null, "d", "M" + t + "," + e + " L" + t + "," + (e + d) + " L" + (t + n) + "," + (e + d) + "L" + (t + n) + "," + e), h.setAttributeNS(null, "class", this.className + " vis-icon-fill")), 1 == this.options.drawPoints.enabled) {
                        var u = {
                            style: this.options.drawPoints.style,
                            size: this.options.drawPoints.size,
                            className: this.className
                        };
                        s.drawPoint(t + .5 * n, e, u, i, o)
                    }
                } else {
                    var c = Math.round(.3 * n), p = Math.round(.4 * r), f = Math.round(.75 * r), m = Math.round((n - 2 * c) / 3);
                    s.drawBar(t + .5 * c + m, e + d - p - 1, c, p, this.className + " vis-bar", i, o, this.style), s.drawBar(t + 1.5 * c + m + 2, e + d - f - 1, c, f, this.className + " vis-bar", i, o, this.style)
                }
            }, o.prototype.getLegend = function (t, e) {
                var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                return this.drawIcon(0, .5 * e, [], i, t, e), {
                    icon: i,
                    label: this.content,
                    orientation: this.options.yAxisOrientation
                }
            }, o.prototype.getYRange = function (t) {
                return this.type.getYRange(t)
            }, o.prototype.getData = function (t) {
                return this.type.getData(t)
            }, o.prototype.draw = function (t, e, i) {
                this.type.draw(t, e, i)
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                this.groupId = t, this.options = e
            }

            var n = i(13), s = i(55);
            o.prototype.getData = function (t) {
                for (var e = [], i = 0; i < t.length; i++)e.push({x: t[i].x, y: t[i].y, groupId: this.groupId});
                return e
            }, o.prototype.getYRange = function (t) {
                for (var e = t[0].y, i = t[0].y, o = 0; o < t.length; o++)e = e > t[o].y ? t[o].y : e, i = i < t[o].y ? t[o].y : i;
                return {min: e, max: i, yAxisOrientation: this.options.yAxisOrientation}
            }, o.getStackedYRange = function (t, e, i, n, s) {
                if (t.length > 0) {
                    t.sort(function (t, e) {
                        return t.x === e.x ? t.groupId < e.groupId ? -1 : 1 : t.x - e.x
                    });
                    var r = {};
                    o._getDataIntersections(r, t), e[n] = o._getStackedYRange(r, t), e[n].yAxisOrientation = s, i.push(n)
                }
            }, o._getStackedYRange = function (t, e) {
                for (var i, o = e[0].y, n = e[0].y, s = 0; s < e.length; s++)i = e[s].x, void 0 === t[i] ? (o = o > e[s].y ? e[s].y : o, n = n < e[s].y ? e[s].y : n) : e[s].y < 0 ? t[i].accumulatedNegative += e[s].y : t[i].accumulatedPositive += e[s].y;
                for (var r in t)t.hasOwnProperty(r) && (o = o > t[r].accumulatedNegative ? t[r].accumulatedNegative : o, o = o > t[r].accumulatedPositive ? t[r].accumulatedPositive : o, n = n < t[r].accumulatedNegative ? t[r].accumulatedNegative : n, n = n < t[r].accumulatedPositive ? t[r].accumulatedPositive : n);
                return {min: o, max: n}
            }, o._getDataIntersections = function (t, e) {
                for (var i, o = 0; o < e.length; o++)o + 1 < e.length && (i = Math.abs(e[o + 1].x - e[o].x)), o > 0 && (i = Math.min(i, Math.abs(e[o - 1].x - e[o].x))), 0 === i && (void 0 === t[e[o].x] && (t[e[o].x] = {
                    amount: 0,
                    resolved: 0,
                    accumulatedPositive: 0,
                    accumulatedNegative: 0
                }), t[e[o].x].amount += 1)
            }, o.prototype.draw = function (t, e, i) {
                if (null != t && t.length > 0) {
                    var r, a, h = Number(i.svg.style.height.replace("px", ""));
                    if (r = n.getSVGElement("path", i.svgElements, i.svg), r.setAttributeNS(null, "class", e.className), void 0 !== e.style && r.setAttributeNS(null, "style", e.style), a = 1 == e.options.interpolation.enabled ? o._catmullRom(t, e) : o._linear(t), 1 == e.options.shaded.enabled) {
                        var d, l = n.getSVGElement("path", i.svgElements, i.svg);
                        d = "top" == e.options.shaded.orientation ? "M" + t[0].x + ",0 " + a + "L" + t[t.length - 1].x + ",0" : "M" + t[0].x + "," + h + " " + a + "L" + t[t.length - 1].x + "," + h, l.setAttributeNS(null, "class", e.className + " vis-fill"), void 0 !== e.options.shaded.style && l.setAttributeNS(null, "style", e.options.shaded.style), l.setAttributeNS(null, "d", d)
                    }
                    r.setAttributeNS(null, "d", "M" + a), 1 == e.options.drawPoints.enabled && s.draw(t, e, i)
                }
            }, o._catmullRomUniform = function (t) {
                for (var e, i, o, n, s, r, a = Math.round(t[0].x) + "," + Math.round(t[0].y) + " ", h = 1 / 6, d = t.length, l = 0; d - 1 > l; l++)e = 0 == l ? t[0] : t[l - 1], i = t[l], o = t[l + 1], n = d > l + 2 ? t[l + 2] : o, s = {
                    x: (-e.x + 6 * i.x + o.x) * h,
                    y: (-e.y + 6 * i.y + o.y) * h
                }, r = {
                    x: (i.x + 6 * o.x - n.x) * h,
                    y: (i.y + 6 * o.y - n.y) * h
                }, a += "C" + s.x + "," + s.y + " " + r.x + "," + r.y + " " + o.x + "," + o.y + " ";
                return a
            }, o._catmullRom = function (t, e) {
                var i = e.options.interpolation.alpha;
                if (0 == i || void 0 === i)return this._catmullRomUniform(t);
                for (var o, n, s, r, a, h, d, l, u, c, p, f, m, v, g, y, b, w, _, x = Math.round(t[0].x) + "," + Math.round(t[0].y) + " ", k = t.length, O = 0; k - 1 > O; O++)o = 0 == O ? t[0] : t[O - 1], n = t[O], s = t[O + 1], r = k > O + 2 ? t[O + 2] : s, d = Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2)), l = Math.sqrt(Math.pow(n.x - s.x, 2) + Math.pow(n.y - s.y, 2)), u = Math.sqrt(Math.pow(s.x - r.x, 2) + Math.pow(s.y - r.y, 2)), v = Math.pow(u, i), y = Math.pow(u, 2 * i), g = Math.pow(l, i), b = Math.pow(l, 2 * i), _ = Math.pow(d, i), w = Math.pow(d, 2 * i), c = 2 * w + 3 * _ * g + b, p = 2 * y + 3 * v * g + b, f = 3 * _ * (_ + g), f > 0 && (f = 1 / f), m = 3 * v * (v + g), m > 0 && (m = 1 / m), a = {
                    x: (-b * o.x + c * n.x + w * s.x) * f,
                    y: (-b * o.y + c * n.y + w * s.y) * f
                }, h = {
                    x: (y * n.x + p * s.x - b * r.x) * m,
                    y: (y * n.y + p * s.y - b * r.y) * m
                }, 0 == a.x && 0 == a.y && (a = n), 0 == h.x && 0 == h.y && (h = s), x += "C" + a.x + "," + a.y + " " + h.x + "," + h.y + " " + s.x + "," + s.y + " ";
                return x
            }, o._linear = function (t) {
                for (var e = "", i = 0; i < t.length; i++)e += 0 == i ? t[i].x + "," + t[i].y : " " + t[i].x + "," + t[i].y;
                return e
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                this.groupId = t, this.options = e
            }

            var n = i(13);
            o.prototype.getYRange = function (t) {
                for (var e = t[0].y, i = t[0].y, o = 0; o < t.length; o++)e = e > t[o].y ? t[o].y : e, i = i < t[o].y ? t[o].y : i;
                return {min: e, max: i, yAxisOrientation: this.options.yAxisOrientation}
            }, o.prototype.draw = function (t, e, i, n) {
                o.draw(t, e, i, n)
            }, o.draw = function (t, e, i, o) {
                function s(t) {
                    return t = "undefined" == typeof t ? {} : t, {
                        style: t.style || e.options.drawPoints.style,
                        size: t.size || e.options.drawPoints.size,
                        className: t.className || e.className
                    }
                }

                function r() {
                    var t = void 0;
                    return i.options.drawPoints.onRender && "function" == typeof i.options.drawPoints.onRender && (t = i.options.drawPoints.onRender), e.group.options && e.group.options.drawPoints && e.group.options.drawPoints.onRender && "function" == typeof e.group.options.drawPoints.onRender && (t = e.group.options.drawPoints.onRender), t
                }

                o = o || 0;
                for (var a = r(), h = 0; h < t.length; h++)if (a) {
                    var d = a(t[h], e, i);
                    (d === !0 || "object" == typeof d) && n.drawPoint(t[h].x + o, t[h].y, s(d), i.svgElements, i.svg, t[h].label)
                } else n.drawPoint(t[h].x + o, t[h].y, s(), i.svgElements, i.svg, t[h].label)
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e) {
                this.groupId = t, this.options = e
            }

            var n = i(13), s = i(55);
            o.prototype.getYRange = function (t) {
                for (var e = t[0].y, i = t[0].y, o = 0; o < t.length; o++)e = e > t[o].y ? t[o].y : e, i = i < t[o].y ? t[o].y : i;
                return {min: e, max: i, yAxisOrientation: this.options.yAxisOrientation}
            }, o.prototype.getData = function (t) {
                for (var e = [], i = 0; i < t.length; i++)e.push({x: t[i].x, y: t[i].y, groupId: this.groupId});
                return e
            }, o.draw = function (t, e, i) {
                var r, a, h, d, l, u, c = [], p = {}, f = 0;
                for (l = 0; l < t.length; l++)if (d = i.groups[t[l]], "bar" === d.options.style && d.visible === !0 && (void 0 === i.options.groups.visibility[t[l]] || i.options.groups.visibility[t[l]] === !0))for (u = 0; u < e[t[l]].length; u++)c.push({
                    x: e[t[l]][u].x,
                    y: e[t[l]][u].y,
                    groupId: t[l],
                    label: e[t[l]][u].label
                }), f += 1;
                if (0 !== f)for (c.sort(function (t, e) {
                    return t.x === e.x ? t.groupId < e.groupId ? -1 : 1 : t.x - e.x
                }), o._getDataIntersections(p, c), l = 0; l < c.length; l++) {
                    d = i.groups[c[l].groupId];
                    var m = .1 * d.options.barChart.width;
                    a = c[l].x;
                    var v = 0;
                    if (void 0 === p[a]) l + 1 < c.length && (r = Math.abs(c[l + 1].x - a)), l > 0 && (r = Math.min(r, Math.abs(c[l - 1].x - a))), h = o._getSafeDrawData(r, d, m); else {
                        var g = l + (p[a].amount - p[a].resolved), y = l - (p[a].resolved + 1);
                        g < c.length && (r = Math.abs(c[g].x - a)), y > 0 && (r = Math.min(r, Math.abs(c[y].x - a))), h = o._getSafeDrawData(r, d, m), p[a].resolved += 1, d.options.stack === !0 ? c[l].y < d.zeroPosition ? (v = p[a].accumulatedNegative, p[a].accumulatedNegative += d.zeroPosition - c[l].y) : (v = p[a].accumulatedPositive, p[a].accumulatedPositive += d.zeroPosition - c[l].y) : d.options.barChart.sideBySide === !0 && (h.width = h.width / p[a].amount, h.offset += p[a].resolved * h.width - .5 * h.width * (p[a].amount + 1), "left" === d.options.barChart.align ? h.offset -= .5 * h.width : "right" === d.options.barChart.align && (h.offset += .5 * h.width))
                    }
                    n.drawBar(c[l].x + h.offset, c[l].y - v, h.width, d.zeroPosition - c[l].y, d.className + " vis-bar", i.svgElements, i.svg, d.style), d.options.drawPoints.enabled === !0 && s.draw([c[l]], d, i, h.offset)
                }
            }, o._getDataIntersections = function (t, e) {
                for (var i, o = 0; o < e.length; o++)o + 1 < e.length && (i = Math.abs(e[o + 1].x - e[o].x)), o > 0 && (i = Math.min(i, Math.abs(e[o - 1].x - e[o].x))), 0 === i && (void 0 === t[e[o].x] && (t[e[o].x] = {
                    amount: 0,
                    resolved: 0,
                    accumulatedPositive: 0,
                    accumulatedNegative: 0
                }), t[e[o].x].amount += 1)
            }, o._getSafeDrawData = function (t, e, i) {
                var o, n;
                return t < e.options.barChart.width && t > 0 ? (o = i > t ? i : t, n = 0, "left" === e.options.barChart.align ? n -= .5 * t : "right" === e.options.barChart.align && (n += .5 * t)) : (o = e.options.barChart.width, n = 0, "left" === e.options.barChart.align ? n -= .5 * e.options.barChart.width : "right" === e.options.barChart.align && (n += .5 * e.options.barChart.width)), {
                    width: o,
                    offset: n
                }
            }, o.getStackedYRange = function (t, e, i, n, s) {
                if (t.length > 0) {
                    t.sort(function (t, e) {
                        return t.x === e.x ? t.groupId < e.groupId ? -1 : 1 : t.x - e.x
                    });
                    var r = {};
                    o._getDataIntersections(r, t), e[n] = o._getStackedYRange(r, t), e[n].yAxisOrientation = s, i.push(n)
                }
            }, o._getStackedYRange = function (t, e) {
                for (var i, o = e[0].y, n = e[0].y, s = 0; s < e.length; s++)i = e[s].x, void 0 === t[i] ? (o = o > e[s].y ? e[s].y : o, n = n < e[s].y ? e[s].y : n) : e[s].y < 0 ? t[i].accumulatedNegative += e[s].y : t[i].accumulatedPositive += e[s].y;
                for (var r in t)t.hasOwnProperty(r) && (o = o > t[r].accumulatedNegative ? t[r].accumulatedNegative : o, o = o > t[r].accumulatedPositive ? t[r].accumulatedPositive : o, n = n < t[r].accumulatedNegative ? t[r].accumulatedNegative : n, n = n < t[r].accumulatedPositive ? t[r].accumulatedPositive : n);
                return {min: o, max: n}
            }, t.exports = o
        },
        function (t, e, i) {
            function o(t, e, i, o) {
                this.body = t, this.defaultOptions = {
                    enabled: !0,
                    icons: !0,
                    iconSize: 20,
                    iconSpacing: 6,
                    left: {visible: !0, position: "top-left"},
                    right: {visible: !0, position: "top-left"}
                }, this.side = i, this.options = n.extend({}, this.defaultOptions), this.linegraphOptions = o, this.svgElements = {}, this.dom = {}, this.groups = {}, this.amountOfGroups = 0, this._create(), this.setOptions(e)
            }

            var n = i(7), s = i(13), r = i(28);
            o.prototype = new r, o.prototype.clear = function () {
                this.groups = {}, this.amountOfGroups = 0
            }, o.prototype.addGroup = function (t, e) {
                this.groups.hasOwnProperty(t) || (this.groups[t] = e), this.amountOfGroups += 1
            }, o.prototype.updateGroup = function (t, e) {
                this.groups[t] = e
            }, o.prototype.removeGroup = function (t) {
                this.groups.hasOwnProperty(t) && (delete this.groups[t], this.amountOfGroups -= 1)
            }, o.prototype._create = function () {
                this.dom.frame = document.createElement("div"), this.dom.frame.className = "vis-legend", this.dom.frame.style.position = "absolute", this.dom.frame.style.top = "10px", this.dom.frame.style.display = "block", this.dom.textArea = document.createElement("div"), this.dom.textArea.className = "vis-legend-text", this.dom.textArea.style.position = "relative", this.dom.textArea.style.top = "0px", this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.style.position = "absolute", this.svg.style.top = "0px", this.svg.style.width = this.options.iconSize + 5 + "px", this.svg.style.height = "100%", this.dom.frame.appendChild(this.svg), this.dom.frame.appendChild(this.dom.textArea)
            }, o.prototype.hide = function () {
                this.dom.frame.parentNode && this.dom.frame.parentNode.removeChild(this.dom.frame)
            }, o.prototype.show = function () {
                this.dom.frame.parentNode || this.body.dom.center.appendChild(this.dom.frame)
            }, o.prototype.setOptions = function (t) {
                var e = ["enabled", "orientation", "icons", "left", "right"];
                n.selectiveDeepExtend(e, this.options, t)
            }, o.prototype.redraw = function () {
                var t = 0, e = Object.keys(this.groups);
                e.sort(function (t, e) {
                    return e > t ? -1 : 1
                });
                for (var i = 0; i < e.length; i++) {
                    var o = e[i];
                    1 != this.groups[o].visible || void 0 !== this.linegraphOptions.visibility[o] && 1 != this.linegraphOptions.visibility[o] || t++
                }
                if (0 == this.options[this.side].visible || 0 == this.amountOfGroups || 0 == this.options.enabled || 0 == t) this.hide(); else {
                    if (this.show(), "top-left" == this.options[this.side].position || "bottom-left" == this.options[this.side].position ? (this.dom.frame.style.left = "4px", this.dom.frame.style.textAlign = "left", this.dom.textArea.style.textAlign = "left", this.dom.textArea.style.left = this.options.iconSize + 15 + "px", this.dom.textArea.style.right = "", this.svg.style.left = "0px", this.svg.style.right = "") : (this.dom.frame.style.right = "4px", this.dom.frame.style.textAlign = "right", this.dom.textArea.style.textAlign = "right", this.dom.textArea.style.right = this.options.iconSize + 15 + "px", this.dom.textArea.style.left = "", this.svg.style.right = "0px", this.svg.style.left = ""), "top-left" == this.options[this.side].position || "top-right" == this.options[this.side].position) this.dom.frame.style.top = 4 - Number(this.body.dom.center.style.top.replace("px", "")) + "px", this.dom.frame.style.bottom = ""; else {
                        var n = this.body.domProps.center.height - this.body.domProps.centerContainer.height;
                        this.dom.frame.style.bottom = 4 + n + Number(this.body.dom.center.style.top.replace("px", "")) + "px", this.dom.frame.style.top = ""
                    }
                    0 == this.options.icons ? (this.dom.frame.style.width = this.dom.textArea.offsetWidth + 10 + "px", this.dom.textArea.style.right = "", this.dom.textArea.style.left = "", this.svg.style.width = "0px") : (this.dom.frame.style.width = this.options.iconSize + 15 + this.dom.textArea.offsetWidth + 10 + "px", this.drawLegendIcons());
                    for (var s = "", i = 0; i < e.length; i++) {
                        var o = e[i];
                        1 != this.groups[o].visible || void 0 !== this.linegraphOptions.visibility[o] && 1 != this.linegraphOptions.visibility[o] || (s += this.groups[o].content + "<br />")
                    }
                    this.dom.textArea.innerHTML = s, this.dom.textArea.style.lineHeight = .75 * this.options.iconSize + this.options.iconSpacing + "px"
                }
            }, o.prototype.drawLegendIcons = function () {
                if (this.dom.frame.parentNode) {
                    var t = Object.keys(this.groups);
                    t.sort(function (t, e) {
                        return e > t ? -1 : 1
                    }), s.prepareElements(this.svgElements);
                    var e = window.getComputedStyle(this.dom.frame).paddingTop, i = Number(e.replace("px", "")), o = i, n = this.options.iconSize, r = .75 * this.options.iconSize, a = i + .5 * r + 3;
                    this.svg.style.width = n + 5 + i + "px";
                    for (var h = 0; h < t.length; h++) {
                        var d = t[h];
                        1 != this.groups[d].visible || void 0 !== this.linegraphOptions.visibility[d] && 1 != this.linegraphOptions.visibility[d] || (this.groups[d].drawIcon(o, a, this.svgElements, this.svg, n, r), a += r + this.options.iconSpacing)
                    }
                    s.cleanupElements(this.svgElements)
                }
            }, t.exports = o
        },
        function (t, e) {
            Object.defineProperty(e, "__esModule", {value: !0});
            var i = "string", o = "boolean", n = "number", s = "array", r = "date", a = "object", h = "dom", d = "moment", l = "any", u = {
                configure: {
                    enabled: {"boolean": o},
                    filter: {"boolean": o, "function": "function"},
                    container: {dom: h},
                    __type__: {object: a, "boolean": o, "function": "function"}
                },
                yAxisOrientation: {string: ["left", "right"]},
                defaultGroup: {string: i},
                sort: {"boolean": o},
                sampling: {"boolean": o},
                stack: {"boolean": o},
                graphHeight: {string: i, number: n},
                shaded: {
                    enabled: {"boolean": o},
                    orientation: {string: ["bottom", "top"]},
                    __type__: {"boolean": o, object: a}
                },
                style: {string: ["line", "bar", "points"]},
                barChart: {
                    width: {number: n},
                    sideBySide: {"boolean": o},
                    align: {string: ["left", "center", "right"]},
                    __type__: {object: a}
                },
                interpolation: {
                    enabled: {"boolean": o},
                    parametrization: {string: ["centripetal", "chordal", "uniform"]},
                    alpha: {number: n},
                    __type__: {object: a, "boolean": o}
                },
                drawPoints: {
                    enabled: {"boolean": o},
                    onRender: {"function": "function"},
                    size: {number: n},
                    style: {string: ["square", "circle"]},
                    __type__: {object: a, "boolean": o, "function": "function"}
                },
                dataAxis: {
                    showMinorLabels: {"boolean": o},
                    showMajorLabels: {"boolean": o},
                    icons: {"boolean": o},
                    width: {string: i, number: n},
                    visible: {"boolean": o},
                    alignZeros: {"boolean": o},
                    left: {
                        range: {min: {number: n}, max: {number: n}, __type__: {object: a}},
                        format: {"function": "function"},
                        title: {text: {string: i, number: n}, style: {string: i}, __type__: {object: a}},
                        __type__: {object: a}
                    },
                    right: {
                        range: {min: {number: n}, max: {number: n}, __type__: {object: a}},
                        format: {"function": "function"},
                        title: {text: {string: i, number: n}, style: {string: i}, __type__: {object: a}},
                        __type__: {object: a}
                    },
                    __type__: {object: a}
                },
                legend: {
                    enabled: {"boolean": o},
                    icons: {"boolean": o},
                    left: {
                        visible: {"boolean": o},
                        position: {string: ["top-right", "bottom-right", "top-left", "bottom-left"]},
                        __type__: {object: a}
                    },
                    right: {
                        visible: {"boolean": o},
                        position: {string: ["top-right", "bottom-right", "top-left", "bottom-left"]},
                        __type__: {object: a}
                    },
                    __type__: {object: a, "boolean": o}
                },
                groups: {visibility: {any: l}, __type__: {object: a}},
                autoResize: {"boolean": o},
                clickToUse: {"boolean": o},
                end: {number: n, date: r, string: i, moment: d},
                format: {
                    minorLabels: {
                        millisecond: {string: i, undefined: "undefined"},
                        second: {string: i, undefined: "undefined"},
                        minute: {string: i, undefined: "undefined"},
                        hour: {string: i, undefined: "undefined"},
                        weekday: {string: i, undefined: "undefined"},
                        day: {string: i, undefined: "undefined"},
                        month: {string: i, undefined: "undefined"},
                        year: {string: i, undefined: "undefined"},
                        __type__: {object: a}
                    },
                    majorLabels: {
                        millisecond: {string: i, undefined: "undefined"},
                        second: {string: i, undefined: "undefined"},
                        minute: {string: i, undefined: "undefined"},
                        hour: {string: i, undefined: "undefined"},
                        weekday: {string: i, undefined: "undefined"},
                        day: {string: i, undefined: "undefined"},
                        month: {string: i, undefined: "undefined"},
                        year: {string: i, undefined: "undefined"},
                        __type__: {object: a}
                    },
                    __type__: {object: a}
                },
                moment: {"function": "function"},
                height: {string: i, number: n},
                hiddenDates: {object: a, array: s},
                locale: {string: i},
                locales: {__any__: {any: l}, __type__: {object: a}},
                max: {date: r, number: n, string: i, moment: d},
                maxHeight: {number: n, string: i},
                min: {date: r, number: n, string: i, moment: d},
                minHeight: {number: n, string: i},
                moveable: {"boolean": o},
                multiselect: {"boolean": o},
                orientation: {string: i},
                showCurrentTime: {"boolean": o},
                showMajorLabels: {"boolean": o},
                showMinorLabels: {"boolean": o},
                start: {date: r, number: n, string: i, moment: d},
                timeAxis: {
                    scale: {string: i, undefined: "undefined"},
                    step: {number: n, undefined: "undefined"},
                    __type__: {object: a}
                },
                width: {string: i, number: n},
                zoomable: {"boolean": o},
                zoomKey: {string: ["ctrlKey", "altKey", "metaKey", ""]},
                zoomMax: {number: n},
                zoomMin: {number: n},
                __type__: {object: a}
            }, c = {
                global: {
                    sort: !0,
                    sampling: !0,
                    stack: !1,
                    shaded: {enabled: !1, orientation: ["top", "bottom"]},
                    style: ["line", "bar", "points"],
                    barChart: {width: [50, 5, 100, 5], sideBySide: !1, align: ["left", "center", "right"]},
                    interpolation: {enabled: !0, parametrization: ["centripetal", "chordal", "uniform"]},
                    drawPoints: {enabled: !0, size: [6, 2, 30, 1], style: ["square", "circle"]},
                    dataAxis: {
                        showMinorLabels: !0,
                        showMajorLabels: !0,
                        icons: !1,
                        width: [40, 0, 200, 1],
                        visible: !0,
                        alignZeros: !0,
                        left: {title: {text: "", style: ""}},
                        right: {title: {text: "", style: ""}}
                    },
                    legend: {
                        enabled: !1,
                        icons: !0,
                        left: {visible: !0, position: ["top-right", "bottom-right", "top-left", "bottom-left"]},
                        right: {visible: !0, position: ["top-right", "bottom-right", "top-left", "bottom-left"]}
                    },
                    autoResize: !0,
                    clickToUse: !1,
                    end: "",
                    format: {
                        minorLabels: {
                            millisecond: "SSS",
                            second: "s",
                            minute: "HH:mm",
                            hour: "HH:mm",
                            weekday: "ddd D",
                            day: "D",
                            month: "MMM",
                            year: "YYYY"
                        },
                        majorLabels: {
                            millisecond: "HH:mm:ss",
                            second: "D MMMM HH:mm",
                            minute: "ddd D MMMM",
                            hour: "ddd D MMMM",
                            weekday: "MMMM YYYY",
                            day: "MMMM YYYY",
                            month: "YYYY",
                            year: ""
                        }
                    },
                    height: "",
                    locale: "",
                    max: "",
                    maxHeight: "",
                    min: "",
                    minHeight: "",
                    moveable: !0,
                    orientation: ["both", "bottom", "top"],
                    showCurrentTime: !1,
                    showMajorLabels: !0,
                    showMinorLabels: !0,
                    start: "",
                    width: "100%",
                    zoomable: !0,
                    zoomKey: ["ctrlKey", "altKey", "metaKey", ""],
                    zoomMax: [31536e10, 10, 31536e10, 1],
                    zoomMin: [10, 10, 31536e10, 1]
                }
            };
            e.allOptions = u, e.configureOptions = c
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e, i) {
                var o = this;
                if (!(this instanceof n))throw new SyntaxError("Constructor must be called with the new operator");
                this.options = {}, this.defaultOptions = {
                    locale: "en",
                    locales: j,
                    clickToUse: !1
                }, A.extend(this.options, this.defaultOptions), this.body = {
                    container: t,
                    nodes: {},
                    nodeIndices: [],
                    edges: {},
                    edgeIndices: [],
                    emitter: {
                        on: this.on.bind(this),
                        off: this.off.bind(this),
                        emit: this.emit.bind(this),
                        once: this.once.bind(this)
                    },
                    eventListeners: {
                        onTap: function () {
                        }, onTouch: function () {
                        }, onDoubleTap: function () {
                        }, onHold: function () {
                        }, onDragStart: function () {
                        }, onDrag: function () {
                        }, onDragEnd: function () {
                        }, onMouseWheel: function () {
                        }, onPinch: function () {
                        }, onMouseMove: function () {
                        }, onRelease: function () {
                        }, onContext: function () {
                        }
                    },
                    data: {nodes: null, edges: null},
                    functions: {
                        createNode: function () {
                        }, createEdge: function () {
                        }, getPointer: function () {
                        }
                    },
                    view: {scale: 1, translation: {x: 0, y: 0}}
                }, this.bindEventListeners(),
                    this.images = new R(function () {
                        return o.body.emitter.emit("_requestRedraw")
                    }), this.groups = new r["default"], this.canvas = new y["default"](this.body), this.selectionHandler = new O["default"](this.body, this.canvas), this.interactionHandler = new x["default"](this.body, this.canvas, this.selectionHandler), this.view = new w["default"](this.body, this.canvas), this.renderer = new v["default"](this.body, this.canvas), this.physics = new c["default"](this.body), this.layoutEngine = new D["default"](this.body), this.clustering = new f["default"](this.body), this.manipulation = new T["default"](this.body, this.canvas, this.selectionHandler), this.nodesHandler = new h["default"](this.body, this.images, this.groups, this.layoutEngine), this.edgesHandler = new l["default"](this.body, this.images, this.groups), this.canvas._create(), this.setOptions(i), this.setData(e)
            }

            var s = i(60), r = o(s), a = i(61), h = o(a), d = i(81), l = o(d), u = i(90), c = o(u), p = i(99), f = o(p), m = i(101), v = o(m), g = i(102), y = o(g), b = i(103), w = o(b), _ = i(104), x = o(_), k = i(107), O = o(k), M = i(108), D = o(M), C = i(109), T = o(C), S = i(45), E = o(S), P = i(47), I = o(P), z = i(110);
            i(111);
            var N = i(19), A = (i(3), i(7)), L = (i(14), i(16), i(112)), B = i(113), R = i(114), F = i(40), j = i(115);
            N(n.prototype), n.prototype.setOptions = function (t) {
                var e = this;
                if (void 0 !== t) {
                    var i = I["default"].validate(t, z.allOptions);
                    i === !0 && console.log("%cErrors have been found in the supplied options object.", P.printStyle);
                    var o = ["locale", "locales", "clickToUse"];
                    if (A.selectiveDeepExtend(o, this.options, t), t = this.layoutEngine.setOptions(t.layout, t), this.canvas.setOptions(t), this.groups.setOptions(t.groups), this.nodesHandler.setOptions(t.nodes), this.edgesHandler.setOptions(t.edges), this.physics.setOptions(t.physics), this.manipulation.setOptions(t.manipulation, t, this.options), this.interactionHandler.setOptions(t.interaction), this.renderer.setOptions(t.interaction), this.selectionHandler.setOptions(t.interaction), void 0 !== t.groups && this.body.emitter.emit("refreshNodes"), "configure" in t && (this.configurator || (this.configurator = new E["default"](this, this.body.container, z.configureOptions, this.canvas.pixelRatio)), this.configurator.setOptions(t.configure)), this.configurator && this.configurator.options.enabled === !0) {
                        var n = {
                            nodes: {},
                            edges: {},
                            layout: {},
                            interaction: {},
                            manipulation: {},
                            physics: {},
                            global: {}
                        };
                        A.deepExtend(n.nodes, this.nodesHandler.options), A.deepExtend(n.edges, this.edgesHandler.options), A.deepExtend(n.layout, this.layoutEngine.options), A.deepExtend(n.interaction, this.selectionHandler.options), A.deepExtend(n.interaction, this.renderer.options), A.deepExtend(n.interaction, this.interactionHandler.options), A.deepExtend(n.manipulation, this.manipulation.options), A.deepExtend(n.physics, this.physics.options), A.deepExtend(n.global, this.canvas.options), A.deepExtend(n.global, this.options), this.configurator.setModuleOptions(n)
                    }
                    void 0 !== t.clickToUse ? t.clickToUse === !0 ? void 0 === this.activator && (this.activator = new F(this.canvas.frame), this.activator.on("change", function () {
                                e.body.emitter.emit("activate")
                            })) : (void 0 !== this.activator && (this.activator.destroy(), delete this.activator), this.body.emitter.emit("activate")) : this.body.emitter.emit("activate"), this.canvas.setSize(), this.body.emitter.emit("startSimulation")
                }
            }, n.prototype._updateVisibleIndices = function () {
                var t = this.body.nodes, e = this.body.edges;
                this.body.nodeIndices = [], this.body.edgeIndices = [];
                for (var i in t)t.hasOwnProperty(i) && t[i].options.hidden === !1 && this.body.nodeIndices.push(i);
                for (var o in e)e.hasOwnProperty(o) && e[o].options.hidden === !1 && this.body.edgeIndices.push(o)
            }, n.prototype.bindEventListeners = function () {
                var t = this;
                this.body.emitter.on("_dataChanged", function () {
                    t._updateVisibleIndices(), t.physics.updatePhysicsData(), t.body.emitter.emit("_requestRedraw"), t.body.emitter.emit("_dataUpdated")
                }), this.body.emitter.on("_dataUpdated", function () {
                    t._updateValueRange(t.body.nodes), t._updateValueRange(t.body.edges), t.body.emitter.emit("startSimulation"), t.body.emitter.emit("_requestRedraw")
                })
            }, n.prototype.setData = function (t) {
                if (this.body.emitter.emit("resetPhysics"), this.body.emitter.emit("_resetData"), this.selectionHandler.unselectAll(), t && t.dot && (t.nodes || t.edges))throw new SyntaxError('Data must contain either parameter "dot" or  parameter pair "nodes" and "edges", but not both.');
                if (this.setOptions(t && t.options), t && t.dot) {
                    console.log("The dot property has been depricated. Please use the static convertDot method to convert DOT into vis.network format and use the normal data format with nodes and edges. This converter is used like this: var data = vis.network.convertDot(dotString);");
                    var e = L.DOTToGraph(t.dot);
                    return void this.setData(e)
                }
                if (t && t.gephi) {
                    console.log("The gephi property has been depricated. Please use the static convertGephi method to convert gephi into vis.network format and use the normal data format with nodes and edges. This converter is used like this: var data = vis.network.convertGephi(gephiJson);");
                    var i = B.parseGephi(t.gephi);
                    return void this.setData(i)
                }
                this.nodesHandler.setData(t && t.nodes, !0), this.edgesHandler.setData(t && t.edges, !0), this.body.emitter.emit("_dataChanged"), this.body.emitter.emit("initPhysics")
            }, n.prototype.destroy = function () {
                this.body.emitter.emit("destroy"), this.body.emitter.off(), this.off(), delete this.groups, delete this.canvas, delete this.selectionHandler, delete this.interactionHandler, delete this.view, delete this.renderer, delete this.physics, delete this.layoutEngine, delete this.clustering, delete this.manipulation, delete this.nodesHandler, delete this.edgesHandler, delete this.configurator, delete this.images;
                for (var t in this.body.nodes)delete this.body.nodes[t];
                for (var e in this.body.edges)delete this.body.edges[e];
                A.recursiveDOMDelete(this.body.container)
            }, n.prototype._updateValueRange = function (t) {
                var e, i = void 0, o = void 0, n = 0;
                for (e in t)if (t.hasOwnProperty(e)) {
                    var s = t[e].getValue();
                    void 0 !== s && (i = void 0 === i ? s : Math.min(s, i), o = void 0 === o ? s : Math.max(s, o), n += s)
                }
                if (void 0 !== i && void 0 !== o)for (e in t)t.hasOwnProperty(e) && t[e].setValueRange(i, o, n)
            }, n.prototype.isActive = function () {
                return !this.activator || this.activator.active
            }, n.prototype.setSize = function () {
                return this.canvas.setSize.apply(this.canvas, arguments)
            }, n.prototype.canvasToDOM = function () {
                return this.canvas.canvasToDOM.apply(this.canvas, arguments)
            }, n.prototype.DOMtoCanvas = function () {
                return this.canvas.DOMtoCanvas.apply(this.canvas, arguments)
            }, n.prototype.findNode = function () {
                return this.clustering.findNode.apply(this.clustering, arguments)
            }, n.prototype.isCluster = function () {
                return this.clustering.isCluster.apply(this.clustering, arguments)
            }, n.prototype.openCluster = function () {
                return this.clustering.openCluster.apply(this.clustering, arguments)
            }, n.prototype.cluster = function () {
                return this.clustering.cluster.apply(this.clustering, arguments)
            }, n.prototype.getNodesInCluster = function () {
                return this.clustering.getNodesInCluster.apply(this.clustering, arguments)
            }, n.prototype.clusterByConnection = function () {
                return this.clustering.clusterByConnection.apply(this.clustering, arguments)
            }, n.prototype.clusterByHubsize = function () {
                return this.clustering.clusterByHubsize.apply(this.clustering, arguments)
            }, n.prototype.clusterOutliers = function () {
                return this.clustering.clusterOutliers.apply(this.clustering, arguments)
            }, n.prototype.getSeed = function () {
                return this.layoutEngine.getSeed.apply(this.layoutEngine, arguments)
            }, n.prototype.enableEditMode = function () {
                return this.manipulation.enableEditMode.apply(this.manipulation, arguments)
            }, n.prototype.disableEditMode = function () {
                return this.manipulation.disableEditMode.apply(this.manipulation, arguments)
            }, n.prototype.addNodeMode = function () {
                return this.manipulation.addNodeMode.apply(this.manipulation, arguments)
            }, n.prototype.editNode = function () {
                return this.manipulation.editNode.apply(this.manipulation, arguments)
            }, n.prototype.editNodeMode = function () {
                return console.log("Depricated: Please use editNode instead of editNodeMode."), this.manipulation.editNode.apply(this.manipulation, arguments)
            }, n.prototype.addEdgeMode = function () {
                return this.manipulation.addEdgeMode.apply(this.manipulation, arguments)
            }, n.prototype.editEdgeMode = function () {
                return this.manipulation.editEdgeMode.apply(this.manipulation, arguments)
            }, n.prototype.deleteSelected = function () {
                return this.manipulation.deleteSelected.apply(this.manipulation, arguments)
            }, n.prototype.getPositions = function () {
                return this.nodesHandler.getPositions.apply(this.nodesHandler, arguments)
            }, n.prototype.storePositions = function () {
                return this.nodesHandler.storePositions.apply(this.nodesHandler, arguments)
            }, n.prototype.moveNode = function () {
                return this.nodesHandler.moveNode.apply(this.nodesHandler, arguments)
            }, n.prototype.getBoundingBox = function () {
                return this.nodesHandler.getBoundingBox.apply(this.nodesHandler, arguments)
            }, n.prototype.getConnectedNodes = function (t) {
                return void 0 !== this.body.nodes[t] ? this.nodesHandler.getConnectedNodes.apply(this.nodesHandler, arguments) : this.edgesHandler.getConnectedNodes.apply(this.edgesHandler, arguments)
            }, n.prototype.getConnectedEdges = function () {
                return this.nodesHandler.getConnectedEdges.apply(this.nodesHandler, arguments)
            }, n.prototype.startSimulation = function () {
                return this.physics.startSimulation.apply(this.physics, arguments)
            }, n.prototype.stopSimulation = function () {
                return this.physics.stopSimulation.apply(this.physics, arguments)
            }, n.prototype.stabilize = function () {
                return this.physics.stabilize.apply(this.physics, arguments)
            }, n.prototype.getSelection = function () {
                return this.selectionHandler.getSelection.apply(this.selectionHandler, arguments)
            }, n.prototype.getSelectedNodes = function () {
                return this.selectionHandler.getSelectedNodes.apply(this.selectionHandler, arguments)
            }, n.prototype.getSelectedEdges = function () {
                return this.selectionHandler.getSelectedEdges.apply(this.selectionHandler, arguments)
            }, n.prototype.getNodeAt = function () {
                var t = this.selectionHandler.getNodeAt.apply(this.selectionHandler, arguments);
                return void 0 !== t && void 0 !== t.id ? t.id : t
            }, n.prototype.getEdgeAt = function () {
                var t = this.selectionHandler.getEdgeAt.apply(this.selectionHandler, arguments);
                return void 0 !== t && void 0 !== t.id ? t.id : t
            }, n.prototype.selectNodes = function () {
                return this.selectionHandler.selectNodes.apply(this.selectionHandler, arguments)
            }, n.prototype.selectEdges = function () {
                return this.selectionHandler.selectEdges.apply(this.selectionHandler, arguments)
            }, n.prototype.unselectAll = function () {
                return this.selectionHandler.unselectAll.apply(this.selectionHandler, arguments)
            }, n.prototype.redraw = function () {
                return this.renderer.redraw.apply(this.renderer, arguments)
            }, n.prototype.getScale = function () {
                return this.view.getScale.apply(this.view, arguments)
            }, n.prototype.getViewPosition = function () {
                return this.view.getViewPosition.apply(this.view, arguments)
            }, n.prototype.fit = function () {
                return this.view.fit.apply(this.view, arguments)
            }, n.prototype.moveTo = function () {
                return this.view.moveTo.apply(this.view, arguments)
            }, n.prototype.focus = function () {
                return this.view.focus.apply(this.view, arguments)
            }, n.prototype.releaseNode = function () {
                return this.view.releaseNode.apply(this.view, arguments)
            }, n.prototype.getOptionsFromConfigurator = function () {
                var t = {};
                return this.configurator && (t = this.configurator.getOptions.apply(this.configurator)), t
            }, t.exports = n
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(7), r = function () {
                function t() {
                    o(this, t), this.clear(), this.defaultIndex = 0, this.groupsArray = [], this.groupIndex = 0, this.defaultGroups = [
                        {
                            border: "#2B7CE9",
                            background: "#97C2FC",
                            highlight: {border: "#2B7CE9", background: "#D2E5FF"},
                            hover: {border: "#2B7CE9", background: "#D2E5FF"}
                        },
                        {
                            border: "#FFA500",
                            background: "#FFFF00",
                            highlight: {border: "#FFA500", background: "#FFFFA3"},
                            hover: {border: "#FFA500", background: "#FFFFA3"}
                        },
                        {
                            border: "#FA0A10",
                            background: "#FB7E81",
                            highlight: {border: "#FA0A10", background: "#FFAFB1"},
                            hover: {border: "#FA0A10", background: "#FFAFB1"}
                        },
                        {
                            border: "#41A906",
                            background: "#7BE141",
                            highlight: {border: "#41A906", background: "#A1EC76"},
                            hover: {border: "#41A906", background: "#A1EC76"}
                        },
                        {
                            border: "#E129F0",
                            background: "#EB7DF4",
                            highlight: {border: "#E129F0", background: "#F0B3F5"},
                            hover: {border: "#E129F0", background: "#F0B3F5"}
                        },
                        {
                            border: "#7C29F0",
                            background: "#AD85E4",
                            highlight: {border: "#7C29F0", background: "#D3BDF0"},
                            hover: {border: "#7C29F0", background: "#D3BDF0"}
                        },
                        {
                            border: "#C37F00",
                            background: "#FFA807",
                            highlight: {border: "#C37F00", background: "#FFCA66"},
                            hover: {border: "#C37F00", background: "#FFCA66"}
                        },
                        {
                            border: "#4220FB",
                            background: "#6E6EFD",
                            highlight: {border: "#4220FB", background: "#9B9BFD"},
                            hover: {border: "#4220FB", background: "#9B9BFD"}
                        },
                        {
                            border: "#FD5A77",
                            background: "#FFC0CB",
                            highlight: {border: "#FD5A77", background: "#FFD1D9"},
                            hover: {border: "#FD5A77", background: "#FFD1D9"}
                        },
                        {
                            border: "#4AD63A",
                            background: "#C2FABC",
                            highlight: {border: "#4AD63A", background: "#E6FFE3"},
                            hover: {border: "#4AD63A", background: "#E6FFE3"}
                        },
                        {
                            border: "#990000",
                            background: "#EE0000",
                            highlight: {border: "#BB0000", background: "#FF3333"},
                            hover: {border: "#BB0000", background: "#FF3333"}
                        },
                        {
                            border: "#FF6000",
                            background: "#FF6000",
                            highlight: {border: "#FF6000", background: "#FF6000"},
                            hover: {border: "#FF6000", background: "#FF6000"}
                        },
                        {
                            border: "#97C2FC",
                            background: "#2B7CE9",
                            highlight: {border: "#D2E5FF", background: "#2B7CE9"},
                            hover: {border: "#D2E5FF", background: "#2B7CE9"}
                        },
                        {
                            border: "#399605",
                            background: "#255C03",
                            highlight: {border: "#399605", background: "#255C03"},
                            hover: {border: "#399605", background: "#255C03"}
                        },
                        {
                            border: "#B70054",
                            background: "#FF007E",
                            highlight: {border: "#B70054", background: "#FF007E"},
                            hover: {border: "#B70054", background: "#FF007E"}
                        },
                        {
                            border: "#AD85E4",
                            background: "#7C29F0",
                            highlight: {border: "#D3BDF0", background: "#7C29F0"},
                            hover: {border: "#D3BDF0", background: "#7C29F0"}
                        },
                        {
                            border: "#4557FA",
                            background: "#000EA1",
                            highlight: {border: "#6E6EFD", background: "#000EA1"},
                            hover: {border: "#6E6EFD", background: "#000EA1"}
                        },
                        {
                            border: "#FFC0CB",
                            background: "#FD5A77",
                            highlight: {border: "#FFD1D9", background: "#FD5A77"},
                            hover: {border: "#FFD1D9", background: "#FD5A77"}
                        },
                        {
                            border: "#C2FABC",
                            background: "#74D66A",
                            highlight: {border: "#E6FFE3", background: "#74D66A"},
                            hover: {border: "#E6FFE3", background: "#74D66A"}
                        },
                        {
                            border: "#EE0000",
                            background: "#990000",
                            highlight: {border: "#FF3333", background: "#BB0000"},
                            hover: {border: "#FF3333", background: "#BB0000"}
                        }
                    ], this.options = {}, this.defaultOptions = {useDefaultGroups: !0}, s.extend(this.options, this.defaultOptions)
                }

                return n(t, [
                    {
                        key: "setOptions", value: function (t) {
                        var e = ["useDefaultGroups"];
                        if (void 0 !== t)for (var i in t)if (t.hasOwnProperty(i) && -1 === e.indexOf(i)) {
                            var o = t[i];
                            this.add(i, o)
                        }
                    }
                    },
                    {
                        key: "clear", value: function () {
                        this.groups = {}, this.groupsArray = []
                    }
                    },
                    {
                        key: "get", value: function (t) {
                        var e = this.groups[t];
                        if (void 0 === e)if (this.options.useDefaultGroups === !1 && this.groupsArray.length > 0) {
                            var i = this.groupIndex % this.groupsArray.length;
                            this.groupIndex++, e = {}, e.color = this.groups[this.groupsArray[i]], this.groups[t] = e
                        } else {
                            var i = this.defaultIndex % this.defaultGroups.length;
                            this.defaultIndex++, e = {}, e.color = this.defaultGroups[i], this.groups[t] = e
                        }
                        return e
                    }
                    },
                    {
                        key: "add", value: function (t, e) {
                        return this.groups[t] = e, this.groupsArray.push(t), e
                    }
                    }
                ]), t
            }();
            e["default"] = r, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(62), a = o(r), h = i(63), d = o(h), l = i(7), u = i(14), c = i(16), p = function () {
                function t(e, i, o, s) {
                    var r = this;
                    n(this, t), this.body = e, this.images = i, this.groups = o, this.layoutEngine = s, this.body.functions.createNode = this.create.bind(this), this.nodesListeners = {
                        add: function (t, e) {
                            r.add(e.items)
                        }, update: function (t, e) {
                            r.update(e.items, e.data)
                        }, remove: function (t, e) {
                            r.remove(e.items)
                        }
                    }, this.options = {}, this.defaultOptions = {
                        borderWidth: 1,
                        borderWidthSelected: 2,
                        brokenImage: void 0,
                        color: {
                            border: "#2B7CE9",
                            background: "#97C2FC",
                            highlight: {border: "#2B7CE9", background: "#D2E5FF"},
                            hover: {border: "#2B7CE9", background: "#D2E5FF"}
                        },
                        fixed: {x: !1, y: !1},
                        font: {
                            color: "#343434",
                            size: 14,
                            face: "arial",
                            background: "none",
                            strokeWidth: 0,
                            strokeColor: "#ffffff",
                            align: "horizontal"
                        },
                        group: void 0,
                        hidden: !1,
                        icon: {face: "FontAwesome", code: void 0, size: 50, color: "#2B7CE9"},
                        image: void 0,
                        label: void 0,
                        labelHighlightBold: !0,
                        level: void 0,
                        mass: 1,
                        physics: !0,
                        scaling: {
                            min: 10,
                            max: 30,
                            label: {enabled: !1, min: 14, max: 30, maxVisible: 30, drawThreshold: 5},
                            customScalingFunction: function (t, e, i, o) {
                                if (e === t)return .5;
                                var n = 1 / (e - t);
                                return Math.max(0, (o - t) * n)
                            }
                        },
                        shadow: {enabled: !1, size: 10, x: 5, y: 5},
                        shape: "ellipse",
                        shapeProperties: {borderDashes: !1, borderRadius: 6, useImageSize: !1},
                        size: 25,
                        title: void 0,
                        value: void 0,
                        x: void 0,
                        y: void 0
                    }, l.extend(this.options, this.defaultOptions), this.bindEventListeners()
                }

                return s(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.on("refreshNodes", this.refresh.bind(this)), this.body.emitter.on("refresh", this.refresh.bind(this)), this.body.emitter.on("destroy", function () {
                            delete t.body.functions.createNode, delete t.nodesListeners.add, delete t.nodesListeners.update, delete t.nodesListeners.remove, delete t.nodesListeners
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        if (void 0 !== t) {
                            if (a["default"].parseOptions(this.options, t), void 0 !== t.shape)for (var e in this.body.nodes)this.body.nodes.hasOwnProperty(e) && this.body.nodes[e].updateShape();
                            if (void 0 !== t.font) {
                                d["default"].parseOptions(this.options.font, t);
                                for (var e in this.body.nodes)this.body.nodes.hasOwnProperty(e) && (this.body.nodes[e].updateLabelModule(), this.body.nodes[e]._reset())
                            }
                            if (void 0 !== t.size)for (var e in this.body.nodes)this.body.nodes.hasOwnProperty(e) && this.body.nodes[e]._reset();
                            (void 0 !== t.hidden || void 0 !== t.physics) && this.body.emitter.emit("_dataChanged")
                        }
                    }
                    },
                    {
                        key: "setData", value: function (t) {
                        var e = this, i = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], o = this.body.data.nodes;
                        if (t instanceof u || t instanceof c) this.body.data.nodes = t; else if (Array.isArray(t)) this.body.data.nodes = new u, this.body.data.nodes.add(t); else {
                            if (t)throw new TypeError("Array or DataSet expected");
                            this.body.data.nodes = new u
                        }
                        o && l.forEach(this.nodesListeners, function (t, e) {
                            o.off(e, t)
                        }), this.body.nodes = {}, this.body.data.nodes && !function () {
                            var t = e;
                            l.forEach(e.nodesListeners, function (e, i) {
                                t.body.data.nodes.on(i, e)
                            });
                            var i = e.body.data.nodes.getIds();
                            e.add(i, !0)
                        }(), i === !1 && this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "add", value: function (t) {
                        for (var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], i = void 0, o = [], n = 0; n < t.length; n++) {
                            i = t[n];
                            var s = this.body.data.nodes.get(i), r = this.create(s);
                            o.push(r), this.body.nodes[i] = r
                        }
                        this.layoutEngine.positionInitially(o), e === !1 && this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "update", value: function (t, e) {
                        for (var i = this.body.nodes, o = !1, n = 0; n < t.length; n++) {
                            var s = t[n], r = i[s], a = e[n];
                            void 0 !== r ? o = r.setOptions(a) : (o = !0, r = this.create(a), i[s] = r)
                        }
                        o === !0 ? this.body.emitter.emit("_dataChanged") : this.body.emitter.emit("_dataUpdated")
                    }
                    },
                    {
                        key: "remove", value: function (t) {
                        for (var e = this.body.nodes, i = 0; i < t.length; i++) {
                            var o = t[i];
                            e[o].cleanup(), delete e[o]
                        }
                        this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "create", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? a["default"] : arguments[1];
                        return new e(t, this.body, this.images, this.groups, this.options)
                    }
                    },
                    {
                        key: "refresh", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0], e = this.body.nodes;
                        for (var i in e) {
                            var o = void 0;
                            e.hasOwnProperty(i) && (o = e[i]);
                            var n = this.body.data.nodes._data[i];
                            void 0 !== o && void 0 !== n && (t === !0 && o.setOptions({
                                x: null,
                                y: null
                            }), o.setOptions({fixed: !1}), o.setOptions(n))
                        }
                    }
                    },
                    {
                        key: "getPositions", value: function (t) {
                        var e = {};
                        if (void 0 !== t) {
                            if (Array.isArray(t) === !0) {
                                for (var i = 0; i < t.length; i++)if (void 0 !== this.body.nodes[t[i]]) {
                                    var o = this.body.nodes[t[i]];
                                    e[t[i]] = {x: Math.round(o.x), y: Math.round(o.y)}
                                }
                            } else if (void 0 !== this.body.nodes[t]) {
                                var o = this.body.nodes[t];
                                e[t] = {x: Math.round(o.x), y: Math.round(o.y)}
                            }
                        } else for (var n in this.body.nodes)if (this.body.nodes.hasOwnProperty(n)) {
                            var o = this.body.nodes[n];
                            e[n] = {x: Math.round(o.x), y: Math.round(o.y)}
                        }
                        return e
                    }
                    },
                    {
                        key: "storePositions", value: function () {
                        var t = [], e = this.body.data.nodes.getDataSet();
                        for (var i in e._data)if (e._data.hasOwnProperty(i)) {
                            var o = this.body.nodes[i];
                            (e._data[i].x != Math.round(o.x) || e._data[i].y != Math.round(o.y)) && t.push({
                                id: i,
                                x: Math.round(o.x),
                                y: Math.round(o.y)
                            })
                        }
                        e.update(t)
                    }
                    },
                    {
                        key: "getBoundingBox", value: function (t) {
                        return void 0 !== this.body.nodes[t] ? this.body.nodes[t].shape.boundingBox : void 0
                    }
                    },
                    {
                        key: "getConnectedNodes", value: function (t) {
                        var e = [];
                        if (void 0 !== this.body.nodes[t])for (var i = this.body.nodes[t], o = {}, n = 0; n < i.edges.length; n++) {
                            var s = i.edges[n];
                            s.toId == t ? void 0 === o[s.fromId] && (e.push(s.fromId), o[s.fromId] = !0) : s.fromId == t && void 0 === o[s.toId] && (e.push(s.toId), o[s.toId] = !0)
                        }
                        return e
                    }
                    },
                    {
                        key: "getConnectedEdges", value: function (t) {
                        var e = [];
                        if (void 0 !== this.body.nodes[t])for (var i = this.body.nodes[t], o = 0; o < i.edges.length; o++)e.push(i.edges[o].id); else console.log("NodeId provided for getConnectedEdges does not exist. Provided: ", t);
                        return e
                    }
                    },
                    {
                        key: "moveNode", value: function (t, e, i) {
                        var o = this;
                        void 0 !== this.body.nodes[t] ? (this.body.nodes[t].x = Number(e), this.body.nodes[t].y = Number(i), setTimeout(function () {
                                o.body.emitter.emit("startSimulation")
                            }, 0)) : console.log("Node id supplied to moveNode does not exist. Provided: ", t)
                    }
                    }
                ]), t
            }();
            e["default"] = p, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(63), a = o(r), h = i(64), d = o(h), l = i(66), u = o(l), c = i(68), p = o(c), f = i(69), m = o(f), v = i(70), g = o(v), y = i(72), b = o(y), w = i(73), _ = o(w), x = i(74), k = o(x), O = i(75), M = o(O), D = i(76), C = o(D), T = i(77), S = o(T), E = i(78), P = o(E), I = i(79), z = o(I), N = i(80), A = o(N), L = i(47), B = (o(L), i(7)), R = function () {
                function t(e, i, o, s, r) {
                    n(this, t), this.options = B.bridgeObject(r), this.body = i, this.edges = [], this.id = void 0, this.imagelist = o, this.grouplist = s, this.x = void 0, this.y = void 0, this.baseSize = this.options.size, this.baseFontSize = this.options.font.size, this.predefinedPosition = !1, this.selected = !1, this.hover = !1, this.labelModule = new a["default"](this.body, this.options), this.setOptions(e)
                }

                return s(t, [
                    {
                        key: "attachEdge", value: function (t) {
                        -1 === this.edges.indexOf(t) && this.edges.push(t)
                    }
                    },
                    {
                        key: "detachEdge", value: function (t) {
                        var e = this.edges.indexOf(t);
                        -1 != e && this.edges.splice(e, 1)
                    }
                    },
                    {
                        key: "setOptions", value: function (e) {
                        var i = this.options.shape;
                        if (e) {
                            if (void 0 !== e.id && (this.id = e.id), void 0 === this.id)throw"Node must have an id";
                            if (void 0 !== e.x && (null === e.x ? (this.x = void 0, this.predefinedPosition = !1) : (this.x = parseInt(e.x), this.predefinedPosition = !0)), void 0 !== e.y && (null === e.y ? (this.y = void 0, this.predefinedPosition = !1) : (this.y = parseInt(e.y), this.predefinedPosition = !0)), void 0 !== e.size && (this.baseSize = e.size), void 0 !== e.value && (e.value = parseFloat(e.value)), "number" == typeof e.group || "string" == typeof e.group && "" != e.group) {
                                var o = this.grouplist.get(e.group);
                                B.deepExtend(this.options, o), this.options.color = B.parseColor(this.options.color)
                            }
                            if (t.parseOptions(this.options, e, !0), void 0 !== this.options.image) {
                                if (!this.imagelist)throw"No imagelist provided";
                                this.imageObj = this.imagelist.load(this.options.image, this.options.brokenImage, this.id)
                            }
                            return this.updateShape(i), this.updateLabelModule(), void 0 !== e.hidden || void 0 !== e.physics ? !0 : !1
                        }
                    }
                    },
                    {
                        key: "updateLabelModule", value: function () {
                        (void 0 === this.options.label || null === this.options.label) && (this.options.label = ""), this.labelModule.setOptions(this.options, !0), void 0 !== this.labelModule.baseSize && (this.baseFontSize = this.labelModule.baseSize)
                    }
                    },
                    {
                        key: "updateShape", value: function (t) {
                        if (t === this.options.shape && this.shape) this.shape.setOptions(this.options); else switch (this.shape && this.shape.cleanup(), this.options.shape) {
                            case"box":
                                this.shape = new d["default"](this.options, this.body, this.labelModule);
                                break;
                            case"circle":
                                this.shape = new u["default"](this.options, this.body, this.labelModule);
                                break;
                            case"circularImage":
                                this.shape = new p["default"](this.options, this.body, this.labelModule, this.imageObj);
                                break;
                            case"database":
                                this.shape = new m["default"](this.options, this.body, this.labelModule);
                                break;
                            case"diamond":
                                this.shape = new g["default"](this.options, this.body, this.labelModule);
                                break;
                            case"dot":
                                this.shape = new b["default"](this.options, this.body, this.labelModule);
                                break;
                            case"ellipse":
                                this.shape = new _["default"](this.options, this.body, this.labelModule);
                                break;
                            case"icon":
                                this.shape = new k["default"](this.options, this.body, this.labelModule);
                                break;
                            case"image":
                                this.shape = new M["default"](this.options, this.body, this.labelModule, this.imageObj);
                                break;
                            case"square":
                                this.shape = new C["default"](this.options, this.body, this.labelModule);
                                break;
                            case"star":
                                this.shape = new S["default"](this.options, this.body, this.labelModule);
                                break;
                            case"text":
                                this.shape = new P["default"](this.options, this.body, this.labelModule);
                                break;
                            case"triangle":
                                this.shape = new z["default"](this.options, this.body, this.labelModule);
                                break;
                            case"triangleDown":
                                this.shape = new A["default"](this.options, this.body, this.labelModule);
                                break;
                            default:
                                this.shape = new _["default"](this.options, this.body, this.labelModule)
                        }
                        this._reset()
                    }
                    },
                    {
                        key: "select", value: function () {
                        this.selected = !0, this._reset()
                    }
                    },
                    {
                        key: "unselect", value: function () {
                        this.selected = !1, this._reset()
                    }
                    },
                    {
                        key: "_reset", value: function () {
                        this.shape.width = void 0, this.shape.height = void 0
                    }
                    },
                    {
                        key: "getTitle", value: function () {
                        return this.options.title
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this.shape.distanceToBorder(t, e)
                    }
                    },
                    {
                        key: "isFixed", value: function () {
                        return this.options.fixed.x && this.options.fixed.y
                    }
                    },
                    {
                        key: "isSelected", value: function () {
                        return this.selected
                    }
                    },
                    {
                        key: "getValue", value: function () {
                        return this.options.value
                    }
                    },
                    {
                        key: "setValueRange", value: function (t, e, i) {
                        if (void 0 !== this.options.value) {
                            var o = this.options.scaling.customScalingFunction(t, e, i, this.options.value), n = this.options.scaling.max - this.options.scaling.min;
                            if (this.options.scaling.label.enabled === !0) {
                                var s = this.options.scaling.label.max - this.options.scaling.label.min;
                                this.options.font.size = this.options.scaling.label.min + o * s
                            }
                            this.options.size = this.options.scaling.min + o * n
                        } else this.options.size = this.baseSize, this.options.font.size = this.baseFontSize
                    }
                    },
                    {
                        key: "draw", value: function (t) {
                        this.shape.draw(t, this.x, this.y, this.selected, this.hover)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t) {
                        this.shape.updateBoundingBox(this.x, this.y, t)
                    }
                    },
                    {
                        key: "resize", value: function (t) {
                        this.shape.resize(t, this.selected)
                    }
                    },
                    {
                        key: "isOverlappingWith", value: function (t) {
                        return this.shape.left < t.right && this.shape.left + this.shape.width > t.left && this.shape.top < t.bottom && this.shape.top + this.shape.height > t.top
                    }
                    },
                    {
                        key: "isBoundingBoxOverlappingWith", value: function (t) {
                        return this.shape.boundingBox.left < t.right && this.shape.boundingBox.right > t.left && this.shape.boundingBox.top < t.bottom && this.shape.boundingBox.bottom > t.top
                    }
                    },
                    {
                        key: "cleanup", value: function () {
                        return this.shape.cleanup()
                    }
                    }
                ], [
                    {
                        key: "parseOptions", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], o = ["color", "font", "fixed", "shadow"];
                        if (B.selectiveNotDeepExtend(o, t, e, i), B.mergeOptions(t, e, "shadow"), void 0 !== e.color && null !== e.color) {
                            var n = B.parseColor(e.color);
                            B.fillIfDefined(t.color, n)
                        } else i === !0 && null === e.color && (t.color = void 0, delete t.color);
                        void 0 !== e.fixed && null !== e.fixed && ("boolean" == typeof e.fixed ? (t.fixed.x = e.fixed, t.fixed.y = e.fixed) : (void 0 !== e.fixed.x && "boolean" == typeof e.fixed.x && (t.fixed.x = e.fixed.x), void 0 !== e.fixed.y && "boolean" == typeof e.fixed.y && (t.fixed.y = e.fixed.y))), void 0 !== e.font && a["default"].parseOptions(t.font, e), void 0 !== e.scaling && B.mergeOptions(t.scaling, e.scaling, "label")
                    }
                    }
                ]), t
            }();
            e["default"] = R, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    var i = [], o = !0, n = !1, s = void 0;
                    try {
                        for (var r, a = t[Symbol.iterator](); !(o = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                    } catch (h) {
                        n = !0, s = h
                    } finally {
                        try {
                            !o && a["return"] && a["return"]()
                        } finally {
                            if (n)throw s
                        }
                    }
                    return i
                }

                return function (e, i) {
                    if (Array.isArray(e))return e;
                    if (Symbol.iterator in Object(e))return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(), s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(7), a = function () {
                function t(e, i) {
                    o(this, t), this.body = e, this.pointToSelf = !1, this.baseSize = void 0, this.setOptions(i), this.size = {
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0,
                        yLine: 0
                    }
                }

                return s(t, [
                    {
                        key: "setOptions", value: function (e) {
                        var i = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
                        this.options = e, void 0 !== e.label && (this.labelDirty = !0), void 0 !== e.font && (t.parseOptions(this.options.font, e, i), "string" == typeof e.font ? this.baseSize = this.options.font.size : "object" == typeof e.font && void 0 !== e.font.size && (this.baseSize = e.font.size))
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o) {
                        var n = arguments.length <= 4 || void 0 === arguments[4] ? "middle" : arguments[4];
                        if (void 0 !== this.options.label) {
                            var s = this.options.font.size * this.body.view.scale;
                            this.options.label && s < this.options.scaling.label.drawThreshold - 1 || (this.calculateLabelSize(t, o, e, i, n), this._drawBackground(t), this._drawText(t, o, e, i, n))
                        }
                    }
                    },
                    {
                        key: "_drawBackground", value: function (t) {
                        if (void 0 !== this.options.font.background && "none" !== this.options.font.background) {
                            t.fillStyle = this.options.font.background;
                            var e = 2;
                            switch (this.options.font.align) {
                                case"middle":
                                    t.fillRect(.5 * -this.size.width, .5 * -this.size.height, this.size.width, this.size.height);
                                    break;
                                case"top":
                                    t.fillRect(.5 * -this.size.width, -(this.size.height + e), this.size.width, this.size.height);
                                    break;
                                case"bottom":
                                    t.fillRect(.5 * -this.size.width, e, this.size.width, this.size.height);
                                    break;
                                default:
                                    t.fillRect(this.size.left, this.size.top - .5 * e, this.size.width, this.size.height)
                            }
                        }
                    }
                    },
                    {
                        key: "_drawText", value: function (t, e, i, o) {
                        var s = arguments.length <= 4 || void 0 === arguments[4] ? "middle" : arguments[4], r = this.options.font.size, a = r * this.body.view.scale;
                        a >= this.options.scaling.label.maxVisible && (r = Number(this.options.scaling.label.maxVisible) / this.body.view.scale);
                        var h = this.size.yLine, d = this._getColor(a), l = n(d, 2), u = l[0], c = l[1], p = this._setAlignment(t, i, h, s), f = n(p, 2);
                        i = f[0], h = f[1], t.font = (e && this.options.labelHighlightBold ? "bold " : "") + r + "px " + this.options.font.face, t.fillStyle = u, t.textAlign = "center", this.options.font.strokeWidth > 0 && (t.lineWidth = this.options.font.strokeWidth, t.strokeStyle = c, t.lineJoin = "round");
                        for (var m = 0; m < this.lineCount; m++)this.options.font.strokeWidth > 0 && t.strokeText(this.lines[m], i, h), t.fillText(this.lines[m], i, h), h += r
                    }
                    },
                    {
                        key: "_setAlignment", value: function (t, e, i, o) {
                        if ("horizontal" !== this.options.font.align && this.pointToSelf === !1) {
                            e = 0, i = 0;
                            var n = 2;
                            "top" === this.options.font.align ? (t.textBaseline = "alphabetic", i -= 2 * n) : "bottom" === this.options.font.align ? (t.textBaseline = "hanging", i += 2 * n) : t.textBaseline = "middle"
                        } else t.textBaseline = o;
                        return [e, i]
                    }
                    },
                    {
                        key: "_getColor", value: function (t) {
                        var e = this.options.font.color || "#000000", i = this.options.font.strokeColor || "#ffffff";
                        if (t <= this.options.scaling.label.drawThreshold) {
                            var o = Math.max(0, Math.min(1, 1 - (this.options.scaling.label.drawThreshold - t)));
                            e = r.overrideOpacity(e, o), i = r.overrideOpacity(i, o)
                        }
                        return [e, i]
                    }
                    },
                    {
                        key: "getTextSize", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], i = {
                            width: this._processLabel(t, e), height: this.options.font.size * this.lineCount,
                            lineCount: this.lineCount
                        };
                        return i
                    }
                    },
                    {
                        key: "calculateLabelSize", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], o = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3], n = arguments.length <= 4 || void 0 === arguments[4] ? "middle" : arguments[4];
                        this.labelDirty === !0 && (this.size.width = this._processLabel(t, e)), this.size.height = this.options.font.size * this.lineCount, this.size.left = i - .5 * this.size.width, this.size.top = o - .5 * this.size.height, this.size.yLine = o + .5 * (1 - this.lineCount) * this.options.font.size, "hanging" === n && (this.size.top += .5 * this.options.font.size, this.size.top += 4, this.size.yLine += 4), this.labelDirty = !1
                    }
                    },
                    {
                        key: "_processLabel", value: function (t, e) {
                        var i = 0, o = [""], n = 0;
                        if (void 0 !== this.options.label) {
                            o = String(this.options.label).split("\n"), n = o.length, t.font = (e && this.options.labelHighlightBold ? "bold " : "") + this.options.font.size + "px " + this.options.font.face, i = t.measureText(o[0]).width;
                            for (var s = 1; n > s; s++) {
                                var r = t.measureText(o[s]).width;
                                i = r > i ? r : i
                            }
                        }
                        return this.lines = o, this.lineCount = n, i
                    }
                    }
                ], [
                    {
                        key: "parseOptions", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2];
                        if ("string" == typeof e.font) {
                            var o = e.font.split(" ");
                            t.size = o[0].replace("px", ""), t.face = o[1], t.color = o[2]
                        } else"object" == typeof e.font && r.fillIfDefined(t, e.font, i);
                        t.size = Number(t.size)
                    }
                    }
                ]), t
            }();
            e["default"] = a, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t, e) {
                        if (void 0 === this.width) {
                            var i = 5, o = this.labelModule.getTextSize(t, e);
                            this.width = o.width + 2 * i, this.height = o.height + 2 * i, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(t, o), this.left = e - this.width / 2, this.top = i - this.height / 2;
                        var s = this.options.borderWidth, r = this.options.borderWidthSelected || 2 * this.options.borderWidth;
                        t.strokeStyle = o ? this.options.color.highlight.border : n ? this.options.color.hover.border : this.options.color.border, t.lineWidth = o ? r : s, t.lineWidth /= this.body.view.scale, t.lineWidth = Math.min(this.width, t.lineWidth), t.fillStyle = o ? this.options.color.highlight.background : n ? this.options.color.hover.background : this.options.color.background;
                        var a = this.options.shapeProperties.borderRadius;
                        t.roundRect(this.left, this.top, this.width, this.height, a), this.enableShadow(t), t.fill(), this.disableShadow(t), t.save(), this.enableBorderDashes(t), t.stroke(), this.disableBorderDashes(t), t.restore(), this.updateBoundingBox(e, i), this.labelModule.draw(t, e, i, o)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e) {
                        this.left = t - .5 * this.width, this.top = e - .5 * this.height, this.boundingBox.left = this.left, this.boundingBox.top = this.top, this.boundingBox.bottom = this.top + this.height, this.boundingBox.right = this.left + this.width
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        this.resize(t);
                        var i = this.width / 2, o = this.height / 2, n = Math.sin(e) * i, s = Math.cos(e) * o;
                        return i * o / Math.sqrt(n * n + s * s)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = o, this.labelModule = n, this.setOptions(e), this.top = void 0, this.left = void 0, this.height = void 0, this.width = void 0, this.radius = void 0, this.boundingBox = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t
                    }
                    },
                    {
                        key: "_distanceToBorder", value: function (t) {
                        var e = 1;
                        return Math.min(Math.abs(this.width / 2 / Math.cos(t)), Math.abs(this.height / 2 / Math.sin(t))) + e
                    }
                    },
                    {
                        key: "enableShadow", value: function (t) {
                        this.options.shadow.enabled === !0 && (t.shadowColor = "rgba(0,0,0,0.5)", t.shadowBlur = this.options.shadow.size, t.shadowOffsetX = this.options.shadow.x, t.shadowOffsetY = this.options.shadow.y)
                    }
                    },
                    {
                        key: "disableShadow", value: function (t) {
                        this.options.shadow.enabled === !0 && (t.shadowColor = "rgba(0,0,0,0)", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0)
                    }
                    },
                    {
                        key: "enableBorderDashes", value: function (t) {
                        if (this.options.shapeProperties.borderDashes !== !1)if (void 0 !== t.setLineDash) {
                            var e = this.options.shapeProperties.borderDashes;
                            e === !0 && (e = [5, 15]), t.setLineDash(e)
                        } else console.warn("setLineDash is not supported in this browser. The dashed borders cannot be used."), this.options.shapeProperties.borderDashes = !1
                    }
                    },
                    {
                        key: "disableBorderDashes", value: function (t) {
                        this.options.shapeProperties.borderDashes !== !1 && (void 0 !== t.setLineDash ? t.setLineDash([0]) : (console.warn("setLineDash is not supported in this browser. The dashed borders cannot be used."), this.options.shapeProperties.borderDashes = !1))
                    }
                    },
                    {
                        key: "cleanup", value: function () {
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(67), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t, e) {
                        if (void 0 === this.width) {
                            var i = 5, o = this.labelModule.getTextSize(t, e), n = Math.max(o.width, o.height) + 2 * i;
                            this.options.size = n / 2, this.width = n, this.height = n, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(t, o), this.left = e - this.width / 2, this.top = i - this.height / 2, this._drawRawCircle(t, e, i, o, n, this.options.size), this.boundingBox.top = i - this.options.size, this.boundingBox.left = e - this.options.size, this.boundingBox.right = e + this.options.size, this.boundingBox.bottom = i + this.options.size, this.updateBoundingBox(e, i), this.labelModule.draw(t, e, i, o)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e) {
                        this.boundingBox.top = e - this.options.size, this.boundingBox.left = t - this.options.size, this.boundingBox.right = t + this.options.size, this.boundingBox.bottom = e + this.options.size
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        this.resize(t);
                        var i = this.width / 2, o = this.height / 2, n = Math.sin(e) * i, s = Math.cos(e) * o;
                        return i * o / Math.sqrt(n * n + s * s)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o), this.labelOffset = 0, this.imageLoaded = !1
                }

                return s(e, t), r(e, [
                    {
                        key: "_resizeImage", value: function () {
                        var t = !1;
                        if (this.imageObj.width && this.imageObj.height ? this.imageLoaded === !1 && (this.imageLoaded = !0, t = !0) : this.imageLoaded = !1, !this.width || !this.height || t === !0) {
                            var e, i, o;
                            this.imageObj.width && this.imageObj.height && (e = 0, i = 0), this.options.shapeProperties.useImageSize === !1 ? this.imageObj.width > this.imageObj.height ? (o = this.imageObj.width / this.imageObj.height, e = 2 * this.options.size * o || this.imageObj.width, i = 2 * this.options.size || this.imageObj.height) : (o = this.imageObj.width && this.imageObj.height ? this.imageObj.height / this.imageObj.width : 1, e = 2 * this.options.size, i = 2 * this.options.size * o) : (e = this.imageObj.width, i = this.imageObj.height), this.width = e, this.height = i, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "_drawRawCircle", value: function (t, e, i, o, n, s) {
                        var r = this.options.borderWidth, a = this.options.borderWidthSelected || 2 * this.options.borderWidth;
                        t.strokeStyle = o ? this.options.color.highlight.border : n ? this.options.color.hover.border : this.options.color.border, t.lineWidth = o ? a : r, t.lineWidth *= this.networkScaleInv, t.lineWidth = Math.min(this.width, t.lineWidth), t.fillStyle = o ? this.options.color.highlight.background : n ? this.options.color.hover.background : this.options.color.background, t.circle(e, i, s), this.enableShadow(t), t.fill(), this.disableShadow(t), t.save(), this.enableBorderDashes(t), t.stroke(), this.disableBorderDashes(t), t.restore()
                    }
                    },
                    {
                        key: "_drawImageAtPosition", value: function (t) {
                        0 != this.imageObj.width && (t.globalAlpha = 1, this.enableShadow(t), t.drawImage(this.imageObj, this.left, this.top, this.width, this.height), this.disableShadow(t))
                    }
                    },
                    {
                        key: "_drawImageLabel", value: function (t, e, i, o) {
                        var n, s = 0;
                        if (void 0 !== this.height) {
                            s = .5 * this.height;
                            var r = this.labelModule.getTextSize(t);
                            r.lineCount >= 1 && (s += r.height / 2)
                        }
                        n = i + s, this.options.label && (this.labelOffset = s), this.labelModule.draw(t, e, n, o, "hanging")
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(67), d = o(h), l = function (t) {
                function e(t, i, o, s) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o), this.imageObj = s, this._swapToImageResizeWhenImageLoaded = !0
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function () {
                        if (void 0 === this.imageObj.src || void 0 === this.imageObj.width || void 0 === this.imageObj.height) {
                            if (!this.width) {
                                var t = 2 * this.options.size;
                                this.width = t, this.height = t, this._swapToImageResizeWhenImageLoaded = !0, this.radius = .5 * this.width
                            }
                        } else this._swapToImageResizeWhenImageLoaded && (this.width = void 0, this.height = void 0, this._swapToImageResizeWhenImageLoaded = !1), this._resizeImage()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(), this.left = e - this.width / 2, this.top = i - this.height / 2;
                        var s = Math.min(.5 * this.height, .5 * this.width);
                        this._drawRawCircle(t, e, i, o, n, s), t.save(), t.clip(), this._drawImageAtPosition(t), t.restore(), this._drawImageLabel(t, e, i, o), this.updateBoundingBox(e, i)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e) {
                        this.boundingBox.top = e - this.options.size, this.boundingBox.left = t - this.options.size, this.boundingBox.right = t + this.options.size, this.boundingBox.bottom = e + this.options.size, this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left), this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width), this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelOffset)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this.resize(t), this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t, e) {
                        if (void 0 === this.width) {
                            var i = 5, o = this.labelModule.getTextSize(t, e), n = o.width + 2 * i;
                            this.width = n, this.height = n, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(t, o), this.left = e - this.width / 2, this.top = i - this.height / 2;
                        var s = this.options.borderWidth, r = this.options.borderWidthSelected || 2 * this.options.borderWidth;
                        t.strokeStyle = o ? this.options.color.highlight.border : n ? this.options.color.hover.border : this.options.color.border, t.lineWidth = this.selected ? r : s, t.lineWidth *= this.networkScaleInv, t.lineWidth = Math.min(this.width, t.lineWidth), t.fillStyle = o ? this.options.color.highlight.background : n ? this.options.color.hover.background : this.options.color.background, t.database(e - this.width / 2, i - .5 * this.height, this.width, this.height), this.enableShadow(t), t.fill(), this.disableShadow(t), t.save(), this.enableBorderDashes(t), t.stroke(), this.disableBorderDashes(t), t.restore(), this.updateBoundingBox(e, i, t, o), this.labelModule.draw(t, e, i, o)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e, i, o) {
                        this.resize(i, o), this.left = t - .5 * this.width, this.top = e - .5 * this.height, this.boundingBox.left = this.left, this.boundingBox.top = this.top, this.boundingBox.bottom = this.top + this.height, this.boundingBox.right = this.left + this.width
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        this.resize(t);
                        var i = this.width / 2, o = this.height / 2, n = Math.sin(e) * i, s = Math.cos(e) * o;
                        return i * o / Math.sqrt(n * n + s * s)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(71), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t) {
                        this._resizeShape()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this._drawShape(t, "diamond", 4, e, i, o, n)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_resizeShape", value: function () {
                        if (void 0 === this.width) {
                            var t = 2 * this.options.size;
                            this.width = t, this.height = t, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "_drawShape", value: function (t, e, i, o, n, s, r) {
                        this._resizeShape(), this.left = o - this.width / 2, this.top = n - this.height / 2;
                        var a = this.options.borderWidth, h = this.options.borderWidthSelected || 2 * this.options.borderWidth;
                        if (t.strokeStyle = s ? this.options.color.highlight.border : r ? this.options.color.hover.border : this.options.color.border, t.lineWidth = s ? h : a, t.lineWidth /= this.body.view.scale, t.lineWidth = Math.min(this.width, t.lineWidth), t.fillStyle = s ? this.options.color.highlight.background : r ? this.options.color.hover.background : this.options.color.background, t[e](o, n, this.options.size), this.enableShadow(t), t.fill(), this.disableShadow(t), t.save(), this.enableBorderDashes(t), t.stroke(), this.disableBorderDashes(t), t.restore(), void 0 !== this.options.label) {
                            var d = n + .5 * this.height + 3;
                            this.labelModule.draw(t, o, d, s, "hanging")
                        }
                        this.updateBoundingBox(o, n)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e) {
                        this.boundingBox.top = e - this.options.size, this.boundingBox.left = t - this.options.size, this.boundingBox.right = t + this.options.size, this.boundingBox.bottom = e + this.options.size, void 0 !== this.options.label && this.labelModule.size.width > 0 && (this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left), this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width), this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelModule.size.height + 3))
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(71), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t) {
                        this._resizeShape()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this._drawShape(t, "circle", 2, e, i, o, n)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this.options.size + this.options.borderWidth
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t, e) {
                        if (void 0 === this.width) {
                            var i = this.labelModule.getTextSize(t, e);
                            this.width = 1.5 * i.width, this.height = 2 * i.height, this.width < this.height && (this.width = this.height), this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(t, o), this.left = e - .5 * this.width, this.top = i - .5 * this.height;
                        var s = this.options.borderWidth, r = this.options.borderWidthSelected || 2 * this.options.borderWidth;
                        t.strokeStyle = o ? this.options.color.highlight.border : n ? this.options.color.hover.border : this.options.color.border, t.lineWidth = o ? r : s, t.lineWidth /= this.body.view.scale, t.lineWidth = Math.min(this.width, t.lineWidth), t.fillStyle = o ? this.options.color.highlight.background : n ? this.options.color.hover.background : this.options.color.background, t.ellipse(this.left, this.top, this.width, this.height), this.enableShadow(t), t.fill(), this.disableShadow(t), t.save(), this.enableBorderDashes(t), t.stroke(), this.disableBorderDashes(t), t.restore(), this.updateBoundingBox(e, i, t, o), this.labelModule.draw(t, e, i, o)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e, i, o) {
                        this.resize(i, o), this.left = t - .5 * this.width, this.top = e - .5 * this.height, this.boundingBox.left = this.left, this.boundingBox.top = this.top, this.boundingBox.bottom = this.top + this.height, this.boundingBox.right = this.left + this.width
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        this.resize(t);
                        var i = .5 * this.width, o = .5 * this.height, n = Math.sin(e) * i, s = Math.cos(e) * o;
                        return i * o / Math.sqrt(n * n + s * s)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t) {
                        if (void 0 === this.width) {
                            var e = 5, i = {
                                width: Number(this.options.icon.size),
                                height: Number(this.options.icon.size)
                            };
                            this.width = i.width + 2 * e, this.height = i.height + 2 * e, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        if (this.resize(t), this.options.icon.size = this.options.icon.size || 50, this.left = e - .5 * this.width, this.top = i - .5 * this.height, this._icon(t, e, i, o), void 0 !== this.options.label) {
                            var s = 5;
                            this.labelModule.draw(t, e, i + .5 * this.height + s, o)
                        }
                        this.updateBoundingBox(e, i)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e) {
                        if (this.boundingBox.top = e - .5 * this.options.icon.size, this.boundingBox.left = t - .5 * this.options.icon.size, this.boundingBox.right = t + .5 * this.options.icon.size, this.boundingBox.bottom = e + .5 * this.options.icon.size, void 0 !== this.options.label && this.labelModule.size.width > 0) {
                            var i = 5;
                            this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left), this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width), this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelModule.size.height + i)
                        }
                    }
                    },
                    {
                        key: "_icon", value: function (t, e, i, o) {
                        var n = Number(this.options.icon.size);
                        void 0 !== this.options.icon.code ? (t.font = (o ? "bold " : "") + n + "px " + this.options.icon.face, t.fillStyle = this.options.icon.color || "black", t.textAlign = "center", t.textBaseline = "middle", this.enableShadow(t), t.fillText(this.options.icon.code, e, i), this.disableShadow(t)) : console.error("When using the icon shape, you need to define the code in the icon options object. This can be done per node or globally.")
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this.resize(t), this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(67), d = o(h), l = function (t) {
                function e(t, i, o, s) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o), this.imageObj = s
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function () {
                        this._resizeImage()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(), this.left = e - this.width / 2, this.top = i - this.height / 2, this._drawImageAtPosition(t), this._drawImageLabel(t, e, i, o || n), this.updateBoundingBox(e, i)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e) {
                        this.resize(), this.left = t - this.width / 2, this.top = e - this.height / 2, this.boundingBox.top = this.top, this.boundingBox.left = this.left, this.boundingBox.right = this.left + this.width, this.boundingBox.bottom = this.top + this.height, void 0 !== this.options.label && this.labelModule.size.width > 0 && (this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left), this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width), this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelOffset))
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        this.resize(t);
                        var i = this.width / 2, o = this.height / 2, n = Math.sin(e) * i, s = Math.cos(e) * o;
                        return i * o / Math.sqrt(n * n + s * s)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(71), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function () {
                        this._resizeShape()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this._drawShape(t, "square", 2, e, i, o, n)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this.resize(), this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(71), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t) {
                        this._resizeShape()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this._drawShape(t, "star", 4, e, i, o, n)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(65), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t, e) {
                        if (void 0 === this.width) {
                            var i = 5, o = this.labelModule.getTextSize(t, e);
                            this.width = o.width + 2 * i, this.height = o.height + 2 * i, this.radius = .5 * this.width
                        }
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this.resize(t, o || n), this.left = e - this.width / 2, this.top = i - this.height / 2, this.enableShadow(t), this.labelModule.draw(t, e, i, o || n), this.disableShadow(t), this.updateBoundingBox(e, i, t, o)
                    }
                    },
                    {
                        key: "updateBoundingBox", value: function (t, e, i, o) {
                        this.resize(i, o), this.left = t - this.width / 2, this.top = e - this.height / 2, this.boundingBox.top = this.top, this.boundingBox.left = this.left, this.boundingBox.right = this.left + this.width, this.boundingBox.bottom = this.top + this.height
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this.resize(t), this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(71), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t) {
                        this._resizeShape()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this._drawShape(t, "triangle", 3, e, i, o, n)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(71), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "resize", value: function (t) {
                        this._resizeShape()
                    }
                    },
                    {
                        key: "draw", value: function (t, e, i, o, n) {
                        this._drawShape(t, "triangleDown", 3, e, i, o, n)
                    }
                    },
                    {
                        key: "distanceToBorder", value: function (t, e) {
                        return this._distanceToBorder(e)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(82), a = o(r), h = i(63), d = o(h), l = i(7), u = i(14), c = i(16), p = function () {
                function t(e, i, o) {
                    var s = this;
                    n(this, t), this.body = e, this.images = i, this.groups = o, this.body.functions.createEdge = this.create.bind(this), this.edgesListeners = {
                        add: function (t, e) {
                            s.add(e.items)
                        }, update: function (t, e) {
                            s.update(e.items)
                        }, remove: function (t, e) {
                            s.remove(e.items)
                        }
                    }, this.options = {}, this.defaultOptions = {
                        arrows: {
                            to: {enabled: !1, scaleFactor: 1},
                            middle: {enabled: !1, scaleFactor: 1},
                            from: {enabled: !1, scaleFactor: 1}
                        },
                        color: {color: "#848484", highlight: "#848484", hover: "#848484", inherit: "from", opacity: 1},
                        dashes: !1,
                        font: {
                            color: "#343434",
                            size: 14,
                            face: "arial",
                            background: "none",
                            strokeWidth: 2,
                            strokeColor: "#ffffff",
                            align: "horizontal"
                        },
                        hidden: !1,
                        hoverWidth: 1.5,
                        label: void 0,
                        labelHighlightBold: !0,
                        length: void 0,
                        physics: !0,
                        scaling: {
                            min: 1,
                            max: 15,
                            label: {enabled: !0, min: 14, max: 30, maxVisible: 30, drawThreshold: 5},
                            customScalingFunction: function (t, e, i, o) {
                                if (e === t)return .5;
                                var n = 1 / (e - t);
                                return Math.max(0, (o - t) * n)
                            }
                        },
                        selectionWidth: 1.5,
                        selfReferenceSize: 20,
                        shadow: {enabled: !1, size: 10, x: 5, y: 5},
                        smooth: {enabled: !0, type: "dynamic", forceDirection: "none", roundness: .5},
                        title: void 0,
                        width: 1,
                        value: void 0
                    }, l.extend(this.options, this.defaultOptions), this.bindEventListeners()
                }

                return s(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.on("_forceDisableDynamicCurves", function (e) {
                            "dynamic" === e && (e = "continuous");
                            var i = !1;
                            for (var o in t.body.edges)if (t.body.edges.hasOwnProperty(o)) {
                                var n = t.body.edges[o], s = t.body.data.edges._data[o];
                                if (void 0 !== s) {
                                    var r = s.smooth;
                                    void 0 !== r && r.enabled === !0 && "dynamic" === r.type && (void 0 === e ? n.setOptions({smooth: !1}) : n.setOptions({smooth: {type: e}}), i = !0)
                                }
                            }
                            i === !0 && t.body.emitter.emit("_dataChanged")
                        }), this.body.emitter.on("_dataUpdated", function () {
                            t.reconnectEdges(), t.markAllEdgesAsDirty()
                        }), this.body.emitter.on("refreshEdges", this.refresh.bind(this)), this.body.emitter.on("refresh", this.refresh.bind(this)), this.body.emitter.on("destroy", function () {
                            delete t.body.functions.createEdge, delete t.edgesListeners.add, delete t.edgesListeners.update, delete t.edgesListeners.remove, delete t.edgesListeners
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        if (void 0 !== t) {
                            a["default"].parseOptions(this.options, t), void 0 !== t.color && this.markAllEdgesAsDirty();
                            var e = !1;
                            if (void 0 !== t.smooth)for (var i in this.body.edges)this.body.edges.hasOwnProperty(i) && (e = this.body.edges[i].updateEdgeType() || e);
                            if (void 0 !== t.font) {
                                d["default"].parseOptions(this.options.font, t);
                                for (var i in this.body.edges)this.body.edges.hasOwnProperty(i) && this.body.edges[i].updateLabelModule()
                            }
                            (void 0 !== t.hidden || void 0 !== t.physics || e === !0) && this.body.emitter.emit("_dataChanged")
                        }
                    }
                    },
                    {
                        key: "setData", value: function (t) {
                        var e = this, i = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], o = this.body.data.edges;
                        if (t instanceof u || t instanceof c) this.body.data.edges = t; else if (Array.isArray(t)) this.body.data.edges = new u, this.body.data.edges.add(t); else {
                            if (t)throw new TypeError("Array or DataSet expected");
                            this.body.data.edges = new u
                        }
                        if (o && l.forEach(this.edgesListeners, function (t, e) {
                                o.off(e, t)
                            }), this.body.edges = {}, this.body.data.edges) {
                            l.forEach(this.edgesListeners, function (t, i) {
                                e.body.data.edges.on(i, t)
                            });
                            var n = this.body.data.edges.getIds();
                            this.add(n, !0)
                        }
                        i === !1 && this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "add", value: function (t) {
                        for (var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], i = this.body.edges, o = this.body.data.edges, n = 0; n < t.length; n++) {
                            var s = t[n], r = i[s];
                            r && r.disconnect();
                            var a = o.get(s, {showInternalIds: !0});
                            i[s] = this.create(a)
                        }
                        e === !1 && this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "update", value: function (t) {
                        for (var e = this.body.edges, i = this.body.data.edges, o = !1, n = 0; n < t.length; n++) {
                            var s = t[n], r = i.get(s), a = e[s];
                            void 0 !== a ? (a.disconnect(), o = a.setOptions(r) || o, a.connect()) : (this.body.edges[s] = this.create(r), o = !0)
                        }
                        o === !0 ? this.body.emitter.emit("_dataChanged") : this.body.emitter.emit("_dataUpdated")
                    }
                    },
                    {
                        key: "remove", value: function (t) {
                        for (var e = this.body.edges, i = 0; i < t.length; i++) {
                            var o = t[i], n = e[o];
                            void 0 !== n && (n.cleanup(), n.disconnect(), delete e[o])
                        }
                        this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "refresh", value: function () {
                        var t = this.body.edges;
                        for (var e in t) {
                            var i = void 0;
                            t.hasOwnProperty(e) && (i = t[e]);
                            var o = this.body.data.edges._data[e];
                            void 0 !== i && void 0 !== o && i.setOptions(o)
                        }
                    }
                    },
                    {
                        key: "create", value: function (t) {
                        return new a["default"](t, this.body, this.options)
                    }
                    },
                    {
                        key: "markAllEdgesAsDirty", value: function () {
                        for (var t in this.body.edges)this.body.edges[t].edgeType.colorDirty = !0
                    }
                    },
                    {
                        key: "reconnectEdges", value: function () {
                        var t, e = this.body.nodes, i = this.body.edges;
                        for (t in e)e.hasOwnProperty(t) && (e[t].edges = []);
                        for (t in i)if (i.hasOwnProperty(t)) {
                            var o = i[t];
                            o.from = null, o.to = null, o.connect()
                        }
                    }
                    },
                    {
                        key: "getConnectedNodes", value: function (t) {
                        var e = [];
                        if (void 0 !== this.body.edges[t]) {
                            var i = this.body.edges[t];
                            i.fromId && e.push(i.fromId), i.toId && e.push(i.toId)
                        }
                        return e
                    }
                    }
                ]), t
            }();
            e["default"] = p, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(63), a = o(r), h = i(86), d = o(h), l = i(88), u = o(l), c = i(83), p = o(c), f = i(89), m = o(f), v = i(7), g = function () {
                function t(e, i, o) {
                    if (n(this, t), void 0 === i)throw"No body provided";
                    this.options = v.bridgeObject(o), this.body = i, this.id = void 0, this.fromId = void 0, this.toId = void 0, this.selected = !1, this.hover = !1, this.labelDirty = !0, this.colorDirty = !0, this.baseWidth = this.options.width, this.baseFontSize = this.options.font.size, this.from = void 0, this.to = void 0, this.edgeType = void 0, this.connected = !1, this.labelModule = new a["default"](this.body, this.options), this.setOptions(e)
                }

                return s(t, [
                    {
                        key: "setOptions", value: function (e) {
                        if (e) {
                            this.colorDirty = !0, t.parseOptions(this.options, e, !0), void 0 !== e.id && (this.id = e.id), void 0 !== e.from && (this.fromId = e.from), void 0 !== e.to && (this.toId = e.to), void 0 !== e.title && (this.title = e.title), void 0 !== e.value && (e.value = parseFloat(e.value)), this.updateLabelModule();
                            var i = this.updateEdgeType();
                            return this._setInteractionWidths(), this.connect(), (void 0 !== e.hidden || void 0 !== e.physics) && (i = !0), i
                        }
                    }
                    },
                    {
                        key: "updateLabelModule", value: function () {
                        this.labelModule.setOptions(this.options, !0), void 0 !== this.labelModule.baseSize && (this.baseFontSize = this.labelModule.baseSize)
                    }
                    },
                    {
                        key: "updateEdgeType", value: function () {
                        var t = !1, e = !0, i = this.options.smooth;
                        return void 0 !== this.edgeType && (this.edgeType instanceof u["default"] && i.enabled === !0 && "dynamic" === i.type && (e = !1), this.edgeType instanceof d["default"] && i.enabled === !0 && "cubicBezier" === i.type && (e = !1), this.edgeType instanceof p["default"] && i.enabled === !0 && "dynamic" !== i.type && "cubicBezier" !== i.type && (e = !1), this.edgeType instanceof m["default"] && i.enabled === !1 && (e = !1), e === !0 && (t = this.cleanup())), e === !0 ? this.options.smooth.enabled === !0 ? "dynamic" === this.options.smooth.type ? (t = !0, this.edgeType = new u["default"](this.options, this.body, this.labelModule)) : "cubicBezier" === this.options.smooth.type ? this.edgeType = new d["default"](this.options, this.body, this.labelModule) : this.edgeType = new p["default"](this.options, this.body, this.labelModule) : this.edgeType = new m["default"](this.options, this.body, this.labelModule) : this.edgeType.setOptions(this.options), t
                    }
                    },
                    {
                        key: "connect", value: function () {
                        this.disconnect(), this.from = this.body.nodes[this.fromId] || void 0, this.to = this.body.nodes[this.toId] || void 0, this.connected = void 0 !== this.from && void 0 !== this.to, this.connected === !0 ? (this.from.attachEdge(this), this.to.attachEdge(this)) : (this.from && this.from.detachEdge(this), this.to && this.to.detachEdge(this)), this.edgeType.connect()
                    }
                    },
                    {
                        key: "disconnect", value: function () {
                        this.from && (this.from.detachEdge(this), this.from = void 0), this.to && (this.to.detachEdge(this), this.to = void 0), this.connected = !1
                    }
                    },
                    {
                        key: "getTitle", value: function () {
                        return this.title
                    }
                    },
                    {
                        key: "isSelected", value: function () {
                        return this.selected
                    }
                    },
                    {
                        key: "getValue", value: function () {
                        return this.options.value
                    }
                    },
                    {
                        key: "setValueRange", value: function (t, e, i) {
                        if (void 0 !== this.options.value) {
                            var o = this.options.scaling.customScalingFunction(t, e, i, this.options.value), n = this.options.scaling.max - this.options.scaling.min;
                            if (this.options.scaling.label.enabled === !0) {
                                var s = this.options.scaling.label.max - this.options.scaling.label.min;
                                this.options.font.size = this.options.scaling.label.min + o * s
                            }
                            this.options.width = this.options.scaling.min + o * n
                        } else this.options.width = this.baseWidth, this.options.font.size = this.baseFontSize;
                        this._setInteractionWidths()
                    }
                    },
                    {
                        key: "_setInteractionWidths", value: function () {
                        "function" == typeof this.options.hoverWidth ? this.edgeType.hoverWidth = this.options.hoverWidth(this.options.width) : this.edgeType.hoverWidth = this.options.hoverWidth + this.options.width, "function" == typeof this.options.selectionWidth ? this.edgeType.selectionWidth = this.options.selectionWidth(this.options.width) : this.edgeType.selectionWidth = this.options.selectionWidth + this.options.width
                    }
                    },
                    {
                        key: "draw", value: function (t) {
                        var e = this.edgeType.drawLine(t, this.selected, this.hover);
                        this.drawArrows(t, e), this.drawLabel(t, e)
                    }
                    },
                    {
                        key: "drawArrows", value: function (t, e) {
                        this.options.arrows.from.enabled === !0 && this.edgeType.drawArrowHead(t, "from", e, this.selected, this.hover), this.options.arrows.middle.enabled === !0 && this.edgeType.drawArrowHead(t, "middle", e, this.selected, this.hover), this.options.arrows.to.enabled === !0 && this.edgeType.drawArrowHead(t, "to", e, this.selected, this.hover)
                    }
                    },
                    {
                        key: "drawLabel", value: function (t, e) {
                        if (void 0 !== this.options.label) {
                            var i = this.from, o = this.to, n = this.from.selected || this.to.selected || this.selected;
                            if (i.id != o.id) {
                                this.labelModule.pointToSelf = !1;
                                var s = this.edgeType.getPoint(.5, e);
                                t.save(), "horizontal" !== this.options.font.align && (this.labelModule.calculateLabelSize(t, n, s.x, s.y), t.translate(s.x, this.labelModule.size.yLine), this._rotateForLabelAlignment(t)), this.labelModule.draw(t, s.x, s.y, n), t.restore()
                            } else {
                                this.labelModule.pointToSelf = !0;
                                var r, a, h = this.options.selfReferenceSize;
                                i.shape.width > i.shape.height ? (r = i.x + .5 * i.shape.width, a = i.y - h) : (r = i.x + h, a = i.y - .5 * i.shape.height), s = this._pointOnCircle(r, a, h, .125), this.labelModule.draw(t, s.x, s.y, n)
                            }
                        }
                    }
                    },
                    {
                        key: "isOverlappingWith", value: function (t) {
                        if (this.connected) {
                            var e = 10, i = this.from.x, o = this.from.y, n = this.to.x, s = this.to.y, r = t.left, a = t.top, h = this.edgeType.getDistanceToEdge(i, o, n, s, r, a);
                            return e > h
                        }
                        return !1
                    }
                    },
                    {
                        key: "_rotateForLabelAlignment", value: function (t) {
                        var e = this.from.y - this.to.y, i = this.from.x - this.to.x, o = Math.atan2(e, i);
                        (-1 > o && 0 > i || o > 0 && 0 > i) && (o += Math.PI), t.rotate(o)
                    }
                    },
                    {
                        key: "_pointOnCircle", value: function (t, e, i, o) {
                        var n = 2 * o * Math.PI;
                        return {x: t + i * Math.cos(n), y: e - i * Math.sin(n)}
                    }
                    },
                    {
                        key: "select", value: function () {
                        this.selected = !0
                    }
                    },
                    {
                        key: "unselect", value: function () {
                        this.selected = !1
                    }
                    },
                    {
                        key: "cleanup", value: function () {
                        return this.edgeType.cleanup()
                    }
                    }
                ], [
                    {
                        key: "parseOptions", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], o = ["id", "from", "hidden", "hoverWidth", "label", "labelHighlightBold", "length", "line", "opacity", "physics", "selectionWidth", "selfReferenceSize", "to", "title", "value", "width"];
                        if (v.selectiveDeepExtend(o, t, e, i), v.mergeOptions(t, e, "smooth"), v.mergeOptions(t, e, "shadow"), void 0 !== e.dashes && null !== e.dashes ? t.dashes = e.dashes : i === !0 && null === e.dashes && (t.dashes = void 0, delete t.dashes), void 0 !== e.scaling && null !== e.scaling ? (void 0 !== e.scaling.min && (t.scaling.min = e.scaling.min), void 0 !== e.scaling.max && (t.scaling.max = e.scaling.max), v.mergeOptions(t.scaling, e.scaling, "label")) : i === !0 && null === e.scaling && (t.scaling = void 0, delete t.scaling), void 0 !== e.arrows && null !== e.arrows)if ("string" == typeof e.arrows) {
                            var n = e.arrows.toLowerCase();
                            -1 != n.indexOf("to") && (t.arrows.to.enabled = !0), -1 != n.indexOf("middle") && (t.arrows.middle.enabled = !0), -1 != n.indexOf("from") && (t.arrows.from.enabled = !0)
                        } else {
                            if ("object" != typeof e.arrows)throw new Error("The arrow newOptions can only be an object or a string. Refer to the documentation. You used:" + JSON.stringify(e.arrows));
                            v.mergeOptions(t.arrows, e.arrows, "to"), v.mergeOptions(t.arrows, e.arrows, "middle"), v.mergeOptions(t.arrows, e.arrows, "from")
                        } else i === !0 && null === e.arrows && (t.arrows = void 0, delete t.arrows);
                        if (void 0 !== e.color && null !== e.color)if (v.isString(e.color)) t.color.color = e.color, t.color.highlight = e.color, t.color.hover = e.color, t.color.inherit = !1; else {
                            var s = !1;
                            void 0 !== e.color.color && (t.color.color = e.color.color, s = !0), void 0 !== e.color.highlight && (t.color.highlight = e.color.highlight, s = !0), void 0 !== e.color.hover && (t.color.hover = e.color.hover, s = !0), void 0 !== e.color.inherit && (t.color.inherit = e.color.inherit), void 0 !== e.color.opacity && (t.color.opacity = Math.min(1, Math.max(0, e.color.opacity))), void 0 === e.color.inherit && s === !0 && (t.color.inherit = !1)
                        } else i === !0 && null === e.color && (t.color = void 0, delete t.color);
                        void 0 !== e.font && a["default"].parseOptions(t.font, e)
                    }
                    }
                ]), t
            }();
            e["default"] = g, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(84), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_line", value: function (t) {
                        t.beginPath(), t.moveTo(this.from.x, this.from.y);
                        var e = this._getViaCoordinates(), i = e;
                        return void 0 === e.x ? (t.lineTo(this.to.x, this.to.y), i = void 0) : t.quadraticCurveTo(e.x, e.y, this.to.x, this.to.y), this.enableShadow(t), t.stroke(), this.disableShadow(t), i
                    }
                    },
                    {
                        key: "_getViaCoordinates", value: function () {
                        var t = void 0, e = void 0, i = this.options.smooth.roundness, o = this.options.smooth.type, n = Math.abs(this.from.x - this.to.x), s = Math.abs(this.from.y - this.to.y);
                        if ("discrete" === o || "diagonalCross" === o) Math.abs(this.from.x - this.to.x) <= Math.abs(this.from.y - this.to.y) ? (this.from.y >= this.to.y ? this.from.x <= this.to.x ? (t = this.from.x + i * s, e = this.from.y - i * s) : this.from.x > this.to.x && (t = this.from.x - i * s, e = this.from.y - i * s) : this.from.y < this.to.y && (this.from.x <= this.to.x ? (t = this.from.x + i * s, e = this.from.y + i * s) : this.from.x > this.to.x && (t = this.from.x - i * s, e = this.from.y + i * s)), "discrete" === o && (t = i * s > n ? this.from.x : t)) : Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y) && (this.from.y >= this.to.y ? this.from.x <= this.to.x ? (t = this.from.x + i * n, e = this.from.y - i * n) : this.from.x > this.to.x && (t = this.from.x - i * n, e = this.from.y - i * n) : this.from.y < this.to.y && (this.from.x <= this.to.x ? (t = this.from.x + i * n, e = this.from.y + i * n) : this.from.x > this.to.x && (t = this.from.x - i * n, e = this.from.y + i * n)), "discrete" === o && (e = i * n > s ? this.from.y : e)); else if ("straightCross" === o) Math.abs(this.from.x - this.to.x) <= Math.abs(this.from.y - this.to.y) ? (t = this.from.x, e = this.from.y < this.to.y ? this.to.y - (1 - i) * s : this.to.y + (1 - i) * s) : Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y) && (t = this.from.x < this.to.x ? this.to.x - (1 - i) * n : this.to.x + (1 - i) * n, e = this.from.y); else if ("horizontal" === o) t = this.from.x < this.to.x ? this.to.x - (1 - i) * n : this.to.x + (1 - i) * n, e = this.from.y; else if ("vertical" === o) t = this.from.x, e = this.from.y < this.to.y ? this.to.y - (1 - i) * s : this.to.y + (1 - i) * s; else if ("curvedCW" === o) {
                            n = this.to.x - this.from.x, s = this.from.y - this.to.y;
                            var r = Math.sqrt(n * n + s * s), a = Math.PI, h = Math.atan2(s, n), d = (h + (.5 * i + .5) * a) % (2 * a);
                            t = this.from.x + (.5 * i + .5) * r * Math.sin(d), e = this.from.y + (.5 * i + .5) * r * Math.cos(d)
                        } else if ("curvedCCW" === o) {
                            n = this.to.x - this.from.x, s = this.from.y - this.to.y;
                            var r = Math.sqrt(n * n + s * s), a = Math.PI, h = Math.atan2(s, n), d = (h + (.5 * -i + .5) * a) % (2 * a);
                            t = this.from.x + (.5 * i + .5) * r * Math.sin(d), e = this.from.y + (.5 * i + .5) * r * Math.cos(d)
                        } else Math.abs(this.from.x - this.to.x) <= Math.abs(this.from.y - this.to.y) ? this.from.y >= this.to.y ? this.from.x <= this.to.x ? (t = this.from.x + i * s, e = this.from.y - i * s, t = this.to.x < t ? this.to.x : t) : this.from.x > this.to.x && (t = this.from.x - i * s, e = this.from.y - i * s, t = this.to.x > t ? this.to.x : t) : this.from.y < this.to.y && (this.from.x <= this.to.x ? (t = this.from.x + i * s, e = this.from.y + i * s, t = this.to.x < t ? this.to.x : t) : this.from.x > this.to.x && (t = this.from.x - i * s, e = this.from.y + i * s, t = this.to.x > t ? this.to.x : t)) : Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y) && (this.from.y >= this.to.y ? this.from.x <= this.to.x ? (t = this.from.x + i * n, e = this.from.y - i * n, e = this.to.y > e ? this.to.y : e) : this.from.x > this.to.x && (t = this.from.x - i * n, e = this.from.y - i * n, e = this.to.y > e ? this.to.y : e) : this.from.y < this.to.y && (this.from.x <= this.to.x ? (t = this.from.x + i * n, e = this.from.y + i * n, e = this.to.y < e ? this.to.y : e) : this.from.x > this.to.x && (t = this.from.x - i * n, e = this.from.y + i * n, e = this.to.y < e ? this.to.y : e)));
                        return {x: t, y: e}
                    }
                    },
                    {
                        key: "_findBorderPosition", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                        return this._findBorderPositionBezier(t, e, i.via)
                    }
                    },
                    {
                        key: "_getDistanceToEdge", value: function (t, e, i, o, n, s) {
                        var r = arguments.length <= 6 || void 0 === arguments[6] ? this._getViaCoordinates() : arguments[6];
                        return this._getDistanceToBezierEdge(t, e, i, o, n, s, r)
                    }
                    },
                    {
                        key: "getPoint", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? this._getViaCoordinates() : arguments[1], i = t, o = Math.pow(1 - i, 2) * this.from.x + 2 * i * (1 - i) * e.x + Math.pow(i, 2) * this.to.x, n = Math.pow(1 - i, 2) * this.from.y + 2 * i * (1 - i) * e.y + Math.pow(i, 2) * this.to.y;
                        return {x: o, y: n}
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(85), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_findBorderPositionBezier", value: function (t, e) {
                        var i, o, n, s, r, a = arguments.length <= 2 || void 0 === arguments[2] ? this._getViaCoordinates() : arguments[2], h = 10, d = 0, l = 0, u = 1, c = .2, p = this.to, f = !1;
                        for (t.id === this.from.id && (p = this.from, f = !0); u >= l && h > d;) {
                            var m = .5 * (l + u);
                            if (i = this.getPoint(m, a), o = Math.atan2(p.y - i.y, p.x - i.x), n = p.distanceToBorder(e, o), s = Math.sqrt(Math.pow(i.x - p.x, 2) + Math.pow(i.y - p.y, 2)), r = n - s, Math.abs(r) < c)break;
                            0 > r ? f === !1 ? l = m : u = m : f === !1 ? u = m : l = m, d++
                        }
                        return i.t = m, i
                    }
                    },
                    {
                        key: "_getDistanceToBezierEdge", value: function (t, e, i, o, n, s, r) {
                        var a = 1e9, h = void 0, d = void 0, l = void 0, u = void 0, c = void 0, p = t, f = e;
                        for (d = 1; 10 > d; d++)l = .1 * d, u = Math.pow(1 - l, 2) * t + 2 * l * (1 - l) * r.x + Math.pow(l, 2) * i, c = Math.pow(1 - l, 2) * e + 2 * l * (1 - l) * r.y + Math.pow(l, 2) * o, d > 0 && (h = this._getDistanceToLine(p, f, u, c, n, s), a = a > h ? h : a), p = u, f = c;
                        return a
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    var i = [], o = !0, n = !1, s = void 0;
                    try {
                        for (var r, a = t[Symbol.iterator](); !(o = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                    } catch (h) {
                        n = !0, s = h
                    } finally {
                        try {
                            !o && a["return"] && a["return"]()
                        } finally {
                            if (n)throw s
                        }
                    }
                    return i
                }

                return function (e, i) {
                    if (Array.isArray(e))return e;
                    if (Symbol.iterator in Object(e))return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(), s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(7), a = function () {
                function t(e, i, n) {
                    o(this, t), this.body = i, this.labelModule = n, this.setOptions(e), this.colorDirty = !0, this.color = {}, this.selectionWidth = 2, this.hoverWidth = 1.5
                }

                return s(t, [
                    {
                        key: "connect", value: function () {
                        this.from = this.body.nodes[this.options.from], this.to = this.body.nodes[this.options.to]
                    }
                    },
                    {
                        key: "cleanup", value: function () {
                        return !1
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t, this.from = this.body.nodes[this.options.from], this.to = this.body.nodes[this.options.to], this.id = this.options.id
                    }
                    },
                    {
                        key: "drawLine", value: function (t, e, i) {
                        t.strokeStyle = this.getColor(t, e, i), t.lineWidth = this.getLineWidth(e, i);
                        var o = void 0;
                        return o = this.options.dashes !== !1 ? this._drawDashedLine(t) : this._drawLine(t)
                    }
                    },
                    {
                        key: "_drawLine", value: function (t) {
                        var e = void 0;
                        if (this.from != this.to) e = this._line(t); else {
                            var i = this._getCircleData(t), o = n(i, 3), s = o[0], r = o[1], a = o[2];
                            this._circle(t, s, r, a)
                        }
                        return e
                    }
                    },
                    {
                        key: "_drawDashedLine", value: function (t) {
                        var e = void 0;
                        t.lineCap = "round";
                        var i = [5, 5];
                        if (Array.isArray(this.options.dashes) === !0 && (i = this.options.dashes), void 0 !== t.setLineDash) {
                            if (t.save(), t.setLineDash(i), t.lineDashOffset = 0, this.from != this.to) e = this._line(t); else {
                                var o = this._getCircleData(t), s = n(o, 3), r = s[0], a = s[1], h = s[2];
                                this._circle(t, r, a, h)
                            }
                            t.setLineDash([0]), t.lineDashOffset = 0, t.restore()
                        } else {
                            if (this.from != this.to) t.dashedLine(this.from.x, this.from.y, this.to.x, this.to.y, i); else {
                                var d = this._getCircleData(t), l = n(d, 3), r = l[0], a = l[1], h = l[2];
                                this._circle(t, r, a, h)
                            }
                            this.enableShadow(t), t.stroke(), this.disableShadow(t)
                        }
                        return e
                    }
                    },
                    {
                        key: "findBorderPosition", value: function (t, e, i) {
                        return this.from != this.to ? this._findBorderPosition(t, e, i) : this._findBorderPositionCircle(t, e, i)
                    }
                    },
                    {
                        key: "findBorderPositions", value: function (t) {
                        var e = {}, i = {};
                        if (this.from != this.to) e = this._findBorderPosition(this.from, t), i = this._findBorderPosition(this.to, t); else {
                            var o = this._getCircleData(t), s = n(o, 3), r = s[0], a = s[1];
                            s[2];
                            e = this._findBorderPositionCircle(this.from, t, {
                                x: r,
                                y: a,
                                low: .25,
                                high: .6,
                                direction: -1
                            }), i = this._findBorderPositionCircle(this.from, t, {
                                x: r,
                                y: a,
                                low: .6,
                                high: .8,
                                direction: 1
                            })
                        }
                        return {from: e, to: i}
                    }
                    },
                    {
                        key: "_getCircleData", value: function (t) {
                        var e = void 0, i = void 0, o = this.from, n = this.options.selfReferenceSize;
                        return void 0 !== t && void 0 === o.shape.width && o.shape.resize(t), o.shape.width > o.shape.height ? (e = o.x + .5 * o.shape.width, i = o.y - n) : (e = o.x + n, i = o.y - .5 * o.shape.height), [e, i, n]
                    }
                    },
                    {
                        key: "_pointOnCircle", value: function (t, e, i, o) {
                        var n = 2 * o * Math.PI;
                        return {x: t + i * Math.cos(n), y: e - i * Math.sin(n)}
                    }
                    },
                    {
                        key: "_findBorderPositionCircle", value: function (t, e, i) {
                        for (var o = i.x, n = i.y, s = i.low, r = i.high, a = i.direction, h = 10, d = 0, l = this.options.selfReferenceSize, u = void 0, c = void 0, p = void 0, f = void 0, m = void 0, v = .05, g = .5 * (s + r); r >= s && h > d && (g = .5 * (s + r), u = this._pointOnCircle(o, n, l, g), c = Math.atan2(t.y - u.y, t.x - u.x), p = t.distanceToBorder(e, c), f = Math.sqrt(Math.pow(u.x - t.x, 2) + Math.pow(u.y - t.y, 2)), m = p - f, !(Math.abs(m) < v));)m > 0 ? a > 0 ? s = g : r = g : a > 0 ? r = g : s = g, d++;
                        return u.t = g, u
                    }
                    },
                    {
                        key: "getLineWidth", value: function (t, e) {
                        return t === !0 ? Math.max(this.selectionWidth, .3 / this.body.view.scale) : e === !0 ? Math.max(this.hoverWidth, .3 / this.body.view.scale) : Math.max(this.options.width, .3 / this.body.view.scale)
                    }
                    },
                    {
                        key: "getColor", value: function (t, e, i) {
                        var o = this.options.color;
                        if (o.inherit !== !1) {
                            if ("both" === o.inherit && this.from.id !== this.to.id) {
                                var n = t.createLinearGradient(this.from.x, this.from.y, this.to.x, this.to.y), s = void 0, a = void 0;
                                return s = this.from.options.color.highlight.border, a = this.to.options.color.highlight.border, this.from.selected === !1 && this.to.selected === !1 ? (s = r.overrideOpacity(this.from.options.color.border, this.options.color.opacity), a = r.overrideOpacity(this.to.options.color.border, this.options.color.opacity)) : this.from.selected === !0 && this.to.selected === !1 ? a = this.to.options.color.border : this.from.selected === !1 && this.to.selected === !0 && (s = this.from.options.color.border), n.addColorStop(0, s), n.addColorStop(1, a), n
                            }
                            this.colorDirty === !0 && ("to" === o.inherit ? (this.color.highlight = this.to.options.color.highlight.border, this.color.hover = this.to.options.color.hover.border, this.color.color = r.overrideOpacity(this.to.options.color.border, o.opacity)) : (this.color.highlight = this.from.options.color.highlight.border, this.color.hover = this.from.options.color.hover.border, this.color.color = r.overrideOpacity(this.from.options.color.border, o.opacity)))
                        } else this.colorDirty === !0 && (this.color.highlight = o.highlight, this.color.hover = o.hover, this.color.color = r.overrideOpacity(o.color, o.opacity));
                        return this.colorDirty = !1, e === !0 ? this.color.highlight : i === !0 ? this.color.hover : this.color.color;
                    }
                    },
                    {
                        key: "_circle", value: function (t, e, i, o) {
                        this.enableShadow(t), t.beginPath(), t.arc(e, i, o, 0, 2 * Math.PI, !1), t.stroke(), this.disableShadow(t)
                    }
                    },
                    {
                        key: "getDistanceToEdge", value: function (t, e, i, o, s, r, a) {
                        var h = 0;
                        if (this.from != this.to) h = this._getDistanceToEdge(t, e, i, o, s, r, a); else {
                            var d = this._getCircleData(), l = n(d, 3), u = l[0], c = l[1], p = l[2], f = u - s, m = c - r;
                            h = Math.abs(Math.sqrt(f * f + m * m) - p)
                        }
                        return this.labelModule.size.left < s && this.labelModule.size.left + this.labelModule.size.width > s && this.labelModule.size.top < r && this.labelModule.size.top + this.labelModule.size.height > r ? 0 : h
                    }
                    },
                    {
                        key: "_getDistanceToLine", value: function (t, e, i, o, n, s) {
                        var r = i - t, a = o - e, h = r * r + a * a, d = ((n - t) * r + (s - e) * a) / h;
                        d > 1 ? d = 1 : 0 > d && (d = 0);
                        var l = t + d * r, u = e + d * a, c = l - n, p = u - s;
                        return Math.sqrt(c * c + p * p)
                    }
                    },
                    {
                        key: "drawArrowHead", value: function (t, e, i, o, s) {
                        t.strokeStyle = this.getColor(t, o, s), t.fillStyle = t.strokeStyle, t.lineWidth = this.getLineWidth(o, s);
                        var r = void 0, a = void 0, h = void 0, d = void 0, l = void 0, u = void 0, c = void 0;
                        if ("from" === e ? (d = this.from, l = this.to, u = .1, c = this.options.arrows.from.scaleFactor) : "to" === e ? (d = this.to, l = this.from, u = -.1, c = this.options.arrows.to.scaleFactor) : (d = this.to, l = this.from, c = this.options.arrows.middle.scaleFactor), d != l) {
                            if ("middle" !== e)if (this.options.smooth.enabled === !0) {
                                h = this.findBorderPosition(d, t, {via: i});
                                var p = this.getPoint(Math.max(0, Math.min(1, h.t + u)), i);
                                r = Math.atan2(h.y - p.y, h.x - p.x)
                            } else r = Math.atan2(d.y - l.y, d.x - l.x), h = this.findBorderPosition(d, t); else r = Math.atan2(d.y - l.y, d.x - l.x), h = this.getPoint(.6, i);
                            a = (10 + 5 * this.options.width) * c, t.arrow(h.x, h.y, r, a), this.enableShadow(t), t.fill(), this.disableShadow(t), t.stroke()
                        } else {
                            var f = void 0, m = void 0, v = this._getCircleData(t), g = n(v, 3), y = g[0], b = g[1], w = g[2];
                            "from" === e ? (m = this.findBorderPosition(this.from, t, {
                                    x: y,
                                    y: b,
                                    low: .25,
                                    high: .6,
                                    direction: -1
                                }), f = -2 * m.t * Math.PI + 1.5 * Math.PI + .1 * Math.PI) : "to" === e ? (m = this.findBorderPosition(this.from, t, {
                                        x: y,
                                        y: b,
                                        low: .6,
                                        high: 1,
                                        direction: 1
                                    }), f = -2 * m.t * Math.PI + 1.5 * Math.PI - 1.1 * Math.PI) : (m = this._pointOnCircle(y, b, w, .175), f = 3.9269908169872414);
                            var _ = (10 + 5 * this.options.width) * c;
                            t.arrow(m.x, m.y, f, _), this.enableShadow(t), t.fill(), this.disableShadow(t), t.stroke()
                        }
                    }
                    },
                    {
                        key: "enableShadow", value: function (t) {
                        this.options.shadow.enabled === !0 && (t.shadowColor = "rgba(0,0,0,0.5)", t.shadowBlur = this.options.shadow.size, t.shadowOffsetX = this.options.shadow.x, t.shadowOffsetY = this.options.shadow.y)
                    }
                    },
                    {
                        key: "disableShadow", value: function (t) {
                        this.options.shadow.enabled === !0 && (t.shadowColor = "rgba(0,0,0,0)", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0)
                    }
                    }
                ]), t
            }();
            e["default"] = a, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    var i = [], o = !0, n = !1, s = void 0;
                    try {
                        for (var r, a = t[Symbol.iterator](); !(o = (r = a.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                    } catch (h) {
                        n = !0, s = h
                    } finally {
                        try {
                            !o && a["return"] && a["return"]()
                        } finally {
                            if (n)throw s
                        }
                    }
                    return i
                }

                return function (e, i) {
                    if (Array.isArray(e))return e;
                    if (Symbol.iterator in Object(e))return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(), a = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), h = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, d = i(87), l = o(d), u = function (t) {
                function e(t, i, o) {
                    n(this, e), h(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), a(e, [
                    {
                        key: "_line", value: function (t) {
                        var e = this._getViaCoordinates(), i = r(e, 2), o = i[0], n = i[1], s = [o, n];
                        return t.beginPath(), t.moveTo(this.from.x, this.from.y), void 0 === o.x ? (t.lineTo(this.to.x, this.to.y), s = void 0) : t.bezierCurveTo(o.x, o.y, n.x, n.y, this.to.x, this.to.y), this.enableShadow(t), t.stroke(), this.disableShadow(t), s
                    }
                    },
                    {
                        key: "_getViaCoordinates", value: function () {
                        var t = this.from.x - this.to.x, e = this.from.y - this.to.y, i = void 0, o = void 0, n = void 0, s = void 0, r = this.options.smooth.roundness;
                        return (Math.abs(t) > Math.abs(e) || this.options.smooth.forceDirection === !0 || "horizontal" === this.options.smooth.forceDirection) && "vertical" !== this.options.smooth.forceDirection ? (o = this.from.y, s = this.to.y, i = this.from.x - r * t, n = this.to.x + r * t) : (o = this.from.y - r * e, s = this.to.y + r * e, i = this.from.x, n = this.to.x), [
                            {x: i, y: o},
                            {x: n, y: s}
                        ]
                    }
                    },
                    {
                        key: "_findBorderPosition", value: function (t, e) {
                        return this._findBorderPositionBezier(t, e)
                    }
                    },
                    {
                        key: "_getDistanceToEdge", value: function (t, e, i, o, n, s) {
                        var a = arguments.length <= 6 || void 0 === arguments[6] ? this._getViaCoordinates() : arguments[6], h = r(a, 2), d = h[0], l = h[1];
                        return this._getDistanceToBezierEdge(t, e, i, o, n, s, d, l)
                    }
                    },
                    {
                        key: "getPoint", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? this._getViaCoordinates() : arguments[1], i = r(e, 2), o = i[0], n = i[1], s = t, a = [];
                        a[0] = Math.pow(1 - s, 3), a[1] = 3 * s * Math.pow(1 - s, 2), a[2] = 3 * Math.pow(s, 2) * (1 - s), a[3] = Math.pow(s, 3);
                        var h = a[0] * this.from.x + a[1] * o.x + a[2] * n.x + a[3] * this.to.x, d = a[0] * this.from.y + a[1] * o.y + a[2] * n.y + a[3] * this.to.y;
                        return {x: h, y: d}
                    }
                    }
                ]), e
            }(l["default"]);
            e["default"] = u, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(84), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_getDistanceToBezierEdge", value: function (t, e, i, o, n, s, r, a) {
                        var h = 1e9, d = void 0, l = void 0, u = void 0, c = void 0, p = void 0, f = t, m = e, v = [0, 0, 0, 0];
                        for (l = 1; 10 > l; l++)u = .1 * l, v[0] = Math.pow(1 - u, 3), v[1] = 3 * u * Math.pow(1 - u, 2), v[2] = 3 * Math.pow(u, 2) * (1 - u), v[3] = Math.pow(u, 3), c = v[0] * t + v[1] * r.x + v[2] * a.x + v[3] * i, p = v[0] * e + v[1] * r.y + v[2] * a.y + v[3] * o, l > 0 && (d = this._getDistanceToLine(f, m, c, p, n, s), h = h > d ? d : h), f = c, m = p;
                        return h
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(84), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t, this.id = this.options.id, this.setupSupportNode(), this.options.physics !== t.physics && (this.via.setOptions({physics: this.options.physics}), this.positionBezierNode()), this.connect()
                    }
                    },
                    {
                        key: "connect", value: function () {
                        this.from = this.body.nodes[this.options.from], this.to = this.body.nodes[this.options.to], void 0 === this.from || void 0 === this.to || this.options.physics === !1 ? this.via.setOptions({physics: !1}) : this.from.id === this.to.id ? this.via.setOptions({physics: !1}) : this.via.setOptions({physics: !0})
                    }
                    },
                    {
                        key: "cleanup", value: function () {
                        return void 0 !== this.via ? (delete this.body.nodes[this.via.id], this.via = void 0, !0) : !1
                    }
                    },
                    {
                        key: "setupSupportNode", value: function () {
                        if (void 0 === this.via) {
                            var t = "edgeId:" + this.id, e = this.body.functions.createNode({
                                id: t,
                                shape: "circle",
                                physics: !0,
                                hidden: !0
                            });
                            this.body.nodes[t] = e, this.via = e, this.via.parentEdgeId = this.id, this.positionBezierNode()
                        }
                    }
                    },
                    {
                        key: "positionBezierNode", value: function () {
                        void 0 !== this.via && void 0 !== this.from && void 0 !== this.to ? (this.via.x = .5 * (this.from.x + this.to.x), this.via.y = .5 * (this.from.y + this.to.y)) : void 0 !== this.via && (this.via.x = 0, this.via.y = 0)
                    }
                    },
                    {
                        key: "_line", value: function (t) {
                        return t.beginPath(), t.moveTo(this.from.x, this.from.y), t.quadraticCurveTo(this.via.x, this.via.y, this.to.x, this.to.y), this.enableShadow(t), t.stroke(), this.disableShadow(t), this.via
                    }
                    },
                    {
                        key: "getPoint", value: function (t) {
                        var e = t, i = Math.pow(1 - e, 2) * this.from.x + 2 * e * (1 - e) * this.via.x + Math.pow(e, 2) * this.to.x, o = Math.pow(1 - e, 2) * this.from.y + 2 * e * (1 - e) * this.via.y + Math.pow(e, 2) * this.to.y;
                        return {x: i, y: o}
                    }
                    },
                    {
                        key: "_findBorderPosition", value: function (t, e) {
                        return this._findBorderPositionBezier(t, e, this.via)
                    }
                    },
                    {
                        key: "_getDistanceToEdge", value: function (t, e, i, o, n, s) {
                        return this._getDistanceToBezierEdge(t, e, i, o, n, s, this.via)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(85), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_line", value: function (t) {
                        return t.beginPath(), t.moveTo(this.from.x, this.from.y), t.lineTo(this.to.x, this.to.y), this.enableShadow(t), t.stroke(), void this.disableShadow(t)
                    }
                    },
                    {
                        key: "getPoint", value: function (t) {
                        return {x: (1 - t) * this.from.x + t * this.to.x, y: (1 - t) * this.from.y + t * this.to.y}
                    }
                    },
                    {
                        key: "_findBorderPosition", value: function (t, e) {
                        var i = this.to, o = this.from;
                        t.id === this.from.id && (i = this.from, o = this.to);
                        var n = Math.atan2(i.y - o.y, i.x - o.x), s = i.x - o.x, r = i.y - o.y, a = Math.sqrt(s * s + r * r), h = t.distanceToBorder(e, n), d = (a - h) / a, l = {};
                        return l.x = (1 - d) * o.x + d * i.x, l.y = (1 - d) * o.y + d * i.y, l
                    }
                    },
                    {
                        key: "_getDistanceToEdge", value: function (t, e, i, o, n, s) {
                        return this._getDistanceToLine(t, e, i, o, n, s)
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(91), a = o(r), h = i(92), d = o(h), l = i(93), u = o(l), c = i(94), p = o(c), f = i(95), m = o(f), v = i(96), g = o(v), y = i(97), b = o(y), w = i(98), _ = o(w), x = i(7), k = function () {
                function t(e) {
                    n(this, t), this.body = e, this.physicsBody = {
                        physicsNodeIndices: [],
                        physicsEdgeIndices: [],
                        forces: {},
                        velocities: {}
                    }, this.physicsEnabled = !0, this.simulationInterval = 1e3 / 60, this.requiresTimeout = !0, this.previousStates = {}, this.freezeCache = {}, this.renderTimer = void 0, this.initialStabilizationEmitted = !1, this.stabilized = !1, this.startedStabilization = !1, this.stabilizationIterations = 0, this.ready = !1, this.options = {}, this.defaultOptions = {
                        enabled: !0,
                        barnesHut: {
                            theta: .5,
                            gravitationalConstant: -2e3,
                            centralGravity: .3,
                            springLength: 95,
                            springConstant: .04,
                            damping: .09,
                            avoidOverlap: 0
                        },
                        forceAtlas2Based: {
                            theta: .5,
                            gravitationalConstant: -50,
                            centralGravity: .01,
                            springConstant: .08,
                            springLength: 100,
                            damping: .4,
                            avoidOverlap: 0
                        },
                        repulsion: {
                            centralGravity: .2,
                            springLength: 200,
                            springConstant: .05,
                            nodeDistance: 100,
                            damping: .09,
                            avoidOverlap: 0
                        },
                        hierarchicalRepulsion: {
                            centralGravity: 0,
                            springLength: 100,
                            springConstant: .01,
                            nodeDistance: 120,
                            damping: .09
                        },
                        maxVelocity: 50,
                        minVelocity: .1,
                        solver: "barnesHut",
                        stabilization: {
                            enabled: !0,
                            iterations: 1e3,
                            updateInterval: 50,
                            onlyDynamicEdges: !1,
                            fit: !0
                        },
                        timestep: .5
                    }, x.extend(this.options, this.defaultOptions), this.bindEventListeners()
                }

                return s(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.on("initPhysics", function () {
                            t.initPhysics()
                        }), this.body.emitter.on("resetPhysics", function () {
                            t.stopSimulation(), t.ready = !1
                        }), this.body.emitter.on("disablePhysics", function () {
                            t.physicsEnabled = !1, t.stopSimulation()
                        }), this.body.emitter.on("restorePhysics", function () {
                            t.setOptions(t.options), t.ready === !0 && t.startSimulation()
                        }), this.body.emitter.on("startSimulation", function () {
                            t.ready === !0 && t.startSimulation()
                        }), this.body.emitter.on("stopSimulation", function () {
                            t.stopSimulation()
                        }), this.body.emitter.on("destroy", function () {
                            t.stopSimulation(!1), t.body.emitter.off()
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        void 0 !== t && (t === !1 ? (this.options.enabled = !1, this.physicsEnabled = !1, this.stopSimulation()) : (this.physicsEnabled = !0, x.selectiveNotDeepExtend(["stabilization"], this.options, t), x.mergeOptions(this.options, t, "stabilization"), void 0 === t.enabled && (this.options.enabled = !0), this.options.enabled === !1 && (this.physicsEnabled = !1, this.stopSimulation()))), this.init()
                    }
                    },
                    {
                        key: "init", value: function () {
                        var t;
                        "forceAtlas2Based" === this.options.solver ? (t = this.options.forceAtlas2Based, this.nodesSolver = new b["default"](this.body, this.physicsBody, t), this.edgesSolver = new p["default"](this.body, this.physicsBody, t), this.gravitySolver = new _["default"](this.body, this.physicsBody, t)) : "repulsion" === this.options.solver ? (t = this.options.repulsion, this.nodesSolver = new d["default"](this.body, this.physicsBody, t), this.edgesSolver = new p["default"](this.body, this.physicsBody, t), this.gravitySolver = new g["default"](this.body, this.physicsBody, t)) : "hierarchicalRepulsion" === this.options.solver ? (t = this.options.hierarchicalRepulsion, this.nodesSolver = new u["default"](this.body, this.physicsBody, t), this.edgesSolver = new m["default"](this.body, this.physicsBody, t), this.gravitySolver = new g["default"](this.body, this.physicsBody, t)) : (t = this.options.barnesHut, this.nodesSolver = new a["default"](this.body, this.physicsBody, t), this.edgesSolver = new p["default"](this.body, this.physicsBody, t), this.gravitySolver = new g["default"](this.body, this.physicsBody, t)), this.modelOptions = t
                    }
                    },
                    {
                        key: "initPhysics", value: function () {
                        this.physicsEnabled === !0 && this.options.enabled === !0 ? this.options.stabilization.enabled === !0 ? this.stabilize() : (this.stabilized = !1, this.ready = !0, this.body.emitter.emit("fit", {}, !0), this.startSimulation()) : (this.ready = !0, this.body.emitter.emit("fit"))
                    }
                    },
                    {
                        key: "startSimulation", value: function () {
                        this.physicsEnabled === !0 && this.options.enabled === !0 ? (this.stabilized = !1, this.body.emitter.emit("_resizeNodes"), void 0 === this.viewFunction && (this.viewFunction = this.simulationStep.bind(this), this.body.emitter.on("initRedraw", this.viewFunction), this.body.emitter.emit("_startRendering"))) : this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "stopSimulation", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];
                        this.stabilized = !0, t === !0 && this._emitStabilized(), void 0 !== this.viewFunction && (this.body.emitter.off("initRedraw", this.viewFunction), this.viewFunction = void 0, t === !0 && this.body.emitter.emit("_stopRendering"))
                    }
                    },
                    {
                        key: "simulationStep", value: function () {
                        var t = Date.now();
                        this.physicsTick();
                        var e = Date.now() - t;
                        (e < .4 * this.simulationInterval || this.runDoubleSpeed === !0) && this.stabilized === !1 && (this.physicsTick(), this.runDoubleSpeed = !0), this.stabilized === !0 && (this.stabilizationIterations > 1 && (this.startedStabilization = !1), this.stopSimulation())
                    }
                    },
                    {
                        key: "_emitStabilized", value: function () {
                        var t = this;
                        (this.stabilizationIterations > 1 || this.initialStabilizationEmitted === !1) && (this.initialStabilizationEmitted = !0, setTimeout(function () {
                            t.body.emitter.emit("stabilized", {iterations: t.stabilizationIterations}), t.stabilizationIterations = 0
                        }, 0))
                    }
                    },
                    {
                        key: "physicsTick", value: function () {
                        this.stabilized === !1 && (this.calculateForces(), this.stabilized = this.moveNodes(), this.stabilized === !0 ? this.revert() : this.startedStabilization === !1 && (this.body.emitter.emit("startStabilizing"), this.startedStabilization = !0), this.stabilizationIterations++)
                    }
                    },
                    {
                        key: "updatePhysicsData", value: function () {
                        this.physicsBody.forces = {}, this.physicsBody.physicsNodeIndices = [], this.physicsBody.physicsEdgeIndices = [];
                        var t = this.body.nodes, e = this.body.edges;
                        for (var i in t)t.hasOwnProperty(i) && t[i].options.physics === !0 && this.physicsBody.physicsNodeIndices.push(i);
                        for (var o in e)e.hasOwnProperty(o) && e[o].options.physics === !0 && this.physicsBody.physicsEdgeIndices.push(o);
                        for (var n = 0; n < this.physicsBody.physicsNodeIndices.length; n++) {
                            var i = this.physicsBody.physicsNodeIndices[n];
                            this.physicsBody.forces[i] = {
                                x: 0,
                                y: 0
                            }, void 0 === this.physicsBody.velocities[i] && (this.physicsBody.velocities[i] = {
                                x: 0,
                                y: 0
                            })
                        }
                        for (var i in this.physicsBody.velocities)void 0 === t[i] && delete this.physicsBody.velocities[i]
                    }
                    },
                    {
                        key: "revert", value: function () {
                        for (var t = Object.keys(this.previousStates), e = this.body.nodes, i = this.physicsBody.velocities, o = 0; o < t.length; o++) {
                            var n = t[o];
                            void 0 !== e[n] ? e[n].options.physics === !0 && (i[n].x = this.previousStates[n].vx, i[n].y = this.previousStates[n].vy, e[n].x = this.previousStates[n].x, e[n].y = this.previousStates[n].y) : delete this.previousStates[n]
                        }
                    }
                    },
                    {
                        key: "moveNodes", value: function () {
                        for (var t = !1, e = this.physicsBody.physicsNodeIndices, i = this.options.maxVelocity ? this.options.maxVelocity : 1e9, o = !0, n = this.options.minVelocity / Math.max(this.body.view.scale, .05), s = 0; s < e.length; s++) {
                            var r = e[s], a = this._performStep(r, i);
                            o = n > a && o === !0, t = !0
                        }
                        return t === !0 ? n > .5 * this.options.maxVelocity ? !1 : o : !0
                    }
                    },
                    {
                        key: "_performStep", value: function (t, e) {
                        var i = this.body.nodes[t], o = this.options.timestep, n = this.physicsBody.forces, s = this.physicsBody.velocities;
                        if (this.previousStates[t] = {
                                x: i.x,
                                y: i.y,
                                vx: s[t].x,
                                vy: s[t].y
                            }, i.options.fixed.x === !1) {
                            var r = this.modelOptions.damping * s[t].x, a = (n[t].x - r) / i.options.mass;
                            s[t].x += a * o, s[t].x = Math.abs(s[t].x) > e ? s[t].x > 0 ? e : -e : s[t].x, i.x += s[t].x * o
                        } else n[t].x = 0, s[t].x = 0;
                        if (i.options.fixed.y === !1) {
                            var h = this.modelOptions.damping * s[t].y, d = (n[t].y - h) / i.options.mass;
                            s[t].y += d * o, s[t].y = Math.abs(s[t].y) > e ? s[t].y > 0 ? e : -e : s[t].y, i.y += s[t].y * o
                        } else n[t].y = 0, s[t].y = 0;
                        var l = Math.sqrt(Math.pow(s[t].x, 2) + Math.pow(s[t].y, 2));
                        return l
                    }
                    },
                    {
                        key: "calculateForces", value: function () {
                        this.gravitySolver.solve(), this.nodesSolver.solve(), this.edgesSolver.solve()
                    }
                    },
                    {
                        key: "_freezeNodes", value: function () {
                        var t = this.body.nodes;
                        for (var e in t)t.hasOwnProperty(e) && t[e].x && t[e].y && (this.freezeCache[e] = {
                            x: t[e].options.fixed.x,
                            y: t[e].options.fixed.y
                        }, t[e].options.fixed.x = !0, t[e].options.fixed.y = !0)
                    }
                    },
                    {
                        key: "_restoreFrozenNodes", value: function () {
                        var t = this.body.nodes;
                        for (var e in t)t.hasOwnProperty(e) && void 0 !== this.freezeCache[e] && (t[e].options.fixed.x = this.freezeCache[e].x, t[e].options.fixed.y = this.freezeCache[e].y);
                        this.freezeCache = {}
                    }
                    },
                    {
                        key: "stabilize", value: function () {
                        var t = this, e = arguments.length <= 0 || void 0 === arguments[0] ? this.options.stabilization.iterations : arguments[0];
                        return "number" != typeof e && (console.log("The stabilize method needs a numeric amount of iterations. Switching to default: ", this.options.stabilization.iterations), e = this.options.stabilization.iterations), 0 === this.physicsBody.physicsNodeIndices.length ? void(this.ready = !0) : (this.body.emitter.emit("_resizeNodes"), this.stopSimulation(), this.stabilized = !1, this.body.emitter.emit("_blockRedraw"), this.targetIterations = e, this.options.stabilization.onlyDynamicEdges === !0 && this._freezeNodes(), this.stabilizationIterations = 0, void setTimeout(function () {
                                return t._stabilizationBatch()
                            }, 0))
                    }
                    },
                    {
                        key: "_stabilizationBatch", value: function () {
                        for (var t = 0; this.stabilized === !1 && t < this.options.stabilization.updateInterval && this.stabilizationIterations < this.targetIterations;)this.physicsTick(), this.stabilizationIterations++, t++;
                        this.stabilized === !1 && this.stabilizationIterations < this.targetIterations ? (this.body.emitter.emit("stabilizationProgress", {
                                iterations: this.stabilizationIterations,
                                total: this.targetIterations
                            }), setTimeout(this._stabilizationBatch.bind(this), 0)) : this._finalizeStabilization()
                    }
                    },
                    {
                        key: "_finalizeStabilization", value: function () {
                        this.body.emitter.emit("_allowRedraw"), this.options.stabilization.fit === !0 && this.body.emitter.emit("fit"), this.options.stabilization.onlyDynamicEdges === !0 && this._restoreFrozenNodes(), this.body.emitter.emit("stabilizationIterationsDone"), this.body.emitter.emit("_requestRedraw"), this.stabilized === !0 ? this._emitStabilized() : this.startSimulation(), this.ready = !0
                    }
                    }
                ]), t
            }();
            e["default"] = k, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = e, this.physicsBody = o, this.barnesHutTree, this.setOptions(n), this.randomSeed = 5
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t, this.thetaInversed = 1 / this.options.theta, this.overlapAvoidanceFactor = 1 - Math.max(0, Math.min(1, this.options.avoidOverlap))
                    }
                    },
                    {
                        key: "seededRandom", value: function () {
                        var t = 1e4 * Math.sin(this.randomSeed++);
                        return t - Math.floor(t)
                    }
                    },
                    {
                        key: "solve", value: function () {
                        if (0 !== this.options.gravitationalConstant && this.physicsBody.physicsNodeIndices.length > 0) {
                            var t = void 0, e = this.body.nodes, i = this.physicsBody.physicsNodeIndices, o = i.length, n = this._formBarnesHutTree(e, i);
                            this.barnesHutTree = n;
                            for (var s = 0; o > s; s++)t = e[i[s]], t.options.mass > 0 && (this._getForceContribution(n.root.children.NW, t), this._getForceContribution(n.root.children.NE, t), this._getForceContribution(n.root.children.SW, t), this._getForceContribution(n.root.children.SE, t))
                        }
                    }
                    },
                    {
                        key: "_getForceContribution", value: function (t, e) {
                        if (t.childrenCount > 0) {
                            var i = void 0, o = void 0, n = void 0;
                            i = t.centerOfMass.x - e.x, o = t.centerOfMass.y - e.y, n = Math.sqrt(i * i + o * o), n * t.calcSize > this.thetaInversed ? this._calculateForces(n, i, o, e, t) : 4 === t.childrenCount ? (this._getForceContribution(t.children.NW, e), this._getForceContribution(t.children.NE, e), this._getForceContribution(t.children.SW, e), this._getForceContribution(t.children.SE, e)) : t.children.data.id != e.id && this._calculateForces(n, i, o, e, t)
                        }
                    }
                    },
                    {
                        key: "_calculateForces", value: function (t, e, i, o, n) {
                        0 === t && (t = .1, e = t), this.overlapAvoidanceFactor < 1 && (t = Math.max(.1 + this.overlapAvoidanceFactor * o.shape.radius, t - o.shape.radius));
                        var s = this.options.gravitationalConstant * n.mass * o.options.mass / Math.pow(t, 3), r = e * s, a = i * s;
                        this.physicsBody.forces[o.id].x += r, this.physicsBody.forces[o.id].y += a
                    }
                    },
                    {
                        key: "_formBarnesHutTree", value: function (t, e) {
                        for (var i = void 0, o = e.length, n = t[e[0]].x, s = t[e[0]].y, r = t[e[0]].x, a = t[e[0]].y, h = 1; o > h; h++) {
                            var d = t[e[h]].x, l = t[e[h]].y;
                            t[e[h]].options.mass > 0 && (n > d && (n = d), d > r && (r = d), s > l && (s = l), l > a && (a = l))
                        }
                        var u = Math.abs(r - n) - Math.abs(a - s);
                        u > 0 ? (s -= .5 * u, a += .5 * u) : (n += .5 * u, r -= .5 * u);
                        var c = 1e-5, p = Math.max(c, Math.abs(r - n)), f = .5 * p, m = .5 * (n + r), v = .5 * (s + a), g = {
                            root: {
                                centerOfMass: {
                                    x: 0,
                                    y: 0
                                },
                                mass: 0,
                                range: {minX: m - f, maxX: m + f, minY: v - f, maxY: v + f},
                                size: p,
                                calcSize: 1 / p,
                                children: {data: null},
                                maxWidth: 0,
                                level: 0,
                                childrenCount: 4
                            }
                        };
                        this._splitBranch(g.root);
                        for (var h = 0; o > h; h++)i = t[e[h]], i.options.mass > 0 && this._placeInTree(g.root, i);
                        return g
                    }
                    },
                    {
                        key: "_updateBranchMass", value: function (t, e) {
                        var i = t.mass + e.options.mass, o = 1 / i;
                        t.centerOfMass.x = t.centerOfMass.x * t.mass + e.x * e.options.mass, t.centerOfMass.x *= o, t.centerOfMass.y = t.centerOfMass.y * t.mass + e.y * e.options.mass, t.centerOfMass.y *= o, t.mass = i;
                        var n = Math.max(Math.max(e.height, e.radius), e.width);
                        t.maxWidth = t.maxWidth < n ? n : t.maxWidth
                    }
                    },
                    {
                        key: "_placeInTree", value: function (t, e, i) {
                        (1 != i || void 0 === i) && this._updateBranchMass(t, e), t.children.NW.range.maxX > e.x ? t.children.NW.range.maxY > e.y ? this._placeInRegion(t, e, "NW") : this._placeInRegion(t, e, "SW") : t.children.NW.range.maxY > e.y ? this._placeInRegion(t, e, "NE") : this._placeInRegion(t, e, "SE")
                    }
                    },
                    {
                        key: "_placeInRegion", value: function (t, e, i) {
                        switch (t.children[i].childrenCount) {
                            case 0:
                                t.children[i].children.data = e, t.children[i].childrenCount = 1, this._updateBranchMass(t.children[i], e);
                                break;
                            case 1:
                                t.children[i].children.data.x === e.x && t.children[i].children.data.y === e.y ? (e.x += this.seededRandom(), e.y += this.seededRandom()) : (this._splitBranch(t.children[i]), this._placeInTree(t.children[i], e));
                                break;
                            case 4:
                                this._placeInTree(t.children[i], e)
                        }
                    }
                    },
                    {
                        key: "_splitBranch", value: function (t) {
                        var e = null;
                        1 === t.childrenCount && (e = t.children.data, t.mass = 0, t.centerOfMass.x = 0, t.centerOfMass.y = 0), t.childrenCount = 4, t.children.data = null, this._insertRegion(t, "NW"), this._insertRegion(t, "NE"), this._insertRegion(t, "SW"), this._insertRegion(t, "SE"), null != e && this._placeInTree(t, e)
                    }
                    },
                    {
                        key: "_insertRegion", value: function (t, e) {
                        var i = void 0, o = void 0, n = void 0, s = void 0, r = .5 * t.size;
                        switch (e) {
                            case"NW":
                                i = t.range.minX, o = t.range.minX + r, n = t.range.minY, s = t.range.minY + r;
                                break;
                            case"NE":
                                i = t.range.minX + r, o = t.range.maxX, n = t.range.minY, s = t.range.minY + r;
                                break;
                            case"SW":
                                i = t.range.minX, o = t.range.minX + r, n = t.range.minY + r, s = t.range.maxY;
                                break;
                            case"SE":
                                i = t.range.minX + r, o = t.range.maxX, n = t.range.minY + r, s = t.range.maxY
                        }
                        t.children[e] = {
                            centerOfMass: {x: 0, y: 0},
                            mass: 0,
                            range: {minX: i, maxX: o, minY: n, maxY: s},
                            size: .5 * t.size,
                            calcSize: 2 * t.calcSize,
                            children: {data: null},
                            maxWidth: 0,
                            level: t.level + 1,
                            childrenCount: 0
                        }
                    }
                    },
                    {
                        key: "_debug", value: function (t, e) {
                        void 0 !== this.barnesHutTree && (t.lineWidth = 1, this._drawBranch(this.barnesHutTree.root, t, e))
                    }
                    },
                    {
                        key: "_drawBranch", value: function (t, e, i) {
                        void 0 === i && (i = "#FF0000"), 4 === t.childrenCount && (this._drawBranch(t.children.NW, e), this._drawBranch(t.children.NE, e), this._drawBranch(t.children.SE, e), this._drawBranch(t.children.SW, e)), e.strokeStyle = i, e.beginPath(), e.moveTo(t.range.minX, t.range.minY), e.lineTo(t.range.maxX, t.range.minY), e.stroke(), e.beginPath(), e.moveTo(t.range.maxX, t.range.minY), e.lineTo(t.range.maxX, t.range.maxY), e.stroke(), e.beginPath(), e.moveTo(t.range.maxX, t.range.maxY), e.lineTo(t.range.minX, t.range.maxY), e.stroke(), e.beginPath(), e.moveTo(t.range.minX, t.range.maxY), e.lineTo(t.range.minX, t.range.minY), e.stroke()
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = e, this.physicsBody = o, this.setOptions(n)
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t
                    }
                    },
                    {
                        key: "solve", value: function () {
                        for (var t, e, i, o, n, s, r, a, h = this.body.nodes, d = this.physicsBody.physicsNodeIndices, l = this.physicsBody.forces, u = this.options.nodeDistance, c = -2 / 3 / u, p = 4 / 3, f = 0; f < d.length - 1; f++) {
                            r = h[d[f]];
                            for (var m = f + 1; m < d.length; m++)a = h[d[m]], t = a.x - r.x, e = a.y - r.y, i = Math.sqrt(t * t + e * e), 0 === i && (i = .1 * Math.random(), t = i), 2 * u > i && (s = .5 * u > i ? 1 : c * i + p, s /= i, o = t * s, n = e * s, l[r.id].x -= o, l[r.id].y -= n, l[a.id].x += o, l[a.id].y += n)
                        }
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = e, this.physicsBody = o, this.setOptions(n)
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t
                    }
                    },
                    {
                        key: "solve", value: function () {
                        var t, e, i, o, n, s, r, a, h, d, l = this.body.nodes, u = this.physicsBody.physicsNodeIndices, c = this.physicsBody.forces, p = this.options.nodeDistance;
                        for (h = 0; h < u.length - 1; h++)for (r = l[u[h]], d = h + 1; d < u.length; d++)if (a = l[u[d]], r.level === a.level) {
                            t = a.x - r.x, e = a.y - r.y, i = Math.sqrt(t * t + e * e);
                            var f = .05;
                            s = p > i ? -Math.pow(f * i, 2) + Math.pow(f * p, 2) : 0, 0 === i ? i = .01 : s /= i, o = t * s, n = e * s, c[r.id].x -= o, c[r.id].y -= n, c[a.id].x += o, c[a.id].y += n
                        }
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = e, this.physicsBody = o, this.setOptions(n)
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t
                    }
                    },
                    {
                        key: "solve", value: function () {
                        for (var t = void 0, e = void 0, i = this.physicsBody.physicsEdgeIndices, o = this.body.edges, n = void 0, s = void 0, r = void 0, a = 0; a < i.length; a++)e = o[i[a]], e.connected === !0 && e.toId !== e.fromId && void 0 !== this.body.nodes[e.toId] && void 0 !== this.body.nodes[e.fromId] && (void 0 !== e.edgeType.via ? (t = void 0 === e.options.length ? this.options.springLength : e.options.length, n = e.to, s = e.edgeType.via, r = e.from, this._calculateSpringForce(n, s, .5 * t), this._calculateSpringForce(s, r, .5 * t)) : (t = void 0 === e.options.length ? 1.5 * this.options.springLength : e.options.length, this._calculateSpringForce(e.from, e.to, t)))
                    }
                    },
                    {
                        key: "_calculateSpringForce", value: function (t, e, i) {
                        var o = t.x - e.x, n = t.y - e.y, s = Math.max(Math.sqrt(o * o + n * n), .01), r = this.options.springConstant * (i - s) / s, a = o * r, h = n * r;
                        void 0 !== this.physicsBody.forces[t.id] && (this.physicsBody.forces[t.id].x += a, this.physicsBody.forces[t.id].y += h), void 0 !== this.physicsBody.forces[e.id] && (this.physicsBody.forces[e.id].x -= a, this.physicsBody.forces[e.id].y -= h)
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = e, this.physicsBody = o, this.setOptions(n)
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t
                    }
                    },
                    {
                        key: "solve", value: function () {
                        for (var t, e, i, o, n, s, r, a, h = this.body.edges, d = .5, l = this.physicsBody.physicsEdgeIndices, u = this.physicsBody.physicsNodeIndices, c = this.physicsBody.forces, p = 0; p < u.length; p++) {
                            var f = u[p];
                            c[f].springFx = 0, c[f].springFy = 0
                        }
                        for (var p = 0; p < l.length; p++)e = h[l[p]], e.connected === !0 && (t = void 0 === e.options.length ? this.options.springLength : e.options.length, i = e.from.x - e.to.x, o = e.from.y - e.to.y, a = Math.sqrt(i * i + o * o), a = 0 === a ? .01 : a, r = this.options.springConstant * (t - a) / a, n = i * r, s = o * r, e.to.level != e.from.level ? (void 0 !== c[e.toId] && (c[e.toId].springFx -= n, c[e.toId].springFy -= s), void 0 !== c[e.fromId] && (c[e.fromId].springFx += n, c[e.fromId].springFy += s)) : (void 0 !== c[e.toId] && (c[e.toId].x -= d * n, c[e.toId].y -= d * s), void 0 !== c[e.fromId] && (c[e.fromId].x += d * n, c[e.fromId].y += d * s)));
                        for (var m, v, r = 1, p = 0; p < u.length; p++) {
                            var f = u[p];
                            m = Math.min(r, Math.max(-r, c[f].springFx)), v = Math.min(r, Math.max(-r, c[f].springFy)), c[f].x += m, c[f].y += v
                        }
                        for (var g = 0, y = 0, p = 0; p < u.length; p++) {
                            var f = u[p];
                            g += c[f].x, y += c[f].y
                        }
                        for (var b = g / u.length, w = y / u.length, p = 0; p < u.length; p++) {
                            var f = u[p];
                            c[f].x -= b, c[f].y -= w
                        }
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e, o, n) {
                    i(this, t), this.body = e, this.physicsBody = o, this.setOptions(n)
                }

                return o(t, [
                    {
                        key: "setOptions", value: function (t) {
                        this.options = t
                    }
                    },
                    {
                        key: "solve", value: function () {
                        for (var t = void 0, e = void 0, i = void 0, o = void 0, n = this.body.nodes, s = this.physicsBody.physicsNodeIndices, r = this.physicsBody.forces, a = 0; a < s.length; a++) {
                            var h = s[a];
                            o = n[h], t = -o.x, e = -o.y, i = Math.sqrt(t * t + e * e), this._calculateForces(i, t, e, r, o)
                        }
                    }
                    },
                    {
                        key: "_calculateForces", value: function (t, e, i, o, n) {
                        var s = 0 === t ? 0 : this.options.centralGravity / t;
                        o[n.id].x = e * s, o[n.id].y = i * s
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(91), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_calculateForces", value: function (t, e, i, o, n) {
                        0 === t && (t = .1 * Math.random(), e = t), this.overlapAvoidanceFactor < 1 && (t = Math.max(.1 + this.overlapAvoidanceFactor * o.shape.radius, t - o.shape.radius));
                        var s = o.edges.length + 1, r = this.options.gravitationalConstant * n.mass * o.options.mass * s / Math.pow(t, 2), a = e * r, h = i * r;
                        this.physicsBody.forces[o.id].x += a, this.physicsBody.forces[o.id].y += h
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), a = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, h = i(96), d = o(h), l = function (t) {
                function e(t, i, o) {
                    n(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o)
                }

                return s(e, t), r(e, [
                    {
                        key: "_calculateForces", value: function (t, e, i, o, n) {
                        if (t > 0) {
                            var s = n.edges.length + 1, r = this.options.centralGravity * s * n.options.mass;
                            o[n.id].x = e * r, o[n.id].y = i * r
                        }
                    }
                    }
                ]), e
            }(d["default"]);
            e["default"] = l, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(100), a = o(r), h = i(7), d = function () {
                function t(e) {
                    var i = this;
                    n(this, t), this.body = e, this.clusteredNodes = {}, this.options = {}, this.defaultOptions = {}, h.extend(this.options, this.defaultOptions), this.body.emitter.on("_resetData", function () {
                        i.clusteredNodes = {}
                    })
                }

                return s(t, [
                    {
                        key: "setOptions", value: function (t) {
                    }
                    },
                    {
                        key: "clusterByHubsize", value: function (t, e) {
                        void 0 === t ? t = this._getHubSize() : "object" == typeof t && (e = this._checkOptions(t), t = this._getHubSize());
                        for (var i = [], o = 0; o < this.body.nodeIndices.length; o++) {
                            var n = this.body.nodes[this.body.nodeIndices[o]];
                            n.edges.length >= t && i.push(n.id)
                        }
                        for (var o = 0; o < i.length; o++)this.clusterByConnection(i[o], e, !1);
                        this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "cluster", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                        if (void 0 === t.joinCondition)throw new Error("Cannot call clusterByNodeData without a joinCondition function in the options.");
                        t = this._checkOptions(t);
                        for (var i = {}, o = {}, n = 0; n < this.body.nodeIndices.length; n++) {
                            var s = this.body.nodeIndices[n], r = this.body.nodes[s], a = this._cloneOptions(r);
                            if (t.joinCondition(a) === !0) {
                                i[s] = this.body.nodes[s];
                                for (var h = 0; h < r.edges.length; h++) {
                                    var d = r.edges[h];
                                    o[d.id] = d
                                }
                            }
                        }
                        this._cluster(i, o, t, e)
                    }
                    },
                    {
                        key: "clusterOutliers", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
                        t = this._checkOptions(t);
                        for (var i = [], o = 0; o < this.body.nodeIndices.length; o++) {
                            for (var n = {}, s = {}, r = this.body.nodeIndices[o], a = 0, h = void 0, d = 0; d < this.body.nodes[r].edges.length; d++)this.body.nodes[r].edges[d].options.hidden === !1 && (a++, h = this.body.nodes[r].edges[d]);
                            if (1 === a) {
                                var l = this._getConnectedId(h, r);
                                if (l !== r) {
                                    if (void 0 === t.joinCondition) this._checkIfUsed(i, r, h.id) === !1 && this._checkIfUsed(i, l, h.id) === !1 && (s[h.id] = h, n[r] = this.body.nodes[r], n[l] = this.body.nodes[l]); else {
                                        var u = this._cloneOptions(this.body.nodes[r]);
                                        t.joinCondition(u) === !0 && this._checkIfUsed(i, r, h.id) === !1 && (s[h.id] = h, n[r] = this.body.nodes[r]), u = this._cloneOptions(this.body.nodes[l]), t.joinCondition(u) === !0 && this._checkIfUsed(i, r, h.id) === !1 && (s[h.id] = h, n[l] = this.body.nodes[l])
                                    }
                                    Object.keys(n).length > 0 && Object.keys(s).length > 0 && i.push({
                                        nodes: n,
                                        edges: s
                                    })
                                }
                            }
                        }
                        for (var o = 0; o < i.length; o++)this._cluster(i[o].nodes, i[o].edges, t, !1);
                        e === !0 && this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "_checkIfUsed", value: function (t, e, i) {
                        for (var o = 0; o < t.length; o++) {
                            var n = t[o];
                            if (void 0 !== n.nodes[e] || void 0 !== n.edges[i])return !0
                        }
                        return !1
                    }
                    },
                    {
                        key: "clusterByConnection", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2];
                        if (void 0 === t)throw new Error("No nodeId supplied to clusterByConnection!");
                        if (void 0 === this.body.nodes[t])throw new Error("The nodeId given to clusterByConnection does not exist!");
                        var o = this.body.nodes[t];
                        e = this._checkOptions(e, o), void 0 === e.clusterNodeProperties.x && (e.clusterNodeProperties.x = o.x), void 0 === e.clusterNodeProperties.y && (e.clusterNodeProperties.y = o.y), void 0 === e.clusterNodeProperties.fixed && (e.clusterNodeProperties.fixed = {}, e.clusterNodeProperties.fixed.x = o.options.fixed.x, e.clusterNodeProperties.fixed.y = o.options.fixed.y);
                        var n = {}, s = {}, r = o.id, a = this._cloneOptions(o);
                        n[r] = o;
                        for (var h = 0; h < o.edges.length; h++) {
                            var d = o.edges[h], l = this._getConnectedId(d, r);
                            if (l !== r)if (void 0 === e.joinCondition) s[d.id] = d, n[l] = this.body.nodes[l]; else {
                                var u = this._cloneOptions(this.body.nodes[l]);
                                e.joinCondition(a, u) === !0 && (s[d.id] = d, n[l] = this.body.nodes[l])
                            } else s[d.id] = d
                        }
                        this._cluster(n, s, e, i)
                    }
                    },
                    {
                        key: "_cloneOptions", value: function (t, e) {
                        var i = {};
                        return void 0 === e || "node" === e ? (h.deepExtend(i, t.options, !0), i.x = t.x, i.y = t.y, i.amountOfConnections = t.edges.length) : h.deepExtend(i, t.options, !0), i
                    }
                    },
                    {
                        key: "_createClusterEdges", value: function (t, e, i, o, n) {
                        for (var s = void 0, r = void 0, a = void 0, d = void 0, l = void 0, u = void 0, c = Object.keys(t), p = 0; p < c.length; p++) {
                            r = c[p], a = t[r];
                            for (var f = 0; f < a.edges.length; f++)if (s = a.edges[f], e[s.id] = s, s.toId == r ? (d = o.id, l = s.fromId, u = l) : (d = s.toId, l = o.id, u = d), void 0 === t[u]) {
                                var m = this._cloneOptions(s, "edge");
                                h.deepExtend(m, n), m.from = l, m.to = d, m.id = "clusterEdge:" + h.randomUUID(), i.push(this.body.functions.createEdge(m))
                            }
                        }
                    }
                    },
                    {
                        key: "_checkOptions", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        return void 0 === t.clusterEdgeProperties && (t.clusterEdgeProperties = {}), void 0 === t.clusterNodeProperties && (t.clusterNodeProperties = {}), t
                    }
                    },
                    {
                        key: "_cluster", value: function (t, e, i) {
                        var o = arguments.length <= 3 || void 0 === arguments[3] ? !0 : arguments[3];
                        if (0 !== Object.keys(t).length) {
                            var n = h.deepExtend({}, i.clusterNodeProperties);
                            if (void 0 !== i.processProperties) {
                                var s = [];
                                for (var r in t) {
                                    var d = this._cloneOptions(t[r]);
                                    s.push(d)
                                }
                                var l = [];
                                for (var u in e)if ("clusterEdge:" !== u.substr(0, 12)) {
                                    var d = this._cloneOptions(e[u], "edge");
                                    l.push(d)
                                }
                                if (n = i.processProperties(n, s, l), !n)throw new Error("The processProperties function does not return properties!")
                            }
                            void 0 === n.id && (n.id = "cluster:" + h.randomUUID());
                            var c = n.id;
                            void 0 === n.label && (n.label = "cluster");
                            var p = void 0;
                            void 0 === n.x && (p = this._getClusterPosition(t), n.x = p.x), void 0 === n.y && (void 0 === p && (p = this._getClusterPosition(t)), n.y = p.y), n.id = c;
                            var f = this.body.functions.createNode(n, a["default"]);
                            f.isCluster = !0, f.containedNodes = t, f.containedEdges = e, f.clusterEdgeProperties = i.clusterEdgeProperties, this.body.nodes[n.id] = f;
                            var m = [];
                            this._createClusterEdges(t, e, m, n, i.clusterEdgeProperties);
                            for (var u in e)if (e.hasOwnProperty(u) && void 0 !== this.body.edges[u]) {
                                var v = this.body.edges[u];
                                "clusterEdge:" === u.substr(0, 12) && void 0 !== t[v.fromId] && void 0 !== t[v.toId] ? (v.cleanup(), v.disconnect(), delete e[u], delete this.body.edges[u]) : v.setOptions({
                                        physics: !1,
                                        hidden: !0
                                    })
                            }
                            for (var r in t)t.hasOwnProperty(r) && (this.clusteredNodes[r] = {
                                clusterId: n.id,
                                node: this.body.nodes[r]
                            }, this.body.nodes[r].setOptions({hidden: !0, physics: !1}));
                            for (var g = 0; g < m.length; g++)this.body.edges[m[g].id] = m[g], this.body.edges[m[g].id].connect();
                            n.id = void 0, o === !0 && this.body.emitter.emit("_dataChanged")
                        }
                    }
                    },
                    {
                        key: "isCluster", value: function (t) {
                        return void 0 !== this.body.nodes[t] ? this.body.nodes[t].isCluster === !0 : (console.log("Node does not exist."), !1)
                    }
                    },
                    {
                        key: "_getClusterPosition", value: function (t) {
                        for (var e = Object.keys(t), i = t[e[0]].x, o = t[e[0]].x, n = t[e[0]].y, s = t[e[0]].y, r = void 0, a = 1; a < e.length; a++)r = t[e[a]], i = r.x < i ? r.x : i, o = r.x > o ? r.x : o, n = r.y < n ? r.y : n, s = r.y > s ? r.y : s;
                        return {x: .5 * (i + o), y: .5 * (n + s)}
                    }
                    },
                    {
                        key: "openCluster", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !0 : arguments[2];
                        if (void 0 === t)throw new Error("No clusterNodeId supplied to openCluster.");
                        if (void 0 === this.body.nodes[t])throw new Error("The clusterNodeId supplied to openCluster does not exist.");
                        if (void 0 === this.body.nodes[t].containedNodes)return void console.log("The node:" + t + " is not a cluster.");
                        var o = this.body.nodes[t], n = o.containedNodes, s = o.containedEdges;
                        if (void 0 !== e && void 0 !== e.releaseFunction && "function" == typeof e.releaseFunction) {
                            var r = {}, a = {x: o.x, y: o.y};
                            for (var d in n)if (n.hasOwnProperty(d)) {
                                var l = this.body.nodes[d];
                                r[d] = {x: l.x, y: l.y}
                            }
                            var u = e.releaseFunction(a, r);
                            for (var d in n)if (n.hasOwnProperty(d)) {
                                var l = this.body.nodes[d];
                                void 0 !== u[d] && (l.x = u[d].x || o.x, l.y = u[d].y || o.y)
                            }
                        } else for (var d in n)if (n.hasOwnProperty(d)) {
                            var l = this.body.nodes[d];
                            l = n[d], l.x = o.x, l.y = o.y
                        }
                        for (var d in n)if (n.hasOwnProperty(d)) {
                            var l = this.body.nodes[d];
                            l.vx = o.vx, l.vy = o.vy, l.setOptions({
                                hidden: !1,
                                physics: !0
                            }), delete this.clusteredNodes[d]
                        }
                        for (var c in s)if (s.hasOwnProperty(c)) {
                            var p = s[c];
                            if (void 0 === this.body.nodes[p.fromId] || void 0 === this.body.nodes[p.toId] || p.toId == t || p.fromId == t) p.cleanup(), p.disconnect(), delete this.body.edges[c]; else if (void 0 !== this.clusteredNodes[p.fromId] || void 0 !== this.clusteredNodes[p.toId]) {
                                var f = void 0, m = void 0, v = this.clusteredNodes[p.fromId] || this.clusteredNodes[p.toId], g = v.clusterId, y = this.body.nodes[g];
                                if (y.containedEdges[c] = p, void 0 !== this.clusteredNodes[p.fromId] ? (f = g, m = p.toId) : (f = p.fromId, m = g), this.body.nodes[f].options.hidden !== !0 && this.body.nodes[m].options.hidden !== !0) {
                                    var b = this._cloneOptions(p, "edge"), w = "clusterEdge:" + h.randomUUID();
                                    h.deepExtend(b, y.clusterEdgeProperties), h.deepExtend(b, {
                                        from: f,
                                        to: m,
                                        hidden: !1,
                                        physics: !0,
                                        id: w
                                    });
                                    var _ = this.body.functions.createEdge(b);
                                    this.body.edges[w] = _, this.body.edges[w].connect()
                                }
                            } else p.setOptions({physics: !0, hidden: !1})
                        }
                        for (var x = [], k = 0; k < o.edges.length; k++) {
                            var c = o.edges[k].id;
                            x.push(c)
                        }
                        for (var k = 0; k < x.length; k++) {
                            var c = x[k];
                            this.body.edges[c].cleanup(), this.body.edges[c].disconnect(), delete this.body.edges[c]
                        }
                        this.body.nodes[t].cleanup(), delete this.body.nodes[t], i === !0 && this.body.emitter.emit("_dataChanged")
                    }
                    },
                    {
                        key: "getNodesInCluster", value: function (t) {
                        var e = [];
                        if (this.isCluster(t) === !0) {
                            var i = this.body.nodes[t].containedNodes;
                            for (var o in i)i.hasOwnProperty(o) && e.push(o)
                        }
                        return e
                    }
                    },
                    {
                        key: "findNode", value: function (t) {
                        for (var e = [], i = 100, o = 0; void 0 !== this.clusteredNodes[t] && i > o;)e.push(this.clusteredNodes[t].node), t = this.clusteredNodes[t].clusterId, o++;
                        return e.push(this.body.nodes[t]), e
                    }
                    },
                    {
                        key: "_getConnectedId", value: function (t, e) {
                        return t.toId != e ? t.toId : t.fromId != e ? t.fromId : t.fromId
                    }
                    },
                    {
                        key: "_getHubSize", value: function () {
                        for (var t = 0, e = 0, i = 0, o = 0, n = 0; n < this.body.nodeIndices.length; n++) {
                            var s = this.body.nodes[this.body.nodeIndices[n]];
                            s.edges.length > o && (o = s.edges.length), t += s.edges.length, e += Math.pow(s.edges.length, 2), i += 1
                        }
                        t /= i, e /= i;
                        var r = e - Math.pow(t, 2), a = Math.sqrt(r), h = Math.floor(t + 2 * a);
                        return h > o && (h = o), h
                    }
                    }
                ]), t
            }();
            e["default"] = d, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            function s(t, e) {
                if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (t.__proto__ = e)
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = function (t, e, i) {
                for (var o = !0; o;) {
                    var n = t, s = e, r = i;
                    a = d = h = void 0, o = !1, null === n && (n = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(n, s);
                    if (void 0 !== a) {
                        if ("value" in a)return a.value;
                        var h = a.get;
                        return void 0 === h ? void 0 : h.call(r)
                    }
                    var d = Object.getPrototypeOf(n);
                    if (null === d)return void 0;
                    t = d, e = s, i = r, o = !0
                }
            }, a = i(62), h = o(a), d = function (t) {
                function e(t, i, o, s, a) {
                    n(this, e), r(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, i, o, s, a), this.isCluster = !0, this.containedNodes = {}, this.containedEdges = {}
                }

                return s(e, t), e
            }(h["default"]);
            e["default"] = d, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }();
            "undefined" != typeof window && (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame);
            var s = i(7), r = function () {
                function t(e, i) {
                    o(this, t), this.body = e, this.canvas = i, this.redrawRequested = !1, this.renderTimer = void 0, this.requiresTimeout = !0, this.renderingActive = !1, this.renderRequests = 0, this.pixelRatio = void 0, this.allowRedraw = !0, this.dragging = !1, this.options = {}, this.defaultOptions = {
                        hideEdgesOnDrag: !1,
                        hideNodesOnDrag: !1
                    }, s.extend(this.options, this.defaultOptions), this._determineBrowserMethod(), this.bindEventListeners()
                }

                return n(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.on("dragStart", function () {
                            t.dragging = !0
                        }), this.body.emitter.on("dragEnd", function () {
                            return t.dragging = !1
                        }), this.body.emitter.on("_resizeNodes", function () {
                            return t._resizeNodes()
                        }), this.body.emitter.on("_redraw", function () {
                            t.renderingActive === !1 && t._redraw()
                        }), this.body.emitter.on("_blockRedraw", function () {
                            t.allowRedraw = !1
                        }), this.body.emitter.on("_allowRedraw", function () {
                            t.allowRedraw = !0, t.redrawRequested = !1
                        }), this.body.emitter.on("_requestRedraw", this._requestRedraw.bind(this)), this.body.emitter.on("_startRendering", function () {
                            t.renderRequests += 1, t.renderingActive = !0, t._startRendering()
                        }), this.body.emitter.on("_stopRendering", function () {
                            t.renderRequests -= 1, t.renderingActive = t.renderRequests > 0, t.renderTimer = void 0
                        }), this.body.emitter.on("destroy", function () {
                            t.renderRequests = 0, t.allowRedraw = !1, t.renderingActive = !1, t.requiresTimeout === !0 ? clearTimeout(t.renderTimer) : cancelAnimationFrame(t.renderTimer), t.body.emitter.off()
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        if (void 0 !== t) {
                            var e = ["hideEdgesOnDrag", "hideNodesOnDrag"];
                            s.selectiveDeepExtend(e, this.options, t)
                        }
                    }
                    },
                    {
                        key: "_startRendering", value: function () {
                        this.renderingActive === !0 && void 0 === this.renderTimer && (this.requiresTimeout === !0 ? this.renderTimer = window.setTimeout(this._renderStep.bind(this), this.simulationInterval) : this.renderTimer = window.requestAnimationFrame(this._renderStep.bind(this)))
                    }
                    },
                    {
                        key: "_renderStep", value: function () {
                        this.renderingActive === !0 && (this.renderTimer = void 0, this.requiresTimeout === !0 && this._startRendering(), this._redraw(), this.requiresTimeout === !1 && this._startRendering())
                    }
                    },
                    {
                        key: "redraw", value: function () {
                        this.body.emitter.emit("setSize"), this._redraw()
                    }
                    },
                    {
                        key: "_requestRedraw", value: function () {
                        var t = this;
                        this.redrawRequested !== !0 && this.renderingActive === !1 && this.allowRedraw === !0 && (this.redrawRequested = !0, this.requiresTimeout === !0 ? window.setTimeout(function () {
                                t._redraw(!1)
                            }, 0) : window.requestAnimationFrame(function () {
                                t._redraw(!1)
                            }))
                    }
                    },
                    {
                        key: "_redraw", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                        if (this.allowRedraw === !0) {
                            this.body.emitter.emit("initRedraw"), this.redrawRequested = !1;
                            var e = this.canvas.frame.canvas.getContext("2d");
                            (0 === this.canvas.frame.canvas.width || 0 === this.canvas.frame.canvas.height) && this.canvas.setSize(), void 0 === this.pixelRatio && (this.pixelRatio = (window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1)), e.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
                            var i = this.canvas.frame.canvas.clientWidth, o = this.canvas.frame.canvas.clientHeight;
                            e.clearRect(0, 0, i, o), e.save(), e.translate(this.body.view.translation.x, this.body.view.translation.y), e.scale(this.body.view.scale, this.body.view.scale), e.beginPath(), this.body.emitter.emit("beforeDrawing", e), e.closePath(), t === !1 && (this.dragging === !1 || this.dragging === !0 && this.options.hideEdgesOnDrag === !1) && this._drawEdges(e), (this.dragging === !1 || this.dragging === !0 && this.options.hideNodesOnDrag === !1) && this._drawNodes(e, t), this.controlNodesActive === !0 && this._drawControlNodes(e), e.beginPath(), this.body.emitter.emit("afterDrawing", e), e.closePath(), e.restore(), t === !0 && e.clearRect(0, 0, i, o)
                        }
                    }
                    },
                    {
                        key: "_resizeNodes", value: function () {
                        var t = this.canvas.frame.canvas.getContext("2d");
                        void 0 === this.pixelRatio && (this.pixelRatio = (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)), t.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), t.save(), t.translate(this.body.view.translation.x, this.body.view.translation.y), t.scale(this.body.view.scale, this.body.view.scale);
                        var e = this.body.nodes, i = void 0;
                        for (var o in e)e.hasOwnProperty(o) && (i = e[o], i.resize(t), i.updateBoundingBox(t, i.selected));
                        t.restore()
                    }
                    },
                    {
                        key: "_drawNodes", value: function (t) {
                        for (var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], i = this.body.nodes, o = this.body.nodeIndices, n = void 0, s = [], r = 20, a = this.canvas.DOMtoCanvas({
                            x: -r,
                            y: -r
                        }), h = this.canvas.DOMtoCanvas({
                            x: this.canvas.frame.canvas.clientWidth + r,
                            y: this.canvas.frame.canvas.clientHeight + r
                        }), d = {
                            top: a.y,
                            left: a.x,
                            bottom: h.y,
                            right: h.x
                        }, l = 0; l < o.length; l++)n = i[o[l]], n.isSelected() ? s.push(o[l]) : e === !0 ? n.draw(t) : n.isBoundingBoxOverlappingWith(d) === !0 ? n.draw(t) : n.updateBoundingBox(t, n.selected);
                        for (var l = 0; l < s.length; l++)n = i[s[l]], n.draw(t)
                    }
                    },
                    {
                        key: "_drawEdges", value: function (t) {
                        for (var e = this.body.edges, i = this.body.edgeIndices, o = void 0, n = 0; n < i.length; n++)o = e[i[n]], o.connected === !0 && o.draw(t)
                    }
                    },
                    {
                        key: "_drawControlNodes", value: function (t) {
                        for (var e = this.body.edges, i = this.body.edgeIndices, o = void 0, n = 0; n < i.length; n++)o = e[i[n]], o._drawControlNodes(t)
                    }
                    },
                    {
                        key: "_determineBrowserMethod", value: function () {
                        if ("undefined" != typeof window) {
                            var t = navigator.userAgent.toLowerCase();
                            this.requiresTimeout = !1, -1 != t.indexOf("msie 9.0") ? this.requiresTimeout = !0 : -1 != t.indexOf("safari") && t.indexOf("chrome") <= -1 && (this.requiresTimeout = !0)
                        } else this.requiresTimeout = !0
                    }
                    }
                ]), t
            }();
            e["default"] = r, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(3), r = i(27), a = i(7), h = function () {
                function t(e) {
                    o(this, t), this.body = e, this.pixelRatio = 1, this.resizeTimer = void 0, this.resizeFunction = this._onResize.bind(this), this.options = {}, this.defaultOptions = {
                        autoResize: !0,
                        height: "100%",
                        width: "100%"
                    }, a.extend(this.options, this.defaultOptions), this.bindEventListeners()
                }

                return n(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.once("resize", function (e) {
                            0 !== e.width && (t.body.view.translation.x = .5 * e.width), 0 !== e.height && (t.body.view.translation.y = .5 * e.height)
                        }), this.body.emitter.on("setSize", this.setSize.bind(this)), this.body.emitter.on("destroy", function () {
                            t.hammerFrame.destroy(), t.hammer.destroy(), t._cleanUp()
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        var e = this;
                        if (void 0 !== t) {
                            var i = ["width", "height", "autoResize"];
                            a.selectiveDeepExtend(i, this.options, t)
                        }
                        this.options.autoResize === !0 && (this._cleanUp(), this.resizeTimer = setInterval(function () {
                            var t = e.setSize();
                            t === !0 && e.body.emitter.emit("_requestRedraw")
                        }, 1e3), this.resizeFunction = this._onResize.bind(this), a.addEventListener(window, "resize", this.resizeFunction))
                    }
                    },
                    {
                        key: "_cleanUp", value: function () {
                        void 0 !== this.resizeTimer && clearInterval(this.resizeTimer), a.removeEventListener(window, "resize", this.resizeFunction), this.resizeFunction = void 0
                    }
                    },
                    {
                        key: "_onResize", value: function () {
                        this.setSize(), this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "_prepareValue", value: function (t) {
                        if ("number" == typeof t)return t + "px";
                        if ("string" == typeof t) {
                            if (-1 !== t.indexOf("%") || -1 !== t.indexOf("px"))return t;
                            if (-1 === t.indexOf("%"))return t + "px"
                        }
                        throw new Error("Could not use the value supplie for width or height:" + t)
                    }
                    },
                    {
                        key: "_create", value: function () {
                        for (; this.body.container.hasChildNodes();)this.body.container.removeChild(this.body.container.firstChild);
                        if (this.frame = document.createElement("div"), this.frame.className = "vis-network", this.frame.style.position = "relative", this.frame.style.overflow = "hidden", this.frame.tabIndex = 900, this.frame.canvas = document.createElement("canvas"), this.frame.canvas.style.position = "relative", this.frame.appendChild(this.frame.canvas), this.frame.canvas.getContext) {
                            var t = this.frame.canvas.getContext("2d");
                            this.pixelRatio = (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1), this.frame.canvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0)
                        } else {
                            var e = document.createElement("DIV");
                            e.style.color = "red", e.style.fontWeight = "bold", e.style.padding = "10px", e.innerHTML = "Error: your browser does not support HTML canvas", this.frame.canvas.appendChild(e)
                        }
                        this.body.container.appendChild(this.frame), this.body.view.scale = 1, this.body.view.translation = {
                            x: .5 * this.frame.canvas.clientWidth,
                            y: .5 * this.frame.canvas.clientHeight
                        }, this._bindHammer()
                    }
                    },
                    {
                        key: "_bindHammer", value: function () {
                        var t = this;
                        void 0 !== this.hammer && this.hammer.destroy(), this.drag = {}, this.pinch = {}, this.hammer = new s(this.frame.canvas), this.hammer.get("pinch").set({enable: !0}), this.hammer.get("pan").set({
                            threshold: 5,
                            direction: 30
                        }), r.onTouch(this.hammer, function (e) {
                            t.body.eventListeners.onTouch(e)
                        }), this.hammer.on("tap", function (e) {
                            t.body.eventListeners.onTap(e)
                        }), this.hammer.on("doubletap", function (e) {
                            t.body.eventListeners.onDoubleTap(e)
                        }), this.hammer.on("press", function (e) {
                            t.body.eventListeners.onHold(e)
                        }), this.hammer.on("panstart", function (e) {
                            t.body.eventListeners.onDragStart(e)
                        }), this.hammer.on("panmove", function (e) {
                            t.body.eventListeners.onDrag(e)
                        }), this.hammer.on("panend", function (e) {
                            t.body.eventListeners.onDragEnd(e)
                        }), this.hammer.on("pinch", function (e) {
                            t.body.eventListeners.onPinch(e)
                        }), this.frame.canvas.addEventListener("mousewheel", function (e) {
                            t.body.eventListeners.onMouseWheel(e)
                        }), this.frame.canvas.addEventListener("DOMMouseScroll", function (e) {
                            t.body.eventListeners.onMouseWheel(e)
                        }), this.frame.canvas.addEventListener("mousemove", function (e) {
                            t.body.eventListeners.onMouseMove(e)
                        }), this.frame.canvas.addEventListener("contextmenu", function (e) {
                            t.body.eventListeners.onContext(e)
                        }), this.hammerFrame = new s(this.frame), r.onRelease(this.hammerFrame, function (e) {
                            t.body.eventListeners.onRelease(e)
                        })
                    }
                    },
                    {
                        key: "setSize", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? this.options.width : arguments[0], e = arguments.length <= 1 || void 0 === arguments[1] ? this.options.height : arguments[1];
                        t = this._prepareValue(t), e = this._prepareValue(e);
                        var i = !1, o = this.frame.canvas.width, n = this.frame.canvas.height;
                        return t != this.options.width || e != this.options.height || this.frame.style.width != t || this.frame.style.height != e ? (this.frame.style.width = t, this.frame.style.height = e, this.frame.canvas.style.width = "100%", this.frame.canvas.style.height = "100%", this.frame.canvas.width = Math.round(this.frame.canvas.clientWidth * this.pixelRatio), this.frame.canvas.height = Math.round(this.frame.canvas.clientHeight * this.pixelRatio), this.options.width = t, this.options.height = e, i = !0) : (this.frame.canvas.width != Math.round(this.frame.canvas.clientWidth * this.pixelRatio) && (this.frame.canvas.width = Math.round(this.frame.canvas.clientWidth * this.pixelRatio), i = !0), this.frame.canvas.height != Math.round(this.frame.canvas.clientHeight * this.pixelRatio) && (this.frame.canvas.height = Math.round(this.frame.canvas.clientHeight * this.pixelRatio), i = !0)), i === !0 && this.body.emitter.emit("resize", {
                            width: Math.round(this.frame.canvas.width / this.pixelRatio),
                            height: Math.round(this.frame.canvas.height / this.pixelRatio),
                            oldWidth: Math.round(o / this.pixelRatio),
                            oldHeight: Math.round(n / this.pixelRatio)
                        }), i
                    }
                    },
                    {
                        key: "_XconvertDOMtoCanvas", value: function (t) {
                        return (t - this.body.view.translation.x) / this.body.view.scale
                    }
                    },
                    {
                        key: "_XconvertCanvasToDOM", value: function (t) {
                        return t * this.body.view.scale + this.body.view.translation.x
                    }
                    },
                    {
                        key: "_YconvertDOMtoCanvas", value: function (t) {
                        return (t - this.body.view.translation.y) / this.body.view.scale
                    }
                    },
                    {
                        key: "_YconvertCanvasToDOM", value: function (t) {
                        return t * this.body.view.scale + this.body.view.translation.y
                    }
                    },
                    {
                        key: "canvasToDOM", value: function (t) {
                        return {x: this._XconvertCanvasToDOM(t.x), y: this._YconvertCanvasToDOM(t.y)}
                    }
                    },
                    {
                        key: "DOMtoCanvas", value: function (t) {
                        return {x: this._XconvertDOMtoCanvas(t.x), y: this._YconvertDOMtoCanvas(t.y)}
                    }
                    }
                ]), t
            }();
            e["default"] = h, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(7), r = function () {
                function t(e, i) {
                    var n = this;
                    o(this, t), this.body = e, this.canvas = i, this.animationSpeed = 1 / this.renderRefreshRate, this.animationEasingFunction = "easeInOutQuint", this.easingTime = 0, this.sourceScale = 0, this.targetScale = 0, this.sourceTranslation = 0, this.targetTranslation = 0, this.lockedOnNodeId = void 0, this.lockedOnNodeOffset = void 0, this.touchTime = 0, this.viewFunction = void 0, this.body.emitter.on("fit", this.fit.bind(this)), this.body.emitter.on("animationFinished", function () {
                        n.body.emitter.emit("_stopRendering")
                    }), this.body.emitter.on("unlockNode", this.releaseNode.bind(this))
                }

                return n(t, [
                    {
                        key: "setOptions", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.options = t
                    }
                    },
                    {
                        key: "_getRange", value: function () {
                        var t, e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0], i = 1e9, o = -1e9, n = 1e9, s = -1e9;
                        if (e.length > 0)for (var r = 0; r < e.length; r++)t = this.body.nodes[e[r]], n > t.shape.boundingBox.left && (n = t.shape.boundingBox.left), s < t.shape.boundingBox.right && (s = t.shape.boundingBox.right), i > t.shape.boundingBox.top && (i = t.shape.boundingBox.top), o < t.shape.boundingBox.bottom && (o = t.shape.boundingBox.bottom); else for (var r = 0; r < this.body.nodeIndices.length; r++)t = this.body.nodes[this.body.nodeIndices[r]], n > t.shape.boundingBox.left && (n = t.shape.boundingBox.left), s < t.shape.boundingBox.right && (s = t.shape.boundingBox.right), i > t.shape.boundingBox.top && (i = t.shape.boundingBox.top), o < t.shape.boundingBox.bottom && (o = t.shape.boundingBox.bottom);
                        return 1e9 === n && -1e9 === s && 1e9 === i && -1e9 === o && (i = 0, o = 0, n = 0, s = 0), {
                            minX: n,
                            maxX: s,
                            minY: i,
                            maxY: o
                        }
                    }
                    },
                    {
                        key: "_findCenter", value: function (t) {
                        return {x: .5 * (t.maxX + t.minX), y: .5 * (t.maxY + t.minY)}
                    }
                    },
                    {
                        key: "fit", value: function () {
                        var t, e, i = arguments.length <= 0 || void 0 === arguments[0] ? {nodes: []} : arguments[0], o = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
                        if (o === !0) {
                            var n = 0;
                            for (var s in this.body.nodes)if (this.body.nodes.hasOwnProperty(s)) {
                                var r = this.body.nodes[s];
                                r.predefinedPosition === !0 && (n += 1)
                            }
                            if (n > .5 * this.body.nodeIndices.length)return void this.fit(i, !1);
                            t = this._getRange(i.nodes);
                            var a = this.body.nodeIndices.length;
                            e = 12.662 / (a + 7.4147) + .0964822;
                            var h = Math.min(this.canvas.frame.canvas.clientWidth / 600, this.canvas.frame.canvas.clientHeight / 600);
                            e *= h
                        } else {
                            this.body.emitter.emit("_resizeNodes"), t = this._getRange(i.nodes);
                            var d = 1.1 * Math.abs(t.maxX - t.minX), l = 1.1 * Math.abs(t.maxY - t.minY), u = this.canvas.frame.canvas.clientWidth / d, c = this.canvas.frame.canvas.clientHeight / l;
                            e = c >= u ? u : c
                        }
                        e > 1 ? e = 1 : 0 === e && (e = 1);
                        var p = this._findCenter(t), f = {position: p, scale: e, animation: i.animation};
                        this.moveTo(f)
                    }
                    },
                    {
                        key: "focus",
                        value: function (t) {
                            var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                            if (void 0 !== this.body.nodes[t]) {
                                var i = {x: this.body.nodes[t].x, y: this.body.nodes[t].y};
                                e.position = i, e.lockedOnNode = t, this.moveTo(e)
                            } else console.log("Node: " + t + " cannot be found.")
                        }
                    },
                    {
                        key: "moveTo", value: function (t) {
                        return void 0 === t ? void(t = {}) : (void 0 === t.offset && (t.offset = {
                                x: 0,
                                y: 0
                            }), void 0 === t.offset.x && (t.offset.x = 0), void 0 === t.offset.y && (t.offset.y = 0), void 0 === t.scale && (t.scale = this.body.view.scale), void 0 === t.position && (t.position = this.getViewPosition()), void 0 === t.animation && (t.animation = {duration: 0}), t.animation === !1 && (t.animation = {duration: 0}), t.animation === !0 && (t.animation = {}), void 0 === t.animation.duration && (t.animation.duration = 1e3), void 0 === t.animation.easingFunction && (t.animation.easingFunction = "easeInOutQuad"), void this.animateView(t))
                    }
                    },
                    {
                        key: "animateView", value: function (t) {
                        if (void 0 !== t) {
                            this.animationEasingFunction = t.animation.easingFunction, this.releaseNode(), t.locked === !0 && (this.lockedOnNodeId = t.lockedOnNode, this.lockedOnNodeOffset = t.offset), 0 != this.easingTime && this._transitionRedraw(!0), this.sourceScale = this.body.view.scale, this.sourceTranslation = this.body.view.translation, this.targetScale = t.scale, this.body.view.scale = this.targetScale;
                            var e = this.canvas.DOMtoCanvas({
                                x: .5 * this.canvas.frame.canvas.clientWidth,
                                y: .5 * this.canvas.frame.canvas.clientHeight
                            }), i = {x: e.x - t.position.x, y: e.y - t.position.y};
                            this.targetTranslation = {
                                x: this.sourceTranslation.x + i.x * this.targetScale + t.offset.x,
                                y: this.sourceTranslation.y + i.y * this.targetScale + t.offset.y
                            }, 0 === t.animation.duration ? void 0 != this.lockedOnNodeId ? (this.viewFunction = this._lockedRedraw.bind(this), this.body.emitter.on("initRedraw", this.viewFunction)) : (this.body.view.scale = this.targetScale, this.body.view.translation = this.targetTranslation, this.body.emitter.emit("_requestRedraw")) : (this.animationSpeed = 1 / (60 * t.animation.duration * .001) || 1 / 60, this.animationEasingFunction = t.animation.easingFunction, this.viewFunction = this._transitionRedraw.bind(this), this.body.emitter.on("initRedraw", this.viewFunction), this.body.emitter.emit("_startRendering"))
                        }
                    }
                    },
                    {
                        key: "_lockedRedraw", value: function () {
                        var t = {
                            x: this.body.nodes[this.lockedOnNodeId].x,
                            y: this.body.nodes[this.lockedOnNodeId].y
                        }, e = this.canvas.DOMtoCanvas({
                            x: .5 * this.canvas.frame.canvas.clientWidth,
                            y: .5 * this.canvas.frame.canvas.clientHeight
                        }), i = {
                            x: e.x - t.x,
                            y: e.y - t.y
                        }, o = this.body.view.translation, n = {
                            x: o.x + i.x * this.body.view.scale + this.lockedOnNodeOffset.x,
                            y: o.y + i.y * this.body.view.scale + this.lockedOnNodeOffset.y
                        };
                        this.body.view.translation = n
                    }
                    },
                    {
                        key: "releaseNode", value: function () {
                        void 0 !== this.lockedOnNodeId && void 0 !== this.viewFunction && (this.body.emitter.off("initRedraw", this.viewFunction), this.lockedOnNodeId = void 0, this.lockedOnNodeOffset = void 0)
                    }
                    },
                    {
                        key: "_transitionRedraw", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                        this.easingTime += this.animationSpeed, this.easingTime = t === !0 ? 1 : this.easingTime;
                        var e = s.easingFunctions[this.animationEasingFunction](this.easingTime);
                        this.body.view.scale = this.sourceScale + (this.targetScale - this.sourceScale) * e, this.body.view.translation = {
                            x: this.sourceTranslation.x + (this.targetTranslation.x - this.sourceTranslation.x) * e,
                            y: this.sourceTranslation.y + (this.targetTranslation.y - this.sourceTranslation.y) * e
                        }, this.easingTime >= 1 && (this.body.emitter.off("initRedraw", this.viewFunction), this.easingTime = 0, void 0 != this.lockedOnNodeId && (this.viewFunction = this._lockedRedraw.bind(this), this.body.emitter.on("initRedraw", this.viewFunction)), this.body.emitter.emit("animationFinished"))
                    }
                    },
                    {
                        key: "getScale", value: function () {
                        return this.body.view.scale
                    }
                    },
                    {
                        key: "getViewPosition", value: function () {
                        return this.canvas.DOMtoCanvas({
                            x: .5 * this.canvas.frame.canvas.clientWidth,
                            y: .5 * this.canvas.frame.canvas.clientHeight
                        })
                    }
                    }
                ]), t
            }();
            e["default"] = r, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            function n(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var s = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), r = i(105), a = o(r), h = i(106), d = o(h), l = i(7), u = function () {
                function t(e, i, o) {
                    n(this, t), this.body = e, this.canvas = i, this.selectionHandler = o, this.navigationHandler = new a["default"](e, i), this.body.eventListeners.onTap = this.onTap.bind(this), this.body.eventListeners.onTouch = this.onTouch.bind(this), this.body.eventListeners.onDoubleTap = this.onDoubleTap.bind(this), this.body.eventListeners.onHold = this.onHold.bind(this), this.body.eventListeners.onDragStart = this.onDragStart.bind(this), this.body.eventListeners.onDrag = this.onDrag.bind(this), this.body.eventListeners.onDragEnd = this.onDragEnd.bind(this), this.body.eventListeners.onMouseWheel = this.onMouseWheel.bind(this), this.body.eventListeners.onPinch = this.onPinch.bind(this), this.body.eventListeners.onMouseMove = this.onMouseMove.bind(this), this.body.eventListeners.onRelease = this.onRelease.bind(this), this.body.eventListeners.onContext = this.onContext.bind(this), this.touchTime = 0, this.drag = {}, this.pinch = {}, this.popup = void 0, this.popupObj = void 0, this.popupTimer = void 0, this.body.functions.getPointer = this.getPointer.bind(this), this.options = {}, this.defaultOptions = {
                        dragNodes: !0,
                        dragView: !0,
                        hover: !1,
                        keyboard: {enabled: !1, speed: {x: 10, y: 10, zoom: .02}, bindToWindow: !0},
                        navigationButtons: !1,
                        tooltipDelay: 300,
                        zoomView: !0
                    }, l.extend(this.options, this.defaultOptions), this.bindEventListeners()
                }

                return s(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.on("destroy", function () {
                            clearTimeout(t.popupTimer), delete t.body.functions.getPointer
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t) {
                        if (void 0 !== t) {
                            var e = ["hideEdgesOnDrag", "hideNodesOnDrag", "keyboard", "multiselect", "selectable", "selectConnectedEdges"];
                            l.selectiveNotDeepExtend(e, this.options, t), l.mergeOptions(this.options, t, "keyboard"), t.tooltip && (l.extend(this.options.tooltip, t.tooltip), t.tooltip.color && (this.options.tooltip.color = l.parseColor(t.tooltip.color)))
                        }
                        this.navigationHandler.setOptions(this.options)
                    }
                    },
                    {
                        key: "getPointer", value: function (t) {
                        return {
                            x: t.x - l.getAbsoluteLeft(this.canvas.frame.canvas),
                            y: t.y - l.getAbsoluteTop(this.canvas.frame.canvas)
                        }
                    }
                    },
                    {
                        key: "onTouch", value: function (t) {
                        (new Date).valueOf() - this.touchTime > 50 && (this.drag.pointer = this.getPointer(t.center), this.drag.pinched = !1, this.pinch.scale = this.body.view.scale, this.touchTime = (new Date).valueOf())
                    }
                    },
                    {
                        key: "onTap", value: function (t) {
                        var e = this.getPointer(t.center), i = this.selectionHandler.options.multiselect && (t.changedPointers[0].ctrlKey || t.changedPointers[0].metaKey);
                        this.checkSelectionChanges(e, t, i), this.selectionHandler._generateClickEvent("click", t, e)
                    }
                    },
                    {
                        key: "onDoubleTap", value: function (t) {
                        var e = this.getPointer(t.center);
                        this.selectionHandler._generateClickEvent("doubleClick", t, e)
                    }
                    },
                    {
                        key: "onHold", value: function (t) {
                        var e = this.getPointer(t.center), i = this.selectionHandler.options.multiselect;
                        this.checkSelectionChanges(e, t, i), this.selectionHandler._generateClickEvent("click", t, e), this.selectionHandler._generateClickEvent("hold", t, e)
                    }
                    },
                    {
                        key: "onRelease", value: function (t) {
                        if ((new Date).valueOf() - this.touchTime > 10) {
                            var e = this.getPointer(t.center);
                            this.selectionHandler._generateClickEvent("release", t, e), this.touchTime = (new Date).valueOf()
                        }
                    }
                    },
                    {
                        key: "onContext", value: function (t) {
                        var e = this.getPointer({x: t.clientX, y: t.clientY});
                        this.selectionHandler._generateClickEvent("oncontext", t, e)
                    }
                    },
                    {
                        key: "checkSelectionChanges", value: function (t, e) {
                        var i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], o = this.selectionHandler._getSelectedEdgeCount(), n = this.selectionHandler._getSelectedNodeCount(), s = this.selectionHandler.getSelection(), r = void 0;
                        r = i === !0 ? this.selectionHandler.selectAdditionalOnPoint(t) : this.selectionHandler.selectOnPoint(t);
                        var a = this.selectionHandler._getSelectedEdgeCount(), h = this.selectionHandler._getSelectedNodeCount(), d = this.selectionHandler.getSelection(), l = this._determineIfDifferent(s, d), u = l.nodesChanges, c = l.edgesChanges;
                        h - n > 0 ? (this.selectionHandler._generateClickEvent("selectNode", e, t), r = !0) : 0 > h - n ? (this.selectionHandler._generateClickEvent("deselectNode", e, t, s), r = !0) : h === n && u === !0 && (this.selectionHandler._generateClickEvent("deselectNode", e, t, s), this.selectionHandler._generateClickEvent("selectNode", e, t), r = !0), a - o > 0 ? (this.selectionHandler._generateClickEvent("selectEdge", e, t), r = !0) : 0 > a - o ? (this.selectionHandler._generateClickEvent("deselectEdge", e, t, s), r = !0) : a === o && c === !0 && (this.selectionHandler._generateClickEvent("deselectEdge", e, t, s), this.selectionHandler._generateClickEvent("selectEdge", e, t), r = !0), r === !0 && this.selectionHandler._generateClickEvent("select", e, t)
                    }
                    },
                    {
                        key: "_determineIfDifferent", value: function (t, e) {
                        for (var i = !1, o = !1, n = 0; n < t.nodes.length; n++)-1 === e.nodes.indexOf(t.nodes[n]) && (i = !0);
                        for (var n = 0; n < e.nodes.length; n++)-1 === t.nodes.indexOf(t.nodes[n]) && (i = !0);
                        for (var n = 0; n < t.edges.length; n++)-1 === e.edges.indexOf(t.edges[n]) && (o = !0);
                        for (var n = 0; n < e.edges.length; n++)-1 === t.edges.indexOf(t.edges[n]) && (o = !0);
                        return {nodesChanges: i, edgesChanges: o}
                    }
                    },
                    {
                        key: "onDragStart", value: function (t) {
                        void 0 === this.drag.pointer && this.onTouch(t);
                        var e = this.selectionHandler.getNodeAt(this.drag.pointer);
                        if (this.drag.dragging = !0, this.drag.selection = [], this.drag.translation = l.extend({}, this.body.view.translation), this.drag.nodeId = void 0, void 0 !== e && this.options.dragNodes === !0) {
                            this.drag.nodeId = e.id, e.isSelected() === !1 && (this.selectionHandler.unselectAll(), this.selectionHandler.selectObject(e)), this.selectionHandler._generateClickEvent("dragStart", t, this.drag.pointer);
                            var i = this.selectionHandler.selectionObj.nodes;
                            for (var o in i)if (i.hasOwnProperty(o)) {
                                var n = i[o], s = {
                                    id: n.id,
                                    node: n,
                                    x: n.x,
                                    y: n.y,
                                    xFixed: n.options.fixed.x,
                                    yFixed: n.options.fixed.y
                                };
                                n.options.fixed.x = !0, n.options.fixed.y = !0, this.drag.selection.push(s)
                            }
                        } else this.selectionHandler._generateClickEvent("dragStart", t, this.drag.pointer, void 0, !0)
                    }
                    },
                    {
                        key: "onDrag", value: function (t) {
                        var e = this;
                        if (this.drag.pinched !== !0) {
                            this.body.emitter.emit("unlockNode");
                            var i = this.getPointer(t.center), o = this.drag.selection;
                            if (o && o.length && this.options.dragNodes === !0) !function () {
                                e.selectionHandler._generateClickEvent("dragging", t, i);
                                var n = i.x - e.drag.pointer.x, s = i.y - e.drag.pointer.y;
                                o.forEach(function (t) {
                                    var i = t.node;
                                    t.xFixed === !1 && (i.x = e.canvas._XconvertDOMtoCanvas(e.canvas._XconvertCanvasToDOM(t.x) + n)), t.yFixed === !1 && (i.y = e.canvas._YconvertDOMtoCanvas(e.canvas._YconvertCanvasToDOM(t.y) + s))
                                }), e.body.emitter.emit("startSimulation")
                            }(); else if (this.options.dragView === !0) {
                                if (this.selectionHandler._generateClickEvent("dragging", t, i, void 0, !0), void 0 === this.drag.pointer)return void this.onDragStart(t);
                                var n = i.x - this.drag.pointer.x, s = i.y - this.drag.pointer.y;
                                this.body.view.translation = {
                                    x: this.drag.translation.x + n,
                                    y: this.drag.translation.y + s
                                }, this.body.emitter.emit("_redraw")
                            }
                        }
                    }
                    },
                    {
                        key: "onDragEnd", value: function (t) {
                        this.drag.dragging = !1;
                        var e = this.drag.selection;
                        e && e.length ? (e.forEach(function (t) {
                                t.node.options.fixed.x = t.xFixed, t.node.options.fixed.y = t.yFixed
                            }), this.selectionHandler._generateClickEvent("dragEnd", t, this.getPointer(t.center)), this.body.emitter.emit("startSimulation")) : (this.selectionHandler._generateClickEvent("dragEnd", t, this.getPointer(t.center), void 0, !0), this.body.emitter.emit("_requestRedraw"))
                    }
                    },
                    {
                        key: "onPinch", value: function (t) {
                        var e = this.getPointer(t.center);
                        this.drag.pinched = !0, void 0 === this.pinch.scale && (this.pinch.scale = 1);
                        var i = this.pinch.scale * t.scale;
                        this.zoom(i, e)
                    }
                    },
                    {
                        key: "zoom", value: function (t, e) {
                        if (this.options.zoomView === !0) {
                            var i = this.body.view.scale;
                            1e-5 > t && (t = 1e-5), t > 10 && (t = 10);
                            var o = void 0;
                            void 0 !== this.drag && this.drag.dragging === !0 && (o = this.canvas.DOMtoCanvas(this.drag.pointer));
                            var n = this.body.view.translation, s = t / i, r = (1 - s) * e.x + n.x * s, a = (1 - s) * e.y + n.y * s;
                            if (this.body.view.scale = t, this.body.view.translation = {x: r, y: a}, void 0 != o) {
                                var h = this.canvas.canvasToDOM(o);
                                this.drag.pointer.x = h.x, this.drag.pointer.y = h.y
                            }
                            this.body.emitter.emit("_requestRedraw"), t > i ? this.body.emitter.emit("zoom", {
                                    direction: "+",
                                    scale: this.body.view.scale
                                }) : this.body.emitter.emit("zoom", {direction: "-", scale: this.body.view.scale})
                        }
                    }
                    },
                    {
                        key: "onMouseWheel", value: function (t) {
                        var e = 0;
                        if (t.wheelDelta ? e = t.wheelDelta / 120 : t.detail && (e = -t.detail / 3), 0 !== e) {
                            var i = this.body.view.scale, o = e / 10;
                            0 > e && (o /= 1 - o), i *= 1 + o;
                            var n = this.getPointer({x: t.clientX, y: t.clientY});
                            this.zoom(i, n)
                        }
                        t.preventDefault()
                    }
                    },
                    {
                        key: "onMouseMove", value: function (t) {
                        var e = this, i = this.getPointer({x: t.clientX, y: t.clientY}), o = !1;
                        if (void 0 !== this.popup && (this.popup.hidden === !1 && this._checkHidePopup(i), this.popup.hidden === !1 && (o = !0, this.popup.setPosition(i.x + 3, i.y - 5), this.popup.show())), this.options.keyboard.bindToWindow === !1 && this.options.keyboard.enabled === !0 && this.canvas.frame.focus(), o === !1 && (void 0 !== this.popupTimer && (clearInterval(this.popupTimer), this.popupTimer = void 0), this.drag.dragging || (this.popupTimer = setTimeout(function () {
                                return e._checkShowPopup(i)
                            }, this.options.tooltipDelay))), this.options.hover === !0) {
                            var n = this.selectionHandler.getNodeAt(i);
                            void 0 === n && (n = this.selectionHandler.getEdgeAt(i)), this.selectionHandler.hoverObject(n)
                        }
                    }
                    },
                    {
                        key: "_checkShowPopup", value: function (t) {
                        var e = this.canvas._XconvertDOMtoCanvas(t.x), i = this.canvas._YconvertDOMtoCanvas(t.y), o = {
                            left: e,
                            top: i,
                            right: e,
                            bottom: i
                        }, n = void 0 === this.popupObj ? void 0 : this.popupObj.id, s = !1, r = "node";
                        if (void 0 === this.popupObj) {
                            for (var a = this.body.nodeIndices, h = this.body.nodes, l = void 0, u = [], c = 0; c < a.length; c++)l = h[a[c]], l.isOverlappingWith(o) === !0 && void 0 !== l.getTitle() && u.push(a[c]);
                            u.length > 0 && (this.popupObj = h[u[u.length - 1]], s = !0)
                        }
                        if (void 0 === this.popupObj && s === !1) {
                            for (var p = this.body.edgeIndices, f = this.body.edges, m = void 0, v = [], c = 0; c < p.length; c++)m = f[p[c]], m.isOverlappingWith(o) === !0 && m.connected === !0 && void 0 !== m.getTitle() && v.push(p[c]);
                            v.length > 0 && (this.popupObj = f[v[v.length - 1]], r = "edge")
                        }
                        void 0 !== this.popupObj ? this.popupObj.id !== n && (void 0 === this.popup && (this.popup = new d["default"](this.canvas.frame)), this.popup.popupTargetType = r, this.popup.popupTargetId = this.popupObj.id, this.popup.setPosition(t.x + 3, t.y - 5), this.popup.setText(this.popupObj.getTitle()), this.popup.show(), this.body.emitter.emit("showPopup", this.popupObj.id)) : void 0 !== this.popup && (this.popup.hide(), this.body.emitter.emit("hidePopup"))
                    }
                    },
                    {
                        key: "_checkHidePopup", value: function (t) {
                        var e = this.selectionHandler._pointerToPositionObject(t), i = !1;
                        if ("node" === this.popup.popupTargetType) {
                            if (void 0 !== this.body.nodes[this.popup.popupTargetId] && (i = this.body.nodes[this.popup.popupTargetId].isOverlappingWith(e), i === !0)) {
                                var o = this.selectionHandler.getNodeAt(t);
                                i = o.id === this.popup.popupTargetId
                            }
                        } else void 0 === this.selectionHandler.getNodeAt(t) && void 0 !== this.body.edges[this.popup.popupTargetId] && (i = this.body.edges[this.popup.popupTargetId].isOverlappingWith(e));
                        i === !1 && (this.popupObj = void 0, this.popup.hide(), this.body.emitter.emit("hidePopup"))
                    }
                    }
                ]), t
            }();
            e["default"] = u, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = (i(7), i(3)), r = i(27), a = i(41), h = function () {
                function t(e, i) {
                    var n = this;
                    o(this, t), this.body = e, this.canvas = i, this.iconsCreated = !1, this.navigationHammers = [], this.boundFunctions = {}, this.touchTime = 0, this.activated = !1, this.body.emitter.on("activate", function () {
                        n.activated = !0, n.configureKeyboardBindings()
                    }), this.body.emitter.on("deactivate", function () {
                        n.activated = !1, n.configureKeyboardBindings()
                    }), this.body.emitter.on("destroy", function () {
                        void 0 !== n.keycharm && n.keycharm.destroy()
                    }), this.options = {}
                }

                return n(t, [
                    {
                        key: "setOptions", value: function (t) {
                        void 0 !== t && (this.options = t, this.create())
                    }
                    },
                    {
                        key: "create", value: function () {
                        this.options.navigationButtons === !0 ? this.iconsCreated === !1 && this.loadNavigationElements() : this.iconsCreated === !0 && this.cleanNavigation(), this.configureKeyboardBindings()
                    }
                    },
                    {
                        key: "cleanNavigation", value: function () {
                        if (0 != this.navigationHammers.length) {
                            for (var t = 0; t < this.navigationHammers.length; t++)this.navigationHammers[t].destroy();
                            this.navigationHammers = []
                        }
                        this.navigationDOM && this.navigationDOM.wrapper && this.navigationDOM.wrapper.parentNode && this.navigationDOM.wrapper.parentNode.removeChild(this.navigationDOM.wrapper), this.iconsCreated = !1
                    }
                    },
                    {
                        key: "loadNavigationElements", value: function () {
                        var t = this;
                        this.cleanNavigation(), this.navigationDOM = {};
                        var e = ["up", "down", "left", "right", "zoomIn", "zoomOut", "zoomExtends"], i = ["_moveUp", "_moveDown", "_moveLeft", "_moveRight", "_zoomIn", "_zoomOut", "_fit"];
                        this.navigationDOM.wrapper = document.createElement("div"), this.navigationDOM.wrapper.className = "vis-navigation", this.canvas.frame.appendChild(this.navigationDOM.wrapper);
                        for (var o = 0; o < e.length; o++) {
                            this.navigationDOM[e[o]] = document.createElement("div"), this.navigationDOM[e[o]].className = "vis-button vis-" + e[o], this.navigationDOM.wrapper.appendChild(this.navigationDOM[e[o]]);
                            var n = new s(this.navigationDOM[e[o]]);
                            "_fit" === i[o] ? r.onTouch(n, this._fit.bind(this)) : r.onTouch(n, this.bindToRedraw.bind(this, i[o])), this.navigationHammers.push(n)
                        }
                        var a = new s(this.canvas.frame);
                        r.onRelease(a, function () {
                            t._stopMovement()
                        }), this.navigationHammers.push(a), this.iconsCreated = !0
                    }
                    },
                    {
                        key: "bindToRedraw", value: function (t) {
                        void 0 === this.boundFunctions[t] && (this.boundFunctions[t] = this[t].bind(this), this.body.emitter.on("initRedraw", this.boundFunctions[t]), this.body.emitter.emit("_startRendering"))
                    }
                    },
                    {
                        key: "unbindFromRedraw", value: function (t) {
                        void 0 !== this.boundFunctions[t] && (this.body.emitter.off("initRedraw", this.boundFunctions[t]), this.body.emitter.emit("_stopRendering"), delete this.boundFunctions[t])
                    }
                    },
                    {
                        key: "_fit", value: function () {
                        (new Date).valueOf() - this.touchTime > 700 && (this.body.emitter.emit("fit", {duration: 700}), this.touchTime = (new Date).valueOf())
                    }
                    },
                    {
                        key: "_stopMovement", value: function () {
                        for (var t in this.boundFunctions)this.boundFunctions.hasOwnProperty(t) && (this.body.emitter.off("initRedraw", this.boundFunctions[t]), this.body.emitter.emit("_stopRendering"));
                        this.boundFunctions = {}
                    }
                    },
                    {
                        key: "_moveUp", value: function () {
                        this.body.view.translation.y += this.options.keyboard.speed.y
                    }
                    },
                    {
                        key: "_moveDown", value: function () {
                        this.body.view.translation.y -= this.options.keyboard.speed.y
                    }
                    },
                    {
                        key: "_moveLeft", value: function () {
                        this.body.view.translation.x += this.options.keyboard.speed.x
                    }
                    },
                    {
                        key: "_moveRight", value: function () {
                        this.body.view.translation.x -= this.options.keyboard.speed.x
                    }
                    },
                    {
                        key: "_zoomIn", value: function () {
                        this.body.view.scale *= 1 + this.options.keyboard.speed.zoom, this.body.emitter.emit("zoom", {
                            direction: "+",
                            scale: this.body.view.scale
                        })
                    }
                    },
                    {
                        key: "_zoomOut", value: function () {
                        this.body.view.scale /= 1 + this.options.keyboard.speed.zoom, this.body.emitter.emit("zoom", {
                            direction: "-",
                            scale: this.body.view.scale
                        })
                    }
                    },
                    {
                        key: "configureKeyboardBindings", value: function () {
                        var t = this;
                        void 0 !== this.keycharm && this.keycharm.destroy(), this.options.keyboard.enabled === !0 && (this.options.keyboard.bindToWindow === !0 ? this.keycharm = a({
                                container: window,
                                preventDefault: !0
                            }) : this.keycharm = a({
                                container: this.canvas.frame,
                                preventDefault: !0
                            }), this.keycharm.reset(), this.activated === !0 && (this.keycharm.bind("up", function () {
                            t.bindToRedraw("_moveUp")
                        }, "keydown"), this.keycharm.bind("down", function () {
                            t.bindToRedraw("_moveDown")
                        }, "keydown"), this.keycharm.bind("left", function () {
                            t.bindToRedraw("_moveLeft")
                        }, "keydown"), this.keycharm.bind("right", function () {
                            t.bindToRedraw("_moveRight")
                        }, "keydown"), this.keycharm.bind("=", function () {
                            t.bindToRedraw("_zoomIn")
                        }, "keydown"), this.keycharm.bind("num+", function () {
                            t.bindToRedraw("_zoomIn")
                        }, "keydown"), this.keycharm.bind("num-", function () {
                            t.bindToRedraw("_zoomOut")
                        }, "keydown"), this.keycharm.bind("-", function () {
                            t.bindToRedraw("_zoomOut")
                        }, "keydown"), this.keycharm.bind("[", function () {
                            t.bindToRedraw("_zoomOut")
                        }, "keydown"), this.keycharm.bind("]", function () {
                            t.bindToRedraw("_zoomIn")
                        }, "keydown"), this.keycharm.bind("pageup", function () {
                            t.bindToRedraw("_zoomIn")
                        }, "keydown"), this.keycharm.bind("pagedown", function () {
                            t.bindToRedraw("_zoomOut")
                        }, "keydown"), this.keycharm.bind("up", function () {
                            t.unbindFromRedraw("_moveUp")
                        }, "keyup"), this.keycharm.bind("down", function () {
                            t.unbindFromRedraw("_moveDown")
                        }, "keyup"), this.keycharm.bind("left", function () {
                            t.unbindFromRedraw("_moveLeft")
                        }, "keyup"), this.keycharm.bind("right", function () {
                            t.unbindFromRedraw("_moveRight")
                        }, "keyup"), this.keycharm.bind("=", function () {
                            t.unbindFromRedraw("_zoomIn")
                        }, "keyup"), this.keycharm.bind("num+", function () {
                            t.unbindFromRedraw("_zoomIn")
                        }, "keyup"), this.keycharm.bind("num-", function () {
                            t.unbindFromRedraw("_zoomOut")
                        }, "keyup"), this.keycharm.bind("-", function () {
                            t.unbindFromRedraw("_zoomOut")
                        }, "keyup"), this.keycharm.bind("[", function () {
                            t.unbindFromRedraw("_zoomOut")
                        }, "keyup"), this.keycharm.bind("]", function () {
                            t.unbindFromRedraw("_zoomIn")
                        }, "keyup"), this.keycharm.bind("pageup", function () {
                            t.unbindFromRedraw("_zoomIn")
                        }, "keyup"), this.keycharm.bind("pagedown", function () {
                            t.unbindFromRedraw("_zoomOut")
                        }, "keyup")))
                    }
                    }
                ]), t
            }();
            e["default"] = h, t.exports = e["default"]
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e) {
                    i(this, t), this.container = e, this.x = 0, this.y = 0, this.padding = 5, this.hidden = !1, this.frame = document.createElement("div"), this.frame.className = "vis-network-tooltip", this.container.appendChild(this.frame)
                }

                return o(t, [
                    {
                        key: "setPosition", value: function (t, e) {
                        this.x = parseInt(t), this.y = parseInt(e)
                    }
                    },
                    {
                        key: "setText", value: function (t) {
                        t instanceof Element ? (this.frame.innerHTML = "", this.frame.appendChild(t)) : this.frame.innerHTML = t
                    }
                    },
                    {
                        key: "show", value: function (t) {
                        if (void 0 === t && (t = !0), t === !0) {
                            var e = this.frame.clientHeight, i = this.frame.clientWidth, o = this.frame.parentNode.clientHeight, n = this.frame.parentNode.clientWidth, s = this.y - e;
                            s + e + this.padding > o && (s = o - e - this.padding), s < this.padding && (s = this.padding);
                            var r = this.x;
                            r + i + this.padding > n && (r = n - i - this.padding), r < this.padding && (r = this.padding), this.frame.style.left = r + "px", this.frame.style.top = s + "px", this.frame.style.visibility = "visible", this.hidden = !1
                        } else this.hide()
                    }
                    },
                    {
                        key: "hide", value: function () {
                        this.hidden = !0, this.frame.style.visibility = "hidden"
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(62), r = i(82), a = i(7), h = function () {
                function t(e, i) {
                    var n = this;
                    o(this, t), this.body = e, this.canvas = i, this.selectionObj = {
                        nodes: [],
                        edges: []
                    }, this.hoverObj = {
                        nodes: {},
                        edges: {}
                    }, this.options = {}, this.defaultOptions = {
                        multiselect: !1,
                        selectable: !0,
                        selectConnectedEdges: !0,
                        hoverConnectedEdges: !0
                    }, a.extend(this.options, this.defaultOptions), this.body.emitter.on("_dataChanged", function () {
                        n.updateSelection()
                    })
                }

                return n(t, [
                    {
                        key: "setOptions", value: function (t) {
                        if (void 0 !== t) {
                            var e = ["multiselect", "hoverConnectedEdges", "selectable", "selectConnectedEdges"];
                            a.selectiveDeepExtend(e, this.options, t)
                        }
                    }
                    },
                    {
                        key: "selectOnPoint", value: function (t) {
                        var e = !1;
                        if (this.options.selectable === !0) {
                            var i = this.getNodeAt(t) || this.getEdgeAt(t);
                            this.unselectAll(), void 0 !== i && (e = this.selectObject(i)), this.body.emitter.emit("_requestRedraw")
                        }
                        return e
                    }
                    },
                    {
                        key: "selectAdditionalOnPoint", value: function (t) {
                        var e = !1;
                        if (this.options.selectable === !0) {
                            var i = this.getNodeAt(t) || this.getEdgeAt(t);
                            void 0 !== i && (e = !0, i.isSelected() === !0 ? this.deselectObject(i) : this.selectObject(i), this.body.emitter.emit("_requestRedraw"))
                        }
                        return e
                    }
                    },
                    {
                        key: "_generateClickEvent", value: function (t, e, i, o) {
                        var n = arguments.length <= 4 || void 0 === arguments[4] ? !1 : arguments[4], s = void 0;
                        s = n === !0 ? {nodes: [], edges: []} : this.getSelection(), s.pointer = {
                            DOM: {x: i.x, y: i.y},
                            canvas: this.canvas.DOMtoCanvas(i)
                        }, s.event = e, void 0 !== o && (s.previousSelection = o), this.body.emitter.emit(t, s)
                    }
                    },
                    {
                        key: "selectObject", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? this.options.selectConnectedEdges : arguments[1];
                        return void 0 !== t ? (t instanceof s && e === !0 && this._selectConnectedEdges(t), t.select(), this._addToSelection(t), !0) : !1
                    }
                    },
                    {
                        key: "deselectObject", value: function (t) {
                        t.isSelected() === !0 && (t.selected = !1, this._removeFromSelection(t))
                    }
                    },
                    {
                        key: "_getAllNodesOverlappingWith", value: function (t) {
                        for (var e = [], i = this.body.nodes, o = 0; o < this.body.nodeIndices.length; o++) {
                            var n = this.body.nodeIndices[o];
                            i[n].isOverlappingWith(t) && e.push(n)
                        }
                        return e
                    }
                    },
                    {
                        key: "_pointerToPositionObject", value: function (t) {
                        var e = this.canvas.DOMtoCanvas(t);
                        return {left: e.x - 1, top: e.y + 1, right: e.x + 1, bottom: e.y - 1}
                    }
                    },
                    {
                        key: "getNodeAt", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1], i = this._pointerToPositionObject(t), o = this._getAllNodesOverlappingWith(i);
                        return o.length > 0 ? e === !0 ? this.body.nodes[o[o.length - 1]] : o[o.length - 1] : void 0
                    }
                    },
                    {
                        key: "_getEdgesOverlappingWith", value: function (t, e) {
                        for (var i = this.body.edges, o = 0; o < this.body.edgeIndices.length; o++) {
                            var n = this.body.edgeIndices[o];
                            i[n].isOverlappingWith(t) && e.push(n)
                        }
                    }
                    },
                    {
                        key: "_getAllEdgesOverlappingWith", value: function (t) {
                        var e = [];
                        return this._getEdgesOverlappingWith(t, e), e
                    }
                    },
                    {
                        key: "getEdgeAt", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1], i = this._pointerToPositionObject(t), o = this._getAllEdgesOverlappingWith(i);
                        return o.length > 0 ? e === !0 ? this.body.edges[o[o.length - 1]] : o[o.length - 1] : void 0
                    }
                    },
                    {
                        key: "_addToSelection", value: function (t) {
                        t instanceof s ? this.selectionObj.nodes[t.id] = t : this.selectionObj.edges[t.id] = t
                    }
                    },
                    {
                        key: "_addToHover", value: function (t) {
                        t instanceof s ? this.hoverObj.nodes[t.id] = t : this.hoverObj.edges[t.id] = t
                    }
                    },
                    {
                        key: "_removeFromSelection", value: function (t) {
                        t instanceof s ? delete this.selectionObj.nodes[t.id] : delete this.selectionObj.edges[t.id]
                    }
                    },
                    {
                        key: "unselectAll", value: function () {
                        for (var t in this.selectionObj.nodes)this.selectionObj.nodes.hasOwnProperty(t) && this.selectionObj.nodes[t].unselect();
                        for (var e in this.selectionObj.edges)this.selectionObj.edges.hasOwnProperty(e) && this.selectionObj.edges[e].unselect();
                        this.selectionObj = {nodes: {}, edges: {}}
                    }
                    },
                    {
                        key: "_getSelectedNodeCount", value: function () {
                        var t = 0;
                        for (var e in this.selectionObj.nodes)this.selectionObj.nodes.hasOwnProperty(e) && (t += 1);
                        return t
                    }
                    },
                    {
                        key: "_getSelectedNode", value: function () {
                        for (var t in this.selectionObj.nodes)if (this.selectionObj.nodes.hasOwnProperty(t))return this.selectionObj.nodes[t];
                        return void 0
                    }
                    },
                    {
                        key: "_getSelectedEdge", value: function () {
                        for (var t in this.selectionObj.edges)if (this.selectionObj.edges.hasOwnProperty(t))return this.selectionObj.edges[t];
                        return void 0
                    }
                    },
                    {
                        key: "_getSelectedEdgeCount", value: function () {
                        var t = 0;
                        for (var e in this.selectionObj.edges)this.selectionObj.edges.hasOwnProperty(e) && (t += 1);
                        return t
                    }
                    },
                    {
                        key: "_getSelectedObjectCount", value: function () {
                        var t = 0;
                        for (var e in this.selectionObj.nodes)this.selectionObj.nodes.hasOwnProperty(e) && (t += 1);
                        for (var i in this.selectionObj.edges)this.selectionObj.edges.hasOwnProperty(i) && (t += 1);
                        return t
                    }
                    },
                    {
                        key: "_selectionIsEmpty", value: function () {
                        for (var t in this.selectionObj.nodes)if (this.selectionObj.nodes.hasOwnProperty(t))return !1;
                        for (var e in this.selectionObj.edges)if (this.selectionObj.edges.hasOwnProperty(e))return !1;
                        return !0
                    }
                    },
                    {
                        key: "_clusterInSelection", value: function () {
                        for (var t in this.selectionObj.nodes)if (this.selectionObj.nodes.hasOwnProperty(t) && this.selectionObj.nodes[t].clusterSize > 1)return !0;
                        return !1
                    }
                    },
                    {
                        key: "_selectConnectedEdges", value: function (t) {
                        for (var e = 0; e < t.edges.length; e++) {
                            var i = t.edges[e];
                            i.select(), this._addToSelection(i)
                        }
                    }
                    },
                    {
                        key: "_hoverConnectedEdges", value: function (t) {
                        for (var e = 0; e < t.edges.length; e++) {
                            var i = t.edges[e];
                            i.hover = !0, this._addToHover(i)
                        }
                    }
                    },
                    {
                        key: "_unselectConnectedEdges", value: function (t) {
                        for (var e = 0; e < t.edges.length; e++) {
                            var i = t.edges[e];
                            i.unselect(), this._removeFromSelection(i)
                        }
                    }
                    },
                    {
                        key: "blurObject", value: function (t) {
                        t.hover === !0 && (t.hover = !1, t instanceof s ? this.body.emitter.emit("blurNode", {node: t.id}) : this.body.emitter.emit("blurEdge", {edge: t.id}))
                    }
                    },
                    {
                        key: "hoverObject", value: function (t) {
                        var e = !1;
                        for (var i in this.hoverObj.nodes)this.hoverObj.nodes.hasOwnProperty(i) && (void 0 === t || t instanceof s && t.id != i || t instanceof r) && (this.blurObject(this.hoverObj.nodes[i]), delete this.hoverObj.nodes[i], e = !0);
                        for (var o in this.hoverObj.edges)this.hoverObj.edges.hasOwnProperty(o) && (e === !0 ? (this.hoverObj.edges[o].hover = !1, delete this.hoverObj.edges[o]) : void 0 === t && (this.blurObject(this.hoverObj.edges[o]), delete this.hoverObj.edges[o], e = !0));
                        void 0 !== t && (t.hover === !1 && (t.hover = !0, this._addToHover(t), e = !0, t instanceof s ? this.body.emitter.emit("hoverNode", {node: t.id}) : this.body.emitter.emit("hoverEdge", {edge: t.id})), t instanceof s && this.options.hoverConnectedEdges === !0 && this._hoverConnectedEdges(t)), e === !0 && this.body.emitter.emit("_requestRedraw")
                    }
                    },
                    {
                        key: "getSelection", value: function () {
                        var t = this.getSelectedNodes(), e = this.getSelectedEdges();
                        return {nodes: t, edges: e}
                    }
                    },
                    {
                        key: "getSelectedNodes", value: function () {
                        var t = [];
                        if (this.options.selectable === !0)for (var e in this.selectionObj.nodes)this.selectionObj.nodes.hasOwnProperty(e) && t.push(e);
                        return t
                    }
                    },
                    {
                        key: "getSelectedEdges", value: function () {
                        var t = [];
                        if (this.options.selectable === !0)for (var e in this.selectionObj.edges)this.selectionObj.edges.hasOwnProperty(e) && t.push(e);
                        return t
                    }
                    },
                    {
                        key: "selectNodes", value: function (t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1], i = void 0, o = void 0;
                        if (!t || void 0 === t.length)throw"Selection must be an array with ids";
                        for (this.unselectAll(), i = 0; i < t.length; i++) {
                            o = t[i];
                            var n = this.body.nodes[o];
                            if (!n)throw new RangeError('Node with id "' + o + '" not found');
                            this.selectObject(n, e)
                        }
                        this.body.emitter.emit("_requestRedraw")
                    }
                    },
                    {
                        key: "selectEdges", value: function (t) {
                        var e = void 0, i = void 0;
                        if (!t || void 0 === t.length)throw"Selection must be an array with ids";
                        for (this.unselectAll(), e = 0; e < t.length; e++) {
                            i = t[e];
                            var o = this.body.edges[i];
                            if (!o)throw new RangeError('Edge with id "' + i + '" not found');
                            this.selectObject(o)
                        }
                        this.body.emitter.emit("_requestRedraw")
                    }
                    },
                    {
                        key: "updateSelection", value: function () {
                        for (var t in this.selectionObj.nodes)this.selectionObj.nodes.hasOwnProperty(t) && (this.body.nodes.hasOwnProperty(t) || delete this.selectionObj.nodes[t]);
                        for (var e in this.selectionObj.edges)this.selectionObj.edges.hasOwnProperty(e) && (this.body.edges.hasOwnProperty(e) || delete this.selectionObj.edges[e])
                    }
                    }
                ]), t
            }();
            e["default"] = h, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(7), r = function () {
                function t(e) {
                    o(this, t), this.body = e, this.initialRandomSeed = Math.round(1e6 * Math.random()), this.randomSeed = this.initialRandomSeed, this.options = {}, this.optionsBackup = {}, this.defaultOptions = {
                        randomSeed: void 0,
                        hierarchical: {enabled: !1, levelSeparation: 150, direction: "UD", sortMethod: "hubsize"}
                    }, s.extend(this.options, this.defaultOptions), this.hierarchicalLevels = {}, this.bindEventListeners()
                }

                return n(t, [
                    {
                        key: "bindEventListeners", value: function () {
                        var t = this;
                        this.body.emitter.on("_dataChanged", function () {
                            t.setupHierarchicalLayout()
                        }), this.body.emitter.on("_resetHierarchicalLayout", function () {
                            t.setupHierarchicalLayout()
                        })
                    }
                    },
                    {
                        key: "setOptions", value: function (t, e) {
                        if (void 0 !== t) {
                            var i = this.options.hierarchical.enabled;
                            if (s.mergeOptions(this.options, t, "hierarchical"), void 0 !== t.randomSeed && (this.initialRandomSeed = t.randomSeed), this.options.hierarchical.enabled === !0)return i === !0 && this.body.emitter.emit("refresh", !0), "RL" === this.options.hierarchical.direction || "DU" === this.options.hierarchical.direction ? this.options.hierarchical.levelSeparation > 0 && (this.options.hierarchical.levelSeparation *= -1) : this.options.hierarchical.levelSeparation < 0 && (this.options.hierarchical.levelSeparation *= -1), this.body.emitter.emit("_resetHierarchicalLayout"), this.adaptAllOptions(e);
                            if (i === !0)return this.body.emitter.emit("refresh"), s.deepExtend(e, this.optionsBackup)
                        }
                        return e
                    }
                    },
                    {
                        key: "adaptAllOptions", value: function (t) {
                        if (this.options.hierarchical.enabled === !0) {
                            void 0 === t.physics || t.physics === !0 ? (t.physics = {solver: "hierarchicalRepulsion"}, this.optionsBackup.physics = {solver: "barnesHut"}) : "object" == typeof t.physics ? (this.optionsBackup.physics = {solver: "barnesHut"}, void 0 !== t.physics.solver && (this.optionsBackup.physics = {solver: t.physics.solver}), t.physics.solver = "hierarchicalRepulsion") : t.physics !== !1 && (this.optionsBackup.physics = {solver: "barnesHut"}, t.physics.solver = "hierarchicalRepulsion");
                            var e = "horizontal";
                            ("RL" === this.options.hierarchical.direction || "LR" === this.options.hierarchical.direction) && (e = "vertical"), void 0 === t.edges ? (this.optionsBackup.edges = {
                                    smooth: {
                                        enabled: !0,
                                        type: "dynamic"
                                    }
                                }, t.edges = {smooth: !1}) : void 0 === t.edges.smooth ? (this.optionsBackup.edges = {
                                        smooth: {
                                            enabled: !0,
                                            type: "dynamic"
                                        }
                                    }, t.edges.smooth = !1) : "boolean" == typeof t.edges.smooth ? (this.optionsBackup.edges = {smooth: t.edges.smooth}, t.edges.smooth = {
                                            enabled: t.edges.smooth,
                                            type: e
                                        }) : (void 0 !== t.edges.smooth.type && "dynamic" !== t.edges.smooth.type && (e = t.edges.smooth.type), this.optionsBackup.edges = {
                                            smooth: void 0 === t.edges.smooth.enabled ? !0 : t.edges.smooth.enabled,
                                            type: void 0 === t.edges.smooth.type ? "dynamic" : t.edges.smooth.type,
                                            roundness: void 0 === t.edges.smooth.roundness ? .5 : t.edges.smooth.roundness,
                                            forceDirection: void 0 === t.edges.smooth.forceDirection ? !1 : t.edges.smooth.forceDirection
                                        }, t.edges.smooth = {
                                            enabled: void 0 === t.edges.smooth.enabled ? !0 : t.edges.smooth.enabled,
                                            type: e,
                                            roundness: void 0 === t.edges.smooth.roundness ? .5 : t.edges.smooth.roundness,
                                            forceDirection: void 0 === t.edges.smooth.forceDirection ? !1 : t.edges.smooth.forceDirection
                                        }), this.body.emitter.emit("_forceDisableDynamicCurves", e)
                        }
                        return t
                    }
                    },
                    {
                        key: "seededRandom", value: function () {
                        var t = 1e4 * Math.sin(this.randomSeed++);
                        return t - Math.floor(t)
                    }
                    },
                    {
                        key: "positionInitially", value: function (t) {
                        if (this.options.hierarchical.enabled !== !0) {
                            this.randomSeed = this.initialRandomSeed;
                            for (var e = 0; e < t.length; e++) {
                                var i = t[e], o = 1 * t.length + 10, n = 2 * Math.PI * this.seededRandom();
                                void 0 === i.x && (i.x = o * Math.cos(n)), void 0 === i.y && (i.y = o * Math.sin(n))
                            }
                        }
                    }
                    },
                    {
                        key: "getSeed", value: function () {
                        return this.initialRandomSeed
                    }
                    },
                    {
                        key: "setupHierarchicalLayout", value: function () {
                        if (this.options.hierarchical.enabled === !0 && this.body.nodeIndices.length > 0) {
                            var t = void 0, e = void 0, i = !1, o = !1;
                            this.hierarchicalLevels = {}, this.nodeSpacing = 100;
                            for (e in this.body.nodes)this.body.nodes.hasOwnProperty(e) && (t = this.body.nodes[e], void 0 !== t.options.level ? (i = !0, this.hierarchicalLevels[e] = t.options.level) : o = !0);
                            if (o === !0 && i === !0)throw new Error("To use the hierarchical layout, nodes require either no predefined levels or levels have to be defined for all nodes.");
                            o === !0 && ("hubsize" === this.options.hierarchical.sortMethod ? this._determineLevelsByHubsize() : ("directed" === this.options.hierarchical.sortMethod, this._determineLevelsDirected()));
                            var n = this._getDistribution();
                            this._placeNodesByHierarchy(n)
                        }
                    }
                    },
                    {
                        key: "_placeNodesByHierarchy", value: function (t) {
                        var e = void 0, i = void 0;
                        this.positionedNodes = {};
                        for (var o in t)if (t.hasOwnProperty(o))for (e in t[o].nodes)t[o].nodes.hasOwnProperty(e) && (i = t[o].nodes[e], "UD" === this.options.hierarchical.direction || "DU" === this.options.hierarchical.direction ? (void 0 === i.x && (i.x = t[o].distance), t[o].distance = i.x + this.nodeSpacing) : (void 0 === i.y && (i.y = t[o].distance), t[o].distance = i.y + this.nodeSpacing), this.positionedNodes[e] = !0, this._placeBranchNodes(i.edges, i.id, t, o))
                    }
                    },
                    {
                        key: "_getDistribution", value: function () {
                        var t = {}, e = void 0, i = void 0;
                        for (e in this.body.nodes)if (this.body.nodes.hasOwnProperty(e)) {
                            i = this.body.nodes[e];
                            var o = void 0 === this.hierarchicalLevels[e] ? 0 : this.hierarchicalLevels[e];
                            "UD" === this.options.hierarchical.direction || "DU" === this.options.hierarchical.direction ? (i.y = this.options.hierarchical.levelSeparation * o, i.options.fixed.y = !0) : (i.x = this.options.hierarchical.levelSeparation * o, i.options.fixed.x = !0), void 0 === t[o] && (t[o] = {
                                amount: 0,
                                nodes: {},
                                distance: 0
                            }), t[o].amount += 1, t[o].nodes[e] = i
                        }
                        return t
                    }
                    },
                    {
                        key: "_getHubSize", value: function () {
                        var t = 0;
                        for (var e in this.body.nodes)if (this.body.nodes.hasOwnProperty(e)) {
                            var i = this.body.nodes[e];
                            void 0 === this.hierarchicalLevels[e] && (t = i.edges.length < t ? t : i.edges.length)
                        }
                        return t
                    }
                    },
                    {
                        key: "_determineLevelsByHubsize", value: function () {
                        for (var t = void 0, e = void 0, i = 1; i > 0 && (i = this._getHubSize(), 0 !== i);)for (t in this.body.nodes)this.body.nodes.hasOwnProperty(t) && (e = this.body.nodes[t], e.edges.length === i && this._setLevelByHubsize(0, e))
                    }
                    },
                    {
                        key: "_setLevelByHubsize", value: function (t, e) {
                        if (void 0 === this.hierarchicalLevels[e.id]) {
                            var i = void 0;
                            this.hierarchicalLevels[e.id] = t;
                            for (var o = 0; o < e.edges.length; o++)i = e.edges[o].toId === e.id ? e.edges[o].from : e.edges[o].to, this._setLevelByHubsize(t + 1, i)
                        }
                    }
                    },
                    {
                        key: "_determineLevelsDirected", value: function () {
                        var t = void 0, e = void 0, i = 1e4;
                        for (t in this.body.nodes)this.body.nodes.hasOwnProperty(t) && (e = this.body.nodes[t], this._setLevelDirected(i, e));
                        for (t in this.body.nodes)this.body.nodes.hasOwnProperty(t) && (i = this.hierarchicalLevels[t] < i ? this.hierarchicalLevels[t] : i);
                        for (t in this.body.nodes)this.body.nodes.hasOwnProperty(t) && (this.hierarchicalLevels[t] -= i)
                    }
                    },
                    {
                        key: "_setLevelDirected", value: function (t, e) {
                        if (void 0 === this.hierarchicalLevels[e.id]) {
                            var i = void 0;
                            this.hierarchicalLevels[e.id] = t;
                            for (var o = 0; o < e.edges.length; o++)e.edges[o].toId === e.id ? (i = e.edges[o].from, this._setLevelDirected(t - 1, i)) : (i = e.edges[o].to, this._setLevelDirected(t + 1, i))
                        }
                    }
                    },
                    {
                        key: "_placeBranchNodes", value: function (t, e, i, o) {
                        for (var n = 0; n < t.length; n++) {
                            var s = void 0, r = void 0;
                            t[n].toId === e ? (s = t[n].from, r = t[n].to) : (s = t[n].to, r = t[n].from);
                            var a = this.hierarchicalLevels[s.id];
                            void 0 === this.positionedNodes[s.id] && a > o && ("UD" === this.options.hierarchical.direction || "DU" === this.options.hierarchical.direction ? (void 0 === s.x && (s.x = Math.max(i[a].distance, r.x)), i[a].distance = s.x + this.nodeSpacing, this.positionedNodes[s.id] = !0) : (void 0 === s.y && (s.y = Math.max(i[a].distance, r.y)), i[a].distance = s.y + this.nodeSpacing), this.positionedNodes[s.id] = !0, s.edges.length > 1 && this._placeBranchNodes(s.edges, s.id, i, a))
                        }
                    }
                    }
                ]), t
            }();
            e["default"] = r, t.exports = e["default"]
        },
        function (t, e, i) {
            function o(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var n = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), s = i(7), r = i(3), a = i(27), h = function () {
                function t(e, i, n) {
                    var r = this;
                    o(this, t), this.body = e, this.canvas = i, this.selectionHandler = n, this.editMode = !1, this.manipulationDiv = void 0, this.editModeDiv = void 0, this.closeDiv = void 0, this.manipulationHammers = [], this.temporaryUIFunctions = {}, this.temporaryEventFunctions = [], this.touchTime = 0, this.temporaryIds = {
                        nodes: [],
                        edges: []
                    }, this.guiEnabled = !1, this.inMode = !1, this.selectedControlNode = void 0, this.options = {}, this.defaultOptions = {
                        enabled: !1,
                        initiallyActive: !1,
                        addNode: !0,
                        addEdge: !0,
                        editNode: void 0,
                        editEdge: !0,
                        deleteNode: !0,
                        deleteEdge: !0,
                        controlNodeStyle: {
                            shape: "dot",
                            size: 6,
                            color: {
                                background: "#ff0000",
                                border: "#3c3c3c",
                                highlight: {background: "#07f968", border: "#3c3c3c"}
                            },
                            borderWidth: 2,
                            borderWidthSelected: 2
                        }
                    }, s.extend(this.options, this.defaultOptions), this.body.emitter.on("destroy", function () {
                        r._clean()
                    }), this.body.emitter.on("_dataChanged", this._restore.bind(this)), this.body.emitter.on("_resetData", this._restore.bind(this))
                }

                return n(t, [
                    {
                        key: "_restore", value: function () {
                        this.inMode !== !1 && (this.options.initiallyActive === !0 ? this.enableEditMode() : this.disableEditMode())
                    }
                    },
                    {
                        key: "setOptions", value: function (t, e, i) {
                        void 0 !== e && (void 0 !== e.locale ? this.options.locale = e.locale : this.options.locale = i.locale, void 0 !== e.locales ? this.options.locales = e.locales : this.options.locales = i.locales), void 0 !== t && ("boolean" == typeof t ? this.options.enabled = t : (this.options.enabled = !0, s.deepExtend(this.options, t)), this.options.initiallyActive === !0 && (this.editMode = !0), this._setup())
                    }
                    },
                    {
                        key: "toggleEditMode", value: function () {
                        this.editMode === !0 ? this.disableEditMode() : this.enableEditMode()
                    }
                    },
                    {
                        key: "enableEditMode", value: function () {
                        this.editMode = !0, this._clean(), this.guiEnabled === !0 && (this.manipulationDiv.style.display = "block", this.closeDiv.style.display = "block", this.editModeDiv.style.display = "none", this.showManipulatorToolbar())
                    }
                    },
                    {
                        key: "disableEditMode", value: function () {
                        this.editMode = !1, this._clean(), this.guiEnabled === !0 && (this.manipulationDiv.style.display = "none", this.closeDiv.style.display = "none", this.editModeDiv.style.display = "block", this._createEditButton())
                    }
                    },
                    {
                        key: "showManipulatorToolbar", value: function () {
                        if (this._clean(), this.manipulationDOM = {}, this.guiEnabled === !0) {
                            this.editMode = !0, this.manipulationDiv.style.display = "block", this.closeDiv.style.display = "block";
                            var t = this.selectionHandler._getSelectedNodeCount(), e = this.selectionHandler._getSelectedEdgeCount(), i = t + e, o = this.options.locales[this.options.locale], n = !1;
                            this.options.addNode !== !1 && (this._createAddNodeButton(o), n = !0), this.options.addEdge !== !1 && (n === !0 ? this._createSeperator(1) : n = !0, this._createAddEdgeButton(o)), 1 === t && "function" == typeof this.options.editNode ? (n === !0 ? this._createSeperator(2) : n = !0, this._createEditNodeButton(o)) : 1 === e && 0 === t && this.options.editEdge !== !1 && (n === !0 ? this._createSeperator(3) : n = !0, this._createEditEdgeButton(o)), 0 !== i && (t > 0 && this.options.deleteNode !== !1 ? (n === !0 && this._createSeperator(4), this._createDeleteButton(o)) : 0 === t && this.options.deleteEdge !== !1 && (n === !0 && this._createSeperator(4), this._createDeleteButton(o))), this._bindHammerToDiv(this.closeDiv, this.toggleEditMode.bind(this)), this._temporaryBindEvent("select", this.showManipulatorToolbar.bind(this))
                        }
                        this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "addNodeMode", value: function () {
                        if (this.editMode !== !0 && this.enableEditMode(), this._clean(), this.inMode = "addNode", this.guiEnabled === !0) {
                            var t = this.options.locales[this.options.locale];
                            this.manipulationDOM = {}, this._createBackButton(t), this._createSeperator(), this._createDescription(t.addDescription || this.options.locales.en.addDescription), this._bindHammerToDiv(this.closeDiv, this.toggleEditMode.bind(this))
                        }
                        this._temporaryBindEvent("click", this._performAddNode.bind(this))
                    }
                    },
                    {
                        key: "editNode", value: function () {
                        var t = this;
                        this.editMode !== !0 && this.enableEditMode(), this._clean();
                        var e = this.selectionHandler._getSelectedNode();
                        if (void 0 !== e) {
                            if (this.inMode = "editNode", "function" != typeof this.options.editNode)throw new Error("No function has been configured to handle the editing of nodes.");
                            if (e.isCluster !== !0) {
                                var i = s.deepExtend({}, e.options, !0);
                                if (i.x = e.x, i.y = e.y, 2 !== this.options.editNode.length)throw new Error("The function for edit does not support two arguments (data, callback)");
                                this.options.editNode(i, function (e) {
                                    null !== e && void 0 !== e && "editNode" === t.inMode && t.body.data.nodes.getDataSet().update(e), t.showManipulatorToolbar()
                                })
                            } else alert(this.options.locales[this.options.locale].editClusterError || this.options.locales.en.editClusterError)
                        } else this.showManipulatorToolbar()
                    }
                    },
                    {
                        key: "addEdgeMode", value: function () {
                        if (this.editMode !== !0 && this.enableEditMode(), this._clean(), this.inMode = "addEdge", this.guiEnabled === !0) {
                            var t = this.options.locales[this.options.locale];
                            this.manipulationDOM = {}, this._createBackButton(t), this._createSeperator(), this._createDescription(t.edgeDescription || this.options.locales.en.edgeDescription), this._bindHammerToDiv(this.closeDiv, this.toggleEditMode.bind(this))
                        }
                        this._temporaryBindUI("onTouch", this._handleConnect.bind(this)), this._temporaryBindUI("onDragEnd", this._finishConnect.bind(this)), this._temporaryBindUI("onDrag", this._dragControlNode.bind(this)), this._temporaryBindUI("onRelease", this._finishConnect.bind(this)), this._temporaryBindUI("onDragStart", function () {
                        }), this._temporaryBindUI("onHold", function () {
                        })
                    }
                    },
                    {
                        key: "editEdgeMode", value: function () {
                        var t = this;
                        if (this.editMode !== !0 && this.enableEditMode(), this._clean(), this.inMode = "editEdge", this.guiEnabled === !0) {
                            var e = this.options.locales[this.options.locale];
                            this.manipulationDOM = {}, this._createBackButton(e), this._createSeperator(), this._createDescription(e.editEdgeDescription || this.options.locales.en.editEdgeDescription), this._bindHammerToDiv(this.closeDiv, this.toggleEditMode.bind(this))
                        }
                        this.edgeBeingEditedId = this.selectionHandler.getSelectedEdges()[0], void 0 !== this.edgeBeingEditedId ? !function () {
                                var e = t.body.edges[t.edgeBeingEditedId], i = t._getNewTargetNode(e.from.x, e.from.y), o = t._getNewTargetNode(e.to.x, e.to.y);
                                t.temporaryIds.nodes.push(i.id), t.temporaryIds.nodes.push(o.id), t.body.nodes[i.id] = i, t.body.nodeIndices.push(i.id), t.body.nodes[o.id] = o, t.body.nodeIndices.push(o.id), t._temporaryBindUI("onTouch", t._controlNodeTouch.bind(t)), t._temporaryBindUI("onTap", function () {
                                }), t._temporaryBindUI("onHold", function () {
                                }), t._temporaryBindUI("onDragStart", t._controlNodeDragStart.bind(t)), t._temporaryBindUI("onDrag", t._controlNodeDrag.bind(t)), t._temporaryBindUI("onDragEnd", t._controlNodeDragEnd.bind(t)), t._temporaryBindUI("onMouseMove", function () {
                                }), t._temporaryBindEvent("beforeDrawing", function (t) {
                                    var n = e.edgeType.findBorderPositions(t);
                                    i.selected === !1 && (i.x = n.from.x, i.y = n.from.y), o.selected === !1 && (o.x = n.to.x, o.y = n.to.y)
                                }), t.body.emitter.emit("_redraw")
                            }() : this.showManipulatorToolbar()
                    }
                    },
                    {
                        key: "deleteSelected", value: function () {
                        var t = this;
                        this.editMode !== !0 && this.enableEditMode(), this._clean(), this.inMode = "delete";
                        var e = this.selectionHandler.getSelectedNodes(), i = this.selectionHandler.getSelectedEdges(), o = void 0;
                        if (e.length > 0) {
                            for (var n = 0; n < e.length; n++)if (this.body.nodes[e[n]].isCluster === !0)return void alert(this.options.locales[this.options.locale].deleteClusterError || this.options.locales.en.deleteClusterError);
                            "function" == typeof this.options.deleteNode && (o = this.options.deleteNode)
                        } else i.length > 0 && "function" == typeof this.options.deleteEdge && (o = this.options.deleteEdge);
                        if ("function" == typeof o) {
                            var s = {nodes: e, edges: i};
                            if (2 !== o.length)throw new Error("The function for delete does not support two arguments (data, callback)");
                            o(s, function (e) {
                                null !== e && void 0 !== e && "delete" === t.inMode ? (t.body.data.edges.getDataSet().remove(e.edges), t.body.data.nodes.getDataSet().remove(e.nodes), t.body.emitter.emit("startSimulation"), t.showManipulatorToolbar()) : (t.body.emitter.emit("startSimulation"), t.showManipulatorToolbar())
                            })
                        } else this.body.data.edges.getDataSet().remove(i), this.body.data.nodes.getDataSet().remove(e), this.body.emitter.emit("startSimulation"), this.showManipulatorToolbar()
                    }
                    },
                    {
                        key: "_setup", value: function () {
                        this.options.enabled === !0 ? (this.guiEnabled = !0, this._createWrappers(), this.editMode === !1 ? this._createEditButton() : this.showManipulatorToolbar()) : (this._removeManipulationDOM(), this.guiEnabled = !1)
                    }
                    },
                    {
                        key: "_createWrappers", value: function () {
                        void 0 === this.manipulationDiv && (this.manipulationDiv = document.createElement("div"), this.manipulationDiv.className = "vis-manipulation", this.editMode === !0 ? this.manipulationDiv.style.display = "block" : this.manipulationDiv.style.display = "none", this.canvas.frame.appendChild(this.manipulationDiv)), void 0 === this.editModeDiv && (this.editModeDiv = document.createElement("div"), this.editModeDiv.className = "vis-edit-mode", this.editMode === !0 ? this.editModeDiv.style.display = "none" : this.editModeDiv.style.display = "block", this.canvas.frame.appendChild(this.editModeDiv)), void 0 === this.closeDiv && (this.closeDiv = document.createElement("div"), this.closeDiv.className = "vis-close", this.closeDiv.style.display = this.manipulationDiv.style.display, this.canvas.frame.appendChild(this.closeDiv))
                    }
                    },
                    {
                        key: "_getNewTargetNode", value: function (t, e) {
                        var i = s.deepExtend({}, this.options.controlNodeStyle);
                        return i.id = "targetNode" + s.randomUUID(), i.hidden = !1, i.physics = !1, i.x = t, i.y = e, this.body.functions.createNode(i)
                    }
                    },
                    {
                        key: "_createEditButton", value: function () {
                        this._clean(), this.manipulationDOM = {}, s.recursiveDOMDelete(this.editModeDiv);
                        var t = this.options.locales[this.options.locale], e = this._createButton("editMode", "vis-button vis-edit vis-edit-mode", t.edit || this.options.locales.en.edit);
                        this.editModeDiv.appendChild(e), this._bindHammerToDiv(e, this.toggleEditMode.bind(this))
                    }
                    },
                    {
                        key: "_clean", value: function () {
                        this.inMode = !1, this.guiEnabled === !0 && (s.recursiveDOMDelete(this.editModeDiv), s.recursiveDOMDelete(this.manipulationDiv), this._cleanManipulatorHammers()), this._cleanupTemporaryNodesAndEdges(), this._unbindTemporaryUIs(), this._unbindTemporaryEvents(), this.body.emitter.emit("restorePhysics")
                    }
                    },
                    {
                        key: "_cleanManipulatorHammers", value: function () {
                        if (0 != this.manipulationHammers.length) {
                            for (var t = 0; t < this.manipulationHammers.length; t++)this.manipulationHammers[t].destroy();
                            this.manipulationHammers = []
                        }
                    }
                    },
                    {
                        key: "_removeManipulationDOM", value: function () {
                        this._clean(), s.recursiveDOMDelete(this.manipulationDiv), s.recursiveDOMDelete(this.editModeDiv), s.recursiveDOMDelete(this.closeDiv), this.manipulationDiv && this.canvas.frame.removeChild(this.manipulationDiv), this.editModeDiv && this.canvas.frame.removeChild(this.editModeDiv), this.closeDiv && this.canvas.frame.removeChild(this.manipulationDiv), this.manipulationDiv = void 0, this.editModeDiv = void 0, this.closeDiv = void 0
                    }
                    },
                    {
                        key: "_createSeperator", value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                        this.manipulationDOM["seperatorLineDiv" + t] = document.createElement("div"), this.manipulationDOM["seperatorLineDiv" + t].className = "vis-separator-line", this.manipulationDiv.appendChild(this.manipulationDOM["seperatorLineDiv" + t])
                    }
                    },
                    {
                        key: "_createAddNodeButton", value: function (t) {
                        var e = this._createButton("addNode", "vis-button vis-add", t.addNode || this.options.locales.en.addNode);
                        this.manipulationDiv.appendChild(e), this._bindHammerToDiv(e, this.addNodeMode.bind(this))
                    }
                    },
                    {
                        key: "_createAddEdgeButton", value: function (t) {
                        var e = this._createButton("addEdge", "vis-button vis-connect", t.addEdge || this.options.locales.en.addEdge);
                        this.manipulationDiv.appendChild(e), this._bindHammerToDiv(e, this.addEdgeMode.bind(this))
                    }
                    },
                    {
                        key: "_createEditNodeButton", value: function (t) {
                        var e = this._createButton("editNode", "vis-button vis-edit", t.editNode || this.options.locales.en.editNode);
                        this.manipulationDiv.appendChild(e), this._bindHammerToDiv(e, this.editNode.bind(this))
                    }
                    },
                    {
                        key: "_createEditEdgeButton", value: function (t) {
                        var e = this._createButton("editEdge", "vis-button vis-edit", t.editEdge || this.options.locales.en.editEdge);
                        this.manipulationDiv.appendChild(e), this._bindHammerToDiv(e, this.editEdgeMode.bind(this))
                    }
                    },
                    {
                        key: "_createDeleteButton", value: function (t) {
                        var e = this._createButton("delete", "vis-button vis-delete", t.del || this.options.locales.en.del);
                        this.manipulationDiv.appendChild(e), this._bindHammerToDiv(e, this.deleteSelected.bind(this))
                    }
                    },
                    {
                        key: "_createBackButton", value: function (t) {
                        var e = this._createButton("back", "vis-button vis-back", t.back || this.options.locales.en.back);
                        this.manipulationDiv.appendChild(e), this._bindHammerToDiv(e, this.showManipulatorToolbar.bind(this))
                    }
                    },
                    {
                        key: "_createButton", value: function (t, e, i) {
                        var o = arguments.length <= 3 || void 0 === arguments[3] ? "vis-label" : arguments[3];
                        return this.manipulationDOM[t + "Div"] = document.createElement("div"), this.manipulationDOM[t + "Div"].className = e, this.manipulationDOM[t + "Label"] = document.createElement("div"), this.manipulationDOM[t + "Label"].className = o, this.manipulationDOM[t + "Label"].innerHTML = i, this.manipulationDOM[t + "Div"].appendChild(this.manipulationDOM[t + "Label"]), this.manipulationDOM[t + "Div"]
                    }
                    },
                    {
                        key: "_createDescription", value: function (t) {
                        this.manipulationDiv.appendChild(this._createButton("description", "vis-button vis-none", t))
                    }
                    },
                    {
                        key: "_temporaryBindEvent", value: function (t, e) {
                        this.temporaryEventFunctions.push({event: t, boundFunction: e}), this.body.emitter.on(t, e)
                    }
                    },
                    {
                        key: "_temporaryBindUI", value: function (t, e) {
                        if (void 0 === this.body.eventListeners[t])throw new Error("This UI function does not exist. Typo? You tried: " + t + " possible are: " + JSON.stringify(Object.keys(this.body.eventListeners)));
                        this.temporaryUIFunctions[t] = this.body.eventListeners[t], this.body.eventListeners[t] = e
                    }
                    },
                    {
                        key: "_unbindTemporaryUIs", value: function () {
                        for (var t in this.temporaryUIFunctions)this.temporaryUIFunctions.hasOwnProperty(t) && (this.body.eventListeners[t] = this.temporaryUIFunctions[t], delete this.temporaryUIFunctions[t]);
                        this.temporaryUIFunctions = {}
                    }
                    },
                    {
                        key: "_unbindTemporaryEvents", value: function () {
                        for (var t = 0; t < this.temporaryEventFunctions.length; t++) {
                            var e = this.temporaryEventFunctions[t].event, i = this.temporaryEventFunctions[t].boundFunction;
                            this.body.emitter.off(e, i)
                        }
                        this.temporaryEventFunctions = []
                    }
                    },
                    {
                        key: "_bindHammerToDiv", value: function (t, e) {
                        var i = new r(t, {});
                        a.onTouch(i, e), this.manipulationHammers.push(i)
                    }
                    },
                    {
                        key: "_cleanupTemporaryNodesAndEdges", value: function () {
                        for (var t = 0; t < this.temporaryIds.edges.length; t++) {
                            this.body.edges[this.temporaryIds.edges[t]].disconnect(), delete this.body.edges[this.temporaryIds.edges[t]];
                            var e = this.body.edgeIndices.indexOf(this.temporaryIds.edges[t]);
                            -1 !== e && this.body.edgeIndices.splice(e, 1)
                        }
                        for (var t = 0; t < this.temporaryIds.nodes.length; t++) {
                            delete this.body.nodes[this.temporaryIds.nodes[t]];
                            var i = this.body.nodeIndices.indexOf(this.temporaryIds.nodes[t]);
                            -1 !== i && this.body.nodeIndices.splice(i, 1)
                        }
                        this.temporaryIds = {nodes: [], edges: []}
                    }
                    },
                    {
                        key: "_controlNodeTouch", value: function (t) {
                        this.selectionHandler.unselectAll(), this.lastTouch = this.body.functions.getPointer(t.center), this.lastTouch.translation = s.extend({}, this.body.view.translation)
                    }
                    },
                    {
                        key: "_controlNodeDragStart", value: function (t) {
                        var e = this.lastTouch, i = this.selectionHandler._pointerToPositionObject(e), o = this.body.nodes[this.temporaryIds.nodes[0]], n = this.body.nodes[this.temporaryIds.nodes[1]], s = this.body.edges[this.edgeBeingEditedId];
                        this.selectedControlNode = void 0;
                        var r = o.isOverlappingWith(i), a = n.isOverlappingWith(i);
                        r === !0 ? (this.selectedControlNode = o, s.edgeType.from = o) : a === !0 && (this.selectedControlNode = n, s.edgeType.to = n), this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "_controlNodeDrag", value: function (t) {
                        this.body.emitter.emit("disablePhysics");
                        var e = this.body.functions.getPointer(t.center), i = this.canvas.DOMtoCanvas(e);
                        if (void 0 !== this.selectedControlNode) this.selectedControlNode.x = i.x, this.selectedControlNode.y = i.y; else {
                            var o = e.x - this.lastTouch.x, n = e.y - this.lastTouch.y;
                            this.body.view.translation = {
                                x: this.lastTouch.translation.x + o,
                                y: this.lastTouch.translation.y + n
                            }
                        }
                        this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "_controlNodeDragEnd", value: function (t) {
                        for (var e = this.body.functions.getPointer(t.center), i = this.selectionHandler._pointerToPositionObject(e), o = this.body.edges[this.edgeBeingEditedId], n = this.selectionHandler._getAllNodesOverlappingWith(i), s = void 0, r = n.length - 1; r >= 0; r--)if (n[r] !== this.selectedControlNode.id) {
                            s = this.body.nodes[n[r]];
                            break
                        }
                        if (void 0 !== s && void 0 !== this.selectedControlNode)if (s.isCluster === !0) alert(this.options.locales[this.options.locale].createEdgeError || this.options.locales.en.createEdgeError); else {
                            var a = this.body.nodes[this.temporaryIds.nodes[0]];
                            this.selectedControlNode.id === a.id ? this._performEditEdge(s.id, o.to.id) : this._performEditEdge(o.from.id, s.id)
                        } else o.updateEdgeType(), this.body.emitter.emit("restorePhysics");
                        this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "_handleConnect", value: function (t) {
                        if ((new Date).valueOf() - this.touchTime > 100) {
                            this.lastTouch = this.body.functions.getPointer(t.center), this.lastTouch.translation = s.extend({}, this.body.view.translation);
                            var e = this.lastTouch, i = this.selectionHandler.getNodeAt(e);
                            if (void 0 !== i)if (i.isCluster === !0) alert(this.options.locales[this.options.locale].createEdgeError || this.options.locales.en.createEdgeError); else {
                                var o = this._getNewTargetNode(i.x, i.y);
                                this.body.nodes[o.id] = o, this.body.nodeIndices.push(o.id);
                                var n = this.body.functions.createEdge({
                                    id: "connectionEdge" + s.randomUUID(),
                                    from: i.id,
                                    to: o.id,
                                    physics: !1,
                                    smooth: {enabled: !0, type: "continuous", roundness: .5}
                                });
                                this.body.edges[n.id] = n, this.body.edgeIndices.push(n.id), this.temporaryIds.nodes.push(o.id), this.temporaryIds.edges.push(n.id)
                            }
                            this.touchTime = (new Date).valueOf()
                        }
                    }
                    },
                    {
                        key: "_dragControlNode", value: function (t) {
                        var e = this.body.functions.getPointer(t.center);
                        if (void 0 !== this.temporaryIds.nodes[0]) {
                            var i = this.body.nodes[this.temporaryIds.nodes[0]];
                            i.x = this.canvas._XconvertDOMtoCanvas(e.x), i.y = this.canvas._YconvertDOMtoCanvas(e.y), this.body.emitter.emit("_redraw")
                        } else {
                            var o = e.x - this.lastTouch.x, n = e.y - this.lastTouch.y;
                            this.body.view.translation = {
                                x: this.lastTouch.translation.x + o,
                                y: this.lastTouch.translation.y + n
                            }
                        }
                    }
                    },
                    {
                        key: "_finishConnect", value: function (t) {
                        var e = this.body.functions.getPointer(t.center), i = this.selectionHandler._pointerToPositionObject(e), o = void 0;
                        void 0 !== this.temporaryIds.edges[0] && (o = this.body.edges[this.temporaryIds.edges[0]].fromId);
                        for (var n = this.selectionHandler._getAllNodesOverlappingWith(i), s = void 0, r = n.length - 1; r >= 0; r--)if (-1 === this.temporaryIds.nodes.indexOf(n[r])) {
                            s = this.body.nodes[n[r]];
                            break
                        }
                        this._cleanupTemporaryNodesAndEdges(), void 0 !== s && (s.isCluster === !0 ? alert(this.options.locales[this.options.locale].createEdgeError || this.options.locales.en.createEdgeError) : void 0 !== this.body.nodes[o] && void 0 !== this.body.nodes[s.id] && this._performAddEdge(o, s.id)), this.body.emitter.emit("_redraw")
                    }
                    },
                    {
                        key: "_performAddNode", value: function (t) {
                        var e = this, i = {
                            id: s.randomUUID(),
                            x: t.pointer.canvas.x,
                            y: t.pointer.canvas.y,
                            label: "new"
                        };
                        if ("function" == typeof this.options.addNode) {
                            if (2 !== this.options.addNode.length)throw new Error("The function for add does not support two arguments (data,callback)");
                            this.options.addNode(i, function (t) {
                                null !== t && void 0 !== t && "addNode" === e.inMode && (e.body.data.nodes.getDataSet().add(t), e.showManipulatorToolbar())
                            })
                        } else this.body.data.nodes.getDataSet().add(i), this.showManipulatorToolbar()
                    }
                    },
                    {
                        key: "_performAddEdge", value: function (t, e) {
                        var i = this, o = {from: t, to: e};
                        if ("function" == typeof this.options.addEdge) {
                            if (2 !== this.options.addEdge.length)throw new Error("The function for connect does not support two arguments (data,callback)");
                            this.options.addEdge(o, function (t) {
                                null !== t && void 0 !== t && "addEdge" === i.inMode && (i.body.data.edges.getDataSet().add(t), i.selectionHandler.unselectAll(), i.showManipulatorToolbar())
                            })
                        } else this.body.data.edges.getDataSet().add(o), this.selectionHandler.unselectAll(), this.showManipulatorToolbar()
                    }
                    },
                    {
                        key: "_performEditEdge", value: function (t, e) {
                        var i = this, o = {id: this.edgeBeingEditedId, from: t, to: e};
                        if ("function" == typeof this.options.editEdge) {
                            if (2 !== this.options.editEdge.length)throw new Error("The function for edit does not support two arguments (data, callback)");
                            this.options.editEdge(o, function (t) {
                                null === t || void 0 === t || "editEdge" !== i.inMode ? (i.body.edges[o.id].updateEdgeType(), i.body.emitter.emit("_redraw")) : (i.body.data.edges.getDataSet().update(t), i.selectionHandler.unselectAll(), i.showManipulatorToolbar())
                            })
                        } else this.body.data.edges.getDataSet().update(o), this.selectionHandler.unselectAll(), this.showManipulatorToolbar()
                    }
                    }
                ]), t
            }();
            e["default"] = h, t.exports = e["default"]
        },
        function (t, e) {
            Object.defineProperty(e, "__esModule", {value: !0});
            var i = "string", o = "boolean", n = "number", s = "array", r = "object", a = "dom", h = "any", d = {
                configure: {
                    enabled: {"boolean": o},
                    filter: {"boolean": o, string: i, array: s, "function": "function"},
                    container: {dom: a},
                    showButton: {"boolean": o},
                    __type__: {object: r, "boolean": o, string: i, array: s, "function": "function"}
                },
                edges: {
                    arrows: {
                        to: {
                            enabled: {"boolean": o},
                            scaleFactor: {number: n},
                            __type__: {object: r, "boolean": o}
                        },
                        middle: {
                            enabled: {"boolean": o},
                            scaleFactor: {number: n},
                            __type__: {object: r, "boolean": o}
                        },
                        from: {enabled: {"boolean": o}, scaleFactor: {number: n}, __type__: {object: r, "boolean": o}},
                        __type__: {string: ["from", "to", "middle"], object: r}
                    },
                    color: {
                        color: {string: i},
                        highlight: {string: i},
                        hover: {string: i},
                        inherit: {string: ["from", "to", "both"], "boolean": o},
                        opacity: {number: n},
                        __type__: {object: r, string: i}
                    },
                    dashes: {"boolean": o, array: s},
                    font: {
                        color: {string: i},
                        size: {number: n},
                        face: {string: i},
                        background: {string: i},
                        strokeWidth: {number: n},
                        strokeColor: {string: i},
                        align: {string: ["horizontal", "top", "middle", "bottom"]},
                        __type__: {object: r, string: i}
                    },
                    hidden: {"boolean": o},
                    hoverWidth: {"function": "function", number: n},
                    label: {string: i, undefined: "undefined"},
                    labelHighlightBold: {"boolean": o},
                    length: {number: n, undefined: "undefined"},
                    physics: {"boolean": o},
                    scaling: {
                        min: {number: n},
                        max: {number: n},
                        label: {
                            enabled: {"boolean": o},
                            min: {number: n},
                            max: {number: n},
                            maxVisible: {number: n},
                            drawThreshold: {number: n},
                            __type__: {object: r, "boolean": o}
                        },
                        customScalingFunction: {"function": "function"},
                        __type__: {object: r}
                    },
                    selectionWidth: {"function": "function", number: n},
                    selfReferenceSize: {number: n},
                    shadow: {
                        enabled: {"boolean": o},
                        size: {number: n},
                        x: {number: n},
                        y: {number: n},
                        __type__: {object: r, "boolean": o}
                    },
                    smooth: {
                        enabled: {"boolean": o},
                        type: {string: ["dynamic", "continuous", "discrete", "diagonalCross", "straightCross", "horizontal", "vertical", "curvedCW", "curvedCCW", "cubicBezier"]},
                        roundness: {number: n},
                        forceDirection: {string: ["horizontal", "vertical", "none"], "boolean": o},
                        __type__: {object: r, "boolean": o}
                    },
                    title: {string: i, undefined: "undefined"},
                    width: {number: n},
                    value: {number: n, undefined: "undefined"},
                    __type__: {object: r}
                },
                groups: {
                    useDefaultGroups: {"boolean": o},
                    __any__: "get from nodes, will be overwritten below",
                    __type__: {object: r}
                },
                interaction: {
                    dragNodes: {"boolean": o},
                    dragView: {"boolean": o},
                    hideEdgesOnDrag: {"boolean": o},
                    hideNodesOnDrag: {"boolean": o},
                    hover: {"boolean": o},
                    keyboard: {
                        enabled: {"boolean": o},
                        speed: {x: {number: n}, y: {number: n}, zoom: {number: n}, __type__: {object: r}},
                        bindToWindow: {"boolean": o},
                        __type__: {object: r, "boolean": o}
                    },
                    multiselect: {"boolean": o},
                    navigationButtons: {"boolean": o},
                    selectable: {"boolean": o},
                    selectConnectedEdges: {"boolean": o},
                    hoverConnectedEdges: {"boolean": o},
                    tooltipDelay: {number: n},
                    zoomView: {"boolean": o},
                    __type__: {object: r}
                },
                layout: {
                    randomSeed: {undefined: "undefined", number: n},
                    hierarchical: {
                        enabled: {"boolean": o},
                        levelSeparation: {number: n},
                        direction: {string: ["UD", "DU", "LR", "RL"]},
                        sortMethod: {string: ["hubsize", "directed"]},
                        __type__: {object: r, "boolean": o}
                    },
                    __type__: {object: r}
                },
                manipulation: {
                    enabled: {"boolean": o},
                    initiallyActive: {"boolean": o},
                    addNode: {"boolean": o, "function": "function"},
                    addEdge: {"boolean": o, "function": "function"},
                    editNode: {"function": "function"},
                    editEdge: {"boolean": o, "function": "function"},
                    deleteNode: {"boolean": o, "function": "function"},
                    deleteEdge: {"boolean": o, "function": "function"},
                    controlNodeStyle: "get from nodes, will be overwritten below",
                    __type__: {object: r, "boolean": o}
                },
                nodes: {
                    borderWidth: {number: n},
                    borderWidthSelected: {number: n, undefined: "undefined"},
                    brokenImage: {string: i, undefined: "undefined"},
                    color: {
                        border: {string: i},
                        background: {string: i},
                        highlight: {border: {string: i}, background: {string: i}, __type__: {object: r, string: i}},
                        hover: {border: {string: i}, background: {string: i}, __type__: {object: r, string: i}},
                        __type__: {object: r, string: i}
                    },
                    fixed: {x: {"boolean": o}, y: {"boolean": o}, __type__: {object: r, "boolean": o}},
                    font: {
                        color: {string: i},
                        size: {number: n},
                        face: {string: i},
                        background: {string: i},
                        strokeWidth: {number: n},
                        strokeColor: {string: i},
                        __type__: {object: r, string: i}
                    },
                    group: {string: i, number: n, undefined: "undefined"},
                    hidden: {"boolean": o},
                    icon: {
                        face: {string: i},
                        code: {string: i},
                        size: {number: n},
                        color: {string: i},
                        __type__: {object: r}
                    },
                    id: {string: i, number: n},
                    image: {string: i, undefined: "undefined"},
                    label: {string: i, undefined: "undefined"},
                    labelHighlightBold: {"boolean": o},
                    level: {number: n, undefined: "undefined"},
                    mass: {number: n},
                    physics: {"boolean": o},
                    scaling: {
                        min: {number: n},
                        max: {number: n},
                        label: {
                            enabled: {"boolean": o},
                            min: {number: n},
                            max: {number: n},
                            maxVisible: {number: n},
                            drawThreshold: {number: n},
                            __type__: {object: r, "boolean": o}
                        },
                        customScalingFunction: {
                            "function": "function"
                        },
                        __type__: {object: r}
                    },
                    shadow: {
                        enabled: {"boolean": o},
                        size: {number: n},
                        x: {number: n},
                        y: {number: n},
                        __type__: {object: r, "boolean": o}
                    },
                    shape: {string: ["ellipse", "circle", "database", "box", "text", "image", "circularImage", "diamond", "dot", "star", "triangle", "triangleDown", "square", "icon"]},
                    shapeProperties: {
                        borderDashes: {"boolean": o, array: s},
                        borderRadius: {number: n},
                        useImageSize: {"boolean": o},
                        __type__: {object: r}
                    },
                    size: {number: n},
                    title: {string: i, undefined: "undefined"},
                    value: {number: n, undefined: "undefined"},
                    x: {number: n},
                    y: {number: n},
                    __type__: {object: r}
                },
                physics: {
                    enabled: {"boolean": o},
                    barnesHut: {
                        gravitationalConstant: {number: n},
                        centralGravity: {number: n},
                        springLength: {number: n},
                        springConstant: {number: n},
                        damping: {number: n},
                        avoidOverlap: {number: n},
                        __type__: {object: r}
                    },
                    forceAtlas2Based: {
                        gravitationalConstant: {number: n},
                        centralGravity: {number: n},
                        springLength: {number: n},
                        springConstant: {number: n},
                        damping: {number: n},
                        avoidOverlap: {number: n},
                        __type__: {object: r}
                    },
                    repulsion: {
                        centralGravity: {number: n},
                        springLength: {number: n},
                        springConstant: {number: n},
                        nodeDistance: {number: n},
                        damping: {number: n},
                        __type__: {object: r}
                    },
                    hierarchicalRepulsion: {
                        centralGravity: {number: n},
                        springLength: {number: n},
                        springConstant: {number: n},
                        nodeDistance: {number: n},
                        damping: {number: n},
                        __type__: {object: r}
                    },
                    maxVelocity: {number: n},
                    minVelocity: {number: n},
                    solver: {string: ["barnesHut", "repulsion", "hierarchicalRepulsion", "forceAtlas2Based"]},
                    stabilization: {
                        enabled: {"boolean": o},
                        iterations: {number: n},
                        updateInterval: {number: n},
                        onlyDynamicEdges: {"boolean": o},
                        fit: {"boolean": o},
                        __type__: {object: r, "boolean": o}
                    },
                    timestep: {number: n},
                    __type__: {object: r, "boolean": o}
                },
                autoResize: {"boolean": o},
                clickToUse: {"boolean": o},
                locale: {string: i},
                locales: {__any__: {any: h}, __type__: {object: r}},
                height: {string: i},
                width: {string: i},
                __type__: {object: r}
            };
            d.groups.__any__ = d.nodes, d.manipulation.controlNodeStyle = d.nodes;
            var l = {
                nodes: {
                    borderWidth: [1, 0, 10, 1],
                    borderWidthSelected: [2, 0, 10, 1],
                    color: {
                        border: ["color", "#2B7CE9"],
                        background: ["color", "#97C2FC"],
                        highlight: {border: ["color", "#2B7CE9"], background: ["color", "#D2E5FF"]},
                        hover: {border: ["color", "#2B7CE9"], background: ["color", "#D2E5FF"]}
                    },
                    fixed: {x: !1, y: !1},
                    font: {
                        color: ["color", "#343434"],
                        size: [14, 0, 100, 1],
                        face: ["arial", "verdana", "tahoma"],
                        background: ["color", "none"],
                        strokeWidth: [0, 0, 50, 1],
                        strokeColor: ["color", "#ffffff"]
                    },
                    hidden: !1,
                    labelHighlightBold: !0,
                    physics: !0,
                    scaling: {
                        min: [10, 0, 200, 1],
                        max: [30, 0, 200, 1],
                        label: {
                            enabled: !1,
                            min: [14, 0, 200, 1],
                            max: [30, 0, 200, 1],
                            maxVisible: [30, 0, 200, 1],
                            drawThreshold: [5, 0, 20, 1]
                        }
                    },
                    shadow: {enabled: !1, size: [10, 0, 20, 1], x: [5, -30, 30, 1], y: [5, -30, 30, 1]},
                    shape: ["ellipse", "box", "circle", "database", "diamond", "dot", "square", "star", "text", "triangle", "triangleDown"],
                    shapeProperties: {borderDashes: !1, borderRadius: [6, 0, 20, 1], useImageSize: !1},
                    size: [25, 0, 200, 1]
                },
                edges: {
                    arrows: {
                        to: {enabled: !1, scaleFactor: [1, 0, 3, .05]},
                        middle: {enabled: !1, scaleFactor: [1, 0, 3, .05]},
                        from: {enabled: !1, scaleFactor: [1, 0, 3, .05]}
                    },
                    color: {
                        color: ["color", "#848484"],
                        highlight: ["color", "#848484"],
                        hover: ["color", "#848484"],
                        inherit: ["from", "to", "both", !0, !1],
                        opacity: [1, 0, 1, .05]
                    },
                    dashes: !1,
                    font: {
                        color: ["color", "#343434"],
                        size: [14, 0, 100, 1],
                        face: ["arial", "verdana", "tahoma"],
                        background: ["color", "none"],
                        strokeWidth: [2, 0, 50, 1],
                        strokeColor: ["color", "#ffffff"],
                        align: ["horizontal", "top", "middle", "bottom"]
                    },
                    hidden: !1,
                    hoverWidth: [1.5, 0, 5, .1],
                    labelHighlightBold: !0,
                    physics: !0,
                    scaling: {
                        min: [1, 0, 100, 1],
                        max: [15, 0, 100, 1],
                        label: {
                            enabled: !0,
                            min: [14, 0, 200, 1],
                            max: [30, 0, 200, 1],
                            maxVisible: [30, 0, 200, 1],
                            drawThreshold: [5, 0, 20, 1]
                        }
                    },
                    selectionWidth: [1.5, 0, 5, .1],
                    selfReferenceSize: [20, 0, 200, 1],
                    shadow: {enabled: !1, size: [10, 0, 20, 1], x: [5, -30, 30, 1], y: [5, -30, 30, 1]},
                    smooth: {
                        enabled: !0,
                        type: ["dynamic", "continuous", "discrete", "diagonalCross", "straightCross", "horizontal", "vertical", "curvedCW", "curvedCCW", "cubicBezier"],
                        forceDirection: ["horizontal", "vertical", "none"],
                        roundness: [.5, 0, 1, .05]
                    },
                    width: [1, 0, 30, 1]
                },
                layout: {
                    hierarchical: {
                        enabled: !1,
                        levelSeparation: [150, 20, 500, 5],
                        direction: ["UD", "DU", "LR", "RL"],
                        sortMethod: ["hubsize", "directed"]
                    }
                },
                interaction: {
                    dragNodes: !0,
                    dragView: !0,
                    hideEdgesOnDrag: !1,
                    hideNodesOnDrag: !1,
                    hover: !1,
                    keyboard: {
                        enabled: !1,
                        speed: {x: [10, 0, 40, 1], y: [10, 0, 40, 1], zoom: [.02, 0, .1, .005]},
                        bindToWindow: !0
                    },
                    multiselect: !1,
                    navigationButtons: !1,
                    selectable: !0,
                    selectConnectedEdges: !0,
                    hoverConnectedEdges: !0,
                    tooltipDelay: [300, 0, 1e3, 25],
                    zoomView: !0
                },
                manipulation: {enabled: !1, initiallyActive: !1},
                physics: {
                    enabled: !0,
                    barnesHut: {
                        gravitationalConstant: [-2e3, -3e4, 0, 50],
                        centralGravity: [.3, 0, 10, .05],
                        springLength: [95, 0, 500, 5],
                        springConstant: [.04, 0, 1.2, .005],
                        damping: [.09, 0, 1, .01],
                        avoidOverlap: [0, 0, 1, .01]
                    },
                    forceAtlas2Based: {
                        gravitationalConstant: [-50, -500, 0, 1],
                        centralGravity: [.01, 0, 1, .005],
                        springLength: [95, 0, 500, 5],
                        springConstant: [.08, 0, 1.2, .005],
                        damping: [.4, 0, 1, .01],
                        avoidOverlap: [0, 0, 1, .01]
                    },
                    repulsion: {
                        centralGravity: [.2, 0, 10, .05],
                        springLength: [200, 0, 500, 5],
                        springConstant: [.05, 0, 1.2, .005],
                        nodeDistance: [100, 0, 500, 5],
                        damping: [.09, 0, 1, .01]
                    },
                    hierarchicalRepulsion: {
                        centralGravity: [.2, 0, 10, .05],
                        springLength: [100, 0, 500, 5],
                        springConstant: [.01, 0, 1.2, .005],
                        nodeDistance: [120, 0, 500, 5],
                        damping: [.09, 0, 1, .01]
                    },
                    maxVelocity: [50, 0, 150, 1],
                    minVelocity: [.1, .01, .5, .01],
                    solver: ["barnesHut", "forceAtlas2Based", "repulsion", "hierarchicalRepulsion"],
                    timestep: [.5, .01, 1, .01]
                },
                global: {locale: ["en", "nl"]}
            };
            e.allOptions = d, e.configureOptions = l
        },
        function (t, e) {
            "undefined" != typeof CanvasRenderingContext2D && (CanvasRenderingContext2D.prototype.circle = function (t, e, i) {
                this.beginPath(), this.arc(t, e, i, 0, 2 * Math.PI, !1), this.closePath()
            }, CanvasRenderingContext2D.prototype.square = function (t, e, i) {
                this.beginPath(), this.rect(t - i, e - i, 2 * i, 2 * i), this.closePath()
            }, CanvasRenderingContext2D.prototype.triangle = function (t, e, i) {
                this.beginPath(), i *= 1.15, e += .275 * i;
                var o = 2 * i, n = o / 2, s = Math.sqrt(3) / 6 * o, r = Math.sqrt(o * o - n * n);
                this.moveTo(t, e - (r - s)), this.lineTo(t + n, e + s), this.lineTo(t - n, e + s), this.lineTo(t, e - (r - s)), this.closePath()
            }, CanvasRenderingContext2D.prototype.triangleDown = function (t, e, i) {
                this.beginPath(), i *= 1.15, e -= .275 * i;
                var o = 2 * i, n = o / 2, s = Math.sqrt(3) / 6 * o, r = Math.sqrt(o * o - n * n);
                this.moveTo(t, e + (r - s)), this.lineTo(t + n, e - s), this.lineTo(t - n, e - s), this.lineTo(t, e + (r - s)), this.closePath()
            }, CanvasRenderingContext2D.prototype.star = function (t, e, i) {
                this.beginPath(), i *= .82, e += .1 * i;
                for (var o = 0; 10 > o; o++) {
                    var n = o % 2 === 0 ? 1.3 * i : .5 * i;
                    this.lineTo(t + n * Math.sin(2 * o * Math.PI / 10), e - n * Math.cos(2 * o * Math.PI / 10))
                }
                this.closePath()
            }, CanvasRenderingContext2D.prototype.diamond = function (t, e, i) {
                this.beginPath(), this.lineTo(t, e + i), this.lineTo(t + i, e), this.lineTo(t, e - i), this.lineTo(t - i, e), this.closePath()
            }, CanvasRenderingContext2D.prototype.roundRect = function (t, e, i, o, n) {
                var s = Math.PI / 180;
                0 > i - 2 * n && (n = i / 2), 0 > o - 2 * n && (n = o / 2), this.beginPath(), this.moveTo(t + n, e), this.lineTo(t + i - n, e), this.arc(t + i - n, e + n, n, 270 * s, 360 * s, !1), this.lineTo(t + i, e + o - n), this.arc(t + i - n, e + o - n, n, 0, 90 * s, !1), this.lineTo(t + n, e + o), this.arc(t + n, e + o - n, n, 90 * s, 180 * s, !1), this.lineTo(t, e + n), this.arc(t + n, e + n, n, 180 * s, 270 * s, !1), this.closePath()
            }, CanvasRenderingContext2D.prototype.ellipse = function (t, e, i, o) {
                var n = .5522848, s = i / 2 * n, r = o / 2 * n, a = t + i, h = e + o, d = t + i / 2, l = e + o / 2;
                this.beginPath(), this.moveTo(t, l), this.bezierCurveTo(t, l - r, d - s, e, d, e), this.bezierCurveTo(d + s, e, a, l - r, a, l), this.bezierCurveTo(a, l + r, d + s, h, d, h), this.bezierCurveTo(d - s, h, t, l + r, t, l), this.closePath()
            }, CanvasRenderingContext2D.prototype.database = function (t, e, i, o) {
                var n = 1 / 3, s = i, r = o * n, a = .5522848, h = s / 2 * a, d = r / 2 * a, l = t + s, u = e + r, c = t + s / 2, p = e + r / 2, f = e + (o - r / 2), m = e + o;
                this.beginPath(), this.moveTo(l, p), this.bezierCurveTo(l, p + d, c + h, u, c, u), this.bezierCurveTo(c - h, u, t, p + d, t, p), this.bezierCurveTo(t, p - d, c - h, e, c, e), this.bezierCurveTo(c + h, e, l, p - d, l, p), this.lineTo(l, f), this.bezierCurveTo(l, f + d, c + h, m, c, m), this.bezierCurveTo(c - h, m, t, f + d, t, f), this.lineTo(t, p)
            }, CanvasRenderingContext2D.prototype.arrow = function (t, e, i, o) {
                var n = t - o * Math.cos(i), s = e - o * Math.sin(i), r = t - .9 * o * Math.cos(i), a = e - .9 * o * Math.sin(i), h = n + o / 3 * Math.cos(i + .5 * Math.PI), d = s + o / 3 * Math.sin(i + .5 * Math.PI), l = n + o / 3 * Math.cos(i - .5 * Math.PI), u = s + o / 3 * Math.sin(i - .5 * Math.PI);
                this.beginPath(), this.moveTo(t, e), this.lineTo(h, d), this.lineTo(r, a), this.lineTo(l, u), this.closePath()
            }, CanvasRenderingContext2D.prototype.dashedLine = function (t, e, i, o, n) {
                this.beginPath(), this.moveTo(t, e);
                for (var s = n.length, r = i - t, a = o - e, h = a / r, d = Math.sqrt(r * r + a * a), l = 0, u = !0, c = 0, p = n[0]; d >= .1;)p = n[l++ % s], p > d && (p = d), c = Math.sqrt(p * p / (1 + h * h)), c = 0 > r ? -c : c, t += c, e += h * c, u === !0 ? this.lineTo(t, e) : this.moveTo(t, e), d -= p, u = !u
            })
        },
        function (t, e) {
            function i(t) {
                return P = t, p()
            }

            function o() {
                I = 0, z = P.charAt(0)
            }

            function n() {
                I++, z = P.charAt(I)
            }

            function s() {
                return P.charAt(I + 1)
            }

            function r(t) {
                return L.test(t)
            }

            function a(t, e) {
                if (t || (t = {}), e)for (var i in e)e.hasOwnProperty(i) && (t[i] = e[i]);
                return t
            }

            function h(t, e, i) {
                for (var o = e.split("."), n = t; o.length;) {
                    var s = o.shift();
                    o.length ? (n[s] || (n[s] = {}), n = n[s]) : n[s] = i
                }
            }

            function d(t, e) {
                for (var i, o, n = null, s = [t], r = t; r.parent;)s.push(r.parent), r = r.parent;
                if (r.nodes)for (i = 0, o = r.nodes.length; o > i; i++)if (e.id === r.nodes[i].id) {
                    n = r.nodes[i];
                    break
                }
                for (n || (n = {id: e.id}, t.node && (n.attr = a(n.attr, t.node))), i = s.length - 1; i >= 0; i--) {
                    var h = s[i];
                    h.nodes || (h.nodes = []), -1 === h.nodes.indexOf(n) && h.nodes.push(n)
                }
                e.attr && (n.attr = a(n.attr, e.attr))
            }

            function l(t, e) {
                if (t.edges || (t.edges = []), t.edges.push(e), t.edge) {
                    var i = a({}, t.edge);
                    e.attr = a(i, e.attr)
                }
            }

            function u(t, e, i, o, n) {
                var s = {from: e, to: i, type: o};
                return t.edge && (s.attr = a({}, t.edge)), s.attr = a(s.attr || {}, n), s
            }

            function c() {
                for (A = S.NULL, N = ""; " " === z || "	" === z || "\n" === z || "\r" === z;)n();
                do {
                    var t = !1;
                    if ("#" === z) {
                        for (var e = I - 1; " " === P.charAt(e) || "	" === P.charAt(e);)e--;
                        if ("\n" === P.charAt(e) || "" === P.charAt(e)) {
                            for (; "" != z && "\n" != z;)n();
                            t = !0
                        }
                    }
                    if ("/" === z && "/" === s()) {
                        for (; "" != z && "\n" != z;)n();
                        t = !0
                    }
                    if ("/" === z && "*" === s()) {
                        for (; "" != z;) {
                            if ("*" === z && "/" === s()) {
                                n(), n();
                                break
                            }
                            n()
                        }
                        t = !0
                    }
                    for (; " " === z || "	" === z || "\n" === z || "\r" === z;)n()
                } while (t);
                if ("" === z)return void(A = S.DELIMITER);
                var i = z + s();
                if (E[i])return A = S.DELIMITER, N = i, n(), void n();
                if (E[z])return A = S.DELIMITER, N = z, void n();
                if (r(z) || "-" === z) {
                    for (N += z, n(); r(z);)N += z, n();
                    return "false" === N ? N = !1 : "true" === N ? N = !0 : isNaN(Number(N)) || (N = Number(N)), void(A = S.IDENTIFIER)
                }
                if ('"' === z) {
                    for (n(); "" != z && ('"' != z || '"' === z && '"' === s());)N += z, '"' === z && n(), n();
                    if ('"' != z)throw _('End of string " expected');
                    return n(), void(A = S.IDENTIFIER)
                }
                for (A = S.UNKNOWN; "" != z;)N += z, n();
                throw new SyntaxError('Syntax error in part "' + x(N, 30) + '"')
            }

            function p() {
                var t = {};
                if (o(), c(), "strict" === N && (t.strict = !0, c()), ("graph" === N || "digraph" === N) && (t.type = N, c()), A === S.IDENTIFIER && (t.id = N, c()), "{" != N)throw _("Angle bracket { expected");
                if (c(), f(t), "}" != N)throw _("Angle bracket } expected");
                if (c(), "" !== N)throw _("End of file expected");
                return c(), delete t.node, delete t.edge, delete t.graph, t
            }

            function f(t) {
                for (; "" !== N && "}" != N;)m(t), ";" === N && c()
            }

            function m(t) {
                var e = v(t);
                if (e)return void b(t, e);
                var i = g(t);
                if (!i) {
                    if (A != S.IDENTIFIER)throw _("Identifier expected");
                    var o = N;
                    if (c(), "=" === N) {
                        if (c(), A != S.IDENTIFIER)throw _("Identifier expected");
                        t[o] = N, c()
                    } else y(t, o)
                }
            }

            function v(t) {
                var e = null;
                if ("subgraph" === N && (e = {}, e.type = "subgraph", c(), A === S.IDENTIFIER && (e.id = N, c())), "{" === N) {
                    if (c(), e || (e = {}), e.parent = t, e.node = t.node, e.edge = t.edge, e.graph = t.graph, f(e), "}" != N)throw _("Angle bracket } expected");
                    c(), delete e.node, delete e.edge, delete e.graph, delete e.parent, t.subgraphs || (t.subgraphs = []), t.subgraphs.push(e)
                }
                return e
            }

            function g(t) {
                return "node" === N ? (c(), t.node = w(), "node") : "edge" === N ? (c(), t.edge = w(), "edge") : "graph" === N ? (c(), t.graph = w(), "graph") : null
            }

            function y(t, e) {
                var i = {id: e}, o = w();
                o && (i.attr = o), d(t, i), b(t, e)
            }

            function b(t, e) {
                for (; "->" === N || "--" === N;) {
                    var i, o = N;
                    c();
                    var n = v(t);
                    if (n) i = n; else {
                        if (A != S.IDENTIFIER)throw _("Identifier or subgraph expected");
                        i = N, d(t, {id: i}), c()
                    }
                    var s = w(), r = u(t, e, i, o, s);
                    l(t, r), e = i
                }
            }

            function w() {
                for (var t = null; "[" === N;) {
                    for (c(), t = {}; "" !== N && "]" != N;) {
                        if (A != S.IDENTIFIER)throw _("Attribute name expected");
                        var e = N;
                        if (c(), "=" != N)throw _("Equal sign = expected");
                        if (c(), A != S.IDENTIFIER)throw _("Attribute value expected");
                        var i = N;
                        h(t, e, i), c(), "," == N && c()
                    }
                    if ("]" != N)throw _("Bracket ] expected");
                    c()
                }
                return t
            }

            function _(t) {
                return new SyntaxError(t + ', got "' + x(N, 30) + '" (char ' + I + ")")
            }

            function x(t, e) {
                return t.length <= e ? t : t.substr(0, 27) + "..."
            }

            function k(t, e, i) {
                Array.isArray(t) ? t.forEach(function (t) {
                        Array.isArray(e) ? e.forEach(function (e) {
                                i(t, e)
                            }) : i(t, e)
                    }) : Array.isArray(e) ? e.forEach(function (e) {
                            i(t, e)
                        }) : i(t, e)
            }

            function O(t, e, i) {
                for (var o = e.split("."), n = o.pop(), s = t, r = 0; r < o.length; r++) {
                    var a = o[r];
                    a in s || (s[a] = {}), s = s[a]
                }
                return s[n] = i, t
            }

            function M(t, e) {
                var i = {};
                for (var o in t)if (t.hasOwnProperty(o)) {
                    var n = e[o];
                    Array.isArray(n) ? n.forEach(function (e) {
                            O(i, e, t[o])
                        }) : "string" == typeof n ? O(i, n, t[o]) : O(i, o, t[o])
                }
                return i
            }

            function D(t) {
                var e = i(t), o = {nodes: [], edges: [], options: {}};
                if (e.nodes && e.nodes.forEach(function (t) {
                        var e = {id: t.id, label: String(t.label || t.id)};
                        a(e, M(t.attr, C)), e.image && (e.shape = "image"), o.nodes.push(e)
                    }), e.edges) {
                    var n = function (t) {
                        var e = {from: t.from, to: t.to};
                        return a(e, M(t.attr, T)), e.arrows = "->" === t.type ? "to" : void 0, e
                    };
                    e.edges.forEach(function (t) {
                        var e, i;
                        e = t.from instanceof Object ? t.from.nodes : {id: t.from}, i = t.to instanceof Object ? t.to.nodes : {id: t.to}, t.from instanceof Object && t.from.edges && t.from.edges.forEach(function (t) {
                            var e = n(t);
                            o.edges.push(e)
                        }), k(e, i, function (e, i) {
                            var s = u(o, e.id, i.id, t.type, t.attr), r = n(s);
                            o.edges.push(r)
                        }), t.to instanceof Object && t.to.edges && t.to.edges.forEach(function (t) {
                            var e = n(t);
                            o.edges.push(e)
                        })
                    })
                }
                return e.attr && (o.options = e.attr), o
            }

            var C = {
                fontsize: "font.size",
                fontcolor: "font.color",
                labelfontcolor: "font.color",
                fontname: "font.face",
                color: ["color.border", "color.background"],
                fillcolor: "color.background",
                tooltip: "title",
                labeltooltip: "title"
            }, T = Object.create(C);
            T.color = "color.color";
            var S = {NULL: 0, DELIMITER: 1, IDENTIFIER: 2, UNKNOWN: 3}, E = {
                "{": !0,
                "}": !0,
                "[": !0,
                "]": !0,
                ";": !0,
                "=": !0,
                ",": !0,
                "->": !0,
                "--": !0
            }, P = "", I = 0, z = "", N = "", A = S.NULL, L = /[a-zA-Z_0-9.:#]/;
            e.parseDOT = i, e.DOTToGraph = D
        },
        function (t, e) {
            function i(t, e) {
                var i = [], o = [], n = {edges: {inheritColor: !1}, nodes: {fixed: !1, parseColor: !1}};
                void 0 !== e && (void 0 !== e.fixed && (n.nodes.fixed = e.fixed), void 0 !== e.parseColor && (n.nodes.parseColor = e.parseColor), void 0 !== e.inheritColor && (n.edges.inheritColor = e.inheritColor));
                for (var s = t.edges, r = t.nodes, a = 0; a < s.length; a++) {
                    var h = {}, d = s[a];
                    h.id = d.id, h.from = d.source, h.to = d.target, h.attributes = d.attributes, d.color && n.inheritColor === !1 && (h.color = d.color), i.push(h)
                }
                for (var a = 0; a < r.length; a++) {
                    var l = {}, u = r[a];
                    l.id = u.id, l.attributes = u.attributes, l.title = u.title, l.x = u.x, l.y = u.y, l.label = u.label, n.nodes.parseColor === !0 ? l.color = u.color : l.color = void 0 !== u.color ? {
                                background: u.color,
                                border: u.color,
                                highlight: {background: u.color, border: u.color},
                                hover: {background: u.color, border: u.color}
                            } : void 0, l.size = u.size, l.fixed = n.nodes.fixed && void 0 !== u.x && void 0 !== u.y, o.push(l)
                }
                return {nodes: o, edges: i}
            }

            e.parseGephi = i
        },
        function (t, e) {
            function i(t, e) {
                if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var o = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, i, o) {
                    return i && t(e.prototype, i), o && t(e, o), e
                }
            }(), n = function () {
                function t(e) {
                    i(this, t), this.images = {}, this.imageBroken = {}, this.callback = e
                }

                return o(t, [
                    {
                        key: "_addImageToCache", value: function (t, e) {
                        0 === e.width && (document.body.appendChild(e), e.width = e.offsetWidth, e.height = e.offsetHeight, document.body.removeChild(e)), this.images[t] = e
                    }
                    },
                    {
                        key: "_tryloadBrokenUrl", value: function (t, e, i) {
                        var o = this;
                        void 0 !== t && void 0 !== e && void 0 !== i && (i.onerror = function () {
                            console.error("Could not load brokenImage:", e), o._addImageToCache(t, new Image)
                        }, i.src = e)
                    }
                    },
                    {
                        key: "_redrawWithImage", value: function (t) {
                        this.callback && this.callback(t)
                    }
                    },
                    {
                        key: "load", value: function (t, e, i) {
                        var o = this, n = this.images[t];
                        if (n)return n;
                        var s = new Image;
                        return s.onload = function () {
                            o._addImageToCache(t, s), o._redrawWithImage(s)
                        }, s.onerror = function () {
                            console.error("Could not load image:", t), o._tryloadBrokenUrl(t, e, s)
                        }, s.src = t, s
                    }
                    }
                ]), t
            }();
            e["default"] = n, t.exports = e["default"]
        },
        function (t, e) {
            e.en = {
                edit: "Edit",
                del: "Delete selected",
                back: "Back",
                addNode: "Add Node",
                addEdge: "Add Edge",
                editNode: "Edit Node",
                editEdge: "Edit Edge",
                addDescription: "Click in an empty space to place a new node.",
                edgeDescription: "Click on a node and drag the edge to another node to connect them.",
                editEdgeDescription: "Click on the control points and drag them to a node to connect to it.",
                createEdgeError: "Cannot link edges to a cluster.",
                deleteClusterError: "Clusters cannot be deleted.",
                editClusterError: "Clusters cannot be edited."
            }, e.en_EN = e.en, e.en_US = e.en, e.nl = {
                edit: "Wijzigen",
                del: "Selectie verwijderen",
                back: "Terug",
                addNode: "Node toevoegen",
                addEdge: "Link toevoegen",
                editNode: "Node wijzigen",
                editEdge: "Link wijzigen",
                addDescription: "Klik op een leeg gebied om een nieuwe node te maken.",
                edgeDescription: "Klik op een node en sleep de link naar een andere node om ze te verbinden.",
                editEdgeDescription: "Klik op de verbindingspunten en sleep ze naar een node om daarmee te verbinden.",
                createEdgeError: "Kan geen link maken naar een cluster.",
                deleteClusterError: "Clusters kunnen niet worden verwijderd.",
                editClusterError: "Clusters kunnen niet worden aangepast."
            }, e.nl_NL = e.nl, e.nl_BE = e.nl
        }])
});
//# sourceMappingURL=vis.map