const fs = require("fs");

// Your setup logic here
console.log("Running setup logic...");

// Example: Create a new file (assuming serverJs is a string)
const serverJs = `const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// Your mongodb uri
const uri =
  "mongodb+srv://user:passwordcc1@cluster0.uzrx08v.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(cors());
const port = 8080 || 8088 || 3000 || 3030;
// create application/json parser
const jsonParser = bodyParser.json();

async function run() {
  try {
    // Create references to the database and collection in order to run
    // operations on them.
    const client = new MongoClient(uri);

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect().catch((err) => console.error(err));
    console.log("Database connection established 🧑‍💻...");

    app.get("/", (req, res) => {
      res.send("Your backend is start working 🧑‍💻...");
    });

    app.get("/users", async (req, res) => {
      console.log("users request :", req);
      res.json({ users: "users-create" });
    });

    app.post("/user", jsonParser, async (req, res) => {
      console.log("users request :", req.body);
      res.json({ users: "users-create" });
    });

    app.get("/users/:id", async (req, res) => {
      console.log("req", req.params.id);
      res.json({ users: "user-get" });
    });

    app.delete("/users/:id", async (req, res) => {
      console.log("req", req.params.id);
      res.json({ users: "user-delete" });
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(port);
});`;
fs.writeFileSync("server.js", serverJs);

// Example: Update package.json (assuming customProperty is a top-level property)
const packageJson = require("./package.json");
packageJson.customProperty = "Some custom value";
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

console.log("Setup completed.");