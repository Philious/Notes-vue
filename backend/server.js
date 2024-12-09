/* eslint-disable no-undef, @typescript-eslint/no-require-imports */

const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// HTTPResponse (ok: boolean, statusCode: number, body?: any)
const errorResponse = (res, statusCode, message) =>
  res.status(statusCode).send(message);

const succseResponse = (res, body) => res.status(200).json(body);

// Create user { user, password }
app.post("/users", (req, res) => {
  const loginDetails = req.body;

  if (
    users.find(
      (u) =>
        !loginDetails.email ||
        !loginDetails.password ||
        u.email === loginDetails.email
    )
  ) {
    return errorResponse(res, 400);
  }

  const newUser = {
    uuid: uuid.v4(),
    createdAt: new Date().toISOString(),
    email: data.email,
    password: data.password,
  };

  users.push(newUser);
  succseResponse(res, newUser);
});

// Login
app.get("/users/login/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  const userIndex = users.findIndex(
    (u) => u.email === email && u.password === password
  );

  if (userIndex >= 0) {
    const token = uuid.v4();
    users[userIndex].token = token;

    res.cookie("note-cookie", token, {
      domain: "localhost", // Correct domain
      expires: new Date(Date.now() + 900000),
      maxAge: 1800000,
    });

    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(404).json({ error: "Invalid credentials" });
  }
});

// Logout
app.delete("/users/logout/:token", (req, res) => {
  const token = req.params.token;
  const userIndex = users.findIndex((u) => u.token === token);

  if (!token || userIndex < 0) return errorResponse(res, 500);

  users[userIndex].token = null;

  succseResponse(res, true);
  res.clearCookie("notecookie");
});

/// Checktoken
app.get("/users/check/:token", (req, res) => {
  const token = req.params.token;
  const user = users.find((u) => u.token === token);

  res.status(200).json(!!user);
});

// Get all notes
app.get("/notes/:token", (req, res) => {
  const token = String(req.params.token);
  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) return errorResponse(res, 404, "No user with that token");

  const userId = users[userIndex].uuid;

  succseResponse(res, notes[userId]);
});

// Create a new note # { title: string, content: string, catalog: string, tags: string[] }
app.post("/notes/:token", (req, res) => {
  const token = String(req.params.token);
  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) return errorResponse(res, 404, "No user with that token");

  const userId = users[userIndex].uuid;
  const note = req.body;

  const date = new Date();

  const newNote = {
    id: uuid.v4(),
    createdAt: date,
    updatedAt: date,
    ...note,
  };

  notes[userId].push(newNote);
  succseResponse(res, notes[userId]);
});

// Modify an existing note # id: string, Partial<{ title: string, content: string, catalog: string, tags: string[] }>
app.put("/notes/:token/", (req, res) => {
  const token = Number(req.params.token);
  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) return errorResponse(res, 404, "No user with that token");

  const userId = users[userIndex].uuid;
  const noteIndex = notes[userId].findIndex((i) => i.id === note.id);

  if (noteIndex < 0) return errorResponse(res, 404, "Note doesn't exist");

  const prevNote = notes[userId][noteindex];
  const currentNote = {
    ...prevNote,
    ...note,
    updatedAt: new Date().toISOString(),
  };

  notes[userId][noteIndex] = currentNote;

  succseResponse(res, notes[userId]);
});

// Delete an existing note # id string
app.delete("/notes/:token/:noteId", (req, res) => {
  const token = Number(req.params.token);
  const noteId = String(req.params.id);

  const userIndex = users.findIndex((u) => u.token === token);

  if (userIndex < 0) return errorResponse(res, 404, "No user with that token");

  const userId = users[userIndex].uuid;
  const noteIndex = users[userId].findIndex((n) => n.id === noteId);

  if (noteIndex < 0) return errorResponse(res, 404, "Note doesn't exist");

  if (noteIndex >= 0) {
    notes[userId].splice(index, 1);
    succseResponse(res, notes[userId]);
  } else {
    errorResponse(res, 404, "Note doesn't exist");
  }
});

// Seeded startdata
// notes # { id: string, title: string, content: string, catalog: string, tags: string[], createdAt: string, updatedAt: string }
const notes = {
  "89503dc5-9517-48a2-833f-6bc7c0d32f1b": [
    {
      id: uuid.v4(),
      title: "Montera ner pariserhjulet",
      content:
        "Avsluta sista åkturen kl 22. Säkerställ att alla bultar är ordentligt förvarade, och märk sektionerna enligt instruktionerna.",
      catalog: "Logistik",
      tags: ["pariserhjul", "demontering", "säkerhet"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Matvarulista för nästa stopp",
      content:
        "Behöver korv, bröd, senap, ketchup, socker till sockervaddsmaskinen och extra smör för popcornmaskinen.",
      catalog: "Förnödenheter",
      tags: ["mat", "förnödenheter", "sockervadd"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Planera tivolins layout i Västerås",
      content:
        "Följ den nya planen för större säkerhetsavstånd. Placera radiobilarna nära ingången och skjutbanan längst bort.",
      catalog: "Planering",
      tags: ["layout", "säkerhet", "platsplanering"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Reparation av berg-och-dalbanan",
      content:
        "Slitage på spåren märkt på sista sektionen. Kontrollera alla säkerhetsfästen, ta fram reservdelar om nödvändigt.",
      catalog: "Underhåll",
      tags: ["berg-och-dalbana", "reparation", "säkerhet"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid.v4(),
      title: "Kvällsshowen – förberedelser",
      content:
        "Dubbelkolla att musiken är klar och högtalarna fungerar. Kontrollera elden till eldslukaren och informera publik om säkerhetsavstånd.",
      catalog: "Show",
      tags: ["show", "förberedelser", "eldslukare"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

// Users { uuid: string, email: string, password: string, createdAt: string, notes: Note[] }
const users = [
  {
    uuid: "89503dc5-9517-48a2-833f-6bc7c0d32f1b",
    email: "conny@carneval.com",
    password: "1234†",
    createdAt: new Date().toISOString(),
    token: null,
  },
];
