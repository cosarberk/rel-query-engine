import { RelPg } from "relpg";
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
export declare enum Engines {
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
    PGSQL = "PGSQL",
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
    MYSQL = "MYSQL",
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
    MSSQL = "MSSQL"
}
type T_Connect = {
    domain: string;
    port: number;
    dbname: string;
    dbuser: string;
    dbpassword: string;
    engine: Engines;
};
type T_connectionList = {
    name: string;
    domain: string;
    port: number;
    dbname: string;
    dbuser: string;
    dbpassword: string;
    engine: Engines;
};
type T_Connections = {
    [key: string]: any;
};
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
export declare class RelQueryEngine {
    /**
     * ### ConnectionList
     *
     * List of database connections to manage
     *
     * It is an array consisting of objects of type T_connectionList.
     *
     * ---
     *
     * - #### Type: `array[T_connectionList] `
     * - #### Default: `[]`
     *
     * ---
     *
     * ### T_connectionList Object Options
     *
     * | OPTION              | TYPE                  | DEFAULT         | DESCRIPTION
     * | :-                  | :-                    | :-              | :-
     * | **name**            | string                | `""`            | Database nickname
     * | **engine**          | enum "Engines"        | `""`            | Database type
     * | **domain**          | string                | `localhost`     | Database address
     * | **port**            | integer               | `5432`          | Database port
     * | **dbuser**          | string                | `""`            | Database user name
     * | **dbname**          | string                | `""`            | Database name
     * | **dbpassword**      | string                | `""`            | Database password
     *
     * ---
     *
     * ### Example
     * ```ts
     *
     * const connectionlist=[
     * {name:"MyPgDb",engine:Engines.PGSQL,domain:"localhost",port:5432,dbuser:"postgres",dbname:"postgres",dbpassword:"password"}
     * ]
     *
     * ```
     *
     */
    ConnectionList?: T_connectionList[];
    /**
     * ### Connections
     *
     * returns database connections in memory
     * > Return `Connections`
     * ---
     *
     * - #### Type: `array[T_Connections] `
     * - #### Default: `[]`
     */
    Connections?: T_Connections;
    constructor(connectionList?: T_connectionList[]);
    /**
    * ### private CREATECONNECTIONS()
    *
    * creates dynamic database connection object to connection list
    *
    * Associates this object with `Connections`.
    *
    *
    */
    private CREATECONNECTIONS;
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
    CONNECT(
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
    infos: T_Connect): RelPg | undefined;
}
export {};
