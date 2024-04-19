// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/react/cjs/react.react-server.development.js
var require_react_react_server_development = __commonJS((exports) => {
  if (true) {
    (function() {
      var TaintRegistryObjects$1 = new WeakMap;
      var TaintRegistryValues$1 = new Map;
      var TaintRegistryByteLengths$1 = new Set;
      var TaintRegistryPendingRequests$1 = new Set;
      var enableScopeAPI = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableRefAsProp = true;
      var enableRenderableContext = true;
      var enableDebugTracing = false;
      var ReactSharedInternals = {
        H: null,
        C: null
      };
      {
        ReactSharedInternals.TaintRegistryObjects = TaintRegistryObjects$1;
        ReactSharedInternals.TaintRegistryValues = TaintRegistryValues$1;
        ReactSharedInternals.TaintRegistryByteLengths = TaintRegistryByteLengths$1;
        ReactSharedInternals.TaintRegistryPendingRequests = TaintRegistryPendingRequests$1;
      }
      {
        ReactSharedInternals.owner = null;
      }
      {
        var currentExtraStackFrame = null;
        ReactSharedInternals.setExtraStackFrame = function(stack) {
          currentExtraStackFrame = stack;
        };
        ReactSharedInternals.getCurrentStack = null;
        ReactSharedInternals.getStackAddendum = function() {
          var stack = "";
          if (currentExtraStackFrame) {
            stack += currentExtraStackFrame;
          }
          var impl = ReactSharedInternals.getCurrentStack;
          if (impl) {
            stack += impl() || "";
          }
          return stack;
        };
      }
      function warn(format) {
        {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;_key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
      }
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var stack = ReactSharedInternals.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var assign = Object.assign;
      function createFetchCache() {
        return new Map;
      }
      var simpleCacheKey = '["GET",[],null,"follow",null,null,null,null]';
      function generateCacheKey(request) {
        return JSON.stringify([request.method, Array.from(request.headers.entries()), request.mode, request.redirect, request.credentials, request.referrer, request.referrerPolicy, request.integrity]);
      }
      {
        if (typeof fetch === "function") {
          var originalFetch = fetch;
          var cachedFetch = function fetch(resource, options) {
            var dispatcher = ReactSharedInternals.C;
            if (!dispatcher) {
              return originalFetch(resource, options);
            }
            if (options && options.signal) {
              return originalFetch(resource, options);
            }
            var url;
            var cacheKey;
            if (typeof resource === "string" && !options) {
              cacheKey = simpleCacheKey;
              url = resource;
            } else {
              var request = typeof resource === "string" || resource instanceof URL ? new Request(resource, options) : resource;
              if (request.method !== "GET" && request.method !== "HEAD" || request.keepalive) {
                return originalFetch(resource, options);
              }
              cacheKey = generateCacheKey(request);
              url = request.url;
            }
            var cache2 = dispatcher.getCacheForType(createFetchCache);
            var cacheEntries = cache2.get(url);
            var match;
            if (cacheEntries === undefined) {
              match = originalFetch(resource, options);
              cache2.set(url, [cacheKey, match]);
            } else {
              for (var i = 0, l = cacheEntries.length;i < l; i += 2) {
                var key = cacheEntries[i];
                var value = cacheEntries[i + 1];
                if (key === cacheKey) {
                  match = value;
                  return match.then(function(response) {
                    return response.clone();
                  });
                }
              }
              match = originalFetch(resource, options);
              cacheEntries.push(cacheKey, match);
            }
            return match.then(function(response) {
              return response.clone();
            });
          };
          assign(cachedFetch, originalFetch);
          try {
            fetch = cachedFetch;
          } catch (error1) {
            try {
              globalThis.fetch = cachedFetch;
            } catch (error2) {
              warn("React was unable to patch the fetch() function in this environment. Suspensey APIs might not work correctly as a result.");
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var REACT_POSTPONE_TYPE = Symbol.for("react.postpone");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      var REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        if (typeof type === "function") {
          if (type.$$typeof === REACT_CLIENT_REFERENCE$2) {
            return null;
          }
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE: {
              return null;
            }
            case REACT_CONTEXT_TYPE:
              var context = type;
              {
                return getContextName(context) + ".Provider";
              }
            case REACT_CONSUMER_TYPE: {
              var consumer = type;
              return getContextName(consumer._context) + ".Consumer";
            }
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference");
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || !enableRenderableContext || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var prefix;
      function describeBuiltInComponentFrame(name) {
        {
          if (prefix === undefined) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap;
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== undefined) {
            return frame;
          }
        }
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = undefined;
        var previousDispatcher = null;
        {
          previousDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = null;
          disableLogs();
        }
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            var control;
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                var maybePromise = fn();
                if (maybePromise && typeof maybePromise.catch === "function") {
                  maybePromise.catch(function() {
                  });
                }
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                return [sample.stack, control.stack];
              }
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
        if (namePropDescriptor && namePropDescriptor.configurable) {
          Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot"
          });
        }
        try {
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n");
            var controlLines = controlStack.split("\n");
            var s = 0;
            var c = 0;
            while (s < sampleLines.length && !sampleLines[s].includes("DetermineComponentFrameRoot")) {
              s++;
            }
            while (c < controlLines.length && !controlLines[c].includes("DetermineComponentFrameRoot")) {
              c++;
            }
            if (s === sampleLines.length || c === controlLines.length) {
              s = sampleLines.length - 1;
              c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
            }
            for (;s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      if (true) {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactSharedInternals.H = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload));
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef;
      var didWarnAboutOldJSXRuntime;
      {
        didWarnAboutElementRef = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function elementRefGetterWithDeprecationWarning() {
        {
          var componentName = getComponentNameFromType(this.type);
          if (!didWarnAboutElementRef[componentName]) {
            didWarnAboutElementRef[componentName] = true;
            error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.");
          }
          var refProp = this.props.ref;
          return refProp !== undefined ? refProp : null;
        }
      }
      function ReactElement(type, key, _ref, self, source, owner, props) {
        var ref;
        {
          var refProp = props.ref;
          ref = refProp !== undefined ? refProp : null;
        }
        var element;
        {
          element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          if (ref !== null) {
            Object.defineProperty(element, "ref", {
              enumerable: false,
              get: elementRefGetterWithDeprecationWarning
            });
          } else {
            Object.defineProperty(element, "ref", {
              enumerable: false,
              value: null
            });
          }
        }
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      }
      function createElement(type, config, children) {
        {
          if (!isValidElementType(type)) {
            var info = "";
            if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          } else {
            for (var i = 2;i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
        }
        var propName;
        var props = {};
        var key = null;
        var ref = null;
        if (config != null) {
          {
            if (!didWarnAboutOldJSXRuntime && "__self" in config && !("key" in config)) {
              didWarnAboutOldJSXRuntime = true;
              warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html");
            }
          }
          if (hasValidRef(config))
            ;
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && propName !== "key" && enableRefAsProp && propName !== "__self" && propName !== "__source") {
              {
                props[propName] = config[propName];
              }
            }
          }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var _i = 0;_i < childrenLength; _i++) {
            childArray[_i] = arguments[_i + 2];
          }
          {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }
        {
          if (key || !enableRefAsProp) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
          }
        }
        var element = ReactElement(type, key, ref, undefined, undefined, ReactSharedInternals.owner, props);
        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        }
        return element;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(oldElement.type, newKey, null, undefined, undefined, oldElement._owner, oldElement.props);
      }
      function cloneElement(element, config, children) {
        if (element === null || element === undefined) {
          throw new Error("The argument must be a React element, but you passed " + element + ".");
        }
        var propName;
        var props = assign({}, element.props);
        var key = element.key;
        var ref = null;
        var owner = element._owner;
        if (config != null) {
          if (hasValidRef(config)) {
            owner = ReactSharedInternals.owner;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && propName !== "key" && enableRefAsProp && propName !== "__self" && propName !== "__source" && !(propName === "ref" && config.ref === undefined)) {
              {
                {
                  props[propName] = config[propName];
                }
              }
            }
          }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0;i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          props.children = childArray;
        }
        var clonedElement = ReactElement(element.type, key, ref, undefined, undefined, owner, props);
        for (var _i2 = 2;_i2 < arguments.length; _i2++) {
          validateChildKeys(arguments[_i2], clonedElement.type);
        }
        return clonedElement;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactSharedInternals.owner) {
            var name = getComponentNameFromType(ReactSharedInternals.owner.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object" || !node) {
            return;
          }
          if (node.$$typeof === REACT_CLIENT_REFERENCE)
            ;
          else if (isArray(node)) {
            for (var i = 0;i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function isValidElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var ownerHasKeyUseWarning = {};
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner != null && element._owner !== ReactSharedInternals.owner) {
            var ownerName = null;
            if (typeof element._owner.tag === "number") {
              ownerName = getComponentNameFromType(element._owner.type);
            } else if (typeof element._owner.name === "string") {
              ownerName = element._owner.name;
            }
            childOwner = " It was passed a child from " + ownerName + ".";
          }
          setCurrentlyValidatingElement(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement(null);
        }
      }
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var stack = describeUnknownElementTypeFrameInDEV(element.type);
            ReactSharedInternals.setExtraStackFrame(stack);
          } else {
            ReactSharedInternals.setExtraStackFrame(null);
          }
        }
      }
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = getComponentNameFromType(parentType);
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0;i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement(null);
              break;
            }
          }
        }
      }
      var SEPARATOR = ".";
      var SUBSEPARATOR = ":";
      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          "=": "=0",
          ":": "=2"
        };
        var escapedString = key.replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = false;
      var userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        if (typeof element === "object" && element !== null && element.key != null) {
          {
            checkKeyStringCoercion(element.key);
          }
          return escape("" + element.key);
        }
        return index.toString(36);
      }
      function noop$1() {
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled": {
            var fulfilledValue = thenable.value;
            return fulfilledValue;
          }
          case "rejected": {
            var rejectedError = thenable.reason;
            throw rejectedError;
          }
          default: {
            if (typeof thenable.status === "string") {
              thenable.then(noop$1, noop$1);
            } else {
              var pendingThenable = thenable;
              pendingThenable.status = "pending";
              pendingThenable.then(function(fulfilledValue2) {
                if (thenable.status === "pending") {
                  var fulfilledThenable2 = thenable;
                  fulfilledThenable2.status = "fulfilled";
                  fulfilledThenable2.value = fulfilledValue2;
                }
              }, function(error2) {
                if (thenable.status === "pending") {
                  var rejectedThenable2 = thenable;
                  rejectedThenable2.status = "rejected";
                  rejectedThenable2.reason = error2;
                }
              });
            }
            switch (thenable.status) {
              case "fulfilled": {
                var fulfilledThenable = thenable;
                return fulfilledThenable.value;
              }
              case "rejected": {
                var rejectedThenable = thenable;
                var _rejectedError = rejectedThenable.reason;
                throw _rejectedError;
              }
            }
          }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if (type === "undefined" || type === "boolean") {
          children = null;
        }
        var invokeCallback = false;
        if (children === null) {
          invokeCallback = true;
        } else {
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  var payload = children._payload;
                  var init = children._init;
                  return mapIntoArray(init(payload), array, escapedPrefix, nameSoFar, callback);
              }
          }
        }
        if (invokeCallback) {
          var _child = children;
          var mappedChild = callback(_child);
          var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (isArray(mappedChild)) {
            var escapedChildKey = "";
            if (childKey != null) {
              escapedChildKey = escapeUserProvidedKey(childKey) + "/";
            }
            mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else if (mappedChild != null) {
            if (isValidElement(mappedChild)) {
              {
                if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                  checkKeyStringCoercion(mappedChild.key);
                }
              }
              mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
            }
            array.push(mappedChild);
          }
          return 1;
        }
        var child;
        var nextName;
        var subtreeCount = 0;
        var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (isArray(children)) {
          for (var i = 0;i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getElementKey(child, i);
            subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          }
        } else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn === "function") {
            var iterableChildren = children;
            {
              if (iteratorFn === iterableChildren.entries) {
                if (!didWarnAboutMaps) {
                  warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
            var iterator = iteratorFn.call(iterableChildren);
            var step;
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getElementKey(child, ii++);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else if (type === "object") {
            if (typeof children.then === "function") {
              return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
            }
            var childrenString = String(children);
            throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }
        var result = [];
        var count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function countChildren(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement(children)) {
          throw new Error("React.Children.only expected to receive a single React element child.");
        }
        return children;
      }
      function createRef() {
        var refObject = {
          current: null
        };
        {
          Object.seal(refObject);
        }
        return refObject;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        {
          if (dispatcher === null) {
            error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
        }
        return dispatcher;
      }
      function getCacheForType(resourceType) {
        var dispatcher = ReactSharedInternals.C;
        if (!dispatcher) {
          return resourceType();
        }
        return dispatcher.getCacheForType(resourceType);
      }
      function useCallback(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      function useId() {
        var dispatcher = resolveDispatcher();
        return dispatcher.useId();
      }
      function use(usable) {
        var dispatcher = resolveDispatcher();
        return dispatcher.use(usable);
      }
      function useActionState(action, initialState, permalink) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useActionState(action, initialState, permalink);
        }
      }
      function forwardRef(render) {
        {
          if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
            error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
          } else if (typeof render !== "function") {
            error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
          } else {
            if (render.length !== 0 && render.length !== 2) {
              error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
            }
          }
          if (render != null) {
            if (render.defaultProps != null) {
              error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
            }
          }
        }
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              if (!render.name && !render.displayName) {
                render.displayName = name;
              }
            }
          });
        }
        return elementType;
      }
      var Uninitialized = -1;
      var Pending = 0;
      var Resolved = 1;
      var Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result;
          var thenable = ctor();
          thenable.then(function(moduleObject2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var resolved = payload;
              resolved._status = Resolved;
              resolved._result = moduleObject2;
            }
          }, function(error2) {
            if (payload._status === Pending || payload._status === Uninitialized) {
              var rejected = payload;
              rejected._status = Rejected;
              rejected._result = error2;
            }
          });
          if (payload._status === Uninitialized) {
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
          }
        }
        if (payload._status === Resolved) {
          var moduleObject = payload._result;
          {
            if (moduleObject === undefined) {
              error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
            }
          }
          {
            if (!("default" in moduleObject)) {
              error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
            }
          }
          return moduleObject.default;
        } else {
          throw payload._result;
        }
      }
      function lazy(ctor) {
        var payload = {
          _status: Uninitialized,
          _result: ctor
        };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        return lazyType;
      }
      function memo(type, compare) {
        {
          if (!isValidElementType(type)) {
            error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
          }
        }
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare === undefined ? null : compare
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              if (!type.name && !type.displayName) {
                type.displayName = name;
              }
            }
          });
        }
        return elementType;
      }
      var UNTERMINATED = 0;
      var TERMINATED = 1;
      var ERRORED = 2;
      function createCacheRoot() {
        return new WeakMap;
      }
      function createCacheNode() {
        return {
          s: UNTERMINATED,
          v: undefined,
          o: null,
          p: null
        };
      }
      function cache(fn) {
        return function() {
          var dispatcher = ReactSharedInternals.C;
          if (!dispatcher) {
            return fn.apply(null, arguments);
          }
          var fnMap = dispatcher.getCacheForType(createCacheRoot);
          var fnNode = fnMap.get(fn);
          var cacheNode;
          if (fnNode === undefined) {
            cacheNode = createCacheNode();
            fnMap.set(fn, cacheNode);
          } else {
            cacheNode = fnNode;
          }
          for (var i = 0, l = arguments.length;i < l; i++) {
            var arg = arguments[i];
            if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
              var objectCache = cacheNode.o;
              if (objectCache === null) {
                cacheNode.o = objectCache = new WeakMap;
              }
              var objectNode = objectCache.get(arg);
              if (objectNode === undefined) {
                cacheNode = createCacheNode();
                objectCache.set(arg, cacheNode);
              } else {
                cacheNode = objectNode;
              }
            } else {
              var primitiveCache = cacheNode.p;
              if (primitiveCache === null) {
                cacheNode.p = primitiveCache = new Map;
              }
              var primitiveNode = primitiveCache.get(arg);
              if (primitiveNode === undefined) {
                cacheNode = createCacheNode();
                primitiveCache.set(arg, cacheNode);
              } else {
                cacheNode = primitiveNode;
              }
            }
          }
          if (cacheNode.s === TERMINATED) {
            return cacheNode.v;
          }
          if (cacheNode.s === ERRORED) {
            throw cacheNode.v;
          }
          try {
            var result = fn.apply(null, arguments);
            var terminatedNode = cacheNode;
            terminatedNode.s = TERMINATED;
            terminatedNode.v = result;
            return result;
          } catch (error2) {
            var erroredNode = cacheNode;
            erroredNode.s = ERRORED;
            erroredNode.v = error2;
            throw error2;
          }
        };
      }
      var reportGlobalError = typeof reportError === "function" ? reportError : function(error2) {
        if (typeof window === "object" && typeof window.ErrorEvent === "function") {
          var message = typeof error2 === "object" && error2 !== null && typeof error2.message === "string" ? String(error2.message) : String(error2);
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message,
            error: error2
          });
          var shouldLog = window.dispatchEvent(event);
          if (!shouldLog) {
            return;
          }
        } else if (typeof process === "object" && typeof process.emit === "function") {
          process.emit("uncaughtException", error2);
          return;
        }
        console["error"](error2);
      };
      function startTransition(scope, options) {
        var prevTransition = ReactSharedInternals.T;
        var callbacks = new Set;
        var transition = {
          _callbacks: callbacks
        };
        ReactSharedInternals.T = transition;
        var currentTransition = ReactSharedInternals.T;
        {
          ReactSharedInternals.T._updatedFibers = new Set;
        }
        {
          try {
            var returnValue = scope();
            if (typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function") {
              callbacks.forEach(function(callback) {
                return callback(currentTransition, returnValue);
              });
              returnValue.then(noop, reportGlobalError);
            }
          } catch (error2) {
            reportGlobalError(error2);
          } finally {
            warnAboutTransitionSubscriptions(prevTransition, currentTransition);
            ReactSharedInternals.T = prevTransition;
          }
        }
      }
      function warnAboutTransitionSubscriptions(prevTransition, currentTransition) {
        {
          if (prevTransition === null && currentTransition._updatedFibers) {
            var updatedFibersCount = currentTransition._updatedFibers.size;
            currentTransition._updatedFibers.clear();
            if (updatedFibersCount > 10) {
              warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
            }
          }
        }
      }
      function noop() {
      }
      function postpone(reason) {
        var postponeInstance = new Error(reason);
        postponeInstance.$$typeof = REACT_POSTPONE_TYPE;
        throw postponeInstance;
      }
      var ReactVersion = "19.0.0-experimental-7909d8eab-20240416";
      var getPrototypeOf = Object.getPrototypeOf;
      function binaryToComparableString(view) {
        return String.fromCharCode.apply(String, new Uint8Array(view.buffer, view.byteOffset, view.byteLength));
      }
      var { TaintRegistryObjects, TaintRegistryValues, TaintRegistryByteLengths, TaintRegistryPendingRequests } = ReactSharedInternals;
      var TypedArrayConstructor = getPrototypeOf(Uint32Array.prototype).constructor;
      var defaultMessage = "A tainted value was attempted to be serialized to a Client Component or Action closure. This would leak it to the client.";
      function cleanup(entryValue) {
        var entry = TaintRegistryValues.get(entryValue);
        if (entry !== undefined) {
          TaintRegistryPendingRequests.forEach(function(requestQueue) {
            requestQueue.push(entryValue);
            entry.count++;
          });
          if (entry.count === 1) {
            TaintRegistryValues.delete(entryValue);
          } else {
            entry.count--;
          }
        }
      }
      var finalizationRegistry = typeof FinalizationRegistry === "function" ? new FinalizationRegistry(cleanup) : null;
      function taintUniqueValue(message, lifetime, value) {
        message = "" + (message || defaultMessage);
        if (lifetime === null || typeof lifetime !== "object" && typeof lifetime !== "function") {
          throw new Error("To taint a value, a lifetime must be defined by passing an object that holds the value.");
        }
        var entryValue;
        if (typeof value === "string" || typeof value === "bigint") {
          entryValue = value;
        } else if (value instanceof TypedArrayConstructor || value instanceof DataView) {
          TaintRegistryByteLengths.add(value.byteLength);
          entryValue = binaryToComparableString(value);
        } else {
          var kind = value === null ? "null" : typeof value;
          if (kind === "object" || kind === "function") {
            throw new Error("taintUniqueValue cannot taint objects or functions. Try taintObjectReference instead.");
          }
          throw new Error("Cannot taint a " + kind + " because the value is too general and not unique enough to block globally.");
        }
        var existingEntry = TaintRegistryValues.get(entryValue);
        if (existingEntry === undefined) {
          TaintRegistryValues.set(entryValue, {
            message,
            count: 1
          });
        } else {
          existingEntry.count++;
        }
        if (finalizationRegistry !== null) {
          finalizationRegistry.register(lifetime, entryValue);
        }
      }
      function taintObjectReference(message, object) {
        message = "" + (message || defaultMessage);
        if (typeof object === "string" || typeof object === "bigint") {
          throw new Error("Only objects or functions can be passed to taintObjectReference. Try taintUniqueValue instead.");
        }
        if (object === null || typeof object !== "object" && typeof object !== "function") {
          throw new Error("Only objects or functions can be passed to taintObjectReference.");
        }
        TaintRegistryObjects.set(object, message);
      }
      var Children = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray,
        only: onlyChild
      };
      exports.Children = Children;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.cache = cache;
      exports.cloneElement = cloneElement;
      exports.createElement = createElement;
      exports.createRef = createRef;
      exports.experimental_taintObjectReference = taintObjectReference;
      exports.experimental_taintUniqueValue = taintUniqueValue;
      exports.forwardRef = forwardRef;
      exports.isValidElement = isValidElement;
      exports.lazy = lazy;
      exports.memo = memo;
      exports.startTransition = startTransition;
      exports.unstable_DebugTracingMode = REACT_DEBUG_TRACING_MODE_TYPE;
      exports.unstable_SuspenseList = REACT_SUSPENSE_TYPE;
      exports.unstable_getCacheForType = getCacheForType;
      exports.unstable_postpone = postpone;
      exports.use = use;
      exports.useActionState = useActionState;
      exports.useCallback = useCallback;
      exports.useDebugValue = useDebugValue;
      exports.useId = useId;
      exports.useMemo = useMemo;
      exports.version = ReactVersion;
    })();
  }
});

