import { RelPg } from "relpg";


//#region /// RELQUERYENGINE TYPES \\\



export enum Engines{
     /**
     * ### HostName
     * 
     * Server Ip address or Domain Name of postgresql database
     * 
     * ---
     * - #### Option: `db_host`
     * - #### Type: `string`
     * - #### Default: `localhost`
     */
    PGSQL="PGSQL",
    MYSQL="MYSQL",
    MSSQL="MSSQL"
}


type T_Connect={
    domain:string
    port:number
    dbname:string
    dbuser:string
    dbpassword:string
    engine:Engines  
}

type T_connectionList={
    name:string
    domain:string
    port:number
    dbname:string
    dbuser:string
    dbpassword:string
    engine:Engines 
}

type T_Connections = { [key: string]: any };

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
*---
* ### Example:
*
* ```ts
* const {RelQueryEngine,Engines} = require("rel-query-engine")
* 
* const RQE =new RelQueryEngine(connectionList)
* ```
*
* ```ts
* import {RelQueryEngine,Engines} = from "rel-query-engine"
* 
* const RQE =new RelQueryEngine(connectionList)
* ```
* ---
* 
* Note: The localhost value assumes that Postgresql is installed on your system.
*/
export class RelQueryEngine {
    ConnectionList?:T_connectionList[]
    Connections?:T_Connections

    constructor(connectionList?:T_connectionList[]){

        this.ConnectionList=connectionList;
        this.Connections;
        this.CREATECONNECTIONS()
    }




    private CREATECONNECTIONS(){
        const ConnList:T_Connections ={}

        this.ConnectionList?.forEach( (m,i)=>{
            const pname = m.name
            const pval:T_Connect = {engine:m.engine,domain:m.domain,port:m.port,dbuser:m.dbuser,dbname:m.dbname,dbpassword:m.dbpassword}
            ConnList[pname] = this.CONNECT(pval)
        })
         this.Connections=ConnList
    }





     CONNECT(infos:T_Connect){

        switch (infos.engine) {
            case "PGSQL":
                return new RelPg(infos.domain,infos.port,infos.dbuser,infos.dbname,infos.dbpassword)
        
            default:
                break;
        }

    }

    


}


 //#endregion
