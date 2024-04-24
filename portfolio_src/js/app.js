(() => {
    var __webpack_modules__ = {
        124: function(module) {
            /*!
 * TagCloud.js v2.5.0
 * Copyright (c) 2016-2024 @ Cong Min
 * MIT License - https://github.com/mcc108/TagCloud
 */
            (function(global, factory) {
                true ? module.exports = factory() : 0;
            })(0, (function() {
                "use strict";
                function ownKeys(e, r) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        r && (o = o.filter((function(r) {
                            return Object.getOwnPropertyDescriptor(e, r).enumerable;
                        }))), t.push.apply(t, o);
                    }
                    return t;
                }
                function _objectSpread2(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var t = null != arguments[r] ? arguments[r] : {};
                        r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                            _defineProperty(e, r, t[r]);
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                        }));
                    }
                    return e;
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    Object.defineProperty(Constructor, "prototype", {
                        writable: false
                    });
                    return Constructor;
                }
                function _defineProperty(obj, key, value) {
                    key = _toPropertyKey(key);
                    if (key in obj) Object.defineProperty(obj, key, {
                        value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    }); else obj[key] = value;
                    return obj;
                }
                function _extends() {
                    _extends = Object.assign ? Object.assign.bind() : function(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    return _extends.apply(this, arguments);
                }
                function _toPrimitive(input, hint) {
                    if (typeof input !== "object" || input === null) return input;
                    var prim = input[Symbol.toPrimitive];
                    if (prim !== void 0) {
                        var res = prim.call(input, hint || "default");
                        if (typeof res !== "object") return res;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return (hint === "string" ? String : Number)(input);
                }
                function _toPropertyKey(arg) {
                    var key = _toPrimitive(arg, "string");
                    return typeof key === "symbol" ? key : String(key);
                }
                var TagCloud = function() {
                    function TagCloud() {
                        var container = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document.body;
                        var texts = arguments.length > 1 ? arguments[1] : void 0;
                        var options = arguments.length > 2 ? arguments[2] : void 0;
                        _classCallCheck(this, TagCloud);
                        var self = this;
                        if (!container || container.nodeType !== 1) return new Error("Incorrect element type");
                        self.$container = container;
                        self.texts = texts || [];
                        self.config = _objectSpread2(_objectSpread2({}, TagCloud._defaultConfig), options || {});
                        self.radius = self.config.radius;
                        self.depth = 2 * self.radius;
                        self.size = 1.5 * self.radius;
                        self.maxSpeed = TagCloud._getMaxSpeed(self.config.maxSpeed);
                        self.initSpeed = TagCloud._getInitSpeed(self.config.initSpeed);
                        self.direction = self.config.direction;
                        self.keep = self.config.keep;
                        self.paused = false;
                        self._createElment();
                        self._init();
                        TagCloud.list.push({
                            el: self.$el,
                            container,
                            instance: self
                        });
                    }
                    _createClass(TagCloud, [ {
                        key: "_createElment",
                        value: function _createElment() {
                            var self = this;
                            var $el = document.createElement("div");
                            $el.className = self.config.containerClass;
                            if (self.config.useContainerInlineStyles) {
                                $el.style.position = "relative";
                                $el.style.width = "".concat(2 * self.radius, "px");
                                $el.style.height = "".concat(2 * self.radius, "px");
                            }
                            self.items = [];
                            self.texts.forEach((function(text, index) {
                                var item = self._createTextItem(text, index);
                                $el.appendChild(item.el);
                                self.items.push(item);
                            }));
                            self.$container.appendChild($el);
                            self.$el = $el;
                        }
                    }, {
                        key: "_createTextItem",
                        value: function _createTextItem(text) {
                            var index = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                            var self = this;
                            var itemEl = document.createElement("span");
                            itemEl.className = self.config.itemClass;
                            if (self.config.useItemInlineStyles) {
                                itemEl.style.willChange = "transform, opacity, filter";
                                itemEl.style.position = "absolute";
                                itemEl.style.top = "50%";
                                itemEl.style.left = "50%";
                                itemEl.style.zIndex = index + 1;
                                itemEl.style.filter = "alpha(opacity=0)";
                                itemEl.style.opacity = 0;
                                var transformOrigin = "50% 50%";
                                itemEl.style.WebkitTransformOrigin = transformOrigin;
                                itemEl.style.MozTransformOrigin = transformOrigin;
                                itemEl.style.OTransformOrigin = transformOrigin;
                                itemEl.style.transformOrigin = transformOrigin;
                                var transform = "translate3d(-50%, -50%, 0) scale(1)";
                                itemEl.style.WebkitTransform = transform;
                                itemEl.style.MozTransform = transform;
                                itemEl.style.OTransform = transform;
                                itemEl.style.transform = transform;
                            }
                            if (self.config.useHTML) itemEl.innerHTML = text; else itemEl.innerText = text;
                            return _objectSpread2({
                                el: itemEl
                            }, self._computePosition(index));
                        }
                    }, {
                        key: "_computePosition",
                        value: function _computePosition(index) {
                            var random = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                            var self = this;
                            var textsLength = self.texts.length;
                            if (random) index = Math.floor(Math.random() * (textsLength + 1));
                            var phi = Math.acos(-1 + (2 * index + 1) / textsLength);
                            var theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
                            return {
                                x: self.size * Math.cos(theta) * Math.sin(phi) / 2,
                                y: self.size * Math.sin(theta) * Math.sin(phi) / 2,
                                z: self.size * Math.cos(phi) / 2
                            };
                        }
                    }, {
                        key: "_requestInterval",
                        value: function _requestInterval(fn, delay) {
                            var requestAnimFrame = (function() {
                                return window.requestAnimationFrame;
                            } || function(callback, element) {
                                window.setTimeout(callback, 1e3 / 60);
                            })();
                            var start = (new Date).getTime();
                            var handle = {};
                            function loop() {
                                handle.value = requestAnimFrame(loop);
                                var current = (new Date).getTime(), delta = current - start;
                                if (delta >= delay) {
                                    fn.call();
                                    start = (new Date).getTime();
                                }
                            }
                            handle.value = requestAnimFrame(loop);
                            return handle;
                        }
                    }, {
                        key: "_init",
                        value: function _init() {
                            var self = this;
                            self.active = false;
                            self.mouseX0 = self.initSpeed * Math.sin(self.direction * (Math.PI / 180));
                            self.mouseY0 = -self.initSpeed * Math.cos(self.direction * (Math.PI / 180));
                            self.mouseX = self.mouseX0;
                            self.mouseY = self.mouseY0;
                            var isTouchDevice = window.matchMedia("(hover: hover)");
                            if (!isTouchDevice || isTouchDevice.matches) {
                                TagCloud._on(self.$el, "mouseover", (function() {
                                    self.active = true;
                                }));
                                TagCloud._on(self.$el, "mouseout", (function() {
                                    self.active = false;
                                }));
                                TagCloud._on(self.keep ? window : self.$el, "mousemove", (function(ev) {
                                    ev = ev || window.event;
                                    var rect = self.$el.getBoundingClientRect();
                                    self.mouseX = (ev.clientX - (rect.left + rect.width / 2)) / 5;
                                    self.mouseY = (ev.clientY - (rect.top + rect.height / 2)) / 5;
                                }));
                            }
                            self._next();
                            self.interval = self._requestInterval((function() {
                                self._next.call(self);
                            }), 10);
                        }
                    }, {
                        key: "_next",
                        value: function _next() {
                            var self = this;
                            if (self.paused) return;
                            if (!self.keep && !self.active) {
                                self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1 ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2;
                                self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1 ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2;
                            }
                            var a = -Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius * self.maxSpeed;
                            var b = Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius * self.maxSpeed;
                            if (self.config.reverseDirection) {
                                a = -a;
                                b = -b;
                            }
                            if (Math.abs(a) <= .01 && Math.abs(b) <= .01) return;
                            var l = Math.PI / 180;
                            var sc = [ Math.sin(a * l), Math.cos(a * l), Math.sin(b * l), Math.cos(b * l) ];
                            self.items.forEach((function(item) {
                                var rx1 = item.x;
                                var ry1 = item.y * sc[1] + item.z * -sc[0];
                                var rz1 = item.y * sc[0] + item.z * sc[1];
                                var rx2 = rx1 * sc[3] + rz1 * sc[2];
                                var ry2 = ry1;
                                var rz2 = rz1 * sc[3] - rx1 * sc[2];
                                var per = 2 * self.depth / (2 * self.depth + rz2);
                                item.x = rx2;
                                item.y = ry2;
                                item.z = rz2;
                                item.scale = per.toFixed(3);
                                var alpha = per * per - .25;
                                alpha = (alpha > 1 ? 1 : alpha).toFixed(3);
                                var itemEl = item.el;
                                var left = (item.x - itemEl.offsetWidth / 2).toFixed(2);
                                var top = (item.y - itemEl.offsetHeight / 2).toFixed(2);
                                var transform = "translate3d(".concat(left, "px, ").concat(top, "px, 0) scale(").concat(item.scale, ")");
                                itemEl.style.WebkitTransform = transform;
                                itemEl.style.MozTransform = transform;
                                itemEl.style.OTransform = transform;
                                itemEl.style.transform = transform;
                                itemEl.style.filter = "alpha(opacity=".concat(100 * alpha, ")");
                                itemEl.style.opacity = alpha;
                            }));
                        }
                    }, {
                        key: "update",
                        value: function update(texts) {
                            var self = this;
                            self.texts = texts || [];
                            self.texts.forEach((function(text, index) {
                                var item = self.items[index];
                                if (!item) {
                                    item = self._createTextItem(text, index);
                                    _extends(item, self._computePosition(index, true));
                                    self.$el.appendChild(item.el);
                                    self.items.push(item);
                                }
                                if (self.config.useHTML) item.el.innerHTML = text; else item.el.innerText = text;
                            }));
                            var textsLength = self.texts.length;
                            var itemsLength = self.items.length;
                            if (textsLength < itemsLength) {
                                var removeList = self.items.splice(textsLength, itemsLength - textsLength);
                                removeList.forEach((function(item) {
                                    self.$el.removeChild(item.el);
                                }));
                            }
                        }
                    }, {
                        key: "destroy",
                        value: function destroy() {
                            var self = this;
                            self.interval = null;
                            var index = TagCloud.list.findIndex((function(e) {
                                return e.el === self.$el;
                            }));
                            if (index !== -1) TagCloud.list.splice(index, 1);
                            if (self.$container && self.$el) self.$container.removeChild(self.$el);
                        }
                    }, {
                        key: "pause",
                        value: function pause() {
                            var self = this;
                            self.paused = true;
                        }
                    }, {
                        key: "resume",
                        value: function resume() {
                            var self = this;
                            self.paused = false;
                        }
                    } ], [ {
                        key: "_on",
                        value: function _on(el, ev, handler, cap) {
                            if (el.addEventListener) el.addEventListener(ev, handler, cap); else if (el.attachEvent) el.attachEvent("on".concat(ev), handler); else el["on".concat(ev)] = handler;
                        }
                    } ]);
                    return TagCloud;
                }();
                TagCloud.list = [];
                TagCloud._defaultConfig = {
                    radius: 100,
                    maxSpeed: "normal",
                    initSpeed: "normal",
                    direction: 135,
                    keep: true,
                    reverseDirection: false,
                    useContainerInlineStyles: true,
                    useItemInlineStyles: true,
                    containerClass: "tagcloud",
                    itemClass: "tagcloud--item",
                    useHTML: false
                };
                TagCloud._getMaxSpeed = function(name) {
                    return {
                        slow: .5,
                        normal: 1,
                        fast: 2
                    }[name] || 1;
                };
                TagCloud._getInitSpeed = function(name) {
                    return {
                        slow: 16,
                        normal: 32,
                        fast: 80
                    }[name] || 32;
                };
                var index = function(els, texts, options) {
                    if (typeof els === "string") els = document.querySelectorAll(els);
                    if (!els.forEach) els = [ els ];
                    var instances = [];
                    els.forEach((function(el) {
                        if (el) instances.push(new TagCloud(el, texts, options));
                    }));
                    return instances.length <= 1 ? instances[0] : instances;
                };
                return index;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const modules_flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    lockPaddingElements.forEach((lockPaddingElement => {
                        lockPaddingElement.style.paddingRight = "";
                    }));
                    document.body.style.paddingRight = "";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = lockPaddingValue;
                }));
                document.body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function functions_FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    const headerElement = document.querySelector(headerItem);
                    if (!headerElement.classList.contains("_header-scroll")) {
                        headerElement.style.cssText = `transition-duration: 0s;`;
                        headerElement.classList.add("_header-scroll");
                        headerItemHeight = headerElement.offsetHeight;
                        headerElement.classList.remove("_header-scroll");
                        setTimeout((() => {
                            headerElement.style.cssText = ``;
                        }), 0);
                    } else headerItemHeight = headerElement.offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                functions_FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
            } else functions_FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
        };
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                            let valueOfThreshold;
                            if (item.clientHeight > 2) {
                                valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                                if (valueOfThreshold > 1) valueOfThreshold = 1;
                            } else valueOfThreshold = 1;
                            item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                        }
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                    return;
                }
                if (paramsWatch.threshold === "prx") {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                console.log(configWatcher);
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        modules_flsModules.watcher = new ScrollWatcher({});
        class FullPage {
            constructor(element, options) {
                let config = {
                    noEventSelector: "[data-no-event]",
                    classInit: "fp-init",
                    wrapperAnimatedClass: "fp-switching",
                    selectorSection: "[data-fp-section]",
                    activeClass: "active-section",
                    previousClass: "previous-section",
                    nextClass: "next-section",
                    idActiveSection: 0,
                    mode: element.dataset.fpEffect ? element.dataset.fpEffect : "slider",
                    bullets: element.hasAttribute("data-fp-bullets") ? true : false,
                    bulletsClass: "fp-bullets",
                    bulletClass: "fp-bullet",
                    bulletActiveClass: "fp-bullet-active",
                    onInit: function() {},
                    onSwitching: function() {},
                    onDestroy: function() {}
                };
                this.options = Object.assign(config, options);
                this.wrapper = element;
                this.sections = this.wrapper.querySelectorAll(this.options.selectorSection);
                this.activeSection = false;
                this.activeSectionId = false;
                this.previousSection = false;
                this.previousSectionId = false;
                this.nextSection = false;
                this.nextSectionId = false;
                this.bulletsWrapper = false;
                this.stopEvent = false;
                if (this.sections.length) this.init();
            }
            init() {
                if (this.options.idActiveSection > this.sections.length - 1) return;
                this.setId();
                this.activeSectionId = this.options.idActiveSection;
                this.setEffectsClasses();
                this.setClasses();
                this.setStyle();
                if (this.options.bullets) {
                    this.setBullets();
                    this.setActiveBullet(this.activeSectionId);
                }
                this.events();
                setTimeout((() => {
                    document.documentElement.classList.add(this.options.classInit);
                    this.options.onInit(this);
                    document.dispatchEvent(new CustomEvent("fpinit", {
                        detail: {
                            fp: this
                        }
                    }));
                }), 0);
            }
            destroy() {
                this.removeEvents();
                this.removeClasses();
                document.documentElement.classList.remove(this.options.classInit);
                this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
                this.removeEffectsClasses();
                this.removeZIndex();
                this.removeStyle();
                this.removeId();
                this.options.onDestroy(this);
                document.dispatchEvent(new CustomEvent("fpdestroy", {
                    detail: {
                        fp: this
                    }
                }));
            }
            setId() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.setAttribute("data-fp-id", index);
                }
            }
            removeId() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.removeAttribute("data-fp-id");
                }
            }
            setClasses() {
                this.previousSectionId = this.activeSectionId - 1 >= 0 ? this.activeSectionId - 1 : false;
                this.nextSectionId = this.activeSectionId + 1 < this.sections.length ? this.activeSectionId + 1 : false;
                this.activeSection = this.sections[this.activeSectionId];
                this.activeSection.classList.add(this.options.activeClass);
                for (let index = 0; index < this.sections.length; index++) document.documentElement.classList.remove(`fp-section-${index}`);
                document.documentElement.classList.add(`fp-section-${this.activeSectionId}`);
                if (this.previousSectionId !== false) {
                    this.previousSection = this.sections[this.previousSectionId];
                    this.previousSection.classList.add(this.options.previousClass);
                } else this.previousSection = false;
                if (this.nextSectionId !== false) {
                    this.nextSection = this.sections[this.nextSectionId];
                    this.nextSection.classList.add(this.options.nextClass);
                } else this.nextSection = false;
            }
            removeEffectsClasses() {
                switch (this.options.mode) {
                  case "slider":
                    this.wrapper.classList.remove("slider-mode");
                    break;

                  case "cards":
                    this.wrapper.classList.remove("cards-mode");
                    this.setZIndex();
                    break;

                  case "fade":
                    this.wrapper.classList.remove("fade-mode");
                    this.setZIndex();
                    break;

                  default:
                    break;
                }
            }
            setEffectsClasses() {
                switch (this.options.mode) {
                  case "slider":
                    this.wrapper.classList.add("slider-mode");
                    break;

                  case "cards":
                    this.wrapper.classList.add("cards-mode");
                    this.setZIndex();
                    break;

                  case "fade":
                    this.wrapper.classList.add("fade-mode");
                    this.setZIndex();
                    break;

                  default:
                    break;
                }
            }
            setStyle() {
                switch (this.options.mode) {
                  case "slider":
                    this.styleSlider();
                    break;

                  case "cards":
                    this.styleCards();
                    break;

                  case "fade":
                    this.styleFade();
                    break;

                  default:
                    break;
                }
            }
            styleSlider() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    if (index === this.activeSectionId) section.style.transform = "translate3D(0,0,0)"; else if (index < this.activeSectionId) section.style.transform = "translate3D(0,-100%,0)"; else if (index > this.activeSectionId) section.style.transform = "translate3D(0,100%,0)";
                }
            }
            styleCards() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    if (index >= this.activeSectionId) section.style.transform = "translate3D(0,0,0)"; else if (index < this.activeSectionId) section.style.transform = "translate3D(0,-100%,0)";
                }
            }
            styleFade() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    if (index === this.activeSectionId) {
                        section.style.opacity = "1";
                        section.style.pointerEvents = "all";
                    } else {
                        section.style.opacity = "0";
                        section.style.pointerEvents = "none";
                    }
                }
            }
            removeStyle() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.style.opacity = "";
                    section.style.visibility = "";
                    section.style.transform = "";
                }
            }
            checkScroll(yCoord, element) {
                this.goScroll = false;
                if (!this.stopEvent && element) {
                    this.goScroll = true;
                    if (this.haveScroll(element)) {
                        this.goScroll = false;
                        const position = Math.round(element.scrollHeight - element.scrollTop);
                        if (Math.abs(position - element.scrollHeight) < 2 && yCoord <= 0 || Math.abs(position - element.clientHeight) < 2 && yCoord >= 0) this.goScroll = true;
                    }
                }
            }
            haveScroll(element) {
                return element.scrollHeight !== window.innerHeight;
            }
            removeClasses() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.classList.remove(this.options.activeClass);
                    section.classList.remove(this.options.previousClass);
                    section.classList.remove(this.options.nextClass);
                }
            }
            events() {
                this.events = {
                    wheel: this.wheel.bind(this),
                    touchdown: this.touchDown.bind(this),
                    touchup: this.touchUp.bind(this),
                    touchmove: this.touchMove.bind(this),
                    touchcancel: this.touchUp.bind(this),
                    transitionEnd: this.transitionend.bind(this),
                    click: this.clickBullets.bind(this)
                };
                if (isMobile.iOS()) document.addEventListener("touchmove", (e => {
                    e.preventDefault();
                }));
                this.setEvents();
            }
            setEvents() {
                this.wrapper.addEventListener("wheel", this.events.wheel);
                this.wrapper.addEventListener("touchstart", this.events.touchdown);
                if (this.options.bullets && this.bulletsWrapper) this.bulletsWrapper.addEventListener("click", this.events.click);
            }
            removeEvents() {
                this.wrapper.removeEventListener("wheel", this.events.wheel);
                this.wrapper.removeEventListener("touchdown", this.events.touchdown);
                this.wrapper.removeEventListener("touchup", this.events.touchup);
                this.wrapper.removeEventListener("touchcancel", this.events.touchup);
                this.wrapper.removeEventListener("touchmove", this.events.touchmove);
                if (this.bulletsWrapper) this.bulletsWrapper.removeEventListener("click", this.events.click);
            }
            clickBullets(e) {
                const bullet = e.target.closest(`.${this.options.bulletClass}`);
                if (bullet) {
                    const arrayChildren = Array.from(this.bulletsWrapper.children);
                    const idClickBullet = arrayChildren.indexOf(bullet);
                    this.switchingSection(idClickBullet);
                }
            }
            setActiveBullet(idButton) {
                if (!this.bulletsWrapper) return;
                const bullets = this.bulletsWrapper.children;
                for (let index = 0; index < bullets.length; index++) {
                    const bullet = bullets[index];
                    if (idButton === index) bullet.classList.add(this.options.bulletActiveClass); else bullet.classList.remove(this.options.bulletActiveClass);
                }
            }
            touchDown(e) {
                this._yP = e.changedTouches[0].pageY;
                this._eventElement = e.target.closest(`.${this.options.activeClass}`);
                if (this._eventElement) {
                    this._eventElement.addEventListener("touchend", this.events.touchup);
                    this._eventElement.addEventListener("touchcancel", this.events.touchup);
                    this._eventElement.addEventListener("touchmove", this.events.touchmove);
                    this.clickOrTouch = true;
                    if (isMobile.iOS()) {
                        if (this._eventElement.scrollHeight !== this._eventElement.clientHeight) {
                            if (this._eventElement.scrollTop === 0) this._eventElement.scrollTop = 1;
                            if (this._eventElement.scrollTop === this._eventElement.scrollHeight - this._eventElement.clientHeight) this._eventElement.scrollTop = this._eventElement.scrollHeight - this._eventElement.clientHeight - 1;
                        }
                        this.allowUp = this._eventElement.scrollTop > 0;
                        this.allowDown = this._eventElement.scrollTop < this._eventElement.scrollHeight - this._eventElement.clientHeight;
                        this.lastY = e.changedTouches[0].pageY;
                    }
                }
            }
            touchMove(e) {
                const targetElement = e.target.closest(`.${this.options.activeClass}`);
                if (isMobile.iOS()) {
                    let up = e.changedTouches[0].pageY > this.lastY;
                    let down = !up;
                    this.lastY = e.changedTouches[0].pageY;
                    if (targetElement) if (up && this.allowUp || down && this.allowDown) e.stopPropagation(); else if (e.cancelable) e.preventDefault();
                }
                if (!this.clickOrTouch || e.target.closest(this.options.noEventSelector)) return;
                let yCoord = this._yP - e.changedTouches[0].pageY;
                this.checkScroll(yCoord, targetElement);
                if (this.goScroll && Math.abs(yCoord) > 20) this.choiceOfDirection(yCoord);
            }
            touchUp(e) {
                this._eventElement.removeEventListener("touchend", this.events.touchup);
                this._eventElement.removeEventListener("touchcancel", this.events.touchup);
                this._eventElement.removeEventListener("touchmove", this.events.touchmove);
                return this.clickOrTouch = false;
            }
            transitionend(e) {
                this.stopEvent = false;
                document.documentElement.classList.remove(this.options.wrapperAnimatedClass);
                this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
            }
            wheel(e) {
                if (e.target.closest(this.options.noEventSelector)) return;
                const yCoord = e.deltaY;
                const targetElement = e.target.closest(`.${this.options.activeClass}`);
                this.checkScroll(yCoord, targetElement);
                if (this.goScroll) this.choiceOfDirection(yCoord);
                if (window.innerWidth > 991.98) {
                    let activeSection = document.querySelector(".active-section");
                    if (activeSection) {
                        const menuBody = document.querySelector(".menu__body");
                        menuBody.className = "menu__body";
                        if (activeSection.classList.contains("hero")) menuBody.classList.add("toBottom"); else if (activeSection.classList.contains("me")) if (yCoord > 0) menuBody.classList.add("fromBottomtoCenter"); else menuBody.classList.add("fromToptoCenter"); else if (activeSection.classList.contains("skills")) menuBody.classList.add("toTop"); else if (activeSection.classList.contains("projects")) if (yCoord > 0) menuBody.classList.add("fromToptoCenter"); else menuBody.classList.add("fromBottomtoCenter"); else if (activeSection.classList.contains("contact")) menuBody.classList.add("toBottom");
                    }
                }
            }
            choiceOfDirection(direction) {
                if (direction > 0 && this.nextSection !== false) this.activeSectionId = this.activeSectionId + 1 < this.sections.length ? ++this.activeSectionId : this.activeSectionId; else if (direction < 0 && this.previousSection !== false) this.activeSectionId = this.activeSectionId - 1 >= 0 ? --this.activeSectionId : this.activeSectionId;
                this.switchingSection(this.activeSectionId, direction);
            }
            switchingSection(idSection = this.activeSectionId, direction) {
                if (!direction) if (idSection < this.activeSectionId) direction = -100; else if (idSection > this.activeSectionId) direction = 100;
                this.activeSectionId = idSection;
                this.stopEvent = true;
                if (this.previousSectionId === false && direction < 0 || this.nextSectionId === false && direction > 0) this.stopEvent = false;
                if (this.stopEvent) {
                    document.documentElement.classList.add(this.options.wrapperAnimatedClass);
                    this.wrapper.classList.add(this.options.wrapperAnimatedClass);
                    this.removeClasses();
                    this.setClasses();
                    this.setStyle();
                    if (this.options.bullets) this.setActiveBullet(this.activeSectionId);
                    let delaySection;
                    if (direction < 0) {
                        delaySection = this.activeSection.dataset.fpDirectionUp ? parseInt(this.activeSection.dataset.fpDirectionUp) : 500;
                        document.documentElement.classList.add("fp-up");
                        document.documentElement.classList.remove("fp-down");
                    } else {
                        delaySection = this.activeSection.dataset.fpDirectionDown ? parseInt(this.activeSection.dataset.fpDirectionDown) : 500;
                        document.documentElement.classList.remove("fp-up");
                        document.documentElement.classList.add("fp-down");
                    }
                    setTimeout((() => {
                        this.events.transitionEnd();
                    }), delaySection);
                    this.options.onSwitching(this);
                    document.dispatchEvent(new CustomEvent("fpswitching", {
                        detail: {
                            fp: this
                        }
                    }));
                }
            }
            setBullets() {
                this.bulletsWrapper = document.querySelector(`.${this.options.bulletsClass}`);
                if (!this.bulletsWrapper) {
                    const bullets = document.createElement("div");
                    bullets.classList.add(this.options.bulletsClass);
                    this.wrapper.append(bullets);
                    this.bulletsWrapper = bullets;
                }
                if (this.bulletsWrapper) for (let index = 0; index < this.sections.length; index++) {
                    const span = document.createElement("span");
                    span.classList.add(this.options.bulletClass);
                    this.bulletsWrapper.append(span);
                }
            }
            setZIndex() {
                let zIndex = this.sections.length;
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.style.zIndex = zIndex;
                    --zIndex;
                }
            }
            removeZIndex() {
                for (let index = 0; index < this.sections.length; index++) {
                    const section = this.sections[index];
                    section.style.zIndex = "";
                }
            }
        }
        if (document.querySelector("[data-fp]")) modules_flsModules.fullpage = new FullPage(document.querySelector("[data-fp]"), "");
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if (e.type === "click") {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        if (modules_flsModules.fullpage) {
                            const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                            const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                            if (fullpageSectionId !== null) {
                                modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                            }
                        } else gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                        e.preventDefault();
                    }
                } else if (e.type === "watcherCallback" && e.detail) {
                    const entry = e.detail.entry;
                    const targetElement = entry.target;
                    if (targetElement.dataset.watch === "navigator") {
                        document.querySelector(`[data-goto]._navigator-active`);
                        let navigatorCurrentItem;
                        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if (document.querySelector(`[data-goto=".${element}"]`)) {
                                navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                        if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                    }
                }
            }
            if (getHash()) {
                let goToHash;
                if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
                goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
            }
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        var TagCloud = __webpack_require__(124);
        const container = ".skills__container";
        const texts = [ "HTML", "CSS", "SCSS", "JavaScript", "Figma", "Animations", "npm", "Responsive" ];
        const options = {
            containerClass: "tag-cloud",
            itemClass: "tag",
            radius: 200,
            direction: 225,
            initSpeed: "normal",
            maxSpeed: "normal"
        };
        let tagCloud = TagCloud(container, texts, options);
        let showTagCloud = false;
        function handleResize() {
            if (window.innerWidth < 991.98 && showTagCloud == false) {
                tagCloud.destroy();
                populateSkillsList();
                showTagCloud = true;
            } else if (window.innerWidth >= 991.98 && showTagCloud == true) {
                clearSkillsContainer();
                tagCloud = TagCloud(container, texts, options);
                showTagCloud = false;
            }
            let navigationItem = document.querySelector('.menu__link[data-goto=".me"]');
            if (navigationItem.classList.contains("_navigator-active")) {
                let animationItem = document.querySelector(".menu__body");
                animationItem.classList.add("animateUp");
            }
        }
        function populateSkillsList() {
            const container = document.querySelector(".skills__container");
            const ul = document.createElement("ul");
            ul.classList.add("skills__list");
            texts.forEach((text => {
                const li = document.createElement("li");
                li.classList.add("skills__item");
                li.textContent = text;
                ul.appendChild(li);
            }));
            container.appendChild(ul);
        }
        function clearSkillsContainer() {
            const container = document.querySelector(".skills__container");
            while (container.firstChild) container.removeChild(container.firstChild);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        window["FLS"] = true;
        isWebp();
        menuInit();
        pageNavigation();
    })();
})();