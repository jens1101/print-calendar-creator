//Copyright timeanddate.com 2021, do not use without permission
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
  ? Object.defineProperty
  : function (a, b, c) {a != Array.prototype && a != Object.prototype && (a[b] = c.value);};
$jscomp.getGlobal = function (a) {
  return 'undefined' != typeof window && window === a
    ? a
    : 'undefined' != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split('.');
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {
      configurable: !0,
      writable: !0,
      value: b,
    });
  }
};
$jscomp.polyfill('Object.is', function (a) {
  return a ? a : function (a, c) {
    return a === c
      ? 0 !== a || 1 / a === 1 / c
      : a !== a && c !== c;
  };
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.includes', function (a) {
  return a
    ? a
    : function (a, c) {
      var b = this;
      b instanceof String && (b = String(b));
      var e = b.length;
      c = c || 0;
      for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
        var f = b[c];
        if (f === a || Object.is(f, a)) {
          return !0;
        }
      }
      return !1;
    };
}, 'es7', 'es3');
$jscomp.checkStringArgs = function (a, b, c) {
  if (null == a) {
    throw new TypeError('The \'this\' value for String.prototype.' + c + ' must not be null or undefined');
  }
  if (b instanceof RegExp) {
    throw new TypeError('First argument to String.prototype.' + c + ' must not be a regular expression');
  }
  return a + '';
};
$jscomp.polyfill('String.prototype.includes', function (a) {
  return a
    ? a
    : function (a, c) {return -1 !== $jscomp.checkStringArgs(this, a, 'includes').indexOf(a, c || 0);};
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.fill', function (a) {
  return a
    ? a
    : function (a, c, d) {
      var b = this.length || 0;
      0 > c && (c = Math.max(0, b + c));
      if (null == d || d > b) {
        d = b;
      }
      d = Number(d);
      0 > d && (d = Math.max(0, b + d));
      for (c = Number(c || 0); c < d; c++) this[c] = a;
      return this;
    };
}, 'es6', 'es3');
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? {
      done: !1,
      value: a[b++],
    } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {return { next: $jscomp.arrayIteratorImpl(a) };};
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function (a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, 'description', {
    configurable: !0,
    writable: !0,
    value: b,
  });
};
$jscomp.SymbolClass.prototype.toString = function () {return this.$jscomp$symbol$id_;};
$jscomp.Symbol = function () {
  function a (c) {
    if (this instanceof a) {
      throw new TypeError('Symbol is not a constructor');
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || '') + '_' + b++, c);
  }

  var b = 0;
  return a;
}();
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol('Symbol.iterator'));
  'function' != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function () {return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));},
  });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.initSymbolAsyncIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol('Symbol.asyncIterator'));
  $jscomp.initSymbolAsyncIterator = function () {};
};
$jscomp.iteratorPrototype = function (a) {
  $jscomp.initSymbolIterator();
  a = { next: a };
  a[$jscomp.global.Symbol.iterator] = function () {return this;};
  return a;
};
$jscomp.iteratorFromArray = function (a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += '');
  var c = 0, d = {
    next: function () {
      if (c < a.length) {
        var e = c++;
        return {
          value: b(e, a[e]),
          done: !1,
        };
      }
      d.next = function () {
        return {
          done: !0,
          value: void 0,
        };
      };
      return d.next();
    },
  };
  d[Symbol.iterator] = function () {return d;};
  return d;
};
$jscomp.polyfill('Array.prototype.keys', function (a) {
  return a
    ? a
    : function () {return $jscomp.iteratorFromArray(this, function (a) {return a;});};
}, 'es6', 'es3');
window._T = window._T || {};
Mf = Math.floor;
Mr = Math.random;

function pf (a, b) {
  a = '' + a;
  b -= a.length;
  0 < b && (a = '0000000000'.slice(10 - b) + a);
  return a;
}

function p2 (a) {return 10 > a ? '0' + a : '' + a;}

function lim (a, b, c) {return Math.max(Math.min(a, c), b);}

function dt () {return (new Date).getTime();}

function it (a, b) {
  if (a) {
    var c = a.length, d;
    for (d = 0; d < c; d++) b(a[d], d);
  }
}

function ia (a, b) {
  if (a) {
    for (var c in a) a.hasOwnProperty(c) && b(c, a[c]);
  }
}

function sprintfloc (a) {
  var b = Array.prototype.slice.call(arguments, 1);
  return a.replace(/%(\d*)(\.?)(\d*)([dfs])/g, function (a, d, e, f, g) {
    a = b.shift();
    if ('s' == g) {
      return a;
    }
    if ('d' == g || 'f' == g) {
      return g = a - 0, f = 0 <= f
        ? g.toFixed(f)
        : g + '', TAD.sep && (f = f.split('.'), f[0] = f[0].replace(/\B(?=(\d{3})+(?!\d))/g, TAD.sep), f = f.join('.')), TAD.dec && (f = f.replace(/\./, TAD.dec)), f;
    }
  });
}

function sprintf (a) {
  var b = Array.prototype.slice.call(arguments, 1);
  return a.replace(/%(\d*)(\.?)(\d*)([dfs])/g, function (a, d, e, f, g) {
    a = b.shift();
    if ('s' == g) {
      return a;
    }
    if ('d' == g || 'f' == g) {
      return g = a - 0, 0 <= f ? g.toFixed(f) : g;
    }
  });
}

ph = {};

function gx () {
  function a (a) {
    try {
      if (c.ActiveXObject) {
        return new ActiveXObject(a);
      }
    } catch (e) {}
  }

  var b = null, c = window;
  try {c.XMLHttpRequest && (b = new XMLHttpRequest);} catch (d) {}
  b || (b = a('Msxml2.XMLHTTP'));
  b || (b = a('Microsoft.XMLHTTP'));
  return b;
}

(function () {
  function a (a, c, d, e, f) {
    if (a) {
      try {
        return a.open(d, ('https:' == document.location.protocol
          ? 'https://'
          : 'http://') + document.domain + (document.location.port
          ? ':' + document.location.port
          : '') + c, !0), f && (a.onreadystatechange = f), 'POST' == d && a.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'), a.send(e), 1;
      } catch (g) {}
    }
    return 0;
  }

  gp = function (b, c, d) {return a(b, c, 'GET', '', d);};
  pp = function (b, c, d, e) {return a(b, c, 'POST', d, e);};
})();

function rs4 (a) {
  if (a && 4 == a.readyState) {
    if (200 !== a.status) {
      errm = 'rs4:status=' + a.status;
      return;
    }
    return a.responseText + '';
  }
  return !1;
}

function ghj (a) {
  var b = {
    h: '',
    j: '',
    s: [],
  }, c = document.createElement('div');
  c.innerHTML = a;
  arrclone(c.querySelectorAll('script')).forEach(function (a) {
    a.src
      ? (b.s.push(a.src), a.parentElement.removeChild(a))
      : 'text/template' !== a.type && (b.j += a.innerText, a.parentElement.removeChild(a));
  });
  b.h = c.innerHTML;
  return b;
}

function jcb (a, b, c) {
  var d = gx();
  c && (d.onerror = c);
  return d ? (gp(d, a, function () {
    var a = rs4(d);
    a && b(a);
  }), !0) : !1;
}

function rf (a, b, c, d) {
  iH(a, b);
  a = Mf(1E3 * (c + Mr() * d));
  setTimeout(function () {location.reload();}, a);
}

function phg (a, b, c) {
  var d = ph[a];
  d ? c(d) : jcb(b, function (b) {
    ph[a] = b;
    c(b);
  });
}

function gf (a) {
  if ('string' === typeof a) {
    var b = document;
    return b.getElementById ? b.getElementById(a) : b.all ? b.all[a] : null;
  }
  return a;
}

function cDF () {return document.createDocumentFragment();}

function cE (a, b, c) {
  var d = document.createElement(a);
  ia(b, function (a, b) {'class' === a ? d.className = b : sA(d, a, b);});
  aCh(c, d);
  return d;
}

function aCh (a, b) {a && b && a.appendChild(b);}

dce = cE;

function hC (a, b) {return (a = a.className) && 0 <= (' ' + a + ' ').indexOf(' ' + b + ' ');}

function gA (a, b) {
  if (a) {
    return a.getAttribute(b);
  }
}

function sA (a, b, c) {
  if (a) {
    return a.setAttribute(b, c);
  }
}

function ddE () {return document.documentElement;}

function arrclone (a) {
  var b = [], c = a.length, d;
  for (d = 0; d < c; d++) b[d] = a[d];
  return b;
}

function gebc (a, b) {
  b || (b = document);
  if (b.getElementsByClassName) {
    var c = b.getElementsByClassName(a);
    return arrclone(c);
  }
  b = b.firstChild;
  var d = [];
  if (b) {do 1 == b.nodeType && (b.className && hC(b, a) && d.push(b), (c = gebc(a, b)).length && (d = d.concat(c))); while (b = b.nextSibling);}
  return arrclone(d);
}

function gebn (a, b) {
  b || (b = document);
  a = b.getElementsByName(a);
  return arrclone(a);
}

function gebtn (a, b) {
  if ('string' === typeof b && (b = gf(b), !b)) {
    return [];
  }
  b || (b = document);
  a = b.getElementsByTagName(a);
  return arrclone(a);
}

function gebtn0 (a, b) {
  (a = gebtn(a, b)) && (a = a[0]);
  return a;
}

function ih (a, b) {a && (a.innerHTML = b);}

function iH (a, b) {ih(gf(a), b);}

function sd (a, b) {a && (a.style.display = b ? 2 == b ? 'block' : '' : 'none');}

function he (a, b) {sd(gf(a), b);}

function ee (a, b, c) {
  if (a = a[b]) {
    a.disabled = !c;
  }
}

function ac (a, b, c) {
  if (a) {
    a = gf(a);
    var d = a.className + ' ', e = ' ' + d, f = e.indexOf(' ' + b + ' ');
    if (c) {
      if (0 <= f) {
        return;
      }
      d += b;
    } else {
      if (0 > f) {
        return;
      }
      d = d.substring(0, f) + e.substring(f + b.length + 1);
      d = d.replace(/\s\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, '');
    }
    a.className = d;
  }
}

function po (a) {
  for (var b = {
    x: 0,
    y: a.offsetHeight,
  }; a;) b.x += a.offsetLeft, b.y += a.offsetTop, a = a.offsetParent;
  return b;
}

function ap (a, b) {
  var c = b = 0, d = 0;
  if (a.getBoundingClientRect && navigator.appVersion.match(/MSIE [3-7]/)) {
    c = ddE(), a = a.getBoundingClientRect(), b = a.left + c.scrollLeft, c = a.top + c.scrollTop;
  } else {
    for (; a;) 'fixed' == gcst(a, 'position') && (d = a), b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
  }
  return {
    x: b,
    y: c,
    f: d,
  };
}

function isdef (a) {return void 0 !== a;}

function ep (a, b) {
  a = a.style;
  isdef(b.x) && (a.left = b.x + 'px');
  isdef(b.y) && (a.top = b.y + 'px');
  isdef(b.f) && (a.position = b.f ? 'fixed' : 'absolute');
}

function gcst (a, b) {
  var c = window.getComputedStyle;
  if (c) {
    return c(a, null).getPropertyValue(b);
  }
  if (c = a.currentStyle) {
    return c[b];
  }
}

