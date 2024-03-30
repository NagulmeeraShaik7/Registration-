const express = require("express");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const addDays = require("date-fns");

const path = require("path");

const databasePath = path.join(__dirname, "registration.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);

    process.exit(1);
  }
};

initializeDbAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    id: dbObject.id,
    name: dbObject.name,
    email: dbObject.email,
    dateOfBirth: dbObject.date_of_birth,
  };
};

app.get("/register/", async (request, response) => {
  const getRegistersQuery = `
        SELECT
          * 
        FROM 
          register;`;
  const registersArray = await database.all(getRegistersQuery);
  response.send(
    registersArray.map((eachPerson) =>
      convertDbObjectToResponseObject(eachPerson)
    )
  );
});

app.post("/registration/", async (request, response) => {
  const registerDetails = request.body;
  const { name, email, dateOfBirth } = registerDetails;
  const addRegisterQuery = `
        INSERT INTO
            register (name, email, dateOfBirth)
        VALUES 
            (
               '${name}',
               '${email}',
                '${dateOfBirth}'


            );`;
  const dbResponse = await database.run(addRegisterQuery);
  const id = dbResponse.lastId;
  response.send("Person Details Added to Table");
});

app.put("/register/:id/", async (request, response) => {
  const { id } = request.params;
  const registerDetails = request.body;
  const { name, email, dateOfBirth } = registerDetails;
  const updateRegisterQuery = `
        UPDATE register
        SET
            name = '${name}',
            email = '${email}',
             dateOfBirth = '${dateOfBirth}'
        WHERE id = ${id};`;
  await database.run(updateRegisterQuery);
  response.send("Register Details Updated");
});

app.delete("/register/:id/", async (request, response) => {
  const { id } = request.params;
  const deleteRegisterQuery = `DELETE FROM register WHERE id = ${id}`;
  await database.run(deleteRegisterQuery);
  response.send("Register Detail Removed");
});

module.exports = app;
