const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");

//CONFIG FILE TO CONNECT TO MSSQL
const config = {
  user: "sa",
  password: "sa!2007",
  server: "VISION-X",
  // server: "103.135.36.245",
  database: "Esatto",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

//USE CORS AND BODYPARSER TO COMMUNICATE WITH FRONTEND
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API TO GET DATA FROM TBLCOMPANY
app.get("/api/get/tblCompany", (req, res) => {
  const request = new sql.Request();

  request
    .query(
      `
    SELECT id,
      [Company],
      Convert(varchar,LastLogin,103) as LastLogin,
      [IsActive]
    FROM [Esatto].[dbo].[tblCompany]
    ORDER BY [Company]
  `
    )
    .then((result) => {
      res.send(result.recordset);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error executing query");
    });
});

//API TO GET DATA FROM TBLLICENCE
app.get("/api/get/tblLicence", (req, res) => {
  const request = new sql.Request();

  request
    .query(
      `
SELECT [Id]
      ,[Company]
      ,[Licence]
  FROM [Esatto].[dbo].[tblLicence]
  `
    )
    .then((result) => {
      res.send(result.recordset);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error executing query");
    });
});

//API TO UPDATE TBLCOMPANY
app.put("/api/update/tblCompany/:id", (req, res) => {
  const id = req.params.id;
  const request = new sql.Request();
  request.input("id", sql.Int, id);
  request
    .query(
      `
    UPDATE [Esatto].[dbo].[tblCompany]
    SET [IsActive] = CASE [IsActive] 
                     WHEN 0 THEN 1
                     WHEN 1 THEN 0
                     END
    WHERE [id] = @id;
    `
    )
    .then(() => {
      request
        .query(
          `
        SELECT id,
          [Company],
          [LastLogin],
          [IsActive]
        FROM [Esatto].[dbo].[tblCompany]
        WHERE [id] = @id;
      `
        )
        .then((result) => {
          res.send(result.recordset[0]);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error executing query");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error executing query");
    });
});

//API TO UPDATE TBLLICENCE
app.put("/api/update/tblLicence/:id", (req, res) => {
  const id = req.params.id;
  const { Licence } = req.body;
  const request = new sql.Request();
  request.input("id", sql.Int, id);
  request.input("Licence", sql.VarChar(255), Licence);
  // request.input("licence", sql.VarChar(255), Licence);
  request
    .query(
      `
    UPDATE [Esatto].[dbo].[tblLicence]
    SET [Licence] = @licence
    WHERE [id] = @id;
    `
    )
    .then(() => {
      request
        .query(
          `
        SELECT id,
          [Company],
          [Licence]
        FROM [Esatto].[dbo].[tblLicence]
        WHERE [id] = @id;
      `
        )
        .then((result) => {
          res.send(result.recordset[0]);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error executing query");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error executing query");
    });
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Connect to the database using the configuration object
sql
  .connect(config)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

// const mysql = require("mysql2");

//CONFIG FILE TO CONNECT TO MYSQL WORKBENCH
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "AyUsH@1234",
//   database: "crud_conatct",
// });

// app.get("/api/get", (req, res) => {
//   const sqlGet = "SELECT * FROM conatct_db";
//   db.query(sqlGet, (error, result) => {
//     res.send(result);
//   });
// });

// app.post("/api/post", (req, res) => {
//   const { name, email, contact } = req.body;
//   const sqlInsert =
//     "INSERT INTO conatct_db (name,email,contact) VALUES (?,?,?)";
//   db.query(sqlInsert, [name, email, contact], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

// app.delete("/api/remove/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlRemove = "DELETE FROM conatct_db WHERE id = ?";
//   db.query(sqlRemove, id, (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

// app.get("/api/get/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlGet = "SELECT * FROM conatct_db WHERE id = ?";
//   db.query(sqlGet, id, (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });

// app.put("/api/update/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, email, contact } = req.body;
//   const sqlUpdate =
//     "UPDATE conatct_db SET name = ?, email = ?, contact = ? WHERE id = ?";
//   db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });
