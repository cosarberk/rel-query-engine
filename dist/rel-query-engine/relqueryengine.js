"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelQueryEngine = exports.Engines = void 0;
var relpg_1 = require("relpg");
// export { connections } from "./con";
var fs = require('fs');
//export const connections:any={}
var Engines;
(function (Engines) {
    Engines["PGSQL"] = "PGSQL";
    Engines["MYSQL"] = "MYSQL";
    Engines["MSSQL"] = "MSSQL";
})(Engines || (exports.Engines = Engines = {}));
var RelQueryEngine = /** @class */ (function () {
    function RelQueryEngine(connectionList) {
        this.ConnectionList = connectionList;
        this.Connections;
        this.CREATECONNECTIONS();
    }
    RelQueryEngine.prototype.CREATECONNECTIONS = function () {
        var _this = this;
        var _a;
        var ConnList = {};
        (_a = this.ConnectionList) === null || _a === void 0 ? void 0 : _a.forEach(function (m, i) {
            var pname = m.name;
            var pval = { engine: m.engine, domain: m.domain, port: m.port, dbuser: m.dbuser, dbname: m.dbname, dbpassword: m.dbpassword };
            ConnList[pname] = _this.CONNECT(pval);
        });
        this.Connections = ConnList;
    };
    RelQueryEngine.prototype.CONNECT = function (infos) {
        switch (infos.engine) {
            case "PGSQL":
                return new relpg_1.RelPg(infos.domain, infos.port = 5432, infos.dbuser, infos.dbname, infos.dbpassword);
            default:
                break;
        }
    };
    return RelQueryEngine;
}());
exports.RelQueryEngine = RelQueryEngine;