function gcs (a, b) {
  var c = window.getComputedStyle, d = function (a, b) {
    var c = /^[0-9\.]+(px)?$/i;
    if (0 < parseFloat(b)) {
      if (c.test(b)) {
        return parseInt(b);
      }
      c = a.style.left;
      var d = a.runtimeStyle.left;
      a.runtimeStyle.left = a.currentStyle.left;
      a.style.left = b || 0;
      b = a.style.pixelLeft;
      a.style.left = c;
      a.runtimeStyle.left = d;
    } else {
      b = 0;
    }
    return b;
  };
  if (c) {
    if (c = c(a, null)) {
      return d(a, c.getPropertyValue(b));
    }
  } else if (c = a.currentStyle) {
    return c = c[b], 'height' == b && 'auto' == c && (c = a.offsetHeight - gcs(a, 'marginTop') - gcs(a, 'marginBottom')), d(a, c);
  }
  return null;
}

function es (a, b) {
  a = a.style;
  0 < b.w && (a.width = b.w + 'px');
  0 < b.h && (a.height = b.h + 'px');
}

function esp (a, b) {
  a = a.style;
  0 < b.w && (a.width = b.w + '%');
  0 < b.h && (a.height = b.h + '%');
}

function esa (a, b) {
  es(a, b);
  ep(a, b);
}

function sw (a) {
  var b = [], c = 0;
  it(a, function (a, e) {
    b[e] = a;
    a = a.offsetWidth;
    a > c && (c = a);
  });
  it(b, function (a) {es(a, { w: c });});
}

function jp (a, b, c, d, e, f) {
  var g = b.offsetWidth, h = c.offsetWidth;
  c = c.offsetHeight;
  -1E3 > d && (a.x += d + 1E3, d = -1);
  -1 == d && (a.x -= g - h);
  1 == d && (a.x += h);
  2 == d && (a.x += (h - g) / 2);
  -1 == e && (a.y -= c);
  1 == e && (a.y += c);
  2 == e && (a.y += (c - b.offsetHeight) / 2);
  0 > a.x && (a.x = 0);
  f && a.x + g > window.innerWidth && (a.x -= a.x + g - window.innerWidth);
}

function siv (a, b, c, d, e) {
  var f = ddE(), g = 0, h = 0, k = 0;
  e = e ? 40 + e : 40;
  var l = c ? c : 1E3, m = d ? m : function (a) {return 1 == a ? 1 : 1 - Math.pow(2, -10 * a);};
  c = function () {
    function a (c) {
      c = dt() - b;
      c = 0 > c ? 0 : c;
      c >= l ? t(1) : k === q() ? (t(c / l), raf(a)) : t(1);
    }

    var b = dt();
    raf(a);
  };
  var q = function () {
    return void 0 !== window.pageYOffset
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }, t = function (a) {
    a = m(a);
    k = Mf(h + (g - h) * a);
    window.scrollTo(0, k);
  };
  a = gf(a);
  d = ap(a);
  var p = q();
  if (d.y + a.clientHeight > p + f.clientHeight ||
    b) {
    g = b ? d.y - e : Math.min(d.y - f.clientHeight + a.clientHeight, d.y - e), h = k = p, c();
  }
  return !1;
}

function gsv () {
  var a = ddE();
  a = {
    w: window.innerWidth || document.body.clientWidth,
    h: document.height || document.body.scrollHeight,
    W: a ? a.clientWidth : 980,
    H: a ? a.clientHeight : 600,
  };
  a.H > a.h && (a.h = a.H);
  return a;
}

