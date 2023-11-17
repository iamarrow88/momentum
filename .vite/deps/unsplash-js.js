var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/content-type/index.js
var require_content_type = __commonJS({
  "node_modules/content-type/index.js"(exports) {
    "use strict";
    var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
    var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    exports.format = format;
    exports.parse = parse2;
    function format(obj) {
      if (!obj || typeof obj !== "object") {
        throw new TypeError("argument obj is required");
      }
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || !TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = type;
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          if (!TOKEN_REGEXP.test(param)) {
            throw new TypeError("invalid parameter name");
          }
          string += "; " + param + "=" + qstring(parameters[param]);
        }
      }
      return string;
    }
    function parse2(string) {
      if (!string) {
        throw new TypeError("argument string is required");
      }
      var header = typeof string === "object" ? getcontenttype(string) : string;
      if (typeof header !== "string") {
        throw new TypeError("argument string is required to be a string");
      }
      var index2 = header.indexOf(";");
      var type = index2 !== -1 ? header.slice(0, index2).trim() : header.trim();
      if (!TYPE_REGEXP.test(type)) {
        throw new TypeError("invalid media type");
      }
      var obj = new ContentType(type.toLowerCase());
      if (index2 !== -1) {
        var key;
        var match;
        var value;
        PARAM_REGEXP.lastIndex = index2;
        while (match = PARAM_REGEXP.exec(header)) {
          if (match.index !== index2) {
            throw new TypeError("invalid parameter format");
          }
          index2 += match[0].length;
          key = match[1].toLowerCase();
          value = match[2];
          if (value.charCodeAt(0) === 34) {
            value = value.slice(1, -1);
            if (value.indexOf("\\") !== -1) {
              value = value.replace(QESC_REGEXP, "$1");
            }
          }
          obj.parameters[key] = value;
        }
        if (index2 !== header.length) {
          throw new TypeError("invalid parameter format");
        }
      }
      return obj;
    }
    function getcontenttype(obj) {
      var header;
      if (typeof obj.getHeader === "function") {
        header = obj.getHeader("content-type");
      } else if (typeof obj.headers === "object") {
        header = obj.headers && obj.headers["content-type"];
      }
      if (typeof header !== "string") {
        throw new TypeError("content-type header is missing from object");
      }
      return header;
    }
    function qstring(val) {
      var str = String(val);
      if (TOKEN_REGEXP.test(str)) {
        return str;
      }
      if (str.length > 0 && !TEXT_REGEXP.test(str)) {
        throw new TypeError("invalid parameter value");
      }
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ContentType(type) {
      this.parameters = /* @__PURE__ */ Object.create(null);
      this.type = type;
    }
  }
});

