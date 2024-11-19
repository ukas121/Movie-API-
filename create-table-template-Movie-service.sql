-- Active: 1730974448074@@127.0.0.1@5432@postgres@public
-- Active: 1730974448074@@127.0.0.1@5432@postgres@public8074@@127.0.0.1@5432@postgres@public

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Store hashed password
    year_of_birth INT CHECK (year_of_birth >= 1900 AND year_of_birth <= EXTRACT(YEAR FROM CURRENT_DATE)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Genres table
CREATE TABLE Genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create Movies table
CREATE TABLE Movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year INT CHECK (year >= 1888 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    genre_id INT REFERENCES Genres(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add an index on the movie name for faster keyword searches
CREATE INDEX idx_movie_name ON Movies(name);

-- Create Reviews table
CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    stars INT CHECK (stars BETWEEN 1 AND 5),
    review_text TEXT,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    movie_id INT REFERENCES Movies(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create FavoriteMovies table
CREATE TABLE FavoriteMovies (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    movie_id INT REFERENCES Movies(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, movie_id)
);

-- Insert sample genres
INSERT INTO Genres (name) VALUES 
('Action'), 
('Drama'), 
('Comedy'), 
('Thriller'), 
('Sci-Fi');

-- Insert sample users
INSERT INTO Users (name, username, password, year_of_birth) VALUES 
('Joke Don', 'jjokke', 'hadasd', 1956),
('Jan Smalls', 'jansmalls', 'Megaforcwe211', 1990);

-- Insert sample movies
INSERT INTO Movies (name, year, genre_id) VALUES 
('Inception', 2010, (SELECT id FROM Genres WHERE name='Sci-Fi')),
('The Dark Knight', 2008, (SELECT id FROM Genres WHERE name='Action')),
('Interstellar', 2014, (SELECT id FROM Genres WHERE name='Sci-Fi')),
('Titanic', 1997, (SELECT id FROM Genres WHERE name='Drama')),
('The Matrix', 1999, (SELECT id FROM Genres WHERE name='Sci-Fi'));

-- Insert sample reviews
INSERT INTO Reviews (stars, review_text, user_id, movie_id) VALUES 
(5, 'Amazing movie!', 1, 1),
(4, 'Great visuals, loved it.', 2, 3),
(3, 'Not bad, but could be better.', 1, 2);

-- Insert sample favorite movies
INSERT INTO FavoriteMovies (user_id, movie_id) VALUES 
(1, 1),
(1, 3),
(2, 2);

CREATE DATABASE movie_management;

-- Confirm data inserted
SELECT * FROM Users;
SELECT * FROM Genres;
SELECT * FROM Movies;
SELECT * FROM Reviews;
SELECT * FROM FavoriteMovies;
