import mysql from "mysql2/promise";

async function test() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "event_organizer",
    });

    console.log("CONNECTED!");
    const [rows] = await conn.query("SELECT * FROM event");
    console.log(rows);
  } catch (err) {
    console.error(err);
  }
}

test();