UA = function () {
  function a (a) {
    var c;
    for (c = 0; c < a.length; c++) if (a[c] in b) {
      return a[c];
    }
    return !1;
  }

  var b = cE('a').style;
  return {
    trans: a(['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform']),
    d3: a(['perspective', 'webkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
    mat: function (a, b) {
      b = b || 1;
      var c = 2 * Math.PI / 360 * a;
      a = Math.cos(c);
      c = Math.sin(c);
      return 'progid:DXImageTransform.Microsoft.Matrix(M11=' + a * b + ',M12=' + -c * b + ',M21=' + c * b + ',M22=' + a * b + ',SizingMethod=\'auto expand\')';
    },
  };
}();

function wl (a) {
  var b = window.location;
  a && (b.href = a);
  return b;
}

function gso (a) {return a.options[a.selectedIndex];}

function gfv (a) {
  var b = a.type;
  if (b) {
    switch (b) {
      case 'select-one':
        return gso(a).value;
      case 'radio':
        if (a.checked) {
          return a.value;
        }
        break;
      case 'checkbox':
        return a.checked ? a.value : '';
      case 'button':
      case 'submit':
        break;
      default:
        return a.value;
    }
  }
  return null;
}

function ga (a) {
  var b = [], c = a.elements, d = c.length, e;
  for (e = 0; e < d; e++) {
    a = c[e];
    var f = gfv(a);
    null !== f && (b[a.name] = f);
  }
  return b;
}

function au (a) {
  var b = [], c = 0, d;
  for (d in a) '' !== d && (b[c++] = d += '=' + escape(a[d]));
  return b.join('&');
}

function ru (a, b) {
  var c = b.split('&');
  a = a.replace(/\?/, '?&');
  for (b = 0; b < c.length; b++) {
    var d = c[b], e = d.indexOf('=');
    0 < e && (e = d.substr(0, e + 1), e = a.indexOf('&' + e), a = 0 < e
      ? a.substring(0, e + 1) + d + a.substring(e + 1)
      : a + ('&' + d));
  }
  return a.replace(/\?&/, '?');
}

function hu (a) {return a.replace(/&/, '&amp;');}

function aau (a) {it(a.elements, function (a) {sA(a, 'autocomplete', 'off');});}

function dau (a) {it(a.elements, function (a) {a.removeAttribute('autocomplete');});}

sem_a = {};

function sem (a, b) {
  var c = a.name;
  sem_a[c] != b && (sem_a[c] = b, a = gf('e' + c), c = gf(c), a && (ih(a, b), ac(a, 'errmark', b)), c && ac(c, 'errf', b));
}

function jsav (a, b) {
  a += '&' + au(ga(b));
  jcb(a, function (a) {
    var b = 'Some error occured - was not able to save';
    a.match(/JS:/) && ((a = a.match(/JS:FAIL:(.*)/))
      ? (b = a[1], document.cookie = 'SAVEINFO=0:1::' + escape(b) + ';domain=.timeanddate.com;path=/;secure')
      : b = 'Please wait - reloading page now', location.reload());
    iH('jcdiv', b);
  });
}

menact = null;
men = {};
window.TAD || (window.TAD = {});

function PU (a) {
  this.n = a;
  this.s = 0;
  PU.p[PU.p.length] = this;
}

PU.p = [];
PU.C = function (a) {it(PU.p, function (b) {b != a && b.k();});};
PU.prototype.i = function (a) {
  var b = this.e, c = 1;
  it(a, function (a) {a == b && (c = 0);});
  c && 200 < dt() + this.s && this.k();
};
var trkclk = .2 > Mr();
ael(window, 'click', function (a) {
  a = ev(a).e;
  a = a.target || a.currentTarget || a.relatedTarget || a.fromElement || a.srcElement;
  for (var b = [], c = a; c;) {
    var d = c.parentNode;
    b[b.length] = c;
    c = d;
  }
  it(PU.p, function (a) {a.s && a.i(b);});
  if (a && trkclk && ((c = a.href) || (c = 'submit' == a.type
    ? 'submit'
    : b[1].href), c)) {
    var e = '';
    b.pop();
    b.pop();
    it(b, function (a) {
      var b = a.tagName;
      b && (e = b + ':' + a.id + ';' + a.className + '>' + e);
    });
    e = window.location.pathname + '>>' + e + '>>' + c + '>>' + a.innerHTML;
    document.cookie = 'LINKUSED=' + escape(e) + ';domain=.timeanddate.com;path=/';
  }
});
PU.prototype.h = function (a) {
  var b = gf(this.n);
  this.e = b;
  ih(b, a);
  this.o();
  return b;
};
PU.prototype.d = function (a) {
  var b = gf(this.n);
  this.e = b;
  aCh(b, a);
  this.o();
  return b;
};
PU.prototype.E = function (a) {
  this.e = a;
  if (a = a.id) {
    this.n = a;
  }
};
PU.prototype.y = function () {
  var a = this;
  a.s = -dt();
  setTimeout(function () {a.s = -dt();}, 1);
};
PU.prototype.o = function () {
  this.y();
  PU.C(this);
  sd(this.e, 2);
};
PU.prototype.k = function () {
  sd(this.e, 0);
  this.s = 0;
  this.c && this.c();
};
PU.prototype.x = function (a) {a && a != this.s || 0 <= this.s && this.k();};
PU.prototype.z = function (a) {
  var b = this;
  a = a || 330;
  var c = dt() + a;
  b.s = c;
  window.setTimeout(function () {b.x(c);}, a + 100);
};
PU.prototype.A = function (a, b, c, d) {
  a = ghj(a);
  var e = this.h(a.h), f = ap(b);
  jp(f, e, b, c || 0, 1, d);
  ep(e, f);
  eval(a.j);
};
pM = new PU('po1');

function mena (a, b) {
  b.n = a;
  var c = a.indexOf('txt');
  0 < c && (b.N = a.slice(0, c));
  men[a] = b;
}

function menh (a) {
  var b = menact;
  if (b) {
    var c = b.e.getElementsByTagName('li');
    if (c) {
      var d = function (a, b) {'number' === typeof a && 0 <= a && a < c.length && ac(c[a], 'h', b);};
      d(b.h, 0);
      d(a, 1);
      b.h = a;
    }
  }
}

function fe (a, b) {
  var c = document.createEvent('HTMLEvents');
  c.initEvent(a, !0, !0);
  b.dispatchEvent(c);
}

function mech (a, b, c) {
  if (b) {
    if (b.cf && !c && b.cf(a, b)) {
      pM.k();
      return;
    }
    a.i && (a.i.value = b.n);
    (c = pM.f) ? c(a, b) : a.f ? a.f(a, b) : a.g && b.U
      ? (b = b.U, b.match(/^@/) && (b = a.i.form.action + '?' + b), wl(b))
      : (fe('change', a.i), a.I && (a.I.value = b.U, fe('change', a.I), fh[a.n].H = b.U), va(a.i.id, a.i));
  }
  pM.k();
}

function menc (a) {
  var b = menact;
  b && (a = b.a[a]) && mech(b, a);
}

function menfr () {
  var a = menact;
  if (a && (a = a.a[0]) && a.U) {
    return 1;
  }
}

function mmenc () {menfr() && menc(0);}

function mens (a, b) {
  var c = men[a];
  if (c) {
    a = ap(b);
    var d = c.u ? c.u.replace(/&amp;/g, '&') : '/', e = 0, f = c.c || 'mn', g = c.C || f;
    f = '<div class=' + f + ' onmouseout=\'pM.z()\'> ';
    var h = c.a.length, k = c.r, l = 0, m = k && k < h, q = 1;
    m ? (q = Mf((h + k - 1) / k), f += '<table><tr>') : k = h;
    for (; q--;) {
      l += k;
      for (var t = '<ul class=' + g + '>'; e < h && e < l; e++) {
        var p = c;
        var n = e, w = q, u = e + 1 >= l, r = p.a[n], v = '';
        if (r.w) {
          p = '<li class=asi-raw>' + r.w + '</li>';
        } else {
          if (1 === r.s) {
            v += '<li class=mnd>&nbsp;';
          } else {
            var x = '';
            r.p && (x = hu(ru(d, r.p)));
            r.u && (x = r.u);
            w = (w = (w ? 'lr' : '') + (u ? ' ls' : '')) ?
              'class=\'' + w + '\' ' : '';
            u = 'h';
            r.s && (u = 'asb');
            v += '<li onmouseover=\'pM.y()\'' + (r.h ? ' class=\'' + u + '\' ' : '') + '>';
            u = r.n + (r.b || '') + (r.d || '');
            r.c && (u = '<span class=' + r.c + '>' + u + '</span>');
            if (2 !== r.s) {
              if (x) {
                u = '<a ' + w + 'href=\'' + x + '\'>' + u;
              } else if (p.i || r.v) {
                u = '<a ' + w + 'href=\'javascript:menc(' + n + ')\' onmousedown=\'pM.y()\'>' + u;
              }
            }
            v += u;
            r.x && (v += '<span class=mnx>' + r.x + '</span>');
            v += '</a>';
          }
          p = v + '</li>';
        }
        t += p;
      }
      t += '</ul>';
      f = m ? f + ('<td valign=top>' + t + '</td>') : f + t;
    }
    m && (f += '</tr></table>');
    menact = c;
    d = pM.h(f);
    c.e = d;
    c.i && (d.style.width = '', e = c.i.offsetWidth,
    d.offsetWidth < e && es(d, { w: e }), c.N && (c.I = c.i.form[c.N]));
    jp(a, d, b, 'undefined' != typeof c.j ? c.j : -1, 1);
    'asu' == c.C && (a.x -= 2, a.y += 5);
    b = b.offsetWidth;
    c = d.offsetWidth;
    c < b || 350 < b
      ? es(d.firstChild, { w: b })
      : c > b && 350 < c && es(d.firstChild, { w: 300 });
    ep(d, a);
  }
}

function mensk (a, b) {mens(a, b);}

function ifsm (a, b) {
  a.m = b;
  a.u = -1;
  mena(a.n, b);
  mens(a.n, a.f);
}

function ifd (a) {
  var b = a.f, c = b.value, d = a.n.indexOf('txt');
  if (0 < d) {
    var e = b.form[a.n.slice(0, d)];
    if (e) {
      var f = ':';
      if (a.H && a.T) {
        var g = a.T.toLowerCase();
        0 <= c.toLowerCase().indexOf(g) && (f = a.H);
      }
      e.value = f;
    }
  }
  if (a.e) {
    var h = a.t, k = 11, l = {
      i: b,
      a: [],
    };
    b = function (a, b) {
      var c = b = b.replace(/\D/g, ''), e = 2, f = 0;
      a.i = 1;
      'y' == h && (e = new Date, f = e.getFullYear(), 2 > e.getMonth() && f--, e = b.length, 0 < e && (4 > e && (b += '1005'.slice(e)), f = b.slice(0, 4) - 5), a.a = 3999, e = 4);
      if ('m' == h) {
        f = 1;
        k = 12;
        a.a = 12;
        var g = ' Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
      }
      'M' ==
      h && (f = 1, k = 36, a.a = 36, l.r = 12);
      'd' == h && (f = 1, k = 31, a.a = 31, l.r = 10);
      f = lim(f, 1, 3989);
      'w' == h && (f = 0, k = 54, a.a = 53, l.r = 15);
      if ('i' == h || 's' == h) {
        f = 0, k = 60, a.i = 0, a.a = 59, l.r = 10;
      }
      if ('h' == h) {
        for (f = 0, k = 24, a.i = 0, a.a = 23, l.r = 12, g = [], d = 0; d < k; d++) g[d] = (d + 11) % 12 + 1 + (12 > d
          ? 'am'
          : 'pm');
      }
      'H' == h && (f = 1, k = 12, a.i = 1, a.a = 12, l.r = 12);
      a = [];
      'Y' == h && (f = 0, k = 10);
      'O' == h && (f = 0, k = 25, a = [36, 48, 60], l.r = 12);
      'D' == h && (f = 0, k = 16, a = [30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 365], l.r = 10);
      'W' == h && (f = 0, k = 11, a = [20, 30, 40, 50, 52], l.r = 10);
      for (d = 0; d < k; d++) b = g ? ' - ' +
        g[f] : '', l.a[l.a.length] = {
        n: pf(f, e),
        d: b,
        h: c == f,
      }, f++;
      it(a, function (a) {
        l.a[l.a.length] = {
          n: a,
          h: c == a,
        };
      });
    };
    1 == h.length ? (b(a, c), ifsm(a, l)) : 2 <= h.length && (a.l = 1, a.o || ('ci' == h
      ? (b = getAC(h), b.A(a, c))
      : 'hol' == h && (b = getAC(h), b.A(a, c))));
  }
}

function ifku (a, b) {return ifd(a);}

function ifpd (a) {
  a.preventDefault && a.preventDefault();
  a.returnValue = !1;
}

function ifkd (a, b) {
  var c = a.f, d, e = !0;
  var f = (d = window.event) ? d.keyCode : b.which;
  var g = a.u, h = a.m, k = a.l && h;
  d = 0;
  27 == f && (a.e = 0, pM.k());
  38 == f && (d = -1);
  40 == f && (d = 1);
  if (d) {
    if (k) {
      e = h.a.length - 1;
      for (b = 0; 3 > b && (-1 == g
        ? (a.o = c.value, g = 0 < d ? 0 : e)
        : g += d, g > e && (g = -1), -1 != g && h.a[g].s); b++) ;
      c.value = 0 <= g ? h.a[g].n : a.o;
      0 > g && (a.o = null);
      a.u = g;
      menh(g);
      return !1;
    }
    g = c.value - 0;
    0 <= g && (g += d);
    a = fh[c.name];
    if (!a || !a.a || a.i <= g && a.a >= g) {
      c.value = g, e = !1;
    }
  } else if (13 == f) {
    if (0 <= g && k) {
      return mech(h, h.a[g]), ifpd(b), !1;
    }
  } else {
    a.o = null;
  }
  ifd(a);
  return e;
}

function ifs (a) {
  var b = a.u;
  return a.s && 0 <= b ? !1 : !0;
}

function ifcb (a, b, c) {
  pM.z(50);
  gA(a, 'tad-va') && va(a.name, a);
}

function ifc (a, b, c, d, e) {
  var f = a.name, g = fh[f];
  g && g.f != a && (g = null);
  if (!g) {
    g = {
      n: f,
      f: a,
      t: b,
      j: e ? e : {},
    };
    fh[f] = g;
    b = f.indexOf('txt');
    0 < b && (f = f.slice(0, b), f = a.form[f]) && (g.H = f.value, g.T = a.value);
    if (f = a.form.from) {
      g.F = gfv(f);
    }
    oael(a, 'keydown', function (a) {ifkd(g, a);}, 0);
    oael(a, 'keyup', function (a) {ifku(g, a);}, 0);
    oael(a, 'blur', function (b) {ifcb(a, g, b);}, 0);
    c && (g.s = 1, oael(a.form, 'submit', function () {return ifs(g);}));
    g.x = d ? d : '';
  }
  g.e = 1;
  return ifd(g);
}

function ofs (a, b) {
  var c = 0, d, e = window,
    f = 'directories=no,location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no';
  if (d = e.screen) {
    c = d.availHeight - 30;
    var g = d.availWidth - 10;
  }
  b
    ? (f += ',left=0,screenX=0,top=0,screenY=0,fullscreen=yes', c && (f += ',height=' + c + ',innerHeight=' + c + ',width=' + g + ',innerWidth=' + g))
    : f += ',height=180,width=320';
  if (e.open(a.href, '_blank', f)) {
    return !1;
  }
  alert('Could not open the popup-window, maybe there is a popup-blocker installed');
  b && c && (e.moveTo(0, 0), e.resizeTo(g, c));
  return !0;
}

function jcc () {pM.k();}

getAC = function () {
  var a = {};
  return function (b) {
    var c = a[b];
    c || (c = new AC(b), a[b] = c);
    return c;
  };
}();

function openLocPicker (a, b) {
  TAD.locationpicker = {
    callback: function (c) {
      var d = c.value;
      d.match(/^@/) || (d = a.i.form.action.replace(/[^\/]+$/, '') + d);
      b.n = c.name ? c.name : 'Map location';
      b.U = d;
      a.g = 1;
      mech(a, b, 1);
    },
  };
  modpop('/scripts/field/location-picker-frame.php', null, 'Pick a location', { modal_class: 'modal--wide' });
  return 1;
}

function AC (a) {
  this.t = a;
  this.c = {};
  this.l = null;
  this.p = '';
  this.f = null;
  this.h = {};
}

AC.prototype.SS = function () {
  return 'ci' != this.f.t
    ? 0
    : ['', 1, 2, 3, 4, 5, 12, 13, 15, 17, 20, 21, 22, 23, 25, 26, 27, 28].includes(this.f.x);
};
AC.prototype.SR = function () {
  var a = this.f.x;
  return this.SS() && ['', 2, 12, 13, 15, 17, 23, 26, 27, 28].includes(a);
};
AC.prototype.C = function (a) {
  var b = this;
  a = a.toLowerCase().replace(/[\(\)]/, '');
  return a = a.replace(/[^\020-\177]/g, function (a) {
    var c = b.h[a];
    'string' === typeof c && (a = c);
    return a;
  });
};
AC.prototype.E = function () {
  var a = this;
  return function () {
    return {
      i: a.f.f,
      a: [],
      c: 'as',
      C: 'asu',
      g: 0,
      j: 0,
    };
  };
};
AC.prototype.P = function (a, b) {
  var c = this.f.x;
  b = b ? this.SR(c) : this.SS(c);
  c = this.f.j.map;
  0 === c || !b && 1 !== c || (a || (a = this.E()()), a.a.push({
    n: 'Search for location or select on map.',
    s: 2,
    h: 1,
    c: 'asi-info',
  }), a.a.push({
    n: 'Open Map',
    x: 'Pick your location on a map',
    c: 'ash',
    g: 1,
    cf: openLocPicker,
    h: 0,
  }));
  return a;
};
AC.prototype.L = function (a) {
  function b (a, b, c) {
    function d (a) {return a >= -b && a <= b ? a : null;}

    a = a.replace(/ /, '');
    var e = 1, l = 0, k;
    a.match(/^\+/) && (a = a.slice(1));
    a.match(/^\-/) && (a = a.slice(1), e = -1);
    if ('' === a) {
      return '';
    }
    if (k = a.match(/^(\d+)(.*)/)) {
      l = (k[1] - 0) * e;
      a = k[2];
      if ('' === a) {
        return f++, d(l);
      }
      if (a.match(/^[\.\u00b0]/)) {
        a = a.slice(1);
        if ('' === a) {
          return '';
        }
        if (k = a.match(/^(\d+)(.*)/)) {
          var g = k[1];
          a = k[2];
          if ('' === a) {
            return f++, d(l + '.' + g - 0);
          }
          if (0 < e && 60 > g) {
            l += (g - 0) / 60;
            if (a.match(/^[\.'']/)) {
              a = a.slice(1);
              if ('' === a) {
                return '';
              }
              if (k =
                a.match(/^(\d+)(.*)/)) {
                e = k[1];
                a = k[2];
                if (60 <= e) {
                  return null;
                }
                l += e / 3600;
              }
            }
            a = a.replace(/^"/, '');
            a = a.replace(/^''/, '');
            if ('' === a) {
              return '';
            }
            if (a == c.charAt(0)) {
              return d(l);
            }
            if (a == c.charAt(1)) {
              return d(-l);
            }
          }
        }
      } else {
        if (a == c.charAt(0)) {
          return d(l);
        }
        if (a == c.charAt(1)) {
          return d(-l);
        }
      }
    }
    return null;
  }

  var c = this.E()();
  this.f.s && (c.g = 1);
  var d = 'Coordinates/ZIP-codes cannot be used for this service.', e = 'asi asi-err', f = 0;
  if (this.SS(this.f.x)) {
    var g = a.match(/^(\w\w+)$/);
    var h = a.match(/^([^,]*)[ ,]+([\-\+]?[0-9]+.*)/);
    if (h) {
      var k = b(h[1],
        90, 'ns');
      var l = b(h[2], 180, 'ew');
    } else {
      k = b(a, 90, 'ns');
    }
    h = 'For coordinates, please use one of these formats:<br><b>40.42N 73.59W</b> (Degrees, minutes)<br><b>40.71 -73.98</b> (Decimal)';
    var m = 0;
    if ('number' == typeof k && 'number' == typeof l && 1 != f) {
      h = null, m = 1;
    } else if (null === k || null === l) {
      if (g) {
        if (3 <= a.length) {
          return null;
        }
        d = 'Please enter ZIP code...';
        e = 'asi-info';
        h = '';
      } else {
        d = 'Invalid coordinates or ZIP code...', e = 'asi-err';
      }
    } else {
      d = 'Coordinates and ZIP Codes allowed.', e = 'asi-info';
    }
    h
      ? (c.a[0] = {
        n: d,
        s: 2,
        h: 1,
        c: e,
      }, c.a[1] =
        { w: h })
      : m && (a = sprintf('%.3f', k) + ' ' + sprintf('%.3f', l), d = '', (e = this.f.f.form.elements.type) && (e = gfv(e)) && (d = '/' + e), c.a[0] = {
      n: a,
      x: 'Show this location',
      c: 'ash',
      h: 0,
      la: k,
      lo: l,
      U: '@' + k + ',' + l + d,
    });
  }
  this.P(c);
  return c;
};
AC.prototype.B = function (a, b) {
  function c () {
    if (g[TAD.ftz]) {
      return 0;
    }
    var b;
    for (b = 0; b < l; b++) {
      var c = a[b], d = c.g;
      c = c.i;
      if ((g[c] || h[c]) && d.match(/N/)) {
        return 0;
      }
    }
    return 1;
  }

  var d = this.E(), e = function (a, b) {
    var c = a.indexOf(b);
    if (0 > c) {
      return 0;
    }
    var d = b.length * (b.length + 10) / (a.length + 10);
    if (0 === c) {
      return a == b && (d *= 2), d;
    }
    if (65 > a.charCodeAt(c - 1)) {
      return .8 * d;
    }
    b = b.length;
    if (2 > b) {
      return 0;
    }
    d *= (b + .1) / (b + 5);
    a = a.substr(0, c);
    return (a = a.match(/([\040-\077]+)/)) ? .5 * d / (1 + a.length) : .1;
  }, f = [], g = [];
  it(TAD.used, function (a) {g[a] = 1;});
  var h = {};
  it(TAD.pwc, function (a) {h[a] = 1;});
  var k = function (a, b, c) {
    c = b.i;
    if (!f[c] && !g[c]) {
      f[c] = 1;
      var d = b.s;
      d = d ? d + (' - ' + b.c) : d + b.c;
      var e = '', l = b.g;
      'hol' == l ? e = 'holiday' : 'st' == l ? e = 'state' : 'co' == l
        ? e = 'country'
        : (l.match(/z/) && (e = 'time zone'), l.match(/c/) && (e = 'country'), l.match(/s/) && ((e = b.r) || (e = 'state')), l.match(/m/) && (e = 'military time'));
      e && (e = ' (' + e + ')');
      c = {
        c: 'ash',
        n: b.n,
        x: d,
        U: c,
        h: 0,
        b: e,
        d: b.f ? '<img height=11 width=16 class=fr alt=Flag src=\'' + b.f + '\'>' : '',
      };
      b.l && (c.la = b.d, c.lo = b.l);
      a.a[a.a.length] = c;
    }
  };
  d = d();
  if (!a) {
    return d;
  }
  this.f.s && (d.g = 1);
  this.l = a;
  var l = a.length;
  if (l) {
    b = this.C(b);
    b = b.replace(',', ' ');
    var m = b.split(/\s+/), q = m.length, t, p = [], n, w = c();
    for (n = 0; n < l; n++) {
      var u = function (a) {
        var b = 10 * (r.o == a) + 5 * (r.a == a), c = 0 <= r.x.indexOf(' ' + a);
        if (0 <= r.t.indexOf(a) || 0 <= r.e.indexOf(a) || 0 <= r.u.indexOf(a) || c) {
          var d = e(r.t, a) * z, f = e(r.e, a) * A, l = e(r.u, a) * B;
          c && 10 > b && (b = 10 + r.z, a = e(r.x, a) * z, a > b && (b = a));
          d > b && (b = d);
          f > b && (b = f);
          l > b && (b = l);
        }
        b && (C++, y += b);
      }, r = a[n], v = r.g, x = r.i;
      if (!g[x]) {
        var z = 10, A = 5, B = 4;
        v.match(/s/) && (B = A = 20);
        v.match(/c/) && (B = A =
          z = 30);
        var y = 0, C = 0;
        u(b);
        for (t = 0; t < q; t++) u(m[t]);
        v.match(/N/) && (w ? (y++, C++) : x == TAD.ftz || h[x] || (y = 0));
        0 < y && (v = C / q, p[p.length] = {
          s: (3 * r.p + y) * v * v * v,
          c: r,
        });
      }
    }
    p.sort(function (a, b) {return b.s - a.s;});
    l = p.length;
    5 < l && (20 < l && (l = 20), n = gsv(), v = po(this.f.f), v = n.h - v.y, n = n.H - 10, v < n && (n = v), n = Mf((n - 45) / 36), l > n && (l = n), 3 > l && (l = 3));
    p.length = l;
    if (0 < l) {
      v = 5 < l ? 5 : l;
      q = p[0].s;
      w = .7 * q;
      t = .1 * q;
      u = 1;
      b = 0;
      for (n = 1; n < l; n++) {
        m = q;
        q = p[n].s;
        if (q < t) {
          l = n;
          break;
        }
        x = m - q;
        n < v && x > u && m > w && (u = x, b = n);
      }
      p.length = l;
      if (4 < b || 20 > u) {
        b = 0;
      }
      for (n = w = q = m = 0; n < l; n++) r = p[n].c,
        v = r.g, v.match(/N/) ? m++ : h[r.i] ? q++ : w++;
      if (b && w) {
        for (n = 0; n < b; n++) k(d, p[n].c, 1);
        d.a[d.a.length] = { s: 1 };
        l = p.length;
      } else {
        w || (n = 'Near you or from Personal World Clock', !m && q
          ? n = 'From Personal World Clock'
          : !q && 0 < m && (n = 'Locations near you'), d.a[d.a.length] = {
          n: n,
          s: 2,
          h: 1,
          c: 'asi',
        });
      }
      p.sort(function (a, b) {return a.c.n.localeCompare(b.c.n);});
      for (n = 0; n < l; n++) k(d, p[n].c, 0);
    } else {
      k = 'No matches', 2 > b.length && (k = 'Type for more matches'), d.a[0] = {
        n: k,
        s: 2,
        h: 0,
        c: 'ash',
      };
    }
    this.f.s && (k = '/worldclock/', p = 'World Clock', 'hol' == this.f.t &&
    (k = '/holidays/', p = 'Holidays worldwide'), d.a[d.a.length] = {
      u: k,
      n: p,
      s: 100,
      h: 1,
    });
    return d;
  }
};
AC.prototype.U = function () {
  var a = this, b = function (b) {
    b && (0 === b.a.length && (b.a[0] = {
      n: 'Type in name...',
      s: 2,
      c: 'ash',
    }), ifsm(a.f, b));
  }, c = function (c, d) {
    var e, f = a.f.x + '::';
    a.c[f + c] = {};
    var l = '/scripts/completion.php?', g = 0;
    if (d) {
      var q = [];
      if (d = window.TAD) {
        0 < d.ftz && (q[0] = d.ftz), it(d.pwc, function (a) {q.push(a);}), q.length && (l += 'id=' + q.join('_'), g = 1), d.lon && (l += '&near=5&long=' + d.lon + '&lat=' + d.lat + '&co=' + d.co, g = 2);
      }
    } else {
      l += 'query=' + encodeURIComponent(c), g = 3;
    }
    a.f.x && (l += '&xd=' + a.f.x);
    a.f.t && (l += '&mode=' + a.f.t);
    a.f.F &&
    (l += '&from=' + a.f.F);
    g && jcb(l, function (d) {
      d = d.split('\n');
      var l = d.length, k = [], g;
      for (g = 0; g < l; g++) {
        var h = d[g].split('\t');
        if (7 < h.length) {
          if ('hol' == a.f.t) {
            var m = h[8];
            m || (m = 'Holiday list');
            h = 'st' == h[0] ? void 0 : {
              g: h[0],
              i: h[1],
              p: h[2],
              o: h[3],
              c: h[4],
              u: a.C(h[4] + ' ' + h[5]),
              O: h[6],
              s: h[7],
              n: m,
              t: a.C(m),
              e: a.C(h[7]),
              f: h[10],
              x: ' ' + h[11] + ' ',
              z: h[12] - 0,
            };
          } else {
            h = {
              i: h[0],
              p: h[1],
              o: h[2],
              a: h[3],
              n: h[4],
              t: a.C(h[4]),
              s: h[5],
              e: a.C(h[5]),
              c: h[6],
              u: a.C(h[6]),
              f: h[7],
              x: ' ' + h[8] + ' ',
              z: h[9] - 0,
              g: h[10] || '',
              r: h[11],
              d: h[12],
              l: h[13],
            };
          }
        } else {
          'CONV' ===
          h[0] && (a.h[h[1]] = h[2]), h = void 0;
        }
        h && k.push(h);
      }
      a.c[f + c].d = k;
      e = a.B(k, c);
      b(e);
    });
  }, d = function (b) {
    function d (b) {
      if (' - ' != b && 1 < b.length) {
        return b = b.slice(0, b.length - 1), (l = a.c[f + b]) && l.d
          ? a.B(l.d, e)
          : d(b);
      }
    }

    var e = a.p;
    b && (e = ' _ ');
    var f = a.f.x + '::', l = a.c[f + e];
    if (l) {
      var m = l.d ? a.B(l.d, e) : d(e);
    } else {
      c(e, b), b && m || (m = d(e));
    }
    b && (m = a.P(m, 1));
    return m;
  };
  inline_lowvalue = a.p;
  inline_do_display_default_menu = 0;
  2 > inline_lowvalue.length && window.TAD && (inline_do_display_default_menu = 1);
  var e = !1;
  if (inline_lowvalue.match(/^[\-\+]?[0-9]+/)) {
    if (inline_menu =
      a.L(inline_lowvalue)) {
      b(inline_menu);
      return;
    }
    e = !0;
  }
  if (2 <= inline_lowvalue.length || inline_do_display_default_menu || e) {
    inline_menu = d(inline_do_display_default_menu), b(inline_menu);
  }
  inline_menu || pM.k();
};
AC.prototype.A = function (a, b) {
  this.f = a;
  b = b.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\s+/, ' ');
  this.p = b.toLowerCase();
  this.U();
};

function ges (a) {return Mf(.001 * a);}

TO = {
  co: {},
  e: 0,
  f: 0,
  j: 0,
  J: 0,
  p: 0,
  s: 0,
  t: '',
  z: 1E3,
  Z: 0,
  y: -1,
  C: [],
  sC: [],
  fu: !1,
  ut: 0,
  ci: {},
  pr: 0,
  ps: 0,
  pv: !0,
  ts: 0,
  lc: 0,
  gco: function (a) {return TO.co[a];},
  dt: function () {
    var a = window;
    return a.TAD && 'undefined' !== typeof a.TAD.ft ? 1E3 * TAD.ft : dt() + this.j;
  },
  Date: function () {return new Date(TO.dt());},
  aC: function (a) {a && (this.C[this.C.length] = a);},
  syncCB: function (a, b) {a && (b && 0 <= this.y && a(TO.dt()), 0 <= this.sC.indexOf(a) || (this.sC[this.sC.length] = a));},
  syncRemoveCB: function (a) {a && (a = this.sC.indexOf(a), 0 <= a && this.sC.splice(a, 1));},
  S: function (a) {
    a = a ? '&r=' + a : '';
    var b = dt();
    if (!(this.ps && this.ps + 5E3 > b)) {
      var c = this;
      this.ps = b;
      jcb('/scripts/ts.php?ut=' + b + '&cb=' + Mr() + a, function (a) {
        var d = dt();
        d = (b + d) / 2;
        var f = c.j;
        c.j = Mf(1E3 * parseFloat(a) - d);
        c.f += c.j - f;
        c.y = d - b + 50;
        c.UT();
        iH('ref', 'At time of loading, accuracy was within ' + Math.round(c.y) / 1E3 + ' seconds');
        it(c.sC, function (a) {a(TO.dt());});
      }, function (a) {
        c.ts || (c.ts = 1, anpop('<h3>We were unable to sync our clocks</h3><p>This might be due to network issues, an inactive page for a long time or an adblocker. If you have an adblocker, please consider turning it off on timeanddate.com so that the website can function normally.</p>',
          'error'));
      });
    }
  },
  Y: function (a) {
    var b = this;
    40 > b.s++ && (a += '_' + b.s, window.setTimeout(function () {b.S(a);}, 2500));
  },
  R: function (a, b, c) {
    var d = 'p' + b;
    if (a[d] !== c || this.fu) {
      if (a[d] = c, d = a[b]) {
        if (ih(d, c), a = a.E) {
          for (var e in a) d = a[e], this.R(d, b, c);
        }
      }
    }
  },
  tO: function (a, b) {
    a = a.t;
    var c = null, d;
    for (d = 0; d < a.length; d++) {
      var e = a[d];
      if (e.t > b) {
        break;
      }
      c = e;
      d && (c.C = d);
    }
    return c ? c : {
      a: '',
      o: 0,
    };
  },
  gcco: function (a) {
    var b = cks[a];
    if (!b) {
      if (!TO.lc) {
        TO.lc = {};
        for (var c in cks) if (b = cks[c], b.e) {
          var d = b.e.split(',');
          it(d, function (a) {
            a = a.replace(/^(\d)/,
              'p$1');
            TO.lc[a] = b;
          });
        }
      }
      b = TO.lc[a];
    }
    return b;
  },
  uL: function (a, b) {
    a = TO.gcco(a);
    a = this.tO(a, ges(b));
    return new Date(+b + 1E3 * a.o);
  },
  l2u: function (a, b) {
    a = TO.gcco(a);
    for (var c = 0, d, e = 0; 3 > e && (d = c, c = this.tO(a, ges(b) - c).o, c != d); e++) ;
    return new Date(+b - 1E3 * c);
  },
  gF: function (a, b, c, d) {
    var e = TO.gcco(a);
    a = this.tO(e, ges(b));
    b = new Date(+b + 1E3 * a.o);
    d = d ? d(b) : e.f(b);
    c && a.a && (d += ' ' + a.a);
    return d;
  },
  gTC: function (a) {
    a = TO.gcco(a).t;
    var b = a[0].o, c = [];
    for (inline_i = 1; inline_i < a.length; inline_i++) {
      var d = a[inline_i], e = d.o;
      c[inline_i - 1] =
        {
          u: new Date(1E3 * d.t),
          l: new Date(1E3 * (d.t + e)),
          o: e,
          a: d.a,
          c: e - b,
        };
      b = e;
    }
    return c;
  },
  UT: function () {
    var a = this, b = a.dt(),
      c = document.visibilityState ? 'visible' == document.visibilityState : !0;
    if (c) {
      var d = a.p;
      a.p = b;
      if (!a.pr && ges(b) > et) {
        rf('tz1', 'Will refresh in 30 seconds', 30, 0);
        return;
      }
      if (d) {
        d = b - d;
        if (a.f > b) {
          rf('tz1', 'Clock has gone backward - will refresh soon', 20, 0);
          return;
        }
        var e;
        0 == a.pv ? 36E5 < d && (e = 'a') : 3E4 < d && (e = 'f');
        -100 > d && (e = 'b');
        if (e) {
          a.Y(e + d);
          return;
        }
      } else {
        a.f = b;
      }
      a.J && (b += a.J);
      inline_epochSeconds = a.Z ? .001 * b : ges(b);
      this.U();
      b = a.dt();
    }
    a.pv = c;
    a.ut = setTimeout(function () {a.UT();}, a.z - b % a.z);
  },
  U: function () {
    var a = [], b = this, c = b.dt();
    b.J && (c += b.J);
    var d = b.Z ? .001 * c : ges(c);
    if (d != b.e) {
      for (p in b.e = d, it(b.C, function (a) {a(c);}), cks) {
        var e = cks[p], f = b.tO(e, d);
        var g = f.o;
        var h = f.a;
        f = f.d;
        if ('' !== g && e.c) {
          var k = e.c, l = ges(k.t - c + 999);
          k.z && 0 > l && (l = 0);
          l != k.p && (k.f
            ? ih(k.f1, k.f(l))
            : (0 > l && 0 <= k.p && (ih(k.u1, 'since'), ih(k.u2, 'since')), k.p = l, 0 > l
              ? l = -l
              : k.R && (l += k.R), it(k.l, function (a) {
              var c = a.f, d = Mf(l / c.f);
              c.m && (d %= c.m, k.P && (d = pf(d, k.P)));
              b.R(a,
                'n1', d);
              b.R(a, 'n2', a.u[1 != d ? 1 : 0]);
            })));
        }
        if ('' !== g) {
          var m = new Date(1E3 * (d + g));
          if (e.p) {
            e.p(e, m, p, e);
            var q = e.E;
            if (q) {
              for (var t in q) e.p(q[t], m, t, e);
            }
          }
          e.d1 && (b.R(e, 'd1', e.f(m)), it(e.fx, function (a) {
            var c = a.f(m);
            b.R(e, 'fx_' + a.n, c);
          }), e.u && (g = (Mf((d + g) / 86400) + 4) % 7, a[g] = (a[g] || 0) + e.C, window.dsts && (b.R(e, 'd3', f
            ? dsts
            : ''), a[7] = (a[7] || 0) + e.C * (f || 0))));
          e.s && e.s.f(e.s, m, e.g);
          e.S && it(e.S, function (a) {a.draw(+m);});
          b.R(e, 'd2', h);
        }
      }
    }
    if (window.updwds && a.length) {
      var p = a.join(',');
      if (p != b.t) {
        for (b.t = p, g = 0; 8 > g; g++) if (p = a[g] || 0,
          d = gf('smwd' + g)) {
          sd(d, p ? 1 : 0), iH('smwi' + g, updwds(p));
        }
      }
    }
    b.fu = !1;
  },
  fixfuncs: function (a) {
    function b (a, b) {
      if (a) {
        var d = a[b];
        if (d) {
          var e = typeof d;
          if ('function' === e) {
            return 1;
          }
          'string' === e && (a[b] = c[d]);
        }
      }
    }

    var c = window;
    for (inline_baseCityDivName in a) {
      var d = a[inline_baseCityDivName];
      if (b(d, 'f') || b(d.c, 'f')) {
        break;
      }
      it(d.fx, function (a) {b(a, 'f');});
    }
  },
  setcks: function (a) {
    this.icks(a);
    window.cks = a;
    TO.upd();
  },
  icks: function (a) {
    function b (a, b, c) {
      function d (a, b) {
        var c = -(Mf(b) % 16) * e + 'px';
        b = -Mf(b / 16) * e + 'px';
        a.style.backgroundPosition =
          c + ' ' + b;
      }

      var e = c.s;
      b = ges(+b);
      d(a.h, 61 + (b + 450) % 43200 / 900);
      d(a.m, 1 + b % 3600 / 60);
      d(a.s, 109 + b % 60);
    }

    function c (a, b, c) {
      function d (a, b) {
        k.beginPath();
        k.moveTo(a, 0);
        k.lineTo(b, 0);
        k.stroke();
      }

      function e (a, b, c, e, f) {
        k.save();
        k.lineWidth = a;
        f && (k.strokeStyle = f);
        k.rotate(b * g / 30);
        d(-c * h, e * h);
        k.restore();
      }

      var f = c.s;
      c = 40 < f;
      var l = 100 > f, h = f / 2, k = a.c, g = Math.PI;
      k.save();
      k.clearRect(0, 0, f, f);
      k.translate(h, h);
      k.rotate(-g / 2);
      k.lineCap = 'butt';
      if (l) {
        for (k.beginPath(), k.arc(0, 0, h - 2, 0, 2 * g, !0), k.fillStyle = '#fff', k.fill(), k.lineWidth =
          c ? 4 : 1, k.strokeStyle = c ? '#353535' : '#065947', k.stroke(), f = c
          ? .76
          : .7, a = 0; 60 > a; a += 5) k.lineWidth = c
          ? a % 15 ? 2 : 4
          : 1, d(.985 * (h - 1), h * f), k.rotate(g / 6);
      }
      k.lineCap = 'round';
      f = ges(+b);
      b = f % 60;
      a = f / 60 % 60;
      f /= 720;
      c
        ? (e(2, f, .14, .46, '#000'), e(1.5, a, .14, .76, '#000'), e(1, b, .28, .76, '#e00f21'))
        : (e(1, f, 0, .5, '#065947'), e(1, a, 0, .9, '#065947'));
      k.restore();
    }

    function d (a) {
      var d = cE('canvas'), e = a.s = a.s || 56;
      if (d && d.getContext) {
        return a.s = e, sA(d, 'width', e), sA(d, 'height', e), a.c && (d.className = a.c), ac(d, 'clk'), {
          f: c,
          e: d,
          c: d.getContext('2d'),
        };
      }
      var f =
        function (a) {
          var b = cE('div'), c = b.style;
          c.background = 'url(//c.tadst.com/gfx/canvas/nclk' + e + '.png?1)';
          es(b, {
            w: e,
            h: e,
          });
          a && (c.position = 'relative', aCh(a, b));
          return b;
        };
      d = f();
      var k = f(d), h = f(k);
      f = f(h);
      a.c && (d.className = a.c);
      ac(d, 'clkimg');
      return {
        f: b,
        e: d,
        s: f,
        m: k,
        h: h,
      };
    }

    var e = this;
    e.fixfuncs(a);
    ia(a, function (a, b) {
      a = a.replace(/\D/, '');
      e.ci[a] = b;
      b.e && (a = b.e.split(','), it(a, function (a) {e.ci[a] = b;}));
    });
    var f = [{
      n: 's2',
      f: 1,
    }, {
      n: 'm2',
      f: 60,
    }, {
      n: 'h2',
      f: 3600,
    }, {
      n: 'd2',
      f: 86400,
    }, {
      n: 'w2',
      f: 604800,
    }, {
      n: 's1',
      f: 1,
      m: 60,
    }, {
      n: 'm1',
      f: 60,
      m: 60,
    }, {
      n: 'h1',
      f: 3600,
      m: 24,
    }, {
      n: 'd1',
      f: 86400,
    }, {
      n: 'dw1',
      f: 86400,
      m: 7,
    }, {
      n: 'w1',
      f: 604800,
    }], g = function (a, b, c) {
      TO.co[a] = b;
      b.d1 = gf(a);
      b.d2 = gf(a + 'a');
      b.d3 = gf(a + 's');
      var e = c || b;
      it(e.fx, function (c) {b['fx_' + c.n] = gf(a + c.n);});
      if (c = e.g) {
        if (2 == c.t) {
          c = function (b) {
            if (b = gf(a + b)) {
              e.S || (e.S = []), e.S.push(new Clck(b, a));
            }
          }, c('clk'), c('mapclk');
        } else if (c = d(c)) {
          b.s = c, b.d1.parentNode.insertBefore(c.e, b.d1);
        }
      }
      b.u = 'p' == a.charAt(0);
      var k = b.c;
      if (k) {
        var g = {
          s: ['second', 'seconds'],
          m: ['minute', 'minutes'],
          h: ['hour', 'hours'],
          d: ['day', 'days'],
          w: ['week', 'weeks'],
        };
        (c = k.u) && (g = 1 === c ? {
          s: ['sec', 'secs'],
          m: ['min', 'mins'],
          h: ['hrs', 'hrs'],
          d: ['day', 'days'],
          w: ['wk', 'wks'],
        } : c);
        k.f1 = gf(a + '_f1');
        k.u1 = gf(a + '_u1');
        k.u2 = gf(a + '_u2');
        k.l = [];
        it(f, function (b, c) {
          b = f[c];
          var d = a + '_' + b.n;
          k.l[c] = {
            f: b,
            n1: gf(d),
            n2: gf(d + 't'),
            u: g[b.n.charAt(0)],
          };
        });
      }
      b.C = 1;
      b.e && (c = b.e.split(','), b.E = {}, it(c, function (a) {
        a = a.replace(/^(\d)/, 'p$1');
        b.E[a] = {};
        b.C++;
      }), h(b.E, b));
    };
    var h = function (a, b) {for (var c in a) g(c, a[c], b);};
    h(a);
  },
  init: function (a) {
    var b = window.cks;
    'object' == typeof b && (this.icks(b),
    window.TO_noupd || a || this.S());
  },
  upd: function () {
    this.e -= 1E-4;
    this.fu = !0;
    clearTimeout(this.ut);
    this.U();
  },
  city: function (a, b) {
    if (a = this.ci[a]) {
      return a = this.tO(a), b || (b = this.dt()), a.d = new Date(+b + 1E3 * a.o), a;
    }
  },
};
elh = {};
elc = {};
fh = {};
window.TD || (TD = {});

function ael (a, b, c, d) {
  if (a) {
    if ('string' == typeof a && (a = gf(a), !a)) {
      return;
    }
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent('on' + b, c);
  }
}

function aelw (a, b, c) {ael(window, a, b, c);}

function oael (a, b, c, d) {
  var e = 0, f = a.id;
  f || (f = a.name);
  f || (f = a.href);
  f = b + ':' + f;
  elh[f] || (elh[f] = []);
  for (var g = elh[f].length; e < g; e++) if (elh[f][e] === c) {
    return;
  }
  elh[f].push(c);
  ael(a, b, c, d);
}

function aelc (a, b) {
  var c = gf(a);
  ael(c, 'click', function (a) {
    a = ev(a);
    ifpd(a.e);
    b(c, a);
    return !1;
  }, !0);
}

function ev (a) {
  var b = {};
  a ? b.k = a.which : (a = window.event, b.k = a.keyCode);
  if (b.e = a) {
    b.s = a.target || a.srcElement;
  }
  return b;
}

function ott (a, b, c) {
  oael(a, 'mouseout', function (a) {pM.z();});
  c = b;
  ttt && ttt[b] && (c = ttt[b]);
  c = '<div id="ttb" onmouseover="pM.y()" onmouseout="pM.z()">' + c + '</div>';
  b = ap(a);
  c = pM.h(c);
  jp(b, c, a, -1, 0);
  ep(c, b);
}

loadcss_cache = {};

function loadcss (a) {
  if (!loadcss_cache[a]) {
    loadcss_cache[a] = 1;
    var b = cE('link');
    b.href = a;
    b.type = 'text/css';
    b.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(b);
  }
}

function vad (a, b, c) {
  var d = 0, e = [], f = function (a, b, c) {
    if (a) {
      var f = gfv(a), h = f.replace(/[\s\.\-,]/g, '');
      h != f && (a.value = h);
      '' !== h && null !== h && (h -= 0, h >= b && h <= c && (e.push(h), d++));
    }
  };
  f(a, 1, 3999);
  f(b, 1, 12);
  f(c, 1, 31);
  if (3 == d) {
    a = e[0];
    b = e[1];
    c = e[2];
    if (1925 < a) {
      f = 31;
      if (4 == b || 6 == b || 9 == b || 11 == b) {
        f = 30;
      }
      2 == b && (f = 28 + (0 === a % 4) - (0 === a % 100) + (0 === a % 400));
      if (c > f) {
        return null;
      }
    }
    f = new Date(0);
    f.setUTCFullYear(a);
    f.setUTCMonth(b - 1);
    f.setUTCDate(c);
    return f;
  }
  return null;
}

function vat (a, b, c) {
  function d () {ac(c, 'error', 0);}

  function e () {
    d();
    ac(c, 'error', 1);
  }

  function f (a, b) {
    if (k < a || k > b) {
      return e(), 1;
    }
    d();
    return 0;
  }

  var g = b.match(/(\w)(\d+)/), h = c.value, k = h.replace(/[\s\.\-,]/g, '');
  if (k) {
    k != h && (c.value = k);
    if ('date' == a) {
      if (g) {
        var l = g[1];
        var m = g[2];
        m = ['y' + m, 'm' + m, 'd' + m];
      } else {
        'year' == b && (l = 'y'), 'month' == b && (l = 'm'), 'day' == b && (l = 'd'), l && (m = ['year', 'month', 'day']);
      }
      if (m) {
        if ('y' == l && f(1, 3999) || 'm' == l && f(1, 12) || 'd' == l && f(1, 31)) {
          return;
        }
        var q = [], t = [];
        it(m, function (a) {
          if (a = gf(a)) {
            var b = a.value;
            null !== b && '' !== b && (q.push(b - 0), t.push(a));
          }
        });
        if (3 == q.length) {
          c = t[2];
          h = q[0];
          var p = q[1], n = q[2];
          if (1925 < h) {
            var w = 31;
            if (4 == p || 6 == p || 9 == p || 11 == p) {
              w = 30;
            }
            2 == p && (w = 28 + (0 === h % 4) - (0 === h % 100) + (0 === h % 400));
            if (n > w) {
              e();
              return;
            }
          }
        }
        d();
      }
    }
    'time' == a && (g
      ? (l = g[1], m = g[2], m = ['h' + m, 'i' + m, 's' + m])
      : ('hour' == b && (l = 'h'), 'min' == b && (l = 'i'), 'sec' == b && (l = 's'), l && (m = ['hour', 'min', 'sec'])), m && ('h' == l && f(0, 23), 'i' == l && f(0, 59), 's' == l && f(0, 59)));
  } else {
    d();
  }
}

function va (a, b) {
  if (a) {
    if (b) {
      var c = gA(b, 'tad-va');
      c && vat(c, a, b);
    }
    (a = elc[a]) && a();
  }
}

function elca (a, b) {elc[a] = b;}

function abrd (a, b) {return '<a href="javascript:modph(null,\'x\')" class="close" title="Close"><img alt="close" src="//c.tadst.com/gfx/n/popup-close.png"/></a><h1 class="title">' + a + '</h1>' + b;}

function anpop (a, b, c) {
  var d = gf('anw'), e = cE('div', { 'class': 'alert-notice ' + b }, d);
  e.innerHTML = a;
  a = cE('button', {
    'class': 'close',
    type: 'button',
  }, e);
  a.innerHTML = '&times;';
  aelc(a, function (a) {d.removeChild(a.parentNode);});
  c && setTimeout(function () {gf('anw').removeChild(e);}, c);
}

function modps (a, b, c, d) {
  a = ghj(a);
  c = c || 'Info';
  b = gf('mpo');
  var e = '', f = '', g = '<button class=close onclick=modph(null,\'x\')>&times;</button>';
  b.style.background = '';
  d && (d.noclose && (g = ''), d.mpo_background && (b.style.background = d.mpo_background), d.modal_title_style && (e = ' style="' + d.modal_title_style + '"'), d.modal_class && (f = d.modal_class));
  ih(b, '<div class=\'modal ' + f + '\'><div class=modal-dialog><div class=modal-content><div class=modal-header>' + g + '<h2 class=modal-title' + e + '>' + c + '</h2></div>' + a.h + '</div></div></div>');
  a.s.length && a.s.forEach(function (a) {document.head.querySelector('script[src=\'' + a + '\']') || (script = document.createElement('script'), script.type = 'text/javascript', script.async = !1, script.src = a, document.head.appendChild(script));});
  eval(a.j);
  b.mpomousedown || (b.mpomousedown = function (a) {
    this !== a.target && this !== a.target.parentNode || this.addEventListener('mouseup', function m (a) {
      this !== a.target && this !== a.target.parentNode || modph(null, 'outside');
      this.removeEventListener('mouseup', m);
    });
  });
  oael(b, 'mousedown', b.mpomousedown);
  b.mpokeydown || (b.mpokeydown = function (a) {27 == ev(a).k && modph(null, 'escape');});
  oael(window, 'keydown', b.mpokeydown);
  sd(b, 2);
}

function modpop (a, b, c, d) {
  a && jcb(a, function (a) {modps(a, b, c, d);});
  return !1;
}

var mod_callback = null;

function modph (a, b) {
  he('mpo', 0);
  'function' === typeof a && a();
  'function' === typeof mod_callback && (mod_callback(b), mod_callback = null);
}

function modclear () {
  modph();
  iH('mpo', '');
}

function popad (a, b, c) {
  var d = wl();
  c += '?ref=' + escape(d.pathname + d.search);
  aelc(a, function () {modpop(c, 1, b);});
}

function openlogin () {modpop('/custom/loginframe.html', 1, 'Sign in');}

function popadlogin (a) {popad(a, 'Sign in', '/custom/loginframe.html');}

function popadreg (a) {popad(a, 'Register a new account', '/custom/createframe.html');}

function hsl (a, b) {
  if (a) {
    a.style.overflow = 'hidden';
    var c = gcs(a, 'height'), d = 1, e = function () {
      c -= d;
      d++;
      0 < c ? (es(a, { h: c }), window.setTimeout(e, 20)) : sd(a, 0);
    };
    window.setTimeout(e, b);
  }
}

switching = function () {
  function a (a) {
    c = a;
    it(b, function (a) {
      var b = a == c;
      ac(gf('ec' + a), 'active', b);
      sd(gf(a), b);
    });
  }

  var b = arguments, c = b[0];
  it(b, function (b) {aelc('ec' + b, function () {a(b);});});
  a(c);
};

function extfield (a, b, c) {
  TD.C = function (b, c) {
    var d = document.f[a], e = d.options;
    if (e) {
      var h = e.length;
      e[h] = new Option(c, b);
      d.selectedIndex = h;
    } else if (d.value = b, b = document.f[a + 'txt']) {
      b.value = c;
    }
    va(a, d);
  };
  modpop('/scripts/field/' + b, 1, 'Select city');
}

function extlocs (a, b) {
  b && (TD.sh = 1);
  extfield(a, 'location', 'Select city');
}

function exttzs (a, b) {
  b && (TD.sh = 1);
  extfield(a, 'timezone', 'Select time zone');
}

function pn () {
  return window.performance && window.performance.now
    ? window.performance.now()
    : +new Date;
}

var raf = function () {return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {window.setTimeout(function () {a(pn());}, 1E3 / 60);};}();

function lo () {
  jcb('/scripts/accountlogout.php?ft_logout=' + TAD.ft_logout, function () {
    BOOL.add('LOGGEDOUT');
    wl().reload();
  });
  return !1;
}

function main () {
  var a = window;
  if (!a.hasRun) {
    a.hasRun = 1;
    popadlogin('poplogin');
    popadreg('popreg');
    aelc('popout', lo);
    var b = function () {modpop('/scripts/tzq.php?type=homecity', 1, 'Set Home Location');};
    aelc('popchi', b);
    aelc('chi', b);
    aelc('chi2', b);
    ia(TD.mena, function (b, c) {
      c.f && (c.f = a[c.f]);
      mena(b, c);
    });
    b = function (a) {
      aelc(gf('ftbx' + a), function () {
        var b;
        for (b = 0; 4 > b; b++) {
          var c = gf('ftbx' + b);
          c && (he('feat' + b, b == a), c.className = b === a ? 'active' : '');
        }
      });
    };
    var c;
    for (c = 0; 4 > c; c++) b(c);
    (function () {
      function a () {
        n.transition =
          '0.2s top ease-in';
        u();
        setTimeout(function () {n.transition = 'none';}, p - pn() + 300);
      }

      if (('undefined' === typeof TAD.stickyDisable || !TAD.stickyDisable) && gf('header__wrapper')) {
        var b = gf('header__inner'), c = gf('nav').offsetHeight, g = b.offsetHeight,
          h = 'undefined' !== typeof TAD.stickyHeight ? TAD.stickyHeight : 400,
          k = 'undefined' !== typeof TAD.stickyCollapseHeight ? TAD.stickyCollapseHeight : 400,
          l = 'undefined' !== typeof TAD.stickyWaitTime ? TAD.stickyWaitTime : 3E3,
          m = 'undefined' !== typeof TAD.stickyRenderTime ? TAD.stickyRenderTime :
            3E3, q = 'undefined' !== typeof TAD.stickyViewableTime ? TAD.stickyViewableTime : 1E3,
          t = pn(), p = l ? t + l : t, n = b.style, w = null;
        window.googletag && googletag.cmd.push(function () {
          googletag.pubads().addEventListener('slotRenderEnded', function (c) {c && c.slot && c.slot.getAdUnitPath && ('/1004254/com728' === c.slot.getAdUnitPath() || '/1004254/com_320x2' === c.slot.getAdUnitPath()) && (p = pn() + m, g = b.offsetHeight, w = setTimeout(function () {a();}, p - pn()));});
          googletag.pubads().addEventListener('impressionViewable', function (b) {
            b && b.slot && b.slot.getAdUnitPath &&
            ('/1004254/com728' === b.slot.getAdUnitPath() || '/1004254/com_320x2' === b.slot.getAdUnitPath()) && (h = 0, k = 110, p = pn() + q, clearTimeout(w), w = setTimeout(function () {a();}, p - pn()));
          });
        });
        var u = function () {
          var a = window.pageYOffset || ddE().scrollTop;
          a > h && pn() > p ? n.transform = a < h + k
            ? 'translateY(' + -((a - h) / k) * (g - c) + 'px)'
            : 'translateY(' + -(g - c) + 'px)' : n.transform = 'translateY(0)';
        };
        aelw('scroll', u);
        u();
      }
    })();
    window.googletag && googletag.cmd.push(function () {
      googletag.pubads().addEventListener('impressionViewable', function (a) {
        if (a &&
          a.slot) {
          a = a.slot.getSlotElementId();
          var b = document.getElementById(a);
          b && (b.tadImpressionViewable = +performance.now(), b.tadAdvertRotateCount = 0, setTimeout(function () {
            document.addEventListener('mousemove', function () {
              b.tadAdvertRotateCount++;
              var a = new CustomEvent('impressionViewableRotate', {
                count: b.tadAdvertRotateCount,
                firstSeen: b.tadImpressionViewable,
              });
              b.dispatchEvent(a);
            }, { once: !0 });
          }, 3E4));
        }
      });
    });
    window.openprivacy = function () {wl('/custom/privacy.html');};
    TO.init();
    BOOL.del('NEWSLETTER') && (document.cookie =
      'TIMEANDDATE_NEWSLETTER=;domain=.timeanddate.com;path=/;expires=' + (new Date(0)).toGMTString(), modpop('/custom/created-newsletterinfo.html', 1, 'Get Our Free Newsletter!'));
    BOOL.del('LOGGEDIN') && anpop('<h3 class=\'alert-notice__title\'>You are now logged in.</h3>', 'success alert--success', 5E3);
    BOOL.del('LOGGEDOUT') && anpop('<h3 class=\'alert-notice__title\'>You are now logged out.</h3>', 'success alert--success', 5E3);
    BOOL.del('MAILAUTH') && anpop('<h3 class=\'alert-notice__title\'>Please check your email for instructions on how to login.</h3>',
      'success alert--success', 5E3);
    BOOL.del('NOPASS') && anpop('<h3 class=\'alert-notice__title\'>Your account has no password set, please consider setting one.</h3><a href=\'/custom/password.html\'>Set new password here.</a>', 'warning alert--warning');
  }
}

(function () {
  function a (a) {
    sd(a, 1);
    ael(a, 'mouseover', function () {
      var h = c[gA(a, 'data-social')];
      h && (b(h.src, h.id), clearTimeout(f), it(d, function (b) {a !== b && ac(b, 'hover', 0);}), ac(a, 'hover', 1), e = a);
    });
    ael(a, 'mouseout', function () {f = setTimeout(function () {g || ac(a, 'hover', 0);}, 2E3);});
    d.push(a);
  }

  function b (a, b) {
    var c = gebtn('script')[0];
    gf(b) || (a = cE('script', {
      id: b,
      src: a,
    }), c.parentNode.insertBefore(a, c));
  }

  var c = {
    facebook: {
      src: '//connect.facebook.net/en_GB/all.js#xfbml=1&appId=119413198130333',
      id: 'facebook-jssdk',
    },
    twitter: {
      src: '//platform.twitter.com/widgets.js',
      id: 'twitter-wjs',
    },
    google: {
      src: '//apis.google.com/js/plusone.js',
      id: 'google-js',
    },
  }, d = [], e, f, g = !1;
  window.gpluso = function () {
    g = !0;
    clearTimeout(f);
  };
  window.gplusc = function () {
    g = !1;
    ac(e, 'hover', 0);
  };
  it(gebc('social'), function (b) {a(b);});
  window.mtt && !navigator.appVersion.match(/MSIE [3-7]/) && it(gebc('mtt'), function (a) {
    ael(a, 'mouseover', function (b) {
      if (b = gA(a, 'title')) {
        if ('IMG' === a.tagName || 'INPUT' === a.tagName) {
          var c = dce('div', { 'class': a.className });
          a.className = '';
          a.parentNode.insertBefore(c, a);
          aCh(c, a);
          c.blur();
          c.focus();
        } else {
          c = a;
        }
        sA(c, 'data-mtt', b);
        sA(a, 'title', '');
      }
    });
  });
})();
(function () {
  function a (a) {
    var b = !hC(a, 'bloat-enabled');
    ac(a, 'bloat-enabled', b);
    a.title = b ? 'Click image to collapse' : 'Click image to see more detail';
  }

  aelw('load', function () {
    var b = [];
    b.push(gf('bloat'));
    for (var c = 1, d; d = gf("bloat" + c);) b.push(d), c++;
    it(b, function (b) {
      aelc(b, a);
      b = gebtn('figcaption', b);
      (2 <= b.length && '' === b[1].innerHTML || 1 === b.length) && sd(b[0], 2);
    });
  });
})();
BOOL = function () {
  function a () {
    var a;
    return (a = ('; ' + document.cookie + ';').match(/;\s*BOOLSESS=(.*?);/)) ? a[1] : '';
  }

  function b (a) {
    a = a.replace(/^:+/, '').replace(/:+$/, '');
    var b = 'BOOLSESS=' + a + ';path=/';
    '' === a && (b += ';expires=Thu, 01 Jan 1970 00:00:01 GMT');
    document.cookie = b;
  }

  return {
    add: function (c) {
      var d = a();
      var e = 0 <= (':' + d + ':').indexOf(':' + c + ':') ? 1 : void 0;
      e || b(d + ((d ? ':' : '') + c));
    },
    del: function (c) {
      var d = a(), e = (':' + d + ':').indexOf(':' + c + ':'), f = 0 <= e;
      f && (d = ':' + d + ':', d = d.slice(0, e) + d.slice(e + c.length + 1), b(d));
      return f;
    },
  };
}();
ERR = function () {
  function a (e) {
    try {
      if (5 <= c.c) {
        window.removeEventListener('error', a);
      } else {
        var f = {
          m: e.message,
          f: e.filename,
          l: e.lineno,
          u: window.location.href,
          s: e.error && e.error.stack ? e.error.stack : null,
          p: navigator.platform,
          a: navigator.userAgent,
          t: dt() - b,
        };
        c.e.push(f);
        c.c++;
        clearTimeout(d);
        d = setTimeout(c.S, 2E3);
      }
    } catch (g) {}
  }

  var b = dt(), c = {
    e: [],
    c: 0,
    S: function () {
      var a = JSON.stringify(c.e);
      pp(gx(), '/scripts/logjserr.php', a);
      c.e = [];
    },
  }, d = null;
  aelw('error', a);
  return c;
}();
aelw('load', main);
(function () {
  function a () {
    t.transition = '0.2s top ease-in';
    n();
    setTimeout(function () {t.transition = 'none';}, q - pn() + 300);
  }

  function b (a, b) {return a && a.slot && a.slot.getSlotElementId && 0 < a.slot.getSlotElementId().indexOf(b);}

  if (('undefined' === typeof TAD.stickyDisable || !TAD.stickyDisable) && gf('header__wrapper')) {
    var c = gf('header__inner'), d = gf('nav').offsetHeight, e = c.offsetHeight,
      f = 'undefined' !== typeof TAD.stickyHeight ? TAD.stickyHeight : 400,
      g = 'undefined' !== typeof TAD.stickyCollapseHeight ? TAD.stickyCollapseHeight :
        400, h = 'undefined' !== typeof TAD.stickyWaitTime ? TAD.stickyWaitTime : 3E3,
      k = 'undefined' !== typeof TAD.stickyRenderTime ? TAD.stickyRenderTime : 3E3,
      l = 'undefined' !== typeof TAD.stickyViewableTime ? TAD.stickyViewableTime : 1E3, m = pn(),
      q = h ? m + h : m, t = c.style, p = null;
    googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('slotRenderEnded', function (d) {
        if (b('728x90') || b('320x50-head')) {
          q = pn() + k, e = c.offsetHeight, p = setTimeout(function () {a();}, q - pn());
        }
      });
      googletag.pubads().addEventListener('impressionViewable', function (c) {
        if (b('728x90') || b('320x50-head')) {
          f = 0, g = 110, q = pn() + l, clearTimeout(p), p = setTimeout(function () {a();}, q - pn());
        }
      });
    });
    var n = function () {
      var a = window.pageYOffset || ddE().scrollTop;
      a > f && pn() > q ? t.transform = a < f + g
        ? 'translateY(' + -((a - f) / g) * (e - d) + 'px)'
        : 'translateY(' + -(e - d) + 'px)' : t.transform = 'translateY(0)';
    };
    aelw('scroll', n);
    n();
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('impressionViewable', function (a) {
        if (a && a.slot) {
          a = a.slot.getSlotElementId();
          var b = document.getElementById(a);
          b && (b.tadImpressionViewable = +performance.now(), b.tadAdvertRotateCount = 0, setTimeout(function () {
            document.addEventListener('mousemove', function () {
              b.tadAdvertRotateCount++;
              var a = new CustomEvent('impressionViewableRotate', {
                count: b.tadAdvertRotateCount,
                firstSeen: b.tadImpressionViewable,
              });
              b.dispatchEvent(a);
            }, { once: !0 });
          }, 3E4));
        }
      });
    });
  }
})();
blo = -1;