// node_modules/unsplash-js/dist/unsplash-js.esm.js
var import_content_type = __toESM(require_content_type());
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var checkIsString = getRefinement(function(value) {
  return typeof value === "string" ? value : null;
});
var isDefined = function isDefined2(x) {
  return x !== null && x !== void 0;
};
function getRefinement(getB) {
  return function(a) {
    return isDefined(getB(a));
  };
}
var checkIsNonEmptyArray = function checkIsNonEmptyArray2(a) {
  return a.length > 0;
};
var compactDefined = function compactDefined2(obj) {
  return Object.keys(obj).reduce(function(acc, key) {
    var _ref;
    var value = obj[key];
    return _extends({}, acc, isDefined(value) ? (_ref = {}, _ref[key] = value, _ref) : {});
  }, {});
};
function flow() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  var len = fns.length - 1;
  return function() {
    for (var _len2 = arguments.length, x = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      x[_key2] = arguments[_key2];
    }
    var y = fns[0].apply(this, x);
    for (var i = 1; i <= len; i++) {
      y = fns[i].call(this, y);
    }
    return y;
  };
}
var checkIsObject = getRefinement(function(response) {
  return isDefined(response) && typeof response === "object" && !Array.isArray(response) ? response : null;
});
var checkIsErrors = getRefinement(function(errors) {
  return Array.isArray(errors) && errors.every(checkIsString) && checkIsNonEmptyArray(errors) ? errors : null;
});
var checkIsApiError = getRefinement(function(response) {
  return checkIsObject(response) && "errors" in response && checkIsErrors(response.errors) ? {
    errors: response.errors
  } : null;
});
var getErrorForBadStatusCode = function getErrorForBadStatusCode2(jsonResponse) {
  if (checkIsApiError(jsonResponse)) {
    return {
      errors: jsonResponse.errors,
      source: "api"
    };
  } else {
    return {
      errors: ["Responded with a status code outside the 2xx range, and the response body is not recognisable."],
      source: "decoding"
    };
  }
};
var DecodingError = function DecodingError2(message) {
  this.message = message;
};
var CONTENT_TYPE_RESPONSE_HEADER = "content-type";
var CONTENT_TYPE_JSON = "application/json";
var checkIsJsonResponse = function checkIsJsonResponse2(response) {
  var contentTypeHeader = response.headers.get(CONTENT_TYPE_RESPONSE_HEADER);
  return isDefined(contentTypeHeader) && (0, import_content_type.parse)(contentTypeHeader).type === CONTENT_TYPE_JSON;
};
var getJsonResponse = function getJsonResponse2(response) {
  if (checkIsJsonResponse(response)) {
    return response.json()["catch"](function(_err) {
      throw new DecodingError("unable to parse JSON response.");
    });
  } else {
    throw new DecodingError("expected JSON response from server.");
  }
};
var handleFetchResponse = function handleFetchResponse2(handleResponse) {
  return function(response) {
    return (response.ok ? handleResponse({
      response
    }).then(function(handledResponse) {
      return {
        type: "success",
        status: response.status,
        response: handledResponse,
        originalResponse: response
      };
    }) : getJsonResponse(response).then(function(jsonResponse) {
      return _extends({
        type: "error",
        status: response.status
      }, getErrorForBadStatusCode(jsonResponse), {
        originalResponse: response
      });
    }))["catch"](function(error) {
      if (error instanceof DecodingError) {
        return {
          type: "error",
          source: "decoding",
          status: response.status,
          originalResponse: response,
          errors: [error.message]
        };
      } else {
        throw error;
      }
    });
  };
};
var castResponse = function castResponse2() {
  return function(_ref) {
    var response = _ref.response;
    return getJsonResponse(response);
  };
};
var addQueryToUrl = function addQueryToUrl2(query) {
  return function(url) {
    Object.keys(query).forEach(function(queryKey) {
      return url.searchParams.set(queryKey, query[queryKey].toString());
    });
  };
};
var addPathnameToUrl = function addPathnameToUrl2(pathname) {
  return function(url) {
    if (url.pathname === "/") {
      url.pathname = pathname;
    } else {
      url.pathname += pathname;
    }
  };
};
var buildUrl = function buildUrl2(_ref) {
  var pathname = _ref.pathname, query = _ref.query;
  return function(apiUrl) {
    var url = new URL(apiUrl);
    addPathnameToUrl(pathname)(url);
    addQueryToUrl(query)(url);
    return url.toString();
  };
};
var getQueryFromSearchParams = function getQueryFromSearchParams2(searchParams) {
  var query = {};
  searchParams.forEach(function(value, key) {
    query[key] = value;
  });
  return query;
};
var parseQueryAndPathname = function parseQueryAndPathname2(url) {
  var _URL = new URL(url), pathname = _URL.pathname, searchParams = _URL.searchParams;
  var query = getQueryFromSearchParams(searchParams);
  return {
    query,
    pathname: pathname === "/" ? void 0 : pathname
  };
};
var createRequestHandler = function createRequestHandler2(fn) {
  return function(a, additionalFetchOptions) {
    if (additionalFetchOptions === void 0) {
      additionalFetchOptions = {};
    }
    var _fn = fn(a), headers = _fn.headers, query = _fn.query, baseReqParams = _objectWithoutPropertiesLoose(_fn, ["headers", "query"]);
    return _extends({}, baseReqParams, additionalFetchOptions, {
      query,
      headers: _extends({}, headers, additionalFetchOptions.headers)
    });
  };
};
var makeEndpoint = function makeEndpoint2(endpoint) {
  return endpoint;
};
var initMakeRequest = function initMakeRequest2(_ref) {
  var accessKey = _ref.accessKey, _ref$apiVersion = _ref.apiVersion, apiVersion = _ref$apiVersion === void 0 ? "v1" : _ref$apiVersion, _ref$apiUrl = _ref.apiUrl, apiUrl = _ref$apiUrl === void 0 ? "https://api.unsplash.com" : _ref$apiUrl, generalHeaders = _ref.headers, providedFetch = _ref.fetch, generalFetchOptions = _objectWithoutPropertiesLoose(_ref, ["accessKey", "apiVersion", "apiUrl", "headers", "fetch"]);
  return function(_ref2) {
    var handleResponse = _ref2.handleResponse, handleRequest3 = _ref2.handleRequest;
    return flow(handleRequest3, function(_ref3) {
      var pathname = _ref3.pathname, query = _ref3.query, _ref3$method = _ref3.method, method = _ref3$method === void 0 ? "GET" : _ref3$method, endpointHeaders = _ref3.headers, body = _ref3.body, signal = _ref3.signal;
      var url = buildUrl({
        pathname,
        query
      })(apiUrl);
      var fetchOptions = _extends({
        method,
        headers: _extends({}, generalHeaders, endpointHeaders, {
          "Accept-Version": apiVersion
        }, isDefined(accessKey) ? {
          Authorization: "Client-ID " + accessKey
        } : {}),
        body,
        signal
      }, generalFetchOptions);
      var fetchToUse = providedFetch != null ? providedFetch : fetch;
      return fetchToUse(url, fetchOptions).then(handleFetchResponse(handleResponse));
    });
  };
};
var TOTAL_RESPONSE_HEADER = "x-total";
var getTotalFromApiFeedResponse = function getTotalFromApiFeedResponse2(response) {
  var totalsStr = response.headers.get(TOTAL_RESPONSE_HEADER);
  if (isDefined(totalsStr)) {
    var total = parseInt(totalsStr);
    if (Number.isInteger(total)) {
      return total;
    } else {
      throw new DecodingError("expected " + TOTAL_RESPONSE_HEADER + " header to be valid integer.");
    }
  } else {
    throw new DecodingError("expected " + TOTAL_RESPONSE_HEADER + " header to exist.");
  }
};
var handleFeedResponse = function handleFeedResponse2() {
  return function(_ref) {
    var response = _ref.response;
    return castResponse()({
      response
    }).then(function(results) {
      return {
        results,
        total: getTotalFromApiFeedResponse(response)
      };
    });
  };
};
var getCollections = function getCollections2(collectionIds) {
  return isDefined(collectionIds) ? {
    collections: collectionIds.join()
  } : {};
};
var getTopics = function getTopics2(topicIds) {
  return isDefined(topicIds) ? {
    topics: topicIds.join()
  } : {};
};
var getFeedParams = function getFeedParams2(_ref) {
  var page = _ref.page, perPage = _ref.perPage, orderBy = _ref.orderBy;
  return compactDefined({
    per_page: perPage,
    order_by: orderBy,
    page
  });
};
var COLLECTIONS_PATH_PREFIX = "/collections";
var getPhotos = function() {
  var getPathname = function getPathname2(_ref) {
    var collectionId = _ref.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId + "/photos";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref2) {
      var collectionId = _ref2.collectionId, orientation = _ref2.orientation, paginationParams = _objectWithoutPropertiesLoose(_ref2, ["collectionId", "orientation"]);
      return {
        pathname: getPathname({
          collectionId
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var get = function() {
  var getPathname = function getPathname2(_ref3) {
    var collectionId = _ref3.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId;
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref4) {
      var collectionId = _ref4.collectionId;
      return {
        pathname: getPathname({
          collectionId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var list = function() {
  var getPathname = function getPathname2() {
    return COLLECTIONS_PATH_PREFIX;
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(paginationParams) {
      if (paginationParams === void 0) {
        paginationParams = {};
      }
      return {
        pathname: getPathname(),
        query: getFeedParams(paginationParams)
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getRelated = function() {
  var getPathname = function getPathname2(_ref5) {
    var collectionId = _ref5.collectionId;
    return COLLECTIONS_PATH_PREFIX + "/" + collectionId + "/related";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref6) {
      var collectionId = _ref6.collectionId;
      return {
        pathname: getPathname({
          collectionId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var index = {
  __proto__: null,
  getPhotos,
  get,
  list,
  getRelated
};
var PHOTOS_PATH_PREFIX = "/photos";
var list$1 = function() {
  var _getPathname = function getPathname() {
    return PHOTOS_PATH_PREFIX;
  };
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname();
    },
    handleRequest: createRequestHandler(function(feedParams) {
      if (feedParams === void 0) {
        feedParams = {};
      }
      return {
        pathname: PHOTOS_PATH_PREFIX,
        query: compactDefined(getFeedParams(feedParams))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var get$1 = function() {
  var getPathname = function getPathname2(_ref) {
    var photoId = _ref.photoId;
    return PHOTOS_PATH_PREFIX + "/" + photoId;
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref2) {
      var photoId = _ref2.photoId;
      return {
        pathname: getPathname({
          photoId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getStats = function() {
  var getPathname = function getPathname2(_ref3) {
    var photoId = _ref3.photoId;
    return PHOTOS_PATH_PREFIX + "/" + photoId + "/statistics";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref4) {
      var photoId = _ref4.photoId;
      return {
        pathname: getPathname({
          photoId
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getRandom = function() {
  var getPathname = function getPathname2() {
    return PHOTOS_PATH_PREFIX + "/random";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_temp) {
      var _ref5 = _temp === void 0 ? {} : _temp, collectionIds = _ref5.collectionIds, contentFilter = _ref5.contentFilter, topicIds = _ref5.topicIds, queryParams = _objectWithoutPropertiesLoose(_ref5, ["collectionIds", "contentFilter", "topicIds"]);
      return {
        pathname: getPathname(),
        query: compactDefined(_extends({}, queryParams, {
          content_filter: contentFilter
        }, getCollections(collectionIds), getTopics(topicIds))),
        headers: {
          /**
           * Avoid response caching
           */
          "cache-control": "no-cache"
        }
      };
    }),
    handleResponse: castResponse()
  });
}();
var trackDownload = {
  handleRequest: createRequestHandler(function(_ref6) {
    var downloadLocation = _ref6.downloadLocation;
    var _parseQueryAndPathnam = parseQueryAndPathname(downloadLocation), pathname = _parseQueryAndPathnam.pathname, query = _parseQueryAndPathnam.query;
    if (!isDefined(pathname)) {
      throw new Error("Could not parse pathname from url.");
    }
    return {
      pathname,
      query: compactDefined(query)
    };
  }),
  handleResponse: castResponse()
};
var index$1 = {
  __proto__: null,
  list: list$1,
  get: get$1,
  getStats,
  getRandom,
  trackDownload
};
var SEARCH_PATH_PREFIX = "/search";
var getPhotos$1 = function() {
  var _getPathname = function getPathname() {
    return SEARCH_PATH_PREFIX + "/photos";
  };
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname();
    },
    handleRequest: createRequestHandler(function(_ref) {
      var query = _ref.query, page = _ref.page, perPage = _ref.perPage, orderBy = _ref.orderBy, collectionIds = _ref.collectionIds, lang = _ref.lang, contentFilter = _ref.contentFilter, filters = _objectWithoutPropertiesLoose(_ref, ["query", "page", "perPage", "orderBy", "collectionIds", "lang", "contentFilter"]);
      return {
        pathname: _getPathname(),
        query: compactDefined(_extends({
          query,
          content_filter: contentFilter,
          lang,
          order_by: orderBy
        }, getFeedParams({
          page,
          perPage
        }), getCollections(collectionIds), filters))
      };
    }),
    handleResponse: castResponse()
  });
}();
var getCollections$1 = function() {
  var _getPathname2 = function getPathname() {
    return SEARCH_PATH_PREFIX + "/collections";
  };
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname2();
    },
    handleRequest: createRequestHandler(function(_ref2) {
      var query = _ref2.query, paginationParams = _objectWithoutPropertiesLoose(_ref2, ["query"]);
      return {
        pathname: _getPathname2(),
        query: _extends({
          query
        }, getFeedParams(paginationParams))
      };
    }),
    handleResponse: castResponse()
  });
}();
var getUsers = function() {
  var _getPathname3 = function getPathname() {
    return SEARCH_PATH_PREFIX + "/users";
  };
  return makeEndpoint({
    // Wrapper uses type trick to allow 0 args
    getPathname: function getPathname(_params) {
      return _getPathname3();
    },
    handleRequest: createRequestHandler(function(_ref3) {
      var query = _ref3.query, paginationParams = _objectWithoutPropertiesLoose(_ref3, ["query"]);
      return {
        pathname: _getPathname3(),
        query: _extends({
          query
        }, getFeedParams(paginationParams))
      };
    }),
    handleResponse: castResponse()
  });
}();
var index$2 = {
  __proto__: null,
  getPhotos: getPhotos$1,
  getCollections: getCollections$1,
  getUsers
};
var USERS_PATH_PREFIX = "/users";
var get$2 = function() {
  var getPathname = function getPathname2(_ref) {
    var username = _ref.username;
    return USERS_PATH_PREFIX + "/" + username;
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref2) {
      var username = _ref2.username;
      return {
        pathname: getPathname({
          username
        }),
        query: {}
      };
    }),
    handleResponse: castResponse()
  });
}();
var getPhotos$2 = function() {
  var getPathname = function getPathname2(_ref3) {
    var username = _ref3.username;
    return USERS_PATH_PREFIX + "/" + username + "/photos";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref4) {
      var username = _ref4.username, stats = _ref4.stats, orientation = _ref4.orientation, paginationParams = _objectWithoutPropertiesLoose(_ref4, ["username", "stats", "orientation"]);
      return {
        pathname: getPathname({
          username
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation,
          stats
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getLikes = function() {
  var getPathname = function getPathname2(_ref5) {
    var username = _ref5.username;
    return USERS_PATH_PREFIX + "/" + username + "/likes";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref6) {
      var username = _ref6.username, orientation = _ref6.orientation, paginationParams = _objectWithoutPropertiesLoose(_ref6, ["username", "orientation"]);
      return {
        pathname: getPathname({
          username
        }),
        query: compactDefined(_extends({}, getFeedParams(paginationParams), {
          orientation
        }))
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var getCollections$2 = function() {
  var getPathname = function getPathname2(_ref7) {
    var username = _ref7.username;
    return USERS_PATH_PREFIX + "/" + username + "/collections";
  };
  return makeEndpoint({
    getPathname,
    handleRequest: createRequestHandler(function(_ref8) {
      var username = _ref8.username, paginationParams = _objectWithoutPropertiesLoose(_ref8, ["username"]);
      return {
        pathname: getPathname({
          username
        }),
        query: getFeedParams(paginationParams)
      };
    }),
    handleResponse: handleFeedResponse()
  });
}();
var index$3 = {
  __proto__: null,
  get: get$2,
  getPhotos: getPhotos$2,
  getLikes,
  getCollections: getCollections$2
};
var BASE_TOPIC_PATH = "/topics";
var getTopicPath = function getTopicPath2(_ref) {
  var topicIdOrSlug = _ref.topicIdOrSlug;
  return BASE_TOPIC_PATH + "/" + topicIdOrSlug;
};
var list$2 = makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: function handleRequest(_ref2) {
    var page = _ref2.page, perPage = _ref2.perPage, orderBy = _ref2.orderBy, topicIdsOrSlugs = _ref2.topicIdsOrSlugs;
    return {
      pathname: BASE_TOPIC_PATH,
      query: compactDefined(_extends({}, getFeedParams({
        page,
        perPage
      }), {
        ids: topicIdsOrSlugs == null ? void 0 : topicIdsOrSlugs.join(","),
        order_by: orderBy
      }))
    };
  },
  handleResponse: handleFeedResponse()
});
var get$3 = makeEndpoint({
  getPathname: getTopicPath,
  handleRequest: function handleRequest2(_ref3) {
    var topicIdOrSlug = _ref3.topicIdOrSlug;
    return {
      pathname: getTopicPath({
        topicIdOrSlug
      }),
      query: {}
    };
  },
  handleResponse: castResponse()
});
var getPhotos$3 = function() {
  var getPathname = flow(getTopicPath, function(topicPath) {
    return topicPath + "/photos";
  });
  return makeEndpoint({
    getPathname,
    handleRequest: function handleRequest3(_ref4) {
      var topicIdOrSlug = _ref4.topicIdOrSlug, orientation = _ref4.orientation, feedParams = _objectWithoutPropertiesLoose(_ref4, ["topicIdOrSlug", "orientation"]);
      return {
        pathname: getPathname({
          topicIdOrSlug
        }),
        query: compactDefined(_extends({}, getFeedParams(feedParams), {
          orientation
        }))
      };
    },
    handleResponse: handleFeedResponse()
  });
}();
var index$4 = {
  __proto__: null,
  list: list$2,
  get: get$3,
  getPhotos: getPhotos$3
};
var trackNonHotLinkedPhotoView = function trackNonHotLinkedPhotoView2(_ref) {
  var appId = _ref.appId;
  return function(_ref2) {
    var photoId = _ref2.photoId;
    var ids = !Array.isArray(photoId) ? [photoId] : photoId;
    if (ids.length > 20) {
      throw new Error("You cannot track more than 20 photos at once. Please try again with fewer photos.");
    }
    return fetch("views.unsplash.com/v?photo_id=" + ids.join() + "&app_id=" + appId);
  };
};
var internals = {
  __proto__: null,
  collections: index,
  photos: index$1,
  search: index$2,
  users: index$3,
  topics: index$4,
  trackNonHotLinkedPhotoView
};
var Language;
(function(Language2) {
  Language2["Afrikaans"] = "af";
  Language2["Amharic"] = "am";
  Language2["Arabic"] = "ar";
  Language2["Azerbaijani"] = "az";
  Language2["Belarusian"] = "be";
  Language2["Bulgarian"] = "bg";
  Language2["Bengali"] = "bn";
  Language2["Bosnian"] = "bs";
  Language2["Catalan"] = "ca";
  Language2["Cebuano"] = "ceb";
  Language2["Corsican"] = "co";
  Language2["Czech"] = "cs";
  Language2["Welsh"] = "cy";
  Language2["Danish"] = "da";
  Language2["German"] = "de";
  Language2["Greek"] = "el";
  Language2["English"] = "en";
  Language2["Esperanto"] = "eo";
  Language2["Spanish"] = "es";
  Language2["Estonian"] = "et";
  Language2["Basque"] = "eu";
  Language2["Persian"] = "fa";
  Language2["Finnish"] = "fi";
  Language2["French"] = "fr";
  Language2["Frisian"] = "fy";
  Language2["Irish"] = "ga";
  Language2["ScotsGaelic"] = "gd";
  Language2["Galician"] = "gl";
  Language2["Gujarati"] = "gu";
  Language2["Hausa"] = "ha";
  Language2["Hawaiian"] = "haw";
  Language2["Hindi"] = "hi";
  Language2["Hmong"] = "hmn";
  Language2["Croatian"] = "hr";
  Language2["HaitianCreole"] = "ht";
  Language2["Hungarian"] = "hu";
  Language2["Armenian"] = "hy";
  Language2["Indonesian"] = "id";
  Language2["Igbo"] = "ig";
  Language2["Icelandic"] = "is";
  Language2["Italian"] = "it";
  Language2["Hebrew"] = "iw";
  Language2["Japanese"] = "ja";
  Language2["Javanese"] = "jw";
  Language2["Georgian"] = "ka";
  Language2["Kazakh"] = "kk";
  Language2["Khmer"] = "km";
  Language2["Kannada"] = "kn";
  Language2["Korean"] = "ko";
  Language2["Kurdish"] = "ku";
  Language2["Kyrgyz"] = "ky";
  Language2["Latin"] = "la";
  Language2["Luxembourgish"] = "lb";
  Language2["Lao"] = "lo";
  Language2["Lithuanian"] = "lt";
  Language2["Latvian"] = "lv";
  Language2["Malagasy"] = "mg";
  Language2["Maori"] = "mi";
  Language2["Macedonian"] = "mk";
  Language2["Malayalam"] = "ml";
  Language2["Mongolian"] = "mn";
  Language2["Marathi"] = "mr";
  Language2["Malay"] = "ms";
  Language2["Maltese"] = "mt";
  Language2["Myanmar"] = "my";
  Language2["Nepali"] = "ne";
  Language2["Dutch"] = "nl";
  Language2["Norwegian"] = "no";
  Language2["Nyanja"] = "ny";
  Language2["Oriya"] = "or";
  Language2["Punjabi"] = "pa";
  Language2["Polish"] = "pl";
  Language2["Pashto"] = "ps";
  Language2["Portuguese"] = "pt";
  Language2["Romanian"] = "ro";
  Language2["Russian"] = "ru";
  Language2["Kinyarwanda"] = "rw";
  Language2["Sindhi"] = "sd";
  Language2["Sinhala"] = "si";
  Language2["Slovak"] = "sk";
  Language2["Slovenian"] = "sl";
  Language2["Samoan"] = "sm";
  Language2["Shona"] = "sn";
  Language2["Somali"] = "so";
  Language2["Albanian"] = "sq";
  Language2["Serbian"] = "sr";
  Language2["Sesotho"] = "st";
  Language2["Sundanese"] = "su";
  Language2["Swedish"] = "sv";
  Language2["Swahili"] = "sw";
  Language2["Tamil"] = "ta";
  Language2["Telugu"] = "te";
  Language2["Tajik"] = "tg";
  Language2["Thai"] = "th";
  Language2["Turkmen"] = "tk";
  Language2["Filipino"] = "tl";
  Language2["Turkish"] = "tr";
  Language2["Tatar"] = "tt";
  Language2["Uighur"] = "ug";
  Language2["Ukrainian"] = "uk";
  Language2["Urdu"] = "ur";
  Language2["Uzbek"] = "uz";
  Language2["Vietnamese"] = "vi";
  Language2["Xhosa"] = "xh";
  Language2["Yiddish"] = "yi";
  Language2["Yoruba"] = "yo";
  Language2["ChineseSimplified"] = "zh";
  Language2["ChineseTraditional"] = "zh-TW";
  Language2["Zulu"] = "zu";
})(Language || (Language = {}));
var OrderBy;
(function(OrderBy2) {
  OrderBy2["LATEST"] = "latest";
  OrderBy2["POPULAR"] = "popular";
  OrderBy2["VIEWS"] = "views";
  OrderBy2["DOWNLOADS"] = "downloads";
  OrderBy2["OLDEST"] = "oldest";
})(OrderBy || (OrderBy = {}));
var createApi = flow(initMakeRequest, function(makeRequest) {
  return {
    photos: {
      get: makeRequest(get$1),
      list: makeRequest(list$1),
      getStats: makeRequest(getStats),
      getRandom: makeRequest(getRandom),
      trackDownload: makeRequest(trackDownload)
    },
    users: {
      getPhotos: makeRequest(getPhotos$2),
      getCollections: makeRequest(getCollections$2),
      getLikes: makeRequest(getLikes),
      get: makeRequest(get$2)
    },
    search: {
      getCollections: makeRequest(getCollections$1),
      getPhotos: makeRequest(getPhotos$1),
      getUsers: makeRequest(getUsers)
    },
    collections: {
      getPhotos: makeRequest(getPhotos),
      get: makeRequest(get),
      list: makeRequest(list),
      getRelated: makeRequest(getRelated)
    },
    topics: {
      list: makeRequest(list$2),
      get: makeRequest(get$3),
      getPhotos: makeRequest(getPhotos$3)
    }
  };
});
export {
  Language,
  OrderBy,
  internals as _internals,
  createApi
};
/*! Bundled license information:

content-type/index.js:
  (*!
   * content-type
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=unsplash-js.js.map
