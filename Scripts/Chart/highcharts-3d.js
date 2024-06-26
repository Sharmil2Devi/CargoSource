/*
Highcharts JS v5.0.2 (2016-10-26)

3D features for Highcharts JS

@license: www.highcharts.com/license
*/
(function (E) { "object" === typeof module && module.exports ? module.exports = E : E(Highcharts) })(function (E) {
    (function (a) {
        var r = a.deg2rad, g = a.pick; a.perspective = function (t, n, v) {
            var k = n.options.chart.options3d, p = v ? n.inverted : !1, h = n.plotWidth / 2, m = n.plotHeight / 2, f = k.depth / 2, d = g(k.depth, 1) * g(k.viewDistance, 0), e = n.scale3d || 1, b = r * k.beta * (p ? -1 : 1), k = r * k.alpha * (p ? -1 : 1), c = Math.cos(k), q = Math.cos(-b), x = Math.sin(k), y = Math.sin(-b); v || (h += n.plotLeft, m += n.plotTop); return a.map(t, function (b) {
                var a, k; k = (p ? b.y : b.x) - h; var g = (p ?
b.x : b.y) - m, n = (b.z || 0) - f; a = q * k - y * n; b = -x * y * k + c * g - q * x * n; k = c * y * k + x * g + c * q * n; g = 0 < d && d < Number.POSITIVE_INFINITY ? d / (k + f + d) : 1; a = a * g * e + h; b = b * g * e + m; return { x: p ? b : a, y: p ? a : b, z: k * e + f}
            })
        } 
    })(E); (function (a) {
        function r(b) { var c = 0, l, a; for (l = 0; l < b.length; l++) a = (l + 1) % b.length, c += b[l].x * b[a].y - b[a].x * b[l].y; return c / 2 } function g(b) { var a = 0, l; for (l = 0; l < b.length; l++) a += b[l].z; return b.length ? a / b.length : 0 } function t(b, a, l, c, e, d, D, f) {
            var G = [], C = d - e; return d > e && d - e > Math.PI / 2 + .0001 ? (G = G.concat(t(b, a, l, c, e, e + Math.PI / 2, D, f)),
G = G.concat(t(b, a, l, c, e + Math.PI / 2, d, D, f))) : d < e && e - d > Math.PI / 2 + .0001 ? (G = G.concat(t(b, a, l, c, e, e - Math.PI / 2, D, f)), G = G.concat(t(b, a, l, c, e - Math.PI / 2, d, D, f))) : ["C", b + l * Math.cos(e) - l * B * C * Math.sin(e) + D, a + c * Math.sin(e) + c * B * C * Math.cos(e) + f, b + l * Math.cos(d) + l * B * C * Math.sin(d) + D, a + c * Math.sin(d) - c * B * C * Math.cos(d) + f, b + l * Math.cos(d) + D, a + c * Math.sin(d) + f]
        } var n = Math.cos, v = Math.PI, k = Math.sin, p = a.animObject, h = a.charts, m = a.color, f = a.defined, d = a.deg2rad, e = a.each, b = a.extend, c = a.inArray, q = a.map, x = a.merge, y = a.perspective, F =
a.pick, z = a.SVGElement, A = a.SVGRenderer, w = a.wrap, B = 4 * (Math.sqrt(2) - 1) / 3 / (v / 2); A.prototype.toLinePath = function (b, a) { var l = []; e(b, function (b) { l.push("L", b.x, b.y) }); b.length && (l[0] = "M", a && l.push("Z")); return l }; A.prototype.cuboid = function (b) {
    var c = this.g(); b = this.cuboidPath(b); c.attr({ "stroke-linejoin": "round" }); c.front = this.path(b[0]).attr({ "class": "highcharts-3d-front", zIndex: b[3] }).add(c); c.top = this.path(b[1]).attr({ "class": "highcharts-3d-top", zIndex: b[4] }).add(c); c.side = this.path(b[2]).attr({ "class": "highcharts-3d-side",
        zIndex: b[5]
    }).add(c); c.fillSetter = function (b) { this.front.attr({ fill: b }); this.top.attr({ fill: m(b).brighten(.1).get() }); this.side.attr({ fill: m(b).brighten(-.1).get() }); this.color = b; return this }; c.opacitySetter = function (b) { this.front.attr({ opacity: b }); this.top.attr({ opacity: b }); this.side.attr({ opacity: b }); return this }; c.attr = function (b) {
        if (b.shapeArgs || f(b.x)) b = this.renderer.cuboidPath(b.shapeArgs || b), this.front.attr({ d: b[0], zIndex: b[3] }), this.top.attr({ d: b[1], zIndex: b[4] }), this.side.attr({ d: b[2], zIndex: b[5] });
        else return a.SVGElement.prototype.attr.call(this, b); return this
    }; c.animate = function (b, c, a) { f(b.x) && f(b.y) ? (b = this.renderer.cuboidPath(b), this.front.attr({ zIndex: b[3] }).animate({ d: b[0] }, c, a), this.top.attr({ zIndex: b[4] }).animate({ d: b[1] }, c, a), this.side.attr({ zIndex: b[5] }).animate({ d: b[2] }, c, a), this.attr({ zIndex: -b[6] })) : b.opacity ? (this.front.animate(b, c, a), this.top.animate(b, c, a), this.side.animate(b, c, a)) : z.prototype.animate.call(this, b, c, a); return this }; c.destroy = function () {
        this.front.destroy(); this.top.destroy();
        this.side.destroy(); return null
    }; c.attr({ zIndex: -b[6] }); return c
}; A.prototype.cuboidPath = function (b) {
    function c(b) { return k[b] } var a = b.x, e = b.y, d = b.z, f = b.height, D = b.width, m = b.depth, k = [{ x: a, y: e, z: d }, { x: a + D, y: e, z: d }, { x: a + D, y: e + f, z: d }, { x: a, y: e + f, z: d }, { x: a, y: e + f, z: d + m }, { x: a + D, y: e + f, z: d + m }, { x: a + D, y: e, z: d + m }, { x: a, y: e, z: d + m}], k = y(k, h[this.chartIndex], b.insidePlotArea), d = function (b, a) { var e = []; b = q(b, c); a = q(a, c); 0 > r(b) ? e = b : 0 > r(a) && (e = a); return e }; b = d([3, 2, 1, 0], [7, 6, 5, 4]); a = [4, 5, 2, 3]; e = d([1, 6, 7, 0], a); d = d([1,
2, 5, 6], [0, 7, 4, 3]); return [this.toLinePath(b, !0), this.toLinePath(e, !0), this.toLinePath(d, !0), g(b), g(e), g(d), 9E9 * g(q(a, c))]
}; a.SVGRenderer.prototype.arc3d = function (a) {
    function f(b) { var a = !1, e = {}, d; for (d in b)-1 !== c(d, h) && (e[d] = b[d], delete b[d], a = !0); return a ? e : !1 } var l = this.g(), k = l.renderer, h = "x y r innerR start end".split(" "); a = x(a); a.alpha *= d; a.beta *= d; l.top = k.path(); l.side1 = k.path(); l.side2 = k.path(); l.inn = k.path(); l.out = k.path(); l.onAdd = function () {
        var b = l.parentGroup, a = l.attr("class"); l.top.add(l);
        e(["out", "inn", "side1", "side2"], function (c) { l[c].addClass(a + " highcharts-3d-side").add(b) })
    }; l.setPaths = function (b) { var a = l.renderer.arc3dPath(b), c = 100 * a.zTop; l.attribs = b; l.top.attr({ d: a.top, zIndex: a.zTop }); l.inn.attr({ d: a.inn, zIndex: a.zInn }); l.out.attr({ d: a.out, zIndex: a.zOut }); l.side1.attr({ d: a.side1, zIndex: a.zSide1 }); l.side2.attr({ d: a.side2, zIndex: a.zSide2 }); l.zIndex = c; l.attr({ zIndex: c }); b.center && (l.top.setRadialReference(b.center), delete b.center) }; l.setPaths(a); l.fillSetter = function (b) {
        var a =
m(b).brighten(-.1).get(); this.fill = b; this.side1.attr({ fill: a }); this.side2.attr({ fill: a }); this.inn.attr({ fill: a }); this.out.attr({ fill: a }); this.top.attr({ fill: b }); return this
    }; e(["opacity", "translateX", "translateY", "visibility"], function (b) { l[b + "Setter"] = function (b, a) { l[a] = b; e(["out", "inn", "side1", "side2", "top"], function (c) { l[c].attr(a, b) }) } }); w(l, "attr", function (a, c, e) { var d; "object" === typeof c && (d = f(c)) && (b(l.attribs, d), l.setPaths(l.attribs)); return a.call(this, c, e) }); w(l, "animate", function (b, a, c,
e) { var d, l = this.attribs, k; delete a.center; delete a.z; delete a.depth; delete a.alpha; delete a.beta; k = p(F(c, this.renderer.globalAnimation)); k.duration && (a = x(a), d = f(a), a.dummy = 1, d && (k.step = function (b, a) { function c(b) { return l[b] + (F(d[b], l[b]) - l[b]) * a.pos } "dummy" === a.prop && a.elem.setPaths(x(l, { x: c("x"), y: c("y"), r: c("r"), innerR: c("innerR"), start: c("start"), end: c("end") })) }), c = k); return b.call(this, a, c, e) }); l.destroy = function () {
    this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy();
    this.side2.destroy(); z.prototype.destroy.call(this)
}; l.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; l.show = function () { this.top.show(); this.out.show(); this.inn.show(); this.side1.show(); this.side2.show() }; return l
}; A.prototype.arc3dPath = function (b) {
    function a(b) { b %= 2 * Math.PI; b > Math.PI && (b = 2 * Math.PI - b); return b } var c = b.x, e = b.y, d = b.start, f = b.end - .00001, m = b.r, h = b.innerR, p = b.depth, q = b.alpha, g = b.beta, x = Math.cos(d), r = Math.sin(d); b = Math.cos(f); var y =
Math.sin(f), u = m * Math.cos(g), m = m * Math.cos(q), B = h * Math.cos(g), C = h * Math.cos(q), h = p * Math.sin(g), w = p * Math.sin(q), p = ["M", c + u * x, e + m * r], p = p.concat(t(c, e, u, m, d, f, 0, 0)), p = p.concat(["L", c + B * b, e + C * y]), p = p.concat(t(c, e, B, C, f, d, 0, 0)), p = p.concat(["Z"]), F = 0 < g ? Math.PI / 2 : 0, g = 0 < q ? 0 : Math.PI / 2, F = d > -F ? d : f > -F ? -F : d, z = f < v - g ? f : d < v - g ? v - g : f, A = 2 * v - g, q = ["M", c + u * n(F), e + m * k(F)], q = q.concat(t(c, e, u, m, F, z, 0, 0)); f > A && d < A ? (q = q.concat(["L", c + u * n(z) + h, e + m * k(z) + w]), q = q.concat(t(c, e, u, m, z, A, h, w)), q = q.concat(["L", c + u * n(A), e + m * k(A)]), q = q.concat(t(c,
e, u, m, A, f, 0, 0)), q = q.concat(["L", c + u * n(f) + h, e + m * k(f) + w]), q = q.concat(t(c, e, u, m, f, A, h, w)), q = q.concat(["L", c + u * n(A), e + m * k(A)]), q = q.concat(t(c, e, u, m, A, z, 0, 0))) : f > v - g && d < v - g && (q = q.concat(["L", c + u * Math.cos(z) + h, e + m * Math.sin(z) + w]), q = q.concat(t(c, e, u, m, z, f, h, w)), q = q.concat(["L", c + u * Math.cos(f), e + m * Math.sin(f)]), q = q.concat(t(c, e, u, m, f, z, 0, 0))); q = q.concat(["L", c + u * Math.cos(z) + h, e + m * Math.sin(z) + w]); q = q.concat(t(c, e, u, m, z, F, h, w)); q = q.concat(["Z"]); g = ["M", c + B * x, e + C * r]; g = g.concat(t(c, e, B, C, d, f, 0, 0)); g = g.concat(["L",
c + B * Math.cos(f) + h, e + C * Math.sin(f) + w]); g = g.concat(t(c, e, B, C, f, d, h, w)); g = g.concat(["Z"]); x = ["M", c + u * x, e + m * r, "L", c + u * x + h, e + m * r + w, "L", c + B * x + h, e + C * r + w, "L", c + B * x, e + C * r, "Z"]; c = ["M", c + u * b, e + m * y, "L", c + u * b + h, e + m * y + w, "L", c + B * b + h, e + C * y + w, "L", c + B * b, e + C * y, "Z"]; y = Math.atan2(w, -h); e = Math.abs(f + y); b = Math.abs(d + y); d = Math.abs((d + f) / 2 + y); e = a(e); b = a(b); d = a(d); d *= 1E5; f = 1E5 * b; e *= 1E5; return { top: p, zTop: 1E5 * Math.PI + 1, out: q, zOut: Math.max(d, f, e), inn: g, zInn: Math.max(d, f, e), side1: x, zSide1: .99 * e, side2: c, zSide2: .99 * f}
} 
    })(E); (function (a) {
        function r(a,
f) {
            var d = a.plotLeft, e = a.plotWidth + d, b = a.plotTop, c = a.plotHeight + b, q = d + a.plotWidth / 2, m = b + a.plotHeight / 2, h = Number.MAX_VALUE, k = -Number.MAX_VALUE, g = Number.MAX_VALUE, p = -Number.MAX_VALUE, n, r = 1; n = [{ x: d, y: b, z: 0 }, { x: d, y: b, z: f}]; t([0, 1], function (b) { n.push({ x: e, y: n[b].y, z: n[b].z }) }); t([0, 1, 2, 3], function (b) { n.push({ x: n[b].x, y: c, z: n[b].z }) }); n = v(n, a, !1); t(n, function (b) { h = Math.min(h, b.x); k = Math.max(k, b.x); g = Math.min(g, b.y); p = Math.max(p, b.y) }); d > h && (r = Math.min(r, 1 - Math.abs((d + q) / (h + q)) % 1)); e < k && (r = Math.min(r, (e -
q) / (k - q))); b > g && (r = 0 > g ? Math.min(r, (b + m) / (-g + b + m)) : Math.min(r, 1 - (b + m) / (g + m) % 1)); c < p && (r = Math.min(r, Math.abs((c - m) / (p - m)))); return r
        } var g = a.Chart, t = a.each, n = a.merge, v = a.perspective, k = a.pick, p = a.wrap; g.prototype.is3d = function () { return this.options.chart.options3d && this.options.chart.options3d.enabled }; g.prototype.propsRequireDirtyBox.push("chart.options3d"); g.prototype.propsRequireUpdateSeries.push("chart.options3d"); a.wrap(a.Chart.prototype, "isInsidePlot", function (a) {
            return this.is3d() || a.apply(this,
[].slice.call(arguments, 1))
        }); var h = a.getOptions(); n(!0, h, { chart: { options3d: { enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, frame: { bottom: { size: 1 }, side: { size: 1 }, back: { size: 1}}}} }); p(g.prototype, "setClassName", function (a) { a.apply(this, [].slice.call(arguments, 1)); this.is3d() && (this.container.className += " highcharts-3d-chart") }); a.wrap(a.Chart.prototype, "setChartSize", function (a) {
            var f = this.options.chart.options3d; a.apply(this, [].slice.call(arguments, 1)); if (this.is3d()) {
                var d = this.inverted,
e = this.clipBox, b = this.margin; e[d ? "y" : "x"] = -(b[3] || 0); e[d ? "x" : "y"] = -(b[0] || 0); e[d ? "height" : "width"] = this.chartWidth + (b[3] || 0) + (b[1] || 0); e[d ? "width" : "height"] = this.chartHeight + (b[0] || 0) + (b[2] || 0); this.scale3d = 1; !0 === f.fitToPlot && (this.scale3d = r(this, f.depth))
            } 
        }); p(g.prototype, "redraw", function (a) { this.is3d() && (this.isDirtyBox = !0); a.apply(this, [].slice.call(arguments, 1)) }); p(g.prototype, "renderSeries", function (a) {
            var f = this.series.length; if (this.is3d()) for (; f--; ) a = this.series[f], a.translate(), a.render();
            else a.call(this)
        }); g.prototype.retrieveStacks = function (a) { var f = this.series, d = {}, e, b = 1; t(this.series, function (c) { e = k(c.options.stack, a ? 0 : f.length - 1 - c.index); d[e] ? d[e].series.push(c) : (d[e] = { series: [c], position: b }, b++) }); d.totalStacks = b + 1; return d } 
    })(E); (function (a) {
        var r, g = a.Axis, t = a.Chart, n = a.each, v = a.extend, k = a.merge, p = a.perspective, h = a.pick, m = a.splat, f = a.Tick, d = a.wrap; d(g.prototype, "setOptions", function (a, b) {
            a.call(this, b); this.chart.is3d() && (a = this.options, a.tickWidth = h(a.tickWidth, 0), a.gridLineWidth =
h(a.gridLineWidth, 1))
        }); d(g.prototype, "render", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var b = this.chart, c = b.renderer, e = b.options.chart.options3d, d = e.frame, f = d.bottom, h = d.back, d = d.side, k = e.depth, g = this.height, m = this.width, p = this.left, n = this.top; this.isZAxis || (this.horiz ? (h = { x: p, y: n + (b.xAxis[0].opposite ? -f.size : g), z: 0, width: m, height: f.size, depth: k, insidePlotArea: !1 }, this.bottomFrame ? this.bottomFrame.animate(h) : (this.bottomFrame = c.cuboid(h).attr({ "class": "highcharts-3d-frame highcharts-3d-frame-bottom",
                    zIndex: b.yAxis[0].reversed && 0 < e.alpha ? 4 : -1
                }).add(), this.bottomFrame.attr({ fill: f.color || "none", stroke: f.color || "none" }))) : (e = { x: p + (b.yAxis[0].opposite ? 0 : -d.size), y: n + (b.xAxis[0].opposite ? -f.size : 0), z: k, width: m + d.size, height: g + f.size, depth: h.size, insidePlotArea: !1 }, this.backFrame ? this.backFrame.animate(e) : (this.backFrame = c.cuboid(e).attr({ "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: -3 }).add(), this.backFrame.attr({ fill: h.color || "none", stroke: h.color || "none" })), b = { x: p + (b.yAxis[0].opposite ?
m : -d.size), y: n + (b.xAxis[0].opposite ? -f.size : 0), z: 0, width: d.size, height: g + f.size, depth: k, insidePlotArea: !1
                }, this.sideFrame ? this.sideFrame.animate(b) : (this.sideFrame = c.cuboid(b).attr({ "class": "highcharts-3d-frame highcharts-3d-frame-side", zIndex: -2 }).add(), this.sideFrame.attr({ fill: d.color || "none", stroke: d.color || "none" }))))
            } 
        }); d(g.prototype, "getPlotLinePath", function (a) {
            var b = a.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d() || null === b) return b; var c = this.chart, e = c.options.chart.options3d,
c = this.isZAxis ? c.plotWidth : e.depth, e = this.opposite; this.horiz && (e = !e); b = [this.swapZ({ x: b[1], y: b[2], z: e ? c : 0 }), this.swapZ({ x: b[1], y: b[2], z: c }), this.swapZ({ x: b[4], y: b[5], z: c }), this.swapZ({ x: b[4], y: b[5], z: e ? 0 : c })]; b = p(b, this.chart, !1); return b = this.chart.renderer.toLinePath(b, !1)
        }); d(g.prototype, "getLinePath", function (a) { return this.chart.is3d() ? [] : a.apply(this, [].slice.call(arguments, 1)) }); d(g.prototype, "getPlotBandPath", function (a) {
            if (!this.chart.is3d()) return a.apply(this, [].slice.call(arguments, 1));
            var b = arguments, c = b[1], b = this.getPlotLinePath(b[2]); (c = this.getPlotLinePath(c)) && b ? c.push("L", b[10], b[11], "L", b[7], b[8], "L", b[4], b[5], "L", b[1], b[2]) : c = null; return c
        }); d(f.prototype, "getMarkPath", function (a) { var b = a.apply(this, [].slice.call(arguments, 1)); if (!this.axis.chart.is3d()) return b; b = [this.axis.swapZ({ x: b[1], y: b[2], z: 0 }), this.axis.swapZ({ x: b[4], y: b[5], z: 0 })]; b = p(b, this.axis.chart, !1); return b = ["M", b[0].x, b[0].y, "L", b[1].x, b[1].y] }); d(f.prototype, "getLabelPosition", function (a) {
            var b = a.apply(this,
[].slice.call(arguments, 1)); this.axis.chart.is3d() && (b = p([this.axis.swapZ({ x: b.x, y: b.y, z: 0 })], this.axis.chart, !1)[0]); return b
        }); a.wrap(g.prototype, "getTitlePosition", function (a) { var b = this.chart.is3d(), c, e; b && (e = this.axisTitleMargin, this.axisTitleMargin = 0); c = a.apply(this, [].slice.call(arguments, 1)); b && (c = p([this.swapZ({ x: c.x, y: c.y, z: 0 })], this.chart, !1)[0], c[this.horiz ? "y" : "x"] += (this.horiz ? 1 : -1) * (this.opposite ? -1 : 1) * e, this.axisTitleMargin = e); return c }); d(g.prototype, "drawCrosshair", function (a) {
            var b =
arguments; this.chart.is3d() && b[2] && (b[2] = { plotX: b[2].plotXold || b[2].plotX, plotY: b[2].plotYold || b[2].plotY }); a.apply(this, [].slice.call(b, 1))
        }); g.prototype.swapZ = function (a, b) { if (this.isZAxis) { b = b ? 0 : this.chart.plotLeft; var c = this.chart; return { x: b + (c.yAxis[0].opposite ? a.z : c.xAxis[0].width - a.z), y: a.y, z: a.x - b} } return a }; r = a.ZAxis = function () { this.isZAxis = !0; this.init.apply(this, arguments) }; v(r.prototype, g.prototype); v(r.prototype, { setOptions: function (a) {
            a = k({ offset: 0, lineWidth: 0 }, a); g.prototype.setOptions.call(this,
a); this.coll = "zAxis"
        }, setAxisSize: function () { g.prototype.setAxisSize.call(this); this.width = this.len = this.chart.options.chart.options3d.depth; this.right = this.chart.chartWidth - this.width - this.left }, getSeriesExtremes: function () {
            var a = this, b = a.chart; a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null; a.buildStacks && a.buildStacks(); n(a.series, function (c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, c = c.zData, c.length && (a.dataMin = Math.min(h(a.dataMin,
c[0]), Math.min.apply(null, c)), a.dataMax = Math.max(h(a.dataMax, c[0]), Math.max.apply(null, c)))
            })
        } 
        }); d(t.prototype, "getAxes", function (a) { var b = this, c = this.options, c = c.zAxis = m(c.zAxis || {}); a.call(this); b.is3d() && (this.zAxis = [], n(c, function (a, c) { a.index = c; a.isX = !0; (new r(b, a)).setScale() })) })
    })(E); (function (a) {
        function r(a) { var f = a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && (f.stroke = this.options.edgeColor || f.fill, f["stroke-width"] = v(this.options.edgeWidth, 1)); return f } function g(a) {
            if (this.chart.is3d()) {
                var f =
this.chart.options.plotOptions.column.grouping; void 0 === f || f || void 0 === this.group.zIndex || this.zIndexSet || (this.group.attr({ zIndex: 10 * this.group.zIndex }), this.zIndexSet = !0)
            } a.apply(this, [].slice.call(arguments, 1))
        } var t = a.each, n = a.perspective, v = a.pick, k = a.Series, p = a.seriesTypes, h = a.svg; a = a.wrap; a(p.column.prototype, "translate", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var f = this.chart, d = this.options, e = d.depth || 25, b = (d.stacking ? d.stack || 0 : this._i) * (e + (d.groupZPadding ||
1)); !1 !== d.grouping && (b = 0); b += d.groupZPadding || 1; t(this.data, function (a) { if (null !== a.y) { var c = a.shapeArgs, d = a.tooltipPos; a.shapeType = "cuboid"; c.z = b; c.depth = e; c.insidePlotArea = !0; d = n([{ x: d[0], y: d[1], z: b}], f, !0)[0]; a.tooltipPos = [d.x, d.y] } }); this.z = b
            } 
        }); a(p.column.prototype, "animate", function (a) {
            if (this.chart.is3d()) {
                var f = arguments[1], d = this.yAxis, e = this, b = this.yAxis.reversed; h && (f ? t(e.data, function (a) {
                    null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, b || (a.shapeArgs.y =
a.stackY ? a.plotY + d.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)))
                }) : (t(e.data, function (a) { null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, e.options.animation)) }), this.drawDataLabels(), e.animate = null))
            } else a.apply(this, [].slice.call(arguments, 1))
        }); a(p.column.prototype, "init", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var f = this.options, d = f.grouping, e = f.stacking, b = v(this.yAxis.options.reversedStacks,
!0), c = 0; if (void 0 === d || d) { d = this.chart.retrieveStacks(e); c = f.stack || 0; for (e = 0; e < d[c].series.length && d[c].series[e] !== this; e++); c = 10 * (d.totalStacks - d[c].position) + (b ? e : -e); this.xAxis.reversed || (c = 10 * d.totalStacks - c) } f.zIndex = c
            } 
        }); a(p.column.prototype, "pointAttribs", r); p.columnrange && a(p.columnrange.prototype, "pointAttribs", r); a(k.prototype, "alignDataLabel", function (a) {
            if (this.chart.is3d() && ("column" === this.type || "columnrange" === this.type)) {
                var f = arguments[4], d = { x: f.x, y: f.y, z: this.z }, d = n([d], this.chart,
!0)[0]; f.x = d.x; f.y = d.y
            } a.apply(this, [].slice.call(arguments, 1))
        }); p.columnrange && a(p.columnrange.prototype, "drawPoints", g); a(p.column.prototype, "drawPoints", g)
    })(E); (function (a) {
        var r = a.deg2rad, g = a.each, t = a.pick, n = a.seriesTypes, v = a.svg; a = a.wrap; a(n.pie.prototype, "translate", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var k = this, h = k.options, m = h.depth || 0, f = k.chart.options.chart.options3d, d = f.alpha, e = f.beta, b = h.stacking ? (h.stack || 0) * m : k._i * m, b = b + m / 2; !1 !== h.grouping && (b =
0); g(k.data, function (a) { var c = a.shapeArgs; a.shapeType = "arc3d"; c.z = b; c.depth = .75 * m; c.alpha = d; c.beta = e; c.center = k.center; c = (c.end + c.start) / 2; a.slicedTranslation = { translateX: Math.round(Math.cos(c) * h.slicedOffset * Math.cos(d * r)), translateY: Math.round(Math.sin(c) * h.slicedOffset * Math.cos(d * r))} })
            } 
        }); a(n.pie.prototype.pointClass.prototype, "haloPath", function (a) { var k = arguments; return this.series.chart.is3d() ? [] : a.call(this, k[1]) }); a(n.pie.prototype, "pointAttribs", function (a, g, h) {
            a = a.call(this, g, h); h = this.options;
            this.chart.is3d() && (a.stroke = h.edgeColor || g.color || this.color, a["stroke-width"] = t(h.edgeWidth, 1)); return a
        }); a(n.pie.prototype, "drawPoints", function (a) { a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && g(this.points, function (a) { var h = a.graphic; if (h) h[a.y && a.visible ? "show" : "hide"]() }) }); a(n.pie.prototype, "drawDataLabels", function (a) {
            if (this.chart.is3d()) {
                var k = this.chart.options.chart.options3d; g(this.data, function (a) {
                    var h = a.shapeArgs, f = h.r, d = (h.start + h.end) / 2, e = a.labelPos, b = -f * (1 - Math.cos((h.alpha ||
k.alpha) * r)) * Math.sin(d), c = f * (Math.cos((h.beta || k.beta) * r) - 1) * Math.cos(d); g([0, 2, 4], function (a) { e[a] += c; e[a + 1] += b })
                })
            } a.apply(this, [].slice.call(arguments, 1))
        }); a(n.pie.prototype, "addPoint", function (a) { a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.update(this.userOptions, !0) }); a(n.pie.prototype, "animate", function (a) {
            if (this.chart.is3d()) {
                var g = arguments[1], h = this.options.animation, k = this.center, f = this.group, d = this.markerGroup; v && (!0 === h && (h = {}), g ? (f.oldtranslateX = f.translateX, f.oldtranslateY =
f.translateY, g = { translateX: k[0], translateY: k[1], scaleX: .001, scaleY: .001 }, f.attr(g), d && (d.attrSetters = f.attrSetters, d.attr(g))) : (g = { translateX: f.oldtranslateX, translateY: f.oldtranslateY, scaleX: 1, scaleY: 1 }, f.animate(g, h), d && d.animate(g, h), this.animate = null))
            } else a.apply(this, [].slice.call(arguments, 1))
        })
    })(E); (function (a) {
        var r = a.perspective, g = a.pick, t = a.seriesTypes; a = a.wrap; a(t.scatter.prototype, "translate", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var n = this.chart,
k = g(this.zAxis, n.options.zAxis[0]), p = [], h, m, f; for (f = 0; f < this.data.length; f++) h = this.data[f], m = k.isLog && k.val2lin ? k.val2lin(h.z) : h.z, h.plotZ = k.translate(m), h.isInside = h.isInside ? m >= k.min && m <= k.max : !1, p.push({ x: h.plotX, y: h.plotY, z: h.plotZ }); n = r(p, n, !0); for (f = 0; f < this.data.length; f++) h = this.data[f], k = n[f], h.plotXold = h.plotX, h.plotYold = h.plotY, h.plotZold = h.plotZ, h.plotX = k.x, h.plotY = k.y, h.plotZ = k.z
            } 
        }); a(t.scatter.prototype, "init", function (a, g, k) {
            g.is3d() && (this.axisTypes = ["xAxis", "yAxis", "zAxis"], this.pointArrayMap =
["x", "y", "z"], this.parallelArrays = ["x", "y", "z"], this.directTouch = !0); a = a.apply(this, [g, k]); this.chart.is3d() && (this.tooltipOptions.pointFormat = this.userOptions.tooltip ? this.userOptions.tooltip.pointFormat || "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e" : "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"); return a
        })
    })(E); (function (a) {
        var r = a.Axis,
g = a.SVGRenderer, t = a.VMLRenderer; t && (a.setOptions({ animate: !1 }), t.prototype.cuboid = g.prototype.cuboid, t.prototype.cuboidPath = g.prototype.cuboidPath, t.prototype.toLinePath = g.prototype.toLinePath, t.prototype.createElement3D = g.prototype.createElement3D, t.prototype.arc3d = function (a) { a = g.prototype.arc3d.call(this, a); a.css({ zIndex: a.zIndex }); return a }, a.VMLRenderer.prototype.arc3dPath = a.SVGRenderer.prototype.arc3dPath, a.wrap(r.prototype, "render", function (a) {
    a.apply(this, [].slice.call(arguments, 1)); this.sideFrame &&
(this.sideFrame.css({ zIndex: 0 }), this.sideFrame.front.attr({ fill: this.sideFrame.color })); this.bottomFrame && (this.bottomFrame.css({ zIndex: 1 }), this.bottomFrame.front.attr({ fill: this.bottomFrame.color })); this.backFrame && (this.backFrame.css({ zIndex: 0 }), this.backFrame.front.attr({ fill: this.backFrame.color }))
}))
    })(E)
});
