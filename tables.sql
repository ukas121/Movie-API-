CREATE TABLE table_name(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name VARCHAR(255)
);
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
    
CREATE TABLE "Genre" (
    "GenreID" SERIAL PRIMARY KEY,
    "GenreName" VARCHAR(100) NOT NULL
);
INSERT INTO "Genre" ("GenreName") VALUES 
    ('Drama/Crime'), 
    ('Comedy'), 
    ('Action/Sci-fi');

CREATE TABLE "Movie" (
    "MovieID" SERIAL PRIMARY KEY,
    "Title" VARCHAR(255) NOT NULL,
    "Year" INT,
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
    
CREATE TABLE "Review" (
    "ReviewID" SERIAL PRIMARY KEY,
    "MovieID" INT,
    "UserID" INT,
    "ReviewText" TEXT,
    FOREIGN KEY ("MovieID") REFERENCES "Movie"("MovieID") ON DELETE CASCADE,
    FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE CASCADE
);
CREATE TABLE "Favorites" (
    "MovieID" INT,
    "UserID" INT,
    PRIMARY KEY ("MovieID", "UserID"),
    FOREIGN KEY ("MovieID") REFERENCES "Movie"("MovieID") ON DELETE CASCADE,
    FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE CASCADE
);
