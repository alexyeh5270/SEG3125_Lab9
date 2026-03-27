// server/index.js
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create the reviews table
    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gameId INTEGER NOT NULL,
        title TEXT NOT NULL,
        posterUrl TEXT,
        reviewText TEXT,
        username TEXT NOT NULL,
        rating INTEGER NOT NULL,
        isFeatured BOOLEAN DEFAULT 0,
        date TEXT NOT NULL
      )
    `);

    // Create the users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
      )
    `);

    // Create the user_library table to link users and games
    db.run(`
      CREATE TABLE IF NOT EXISTS user_libraries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        added_date TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, game_id)
      )
    `);
  }
});

app.post('/api/reviews', (req, res) => {
  const incomingReviewData = req.body;
  
  console.log("Received data from frontend:", incomingReviewData);

  const date = new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());


  const sql = `
    INSERT INTO reviews (gameId, title, posterUrl, reviewText, username, rating, isFeatured, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    incomingReviewData.gameId,
    incomingReviewData.title,
    incomingReviewData.posterUrl,
    incomingReviewData.reviewText,
    incomingReviewData.username,
    incomingReviewData.rating,
    incomingReviewData.isFeatured ? 1 : 0, 
    date
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error("Error inserting review:", err.message);
      return res.status(500).json({ error: "Failed to save review" });
    }


    const savedReview = {
        id: this.lastID, 
        date: date, 
        ...incomingReviewData 
    };

    res.status(201).json(savedReview);
  });
});

// POST endpoint to add a game to a user's library
app.post('/api/library', (req, res) => {
  const { userId, gameId, gameName } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "Missing userId or gameId in request body" });
  }

  console.log(`Received request to add game: ${gameName} (ID: ${gameId}) for user: ${userId}`);

  const date = new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const sql = `
    INSERT INTO user_libraries (user_id, game_id, added_date)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [userId, gameId, date], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: "Game is already in the user's library" });
      }
      
      console.error("Error adding to library:", err.message);
      return res.status(500).json({ error: "Failed to add game to library" });
    }

    res.status(201).json({
      message: "Game added to library successfully",
      libraryEntry: {
        id: this.lastID,
        userId: userId,
        gameId: gameId,
        addedDate: date
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});