function bls (a) {
  var b = gf('FBD');
  sd(b, blo);
  if (-1 === blo) {
    a = a.href;
    a = a.match(/\.html/) ? a.replace('.h', '-frame.h') : a.match(/\?/)
      ? a.replace('?', '-frame?')
      : a + '-frame';
    var c = document.body.offsetWidth;
    600 < c && (c = 600);
    ih(b, '<iframe id="FBF" onload="siv(this, true);" src="' + a + '" width=' + c + ' '
    height = 800;
    ' frameborder=';
    0;
    '>webmaster@timeanddate.com</iframe>';
  )
  }
  blo = !blo;
  0 == blo && (b = gf('FBF')) && b.scrollIntoView();
  return !1;
}

function blc () {
  blo = 0;
  bls();
  blo = -1;
}

function blif (a) {
  if (blif.hasSent) {
    return !1;
  }
  blif.hasSent = !0;
  var b = gf('instant-feedback');
  ac(b, 1 == a ? 'instant-feedback--sent-up' : 'instant-feedback--sent-down', 1);
  b = wl();
  jcb('/scripts/logthumb.php?val=' + a + '&url=' + (b.pathname + b.search), function () {});
  return !1;
}

function bli () {
  var a = wl();
  if (a) {
    var b = function (a) {
        if (a = gf(a)) {
          a.href += c, sA(a, 'rel', 'nofollow');
        }
      },
      c = '?url=' + a.pathname;
    (a = a.search) && (c += encodeURIComponent(a));
    b('bls1');
    b('bls2');
  }
}

