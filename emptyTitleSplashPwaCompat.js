(function () {
  function r(a) {
    try {
      return document.head.querySelector(a);
    } catch (b) {
      return null;
    }
  }
  function x(a, b) {
    a = "__pwacompat_" + a;
    void 0 !== b && (y[a] = b);
    return y[a];
  }
  function G() {
    var a = (z = r('link[rel="manifest"]')) ? z.href : "";
    if (!a) throw 'can\'t find <link rel="manifest" href=".." />\'';
    var b = R([a, location]),
      d = x("manifest");
    if (d)
      try {
        var g = JSON.parse(d);
        H(g, b);
      } catch (t) {
        console.warn("PWACompat error", t);
      }
    else {
      var n = new XMLHttpRequest();
      n.open("GET", a);
      n.withCredentials = "use-credentials" === z.getAttribute("crossorigin");
      n.onload = function () {
        try {
          var t = JSON.parse(n.responseText);
          x("manifest", n.responseText);
          H(t, b);
        } catch (u) {
          console.warn("PWACompat error", u);
        }
      };
      n.send(null);
    }
  }
  function R(a) {
    for (var b = {}, d = 0; d < a.length; b = { c: b.c }, ++d) {
      b.c = a[d];
      try {
        return (
          new URL("", b.c),
          (function (g) {
            return function (n) {
              return new URL(n || "", g.c).toString();
            };
          })(b)
        );
      } catch (g) {}
    }
    return function (g) {
      return g || "";
    };
  }
  function D(a, b) {
    if ("meta" !== a || !r('meta[name="' + b.name + '"]'))
      if (
        "link" !== a ||
        !(
          r('link[href="' + b.href + '"]') ||
          (b.sizes && r('link[sizes="' + b.sizes + '"]'))
        )
      ) {
        a = document.createElement(a);
        for (var d in b) a.setAttribute(d, b[d]);
        document.head.appendChild(a);
        return a;
      }
  }
  function h(a, b) {
    b && (!0 === b && (b = "yes"), D("meta", { name: a, content: b }));
  }
  function v(a) {
    a = a.sizes.split(/\s+/g).map(function (b) {
      return "any" === b ? Infinity : parseInt(b, 10) || 0;
    });
    return Math.max.apply(null, a);
  }
  function H(a, b) {
    function d(f, c, k, m) {
      var e = window.devicePixelRatio,
        l = E({ width: f * e, height: c * e });
      l.scale(e, e);
      l.fillStyle = A;
      l.fillRect(0, 0, f, c);
      l.translate(f / 2, (c - 20) / 2);
      m &&
        ((c = m.width / e),
        (e = m.height / e),
        128 < e && ((c /= e / 128), (e = 128)),
        48 <= c &&
          48 <= e &&
          (l.drawImage(m, c / -2, e / -2, c, e), l.translate(0, e / 2 + 20)));
      l.fillStyle = S ? "white" : "black";
      l.font = "24px HelveticaNeue-CondensedBold";
      l.font = getComputedStyle(z).getPropertyValue("--pwacompat-splash-font");
      e = "";
      c = l.measureText(e);
      m = c.f || 24;
      l.translate(0, m);
      if (c.width < 0.8 * f) l.fillText(e, c.width / -2, 0);
      else
        for (e = e.split(/\s+/g), c = 1; c <= e.length; ++c) {
          var I = e.slice(0, c).join(" "),
            J = l.measureText(I).width;
          if (c === e.length || J > 0.6 * f)
            l.fillText(I, J / -2, 0),
              l.translate(0, 1.2 * m),
              e.splice(0, c),
              (c = 0);
        }
      return function () {
        var K = l.canvas.toDataURL();
        g(k, K);
        return K;
      };
    }
    function g(f, c) {
      var k = document.createElement("link");
      k.setAttribute("rel", "apple-touch-startup-image");
      k.setAttribute("media", "(orientation: " + f + ")");
      k.setAttribute("href", c);
      document.head.appendChild(k);
    }
    function n(f, c) {
      var k = window.screen,
        m = d(k.availWidth, k.availHeight, "portrait", f),
        e = d(k.availHeight, k.availWidth, "landscape", f);
      setTimeout(function () {
        w.p = m();
        setTimeout(function () {
          w.l = e();
          c();
        }, 10);
      }, 10);
    }
    function t(f) {
      function c() {
        --k || f();
      }
      var k = B.length + 1;
      c();
      B.forEach(function (m) {
        var e = new Image();
        e.crossOrigin = "anonymous";
        e.onerror = c;
        e.onload = function () {
          e.onload = null;
          m.href = L(e, A, !0);
          w.i[e.src] = m.href;
          c();
        };
        e.src = m.href;
      });
    }
    function u() {
      x("iOS", JSON.stringify(w));
    }
    function M() {
      var f = B.shift();
      if (f) {
        var c = new Image();
        c.crossOrigin = "anonymous";
        c.onerror = function () {
          return void M();
        };
        c.onload = function () {
          c.onload = null;
          n(c, function () {
            var k = a.background_color && L(c, A);
            k ? ((f.href = k), (w.i[c.src] = k), t(u)) : u();
          });
        };
        c.src = f.href;
      } else n(null, u);
    }
    var q = a.icons || [],
      p = q.filter(function (f) {
        return (f.h || "").includes("maskable");
      });
    q.sort(function (f, c) {
      return v(c) - v(f);
    });
    p.sort(function (f, c) {
      return v(c) - v(f);
    });
    var B = (0 < p.length ? p : q)
      .map(function (f) {
        var c = { rel: "icon", href: b(f.src), sizes: f.sizes };
        D("link", c);
        if (C && !(120 > v(f)))
          return (c.rel = "apple-touch-icon"), D("link", c);
      })
      .filter(Boolean);
    p = r('meta[name="viewport"]');
    var T = !!((p && p.content) || "").match(/\bviewport-fit\s*=\s*cover\b/),
      N = a.display;
    p = -1 !== U.indexOf(N);
    h("mobile-web-app-capable", p);
    V(a.theme_color || "black", T);
    W &&
      (h("application-name", a.short_name),
      h("msapplication-tooltip", a.description),
      h("msapplication-starturl", b(a.start_url || ".")),
      h("msapplication-navbutton-color", a.theme_color),
      (q = q[0]) && h("msapplication-TileImage", b(q.src)),
      h("msapplication-TileColor", a.background_color));
    h("theme-color", a.theme_color);
    if (C) {
      var A = a.background_color || "#f8f9fa",
        S = O(A);
      (q = X(a.related_applications)) && h("apple-itunes-app", "app-id=" + q);
      h("apple-mobile-web-app-capable", p);
      h("apple-mobile-web-app-title", a.short_name || a.name);
      if ((p = x("iOS")))
        try {
          var F = JSON.parse(p);
          g("portrait", F.p);
          g("landscape", F.l);
          B.forEach(function (f) {
            var c = F.i[f.href];
            c && (f.href = c);
          });
          return;
        } catch (f) {}
      var w = { i: {} };
      M();
    } else
      (q =
        { por: "portrait", lan: "landscape" }[
          String(a.orientation || "").substr(0, 3)
        ] || ""),
        h("x5-orientation", q),
        h("screen-orientation", q),
        "fullscreen" === N
          ? (h("x5-fullscreen", "true"), h("full-screen", "yes"))
          : p && (h("x5-page-mode", "app"), h("browsermode", "application"));
  }
  function X(a) {
    var b;
    (a || [])
      .filter(function (d) {
        return "itunes" === d.platform;
      })
      .forEach(function (d) {
        d.id ? (b = d.id) : (d = d.url.match(/id(\d+)/)) && (b = d[1]);
      });
    return b;
  }
  function V(a, b) {
    if (C || Y) {
      var d = O(a);
      if (C)
        h(
          "apple-mobile-web-app-status-bar-style",
          b ? "black-translucent" : d ? "black" : "default"
        );
      else {
        a: {
          try {
            var g = Windows.UI.ViewManagement.ApplicationView.getForCurrentView()
              .titleBar;
            break a;
          } catch (n) {}
          g = void 0;
        }
        if ((b = g))
          (d = d ? 255 : 0),
            (b.foregroundColor = { r: d, g: d, b: d, a: 255 }),
            (a = P(a)),
            (b.backgroundColor = { r: a[0], g: a[1], b: a[2], a: a[3] });
      }
    }
  }
  function P(a) {
    var b = E();
    b.fillStyle = a;
    b.fillRect(0, 0, 1, 1);
    return b.getImageData(0, 0, 1, 1).data || [];
  }
  function O(a) {
    a = P(a).map(function (b) {
      b /= 255;
      return 0.03928 > b ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    });
    return (
      3 <
      Math.abs(1.05 / (0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2] + 0.05))
    );
  }
  function L(a, b, d) {
    d = void 0 === d ? !1 : d;
    var g = E(a);
    g.drawImage(a, 0, 0);
    if (d || 255 !== g.getImageData(0, 0, 1, 1).data[3])
      return (
        (g.globalCompositeOperation = "destination-over"),
        (g.fillStyle = b),
        g.fillRect(0, 0, a.width, a.height),
        g.canvas.toDataURL()
      );
  }
  function E(a) {
    a = void 0 === a ? { width: 1, height: 1 } : a;
    var b = a.height,
      d = document.createElement("canvas");
    d.width = a.width;
    d.height = b;
    return d.getContext("2d");
  }
  if ("onload" in XMLHttpRequest.prototype && !navigator.j) {
    var U = ["standalone", "fullscreen", "minimal-ui"],
      Q = navigator.userAgent || "",
      C =
        (navigator.vendor &&
          -1 !== navigator.vendor.indexOf("Apple") &&
          (-1 !== Q.indexOf("Mobile/") || "standalone" in navigator)) ||
        !1,
      W = !!Q.match(/(MSIE |Edge\/|Trident\/)/),
      Y = "undefined" !== typeof Windows,
      z;
    try {
      var y = sessionStorage;
    } catch (a) {}
    y = y || {};
    "complete" === document.readyState
      ? G()
      : window.addEventListener("load", G);
  }
})();
