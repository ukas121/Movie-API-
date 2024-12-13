import express from 'express';
import pool from './database.js';

const app = express();
app.use(express.json());  

app.get('/api/movies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Movie"');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/movies/:id', async (req, res) => {
    const movieID = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Movie" WHERE "MovieID" = $1', [movieID]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/movies', async (req, res) => {
    const { title, year, genreID, review } = req.body; 
    try {
        const result = await pool.query(
            'INSERT INTO "Movie" ("Title", "Year", "GenreID", "Review") VALUES ($1, $2, $3, $4) RETURNING *',
            [title, year, genreID, review]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/movies/:id', async (req, res) => {
    const movieID = req.params.id;
    try {
        const result = await pool.query('DELETE FROM "Movie" WHERE "MovieID" = $1 RETURNING *', [movieID]);
        if (result.rows.length > 0) {
            res.json({ message: 'Movie deleted successfully', movie: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "User"');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/users', async (req, res) => {
    const { username, password, yearOfBirth } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "User" ("Username", "Password", "YearOfBirth") VALUES ($1, $2, $3) RETURNING *',
            [username, password, yearOfBirth]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        const result = await pool.query('DELETE FROM "User" WHERE "UserID" = $1 RETURNING *', [userID]);
        if (result.rows.length > 0) {
            res.json({ message: 'User deleted successfully', user: result.rows[0] });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/genres', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Genre"');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/genres', async (req, res) => {
    const { genreName } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Genre" ("GenreName") VALUES ($1) RETURNING *',
            [genreName]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error adding genre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/genres/:id', async (req, res) => {
    const genreID = req.params.id;
    try {
        const result = await pool.query('DELETE FROM "Genre" WHERE "GenreID" = $1 RETURNING *', [genreID]);
        if (result.rows.length > 0) {
            res.json({ message: 'Genre deleted successfully', genre: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Genre not found' });
        }
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Review"');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/reviews', async (req, res) => {
    const { movieID, userID, reviewText } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Review" ("MovieID", "UserID", "ReviewText") VALUES ($1, $2, $3) RETURNING *',
            [movieID, userID, reviewText]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/reviews/:id', async (req, res) => {
    const reviewID = req.params.id;
    try {
        const result = await pool.query('DELETE FROM "Review" WHERE "ReviewID" = $1 RETURNING *', [reviewID]);
        if (result.rows.length > 0) {
            res.json({ message: 'Review deleted successfully', review: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/favorites', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Favorites"');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/favorites', async (req, res) => {
    const { movieID, userID } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Favorites" ("MovieID", "UserID") VALUES ($1, $2) RETURNING *',
            [movieID, userID]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/favorites/:id', async (req, res) => {
    const { movieID, userID } = req.params;
    try {
        const result = await pool.query('DELETE FROM "Favorites" WHERE "MovieID" = $1 AND "UserID" = $2 RETURNING *', [movieID, userID]);
        if (result.rows.length > 0) {
            res.json({ message: 'Favorite deleted successfully', favorite: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Favorite not found' });
        }
    } catch (error) {
        console.error('Error deleting favorite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