function calp (a, b) {
  function c (a, b) {
    var c = g['_' + b];
    a = a[b];
    c && (c.value = a, c.value != a && 'SELECT' == c.tagName && (b = c.options, b[b.length] = new Option(a, a, !1, !0)), fe('change', c));
    return a;
  }

  function d (a) {
    if (a) {
      a = {
        y: c(a, 'y'),
        m: c(a, 'm'),
        d: c(a, 'd'),
        p: b,
      };
      try {var d = new CustomEvent('dateSelected', { detail: a });} catch (m) {d = document.createEvent('CustomEvent'), d.initCustomEvent('dateSelected', !1, !1, a);}
      window.dispatchEvent(d);
    }
    calPU.k();
  }

  function e (a, c, d) {
    var e = b.match(/^\d/) ? a + b : '' === b ? {
      y: 'year',
      m: 'month',
      d: 'day',
    }[a] : b + a;
    e =
      h[e];
    var f = Mf(e.value - 0);
    c = lim(f, c, d);
    if (f == c || 'y' == a) {
      g[a] = f;
    }
    g['_' + a] = e;
  }

  function f (a, b) {
    a = a.getElementsByClassName(b);
    if (0 < a.length) {
      return a[0].value;
    }
  }

  if (!(0 <= a.className.indexOf('disabled'))) {
    loadcss('/common/picker_calendar.css');
    var g = {}, h = document.f;
    'string' === typeof b
      ? (e('y', TAD.fyear || 1, TAD.lyear || 3999), e('m', 1, 12), e('d', 1, 31))
      : g = {
        y: f('input-year'),
        m: f('input-month'),
        d: f('input-day'),
      };
    phg('calp', '/scripts/field/calpop2?4', function (b) {
      var c = a.parentElement;
      if (window.Picker) {
        calPU.o();
      } else {
        b = ghj(b);
        var e = cE('div', { id: 'calpop2' }, document.body);
        calPU = new PU('calpop2');
        ac(e, 'calpopup', 1);
        calPU.h(b.h);
        eval(b.j);
      }
      Picker.showPicker(c, a, g, d);
    });
  }
}

