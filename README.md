# Movie-API-
Tämä API hallinnoi elokuvia, käyttäjiä, arvosteluja, suosikkielokuvia ja genretietoja. Se tarjoaa seuraavat toiminnot:

API:n tarjoamat toiminnot:

    Elokuvat:
        GET /api/movies: Hakee elokuvia sivutettuna (pagination), ja palauttaa listan elokuvista.
        GET /api/movies/:id: Hakee elokuvan ID:n perusteella.
        GET /api/movies/search: Hakee elokuvia hakusanan perusteella (esimerkiksi elokuvan nimellä).
        POST /api/movies: Lisää uuden elokuvan tietokantaan.
        DELETE /api/movies/:id: Poistaa elokuvan ID:n perusteella.

    Käyttäjät:
        POST /api/users: Lisää uuden käyttäjän tietokantaan.
        POST /api/users/:username/favorites: Lisää käyttäjän suosikkielokuvan.
        GET /api/users/:username/favorites: Hakee käyttäjän suosikkielokuvat.

    Arvostelut:
        POST /api/reviews: Lisää elokuvan arvostelun käyttäjän nimellä, tähtiluokituksella ja arvostelutekstillä.

    Genret:
        GET /api/genres: Hakee kaikki genret.
        POST /api/genres: Lisää uuden genren tietokantaan.

        Virheenkäsittely:

API:ssa on virheenkäsittely, joka palauttaa virheilmoituksia, jos reittiä ei löydy tai palvelinvirhe tapahtuu
