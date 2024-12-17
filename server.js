import express from 'express';
import pool from './database.js';

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Movie API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// GET all movies with pagination
app.get('/api/movies', async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const result = await pool.query(
            'SELECT * FROM "Movie" ORDER BY "MovieID" LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// GET movie by ID
app.get('/api/movies/:id', async (req, res, next) => {
    const movieID = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Movie" WHERE "MovieID" = $1', [movieID]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        next(error);
    }
});

// GET movies by keyword (search)
app.get('/api/movies/search', async (req, res, next) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Missing required query parameter: keyword' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM "Movie" WHERE "Title" ILIKE $1',
            [`%${keyword}%`]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// POST new movie
app.post('/api/movies', async (req, res, next) => {
    const { title, year, genreID, review } = req.body;

    if (!title || !year || !genreID) {
        return res.status(400).json({ error: 'Missing required fields: title, year, genreID' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO "Movie" ("Title", "Year", "GenreID", "Review") VALUES ($1, $2, $3, $4) RETURNING *',
            [title, year, genreID, review || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// DELETE movie by ID
app.delete('/api/movies/:id', async (req, res, next) => {
    const movieID = req.params.id;
    try {
        const result = await pool.query('DELETE FROM "Movie" WHERE "MovieID" = $1 RETURNING *', [movieID]);
        if (result.rows.length > 0) {
            res.json({ message: 'Movie deleted successfully', movie: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        next(error);
    }
});

// POST new user
app.post('/api/users', async (req, res, next) => {
    const { username, password, yearOfBirth } = req.body;

    if (!username || !password || !yearOfBirth) {
        return res.status(400).json({ error: 'Missing required fields: username, password, yearOfBirth' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO "User" ("Username", "Password", "YearOfBirth") VALUES ($1, $2, $3) RETURNING *',
            [username, password, yearOfBirth]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// POST new review for a movie
app.post('/api/reviews', async (req, res, next) => {
    const { username, stars, reviewText, movieID } = req.body;

    if (!username || !stars || !reviewText || !movieID) {
        return res.status(400).json({ error: 'Missing required fields: username, stars, reviewText, movieID' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO "Review" ("Username", "Stars", "ReviewText", "MovieID") VALUES ($1, $2, $3, $4) RETURNING *',
            [username, stars, reviewText, movieID]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// POST favorite movie for user
app.post('/api/users/:username/favorites', async (req, res, next) => {
    const { username } = req.params;
    const { movieID } = req.body;

    if (!movieID) {
        return res.status(400).json({ error: 'Missing required field: movieID' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO "Favorites" ("Username", "MovieID") VALUES ($1, $2) RETURNING *',
            [username, movieID]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// GET favorite movies by username
app.get('/api/users/:username/favorites', async (req, res, next) => {
    const { username } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM "Movie" WHERE "MovieID" IN (SELECT "MovieID" FROM "Favorites" WHERE "Username" = $1)',
            [username]
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// GET genres
app.get('/api/genres', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM "Genre"');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// POST new genre
app.post('/api/genres', async (req, res, next) => {
    const { genreName } = req.body;

    if (!genreName) {
        return res.status(400).json({ error: 'Missing required field: genreName' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO "Genre" ("GenreName") VALUES ($1) RETURNING *',
            [genreName]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Default error route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
