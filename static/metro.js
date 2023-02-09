/*
 * Metro 4 Components Library v4.5.0  (https://metroui.org.ua)
 * Copyright 2012-2021 Sergey Pimenov
 * Built at 01/08/2021 18:53:43
 * Licensed under MIT
 */

! function (n) {
    "use strict";
    var h = "YYYY-MM-DDTHH:mm:ss.sss",
        t = "Invalid date",
        p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,3}/g;
    n.DATETIME_LOCALES = {
        en: {
            months: "January February March April May June July August September October November December".split(" "),
            monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" "),
            weekStart: 0
        }
    };

    function f(e, t, n) {
        return e = "" + e, n && n <= e.length ? e : Array(n + 1 - e.length).join(t) + e
    }

    function i(e) {
        return null == e
    }
    var s = {
            ms: "Milliseconds",
            s: "Seconds",
            m: "Minutes",
            h: "Hours",
            D: "Date",
            d: "Day",
            M: "Month",
            Y: "FullYear",
            y: "Year",
            t: "Time"
        },
        a = "ms",
        o = "second",
        r = "minute",
        l = "hour",
        c = "day",
        d = "week",
        u = "month",
        m = "year",
        v = function () {
            var e;
            return arguments[0] instanceof g ? v(arguments[0].value) : (e = [].slice.call(Array.isArray(arguments[0]) ? arguments[0] : arguments), new(Function.prototype.bind.apply(g, [this].concat(e))))
        },
        g = function () {
            var e = [].slice.call(arguments);
            if (this.value = new(Function.prototype.bind.apply(Date, [this].concat(e))), this.locale = "en", this.weekStart = n.DATETIME_LOCALES.en.weekStart, this.utcMode = !1, this.mutable = !0, isNaN(this.value.getTime())) throw new Error(t)
        };
    g.DEFAULT_FORMAT = h, g.REGEX_FORMAT = p, g.INVALID_DATE = t, g.lpad = f, g.not = i, g.isDatetime = function (e) {
        return e instanceof g
    }, g.now = function (e) {
        return v()[e ? "val" : "time"]()
    }, g.locale = function (e, t) {
        n.DATETIME_LOCALES[e] = t
    }, g.getLocale = function (e) {
        return n.DATETIME_LOCALES[e || "en"] || n.DATETIME_LOCALES.en
    }, g.parse = function (e) {
        return v(Date.parse(e))
    }, g.align = function (e, t) {
        var n, i, s = e instanceof g ? e : v(e);
        switch (t) {
            case o:
                n = s.ms(0);
                break;
            case r:
                n = g.align(s, o)[o](0);
                break;
            case l:
                n = g.align(s, r)[r](0);
                break;
            case c:
                n = g.align(s, l)[l](0);
                break;
            case u:
                n = g.align(s, c)[c](1);
                break;
            case m:
                n = g.align(s, u)[u](0);
                break;
            case d:
                i = s.weekDay(), n = g.align(s, c).addDay(-i);
                break;
            default:
                n = s
        }
        return n
    }, g.alignEnd = function (e, t) {
        var n, i, s = e instanceof g ? e : v(e);
        switch (t) {
            case a:
                n = s.ms(999);
                break;
            case o:
                n = g.alignEnd(s, a);
                break;
            case r:
                n = g.alignEnd(s, o)[o](59);
                break;
            case l:
                n = g.alignEnd(s, r)[r](59);
                break;
            case c:
                n = g.alignEnd(s, l)[l](23);
                break;
            case u:
                n = g.alignEnd(s, c)[c](1).add(1, u).add(-1, c);
                break;
            case m:
                n = g.alignEnd(s, c)[u](11)[c](31);
                break;
            case d:
                i = s.weekDay(), n = g.alignEnd(s, "day").addDay(6 - i);
                break;
            default:
                n = s
        }
        return n
    }, g.extend = function (e) {
        for (var t, n, i = arguments.length, s = 1; s < i; s++)
            if (null != (t = arguments[s]))
                for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
    }, g.use = function (e) {
        g.extend(g.prototype, e)
    }, g.useStatic = function (e) {
        g.extend(g, e)
    }, g.prototype = {
        immutable: function (e) {
            return this.mutable = !(i(e) || e), this
        },
        utc: function () {
            return this.utcMode = !0, this
        },
        local: function () {
            return this.utcMode = !1, this
        },
        useLocale: function (e) {
            return g.getLocale(e) ? (this.locale = e, this.weekStart = g.getLocale(e).weekStart) : console.warn("Locale " + e + " is not defined!"), this
        },
        clone: function () {
            var e = v(this.value);
            return e.locale = this.locale, e.weekStart = this.weekStart, e.mutable = this.mutable, e
        },
        align: function (e) {
            return this.mutable ? (this.value = g.align(this, e).val(), this) : this.clone().immutable(!1).align(e).immutable(!this.mutable)
        },
        alignEnd: function (e) {
            return this.mutable ? (this.value = g.alignEnd(this, e).val(), this) : this.clone().immutable(!1).alignEnd(e).immutable(!this.mutable)
        },
        val: function (e) {
            return e instanceof Date ? this.mutable ? (this.value = e, this) : v(e) : this.value
        },
        year2: function () {
            return +("" + this.year()).substr(-2)
        },
        _set: function (e, t) {
            var n = "set" + (this.utcMode && "t" !== e ? "UTC" : "") + s[e];
            if (this.mutable) return this.value[n](t), this;
            e = this.clone();
            return e.value[n](t), e
        },
        _get: function (e) {
            e = "get" + (this.utcMode && "t" !== e ? "UTC" : "") + s[e];
            return this.value[e]()
        },
        _work: function (e, t) {
            return arguments.length && null != t ? this._set(e, t) : this._get(e)
        },
        ms: function (e) {
            return this._work("ms", e)
        },
        second: function (e) {
            return this._work("s", e)
        },
        minute: function (e) {
            return this._work("m", e)
        },
        hour: function (e) {
            return this._work("h", e)
        },
        day: function (e) {
            return this._work("D", e)
        },
        month: function (e) {
            return this._work("M", e)
        },
        year: function (e) {
            return this._work("Y", e)
        },
        time: function (e) {
            return this._work("t", e)
        },
        weekDay: function (e) {
            if (!arguments.length || i(e)) return this.utcMode ? this.value.getUTCDay() : this.value.getDay();
            e -= this.weekDay();
            return this.day(this.day() + e), this
        },
        get: function (e) {
            return "function" != typeof this[e] ? this : this[e]()
        },
        set: function (e, t) {
            return "function" != typeof this[e] ? this : this[e](t)
        },
        add: function (e, t) {
            switch (t) {
                case l:
                    return this.time(this.time() + 60 * e * 60 * 1e3);
                case r:
                    return this.time(this.time() + 60 * e * 1e3);
                case o:
                    return this.time(this.time() + 1e3 * e);
                case a:
                    return this.time(this.time() + e);
                case c:
                    return this.day(this.day() + e);
                case d:
                    return this.day(this.day() + 7 * e);
                case u:
                    return this.month(this.month() + e);
                case m:
                    return this.year(this.year() + e)
            }
        },
        addHour: function (e) {
            return this.add(e, l)
        },
        addMinute: function (e) {
            return this.add(e, r)
        },
        addSecond: function (e) {
            return this.add(e, o)
        },
        addMs: function (e) {
            return this.add(e, a)
        },
        addDay: function (e) {
            return this.add(e, c)
        },
        addWeek: function (e) {
            return this.add(e, d)
        },
        addMonth: function (e) {
            return this.add(e, u)
        },
        addYear: function (e) {
            return this.add(e, m)
        },
        format: function (e, t) {
            var n = e || h,
                i = g.getLocale(t || this.locale),
                s = this.year(),
                a = this.year2(),
                o = this.month(),
                r = this.day(),
                l = this.weekDay(),
                c = this.hour(),
                d = this.minute(),
                e = this.second(),
                t = this.ms(),
                u = {
                    YY: a,
                    YYYY: s,
                    M: o + 1,
                    MM: f(o + 1, "0", 2),
                    MMM: i.monthsShort[o],
                    MMMM: i.months[o],
                    D: r,
                    DD: f(r, "0", 2),
                    d: l,
                    dd: i.weekdaysMin[l],
                    ddd: i.weekdaysShort[l],
                    dddd: i.weekdays[l],
                    H: c,
                    HH: f(c, "0", 2),
                    m: d,
                    mm: f(d, "0", 2),
                    s: e,
                    ss: f(e, "0", 2),
                    sss: f(t, "0", 3)
                };
            return n.replace(p, function (e, t) {
                return t || u[e]
            })
        },
        valueOf: function () {
            return this.value.valueOf()
        },
        toString: function () {
            return this.value.toString()
        }
    }, n.Datetime = g, n.datetime = v
}("undefined" == typeof self ? "undefined" == typeof global ? window : global : self),
function () {
    "use strict";
    var i = Datetime.prototype.format;
    Datetime.use({
        buddhist: function () {
            return this.year() + 543
        },
        format: function (e, t) {
            e = e || Datetime.DEFAULT_FORMAT;
            var n = {
                    BB: (this.buddhist() + "").slice(-2),
                    BBBB: this.buddhist()
                },
                e = e.replace(/(\[[^\]]+])|B{4}|B{2}/g, function (e, t) {
                    return t || n[e]
                });
            return i.bind(this)(e, t)
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        calendar: function (e) {
            return Datetime.calendar(this, e)
        }
    }), Datetime.useStatic({
        calendar: function (e, t) {
            var n, i = e instanceof Datetime ? e.clone().align("month") : datetime(e),
                s = 0 === t || t ? t : i.weekStart,
                a = s ? i.isoWeekDay() : i.weekDay(),
                o = Datetime.getLocale(i.locale),
                e = datetime(),
                r = {
                    month: o.months[i.month()],
                    days: [],
                    weekstart: t ? 1 : 0,
                    weekdays: function (e, t) {
                        if (0 === t) return e;
                        t = e[0];
                        return e.slice(1).concat([t])
                    }(o.weekdaysMin, s),
                    today: e.format("YYYY-MM-DD"),
                    weekends: [],
                    week: []
                };
            for (i.addDay(s ? 1 - a : -a), n = 0; n < 42; n++) r.days.push(i.format("YYYY-MM-DD")), i.add(1, "day");
            for (r.weekends = r.days.filter(function (e, t) {
                    return 0 === s ? -1 < [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41].indexOf(t) : -1 < [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41].indexOf(t)
                }), i = e.clone(), a = s ? i.isoWeekDay() : i.weekDay(), i.addDay(s ? 1 - a : -a), n = 0; n < 7; n++) r.week.push(i.format("YYYY-MM-DD")), i.add(1, "day");
            return r
        }
    })
}(),
function () {
    "use strict";
    var i = Datetime.prototype.format;
    Datetime.use({
        century: function () {
            return parseInt(this.year() / 100)
        },
        format: function (e, t) {
            e = e || Datetime.DEFAULT_FORMAT;
            var n = {
                    C: this.century()
                },
                e = e.replace(/(\[[^\]]+])|C/g, function (e, t) {
                    return t || n[e]
                });
            return i.bind(this)(e, t)
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        same: function (e) {
            return this.time() === datetime(e).time()
        },
        compare: function (e, t, n) {
            var i, s, a = datetime(e),
                e = datetime(this.value);
            switch (-1 === ["<", ">", ">=", "<=", "=", "!="].indexOf(n = n || "=") && (n = "="), t = (t || "ms").toLowerCase(), i = e.align(t).time(), s = a.align(t).time(), n) {
                case "<":
                    return i < s;
                case ">":
                    return s < i;
                case "<=":
                    return i <= s;
                case ">=":
                    return s <= i;
                case "=":
                    return i === s;
                case "!=":
                    return i !== s
            }
        },
        between: function (e, t) {
            return this.younger(e) && this.older(t)
        },
        older: function (e, t) {
            return this.compare(e, t, "<")
        },
        olderOrEqual: function (e, t) {
            return this.compare(e, t, "<=")
        },
        younger: function (e, t) {
            return this.compare(e, t, ">")
        },
        youngerOrEqual: function (e, t) {
            return this.compare(e, t, ">=")
        },
        equal: function (e, t) {
            return this.compare(e, t, "=")
        },
        notEqual: function (e, t) {
            return this.compare(e, t, "!=")
        },
        diff: function (e) {
            var t = datetime(e),
                e = Math.abs(this.time() - t.time()),
                t = Math.abs(this.month() - t.month() + 12 * (this.year() - t.year()));
            return {
                ms: e,
                second: Math.ceil(e / 1e3),
                minute: Math.ceil(e / 6e4),
                hour: Math.ceil(e / 36e5),
                day: Math.ceil(e / 864e5),
                month: t,
                year: Math.floor(t / 12)
            }
        },
        distance: function (e, t) {
            return this.diff(e)[t]
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        dayOfYear: function () {
            var e = this.month(),
                t = this.day();
            return [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][e] + t + (1 < e && this.isLeapYear() ? 1 : 0)
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        daysInMonth: function () {
            return datetime(this.value).add(1, "month").day(1).add(-1, "day").day()
        },
        daysInYear: function () {
            return this.isLeapYear() ? 366 : 365
        },
        daysInYearMap: function () {
            var e = [],
                t = datetime(this.value);
            t.month(0).day(1);
            for (var n = 0; n < 12; n++) t.add(1, "month").add(-1, "day"), e.push(t.day()), t.day(1).add(1, "month");
            return e
        },
        daysInYearObj: function (e, n) {
            var t = this.daysInYearMap(),
                i = {},
                s = Datetime.getLocale(e || this.locale);
            return t.forEach(function (e, t) {
                i[s[n ? "monthsShort" : "months"][t]] = e
            }), i
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        decade: function () {
            return 10 * Math.floor(this.year() / 10)
        },
        decadeStart: function () {
            var e = this.decade();
            return (this.mutable ? this : this.clone()).year(e).month(0).day(1)
        },
        decadeEnd: function () {
            var e = this.decade() + 9;
            return (this.mutable ? this : this.clone()).year(e).month(11).day(31)
        },
        decadeOfMonth: function () {
            var e = this.clone().add(1, "month").day(1).add(-1, "day").day() / 3,
                t = this.day();
            return t <= e ? 1 : t <= 2 * e ? 2 : 3
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        from: function (e, t, n) {
            function i(e, t) {
                return e.map(function (e) {
                    return e.toLowerCase()
                }).indexOf(t.toLowerCase())
            }
            var a, s, o, r, l, c, d, u, h, p, f = function (e) {
                for (var t, n = {
                        month: ["M", "mm", "%m"],
                        day: ["D", "dd", "%d"],
                        year: ["YY", "YYYY", "yy", "yyyy", "%y"],
                        hour: ["h", "hh", "%h"],
                        minute: ["m", "mi", "i", "ii", "%i"],
                        second: ["s", "ss", "%s"],
                        ms: ["sss"]
                    }, i = -1, s = 0; s < n[e].length; s++)
                    if (t = n[e][s], -1 !== (t = a.indexOf(t))) {
                        i = t;
                        break
                    } return i
            };
            if (Datetime.not(t) || "" === ("" + t).trim()) return datetime();
            if (d = e.replace(/[\/,.:\s]/g, "-"), c = t.toLowerCase().replace(/[^a-zA-Z0-9%]/g, "-"), a = c.split("-"), s = d.split("-"), "" === d.replace(/-/g, "").trim()) throw new Error(Datetime.INVALID_DATE);
            return r = f("month"), l = f("day"), o = f("year"), e = f("hour"), t = f("minute"), c = f("second"), d = f("ms"), -1 < r && s[r] ? isNaN(parseInt(s[r])) ? (s[r] = (u = s[r], h = -1, p = Datetime.getLocale(n || "en"), Datetime.not(u) ? -1 : (-1 === (h = i(p.months, u)) && void 0 !== p.monthsParental && (h = i(p.monthsParental, u)), -1 === h && (u = u.substr(0, 3), h = i(p.monthsShort, u)), -1 === h ? -1 : h + 1)), -1 === s[r] && (r = -1)) : ((f = parseInt(s[r])) < 1 || 12 < f) && (r = -1) : r = -1, o = -1 < o && s[o] ? s[o] : 0, r = -1 < r && s[r] ? s[r] : 1, l = -1 < l && s[l] ? s[l] : 1, e = -1 < e && s[e] ? s[e] : 0, t = -1 < t && s[t] ? s[t] : 0, c = -1 < c && s[c] ? s[c] : 0, d = -1 < d && s[d] ? s[d] : 0, datetime(o, r - 1, l, e, t, c, d)
        }
    })
}(),
function () {
    "use strict";
    var s = Datetime.prototype.format,
        a = Datetime.lpad;
    Datetime.use({
        ampm: function (e) {
            var t = this.hour() < 12 ? "AM" : "PM";
            return e ? t.toLowerCase() : t
        },
        hour12: function (e, t) {
            return 0 === arguments.length ? this.hour() % 12 : ("pm" === (t = t || "am").toLowerCase() && (e += 12), this.hour(e))
        },
        format: function (e, t) {
            var n, i = this.hour12();
            return e = e || Datetime.DEFAULT_FORMAT, n = {
                a: "[" + this.ampm(!0) + "]",
                A: "[" + this.ampm(!1) + "]",
                h: i,
                hh: a(i, "0", 2)
            }, e = e.replace(/(\[[^\]]+])|a|A|h{1,2}/g, function (e, t) {
                return t || n[e]
            }), s.bind(this)(e, t)
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        isLeapYear: function () {
            var e = this.year();
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        }
    })
}(),
function () {
    "use strict";
    var i = Datetime.prototype.format,
        s = Datetime.align,
        a = Datetime.alignEnd;
    Datetime.useStatic({
        align: function (e, t) {
            var n = e instanceof Datetime ? e : datetime(e),
                t = "isoWeek" === t ? (e = n.isoWeekDay(), s(n, "day").addDay(1 - e)) : s.apply(this, [n, t]);
            return t
        },
        alignEnd: function (e, t) {
            var n = e instanceof Datetime ? e : datetime(e),
                t = "isoWeek" === t ? (e = n.isoWeekDay(), a(n, "day").addDay(7 - e)) : a.apply(this, [n, t]);
            return t
        }
    }), Datetime.use({
        isoWeekDay: function (e) {
            var t = (this.weekDay() + 6) % 7 + 1;
            return !arguments.length || Datetime.not(e) ? t : this.addDay(e - t)
        },
        format: function (e, t) {
            e = e || Datetime.DEFAULT_FORMAT;
            var n = {
                    I: this.isoWeekDay()
                },
                e = e.replace(/(\[[^\]]+])|I{1,2}/g, function (e, t) {
                    return t || n[e]
                });
            return i.bind(this)(e, t)
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        max: function () {
            return [].slice.call(arguments).map(function (e) {
                return datetime(e)
            }).sort(function (e, t) {
                return t.time() - e.time()
            })[0]
        }
    }), Datetime.use({
        max: function () {
            return Datetime.max.apply(this, [this].concat([].slice.call(arguments)))
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        min: function () {
            return [].slice.call(arguments).map(function (e) {
                return datetime(e)
            }).sort(function (e, t) {
                return e.time() - t.time()
            })[0]
        }
    }), Datetime.use({
        min: function () {
            return Datetime.min.apply(this, [this].concat([].slice.call(arguments)))
        }
    })
}(),
function () {
    "use strict";
    var n = Datetime.align,
        i = Datetime.alignEnd,
        s = Datetime.prototype.add;
    Datetime.useStatic({
        align: function (e, t) {
            e = e instanceof Datetime ? e : datetime(e), t = "quarter" === t ? Datetime.align(e, "day").day(1).month(3 * e.quarter() - 3) : n.apply(this, [e, t]);
            return t
        },
        alignEnd: function (e, t) {
            e = e instanceof Datetime ? e : datetime(e), t = "quarter" === t ? Datetime.align(e, "quarter").add(3, "month").add(-1, "ms") : i.apply(this, [e, t]);
            return t
        }
    }), Datetime.use({
        quarter: function () {
            var e = this.month();
            return e <= 2 ? 1 : e <= 5 ? 2 : e <= 8 ? 3 : 4
        },
        add: function (e, t) {
            return "quarter" === t ? this.month(this.month() + 3 * e) : s.bind(this)(e, t)
        },
        addQuarter: function (e) {
            return this.add(e, "quarter")
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        sort: function (e, t) {
            var n, i, s = {};
            switch ("string" == typeof t || "object" != typeof t || Datetime.not(t) ? (s.format = Datetime.DEFAULT_FORMAT, s.dir = t && "DESC" === t.toUpperCase() ? "DESC" : "ASC", s.returnAs = "datetime") : (s.format = t.format || Datetime.DEFAULT_FORMAT, s.dir = (t.dir || "ASC").toUpperCase(), s.returnAs = t.format ? "string" : t.returnAs || "datetime"), i = e.map(function (e) {
                return datetime(e)
            }).sort(function (e, t) {
                return e.valueOf() - t.valueOf()
            }), "DESC" === s.dir && i.reverse(), s.returnAs) {
                case "string":
                    n = i.map(function (e) {
                        return e.format(s.format)
                    });
                    break;
                case "date":
                    n = i.map(function (e) {
                        return e.val()
                    });
                    break;
                default:
                    n = i
            }
            return n
        }
    })
}(),
function () {
    "use strict";
    var b = /(%[a-z])/gi,
        w = Datetime.lpad;
    Datetime.use({
        strftime: function (e, t) {
            var n = e || "%Y-%m-%dT%H:%M:%S.%Q%t",
                i = Datetime.getLocale(t || this.locale),
                s = this.year(),
                a = this.year2(),
                o = this.month(),
                r = this.day(),
                l = this.weekDay(),
                c = this.hour(),
                d = this.hour12(),
                u = this.minute(),
                h = this.second(),
                p = this.ms(),
                f = this.time(),
                m = w(r, "0", 2),
                v = w(o + 1, "0", 2),
                e = w(c, "0", 2),
                t = w(d, "0", 2),
                c = w(u, "0", 2),
                d = w(h, "0", 2),
                u = w(p, "0", 3),
                g = this,
                h = function () {
                    var e = datetime(g.value);
                    return e.day(g.day() - (g.weekDay() + 6) % 7 + 3), e
                },
                C = {
                    "%a": i.weekdaysShort[l],
                    "%A": i.weekdays[l],
                    "%b": i.monthsShort[o],
                    "%h": i.monthsShort[o],
                    "%B": i.months[o],
                    "%c": this.toString().substring(0, this.toString().indexOf(" (")),
                    "%C": this.century(),
                    "%d": m,
                    "%D": [m, v, s].join("/"),
                    "%e": r,
                    "%F": [s, v, m].join("-"),
                    "%G": h().year(),
                    "%g": ("" + h().year()).slice(2),
                    "%H": e,
                    "%I": t,
                    "%j": w(this.dayOfYear(), "0", 3),
                    "%k": e,
                    "%l": t,
                    "%m": v,
                    "%n": o + 1,
                    "%M": c,
                    "%p": this.ampm(),
                    "%P": this.ampm(!0),
                    "%s": Math.round(f / 1e3),
                    "%S": d,
                    "%u": this.isoWeekDay(),
                    "%V": this.isoWeekNumber(),
                    "%w": l,
                    "%x": this.toLocaleDateString(),
                    "%X": this.toLocaleTimeString(),
                    "%y": a,
                    "%Y": s,
                    "%z": this.timezone().replace(":", ""),
                    "%Z": this.timezoneName(),
                    "%r": [t, c, d].join(":") + " " + this.ampm(),
                    "%R": [e, c].join(":"),
                    "%T": [e, c, d].join(":"),
                    "%Q": u,
                    "%q": p,
                    "%t": this.timezone()
                };
            return n.replace(b, function (e) {
                return 0 === C[e] || C[e] ? C[e] : e
            })
        }
    })
}(),
function () {
    "use strict";
    var i = Datetime.prototype.format;
    Datetime.use({
        utcOffset: function () {
            return this.value.getTimezoneOffset()
        },
        timezone: function () {
            return this.toTimeString().replace(/.+GMT([+-])(\d{2})(\d{2}).+/, "$1$2:$3")
        },
        timezoneName: function () {
            return this.toTimeString().replace(/.+\((.+?)\)$/, "$1")
        },
        format: function (e, t) {
            e = e || Datetime.DEFAULT_FORMAT;
            var n = {
                    Z: this.utcMode ? "Z" : this.timezone(),
                    ZZ: this.timezone().replace(":", ""),
                    ZZZ: "[GMT]" + this.timezone(),
                    z: this.timezoneName()
                },
                e = e.replace(/(\[[^\]]+])|Z{1,3}|z/g, function (e, t) {
                    return t || n[e]
                });
            return i.bind(this)(e, t)
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        isToday: function (e) {
            var t = datetime(e).align("day"),
                e = datetime().align("day");
            return t.time() === e.time()
        }
    }), Datetime.use({
        isToday: function () {
            return Datetime.isToday(this)
        },
        today: function () {
            var e = datetime();
            return this.mutable ? this.val(e.val()) : e
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        isTomorrow: function (e) {
            var t = datetime(e).align("day"),
                e = datetime().align("day").add(1, "day");
            return t.time() === e.time()
        }
    }), Datetime.use({
        isTomorrow: function () {
            return Datetime.isTomorrow(this)
        },
        tomorrow: function () {
            return (this.mutable ? this : this.clone()).add(1, "day")
        }
    })
}(),
function () {
    "use strict";
    Datetime.use({
        toDateString: function () {
            return this.value.toDateString()
        },
        toISOString: function () {
            return this.value.toISOString()
        },
        toJSON: function () {
            return this.value.toJSON()
        },
        toGMTString: function () {
            return this.value.toGMTString()
        },
        toLocaleDateString: function () {
            return this.value.toLocaleDateString()
        },
        toLocaleString: function () {
            return this.value.toLocaleString()
        },
        toLocaleTimeString: function () {
            return this.value.toLocaleTimeString()
        },
        toTimeString: function () {
            return this.value.toTimeString()
        },
        toUTCString: function () {
            return this.value.toUTCString()
        },
        toDate: function () {
            return new Date(this.value)
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        timestamp: function () {
            return (new Date).getTime() / 1e3
        }
    }), Datetime.use({
        unix: function (e) {
            return !arguments.length || Datetime.not(e) ? Math.floor(this.valueOf() / 1e3) : (e = 1e3 * e, (this.mutable ? this : datetime(this.value)).time(e))
        },
        timestamp: function () {
            return this.unix()
        }
    })
}(),
function () {
    "use strict";
    var a = Datetime.prototype.format,
        o = Datetime.lpad;
    Datetime.use({
        weekNumber: function (e) {
            var t, n, i;
            return e = +e || 0, t = 0 <= (t = (n = datetime(this.year(), 0, 1)).weekDay() - e) ? t : t + 7, n = Math.floor((this.time() - n.time() - 6e4 * (this.utcOffset() - n.utcOffset())) / 864e5) + 1, t < 4 ? 52 < (i = Math.floor((n + t - 1) / 7) + 1) && (i = (e = 0 <= (e = datetime(this.year() + 1, 0, 1).weekDay() - e) ? e : e + 7) < 4 ? 1 : 53) : i = Math.floor((n + t - 1) / 7), i
        },
        isoWeekNumber: function () {
            return this.weekNumber(1)
        },
        weeksInYear: function (e) {
            return datetime(this.value).month(11).day(31).weekNumber(e)
        },
        format: function (e, t) {
            var n, i = this.weekNumber(),
                s = this.isoWeekNumber();
            return e = e || Datetime.DEFAULT_FORMAT, n = {
                W: i,
                WW: o(i, "0", 2),
                WWW: s,
                WWWW: o(s, "0", 2)
            }, e = e.replace(/(\[[^\]]+])|W{1,4}/g, function (e, t) {
                return t || n[e]
            }), a.bind(this)(e, t)
        }
    })
}(),
function () {
    "use strict";
    Datetime.useStatic({
        isYesterday: function (e) {
            var t = datetime(e).align("day"),
                e = datetime().align("day").add(-1, "day");
            return t.time() === e.time()
        }
    }), Datetime.use({
        isYesterday: function () {
            return Datetime.isYesterday(this)
        },
        yesterday: function () {
            return (this.mutable ? this : this.clone()).add(-1, "day")
        }
    })
}(),
function () {
    "use strict";
    var n = Datetime.getLocale;
    Datetime.getLocale = function (e) {
        var t;
        return Metro ? (Metro.locales[e] || (e = "en-US"), {
            months: (t = Metro.locales[e].calendar).months.filter(function (e, t) {
                return t < 12
            }),
            monthsShort: t.months.filter(function (e, t) {
                return 11 < t
            }),
            weekdays: t.days.filter(function (e, t) {
                return t < 7
            }),
            weekdaysShort: t.days.filter(function (e, t) {
                return 13 < t
            }),
            weekdaysMin: t.days.filter(function (e, t) {
                return 6 < t && t < 14
            }),
            weekStart: t.weekStart
        }) : (e = "en", n.call(this, e))
    }
}(),
function () {
    "use strict";
    var o = function (e) {
            return null == e
        },
        e = "\\s\\uFEFF\\xA0",
        t = "\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F",
        n = "a-z\\xB5\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F",
        i = "\\x41-\\x5a\\xc0-\\xd6\\xd8-\\xde\\u0100\\u0102\\u0104\\u0106\\u0108\\u010a\\u010c\\u010e\\u0110\\u0112\\u0114\\u0116\\u0118\\u011a\\u011c\\u011e\\u0120\\u0122\\u0124\\u0126\\u0128\\u012a\\u012c\\u012e\\u0130\\u0132\\u0134\\u0136\\u0139\\u013b\\u013d\\u013f\\u0141\\u0143\\u0145\\u0147\\u014a\\u014c\\u014e\\u0150\\u0152\\u0154\\u0156\\u0158\\u015a\\u015c\\u015e\\u0160\\u0162\\u0164\\u0166\\u0168\\u016a\\u016c\\u016e\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017b\\u017d\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018b\\u018e-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019c\\u019d\\u019f\\u01a0\\u01a2\\u01a4\\u01a6\\u01a7\\u01a9\\u01ac\\u01ae\\u01af\\u01b1-\\u01b3\\u01b5\\u01b7\\u01b8\\u01bc\\u01c4\\u01c5\\u01c7\\u01c8\\u01ca\\u01cb\\u01cd\\u01cf\\u01d1\\u01d3\\u01d5\\u01d7\\u01d9\\u01db\\u01de\\u01e0\\u01e2\\u01e4\\u01e6\\u01e8\\u01ea\\u01ec\\u01ee\\u01f1\\u01f2\\u01f4\\u01f6-\\u01f8\\u01fa\\u01fc\\u01fe\\u0200\\u0202\\u0204\\u0206\\u0208\\u020a\\u020c\\u020e\\u0210\\u0212\\u0214\\u0216\\u0218\\u021a\\u021c\\u021e\\u0220\\u0222\\u0224\\u0226\\u0228\\u022a\\u022c\\u022e\\u0230\\u0232\\u023a\\u023b\\u023d\\u023e\\u0241\\u0243-\\u0246\\u0248\\u024a\\u024c\\u024e",
        s = new RegExp("^[" + e + "]+"),
        a = new RegExp("[" + e + "]+$"),
        r = new RegExp("^\\d+$"),
        l = /[<>&"'`]/g,
        c = /(<([^>]+)>)/gi,
        d = new RegExp("(?:[" + i + "][" + t + "]*)?(?:[" + n + "][" + t + "]*)+|(?:[" + i + "][" + t + "]*)+(?![" + n + "])|[\\d]+|[\\u2700-\\u27BF]|[^\\x00-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7b-\\xBF\\xD7\\xF7\\u2000-\\u206F" + e + "]+", "g"),
        u = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g,
        h = new RegExp("^(?:[" + n + i + "][" + t + "]*)+$"),
        p = new RegExp("^((?:[" + n + i + "][" + t + "]*)|[\\d])+$"),
        f = /^[\x01-\xFF]*$/;

    function m(e, t) {
        return o(e) ? t : e
    }

    function v(e, t) {
        t = 1 < arguments.length && void 0 !== t ? t : "";
        return o(e) ? t : "string" == typeof e ? e : Array.isArray(e) ? e.join("") : JSON.stringify(e)
    }

    function g(e, t, n) {
        n = o(t) ? f.test(e) ? u : d : t instanceof RegExp ? t : new RegExp(t, m(n, ""));
        return m(v(e).match(n), [])
    }

    function C(e, t) {
        var n = v(e),
            e = n.substr(1);
        return n.substr(0, 1).toUpperCase() + (t ? e.toLowerCase() : e)
    }

    function b(e) {
        return v(e).toLowerCase()
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
        return v(e).split("").filter(function (e) {
            return !t.includes(e)
        })
    }

    function y(e) {
        return (y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function S(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function _(e) {
        return function (e) {
            if (Array.isArray(e)) return k(e)
        }(e) || function (e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        }(e) || function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return k(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return k(e, t)
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function k(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
        return i
    }

    function T(e, t) {
        var n = t.toLowerCase(),
            i = t.toUpperCase();
        return e + (t === n ? i : n)
    }

    function x(e) {
        for (var t = _(e), n = 0; n < t.length; ++n)
            for (var i = n + 1; i < t.length; ++i) t[n] === t[i] && t.splice(i--, 1);
        return t
    }
    var E = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };

    function I(e) {
        return E[e]
    }
    var A = {
            "<": /(&lt;)|(&#x0*3c;)|(&#0*60;)/gi,
            ">": /(&gt;)|(&#x0*3e;)|(&#0*62;)/gi,
            "&": /(&amp;)|(&#x0*26;)|(&#0*38;)/gi,
            '"': /(&quot;)|(&#x0*22;)|(&#0*34;)/gi,
            "'": /(&#x0*27;)|(&#0*39;)/gi,
            "`": /(&#x0*60;)|(&#0*96;)/gi
        },
        M = Object.keys(A);

    function D(e, t) {
        return e.replace(A[t], t)
    }

    function O(e, t, n) {
        return v(e).substr(t, n)
    }
    var P = 9007199254740991;

    function L(e, t, n) {
        n = 2 < arguments.length && void 0 !== n ? n : P;
        return e < t ? t : n < e ? n : e
    }

    function N(e) {
        return e === 1 / 0 ? P : e === -1 / 0 ? -P : ~~e
    }

    function B(e, t) {
        var n = v(e),
            i = o(t) || isNaN(t) ? n.length : L(N(t), 0, P),
            s = n;
        if (0 === t) return "";
        for (var a = 0; a < i - 1; a++) n += s;
        return n
    }

    function R(e, t) {
        return B(e, 1 + (t - e.length)).substr(0, t)
    }

    function H(e, t, n, i) {
        var s = v(e),
            e = o(t) || isNaN(t) ? s.length : L(N(t), 0, P),
            t = n.length;
        return (e = e - s.length) <= 0 || 0 === t ? s : (e = R(n, e), i ? e + s : s + e)
    }
    var V = Array.prototype.reduce,
        F = Array.prototype.reduceRight;

    function z(e, t) {
        return U(j(e, t), t)
    }

    function U(e, n) {
        e = v(e);
        if (o(n)) return e.replace(s, "");
        if ("" === n || "" === e) return e;
        "string" != typeof n && (n = "");
        var i = !0;
        return V.call(e, function (e, t) {
            return i && n.includes(t) ? e : (i = !1, e + t)
        }, "")
    }

    function j(e, n) {
        e = v(e);
        if (o(n)) return e.replace(a, "");
        if ("" === n || "" === e) return e;
        "string" != typeof n && (n = "");
        var i = !0;
        return F.call(e, function (e, t) {
            return i && n.includes(t) ? e : (i = !1, t + e)
        }, "")
    }
    var q = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    };
    var W = Object.create(null);

    function Y(e) {
        return function (e, t) {
            for (var n, i, s, a, o, r, l = 1, c = e.length, d = "", u = 0; u < c; u++)
                if ("string" == typeof e[u]) d += e[u];
                else if ("object" === y(e[u])) {
                if ((i = e[u]).keys) {
                    n = t[l];
                    for (var h = 0; h < i.keys.length; h++) {
                        if (void 0 === n) throw new Error(Y('[sprintf] Cannot access property "%s" of undefined value "%s"', i.keys[h], i.keys[h - 1]));
                        n = n[i.keys[h]]
                    }
                } else n = i.param_no ? t[i.param_no] : t[l++];
                if (q.not_type.test(i.type) && q.not_primitive.test(i.type) && n instanceof Function && (n = n()), q.numeric_arg.test(i.type) && "number" != typeof n && isNaN(n)) throw new TypeError(Y("[sprintf] expecting number but found %T", n));
                switch (q.number.test(i.type) && (o = 0 <= n), i.type) {
                    case "b":
                        n = parseInt(n, 10).toString(2);
                        break;
                    case "c":
                        n = String.fromCharCode(parseInt(n, 10));
                        break;
                    case "d":
                    case "i":
                        n = parseInt(n, 10);
                        break;
                    case "j":
                        n = JSON.stringify(n, null, i.width ? parseInt(i.width) : 0);
                        break;
                    case "e":
                        n = i.precision ? parseFloat(n).toExponential(i.precision) : parseFloat(n).toExponential();
                        break;
                    case "f":
                        n = i.precision ? parseFloat(n).toFixed(i.precision) : parseFloat(n);
                        break;
                    case "g":
                        n = i.precision ? String(Number(n.toPrecision(i.precision))) : parseFloat(n);
                        break;
                    case "o":
                        n = (parseInt(n, 10) >>> 0).toString(8);
                        break;
                    case "s":
                        n = String(n), n = i.precision ? n.substring(0, i.precision) : n;
                        break;
                    case "t":
                        n = String(!!n), n = i.precision ? n.substring(0, i.precision) : n;
                        break;
                    case "T":
                        n = Object.prototype.toString.call(n).slice(8, -1).toLowerCase(), n = i.precision ? n.substring(0, i.precision) : n;
                        break;
                    case "u":
                        n = parseInt(n, 10) >>> 0;
                        break;
                    case "v":
                        n = n.valueOf(), n = i.precision ? n.substring(0, i.precision) : n;
                        break;
                    case "x":
                        n = (parseInt(n, 10) >>> 0).toString(16);
                        break;
                    case "X":
                        n = (parseInt(n, 10) >>> 0).toString(16).toUpperCase()
                }
                q.json.test(i.type) ? d += n : (!q.number.test(i.type) || o && !i.sign ? r = "" : (r = o ? "+" : "-", n = n.toString().replace(q.sign, "")), s = i.pad_char ? "0" === i.pad_char ? "0" : i.pad_char.charAt(1) : " ", a = i.width - (r + n).length, a = i.width && 0 < a ? s.repeat(a) : "", d += i.align ? r + n + a : "0" === s ? r + a + n : a + r + n)
            }
            return d
        }(function (e) {
            if (W[e]) return W[e];
            for (var t, n = e, i = [], s = 0; n;) {
                if (null !== (t = q.text.exec(n))) i.push(t[0]);
                else if (null !== (t = q.modulo.exec(n))) i.push("%");
                else {
                    if (null === (t = q.placeholder.exec(n))) throw new SyntaxError("[sprintf] unexpected placeholder");
                    if (t[2]) {
                        s |= 1;
                        var a = [],
                            o = t[2],
                            r = [];
                        if (null === (r = q.key.exec(o))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                        for (a.push(r[1]);
                            "" !== (o = o.substring(r[0].length));)
                            if (null !== (r = q.key_access.exec(o))) a.push(r[1]);
                            else {
                                if (null === (r = q.index_access.exec(o))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                                a.push(r[1])
                            } t[2] = a
                    } else s |= 2;
                    if (3 === s) throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    i.push({
                        placeholder: t[0],
                        param_no: t[1],
                        keys: t[2],
                        sign: t[3],
                        pad_char: t[4],
                        align: t[5],
                        width: t[6],
                        precision: t[7],
                        type: t[8]
                    })
                }
                n = n.substring(t[0].length)
            }
            return W[e] = i
        }(e), arguments)
    }
    var G, K, J = {
            camelCase: function (e) {
                return g(v(e)).map(function (e, t) {
                    return 0 === t ? e.toLowerCase() : C(e)
                }).join("")
            },
            capitalize: C,
            chars: w,
            count: function (e) {
                return v(e).length
            },
            countChars: function (e, t) {
                return w(e, t).length
            },
            countUniqueChars: function (e, t) {
                return x(w(e, t)).length
            },
            countSubstr: function (e, t) {
                return e = v(e), t = v(t), "" === e || "" === t ? 0 : e.split(t).length - 1
            },
            countWords: function (e, t, n) {
                return g(e, t, n).length
            },
            countUniqueWords: function (e, t, n) {
                return x(g(e, t, n)).length
            },
            dashedName: function (e) {
                return g(v(e)).map(function (e) {
                    return e.toLowerCase()
                }).join("-")
            },
            decapitalize: function (e) {
                return (e = v(e)).substr(0, 1).toLowerCase() + e.substr(1)
            },
            kebab: function (e) {
                return g(v(e)).map(function (e) {
                    return e.toLowerCase()
                }).join("-")
            },
            lower: b,
            reverse: function (e, t) {
                return w(v(e), t).reverse().join("")
            },
            shuffle: function (e) {
                return function (e) {
                    for (var t, n, i = _(e), s = i.length; 0 !== s;) n = Math.floor(Math.random() * s), t = i[--s], i[s] = i[n], i[n] = t;
                    return i
                }(v(e).split("")).join("")
            },
            snake: function (e) {
                return g(v(e)).map(function (e) {
                    return e.toLowerCase()
                }).join("_")
            },
            swap: function (e) {
                return v(e).split("").reduce(T, "")
            },
            title: function (e, t) {
                var n = v(e),
                    i = f.test(n) ? u : d,
                    s = Array.isArray(t) ? t : o(t) ? [] : t.split();
                return e.replace(i, function (e, t) {
                    return (t && s.includes(n[t - 1]) ? b : C)(e)
                })
            },
            upper: function (e) {
                return v(e).toUpperCase()
            },
            words: g,
            wrap: function (e) {
                var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "";
                return (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "") + v(e) + t
            },
            wrapTag: function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "div";
                return "<".concat(t, ">").concat(v(e), "</").concat(t, ">")
            },
            escapeHtml: function (e) {
                return v(e).replace(l, I)
            },
            unescapeHtml: function (e) {
                return M.reduce(D, v(e))
            },
            unique: function (e, t) {
                return x(w(e, t)).join("")
            },
            uniqueWords: function (e, t, n) {
                return x(g(e, t, n)).join("")
            },
            substr: O,
            first: function (e, t) {
                return (e = v(e)) ? O(e, 0, t) : ""
            },
            last: function (e, t) {
                return (e = v(e)) ? O(e, e.length - t) : ""
            },
            truncate: function (e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "&#8226;&#8226;&#8226;",
                    e = v(e),
                    t = o(t) || isNaN(t) ? e.length : L(N(t), 0, P);
                return O(e, 0, t) + (e.length === t ? "" : n)
            },
            slice: function (e) {
                for (var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, n = v(e), i = [], s = Math.round(n.length / t), a = 0; a < t; a++) i.push(O(n, a * s, s));
                return i
            },
            prune: function (e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
                    e = v(e),
                    i = o(t) || isNaN(t) ? e.length : L(N(t), 0, P),
                    s = 0,
                    t = f.test(e) ? u : d;
                return e.replace(t, function (e, t) {
                    e = t + e.length;
                    e <= i - n.length && (s = e)
                }), e.substr(0, s) + n
            },
            repeat: B,
            pad: function (e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : " ",
                    i = v(e),
                    s = o(t) || isNaN(t) ? i.length : L(N(t), 0, P),
                    a = n.length,
                    t = N((e = s - i.length) / 2),
                    s = e % 2;
                return e <= 0 || 0 === a ? i : R(n, t) + i + R(n, t + s)
            },
            lpad: function (e, t) {
                return H(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : " ", !0)
            },
            rpad: function (e, t) {
                return H(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : " ", !1)
            },
            insert: function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                    n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
                return (e = v(e)).substr(0, n) + t + e.substr(n)
            },
            trim: z,
            ltrim: U,
            rtrim: j,
            endsWith: function (e, t, n) {
                return v(e).endsWith(t, n)
            },
            isAlpha: function (e) {
                return h.test(v(e))
            },
            isAlphaDigit: function (e) {
                return p.test(v(e))
            },
            isDigit: function (e) {
                return r.test(v(e))
            },
            isBlank: function (e) {
                return 0 === z(e).length
            },
            isEmpty: function (e) {
                return 0 === v(e).length
            },
            isLower: function (e) {
                return (e = v(e)).toLowerCase() === e
            },
            isUpper: function (e) {
                return (e = v(e)).toUpperCase() === e
            },
            startWith: function (e, t, n) {
                return v(e).startsWith(t, n)
            },
            stripTags: function (e) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
                return v(e).replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, function (e, t) {
                    return n.includes(t) ? e : ""
                })
            },
            stripTagsAll: function (e) {
                return v(e).replace(c, "")
            },
            sprintf: Y,
            vsprintf: function (e, t) {
                return Y.apply(null, [e].concat(t || []))
            },
            includes: function (e, t, n) {
                return v(e).includes(t, n)
            }
        },
        $ = null;
    G = Symbol.toPrimitive, K = Symbol.toStringTag;
    var X = function () {
            function s() {
                var e, t, n, i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                ! function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, s), n = void 0, (t = "_value") in (e = this) ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, this._value = "" + i
            }
            var e, t, n;
            return e = s, (t = [{
                key: G,
                value: function (e) {
                    return "number" === e ? +this.value : this.value
                }
            }, {
                key: "toString",
                value: function () {
                    return this.value
                }
            }, {
                key: "escapeHtml",
                value: function () {
                    return this.value = J.escapeHtml(this.value), this
                }
            }, {
                key: "unescapeHtml",
                value: function () {
                    return this.value = J.unescapeHtml(this.value), this
                }
            }, {
                key: "camelCase",
                value: function () {
                    return this.value = J.camelCase(this.value), this
                }
            }, {
                key: "capitalize",
                value: function (e) {
                    return this.value = J.capitalize(this.value, e), this
                }
            }, {
                key: "chars",
                value: function () {
                    return J.chars(this.value)
                }
            }, {
                key: "count",
                value: function () {
                    return J.count(this.value)
                }
            }, {
                key: "countChars",
                value: function (e) {
                    return J.countChars(this.value, e)
                }
            }, {
                key: "countUniqueChars",
                value: function (e) {
                    return J.countUniqueChars(this.value, e)
                }
            }, {
                key: "countSubstr",
                value: function (e) {
                    return J.countSubstr(this.value, e)
                }
            }, {
                key: "countWords",
                value: function (e, t) {
                    return J.countWords(this.value, e, t)
                }
            }, {
                key: "countUniqueWords",
                value: function (e, t) {
                    return J.countUniqueWords(this.value, e, t)
                }
            }, {
                key: "dashedName",
                value: function () {
                    return this.value = J.dashedName(this.value), this
                }
            }, {
                key: "decapitalize",
                value: function () {
                    return this.value = J.decapitalize(this.value), this
                }
            }, {
                key: "kebab",
                value: function () {
                    return this.value = J.kebab(this.value), this
                }
            }, {
                key: "lower",
                value: function () {
                    return this.value = J.lower(this.value), this
                }
            }, {
                key: "reverse",
                value: function () {
                    return this.value = J.reverse(this.value), this
                }
            }, {
                key: "shuffle",
                value: function () {
                    return this.value = J.shuffle(this.value), this
                }
            }, {
                key: "snake",
                value: function () {
                    return this.value = J.snake(this.value), this
                }
            }, {
                key: "swap",
                value: function () {
                    return this.value = J.swap(this.value), this
                }
            }, {
                key: "title",
                value: function () {
                    return this.value = J.title(this.value), this
                }
            }, {
                key: "upper",
                value: function () {
                    return this.value = J.upper(this.value), this
                }
            }, {
                key: "words",
                value: function (e, t) {
                    return J.words(this.value, e, t)
                }
            }, {
                key: "wrap",
                value: function (e, t) {
                    return this.value = J.wrap(this.value, e, t), this
                }
            }, {
                key: "wrapTag",
                value: function (e) {
                    return this.value = J.wrapTag(this.value, e), this
                }
            }, {
                key: "pad",
                value: function (e, t) {
                    return this.value = J.pad(this.value, e, t), this
                }
            }, {
                key: "lpad",
                value: function (e, t) {
                    return this.value = J.lpad(this.value, e, t), this
                }
            }, {
                key: "rpad",
                value: function (e, t) {
                    return this.value = J.rpad(this.value, e, t), this
                }
            }, {
                key: "repeat",
                value: function (e) {
                    return this.value = J.repeat(this.value, e), this
                }
            }, {
                key: "prune",
                value: function (e, t) {
                    return this.value = J.prune(this.value, e, t), this
                }
            }, {
                key: "slice",
                value: function (e) {
                    return J.slice(this.value, e)
                }
            }, {
                key: "truncate",
                value: function (e, t) {
                    return this.value = J.truncate(this.value, e, t), this
                }
            }, {
                key: "last",
                value: function (e) {
                    return this.value = J.last(this.value, e), this
                }
            }, {
                key: "first",
                value: function (e) {
                    return this.value = J.first(this.value, e), this
                }
            }, {
                key: "substr",
                value: function (e, t) {
                    return this.value = J.substr(this.value, e, t), this
                }
            }, {
                key: "unique",
                value: function (e) {
                    return J.unique(this.value, e)
                }
            }, {
                key: "uniqueWords",
                value: function (e, t) {
                    return J.uniqueWords(this.value, e, t)
                }
            }, {
                key: "insert",
                value: function (e, t) {
                    return this.value = J.insert(this.value, e, t), this
                }
            }, {
                key: "trim",
                value: function (e) {
                    return this.value = J.trim(this.value, e), this
                }
            }, {
                key: "ltrim",
                value: function (e) {
                    return this.value = J.ltrim(this.value, e), this
                }
            }, {
                key: "rtrim",
                value: function (e) {
                    return this.value = J.rtrim(this.value, e), this
                }
            }, {
                key: "endsWith",
                value: function (e, t) {
                    return J.endsWith(this.value, e, t)
                }
            }, {
                key: "startWith",
                value: function (e, t) {
                    return J.startWith(this.value, e, t)
                }
            }, {
                key: "isAlpha",
                value: function () {
                    return J.isAlpha(this.value)
                }
            }, {
                key: "isAlphaDigit",
                value: function () {
                    return J.isAlphaDigit(this.value)
                }
            }, {
                key: "isDigit",
                value: function () {
                    return J.isDigit(this.value)
                }
            }, {
                key: "isBlank",
                value: function () {
                    return J.isBlank(this.value)
                }
            }, {
                key: "isEmpty",
                value: function () {
                    return J.isEmpty(this.value)
                }
            }, {
                key: "isLower",
                value: function () {
                    return J.isLower(this.value)
                }
            }, {
                key: "isUpper",
                value: function () {
                    return J.isUpper(this.value)
                }
            }, {
                key: "stripTagsAll",
                value: function () {
                    return this.value = J.stripTagsAll(this.value), this
                }
            }, {
                key: "stripTags",
                value: function (e) {
                    return this.value = J.stripTags(this.value, e), this
                }
            }, {
                key: "sprintf",
                value: function (e) {
                    return J.sprintf(this.value, e)
                }
            }, {
                key: "vsprintf",
                value: function (e) {
                    return J.vsprintf(this.value, e)
                }
            }, {
                key: "includes",
                value: function (e, t) {
                    return J.includes(this.value, e, t)
                }
            }, {
                key: K,
                get: function () {
                    return "Cake"
                }
            }, {
                key: "value",
                get: function () {
                    return this._value
                },
                set: function (e) {
                    this._value = e
                }
            }, {
                key: "length",
                get: function () {
                    return this._value.length
                }
            }]) && S(e.prototype, t), n && S(e, n), s
        }(),
        i = Object.assign({}, J),
        t = null !== $ ? $ : $ = "object" === ("undefined" == typeof global ? "undefined" : y(global)) && global.Object === Object ? global : "object" === ("undefined" == typeof self ? "undefined" : y(self)) && self.Object === Object ? self : new Function("return this")();
    t.Cake = i, t.cake = function (e) {
        return new X(e)
    }
}(),
function (e, u) {
    "use strict";
    var t, i, s, n, a, o, r, l = ["opacity", "zIndex", "order", "zoom"];

    function c(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }

    function x(e) {
        return e === u || null === e
    }

    function C(e) {
        return e.replace(/-([a-z])/g, function (e, t) {
            return t.toUpperCase()
        })
    }

    function b(e) {
        return !(!e || "[object Object]" !== Object.prototype.toString.call(e)) && (!(e = e.prototype !== u) || e.constructor && "function" == typeof e.constructor)
    }

    function w(e) {
        for (var t in e)
            if (S(e, t)) return !1;
        return !0
    }

    function d(e) {
        return e instanceof Object && "length" in e
    }

    function h(e, t) {
        return t = t || " ", e.split(t).map(function (e) {
            return ("" + e).trim()
        }).filter(function (e) {
            return "" !== e
        })
    }

    function g(e, t) {
        return t = t || [0, ""], e = String(e), t[0] = parseFloat(e), t[1] = e.match(/[\d.\-+]*\s*(.*)/)[1] || "", t
    }

    function y(e, t) {
        e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
        return void 0 !== e[1] ? e[1] : t
    }

    function p(e, t, n) {
        t = C(t), -1 < ["scrollLeft", "scrollTop"].indexOf(t) ? e[t] = parseInt(n) : e.style[t] = isNaN(n) || -1 < l.indexOf("" + t) ? n : n + "px"
    }

    function f(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }

    function m(e, t, n) {
        var i;
        return x(n) && 1 === e.nodeType && (i = "data-" + t.replace(/[A-Z]/g, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(i)) ? (n = function (t) {
            try {
                return JSON.parse(t)
            } catch (e) {
                return t
            }
        }(n), P.set(e, t, n)) : n = u), n
    }

    function v(e) {
        return "string" != typeof e ? u : e.replace(/-/g, "").toLowerCase()
    }

    function S(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function _(e) {
        e = e || window.location.hostname;
        return "localhost" === e || "127.0.0.1" === e || "[::1]" === e || "" === e || null !== e.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    }

    function k(e) {
        delete s[e]
    }

    function T(e) {
        if (n) setTimeout(T, 0, e);
        else {
            var t = s[e];
            if (t) {
                n = !0;
                try {
                    ! function (e) {
                        var t = e.callback,
                            n = e.args;
                        switch (n.length) {
                            case 0:
                                t();
                                break;
                            case 1:
                                t(n[0]);
                                break;
                            case 2:
                                t(n[0], n[1]);
                                break;
                            case 3:
                                t(n[0], n[1], n[2]);
                                break;
                            default:
                                t.apply(u, n)
                        }
                    }(t)
                } finally {
                    k(e), n = !1
                }
            }
        }
    }(t = "undefined" == typeof self ? void 0 === e ? window : e : self).setImmediate || (i = 1, n = !(s = {}), E = (E = Object.getPrototypeOf && Object.getPrototypeOf(t)) && E.setTimeout ? E : t, a = "[object process]" === {}.toString.call(t.process) ? function (e) {
        t.process.nextTick(function () {
            T(e)
        })
    } : t.MessageChannel ? ((r = new MessageChannel).port1.onmessage = function (e) {
        T(e.data)
    }, function (e) {
        r.port2.postMessage(e)
    }) : (o = "setImmediate$" + Math.random() + "$", t.addEventListener("message", function (e) {
        e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(o) && T(+e.data.slice(o.length))
    }, !1), function (e) {
        t.postMessage(o + e, "*")
    }), E.setImmediate = function (e) {
        "function" != typeof e && (e = new Function("" + e));
        for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
        return s[i] = {
            callback: e,
            args: t
        }, a(i), i++
    }, E.clearImmediate = k);
    var E = "v1.1.0. Built at 05/05/2021 22:47:56",
        I = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector,
        A = function (e, t) {
            return new A.init(e, t)
        };
    A.version = E, A.fn = A.prototype = {
        version: E,
        constructor: A,
        length: 0,
        uid: "",
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        indexOf: [].indexOf,
        reverse: [].reverse
    }, A.extend = A.fn.extend = function () {
        var e, t, n = arguments[0] || {},
            i = 1,
            s = arguments.length;
        for ("object" != typeof n && "function" != typeof n && (n = {}), i === s && (n = this, i--); i < s; i++)
            if (null != (e = arguments[i]))
                for (t in e) S(e, t) && (n[t] = e[t]);
        return n
    }, A.assign = function () {
        var e, t, n = arguments[0] || {},
            i = 1,
            s = arguments.length;
        for ("object" != typeof n && "function" != typeof n && (n = {}), i === s && (n = this, i--); i < s; i++)
            if (null != (e = arguments[i]))
                for (t in e) S(e, t) && e[t] !== u && (n[t] = e[t]);
        return n
    };

    function M() {
        return Date.now()
    }

    function D(e) {
        var t = document.createElement("script");
        if (t.type = "text/javascript", x(e)) return A(t);
        e = A(e)[0];
        return e.src ? t.src = e.src : t.textContent = e.innerText, document.body.appendChild(t), e.parentNode && e.parentNode.removeChild(e), t
    }
    A.extend({
        intervalId: -1,
        intervalQueue: [],
        intervalTicking: !1,
        intervalTickId: null,
        setInterval: function (e, t) {
            var n, i = this;
            return this.intervalId++, this.intervalQueue.push({
                id: this.intervalId,
                fn: e,
                interval: t,
                lastTime: M()
            }), this.intervalTicking || (n = function () {
                i.intervalTickId = requestAnimationFrame(n), A.each(i.intervalQueue, function () {
                    var e = this;
                    (e.interval < 17 || M() - e.lastTime >= e.interval) && (e.fn(), e.lastTime = M())
                })
            }, this.intervalTicking = !0, n()), this.intervalId
        },
        clearInterval: function (e) {
            for (var t = 0; t < this.intervalQueue.length; t++)
                if (e === this.intervalQueue[t].id) {
                    this.intervalQueue.splice(t, 1);
                    break
                } 0 === this.intervalQueue.length && (cancelAnimationFrame(this.intervalTickId), this.intervalTicking = !1)
        },
        setTimeout: function (e, t) {
            var n = this,
                i = this.setInterval(function () {
                    n.clearInterval(i), e()
                }, t);
            return i
        },
        clearTimeout: function (e) {
            return this.clearInterval(e)
        }
    }), A.fn.extend({
        index: function (e) {
            var t, n = -1;
            return 0 === this.length ? n : (t = x(e) ? this[0] : e instanceof A && 0 < e.length ? e[0] : "string" == typeof e ? A(e)[0] : u, x(t) || t && t.parentNode && A.each(t.parentNode.children, function (e) {
                this === t && (n = e)
            }), n)
        },
        get: function (e) {
            return e === u ? this.items() : e < 0 ? this[e + this.length] : this[e]
        },
        eq: function (e) {
            return !x(e) && 0 < this.length ? A.extend(A(this.get(e)), {
                _prevObj: this
            }) : this
        },
        is: function (t) {
            var n = !1;
            return 0 !== this.length && (t instanceof A ? this.same(t) : (":selected" === t ? this.each(function () {
                this.selected && (n = !0)
            }) : ":checked" === t ? this.each(function () {
                this.checked && (n = !0)
            }) : ":visible" === t ? this.each(function () {
                c(this) && (n = !0)
            }) : ":hidden" === t ? this.each(function () {
                var e = getComputedStyle(this);
                "hidden" !== this.getAttribute("type") && !this.hidden && "none" !== e.display && "hidden" !== e.visibility && 0 !== parseInt(e.opacity) || (n = !0)
            }) : "string" == typeof t && -1 === [":selected"].indexOf(t) ? this.each(function () {
                I.call(this, t) && (n = !0)
            }) : d(t) ? this.each(function () {
                var e = this;
                A.each(t, function () {
                    e === this && (n = !0)
                })
            }) : "object" == typeof t && 1 === t.nodeType && this.each(function () {
                this === t && (n = !0)
            }), n))
        },
        same: function (e) {
            var t = !0;
            return e instanceof A || (e = A(e)), this.length === e.length && (this.each(function () {
                -1 === e.items().indexOf(this) && (t = !1)
            }), t)
        },
        last: function () {
            return this.eq(this.length - 1)
        },
        first: function () {
            return this.eq(0)
        },
        odd: function () {
            var e = this.filter(function (e, t) {
                return t % 2 == 0
            });
            return A.extend(e, {
                _prevObj: this
            })
        },
        even: function () {
            var e = this.filter(function (e, t) {
                return t % 2 != 0
            });
            return A.extend(e, {
                _prevObj: this
            })
        },
        filter: function (e) {
            var t;
            return "string" == typeof e && (t = e, e = function (e) {
                return I.call(e, t)
            }), A.extend(A.merge(A(), [].filter.call(this, e)), {
                _prevObj: this
            })
        },
        find: function (e) {
            var t, n = [];
            return e instanceof A ? e : (t = 0 === this.length ? this : (this.each(function () {
                void 0 !== this.querySelectorAll && (n = n.concat([].slice.call(this.querySelectorAll(e))))
            }), A.merge(A(), n)), A.extend(t, {
                _prevObj: this
            }))
        },
        contains: function (e) {
            return 0 < this.find(e).length
        },
        children: function (t) {
            var e, n = [];
            return t instanceof A ? t : (this.each(function () {
                for (e = 0; e < this.children.length; e++) 1 === this.children[e].nodeType && n.push(this.children[e])
            }), n = t ? n.filter(function (e) {
                return I.call(e, t)
            }) : n, A.extend(A.merge(A(), n), {
                _prevObj: this
            }))
        },
        parent: function (t) {
            var e = [];
            if (0 !== this.length) return t instanceof A ? t : (this.each(function () {
                this.parentNode && -1 === e.indexOf(this.parentNode) && e.push(this.parentNode)
            }), e = t ? e.filter(function (e) {
                return I.call(e, t)
            }) : e, A.extend(A.merge(A(), e), {
                _prevObj: this
            }))
        },
        parents: function (t) {
            var n = [];
            if (0 !== this.length) return t instanceof A ? t : (this.each(function () {
                for (var e = this.parentNode; e;) 1 === e.nodeType && -1 === n.indexOf(e) && (x(t) || I.call(e, t)) && n.push(e), e = e.parentNode
            }), A.extend(A.merge(A(), n), {
                _prevObj: this
            }))
        },
        siblings: function (t) {
            var n = [];
            if (0 !== this.length) return t instanceof A ? t : (this.each(function () {
                var e = this;
                e.parentNode && A.each(e.parentNode.children, function () {
                    e !== this && n.push(this)
                })
            }), t && (n = n.filter(function (e) {
                return I.call(e, t)
            })), A.extend(A.merge(A(), n), {
                _prevObj: this
            }))
        },
        _siblingAll: function (t, n) {
            var i = [];
            if (0 !== this.length) return n instanceof A ? n : (this.each(function () {
                for (var e = this; e = e && e[t];) i.push(e)
            }), n && (i = i.filter(function (e) {
                return I.call(e, n)
            })), A.extend(A.merge(A(), i), {
                _prevObj: this
            }))
        },
        _sibling: function (t, n) {
            var i = [];
            if (0 !== this.length) return n instanceof A ? n : (this.each(function () {
                var e = this[t];
                e && 1 === e.nodeType && i.push(e)
            }), n && (i = i.filter(function (e) {
                return I.call(e, n)
            })), A.extend(A.merge(A(), i), {
                _prevObj: this
            }))
        },
        prev: function (e) {
            return this._sibling("previousElementSibling", e)
        },
        next: function (e) {
            return this._sibling("nextElementSibling", e)
        },
        prevAll: function (e) {
            return this._siblingAll("previousElementSibling", e)
        },
        nextAll: function (e) {
            return this._siblingAll("nextElementSibling", e)
        },
        closest: function (t) {
            var n = [];
            if (0 !== this.length) return t instanceof A ? t : t ? (this.each(function () {
                for (var e = this; e && e;) {
                    if (I.call(e, t)) return void n.push(e);
                    e = e.parentElement
                }
            }), A.extend(A.merge(A(), n.reverse()), {
                _prevObj: this
            })) : this.parent(t)
        },
        has: function (e) {
            var t = [];
            if (0 !== this.length) return this.each(function () {
                0 < A(this).children(e).length && t.push(this)
            }), A.extend(A.merge(A(), t), {
                _prevObj: this
            })
        },
        back: function (e) {
            var t;
            if (!0 === e)
                for (t = this._prevObj; t && t._prevObj;) t = t._prevObj;
            else t = this._prevObj || this;
            return t
        }
    }), A.extend({
        script: function (e) {
            if (x(e)) return D();
            e = A(e)[0];
            e.tagName && "SCRIPT" === e.tagName ? D(e) : A.each(A(e).find("script"), function () {
                D(this)
            })
        }
    }), A.fn.extend({
        script: function () {
            return this.each(function () {
                A.script(this)
            })
        }
    }), A.fn.extend({
        _prop: function (e, t) {
            return 1 === arguments.length ? 0 === this.length ? u : this[0][e] : (x(t) && (t = ""), this.each(function () {
                this[e] = t, "innerHTML" === e && A.script(this)
            }))
        },
        prop: function (e, t) {
            return 1 === arguments.length ? this._prop(e) : this._prop(e, void 0 === t ? "" : t)
        },
        val: function (t) {
            return x(t) ? 0 === this.length ? u : this[0].value : this.each(function () {
                var e = A(this);
                void 0 !== this.value ? this.value = t : e.html(t)
            })
        },
        html: function (e) {
            var t = [];
            return 0 === arguments.length ? this._prop("innerHTML") : (e instanceof A ? e.each(function () {
                t.push(A(this).outerHTML())
            }) : t.push(e), this._prop("innerHTML", 1 === t.length && x(t[0]) ? "" : t.join("\n")), this)
        },
        outerHTML: function () {
            return this._prop("outerHTML")
        },
        text: function (e) {
            return 0 === arguments.length ? this._prop("textContent") : this._prop("textContent", void 0 === e ? "" : e)
        },
        innerText: function (e) {
            return 0 === arguments.length ? this._prop("innerText") : this._prop("innerText", void 0 === e ? "" : e)
        },
        empty: function () {
            return this.each(function () {
                void 0 !== this.innerHTML && (this.innerHTML = "")
            })
        },
        clear: function () {
            return this.empty()
        }
    }), A.each = function (e, n) {
        var t = 0;
        if (d(e))[].forEach.call(e, function (e, t) {
            n.apply(e, [t, e])
        });
        else
            for (var i in e) S(e, i) && n.apply(e[i], [i, e[i], t++]);
        return e
    }, A.fn.extend({
        each: function (e) {
            return A.each(this, e)
        }
    });
    var O = function (e) {
        this.expando = "DATASET:UID:" + e.toUpperCase(), O.uid++
    };
    O.uid = -1, O.prototype = {
        cache: function (e) {
            var t = e[this.expando];
            return t || (t = {}, f(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function (e, t, n) {
            var i, s = this.cache(e);
            if ("string" == typeof t) s[C(t)] = n;
            else
                for (i in t) S(t, i) && (s[C(i)] = t[i]);
            return s
        },
        get: function (e, t) {
            return t === u ? this.cache(e) : e[this.expando] && e[this.expando][C(t)]
        },
        access: function (e, t, n) {
            return t === u || t && "string" == typeof t && n === u ? this.get(e, t) : (this.set(e, t, n), n !== u ? n : t)
        },
        remove: function (e, t) {
            var n, i = e[this.expando];
            if (i !== u) {
                if (t !== u) {
                    n = (t = Array.isArray(t) ? t.map(C) : (t = C(t)) in i ? [t] : t.match(/[^\x20\t\r\n\f]+/g) || []).length;
                    for (; n--;) delete i[t[n]]
                }
                return t !== u && !w(i) || (e.nodeType ? e[this.expando] = u : delete e[this.expando]), !0
            }
        },
        hasData: function (e) {
            e = e[this.expando];
            return e !== u && !w(e)
        }
    };
    var P = new O("m4q");
    A.extend({
        hasData: function (e) {
            return P.hasData(e)
        },
        data: function (e, t, n) {
            return P.access(e, t, n)
        },
        removeData: function (e, t) {
            return P.remove(e, t)
        },
        dataSet: function (e) {
            if (x(e)) return P;
            if (-1 < ["INTERNAL", "M4Q"].indexOf(e.toUpperCase())) throw Error("You can not use reserved name for your dataset");
            return new O(e)
        }
    }), A.fn.extend({
        data: function (e, t) {
            var n, i, s, a, o, r;
            if (0 !== this.length) {
                if (i = this[0], 0 !== arguments.length) return 1 === arguments.length ? ((n = P.get(i, e)) === u && 1 === i.nodeType && i.hasAttribute("data-" + e) && (n = i.getAttribute("data-" + e)), n) : this.each(function () {
                    P.set(this, e, t)
                });
                if (this.length && (s = P.get(i), 1 === i.nodeType))
                    for (r = (a = i.attributes).length; r--;) a[r] && 0 === (o = a[r].name).indexOf("data-") && m(i, o = C(o.slice(5)), s[o]);
                return s
            }
        },
        removeData: function (e) {
            return this.each(function () {
                P.remove(this, e)
            })
        },
        origin: function (e, t, n) {
            if (0 === this.length) return this;
            if (x(e) && x(t)) return A.data(this[0]);
            if (x(t)) {
                var i = A.data(this[0], "origin-" + e);
                return x(i) ? n : i
            }
            return this.data("origin-" + e, t), this
        }
    }), A.extend({
        device: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
        localhost: _(),
        isLocalhost: _,
        touchable: "ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints,
        dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
        uniqueId: function (e) {
            var n = (new Date).getTime();
            return x(e) && (e = "m4q"), ("" !== e ? e + "-" : "") + "xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t = (n + 16 * Math.random()) % 16 | 0;
                return n = Math.floor(n / 16), ("x" === e ? t : 3 & t | 8).toString(16)
            })
        },
        toArray: function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
            return t
        },
        import: function (e) {
            var t = [];
            return this.each(e, function () {
                t.push(this)
            }), this.merge(A(), t)
        },
        merge: function (e, t) {
            for (var n = +t.length, i = 0, s = e.length; i < n; i++) e[s++] = t[i];
            return e.length = s, e
        },
        type: function (e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)]$/, "$1").toLowerCase()
        },
        sleep: function (e) {
            for (e += (new Date).getTime(); new Date < e;);
        },
        isSelector: function (e) {
            if ("string" != typeof e) return !1;
            try {
                document.querySelector(e)
            } catch (e) {
                return !1
            }
            return !0
        },
        remove: function (e) {
            return A(e).remove()
        },
        camelCase: C,
        dashedName: function (e) {
            return e.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase()
            })
        },
        isPlainObject: b,
        isEmptyObject: w,
        isArrayLike: d,
        acceptData: f,
        not: x,
        parseUnit: g,
        getUnit: y,
        unit: g,
        isVisible: c,
        isHidden: function (e) {
            var t = getComputedStyle(e);
            return !c(e) || 0 == +t.opacity || e.hidden || "hidden" === t.visibility
        },
        matches: function (e, t) {
            return I.call(e, t)
        },
        random: function (e, t) {
            return 1 === arguments.length && d(e) ? e[Math.floor(Math.random() * e.length)] : Math.floor(Math.random() * (t - e + 1) + e)
        },
        strip: function (e, t) {
            return "string" != typeof e ? u : e.replace(t, "")
        },
        normName: v,
        hasProp: S,
        serializeToArray: function (e) {
            var t = A(e)[0];
            if (t && "FORM" === t.nodeName) {
                for (var n, i = [], s = t.elements.length - 1; 0 <= s; --s)
                    if ("" !== t.elements[s].name) switch (t.elements[s].nodeName) {
                        case "INPUT":
                            switch (t.elements[s].type) {
                                case "checkbox":
                                case "radio":
                                    t.elements[s].checked && i.push(t.elements[s].name + "=" + encodeURIComponent(t.elements[s].value));
                                    break;
                                case "file":
                                    break;
                                default:
                                    i.push(t.elements[s].name + "=" + encodeURIComponent(t.elements[s].value))
                            }
                            break;
                        case "TEXTAREA":
                            i.push(t.elements[s].name + "=" + encodeURIComponent(t.elements[s].value));
                            break;
                        case "SELECT":
                            switch (t.elements[s].type) {
                                case "select-one":
                                    i.push(t.elements[s].name + "=" + encodeURIComponent(t.elements[s].value));
                                    break;
                                case "select-multiple":
                                    for (n = t.elements[s].options.length - 1; 0 <= n; --n) t.elements[s].options[n].selected && i.push(t.elements[s].name + "=" + encodeURIComponent(t.elements[s].options[n].value))
                            }
                            break;
                        case "BUTTON":
                            switch (t.elements[s].type) {
                                case "reset":
                                case "submit":
                                case "button":
                                    i.push(t.elements[s].name + "=" + encodeURIComponent(t.elements[s].value))
                            }
                    }
                return i
            }
            console.warn("Element is not a HTMLFromElement")
        },
        serialize: function (e) {
            return A.serializeToArray(e).join("&")
        }
    }), A.fn.extend({
        items: function () {
            return A.toArray(this)
        }
    });
    var L = Event.prototype.stopPropagation,
        N = Event.prototype.preventDefault;
    Event.prototype.stopPropagation = function () {
        this.isPropagationStopped = !0, L.apply(this, arguments)
    }, Event.prototype.preventDefault = function () {
        this.isPreventedDefault = !0, N.apply(this, arguments)
    }, Event.prototype.stop = function (e) {
        return e ? this.stopImmediatePropagation() : this.stopPropagation()
    }, A.extend({
        events: [],
        eventHooks: {},
        eventUID: -1,
        setEventHandler: function (e) {
            var t, n = -1;
            if (0 < this.events.length)
                for (t = 0; t < this.events.length; t++)
                    if (null === this.events[t].handler) {
                        n = t;
                        break
                    } return e = {
                element: e.el,
                event: e.event,
                handler: e.handler,
                selector: e.selector,
                ns: e.ns,
                id: e.id,
                options: e.options
            }, -1 === n ? (this.events.push(e), this.events.length - 1) : (this.events[n] = e, n)
        },
        getEventHandler: function (e) {
            return this.events[e] !== u && null !== this.events[e] ? (this.events[e] = null, this.events[e].handler) : u
        },
        off: function () {
            return A.each(this.events, function () {
                this.element.removeEventListener(this.event, this.handler, !0)
            }), this.events = [], this
        },
        getEvents: function () {
            return this.events
        },
        getEventHooks: function () {
            return this.eventHooks
        },
        addEventHook: function (e, t, n) {
            return x(n) && (n = "before"), A.each(h(e), function () {
                this.eventHooks[C(n + "-" + this)] = t
            }), this
        },
        removeEventHook: function (e, t) {
            return x(t) && (t = "before"), A.each(h(e), function () {
                delete this.eventHooks[C(t + "-" + this)]
            }), this
        },
        removeEventHooks: function (e) {
            var t = this;
            return x(e) ? this.eventHooks = {} : A.each(h(e), function () {
                delete t.eventHooks[C("before-" + this)], delete t.eventHooks[C("after-" + this)]
            }), this
        }
    }), A.fn.extend({
        on: function (e, l, c, d) {
            if (0 !== this.length) return "function" == typeof l && (d = c, c = l, l = u), b(d) || (d = {}), this.each(function () {
                var r = this;
                A.each(h(e), function () {
                    var e, s, t = this.split("."),
                        a = v(t[0]),
                        o = d.ns || t[1];
                    A.eventUID++, e = function (e) {
                        var t = e.target,
                            n = A.eventHooks[C("before-" + a)],
                            i = A.eventHooks[C("after-" + a)];
                        if ("function" == typeof n && n.call(t, e), l)
                            for (; t && t !== r;) {
                                if (I.call(t, l) && (c.call(t, e), e.isPropagationStopped)) {
                                    e.stopImmediatePropagation();
                                    break
                                }
                                t = t.parentNode
                            } else c.call(r, e);
                        "function" == typeof i && i.call(t, e), d.once && (s = +A(r).origin("event-" + e.type + (l ? ":" + l : "") + (o ? ":" + o : "")), isNaN(s) || A.events.splice(s, 1))
                    }, Object.defineProperty(e, "name", {
                        value: c.name && "" !== c.name ? c.name : "func_event_" + a + "_" + A.eventUID
                    }), t = a + (l ? ":" + l : "") + (o ? ":" + o : ""), r.addEventListener(a, e, !w(d) && d), s = A.setEventHandler({
                        el: r,
                        event: a,
                        handler: e,
                        selector: l,
                        ns: o,
                        id: A.eventUID,
                        options: !w(d) && d
                    }), A(r).origin("event-" + t, s)
                })
            })
        },
        one: function (e, t, n, i) {
            return b(i) || (i = {}), i.once = !0, this.on.apply(this, [e, t, n, i])
        },
        off: function (e, s, a) {
            return b(s) && (a = s, s = null), b(a) || (a = {}), x(e) || "all" === e.toLowerCase() ? this.each(function () {
                var t = this;
                A.each(A.events, function () {
                    var e = this;
                    e.element === t && (t.removeEventListener(e.event, e.handler, e.options), e.handler = null, A(t).origin("event-" + name + (e.selector ? ":" + e.selector : "") + (e.ns ? ":" + e.ns : ""), null))
                })
            }) : this.each(function () {
                var i = this;
                A.each(h(e), function () {
                    var e = this.split("."),
                        t = v(e[0]),
                        n = a.ns || e[1],
                        e = "event-" + t + (s ? ":" + s : "") + (n ? ":" + n : ""),
                        n = A(i).origin(e);
                    n !== u && A.events[n].handler && (i.removeEventListener(t, A.events[n].handler, A.events[n].options), A.events[n].handler = null), A(i).origin(e, null)
                })
            })
        },
        trigger: function (e, t) {
            return this.fire(e, t)
        },
        fire: function (e, t) {
            var n;
            if (0 !== this.length) return e = v(e), -1 < ["focus", "blur"].indexOf(e) ? (this[0][e](), this) : ("undefined" != typeof CustomEvent ? n = new CustomEvent(e, {
                bubbles: !0,
                cancelable: !0,
                detail: t
            }) : ((n = document.createEvent("Events")).detail = t, n.initEvent(e, !0, !0)), this.each(function () {
                this.dispatchEvent(n)
            }))
        }
    }), "blur focus resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu touchstart touchend touchmove touchcancel".split(" ").forEach(function (i) {
        A.fn[i] = function (e, t, n) {
            return 0 < arguments.length ? this.on(i, e, t, n) : this.fire(i)
        }
    }), A.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), A.ready = function (e, t) {
        document.addEventListener("DOMContentLoaded", e, t || !1)
    }, A.load = function (e) {
        return A(window).on("load", e)
    }, A.unload = function (e) {
        return A(window).on("unload", e)
    }, A.fn.extend({
        unload: function (e) {
            return 0 === this.length || this[0].self !== window ? u : A.unload(e)
        }
    }), A.beforeunload = function (t) {
        return "string" == typeof t ? A(window).on("beforeunload", function (e) {
            return e.returnValue = t
        }) : A(window).on("beforeunload", t)
    }, A.fn.extend({
        beforeunload: function (e) {
            return 0 === this.length || this[0].self !== window ? u : A.beforeunload(e)
        }
    }), A.fn.extend({
        ready: function (e) {
            if (this.length && this[0] === document && "function" == typeof e) return A.ready(e)
        }
    }), A.ajax = function (g) {
        return new Promise(function (n, i) {
            function s(e, t) {
                "function" == typeof e && e.apply(null, t)
            }

            function e(e) {
                return -1 !== ["GET", "JSON"].indexOf(e)
            }
            var t, a, o, r, l = new XMLHttpRequest,
                c = (g.method || "GET").toUpperCase(),
                d = [],
                u = !!x(g.async) || g.async,
                h = g.url,
                p = -1 < h.indexOf("?") ? "&" : "?";
            if (g.data instanceof HTMLFormElement && (t = g.data.getAttribute("action"), a = g.data.getAttribute("method"), x(h) && t && "" !== t.trim() && (h = t), a && "" !== a.trim() && (c = a.toUpperCase())), g.timeout && (l.timeout = g.timeout), g.withCredentials && (l.withCredentials = g.withCredentials), g.data instanceof HTMLFormElement) m = A.serialize(g.data);
            else if (g.data instanceof HTMLElement && g.data.getAttribute("type") && "file" === g.data.getAttribute("type").toLowerCase())
                for (var f = g.data.getAttribute("name"), m = new FormData, v = 0; v < g.data.files.length; v++) m.append(f, g.data.files[v]);
            else b(g.data) ? (o = g.data, r = [], A.each(o, function (e, t) {
                var n, t = "string" == typeof (n = t) || "boolean" == typeof n || "number" == typeof n ? t : JSON.stringify(t);
                r.push(e + "=" + t)
            }), m = r.join("&")) : g.data instanceof FormData || "string" == typeof g.data ? m = g.data : (m = new FormData).append("_data", JSON.stringify(g.data));
            e(c) && (h += "string" == typeof m ? p + m : w(m) ? "" : p + JSON.stringify(m)), l.open(c, h, u, g.user, g.password), g.headers && A.each(g.headers, function (e, t) {
                l.setRequestHeader(e, t), d.push(e)
            }), e(c) || -1 === d.indexOf("Content-type") && !1 !== g.contentType && l.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), l.send(m), l.addEventListener("load", function (e) {
                if (4 === l.readyState && l.status < 300) {
                    var t = g.returnValue && "xhr" === g.returnValue ? l : l.response;
                    if (g.parseJson) try {
                        t = JSON.parse(t)
                    } catch (e) {
                        t = {}
                    }
                    s(n, [t]), s(g.onSuccess, [e, l])
                } else s(i, [l]), s(g.onFail, [e, l]);
                s(g.onLoad, [e, l])
            }), A.each(["readystatechange", "error", "timeout", "progress", "loadstart", "loadend", "abort"], function () {
                var t = C("on-" + ("readystatechange" === this ? "state" : this));
                l.addEventListener(t, function (e) {
                    s(g[t], [e, l])
                })
            })
        })
    }, ["get", "post", "put", "patch", "delete", "json"].forEach(function (s) {
        A[s] = function (e, t, n) {
            var i = s.toUpperCase(),
                i = {
                    method: "JSON" === i ? "GET" : i,
                    url: e,
                    data: t,
                    parseJson: "JSON" === i
                };
            return A.ajax(A.extend({}, i, n))
        }
    }), A.fn.extend({
        load: function (e, t, n) {
            var i = this;
            return this.length && this[0].self === window ? A.load(e) : A.get(e, t, n).then(function (e) {
                i.each(function () {
                    this.innerHTML = e
                })
            })
        }
    }), A.fn.extend({
        style: function (e, t) {
            var n;

            function i(e, t, n) {
                return -1 < ["scrollLeft", "scrollTop"].indexOf(t) ? A(e)[t]() : getComputedStyle(e, n)[t]
            }
            if ("string" == typeof e && 0 === this.length) return u;
            if (0 === this.length) return this;
            if (n = this[0], x(e) || "all" === e) return getComputedStyle(n, t);
            var s = {},
                e = e.split(", ").map(function (e) {
                    return ("" + e).trim()
                });
            return 1 === e.length ? i(n, e[0], t) : (A.each(e, function () {
                s[this] = i(n, this, t)
            }), s)
        },
        removeStyleProperty: function (e) {
            if (x(e) || 0 === this.length) return this;
            var t = e.split(", ").map(function (e) {
                return ("" + e).trim()
            });
            return this.each(function () {
                var e = this;
                A.each(t, function () {
                    e.style.removeProperty(this)
                })
            })
        },
        css: function (e, t) {
            return "string" == typeof (e = e || "all") && x(t) ? this.style(e) : this.each(function () {
                var n = this;
                "object" == typeof e ? A.each(e, function (e, t) {
                    p(n, e, t)
                }) : "string" == typeof e && p(n, e, t)
            })
        },
        scrollTop: function (e) {
            return x(e) ? 0 === this.length ? u : this[0] === window ? pageYOffset : this[0].scrollTop : this.each(function () {
                this.scrollTop = e
            })
        },
        scrollLeft: function (e) {
            return x(e) ? 0 === this.length ? u : this[0] === window ? pageXOffset : this[0].scrollLeft : this.each(function () {
                this.scrollLeft = e
            })
        }
    }), A.fn.extend({
        addClass: function () {},
        removeClass: function () {},
        toggleClass: function () {},
        containsClass: function (e) {
            return this.hasClass(e)
        },
        hasClass: function (e) {
            var t = !1,
                n = e.split(" ").filter(function (e) {
                    return "" !== ("" + e).trim()
                });
            return !x(e) && (this.each(function () {
                var e = this;
                A.each(n, function () {
                    !t && e.classList && e.classList.contains(this) && (t = !0)
                })
            }), t)
        },
        clearClasses: function () {
            return this.each(function () {
                this.className = ""
            })
        },
        cls: function (e) {
            return 0 === this.length ? u : e ? this[0].className.split(" ") : this[0].className
        },
        removeClassBy: function (n) {
            return this.each(function () {
                var e = A(this),
                    t = e.cls(!0);
                A.each(t, function () {
                    -1 < this.indexOf(n) && e.removeClass(this)
                })
            })
        }
    }), ["add", "remove", "toggle"].forEach(function (i) {
        A.fn[i + "Class"] = function (n) {
            return x(n) || "" === ("" + n).trim() ? this : this.each(function () {
                var e = this,
                    t = void 0 !== e.classList;
                A.each(n.split(" ").filter(function (e) {
                    return "" !== ("" + e).trim()
                }), function () {
                    t && e.classList[i](this)
                })
            })
        }
    }), A.parseHTML = function (e) {
        var t, n, i, s = [];
        if ("string" != typeof e) return [];
        if (e = e.trim(), (t = (n = document.implementation.createHTMLDocument("")).createElement("base")).href = document.location.href, n.head.appendChild(t), i = n.body, n = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i.exec(e)) s.push(document.createElement(n[1]));
        else {
            i.innerHTML = e;
            for (var a = 0; a < i.childNodes.length; a++) s.push(i.childNodes[a])
        }
        return s
    }, A.fn.extend({
        _size: function (e, t) {
            if (0 !== this.length) {
                if (x(t)) {
                    var n = this[0];
                    if ("height" === e) return n === window ? window.innerHeight : n === document ? n.body.clientHeight : parseInt(getComputedStyle(n).height);
                    if ("width" === e) return n === window ? window.innerWidth : n === document ? n.body.clientWidth : parseInt(getComputedStyle(n).width)
                }
                return this.each(function () {
                    this !== window && this !== document && (this.style[e] = isNaN(t) ? t : t + "px")
                })
            }
        },
        height: function (e) {
            return this._size("height", e)
        },
        width: function (e) {
            return this._size("width", e)
        },
        _sizeOut: function (n, i) {
            var e, t;
            if (0 !== this.length) return x(i) || "boolean" == typeof i ? (e = (t = this[0])["width" === n ? "offsetWidth" : "offsetHeight"], t = getComputedStyle(t), t = e + parseInt(t["width" === n ? "margin-left" : "margin-top"]) + parseInt(t["width" === n ? "margin-right" : "margin-bottom"]), !0 === i ? t : e) : this.each(function () {
                var e, t;
                this !== window && this !== document && (t = getComputedStyle(this), e = "width" === n ? parseInt(t["border-left-width"]) + parseInt(t["border-right-width"]) : parseInt(t["border-top-width"]) + parseInt(t["border-bottom-width"]), t = "width" === n ? parseInt(t["padding-left"]) + parseInt(t["padding-right"]) : parseInt(t["padding-top"]) + parseInt(t["padding-bottom"]), t = A(this)[n](i)[n]() - e - t, this.style[n] = t + "px")
            })
        },
        outerWidth: function (e) {
            return this._sizeOut("width", e)
        },
        outerHeight: function (e) {
            return this._sizeOut("height", e)
        },
        padding: function (e) {
            if (0 !== this.length) {
                e = getComputedStyle(this[0], e);
                return {
                    top: parseInt(e["padding-top"]),
                    right: parseInt(e["padding-right"]),
                    bottom: parseInt(e["padding-bottom"]),
                    left: parseInt(e["padding-left"])
                }
            }
        },
        margin: function (e) {
            if (0 !== this.length) {
                e = getComputedStyle(this[0], e);
                return {
                    top: parseInt(e["margin-top"]),
                    right: parseInt(e["margin-right"]),
                    bottom: parseInt(e["margin-bottom"]),
                    left: parseInt(e["margin-left"])
                }
            }
        },
        border: function (e) {
            if (0 !== this.length) {
                e = getComputedStyle(this[0], e);
                return {
                    top: parseInt(e["border-top-width"]),
                    right: parseInt(e["border-right-width"]),
                    bottom: parseInt(e["border-bottom-width"]),
                    left: parseInt(e["border-left-width"])
                }
            }
        }
    }), A.fn.extend({
        offset: function (a) {
            var e;
            return x(a) ? 0 === this.length ? u : {
                top: (e = this[0].getBoundingClientRect()).top + pageYOffset,
                left: e.left + pageXOffset
            } : this.each(function () {
                var e = A(this),
                    t = a.top,
                    n = a.left,
                    i = getComputedStyle(this).position,
                    s = e.offset();
                "static" === i && e.css("position", "relative"), -1 === ["absolute", "fixed"].indexOf(i) && (t -= s.top, n -= s.left), e.css({
                    top: t,
                    left: n
                })
            })
        },
        position: function (e) {
            var t, n, i = 0,
                s = 0;
            return !x(e) && "boolean" == typeof e || (e = !1), 0 === this.length ? u : (t = this[0], n = getComputedStyle(t), e && (i = parseInt(n["margin-left"]), s = parseInt(n["margin-top"])), {
                left: t.offsetLeft - i,
                top: t.offsetTop - s
            })
        },
        left: function (e, t) {
            if (0 !== this.length) return x(e) ? this.position(t).left : "boolean" == typeof e ? (t = e, this.position(t).left) : this.each(function () {
                A(this).css({
                    left: e
                })
            })
        },
        top: function (e, t) {
            if (0 !== this.length) return x(e) ? this.position(t).top : "boolean" == typeof e ? (t = e, this.position(t).top) : this.each(function () {
                A(this).css({
                    top: e
                })
            })
        },
        coord: function () {
            return 0 === this.length ? u : this[0].getBoundingClientRect()
        },
        pos: function () {
            if (0 !== this.length) return {
                top: parseInt(A(this[0]).style("top")),
                left: parseInt(A(this[0]).style("left"))
            }
        }
    }), A.fn.extend({
        attr: function (e, t) {
            var n = {};
            return 0 === this.length && 0 === arguments.length ? u : this.length && 0 === arguments.length ? (A.each(this[0].attributes, function () {
                n[this.nodeName] = this.nodeValue
            }), n) : 1 === arguments.length && "string" == typeof e ? this.length && 1 === this[0].nodeType && this[0].hasAttribute(e) ? this[0].getAttribute(e) : u : this.each(function () {
                var n = this;
                b(e) ? A.each(e, function (e, t) {
                    n.setAttribute(e, t)
                }) : n.setAttribute(e, t)
            })
        },
        removeAttr: function (e) {
            var t;
            return x(e) ? this.each(function () {
                var e = this;
                A.each(this.attributes, function () {
                    e.removeAttribute(this)
                })
            }) : (t = "string" == typeof e ? e.split(",").map(function (e) {
                return e.trim()
            }) : e, this.each(function () {
                var e = this;
                A.each(t, function () {
                    e.hasAttribute(this) && e.removeAttribute(this)
                })
            }))
        },
        toggleAttr: function (e, t) {
            return this.each(function () {
                x(t) ? this.removeAttribute(e) : this.setAttribute(e, t)
            })
        },
        id: function (e) {
            return this.length ? A(this[0]).attr("id", e) : u
        }
    }), A.extend({
        meta: function (e) {
            return x(e) ? A("meta") : A("meta[name='$name']".replace("$name", e))
        },
        metaBy: function (e) {
            return x(e) ? A("meta") : A("meta[$name]".replace("$name", e))
        },
        doctype: function () {
            return A("doctype")
        },
        html: function () {
            return A("html")
        },
        head: function () {
            return A("html").find("head")
        },
        body: function () {
            return A("body")
        },
        document: function () {
            return A(document)
        },
        window: function () {
            return A(window)
        },
        charset: function (e) {
            var t = A("meta[charset]");
            return e && t.attr("charset", e), t.attr("charset")
        }
    }), A.extend({
        proxy: function (e, t) {
            return "function" != typeof e ? u : e.bind(t)
        },
        bind: function (e, t) {
            return this.proxy(e, t)
        }
    }), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (e) {
        ["append", "prepend"].forEach(function (t) {
            S(e, t) || Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function () {
                    var e = Array.prototype.slice.call(arguments),
                        n = document.createDocumentFragment();
                    e.forEach(function (e) {
                        var t = e instanceof Node;
                        n.appendChild(t ? e : document.createTextNode(String(e)))
                    }), "prepend" === t ? this.insertBefore(n, this.firstChild) : this.appendChild(n)
                }
            })
        })
    });

    function B(e) {
        var t;
        return "string" == typeof e ? t = A.isSelector(e) ? A(e) : A.parseHTML(e) : e instanceof HTMLElement ? t = [e] : d(e) && (t = e), t
    }
    A.fn.extend({
        appendText: function (n) {
            return this.each(function (e, t) {
                t.innerHTML += n
            })
        },
        prependText: function (n) {
            return this.each(function (e, t) {
                t.innerHTML = n + t.innerHTML
            })
        },
        append: function (e) {
            var i = B(e);
            return this.each(function (t, n) {
                A.each(i, function () {
                    var e;
                    n !== this && (e = 0 === t ? this : this.cloneNode(!0), A.script(e), e.tagName && "SCRIPT" !== e.tagName && n.append(e))
                })
            })
        },
        appendTo: function (e) {
            var t = B(e);
            return this.each(function () {
                var n = this;
                A.each(t, function (e, t) {
                    n !== this && t.append(0 === e ? n : n.cloneNode(!0))
                })
            })
        },
        prepend: function (e) {
            var i = B(e);
            return this.each(function (t, n) {
                A.each(i, function () {
                    var e;
                    n !== this && (e = 0 === t ? this : this.cloneNode(!0), A.script(e), e.tagName && "SCRIPT" !== e.tagName && n.prepend(e))
                })
            })
        },
        prependTo: function (e) {
            var t = B(e);
            return this.each(function () {
                var n = this;
                A.each(t, function (e, t) {
                    n !== this && A(t).prepend(0 === e ? n : n.cloneNode(!0))
                })
            })
        },
        insertBefore: function (e) {
            var t = B(e);
            return this.each(function () {
                var n = this;
                A.each(t, function (e) {
                    var t;
                    n === this || (t = this.parentNode) && t.insertBefore(0 === e ? n : n.cloneNode(!0), this)
                })
            })
        },
        insertAfter: function (e) {
            var t = B(e);
            return this.each(function () {
                var i = this;
                A.each(t, function (e, t) {
                    var n;
                    i === this || (n = this.parentNode) && n.insertBefore(0 === e ? i : i.cloneNode(!0), t.nextSibling)
                })
            })
        },
        after: function (e) {
            return this.each(function () {
                "string" == typeof e ? this.insertAdjacentHTML("afterend", e) : A(e).insertAfter(this)
            })
        },
        before: function (e) {
            return this.each(function () {
                "string" == typeof e ? this.insertAdjacentHTML("beforebegin", e) : A(e).insertBefore(this)
            })
        },
        clone: function (i, s) {
            var a = [];
            return x(i) && (i = !1), x(s) && (s = !1), this.each(function () {
                var e, t = this.cloneNode(i),
                    n = A(t);
                s && A.hasData(this) && (e = A(this).data(), A.each(e, function (e, t) {
                    n.data(e, t)
                })), a.push(t)
            }), A.merge(A(), a)
        },
        import: function (e) {
            var t = [];
            return x(e) && (e = !1), this.each(function () {
                t.push(document.importNode(this, e))
            }), A.merge(A(), t)
        },
        adopt: function () {
            var e = [];
            return this.each(function () {
                e.push(document.adoptNode(this))
            }), A.merge(A(), e)
        },
        remove: function (t) {
            var e, n, i = 0,
                s = [];
            if (0 !== this.length) {
                for (n = t ? this.filter(function (e) {
                        return I.call(e, t)
                    }) : this.items(); null != (e = n[i]); i++) e.parentNode && (s.push(e.parentNode.removeChild(e)), A.removeData(e));
                return A.merge(A(), s)
            }
        },
        wrap: function (e) {
            if (0 !== this.length) {
                var n = A(B(e));
                if (n.length) {
                    var i = [];
                    return this.each(function () {
                        var e, t = n.clone(!0, !0);
                        for (t.insertBefore(this), e = t; e.children().length;) e = e.children().eq(0);
                        e.append(this), i.push(t)
                    }), A(i)
                }
            }
        },
        wrapAll: function (e) {
            var t, n;
            if (0 !== this.length && (t = A(B(e))).length) {
                for ((t = t.clone(!0, !0)).insertBefore(this[0]), n = t; n.children().length;) n = n.children().eq(0);
                return this.each(function () {
                    n.append(this)
                }), t
            }
        },
        wrapInner: function (e) {
            if (0 !== this.length) {
                var i = A(B(e));
                if (i.length) {
                    var s = [];
                    return this.each(function () {
                        var e = A(this),
                            t = e.html(),
                            n = i.clone(!0, !0);
                        e.html(n.html(t)), s.push(n)
                    }), A(s)
                }
            }
        }
    }), A.extend({
        animation: {
            duration: 1e3,
            ease: "linear",
            elements: {}
        }
    }), "object" == typeof window.setupAnimation && A.each(window.setupAnimation, function (e, t) {
        void 0 === A.animation[e] || x(t) || (A.animation[e] = t)
    });
    var R = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY"],
        H = ["opacity", "zIndex"],
        V = ["opacity", "volume"],
        F = ["scrollLeft", "scrollTop"],
        z = ["opacity", "volume"];

    function U(e) {
        return e instanceof HTMLElement || e instanceof SVGElement
    }

    function j(a, e, o) {
        A.each(e, function (e, t) {
            var n, i, s;
            n = a, i = e, s = t[0] + t[2] * o, e = t[3], x(t = t[4]) && (t = !1), i = C(i), t && (s = parseInt(s)), !U(n) || void 0 !== n[i] ? n[i] = s : n.style[i] = "transform" === i || -1 < i.toLowerCase().indexOf("color") ? s : s + e
        })
    }

    function q(e) {
        if (!U(e)) return {};
        for (var t, n = e.style.transform || "", i = /(\w+)\(([^)]*)\)/g, s = {}; t = i.exec(n);) s[t[1]] = t[2];
        return s
    }

    function W(e) {
        return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e || "#000000").slice(1).map(function (e) {
            return parseInt(e, 16)
        })
    }

    function Y(e) {
        return "#" === e[0] && 4 === e.length ? "#" + e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, i) {
            return t + t + n + n + i + i
        }) : "#" === e[0] ? e : "#" + e
    }

    function G(e, t, n) {
        var i, s, a, o, r, l, c;
        j(e, t.props, n), i = e, s = t.transform, a = n, o = [], r = q(i), A.each(s, function (e, t) {
            var n = t[0],
                i = t[1],
                s = t[2],
                t = t[3];
            (-1 < (e = "" + e).indexOf("rotate") || -1 < e.indexOf("skew")) && "" === t && (t = "deg"), -1 < e.indexOf("scale") && (t = ""), -1 < e.indexOf("translate") && "" === t && (t = "px"), "turn" === t ? o.push(e + "(" + i * a + t + ")") : o.push(e + "(" + (n + s * a) + t + ")")
        }), A.each(r, function (e, t) {
            s[e] === u && o.push(e + "(" + t + ")")
        }), i.style.transform = o.join(" "), l = e, t = t.color, c = n, A.each(t, function (e, t) {
            for (var n, i = [0, 0, 0], s = 0; s < 3; s++) i[s] = Math.floor(t[0][s] + t[2][s] * c);
            n = "rgb(" + i.join(",") + ")", l.style[e] = n
        })
    }

    function K(l, e, c) {
        var d, u, h, p, f, m = {
                props: {},
                transform: {},
                color: {}
            },
            v = q(l);
        return x(c) && (c = "normal"), A.each(e, function (e, t) {
            var n, i, s, a = -1 < R.indexOf("" + e),
                o = -1 < H.indexOf("" + e),
                r = -1 < ("" + e).toLowerCase().indexOf("color");
            if (Array.isArray(t) && 1 === t.length && (t = t[0]), h = Array.isArray(t) ? (u = r ? W(Y(t[0])) : g(t[0]), r ? W(Y(t[1])) : g(t[1])) : (u = a ? v[e] || 0 : r ? (s = e, getComputedStyle(l)[s].replace(/[^\d.,]/g, "").split(",").map(function (e) {
                    return parseInt(e)
                })) : void 0 !== (n = l)[s = e] ? -1 < F.indexOf(s) ? "scrollLeft" === s ? n === window ? pageXOffset : n.scrollLeft : n === window ? pageYOffset : n.scrollTop : n[s] || 0 : n.style[s] || getComputedStyle(n, i)[s], u = r ? u : g(u), r ? W(t) : g(function (e, t) {
                    var n = /^(\*=|\+=|-=)/.exec(e);
                    if (!n) return e;
                    var i = y(e) || 0,
                        s = parseFloat(t),
                        a = parseFloat(e.replace(n[0], ""));
                    switch (n[0][0]) {
                        case "+":
                            return s + a + i;
                        case "-":
                            return s - a + i;
                        case "*":
                            return s * a + i;
                        case "/":
                            return s / a + i
                    }
                }(t, Array.isArray(u) ? u[0] : u))), -1 < z.indexOf("" + e) && u[0] === h[0] && (u[0] = 0 < h[0] ? 0 : 1), "reverse" === c && (f = u, u = h, h = f), f = l instanceof HTMLElement && "" === h[1] && !o && !a ? "px" : h[1], r)
                for (p = [0, 0, 0], d = 0; d < 3; d++) p[d] = h[d] - u[d];
            else p = h[0] - u[0];
            a ? m.transform[e] = [u[0], h[0], p, f] : r ? m.color[e] = [u, h, p, f] : m.props[e] = [u[0], h[0], p, f, -1 === V.indexOf("" + e)]
        }), m
    }

    function J(e, t, n) {
        return Math.min(Math.max(e, t), n)
    }
    var $ = {
        linear: function () {
            return function (e) {
                return e
            }
        }
    };
    $.default = $.linear;
    var X = {
        Sine: function () {
            return function (e) {
                return 1 - Math.cos(e * Math.PI / 2)
            }
        },
        Circ: function () {
            return function (e) {
                return 1 - Math.sqrt(1 - e * e)
            }
        },
        Back: function () {
            return function (e) {
                return e * e * (3 * e - 2)
            }
        },
        Bounce: function () {
            return function (e) {
                for (var t, n = 4; e < ((t = Math.pow(2, --n)) - 1) / 11;);
                return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        },
        Elastic: function (e, t) {
            x(e) && (e = 1), x(t) && (t = .5);
            var n = J(e, 1, 10),
                i = J(t, .1, 2);
            return function (e) {
                return 0 === e || 1 === e ? e : -n * Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1 - i / (2 * Math.PI) * Math.asin(1 / n)) * (2 * Math.PI) / i)
            }
        }
    };
    ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (e, t) {
        X[e] = function () {
            return function (e) {
                return Math.pow(e, t + 2)
            }
        }
    }), Object.keys(X).forEach(function (e) {
        var i = X[e];
        $["easeIn" + e] = i, $["easeOut" + e] = function (t, n) {
            return function (e) {
                return 1 - i(t, n)(1 - e)
            }
        }, $["easeInOut" + e] = function (t, n) {
            return function (e) {
                return e < .5 ? i(t, n)(2 * e) / 2 : 1 - i(t, n)(-2 * e + 2) / 2
            }
        }
    });
    var Q = {
        id: null,
        el: null,
        draw: {},
        dur: A.animation.duration,
        ease: A.animation.ease,
        loop: 0,
        pause: 0,
        dir: "normal",
        defer: 0,
        onStart: function () {},
        onStop: function () {},
        onStopAll: function () {},
        onPause: function () {},
        onPauseAll: function () {},
        onResume: function () {},
        onResumeAll: function () {},
        onFrame: function () {},
        onDone: function () {}
    };

    function Z(T) {
        return new Promise(function (e) {
            var t, n = this,
                i = A.assign({}, Q, {
                    dur: A.animation.duration,
                    ease: A.animation.ease
                }, T),
                s = i.id,
                a = i.el,
                o = i.draw,
                r = i.dur,
                l = i.ease,
                c = i.loop,
                d = i.onStart,
                u = i.onFrame,
                h = i.onDone,
                p = i.pause,
                f = i.dir,
                m = i.defer,
                v = {},
                g = [],
                C = $.linear,
                b = "alternate" === f ? "normal" : f,
                w = !1,
                y = s || +(performance.now() * Math.pow(10, 14));
            if (x(a)) throw new Error("Unknown element!");
            if ("string" == typeof a && (a = document.querySelector(a)), "function" != typeof o && "object" != typeof o) throw new Error("Unknown draw object. Must be a function or object!");
            0 === r && (r = 1), "alternate" === f && "number" == typeof c && (c *= 2), C = "string" == typeof l ? (i = /\(([^)]+)\)/.exec(l), t = l.split("(")[0], g = i ? i[1].split(",").map(function (e) {
                return parseFloat(e)
            }) : [], $[t] || $.linear) : "function" == typeof l ? l : $.linear, A.animation.elements[y] = {
                element: a,
                id: null,
                stop: 0,
                pause: 0,
                loop: 0,
                t: -1,
                started: 0,
                paused: 0
            };

            function S() {
                "object" == typeof o && (v = K(a, o, b)), "function" == typeof d && d.apply(a), A.animation.elements[y].loop += 1, A.animation.elements[y].started = performance.now(), A.animation.elements[y].duration = r, A.animation.elements[y].id = requestAnimationFrame(k)
            }

            function _() {
                cancelAnimationFrame(A.animation.elements[y].id), delete A.animation.elements[s], "function" == typeof h && h.apply(a), e(n)
            }
            var k = function (e) {
                var t = A.animation.elements[y].stop,
                    n = A.animation.elements[y].pause,
                    i = A.animation.elements[y].started;
                if (A.animation.elements[y].paused && (i = e - A.animation.elements[y].t * r, A.animation.elements[y].started = i), 1 < (e = ((e - i) / r).toFixed(4)) && (e = 1), e < 0 && (e = 0), i = C.apply(null, g)(e), A.animation.elements[y].t = e, A.animation.elements[y].p = i, n) A.animation.elements[y].id = requestAnimationFrame(k);
                else {
                    if (0 < t) return 2 === t && ("function" == typeof o ? o.bind(a)(1, 1) : G(a, v, 1)), void _();
                    "function" == typeof o ? o.bind(a)(e, i) : G(a, v, i), "function" == typeof u && u.apply(a, [e, i]), e < 1 && (A.animation.elements[y].id = requestAnimationFrame(k)), 1 === parseInt(e) && (c ? ("alternate" === f && (b = "normal" === b ? "reverse" : "normal"), "boolean" == typeof c || c > A.animation.elements[y].loop ? setTimeout(function () {
                        S()
                    }, p) : _()) : "alternate" !== f || w ? _() : (b = "normal" === b ? "reverse" : "normal", w = !0, S()))
                }
            };
            0 < m ? setTimeout(function () {
                S()
            }, m) : S()
        })
    }

    function ee(e, t) {
        e = A.animation.elements[e];
        void 0 !== e && (x(t) && (t = !0), e.stop = !0 === t ? 2 : 1, "function" == typeof e.onStop && e.onStop.apply(e.element))
    }

    function te(e) {
        e = A.animation.elements[e];
        void 0 !== e && (e.pause = 1, e.paused = performance.now(), "function" == typeof e.onPause && e.onPause.apply(e.element))
    }

    function ne(e) {
        e = A.animation.elements[e];
        void 0 !== e && (e.pause = 0, e.paused = 0, "function" == typeof e.onResume && e.onResume.apply(e.element))
    }
    var ie = {
        loop: !1,
        onChainItem: null,
        onChainItemComplete: null,
        onChainComplete: null
    };
    A.easing = {}, A.extend(A.easing, $), A.extend({
        animate: function (e) {
            var t, n, i, s, a;
            return 1 < arguments.length ? (t = A(e)[0], n = arguments[1], i = arguments[2] || A.animation.duration, s = arguments[3] || A.animation.ease, a = arguments[4], "function" == typeof i && (a = i, s = A.animation.ease, i = A.animation.duration), "function" == typeof s && (a = s, s = A.animation.ease), Z({
                el: t,
                draw: n,
                dur: i,
                ease: s,
                onDone: a
            })) : Z(e)
        },
        chain: function e(t, n) {
            var i = A.extend({}, ie, n);
            if ("boolean" != typeof i.loop && i.loop--, !Array.isArray(t)) return console.warn("Chain array is not defined!"), !1;
            t.reduce(function (e, t) {
                return e.then(function () {
                    return "function" == typeof i.onChainItem && i.onChainItem(t), Z(t).then(function () {
                        "function" == typeof i.onChainItemComplete && i.onChainItemComplete(t)
                    })
                })
            }, Promise.resolve()).then(function () {
                "function" == typeof i.onChainComplete && i.onChainComplete(), i.loop && e(t, i)
            })
        },
        stop: ee,
        stopAll: function (n, i) {
            A.each(A.animation.elements, function (e, t) {
                i ? "string" == typeof i ? I.call(t.element, i) && ee(e, n) : i.length ? A.each(i, function () {
                    t.element === this && ee(e, n)
                }) : i instanceof Element && t.element === i && ee(e, n) : ee(e, n)
            })
        },
        resume: ne,
        resumeAll: function (n) {
            A.each(A.animation.elements, function (e, t) {
                n ? "string" == typeof n ? I.call(t.element, n) && ne(e) : n.length ? A.each(n, function () {
                    t.element === this && ne(e)
                }) : n instanceof Element && t.element === n && ne(e) : ne(e)
            })
        },
        pause: te,
        pauseAll: function (n) {
            A.each(A.animation.elements, function (e, t) {
                n ? "string" == typeof n ? I.call(t.element, n) && te(e) : n.length ? A.each(n, function () {
                    t.element === this && te(e)
                }) : n instanceof Element && t.element === n && te(e) : te(e)
            })
        }
    }), A.fn.extend({
        animate: function (e) {
            var t, n, i, s, a = this,
                o = e;
            return !Array.isArray(e) && (1 < arguments.length || 1 === arguments.length && void 0 === e.draw) ? (t = e, n = arguments[1] || A.animation.duration, i = arguments[2] || A.animation.ease, s = arguments[3], "function" == typeof n && (s = n, n = A.animation.duration, i = A.animation.ease), "function" == typeof i && (s = i, i = A.animation.ease), this.each(function () {
                return A.animate({
                    el: this,
                    draw: t,
                    dur: n,
                    ease: i,
                    onDone: s
                })
            })) : Array.isArray(e) ? (A.each(e, function () {
                var e = this;
                a.each(function () {
                    e.el = this, A.animate(e)
                })
            }), this) : this.each(function () {
                o.el = this, A.animate(o)
            })
        },
        chain: function (t, n) {
            return this.each(function () {
                var e = this;
                A.each(t, function () {
                    this.el = e
                }), A.chain(t, n)
            })
        },
        stop: function (i) {
            return this.each(function () {
                var n = this;
                A.each(A.animation.elements, function (e, t) {
                    t.element === n && ee(e, i)
                })
            })
        },
        pause: function () {
            return this.each(function () {
                var n = this;
                A.each(A.animation.elements, function (e, t) {
                    t.element === n && te(e)
                })
            })
        },
        resume: function () {
            return this.each(function () {
                var n = this;
                A.each(A.animation.elements, function (e, t) {
                    t.element === n && ne(e)
                })
            })
        }
    }), A.extend({
        hidden: function (e, t, n) {
            return e = A(e)[0], "string" == typeof t && (t = "true" === t.toLowerCase()), "function" == typeof t && (n = t, t = !e.hidden), e.hidden = t, "function" == typeof n && (A.bind(n, e), n.call(e, arguments)), this
        },
        hide: function (e, t) {
            return A(e).origin("display", e.style.display || getComputedStyle(e, null).display), e.style.display = "none", "function" == typeof t && (A.bind(t, e), t.call(e, arguments)), this
        },
        show: function (e, t) {
            var n = A(e).origin("display", u, "block");
            return e.style.display = n ? "none" === n ? "block" : n : "", 0 === parseInt(e.style.opacity) && (e.style.opacity = "1"), "function" == typeof t && (A.bind(t, e), t.call(e, arguments)), this
        },
        visible: function (e, t, n) {
            return t === u && (t = !0), e.style.visibility = t ? "visible" : "hidden", "function" == typeof n && (A.bind(n, e), n.call(e, arguments)), this
        },
        toggle: function (e, t) {
            var n = "none" !== getComputedStyle(e, null).display ? "hide" : "show";
            return A[n](e, t)
        }
    }), A.fn.extend({
        hide: function () {
            var e;
            return A.each(arguments, function () {
                "function" == typeof this && (e = this)
            }), this.each(function () {
                A.hide(this, e)
            })
        },
        show: function () {
            var e;
            return A.each(arguments, function () {
                "function" == typeof this && (e = this)
            }), this.each(function () {
                A.show(this, e)
            })
        },
        visible: function (e, t) {
            return this.each(function () {
                A.visible(this, e, t)
            })
        },
        toggle: function (e) {
            return this.each(function () {
                A.toggle(this, e)
            })
        },
        hidden: function (e, t) {
            return this.each(function () {
                A.hidden(this, e, t)
            })
        }
    }), A.extend({
        fx: {
            off: !1
        }
    }), A.fn.extend({
        fadeIn: function (n, i, s) {
            return this.each(function () {
                var e = this,
                    t = A(e);
                if (!(!c(e) || c(e) && 0 == +t.style("opacity"))) return this;
                x(n) && x(i) && x(s) ? (s = null, n = A.animation.duration) : "function" == typeof n && (s = n, n = A.animation.duration), "function" == typeof i && (s = i, i = A.animation.ease), A.fx.off && (n = 0);
                t = t.origin("display", u, "block");
                return e.style.opacity = "0", e.style.display = t, A.animate({
                    el: e,
                    draw: {
                        opacity: 1
                    },
                    dur: n,
                    ease: i,
                    onDone: function () {
                        "function" == typeof s && A.proxy(s, this)()
                    }
                })
            })
        },
        fadeOut: function (t, n, i) {
            return this.each(function () {
                var e = A(this);
                if (c(this)) return x(t) && x(n) && x(i) ? (i = null, t = A.animation.duration) : "function" == typeof t && (i = t, t = A.animation.duration), "function" == typeof n && (i = n, n = A.animation.ease), e.origin("display", e.style("display")), A.animate({
                    el: this,
                    draw: {
                        opacity: 0
                    },
                    dur: t,
                    ease: n,
                    onDone: function () {
                        this.style.display = "none", "function" == typeof i && A.proxy(i, this)()
                    }
                })
            })
        },
        slideUp: function (n, i, s) {
            return this.each(function () {
                var e, t = A(this);
                if (0 !== t.height()) return x(n) && x(i) && x(s) ? (s = null, n = A.animation.duration) : "function" == typeof n && (s = n, n = A.animation.duration), "function" == typeof i && (s = i, i = A.animation.ease), e = t.height(), t.origin("height", e), t.origin("display", A(this).style("display")), t.css({
                    overflow: "hidden"
                }), A.animate({
                    el: this,
                    draw: {
                        height: 0
                    },
                    dur: n,
                    ease: i,
                    onDone: function () {
                        t.hide().removeStyleProperty("overflow, height"), "function" == typeof s && A.proxy(s, this)()
                    }
                })
            })
        },
        slideDown: function (s, a, o) {
            return this.each(function () {
                var e, t, n = this,
                    i = A(n);
                return x(s) && x(a) && x(o) ? (o = null, s = A.animation.duration) : "function" == typeof s && (o = s, s = A.animation.duration), "function" == typeof a && (o = a, a = A.animation.ease), i.show().visible(!1), e = +i.origin("height", u, i.height()), 0 === parseInt(e) && (e = n.scrollHeight), t = i.origin("display", i.style("display"), "block"), i.height(0).visible(!0), i.css({
                    overflow: "hidden",
                    display: "none" === t ? "block" : t
                }), A.animate({
                    el: n,
                    draw: {
                        height: e
                    },
                    dur: s,
                    ease: a,
                    onDone: function () {
                        A(n).removeStyleProperty("overflow, height, visibility"), "function" == typeof o && A.proxy(o, this)()
                    }
                })
            })
        },
        moveTo: function (e, t, n, i, s) {
            var a = {
                top: t,
                left: e
            };
            return "function" == typeof n && (s = n, n = A.animation.duration, i = A.animation.ease), "function" == typeof i && (s = i, i = A.animation.ease), this.each(function () {
                A.animate({
                    el: this,
                    draw: a,
                    dur: n,
                    ease: i,
                    onDone: s
                })
            })
        },
        centerTo: function (t, n, i, s, a) {
            return "function" == typeof i && (a = i, i = A.animation.duration, s = A.animation.ease), "function" == typeof s && (a = s, s = A.animation.ease), this.each(function () {
                var e = {
                    left: t - this.clientWidth / 2,
                    top: n - this.clientHeight / 2
                };
                A.animate({
                    el: this,
                    draw: e,
                    dur: i,
                    ease: s,
                    onDone: a
                })
            })
        },
        colorTo: function (e, t, n, i) {
            var s = {
                color: e
            };
            return "function" == typeof t && (i = t, t = A.animation.duration, n = A.animation.ease), "function" == typeof n && (i = n, n = A.animation.ease), this.each(function () {
                A.animate({
                    el: this,
                    draw: s,
                    dur: t,
                    ease: n,
                    onDone: i
                })
            })
        },
        backgroundTo: function (e, t, n, i) {
            var s = {
                backgroundColor: e
            };
            return "function" == typeof t && (i = t, t = A.animation.duration, n = A.animation.ease), "function" == typeof n && (i = n, n = A.animation.ease), this.each(function () {
                A.animate({
                    el: this,
                    draw: s,
                    dur: t,
                    ease: n,
                    onDone: i
                })
            })
        }
    }), A.init = function (e, t) {
        var n, i = this;
        if ("string" == typeof e && (e = e.trim()), this.uid = A.uniqueId(), !e) return this;
        if ("function" == typeof e) return A.ready(e);
        if (e instanceof Element) return this.push(e), this;
        if (e instanceof A) return A.each(e, function () {
            i.push(this)
        }), this;
        if ("window" === e && (e = window), "document" === e && (e = document), "body" === e && (e = document.body), "html" === e && (e = document.documentElement), "doctype" === e && (e = document.doctype), e && (e.nodeType || e.self === window)) return this.push(e), this;
        if (d(e)) return A.each(e, function () {
            A(this).each(function () {
                i.push(this)
            })
        }), this;
        if ("string" != typeof e && e.self && e.self !== window) return this;
        if ("#" === e || "." === e) return console.error("Selector can't be # or ."), this;
        if ("@" === e[0]) A("[data-role]").each(function () {
            -1 < h(A(this).attr("data-role"), ",").indexOf(e.slice(1)) && i.push(this)
        });
        else if (1 === (n = A.parseHTML(e)).length && 3 === n[0].nodeType) try {
            [].push.apply(this, document.querySelectorAll(e))
        } catch (e) {} else A.merge(this, n);
        return t !== u && (t instanceof A ? this.each(function () {
            A(t).append(i)
        }) : t instanceof HTMLElement ? A(t).append(i) : b(t) && A.each(this, function () {
            for (var e in t) S(t, e) && this.setAttribute(e, t[e])
        })), this
    }, A.init.prototype = A.fn;
    var se = window.$;
    A.Promise = Promise, window.m4q = A, void 0 === window.$ && (window.$ = A), A.global = function () {
        se = window.$, window.$ = A
    }, A.noConflict = function () {
        return window.$ === A && (window.$ = se), A
    }
}(window),
function (e) {
    "use strict";
    var t = e.meta("metro4:init").attr("content"),
        n = e.meta("metro4:locale").attr("content"),
        i = e.meta("metro4:week_start").attr("content"),
        s = e.meta("metro4:date_format").attr("content"),
        a = e.meta("metro4:date_format_input").attr("content"),
        o = e.meta("metro4:animation_duration").attr("content"),
        r = e.meta("metro4:callback_timeout").attr("content"),
        l = e.meta("metro4:timeout").attr("content"),
        c = e.meta("metro4:scroll_multiple").attr("content"),
        d = e.meta("metro4:cloak").attr("content"),
        u = e.meta("metro4:cloak_duration").attr("content"),
        h = e.meta("metro4:global_common").attr("content"),
        p = e.meta("metro4:blur_image").attr("content");
    void 0 === window.METRO_BLUR_IMAGE && (window.METRO_BLUR_IMAGE = void 0 !== p && JSON.parse(h)), void 0 === window.METRO_GLOBAL_COMMON && (window.METRO_GLOBAL_COMMON = void 0 !== h && JSON.parse(h));
    h = e.meta("metro4:jquery").attr("content");
    window.jquery_present = "undefined" != typeof jQuery, void 0 === window.METRO_JQUERY && (window.METRO_JQUERY = void 0 === h || JSON.parse(h)), window.useJQuery = window.jquery_present && window.METRO_JQUERY;
    h = e.meta("metro4:about").attr("content");
    void 0 === window.METRO_SHOW_ABOUT && (window.METRO_SHOW_ABOUT = void 0 === h || JSON.parse(h));
    e = e.meta("metro4:compile").attr("content");
    void 0 === window.METRO_SHOW_COMPILE_TIME && (window.METRO_SHOW_COMPILE_TIME = void 0 === e || JSON.parse(e)), void 0 === window.METRO_INIT && (window.METRO_INIT = void 0 === t || JSON.parse(t)), void 0 === window.METRO_DEBUG && (window.METRO_DEBUG = !0), void 0 === window.METRO_WEEK_START && (window.METRO_WEEK_START = void 0 !== i ? parseInt(i) : 0), void 0 === window.METRO_DATE_FORMAT && (window.METRO_DATE_FORMAT = void 0 !== s ? s : "YYYY-MM-DD"), void 0 === window.METRO_DATE_FORMAT_INPUT && (window.METRO_DATE_FORMAT_INPUT = void 0 !== a ? a : "YYYY-MM-DD"), void 0 === window.METRO_LOCALE && (window.METRO_LOCALE = void 0 !== n ? n : "en-US"), void 0 === window.METRO_ANIMATION_DURATION && (window.METRO_ANIMATION_DURATION = void 0 !== o ? parseInt(o) : 100), void 0 === window.METRO_CALLBACK_TIMEOUT && (window.METRO_CALLBACK_TIMEOUT = void 0 !== r ? parseInt(r) : 500), void 0 === window.METRO_TIMEOUT && (window.METRO_TIMEOUT = void 0 !== l ? parseInt(l) : 2e3), void 0 === window.METRO_SCROLL_MULTIPLE && (window.METRO_SCROLL_MULTIPLE = void 0 !== c ? parseInt(c) : 20), void 0 === window.METRO_CLOAK_REMOVE && (window.METRO_CLOAK_REMOVE = void 0 !== d ? ("" + d).toLowerCase() : "fade"), void 0 === window.METRO_CLOAK_DURATION && (window.METRO_CLOAK_DURATION = void 0 !== u ? parseInt(u) : 300), void 0 === window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE && (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = !0), void 0 === window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS && (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = !0), void 0 === window.METRO_HOTKEYS_FILTER_TEXT_INPUTS && (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = !0), void 0 === window.METRO_HOTKEYS_BUBBLE_UP && (window.METRO_HOTKEYS_BUBBLE_UP = !1), void 0 === window.METRO_THROWS && (window.METRO_THROWS = !0), window.METRO_MEDIA = []
}(m4q),
function () {
    "use strict";
    var u = m4q;
    if ("undefined" == typeof m4q) throw new Error("Metro 4 requires m4q helper!");
    if (!("MutationObserver" in window)) throw new Error("Metro 4 requires MutationObserver!");

    function o(e) {
        return "string" != typeof e ? void 0 : e.replace(/-/g, "").toLowerCase()
    }
    var s = "ontouchstart" in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints,
        h = {
            version: "4.5.0",
            compileTime: "01/08/2021 18:53:43",
            buildNumber: "755",
            isTouchable: s,
            fullScreenEnabled: document.fullscreenEnabled,
            sheet: null,
            controlsPosition: {
                INSIDE: "inside",
                OUTSIDE: "outside"
            },
            groupMode: {
                ONE: "one",
                MULTI: "multi"
            },
            aspectRatio: {
                HD: "hd",
                SD: "sd",
                CINEMA: "cinema"
            },
            fullScreenMode: {
                WINDOW: "window",
                DESKTOP: "desktop"
            },
            position: {
                TOP: "top",
                BOTTOM: "bottom",
                LEFT: "left",
                RIGHT: "right",
                TOP_RIGHT: "top-right",
                TOP_LEFT: "top-left",
                BOTTOM_LEFT: "bottom-left",
                BOTTOM_RIGHT: "bottom-right",
                LEFT_BOTTOM: "left-bottom",
                LEFT_TOP: "left-top",
                RIGHT_TOP: "right-top",
                RIGHT_BOTTOM: "right-bottom"
            },
            popoverEvents: {
                CLICK: "click",
                HOVER: "hover",
                FOCUS: "focus"
            },
            stepperView: {
                SQUARE: "square",
                CYCLE: "cycle",
                DIAMOND: "diamond"
            },
            listView: {
                LIST: "list",
                CONTENT: "content",
                ICONS: "icons",
                ICONS_MEDIUM: "icons-medium",
                ICONS_LARGE: "icons-large",
                TILES: "tiles",
                TABLE: "table"
            },
            events: {
                click: "click",
                start: s ? "touchstart" : "mousedown",
                stop: s ? "touchend" : "mouseup",
                move: s ? "touchmove" : "mousemove",
                enter: s ? "touchstart" : "mouseenter",
                startAll: "mousedown touchstart",
                stopAll: "mouseup touchend",
                moveAll: "mousemove touchmove",
                leave: "mouseleave",
                focus: "focus",
                blur: "blur",
                resize: "resize",
                keyup: "keyup",
                keydown: "keydown",
                keypress: "keypress",
                dblclick: "dblclick",
                input: "input",
                change: "change",
                cut: "cut",
                paste: "paste",
                scroll: "scroll",
                mousewheel: "mousewheel",
                inputchange: "change input propertychange cut paste copy drop",
                dragstart: "dragstart",
                dragend: "dragend",
                dragenter: "dragenter",
                dragover: "dragover",
                dragleave: "dragleave",
                drop: "drop",
                drag: "drag"
            },
            keyCode: {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                BREAK: 19,
                CAPS: 20,
                ESCAPE: 27,
                SPACE: 32,
                PAGEUP: 33,
                PAGEDOWN: 34,
                END: 35,
                HOME: 36,
                LEFT_ARROW: 37,
                UP_ARROW: 38,
                RIGHT_ARROW: 39,
                DOWN_ARROW: 40,
                COMMA: 188
            },
            media_queries: {
                FS: "(min-width: 0px)",
                XS: "(min-width: 360px)",
                SM: "(min-width: 576px)",
                MD: "(min-width: 768px)",
                LG: "(min-width: 992px)",
                XL: "(min-width: 1200px)",
                XXL: "(min-width: 1452px)"
            },
            media_sizes: {
                FS: 0,
                XS: 360,
                SM: 576,
                LD: 640,
                MD: 768,
                LG: 992,
                XL: 1200,
                XXL: 1452
            },
            media_mode: {
                FS: "fs",
                XS: "xs",
                SM: "sm",
                MD: "md",
                LG: "lg",
                XL: "xl",
                XXL: "xxl"
            },
            media_modes: ["fs", "xs", "sm", "md", "lg", "xl", "xxl"],
            actions: {
                REMOVE: 1,
                HIDE: 2
            },
            hotkeys: {},
            locales: {},
            utils: {},
            colors: {},
            dialog: null,
            pagination: null,
            md5: null,
            storage: null,
            export: null,
            animations: null,
            cookie: null,
            template: null,
            defaults: {},
            about: function () {
                var e = "<h3>About</h3><hr><div><b>Metro 4</b> - v" + h.version + ". " + h.showCompileTime() + "</div><div><b>M4Q</b> - " + m4q.version + "</div>";
                h.infobox.create(e)
            },
            info: function () {
                console.info("Metro 4 - v" + h.version + ". " + h.showCompileTime()), console.info("m4q - " + m4q.version)
            },
            showCompileTime: function () {
                return "Built at: " + h.compileTime
            },
            aboutDlg: function () {
                alert("Metro 4 - v" + h.version + ". " + h.showCompileTime())
            },
            ver: function () {
                return h.version
            },
            build: function () {
                return h.build
            },
            compile: function () {
                return h.compileTime
            },
            observe: function () {
                new MutationObserver(function (e) {
                    e.map(function (e) {
                        var t, n, i, s, a;
                        if ("attributes" === e.type && "data-role" !== e.attributeName) "data-hotkey" === e.attributeName ? h.initHotkeys([e.target], !0) : (n = (t = u(e.target)).data("metroComponent"), i = e.attributeName, s = t.attr(i), a = e.oldValue, void 0 !== n && (t.fire("attr-change", {
                            attr: i,
                            newValue: s,
                            oldValue: a,
                            __this: t[0]
                        }), u.each(n, function () {
                            var e = h.getPlugin(t, this);
                            e && "function" == typeof e.changeAttribute && e.changeAttribute(i, s, a)
                        })));
                        else if ("childList" === e.type && 0 < e.addedNodes.length) {
                            var o, r, l, c = [],
                                d = e.addedNodes;
                            if (d.length) {
                                for (o = 0; o < d.length; o++) l = d[o], void 0 !== (r = u(l)).attr("data-role") && c.push(l), u.each(r.find("[data-role]"), function () {
                                    -1 === c.indexOf(this) && c.push(this)
                                });
                                c.length && h.initWidgets(c, "observe")
                            }
                        }
                    })
                }).observe(u("html")[0], {
                    childList: !0,
                    attributes: !0,
                    subtree: !0
                })
            },
            init: function () {
                var e = u("[data-role]"),
                    t = u("[data-hotkey]"),
                    n = u("html"),
                    i = this;
                window.METRO_BLUR_IMAGE && n.addClass("use-blur-image"), window.METRO_SHOW_ABOUT && h.info(!0), !0 == s ? n.addClass("metro-touch-device") : n.addClass("metro-no-touch-device"), h.sheet = this.utils.newCssSheet(), this.utils.addCssRule(h.sheet, "*, *::before, *::after", "box-sizing: border-box;"), window.METRO_MEDIA = [], u.each(h.media_queries, function (e, t) {
                    i.utils.media(t) && window.METRO_MEDIA.push(h.media_mode[e])
                }), h.observe(), h.initHotkeys(t), h.initWidgets(e, "init"), "fade" !== window.METRO_CLOAK_REMOVE ? (u(".m4-cloak").removeClass("m4-cloak"), u(window).fire("metro-initiated")) : u(".m4-cloak").animate({
                    draw: {
                        opacity: 1
                    },
                    dur: 300,
                    onDone: function () {
                        u(".m4-cloak").removeClass("m4-cloak"), u(window).fire("metro-initiated")
                    }
                })
            },
            initHotkeys: function (e, i) {
                u.each(e, function () {
                    var e = u(this),
                        t = !!e.attr("data-hotkey") && e.attr("data-hotkey").toLowerCase(),
                        n = !!e.attr("data-hotkey-func") && e.attr("data-hotkey-func");
                    !1 !== t && (!0 === e.data("hotKeyBonded") && !0 !== i || (h.hotkeys[t] = [this, n], e.data("hotKeyBonded", !0), e.fire("hot-key-bonded", {
                        __this: e[0],
                        hotkey: t,
                        fn: n
                    })))
                })
            },
            initWidgets: function (e) {
                var a = this;
                u.each(e, function () {
                    var s = u(this);
                    this.hasAttribute("data-role") && s.attr("data-role").split(/\s*,\s*/).map(function (t) {
                        var e = a.utils.$(),
                            n = o(t);
                        if (void 0 !== e.fn[n] && void 0 === s.attr("data-role-" + n)) try {
                            e.fn[n].call(s), s.attr("data-role-" + n, !0);
                            var i = s.data("metroComponent");
                            void 0 === i ? i = [n] : i.push(n), s.data("metroComponent", i), s.fire("create", {
                                __this: s[0],
                                name: n
                            }), u(document).fire("component-create", {
                                element: s[0],
                                name: n
                            })
                        } catch (e) {
                            throw console.error("Error creating component " + t + " for ", s[0]), e
                        }
                    })
                })
            },
            plugin: function (e, n) {
                var i = o(e),
                    e = function (t) {
                        t.fn[i] = function (e) {
                            return this.each(function () {
                                t.data(this, i, Object.create(n).init(e, this))
                            })
                        }
                    };
                e(m4q), window.useJQuery && e(jQuery)
            },
            pluginExists: function (e) {
                return "function" == typeof (window.useJQuery ? jQuery : m4q).fn[o(e)]
            },
            destroyPlugin: function (e, t) {
                var n = u(e),
                    i = o(t),
                    e = h.getPlugin(n, i);
                void 0 !== e ? "function" == typeof e.destroy ? (e.destroy(), e = n.data("metroComponent"), this.utils.arrayDelete(e, i), n.data("metroComponent", e), u.removeData(n[0], i), n.removeAttr("data-role-" + i)) : console.warn("Component " + t + " can not be destroyed: method destroy not found.") : console.warn("Component " + t + " can not be destroyed: the element is not a Metro 4 component.")
            },
            destroyPluginAll: function (e) {
                var t = u(e),
                    e = t.data("metroComponent");
                void 0 !== e && 0 < e.length && u.each(e, function () {
                    h.destroyPlugin(t[0], this)
                })
            },
            noop: function () {},
            noop_true: function () {
                return !0
            },
            noop_false: function () {
                return !1
            },
            requestFullScreen: function (e) {
                e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.requestFullscreen().catch(function (e) {
                    console.warn("Error attempting to enable full-screen mode: " + e.message + " " + e.name)
                })
            },
            exitFullScreen: function () {
                document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.exitFullscreen().catch(function (e) {
                    console.warn("Error attempting to disable full-screen mode: " + e.message + " " + e.name)
                })
            },
            inFullScreen: function () {
                return void 0 !== (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
            },
            $: function () {
                return window.useJQuery ? jQuery : m4q
            },
            get$el: function (e) {
                return h.$()(u(e)[0])
            },
            get$elements: function (e) {
                return h.$()(u(e))
            },
            getPlugin: function (e, t) {
                t = o(t), e = h.get$el(e);
                return e.length ? e.data(t) : void 0
            },
            makePlugin: function (e, t, n) {
                t = o(t), e = h.get$elements(e);
                return e.length && "function" == typeof e[t] ? e[t](n) : void 0
            },
            Component: function (e, t) {
                var e = o(e),
                    r = h.utils,
                    t = u.extend({
                        name: e
                    }, {
                        _super: function (e, t, n, i) {
                            var s = this;
                            this.elem = e, this.element = u(e), this.options = u.extend({}, n, t), this.component = this.elem, this._setOptionsFromDOM(), this._runtime(), i && "object" == typeof i && u.each(i, function (e, t) {
                                s[e] = t
                            }), this._createExec()
                        },
                        _setOptionsFromDOM: function () {
                            var e = this.element,
                                i = this.options;
                            u.each(e.data(), function (t, n) {
                                if (t in i) try {
                                    i[t] = JSON.parse(n)
                                } catch (e) {
                                    i[t] = n
                                }
                            })
                        },
                        _runtime: function () {
                            var e = this.element,
                                t = (e.attr("data-role") || "").toArray(",").map(o).filter(function (e) {
                                    return "" !== e.trim()
                                });
                            e.attr("data-role-" + this.name) || (e.attr("data-role-" + this.name, !0), -1 === t.indexOf(this.name) && (t.push(this.name), e.attr("data-role", t.join(","))), void 0 === (t = e.data("metroComponent")) ? t = [this.name] : t.push(this.name), e.data("metroComponent", t))
                        },
                        _createExec: function () {
                            var e = this,
                                t = this.options[this.name + "Deferred"];
                            t ? setTimeout(function () {
                                e._create()
                            }, t) : e._create()
                        },
                        _fireEvent: function (e, t, n, i) {
                            var s = this.element,
                                a = this.options,
                                o = u.camelCase(e).capitalize(),
                                e = (t = u.extend({}, t, {
                                    __this: s[0]
                                })) ? Object.values(t) : {};
                            return n && (console.warn(n), console.warn("Event: on" + o), console.warn("Data: ", t), console.warn("Element: ", s[0])), !0 !== i && s.fire(o.toLowerCase(), t), r.exec(a["on" + o], e, s[0])
                        },
                        _fireEvents: function (e, t, n, i) {
                            var s = this;
                            if (0 !== arguments.length) return 1 === arguments.length ? (u.each(e, function () {
                                s._fireEvent(this.name, this.data, this.log, this.noFire)
                            }), r.objectLength(e)) : void(!Array.isArray(e) && "string" != typeof e || (e = Array.isArray(e) ? e : e.toArray(","), u.each(e, function () {
                                s._fireEvent(this, t, n, i)
                            })))
                        },
                        getComponent: function () {
                            return this.component
                        },
                        getComponentName: function () {
                            return this.name
                        }
                    }, t);
                return h.plugin(e, t), t
            },
            fetch: {
                status: function (e) {
                    return e.ok ? Promise.resolve(e) : Promise.reject(new Error(e.statusText))
                },
                json: function (e) {
                    return e.json()
                },
                text: function (e) {
                    return e.text()
                },
                form: function (e) {
                    return e.formData()
                },
                blob: function (e) {
                    return e.blob()
                },
                buffer: function (e) {
                    return e.arrayBuffer()
                }
            }
        };
    u(window).on(h.events.resize, function () {
        window.METRO_MEDIA = [], u.each(h.media_queries, function (e, t) {
            h.utils.media(t) && window.METRO_MEDIA.push(h.media_mode[e])
        })
    }), window.Metro = h, !0 === window.METRO_INIT && u(function () {
        h.init()
    })
}(),
function (e) {
    m4q.extend(e.locales, {
        "da-DK": {
            calendar: {
                months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December", "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                time: {
                    days: "DAGE",
                    hours: "TIMER",
                    minutes: "MIN",
                    seconds: "SEK",
                    month: "MON",
                    day: "DAG",
                    year: "ÅR"
                },
                weekStart: 1
            },
            buttons: {
                ok: "OK",
                cancel: "Annuller",
                done: "Færdig",
                today: "Idag",
                now: "Nu",
                clear: "Ryd",
                help: "Hjælp",
                yes: "Ja",
                no: "Nej",
                random: "Tilfældig",
                save: "Gem",
                reset: "Nulstil"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "de-DE": {
            calendar: {
                months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
                time: {
                    days: "TAGE",
                    hours: "STD",
                    minutes: "MIN",
                    seconds: "SEK"
                },
                weekStart: 2
            },
            buttons: {
                ok: "OK",
                cancel: "Abbrechen",
                done: "Fertig",
                today: "Heute",
                now: "Jetzt",
                clear: "Löschen",
                help: "Hilfe",
                yes: "Ja",
                no: "Nein",
                random: "Zufällig",
                save: "Speichern",
                reset: "Zurücksetzen"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "en-US": {
            calendar: {
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"],
                time: {
                    days: "DAYS",
                    hours: "HOURS",
                    minutes: "MINS",
                    seconds: "SECS",
                    month: "MON",
                    day: "DAY",
                    year: "YEAR"
                },
                weekStart: 0
            },
            buttons: {
                ok: "OK",
                cancel: "Cancel",
                done: "Done",
                today: "Today",
                now: "Now",
                clear: "Clear",
                help: "Help",
                yes: "Yes",
                no: "No",
                random: "Random",
                save: "Save",
                reset: "Reset"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "es-MX": {
            calendar: {
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                time: {
                    days: "DÍAS",
                    hours: "HORAS",
                    minutes: "MINS",
                    seconds: "SEGS",
                    month: "MES",
                    day: "DÍA",
                    year: "AÑO"
                },
                weekStart: 1
            },
            buttons: {
                ok: "Aceptar",
                cancel: "Cancelar",
                done: "Hecho",
                today: "Hoy",
                now: "Ahora",
                clear: "Limpiar",
                help: "Ayuda",
                yes: "Si",
                no: "No",
                random: "Aleatorio",
                save: "Salvar",
                reset: "Reiniciar"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "fr-FR": {
            calendar: {
                months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
                days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa", "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                time: {
                    days: "JOURS",
                    hours: "HEURES",
                    minutes: "MINS",
                    seconds: "SECS",
                    month: "MOIS",
                    day: "JOUR",
                    year: "ANNEE"
                },
                weekStart: 1
            },
            buttons: {
                ok: "OK",
                cancel: "Annulé",
                done: "Fait",
                today: "Aujourd'hui",
                now: "Maintenant",
                clear: "Effacé",
                help: "Aide",
                yes: "Oui",
                no: "Non",
                random: "Aléatoire",
                save: "Sauvegarder",
                reset: "Réinitialiser"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "hr-HR": {
            calendar: {
                months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac", "Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
                days: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su", "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                time: {
                    days: "DANI",
                    hours: "SATI",
                    minutes: "MINUTE",
                    seconds: "SEKUNDE",
                    month: "MJESEC",
                    day: "DAN",
                    year: "GODINA"
                },
                weekStart: 1
            },
            buttons: {
                ok: "OK",
                cancel: "Otkaži",
                done: "Gotovo",
                today: "Danas",
                now: "Sada",
                clear: "Izbriši",
                help: "Pomoć",
                yes: "Da",
                no: "Ne",
                random: "Nasumično",
                save: "Spremi",
                reset: "Reset"
            },
            table: {
                rowsCount: "Broj redaka:",
                search: "Pretraga:",
                info: "Prikazujem $1 do $2 od $3",
                prev: "Nazad",
                next: "Naprijed",
                all: "Sve",
                inspector: "Inspektor",
                skip: "Idi na stranicu",
                empty: "Prazno"
            },
            colorSelector: {
                addUserColorButton: "Dodaj uzorcima",
                userColorsTitle: "Korisničke boje"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "hu-HU": {
            calendar: {
                months: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December", "Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
                days: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "V", "H", "K", "Sz", "Cs", "P", "Sz", "Vas", "Hét", "Ke", "Sze", "Csü", "Pén", "Szom"],
                time: {
                    days: "NAP",
                    hours: "ÓRA",
                    minutes: "PERC",
                    seconds: "MP"
                },
                weekStart: 1
            },
            buttons: {
                ok: "OK",
                cancel: "Mégse",
                done: "Kész",
                today: "Ma",
                now: "Most",
                clear: "Törlés",
                help: "Segítség",
                yes: "Igen",
                no: "Nem",
                random: "Véletlen",
                save: "Mentés",
                reset: "Visszaállítás"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "it-IT": {
            calendar: {
                months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre", "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
                days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                time: {
                    days: "GIORNI",
                    hours: "ORE",
                    minutes: "MIN",
                    seconds: "SEC",
                    month: "MESE",
                    day: "GIORNO",
                    year: "ANNO"
                },
                weekStart: 1
            },
            buttons: {
                ok: "OK",
                cancel: "Annulla",
                done: "Fatto",
                today: "Oggi",
                now: "Adesso",
                clear: "Cancella",
                help: "Aiuto",
                yes: "Sì",
                no: "No",
                random: "Random",
                save: "Salvare",
                reset: "Reset"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "pt-BR": {
            calendar: {
                months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Do", "Se", "Te", "Qa", "Qi", "Se", "Sa", "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                time: {
                    days: "DIAS",
                    hours: "HORAS",
                    minutes: "MINUTOS",
                    seconds: "SEGUNDOS",
                    month: "MÊS",
                    day: "DIA",
                    year: "ANO"
                },
                weekStart: 1
            },
            buttons: {
                ok: "OK",
                cancel: "Cancelar",
                done: "Feito",
                today: "Hoje",
                now: "Agora",
                clear: "Limpar",
                help: "Ajuda",
                yes: "Sim",
                no: "Não",
                random: "Aleatório",
                save: "Salvar",
                reset: "Restaurar"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "ru-RU": {
            calendar: {
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
                time: {
                    days: "ДНИ",
                    hours: "ЧАСЫ",
                    minutes: "МИН",
                    seconds: "СЕК",
                    month: "МЕС",
                    day: "ДЕНЬ",
                    year: "ГОД"
                },
                weekStart: 1
            },
            buttons: {
                ok: "ОК",
                cancel: "Отмена",
                done: "Готово",
                today: "Сегодня",
                now: "Сейчас",
                clear: "Очистить",
                help: "Помощь",
                yes: "Да",
                no: "Нет",
                random: "Случайно",
                save: "Сохранить",
                reset: "Сброс"
            },
            table: {
                rowsCount: "Показать записей:",
                search: "Поиск:",
                info: "Показаны $1 с $2 по $3 записей",
                prev: "Предыдущие",
                next: "Следующие",
                all: "Все",
                inspector: "Инспектор",
                skip: "Перейти на страницу",
                empty: "Нет записей"
            },
            colorSelector: {
                addUserColorButton: "ДОБАВИТЬ В ОБРАЗЦЫ",
                userColorsTitle: "ЦВЕТА ПОЛЬЗОВАТЕЛЯ"
            },
            switch: {
                on: "вкл",
                off: "выкл"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "tr-TR": {
            calendar: {
                months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", "Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
                days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pa", "Pz", "Sa", "Ça", "Pe", "Cu", "Ct", "Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
                time: {
                    days: "GÜN",
                    hours: "SAAT",
                    minutes: "DAK",
                    seconds: "SAN",
                    month: "AY",
                    day: "GÜN",
                    year: "YIL"
                },
                weekStart: 1
            },
            buttons: {
                ok: "Tamam",
                cancel: "Vazgeç",
                done: "Bitti",
                today: "Bugün",
                now: "Şimdi",
                clear: "Temizle",
                help: "Yardım",
                yes: "Evet",
                no: "Hayır",
                random: "Rasgele",
                save: "Kurtarmak",
                reset: "Sıfırla"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "uk-UA": {
            calendar: {
                months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень", "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
                days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нед", "Пон", "Вiв", "Сер", "Чет", "Пят", "Суб"],
                time: {
                    days: "ДНІ",
                    hours: "ГОД",
                    minutes: "ХВИЛ",
                    seconds: "СЕК",
                    month: "МІС",
                    day: "ДЕНЬ",
                    year: "РІК"
                },
                weekStart: 1
            },
            buttons: {
                ok: "ОК",
                cancel: "Відміна",
                done: "Готово",
                today: "Сьогодні",
                now: "Зараз",
                clear: "Очистити",
                help: "Допомога",
                yes: "Так",
                no: "Ні",
                random: "Випадково",
                save: "Зберегти",
                reset: "Скинути"
            },
            table: {
                rowsCount: "Показати записів:",
                search: "Пошук:",
                info: "Показано $1 з $2 по $3 записів",
                prev: "Попередні",
                next: "Наступні",
                all: "Усі",
                inspector: "Інспектор",
                skip: "Перейти до сторінки",
                empty: "Нема записів"
            },
            colorSelector: {
                addUserColorButton: "ДОДАТИ В ЗРАЗКИ",
                userColorsTitle: "КОЛІРИ КОРИСТУВАЧА"
            },
            switch: {
                on: "увм",
                off: "вім"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "zh-CN": {
            calendar: {
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "日", "一", "二", "三", "四", "五", "六", "周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                time: {
                    days: "天",
                    hours: "时",
                    minutes: "分",
                    seconds: "秒",
                    month: "月",
                    day: "日",
                    year: "年"
                },
                weekStart: 1
            },
            buttons: {
                ok: "确认",
                cancel: "取消",
                done: "完成",
                today: "今天",
                now: "现在",
                clear: "清除",
                help: "帮助",
                yes: "是",
                no: "否",
                random: "随机",
                save: "保存",
                reset: "重啟"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function (e) {
    m4q.extend(e.locales, {
        "zh-TW": {
            calendar: {
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "日", "一", "二", "三", "四", "五", "六", "週日", "週一", "週二", "週三", "週四", "週五", "週六"],
                time: {
                    days: "天",
                    hours: "時",
                    minutes: "分",
                    seconds: "秒",
                    month: "月",
                    day: "日",
                    year: "年"
                },
                weekStart: 1
            },
            buttons: {
                ok: "確認",
                cancel: "取消",
                done: "完成",
                today: "今天",
                now: "現在",
                clear: "清除",
                help: "幫助",
                yes: "是",
                no: "否",
                random: "隨機",
                save: "保存",
                reset: "重啟"
            },
            table: {
                rowsCount: "Show entries:",
                search: "Search:",
                info: "Showing $1 to $2 of $3 entries",
                prev: "Prev",
                next: "Next",
                all: "All",
                inspector: "Inspector",
                skip: "Goto page",
                empty: "Nothing to show"
            },
            colorSelector: {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            },
            switch: {
                on: "on",
                off: "off"
            }
        }
    })
}(Metro),
function () {
    "use strict";
    "function" != typeof Array.prototype.shuffle && (Array.prototype.shuffle = function () {
        for (var e, t, n = this.length; 0 !== n;) t = Math.floor(Math.random() * n), e = this[--n], this[n] = this[t], this[t] = e;
        return this
    }), "function" != typeof Array.prototype.clone && (Array.prototype.clone = function () {
        return this.slice(0)
    }), "function" != typeof Array.prototype.unique && (Array.prototype.unique = function () {
        for (var e = this.concat(), t = 0; t < e.length; ++t)
            for (var n = t + 1; n < e.length; ++n) e[t] === e[n] && e.splice(n--, 1);
        return e
    })
}(),
function () {
    "use strict";
    Number.prototype.format = function (e, t, n, i) {
        t = "\\d(?=(\\d{" + (t || 3) + "})+" + (0 < e ? "\\D" : "$") + ")", e = this.toFixed(Math.max(0, ~~e));
        return (i ? e.replace(".", i) : e).replace(new RegExp(t, "g"), "$&" + (n || ","))
    }
}(),
function () {
    "use strict";
    String.prototype.toArray = function (e, n, i, s) {
        return n = n || "string", i = null != i && i, ("" + this).split(e = e || ",").map(function (e) {
            var t;
            switch (n) {
                case "int":
                case "integer":
                    t = isNaN(e) ? e.trim() : parseInt(e);
                    break;
                case "number":
                case "float":
                    t = isNaN(e) ? e : parseFloat(e);
                    break;
                case "date":
                    t = i ? Datetime.from(e, i, s || "en-US") : datetime(e);
                    break;
                default:
                    t = e.trim()
            }
            return t
        })
    }, String.prototype.capitalize = function () {
        return this.substr(0, 1).toUpperCase() + this.substr(1)
    }
}(),
function (s, o) {
    "use strict";
    s.utils = {
        isVisible: function (e) {
            e = o(e)[0];
            return "none" !== this.getStyleOne(e, "display") && "hidden" !== this.getStyleOne(e, "visibility") && null !== e.offsetParent
        },
        isUrl: function (e) {
            return /^(\.\/|\.\.\/|ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(e)
        },
        isTag: function (e) {
            return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(e)
        },
        isEmbedObject: function (e) {
            var t = !1;
            return o.each(["iframe", "object", "embed", "video"], function () {
                ("string" == typeof e && e.toLowerCase() === this || void 0 !== e.nodeType && e.tagName.toLowerCase() === this) && (t = !0)
            }), t
        },
        isVideoUrl: function (e) {
            return /youtu\.be|youtube|twitch|vimeo/gi.test(e)
        },
        isDate: function (e, t, n) {
            var i;
            if (this.isDateObject(e)) return !0;
            try {
                return i = t ? Datetime.from(e, t, n || "en-US") : datetime(e), Datetime.isDatetime(i)
            } catch (e) {
                return !1
            }
        },
        isDateObject: function (e) {
            return "object" == typeof e && void 0 !== e.getMonth
        },
        isInt: function (e) {
            return !isNaN(e) && +e % 1 == 0
        },
        isFloat: function (e) {
            return !isNaN(e) && +e % 1 != 0 || /^\d*\.\d+$/.test(e)
        },
        isFunc: function (e) {
            return this.isType(e, "function")
        },
        isObject: function (e) {
            return this.isType(e, "object")
        },
        isObject2: function (e) {
            return "object" == typeof e && !Array.isArray(e)
        },
        isType: function (e, t) {
            if (!this.isValue(e)) return !1;
            if (typeof e === t) return e;
            if ("tag" === ("" + t).toLowerCase() && this.isTag(e)) return e;
            if ("url" === ("" + t).toLowerCase() && this.isUrl(e)) return e;
            if ("array" === ("" + t).toLowerCase() && Array.isArray(e)) return e;
            if (this.isTag(e) || this.isUrl(e)) return !1;
            if (typeof window[e] === t) return window[e];
            if ("string" == typeof e && -1 === e.indexOf(".")) return !1;
            if ("string" == typeof e && /[/\s([]+/gm.test(e)) return !1;
            if ("number" == typeof e && "number" !== t.toLowerCase()) return !1;
            for (var n = e.split("."), i = window, s = 0; s < n.length; s++) i = i[n[s]];
            return typeof i === t && i
        },
        $: function () {
            return window.useJQuery ? jQuery : m4q
        },
        isMetroObject: function (e, t) {
            var n = o(e),
                i = s.getPlugin(e, t);
            return 0 === n.length ? (console.warn(t + " " + e + " not found!"), !1) : void 0 !== i || (console.warn("Element not contain role " + t + '! Please add attribute data-role="' + t + '" to element ' + e), !1)
        },
        isJQuery: function (e) {
            return "undefined" != typeof jQuery && e instanceof jQuery
        },
        isM4Q: function (e) {
            return "undefined" != typeof m4q && e instanceof m4q
        },
        isQ: function (e) {
            return this.isJQuery(e) || this.isM4Q(e)
        },
        embedUrl: function (e) {
            return -1 !== e.indexOf("youtu.be") && (e = "https://www.youtube.com/embed/" + e.split("/").pop()), "<div class='embed-container'><iframe src='" + e + "'></iframe></div>"
        },
        elementId: function (e) {
            return e + "-" + (new Date).getTime() + o.random(1, 1e3)
        },
        secondsToTime: function (e) {
            return {
                d: Math.floor(e % 31536e3 / 86400),
                h: Math.floor(e % 31536e3 % 86400 / 3600),
                m: Math.floor(e % 31536e3 % 86400 % 3600 / 60),
                s: Math.round(e % 31536e3 % 86400 % 3600 % 60)
            }
        },
        secondsToFormattedString: function (e) {
            var t = parseInt(e, 10),
                n = Math.floor(t / 3600),
                e = Math.floor((t - 3600 * n) / 60),
                t = t - 3600 * n - 60 * e;
            return [Cake.lpad(n, 2, "0"), Cake.lpad(e, 2, "0"), Cake.lpad(t, 2, "0")].join(":")
        },
        func: function (e) {
            return new Function("a", e)
        },
        exec: function (e, t, n) {
            var i;
            if (null == e) return !1;
            var s = this.isFunc(e);
            !1 === s && (s = this.func(e));
            try {
                i = s.apply(n, t)
            } catch (e) {
                if (!(i = null) === window.METRO_THROWS) throw e
            }
            return i
        },
        isOutsider: function (e) {
            var t = o(e),
                e = t.clone();
            return e.removeAttr("data-role").css({
                visibility: "hidden",
                position: "absolute",
                display: "block"
            }), t.parent().append(e), t = this.inViewport(e[0]), e.remove(), !t
        },
        inViewport: function (e) {
            e = this.rect(e);
            return 0 <= e.top && 0 <= e.left && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth)
        },
        rect: function (e) {
            return e.getBoundingClientRect()
        },
        getCursorPosition: function (e, t) {
            e = this.rect(e);
            return {
                x: this.pageXY(t).x - e.left - window.pageXOffset,
                y: this.pageXY(t).y - e.top - window.pageYOffset
            }
        },
        getCursorPositionX: function (e, t) {
            return this.getCursorPosition(e, t).x
        },
        getCursorPositionY: function (e, t) {
            return this.getCursorPosition(e, t).y
        },
        objectLength: function (e) {
            return Object.keys(e).length
        },
        percent: function (e, t, n) {
            if (0 === e) return 0;
            e = 100 * t / e;
            return !0 === n ? Math.round(e) : Math.round(100 * e) / 100
        },
        objectShift: function (e) {
            var t = 0;
            return o.each(e, function (e) {
                (0 === t || e < t) && (t = e)
            }), delete e[t], e
        },
        objectDelete: function (e, t) {
            void 0 !== e[t] && delete e[t]
        },
        arrayDeleteByMultipleKeys: function (t, e) {
            return e.forEach(function (e) {
                delete t[e]
            }), t.filter(function (e) {
                return void 0 !== e
            })
        },
        arrayDelete: function (e, t) {
            t = e.indexOf(t); - 1 < t && e.splice(t, 1)
        },
        arrayDeleteByKey: function (e, t) {
            e.splice(t, 1)
        },
        nvl: function (e, t) {
            return null == e ? t : e
        },
        objectClone: function (e) {
            var t, n = {};
            for (t in e) o.hasProp(e, t) && (n[t] = e[t]);
            return n
        },
        github: function (e, t) {
            var n = this;
            o.json("https://api.github.com/repos/" + e).then(function (e) {
                n.exec(t, [e])
            })
        },
        detectIE: function () {
            var e = window.navigator.userAgent,
                t = e.indexOf("MSIE ");
            if (0 < t) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
            if (0 < e.indexOf("Trident/")) {
                var n = e.indexOf("rv:");
                return parseInt(e.substring(n + 3, e.indexOf(".", n)), 10)
            }
            n = e.indexOf("Edge/");
            return 0 < n && parseInt(e.substring(n + 5, e.indexOf(".", n)), 10)
        },
        detectChrome: function () {
            return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        },
        pageHeight: function () {
            var e = document.body,
                t = document.documentElement;
            return Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight)
        },
        cleanPreCode: function (e) {
            Array.prototype.slice.call(document.querySelectorAll(e), 0).forEach(function (e) {
                var t = e.textContent.replace(/^[\r\n]+/, "").replace(/\s+$/g, "");
                if (/^\S/gm.test(t)) e.textContent = t;
                else {
                    for (var n, i, s, a = /^[\t ]+/gm, o = 1e3; n = a.exec(t);)(s = n[0].length) < o && (o = s, i = n[0]);
                    1e3 !== o && (e.textContent = t.replace(new RegExp("^" + i, "gm"), "").trim())
                }
            })
        },
        coords: function (e) {
            e = o(e)[0].getBoundingClientRect();
            return {
                top: e.top + window.pageYOffset,
                left: e.left + window.pageXOffset
            }
        },
        positionXY: function (e, t) {
            switch (t) {
                case "client":
                    return this.clientXY(e);
                case "screen":
                    return this.screenXY(e);
                case "page":
                    return this.pageXY(e);
                default:
                    return {
                        x: 0, y: 0
                    }
            }
        },
        clientXY: function (e) {
            return {
                x: (e.changedTouches ? e.changedTouches[0] : e).clientX,
                y: (e.changedTouches ? e.changedTouches[0] : e).clientY
            }
        },
        screenXY: function (e) {
            return {
                x: (e.changedTouches ? e.changedTouches[0] : e).screenX,
                y: (e.changedTouches ? e.changedTouches[0] : e).screenY
            }
        },
        pageXY: function (e) {
            return {
                x: (e.changedTouches ? e.changedTouches[0] : e).pageX,
                y: (e.changedTouches ? e.changedTouches[0] : e).pageY
            }
        },
        isRightMouse: function (e) {
            return "which" in e ? 3 === e.which : "button" in e ? 2 === e.button : void 0
        },
        hiddenElementSize: function (e, t) {
            var n = o(e).clone(!0);
            return n.removeAttr("data-role").css({
                visibility: "hidden",
                position: "absolute",
                display: "block"
            }), o("body").append(n), this.isValue(t) || (t = !1), e = n.outerWidth(t), t = n.outerHeight(t), n.remove(), {
                width: e,
                height: t
            }
        },
        getStyle: function (e, t) {
            e = o(e)[0];
            return window.getComputedStyle(e, t)
        },
        getStyleOne: function (e, t) {
            return this.getStyle(e).getPropertyValue(t)
        },
        getInlineStyles: function (e) {
            for (var t = {}, n = o(e)[0], i = 0, s = n.style.length; i < s; i++) {
                var a = n.style[i];
                t[a] = n.style[a]
            }
            return t
        },
        encodeURI: function (e) {
            return encodeURI(e).replace(/%5B/g, "[").replace(/%5D/g, "]")
        },
        updateURIParameter: function (e, t, n) {
            var i = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                s = -1 !== e.indexOf("?") ? "&" : "?";
            return e.match(i) ? e.replace(i, "$1" + t + "=" + n + "$2") : e + s + t + "=" + n
        },
        getURIParameter: function (e, t) {
            e = e || window.location.href, t = t.replace(/[\[\]]/g, "\\$&");
            e = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
            return e ? e[2] ? decodeURIComponent(e[2].replace(/\+/g, " ")) : "" : null
        },
        getLocales: function () {
            return Object.keys(s.locales)
        },
        addLocale: function (e) {
            s.locales = o.extend({}, s.locales, e)
        },
        aspectRatioH: function (e, t) {
            return "16/9" === t ? 9 * e / 16 : "21/9" === t ? 9 * e / 21 : "4/3" === t ? 3 * e / 4 : void 0
        },
        aspectRatioW: function (e, t) {
            return "16/9" === t ? 16 * e / 9 : "21/9" === t ? 21 * e / 9 : "4/3" === t ? 4 * e / 3 : void 0
        },
        valueInObject: function (e, t) {
            return -1 < Object.values(e).indexOf(t)
        },
        keyInObject: function (e, t) {
            return -1 < Object.keys(e).indexOf(t)
        },
        inObject: function (e, t, n) {
            return void 0 !== e[t] && e[t] === n
        },
        newCssSheet: function (e) {
            var t = document.createElement("style");
            return void 0 !== e && t.setAttribute("media", e), t.appendChild(document.createTextNode("")), document.head.appendChild(t), t.sheet
        },
        addCssRule: function (e, t, n, i) {
            e.insertRule(t + "{" + n + "}", i)
        },
        media: function (e) {
            return window.matchMedia(e).matches
        },
        mediaModes: function () {
            return window.METRO_MEDIA
        },
        mediaExist: function (e) {
            return -1 < window.METRO_MEDIA.indexOf(e)
        },
        inMedia: function (e) {
            return -1 < window.METRO_MEDIA.indexOf(e) && window.METRO_MEDIA.indexOf(e) === window.METRO_MEDIA.length - 1
        },
        isValue: function (e) {
            return null != e && "" !== e
        },
        isNull: function (e) {
            return null == e
        },
        isNegative: function (e) {
            return parseFloat(e) < 0
        },
        isPositive: function (e) {
            return 0 < parseFloat(e)
        },
        isZero: function (e) {
            return 0 === parseFloat(e.toFixed(2))
        },
        between: function (e, t, n, i) {
            return !0 === i ? t <= e && e <= n : t < e && e < n
        },
        parseMoney: function (e) {
            return Number(parseFloat(e.replace(/[^0-9-.]/g, "")))
        },
        parseCard: function (e) {
            return e.replace(/[^0-9]/g, "")
        },
        parsePhone: function (e) {
            return this.parseCard(e)
        },
        parseNumber: function (e, t, n) {
            return e.replace(new RegExp("\\" + t, "g"), "").replace(new RegExp("\\" + n, "g"), ".")
        },
        nearest: function (e, t, n) {
            return e /= t, e = Math[!0 === n ? "floor" : "ceil"](e) * t
        },
        bool: function (e) {
            switch (e) {
                case !0:
                case "true":
                case 1:
                case "1":
                case "on":
                case "yes":
                    return !0;
                default:
                    return !1
            }
        },
        copy: function (e) {
            var t, n, i = document.body,
                s = o(e)[0];
            if (document.createRange && window.getSelection) {
                t = document.createRange(), (n = window.getSelection()).removeAllRanges();
                try {
                    t.selectNodeContents(s), n.addRange(t)
                } catch (e) {
                    t.selectNode(s), n.addRange(t)
                }
            } else i.createTextRange && ((t = i.createTextRange()).moveToElementText(s), t.select());
            document.execCommand("Copy"), window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
        },
        decCount: function (e) {
            return e % 1 == 0 ? 0 : e.toString().split(".")[1].length
        }
    }, !0 === window.METRO_GLOBAL_COMMON && (window.Utils = s.utils)
}(Metro, m4q),
function (t, o) {
    "use strict";
    var i = t.utils,
        n = {
            accordionDeferred: 0,
            showMarker: !0,
            material: !1,
            duration: METRO_ANIMATION_DURATION,
            oneFrame: !0,
            showActive: !0,
            activeFrameClass: "",
            activeHeadingClass: "",
            activeContentClass: "",
            clsFrame: "",
            clsHeading: "",
            clsContent: "",
            clsAccordion: "",
            clsActiveFrame: "",
            clsActiveFrameHeading: "",
            clsActiveFrameContent: "",
            onFrameOpen: t.noop,
            onFrameBeforeOpen: t.noop_true,
            onFrameClose: t.noop,
            onFrameBeforeClose: t.noop_true,
            onAccordionCreate: t.noop
        };
    t.accordionSetup = function (e) {
        n = o.extend({}, n, e)
    }, window.metroAccordionSetup, t.accordionSetup(window.metroAccordionSetup), t.Component("accordion", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("accordionCreate", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.children(".frame"),
                s = t.children(".frame.active");
            t.addClass("accordion").addClass(n.clsAccordion), i.addClass(n.clsFrame).each(function () {
                var e = o(this);
                e.children(".heading").addClass(n.clsHeading), e.children(".content").addClass(n.clsContent)
            }), !0 === n.showMarker && t.addClass("marker-on"), !0 === n.material && t.addClass("material"), i = (0 === s.length ? i : s)[0], this._hideAll(), !0 === n.showActive && (!0 === n.oneFrame ? this._openFrame(i) : o.each(s, function () {
                e._openFrame(this)
            }))
        },
        _createEvents: function () {
            var n = this,
                i = this.element,
                s = this.options,
                a = i.children(".frame.active");
            i.on(t.events.click, ".heading", function () {
                var e = o(this),
                    t = e.parent();
                if (e.closest(".accordion")[0] !== i[0]) return !1;
                t.hasClass("active") ? 1 === a.length && s.oneFrame || n._closeFrame(t) : n._openFrame(t)
            })
        },
        _openFrame: function (e) {
            var t = this.element,
                n = this.options,
                e = o(e);
            if (!1 === i.exec(n.onFrameBeforeOpen, [e[0]], t[0])) return !1;
            !0 === n.oneFrame && this._closeAll(e[0]), e.addClass("active " + n.activeFrameClass).addClass(n.clsActiveFrame), e.children(".heading").addClass(n.activeHeadingClass).addClass(n.clsActiveFrameHeading), e.children(".content").addClass(n.activeContentClass).addClass(n.clsActiveFrameContent).slideDown(n.duration), this._fireEvent("frameOpen", {
                frame: e[0]
            })
        },
        _closeFrame: function (e) {
            var t = this.element,
                n = this.options,
                e = o(e);
            e.hasClass("active") && !1 !== i.exec(n.onFrameBeforeClose, [e[0]], t[0]) && (e.removeClass("active " + n.activeFrameClass).removeClass(n.clsActiveFrame), e.children(".heading").removeClass(n.activeHeadingClass).removeClass(n.clsActiveFrameHeading), e.children(".content").removeClass(n.activeContentClass).removeClass(n.clsActiveFrameContent).slideUp(n.duration), this._fireEvent("frameClose", {
                frame: e[0]
            }))
        },
        _closeAll: function (e) {
            var t = this,
                n = this.element.children(".frame");
            o.each(n, function () {
                e !== this && t._closeFrame(this)
            })
        },
        _hideAll: function () {
            var e = this.element.children(".frame");
            o.each(e, function () {
                o(this).children(".content").hide()
            })
        },
        _openAll: function () {
            var e = this,
                t = this.element.children(".frame");
            o.each(t, function () {
                e._openFrame(this)
            })
        },
        open: function (e) {
            e = this.element.children(".frame").eq(e);
            this._openFrame(e)
        },
        changeAttribute: function (e, t) {},
        destroy: function () {
            var e = this.element;
            return e.off(t.events.click, ".heading"), e
        }
    })
}(Metro, m4q),
function (i, s) {
    "use strict";
    var n = {
        activityDeferred: 0,
        type: "ring",
        style: "color",
        size: 64,
        radius: 20,
        onActivityCreate: i.noop
    };
    i.activitySetup = function (e) {
        n = s.extend({}, n, e)
    }, window.metroActivitySetup, i.activitySetup(window.metroActivitySetup), i.Component("activity", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e, t, n = this.element,
                i = this.options;
            switch (n.html("").addClass(i.style + "-style").addClass("activity-" + i.type), i.type) {
                case "metro":
                    ! function () {
                        for (e = 0; e < 5; e++) s("<div/>").addClass("circle").appendTo(n)
                    }();
                    break;
                case "square":
                    ! function () {
                        for (e = 0; e < 4; e++) s("<div/>").addClass("square").appendTo(n)
                    }();
                    break;
                case "cycle":
                    s("<div/>").addClass("cycle").appendTo(n);
                    break;
                case "simple":
                    s('<svg class="circular"><circle class="path" cx="' + i.size / 2 + '" cy="' + i.size / 2 + '" r="' + i.radius + '" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(n);
                    break;
                case "atom":
                    ! function () {
                        for (e = 0; e < 3; e++) s("<span/>").addClass("electron").appendTo(n)
                    }();
                    break;
                case "bars":
                    ! function () {
                        for (e = 0; e < 6; e++) s("<span/>").addClass("bar").appendTo(n)
                    }();
                    break;
                default:
                    ! function () {
                        for (e = 0; e < 5; e++) t = s("<div/>").addClass("wrap").appendTo(n), s("<div/>").addClass("circle").appendTo(t)
                    }()
            }
            this._fireEvent("activity-create", {
                element: n
            })
        },
        changeAttribute: function (e) {},
        destroy: function () {
            return this.element
        }
    }), i.activity = {
        open: function (e) {
            var t = e || {},
                n = '<div data-role="activity" data-type="' + (t.type || "cycle") + '" data-style="' + (t.style || "color") + '"></div>',
                e = t.text ? '<div class="text-center">' + t.text + "</div>" : "";
            return i.dialog.create({
                content: n + e,
                defaultAction: !1,
                clsContent: "d-flex flex-column flex-justify-center flex-align-center bg-transparent no-shadow w-auto",
                clsDialog: "no-border no-shadow bg-transparent global-dialog",
                autoHide: t.autoHide || 0,
                overlayClickClose: !0 === t.overlayClickClose,
                overlayColor: t.overlayColor || "#000000",
                overlayAlpha: t.overlayAlpha || .5,
                clsOverlay: "global-overlay"
            })
        },
        close: function (e) {
            i.dialog.close(e)
        }
    }
}(Metro, m4q),
function (e, r) {
    "use strict";
    var l = e.utils,
        t = {
            adblockDeferred: 0,
            checkInterval: 1e3,
            fireOnce: !0,
            checkStop: 10,
            localhost: !1,
            onAlert: e.noop,
            onFishingStart: e.noop,
            onFishingDone: e.noop
        };
    e.adblockSetup = function (e) {
        t = r.extend({}, t, e)
    }, window.metroAdblockSetup, e.adblockSetup(window.metroAdblockSetup);
    var c = {
        bite: function () {
            r("<div>").addClass("adblock-bite adsense google-adsense dblclick advert topad top_ads topAds textads sponsoredtextlink_container show_ads right-banner rekl mpu module-ad mid_ad mediaget horizontal_ad headerAd contentAd brand-link bottombanner bottom_ad_block block_ad bannertop banner-right banner-body b-banner b-article-aside__banner b-advert adwrapper adverts advertisment advertisement:not(body) advertise advert_list adtable adsense adpic adlist adleft adinfo adi adholder adframe addiv ad_text ad_space ad_right ad_links ad_body ad_block ad_Right adTitle adText".split(" ").shuffle().join(" ")).css({
                position: "fixed",
                height: 1,
                width: 1,
                overflow: "hidden",
                visibility: "visible",
                top: 0,
                left: 0
            }).append(r("<a href='https://dblclick.net'>").html("dblclick.net")).appendTo("body"), c.options.adblockDeferred ? setTimeout(function () {
                c.fishing()
            }, c.options.adblockDeferred) : this.fishing()
        },
        fishing: function () {
            function e() {
                function e() {
                    clearInterval(o), l.exec(i.onFishingDone), r(window).fire("fishing-done"), t.remove()
                }
                var t = r(".adsense.google-adsense.dblclick.advert.adblock-bite"),
                    n = t.find("a");
                i.localhost || !r.localhost ? !t.length || !n.length || -1 < t.css("display").indexOf("none") || -1 < n.css("display").indexOf("none") ? (l.exec(c.options.onAlert), r(window).fire("adblock-alert"), !0 !== c.options.fireOnce && 0 != --s || e()) : !1 !== a && 0 === --a && e() : e()
            }
            var i = c.options,
                s = "number" == typeof i.fireOnce ? i.fireOnce : 0,
                a = i.checkStop,
                o = !1;
            l.exec(i.onFishingStart), r(window).fire("fishing-start"), o = setInterval(function () {
                e()
            }, c.options.checkInterval), e()
        }
    };
    e.Adblock = c, r(function () {
        c.options = r.extend({}, t), r(window).on("metro-initiated", function () {
            c.bite()
        })
    })
}(Metro, m4q),
function (e, i) {
    "use strict";
    var s = {
        duration: METRO_ANIMATION_DURATION,
        ease: "linear"
    };
    e.animations = {
        switchIn: function (e) {
            i(e).hide().css({
                left: 0,
                top: 0
            }).show()
        },
        switchOut: function (e) {
            i(e).hide()
        },
        switch: function (e, t) {
            this.switchOut(e), this.switchIn(t)
        },
        slideUpIn: function (e, t) {
            var n = i(e),
                e = n.parent().outerHeight(!0),
                t = i.extend({}, s, t);
            n.css({
                top: e,
                left: 0,
                zIndex: 2
            }).animate({
                draw: {
                    top: 0,
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideUpOut: function (e, t) {
            var n = i(e),
                e = n.parent().outerHeight(!0),
                t = i.extend({}, s, t);
            n.css({
                zIndex: 1
            }).animate({
                draw: {
                    top: -e,
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideUp: function (e, t, n) {
            this.slideUpOut(e, n), this.slideUpIn(t, n)
        },
        slideDownIn: function (e, t) {
            var n = i(e),
                e = n.parent().outerHeight(!0),
                t = i.extend({}, s, t);
            n.css({
                left: 0,
                top: -e,
                zIndex: 2
            }).animate({
                draw: {
                    top: 0,
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideDownOut: function (e, t) {
            var n = i(e),
                e = n.parent().outerHeight(!0),
                t = i.extend({}, s, t);
            n.css({
                zIndex: 1
            }).animate({
                draw: {
                    top: e,
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideDown: function (e, t, n) {
            this.slideDownOut(e, n), this.slideDownIn(t, n)
        },
        slideLeftIn: function (e, t) {
            var n = i(e),
                e = n.parent().outerWidth(!0),
                t = i.extend({}, s, t);
            n.css({
                left: e,
                zIndex: 2
            }).animate({
                draw: {
                    left: 0,
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideLeftOut: function (e, t) {
            var n = i(e),
                e = n.parent().outerWidth(!0),
                t = i.extend({}, s, t);
            n.css({
                zIndex: 1
            }).animate({
                draw: {
                    left: -e,
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideLeft: function (e, t, n) {
            this.slideLeftOut(e, n), this.slideLeftIn(t, n)
        },
        slideRightIn: function (e, t) {
            var n = i(e),
                e = n.parent().outerWidth(!0),
                t = i.extend({}, s, t);
            n.css({
                left: -e,
                zIndex: 2
            }).animate({
                draw: {
                    left: 0,
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideRightOut: function (e, t) {
            var n = i(e),
                e = n.parent().outerWidth(!0),
                t = i.extend({}, s, t);
            n.css({
                zIndex: 1
            }).animate({
                draw: {
                    left: e,
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        slideRight: function (e, t, n) {
            this.slideRightOut(e, n), this.slideRightIn(t, n)
        },
        fadeIn: function (e, t) {
            t = i.extend({}, s, t);
            i(e).css({
                top: 0,
                left: 0,
                opacity: 0
            }).animate({
                draw: {
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        fadeOut: function (e, t) {
            t = i.extend({}, s, t);
            i(e).animate({
                draw: {
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        fade: function (e, t, n) {
            this.fadeOut(e, n), this.fadeIn(t, n)
        },
        zoomIn: function (e, t) {
            t = i.extend({}, s, t);
            i(e).css({
                top: 0,
                left: 0,
                opacity: 0,
                transform: "scale(3)",
                zIndex: 2
            }).animate({
                draw: {
                    scale: 1,
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        zoomOut: function (e, t) {
            t = i.extend({}, s, t);
            i(e).css({
                zIndex: 1
            }).animate({
                draw: {
                    scale: 3,
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        zoom: function (e, t, n) {
            this.zoomOut(e, n), this.zoomIn(t, n)
        },
        swirlIn: function (e, t) {
            t = i.extend({}, s, t);
            i(e).css({
                top: 0,
                left: 0,
                opacity: 0,
                transform: "scale(3) rotate(180deg)",
                zIndex: 2
            }).animate({
                draw: {
                    scale: 1,
                    rotate: 0,
                    opacity: 1
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        swirlOut: function (e, t) {
            t = i.extend({}, s, t);
            i(e).css({
                zIndex: 1
            }).animate({
                draw: {
                    scale: 3,
                    rotate: "180deg",
                    opacity: 0
                },
                dur: t.duration,
                ease: t.ease
            })
        },
        swirl: function (e, t, n) {
            this.swirlOut(e, n), this.swirlIn(t, n)
        }
    }, !0 === window.METRO_GLOBAL_COMMON && (window.Animations = e.animations)
}(Metro, m4q),
function (a, o) {
    "use strict";
    var r = a.utils,
        n = {
            appbarDeferred: 0,
            expand: !1,
            expandPoint: null,
            duration: 100,
            onMenuOpen: a.noop,
            onMenuClose: a.noop,
            onBeforeMenuOpen: a.noop,
            onBeforeMenuClose: a.noop,
            onMenuCollapse: a.noop,
            onMenuExpand: a.noop,
            onAppBarCreate: a.noop
        };
    a.appBarSetup = function (e) {
        n = o.extend({}, n, e)
    }, window.metroAppBarSetup, a.appBarSetup(window.metroAppBarSetup), a.Component("app-bar", {
        init: function (e, t) {
            return this._super(t, e, n, {
                id: r.elementId("app-bar")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("app-bar-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t = this.element,
                n = this.options,
                i = r.getStyleOne(t, "background-color");
            if (t.addClass("app-bar"), 0 === (e = t.find(".hamburger")).length) {
                e = o("<button>").attr("type", "button").addClass("hamburger menu-down");
                for (var s = 0; s < 3; s++) o("<span>").addClass("line").appendTo(e);
                "rgba(0, 0, 0, 0)" !== i && !0 !== a.colors.isLight(i) || e.addClass("dark")
            }
            t.prepend(e), 0 === (i = t.find(".app-bar-menu")).length ? e.css("display", "none") : r.addCssRule(a.sheet, ".app-bar-menu li", "list-style: none!important;"), "block" === e.css("display") ? (i.hide().addClass("collapsed"), e.removeClass("hidden")) : e.addClass("hidden"), (!0 === n.expand || r.isValue(n.expandPoint) && r.mediaExist(n.expandPoint)) && (t.addClass("app-bar-expand"), e.addClass("hidden"))
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.find(".app-bar-menu"),
                s = t.find(".hamburger");
            t.on(a.events.click, ".hamburger", function () {
                0 !== i.length && (i.hasClass("collapsed") ? e.open() : e.close())
            }), o(window).on(a.events.resize, function () {
                !0 !== n.expand && (r.isValue(n.expandPoint) && r.mediaExist(n.expandPoint) ? (t.addClass("app-bar-expand"), e._fireEvent("menu-expand")) : (t.removeClass("app-bar-expand"), e._fireEvent("menu-collapse"))), 0 !== i.length && ("block" !== s.css("display") ? (i.show(function () {
                    o(this).removeStyleProperty("display")
                }), s.addClass("hidden")) : (s.removeClass("hidden"), s.hasClass("active") ? i.show().removeClass("collapsed") : i.hide().addClass("collapsed")))
            }, {
                ns: this.id
            })
        },
        close: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.find(".app-bar-menu"),
                s = t.find(".hamburger");
            e._fireEvent("before-menu-close", {
                menu: i[0]
            }), i.slideUp(n.duration, function () {
                i.addClass("collapsed").removeClass("opened"), s.removeClass("active"), e._fireEvent("menu-close", {
                    menu: i[0]
                })
            })
        },
        open: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.find(".app-bar-menu"),
                s = t.find(".hamburger");
            e._fireEvent("before-menu-open", {
                menu: i[0]
            }), i.slideDown(n.duration, function () {
                i.removeClass("collapsed").addClass("opened"), s.addClass("active"), e._fireEvent("menu-open", {
                    menu: i[0]
                })
            })
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return e.off(a.events.click, ".hamburger"), o(window).off(a.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (s, t) {
    "use strict";
    var a = s.utils,
        n = {
            audioVolume: .5,
            audioSrc: "",
            onAudioStart: s.noop,
            onAudioEnd: s.noop,
            onAudioButtonCreate: s.noop
        };
    s.audioButtonSetup = function (e) {
        n = t.extend({}, n, e)
    }, window.metroAudioButtonSetup, s.audioButtonSetup(window.metroAudioButtonSetup), s.Component("audio-button", {
        init: function (e, t) {
            return this._super(t, e, n, {
                audio: null,
                canPlay: null,
                id: a.elementId("audioButton")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("audioButtonCreate", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.options;
            this.audio = new Audio(e.audioSrc), this.audio.volume = e.audioVolume
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = this.audio;
            i.addEventListener("loadeddata", function () {
                e.canPlay = !0
            }), i.addEventListener("ended", function () {
                e._fireEvent("audioEnd", {
                    src: n.audioSrc,
                    audio: i
                })
            }), t.on(s.events.click, function () {
                e.play()
            }, {
                ns: this.id
            })
        },
        play: function (e) {
            var t = this.element,
                n = this.options,
                i = this.audio;
            "" !== n.audioSrc && this.audio.duration && this.canPlay && (this._fireEvent("audioStart", {
                src: n.audioSrc,
                audio: i
            }), i.pause(), i.currentTime = 0, i.play(), a.exec(e, [i], t[0]))
        },
        stop: function (e) {
            var t = this.element,
                n = this.options,
                i = this.audio;
            i.pause(), i.currentTime = 0, this._fireEvent("audioEnd", {
                src: n.audioSrc,
                audio: i
            }), a.exec(e, [i], t[0])
        },
        changeAttribute: function (e) {
            var t, n, i = this.element,
                s = this.options,
                a = this.audio;
            "data-audio-src" === e && (t = i.attr("data-audio-src")) && "" !== t.trim() && (s.audioSrc = t, a.src = t), "data-audio-volume" === e && (n = parseFloat(i.attr("data-audio-volume")), isNaN(n) || (s.audioVolume = n, a.volume = n))
        },
        destroy: function () {
            this.element.off(s.events.click, {
                ns: this.id
            })
        }
    }), s.playSound = function (e) {
        var t, n = "string" == typeof e ? e : e.audioSrc,
            i = e && e.audioVolume ? e.audioVolume : .5;
        n && ((t = new Audio(n)).volume = parseFloat(i), t.addEventListener("loadeddata", function () {
            e && e.onAudioStart && a.exec(e.onAudioStart, [n], this), this.play()
        }), t.addEventListener("ended", function () {
            e && e.onAudioEnd && a.exec(e.onAudioEnd, [null], this)
        }))
    }
}(Metro, m4q),
function (h, p) {
    "use strict";
    var o = h.utils,
        n = {
            audioDeferred: 0,
            playlist: null,
            src: null,
            volume: .5,
            loop: !1,
            autoplay: !1,
            showLoop: !0,
            showPlay: !0,
            showStop: !0,
            showMute: !0,
            showFull: !0,
            showStream: !0,
            showVolume: !0,
            showInfo: !0,
            showPlaylist: !0,
            showNext: !0,
            showPrev: !0,
            showFirst: !0,
            showLast: !0,
            showForward: !0,
            showBackward: !0,
            showShuffle: !0,
            showRandom: !0,
            loopIcon: "<span class='default-icon-loop'></span>",
            stopIcon: "<span class='default-icon-stop'></span>",
            playIcon: "<span class='default-icon-play'></span>",
            pauseIcon: "<span class='default-icon-pause'></span>",
            muteIcon: "<span class='default-icon-mute'></span>",
            volumeLowIcon: "<span class='default-icon-low-volume'></span>",
            volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
            volumeHighIcon: "<span class='default-icon-high-volume'></span>",
            playlistIcon: "<span class='default-icon-playlist'></span>",
            nextIcon: "<span class='default-icon-next'></span>",
            prevIcon: "<span class='default-icon-prev'></span>",
            firstIcon: "<span class='default-icon-first'></span>",
            lastIcon: "<span class='default-icon-last'></span>",
            forwardIcon: "<span class='default-icon-forward'></span>",
            backwardIcon: "<span class='default-icon-backward'></span>",
            shuffleIcon: "<span class='default-icon-shuffle'></span>",
            randomIcon: "<span class='default-icon-random'></span>",
            onPlay: h.noop,
            onPause: h.noop,
            onStop: h.noop,
            onEnd: h.noop,
            onMetadata: h.noop,
            onTime: h.noop,
            onAudioPlayerCreate: h.noop
        };
    h.audioPlayerSetup = function (e) {
        n = p.extend({}, n, e)
    }, window.metroAudioPlayerSetup, h.audioPlayerSetup(window.metroAudioPlayerSetup), h.Component("audio-player", {
        init: function (e, t) {
            return this._super(t, e, n, {
                preloader: null,
                player: null,
                audio: t,
                stream: null,
                volume: null,
                volumeBackup: 0,
                muted: !1
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this._createPlayer(), this._createControls(), this._createEvents(), !0 === t.autoplay && this.play(), this._fireEvent("audio-player-create", {
                element: e,
                player: this.player
            })
        },
        _createPlayer: function () {
            var e = this.element,
                t = this.options,
                n = this.audio,
                i = e.prev(),
                s = e.parent(),
                a = p("<div>").addClass("media-player audio-player " + e[0].className);
            0 === i.length ? s.prepend(a) : a.insertAfter(i), e.appendTo(a), p.each(["muted", "autoplay", "controls", "height", "width", "loop", "poster", "preload"], function () {
                e.removeAttr(this)
            }), e.attr("preload", "auto"), n.volume = t.volume, null !== t.src && this._setSource(t.src), e[0].className = "", this.player = a
        },
        _setSource: function (e) {
            var t = this.element;
            t.find("source").remove(), t.removeAttr("src"), Array.isArray(e) ? p.each(e, function () {
                void 0 !== this.src && p("<source>").attr("src", this.src).attr("type", void 0 !== this.type ? this.type : "").appendTo(t)
            }) : t.attr("src", e)
        },
        _createControls: function () {
            var e, t = this,
                n = this.element,
                i = this.options,
                s = this.elem,
                a = p("<div>").addClass("controls").addClass(i.clsControls).insertAfter(n),
                o = p("<div>").addClass("stream").appendTo(a),
                r = p("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(o),
                l = p("<div>").addClass("load-audio").appendTo(o),
                c = p("<div>").addClass("volume").appendTo(a),
                d = p("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(c),
                u = p("<div>").addClass("info-box").appendTo(a);
            !0 !== i.showInfo && u.hide(), l.activity({
                type: "metro",
                style: "color"
            }), l.hide(0), this.preloader = l, h.makePlugin(r, "slider", {
                clsMarker: "bg-red",
                clsHint: "bg-cyan fg-white",
                clsComplete: "bg-cyan",
                hint: !0,
                onStart: function () {
                    s.paused || s.pause()
                },
                onStop: function (e) {
                    0 < s.seekable.length && (s.currentTime = (t.duration * e / 100).toFixed(0)), s.paused && 0 < s.currentTime && s.play()
                }
            }), this.stream = r, !0 !== i.showStream && o.hide(), h.makePlugin(d, "slider", {
                clsMarker: "bg-red",
                clsHint: "bg-cyan fg-white",
                hint: !0,
                value: 100 * i.volume,
                onChangeValue: function (e) {
                    s.volume = e / 100
                }
            }), this.volume = d, !0 !== i.showVolume && c.hide(), !0 === i.showLoop && (e = p("<button>").attr("type", "button").addClass("button square loop").html(i.loopIcon).appendTo(a)), !0 === i.showPlay && p("<button>").attr("type", "button").addClass("button square play").html(i.playIcon).appendTo(a), !0 === i.showStop && p("<button>").attr("type", "button").addClass("button square stop").html(i.stopIcon).appendTo(a), !0 === i.showMute && p("<button>").attr("type", "button").addClass("button square mute").html(i.muteIcon).appendTo(a), !0 === i.loop && (e.addClass("active"), n.attr("loop", "loop")), this._setVolume(), i.muted && (t.volumeBackup = s.volume, h.getPlugin(t.volume, "slider").val(0), s.volume = 0), u.html("00:00 / 00:00")
        },
        _createEvents: function () {
            var t = this,
                n = this.element,
                i = this.options,
                s = this.elem,
                a = this.player;
            n.on("loadstart", function () {
                t.preloader.fadeIn()
            }), n.on("loadedmetadata", function () {
                t.duration = s.duration.toFixed(0), t._setInfo(0, t.duration), o.exec(i.onMetadata, [s, a], n[0])
            }), n.on("canplay", function () {
                t._setBuffer(), t.preloader.fadeOut()
            }), n.on("progress", function () {
                t._setBuffer()
            }), n.on("timeupdate", function () {
                var e = Math.round(100 * s.currentTime / t.duration);
                t._setInfo(s.currentTime, t.duration), h.getPlugin(t.stream, "slider").val(e), o.exec(i.onTime, [s.currentTime, t.duration, s, a], n[0])
            }), n.on("waiting", function () {
                t.preloader.fadeIn()
            }), n.on("loadeddata", function () {}), n.on("play", function () {
                a.find(".play").html(i.pauseIcon), o.exec(i.onPlay, [s, a], n[0])
            }), n.on("pause", function () {
                a.find(".play").html(i.playIcon), o.exec(i.onPause, [s, a], n[0])
            }), n.on("stop", function () {
                h.getPlugin(t.stream, "slider").val(0), o.exec(i.onStop, [s, a], n[0])
            }), n.on("ended", function () {
                h.getPlugin(t.stream, "slider").val(0), o.exec(i.onEnd, [s, a], n[0])
            }), n.on("volumechange", function () {
                t._setVolume()
            }), a.on(h.events.click, ".play", function () {
                s.paused ? t.play() : t.pause()
            }), a.on(h.events.click, ".stop", function () {
                t.stop()
            }), a.on(h.events.click, ".mute", function () {
                t._toggleMute()
            }), a.on(h.events.click, ".loop", function () {
                t._toggleLoop()
            })
        },
        _toggleLoop: function () {
            var e = this.player.find(".loop");
            0 !== e.length && (e.toggleClass("active"), e.hasClass("active") ? this.element.attr("loop", "loop") : this.element.removeAttr("loop"))
        },
        _toggleMute: function () {
            this.muted = !this.muted, !1 === this.muted ? this.audio.volume = this.volumeBackup : (this.volumeBackup = this.audio.volume, this.audio.volume = 0), h.getPlugin(this.volume, "slider").val(!1 === this.muted ? 100 * this.volumeBackup : 0)
        },
        _setInfo: function (e, t) {
            this.player.find(".info-box").html(o.secondsToFormattedString(Math.round(e)) + " / " + o.secondsToFormattedString(Math.round(t)))
        },
        _setBuffer: function () {
            var e = this.audio.buffered.length ? Math.round(Math.floor(this.audio.buffered.end(0)) / Math.floor(this.audio.duration) * 100) : 0;
            h.getPlugin(this.stream, "slider").buff(e)
        },
        _setVolume: function () {
            var e = this.audio,
                t = this.player,
                n = this.options,
                t = t.find(".mute"),
                e = 100 * e.volume;
            1 < e && e < 30 ? t.html(n.volumeLowIcon) : 30 <= e && e < 60 ? t.html(n.volumeMediumIcon) : 60 <= e && e <= 100 ? t.html(n.volumeHighIcon) : t.html(n.muteIcon)
        },
        play: function (e) {
            void 0 !== e && this._setSource(e), void 0 === this.element.attr("src") && 0 === this.element.find("source").length || this.audio.play()
        },
        pause: function () {
            this.audio.pause()
        },
        resume: function () {
            this.audio.paused && this.play()
        },
        stop: function () {
            this.audio.pause(), this.audio.currentTime = 0, h.getPlugin(this.stream, "slider").val(0)
        },
        setVolume: function (e) {
            if (void 0 === e) return this.audio.volume;
            1 < e && (e /= 100), this.audio.volume = e, h.getPlugin(this.volume, "slider").val(100 * e)
        },
        loop: function () {
            this._toggleLoop()
        },
        mute: function () {
            this._toggleMute()
        },
        changeSource: function () {
            var e = JSON.parse(this.element.attr("data-src"));
            this.play(e)
        },
        changeVolume: function () {
            var e = this.element.attr("data-volume");
            this.setVolume(e)
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-src":
                    this.changeSource();
                    break;
                case "data-volume":
                    this.changeVolume()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.player;
            return e.off("all"), t.off("all"), h.getPlugin(this.stream, "slider").destroy(), h.getPlugin(this.volume, "slider").destroy(), e
        }
    })
}(Metro, m4q),
function (n, i) {
    "use strict";
    var s = n.utils,
        a = {
            bottomsheetDeferred: 0,
            mode: "list",
            toggle: null,
            onOpen: n.noop,
            onClose: n.noop,
            onBottomSheetCreate: n.noop
        };
    n.bottomSheetSetup = function (e) {
        a = i.extend({}, a, e)
    }, window.metroBottomSheetSetup, n.bottomSheetSetup(window.metroBottomSheetSetup), n.Component("bottom-sheet", {
        init: function (e, t) {
            return this._super(t, e, a, {
                toggle: null
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("bottom-sheet-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.addClass("bottom-sheet").addClass(t.mode + "-list"), s.isValue(t.toggle) && 0 < i(t.toggle).length && (this.toggle = i(t.toggle))
        },
        _createEvents: function () {
            var e = this,
                t = this.element;
            s.isValue(this.toggle) && this.toggle.on(n.events.click, function () {
                e.toggle()
            }), t.on(n.events.click, "li", function () {
                e.close()
            })
        },
        isOpen: function () {
            return this.element.hasClass("opened")
        },
        open: function (e) {
            var t = this.element;
            s.isValue(e) && t.removeClass("list-style grid-style").addClass(e + "-style"), this.element.addClass("opened"), this._fireEvent("open", {
                element: t
            })
        },
        close: function () {
            var e = this.element;
            e.removeClass("opened"), this._fireEvent("close", {
                element: e
            })
        },
        toggle: function (e) {
            this.isOpen() ? this.close() : this.open(e)
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return s.isValue(this.toggle) && this.toggle.off(n.events.click), e.off(n.events.click, "li"), e
        }
    }), n.bottomsheet = {
        isBottomSheet: function (e) {
            return s.isMetroObject(e, "bottom-sheet")
        },
        open: function (e, t) {
            if (!this.isBottomSheet(e)) return !1;
            n.getPlugin(e, "bottom-sheet").open(t)
        },
        close: function (e) {
            if (!this.isBottomSheet(e)) return !1;
            n.getPlugin(e, "bottom-sheet").close()
        },
        toggle: function (e, t) {
            if (!this.isBottomSheet(e)) return !1;
            this.isOpen(e) ? this.close(e) : this.open(e, t)
        },
        isOpen: function (e) {
            return !!this.isBottomSheet(e) && n.getPlugin(e, "bottom-sheet").isOpen()
        }
    }
}(Metro, m4q),
function (s, a) {
    "use strict";
    var n = s.utils,
        i = {
            buttongroupDeferred: 0,
            targets: "button",
            clsActive: "",
            requiredButton: !1,
            mode: s.groupMode.ONE,
            onButtonClick: s.noop,
            onButtonGroupCreate: s.noop
        };
    s.buttonGroupSetup = function (e) {
        i = a.extend({}, i, e)
    }, window.metroButtonGroupSetup, s.buttonGroupSetup(window.metroButtonGroupSetup), s.Component("button-group", {
        init: function (e, t) {
            return this._super(t, e, i, {
                active: null,
                id: n.elementId("button-group")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createGroup(), this._createEvents(), this._fireEvent("button-group-create", {
                element: e
            })
        },
        _createGroup: function () {
            var e, t, n = this.element,
                i = this.options;
            n.addClass("button-group"), e = n.find(i.targets), t = n.find(".active"), i.mode === s.groupMode.ONE && 0 === t.length && !0 === i.requiredButton && a(e[0]).addClass("active"), i.mode === s.groupMode.ONE && 1 < t.length && (e.removeClass("active").removeClass(i.clsActive), a(e[0]).addClass("active")), n.find(".active").addClass("js-active").addClass(i.clsActive)
        },
        _createEvents: function () {
            var t = this,
                n = this.element,
                i = this.options;
            n.on(s.events.click, i.targets, function () {
                var e = a(this);
                t._fireEvent("button-click", {
                    button: this
                }), i.mode === s.groupMode.ONE && e.hasClass("active") || (i.mode === s.groupMode.ONE ? (n.find(i.targets).removeClass(i.clsActive).removeClass("active js-active"), e.addClass("active").addClass(i.clsActive).addClass("js-active")) : e.toggleClass("active").toggleClass(i.clsActive).toggleClass("js-active"))
            })
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element,
                t = this.options;
            return e.off(s.events.click, t.targets), e
        }
    })
}(Metro, m4q),
function (u, h) {
    "use strict";
    var c = u.utils,
        i = {
            showGhost: !1,
            events: null,
            startContent: "days",
            showTime: !1,
            initialTime: null,
            initialHours: null,
            initialMinutes: null,
            labelTimeHours: null,
            labelTimeMinutes: null,
            animationContent: !0,
            animationSpeed: 10,
            calendarDeferred: 0,
            dayBorder: !1,
            excludeDay: null,
            prevMonthIcon: "<span class='default-icon-chevron-left'></span>",
            nextMonthIcon: "<span class='default-icon-chevron-right'></span>",
            prevYearIcon: "<span class='default-icon-chevron-left'></span>",
            nextYearIcon: "<span class='default-icon-chevron-right'></span>",
            compact: !1,
            wide: !1,
            widePoint: null,
            pickerMode: !1,
            show: null,
            locale: METRO_LOCALE,
            weekStart: METRO_WEEK_START,
            outside: !0,
            buttons: "cancel, today, clear, done",
            yearsBefore: 100,
            yearsAfter: 100,
            headerFormat: "dddd, MMM DD",
            showHeader: !0,
            showFooter: !0,
            showWeekNumber: !1,
            isDialog: !1,
            ripple: !1,
            rippleColor: "#cccccc",
            exclude: null,
            preset: null,
            minDate: null,
            maxDate: null,
            weekDayClick: !1,
            weekNumberClick: !1,
            multiSelect: !1,
            special: null,
            format: METRO_DATE_FORMAT,
            inputFormat: null,
            clsCalendar: "",
            clsCalendarHeader: "",
            clsCalendarContent: "",
            clsCalendarFooter: "",
            clsCalendarMonths: "",
            clsCalendarYears: "",
            clsToday: "",
            clsSelected: "",
            clsExcluded: "",
            clsCancelButton: "",
            clsTodayButton: "",
            clsClearButton: "",
            clsDoneButton: "",
            clsEventCounter: "",
            clsWeekend: "",
            clsCurrentWeek: "",
            clsCalendarTime: "",
            clsTime: "",
            clsTimeHours: "",
            clsTimeMinutes: "",
            clsTimeButton: "",
            clsTimeButtonPlus: "",
            clsTimeButtonMinus: "",
            clsSpecial: "",
            clsEvents: "",
            clsEvent: "",
            onCancel: u.noop,
            onToday: u.noop,
            onClear: u.noop,
            onDone: u.noop,
            onDayClick: u.noop,
            onDrawDay: u.noop,
            onDrawMonth: u.noop,
            onDrawYear: u.noop,
            onWeekDayClick: u.noop,
            onWeekNumberClick: u.noop,
            onMonthChange: u.noop,
            onYearChange: u.noop,
            onTimeChange: u.noop,
            onHoursChange: u.noop,
            onMinutesChange: u.noop,
            onCalendarCreate: u.noop
        };
    u.calendarSetup = function (e) {
        i = h.extend({}, i, e)
    }, window.metroCalendarSetup, u.calendarSetup(window.metroCalendarSetup), u.Component("calendar", {
        init: function (e, t) {
            var n = datetime().align("day");
            return this._super(t, e, i, {
                today: n,
                show: n,
                current: {
                    year: n.year(),
                    month: n.month(),
                    day: n.day()
                },
                preset: [],
                selected: [],
                exclude: [],
                special: [],
                excludeDay: [],
                events: [],
                min: null,
                max: null,
                locale: null,
                minYear: null,
                maxYear: null,
                id: c.elementId("calendar"),
                time: [datetime().hour(), datetime().minute()],
                content: "days",
                yearDistance: 11,
                yearGroupStart: n.year()
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.content = t.startContent, this.minYear = this.current.year - this.options.yearsBefore, this.maxYear = this.current.year + this.options.yearsAfter, e.html("").addClass("calendar " + (!0 === t.compact ? "compact" : "")).addClass(t.clsCalendar), c.isValue(t.initialTime) && (this.time = t.initialTime.split(":")), c.isValue(t.initialHours) && c.between(t.initialHours, 0, 23, !0) && (this.time[0] = parseInt(t.initialHours)), c.isValue(t.initialMinutes) && c.between(t.initialMinutes, 0, 59, !0) && (this.time[1] = parseInt(t.initialMinutes)), !0 === t.dayBorder && e.addClass("day-border"), c.isValue(t.excludeDay) && (this.excludeDay = ("" + t.excludeDay).toArray(",", "int")), c.isValue(t.preset) && this._dates2array(t.preset, "selected"), c.isValue(t.exclude) && this._dates2array(t.exclude, "exclude"), c.isValue(t.special) && this._dates2array(t.special, "special"), c.isValue(t.events) && this._dates2array(t.events, "events"), !1 !== t.buttons && !1 === Array.isArray(t.buttons) && (t.buttons = t.buttons.split(",").map(function (e) {
                return e.trim()
            })), this.min = t.minDate ? (t.inputFormat ? Datetime.from(t.minDate, t.inputFormat) : datetime(t.minDate)).align("day") : null, this.max = t.maxDate ? (t.inputFormat ? Datetime.from(t.maxDate, t.inputFormat) : datetime(t.maxDate)).align("day") : null, t.show && (this.show = (t.show ? t.inputFormat ? Datetime.from(t.show, t.inputFormat) : datetime(t.show) : datetime()).align("day"), this.current = {
                year: this.show.year(),
                month: this.show.month(),
                day: this.show.day()
            }), this.locale = void 0 !== u.locales[t.locale] ? u.locales[t.locale] : u.locales["en-US"], this._drawCalendar(), this._createEvents(), (!0 === t.wide || !c.isNull(t.widePoint) && c.mediaExist(t.widePoint)) && e.addClass("calendar-wide"), !0 === t.ripple && !1 !== c.isFunc(e.ripple) && e.ripple({
                rippleTarget: ".button, .prev-month, .next-month, .prev-year, .next-year, .day",
                rippleColor: this.options.rippleColor
            }), this._fireEvent("calendar-create")
        },
        _dates2array: function (e, t) {
            var n = this,
                i = this.options;
            c.isNull(e) || (e = "string" == typeof e ? e.toArray() : Array.isArray(e) ? e : [], h.each(e, function () {
                var e;
                try {
                    e = (i.inputFormat ? Datetime.from(this, i.inputFormat) : datetime(this)).align("day").format("YYYY-MM-DD")
                } catch (e) {
                    return
                }
                n[t].push(e)
            }))
        },
        _createEvents: function () {
            var o = this,
                r = this.element,
                l = this.options;
            h(window).on(u.events.resize, function () {
                !0 !== l.wide && (!c.isNull(l.widePoint) && c.mediaExist(l.widePoint) ? r.addClass("calendar-wide") : r.removeClass("calendar-wide"))
            }, {
                ns: this.id
            }), r.on(u.events.click, ".prev-year-group, .next-year-group", function () {
                h(this).hasClass("prev-year-group") ? o.yearGroupStart -= o.yearDistance : o.yearGroupStart += o.yearDistance, o._drawContent()
            }), r.on(u.events.click, ".prev-month, .next-month, .prev-year, .next-year", function () {
                var e, t = h(this);
                t.hasClass("prev-month") && (e = datetime(o.current.year, o.current.month - 1, 1)).year() < o.minYear || t.hasClass("next-month") && (e = datetime(o.current.year, o.current.month + 1, 1)).year() > o.maxYear || t.hasClass("prev-year") && (e = datetime(o.current.year - 1, o.current.month, 1)).year() < o.minYear || t.hasClass("next-year") && (e = datetime(o.current.year + 1, o.current.month, 1)).year() > o.maxYear || (o.current = {
                    year: e.year(),
                    month: e.month(),
                    day: e.day()
                }, setTimeout(function () {
                    o._drawContent(), (t.hasClass("prev-month") || t.hasClass("next-month")) && o._fireEvent("month-change", {
                        current: o.current
                    }), (t.hasClass("prev-year") || t.hasClass("next-year")) && o._fireEvent("year-change", {
                        current: o.current
                    })
                }, l.ripple ? 300 : 1))
            }), r.on(u.events.click, ".button.today", function () {
                o.toDay(), o._fireEvent("today", {
                    today: o.today.val(),
                    time: o.time
                })
            }), r.on(u.events.click, ".button.clear", function () {
                var e = datetime();
                o.selected = [], o.time = [e.hour(), e.minute()], o.yearGroupStart = e.year(), o._drawContent(), o._fireEvent("clear")
            }), r.on(u.events.click, ".button.cancel", function () {
                o._drawContent(), o._fireEvent("cancel")
            }), r.on(u.events.click, ".button.done", function () {
                o._drawContent(), o._fireEvent("done", {
                    selected: o.selected,
                    time: o.time
                })
            }), !0 === l.weekDayClick && r.on(u.events.click, ".week-days .week-day", function (e) {
                for (var t, n = [], i = h(this), s = i.index(), a = 0; a < 7; a++) n.push(s), s += l.showWeekNumber ? 8 : 7;
                !0 === l.multiSelect && (t = r.find(".day").filter(function (e) {
                    e = h(e);
                    return -1 < n.indexOf(e.index()) && !e.hasClass("outside disabled excluded")
                }), h.each(t, function () {
                    var e = h(this),
                        t = e.data("day"); - 1 === o.selected.indexOf(t) ? (o.selected.push(t), e.addClass("selected").addClass(l.clsSelected)) : (e.removeClass("selected").removeClass(l.clsSelected), c.arrayDelete(o.selected, t))
                })), o._fireEvent("week-day-click", {
                    selected: o.selected,
                    day: i[0]
                }), e.preventDefault(), e.stopPropagation()
            }), l.weekNumberClick && r.on(u.events.click, ".week-number", function (e) {
                var t, n = h(this),
                    i = n.text(),
                    s = n.index();
                "#" !== i && (!0 === l.multiSelect && (t = r.find(".day").filter(function (e) {
                    var t = h(e),
                        e = t.index();
                    return c.between(e, s, s + 8, !1) && !t.hasClass("outside disabled excluded")
                }), h.each(t, function () {
                    var e = h(this),
                        t = e.data("day"); - 1 === o.selected.indexOf(t) ? (o.selected.push(t), e.addClass("selected").addClass(l.clsSelected)) : (e.removeClass("selected").removeClass(l.clsSelected), c.arrayDelete(o.selected, t))
                })), o._fireEvent("week-number-click", {
                    selected: o.selected,
                    num: i,
                    numElement: n[0]
                }), e.preventDefault(), e.stopPropagation())
            }), r.on(u.events.click, ".day", function (e) {
                var t = h(this),
                    n = t.data("day"),
                    i = o.selected.indexOf(n);
                if (t.hasClass("outside")) return n = datetime(n), o.current = {
                    year: n.year(),
                    month: n.month(),
                    day: n.day()
                }, o._drawContent(), void o._fireEvent("month-change", {
                    current: o.current
                });
                t.hasClass("disabled") || (!0 === l.pickerMode ? (o.selected = [n], o.today = datetime(n), o.current.year = o.today.year(), o.current.month = o.today.month(), o.current.day = o.today.day(), o._drawHeader(), o._drawContent()) : -1 === i ? (!1 === l.multiSelect && (r.find(".day").removeClass("selected").removeClass(l.clsSelected), o.selected = []), o.selected.push(n), t.addClass("selected").addClass(l.clsSelected)) : (t.removeClass("selected").removeClass(l.clsSelected), c.arrayDelete(o.selected, n))), o._fireEvent("day-click", {
                    selected: o.selected,
                    day: t[0],
                    time: o.time
                }), e.preventDefault(), e.stopPropagation()
            }), r.on(u.events.click, ".curr-month", function (e) {
                o.content = "months", o._drawContent(), e.preventDefault(), e.stopPropagation()
            }), r.on(u.events.click, ".month", function (e) {
                o.current.month = parseInt(h(this).attr("data-month")), o.content = "days", o._drawContent(), o._fireEvent("month-change", {
                    current: o.current
                }), e.preventDefault(), e.stopPropagation()
            }), r.on(u.events.click, ".curr-year", function (e) {
                "years" !== o.content && (o.content = "years", o._drawContent(), e.preventDefault(), e.stopPropagation())
            }), r.on(u.events.click, ".year", function (e) {
                o.current.year = parseInt(h(this).attr("data-year")), o.yearGroupStart = o.current.year, o.content = "months", o._drawContent(), o._fireEvent("year-change", {
                    current: o.current
                }), e.preventDefault(), e.stopPropagation()
            })
        },
        _drawHeader: function () {
            var e = this.element,
                t = this.options,
                n = e.find(".calendar-header");
            0 === n.length && (n = h("<div>").addClass("calendar-header").addClass(t.clsCalendarHeader).appendTo(e)), n.html(""), h("<div>").addClass("header-year").html(this.today.year()).appendTo(n), h("<div>").addClass("header-day").html(this.today.format(t.headerFormat, t.locale)).appendTo(n), !1 === t.showHeader && n.hide()
        },
        _drawFooter: function () {
            var e = this.element,
                t = this.options,
                n = this.locale.buttons,
                i = e.find(".calendar-footer");
            !1 !== t.buttons && (0 === i.length && (i = h("<div>").addClass("calendar-footer").addClass(t.clsCalendarFooter).appendTo(e)), i.html(""), h.each(t.buttons, function () {
                var e = h("<button>").attr("type", "button").addClass("button " + this + " " + t["cls" + Cake.capitalize(this) + "Button"]).html(n[this]).appendTo(i);
                "cancel" !== this && "done" !== this || e.addClass("js-dialog-close")
            }), !1 === t.showFooter && i.hide())
        },
        _drawTime: function () {
            var t = this,
                e = this.element,
                n = this.options,
                i = e.find(".calendar-content"),
                s = h("<div>").addClass("calendar-time").addClass(n.clsCalendarTime).appendTo(i),
                a = "" + this.time[0],
                o = "" + this.time[1],
                r = this.locale.calendar.time;
            s.append(e = h("<div>").addClass("calendar-time__inner")), e.append(i = h("<div>").addClass("calendar-time__inner-row")), i.append(h("<div>").addClass("calendar-time__inner-cell").append(h("<span>").html(n.labelTimeHours || r.hours))), i.append(h("<div>").addClass("calendar-time__inner-cell").append(h("<span>").html(n.labelTimeMinutes || r.minutes))), s.append(e = h("<div>").addClass("calendar-time__inner spinners").addClass(n.clsTime)), e.append(i = h("<input type='text' data-cls-spinner-input='" + n.clsTimeHours + "' data-time-part='hours' data-buttons-position='right' data-min-value='0' data-max-value='23'>").addClass("hours").addClass(n.compact ? "input-small" : "input-normal")), e.append(r = h("<input type='text' data-cls-spinner-input='" + n.clsTimeMinutes + "' data-time-part='minutes' data-buttons-position='right' data-min-value='0' data-max-value='59'>").addClass("minutes").addClass(n.compact ? "input-small" : "input-normal")), a = Cake.lpad(a, 2, "0"), o = Cake.lpad(o, 2, "0"), i.val(a), r.val(o), u.makePlugin(e.find("input[type=text]"), "spinner", {
                onChange: function (e) {
                    e = parseInt(e);
                    "hours" === h(this).attr("data-time-part") ? (t.time[0] = e, t._fireEvent("hours-change", {
                        time: t.time,
                        hours: e
                    })) : (t.time[1] = e, t._fireEvent("minutes-change", {
                        time: t.time,
                        minutes: e
                    })), t._fireEvent("time-change", {
                        time: t.time
                    })
                },
                clsSpinnerButton: n.clsTimeButton,
                clsSpinnerButtonPlus: n.clsTimeButtonPlus,
                clsSpinnerButtonMinus: n.clsTimeButtonMinus
            }), !1 === n.showTime && s.hide()
        },
        _drawContentDays: function () {
            var e, a, o = this,
                t = this.element,
                r = this.options,
                n = t.find(".calendar-content"),
                l = datetime(this.current.year, this.current.month, this.current.day).useLocale(r.locale).calendar(r.weekStart),
                i = Datetime.getLocale(r.locale),
                c = this.show.format("YYYY-MM-DD"),
                d = datetime();
            0 === n.length && (n = h("<div>").addClass("calendar-content").addClass(r.clsCalendarContent).appendTo(t)), r.showWeekNumber && n.addClass("-week-numbers"), n.empty(), t = h("<div>").addClass("calendar-toolbar").appendTo(n), h("<span>").addClass("prev-month").html(r.prevMonthIcon).appendTo(t), h("<span>").addClass("curr-month").html(i.months[this.current.month]).appendTo(t), h("<span>").addClass("next-month").html(r.nextMonthIcon).appendTo(t), h("<span>").addClass("prev-year").html(r.prevYearIcon).appendTo(t), h("<span>").addClass("curr-year").html(this.current.year).appendTo(t), h("<span>").addClass("next-year").html(r.nextYearIcon).appendTo(t), e = h("<div>").addClass("week-days").appendTo(n), r.showWeekNumber && h("<span>").addClass("week-number").html("#").appendTo(e), h.each(l.weekdays, function () {
                h("<span>").addClass("week-day").html(this).appendTo(e)
            }), a = h("<div>").addClass("days").appendTo(n), h.each(l.days, function (e) {
                var t = this,
                    n = datetime(t).align("day"),
                    i = n.month() !== o.current.month;
                r.showWeekNumber && e % 7 == 0 && h("<span>").addClass("week-number").html(n.weekNumber(r.weekStart)).appendTo(a);
                var s, e = h("<span>").addClass("day").html(n.day()).appendTo(a);
                e.data("day", t), t === c && e.addClass("showed"), i && (e.addClass("outside"), r.outside || e.empty()), t === l.today && e.addClass("today"), r.showGhost && n.day() === d.day() && e.addClass("coincidental"), o.special.length ? -1 === o.special.indexOf(t) ? e.addClass("disabled excluded").addClass(r.clsExcluded) : e.addClass(r.clsSpecial) : (-1 < o.selected.indexOf(t) && e.addClass("selected").addClass(r.clsSelected), -1 < o.exclude.indexOf(t) && e.addClass("disabled excluded").addClass(r.clsExcluded), o.min && n.older(o.min) && e.addClass("disabled excluded").addClass(r.clsExcluded), o.max && n.younger(o.max) && e.addClass("disabled excluded").addClass(r.clsExcluded)), -1 !== l.weekends.indexOf(t) && e.addClass(r.clsWeekend), -1 !== l.week.indexOf(t) && e.addClass(r.clsCurrentWeek), o.events.length && (s = h("<div>").addClass("events").addClass(r.clsEvents).appendTo(e), h.each(o.events, function () {
                    var e;
                    this === t && (e = h("<div>").addClass("event").addClass(r.clsEvent).appendTo(s), r.clsEvent || e.css({
                        backgroundColor: u.colors.random()
                    }))
                })), r.animationContent && e.addClass("to-animate"), o._fireEvent("draw-day", {
                    date: n.val(),
                    day: n.day(),
                    month: n.month(),
                    year: n.year(),
                    cell: e[0]
                })
            }), this._drawTime(), this._animateContent(".day")
        },
        _drawContentMonths: function () {
            var e, t, n = this.element,
                i = this.options,
                s = n.find(".calendar-content"),
                a = this.locale.calendar.months,
                o = datetime().year(),
                r = datetime().month();
            0 === s.length && (s = h("<div>").addClass("calendar-content").addClass(i.clsCalendarContent).appendTo(n)), s.clear(), n = h("<div>").addClass("calendar-toolbar").appendTo(s), h("<span>").addClass("prev-year").html(i.prevYearIcon).appendTo(n), h("<span>").addClass("curr-year").html(this.current.year).appendTo(n), h("<span>").addClass("next-year").html(i.nextYearIcon).appendTo(n), s.append(e = h("<div>").addClass("months"));
            for (var l = 12; l < 24; l++) e.append(t = h("<div>").attr("data-month", l - 12).addClass("month").addClass(l - 12 === r && this.current.year === o ? "today" : "").html(a[l])), i.animationContent && t.addClass("to-animate"), this._fireEvent("draw-month", {
                month: l - 12,
                year: this.current.year,
                cell: t[0]
            });
            this._animateContent(".months .month")
        },
        _drawContentYears: function () {
            var e, t, n = this.element,
                i = this.options,
                s = n.find(".calendar-content");
            0 === s.length && (s = h("<div>").addClass("calendar-content").addClass(i.clsCalendarContent).appendTo(n)), s.clear(), n = h("<div>").addClass("calendar-toolbar").appendTo(s), h("<span>").addClass("prev-year-group").html(i.prevYearIcon).appendTo(n), h("<span>").addClass("curr-year").html(this.yearGroupStart + " - " + (this.yearGroupStart + this.yearDistance)).appendTo(n), h("<span>").addClass("next-year-group").html(i.nextYearIcon).appendTo(n), s.append(e = h("<div>").addClass("years"));
            for (var a = this.yearGroupStart; a <= this.yearGroupStart + this.yearDistance; a++) e.append(t = h("<div>").attr("data-year", a).addClass("year").addClass(a === this.current.year ? "today" : "").html(a)), i.animationContent && t.addClass("to-animate"), (a < i.minYear || a > i.maxYear) && t.addClass("disabled"), this._fireEvent("draw-year", {
                year: a,
                cell: t[0]
            });
            this._animateContent(".years .year")
        },
        _drawContent: function () {
            switch (this.content) {
                case "years":
                    this._drawContentYears();
                    break;
                case "months":
                    this._drawContentMonths();
                    break;
                default:
                    this._drawContentDays()
            }
        },
        _drawCalendar: function () {
            var e = this;
            setTimeout(function () {
                e.element.html(""), e._drawHeader(), e._drawContent(), e._drawFooter()
            }, 0)
        },
        _animateContent: function (e, n) {
            var t = this.element,
                i = this.options,
                t = t.find(".calendar-content");
            n = n || "to-animate", t.find(e).each(function (e) {
                var t = h(this);
                setTimeout(function () {
                    t.removeClass(n)
                }, i.animationSpeed * e)
            })
        },
        getTime: function (e) {
            var t, n;
            return e = e || !1, t = Cake.lpad(this.time[0], 2, "0"), n = Cake.lpad(this.time[1], 2, "0"), e ? t + ":" + n : this.time
        },
        setTime: function (e) {
            Array.isArray(e) ? this.time = e : this.time = e.split(":"), this._drawCalendar()
        },
        getPreset: function () {
            return this.preset
        },
        getSelected: function () {
            return this.selected
        },
        getExcluded: function () {
            return this.exclude
        },
        getToday: function () {
            return this.today
        },
        getCurrent: function () {
            return this.current
        },
        clearSelected: function () {
            this.selected = [], this._drawContent()
        },
        toDay: function () {
            this.today = datetime().align("day"), this.current = {
                year: this.today.year(),
                month: this.today.month(),
                day: this.today.day()
            }, this.time = [datetime().hour(), datetime().minute()], this.yearGroupStart = datetime().year(), this.content = "days", this._drawHeader(), this._drawContent()
        },
        setExclude: function (e) {
            var t = this.element,
                n = this.options;
            c.isNull(e) && c.isNull(t.attr("data-exclude")) || (n.exclude = c.isNull(e) ? t.attr("data-exclude") : e, this._dates2array(n.exclude, "exclude"), this._drawContent())
        },
        setPreset: function (e) {
            var t = this.element,
                n = this.options;
            c.isNull(e) && c.isNull(t.attr("data-preset")) || (n.preset = c.isNull(e) ? t.attr("data-preset") : e, this._dates2array(n.preset, "selected"), this._drawContent())
        },
        setSpecial: function (e) {
            var t = this.element,
                n = this.options;
            c.isNull(e) && c.isNull(t.attr("data-special")) || (n.special = c.isNull(e) ? t.attr("data-special") : e, this._dates2array(n.exclude, "special"), this._drawContent())
        },
        showDate: function (e) {
            return this.setShow(e)
        },
        setShow: function (e) {
            var t = this.element,
                n = this.options,
                t = t.attr("data-show");
            (e || t) && (n.show = e || t, n.show ? "string" == typeof n.show && n.inputFormat ? this.show = Datetime.from(n.show, n.inputFormat) : this.show = datetime(n.show) : this.show = datetime(), this.show = this.show.align("day"), this.current = {
                year: this.show.year(),
                month: this.show.month(),
                day: this.show.day()
            }, this._drawContent())
        },
        setMinDate: function (e) {
            var t = this.element,
                n = this.options,
                t = t.attr("data-min-date");
            (e || t) && (n.minDate = e || t, this.min = n.minDate ? (n.inputFormat ? Datetime.from(n.minDate, n.inputFormat) : datetime(n.minDate)).align("day") : null, this._drawContent())
        },
        setMaxDate: function (e) {
            var t = this.element,
                n = this.options,
                t = t.attr("data-max-date");
            n.maxDate = e || t, this.max = n.maxDate ? (n.inputFormat ? Datetime.from(n.maxDate, n.inputFormat) : datetime(n.maxDate)).align("day") : null, this._drawContent()
        },
        i18n: function (e) {
            var t = this.options;
            return void 0 === e ? t.locale : void 0 !== u.locales[e] && (t.locale = e, this.locale = u.locales[t.locale], void this._drawCalendar())
        },
        changeAttrLocale: function () {
            var e = this.element;
            this.i18n(e.attr("data-locale"))
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-exclude":
                    this.setExclude();
                    break;
                case "data-preset":
                    this.setPreset();
                    break;
                case "data-special":
                    this.setSpecial();
                    break;
                case "data-show":
                    this.setShow();
                    break;
                case "data-min-date":
                    this.setMinDate();
                    break;
                case "data-max-date":
                    this.setMaxDate();
                    break;
                case "data-locale":
                    this.changeAttrLocale()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.options;
            return e.off(u.events.click, ".prev-month, .next-month, .prev-year, .next-year"), e.off(u.events.click, ".button.today"), e.off(u.events.click, ".button.clear"), e.off(u.events.click, ".button.cancel"), e.off(u.events.click, ".button.done"), e.off(u.events.click, ".week-days .day"), e.off(u.events.click, ".days-row .day"), e.off(u.events.click, ".curr-month"), e.off(u.events.click, ".calendar-months li"), e.off(u.events.click, ".curr-year"), e.off(u.events.click, ".calendar-years li"), e.off(u.events.click), !0 === t.ripple && e.data("ripple").destroy(), h(window).off(u.events.resize, {
                ns: this.id
            }), e
        }
    }), h(document).on(u.events.click, function () {
        h(".calendar .calendar-years").each(function () {
            h(this).removeClass("open")
        }), h(".calendar .calendar-months").each(function () {
            h(this).removeClass("open")
        })
    }), u.defaults.Calendar = i
}(Metro, m4q),
function (u, h) {
    "use strict";
    var p = u.utils,
        n = {
            label: "",
            value: "",
            calendarpickerDeferred: 0,
            nullValue: !0,
            useNow: !1,
            prepend: "",
            dialogMode: !1,
            dialogPoint: 640,
            dialogOverlay: !0,
            overlayColor: "#000000",
            overlayAlpha: .5,
            locale: METRO_LOCALE,
            size: "100%",
            format: METRO_DATE_FORMAT,
            inputFormat: null,
            clearButton: !1,
            calendarButtonIcon: "<span class='default-icon-calendar'></span>",
            clearButtonIcon: "<span class='default-icon-cross'></span>",
            copyInlineStyles: !1,
            clsPicker: "",
            clsInput: "",
            clsPrepend: "",
            clsLabel: "",
            onDayClick: u.noop,
            onCalendarPickerCreate: u.noop,
            onCalendarShow: u.noop,
            onCalendarHide: u.noop,
            onChange: u.noop,
            onPickerChange: u.noop,
            onMonthChange: u.noop,
            onYearChange: u.noop
        };
    u.calendarPickerSetup = function (e) {
        n = h.extend({}, n, e)
    }, window.metroCalendarPickerSetup, u.calendarPickerSetup(window.metroCalendarPickerSetup), u.Component("calendar-picker", {
        init: function (e, t) {
            return this._super(t, e, h.extend({}, u.defaults.Calendar, {}, n), {
                value: null,
                value_date: null,
                calendar: null,
                overlay: null,
                id: p.elementId("calendar-picker"),
                time: [datetime().hour(), datetime().minute()]
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("calendar-picker-create", {
                element: this.element
            })
        },
        _createStructure: function () {
            var e, t, n, i, a = this,
                o = this.element,
                r = this.options,
                s = h("<div>").addClass("input " + o[0].className + " calendar-picker"),
                l = h("<div>").addClass("button-group"),
                c = h("<div>").addClass("drop-shadow"),
                d = h("body");
            o.attr("type", "text"), o.attr("autocomplete", "off"), o.attr("readonly", !0), p.isValue(r.initialTime) && (this.time = r.initialTime.trim().split(":")), p.isValue(r.initialHours) && (this.time[0] = parseInt(r.initialHours)), p.isValue(r.initialHours) && (this.time[1] = parseInt(r.initialMinutes)), i = "" !== ("" + r.value).trim() ? r.value : o.val().trim(), p.isValue(i) ? (e = i.split(" "), this.value = (r.inputFormat ? Datetime.from(e[0], r.inputFormat, r.locale) : datetime(e[0])).align("day"), e[1] && (this.time = e[1].trim().split(":"))) : r.useNow && (this.value = datetime(), this.time = [this.value.hour(), this.value.minute()]), i = i || !0 !== r.nullValue ? datetime(a.value).format(r.format, r.locale) : "", r.showTime && this.time && i && (i += " " + Cake.lpad(this.time[0], 2, "0") + ":" + Cake.lpad(this.time[1], 2, "0")), o.val(i), s.insertBefore(o), o.appendTo(s), l.appendTo(s), c.appendTo(r.dialogMode ? d : s), this.time && this.time.length && (t = this.time[0], void 0 !== this.time[1] && (n = this.time[1])), d = r.initialTime, r.initialHours && (t = r.initialHours), r.initialHours && (n = r.initialMinutes), u.makePlugin(c, "calendar", {
                showTime: r.showTime,
                initialTime: d,
                initialHours: t,
                initialMinutes: n,
                clsCalendarTime: r.clsCalendarTime,
                clsTime: r.clsTime,
                clsTimeHours: r.clsTimeHours,
                clsTimeMinutes: r.clsTimeMinutes,
                clsTimeButton: r.clsTimeButton,
                clsTimeButtonPlus: r.clsTimeButtonPlus,
                clsTimeButtonMinus: r.clsTimeButtonMinus,
                wide: r.wide,
                widePoint: r.widePoint,
                format: r.format,
                inputFormat: r.inputFormat,
                pickerMode: !0,
                show: r.value,
                locale: r.locale,
                weekStart: r.weekStart,
                outside: r.outside,
                buttons: !1,
                headerFormat: r.headerFormat,
                clsCalendar: [r.clsCalendar, "calendar-for-picker", r.dialogMode ? "dialog-mode" : ""].join(" "),
                clsCalendarHeader: r.clsCalendarHeader,
                clsCalendarContent: r.clsCalendarContent,
                clsCalendarFooter: "d-none",
                clsCalendarMonths: r.clsCalendarMonths,
                clsCalendarYears: r.clsCalendarYears,
                clsToday: r.clsToday,
                clsSelected: r.clsSelected,
                clsExcluded: r.clsExcluded,
                ripple: r.ripple,
                rippleColor: r.rippleColor,
                exclude: r.exclude,
                minDate: r.minDate,
                maxDate: r.maxDate,
                yearsBefore: r.yearsBefore,
                yearsAfter: r.yearsAfter,
                special: r.special,
                events: r.events,
                showHeader: !1,
                showFooter: !1,
                multiSelect: !1,
                showWeekNumber: r.showWeekNumber,
                onDayClick: function (e, t, n, i) {
                    var s = datetime(e[0]).align("day");
                    a._removeOverlay(), a.value = s, a.time = n, s = s.format(r.format, r.locale), r.showTime && (s += " " + Cake.lpad(n[0], 2, "0") + ":" + Cake.lpad(n[1], 2, "0")), o.val(s), o.trigger("change"), c.removeClass("open open-up"), c.hide(), a._fireEvent("change", {
                        val: a.value.val(),
                        time: a.time
                    }), a._fireEvent("day-click", {
                        sel: e,
                        day: t,
                        time: n,
                        el: i
                    }), a._fireEvent("picker-change", {
                        val: a.value.val(),
                        time: a.time
                    })
                },
                onTimeChange: function (e) {
                    var t;
                    a.time = e, a.value || (a.value = datetime()), t = a.value.format(r.format, r.locale), r.showTime && (t += " " + Cake.lpad(e[0], 2, "0") + ":" + Cake.lpad(e[1], 2, "0")), o.val(t), a._fireEvent("change", {
                        val: a.value.val(),
                        time: a.time
                    }), a._fireEvent("picker-change", {
                        val: a.value.val(),
                        time: a.time
                    })
                },
                onMonthChange: r.onMonthChange,
                onYearChange: r.onYearChange
            }), this.calendar = c, !0 === r.clearButton && h("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(r.clearButtonIcon).appendTo(l), h("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(r.calendarButtonIcon).appendTo(l), "" !== r.prepend && h("<div>").html(r.prepend).addClass("prepend").addClass(r.clsPrepend).appendTo(s), "rtl" === o.attr("dir") && s.addClass("rtl"), -1 < String(r.size).indexOf("%") ? s.css({
                width: r.size
            }) : s.css({
                width: parseInt(r.size) + "px"
            }), !(o[0].className = "") === r.copyInlineStyles && h.each(p.getInlineStyles(o), function (e, t) {
                s.css(e, t)
            }), s.addClass(r.clsPicker), o.addClass(r.clsInput), !0 === r.dialogOverlay && (this.overlay = a._overlay()), !0 === r.dialogMode ? s.addClass("dialog-mode") : p.media("(max-width: " + r.dialogPoint + "px)") && (s.addClass("dialog-mode"), this.calendar.addClass("dialog-mode")), r.label && (l = h("<label>").addClass("label-for-input").addClass(r.clsLabel).html(r.label).insertBefore(s), o.attr("id") && l.attr("for", o.attr("id")), "rtl" === o.attr("dir") && l.addClass("rtl")), o.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var i = this,
                t = this.element,
                s = this.options,
                a = t.parent(),
                e = a.find(".input-clear-button"),
                o = this.calendar,
                r = u.getPlugin(o[0], "calendar"),
                n = this.calendar;
            h(window).on(u.events.resize, function () {
                !0 !== s.dialogMode && (p.media("(max-width: " + s.dialogPoint + "px)") ? (a.addClass("dialog-mode"), n.appendTo("body").addClass("dialog-mode")) : (a.removeClass("dialog-mode"), n.appendTo(a).removeClass("dialog-mode")))
            }, {
                ns: this.id
            }), 0 < e.length && e.on(u.events.click, function (e) {
                t.val("").trigger("change").blur(), i.value = null, e.preventDefault(), e.stopPropagation()
            }), a.on(u.events.click, "button, input", function (e) {
                var t = i.value || datetime(),
                    n = s.inputFormat ? t.format(s.inputFormat) : t.format("YYYY-MM-DD");
                t.align("day"), !1 === o.hasClass("open") && !1 === o.hasClass("open-up") ? (h(".calendar-picker .calendar").removeClass("open open-up").hide(), r.setPreset([n]), r.setShow(t), a.hasClass("dialog-mode") && i.overlay.appendTo(h("body")), o.addClass("open"), p.inViewport(o[0]) || o.addClass("open-up"), i._fireEvent("calendar-show", {
                    calendar: o
                })) : (i._removeOverlay(), o.removeClass("open open-up"), i._fireEvent("calendar-hide", {
                    calendar: o
                })), e.preventDefault(), e.stopPropagation()
            }), t.on(u.events.blur, function () {
                a.removeClass("focused")
            }), t.on(u.events.focus, function () {
                a.addClass("focused")
            }), t.on(u.events.change, function () {
                p.exec(s.onChange, [i.value.val()], t[0])
            }), a.on(u.events.click, function (e) {
                e.preventDefault(), e.stopPropagation()
            })
        },
        _overlay: function () {
            var e = this.options,
                t = h("<div>");
            return t.addClass("overlay for-calendar-picker").addClass(e.clsOverlay), "transparent" === e.overlayColor ? t.addClass("transparent") : t.css({
                background: u.colors.toRGBA(e.overlayColor, e.overlayAlpha)
            }), t
        },
        _removeOverlay: function () {
            h("body").find(".overlay.for-calendar-picker").remove()
        },
        clear: function () {
            this.value = datetime(), this.time = [datetime().hour(), datetime().minute()], this.element.val("")
        },
        val: function (e, t) {
            var n = this.element,
                i = this.options;
            if (0 === arguments.length || p.isNull(e)) return {
                date: this.value.val(),
                time: this.time
            };
            if ("" === e) return this.clear();
            t && (i.inputFormat = t);
            var e = e.split(" ");
            this.value = i.inputFormat ? Datetime.from(e[0], i.inputFormat, i.locale) : datetime(e[0]), e[1] && (this.time = e[1].trim().split(":")), this.value.align("day"), u.getPlugin(this.calendar, "calendar").setTime(this.time), e = this.value.format(i.format), i.showTime && this.time && e && (e += " " + Cake.lpad(this.time[0], 2, "0") + ":" + Cake.lpad(this.time[1], 2, "0")), n.val(e), n.trigger("change")
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        i18n: function (e) {
            var t = this.options,
                n = this.calendar;
            return void 0 === e ? t.locale : void 0 !== u.locales[e] && ((t = n[0].hidden) && n.css({
                visibility: "hidden",
                display: "block"
            }), u.getPlugin(n[0], "calendar").i18n(e), void(t && n.css({
                visibility: "visible",
                display: "none"
            })))
        },
        getTime: function (e) {
            var t, n;
            return e = e || !1, t = Cake.lpad(this.time[0], 2, "0"), n = Cake.lpad(this.time[1], 2, "0"), e ? t + ":" + n : this.time
        },
        changeAttribute: function (e, t) {
            var n = u.getPlugin(this.calendar[0], "calendar");
            switch (e) {
                case "value":
                    this.val(t);
                    break;
                case "disabled":
                    this.toggleState();
                    break;
                case "data-locale":
                    this.i18n(t);
                    break;
                case "data-special":
                    n.setSpecial(t);
                    break;
                case "data-exclude":
                    n.setExclude(t);
                    break;
                case "data-min-date":
                    n.setMinDate(t);
                    break;
                case "data-max-date":
                    n.setMaxDate(t);
                    break;
                case "data-value":
                    this.val(t)
            }
        },
        destroy: function () {
            var e = this.element,
                t = e.parent(),
                n = t.find(".input-clear-button");
            return h(window).off(u.events.resize, {
                ns: this.id
            }), n.off(u.events.click), t.off(u.events.click, "button, input"), e.off(u.events.blur), e.off(u.events.focus), e.off(u.events.change), u.getPlugin(this.calendar, "calendar").destroy(), e
        }
    }), h(document).on(u.events.click, ".overlay.for-calendar-picker", function () {
        h(this).remove(), h(".calendar-for-picker.open").removeClass("open open-up")
    }), h(document).on(u.events.click, function () {
        h(".calendar-picker .calendar").removeClass("open open-up")
    })
}(Metro, m4q),
function (f, a) {
    "use strict";
    var o = f.utils,
        m = ["slide", "slide-v", "fade", "switch", "zoom", "swirl"],
        n = {
            carouselDeferred: 0,
            autoStart: !1,
            width: "100%",
            height: "16/9",
            effect: m[0],
            effectFunc: "linear",
            direction: "left",
            duration: METRO_ANIMATION_DURATION,
            period: 5e3,
            stopOnMouse: !0,
            controls: !0,
            bullets: !0,
            bulletsStyle: "square",
            bulletsSize: "default",
            controlsOnMouse: !1,
            controlsOutside: !1,
            bulletsPosition: "default",
            controlPrev: "&#x23F4",
            controlNext: "&#x23F5",
            clsCarousel: "",
            clsSlides: "",
            clsSlide: "",
            clsControls: "",
            clsControlNext: "",
            clsControlPrev: "",
            clsBullets: "",
            clsBullet: "",
            clsBulletOn: "",
            clsThumbOn: "",
            onStop: f.noop,
            onStart: f.noop,
            onPlay: f.noop,
            onSlideClick: f.noop,
            onBulletClick: f.noop,
            onThumbClick: f.noop,
            onMouseEnter: f.noop,
            onMouseLeave: f.noop,
            onNextClick: f.noop,
            onPrevClick: f.noop,
            onSlideShow: f.noop,
            onSlideHide: f.noop,
            onCarouselCreate: f.noop
        };
    f.carouselSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroCarouselSetup, f.carouselSetup(window.metroCarouselSetup), f.Component("carousel", {
        init: function (e, t) {
            return this._super(t, e, n, {
                height: 0,
                width: 0,
                slides: [],
                current: null,
                currentIndex: null,
                dir: "left",
                interval: !1,
                isAnimate: !1,
                id: o.elementId("carousel")
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options,
                n = e.find(".slide"),
                i = e.find(".slides");
            this.dir = this.options.direction, e.addClass("carousel").addClass(t.clsCarousel), e.css({
                maxWidth: t.width
            }), !0 === t.controlsOutside && e.addClass("controls-outside"), 0 === i.length && (i = a("<div>").addClass("slides").appendTo(e), n.appendTo(i)), n.addClass(t.clsSlides), 0 < n.length && (this._createSlides(), this._createControls(), this._createBullets(), this._createEvents(), this._resize(), !0 === t.controlsOnMouse && (e.find("[class*=carousel-switch]").fadeOut(0), e.find(".carousel-bullets").fadeOut(0)), !0 === t.autoStart ? this._start() : this._fireEvent("slide-show", {
                current: this.slides[this.currentIndex][0],
                prev: void 0
            })), this._fireEvent("carousel-create", {
                element: e
            })
        },
        _start: function () {
            var t = this,
                e = this.element,
                n = this.options,
                i = n.period,
                s = this.slides[this.currentIndex];
            void 0 !== s.data("period") && (i = s.data("period")), this.slides.length <= 1 || (!1 === this.interval && (this.interval = setTimeout(function () {
                var e = "left" === n.direction ? "next" : "prior";
                t._slideTo(e, !0)
            }, i)), this._fireEvent("start", {
                element: e
            }))
        },
        _stop: function () {
            clearInterval(this.interval), this.interval = !1
        },
        _resize: function () {
            var t, e, n = this.element,
                i = this.options,
                s = n.outerWidth(); - 1 < ["16/9", "21/9", "4/3"].indexOf(i.height) ? t = o.aspectRatioH(s, i.height) : -1 < String(i.height).indexOf("@") ? (e = i.height.substr(1).toArray("|"), a.each(e, function () {
                var e = this.toArray(",");
                window.matchMedia(e[0]).matches && (t = -1 < ["16/9", "21/9", "4/3"].indexOf(e[1]) ? o.aspectRatioH(s, e[1]) : parseInt(e[1]))
            })) : t = parseInt(i.height), n.css({
                height: t
            })
        },
        _createSlides: function () {
            var n = this,
                e = this.element,
                i = this.options,
                e = e.find(".slide");
            a.each(e, function (e) {
                var t = a(this);
                if (void 0 !== t.data("cover") && t.css({
                        backgroundImage: "url(" + t.data("cover") + ")"
                    }), 0 !== e) switch (i.effect) {
                    case "switch":
                    case "slide":
                        t.css("left", "100%");
                        break;
                    case "slide-v":
                        t.css("top", "100%");
                        break;
                    case "fade":
                    case "zoom":
                    case "swirl":
                        t.css("opacity", "0")
                } else t.addClass("active-slide");
                t.addClass(i.clsSlide), n.slides.push(t)
            }), this.currentIndex = 0, this.current = this.slides[this.currentIndex]
        },
        _createControls: function () {
            var e, t, n = this.element,
                i = this.options;
            !1 !== i.controls && (e = a("<span/>").addClass("carousel-switch-next").addClass(i.clsControls).addClass(i.clsControlNext).html(">"), t = a("<span/>").addClass("carousel-switch-prev").addClass(i.clsControls).addClass(i.clsControlPrev).html("<"), i.controlNext && e.html(i.controlNext), i.controlPrev && t.html(i.controlPrev), e.appendTo(n), t.appendTo(n))
        },
        _createBullets: function () {
            var e, t, n = this.element,
                i = this.options;
            if (!1 !== i.bullets) {
                for (e = a("<div>").addClass("carousel-bullets").addClass(i.bulletsSize + "-size").addClass("bullet-style-" + i.bulletsStyle).addClass(i.clsBullets), "default" === i.bulletsPosition || "center" === i.bulletsPosition ? e.addClass("flex-justify-center") : "left" === i.bulletsPosition ? e.addClass("flex-justify-start") : e.addClass("flex-justify-end"), t = 0; t < this.slides.length; t++) {
                    var s = a("<span>").addClass("carousel-bullet").addClass(i.clsBullet).data("slide", t);
                    0 === t && s.addClass("bullet-on").addClass(i.clsBulletOn), s.appendTo(e)
                }
                e.appendTo(n)
            }
        },
        _createEvents: function () {
            var t = this,
                e = this.element,
                n = this.options;
            e.on(f.events.click, ".carousel-bullet", function () {
                var e = a(this);
                !1 === t.isAnimate && (t._slideToSlide(e.data("slide")), t._fireEvent("bullet-click", {
                    bullet: e
                }))
            }), e.on(f.events.click, ".carousel-switch-next", function () {
                !1 === t.isAnimate && (t._slideTo("next", !1), t._fireEvent("next-click", {
                    button: this
                }))
            }), e.on(f.events.click, ".carousel-switch-prev", function () {
                !1 === t.isAnimate && (t._slideTo("prev", !1), t._fireEvent("prev-click", {
                    button: this
                }))
            }), !0 === n.stopOnMouse && !0 === n.autoStart && (e.on(f.events.enter, function () {
                t._stop(), t._fireEvent("mouse-enter", {
                    element: e
                }, !1, !0)
            }), e.on(f.events.leave, function () {
                t._start(), t._fireEvent("mouse-leave", {
                    element: e
                }, !1, !0)
            })), !0 === n.controlsOnMouse && (e.on(f.events.enter, function () {
                e.find("[class*=carousel-switch]").fadeIn(), e.find(".carousel-bullets").fadeIn()
            }), e.on(f.events.leave, function () {
                e.find("[class*=carousel-switch]").fadeOut(), e.find(".carousel-bullets").fadeOut()
            })), e.on(f.events.click, ".slide", function () {
                var e = a(this);
                t._fireEvent("slide-click", {
                    slide: e
                })
            }), a(window).on(f.events.resize, function () {
                t._resize()
            }, {
                ns: this.id
            })
        },
        _slideToSlide: function (e) {
            var t, n, i, s = this.element,
                a = this.options;
            void 0 !== this.slides[e] && this.currentIndex !== e && (i = e > this.currentIndex ? "next" : "prev", t = this.slides[this.currentIndex], n = this.slides[e], this.currentIndex = e, this._effect(t, n, a.effect, i), s.find(".carousel-bullet").removeClass("bullet-on").removeClass(a.clsBulletOn), s.find(".carousel-bullet:nth-child(" + (this.currentIndex + 1) + ")").addClass("bullet-on").addClass(a.clsBulletOn))
        },
        _slideTo: function (e, t) {
            var n, i, s = this.element,
                a = this.options;
            void 0 === e && (e = "next"), n = this.slides[this.currentIndex], "next" === e ? (this.currentIndex++, this.currentIndex >= this.slides.length && (this.currentIndex = 0)) : (this.currentIndex--, this.currentIndex < 0 && (this.currentIndex = this.slides.length - 1)), i = this.slides[this.currentIndex], this._effect(n, i, a.effect, e, t), s.find(".carousel-bullet").removeClass("bullet-on").removeClass(a.clsBulletOn), s.find(".carousel-bullet:nth-child(" + (this.currentIndex + 1) + ")").addClass("bullet-on").addClass(a.clsBulletOn)
        },
        _effect: function (e, t, n, i, s) {
            var a, o, r, l, c = this,
                d = this.options,
                u = d.duration,
                h = d.effectFunc,
                p = d.period;
            void 0 !== t.data("duration") && (u = t.data("duration")), void 0 !== t.data("effectFunc") && (h = t.data("effectFunc")), "switch" === n && (u = 0), e.stop(!0), t.stop(!0), this.isAnimate = !0, setTimeout(function () {
                c.isAnimate = !1
            }, u + 100), i = "slide" === n ? "next" === i ? "slideLeft" : "slideRight" : "slide-v" === n ? "next" === i ? "slideUp" : "slideDown" : n, m.includes(n) || (i = "switch"), a = i, o = e, r = t, l = {
                duration: u,
                ease: h
            }, f.animations[a](o, r, l), e.removeClass("active-slide"), t.addClass("active-slide"), setTimeout(function () {
                c._fireEvent("slide-show", {
                    current: t[0],
                    prev: e[0]
                })
            }, u), setTimeout(function () {
                c._fireEvent("slide-hide", {
                    current: e[0],
                    next: t[0]
                })
            }, u), !0 === s && (void 0 !== t.data("period") && (p = t.data("period")), this.interval = setTimeout(function () {
                var e = "left" === d.direction ? "next" : "prior";
                c._slideTo(e, !0)
            }, p))
        },
        toSlide: function (e) {
            this._slideToSlide(e)
        },
        next: function () {
            this._slideTo("next")
        },
        prev: function () {
            this._slideTo("prev")
        },
        stop: function () {
            clearInterval(this.interval), this._fireEvent("stop")
        },
        play: function () {
            this._start(), this._fireEvent("play")
        },
        setEffect: function (e) {
            var t = this.element,
                n = this.options,
                t = t.find(".slide");
            m.includes(e) && (n.effect = e, t.removeStyleProperty("transform").css({
                top: 0,
                left: 0
            }))
        },
        changeAttribute: function (e, t) {
            "data-effect" === e && this.setEffect(t)
        },
        destroy: function () {
            var e = this.element,
                t = this.options;
            return e.off(f.events.click, ".carousel-bullet"), e.off(f.events.click, ".carousel-switch-next"), e.off(f.events.click, ".carousel-switch-prev"), !0 === t.stopOnMouse && !0 === t.autoStart && (e.off(f.events.enter), e.off(f.events.leave)), !0 === t.controlsOnMouse && (e.off(f.events.enter), e.off(f.events.leave)), e.off(f.events.click, ".slide"), a(window).off(f.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (i, t) {
    "use strict";
    var s = i.utils,
        n = {
            charmsDeferred: 0,
            position: "right",
            opacity: 1,
            clsCharms: "",
            onCharmCreate: i.noop,
            onOpen: i.noop,
            onClose: i.noop,
            onToggle: i.noop
        };
    i.charmsSetup = function (e) {
        n = t.extend({}, n, e)
    }, window.metroCharmsSetup, i.charmsSetup(window.metroCharmsSetup), i.Component("charms", {
        init: function (e, t) {
            return this._super(t, e, n, {
                origin: {
                    background: ""
                }
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("charm-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.addClass("charms").addClass(t.position + "-side").addClass(t.clsCharms), this.origin.background = e.css("background-color"), e.css({
                backgroundColor: i.colors.toRGBA(s.getStyleOne(e, "background-color"), t.opacity)
            })
        },
        _createEvents: function () {},
        open: function () {
            this.element.addClass("open"), this._fireEvent("open")
        },
        close: function () {
            this.element.removeClass("open"), this._fireEvent("close")
        },
        toggle: function () {
            !0 === this.element.hasClass("open") ? this.close() : this.open(), this._fireEvent("toggle")
        },
        opacity: function (e) {
            var t = this.element,
                n = this.options;
            if (void 0 === e) return n.opacity;
            e = Math.abs(parseFloat(e));
            e < 0 || 1 < e || (n.opacity = e, t.css({
                backgroundColor: i.colors.toRGBA(s.getStyleOne(t, "background-color"), e)
            }))
        },
        changeOpacity: function () {
            var e = this.element;
            this.opacity(e.attr("data-opacity"))
        },
        changeAttribute: function (e) {
            "data-opacity" === e && this.changeOpacity()
        },
        destroy: function () {
            return this.element
        }
    }), i.charms = {
        check: function (e) {
            return !1 !== s.isMetroObject(e, "charms") || (console.warn("Element is not a charms component"), !1)
        },
        isOpen: function (e) {
            if (!1 !== this.check(e)) return t(e).hasClass("open")
        },
        open: function (e) {
            !1 !== this.check(e) && i.getPlugin(e, "charms").open()
        },
        close: function (e) {
            !1 !== this.check(e) && i.getPlugin(e, "charms").close()
        },
        toggle: function (e) {
            !1 !== this.check(e) && i.getPlugin(e, "charms").toggle()
        },
        closeAll: function () {
            t("[data-role*=charms]").each(function () {
                i.getPlugin(this, "charms").close()
            })
        },
        opacity: function (e, t) {
            !1 !== this.check(e) && i.getPlugin(e, "charms").opacity(t)
        }
    }
}(Metro, m4q),
function (o, c) {
    "use strict";
    var d = o.utils,
        e = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAUABQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t+KKPxo/GgA70Yo/Gj8aADFH4VesdC1HUl3WtjcXCf344yV/PGKW+0HUtNXddWNzbp/fkjIX88YoAofhR+FH40fjQAfhR+FH40fjQAUUUUAFepeAPh5D9li1LVYhK8g3Q27j5VXszDuT6f5HA+FtOXVvEWn2rjMcko3j1UckfkDX0MBgYHAoARVCKFUBVHAA6ClZQwKkZBGCDS0UAec+Pvh3BJay6lpUQimjBeW3QYVx3Kjsfbv/PyqvpuvnvxfpqaT4l1C1QbY0lJUDsrfMB+RoAyKKKKACiiigDa8GXq6f4p02eQgIJQpJ7Bvlz+tfQP4V8yDg17P4A8cw65ZxWV5IE1KMbfmP+uA7j39R+NAHaUfhSUUAL+FeA+OL1NQ8WalNGQU83YCO+0Bf6V6b498cQ6BZyWlrIJNSkXaApz5QP8AEff0FeKk5OTyTQAUUUUAH40fjRU1naTX93DbQIXmlYIijuTQBc0Dw/eeI74W1mm49XkbhUHqTXsHhz4eaXoCpI8YvbscmaYZAP8Asr0H8/etHwv4cg8M6XHaxANIfmllxy7dz9PStigA/Gk/GlooA5bxJ8PdL19XkWMWd43PnwjGT/tL0P8AP3rx/X/D954cvjbXibT1SReVceoNfRFZHijw5B4m0uS1lAWQfNFLjlG7H6etAHz5+NH41NeWk1hdzW06FJonKMp7EGoaACvQfhBowudTudRkXK2y7I8j+Nup/Afzrz6vafhRaCDwmkgHM8zufwO3/wBloA7Kiij8KACkpaSgBaSj8KKAPJvi/owttTttRjXC3K7JMf3l6H8R/KvPq9p+K1qJ/CbyEcwTI4P1O3/2avFqAP/Z",
        n = {
            chatDeferred: 0,
            inputTimeFormat: null,
            timeFormat: "D MMM hh:mm A",
            name: "John Doe",
            avatar: e,
            welcome: null,
            welcomeAvatar: e,
            title: null,
            width: "100%",
            height: "auto",
            messages: null,
            sendButtonTitle: "Send",
            readonly: !1,
            locale: METRO_LOCALE,
            clsChat: "",
            clsName: "",
            clsTime: "",
            clsInput: "",
            clsSendButton: "",
            clsMessageLeft: "default",
            clsMessageRight: "default",
            onMessage: o.noop,
            onSend: o.noop,
            onSendButtonClick: o.noop,
            onChatCreate: o.noop
        };
    o.chatSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroChatSetup, o.chatSetup(window.metroChatSetup), o.Component("chat", {
        init: function (e, t) {
            return this._super(t, e, n, {
                input: null,
                classes: "primary secondary success alert warning yellow info dark light".split(" "),
                lastMessage: null
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("chat-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t, n = this,
                i = this.element,
                s = this.options,
                a = [{
                    html: s.sendButtonTitle,
                    cls: s.clsSendButton + " js-chat-send-button",
                    onclick: s.onSendButtonClick
                }];
            i.addClass("chat").addClass(s.clsChat), i.css({
                width: s.width,
                height: s.height
            }), d.isValue(s.title) && c("<div>").addClass("title").html(s.title).appendTo(i), c("<div>").addClass("messages").appendTo(i), e = c("<div>").addClass("message-input").appendTo(i), (t = c("<input type='text'>")).appendTo(e), t.input({
                customButtons: a,
                clsInput: s.clsInput
            }), s.welcome && this.add({
                text: s.welcome,
                time: datetime(),
                position: "left",
                name: "Chat Bot",
                avatar: s.welcomeAvatar
            }), d.isValue(s.messages) && "string" == typeof s.messages && (s.messages = d.isObject(s.messages)), !d.isNull(s.messages) && "object" == typeof s.messages && 0 < d.objectLength(s.messages) && c.each(s.messages, function () {
                n.add(this)
            }), i.find(".message-input")[s.readonly ? "addClass" : "removeClass"]("disabled")
        },
        _createEvents: function () {
            function t() {
                var e = "" + a.val();
                "" !== e.trim() && (e = {
                    id: d.elementId("chat-message"),
                    name: i.name,
                    avatar: i.avatar,
                    text: e,
                    position: "right",
                    time: datetime()
                }, n.add(e), a.val(""), n._fireEvent("send", {
                    msg: e
                }), a.focus())
            }
            var n = this,
                e = this.element,
                i = this.options,
                s = e.find(".js-chat-send-button"),
                a = e.find("input[type=text]");
            s.on(o.events.click, function () {
                t()
            }), a.on(o.events.keyup, function (e) {
                e.keyCode === o.keyCode.ENTER && t()
            })
        },
        add: function (e) {
            var t = this.element,
                n = this.options,
                i = t.find(".messages"),
                s = n.inputTimeFormat ? Datetime.from(e.time, n.inputTimeFormat, n.locale) : datetime(e.time),
                a = c("<div>").addClass("message").addClass(e.position).appendTo(i),
                o = c("<div>").addClass("message-item").appendTo(a),
                r = c("<img>").attr("src", e.avatar).addClass("message-avatar").appendTo(o),
                l = c("<div>").addClass("message-text").append(c("<div>").addClass("message-text-inner").html(Cake.escapeHtml(e.text))).appendTo(o),
                t = c("<div>").addClass("message-time").addClass(n.clsTime).text(s.format(n.timeFormat)).appendTo(l),
                s = c("<div>").addClass("message-sender").addClass(n.clsName).text(e.name).appendTo(l);
            return d.isValue(e.id) && a.attr("id", e.id), "left" === e.position && d.isValue(n.clsMessageLeft) && l.addClass(n.clsMessageLeft), "right" === e.position && d.isValue(n.clsMessageRight) && l.addClass(n.clsMessageRight), this.lastMessage && this.lastMessage.position === e.position && (l.addClass("--next"), r.visible(!1), s.hide()), this._fireEvent("message", {
                msg: e,
                el: {
                    message: a,
                    sender: s,
                    time: t,
                    item: o,
                    avatar: r,
                    text: l
                }
            }), i.animate({
                draw: {
                    scrollTop: i[0].scrollHeight
                },
                dur: 1e3
            }), this.lastMessage = e, this
        },
        addMessages: function (e) {
            var t = this;
            return d.isValue(e) && "string" == typeof e && (e = d.isObject(e)), "object" == typeof e && 0 < d.objectLength(e) && c.each(e, function () {
                t.add(this)
            }), this
        },
        delMessage: function (e) {
            return this.element.find(".messages").find("#" + e).remove(), this
        },
        updMessage: function (e) {
            var t = this.element.find(".messages").find("#" + e.id);
            return 0 === t.length || (t.find(".message-text").html(e.text), t.find(".message-time").html(e.time)), this
        },
        clear: function () {
            this.element.find(".messages").html(""), this.lastMessage = null
        },
        toggleReadonly: function (e) {
            var t = this.element,
                n = this.options;
            n.readonly = void 0 === e ? !n.readonly : e, t.find(".message-input")[n.readonly ? "addClass" : "removeClass"]("disabled")
        },
        changeAttribute: function (e) {
            "data-readonly" === e && this.toggleReadonly()
        },
        destroy: function () {
            var e = this.element,
                t = e.find(".js-chat-send-button"),
                n = e.find("input[type=text]");
            return t.off(o.events.click), n.off(o.events.keyup), e
        }
    }), o.defaults.Chat = n, o.defaults.ChatAvatar = e
}(Metro, m4q),
function (e, a) {
    "use strict";
    var o = e.utils,
        n = {
            checkboxDeferred: 0,
            transition: !0,
            style: 1,
            caption: "",
            captionPosition: "right",
            indeterminate: !1,
            clsCheckbox: "",
            clsCheck: "",
            clsCaption: "",
            onCheckboxCreate: e.noop
        };
    e.checkboxSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroCheckboxSetup, e.checkboxSetup(window.metroCheckboxSetup), e.Component("checkbox", {
        init: function (e, t) {
            return this._super(t, e, n, {
                origin: {
                    className: ""
                }
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("checkbox-create")
        },
        _createStructure: function () {
            var e, t = this.element,
                n = this.options,
                i = a("<span>").addClass("check"),
                s = a("<span>").addClass("caption").html(n.caption);
            t.attr("type", "checkbox"), void 0 !== t.attr("readonly") && t.on("click", function (e) {
                e.preventDefault()
            }), e = t.wrap("<label>").addClass("checkbox " + t[0].className).addClass(2 === n.style ? "style2" : ""), i.appendTo(e), s.appendTo(e), !0 === n.transition && e.addClass("transition-on"), "left" === n.captionPosition && e.addClass("caption-left"), this.origin.className = t[0].className, t[0].className = "", e.addClass(n.clsCheckbox), s.addClass(n.clsCaption), i.addClass(n.clsCheck), n.indeterminate && (t[0].indeterminate = !0), t.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var e = this.element,
                t = e.siblings(".check");
            e.on("focus", function () {
                t.addClass("focused")
            }), e.on("blur", function () {
                t.removeClass("focused")
            })
        },
        indeterminate: function (e) {
            var t = this.element;
            e = !!o.isNull(e) || o.bool(e), t[0].indeterminate = e, t.attr("data-indeterminate", e)
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        toggle: function (e) {
            var t = this.element;
            return this.indeterminate(!1), o.isValue(e) ? -1 === e ? this.indeterminate(!0) : t.prop("checked", 1 === e) : t.prop("checked", !o.bool(t.prop("checked"))), this
        },
        changeAttribute: function (e) {
            var t, n = this.element,
                i = this.options,
                s = n.parent();
            switch (e) {
                case "disabled":
                    this.toggleState();
                    break;
                case "data-indeterminate":
                    n[0].indeterminate = !0 === JSON.parse(n.attr("data-indeterminate"));
                    break;
                case "data-style":
                    t = parseInt(n.attr("data-style")), o.isInt(t) && (i.style = t, s.removeClass("style1 style2").addClass("style" + t))
            }
        },
        destroy: function () {
            var e = this.element;
            return e.off("focus"), e.off("blur"), e
        }
    })
}(Metro, m4q),
function (e, t) {
    "use strict";
    var n = {
        clockDeferred: 0,
        showTime: !0,
        showDate: !0,
        timeFormat: "24",
        dateFormat: "american",
        divider: "&nbsp;&nbsp;",
        leadingZero: !0,
        dateDivider: "-",
        timeDivider: ":",
        onTick: e.noop,
        onSecond: e.noop,
        onClockCreate: e.noop
    };
    e.clockSetup = function (e) {
        n = t.extend({}, n, e)
    }, window.metroClockSetup, e.clockSetup(window.metroClockSetup), e.Component("clock", {
        init: function (e, t) {
            return this._super(t, e, n, {
                _clockInterval: null
            }), this
        },
        _create: function () {
            var e = this,
                t = this.element;
            this._fireEvent("clock-create", {
                element: t
            }), this._tick(), this._clockInterval = setInterval(function () {
                e._tick()
            }, 500), this._secondInterval = setInterval(function () {
                e._second()
            }, 1e3)
        },
        _addLeadingZero: function (e) {
            return e < 10 && (e = "0" + e), e
        },
        _second: function () {
            var e = new Date;
            this._fireEvent("second", {
                timestamp: e
            })
        },
        _tick: function () {
            var e = this.element,
                t = this.options,
                n = new Date,
                i = "",
                s = n.getHours(),
                a = n.getMinutes(),
                o = n.getSeconds(),
                r = n.getDate(),
                l = n.getMonth() + 1,
                c = n.getFullYear(),
                d = "";
            12 === parseInt(t.timeFormat) && (d = 11 < s ? " PM" : " AM", 12 < s && (s -= 12), 0 === s && (s = 12)), a = this._addLeadingZero(a), o = this._addLeadingZero(o), t.leadingZero && (s = this._addLeadingZero(s), l = this._addLeadingZero(l), r = this._addLeadingZero(r)), t.showDate && ("american" === t.dateFormat ? (i += "<span class='date-month'>" + l + "</span>", i += "<span class='date-divider'>" + t.dateDivider + "</span>", i += "<span class='date-day'>" + r + "</span>") : (i += "<span class='date-day'>" + r + "</span>", i += "<span class='date-divider'>" + t.dateDivider + "</span>", i += "<span class='date-month'>" + l + "</span>"), i += "<span class='date-divider'>" + t.dateDivider + "</span>", i += "<span class='date-year'>" + c + "</span>", i += t.divider), t.showTime && (i += "<span class='clock-hour'>" + s + "</span>", i += "<span class='clock-divider'>" + t.timeDivider + "</span>", i += "<span class='clock-minute'>" + a + "</span>", i += "<span class='clock-divider'>" + t.timeDivider + "</span>", i += "<span class='clock-second'>" + o + "</span>", i += "<span class='clock-suffix'>" + d + "</span>"), e.html(i), this._fireEvent("tick", {
                timestamp: n
            })
        },
        changeAttribute: function (e) {},
        destroy: function () {
            return clearInterval(this._clockInterval), this._clockInterval = null, this.element
        }
    })
}(Metro, m4q),
function (o, r) {
    "use strict";
    var n = {
        collapseDeferred: 0,
        collapsed: !1,
        toggleElement: !1,
        duration: 100,
        onExpand: o.noop,
        onCollapse: o.noop,
        onCollapseCreate: o.noop
    };
    o.collapseSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroCollapseSetup, o.collapseSetup(window.metroCollapseSetup), o.Component("collapse", {
        init: function (e, t) {
            return this._super(t, e, n, {
                toggle: null
            }), this
        },
        _create: function () {
            var t = this,
                n = this.element,
                e = this.options,
                i = !1 !== e.toggleElement ? r(e.toggleElement) : 0 < n.siblings(".collapse-toggle").length ? n.siblings(".collapse-toggle") : n.siblings("a:nth-child(1)");
            !0 !== e.collapsed && !0 !== n.attr("collapsed") || n.hide(0), i.on(o.events.click, function (e) {
                "block" !== n.css("display") || n.hasClass("keep-open") ? t._open(n) : t._close(n), -1 === ["INPUT"].indexOf(e.target.tagName) && e.preventDefault(), e.stopPropagation()
            }), this.toggle = i, this._fireEvent("collapse-create", {
                element: n
            })
        },
        _close: function (e, t) {
            var n = r(e),
                i = o.getPlugin(n[0], "collapse"),
                s = i.options,
                a = t ? "show" : "slideUp",
                s = t ? 0 : s.duration;
            this.toggle.removeClass("active-toggle"), n[a](s, function () {
                e.trigger("onCollapse", null, e), e.data("collapsed", !0), e.addClass("collapsed"), i._fireEvent("collapse")
            })
        },
        _open: function (e, t) {
            var n = r(e),
                i = o.getPlugin(n[0], "collapse"),
                s = i.options,
                a = t ? "show" : "slideDown",
                s = t ? 0 : s.duration;
            this.toggle.addClass("active-toggle"), n[a](s, function () {
                e.trigger("onExpand", null, e), e.data("collapsed", !1), e.removeClass("collapsed"), i._fireEvent("expand")
            })
        },
        collapse: function (e) {
            this._close(this.element, e)
        },
        expand: function (e) {
            this._open(this.element, e)
        },
        close: function (e) {
            this._close(this.element, e)
        },
        open: function (e) {
            this._open(this.element, e)
        },
        isCollapsed: function () {
            return this.element.data("collapsed")
        },
        toggleState: function () {
            var e = this.element;
            !0 === e.attr("collapsed") || !0 === e.data("collapsed") ? this.collapse() : this.expand()
        },
        changeAttribute: function (e) {
            switch (e) {
                case "collapsed":
                case "data-collapsed":
                    this.toggleState()
            }
        },
        destroy: function () {
            return this.toggle.off(o.events.click), this.element
        }
    })
}(Metro, m4q),
function (r, l) {
    "use strict";
    var c = r.utils,
        n = {
            duration: 100,
            prepend: "",
            append: "",
            clearButton: !1,
            clearButtonIcon: "<span class='default-icon-cross'></span>",
            pickerButtonIcon: "<span class='default-icon-equalizer'></span>",
            defaultValue: "rgba(0, 0, 0, 0)",
            copyInlineStyles: !1,
            clsPickerButton: "",
            clsClearButton: "",
            onColorSelected: r.noop,
            onColorPickerCreate: r.noop
        };
    r.colorPickerSetup = function (e) {
        n = l.extend({}, n, e)
    }, window.metroColorPickerSetup, r.colorPickerSetup(window.metroColorPickerSetup), r.Component("color-picker", {
        init: function (e, t) {
            return this._super(t, e, l.extend({}, r.defaults.ColorSelector, {
                showUserColors: !1,
                showValues: ""
            }, n), {
                value: null,
                picker: null,
                colorSelector: null,
                colorSelectorBox: null,
                colorExample: null,
                inputInterval: null,
                isOpen: !1
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options,
                e = e.val();
            if (!r.pluginExists("color-selector")) throw new Error("Color selector component required!");
            this.value = r.colors.isColor(e) ? e : r.colors.isColor(t.defaultValue) ? t.defaultValue : "rgba(0,0,0,0)", this._createStructure(), this._createEvents(), this._fireEvent("color-picker-create")
        },
        _createStructure: function () {
            var e, t = this,
                n = this.element,
                i = this.options,
                s = n.wrap(l("<div>").addClass("color-picker").addClass(n[0].className)),
                a = l("<div>").addClass("color-example-box").insertBefore(n),
                o = l("<div>").addClass("buttons").appendTo(s);
            o.append(l("<button>").addClass("button color-picker-button").addClass(i.clsPickerButton).attr("tabindex", -1).attr("type", "button").html(i.pickerButtonIcon)), !0 !== i.clearButton || n[0].readOnly || o.append(l("<button>").addClass("button input-clear-button").addClass(i.clsClearButton).attr("tabindex", -1).attr("type", "button").html(i.clearButtonIcon)), c.isValue(i.prepend) && s.prepend(l("<div>").addClass("prepend").addClass(i.clsPrepend).html(i.prepend)), c.isValue(i.append) && s.append(l("<div>").html(i.append).addClass("append").addClass(i.clsAppend)), o = l("<div>").addClass("color-selector-box").appendTo(s), e = l("<div>").appendTo(o), this.picker = s, this.colorExample = a, this.colorSelector = e, this.colorSelectorBox = o, r.makePlugin(e, "color-selector", {
                defaultSwatches: i.defaultSwatches,
                userColors: i.userColors,
                returnValueType: i.returnValueType,
                returnAsString: i.returnAsString,
                showValues: i.showValues,
                showAsString: i.showAsString,
                showUserColors: i.showUserColors,
                target: i.target,
                controller: n,
                locale: i.locale,
                addUserColorTitle: i.addUserColorTitle,
                userColorsTitle: i.userColorsTitle,
                hslMode: i.hslMode,
                showAlphaChannel: i.showAlphaChannel,
                inputThreshold: i.inputThreshold,
                initColor: this.value,
                readonlyInput: i.readonlyInput,
                clsSelector: i.clsSelector,
                clsSwatches: i.clsSwatches,
                clsSwatch: i.clsSwatch,
                clsValue: i.clsValue,
                clsLabel: i.clsLabel,
                clsInput: i.clsInput,
                clsUserColorButton: i.clsUserColorButton,
                clsUserColors: i.clsUserColors,
                clsUserColorsTitle: i.clsUserColorsTitle,
                clsUserColor: i.clsUserColor,
                onColor: i.onColor,
                onColorSelectorCreate: i.onColorSelectorCreate
            }), r.makePlugin(o, "dropdown", {
                dropFilter: ".color-picker",
                duration: i.duration,
                toggleElement: [s],
                checkDropUp: !0,
                onDrop: function () {
                    r.getPlugin(e, "color-selector").val(t.value)
                }
            }), !(n[0].className = "") === i.copyInlineStyles && l.each(c.getInlineStyles(n), function (e, t) {
                s.css(e, t)
            }), this._setColor()
        },
        _clearInputInterval: function () {
            clearInterval(this.inputInterval), this.inputInterval = !1
        },
        _setColor: function () {
            var e = this.colorExample,
                t = this.value; - 1 === this.value.indexOf("cmyk") && -1 === this.value.indexOf("hsv") || (t = r.colors.toHEX(this.value)), e.css({
                backgroundColor: t
            })
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = this.picker,
                s = this.colorSelector,
                a = this.colorSelector;
            i.on(r.events.click, ".input-clear-button", function (e) {
                e.preventDefault(), e.stopPropagation(), t.val(n.defaultValue).trigger("change"), r.getPlugin(s, "color-selector").val(n.defaultValue)
            }), t.on(r.events.inputchange, function () {
                e.value = this.value, e._setColor()
            }), a.on(r.events.click, function (e) {
                e.stopPropagation()
            })
        },
        val: function (e) {
            if (0 === arguments.length || !c.isValue(e)) return this.value;
            r.colors.isColor(e) && (this.value = e, this.element.val(e).trigger("change"), this._setColor())
        },
        destroy: function () {
            this.element.remove()
        }
    }), l(document).on(r.events.click, function () {
        l(".color-picker").removeClass("open")
    })
}(Metro, m4q),
function (m, v) {
    "use strict";
    var g = "hex, rgb, rgba, hsl, hsla, hsv, cmyk",
        r = m.utils,
        n = {
            defaultSwatches: "#FFFFFF,#000000,#FFFB0D,#0532FF,#FF9300,#00F91A,#FF2700,#686868,#EE5464,#D27AEE,#5BA8C4,#E64AA9,#1ba1e2,#6a00ff,#bebebe,#f8f8f8",
            userColors: null,
            returnValueType: "hex",
            returnAsString: !0,
            showValues: g,
            showAsString: null,
            showUserColors: !0,
            controller: null,
            locale: "en-US",
            addUserColorTitle: null,
            userColorsTitle: null,
            hslMode: "percent",
            showAlphaChannel: !0,
            inputThreshold: 300,
            initColor: null,
            readonlyInput: !1,
            clsSelector: "",
            clsSwatches: "",
            clsSwatch: "",
            clsValue: "",
            clsLabel: "",
            clsInput: "",
            clsUserColorButton: "",
            clsUserColors: "",
            clsUserColorsTitle: "",
            clsUserColor: "",
            onSelectColor: m.noop,
            onColorSelectorCreate: m.noop
        };
    m.colorSelectorSetup = function (e) {
        n = v.extend({}, n, e)
    }, window.metroColorSelectorSetup, m.colorSelectorSetup(window.metroColorSelectorSetup), m.Component("color-selector", {
        init: function (e, t) {
            return this._super(t, e, n, {
                id: r.elementId("color-selector"),
                defaultSwatches: [],
                showValues: [],
                userColors: [],
                showAsString: [],
                hue: 0,
                saturation: 0,
                lightness: 1,
                alpha: 1,
                hsl: null,
                hsla: null,
                hsv: null,
                rgb: null,
                rgba: null,
                cmyk: null,
                hex: null,
                inputInterval: null,
                locale: null
            }), this
        },
        _create: function () {
            var e = this.options;
            r.isValue(e.defaultSwatches) && (this.defaultSwatches = e.defaultSwatches.toArray(",").map(function (e) {
                return e.toUpperCase()
            })), r.isValue(e.showValues) && (this.showValues = e.showValues.toArray(",")), r.isValue(e.userColors) && (this.userColors = e.userColors.toArray(",").map(function (e) {
                return e.toUpperCase()
            })), r.isValue(e.showAsString) && (this.showAsString = e.showAsString.toArray(",")), this.locale = m.locales[e.locale].colorSelector, this._createStructure(), this._createEvents(), this._fireEvent("color-selector-create")
        },
        _createStructure: function () {
            var e, t, n, i, s, a, o, r, l, c, d, u = this,
                h = this.element,
                p = this.options,
                f = this.locale;
            h.addClass("color-selector").addClass(p.clsSelector), h.append(n = v("<div>").addClass("color-box")), n.append(i = v("<div>").addClass("row")), i.append(e = v("<div>").addClass("default-swatches").addClass(p.clsSwatches)), v.each(this.defaultSwatches, function () {
                e.append(v("<button>").attr("data-color", this).attr("type", "button").addClass("swatch").addClass(p.clsSwatch).css("background-color", this))
            }), n.append(i = v("<div>").addClass("row")), i.append(l = v("<div>").addClass("color-map")), l.append(r = v("<button>").attr("type", "button").addClass("cursor color-cursor")), l.append(a = v("<canvas>").addClass("color-canvas")), i.append(l = v("<div>").addClass("hue-map")), l.append(o = v("<button>").attr("type", "button").addClass("cursor hue-cursor")), l.append(s = v("<canvas>").addClass("hue-canvas")), i.append(l = v("<div>").addClass("alpha-map")), l.append(d = v("<button>").attr("type", "button").addClass("cursor alpha-cursor")), l.append(c = v("<canvas>").addClass("alpha-canvas")), n.append(i = v("<div>").addClass("row color-values-block")), i.append(t = v("<div>").addClass("color-value-hex")), t.append(v("<input type='radio' name='returnType' value='hex' checked>").addClass("check-color-value-hex")), t.append(l = v("<div>").addClass("color-block as-string color-hex")), l.append(v("<input type='text' data-prepend='HEX:'>").addClass("input-small value-hex")), i.append(t = v("<div>").addClass("color-value-rgb")), t.append(v("<input type='radio' name='returnType' value='rgb'>").addClass("check-color-value-rgb")), t.append(l = v("<div>").addClass("color-block color-rgb")), l.append(v("<input type='text' data-prepend='R:'>").addClass("input-small value-r")), l.append(v("<input type='text' data-prepend='G:'>").addClass("input-small value-g")), l.append(v("<input type='text' data-prepend='B:'>").addClass("input-small value-b")), t.append(l = v("<div>").addClass("color-block as-string color-rgb")), l.append(v("<input type='text' data-prepend='RGB:'>").addClass("input-small value-rgb")), (-1 < this.showAsString.indexOf("rgb") ? t.find(".value-r,.value-g,.value-b") : t.find(".value-rgb")).parent().hide(), i.append(t = v("<div>").addClass("color-value-rgba")), t.append(v("<input type='radio' name='returnType' value='rgba'>").addClass("check-color-value-rgba")), t.append(l = v("<div>").addClass("color-block color-rgba")), l.append(v("<input type='text' data-prepend='R:'>").addClass("input-small value-r")), l.append(v("<input type='text' data-prepend='G:'>").addClass("input-small value-g")), l.append(v("<input type='text' data-prepend='B:'>").addClass("input-small value-b")), l.append(v("<input type='text' data-prepend='A:'>").addClass("input-small value-a")), t.append(l = v("<div>").addClass("color-block as-string color-rgba")), l.append(v("<input type='text' data-prepend='RGBA:'>").addClass("input-small value-rgba")), (-1 < this.showAsString.indexOf("rgba") ? t.find(".value-r,.value-g,.value-b,.value-a") : t.find(".value-rgba")).parent().hide(), i.append(t = v("<div>").addClass("color-value-hsl")), t.append(v("<input type='radio' name='returnType' value='hsl'>").addClass("check-color-value-hsl")), t.append(l = v("<div>").addClass("color-block color-hsl")), l.append(v("<input type='text' data-prepend='H:'>").addClass("input-small value-h")), l.append(v("<input type='text' data-prepend='S:'>").addClass("input-small value-s")), l.append(v("<input type='text' data-prepend='L:'>").addClass("input-small value-l")), t.append(l = v("<div>").addClass("color-block as-string color-hsl")), l.append(v("<input type='text' data-prepend='HSL:'>").addClass("input-small value-hsl")), (-1 < this.showAsString.indexOf("hsl") ? t.find(".value-h,.value-s,.value-l") : t.find(".value-hsl")).parent().hide(), i.append(t = v("<div>").addClass("color-value-hsla")), t.append(v("<input type='radio' name='returnType' value='hsla'>").addClass("check-color-value-hsla")), t.append(l = v("<div>").addClass("color-block color-hsla")), l.append(v("<input type='text' data-prepend='H:'>").addClass("input-small value-h")), l.append(v("<input type='text' data-prepend='S:'>").addClass("input-small value-s")), l.append(v("<input type='text' data-prepend='L:'>").addClass("input-small value-l")), l.append(v("<input type='text' data-prepend='A:'>").addClass("input-small value-a")), t.append(l = v("<div>").addClass("color-block as-string color-hsla")), l.append(v("<input type='text' data-prepend='HSLA:'>").addClass("input-small value-hsla")), (-1 < this.showAsString.indexOf("hsla") ? t.find(".value-h,.value-s,.value-l,.value-a") : t.find(".value-hsla")).parent().hide(), i.append(t = v("<div>").addClass("color-value-hsv")), t.append(v("<input type='radio' name='returnType' value='hsv'>").addClass("check-color-value-hsl")), t.append(l = v("<div>").addClass("color-block color-hsv")), l.append(v("<input type='text' data-prepend='H:'>").addClass("input-small value-h")), l.append(v("<input type='text' data-prepend='S:'>").addClass("input-small value-s")), l.append(v("<input type='text' data-prepend='V:'>").addClass("input-small value-v")), t.append(l = v("<div>").addClass("color-block as-string color-hsv")), l.append(v("<input type='text' data-prepend='HSV:'>").addClass("input-small value-hsv")), (-1 < this.showAsString.indexOf("hsv") ? t.find(".value-h,.value-s,.value-v") : t.find(".value-hsv")).parent().hide(), i.append(t = v("<div>").addClass("color-value-cmyk")), t.append(v("<input type='radio' name='returnType' value='cmyk'>").addClass("check-color-value-cmyk")), t.append(l = v("<div>").addClass("color-block color-cmyk")), l.append(v("<input type='text' data-prepend='C:'>").addClass("input-small value-c")), l.append(v("<input type='text' data-prepend='M:'>").addClass("input-small value-m")), l.append(v("<input type='text' data-prepend='Y:'>").addClass("input-small value-y")), l.append(v("<input type='text' data-prepend='K:'>").addClass("input-small value-k")), t.append(l = v("<div>").addClass("color-block as-string color-cmyk")), l.append(v("<input type='text' data-prepend='CMYK:'>").addClass("input-small value-cmyk")), (-1 < this.showAsString.indexOf("cmyk") ? t.find(".value-s,.value-m,.value-y,.value-k") : t.find(".value-cmyk")).parent().hide(), n.append(i = v("<div>").addClass("row user-colors-container")), i.append(v("<div>").addClass("user-colors-title").addClass(p.clsUserColorsTitle).html(p.userColorsTitle || f.userColorsTitle)), i.append(v("<div>").addClass("user-colors").addClass(p.clsUserColors)), i.append(i = v("<div>").addClass("user-colors-actions")), i.append(v("<button>").addClass("button add-button").addClass(p.clsUserColorButton).html("<span class='user-swatch'></span><span>" + (p.addUserColorTitle || f.addUserColorButton) + "</span>")), f = n.find("input[type=text]"), m.makePlugin(f, "input", {
                clearButton: !1,
                clsPrepend: p.clsLabel,
                clsComponent: p.clsInput
            }), f.addClass(p.clsValue), p.readonlyInput && f.attr("readonly", !0), (n = n.find("input[type=radio]").each(function () {
                v(this).attr("name", u.id + "-returnType")
            })).each(function () {
                v(this).val() === p.returnValueType && (this.checked = !0)
            }), m.makePlugin(n, "radio", {
                style: 2
            }), v.each(g.toArray(","), function () {
                -1 === u.showValues.indexOf(this) && h.find(".color-value-" + this).hide()
            }), p.showUserColors || h.find(".user-colors-container").hide(), p.showAlphaChannel || (h.addClass("no-alpha-channel"), v.each(["rgba", "hsla"], function () {
                h.find(".color-value-" + this).hide()
            })), this._fillUserColors(), this.hueCanvas = s, this.hueCursor = o, this.shadeCanvas = a, this.shadeCursor = r, this.alphaCanvas = c, this.alphaCursor = d, this._createShadeCanvas(), this._createHueCanvas(), this._createAlphaCanvas(), this._setColorValues(), this._updateCursorsColor(), p.initColor && m.colors.isColor(p.initColor) && this._colorToPos("string" == typeof p.initColor ? m.colors.parse(p.initColor) : p.initColor)
        },
        _createShadeCanvas: function (e) {
            var t = this.shadeCanvas[0],
                n = t.getContext("2d");
            n.clearRect(0, 0, t.width, t.height), e = e || "#f00", n.clearRect(0, 0, t.width, t.height), n.fillStyle = e, n.fillRect(0, 0, t.width, t.height);
            e = n.createLinearGradient(0, 0, t.width, 0);
            e.addColorStop(0, "#fff"), e.addColorStop(1, "transparent"), n.fillStyle = e, n.fillRect(0, 0, t.width, t.height);
            e = n.createLinearGradient(0, 0, 0, t.height);
            e.addColorStop(0, "transparent"), e.addColorStop(1, "#000"), n.fillStyle = e, n.fillRect(0, 0, t.width, t.height)
        },
        _createHueCanvas: function () {
            var e = this.hueCanvas[0],
                t = e.getContext("2d"),
                n = t.createLinearGradient(0, 0, 0, e.height);
            n.addColorStop(0, "hsl(0,100%,50%)"), n.addColorStop(.17, "hsl(298.8, 100%, 50%)"), n.addColorStop(.33, "hsl(241.2, 100%, 50%)"), n.addColorStop(.5, "hsl(180, 100%, 50%)"), n.addColorStop(.67, "hsl(118.8, 100%, 50%)"), n.addColorStop(.83, "hsl(61.2,100%,50%)"), n.addColorStop(1, "hsl(360,100%,50%)"), t.clearRect(0, 0, e.width, e.height), t.fillStyle = n, t.fillRect(0, 0, e.width, e.height)
        },
        _createAlphaCanvas: function () {
            var e = this.alphaCanvas[0],
                t = e.getContext("2d"),
                n = t.createLinearGradient(0, 0, 0, e.height),
                i = new m.colorPrimitive.HSLA(this.hue, 1, .5, 1).toString();
            n.addColorStop(0, i), n.addColorStop(1, "rgba(0,0,0,0)"), t.clearRect(0, 0, e.width, e.height), t.fillStyle = n, t.fillRect(0, 0, e.width, e.height)
        },
        _updateHueCursor: function (e) {
            this.hueCursor.css({
                top: e
            })
        },
        _updateAlphaCursor: function (e) {
            this.alphaCursor.css({
                top: e
            })
        },
        _getHueColor: function (e) {
            var t = this.hueCanvas,
                n = t.offset(),
                t = t.height(),
                e = e - n.top;
            t < e && (e = t), e < 0 && (e = 0), 360 === (n = 360 - 360 * (e / t)) && (n = 0), t = "hsl(" + n + ", 100%, 50%)", this.hue = n, this._createShadeCanvas(t), this._createAlphaCanvas(), this._updateHueCursor(e), this._updateCursorsColor(), this._setColorValues()
        },
        _getAlphaValue: function (e) {
            var t = this.alphaCanvas,
                n = t.offset(),
                t = t.height(),
                n = e - n.top;
            t < n && (n = t), n < 0 && (n = 0), t = 1 - n / t, this.alpha = t.toFixed(2), this._updateAlphaCursor(n), this._updateCursorsColor(), this._setColorValues()
        },
        _getShadeColor: function (e, t) {
            var n = this.shadeCanvas,
                i = n.offset(),
                s = n.width(),
                n = n.height(),
                e = e - i.left,
                t = t - i.top;
            s < e && (e = s), e < 0 && (e = 0), n < t && (t = n), t < 0 && (t = .1);
            i = 1 - t / n * 100 / 100, n = e / s * 100 / 100, s = i / 2 * (2 - n), n = i * n / (1 - Math.abs(2 * s - 1));
            isNaN(s) && (s = 0), isNaN(n) && (n = 0), this.lightness = s, this.saturation = n, this._updateShadeCursor(e, t), this._updateCursorsColor(), this._setColorValues()
        },
        _updateCursorsColor: function () {
            this.shadeCursor.css({
                backgroundColor: m.colors.toHEX(new m.colorPrimitive.HSL(this.hue, this.saturation, this.lightness))
            }), this.hueCursor.css({
                backgroundColor: m.colors.toHEX(new m.colorPrimitive.HSL(this.hue, 1, .5))
            }), this.alphaCursor.css({
                backgroundColor: m.colors.toRGBA(new m.colorPrimitive.HSL(this.hue, 1, .5), this.alpha).toString()
            })
        },
        _updateShadeCursor: function (e, t) {
            this.shadeCursor.css({
                top: t,
                left: e
            })
        },
        _colorToPos: function (e) {
            var t = this.shadeCanvas[0].getBoundingClientRect(),
                n = this.hueCanvas[0].getBoundingClientRect(),
                i = this.alphaCanvas[0].getBoundingClientRect(),
                s = m.colors.toHSL(e),
                a = m.colors.toHSLA(e, e.a),
                o = m.colors.toHSV(e),
                e = t.width * o.s,
                o = t.height * (1 - o.v),
                n = n.height - s.h / 360 * n.height,
                i = (1 - a.a) * i.height;
            this.hue = s.h, this.saturation = s.s, this.lightness = s.l, this.alpha = a.a, this._updateHueCursor(n), this._updateShadeCursor(e, o), this._updateAlphaCursor(i), this._updateCursorsColor(), this._createShadeCanvas("hsl(" + this.hue + ", 100%, 50%)"), this._createAlphaCanvas(), this._setColorValues()
        },
        _setColorValues: function () {
            var e = this.element,
                t = this.options,
                n = m.colors.toHSL(new m.colorPrimitive.HSL(this.hue, this.saturation, this.lightness)),
                i = m.colors.toHSLA(new m.colorPrimitive.HSLA(this.hue, this.saturation, this.lightness, this.alpha)),
                s = m.colors.toRGB(n),
                a = m.colors.toRGBA(s, this.alpha),
                o = m.colors.toHSV(n),
                r = m.colors.toCMYK(n),
                l = m.colors.toHEX(n),
                c = v(t.controller),
                t = "percent" === t.hslMode;
            this.hsl = n, this.hsla = i, this.hsv = o, this.rgb = s, this.rgba = a, this.hex = l, this.cmyk = r, e.find(".color-value-hex .value-hex input").val(l), e.find(".color-value-rgb .value-r input").val(s.r), e.find(".color-value-rgb .value-g input").val(s.g), e.find(".color-value-rgb .value-b input").val(s.b), e.find(".color-value-rgb .value-rgb input").val(s.toString()), e.find(".color-value-rgba .value-r input").val(a.r), e.find(".color-value-rgba .value-g input").val(a.g), e.find(".color-value-rgba .value-b input").val(a.b), e.find(".color-value-rgba .value-a input").val(a.a), e.find(".color-value-rgba .value-rgba input").val(a.toString()), e.find(".color-value-hsl .value-h input").val(n.h.toFixed(0)), e.find(".color-value-hsl .value-s input").val(t ? Math.round(100 * n.s) + "%" : n.s.toFixed(4)), e.find(".color-value-hsl .value-l input").val(t ? Math.round(100 * n.l) + "%" : n.l.toFixed(4)), e.find(".color-value-hsl .value-hsl input").val(n.toString()), e.find(".color-value-hsla .value-h input").val(i.h.toFixed(0)), e.find(".color-value-hsla .value-s input").val(t ? Math.round(100 * i.s) + "%" : n.s.toFixed(4)), e.find(".color-value-hsla .value-l input").val(t ? Math.round(100 * i.l) + "%" : n.l.toFixed(4)), e.find(".color-value-hsla .value-a input").val(i.a), e.find(".color-value-hsla .value-hsla input").val(i.toString()), e.find(".color-value-hsv .value-h input").val(o.h.toFixed(0)), e.find(".color-value-hsv .value-s input").val(t ? Math.round(100 * o.s) + "%" : o.s.toFixed(4)), e.find(".color-value-hsv .value-v input").val(t ? Math.round(100 * o.v) + "%" : o.v.toFixed(4)), e.find(".color-value-hsv .value-hsv input").val(o.toString()), e.find(".color-value-cmyk .value-c input").val(r.c.toFixed(0)), e.find(".color-value-cmyk .value-m input").val(r.m.toFixed(0)), e.find(".color-value-cmyk .value-y input").val(r.y.toFixed(0)), e.find(".color-value-cmyk .value-k input").val(r.k.toFixed(0)), e.find(".color-value-cmyk .value-cmyk input").val(r.toString()), e.find(".user-colors-actions .user-swatch").css({
                backgroundColor: l
            }), c && c.length && c.val(this.val()).trigger("change"), this._fireEvent("select-color", {
                color: this.val(),
                primitive: {
                    hsl: this.hsl,
                    hsla: this.hsla,
                    rgb: this.rgb,
                    rgba: this.rgba,
                    hsv: this.hsv,
                    cmyk: this.cmyk,
                    hex: this.hex
                }
            })
        },
        _clearInputInterval: function () {
            clearInterval(this.inputInterval), this.inputInterval = !1
        },
        _createEvents: function () {
            var s = this,
                t = this.element,
                e = this.options,
                n = t.find(".hue-map"),
                i = t.find(".alpha-map"),
                a = t.find(".color-map"),
                o = v(e.controller);
            t.find(".color-values-block input[type=text]").on(m.events.inputchange, function () {
                var i = v(this);
                s._clearInputInterval(), s.inputInterval || (s.inputInterval = setTimeout(function () {
                    var e, t, n = i.closest(".color-block");
                    n.hasClass("color-hex") ? e = "hex" : n.hasClass("color-rgb") ? e = "rgb" : n.hasClass("color-rgba") ? e = "rgba" : n.hasClass("color-hsl") ? e = "hsl" : n.hasClass("color-hsla") ? e = "hsla" : n.hasClass("color-hsv") ? e = "hsv" : n.hasClass("color-cmyk") && (e = "cmyk"), (e = n.hasClass("as-string") ? i.val() : (t = [], v.each(n.find("input"), function () {
                        t.push(this.value)
                    }), e + "(" + t.join(", ") + ")")) && m.colors.isColor(e) && s.val(e), s._clearInputInterval()
                }, e.inputThreshold))
            }), o && o.length && o.on(m.events.inputchange, function () {
                s._clearInputInterval(), s.inputInterval || (s.inputInterval = setTimeout(function () {
                    var e = o.val();
                    e && m.colors.isColor(e) && s.val(e), s._clearInputInterval()
                }, e.inputThreshold))
            }), i.on(m.events.startAll, function (e) {
                s._getAlphaValue(r.pageXY(e).y), s.alphaCursor.addClass("dragging"), v(document).on(m.events.moveAll, function (e) {
                    e.preventDefault(), s._getAlphaValue(r.pageXY(e).y)
                }, {
                    ns: s.id,
                    passive: !1
                }), v(document).on(m.events.stopAll, function () {
                    s.alphaCursor.removeClass("dragging"), v(document).off(m.events.moveAll, {
                        ns: s.id
                    }), v(document).off(m.events.stopAll, {
                        ns: s.id
                    })
                }, {
                    ns: s.id
                })
            }), n.on(m.events.startAll, function (e) {
                s._getHueColor(r.pageXY(e).y), s.hueCursor.addClass("dragging"), v(document).on(m.events.moveAll, function (e) {
                    e.preventDefault(), s._getHueColor(r.pageXY(e).y)
                }, {
                    ns: s.id,
                    passive: !1
                }), v(document).on(m.events.stopAll, function () {
                    s.hueCursor.removeClass("dragging"), v(document).off(m.events.moveAll, {
                        ns: s.id
                    }), v(document).off(m.events.stopAll, {
                        ns: s.id
                    })
                }, {
                    ns: s.id
                })
            }), a.on(m.events.startAll, function (e) {
                s._getShadeColor(r.pageXY(e).x, r.pageXY(e).y), s.shadeCursor.addClass("dragging"), v(document).on(m.events.moveAll, function (e) {
                    e.preventDefault(), s._getShadeColor(r.pageXY(e).x, r.pageXY(e).y)
                }, {
                    ns: s.id,
                    passive: !1
                }), v(document).on(m.events.stopAll, function () {
                    s.shadeCursor.removeClass("dragging"), v(document).off(m.events.moveAll, {
                        ns: s.id
                    }), v(document).off(m.events.stopAll, {
                        ns: s.id
                    })
                }, {
                    ns: s.id
                })
            }), t.on("click", ".swatch", function () {
                s._colorToPos(v(this).attr("data-color"))
            }), t.on("click", ".add-button", function () {
                var e = m.colors.toHEX(new m.colorPrimitive.HSL(s.hue, s.saturation, s.lightness)).toUpperCase(); - 1 < s.userColors.indexOf(e) || (s.userColors.push(e), t.find(".user-colors").append(v("<button>").attr("data-color", e).attr("type", "button").addClass("swatch user-swatch").css({
                    backgroundColor: e
                })))
            }), t.find("input[type=radio]").on("click", function () {
                e.returnValueType = v(this).val(), s._setColorValues()
            })
        },
        val: function (e) {
            var t, n = this.options;
            if (!r.isValue(e) || !m.colors.isColor(e)) {
                switch (n.returnValueType.toLowerCase()) {
                    case "rgb":
                        t = this.rgb;
                        break;
                    case "rgba":
                        t = this.rgba;
                        break;
                    case "hsl":
                        t = this.hsl;
                        break;
                    case "hsla":
                        t = this.hsla;
                        break;
                    case "hsv":
                        t = this.hsv;
                        break;
                    case "cmyk":
                        t = this.cmyk;
                        break;
                    default:
                        t = this.hex
                }
                return n.returnAsString ? t.toString() : t
            }
            m.colors.isColor(e) && this._colorToPos(m.colors.parse(e))
        },
        user: function (e) {
            if (!r.isValue(e)) return this.userColors;
            !Array.isArray(e) && "string" != typeof e || (this.userColors = "string" == typeof e ? e.toArray(",").map(function (e) {
                return e.toUpperCase()
            }) : e.map(function (e) {
                return e.toUpperCase()
            }), this._fillUserColors())
        },
        _fillUserColors: function () {
            var e = this.element.find(".user-colors").clear();
            v.each(this.userColors, function () {
                e.append(v("<button>").attr("data-color", this).attr("type", "button").addClass("swatch user-swatch").css({
                    backgroundColor: this
                }))
            })
        },
        changeAttribute: function (e, t) {
            var n = this.options;
            "data-return-value-type" === e && (n.returnValueType = t), "data-return-as-string" === e && (n.returnValueType = r.bool(t))
        },
        destroy: function () {
            this.element.remove()
        }
    }), m.defaults.ColorSelector = n
}(Metro, m4q),
function (e, d) {
    "use strict";
    var i = "hex",
        t = "rgb",
        l = "rgba",
        n = "hsv",
        s = "hsl",
        c = "hsla",
        a = "cmyk",
        o = "unknown";
    e.colorsSetup = function (e) {
        u = d.extend({}, u, e)
    }, window.metroColorsSetup, e.colorsSetup(window.metroColorsSetup);
    var u = {
        angle: 30,
        resultType: "hex",
        results: 6,
        baseLight: "#ffffff",
        baseDark: "self"
    };

    function h(e, t) {
        for (e += t; 360 <= e;) e -= 360;
        for (; e < 0;) e += 360;
        return e
    }

    function r(e) {
        return Math.min(1, Math.max(0, e))
    }

    function p(e, t, n) {
        this.r = e || 0, this.g = t || 0, this.b = n || 0
    }

    function f(e, t, n, i) {
        this.r = e || 0, this.g = t || 0, this.b = n || 0, this.a = 0 === i ? 0 : i || 1
    }

    function m(e, t, n) {
        this.h = e || 0, this.s = t || 0, this.v = n || 0
    }

    function v(e, t, n) {
        this.h = e || 0, this.s = t || 0, this.l = n || 0
    }

    function g(e, t, n, i) {
        this.h = e || 0, this.s = t || 0, this.l = n || 0, this.a = 0 === i ? 0 : i || 1
    }

    function C(e, t, n, i) {
        this.c = e || 0, this.m = t || 0, this.y = n || 0, this.k = i || 0
    }
    p.prototype.toString = function () {
        return "rgb(" + [this.r, this.g, this.b].join(", ") + ")"
    }, f.prototype.toString = function () {
        return "rgba(" + [this.r, this.g, this.b, parseFloat(this.a).toFixed(2)].join(", ") + ")"
    }, m.prototype.toString2 = function () {
        return "hsv(" + [this.h, this.s, this.v].join(", ") + ")"
    }, m.prototype.toString = function () {
        return "hsv(" + [Math.round(this.h), Math.round(100 * this.s) + "%", Math.round(100 * this.v) + "%"].join(", ") + ")"
    }, v.prototype.toString2 = function () {
        return "hsl(" + [this.h, this.s, this.l].join(", ") + ")"
    }, v.prototype.toString = function () {
        return "hsl(" + [Math.round(this.h), Math.round(100 * this.s) + "%", Math.round(100 * this.l) + "%"].join(", ") + ")"
    }, g.prototype.toString2 = function () {
        return "hsla(" + [this.h, this.s, this.l, this.a].join(", ") + ")"
    }, g.prototype.toString = function () {
        return "hsla(" + [Math.round(this.h), Math.round(100 * this.s) + "%", Math.round(100 * this.l) + "%", parseFloat(this.a).toFixed(2)].join(", ") + ")"
    }, C.prototype.toString = function () {
        return "cmyk(" + [this.c, this.m, this.y, this.k].join(", ") + ")"
    };

    function b(e, t) {
        this._setValue(e), this._setOptions(t)
    }
    var w = {
        PALETTES: {
            ALL: "all",
            METRO: "metro",
            STANDARD: "standard"
        },
        metro: {
            lime: "#a4c400",
            green: "#60a917",
            emerald: "#008a00",
            blue: "#00AFF0",
            teal: "#00aba9",
            cyan: "#1ba1e2",
            cobalt: "#0050ef",
            indigo: "#6a00ff",
            violet: "#aa00ff",
            pink: "#dc4fad",
            magenta: "#d80073",
            crimson: "#a20025",
            red: "#CE352C",
            orange: "#fa6800",
            amber: "#f0a30a",
            yellow: "#fff000",
            brown: "#825a2c",
            olive: "#6d8764",
            steel: "#647687",
            mauve: "#76608a",
            taupe: "#87794e"
        },
        standard: {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32dc32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdd5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            slyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        },
        all: {},
        init: function () {
            return this.all = d.extend({}, this.standard, this.metro), this
        },
        color: function (e, t) {
            return void 0 !== this[t = t || this.PALETTES.ALL][e] && this[t][e]
        },
        palette: function (e) {
            return e = e || this.PALETTES.ALL, Object.keys(this[e])
        },
        expandHexColor: function (e) {
            if ("string" != typeof e) throw new Error("Value is not a string!");
            if ("#" !== e[0] || 4 !== e.length) return "#" === e[0] ? e : "#" + e;
            return "#" + e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, i) {
                return t + t + n + n + i + i
            })
        },
        colors: function (e) {
            return e = e || this.PALETTES.ALL, Object.values(this[e])
        },
        random: function (e, t) {
            var n;
            return e = e || i, t = void 0 !== t ? t : 1, n = "#" + ((1 << 24) + (d.random(0, 255) << 16) + (d.random(0, 255) << 8) + d.random(0, 255)).toString(16).slice(1), "hex" === e ? n : this.toColor(n, e, t)
        },
        parse: function (e) {
            var t = e.toLowerCase().trim(),
                e = t.replace(/[^%\d.,]/g, "").split(",").map(function (e) {
                    return -1 < e.indexOf("%") && (e = "" + parseInt(e) / 100), (-1 < e.indexOf(".") ? parseFloat : parseInt)(e)
                });
            return this.metro[t] ? this.expandHexColor(this.metro[t]) : this.standard[t] ? this.expandHexColor(this.standard[t]) : "#" === t[0] ? this.expandHexColor(t) : 0 === t.indexOf("rgba") && 4 === e.length ? new f(e[0], e[1], e[2], e[3]) : 0 === t.indexOf("rgb") && 3 === e.length ? new p(e[0], e[1], e[2]) : 0 === t.indexOf("cmyk") && 4 === e.length ? new C(e[0], e[1], e[2], e[3]) : 0 === t.indexOf("hsv") && 3 === e.length ? new m(e[0], e[1], e[2]) : 0 === t.indexOf("hsla") && 4 === e.length ? new g(e[0], e[1], e[2], e[3]) : 0 === t.indexOf("hsl") && 3 === e.length ? new v(e[0], e[1], e[2]) : void 0
        },
        createColor: function (e, t) {
            var n;
            return e = e || "hex", "string" == typeof (t = t || "#000000") && (n = this.parse(t)), this.isColor(n) || (n = "#000000"), this.toColor(n, e.toLowerCase())
        },
        isDark: function (e) {
            if (this.isColor(e)) {
                e = this.toRGB(e);
                return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 < 128
            }
        },
        isLight: function (e) {
            return !this.isDark(e)
        },
        isHSV: function (e) {
            return e instanceof m
        },
        isHSL: function (e) {
            return e instanceof v
        },
        isHSLA: function (e) {
            return e instanceof g
        },
        isRGB: function (e) {
            return e instanceof p
        },
        isRGBA: function (e) {
            return e instanceof f
        },
        isCMYK: function (e) {
            return e instanceof C
        },
        isHEX: function (e) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)
        },
        isColor: function (e) {
            e = "string" == typeof e ? this.parse(e) : e;
            return !!e && (this.isHEX(e) || this.isRGB(e) || this.isRGBA(e) || this.isHSV(e) || this.isHSL(e) || this.isHSLA(e) || this.isCMYK(e))
        },
        check: function (e, t) {
            var n = this,
                i = "string" == typeof t ? [t] : t,
                s = !1;
            if (d.each(i, function () {
                    n["is" + this.toUpperCase()](e) && (s = !0)
                }), !s) throw new Error("Value is not a " + t + " color type!")
        },
        colorType: function (e) {
            return this.isHEX(e) ? i : this.isRGB(e) ? t : this.isRGBA(e) ? l : this.isHSV(e) ? n : this.isHSL(e) ? s : this.isHSLA(e) ? c : this.isCMYK(e) ? a : o
        },
        equal: function (e, t) {
            return !(!this.isColor(e) || !this.isColor(t)) && this.toHEX(e) === this.toHEX(t)
        },
        colorToString: function (e) {
            return e.toString()
        },
        hex2rgb: function (e) {
            if ("string" != typeof e) throw new Error("Value is not a string!");
            var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.expandHexColor(e)),
                e = [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
            return t ? new p(e[0], e[1], e[2]) : null
        },
        rgb2hex: function (e) {
            return this.check(e, "rgb"), "#" + ((1 << 24) + (e.r << 16) + (e.g << 8) + e.b).toString(16).slice(1)
        },
        rgb2hsv: function (e) {
            this.check(e, "rgb");
            var t = new m,
                n = e.r / 255,
                i = e.g / 255,
                s = e.b / 255,
                a = Math.max(n, i, s),
                o = Math.min(n, i, s),
                r = a - o,
                l = a,
                e = 0 === a ? 0 : 1 - o / a,
                r = a === o ? 0 : a === n && s <= i ? (i - s) / r * 60 : a === n && i < s ? (i - s) / r * 60 + 360 : a === i ? (s - n) / r * 60 + 120 : a === s ? (n - i) / r * 60 + 240 : 0;
            return t.h = r, t.s = e, t.v = l, t
        },
        hsv2rgb: function (e) {
            var t, n, i;
            this.check(e, "hsv");
            var s = e.h,
                a = 100 * e.s,
                o = 100 * e.v,
                r = (100 - a) * o / 100,
                a = s % 60 / 60 * (o - r),
                l = r + a,
                c = o - a;
            switch (Math.floor(s / 60)) {
                case 0:
                    t = o, n = l, i = r;
                    break;
                case 1:
                    t = c, n = o, i = r;
                    break;
                case 2:
                    t = r, n = o, i = l;
                    break;
                case 3:
                    t = r, n = c, i = o;
                    break;
                case 4:
                    t = l, n = r, i = o;
                    break;
                case 5:
                    t = o, n = r, i = c
            }
            return new p(Math.round(255 * t / 100), Math.round(255 * n / 100), Math.round(255 * i / 100))
        },
        hsv2hex: function (e) {
            return this.check(e, "hsv"), this.rgb2hex(this.hsv2rgb(e))
        },
        hex2hsv: function (e) {
            return this.check(e, "hex"), this.rgb2hsv(this.hex2rgb(e))
        },
        rgb2cmyk: function (e) {
            this.check(e, "rgb");
            var t = new C,
                n = e.r / 255,
                i = e.g / 255,
                e = e.b / 255;
            return t.k = Math.min(1 - n, 1 - i, 1 - e), t.c = 1 - t.k == 0 ? 0 : (1 - n - t.k) / (1 - t.k), t.m = 1 - t.k == 0 ? 0 : (1 - i - t.k) / (1 - t.k), t.y = 1 - t.k == 0 ? 0 : (1 - e - t.k) / (1 - t.k), t.c = Math.round(100 * t.c), t.m = Math.round(100 * t.m), t.y = Math.round(100 * t.y), t.k = Math.round(100 * t.k), t
        },
        cmyk2rgb: function (e) {
            return this.check(e, "cmyk"), new p(Math.floor(255 * (1 - e.c / 100) * (1 - e.k / 100)), Math.ceil(255 * (1 - e.m / 100) * (1 - e.k / 100)), Math.ceil(255 * (1 - e.y / 100) * (1 - e.k / 100)))
        },
        hsv2hsl: function (e) {
            var t, n, i;
            return this.check(e, "hsv"), t = e.h, n = (2 - e.s) * e.v, e = e.s * e.v, 0 === n || 0 === (i = n <= 1 ? n : 2 - n) ? e = 0 : e /= i, new v(t, e, n /= 2)
        },
        hsl2hsv: function (e) {
            var t, n, i;
            return this.check(e, ["hsl", "hsla"]), t = e.h, e = ((i = 2 * e.l) + (n = e.s * (i <= 1 ? i : 2 - i))) / 2, new m(t, n = i + n === 0 ? 0 : 2 * n / (i + n), e)
        },
        rgb2websafe: function (e) {
            return this.check(e, "rgb"), new p(51 * Math.round(e.r / 51), 51 * Math.round(e.g / 51), 51 * Math.round(e.b / 51))
        },
        rgba2websafe: function (e) {
            this.check(e, "rgba");
            var t = this.rgb2websafe(e);
            return new f(t.r, t.g, t.b, e.a)
        },
        hex2websafe: function (e) {
            return this.check(e, "hex"), this.rgb2hex(this.rgb2websafe(this.hex2rgb(e)))
        },
        hsv2websafe: function (e) {
            return this.check(e, "hsv"), this.rgb2hsv(this.rgb2websafe(this.toRGB(e)))
        },
        hsl2websafe: function (e) {
            return this.check(e, "hsl"), this.hsv2hsl(this.rgb2hsv(this.rgb2websafe(this.toRGB(e))))
        },
        cmyk2websafe: function (e) {
            return this.check(e, "cmyk"), this.rgb2cmyk(this.rgb2websafe(this.cmyk2rgb(e)))
        },
        websafe: function (e) {
            return this.isHEX(e) ? this.hex2websafe(e) : this.isRGB(e) ? this.rgb2websafe(e) : this.isRGBA(e) ? this.rgba2websafe(e) : this.isHSV(e) ? this.hsv2websafe(e) : this.isHSL(e) ? this.hsl2websafe(e) : this.isCMYK(e) ? this.cmyk2websafe(e) : e
        },
        toColor: function (e, t, n) {
            var i;
            switch (t.toLowerCase()) {
                case "hex":
                    i = this.toHEX(e);
                    break;
                case "rgb":
                    i = this.toRGB(e);
                    break;
                case "rgba":
                    i = this.toRGBA(e, n);
                    break;
                case "hsl":
                    i = this.toHSL(e);
                    break;
                case "hsla":
                    i = this.toHSLA(e, n);
                    break;
                case "hsv":
                    i = this.toHSV(e);
                    break;
                case "cmyk":
                    i = this.toCMYK(e);
                    break;
                default:
                    i = e
            }
            return i
        },
        toHEX: function (e) {
            e = "string" == typeof e ? this.parse(e) : e;
            if (!e) throw new Error("Unknown color format!");
            return "string" == typeof e ? e : this.rgb2hex(this.toRGB(e))
        },
        toRGB: function (e) {
            e = "string" == typeof e ? this.parse(e) : e;
            if (this.isRGB(e)) return e;
            if (this.isRGBA(e)) return new p(e.r, e.g, e.b);
            if (this.isHSV(e)) return this.hsv2rgb(e);
            if (this.isHSL(e)) return this.hsv2rgb(this.hsl2hsv(e));
            if (this.isHSLA(e)) return this.hsv2rgb(this.hsl2hsv(e));
            if (this.isHEX(e)) return this.hex2rgb(e);
            if (this.isCMYK(e)) return this.cmyk2rgb(e);
            throw new Error("Unknown color format!")
        },
        toRGBA: function (e, t) {
            if (this.isRGBA(e)) return t && (e.a = t), e;
            e = this.toRGB(e);
            return new f(e.r, e.g, e.b, t)
        },
        toHSV: function (e) {
            return this.rgb2hsv(this.toRGB(e))
        },
        toHSL: function (e) {
            return this.hsv2hsl(this.rgb2hsv(this.toRGB(e)))
        },
        toHSLA: function (e, t) {
            if (this.isHSLA(e)) return t && (e.a = t), e;
            e = this.hsv2hsl(this.rgb2hsv(this.toRGB(e)));
            return e.a = t, new g(e.h, e.s, e.l, e.a)
        },
        toCMYK: function (e) {
            return this.rgb2cmyk(this.toRGB(e))
        },
        grayscale: function (e) {
            return this.desaturate(e, 100)
        },
        lighten: function (e, t) {
            var n, i;
            if (!this.isColor(e)) throw new Error(e + " is not a valid color value!");
            return t = 0 === t ? 0 : t || 10, (n = this.toHSL(e)).l += t / 100, n.l = r(n.l), (t = this.colorType(e).toLowerCase()) !== l && t !== c || (i = e.a), this.toColor(n, t, i)
        },
        darken: function (e, t) {
            return this.lighten(e, -t)
        },
        spin: function (e, t) {
            var n, i;
            if (!this.isColor(e)) throw new Error(e + " is not a valid color value!");
            return t = ((n = this.toHSL(e)).h + t) % 360, n.h = t < 0 ? 360 + t : t, (t = this.colorType(e).toLowerCase()) !== l && t !== c || (i = e.a), this.toColor(n, t, i)
        },
        brighten: function (e, t) {
            var n, i;
            if (!this.isColor(e)) throw new Error(e + " is not a valid color value!");
            return (n = this.toRGB(e)).r = Math.max(0, Math.min(255, n.r - Math.round(-t / 100 * 255))), n.g = Math.max(0, Math.min(255, n.g - Math.round(-t / 100 * 255))), n.b = Math.max(0, Math.min(255, n.b - Math.round(-t / 100 * 255))), (t = this.colorType(e).toLowerCase()) !== l && t !== c || (i = e.a), this.toColor(n, t, i)
        },
        saturate: function (e, t) {
            var n, i;
            if (!this.isColor(e)) throw new Error(e + " is not a valid color value!");
            return (n = this.toHSL(e)).s += t / 100, n.s = r(n.s), (t = this.colorType(e).toLowerCase()) !== l && t !== c || (i = e.a), this.toColor(n, t, i)
        },
        desaturate: function (e, t) {
            var n, i;
            if (!this.isColor(e)) throw new Error(e + " is not a valid color value!");
            return (n = this.toHSL(e)).s -= t / 100, n.s = r(n.s), (t = this.colorType(e).toLowerCase()) !== l && t !== c || (i = e.a), this.toColor(n, t, i)
        },
        hueShift: function (e, t, n, i) {
            var s, a = this.toHSV(e),
                o = this.colorType(e).toLowerCase(),
                r = a.h,
                n = n || 0,
                i = i || 0;
            for (r += t || 0; 360 <= r;) r -= 360;
            for (; r < 0;) r += 360;
            return a.h = r, a.s += n, 1 < a.s && (a.s = 1), a.s < 0 && (a.s = 0), a.v += i, 1 < a.v && (a.v = 1), a.v < 0 && (a.v = 0), o !== l && o !== c || (s = e.a), this.toColor(a, o, s)
        },
        shade: function (e, t) {
            if (!this.isColor(e)) throw new Error(e + " is not a valid color value!");
            t /= 100;
            var n, i = this.colorType(e).toLowerCase(),
                s = this.toRGB(e),
                a = t < 0 ? 0 : 255,
                o = t < 0 ? -1 * t : t,
                r = Math.round((a - s.r) * o) + s.r,
                t = Math.round((a - s.g) * o) + s.g,
                s = Math.round((a - s.b) * o) + s.b;
            return i !== l && i !== c || (n = e.a), this.toColor(new p(r, t, s), i, n)
        },
        mix: function (e, t, n) {
            n = 0 === n ? 0 : n || 50;
            var i = new p(0, 0, 0),
                e = this.toRGB(e),
                t = this.toRGB(t),
                n = n / 100;
            return i.r = Math.round((t.r - e.r) * n + e.r), i.g = Math.round((t.g - e.g) * n + e.g), i.b = Math.round((t.b - e.b) * n + e.b), this.toHEX(i)
        },
        multiply: function (e, t) {
            var n = this.toRGB(e),
                e = this.toRGB(t),
                t = new p;
            return n.b = Math.floor(n.b * e.b / 255), n.g = Math.floor(n.g * e.g / 255), n.r = Math.floor(n.r * e.r / 255), this.toHEX(t)
        },
        materialPalette: function (e, t) {
            var n = d.extend({}, u, t),
                t = n.baseLight,
                n = "self" !== n.baseDark && n.baseDark ? n.baseDark : this.multiply(e, e);
            return {
                50: this.mix(t, e, 10),
                100: this.mix(t, e, 30),
                200: this.mix(t, e, 50),
                300: this.mix(t, e, 70),
                400: this.mix(t, e, 85),
                500: this.mix(t, e, 100),
                600: this.mix(n, e, 92),
                700: this.mix(n, e, 83),
                800: this.mix(n, e, 74),
                900: this.mix(n, e, 65),
                A100: this.lighten(this.saturate(this.mix(n, e, 15), 80), 65),
                A200: this.lighten(this.saturate(this.mix(n, e, 15), 80), 55),
                A400: this.lighten(this.saturate(this.mix(t, e, 100), 55), 10),
                A700: this.lighten(this.saturate(this.mix(n, e, 83), 65), 10)
            }
        },
        monochromatic: function (e, t) {
            for (var t = d.extend({}, u, t), n = t.resultType, i = t.results, e = this.toHSV(e), s = e.h, a = e.s, o = e.v, r = [], l = 1 / i, c = this; i--;) r.push(new m(s, a, o)), o = (o + l) % 1;
            return r.map(function (e) {
                return c["to" + n.toUpperCase()](e)
            })
        },
        complementary: function (e, t) {
            var t = d.extend({}, u, t),
                e = this.toHSL(e),
                n = this,
                i = t.resultType;
            return [e, new v(h(e.h, 180), e.s, e.l)].map(function (e) {
                return n["to" + i.toUpperCase()](e)
            })
        },
        splitComplementary: function (e, t) {
            var n = d.extend({}, u, t),
                t = this.toHSL(e),
                e = t.h,
                i = this,
                s = n.resultType,
                n = n.angle;
            return [t, new v(h(e, 180 - n), t.s, t.l), new v(h(e, 180 + n), t.s, t.l)].map(function (e) {
                return i["to" + s.toUpperCase()](e)
            })
        },
        doubleComplementary: function (e, t) {
            var n = d.extend({}, u, t),
                i = n.resultType,
                t = n.angle,
                n = this.toHSL(e),
                e = n.h,
                s = this;
            return [n, new v(h(e, 180), n.s, n.l), new v(h(e, t), n.s, n.l), new v(h(e, 180 + t), n.s, n.l)].map(function (e) {
                return s["to" + i.toUpperCase()](e)
            })
        },
        square: function (e, t) {
            var n, i = d.extend({}, u, t).resultType,
                s = [],
                a = this.toHSL(e),
                o = a.h,
                r = this;
            for (s.push(a), n = 1; n < 4; n++) o = h(o, 90), s.push(new v(o, a.s, a.l));
            return s.map(function (e) {
                return r["to" + i.toUpperCase()](e)
            })
        },
        tetradic: function (e, t) {
            var n = d.extend({}, u, t),
                i = n.resultType,
                t = n.angle,
                n = this.toHSL(e),
                e = n.h,
                s = this;
            return [n, new v(h(e, 180), n.s, n.l), new v(h(e, 180 - t), n.s, n.l), new v(h(e, -t), n.s, n.l)].map(function (e) {
                return s["to" + i.toUpperCase()](e)
            })
        },
        triadic: function (e, t) {
            var n = d.extend({}, u, t).resultType,
                t = this.toHSL(e),
                e = t.h,
                i = this;
            return [t, new v(h(e, 120), t.s, t.l), new v(h(e, 240), t.s, t.l)].map(function (e) {
                return i["to" + n.toUpperCase()](e)
            })
        },
        analogous: function (e, t) {
            var t = d.extend({}, u, t),
                n = t.resultType,
                t = t.angle,
                e = this.toHSL(e),
                i = this;
            return [e, new v(h(e.h, -t), e.s, e.l), new v(h(e.h, +t), e.s, e.l)].map(function (e) {
                return i["to" + n.toUpperCase()](e)
            })
        },
        createScheme: function (e, t, n) {
            switch (t.toLowerCase()) {
                case "analogous":
                case "analog":
                    return this.analogous(e, n);
                case "triadic":
                case "triad":
                    return this.triadic(e, n);
                case "tetradic":
                case "tetra":
                    return this.tetradic(e, n);
                case "monochromatic":
                case "mono":
                    return this.monochromatic(e, n);
                case "complementary":
                case "complement":
                case "comp":
                    return this.complementary(e, n);
                case "double-complementary":
                case "double-complement":
                case "double":
                    return this.doubleComplementary(e, n);
                case "split-complementary":
                case "split-complement":
                case "split":
                    return this.splitComplementary(e, n);
                case "square":
                    return this.square(e, n);
                case "material":
                    return this.materialPalette(e, n)
            }
        },
        getScheme: function () {
            return this.createScheme.apply(this, arguments)
        },
        add: function (e, t, n) {
            var i = "string" == typeof e ? this.parse(e) : e,
                e = "string" == typeof t ? this.parse(t) : t,
                t = this.toRGBA(i),
                i = this.toRGBA(e),
                e = new f,
                n = ("" + n).toLowerCase() || "hex";
            return e.r = Math.round((t.r + i.r) / 2), e.g = Math.round((t.g + i.g) / 2), e.b = Math.round((t.b + i.b) / 2), e.a = Math.round((t.a + i.a) / 2), this["to" + n.toUpperCase()](e)
        }
    };
    b.prototype = {
        _setValue: function (e) {
            e = "string" == typeof e ? w.parse(e) : e;
            w.isColor(e) || (e = "#000000"), this._value = e, this._type = w.colorType(this._value)
        },
        _setOptions: function (e) {
            e = "object" == typeof e ? e : {}, this._options = d.extend({}, u, e)
        },
        getOptions: function () {
            return this._options
        },
        setOptions: function (e) {
            this._setOptions(e)
        },
        setValue: function (e) {
            this._setValue(e)
        },
        getValue: function () {
            return this._value
        },
        channel: function (e, t) {
            var n = this._type.toUpperCase();
            return -1 < ["red", "green", "blue"].indexOf(e) && (this.toRGB(), this._value[e[0]] = t, this["to" + n]()), "alpha" === e && this._value.a && (this._value.a = t), -1 < ["hue", "saturation", "value"].indexOf(e) && (this.toHSV(), this._value[e[0]] = t, this["to" + n]()), -1 < ["lightness"].indexOf(e) && (this.toHSL(), this._value[e[0]] = t, this["to" + n]()), -1 < ["cyan", "magenta", "yellow", "black"].indexOf(e) && (this.toCMYK(), this._value[e[0]] = t, this["to" + n]()), this
        },
        channels: function (e) {
            var n = this;
            return d.each(e, function (e, t) {
                n.channel(e, t)
            }), this
        },
        toRGB: function () {
            return this._value = w.toRGB(this._value), this._type = t, this
        },
        rgb: function () {
            return this._value ? new b(w.toRGB(this._value)) : void 0
        },
        toRGBA: function (e) {
            return w.isRGBA(this._value) && !e || (this._value = w.toRGBA(this._value, e)), this._type = l, this
        },
        rgba: function (e) {
            return this._value ? new b(w.toRGBA(this._value, e)) : void 0
        },
        toHEX: function () {
            return this._value = w.toHEX(this._value), this._type = i, this
        },
        hex: function () {
            return this._value ? new b(w.toHEX(this._value)) : void 0
        },
        toHSV: function () {
            return this._value = w.toHSV(this._value), this._type = n, this
        },
        hsv: function () {
            return this._value ? new b(w.toHSV(this._value)) : void 0
        },
        toHSL: function () {
            return this._value = w.toHSL(this._value), this._type = s, this
        },
        hsl: function () {
            return this._value ? new b(w.toHSL(this._value)) : void 0
        },
        toHSLA: function (e) {
            return w.isHSLA(this._value) && !e || (this._value = w.toHSLA(this._value, e)), this._type = c, this
        },
        hsla: function (e) {
            return this._value ? new b(w.toHSLA(this._value, e)) : void 0
        },
        toCMYK: function () {
            return this._value = w.toCMYK(this._value), this._type = a, this
        },
        cmyk: function () {
            return this._value ? new b(w.toCMYK(this._value)) : void 0
        },
        toWebsafe: function () {
            return this._value = w.websafe(this._value), this._type = w.colorType(this._value), this
        },
        websafe: function () {
            return this._value ? new b(w.websafe(this._value)) : void 0
        },
        toString: function () {
            return this._value ? w.colorToString(this._value) : "undefined"
        },
        toDarken: function (e) {
            return this._value = w.darken(this._value, e), this
        },
        darken: function (e) {
            return new b(w.darken(this._value, e))
        },
        toLighten: function (e) {
            return this._value = w.lighten(this._value, e), this
        },
        lighten: function (e) {
            return new b(w.lighten(this._value, e))
        },
        isDark: function () {
            return this._value ? w.isDark(this._value) : void 0
        },
        isLight: function () {
            return this._value ? w.isLight(this._value) : void 0
        },
        toHueShift: function (e, t, n) {
            return this._value = w.hueShift(this._value, e, t, n), this
        },
        hueShift: function (e, t, n) {
            return new b(w.hueShift(this._value, e, t, n))
        },
        toGrayscale: function () {
            return this._value = w.grayscale(this._value, this._type), this
        },
        grayscale: function () {
            return new b(w.grayscale(this._value, this._type))
        },
        type: function () {
            return w.colorType(this._value)
        },
        createScheme: function (e, t, n) {
            return this._value ? w.createScheme(this._value, e, t, n) : void 0
        },
        getScheme: function () {
            return this.createScheme.apply(this, arguments)
        },
        equal: function (e) {
            return w.equal(this._value, e)
        },
        toAdd: function (e) {
            return this._value = w.add(this._value, e, this._type), this
        },
        add: function (e) {
            return new b(w.add(this._value, e, this._type))
        }
    }, e.colors = w.init(), window.Color = e.Color = b, window.ColorPrimitive = e.colorPrimitive = {
        RGB: p,
        RGBA: f,
        HSV: m,
        HSL: v,
        HSLA: g,
        CMYK: C
    }, !0 === window.METRO_GLOBAL_COMMON && (window.Colors = e.colors)
}(Metro, m4q),
function (a, o) {
    "use strict";
    var r = a.utils,
        i = {
            name: "cookies_accepted",
            template: null,
            templateSource: null,
            acceptButton: ".cookie-accept-button",
            cancelButton: ".cookie-cancel-button",
            message: "Our website uses cookies to monitor traffic on our website and ensure that we can provide our customers with the best online experience possible.",
            duration: "30days",
            clsContainer: "",
            clsMessage: "",
            clsButtons: "",
            clsAcceptButton: "alert",
            clsCancelButton: "",
            onAccept: a.noop,
            onDecline: a.noop
        };
    a.cookieDisclaimer = {
        init: function (e) {
            var t = this,
                n = a.cookie;
            this.options = o.extend({}, i, e), this.disclaimer = o("<div>"), n.getCookie(this.options.name) || (this.options.template ? fetch(this.options.template).then(a.fetch.text).then(function (e) {
                t.create(e)
            }) : this.options.templateSource ? this.create(o(this.options.templateSource)) : this.create())
        },
        create: function (e) {
            var n = a.cookie,
                i = this.options,
                s = this.disclaimer;
            s.addClass("cookie-disclaimer-block").addClass(i.clsContainer), e ? e instanceof o ? s.append(e) : s.html(e) : (e = o("<div>").addClass("cookie-disclaimer-actions").addClass(i.clsButtons).append(o("<button>").addClass("button cookie-accept-button").addClass(i.clsAcceptButton).html("Accept")).append(o("<button>").addClass("button cookie-cancel-button").addClass(i.clsCancelButton).html("Cancel")), s.html(o("<div>").addClass(i.clsMessage).html(i.message)).append(o("<hr>").addClass("thin")).append(e)), s.appendTo(o("body")), s.on(a.events.click, i.acceptButton, function () {
                var t = 0,
                    e = ("" + i.duration).toArray(" ");
                o.each(e, function () {
                    var e = "" + this;
                    e.includes("day") ? t += 24 * parseInt(e) * 60 * 60 * 1e3 : e.includes("hour") ? t += 60 * parseInt(e) * 60 * 1e3 : e.includes("min") ? t += 60 * parseInt(e) * 1e3 : e.includes("sec") ? t += 1e3 * parseInt(e) : t += parseInt(e)
                }), n.setCookie(i.name, !0, t), r.exec(i.onAccept), s.remove()
            }), s.on(a.events.click, i.cancelButton, function () {
                r.exec(i.onDecline), s.remove()
            })
        }
    }
}(Metro, m4q),
function (e, a) {
    "use strict";
    var o = {
        path: "/",
        expires: null,
        maxAge: null,
        domain: null,
        secure: !1,
        samesite: null
    };
    e.cookieSetup = function (e) {
        o = a.extend({}, o, e)
    }, window.metroCookieSetup, e.cookieSetup(window.metroCookieSetup), e.cookie = {
        getCookies: function () {
            var e = document.cookie.toArray(";"),
                t = {};
            return a.each(e, function () {
                var e = this.split("=");
                t[e[0]] = e[1]
            }), t
        },
        getCookie: function (e) {
            for (var t, n = encodeURIComponent(e) + "=", i = document.cookie.toArray(";"), s = 0; s < i.length; s++) {
                for (t = i[s];
                    " " === t.charAt(0);) t = t.substring(1, t.length);
                if (0 === t.indexOf(n)) return decodeURIComponent(t.substring(n.length, t.length))
            }
            return null
        },
        setCookie: function (e, t, n) {
            var i = encodeURIComponent(e),
                e = encodeURIComponent(t),
                s = [],
                n = n && "object" != typeof n ? ((t = new Date).setTime(t.getTime() + parseInt(n)), a.extend({}, o, {
                    expires: t.toUTCString()
                })) : a.extend({}, o, n);
            a.each(n, function (e, t) {
                "secure" !== e && t && s.push(Cake.dashedName(e) + "=" + t), "secure" === e && !0 === t && s.push("secure")
            }), document.cookie = i + "=" + e + "; " + s.join("; ")
        },
        delCookie: function (e) {
            this.setCookie(e, !1, {
                maxAge: -1
            })
        }
    }
}(Metro, m4q),
function (s, _) {
    "use strict";
    var o = s.utils,
        n = {
            countdownDeferred: 0,
            stopOnBlur: !0,
            animate: "none",
            ease: "linear",
            duration: 600,
            inputFormat: null,
            locale: METRO_LOCALE,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            date: null,
            start: !0,
            clsCountdown: "",
            clsPart: "",
            clsZero: "",
            clsAlarm: "",
            clsDays: "",
            clsHours: "",
            clsMinutes: "",
            clsSeconds: "",
            onAlarm: s.noop,
            onTick: s.noop,
            onZero: s.noop,
            onBlink: s.noop,
            onCountdownCreate: s.noop
        };
    s.countdownSetup = function (e) {
        n = _.extend({}, n, e)
    }, window.metroCountdownSetup, s.countdownSetup(window.metroCountdownSetup), s.Component("countdown", {
        init: function (e, t) {
            return this._super(t, e, n, {
                locale: s.locales["en-US"],
                breakpoint: (new Date).getTime(),
                blinkInterval: null,
                tickInterval: null,
                zeroDaysFired: !1,
                zeroHoursFired: !1,
                zeroMinutesFired: !1,
                zeroSecondsFired: !1,
                fontSize: parseInt(o.getStyleOne(t, "font-size")),
                current: {
                    d: 0,
                    h: 0,
                    m: 0,
                    s: 0
                },
                inactiveTab: !1,
                id: o.elementId("countdown"),
                duration: 600
            }), this
        },
        _create: function () {
            var e = this.options;
            this.locale = void 0 !== s.locales[e.locale] ? s.locales[e.locale] : s.locales["en-US"], this.duration = +e.duration <= 0 || 1e3 <= +e.duration ? 600 : +e.duration, this._build(), this._createEvents()
        },
        _setBreakpoint: function () {
            var e = this.options;
            this.breakpoint = datetime().time(), e.date && (this.breakpoint = (e.inputFormat ? Datetime.from(e.date, e.inputFormat) : datetime(e.date)).time()), 0 < parseInt(e.days) && (this.breakpoint += 864e5 * parseInt(e.days)), 0 < parseInt(e.hours) && (this.breakpoint += 36e5 * parseInt(e.hours)), 0 < parseInt(e.minutes) && (this.breakpoint += 6e4 * parseInt(e.minutes)), 0 < parseInt(e.seconds) && (this.breakpoint += 1e3 * parseInt(e.seconds))
        },
        _build: function () {
            var n, i = this,
                s = this.element,
                a = this.options,
                e = datetime().time();
            s.attr("id") || s.attr("id", o.elementId("countdown")), o.isValue(s.attr("id")) || s.attr("id", o.elementId("countdown")), s.addClass("countdown").addClass(a.clsCountdown), this._setBreakpoint(), n = Math.round((i.breakpoint - e) / 864e5), _.each(["days", "hours", "minutes", "seconds"], function () {
                var e = _("<div>").addClass("part " + this).addClass(a.clsPart).attr("data-label", i.locale.calendar.time[this]).appendTo(s);
                if ("days" === this && e.addClass(a.clsDays), "hours" === this && e.addClass(a.clsHours), "minutes" === this && e.addClass(a.clsMinutes), "seconds" === this && e.addClass(a.clsSeconds), _("<div>").addClass("digit").appendTo(e), _("<div>").addClass("digit").appendTo(e), "days" === this && 100 <= n)
                    for (var t = 0; t < String(Math.round(n / 100)).length; t++) _("<div>").addClass("digit").appendTo(e)
            }), (e = s.find(".digit")).append(_("<span class='digit-placeholder'>").html("0")), e.append(_("<span class='digit-value'>").html("0")), this._fireEvent("countdown-create", {
                element: s
            }), !0 === a.start ? this.start() : this.tick()
        },
        _createEvents: function () {
            var e = this;
            _(document).on("visibilitychange", function () {
                document.hidden ? e.pause() : e.resume()
            }, {
                ns: this.id
            })
        },
        blink: function () {
            this.element.toggleClass("blink"), this._fireEvent("blink", {
                time: this.current
            })
        },
        tick: function () {
            var e = this.element,
                t = this.options,
                n = datetime().time(),
                i = e.find(".days"),
                s = e.find(".hours"),
                a = e.find(".minutes"),
                o = e.find(".seconds"),
                r = Math.floor((this.breakpoint - n) / 1e3);
            if (r <= -1) return this.stop(), e.addClass(t.clsAlarm), void this._fireEvent("alarm", {
                time: n
            });
            r -= 86400 * (n = Math.floor(r / 86400)), this.current.d !== n && (this.current.d = n, this.draw("days", n)), 0 === n && !1 === this.zeroDaysFired && (this.zeroDaysFired = !0, i.addClass(t.clsZero), this._fireEvent("zero", {
                part: "days",
                value: i
            })), r -= 3600 * (i = Math.floor(r / 3600)), this.current.h !== i && (this.current.h = i, this.draw("hours", i)), 0 === n && 0 === i && !1 === this.zeroHoursFired && (this.zeroHoursFired = !0, s.addClass(t.clsZero), this._fireEvent("zero", {
                part: "hours",
                value: s
            })), r -= 60 * (s = Math.floor(r / 60)), this.current.m !== s && (this.current.m = s, this.draw("minutes", s)), 0 === n && 0 === i && 0 === s && !1 === this.zeroMinutesFired && (this.zeroMinutesFired = !0, a.addClass(t.clsZero), this._fireEvent("zero", {
                part: "minutes",
                value: a
            })), r = Math.floor(r), this.current.s !== r && (this.current.s = r, this.draw("seconds", r)), 0 === n && 0 === i && 0 === s && 0 === r && !1 === this.zeroSecondsFired && (this.zeroSecondsFired = !0, o.addClass(t.clsZero), this._fireEvent("zero", {
                part: "seconds",
                value: o
            })), this._fireEvent("tick", {
                days: n,
                hours: i,
                minutes: s,
                seconds: r
            })
        },
        draw: function (e, t) {
            var n, i, s, a, o, r, l, c, d, u, h, p, f, m, v, g, C, b, w = this.element,
                y = this.options,
                S = this.duration;
            for (1 === (t = "" + t).length && (t = "0" + t), o = t.length, i = (n = w.find("." + e + " .digit:not(-old-digit)")).length, r = 0; r < o; r++)
                if (a = n.eq(i - 1).find(".digit-value"), s = Math.floor(parseInt(t) / Math.pow(10, r)) % 10, i--, parseInt(a.text()) !== s) switch (("" + y.animate).toLowerCase()) {
                    case "slide":
                        g = s, b = C = void 0, b = (v = a).height(), v.siblings("-old-digit").remove(), (C = v.clone().appendTo(v.parent())).css({
                            top: -1 * b + "px"
                        }), v.addClass("-old-digit").animate({
                            draw: {
                                top: b,
                                opacity: 0
                            },
                            dur: S,
                            ease: y.ease,
                            onDone: function () {
                                _(this).remove()
                            }
                        }), C.html(g).animate({
                            draw: {
                                top: 0,
                                opacity: 1
                            },
                            dur: S,
                            ease: y.ease
                        });
                        break;
                    case "fade":
                        f = s, m = void 0, (p = a).siblings("-old-digit").remove(), (m = p.clone().appendTo(p.parent())).css({
                            opacity: 0
                        }), p.addClass("-old-digit").animate({
                            draw: {
                                opacity: 0
                            },
                            dur: S / 2,
                            ease: y.ease,
                            onDone: function () {
                                _(this).remove()
                            }
                        }), m.html(f).animate({
                            draw: {
                                opacity: 1
                            },
                            dur: S,
                            ease: y.ease
                        });
                        break;
                    case "zoom":
                        c = s, h = u = d = void 0, u = (l = a).height(), h = parseInt(l.style("font-size")), l.siblings("-old-digit").remove(), (d = l.clone().appendTo(l.parent())).css({
                            top: 0,
                            left: 0,
                            opacity: 1
                        }), l.addClass("-old-digit").animate({
                            draw: {
                                top: u,
                                opacity: 0,
                                fontSize: 0
                            },
                            dur: S,
                            ease: y.ease,
                            onDone: function () {
                                _(this).remove()
                            }
                        }), d.html(c).animate({
                            draw: {
                                top: 0,
                                opacity: 1,
                                fontSize: [0, h]
                            },
                            dur: S,
                            ease: y.ease
                        });
                        break;
                    default:
                        a.html(s)
                }
        },
        start: function () {
            var e = this,
                t = this.element;
            !1 !== t.data("paused") && (clearInterval(this.blinkInterval), clearInterval(this.tickInterval), t.data("paused", !1), this._setBreakpoint(), this.tick(), this.blinkInterval = setInterval(function () {
                e.blink()
            }, 500), this.tickInterval = setInterval(function () {
                e.tick()
            }, 1e3))
        },
        stop: function () {
            var e = this.element;
            clearInterval(this.blinkInterval), clearInterval(this.tickInterval), e.data("paused", !0), e.find(".digit").html("0"), this.current = {
                d: 0,
                h: 0,
                m: 0,
                s: 0
            }
        },
        pause: function () {
            clearInterval(this.blinkInterval), clearInterval(this.tickInterval), this.element.data("paused", !0)
        },
        resume: function () {
            var e = this;
            this.element.data("paused", !1), this.blinkInterval = setInterval(function () {
                e.blink()
            }, 500), this.tickInterval = setInterval(function () {
                e.tick()
            }, 1e3)
        },
        reset: function () {
            var e = this,
                t = this.element,
                n = this.options;
            clearInterval(this.blinkInterval), clearInterval(this.tickInterval), t.find(".part").removeClass(n.clsZero), t.find(".digit").html("0"), this._setBreakpoint(), t.data("paused", !1), this.tick(), this.blinkInterval = setInterval(function () {
                e.blink()
            }, 500), this.tickInterval = setInterval(function () {
                e.tick()
            }, 1e3)
        },
        togglePlay: function () {
            !0 === this.element.attr("data-pause") ? this.pause() : this.start()
        },
        isPaused: function () {
            return this.element.data("paused")
        },
        getBreakpoint: function (e) {
            return !0 === e ? new Date(this.breakpoint) : this.breakpoint
        },
        getLeft: function () {
            var e = (new Date).getTime(),
                e = Math.floor(this.breakpoint - e);
            return {
                days: Math.round(e / 864e5),
                hours: Math.round(e / 36e5),
                minutes: Math.round(e / 6e4),
                seconds: Math.round(e / 1e3)
            }
        },
        i18n: function (e) {
            var t = this,
                n = this.element,
                i = this.options;
            return void 0 === e ? i.locale : void 0 !== s.locales[e] && (i.locale = e, this.locale = s.locales[i.locale], void _.each(["days", "hours", "minutes", "seconds"], function () {
                var e = ".part." + this;
                n.find(e).attr("data-label", t.locale.calendar.time[this])
            }))
        },
        changeAttrLocale: function () {
            var e = this.element.attr("data-locale");
            this.i18n(e)
        },
        changeAttribute: function (e, t) {
            switch (e) {
                case "data-pause":
                    this.togglePlay();
                    break;
                case "data-locale":
                    this.i18n(t);
                    break;
                case "data-duration":
                    this.duration = +t <= 0 || 1e3 <= +t ? 600 : +t
            }
        },
        destroy: function () {
            return clearInterval(this.blinkInterval), clearInterval(this.tickInterval), _(document).off("visibilitychange", {
                ns: this.id
            }), this.element
        }
    })
}(Metro, m4q),
function (e, i) {
    "use strict";
    var a = e.utils,
        n = {
            startOnViewport: !0,
            counterDeferred: 0,
            duration: 2e3,
            value: 0,
            from: 0,
            timeout: 0,
            delimiter: ",",
            prefix: "",
            suffix: "",
            onStart: e.noop,
            onStop: e.noop,
            onTick: e.noop,
            onCounterCreate: e.noop
        };
    e.counterSetup = function (e) {
        n = i.extend({}, n, e)
    }, window.metroCounterSetup, e.counterSetup(window.metroCounterSetup), e.Component("counter", {
        init: function (e, t) {
            return this._super(t, e, n, {
                numbers: [],
                html: i(t).html(),
                started: !1,
                id: a.elementId("counter")
            }), this
        },
        _create: function () {
            this._createEvents(), this._fireEvent("counter-create"), this._run()
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options;
            i.window().on("scroll", function () {
                !0 === n.startOnViewport && a.inViewport(t[0]) && !e.started && e.start()
            }, {
                ns: this.id
            })
        },
        _run: function () {
            var e = this.element,
                t = this.options;
            !(this.started = !1) === t.startOnViewport && !a.inViewport(e[0]) || this.start()
        },
        startInViewport: function (e, t) {
            var n = this.options;
            a.isValue(t) && (n.from = +t), a.isValue(e) && (n.value = +e), this._run()
        },
        start: function (e, t) {
            var n = this,
                i = this.element,
                s = this.options;
            a.isValue(t) && (s.from = +t), a.isValue(e) && (s.value = +e), this.started = !0, this._fireEvent("start"), i.animate({
                draw: {
                    innerHTML: [s.from, s.value]
                },
                defer: s.timeout,
                dur: s.duration,
                onFrame: function () {
                    n._fireEvent("tick", {
                        value: +this.innerHTML
                    }), this.innerHTML = s.prefix + Number(this.innerHTML).format(0, 0, s.delimiter) + s.suffix
                },
                onDone: function () {
                    n._fireEvent("stop")
                }
            })
        },
        reset: function () {
            this.started = !1, this.element.html(this.html)
        },
        changeAttribute: function (e, t) {
            var n = this.options;
            "data-value" === e && (n.value = +t), "data-from" === e && (n.from = +t)
        },
        destroy: function () {
            return i.window().off("scroll", {
                ns: this.id
            }), this.element
        }
    })
}(Metro, m4q),
function (l, c) {
    "use strict";
    var d = l.utils,
        n = {
            cubeDeferred: 0,
            rules: null,
            color: null,
            flashColor: null,
            flashInterval: 1e3,
            numbers: !1,
            offBefore: !0,
            attenuation: .3,
            stopOnBlur: !1,
            cells: 4,
            margin: 8,
            showAxis: !1,
            axisStyle: "arrow",
            cellClick: !1,
            autoRestart: 5e3,
            clsCube: "",
            clsCell: "",
            clsSide: "",
            clsSideLeft: "",
            clsSideRight: "",
            clsSideTop: "",
            clsSideLeftCell: "",
            clsSideRightCell: "",
            clsSideTopCell: "",
            clsAxis: "",
            clsAxisX: "",
            clsAxisY: "",
            clsAxisZ: "",
            custom: l.noop,
            onTick: l.noop,
            onCubeCreate: l.noop
        };
    l.cubeSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroCubeSetup, l.cubeSetup(window.metroCubeSetup), l.cubeDefaultRules = [{
        on: {
            top: [16],
            left: [4],
            right: [1]
        },
        off: {
            top: [13, 4],
            left: [1, 16],
            right: [13, 4]
        }
    }, {
        on: {
            top: [12, 15],
            left: [3, 8],
            right: [2, 5]
        },
        off: {
            top: [9, 6, 3],
            left: [5, 10, 15],
            right: [14, 11, 8]
        }
    }, {
        on: {
            top: [11],
            left: [7],
            right: [6]
        },
        off: {
            top: [1, 2, 5],
            left: [9, 13, 14],
            right: [15, 12, 16]
        }
    }, {
        on: {
            top: [8, 14],
            left: [2, 12],
            right: [9, 3]
        },
        off: {
            top: [16],
            left: [4],
            right: [1]
        }
    }, {
        on: {
            top: [10, 7],
            left: [6, 11],
            right: [10, 7]
        },
        off: {
            top: [12, 15],
            left: [3, 8],
            right: [2, 5]
        }
    }, {
        on: {
            top: [13, 4],
            left: [1, 16],
            right: [13, 4]
        },
        off: {
            top: [11],
            left: [7],
            right: [6]
        }
    }, {
        on: {
            top: [9, 6, 3],
            left: [5, 10, 15],
            right: [14, 11, 8]
        },
        off: {
            top: [8, 14],
            left: [2, 12],
            right: [9, 3]
        }
    }, {
        on: {
            top: [1, 2, 5],
            left: [9, 13, 14],
            right: [15, 12, 16]
        },
        off: {
            top: [10, 7],
            left: [6, 11],
            right: [10, 7]
        }
    }], l.Component("cube", {
        init: function (e, t) {
            return this._super(t, e, n, {
                id: d.elementId("cube"),
                rules: null,
                interval: !1,
                ruleInterval: !1,
                running: !1,
                intervals: []
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            null === t.rules ? this.rules = l.cubeDefaultRules : this._parseRules(t.rules), this._createCube(), this._createEvents(), this._fireEvent("cube-create", {
                element: e
            })
        },
        _parseRules: function (e) {
            if (null == e) return !1;
            if (d.isObject(e)) return this.rules = d.isObject(e), !0;
            try {
                return this.rules = JSON.parse(e), !0
            } catch (e) {
                return console.warn("Unknown or empty rules for cell flashing!"), !1
            }
        },
        _createCube: function () {
            var i = this.element,
                s = this.options,
                e = d.elementId("cube"),
                a = Math.pow(s.cells, 2);
            i.addClass("cube").addClass(s.clsCube), i.attr("id") || i.attr("id", e), this.id = i.attr("id"), this._createCssForFlashColor(), this._createCssForCellSize(), c.each(["left", "right", "top"], function () {
                var e, t, n = c("<div>").addClass("side " + this + "-side").addClass(s.clsSide).appendTo(i);
                for ("left" === this && n.addClass(s.clsSideLeft), "right" === this && n.addClass(s.clsSideRight), "top" === this && n.addClass(s.clsSideTop), t = 0; t < a; t++)(e = c("<div>").addClass("cube-cell").addClass("cell-id-" + (t + 1)).addClass(s.clsCell)).data("id", t + 1).data("side", this), e.appendTo(n), !0 === s.numbers && e.html(t + 1)
            });
            e = i.find(".cube-cell");
            null !== s.color && (l.colors.isColor(s.color) ? e.css({
                backgroundColor: s.color,
                borderColor: s.color
            }) : e.addClass(s.color));
            c.each(["x", "y", "z"], function () {
                var e = c("<div>").addClass("axis " + s.axisStyle).addClass("axis-" + this).addClass(s.clsAxis);
                "x" === this && e.addClass(s.clsAxisX), "y" === this && e.addClass(s.clsAxisY), "z" === this && e.addClass(s.clsAxisZ), e.appendTo(i)
            }), !1 === s.showAxis && i.find(".axis").hide(), this._run()
        },
        _run: function () {
            var e, t = this,
                n = this.element,
                i = this.options;
            clearInterval(this.interval), n.find(".cube-cell").removeClass("light"), i.custom !== l.noop ? d.exec(i.custom, [n]) : (n.find(".cube-cell").removeClass("light"), t._start(), e = d.isObject(this.rules) ? d.objectLength(this.rules) : 0, this.interval = setInterval(function () {
                t._start()
            }, e * i.flashInterval))
        },
        _createCssForCellSize: function () {
            var e, t = this.element,
                n = this.options,
                i = l.sheet;
            8 === n.margin && 4 === n.cells || (e = parseInt(d.getStyleOne(t, "width")), e = Math.ceil((e / 2 - n.margin * n.cells * 2) / n.cells), d.addCssRule(i, "#" + t.attr("id") + " .side .cube-cell", "width: " + e + "px!important; height: " + e + "px!important; margin: " + n.margin + "px!important;"))
        },
        _createCssForFlashColor: function () {
            var e, t, n, i = this.element,
                s = this.options,
                a = l.sheet,
                o = [],
                r = [];
            if (null !== s.flashColor) {
                for (e = "0 0 10px " + l.colors.toRGBA(s.flashColor, 1), t = "0 0 10px " + l.colors.toRGBA(s.flashColor, s.attenuation), n = 0; n < 3; n++) o.push(e), r.push(t);
                d.addCssRule(a, "@keyframes pulsar-cell-" + i.attr("id"), "0%, 100% { box-shadow: " + o.join(",") + "} 50% { box-shadow: " + r.join(",") + " }"), d.addCssRule(a, "#" + i.attr("id") + " .side .cube-cell.light", "animation: pulsar-cell-" + i.attr("id") + " 2.5s 0s ease-out infinite; background-color: " + s.flashColor + "!important; border-color: " + s.flashColor + "!important;")
            }
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options;
            c(window).on(l.events.blur, function () {
                !0 === n.stopOnBlur && !0 === e.running && e._stop()
            }, {
                ns: t.attr("id")
            }), c(window).on(l.events.focus, function () {
                !0 === n.stopOnBlur && !1 === e.running && e._start()
            }, {
                ns: t.attr("id")
            }), t.on(l.events.click, ".cube-cell", function () {
                !0 === n.cellClick && c(this).toggleClass("light")
            })
        },
        _start: function () {
            var n = this;
            this.element.find(".cube-cell").removeClass("light"), this.running = !0, c.each(this.rules, function (e, t) {
                n._execRule(e, t)
            })
        },
        _stop: function () {
            this.running = !1, clearInterval(this.interval), c.each(this.intervals, function () {
                clearInterval(this)
            })
        },
        _tick: function (e, t) {
            var n = this,
                i = this.options;
            void 0 === t && (t = i.flashInterval * e);
            var s = setTimeout(function () {
                n._fireEvent("tick", {
                    index: e
                }), clearInterval(s), d.arrayDelete(n.intervals, s)
            }, t);
            this.intervals.push(s)
        },
        _toggle: function (e, t, n, i) {
            var s = this;
            void 0 === i && (i = this.options.flashInterval * n);
            var a = setTimeout(function () {
                e["on" === t ? "addClass" : "removeClass"]("light"), clearInterval(a), d.arrayDelete(s.intervals, a)
            }, i);
            this.intervals.push(a)
        },
        start: function () {
            this._start()
        },
        stop: function () {
            this._stop()
        },
        toRule: function (e, t) {
            var n = this,
                i = this.element,
                s = this.options,
                a = this.rules;
            if (null != a && void 0 !== a[e]) {
                clearInterval(this.ruleInterval), this.ruleInterval = !1, this.stop(), i.find(".cube-cell").removeClass("light");
                for (var o = 0; o <= e; o++) this._execRule(o, a[o], t);
                d.isInt(s.autoRestart) && 0 < s.autoRestart && (this.ruleInterval = setTimeout(function () {
                    n._run()
                }, s.autoRestart))
            }
        },
        _execRule: function (i, s, a) {
            var o = this,
                r = this.element;
            this._tick(i, a), c.each(["left", "right", "top"], function () {
                var t = "." + this + "-side",
                    e = void 0 !== s.on && void 0 !== s.on[this] && s.on[this],
                    n = void 0 !== s.off && void 0 !== s.off[this] && s.off[this];
                !1 !== e && c.each(e, function () {
                    var e = r.find(t + " .cell-id-" + this);
                    o._toggle(e, "on", i, a)
                }), !1 !== n && c.each(n, function () {
                    var e = r.find(t + " .cell-id-" + this);
                    o._toggle(e, "off", i, a)
                })
            })
        },
        rule: function (e) {
            if (void 0 === e) return this.rules;
            !0 === this._parseRules(e) && (this.options.rules = e, this.stop(), this.element.find(".cube-cell").removeClass("light"), this._run())
        },
        axis: function (e) {
            e = !0 === e ? "show" : "hide";
            this.element.find(".axis")[e]()
        },
        changeRules: function () {
            var e = this.element,
                t = this.options,
                n = e.attr("data-rules");
            !0 === this._parseRules(n) && (this.stop(), e.find(".cube-cell").removeClass("light"), t.rules = n, this._run())
        },
        changeAxisVisibility: function () {
            var e = this.element,
                t = !0 === JSON.parse(e.attr("data-show-axis")) ? "show" : "hide";
            e.find(".axis")[t]()
        },
        changeAxisStyle: function () {
            var e = this.element,
                t = e.attr("data-axis-style");
            e.find(".axis").removeClass("arrow line no-style").addClass(t)
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-rules":
                    this.changeRules();
                    break;
                case "data-show-axis":
                    this.changeAxisVisibility();
                    break;
                case "data-axis-style":
                    this.changeAxisStyle()
            }
        },
        destroy: function () {
            var e = this.element;
            return clearInterval(this.interval), this.interval = null, c(window).off(l.events.blur, {
                ns: e.attr("id")
            }), c(window).off(l.events.focus, {
                ns: e.attr("id")
            }), e.off(l.events.click, ".cube-cell"), e
        }
    })
}(Metro, m4q),
function (r, d) {
    "use strict";
    var u = r.utils,
        n = {
            label: "",
            datepickerDeferred: 0,
            gmt: 0,
            format: "YYYY-MM-DD",
            inputFormat: null,
            locale: METRO_LOCALE,
            value: null,
            distance: 3,
            month: !0,
            day: !0,
            year: !0,
            minYear: null,
            maxYear: null,
            defaultYearDistance: 100,
            scrollSpeed: 4,
            copyInlineStyles: !1,
            clsPicker: "",
            clsPart: "",
            clsMonth: "",
            clsDay: "",
            clsYear: "",
            clsLabel: "",
            clsButton: "",
            clsOkButton: "",
            clsCancelButton: "",
            okButtonIcon: "<span class='default-icon-check'></span>",
            cancelButtonIcon: "<span class='default-icon-cross'></span>",
            onSet: r.noop,
            onOpen: r.noop,
            onClose: r.noop,
            onScroll: r.noop,
            onDatePickerCreate: r.noop
        };
    r.datePickerSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroDatePickerSetup, r.datePickerSetup(window.metroDatePickerSetup), r.Component("date-picker", {
        init: function (e, t) {
            return this._super(t, e, n, {
                picker: null,
                isOpen: !1,
                value: datetime(),
                locale: null,
                listTimer: {
                    day: null,
                    month: null,
                    year: null
                }
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options,
                n = datetime();
            t.distance < 1 && (t.distance = 1), u.isValue(e.val()) && (t.value = e.val()), u.isValue(t.value) && (this.value = t.inputFormat ? Datetime.from(t.value, t.inputFormat, t.locale) : datetime(t.value)), void 0 === r.locales[t.locale] && (t.locale = METRO_LOCALE), this.locale = r.locales[t.locale].calendar, null === t.minYear && (t.minYear = n.year() - t.defaultYearDistance), null === t.maxYear && (t.maxYear = n.year() + t.defaultYearDistance), this._createStructure(), this._createEvents(), this._set(), this._fireEvent("datepicker-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t, n, i, s, a, o = this.element,
                r = this.options,
                l = u.elementId("datepicker"),
                c = d("<div>").attr("id", l).addClass("wheel-picker date-picker " + o[0].className).addClass(r.clsPicker);
            if (c.insertBefore(o), o.appendTo(c), r.label && (a = d("<label>").addClass("label-for-input").addClass(r.clsLabel).html(r.label).insertBefore(c), o.attr("id") && a.attr("for", o.attr("id")), "rtl" === o.attr("dir") && a.addClass("rtl")), l = d("<div>").addClass("date-wrapper").appendTo(c), !0 === r.month && (e = d("<div>").addClass("month").addClass(r.clsPart).addClass(r.clsMonth).appendTo(l)), !0 === r.day && (t = d("<div>").addClass("day").addClass(r.clsPart).addClass(r.clsDay).appendTo(l)), !0 === r.year && (n = d("<div>").addClass("year").addClass(r.clsPart).addClass(r.clsYear).appendTo(l)), a = d("<div>").addClass("select-wrapper").appendTo(c), l = d("<div>").addClass("select-block").appendTo(a), !0 === r.month) {
                for (e = d("<ul>").addClass("sel-month").appendTo(l), i = 0; i < r.distance; i++) d("<li>").html("&nbsp;").data("value", -1).appendTo(e);
                for (i = 0; i < 12; i++) d("<li>").addClass("js-month-" + i + " js-month-real-" + this.locale.months[i].toLowerCase()).html(this.locale.months[i]).data("value", i).appendTo(e);
                for (i = 0; i < r.distance; i++) d("<li>").html("&nbsp;").data("value", -1).appendTo(e)
            }
            if (!0 === r.day) {
                for (t = d("<ul>").addClass("sel-day").appendTo(l), i = 0; i < r.distance; i++) d("<li>").html("&nbsp;").data("value", -1).appendTo(t);
                for (i = 0; i < 31; i++) d("<li>").addClass("js-day-" + i + " js-day-real-" + (i + 1)).html(i + 1).data("value", i + 1).appendTo(t);
                for (i = 0; i < r.distance; i++) d("<li>").html("&nbsp;").data("value", -1).appendTo(t)
            }
            if (!0 === r.year) {
                for (n = d("<ul>").addClass("sel-year").appendTo(l), i = 0; i < r.distance; i++) d("<li>").html("&nbsp;").data("value", -1).appendTo(n);
                for (i = r.minYear, s = 0; i <= r.maxYear; i++, s++) d("<li>").addClass("js-year-" + s + " js-year-real-" + i).html(i).data("value", i).appendTo(n);
                for (i = 0; i < r.distance; i++) d("<li>").html("&nbsp;").data("value", -1).appendTo(n)
            }
            if (l.height(40 * (2 * r.distance + 1)), a = d("<div>").addClass("action-block").appendTo(a), d("<button>").attr("type", "button").addClass("button action-ok").addClass(r.clsButton).addClass(r.clsOkButton).html(r.okButtonIcon).appendTo(a), d("<button>").attr("type", "button").addClass("button action-cancel").addClass(r.clsButton).addClass(r.clsCancelButton).html(r.cancelButtonIcon).appendTo(a), !(o[0].className = "") === r.copyInlineStyles)
                for (i = 0; i < o[0].style.length; i++) c.css(o[0].style[i], o.css(o[0].style[i]));
            o.prop("disabled") && c.addClass("disabled"), this.picker = c
        },
        _createEvents: function () {
            var s = this,
                a = this.options,
                o = this.picker;
            o.on(r.events.start, ".select-block ul", function (e) {
                var t, n;
                e.changedTouches || (t = this, n = u.pageXY(e).y, d(document).on(r.events.move, function (e) {
                    t.scrollTop -= a.scrollSpeed * (n > u.pageXY(e).y ? -1 : 1), n = u.pageXY(e).y
                }, {
                    ns: o.attr("id")
                }), d(document).on(r.events.stop, function () {
                    d(document).off(r.events.move, {
                        ns: o.attr("id")
                    }), d(document).off(r.events.stop, {
                        ns: o.attr("id")
                    })
                }, {
                    ns: o.attr("id")
                }))
            }), o.on(r.events.click, function (e) {
                !1 === s.isOpen && s.open(), e.stopPropagation()
            }), o.on(r.events.click, ".action-ok", function (e) {
                var t = o.find(".sel-month li.active"),
                    n = o.find(".sel-day li.active"),
                    i = o.find(".sel-year li.active"),
                    t = 0 === t.length ? s.value.getMonth() : t.data("value"),
                    n = 0 === n.length ? s.value.getDate() : n.data("value"),
                    i = 0 === i.length ? s.value.getFullYear() : i.data("value");
                s.value = datetime(i, t, n), s._correct(), s._set(), s.close(), e.stopPropagation()
            }), o.on(r.events.click, ".action-cancel", function (e) {
                s.close(), e.stopPropagation()
            });
            d.each(["month", "day", "year"], function () {
                var n = this,
                    i = o.find(".sel-" + n);
                i.on("scroll", function () {
                    s.isOpen && (s.listTimer[n] && (clearTimeout(s.listTimer[n]), s.listTimer[n] = null), s.listTimer[n] || (s.listTimer[n] = setTimeout(function () {
                        var e, t;
                        s.listTimer[n] = null, t = Math.round(Math.ceil(i.scrollTop()) / 40), t = (e = i.find(".js-" + n + "-" + t)).position().top - 40 * a.distance, i.find(".active").removeClass("active"), i[0].scrollTop = t, e.addClass("active"), u.exec(a.onScroll, [e, i, o], i[0])
                    }, 150)))
                })
            })
        },
        _correct: function () {
            var e = this.value.month(),
                t = this.value.day(),
                n = this.value.year();
            this.value = datetime(n, e, t)
        },
        _set: function () {
            var e = this.element,
                t = this.options,
                n = this.picker,
                i = this.locale.months[this.value.month()],
                s = this.value.day(),
                a = this.value.year();
            !0 === t.month && n.find(".month").html(i), !0 === t.day && n.find(".day").html(s), !0 === t.year && n.find(".year").html(a), e.val(this.value.format(t.format, t.locale)).trigger("change"), this._fireEvent("set", {
                value: this.value.val(),
                elementValue: e.val(),
                picker: n
            })
        },
        open: function () {
            var e, t, n = this.options,
                i = this.picker,
                s = this.value.month(),
                a = this.value.day() - 1,
                o = this.value.year(),
                r = i.find(".select-wrapper");
            r.parent().removeClass("for-top for-bottom"), r.show(0), i.find("li").removeClass("active"), e = u.inViewport(r[0]), t = u.rect(r[0]), !e && 0 < t.top && r.parent().addClass("for-bottom"), !e && t.top < 0 && r.parent().addClass("for-top"), !0 === n.month && (r = i.find(".sel-month")).scrollTop(0).animate({
                draw: {
                    scrollTop: r.find("li.js-month-" + s).addClass("active").position().top - 40 * n.distance
                },
                dur: 100
            }), !0 === n.day && (s = i.find(".sel-day")).scrollTop(0).animate({
                draw: {
                    scrollTop: s.find("li.js-day-" + a).addClass("active").position().top - 40 * n.distance
                },
                dur: 100
            }), !0 === n.year && (a = i.find(".sel-year")).scrollTop(0).animate({
                draw: {
                    scrollTop: a.find("li.js-year-real-" + o).addClass("active").position().top - 40 * n.distance
                },
                dur: 100
            }), this.isOpen = !0, this._fireEvent("open", {
                value: this.value.val(),
                picker: i
            })
        },
        close: function () {
            var e = this.picker;
            e.find(".select-wrapper").hide(0), this.isOpen = !1, this._fireEvent("close", {
                value: this.value.val(),
                picker: e
            })
        },
        val: function (e) {
            var t = this.options;
            if (!u.isValue(e)) return this.element.val();
            this.value = t.inputFormat ? Datetime.from(e, t.inputFormat, t.locale) : datetime(e), this._set()
        },
        date: function (e, t) {
            if (void 0 === e) return this.value.val();
            try {
                this.value = Datetime.from(e, t, this.options.locale), this._set()
            } catch (e) {
                return !1
            }
        },
        i18n: function (e) {
            var t, n, i = this.element,
                s = this.options;
            if (s.locale = e || i.attr("data-locale"), this.locale = r.locales[s.locale].calendar, !0 === s.month) {
                for (t = i.closest(".date-picker").find(".sel-month").html(""), n = 0; n < s.distance; n++) d("<li>").html("&nbsp;").data("value", -1).appendTo(t);
                for (n = 0; n < 12; n++) d("<li>").addClass("js-month-" + n + " js-month-real-" + this.locale.months[n].toLowerCase()).html(this.locale.months[n]).data("value", n).appendTo(t);
                for (n = 0; n < s.distance; n++) d("<li>").html("&nbsp;").data("value", -1).appendTo(t)
            }
            this._set()
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e, t) {
            switch (e) {
                case "disabled":
                    this.toggleState();
                    break;
                case "data-value":
                    this.val(t);
                    break;
                case "data-locale":
                    this.i18n(t);
                    break;
                case "data-format":
                    this.options.format = t, this._set()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.picker;
            return d.each(["moth", "day", "year"], function () {
                t.find(".sel-" + this).off("scroll")
            }), t.off(r.events.start, ".select-block ul"), t.off(r.events.click), t.off(r.events.click, ".action-ok"), t.off(r.events.click, ".action-cancel"), e
        }
    }), d(document).on(r.events.click, function () {
        d.each(d(".date-picker"), function () {
            d(this).find("input").each(function () {
                r.getPlugin(this, "datepicker").close()
            })
        })
    })
}(Metro, m4q),
function (r, l) {
    "use strict";
    var c = r.utils,
        n = {
            dialogDeferred: 0,
            closeButton: !1,
            leaveOverlayOnClose: !1,
            toTop: !1,
            toBottom: !1,
            locale: METRO_LOCALE,
            title: "",
            content: "",
            actions: {},
            actionsAlign: "right",
            defaultAction: !0,
            overlay: !0,
            overlayColor: "#000000",
            overlayAlpha: .5,
            overlayClickClose: !1,
            width: "480",
            height: "auto",
            shadow: !0,
            closeAction: !0,
            clsDialog: "",
            clsTitle: "",
            clsContent: "",
            clsAction: "",
            clsDefaultAction: "",
            clsOverlay: "",
            autoHide: 0,
            removeOnClose: !1,
            show: !1,
            _runtime: !1,
            onShow: r.noop,
            onHide: r.noop,
            onOpen: r.noop,
            onClose: r.noop,
            onDialogCreate: r.noop
        };
    r.dialogSetup = function (e) {
        n = l.extend({}, n, e)
    }, window.metroDialogSetup, r.dialogSetup(window.metroDialogSetup), r.Component("dialog", {
        _counter: 0,
        init: function (e, t) {
            return this._super(t, e, n, {
                interval: null,
                overlay: null,
                id: c.elementId("dialog")
            }), this
        },
        _create: function () {
            var e = this.options;
            this.locale = void 0 !== r.locales[e.locale] ? r.locales[e.locale] : r.locales["en-US"], this._build()
        },
        _build: function () {
            var t, n, e = this,
                i = this.element,
                s = this.options,
                a = l("body");
            i.addClass("dialog"), !0 === s.shadow && i.addClass("shadow-on"), "" !== s.title && this.setTitle(s.title), "" !== s.content && this.setContent(s.content), (!0 === s.defaultAction || !1 !== s.actions && "object" == typeof s.actions && 0 < c.objectLength(s.actions)) && (0 === (t = i.find(".dialog-actions")).length && (t = l("<div>").addClass("dialog-actions").addClass("text-" + s.actionsAlign).appendTo(i)), !0 === s.defaultAction && 0 === c.objectLength(s.actions) && 0 === i.find(".dialog-actions > *").length && (n = l("<button>").addClass("button js-dialog-close").addClass(s.clsDefaultAction).html(this.locale.buttons.ok)).appendTo(t), c.isObject(s.actions) && l.each(c.isObject(s.actions), function () {
                var e = this;
                n = l("<button>").addClass("button").addClass(e.cls).html(e.caption), void 0 !== e.onclick && n.on(r.events.click, function () {
                    c.exec(e.onclick, [i])
                }), n.appendTo(t)
            })), !0 === s.overlay && (o = this._overlay(), this.overlay = o), !0 === s.closeAction && i.on(r.events.click, ".js-dialog-close", function () {
                e.close()
            });
            var o = i.find("closer");
            0 === o.length && (o = l("<span>").addClass("button square closer js-dialog-close")).appendTo(i), !0 !== s.closeButton && o.hide(), i.css({
                width: s.width,
                height: s.height,
                visibility: "hidden",
                top: "100%",
                left: (l(window).width() - i.outerWidth()) / 2
            }), i.addClass(s.clsDialog), i.find(".dialog-title").addClass(s.clsTitle), i.find(".dialog-content").addClass(s.clsContent), i.find(".dialog-actions").addClass(s.clsAction), i.appendTo(a), s.show && this.open(), l(window).on(r.events.resize, function () {
                e.setPosition()
            }, {
                ns: this.id
            }), this._fireEvent("dialog-create", {
                element: i
            })
        },
        _overlay: function () {
            var e = this.options,
                t = l("<div>");
            return t.addClass("overlay").addClass(e.clsOverlay), "transparent" === e.overlayColor ? t.addClass("transparent") : t.css({
                background: r.colors.toRGBA(e.overlayColor, e.overlayAlpha)
            }), t
        },
        hide: function (e) {
            var t = this.element,
                n = 0;
            this.options.onHide !== r.noop && (n = 500, this._fireEvent("hide")), setTimeout(function () {
                c.exec(e, null, t[0]), t.css({
                    visibility: "hidden",
                    top: "100%"
                })
            }, n)
        },
        show: function (e) {
            var t = this.element;
            this.setPosition(), t.css({
                visibility: "visible"
            }), this._fireEvent("show"), c.exec(e, null, t[0])
        },
        setPosition: function () {
            var e, t, n = this.element,
                i = this.options;
            !0 !== i.toTop && !0 !== i.toBottom ? ((e = (l(window).height() - n.outerHeight()) / 2) < 0 && (e = 0), t = "auto") : (!0 === i.toTop && (e = 0, t = "auto"), !0 !== i.toTop && !0 === i.toBottom && (t = 0, e = "auto")), n.css({
                top: e,
                bottom: t,
                left: (l(window).width() - n.outerWidth()) / 2
            })
        },
        setContent: function (e) {
            var t = this.element,
                n = t.find(".dialog-content");
            0 === n.length && (n = l("<div>").addClass("dialog-content")).appendTo(t), !c.isQ(e) && c.isFunc(e) && (e = c.exec(e)), c.isQ(e) ? e.appendTo(n) : n.html(e)
        },
        setTitle: function (e) {
            var t = this.element,
                n = t.find(".dialog-title");
            0 === n.length && (n = l("<div>").addClass("dialog-title")).appendTo(t), n.html(e)
        },
        close: function () {
            var e = this,
                t = this.element,
                n = this.options;
            c.bool(n.leaveOverlayOnClose) || l("body").find(".overlay").remove(), this.hide(function () {
                t.data("open", !1), e._fireEvent("close"), !0 === n.removeOnClose && t.remove()
            })
        },
        open: function () {
            var e = this,
                t = this.element,
                n = this.options;
            !0 === n.overlay && 0 === l(".overlay").length && (this.overlay.appendTo(l("body")), !0 === n.overlayClickClose && this.overlay.on(r.events.click, function () {
                e.close()
            })), this.show(function () {
                e._fireEvent("open"), t.data("open", !0), 0 < parseInt(n.autoHide) && setTimeout(function () {
                    e.close()
                }, parseInt(n.autoHide))
            })
        },
        toggle: function () {
            this.element.data("open") ? this.close() : this.open()
        },
        isOpen: function () {
            return !0 === this.element.data("open")
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return e.off(r.events.click, ".js-dialog-close"), e.find(".button").off(r.events.click), l(window).off(r.events.resize, {
                ns: this.id
            }), e
        }
    }), r.dialog = {
        isDialog: function (e) {
            return c.isMetroObject(e, "dialog")
        },
        open: function (e, t, n) {
            if (!this.isDialog(e)) return !1;
            e = r.getPlugin(e, "dialog");
            void 0 !== n && e.setTitle(n), void 0 !== t && e.setContent(t), e.open()
        },
        close: function (e) {
            if (!this.isDialog(e)) return !1;
            r.getPlugin(l(e)[0], "dialog").close()
        },
        toggle: function (e) {
            if (!this.isDialog(e)) return !1;
            r.getPlugin(l(e)[0], "dialog").toggle()
        },
        isOpen: function (e) {
            if (!this.isDialog(e)) return !1;
            r.getPlugin(l(e)[0], "dialog").isOpen()
        },
        remove: function (e) {
            if (!this.isDialog(e)) return !1;
            e = r.getPlugin(l(e)[0], "dialog");
            e.options.removeOnClose = !0, e.close()
        },
        create: function (e) {
            var t = l("<div>").appendTo(l("body")),
                e = l.extend({}, {
                    show: !0,
                    closeAction: !0,
                    removeOnClose: !0
                }, void 0 !== e ? e : {});
            return e._runtime = !0, r.makePlugin(t, "dialog", e)
        }
    }
}(Metro, m4q),
function (l, c) {
    "use strict";
    var d = l.utils,
        n = {
            donutDeferred: 0,
            size: 100,
            hole: .8,
            value: 0,
            background: "#ffffff",
            color: "",
            stroke: "#d1d8e7",
            fill: "#49649f",
            fontSize: 0,
            total: 100,
            cap: "%",
            showText: !0,
            showValue: !1,
            animate: 0,
            onChange: l.noop,
            onDrawValue: function (e) {
                return e
            },
            onDonutCreate: l.noop
        };
    l.donutSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroDonutSetup, l.donutSetup(window.metroDonutSetup), l.Component("donut", {
        init: function (e, t) {
            return this._super(t, e, n, {
                value: 0,
                animation_change_interval: null
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            e.addClass("donut"), this._setElementSize(), this._draw(), this._addEvents(), this.val(t.value), this._fireEvent("donut-create", {
                element: e
            })
        },
        _setElementSize: function () {
            var e = this.element,
                t = this.options,
                n = t.size;
            e.css({
                width: n,
                background: t.background
            }), e.css({
                height: e.width()
            })
        },
        _draw: function () {
            var e = this.element,
                t = this.options,
                n = "",
                i = e.width() / 2,
                s = i * (1 - (1 - t.hole) / 2),
                a = i * (1 - t.hole),
                o = "rotate(-90 " + i + "," + i + ")",
                r = 0 === t.fontSize ? s * t.hole * .6 : t.fontSize;
            n += "<svg>", n += "   <circle class='donut-back' r='" + s + "px' cx='" + i + "px' cy='" + i + "px' transform='" + o + "' fill='none' stroke='" + t.stroke + "' stroke-width='" + a + "'/>", n += "   <circle class='donut-fill' r='" + s + "px' cx='" + i + "px' cy='" + i + "px' transform='" + o + "' fill='none' stroke='" + t.fill + "' stroke-width='" + a + "'/>", !0 === t.showText && (n += "   <text class='donut-title' x='" + i + "px' y='" + i + "px' dy='" + r / 3 + "px' text-anchor='middle' fill='" + ("" !== t.color ? t.color : t.fill) + "' font-size='" + r + "px'></text>"), n += "</svg>", e.html(n)
        },
        _addEvents: function () {
            var e = this;
            c(window).on("resize", function () {
                e._setElementSize(), e._draw(), e.val(e.value)
            })
        },
        _setValue: function (e) {
            var t = this.element,
                n = this.options,
                i = t.find(".donut-fill"),
                s = t.find(".donut-title"),
                t = t.width() / 2 * (1 - (1 - n.hole) / 2),
                a = Math.round(2 * Math.PI * t),
                t = n.showValue ? e : d.percent(n.total, e, !0),
                e = Math.round(+e * a / n.total),
                o = i.attr("stroke-dasharray"),
                r = e - (o = void 0 === o ? 0 : +o.split(" ")[0]);
            i.animate({
                draw: function (e, t) {
                    c(this).attr("stroke-dasharray", o + r * t + " " + a)
                },
                dur: n.animate
            }), s.html(l.utils.exec(n.onDrawValue, [t + n.cap]))
        },
        val: function (e) {
            var t = this.options;
            return void 0 === e ? this.value : !(parseInt(e) < 0 || parseInt(e) > t.total) && (this._setValue(e), this.value = e, void this._fireEvent("change", {
                value: this.value
            }))
        },
        setColor: function (e) {
            var n = ["background, fill, stroke, color"];
            return c.each(e, function (e, t) {
                -1 !== n.indexOf(e) && (this.options[e] = t)
            }), this._draw(), this.val(this.value), this
        },
        changeValue: function () {
            this.val(this.element.attr("data-value"))
        },
        changeAttribute: function (e, t) {
            switch (e) {
                case "data-value":
                    this.changeValue();
                    break;
                case "data-background":
                    this.setColor({
                        background: t
                    });
                    break;
                case "data-fill":
                    this.setColor({
                        fill: t
                    });
                    break;
                case "data-stroke":
                    this.setColor({
                        stroke: t
                    });
                    break;
                case "data-color":
                    this.setColor({
                        color: t
                    })
            }
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (e, o) {
    "use strict";
    var n = {
        height: "auto",
        multiSelect: !1,
        moveRightIcon: "<span>&rsaquo;</span>",
        moveRightAllIcon: "<span>&raquo;</span>",
        moveLeftIcon: "<span>&lsaquo;</span>",
        moveLeftAllIcon: "<span>&laquo;</span>",
        clsBox: "",
        clsMoveButton: "",
        clsMoveRightButton: "",
        clsMoveRightAllButton: "",
        clsMoveLeftButton: "",
        clsMoveLeftAllButton: "",
        clsListLeft: "",
        clsListRight: "",
        onDoubleSelectBoxCreate: e.noop
    };
    e.doubleSelectBoxSetup = function (e) {
        n = o.extend({}, n, e)
    }, window.metroDoubleSelectBoxSetup, e.doubleSelectBoxSetup(window.metroDoubleSelectBoxSetup), e.Component("double-select-box", {
        init: function (e, t) {
            return this._super(t, e, n, {
                select1: null,
                select2: null,
                list1: null,
                list2: null
            }), this
        },
        _create: function () {
            var e = this.element;
            this.options;
            if (2 !== e.children("select").length) throw new Error("Component DoubleSelectBox required two select elements!");
            this._createStructure(), this._createEvents(), this._fireEvent("double-select-box-create")
        },
        _drawList: function () {
            var i = this;
            this.list1.clear(), this.select1.find("option").each(function (e, t) {
                var n = o(t),
                    n = n.attr("data-template") ? n.attr("data-template").replace(/\$1/g, n.text()) : n.text();
                i.list1.append(o("<li>").html(n).attr("data-value", t.value).data("option", t))
            }), this.list2.clear(), this.select2.find("option").each(function (e, t) {
                var n = o(t),
                    n = n.attr("data-template") ? n.attr("data-template").replace(/\$1/g, n.text()) : n.text();
                i.list2.append(o("<li>").html(n).attr("data-value", t.value).data("option", t))
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = e.children("select"),
                i = n.eq(0),
                s = n.eq(1),
                a = o("<div>").addClass("controls").insertBefore(s);
            e.addClass("double-select-box").addClass(t.clsBox).css({
                height: t.height
            }), n.prop("multiple", !0), a.append(o([o("<button>").attr("type", "button").addClass("button --move-right").addClass(t.clsMoveButton).addClass(t.clsMoveRightButton).html(t.moveRightIcon), o("<button>").attr("type", "button").addClass("button --move-right-all").addClass(t.clsMoveButton).addClass(t.clsMoveRightAllButton).html(t.moveRightAllIcon), o("<button>").attr("type", "button").addClass("button --move-left-all").addClass(t.clsMoveButton).addClass(t.clsMoveLeftAllButton).html(t.moveLeftAllIcon), o("<button>").attr("type", "button").addClass("button --move-left").addClass(t.clsMoveButton).addClass(t.clsMoveLeftButton).html(t.moveLeftIcon)])), a = o("<ul>").addClass("--list1").addClass(t.clsListLeft).insertBefore(i), t = o("<ul>").addClass("--list2").addClass(t.clsListRight).insertBefore(s), this.select1 = i, this.select2 = s, this.list1 = a, this.list2 = t, this._drawList()
        },
        _moveItems: function (e, n) {
            o.each(e, function () {
                var e = o(this),
                    t = e.data("option");
                o(t).appendTo(n[0]), e.removeClass("active").appendTo(n[1])
            })
        },
        _move: function (e, t) {
            var n = this;
            "selected" === t ? "ltr" === e ? n._moveItems(this.list1.find("li.active"), [n.select2, n.list2]) : n._moveItems(this.list2.find("li.active"), [n.select1, n.list1]) : "ltr" === e ? n._moveItems(this.list1.find("li"), [n.select2, n.list2]) : n._moveItems(this.list2.find("li"), [n.select1, n.list1])
        },
        _createEvents: function () {
            var n = this,
                e = this.element,
                t = this.options,
                i = e.find("li");
            i.on("click", function () {
                var e = o(this);
                !1 === t.multiSelect && (n.list1.find("li").removeClass("active"), n.list2.find("li").removeClass("active")), e.addClass("active")
            }), i.on("dblclick", function () {
                var e = o(this),
                    t = e.parent().hasClass("--list1") ? "ltr" : "rtl";
                n.list1.find("li").removeClass("active"), n.list2.find("li").removeClass("active"), e.addClass("active"), n._move(t, "selected")
            }), e.on("click", "button", function () {
                var e = o(this);
                if (e.hasClass("--move-right")) n._move("ltr", "selected");
                else if (e.hasClass("--move-right-all")) n._move("ltr", "all");
                else if (e.hasClass("--move-left")) n._move("rtl", "selected");
                else {
                    if (!e.hasClass("--move-left-all")) throw new Error("Pressed unregistered button!");
                    n._move("rtl", "all")
                }
            })
        },
        changeAttribute: function (e, t) {},
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (u, h) {
    "use strict";
    var l = u.utils,
        n = {
            doublesliderDeferred: 0,
            roundValue: !0,
            min: 0,
            max: 100,
            accuracy: 0,
            showMinMax: !1,
            minMaxPosition: u.position.TOP,
            valueMin: null,
            valueMax: null,
            hint: !1,
            hintAlways: !1,
            hintPositionMin: u.position.TOP,
            hintPositionMax: u.position.TOP,
            hintMaskMin: "$1",
            hintMaskMax: "$1",
            target: null,
            size: 0,
            clsSlider: "",
            clsBackside: "",
            clsComplete: "",
            clsMarker: "",
            clsMarkerMin: "",
            clsMarkerMax: "",
            clsHint: "",
            clsHintMin: "",
            clsHintMax: "",
            clsMinMax: "",
            clsMin: "",
            clsMax: "",
            onStart: u.noop,
            onStop: u.noop,
            onMove: u.noop,
            onChange: u.noop,
            onChangeValue: u.noop,
            onFocus: u.noop,
            onBlur: u.noop,
            onDoubleSliderCreate: u.noop
        };
    u.doubleSliderSetup = function (e) {
        n = h.extend({}, n, e)
    }, window.metroDoubleSliderSetup, u.doubleSliderSetup(window.metroDoubleSliderSetup), u.Component("double-slider", {
        init: function (e, t) {
            return this._super(t, e, n, {
                slider: null,
                valueMin: null,
                valueMax: null,
                keyInterval: !1,
                id: l.elementId("slider")
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.valueMin = l.isValue(t.valueMin) ? +t.valueMin : +t.min, this.valueMax = l.isValue(t.valueMax) ? +t.valueMax : +t.max, this._createSlider(), this._createEvents(), this.val(this.valueMin, this.valueMax), this._fireEvent("double-slider-create", {
                element: e
            })
        },
        _createSlider: function () {
            var e, t = this.element,
                n = this.options,
                i = h("<div>").addClass("slider-wrapper"),
                s = h("<div>").addClass("slider").addClass(n.clsSlider).addClass(this.elem.className),
                a = h("<div>").addClass("backside").addClass(n.clsBackside),
                o = h("<div>").addClass("complete").addClass(n.clsComplete),
                r = h("<button>").attr("type", "button").addClass("marker marker-min").addClass(n.clsMarker).addClass(n.clsMarkerMin),
                l = h("<button>").attr("type", "button").addClass("marker marker-max").addClass(n.clsMarker).addClass(n.clsMarkerMax),
                c = h("<div>").addClass("hint hint-min").addClass(n.hintPositionMin + "-side").addClass(n.clsHint).addClass(n.clsHintMin),
                d = h("<div>").addClass("hint hint-max").addClass(n.hintPositionMax + "-side").addClass(n.clsHint).addClass(n.clsHintMax);
            if (0 < n.size && s.outerWidth(n.size), s.insertBefore(t), t.appendTo(s), i.insertBefore(s), s.appendTo(i), a.appendTo(s), o.appendTo(s), r.appendTo(s), l.appendTo(s), c.appendTo(r), d.appendTo(l), !0 === n.hintAlways && h([c, d]).css({
                    display: "block"
                }).addClass("permanent-hint"), !0 === n.showMinMax && (d = h("<div>").addClass("slider-min-max").addClass(n.clsMinMax), h("<span>").addClass("slider-text-min").addClass(n.clsMin).html(n.min).appendTo(d), h("<span>").addClass("slider-text-max").addClass(n.clsMax).html(n.max).appendTo(d), n.minMaxPosition === u.position.TOP ? d.insertBefore(s) : d.insertAfter(s)), !(t[0].className = "") === n.copyInlineStyles)
                for (e = 0; e < t[0].style.length; e++) s.css(t[0].style[e], t.css(t[0].style[e]));
            t.is(":disabled") ? this.disable() : this.enable(), this.slider = s
        },
        _createEvents: function () {
            var t = this,
                e = this.slider,
                n = this.options,
                e = e.find(".marker");
            e.on(u.events.startAll, function () {
                var e = h(this).find(".hint");
                !0 === n.hint && !0 !== n.hintAlways && e.fadeIn(300), h(document).on(u.events.moveAll, function (e) {
                    t._move(e), t._fireEvent("move", {
                        min: t.valueMin,
                        max: t.valueMax
                    })
                }, {
                    ns: t.id
                }), h(document).on(u.events.stopAll, function () {
                    h(document).off(u.events.moveAll, {
                        ns: t.id
                    }), h(document).off(u.events.stopAll, {
                        ns: t.id
                    }), !0 !== n.hintAlways && e.fadeOut(300), t._fireEvent("stop", {
                        min: t.valueMin,
                        max: t.valueMax
                    })
                }, {
                    ns: t.id
                }), t._fireEvent("start", {
                    min: t.valueMin,
                    max: t.valueMax
                })
            }), e.on(u.events.focus, function () {
                t._fireEvent("focus", {
                    min: t.valueMin,
                    max: t.valueMax
                })
            }), e.on(u.events.blur, function () {
                t._fireEvent("blur", {
                    min: t.valueMin,
                    max: t.valueMax
                })
            }), h(window).on(u.events.resize, function () {
                t.val(t.valueMin, t.valueMax)
            }, {
                ns: t.id
            })
        },
        _convert: function (e, t) {
            var n = this.slider,
                i = this.options,
                s = n.outerWidth() - n.find(".marker").outerWidth();
            switch (t) {
                case "pix2prc":
                    return 100 * e / s;
                case "pix2val":
                    return this._convert(e, "pix2prc") * ((i.max - i.min) / 100) + i.min;
                case "val2prc":
                    return (e - i.min) / ((i.max - i.min) / 100);
                case "prc2pix":
                    return e / (100 / s);
                case "val2pix":
                    return this._convert(this._convert(e, "val2prc"), "prc2pix")
            }
            return 0
        },
        _correct: function (e) {
            var t, n = e,
                i = this.options.accuracy,
                s = this.options.min,
                a = this.options.max;
            return 0 === i || isNaN(i) ? n : ((n = Math.round(e / i) * i) < s && (n = s), a < n && (n = a), n.toFixed((t = i) % 1 == 0 ? 0 : t.toString().split(".")[1].length))
        },
        _move: function (e) {
            var t, n = h(e.target).closest(".marker").hasClass("marker-min"),
                i = this.slider,
                s = i.offset(),
                a = i.find(".marker").outerWidth(),
                o = i.find(".marker-min"),
                r = i.find(".marker-max"),
                i = i.outerWidth(),
                s = l.pageXY(e).x - s.left - a / 2,
                a = n ? (t = 0, parseInt(r.css("left")) - a) : (t = parseInt(o.css("left")) + a, i - a);
            s < t || a < s || (this[n ? "valueMin" : "valueMax"] = this._correct(this._convert(s, "pix2val")), this._redraw())
        },
        _hint: function () {
            var i = this,
                s = this.options;
            this.slider.find(".hint").each(function () {
                var e = h(this),
                    t = e.hasClass("hint-min"),
                    n = t ? s.hintMaskMin : s.hintMaskMax,
                    t = +(t ? i.valueMin : i.valueMax) || 0;
                e.text(n.replace("$1", t.toFixed(l.decCount(s.accuracy))))
            })
        },
        _value: function () {
            var t, e = this.element,
                n = this.options,
                i = +this.valueMin || 0,
                s = +this.valueMax || 0;
            n.roundValue && (i = i.toFixed(l.decCount(n.accuracy)), s = s.toFixed(l.decCount(n.accuracy))), t = [i, s].join(", "), "INPUT" === e[0].tagName && e.val(t), null === n.target || 0 !== (n = h(n.target)).length && h.each(n, function () {
                var e = h(this);
                "INPUT" === this.tagName ? e.val(t) : e.text(t), e.trigger("change")
            }), this._fireEvent("change-value", {
                val: t
            }), this._fireEvent("change", {
                val: t
            })
        },
        _marker: function () {
            var e = this.slider,
                t = e.find(".marker-min"),
                n = e.find(".marker-max"),
                i = e.find(".complete"),
                s = parseInt(l.getStyleOne(t, "width")),
                e = l.isVisible(e);
            e && h([t, n]).css({
                "margin-top": 0,
                "margin-left": 0
            }), e ? (t.css("left", this._convert(this.valueMin, "val2pix")), n.css("left", this._convert(this.valueMax, "val2pix"))) : (t.css({
                left: this._convert(this.valueMin, "val2prc") + "%",
                "margin-top": 0 === this._convert(this.valueMin, "val2prc") ? 0 : -1 * s / 2
            }), n.css({
                left: this._convert(this.valueMax, "val2prc") + "%",
                "margin-top": 0 === this._convert(this.valueMax, "val2prc") ? 0 : -1 * s / 2
            })), i.css({
                left: this._convert(this.valueMin, "val2pix"),
                width: this._convert(this.valueMax, "val2pix") - this._convert(this.valueMin, "val2pix")
            })
        },
        _redraw: function () {
            this._marker(), this._value(), this._hint()
        },
        val: function (e, t) {
            var n = this.options;
            if (!l.isValue(e) && !l.isValue(t)) return [this.valueMin, this.valueMax];
            e < n.min && (e = n.min), t < n.min && (t = n.min), e > n.max && (e = n.max), t > n.max && (t = n.max), this.valueMin = this._correct(e), this.valueMax = this._correct(t), this._redraw()
        },
        changeValue: function () {
            var e = this.element,
                t = +e.attr("data-value-min"),
                e = +e.attr("data-value-max");
            this.val(t, e)
        },
        disable: function () {
            var e = this.element;
            e.data("disabled", !0), e.parent().addClass("disabled")
        },
        enable: function () {
            var e = this.element;
            e.data("disabled", !1), e.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-value-min":
                case "data-value-max":
                    this.changeValue();
                    break;
                case "disabled":
                    this.toggleState()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.slider,
                n = t.find(".marker");
            return n.off(u.events.startAll), n.off(u.events.focus), n.off(u.events.blur), n.off(u.events.keydown), n.off(u.events.keyup), t.off(u.events.click), h(window).off(u.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (u, h) {
    "use strict";
    var p = u.utils,
        n = {
            dragitemsDeferred: 0,
            target: null,
            dragItem: "li",
            dragMarker: ".drag-item-marker",
            drawDragMarker: !1,
            clsDragItemAvatar: "",
            clsDragItem: "",
            canDrag: !0,
            onDragStartItem: u.noop,
            onDragMoveItem: u.noop,
            onDragDropItem: u.noop,
            onTarget: u.noop,
            onTargetIn: u.noop,
            onTargetOut: u.noop,
            onDragItemsCreate: u.noop
        };
    u.dragItemsSetup = function (e) {
        n = h.extend({}, n, e)
    }, window.metroDragItemsSetup, u.dragItemsSetup(window.metroDragItemsSetup), u.Component("drag-items", {
        init: function (e, t) {
            return this._super(t, e, n, {
                id: p.elementId("dragItems"),
                canDrag: !1
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("drag-items-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.addClass("drag-items-target"), !0 === t.drawDragMarker && e.find(t.dragItem).each(function () {
                h("<span>").addClass("drag-item-marker").appendTo(this)
            }), t.canDrag ? this.on() : this.off()
        },
        _createEvents: function () {
            var i, s, a, r = this,
                e = this.element,
                l = this.options,
                o = h.document(),
                c = h.body(),
                d = {
                    top: 0,
                    left: 0
                };
            e.on(u.events.startAll, l.drawDragMarker ? l.dragMarker : l.dragItem, function (e) {
                var t, n = h(e.target).closest(l.dragItem);
                p.isRightMouse(e) || !0 === r.canDrag && (n.addClass("dragged-item").addClass(l.clsDragItem), t = h("<div>").addClass("dragged-item-avatar").addClass(l.clsDragItemAvatar), i = n.offset(), s = n.width(), a = n.height(), d.top = p.pageXY(e).y - i.top, d.left = p.pageXY(e).x - i.left, t.css({
                    top: i.top,
                    left: i.left,
                    width: s,
                    height: a
                }).appendTo(c), r._fireEvent("drag-start-item", {
                    dragItem: n[0],
                    avatar: t[0]
                }), o.on(u.events.moveAll, function (e) {
                    ! function (e, t, n) {
                        var i = p.pageXY(e).x,
                            s = p.pageXY(e).y,
                            a = s - d.top,
                            o = i - d.left;
                        t.css({
                            top: a,
                            left: o
                        });
                        e = document.elementsFromPoint(i, s).filter(function (e) {
                            return h(e).hasClass("drag-items-target")
                        });
                        0 !== e.length && (r._fireEvent("target", {
                            target: e
                        }), t = document.elementsFromPoint(i, s).filter(function (e) {
                            var t = h(e);
                            return h.matches(e, l.dragItem) && !t.hasClass("dragged-item-avatar")
                        })[0], p.isValue(t) ? (s = s - (o = (a = h(t)).offset()).top, t = i - o.left, i = a.width(), o = a.height(), s = t < i / 3 && (s < o / 2 || o / 2 < s) ? "left" : 2 * i / 3 < t && (s < o / 2 || o / 2 < s) ? "right" : i / 3 < t && t < 2 * i / 3 && o / 2 < s ? "bottom" : "top", a.hasClass("dragged-item") || ("top" === s || "left" === s ? n.insertBefore(a) : n.insertAfter(a))) : n.appendTo(e))
                    }(e, t, n), r._fireEvent("drag-move-item", {
                        dragItem: n[0],
                        avatar: t[0]
                    }), e.preventDefault()
                }, {
                    ns: r.id,
                    passive: !1
                }), o.on(u.events.stopAll, function () {
                    r._fireEvent("drag-drop-item", {
                        dragItem: n[0],
                        avatar: t[0]
                    }), n.removeClass("dragged-item").removeClass(l.clsDragItem), t.remove(), o.off(u.events.moveAll, {
                        ns: r.id
                    }), o.off(u.events.stopAll, {
                        ns: r.id
                    })
                }, {
                    ns: r.id
                }), l.drawDragMarker && (e.preventDefault(), e.stopPropagation()))
            })
        },
        on: function () {
            this.canDrag = !0, this.element.find(".drag-item-marker").show()
        },
        off: function () {
            this.canDrag = !1, this.element.find(".drag-item-marker").hide()
        },
        toggle: function () {
            this.canDrag = this.canDrag ? this.off() : this.on()
        },
        changeAttribute: function (e) {
            var t = this,
                n = this.element,
                i = this.options;
            "data-can-drag" === e && (i.canDtag = JSON.parse(n.attr("data-can-drag")), i.canDtag ? t.on() : t.off())
        },
        destroy: function () {
            var e = this.element,
                t = this.options;
            return e.off(u.events.startAll, t.drawDragMarker ? t.dragMarker : t.dragItem), e
        }
    })
}(Metro, m4q),
function (c, d) {
    "use strict";
    var u = c.utils,
        n = {
            dragContext: null,
            draggableDeferred: 0,
            dragElement: "self",
            dragArea: "parent",
            timeout: 0,
            boundaryRestriction: !0,
            onCanDrag: c.noop_true,
            onDragStart: c.noop,
            onDragStop: c.noop,
            onDragMove: c.noop,
            onDraggableCreate: c.noop
        };
    c.draggableSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroDraggableSetup, c.draggableSetup(window.metroDraggableSetup), c.Component("draggable", {
        init: function (e, t) {
            return this._super(t, e, n, {
                drag: !1,
                move: !1,
                backup: {
                    cursor: "default",
                    zIndex: "0"
                },
                dragArea: null,
                dragElement: null,
                id: u.elementId("draggable")
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("draggable-create", {
                element: this.element
            })
        },
        _createStructure: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.offset(),
                s = "self" !== n.dragElement ? t.find(n.dragElement) : t;
            t.data("canDrag", !0), (this.dragElement = s)[0].ondragstart = function () {
                return !1
            }, t.css("position", "absolute"), "document" !== n.dragArea && "window" !== n.dragArea || (n.dragArea = "body"), setImmediate(function () {
                e.dragArea = "parent" === n.dragArea ? t.parent() : d(n.dragArea), "parent" !== n.dragArea && (t.appendTo(e.dragArea), t.css({
                    top: i.top,
                    left: i.left
                }))
            }), t.attr("id") || t.attr("id", u.elementId("draggable"))
        },
        _createEvents: function () {
            var a = this,
                o = this.element,
                r = this.options,
                l = {
                    x: 0,
                    y: 0
                };
            this.dragElement.on(c.events.startAll, function (e) {
                function t(e) {
                    var t = u.pageXY(e).y - s,
                        e = u.pageXY(e).x - i;
                    r.boundaryRestriction && (t < 0 && (t = 0), e < 0 && (e = 0), t > a.dragArea.outerHeight() - o.outerHeight() && (t = a.dragArea.outerHeight() - o.outerHeight()), e > a.dragArea.outerWidth() - o.outerWidth() && (e = a.dragArea.outerWidth() - o.outerWidth())), l.y = t, l.x = e, o.css({
                        left: e,
                        top: t
                    })
                }
                var n = "parent" !== r.dragArea ? o.offset() : o.position(),
                    i = u.pageXY(e).x - n.left,
                    s = u.pageXY(e).y - n.top;
                !1 !== o.data("canDrag") && !0 === u.exec(r.onCanDrag, [o]) && (!1 === c.isTouchable && 1 !== e.which || (a.drag = !0, a.backup.cursor = o.css("cursor"), a.backup.zIndex = o.css("z-index"), o.addClass("draggable"), t(e), a._fireEvent("drag-start", {
                    position: l,
                    context: r.dragContext
                }), d(document).on(c.events.moveAll, function (e) {
                    e.preventDefault(), t(e), a._fireEvent("drag-move", {
                        position: l,
                        context: r.dragContext
                    })
                }, {
                    ns: a.id,
                    passive: !1
                }), d(document).on(c.events.stopAll, function () {
                    o.removeClass("draggable"), a.drag && (d(document).off(c.events.moveAll, {
                        ns: a.id
                    }), d(document).off(c.events.stopAll, {
                        ns: a.id
                    })), a.drag = !1, a.move = !1, a._fireEvent("drag-stop", {
                        position: l,
                        context: r.dragContext
                    })
                }, {
                    ns: a.id
                })))
            })
        },
        off: function () {
            this.element.data("canDrag", !1)
        },
        on: function () {
            this.element.data("canDrag", !0)
        },
        changeAttribute: function (e, t) {},
        destroy: function () {
            var e = this.element;
            return this.dragElement.off(c.events.startAll), e
        }
    })
}(Metro, m4q),
function (o, r) {
    "use strict";
    var l = o.utils,
        n = {
            dropdownDeferred: 0,
            dropFilter: null,
            toggleElement: null,
            noClose: !1,
            duration: 50,
            checkDropUp: !1,
            dropUp: !1,
            onDrop: o.noop,
            onUp: o.noop,
            onDropdownCreate: o.noop
        };
    o.dropdownSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroDropdownSetup, o.dropdownSetup(window.metroDropdownSetup), o.Component("dropdown", {
        init: function (e, t) {
            return this._super(t, e, n, {
                _toggle: null,
                displayOrigin: null,
                isOpen: !1
            }), this
        },
        _create: function () {
            var e = this,
                t = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("dropdown-create", {
                element: t
            }), t.hasClass("open") && (t.removeClass("open"), setTimeout(function () {
                e.open(!0)
            }, 0))
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            t.dropUp && e.addClass("drop-up"), t = null !== t.toggleElement ? r(t.toggleElement) : 0 < e.siblings(".dropdown-toggle").length ? e.siblings(".dropdown-toggle") : e.prev(), this.displayOrigin = l.getStyleOne(e, "display"), e.hasClass("v-menu") && e.addClass("for-dropdown"), e.css("display", "none"), this._toggle = t
        },
        _createEvents: function () {
            var n = this,
                i = this.element,
                s = this.options,
                e = this._toggle,
                a = i.parent();
            e.on(o.events.click, function (e) {
                var t;
                a.siblings(a[0].tagName).removeClass("active-container"), r(".active-container").removeClass("active-container"), "none" === i.css("display") || i.hasClass("keep-open") ? (r("[data-role*=dropdown]").each(function (e, t) {
                    i.parents("[data-role*=dropdown]").is(t) || r(t).hasClass("keep-open") || "none" === r(t).css("display") || (!l.isValue(s.dropFilter) || 0 < r(t).closest(s.dropFilter).length) && n._close(t)
                }), i.hasClass("horizontal") && (i.css({
                    visibility: "hidden",
                    display: "block"
                }), t = 0, r.each(i.children("li"), function () {
                    t += r(this).outerWidth(!0)
                }), i.css({
                    visibility: "visible",
                    display: "none"
                }), i.css("width", t)), n._open(i), a.addClass("active-container")) : n._close(i), e.preventDefault(), e.stopPropagation()
            }), !0 === s.noClose && i.addClass("keep-open").on(o.events.click, function (e) {
                e.stopPropagation()
            }), r(i).find("li.disabled a").on(o.events.click, function (e) {
                e.preventDefault()
            })
        },
        _close: function (e, t) {
            e = r(e);
            var n = o.getPlugin(e, "dropdown"),
                i = n._toggle,
                s = n.options,
                a = "slideUp";
            i.removeClass("active-toggle").removeClass("active-control"), n.element.parent().removeClass("active-container"), t && (a = "hide"), e[a](t ? 0 : s.duration, function () {
                n._fireEvent("close"), n._fireEvent("up"), !s.dropUp && s.checkDropUp && n.element.removeClass("drop-up")
            }), this.isOpen = !1
        },
        _open: function (e, t) {
            e = r(e);
            var n = o.getPlugin(e, "dropdown"),
                i = n._toggle,
                s = n.options;
            i.addClass("active-toggle").addClass("active-control"), e.slideDown(t ? 0 : s.duration, function () {
                !s.dropUp && s.checkDropUp && (l.inViewport(n.element[0]) || (n.element.addClass("drop-up"), l.inViewport(n.element[0]) || n.element.removeClass("drop-up"))), n._fireEvent("open"), n._fireEvent("drop")
            }), this.isOpen = !0
        },
        close: function (e) {
            this._close(this.element, e)
        },
        open: function (e) {
            this._open(this.element, e)
        },
        toggle: function () {
            this.isOpen ? this.close() : this.open()
        },
        changeAttribute: function () {},
        destroy: function () {
            this._toggle.off(o.events.click)
        }
    }), r(document).on(o.events.click, function () {
        r("[data-role*=dropdown]").each(function () {
            var e = r(this);
            "none" === e.css("display") || e.hasClass("keep-open") || e.hasClass("stay-open") || e.hasClass("ignore-document-click") || o.getPlugin(e, "dropdown").close()
        })
    })
}(Metro, m4q),
function (e, u) {
    "use strict";
    var h = e.utils,
        t = {
            init: function () {
                return this
            },
            options: {
                csvDelimiter: "\t",
                csvNewLine: "\r\n",
                includeHeader: !0
            },
            setup: function (e) {
                return this.options = u.extend({}, this.options, e), this
            },
            base64: function (e) {
                return window.btoa(unescape(encodeURIComponent(e)))
            },
            b64toBlob: function (e, t, n) {
                t = t || "", n = n || 512;
                for (var i = window.atob(e), s = [], a = 0; a < i.length; a += n) {
                    for (var o = i.slice(a, a + n), r = new Array(o.length), l = 0; l < o.length; l += 1) r[l] = o.charCodeAt(l);
                    var c = new window.Uint8Array(r);
                    s.push(c)
                }
                return new Blob(s, {
                    type: t
                })
            },
            tableToCSV: function (e, t, n) {
                var i, s, a, o, r, l, c = "",
                    d = u.extend({}, this.options, n);
                if (e = u(e)[0], h.bool(d.includeHeader))
                    for (s = e.querySelectorAll("thead")[0], a = 0; a < s.rows.length; a++) {
                        for (r = s.rows[a], o = 0; o < r.cells.length; o++) l = r.cells[o], c += (o ? d.csvDelimiter : "") + l.textContent.trim();
                        c += d.csvNewLine
                    }
                for (i = e.querySelectorAll("tbody")[0], a = 0; a < i.rows.length; a++) {
                    for (r = i.rows[a], o = 0; o < r.cells.length; o++) l = r.cells[o], c += (o ? d.csvDelimiter : "") + l.textContent.trim();
                    c += d.csvNewLine
                }
                return h.isValue(t) ? this.createDownload(this.base64("\ufeff" + c), "application/csv", t) : c
            },
            createDownload: function (e, t, n) {
                var i = document.createElement("a");
                return i.style.display = "none", document.body.appendChild(i), t = this.b64toBlob(e, t), t = window.URL.createObjectURL(t), i.href = t, i.download = n || h.elementId("download"), i.click(), window.URL.revokeObjectURL(t), document.body.removeChild(i), !0
            },
            arrayToCsv: function (e, t, n) {
                for (var i, s = "", a = u.extend({}, this.options, n), o = 0; o < e.length; o++) "object" != typeof (i = e[o]) ? s += i + a.csvNewLine : (u.each(i, function (e, t) {
                    s += (e ? a.csvDelimiter : "") + t.toString()
                }), s += a.csvNewLine);
                return h.isValue(t) ? this.createDownload(this.base64("\ufeff" + s), "application/csv", t) : s
            }
        };
    e.export = t.init(), !0 === window.METRO_GLOBAL_COMMON && (window.Export = e.export)
}(Metro, m4q),
function (r, c) {
    "use strict";
    var n = {
        fileDeferred: 0,
        label: "",
        mode: "input",
        buttonTitle: "Choose file(s)",
        filesTitle: "file(s) selected",
        dropTitle: "<strong>Choose a file(s)</strong> or drop it here",
        dropIcon: "<span class='default-icon-upload'></span>",
        prepend: "",
        clsComponent: "",
        clsPrepend: "",
        clsButton: "",
        clsCaption: "",
        clsLabel: "",
        copyInlineStyles: !1,
        onSelect: r.noop,
        onFileCreate: r.noop
    };
    r.fileSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroFileSetup, r.fileSetup(window.metroFileSetup), r.Component("file", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("file-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t, n = this.element,
                i = this.options,
                s = c("<label>").addClass(("input" === i.mode ? " file " : "button" === i.mode ? " file-button " : " drop-zone ") + n[0].className).addClass(i.clsComponent),
                a = c("<span>").addClass("caption").addClass(i.clsCaption),
                o = c("<span>").addClass("files").addClass(i.clsCaption);
            if (s.insertBefore(n), n.appendTo(s), "drop" === i.mode || "dropzone" === i.mode ? (e = c(i.dropIcon).addClass("icon").appendTo(s), a.html(i.dropTitle).insertAfter(e), o.html("0 " + i.filesTitle).insertAfter(a)) : "button" === i.mode ? ((t = c("<span>").addClass("button").attr("tabindex", -1).html(i.buttonTitle)).appendTo(s), t.addClass(i.clsButton)) : (a.insertBefore(n), (t = c("<span>").addClass("button").attr("tabindex", -1).html(i.buttonTitle)).appendTo(s), t.addClass(i.clsButton), "rtl" === n.attr("dir") && s.addClass("rtl"), "" !== i.prepend && c("<div>").html(i.prepend).addClass("prepend").addClass(i.clsPrepend).appendTo(s)), !(n[0].className = "") === i.copyInlineStyles)
                for (var r = 0, l = n[0].style.length; r < l; r++) s.css(n[0].style[r], n.css(n[0].style[r]));
            i.label && (i = c("<label>").addClass("label-for-input").addClass(i.clsLabel).html(i.label).insertBefore(s), n.attr("id") && i.attr("for", n.attr("id")), "rtl" === n.attr("dir") && i.addClass("rtl")), n.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var n = this,
                i = this.element,
                s = this.options,
                t = i.closest("label"),
                a = t.find(".caption"),
                o = t.find(".files"),
                e = i.closest("form");
            e.length && e.on("reset", function () {
                n.clear()
            }), t.on(r.events.click, "button", function () {
                i[0].click()
            }), i.on(r.events.change, function () {
                var e, t = [];
                Array.from(this.files).forEach(function (e) {
                    t.push(e.name)
                }), "input" === s.mode ? (e = t.join(", "), a.html(e), a.attr("title", e)) : o.html(i[0].files.length + " " + s.filesTitle), n._fireEvent("select", {
                    files: this.files
                })
            }), i.on(r.events.focus, function () {
                t.addClass("focused")
            }), i.on(r.events.blur, function () {
                t.removeClass("focused")
            }), "input" !== s.mode && (t.on("drag dragstart dragend dragover dragenter dragleave drop", function (e) {
                e.preventDefault()
            }), t.on("dragenter dragover", function () {
                t.addClass("drop-on")
            }), t.on("dragleave", function () {
                t.removeClass("drop-on")
            }), t.on("drop", function (e) {
                i[0].files = e.dataTransfer.files, o.html(i[0].files.length + " " + s.filesTitle), t.removeClass("drop-on"), i.trigger("change")
            }))
        },
        clear: function () {
            var e = this.element,
                t = this.options;
            "input" === t.mode ? e.siblings(".caption").html("") : (e.siblings(".caption").html(t.dropTitle), e.siblings(".files").html("0 " + t.filesTitle)), e.val("")
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        toggleDir: function () {
            "rtl" === this.element.attr("dir") ? this.element.parent().addClass("rtl") : this.element.parent().removeClass("rtl")
        },
        changeAttribute: function (e) {
            switch (e) {
                case "disabled":
                    this.toggleState();
                    break;
                case "dir":
                    this.toggleDir()
            }
        },
        destroy: function () {
            var e = this.element,
                t = e.parent();
            return e.off(r.events.change), t.off(r.events.click, "button"), e
        }
    })
}(Metro, m4q),
function (e, t) {
    "use strict";
    var n = e.utils,
        i = {
            gradientType: "linear",
            gradientShape: "",
            gradientPosition: "",
            gradientSize: "",
            gradientColors: "#000, #fff",
            gradientRepeat: !1,
            onGradientBoxCreate: e.noop
        };
    e.gradientBoxSetup = function (e) {
        i = t.extend({}, i, e)
    }, window.metroGradientBoxSetup, e.gradientBoxSetup(window.metroGradientBoxSetup), e.Component("gradient-box", {
        init: function (e, t) {
            return this._super(t, e, i, {
                colors: [],
                shape: "",
                size: "",
                position: "",
                type: "linear",
                func: "linear-gradient",
                repeat: !1
            }), this
        },
        _create: function () {
            var e = this.options;
            this.colors = e.gradientColors.toArray(","), this.type = e.gradientType.toLowerCase(), this.shape = e.gradientShape.toLowerCase(), this.size = e.gradientSize.toLowerCase(), this.repeat = e.gradientRepeat, this.func = (this.repeat ? "repeating-" : "") + this.type + "-gradient", "linear" === this.type ? e.gradientPosition ? (this.position = !1 === isNaN(e.gradientPosition) ? e.gradientPosition + "deg" : e.gradientPosition, -1 === this.position.indexOf("deg") && -1 === this.position.indexOf("to ") && (this.position = "to " + this.position)) : this.position = "to bottom" : (this.position = e.gradientPosition.toLowerCase(), this.position && -1 === this.position.indexOf("at ") && (this.position = "at " + this.position)), this._createStructure(), this._setGradient(), this._fireEvent("gradient-box-create")
        },
        _createStructure: function () {
            this.element.addClass("gradient-box")
        },
        _setGradient: function () {
            var e = this.element,
                t = [];
            "radial" === this.type && this.shape && t.push(this.shape), "radial" === this.type && this.size && t.push(this.size), this.position && t.push((-1 === this.position.indexOf("at") ? "at " : "") + this.position), t = this.func + "(" + (t.length ? t.join(" ") + ", " : "") + this.colors.join(", ") + ")", e.css({
                background: t
            })
        },
        changeAttribute: function (e, t) {
            if (-1 !== e.indexOf("data-gradient-")) {
                switch (e) {
                    case "data-gradient-type":
                        this.type = t, this.func = t.toLowerCase() + "-gradient";
                        break;
                    case "data-gradient-colors":
                        this.colors = t ? t.toArray(",") : ["#fff", "#000"];
                        break;
                    case "data-gradient-shape":
                        this.shape = t.toLowerCase();
                        break;
                    case "data-gradient-size":
                        this.size = t.toLowerCase();
                        break;
                    case "data-gradient-position":
                        this.position = t.toLowerCase();
                        break;
                    case "data-gradient-repeat":
                        this.repeat = n.bool(t)
                }
                this._setGradient()
            }
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (i, a) {
    "use strict";
    var n = {
        gravatarDeferred: 0,
        email: "",
        size: 80,
        default: "mp",
        onGravatarCreate: i.noop
    };
    i.gravatarSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroGravatarSetup, i.gravatarSetup(window.metroGravatarSetup), i.Component("gravatar", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element;
            this.get(), this._fireEvent("gravatar-create", {
                element: e
            })
        },
        getImage: function (e, t, n, i) {
            var s = a("<img>").attr("alt", e);
            return s.attr("src", this.getImageSrc(e, t)), !0 === i ? s : s[0]
        },
        getImageSrc: function (e, t, n) {
            return void 0 === e || "" === e.trim() ? "" : (t = t || 80, n = i.utils.encodeURI(n) || "404", "//www.gravatar.com/avatar/" + i.md5(e.toLowerCase().trim()) + "?size=" + t + "&d=" + n)
        },
        get: function () {
            var e = this.element,
                t = this.options,
                e = "IMG" === e[0].tagName ? e : e.find("img");
            if (0 !== e.length) return e.attr("src", this.getImageSrc(t.email, t.size, t.default)), this
        },
        resize: function (e) {
            this.options.size = void 0 !== e ? e : this.element.attr("data-size"), this.get()
        },
        email: function (e) {
            this.options.email = void 0 !== e ? e : this.element.attr("data-email"), this.get()
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-size":
                    this.resize();
                    break;
                case "data-email":
                    this.email()
            }
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (s, a) {
    "use strict";
    var i = s.utils,
        n = {
            hintDeferred: 0,
            hintHide: 5e3,
            clsHint: "",
            hintText: "",
            hintPosition: s.position.TOP,
            hintOffset: 4,
            onHintShow: s.noop,
            onHintHide: s.noop,
            onHintCreate: s.noop
        };
    s.hintSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroHintSetup, s.hintSetup(window.metroHintSetup), s.Component("hint", {
        init: function (e, t) {
            return this._super(t, e, n, {
                hint: null,
                hint_size: {
                    width: 0,
                    height: 0
                },
                id: i.elementId("hint")
            }), this
        },
        _create: function () {
            this._createEvents(), this._fireEvent("hint-create", {
                element: this.element
            })
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = !1;
            t.on(s.events.enter, function () {
                i = !0, setTimeout(function () {
                    i && (e.createHint(), 0 < +n.hintHide && setTimeout(function () {
                        e.removeHint()
                    }, n.hintHide))
                }, n.hintDeferred)
            }), t.on(s.events.leave, function () {
                i = !1, e.removeHint()
            }), a(window).on(s.events.scroll + " " + s.events.resize, function () {
                null !== e.hint && e.setPosition()
            }, {
                ns: this.id
            })
        },
        createHint: function () {
            var e = this.elem,
                t = this.element,
                n = this.options,
                n = a("<div>").addClass("hint").addClass(n.clsHint).html(n.hintText);
            this.hint = n, this.hint_size = i.hiddenElementSize(n), a(".hint:not(.permanent-hint)").remove(), "TD" !== e.tagName && "TH" !== e.tagName || (e = a("<div/>").css("display", "inline-block").html(t.html()), t.html(e), this.element = e), this.setPosition(), n.appendTo(a("body")), this._fireEvent("hint-show", {
                hint: n[0]
            })
        },
        setPosition: function () {
            var e = this.hint,
                t = this.hint_size,
                n = this.options,
                i = this.element;
            n.hintPosition === s.position.BOTTOM ? (e.addClass("bottom"), e.css({
                top: i.offset().top - a(window).scrollTop() + i.outerHeight() + n.hintOffset,
                left: i.offset().left + i.outerWidth() / 2 - t.width / 2 - a(window).scrollLeft()
            })) : n.hintPosition === s.position.RIGHT ? (e.addClass("right"), e.css({
                top: i.offset().top + i.outerHeight() / 2 - t.height / 2 - a(window).scrollTop(),
                left: i.offset().left + i.outerWidth() - a(window).scrollLeft() + n.hintOffset
            })) : n.hintPosition === s.position.LEFT ? (e.addClass("left"), e.css({
                top: i.offset().top + i.outerHeight() / 2 - t.height / 2 - a(window).scrollTop(),
                left: i.offset().left - t.width - a(window).scrollLeft() - n.hintOffset
            })) : (e.addClass("top"), e.css({
                top: i.offset().top - a(window).scrollTop() - t.height - n.hintOffset,
                left: i.offset().left - a(window).scrollLeft() + i.outerWidth() / 2 - t.width / 2
            }))
        },
        removeHint: function () {
            var e = this,
                t = this.hint,
                n = this.options.onHintHide === s.noop ? 0 : 300;
            null !== t && (this._fireEvent("hint-hide", {
                hint: t[0]
            }), setTimeout(function () {
                t.hide(0, function () {
                    t.remove(), e.hint = null
                })
            }, n))
        },
        changeText: function () {
            this.options.hintText = this.element.attr("data-hint-text")
        },
        changeAttribute: function (e) {
            "data-hint-text" === e && this.changeText()
        },
        destroy: function () {
            var e = this.element;
            this.removeHint(), e.off(s.events.enter + "-hint"), e.off(s.events.leave + "-hint"), a(window).off(s.events.scroll + "-hint")
        }
    })
}(Metro, m4q),
function (i, o) {
    "use strict";
    var r = i.utils,
        l = {
            specialKeys: {
                8: "backspace",
                9: "tab",
                13: "return",
                16: "shift",
                17: "ctrl",
                18: "alt",
                19: "pause",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "del",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                144: "numlock",
                145: "scroll",
                188: ",",
                190: ".",
                191: "/",
                224: "meta"
            },
            shiftNums: {
                "~": "`",
                "!": "1",
                "@": "2",
                "#": "3",
                $: "4",
                "%": "5",
                "^": "6",
                "&": "7",
                "*": "8",
                "(": "9",
                ")": "0",
                _: "-",
                "+": "=",
                ":": ";",
                '"': "'",
                "<": ",",
                ">": ".",
                "?": "/",
                "|": "\\"
            },
            shiftNumsInverse: {
                "`": "~",
                1: "!",
                2: "@",
                3: "#",
                4: "$",
                5: "%",
                6: "^",
                7: "&",
                8: "*",
                9: "(",
                0: ")",
                "-": "_",
                "=": "+",
                ";": ": ",
                "'": '"',
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|"
            },
            textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"],
            getKey: function (e) {
                var t = e.keyCode,
                    n = String.fromCharCode(t).toLowerCase(),
                    t = e.shiftKey ? l.shiftNums[n] || n : void 0 === l.specialKeys[t] ? n : l.specialKeys[t];
                return l.getModifier(e).length ? l.getModifier(e).join("+") + "+" + t : t
            },
            getModifier: function (e) {
                var t = [];
                return e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.shiftKey && t.push("shift"), t
            }
        };

    function e(s, a) {
        return this.each(function () {
            o(this).on(i.events.keyup + ".hotkey-method-" + s, function (e) {
                var t = l.getKey(e),
                    n = o(this),
                    i = "" + n.attr("href");
                s === t && (n.is("a") && i && "#" !== i.trim() && (window.location.href = i), r.exec(a, [e, t, s], this))
            })
        })
    }
    o.fn.hotkey = e, window.METRO_JQUERY && window.jquery_present && (jQuery.fn.hotkey = e), o(document).on(i.events.keyup + ".hotkey-data", function (e) {
        var t, n;
        METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS && /textarea|input|select/i.test(e.target.nodeName) || METRO_HOTKEYS_FILTER_CONTENT_EDITABLE && o(e.target).attr("contenteditable") || METRO_HOTKEYS_FILTER_TEXT_INPUTS && -1 < l.textAcceptingInputTypes.indexOf(e.target.type) || (n = l.getKey(e), r.keyInObject(i.hotkeys, n) && (t = o(i.hotkeys[n][0]), e = i.hotkeys[n][1], n = ("" + t.attr("href")).trim(), e ? r.exec(e) : t.is("a") && n && 0 < n.length && "#" !== n.trim() ? window.location.href = n : t.click()))
    })
}(Metro, m4q),
function (t, a) {
    "use strict";
    var r = t.utils,
        n = {
            htmlcontainerDeferred: 0,
            method: "get",
            htmlSource: null,
            requestData: null,
            requestOptions: null,
            insertMode: "default",
            onHtmlLoad: t.noop,
            onHtmlLoadFail: t.noop,
            onHtmlLoadDone: t.noop,
            onHtmlContainerCreate: t.noop
        };
    t.htmlContainerSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroHtmlContainerSetup, t.htmlContainerSetup(window.metroHtmlContainerSetup), t.Component("html-container", {
        init: function (e, t) {
            return this._super(t, e, n, {
                data: null,
                opt: {},
                htmlSource: ""
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            "string" == typeof t.requestData && (t.requestData = JSON.parse(t.requestData)), r.isObject(t.requestData) && (this.data = r.isObject(t.requestData)), "string" == typeof t.requestOptions && (t.requestOptions = JSON.parse(t.requestOptions)), r.isObject(t.requestOptions) && (this.opt = r.isObject(t.requestOptions)), t.method = t.method.toUpperCase(), r.isValue(t.htmlSource) && (this.htmlSource = t.htmlSource, this._load()), this._fireEvent("html-container-create", {
                element: e
            })
        },
        _load: function () {
            var n = this,
                i = this.element,
                s = this.options,
                e = {
                    method: s.method
                };
            this.data && (e.body = this.data), this.opt && (e.headers = this.opt), fetch(this.htmlSource, e).then(t.fetch.status).then(t.fetch.text).then(function (e) {
                var t = a(e);
                switch (0 === t.length && (t = a("<div>").html(e)), s.insertMode.toLowerCase()) {
                    case "prepend":
                        i.prepend(t);
                        break;
                    case "append":
                        i.append(t);
                        break;
                    case "replace":
                        t.insertBefore(i).script(), i.remove();
                        break;
                    default:
                        i.html(t)
                }
                n._fireEvent("html-load", {
                    data: e,
                    source: s.htmlSource,
                    requestData: n.data,
                    requestOptions: n.opt
                })
            }).catch(function (e) {
                n._fireEvent("html-load-fail", {
                    error: e
                })
            })
        },
        load: function (e, t, n) {
            e && (this.htmlSource = e), t && (this.data = r.isObject(t)), n && (this.opt = r.isObject(n)), this._load()
        },
        changeAttribute: function (e) {
            var t, n, i, s = this,
                a = this.element,
                o = this.options;
            switch (e) {
                case "data-html-source":
                    i = a.attr("data-html-source"), r.isNull(i) || ("" === i.trim() && a.html(""), o.htmlSource = i, s._load());
                    break;
                case "data-insert-mode":
                    n = a.attr("data-insert-mode"), r.isValue(n) && (o.insertMode = n);
                    break;
                case "data-request-data":
                    t = a.attr("data-request-data"), s.load(o.htmlSource, t)
            }
        },
        destroy: function () {}
    })
}(Metro, m4q),
function (e, t) {
    "use strict";
    var n = {
        image: null,
        size: "cover",
        repeat: !1,
        color: "transparent",
        attachment: "scroll",
        origin: "border",
        onImageBoxCreate: e.noop
    };
    e.imageBoxSetup = function (e) {
        n = t.extend({}, n, e)
    }, window.metroImageBoxSetup, e.imageBoxSetup(window.metroImageBoxSetup), e.Component("image-box", {
        init: function (e, t) {
            return this._super(t, e, n, {}), this
        },
        _create: function () {
            this._createStructure(), this._fireEvent("image-box-create")
        },
        _createStructure: function () {
            this.element.addClass("image-box"), this._drawImage()
        },
        _drawImage: function () {
            var e, t = this.element,
                n = this.options,
                i = new Image;
            t.attr("data-original") || t.attr("data-original", n.image), t.css({
                backgroundImage: "url(" + n.image + ")",
                backgroundSize: n.size,
                backgroundRepeat: n.repeat ? "repeat" : "no-repeat",
                backgroundColor: n.color,
                backgroundAttachment: n.attachment,
                backgroundOrigin: n.origin
            }), i.src = n.image, i.onload = function () {
                e = this.height >= this.width, t.removeClass("image-box__portrait image-box__landscape").addClass("image-box__" + (e ? "portrait" : "landscape"))
            }
        },
        changeAttribute: function (e, t) {
            e = e.replace("data-", ""); - 1 < ["image", "size", "repeat", "color", "attachment", "origin"].indexOf(e) && (this.options[e] = t, this._drawImage())
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (t, r) {
    "use strict";
    var l = t.utils,
        n = {
            imagecompareDeferred: 0,
            width: "100%",
            height: "auto",
            onSliderMove: t.noop,
            onImageCompareCreate: t.noop
        };
    t.imageCompareSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroImageCompareSetup, t.imageCompareSetup(window.metroImageCompareSetup), t.Component("image-compare", {
        init: function (e, t) {
            return this._super(t, e, n, {
                id: l.elementId("image-compare")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("image-compare-create", {
                element: e
            })
        },
        _createStructure: function () {
            var n, i, e, s, a, t = this.element,
                o = this.options;
            switch (l.isValue(t.attr("id")) || t.attr("id", l.elementId("image-compare")), t.addClass("image-compare").css({
                width: o.width
            }), s = t.width(), o.height) {
                case "16/9":
                case "21/9":
                case "4/3":
                    a = l.aspectRatioH(s, o.height);
                    break;
                case "auto":
                    a = l.aspectRatioH(s, "16/9");
                    break;
                default:
                    a = o.height
            }
            t.css({
                height: a
            }), n = r("<div>").addClass("image-container").appendTo(t), i = r("<div>").addClass("image-container-overlay").appendTo(t).css({
                width: s / 2
            }), (e = r("<div>").addClass("image-slider").appendTo(t)).css({
                top: a / 2 - e.height() / 2,
                left: s / 2 - e.width() / 2
            }), t = t.find("img"), r.each(t, function (e) {
                var t = r("<div>").addClass("image-wrapper");
                t.css({
                    width: s,
                    height: a,
                    backgroundImage: "url(" + this.src + ")"
                }), t.appendTo(0 === e ? n : i)
            })
        },
        _createEvents: function () {
            var i = this,
                s = this.element,
                n = this.options,
                a = s.find(".image-container-overlay"),
                o = s.find(".image-slider");
            o.on(t.events.startAll, function () {
                var n = s.width();
                r(document).on(t.events.moveAll, function (e) {
                    var t = l.getCursorPositionX(s[0], e);
                    t < 0 && (t = 0), n < t && (t = n), a.css({
                        width: t
                    }), e = t - o.width() / 2, o.css({
                        left: e
                    }), i._fireEvent("slider-move", {
                        x: t,
                        l: e
                    })
                }, {
                    ns: i.id
                }), r(document).on(t.events.stopAll, function () {
                    r(document).off(t.events.moveAll, {
                        ns: i.id
                    }), r(document).off(t.events.stopAll, {
                        ns: i.id
                    })
                }, {
                    ns: i.id
                })
            }), r(window).on(t.events.resize, function () {
                var e, t = s.width();
                if ("100%" === n.width) {
                    switch (n.height) {
                        case "16/9":
                        case "21/9":
                        case "4/3":
                            e = l.aspectRatioH(t, n.height);
                            break;
                        case "auto":
                            e = l.aspectRatioH(t, "16/9");
                            break;
                        default:
                            e = n.height
                    }
                    s.css({
                        height: e
                    }), r.each(s.find(".image-wrapper"), function () {
                        r(this).css({
                            width: t,
                            height: e
                        })
                    }), s.find(".image-container-overlay").css({
                        width: t / 2
                    }), o.css({
                        top: e / 2 - o.height() / 2,
                        left: t / 2 - o.width() / 2
                    })
                }
            }, {
                ns: this.id
            })
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return e.off(t.events.start), r(window).off(t.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (t, r) {
    "use strict";
    var i = t.utils,
        n = {
            useBackground: !1,
            backgroundSize: "cover",
            backgroundPosition: "top left",
            clsImageGrid: "",
            clsImageGridItem: "",
            clsImageGridImage: "",
            onItemClick: t.noop,
            onDrawItem: t.noop,
            onImageGridCreate: t.noop
        };
    t.imageGridSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroImageGridSetup, t.imageGridSetup(window.metroImageGridSetup), t.Component("image-grid", {
        init: function (e, t) {
            return this._super(t, e, n, {
                items: []
            }), this
        },
        _create: function () {
            this.items = this.element.children("img"), this._createStructure(), this._createEvents(), this._fireEvent("image-grid-create")
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.addClass("image-grid").addClass(t.clsImageGrid), this._createItems()
        },
        _createEvents: function () {
            var e = this;
            this.element.on(t.events.click, ".image-grid__item", function () {
                e._fireEvent("item-click", {
                    item: this
                })
            })
        },
        _createItems: function () {
            var s = this,
                a = this.element,
                o = this.options,
                e = this.items;
            a.clear(), e.each(function () {
                var t = r(this),
                    n = this.src,
                    i = r("<div>").addClass("image-grid__item").addClass(o.clsImageGridItem).appendTo(a),
                    e = new Image;
                e.src = n, e.onload = function () {
                    var e = this.height >= this.width;
                    i.addClass(e ? "image-grid__item-portrait" : "image-grid__item-landscape"), t.addClass(o.clsImageGridImage).appendTo(i), o.useBackground && (i.css({
                        background: "url(" + n + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: o.backgroundSize,
                        backgroundPosition: o.backgroundPosition
                    }).attr("data-original", t.attr("data-original") || n).attr("data-title", t.attr("alt") || t.attr("data-title") || ""), t.visible(!1)), s._fireEvent("draw-item", {
                        item: i[0],
                        image: t[0]
                    })
                }
            })
        },
        changeAttribute: function (e, t) {
            var n = this.options;
            "data-use-background" === e && (n.useBackground = i.bool(t), this._createItems()), "data-background-size" === e && (n.backgroundSize = t, this._createItems()), "data-background-position" === e && (n.backgroundPosition = t, this._createItems())
        },
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (t, h) {
    "use strict";
    var p = t.utils,
        n = {
            imagemagnifierDeferred: 0,
            width: "100%",
            height: "auto",
            lensSize: 100,
            lensType: "square",
            magnifierZoom: 2,
            magnifierMode: "glass",
            magnifierZoomElement: null,
            clsMagnifier: "",
            clsLens: "",
            clsZoom: "",
            onMagnifierMove: t.noop,
            onImageMagnifierCreate: t.noop
        };
    t.imageMagnifierSetup = function (e) {
        n = h.extend({}, n, e)
    }, window.metroImageMagnifierSetup, t.imageMagnifierSetup(window.metroImageMagnifierSetup), t.Component("image-magnifier", {
        init: function (e, t) {
            return this._super(t, e, n, {
                zoomElement: null,
                id: p.elementId("image-magnifier")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("image-magnifier-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t, n = this.element,
                i = this.options,
                s = n.find("img");
            if (0 === s.length) throw new Error("Image not defined");
            switch (p.isValue(n.attr("id")) || n.attr("id", p.elementId("image-magnifier")), n.addClass("image-magnifier").css({
                width: i.width
            }).addClass(i.clsMagnifier), e = n.width(), i.height) {
                case "16/9":
                case "21/9":
                case "4/3":
                    t = p.aspectRatioH(e, i.height);
                    break;
                case "auto":
                    t = p.aspectRatioH(e, "16/9");
                    break;
                default:
                    t = i.height
            }
            n.css({
                height: t
            });
            var a, o, r, l = e / 2 - i.lensSize / 2,
                c = t / 2 - i.lensSize / 2;
            "glass" === i.magnifierMode ? (r = h("<div>").addClass("image-magnifier-glass").appendTo(n)).css({
                width: i.lensSize,
                height: i.lensSize,
                borderRadius: "circle" !== i.lensType ? 0 : "50%",
                top: c,
                left: l,
                backgroundImage: "url(" + s[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + (l * i.magnifierZoom - i.lensSize / 4 + 4) + "px -" + (c * i.magnifierZoom - i.lensSize / 4 + 4) + "px",
                backgroundSize: s[0].width * i.magnifierZoom + "px " + s[0].height * i.magnifierZoom + "px"
            }).addClass(i.clsLens) : ((r = h("<div>").addClass("image-magnifier-glass").appendTo(n)).css({
                width: i.lensSize,
                height: i.lensSize,
                borderRadius: 0,
                borderWidth: 1,
                top: c,
                left: l
            }).addClass(i.clsLens), p.isValue(i.magnifierZoomElement) && 0 !== h(i.magnifierZoomElement).length ? this.zoomElement = h(i.magnifierZoomElement) : this.zoomElement = h("<div>").insertAfter(n), a = r[0].offsetWidth * i.magnifierZoom, o = r[0].offsetHeight * i.magnifierZoom, n = a / i.lensSize, r = o / i.lensSize, this.zoomElement.css({
                width: a,
                height: o,
                backgroundImage: "url(" + s[0].src + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-" + l * n + "px -" + c * r + "px",
                backgroundSize: s[0].width * n + "px " + s[0].height * r + "px"
            }).addClass(i.clsZoom))
        },
        _createEvents: function () {
            var s, a, n = this,
                i = this.element,
                o = this.options,
                r = i.find(".image-magnifier-glass"),
                l = r[0].offsetWidth / 2,
                c = i.find("img")[0],
                d = this.zoomElement;
            h(window).on(t.events.resize, function () {
                var e = i.width() / 2 - o.lensSize / 2,
                    t = i.height() / 2 - o.lensSize / 2;
                "glass" === o.magnifierMode && r.css({
                    backgroundPosition: "-" + (e * o.magnifierZoom - o.lensSize / 4 + 4) + "px -" + (t * o.magnifierZoom - o.lensSize / 4 + 4) + "px",
                    backgroundSize: c.width * o.magnifierZoom + "px " + c.height * o.magnifierZoom + "px"
                })
            }, {
                ns: this.id
            }), "glass" !== o.magnifierMode && (s = d[0].offsetWidth / l / 2, a = d[0].offsetHeight / l / 2, d.css({
                backgroundSize: c.width * s + "px " + c.height * a + "px"
            }));

            function u(e) {
                var t, n, i = parseInt(o.magnifierZoom);
                "glass" === o.magnifierMode ? (t = e.x, n = e.y, t > c.width - l / i && (t = c.width - l / i), t < l / i && (t = l / i), n > c.height - l / i && (n = c.height - l / i), n < l / i && (n = l / i), r.css({
                    top: n - l,
                    left: t - l,
                    backgroundPosition: "-" + (t * i - l + 4) + "px -" + (n * i - l + 4) + "px"
                })) : (t = e.x - l, n = e.y - l, t > c.width - 2 * l && (t = c.width - 2 * l), t < 0 && (t = 0), n > c.height - 2 * l && (n = c.height - 2 * l), n < 0 && (n = 0), r.css({
                    top: n,
                    left: t
                }), d.css({
                    backgroundPosition: "-" + t * s + "px -" + n * a + "px"
                }))
            }
            i.on(t.events.move, function (e) {
                var t = p.getCursorPosition(c, e);
                u(t), n._fireEvent("magnifier-move", {
                    pos: t,
                    glass: r[0],
                    zoomElement: d ? d[0] : void 0
                }), e.preventDefault()
            }), i.on(t.events.leave, function () {
                var e = i.width() / 2 - o.lensSize / 2,
                    t = i.height() / 2 - o.lensSize / 2;
                r.animate({
                    draw: {
                        top: t,
                        left: e
                    }
                }), u({
                    x: e + o.lensSize / 2,
                    y: t + o.lensSize / 2
                })
            })
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return e.off(t.events.move), e.off(t.events.leave), e
        }
    })
}(Metro, m4q),
function (e, t) {
    "use strict";
    var n = {
        size: "100x100",
        width: null,
        height: null,
        color: "#f8f8f8",
        textColor: "#292929",
        font: "12px sans-serif",
        text: "",
        showText: !0,
        onImagePlaceholderCreate: e.noop
    };
    e.imagePlaceholderSetup = function (e) {
        n = t.extend({}, n, e)
    }, window.metroImagePlaceholderSetup, e.imagePlaceholderSetup(window.metroImagePlaceholderSetup), e.Component("image-placeholder", {
        init: function (e, t) {
            return this._super(t, e, n, {
                width: 0,
                height: 0
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("image-placeholder-create")
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = t.size.toArray("x");
            this.width = t.width || n[0], this.height = t.height || n[1], e.attr("src", this._createPlaceholder())
        },
        _createEvents: function () {},
        _createPlaceholder: function () {
            var e = this.options,
                t = document.createElement("canvas"),
                n = t.getContext("2d"),
                i = this.width,
                s = this.height;
            return t.width = parseInt(i), t.height = parseInt(s), n.clearRect(0, 0, i, s), n.fillStyle = e.color, n.fillRect(0, 0, i, s), n.fillStyle = e.textColor, n.font = e.font, n.translate(i / 2, s / 2), n.textAlign = "center", n.textBaseline = "middle", e.showText && n.fillText(e.text || i + " × " + s, 0, 0), t.toDataURL()
        },
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (o, i) {
    "use strict";
    var r = o.utils,
        n = {
            infoboxDeferred: 0,
            type: "",
            width: 480,
            height: "auto",
            overlay: !0,
            overlayColor: "#000000",
            overlayAlpha: .5,
            overlayClickClose: !1,
            autoHide: 0,
            removeOnClose: !1,
            closeButton: !0,
            clsBox: "",
            clsBoxContent: "",
            clsOverlay: "",
            onOpen: o.noop,
            onClose: o.noop,
            onInfoBoxCreate: o.noop
        };
    o.infoBoxSetup = function (e) {
        n = i.extend({}, n, e)
    }, window.metroInfoBoxSetup, o.infoBoxSetup(window.metroInfoBoxSetup), o.Component("info-box", {
        init: function (e, t) {
            return this._super(t, e, n, {
                overlay: null,
                id: r.elementId("info-box")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("info-box-create", {
                element: e
            })
        },
        _overlay: function () {
            var e = this.options,
                t = i("<div>");
            return t.addClass("overlay").addClass(e.clsOverlay), "transparent" === e.overlayColor ? t.addClass("transparent") : t.css({
                background: o.colors.toRGBA(e.overlayColor, e.overlayAlpha)
            }), t
        },
        _createStructure: function () {
            var e, t = this.element,
                n = this.options;
            !0 === n.overlay && (this.overlay = this._overlay()), t.addClass("info-box").addClass(n.type).addClass(n.clsBox), 0 === (e = t.find("closer")).length && (e = i("<span>").addClass("button square closer")).appendTo(t), !0 !== n.closeButton && e.hide(), 0 < (e = t.find(".info-box-content")).length && e.addClass(n.clsBoxContent), t.css({
                width: n.width,
                height: n.height,
                visibility: "hidden",
                top: "100%",
                left: (i(window).width() - t.outerWidth()) / 2
            }), t.appendTo(i("body"))
        },
        _createEvents: function () {
            var e = this,
                t = this.element;
            t.on(o.events.click, ".closer", function () {
                e.close()
            }), t.on(o.events.click, ".js-dialog-close", function () {
                e.close()
            }), i(window).on(o.events.resize, function () {
                e.reposition()
            }, {
                ns: this.id
            })
        },
        _setPosition: function () {
            var e = this.element;
            e.css({
                top: (i(window).height() - e.outerHeight()) / 2,
                left: (i(window).width() - e.outerWidth()) / 2
            })
        },
        reposition: function () {
            this._setPosition()
        },
        setContent: function (e) {
            var t = this.element.find(".info-box-content");
            0 !== t.length && (t.html(e), this.reposition())
        },
        setType: function (e) {
            this.element.removeClass("success info alert warning").addClass(e)
        },
        open: function () {
            var e = this,
                t = this.element,
                n = this.options;
            !0 === n.overlay && 0 === i(".overlay").length && (this.overlay.appendTo(i("body")), !0 === n.overlayClickClose && this.overlay.on(o.events.click, function () {
                e.close()
            })), this._setPosition(), t.css({
                visibility: "visible"
            }), this._fireEvent("open"), t.data("open", !0), 0 < parseInt(n.autoHide) && setTimeout(function () {
                e.close()
            }, parseInt(n.autoHide))
        },
        close: function () {
            var e = this.element,
                t = this.options;
            !0 === t.overlay && i("body").find(".overlay").remove(), e.css({
                visibility: "hidden",
                top: "100%"
            }), this._fireEvent("close"), e.data("open", !1), !0 === t.removeOnClose && (this.destroy(), e.remove())
        },
        isOpen: function () {
            return !0 === this.element.data("open")
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return e.off("all"), i(window).off(o.events.resize, {
                ns: this.id
            }), e
        }
    }), o.infobox = {
        isInfoBox: function (e) {
            return r.isMetroObject(e, "infobox")
        },
        open: function (e, t, n) {
            if (!this.isInfoBox(e)) return !1;
            e = o.getPlugin(e, "infobox");
            void 0 !== t && e.setContent(t), void 0 !== n && e.setType(n), e.open()
        },
        close: function (e) {
            if (!this.isInfoBox(e)) return !1;
            o.getPlugin(e, "infobox").close()
        },
        setContent: function (e, t) {
            if (!this.isInfoBox(e)) return !1;
            void 0 === t && (t = "");
            e = o.getPlugin(e, "infobox");
            e.setContent(t), e.reposition()
        },
        setType: function (e, t) {
            if (!this.isInfoBox(e)) return !1;
            e = o.getPlugin(e, "infobox");
            e.setType(t), e.reposition()
        },
        isOpen: function (e) {
            return !!this.isInfoBox(e) && o.getPlugin(e, "infobox").isOpen()
        },
        create: function (e, t, n, i) {
            var s = r.$(),
                a = void 0 !== t ? t : "",
                t = s("<div>").appendTo(s("body"));
            s("<div>").addClass("info-box-content").appendTo(t);
            var n = s.extend({}, {
                removeOnClose: !0,
                type: a
            }, void 0 !== n ? n : {});
            return n._runtime = !0, t.infobox(n), (n = o.getPlugin(t, "infobox")).setContent(e), !1 !== i && n.open(), t
        }
    }
}(Metro, m4q),
function (u, a) {
    "use strict";
    var h = u.utils,
        n = {
            maskPattern: ".",
            mask: null,
            maskPlaceholder: "_",
            maskEditableStart: 0,
            thresholdInterval: 300,
            onChar: u.noop,
            onInputMaskCreate: u.noop
        };
    u.inputMaskSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroInputMaskSetup, u.inputMaskSetup(window.metroInputMaskSetup), u.Component("input-mask", {
        init: function (e, t) {
            return a.device ? (t.setAttribute && t.setAttribute("placeholder", e.mask), void console.warn("The component input-mask can't be initialized, because you run it on a mobile device!")) : (this._super(t, e, n, {
                pattern: null,
                mask: "",
                maskArray: [],
                placeholder: "",
                length: 0,
                thresholdTimer: null,
                id: h.elementId("input-mask")
            }), this)
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("input-mask-create")
        },
        _createStructure: function () {
            var e = this.options;
            if (!e.mask) throw new Error("You must provide a pattern for masked input.");
            if ("string" != typeof e.maskPlaceholder || 1 < e.maskPlaceholder.length) throw new Error("Mask placeholder should be a single character or an empty string.");
            this.placeholder = e.maskPlaceholder, this.mask = "" + e.mask, this.maskArray = this.mask.split(""), this.pattern = new RegExp("^" + e.maskPattern + "+$"), this.length = this.mask.length, this._showValue()
        },
        _createEvents: function () {
            function a(e) {
                return e < r.mask.length && r.mask.charAt(e) === r.placeholder
            }

            function o(e) {
                for (var t = r.maskArray, n = e; n <= t.length; n++)
                    if (t[n] === r.placeholder) return n;
                return e
            }

            function t() {
                clearInterval(r.thresholdTimer), r.thresholdTimer = null
            }
            var r = this,
                e = this.element,
                l = this.options,
                c = l.maskEditableStart,
                n = this.id,
                d = function (e) {
                    r.elem.setSelectionRange(e, e)
                };
            e.on("change", function () {
                "" === this.value && (this.value = r.mask, d(c))
            }, {
                ns: n
            }), e.on("focus click", function () {
                this.selectionStart < c && d(c), d(o(this.selectionStart))
            }, {
                ns: n
            }), e.on("keydown", function (e) {
                var t = this.selectionStart,
                    n = this.value,
                    i = e.code,
                    s = e.key;
                if ("ArrowRight" === i || "End" === i) return !0;
                t >= r.length && -1 === ["Backspace", "Home", "ArrowLeft", "ArrowUp"].indexOf(i) ? e.preventDefault() : "Home" === i || "ArrowUp" === i ? (e.preventDefault(), d(c)) : "ArrowLeft" === i ? t - 1 < c && e.preventDefault() : "Backspace" === i ? (e.preventDefault(), c <= t - 1 && (a(t - 1) && this.value.charAt(t - 1) !== r.placeholder && (this.value = n.substr(0, t - 1) + r.placeholder + n.substr(t)), d(t - 1))) : "Space" === i ? (e.preventDefault(), d(t + 1)) : r.pattern.test(s) ? (e.preventDefault(), a(t) && (this.value = n.substr(0, t) + (l.onChar === u.noop ? s : h.exec(l.onChar, [s], this)) + n.substr(t + 1), d(o(t + 1)))) : e.preventDefault()
            }, {
                ns: n
            }), e.on("keyup", function () {
                var e = this;
                t(), r.thresholdTimer = setInterval(function () {
                    t(), d(o(e.selectionStart))
                }, l.thresholdInterval)
            }, {
                ns: n
            })
        },
        _showValue: function () {
            var n, i = this,
                e = this.elem,
                s = new Array(this.length);
            e.value ? (n = e.value, a.each(this.maskArray, function (e, t) {
                n[e] === t || i.pattern.test(n[e]) ? s[e] = n[e] : s[e] = i.placeholder
            }), this.elem.value = s.join("")) : e.value = this.mask
        },
        destroy: function () {
            var e = this.element,
                t = this.id;
            return e.off("change", {
                ns: t
            }), e.off("focus", {
                ns: t
            }), e.off("click", {
                ns: t
            }), e.off("keydown", {
                ns: t
            }), e.off("keyup", {
                ns: t
            }), e
        }
    })
}(Metro, m4q),
function (e, i) {
    "use strict";
    var s = e.utils,
        n = {
            materialinputDeferred: 0,
            label: "",
            informer: "",
            icon: "",
            permanentLabel: !1,
            clsComponent: "",
            clsInput: "",
            clsLabel: "",
            clsInformer: "",
            clsIcon: "",
            clsLine: "",
            onInputCreate: e.noop
        };
    e.materialInputSetup = function (e) {
        n = i.extend({}, n, e)
    }, window.metroMaterialInputSetup, e.materialInputSetup(window.metroMaterialInputSetup), e.Component("material-input", {
        init: function (e, t) {
            return this._super(t, e, n, {
                history: [],
                historyIndex: -1
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("input-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = i("<div>").addClass("input-material " + e[0].className);
            e[0].className = "", e.attr("autocomplete", "nope"), void 0 === e.attr("type") && e.attr("type", "text"), n.insertBefore(e), e.appendTo(n), s.isValue(t.label) && i("<span>").html(t.label).addClass("label").addClass(t.clsLabel).insertAfter(e), s.isValue(t.informer) && i("<span>").html(t.informer).addClass("informer").addClass(t.clsInformer).insertAfter(e), s.isValue(t.icon) && (n.addClass("with-icon"), i("<span>").html(t.icon).addClass("icon").addClass(t.clsIcon).insertAfter(e)), n.append(i("<hr>").addClass(t.clsLine)), !0 === t.permanentLabel && n.addClass("permanent-label"), n.addClass(t.clsComponent), e.addClass(t.clsInput), e.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {},
        clear: function () {
            this.element.val("")
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            "disabled" === e && this.toggleState()
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (a, l) {
    "use strict";
    var c = a.utils,
        n = {
            inputDeferred: 0,
            label: "",
            autocomplete: null,
            autocompleteUrl: null,
            autocompleteUrlMethod: "GET",
            autocompleteUrlKey: null,
            autocompleteDivider: ",",
            autocompleteListHeight: 200,
            history: !1,
            historyPreset: "",
            historyDivider: "|",
            preventSubmit: !1,
            defaultValue: "",
            size: "default",
            prepend: "",
            append: "",
            copyInlineStyles: !1,
            searchButton: !1,
            clearButton: !0,
            revealButton: !0,
            clearButtonIcon: "<span class='default-icon-cross'></span>",
            revealButtonIcon: "<span class='default-icon-eye'></span>",
            searchButtonIcon: "<span class='default-icon-search'></span>",
            customButtons: [],
            searchButtonClick: "submit",
            clsComponent: "",
            clsInput: "",
            clsPrepend: "",
            clsAppend: "",
            clsClearButton: "",
            clsRevealButton: "",
            clsCustomButton: "",
            clsSearchButton: "",
            clsLabel: "",
            onAutocompleteSelect: a.noop,
            onHistoryChange: a.noop,
            onHistoryUp: a.noop,
            onHistoryDown: a.noop,
            onClearClick: a.noop,
            onRevealClick: a.noop,
            onSearchButtonClick: a.noop,
            onEnterClick: a.noop,
            onInputCreate: a.noop
        };
    a.inputSetup = function (e) {
        n = l.extend({}, n, e)
    }, window.metroInputSetup, a.inputSetup(window.metroInputSetup), a.Component("input", {
        init: function (e, t) {
            return this._super(t, e, n, {
                history: [],
                historyIndex: -1,
                autocomplete: []
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("input-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, i = this,
                t = this.element,
                s = this.options,
                n = l("<div>").addClass("input " + t[0].className),
                a = l("<div>").addClass("button-group");
            if (c.isValue(s.historyPreset) && (l.each(s.historyPreset.toArray(s.historyDivider), function () {
                    i.history.push(this)
                }), i.historyIndex = i.history.length - 1), void 0 === t.attr("type") && t.attr("type", "text"), n.insertBefore(t), t.appendTo(n), a.appendTo(n), c.isValue(t.val().trim()) || t.val(s.defaultValue), !0 !== s.clearButton || t[0].readOnly || l("<button>").addClass("button input-clear-button").addClass(s.clsClearButton).attr("tabindex", -1).attr("type", "button").html(s.clearButtonIcon).appendTo(a), "password" === t.attr("type") && !0 === s.revealButton && l("<button>").addClass("button input-reveal-button").addClass(s.clsRevealButton).attr("tabindex", -1).attr("type", "button").html(s.revealButtonIcon).appendTo(a), !0 === s.searchButton && l("<button>").addClass("button input-search-button").addClass(s.clsSearchButton).attr("tabindex", -1).attr("type", "submit" === s.searchButtonClick ? "submit" : "button").html(s.searchButtonIcon).appendTo(a), c.isValue(s.prepend) && l("<div>").html(s.prepend).addClass("prepend").addClass(s.clsPrepend).appendTo(n), c.isValue(s.append) && l("<div>").html(s.append).addClass("append").addClass(s.clsAppend).appendTo(n), "string" == typeof s.customButtons && (s.customButtons = c.isObject(s.customButtons)), "object" == typeof s.customButtons && 0 < c.objectLength(s.customButtons) && l.each(s.customButtons, function () {
                    var n = l("<button>");
                    n.addClass("button input-custom-button").addClass(s.clsCustomButton).addClass(this.cls).attr("tabindex", -1).attr("type", "button").html(this.html), this.attr && "object" == typeof this.attr && l.each(this.attr, function (e, t) {
                        n.attr(Cake.dashedName(e), t)
                    }), n.data("action", this.onclick), n.appendTo(a)
                }), c.isValue(t.attr("data-exclaim")) && n.attr("data-exclaim", t.attr("data-exclaim")), "rtl" === t.attr("dir") && n.addClass("rtl").attr("dir", "rtl"), !(t[0].className = "") === s.copyInlineStyles)
                for (var o = 0, r = t[0].style.length; o < r; o++) n.css(t[0].style[o], t.css(t[0].style[o]));
            n.addClass(s.clsComponent), t.addClass(s.clsInput), "default" !== s.size && n.css({
                width: s.size
            }), c.isNull(s.autocomplete) && c.isNull(s.autocompleteUrl) || l("<div>").addClass("autocomplete-list").css({
                maxHeight: s.autocompleteListHeight,
                display: "none"
            }).appendTo(n), c.isValue(s.autocomplete) && (e = c.isObject(s.autocomplete), this.autocomplete = !1 !== e ? e : s.autocomplete.toArray(s.autocompleteDivider)), c.isValue(s.autocompleteUrl) && fetch(s.autocompleteUrl, {
                method: s.autocompleteUrlMethod
            }).then(function (e) {
                return e.text()
            }).then(function (t) {
                var n = [];
                try {
                    n = JSON.parse(t), s.autocompleteUrlKey && (n = n[s.autocompleteUrlKey])
                } catch (e) {
                    n = t.split("\n")
                }
                i.autocomplete = i.autocomplete.concat(n)
            }), s.label && (e = l("<label>").addClass("label-for-input").addClass(s.clsLabel).html(s.label).insertBefore(n), t.attr("id") && e.attr("for", t.attr("id")), "rtl" === t.attr("dir") && e.addClass("rtl")), t.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var n = this,
                i = this.element,
                s = this.options,
                e = i.closest(".input"),
                t = e.find(".autocomplete-list");
            e.on(a.events.click, ".input-clear-button", function () {
                var e = i.val();
                i.val(c.isValue(s.defaultValue) ? s.defaultValue : "").fire("clear").fire("change").fire("keyup").focus(), 0 < t.length && t.css({
                    display: "none"
                }), n._fireEvent("clear-click", {
                    prev: e,
                    val: i.val()
                })
            }), e.on(a.events.click, ".input-reveal-button", function () {
                "password" === i.attr("type") ? i.attr("type", "text") : i.attr("type", "password"), n._fireEvent("reveal-click", {
                    val: i.val()
                })
            }), e.on(a.events.click, ".input-search-button", function () {
                "submit" !== s.searchButtonClick ? n._fireEvent("search-button-click", {
                    val: i.val(),
                    button: this
                }) : this.form.submit()
            }), e.on(a.events.click, ".input-custom-button", function () {
                var e = l(this),
                    t = e.data("action");
                c.exec(t, [i.val(), e], this)
            }), i.on(a.events.keyup, function (e) {
                var t = i.val().trim();
                s.history && e.keyCode === a.keyCode.ENTER && "" !== t && (i.val(""), n.history.push(t), n.historyIndex = n.history.length - 1, n._fireEvent("history-change", {
                    val: t,
                    history: n.history,
                    historyIndex: n.historyIndex
                }), !0 === s.preventSubmit && e.preventDefault()), s.history && e.keyCode === a.keyCode.UP_ARROW && (n.historyIndex--, 0 <= n.historyIndex ? (i.val(""), i.val(n.history[n.historyIndex]), n._fireEvent("history-down", {
                    val: i.val(),
                    history: n.history,
                    historyIndex: n.historyIndex
                })) : n.historyIndex = 0, e.preventDefault()), s.history && e.keyCode === a.keyCode.DOWN_ARROW && (n.historyIndex++, n.historyIndex < n.history.length ? (i.val(""), i.val(n.history[n.historyIndex]), n._fireEvent("history-up", {
                    val: i.val(),
                    history: n.history,
                    historyIndex: n.historyIndex
                })) : n.historyIndex = n.history.length - 1, e.preventDefault())
            }), i.on(a.events.keydown, function (e) {
                e.keyCode === a.keyCode.ENTER && n._fireEvent("enter-click", {
                    val: i.val()
                })
            }), i.on(a.events.blur, function () {
                e.removeClass("focused")
            }), i.on(a.events.focus, function () {
                e.addClass("focused")
            }), i.on(a.events.input, function () {
                var e = this.value.toLowerCase();
                n._drawAutocompleteList(e)
            }), e.on(a.events.click, ".autocomplete-list .item", function () {
                var e = l(this).attr("data-autocomplete-value");
                i.val(e), t.css({
                    display: "none"
                }), i.trigger("change"), n._fireEvent("autocomplete-select", {
                    value: e
                })
            })
        },
        _drawAutocompleteList: function (n) {
            var e, i = this,
                s = this.element.closest(".input").find(".autocomplete-list");
            0 !== s.length && (s.html(""), e = this.autocomplete.filter(function (e) {
                return -1 < e.toLowerCase().indexOf(n)
            }), s.css({
                display: 0 < e.length ? "block" : "none"
            }), l.each(e, function () {
                var e = this.toLowerCase().indexOf(n),
                    t = l("<div>").addClass("item").attr("data-autocomplete-value", this),
                    e = 0 === e ? "<strong>" + this.substr(0, n.length) + "</strong>" + this.substr(n.length) : this.substr(0, e) + "<strong>" + this.substr(e, n.length) + "</strong>" + this.substr(e + n.length);
                t.html(e).appendTo(s), i._fireEvent("draw-autocomplete-item", {
                    item: t
                })
            }))
        },
        getHistory: function () {
            return this.history
        },
        getHistoryIndex: function () {
            return this.historyIndex
        },
        setHistoryIndex: function (e) {
            this.historyIndex = e >= this.history.length ? this.history.length - 1 : e
        },
        setHistory: function (e, t) {
            var n = this,
                i = this.options;
            c.isNull(e) || (Array.isArray(e) || "string" != typeof e || (e = e.toArray(i.historyDivider)), !0 === t ? l.each(e, function () {
                n.history.push(this)
            }) : this.history = e, this.historyIndex = this.history.length - 1)
        },
        clear: function () {
            this.element.val("")
        },
        toDefault: function () {
            this.element.val(c.isValue(this.options.defaultValue) ? this.options.defaultValue : "")
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        setAutocompleteList: function (e) {
            var t = c.isObject(e);
            !1 !== t ? this.autocomplete = t : "string" == typeof e && (this.autocomplete = e.toArray(this.options.autocompleteDivider))
        },
        changeAttribute: function (e) {
            "disabled" === e && this.toggleState()
        },
        destroy: function () {
            var e = this.element,
                t = e.parent(),
                n = t.find(".input-clear-button"),
                i = t.find(".input-reveal-button"),
                t = t.find(".input-custom-button");
            return 0 < n.length && n.off(a.events.click), 0 < i.length && (i.off(a.events.start), i.off(a.events.stop)), 0 < t.length && n.off(a.events.click), e.off(a.events.blur), e.off(a.events.focus), e
        }
    }), l(document).on(a.events.click, function () {
        l(".input .autocomplete-list").hide()
    })
}(Metro, m4q),
function (e, c) {
    "use strict";
    var n = e.utils,
        i = {
            keylockDeferred: 0,
            stateOnIcon: "<span>&times;</span>",
            stateOffIcon: "<span>&checkmark;</span>",
            transition: !0,
            onCaption: "",
            offCaption: "",
            captionPosition: "right",
            clsKeylock: "",
            clsStateOn: "",
            clsStateOff: "",
            clsCaption: "",
            clsIcon: "",
            clsOnCaption: "",
            clsOffCaption: "",
            onKeylockCreate: e.noop
        };
    e.keylockSetup = function (e) {
        i = c.extend({}, i, e)
    }, window.metroKeylockSetup, e.keylockSetup(window.metroKeylockSetup), e.Component("keylock", {
        init: function (e, t) {
            return this._super(t, e, i), this
        },
        _create: function () {
            var e, t = this.element,
                n = this.options,
                i = c("<span>").addClass("icon").addClass(n.clsIcon),
                s = c("<span>").addClass("caption").addClass(n.clsCaption),
                a = c(n.stateOnIcon).addClass("state-on").addClass(n.clsStateOn),
                o = c(n.stateOffIcon).addClass("state-off").addClass(n.clsStateOff),
                r = c("<span>").addClass("state-on").addClass(n.clsOnCaption).html(n.onCaption),
                l = c("<span>").addClass("state-off").addClass(n.clsOffCaption).html(n.offCaption);
            t.attr("type", "checkbox"), void 0 !== t.attr("readonly") && t.on("click", function (e) {
                e.preventDefault()
            }), e = t.wrap(c("<label>").addClass("keylock").addClass(n.clsKeylock)), i.appendTo(e), s.appendTo(e), a.appendTo(i), o.appendTo(i), r.appendTo(s), l.appendTo(s), !0 === n.transition && e.addClass("transition-on"), "left" === n.captionPosition && e.addClass("caption-left"), t[0].className = "", t.is(":disabled") ? this.disable() : this.enable(), this._fireEvent("keylock-create")
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        toggle: function (e) {
            var t = this.element;
            return n.isValue(e) ? t.prop("checked", 1 === e) : t.prop("checked", !n.bool(t.prop("checked"))), this
        },
        changeAttribute: function (e) {
            "disabled" === e && this.toggleState()
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (o, r) {
    "use strict";
    var n = {
        keypadDeferred: 0,
        label: "",
        keySize: 48,
        keys: "1, 2, 3, 4, 5, 6, 7, 8, 9, 0",
        exceptKeys: "",
        keySeparator: "",
        trimSeparator: !1,
        keyDelimiter: ",",
        copyInlineStyles: !1,
        target: null,
        keyLength: 0,
        shuffle: !1,
        shuffleCount: 3,
        position: o.position.BOTTOM_LEFT,
        dynamicPosition: !1,
        serviceButtons: !0,
        showValue: !0,
        open: !1,
        sizeAsKeys: !1,
        clsKeypad: "",
        clsInput: "",
        clsKeys: "",
        clsKey: "",
        clsServiceKey: "",
        clsBackspace: "",
        clsClear: "",
        clsLabel: "",
        onChange: o.noop,
        onClear: o.noop,
        onBackspace: o.noop,
        onShuffle: o.noop,
        onKey: o.noop,
        onKeypadCreate: o.noop
    };
    o.keypadSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroKeypadSetup, o.keypadSetup(window.metroKeypadSetup), o.Component("keypad", {
        init: function (e, t) {
            return this._super(t, e, n, {
                value: "INPUT" === t.tagName ? t.value : t.innerText,
                positions: ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"],
                keypad: null,
                keys: [],
                keys_to_work: [],
                exceptKeys: []
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.keys = t.keys.toArray(t.keyDelimiter), this.keys_to_work = this.keys, this.exceptKeys = t.exceptKeys.toArray(t.keyDelimiter), this._createKeypad(), !0 === t.shuffle && this.shuffle(), this._createKeys(), this._createEvents(), this._fireEvent("keypad-create", {
                element: e
            })
        },
        _createKeypad: function () {
            var e = this.element,
                t = this.options,
                n = e.parent(),
                i = n.hasClass("input") ? n : r("<div>").addClass("input").addClass(e[0].className);
            if (i.addClass("keypad"), "static" !== i.css("position") && "" !== i.css("position") || i.css({
                    position: "relative"
                }), void 0 === e.attr("type") && e.attr("type", "text"), i.insertBefore(e), e.attr("readonly", !0), e.appendTo(i), (n = r("<div>").addClass("keys").addClass(t.clsKeys)).appendTo(i), this._setKeysPosition(), !0 === t.open && n.addClass("open keep-open"), !(e[0].className = "") === t.copyInlineStyles)
                for (var s = 0, a = e[0].style.length; s < a; s++) i.css(e[0].style[s], e.css(e[0].style[s]));
            e.addClass(t.clsInput), i.addClass(t.clsKeypad), e.on(o.events.blur, function () {
                i.removeClass("focused")
            }), e.on(o.events.focus, function () {
                i.addClass("focused")
            }), t.label && (n = r("<label>").addClass("label-for-input").addClass(t.clsLabel).html(t.label).insertBefore(i), e.attr("id") && n.attr("for", e.attr("id")), "rtl" === e.attr("dir") && n.addClass("rtl")), !0 === t.disabled || e.is(":disabled") ? this.disable() : this.enable(), this.keypad = i
        },
        _setKeysPosition: function () {
            var e = this.element,
                t = this.options;
            e.parent().find(".keys").removeClass(this.positions.join(" ")).addClass(t.position)
        },
        _createKeys: function () {
            var e, t = this.element,
                n = this.options,
                i = t.parent(),
                s = i.find(".keys"),
                a = Math.round(Math.sqrt(this.keys.length + 2)),
                t = n.keySize;
            s.html(""), r.each(this.keys_to_work, function () {
                (e = r("<span>").addClass("key").addClass(n.clsKey).html(this)).data("key", this), e.css({
                    width: n.keySize,
                    height: n.keySize,
                    lineHeight: n.keySize - 4
                }).appendTo(s)
            }), !0 === n.serviceButtons && r.each(["&larr;", "&times;"], function () {
                e = r("<span>").addClass("key service-key").addClass(n.clsKey).addClass(n.clsServiceKey).html(this), "&larr;" === this && e.addClass(n.clsBackspace), "&times;" === this && e.addClass(n.clsClear), e.data("key", this), e.css({
                    width: n.keySize,
                    height: n.keySize,
                    lineHeight: n.keySize - 4
                }).appendTo(s)
            }), t = a * (t + 2) - 6, s.outerWidth(t), !0 === n.sizeAsKeys && -1 !== ["top-left", "top", "top-right", "bottom-left", "bottom", "bottom-right"].indexOf(n.position) && i.outerWidth(s.outerWidth())
        },
        _createEvents: function () {
            var i = this,
                s = this.element,
                a = this.options,
                e = s.parent(),
                t = e.find(".keys");
            t.on(o.events.click, ".key", function (e) {
                var t = r(this),
                    n = t.data("key");
                if ("&larr;" !== t.data("key") && "&times;" !== t.data("key")) {
                    if (0 < a.keyLength && ("" + i.value).length === a.keyLength) return !1; - 1 === i.exceptKeys.indexOf(n) && (i.value = i.value + ("" !== i.value ? a.keySeparator : "") + n), !0 === a.shuffle && (i.shuffle(), i._createKeys()), !0 === a.dynamicPosition && (a.position = i.positions[r.random(0, i.positions.length - 1)], i._setKeysPosition()), i._fireEvent("key", {
                        key: t.data("key"),
                        val: i.value
                    })
                } else "&times;" === t.data("key") && (i.value = "", i._fireEvent("clear")), "&larr;" === t.data("key") && (t = a.keySeparator && i.value[i.value.length - 1] !== a.keySeparator ? 2 : 1, i.value = i.value.substring(0, i.value.length - t), i._fireEvent("backspace", {
                    val: i.value
                }));
                !0 === a.showValue && ("INPUT" === s[0].tagName ? s.val(i.value) : s.text(i.value)), i._fireEvent("change", {
                    val: i.val
                }), e.preventDefault(), e.stopPropagation()
            }), e.on(o.events.click, function (e) {
                !0 !== a.open && (!0 === t.hasClass("open") ? t.removeClass("open") : t.addClass("open"), e.preventDefault(), e.stopPropagation())
            }), null !== a.target && s.on(o.events.change, function () {
                var e = r(a.target);
                0 !== e.length && ("INPUT" === e[0].tagName ? e.val(i.value) : e.text(i.value))
            })
        },
        shuffle: function () {
            for (var e = this.options, t = 0; t < e.shuffleCount; t++) this.keys_to_work = this.keys_to_work.shuffle();
            this._fireEvent("shuffle", {
                keysToWork: this.keys_to_work,
                keys: this.keys
            })
        },
        shuffleKeys: function (e) {
            void 0 === e && (e = this.options.shuffleCount);
            for (var t = 0; t < e; t++) this.keys_to_work = this.keys_to_work.shuffle();
            this._createKeys()
        },
        val: function (e) {
            var t = this.element,
                n = this.options;
            return void 0 === e ? n.trimSeparator ? this.value.replace(new RegExp(n.keySeparator, "g")) : this.value : (this.value = "" + e, "INPUT" === t[0].tagName ? t.val(e) : t.text(e), this)
        },
        open: function () {
            this.element.parent().find(".keys").addClass("open")
        },
        close: function () {
            this.element.parent().find(".keys").removeClass("open")
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        setPosition: function (e) {
            e = void 0 !== e ? e : this.element.attr("data-position"); - 1 !== this.positions.indexOf(e) && (this.options.position = e, this._setKeysPosition())
        },
        changeAttribute: function (e) {
            switch (e) {
                case "disabled":
                    this.toggleState();
                    break;
                case "data-position":
                    this.setPosition()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.keypad,
                n = t.find(".keys");
            return t.off(o.events.click), n.off(o.events.click, ".key"), e.off(o.events.change), e
        }
    }), r(document).on(o.events.click, function () {
        var e = r(".keypad .keys");
        r.each(e, function () {
            r(this).hasClass("keep-open") || r(this).removeClass("open")
        })
    })
}(Metro, m4q),
function (l, c) {
    "use strict";
    var n = {
        loop: !0,
        source: "img",
        iconClose: "<span class='default-icon-cross'>",
        iconPrev: "<span class='default-icon-chevron-left'>",
        iconNext: "<span class='default-icon-chevron-right'>",
        clsNext: "",
        clsPrev: "",
        clsClose: "",
        clsImage: "",
        clsImageContainer: "",
        clsImageWrapper: "",
        clsLightbox: "",
        onDrawImage: l.noop,
        onLightboxCreate: l.noop
    };
    l.lightboxSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroLightboxSetup, l.lightboxSetup(window.metroLightboxSetup), l.Component("lightbox", {
        init: function (e, t) {
            return this._super(t, e, n, {
                overlay: null,
                lightbox: null,
                current: null,
                items: []
            }), this
        },
        _create: function () {
            var e = this.options;
            e.source || (e.source = "img"), this._createStructure(), this._createEvents(), this._fireEvent("lightbox-create")
        },
        _createStructure: function () {
            var e, t = this.options,
                n = c(".lightbox-overlay");
            0 === n.length && (n = c("<div>").addClass("lightbox-overlay").appendTo("body").hide()), e = c("<div>").addClass("lightbox").addClass(t.clsLightbox).appendTo("body").hide(), c("<span>").addClass("lightbox__prev").addClass(t.clsPrev).html(t.iconPrev).appendTo(e), c("<span>").addClass("lightbox__next").addClass(t.clsNext).html(t.iconNext).appendTo(e), c("<span>").addClass("lightbox__closer").addClass(t.clsClose).html(t.iconClose).appendTo(e), c("<div>").addClass("lightbox__image").addClass(t.clsImageContainer).appendTo(e), this.component = e[0], this.lightbox = e, this.overlay = n
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = c(this.component);
            t.on(l.events.click, n.source, function () {
                e.open(this)
            }), i.on(l.events.click, ".lightbox__closer", function () {
                e.close()
            }), i.on(l.events.click, ".lightbox__prev", function () {
                e.prev()
            }), i.on(l.events.click, ".lightbox__next", function () {
                e.next()
            })
        },
        _setupItems: function () {
            var e = this.element,
                t = this.options,
                t = e.find(t.source);
            0 !== t.length && (this.items = t)
        },
        _goto: function (e) {
            var t, n, i = this,
                s = this.options,
                a = c(e),
                o = c("<img>"),
                r = this.lightbox.find(".lightbox__image");
            r.find(".lightbox__image-wrapper").remove(), t = c("<div>").addClass("lightbox__image-wrapper").addClass(s.clsImageWrapper).attr("data-title", a.attr("alt") || a.attr("data-title") || "").appendTo(r), n = c("<div>").appendTo(t), l.makePlugin(n, "activity", {
                type: "cycle",
                style: "color"
            }), "IMG" !== (this.current = e).tagName && "DIV" !== e.tagName || (e = a.attr("data-original") || a.attr("src"), o.attr("src", e), o[0].onload = function () {
                var e = this.height > this.width;
                o.addClass(e ? "lightbox__image-portrait" : "lightbox__image-landscape").addClass(s.clsImage), o.attr("alt", a.attr("alt")), o.appendTo(t), n.remove(), i._fireEvent("draw-image", {
                    image: o[0],
                    item: t[0]
                })
            })
        },
        _index: function (t) {
            var n = -1;
            return this.items.each(function (e) {
                this === t && (n = e)
            }), n
        },
        next: function () {
            var e = this.current,
                e = this._index(e);
            if (e + 1 >= this.items.length) {
                if (!this.options.loop) return;
                e = -1
            }
            this._goto(this.items[e + 1])
        },
        prev: function () {
            var e = this.current,
                e = this._index(e);
            if (e - 1 < 0) {
                if (!this.options.loop) return;
                e = this.items.length
            }
            this._goto(this.items[e - 1])
        },
        open: function (e) {
            return this._setupItems(), this._goto(e), this.overlay.show(), this.lightbox.show(), this
        },
        close: function () {
            this.overlay.hide(), this.lightbox.hide()
        },
        changeAttribute: function () {},
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (r, c) {
    "use strict";
    var d = r.utils,
        n = {
            locale: METRO_LOCALE,
            listDeferred: 0,
            templateBeginToken: "<%",
            templateEndToken: "%>",
            paginationDistance: 5,
            paginationShortMode: !0,
            thousandSeparator: ",",
            decimalSeparator: ",",
            itemTag: "li",
            defaultTemplateTag: "div",
            sortClass: null,
            sortDir: "asc",
            sortInitial: !0,
            filterClass: null,
            filter: null,
            filterString: "",
            filters: null,
            source: null,
            showItemsSteps: !1,
            showSearch: !1,
            showListInfo: !1,
            showPagination: !1,
            showActivity: !0,
            muteList: !0,
            items: -1,
            itemsSteps: "all, 10,25,50,100",
            itemsAllTitle: "Show all",
            listItemsCountTitle: "Show entries:",
            listSearchTitle: "Search:",
            listInfoTitle: "Showing $1 to $2 of $3 entries",
            paginationPrevTitle: "Prev",
            paginationNextTitle: "Next",
            activityType: "cycle",
            activityStyle: "color",
            activityTimeout: 100,
            searchWrapper: null,
            rowsWrapper: null,
            infoWrapper: null,
            paginationWrapper: null,
            clsComponent: "",
            clsList: "",
            clsListItem: "",
            clsListTop: "",
            clsItemsCount: "",
            clsSearch: "",
            clsListBottom: "",
            clsListInfo: "",
            clsListPagination: "",
            clsPagination: "",
            clsTemplateTag: "",
            onDraw: r.noop,
            onDrawItem: r.noop,
            onSortStart: r.noop,
            onSortStop: r.noop,
            onSortItemSwitch: r.noop,
            onSearch: r.noop,
            onRowsCountChange: r.noop,
            onDataLoad: r.noop,
            onDataLoaded: r.noop,
            onDataLoadError: r.noop,
            onFilterItemAccepted: r.noop,
            onFilterItemDeclined: r.noop,
            onListCreate: r.noop
        };
    r.listSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroListSetup, r.listSetup(window.metroListSetup), r.Component("list", {
        init: function (e, t) {
            return this._super(t, e, n, {
                currentPage: 1,
                pagesCount: 1,
                filterString: "",
                data: null,
                activity: null,
                busy: !1,
                filters: [],
                wrapperInfo: null,
                wrapperSearch: null,
                wrapperRows: null,
                wrapperPagination: null,
                filterIndex: null,
                filtersIndexes: [],
                itemTemplate: null,
                sort: {
                    dir: "asc",
                    colIndex: 0
                },
                header: null,
                items: []
            }), this
        },
        _create: function () {
            var t = this,
                n = this.options;
            n.source ? (t._fireEvent("data-load", {
                source: n.source
            }), fetch(n.source).then(r.fetch.status).then(r.fetch.json).then(function (e) {
                t._fireEvent("data-loaded", {
                    source: n.source,
                    data: e
                }), t._build(e)
            }).catch(function (e) {
                t._fireEvent("data-load-error", {
                    source: n.source,
                    error: e
                })
            })) : t._build()
        },
        _build: function (e) {
            d.isValue(e) ? this._createItemsFromJSON(e) : this._createItemsFromHTML(), this._createStructure(), this._createEvents(), this._fireEvent("list-create")
        },
        _createItemsFromHTML: function () {
            var t = this,
                e = this.element,
                n = this.options,
                i = ("" + n.clsTemplateTag).toArray(",");
            this.items = [], c.each(e.children(n.itemTag), function () {
                var e = c(this).children("*");
                i.length && (1 === i.length ? e.addClass(i[0]) : e.each(function (e, t) {
                    c(t).addClass(i[e] || i[i.length - 1])
                })), t.items.push(this)
            })
        },
        _createItemsFromJSON: function (e) {
            var s = this,
                a = this.options,
                o = ("" + a.clsTemplateTag).toArray(",");
            this.items = [], d.isValue(e.template) && (this.itemTemplate = e.template), d.isValue(e.header) && (this.header = e.header), d.isValue(e.data) && c.each(e.data, function () {
                var e = "",
                    t = document.createElement(a.itemTag),
                    n = s.itemTemplate;
                if (d.isValue(n)) e = r.template(n, this, {
                    beginToken: a.templateBeginToken,
                    endToken: a.templateEndToken
                });
                else
                    for (var i in this) e += "<" + a.defaultTemplateTag + ">" + this[i] + "</" + a.defaultTemplateTag + ">";
                t.innerHTML = e, n = c(t).children("*"), o.length && (1 === o.length ? n.addClass(o[0]) : n.each(function (e, t) {
                    c(t).addClass(o[e] || o[o.length - 1])
                })), s.items.push(t)
            })
        },
        _createTopBlock: function () {
            var t, n = this,
                e = this.element,
                i = this.options,
                s = c("<div>").addClass("list-top").addClass(i.clsListTop).insertBefore(e),
                e = d.isValue(this.wrapperSearch) ? this.wrapperSearch : c("<div>").addClass("list-search-block").addClass(i.clsSearch).appendTo(s);
            return c("<input>").attr("type", "text").appendTo(e).input({
                prepend: i.listSearchTitle
            }), !0 !== i.showSearch && e.hide(), e = d.isValue(this.wrapperRows) ? this.wrapperRows : c("<div>").addClass("list-rows-block").addClass(i.clsItemsCount).appendTo(s), t = c("<select>").appendTo(e), c.each(i.itemsSteps.toArray(), function () {
                var e = c("<option>").attr("value", "all" === this ? -1 : this).text("all" === this ? i.itemsAllTitle : this).appendTo(t); + this == +i.items && e.attr("selected", "selected")
            }), t.select({
                filter: !1,
                prepend: i.listItemsCountTitle,
                onChange: function (e) {
                    +e != +i.items && (i.items = parseInt(e), n.currentPage = 1, n._draw(), n._fireEvent("rows-count-change", {
                        val: e
                    }))
                }
            }), !0 !== i.showItemsSteps && e.hide(), s
        },
        _createBottomBlock: function () {
            var e = this.element,
                t = this.options,
                n = c("<div>").addClass("list-bottom").addClass(t.clsListBottom).insertAfter(e),
                e = c("<div>").addClass("list-info").addClass(t.clsListInfo).appendTo(n);
            return !0 !== t.showListInfo && e.hide(), e = c("<div>").addClass("list-pagination").addClass(t.clsListPagination).appendTo(n), !0 !== t.showPagination && e.hide(), n
        },
        _createStructure: function () {
            var e, t, n = this,
                i = this.element,
                s = this.options,
                a = c(s.searchWrapper),
                o = c(s.infoWrapper),
                r = c(s.rowsWrapper),
                l = c(s.paginationWrapper);
            0 < a.length && (this.wrapperSearch = a), 0 < o.length && (this.wrapperInfo = o), 0 < r.length && (this.wrapperRows = r), 0 < l.length && (this.wrapperPagination = l), i.parent().hasClass("list-component") ? e = i.parent() : (e = c("<div>").addClass("list-component").insertBefore(i), i.appendTo(e)), e.addClass(s.clsComponent), this.activity = c("<div>").addClass("list-progress").appendTo(e), c("<div>").activity({
                type: s.activityType,
                style: s.activityStyle
            }).appendTo(this.activity), !0 !== s.showActivity && this.activity.css({
                visibility: "hidden"
            }), i.addClass(s.clsList), this._createTopBlock(), this._createBottomBlock(), d.isValue(s.filterString) && (this.filterString = s.filterString), d.isValue(s.filter) && (!1 === (t = d.isFunc(s.filter)) && (t = d.func(s.filter)), n.filterIndex = n.addFilter(t)), d.isValue(s.filters) && "string" == typeof s.filters && c.each(s.filters.toArray(), function () {
                !1 !== (t = d.isFunc(this)) && n.filtersIndexes.push(n.addFilter(t))
            }), !(this.currentPage = 1) !== s.sortInitial ? this.sorting(s.sortClass, s.sortDir, !0) : this.draw()
        },
        _createEvents: function () {
            var e, n = this,
                t = this.element.parent();

            function i(e) {
                var t = c(e),
                    e = t.parent();
                e.hasClass("active") || (e.hasClass("service") ? "prev" === t.data("page") ? (n.currentPage--, 0 === n.currentPage && (n.currentPage = 1)) : (n.currentPage++, n.currentPage > n.pagesCount && (n.currentPage = n.pagesCount)) : n.currentPage = t.data("page"), n._draw())
            }
            t.find(".list-search-block input").on(r.events.inputchange, function () {
                n.filterString = this.value.trim().toLowerCase(), ":" !== n.filterString[n.filterString.length - 1] && (n.currentPage = 1, n._draw())
            }), d.isValue(this.wrapperSearch) && 0 < (e = this.wrapperSearch.find("input")).length && e.on(r.events.inputchange, function () {
                n.filterString = this.value.trim().toLowerCase(), ":" !== n.filterString[n.filterString.length - 1] && (n.currentPage = 1, n._draw())
            }), t.on(r.events.click, ".pagination .page-link", function () {
                i(this)
            }), d.isValue(this.wrapperPagination) && this.wrapperPagination.on(r.events.click, ".pagination .page-link", function () {
                i(this)
            })
        },
        _info: function (e, t, n) {
            var i = this.element,
                s = this.options,
                i = i.parent(),
                i = d.isValue(this.wrapperInfo) ? this.wrapperInfo : i.find(".list-info");
            0 !== i.length && (n < t && (t = n), 0 === this.items.length && (e = t = n = 0), s = (s = (s = (s = s.listInfoTitle).replace("$1", e)).replace("$2", t)).replace("$3", n), i.html(s))
        },
        _paging: function (e) {
            var t = this.element,
                n = this.options,
                t = t.parent();
            this.pagesCount = Math.ceil(e / n.items), r.pagination({
                length: e,
                rows: n.items,
                current: this.currentPage,
                target: d.isValue(this.wrapperPagination) ? this.wrapperPagination : t.find(".list-pagination"),
                claPagination: n.clsPagination,
                prevTitle: n.paginationPrevTitle,
                nextTitle: n.paginationNextTitle,
                distance: !0 === n.paginationShortMode ? n.paginationDistance : 0
            })
        },
        _filter: function () {
            var e, t, n, i, s, a, o = this,
                r = this.options;
            return d.isValue(this.filterString) || 0 < this.filters.length ? (e = this.items.filter(function (e) {
                if (n = "", d.isValue(r.filterClass)) {
                    if (0 < (i = e.getElementsByClassName(r.filterClass)).length)
                        for (t = 0; t < i.length; t++) n += i[t].textContent
                } else n = e.textContent;
                if (s = n.replace(/[\n\r]+|[\s]{2,}/g, " ").trim().toLowerCase(), !0 === (a = !d.isValue(o.filterString) || -1 < s.indexOf(o.filterString)) && 0 < o.filters.length)
                    for (t = 0; t < o.filters.length; t++)
                        if (!0 !== d.exec(o.filters[t], [e])) {
                            a = !1;
                            break
                        } return a ? o._fireEvent("filter-item-accepted", {
                    item: e
                }) : o._fireEvent("filter-item-declined", {
                    item: e
                }), a
            }), o._fireEvent("search", {
                search: o.filterString,
                items: e
            })) : e = this.items, e
        },
        _draw: function (e) {
            var t, n = this.element,
                i = this.options,
                s = -1 === i.items ? 0 : i.items * (this.currentPage - 1),
                a = -1 === i.items ? this.items.length - 1 : s + i.items - 1,
                o = this._filter();
            for (n.children(i.itemTag).remove(), t = s; t <= a; t++) d.isValue(o[t]) && c(o[t]).addClass(i.clsListItem).appendTo(n), this._fireEvent("draw-item", {
                item: o[t]
            });
            this._info(1 + s, 1 + a, o.length), this._paging(o.length), this.activity.hide(), this._fireEvent("draw"), void 0 !== e && d.exec(e, [n], n[0])
        },
        _getItemContent: function (e) {
            var t, n, i, s, a = this.options,
                o = c(e),
                r = d.isValue(o.data("formatMask")) ? o.data("formatMask") : null;
            if (d.isValue(a.sortClass)) {
                if (i = "", 0 < (n = c(e).find("." + a.sortClass)).length)
                    for (t = 0; t < n.length; t++) i += n[t].textContent;
                s = 0 < n.length ? n[0].getAttribute("data-format") : ""
            } else i = e.textContent, s = e.getAttribute("data-format");
            if (i = ("" + i).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, " ").trim(), d.isValue(s)) switch (-1 === ["number", "int", "integer", "float", "money"].indexOf(s) || "," === a.thousandSeparator && "." === a.decimalSeparator || (i = d.parseNumber(i, a.thousandSeparator, a.decimalSeparator)), s) {
                case "date":
                    i = r ? Datetime.from(i, r, a.locale) : datetime(i);
                    break;
                case "number":
                    i = Number(i);
                    break;
                case "int":
                case "integer":
                    i = parseInt(i);
                    break;
                case "float":
                    i = parseFloat(i);
                    break;
                case "money":
                    i = d.parseMoney(i);
                    break;
                case "card":
                    i = d.parseCard(i);
                    break;
                case "phone":
                    i = d.parsePhone(i)
            }
            return i
        },
        deleteItem: function (e) {
            for (var t, n = [], i = d.isFunc(e), s = 0; s < this.items.length; s++) t = this.items[s], i ? d.exec(e, [t]) && n.push(s) : t.textContent.includes(e) && n.push(s);
            return this.items = d.arrayDeleteByMultipleKeys(this.items, n), this
        },
        draw: function () {
            return this._draw()
        },
        sorting: function (e, t, n) {
            var a = this,
                o = this.options;
            return d.isValue(e) && (o.sortClass = e), d.isValue(t) && -1 < ["asc", "desc"].indexOf(t) && (o.sortDir = t), this._fireEvent("sort-start", {
                items: this.items
            }), this.items.sort(function (e, t) {
                var n = a._getItemContent(e),
                    i = a._getItemContent(t),
                    s = 0;
                return n < i && (s = "asc" === o.sortDir ? -1 : 1), i < n && (s = "asc" === o.sortDir ? 1 : -1), 0 !== s && a._fireEvent("sort-item-switch", {
                    a: e,
                    b: t,
                    result: s
                }), s
            }), this._fireEvent("sort-stop", {
                items: this.items
            }), !0 === n && this._draw(), this
        },
        filter: function (e) {
            this.filterString = e.trim().toLowerCase(), this.currentPage = 1, this._draw()
        },
        loadData: function (e) {
            var n = this,
                i = this.element,
                s = this.options;
            !0 === d.isValue(e) && (s.source = e, this._fireEvent("data-load", {
                source: s.source
            }), fetch(s.source).then(r.fetch.status).then(r.fetch.json).then(function (e) {
                var t;
                n._fireEvent("data-loaded", {
                    source: s.source,
                    data: e
                }), n._createItemsFromJSON(e), i.html(""), d.isValue(s.filterString) && (n.filterString = s.filterString), d.isValue(s.filter) && (!1 === (t = d.isFunc(s.filter)) && (t = d.func(s.filter)), n.filterIndex = n.addFilter(t)), d.isValue(s.filters) && "string" == typeof s.filters && c.each(s.filters.toArray(), function () {
                    !1 !== (t = d.isFunc(this)) && n.filtersIndexes.push(n.addFilter(t))
                }), n.currentPage = 1, n.sorting(s.sortClass, s.sortDir, !0)
            }).catch(function (e) {
                n._fireEvent("data-load-error", {
                    source: s.source,
                    error: e
                })
            }))
        },
        next: function () {
            0 !== this.items.length && (this.currentPage++, this.currentPage > this.pagesCount ? this.currentPage = this.pagesCount : this._draw())
        },
        prev: function () {
            0 !== this.items.length && (this.currentPage--, 0 !== this.currentPage ? this._draw() : this.currentPage = 1)
        },
        first: function () {
            0 !== this.items.length && (this.currentPage = 1, this._draw())
        },
        last: function () {
            0 !== this.items.length && (this.currentPage = this.pagesCount, this._draw())
        },
        page: function (e) {
            e <= 0 && (e = 1), e > this.pagesCount && (e = this.pagesCount), this.currentPage = e, this._draw()
        },
        addFilter: function (e, t) {
            e = d.isFunc(e);
            if (!1 !== e) return this.filters.push(e), !0 === t && (this.currentPage = 1, this.draw()), this.filters.length - 1
        },
        removeFilter: function (e, t) {
            return d.arrayDeleteByKey(this.filters, e), !0 === t && (this.currentPage = 1, this.draw()), this
        },
        removeFilters: function (e) {
            this.filters = [], !0 === e && (this.currentPage = 1, this.draw())
        },
        getFilters: function () {
            return this.filters
        },
        getFilterIndex: function () {
            return this.filterIndex
        },
        getFiltersIndexes: function () {
            return this.filtersIndexes
        },
        changeAttribute: function (e) {
            var t, n, i, s = this,
                a = this.element,
                o = this.options;
            switch (e) {
                case "data-sort-dir":
                    i = a.attr("data-sort-dir"), d.isValue(i) && (o.sortDir = i, s.sorting(o.sortClass, o.sortDir, !0));
                    break;
                case "data-sort-source":
                    n = a.attr("data-sort-source"), d.isValue(n) && (o.sortClass = n, s.sorting(o.sortClass, o.sortDir, !0));
                    break;
                case "data-filter-string":
                    t = a.attr("data-filter-string"), d.isValue(t) && (o.filterString = t, s.filter(o.filterString))
            }
        },
        destroy: function () {
            var e, t = this.element,
                n = t.parent();
            return n.find(".list-search-block input").off(r.events.inputchange), d.isValue(this.wrapperSearch) && 0 < (e = this.wrapperSearch.find("input")).length && e.off(r.events.inputchange), n.off(r.events.click, ".pagination .page-link"), d.isValue(this.wrapperPagination) && this.wrapperPagination.off(r.events.click, ".pagination .page-link"), t
        }
    })
}(Metro, m4q),
function (a, o) {
    "use strict";
    var r = a.utils,
        n = {
            listviewDeferred: 0,
            selectable: !1,
            checkStyle: 1,
            duration: 100,
            view: a.listView.LIST,
            selectCurrent: !0,
            structure: {},
            onNodeInsert: a.noop,
            onNodeDelete: a.noop,
            onNodeClean: a.noop,
            onCollapseNode: a.noop,
            onExpandNode: a.noop,
            onGroupNodeClick: a.noop,
            onNodeClick: a.noop,
            onNodeDblclick: a.noop,
            onListViewCreate: a.noop
        };
    a.listViewSetup = function (e) {
        n = o.extend({}, n, e)
    }, window.metroListViewSetup, a.listViewSetup(window.metroListViewSetup), a.Component("listview", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element;
            this._createView(), this._createEvents(), this._fireEvent("listview-create", {
                element: e
            })
        },
        _createIcon: function (e) {
            var t = r.isTag(e) ? o(e) : o("<img>").attr("src", e),
                e = o("<span>").addClass("icon");
            return e.html(t.outerHTML()), e
        },
        _createCaption: function (e) {
            return o("<div>").addClass("caption").html(e)
        },
        _createContent: function (e) {
            return o("<div>").addClass("content").html(e)
        },
        _createToggle: function () {
            return o("<span>").addClass("node-toggle")
        },
        _createNode: function (n) {
            var e, t = this.options,
                i = o("<li>");
            return void 0 === n.caption && void 0 === n.content || (e = o("<div>").addClass("data"), i.prepend(e), void 0 !== n.caption && e.append(this._createCaption(n.caption)), void 0 !== n.content && e.append(this._createContent(n.content))), void 0 !== n.icon && i.prepend(this._createIcon(n.icon)), 0 < r.objectLength(t.structure) && o.each(t.structure, function (e, t) {
                void 0 !== n[e] && o("<div>").addClass("node-data item-data-" + e).addClass(n[t]).html(n[e]).appendTo(i)
            }), i
        },
        _createView: function () {
            var n = this,
                e = this.element,
                i = this.options,
                t = e.find("li"),
                s = r.objectLength(i.structure);
            e.addClass("listview"), e.find("ul").addClass("listview"), o.each(t, function () {
                var e, t = o(this);
                void 0 === t.data("caption") && void 0 === t.data("content") || (e = o("<div>").addClass("data"), t.prepend(e), void 0 !== t.data("caption") && e.append(n._createCaption(t.data("caption"))), void 0 !== t.data("content") && e.append(n._createContent(t.data("content")))), void 0 !== t.data("icon") && t.prepend(n._createIcon(t.data("icon"))), 0 < t.children("ul").length ? (t.addClass("node-group"), t.append(n._createToggle()), !0 !== t.data("collapsed") && t.addClass("expanded")) : t.addClass("node"), t.hasClass("node") && ((e = o("<input type='checkbox' data-role='checkbox' data-style='" + i.checkStyle + "'>")).data("node", t), t.prepend(e)), 0 < s && o.each(i.structure, function (e) {
                    void 0 !== t.data(e) && o("<div>").addClass("node-data item-data-" + e).addClass(t.data(e)).html(t.data(e)).appendTo(t)
                })
            }), this.toggleSelectable(), this.view(i.view)
        },
        _createEvents: function () {
            var t = this,
                n = this.element,
                i = this.options;
            n.on(a.events.dblclick, ".node", function () {
                var e = o(this);
                t._fireEvent("node-dblclick", {
                    node: e
                })
            }), n.on(a.events.click, ".node", function () {
                var e = o(this);
                n.find(".node").removeClass("current"), e.toggleClass("current"), !0 === i.selectCurrent && (n.find(".node").removeClass("current-select"), e.toggleClass("current-select")), t._fireEvent("node-click", {
                    node: e
                })
            }), n.on(a.events.click, ".node-toggle", function () {
                var e = o(this).closest("li");
                t.toggleNode(e)
            }), n.on(a.events.click, ".node-group > .data > .caption", function () {
                var e = o(this).closest("li");
                n.find(".node-group").removeClass("current-group"), e.addClass("current-group"), t._fireEvent("group-node-click", {
                    node: e
                })
            }), n.on(a.events.dblclick, ".node-group > .data > .caption", function () {
                var e = o(this).closest("li");
                t.toggleNode(e), t._fireEvent("node-dbl-click", {
                    node: e
                })
            })
        },
        view: function (e) {
            var n = this.element,
                t = this.options;
            if (void 0 === e) return t.view;
            t.view = e, o.each(a.listView, function (e, t) {
                n.removeClass("view-" + t), n.find("ul").removeClass("view-" + t)
            }), n.addClass("view-" + t.view), n.find("ul").addClass("view-" + t.view)
        },
        toggleNode: function (e) {
            var t, n = this.options;
            (e = o(e)).hasClass("node-group") && (e.toggleClass("expanded"), t = !0 !== e.hasClass("expanded") ? "slideUp" : "slideDown", this._fireEvent("collapse-node", {
                node: e
            }), e.children("ul")[t](n.duration))
        },
        toggleSelectable: function () {
            var e = this.element,
                t = !0 === this.options.selectable ? "addClass" : "removeClass";
            e[t]("selectable"), e.find("ul")[t]("selectable")
        },
        add: function (e, t) {
            var n, i = this.element,
                s = this.options;
            if (null === e) n = i;
            else {
                if (!(e = o(e)).hasClass("node-group")) return;
                0 === (n = e.children("ul")).length && (n = o("<ul>").addClass("listview").addClass("view-" + s.view).appendTo(e), this._createToggle().appendTo(e), e.addClass("expanded"))
            }(s = this._createNode(t)).addClass("node").appendTo(n);
            t = o("<input type='checkbox'>");
            return t.data("node", s), s.prepend(t), a.makePlugin(t, "checkbox", {}), this._fireEvent("node-insert", {
                newNode: s,
                parentNode: e,
                list: n
            }), s
        },
        addGroup: function (e) {
            var t = this.element,
                n = this.options;
            return delete e.icon, (e = this._createNode(e)).addClass("node-group").appendTo(t), e.append(this._createToggle()), e.addClass("expanded"), e.append(o("<ul>").addClass("listview").addClass("view-" + n.view)), this._fireEvent("node-insert", {
                newNode: e,
                parentNode: null,
                list: t
            }), e
        },
        insertBefore: function (e, t) {
            var n;
            if ((e = o(e)).length) return (n = this._createNode(t)).addClass("node").insertBefore(e), t = n.closest(".node"), e = n.closest("ul"), this._fireEvent("node-insert", {
                newNode: n,
                parentNode: t,
                list: e
            }), n
        },
        insertAfter: function (e, t) {
            var n;
            if ((e = o(e)).length) return (n = this._createNode(t)).addClass("node").insertAfter(e), t = n.closest(".node"), e = n.closest("ul"), this._fireEvent("node-insert", {
                newNode: n,
                parentNode: t,
                list: e
            }), n
        },
        del: function (e) {
            var t, n, i = this.element;
            (e = o(e)).length && (n = (t = e.closest("ul")).closest("li"), e.remove(), 0 !== t.children().length || t.is(i) || (t.remove(), n.removeClass("expanded"), n.children(".node-toggle").remove()), this._fireEvent("node-delete", {
                node: e
            }))
        },
        clean: function (e) {
            (e = o(e)).length && (e.children("ul").remove(), e.removeClass("expanded"), e.children(".node-toggle").remove(), this._fireEvent("node-clean", {
                node: e
            }))
        },
        getSelected: function () {
            var e = this.element,
                t = [];
            return o.each(e.find(":checked"), function () {
                var e = o(this);
                t.push(e.closest(".node")[0])
            }), t
        },
        clearSelected: function () {
            this.element.find(":checked").prop("checked", !1), this.element.trigger("change")
        },
        selectAll: function (e) {
            this.element.find(".node > .checkbox input").prop("checked", !1 !== e), this.element.trigger("change")
        },
        selectByAttribute: function (e, t, n) {
            !1 !== n && (n = !0), this.element.find("li[" + e + '="' + t + '"] > .checkbox input').prop("checked", n), this.element.trigger("change")
        },
        changeAttribute: function (e) {
            var t, n = this,
                i = this.element,
                s = this.options;
            switch (e) {
                case "data-view":
                    t = "view-" + i.attr("data-view"), n.view(t);
                    break;
                case "data-selectable":
                    s.selectable = !0 === JSON.parse(i.attr("data-selectable")), n.toggleSelectable()
            }
        },
        destroy: function () {
            var e = this.element;
            return e.off(a.events.click, ".node"), e.off(a.events.click, ".node-toggle"), e.off(a.events.click, ".node-group > .data > .caption"), e.off(a.events.dblclick, ".node-group > .data > .caption"), e
        }
    })
}(Metro, m4q),
function (d, u) {
    "use strict";
    var n = {
        items: null,
        backgroundColor: "#fff",
        color: "#000",
        borderSize: 0,
        borderColor: "transparent",
        loop: !0,
        height: "auto",
        width: "auto",
        duration: 1e4,
        direction: "left",
        ease: "linear",
        mode: "default",
        accentPause: 2e3,
        firstPause: 1e3,
        stopOnHover: !1,
        clsMarquee: "",
        clsMarqueeItem: "",
        onMarqueeItem: d.noop,
        onMarqueeItemComplete: d.noop,
        onMarqueeComplete: d.noop,
        onMarqueeCreate: d.noop
    };
    d.marqueeSetup = function (e) {
        n = u.extend({}, n, e)
    }, window.metroMarqueeSetup, d.marqueeSetup(window.metroMarqueeSetup), d.Component("marquee", {
        init: function (e, t) {
            return this._super(t, e, n, {
                items: [],
                running: !1,
                current: -1
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("marquee-create")
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.addClass("marquee").addClass(t.clsMarquee), e.css({
                height: t.height,
                width: t.width,
                backgroundColor: (d.colors.isColor(t.backgroundColor) ? t : n).backgroundColor,
                color: (d.colors.isColor(t.color) ? t : n).color,
                borderStyle: "solid",
                borderWidth: t.borderSize,
                borderColor: (d.colors.isColor(t.borderColor) ? t : n).borderColor
            }), this.setItems(t.items), this.items.length && (this.current = 0), this.items.length && this.start()
        },
        setItems: function (e, t) {
            var n, i = this.element,
                s = this.options,
                a = s.direction.toLowerCase();
            return (e = d.utils.isObject(e)) && t && i.clear(), !1 !== e && u.each(e, function () {
                var e = u(this);
                e.length ? e.appendTo(i) : i.append(u("<div>").html(this))
            }), this.items = i.children("*").addClass("marquee__item").addClass(s.clsMarqueeItem).items(), "left" === a || "right" === a ? u(this.items).addClass("moveLeftRight") : u(this.items).addClass("moveUpDown"), "auto" === s.height && (n = 0, u(this.items).each(function () {
                +u(this).outerHeight(!0) > n && (n = +u(this).outerHeight(!0))
            }), i.height(n)), this
        },
        setItem: function (e, t) {
            var n, i = u(this.items[e]),
                s = this.options,
                e = this.element;
            if (i.length) return i.html(t), "auto" === s.height && (n = 0, u(this.items).each(function () {
                +u(this).outerHeight(!0) > n && (n = +u(this).outerHeight(!0))
            }), e.height(n)), this
        },
        addItem: function (e, t) {
            var n, i = this.element,
                s = u(e),
                e = s.length ? s : u("<div>").html(e);
            return !d.utils.isNull(t) && (n = this.items[t]) ? e.insertBefore(n) : i.append(e), this
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options;
            t.on(d.events.enter, function () {
                n.stopOnHover && u.pauseAll(e.items)
            }), t.on(d.events.leave, function () {
                n.stopOnHover && u.resumeAll(e.items)
            })
        },
        start: function () {
            var s = this.element,
                a = this.options,
                o = [],
                r = a.direction.toLowerCase(),
                e = a.mode.toLowerCase(),
                l = a.ease.toArray(","),
                c = +a.duration;
            return "default" === e ? u.each(this.items, function (e) {
                var t = u(this);
                t.attr("data-direction") && (r = t.attr("data-direction").toLowerCase()), t.attr("data-duration") && (c = +t.attr("data-duration")), t = -1 < ["left", "right"].indexOf(r) ? {
                    left: "left" === r ? [s.width(), -u(this).width() - 20] : [-u(this).width() - 20, s.width()]
                } : {
                    top: "up" === r ? [s.height(), -u(this).height() - 20] : [-u(this).height() - 20, s.height()]
                }, o.push({
                    el: this,
                    draw: t,
                    dur: c,
                    ease: "linear",
                    defer: 0 === e ? +a.firstPause : 0
                })
            }) : u.each(this.items, function (e) {
                var t, n, i = u(this);
                c = a.duration / 2, i.attr("data-direction") && (r = i.attr("data-direction").toLowerCase()), i.attr("data-duration") && (c = +i.attr("data-duration") / 2), i.attr("data-ease") && (l = i.attr("data-ease").toArray(",")), n = -1 < ["left", "right"].indexOf(r) ? (n = s.width() / 2 - u(this).width() / 2, t = {
                    left: "left" === r ? [s.width(), n] : [-u(this).width() - 20, n]
                }, {
                    left: "left" === r ? [n, -u(this).width() - 20] : [n, s.width() + 20]
                }) : (n = s.height() / 2 - u(this).height() / 2, t = {
                    top: "up" === r ? [s.height(), n] : [-u(this).height() - 20, n]
                }, {
                    top: "up" === r ? [n, -u(this).height() - 20] : [n, s.height() + 20]
                }), o.push({
                    el: this,
                    draw: t,
                    dur: c,
                    ease: l[0] || "linear",
                    defer: 0 === e ? +a.firstPause : 0
                }), o.push({
                    el: this,
                    draw: n,
                    dur: c,
                    ease: l[1] || l[0] || "linear",
                    defer: +a.accentPause
                })
            }), this.running = !0, u.chain(o, {
                loop: a.loop,
                onChainItem: d.utils.isFunc(a.onMarqueeItem),
                onChainItemComplete: d.utils.isFunc(a.onMarqueeItemComplete),
                onChainComplete: d.utils.isFunc(a.onMarqueeComplete)
            }), this
        },
        stop: function () {
            return this.running = !1, u.stopAll(this.items), this
        },
        changeAttribute: function () {},
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (i, a) {
    "use strict";
    var s = i.utils,
        n = {
            masterDeferred: 0,
            effect: "slide",
            effectFunc: "linear",
            duration: METRO_ANIMATION_DURATION,
            controlPrev: "<span class='default-icon-left-arrow'></span>",
            controlNext: "<span class='default-icon-right-arrow'></span>",
            controlTitle: "Master, page $1 of $2",
            backgroundImage: "",
            clsMaster: "",
            clsControls: "",
            clsControlPrev: "",
            clsControlNext: "",
            clsControlTitle: "",
            clsPages: "",
            clsPage: "",
            onBeforePage: i.noop_true,
            onBeforeNext: i.noop_true,
            onBeforePrev: i.noop_true,
            onNextPage: i.noop,
            onPrevPage: i.noop,
            onMasterCreate: i.noop
        };
    i.masterSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroMasterSetup, i.masterSetup(window.metroMasterSetup), i.Component("master", {
        init: function (e, t) {
            return this._super(t, e, n, {
                pages: [],
                currentIndex: 0,
                isAnimate: !1,
                id: s.elementId("master")
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            e.addClass("master").addClass(t.clsMaster), e.css({
                backgroundImage: "url(" + t.backgroundImage + ")"
            }), this._createControls(), this._createPages(), this._createEvents(), this._fireEvent("master-create", {
                element: e
            })
        },
        _createControls: function () {
            var e, t = this.element,
                n = this.options,
                i = t.find(".page"),
                s = String(n.controlTitle).replace("$1", "1");
            s = String(s).replace("$2", i.length), a.each(["top", "bottom"], function () {
                e = a("<div>").addClass("controls controls-" + this).addClass(n.clsControls).appendTo(t), a("<span>").addClass("prev").addClass(n.clsControlPrev).html(n.controlPrev).appendTo(e), a("<span>").addClass("next").addClass(n.clsControlNext).html(n.controlNext).appendTo(e), a("<span>").addClass("title").addClass(n.clsControlTitle).html(s).appendTo(e)
            }), this._enableControl("prev", !1)
        },
        _enableControl: function (e, t) {
            e = this.element.find(".controls ." + e);
            !0 === t ? e.removeClass("disabled") : e.addClass("disabled")
        },
        _setTitle: function () {
            var e = this.element.find(".controls .title"),
                t = (t = this.options.controlTitle.replace("$1", this.currentIndex + 1)).replace("$2", String(this.pages.length));
            e.html(t)
        },
        _createPages: function () {
            var t = this,
                n = this.element,
                i = this.options,
                e = n.find(".pages"),
                s = n.find(".page");
            0 === e.length && (e = a("<div>").addClass("pages").appendTo(n)), e.addClass(i.clsPages), a.each(s, function () {
                var e = a(this);
                void 0 !== e.data("cover") ? n.css({
                    backgroundImage: "url(" + e.data("cover") + ")"
                }) : n.css({
                    backgroundImage: "url(" + i.backgroundImage + ")"
                }), e.css({
                    left: "100%"
                }), e.addClass(i.clsPage).hide(0), t.pages.push(e)
            }), s.appendTo(e), void(this.currentIndex = 0) !== this.pages[this.currentIndex] && (void 0 !== this.pages[this.currentIndex].data("cover") && n.css({
                backgroundImage: "url(" + this.pages[this.currentIndex].data("cover") + ")"
            }), this.pages[this.currentIndex].css("left", "0").show(0), setTimeout(function () {
                e.css({
                    height: t.pages[0].outerHeight(!0) + 2
                })
            }, 0))
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options;
            t.on(i.events.click, ".controls .prev", function () {
                !0 !== e.isAnimate && !0 === s.exec(n.onBeforePrev, [e.currentIndex, e.pages[e.currentIndex], t]) && !0 === s.exec(n.onBeforePage, ["prev", e.currentIndex, e.pages[e.currentIndex], t]) && e.prev()
            }), t.on(i.events.click, ".controls .next", function () {
                !0 !== e.isAnimate && !0 === s.exec(n.onBeforeNext, [e.currentIndex, e.pages[e.currentIndex], t]) && !0 === s.exec(n.onBeforePage, ["next", e.currentIndex, e.pages[e.currentIndex], t]) && e.next()
            }), a(window).on(i.events.resize, function () {
                t.find(".pages").height(e.pages[e.currentIndex].outerHeight(!0) + 2)
            }, {
                ns: this.id
            })
        },
        _slideToPage: function (e) {
            var t, n, i;
            void 0 !== this.pages[e] && this.currentIndex !== e && (i = e > this.currentIndex ? "next" : "prev", t = this.pages[this.currentIndex], n = this.pages[e], this.currentIndex = e, this._effect(t, n, i))
        },
        _slideTo: function (e) {
            var t, n = "next" === e.toLowerCase(),
                i = this.pages[this.currentIndex];
            if (n) {
                if (this.currentIndex + 1 >= this.pages.length) return;
                this.currentIndex++
            } else {
                if (this.currentIndex - 1 < 0) return;
                this.currentIndex--
            }
            t = this.pages[this.currentIndex], this._fireEvent(n ? "next-page" : "prev-page", {
                current: i,
                next: t,
                forward: n
            }), this._effect(i, t, e)
        },
        _effect: function (e, t, n) {
            var i = this,
                s = this.element,
                a = this.options,
                o = s.width(),
                r = s.find(".pages");

            function l() {
                void 0 !== t.data("cover") ? s.css({
                    backgroundImage: "url(" + t.data("cover") + ")"
                }) : s.css({
                    backgroundImage: "url(" + a.backgroundImage + ")"
                }), r.css("overflow", "initial"), i.isAnimate = !1
            }
            switch (this._setTitle(), this.currentIndex === this.pages.length - 1 ? this._enableControl("next", !1) : this._enableControl("next", !0), 0 === this.currentIndex ? this._enableControl("prev", !1) : this._enableControl("prev", !0), setTimeout(function () {
                i.isAnimate = !0, r.animate({
                    draw: {
                        height: t.outerHeight(!0) + 2
                    }
                })
            }, 0), r.css("overflow", "hidden"), a.effect) {
                case "fade":
                    e.fadeOut(a.duration), t.css({
                        top: 0,
                        left: 0,
                        opacity: 0
                    }).fadeIn(a.duration, "linear", function () {
                        l()
                    });
                    break;
                case "switch":
                    e.hide(), t.css({
                        top: 0,
                        left: 0,
                        opacity: 0
                    }).show(function () {
                        l()
                    });
                    break;
                default:
                    e.stop(!0).animate({
                        draw: {
                            left: "next" === n ? -o : o
                        },
                        dur: a.duration,
                        ease: a.effectFunc,
                        onDone: function () {
                            e.hide(0)
                        }
                    }), t.stop(!0).css({
                        left: "next" === n ? o : -o
                    }).show(0).animate({
                        draw: {
                            left: 0
                        },
                        dur: a.duration,
                        ease: a.effectFunc,
                        onDone: function () {
                            l()
                        }
                    })
            }
        },
        toPage: function (e) {
            this._slideToPage(e)
        },
        next: function () {
            this._slideTo("next")
        },
        prev: function () {
            this._slideTo("prev")
        },
        changeEffect: function () {
            this.options.effect = this.element.attr("data-effect")
        },
        changeEffectFunc: function () {
            this.options.effectFunc = this.element.attr("data-effect-func")
        },
        changeEffectDuration: function () {
            this.options.duration = this.element.attr("data-duration")
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-effect":
                    this.changeEffect();
                    break;
                case "data-effect-func":
                    this.changeEffectFunc();
                    break;
                case "data-duration":
                    this.changeEffectDuration()
            }
        },
        destroy: function () {
            var e = this.element;
            return e.off(i.events.click, ".controls .prev"), e.off(i.events.click, ".controls .next"), a(window).off(i.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (e) {
    "use strict";
    e.md5 = function (e) {
        function l(e, t) {
            return e << t | e >>> 32 - t
        }

        function c(e, t) {
            var n = 2147483648 & e,
                i = 2147483648 & t,
                s = 1073741824 & e,
                a = 1073741824 & t,
                t = (1073741823 & e) + (1073741823 & t);
            return s & a ? 2147483648 ^ t ^ n ^ i : s | a ? 1073741824 & t ? 3221225472 ^ t ^ n ^ i : 1073741824 ^ t ^ n ^ i : t ^ n ^ i
        }

        function t(e, t, n, i, s, a, o) {
            var r;
            return e = c(e, c(c((r = t) & n | ~r & i, s), o)), c(l(e, a), t)
        }

        function n(e, t, n, i, s, a, o) {
            return e = c(e, c(c(t & (i = i) | n & ~i, s), o)), c(l(e, a), t)
        }

        function i(e, t, n, i, s, a, o) {
            return e = c(e, c(c(t ^ n ^ i, s), o)), c(l(e, a), t)
        }

        function s(e, t, n, i, s, a, o) {
            return e = c(e, c(c(n ^ (t | ~i), s), o)), c(l(e, a), t)
        }

        function a(e) {
            for (var t = "", n = "", i = 0; i <= 3; i++) t += (n = "0" + (e >>> 8 * i & 255).toString(16)).substr(n.length - 2, 2);
            return t
        }
        for (var o, r, d, u, h = function (e) {
                for (var t, n = e.length, i = 16 * (1 + ((i = n + 8) - i % 64) / 64), s = Array(i - 1), a = 0, o = 0; o < n;) a = o % 4 * 8, s[t = (o - o % 4) / 4] = s[t] | e.charCodeAt(o) << a, o++;
                return a = o % 4 * 8, s[t = (o - o % 4) / 4] = s[t] | 128 << a, s[i - 2] = n << 3, s[i - 1] = n >>> 29, s
            }(e = function (e) {
                e = e.replace(/\r\n/g, "\n");
                for (var t = "", n = 0; n < e.length; n++) {
                    var i = e.charCodeAt(n);
                    i < 128 ? t += String.fromCharCode(i) : (127 < i && i < 2048 ? t += String.fromCharCode(i >> 6 | 192) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128)), t += String.fromCharCode(63 & i | 128))
                }
                return t
            }(e)), p = 1732584193, f = 4023233417, m = 2562383102, v = 271733878, g = 0; g < h.length; g += 16) p = t(o = p, r = f, d = m, u = v, h[g], 7, 3614090360), v = t(v, p, f, m, h[g + 1], 12, 3905402710), m = t(m, v, p, f, h[g + 2], 17, 606105819), f = t(f, m, v, p, h[g + 3], 22, 3250441966), p = t(p, f, m, v, h[g + 4], 7, 4118548399), v = t(v, p, f, m, h[g + 5], 12, 1200080426), m = t(m, v, p, f, h[g + 6], 17, 2821735955), f = t(f, m, v, p, h[g + 7], 22, 4249261313), p = t(p, f, m, v, h[g + 8], 7, 1770035416), v = t(v, p, f, m, h[g + 9], 12, 2336552879), m = t(m, v, p, f, h[g + 10], 17, 4294925233), f = t(f, m, v, p, h[g + 11], 22, 2304563134), p = t(p, f, m, v, h[g + 12], 7, 1804603682), v = t(v, p, f, m, h[g + 13], 12, 4254626195), m = t(m, v, p, f, h[g + 14], 17, 2792965006), p = n(p, f = t(f, m, v, p, h[g + 15], 22, 1236535329), m, v, h[g + 1], 5, 4129170786), v = n(v, p, f, m, h[g + 6], 9, 3225465664), m = n(m, v, p, f, h[g + 11], 14, 643717713), f = n(f, m, v, p, h[g], 20, 3921069994), p = n(p, f, m, v, h[g + 5], 5, 3593408605), v = n(v, p, f, m, h[g + 10], 9, 38016083), m = n(m, v, p, f, h[g + 15], 14, 3634488961), f = n(f, m, v, p, h[g + 4], 20, 3889429448), p = n(p, f, m, v, h[g + 9], 5, 568446438), v = n(v, p, f, m, h[g + 14], 9, 3275163606), m = n(m, v, p, f, h[g + 3], 14, 4107603335), f = n(f, m, v, p, h[g + 8], 20, 1163531501), p = n(p, f, m, v, h[g + 13], 5, 2850285829), v = n(v, p, f, m, h[g + 2], 9, 4243563512), m = n(m, v, p, f, h[g + 7], 14, 1735328473), p = i(p, f = n(f, m, v, p, h[g + 12], 20, 2368359562), m, v, h[g + 5], 4, 4294588738), v = i(v, p, f, m, h[g + 8], 11, 2272392833), m = i(m, v, p, f, h[g + 11], 16, 1839030562), f = i(f, m, v, p, h[g + 14], 23, 4259657740), p = i(p, f, m, v, h[g + 1], 4, 2763975236), v = i(v, p, f, m, h[g + 4], 11, 1272893353), m = i(m, v, p, f, h[g + 7], 16, 4139469664), f = i(f, m, v, p, h[g + 10], 23, 3200236656), p = i(p, f, m, v, h[g + 13], 4, 681279174), v = i(v, p, f, m, h[g], 11, 3936430074), m = i(m, v, p, f, h[g + 3], 16, 3572445317), f = i(f, m, v, p, h[g + 6], 23, 76029189), p = i(p, f, m, v, h[g + 9], 4, 3654602809), v = i(v, p, f, m, h[g + 12], 11, 3873151461), m = i(m, v, p, f, h[g + 15], 16, 530742520), p = s(p, f = i(f, m, v, p, h[g + 2], 23, 3299628645), m, v, h[g], 6, 4096336452), v = s(v, p, f, m, h[g + 7], 10, 1126891415), m = s(m, v, p, f, h[g + 14], 15, 2878612391), f = s(f, m, v, p, h[g + 5], 21, 4237533241), p = s(p, f, m, v, h[g + 12], 6, 1700485571), v = s(v, p, f, m, h[g + 3], 10, 2399980690), m = s(m, v, p, f, h[g + 10], 15, 4293915773), f = s(f, m, v, p, h[g + 1], 21, 2240044497), p = s(p, f, m, v, h[g + 8], 6, 1873313359), v = s(v, p, f, m, h[g + 15], 10, 4264355552), m = s(m, v, p, f, h[g + 6], 15, 2734768916), f = s(f, m, v, p, h[g + 13], 21, 1309151649), p = s(p, f, m, v, h[g + 4], 6, 4149444226), v = s(v, p, f, m, h[g + 11], 10, 3174756917), m = s(m, v, p, f, h[g + 2], 15, 718787259), f = s(f, m, v, p, h[g + 9], 21, 3951481745), p = c(p, o), f = c(f, r), m = c(m, d), v = c(v, u);
        return (a(p) + a(f) + a(m) + a(v)).toLowerCase()
    }, !0 === window.METRO_GLOBAL_COMMON && (window.md5 = e.md5)
}(Metro, m4q),
function (l, c) {
    "use strict";
    var d = l.utils,
        n = {
            navviewDeferred: 0,
            compact: "md",
            expand: "lg",
            toggle: null,
            activeState: !1,
            onMenuItemClick: l.noop,
            onNavviewCreate: l.noop
        };
    l.navViewSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroNavViewSetup, l.navViewSetup(window.metroNavViewSetup), l.Component("nav-view", {
        init: function (e, t) {
            return this._super(t, e, n, {
                pane: null,
                content: null,
                paneToggle: null,
                id: d.elementId("navview"),
                menuScrollDistance: 0,
                menuScrollStep: 0
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("navview-create")
        },
        _calcMenuHeight: function () {
            var e, t = this.element,
                n = 0,
                t = t.children(".navview-pane");
            0 !== t.length && 0 !== (e = t.children(".navview-menu-container")).length && (c.each(e.prevAll(), function () {
                n += c(this).outerHeight(!0)
            }), c.each(e.nextAll(), function () {
                n += c(this).outerHeight(!0)
            }), e.css({
                height: "calc(100% - " + n + "px)"
            }), this.menuScrollStep = 48, this.menuScrollDistance = d.nearest(e[0].scrollHeight - e.height(), 48))
        },
        _recalc: function () {
            var e = this,
                t = this.element;
            setTimeout(function () {
                48 === e.pane.width() ? t.addClass("js-compact") : t.removeClass("js-compact"), e._calcMenuHeight()
            }, 200)
        },
        _createStructure: function () {
            var e, t, n = this.element,
                i = this.options;
            n.addClass("navview").addClass(!1 !== i.compact ? "navview-compact-" + i.compact : "").addClass(!1 !== i.expand ? "navview-expand-" + i.expand : ""), e = n.children(".navview-pane"), t = n.children(".navview-content"), n = c(i.toggle), (i = e.children(".navview-menu")).length && (i.prevAll().reverse().wrapAll(c("<div>").addClass("navview-container")), i.wrap(c("<div>").addClass("navview-menu-container"))), this.pane = 0 < e.length ? e : null, this.content = 0 < t.length ? t : null, this.paneToggle = 0 < n.length ? n : null, this._recalc()
        },
        _createEvents: function () {
            var a = this,
                o = this.element,
                s = this.options,
                e = o.find(".navview-menu-container"),
                r = e.children(".navview-menu");
            e.on("mousewheel", function (e) {
                var t = o.find(".navview-pane").width(),
                    n = 0 < e.deltaY ? -1 : 1,
                    i = a.menuScrollStep,
                    s = a.menuScrollDistance,
                    e = parseInt(r.css("top"));
                if (48 < t) return !1; - 1 == n && Math.abs(e) <= s && r.css("top", parseInt(r.css("top")) + i * n), 1 == n && e <= -i && r.css("top", parseInt(r.css("top")) + i * n)
            }), o.on(l.events.click, ".pull-button, .holder", function () {
                a.pullClick(this)
            }), o.on(l.events.click, ".navview-menu li", function () {
                !0 === s.activeState && (o.find(".navview-menu li").removeClass("active"), c(this).toggleClass("active"))
            }), o.on(l.events.click, ".navview-menu li > a", function () {
                a._fireEvent("menu-item-click", {
                    item: this
                })
            }), null !== this.paneToggle && this.paneToggle.on(l.events.click, function () {
                a.pane.toggleClass("open")
            }), c(window).on(l.events.resize, function () {
                var e, t, n, i = o.children(".navview-menu-container");
                a.pane.hasClass("open") || (o.removeClass("expanded"), a.pane.removeClass("open"), c(this).width() <= l.media_sizes[("" + s.compact).toUpperCase()] && o.removeClass("compacted"), i.length && (n = i.children(".navview-menu"), setTimeout(function () {
                    e = n.height(), t = i.height(), a.menuScrollStep = n.children(":not(.item-separator), :not(.item-header)")[0].clientHeight, a.menuScrollDistance = t < e ? d.nearest(e - t, a.menuScrollStep) : 0
                }, 0))), a._recalc()
            }, {
                ns: this.id
            })
        },
        _togglePaneMode: function () {
            var e = this.element,
                t = this.pane.width() < 280;
            !t && !e.hasClass("expanded") || e.hasClass("compacted") ? !e.hasClass("compacted") && t || e.toggleClass("compacted") : e.toggleClass("expanded")
        },
        pullClick: function (e) {
            var t, e = c(e);
            return e && e.hasClass("holder") && (t = e.parent().find("input"), setTimeout(function () {
                t.focus()
            }, 200)), this.pane.hasClass("open") ? this.close() : this._togglePaneMode(), this._recalc(), !0
        },
        open: function () {
            this.pane.addClass("open")
        },
        close: function () {
            this.pane.removeClass("open")
        },
        toggle: function () {
            var e = this.pane;
            e.hasClass("open") ? e.removeClass("open") : e.addClass("open")
        },
        toggleMode: function () {
            this._togglePaneMode()
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element;
            return e.off(l.events.click, ".pull-button, .holder"), e.off(l.events.click, ".navview-menu li"), e.off(l.events.click, ".navview-menu li > a"), null !== this.paneToggle && this.paneToggle.off(l.events.click), c(window).off(l.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (r, l) {
    "use strict";
    var c = r.utils,
        t = {
            container: null,
            width: 220,
            timeout: METRO_TIMEOUT,
            duration: METRO_ANIMATION_DURATION,
            distance: "max",
            animation: "linear",
            onClick: r.noop,
            onClose: r.noop,
            onShow: r.noop,
            onAppend: r.noop,
            onNotifyCreate: r.noop
        };
    r.notifySetup = function (e) {
        t = l.extend({}, t, e)
    }, window.metroNotifySetup, r.notifySetup(window.metroNotifySetup);
    var d = {
        container: null,
        options: {},
        notifies: [],
        setup: function (e) {
            return this.options = l.extend({}, t, e), this
        },
        reset: function () {
            var e = {
                width: 220,
                timeout: METRO_TIMEOUT,
                duration: METRO_ANIMATION_DURATION,
                distance: "max",
                animation: "linear"
            };
            this.options = l.extend({}, t, e)
        },
        _createContainer: function () {
            var e = l("<div>").addClass("notify-container");
            return l("body").prepend(e), e
        },
        create: function (e, t, i) {
            var s, a = this,
                o = this.options,
                n = c.elementId("notify");
            if (c.isNull(i) && (i = {}), !c.isValue(e)) return !1;
            (s = l("<div>").addClass("notify").attr("id", n)).css({
                width: o.width
            }), t && (t = l("<div>").addClass("notify-title").html(t), s.prepend(t)), l("<div>").addClass("notify-message").html(e).appendTo(s), void 0 !== i && (void 0 !== i.cls && s.addClass(i.cls), void 0 !== i.width && s.css({
                width: i.width
            })), s.on(r.events.click, function () {
                c.exec((c.isValue(i.onClick) ? i : o).onClick, null, this), a.kill(l(this).closest(".notify"), (c.isValue(i.onClose) ? i : o).onClose)
            }), null === d.container && (d.container = d._createContainer()), s.appendTo(d.container), s.hide(function () {
                c.exec((c.isValue(i.onAppend) ? i : o).onAppend, null, s[0]);
                var e = (c.isValue(i.duration) ? i : o).duration,
                    t = (c.isValue(i.animation) ? i : o).animation,
                    n = (c.isValue(i.distance) ? i : o).distance;
                "max" !== n && !isNaN(n) || (n = l(window).height()), s.show().animate({
                    draw: {
                        marginTop: [n, 4],
                        opacity: [0, 1]
                    },
                    dur: e,
                    ease: t,
                    onDone: function () {
                        c.exec(o.onNotifyCreate, null, this), void 0 !== i && !0 === i.keepOpen || setTimeout(function () {
                            a.kill(s, (c.isValue(i.onClose) ? i : o).onClose)
                        }, o.timeout), c.exec((c.isValue(i.onShow) ? i : o).onShow, null, s[0])
                    }
                })
            })
        },
        kill: function (e, t) {
            var n = this,
                i = this.options;
            e.off(r.events.click), e.fadeOut(i.duration, "linear", function () {
                c.exec(c.isValue(t) ? t : n.options.onClose, null, e[0]), e.remove()
            })
        },
        killAll: function () {
            var e = this,
                t = l(".notify");
            l.each(t, function () {
                e.kill(l(this))
            })
        }
    };
    r.notify = d.setup()
}(Metro, m4q),
function (e, r) {
    "use strict";
    e.pagination = function (e) {
        var t, n, i = r.extend({}, {
                length: 0,
                rows: 0,
                current: 0,
                target: "body",
                clsPagination: "",
                prevTitle: "Prev",
                nextTitle: "Next",
                distance: 5
            }, e),
            s = parseInt(i.distance),
            a = r(i.target);
        if (a.html(""), t = r("<ul>").addClass("pagination").addClass(i.clsPagination).appendTo(a), 0 !== i.length && -1 !== i.rows) {
            i.pages = Math.ceil(i.length / i.rows);
            var o = function (e, t, n) {
                    t = r("<li>").addClass("page-item").addClass(t), e = r("<a>").addClass("page-link").html(e);
                    return e.data("page", n), e.appendTo(t), t
                },
                e = o(i.prevTitle, "service prev-page", "prev");
            if (t.append(e), t.append(o(1, 1 === i.current ? "active" : "", 1)), 0 === s || i.pages <= 7)
                for (n = 2; n < i.pages; n++) t.append(o(n, n === i.current ? "active" : "", n));
            else if (i.current < s) {
                for (n = 2; n <= s; n++) t.append(o(n, n === i.current ? "active" : "", n));
                i.pages > s && t.append(o("&#8226;&#8226;&#8226;", "no-link", null))
            } else if (i.current <= i.pages && i.current > i.pages - s + 1)
                for (i.pages > s && t.append(o("&#8226;&#8226;&#8226;", "no-link", null)), n = i.pages - s + 1; n < i.pages; n++) t.append(o(n, n === i.current ? "active" : "", n));
            else t.append(o("&#8226;&#8226;&#8226;", "no-link", null)), t.append(o(i.current - 1, "", i.current - 1)), t.append(o(i.current, "active", i.current)), t.append(o(i.current + 1, "", i.current + 1)), t.append(o("&#8226;&#8226;&#8226;", "no-link", null));
            return (1 < i.pages || i.current < i.pages) && t.append(o(i.pages, i.current === i.pages ? "active" : "", i.pages)), a = o(i.nextTitle, "service next-page", "next"), t.append(a), 1 === i.current && e.addClass("disabled"), i.current === i.pages && a.addClass("disabled"), 0 === i.length && (t.addClass("disabled"), t.children().addClass("disabled")), t
        }
    }
}(Metro, m4q),
function (o, r) {
    "use strict";
    var l = o.utils,
        n = {
            panelDeferred: 0,
            id: null,
            titleCaption: "",
            titleIcon: "",
            collapsible: !1,
            collapsed: !1,
            collapseDuration: METRO_ANIMATION_DURATION,
            width: "auto",
            height: "auto",
            draggable: !1,
            customButtons: null,
            clsCustomButton: "",
            clsPanel: "",
            clsTitle: "",
            clsTitleCaption: "",
            clsTitleIcon: "",
            clsContent: "",
            clsCollapseToggle: "",
            onCollapse: o.noop,
            onExpand: o.noop,
            onDragStart: o.noop,
            onDragStop: o.noop,
            onDragMove: o.noop,
            onPanelCreate: o.noop
        };
    o.panelSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroPanelSetup, o.panelSetup(window.metroPanelSetup), o.Component("panel", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _addCustomButtons: function (e) {
            var t, n = this.element,
                i = this.options,
                s = n.closest(".panel").find(".panel-title"),
                n = [];
            if ("string" == typeof e && -1 < e.indexOf("{")) n = JSON.parse(e);
            else if ("string" == typeof e && l.isObject(e)) n = l.isObject(e);
            else {
                if (!("object" == typeof e && 0 < l.objectLength(e))) return void console.warn("Unknown format for custom buttons", e);
                n = e
            }
            if (0 !== s.length) return 0 === (t = s.find(".custom-buttons")).length ? t = r("<div>").addClass("custom-buttons").appendTo(s) : (t.find(".btn-custom").off(o.events.click), t.html("")), r.each(n, function () {
                var n = r("<span>");
                n.addClass("button btn-custom").addClass(i.clsCustomButton).addClass(this.cls).attr("tabindex", -1).html(this.html), this.attr && "object" == typeof this.attr && r.each(this.attr, function (e, t) {
                    n.attr(Cake.dashedName(e), t)
                }), n.data("action", this.onclick), t.prepend(n)
            }), s.on(o.events.click, ".btn-custom", function (e) {
                var t;
                l.isRightMouse(e) || (e = (t = r(this)).data("action"), l.exec(e, [t], this))
            }), this;
            console.warn("No place for custom buttons")
        },
        _create: function () {
            var e, t = this.element,
                n = this.options,
                i = r("<div>").addClass("panel").addClass(n.clsPanel),
                s = n.id || l.elementId("panel"),
                a = t[0].className;
            i.attr("id", s).addClass(a), i.insertBefore(t), t.appendTo(i), t[0].className = "", t.addClass("panel-content").addClass(n.clsContent).appendTo(i), "" === n.titleCaption && "" === n.titleIcon && !0 !== n.collapsible || (e = r("<div>").addClass("panel-title").addClass(n.clsTitle), "" !== n.titleCaption && r("<span>").addClass("caption").addClass(n.clsTitleCaption).html(n.titleCaption).appendTo(e), "" !== n.titleIcon && r(n.titleIcon).addClass("icon").addClass(n.clsTitleIcon).appendTo(e), !0 === n.collapsible && (a = r("<span>").addClass("dropdown-toggle marker-center active-toggle").addClass(n.clsCollapseToggle).appendTo(e), o.makePlugin(t, "collapse", {
                toggleElement: a,
                duration: n.collapseDuration,
                onCollapse: n.onCollapse,
                onExpand: n.onExpand
            }), !0 === n.collapsed && this.collapse()), e.appendTo(i)), e && l.isValue(n.customButtons) && this._addCustomButtons(n.customButtons), !0 === n.draggable && (e = e ? e.find(".caption, .icon") : i, o.makePlugin(i, "draggable", {
                dragContext: i[0],
                dragElement: e,
                onDragStart: n.onDragStart,
                onDragStop: n.onDragStop,
                onDragMove: n.onDragMove
            })), "auto" !== n.width && 0 <= parseInt(n.width) && i.outerWidth(parseInt(n.width)), "auto" !== n.height && 0 <= parseInt(n.height) && (i.outerHeight(parseInt(n.height)), t.css({
                overflow: "auto"
            })), this.panel = i, this._fireEvent("panel-create", {
                element: t,
                panel: i
            })
        },
        customButtons: function (e) {
            return this._addCustomButtons(e)
        },
        collapse: function () {
            var e = this.element;
            !1 !== l.isMetroObject(e, "collapse") && o.getPlugin(e, "collapse").collapse()
        },
        open: function () {
            this.expand()
        },
        close: function () {
            this.collapse()
        },
        expand: function () {
            var e = this.element;
            !1 !== l.isMetroObject(e, "collapse") && o.getPlugin(e, "collapse").expand()
        },
        changeAttribute: function (e) {},
        destroy: function () {
            var e = this.element,
                t = this.options;
            return !0 === t.collapsible && o.getPlugin(e, "collapse").destroy(), !0 === t.draggable && o.getPlugin(e, "draggable").destroy(), e
        }
    })
}(Metro, m4q),
function (r, l) {
    "use strict";
    var c = r.utils,
        n = {
            popoverDeferred: 0,
            popoverText: "",
            popoverHide: 3e3,
            popoverTimeout: 10,
            popoverOffset: 10,
            popoverTrigger: r.popoverEvents.HOVER,
            popoverPosition: r.position.TOP,
            hideOnLeave: !1,
            closeButton: !0,
            clsPopover: "",
            clsPopoverContent: "",
            onPopoverShow: r.noop,
            onPopoverHide: r.noop,
            onPopoverCreate: r.noop
        };
    r.popoverSetup = function (e) {
        n = l.extend({}, n, e)
    }, window.metroPopoverSetup, r.popoverSetup(window.metroPopoverSetup), r.Component("popover", {
        init: function (e, t) {
            return this._super(t, e, n, {
                popover: null,
                popovered: !1,
                size: {
                    width: 0,
                    height: 0
                },
                id: c.elementId("popover")
            }), this
        },
        _create: function () {
            this._createEvents(), this._fireEvent("popover-create", {
                element: this.element
            })
        },
        _createEvents: function () {
            var e, t = this,
                n = this.element,
                i = this.options;
            switch (i.popoverTrigger) {
                case r.popoverEvents.CLICK:
                    e = r.events.click;
                    break;
                case r.popoverEvents.FOCUS:
                    e = r.events.focus;
                    break;
                default:
                    e = r.events.enter
            }
            n.on(e, function () {
                null === t.popover && !0 !== t.popovered && setTimeout(function () {
                    t.createPopover(), t._fireEvent("popover-show", {
                        popover: t.popover
                    }), 0 < i.popoverHide && setTimeout(function () {
                        t.removePopover()
                    }, i.popoverHide)
                }, i.popoverTimeout)
            }), !0 === i.hideOnLeave && n.on(r.events.leave, function () {
                t.removePopover()
            }), l(window).on(r.events.scroll, function () {
                null !== t.popover && t.setPosition()
            }, {
                ns: this.id
            })
        },
        setPosition: function () {
            var e = this.popover,
                t = this.size,
                n = this.options,
                i = this.element;
            n.popoverPosition === r.position.BOTTOM ? (e.addClass("bottom"), e.css({
                top: i.offset().top - l(window).scrollTop() + i.outerHeight() + n.popoverOffset,
                left: i.offset().left + i.outerWidth() / 2 - t.width / 2 - l(window).scrollLeft()
            })) : n.popoverPosition === r.position.RIGHT ? (e.addClass("right"), e.css({
                top: i.offset().top + i.outerHeight() / 2 - t.height / 2 - l(window).scrollTop(),
                left: i.offset().left + i.outerWidth() - l(window).scrollLeft() + n.popoverOffset
            })) : n.popoverPosition === r.position.LEFT ? (e.addClass("left"), e.css({
                top: i.offset().top + i.outerHeight() / 2 - t.height / 2 - l(window).scrollTop(),
                left: i.offset().left - t.width - l(window).scrollLeft() - n.popoverOffset
            })) : (e.addClass("top"), e.css({
                top: i.offset().top - l(window).scrollTop() - t.height - n.popoverOffset,
                left: i.offset().left + i.outerWidth() / 2 - t.width / 2 - l(window).scrollLeft()
            }))
        },
        createPopover: function () {
            var e, t, n = this,
                i = this.elem,
                s = this.element,
                a = this.options,
                o = c.elementId("popover");
            if (!this.popovered) {
                switch ((e = l("<div>").addClass("popover neb").addClass(a.clsPopover)).attr("id", o), l("<div>").addClass("popover-content").addClass(a.clsPopoverContent).html(a.popoverText).appendTo(e), 0 === a.popoverHide && !0 === a.closeButton && l("<button>").addClass("button square small popover-close-button bg-white").html("&times;").appendTo(e).on(r.events.click, function () {
                    n.removePopover()
                }), a.popoverPosition) {
                    case r.position.TOP:
                        t = "neb-s";
                        break;
                    case r.position.BOTTOM:
                        t = "neb-n";
                        break;
                    case r.position.RIGHT:
                        t = "neb-w";
                        break;
                    case r.position.LEFT:
                        t = "neb-e"
                }
                e.addClass(t), !0 !== a.closeButton && e.on(r.events.click, function () {
                    n.removePopover()
                }), this.popover = e, this.size = c.hiddenElementSize(e), "TD" !== i.tagName && "TH" !== i.tagName || (i = l("<div/>").css("display", "inline-block").html(s.html()), s.html(i), s = i), this.setPosition(), e.appendTo(l("body")), this.popovered = !0, this._fireEvent("popover-create", {
                    popover: e
                })
            }
        },
        removePopover: function () {
            var e = this,
                t = this.options.onPopoverHide === r.noop ? 0 : 300,
                n = this.popover;
            this.popovered && (this._fireEvent("popover-hide", {
                popover: n
            }), setTimeout(function () {
                n.hide(0, function () {
                    n.remove(), e.popover = null, e.popovered = !1
                })
            }, t))
        },
        show: function () {
            var e = this,
                t = this.options;
            !0 !== this.popovered && setTimeout(function () {
                e.createPopover(), e._fireEvent("popover-show", {
                    popover: e.popover
                }), 0 < t.popoverHide && setTimeout(function () {
                    e.removePopover()
                }, t.popoverHide)
            }, t.popoverTimeout)
        },
        hide: function () {
            this.removePopover()
        },
        changeAttribute: function (e) {
            var t = this,
                n = this.element,
                i = this.options;
            switch (e) {
                case "data-popover-text":
                    i.popoverText = n.attr("data-popover-text"), t.popover && (t.popover.find(".popover-content").html(i.popoverText), t.setPosition());
                    break;
                case "data-popover-position":
                    i.popoverPosition = n.attr("data-popover-position"), t.setPosition()
            }
        },
        destroy: function () {
            var e, t = this.element,
                n = this.options;
            switch (n.popoverTrigger) {
                case r.popoverEvents.CLICK:
                    e = r.events.click;
                    break;
                case r.popoverEvents.FOCUS:
                    e = r.events.focus;
                    break;
                default:
                    e = r.events.enter
            }
            return t.off(e), !0 === n.hideOnLeave && t.off(r.events.leave), l(window).off(r.events.scroll, {
                ns: this.id
            }), t
        }
    })
}(Metro, m4q),
function (e, i) {
    "use strict";
    var n = {
        progressDeferred: 0,
        showValue: !1,
        valuePosition: "free",
        showLabel: !1,
        labelPosition: "before",
        labelTemplate: "",
        value: 0,
        buffer: 0,
        type: "bar",
        small: !1,
        clsBack: "",
        clsBar: "",
        clsBuffer: "",
        clsValue: "",
        clsLabel: "",
        onValueChange: e.noop,
        onBufferChange: e.noop,
        onComplete: e.noop,
        onBuffered: e.noop,
        onProgressCreate: e.noop
    };
    e.progressSetup = function (e) {
        n = i.extend({}, n, e)
    }, window.metroProgressSetup, e.progressSetup(window.metroProgressSetup), e.Component("progress", {
        init: function (e, t) {
            return this._super(t, e, n, {
                value: 0,
                buffer: 0
            }), this
        },
        _create: function () {
            var e, t = this.element,
                n = this.options;
            switch ("string" == typeof n.type && (n.type = n.type.toLowerCase()), t.html("").addClass("progress"), n.type) {
                case "buffer":
                    i("<div>").addClass("bar").appendTo(t), i("<div>").addClass("buffer").appendTo(t);
                    break;
                case "load":
                    t.addClass("with-load"), i("<div>").addClass("bar").appendTo(t), i("<div>").addClass("buffer").appendTo(t), i("<div>").addClass("load").appendTo(t);
                    break;
                case "line":
                    t.addClass("line");
                    break;
                default:
                    i("<div>").addClass("bar").appendTo(t)
            }
            "line" !== n.type && (e = i("<span>").addClass("value").addClass(n.clsValue).appendTo(t), "center" === n.valuePosition && e.addClass("centered"), !1 === n.showValue && e.hide()), !0 === n.small && t.addClass("small"), t.addClass(n.clsBack), t.find(".bar").addClass(n.clsBar), t.find(".buffer").addClass(n.clsBuffer), !0 === n.showLabel && (e = i("<span>").addClass("progress-label").addClass(n.clsLabel).html("" === n.labelTemplate ? n.value + "%" : n.labelTemplate.replace("%VAL%", n.value)), "before" === n.labelPosition ? e.insertBefore(t) : e.insertAfter(t)), this.val(n.value), this.buff(n.buffer), this._fireEvent("progress-create", {
                element: t
            })
        },
        val: function (e) {
            var t = this.element,
                n = this.options,
                i = t.find(".value");
            if (void 0 === e) return this.value;
            var s = t.find(".bar");
            if (0 === s.length) return !1;
            this.value = parseInt(e, 10), s.css("width", this.value + "%"), i.html(this.value + "%");
            s = t.width() - s.width(), e = i.width() > s ? {
                left: "auto",
                right: s + "px"
            } : {
                left: e + "%"
            };
            "free" === n.valuePosition && i.css(e), !0 !== n.showLabel || (t = t["before" === n.labelPosition ? "prev" : "next"](".progress-label")).length && t.html("" === n.labelTemplate ? n.value + "%" : n.labelTemplate.replace("%VAL%", n.value)), this._fireEvent("value-change", {
                val: this.value
            }), 100 === this.value && this._fireEvent("complete", {
                val: this.value
            })
        },
        buff: function (e) {
            var t = this.element;
            if (void 0 === e) return this.buffer;
            t = t.find(".buffer");
            if (0 === t.length) return !1;
            this.buffer = parseInt(e, 10), t.css("width", this.buffer + "%"), this._fireEvent("buffer-change", {
                val: this.buffer
            }), 100 === this.buffer && this._fireEvent("buffered", {
                val: this.buffer
            })
        },
        changeValue: function () {
            this.val(this.element.attr("data-value"))
        },
        changeBuffer: function () {
            this.buff(this.element.attr("data-buffer"))
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-value":
                    this.changeValue();
                    break;
                case "data-buffer":
                    this.changeBuffer()
            }
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (e, a) {
    "use strict";
    var o = e.utils,
        n = {
            radioDeferred: 0,
            transition: !0,
            style: 1,
            caption: "",
            captionPosition: "right",
            clsRadio: "",
            clsCheck: "",
            clsCaption: "",
            onRadioCreate: e.noop
        };
    e.radioSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroRadioSetup, e.radioSetup(window.metroRadioSetup), e.Component("radio", {
        init: function (e, t) {
            return this._super(t, e, n, {
                origin: {
                    className: ""
                }
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("radio-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = a("<label>").addClass("radio " + e[0].className).addClass(2 === t.style ? "style2" : ""),
                i = a("<span>").addClass("check"),
                s = a("<span>").addClass("caption").html(t.caption);
            e.attr("type", "radio"), n.insertBefore(e), e.appendTo(n), i.appendTo(n), s.appendTo(n), !0 === t.transition && n.addClass("transition-on"), "left" === t.captionPosition && n.addClass("caption-left"), this.origin.className = e[0].className, e[0].className = "", n.addClass(t.clsRadio), s.addClass(t.clsCaption), i.addClass(t.clsCheck), e.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var e = this.element,
                t = e.siblings(".check");
            e.on("focus", function () {
                t.addClass("focused")
            }), e.on("blur", function () {
                t.removeClass("focused")
            })
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            var t, n = this.element,
                i = this.options,
                s = n.parent();
            switch (e) {
                case "disabled":
                    this.toggleState();
                    break;
                case "data-style":
                    t = parseInt(n.attr("data-style")), o.isInt(t) && (i.style = t, s.removeClass("style1 style2").addClass("style" + t))
            }
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (d, u) {
    "use strict";
    var h = d.utils,
        n = {
            ratingDeferred: 0,
            label: "",
            static: !1,
            title: null,
            value: 0,
            values: null,
            message: "",
            stars: 5,
            starColor: null,
            staredColor: null,
            roundFunc: "round",
            half: !0,
            clsRating: "",
            clsTitle: "",
            clsStars: "",
            clsResult: "",
            clsLabel: "",
            onStarClick: d.noop,
            onRatingCreate: d.noop
        };
    d.ratingSetup = function (e) {
        n = u.extend({}, n, e)
    }, window.metroRatingSetup, d.ratingSetup(window.metroRatingSetup), d.Component("rating", {
        init: function (e, t) {
            return this._super(t, e, n, {
                value: 0,
                originValue: 0,
                values: [],
                rate: 0,
                rating: null
            }), this
        },
        _create: function () {
            var e, t = this.element,
                n = this.options;
            if (isNaN(n.value) ? n.value = 0 : n.value = parseFloat(n.value).toFixed(1), null !== n.values) Array.isArray(n.values) ? this.values = n.values : "string" == typeof n.values && (this.values = n.values.toArray());
            else
                for (e = 1; e <= n.stars; e++) this.values.push(e);
            this.originValue = n.value, this.value = 0 < n.value ? Math[n.roundFunc](n.value) : 0, this._createRating(), this._createEvents(), this._fireEvent("rating-create", {
                element: t
            })
        },
        _createRating: function () {
            var e, t, n, i, s = this.element,
                a = this.options,
                o = h.elementId("rating"),
                r = u("<div>").addClass("rating " + String(s[0].className).replace("d-block", "d-flex")).addClass(a.clsRating),
                l = d.sheet,
                c = a.static ? Math.floor(this.originValue) : this.value;
            for (s.val(this.value), r.attr("id", o), r.insertBefore(s), s.appendTo(r), t = u("<ul>").addClass("stars").addClass(a.clsStars).appendTo(r), e = 1; e <= a.stars; e++) n = u("<li>").data("value", this.values[e - 1]).appendTo(t), e <= c && n.addClass("on");
            if (u("<span>").addClass("result").addClass(a.clsResult).appendTo(r).html(a.message), null !== a.starColor && d.colors.isColor(a.starColor) && h.addCssRule(l, "#" + o + " .stars:hover li", "color: " + a.starColor + ";"), null !== a.staredColor && d.colors.isColor(a.staredColor) && (h.addCssRule(l, "#" + o + " .stars li.on", "color: " + a.staredColor + ";"), h.addCssRule(l, "#" + o + " .stars li.half::after", "color: " + a.staredColor + ";")), null !== a.title && (o = u("<span>").addClass("title").addClass(a.clsTitle).html(a.title), r.prepend(o)), !0 === a.static && (r.addClass("static"), !0 !== a.half || 0 < (i = Math.round(this.originValue % 1 * 10)) && i <= 9 && r.find(".stars li.on").last().next("li").addClass("half half-" + 10 * i)), !(s[0].className = "") === a.copyInlineStyles)
                for (e = 0; e < s[0].style.length; e++) r.css(s[0].style[e], s.css(s[0].style[e]));
            a.label && (i = u("<label>").addClass("label-for-input").addClass(a.clsLabel).html(a.label).insertBefore(r), s.attr("id") && i.attr("for", s.attr("id")), "rtl" === s.attr("dir") && i.addClass("rtl")), s.is(":disabled") ? this.disable() : this.enable(), this.rating = r
        },
        _createEvents: function () {
            var n = this,
                i = this.element,
                s = this.options;
            this.rating.on(d.events.click, ".stars li", function () {
                var e, t;
                !0 !== s.static && (t = (e = u(this)).data("value"), e.addClass("scale"), setTimeout(function () {
                    e.removeClass("scale")
                }, 300), i.val(t).trigger("change"), e.addClass("on"), e.prevAll().addClass("on"), e.nextAll().removeClass("on"), n._fireEvent("star-click", {
                    value: t,
                    star: e[0]
                }))
            })
        },
        val: function (e) {
            var t = this,
                n = this.element,
                i = this.options,
                s = this.rating;
            if (void 0 === e) return this.value;
            this.value = 0 < e ? Math[i.roundFunc](e) : 0, n.val(this.value).trigger("change");
            s = s.find(".stars li").removeClass("on");
            return u.each(s, function () {
                var e = u(this);
                e.data("value") <= t.value && e.addClass("on")
            }), this
        },
        msg: function (e) {
            var t = this.rating;
            if (void 0 !== e) return t.find(".result").html(e), this
        },
        static: function (e) {
            var t = this.options,
                n = this.rating;
            !0 === (t.static = e) ? n.addClass("static") : n.removeClass("static")
        },
        changeAttributeValue: function (e) {
            var t = this.element,
                t = "value" === e ? t.val() : t.attr("data-value");
            this.val(t)
        },
        changeAttributeMessage: function () {
            var e = this.element.attr("data-message");
            this.msg(e)
        },
        changeAttributeStatic: function () {
            var e = this.element,
                e = !0 === JSON.parse(e.attr("data-static"));
            this.static(e)
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            switch (e) {
                case "value":
                case "data-value":
                    this.changeAttributeValue(e);
                    break;
                case "disabled":
                    this.toggleState();
                    break;
                case "data-message":
                    this.changeAttributeMessage();
                    break;
                case "data-static":
                    this.changeAttributeStatic()
            }
        },
        destroy: function () {
            var e = this.element;
            return this.rating.off(d.events.click, ".stars li"), e
        }
    })
}(Metro, m4q),
function (l, c) {
    "use strict";
    var d = l.utils,
        n = {
            resizableDeferred: 0,
            canResize: !0,
            resizeElement: ".resize-element",
            minWidth: 0,
            minHeight: 0,
            maxWidth: 0,
            maxHeight: 0,
            preserveRatio: !1,
            onResizeStart: l.noop,
            onResizeStop: l.noop,
            onResize: l.noop,
            onResizableCreate: l.noop
        };
    l.resizableSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroResizableSetup, l.resizableSetup(window.metroResizableSetup), l.Component("resizable", {
        init: function (e, t) {
            return this._super(t, e, n, {
                resizer: null,
                id: d.elementId("resizable")
            }), this
        },
        _create: function () {
            this._createStructure(), this._createEvents(), this._fireEvent("resizable-create")
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.data("canResize", !0), e.addClass("resizable-element"), d.isValue(t.resizeElement) && 0 < e.find(t.resizeElement).length ? this.resizer = e.find(t.resizeElement) : this.resizer = c("<span>").addClass("resize-element").appendTo(e), e.data("canResize", t.canResize)
        },
        _createEvents: function () {
            var a = this,
                o = this.element,
                r = this.options;
            this.resizer.on(l.events.start, function (e) {
                var t, n, i, s;
                !1 !== o.data("canResize") && (t = d.pageXY(e), n = parseInt(o.outerWidth()), i = parseInt(o.outerHeight()), s = {
                    width: n,
                    height: i
                }, o.addClass("stop-pointer"), a._fireEvent("resize-start", {
                    size: s
                }), c(document).on(l.events.move, function (e) {
                    e = d.pageXY(e), e = {
                        width: n + e.x - t.x,
                        height: i + e.y - t.y
                    };
                    return 0 < r.maxWidth && e.width > r.maxWidth || (0 < r.minWidth && e.width < r.minWidth || (0 < r.maxHeight && e.height > r.maxHeight || (0 < r.minHeight && e.height < r.minHeight || (o.css(e), void a._fireEvent("resize", {
                        size: e
                    })))))
                }, {
                    ns: a.id
                }), c(document).on(l.events.stop, function () {
                    o.removeClass("stop-pointer"), c(document).off(l.events.move, {
                        ns: a.id
                    }), c(document).off(l.events.stop, {
                        ns: a.id
                    });
                    var e = {
                        width: parseInt(o.outerWidth()),
                        height: parseInt(o.outerHeight())
                    };
                    a._fireEvent("resize-stop", {
                        size: e
                    })
                }, {
                    ns: a.id
                }), e.preventDefault(), e.stopPropagation())
            })
        },
        off: function () {
            this.element.data("canResize", !1)
        },
        on: function () {
            this.element.data("canResize", !0)
        },
        changeAttribute: function (e) {
            var t = this.element,
                n = this.options;
            "data-can-resize" === e && (n.canResize = !0 === JSON.parse(t.attr("data-can-resize")))
        },
        destroy: function () {
            return this.resizer.off(l.events.start), this.element
        }
    })
}(Metro, m4q),
function (e, t) {
    "use strict";
    var n = e.utils,
        i = {
            resizerDeferred: 0,
            onMediaPoint: e.noop,
            onMediaPointEnter: e.noop,
            onMediaPointLeave: e.noop,
            onWindowResize: e.noop,
            onElementResize: e.noop,
            onResizerCreate: e.noop
        };
    e.resizerSetup = function (e) {
        i = t.extend({}, i, e)
    }, window.metroResizerSetup, e.resizerSetup(window.metroResizerSetup), e.Component("resizer", {
        init: function (e, t) {
            return this._super(t, e, i, {
                size: {
                    width: 0,
                    height: 0
                },
                media: window.METRO_MEDIA,
                id: n.elementId("resizer")
            }), this
        },
        _create: function () {
            var e = this.element;
            this.size = {
                width: e.width(),
                height: e.height()
            }, this._createStructure(), this._createEvents(), this._fireEvent("resizer-create", {
                element: e
            })
        },
        _createStructure: function () {},
        _createEvents: function () {
            var o = this,
                r = this.element,
                l = t.window();
            l.on("resize", function () {
                var e, t = l.width(),
                    n = l.height(),
                    i = r.width(),
                    s = r.height(),
                    a = o.size;
                o._fireEvent("window-resize", {
                    width: t,
                    height: n,
                    media: window.METRO_MEDIA
                }), o.size.width === i && o.size.height === s || (o.size = {
                    width: i,
                    height: s
                }, o._fireEvent("element-resize", {
                    width: i,
                    height: s,
                    oldSize: a,
                    media: window.METRO_MEDIA
                })), o.media.length !== window.METRO_MEDIA.length && (o.media.length > window.METRO_MEDIA.length ? (e = o.media.filter(function (e) {
                    return !window.METRO_MEDIA.includes(e)
                }), o._fireEvent("media-point-leave", {
                    point: e,
                    media: window.METRO_MEDIA
                })) : (e = window.METRO_MEDIA.filter(function (e) {
                    return !o.media.includes(e)
                }), o._fireEvent("media-point-enter", {
                    point: e,
                    media: window.METRO_MEDIA
                })), o.media = window.METRO_MEDIA, o._fireEvent("media-point", {
                    point: e,
                    media: window.METRO_MEDIA
                }))
            }, {
                ns: this.id
            })
        },
        changeAttribute: function () {},
        destroy: function () {
            t(window).off("resize", {
                ns: this.id
            })
        }
    })
}(Metro, m4q),
function (o, r) {
    "use strict";
    var l = o.utils,
        n = {
            ribbonmenuDeferred: 0,
            onStatic: o.noop,
            onBeforeTab: o.noop_true,
            onTab: o.noop,
            onRibbonMenuCreate: o.noop
        };
    o.ribbonMenuSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroRibbonMenuSetup, o.ribbonMenuSetup(window.metroRibbonMenuSetup), o.Component("ribbon-menu", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("ribbon-menu-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element;
            e.addClass("ribbon-menu");
            var t = e.find(".tabs-holder li:not(.static)"),
                n = e.find(".tabs-holder li.active");
            0 < n.length ? this.open(r(n[0])) : 0 < t.length && this.open(r(t[0]));
            e = e.find(".ribbon-toggle-group");
            r.each(e, function () {
                var e = r(this);
                e.buttongroup({
                    clsActive: "active"
                });
                var t = 0,
                    n = e.find(".ribbon-icon-button");
                r.each(n, function () {
                    var e = r(this).outerWidth(!0);
                    t < e && (t = e)
                }), e.css("width", t * Math.ceil(n.length / 3) + 4)
            })
        },
        _createEvents: function () {
            var i = this,
                s = this.element,
                a = this.options;
            s.on(o.events.click, ".tabs-holder li a", function (e) {
                var t = r(this),
                    n = r(this).parent("li");
                n.hasClass("static") ? a.onStatic === o.noop && void 0 !== t.attr("href") ? document.location.href = t.attr("href") : i._fireEvent("static", {
                    tab: n[0]
                }) : !0 === l.exec(a.onBeforeTab, [n[0]], s[0]) && i.open(n[0]), e.preventDefault()
            })
        },
        open: function (e) {
            var t = this.element,
                n = r(e),
                i = t.find(".tabs-holder li"),
                s = t.find(".content-holder .section"),
                e = n.children("a").attr("href"),
                e = "#" !== e ? t.find(e) : null;
            i.removeClass("active"), n.addClass("active"), s.removeClass("active"), e && e.addClass("active"), this._fireEvent("tab", {
                tab: n[0]
            })
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element;
            return e.off(o.events.click, ".tabs-holder li a"), e
        }
    })
}(Metro, m4q),
function (c, d) {
    "use strict";
    var u = c.utils,
        n = {
            rippleDeferred: 0,
            rippleColor: "#fff",
            rippleAlpha: .4,
            rippleTarget: "default",
            onRippleCreate: c.noop
        };
    c.rippleSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroRippleSetup, c.rippleSetup(window.metroRippleSetup);

    function i(e, t, n, i) {
        var s, a, o = d(e),
            r = u.rect(o[0]),
            l = c.colors;
        0 !== o.length && (u.isValue(t) || (t = "#fff"), u.isValue(n) || (n = .4), "static" === o.css("position") && o.css("position", "relative"), o.css({
            overflow: "hidden"
        }), d(".ripple").remove(), e = Math.max(o.outerWidth(), o.outerHeight()), a = d("<span class='ripple'></span>").css({
            width: e,
            height: e
        }), o.prepend(a), r = i ? (s = i.pageX - o.offset().left - a.width() / 2, i.pageY - o.offset().top - a.height() / 2) : (s = r.width / 2 - a.width() / 2, r.height / 2 - a.height() / 2), a.css({
            background: l.toRGBA(t, n),
            width: e,
            height: e,
            top: r + "px",
            left: s + "px"
        }).addClass("rippleEffect"), setTimeout(function () {
            a.remove()
        }, 400))
    }
    c.Component("ripple", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element,
                t = this.options,
                n = "default" === t.rippleTarget ? null : t.rippleTarget;
            e.on(c.events.click, n, function (e) {
                i(this, t.rippleColor, t.rippleAlpha, e)
            }), this._fireEvent("riopple-create", {
                element: e
            })
        },
        changeAttribute: function (e) {
            var t, n, i = this.element,
                s = this.options;
            switch (e) {
                case "data-ripple-color":
                    n = i.attr("data-ripple-color"), c.colors.isColor(n) && (s.rippleColor = n);
                    break;
                case "data-ripple-alpha":
                    t = +i.attr("data-ripple-alpha"), isNaN(t) || (s.rippleColor = t)
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.options,
                t = "default" === t.rippleTarget ? null : t.rippleTarget;
            e.off(c.events.click, t)
        }
    }), c.ripple = i
}(Metro, m4q),
function (e, t) {
    "use strict";
    var n = {
        onSearcherCreate: e.noop
    };
    e.searcherSetup = function (e) {
        n = t.extend({}, n, e)
    }, window.metroSearcherSetup, e.searcherSetup(window.metroSearcherSetup), e.Component("searcher", {
        init: function (e, t) {
            return this._super(t, e, n, {}), this
        },
        _create: function () {
            this.element, this.options;
            this._createStructure(), this._createEvents(), this._fireEvent("searcher-create")
        },
        _createStructure: function () {
            this.element, this.options
        },
        _createEvents: function () {
            this.element, this.options
        },
        changeAttribute: function (e, t) {},
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (m, v) {
    "use strict";
    var g = m.utils,
        n = {
            label: "",
            size: "normal",
            selectDeferred: 0,
            clearButton: !1,
            clearButtonIcon: "<span class='default-icon-cross'></span>",
            usePlaceholder: !1,
            placeholder: "",
            addEmptyValue: !1,
            emptyValue: "",
            duration: 0,
            prepend: "",
            append: "",
            filterPlaceholder: "Search&#8226;&#8226;&#8226;",
            filter: !0,
            copyInlineStyles: !1,
            dropHeight: 200,
            dropWidth: null,
            dropFullSize: !1,
            checkDropUp: !0,
            dropUp: !1,
            showGroupName: !1,
            shortTag: !0,
            clsSelect: "",
            clsSelectInput: "",
            clsPrepend: "",
            clsAppend: "",
            clsOption: "",
            clsOptionActive: "",
            clsOptionGroup: "",
            clsDropList: "",
            clsDropContainer: "",
            clsSelectedItem: "",
            clsSelectedItemRemover: "",
            clsLabel: "",
            clsGroupName: "",
            onClear: m.noop,
            onChange: m.noop,
            onUp: m.noop,
            onDrop: m.noop,
            onItemSelect: m.noop,
            onItemDeselect: m.noop,
            onSelectCreate: m.noop
        };
    m.selectSetup = function (e) {
        n = v.extend({}, n, e)
    }, window.metroSelectSetup, m.selectSetup(window.metroSelectSetup), m.Component("select", {
        init: function (e, t) {
            return this._super(t, e, n, {
                list: null,
                placeholder: null
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createSelect(), this._createEvents(), this._fireEvent("select-create", {
                element: e
            })
        },
        _setPlaceholder: function () {
            var e = this.element,
                t = this.options,
                n = e.siblings(".select-input");
            !0 !== t.usePlaceholder || g.isValue(e.val()) && e.val() != t.emptyValue || n.html(this.placeholder)
        },
        _addTag: function (e, t) {
            var n, i = this.element,
                s = this.options,
                i = i.closest(".select"),
                t = v("<div>").addClass("tag").addClass(s.shortTag ? "short-tag" : "").addClass(s.clsSelectedItem).html("<span class='title'>" + e + "</span>").data("option", t);
            return v("<span>").addClass("remover").addClass(s.clsSelectedItemRemover).html("&times;").appendTo(t), i.hasClass("input-large") ? n = "large" : i.hasClass("input-small") && (n = "small"), t.addClass(n), t
        },
        _addOption: function (e, t, n, i, s) {
            var a = v(e),
                o = this.element,
                r = this.options,
                l = g.isValue(a.attr("data-template")) ? a.attr("data-template").replace("$1", e.text) : e.text,
                c = a.attr("data-display"),
                d = v("<li>").addClass(r.clsOption).data("option", e).attr("data-text", e.text).attr("data-value", e.value || ""),
                u = v("<a>").html(l);
            c && (d.attr("data-display", c), l = c), d.addClass(e.className), d.data("group", s), a.is(":disabled") && d.addClass("disabled"), a.is(":selected") && (r.showGroupName && s && (l += "&nbsp;<span class='selected-item__group-name " + r.clsGroupName + "'>" + s + "</span>"), i ? (d.addClass("d-none"), n.append(this._addTag(l, d))) : (o.val(e.value), n.html(l), o.fire("change", {
                val: e.value
            }), d.addClass("active"))), d.append(u).appendTo(t)
        },
        _addOptionGroup: function (e, t, n, i) {
            var s = this,
                a = this.options,
                o = v(e);
            v("<li>").html(e.label).addClass("group-title").addClass(a.clsOptionGroup).appendTo(t), v.each(o.children(), function () {
                s._addOption(this, t, n, i, e.label)
            })
        },
        _createOptions: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.parent().find("ul").empty(),
                s = 0 < t.find("option[selected]").length,
                a = t[0].multiple,
                o = t.siblings(".select-input");
            t.siblings(".select-input").empty(), !0 === n.addEmptyValue && t.prepend(v("<option " + (s ? "" : "selected") + " value='" + n.emptyValue + "' class='d-none'></option>")), v.each(t.children(), function () {
                "OPTION" === this.tagName ? e._addOption(this, i, o, a, null) : "OPTGROUP" === this.tagName && e._addOptionGroup(this, i, o, a)
            })
        },
        _createSelect: function () {
            var t, n, i, s, a = this,
                e = this.element,
                o = this.options,
                r = v("<label>").addClass("select " + e[0].className).addClass(o.clsSelect),
                l = e[0].multiple,
                c = g.elementId("select"),
                d = v("<div>").addClass("button-group"),
                u = g.elementId("select-focus-trigger"),
                h = v("<input type='checkbox'>").addClass("select-focus-trigger").attr("id", u);
            if (this.placeholder = v("<span>").addClass("placeholder").html(o.placeholder), r.attr("id", c).attr("for", u), r.addClass("input-" + o.size), (s = v("<span>").addClass("dropdown-toggle")).appendTo(r), l && r.addClass("multiple"), r.insertBefore(e), e.appendTo(r), d.appendTo(r), h.appendTo(r), h = v("<div>").addClass("select-input").addClass(o.clsSelectInput).attr("name", "__" + c + "__"), t = v("<div>").addClass("drop-container").addClass(o.clsDropContainer), !1 === o.dropFullSize ? o.dropWidth && t.css({
                    width: +o.dropWidth
                }) : r.addClass("drop-full-size"), c = v("<div>").appendTo(t), n = v("<ul>").addClass("option-list").addClass(o.clsDropList).css({
                    "max-height": o.dropHeight
                }), i = v("<input type='text' data-role='input'>").attr("placeholder", o.filterPlaceholder).appendTo(c), r.append(h), r.append(t), t.append(c), !0 !== o.filter && c.hide(), t.append(n), this._createOptions(), this._setPlaceholder(), m.makePlugin(t, "dropdown", {
                    dropFilter: ".select",
                    duration: o.duration,
                    toggleElement: [r],
                    checkDropUp: o.checkDropUp,
                    dropUp: o.dropUp,
                    onDrop: function () {
                        var e;
                        s.addClass("active-toggle"), e = v(".select .drop-container"), v.each(e, function () {
                            var e = v(this);
                            e.is(t) || (e = m.getPlugin(e, "dropdown")) && e.close && e.close()
                        }), i.val("").trigger(m.events.keyup), void 0 !== (e = 0 < n.find("li.active").length ? v(n.find("li.active")[0]) : void 0) && (n[0].scrollTop = e.position().top - (n.height() - e.height()) / 2), a._fireEvent("drop", {
                            list: n[0]
                        })
                    },
                    onUp: function () {
                        s.removeClass("active-toggle"), a._fireEvent("up", {
                            list: n[0]
                        })
                    }
                }), this.list = n, !0 !== o.clearButton || e[0].readOnly ? d.addClass("d-none") : v("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon).appendTo(d), "" === o.prepend || l || v("<div>").html(o.prepend).addClass("prepend").addClass(o.clsPrepend).appendTo(r), "" === o.append || l || v("<div>").html(o.append).addClass("append").addClass(o.clsAppend).appendTo(r), !0 === o.copyInlineStyles)
                for (var p = 0, f = e[0].style.length; p < f; p++) r.css(e[0].style[p], e.css(e[0].style[p]));
            "rtl" === e.attr("dir") && r.addClass("rtl").attr("dir", "rtl"), o.label && (o = v("<label>").addClass("label-for-input").addClass(o.clsLabel).html(o.label).insertBefore(r), e.attr("id") && o.attr("for", e.attr("id")), "rtl" === e.attr("dir") && o.addClass("rtl")), e.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var o = this,
                r = this.element,
                l = this.options,
                e = r.closest(".select"),
                c = e.find(".drop-container"),
                d = r.siblings(".select-input"),
                t = c.find("input"),
                u = c.find("ul"),
                n = e.find(".input-clear-button"),
                i = e.find(".select-focus-trigger");
            i.on("focus", function () {
                e.addClass("focused")
            }), i.on("blur", function () {
                e.removeClass("focused")
            }), n.on(m.events.click, function (e) {
                r.val(l.emptyValue), r[0].multiple && u.find("li").removeClass("d-none"), d.clear(), o._setPlaceholder(), e.preventDefault(), e.stopPropagation(), o._fireEvent("clear"), o._fireEvent("change", {
                    selected: o.getSelected()
                })
            }), r.on(m.events.change, function () {
                o._setPlaceholder()
            }), e.on(m.events.click, function () {
                v(".focused").removeClass("focused"), e.addClass("focused")
            }), d.on(m.events.click, function () {
                v(".focused").removeClass("focused"), e.addClass("focused")
            }), u.on(m.events.click, "li", function (e) {
                if (v(this).hasClass("group-title")) return e.preventDefault(), void e.stopPropagation();
                var t = v(this),
                    n = t.attr("data-display"),
                    i = t.data("value"),
                    s = t.data("group"),
                    e = n || t.children("a").html(),
                    a = t.data("option"),
                    n = r.find("option");
                l.showGroupName && s && (e += "&nbsp;<span class='selected-item__group-name " + l.clsGroupName + "'>" + s + "</span>"), r[0].multiple ? (t.addClass("d-none"), d.append(o._addTag(e, t))) : (u.find("li.active").removeClass("active").removeClass(l.clsOptionActive), t.addClass("active").addClass(l.clsOptionActive), d.html(e), m.getPlugin(c, "dropdown").close()), v.each(n, function () {
                    this === a && (this.selected = !0)
                }), o._fireEvent("item-select", {
                    val: i,
                    option: a,
                    leaf: t[0]
                }), t = o.getSelected(), o._fireEvent("change", {
                    selected: t
                })
            }), d.on("click", ".tag .remover", function (e) {
                var t = v(this).closest(".tag"),
                    n = t.data("option"),
                    i = n.data("option");
                n.removeClass("d-none"), v.each(r.find("option"), function () {
                    this === i && (this.selected = !1)
                }), t.remove(), o._fireEvent("item-deselect", {
                    option: i
                }), t = o.getSelected(), o._fireEvent("change", {
                    selected: t
                }), e.preventDefault(), e.stopPropagation()
            }), t.on(m.events.keyup, function () {
                for (var e = this.value.toUpperCase(), t = u.find("li"), n = 0; n < t.length; n++) v(t[n]).hasClass("group-title") || (-1 < t[n].getElementsByTagName("a")[0].innerHTML.toUpperCase().indexOf(e) ? t[n].style.display = "" : t[n].style.display = "none")
            }), t.on(m.events.click, function (e) {
                e.preventDefault(), e.stopPropagation()
            }), c.on(m.events.click, function (e) {
                e.preventDefault(), e.stopPropagation()
            })
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.closest(".select").addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.closest(".select").removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        reset: function (e) {
            var t = this.element,
                n = t.find("option"),
                t = t.closest(".select");
            v.each(n, function () {
                this.selected = !g.isNull(e) && this.defaultSelected
            }), this.list.find("li").remove(), t.find(".select-input").html(""), this._createOptions(), t = this.getSelected(), this._fireEvent("change", {
                selected: t
            })
        },
        getSelected: function () {
            var e = this.element,
                t = [];
            return e.find("option").each(function () {
                this.selected && t.push(this.value)
            }), t
        },
        val: function (e) {
            var t, n, i, s, a, o = this,
                r = this.element,
                l = this.options,
                c = r.siblings(".select-input"),
                d = r.find("option"),
                u = this.list.find("li"),
                h = [],
                p = void 0 !== r.attr("multiple");
            if (g.isNull(e)) return v.each(d, function () {
                this.selected && h.push(this.value)
            }), p ? h : h[0];
            v.each(d, function () {
                this.selected = !1
            }), u.removeClass("active").removeClass(l.clsOptionActive), c.html(""), !1 === Array.isArray(e) && (e = [e]), v.each(e, function () {
                for (n = 0; n < d.length; n++)
                    if (t = d[n], i = g.isValue(t.getAttribute("data-template")) ? t.getAttribute("data-template").replace("$1", t.text) : t.text, "" + t.value == "" + this) {
                        t.selected = !0;
                        break
                    } for (n = 0; n < u.length; n++)
                    if (s = v(u[n]), a = s.data("group"), "" + s.attr("data-value") == "" + this) {
                        l.showGroupName && a && (i += "&nbsp;<span class='selected-item__group-name'>" + a + "</span>"), p ? (s.addClass("d-none"), c.append(o._addTag(i, s))) : (s.addClass("active").addClass(l.clsOptionActive), c.html(i));
                        break
                    }
            }), e = this.getSelected(), this._fireEvent("change", {
                selected: e
            })
        },
        options: function (e, t, n) {
            return this.data(e, t, n)
        },
        data: function (e, t, n) {
            var i, s = this.element,
                n = n || ",",
                a = "string" == typeof t ? t.toArray(n).map(function (e) {
                    return isNaN(e) ? e : +e
                }) : Array.isArray(t) ? t.slice().map(function (e) {
                    return isNaN(e) ? e : +e
                }) : [];
            return s.empty(), "string" == typeof e ? s.html(e) : g.isObject2(e) && v.each(e, function (e, t) {
                g.isObject2(t) ? (i = v("<optgroup label=''>").attr("label", e).appendTo(s), v.each(t, function (e, t) {
                    t = v("<option>").attr("value", e).text(t).appendTo(i); - 1 < a.indexOf(+e) && t.prop("selected", !0)
                })) : (t = v("<option>").attr("value", e).text(t).appendTo(s), -1 < a.indexOf(e) && t.prop("selected", !0))
            }), this._createOptions(), this
        },
        addOption: function (e, t, n) {
            var i = this.element,
                e = v("<option>").attr("value", e).text(t || e);
            return i.append(e), n && e.prop("selected", !0), this._createOptions(), this
        },
        addOptions: function (e) {
            var n = this;
            return e && (Array.isArray(e) ? v.each(e, function () {
                m.utils.isObject2(this) ? n.addOption(this.val, this.title, this.selected) : n.addOption(this)
            }) : m.utils.isObject2(e) && v.each(e, function (e, t) {
                n.addOption(e, t)
            })), this
        },
        removeOption: function (t) {
            return this.element.find("option").each(function () {
                var e = v(this);
                e.attr("value") == t && e.remove()
            }), this._createOptions(), this
        },
        removeOptions: function (n) {
            var e = this.element.find("option");
            return n && Array.isArray(n) && (e.each(function () {
                var e = v(this),
                    t = e.attr("value"); - 1 < n.indexOf(t) && e.remove()
            }), this._createOptions()), this
        },
        changeAttribute: function (e) {
            "disabled" === e && this.toggleState()
        },
        destroy: function () {
            var e = this.element,
                t = e.closest(".select"),
                n = t.find(".drop-container"),
                i = e.siblings(".select-input"),
                s = n.find("input"),
                a = n.find("ul"),
                o = t.find(".input-clear-button");
            return t.off(m.events.click), t.off(m.events.click, ".input-clear-button"), i.off(m.events.click), s.off(m.events.blur), s.off(m.events.focus), a.off(m.events.click, "li"), s.off(m.events.keyup), n.off(m.events.click), o.off(m.events.click), n.data("dropdown").destroy(), e
        }
    }), v(document).on(m.events.click, function () {
        v(".select").removeClass("focused")
    }, {
        ns: "blur-select-elements"
    })
}(Metro, m4q),
function (a, o) {
    "use strict";
    var r = a.utils,
        n = {
            menuScrollbar: !1,
            sidebarDeferred: 0,
            shadow: !0,
            position: "left",
            size: 290,
            shift: null,
            staticShift: null,
            toggle: null,
            duration: METRO_ANIMATION_DURATION,
            static: null,
            menuItemClick: !0,
            closeOutside: !0,
            onOpen: a.noop,
            onClose: a.noop,
            onToggle: a.noop,
            onStaticSet: a.noop,
            onStaticLoss: a.noop,
            onSidebarCreate: a.noop
        };
    a.sidebarSetup = function (e) {
        n = o.extend({}, n, e)
    }, window.metroSidebarSetup, a.sidebarSetup(window.metroSidebarSetup), a.Component("sidebar", {
        init: function (e, t) {
            return this._super(t, e, n, {
                toggle_element: null,
                id: r.elementId("sidebar")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), o(window).resize(), this._checkStatic(), this._fireEvent("sidebar-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = e.find(".sidebar-header"),
                i = a.sheet,
                s = e.find(".sidebar-menu");
            e.addClass("sidebar").addClass("on-" + t.position), !1 === t.menuScrollbar && s.addClass("hide-scroll"), 290 !== t.size && (r.addCssRule(i, ".sidebar", "width: " + t.size + "px;"), "left" === t.position ? r.addCssRule(i, ".sidebar.on-left", "left: " + -t.size + "px;") : r.addCssRule(i, ".sidebar.on-right", "right: " + -t.size + "px;")), !0 === t.shadow && e.addClass("sidebar-shadow"), null !== t.toggle && 0 < o(t.toggle).length && (this.toggle_element = o(t.toggle)), 0 < n.length && void 0 !== n.data("image") && n.css({
                backgroundImage: "url(" + n.data("image") + ")"
            }), null !== t.static && null !== t.staticShift && ("left" === t.position ? r.addCssRule(i, "@media screen and " + a.media_queries[t.static.toUpperCase()], t.staticShift + "{margin-left: " + t.size + "px; width: calc(100% - " + t.size + "px);}") : r.addCssRule(i, "@media screen and " + a.media_queries[t.static.toUpperCase()], t.staticShift + "{margin-right: " + t.size + "px; width: calc(100% - " + t.size + "px);}"))
        },
        _createEvents: function () {
            var t = this,
                e = this.element,
                n = this.options,
                i = this.toggle_element;
            null !== i ? i.on(a.events.click, function (e) {
                t.toggle(), e.stopPropagation()
            }) : n.toggle && o.document().on("click", n.toggle, function (e) {
                t.toggle(), e.stopPropagation()
            }), null !== n.static && -1 < ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(n.static) && o(window).on(a.events.resize, function () {
                t._checkStatic()
            }, {
                ns: this.id
            }), !0 === n.menuItemClick && e.on(a.events.click, ".sidebar-menu li > a", function (e) {
                t.close(), e.stopPropagation()
            }), e.on(a.events.click, ".sidebar-menu .js-sidebar-close", function (e) {
                t.close(), e.stopPropagation()
            }), e.on(a.events.click, function (e) {
                e.stopPropagation()
            }), o(document).on(a.events.click, function () {
                !0 === n.closeOutside && t.isOpen() && t.close()
            })
        },
        _checkStatic: function () {
            var e = this.element,
                t = this.options;
            r.mediaExist(t.static) && !e.hasClass("static") && (e.addClass("static"), e.data("opened", !1).removeClass("open"), null !== t.shift && o.each(t.shift.split(","), function () {
                o(this).animate({
                    draw: {
                        left: 0
                    },
                    dur: t.duration
                })
            }), this._fireEvent("static-set")), r.mediaExist(t.static) || (e.removeClass("static"), this._fireEvent("static-loss"))
        },
        isOpen: function () {
            return !0 === this.element.data("opened")
        },
        open: function () {
            var e = this.element,
                t = this.options;
            e.hasClass("static") || (e.data("opened", !0).addClass("open"), null !== t.shift && o(t.shift).animate({
                draw: {
                    left: e.outerWidth()
                },
                dur: t.duration
            }), this._fireEvent("open"))
        },
        close: function () {
            var e = this.element,
                t = this.options;
            e.hasClass("static") || (e.data("opened", !1).removeClass("open"), null !== t.shift && o(t.shift).animate({
                draw: {
                    left: 0
                },
                dur: t.duration
            }), this._fireEvent("close"))
        },
        toggle: function () {
            this.isOpen() ? this.close() : this.open(), this._fireEvent("toggle")
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element,
                t = this.options,
                n = this.toggle_element;
            return null !== n && n.off(a.events.click), null !== t.static && -1 < ["fs", "sm", "md", "lg", "xl", "xxl"].indexOf(t.static) && o(window).off(a.events.resize, {
                ns: this.id
            }), !0 === t.menuItemClick && e.off(a.events.click, ".sidebar-menu li > a"), e.off(a.events.click, ".sidebar-menu .js-sidebar-close"), e
        }
    }), a.sidebar = {
        isSidebar: function (e) {
            return r.isMetroObject(e, "sidebar")
        },
        open: function (e) {
            this.isSidebar(e) && a.getPlugin(e, "sidebar").open()
        },
        close: function (e) {
            this.isSidebar(e) && a.getPlugin(e, "sidebar").close()
        },
        toggle: function (e) {
            this.isSidebar(e) && a.getPlugin(e, "sidebar").toggle()
        },
        isOpen: function (e) {
            if (this.isSidebar(e)) return a.getPlugin(e, "sidebar").isOpen()
        }
    }
}(Metro, m4q),
function (u, h) {
    "use strict";
    var o = u.utils,
        n = {
            sliderDeferred: 0,
            roundValue: !0,
            min: 0,
            max: 100,
            accuracy: 0,
            showMinMax: !1,
            minMaxPosition: u.position.TOP,
            value: 0,
            buffer: 0,
            hint: !1,
            hintAlways: !1,
            hintPosition: u.position.TOP,
            hintMask: "$1",
            vertical: !1,
            target: null,
            returnType: "value",
            size: 0,
            clsSlider: "",
            clsBackside: "",
            clsComplete: "",
            clsBuffer: "",
            clsMarker: "",
            clsHint: "",
            clsMinMax: "",
            clsMin: "",
            clsMax: "",
            onStart: u.noop,
            onStop: u.noop,
            onMove: u.noop,
            onSliderClick: u.noop,
            onChange: u.noop,
            onChangeValue: u.noop,
            onChangeBuffer: u.noop,
            onFocus: u.noop,
            onBlur: u.noop,
            onSliderCreate: u.noop
        };
    u.sliderSetup = function (e) {
        n = h.extend({}, n, e)
    }, window.metroSliderSetup, u.sliderSetup(window.metroSliderSetup), u.Component("slider", {
        init: function (e, t) {
            return this._super(t, e, n, {
                slider: null,
                value: 0,
                percent: 0,
                pixel: 0,
                buffer: 0,
                keyInterval: !1,
                id: o.elementId("slider")
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this._createSlider(), this._createEvents(), this.buff(t.buffer), this.val(t.value), this._fireEvent("slider-create", {
                element: e
            })
        },
        _createSlider: function () {
            var e, t = this.element,
                n = this.options,
                i = t.prev(),
                s = t.parent(),
                a = h("<div>").addClass("slider " + t[0].className).addClass(n.clsSlider),
                o = h("<div>").addClass("backside").addClass(n.clsBackside),
                r = h("<div>").addClass("complete").addClass(n.clsComplete),
                l = h("<div>").addClass("buffer").addClass(n.clsBuffer),
                c = h("<button>").attr("type", "button").addClass("marker").addClass(n.clsMarker),
                d = h("<div>").addClass("hint").addClass(n.hintPosition + "-side").addClass(n.clsHint);
            if (0 < n.size && (!0 === n.vertical ? a.outerHeight(n.size) : a.outerWidth(n.size)), !0 === n.vertical && a.addClass("vertical-slider"), 0 === i.length ? s.prepend(a) : a.insertAfter(i), !0 === n.hintAlways && d.css({
                    display: "block"
                }).addClass("permanent-hint"), t.appendTo(a), o.appendTo(a), r.appendTo(a), l.appendTo(a), c.appendTo(a), d.appendTo(c), !0 === n.showMinMax && (c = h("<div>").addClass("slider-min-max").addClass(n.clsMinMax), h("<span>").addClass("slider-text-min").addClass(n.clsMin).html(n.min).appendTo(c), h("<span>").addClass("slider-text-max").addClass(n.clsMax).html(n.max).appendTo(c), n.minMaxPosition === u.position.TOP ? c.insertBefore(a) : c.insertAfter(a)), !(t[0].className = "") === n.copyInlineStyles)
                for (e = 0; e < t[0].style.length; e++) a.css(t[0].style[e], t.css(t[0].style[e]));
            t.is(":disabled") ? this.disable() : this.enable(), this.slider = a
        },
        _createEvents: function () {
            var i = this,
                e = this.slider,
                s = this.options,
                t = e.find(".marker"),
                n = e.find(".hint");
            t.on(u.events.startAll, function () {
                !0 === s.hint && !0 !== s.hintAlways && n.fadeIn(300), h(document).on(u.events.moveAll, function (e) {
                    e.cancelable && e.preventDefault(), i._move(e), i._fireEvent("move", {
                        val: i.value,
                        percent: i.percent
                    })
                }, {
                    ns: i.id,
                    passive: !1
                }), h(document).on(u.events.stopAll, function () {
                    h(document).off(u.events.moveAll, {
                        ns: i.id
                    }), h(document).off(u.events.stopAll, {
                        ns: i.id
                    }), !0 !== s.hintAlways && n.fadeOut(300), i._fireEvent("stop", {
                        val: i.value,
                        percent: i.percent
                    })
                }, {
                    ns: i.id
                }), i._fireEvent("start", {
                    val: i.value,
                    percent: i.percent
                })
            }), t.on(u.events.focus, function () {
                i._fireEvent("focus", {
                    val: i.value,
                    percent: i.percent
                })
            }), t.on(u.events.blur, function () {
                i._fireEvent("blur", {
                    val: i.value,
                    percent: i.percent
                })
            }), t.on(u.events.keydown, function (t) {
                var n, e = t.keyCode || t.which; - 1 !== [37, 38, 39, 40].indexOf(e) && (n = 0 === s.accuracy ? 1 : s.accuracy, i.keyInterval || (i.keyInterval = setInterval(function () {
                    var e = i.value;
                    37 !== t.keyCode && 40 !== t.keyCode || (e - n < s.min ? e = s.min : e -= n), 38 !== t.keyCode && 39 !== t.keyCode || (e + n > s.max ? e = s.max : e += n), i.value = i._correct(e), i.percent = i._convert(i.value, "val2prc"), i.pixel = i._convert(i.percent, "prc2pix"), i._redraw()
                }, 100), t.preventDefault()))
            }), t.on(u.events.keyup, function () {
                clearInterval(i.keyInterval), i.keyInterval = !1
            }), e.on(u.events.click, function (e) {
                i._move(e), i._fireEvent("slider-click", {
                    val: i.value,
                    percent: i.percent
                }), i._fireEvent("stop", {
                    val: i.value,
                    percent: i.percent
                })
            }), h(window).on(u.events.resize, function () {
                i.val(i.value), i.buff(i.buffer)
            }, {
                ns: i.id
            })
        },
        _convert: function (e, t) {
            var n = this.slider,
                i = this.options,
                s = (!0 === i.vertical ? n.outerHeight() : n.outerWidth()) - n.find(".marker").outerWidth();
            switch (t) {
                case "pix2prc":
                    return 100 * e / s;
                case "pix2val":
                    return this._convert(e, "pix2prc") * ((i.max - i.min) / 100) + i.min;
                case "val2prc":
                    return (e - i.min) / ((i.max - i.min) / 100);
                case "prc2pix":
                    return e / (100 / s);
                case "val2pix":
                    return this._convert(this._convert(e, "val2prc"), "prc2pix")
            }
            return 0
        },
        _correct: function (e) {
            var t = e,
                n = this.options.accuracy,
                i = this.options.min,
                s = this.options.max;
            return 0 === n || isNaN(n) ? t : ((t = Math.round(e / n) * n) < i && (t = i), s < t && (t = s), t.toFixed(o.decCount(n)))
        },
        _move: function (e) {
            var t = this.slider,
                n = this.options,
                i = t.offset(),
                s = t.find(".marker").outerWidth(),
                a = !0 === n.vertical ? t.outerHeight() : t.outerWidth(),
                t = a - s,
                i = !0 === n.vertical ? o.pageXY(e).y - i.top : o.pageXY(e).x - i.left,
                s = !0 === n.vertical ? a - i - s / 2 : i - s / 2;
            s < 0 || t < s || (this.value = this._correct(this._convert(s, "pix2val")), this.percent = this._convert(this.value, "val2prc"), this.pixel = this._convert(this.percent, "prc2pix"), this._redraw())
        },
        _hint: function () {
            var e = this.options,
                t = this.slider.find(".hint"),
                n = +this.value || 0,
                i = +this.percent || 0;
            e.roundValue && (n = (o.isValue(n) ? +n : 0).toFixed(o.decCount(e.accuracy)), i = (o.isValue(i) ? +i : 0).toFixed(o.decCount(e.accuracy))), t.text(e.hintMask.replace("$1", n).replace("$2", i))
        },
        _value: function () {
            var e = this.element,
                t = this.options,
                n = "value" === t.returnType ? this.value : this.percent,
                i = this.percent,
                s = this.buffer;
            t.roundValue && (n = (o.isValue(n) ? +n : 0).toFixed(o.decCount(t.accuracy)), i = (o.isValue(i) ? +i : 0).toFixed(o.decCount(t.accuracy)), s = (o.isValue(s) ? +s : 0).toFixed(o.decCount(t.accuracy))), "INPUT" === e[0].tagName && e.val(n), null === t.target || 0 !== (t = h(t.target)).length && h.each(t, function () {
                var e = h(this);
                "INPUT" === this.tagName ? e.val(n) : e.text(n), e.trigger("change")
            }), this._fireEvent("change-value", {
                val: n
            }), this._fireEvent("change", {
                val: n,
                percent: i,
                buffer: s
            })
        },
        _marker: function () {
            var e = this.slider,
                t = this.options,
                n = e.find(".marker"),
                i = e.find(".complete"),
                s = !0 === t.vertical ? e.outerHeight() : e.outerWidth(),
                a = parseInt(o.getStyleOne(n, "width")),
                e = o.isVisible(e);
            e && n.css({
                "margin-top": 0,
                "margin-left": 0
            }), !0 === t.vertical ? (e ? n.css("top", s - this.pixel) : (n.css("top", 100 - this.percent + "%"), n.css("margin-top", a / 2)), i.css("height", this.percent + "%")) : (e ? n.css("left", this.pixel) : (n.css("left", this.percent + "%"), n.css("margin-left", 0 === this.percent ? 0 : -1 * a / 2)), i.css("width", this.percent + "%"))
        },
        _redraw: function () {
            this._marker(), this._value(), this._hint()
        },
        _buffer: function () {
            var e = this.element,
                t = this.options,
                n = this.slider.find(".buffer");
            !0 === t.vertical ? n.css("height", this.buffer + "%") : n.css("width", this.buffer + "%"), this._fireEvent("change-buffer", {
                val: this.buffer
            }), this._fireEvent("change", {
                val: e.val(),
                percent: this.percent,
                buffer: this.buffer
            })
        },
        val: function (e) {
            var t = this.options;
            if (void 0 === e || isNaN(e)) return this.value;
            e < t.min && (e = t.min), e > t.max && (e = t.max), this.value = this._correct(e), this.percent = this._convert(this.value, "val2prc"), this.pixel = this._convert(this.percent, "prc2pix"), this._redraw()
        },
        buff: function (e) {
            var t = this.slider.find(".buffer");
            return void 0 === e || isNaN(e) ? this.buffer : 0 !== t.length && (100 < (e = parseInt(e)) && (e = 100), e < 0 && (e = 0), this.buffer = e, void this._buffer())
        },
        changeValue: function () {
            var e = this.element,
                t = this.options,
                e = e.attr("data-value");
            e < t.min && (e = t.min), e > t.max && (e = t.max), this.val(e)
        },
        changeBuffer: function () {
            var e = this.element,
                e = parseInt(e.attr("data-buffer"));
            e < 0 && (e = 0), 100 < e && (e = 100), this.buff(e)
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-value":
                    this.changeValue();
                    break;
                case "data-buffer":
                    this.changeBuffer();
                    break;
                case "disabled":
                    this.toggleState()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.slider,
                n = t.find(".marker");
            return n.off(u.events.startAll), n.off(u.events.focus), n.off(u.events.blur), n.off(u.events.keydown), n.off(u.events.keyup), t.off(u.events.click), h(window).off(u.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (n, o) {
    "use strict";
    var r = n.utils,
        i = {
            sorterDeferred: 0,
            thousandSeparator: ",",
            decimalSeparator: ",",
            sortTarget: null,
            sortSource: null,
            sortDir: "asc",
            sortStart: !0,
            saveInitial: !0,
            onSortStart: n.noop,
            onSortStop: n.noop,
            onSortItemSwitch: n.noop,
            onSorterCreate: n.noop
        };
    n.sorterSetup = function (e) {
        i = o.extend({}, i, e)
    }, window.metroSorterSetup, n.sorterSetup(window.metroSorterSetup), n.Component("sorter", {
        init: function (e, t) {
            return this._super(t, e, i, {
                initial: []
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._fireEvent("sorter-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            null === t.sortTarget && (t.sortTarget = e.children()[0].tagName), this.initial = e.find(t.sortTarget).get(), !0 === t.sortStart && this.sort(t.sortDir)
        },
        _getItemContent: function (e) {
            var t, n, i, s, a = this.options;
            if (r.isValue(a.sortSource)) {
                if (t = "", 0 < (n = e.getElementsByClassName(a.sortSource)).length)
                    for (i = 0; i < n.length; i++) t += n[i].textContent;
                s = n[0].dataset.format
            } else t = e.textContent, s = e.dataset.format;
            if (t = ("" + t).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, " ").trim(), r.isValue(s)) switch (-1 === ["number", "int", "float", "money"].indexOf(s) || "," === a.thousandSeparator && "." === a.decimalSeparator || (t = r.parseNumber(t, a.thousandSeparator, a.decimalSeparator)), s) {
                case "date":
                    t = r.isDate(t) ? new Date(t) : "";
                    break;
                case "number":
                    t = Number(t);
                    break;
                case "int":
                    t = parseInt(t);
                    break;
                case "float":
                    t = parseFloat(t);
                    break;
                case "money":
                    t = r.parseMoney(t);
                    break;
                case "card":
                    t = r.parseCard(t);
                    break;
                case "phone":
                    t = r.parsePhone(t)
            }
            return t
        },
        sort: function (e) {
            var t, s = this,
                n = this.element,
                i = this.options,
                a = r.elementId("temp");
            void 0 !== e && (i.sortDir = e), 0 !== (e = n.find(i.sortTarget).get()).length && (t = o("<div>").attr("id", a).insertBefore(o(n.find(i.sortTarget)[0])), this._fireEvent("sort-start", {
                items: e
            }), e.sort(function (e, t) {
                var n = s._getItemContent(e),
                    i = s._getItemContent(t),
                    i = i < n ? 1 : n < i ? -1 : 0;
                return 0 !== i && s._fireEvent("sort-item-switch", {
                    a: e,
                    b: t,
                    result: i
                }), i
            }), "desc" === i.sortDir && e.reverse(), n.find(i.sortTarget).remove(), o.each(e, function () {
                var e = o(this);
                e.insertAfter(t), t = e
            }), o("#" + a).remove(), this._fireEvent("sort-stop", {
                items: e
            }))
        },
        reset: function () {
            var t, e = this.element,
                n = this.options,
                i = r.elementId("sorter"),
                s = this.initial;
            0 !== s.length && (t = o("<div>").attr("id", i).insertBefore(o(e.find(n.sortTarget)[0])), e.find(n.sortTarget).remove(), o.each(s, function () {
                var e = o(this);
                e.insertAfter(t), t = e
            }), o("#" + i).remove())
        },
        changeAttribute: function (e) {
            var t, n, i = this,
                s = this.element,
                a = this.options;
            switch (e) {
                case "data-sort-dir":
                    "" !== (n = s.attr("data-sort-dir").trim()) && (a.sortDir = n, i.sort());
                    break;
                case "data-sort-content":
                    "" !== (t = s.attr("data-sort-content").trim()) && (a.sortContent = t, i.sort())
            }
        },
        destroy: function () {
            return this.element
        }
    }), n.sorter = {
        create: function (e, t) {
            return r.$()(e).sorter(t)
        },
        isSorter: function (e) {
            return r.isMetroObject(e, "sorter")
        },
        sort: function (e, t) {
            if (!this.isSorter(e)) return !1;
            void 0 === t && (t = "asc"), n.getPlugin(e, "sorter").sort(t)
        },
        reset: function (e) {
            if (!this.isSorter(e)) return !1;
            n.getPlugin(e, "sorter").reset()
        }
    }
}(Metro, m4q),
function (i, d) {
    "use strict";
    var o = i.utils,
        n = {
            spinnerDeferred: 0,
            label: "",
            step: 1,
            plusIcon: "<span class='default-icon-plus'></span>",
            minusIcon: "<span class='default-icon-minus'></span>",
            buttonsPosition: "default",
            defaultValue: 0,
            minValue: null,
            maxValue: null,
            fixed: 0,
            repeatThreshold: 1e3,
            hideCursor: !1,
            clsSpinner: "",
            clsSpinnerInput: "",
            clsSpinnerButton: "",
            clsSpinnerButtonPlus: "",
            clsSpinnerButtonMinus: "",
            clsLabel: "",
            onBeforeChange: i.noop_true,
            onChange: i.noop,
            onPlusClick: i.noop,
            onMinusClick: i.noop,
            onArrowUp: i.noop,
            onArrowDown: i.noop,
            onButtonClick: i.noop,
            onArrowClick: i.noop,
            onSpinnerCreate: i.noop
        };
    i.spinnerSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroSpinnerSetup, i.spinnerSetup(window.metroSpinnerSetup), i.Component("spinner", {
        init: function (e, t) {
            return this._super(t, e, n, {
                repeat_timer: !1
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("spinner-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = d("<div>").addClass("spinner").addClass("buttons-" + t.buttonsPosition).addClass(e[0].className).addClass(t.clsSpinner),
                i = d("<button>").attr("type", "button").addClass("button spinner-button spinner-button-plus").addClass(t.clsSpinnerButton + " " + t.clsSpinnerButtonPlus).html(t.plusIcon),
                s = d("<button>").attr("type", "button").addClass("button spinner-button spinner-button-minus").addClass(t.clsSpinnerButton + " " + t.clsSpinnerButtonMinus).html(t.minusIcon),
                a = e.val().trim();
            o.isValue(a) || e.val(0), e[0].className = "", n.insertBefore(e), e.appendTo(n).addClass(t.clsSpinnerInput), e.addClass("original-input"), i.appendTo(n), s.appendTo(n), !0 === t.hideCursor && n.addClass("hide-cursor"), t.label && (n = d("<label>").addClass("label-for-input").addClass(t.clsLabel).html(t.label).insertBefore(n), e.attr("id") && n.attr("for", e.attr("id")), "rtl" === e.attr("dir") && n.addClass("rtl")), !0 === t.disabled || e.is(":disabled") ? this.disable() : this.enable()
        },
        _createEvents: function () {
            var n, o = this,
                r = this.element,
                l = this.options,
                t = r.closest(".spinner"),
                e = t.find(".spinner-button"),
                c = function (e, t) {
                    var n = [e ? "plus-click" : "minus-click", e ? "arrow-up" : "arrow-down", "button-click", "arrow-click"],
                        i = +r.val(),
                        s = +r.val(),
                        a = +l.step;
                    e ? s += a : s -= a, o._setValue(s.toFixed(l.fixed), !0), o._fireEvents(n, {
                        curr: i,
                        val: s,
                        elementVal: r.val(),
                        button: e ? "plus" : "minus"
                    }), setTimeout(function () {
                        o.repeat_timer && c(e, 100)
                    }, t)
                };
            t.on(i.events.click, function (e) {
                d(".focused").removeClass("focused"), t.addClass("focused"), e.preventDefault(), e.stopPropagation()
            }), e.on(i.events.startAll, function (e) {
                var t = d(this).closest(".spinner-button").hasClass("spinner-button-plus");
                o.repeat_timer || (o.repeat_timer = !0, c(t, l.repeatThreshold), e.preventDefault())
            }), e.on(i.events.stopAll, function () {
                o.repeat_timer = !1
            }), r.on(i.events.keydown, function (e) {
                var t;
                e.keyCode === i.keyCode.UP_ARROW || e.keyCode === i.keyCode.DOWN_ARROW ? o.repeat_timer || (o.repeat_timer = !0, c(e.keyCode === i.keyCode.UP_ARROW, l.repeatThreshold)) : ("Backspace" === (t = e.key) || "Delete" === t || "ArrowLeft" === t || "ArrowRight" === t || (isNaN(t) || parseInt(t) < 0 && 9 < parseInt(t)) && e.preventDefault(), n = parseInt(this.value))
            }), r.on(i.events.keyup, function () {
                var e = parseInt(this.value);
                (l.minValue && e < l.minValue || l.maxValue && e > l.maxValue) && (this.value = n)
            }), t.on(i.events.keyup, function () {
                o.repeat_timer = !1
            })
        },
        _setValue: function (e, t) {
            var n = this.element,
                i = this.options;
            !0 === o.exec(i.onBeforeChange, [e], n[0]) && (o.isValue(i.maxValue) && e > Number(i.maxValue) && (e = Number(i.maxValue)), o.isValue(i.minValue) && e < Number(i.minValue) && (e = Number(i.minValue)), n.val(e), this._fireEvent("change", {
                val: e
            }, !1, !0), !0 === t && n.fire("change", {
                val: e
            }))
        },
        val: function (e) {
            var t = this.element,
                n = this.options;
            if (!o.isValue(e)) return t.val();
            this._setValue(e.toFixed(n.fixed), !0)
        },
        toDefault: function () {
            var e = this.options,
                t = o.isValue(e.defaultValue) ? Number(e.defaultValue) : 0;
            this._setValue(t.toFixed(e.fixed), !0), this._fireEvent("change", {
                val: t
            })
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            var t, n = this,
                i = this.element;
            switch (e) {
                case "disabled":
                    this.toggleState();
                    break;
                case "value":
                    t = i.attr("value").trim(), o.isValue(t) && n._setValue(Number(t), !1)
            }
        },
        destroy: function () {
            var e = this.element,
                t = e.closest(".spinner"),
                n = t.find(".spinner-button");
            return t.off(i.events.click), n.off(i.events.start), n.off(i.events.stop), e.off(i.events.keydown), t.off(i.events.keyup), e
        }
    }), d(document).on(i.events.click, function () {
        d(".spinner").removeClass("focused")
    })
}(Metro, m4q),
function (t, p) {
    "use strict";
    var f = t.utils,
        n = t.storage,
        i = {
            splitterDeferred: 0,
            splitMode: "horizontal",
            splitSizes: null,
            gutterSize: 4,
            minSizes: null,
            children: "*",
            gutterClick: "expand",
            saveState: !1,
            onResizeStart: t.noop,
            onResizeStop: t.noop,
            onResizeSplit: t.noop,
            onResizeWindow: t.noop,
            onSplitterCreate: t.noop
        };
    t.splitterSetup = function (e) {
        i = p.extend({}, i, e)
    }, window.metroSplitterSetup, t.splitterSetup(window.metroSplitterSetup), t.Component("splitter", {
        init: function (e, t) {
            return this._super(t, e, i, {
                storage: f.isValue(n) ? n : null,
                storageKey: "SPLITTER:",
                id: f.elementId("splitter")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("splitter-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t, n = this.element,
                i = this.options,
                s = n.children(i.children).addClass("split-block"),
                a = "horizontal" === i.splitMode ? "width" : "height";
            for (n.addClass("splitter"), "vertical" === i.splitMode.toLowerCase() && n.addClass("vertical"), e = 0; e < s.length - 1; e++) p("<div>").addClass("gutter").css(a, i.gutterSize).insertAfter(p(s[e]));
            if (this._setSize(), f.isValue(i.minSizes))
                if (("" + i.minSizes).includes(","))
                    for (t = i.minSizes.toArray(), e = 0; e < t.length; e++) p(s[e]).data("min-size", t[e]), s[e].style.setProperty("min-" + a, ("" + t[e]).includes("%") ? t[e] : ("" + t[e]).replace("px", "") + "px", "important");
                else p.each(s, function () {
                    this.style.setProperty("min-" + a, ("" + i.minSizes).includes("%") ? i.minSizes : ("" + i.minSizes).replace("px", "") + "px", "important")
                });
            i.saveState && null !== this.storage && this._getSize()
        },
        _setSize: function () {
            var e, t, n = this.element,
                i = this.options,
                s = n.children(".split-block"),
                a = n.children(".gutter");
            if (f.isValue(i.splitSizes))
                for (e = i.splitSizes.toArray(), t = 0; t < e.length; t++) p(s[t]).css({
                    flexBasis: "calc(" + e[t] + "% - " + a.length * i.gutterSize + "px)"
                });
            else s.css({
                flexBasis: "calc(" + 100 / s.length + "% - " + a.length * i.gutterSize + "px)"
            })
        },
        _createEvents: function () {
            var c = this,
                d = this.element,
                u = this.options,
                h = d.children(".gutter");
            h.on(t.events.startAll, function (e) {
                var n = "horizontal" === u.splitMode ? d.width() : d.height(),
                    i = p(this),
                    s = i.prev(".split-block"),
                    a = i.next(".split-block"),
                    o = 100 * ("horizontal" === u.splitMode ? s.outerWidth(!0) : s.outerHeight(!0)) / n,
                    r = 100 * ("horizontal" === u.splitMode ? a.outerWidth(!0) : a.outerHeight(!0)) / n,
                    l = f.getCursorPosition(d[0], e);
                i.addClass("active"), s.addClass("stop-pointer"), a.addClass("stop-pointer"), c._fireEvent("resize-start", {
                    pos: l,
                    gutter: i[0],
                    prevBlock: s[0],
                    nextBlock: a[0]
                }), p(window).on(t.events.moveAll, function (e) {
                    var t = f.getCursorPosition(d[0], e),
                        e = "horizontal" === u.splitMode ? 100 * t.x / n - 100 * l.x / n : 100 * t.y / n - 100 * l.y / n;
                    s.css("flex-basis", "calc(" + (o + e) + "% - " + h.length * u.gutterSize + "px)"), a.css("flex-basis", "calc(" + (r - e) + "% - " + h.length * u.gutterSize + "px)"), c._fireEvent("resize-split", {
                        pos: t,
                        gutter: i[0],
                        prevBlock: s[0],
                        nextBlock: a[0]
                    })
                }, {
                    ns: c.id
                }), p(window).on(t.events.stopAll, function (e) {
                    s.removeClass("stop-pointer"), a.removeClass("stop-pointer"), c._saveSize(), i.removeClass("active"), p(window).off(t.events.moveAll, {
                        ns: c.id
                    }), p(window).off(t.events.stopAll, {
                        ns: c.id
                    }), e = f.getCursorPosition(d[0], e), c._fireEvent("resize-stop", {
                        pos: e,
                        gutter: i[0],
                        prevBlock: s[0],
                        nextBlock: a[0]
                    })
                }, {
                    ns: c.id
                })
            }), p(window).on(t.events.resize, function () {
                var e = d.children(".gutter"),
                    t = e.prev(".split-block"),
                    e = e.next(".split-block");
                c._fireEvent("resize-window", {
                    prevBlock: t[0],
                    nextBlock: e[0]
                })
            }, {
                ns: c.id
            })
        },
        _saveSize: function () {
            var e = this.element,
                t = this.options,
                n = this.storage,
                i = [],
                s = e.attr("id") || this.id;
            !0 === t.saveState && null !== n && (p.each(e.children(".split-block"), function () {
                var e = p(this);
                i.push(e.css("flex-basis"))
            }), n && n.setItem(this.storageKey + s, i))
        },
        _getSize: function () {
            var n, e = this.element,
                t = this.options,
                i = this.storage,
                s = e.attr("id") || this.id;
            !0 === t.saveState && null !== i && (n = i.getItem(this.storageKey + s), p.each(e.children(".split-block"), function (e, t) {
                t = p(t);
                f.isValue(n) && f.isValue(n[e]) && t.css("flex-basis", n[e])
            }))
        },
        size: function (e) {
            var t = this.options;
            return f.isValue(e) && (t.splitSizes = e, this._setSize()), this
        },
        changeAttribute: function (e) {
            var t, n = this,
                i = this.element;
            "data-split-sizes" === e && (t = i.attr("data-split-sizes"), n.size(t))
        },
        destroy: function () {
            var e = this.element;
            return e.children(".gutter").off(t.events.start), e
        }
    })
}(Metro, m4q),
function (i, a) {
    "use strict";
    var n = {
        stepperDeferred: 0,
        view: i.stepperView.SQUARE,
        steps: 3,
        step: 1,
        stepClick: !1,
        clsStepper: "",
        clsStep: "",
        clsComplete: "",
        clsCurrent: "",
        onStep: i.noop,
        onStepClick: i.noop,
        onStepperCreate: i.noop
    };
    i.stepperSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroStepperSetup, i.stepperSetup(window.metroStepperSetup), i.Component("stepper", {
        init: function (e, t) {
            return this._super(t, e, n, {
                current: 0
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            t.step <= 0 && (t.step = 1), this._createStepper(), this._createEvents(), this._fireEvent("stepper-create", {
                element: e
            })
        },
        _createStepper: function () {
            var e, t = this.element,
                n = this.options;
            for (t.addClass("stepper").addClass(n.view).addClass(n.clsStepper), e = 1; e <= n.steps; e++) a("<span>").addClass("step").addClass(n.clsStep).data("step", e).html("<span>" + e + "</span>").appendTo(t);
            this.current = 1, this.toStep(n.step)
        },
        _createEvents: function () {
            var t = this,
                e = this.element,
                n = this.options;
            e.on(i.events.click, ".step", function () {
                var e = a(this).data("step");
                !0 === n.stepClick && (t.toStep(e), t._fireEvent("step-click", {
                    step: e
                }))
            })
        },
        next: function () {
            var e = this.element.find(".step");
            this.current + 1 > e.length || (this.current++, this.toStep(this.current))
        },
        prev: function () {
            this.current - 1 != 0 && (this.current--, this.toStep(this.current))
        },
        last: function () {
            var e = this.element;
            this.toStep(e.find(".step").length)
        },
        first: function () {
            this.toStep(1)
        },
        toStep: function (e) {
            var t = this.element,
                n = this.options,
                i = a(t.find(".step").get(e - 1)),
                s = this.current;
            0 !== i.length && (this.current = e, t.find(".step").removeClass("complete current").removeClass(n.clsCurrent).removeClass(n.clsComplete), i.addClass("current").addClass(n.clsCurrent), i.prevAll().addClass("complete").addClass(n.clsComplete), this._fireEvent("step", {
                step: this.current,
                prev: s
            }))
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element;
            return e.off(i.events.click, ".step"), e
        }
    })
}(Metro, m4q),
function (e) {
    "use strict";
    var a = e.utils,
        t = function (e) {
            return new t.init(e)
        };
    t.prototype = {
        setKey: function (e) {
            this.key = e
        },
        getKey: function () {
            return this.key
        },
        setItem: function (e, t) {
            this.storage.setItem(this.key + ":" + e, JSON.stringify(t))
        },
        getItem: function (e, t, n) {
            var i, s = this.storage.getItem(this.key + ":" + e);
            try {
                i = JSON.parse(s, n)
            } catch (e) {
                i = null
            }
            return a.nvl(i, t)
        },
        getItemPart: function (e, t, n, i) {
            var s, a = this.getItem(e, n, i);
            for (t = t.split("->"), s = 0; s < t.length; s++) a = a[t[s]];
            return a
        },
        delItem: function (e) {
            this.storage.removeItem(this.key + ":" + e)
        },
        size: function (e) {
            var t;
            switch (e) {
                case "m":
                case "M":
                    t = 1048576;
                    break;
                case "k":
                case "K":
                    t = 1024;
                    break;
                default:
                    t = 1
            }
            return JSON.stringify(this.storage).length / t
        }
    }, t.init = function (e) {
        return this.key = "", this.storage = e || window.localStorage, this
    }, t.init.prototype = t.prototype, e.storage = t(window.localStorage), e.session = t(window.sessionStorage)
}(Metro),
function (x, E) {
    "use strict";
    var I = x.utils,
        n = {
            streamerDeferred: 0,
            wheel: !0,
            wheelStep: 20,
            duration: METRO_ANIMATION_DURATION,
            defaultClosedIcon: "",
            defaultOpenIcon: "",
            changeUri: !0,
            encodeLink: !0,
            closed: !1,
            chromeNotice: !1,
            startFrom: null,
            slideToStart: !0,
            startSlideSleep: 1e3,
            source: null,
            data: null,
            eventClick: "select",
            selectGlobal: !0,
            streamSelect: !1,
            excludeSelectElement: null,
            excludeClickElement: null,
            excludeElement: null,
            excludeSelectClass: "",
            excludeClickClass: "",
            excludeClass: "",
            onDataLoad: x.noop,
            onDataLoaded: x.noop,
            onDataLoadError: x.noop,
            onDrawEvent: x.noop,
            onDrawGlobalEvent: x.noop,
            onDrawStream: x.noop,
            onStreamClick: x.noop,
            onStreamSelect: x.noop,
            onEventClick: x.noop,
            onEventSelect: x.noop,
            onEventsScroll: x.noop,
            onStreamerCreate: x.noop
        };
    x.streamerSetup = function (e) {
        n = E.extend({}, n, e)
    }, window.metroStreamerSetup, x.streamerSetup(window.metroStreamerSetup), x.Component("streamer", {
        init: function (e, t) {
            return this._super(t, e, n, {
                data: null,
                scroll: 0,
                scrollDir: "left",
                events: null
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            if (e.addClass("streamer"), void 0 === e.attr("id") && e.attr("id", I.elementId("streamer")), null === t.source && null === t.data) return !1;
            E("<div>").addClass("streams").appendTo(e), E("<div>").addClass("events-area").appendTo(e), null !== t.source ? (this._fireEvent("data-load", {
                source: t.source
            }), this._loadSource()) : (this.data = t.data, this.build()), !0 === t.chromeNotice && !0 === I.detectChrome() && !1 === E.touchable && E("<p>").addClass("text-small text-muted").html("*) In Chrome browser please press and hold Shift and turn the mouse wheel.").insertAfter(e)
        },
        _loadSource: function () {
            var t = this,
                n = this.options;
            fetch(n.source).then(x.fetch.status).then(x.fetch.json).then(function (e) {
                t._fireEvent("data-loaded", {
                    source: n.source,
                    data: e
                }), t.data = e, t.build()
            }).catch(function (e) {
                t._fireEvent("data-load-error", {
                    source: n.source,
                    error: e
                })
            })
        },
        build: function () {
            var e, m = this,
                v = this.element,
                g = this.options,
                t = this.data,
                n = v.find(".streams").html(""),
                i = v.find(".events-area").html(""),
                C = E("<ul>").addClass("streamer-timeline").html("").appendTo(i),
                s = E("<div>").addClass("streamer-events").appendTo(i),
                a = E("<div>").addClass("event-group").appendTo(s),
                o = I.getURIParameter(null, "StreamerIDS");
            null !== o && !0 === g.encodeLink && (o = atob(o));
            var r, b = o ? o.split("|")[0] : null,
                w = o ? o.split("|")[1].split(",") : [];
            void 0 !== t.actions && (r = E("<div>").addClass("streamer-actions").appendTo(n), E.each(t.actions, function () {
                var e = this,
                    t = E("<button>").addClass("streamer-action").addClass(e.cls).html(e.html);
                void 0 !== e.onclick && t.on(x.events.click, function () {
                    I.exec(e.onclick, [v])
                }), t.appendTo(r)
            })), C.html(""), void 0 === t.timeline && (t.timeline = {
                start: "09:00",
                stop: "18:00",
                step: 20
            });
            var l, c, d, u, h, p, f, y, S, _ = new Date,
                k = new Date,
                i = t.timeline.start ? t.timeline.start.split(":") : [9, 0],
                o = t.timeline.stop ? t.timeline.stop.split(":") : [18, 0],
                T = t.timeline.step ? 60 * parseInt(t.timeline.step) : 1200;
            for (_.setHours(i[0]), _.setMinutes(i[1]), _.setSeconds(0), k.setHours(o[0]), k.setMinutes(o[1]), k.setSeconds(0), l = _.getTime() / 1e3; l <= k.getTime() / 1e3; l += T)
                for (c = (f = new Date(1e3 * l)).getHours(), u = f.getMinutes(), d = Cake.lpad(c, 2, "0") + ":" + Cake.lpad(u, 2, "0"), y = (f = E("<li>").data("time", d).addClass("js-time-point-" + d.replace(":", "-")).html("<em>" + d + "</em>").appendTo(C)).width() / parseInt(t.timeline.step), e = E("<ul>").addClass("streamer-fake-timeline").html("").appendTo(f), h = 0; h < parseInt(t.timeline.step); h++) p = u + h, d = Cake.lpad(c, 2, "0") + ":" + Cake.lpad(p, 2, "0"), E("<li>").data("time", d).addClass("js-fake-time-point-" + d.replace(":", "-")).html("|").appendTo(e).css({
                    width: y
                });
            void 0 !== t.streams && E.each(t.streams, function (d) {
                var u = 0,
                    e = E("<div>").addClass("stream").addClass(this.cls).appendTo(n);
                e.addClass(this.cls).data("one", !1).data("data", this.data), E("<div>").addClass("stream-title").html(this.title).appendTo(e), E("<div>").addClass("stream-secondary").html(this.secondary).appendTo(e), E(this.icon).addClass("stream-icon").appendTo(e);
                var t, h = x.colors.toHEX(I.getStyleOne(e, "background-color")),
                    p = x.colors.toHEX(I.getStyleOne(e, "color")),
                    f = E("<div>").addClass("stream-events").data("background-color", h).data("text-color", p).appendTo(a);
                void 0 !== this.events && (E.each(this.events, function (e) {
                    var t, n, i, s = this,
                        a = void 0 === s.row ? 1 : parseInt(s.row),
                        o = d + ":" + e,
                        r = void 0 !== s.custom ? s.custom : "",
                        l = void 0 !== s.custom_open ? s.custom_open : "",
                        c = void 0 !== s.custom_close ? s.custom_close : "";
                    void 0 !== s.skip && I.bool(s.skip) || (n = E("<div>").data("origin", s).data("sid", o).data("data", s.data).data("time", s.time).data("target", s.target).addClass("stream-event").addClass("size-" + s.size + (["half", "one-third"].includes(s.size) ? "" : "x")).addClass(s.cls).appendTo(f), i = C.find(".js-fake-time-point-" + this.time.replace(":", "-")).offset().left - f.offset().left, e = 75 * (a - 1), u < a && (u = a), n.css({
                        position: "absolute",
                        left: i,
                        top: e
                    }), I.isNull(s.html) ? (a = E("<div>").addClass("stream-event-slide").appendTo(n), i = E("<div>").addClass("slide-logo").appendTo(a), e = E("<div>").addClass("slide-data").appendTo(a), void 0 !== s.icon && (I.isTag(s.icon) ? E(s.icon).addClass("icon") : E("<img>").addClass("icon").attr("src", s.icon)).appendTo(i), E("<span>").addClass("time").css({
                        backgroundColor: h,
                        color: p
                    }).html(s.time).appendTo(i), E("<div>").addClass("title").html(s.title).appendTo(e), E("<div>").addClass("subtitle").html(s.subtitle).appendTo(e), E("<div>").addClass("desc").html(s.desc).appendTo(e), (!1 === g.closed && v.attr("id") === b && -1 !== w.indexOf(o) || !0 === s.selected || 1 === parseInt(s.selected)) && n.addClass("selected"), !0 === g.closed || !0 === s.closed || 1 === parseInt(s.closed) ? (t = void 0 !== s.closedIcon ? I.isTag(s.closedIcon) ? s.closedIcon : "<span>" + s.closedIcon + "</span>" : I.isTag(g.defaultClosedIcon) ? g.defaultClosedIcon : "<span>" + g.defaultClosedIcon + "</span>", E(t).addClass("state-icon").addClass(s.clsClosedIcon).appendTo(a), n.data("closed", !0).data("target", s.target), n.append(l)) : (t = void 0 !== s.openIcon ? I.isTag(s.openIcon) ? s.openIcon : "<span>" + s.openIcon + "</span>" : I.isTag(g.defaultOpenIcon) ? g.defaultOpenIcon : "<span>" + g.defaultOpenIcon + "</span>", E(t).addClass("state-icon").addClass(s.clsOpenIcon).appendTo(a), n.data("closed", !1), n.append(c)), n.append(r)) : n.html(s.html), m._fireEvent("draw-event", {
                        event: n[0]
                    }))
                }), 0 < (t = f.find(".stream-event").last()).length && f.outerWidth(t[0].offsetLeft + t.outerWidth())), f.css({
                    height: 75 * u
                }), v.find(".stream").eq(f.index()).css({
                    height: 75 * u
                }), m._fireEvent("draw-stream", {
                    stream: e[0]
                })
            }), void 0 !== t.global && (S = s.offset().left, E.each(["before", "after"], function () {
                void 0 !== t.global[this] && E.each(t.global[this], function () {
                    var e = E("<div>").addClass("event-group").addClass("size-" + this.size + (["half", "one-third"].includes(this.size) ? "" : "x")),
                        t = E("<div>").addClass("stream-events global-stream").appendTo(e),
                        n = E("<div>").addClass("stream-event").appendTo(t);
                    n.addClass("global-event").addClass(this.cls).data("time", this.time).data("origin", this).data("data", this.data), E("<div>").addClass("event-title").html(this.title).appendTo(n), E("<div>").addClass("event-subtitle").html(this.subtitle).appendTo(n), E("<div>").addClass("event-html").html(this.html).appendTo(n);
                    var i, t = C.find(".js-fake-time-point-" + this.time.replace(":", "-"));
                    0 < t.length && (i = t.offset().left - S), e.css({
                        position: "absolute",
                        left: i,
                        height: "100%"
                    }).appendTo(s), m._fireEvent("draw-global-event", {
                        event: n[0]
                    })
                })
            })), v.data("stream", -1), v.find(".events-area").scrollLeft(0), this.events = v.find(".stream-event"), this._createEvents(), null !== g.startFrom && !0 === g.slideToStart && setTimeout(function () {
                m.slideTo(g.startFrom)
            }, g.startSlideSleep), this._fireEvent("streamer-create"), this._fireScroll()
        },
        _fireScroll: function () {
            var e = this.element.find(".events-area"),
                t = this.scroll;
            0 !== e.length && (this.scrollDir = this.scroll < e[0].scrollLeft ? "left" : "right", this.scroll = e[0].scrollLeft, this._fireEvent("events-scroll", {
                scrollLeft: e[0].scrollLeft,
                oldScroll: t,
                scrollDir: this.scrollDir,
                events: E.toArray(this.events)
            }))
        },
        _createEvents: function () {
            var n = this,
                i = this.element,
                s = this.options;
            i.off(x.events.click, ".stream-event").on(x.events.click, ".stream-event", function (e) {
                var t = E(this);
                "" !== s.excludeClass && t.hasClass(s.excludeClass) || null !== s.excludeElement && E(e.target).is(s.excludeElement) || (!1 === s.closed && !0 !== t.data("closed") && "select" === s.eventClick ? "" !== s.excludeSelectClass && t.hasClass(s.excludeSelectClass) || null !== s.excludeSelectElement && E(e.target).is(s.excludeSelectElement) || (t.hasClass("global-event") && !0 !== s.selectGlobal || t.toggleClass("selected"), !0 === s.changeUri && n._changeURI(), n._fireEvent("event-select", {
                    event: t[0],
                    selected: t.hasClass("selected")
                })) : "" !== s.excludeClickClass && t.hasClass(s.excludeClickClass) || null !== s.excludeClickElement && E(e.target).is(s.excludeClickElement) || (n._fireEvent("event-click", {
                    event: t[0]
                }), !0 !== s.closed && !0 !== t.data("closed") || (t = t.data("target")) && (window.location.href = t)))
            }), i.off(x.events.click, ".stream").on(x.events.click, ".stream", function () {
                var e = E(this),
                    t = e.index();
                !1 !== s.streamSelect && (i.data("stream") === t ? (i.find(".stream-event").removeClass("disabled"), i.data("stream", -1)) : (i.data("stream", t), i.find(".stream-event").addClass("disabled"), n.enableStream(e), n._fireEvent("stream-select", {
                    stream: e
                })), n._fireEvent("stream-click", {
                    stream: e
                }))
            }), !0 === s.wheel && (i.find(".events-area").off(x.events.mousewheel).on(x.events.mousewheel, function (e) {
                var t, n;
                void 0 !== e.deltaY && (t = E(this), n = 0 < e.deltaY ? -1 : 1, e = s.wheelStep, e = t.scrollLeft() - n * e, t.scrollLeft(e))
            }), i.find(".events-area").off("mouseenter").on("mouseenter", function () {
                var e, t;
                e = window.pageYOffset || document.documentElement.scrollTop, t = window.pageXOffset || document.documentElement.scrollLeft, window.onscroll = function () {
                    window.scrollTo(t, e)
                }
            }), i.find(".events-area").off("mouseleave").on("mouseleave", function () {
                window.onscroll = function () {}
            })), i.find(".events-area").last().off("scroll").on("scroll", function () {
                n._fireScroll()
            }), !0 === E.touchable && i.off(x.events.click, ".stream").on(x.events.click, ".stream", function () {
                var e = E(this);
                e.toggleClass("focused"), E.each(i.find(".stream"), function () {
                    E(this).is(e) || E(this).removeClass("focused")
                })
            })
        },
        _changeURI: function () {
            var e = this.getLink();
            history.pushState({}, document.title, e)
        },
        slideTo: function (e) {
            var t = this.element,
                n = this.options,
                e = E((void 0 === e ? t.find(".streamer-timeline li") : t.find(".streamer-timeline .js-time-point-" + e.replace(":", "-")))[0]);
            t.find(".events-area").animate({
                draw: {
                    scrollLeft: e[0].offsetLeft - t.find(".streams .stream").outerWidth()
                },
                dur: n.duration
            })
        },
        enableStream: function (e) {
            var t = this.element,
                n = e.index() - 1;
            e.removeClass("disabled").data("streamDisabled", !1), t.find(".stream-events").eq(n).find(".stream-event").removeClass("disabled")
        },
        disableStream: function (e) {
            var t = this.element,
                n = e.index() - 1;
            e.addClass("disabled").data("streamDisabled", !0), t.find(".stream-events").eq(n).find(".stream-event").addClass("disabled")
        },
        toggleStream: function (e) {
            !0 === e.data("streamDisabled") ? this.enableStream(e) : this.disableStream(e)
        },
        getLink: function () {
            var e = this.element,
                t = this.options,
                n = e.find(".stream-event"),
                i = [],
                s = window.location.href;
            return E.each(n, function () {
                var e = E(this);
                void 0 !== e.data("sid") && e.hasClass("selected") && i.push(e.data("sid"))
            }), e = e.attr("id") + "|" + i.join(","), !0 === t.encodeLink && (e = btoa(e)), I.updateURIParameter(s, "StreamerIDS", e)
        },
        getTimes: function () {
            var e = this.element.find(".streamer-timeline > li"),
                t = [];
            return E.each(e, function () {
                t.push(E(this).data("time"))
            }), t
        },
        getEvents: function (e, t) {
            var n, i = this.element,
                s = [];
            switch (e) {
                case "selected":
                    n = i.find(".stream-event.selected");
                    break;
                case "non-selected":
                    n = i.find(".stream-event:not(.selected)");
                    break;
                default:
                    n = i.find(".stream-event")
            }
            return E.each(n, function () {
                var e = E(this);
                !0 !== t && e.parent().hasClass("global-stream") || (e = e.data("origin"), s.push(e))
            }), s
        },
        source: function (e) {
            var t = this.element;
            if (void 0 === e) return this.options.source;
            t.attr("data-source", e), this.options.source = e, this.changeSource()
        },
        dataSet: function (e) {
            if (void 0 === e) return this.options.data;
            this.options.data = e, this.changeData(e)
        },
        getStreamerData: function () {
            return this.data
        },
        toggleEvent: function (e) {
            var t = this.options;
            (e = E(e)).hasClass("global-event") && !0 !== t.selectGlobal || (e.hasClass("selected") ? this.selectEvent(e, !1) : this.selectEvent(e, !0))
        },
        selectEvent: function (e, t) {
            var n = this.options;
            void 0 === t && (t = !0), (e = E(e)).hasClass("global-event") && !0 !== n.selectGlobal || (!0 === t ? e.addClass("selected") : e.removeClass("selected"), !0 === n.changeUri && this._changeURI(), this._fireEvent("event-select", {
                event: e[0],
                selected: t
            }))
        },
        changeSource: function () {
            var e = this.element,
                t = this.options,
                e = e.attr("data-source");
            "" !== String(e).trim() && (t.source = e, this._fireEvent("data-load", {
                source: t.source
            }), this._loadSource(), this._fireEvent("source-change"))
        },
        changeData: function (e) {
            var t = this.element,
                n = this.options,
                i = this.data;
            n.data = "object" == typeof e ? e : JSON.parse(t.attr("data-data")), this.data = n.data, this.build(), this._fireEvent("data-change", {
                oldData: i,
                newData: n.data
            })
        },
        changeStreamSelectOption: function () {
            var e = this.element;
            this.options.streamSelect = "true" === e.attr("data-stream-select").toLowerCase()
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-source":
                    this.changeSource();
                    break;
                case "data-data":
                    this.changeData();
                    break;
                case "data-stream-select":
                    this.changeStreamSelectOption()
            }
        },
        destroy: function () {
            var e = this.element;
            return e.off(x.events.click, ".stream-event"), e.off(x.events.click, ".stream"), e.find(".events-area").off(x.events.mousewheel), e.find(".events-area").last().off("scroll"), e
        }
    })
}(Metro, m4q),
function (s, a) {
    "use strict";
    var n = s.utils,
        i = {
            switchDeferred: 0,
            material: !1,
            transition: !0,
            caption: "",
            captionPosition: "right",
            clsSwitch: "",
            clsCheck: "",
            clsCaption: "",
            textOn: "",
            textOff: "",
            locale: METRO_LOCALE,
            showOnOff: !1,
            onSwitchCreate: s.noop
        };
    s.switchSetup = function (e) {
        i = a.extend({}, i, e)
    }, window.metroSwitchSetup, s.switchSetup(window.metroSwitchSetup), s.Component("switch", {
        init: function (e, t) {
            return this._super(t, e, i, {
                locale: null
            }), this
        },
        _create: function () {
            var e, t = this.element,
                n = this.options,
                i = a("<span>").addClass("check"),
                s = a("<span>").addClass("caption").html(n.caption);
            t.attr("type", "checkbox"), void 0 !== t.attr("readonly") && t.on("click", function (e) {
                e.preventDefault()
            }), e = t.wrap(a("<label>").addClass((!0 === n.material ? " switch-material " : " switch ") + t[0].className)), this.component = e, i.appendTo(e), s.appendTo(e), !0 === n.transition && e.addClass("transition-on"), "left" === n.captionPosition && e.addClass("caption-left"), t[0].className = "", e.addClass(n.clsSwitch), s.addClass(n.clsCaption), i.addClass(n.clsCheck), t.is(":disabled") ? this.disable() : this.enable(), this.i18n(n.locale), this._fireEvent("switch-create")
        },
        disable: function () {
            this.element.prop("disabled", !0)
        },
        enable: function () {
            this.element.prop("disabled", !1)
        },
        toggleState: function () {
            this.element.is(":disabled") ? this.enable() : this.disable()
        },
        toggle: function (e) {
            var t = this.element;
            return t.is(":disabled") || (n.isValue(e) ? t.prop("checked", 1 === e) : t.prop("checked", !n.bool(t.prop("checked")))), this
        },
        changeLocale: function (e, t) {
            var n = this.element,
                i = this.options,
                n = n.siblings(".check");
            i["text" + Cake.capitalize(e)] = t, n.attr("data-" + e, t)
        },
        i18n: function (e) {
            var t = this.element,
                n = this.options,
                i = t.siblings(".check");
            n.locale = e, this.locale = void 0 !== s.locales[n.locale] ? s.locales[n.locale] : s.locales["en-US"], n.showOnOff ? (e = t.attr("data-on") || n.textOn || this.locale.switch.on, n = t.attr("data-off") || n.textOff || this.locale.switch.off, i.attr("data-on", e), i.attr("data-off", n)) : (i.removeAttr("data-on"), i.removeAttr("data-off"))
        },
        changeAttribute: function (e, t) {
            switch (e) {
                case "data-on":
                case "data-text-on":
                    this.changeLocale("on", t);
                    break;
                case "data-off":
                case "data-text-off":
                    this.changeLocale("off", t)
            }
        },
        destroy: function () {
            return this.element
        }
    })
}(Metro, m4q),
function (b, w) {
    "use strict";
    var y = b.utils,
        n = {
            useCurrentSlice: !1,
            showInspectorButton: !1,
            inspectorButtonIcon: "<span class='default-icon-equalizer'>",
            tableDeferred: 0,
            templateBeginToken: "<%",
            templateEndToken: "%>",
            paginationDistance: 5,
            locale: METRO_LOCALE,
            horizontalScroll: !1,
            horizontalScrollStop: null,
            check: !1,
            checkType: "checkbox",
            checkStyle: 1,
            checkColIndex: 0,
            checkName: null,
            checkStoreKey: "TABLE:$1:KEYS",
            rownum: !1,
            rownumTitle: "#",
            filters: null,
            filtersOperator: "and",
            head: null,
            body: null,
            static: !1,
            source: null,
            searchMinLength: 1,
            searchThreshold: 500,
            searchFields: null,
            showRowsSteps: !0,
            showSearch: !0,
            showTableInfo: !0,
            showPagination: !0,
            paginationShortMode: !0,
            showActivity: !0,
            muteTable: !0,
            showSkip: !1,
            rows: 10,
            rowsSteps: "10,25,50,100",
            staticView: !1,
            viewSaveMode: "client",
            viewSavePath: "TABLE:$1:OPTIONS",
            sortDir: "asc",
            decimalSeparator: ".",
            thousandSeparator: ",",
            tableRowsCountTitle: null,
            tableSearchTitle: null,
            tableInfoTitle: null,
            paginationPrevTitle: null,
            paginationNextTitle: null,
            allRecordsTitle: null,
            inspectorTitle: null,
            tableSkipTitle: null,
            emptyTableTitle: null,
            activityType: "atom",
            activityStyle: "color",
            activityTimeout: 100,
            searchWrapper: null,
            rowsWrapper: null,
            infoWrapper: null,
            paginationWrapper: null,
            skipWrapper: null,
            cellWrapper: !0,
            clsComponent: "",
            clsTableContainer: "",
            clsTable: "",
            clsHead: "",
            clsHeadRow: "",
            clsHeadCell: "",
            clsBody: "",
            clsBodyRow: "",
            clsBodyCell: "",
            clsCellWrapper: "",
            clsFooter: "",
            clsFooterRow: "",
            clsFooterCell: "",
            clsTableTop: "",
            clsRowsCount: "",
            clsSearch: "",
            clsTableBottom: "",
            clsTableInfo: "",
            clsTablePagination: "",
            clsPagination: "",
            clsTableSkip: "",
            clsTableSkipInput: "",
            clsTableSkipButton: "",
            clsEvenRow: "",
            clsOddRow: "",
            clsRow: "",
            clsEmptyTableTitle: "",
            onDraw: b.noop,
            onDrawRow: b.noop,
            onDrawCell: b.noop,
            onAppendRow: b.noop,
            onAppendCell: b.noop,
            onSortStart: b.noop,
            onSortStop: b.noop,
            onSortItemSwitch: b.noop,
            onSearch: b.noop,
            onRowsCountChange: b.noop,
            onDataLoad: b.noop,
            onDataLoadError: b.noop,
            onDataLoaded: b.noop,
            onDataLoadEnd: b.noop,
            onDataSaveError: b.noop,
            onFilterRowAccepted: b.noop,
            onFilterRowDeclined: b.noop,
            onCheckClick: b.noop,
            onCheckClickAll: b.noop,
            onCheckDraw: b.noop,
            onViewSave: b.noop,
            onViewGet: b.noop,
            onViewCreated: b.noop,
            onTableCreate: b.noop,
            onSkip: b.noop
        };
    b.tableSetup = function (e) {
        n = w.extend({}, n, e)
    }, window.metroTableSetup, b.tableSetup(window.metroTableSetup), b.Component("table", {
        init: function (e, t) {
            return this._super(t, e, n, {
                currentPage: 1,
                pagesCount: 1,
                searchString: "",
                data: null,
                activity: null,
                loadActivity: null,
                busy: !1,
                filters: [],
                wrapperInfo: null,
                wrapperSearch: null,
                wrapperRows: null,
                wrapperPagination: null,
                wrapperSkip: null,
                filterIndex: null,
                filtersIndexes: [],
                component: null,
                inspector: null,
                view: {},
                viewDefault: {},
                locale: b.locales["en-US"],
                input_interval: null,
                searchFields: [],
                id: y.elementId("table"),
                sort: {
                    dir: "asc",
                    colIndex: 0
                },
                service: [],
                heads: [],
                items: [],
                foots: [],
                filteredItems: [],
                currentSlice: [],
                index: {}
            }), this
        },
        _create: function () {
            var e, t, n = this,
                i = this.element,
                s = this.options,
                a = y.elementId("table");
            y.isValue(i.attr("id")) || i.attr("id", a), y.isValue(b.locales[s.locale]) && (this.locale = b.locales[s.locale]), y.isValue(s.searchFields) && (this.searchFields = s.searchFields.toArray()), y.isValue(s.head) && (t = s.head, s.head = y.isObject(s.head), s.head || (console.warn("Head " + t + " defined but not exists!"), s.head = null)), y.isValue(s.body) && (e = s.body, s.body = y.isObject(s.body), s.body || (console.warn("Body " + e + " defined but not exists!"), s.body = null)), !0 === s.static && (s.showPagination = !1, s.showRowsSteps = !1, s.showSearch = !1, s.showTableInfo = !1, s.showSkip = !1, s.rows = -1), (t = w("<div>").addClass("table-component")).insertBefore(i), e = w("<div>").addClass("table-container").addClass(s.clsTableContainer).appendTo(t), i.appendTo(e), !0 === s.horizontalScroll && e.addClass("horizontal-scroll"), !y.isNull(s.horizontalScrollStop) && y.mediaExist(s.horizontalScrollStop) && e.removeClass("horizontal-scroll"), t.addClass(s.clsComponent), this.activity = w("<div>").addClass("table-progress").appendTo(t), e = w("<div>").appendTo(this.activity), b.makePlugin(e, "activity", {
                type: s.activityType,
                style: s.activityStyle
            }), !0 !== s.showActivity && this.activity.css({
                visibility: "hidden"
            }), this.component = t[0], null !== s.source ? (this._fireEvent("data-load", {
                source: s.source
            }), !1 !== (t = y.isObject(s.source)) && w.isPlainObject(t) ? n._build(t) : this.activity.show(function () {
                fetch(s.source).then(b.fetch.status).then(b.fetch.json).then(function (e) {
                    if (n.activity.hide(), "object" != typeof e) throw new Error("Data for table is not a object");
                    n._fireEvent("data-loaded", {
                        source: s.source,
                        data: e
                    }), n._build(e)
                }).catch(function (e) {
                    n.activity.hide(), n._fireEvent("data-load-error", {
                        source: s.source,
                        error: e
                    })
                })
            })) : n._build()
        },
        _createIndex: function () {
            var n = this,
                i = this.options.checkColIndex;
            setImmediate(function () {
                n.items.forEach(function (e, t) {
                    n.index[e[i]] = t
                })
            })
        },
        _build: function (e) {
            var t = this,
                n = this.element,
                i = this.options,
                s = n.attr("id");
            i.rows = +i.rows, this.items = [], this.heads = [], this.foots = [], Array.isArray(i.head) && (this.heads = i.head), Array.isArray(i.body) && (this.items = i.body), y.isValue(e) ? this._createItemsFromJSON(e) : this._createItemsFromHTML(), this._createIndex(), this.view = this._createView(), this.viewDefault = y.objectClone(this.view), s = i.viewSavePath.replace("$1", s), "client" === i.viewSaveMode.toLowerCase() ? (i = b.storage.getItem(s), y.isValue(i) && y.objectLength(i) === y.objectLength(this.view) && (this.view = i, this._fireEvent("view-get", {
                source: "client",
                view: i
            })), this._final()) : fetch(s).then(b.fetch.status).then(b.fetch.json).then(function (e) {
                y.isValue(e) && y.objectLength(e) === y.objectLength(t.view) && (t.view = e, t._fireEvent("view-get", {
                    source: "server",
                    view: e
                })), t._final()
            }).catch(function (e) {
                t._final(), console.warn("Warning! Error loading view for table " + n.attr("id") + ": " + e)
            })
        },
        _final: function () {
            var e = this.element,
                t = this.options,
                n = e.attr("id");
            b.storage.delItem(t.checkStoreKey.replace("$1", n)), this._service(), this._createStructure(), this._createInspector(), this._createEvents(), this._fireEvent("table-create", {
                element: e
            })
        },
        _service: function () {
            var e = this.options;
            this.service = [{
                title: e.rownumTitle,
                format: void 0,
                name: void 0,
                sortable: !1,
                sortDir: void 0,
                clsColumn: "rownum-cell " + (!0 !== e.rownum ? "d-none" : ""),
                cls: "rownum-cell " + (!0 !== e.rownum ? "d-none" : ""),
                colspan: void 0,
                type: "rownum"
            }, {
                title: "checkbox" === e.checkType ? "<input type='checkbox' data-role='checkbox' class='table-service-check-all' data-style='" + e.checkStyle + "'>" : "",
                format: void 0,
                name: void 0,
                sortable: !1,
                sortDir: void 0,
                clsColumn: "check-cell " + (!0 !== e.check ? "d-none" : ""),
                cls: "check-cell " + (!0 !== e.check ? "d-none" : ""),
                colspan: void 0,
                type: "rowcheck"
            }]
        },
        _createView: function () {
            var t = {};
            return w.each(this.heads, function (e) {
                y.isValue(this.cls) && (this.cls = this.cls.replace("hidden", "")), y.isValue(this.clsColumn) && (this.clsColumn = this.clsColumn.replace("hidden", "")), t[e] = {
                    index: e,
                    "index-view": e,
                    show: !y.isValue(this.show) || this.show,
                    size: y.isValue(this.size) ? this.size : ""
                }
            }), this._fireEvent("view-created", {
                view: t
            }), t
        },
        _createInspectorItems: function (e) {
            var t, n, i = this,
                s = this.options,
                a = [],
                o = this.heads;
            for (e.html(""), t = 0; t < o.length; t++) a[t] = null;
            for (w.each(o, function (e) {
                    (n = w("<tr>")).data("index", e), n.data("index-view", e), w("<td>").html("<input type='checkbox' data-style='" + s.checkStyle + "' data-role='checkbox' name='column_show_check[]' value='" + e + "' " + (y.bool(i.view[e].show) ? "checked" : "") + ">").appendTo(n), w("<td>").html(this.title).appendTo(n), w("<td>").html("<input type='number' data-role='spinner' name='column_size' value='" + i.view[e].size + "' data-index='" + e + "'>").appendTo(n), w("<td>").html("<button class='button square js-table-inspector-field-up' type='button'><span class='mif-arrow-up'></span></button><button class='button square js-table-inspector-field-down' type='button'><span class='mif-arrow-down'></span></button>").appendTo(n), a[i.view[e]["index-view"]] = n
                }), t = 0; t < o.length; t++) a[t].appendTo(e)
        },
        _createInspector: function () {
            var e, t, n = this.options,
                i = w("<div data-role='draggable' data-drag-element='.table-inspector-header' data-drag-area='body'>").addClass("table-inspector");
            i.attr("for", this.element.attr("id")), w("<div class='table-inspector-header'>" + (n.inspectorTitle || this.locale.table.inspector) + "</div>").appendTo(i), e = w("<div>").addClass("table-wrap").appendTo(i), t = w("<table>").addClass("table subcompact"), n = w("<tbody>").appendTo(t), t.appendTo(e), this._createInspectorItems(n), n = w("<div class='table-inspector-actions'>").appendTo(i), w("<button class='button primary js-table-inspector-save' type='button'>").html(this.locale.buttons.save).appendTo(n), w("<button class='button secondary js-table-inspector-reset ml-2 mr-2' type='button'>").html(this.locale.buttons.reset).appendTo(n), w("<button class='button link js-table-inspector-cancel place-right' type='button'>").html(this.locale.buttons.cancel).appendTo(n), i.data("open", !1), this.inspector = i, w("body").append(i), this._createInspectorEvents()
        },
        _resetInspector: function () {
            var e = this.inspector.find("table tbody");
            this._createInspectorItems(e), this._createInspectorEvents()
        },
        _createHeadsFromHTML: function () {
            var i = this,
                e = this.element.find("thead");
            0 < e.length && w.each(e.find("tr > *"), function () {
                var e = w(this),
                    t = y.isValue(e.data("sort-dir")) ? e.data("sort-dir") : e.hasClass("sort-asc") ? "asc" : e.hasClass("sort-desc") ? "desc" : void 0,
                    n = e[0].className.replace("sortable-column", "");
                n = (n = (n = n.replace("sort-asc", "")).replace("sort-desc", "")).replace("hidden", ""), e = {
                    type: "data",
                    title: e.html(),
                    name: y.isValue(e.data("name")) ? e.data("name") : e.text().replace(" ", "_"),
                    sortable: e.hasClass("sortable-column") || y.isValue(e.data("sortable")) && !0 === JSON.parse(e.data("sortable")),
                    sortDir: t,
                    format: y.isValue(e.data("format")) ? e.data("format") : "string",
                    formatMask: y.isValue(e.data("format-mask")) ? e.data("format-mask") : null,
                    clsColumn: y.isValue(e.data("cls-column")) ? e.data("cls-column") : "",
                    cls: n,
                    colspan: e.attr("colspan"),
                    size: y.isValue(e.data("size")) ? e.data("size") : "",
                    show: !(e.hasClass("hidden") || y.isValue(e.data("show")) && !1 === JSON.parse(e.data("show"))),
                    required: !!y.isValue(e.data("required")) && !0 === JSON.parse(e.data("required")),
                    field: y.isValue(e.data("field")) ? e.data("field") : "input",
                    fieldType: y.isValue(e.data("field-type")) ? e.data("field-type") : "text",
                    validator: y.isValue(e.data("validator")) ? e.data("validator") : null,
                    template: y.isValue(e.data("template")) ? e.data("template") : null
                }, i.heads.push(e)
            })
        },
        _createFootsFromHTML: function () {
            var t = this,
                e = this.element.find("tfoot");
            0 < e.length && w.each(e.find("tr > *"), function () {
                var e = w(this),
                    e = {
                        title: e.html(),
                        name: !!y.isValue(e.data("name")) && e.data("name"),
                        cls: e[0].className,
                        colspan: e.attr("colspan")
                    };
                t.foots.push(e)
            })
        },
        _createItemsFromHTML: function () {
            var n = this,
                e = this.element.find("tbody");
            0 < e.length && w.each(e.find("tr"), function () {
                var e = w(this),
                    t = [];
                w.each(e.children("td"), function () {
                    var e = w(this);
                    t.push(e.html())
                }), n.items.push(t)
            }), this._createHeadsFromHTML(), this._createFootsFromHTML()
        },
        _createItemsFromJSON: function (e) {
            var t = this;
            "string" == typeof e && (e = JSON.parse(e)), void 0 !== e.header ? t.heads = e.header : this._createHeadsFromHTML(), void 0 !== e.data && w.each(e.data, function () {
                var e = [];
                w.each(this, function () {
                    e.push(this)
                }), t.items.push(e)
            }), void 0 !== e.footer ? this.foots = e.footer : this._createFootsFromHTML()
        },
        _createTableHeader: function () {
            var t, i, e, n, s = this.element,
                a = this.options,
                o = s.find("thead"),
                r = [],
                l = a.staticView ? this._createView() : this.view;
            if (0 === o.length && (o = w("<thead>"), s.prepend(o)), o.clear().addClass(a.clsHead), 0 === this.heads.length) return o;
            for (t = w("<tr>").addClass(a.clsHeadRow).appendTo(o), w.each(this.service, function () {
                    var e = [];
                    i = w("<th>").appendTo(t), y.isValue(this.title) && i.html(this.title), y.isValue(this.size) && i.css({
                        width: this.size
                    }), y.isValue(this.cls) && e.push(this.cls), e.push(a.clsHeadCell), i.addClass(e.join(" "))
                }), n = this.heads, e = 0; e < n.length; e++) r[e] = null;
            for (w.each(n, function (e) {
                    var t = this,
                        n = [];
                    (i = w("<th>")).data("index", e), y.isValue(t.title) && i.html(t.title), y.isValue(t.format) && i.attr("data-format", t.format), y.isValue(t.name) && i.attr("data-name", t.name), y.isValue(t.colspan) && i.attr("colspan", t.colspan), y.isValue(l[e].size) && i.css({
                        width: l[e].size
                    }), !0 === t.sortable && (n.push("sortable-column"), y.isValue(t.sortDir) && n.push("sort-" + t.sortDir)), y.isValue(t.cls) && w.each(t.cls.toArray(), function () {
                        n.push(this)
                    }), !1 === y.bool(l[e].show) && -1 === n.indexOf("hidden") && n.push("hidden"), n.push(a.clsHeadCell), y.bool(l[e].show) && y.arrayDelete(n, "hidden"), i.addClass(n.join(" ")), r[l[e]["index-view"]] = i
                }), e = 0; e < n.length; e++) r[e].appendTo(t)
        },
        _createTableBody: function () {
            var e = this.element,
                t = e.find("thead"),
                n = e.find("tbody");
            0 === n.length && (n = w("<tbody>").addClass(this.options.clsBody), 0 !== t.length ? n.insertAfter(t) : e.append(n)), n.clear()
        },
        _createTableFooter: function () {
            var e, t, n = this.element,
                i = this.options,
                s = n.find("tfoot");
            0 === s.length && (s = w("<tfoot>").appendTo(n)), s.clear().addClass(i.clsFooter), 0 !== this.foots.length && (e = w("<tr>").addClass(i.clsHeadRow).appendTo(s), w.each(this.foots, function () {
                t = w("<th>").appendTo(e), void 0 !== this.title && t.html(this.title), void 0 !== this.name && t.addClass("foot-column-name-" + this.name), void 0 !== this.cls && t.addClass(this.cls), y.isValue(this.colspan) && t.attr("colspan", this.colspan), t.appendTo(e)
            }))
        },
        _createTopBlock: function () {
            var n, i = this,
                e = this.element,
                s = this.options,
                t = w("<div>").addClass("table-top").addClass(s.clsTableTop).insertBefore(e.parent()),
                a = y.isValue(this.wrapperSearch) ? this.wrapperSearch : w("<div>").addClass("table-search-block").addClass(s.clsSearch).appendTo(t);
            return a.addClass(s.clsSearch), e = w("<input>").attr("type", "text").appendTo(a), b.makePlugin(e, "input", {
                prepend: s.tableSearchTitle || i.locale.table.search
            }), !0 !== s.showSearch && a.hide(), (a = y.isValue(this.wrapperRows) ? this.wrapperRows : w("<div>").addClass("table-rows-block").appendTo(t)).addClass(s.clsRowsCount), n = w("<select>").appendTo(a), w.each(s.rowsSteps.toArray(), function () {
                var e = parseInt(this),
                    t = w("<option>").attr("value", e).text(-1 === e ? s.allRecordsTitle || i.locale.table.all : e).appendTo(n);
                e === parseInt(s.rows) && t.attr("selected", "selected")
            }), b.makePlugin(n, "select", {
                filter: !1,
                prepend: s.tableRowsCountTitle || i.locale.table.rowsCount,
                onChange: function (e) {
                    (e = parseInt(e)) !== parseInt(s.rows) && (s.rows = e, i.currentPage = 1, i._draw(), i._fireEvent("rows-count-change", {
                        val: e
                    }))
                }
            }), s.showInspectorButton && w("<button>").addClass("button inspector-button").attr("type", "button").html(s.inspectorButtonIcon).insertAfter(a), !0 !== s.showRowsSteps && a.hide(), t
        },
        _createBottomBlock: function () {
            var e = this.element,
                t = this.options,
                n = w("<div>").addClass("table-bottom").addClass(t.clsTableBottom).insertAfter(e.parent()),
                e = y.isValue(this.wrapperInfo) ? this.wrapperInfo : w("<div>").addClass("table-info").appendTo(n);
            return e.addClass(t.clsTableInfo), !0 !== t.showTableInfo && e.hide(), (e = y.isValue(this.wrapperPagination) ? this.wrapperPagination : w("<div>").addClass("table-pagination").appendTo(n)).addClass(t.clsTablePagination), !0 !== t.showPagination && e.hide(), (e = y.isValue(this.wrapperSkip) ? this.wrapperSkip : w("<div>").addClass("table-skip").appendTo(n)).addClass(t.clsTableSkip), w("<input type='text'>").addClass("input table-skip-input").addClass(t.clsTableSkipInput).appendTo(e), w("<button>").addClass("button table-skip-button").addClass(t.clsTableSkipButton).html(t.tableSkipTitle || this.locale.table.skip).appendTo(e), !0 !== t.showSkip && e.hide(), n
        },
        _createStructure: function () {
            var t = this,
                e = this.element,
                n = this.options,
                i = w(n.searchWrapper),
                s = w(n.infoWrapper),
                a = w(n.rowsWrapper),
                o = w(n.paginationWrapper),
                r = w(n.skipWrapper);
            0 < i.length && (this.wrapperSearch = i), 0 < s.length && (this.wrapperInfo = s), 0 < a.length && (this.wrapperRows = a), 0 < o.length && (this.wrapperPagination = o), 0 < r.length && (this.wrapperSkip = r), e.addClass(n.clsTable), this._createTableHeader(), this._createTableBody(), this._createTableFooter(), this._createTopBlock(), this._createBottomBlock();
            var l, c = !1;
            0 < this.heads.length && w.each(this.heads, function (e) {
                !c && -1 < ["asc", "desc"].indexOf(this.sortDir) && (c = !0, t.sort.colIndex = e, t.sort.dir = this.sortDir)
            }), c && (e = e.find("thead th"), this._resetSortClass(e), w(e.get(this.sort.colIndex + t.service.length)).addClass("sort-" + this.sort.dir), this.sorting()), y.isValue(n.filters) && "string" == typeof n.filters && w.each(n.filters.toArray(), function () {
                !1 !== (l = y.isFunc(this)) && t.filtersIndexes.push(t.addFilter(l))
            }), this.currentPage = 1, this._draw()
        },
        _resetSortClass: function (e) {
            w(e).removeClass("sort-asc sort-desc")
        },
        _createEvents: function () {
            var e, o = this,
                t = this.element,
                r = this.options,
                n = t.closest(".table-component"),
                i = n.find(".table-container"),
                s = n.find(".table-search-block input"),
                a = (r.skipWrapper ? w(r.skipWrapper) : n).find(".table-skip-button"),
                l = (r.skipWrapper ? w(r.skipWrapper) : n).find(".table-skip-input"),
                c = t.attr("id");
            n.find(".inspector-button").on(b.events.click, function () {
                o.toggleInspector()
            }), a.on(b.events.click, function () {
                var e = parseInt(l.val().trim());
                if (isNaN(e) || e <= 0 || e > o.pagesCount) return l.val(""), !1;
                l.val(""), o._fireEvent("skip", {
                    skipTo: e,
                    skipFrom: o.currentPage
                }), o.page(e)
            }), w(window).on(b.events.resize, function () {
                !0 === r.horizontalScroll && (!y.isNull(r.horizontalScrollStop) && y.mediaExist(r.horizontalScrollStop) ? i.removeClass("horizontal-scroll") : i.addClass("horizontal-scroll"))
            }, {
                ns: this.id
            }), t.on(b.events.click, ".sortable-column", function () {
                if (!0 === r.muteTable && t.addClass("disabled"), o.busy) return !1;
                o.busy = !0;
                var e = w(this);
                o.activity.show(function () {
                    setImmediate(function () {
                        o.currentPage = 1, o.sort.colIndex = e.data("index"), e.hasClass("sort-asc") || e.hasClass("sort-desc") ? e.hasClass("sort-asc") ? o.sort.dir = "desc" : o.sort.dir = "asc" : o.sort.dir = r.sortDir, o._resetSortClass(t.find(".sortable-column")), e.addClass("sort-" + o.sort.dir), o.sorting(), o._draw(function () {
                            !(o.busy = !1) === r.muteTable && t.removeClass("disabled")
                        })
                    })
                })
            }), t.on(b.events.click, ".table-service-check input", function () {
                var e = w(this),
                    t = e.is(":checked"),
                    n = "" + e.val(),
                    i = r.checkStoreKey.replace("$1", c),
                    s = b.storage,
                    a = s.getItem(i);
                "radio" === e.attr("type") && (a = []), t ? y.isValue(a) ? -1 === Array(a).indexOf(n) && a.push(n) : a = [n] : y.isValue(a) ? y.arrayDelete(a, n) : a = [], s.setItem(i, a), o._fireEvent("check-click", {
                    check: this,
                    status: t,
                    data: a
                })
            }), t.on(b.events.click, ".table-service-check-all input", function () {
                var e, t, n = w(this).is(":checked"),
                    i = r.checkStoreKey.replace("$1", c),
                    s = b.storage;
                !0 === r.useCurrentSlice ? (t = s.getItem(i, []), n ? w.each(o.currentSlice, function () {
                    -1 === t.indexOf("" + this[r.checkColIndex]) && t.push("" + this[r.checkColIndex])
                }) : w.each(o.currentSlice, function () {
                    var e = "" + this[r.checkColIndex]; - 1 !== t.indexOf(e) && b.utils.arrayDelete(t, e)
                }), e = t) : n ? w.each(o.filteredItems, function () {
                    -1 === e.indexOf(this[r.checkColIndex]) && e.push("" + this[r.checkColIndex])
                }) : e = [], s.setItem(i, e), o._draw(), o._fireEvent("check-click-all", {
                    check: this,
                    status: n,
                    data: e
                })
            });
            a = function () {
                o.searchString = this.value.trim().toLowerCase(), clearInterval(o.input_interval), o.input_interval = !1, o.input_interval || (o.input_interval = setTimeout(function () {
                    o.currentPage = 1, o._draw(), clearInterval(o.input_interval), o.input_interval = !1
                }, r.searchThreshold))
            };

            function d(e) {
                var t = w(e),
                    e = t.parent();
                0 !== o.filteredItems.length && (e.hasClass("active") || (e.hasClass("service") ? "prev" === t.data("page") ? (o.currentPage--, 0 === o.currentPage && (o.currentPage = 1)) : (o.currentPage++, o.currentPage > o.pagesCount && (o.currentPage = o.pagesCount)) : o.currentPage = t.data("page"), o._draw()))
            }
            s.on(b.events.inputchange, a), y.isValue(this.wrapperSearch) && 0 < (e = this.wrapperSearch.find("input")).length && e.on(b.events.inputchange, a), n.on(b.events.click, ".pagination .page-link", function () {
                d(this)
            }), y.isValue(this.wrapperPagination) && this.wrapperPagination.on(b.events.click, ".pagination .page-link", function () {
                d(this)
            }), this._createInspectorEvents(), t.on(b.events.click, ".js-table-crud-button", function () {})
        },
        _createInspectorEvents: function () {
            var s = this,
                e = this.inspector;
            this._removeInspectorEvents(), e.on(b.events.click, ".js-table-inspector-field-up", function () {
                var t, e = w(this).closest("tr"),
                    n = e.prev("tr"),
                    i = e.data("index");
                0 !== n.length && (e.insertBefore(n), e.addClass("flash"), setTimeout(function () {
                    e.removeClass("flash")
                }, 1e3), t = e.index(), e.data("index-view", t), s.view[i]["index-view"] = t, w.each(e.nextAll(), function () {
                    var e = w(this);
                    t++, e.data("index-view", t), s.view[e.data("index")]["index-view"] = t
                }), s._createTableHeader(), s._draw())
            }), e.on(b.events.click, ".js-table-inspector-field-down", function () {
                var t, e = w(this).closest("tr"),
                    n = e.next("tr"),
                    i = e.data("index");
                0 !== n.length && (e.insertAfter(n), e.addClass("flash"), setTimeout(function () {
                    e.removeClass("flash")
                }, 1e3), t = e.index(), e.data("index-view", t), s.view[i]["index-view"] = t, w.each(e.prevAll(), function () {
                    var e = w(this);
                    t--, e.data("index-view", t), s.view[e.data("index")]["index-view"] = t
                }), s._createTableHeader(), s._draw())
            }), e.on(b.events.click, "input[type=checkbox]", function () {
                var e = w(this),
                    t = e.is(":checked"),
                    n = e.val(),
                    e = ["cls", "clsColumn"];
                t ? w.each(e, function () {
                    var e = y.isValue(s.heads[n][this]) ? s.heads[n][this].toArray(" ") : [];
                    y.arrayDelete(e, "hidden"), s.heads[n][this] = e.join(" "), s.view[n].show = !0
                }) : w.each(e, function () {
                    var e = y.isValue(s.heads[n][this]) ? s.heads[n][this].toArray(" ") : []; - 1 === e.indexOf("hidden") && e.push("hidden"), s.heads[n][this] = e.join(" "), s.view[n].show = !1
                }), s._createTableHeader(), s._draw()
            }), e.find("input[type=number]").on(b.events.inputchange, function () {
                var e = w(this),
                    t = e.attr("data-index"),
                    e = parseInt(e.val());
                s.view[t].size = 0 === e ? "" : e, s._createTableHeader()
            }), e.on(b.events.click, ".js-table-inspector-save", function () {
                s._saveTableView(), s.openInspector(!1)
            }), e.on(b.events.click, ".js-table-inspector-cancel", function () {
                s.openInspector(!1)
            }), e.on(b.events.click, ".js-table-inspector-reset", function () {
                s.resetView()
            })
        },
        _removeInspectorEvents: function () {
            var e = this.inspector;
            e.off(b.events.click, ".js-table-inspector-field-up"), e.off(b.events.click, ".js-table-inspector-field-down"), e.off(b.events.click, "input[type=checkbox]"), e.off(b.events.click, ".js-table-inspector-save"), e.off(b.events.click, ".js-table-inspector-cancel"), e.off(b.events.click, ".js-table-inspector-reset"), e.find("input[type=number]").off(b.events.inputchange)
        },
        _saveTableView: function () {
            var t, n = this,
                e = this.element,
                i = this.options,
                s = this.view,
                a = e.attr("id"),
                o = i.viewSavePath.replace("$1", a),
                a = b.storage;
            "client" === i.viewSaveMode.toLowerCase() ? (a.setItem(o, s), this._fireEvent("view-save", {
                target: "client",
                path: i.viewSavePath,
                view: s
            })) : (t = {
                id: e.attr("id"),
                view: s
            }, fetch(o, {
                method: "POST",
                body: JSON.stringify(t),
                header: {
                    "Content-type": "application/json;charset=utf-8"
                }
            }).then(b.fetch.status).then(b.fetch.text).then(function (e) {
                n._fireEvent("view-save", {
                    target: "server",
                    path: i.viewSavePath,
                    view: s,
                    post_data: t,
                    response: e
                })
            }).catch(function (e) {
                n._fireEvent("data-save-error", {
                    source: i.viewSavePath,
                    error: e,
                    post_data: t
                })
            }))
        },
        _info: function (e, t, n) {
            var i = this.element,
                s = this.options,
                i = i.closest(".table-component"),
                i = y.isValue(this.wrapperInfo) ? this.wrapperInfo : i.find(".table-info");
            0 !== i.length && (n < t && (t = n), 0 === this.items.length && (e = t = n = 0), s = (s = (s = (s = s.tableInfoTitle || this.locale.table.info).replace("$1", e)).replace("$2", t)).replace("$3", n), i.html(s))
        },
        _paging: function (e) {
            var t = this.element,
                n = this.options,
                t = t.closest(".table-component");
            this.pagesCount = Math.ceil(e / n.rows), b.pagination({
                length: e,
                rows: n.rows,
                current: this.currentPage,
                target: y.isValue(this.wrapperPagination) ? this.wrapperPagination : t.find(".table-pagination"),
                claPagination: n.clsPagination,
                prevTitle: n.paginationPrevTitle || this.locale.table.prev,
                nextTitle: n.paginationNextTitle || this.locale.table.next,
                distance: !0 === n.paginationShortMode ? n.paginationDistance : 0
            })
        },
        _filter: function () {
            var o = this,
                r = this.options,
                e = y.isValue(this.searchString) && o.searchString.length >= r.searchMinLength || 0 < this.filters.length ? this.items.filter(function (n) {
                    var e, t, i, s = "",
                        a = 0;
                    if (0 < o.filters.length) {
                        for (e = "and" === r.filtersOperator.toLowerCase(), i = 0; i < o.filters.length; i++) y.isNull(o.filters[i]) || (a++, e = "and" === r.filtersOperator.toLowerCase() ? e && y.exec(o.filters[i], [n, o.heads]) : e || y.exec(o.filters[i], [n, o.heads]));
                        0 === a && (e = !0)
                    } else e = !0;
                    return 0 < o.searchFields.length ? w.each(o.heads, function (e, t) {
                        -1 < o.searchFields.indexOf(t.name) && (s += "•" + n[e])
                    }) : s = n.join("•"), s = s.replace(/[\n\r]+|[\s]{2,}/g, " ").trim().toLowerCase(), t = !(y.isValue(o.searchString) && o.searchString.length >= r.searchMinLength) || ~s.indexOf(o.searchString), (e = e && t) ? o._fireEvent("filter-row-accepted", {
                        row: n
                    }) : o._fireEvent("filter-row-declined", {
                        row: n
                    }), e
                }) : this.items;
            return this._fireEvent("search", {
                search: o.searchString,
                items: e
            }), this.filteredItems = e
        },
        _draw: function (e) {
            var t, n, i, s, a, o, r, l, c, d = this,
                u = this.element,
                h = this.options,
                p = u.find("tbody"),
                f = -1 === parseInt(h.rows) ? 0 : h.rows * (this.currentPage - 1),
                m = -1 === parseInt(h.rows) ? this.items.length - 1 : f + h.rows - 1,
                v = [],
                g = b.storage.getItem(h.checkStoreKey.replace("$1", u.attr("id"))),
                C = h.staticView ? this.viewDefault : this.view;
            if (p.html(""), this.heads.length) {
                if (c = this._filter(), this.currentSlice = c.slice(f, 1 + m), v = [], 0 < c.length) {
                    for (t = f; t <= m; t++)
                        if (o = c[t], r = [], y.isValue(o)) {
                            for ((i = w("<tr>").addClass(h.clsBodyRow)).data("original", o), l = t % 2 == 0, s = w("<td>").html(t + 1), void 0 !== d.service[0].clsColumn && s.addClass(d.service[0].clsColumn), s.appendTo(i), s = w("<td>"), a = "checkbox" === h.checkType ? w("<input type='checkbox' data-style='" + h.checkStyle + "' data-role='checkbox' name='" + (y.isValue(h.checkName) ? h.checkName : "table_row_check") + "[]' value='" + c[t][h.checkColIndex] + "'>") : w("<input type='radio' data-style='" + h.checkStyle + "' data-role='radio' name='" + (y.isValue(h.checkName) ? h.checkName : "table_row_check") + "' value='" + c[t][h.checkColIndex] + "'>"), y.isValue(g) && Array.isArray(g) && -1 < g.indexOf("" + c[t][h.checkColIndex]) && (a.prop("checked", !0), v.push(o)), a.addClass("table-service-check"), this._fireEvent("check-draw", {
                                    check: a
                                }), a.appendTo(s), void 0 !== d.service[1].clsColumn && s.addClass(d.service[1].clsColumn), s.appendTo(i), n = 0; n < o.length; n++) r[n] = null;
                            for (w.each(o, function (e) {
                                    var t = this,
                                        n = w("<td>");
                                    y.isValue(d.heads[e].template) && (t = d.heads[e].template.replace(/%VAL%/g, t)), n.html(t), n.addClass(h.clsBodyCell), y.isValue(d.heads[e].clsColumn) && n.addClass(d.heads[e].clsColumn), !1 === y.bool(C[e].show) && n.addClass("hidden"), y.bool(C[e].show) && n.removeClass("hidden"), n.data("original", this), r[C[e]["index-view"]] = n, d._fireEvent("draw-cell", {
                                        td: n,
                                        val: t,
                                        cellIndex: e,
                                        head: d.heads[e],
                                        items: o
                                    }), !0 === h.cellWrapper && (t = w("<div>").addClass("data-wrapper").addClass(h.clsCellWrapper).html(n.html()), n.html("").append(t))
                                }), n = 0; n < o.length; n++) r[n].appendTo(i), d._fireEvent("append-cell", {
                                td: r[n],
                                tr: i,
                                index: n
                            });
                            d._fireEvent("draw-row", {
                                tr: i,
                                view: d.view,
                                heads: d.heads,
                                items: o
                            }), i.addClass(h.clsRow).addClass(l ? h.clsEvenRow : h.clsOddRow).appendTo(p), d._fireEvent("append-row", {
                                tr: i
                            })
                        } w(this.component).find(".table-service-check-all input").prop("checked", v.length)
                } else n = 0, w.each(C, function () {
                    this.show && n++
                }), !0 === h.check && n++, !0 === h.rownum && n++, i = w("<tr>").addClass(h.clsBodyRow).appendTo(p), (s = w("<td>").attr("colspan", n).addClass("text-center").html(w("<span>").addClass(h.clsEmptyTableTitle).html(h.emptyTableTitle || d.locale.table.empty))).appendTo(i);
                this._info(1 + f, 1 + m, c.length), this._paging(c.length), this.activity && this.activity.hide(), this._fireEvent("draw"), void 0 !== e && y.exec(e, null, u[0])
            } else console.warn("Heads is not defined for table ID " + u.attr("id"))
        },
        _getItemContent: function (e) {
            var t = this.options,
                n = e[this.sort.colIndex],
                i = this.heads[this.sort.colIndex].format,
                s = y.isNull(this.heads) || y.isNull(this.heads[this.sort.colIndex]) || !y.isValue(this.heads[this.sort.colIndex].formatMask) ? "%Y-%m-%d" : this.heads[this.sort.colIndex].formatMask,
                a = (this.heads && this.heads[this.sort.colIndex] && this.heads[this.sort.colIndex].thousandSeparator ? this.heads[this.sort.colIndex] : t).thousandSeparator,
                e = (this.heads && this.heads[this.sort.colIndex] && this.heads[this.sort.colIndex].decimalSeparator ? this.heads[this.sort.colIndex] : t).decimalSeparator,
                o = ("" + n).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, " ").trim();
            if (y.isValue(o) && y.isValue(i)) switch (-1 !== ["number", "int", "float", "money"].indexOf(i) && (o = y.parseNumber(o, a, e)), i) {
                case "date":
                    o = s ? Datetime.from(o, s, t.locale) : datetime(o);
                    break;
                case "number":
                    o = +o;
                    break;
                case "int":
                    o = parseInt(o);
                    break;
                case "float":
                    o = parseFloat(o);
                    break;
                case "money":
                    o = y.parseMoney(o);
                    break;
                case "card":
                    o = y.parseCard(o);
                    break;
                case "phone":
                    o = y.parsePhone(o)
            }
            return o
        },
        addItem: function (e, t) {
            if (!Array.isArray(e)) return console.warn("Item is not an array and can't be added"), this;
            this.items.push(e), !1 !== t && this.draw()
        },
        addItems: function (e, t) {
            if (!Array.isArray(e)) return console.warn("Items is not an array and can't be added"), this;
            e.forEach(function (e) {
                Array.isArray(e) && this.items.push(e, !1)
            }), this.draw(), !1 !== t && this.draw()
        },
        updateItem: function (e, n, t) {
            var i = this.items[this.index[e]],
                s = null;
            return y.isNull(i) ? (console.warn("Item is undefined for update"), this) : (isNaN(n) && this.heads.forEach(function (e, t) {
                e.name === n && (s = t)
            }), y.isNull(s) ? console.warn("Item is undefined for update. Field " + n + " not found in data structure") : (i[s] = t, this.items[this.index[e]] = i), this)
        },
        getItem: function (e) {
            return this.items[this.index[e]]
        },
        deleteItem: function (e, t) {
            for (var n = [], i = y.isFunc(t), s = 0; s < this.items.length; s++) i ? y.exec(t, [this.items[s][e]]) && n.push(s) : this.items[s][e] === t && n.push(s);
            return this.items = y.arrayDeleteByMultipleKeys(this.items, n), this
        },
        deleteItemByName: function (e, t) {
            for (var n, i = [], s = y.isFunc(t), a = 0; a < this.heads.length; a++)
                if (this.heads[a].name === e) {
                    n = a;
                    break
                } for (a = 0; a < this.items.length; a++) s ? y.exec(t, [this.items[a][n]]) && i.push(a) : this.items[a][n] === t && i.push(a);
            return this.items = y.arrayDeleteByMultipleKeys(this.items, i), this
        },
        draw: function () {
            return this._draw(), this
        },
        sorting: function (e) {
            var a = this;
            return y.isValue(e) && (this.sort.dir = e), this._fireEvent("sort-start", {
                items: this.items
            }), this.items.sort(function (e, t) {
                var n = a._getItemContent(e),
                    i = a._getItemContent(t),
                    s = 0;
                return n < i && (s = "asc" === a.sort.dir ? -1 : 1), i < n && (s = "asc" === a.sort.dir ? 1 : -1), 0 !== s && a._fireEvent("sort-item-switch", {
                    a: e,
                    b: t,
                    result: s
                }), s
            }), this._fireEvent("sort-stop", {
                items: this.items
            }), this
        },
        search: function (e) {
            return this.searchString = e.trim().toLowerCase(), this.currentPage = 1, this._draw(), this
        },
        _rebuild: function (e) {
            var t = this,
                n = this.element,
                i = !1;
            this._createIndex(), !0 === e && (this.view = this._createView()), this._createTableHeader(), this._createTableBody(), this._createTableFooter(), 0 < this.heads.length && w.each(this.heads, function (e) {
                !i && -1 < ["asc", "desc"].indexOf(this.sortDir) && (i = !0, t.sort.colIndex = e, t.sort.dir = this.sortDir)
            }), i && (n = n.find(".sortable-column"), this._resetSortClass(n), w(n.get(t.sort.colIndex)).addClass("sort-" + t.sort.dir), this.sorting()), t.currentPage = 1, t._draw()
        },
        setHeads: function (e) {
            return this.heads = e, this
        },
        setHeadItem: function (e, t) {
            for (var n, i = 0; i < this.heads.length; i++)
                if (this.heads[i].name === e) {
                    n = i;
                    break
                } return this.heads[n] = t, this
        },
        setItems: function (e) {
            return this.items = e, this
        },
        setData: function (e) {
            var t = this.options;
            return this.items = [], this.heads = [], this.foots = [], Array.isArray(t.head) && (this.heads = t.head), Array.isArray(t.body) && (this.items = t.body), this._createItemsFromJSON(e), this._rebuild(!0), this
        },
        loadData: function (e, t) {
            var n = this,
                i = this.element,
                s = this.options;
            y.isValue(t) || (t = !0), i.html(""), y.isValue(e) ? (s.source = e, this._fireEvent("data-load", {
                source: s.source
            }), n.activity.show(function () {
                fetch(s.source).then(b.fetch.status).then(b.fetch.json).then(function (e) {
                    n.activity.hide(), n.items = [], n.heads = [], n.foots = [], n._fireEvent("data-loaded", {
                        source: s.source,
                        data: e
                    }), Array.isArray(s.head) && (n.heads = s.head), Array.isArray(s.body) && (n.items = s.body), n._createItemsFromJSON(e), n._rebuild(t), n._resetInspector(), n._fireEvent("data-load-end", {
                        source: s.source,
                        data: e
                    })
                }).catch(function (e) {
                    n.activity.hide(), n._fireEvent("data-load-error", {
                        source: s.source,
                        error: e
                    })
                })
            })) : this._rebuild(t)
        },
        reload: function (e) {
            this.loadData(this.options.source, e)
        },
        clear: function () {
            return this.items = [], this.draw()
        },
        next: function () {
            if (0 !== this.items.length) {
                if (this.currentPage++, !(this.currentPage > this.pagesCount)) return this._draw(), this;
                this.currentPage = this.pagesCount
            }
        },
        prev: function () {
            if (0 !== this.items.length) {
                if (this.currentPage--, 0 !== this.currentPage) return this._draw(), this;
                this.currentPage = 1
            }
        },
        first: function () {
            if (0 !== this.items.length) return this.currentPage = 1, this._draw(), this
        },
        last: function () {
            if (0 !== this.items.length) return this.currentPage = this.pagesCount, this._draw(), this
        },
        page: function (e) {
            return e <= 0 && (e = 1), e > this.pagesCount && (e = this.pagesCount), this.currentPage = e, this._draw(), this
        },
        addFilter: function (e, t) {
            var n, i = null,
                s = y.isFunc(e);
            if (!1 !== s) {
                for (n = 0; n < this.filters.length; n++)
                    if (y.isNull(this.filters[n])) {
                        i = n, this.filters[n] = s;
                        break
                    } return y.isNull(i) && (this.filters.push(s), i = this.filters.length - 1), !0 === t && (this.currentPage = 1, this.draw()), i
            }
        },
        removeFilter: function (e, t) {
            return !(this.filters[e] = null) === t && (this.currentPage = 1, this.draw()), this
        },
        removeFilters: function (e) {
            return this.filters = [], !0 === e && (this.currentPage = 1, this.draw()), this
        },
        getItems: function () {
            return this.items
        },
        getHeads: function () {
            return this.heads
        },
        getView: function () {
            return this.view
        },
        getFilteredItems: function () {
            return 0 < this.filteredItems.length ? this.filteredItems : this.items
        },
        getSelectedItems: function () {
            var e = this.element,
                t = this.options,
                n = b.storage.getItem(t.checkStoreKey.replace("$1", e.attr("id"))),
                i = [];
            return y.isValue(n) ? (w.each(this.items, function () {
                -1 !== n.indexOf("" + this[t.checkColIndex]) && i.push(this)
            }), i) : []
        },
        getStoredKeys: function () {
            var e = this.element,
                t = this.options;
            return b.storage.getItem(t.checkStoreKey.replace("$1", e.attr("id")), [])
        },
        clearSelected: function (e) {
            var t = this.element,
                n = this.options;
            b.storage.setItem(n.checkStoreKey.replace("$1", t.attr("id")), []), t.find("table-service-check-all input").prop("checked", !1), !0 === e && this._draw()
        },
        getFilters: function () {
            return this.filters
        },
        getFiltersIndexes: function () {
            return this.filtersIndexes
        },
        openInspector: function (e) {
            var t = this.inspector;
            e ? t.show(0, function () {
                t.css({
                    top: (w(window).height() - t.outerHeight(!0)) / 2 + pageYOffset,
                    left: (w(window).width() - t.outerWidth(!0)) / 2 + pageXOffset
                }).data("open", !0)
            }) : t.hide().data("open", !1)
        },
        closeInspector: function () {
            this.openInspector(!1)
        },
        toggleInspector: function () {
            this.openInspector(!this.inspector.data("open"))
        },
        resetView: function () {
            this.view = this._createView(), this._createTableHeader(), this._createTableFooter(), this._draw(), this._resetInspector(), this._saveTableView()
        },
        rebuildIndex: function () {
            this._createIndex()
        },
        getIndex: function () {
            return this.index
        },
        export: function (e, t, n, i) {
            var s, a, o, r, l, c, d, u, h = b.export,
                p = this,
                f = this.options,
                m = document.createElement("table"),
                v = w("<thead>").appendTo(m),
                g = w("<tbody>").appendTo(m),
                C = [];
            if ("function" == typeof h.tableToCSV) {
                for (t = y.isValue(t) ? t.toLowerCase() : "all-filtered", n = y.isValue(n) ? n : y.elementId("table") + "-export.csv", l = w("<tr>"), o = this.heads, a = 0; a < o.length; a++) C[a] = null;
                for (w.each(o, function (e) {
                        !1 !== y.bool(p.view[e].show) && (c = w("<th>"), y.isValue(this.title) && c.html(this.title), C[p.view[e]["index-view"]] = c)
                    }), a = 0; a < o.length; a++) y.isValue(C[a]) && C[a].appendTo(l);
                for (l.appendTo(v), u = "checked" === t ? (d = 0, (r = this.getSelectedItems()).length - 1) : "view" === t ? (r = this._filter(), d = -1 === parseInt(f.rows) ? 0 : f.rows * (this.currentPage - 1), -1 === parseInt(f.rows) ? r.length - 1 : d + f.rows - 1) : "all" === t ? (d = 0, (r = this.items).length - 1) : (d = 0, (r = this._filter()).length - 1), s = d; s <= u; s++)
                    if (y.isValue(r[s])) {
                        for (l = w("<tr>"), o = r[s], a = 0; a < o.length; a++) C[a] = null;
                        for (w.each(o, function (e) {
                                !1 !== y.bool(p.view[e].show) && (c = w("<td>").html(this), C[p.view[e]["index-view"]] = c)
                            }), a = 0; a < o.length; a++) y.isValue(C[a]) && C[a].appendTo(l);
                        l.appendTo(g)
                    } h.tableToCSV(m, n, i), m.remove()
            }
        },
        changeAttribute: function (e) {
            var t = this,
                n = this.element,
                i = this.options;
            switch (e) {
                case "data-check":
                    i.check = y.bool(n.attr("data-check")), t._service(), t._createTableHeader(), t._draw();
                    break;
                case "data-rownum":
                    i.rownum = y.bool(n.attr("data-rownum")), t._service(), t._createTableHeader(), t._draw()
            }
        },
        destroy: function () {
            var e = this.element,
                t = e.closest(".table-component"),
                n = t.find("input"),
                i = t.find("select");
            return n.data("input").destroy(), i.data("select").destroy(), w(window).off(b.events.resize, {
                ns: this.id
            }), e.off(b.events.click, ".sortable-column"), e.off(b.events.click, ".table-service-check input"), e.off(b.events.click, ".table-service-check-all input"), n.off(b.events.inputchange), !y.isValue(this.wrapperSearch) || 0 < (n = this.wrapperSearch.find("input")).length && n.off(b.events.inputchange), t.off(b.events.click, ".pagination .page-link"), y.isValue(this.wrapperPagination) && this.wrapperPagination.off(b.events.click, ".pagination .page-link"), e.off(b.events.click, ".js-table-crud-button"), this._removeInspectorEvents(), e
        }
    })
}(Metro, m4q),
function (t, d) {
    "use strict";
    var u = t.utils,
        n = {
            wheelStep: 20,
            materialtabsDeferred: 0,
            deep: !1,
            fixedTabs: !1,
            duration: 300,
            appBar: !1,
            clsComponent: "",
            clsTabs: "",
            clsTab: "",
            clsTabActive: "",
            clsMarker: "",
            onBeforeTabOpen: t.noop_true,
            onTabOpen: t.noop,
            onTabsScroll: t.noop,
            onTabsCreate: t.noop
        };
    t.materialTabsSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroMaterialTabsSetup, t.materialTabsSetup(window.metroMaterialTabsSetup), t.Component("material-tabs", {
        init: function (e, t) {
            return this._super(t, e, n, {
                marker: null,
                scroll: 0,
                scrollDir: "left"
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("tabs-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options,
                n = e.find("li"),
                i = e.find("li.active"),
                s = d("<div>").addClass("tabs-material-wrapper").addClass(t.clsComponent).insertBefore(e);
            !0 === t.appBar && s.addClass("app-bar-present"), "more" === t.appBar && s.addClass("app-bar-present-more"), e.appendTo(s), e.addClass("tabs-material").addClass(t.clsTabs), n.addClass(t.clsTab), !0 === t.deep && e.addClass("deep"), !0 === t.fixedTabs && e.addClass("fixed-tabs"), this.marker = e.find(".tab-marker"), 0 === this.marker.length && (this.marker = d("<span>").addClass("tab-marker").addClass(t.clsMarker).appendTo(e)), this.openTab((0 === i.length ? n : i)[0])
        },
        _createEvents: function () {
            var s = this,
                a = this.element,
                o = this.options;
            a.on(t.events.click, "li", function (e) {
                var t = d(this),
                    n = a.find("li.active"),
                    i = t.index() > n.index(),
                    n = t.children("a").attr("href");
                e.preventDefault(), u.isValue(n) && "#" === n[0] && (t.hasClass("active") || t.hasClass("disabled") || !1 !== u.exec(o.onBeforeTabOpen, [t, n, i], this) && s.openTab(t, i))
            }), a.on(t.events.scroll, function () {
                var e = s.scroll;
                s.scrollDir = s.scroll < a[0].scrollLeft ? "left" : "right", s.scroll = a[0].scrollLeft, s._fireEvent("tabs-scroll", {
                    scrollLeft: a[0].scrollLeft,
                    oldScroll: e,
                    scrollDir: s.scrollDir
                })
            }), a.on(t.events.mousewheel, function (e) {
                var t, n;
                void 0 !== e.deltaY && (t = d(this), n = 0 < e.deltaY ? -1 : 1, e = o.wheelStep, e = t.scrollLeft() - n * e, t.scrollLeft(e))
            })
        },
        openTab: function (e, t) {
            var n, i, s, a, o, r = this.element,
                l = this.options,
                c = r.find("li");
            e = d(e), d.each(c, function () {
                var e = d(this).find("a").attr("href");
                u.isValue(e) && "#" === e[0] && 1 < e.length && d(e).hide()
            }), i = r.width(), o = r.scrollLeft(), n = (a = e.position().left) + (s = e.width()), c.removeClass("active").removeClass(l.clsTabActive), e.addClass("active").addClass(l.clsTabActive), o = i + o < n + 52 ? o + 104 : a < o ? a - 104 : o, r.animate({
                draw: {
                    scrollLeft: o
                },
                dur: l.duration
            }), this.marker.animate({
                draw: {
                    left: a,
                    width: s
                },
                dur: l.duration
            }), l = e.find("a").attr("href"), u.isValue(l) && "#" === l[0] && 1 < l.length && d(l).show(), this._fireEvent("tab-open", {
                tab: e[0],
                target: l,
                tab_next: t
            })
        },
        open: function (e) {
            var t = this.element,
                n = t.find("li"),
                t = t.find("li.active"),
                e = n.eq(e - 1),
                t = n.index(e) > n.index(t);
            this.openTab(e, t)
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element;
            return e.off(t.events.click, "li"), e.off(t.events.scroll), e
        }
    })
}(Metro, m4q),
function (r, l) {
    "use strict";
    var c = r.utils,
        n = {
            tabsDeferred: 0,
            expand: !1,
            expandPoint: null,
            tabsPosition: "top",
            tabsType: "default",
            clsTabs: "",
            clsTabsList: "",
            clsTabsListItem: "",
            clsTabsListItemActive: "",
            onTab: r.noop,
            onBeforeTab: r.noop_true,
            onTabsCreate: r.noop
        };
    r.tabsSetup = function (e) {
        n = l.extend({}, n, e)
    }, window.metroTabsSetup, r.tabsSetup(window.metroTabsSetup), r.Component("tabs", {
        init: function (e, t) {
            return this._super(t, e, n, {
                _targets: [],
                id: c.elementId("tabs")
            }), this
        },
        _create: function () {
            var e = this.element,
                t = 0 < e.find(".active").length ? l(e.find(".active")[0]) : void 0;
            this._createStructure(), this._createEvents(), this._open(t), this._fireEvent("tabs-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t = this.element,
                n = this.options,
                i = t.parent(),
                s = i.hasClass("tabs"),
                i = s ? i : l("<div>").addClass("tabs tabs-wrapper");
            if (i.addClass(n.tabsPosition.replace(["-", "_", "+"], " ")), t.addClass("tabs-list"), "default" !== n.tabsType && t.addClass("tabs-" + n.tabsType), s || (i.insertBefore(t), t.appendTo(i)), t.data("expanded", !1), s = l("<div>").addClass("expand-title"), i.prepend(s), 0 === (e = i.find(".hamburger")).length) {
                e = l("<button>").attr("type", "button").addClass("hamburger menu-down").appendTo(i);
                for (var a = 0; a < 3; a++) l("<span>").addClass("line").appendTo(e);
                !0 === r.colors.isLight(c.getStyleOne(i, "background-color")) && e.addClass("dark")
            }
            i.addClass(n.clsTabs), t.addClass(n.clsTabsList), t.children("li").addClass(n.clsTabsListItem), (!0 === n.expand && !n.tabsPosition.includes("vertical") || c.isValue(n.expandPoint) && c.mediaExist(n.expandPoint) && !n.tabsPosition.includes("vertical")) && i.addClass("tabs-expand"), n.tabsPosition.includes("vertical") && i.addClass("tabs-expand")
        },
        _createEvents: function () {
            var i = this,
                s = this.element,
                a = this.options,
                o = s.parent();
            l(window).on(r.events.resize, function () {
                a.tabsPosition.includes("vertical") || (!0 !== a.expand || a.tabsPosition.includes("vertical") ? c.isValue(a.expandPoint) && c.mediaExist(a.expandPoint) && !a.tabsPosition.includes("vertical") ? o.hasClass("tabs-expand") || o.addClass("tabs-expand") : o.hasClass("tabs-expand") && o.removeClass("tabs-expand") : o.addClass("tabs-expand"))
            }, {
                ns: this.id
            }), o.on(r.events.click, ".hamburger, .expand-title", function () {
                !1 === s.data("expanded") ? (s.addClass("expand"), s.data("expanded", !0), o.find(".hamburger").addClass("active")) : (s.removeClass("expand"), s.data("expanded", !1), o.find(".hamburger").removeClass("active"))
            }), s.on(r.events.click, "a", function (e) {
                var t = l(this),
                    n = t.attr("href").trim(),
                    t = t.parent("li");
                if (t.hasClass("active") && e.preventDefault(), !0 === s.data("expanded") && (s.removeClass("expand"), s.data("expanded", !1), o.find(".hamburger").removeClass("active")), !0 !== c.exec(a.onBeforeTab, [t, s], t[0])) return !1;
                c.isValue(n) && "#" === n[0] && (i._open(t), e.preventDefault())
            })
        },
        _collectTargets: function () {
            var t = this,
                e = this.element.find("li");
            this._targets = [], l.each(e, function () {
                var e = l(this).find("a").attr("href").trim();
                1 < e.length && "#" === e[0] && t._targets.push(e)
            })
        },
        _open: function (e) {
            var t = this.element,
                n = this.options,
                i = t.find("li"),
                s = t.siblings(".expand-title");
            0 !== i.length && (this._collectTargets(), void 0 === e && (e = l(i[0])), void 0 !== (t = e.find("a").attr("href")) && (i.removeClass("active").removeClass(n.clsTabsListItemActive), (e.parent().hasClass("d-menu") ? e.parent().parent() : e).addClass("active"), l.each(this._targets, function () {
                var e = l(this);
                0 < e.length && e.hide()
            }), "#" !== t && "#" === t[0] && l(t).show(), s.html(e.find("a").html()), e.addClass(n.clsTabsListItemActive), this._fireEvent("tab", {
                tab: e[0]
            })))
        },
        next: function () {
            var e = this.element.find("li.active").next("li");
            0 < e.length && this._open(e)
        },
        prev: function () {
            var e = this.element.find("li.active").prev("li");
            0 < e.length && this._open(e)
        },
        open: function (e) {
            var t = this.element.find("li");
            c.isValue(e) || (e = 1), c.isInt(e) ? c.isValue(t[e - 1]) && this._open(l(t[e - 1])) : this._open(l(e))
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element,
                t = e.parent();
            return l(window).off(r.events.resize, {
                ns: this.id
            }), t.off(r.events.click, ".hamburger, .expand-title"), e.off(r.events.click, "a"), e
        }
    })
}(Metro, m4q),
function (l, c) {
    "use strict";
    var d = l.utils,
        n = {
            autocomplete: null,
            autocompleteUnique: !0,
            autocompleteUrl: null,
            autocompleteUrlMethod: "GET",
            autocompleteUrlKey: null,
            autocompleteDivider: ",",
            autocompleteListHeight: 200,
            label: "",
            size: "normal",
            taginputDeferred: 0,
            static: !1,
            clearButton: !0,
            clearButtonIcon: "<span class='default-icon-cross'></span>",
            randomColor: !1,
            maxTags: 0,
            tagSeparator: ",",
            tagTrigger: "Enter, Space, Comma",
            backspace: !0,
            clsComponent: "",
            clsInput: "",
            clsClearButton: "",
            clsTag: "",
            clsTagTitle: "",
            clsTagRemover: "",
            clsLabel: "",
            onBeforeTagAdd: l.noop_true,
            onTagAdd: l.noop,
            onBeforeTagRemove: l.noop_true,
            onTagRemove: l.noop,
            onTag: l.noop,
            onClear: l.noop,
            onTagTrigger: l.noop,
            onTagInputCreate: l.noop
        };
    l.tagInputSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroTagInputSetup, l.tagInputSetup(window.metroTagInputSetup), l.Component("tag-input", {
        init: function (e, t) {
            return this._super(t, e, n, {
                values: [],
                triggers: [],
                autocomplete: []
            }), this
        },
        _create: function () {
            this.triggers = ("" + this.options.tagTrigger).toArray(","), (this.triggers.includes("Space") || this.triggers.includes("Spacebar")) && (this.triggers.push(" "), this.triggers.push("Spacebar")), this.triggers.includes("Comma") && this.triggers.push(","), this._createStructure(), this._createEvents(), this._fireEvent("tag-input-create", {
                element: this.element
            })
        },
        _createStructure: function () {
            var e = this,
                t = this.element,
                i = this.options,
                n = t.val().trim(),
                s = c("<div>").addClass("tag-input " + t[0].className).addClass(i.clsComponent).insertBefore(t);
            t.appendTo(s), s.addClass("input-" + i.size), t[0].className = "", t.addClass("original-input"), c("<input type='text'>").addClass("input-wrapper").addClass(i.clsInput).attr("size", 1).appendTo(s), !1 === i.clearButton || t[0].readOnly || (s.addClass("padding-for-clear"), c("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(i.clearButtonIcon).appendTo(s)), d.isValue(n) && c.each(n.toArray(i.tagSeparator), function () {
                e._addTag(this)
            }), i.label && (n = c("<label>").addClass("label-for-input").addClass(i.clsLabel).html(i.label).insertBefore(s), t.attr("id") && n.attr("for", t.attr("id")), "rtl" === t.attr("dir") && n.addClass("rtl")), t.is(":disabled") ? this.disable() : this.enable(), !0 !== i.static && void 0 === t.attr("readonly") || s.addClass("static-mode"), d.isNull(i.autocomplete) && d.isNull(i.autocompleteUrl) || c("<div>").addClass("autocomplete-list").css({
                maxHeight: i.autocompleteListHeight,
                display: "none"
            }).appendTo(s), d.isValue(i.autocomplete) && (s = d.isObject(i.autocomplete), this.autocomplete = !1 !== s ? s : i.autocomplete.toArray(i.autocompleteDivider)), d.isValue(i.autocompleteUrl) && fetch(i.autocompleteUrl, {
                method: i.autocompleteUrlMethod
            }).then(function (e) {
                return e.text()
            }).then(function (t) {
                var n = [];
                try {
                    n = JSON.parse(t), i.autocompleteUrlKey && (n = n[i.autocompleteUrlKey])
                } catch (e) {
                    n = t.split("\n")
                }
                e.autocomplete = e.autocomplete.concat(n)
            })
        },
        _createEvents: function () {
            var i = this,
                s = this.element,
                a = this.options,
                e = s.closest(".tag-input"),
                o = e.find(".input-wrapper"),
                t = e.find(".autocomplete-list");
            o.on(l.events.focus, function () {
                e.addClass("focused")
            }), o.on(l.events.blur, function () {
                e.removeClass("focused")
            }), o.on(l.events.inputchange, function () {
                o.attr("size", Math.ceil(o.val().length / 2) + 2)
            }), o.on(l.events.keydown, function (e) {
                var t = o.val().trim(),
                    n = e.key;
                "Enter" === n && e.preventDefault(), !0 !== a.backspace || "Backspace" !== n || 0 !== t.length ? "" !== t && i.triggers.includes(n) && (i._fireEvent("tag-trigger", {
                    key: n
                }), o.val(""), i._addTag(t), o.attr("size", 1)) : 0 < i.values.length && (i.values.splice(-1, 1), s.siblings(".tag").last().remove(), s.val(i.values.join(a.tagSeparator)))
            }), o.on(l.events.keyup, function (e) {
                var t = o.val(),
                    e = e.key;
                i.triggers.includes(e) && t[t.length - 1] === e && o.val(t.slice(0, -1))
            }), e.on(l.events.click, ".tag .remover", function () {
                var e = c(this).closest(".tag");
                i._delTag(e)
            }), e.on(l.events.click, function () {
                o.focus()
            }), e.on(l.events.click, ".input-clear-button", function () {
                var e = s.val();
                i.clear(), i._fireEvent("clear", {
                    val: e
                })
            }), o.on(l.events.input, function () {
                var e = this.value.toLowerCase();
                i._drawAutocompleteList(e)
            }), e.on(l.events.click, ".autocomplete-list .item", function () {
                var e = c(this).attr("data-autocomplete-value");
                o.val(""), i._addTag(e), o.attr("size", 1), t.css({
                    display: "none"
                }), i._fireEvent("autocomplete-select", {
                    value: e
                })
            })
        },
        _drawAutocompleteList: function (n) {
            var i = this,
                e = this.element,
                s = this.options,
                t = e.closest(".tag-input"),
                e = t.find(".input-wrapper"),
                a = t.find(".autocomplete-list");
            0 !== a.length && (a.html(""), t = this.autocomplete.filter(function (e) {
                return -1 < e.toLowerCase().indexOf(n)
            }), a.css({
                display: 0 < t.length ? "block" : "none",
                left: e.position().left
            }), c.each(t, function () {
                var e, t;
                s.autocompleteUnique && -1 !== i.values.indexOf(this) || (t = this.toLowerCase().indexOf(n), e = c("<div>").addClass("item").attr("data-autocomplete-value", this), t = 0 === t ? "<strong>" + this.substr(0, n.length) + "</strong>" + this.substr(n.length) : this.substr(0, t) + "<strong>" + this.substr(t, n.length) + "</strong>" + this.substr(t + n.length), e.html(t).appendTo(a), i._fireEvent("draw-autocomplete-item", {
                    item: e
                }))
            }))
        },
        _addTag: function (e) {
            var t, n, i, s = this.element,
                a = this.options,
                o = s.closest(".tag-input"),
                r = o.find(".input-wrapper");
            o.hasClass("input-large") ? t = "large" : o.hasClass("input-small") && (t = "small"), 0 < a.maxTags && this.values.length === a.maxTags || "" !== ("" + e).trim() && d.exec(a.onBeforeTagAdd, [e, this.values], s[0]) && ((i = c("<span>").addClass("tag").addClass(t).addClass(a.clsTag).insertBefore(r)).data("value", e), (a.static || o.hasClass("static-mode") || s.readonly || s.disabled || o.hasClass("disabled")) && i.addClass("static"), n = c("<span>").addClass("title").addClass(a.clsTagTitle).html(e), t = c("<span>").addClass("remover").addClass(a.clsTagRemover).html("&times;"), n.appendTo(i), t.appendTo(i), !0 === a.randomColor && (o = (r = l.colors.colors(l.colors.PALETTES.ALL))[c.random(0, r.length - 1)], n = l.colors.darken(o, 15), r = l.colors.isDark(o) ? "#ffffff" : "#000000", i.css({
                backgroundColor: o,
                color: r
            }), t.css({
                backgroundColor: n,
                color: r
            })), this.values.push(e), s.val(this.values.join(a.tagSeparator)), this._fireEvent("tag-add", {
                tag: i[0],
                val: e,
                values: this.values
            }), this._fireEvent("tag", {
                tag: i[0],
                val: e,
                values: this.values
            }))
        },
        _delTag: function (e) {
            var t = this.element,
                n = this.options,
                i = e.data("value");
            d.exec(n.onBeforeTagRemove, [e, i, this.values], t[0]) && (d.arrayDelete(this.values, i), t.val(this.values.join(n.tagSeparator)), this._fireEvent("tag-remove", {
                tag: e[0],
                val: i,
                values: this.values
            }), this._fireEvent("tag", {
                tag: e[0],
                val: i,
                values: this.values
            }), e.remove())
        },
        tags: function () {
            return this.values
        },
        val: function (e) {
            var t = this,
                n = this.element,
                i = this.options,
                s = n.closest(".tag-input"),
                n = [];
            return d.isValue(e) ? (this.values = [], s.find(".tag").remove(), "string" == typeof e ? n = ("" + e).toArray(i.tagSeparator) : Array.isArray(e) && (n = e), c.each(n, function () {
                t._addTag(this)
            }), this) : this.tags()
        },
        append: function (e) {
            var t = this,
                n = this.options,
                i = this.values;
            return "string" == typeof e ? i = ("" + e).toArray(n.tagSeparator) : Array.isArray(e) && (i = e), c.each(i, function () {
                t._addTag(this)
            }), this
        },
        clear: function () {
            var e = this.element,
                t = e.closest(".tag-input");
            return this.values = [], e.val("").trigger("change"), t.find(".tag").remove(), this
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        toggleStatic: function (e) {
            var t = this.element.closest(".tag-input"),
                e = d.isValue(e) ? d.bool(e) : !t.hasClass("static-mode");
            e ? t.addClass("static-mode") : t.removeClass("static-mode")
        },
        setAutocompleteList: function (e) {
            var t = d.isObject(e);
            !1 !== t ? this.autocomplete = t : "string" == typeof e && (this.autocomplete = e.toArray(this.options.autocompleteDivider))
        },
        changeAttribute: function (e) {
            var t, n = this,
                i = this.element,
                s = this.options;
            switch (e) {
                case "value":
                    t = i.attr("value").trim(), n.clear(), d.isValue(t) && n.val(t.toArray(s.tagSeparator));
                    break;
                case "disabled":
                    this.toggleState();
                    break;
                case "static":
                    this.toggleStatic()
            }
        },
        destroy: function () {
            var e = this.element,
                t = e.closest(".tag-input"),
                n = t.find(".input-wrapper");
            return n.off(l.events.focus), n.off(l.events.blur), n.off(l.events.keydown), t.off(l.events.click, ".tag .remover"), t.off(l.events.click), e
        }
    }), c(document).on(l.events.click, function () {
        c(".tag-input .autocomplete-list").hide()
    })
}(Metro, m4q),
function (e, u) {
    "use strict";

    function i(e, t, n) {
        var i, s, a, o = "<%(.+?)%>",
            r = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
            l = "with(obj) { var r=[];\n",
            c = 0,
            d = function (e, t) {
                return l += t ? e.match(r) ? e + "\n" : "r.push(" + e + ");\n" : "" !== e ? 'r.push("' + e.replace(/"/g, '\\"') + '");\n' : "", d
            };
        for (h.isValue(n) && (u.hasProp(n, "beginToken") && (o = o.replace("<%", n.beginToken)), u.hasProp(n, "endToken") && (o = o.replace("%>", n.endToken))), a = (i = new RegExp(o, "g")).exec(e); a;) d(e.slice(c, a.index))(a[1], !0), c = a.index + a[0].length, a = i.exec(e);
        d(e.substr(c, e.length - c)), l = (l + 'return r.join(""); }').replace(/[\r\t\n]/g, " ");
        try {
            s = new Function("obj", l).apply(t, [t])
        } catch (e) {
            console.error("'" + e.message + "'", " in \n\nCode:\n", l, "\n")
        }
        return s
    }
    var h = e.utils,
        n = {
            templateData: null,
            onTemplateCompile: e.noop,
            onTemplateCreate: e.noop
        };
    e.templateSetup = function (e) {
        n = u.extend({}, n, e)
    }, window.metroTemplateSetup, e.templateSetup(window.metroTemplateSetup), e.Component("template", {
        init: function (e, t) {
            return this._super(t, e, n, {
                template: null,
                data: {}
            }), this
        },
        _compile: function () {
            var e = this.element,
                t = this.template.replace(/(&lt;%)/gm, "<%").replace(/(%&gt;)/gm, "%>").replace(/(&lt;)/gm, "<").replace(/(&gt;)/gm, ">"),
                n = i(t, this.data);
            e.html(n), this._fireEvent("template-compile", {
                template: t,
                compiled: n,
                element: e
            })
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.template = e.html(), this.data = h.isObject(t.templateData) || {}, this._compile(), this._fireEvent("template-create", {
                element: e
            })
        },
        buildWith: function (e) {
            e = h.isObject(e);
            e && (this.data = e, this._compile())
        },
        changeAttribute: function (e, t) {
            "data-template-data" === e && (this.options.templateData = t, this.data = h.isObject(t) || {}, this._compile())
        },
        destroy: function () {
            return this.element
        }
    }), e.template = i
}(Metro, m4q),
function (o, d) {
    "use strict";
    var u = o.utils,
        n = {
            label: "",
            textareaDeferred: 0,
            charsCounter: null,
            charsCounterTemplate: "$1",
            defaultValue: "",
            prepend: "",
            append: "",
            copyInlineStyles: !1,
            clearButton: !0,
            clearButtonIcon: "<span class='default-icon-cross'></span>",
            autoSize: !0,
            maxHeight: 0,
            clsPrepend: "",
            clsAppend: "",
            clsComponent: "",
            clsTextarea: "",
            clsLabel: "",
            onChange: o.noop,
            onTextareaCreate: o.noop
        };
    o.textareaSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroTextareaSetup, o.textareaSetup(window.metroTextareaSetup), o.Component("textarea", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this.element;
            this._createStructure(), this._createEvents(), this._fireEvent("textarea-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t, n = this,
                i = this.element,
                s = this.elem,
                a = this.options,
                o = d("<div>").addClass("textarea " + i[0].className),
                r = d("<textarea>").addClass("fake-textarea");
            if (o.insertBefore(i), i.appendTo(o), r.appendTo(o), !1 === a.clearButton || i[0].readOnly || (e = d("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(a.clearButtonIcon)).appendTo(o), "rtl" === i.attr("dir") && o.addClass("rtl").attr("dir", "rtl"), "" !== a.prepend && d("<div>").html(a.prepend).addClass("prepend").addClass(a.clsPrepend).appendTo(o), "" !== a.append && ((t = d("<div>").html(a.append)).addClass("append").addClass(a.clsAppend).appendTo(o), e.css({
                    right: t.outerWidth() + 4
                })), !(s.className = "") === a.copyInlineStyles)
                for (var l = 0, c = s.style.length; l < c; l++) o.css(s.style[l], i.css(s.style[l]));
            u.isValue(a.defaultValue) && "" === i.val().trim() && i.val(a.defaultValue), o.addClass(a.clsComponent), i.addClass(a.clsTextarea), a.label && (t = d("<label>").addClass("label-for-input").addClass(a.clsLabel).html(a.label).insertBefore(o), i.attr("id") && t.attr("for", i.attr("id")), "rtl" === i.attr("dir") && t.addClass("rtl")), i.is(":disabled") ? this.disable() : this.enable(), r.val(i.val()), !0 === a.autoSize && (o.addClass("autosize no-scroll-vertical"), setTimeout(function () {
                n.resize()
            }, 100))
        },
        _createEvents: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.closest(".textarea"),
                s = i.find(".fake-textarea"),
                a = d(n.charsCounter);
            i.on(o.events.click, ".input-clear-button", function () {
                t.val(u.isValue(n.defaultValue) ? n.defaultValue : "").trigger("change").trigger("keyup").focus()
            }), n.autoSize && t.on(o.events.inputchange + " " + o.events.keyup, function () {
                s.val(this.value), e.resize()
            }), t.on(o.events.blur, function () {
                i.removeClass("focused")
            }), t.on(o.events.focus, function () {
                i.addClass("focused")
            }), t.on(o.events.keyup, function () {
                u.isValue(n.charsCounter) && 0 < a.length && ("INPUT" === a[0].tagName ? a.val(e.length()) : a.html(n.charsCounterTemplate.replace("$1", e.length()))), e._fireEvent("change", {
                    val: t.val(),
                    length: e.length()
                })
            })
        },
        resize: function () {
            var e = this.element,
                t = this.options,
                n = e.closest(".textarea"),
                i = n.find(".fake-textarea"),
                s = i[0].scrollHeight;
            t.maxHeight && s >= t.maxHeight ? n.removeClass("no-scroll-vertical") : (t.maxHeight && s < t.maxHeight && n.addClass("no-scroll-vertical"), i[0].style.cssText = "height:auto;", i[0].style.cssText = "height:" + i[0].scrollHeight + "px", e[0].style.cssText = "height:" + i[0].scrollHeight + "px")
        },
        clear: function () {
            this.element.val("").trigger("change").trigger("keyup").focus()
        },
        toDefault: function () {
            this.element.val(u.isValue(this.options.defaultValue) ? this.options.defaultValue : "").trigger("change").trigger("keyup").focus()
        },
        length: function () {
            return this.elem.value.split("").length
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e) {
            "disabled" === e && this.toggleState()
        },
        destroy: function () {
            var e = this.element,
                t = this.options;
            return e.closest(".textarea").off(o.events.click, ".input-clear-button"), t.autoSize && e.off(o.events.inputchange + " " + o.events.keyup), e.off(o.events.blur), e.off(o.events.focus), e.off(o.events.keyup), e
        }
    })
}(Metro, m4q),
function (d, u) {
    "use strict";
    var c = d.utils,
        h = ["slide-up", "slide-down", "slide-left", "slide-right", "fade", "zoom", "swirl", "switch"],
        n = {
            tileDeferred: 0,
            size: "medium",
            cover: "",
            coverPosition: "center",
            effect: "",
            effectInterval: 3e3,
            effectDuration: 500,
            target: null,
            canTransform: !0,
            onTileClick: d.noop,
            onTileCreate: d.noop
        };
    d.tileSetup = function (e) {
        n = u.extend({}, n, e)
    }, window.metroTileSetup, d.tileSetup(window.metroTileSetup), d.Component("tile", {
        init: function (e, t) {
            return this._super(t, e, n, {
                effectInterval: !1,
                images: [],
                slides: [],
                currentSlide: -1,
                unload: !1
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createTile(), this._createEvents(), this._fireEvent("tile-create", {
                element: e
            })
        },
        _createTile: function () {
            var s = this,
                a = this.element,
                n = this.options,
                e = a.find(".slide"),
                t = a.find(".slide-front, .slide-back");
            if (a.addClass("tile-" + n.size), -1 < n.effect.indexOf("hover-") && (a.addClass("effect-" + n.effect), u.each(t, function () {
                    var e = u(this);
                    void 0 !== e.data("cover") && s._setCover(e, e.data("cover"), e.data("cover-position"))
                })), h.includes(n.effect) && 1 < e.length && (u.each(e, function (e) {
                    var t = u(this);
                    s.slides.push(this), void 0 !== t.data("cover") && s._setCover(t, t.data("cover"), t.data("cover-position")), 0 < e && (-1 < ["slide-up", "slide-down"].indexOf(n.effect) && t.css("top", "100%"), -1 < ["slide-left", "slide-right"].indexOf(n.effect) && t.css("left", "100%"), -1 < ["fade", "zoom", "swirl", "switch"].indexOf(n.effect) && t.css("opacity", 0))
                }), this.currentSlide = 0, this._runEffects()), "" !== n.cover && this._setCover(a, n.cover), "image-set" === n.effect) {
                a.addClass("image-set"), u.each(a.children("img"), function () {
                    s.images.push(this), u(this).remove()
                });
                for (var i = this.images.slice(), o = 0; o < 5; o++) {
                    var r = u.random(0, i.length - 1),
                        l = u("<div>").addClass("img -js-img-" + o).css("background-image", "url(" + i[r].src + ")");
                    a.prepend(l), i.splice(r, 1)
                }
                var c = [0, 1, 4, 3, 2];
                u.setInterval(function () {
                    var e = s.images.slice(),
                        t = d.colors.random();
                    a.css("background-color", t);
                    for (var n = 0; n < c.length; n++) {
                        var i = u.random(0, e.length - 1);
                        ! function (e, t, n) {
                            u.setTimeout(function () {
                                e.fadeOut(500, function () {
                                    e.css("background-image", "url(" + t + ")"), e.fadeIn()
                                })
                            }, 300 * n)
                        }(a.find(".-js-img-" + c[n]), e[i].src, n), e.splice(i, 1)
                    }
                    c = c.reverse()
                }, 5e3)
            }
        },
        _runEffects: function () {
            var n = this,
                i = this.options;
            !1 === this.effectInterval && (this.effectInterval = u.setInterval(function () {
                var e, t = u(n.slides[n.currentSlide]);
                n.currentSlide++, n.currentSlide === n.slides.length && (n.currentSlide = 0), e = n.slides[n.currentSlide], h.includes(i.effect) && d.animations[Cake.camelCase(i.effect)](u(t), u(e), {
                    duration: i.effectDuration
                })
            }, i.effectInterval))
        },
        _stopEffects: function () {
            u.clearInterval(this.effectInterval), this.effectInterval = !1
        },
        _setCover: function (e, t, n) {
            c.isValue(n) || (n = this.options.coverPosition), e.css({
                backgroundImage: "url(" + t + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: n
            })
        },
        _createEvents: function () {
            var o = this,
                r = this.element,
                l = this.options;
            r.on(d.events.startAll, function (e) {
                var t = u(this),
                    n = r.width(),
                    i = r.height(),
                    s = c.pageXY(e).x - t.offset().left,
                    a = c.pageXY(e).y - t.offset().top;
                !1 === c.isRightMouse(e) && (a = s < +n / 3 && (a < +i / 2 || +i / 2 < a) ? "left" : 2 * n / 3 < s && (a < +i / 2 || +i / 2 < a) ? "right" : +n / 3 < s && s < 2 * n / 3 && i / 2 < a ? "bottom" : "top", !0 === l.canTransform && t.addClass("transform-" + a), null !== l.target && setTimeout(function () {
                    document.location.href = l.target
                }, 100), o._fireEvent("tile-click", {
                    side: a
                }))
            }), r.on([d.events.stopAll, d.events.leave].join(" "), function () {
                u(this).removeClass("transform-left").removeClass("transform-right").removeClass("transform-top").removeClass("transform-bottom")
            })
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element;
            return e.off(d.events.startAll), e.off([d.events.stopAll, d.events.leave].join(" ")), e
        }
    })
}(Metro, m4q),
function (i, c) {
    "use strict";
    var r = i.utils,
        n = {
            label: "",
            timepickerDeferred: 0,
            hoursStep: 1,
            minutesStep: 1,
            secondsStep: 1,
            value: null,
            locale: METRO_LOCALE,
            distance: 3,
            hours: !0,
            minutes: !0,
            seconds: !0,
            showLabels: !0,
            scrollSpeed: 4,
            copyInlineStyles: !1,
            clsPicker: "",
            clsPart: "",
            clsHours: "",
            clsMinutes: "",
            clsSeconds: "",
            clsLabel: "",
            clsButton: "",
            clsOkButton: "",
            clsCancelButton: "",
            okButtonIcon: "<span class='default-icon-check'></span>",
            cancelButtonIcon: "<span class='default-icon-cross'></span>",
            onSet: i.noop,
            onOpen: i.noop,
            onClose: i.noop,
            onScroll: i.noop,
            onTimePickerCreate: i.noop
        };
    i.timePickerSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroTimePickerSetup, i.timePickerSetup(window.metroTimePickerSetup), i.Component("time-picker", {
        init: function (e, t) {
            return this._super(t, e, n, {
                picker: null,
                isOpen: !1,
                value: [],
                locale: i.locales[METRO_LOCALE].calendar,
                listTimer: {
                    hours: null,
                    minutes: null,
                    seconds: null
                },
                id: r.elementId("time-picker")
            }), this
        },
        _create: function () {
            var e, t = this.element,
                n = this.options;
            for (n.distance < 1 && (n.distance = 1), n.hoursStep < 1 && (n.hoursStep = 1), 23 < n.hoursStep && (n.hoursStep = 23), n.minutesStep < 1 && (n.minutesStep = 1), 59 < n.minutesStep && (n.minutesStep = 59), n.secondsStep < 1 && (n.secondsStep = 1), 59 < n.secondsStep && (n.secondsStep = 59), "" !== t.val() || r.isValue(n.value) || (n.value = datetime().format("HH:mm:ss")), this.value = ("" !== t.val() ? t.val() : "" + n.value).toArray(":"), e = 0; e < 3; e++) void 0 === this.value[e] || null === this.value[e] ? this.value[e] = 0 : this.value[e] = parseInt(this.value[e]);
            this._normalizeValue(), void 0 === i.locales[n.locale] && (n.locale = METRO_LOCALE), this.locale = i.locales[n.locale].calendar, this._createStructure(), this._createEvents(), this._set(), this._fireEvent("time-picker-create", {
                element: t
            })
        },
        _normalizeValue: function () {
            var e = this.options;
            1 < e.hoursStep && (this.value[0] = r.nearest(this.value[0], e.hoursStep, !0)), 1 < e.minutesStep && (this.value[1] = r.nearest(this.value[1], e.minutesStep, !0)), 1 < e.minutesStep && (this.value[2] = r.nearest(this.value[2], e.secondsStep, !0))
        },
        _createStructure: function () {
            var e, t, n, i, s, a, o = this.element,
                r = this.options,
                l = c("<div>").addClass("wheel-picker time-picker " + o[0].className).addClass(r.clsPicker);
            if (l.insertBefore(o), o.attr("readonly", !0).appendTo(l), r.label && (a = c("<label>").addClass("label-for-input").addClass(r.clsLabel).html(r.label).insertBefore(l), o.attr("id") && a.attr("for", o.attr("id")), "rtl" === o.attr("dir") && a.addClass("rtl")), s = c("<div>").addClass("time-wrapper").appendTo(l), !0 === r.hours && (e = c("<div>").attr("data-title", this.locale.time.hours).addClass("hours").addClass(r.clsPart).addClass(r.clsHours).appendTo(s)), !0 === r.minutes && (t = c("<div>").attr("data-title", this.locale.time.minutes).addClass("minutes").addClass(r.clsPart).addClass(r.clsMinutes).appendTo(s)), !0 === r.seconds && (n = c("<div>").attr("data-title", this.locale.time.seconds).addClass("seconds").addClass(r.clsPart).addClass(r.clsSeconds).appendTo(s)), a = c("<div>").addClass("select-wrapper").appendTo(l), s = c("<div>").addClass("select-block").appendTo(a), !0 === r.hours) {
                for (e = c("<ul>").addClass("sel-hours").appendTo(s), i = 0; i < r.distance; i++) c("<li>").html("&nbsp;").data("value", -1).appendTo(e);
                for (i = 0; i < 24; i += r.hoursStep) c("<li>").addClass("js-hours-" + i).html(Cake.lpad(i, 2, "0")).data("value", i).appendTo(e);
                for (i = 0; i < r.distance; i++) c("<li>").html("&nbsp;").data("value", -1).appendTo(e)
            }
            if (!0 === r.minutes) {
                for (t = c("<ul>").addClass("sel-minutes").appendTo(s), i = 0; i < r.distance; i++) c("<li>").html("&nbsp;").data("value", -1).appendTo(t);
                for (i = 0; i < 60; i += r.minutesStep) c("<li>").addClass("js-minutes-" + i).html(Cake.lpad(i, 2, "0")).data("value", i).appendTo(t);
                for (i = 0; i < r.distance; i++) c("<li>").html("&nbsp;").data("value", -1).appendTo(t)
            }
            if (!0 === r.seconds) {
                for (n = c("<ul>").addClass("sel-seconds").appendTo(s), i = 0; i < r.distance; i++) c("<li>").html("&nbsp;").data("value", -1).appendTo(n);
                for (i = 0; i < 60; i += r.secondsStep) c("<li>").addClass("js-seconds-" + i).html(Cake.lpad(i, 2, "0")).data("value", i).appendTo(n);
                for (i = 0; i < r.distance; i++) c("<li>").html("&nbsp;").data("value", -1).appendTo(n)
            }
            if (s.height(40 * (2 * r.distance + 1)), a = c("<div>").addClass("action-block").appendTo(a), c("<button>").attr("type", "button").addClass("button action-ok").addClass(r.clsButton).addClass(r.clsOkButton).html(r.okButtonIcon).appendTo(a), c("<button>").attr("type", "button").addClass("button action-cancel").addClass(r.clsButton).addClass(r.clsCancelButton).html(r.cancelButtonIcon).appendTo(a), !(o[0].className = "") === r.copyInlineStyles)
                for (i = 0; i < o[0].style.length; i++) l.css(o[0].style[i], o.css(o[0].style[i]));
            !0 === r.showLabels && l.addClass("show-labels"), o.prop("disabled") && l.addClass("disabled"), this.picker = l
        },
        _createEvents: function () {
            var s = this,
                a = this.options,
                o = this.picker;
            o.on(i.events.start, ".select-block ul", function (e) {
                var t, n;
                e.changedTouches || (t = this, n = r.pageXY(e).y, c(document).on(i.events.move, function (e) {
                    t.scrollTop -= a.scrollSpeed * (n > r.pageXY(e).y ? -1 : 1), n = r.pageXY(e).y
                }, {
                    ns: s.id
                }), c(document).on(i.events.stop, function () {
                    c(document).off(i.events.move, {
                        ns: s.id
                    }), c(document).off(i.events.stop, {
                        ns: s.id
                    })
                }, {
                    ns: s.id
                }))
            }), o.on(i.events.click, function (e) {
                !1 === s.isOpen && s.open(), e.stopPropagation()
            }), o.on(i.events.click, ".action-ok", function (e) {
                var t = o.find(".sel-hours li.active"),
                    n = o.find(".sel-minutes li.active"),
                    i = o.find(".sel-seconds li.active"),
                    t = 0 === t.length ? 0 : t.data("value"),
                    n = 0 === n.length ? 0 : n.data("value"),
                    i = 0 === i.length ? 0 : i.data("value");
                s.value = [t, n, i], s._normalizeValue(), s._set(), s.close(), e.stopPropagation()
            }), o.on(i.events.click, ".action-cancel", function (e) {
                s.close(), e.stopPropagation()
            });
            c.each(["hours", "minutes", "seconds"], function () {
                var n = this,
                    i = o.find(".sel-" + n);
                i.on("scroll", function () {
                    s.isOpen && (s.listTimer[n] && (clearTimeout(s.listTimer[n]), s.listTimer[n] = null), s.listTimer[n] || (s.listTimer[n] = setTimeout(function () {
                        var e, t;
                        s.listTimer[n] = null, t = Math.round(Math.ceil(i.scrollTop()) / 40), "hours" === n && a.hoursStep && (t *= parseInt(a.hoursStep)), "minutes" === n && a.minutesStep && (t *= parseInt(a.minutesStep)), "seconds" === n && a.secondsStep && (t *= parseInt(a.secondsStep)), t = (e = i.find(".js-" + n + "-" + t)).position().top - 40 * a.distance, i.find(".active").removeClass("active"), i[0].scrollTop = t, e.addClass("active"), r.exec(a.onScroll, [e, i, o], i[0])
                    }, 150)))
                })
            })
        },
        _set: function () {
            var e = this.element,
                t = this.options,
                n = this.picker,
                i = "00",
                s = "00",
                a = "00";
            !0 === t.hours && (i = parseInt(this.value[0]), n.find(".hours").html(Cake.lpad(i, 2, "0"))), !0 === t.minutes && (s = parseInt(this.value[1]), n.find(".minutes").html(Cake.lpad(s, 2, "0"))), !0 === t.seconds && (a = parseInt(this.value[2]), n.find(".seconds").html(Cake.lpad(a, 2, "0"))), e.val([i, s, a].join(":")).trigger("change"), this._fireEvent("set", {
                val: this.value,
                elementVal: e.val()
            })
        },
        open: function () {
            var e, t, n, i = this.options,
                s = this.picker,
                a = s.find("li"),
                o = s.find(".select-wrapper");
            o.parent().removeClass("for-top for-bottom"), o.show(0), a.removeClass("active"), e = r.inViewport(o[0]), a = r.rect(o[0]), !e && 0 < a.top && o.parent().addClass("for-bottom"), !e && a.top < 0 && o.parent().addClass("for-top");
            a = function (e, t) {
                e.scrollTop(0).animate({
                    draw: {
                        scrollTop: t.position().top - 40 * i.distance + e.scrollTop()
                    },
                    dur: 100
                })
            };
            !0 === i.hours && (t = parseInt(this.value[0]), t = (o = s.find(".sel-hours")).find("li.js-hours-" + t).addClass("active"), a(o, t)), !0 === i.minutes && (n = parseInt(this.value[1]), n = (t = s.find(".sel-minutes")).find("li.js-minutes-" + n).addClass("active"), a(t, n)), !0 === i.seconds && (n = parseInt(this.value[2]), n = (s = s.find(".sel-seconds")).find("li.js-seconds-" + n).addClass("active"), a(s, n)), this.isOpen = !0, this._fireEvent("open", {
                val: this.value
            })
        },
        close: function () {
            this.picker.find(".select-wrapper").hide(0), this.isOpen = !1, this._fireEvent("close", {
                val: this.value
            })
        },
        _convert: function (e) {
            e = Array.isArray(e) ? e : "function" == typeof e.getMonth ? [e.getHours(), e.getMinutes(), e.getSeconds()] : r.isObject(e) ? [e.h, e.m, e.s] : e.toArray(":");
            return e
        },
        val: function (e) {
            if (void 0 === e) return this.element.val();
            this.value = this._convert(e), this._normalizeValue(), this._set()
        },
        time: function (e) {
            if (void 0 === e) return {
                h: this.value[0],
                m: this.value[1],
                s: this.value[2]
            };
            this.value = this._convert(e), this._normalizeValue(), this._set()
        },
        date: function (e) {
            if (void 0 === e || "function" != typeof e.getMonth) return datetime().hour(this.value[0]).minute(this.value[1]).second(this.value[2]).ms(0).val();
            this.value = this._convert(e), this._normalizeValue(), this._set()
        },
        disable: function () {
            this.element.data("disabled", !0), this.element.parent().addClass("disabled")
        },
        enable: function () {
            this.element.data("disabled", !1), this.element.parent().removeClass("disabled")
        },
        toggleState: function () {
            this.elem.disabled ? this.disable() : this.enable()
        },
        changeAttribute: function (e, t) {
            switch (e) {
                case "data-value":
                    this.val(t);
                    break;
                case "disabled":
                    this.toggleState()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.picker;
            return c.each(["hours", "minutes", "seconds"], function () {
                t.find(".sel-" + this).off("scroll")
            }), t.off(i.events.start, ".select-block ul"), t.off(i.events.click), t.off(i.events.click, ".action-ok"), t.off(i.events.click, ".action-cancel"), e
        }
    }), c(document).on(i.events.click, function () {
        c.each(c(".time-picker"), function () {
            c(this).find("input").each(function () {
                i.getPlugin(this, "timepicker").close()
            })
        })
    })
}(Metro, m4q),
function (e, r) {
    "use strict";
    var n = e.utils,
        l = {
            callback: e.noop,
            timeout: METRO_TIMEOUT,
            distance: 20,
            showTop: !1,
            clsToast: ""
        };
    e.toastSetup = function (e) {
        l = r.extend({}, l, e)
    }, window.metroToastSetup, e.toastSetup(window.metroToastSetup);
    var c = {
        create: function (e, t) {
            var n, i, s, a, o = Array.from(arguments);
            r.isPlainObject(t) || (t = o[4], s = o[1], i = o[2], a = o[3]), t = r.extend({}, l, t), e = (n = r("<div>").addClass("toast").html(e).appendTo(r("body"))).outerWidth(), n.hide(), i = i || t.timeout, s = s || t.callback, a = a || t.clsToast, !0 === t.showTop ? n.addClass("show-top").css({
                top: t.distance
            }) : n.css({
                bottom: t.distance
            }), n.css({
                left: "50%",
                "margin-left": -e / 2
            }).addClass(t.clsToast).addClass(a).fadeIn(METRO_ANIMATION_DURATION, function () {
                setTimeout(function () {
                    c.remove(n, s)
                }, i)
            })
        },
        remove: function (e, t) {
            e && e.fadeOut(METRO_ANIMATION_DURATION, function () {
                e.remove(), n.exec(t, null, e[0])
            })
        }
    };
    e.toast = c, e.createToast = c.create
}(Metro, m4q),
function (e, r) {
    "use strict";
    var n = {
        textToTokenize: "",
        spaceSymbol: "",
        spaceClass: "space",
        tokenClass: "",
        splitter: "",
        tokenElement: "span",
        useTokenSymbol: !0,
        useTokenIndex: !0,
        clsTokenizer: "",
        clsToken: "",
        clsTokenOdd: "",
        clsTokenEven: "",
        onTokenCreate: e.noop,
        onTokenize: e.noop,
        onTokenizerCreate: e.noop
    };
    e.tokenizerSetup = function (e) {
        n = r.extend({}, n, e)
    }, window.metroTokenizerSetup, e.tokenizerSetup(window.metroTokenizerSetup), e.Component("tokenizer", {
        init: function (e, t) {
            return this._super(t, e, n, {
                originalText: ""
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.originalText = t.textToTokenize ? t.textToTokenize.trim() : e.text().trim().replace(/[\r\n\t]/gi, "").replace(/\s\s+/g, " "), this._createStructure(), this._fireEvent("tokenizer-create")
        },
        _tokenize: function () {
            var n, i = this,
                s = this.element,
                a = this.options,
                o = 0;
            s.clear().attr("aria-label", this.originalText), r.each(this.originalText.split(a.splitter), function (e) {
                var t = " " === this,
                    e = r("<" + a.tokenElement + ">").html(t ? a.spaceSymbol : this).attr("aria-hidden", !0).addClass(t ? a.spaceClass : "").addClass(t && a.useTokenSymbol ? "" : "ts-" + this.replace(" ", "_")).addClass(t && a.useTokenIndex ? "" : "ti-" + (e + 1)).addClass(a.tokenClass || "").addClass(t ? "" : a.clsToken);
                t || (o++, e.addClass(o % 2 == 0 ? "te-even" : "te-odd"), e.addClass(o % 2 == 0 ? a.clsTokenEven : a.clsTokenOdd)), a.prepend && (n = r.isSelector(a.prepend) ? r(a.prepend) : r("<span>").html(a.prepend), e.prepend(n)), a.append && (n = r.isSelector(a.append) ? r(a.append) : r("<span>").html(a.append), e.append(n)), s.append(e), i._fireEvent("token-create", {
                    token: e[0]
                })
            }), i._fireEvent("tokenize", {
                tokens: s.children().items(),
                originalText: this.originalText
            })
        },
        _createStructure: function () {
            var e = this.element,
                t = this.options;
            e.addClass(t.clsTokenizer), this._tokenize()
        },
        tokenize: function (e) {
            this.originalText = e, this._tokenize()
        },
        destroy: function () {
            this.element.remove()
        }
    })
}(Metro, m4q),
function (r, l) {
    "use strict";
    var c = r.utils,
        d = {
            LEFT: "left",
            RIGHT: "right",
            UP: "up",
            DOWN: "down",
            IN: "in",
            OUT: "out",
            NONE: "none",
            AUTO: "auto",
            SWIPE: "swipe",
            PINCH: "pinch",
            TAP: "tap",
            DOUBLE_TAP: "doubletap",
            LONG_TAP: "longtap",
            HOLD: "hold",
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical",
            ALL_FINGERS: "all",
            DOUBLE_TAP_THRESHOLD: 10,
            PHASE_START: "start",
            PHASE_MOVE: "move",
            PHASE_END: "end",
            PHASE_CANCEL: "cancel",
            SUPPORTS_TOUCH: "ontouchstart" in window,
            SUPPORTS_POINTER_IE10: window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !("ontouchstart" in window),
            SUPPORTS_POINTER: (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !("ontouchstart" in window),
            IN_TOUCH: "intouch"
        },
        n = {
            touchDeferred: 0,
            fingers: 1,
            threshold: 75,
            cancelThreshold: null,
            pinchThreshold: 20,
            maxTimeThreshold: null,
            fingerReleaseThreshold: 250,
            longTapThreshold: 500,
            doubleTapThreshold: 200,
            triggerOnTouchEnd: !0,
            triggerOnTouchLeave: !1,
            allowPageScroll: "auto",
            fallbackToMouseEvents: !0,
            excludedElements: ".no-swipe",
            preventDefaultEvents: !0,
            onSwipe: r.noop,
            onSwipeLeft: r.noop,
            onSwipeRight: r.noop,
            onSwipeUp: r.noop,
            onSwipeDown: r.noop,
            onSwipeStatus: r.noop_true,
            onPinchIn: r.noop,
            onPinchOut: r.noop,
            onPinchStatus: r.noop_true,
            onTap: r.noop,
            onDoubleTap: r.noop,
            onLongTap: r.noop,
            onHold: r.noop,
            onTouchCreate: r.noop
        };
    r.touchSetup = function (e) {
        n = l.extend({}, n, e)
    }, window.metroTouchSetup, r.touchSetup(window.metroTouchSetup), r.Component("touch", {
        init: function (e, t) {
            return this._super(t, e, n, {
                useTouchEvents: null,
                START_EV: null,
                MOVE_EV: null,
                END_EV: null,
                LEAVE_EV: null,
                CANCEL_EV: null,
                distance: 0,
                direction: null,
                currentDirection: null,
                duration: 0,
                startTouchesDistance: 0,
                endTouchesDistance: 0,
                pinchZoom: 1,
                pinchDistance: 0,
                pinchDirection: 0,
                maximumsMap: null,
                phase: "start",
                fingerCount: 0,
                fingerData: {},
                startTime: 0,
                endTime: 0,
                previousTouchEndTime: 0,
                fingerCountAtRelease: 0,
                doubleTapStartTime: 0,
                singleTapTimeout: null,
                holdTimeout: null
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.useTouchEvents = d.SUPPORTS_TOUCH || d.SUPPORTS_POINTER || !this.options.fallbackToMouseEvents, this.START_EV = this.useTouchEvents ? d.SUPPORTS_POINTER ? d.SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown", this.MOVE_EV = this.useTouchEvents ? d.SUPPORTS_POINTER ? d.SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove", this.END_EV = this.useTouchEvents ? d.SUPPORTS_POINTER ? d.SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", this.LEAVE_EV = !this.useTouchEvents || d.SUPPORTS_POINTER ? "mouseleave" : null, this.CANCEL_EV = d.SUPPORTS_POINTER ? d.SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel" : "touchcancel", void 0 !== t.allowPageScroll || t.onSwipe === r.noop && t.onSwipeStatus === r.noop || (t.allowPageScroll = d.NONE);
            try {
                e.on(this.START_EV, l.proxy(this.touchStart, this)), e.on(this.CANCEL_EV, l.proxy(this.touchCancel, this))
            } catch (e) {
                throw new Error("Events not supported " + this.START_EV + "," + this.CANCEL_EV + " on Swipe")
            }
            this._fireEvent("touch-create", {
                element: e
            })
        },
        touchStart: function (e) {
            var t = this.element,
                n = this.options;
            if (!(this.getTouchInProgress() || 0 < l(e.target).closest(n.excludedElements).length)) {
                var i, s = e,
                    a = s.touches,
                    o = a ? a[0] : s;
                return (this.phase = d.PHASE_START, a ? this.fingerCount = a.length : !1 !== n.preventDefaultEvents && e.preventDefault(), this.distance = 0, this.direction = null, this.currentDirection = null, this.pinchDirection = null, this.duration = 0, this.startTouchesDistance = 0, this.endTouchesDistance = 0, this.pinchZoom = 1, this.pinchDistance = 0, this.maximumsMap = this.createMaximumsData(), this.cancelMultiFingerRelease(), this.createFingerData(0, o), !a || this.fingerCount === n.fingers || n.fingers === d.ALL_FINGERS || this.hasPinches() ? (this.startTime = this.getTimeStamp(), 2 === this.fingerCount && (this.createFingerData(1, a[1]), this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start)), n.onSwipeStatus === r.noop && n.onPinchStatus === r.noop || (i = this.triggerHandler(s, this.phase))) : i = !1, !1 === i) ? (this.phase = d.PHASE_CANCEL, this.triggerHandler(s, this.phase), i) : (n.onHold !== r.noop && (this.holdTimeout = setTimeout(l.proxy(function () {
                    t.trigger("hold", [s.target]), n.onHold !== r.noop && (i = c.exec(n.onHold, [s, s.target], t[0]), t.fire("hold", {
                        event: s,
                        target: s.target
                    }))
                }, this), n.longTapThreshold)), this.setTouchInProgress(!0), null)
            }
        },
        touchMove: function (e) {
            var t, n, i, s = e;
            this.phase === d.PHASE_END || this.phase === d.PHASE_CANCEL || this.inMultiFingerRelease() || (n = (i = s.touches) ? i[0] : s, n = this.updateFingerData(n), this.endTime = this.getTimeStamp(), i && (this.fingerCount = i.length), this.options.onHold !== r.noop && clearTimeout(this.holdTimeout), this.phase = d.PHASE_MOVE, 2 === this.fingerCount && (0 === this.startTouchesDistance ? (this.createFingerData(1, i[1]), this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start)) : (this.updateFingerData(i[1]), this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].end, this.fingerData[1].end), this.pinchDirection = this.calculatePinchDirection(this.fingerData[0].end, this.fingerData[1].end)), this.pinchZoom = this.calculatePinchZoom(this.startTouchesDistance, this.endTouchesDistance), this.pinchDistance = Math.abs(this.startTouchesDistance - this.endTouchesDistance)), this.fingerCount === this.options.fingers || this.options.fingers === d.ALL_FINGERS || !i || this.hasPinches() ? (this.direction = this.calculateDirection(n.start, n.end), this.currentDirection = this.calculateDirection(n.last, n.end), this.validateDefaultEvent(e, this.currentDirection), this.distance = this.calculateDistance(n.start, n.end), this.duration = this.calculateDuration(), this.setMaxDistance(this.direction, this.distance), t = this.triggerHandler(s, this.phase), this.options.triggerOnTouchEnd && !this.options.triggerOnTouchLeave || (i = !0, this.options.triggerOnTouchLeave && (e = this.getBounds(this), i = this.isInBounds(n.end, e)), !this.options.triggerOnTouchEnd && i ? this.phase = this.getNextPhase(d.PHASE_MOVE) : this.options.triggerOnTouchLeave && !i && (this.phase = this.getNextPhase(d.PHASE_END)), this.phase !== d.PHASE_CANCEL && this.phase !== d.PHASE_END || this.triggerHandler(s, this.phase))) : (this.phase = d.PHASE_CANCEL, this.triggerHandler(s, this.phase)), !1 === t && (this.phase = d.PHASE_CANCEL, this.triggerHandler(s, this.phase)))
        },
        touchEnd: function (e) {
            var t = e,
                n = t.touches;
            if (n) {
                if (n.length && !this.inMultiFingerRelease()) return this.startMultiFingerRelease(t), !0;
                if (n.length && this.inMultiFingerRelease()) return !0
            }
            return this.inMultiFingerRelease() && (this.fingerCount = this.fingerCountAtRelease), this.endTime = this.getTimeStamp(), this.duration = this.calculateDuration(), this.didSwipeBackToCancel() || !this.validateSwipeDistance() ? (this.phase = d.PHASE_CANCEL, this.triggerHandler(t, this.phase)) : this.options.triggerOnTouchEnd || !1 === this.options.triggerOnTouchEnd && this.phase === d.PHASE_MOVE ? (!1 !== this.options.preventDefaultEvents && e.preventDefault(), this.phase = d.PHASE_END, this.triggerHandler(t, this.phase)) : !this.options.triggerOnTouchEnd && this.hasTap() ? (this.phase = d.PHASE_END, this.triggerHandlerForGesture(t, this.phase, d.TAP)) : this.phase === d.PHASE_MOVE && (this.phase = d.PHASE_CANCEL, this.triggerHandler(t, this.phase)), this.setTouchInProgress(!1), null
        },
        touchCancel: function () {
            this.fingerCount = 0, this.endTime = 0, this.startTime = 0, this.startTouchesDistance = 0, this.endTouchesDistance = 0, this.pinchZoom = 1, this.cancelMultiFingerRelease(), this.setTouchInProgress(!1)
        },
        touchLeave: function (e) {
            this.options.triggerOnTouchLeave && (this.phase = this.getNextPhase(d.PHASE_END), this.triggerHandler(e, this.phase))
        },
        getNextPhase: function (e) {
            var t = this.options,
                n = e,
                i = this.validateSwipeTime(),
                s = this.validateSwipeDistance(),
                a = this.didSwipeBackToCancel();
            return !i || a ? n = d.PHASE_CANCEL : !s || e !== d.PHASE_MOVE || t.triggerOnTouchEnd && !t.triggerOnTouchLeave ? !s && e === d.PHASE_END && t.triggerOnTouchLeave && (n = d.PHASE_CANCEL) : n = d.PHASE_END, n
        },
        triggerHandler: function (e, t) {
            var n, i = e.touches;
            return (this.didSwipe() || this.hasSwipes()) && (n = this.triggerHandlerForGesture(e, t, d.SWIPE)), (this.didPinch() || this.hasPinches()) && !1 !== n && (n = this.triggerHandlerForGesture(e, t, d.PINCH)), this.didDoubleTap() && !1 !== n ? n = this.triggerHandlerForGesture(e, t, d.DOUBLE_TAP) : this.didLongTap() && !1 !== n ? n = this.triggerHandlerForGesture(e, t, d.LONG_TAP) : this.didTap() && !1 !== n && (n = this.triggerHandlerForGesture(e, t, d.TAP)), t === d.PHASE_CANCEL && this.touchCancel(e), t === d.PHASE_END && (i && i.length || this.touchCancel(e)), n
        },
        triggerHandlerForGesture: function (e, t, n) {
            var i, s = this.element,
                a = this.options;
            if (n === d.SWIPE) {
                if (s.trigger("swipeStatus", [t, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection]), i = c.exec(a.onSwipeStatus, [e, t, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection], s[0]), s.fire("swipestatus", {
                        event: e,
                        phase: t,
                        direction: this.direction,
                        distance: this.distance,
                        duration: this.duration,
                        fingerCount: this.fingerCount,
                        fingerData: this.fingerData,
                        currentDirection: this.currentDirection
                    }), !1 === i) return !1;
                if (t === d.PHASE_END && this.validateSwipe()) {
                    if (clearTimeout(this.singleTapTimeout), clearTimeout(this.holdTimeout), s.trigger("swipe", [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]), i = c.exec(a.onSwipe, [e, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], s[0]), s.fire("swipe", {
                            event: e,
                            direction: this.direction,
                            distance: this.distance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            currentDirection: this.currentDirection
                        }), !1 === i) return !1;
                    switch (this.direction) {
                        case d.LEFT:
                            s.trigger("swipeLeft", [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]), i = c.exec(a.onSwipeLeft, [e, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], s[0]), s.fire("swipeleft", {
                                event: e,
                                direction: this.direction,
                                distance: this.distance,
                                duration: this.duration,
                                fingerCount: this.fingerCount,
                                fingerData: this.fingerData,
                                currentDirection: this.currentDirection
                            });
                            break;
                        case d.RIGHT:
                            s.trigger("swipeRight", [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]), i = c.exec(a.onSwipeRight, [e, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], s[0]), s.fire("swiperight", {
                                event: e,
                                direction: this.direction,
                                distance: this.distance,
                                duration: this.duration,
                                fingerCount: this.fingerCount,
                                fingerData: this.fingerData,
                                currentDirection: this.currentDirection
                            });
                            break;
                        case d.UP:
                            s.trigger("swipeUp", [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]), i = c.exec(a.onSwipeUp, [e, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], s[0]), s.fire("swipeup", {
                                event: e,
                                direction: this.direction,
                                distance: this.distance,
                                duration: this.duration,
                                fingerCount: this.fingerCount,
                                fingerData: this.fingerData,
                                currentDirection: this.currentDirection
                            });
                            break;
                        case d.DOWN:
                            s.trigger("swipeDown", [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]), i = c.exec(a.onSwipeDown, [e, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection], s[0]), s.fire("swipedown", {
                                event: e,
                                direction: this.direction,
                                distance: this.distance,
                                duration: this.duration,
                                fingerCount: this.fingerCount,
                                fingerData: this.fingerData,
                                currentDirection: this.currentDirection
                            })
                    }
                }
            }
            if (n === d.PINCH) {
                if (s.trigger("pinchStatus", [t, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]), i = c.exec(a.onPinchStatus, [e, t, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom], s[0]), s.fire("pinchstatus", {
                        event: e,
                        phase: t,
                        direction: this.pinchDirection,
                        distance: this.pinchDistance,
                        duration: this.duration,
                        fingerCount: this.fingerCount,
                        fingerData: this.fingerData,
                        zoom: this.pinchZoom
                    }), !1 === i) return !1;
                if (t === d.PHASE_END && this.validatePinch()) switch (this.pinchDirection) {
                    case d.IN:
                        s.trigger("pinchIn", [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]), i = c.exec(a.onPinchIn, [e, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom], s[0]), s.fire("pinchin", {
                            event: e,
                            direction: this.pinchDirection,
                            distance: this.pinchDistance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            zoom: this.pinchZoom
                        });
                        break;
                    case d.OUT:
                        s.trigger("pinchOut", [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]), i = c.exec(a.onPinchOut, [e, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom], s[0]), s.fire("pinchout", {
                            event: e,
                            direction: this.pinchDirection,
                            distance: this.pinchDistance,
                            duration: this.duration,
                            fingerCount: this.fingerCount,
                            fingerData: this.fingerData,
                            zoom: this.pinchZoom
                        })
                }
            }
            return n === d.TAP ? t !== d.PHASE_CANCEL && t !== d.PHASE_END || (clearTimeout(this.singleTapTimeout), clearTimeout(this.holdTimeout), this.hasDoubleTap() && !this.inDoubleTap() ? (this.doubleTapStartTime = this.getTimeStamp(), this.singleTapTimeout = setTimeout(l.proxy(function () {
                this.doubleTapStartTime = null, i = c.exec(a.onTap, [e, e.target], s[0]), s.fire("tap", {
                    event: e,
                    target: e.target
                })
            }, this), a.doubleTapThreshold)) : (this.doubleTapStartTime = null, i = c.exec(a.onTap, [e, e.target], s[0]), s.fire("tap", {
                event: e,
                target: e.target
            }))) : n === d.DOUBLE_TAP ? t !== d.PHASE_CANCEL && t !== d.PHASE_END || (clearTimeout(this.singleTapTimeout), clearTimeout(this.holdTimeout), this.doubleTapStartTime = null, i = c.exec(a.onDoubleTap, [e, e.target], s[0]), s.fire("doubletap", {
                event: e,
                target: e.target
            })) : n === d.LONG_TAP && (t !== d.PHASE_CANCEL && t !== d.PHASE_END || (clearTimeout(this.singleTapTimeout), this.doubleTapStartTime = null, i = c.exec(a.onLongTap, [e, e.target], s[0]), s.fire("longtap", {
                event: e,
                target: e.target
            }))), i
        },
        validateSwipeDistance: function () {
            var e = !0;
            return null !== this.options.threshold && (e = this.distance >= this.options.threshold), e
        },
        didSwipeBackToCancel: function () {
            var e = this.options,
                t = !1;
            return null !== e.cancelThreshold && null !== this.direction && (t = this.getMaxDistance(this.direction) - this.distance >= e.cancelThreshold), t
        },
        validatePinchDistance: function () {
            return null === this.options.pinchThreshold || this.pinchDistance >= this.options.pinchThreshold
        },
        validateSwipeTime: function () {
            var e = this.options,
                e = !e.maxTimeThreshold || this.duration < e.maxTimeThreshold;
            return e
        },
        validateDefaultEvent: function (e, t) {
            var n = this.options;
            if (!1 !== n.preventDefaultEvents)
                if (n.allowPageScroll === d.NONE) e.preventDefault();
                else {
                    var i = n.allowPageScroll === d.AUTO;
                    switch (t) {
                        case d.LEFT:
                            (n.onSwipeLeft !== r.noop && i || !i && n.allowPageScroll.toLowerCase() !== d.HORIZONTAL) && e.preventDefault();
                            break;
                        case d.RIGHT:
                            (n.onSwipeRight !== r.noop && i || !i && n.allowPageScroll.toLowerCase() !== d.HORIZONTAL) && e.preventDefault();
                            break;
                        case d.UP:
                            (n.onSwipeUp !== r.noop && i || !i && n.allowPageScroll.toLowerCase() !== d.VERTICAL) && e.preventDefault();
                            break;
                        case d.DOWN:
                            (n.onSwipeDown !== r.noop && i || !i && n.allowPageScroll.toLowerCase() !== d.VERTICAL) && e.preventDefault()
                    }
                }
        },
        validatePinch: function () {
            var e = this.validateFingers(),
                t = this.validateEndPoint(),
                n = this.validatePinchDistance();
            return e && t && n
        },
        hasPinches: function () {
            return !!(this.options.onPinchStatus || this.options.onPinchIn || this.options.onPinchOut)
        },
        didPinch: function () {
            return !(!this.validatePinch() || !this.hasPinches())
        },
        validateSwipe: function () {
            var e = this.validateSwipeTime(),
                t = this.validateSwipeDistance(),
                n = this.validateFingers(),
                i = this.validateEndPoint();
            return !this.didSwipeBackToCancel() && i && n && t && e
        },
        hasSwipes: function () {
            var e = this.options;
            return !(e.onSwipe === r.noop && e.onSwipeStatus === r.noop && e.onSwipeLeft === r.noop && e.onSwipeRight === r.noop && e.onSwipeUp === r.noop && e.onSwipeDown === r.noop)
        },
        didSwipe: function () {
            return !(!this.validateSwipe() || !this.hasSwipes())
        },
        validateFingers: function () {
            return this.fingerCount === this.options.fingers || this.options.fingers === d.ALL_FINGERS || !d.SUPPORTS_TOUCH
        },
        validateEndPoint: function () {
            return 0 !== this.fingerData[0].end.x
        },
        hasTap: function () {
            return this.options.onTap !== r.noop
        },
        hasDoubleTap: function () {
            return this.options.onDoubleTap !== r.noop
        },
        hasLongTap: function () {
            return this.options.onLongTap !== r.noop
        },
        validateDoubleTap: function () {
            if (null == this.doubleTapStartTime) return !1;
            var e = this.getTimeStamp();
            return this.hasDoubleTap() && e - this.doubleTapStartTime <= this.options.doubleTapThreshold
        },
        inDoubleTap: function () {
            return this.validateDoubleTap()
        },
        validateTap: function () {
            return (1 === this.fingerCount || !d.SUPPORTS_TOUCH) && (isNaN(this.distance) || this.distance < this.options.threshold)
        },
        validateLongTap: function () {
            var e = this.options;
            return this.duration > e.longTapThreshold && this.distance < d.DOUBLE_TAP_THRESHOLD
        },
        didTap: function () {
            return !(!this.validateTap() || !this.hasTap())
        },
        didDoubleTap: function () {
            return !(!this.validateDoubleTap() || !this.hasDoubleTap())
        },
        didLongTap: function () {
            return !(!this.validateLongTap() || !this.hasLongTap())
        },
        startMultiFingerRelease: function (e) {
            this.previousTouchEndTime = this.getTimeStamp(), this.fingerCountAtRelease = e.touches.length + 1
        },
        cancelMultiFingerRelease: function () {
            this.previousTouchEndTime = 0, this.fingerCountAtRelease = 0
        },
        inMultiFingerRelease: function () {
            var e = !1;
            return this.previousTouchEndTime && this.getTimeStamp() - this.previousTouchEndTime <= this.options.fingerReleaseThreshold && (e = !0), e
        },
        getTouchInProgress: function () {
            return !0 === this.element.data("intouch")
        },
        setTouchInProgress: function (e) {
            var t = this.element;
            t && (!0 === e ? (t.on(this.MOVE_EV, l.proxy(this.touchMove, this)), t.on(this.END_EV, l.proxy(this.touchEnd, this)), this.LEAVE_EV && t.on(this.LEAVE_EV, l.proxy(this.touchLeave, this))) : (t.off(this.MOVE_EV), t.off(this.END_EV), this.LEAVE_EV && t.off(this.LEAVE_EV)), t.data("intouch", !0 === e))
        },
        createFingerData: function (e, t) {
            var n = {
                start: {
                    x: 0,
                    y: 0
                },
                last: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            return n.start.x = n.last.x = n.end.x = t.pageX || t.clientX, n.start.y = n.last.y = n.end.y = t.pageY || t.clientY, this.fingerData[e] = n
        },
        updateFingerData: function (e) {
            var t = void 0 !== e.identifier ? e.identifier : 0,
                n = this.getFingerData(t);
            return null === n && (n = this.createFingerData(t, e)), n.last.x = n.end.x, n.last.y = n.end.y, n.end.x = e.pageX || e.clientX, n.end.y = e.pageY || e.clientY, n
        },
        getFingerData: function (e) {
            return this.fingerData[e] || null
        },
        setMaxDistance: function (e, t) {
            e !== d.NONE && (t = Math.max(t, this.getMaxDistance(e)), this.maximumsMap[e].distance = t)
        },
        getMaxDistance: function (e) {
            return this.maximumsMap[e] ? this.maximumsMap[e].distance : void 0
        },
        createMaximumsData: function () {
            var e = {};
            return e[d.LEFT] = this.createMaximumVO(d.LEFT), e[d.RIGHT] = this.createMaximumVO(d.RIGHT), e[d.UP] = this.createMaximumVO(d.UP), e[d.DOWN] = this.createMaximumVO(d.DOWN), e
        },
        createMaximumVO: function (e) {
            return {
                direction: e,
                distance: 0
            }
        },
        calculateDuration: function () {
            return this.endTime - this.startTime
        },
        calculateTouchesDistance: function (e, t) {
            var n = Math.abs(e.x - t.x),
                t = Math.abs(e.y - t.y);
            return Math.round(Math.sqrt(n * n + t * t))
        },
        calculatePinchZoom: function (e, t) {
            return (t / e * 100).toFixed(2)
        },
        calculatePinchDirection: function () {
            return this.pinchZoom < 1 ? d.OUT : d.IN
        },
        calculateDistance: function (e, t) {
            return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
        },
        calculateAngle: function (e, t) {
            var n = e.x - t.x,
                e = t.y - e.y,
                n = Math.atan2(e, n),
                n = Math.round(180 * n / Math.PI);
            return n < 0 && (n = 360 - Math.abs(n)), n
        },
        calculateDirection: function (e, t) {
            if (this.comparePoints(e, t)) return d.NONE;
            t = this.calculateAngle(e, t);
            return t <= 45 && 0 <= t || t <= 360 && 315 <= t ? d.LEFT : 135 <= t && t <= 225 ? d.RIGHT : 45 < t && t < 135 ? d.DOWN : d.UP
        },
        getTimeStamp: function () {
            return (new Date).getTime()
        },
        getBounds: function (e) {
            var t = (e = l(e)).offset();
            return {
                left: t.left,
                right: t.left + e.outerWidth(),
                top: t.top,
                bottom: t.top + e.outerHeight()
            }
        },
        isInBounds: function (e, t) {
            return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
        },
        comparePoints: function (e, t) {
            return e.x === t.x && e.y === t.y
        },
        removeListeners: function () {
            var e = this.element;
            e.off(this.START_EV), e.off(this.CANCEL_EV), e.off(this.MOVE_EV), e.off(this.END_EV), this.LEAVE_EV && e.off(this.LEAVE_EV), this.setTouchInProgress(!1)
        },
        enable: function () {
            return this.disable(), this.element.on(this.START_EV, this.touchStart), this.element.on(this.CANCEL_EV, this.touchCancel), this.element
        },
        disable: function () {
            return this.removeListeners(), this.element
        },
        changeAttribute: function () {},
        destroy: function () {
            this.removeListeners()
        }
    }), r.touch = d
}(Metro, m4q),
function (t, a) {
    "use strict";
    var o = t.utils,
        n = {
            treeviewDeferred: 0,
            showChildCount: !1,
            duration: 100,
            onNodeClick: t.noop,
            onNodeDblClick: t.noop,
            onNodeDelete: t.noop,
            onNodeInsert: t.noop,
            onNodeClean: t.noop,
            onCheckClick: t.noop,
            onRadioClick: t.noop,
            onExpandNode: t.noop,
            onCollapseNode: t.noop,
            onTreeViewCreate: t.noop
        };
    t.treeViewSetup = function (e) {
        n = a.extend({}, n, e)
    }, window.metroTreeViewSetup, t.treeViewSetup(window.metroTreeViewSetup), t.Component("tree-view", {
        init: function (e, t) {
            return this._super(t, e, n), this
        },
        _create: function () {
            var e = this,
                t = this.element;
            this._createTree(), this._createEvents(), a.each(t.find("input"), function () {
                a(this).is(":checked") && e._recheck(this)
            }), this._fireEvent("tree-view-create", {
                element: t
            })
        },
        _createIcon: function (e) {
            var t = o.isTag(e) ? a(e) : a("<img src='' alt=''>").attr("src", e),
                e = a("<span>").addClass("icon");
            return e.html(t.outerHTML()), e
        },
        _createCaption: function (e) {
            return a("<span>").addClass("caption").html(e)
        },
        _createToggle: function () {
            return a("<span>").addClass("node-toggle")
        },
        _createNode: function (e) {
            var t = a("<li>");
            return void 0 !== e.caption && t.prepend(this._createCaption(e.caption)), void 0 !== e.icon && t.prepend(this._createIcon(e.icon)), void 0 !== e.html && t.append(e.html), t
        },
        _createTree: function () {
            var i = this,
                e = this.element,
                s = this.options,
                t = e.find("li");
            e.addClass("treeview"), a.each(t, function () {
                var e = a(this),
                    t = e.data("caption"),
                    n = e.data("icon");
                void 0 !== t && (0 < e.children("ul").length && !0 === s.showChildCount && (t += " (" + e.children("ul").children("li").length + ")"), e.prepend(i._createCaption(t))), void 0 !== n && e.prepend(i._createIcon(n)), 0 < e.children("ul").length && (e.addClass("tree-node"), e.append(i._createToggle()), !0 !== o.bool(e.attr("data-collapsed")) ? e.addClass("expanded") : e.children("ul").hide())
            })
        },
        _createEvents: function () {
            var s = this,
                e = this.element;
            e.on(t.events.click, ".node-toggle", function (e) {
                var t = a(this).parent();
                s.toggleNode(t), e.preventDefault()
            }), e.on(t.events.click, "li > .caption", function (e) {
                var t = a(this).parent();
                s.current(t), s._fireEvent("node-click", {
                    node: t[0]
                }), e.preventDefault()
            }), e.on(t.events.dblclick, "li > .caption", function (e) {
                var t = a(this).closest("li"),
                    n = t.children(".node-toggle"),
                    i = t.children("ul");
                (0 < n.length || 0 < i.length) && s.toggleNode(t), s._fireEvent("node-dbl-click", {
                    node: t[0]
                }), e.preventDefault()
            }), e.on(t.events.click, "input[type=radio]", function () {
                var e = a(this),
                    t = e.is(":checked"),
                    n = e.closest("li");
                s.current(n), s._fireEvent("radio-click", {
                    checked: t,
                    check: e[0],
                    node: n[0]
                })
            }), e.on(t.events.click, "input[type=checkbox]", function () {
                var e = a(this),
                    t = e.is(":checked"),
                    n = e.closest("li");
                s._recheck(e), s._fireEvent("check-click", {
                    checked: t,
                    check: e[0],
                    node: n[0]
                })
            })
        },
        _recheck: function (e) {
            var t, n = this.element,
                i = (e = a(e)).is(":checked"),
                s = e.closest("li");
            this.current(s), (e = e.closest("li").find("ul input[type=checkbox]")).attr("data-indeterminate", !1), e.prop("checked", i), e.trigger("change"), t = [], a.each(n.find("input[type=checkbox]"), function () {
                t.push(this)
            }), a.each(t.reverse(), function () {
                var e = a(this),
                    t = e.closest("li").children("ul").find("input[type=checkbox]").length,
                    n = e.closest("li").children("ul").find("input[type=checkbox]").filter(function (e) {
                        return e.checked
                    }).length;
                0 < t && 0 === n && (e.attr("data-indeterminate", !1), e.prop("checked", !1), e.trigger("change")), 0 === n ? e.attr("data-indeterminate", !1) : 0 < n && n < t ? e.attr("data-indeterminate", !0) : t === n && (e.attr("data-indeterminate", !1), e.prop("checked", !0), e.trigger("change"))
            })
        },
        current: function (e) {
            var t = this.element;
            if (void 0 === e) return t.find("li.current");
            t.find("li").removeClass("current"), e.addClass("current")
        },
        toggleNode: function (e) {
            var t = a(e),
                n = this.options,
                i = !t.data("collapsed");
            t.toggleClass("expanded"), t.data("collapsed", i), e = !0 == i ? "slideUp" : "slideDown", i ? this._fireEvent("collapse-node", {
                node: t[0]
            }) : this._fireEvent("expand-node", {
                node: t[0]
            }), t.children("ul")[e](n.duration)
        },
        addTo: function (e, t) {
            var n, i = this.element;
            return null === e ? n = i : 0 === (n = (e = a(e)).children("ul")).length && (n = a("<ul>").appendTo(e), this._createToggle().appendTo(e), e.addClass("expanded")), (t = this._createNode(t)).appendTo(n), this._fireEvent("node-insert", {
                node: t[0],
                parent: e ? e[0] : null
            }), t
        },
        insertBefore: function (e, t) {
            var n = this._createNode(t);
            return o.isNull(e) ? this.addTo(e, t) : (e = a(e), n.insertBefore(e), this._fireEvent("node-insert", {
                node: n[0],
                parent: e ? e[0] : null
            }), n)
        },
        insertAfter: function (e, t) {
            var n = this._createNode(t);
            return o.isNull(e) ? this.addTo(e, t) : (e = a(e), n.insertAfter(e), this._fireEvent("node-insert", {
                node: n[0],
                parent: e[0]
            }), n)
        },
        del: function (e) {
            var t = this.element,
                n = (e = a(e)).closest("ul"),
                i = n.closest("li");
            this._fireEvent("node-delete", {
                node: e[0]
            }), e.remove(), 0 !== n.children().length || n.is(t) || (n.remove(), i.removeClass("expanded"), i.children(".node-toggle").remove())
        },
        clean: function (e) {
            (e = a(e)).children("ul").remove(), e.removeClass("expanded"), e.children(".node-toggle").remove(), this._fireEvent("node-clean", {
                node: e[0]
            })
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element;
            return e.off(t.events.click, ".node-toggle"), e.off(t.events.click, "li > .caption"), e.off(t.events.dblclick, "li > .caption"), e.off(t.events.click, "input[type=radio]"), e.off(t.events.click, "input[type=checkbox]"), e
        }
    })
}(Metro, m4q),
function (s, d) {
    "use strict";
    var u = s.utils,
        h = {
            required: function (e) {
                return Array.isArray(e) ? 0 < e.length && e : !!u.isValue(e) && e.trim()
            },
            length: function (e, t) {
                return Array.isArray(e) ? e.length === parseInt(t) : !(!u.isValue(t) || isNaN(t) || t <= 0) && e.trim().length === parseInt(t)
            },
            minlength: function (e, t) {
                return Array.isArray(e) ? e.length >= parseInt(t) : !(!u.isValue(t) || isNaN(t) || t <= 0) && e.trim().length >= parseInt(t)
            },
            maxlength: function (e, t) {
                return Array.isArray(e) ? e.length <= parseInt(t) : !(!u.isValue(t) || isNaN(t) || t <= 0) && e.trim().length <= parseInt(t)
            },
            min: function (e, t) {
                return !(!u.isValue(t) || isNaN(t)) && (!!this.number(e) && (!isNaN(e) && Number(e) >= Number(t)))
            },
            max: function (e, t) {
                return !(!u.isValue(t) || isNaN(t)) && (!!this.number(e) && (!isNaN(e) && Number(e) <= Number(t)))
            },
            email: function (e) {
                return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(e)
            },
            domain: function (e) {
                return /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(e)
            },
            url: function (e) {
                return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
            },
            date: function (e, t, n) {
                try {
                    return t ? Datetime.from(e, t, n) : datetime(e), !0
                } catch (e) {
                    return !1
                }
            },
            number: function (e) {
                return !isNaN(e)
            },
            integer: function (e) {
                return u.isInt(e)
            },
            float: function (e) {
                return u.isFloat(e)
            },
            digits: function (e) {
                return /^\d+$/.test(e)
            },
            hexcolor: function (e) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)
            },
            color: function (e) {
                return !!u.isValue(e) && (!1 !== s.colors.color(e, s.colors.PALETTES.STANDARD) || s.colors.isColor(s.colors.parse(e)))
            },
            pattern: function (e, t) {
                return !!u.isValue(e) && (!!u.isValue(t) && new RegExp(t).test(e))
            },
            compare: function (e, t) {
                return e === t
            },
            not: function (e, t) {
                return e !== t
            },
            notequals: function (e, t) {
                return !u.isNull(e) && (!u.isNull(t) && e.trim() !== t.trim())
            },
            equals: function (e, t) {
                return !u.isNull(e) && (!u.isNull(t) && e.trim() === t.trim())
            },
            custom: function (e, t) {
                return !1 !== u.isFunc(t) && u.exec(t, [e])
            },
            is_control: function (e) {
                return e.parent().hasClass("input") || e.parent().hasClass("select") || e.parent().hasClass("textarea") || e.parent().hasClass("checkbox") || e.parent().hasClass("switch") || e.parent().hasClass("radio") || e.parent().hasClass("spinner")
            },
            reset_state: function (e) {
                e = d(e);
                (h.is_control(e) ? e.parent() : e).removeClass("invalid valid")
            },
            set_valid_state: function (e) {
                e = d(e);
                (h.is_control(e) ? e.parent() : e).addClass("valid")
            },
            set_invalid_state: function (e) {
                e = d(e);
                (h.is_control(e) ? e.parent() : e).addClass("invalid")
            },
            reset: function (e) {
                var t = this;
                return d.each(d(e).find("[data-validate]"), function () {
                    t.reset_state(this)
                }), this
            },
            validate: function (e, i, t, n, s) {
                var a = !0,
                    o = d(e),
                    r = void 0 !== o.data("validate") ? String(o.data("validate")).split(" ").map(function (e) {
                        return e.trim()
                    }) : [],
                    l = [],
                    c = 0 < o.closest("form").length;
                return 0 === r.length || (this.reset_state(o), o.attr("type") && "checkbox" === o.attr("type").toLowerCase() ? (!1 === (a = -1 === r.indexOf("required") || o.is(":checked")) && l.push("required"), void 0 !== i && (i.val += a ? 0 : 1)) : o.attr("type") && "radio" === o.attr("type").toLowerCase() ? (e = o.attr("name"), e = d("input[name=" + e.replace("[", "\\[").replace("]", "\\]") + "]:checked"), a = 0 < e.length, void 0 !== i && (i.val += a ? 0 : 1)) : d.each(r, function () {
                    var e, t, n;
                    !1 !== a && (n = (e = this.split("="))[0], e.shift(), e = e.join("="), -1 < ["compare", "equals", "notequals"].indexOf(n) && (e = c ? o[0].form.elements[e].value : d("[name=" + e + "]").val()), "date" === n && (e = o.attr("data-value-format"), t = o.attr("data-value-locale")), !1 === (a = !1 === u.isFunc(h[n]) || (!0 !== s && "required" !== n && "" === o.val().trim() || h[n](o.val(), e, t))) && l.push(n), void 0 !== i && (i.val += a ? 0 : 1))
                }), !1 === a ? (this.set_invalid_state(o), void 0 !== i && i.log.push({
                    input: o[0],
                    name: o.attr("name"),
                    value: o.val(),
                    funcs: r,
                    errors: l
                }), void 0 !== n && u.exec(n, [o, o.val()], o[0])) : (this.set_valid_state(o), void 0 !== t && u.exec(t, [o, o.val()], o[0])), a)
            }
        };
    s.validator = h;
    var n = {
        validatorDeferred: 0,
        submitTimeout: 200,
        interactiveCheck: !1,
        clearInvalid: 0,
        requiredMode: !0,
        useRequiredClass: !0,
        onBeforeSubmit: s.noop_true,
        onSubmit: s.noop,
        onError: s.noop,
        onValidate: s.noop,
        onErrorForm: s.noop,
        onValidateForm: s.noop,
        onValidatorCreate: s.noop
    };
    s.validatorSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroValidatorSetup, s.validatorSetup(window.metroValidatorSetup), s.Component("validator", {
        name: "Validator",
        init: function (e, t) {
            return this._super(t, e, n, {
                _onsubmit: null,
                _onreset: null,
                result: []
            }), this
        },
        _create: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = t.find("[data-validate]");
            t.attr("novalidate", "novalidate"), d.each(i, function () {
                var e = d(this); - 1 < e.data("validate").indexOf("required") && !0 === n.useRequiredClass && (h.is_control(e) ? e.parent() : e).addClass("required"), !0 === n.interactiveCheck && e.on(s.events.inputchange, function () {
                    h.validate(this, void 0, void 0, void 0, n.requiredMode)
                })
            }), this._onsubmit = null, (this._onreset = null) !== t[0].onsubmit && (this._onsubmit = t[0].onsubmit, t[0].onsubmit = null), null !== t[0].onreset && (this._onreset = t[0].onreset, t[0].onreset = null), t[0].onsubmit = function () {
                return e._submit()
            }, t[0].onreset = function () {
                return e._reset()
            }, this._fireEvent("validator-create", {
                element: t
            })
        },
        _reset: function () {
            h.reset(this.element), null !== this._onsubmit && u.exec(this._onsubmit, null, this.element[0])
        },
        _submit: function () {
            var e = this,
                t = this.element,
                n = this.options,
                i = this.elem,
                s = t.find("[data-validate]"),
                a = t.find("input[type=submit], button[type=submit]"),
                o = {
                    val: 0,
                    log: []
                },
                r = d.serializeToArray(t);
            return 0 < a.length && a.attr("disabled", "disabled").addClass("disabled"), d.each(s, function () {
                h.validate(this, o, n.onValidate, n.onError, n.requiredMode)
            }), a.removeAttr("disabled").removeClass("disabled"), o.val += !1 === u.exec(n.onBeforeSubmit, [r], this.elem) ? 1 : 0, 0 === o.val ? (this._fireEvent("validate-form", {
                data: r
            }), setTimeout(function () {
                u.exec(n.onSubmit, [r], i), t.fire("formsubmit", {
                    data: r
                }), null !== e._onsubmit && u.exec(e._onsubmit, null, i)
            }, n.submitTimeout)) : (this._fireEvent("error-form", {
                log: o.log,
                data: r
            }), 0 < n.clearInvalid && setTimeout(function () {
                d.each(s, function () {
                    var e = d(this);
                    (h.is_control(e) ? e.parent() : e).removeClass("invalid")
                })
            }, n.clearInvalid)), 0 === o.val
        },
        changeAttribute: function () {}
    })
}(Metro, m4q),
function (e, m) {
    "use strict";
    var a = e.utils,
        s = {
            duration: 4e3,
            animationDuration: null,
            transitionDuration: null,
            transition: "fade",
            animation: null,
            slides: [],
            shuffle: !1,
            align: "center",
            valign: "center",
            loop: !0,
            autoplay: !0,
            mute: !0,
            cover: !0,
            preload: !0,
            timer: !0,
            overlay: 2,
            color: null,
            volume: 1,
            onPlay: e.noop,
            onPause: e.noop,
            onEnd: e.noop,
            onWalk: e.noop,
            onNext: e.noop,
            onPrev: e.noop,
            onJump: e.noop,
            onVegasCreate: e.noop
        };
    e.vegasSetup = function (e) {
        s = m.extend({}, s, e)
    }, window.metroVegasSetup, e.vegasSetup(window.metroVegasSetup), e.Component("vegas", {
        videoCache: {},
        init: function (e, t) {
            return this.transitions = ["fade", "fade2", "slideLeft", "slideLeft2", "slideRight", "slideRight2", "slideUp", "slideUp2", "slideDown", "slideDown2", "zoomIn", "zoomIn2", "zoomOut", "zoomOut2", "swirlLeft", "swirlLeft2", "swirlRight", "swirlRight2"], this.animations = ["kenburns", "kenburnsUp", "kenburnsDown", "kenburnsRight", "kenburnsLeft", "kenburnsUpLeft", "kenburnsUpRight", "kenburnsDownLeft", "kenburnsDownRight"], this.support = {
                objectFit: "objectFit" in document.body.style,
                video: !/(Android|webOS|Phone|iPad|iPod|BlackBerry|Windows Phone)/i.test(navigator.userAgent)
            }, this._super(t, e, s, {
                slide: 0,
                slides: null,
                total: 0,
                noshow: !1,
                paused: !1,
                ended: !1,
                timer: null,
                overlay: null,
                first: !0,
                timeout: !1
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            this.slides = a.isObject(t.slides) || [], this.total = this.slides.length, this.noshow = this.total < 2, this.paused = !t.autoplay || this.noshow, t.shuffle && this.slides.shuffle(), t.preload && this._preload(), this._createStructure(), this._createEvents(), this._fireEvent("vegas-create", {
                element: e
            })
        },
        _createStructure: function () {
            var e, t = this,
                n = this.element,
                i = this.options,
                s = "BODY" === n[0].tagName;
            s || (n.css("height", n.css("height")), e = m('<div class="vegas-wrapper">').css("overflow", n.css("overflow")).css("padding", n.css("padding")), n.css("padding") || e.css("padding-top", n.css("padding-top")).css("padding-bottom", n.css("padding-bottom")).css("padding-left", n.css("padding-left")).css("padding-right", n.css("padding-right")), n.children().appendTo(e), n.clear()), n.addClass("vegas-container"), s || n.append(e), i.timer && (this.timer = m('<div class="vegas-timer"><div class="vegas-timer-progress">'), n.append(this.timer)), i.overlay && (this.overlay = m('<div class="vegas-overlay">').addClass("overlay" + ("boolean" == typeof i.overlay || isNaN(i.overlay) ? 2 : +i.overlay)), n.append(this.overlay)), setTimeout(function () {
                a.exec(i.onPlay, null, n[0]), t._goto(t.slide)
            }, 1)
        },
        _createEvents: function () {},
        _preload: function () {
            for (var e = 0; e < this.slides.length; e++) {
                var t = this.slides[e];
                t.src && ((new Image).src = this.slides[e].src), t.video && (t.video instanceof Array ? this._video(t.video) : this._video(t.video.src))
            }
        },
        _slideShow: function () {
            var e = this,
                t = this.options;
            1 < this.total && !this.ended && !this.paused && !this.noshow && (this.timeout = setTimeout(function () {
                e.next()
            }, t.duration))
        },
        _timer: function (e) {
            var t = this,
                n = this.options;
            clearTimeout(this.timeout), this.timer && (this.timer.removeClass("vegas-timer-running").find("div").css("transition-duration", "0ms"), this.ended || this.paused || this.noshow || e && setTimeout(function () {
                t.timer.addClass("vegas-timer-running").find("div").css("transition-duration", +n.duration - 100 + "ms")
            }, 100))
        },
        _fadeSoundIn: function (e, t) {
            var n = this.options;
            m.animate({
                el: e,
                draw: {
                    volume: +n.volume
                },
                dur: t
            })
        },
        _fadeSoundOut: function (e, t) {
            m.animate({
                el: e,
                draw: {
                    volume: 0
                },
                dur: t
            })
        },
        _video: function (e) {
            var t, n, i = e.toString();
            return this.videoCache[i] || (Array.isArray(e) || (e = [e]), (t = document.createElement("video")).preload = !0, e.forEach(function (e) {
                (n = document.createElement("source")).src = e, t.appendChild(n)
            }), this.videoCache[i] = t)
        },
        _goto: function (e) {
            var t, n, i, s = this,
                a = this.element,
                o = this.options;
            void 0 === this.slides[e] && (e = 0), this.slide = e;
            var r, l, c, d, u = a.children(".vegas-slide"),
                h = this.slides[e],
                p = o.cover;

            function f() {
                s._timer(!0), setTimeout(function () {
                    u.css("transition", "all " + c + "ms").addClass("vegas-transition-" + r + "-out"), u.each(function () {
                        var e = u.find("video").get(0);
                        e && (e.volume = 1, s._fadeSoundOut(e, c))
                    }), t.css("transition", "all " + c + "ms").addClass("vegas-transition-" + r + "-in");
                    for (var e = 0; e < u.length - 1; e++) u.eq(e).remove();
                    s._fireEvent("walk", {
                        slide: s.current(!0)
                    }), s._slideShow()
                }, 100)
            }
            this.first && (this.first = !1), "repeat" !== p && (!0 === p ? p = "cover" : !1 === p && (p = "contain")), r = "random" === o.transition ? m.random(this.transitions) : o.transition || this.transitions[0], l = "random" === o.animation ? m.random(this.animations) : o.animation || this.animations[0], c = !o.transitionDuration || "auto" === o.transitionDuration || +o.transitionDuration > +o.duration ? +o.duration : +o.transitionDuration, d = !o.animationDuration || "auto" === o.animationDuration || +o.animationDuration > +o.duration ? +o.duration : +o.animationDuration, t = m("<div>").addClass("vegas-slide").addClass("vegas-transition-" + r), this.support.video && h.video ? ((n = h.video instanceof Array ? this._video(h.video) : this._video(h.video.src)).loop = h.video.loop || o.loop, n.muted = h.video.mute || o.mute, n.muted ? n.pause() : this._fadeSoundIn(n, c), e = m(n).addClass("vegas-video").css("background-color", o.color || "#000000"), this.support.objectFit ? e.css("object-position", o.align + " " + o.valign).css("object-fit", p).css("width", "100%").css("height", "100%") : "contain" === p && e.css("width", "100%").css("height", "100%"), t.append(e)) : (i = new Image, o = m("<div>").addClass("vegas-slide-inner").css({
                backgroundImage: 'url("' + h.src + '")',
                backgroundColor: o.color || "#000000",
                backgroundPosition: o.align + " " + o.valign
            }), "repeat" === p ? o.css("background-repeat", "repeat") : o.css("background-size", p), l && o.addClass("vegas-animation-" + l).css("animation-duration", d + "ms"), t.append(o)), u.length ? u.eq(u.length - 1).after(t) : a.prepend(t), u.css("transition", "all 0ms").each(function () {
                this.className = "vegas-slide", "VIDEO" === this.tagName && (this.className += " vegas-video"), r && (this.className += " vegas-transition-" + r, this.className += " vegas-transition-" + r + "-in")
            }), this._timer(!1), n ? (4 === n.readyState && (n.currentTime = 0), n.play(), f()) : (i.src = h.src, i.complete ? f() : i.onload = f)
        },
        _end: function () {
            this.ended = this.options.autoplay, this._timer(!1), this._fireEvent("end", {
                slide: this.current(!0)
            })
        },
        play: function () {
            this.paused && (this._fireEvent("play", {
                slide: this.current(!0)
            }), this.paused = !1, this.next())
        },
        pause: function () {
            this._timer(!1), this.paused = !0, this._fireEvent("pause", {
                slide: this.current(!0)
            })
        },
        toggle: function () {
            this.paused ? this.play() : this.pause()
        },
        playing: function () {
            return !this.paused && !this.noshow
        },
        current: function (e) {
            return e ? {
                slide: this.slide,
                data: this.slides[this.slide]
            } : this.slide
        },
        jump: function (e) {
            if (e <= 0 || e > this.slides.length || e === this.slide + 1) return this;
            this.slide = e - 1, this._fireEvent("jump", {
                slide: this.current(!0)
            }), this._goto(this.slide)
        },
        next: function () {
            var e = this.options;
            if (this.slide++, this.slide >= this.slides.length) {
                if (!e.loop) return this._end();
                this.slide = 0
            }
            this._fireEvent("next", {
                slide: this.current(!0)
            }), this._goto(this.slide)
        },
        prev: function () {
            var e = this.options;
            if (this.slide--, this.slide < 0) {
                if (!e.loop) return this.slide++, this._end();
                this.slide = this.slides.length - 1
            }
            this._fireEvent("prev", {
                slide: this.current(!0)
            }), this._goto(this.slide)
        },
        changeAttribute: function (e) {
            var t = this.element,
                n = this.options,
                i = Cake.camelCase(e.replace("data-", ""));
            "slides" === i ? (n.slides = t.attr("data-slides"), this.slides = a.isObject(n.slides) || [], this.total = this.slides.length, this.noshow = this.total < 2, this.paused = !this.options.autoplay || this.noshow) : void 0 !== s[i] && (n[i] = JSON.parse(t.attr(e)))
        },
        destroy: function () {
            var e = this.element,
                t = this.options;
            return clearTimeout(this.timeout), e.removeClass("vegas-container"), e.find("> .vegas-slide").remove(), e.find("> .vegas-wrapper").children().appendTo(e), e.find("> .vegas-wrapper").remove(), t.timer && this.timer.remove(), t.overlay && this.overlay.remove(), e[0]
        }
    })
}(Metro, m4q),
function (u, h) {
    "use strict";
    var o = u.utils,
        n = {
            videoDeferred: 0,
            src: null,
            poster: "",
            logo: "",
            logoHeight: 32,
            logoWidth: "auto",
            logoTarget: "",
            volume: .5,
            loop: !1,
            autoplay: !1,
            fullScreenMode: u.fullScreenMode.DESKTOP,
            aspectRatio: u.aspectRatio.HD,
            controlsHide: 3e3,
            showLoop: !0,
            showPlay: !0,
            showStop: !0,
            showMute: !0,
            showFull: !0,
            showStream: !0,
            showVolume: !0,
            showInfo: !0,
            loopIcon: "<span class='default-icon-loop'></span>",
            stopIcon: "<span class='default-icon-stop'></span>",
            playIcon: "<span class='default-icon-play'></span>",
            pauseIcon: "<span class='default-icon-pause'></span>",
            muteIcon: "<span class='default-icon-mute'></span>",
            volumeLowIcon: "<span class='default-icon-low-volume'></span>",
            volumeMediumIcon: "<span class='default-icon-medium-volume'></span>",
            volumeHighIcon: "<span class='default-icon-high-volume'></span>",
            screenMoreIcon: "<span class='default-icon-enlarge'></span>",
            screenLessIcon: "<span class='default-icon-shrink'></span>",
            onPlay: u.noop,
            onPause: u.noop,
            onStop: u.noop,
            onEnd: u.noop,
            onMetadata: u.noop,
            onTime: u.noop,
            onVideoPlayerCreate: u.noop
        };
    u.videoPlayerSetup = function (e) {
        n = h.extend({}, n, e)
    }, window.metroVideoPlayerSetup, u.videoPlayerSetup(window.metroVideoPlayerSetup), u.Component("video-player", {
        init: function (e, t) {
            return this._super(t, e, n, {
                fullscreen: !1,
                preloader: null,
                player: null,
                video: t,
                stream: null,
                volume: null,
                volumeBackup: 0,
                muted: !1,
                fullScreenInterval: !1,
                isPlaying: !1,
                id: o.elementId("video-player")
            }), this
        },
        _create: function () {
            var e = this.element,
                t = this.options;
            !1 === u.fullScreenEnabled && (t.fullScreenMode = u.fullScreenMode.WINDOW), this._createPlayer(), this._createControls(), this._createEvents(), this._setAspectRatio(), !0 === t.autoplay && this.play(), this._fireEvent("video-player-create", {
                element: e,
                player: this.player
            })
        },
        _createPlayer: function () {
            var e = this.element,
                t = this.options,
                n = this.video,
                i = h("<div>").addClass("media-player video-player " + e[0].className),
                s = h("<div>").addClass("preloader").appendTo(i),
                a = h("<a>").attr("href", t.logoTarget).addClass("logo").appendTo(i);
            i.insertBefore(e), e.appendTo(i), h.each(["muted", "autoplay", "controls", "height", "width", "loop", "poster", "preload"], function () {
                e.removeAttr(this)
            }), e.attr("preload", "auto"), "" !== t.poster && e.attr("poster", t.poster), n.volume = t.volume, s.activity({
                type: "cycle",
                style: "color"
            }), s.hide(), this.preloader = s, "" !== t.logo && h("<img>").css({
                height: t.logoHeight,
                width: t.logoWidth
            }).attr("src", t.logo).appendTo(a), null !== t.src && this._setSource(t.src), e[0].className = "", this.player = i
        },
        _setSource: function (e) {
            var t = this.element;
            t.find("source").remove(), t.removeAttr("src"), Array.isArray(e) ? h.each(e, function () {
                void 0 !== this.src && h("<source>").attr("src", this.src).attr("type", void 0 !== this.type ? this.type : "").appendTo(t)
            }) : t.attr("src", e)
        },
        _createControls: function () {
            var e, t = this,
                n = this.element,
                i = this.options,
                s = this.elem,
                a = h("<div>").addClass("controls").addClass(i.clsControls).insertAfter(n),
                o = h("<div>").addClass("stream").appendTo(a),
                r = h("<input>").addClass("stream-slider ultra-thin cycle-marker").appendTo(o),
                l = h("<div>").addClass("volume").appendTo(a),
                c = h("<input>").addClass("volume-slider ultra-thin cycle-marker").appendTo(l),
                d = h("<div>").addClass("info-box").appendTo(a);
            !0 !== i.showInfo && d.hide(), u.makePlugin(r, "slider", {
                clsMarker: "bg-red",
                clsHint: "bg-cyan fg-white",
                clsComplete: "bg-cyan",
                hint: !0,
                onStart: function () {
                    s.paused || s.pause()
                },
                onStop: function (e) {
                    0 < s.seekable.length && (s.currentTime = (t.duration * e / 100).toFixed(0)), s.paused && 0 < s.currentTime && s.play()
                }
            }), this.stream = r, !0 !== i.showStream && o.hide(), u.makePlugin(c, "slider", {
                clsMarker: "bg-red",
                clsHint: "bg-cyan fg-white",
                hint: !0,
                value: 100 * i.volume,
                onChangeValue: function (e) {
                    s.volume = e / 100
                }
            }), this.volume = c, !0 !== i.showVolume && l.hide(), !0 === i.showLoop && (e = h("<button>").attr("type", "button").addClass("button square loop").html(i.loopIcon).appendTo(a)), !0 === i.showPlay && h("<button>").attr("type", "button").addClass("button square play").html(i.playIcon).appendTo(a), !0 === i.showStop && h("<button>").attr("type", "button").addClass("button square stop").html(i.stopIcon).appendTo(a), !0 === i.showMute && h("<button>").attr("type", "button").addClass("button square mute").html(i.muteIcon).appendTo(a), !0 === i.showFull && h("<button>").attr("type", "button").addClass("button square full").html(i.screenMoreIcon).appendTo(a), !0 === i.loop && (e.addClass("active"), n.attr("loop", "loop")), this._setVolume(), i.muted && (t.volumeBackup = s.volume, u.getPlugin(t.volume, "slider").val(0), s.volume = 0), d.html("00:00 / 00:00")
        },
        _createEvents: function () {
            var t = this,
                n = this.element,
                i = this.options,
                s = this.elem,
                a = this.player;
            n.on("loadstart", function () {
                t.preloader.show()
            }), n.on("loadedmetadata", function () {
                t.duration = s.duration.toFixed(0), t._setInfo(0, t.duration), o.exec(i.onMetadata, [s, a], n[0])
            }), n.on("canplay", function () {
                t._setBuffer(), t.preloader.hide()
            }), n.on("progress", function () {
                t._setBuffer()
            }), n.on("timeupdate", function () {
                var e = Math.round(100 * s.currentTime / t.duration);
                t._setInfo(s.currentTime, t.duration), u.getPlugin(t.stream, "slider").val(e), o.exec(i.onTime, [s.currentTime, t.duration, s, a], n[0])
            }), n.on("waiting", function () {
                t.preloader.show()
            }), n.on("loadeddata", function () {}), n.on("play", function () {
                a.find(".play").html(i.pauseIcon), o.exec(i.onPlay, [s, a], n[0]), t._onMouse()
            }), n.on("pause", function () {
                a.find(".play").html(i.playIcon), o.exec(i.onPause, [s, a], n[0]), t._offMouse()
            }), n.on("stop", function () {
                u.getPlugin(t.stream, "slider").val(0), o.exec(i.onStop, [s, a], n[0]), t._offMouse()
            }), n.on("ended", function () {
                u.getPlugin(t.stream, "slider").val(0), o.exec(i.onEnd, [s, a], n[0]), t._offMouse()
            }), n.on("volumechange", function () {
                t._setVolume()
            }), a.on(u.events.click, ".play", function () {
                s.paused ? t.play() : t.pause()
            }), a.on(u.events.click, ".stop", function () {
                t.stop()
            }), a.on(u.events.click, ".mute", function () {
                t._toggleMute()
            }), a.on(u.events.click, ".loop", function () {
                t._toggleLoop()
            }), a.on(u.events.click, ".full", function () {
                t.fullscreen = !t.fullscreen, a.find(".full").html(!0 === t.fullscreen ? i.screenLessIcon : i.screenMoreIcon), i.fullScreenMode === u.fullScreenMode.WINDOW ? !0 === t.fullscreen ? a.addClass("full-screen") : a.removeClass("full-screen") : !0 === t.fullscreen ? (u.requestFullScreen(s), !1 === t.fullScreenInterval && (t.fullScreenInterval = setInterval(function () {
                    !1 === u.inFullScreen() && (t.fullscreen = !1, clearInterval(t.fullScreenInterval), t.fullScreenInterval = !1, a.find(".full").html(i.screenMoreIcon))
                }, 1e3))) : u.exitFullScreen()
            }), h(window).on(u.events.keyup, function (e) {
                t.fullscreen && 27 === e.keyCode && a.find(".full").click()
            }, {
                ns: this.id
            }), h(window).on(u.events.resize, function () {
                t._setAspectRatio()
            }, {
                ns: this.id
            })
        },
        _onMouse: function () {
            var t = this.options,
                n = this.player;
            n.on(u.events.enter, function () {
                var e = n.find(".controls");
                0 < t.controlsHide && "none" === e.style("display") && e.stop(!0).fadeIn(500, function () {
                    e.css("display", "flex")
                })
            }), n.on(u.events.leave, function () {
                var e = n.find(".controls");
                0 < t.controlsHide && 1 === parseInt(e.style("opacity")) && setTimeout(function () {
                    e.stop(!0).fadeOut(500)
                }, t.controlsHide)
            })
        },
        _offMouse: function () {
            var e = this.player,
                t = this.options,
                n = e.find(".controls");
            e.off(u.events.enter), e.off(u.events.leave), 0 < t.controlsHide && "none" === n.style("display") && n.stop(!0).fadeIn(500, function () {
                n.css("display", "flex")
            })
        },
        _toggleLoop: function () {
            var e = this.player.find(".loop");
            0 !== e.length && (e.toggleClass("active"), e.hasClass("active") ? this.element.attr("loop", "loop") : this.element.removeAttr("loop"))
        },
        _toggleMute: function () {
            this.muted = !this.muted, !1 === this.muted ? this.video.volume = this.volumeBackup : (this.volumeBackup = this.video.volume, this.video.volume = 0), u.getPlugin(this.volume, "slider").val(!1 === this.muted ? 100 * this.volumeBackup : 0)
        },
        _setInfo: function (e, t) {
            this.player.find(".info-box").html(o.secondsToFormattedString(Math.round(e)) + " / " + o.secondsToFormattedString(Math.round(t)))
        },
        _setBuffer: function () {
            var e = this.video.buffered.length ? Math.round(Math.floor(this.video.buffered.end(0)) / Math.floor(this.video.duration) * 100) : 0;
            u.getPlugin(this.stream, "slider").buff(e)
        },
        _setVolume: function () {
            var e = this.video,
                t = this.player,
                n = this.options,
                t = t.find(".mute"),
                e = 100 * e.volume;
            1 < e && e < 30 ? t.html(n.volumeLowIcon) : 30 <= e && e < 60 ? t.html(n.volumeMediumIcon) : 60 <= e && e <= 100 ? t.html(n.volumeHighIcon) : t.html(n.muteIcon)
        },
        _setAspectRatio: function () {
            var e, t = this.player,
                n = this.options,
                i = t.outerWidth();
            switch (n.aspectRatio) {
                case u.aspectRatio.SD:
                    e = o.aspectRatioH(i, "4/3");
                    break;
                case u.aspectRatio.CINEMA:
                    e = o.aspectRatioH(i, "21/9");
                    break;
                default:
                    e = o.aspectRatioH(i, "16/9")
            }
            t.outerHeight(e)
        },
        aspectRatio: function (e) {
            this.options.aspectRatio = e, this._setAspectRatio()
        },
        play: function (e) {
            void 0 !== e && this._setSource(e), void 0 === this.element.attr("src") && 0 === this.element.find("source").length || (this.isPlaying = !0, this.video.play())
        },
        pause: function () {
            this.isPlaying = !1, this.video.pause()
        },
        resume: function () {
            this.video.paused && this.play()
        },
        stop: function () {
            this.isPlaying = !1, this.video.pause(), this.video.currentTime = 0, u.getPlugin(this.stream, "slider").val(0), this._offMouse()
        },
        setVolume: function (e) {
            if (void 0 === e) return this.video.volume;
            1 < e && (e /= 100), this.video.volume = e, u.getPlugin(this.volume[0], "slider").val(100 * e)
        },
        loop: function () {
            this._toggleLoop()
        },
        mute: function () {
            this._toggleMute()
        },
        changeAspectRatio: function () {
            this.options.aspectRatio = this.element.attr("data-aspect-ratio"), this._setAspectRatio()
        },
        changeSource: function () {
            var e = JSON.parse(this.element.attr("data-src"));
            this.play(e)
        },
        changeVolume: function () {
            var e = this.element.attr("data-volume");
            this.setVolume(e)
        },
        changeAttribute: function (e) {
            switch (e) {
                case "data-aspect-ratio":
                    this.changeAspectRatio();
                    break;
                case "data-src":
                    this.changeSource();
                    break;
                case "data-volume":
                    this.changeVolume()
            }
        },
        destroy: function () {
            var e = this.element,
                t = this.player;
            return u.getPlugin(this.stream, "slider").destroy(), u.getPlugin(this.volume, "slider").destroy(), e.off("loadstart"), e.off("loadedmetadata"), e.off("canplay"), e.off("progress"), e.off("timeupdate"), e.off("waiting"), e.off("loadeddata"), e.off("play"), e.off("pause"), e.off("stop"), e.off("ended"), e.off("volumechange"), t.off(u.events.click, ".play"), t.off(u.events.click, ".stop"), t.off(u.events.click, ".mute"), t.off(u.events.click, ".loop"), t.off(u.events.click, ".full"), h(window).off(u.events.keyup, {
                ns: this.id
            }), h(window).off(u.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q),
function (e, i) {
    "use strict";
    var s = e.utils,
        n = {
            onViewport: e.noop,
            onViewportEnter: e.noop,
            onViewportLeave: e.noop,
            onViewportCheckCreate: e.noop
        };
    e.viewportCheckSetup = function (e) {
        n = i.extend({}, n, e)
    }, window.metroViewportCheckSetup, e.viewportCheckSetup(window.metroViewportCheckSetup), e.Component("viewport-check", {
        init: function (e, t) {
            return this._super(t, e, n, {
                inViewport: !1,
                id: s.elementId("viewport-check")
            }), this
        },
        _create: function () {
            this.inViewport = s.inViewport(this.elem), this._createEvents(), this._fireEvent("viewport-check-create")
        },
        _createEvents: function () {
            var t = this,
                n = this.elem;
            i(window).on(e.events.scroll, function () {
                var e = t.inViewport;
                t.inViewport = s.inViewport(n), e !== t.inViewport && (t.inViewport ? t._fireEvent("viewport-enter") : t._fireEvent("viewport-leave")), t._fireEvent("viewport", {
                    state: t.inViewport
                })
            }, {
                ns: t.id
            })
        },
        state: function () {
            return this.inViewport
        },
        destroy: function () {
            return i(window).off(e.events.scroll, {
                ns: this.id
            }), this.element
        }
    })
}(Metro, m4q),
function (c, d) {
    "use strict";
    var u = c.utils,
        n = {
            windowDeferred: 0,
            hidden: !1,
            width: "auto",
            height: "auto",
            btnClose: !0,
            btnMin: !0,
            btnMax: !0,
            draggable: !0,
            dragElement: ".window-caption .icon, .window-caption .title",
            dragArea: "parent",
            shadow: !1,
            icon: "",
            title: "Window",
            content: null,
            resizable: !0,
            overlay: !1,
            overlayColor: "transparent",
            overlayAlpha: .5,
            modal: !1,
            position: "absolute",
            checkEmbed: !0,
            top: "auto",
            left: "auto",
            place: "auto",
            closeAction: c.actions.REMOVE,
            customButtons: null,
            clsCustomButton: "",
            clsCaption: "",
            clsContent: "",
            clsWindow: "",
            _runtime: !1,
            minWidth: 0,
            minHeight: 0,
            maxWidth: 0,
            maxHeight: 0,
            onDragStart: c.noop,
            onDragStop: c.noop,
            onDragMove: c.noop,
            onCaptionDblClick: c.noop,
            onCloseClick: c.noop,
            onMaxClick: c.noop,
            onMinClick: c.noop,
            onResizeStart: c.noop,
            onResizeStop: c.noop,
            onResize: c.noop,
            onWindowCreate: c.noop,
            onShow: c.noop,
            onWindowDestroy: c.noop,
            onCanClose: c.noop_true,
            onClose: c.noop
        };
    c.windowSetup = function (e) {
        n = d.extend({}, n, e)
    }, window.metroWindowSetup, c.windowSetup(window.metroWindowSetup), c.Component("window", {
        init: function (e, t) {
            return this._super(t, e, n, {
                win: null,
                overlay: null,
                position: {
                    top: 0,
                    left: 0
                },
                hidden: !1,
                content: null
            }), this
        },
        _create: function () {
            var e, t = this,
                n = this.element,
                i = this.options,
                s = "parent" === i.dragArea ? n.parent() : d(i.dragArea);
            !0 === i.modal && (i.btnMax = !1, i.btnMin = !1, i.resizable = !1), u.isNull(i.content) || (u.isUrl(i.content) && u.isVideoUrl(i.content) ? (i.content = u.embedUrl(i.content), n.css({
                height: "100%"
            })) : !u.isQ(i.content) && u.isFunc(i.content) && (i.content = u.exec(i.content)), 0 === (e = d(i.content)).length ? n.appendText(i.content) : n.append(e)), i.content = n, !0 === i._runtime && this._runtime(n, "window"), (e = this._window(i)).addClass("no-visible"), s.append(e), !0 === i.overlay && ((s = this._overlay()).appendTo(e.parent()), this.overlay = s), this.win = e, this._fireEvent("window-create", {
                win: this.win[0],
                element: n
            }), setTimeout(function () {
                t._setPosition(), !0 !== i.hidden && t.win.removeClass("no-visible"), t._fireEvent("show", {
                    win: t.win[0],
                    element: n
                })
            }, 100)
        },
        _setPosition: function () {
            var e, t, n, i, s = this.options,
                a = this.win,
                o = "parent" === s.dragArea ? a.parent() : d(s.dragArea),
                r = o.height() / 2 - a[0].offsetHeight / 2,
                l = o.width() / 2 - a[0].offsetWidth / 2;
            if ("auto" !== s.place) {
                switch (s.place.toLowerCase()) {
                    case "top-left":
                        t = e = 0, i = n = "auto";
                        break;
                    case "top-center":
                        e = 0, t = l, i = n = "auto";
                        break;
                    case "top-right":
                        n = e = 0, i = t = "auto";
                        break;
                    case "right-center":
                        e = r, n = 0, i = t = "auto";
                        break;
                    case "bottom-right":
                        n = i = 0, e = t = "auto";
                        break;
                    case "bottom-center":
                        i = 0, t = l, e = n = "auto";
                        break;
                    case "bottom-left":
                        t = i = 0, e = n = "auto";
                        break;
                    case "left-center":
                        e = r, t = 0, i = n = "auto";
                        break;
                    default:
                        e = r, t = l, n = i = "auto"
                }
                a.css({
                    top: e,
                    left: t,
                    bottom: i,
                    right: n
                })
            }
        },
        _window: function (e) {
            var t, n, i, s, a = this,
                o = e.width,
                r = e.height,
                l = d("<div>").addClass("window");
            return !0 === e.modal && l.addClass("modal"), t = d("<div>").addClass("window-caption"), n = d("<div>").addClass("window-content"), l.append(t), l.append(n), !0 === e.status && (s = d("<div>").addClass("window-status"), l.append(s)), !0 === e.shadow && l.addClass("win-shadow"), u.isValue(e.icon) && d("<span>").addClass("icon").html(e.icon).appendTo(t), d("<span>").addClass("title").html(u.isValue(e.title) ? e.title : "&nbsp;").appendTo(t), u.isNull(e.content) || (u.isQ(e.content) ? e.content.appendTo(n) : n.html(e.content)), (i = d("<div>").addClass("buttons")).appendTo(t), !0 === e.btnMax && d("<span>").addClass("button btn-max sys-button").appendTo(i), !0 === e.btnMin && d("<span>").addClass("button btn-min sys-button").appendTo(i), !0 === e.btnClose && d("<span>").addClass("button btn-close sys-button").appendTo(i), u.isValue(e.customButtons) && (!(s = []) !== u.isObject(e.customButtons) && (e.customButtons = u.isObject(e.customButtons)), "string" == typeof e.customButtons && -1 < e.customButtons.indexOf("{") ? s = JSON.parse(e.customButtons) : "object" == typeof e.customButtons && 0 < u.objectLength(e.customButtons) ? s = e.customButtons : console.warn("Unknown format for custom buttons"), d.each(s, function () {
                var n = d("<span>");
                n.addClass("button btn-custom").addClass(e.clsCustomButton).addClass(this.cls).attr("tabindex", -1).html(this.html), this.attr && "object" == typeof this.attr && d.each(this.attr, function (e, t) {
                    n.attr(Cake.dashedName(e), t)
                }), n.data("action", this.onclick), i.prepend(n)
            })), t.on(c.events.stop, ".btn-custom", function (e) {
                var t;
                u.isRightMouse(e) || (e = (t = d(this)).data("action"), u.exec(e, [t], this))
            }), l.attr("id", void 0 === e.id ? u.elementId("window") : e.id), l.on(c.events.dblclick, ".window-caption", function (e) {
                a.maximized(e)
            }), t.on(c.events.click, ".btn-max, .btn-min, .btn-close", function (e) {
                var t;
                u.isRightMouse(e) || ((t = d(e.target)).hasClass("btn-max") && a.maximized(e), t.hasClass("btn-min") && a.minimized(e), t.hasClass("btn-close") && a.close(e))
            }), !0 === e.draggable && c.makePlugin(l, "draggable", {
                dragContext: l[0],
                dragElement: e.dragElement,
                dragArea: e.dragArea,
                onDragStart: e.onDragStart,
                onDragStop: e.onDragStop,
                onDragMove: e.onDragMove
            }), l.addClass(e.clsWindow), t.addClass(e.clsCaption), n.addClass(e.clsContent), 0 === e.minWidth && (e.minWidth = 34, d.each(i.children(".btn-custom"), function () {
                e.minWidth += u.hiddenElementSize(this).width
            }), e.btnMax && (e.minWidth += 34), e.btnMin && (e.minWidth += 34), e.btnClose && (e.minWidth += 34)), 0 < e.minWidth && !isNaN(e.width) && e.width < e.minWidth && (o = e.minWidth), 0 < e.minHeight && !isNaN(e.height) && e.height > e.minHeight && (r = e.minHeight), !0 === e.resizable && (d("<span>").addClass("resize-element").appendTo(l), l.addClass("resizable"), c.makePlugin(l, "resizable", {
                minWidth: e.minWidth,
                minHeight: e.minHeight,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                resizeElement: ".resize-element",
                onResizeStart: e.onResizeStart,
                onResizeStop: e.onResizeStop,
                onResize: e.onResize
            })), l.css({
                width: o,
                height: r,
                position: e.position,
                top: e.top,
                left: e.left
            }), l
        },
        _overlay: function () {
            var e = this.options,
                t = d("<div>");
            return t.addClass("overlay"), "transparent" === e.overlayColor ? t.addClass("transparent") : t.css({
                background: c.colors.toRGBA(e.overlayColor, e.overlayAlpha)
            }), t
        },
        width: function (e) {
            var t = this.win;
            return u.isValue(e) ? (t.css("width", parseInt(e)), this) : t.width()
        },
        height: function (e) {
            var t = this.win;
            return u.isValue(e) ? (t.css("height", parseInt(e)), this) : t.height()
        },
        maximized: function (e) {
            var t = this.win,
                n = this.options,
                e = d(e.target);
            n.btnMax && (t.removeClass("minimized"), t.toggleClass("maximized")), e.hasClass && e.hasClass("title") ? this._fireEvent("caption-dbl-click", {
                win: t[0]
            }) : this._fireEvent("max-click", {
                win: t[0]
            })
        },
        minimized: function () {
            var e = this.win;
            this.options.btnMin && (e.removeClass("maximized"), e.toggleClass("minimized")), this._fireEvent("min-click", {
                win: e[0]
            })
        },
        close: function () {
            var e = this,
                t = this.win,
                n = this.options;
            if (!1 === u.exec(n.onCanClose, [t])) return !1;
            var i = 0;
            n.onClose !== c.noop && (i = 500), this._fireEvent("close", {
                win: t[0]
            }), setTimeout(function () {
                !0 === n.modal && t.siblings(".overlay").remove(), e._fireEvent("close-click", {
                    win: t[0]
                }), n.closeAction === c.actions.REMOVE ? (e._fireEvent("window-destroy", {
                    win: t[0]
                }), t.remove()) : e.hide()
            }, i)
        },
        hide: function () {
            var e = this.win;
            e.css({
                display: "none"
            }), this._fireEvent("hide", {
                win: e[0]
            })
        },
        show: function () {
            var e = this.win;
            e.removeClass("no-visible").css({
                display: "flex"
            }), this._fireEvent("show", {
                win: e[0]
            })
        },
        toggle: function () {
            "none" === this.win.css("display") || this.win.hasClass("no-visible") ? this.show() : this.hide()
        },
        isOpen: function () {
            return this.win.hasClass("no-visible")
        },
        min: function (e) {
            e ? this.win.addClass("minimized") : this.win.removeClass("minimized")
        },
        max: function (e) {
            e ? this.win.addClass("maximized") : this.win.removeClass("maximized")
        },
        changeClass: function (e) {
            var t = this.element,
                n = this.win,
                i = this.options;
            "data-cls-window" === e && (n[0].className = "window " + (i.resizable ? " resizable " : " ") + t.attr("data-cls-window")), "data-cls-caption" === e && (n.find(".window-caption")[0].className = "window-caption " + t.attr("data-cls-caption")), "data-cls-content" === e && (n.find(".window-content")[0].className = "window-content " + t.attr("data-cls-content"))
        },
        toggleShadow: function () {
            var e = this.element,
                t = this.win;
            !0 === JSON.parse(e.attr("data-shadow")) ? t.addClass("win-shadow") : t.removeClass("win-shadow")
        },
        setContent: function (e) {
            var t = this.element,
                n = this.win,
                t = u.isValue(e) ? e : t.attr("data-content"),
                t = !u.isQ(t) && u.isFunc(t) ? u.exec(t) : u.isQ(t) ? t.html() : t;
            n.find(".window-content").html(t)
        },
        setTitle: function (e) {
            var t = this.element,
                n = this.win,
                t = u.isValue(e) ? e : t.attr("data-title");
            n.find(".window-caption .title").html(t)
        },
        setIcon: function (e) {
            var t = this.element,
                n = this.win,
                t = u.isValue(e) ? e : t.attr("data-icon");
            n.find(".window-caption .icon").html(t)
        },
        getIcon: function () {
            return this.win.find(".window-caption .icon").html()
        },
        getTitle: function () {
            return this.win.find(".window-caption .title").html()
        },
        toggleDraggable: function (e) {
            var t = this.win,
                e = u.bool(e),
                t = c.getPlugin(t, "draggable");
            !0 === e ? t.on() : t.off()
        },
        toggleResizable: function (e) {
            var t = this.win,
                n = u.bool(e),
                e = c.getPlugin(t, "resizable");
            !0 === n ? (e.on(), t.find(".resize-element").removeClass("resize-element-disabled")) : (e.off(), t.find(".resize-element").addClass("resize-element-disabled"))
        },
        changePlace: function (e) {
            var t = this.element,
                n = this.win,
                t = u.isValue(e) ? e : t.attr("data-place");
            n.addClass(t)
        },
        pos: function (e, t) {
            return this.win.css({
                top: e,
                left: t
            }), this
        },
        top: function (e) {
            return this.win.css({
                top: e
            }), this
        },
        left: function (e) {
            return this.win.css({
                left: e
            }), this
        },
        changeAttribute: function (e, t) {
            switch (e) {
                case "data-btn-close":
                case "data-btn-min":
                case "data-btn-max":
                    ! function (e, t) {
                        var n = this.win,
                            i = n.find(".btn-close"),
                            s = n.find(".btn-min"),
                            a = n.find(".btn-max"),
                            o = u.bool(t) ? "show" : "hide";
                        switch (e) {
                            case "data-btn-close":
                                i[o]();
                                break;
                            case "data-btn-min":
                                s[o]();
                                break;
                            case "data-btn-max":
                                a[o]()
                        }
                    }(e, t);
                    break;
                case "data-width":
                case "data-height":
                    ! function (e, t) {
                        var n = this.win;
                        "data-width" === e && n.css("width", +t), "data-height" === e && n.css("height", +t)
                    }(e, t);
                    break;
                case "data-cls-window":
                case "data-cls-caption":
                case "data-cls-content":
                    this.changeClass(e);
                    break;
                case "data-shadow":
                    this.toggleShadow();
                    break;
                case "data-icon":
                    this.setIcon();
                    break;
                case "data-title":
                    this.setTitle();
                    break;
                case "data-content":
                    this.setContent();
                    break;
                case "data-draggable":
                    this.toggleDraggable(t);
                    break;
                case "data-resizable":
                    this.toggleResizable(t);
                    break;
                case "data-top":
                case "data-left":
                    ! function (e, t) {
                        var n, i = this.win;
                        if ("data-top" === e) {
                            if (n = parseInt(t), !isNaN(n)) return;
                            i.css("top", n)
                        }
                        "data-left" === e && (n = parseInt(t), isNaN(n) && i.css("left", n))
                    }(e, t);
                    break;
                case "data-place":
                    this.changePlace()
            }
        },
        destroy: function () {
            return this.element
        }
    }), c.window = {
        isWindow: function (e) {
            return u.isMetroObject(e, "window")
        },
        min: function (e, t) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").min(t)
        },
        max: function (e, t) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").max(t)
        },
        show: function (e) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").show()
        },
        hide: function (e) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").hide()
        },
        toggle: function (e) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").toggle()
        },
        isOpen: function (e) {
            return !!this.isWindow(e) && c.getPlugin(e, "window").isOpen()
        },
        close: function (e) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").close()
        },
        pos: function (e, t, n) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").pos(t, n)
        },
        top: function (e, t) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").top(t)
        },
        left: function (e, t) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").left(t)
        },
        width: function (e, t) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").width(t)
        },
        height: function (e, t) {
            if (!this.isWindow(e)) return !1;
            c.getPlugin(e, "window").height(t)
        },
        create: function (e, t) {
            t = d("<div>").appendTo(d(t || "body")), e = d.extend({
                _runtime: !0
            }, e || {});
            return c.makePlugin(t, "window", e)
        }
    }
}(Metro, m4q),
function (i, c) {
    "use strict";
    var d = i.utils,
        n = {
            wizardDeferred: 0,
            start: 1,
            finish: 0,
            iconHelp: "<span class='default-icon-help'></span>",
            iconPrev: "<span class='default-icon-left-arrow'></span>",
            iconNext: "<span class='default-icon-right-arrow'></span>",
            iconFinish: "<span class='default-icon-check'></span>",
            buttonMode: "cycle",
            buttonOutline: !0,
            duration: 300,
            clsWizard: "",
            clsActions: "",
            clsHelp: "",
            clsPrev: "",
            clsNext: "",
            clsFinish: "",
            onPage: i.noop,
            onNextPage: i.noop,
            onPrevPage: i.noop,
            onFirstPage: i.noop,
            onLastPage: i.noop,
            onFinishPage: i.noop,
            onHelpClick: i.noop,
            onPrevClick: i.noop,
            onNextClick: i.noop,
            onFinishClick: i.noop,
            onBeforePrev: i.noop_true,
            onBeforeNext: i.noop_true,
            onWizardCreate: i.noop
        };
    i.wizardSetup = function (e) {
        n = c.extend({}, n, e)
    }, window.metroWizardSetup, i.wizardSetup(window.metroWizardSetup), i.Component("wizard", {
        init: function (e, t) {
            return this._super(t, e, n, {
                id: d.elementId("wizard")
            }), this
        },
        _create: function () {
            var e = this.element;
            this._createWizard(), this._createEvents(), this._fireEvent("wizard-create", {
                element: e
            })
        },
        _createWizard: function () {
            var e, t = this.element,
                n = this.options;
            t.addClass("wizard").addClass(n.view).addClass(n.clsWizard), e = c("<div>").addClass("action-bar").addClass(n.clsActions).appendTo(t);
            t = "button" === n.buttonMode ? "" : n.buttonMode;
            !0 === n.buttonOutline && (t += " outline"), !1 !== n.iconHelp && c("<button>").attr("type", "button").addClass("button wizard-btn-help").addClass(t).addClass(n.clsHelp).html(d.isTag(n.iconHelp) ? n.iconHelp : c("<img>").attr("src", n.iconHelp)).appendTo(e), !1 !== n.iconPrev && c("<button>").attr("type", "button").addClass("button wizard-btn-prev").addClass(t).addClass(n.clsPrev).html(d.isTag(n.iconPrev) ? n.iconPrev : c("<img>").attr("src", n.iconPrev)).appendTo(e), !1 !== n.iconNext && c("<button>").attr("type", "button").addClass("button wizard-btn-next").addClass(t).addClass(n.clsNext).html(d.isTag(n.iconNext) ? n.iconNext : c("<img>").attr("src", n.iconNext)).appendTo(e), !1 !== n.iconFinish && c("<button>").attr("type", "button").addClass("button wizard-btn-finish").addClass(t).addClass(n.clsFinish).html(d.isTag(n.iconFinish) ? n.iconFinish : c("<img>").attr("src", n.iconFinish)).appendTo(e), this.toPage(n.start), this._setHeight()
        },
        _setHeight: function () {
            var e = this.element,
                t = e.children("section"),
                n = 0;
            t.children(".page-content").css("max-height", "none"), c.each(t, function () {
                var e = c(this).height();
                n < parseInt(e) && (n = e)
            }), e.height(n)
        },
        _createEvents: function () {
            var t = this,
                n = this.element;
            n.on(i.events.click, ".wizard-btn-help", function () {
                var e = n.children("section").get(t.current - 1);
                t._fireEvent("help-click", {
                    index: t.current,
                    page: e
                })
            }), n.on(i.events.click, ".wizard-btn-prev", function () {
                t.prev();
                var e = n.children("section").get(t.current - 1);
                t._fireEvent("prev-click", {
                    index: t.current,
                    page: e
                })
            }), n.on(i.events.click, ".wizard-btn-next", function () {
                t.next();
                var e = n.children("section").get(t.current - 1);
                t._fireEvent("next-click", {
                    index: t.current,
                    page: e
                })
            }), n.on(i.events.click, ".wizard-btn-finish", function () {
                var e = n.children("section").get(t.current - 1);
                t._fireEvent("finish-click", {
                    index: t.current,
                    page: e
                })
            }), n.on(i.events.click, ".complete", function () {
                var e = c(this).index() + 1;
                t.toPage(e)
            }), c(window).on(i.events.resize, function () {
                t._setHeight()
            }, {
                ns: this.id
            })
        },
        next: function () {
            var e = this.element,
                t = this.options,
                n = e.children("section"),
                i = c(e.children("section").get(this.current - 1));
            this.current + 1 > n.length || !1 === d.exec(t.onBeforeNext, [this.current, i, e]) || (this.current++, this.toPage(this.current), i = c(e.children("section").get(this.current - 1)), this._fireEvent("next-page", {
                index: this.current,
                page: i[0]
            }))
        },
        prev: function () {
            var e = this.element,
                t = this.options,
                n = c(e.children("section").get(this.current - 1));
            this.current - 1 != 0 && !1 !== d.exec(t.onBeforePrev, [this.current, n, e]) && (this.current--, this.toPage(this.current), n = c(e.children("section").get(this.current - 1)), this._fireEvent("prev-page", {
                index: this.current,
                page: n[0]
            }))
        },
        last: function () {
            var e = this.element;
            this.toPage(e.children("section").length), e = c(e.children("section").get(this.current - 1)), this._fireEvent("last-page", {
                index: this.current,
                page: e[0]
            })
        },
        first: function () {
            var e = this.element;
            this.toPage(1), e = c(e.children("section").get(0)), this._fireEvent("first-page", {
                index: this.current,
                page: e[0]
            })
        },
        toPage: function (e) {
            var t, n, i, s = this.element,
                a = this.options,
                o = c(s.children("section").get(e - 1)),
                r = s.children("section"),
                l = s.find(".action-bar");
            0 !== o.length && (t = s.find(".wizard-btn-finish").addClass("disabled"), n = s.find(".wizard-btn-next").addClass("disabled"), i = s.find(".wizard-btn-prev").addClass("disabled"), this.current = e, s.children("section").removeClass("complete current").removeClass(a.clsCurrent).removeClass(a.clsComplete), o.addClass("current").addClass(a.clsCurrent), o.prevAll().addClass("complete").addClass(a.clsComplete), e = 0 === s.children("section.complete").length ? 0 : parseInt(d.getStyleOne(s.children("section.complete")[0], "border-left-width")), l.animate({
                draw: {
                    left: s.children("section.complete").length * e + 41
                },
                dur: a.duration
            }), (this.current === r.length || 0 < a.finish && this.current >= a.finish) && t.removeClass("disabled"), 0 < parseInt(a.finish) && this.current === parseInt(a.finish) && this._fireEvent("finish-page", {
                index: this.current,
                page: o[0]
            }), this.current < r.length && n.removeClass("disabled"), 1 < this.current && i.removeClass("disabled"), this._fireEvent("page", {
                index: this.current,
                page: o[0]
            }))
        },
        changeAttribute: function () {},
        destroy: function () {
            var e = this.element;
            return e.off(i.events.click, ".wizard-btn-help"), e.off(i.events.click, ".wizard-btn-prev"), e.off(i.events.click, ".wizard-btn-next"), e.off(i.events.click, ".wizard-btn-finish"), e.off(i.events.click, ".complete"), c(window).off(i.events.resize, {
                ns: this.id
            }), e
        }
    })
}(Metro, m4q);
//# sourceMappingURL=metro.min.js.map