CREATE TABLE "User" (
    "UserID" SERIAL PRIMARY KEY,    
    "Username" VARCHAR(100) NOT NULL UNIQUE, 
    "Password" VARCHAR(100) NOT NULL,
    "YearOfBirth" INT
);

INSERT INTO "User" ("Username", "Password", "YearOfBirth") VALUES
    ('sakuhaa', 'kukkuua', 1990),
    ('dasds', 'adgfh', 1997),
    ('Miesnainen', 'salas1232', 1970);

-- Genre Table
CREATE TABLE "Genre" (
    "GenreID" SERIAL PRIMARY KEY,
    "GenreName" VARCHAR(100) NOT NULL
);

INSERT INTO "Genre" ("GenreName") VALUES 
    ('Drama/Crime'), 
    ('Comedy'), 
    ('Action/Sci-fi');

-- Movie Table
CREATE TABLE "Movie" (
    "MovieID" SERIAL PRIMARY KEY,
    "Title" VARCHAR(255) NOT NULL,
    "Year" INT CHECK ("Year" > 1900 AND "Year" <= EXTRACT(YEAR FROM CURRENT_DATE)),
    "GenreID" INT,
    "Review" TEXT,
    FOREIGN KEY ("GenreID") REFERENCES "Genre"("GenreID") ON DELETE SET NULL
);

INSERT INTO "Movie" ("Title", "Year", "GenreID") VALUES 
    ('The Shawshank Redemption', 1994, 1),
    ('The Godfather', 1972, 1),
    ('Superbad', 2007, 2),
    ('Step Brothers', 2008, 2),
    ('The Dark Knight', 2008, 3),
    ('Avengers: Endgame', 2019, 3);

-- Review Table
CREATE TABLE "Review" (
    "ReviewID" SERIAL PRIMARY KEY,
    "MovieID" INT,
    "UserID" INT,
    "ReviewText" TEXT,
    "Stars" INT CHECK ("Stars" BETWEEN 1 AND 5),
    FOREIGN KEY ("MovieID") REFERENCES "Movie"("MovieID") ON DELETE CASCADE,
    FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE CASCADE
);

INSERT INTO "Review" ("MovieID", "UserID", "ReviewText", "Stars") VALUES
    (1, 1, 'An incredible movie with fantastic performances', 5),
    (2, 2, 'A classic, but a bit slow for modern audiences', 4),
    (3, 3, 'A hilarious movie, perfect for a fun night', 5),
    (4, 1, 'Very funny, great chemistry between the actors', 4),
    (5, 2, 'An amazing superhero movie with excellent action scenes', 5),
    (6, 3, 'Great movie, but a bit too long', 4);

-- Favorites Table
CREATE TABLE "Favorites" (
    "MovieID" INT,
    "UserID" INT,
    PRIMARY KEY ("MovieID", "UserID"),
    FOREIGN KEY ("MovieID") REFERENCES "Movie"("MovieID") ON DELETE CASCADE,
    FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE CASCADE
);

INSERT INTO "Favorites" ("MovieID", "UserID") VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (5, 1),
    (6, 2);