"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import latestVersion from 'latest-version'
var latestVersion = require('latest-version'); // SCRAPE JAVASCRIPT PACAKGES


var getPackageJson = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(baseUrl, page, packageType) {
    var response, errorMessage, arr, scrapedData, _depends, i, latestV;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page["goto"]("".concat(baseUrl).concat(packageType.url), {
              waitUntil: 'networkidle2'
            });

          case 2:
            response = _context.sent;
            errorMessage = "Not Found";
            arr = [];

            if (!(response._status == 200)) {
              _context.next = 21;
              break;
            }

            _context.next = 8;
            return page.evaluate(function () {
              var repoPackageTable = document.querySelector('table').innerText;
              var repoPackage = JSON.parse(repoPackageTable);
              return repoPackage;
            });

          case 8:
            scrapedData = _context.sent;
            _depends = Object.entries(scrapedData.dependencies);
            console.log({
              depends: _depends
            });
            i = 0;

          case 12:
            if (!(i < _depends.length)) {
              _context.next = 20;
              break;
            }

            _context.next = 15;
            return latestVersion(_depends[i][0]);

          case 15:
            latestV = _context.sent;
            arr.push([].concat(_toConsumableArray(_depends[i]), [latestV]));

          case 17:
            i++;
            _context.next = 12;
            break;

          case 20:
            console.log({
              afterArr: arr
            });

          case 21:
            console.log({
              arr: arr
            });
            return _context.abrupt("return", response._status == 200 ? arr : errorMessage);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPackageJson(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // SCRAPE RUBY PACAKGES


var getGemFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(baseUrl, page, packageType) {
    var response, errorMessage, gems;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return page["goto"]("".concat(baseUrl).concat(packageType.url), {
              waitUntil: 'networkidle2'
            });

          case 2:
            response = _context2.sent;
            errorMessage = "Not Found";
            console.log({
              status: response._status
            });
            console.log({
              initialGems: gems
            });

            if (!(response._status == 200)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 9;
            return page.evaluate(function () {
              var tableList = document.querySelectorAll('tr');
              var trs = Object.values(tableList).map(function (tr) {
                return tr.innerText.trim();
              });
              var gemsRows = trs.filter(function (row) {
                return row.match(/(?<=gem)([\s\S]*)(?=')/g);
              }).filter(function (r) {
                return !r.includes('source') && !r.includes('#');
              });
              var gemsData = gemsRows.map(function (gem) {
                newGem = gem.split(/^(.+?),/);
                return newGem.length == 1 ? newGem : newGem.slice(1);
              });
              return gemsData;
            });

          case 9:
            gems = _context2.sent;
            console.log({
              gems: gems
            });

          case 11:
            console.log({
              endGems: gems
            });
            return _context2.abrupt("return", response._status == 200 ? gems : errorMessage);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getGemFile(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}(); // SCRAPE PYTHON PACKAGES


var getPythonDependencies = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(baseUrl, page, packageType) {
    var response, errorMessage, dependencies;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return page["goto"]("".concat(baseUrl).concat(packageType.url), {
              waitUntil: 'networkidle2'
            });

          case 2:
            response = _context3.sent;
            errorMessage = "Not Found";

            if (!(response._status == 200)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return page.evaluate(function () {
              var tableList = document.querySelector('table').innerText;
              var matches = tableList.match(/(?<= = \[\n)([\s\S]*?)(?=\])/g);
              var pyDepends = matches.map(function (s) {
                return s.split(/,\n/).filter(function (st) {
                  return st.trim().length !== 0;
                });
              }).flat().map(function (s) {
                return s.trim();
              });
              depends = pyDepends.map(function (s) {
                idx = s.search(/[^'\d a-z | A-Z ]\W/);
                return idx == -1 ? [s] : [s.substring(0, idx), s.substring(idx)];
              });
              return depends;
            });

          case 7:
            dependencies = _context3.sent;

          case 8:
            return _context3.abrupt("return", response._status == 200 ? dependencies : errorMessage);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getPythonDependencies(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = languageType = {
  "JavaScript": {
    url: "/blob/master/package.json",
    exe: getPackageJson
  },
  "Ruby": {
    url: "/blob/master/Gemfile",
    exe: getGemFile
  },
  "Python": {
    url: "/blob/master/setup.py",
    exe: getPythonDependencies
  }
};
//# sourceMappingURL=EvalRepo.js.map