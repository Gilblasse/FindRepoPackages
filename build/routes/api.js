"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require("express");

var puppeteer = require("puppeteer");

var languageType = require("../app/EvalRepo");

var router = express.Router(); // Front-End Gets Repo Language through rest: https://api.github.com/repos/:owner/:repo  and sends info via Body parser

router.post('/repo-packages-info', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var owner, repo, language, baseUrl, browser, page, packageType, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            owner = req.body.owner;
            repo = req.body.repo;
            language = req.body.language;
            baseUrl = "https://github.com/".concat(owner, "/").concat(repo);
            _context.next = 6;
            return puppeteer.launch();

          case 6:
            browser = _context.sent;
            _context.next = 9;
            return browser.newPage();

          case 9:
            page = _context.sent;
            packageType = languageType[language];

            if (!packageType) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return packageType.exe(baseUrl, page, packageType);

          case 14:
            _context.t0 = _context.sent;
            _context.next = 18;
            break;

          case 17:
            _context.t0 = "Not Found";

          case 18:
            data = _context.t0;
            browser.close();
            res.send({
              data: data
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=api.js.map