"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelQueryEngine = exports.Engines = void 0;
var relpg_1 = require("relpg");
//#region /// RELQUERYENGINE TYPES \\\
/**
* ### Engines
*
* Database engine types
* #### ! Currently only postgresql is supported
*
* ---
*
* ### Options
*
* | OPTION       | TYPE          | DEFAULT     | DESCRIPTION
* | :-           | :-            | :-          | :-
* | **PGSQL**    | enum        | `PGSQL`     | Postgresql engine
* | **MYSQL**    | enum        | `MYSQL`     | MYSQL engine
* | **MSSQL**    | enum        | `MSSQL`     | Microsoft Sql  engine
*
* ---
*/
var Engines;
(function (Engines) {
    /**
    * ### PGSQL
    *
    * Postgresql engine
    *
    * ---
    * - #### Option: `PGSQL`
    * - #### Type: `string`
    * - #### Default: `PGSQL`
    *
    */
    Engines["PGSQL"] = "PGSQL";
    /**
   * ### MYSQL
   *
   * MYSQL engine
   *
   * ---
   * - #### Option: `MYSQL`
   * - #### Type: `string`
   * - #### Default: `MYSQL`
   */
    Engines["MYSQL"] = "MYSQL";
    /**
   * ### MSSQL
   *
   * Microsoft Sql engine
   *
   * ---
   * - #### Option: `MSSQL`
   * - #### Type: `string`
   * - #### Default: `MSSQL`
   */
    Engines["MSSQL"] = "MSSQL";
})(Engines || (exports.Engines = Engines = {}));
//#endregion
//#region /// RELQUERYENGINE CLASS \\\
/**
* ## RelQueryEngine
*
* Allows managing multiple databases together for Relteco Relnode.
*
* ---
*
* ### Options
*
* | OPTION              | TYPE                               | DEFAULT     | DESCRIPTION
* | :-                  | :-                                 | :-          | :-
* | **ConnectionList**  | array[T_connectionList]            | `[]`        | An array of objects of type T_connection objects containing database information
*
* ---
* ### Examples:
*
* ```ts
* const {RelQueryEngine,Engines} = require("rel-query-engine")
*
* const RQE =new RelQueryEngine(connectionList)
*
*
* ```
*
*  OR
*
* ```ts
*
* import {RelQueryEngine,Engines} = from "rel-query-engine"
*
* const RQE =new RelQueryEngine(connectionList)
* ```
* ---
*
* Note: The localhost value assumes that Databases is installed on your system.
*/
var RelQueryEngine = /** @class */ (function () {
    function RelQueryEngine(connectionList) {
        this.ConnectionList = connectionList;
        this.Connections;
        this.CREATECONNECTIONS();
    }
    /**
    * ### private CREATECONNECTIONS()
    *
    * creates dynamic database connection object to connection list
    *
    * Associates this object with `Connections`.
    *
    *
    */
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
    /**
    * ### CONNECT()
    *
    * Creates database connection based on Engine type
    *
    * > Return `connection`
    *
    * ---
    * ### Options
    *
    * | OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
    * | :-                 | :-                     | :-              | :-
    * | **infos**          | object{T_Connect}      | `{}`            | database connection infos of type T_Connect
    *
    *
    * ---
    *
    * ### Example
    * ```ts
    *
    *  const infos ={
    *  engine:Engines.PGSQL,
    *  domain:"localhost",
    *  port:5432,
    *  dbuser:"postgres",
    *  dbname:"postgres",
    *  dbpassword:"password"
    *  };
    *
    *  RQE.CONNECT(infos);
    *
    * ```
    *
    */
    RelQueryEngine.prototype.CONNECT = function (
    /**
     *  `infos`
     *
     *   database connection infos of type T_Connect
     *
     * ---
     *
     * ### T_Connect Options
     *
     * | OPTION              | TYPE                  | DEFAULT         | DESCRIPTION
     * | :-                  | :-                    | :-              | :-
     * | **engine**          | enum "Engines"        | `""`            | Database type
     * | **domain**          | string                | `"localhost"`   | Database address
     * | **port**            | integer               | `5432`          | Database port
     * | **dbuser**          | string                | `""`            | Database user name
     * | **dbname**          | string                | `""`            | Database name
     * | **dbpassword**      | string                | `""`            | Database password
     *
     * ---
     *
     */
    infos) {
        switch (infos.engine) {
            case "PGSQL":
                return new relpg_1.RelPg(infos.domain, infos.port, infos.dbuser, infos.dbname, infos.dbpassword);
            default:
                break;
        }
    };
    return RelQueryEngine;
}());
exports.RelQueryEngine = RelQueryEngine;
//#endregion