// node_modules/react/react.react-server.js
var require_react_react_server = __commonJS((exports, module) => {
  if (false) {
  } else {
    module.exports = require_react_react_server_development();
  }
});

// node_modules/react-dom/cjs/react-dom.react-server.development.js
var require_react_dom_react_server_development = __commonJS((exports) => {
  var React = __toESM(require_react_react_server(), 1);
  if (true) {
    (function() {
      var ReactSharedInternalsServer = React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      if (!ReactSharedInternalsServer) {
        throw new Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      }
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var stack = ReactSharedInternalsServer.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var NoLane = 0;
      var NoEventPriority = NoLane;
      function noop() {
      }
      function requestFormReset(element) {
        throw new Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
      }
      var DefaultDispatcher = {
        f: noop,
        r: requestFormReset,
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      };
      var Internals = {
        d: DefaultDispatcher,
        p: NoEventPriority,
        findDOMNode: null,
        usingClientEntryPoint: false
      };
      function getCrossOriginString(input) {
        if (typeof input === "string") {
          return input === "use-credentials" ? input : "";
        }
        return;
      }
      function getCrossOriginStringAs(as, input) {
        if (as === "font") {
          return "";
        }
        if (typeof input === "string") {
          return input === "use-credentials" ? input : "";
        }
        return;
      }
      function prefetchDNS(href) {
        {
          if (typeof href !== "string" || !href) {
            error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
          } else if (arguments.length > 1) {
            var options = arguments[1];
            if (typeof options === "object" && options.hasOwnProperty("crossOrigin")) {
              error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
            } else {
              error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
            }
          }
        }
        if (typeof href === "string") {
          Internals.d.D(href);
        }
      }
      function preconnect(href, options) {
        {
          if (typeof href !== "string" || !href) {
            error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
          } else if (options != null && typeof options !== "object") {
            error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options));
          } else if (options != null && typeof options.crossOrigin !== "string") {
            error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin));
          }
        }
        if (typeof href === "string") {
          var crossOrigin = options ? getCrossOriginString(options.crossOrigin) : null;
          Internals.d.C(href, crossOrigin);
        }
      }
      function preload(href, options) {
        {
          var encountered = "";
          if (typeof href !== "string" || !href) {
            encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".";
          }
          if (options == null || typeof options !== "object") {
            encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + ".";
          } else if (typeof options.as !== "string" || !options.as) {
            encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".";
          }
          if (encountered) {
            error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s', encountered);
          }
        }
        if (typeof href === "string" && typeof options === "object" && options !== null && typeof options.as === "string") {
          var as = options.as;
          var crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          Internals.d.L(href, as, {
            crossOrigin,
            integrity: typeof options.integrity === "string" ? options.integrity : undefined,
            nonce: typeof options.nonce === "string" ? options.nonce : undefined,
            type: typeof options.type === "string" ? options.type : undefined,
            fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined,
            referrerPolicy: typeof options.referrerPolicy === "string" ? options.referrerPolicy : undefined,
            imageSrcSet: typeof options.imageSrcSet === "string" ? options.imageSrcSet : undefined,
            imageSizes: typeof options.imageSizes === "string" ? options.imageSizes : undefined,
            media: typeof options.media === "string" ? options.media : undefined
          });
        }
      }
      function preloadModule(href, options) {
        {
          var encountered = "";
          if (typeof href !== "string" || !href) {
            encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".";
          }
          if (options !== undefined && typeof options !== "object") {
            encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + ".";
          } else if (options && "as" in options && typeof options.as !== "string") {
            encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".";
          }
          if (encountered) {
            error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s', encountered);
          }
        }
        if (typeof href === "string") {
          if (options) {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.m(href, {
              as: typeof options.as === "string" && options.as !== "script" ? options.as : undefined,
              crossOrigin,
              integrity: typeof options.integrity === "string" ? options.integrity : undefined
            });
          } else {
            Internals.d.m(href);
          }
        }
      }
      function preinit(href, options) {
        {
          if (typeof href !== "string" || !href) {
            error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
          } else if (options == null || typeof options !== "object") {
            error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options));
          } else if (options.as !== "style" && options.as !== "script") {
            error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".', getValueDescriptorExpectingEnumForWarning(options.as));
          }
        }
        if (typeof href === "string" && options && typeof options.as === "string") {
          var as = options.as;
          var crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          var integrity = typeof options.integrity === "string" ? options.integrity : undefined;
          var fetchPriority = typeof options.fetchPriority === "string" ? options.fetchPriority : undefined;
          if (as === "style") {
            Internals.d.S(href, typeof options.precedence === "string" ? options.precedence : undefined, {
              crossOrigin,
              integrity,
              fetchPriority
            });
          } else if (as === "script") {
            Internals.d.X(href, {
              crossOrigin,
              integrity,
              fetchPriority,
              nonce: typeof options.nonce === "string" ? options.nonce : undefined
            });
          }
        }
      }
      function preinitModule(href, options) {
        {
          var encountered = "";
          if (typeof href !== "string" || !href) {
            encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".";
          }
          if (options !== undefined && typeof options !== "object") {
            encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + ".";
          } else if (options && "as" in options && options.as !== "script") {
            encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".";
          }
          if (encountered) {
            error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
          } else {
            var as = options && typeof options.as === "string" ? options.as : "script";
            switch (as) {
              case "script": {
                break;
              }
              default: {
                var typeOfAs = getValueDescriptorExpectingEnumForWarning(as);
                error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)', typeOfAs, href);
              }
            }
          }
        }
        if (typeof href === "string") {
          if (typeof options === "object" && options !== null) {
            if (options.as == null || options.as === "script") {
              var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
              Internals.d.M(href, {
                crossOrigin,
                integrity: typeof options.integrity === "string" ? options.integrity : undefined,
                nonce: typeof options.nonce === "string" ? options.nonce : undefined
              });
            }
          } else if (options == null) {
            Internals.d.M(href);
          }
        }
      }
      function getValueDescriptorExpectingObjectForWarning(thing) {
        return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : "something with type \"" + typeof thing + "\"";
      }
      function getValueDescriptorExpectingEnumForWarning(thing) {
        return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : typeof thing === "string" ? JSON.stringify(thing) : typeof thing === "number" ? "`" + thing + "`" : "something with type \"" + typeof thing + "\"";
      }
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.preconnect = preconnect;
      exports.prefetchDNS = prefetchDNS;
      exports.preinit = preinit;
      exports.preinitModule = preinitModule;
      exports.preload = preload;
      exports.preloadModule = preloadModule;
    })();
  }
});

// node_modules/react-dom/react-dom.react-server.js
var require_react_dom_react_server = __commonJS((exports, module) => {
  if (false) {
  } else {
    module.exports = require_react_dom_react_server_development();
  }
});