(function () {
  function a () {
    var b = window.UPD, c = 0 < TO.y ? 1E4 : 1E3;
    if (b) {
      var d = TO.dt(), e, f, g = function (a) {
        if (!a.d) {
          var b = e - d;
          if (0 > b) {
            b = a.typ;
            var g = a.val;
            'reload' == b && location.reload();
            'html' == b && iH(a.id, g);
            'attr' == b && (f = gf(a.id)) && sA(f, a.nam, a.val);
            'img' == b && (f = gf(a.id)) && (f.src = g);
            'imgf' == b && ((new Image).src = g);
            if ('js' == b) {
              try {eval(g);} catch (m) {window.exception = m;}
            }
            a.d = 1;
          } else {
            b < c && (c = b);
          }
        }
      };
      it(b, function (a) {
        e = a.tim;
        it(a.lst, g);
      });
    }
    setTimeout(a, c);
  }

  a();
})();
(function () {
  var a = function (a, c) {
    var b = this;
    b.e = gf(a);
    b.e.stickytable = b;
    b.o = eval('(' + gA(b.e, 'data-options') + ')') || c || {};
    b.p = b.o.offsettop || 40;
    b.b = b.o.offsetbottom || 0;
    a = 0 < b.e.className.length
      ? b.e.className.split(/\s+/).filter(function (a) {return a.length;}).map(function (a) {return 'sticky-wrapper--' + a;}).join(' ')
      : '';
    b.w = cE('div', { 'class': 'sticky-wr ' + a });
    b.T();
    b.d = gebtn('thead', b.e)[0];
    b.l = gebtn('tbody', b.e)[0];
    b.f = gebtn('tfoot', b.e)[0];
    b.S();
    aelw('scroll', function (a) {b.C(a);});
    aelw('resize', function (a) {b.Z(a);});
  };
  a.prototype.T = function () {
    this.e.parentNode.insertBefore(this.w, this.e);
    aCh(this.w, this.e);
  };
  a.prototype.S = function () {
    var a = this.l;
    a && (this.U(this.d, !0), this.U(a), this.d.style.width = '', a.style.width = '', this.f && this.U(this.f), ac(this.e, 'sticky-en', 0), this.W(this.d, !0), this.W(a), this.d.style.width = a.offsetWidth + 'px', a.style.width = a.offsetWidth + 'px', this.f && this.W(this.f), this.y = ap(this.e).y, this.h = this.e.offsetHeight, ac(this.e, 'sticky-en', 1), this.a = this.d.offsetHeight);
  };
  a.prototype.U = function (a, c) {
    a =
      arrclone(a.children);
    var b = c ? a.length : 1;
    for (c = 0; c < b; c++) {
      var e = arrclone(a[c].children);
      it(e, function (a, b) {a.style.width = '';});
    }
  };
  a.prototype.W = function (a, c) {
    a = arrclone(a.children);
    var b = c ? a.length : 1;
    for (c = 0; c < b; c++) {
      var e = arrclone(a[c].children), f = [];
      it(e, function (a) {f.push(a.offsetWidth);});
      it(e, function (a, b) {a.style.width = f[b] + 'px';});
    }
  };
  a.prototype.P = function () {
    var a = this, c = (document.body.scrollTop || ddE().scrollTop) - a.y, d = a.p;
    a.d.style.transform = 'translateY(' + (c >= -d && c < a.h - a.b - a.a - d
      ? c + d
      : c >= a.h - a.b -
      a.a - d ? a.h - a.b - a.a : 0) + 'px)';
    a.s || (a.s = setTimeout(function () {
      a.y = ap(a.e).y;
      a.s = null;
    }, 300));
  };
  a.prototype.C = function (a) {this.P();};
  a.prototype.Z = function (a) {
    var b = this;
    b.t && clearTimeout(b.t);
    b.t = setTimeout(function () {
      b.S();
      b.P();
    }, 300);
  };
  window.Sticky = a;
})();
(function () {
  function a () {document.body.classList.toggle('isShowingMenu');}

  function b (a) {
    if (1024 >= window.innerWidth) {
      a.preventDefault();
      var b = a.target;
      m.forEach(function (a) {
        a.contains(b)
          ? a.classList.toggle('isActive')
          : a.classList.remove('isActive');
      });
      return !1;
    }
  }

  var c = gf('nav'), d = gf('site-nav'), e = gf('site-nav-menu'), f = gf('site-nav-close'),
    g = gf('site-nav-blur'), h = gf('site-nav-search-btn'), k = gf('site-nav-search'),
    l = gf('site-nav-login'), m = d ? arrclone(d.children) : [], q = !1;
  m.forEach(function (a) {
    ael(a.children[0],
      'click', function (a) {b(a);});
  });
  ael(e, 'click', a);
  ael(f, 'click', a);
  ael(g, 'click', a);
  ael(l, 'click', function () {
    a();
    openlogin();
  });
  ael(h, 'click', function (a) {q && '' !== k.value || (a.preventDefault(), c.classList.add('isSearchActive'), k.focus())});
  ael(k, "blur", function () {c.classList.remove("isSearchActive")});
  ael(h, "mousedown", function () {q = document.activeElement === k});
  ael(k, "keypress", function (a) {13 == event.keyCode && (q = !0)})
})();
window._T.control = window._T.control || {};
(function (a) {
  var b = !1;
  a.bindings = {};
  a.add = function (c, e) {
    b = !0;
    a.bindings[c] = e
  };
  a.applyBindings = function (c) {
    c = c || document;
    if (b) {
      return c = arrclone(c.querySelectorAll("*[data-tad-control]")), c.forEach(function (b) {
        var c = gA(b, "data-tad-control");
        if (c = a.bindings[c]) {
          var d = eval("[" + gA(b, "data-tad-options") + "]")[0] || {};
          "undefined" === typeof b.tadControl && (b.tadControl = new c(b, d));
          b.removeAttribute("data-tad-control");
          b.removeAttribute("data-tad-options")
        }
      }), { nodes: c }
    }
  };
  var c = function () {
    a.applyBindingsOnLoad &&
    a.applyBindings()
  };
  a.applyBindingsOnLoad = function () {
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", c)
      : c()
  }
})(window._T.control);
(function () {
  function a () {
    var a = document.cookie.match(/(^| )TIMEANDDATE_ADBLORM=([^;]+)/);
    return a ? a[2].split(":").reduce(function (a, b) {
      b = b.split("_");
      a[b[0]] = parseInt(b[1], 10);
      return a
    }, {}) : null
  }

  function b (a) {
    "undefined" !== typeof a && (e.S = a);
    var b = Object.keys(e).map(function (a) {return a + "_" + e[a]}).join(":");
    document.cookie = "TIMEANDDATE_ADBLORM=" + b + ";domain=.timeanddate.com;path=/;expires=" + (new Date(d)).toUTCString() + ";SameSite=Lax";
    "undefined" !== typeof a && gp(gx(), "/scripts/logadblorm.php")
  }

  var c =
    +new Date, d = c + 7776E6, e = null;
  aelw("load", function () {
    var d = (d = gf("ad-wrap2")) && "none" === gcst(d, "display");
    e = a();
    !e && d ? (e = {
      V: 1,
      S: -1,
      D: 1,
      P: 1,
      M: 0,
      C: 0
    }, b(-1)) : e && (1 === e.S ? d && (e.X = c, b(2)) : d
      ? (e.C += 1, b(), 3 === e.C % 20 && (e.M += 1, e.L = c, url = "/information/adblorm-frame.html", modpop(url, null, "Dislike intrusive ads?", { modal_class: "center" }), b(0)))
      : (e.R = c, b(1)))
  })
})();
