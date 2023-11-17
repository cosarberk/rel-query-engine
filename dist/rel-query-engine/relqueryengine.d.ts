import { RelPg } from "relpg";
export declare enum Engines {
    PGSQL = "PGSQL",
    MYSQL = "MYSQL",
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
export declare class RelQueryEngine {
    ConnectionList?: T_connectionList[];
    Connections?: T_Connections;
    constructor(connectionList?: T_connectionList[]);
    private CREATECONNECTIONS;
    CONNECT(infos: T_Connect): RelPg | undefined;
}
export {};
