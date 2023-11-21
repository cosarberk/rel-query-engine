# rel-query-engine
Allows managing multiple databases simultaneously for Relteco-Relnode.

For now, it only supports PostgreSQL


```sh
npm i rel-query-engine
```

## Quick Start

```ts

// First, create a `connectionList` array and add objects containing connection information, a `nickname` that defines your database, and other relevant details
const connectionList =[
   {name:"LiveDB",engine:Engines.PGSQL,domain:"localhost",port:5432,dbuser:"postgres",dbname:"postgres",dbpassword:"password"},
   {name:"DevDB",engine:Engines.PGSQL,domain:"localhost",port:5432,dbuser:"postgres",dbname:"postgres",dbpassword:"password"},
   {name:"DevMysqlDB",engine:Engines.MYSQL,domain:"localhost",port:6632,dbuser:"root",dbname:"mysql",dbpassword:"password"},
   //... more ...
]
// Now, you can create your `relqueryengine` with the `connectionList` array.
const RQE =new RelQueryEngine(connectionList)

// Now, let's retrieve the `connections` from memory.
  const DBS = RQE.Connections

// Now, you can call the desired database connection using the alias you provided earlier.
  let db =  await DBS.liveDB.LISTDB("postgres")
//                     - ^ -

```

### NOTE :RelQueryEngine dynamically creates the Connections object. This can lead to reminders not working properly in some IDEs.For example, the LISTDB function may not be recognized by the IDE in the above example. To provide an alternative solution to this issue,you can use RelQueryEngine as follows:

```ts
// Instead of creating a connectionList array, create a connectionList object.
// Request RelQueryEngine (RQE) to directly return CONNECT with a key as the alias you will provide for your database and object values.
// You can even create this object in a different file, export it, and make it accessible throughout your project.
  const myconnections ={
   LiveDB:RQE.CONNECT({engine:Engines.PGSQL,domain:"localhost",port:5432,dbuser:"postgres",dbname:"postgres",dbpassword:"password"}),
   DevDB:RQE.CONNECT({engine:Engines.PGSQL,domain:"localhost",port:5432,dbuser:"postgres",dbname:"postgres",dbpassword:"password"})
   DevMysqlDB:RQE.CONNECT({engine:Engines.MYSQL,domain:"localhost",port:6632,dbuser:"root",dbname:"mysql",dbpassword:"password"}),

 }

 // Now, you can establish connections based on the aliases from the `myconnections` object.
 // You will notice that your IDE can more easily recognize the LISTDB function.
  let db =  await myconnections.liveDB.LISTDB("postgres")
//                               - ^ -


```

## ENGINE TYPES


### Engines

Database engine types
#### ! Currently only postgresql is supported

---

### Options

| OPTION       | TYPE          | DEFAULT     | DESCRIPTION
| :-           | :-            | :-          | :-
| **PGSQL**    | enum        | `PGSQL`     | Postgresql engine
| **MYSQL**    | enum        | `MYSQL`     | MYSQL engine
| **MSSQL**    | enum        | `MSSQL`     | Microsoft Sql  engine

---

```ts   
  Engines.PGSQL
```

## RELQUERYENGINE


Allows managing multiple databases together for Relteco Relnode.

---

### Options

| OPTION              | TYPE                               | DEFAULT     | DESCRIPTION
| :-                  | :-                                 | :-          | :-
| **ConnectionList**  | array[T_connectionList]            | `[]`        | An array of objects of type T_connection objects containing database formation

---
### Examples:

```ts
const {RelQueryEngine,Engines} = require("rel-query-engine")

const RQE =new RelQueryEngine(connectionList)


```

 OR

```ts

import {RelQueryEngine,Engines} = from "rel-query-engine"

const RQE =new RelQueryEngine(connectionList)
```
---

#### Note: The localhost value assumes that Databases is installed on your system.



### ConnectionList
 
 List of database connections to manage
 
 It is an array consisting of objects of type T_connectionList.
 
 ---
 
 - #### Type: `array[T_connectionList] `
 - #### Default: `[]`
 
 ---
 
 ### T_connectionList Object Options
 
 | OPTION              | TYPE                  | DEFAULT         | DESCRIPTION
 | :-                  | :-                    | :-              | :-
 | **name**            | string                | `""`            | Database nickname
 | **engine**          | enum "Engines"        | `""`            | Database type
 | **domain**          | string                | `localhost`     | Database address
 | **port**            | integer               | `5432`          | Database port
 | **dbuser**          | string                | `""`            | Database user name
 | **dbname**          | string                | `""`            | Database name
 | **dbpassword**      | string                | `""`            | Database password
 
 ---
 
 ### Example 
 ```ts
 
 const connectionlist=[
 {name:"MyPgDb",engine:Engines.PGSQL,domain:"localhost",port:5432,dbuser:"postgres",dbname:"postgres",dbpassword:"password"}
 ]
 
 ```


### Connections
 
 returns database connections in memory
 > Return `Connections`
 ---
 
 - #### Type: `array[T_Connections] `
 - #### Default: `[]`
 


### private CREATECONNECTIONS()

creates dynamic database connection object to connection list 

and associates this object with `Connections`.




### CONNECT()

Creates database connection based on Engine type

> Return `connection`

---
### Options

| OPTION             | TYPE                   | DEFAULT         | DESCRIPTION
| :-                 | :-                     | :-              | :-
| **infos**          | object{T_Connect}      | `{}`            | database connection infos of type T_Connect


---

### Example
```ts

 const infos ={
 engine:Engines.PGSQL,
 domain:"localhost",
 port:5432,
 dbuser:"postgres",
 dbname:"postgres",
 dbpassword:"password"
 };

 RQE.CONNECT(infos);

```


 ### T_Connect `infos` 

 database connection infos of type T_Connect

---

### T_Connect Options

| OPTION              | TYPE                  | DEFAULT         | DESCRIPTION
| :-                  | :-                    | :-              | :-
| **engine**          | enum "Engines"        | `""`            | Database type
| **domain**          | string                | `"localhost"`   | Database address
| **port**            | integer               | `5432`          | Database port
| **dbuser**          | string                | `""`            | Database user name
| **dbname**          | string                | `""`            | Database name
| **dbpassword**      | string                | `""`            | Database password

---
