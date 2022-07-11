"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlushBicycle = void 0;
var Mailer_1 = require("./util/Mailer");
var puppeteer = require("puppeteer");
var BlushBicycle = /** @class */ (function () {
    function BlushBicycle() {
        this.history = [];
        this.initialized = false;
    }
    BlushBicycle.prototype.ride = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, listings, _loop_1, this_1, _i, listings_1, element;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch({
                            args: ["--no-sandbox", "--disable-setuid-sandbox"],
                        })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        page.on("console", function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            var msgArgs, i, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        msgArgs = msg.args();
                                        i = 0;
                                        _c.label = 1;
                                    case 1:
                                        if (!(i < msgArgs.length)) return [3 /*break*/, 4];
                                        _b = (_a = console).log;
                                        return [4 /*yield*/, msgArgs[i].jsonValue()];
                                    case 2:
                                        _b.apply(_a, [_c.sent()]);
                                        _c.label = 3;
                                    case 3:
                                        ++i;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, page.goto(url)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var listings = document.querySelectorAll("div.bsitem");
                                var listingArray = Array.from(listings);
                                var listingInfo = listingArray.map(function (listing) {
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                                    var listingInfo = {
                                        title: ((_b = (_a = listing === null || listing === void 0 ? void 0 : listing.querySelector("td:nth-of-type(2)")) === null || _a === void 0 ? void 0 : _a.querySelector("a")) === null || _b === void 0 ? void 0 : _b.innerText) || "",
                                        price: "$" + ((_e = (_d = (_c = listing === null || listing === void 0 ? void 0 : listing.querySelector("td:nth-of-type(2) table")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.match(/\$([0-9]+\s[CAD|USD])/)) === null || _e === void 0 ? void 0 : _e[1]) || "",
                                        location: ((_h = (_g = (_f = listing === null || listing === void 0 ? void 0 : listing.querySelector("td:nth-of-type(2) table")) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.match(/([a-zA-Z][a-zA-Z|\s]+)\,([a-zA-Z|\s]+)\,\sCanada/)) === null || _h === void 0 ? void 0 : _h[1]) || "",
                                        frameSize: ((_l = (_k = (_j = listing === null || listing === void 0 ? void 0 : listing.querySelector("td:nth-of-type(2)")) === null || _j === void 0 ? void 0 : _j.innerHTML) === null || _k === void 0 ? void 0 : _k.match(/\<b\>Frame\sSize\s:\s\<\/b\>\s([0-9|a-zA-Z]+)/)) === null || _l === void 0 ? void 0 : _l[1]) || "",
                                        type: ((_q = (_p = (_o = (_m = listing === null || listing === void 0 ? void 0 : listing.querySelector("td:nth-of-type(2)")) === null || _m === void 0 ? void 0 : _m.innerHTML) === null || _o === void 0 ? void 0 : _o.match(/\<br\>\s([a-zA-Z|\s|\/]+)/)) === null || _p === void 0 ? void 0 : _p[1]) === null || _q === void 0 ? void 0 : _q.split("\n")[0]) || "",
                                        url: ((_r = listing === null || listing === void 0 ? void 0 : listing.querySelector("a")) === null || _r === void 0 ? void 0 : _r.href) || "",
                                        description: ((_t = (_s = listing === null || listing === void 0 ? void 0 : listing.querySelector("td:nth-of-type(2) table tbody tr:nth-of-type(4)")) === null || _s === void 0 ? void 0 : _s.textContent) === null || _t === void 0 ? void 0 : _t.replace(/(\r\n|\n|\r)/gm, "").split("[Read More]")[0].trim()) || "",
                                        img: ((_u = listing === null || listing === void 0 ? void 0 : listing.querySelector("img")) === null || _u === void 0 ? void 0 : _u.src) || "",
                                    };
                                    return listingInfo;
                                });
                                return listingInfo;
                            })];
                    case 4:
                        listings = _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 5:
                        _a.sent();
                        _loop_1 = function (element) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this_1.history.some(function (predicate) { return predicate.url === element.url; }))
                                            return [2 /*return*/, "continue"];
                                        this_1.history.unshift(element);
                                        this_1.history = this_1.history.slice(0, 1000);
                                        console.log(element);
                                        if (!this_1.initialized)
                                            return [2 /*return*/, "continue"];
                                        Mailer_1.sendEmail(element.price + " - " + element.title + " | BlushCycle", "<b>" + element.title + "</b><br><br>\n        " + element.price + "<br>\n        " + element.type + " - " + element.frameSize + "<br>\n        " + element.location + "<br>\n        <br>\n        " + element.description + "<br><br>\n        <a href=\"" + element.url + "\">" + element.url + "</a><br><br>\n        " + element.img + "\n        ");
                                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 500); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, listings_1 = listings;
                        _a.label = 6;
                    case 6:
                        if (!(_i < listings_1.length)) return [3 /*break*/, 9];
                        element = listings_1[_i];
                        return [5 /*yield**/, _loop_1(element)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        this.initialized = true;
                        console.log("--------------------");
                        return [2 /*return*/];
                }
            });
        });
    };
    return BlushBicycle;
}());
exports.BlushBicycle = BlushBicycle;