// node_modules/react-server-dom-esm/cjs/react-server-dom-esm-server.node.development.js
var require_react_server_dom_esm_server_node_development = __commonJS((exports) => {
  var React = __toESM(require_react_react_server(), 1);
  var ReactDOM = __toESM(require_react_dom_react_server(), 1);
  if (true) {
    (function() {
      var util = import.meta.require("util");
      import.meta.require("crypto");
      var async_hooks = import.meta.require("async_hooks");
      var ReactSharedInternalsServer = React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      if (!ReactSharedInternalsServer) {
        throw new Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      }
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var stack = ReactSharedInternalsServer.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enablePostpone = true;
      function scheduleWork(callback) {
        setImmediate(callback);
      }
      function flushBuffered(destination) {
        if (typeof destination.flush === "function") {
          destination.flush();
        }
      }
      var VIEW_SIZE = 2048;
      var currentView = null;
      var writtenBytes = 0;
      var destinationHasCapacity = true;
      function beginWriting(destination) {
        currentView = new Uint8Array(VIEW_SIZE);
        writtenBytes = 0;
        destinationHasCapacity = true;
      }
      function writeStringChunk(destination, stringChunk) {
        if (stringChunk.length === 0) {
          return;
        }
        if (stringChunk.length * 3 > VIEW_SIZE) {
          if (writtenBytes > 0) {
            writeToDestination(destination, currentView.subarray(0, writtenBytes));
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
          writeToDestination(destination, textEncoder.encode(stringChunk));
          return;
        }
        var target = currentView;
        if (writtenBytes > 0) {
          target = currentView.subarray(writtenBytes);
        }
        var _textEncoder$encodeIn = textEncoder.encodeInto(stringChunk, target), read = _textEncoder$encodeIn.read, written = _textEncoder$encodeIn.written;
        writtenBytes += written;
        if (read < stringChunk.length) {
          writeToDestination(destination, currentView.subarray(0, writtenBytes));
          currentView = new Uint8Array(VIEW_SIZE);
          writtenBytes = textEncoder.encodeInto(stringChunk.slice(read), currentView).written;
        }
        if (writtenBytes === VIEW_SIZE) {
          writeToDestination(destination, currentView);
          currentView = new Uint8Array(VIEW_SIZE);
          writtenBytes = 0;
        }
      }
      function writeViewChunk(destination, chunk) {
        if (chunk.byteLength === 0) {
          return;
        }
        if (chunk.byteLength > VIEW_SIZE) {
          if (writtenBytes > 0) {
            writeToDestination(destination, currentView.subarray(0, writtenBytes));
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
          writeToDestination(destination, chunk);
          return;
        }
        var bytesToWrite = chunk;
        var allowableBytes = currentView.length - writtenBytes;
        if (allowableBytes < bytesToWrite.byteLength) {
          if (allowableBytes === 0) {
            writeToDestination(destination, currentView);
          } else {
            currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes);
            writtenBytes += allowableBytes;
            writeToDestination(destination, currentView);
            bytesToWrite = bytesToWrite.subarray(allowableBytes);
          }
          currentView = new Uint8Array(VIEW_SIZE);
          writtenBytes = 0;
        }
        currentView.set(bytesToWrite, writtenBytes);
        writtenBytes += bytesToWrite.byteLength;
        if (writtenBytes === VIEW_SIZE) {
          writeToDestination(destination, currentView);
          currentView = new Uint8Array(VIEW_SIZE);
          writtenBytes = 0;
        }
      }
      function writeChunk(destination, chunk) {
        if (typeof chunk === "string") {
          writeStringChunk(destination, chunk);
        } else {
          writeViewChunk(destination, chunk);
        }
      }
      function writeToDestination(destination, view) {
        var currentHasCapacity = destination.write(view);
        destinationHasCapacity = destinationHasCapacity && currentHasCapacity;
      }
      function writeChunkAndReturn(destination, chunk) {
        writeChunk(destination, chunk);
        return destinationHasCapacity;
      }
      function completeWriting(destination) {
        if (currentView && writtenBytes > 0) {
          destination.write(currentView.subarray(0, writtenBytes));
        }
        currentView = null;
        writtenBytes = 0;
        destinationHasCapacity = true;
      }
      function close$1(destination) {
        destination.end();
      }
      var textEncoder = new util.TextEncoder;
      function stringToChunk(content) {
        return content;
      }
      function typedArrayToBinaryChunk(content) {
        return new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
      }
      function byteLengthOfChunk(chunk) {
        return typeof chunk === "string" ? Buffer.byteLength(chunk, "utf8") : chunk.byteLength;
      }
      function byteLengthOfBinaryChunk(chunk) {
        return chunk.byteLength;
      }
      function closeWithError(destination, error2) {
        destination.destroy(error2);
      }
      var CLIENT_REFERENCE_TAG$1 = Symbol.for("react.client.reference");
      var SERVER_REFERENCE_TAG = Symbol.for("react.server.reference");
      function isClientReference(reference) {
        return reference.$$typeof === CLIENT_REFERENCE_TAG$1;
      }
      function isServerReference(reference) {
        return reference.$$typeof === SERVER_REFERENCE_TAG;
      }
      function registerClientReference(proxyImplementation, id, exportName) {
        return Object.defineProperties(proxyImplementation, {
          $$typeof: {
            value: CLIENT_REFERENCE_TAG$1
          },
          $$id: {
            value: id + "#" + exportName
          }
        });
      }
      var FunctionBind = Function.prototype.bind;
      var ArraySlice = Array.prototype.slice;
      function bind() {
        var newFn = FunctionBind.apply(this, arguments);
        if (this.$$typeof === SERVER_REFERENCE_TAG) {
          var args = ArraySlice.call(arguments, 1);
          return Object.defineProperties(newFn, {
            $$typeof: {
              value: SERVER_REFERENCE_TAG
            },
            $$id: {
              value: this.$$id
            },
            $$bound: {
              value: this.$$bound ? this.$$bound.concat(args) : args
            },
            bind: {
              value: bind
            }
          });
        }
        return newFn;
      }
      function registerServerReference(reference, id, exportName) {
        return Object.defineProperties(reference, {
          $$typeof: {
            value: SERVER_REFERENCE_TAG
          },
          $$id: {
            value: id + "#" + exportName,
            configurable: true
          },
          $$bound: {
            value: null,
            configurable: true
          },
          bind: {
            value: bind,
            configurable: true
          }
        });
      }
      function getClientReferenceKey(reference) {
        return reference.$$id;
      }
      function resolveClientReferenceMetadata(config, clientReference) {
        var baseURL = config;
        var id = clientReference.$$id;
        var idx = id.lastIndexOf("#");
        var exportName = id.slice(idx + 1);
        var fullURL = id.slice(0, idx);
        if (!fullURL.startsWith(baseURL)) {
          throw new Error("Attempted to load a Client Module outside the hosted root.");
        }
        var modulePath = fullURL.slice(baseURL.length);
        return [modulePath, exportName];
      }
      function getServerReferenceId(config, serverReference) {
        return serverReference.$$id;
      }
      function getServerReferenceBoundArguments(config, serverReference) {
        return serverReference.$$bound;
      }
      var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var previousDispatcher = ReactDOMSharedInternals.d;
      ReactDOMSharedInternals.d = {
        f: previousDispatcher.f,
        r: previousDispatcher.r,
        D: prefetchDNS,
        C: preconnect,
        L: preload,
        m: preloadModule$1,
        X: preinitScript,
        S: preinitStyle,
        M: preinitModuleScript
      };
      function prefetchDNS(href) {
        if (typeof href === "string" && href) {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "D|" + href;
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            emitHint(request, "D", href);
          } else {
            previousDispatcher.D(href);
          }
        }
      }
      function preconnect(href, crossOrigin) {
        if (typeof href === "string") {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "C|" + (crossOrigin == null ? "null" : crossOrigin) + "|" + href;
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            if (typeof crossOrigin === "string") {
              emitHint(request, "C", [href, crossOrigin]);
            } else {
              emitHint(request, "C", href);
            }
          } else {
            previousDispatcher.C(href, crossOrigin);
          }
        }
      }
      function preload(href, as, options) {
        if (typeof href === "string") {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "L";
            if (as === "image" && options) {
              key += getImagePreloadKey(href, options.imageSrcSet, options.imageSizes);
            } else {
              key += "[" + as + "]" + href;
            }
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            var trimmed = trimOptions(options);
            if (trimmed) {
              emitHint(request, "L", [href, as, trimmed]);
            } else {
              emitHint(request, "L", [href, as]);
            }
          } else {
            previousDispatcher.L(href, as, options);
          }
        }
      }
      function preloadModule$1(href, options) {
        if (typeof href === "string") {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "m|" + href;
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            var trimmed = trimOptions(options);
            if (trimmed) {
              return emitHint(request, "m", [href, trimmed]);
            } else {
              return emitHint(request, "m", href);
            }
          } else {
            previousDispatcher.m(href, options);
          }
        }
      }
      function preinitStyle(href, precedence, options) {
        if (typeof href === "string") {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "S|" + href;
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            var trimmed = trimOptions(options);
            if (trimmed) {
              return emitHint(request, "S", [href, typeof precedence === "string" ? precedence : 0, trimmed]);
            } else if (typeof precedence === "string") {
              return emitHint(request, "S", [href, precedence]);
            } else {
              return emitHint(request, "S", href);
            }
          } else {
            previousDispatcher.S(href, precedence, options);
          }
        }
      }
      function preinitScript(src, options) {
        if (typeof src === "string") {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "X|" + src;
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            var trimmed = trimOptions(options);
            if (trimmed) {
              return emitHint(request, "X", [src, trimmed]);
            } else {
              return emitHint(request, "X", src);
            }
          } else {
            previousDispatcher.X(src, options);
          }
        }
      }
      function preinitModuleScript(src, options) {
        if (typeof src === "string") {
          var request = resolveRequest();
          if (request) {
            var hints = getHints(request);
            var key = "M|" + src;
            if (hints.has(key)) {
              return;
            }
            hints.add(key);
            var trimmed = trimOptions(options);
            if (trimmed) {
              return emitHint(request, "M", [src, trimmed]);
            } else {
              return emitHint(request, "M", src);
            }
          } else {
            previousDispatcher.M(src, options);
          }
        }
      }
      function trimOptions(options) {
        if (options == null)
          return null;
        var hasProperties = false;
        var trimmed = {};
        for (var key in options) {
          if (options[key] != null) {
            hasProperties = true;
            trimmed[key] = options[key];
          }
        }
        return hasProperties ? trimmed : null;
      }
      function getImagePreloadKey(href, imageSrcSet, imageSizes) {
        var uniquePart = "";
        if (typeof imageSrcSet === "string" && imageSrcSet !== "") {
          uniquePart += "[" + imageSrcSet + "]";
          if (typeof imageSizes === "string") {
            uniquePart += "[" + imageSizes + "]";
          }
        } else {
          uniquePart += "[][]" + href;
        }
        return "[image]" + uniquePart;
      }
      function createHints() {
        return new Set;
      }
      function initAsyncDebugInfo() {
        {
          async_hooks.createHook({
            init: function(asyncId, type, triggerAsyncId) {
            },
            promiseResolve: function(asyncId) {
              async_hooks.executionAsyncId();
            },
            destroy: function(asyncId) {
            }
          }).enable();
        }
      }
      var supportsRequestStorage = true;
      var requestStorage = new async_hooks.AsyncLocalStorage;
      var TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference");
      function isTemporaryReference(reference) {
        return reference.$$typeof === TEMPORARY_REFERENCE_TAG;
      }
      function resolveTemporaryReferenceID(temporaryReference) {
        return temporaryReference.$$id;
      }
      var proxyHandlers = {
        get: function(target, name, receiver) {
          switch (name) {
            case "$$typeof":
              return target.$$typeof;
            case "$$id":
              return target.$$id;
            case "$$async":
              return target.$$async;
            case "name":
              return;
            case "displayName":
              return;
            case "defaultProps":
              return;
            case "toJSON":
              return;
            case Symbol.toPrimitive:
              return Object.prototype[Symbol.toPrimitive];
            case Symbol.toStringTag:
              return Object.prototype[Symbol.toStringTag];
            case "Provider":
              throw new Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          }
          throw new Error("Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
        },
        set: function() {
          throw new Error("Cannot assign to a temporary client reference from a server module.");
        }
      };
      function createTemporaryReference(id) {
        var reference = Object.defineProperties(function() {
          throw new Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, {
          $$typeof: {
            value: TEMPORARY_REFERENCE_TAG
          },
          $$id: {
            value: id
          }
        });
        return new Proxy(reference, proxyHandlers);
      }
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
      var REACT_POSTPONE_TYPE = Symbol.for("react.postpone");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var SuspenseException = new Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`");
      function createThenableState() {
        return [];
      }
      function noop() {
      }
      function trackUsedThenable(thenableState2, thenable, index) {
        var previous = thenableState2[index];
        if (previous === undefined) {
          thenableState2.push(thenable);
        } else {
          if (previous !== thenable) {
            thenable.then(noop, noop);
            thenable = previous;
          }
        }
        switch (thenable.status) {
          case "fulfilled": {
            var fulfilledValue = thenable.value;
            return fulfilledValue;
          }
          case "rejected": {
            var rejectedError = thenable.reason;
            throw rejectedError;
          }
          default: {
            if (typeof thenable.status === "string") {
              thenable.then(noop, noop);
            } else {
              var pendingThenable = thenable;
              pendingThenable.status = "pending";
              pendingThenable.then(function(fulfilledValue2) {
                if (thenable.status === "pending") {
                  var fulfilledThenable2 = thenable;
                  fulfilledThenable2.status = "fulfilled";
                  fulfilledThenable2.value = fulfilledValue2;
                }
              }, function(error2) {
                if (thenable.status === "pending") {
                  var rejectedThenable2 = thenable;
                  rejectedThenable2.status = "rejected";
                  rejectedThenable2.reason = error2;
                }
              });
            }
            switch (thenable.status) {
              case "fulfilled": {
                var fulfilledThenable = thenable;
                return fulfilledThenable.value;
              }
              case "rejected": {
                var rejectedThenable = thenable;
                throw rejectedThenable.reason;
              }
            }
            suspendedThenable = thenable;
            throw SuspenseException;
          }
        }
      }
      var suspendedThenable = null;
      function getSuspendedThenable() {
        if (suspendedThenable === null) {
          throw new Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
        }
        var thenable = suspendedThenable;
        suspendedThenable = null;
        return thenable;
      }
      var currentRequest$1 = null;
      var thenableIndexCounter = 0;
      var thenableState = null;
      var currentComponentDebugInfo = null;
      function prepareToUseHooksForRequest(request) {
        currentRequest$1 = request;
      }
      function resetHooksForRequest() {
        currentRequest$1 = null;
      }
      function prepareToUseHooksForComponent(prevThenableState, componentDebugInfo) {
        thenableIndexCounter = 0;
        thenableState = prevThenableState;
        {
          currentComponentDebugInfo = componentDebugInfo;
        }
      }
      function getThenableStateAfterSuspending() {
        var state = thenableState || createThenableState();
        {
          state._componentDebugInfo = currentComponentDebugInfo;
          currentComponentDebugInfo = null;
        }
        thenableState = null;
        return state;
      }
      var HooksDispatcher = {
        useMemo: function(nextCreate) {
          return nextCreate();
        },
        useCallback: function(callback) {
          return callback;
        },
        useDebugValue: function() {
        },
        useDeferredValue: unsupportedHook,
        useTransition: unsupportedHook,
        readContext: unsupportedContext,
        useContext: unsupportedContext,
        useReducer: unsupportedHook,
        useRef: unsupportedHook,
        useState: unsupportedHook,
        useInsertionEffect: unsupportedHook,
        useLayoutEffect: unsupportedHook,
        useImperativeHandle: unsupportedHook,
        useEffect: unsupportedHook,
        useId,
        useSyncExternalStore: unsupportedHook,
        useCacheRefresh: function() {
          return unsupportedRefresh;
        },
        useMemoCache: function(size) {
          var data = new Array(size);
          for (var i = 0;i < size; i++) {
            data[i] = REACT_MEMO_CACHE_SENTINEL;
          }
          return data;
        },
        use
      };
      function unsupportedHook() {
        throw new Error("This Hook is not supported in Server Components.");
      }
      function unsupportedRefresh() {
        throw new Error("Refreshing the cache is not supported in Server Components.");
      }
      function unsupportedContext() {
        throw new Error("Cannot read a Client Context from a Server Component.");
      }
      function useId() {
        if (currentRequest$1 === null) {
          throw new Error("useId can only be used while React is rendering");
        }
        var id = currentRequest$1.identifierCount++;
        return ":" + currentRequest$1.identifierPrefix + "S" + id.toString(32) + ":";
      }
      function use(usable) {
        if (usable !== null && typeof usable === "object" || typeof usable === "function") {
          if (typeof usable.then === "function") {
            var thenable = usable;
            var index = thenableIndexCounter;
            thenableIndexCounter += 1;
            if (thenableState === null) {
              thenableState = createThenableState();
            }
            return trackUsedThenable(thenableState, thenable, index);
          } else if (usable.$$typeof === REACT_CONTEXT_TYPE) {
            unsupportedContext();
          }
        }
        if (isClientReference(usable)) {
          if (usable.value != null && usable.value.$$typeof === REACT_CONTEXT_TYPE) {
            throw new Error("Cannot read a Client Context from a Server Component.");
          } else {
            throw new Error("Cannot use() an already resolved Client Reference.");
          }
        } else {
          throw new Error("An unsupported type was passed to use(): " + String(usable));
        }
      }
      function resolveCache() {
        var request = resolveRequest();
        if (request) {
          return getCache(request);
        }
        return new Map;
      }
      var DefaultCacheDispatcher = {
        getCacheForType: function(resourceType) {
          var cache = resolveCache();
          var entry = cache.get(resourceType);
          if (entry === undefined) {
            entry = resourceType();
            cache.set(resourceType, entry);
          }
          return entry;
        }
      };
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var getPrototypeOf = Object.getPrototypeOf;
      var jsxPropsParents = new WeakMap;
      var jsxChildrenParents = new WeakMap;
      function isObjectPrototype(object) {
        if (!object) {
          return false;
        }
        var ObjectPrototype2 = Object.prototype;
        if (object === ObjectPrototype2) {
          return true;
        }
        if (getPrototypeOf(object)) {
          return false;
        }
        var names = Object.getOwnPropertyNames(object);
        for (var i = 0;i < names.length; i++) {
          if (!(names[i] in ObjectPrototype2)) {
            return false;
          }
        }
        return true;
      }
      function isSimpleObject(object) {
        if (!isObjectPrototype(getPrototypeOf(object))) {
          return false;
        }
        var names = Object.getOwnPropertyNames(object);
        for (var i = 0;i < names.length; i++) {
          var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
          if (!descriptor) {
            return false;
          }
          if (!descriptor.enumerable) {
            if ((names[i] === "key" || names[i] === "ref") && typeof descriptor.get === "function") {
              continue;
            }
            return false;
          }
        }
        return true;
      }
      function objectName(object) {
        var name = Object.prototype.toString.call(object);
        return name.replace(/^\[object (.*)\]$/, function(m, p0) {
          return p0;
        });
      }
      function describeKeyForErrorMessage(key) {
        var encodedKey = JSON.stringify(key);
        return '"' + key + '"' === encodedKey ? key : encodedKey;
      }
      function describeValueForErrorMessage(value) {
        switch (typeof value) {
          case "string": {
            return JSON.stringify(value.length <= 10 ? value : value.slice(0, 10) + "...");
          }
          case "object": {
            if (isArray(value)) {
              return "[...]";
            }
            if (value !== null && value.$$typeof === CLIENT_REFERENCE_TAG) {
              return describeClientReference();
            }
            var name = objectName(value);
            if (name === "Object") {
              return "{...}";
            }
            return name;
          }
          case "function": {
            if (value.$$typeof === CLIENT_REFERENCE_TAG) {
              return describeClientReference();
            }
            var _name = value.displayName || value.name;
            return _name ? "function " + _name : "function";
          }
          default:
            return String(value);
        }
      }
      function describeElementType(type) {
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeElementType(type.render);
            case REACT_MEMO_TYPE:
              return describeElementType(type.type);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeElementType(init(payload));
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference");
      function describeClientReference(ref) {
        return "client";
      }
      function describeObjectForErrorMessage(objectOrArray, expandedName) {
        var objKind = objectName(objectOrArray);
        if (objKind !== "Object" && objKind !== "Array") {
          return objKind;
        }
        var str = "";
        var start = -1;
        var length = 0;
        if (isArray(objectOrArray)) {
          if (jsxChildrenParents.has(objectOrArray)) {
            var type = jsxChildrenParents.get(objectOrArray);
            str = "<" + describeElementType(type) + ">";
            var array = objectOrArray;
            for (var i = 0;i < array.length; i++) {
              var value = array[i];
              var substr = undefined;
              if (typeof value === "string") {
                substr = value;
              } else if (typeof value === "object" && value !== null) {
                substr = "{" + describeObjectForErrorMessage(value) + "}";
              } else {
                substr = "{" + describeValueForErrorMessage(value) + "}";
              }
              if ("" + i === expandedName) {
                start = str.length;
                length = substr.length;
                str += substr;
              } else if (substr.length < 15 && str.length + substr.length < 40) {
                str += substr;
              } else {
                str += "{...}";
              }
            }
            str += "</" + describeElementType(type) + ">";
          } else {
            str = "[";
            var _array = objectOrArray;
            for (var _i = 0;_i < _array.length; _i++) {
              if (_i > 0) {
                str += ", ";
              }
              var _value = _array[_i];
              var _substr = undefined;
              if (typeof _value === "object" && _value !== null) {
                _substr = describeObjectForErrorMessage(_value);
              } else {
                _substr = describeValueForErrorMessage(_value);
              }
              if ("" + _i === expandedName) {
                start = str.length;
                length = _substr.length;
                str += _substr;
              } else if (_substr.length < 10 && str.length + _substr.length < 40) {
                str += _substr;
              } else {
                str += "...";
              }
            }
            str += "]";
          }
        } else {
          if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE) {
            str = "<" + describeElementType(objectOrArray.type) + "/>";
          } else if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) {
            return describeClientReference();
          } else if (jsxPropsParents.has(objectOrArray)) {
            var _type = jsxPropsParents.get(objectOrArray);
            str = "<" + (describeElementType(_type) || "...");
            var object = objectOrArray;
            var names = Object.keys(object);
            for (var _i2 = 0;_i2 < names.length; _i2++) {
              str += " ";
              var name = names[_i2];
              str += describeKeyForErrorMessage(name) + "=";
              var _value2 = object[name];
              var _substr2 = undefined;
              if (name === expandedName && typeof _value2 === "object" && _value2 !== null) {
                _substr2 = describeObjectForErrorMessage(_value2);
              } else {
                _substr2 = describeValueForErrorMessage(_value2);
              }
              if (typeof _value2 !== "string") {
                _substr2 = "{" + _substr2 + "}";
              }
              if (name === expandedName) {
                start = str.length;
                length = _substr2.length;
                str += _substr2;
              } else if (_substr2.length < 10 && str.length + _substr2.length < 40) {
                str += _substr2;
              } else {
                str += "...";
              }
            }
            str += ">";
          } else {
            str = "{";
            var _object = objectOrArray;
            var _names = Object.keys(_object);
            for (var _i3 = 0;_i3 < _names.length; _i3++) {
              if (_i3 > 0) {
                str += ", ";
              }
              var _name2 = _names[_i3];
              str += describeKeyForErrorMessage(_name2) + ": ";
              var _value3 = _object[_name2];
              var _substr3 = undefined;
              if (typeof _value3 === "object" && _value3 !== null) {
                _substr3 = describeObjectForErrorMessage(_value3);
              } else {
                _substr3 = describeValueForErrorMessage(_value3);
              }
              if (_name2 === expandedName) {
                start = str.length;
                length = _substr3.length;
                str += _substr3;
              } else if (_substr3.length < 10 && str.length + _substr3.length < 40) {
                str += _substr3;
              } else {
                str += "...";
              }
            }
            str += "}";
          }
        }
        if (expandedName === undefined) {
          return str;
        }
        if (start > -1 && length > 0) {
          var highlight = " ".repeat(start) + "^".repeat(length);
          return "\n  " + str + "\n  " + highlight;
        }
        return "\n  " + str;
      }
      function binaryToComparableString(view) {
        return String.fromCharCode.apply(String, new Uint8Array(view.buffer, view.byteOffset, view.byteLength));
      }
      var ReactSharedInternals = ReactSharedInternalsServer;
      initAsyncDebugInfo();
      function patchConsole(consoleInst, methodName) {
        var descriptor = Object.getOwnPropertyDescriptor(consoleInst, methodName);
        if (descriptor && (descriptor.configurable || descriptor.writable) && typeof descriptor.value === "function") {
          var originalMethod = descriptor.value;
          var originalName = Object.getOwnPropertyDescriptor(originalMethod, "name");
          var wrapperMethod = function() {
            var request = resolveRequest();
            if (methodName === "assert" && arguments[0])
              ;
            else if (request !== null) {
              var stack = new Error().stack;
              if (stack.startsWith("Error: \n")) {
                stack = stack.slice(8);
              }
              var firstLine = stack.indexOf("\n");
              if (firstLine === -1) {
                stack = "";
              } else {
                stack = stack.slice(firstLine + 1);
              }
              request.pendingChunks++;
              var id = request.nextChunkId++;
              var owner = ReactSharedInternals.owner;
              emitConsoleChunk(request, id, methodName, owner, stack, arguments);
            }
            return originalMethod.apply(this, arguments);
          };
          if (originalName) {
            Object.defineProperty(wrapperMethod, "name", originalName);
          }
          Object.defineProperty(consoleInst, methodName, {
            value: wrapperMethod
          });
        }
      }
      if (typeof console === "object" && console !== null) {
        patchConsole(console, "assert");
        patchConsole(console, "debug");
        patchConsole(console, "dir");
        patchConsole(console, "dirxml");
        patchConsole(console, "error");
        patchConsole(console, "group");
        patchConsole(console, "groupCollapsed");
        patchConsole(console, "groupEnd");
        patchConsole(console, "info");
        patchConsole(console, "log");
        patchConsole(console, "table");
        patchConsole(console, "trace");
        patchConsole(console, "warn");
      }
      var ObjectPrototype = Object.prototype;
      var ASYNC_ITERATOR = Symbol.asyncIterator;
      var stringify = JSON.stringify;
      var PENDING$1 = 0;
      var COMPLETED = 1;
      var ABORTED = 3;
      var ERRORED$1 = 4;
      var SEEN_BUT_NOT_YET_OUTLINED = -1;
      var NEVER_OUTLINED = -2;
      var { TaintRegistryObjects, TaintRegistryValues, TaintRegistryByteLengths, TaintRegistryPendingRequests } = ReactSharedInternals;
      function throwTaintViolation(message) {
        throw new Error(message);
      }
      function cleanupTaintQueue(request) {
        var cleanupQueue = request.taintCleanupQueue;
        TaintRegistryPendingRequests.delete(cleanupQueue);
        for (var i = 0;i < cleanupQueue.length; i++) {
          var entryValue = cleanupQueue[i];
          var entry = TaintRegistryValues.get(entryValue);
          if (entry !== undefined) {
            if (entry.count === 1) {
              TaintRegistryValues.delete(entryValue);
            } else {
              entry.count--;
            }
          }
        }
        cleanupQueue.length = 0;
      }
      function defaultErrorHandler(error2) {
        console["error"](error2);
      }
      function defaultPostponeHandler(reason) {
      }
      var OPEN = 0;
      var CLOSING = 1;
      var CLOSED = 2;
      function createRequest(model, bundlerConfig, onError, identifierPrefix, onPostpone, environmentName) {
        if (ReactSharedInternals.C !== null && ReactSharedInternals.C !== DefaultCacheDispatcher) {
          throw new Error("Currently React only supports one RSC renderer at a time.");
        }
        ReactSharedInternals.C = DefaultCacheDispatcher;
        var abortSet = new Set;
        var pingedTasks = [];
        var cleanupQueue = [];
        {
          TaintRegistryPendingRequests.add(cleanupQueue);
        }
        var hints = createHints();
        var request = {
          status: OPEN,
          flushScheduled: false,
          fatalError: null,
          destination: null,
          bundlerConfig,
          cache: new Map,
          nextChunkId: 0,
          pendingChunks: 0,
          hints,
          abortListeners: new Set,
          abortableTasks: abortSet,
          pingedTasks,
          completedImportChunks: [],
          completedHintChunks: [],
          completedRegularChunks: [],
          completedErrorChunks: [],
          writtenSymbols: new Map,
          writtenClientReferences: new Map,
          writtenServerReferences: new Map,
          writtenObjects: new WeakMap,
          identifierPrefix: identifierPrefix || "",
          identifierCount: 1,
          taintCleanupQueue: cleanupQueue,
          onError: onError === undefined ? defaultErrorHandler : onError,
          onPostpone: onPostpone === undefined ? defaultPostponeHandler : onPostpone
        };
        {
          request.environmentName = environmentName === undefined ? "Server" : environmentName;
        }
        var rootTask = createTask(request, model, null, false, abortSet);
        pingedTasks.push(rootTask);
        return request;
      }
      var currentRequest = null;
      function resolveRequest() {
        if (currentRequest)
          return currentRequest;
        {
          var store = requestStorage.getStore();
          if (store)
            return store;
        }
        return null;
      }
      function serializeThenable(request, task, thenable) {
        var newTask = createTask(request, null, task.keyPath, task.implicitSlot, request.abortableTasks);
        {
          var debugInfo = thenable._debugInfo;
          if (debugInfo) {
            forwardDebugInfo(request, newTask.id, debugInfo);
          }
        }
        switch (thenable.status) {
          case "fulfilled": {
            newTask.model = thenable.value;
            pingTask(request, newTask);
            return newTask.id;
          }
          case "rejected": {
            var x = thenable.reason;
            if (typeof x === "object" && x !== null && x.$$typeof === REACT_POSTPONE_TYPE) {
              var postponeInstance = x;
              logPostpone(request, postponeInstance.message);
              emitPostponeChunk(request, newTask.id, postponeInstance);
            } else {
              var digest = logRecoverableError(request, x);
              emitErrorChunk(request, newTask.id, digest, x);
            }
            return newTask.id;
          }
          default: {
            if (typeof thenable.status === "string") {
              break;
            }
            var pendingThenable = thenable;
            pendingThenable.status = "pending";
            pendingThenable.then(function(fulfilledValue) {
              if (thenable.status === "pending") {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            }, function(error2) {
              if (thenable.status === "pending") {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error2;
              }
            });
            break;
          }
        }
        thenable.then(function(value) {
          newTask.model = value;
          pingTask(request, newTask);
        }, function(reason) {
          if (typeof reason === "object" && reason !== null && reason.$$typeof === REACT_POSTPONE_TYPE) {
            var _postponeInstance = reason;
            logPostpone(request, _postponeInstance.message);
            emitPostponeChunk(request, newTask.id, _postponeInstance);
          } else {
            newTask.status = ERRORED$1;
            var _digest = logRecoverableError(request, reason);
            emitErrorChunk(request, newTask.id, _digest, reason);
          }
          request.abortableTasks.delete(newTask);
          enqueueFlush(request);
        });
        return newTask.id;
      }
      function serializeReadableStream(request, task, stream) {
        var supportsBYOB = stream.supportsBYOB;
        if (supportsBYOB === undefined) {
          try {
            stream.getReader({
              mode: "byob"
            }).releaseLock();
            supportsBYOB = true;
          } catch (x) {
            supportsBYOB = false;
          }
        }
        var reader = stream.getReader();
        var streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
        request.abortableTasks.delete(streamTask);
        request.pendingChunks++;
        var startStreamRow = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
        request.completedRegularChunks.push(stringToChunk(startStreamRow));
        var aborted = false;
        function progress(entry) {
          if (aborted) {
            return;
          }
          if (entry.done) {
            request.abortListeners.delete(error2);
            var endStreamRow = streamTask.id.toString(16) + ":C\n";
            request.completedRegularChunks.push(stringToChunk(endStreamRow));
            enqueueFlush(request);
            aborted = true;
          } else {
            try {
              streamTask.model = entry.value;
              request.pendingChunks++;
              tryStreamTask(request, streamTask);
              enqueueFlush(request);
              reader.read().then(progress, error2);
            } catch (x) {
              error2(x);
            }
          }
        }
        function error2(reason) {
          if (aborted) {
            return;
          }
          aborted = true;
          request.abortListeners.delete(error2);
          if (typeof reason === "object" && reason !== null && reason.$$typeof === REACT_POSTPONE_TYPE) {
            var postponeInstance = reason;
            logPostpone(request, postponeInstance.message);
            emitPostponeChunk(request, streamTask.id, postponeInstance);
          } else {
            var digest = logRecoverableError(request, reason);
            emitErrorChunk(request, streamTask.id, digest, reason);
          }
          enqueueFlush(request);
          reader.cancel(reason).then(error2, error2);
        }
        request.abortListeners.add(error2);
        reader.read().then(progress, error2);
        return serializeByValueID(streamTask.id);
      }
      function serializeAsyncIterable(request, task, iterable, iterator) {
        var isIterator = iterable === iterator;
        var streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
        request.abortableTasks.delete(streamTask);
        request.pendingChunks++;
        var startStreamRow = streamTask.id.toString(16) + ":" + (isIterator ? "x" : "X") + "\n";
        request.completedRegularChunks.push(stringToChunk(startStreamRow));
        {
          var debugInfo = iterable._debugInfo;
          if (debugInfo) {
            forwardDebugInfo(request, streamTask.id, debugInfo);
          }
        }
        var aborted = false;
        function progress(entry) {
          if (aborted) {
            return;
          }
          if (entry.done) {
            request.abortListeners.delete(error2);
            var endStreamRow;
            if (entry.value === undefined) {
              endStreamRow = streamTask.id.toString(16) + ":C\n";
            } else {
              try {
                var chunkId = outlineModel(request, entry.value);
                endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
              } catch (x) {
                error2(x);
                return;
              }
            }
            request.completedRegularChunks.push(stringToChunk(endStreamRow));
            enqueueFlush(request);
            aborted = true;
          } else {
            try {
              streamTask.model = entry.value;
              request.pendingChunks++;
              tryStreamTask(request, streamTask);
              enqueueFlush(request);
              iterator.next().then(progress, error2);
            } catch (x) {
              error2(x);
              return;
            }
          }
        }
        function error2(reason) {
          if (aborted) {
            return;
          }
          aborted = true;
          request.abortListeners.delete(error2);
          if (typeof reason === "object" && reason !== null && reason.$$typeof === REACT_POSTPONE_TYPE) {
            var postponeInstance = reason;
            logPostpone(request, postponeInstance.message);
            emitPostponeChunk(request, streamTask.id, postponeInstance);
          } else {
            var digest = logRecoverableError(request, reason);
            emitErrorChunk(request, streamTask.id, digest, reason);
          }
          enqueueFlush(request);
          if (typeof iterator.throw === "function") {
            iterator.throw(reason).then(error2, error2);
          }
        }
        request.abortListeners.add(error2);
        iterator.next().then(progress, error2);
        return serializeByValueID(streamTask.id);
      }
      function emitHint(request, code, model) {
        emitHintChunk(request, code, model);
        enqueueFlush(request);
      }
      function getHints(request) {
        return request.hints;
      }
      function getCache(request) {
        return request.cache;
      }
      function readThenable(thenable) {
        if (thenable.status === "fulfilled") {
          return thenable.value;
        } else if (thenable.status === "rejected") {
          throw thenable.reason;
        }
        throw thenable;
      }
      function createLazyWrapperAroundWakeable(wakeable) {
        var thenable = wakeable;
        switch (thenable.status) {
          case "fulfilled":
          case "rejected":
            break;
          default: {
            if (typeof thenable.status === "string") {
              break;
            }
            var pendingThenable = thenable;
            pendingThenable.status = "pending";
            pendingThenable.then(function(fulfilledValue) {
              if (thenable.status === "pending") {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            }, function(error2) {
              if (thenable.status === "pending") {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error2;
              }
            });
            break;
          }
        }
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: thenable,
          _init: readThenable
        };
        {
          lazyType._debugInfo = thenable._debugInfo || [];
        }
        return lazyType;
      }
      function renderFunctionComponent(request, task, key, Component, props, owner) {
        var prevThenableState = task.thenableState;
        task.thenableState = null;
        var componentDebugInfo = null;
        {
          if (debugID === null) {
            return outlineTask(request, task);
          } else if (prevThenableState !== null) {
            componentDebugInfo = prevThenableState._componentDebugInfo;
          } else {
            var componentName = Component.displayName || Component.name || "";
            request.pendingChunks++;
            var componentDebugID = debugID;
            componentDebugInfo = {
              name: componentName,
              env: request.environmentName,
              owner
            };
            outlineModel(request, componentDebugInfo);
            emitDebugChunk(request, componentDebugID, componentDebugInfo);
          }
        }
        prepareToUseHooksForComponent(prevThenableState, componentDebugInfo);
        var secondArg = undefined;
        var result;
        {
          ReactSharedInternals.owner = componentDebugInfo;
          try {
            result = Component(props, secondArg);
          } finally {
            ReactSharedInternals.owner = null;
          }
        }
        if (typeof result === "object" && result !== null && typeof result.then === "function") {
          var thenable = result;
          if (thenable.status === "fulfilled") {
            return thenable.value;
          }
          result = createLazyWrapperAroundWakeable(result);
        }
        var prevKeyPath = task.keyPath;
        var prevImplicitSlot = task.implicitSlot;
        if (key !== null) {
          task.keyPath = prevKeyPath === null ? key : prevKeyPath + "," + key;
        } else if (prevKeyPath === null) {
          task.implicitSlot = true;
        }
        var json = renderModelDestructive(request, task, emptyRoot, "", result);
        task.keyPath = prevKeyPath;
        task.implicitSlot = prevImplicitSlot;
        return json;
      }
      function renderFragment(request, task, children) {
        if (task.keyPath !== null) {
          var fragment = [REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE, task.keyPath, {
            children
          }];
          if (!task.implicitSlot) {
            return fragment;
          }
          return [fragment];
        }
        {
          var debugInfo = children._debugInfo;
          if (debugInfo) {
            if (debugID === null) {
              return outlineTask(request, task);
            } else {
              forwardDebugInfo(request, debugID, debugInfo);
            }
            children = Array.from(children);
          }
        }
        return children;
      }
      function renderAsyncFragment(request, task, children, getAsyncIterator) {
        if (task.keyPath !== null) {
          var fragment = [REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE, task.keyPath, {
            children
          }];
          if (!task.implicitSlot) {
            return fragment;
          }
          return [fragment];
        }
        var asyncIterator = getAsyncIterator.call(children);
        return serializeAsyncIterable(request, task, children, asyncIterator);
      }
      function renderClientElement(task, type, key, props, owner) {
        var keyPath = task.keyPath;
        if (key === null) {
          key = keyPath;
        } else if (keyPath !== null) {
          key = keyPath + "," + key;
        }
        var element = [REACT_ELEMENT_TYPE, type, key, props, owner];
        if (task.implicitSlot && key !== null) {
          return [element];
        }
        return element;
      }
      var debugID = null;
      function outlineTask(request, task) {
        var newTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
        retryTask(request, newTask);
        if (newTask.status === COMPLETED) {
          return serializeByValueID(newTask.id);
        }
        return serializeLazyID(newTask.id);
      }
      function renderElement(request, task, type, key, ref, props, owner) {
        if (ref !== null && ref !== undefined) {
          throw new Error("Refs cannot be used in Server Components, nor passed to Client Components.");
        }
        {
          jsxPropsParents.set(props, type);
          if (typeof props.children === "object" && props.children !== null) {
            jsxChildrenParents.set(props.children, type);
          }
        }
        if (typeof type === "function") {
          if (isClientReference(type) || isTemporaryReference(type)) {
            return renderClientElement(task, type, key, props, owner);
          }
          return renderFunctionComponent(request, task, key, type, props, owner);
        } else if (typeof type === "string") {
          return renderClientElement(task, type, key, props, owner);
        } else if (typeof type === "symbol") {
          if (type === REACT_FRAGMENT_TYPE && key === null) {
            var prevImplicitSlot = task.implicitSlot;
            if (task.keyPath === null) {
              task.implicitSlot = true;
            }
            var json = renderModelDestructive(request, task, emptyRoot, "", props.children);
            task.implicitSlot = prevImplicitSlot;
            return json;
          }
          return renderClientElement(task, type, key, props, owner);
        } else if (type != null && typeof type === "object") {
          if (isClientReference(type)) {
            return renderClientElement(task, type, key, props, owner);
          }
          switch (type.$$typeof) {
            case REACT_LAZY_TYPE: {
              var payload = type._payload;
              var init = type._init;
              var wrappedType = init(payload);
              return renderElement(request, task, wrappedType, key, ref, props, owner);
            }
            case REACT_FORWARD_REF_TYPE: {
              return renderFunctionComponent(request, task, key, type.render, props, owner);
            }
            case REACT_MEMO_TYPE: {
              return renderElement(request, task, type.type, key, ref, props, owner);
            }
          }
        }
        throw new Error("Unsupported Server Component type: " + describeValueForErrorMessage(type));
      }
      function pingTask(request, task) {
        var pingedTasks = request.pingedTasks;
        pingedTasks.push(task);
        if (pingedTasks.length === 1) {
          request.flushScheduled = request.destination !== null;
          scheduleWork(function() {
            return performWork(request);
          });
        }
      }
      function createTask(request, model, keyPath, implicitSlot, abortSet) {
        request.pendingChunks++;
        var id = request.nextChunkId++;
        if (typeof model === "object" && model !== null) {
          if (keyPath !== null || implicitSlot)
            ;
          else {
            request.writtenObjects.set(model, id);
          }
        }
        var task = {
          id,
          status: PENDING$1,
          model,
          keyPath,
          implicitSlot,
          ping: function() {
            return pingTask(request, task);
          },
          toJSON: function(parentPropertyName, value) {
            var parent = this;
            {
              var originalValue = parent[parentPropertyName];
              if (typeof originalValue === "object" && originalValue !== value && !(originalValue instanceof Date)) {
                if (objectName(originalValue) !== "Object") {
                  var jsxParentType = jsxChildrenParents.get(parent);
                  if (typeof jsxParentType === "string") {
                    error("%s objects cannot be rendered as text children. Try formatting it using toString().%s", objectName(originalValue), describeObjectForErrorMessage(parent, parentPropertyName));
                  } else {
                    error("Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s", objectName(originalValue), describeObjectForErrorMessage(parent, parentPropertyName));
                  }
                } else {
                  error("Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s", describeObjectForErrorMessage(parent, parentPropertyName));
                }
              }
            }
            return renderModel(request, task, parent, parentPropertyName, value);
          },
          thenableState: null
        };
        abortSet.add(task);
        return task;
      }
      function serializeByValueID(id) {
        return "$" + id.toString(16);
      }
      function serializeLazyID(id) {
        return "$L" + id.toString(16);
      }
      function serializeInfinitePromise() {
        return "$@";
      }
      function serializePromiseID(id) {
        return "$@" + id.toString(16);
      }
      function serializeServerReferenceID(id) {
        return "$F" + id.toString(16);
      }
      function serializeTemporaryReferenceID(id) {
        return "$T" + id;
      }
      function serializeSymbolReference(name) {
        return "$S" + name;
      }
      function serializeNumber(number) {
        if (Number.isFinite(number)) {
          if (number === 0 && 1 / number === (-Infinity)) {
            return "$-0";
          } else {
            return number;
          }
        } else {
          if (number === Infinity) {
            return "$Infinity";
          } else if (number === (-Infinity)) {
            return "$-Infinity";
          } else {
            return "$NaN";
          }
        }
      }
      function serializeUndefined() {
        return "$undefined";
      }
      function serializeDateFromDateJSON(dateJSON) {
        return "$D" + dateJSON;
      }
      function serializeBigInt(n) {
        return "$n" + n.toString(10);
      }
      function serializeRowHeader(tag, id) {
        return id.toString(16) + ":" + tag;
      }
      function encodeReferenceChunk(request, id, reference) {
        var json = stringify(reference);
        var row = id.toString(16) + ":" + json + "\n";
        return stringToChunk(row);
      }
      function serializeClientReference(request, parent, parentPropertyName, clientReference) {
        var clientReferenceKey = getClientReferenceKey(clientReference);
        var writtenClientReferences = request.writtenClientReferences;
        var existingId = writtenClientReferences.get(clientReferenceKey);
        if (existingId !== undefined) {
          if (parent[0] === REACT_ELEMENT_TYPE && parentPropertyName === "1") {
            return serializeLazyID(existingId);
          }
          return serializeByValueID(existingId);
        }
        try {
          var clientReferenceMetadata = resolveClientReferenceMetadata(request.bundlerConfig, clientReference);
          request.pendingChunks++;
          var importId = request.nextChunkId++;
          emitImportChunk(request, importId, clientReferenceMetadata);
          writtenClientReferences.set(clientReferenceKey, importId);
          if (parent[0] === REACT_ELEMENT_TYPE && parentPropertyName === "1") {
            return serializeLazyID(importId);
          }
          return serializeByValueID(importId);
        } catch (x) {
          request.pendingChunks++;
          var errorId = request.nextChunkId++;
          var digest = logRecoverableError(request, x);
          emitErrorChunk(request, errorId, digest, x);
          return serializeByValueID(errorId);
        }
      }
      function outlineModel(request, value) {
        var newTask = createTask(request, value, null, false, request.abortableTasks);
        retryTask(request, newTask);
        return newTask.id;
      }
      function serializeServerReference(request, serverReference) {
        var writtenServerReferences = request.writtenServerReferences;
        var existingId = writtenServerReferences.get(serverReference);
        if (existingId !== undefined) {
          return serializeServerReferenceID(existingId);
        }
        var bound = getServerReferenceBoundArguments(request.bundlerConfig, serverReference);
        var serverReferenceMetadata = {
          id: getServerReferenceId(request.bundlerConfig, serverReference),
          bound: bound ? Promise.resolve(bound) : null
        };
        var metadataId = outlineModel(request, serverReferenceMetadata);
        writtenServerReferences.set(serverReference, metadataId);
        return serializeServerReferenceID(metadataId);
      }
      function serializeTemporaryReference(request, temporaryReference) {
        var id = resolveTemporaryReferenceID(temporaryReference);
        return serializeTemporaryReferenceID(id);
      }
      function serializeLargeTextString(request, text) {
        request.pendingChunks++;
        var textId = request.nextChunkId++;
        emitTextChunk(request, textId, text);
        return serializeByValueID(textId);
      }
      function serializeMap(request, map) {
        var entries = Array.from(map);
        for (var i = 0;i < entries.length; i++) {
          var key = entries[i][0];
          if (typeof key === "object" && key !== null) {
            var writtenObjects = request.writtenObjects;
            var existingId = writtenObjects.get(key);
            if (existingId === undefined) {
              writtenObjects.set(key, SEEN_BUT_NOT_YET_OUTLINED);
            }
          }
        }
        var id = outlineModel(request, entries);
        return "$Q" + id.toString(16);
      }
      function serializeFormData(request, formData) {
        var entries = Array.from(formData.entries());
        var id = outlineModel(request, entries);
        return "$K" + id.toString(16);
      }
      function serializeSet(request, set) {
        var entries = Array.from(set);
        for (var i = 0;i < entries.length; i++) {
          var key = entries[i];
          if (typeof key === "object" && key !== null) {
            var writtenObjects = request.writtenObjects;
            var existingId = writtenObjects.get(key);
            if (existingId === undefined) {
              writtenObjects.set(key, SEEN_BUT_NOT_YET_OUTLINED);
            }
          }
        }
        var id = outlineModel(request, entries);
        return "$W" + id.toString(16);
      }
      function serializeTypedArray(request, tag, typedArray) {
        request.pendingChunks++;
        var bufferId = request.nextChunkId++;
        emitTypedArrayChunk(request, bufferId, tag, typedArray);
        return serializeByValueID(bufferId);
      }
      function serializeBlob(request, blob) {
        var model = [blob.type];
        var newTask = createTask(request, model, null, false, request.abortableTasks);
        var reader = blob.stream().getReader();
        var aborted = false;
        function progress(entry) {
          if (aborted) {
            return;
          }
          if (entry.done) {
            request.abortListeners.delete(error2);
            aborted = true;
            pingTask(request, newTask);
            return;
          }
          model.push(entry.value);
          return reader.read().then(progress).catch(error2);
        }
        function error2(reason) {
          if (aborted) {
            return;
          }
          aborted = true;
          request.abortListeners.delete(error2);
          var digest = logRecoverableError(request, reason);
          emitErrorChunk(request, newTask.id, digest, reason);
          request.abortableTasks.delete(newTask);
          enqueueFlush(request);
          reader.cancel(reason).then(error2, error2);
        }
        request.abortListeners.add(error2);
        reader.read().then(progress).catch(error2);
        return "$B" + newTask.id.toString(16);
      }
      function escapeStringValue(value) {
        if (value[0] === "$") {
          return "$" + value;
        } else {
          return value;
        }
      }
      var modelRoot = false;
      function renderModel(request, task, parent, key, value) {
        var prevKeyPath = task.keyPath;
        var prevImplicitSlot = task.implicitSlot;
        try {
          return renderModelDestructive(request, task, parent, key, value);
        } catch (thrownValue) {
          var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
          var model = task.model;
          var wasReactNode = typeof model === "object" && model !== null && (model.$$typeof === REACT_ELEMENT_TYPE || model.$$typeof === REACT_LAZY_TYPE);
          if (typeof x === "object" && x !== null) {
            if (typeof x.then === "function") {
              var newTask = createTask(request, task.model, task.keyPath, task.implicitSlot, request.abortableTasks);
              var ping = newTask.ping;
              x.then(ping, ping);
              newTask.thenableState = getThenableStateAfterSuspending();
              task.keyPath = prevKeyPath;
              task.implicitSlot = prevImplicitSlot;
              if (wasReactNode) {
                return serializeLazyID(newTask.id);
              }
              return serializeByValueID(newTask.id);
            } else if (x.$$typeof === REACT_POSTPONE_TYPE) {
              var postponeInstance = x;
              request.pendingChunks++;
              var postponeId = request.nextChunkId++;
              logPostpone(request, postponeInstance.message);
              emitPostponeChunk(request, postponeId, postponeInstance);
              task.keyPath = prevKeyPath;
              task.implicitSlot = prevImplicitSlot;
              if (wasReactNode) {
                return serializeLazyID(postponeId);
              }
              return serializeByValueID(postponeId);
            }
          }
          task.keyPath = prevKeyPath;
          task.implicitSlot = prevImplicitSlot;
          if (wasReactNode) {
            request.pendingChunks++;
            var errorId = request.nextChunkId++;
            var digest = logRecoverableError(request, x);
            emitErrorChunk(request, errorId, digest, x);
            return serializeLazyID(errorId);
          }
          throw x;
        }
      }
      function renderModelDestructive(request, task, parent, parentPropertyName, value) {
        task.model = value;
        if (value === REACT_ELEMENT_TYPE) {
          return "$";
        }
        if (value === null) {
          return null;
        }
        if (typeof value === "object") {
          switch (value.$$typeof) {
            case REACT_ELEMENT_TYPE: {
              var _writtenObjects = request.writtenObjects;
              var _existingId = _writtenObjects.get(value);
              if (_existingId !== undefined) {
                if (task.keyPath !== null || task.implicitSlot)
                  ;
                else if (modelRoot === value) {
                  modelRoot = null;
                } else if (_existingId === SEEN_BUT_NOT_YET_OUTLINED) {
                  var newId = outlineModel(request, value);
                  return serializeByValueID(newId);
                } else {
                  return serializeByValueID(_existingId);
                }
              } else {
                _writtenObjects.set(value, SEEN_BUT_NOT_YET_OUTLINED);
                _writtenObjects.set(value.props, NEVER_OUTLINED);
              }
              var element = value;
              {
                var debugInfo = value._debugInfo;
                if (debugInfo) {
                  if (debugID === null) {
                    return outlineTask(request, task);
                  } else {
                    forwardDebugInfo(request, debugID, debugInfo);
                  }
                }
              }
              var props = element.props;
              var ref;
              {
                var refProp = props.ref;
                ref = refProp !== undefined ? refProp : null;
              }
              return renderElement(request, task, element.type, element.key, ref, props, element._owner);
            }
            case REACT_LAZY_TYPE: {
              task.thenableState = null;
              var lazy = value;
              var payload = lazy._payload;
              var init = lazy._init;
              var resolvedModel = init(payload);
              {
                var _debugInfo = lazy._debugInfo;
                if (_debugInfo) {
                  if (debugID === null) {
                    return outlineTask(request, task);
                  } else {
                    forwardDebugInfo(request, debugID, _debugInfo);
                  }
                }
              }
              return renderModelDestructive(request, task, emptyRoot, "", resolvedModel);
            }
          }
          if (isClientReference(value)) {
            return serializeClientReference(request, parent, parentPropertyName, value);
          }
          {
            var tainted = TaintRegistryObjects.get(value);
            if (tainted !== undefined) {
              throwTaintViolation(tainted);
            }
          }
          var writtenObjects = request.writtenObjects;
          var existingId = writtenObjects.get(value);
          if (typeof value.then === "function") {
            if (existingId !== undefined) {
              if (task.keyPath !== null || task.implicitSlot) {
                var _promiseId = serializeThenable(request, task, value);
                return serializePromiseID(_promiseId);
              } else if (modelRoot === value) {
                modelRoot = null;
              } else {
                return serializePromiseID(existingId);
              }
            }
            var promiseId = serializeThenable(request, task, value);
            writtenObjects.set(value, promiseId);
            return serializePromiseID(promiseId);
          }
          if (existingId !== undefined) {
            if (modelRoot === value) {
              modelRoot = null;
            } else if (existingId === SEEN_BUT_NOT_YET_OUTLINED) {
              var _newId = outlineModel(request, value);
              return serializeByValueID(_newId);
            } else if (existingId !== NEVER_OUTLINED) {
              return serializeByValueID(existingId);
            }
          } else {
            writtenObjects.set(value, SEEN_BUT_NOT_YET_OUTLINED);
          }
          if (isArray(value)) {
            return renderFragment(request, task, value);
          }
          if (value instanceof Map) {
            return serializeMap(request, value);
          }
          if (value instanceof Set) {
            return serializeSet(request, value);
          }
          if (typeof FormData === "function" && value instanceof FormData) {
            return serializeFormData(request, value);
          }
          {
            if (value instanceof ArrayBuffer) {
              return serializeTypedArray(request, "A", new Uint8Array(value));
            }
            if (value instanceof Int8Array) {
              return serializeTypedArray(request, "O", value);
            }
            if (value instanceof Uint8Array) {
              return serializeTypedArray(request, "o", value);
            }
            if (value instanceof Uint8ClampedArray) {
              return serializeTypedArray(request, "U", value);
            }
            if (value instanceof Int16Array) {
              return serializeTypedArray(request, "S", value);
            }
            if (value instanceof Uint16Array) {
              return serializeTypedArray(request, "s", value);
            }
            if (value instanceof Int32Array) {
              return serializeTypedArray(request, "L", value);
            }
            if (value instanceof Uint32Array) {
              return serializeTypedArray(request, "l", value);
            }
            if (value instanceof Float32Array) {
              return serializeTypedArray(request, "G", value);
            }
            if (value instanceof Float64Array) {
              return serializeTypedArray(request, "g", value);
            }
            if (value instanceof BigInt64Array) {
              return serializeTypedArray(request, "M", value);
            }
            if (value instanceof BigUint64Array) {
              return serializeTypedArray(request, "m", value);
            }
            if (value instanceof DataView) {
              return serializeTypedArray(request, "V", value);
            }
            if (typeof Blob === "function" && value instanceof Blob) {
              return serializeBlob(request, value);
            }
          }
          var iteratorFn = getIteratorFn(value);
          if (iteratorFn) {
            return renderFragment(request, task, Array.from(value));
          }
          {
            if (typeof ReadableStream === "function" && value instanceof ReadableStream) {
              return serializeReadableStream(request, task, value);
            }
            var getAsyncIterator = value[ASYNC_ITERATOR];
            if (typeof getAsyncIterator === "function") {
              return renderAsyncFragment(request, task, value, getAsyncIterator);
            }
          }
          var proto = getPrototypeOf(value);
          if (proto !== ObjectPrototype && (proto === null || getPrototypeOf(proto) !== null)) {
            throw new Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.");
          }
          {
            if (objectName(value) !== "Object") {
              error("Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s", objectName(value), describeObjectForErrorMessage(parent, parentPropertyName));
            } else if (!isSimpleObject(value)) {
              error("Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.%s", describeObjectForErrorMessage(parent, parentPropertyName));
            } else if (Object.getOwnPropertySymbols) {
              var symbols = Object.getOwnPropertySymbols(value);
              if (symbols.length > 0) {
                error("Only plain objects can be passed to Client Components from Server Components. Objects with symbol properties like %s are not supported.%s", symbols[0].description, describeObjectForErrorMessage(parent, parentPropertyName));
              }
            }
          }
          return value;
        }
        if (typeof value === "string") {
          {
            var _tainted = TaintRegistryValues.get(value);
            if (_tainted !== undefined) {
              throwTaintViolation(_tainted.message);
            }
          }
          if (value[value.length - 1] === "Z") {
            var originalValue = parent[parentPropertyName];
            if (originalValue instanceof Date) {
              return serializeDateFromDateJSON(value);
            }
          }
          if (value.length >= 1024) {
            return serializeLargeTextString(request, value);
          }
          return escapeStringValue(value);
        }
        if (typeof value === "boolean") {
          return value;
        }
        if (typeof value === "number") {
          return serializeNumber(value);
        }
        if (typeof value === "undefined") {
          return serializeUndefined();
        }
        if (typeof value === "function") {
          if (isClientReference(value)) {
            return serializeClientReference(request, parent, parentPropertyName, value);
          }
          if (isServerReference(value)) {
            return serializeServerReference(request, value);
          }
          if (isTemporaryReference(value)) {
            return serializeTemporaryReference(request, value);
          }
          {
            var _tainted2 = TaintRegistryObjects.get(value);
            if (_tainted2 !== undefined) {
              throwTaintViolation(_tainted2);
            }
          }
          if (/^on[A-Z]/.test(parentPropertyName)) {
            throw new Error("Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
          } else if (jsxChildrenParents.has(parent) || jsxPropsParents.has(parent) && parentPropertyName === "children") {
            var componentName = value.displayName || value.name || "Component";
            throw new Error("Functions are not valid as a child of Client Components. This may happen if you return " + componentName + " instead of <" + componentName + " /> from render. Or maybe you meant to call this function rather than return it." + describeObjectForErrorMessage(parent, parentPropertyName));
          } else {
            throw new Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + describeObjectForErrorMessage(parent, parentPropertyName));
          }
        }
        if (typeof value === "symbol") {
          var writtenSymbols = request.writtenSymbols;
          var _existingId2 = writtenSymbols.get(value);
          if (_existingId2 !== undefined) {
            return serializeByValueID(_existingId2);
          }
          var name = value.description;
          if (Symbol.for(name) !== value) {
            throw new Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. " + ("The symbol Symbol.for(" + value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName));
          }
          request.pendingChunks++;
          var symbolId = request.nextChunkId++;
          emitSymbolChunk(request, symbolId, name);
          writtenSymbols.set(value, symbolId);
          return serializeByValueID(symbolId);
        }
        if (typeof value === "bigint") {
          {
            var _tainted3 = TaintRegistryValues.get(value);
            if (_tainted3 !== undefined) {
              throwTaintViolation(_tainted3.message);
            }
          }
          return serializeBigInt(value);
        }
        throw new Error("Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName));
      }
      function logPostpone(request, reason) {
        var prevRequest = currentRequest;
        currentRequest = null;
        try {
          var onPostpone = request.onPostpone;
          if (supportsRequestStorage) {
            requestStorage.run(undefined, onPostpone, reason);
          }
        } finally {
          currentRequest = prevRequest;
        }
      }
      function logRecoverableError(request, error2) {
        var prevRequest = currentRequest;
        currentRequest = null;
        var errorDigest;
        try {
          var onError = request.onError;
          if (supportsRequestStorage) {
            errorDigest = requestStorage.run(undefined, onError, error2);
          }
        } finally {
          currentRequest = prevRequest;
        }
        if (errorDigest != null && typeof errorDigest !== "string") {
          throw new Error("onError returned something with a type other than \"string\". onError should return a string and may return null or undefined but must not return anything else. It received something of type \"" + typeof errorDigest + "\" instead");
        }
        return errorDigest || "";
      }
      function fatalError(request, error2) {
        {
          cleanupTaintQueue(request);
        }
        if (request.destination !== null) {
          request.status = CLOSED;
          closeWithError(request.destination, error2);
        } else {
          request.status = CLOSING;
          request.fatalError = error2;
        }
      }
      function emitPostponeChunk(request, id, postponeInstance) {
        var row;
        {
          var reason = "";
          var stack = "";
          try {
            reason = String(postponeInstance.message);
            stack = String(postponeInstance.stack);
          } catch (x) {
          }
          row = serializeRowHeader("P", id) + stringify({
            reason,
            stack
          }) + "\n";
        }
        var processedChunk = stringToChunk(row);
        request.completedErrorChunks.push(processedChunk);
      }
      function emitErrorChunk(request, id, digest, error2) {
        var errorInfo;
        {
          var message;
          var stack = "";
          try {
            if (error2 instanceof Error) {
              message = String(error2.message);
              stack = String(error2.stack);
            } else if (typeof error2 === "object" && error2 !== null) {
              message = describeObjectForErrorMessage(error2);
            } else {
              message = String(error2);
            }
          } catch (x) {
            message = "An error occurred but serializing the error message failed.";
          }
          errorInfo = {
            digest,
            message,
            stack
          };
        }
        var row = serializeRowHeader("E", id) + stringify(errorInfo) + "\n";
        var processedChunk = stringToChunk(row);
        request.completedErrorChunks.push(processedChunk);
      }
      function emitImportChunk(request, id, clientReferenceMetadata) {
        var json = stringify(clientReferenceMetadata);
        var row = serializeRowHeader("I", id) + json + "\n";
        var processedChunk = stringToChunk(row);
        request.completedImportChunks.push(processedChunk);
      }
      function emitHintChunk(request, code, model) {
        var json = stringify(model);
        var id = request.nextChunkId++;
        var row = serializeRowHeader("H" + code, id) + json + "\n";
        var processedChunk = stringToChunk(row);
        request.completedHintChunks.push(processedChunk);
      }
      function emitSymbolChunk(request, id, name) {
        var symbolReference = serializeSymbolReference(name);
        var processedChunk = encodeReferenceChunk(request, id, symbolReference);
        request.completedImportChunks.push(processedChunk);
      }
      function emitModelChunk(request, id, json) {
        var row = id.toString(16) + ":" + json + "\n";
        var processedChunk = stringToChunk(row);
        request.completedRegularChunks.push(processedChunk);
      }
      function emitDebugChunk(request, id, debugInfo) {
        var counter = {
          objectCount: 0
        };
        function replacer(parentPropertyName, value) {
          return renderConsoleValue(request, counter, this, parentPropertyName, value);
        }
        var json = stringify(debugInfo, replacer);
        var row = serializeRowHeader("D", id) + json + "\n";
        var processedChunk = stringToChunk(row);
        request.completedRegularChunks.push(processedChunk);
      }
      function emitTypedArrayChunk(request, id, tag, typedArray) {
        {
          if (TaintRegistryByteLengths.has(typedArray.byteLength)) {
            var tainted = TaintRegistryValues.get(binaryToComparableString(typedArray));
            if (tainted !== undefined) {
              throwTaintViolation(tainted.message);
            }
          }
        }
        request.pendingChunks++;
        var binaryChunk = typedArrayToBinaryChunk(typedArray);
        var binaryLength = byteLengthOfBinaryChunk(binaryChunk);
        var row = id.toString(16) + ":" + tag + binaryLength.toString(16) + ",";
        var headerChunk = stringToChunk(row);
        request.completedRegularChunks.push(headerChunk, binaryChunk);
      }
      function emitTextChunk(request, id, text) {
        request.pendingChunks++;
        var textChunk = stringToChunk(text);
        var binaryLength = byteLengthOfChunk(textChunk);
        var row = id.toString(16) + ":T" + binaryLength.toString(16) + ",";
        var headerChunk = stringToChunk(row);
        request.completedRegularChunks.push(headerChunk, textChunk);
      }
      function serializeEval(source) {
        return "$E" + source;
      }
      function renderConsoleValue(request, counter, parent, parentPropertyName, value) {
        var originalValue = parent[parentPropertyName];
        if (value === null) {
          return null;
        }
        if (typeof value === "object") {
          if (isClientReference(value)) {
            return serializeClientReference(request, parent, parentPropertyName, value);
          }
          if (counter.objectCount > 20) {
            return Array.isArray(value) ? [] : {};
          }
          counter.objectCount++;
          var writtenObjects = request.writtenObjects;
          var existingId = writtenObjects.get(value);
          if (typeof value.then === "function") {
            if (existingId !== undefined) {
              return serializePromiseID(existingId);
            }
            var thenable = value;
            switch (thenable.status) {
              case "fulfilled": {
                return serializePromiseID(outlineConsoleValue(request, counter, thenable.value));
              }
              case "rejected": {
                var x = thenable.reason;
                request.pendingChunks++;
                var errorId = request.nextChunkId++;
                if (typeof x === "object" && x !== null && x.$$typeof === REACT_POSTPONE_TYPE) {
                  var postponeInstance = x;
                  emitPostponeChunk(request, errorId, postponeInstance);
                } else {
                  var digest = "";
                  emitErrorChunk(request, errorId, digest, x);
                }
                return serializePromiseID(errorId);
              }
            }
            return serializeInfinitePromise();
          }
          if (existingId !== undefined && existingId >= 0) {
            return serializeByValueID(existingId);
          }
          if (isArray(value)) {
            return value;
          }
          if (value instanceof Map) {
            return serializeMap(request, value);
          }
          if (value instanceof Set) {
            return serializeSet(request, value);
          }
          if (typeof FormData === "function" && value instanceof FormData) {
            return serializeFormData(request, value);
          }
          {
            if (value instanceof ArrayBuffer) {
              return serializeTypedArray(request, "A", new Uint8Array(value));
            }
            if (value instanceof Int8Array) {
              return serializeTypedArray(request, "O", value);
            }
            if (value instanceof Uint8Array) {
              return serializeTypedArray(request, "o", value);
            }
            if (value instanceof Uint8ClampedArray) {
              return serializeTypedArray(request, "U", value);
            }
            if (value instanceof Int16Array) {
              return serializeTypedArray(request, "S", value);
            }
            if (value instanceof Uint16Array) {
              return serializeTypedArray(request, "s", value);
            }
            if (value instanceof Int32Array) {
              return serializeTypedArray(request, "L", value);
            }
            if (value instanceof Uint32Array) {
              return serializeTypedArray(request, "l", value);
            }
            if (value instanceof Float32Array) {
              return serializeTypedArray(request, "G", value);
            }
            if (value instanceof Float64Array) {
              return serializeTypedArray(request, "g", value);
            }
            if (value instanceof BigInt64Array) {
              return serializeTypedArray(request, "M", value);
            }
            if (value instanceof BigUint64Array) {
              return serializeTypedArray(request, "m", value);
            }
            if (value instanceof DataView) {
              return serializeTypedArray(request, "V", value);
            }
            if (typeof Blob === "function" && value instanceof Blob) {
              return serializeBlob(request, value);
            }
          }
          var iteratorFn = getIteratorFn(value);
          if (iteratorFn) {
            return Array.from(value);
          }
          return value;
        }
        if (typeof value === "string") {
          if (value[value.length - 1] === "Z") {
            if (originalValue instanceof Date) {
              return serializeDateFromDateJSON(value);
            }
          }
          if (value.length >= 1024) {
            return serializeLargeTextString(request, value);
          }
          return escapeStringValue(value);
        }
        if (typeof value === "boolean") {
          return value;
        }
        if (typeof value === "number") {
          return serializeNumber(value);
        }
        if (typeof value === "undefined") {
          return serializeUndefined();
        }
        if (typeof value === "function") {
          if (isClientReference(value)) {
            return serializeClientReference(request, parent, parentPropertyName, value);
          }
          if (isTemporaryReference(value)) {
            return serializeTemporaryReference(request, value);
          }
          return serializeEval("(" + Function.prototype.toString.call(value) + ")");
        }
        if (typeof value === "symbol") {
          var writtenSymbols = request.writtenSymbols;
          var _existingId3 = writtenSymbols.get(value);
          if (_existingId3 !== undefined) {
            return serializeByValueID(_existingId3);
          }
          var name = value.description;
          request.pendingChunks++;
          var symbolId = request.nextChunkId++;
          emitSymbolChunk(request, symbolId, name);
          return serializeByValueID(symbolId);
        }
        if (typeof value === "bigint") {
          return serializeBigInt(value);
        }
        return "unknown type " + typeof value;
      }
      function outlineConsoleValue(request, counter, model) {
        function replacer(parentPropertyName, value) {
          try {
            return renderConsoleValue(request, counter, this, parentPropertyName, value);
          } catch (x) {
            return "unknown value";
          }
        }
        var json = stringify(model, replacer);
        request.pendingChunks++;
        var id = request.nextChunkId++;
        var row = id.toString(16) + ":" + json + "\n";
        var processedChunk = stringToChunk(row);
        request.completedRegularChunks.push(processedChunk);
        return id;
      }
      function emitConsoleChunk(request, id, methodName, owner, stackTrace, args) {
        var counter = {
          objectCount: 0
        };
        function replacer(parentPropertyName, value) {
          try {
            return renderConsoleValue(request, counter, this, parentPropertyName, value);
          } catch (x) {
            return "unknown value";
          }
        }
        var env = request.environmentName;
        var payload = [methodName, stackTrace, owner, env];
        payload.push.apply(payload, args);
        var json = stringify(payload, replacer);
        var row = serializeRowHeader("W", id) + json + "\n";
        var processedChunk = stringToChunk(row);
        request.completedRegularChunks.push(processedChunk);
      }
      function forwardDebugInfo(request, id, debugInfo) {
        for (var i = 0;i < debugInfo.length; i++) {
          request.pendingChunks++;
          emitDebugChunk(request, id, debugInfo[i]);
        }
      }
      function emitChunk(request, task, value) {
        var id = task.id;
        if (typeof value === "string") {
          {
            var tainted = TaintRegistryValues.get(value);
            if (tainted !== undefined) {
              throwTaintViolation(tainted.message);
            }
          }
          emitTextChunk(request, id, value);
          return;
        }
        {
          if (value instanceof ArrayBuffer) {
            emitTypedArrayChunk(request, id, "A", new Uint8Array(value));
            return;
          }
          if (value instanceof Int8Array) {
            emitTypedArrayChunk(request, id, "O", value);
            return;
          }
          if (value instanceof Uint8Array) {
            emitTypedArrayChunk(request, id, "o", value);
            return;
          }
          if (value instanceof Uint8ClampedArray) {
            emitTypedArrayChunk(request, id, "U", value);
            return;
          }
          if (value instanceof Int16Array) {
            emitTypedArrayChunk(request, id, "S", value);
            return;
          }
          if (value instanceof Uint16Array) {
            emitTypedArrayChunk(request, id, "s", value);
            return;
          }
          if (value instanceof Int32Array) {
            emitTypedArrayChunk(request, id, "L", value);
            return;
          }
          if (value instanceof Uint32Array) {
            emitTypedArrayChunk(request, id, "l", value);
            return;
          }
          if (value instanceof Float32Array) {
            emitTypedArrayChunk(request, id, "G", value);
            return;
          }
          if (value instanceof Float64Array) {
            emitTypedArrayChunk(request, id, "g", value);
            return;
          }
          if (value instanceof BigInt64Array) {
            emitTypedArrayChunk(request, id, "M", value);
            return;
          }
          if (value instanceof BigUint64Array) {
            emitTypedArrayChunk(request, id, "m", value);
            return;
          }
          if (value instanceof DataView) {
            emitTypedArrayChunk(request, id, "V", value);
            return;
          }
        }
        var json = stringify(value, task.toJSON);
        emitModelChunk(request, task.id, json);
      }
      var emptyRoot = {};
      function retryTask(request, task) {
        if (task.status !== PENDING$1) {
          return;
        }
        var prevDebugID = debugID;
        try {
          modelRoot = task.model;
          if (true) {
            debugID = task.id;
          }
          var resolvedModel = renderModelDestructive(request, task, emptyRoot, "", task.model);
          if (true) {
            debugID = null;
          }
          modelRoot = resolvedModel;
          task.keyPath = null;
          task.implicitSlot = false;
          if (typeof resolvedModel === "object" && resolvedModel !== null) {
            emitChunk(request, task, resolvedModel);
          } else {
            var json = stringify(resolvedModel);
            emitModelChunk(request, task.id, json);
          }
          request.abortableTasks.delete(task);
          task.status = COMPLETED;
        } catch (thrownValue) {
          var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
          if (typeof x === "object" && x !== null) {
            if (typeof x.then === "function") {
              var ping = task.ping;
              x.then(ping, ping);
              task.thenableState = getThenableStateAfterSuspending();
              return;
            } else if (x.$$typeof === REACT_POSTPONE_TYPE) {
              request.abortableTasks.delete(task);
              task.status = ERRORED$1;
              var postponeInstance = x;
              logPostpone(request, postponeInstance.message);
              emitPostponeChunk(request, task.id, postponeInstance);
              return;
            }
          }
          request.abortableTasks.delete(task);
          task.status = ERRORED$1;
          var digest = logRecoverableError(request, x);
          emitErrorChunk(request, task.id, digest, x);
        } finally {
          {
            debugID = prevDebugID;
          }
        }
      }
      function tryStreamTask(request, task) {
        var prevDebugID = debugID;
        {
          debugID = null;
        }
        try {
          emitChunk(request, task, task.model);
        } finally {
          {
            debugID = prevDebugID;
          }
        }
      }
      function performWork(request) {
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = HooksDispatcher;
        var prevRequest = currentRequest;
        currentRequest = request;
        prepareToUseHooksForRequest(request);
        try {
          var pingedTasks = request.pingedTasks;
          request.pingedTasks = [];
          for (var i = 0;i < pingedTasks.length; i++) {
            var task = pingedTasks[i];
            retryTask(request, task);
          }
          if (request.destination !== null) {
            flushCompletedChunks(request, request.destination);
          }
        } catch (error2) {
          logRecoverableError(request, error2);
          fatalError(request, error2);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
          resetHooksForRequest();
          currentRequest = prevRequest;
        }
      }
      function abortTask(task, request, errorId) {
        task.status = ABORTED;
        var ref = serializeByValueID(errorId);
        var processedChunk = encodeReferenceChunk(request, task.id, ref);
        request.completedErrorChunks.push(processedChunk);
      }
      function flushCompletedChunks(request, destination) {
        beginWriting();
        try {
          var importsChunks = request.completedImportChunks;
          var i = 0;
          for (;i < importsChunks.length; i++) {
            request.pendingChunks--;
            var chunk = importsChunks[i];
            var keepWriting = writeChunkAndReturn(destination, chunk);
            if (!keepWriting) {
              request.destination = null;
              i++;
              break;
            }
          }
          importsChunks.splice(0, i);
          var hintChunks = request.completedHintChunks;
          i = 0;
          for (;i < hintChunks.length; i++) {
            var _chunk = hintChunks[i];
            var _keepWriting = writeChunkAndReturn(destination, _chunk);
            if (!_keepWriting) {
              request.destination = null;
              i++;
              break;
            }
          }
          hintChunks.splice(0, i);
          var regularChunks = request.completedRegularChunks;
          i = 0;
          for (;i < regularChunks.length; i++) {
            request.pendingChunks--;
            var _chunk2 = regularChunks[i];
            var _keepWriting2 = writeChunkAndReturn(destination, _chunk2);
            if (!_keepWriting2) {
              request.destination = null;
              i++;
              break;
            }
          }
          regularChunks.splice(0, i);
          var errorChunks = request.completedErrorChunks;
          i = 0;
          for (;i < errorChunks.length; i++) {
            request.pendingChunks--;
            var _chunk3 = errorChunks[i];
            var _keepWriting3 = writeChunkAndReturn(destination, _chunk3);
            if (!_keepWriting3) {
              request.destination = null;
              i++;
              break;
            }
          }
          errorChunks.splice(0, i);
        } finally {
          request.flushScheduled = false;
          completeWriting(destination);
        }
        flushBuffered(destination);
        if (request.pendingChunks === 0) {
          {
            cleanupTaintQueue(request);
          }
          close$1(destination);
          request.destination = null;
        }
      }
      function startWork(request) {
        request.flushScheduled = request.destination !== null;
        {
          scheduleWork(function() {
            return requestStorage.run(request, performWork, request);
          });
        }
      }
      function enqueueFlush(request) {
        if (request.flushScheduled === false && request.pingedTasks.length === 0 && request.destination !== null) {
          var destination = request.destination;
          request.flushScheduled = true;
          scheduleWork(function() {
            return flushCompletedChunks(request, destination);
          });
        }
      }
      function startFlowing(request, destination) {
        if (request.status === CLOSING) {
          request.status = CLOSED;
          closeWithError(destination, request.fatalError);
          return;
        }
        if (request.status === CLOSED) {
          return;
        }
        if (request.destination !== null) {
          return;
        }
        request.destination = destination;
        try {
          flushCompletedChunks(request, destination);
        } catch (error2) {
          logRecoverableError(request, error2);
          fatalError(request, error2);
        }
      }
      function stopFlowing(request) {
        request.destination = null;
      }
      function abort(request, reason) {
        try {
          var abortableTasks = request.abortableTasks;
          if (abortableTasks.size > 0) {
            request.pendingChunks++;
            var errorId = request.nextChunkId++;
            if (enablePostpone && typeof reason === "object" && reason !== null && reason.$$typeof === REACT_POSTPONE_TYPE) {
              var postponeInstance = reason;
              logPostpone(request, postponeInstance.message);
              emitPostponeChunk(request, errorId, postponeInstance);
            } else {
              var error2 = reason === undefined ? new Error("The render was aborted by the server without a reason.") : reason;
              var digest = logRecoverableError(request, error2);
              emitErrorChunk(request, errorId, digest, error2);
            }
            abortableTasks.forEach(function(task) {
              return abortTask(task, request, errorId);
            });
            abortableTasks.clear();
          }
          var abortListeners = request.abortListeners;
          if (abortListeners.size > 0) {
            var _error;
            if (enablePostpone && typeof reason === "object" && reason !== null && reason.$$typeof === REACT_POSTPONE_TYPE) {
              _error = new Error("The render was aborted due to being postponed.");
            } else {
              _error = reason === undefined ? new Error("The render was aborted by the server without a reason.") : reason;
            }
            abortListeners.forEach(function(callback) {
              return callback(_error);
            });
            abortListeners.clear();
          }
          if (request.destination !== null) {
            flushCompletedChunks(request, request.destination);
          }
        } catch (error3) {
          logRecoverableError(request, error3);
          fatalError(request, error3);
        }
      }
      function resolveServerReference(config, id) {
        var baseURL = config;
        var idx = id.lastIndexOf("#");
        var exportName = id.slice(idx + 1);
        var fullURL = id.slice(0, idx);
        if (!fullURL.startsWith(baseURL)) {
          throw new Error("Attempted to load a Server Reference outside the hosted root.");
        }
        return {
          specifier: fullURL,
          name: exportName
        };
      }
      var asyncModuleCache = new Map;
      function preloadModule(metadata) {
        var existingPromise = asyncModuleCache.get(metadata.specifier);
        if (existingPromise) {
          if (existingPromise.status === "fulfilled") {
            return null;
          }
          return existingPromise;
        } else {
          var modulePromise = import(metadata.specifier);
          modulePromise.then(function(value) {
            var fulfilledThenable = modulePromise;
            fulfilledThenable.status = "fulfilled";
            fulfilledThenable.value = value;
          }, function(reason) {
            var rejectedThenable = modulePromise;
            rejectedThenable.status = "rejected";
            rejectedThenable.reason = reason;
          });
          asyncModuleCache.set(metadata.specifier, modulePromise);
          return modulePromise;
        }
      }
      function requireModule(metadata) {
        var moduleExports;
        var promise = asyncModuleCache.get(metadata.specifier);
        if (promise.status === "fulfilled") {
          moduleExports = promise.value;
        } else {
          throw promise.reason;
        }
        return moduleExports[metadata.name];
      }
      var PENDING = "pending";
      var BLOCKED = "blocked";
      var RESOLVED_MODEL = "resolved_model";
      var INITIALIZED = "fulfilled";
      var ERRORED = "rejected";
      function Chunk(status, value, reason, response) {
        this.status = status;
        this.value = value;
        this.reason = reason;
        this._response = response;
      }
      Chunk.prototype = Object.create(Promise.prototype);
      Chunk.prototype.then = function(resolve, reject) {
        var chunk = this;
        switch (chunk.status) {
          case RESOLVED_MODEL:
            initializeModelChunk(chunk);
            break;
        }
        switch (chunk.status) {
          case INITIALIZED:
            resolve(chunk.value);
            break;
          case PENDING:
          case BLOCKED:
            if (resolve) {
              if (chunk.value === null) {
                chunk.value = [];
              }
              chunk.value.push(resolve);
            }
            if (reject) {
              if (chunk.reason === null) {
                chunk.reason = [];
              }
              chunk.reason.push(reject);
            }
            break;
          default:
            reject(chunk.reason);
            break;
        }
      };
      function getRoot(response) {
        var chunk = getChunk(response, 0);
        return chunk;
      }
      function createPendingChunk(response) {
        return new Chunk(PENDING, null, null, response);
      }
      function wakeChunk(listeners, value) {
        for (var i = 0;i < listeners.length; i++) {
          var listener = listeners[i];
          listener(value);
        }
      }
      function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
        switch (chunk.status) {
          case INITIALIZED:
            wakeChunk(resolveListeners, chunk.value);
            break;
          case PENDING:
          case BLOCKED:
            chunk.value = resolveListeners;
            chunk.reason = rejectListeners;
            break;
          case ERRORED:
            if (rejectListeners) {
              wakeChunk(rejectListeners, chunk.reason);
            }
            break;
        }
      }
      function triggerErrorOnChunk(chunk, error2) {
        if (chunk.status !== PENDING && chunk.status !== BLOCKED) {
          return;
        }
        var listeners = chunk.reason;
        var erroredChunk = chunk;
        erroredChunk.status = ERRORED;
        erroredChunk.reason = error2;
        if (listeners !== null) {
          wakeChunk(listeners, error2);
        }
      }
      function createResolvedModelChunk(response, value) {
        return new Chunk(RESOLVED_MODEL, value, null, response);
      }
      function resolveModelChunk(chunk, value) {
        if (chunk.status !== PENDING) {
          return;
        }
        var resolveListeners = chunk.value;
        var rejectListeners = chunk.reason;
        var resolvedChunk = chunk;
        resolvedChunk.status = RESOLVED_MODEL;
        resolvedChunk.value = value;
        if (resolveListeners !== null) {
          initializeModelChunk(resolvedChunk);
          wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners);
        }
      }
      function bindArgs$1(fn, args) {
        return fn.bind.apply(fn, [null].concat(args));
      }
      function loadServerReference$1(response, id, bound, parentChunk, parentObject, key) {
        var serverReference = resolveServerReference(response._bundlerConfig, id);
        var preloadPromise = preloadModule(serverReference);
        var promise;
        if (bound) {
          promise = Promise.all([bound, preloadPromise]).then(function(_ref) {
            var args = _ref[0];
            return bindArgs$1(requireModule(serverReference), args);
          });
        } else {
          if (preloadPromise) {
            promise = Promise.resolve(preloadPromise).then(function() {
              return requireModule(serverReference);
            });
          } else {
            return requireModule(serverReference);
          }
        }
        promise.then(createModelResolver(parentChunk, parentObject, key), createModelReject(parentChunk));
        return null;
      }
      var initializingChunk = null;
      var initializingChunkBlockedModel = null;
      function initializeModelChunk(chunk) {
        var prevChunk = initializingChunk;
        var prevBlocked = initializingChunkBlockedModel;
        initializingChunk = chunk;
        initializingChunkBlockedModel = null;
        try {
          var value = JSON.parse(chunk.value, chunk._response._fromJSON);
          if (initializingChunkBlockedModel !== null && initializingChunkBlockedModel.deps > 0) {
            initializingChunkBlockedModel.value = value;
            var blockedChunk = chunk;
            blockedChunk.status = BLOCKED;
            blockedChunk.value = null;
            blockedChunk.reason = null;
          } else {
            var initializedChunk = chunk;
            initializedChunk.status = INITIALIZED;
            initializedChunk.value = value;
          }
        } catch (error2) {
          var erroredChunk = chunk;
          erroredChunk.status = ERRORED;
          erroredChunk.reason = error2;
        } finally {
          initializingChunk = prevChunk;
          initializingChunkBlockedModel = prevBlocked;
        }
      }
      function reportGlobalError(response, error2) {
        response._chunks.forEach(function(chunk) {
          if (chunk.status === PENDING) {
            triggerErrorOnChunk(chunk, error2);
          }
        });
      }
      function getChunk(response, id) {
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        if (!chunk) {
          var prefix = response._prefix;
          var key = prefix + id;
          var backingEntry = response._formData.get(key);
          if (backingEntry != null) {
            chunk = createResolvedModelChunk(response, backingEntry);
          } else {
            chunk = createPendingChunk(response);
          }
          chunks.set(id, chunk);
        }
        return chunk;
      }
      function createModelResolver(chunk, parentObject, key) {
        var blocked;
        if (initializingChunkBlockedModel) {
          blocked = initializingChunkBlockedModel;
          blocked.deps++;
        } else {
          blocked = initializingChunkBlockedModel = {
            deps: 1,
            value: null
          };
        }
        return function(value) {
          parentObject[key] = value;
          blocked.deps--;
          if (blocked.deps === 0) {
            if (chunk.status !== BLOCKED) {
              return;
            }
            var resolveListeners = chunk.value;
            var initializedChunk = chunk;
            initializedChunk.status = INITIALIZED;
            initializedChunk.value = blocked.value;
            if (resolveListeners !== null) {
              wakeChunk(resolveListeners, blocked.value);
            }
          }
        };
      }
      function createModelReject(chunk) {
        return function(error2) {
          return triggerErrorOnChunk(chunk, error2);
        };
      }
      function getOutlinedModel(response, id) {
        var chunk = getChunk(response, id);
        if (chunk.status === RESOLVED_MODEL) {
          initializeModelChunk(chunk);
        }
        if (chunk.status !== INITIALIZED) {
          throw chunk.reason;
        }
        return chunk.value;
      }
      function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey) {
        var id = parseInt(reference.slice(2), 16);
        var prefix = response._prefix;
        var key = prefix + id;
        var backingEntry = response._formData.get(key);
        var promise = constructor === ArrayBuffer ? backingEntry.arrayBuffer() : backingEntry.arrayBuffer().then(function(buffer) {
          return new constructor(buffer);
        });
        var parentChunk = initializingChunk;
        promise.then(createModelResolver(parentChunk, parentObject, parentKey), createModelReject(parentChunk));
        return null;
      }
      function parseModelString(response, obj, key, value) {
        if (value[0] === "$") {
          switch (value[1]) {
            case "$": {
              return value.slice(1);
            }
            case "@": {
              var _id = parseInt(value.slice(2), 16);
              var _chunk = getChunk(response, _id);
              return _chunk;
            }
            case "F": {
              var _id2 = parseInt(value.slice(2), 16);
              var metaData = getOutlinedModel(response, _id2);
              return loadServerReference$1(response, metaData.id, metaData.bound, initializingChunk, obj, key);
            }
            case "T": {
              return createTemporaryReference(value.slice(2));
            }
            case "Q": {
              var _id3 = parseInt(value.slice(2), 16);
              var data = getOutlinedModel(response, _id3);
              return new Map(data);
            }
            case "W": {
              var _id4 = parseInt(value.slice(2), 16);
              var _data = getOutlinedModel(response, _id4);
              return new Set(_data);
            }
            case "K": {
              var stringId = value.slice(2);
              var formPrefix = response._prefix + stringId + "_";
              var _data2 = new FormData;
              var backingFormData = response._formData;
              backingFormData.forEach(function(entry, entryKey) {
                if (entryKey.startsWith(formPrefix)) {
                  _data2.append(entryKey.slice(formPrefix.length), entry);
                }
              });
              return _data2;
            }
            case "I": {
              return Infinity;
            }
            case "-": {
              if (value === "$-0") {
                return -0;
              } else {
                return (-Infinity);
              }
            }
            case "N": {
              return NaN;
            }
            case "u": {
              return;
            }
            case "D": {
              return new Date(Date.parse(value.slice(2)));
            }
            case "n": {
              return BigInt(value.slice(2));
            }
          }
          {
            switch (value[1]) {
              case "A":
                return parseTypedArray(response, value, ArrayBuffer, 1, obj, key);
              case "O":
                return parseTypedArray(response, value, Int8Array, 1, obj, key);
              case "o":
                return parseTypedArray(response, value, Uint8Array, 1, obj, key);
              case "U":
                return parseTypedArray(response, value, Uint8ClampedArray, 1, obj, key);
              case "S":
                return parseTypedArray(response, value, Int16Array, 2, obj, key);
              case "s":
                return parseTypedArray(response, value, Uint16Array, 2, obj, key);
              case "L":
                return parseTypedArray(response, value, Int32Array, 4, obj, key);
              case "l":
                return parseTypedArray(response, value, Uint32Array, 4, obj, key);
              case "G":
                return parseTypedArray(response, value, Float32Array, 4, obj, key);
              case "g":
                return parseTypedArray(response, value, Float64Array, 8, obj, key);
              case "M":
                return parseTypedArray(response, value, BigInt64Array, 8, obj, key);
              case "m":
                return parseTypedArray(response, value, BigUint64Array, 8, obj, key);
              case "V":
                return parseTypedArray(response, value, DataView, 1, obj, key);
              case "B": {
                var _id5 = parseInt(value.slice(2), 16);
                var prefix = response._prefix;
                var blobKey = prefix + _id5;
                var backingEntry = response._formData.get(blobKey);
                return backingEntry;
              }
            }
          }
          var id = parseInt(value.slice(1), 16);
          var chunk = getChunk(response, id);
          switch (chunk.status) {
            case RESOLVED_MODEL:
              initializeModelChunk(chunk);
              break;
          }
          switch (chunk.status) {
            case INITIALIZED:
              return chunk.value;
            case PENDING:
            case BLOCKED:
              var parentChunk = initializingChunk;
              chunk.then(createModelResolver(parentChunk, obj, key), createModelReject(parentChunk));
              return null;
            default:
              throw chunk.reason;
          }
        }
        return value;
      }
      function createResponse(bundlerConfig, formFieldPrefix) {
        var backingFormData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new FormData;
        var chunks = new Map;
        var response = {
          _bundlerConfig: bundlerConfig,
          _prefix: formFieldPrefix,
          _formData: backingFormData,
          _chunks: chunks,
          _fromJSON: function(key, value) {
            if (typeof value === "string") {
              return parseModelString(response, this, key, value);
            }
            return value;
          }
        };
        return response;
      }
      function resolveField(response, key, value) {
        response._formData.append(key, value);
        var prefix = response._prefix;
        if (key.startsWith(prefix)) {
          var chunks = response._chunks;
          var id = +key.slice(prefix.length);
          var chunk = chunks.get(id);
          if (chunk) {
            resolveModelChunk(chunk, value);
          }
        }
      }
      function resolveFileInfo(response, key, filename, mime) {
        return {
          chunks: [],
          filename,
          mime
        };
      }
      function resolveFileChunk(response, handle, chunk) {
        handle.chunks.push(chunk);
      }
      function resolveFileComplete(response, key, handle) {
        var blob = new Blob(handle.chunks, {
          type: handle.mime
        });
        response._formData.append(key, blob, handle.filename);
      }
      function close(response) {
        reportGlobalError(response, new Error("Connection closed."));
      }
      function bindArgs(fn, args) {
        return fn.bind.apply(fn, [null].concat(args));
      }
      function loadServerReference(bundlerConfig, id, bound) {
        var serverReference = resolveServerReference(bundlerConfig, id);
        var preloadPromise = preloadModule(serverReference);
        if (bound) {
          return Promise.all([bound, preloadPromise]).then(function(_ref) {
            var args = _ref[0];
            return bindArgs(requireModule(serverReference), args);
          });
        } else if (preloadPromise) {
          return Promise.resolve(preloadPromise).then(function() {
            return requireModule(serverReference);
          });
        } else {
          return Promise.resolve(requireModule(serverReference));
        }
      }
      function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix) {
        var actionResponse = createResponse(serverManifest, formFieldPrefix, body);
        close(actionResponse);
        var refPromise = getRoot(actionResponse);
        refPromise.then(function() {
        });
        if (refPromise.status !== "fulfilled") {
          throw refPromise.reason;
        }
        return refPromise.value;
      }
      function decodeAction(body, serverManifest) {
        var formData = new FormData;
        var action = null;
        body.forEach(function(value, key) {
          if (!key.startsWith("$ACTION_")) {
            formData.append(key, value);
            return;
          }
          if (key.startsWith("$ACTION_REF_")) {
            var formFieldPrefix = "$ACTION_" + key.slice(12) + ":";
            var metaData = decodeBoundActionMetaData(body, serverManifest, formFieldPrefix);
            action = loadServerReference(serverManifest, metaData.id, metaData.bound);
            return;
          }
          if (key.startsWith("$ACTION_ID_")) {
            var id = key.slice(11);
            action = loadServerReference(serverManifest, id, null);
            return;
          }
        });
        if (action === null) {
          return null;
        }
        return action.then(function(fn) {
          return fn.bind(null, formData);
        });
      }
      function decodeFormState(actionResult, body, serverManifest) {
        var keyPath = body.get("$ACTION_KEY");
        if (typeof keyPath !== "string") {
          return Promise.resolve(null);
        }
        var metaData = null;
        body.forEach(function(value, key) {
          if (key.startsWith("$ACTION_REF_")) {
            var formFieldPrefix = "$ACTION_" + key.slice(12) + ":";
            metaData = decodeBoundActionMetaData(body, serverManifest, formFieldPrefix);
          }
        });
        if (metaData === null) {
          return Promise.resolve(null);
        }
        var referenceId = metaData.id;
        return Promise.resolve(metaData.bound).then(function(bound) {
          if (bound === null) {
            return null;
          }
          var boundArity = bound.length - 1;
          return [actionResult, keyPath, referenceId, boundArity];
        });
      }
      function createDrainHandler(destination, request) {
        return function() {
          return startFlowing(request, destination);
        };
      }
      function renderToPipeableStream(model, moduleBasePath, options) {
        var request = createRequest(model, moduleBasePath, options ? options.onError : undefined, options ? options.identifierPrefix : undefined, options ? options.onPostpone : undefined, options ? options.environmentName : undefined);
        var hasStartedFlowing = false;
        startWork(request);
        return {
          pipe: function(destination) {
            if (hasStartedFlowing) {
              throw new Error("React currently only supports piping to one writable stream.");
            }
            hasStartedFlowing = true;
            startFlowing(request, destination);
            destination.on("drain", createDrainHandler(destination, request));
            return destination;
          },
          abort: function(reason) {
            stopFlowing(request);
            abort(request, reason);
          }
        };
      }
      function decodeReplyFromBusboy(busboyStream, moduleBasePath) {
        var response = createResponse(moduleBasePath, "");
        var pendingFiles = 0;
        var queuedFields = [];
        busboyStream.on("field", function(name, value) {
          if (pendingFiles > 0) {
            queuedFields.push(name, value);
          } else {
            resolveField(response, name, value);
          }
        });
        busboyStream.on("file", function(name, value, _ref) {
          var { filename, encoding, mimeType } = _ref;
          if (encoding.toLowerCase() === "base64") {
            throw new Error("React doesn't accept base64 encoded file uploads because we don't expect form data passed from a browser to ever encode data that way. If that's the wrong assumption, we can easily fix it.");
          }
          pendingFiles++;
          var file = resolveFileInfo(response, name, filename, mimeType);
          value.on("data", function(chunk) {
            resolveFileChunk(response, file, chunk);
          });
          value.on("end", function() {
            resolveFileComplete(response, name, file);
            pendingFiles--;
            if (pendingFiles === 0) {
              for (var i = 0;i < queuedFields.length; i += 2) {
                resolveField(response, queuedFields[i], queuedFields[i + 1]);
              }
              queuedFields.length = 0;
            }
          });
        });
        busboyStream.on("finish", function() {
          close(response);
        });
        busboyStream.on("error", function(err) {
          reportGlobalError(response, err);
        });
        return getRoot(response);
      }
      function decodeReply(body, moduleBasePath) {
        if (typeof body === "string") {
          var form = new FormData;
          form.append("0", body);
          body = form;
        }
        var response = createResponse(moduleBasePath, "", body);
        var root = getRoot(response);
        close(response);
        return root;
      }
      exports.decodeAction = decodeAction;
      exports.decodeFormState = decodeFormState;
      exports.decodeReply = decodeReply;
      exports.decodeReplyFromBusboy = decodeReplyFromBusboy;
      exports.registerClientReference = registerClientReference;
      exports.registerServerReference = registerServerReference;
      exports.renderToPipeableStream = renderToPipeableStream;
    })();
  }
});

// node_modules/react-server-dom-esm/server.node.js
var require_server_node = __commonJS((exports, module) => {
  if (false) {
  } else {
    module.exports = require_react_server_dom_esm_server_node_development();
  }
});

// node_modules/busboy/lib/utils.js
var require_utils = __commonJS((exports, module) => {
  var parseContentType = function(str) {
    if (str.length === 0)
      return;
    const params = Object.create(null);
    let i = 0;
    for (;i < str.length; ++i) {
      const code = str.charCodeAt(i);
      if (TOKEN[code] !== 1) {
        if (code !== 47 || i === 0)
          return;
        break;
      }
    }
    if (i === str.length)
      return;
    const type = str.slice(0, i).toLowerCase();
    const subtypeStart = ++i;
    for (;i < str.length; ++i) {
      const code = str.charCodeAt(i);
      if (TOKEN[code] !== 1) {
        if (i === subtypeStart)
          return;
        if (parseContentTypeParams(str, i, params) === undefined)
          return;
        break;
      }
    }
    if (i === subtypeStart)
      return;
    const subtype = str.slice(subtypeStart, i).toLowerCase();
    return { type, subtype, params };
  };
  var parseContentTypeParams = function(str, i, params) {
    while (i < str.length) {
      for (;i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        break;
      if (str.charCodeAt(i++) !== 59)
        return;
      for (;i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        return;
      let name;
      const nameStart = i;
      for (;i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code !== 61)
            return;
          break;
        }
      }
      if (i === str.length)
        return;
      name = str.slice(nameStart, i);
      ++i;
      if (i === str.length)
        return;
      let value = "";
      let valueStart;
      if (str.charCodeAt(i) === 34) {
        valueStart = ++i;
        let escaping = false;
        for (;i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code === 92) {
            if (escaping) {
              valueStart = i;
              escaping = false;
            } else {
              value += str.slice(valueStart, i);
              escaping = true;
            }
            continue;
          }
          if (code === 34) {
            if (escaping) {
              valueStart = i;
              escaping = false;
              continue;
            }
            value += str.slice(valueStart, i);
            break;
          }
          if (escaping) {
            valueStart = i - 1;
            escaping = false;
          }
          if (QDTEXT[code] !== 1)
            return;
        }
        if (i === str.length)
          return;
        ++i;
      } else {
        valueStart = i;
        for (;i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (i === valueStart)
              return;
            break;
          }
        }
        value = str.slice(valueStart, i);
      }
      name = name.toLowerCase();
      if (params[name] === undefined)
        params[name] = value;
    }
    return params;
  };
  var parseDisposition = function(str, defDecoder) {
    if (str.length === 0)
      return;
    const params = Object.create(null);
    let i = 0;
    for (;i < str.length; ++i) {
      const code = str.charCodeAt(i);
      if (TOKEN[code] !== 1) {
        if (parseDispositionParams(str, i, params, defDecoder) === undefined)
          return;
        break;
      }
    }
    const type = str.slice(0, i).toLowerCase();
    return { type, params };
  };
  var parseDispositionParams = function(str, i, params, defDecoder) {
    while (i < str.length) {
      for (;i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        break;
      if (str.charCodeAt(i++) !== 59)
        return;
      for (;i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        return;
      let name;
      const nameStart = i;
      for (;i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code === 61)
            break;
          return;
        }
      }
      if (i === str.length)
        return;
      let value = "";
      let valueStart;
      let charset;
      name = str.slice(nameStart, i);
      if (name.charCodeAt(name.length - 1) === 42) {
        const charsetStart = ++i;
        for (;i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (CHARSET[code] !== 1) {
            if (code !== 39)
              return;
            break;
          }
        }
        if (i === str.length)
          return;
        charset = str.slice(charsetStart, i);
        ++i;
        for (;i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code === 39)
            break;
        }
        if (i === str.length)
          return;
        ++i;
        if (i === str.length)
          return;
        valueStart = i;
        let encode = 0;
        for (;i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (EXTENDED_VALUE[code] !== 1) {
            if (code === 37) {
              let hexUpper;
              let hexLower;
              if (i + 2 < str.length && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1 && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
                const byteVal = (hexUpper << 4) + hexLower;
                value += str.slice(valueStart, i);
                value += String.fromCharCode(byteVal);
                i += 2;
                valueStart = i + 1;
                if (byteVal >= 128)
                  encode = 2;
                else if (encode === 0)
                  encode = 1;
                continue;
              }
              return;
            }
            break;
          }
        }
        value += str.slice(valueStart, i);
        value = convertToUTF8(value, charset, encode);
        if (value === undefined)
          return;
      } else {
        ++i;
        if (i === str.length)
          return;
        if (str.charCodeAt(i) === 34) {
          valueStart = ++i;
          let escaping = false;
          for (;i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 92) {
              if (escaping) {
                valueStart = i;
                escaping = false;
              } else {
                value += str.slice(valueStart, i);
                escaping = true;
              }
              continue;
            }
            if (code === 34) {
              if (escaping) {
                valueStart = i;
                escaping = false;
                continue;
              }
              value += str.slice(valueStart, i);
              break;
            }
            if (escaping) {
              valueStart = i - 1;
              escaping = false;
            }
            if (QDTEXT[code] !== 1)
              return;
          }
          if (i === str.length)
            return;
          ++i;
        } else {
          valueStart = i;
          for (;i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (TOKEN[code] !== 1) {
              if (i === valueStart)
                return;
              break;
            }
          }
          value = str.slice(valueStart, i);
        }
        value = defDecoder(value, 2);
        if (value === undefined)
          return;
      }
      name = name.toLowerCase();
      if (params[name] === undefined)
        params[name] = value;
    }
    return params;
  };
  var getDecoder = function(charset) {
    let lc;
    while (true) {
      switch (charset) {
        case "utf-8":
        case "utf8":
          return decoders.utf8;
        case "latin1":
        case "ascii":
        case "us-ascii":
        case "iso-8859-1":
        case "iso8859-1":
        case "iso88591":
        case "iso_8859-1":
        case "windows-1252":
        case "iso_8859-1:1987":
        case "cp1252":
        case "x-cp1252":
          return decoders.latin1;
        case "utf16le":
        case "utf-16le":
        case "ucs2":
        case "ucs-2":
          return decoders.utf16le;
        case "base64":
          return decoders.base64;
        default:
          if (lc === undefined) {
            lc = true;
            charset = charset.toLowerCase();
            continue;
          }
          return decoders.other.bind(charset);
      }
    }
  };
  var convertToUTF8 = function(data, charset, hint) {
    const decode = getDecoder(charset);
    if (decode)
      return decode(data, hint);
  };
  var basename = function(path) {
    if (typeof path !== "string")
      return "";
    for (let i = path.length - 1;i >= 0; --i) {
      switch (path.charCodeAt(i)) {
        case 47:
        case 92:
          path = path.slice(i + 1);
          return path === ".." || path === "." ? "" : path;
      }
    }
    return path === ".." || path === "." ? "" : path;
  };
  var decoders = {
    utf8: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string") {
        if (hint < 2)
          return data;
        data = Buffer.from(data, "latin1");
      }
      return data.utf8Slice(0, data.length);
    },
    latin1: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        return data;
      return data.latin1Slice(0, data.length);
    },
    utf16le: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        data = Buffer.from(data, "latin1");
      return data.ucs2Slice(0, data.length);
    },
    base64: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        data = Buffer.from(data, "latin1");
      return data.base64Slice(0, data.length);
    },
    other: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        data = Buffer.from(data, "latin1");
      try {
        const decoder = new TextDecoder(exports);
        return decoder.decode(data);
      } catch {
      }
    }
  };
  var TOKEN = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  var QDTEXT = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  var CHARSET = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  var EXTENDED_VALUE = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  var HEX_VALUES = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ];
  module.exports = {
    basename,
    convertToUTF8,
    getDecoder,
    parseContentType,
    parseDisposition
  };
});

// node_modules/streamsearch/lib/sbmh.js
var require_sbmh = __commonJS((exports, module) => {
  var memcmp = function(buf1, pos1, buf2, pos2, num) {
    for (let i = 0;i < num; ++i) {
      if (buf1[pos1 + i] !== buf2[pos2 + i])
        return false;
    }
    return true;
  };
  var feed = function(self, data) {
    const len = data.length;
    const needle = self._needle;
    const needleLen = needle.length;
    let pos = -self._lookbehindSize;
    const lastNeedleCharPos = needleLen - 1;
    const lastNeedleChar = needle[lastNeedleCharPos];
    const end = len - needleLen;
    const occ = self._occ;
    const lookbehind = self._lookbehind;
    if (pos < 0) {
      while (pos < 0 && pos <= end) {
        const nextPos = pos + lastNeedleCharPos;
        const ch = nextPos < 0 ? lookbehind[self._lookbehindSize + nextPos] : data[nextPos];
        if (ch === lastNeedleChar && matchNeedle(self, data, pos, lastNeedleCharPos)) {
          self._lookbehindSize = 0;
          ++self.matches;
          if (pos > -self._lookbehindSize)
            self._cb(true, lookbehind, 0, self._lookbehindSize + pos, false);
          else
            self._cb(true, undefined, 0, 0, true);
          return self._bufPos = pos + needleLen;
        }
        pos += occ[ch];
      }
      while (pos < 0 && !matchNeedle(self, data, pos, len - pos))
        ++pos;
      if (pos < 0) {
        const bytesToCutOff = self._lookbehindSize + pos;
        if (bytesToCutOff > 0) {
          self._cb(false, lookbehind, 0, bytesToCutOff, false);
        }
        self._lookbehindSize -= bytesToCutOff;
        lookbehind.copy(lookbehind, 0, bytesToCutOff, self._lookbehindSize);
        lookbehind.set(data, self._lookbehindSize);
        self._lookbehindSize += len;
        self._bufPos = len;
        return len;
      }
      self._cb(false, lookbehind, 0, self._lookbehindSize, false);
      self._lookbehindSize = 0;
    }
    pos += self._bufPos;
    const firstNeedleChar = needle[0];
    while (pos <= end) {
      const ch = data[pos + lastNeedleCharPos];
      if (ch === lastNeedleChar && data[pos] === firstNeedleChar && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
        ++self.matches;
        if (pos > 0)
          self._cb(true, data, self._bufPos, pos, true);
        else
          self._cb(true, undefined, 0, 0, true);
        return self._bufPos = pos + needleLen;
      }
      pos += occ[ch];
    }
    while (pos < len) {
      if (data[pos] !== firstNeedleChar || !memcmp(data, pos, needle, 0, len - pos)) {
        ++pos;
        continue;
      }
      data.copy(lookbehind, 0, pos, len);
      self._lookbehindSize = len - pos;
      break;
    }
    if (pos > 0)
      self._cb(false, data, self._bufPos, pos < len ? pos : len, true);
    self._bufPos = len;
    return len;
  };
  var matchNeedle = function(self, data, pos, len) {
    const lb = self._lookbehind;
    const lbSize = self._lookbehindSize;
    const needle = self._needle;
    for (let i = 0;i < len; ++i, ++pos) {
      const ch = pos < 0 ? lb[lbSize + pos] : data[pos];
      if (ch !== needle[i])
        return false;
    }
    return true;
  };

  class SBMH {
    constructor(needle, cb) {
      if (typeof cb !== "function")
        throw new Error("Missing match callback");
      if (typeof needle === "string")
        needle = Buffer.from(needle);
      else if (!Buffer.isBuffer(needle))
        throw new Error(`Expected Buffer for needle, got ${typeof needle}`);
      const needleLen = needle.length;
      this.maxMatches = Infinity;
      this.matches = 0;
      this._cb = cb;
      this._lookbehindSize = 0;
      this._needle = needle;
      this._bufPos = 0;
      this._lookbehind = Buffer.allocUnsafe(needleLen);
      this._occ = [
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen
      ];
      if (needleLen > 1) {
        for (let i = 0;i < needleLen - 1; ++i)
          this._occ[needle[i]] = needleLen - 1 - i;
      }
    }
    reset() {
      this.matches = 0;
      this._lookbehindSize = 0;
      this._bufPos = 0;
    }
    push(chunk, pos) {
      let result;
      if (!Buffer.isBuffer(chunk))
        chunk = Buffer.from(chunk, "latin1");
      const chunkLen = chunk.length;
      this._bufPos = pos || 0;
      while (result !== chunkLen && this.matches < this.maxMatches)
        result = feed(this, chunk);
      return result;
    }
    destroy() {
      const lbSize = this._lookbehindSize;
      if (lbSize)
        this._cb(false, this._lookbehind, 0, lbSize, false);
      this.reset();
    }
  }
  module.exports = SBMH;
});

// node_modules/busboy/lib/types/multipart.js
var require_multipart = __commonJS((exports, module) => {
  var noop = function() {
  };
  var callAndUnsetCb = function(self, err) {
    const cb = self._writecb;
    self._writecb = null;
    if (err)
      self.destroy(err);
    else if (cb)
      cb();
  };
  var nullDecoder = function(val, hint) {
    return val;
  };
  var finalcb = function(self, cb, err) {
    if (err)
      return cb(err);
    err = checkEndState(self);
    cb(err);
  };
  var checkEndState = function(self) {
    if (self._hparser)
      return new Error("Malformed part header");
    const fileStream = self._fileStream;
    if (fileStream) {
      self._fileStream = null;
      fileStream.destroy(new Error("Unexpected end of file"));
    }
    if (!self._complete)
      return new Error("Unexpected end of form");
  };
  var { Readable, Writable } = import.meta.require("stream");
  var StreamSearch = require_sbmh();
  var {
    basename,
    convertToUTF8,
    getDecoder,
    parseContentType,
    parseDisposition
  } = require_utils();
  var BUF_CRLF = Buffer.from("\r\n");
  var BUF_CR = Buffer.from("\r");
  var BUF_DASH = Buffer.from("-");
  var MAX_HEADER_PAIRS = 2000;
  var MAX_HEADER_SIZE = 16 * 1024;
  var HPARSER_NAME = 0;
  var HPARSER_PRE_OWS = 1;
  var HPARSER_VALUE = 2;

  class HeaderParser {
    constructor(cb) {
      this.header = Object.create(null);
      this.pairCount = 0;
      this.byteCount = 0;
      this.state = HPARSER_NAME;
      this.name = "";
      this.value = "";
      this.crlf = 0;
      this.cb = cb;
    }
    reset() {
      this.header = Object.create(null);
      this.pairCount = 0;
      this.byteCount = 0;
      this.state = HPARSER_NAME;
      this.name = "";
      this.value = "";
      this.crlf = 0;
    }
    push(chunk, pos, end) {
      let start = pos;
      while (pos < end) {
        switch (this.state) {
          case HPARSER_NAME: {
            let done = false;
            for (;pos < end; ++pos) {
              if (this.byteCount === MAX_HEADER_SIZE)
                return -1;
              ++this.byteCount;
              const code = chunk[pos];
              if (TOKEN[code] !== 1) {
                if (code !== 58)
                  return -1;
                this.name += chunk.latin1Slice(start, pos);
                if (this.name.length === 0)
                  return -1;
                ++pos;
                done = true;
                this.state = HPARSER_PRE_OWS;
                break;
              }
            }
            if (!done) {
              this.name += chunk.latin1Slice(start, pos);
              break;
            }
          }
          case HPARSER_PRE_OWS: {
            let done = false;
            for (;pos < end; ++pos) {
              if (this.byteCount === MAX_HEADER_SIZE)
                return -1;
              ++this.byteCount;
              const code = chunk[pos];
              if (code !== 32 && code !== 9) {
                start = pos;
                done = true;
                this.state = HPARSER_VALUE;
                break;
              }
            }
            if (!done)
              break;
          }
          case HPARSER_VALUE:
            switch (this.crlf) {
              case 0:
                for (;pos < end; ++pos) {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  const code = chunk[pos];
                  if (FIELD_VCHAR[code] !== 1) {
                    if (code !== 13)
                      return -1;
                    ++this.crlf;
                    break;
                  }
                }
                this.value += chunk.latin1Slice(start, pos++);
                break;
              case 1:
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                if (chunk[pos++] !== 10)
                  return -1;
                ++this.crlf;
                break;
              case 2: {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (code === 32 || code === 9) {
                  start = pos;
                  this.crlf = 0;
                } else {
                  if (++this.pairCount < MAX_HEADER_PAIRS) {
                    this.name = this.name.toLowerCase();
                    if (this.header[this.name] === undefined)
                      this.header[this.name] = [this.value];
                    else
                      this.header[this.name].push(this.value);
                  }
                  if (code === 13) {
                    ++this.crlf;
                    ++pos;
                  } else {
                    start = pos;
                    this.crlf = 0;
                    this.state = HPARSER_NAME;
                    this.name = "";
                    this.value = "";
                  }
                }
                break;
              }
              case 3: {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                if (chunk[pos++] !== 10)
                  return -1;
                const header = this.header;
                this.reset();
                this.cb(header);
                return pos;
              }
            }
            break;
        }
      }
      return pos;
    }
  }

  class FileStream extends Readable {
    constructor(opts, owner) {
      super(opts);
      this.truncated = false;
      this._readcb = null;
      this.once("end", () => {
        this._read();
        if (--owner._fileEndsLeft === 0 && owner._finalcb) {
          const cb = owner._finalcb;
          owner._finalcb = null;
          process.nextTick(cb);
        }
      });
    }
    _read(n) {
      const cb = this._readcb;
      if (cb) {
        this._readcb = null;
        cb();
      }
    }
  }
  var ignoreData = {
    push: (chunk, pos) => {
    },
    destroy: () => {
    }
  };

  class Multipart extends Writable {
    constructor(cfg) {
      const streamOpts = {
        autoDestroy: true,
        emitClose: true,
        highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : undefined
      };
      super(streamOpts);
      if (!cfg.conType.params || typeof cfg.conType.params.boundary !== "string")
        throw new Error("Multipart: Boundary not found");
      const boundary = cfg.conType.params.boundary;
      const paramDecoder = typeof cfg.defParamCharset === "string" && cfg.defParamCharset ? getDecoder(cfg.defParamCharset) : nullDecoder;
      const defCharset = cfg.defCharset || "utf8";
      const preservePath = cfg.preservePath;
      const fileOpts = {
        autoDestroy: true,
        emitClose: true,
        highWaterMark: typeof cfg.fileHwm === "number" ? cfg.fileHwm : undefined
      };
      const limits = cfg.limits;
      const fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
      const fileSizeLimit = limits && typeof limits.fileSize === "number" ? limits.fileSize : Infinity;
      const filesLimit = limits && typeof limits.files === "number" ? limits.files : Infinity;
      const fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
      const partsLimit = limits && typeof limits.parts === "number" ? limits.parts : Infinity;
      let parts = -1;
      let fields = 0;
      let files = 0;
      let skipPart = false;
      this._fileEndsLeft = 0;
      this._fileStream = undefined;
      this._complete = false;
      let fileSize = 0;
      let field;
      let fieldSize = 0;
      let partCharset;
      let partEncoding;
      let partType;
      let partName;
      let partTruncated = false;
      let hitFilesLimit = false;
      let hitFieldsLimit = false;
      this._hparser = null;
      const hparser = new HeaderParser((header) => {
        this._hparser = null;
        skipPart = false;
        partType = "text/plain";
        partCharset = defCharset;
        partEncoding = "7bit";
        partName = undefined;
        partTruncated = false;
        let filename;
        if (!header["content-disposition"]) {
          skipPart = true;
          return;
        }
        const disp = parseDisposition(header["content-disposition"][0], paramDecoder);
        if (!disp || disp.type !== "form-data") {
          skipPart = true;
          return;
        }
        if (disp.params) {
          if (disp.params.name)
            partName = disp.params.name;
          if (disp.params["filename*"])
            filename = disp.params["filename*"];
          else if (disp.params.filename)
            filename = disp.params.filename;
          if (filename !== undefined && !preservePath)
            filename = basename(filename);
        }
        if (header["content-type"]) {
          const conType = parseContentType(header["content-type"][0]);
          if (conType) {
            partType = `${conType.type}/${conType.subtype}`;
            if (conType.params && typeof conType.params.charset === "string")
              partCharset = conType.params.charset.toLowerCase();
          }
        }
        if (header["content-transfer-encoding"])
          partEncoding = header["content-transfer-encoding"][0].toLowerCase();
        if (partType === "application/octet-stream" || filename !== undefined) {
          if (files === filesLimit) {
            if (!hitFilesLimit) {
              hitFilesLimit = true;
              this.emit("filesLimit");
            }
            skipPart = true;
            return;
          }
          ++files;
          if (this.listenerCount("file") === 0) {
            skipPart = true;
            return;
          }
          fileSize = 0;
          this._fileStream = new FileStream(fileOpts, this);
          ++this._fileEndsLeft;
          this.emit("file", partName, this._fileStream, {
            filename,
            encoding: partEncoding,
            mimeType: partType
          });
        } else {
          if (fields === fieldsLimit) {
            if (!hitFieldsLimit) {
              hitFieldsLimit = true;
              this.emit("fieldsLimit");
            }
            skipPart = true;
            return;
          }
          ++fields;
          if (this.listenerCount("field") === 0) {
            skipPart = true;
            return;
          }
          field = [];
          fieldSize = 0;
        }
      });
      let matchPostBoundary = 0;
      const ssCb = (isMatch, data, start, end, isDataSafe) => {
        retrydata:
          while (data) {
            if (this._hparser !== null) {
              const ret = this._hparser.push(data, start, end);
              if (ret === -1) {
                this._hparser = null;
                hparser.reset();
                this.emit("error", new Error("Malformed part header"));
                break;
              }
              start = ret;
            }
            if (start === end)
              break;
            if (matchPostBoundary !== 0) {
              if (matchPostBoundary === 1) {
                switch (data[start]) {
                  case 45:
                    matchPostBoundary = 2;
                    ++start;
                    break;
                  case 13:
                    matchPostBoundary = 3;
                    ++start;
                    break;
                  default:
                    matchPostBoundary = 0;
                }
                if (start === end)
                  return;
              }
              if (matchPostBoundary === 2) {
                matchPostBoundary = 0;
                if (data[start] === 45) {
                  this._complete = true;
                  this._bparser = ignoreData;
                  return;
                }
                const writecb = this._writecb;
                this._writecb = noop;
                ssCb(false, BUF_DASH, 0, 1, false);
                this._writecb = writecb;
              } else if (matchPostBoundary === 3) {
                matchPostBoundary = 0;
                if (data[start] === 10) {
                  ++start;
                  if (parts >= partsLimit)
                    break;
                  this._hparser = hparser;
                  if (start === end)
                    break;
                  continue retrydata;
                } else {
                  const writecb = this._writecb;
                  this._writecb = noop;
                  ssCb(false, BUF_CR, 0, 1, false);
                  this._writecb = writecb;
                }
              }
            }
            if (!skipPart) {
              if (this._fileStream) {
                let chunk;
                const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
                if (!isDataSafe) {
                  chunk = Buffer.allocUnsafe(actualLen);
                  data.copy(chunk, 0, start, start + actualLen);
                } else {
                  chunk = data.slice(start, start + actualLen);
                }
                fileSize += chunk.length;
                if (fileSize === fileSizeLimit) {
                  if (chunk.length > 0)
                    this._fileStream.push(chunk);
                  this._fileStream.emit("limit");
                  this._fileStream.truncated = true;
                  skipPart = true;
                } else if (!this._fileStream.push(chunk)) {
                  if (this._writecb)
                    this._fileStream._readcb = this._writecb;
                  this._writecb = null;
                }
              } else if (field !== undefined) {
                let chunk;
                const actualLen = Math.min(end - start, fieldSizeLimit - fieldSize);
                if (!isDataSafe) {
                  chunk = Buffer.allocUnsafe(actualLen);
                  data.copy(chunk, 0, start, start + actualLen);
                } else {
                  chunk = data.slice(start, start + actualLen);
                }
                fieldSize += actualLen;
                field.push(chunk);
                if (fieldSize === fieldSizeLimit) {
                  skipPart = true;
                  partTruncated = true;
                }
              }
            }
            break;
          }
        if (isMatch) {
          matchPostBoundary = 1;
          if (this._fileStream) {
            this._fileStream.push(null);
            this._fileStream = null;
          } else if (field !== undefined) {
            let data2;
            switch (field.length) {
              case 0:
                data2 = "";
                break;
              case 1:
                data2 = convertToUTF8(field[0], partCharset, 0);
                break;
              default:
                data2 = convertToUTF8(Buffer.concat(field, fieldSize), partCharset, 0);
            }
            field = undefined;
            fieldSize = 0;
            this.emit("field", partName, data2, {
              nameTruncated: false,
              valueTruncated: partTruncated,
              encoding: partEncoding,
              mimeType: partType
            });
          }
          if (++parts === partsLimit)
            this.emit("partsLimit");
        }
      };
      this._bparser = new StreamSearch(`\r\n--${boundary}`, ssCb);
      this._writecb = null;
      this._finalcb = null;
      this.write(BUF_CRLF);
    }
    static detect(conType) {
      return conType.type === "multipart" && conType.subtype === "form-data";
    }
    _write(chunk, enc, cb) {
      this._writecb = cb;
      this._bparser.push(chunk, 0);
      if (this._writecb)
        callAndUnsetCb(this);
    }
    _destroy(err, cb) {
      this._hparser = null;
      this._bparser = ignoreData;
      if (!err)
        err = checkEndState(this);
      const fileStream = this._fileStream;
      if (fileStream) {
        this._fileStream = null;
        fileStream.destroy(err);
      }
      cb(err);
    }
    _final(cb) {
      this._bparser.destroy();
      if (!this._complete)
        return cb(new Error("Unexpected end of form"));
      if (this._fileEndsLeft)
        this._finalcb = finalcb.bind(null, this, cb);
      else
        finalcb(this, cb);
    }
  }
  var TOKEN = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  var FIELD_VCHAR = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  module.exports = Multipart;
});

// node_modules/busboy/lib/types/urlencoded.js
var require_urlencoded = __commonJS((exports, module) => {
  var readPctEnc = function(self, chunk, pos, len) {
    if (pos >= len)
      return len;
    if (self._byte === -1) {
      const hexUpper = HEX_VALUES[chunk[pos++]];
      if (hexUpper === -1)
        return -1;
      if (hexUpper >= 8)
        self._encode = 2;
      if (pos < len) {
        const hexLower = HEX_VALUES[chunk[pos++]];
        if (hexLower === -1)
          return -1;
        if (self._inKey)
          self._key += String.fromCharCode((hexUpper << 4) + hexLower);
        else
          self._val += String.fromCharCode((hexUpper << 4) + hexLower);
        self._byte = -2;
        self._lastPos = pos;
      } else {
        self._byte = hexUpper;
      }
    } else {
      const hexLower = HEX_VALUES[chunk[pos++]];
      if (hexLower === -1)
        return -1;
      if (self._inKey)
        self._key += String.fromCharCode((self._byte << 4) + hexLower);
      else
        self._val += String.fromCharCode((self._byte << 4) + hexLower);
      self._byte = -2;
      self._lastPos = pos;
    }
    return pos;
  };
  var skipKeyBytes = function(self, chunk, pos, len) {
    if (self._bytesKey > self.fieldNameSizeLimit) {
      if (!self._keyTrunc) {
        if (self._lastPos < pos)
          self._key += chunk.latin1Slice(self._lastPos, pos - 1);
      }
      self._keyTrunc = true;
      for (;pos < len; ++pos) {
        const code = chunk[pos];
        if (code === 61 || code === 38)
          break;
        ++self._bytesKey;
      }
      self._lastPos = pos;
    }
    return pos;
  };
  var skipValBytes = function(self, chunk, pos, len) {
    if (self._bytesVal > self.fieldSizeLimit) {
      if (!self._valTrunc) {
        if (self._lastPos < pos)
          self._val += chunk.latin1Slice(self._lastPos, pos - 1);
      }
      self._valTrunc = true;
      for (;pos < len; ++pos) {
        if (chunk[pos] === 38)
          break;
        ++self._bytesVal;
      }
      self._lastPos = pos;
    }
    return pos;
  };
  var { Writable } = import.meta.require("stream");
  var { getDecoder } = require_utils();

  class URLEncoded extends Writable {
    constructor(cfg) {
      const streamOpts = {
        autoDestroy: true,
        emitClose: true,
        highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : undefined
      };
      super(streamOpts);
      let charset = cfg.defCharset || "utf8";
      if (cfg.conType.params && typeof cfg.conType.params.charset === "string")
        charset = cfg.conType.params.charset;
      this.charset = charset;
      const limits = cfg.limits;
      this.fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
      this.fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
      this.fieldNameSizeLimit = limits && typeof limits.fieldNameSize === "number" ? limits.fieldNameSize : 100;
      this._inKey = true;
      this._keyTrunc = false;
      this._valTrunc = false;
      this._bytesKey = 0;
      this._bytesVal = 0;
      this._fields = 0;
      this._key = "";
      this._val = "";
      this._byte = -2;
      this._lastPos = 0;
      this._encode = 0;
      this._decoder = getDecoder(charset);
    }
    static detect(conType) {
      return conType.type === "application" && conType.subtype === "x-www-form-urlencoded";
    }
    _write(chunk, enc, cb) {
      if (this._fields >= this.fieldsLimit)
        return cb();
      let i = 0;
      const len = chunk.length;
      this._lastPos = 0;
      if (this._byte !== -2) {
        i = readPctEnc(this, chunk, i, len);
        if (i === -1)
          return cb(new Error("Malformed urlencoded form"));
        if (i >= len)
          return cb();
        if (this._inKey)
          ++this._bytesKey;
        else
          ++this._bytesVal;
      }
      main:
        while (i < len) {
          if (this._inKey) {
            i = skipKeyBytes(this, chunk, i, len);
            while (i < len) {
              switch (chunk[i]) {
                case 61:
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = ++i;
                  this._key = this._decoder(this._key, this._encode);
                  this._encode = 0;
                  this._inKey = false;
                  continue main;
                case 38:
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = ++i;
                  this._key = this._decoder(this._key, this._encode);
                  this._encode = 0;
                  if (this._bytesKey > 0) {
                    this.emit("field", this._key, "", {
                      nameTruncated: this._keyTrunc,
                      valueTruncated: false,
                      encoding: this.charset,
                      mimeType: "text/plain"
                    });
                  }
                  this._key = "";
                  this._val = "";
                  this._keyTrunc = false;
                  this._valTrunc = false;
                  this._bytesKey = 0;
                  this._bytesVal = 0;
                  if (++this._fields >= this.fieldsLimit) {
                    this.emit("fieldsLimit");
                    return cb();
                  }
                  continue;
                case 43:
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._key += " ";
                  this._lastPos = i + 1;
                  break;
                case 37:
                  if (this._encode === 0)
                    this._encode = 1;
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = i + 1;
                  this._byte = -1;
                  i = readPctEnc(this, chunk, i + 1, len);
                  if (i === -1)
                    return cb(new Error("Malformed urlencoded form"));
                  if (i >= len)
                    return cb();
                  ++this._bytesKey;
                  i = skipKeyBytes(this, chunk, i, len);
                  continue;
              }
              ++i;
              ++this._bytesKey;
              i = skipKeyBytes(this, chunk, i, len);
            }
            if (this._lastPos < i)
              this._key += chunk.latin1Slice(this._lastPos, i);
          } else {
            i = skipValBytes(this, chunk, i, len);
            while (i < len) {
              switch (chunk[i]) {
                case 38:
                  if (this._lastPos < i)
                    this._val += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = ++i;
                  this._inKey = true;
                  this._val = this._decoder(this._val, this._encode);
                  this._encode = 0;
                  if (this._bytesKey > 0 || this._bytesVal > 0) {
                    this.emit("field", this._key, this._val, {
                      nameTruncated: this._keyTrunc,
                      valueTruncated: this._valTrunc,
                      encoding: this.charset,
                      mimeType: "text/plain"
                    });
                  }
                  this._key = "";
                  this._val = "";
                  this._keyTrunc = false;
                  this._valTrunc = false;
                  this._bytesKey = 0;
                  this._bytesVal = 0;
                  if (++this._fields >= this.fieldsLimit) {
                    this.emit("fieldsLimit");
                    return cb();
                  }
                  continue main;
                case 43:
                  if (this._lastPos < i)
                    this._val += chunk.latin1Slice(this._lastPos, i);
                  this._val += " ";
                  this._lastPos = i + 1;
                  break;
                case 37:
                  if (this._encode === 0)
                    this._encode = 1;
                  if (this._lastPos < i)
                    this._val += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = i + 1;
                  this._byte = -1;
                  i = readPctEnc(this, chunk, i + 1, len);
                  if (i === -1)
                    return cb(new Error("Malformed urlencoded form"));
                  if (i >= len)
                    return cb();
                  ++this._bytesVal;
                  i = skipValBytes(this, chunk, i, len);
                  continue;
              }
              ++i;
              ++this._bytesVal;
              i = skipValBytes(this, chunk, i, len);
            }
            if (this._lastPos < i)
              this._val += chunk.latin1Slice(this._lastPos, i);
          }
        }
      cb();
    }
    _final(cb) {
      if (this._byte !== -2)
        return cb(new Error("Malformed urlencoded form"));
      if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
        if (this._inKey)
          this._key = this._decoder(this._key, this._encode);
        else
          this._val = this._decoder(this._val, this._encode);
        this.emit("field", this._key, this._val, {
          nameTruncated: this._keyTrunc,
          valueTruncated: this._valTrunc,
          encoding: this.charset,
          mimeType: "text/plain"
        });
      }
      cb();
    }
  }
  var HEX_VALUES = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ];
  module.exports = URLEncoded;
});

// node_modules/busboy/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var getInstance = function(cfg) {
    const headers = cfg.headers;
    const conType = parseContentType(headers["content-type"]);
    if (!conType)
      throw new Error("Malformed content type");
    for (const type of TYPES) {
      const matched = type.detect(conType);
      if (!matched)
        continue;
      const instanceCfg = {
        limits: cfg.limits,
        headers,
        conType,
        highWaterMark: undefined,
        fileHwm: undefined,
        defCharset: undefined,
        defParamCharset: undefined,
        preservePath: false
      };
      if (cfg.highWaterMark)
        instanceCfg.highWaterMark = cfg.highWaterMark;
      if (cfg.fileHwm)
        instanceCfg.fileHwm = cfg.fileHwm;
      instanceCfg.defCharset = cfg.defCharset;
      instanceCfg.defParamCharset = cfg.defParamCharset;
      instanceCfg.preservePath = cfg.preservePath;
      return new type(instanceCfg);
    }
    throw new Error(`Unsupported content type: ${headers["content-type"]}`);
  };
  var { parseContentType } = require_utils();
  var TYPES = [
    require_multipart(),
    require_urlencoded()
  ].filter(function(typemod) {
    return typeof typemod.detect === "function";
  });
  module.exports = (cfg) => {
    if (typeof cfg !== "object" || cfg === null)
      cfg = {};
    if (typeof cfg.headers !== "object" || cfg.headers === null || typeof cfg.headers["content-type"] !== "string") {
      throw new Error("Missing Content-Type");
    }
    return getInstance(cfg);
  };
});

// debug-rsc.ts
var server = __toESM(require_server_node(), 1);
var import_busboy = __toESM(require_lib(), 1);
import {resolve} from "path";
import Stream from "stream";
async function rscPOST(req) {
  const actionReference = String(req.headers.get("rsa-reference"));
  const actionOrigin = String(req.headers.get("rsa-origin"));
  const url = new URL(req.url);
  const [filepath, name] = actionReference.split("#");
  const action = (await import(`.${resolve(filepath)}`))[name];
  let args;
  if (req.headers.get("content-type").startsWith("multipart/form-data")) {
    const bb = import_busboy.default({ headers: Object.fromEntries(req.headers.entries()) });
    const reply = server.decodeReplyFromBusboy(bb, resolve("build/") + "/");
    Stream.Readable.fromWeb(req).pipe(bb);
    args = await reply;
  } else {
    args = await server.decodeReply(await req.text(), moduleBaseURL);
  }
  const returnValue = await action.apply(null, args);
  const props = Object.fromEntries(url.searchParams.entries());
  const root = (await import(resolve("build/app", `.${actionOrigin}/page.js`))).default(props);
  return server.renderToPipeableStream({ returnValue, root }, moduleBaseURL);
}
var nodeToWebStream = function(nodeStream) {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      nodeStream.on("end", () => {
        controller.close();
      });
      nodeStream.on("error", (err) => {
        controller.error(err);
      });
    }
  });
};
var moduleBaseURL = "/build/";
var port = 3000;
console.log(`Listening on http://localhost:${port}`);
Bun.serve({
  development: true,
  async fetch(req) {
    const url = new URL(req.url);
    console.log(url.pathname);
    const rscStream = await rscPOST(req);
    const readable = new Stream.PassThrough;
    rscStream.pipe(readable);
    return new Response(nodeToWebStream(readable));
  },
  port
});

class ReadableString extends Stream.Readable {
  str;
  sent = false;
  constructor(str) {
    super();
    this.str = str;
  }
  _read() {
    if (!this.sent) {
      this.push(Buffer.from(this.str));
      this.sent = true;
    } else {
      this.push(null);
    }
  }
}
